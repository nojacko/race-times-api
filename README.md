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
npx ts-node src/scripts/parse-calendars.ts; npm run format;

npx ts-node src/scripts/update-flags.ts
npm run format

sh scripts/copy-files.sh
```

## Running

```bash
sh scripts/copy-files.sh
npm run cal:all
npm run dev
```

## Production

```bash
sh scripts/copy-files.sh
npm run build
npm start
```

## Data Processes

- `formulas.ts`: Hard coded. Different supported Formulas i.e F1, F2, F3, F1 Acadamy, IndyCar...

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
