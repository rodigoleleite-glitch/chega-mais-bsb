import { createServerFn } from "@tanstack/react-start";
import Papa from "papaparse";

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
    try {
      const response = await fetch(GOOGLE_SHEETS_CSV_URL);
      if (!response.ok) throw new Error("Falha ao buscar dados da planilha");
      
      const csvText = await response.text();
      
      return new Promise<SheetEvent[]>((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data.map((row: any) => {
              // Função para transformar links do Google Drive em links diretos de imagem
              // e manter links diretos
              const formatImageUrl = (url: string) => {
                if (!url) return "/placeholder.svg";
                
                // Prioriza caminho local se o valor na planilha for apenas um nome de arquivo
                // (não começa com http, https ou /)
                if (!url.startsWith('http') && !url.startsWith('/')) {
                  return `/imagens/${url.trim()}`;
                }

                // Suporte para links do Google Drive
                const driveMatch = url.match(/\/(?:d|file\/d)\/([a-zA-Z0-9_-]+)/);
                if (driveMatch && driveMatch[1]) {
                  return `https://lh3.googleusercontent.com/u/0/d/${driveMatch[1]}`;
                }
                
                return url.trim();
              };

              // Função para limpar links curtos do Forms
              const formatFormUrl = (url: string) => {
                if (!url) return "";
                return url.trim();
              };

              return {
                slug: row.slug || "",
                featured: String(row.featured).toLowerCase() === 'true',
                status: row.status === 'encerrado' ? 'encerrado' : 'aberto',
                title: row.title || "",
                category: row.category || "",
                date: row.date || "",
                time: row.time || "",
                location: row.location || "",
                mapsUrl: row.mapsUrl || "",
                formUrl: formatFormUrl(row.formUrl),
                image: formatImageUrl(row.image),
                shortDescription: row.shortDescription || "",
                description: row.description || "",
                spots: row.spots || "",
              };
            });
            resolve(data as SheetEvent[]);
          },
          error: (error: any) => reject(error),
        });
      });
    } catch (error) {
      console.error("CRITICAL ERROR FETCHING SHEETS:", error);
      // Retornar um evento mock para diagnóstico em produção se falhar
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
