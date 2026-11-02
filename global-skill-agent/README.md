# ⚠️ MANDATORY RULE: READ BEFORE CODING

This repository enforces strict engineering rules that both human developers and AI coding agents must follow.

Before starting any task, reading existing code, or writing/refactoring files, you **MUST** read all rule sheets in this directory:

1. 📂 **Project Structure & Architecture**
   - [structure.md](./structure.md) (Rules 1, 2, 8, 10, 12, 28, 37) - Flat UI layouts, feature-based modules, import boundaries, component trees, the generated API contract.
2. 🧭 **Routing & Access**
   - [routing.md](./routing.md) (Rules 29-31, 36) - Access levels, permission-based guards, route file conventions, prefetch loaders and the session.
3. ⚛️ **React Development & Composition**
   - [react.md](./react.md) (Rules 3, 18-22, 26, 27, 34) - Dumb shared components, compound components, no boolean prop bloat, React 19 APIs, no dead props, business dates, URL state.
4. 🎨 **Styling, Color & Design Tokens**
   - [style.md](./style.md) (Rules 4-7, 33) - Constants, import order, statement groups in components and hooks, Tailwind v4 design tokens, no comments.
5. 🏷 **TypeScript Rules**
   - [typescript.md](./typescript.md) (Rules 9, 11, 35) - Nullability helpers, centralized type files, typed translation keys.
6. 🧱 **shadcn/ui Guidelines**
   - [shadcn.md](./shadcn.md) (Rules 13-17, 32) - Styling restrictions, Field layouts, composition, icons, CLI lifecycle, list tables that fit the viewport.
7. 📋 **Form & Validation Patterns**
   - [form.md](./form.md) (Rules 23-24) - Controlled field components, Zod 4 schema factories, mutation hooks.

---

### Rule 25 - Mandatory Pre-coding Rule Inspection

- **Always read the rules first**: Upon receiving a task or entering the environment, scan all files in `global-skill-agent/` to ensure compliance with every numbered rule (1 to 37).
- **Verify before finishing**: Run `npm run verify` (typecheck, lint with architecture boundaries, tests). Work that fails it is not done.
- **No exceptions**: Writing code that violates any rule in these documents is considered incorrect.

---

### How Each Rule Is Enforced

A rule enforced by a tool fails `npm run verify` or CI on its own. A **review** rule depends on the author and the reviewer reading the sheet, so check those by eye in every review. When a review rule keeps being broken, turn it into a lint rule (`eslint/architecture.plugin.js`, `eslint/naming.plugin.js` or `no-restricted-imports` in `eslint.config.js`) and move it up in this table.

| Rule | Topic                                    | Enforced by                                                                                                |
| :--- | :--------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| 1    | Design-system folder layout              | `boundaries` (`src/_widgets` imports nothing from the app) · review for the folder layout                  |
| 2    | Module data flow, no module `apis/`      | `architecture/no-module-apis` · `no-restricted-imports` (no `axios` / `apiClient` outside core) · review   |
| 3    | No API calls in shared components        | `no-restricted-imports` (no raw HTTP in `src/shared`) · `boundaries` · review for `core/apis` calls        |
| 4    | Domain texts are constants               | review                                                                                                     |
| 5    | Import order                             | `import-x/order`                                                                                           |
| 6    | Design tokens, no hex colors             | review                                                                                                     |
| 7    | No comments in code                      | review                                                                                                     |
| 8    | Core import boundaries                   | `boundaries` (core never imports app layers) · `no-restricted-imports` (relative imports inside core)      |
| 9    | `Nullable` / `Maybe` helpers             | review                                                                                                     |
| 10   | Logic helpers live in `utils/`           | review                                                                                                     |
| 11   | Types live in type files                 | review                                                                                                     |
| 12   | File naming, no barrels, entrypoints     | `architecture/no-barrel-file` · `no-restricted-imports` (no deep `@/_widgets/*` imports)                   |
| 13   | Tailwind restrictions                    | review                                                                                                     |
| 14   | Form layout                              | review                                                                                                     |
| 15   | Component structure and a11y             | `jsx-a11y-x` · review for composition                                                                      |
| 16   | Icons                                    | review                                                                                                     |
| 17   | shadcn port workflow                     | review                                                                                                     |
| 18   | No boolean prop proliferation            | review                                                                                                     |
| 19   | Compound components                      | review                                                                                                     |
| 20   | `{ state, actions }` contexts            | review                                                                                                     |
| 21   | Children over render props               | review                                                                                                     |
| 22   | React 19 and the React Compiler          | `no-restricted-imports` (`forwardRef`, `useContext`, `useMemo`, `useCallback`, `memo`) · `react-hooks`     |
| 23   | Controlled field components              | `no-restricted-imports` (no `Controller` in screens) · review for raw inputs                               |
| 24   | Zod schema factories                     | review                                                                                                     |
| 25   | Read the rules, run verify               | `npm run verify` · CI                                                                                      |
| 26   | No dead props                            | review                                                                                                     |
| 27   | Audit timestamps are not business dates  | review                                                                                                     |
| 28   | Component tree and role suffixes         | `naming/component-file-suffix` · `naming/screen-import-scope`                                              |
| 29   | Route access levels                      | review                                                                                                     |
| 30   | Single source of access truth            | review                                                                                                     |
| 31   | Route file conventions                   | `import-x/no-default-export` · review                                                                      |
| 32   | List tables fit the viewport             | review                                                                                                     |
| 33   | Statement groups                         | `react-body/statement-groups`                                                                              |
| 34   | Screen state lives in the URL            | review                                                                                                     |
| 35   | Typed translation keys                   | `tsc` (`CustomTypeOptions` in `src/core/types/i18next.d.ts`)                                               |
| 36   | Route loaders and the session            | review                                                                                                     |
| 37   | Generated API contract, parsed responses | BE `create-openapi-document.spec.ts` · FE CI contract diff · `tsc` · `no-restricted-imports` (no raw HTTP) |
| —    | Specs live under `src/test/`             | `architecture/spec-location`                                                                               |
