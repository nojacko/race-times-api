import * as fs from "fs";
import * as path from "path";
import { VARS } from "../vars";
import { formulas } from "../data/formulas";
import type { Formula } from "../types/Formula";
import type { CalendarRaw } from "../types/CalendarRaw";
import type { Calendar, CalendarEvent, CalendarEventType } from "../types/Calendar";
import { getCircuitSlug } from "../utils/circuit-map";

function writeCalendar(slug: string, year: number, calendar: Calendar) {
  const targetDir = path.join(VARS.DIR_DATA, slug, String(year));
  fs.mkdirSync(targetDir, { recursive: true });

  // compute relative import path from the generated file to the types file
  const typesPathAbsolute = path.join(__dirname, "..", "types", "Calendar");
  let typesImportPath = path.relative(targetDir, typesPathAbsolute).replace(/\\/g, "/");
  if (!typesImportPath.startsWith(".")) typesImportPath = `./${typesImportPath}`;

  const outPath = path.join(targetDir, "calendar.ts");
  // build a safe identifier from the slug for a named export
  let safeSlug = slug.replace(/[^a-zA-Z0-9_$]/g, "_");
  if (/^[0-9]/.test(safeSlug)) safeSlug = `_${safeSlug}`;
  const exportIdent = `${safeSlug}Calendar${year}`;

  const content = [
    `// AUTO-GENERATED: do not edit\nimport type { Calendar } from "${typesImportPath}";`,
    `export const ${exportIdent}: Calendar = ${JSON.stringify(calendar, null, 2)};`,
  ];

  fs.writeFileSync(outPath, content.join("\n\n"), "utf8");
  console.log(`- ${year}: calendar.ts written`);
}

function buildEvent(raw: any, formula: Formula, year: number, calendarKey: string, calendarRaw: CalendarRaw): CalendarEvent {
  const typeRaw = (raw.type || "").toString().trim();
  let eventType: CalendarEventType = "testing";
  let round = 0;

  if (/^ROUND\b/i.test(typeRaw)) {
    eventType = "round";
    const m = typeRaw.match(/ROUND\s*(\d+)/i);
    round = m ? parseInt(m[1], 10) || 0 : 0;
  }

  const event: CalendarEvent = {
    key: `${calendarKey}_${raw.slug}`,
    formulaSlug: formula.slug,
    year,
    slug: raw.slug,
    circuitSlug: getCircuitSlug(formula.slug, raw.slug),
    url: raw.url || "",
    nameFull: raw.nameFull || "",
    nameShort: raw.nameShort ?? "",
    displayDate: raw.displayDate ?? "",
    eventType,
    round,
    sessions: [],
    updatedAt: calendarRaw.updatedAt,
  };

  return event;
}

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

          const transformed: Calendar = {
            key: calendarKey,
            formulaSlug: formula.slug,
            year: calendarRaw.year,
            url: calendarRaw.url,
            title: calendarRaw.title,
            calendarEvents: (calendarRaw.data || []).map((e: any) => {
              return buildEvent(e, formula, year, calendarKey, calendarRaw);
            }),
            updatedAt: calendarRaw.updatedAt,
          };

          console.log(`- ${year}: calendar.json loaded`);
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
