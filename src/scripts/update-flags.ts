import * as fs from "fs/promises";
import * as path from "path";
import { VARS } from "../vars";
import { circuits } from "../data/circuits";

async function main() {
  const destDir = path.join(VARS.DIR_ROOT, "public", "flags");
  await fs.mkdir(destDir, { recursive: true });

  // clear existing files in the destDir by listing and deleting individual files
  try {
    const entries = await fs.readdir(destDir);
    for (const entry of entries) {
      const p = path.join(destDir, entry);
      try {
        await fs.unlink(p);
      } catch (e) {
        // ignore unlink errors for non-file entries or permission issues
      }
    }
  } catch (e) {
    // if readdir fails, ignore and continue (dir may not exist yet)
  }

  // gather unique country codes from circuits
  const countries = new Set<string>();
  for (const c of circuits) {
    const country = (c.country || "").toLowerCase();
    if (country) countries.add(country);
  }

  if (countries.size === 0) {
    console.log("No country codes found in circuits, nothing to copy.");
  } else {
    console.log(`Copying flags for ${countries.size} countries...`);
    for (const country of countries) {
      const src = path.join(VARS.DIR_ROOT, "node_modules", "circle-flags", "flags", `${country}.svg`);
      const dest = path.join(destDir, `${country}.svg`);

      try {
        await fs.copyFile(src, dest);
      } catch (err: any) {
        console.warn(`Could not copy flag for ${country}: ${err.message}`);
      }
    }
  }
}

main();
