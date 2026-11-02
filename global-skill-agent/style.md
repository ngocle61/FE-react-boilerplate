# Style Rules

Code style and conventions.
Part of the project's mandatory implementation rules (see [README.md](./README.md)). Do not change these rules unless the user explicitly asks to update them.

### Rule 4 - Domain/System Texts Must Be Constants or Enums

Only domain/system texts must be declared as constants or enums (for example: table columns, API status values, business status values, system messages).
Simple UI labels can be hard-coded in components.

### Rule 5 - Import Order

Import order must follow this sequence:

1. External libraries
2. Project aliases/imports from project root
3. Relative imports (`./` or `../`)

Each import group (1, 2, 3) must be separated by one blank line. Inside a group, imports are sorted alphabetically by path (case-insensitive), so `./` sorts before `../`. Enforced and autofixed by `import-x/order` with `alphabetize`; run `npm run lint:fix`.

### Rule 33 - Statement Groups in Components and Hooks

Inside a component or hook body, statements are grouped like imports. Write the groups in this order when the data flow allows it:

1. State — `useState`, `useReducer`, `useRef`
2. Hooks — every other hook call (`useTranslation`, `useForm`, queries, custom hooks, `use()`)
3. Derived values — plain `const` values and `useMemo`
4. Handlers — functions and `useCallback`
5. Effects — `useEffect`, `useLayoutEffect`, `useImperativeHandle`
6. `return`

- One blank line separates two consecutive statements from different groups.
- State and hook groups have no blank line inside them.
- Derived values, handlers and effects may be separated by blank lines.
- A hook that needs a derived value (for example `useForm` reading a schema built from `t`) comes after that value. Data flow wins over the order, and the blank lines still apply.

Enforced and autofixed by `react-body/statement-groups` (see [react-body.plugin.js](../eslint/react-body.plugin.js)); run `npm run lint:fix`.

```tsx
export const SignInForm = () => {
  const [step, setStep] = useState(SIGN_IN_STEPS.CREDENTIALS);
  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation(I18N_NAMESPACES.AUTHENTICATION);

  const schema = createSignInSchema(t);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
  });
  const { mutate: signIn, isPending } = useSignIn();

  const handleBack = () => setStep(SIGN_IN_STEPS.CREDENTIALS);
  const submit = (values: SignInFormValues) =>
    signIn(values, { onError: (error) => applyServerFieldErrors(error, form.setError) });

  useEffect(() => inputRef.current?.focus(), [step]);

  return (
    <Form form={form} onSubmit={submit}>
      …
    </Form>
  );
};
```

### Rule 6 - Use Global Design Tokens for Styles

Never hard-code HEX color values in components.
Use global design tokens and classes defined via the Tailwind v4 `@theme` configuration (e.g., in [index.css](../src/index.css)), such as `bg-primary`, `text-brand-green`, `rounded-card`.

### Rule 7 - No Comments in Code

Do not add comments to the source code (neither single-line `//` nor multi-line `/* */`).
The code should be self-documenting through clear naming and modular structure.

---

## 🎨 Tailwind CSS v4 Design System Guidelines

This guide specifies how to build and maintain production-ready design systems using **Tailwind CSS v4** within this codebase. AI Agents must strictly adhere to these practices.

### 1. Tailwind v3 to v4 Key Differences

| Feature              | Tailwind v3                                                  | Tailwind v4                                                                |
| :------------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------- |
| **Config File**      | `tailwind.config.ts`                                         | CSS-first `@theme` in CSS files (e.g., [index.css](../src/index.css))      |
| **Imports**          | `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss";`                                                   |
| **Dark Mode Toggle** | `darkMode: "class"`                                          | Native variant `@custom-variant dark (&:where(.dark, .dark *));`           |
| **Theme Extending**  | `theme.extend.colors`                                        | Define custom properties directly via `--color-*: value` inside `@theme`   |
| **Animations**       | Third-party plugin (e.g., `tailwindcss-animate`)             | Native `@keyframes` in `@theme` and `@starting-style` for entry animations |

### 2. Design Token Hierarchy

Design tokens flow from abstract definitions to component-specific styling:

```
Brand/Abstract Tokens (e.g., oklch(58% 0.16 116))
   └── Semantic Tokens (e.g., --color-brand-green, --color-primary)
       └── Component Tokens (e.g., --color-sidebar-active-bg)
```

- **Do not** write arbitrary colors (e.g., `bg-[#2b3e1b]`) or absolute pixel border-radii in the layout code.
- **Do** map reusable colors, spacing, and font sizes as CSS custom properties under `@theme` inside [index.css](../src/index.css).

---

### 3. Production-Ready Tailwind v4 Recipes

#### A. CSS-First Theme Configuration

All configuration variables are defined directly inside CSS files using standard CSS variables syntax. OKLCH is the preferred color space:

```css
@import 'tailwindcss';

@theme {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(14.5% 0.025 264);

  --color-primary: oklch(14.5% 0.025 264);
  --color-primary-foreground: oklch(98% 0.01 264);

  --color-destructive: oklch(53% 0.22 27);
  --color-destructive-foreground: oklch(98% 0.01 264);

  --color-border: oklch(91% 0.01 264);
  --color-ring: oklch(14.5% 0.025 264);
  --color-ring-offset: oklch(100% 0 0);

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-fade-out: fade-out 0.2s ease-in;
  --animate-slide-in: slide-in 0.3s ease-out;
  --animate-slide-out: slide-out 0.3s ease-in;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes slide-in {
    from {
      transform: translateY(-0.5rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-0.5rem);
      opacity: 0;
    }
  }
}

@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: oklch(14.5% 0.025 264);
  --color-foreground: oklch(98% 0.01 264);
  --color-primary: oklch(98% 0.01 264);
  --color-primary-foreground: oklch(14.5% 0.025 264);
  --color-border: oklch(22% 0.02 264);
  --color-ring: oklch(83% 0.02 264);
  --color-ring-offset: oklch(14.5% 0.025 264);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

#### B. Component Variants with CVA (Class Variance Authority)

Standardize component creation by passing Tailwind classes dynamically through CVA:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
```

#### C. Responsive Utilities and Shorthands

In Tailwind v4, use the native shorthands to write concise and clean CSS classes:

- **Use `size-*`**: Instead of writing `w-12 h-12`, write `size-12`.
- **Use `inset-*`**: Instead of writing `top-0 right-0 bottom-0 left-0`, write `inset-0`.
- **Use Flex/Grid gaps**: Prefer using `gap-*` in flex/grid layouts over `space-x-*`/`space-y-*` utilities for simpler responsive adjustments.
- **Container Queries**: Use native container class names or custom `@container` styles directly to size components based on parent container width, rather than global screen width.

#### D. Native Entry Animations using `@starting-style`

To animate components when they first render in the DOM (e.g., dialog popups or toast notifications), use the CSS `@starting-style` feature combined with standard Tailwind transitions:

```tsx
export function DialogContent({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 transition-opacity duration-300 starting:opacity-0">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 rounded-lg bg-background p-6 shadow-lg transition-transform duration-300 starting:scale-95">
        {children}
      </div>
    </div>
  );
}
```

#### E. Alpha Variants with `color-mix()` and Native Modifiers

Tailwind v4 supports native color modifiers using the slash (`/`) syntax, which automatically transpiles to native `color-mix()` calls:

- **Usage**: `bg-primary/10` translates to setting background to primary color mixed with 10% opacity.
- If you need a raw CSS variable with opacity: `color-mix(in srgb, var(--color-primary) 10%, transparent)`.

#### F. Custom Utilities via `@utility`

When repeating complex utility sets, use `@utility` instead of traditional CSS utility rules:

```css
@utility custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-border);
    border-radius: 9999px;
  }
}
```

#### G. Accessibility-First Rules

Always ensure components have proper ARIA attributes, focus states, and key controls:

1. **Interactive Elements**: Must have visible focus rings (`focus-visible:ring-2`).
2. **ARIA attributes**: Dynamic elements must toggle `aria-expanded`, `aria-selected`, or `aria-checked` states.
3. **Screen Readers**: Use `sr-only` for visual-only layouts that need text context.
