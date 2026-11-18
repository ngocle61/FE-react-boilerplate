# FE React Boilerplate

A production-ready React 19 starter built around feature modules, strict layer boundaries and permission-based routing. Built on the latest toolchain and shadcn/ui.

## Stack

| Area         | Library                                                                 |
| :----------- | :---------------------------------------------------------------------- |
| UI           | React 19, shadcn/ui (`radix-nova`), Tailwind CSS 4, lucide-react        |
| Routing      | React Router 8 data router with lazy routes                             |
| Server state | TanStack Query 5 + Axios with token refresh                             |
| Client state | Zustand 5 (persisted auth and theme)                                    |
| Forms        | React Hook Form 7 + Zod 4                                               |
| i18n         | i18next 26 (English + Vietnamese, namespaces auto-discovered)           |
| Tooling      | Vite 8, TypeScript 7, ESLint 10 + boundaries, Prettier, Vitest 5, Husky |

TypeScript 7 (`tsc`) is installed as `@typescript/native`. `typescript-eslint` still needs the TypeScript 6 compiler API, so the `typescript` package name points at the official `@typescript/typescript6` compatibility build (binary `tsc6`), as recommended in the TypeScript 7 release notes.

## Getting started

This repository holds the frontend only. The NestJS backend is a separate repository, [BE-nestjs-boilerplate](https://github.com/ngocle61/BE-nestjs-boilerplate). Clone both into the same parent folder: `npm run api:generate` and `npm run gen` read `../BE-nestjs-boilerplate/openapi.json`.

```bash
npm install
npm run dev
```

`npm install` runs `prepare`, which installs the Git hooks. `.husky/pre-commit` runs `lint-staged` on the staged files.

Open http://localhost:3000. `.env.development` points the app at the NestJS API in `../BE-nestjs-boilerplate` (start it with `npm run start:dev` there; the Vite dev server proxies `/api`). Sign in with one of the demo accounts created by `npm run db:seed` in `../BE-nestjs-boilerplate` (password `Password@123`) or use the one-click buttons on the sign-in page (`VITE_SHOW_DEMO_ACCOUNTS=true`). The seed also creates 10 more accounts plus demo clients and interventions (see the [BE README](../BE/README.md)). The three main accounts:

| Account              | Role   | Dashboard | AI Chat | Calendar         | Users |
| :------------------- | :----- | :-------: | :-----: | :--------------- | :---: |
| `admin@example.com`  | Admin  |    ✅     |   ✅    | ✅ view + manage |  ✅   |
| `member@example.com` | Member |    ✅     |   ✅    | ✅ view + manage |   —   |
| `viewer@example.com` | Viewer |    ✅     |    —    | ✅ view only     |   —   |

Open a locked URL directly (for example `/chat` as the viewer) to see the in-place access denied page.

## Scripts

| Script                 | Description                                                                            |
| :--------------------- | :------------------------------------------------------------------------------------- |
| `npm run dev`          | Start the dev server                                                                   |
| `npm run build`        | Typecheck and build for production                                                     |
| `npm run size`         | Check the built bundle against `bundle-budget.json` (gzip)                             |
| `npm run preview`      | Preview the production build                                                           |
| `npm run typecheck`    | `tsc -b`                                                                               |
| `npm run lint`         | ESLint, including architecture boundaries and screen naming                            |
| `npm run test`         | Vitest in watch mode (`test:run` for a single run)                                     |
| `npm run verify`       | Typecheck + lint + tests — run before every push                                       |
| `npm run format`       | Prettier with Tailwind class sorting                                                   |
| `npm run api:generate` | Regenerate `src/core/contract/zod.gen.ts` from `../BE-nestjs-boilerplate/openapi.json` |
| `npm run gen`          | Scaffold code with Plop (see [Generating a module](#generating-a-module))              |

## CI/CD

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs on pull requests into `develop` or `main` and on pushes to them: formatting, the API contract check, `npm run verify`, the production build and the bundle budget.

The contract check reads `openapi.json` from the matching branch of [BE-nestjs-boilerplate](https://github.com/ngocle61/BE-nestjs-boilerplate) (the branch the change targets), so when you promote a contract change, merge the backend first.

After a push to `main` passes, the `deploy` job sends a `POST` to the `DEPLOY_HOOK_URL` repository secret: the deploy hook URL from your host, such as Render, Netlify, Vercel or Cloudflare Pages. Without the secret the job only logs a notice.

## Project structure

```text
src/
├── _widgets/            Design system: primitives in ui/ (@ui) and form fields in ui/form/ (@ui/form)
├── core/                Framework layer, no UI
│   ├── apis/            Axios client and endpoint classes
│   ├── interceptor/     Bearer token, single-flight refresh, error normalization
│   ├── guards/          ProtectedRoute, GuestRoute, PermissionRoute
│   ├── constants/       ROLES, PERMISSIONS, ROLE_PERMISSIONS, ROUTE_ACCESS, ROUTE_PATHS
│   ├── store/           Zustand stores (auth, theme)
│   ├── services/        Session start/end, current user sync
│   ├── hooks/           useAccess, useCurrentUserQuery, theme hooks
│   ├── libs/            i18n, query client
│   └── types/ utils/ converters/
├── shared/              App shell: layouts, sidebar, header, status pages, Can, QueryState, PageHeader
├── modules/             One folder per feature (authentication, dashboard, chat, calendar, user-management)
├── router/              routes.tsx tree + one <module>-routes.ts per module
├── locale/<ns>/{en,vi}.json
└── test/                Every test, mirroring the src/ path it covers, plus setup and fixtures
```

Imports between layers are enforced by `eslint-plugin-boundaries`: `_widgets` imports nothing from the app, `core` never imports UI, `shared` never imports modules, and modules never import each other.

## Routing and access

```text
root
├── GuestRoute → AuthLayout → /sign-in
└── ProtectedRoute → MainLayout
    ├── index → first module the user can open
    ├── PermissionRoute(dashboard:view)  → /dashboard
    ├── PermissionRoute(chat:use)        → /chat
    ├── PermissionRoute(calendar:view)   → /calendar
    ├── PermissionRoute(user:manage)     → /admin/users
    └── * → Not found
```

- Anonymous users are sent to `/sign-in?redirect=<path>` and returned there after signing in. The redirect is validated and dropped after an explicit sign-out.
- A missing permission renders the access denied page in place, keeping the URL and the shell.
- `ROUTE_ACCESS` is shared by the router and the sidebar, so a hidden menu item and a blocked route can never drift apart.
- Inside pages, gate actions with `<Can permissions={[PERMISSIONS.CALENDAR_MANAGE]}>` or `useAccess().can(...)`. Never compare role names.
- If the backend returns `permissions` on the user, they override the local `ROLE_PERMISSIONS` policy.
- A session ends only when the server rejects the refresh token (401 or 403). A network error or a 5xx during a refresh keeps the session, and the failed request can be retried.
- Tabs share one session: a token refresh, sign-in or sign-out in one tab reaches the others through the `storage` event, and the Web Locks API lets only one tab refresh at a time. Browsers without it, or pages not served over HTTPS or localhost, skip the lock.

### Generating a module

A module that lists one paginated BE endpoint can be scaffolded end to end with the `list-screen` generator instead of being written by hand. The output already follows the rule sheets, so `npm run verify` passes on it.

1. In `../BE-nestjs-boilerplate`, add a `GET` endpoint with Zod request and response schemas. The response must be `{ items, total, page, pageSize }` and every item must have an `id`. Run `npm run openapi:generate` there to refresh `../BE-nestjs-boilerplate/openapi.json`.
2. If the screen needs a new permission, add it to `PERMISSIONS` and grant it in `ROLE_PERMISSIONS` first. The generator only offers permissions that already exist.
3. Run `npm run api:generate` to regenerate `src/core/contract/zod.gen.ts`.
4. Run `npm run gen`, pick `list-screen` and answer the prompts:

| Prompt        | Default                                                              | Notes                                                                       |
| :------------ | :------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| Endpoint      | —                                                                    | Paginated `GET` operations found in `../BE-nestjs-boilerplate/openapi.json` |
| Module folder | `<tag>-list`                                                         | kebab-case, must not exist in `src/modules/`                                |
| Entity name   | Item schema name without `ListItem`, `Response`, `Item` or `Summary` | kebab-case, singular; names `<entity>.api.ts`, `.dto.ts` and `.service.ts`  |
| Columns       | Every field                                                          | `id`, objects, arrays and nullable booleans are not offered                 |
| Route path    | `/<module>`                                                          | Must start with `/`                                                         |
| Permission    | —                                                                    | A key of `PERMISSIONS`                                                      |
| Sidebar group | —                                                                    | A key of `NAVIGATION_GROUP_KEYS`                                            |
| Icon          | `ListIcon`                                                           | Any `lucide-react` export                                                   |

5. Finish the steps the generator prints at the end:
   - Translate `src/locale/<module>/vi.json` and rename the column labels in both locale files.
   - Add `ROUTE_PATHS.<MODULE>` to the expectations in `src/test/shared/utils/navigation.util.spec.ts` for every role that holds the permission.
   - Run `npm run verify`, then `npm run dev` and open the screen from the sidebar.

The generator creates the core DTO and api, the module component tree with its constants, converter, queries, service, search schema and types, the route and loader, both locale files, and a converter spec and table spec under `src/test/modules/<module>/`. It also registers the module in `API_ENDPOINTS`, `ROUTE_PATHS`, `ROUTE_ACCESS`, `I18N_NAMESPACES`, `i18next.d.ts`, `routes.tsx`, the navigation keys and items, and the sidebar labels in `locale/common/*.json`, then runs Prettier and `eslint --fix` on every file it touched. When a registry file has changed shape, the run stops and names that file. `git status` lists everything a run created or patched, so a run can be undone from there.

Generator internals and how to add a new generator are in [generators/README.md](./generators/README.md).

### Adding a module by hand

For any other kind of module:

1. Add permissions to `PERMISSIONS` and grant them in `ROLE_PERMISSIONS`.
2. Add the path to `ROUTE_PATHS` and the requirement to `ROUTE_ACCESS`.
3. Build the page in `src/modules/<module>/` and add `src/locale/<module>/{en,vi}.json`.
4. Create `src/router/routes/<module>-routes.ts` with `createGuardedRoute` and spread it into `routes.tsx`.
5. Add the sidebar entry to `NAVIGATION_GROUPS`.

The full conventions live in [global-skill-agent/routing.md](./global-skill-agent/routing.md).

## Connecting a real backend

Set `VITE_API_URL` (see `.env.example`). The client expects:

| Endpoint                   | Request               | Response                                                 |
| :------------------------- | :-------------------- | :------------------------------------------------------- |
| `POST /auth/sign-in`       | `{ email, password }` | `{ accessToken, refreshToken, user }`                    |
| `POST /auth/refresh-token` | `{ refreshToken }`    | `{ accessToken, refreshToken }`                          |
| `POST /auth/sign-out`      | `{ refreshToken }`    | `204`                                                    |
| `GET /users/me`            | Bearer token          | `{ id, email, fullName, avatarUrl, role, permissions? }` |

Error bodies are normalized from `{ code, message, errors }`. Adjust `core/types/*.dto.ts` and the converters if your API differs.

## UI components

The design tokens (Hanken Grotesk, brand green, 44px inputs, 48px buttons, card radius and shadows) are defined in `src/index.css`, with a matching dark palette.

Primitives are ported from the latest shadcn registry source into one folder per component, one component per file:

```text
src/_widgets/ui/dialog/
  constants.ts   accessibility labels
  types.ts       props
  dialog.tsx  dialog-content.tsx  dialog-title.tsx  dialog-close-button.tsx ...
```

To add one, read the source first (`npx shadcn@latest view <component>`), port it following [global-skill-agent/structure.md](./global-skill-agent/structure.md) Rule 1 and [shadcn.md](./global-skill-agent/shadcn.md) Rule 17, export it from `src/_widgets/public-api.ts`, and import it from `@ui`. Form fields live in `src/_widgets/ui/form/<name>-field/`, are exported from `src/_widgets/ui/form/public-api.ts`, and are imported from `@ui/form`.

## Coding rules

Human and AI contributors follow the rule sheets in [global-skill-agent/](./global-skill-agent/README.md): structure, routing, React composition, styling, TypeScript, shadcn and forms.

## Roadmap

- AI Chat module: streaming responses, conversation history, markdown rendering
- Calendar module: month/week/agenda views and event management
