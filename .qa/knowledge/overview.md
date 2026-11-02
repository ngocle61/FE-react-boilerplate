# Overview

Facts only, each with its source.

## Purpose
- React 19 boilerplate with feature modules, strict layer boundaries and permission-based routing. [README.md]

## Screens [src/core/constants/route-paths.constant.ts]
- `/sign-in`, `/dashboard`, `/chat`, `/calendar`, `/calendar/interventions/:interventionId/call`, `/admin/users`

## Access [README.md]
- Admin: dashboard, AI chat, calendar (view + manage), users.
- Member: dashboard, AI chat, calendar (view + manage).
- Viewer: dashboard, calendar (view only).
- Opening a locked URL directly shows an in-place access denied page.

## API used [.qa/knowledge/codebase-map.md]
- `/auth/*`, `/users`, `/users/me`, `/users/technicians`, `/clients`, `/interventions`, `/chat/conversation`, `/chat/messages/stream`

## How to run [README.md, vite.config.ts]
- `npm run dev` on port 3000. `/api` is proxied to 127.0.0.1:3001.

## Languages [README.md]
- English and Vietnamese.

## Where things live [AGENTS.md]
- Features in `src/modules/*`, routes in `src/router`, primitives in `src/_widgets`, API clients in `src/core`.
