import { createServerFn } from "@tanstack/react-start";
import Papa from "papaparse";

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
              // Função para tratar o caminho da imagem
              const formatImageUrl = (imagePath: string) => {
                if (!imagePath) return "/placeholder.svg"; // Fallback caso esteja vazio
                
                // Se o usuário digitou apenas o nome do arquivo (ex: "clara.jpg")
                // ou se já começou com "/", garantimos que aponte para /imagens/
                const fileName = imagePath.trim();
                
                // Se já for uma URL completa (http), mantemos (opcional, para flexibilidade)
                if (fileName.startsWith('http')) return fileName;
                
                // Remove "/" inicial se houver para padronizar
                const cleanFileName = fileName.startsWith('/') ? fileName.substring(1) : fileName;
                
                // Se o nome do arquivo já contém "imagens/", não duplicamos
                if (cleanFileName.startsWith('imagens/')) {
                  return `/${cleanFileName}`;
                }
                
                return `/imagens/${cleanFileName}`;
              };

              // Função para limpar links curtos do Forms que podem dar erro
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
      console.error("Error fetching sheets:", error);
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
