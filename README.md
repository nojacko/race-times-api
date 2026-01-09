# f1-race-times-web

NestJS server for serving Expo web app and an API.

## Setup

```bash
npm install
npm run build
```

## Running

```bash
# Copy latest Expo build
rm -rf ./public-expo
cp -r ../f1-race-times-app/dist ./public-expo

# Update Data
npm run cal:download
npm run cal:parse
npm run cal:process

# Development mode
npm run dev
```

## Production

```bash
npm start
```

## Endpoints

- `/` - Serves static files from the `public` directory
- `/api` - API root
- `/api/docs` - Swagger UI (only in non-production)
- `/api/v1/_health` - Health check endpoint

## Directory Structure

- `src/` - TypeScript source files
- `public-expo/` - Static assets directory for Expo-generated files
- `public/` - Additional static assets
- `dist/` - Compiled JavaScript output
