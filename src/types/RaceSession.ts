export type RaceSession = {
  // Original iCal event
  summary: string;
  dtstamp: string;
  dtstart: string;
  dtend: string;
  sequence?: string;
  geo?: string;
  location?: string;
  status?: string;
  categories?: string[];

  // Additions derived from processing the original iCal event
  formulaSlug?: string;
  sessionTypeSlug?: string;
  startDateTime?: string;
  endDatetime?: string;
  coords?: { lat: number; lon: number };
};
