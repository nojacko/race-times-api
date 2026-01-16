export interface CalendarEvent {
  SUMMARY?: string;
  DTSTAMP?: string;
  DTSTART?: string;
  DTEND?: string;
  SEQUENCE?: string;
  GEO?: string;
  LOCATION?: string;
  STATUS?: string;
  CATEGORIES?: string;
  UID?: string;
  [key: string]: string | undefined;
}
