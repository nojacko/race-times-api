import * as path from "path";
import { VARS } from "../vars";
import { F1, F2 } from "./formulas";
import type { Calendar } from "../types/Calendar";

export const calendars: Calendar[] = [
  {
    name: "F1",
    url: "https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics",
    file: path.join(VARS.DIR_TEMP, "calendar", "f1-calendar.ics"),
    tsOutput: path.join(VARS.DIR_DATA, "f1-sessions.ts"),
    formula: F1.slug,
  },
  {
    name: "F2",
    url: "https://files-f2.motorsportcalendars.com/f2-calendar_p_q_sprint_feature.ics",
    file: path.join(VARS.DIR_TEMP, "calendar", "f2-calendar.ics"),
    tsOutput: path.join(VARS.DIR_DATA, "f2-sessions.ts"),
    formula: F2.slug,
  },
];

export default calendars;
