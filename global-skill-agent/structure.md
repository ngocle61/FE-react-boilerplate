# Structure Rules

Architecture, folder/file organization, and import boundaries.
Part of the project's mandatory implementation rules (see [README.md](./README.md)). Do not change these rules unless the user explicitly asks to update them.

### Rule 1 - Design System Component Structure

- **No atomic design directories**: Do not use `atoms`, `molecules`, or `organisms` sub-directories in `src/_widgets/ui`.
- **Everything lives under `ui/`**: `src/_widgets` only holds `ui/`, `lib/`, `hooks/` and `public-api.ts`. There is no `shared/` folder anywhere under `src/_widgets` (`shared` is the app layer in `src/shared`) and no `form/` folder beside `ui/`.
- **One folder per primitive**: Every primitive lives in `src/_widgets/ui/<component>/`. The folder name is the component family (`dialog`, `sidebar`, `select`).
- **One component per file**: Each part of a compound component gets its own file named after it (`dialog-content.tsx`, `dialog-title.tsx`). Never bundle several components into one file.
- **Support files are siblings**: Props and other types go in `types.ts`, non-style constants (labels, sizes, keys) in `constants.ts`, `cva` variants and shared class strings in `variant.ts`, pure helpers in `utils.ts`, hooks in `use-<name>.ts`. Create a support file only when it has content.
- **Built from shadcn, owned by the project**: Start every primitive from the latest shadcn registry source (Rule 17), then port it: replace colors with the design tokens in `src/index.css`, drop `dark:` overrides, split the parts into files, and keep a11y attributes (`aria-*`, `sr-only` labels, focus rings). Accessibility labels default to constants and are overridable through props.
- **Form fields live in `ui/form/`**: Controlled react-hook-form fields live in `src/_widgets/ui/form/<name>-field/` with a sibling `types.ts`. They compose the primitives from `ui/` (`Input`, `Select`, `Field`, …). Code used by several fields sits directly in `src/_widgets/ui/form/` (`types.ts`, `utils.ts`, `use-field-ids.ts`) or in its own component folder (`form-field-shell/`, `form-choice-field-shell/`).
- **Primitive vs field**: `input/`, `select/`, `checkbox/` are plain controls with no form state, usable anywhere (search boxes, filters). `field/` is the label/description/error layout (`Field`, `FieldLabel`, `FieldError`). A `*-field` in `ui/form/` binds one control to react-hook-form inside that layout.
- **Class merging**: Import `cn` from `src/_widgets/lib/cn.ts`, which knows the custom token scales (`h-input`, `rounded-card`, `shadow-card`, `text-md`).
- **Two entrypoints**: Primitives are re-exported from `src/_widgets/public-api.ts` and imported through `@ui`. Form fields are re-exported from `src/_widgets/ui/form/public-api.ts` and imported through `@ui/form`.

#### Rule 1 Layout Example

❌ **Incorrect**

```text
src/_widgets/
  form/
    shared/
      form-field-shell.tsx
  ui/
    atoms/
      button/
        button.tsx
    dialog.tsx
```

✅ **Correct**

```text
src/_widgets/
  lib/
    cn.ts
    constants.ts
  ui/
    button/
      button.tsx
      types.ts
      variant.ts
    dialog/
      constants.ts
      dialog.tsx
      dialog-close-button.tsx
      dialog-content.tsx
      dialog-title.tsx
      types.ts
    form/
      form-field-shell/
        form-field-shell.tsx
        types.ts
      input-field/
        input-field.tsx
        types.ts
      public-api.ts
      types.ts
      use-field-ids.ts
      utils.ts
  public-api.ts
```

---

### Rule 2 - Feature-Based Architecture for Modules

- **Feature isolation**: Organise components and code inside `src/modules` by domain features.
- **Service-Query-Converter structure**: Follow a clean separation of concerns within each module folder. Data flows `core/apis → services → queries → hooks (select: converter) → components`:
  - **No `apis/` in a module**: Every `<entity>.api.ts` object (e.g., `clientApi`) lives in `src/core/apis/`. Each method is one `apiClient` call to an `API_ENDPOINTS` path, typed with the wire DTO, returning the `AxiosResponse`. A method whose response has a body passes the generated schema as `responseSchema` (Rule 37). Read methods take an optional `signal: AbortSignal` and pass it to axios. No logic. The wire types it uses (`<Entity>Dto`, `Create<Entity>Payload`, `<Entity>ListRequestParams`) live in `src/core/types/<entity>.dto.ts`, inferred from the generated contract, because core never imports from modules (Rule 8). Modules, shared and the router never import `axios`, `apiClient` or `streamClient` (enforced by `no-restricted-imports`).
  - **`{module-name}.tsx`**: The module page and the only file at the module root, so opening the module folder shows the overview of the whole module first. It orchestrates the components with layout primitives (e.g., `PageHeader`, `QueryState`) and hooks (e.g., `useSignIn`).
  - **`components/`**: Every component the page renders, laid out as the render tree (Rule 28): a component that renders children gets a folder holding it and its children; a leaf is a plain file in its parent's folder. Components rendered by several parents are flat files directly in `components/`.
  - **`services/`**: Async handlers that call `@/core/apis/<entity>.api`, unwrap `data`, map UI query params to their wire format, and run business steps (stream parsing, store sync, session start). They return DTOs; they only apply a converter when the result leaves React Query (e.g., written to a store).
  - **`queries/`**: One `<entity>.queries.ts` factory object (e.g., `clientQueries`) built with `queryOptions`: `all()` returns the root key for invalidation, `list(params)` / `detail(id)` return the key and a `queryFn` that forwards the `signal` to the service. Keys are built from `as const` constants (`<MODULE>_QUERY_KEYS`, `QUERY_SCOPES`), never inline strings.
  - **`converters/`**: Pure mapper objects (e.g., `clientConverter`) to map backend DTOs to UI models (`toRow`, `toRows`, `toFormValues`, `toOptions`) and convert UI form states to write payloads (`toCreatePayload`, `toUpdatePayload`). Read converters run in the query hook's `select` (`useQuery({ ...clientQueries.list(), select: clientConverter.toOptions })`), so the cache keeps the DTO and each hook derives its own shape.
  - **`schema/`**: Form validation schemas (e.g., Zod schemas).
  - **`types/`**: Pure interfaces and typings.
- **Conditional sub-directories**: Module sub-directories must only be created when they actually contain files used by the module.

#### Rule 2 Layout Example

```text
src/modules/client-management/
  ├── client-management.tsx
  ├── components/
  │     ├── client-management-toolbar.tsx
  │     ├── client-management-table/
  │     │     ├── client-management-table.tsx
  │     │     └── client-management-table-row.tsx
  │     └── client-management-dialogs/
  │           ├── client-management-dialogs.tsx
  │           └── client-new-dialog/
  │                 ├── client-new-dialog.tsx
  │                 └── client-form.tsx
  ├── constants/
  │     └── query-keys.constant.ts
  ├── converters/
  │     └── client.converter.ts
  ├── hooks/
  │     └── use-clients-query.ts
  ├── queries/
  │     └── client.queries.ts
  ├── schema/
  │     └── client-form.schema.ts
  ├── services/
  │     └── client.service.ts
  ├── types/
  │     └── client-management-row.type.ts
  └── utils/

src/core/
  ├── apis/
  │     └── client.api.ts
  └── types/
        └── client.dto.ts
```

---

### Rule 8 - Core Layer Import Boundaries

- **Relative imports inside core**: Code inside `src/core` must use relative imports (`./` or `../`) to import other `core` files. Do not use `@core/*` aliases from within the core layer.
- **Core decoupled from modules**: The core layer must never import or depend on anything inside `src/modules`. Shared API structures or global interfaces belong in `src/core/types`.

#### Rule 8 Examples

❌ **Incorrect**
Inside `src/core/auth/auth-store.ts`:

```typescript
import { api } from '@core/api';
import type { UserProfile } from '@/modules/user-management/types';
```

✅ **Correct**
Inside `src/core/auth/auth-store.ts`:

```typescript
import { api } from '../api';
import type { UserProfile } from '../types/auth.type';
```

---

### Rule 10 - Logic Helper Separation

- **Decouple utility functions**: Place logic processing helpers, calculations, or pure parsing utility functions in a `utils` folder or file.
- **No inline helpers**: Do not declare logic utility functions inline within mappers, services, hook files, or component bodies.

#### Rule 10 Examples

❌ **Incorrect**

```typescript
export function UserCard({ birthDate }: { birthDate: string }) {
  const calculateAge = (dateStr: string) => {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
  };

  return <div>{calculateAge(birthDate)}</div>;
}
```

✅ **Correct**
Create `src/modules/user/utils/calculate-age.ts`:

```typescript
export const calculateAge = (dateStr: string): number => {
  return new Date().getFullYear() - new Date(dateStr).getFullYear();
};
```

And import in `src/modules/user/components/user-card/user-card.tsx`:

```typescript
import { calculateAge } from '../../utils/calculate-age';

export function UserCard({ birthDate }: { birthDate: string }) {
  return <div>{calculateAge(birthDate)}</div>;
}
```

---

### Rule 12 - Component File Naming and Direct Imports

- **Name files after components**: Component files must be named after the component (e.g., `app-sidebar.tsx`) rather than using `index.tsx`.
- **No barrel index.ts exports**: Do not create `index.ts` files inside UI components or feature folders to re-export files.
- **Use direct imports for shared components**: Always import shared components pointing to their specific named files.
- **Import widgets from their entrypoint**: UI primitives come from `@ui`; form fields (`InputField`, `SelectField`, …) come from `@ui/form`. Never deep-import files under `src/_widgets`.

#### Rule 12 Examples

❌ **Incorrect**

```typescript
import { AppSidebar } from '@/shared/components/app-sidebar';
import { Button } from '@/_widgets/ui/button/button';
import { InputField } from '@ui';
```

✅ **Correct**

```typescript
import { AppSidebar } from '@/shared/components/app-sidebar/app-sidebar';
import { Button, FieldGroup } from '@ui';
import { InputField } from '@ui/form';
```

---

### Rule 28 - Component Tree, Screens and Role Suffixes

Applies to every module.

**The folder tree is the render tree.** Opening a module folder shows its page file first — the overview of the whole module. Opening `components/` then walks the same tree React renders: the sections the page lays out, the widgets each section drops in, the parts each widget is built from. A component's folder holds the component and the folders of the components it renders, so the explorer reads like the node tree in React DevTools. A flat list of components does not say which one belongs to which parent — that is the failure this rule exists to prevent.

- **The page file is alone at the top**: `<module>/<module>.tsx` is the only file at the module root (`calendar/calendar.tsx`). Everything else at the root is a folder: `components/`, other screens, and the support folders. Never repeat the module name as a folder inside itself — `calendar/calendar/` is wrong.
- **A component has to earn its file**: Extract a component only when it owns state, hooks with their own data or logic, or a meaningful chunk of markup, or when several parents render it. A heading with its description, a single note line, or any other static markup the parent can show in a few lines stays inline in the parent. The tree mirrors real components, not every visual region. `sign-in.tsx` keeps its title block and secure note inline and extracts only `SignInForm`, `SessionExpiredBanner` and `DemoAccountsList`.
- **Folders only for parents**: A component that renders child components gets a folder, `…/<name>/<name>.tsx`, holding its children. A leaf — a component that renders no child component of its own — is a plain file in its parent's folder (`user-management-table-row/user-role-badge.tsx`), never wrapped in a folder of its own. A leaf the page renders directly is a file directly in `components/`. Nothing sits next to the page.
- **Nest by render**: A component sits inside the folder of the component that renders it (`intervention-dialogs/intervention-form/intervention-form.tsx`, `intervention-dialogs/intervention-delete-dialog.tsx`). Components rendered directly by the page sit directly in `components/`.
- **Shared components are flat files in `components/`**: A component rendered by two or more parents — in any branch or screen of the module — is a plain file directly in the module's `components/`, without its own folder. `technician-schedule-list` and `combined-schedule-list` both render `schedule-column-body`, so it is `components/schedule-column-body.tsx`; the components only a shared component renders are flat files beside it (`components/drop-slot-preview.tsx`). There is no `shared/` folder anywhere in a module, and a component with a single parent never sits outside its parent's folder.
- **Other screens are folders with their own tree**: Another route in the module is a folder named after its page, holding `<screen-name>.tsx` and its own `components/` (`intervention-call/intervention-call.tsx`, `intervention-call/components/`). A screen reached from another screen nests inside that screen's folder, mirroring the route; a module with several sidebar entries gives each entry its own folder. Components used by several screens are flat files in the module's `components/`.
- **A file only reaches down, or into the shared flat files**: A file may import its own subtree (a leaf has none), the flat files in the module's `components/`, or module support code (`hooks/`, `utils/`, `types/`, `converters/`, `services/`, `queries/`, `schema/`, `constants/`). Never sideways into a sibling branch or another screen. Enforced by `naming/screen-import-scope` in `eslint/naming.plugin.js`.
- **Support folders stay at the module root**: `hooks/`, `utils/`, `types/`, `converters/`, `services/`, `queries/`, `schema/`, `constants/` are not part of the tree and are exempt from the naming rules.
- **One component per file**: A file exports exactly one component, named after the file (extends Rule 12).
- **Non-components leave the tree**: Formatters, calculations, and other pure helpers belong in `utils/` per Rule 10, even when only one component uses them.
- **Role suffix encodes the level**: Every component file name ends with a role suffix from the closed vocabulary below; page files are exempt because they are named after their folder. `naming/component-file-suffix` in `eslint/naming.plugin.js` enforces the suffix, folders only for components with children, leaves inside their parent's folder, that no `shared/` folder exists, and that only page files sit outside `components/`.

| Tier    | Meaning                                         | Allowed suffixes                                                                                                                   |
| ------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Section | A region of a page, laid out by the page itself | `-section`, `-header`, `-toolbar`, `-filters`, `-tabs`, `-panel`                                                                   |
| Widget  | A self-contained block a section drops in       | `-dialog`, `-dialogs`, `-form`, `-table`, `-card`, `-step`, `-tab`, `-list`                                                        |
| Part    | A piece that only makes sense inside one widget | `-body`, `-footer`, `-row`, `-field`, `-fields`, `-badge`, `-banner`, `-banners`, `-button`, `-icon`, `-link`, `-preview`, `-item` |

`-dialogs` is reserved for the single per-page component that hosts that page's dialogs.

Adding a word to the vocabulary means editing this table and `COMPONENT_SUFFIXES` in `eslint/naming.plugin.js` together. A component whose role has no word in the table is a sign the component does too many things, or that it is a helper that belongs in `utils/`.

#### Rule 28 Layout Example

Sidebar `Calendar` opens the calendar page; the phone icon on an intervention card opens the call screen. Excerpt — not every component is listed.

✅ **Correct**

```text
src/modules/calendar/
  ├── calendar.tsx                                  /calendar
  ├── components/
  │     ├── calendar-toolbar.tsx                    leaf rendered by the page
  │     ├── calendar-view-section/
  │     │     ├── calendar-view-section.tsx
  │     │     ├── calendar-day-section/
  │     │     │     ├── calendar-day-section.tsx
  │     │     │     ├── technician-schedule-list.tsx
  │     │     │     └── combined-schedule-list.tsx
  │     │     └── calendar-week-section.tsx           leaf: no folder
  │     ├── intervention-dialogs/
  │     │     ├── intervention-dialogs.tsx
  │     │     ├── intervention-delete-dialog.tsx
  │     │     └── intervention-form/
  │     │           ├── intervention-form.tsx
  │     │           └── intervention-form-body/
  │     │                 ├── intervention-form-body.tsx
  │     │                 └── intervention-client-fields.tsx
  │     ├── drop-slot-preview.tsx                   shared: rendered by schedule-column-body
  │     ├── intervention-card.tsx                   shared: day, week and unscheduled sections
  │     ├── intervention-corner-badge.tsx           shared: rendered by intervention-card
  │     ├── intervention-status-badge.tsx           shared: intervention-card + call screen
  │     └── schedule-column-body.tsx                shared: both schedule lists
  ├── intervention-call/                            /calendar/interventions/:interventionId/call
  │     ├── intervention-call.tsx
  │     └── components/
  │           └── intervention-call-card/
  │                 ├── intervention-call-card.tsx
  │                 └── intervention-urgent-badge.tsx
  ├── constants/
  ├── converters/
  ├── hooks/
  ├── schema/
  ├── services/
  ├── types/
  └── utils/
```

❌ **Incorrect**

```text
src/modules/calendar/
  ├── calendar/                         module name repeated as a folder
  │     └── calendar.tsx
  ├── calendar-toolbar.tsx              component next to the page
  ├── shared/                           no shared/ folder in a module
  │     └── intervention-status-badge.tsx
  └── components/
        ├── intervention-form.tsx       single parent, belongs under intervention-dialogs/
        ├── intervention-dialogs/
        │     └── intervention-delete-dialog/
        │           └── intervention-delete-dialog.tsx   leaf wrapped in its own folder
        └── shared/
              └── intervention-card/    shared component wrapped in folders
```

---

### Rule 37 - The API Contract Is Generated, and Every Response Is Parsed

The backend's Zod schemas are the single source of truth for the wire format. The FE never hand-writes a DTO.

```text
BE  dto/*.dto.ts (Zod + .meta({ id }))
      │  @Body({ schema }) / @Query({ schema }) validate, @ApiOkResponse({ standardSchema }) documents
      ▼
BE  npm run openapi:generate  →  ../BE-nestjs-boilerplate/openapi.json  (OpenAPI 3.1, committed)
      ▼
FE  npm run api:generate      →  src/core/contract/zod.gen.ts  (Zod schemas, committed, never edited)
      ▼
FE  core/types/<entity>.dto.ts   type XDto = z.infer<typeof zX>, payloads = z.input<typeof zXBody>
FE  core/apis/<entity>.api.ts    apiClient.get<XDto>(path, { responseSchema: zX })
      ▼
FE  response-contract.interceptor  parses response.data; a mismatch becomes HttpError(code: contract_mismatch)
```

- **Change the BE first, then regenerate both files**: After editing a request or response DTO, run `npm run openapi:generate` in `../BE-nestjs-boilerplate` and `npm run api:generate` here, then fix what `tsc` reports. `test/common/openapi/create-openapi-document.spec.ts` (BE) fails when `openapi.json` is stale; the FE CI job fails when `zod.gen.ts` differs from what `openapi.json` generates.
- **DTO types are inferred, never declared**: `src/core/types/<entity>.dto.ts` only re-exports `z.infer` / `z.input` of generated schemas. A field the UI needs but the API does not send belongs in a converter's UI model, not in the DTO.
- **Every body is parsed at the boundary**: Pass `responseSchema` on every `apiClient` call that returns a body. Calls that bypass `apiClient` (the token refresh, SSE frames) call `parseContract(schema, data, status)` from `@/core/utils/contract.util` themselves. Parsed objects drop unknown fields, so additive BE changes never break the FE.
- **A contract error is not retried**: It carries the HTTP status of the response it rejected (2xx), so `shouldRetryQuery` does not retry it, the global mutation toast shows `errors:contractMismatch`, and `error.cause` holds the `ZodError` for debugging.
- **Response schemas describe JSON, not Prisma**: Dates are `z.date()` in the BE schema and arrive as ISO strings (`z.iso.datetime()`) in the FE; ids are `z.string()` (not `z.uuid()`) so seeded or legacy ids never fail parsing.
