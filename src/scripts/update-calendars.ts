import * as fs from "fs";
import * as path from "path";
import type { Formula } from "../types/Formula";
import type { RaceCal } from "../types/RaceCal";
import type { RaceEvent, CalendarEventType } from "../types/RaceEvent";
import type { RaceEventSession } from "../types/RaceEventSession";
import type { RawRaceCal } from "../types/RawRaceCal";
import type { RawRaceCalEvent } from "../types/RawRaceCalEvent";
import type { RawRaceEvent } from "../types/RawRaceEvent";
import type { RawRaceEventSession } from "src/types/RawRaceEventSession";
import { camelCase } from "lodash/string";
import { DateTime } from "luxon";
import { getCircuit } from "../data/circuits";
import { getCircuitKey, getCircuitSlug } from "../utils/circuit-map";
import { getFormulasActive } from "../data/formulas";
import { slugify, slugsJoin } from "../utils/strings";
import { VARS } from "../vars";

const calendarFilename = "_calendar.json";

function createEmptyJsonFile(filePath: string, msgOk: string, msgError: string): void {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "{}", "utf8");
    console.log(msgOk);
  } catch (err) {
    console.warn(`${msgError} ${filePath}:`, err);
  }
}

function buildSession(
  session: RawRaceEventSession,
  i: number,
  rawEvent: RawRaceCalEvent,
  formula: Formula,
  year: string,
  calendarKey: string,
  timeZone: string,
  errors: string[],
): RaceEventSession {
  // Check if times are TBC
  const startTimeTBC = session.localStartTime === "TBC" || !session.localStartTime;
  const endTimeTBC = session.localEndTime === "TBC" || !session.localEndTime;
  const tbc = startTimeTBC || endTimeTBC;

  // Use 12:00/12:30 as default for TBC times
  const startTime = startTimeTBC ? "12:00" : session.localStartTime;
  const endTime = endTimeTBC ? "12:30" : session.localEndTime;

  // Parse localDate and times using Luxon
  const startDt = DateTime.fromFormat(`${session.localDate} ${startTime}`, "yyyy-MM-dd HH:mm", { zone: timeZone });
  const endDt = DateTime.fromFormat(`${session.localDate} ${endTime}`, "yyyy-MM-dd HH:mm", { zone: timeZone });

  let startDateTime = startDt.isValid ? startDt.toUTC().toISO() : null;
  let endDateTime = endDt.isValid ? endDt.toUTC().toISO() : null;

  // if end times are missing but start exists, default end = start + 2 hours
  if (startDateTime && !endDateTime) {
    const endLocal = startDt.plus({ hours: 2 });
    endDateTime = endLocal.toUTC().toISO();
  }

  const sessionSlug = slugify(session.name);

  // report missing date/time values to the shared errors array
  const sessionId = `${calendarKey} => ${rawEvent.slug} => ${sessionSlug || `#${i}`}`;
  if (!startDateTime) {
    errors.push(`missing startDateTime: ${sessionId}`);
  }

  return {
    key: slugsJoin(formula.slug, year, rawEvent.slug, sessionSlug),
    formulaSlug: formula.slug,
    year,
    eventSlug: rawEvent.slug,
    index: i,
    slug: sessionSlug,
    name: session.name,
    startDateTime,
    endDateTime,
    tbc: tbc,
  };
}

function writeCalendar(slug: string, year: string, calendar: RaceCal) {
  const targetDir = path.join(VARS.DIR_DATA, slug, year);
  fs.mkdirSync(targetDir, { recursive: true });

  // compute relative import path from the generated file to the types file
  const typesPathAbsolute = path.join(__dirname, "..", "types", "RaceCal");
  let typesImportPath = path.relative(targetDir, typesPathAbsolute).replace(/\\/g, "/");
  if (!typesImportPath.startsWith(".")) typesImportPath = `./${typesImportPath}`;

  const outPath = path.join(targetDir, "calendar.ts");
  const exportIdent = `${camelCase(slug)}Calendar${camelCase(year)}`;

  const content = [
    `// AUTO-GENERATED: do not edit\nimport type { RaceCal } from "${typesImportPath}";`,
    `export const ${exportIdent}: RaceCal = ${JSON.stringify(calendar, null, 2)};`,
  ];

  fs.writeFileSync(outPath, content.join("\n\n"), "utf8");
  console.log(`- ${year}: calendar.ts written`);
}

function getDate(dates: string[], opt: "min" | "max"): string {
  const parsed = dates.map((d) => Date.parse(d)).filter((n) => !Number.isNaN(n));
  if (!parsed.length) return "";
  const value = opt === "min" ? Math.min(...parsed) : Math.max(...parsed);
  return new Date(value).toISOString();
}

function buildEvent(
  raw: RawRaceCalEvent,
  formula: Formula,
  year: string,
  calendarKey: string,
  calendarRaw: RawRaceCal,
  errors: string[],
): RaceEvent | null {
  const typeRaw = raw.type.toString().trim();
  let eventType: CalendarEventType;
  let round = 0;

  if (/^testing\b/i.test(typeRaw)) {
    eventType = "testing";
  } else if (/^round\b/i.test(typeRaw)) {
    eventType = "round";
    const m = typeRaw.match(/round\s*(\d+)/i);
    round = m ? parseInt(m[1], 10) || 0 : 0;
  }

  const circuitKey = getCircuitKey(formula.slug, raw.slug);
  const circuitSlug = getCircuitSlug(circuitKey);
  const circuit = circuitSlug ? getCircuit(circuitSlug) : undefined;
  const eventName = raw.nameShort || raw.slug || "(unknown)";
  const errorData = `${eventName} - "${circuitKey}" "${circuitSlug}"`;
  if (!circuit) {
    errors.push(`missing circuit: "${circuitKey}": "${circuitSlug || ""}",`);
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
    key: slugsJoin(formula.slug, year, raw.slug),
    formulaSlug: formula.slug,
    year,
    slug: raw.slug,
    circuitSlug: circuit.slug,
    url: raw.url,
    startDateTime: "",
    endDateTime: "",
    nameFull: raw.nameFull,
    nameMedium: raw.nameFull,
    nameShort: raw.nameShort,
    displayDate: raw.displayDate,
    eventType,
    round,
    sessions: [],
    updatedAt: calendarRaw.updatedAt,
  };

  // attempt to load raw event file (`<eventSlug>.json`) from the raw dir
  try {
    const eventRawPath = path.join(VARS.DIR_DATA, formula.slug, year, "raw", `${raw.slug}.json`);
    if (fs.existsSync(eventRawPath)) {
      const rawContent = fs.readFileSync(eventRawPath, "utf8");
      const eventRaw = JSON.parse(rawContent) as RawRaceEvent;
      event.nameMedium = eventRaw.nameMedium || raw.nameShort || event.nameFull;
      if (Array.isArray(eventRaw.data)) {
        event.sessions = eventRaw.data.map((session, i) =>
          buildSession(session, i, raw, formula, year, calendarKey, circuit.timeZone, errors),
        );
      }
    } else {
      createEmptyJsonFile(eventRawPath, `- ${year}: created ${eventRawPath}`, `- ${year}: failed to create ${eventRawPath}`);
    }
  } catch (e) {
    // if anything fails, leave sessions empty
    console.warn(`Failed to load event raw for ${raw.slug}:`, e);
  }

  // compute event-level start/end from session times (ISO UTC)
  event.startDateTime = getDate(
    event.sessions.map((s) => s.startDateTime),
    "min",
  );
  event.endDateTime = getDate(
    event.sessions.map((s) => s.endDateTime),
    "max",
  );

  return event;
}

function parseCalendar(): void {
  const formulas = getFormulasActive();
  formulas.forEach((formula: Formula) => {
    console.log(formula.name);

    if (Array.isArray(formula.years) && formula.years.length) {
      formula.years.forEach((year) => {
        const calendarJsonPath = path.join(VARS.DIR_DATA, formula.slug, year, "raw", calendarFilename);
        if (fs.existsSync(calendarJsonPath)) {
          try {
            const raw = fs.readFileSync(calendarJsonPath, "utf8");
            const calendarRaw = JSON.parse(raw) as RawRaceCal;

            const calendarKey = `${formula.slug}_${year}`;

            const errors: string[] = [];
            const events = calendarRaw.data
              .map((e: RawRaceCalEvent) => {
                const ev = buildEvent(e, formula, year, calendarKey, calendarRaw, errors);
                return ev;
              })
              .filter((ev): ev is RaceEvent => !!ev);

            const transformed: RaceCal = {
              key: slugsJoin(formula.slug, year),
              formulaSlug: formula.slug,
              year: calendarRaw.year,
              url: calendarRaw.url,
              title: calendarRaw.title,
              raceEvents: events,
              updatedAt: calendarRaw.updatedAt,
            };

            console.log(`- ${year}: ${calendarFilename} loaded`);
            if (errors.length) {
              console.log(`- ${year}: issues found:`);
              errors.forEach((m) => console.log(`  - ${m}`));
            }
            writeCalendar(formula.slug, year, transformed);
          } catch (err) {
            console.warn(`- ${year}: ${calendarFilename} loaded but failed to parse`);
          }
        } else {
          createEmptyJsonFile(
            calendarJsonPath,
            `- ${year}: created ${calendarJsonPath}`,
            `- ${year}: failed to create ${calendarJsonPath}`,
          );
        }
      });
    } else {
      console.warn("- no years defined");
    }
  });
}

parseCalendar();
