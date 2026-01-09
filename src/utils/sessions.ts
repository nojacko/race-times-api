import { f1SessionTypes } from "../data/f1-session-types";
import { f2SessionTypes } from "../data/f2-session-types";
import { F1, F2 } from "../data/formulas";
import type { RaceSessionType } from "../types/RaceSessionType";

export function sessionByFormula(formulaSlug: string): RaceSessionType[] {
  if (formulaSlug === F1.slug) return f1SessionTypes;
  if (formulaSlug === F2.slug) return f2SessionTypes;
  return [];
}

export default sessionByFormula;
