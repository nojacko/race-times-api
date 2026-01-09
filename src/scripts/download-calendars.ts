import * as fs from "fs";
import { VARS } from "../vars";

async function shouldDownload(): Promise<boolean> {
  if (!fs.existsSync(VARS.FILE_CALENDAR_F1)) {
    console.log("Calendar file does not exist. Downloading...");
    return true;
  }

  const stats = fs.statSync(VARS.FILE_CALENDAR_F1);
  const fileAgeMs = Date.now() - stats.mtimeMs;

  if (fileAgeMs > VARS.MS_HOUR) {
    console.log(`Calendar file is ${Math.round(fileAgeMs / 1000 / 60)} minutes old. Downloading...`);
    return true;
  }

  console.log(`Calendar file is fresh (${Math.round(fileAgeMs / 1000 / 60)} minutes old). Skipping download.`);
  return false;
}

async function ensureCalendarDir(): Promise<void> {
  if (!fs.existsSync(VARS.DIR_TEMP_CALENDAR)) {
    fs.mkdirSync(VARS.DIR_TEMP_CALENDAR, { recursive: true });
    console.log(`Created directory: ${VARS.DIR_TEMP_CALENDAR}`);
  }
}

async function downloadCalendar(): Promise<void> {
  try {
    console.log(`Fetching calendar from: ${VARS.URL_CALENDAR_F1}`);
    const response = await fetch(VARS.URL_CALENDAR_F1);

    if (!response.ok) {
      throw new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(VARS.FILE_CALENDAR_F1, Buffer.from(buffer));
    console.log(`Calendar saved to: ${VARS.FILE_CALENDAR_F1}`);
  } catch (error) {
    console.error("Error downloading calendar:", error);
    throw error;
  }
}

async function run(): Promise<void> {
  try {
    await ensureCalendarDir();
    const needsDownload = await shouldDownload();

    if (needsDownload) {
      await downloadCalendar();
    }

    console.log("Calendar sync completed successfully.");
  } catch (error) {
    console.error("Calendar sync failed:", error);
    process.exit(1);
  }
}

run();
