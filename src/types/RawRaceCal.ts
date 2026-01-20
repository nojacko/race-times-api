import type { RawRaceCalEvent } from "./RawRaceCalEvent";

export interface RawRaceCal {
  url: string;
  updatedAt: string;
  title: string;
  year: string;
  data: RawRaceCalEvent[];
}
