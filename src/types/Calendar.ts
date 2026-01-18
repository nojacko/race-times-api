export type CalendarEventType = "testing" | "round";

export interface CalendarSession {
  key: string;
  formulaSlug: string;
  year: number;
  eventSlug: string;
  name: string;
  track: string;
  startDateTime: string;
  endDateTime: string;
  slug: string;
}

export interface CalendarEvent {
  key: string;
  sessions: CalendarSession[];
  formulaSlug: string;
  year: number;
  slug: string;
  url: string;
  fullName: string;
  shortName: string;
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
  data: CalendarEvent[];
  updatedAt: string;
}
