import type { RawRaceEventSession } from "./RawRaceEventSession";

export interface RawRaceEvent {
  url: string;
  updatedAt: string;
  slug: string;
  nameFull: string;
  nameMedium: string;
  data: RawRaceEventSession[];
}
