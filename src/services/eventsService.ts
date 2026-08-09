import { createServerFn } from "@tanstack/react-start";
import Papa from "papaparse";

const isServer = typeof window === 'undefined';


// A URL da planilha está correta e retornando dados CSV válidos.
// Testamos a URL: https://docs.google.com/spreadsheets/d/1os--AybmZh6xiclGfDtB5lqy2bPEQwDlrLDGwsQNQho/gviz/tq?tqx=out:csv
// O retorno começa com: "slug","featured","status","title",...

// Tipagem baseada na planilha solicitada
export interface SheetEvent {
  slug: string;
  featured: boolean;
  status: 'aberto' | 'encerrado';
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  mapsUrl: string;
  formUrl: string;
  image: string;
  shortDescription: string;
  description: string;
  spots: string;
}

// URL da planilha publicada como CSV
// Link original: https://docs.google.com/spreadsheets/d/1os--AybmZh6xiclGfDtB5lqy2bPEQwDlrLDGwsQNQho/edit?usp=sharing
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/1os--AybmZh6xiclGfDtB5lqy2bPEQwDlrLDGwsQNQho/gviz/tq?tqx=out:csv";

export const fetchEventsFromSheets = createServerFn({ method: "GET" })
  .handler(async () => {
    // Se for chamado durante a pré-renderização ou SSR no Vercel, retornamos vazio para evitar 500
    if (isServer && process.env['NODE_ENV'] === 'production') {
      return [];
    }
    
    try {
      // Usar um timeout curto para evitar que o servidor do Vercel trave se o Google demorar
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(GOOGLE_SHEETS_CSV_URL, { 

        signal: controller.signal,
        headers: {
          'Accept': 'text/csv',
          'User-Agent': 'Mozilla/5.0 (compatible; ChegaMaisBot/1.0)'
        }
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(`Planilha retornou status ${response.status}: ${response.statusText}`);
        return [];
      }
      
      const csvText = await response.text();
      
      if (!csvText || csvText.length < 10) {
        console.warn("CSV recebido está vazio ou muito curto.");
        return [];
      }
      
      return new Promise<SheetEvent[]>((resolve) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data
              .filter((row: any) => row.slug && row.title) // Filtrar linhas inválidas
              .map((row: any) => {
                const formatImageUrl = (url: string) => {
                  if (!url) return "/placeholder.svg";
                  if (!url.startsWith('http') && !url.startsWith('/')) {
                    return `/imagens/${url.trim()}`;
                  }
                  const driveMatch = url.match(/\/(?:d|file\/d)\/([a-zA-Z0-9_-]+)/);
                  if (driveMatch && driveMatch[1]) {
                    return `https://lh3.googleusercontent.com/u/0/d/${driveMatch[1]}`;
                  }
                  return url.trim();
                };

                return {
                  slug: String(row.slug || "").trim(),
                  featured: String(row.featured).toLowerCase() === 'true',
                  status: row.status === 'encerrado' ? 'encerrado' : 'aberto',
                  title: String(row.title || "").trim(),
                  category: String(row.category || "").trim(),
                  date: String(row.date || "").trim(),
                  time: String(row.time || "").trim(),
                  location: String(row.location || "").trim(),
                  mapsUrl: String(row.mapsUrl || "").trim(),
                  formUrl: String(row.formUrl || "").trim(),
                  image: formatImageUrl(row.image),
                  shortDescription: String(row.shortDescription || "").trim(),
                  description: String(row.description || "").trim(),
                  spots: String(row.spots || "").trim(),
                };
              });
            resolve(data as SheetEvent[]);
          },
          error: (error: any) => {
            console.error("Erro no PapaParse:", error);
            resolve([]);
          },
        });
      });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error("Timeout ao buscar planilha do Google Sheets");
      } else {
        console.error("ERRO CRÍTICO AO BUSCAR PLANILHA:", error);
      }
      return [];
    }
  });

export async function getEvents() {
  const allEvents = await fetchEventsFromSheets();
  
  // Ordenação: featured primeiro, depois por data
  return allEvents.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Parse dates in DD/MM/YYYY format for sorting
    const parseDate = (d: string) => {
      const parts = d.split('/');
      if (parts.length === 3) {
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
      }
      return new Date(d).getTime();
    };
    
    return parseDate(a.date) - parseDate(b.date);
  });
}

export async function getActiveEvents() {
  const events = await getEvents();
  return events.filter(e => e.status === 'aberto');
}

export async function getEventBySlug(slug: string) {
  const events = await getEvents();
  return events.find(e => e.slug === slug);
}
