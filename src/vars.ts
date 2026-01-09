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
  MS_HOUR: number;
};

const DIR_ROOT = path.join(__dirname, "..");
const DIR_TEMP = path.join(DIR_ROOT, "temp");
const DIR_DATA = path.join(DIR_ROOT, "src", "data");

export const VARS: AppVars = {
  DIR_ROOT,
  DIR_TEMP,
  DIR_DATA,
  MS_HOUR: 60 * 60 * 1000, // 1 hour
};
