import * as fs from "fs";
import * as path from "path";
import { VARS } from "../vars";
import { calendars } from "../data/calendars";
import type { Calendar } from "../types/Calendar";

function msToMinutes(ms: number): number {
  return Math.round(ms / 1000 / 60);
}
async function shouldDownload(cal: Calendar, cacheMs: number): Promise<boolean> {
  if (!fs.existsSync(cal.file)) {
    console.log(`- ${cal.name}: Cache does not exist. Downloading...`);
    return true;
  }

  const stats = fs.statSync(cal.file);
  const fileAgeMs = Date.now() - stats.mtimeMs;

  if (fileAgeMs > cacheMs) {
    console.log(`- ${cal.name}: Cache is ${msToMinutes(fileAgeMs)}m old. Downloading...`);
    return true;
  }

  console.log(`- ${cal.name}: Cache is fresh (${msToMinutes(fileAgeMs)}m old). Skipping.`);
  return false;
}

async function ensureDir(cal: Calendar): Promise<void> {
  const dirPath = path.dirname(cal.file);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function downloadCalendar(cal: Calendar): Promise<void> {
  try {
    console.log(`- ${cal.name}: Fetching calendar from: ${cal.url}`);
    const response = await fetch(cal.url);

    if (!response.ok) {
      throw new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(cal.file, Buffer.from(buffer));
    console.log(`- ${cal.name}: Saved to ${cal.file}`);
  } catch (error) {
    console.error(`- ${cal.name}: Error downloading calendar:`, error);
    throw error;
  }
}

async function run(): Promise<void> {
  try {
    for (const cal of calendars) {
      console.log(`${cal.name} calender`);
      await ensureDir(cal);
      const needs = await shouldDownload(cal, VARS.MS_HOUR);
      if (needs) await downloadCalendar(cal);
      console.log("");
    }

    console.log("Completed");
  } catch (error) {
    console.error("Calendar sync failed:", error);
    process.exit(1);
  }
}

run();
