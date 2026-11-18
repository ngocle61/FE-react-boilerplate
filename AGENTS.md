# Agent Guide

Read [global-skill-agent/README.md](./global-skill-agent/README.md) and every rule sheet it lists before touching code.

Stories to implement live in `user-story/`. When given one, follow the workflow in [user-story/README.md](./user-story/README.md): requirement, analyze, Figma, implement, QA, result.

## Stack

React 19 · TypeScript 7 (`tsc`, with the TypeScript 6 API kept for typescript-eslint) · Vite 8 · Tailwind CSS 4 · shadcn/ui (radix-nova) · React Router 8 (data router) · TanStack Query 5 · Zustand 5 · React Hook Form 7 + Zod 4 · i18next 26 · Axios · Vitest 5

## Commands

| Command                              | Purpose                                                                                              |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `npm run dev`                        | Dev server on http://localhost:3000 (proxies `/api` to the NestJS API in `../BE-nestjs-boilerplate`) |
| `npm run verify`                     | Typecheck + lint (boundaries, type-aware, a11y, import order) + tests with coverage                  |
| `npm run build`                      | Production build                                                                                     |
| `npm run size`                       | After a build: gzip size per initial/lazy chunk against `bundle-budget.json`; fails when over        |
| `npm run api:generate`               | Regenerate `src/core/contract/zod.gen.ts` from `../BE-nestjs-boilerplate/openapi.json` (Rule 37)     |
| `npm run gen`                        | Scaffold code with Plop, e.g. a `list-screen` wired from one endpoint (see `generators/README.md`)   |
| `npx shadcn@latest view <component>` | Read the registry source before porting a primitive into `src/_widgets/ui/<component>/`              |

## Layers

| Folder          | Holds                                                                                                                                                             | May import                   |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `src/_widgets`  | Design-system primitives (`ui/`, imported via `@ui`) and form fields (`ui/form/`, imported via `@ui/form`)                                                        | external libs only           |
| `src/core`      | API client, every `<entity>.api.ts`, the generated contract (`contract/`) and the DTOs inferred from it, interceptors, stores, guards, access policy, i18n, types | `_widgets` is not allowed    |
| `src/shared`    | Presentational components, layouts, navigation config, shared hooks                                                                                               | `core`, `_widgets`           |
| `src/modules/*` | One feature per folder, laid out as a component tree                                                                                                              | `core`, `shared`, `_widgets` |
| `src/router`    | Route tree and per-module route files                                                                                                                             | everything above             |

The boundaries are enforced by `eslint-plugin-boundaries`; see `eslint.config.js`.
