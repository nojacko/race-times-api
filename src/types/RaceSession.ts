export type RaceSession = {
  summary: string;
  dtstamp: string;
  dtstart: string;
  dtend: string;
  sequence?: string;
  geo?: { lat: number; lon: number };
  location?: string;
  status?: string;
  categories?: string[];
};
