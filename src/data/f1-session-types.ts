import { RaceSessionType } from "../types/RaceSessionType";
import { F1 } from "./formulas";

const formulaSlug = F1.slug;

export const f1SessionTypes: RaceSessionType[] = [
  { formulaSlug, calName: "Free Practice 1", calCategory: "FP1", slug: "free-practice-1" },
  { formulaSlug, calName: "Free Practice 2", calCategory: "FP2", slug: "free-practice-2" },
  { formulaSlug, calName: "Free Practice 3", calCategory: "FP3", slug: "free-practice-3" },
  { formulaSlug, calName: "Qualifying", calCategory: "Qualifying", slug: "qualifying" },
  { formulaSlug, calName: "Sprint Qualifying", calCategory: "Sprint Qualifying", slug: "sprint-qualifying" },
  { formulaSlug, calName: "Sprint", calCategory: "Sprint", slug: "sprint" },
  { formulaSlug, calName: "Grand Prix", calCategory: "Grand Prix", slug: "grand-prix" },
];

export default f1SessionTypes;
