import { RaceSessionType } from "../types/RaceSessionType";
import { F2 } from "./formulas";

const formulaSlug = F2.slug;

export const f2SessionTypes: RaceSessionType[] = [
  { formulaSlug, calName: "Free Practice", calCategory: "Practice", slug: "free-practice" },
  { formulaSlug, calName: "Qualifying", calCategory: "Qualifying", slug: "qualifying" },
  { formulaSlug, calName: "Sprint", calCategory: "Sprint", slug: "sprint" },
  { formulaSlug, calName: "Feature", calCategory: "Feature", slug: "feature" },
];

export default f2SessionTypes;
