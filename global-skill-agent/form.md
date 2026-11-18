# Form Rules

React Hook Form and validation conventions.
Part of the project's mandatory implementation rules (see [README.md](./README.md)). Do not change these rules unless the user explicitly asks to update them.

### Summary

- Every form is `const form = useForm<…>(…)` rendered through `<Form form={form} onSubmit={submit}>` from `@ui/form` (RHF `FormProvider` + `<form noValidate>`).
- Forms are composed from controlled field components exported by `@ui/form` (`InputField`, `PasswordField`, …). Each field takes only `name` (never `control`), reads the form from the nearest `FormProvider`, and renders the shadcn `Field` anatomy itself. Layout primitives (`FieldGroup`, `FieldSet`) and buttons still come from `@ui`.
- Validation lives in Zod 4 schema factories under `schema/`, wired with `zodResolver`.
- Submitting goes through a mutation hook in `hooks/`; the form component never calls a service or API directly.

---

### Rule 23 - Controlled Field Component Pattern

- **One way to wire a form**: Keep the whole `useForm` return as `const form = useForm<…>(…)` (no destructuring) and render `<Form form={form} onSubmit={submit}>`. `Form` provides the form through RHF's `FormProvider`, adds `noValidate`, and wraps `onSubmit` in `handleSubmit`; without `onSubmit` (filter rows) it only prevents the native submit. Pass `id` when the submit button sits outside it (dialog / sheet footer with `form={formId}`).
- **Fields read the form from context**: Field components take `name` and never `control`, which is optional in RHF's `Controller` under a `FormProvider`. The same field JSX therefore binds to whichever form wraps it: the FilterBar draft dialog, a wizard step or a child component (`InterventionClientFields`) all work without passing `control` down. The component that calls `useForm` still passes `form.control` to its own hooks (`useWatch`), because the provider is rendered below it. Child components read values with `useWatch({ name })` or `useFormContext<…>()`.
- **Use pre-built controlled fields**: Build forms from the field components exported by `@ui/form`. They render `Field` + `FieldLabel` + control + `FieldError`, and set `data-invalid` / `aria-invalid` / `aria-describedby` for you (Rule 14).
- **No raw inputs or manual `Controller` in screens**: Screens never render `<input>` or `<Controller>` directly. When a field type is missing, add it once under `src/_widgets/ui/form/<name>-field/` (component + `types.ts`) and export it from `src/_widgets/ui/form/public-api.ts`. Its props extend `BaseFieldProps` (`name`, `label`, `labelDisplay`, `description`, `className`, `disabled`, `id`); call `useFormField` with them, spread `shellProps` on `FormFieldShell` or `FormChoiceFieldShell`, spread `controlProps` (id + aria) on the control, and pass `fieldRef` as its `ref` so a failed submit can focus it.
- **Errors come from `fieldState`**: Field components read the message from `fieldState.error`. Do not thread `error={errors.x?.message}` through props.
- **Layout with `FieldGroup`**: Stack fields and the submit button inside `FieldGroup`; group checkboxes and radios with `FieldSet` + `FieldLegend`.

#### Rule 23 Examples

❌ **Bad**

```tsx
<Controller
  name="email"
  control={control}
  render={({ field }) => <input {...field} className="border p-2" />}
/>
```

✅ **Good**

```tsx
import { Button, FieldGroup, Spinner } from '@ui';
import { Form, InputField, PasswordField } from '@ui/form';
```

```tsx
<Form form={form} onSubmit={submit}>
  <FieldGroup>
    <InputField name="email" type="email" label={t('signIn.emailLabel')} />
    <PasswordField name="password" label={t('signIn.passwordLabel')} />
    <Button type="submit" disabled={isPending}>
      {isPending && <Spinner data-icon="inline-start" />}
      {t('signIn.submit')}
    </Button>
  </FieldGroup>
</Form>
```

❌ **Bad** — mixes three wiring styles: destructured `control`, `control` drilled into a child, a raw `<form>`.

```tsx
const { control, handleSubmit } = useForm<InterventionFormValues>(…);

<form noValidate onSubmit={handleSubmit(submit)}>
  <InterventionClientFields control={control} />
  <InputField control={control} name="type" label={t('form.typeLabel')} />
</form>
```

---

### Rule 24 - Centralized Zod Validation & Submission

- **Schema factories in `schema/`**: Declare `create<Form>Schema = (t: TFunction<'<namespace>'>) => z.object(...)` in `schema/<form>.schema.ts` so messages are localized.
- **Zod 4 syntax**: Use top-level format schemas (`z.email()`, `z.url()`, `z.uuid()`) and the `{ error }` parameter. Do not use the deprecated `z.string().email()` chain or `message`.
- **Every limit has a localized message**: Each `.min()` / `.max()` passes `{ error: t('form.validation.<key>', { min | max }) }` with the limit from a `<FORM>_LIMITS` constant; a bare `.max(200)` shows Zod's English default to every user. Enums come from the constant object (`z.enum(ROLES)`), never a hand-written list. Derive a related form from an existing schema with `.pick()` / `.extend()` instead of repeating fields.
- **Types are inferred**: `types/<form>.type.ts` exports `type <Form>Values = z.infer<ReturnType<typeof create<Form>Schema>>`.
- **Defaults are constants**: `constants/<form>.constant.ts` exports `<FORM>_DEFAULT_VALUES`; always pass `defaultValues` to `useForm`.
- **Resolver and browser validation**: Use `zodResolver(schema)` with `const schema = create<Form>Schema(t)` built inline; React Compiler memoizes it, so never wrap it in `useMemo`. `Form` already sets `noValidate`; never render a raw `<form>`.
- **Validate on submit first**: Spread `...SUBMIT_FIRST_VALIDATION` from `@/shared/constants/form.constant` into every submit form's `useForm`. Nothing is validated before the first submit. The submit shows every error, and after that each field revalidates as the user types. Never use `onTouched`, `onBlur` or `onChange` as `mode`, because they show errors on fields the user has not finished yet.
- **Submit handler shape**: Pass the values callback to `Form`: `<Form form={form} onSubmit={submit}>`. `Form` calls `handleSubmit` itself, so never write `handleSubmit(...)` in a screen. Declare the callback as a typed `const submit = (values: <Form>Values) => mutate(values)` above the JSX rather than inlining an arrow, because the editor's language service can lose the contextual type of an inline arrow in a generic component's prop and report `values` as implicit `any`. Do not pass `mutate` itself, because `handleSubmit` calls its callback with `(data, event)` and the event would land in `mutate`'s options.
- **Submit through a mutation hook**: `hooks/use-<action>.ts` wraps `useMutation` around a service in `services/`. The form calls `mutate(values)` and disables the submit button with `isPending`. Success side effects (toast, session start, cache invalidation through `<entity>Queries.all()`) and mapping server field errors onto the form belong to the hook. Error toasts are global: the `MutationCache` in `core/libs/query-client.ts` shows `getErrorMessage(error)` for every failed mutation, so hooks never call `toast.error` themselves. A hook that shows its own error UI opts out with `meta: { skipErrorToast: true }`.

#### Rule 24 Example

```tsx
export const createSignInSchema = (t: TFunction<'authentication'>) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, { error: t('signIn.validation.emailRequired') })
      .pipe(z.email({ error: t('signIn.validation.emailInvalid') })),
    password: z.string().min(1, { error: t('signIn.validation.passwordRequired') }),
  });
```

```tsx
export const SignInForm = () => {
  const { t } = useTranslation('authentication');
  const schema = createSignInSchema(t);
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: SIGN_IN_DEFAULT_VALUES,
    ...SUBMIT_FIRST_VALIDATION,
  });
  const { mutate: signIn, isPending } = useSignIn();

  const submit = (values: SignInFormValues) =>
    signIn(values, { onError: (error) => applyServerFieldErrors(error, form.setError) });

  return (
    <Form form={form} onSubmit={submit}>
      <FieldGroup>{/* fields + submit */}</FieldGroup>
    </Form>
  );
};
```

---

## Advanced Form Patterns

| Need                                   | Use                                                                                                                                        |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| Repeating rows (contacts, attachments) | `useFieldArray`, rendering one field component per row with `name={`items.${i}.x`}`                                                        |
| Show a field based on another value    | `useWatch({ control: form.control, name })` in the `useForm` owner, `useWatch({ name })` below `Form` — never a global `watch()` in render |
| Multi-step wizard                      | One `useForm` + `Form`; each step reads `useFormContext` and calls `trigger(stepFields)` before moving on                                  |
| Draft copy of a form (filter dialog)   | A second `useForm` rendered through its own `Form`; the same field JSX binds to it through context                                         |
| Server-side field errors               | At the submit site: `mutate(values, { onError: (e) => applyServerFieldErrors(e, form.setError) })`; mutation hooks never take `setError`   |
| Success toast                          | At the call site in the `onSuccess` passed to `mutate`; mutation hooks only invalidate their queries                                       |
| Reset after success                    | Call `reset()` in the mutation `onSuccess` callback passed from the form                                                                   |
