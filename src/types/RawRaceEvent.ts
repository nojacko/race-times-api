import type { RawRaceEventSession } from "./RawRaceEventSession";

export interface RawRaceEventSummary {
  url: string;
  slug: string;
  nameFull: string;
  nameShort: string;
  displayDate: string;
  type: string;
}

export interface RawRaceEvent {
  url: string;
  updatedAt: string;
  slug: string;
  nameFull: string;
  nameMedium: string;
  data: RawRaceEventSession[];
}
