import * as path from "path";

export type AppStrs = {
  APP_NAME: string;
  DOMAIN: string;
};

export const STR: AppStrs = {
  APP_NAME: "F1 Race Times",
  DOMAIN: "f1racetimes.com",
};

export type AppVars = {
  DIR_ROOT: string;
  DIR_TEMP: string;
  DIR_DATA: string;
  URL_CALENDAR_F1: string;
  URL_CALENDAR_F2: string;
  FILE_CALENDAR_F1: string;
  FILE_CALENDAR_F2: string;
  MS_HOUR: number;
};

const DIR_ROOT = path.join(__dirname, "..");
const DIR_TEMP = path.join(DIR_ROOT, "temp");
const DIR_TEMP_CALENDAR = path.join(DIR_TEMP, "calendar");
const DIR_DATA = path.join(DIR_ROOT, "src", "data");

export const VARS: AppVars = {
  DIR_ROOT,
  DIR_TEMP,
  DIR_DATA,
  URL_CALENDAR_F1: "https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics",
  URL_CALENDAR_F2: "https://files-f2.motorsportcalendars.com/f2-calendar_p_q_sprint_feature.ics",
  FILE_CALENDAR_F1: path.join(DIR_TEMP_CALENDAR, "f1-calendar.ics"),
  FILE_CALENDAR_F2: path.join(DIR_TEMP_CALENDAR, "f2-calendar.ics"),
  MS_HOUR: 60 * 60 * 1000, // 1 hour
};

export type Calendar = {
  name: string;
  url: string;
  file: string;
  tsOutput: string;
};

export const CALENDARS: Calendar[] = [
  {
    name: "F1",
    url: VARS.URL_CALENDAR_F1,
    file: VARS.FILE_CALENDAR_F1,
    tsOutput: path.join(DIR_DATA, "f1-sessions.ts"),
  },
  {
    name: "F2",
    url: VARS.URL_CALENDAR_F2,
    file: VARS.FILE_CALENDAR_F2,
    tsOutput: path.join(DIR_DATA, "f2-sessions.ts"),
  },
];
