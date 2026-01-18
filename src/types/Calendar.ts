import type { CircuitSlug } from "./Circuit";

export type CalendarEventType = "testing" | "round";

export interface CalendarSession {
  key: string;
  formulaSlug: string;
  year: number;
  eventSlug: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
  localStartTime: string;
  localEndTime: string;
  slug: string;
}

export interface CalendarEvent {
  key: string;
  sessions: CalendarSession[];
  formulaSlug: string;
  year: number;
  slug: string;
  circuitSlug: CircuitSlug;
  url: string;
  nameFull: string;
  nameShort: string;
  displayDate: string;
  eventType: CalendarEventType;
  round: number;
  updatedAt: string;
}

export interface Calendar {
  key: string;
  formulaSlug: string;
  year: number;
  url: string;
  title: string;
  calendarEvents: CalendarEvent[];
  updatedAt: string;
}
