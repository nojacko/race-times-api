import type { RawRaceEventSession } from "./RawRaceEventSession";

export interface RawRaceEvent {
  url: string;
  updatedAt: string;
  nameFull: string;
  nameMedium: string;
  data: RawRaceEventSession[];
}
