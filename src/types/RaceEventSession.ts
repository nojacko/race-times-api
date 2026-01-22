export interface RaceEventSession {
  key: string;
  formulaSlug: string;
  year: string;
  /** Ordering for sessions. When TBC the times are all the same but not in real life i.e. practise is before quali */
  index: number;
  eventSlug: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
  slug: string;
  tbc: boolean;
}
