# React Rules

React component practices.
Part of the project's mandatory implementation rules (see [README.md](./README.md)). Do not change these rules unless the user explicitly asks to update them.

### Rule 3 - No API Calls in Shared Components

Never make API calls in `src/shared/components` because all components there are dumb/presentational components.

---

## ⚛️ React Composition Patterns

Guidelines for building flexible, modular, and scaling components. AI Agents must prioritize these design patterns to avoid boolean prop proliferation and ensure low coupling.

### Summary

React composition patterns for scaling components and avoiding boolean prop proliferation.

- Covers four priority categories: component architecture, state management, implementation patterns, and React 19 APIs, each with specific rules and code examples.
- Includes 10+ named patterns addressing compound components, context providers, state lifting, and explicit variants.
- Designed for refactoring bloated components, building reusable libraries, and reviewing component architecture decisions.
- React 19 specific guidance on removing forwardRef and using use() instead of useContext().

---

### Rule 18 - Avoid Boolean Prop Proliferation

- **Do not use boolean flags** to switch layouts, content visibility, or behaviors inside a component.
- **Use composition** (e.g., passing elements as children) or create distinct, explicit variants.

#### Rule 18 Examples

❌ **Bad**

```tsx
interface CardProps {
  title: string;
  showIcon?: boolean;
  isBorderless?: boolean;
}

export function Card({ title, showIcon, isBorderless }: CardProps) {
  return (
    <div className={isBorderless ? 'p-0' : 'border p-4'}>
      {showIcon && <Icon />}
      <h2>{title}</h2>
    </div>
  );
}
```

✅ **Good**

```tsx
interface CardProps {
  children: React.ReactNode;
  borderVariant?: 'bordered' | 'borderless';
}

export function Card({ children, borderVariant = 'bordered' }: CardProps) {
  return <div className={borderVariant === 'bordered' ? 'border p-4' : 'p-0'}>{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}
```

---

### Rule 19 - Compound Component Architecture

- **Coordinate components using shared state**: Group related widgets that manage joint behaviors (e.g., tabs, select menus, accordions) into compound component groups sharing React Context.
- **Access implicit state**: Child elements must consume the shared context implicitly, shielding the developer from having to bind change events and properties manually.

#### Rule 19 Examples

❌ **Bad**

```tsx
interface TabsProps {
  activeTab: string;
  tabs: { id: string; label: string }[];
  onSelect: (id: string) => void;
}

export function Tabs({ activeTab, tabs, onSelect }: TabsProps) {
  return (
    <div>
      <div className="flex">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => onSelect(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

✅ **Good**

```tsx
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  activeTab: string;
  selectTab: (id: string) => void;
} | null>(null);

export function Tabs({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const selectTab = (id: string) => setActiveTab(id);
  return (
    <TabsContext.Provider value={{ activeTab, selectTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
}

export function TabsTrigger({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used inside Tabs');
  return <button onClick={() => context.selectTab(id)}>{children}</button>;
}
```

---

### Rule 20 - Decoupled State & Context Interfaces

- **Isolate state management**: Decouple the component layout from the state store mechanics.
- **Define clear context interfaces**: Context values must follow a strict `{ state, actions }` contract to make state interactions explicit and allow easy mocking or dependency injection.
- **Lift state for sibling components**: Move states to Context Providers when multiple component nodes must respond to changes together.

#### Rule 20 Examples

❌ **Bad**

```tsx
const TodoContext = createContext<{
  todos: any[];
  setTodos: any;
  loading: boolean;
  setLoading: any;
} | null>(null);
```

✅ **Good**

```tsx
interface Todo {
  id: string;
  text: string;
}

interface TodoState {
  items: Todo[];
  isLoading: boolean;
}

interface TodoActions {
  add: (text: string) => void;
  remove: (id: string) => void;
}

interface TodoContextValue {
  state: TodoState;
  actions: TodoActions;
}

const TodoContext = createContext<TodoContextValue | null>(null);
```

---

### Rule 21 - Children Over Render Props

- **Avoid custom render properties**: Prefer the clean use of standard `children` rendering over custom render hooks/functions (e.g. `renderHeader`, `renderFooter`).
- **Divide layouts into semantic sub-components**: Allow layouts to accept sub-components directly as children to decouple parent containers from rendering specifics.

#### Rule 21 Examples

❌ **Bad**

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function List({ items, renderItem }: ListProps<any>) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}
    </div>
  );
}
```

✅ **Good**

```tsx
interface ListProps {
  children: React.ReactNode;
}

export function List({ children }: ListProps) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return <div className="border p-2">{children}</div>;
}
```

---

### Rule 22 - React 19 Upgrade Adaptations

- **No forwardRef**: When React 19+ is used, write components without using `forwardRef`. Bind the component's `ref` attribute directly as a parameter prop.
- **Use use() hook**: Substitute `useContext` with the native `use()` hook to read context resources dynamically or inside control statement blocks.
- **Mandatory in this template**: The project runs React 19 (see [package.json](../package.json)), so code never uses `forwardRef` or `useContext`. This includes the primitives in `src/_widgets/ui`.
- **React Compiler memoizes for you**: `vite.config.ts` runs `babel-plugin-react-compiler` through `reactCompilerPreset`. Code in `src/modules`, `src/shared` and `src/core` never adds `useMemo`, `useCallback` or `memo`; write plain `const` values and functions. To run the latest props from an effect cleanup or subscription without re-subscribing, use `useEffectEvent`. Keep hooks compilable: the compiler skips a whole function that uses `try … finally`, so put the cleanup after a `try`/`catch` that already handles every error. The ported shadcn primitives in `src/_widgets/ui` keep their upstream memoization. Vitest runs without the compiler (`process.env.VITEST` in `vite.config.ts`) because its memo-cache branches would swamp the coverage numbers, so code must stay correct without memoization: an effect that depends on a function must be guarded (for example `hasSearchStateChanges`) or use `useEffectEvent`.

#### Rule 22 Examples (React 19+)

❌ **Bad**

```tsx
import React, { forwardRef } from 'react';

export const TextInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  },
);
```

✅ **Good**

```tsx
export function TextInput({
  ref,
  ...props
}: React.ComponentProps<'input'> & { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}
```

---

### Rule 26 - Prop Wiring Completeness (No Dead Props)

- **Every declared prop must be wired**: A prop declared in a component's type MUST be consumed and applied to a DOM node or child component. Never declare a prop — especially interactive/state props like `disabled`, `readOnly`, `required`, `isLoading`, `error` — that the component silently ignores.
- **Wrappers must forward interactive props**: Field/wrapper components (e.g. `MultiSelectField`, `SwitchField`, `CheckboxField`) must forward interactive props to their underlying control, either explicitly or by spreading `{...props}` onto a native element. A wrapper that declares `disabled` but neither forwards nor spreads it renders an always-enabled control — a bug TypeScript cannot see.
- **TypeScript will NOT catch this**: Passing an optional prop that the component ignores type-checks cleanly and fails silently at runtime. When authoring or reviewing a wrapper, verify by eye that each declared prop reaches a DOM node or child.
- **Custom (non-native) widgets must implement `disabled` manually**: For `<div>`-based interactive widgets (Popover multiselect, custom switch, etc.), the native `disabled` attribute and CSS `disabled:` variants do nothing. You must (1) guard the open/toggle/change handler, (2) hide destructive affordances such as remove (`×`) buttons, and (3) apply disabled styling via `cn()` conditionals (`disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'`).

#### Rule 26 Examples

❌ **Bad** — `disabled` declared in the props type but never applied; the control is always interactive.

```tsx
export interface MultiSelectProps {
  options: Option[];
  selected: ID[];
  onChange: (v: ID[]) => void;
  disabled?: boolean;
}

export const MultiSelect = ({ options, selected, onChange }: MultiSelectProps) => (
  <Popover onOpenChange={setOpen}>
    {selected.map((v) => (
      <button onClick={() => remove(v)}>
        <X />
      </button>
    ))}
  </Popover>
);
```

✅ **Good** — `disabled` is consumed: it blocks opening, hides the remove button, and styles the trigger.

```tsx
export const MultiSelect = ({
  options,
  selected,
  onChange,
  disabled = false,
}: MultiSelectProps) => (
  <Popover
    onOpenChange={(next) => {
      if (!disabled) setOpen(next);
    }}
  >
    <Trigger className={cn(disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer')}>
      {selected.map((v) => (
        <span>
          {label(v)}
          {!disabled && (
            <button onClick={() => remove(v)}>
              <X />
            </button>
          )}
        </span>
      ))}
    </Trigger>
  </Popover>
);
```

---

### Rule 27 - Never Display Audit Timestamps as a Business Date

- **`createdAt` / `updatedAt` are NOT business dates**: They are record audit metadata (when the row was written to the database). A UI field or column labelled "Date" (a transfer sheet Date, a report Date, a production Date, etc.) must be bound to the domain date field defined by the spec/US — never to `createdAt` or `updatedAt`.
- **Silent wrong value**: Substituting `createdAt` for a business date type-checks cleanly and looks plausible in the UI (it renders a real-looking date), so it passes review by eye and ships as a bug. Always confirm the field name against the DTO and the US.
- **If the spec defines no business date field, do not invent one**: When the US has no Date field (or the Date field was removed), omit the column/field entirely. Do not fall back to `createdAt` to fill the gap.

#### Rule 27 Examples

❌ **Bad** — a "Date" column fed by the audit timestamp.

```tsx
{ key: 'date', header: t('gts.date'), render: (row) => fmtDate(row.createdAt) }
```

✅ **Good** — bind to the domain date field defined by the spec.

```tsx
{ key: 'date', header: t('gts.date'), render: (row) => fmtDate(row.date) }
```

✅ **Also correct** — the US has no Date field, so the column is removed entirely (no `createdAt` fallback).

---

### Rule 34 - Shareable Screen State Lives in the URL

- **The URL is the source of truth**: Filters, search, pagination, the calendar view and date — anything a user would expect to survive a reload, a shared link or the Back button — live in the search params, never in `useState`.
- **One schema per screen**: Declare `schema/<screen>-search.schema.ts` with `z.object(...)`. Every field ends in `.catch(<default>)` (or `searchParamArray(item)` from `@/shared/utils/search-params.util` for repeated keys), so a hand-edited or stale link falls back to defaults instead of throwing. Infer the state type with `z.infer` in `types/`.
- **Read and write through `useSearchParamsState(schema)`**: It returns `{ state, setState }`. `setState(patch, options)` merges the patch, drops values equal to the schema defaults so URLs stay short, and does nothing when the patch changes nothing. Pagination and view changes push a history entry; filter typing passes `{ replace: true }`.
- **Filters write the URL, the page reads it**: The `-filters` component seeds its `useForm` from the URL state and writes the debounced values back with `setState`, resetting `page` when a filter changes. The page derives its query params from the same URL state. No `onFiltersChange` callback, no filter `useState` in the page.
- **Back and forward restore the form**: Mount the `-filters` component with `key={useHistoryRestoreKey()}` so a history pop remounts it with the restored URL values.

#### Rule 34 Example

```tsx
export const UserManagementFilters = () => {
  const { state, setState } = useSearchParamsState(userManagementSearchSchema);
  const form = useForm<UserManagementFilterValues>({
    defaultValues: userFilterConverter.toFormValues(state),
  });

  useEffect(() => {
    const nextFilters = { ...filters, search: debouncedSearch };
    if (!hasSearchStateChanges(state, nextFilters)) return;
    setState({ ...nextFilters, page: FIRST_PAGE }, { replace: true });
  }, [filters, debouncedSearch, state, setState]);
};
```
