# Project context for QA

## Project brief

Demo project, not a real product. React 19 frontend for a NestJS API: dashboard, calendar, AI chat and user management. The user confirmed this summary and that QA runs locally only, with stories from `user-story/`.

## Verified facts

- Run locally with `npm run dev` on http://localhost:3000. The API is the sibling repo `../BE-nestjs-boilerplate` on port 3001, proxied through `/api`.
- Sign in with email and password. Demo accounts: `admin@example.com`, `member@example.com`, `viewer@example.com`.
- Roles are ADMIN, MEMBER and VIEWER.
- No tracker, VPN or feature flags.
