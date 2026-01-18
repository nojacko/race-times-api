export interface CalendarEvent {
  key: string;
  formulaSlug: string;
  year: number;
  slug: string;
  url: string;
  fullName: string;
  shortName: string;
  displayDate: string;
  eventType: "testing" | "round";
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
