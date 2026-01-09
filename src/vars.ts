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
  URL_CALENDAR_F1: string;
  DIR_TEMP_CALENDAR: string;
  FILE_CALENDAR_F1: string;
  MS_HOUR: number;
};

const DIR_ROOT = path.join(__dirname, "..", "..");
const DIR_TEMP = path.join(DIR_ROOT, "temp");

export const VARS: AppVars = {
  DIR_ROOT,
  DIR_TEMP,
  URL_CALENDAR_F1: "https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics",
  DIR_TEMP_CALENDAR: path.join(DIR_TEMP, "calendar"),
  FILE_CALENDAR_F1: path.join(DIR_TEMP, "calendar", "f1-calendar.ics"),
  MS_HOUR: 60 * 60 * 1000, // 1 hour
};
