# f1-race-times-web

NestJS server for serving F1 race times web application with Expo-generated assets.

## Features

- NestJS server with Express
- Health check endpoint at `/api/v1/_health`
- Static file serving for Expo-generated web assets
- CORS enabled

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

# Production mode
npm start

# Development mode
npm run dev
```

The server will start on port 3000 (or the PORT environment variable if set).

## Endpoints

- `GET /api/v1/_health` - Health check endpoint (returns "200" with status code 200)
- `/` - Serves static files from the `public` directory

## Directory Structure

- `src/` - TypeScript source files
  - `main.ts` - Application entry point
  - `app.module.ts` - Root application module
  - `health.controller.ts` - Health check controller
- `public/` - Static assets directory (for Expo-generated files)
- `dist/` - Compiled JavaScript output
