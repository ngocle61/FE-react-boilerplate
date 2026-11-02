# shadcn/ui Rules

Complete shadcn/ui component management rules for searching, adding, styling, composing, and upgrading UI elements.
Part of the project's mandatory implementation rules (see [README.md](./README.md)). Do not change these rules unless the user explicitly asks to update them.

### Summary

Complete shadcn/ui component management for adding, searching, fixing, styling, and composing UI.

- Manages the full component lifecycle: search registries, add components, view docs, preview changes with `--dry-run` and `--diff`, and merge updates while preserving local modifications.
- Enforces rules across forms (`FieldGroup`, `Field`, `InputGroup`, validation states), composition (Groups, overlays, Card structure), styling (semantic colors, gap spacing, size shorthand), and icons (`data-icon` attributes).
- Supports multiple registries (`@shadcn`, `@magicui`, `@tailark`, community presets) and provides selection guidance.
- Leverages project context (aliases, framework, base library, icon library, Tailwind version, resolved paths) to ensure correct imports.

---

### Rule 13 - UI Styling & Spacing Restrictions (Tailwind CSS)

- **No arbitrary colors or typography overrides**: Do not overwrite predefined component styles or hardcode colors/typography. Always use semantic tokens.
- **No `space-x-*` or `space-y-*`**: Always use flexbox/grid layout structures combined with `gap-*`. For vertical stacks, use `flex flex-col gap-*`.
- **Use `size-*`**: When width and height of an element are equal, use `size-*` instead of `w-* h-*`.
- **Use `truncate`**: Prefer `truncate` utility shorthand over `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` overrides**: Manage dark theme colors via native CSS variable swaps under `@theme` (configured in [index.css](../src/index.css)).
- **Use `cn()`**: Apply conditional classes through the `cn` helper instead of writing raw template string expressions.
- **No manual z-index on overlays**: Elements like Dialog, Sheet, and Popover manage stack indexing natively.

#### Rule 13 Examples

❌ **Bad**

```tsx
<div className="space-y-4">
  <div className="z-50 h-10 w-10 overflow-hidden bg-blue-500 text-ellipsis whitespace-nowrap dark:bg-blue-900">
    Text
  </div>
</div>
```

✅ **Good**

```tsx
<div className="flex flex-col gap-4">
  <div className="size-10 truncate bg-primary">Text</div>
</div>
```

---

### Rule 14 - Form Layout & Validation Standards

- **Use FieldGroup & Field**: Do not structure forms with generic layout divs or raw grid layouts. Arrange inputs inside `FieldGroup` and individual label-control pairs inside a `Field`.
- **Use InputGroup**: Arrange inputs with accompanying text or addons using `InputGroup` along with `InputGroupInput`, `InputGroupTextarea`, or `InputGroupAddon`. Do not nest raw `Input`/`Textarea` inside generic addon wrappers.
- **Use ToggleGroup**: For option lists consisting of 2 to 7 elements, use `ToggleGroup` instead of rendering buttons manually with active state tracking.
- **Checkboxes & Radios**: Group checkboxes/radios using `FieldSet` and `FieldLegend` instead of normal headings and wrappers.
- **Accessibility & Status States**: For validation states, apply `data-invalid` on the parent `Field` and `aria-invalid` on the interactive control. For disabled states, apply `data-disabled` on the parent `Field` and `disabled` on the interactive control.

#### Rule 14 Examples

❌ **Bad**

```tsx
<div className="space-y-2">
  <label htmlFor="email">Email</label>
  <input id="email" className="border-red-500" />
  <span>Invalid email</span>
</div>
```

✅ **Good**

```tsx
<FieldGroup>
  <Field data-invalid>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" aria-invalid />
    <FieldDescription>Invalid email</FieldDescription>
  </Field>
</FieldGroup>
```

---

### Rule 15 - Component Structure & Accessibility

- **Items must be inside their Group**: Interactive options must reside within their respective container groups (e.g., `SelectItem` inside `SelectGroup`, `DropdownMenuItem` inside `DropdownMenuGroup`, and `CommandItem` inside `CommandGroup`).
- **Title requirements**: Overlay structures (Dialog, Sheet, Drawer) must include a descriptive title element (`DialogTitle`, `SheetTitle`, `DrawerTitle`) for screen reader access. Apply `className="sr-only"` to hide visually if needed.
- **Custom Triggers**: Use `asChild` (Radix) or `render` (Base primitives) to map custom trigger actions without introducing extra DOM wrappers.
- **Card Composition**: Break card designs into semantic elements: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`. Avoid wrapping entire layouts inside `CardContent` alone.
- **No isLoading on Button**: Do not add custom loading state boolean props directly to Buttons. Instead, compose using a Spinner icon along with `data-icon` and the standard `disabled` attribute.
- **Tabs Triggers**: Map all `TabsTrigger` buttons inside a `TabsList` container. Never render triggers directly inside the root `Tabs`.
- **Avatar Fallbacks**: Always couple `Avatar` elements with an `AvatarFallback` container to handle cases where assets fail to load.

#### Rule 15 Examples

❌ **Bad**

```tsx
<Card>
  <CardContent>
    <h3>Title</h3>
    <p>Description</p>
    <Button>Save</Button>
  </CardContent>
</Card>
```

✅ **Good**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <Button disabled>
      <Spinner data-icon="inline-start" />
      Save
    </Button>
  </CardContent>
</Card>
```

---

### Rule 32 - List Tables Fit the Viewport

- **The page never scrolls for a table**: List pages live inside the `h-svh` app shell. The content wrapper under `PageHeader` takes `min-h-0 flex-1`, so the toolbar, the table and its footer share the height left in `main`.
- **Use `PaginatedTable`**: Paginated lists render through `src/shared/components/paginated-table/paginated-table.tsx` — `TableHeader` and the table body as children, plus `summary`, `page`, `totalPages` and `onPageChange`. Never hand-roll `Table` + page navigation on a list page; the page navigation (`PaginatedTablePages`) lives inside `paginated-table/` and is only rendered by `PaginatedTable`.
- **The table scrolls, not the page**: The table container grows with `flex-1` and scrolls with `overflow-auto scrollbar-thin` (themed scrollbar in light and dark); `TableHeader` stays pinned at the top of the container (`sticky`, opaque background).
- **Wide tables scroll horizontally inside the container**: Cells never wrap (`whitespace-nowrap`), so columns keep their natural width; when they don't fit, the table container scrolls sideways and the page never scrolls horizontally.
- **The actions column is pinned to the right**: Render the actions column with `TableActionsHead` and `TableActionsCell`, never `TableHead`/`TableCell` with `text-right`. They stick to the right edge of the container while the other columns scroll under them, with an opaque background that follows the row state (hover, open menu, selected) and a divider on their left.
- **The footer stays at the bottom**: The summary and pagination sit in a `shrink-0` footer under the growing container, so they stay at the bottom edge with one row, the empty state or the loading row.
- **Small screens keep a usable table**: The container keeps `min-h-48`; only when the toolbar leaves less room than that does `main` scroll as a fallback.

#### Rule 32 Examples

❌ **Bad**

```tsx
<Flex direction="col" gap={4}>
  <UserManagementToolbar onNewClick={createDialog.open} />
  <Table>
    <TableHeader>{headerRow}</TableHeader>
    <TableBody>{rows}</TableBody>
  </Table>
  <PaginatedTablePages page={page} totalPages={totalPages} onPageChange={onPageChange} />
</Flex>
```

```tsx
<TableRow>
  <TableCell>{row.email}</TableCell>
  <TableCell className="text-right">
    <RowActionsMenu row={row} />
  </TableCell>
</TableRow>
```

✅ **Good**

```tsx
<Flex direction="col" gap={4} className="min-h-0 flex-1">
  <UserManagementToolbar onNewClick={createDialog.open} />
  <PaginatedTable
    summary={t('table.totalLabel', { count: total })}
    page={page}
    totalPages={totalPages}
    onPageChange={onPageChange}
  >
    <TableHeader>{headerRow}</TableHeader>
    <TableBody>{rows}</TableBody>
  </PaginatedTable>
</Flex>
```

```tsx
<TableRow>
  <TableCell>{row.email}</TableCell>
  <TableActionsCell>
    <RowActionsMenu row={row} />
  </TableActionsCell>
</TableRow>
```

---

### Rule 16 - Icon Handling in Components

- **Use data-icon for Button Icons**: Icon alignment within buttons is controlled via `data-icon="inline-start"` or `data-icon="inline-end"` properties.
- **No explicit sizing**: Do not apply width/height classes (e.g., `w-4 h-4` or `size-4`) to icons placed inside buttons or input containers; sizing is managed by the design system styling files.
- **Object Imports**: Pass icons as component objects, not as dynamic string keys.

#### Rule 16 Examples

❌ **Bad**

```tsx
<Button>
  <Search className="mr-2 h-4 w-4" />
  Search
</Button>
```

✅ **Good**

```tsx
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>
```

---

### Rule 17 - Component Lifecycle & CLI Workflows

- **Registry reference first**: Before building or changing a primitive, read the latest shadcn source for it. Run `npx shadcn@latest view <component>` or open `https://ui.shadcn.com/r/styles/radix-nova/<component>.json`.
- **Never write CLI output into `src/_widgets/ui`**: The CLI generates flat, single-file components. Port the source by hand into the folder structure of Rule 1 instead of running `npx shadcn@latest add` against the project.
- **Port checklist**: one component per file, props in `types.ts`, labels and sizes in `constants.ts`, variants in `variant.ts`, colors from design tokens, no `dark:` classes, no comments, no `forwardRef`, context read with `use()`, a11y attributes kept or improved.
- **Prefer what is installed**: Build on `radix-ui`, `lucide-react`, `class-variance-authority` and `cn`. Add a new package only when the primitive cannot be built on those (for example `react-day-picker` for Calendar, `react-phone-number-input` for PhoneInput).
- **Upgrading a primitive**: Diff the new registry source against the ported files and merge the changes manually.

---

### Component Selection Reference

| Category              | UI Element / Component                                                                              | Selection / Purpose                           |
| :-------------------- | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| **Actions**           | `Button`                                                                                            | Standard trigger actions and form submissions |
| **Form Inputs**       | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea`, `InputOTP`, `Slider` | Capturing user responses and selections       |
| **Option Sets (2–5)** | `ToggleGroup`                                                                                       | Selection lists containing few choices        |
| **Data Display**      | `Table`, `Card`, `Badge`, `Avatar`                                                                  | Visualizing structured records and summaries  |
| **Navigation**        | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`, `Pagination`                                     | Section mapping and app transitions           |
| **Overlays**          | `Dialog`, `Sheet`, `Drawer`, `AlertDialog`                                                          | High-priority panels, panels, and checks      |
| **Feedback**          | `sonner`, `Alert`, `Progress`, `Skeleton`, `Spinner`                                                | Status warnings, load states, and actions     |
| **Menus**             | `DropdownMenu`, `ContextMenu`, `Menubar`                                                            | Layout action menus                           |
| **Information**       | `Tooltip`, `HoverCard`, `Popover`                                                                   | Detail popups and quick info                  |
| **Layouts**           | `Card`, `Separator`, `Resizable`, `ScrollArea`, `Accordion`                                         | Structural grids and panel boundaries         |
