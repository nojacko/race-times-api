export type RaceSession = {
  formulaSlug?: string;
  sessionTypeSlug?: string;
  startDateTime?: string;
  endDatetime?: string;
  coords?: { lat: number; lon: number };
};
