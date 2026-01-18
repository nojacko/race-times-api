export interface CalendarEventRaw {
  url: string;
  slug: string;
  fullName: string;
  shortName: string;
  displayDate: string;
  type: string;
}

export interface CalendarRaw {
  url: string;
  updateAt: string;
  title: string;
  year: number;
  data: CalendarEventRaw[];
}
