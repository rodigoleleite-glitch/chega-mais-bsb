import { events, type Event } from "@/data/events";

export async function getEvents() {
  return events;
}

export async function getActiveEvents() {
  return events.filter(e => e.active);
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  return events.find(
    event => event.slug === slug
  );
}
