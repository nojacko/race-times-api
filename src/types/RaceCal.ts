import type { RaceEvent } from "./RaceEvent";

export interface RaceCal {
  formulaSlug: string;
  year: number;
  url: string;
  title: string;
  raceEvents: RaceEvent[];
  updatedAt: string;
}
