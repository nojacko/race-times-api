import { f1Calendar2026 } from "../data/f1/2026/calendar";
import { raceToCircuit } from "../utils/circuit-map";
import { slugsJoin } from "../utils/strings";

// Clone existing mapping so we can safely add new keys
const updated: Record<string, string> = { ...raceToCircuit };

// Add any missing events from the calendar
for (const ev of f1Calendar2026.calendarEvents) {
  const key = slugsJoin(ev.formulaSlug, ev.slug);
  if (updated[key] === undefined) {
    updated[key] = "";
  }
}

const hasMissing = Object.values(updated).some((v) => v === undefined || v === "");
if (!hasMissing) {
  console.log("circuit-map.ts: up-to-date");
} else {
  console.log("circuit-map.ts: update and populate using...");
  console.log(JSON.stringify(updated, null, 2));
}
