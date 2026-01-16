import * as fs from "fs/promises";
import * as path from "path";
import { VARS } from "../vars";
import { formulas } from "../data/formulas";
import f1Races from "../data/f1-races";
import f2Races from "../data/f2-races";

type Race = { slug: string; country?: string };

const racesMap: Record<string, Race[]> = {
  f1: f1Races,
  f2: f2Races,
};

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

  for (const formula of formulas) {
    const races = racesMap[formula.slug];
    if (!races || !races.length) {
      console.log(`No races for ${formula.slug}, skipping.`);
      continue;
    } else {
      console.log(`Copying ${formula.slug} flags...`);
    }

    for (const race of races) {
      const country = (race.country || "").toLowerCase();
      if (!country) continue;

      const src = path.join(VARS.DIR_ROOT, "node_modules", "circle-flags", "flags", `${country}.svg`);
      const dest = path.join(destDir, `${country}.svg`);

      try {
        await fs.copyFile(src, dest);
      } catch (err: any) {
        console.warn(`Could not copy flag for ${race.slug} (${country}): ${err.message}`);
      }
    }
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export default main;
