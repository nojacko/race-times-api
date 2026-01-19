import * as fs from "fs";
import * as path from "path";
import { VARS } from "../vars";
import { slugify, slugsJoin } from "../utils/strings";
import { DateTime } from "luxon";
import { getCircuit } from "../data/circuits";
import type { EventRaw } from "../types/EventRaw";
import { formulas } from "../data/formulas";
import type { Formula } from "../types/Formula";
import type { CalendarRaw } from "../types/CalendarRaw";
import type { RaceCal } from "../types/RaceCal";
import type { RaceEvent, CalendarEventType } from "../types/RaceEvent";
import type { RaceEventSession } from "../types/RaceEventSession";
import { getCircuitSlug } from "../utils/circuit-map";

function parseDateTime(day: string, month: string, time: string | null, year: number, timeZone: string): string | null {
  if (!day || !month || !time) return "";
  const dayNum = parseInt(day, 10);
  const [hh = "0", mm = "0"] = time.split(":");

  // try to parse month name to number using Luxon, fallback to Date
  let monthNum = DateTime.fromFormat(month, "LLLL").month;
  if (!monthNum) {
    const tmp = new Date(`${month} 1, ${year}`);
    monthNum = isNaN(tmp.getTime()) ? 1 : tmp.getMonth() + 1;
  }

  const dt = DateTime.fromObject(
    { year, month: monthNum, day: dayNum, hour: parseInt(hh, 10), minute: parseInt(mm, 10) },
    { zone: timeZone },
  );
  return dt.isValid ? dt.toISO() : null;
}

function buildSession(
  s: any,
  i: number,
  rawEvent: any,
  formula: Formula,
  year: number,
  calendarKey: string,
  timeZone: string,
  errors: string[],
): RaceEventSession {
  const dateOpts = { zone: timeZone };

  const startDt = parseDateTime(s.day, s.month, s.startTime, year, timeZone);
  const endDt = parseDateTime(s.day, s.month, s.endTime, year, timeZone);

  const startDateTime = startDt ? DateTime.fromISO(startDt, dateOpts).toUTC().toISO() : null;
  let endDateTime = endDt ? DateTime.fromISO(endDt, dateOpts).toUTC().toISO() : null;
  const localStartTime = startDt ? DateTime.fromISO(startDt, dateOpts).toISO() : null;
  let localEndTime = endDt ? DateTime.fromISO(endDt, dateOpts).toISO() : null;

  // if end times are missing but start exists, default end = start + 2 hours
  if (startDt && (!endDateTime || !localEndTime)) {
    const endLocal = DateTime.fromISO(startDt, dateOpts).plus({ hours: 2 });
    if (!localEndTime) localEndTime = endLocal.toISO();
    if (!endDateTime) endDateTime = endLocal.toUTC().toISO();
  }

  const sessionSlug = slugify(s.name);

  // report missing date/time values to the shared errors array
  const sessionId = `${calendarKey} => ${rawEvent.slug} => ${sessionSlug || `#${i}`}`;
  if (!startDateTime) {
    errors.push(`missing startDateTime: ${sessionId}`);
  }
  if (!localStartTime) {
    errors.push(`missing localStartTime: ${sessionId}`);
  }

  return {
    formulaSlug: formula.slug,
    year,
    eventSlug: rawEvent.slug,
    slug: sessionSlug,
    name: s.name,
    startDateTime,
    endDateTime,
    localStartTime,
    localEndTime,
  };
}

function writeCalendar(slug: string, year: number, calendar: RaceCal) {
  const targetDir = path.join(VARS.DIR_DATA, slug, String(year));
  fs.mkdirSync(targetDir, { recursive: true });

  // compute relative import path from the generated file to the types file
  const typesPathAbsolute = path.join(__dirname, "..", "types", "RaceCal");
  let typesImportPath = path.relative(targetDir, typesPathAbsolute).replace(/\\/g, "/");
  if (!typesImportPath.startsWith(".")) typesImportPath = `./${typesImportPath}`;

  const outPath = path.join(targetDir, "calendar.ts");
  // build a safe identifier from the slug for a named export
  let safeSlug = slug.replace(/[^a-zA-Z0-9_$]/g, "_");
  if (/^[0-9]/.test(safeSlug)) safeSlug = `_${safeSlug}`;
  const exportIdent = `${safeSlug}Calendar${year}`;

  const content = [
    `// AUTO-GENERATED: do not edit\nimport type { RaceCal } from "${typesImportPath}";`,
    `export const ${exportIdent}: RaceCal = ${JSON.stringify(calendar, null, 2)};`,
  ];

  fs.writeFileSync(outPath, content.join("\n\n"), "utf8");
  console.log(`- ${year}: calendar.ts written`);
}

function buildEvent(
  raw: any,
  formula: Formula,
  year: number,
  calendarKey: string,
  calendarRaw: CalendarRaw,
  errors: string[],
): RaceEvent | null {
  const typeRaw = (raw.type || "").toString().trim();
  let eventType: CalendarEventType;
  let round = 0;

  if (/^TESTING\b/i.test(typeRaw)) {
    eventType = "testing";
  } else if (/^ROUND\b/i.test(typeRaw)) {
    eventType = "round";
    const m = typeRaw.match(/ROUND\s*(\d+)/i);
    round = m ? parseInt(m[1], 10) || 0 : 0;
  }

  const circuitSlug = getCircuitSlug(formula.slug, raw.slug);
  const circuit = circuitSlug ? getCircuit(circuitSlug) : undefined;
  const eventName = raw.nameShort || raw.slug || "(unknown)";
  const errorData = `${eventName} => ${circuitSlug}`;
  if (!circuit) {
    errors.push(`missing circuit: ${errorData}`);
    return null;
  }

  if (!circuit.timeZone) {
    errors.push(`missing timeZone: ${errorData}`);
    return null;
  }

  if (!eventType) {
    errors.push(`invalid eventType: ${errorData}`);
    return null;
  }

  const event: RaceEvent = {
    formulaSlug: formula.slug,
    year,
    slug: raw.slug,
    circuitSlug: circuit.slug,
    url: raw.url || "",
    nameFull: raw.nameFull || "",
    nameMedium: raw.nameMedium ?? "",
    nameShort: raw.nameShort ?? "",
    displayDate: raw.displayDate ?? "",
    eventType,
    round,
    sessions: [],
    updatedAt: calendarRaw.updatedAt,
  };

  // attempt to load raw event file (`<eventSlug>.json`) from the raw dir
  try {
    const eventRawPath = path.join(VARS.DIR_DATA, formula.slug, String(year), "raw", `${raw.slug}.json`);
    if (fs.existsSync(eventRawPath)) {
      const rawContent = fs.readFileSync(eventRawPath, "utf8");
      const eventRaw = JSON.parse(rawContent) as EventRaw;
      event.nameMedium = eventRaw.nameMedium;
      if (Array.isArray(eventRaw.data)) {
        event.sessions = eventRaw.data.map((s, i) => buildSession(s, i, raw, formula, year, calendarKey, circuit.timeZone, errors));
      }
    } else {
      try {
        fs.mkdirSync(path.dirname(eventRawPath), { recursive: true });
        fs.writeFileSync(eventRawPath, "{}", "utf8");
        console.log(`- ${year}: created missing raw event file for ${raw.slug}`);
      } catch (err) {
        console.warn(`Failed to create missing event raw file ${eventRawPath}:`, err);
      }
    }
  } catch (e) {
    // if anything fails, leave sessions empty
    console.warn(`Failed to load event raw for ${raw.slug}:`, e);
  }

  return event;
}

function parseCalendar(): void {
  formulas.forEach((formula: Formula) => {
    if (!formula.active) return;
    console.log(formula.name);

    if (Array.isArray(formula.years) && formula.years.length) {
      formula.years.forEach((year) => {
        const calendarJsonPath = path.join(VARS.DIR_DATA, formula.slug, String(year), "raw", "calendar.json");

        if (fs.existsSync(calendarJsonPath)) {
          try {
            const raw = fs.readFileSync(calendarJsonPath, "utf8");
            const calendarRaw = JSON.parse(raw) as CalendarRaw;

            const calendarKey = `${formula.slug}_${year}`;

            const errors: string[] = [];
            const events = (calendarRaw.data || [])
              .map((e: any) => {
                const ev = buildEvent(e, formula, year, calendarKey, calendarRaw, errors);
                return ev;
              })
              .filter((ev): ev is RaceEvent => !!ev);

            const transformed: RaceCal = {
              formulaSlug: formula.slug,
              year: calendarRaw.year,
              url: calendarRaw.url,
              title: calendarRaw.title,
              raceEvents: events,
              updatedAt: calendarRaw.updatedAt,
            };

            console.log(`- ${year}: calendar.json loaded`);
            if (errors.length) {
              console.log(`- ${year}: issues found:`);
              errors.forEach((m) => console.log(`  - ${m}`));
            }
            writeCalendar(formula.slug, year, transformed);
          } catch (err) {
            console.log(`- ${year}: calendar.json loaded but failed to parse`);
          }
        } else {
          console.log(`- ${year}: calendar.json missing`);
        }
      });
    } else {
      console.log("- no years defined");
    }
  });
}

parseCalendar();
