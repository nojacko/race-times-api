import type { CircuitSlug } from "./Circuit";
import type { RaceEventSession } from "./RaceEventSession";

export type CalendarEventType = "testing" | "round";

export interface RaceEvent {
  key: string;
  sessions: RaceEventSession[];
  formulaSlug: string;
  year: string;
  slug: string;
  circuitSlug: CircuitSlug;
  url: string;
  startDateTime: string;
  endDateTime: string;
  nameFull: string;
  nameMedium: string;
  nameShort: string;
  displayDate: string;
  eventType: CalendarEventType;
  round: number;
  updatedAt: string;
}
