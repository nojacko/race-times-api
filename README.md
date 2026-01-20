# race-times-api

NestJS server for serving Svetle web app and the API.

## Setup

```bash
npm install
npm run build
```

## Scripts

- Manual update the `/src/data/*/raw/` dirs using the `/scripts/scrape/*` scripts

```bash
# Prase calendars and format. Sleep as format can console errors
npx ts-node src/scripts/update-calendars.ts; sleep 1; npm run format;

npx ts-node src/scripts/update-flags.ts
npm run format

sh scripts/download-calendars.sh
sh scripts/copy-files.sh
```

## Running

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Data

### Info

- `src/data/formulas.ts`: Hard coded. Different supported Formulas i.e F1, F2, F3, F1 Acadamy, IndyCar...
- `src/data/circuits.ts`: Hard coded.
- `src/utils/circuit-map.ts`: Hard coded. Mappings.
- `src/data/(f1|f2|...)/`: Follow "Process"

### Process

- Ensure `src/data/formulas.ts` has the right `years` for each formula.
- Run `update-calendars.ts` (see "Scripts").
- Go to each of the source:
  - <https://www.formula1.com/en/racing.html>
  - <https://www.fiaformula2.com/Calendar>
  - <https://www.fiaformula3.com/Calendar>
  - <https://www.fiaformulae.com/en/calendar>
  - <https://www.f1academy.com/Racing-Series/Calendar>
- Open console
- Paste in `scripts/scrape/utils.js`.
- Paste in the appropriate `*-calendar.js`.
  - "f2" and "f3" share `f2-calendar.js`.
- Copy the JSON into the correct `raw/_calendar.json` file.
- Run `update-calendars.ts` (see "Scripts").
- If missing circuits:
  - Update `src/utils/circuit-map.ts` with the correct mappings
  - If needed, create the circuits in `src/data/circuits.ts`
- The script will create the `raw/*.json` files
- Visit each race's page
- Paste in the appropriate `*-calendar-event.js`.
- Copy the JSON into the correct `raw/*` file.
- Run `update-calendars.ts` (see "Scripts").

## Endpoints

- `/` - Serves static files from the `public` directory
- `/api` - API root
- `/api/docs` - Swagger UI (only in non-production)
- `/api/v1/_health` - Health check endpoint

## Directory Structure

- `src/` - TypeScript source files
- `public/` - Additional static assets
- `dist/` - Compiled JavaScript output
- `scripts/`
  - Helper scripts (e.g. `scripts/copy-files.sh`)
- `scripts/scrape`
  - Scraping scripts
