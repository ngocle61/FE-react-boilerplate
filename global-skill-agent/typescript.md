# TypeScript Rules

TypeScript type practices and conventions.
Part of the project's mandatory implementation rules (see [README.md](./README.md)). Do not change these rules unless the user explicitly asks to update them.

### Rule 9 - Use Global Utility Types for Null/Undefined

Do not use raw union types like `| null` or `| undefined` in the source code.
Use global utility types from `globals.type.d.ts` (e.g., `Nullable<T>`, `Maybe<T>`, `Nillable<T>`).

#### Rule 9 Examples

❌ **Incorrect**

```typescript
const toAccessToken = (response: SignInResponseDto): string | null => {
  return response.token;
};
```

✅ **Correct**

```typescript
const toAccessToken = (response: SignInResponseDto): Nullable<string> => {
  return response.token;
};
```

---

### Rule 11 - Centralized Type Declarations

All type and interface declarations must be placed in a `types` folder or files named `types.ts`. Non-type files (e.g., `.service.ts`, `.tsx`, `.mapper.ts`) should not contain any inline type or interface definitions.

#### Rule 11 Examples

❌ **Incorrect**
Defining types directly inside the service file `src/modules/sign-up/services/sign-up.service.ts`:

```typescript
export interface SignUpResult {
  user: Nullable<AuthUser>;
  accessToken: Nullable<string>;
}

export class SignUpService {
  async signUp(data: SignUpDto): Promise<SignUpResult> {
    return api.post('/signup', data);
  }
}
```

✅ **Correct**
Define the types separately inside `src/modules/sign-up/types/types.ts`:

```typescript
export interface SignUpResult {
  user: Nullable<AuthUser>;
  accessToken: Nullable<string>;
}
```

And import it in `src/modules/sign-up/services/sign-up.service.ts`:

```typescript
import type { SignUpResult } from '../types/types';

export class SignUpService {
  async signUp(data: SignUpDto): Promise<SignUpResult> {
    return api.post('/signup', data);
  }
}
```

---

### Rule 35 - Translation Keys Are Typed

- **Resources are declared once**: `src/core/types/i18next.d.ts` maps every namespace to its `en.json` through `CustomTypeOptions`. Adding a locale namespace means adding it there too; `t()` then rejects any key that does not exist.
- **Never type a key as `string`**: A prop, constant or route handle that carries a translation key uses `TranslationKey<Namespace>` from `@/core/types/language.type` (default namespace `common`). Read a key from another namespace with `t(key, { ns: I18N_NAMESPACES.X })`, not by building a `` `ns:${key}` `` string.
- **Server keys are narrowed, not cast**: Keys that arrive at runtime (error message keys) go through a type guard backed by `i18n.exists` before reaching `t()`, falling back to a known key.
