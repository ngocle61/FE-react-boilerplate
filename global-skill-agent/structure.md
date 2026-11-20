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
  - **`{module-name}.tsx`**: The module page and the only file at the module root, so opening the module folder shows the overview of the whole module first. It orchestrates the components with layout primitives (e.g., `PageHeader`, `QueryState`) and hooks (e.g., `useSignIn`). A module with several sidebar entries has no root page: each entry is a screen folder at the root (Rule 28).
  - **`components/`**: Every component the page renders, laid out as the render tree (Rule 28): a component that renders children gets a folder holding it and its children; a leaf is a plain file in its parent's folder. Components rendered by several parents are flat files in the `components/` of the lowest screen that holds them all.
  - **`services/`**: Async handlers that call `@/core/apis/<entity>.api`, unwrap `data`, map UI query params to their wire format, and run business steps (stream parsing, store sync, session start). They return DTOs; they only apply a converter when the result leaves React Query (e.g., written to a store).
  - **`queries/`**: One `<entity>.queries.ts` factory object (e.g., `clientQueries`) built with `queryOptions`: `all()` returns the root key for invalidation, `list(params)` / `detail(id)` return the key and a `queryFn` that forwards the `signal` to the service. Keys are built from `as const` constants (`<MODULE>_QUERY_KEYS`, `QUERY_SCOPES`), never inline strings.
  - **`converters/`**: Pure mapper objects (e.g., `clientConverter`) to map backend DTOs to UI models (`toRow`, `toRows`, `toFormValues`, `toOptions`) and convert UI form states to write payloads (`toCreatePayload`, `toUpdatePayload`). Read converters run in the query hook's `select` (`useQuery({ ...clientQueries.list(), select: clientConverter.toOptions })`), so the cache keeps the DTO and each hook derives its own shape.
  - **`schema/`**: Form validation schemas (e.g., Zod schemas).
  - **`types/`**: Pure interfaces and typings.
- **Conditional sub-directories**: Module sub-directories must only be created when they actually contain files used by the module.
- **Code for several modules leaves the module**: Modules never import each other. When a second module needs a component, hook, query or converter, move it to `src/shared` per Rule 39 instead of copying it.

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
- **A module with several sidebar entries has no root page**: When the module is a sidebar group (one `NAVIGATION_GROUPS` group, or several items under one route prefix) and no route renders the module itself, the root holds no `.tsx` file. Each entry is a screen folder at the root, named after its page: `product-management/product-list/product-list.tsx`, `product-management/production-report/production-report.tsx`. `authentication/sign-in/` is the smallest case. Never add an empty `<module>.tsx` that only redirects.
- **A component has to earn its file**: Extract a component only when it owns state, hooks with their own data or logic, or a meaningful chunk of markup, or when several parents render it. A heading with its description, a single note line, or any other static markup the parent can show in a few lines stays inline in the parent. The tree mirrors real components, not every visual region. `sign-in.tsx` keeps its title block and secure note inline and extracts only `SignInForm`, `SessionExpiredBanner` and `DemoAccountsList`.
- **Folders only for parents**: A component that renders child components gets a folder, `…/<name>/<name>.tsx`, holding its children. A leaf — a component that renders no child component of its own — is a plain file in its parent's folder (`user-management-table-row/user-role-badge.tsx`), never wrapped in a folder of its own. A leaf the page renders directly is a file directly in `components/`. Nothing sits next to the page.
- **Nest by render**: A component sits inside the folder of the component that renders it (`intervention-dialogs/intervention-form/intervention-form.tsx`, `intervention-dialogs/intervention-delete-dialog.tsx`). Components rendered directly by the page sit directly in `components/`.
- **Shared components are flat files at the lowest common screen**: A component rendered by two or more parents is a plain file, without its own folder, in the `components/` of the lowest screen whose folder holds every parent. Inside one screen that is the screen's own `components/`: `technician-schedule-list` and `combined-schedule-list` both render `schedule-column-body`, so it is `components/schedule-column-body.tsx`; the components only a shared component renders are flat files beside it (`components/drop-slot-preview.tsx`). Two screens under `product-details/` share through `product-details/components/`; two sidebar entries share through the module's `components/`. There is no `shared/` folder anywhere in a module, and a component with a single parent never sits outside its parent's folder.
- **Other screens are folders with their own tree**: Another route in the module is a folder named after its page, holding `<screen-name>.tsx` and its own `components/` (`intervention-call/intervention-call.tsx`, `intervention-call/components/`). A screen reached from another screen nests inside that screen's folder, mirroring the route: `/products/:id/blends/:blendId` lives at `product-list/product-details/blend-details/`. Check the tree against the module's route file in `src/router/routes/` and its `NAVIGATION_GROUPS` items, not against a file listing.
- **A file only reaches down, or up into shared flat files**: A file may import its own subtree (a leaf has none), the flat files in the `components/` of any screen above it, the support code at the module root, or the support code of the top-level screen it belongs to. Never sideways into a sibling branch or another screen. Enforced by `naming/screen-import-scope` in `eslint/naming.plugin.js`.
- **Support folders sit at the module root, or in a top-level screen**: `hooks/`, `utils/`, `types/`, `converters/`, `services/`, `queries/`, `schema/`, `constants/` are not part of the tree and are exempt from the component naming rules. They live at the module root. A screen folder directly under the root (a sidebar entry) may hold its own support folders for code that only its subtree uses (`product-management/production-report/hooks/`); move the file to the module root when a second entry needs it. Support folders never sit deeper, never inside `components/`. Enforced by `naming/support-file-name`.
- **One component per file**: A file exports exactly one component, named after the file (extends Rule 12).
- **Non-components leave the tree**: Formatters, calculations, and other pure helpers belong in `utils/` per Rule 10, even when only one component uses them.
- **Role suffix encodes the level**: Every component file name ends with a role suffix from the closed vocabulary below; page files are exempt because they are named after their folder. `naming/component-file-suffix` in `eslint/naming.plugin.js` enforces the suffix, folders only for components with children, leaves inside their parent's folder, that no `shared/` folder exists, and that only page files sit outside `components/`. The same checks run on the domain slices in `src/shared/domains/` (Rule 39).

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

#### Rule 28 Layout Example: a Module With Several Sidebar Entries

Sidebar group `Product Management` has two entries. `Product List` opens the product table, a row opens a product, and a product opens its blends; `Production Report` opens the daily report. Excerpt.

✅ **Correct**

```text
src/modules/product-management/                     no root page: the module is a sidebar group
  ├── product-list/                                 /products
  │     ├── product-list.tsx
  │     ├── components/
  │     │     ├── product-filters.tsx
  │     │     ├── product-table/
  │     │     │     ├── product-table.tsx
  │     │     │     └── product-table-row.tsx
  │     │     └── quality-spec-table.tsx            shared: product-list + product-builder
  │     ├── product-builder/                        /products/new
  │     │     ├── product-builder.tsx
  │     │     └── components/
  │     └── product-details/                        /products/:productId
  │           ├── product-details.tsx
  │           ├── components/
  │           │     ├── product-details-header.tsx
  │           │     └── read-only-field.tsx         shared: product-details + its child screens
  │           ├── product-edit/                     /products/:productId/edit
  │           └── blend-details/                    /products/:productId/blends/:blendId
  ├── production-report/                            /products/production-report
  │     ├── production-report.tsx
  │     ├── components/
  │     ├── hooks/                                  only production-report uses these
  │     │     └── use-production-report-kpis.ts
  │     └── utils/
  ├── components/
  │     └── product-status-badge.tsx                shared: both entries
  ├── constants/
  ├── converters/
  ├── hooks/
  ├── queries/
  ├── schema/
  ├── services/
  ├── types/
  └── utils/
```

❌ **Incorrect**

```text
src/modules/product-management/
  ├── product-management.tsx            empty page that only redirects to an entry
  ├── product-list.tsx                  screens as a flat list of pages at the root
  ├── product-details.tsx
  ├── components/
  │     └── read-only-field.tsx         only product-details screens use it: product-details/components/
  └── product-list/
        └── product-details/
              └── components/
                    └── hooks/          support folder inside components/
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

---

### Rule 39 - Code Shared Between Modules

Modules never import each other (`boundaries`). Every piece of code has one home, chosen by who uses it. Move code up the moment a second module needs it; never copy it.

| Used by                                 | Knows a domain? | Home                                                                               |
| :-------------------------------------- | :-------------- | :--------------------------------------------------------------------------------- |
| One screen subtree                      | yes             | That screen's folder (Rule 28)                                                     |
| One module                              | yes             | The module's `components/` or support folders (Rule 2)                             |
| Two or more modules                     | yes             | A domain slice: `src/shared/domains/<domain>/`                                     |
| Two or more modules                     | no              | `src/shared/components/`, `hooks/`, `utils/`, `constants/`, `types/`               |
| The app shell (session, access, guards) | —               | `src/core/` (`authQueries`, `useAuthUser`, `useAccess`)                            |
| Every module (the wire format)          | —               | `src/core/apis/<entity>.api.ts` and `src/core/types/<entity>.dto.ts` (Rules 2, 37) |

- **A domain slice is a module without pages**: `src/shared/domains/<domain>/` is named after the domain it serves (`order`, `product`), not after the modules that use it. It holds `components/` laid out as a render tree (Rule 28: role suffixes, folders only for parents, flat files for components rendered by several parents) and the same support folders as a module (`services/`, `queries/`, `converters/`, `hooks/`, `schema/`, `types/`, `constants/`, `utils/`), all at its root. It has no page, no route and no `apis/`.
- **One query factory per entity**: When two modules read the same entity, its service, `<entity>.queries.ts` and converter move into the slice, so both modules share one cache key and one invalidation (`<entity>Queries.all()`). Two modules that cache the same endpoint under their own keys show stale data after the other one writes.
- **Option lists are slice hooks**: A select fed by another entity (mills, clients, technicians) uses `use-<entity>-options-query.ts` from that entity's slice, which runs `useQuery({ ...<entity>Queries.list(), select: <entity>Converter.toOptions })`.
- **Slices sit below modules**: A module may import any slice. A slice may import another slice, `core`, `_widgets` and the generic `src/shared` folders, never a module or the router. Generic `src/shared` code never imports a slice, so it stays domain-free.
- **Shared components and layouts stay presentational**: `src/shared/components/` and `src/shared/layout/` never import `@/core/apis` or a slice (Rule 3). A component that loads its own data belongs to a slice.
- **Translations**: A slice reads the namespace of the domain it serves (`useTranslation(I18N_NAMESPACES.ORDER)`), declared in `src/locale/<domain>/` like any namespace (Rule 35). Text used by every screen goes to `common`.

Enforced by `boundaries` (the `domain` element in `eslint.config.js`), `no-restricted-imports` on `src/shared/components` and `src/shared/layout`, and the `naming/*` rules, which run on slices as they do on modules.

#### Rule 39 Layout Example

The order form is used by `order-management`, `freight-management` and `weighbridge`; the mill select is used by nine modules.

```text
src/shared/domains/
  ├── order/
  │     ├── components/
  │     │     ├── order-status-badge.tsx
  │     │     └── order-form/
  │     │           ├── order-form.tsx
  │     │           └── order-form-footer.tsx
  │     ├── converters/
  │     │     └── order.converter.ts
  │     ├── hooks/
  │     │     └── use-order-query.ts
  │     ├── queries/
  │     │     └── order.queries.ts
  │     ├── schema/
  │     │     └── order-form.schema.ts
  │     └── services/
  │           └── order.service.ts
  └── mill/
        ├── converters/
        │     └── mill.converter.ts
        ├── hooks/
        │     └── use-mill-options-query.ts
        ├── queries/
        │     └── mill.queries.ts
        └── services/
              └── mill.service.ts
```

---

### Rule 40 - File and Identifier Naming

A file name says what kind of code it holds, and the exported name says which file it came from. Folders, files and route segments are kebab-case.

| Folder                    | File name                                       | Exports                                                                                                                 |
| :------------------------ | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `core/apis/`              | `<entity>.api.ts`                               | `<entity>Api` (`userManagementApi`)                                                                                     |
| `core/types/`             | `<entity>.dto.ts`, `<name>.type.ts`             | `<Entity>Dto`, `Create<Entity>Payload`, `<Entity>ListRequestParams`                                                     |
| `services/`               | `<entity>.service.ts`                           | `<entity>Service`                                                                                                       |
| `queries/`                | `<entity>.queries.ts`                           | `<entity>Queries` with `all()`, `list(params)`, `detail(id)`                                                            |
| `converters/`             | `<name>.converter.ts`                           | `<name>Converter` with `toRow`, `toRows`, `toOptions`, `toFormValues`, `toCreatePayload`                                |
| `schema/`                 | `<form>.schema.ts`, `<screen>-search.schema.ts` | `create<Form>Schema(t)`, `<screen>SearchSchema`                                                                         |
| `types/` (outside core)   | `<name>.type.ts`                                | `<Name>Props`, `<Form>Values`, `<Entity>Row`                                                                            |
| `constants/`              | `<name>.constant.ts`                            | `SCREAMING_SNAKE` objects `as const` (`<MODULE>_QUERY_KEYS`, `<FORM>_DEFAULT_VALUES`, `<FORM>_LIMITS`)                  |
| `utils/`                  | `<name>.util.ts`                                | camelCase functions (`toTelHref`)                                                                                       |
| `hooks/`                  | `use-<name>.ts`                                 | `use<Name>`: `use<Entities>Query` / `use<Entity>Query` for reads, `use<Action><Entity>` for mutations (`useCreateUser`) |
| `core/store/`             | `<name>.store.ts`                               | `use<Name>Store`                                                                                                        |
| `core/guards/`            | `<name>-route.tsx`                              | `<Name>Route`                                                                                                           |
| `core/interceptor/`       | `<name>.interceptor.ts`                         | `setup<Name>Interceptor`                                                                                                |
| `router/routes/`          | `<module>-routes.ts`                            | `<module>Routes: RouteObject[]`                                                                                         |
| `router/loaders/`         | `<module>.loader.ts`                            | `<module>Loader`                                                                                                        |
| Screen folder             | `<screen>.tsx`                                  | `<Screen>Page`                                                                                                          |
| `components/`             | `<name>-<role>.tsx` (Rule 28)                   | `<Name><Role>`                                                                                                          |
| `src/locale/<namespace>/` | `en.json`, `vi.json`                            | The namespace is the module or domain folder name                                                                       |

- **Name by entity, then by screen**: An entity file (`intervention.service.ts`, `intervention.queries.ts`) is named after the BE resource and shared by every screen of the module. A screen-specific file is named after the screen or form (`calendar-search.schema.ts`, `intervention-form.constant.ts`, `calendar-toolbar.type.ts`).
- **Prefix with the module only to avoid a clash**: Query keys carry the module or slice name (`CALENDAR_QUERY_KEYS.CLIENTS = 'calendar-clients'`) because every key shares one cache. File names repeat the module name only when the bare name would be ambiguous (`user-filter.converter.ts` beside `user.converter.ts`).
- **One exported object per support file**: A support file may also export the types or constants that only its object uses, but the object named in the table is the reason the file exists.
- **Spell domain words out**: Use `grain-transfer-sheet`, not `gts`, in files and identifiers, unless the abbreviation is the term the story and the API use.
- **`src/_widgets` keeps the layout of Rule 1**: `types.ts`, `constants.ts`, `variant.ts`, `utils.ts` and `use-<name>.ts` sit beside each primitive.

`naming/support-file-name` in `eslint/naming.plugin.js` checks the file name per folder, that `.dto.ts` files exist only in `src/core/types`, that every `.api.ts`, `.service.ts`, `.queries.ts` and `.converter.ts` exports the object named after it, and where support folders may sit (Rules 28 and 39). The type, hook and constant names are checked in review.
