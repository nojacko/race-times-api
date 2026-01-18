export interface CalendarEventRaw {
  url: string;
  slug: string;
  nameFull: string;
  nameShort: string;
  displayDate: string;
  type: string;
}

export interface CalendarRaw {
  url: string;
  updatedAt: string;
  title: string;
  year: number;
  data: CalendarEventRaw[];
}
