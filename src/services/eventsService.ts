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

// URL da planilha publicada como CSV (Exemplo: https://docs.google.com/spreadsheets/d/e/.../pub?output=csv)
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6zOqQhHq-9r8q7-8X-v3r9s0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0/pub?output=csv";

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
            const data = results.data.map((row: any) => ({
              slug: row.slug || "",
              featured: String(row.featured).toLowerCase() === 'true',
              status: row.status === 'encerrado' ? 'encerrado' : 'aberto',
              title: row.title || "",
              category: row.category || "",
              date: row.date || "",
              time: row.time || "",
              location: row.location || "",
              mapsUrl: row.mapsUrl || "",
              formUrl: row.formUrl || "",
              image: row.image || "",
              shortDescription: row.shortDescription || "",
              description: row.description || "",
              spots: row.spots || "",
            }));
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
    return new Date(a.date).getTime() - new Date(b.date).getTime();
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
