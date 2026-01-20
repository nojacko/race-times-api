import type { RaceEvent } from "./RaceEvent";

export interface RaceCal {
  key: string;
  formulaSlug: string;
  year: string;
  url: string;
  title: string;
  raceEvents: RaceEvent[];
  updatedAt: string;
}
