import type { RawRaceEventSummary } from "./RawRaceEvent";

export interface RawRaceCal {
  url: string;
  updatedAt: string;
  title: string;
  year: number;
  data: RawRaceEventSummary[];
}
