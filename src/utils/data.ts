import { f1SessionTypes } from "../data/f1-session-types";
import { f2SessionTypes } from "../data/f2-session-types";
import { F1, F2 } from "../data/formulas";
import type { RaceSessionType } from "../types/RaceSessionType";
import type CalendarEvent from "../types/CalendarEvent";
import { f1CalendarEvents } from "../data/f1-calendar-events";
import { f2CalendarEvents } from "../data/f2-calendar-events";
import { calendars } from "../data/calendars";
import type Calendar from "../types/Calendar";

export function sessionsByFormula(formulaSlug: string): RaceSessionType[] | undefined {
  if (formulaSlug === F1.slug) return f1SessionTypes;
  if (formulaSlug === F2.slug) return f2SessionTypes;
  return undefined;
}

export function calendarEventsByFormula(formulaSlug: string): CalendarEvent[] | undefined {
  if (formulaSlug === F1.slug) return f1CalendarEvents;
  if (formulaSlug === F2.slug) return f2CalendarEvents;
  return undefined;
}

export function calendarByFormula(formulaSlug: string): Calendar | undefined {
  return calendars.find((c) => c.formula === formulaSlug);
}

export default sessionsByFormula;
