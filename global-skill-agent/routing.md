# Routing & Access Rules

How routes are declared, guarded, and connected to navigation.
Part of the project's mandatory implementation rules (see [README.md](./README.md)). Do not change these rules unless the user explicitly asks to update them.

### Summary

- One data router (`createBrowserRouter`) in `src/router/router.ts`, built from the tree in `src/router/routes.tsx`, which is composed from one route file per module.
- Access is permission-based. Roles map to permissions in one place; routes, sidebar items and in-page actions all check permissions, never role names.
- Guards live in `src/core/guards`, layouts in `src/shared/layout`, pages are lazy-loaded from `src/modules`.

---

### Rule 29 - Route Access Levels

Every route belongs to exactly one access level. The level is decided by where the route is mounted in the tree, not by checks inside the page.

| Level         | Mounted under                                                      | Behaviour                                                                                             |
| :------------ | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| Public        | Root route children, outside any guard                             | Reachable by everyone (terms, status pages, share links).                                             |
| Guest only    | `GuestRoute` → `AuthLayout`                                        | Signed-in users are redirected to the safe `?redirect=` target, or `/`.                               |
| Authenticated | `ProtectedRoute` → `MainLayout`                                    | Anonymous users go to `/sign-in?redirect=<path>`. After an explicit sign-out the redirect is dropped. |
| Permission    | `createGuardedRoute(ROUTE_ACCESS.X, children)` inside `MainLayout` | Missing permission renders `ForbiddenPage` in place: the URL is kept and the sidebar stays.           |

```text
root (errorElement: RouteErrorPage, hydrateFallbackElement: PageLoader)
├── GuestRoute
│   └── AuthLayout
│       └── /sign-in
└── ProtectedRoute
    └── MainLayout
        ├── index → HomeRedirect (first module the user can open)
        ├── createGuardedRoute(ROUTE_ACCESS.DASHBOARD) → /dashboard
        ├── createGuardedRoute(ROUTE_ACCESS.CHAT)      → /chat
        ├── createGuardedRoute(ROUTE_ACCESS.CALENDAR)  → /calendar
        ├── createGuardedRoute(ROUTE_ACCESS.USERS)     → /admin/users
        └── *  → NotFoundPage
```

- **Never guard inside a page**: A page component must not redirect or render 403 based on the user. Mount it under the right guard instead.
- **Redirect targets are validated**: Read `?redirect=` only through `toSafeRedirectPath`; it rejects absolute, protocol-relative and backslash URLs.
- **Sign-in does not navigate**: A successful sign-in only starts the session (`sessionService.start`). `GuestRoute` performs the redirect.
- **Session end goes through `sessionService.end(reason)`**: `SIGN_OUT` for a user action, `EXPIRED` when token refresh fails. It clears the store and the query cache; `ProtectedRoute` reacts to the store change.

---

### Rule 30 - Single Source of Access Truth

- **Roles and permissions are constants**: `ROLES` (`core/constants/roles.constant.ts`), `PERMISSIONS` (`permissions.constant.ts`, `resource:action` strings) and `ROLE_PERMISSIONS` (`role-permissions.constant.ts`).
- **Route requirements are declared once**: `ROUTE_ACCESS` (`route-access.constant.ts`) is passed to `createGuardedRoute` and to the matching `NAVIGATION_GROUPS` item. The sidebar and the router can never disagree.
- **Backend permissions win**: If the user DTO carries `permissions`, `resolvePermissions` uses them instead of the role map. Keep `ROLE_PERMISSIONS` as the fallback policy.
- **Check permissions, not roles**: Use `useAccess().can({ permissions, mode })` in logic and `<Can permissions={[...]}>` around UI. Comparing `user.role === ROLES.ADMIN` in components is forbidden.
- **`mode` is explicit when mixing**: A requirement defaults to `all`. Pass `mode: 'any'` only when one of several permissions is enough.

#### Rule 30 Examples

❌ **Bad**

```tsx
if (user?.role === ROLES.ADMIN) {
  return <Button variant="destructive">Delete</Button>;
}
```

✅ **Good**

```tsx
<Can permissions={[PERMISSIONS.USER_MANAGE]}>
  <Button variant="destructive">Delete</Button>
</Can>
```

---

### Rule 31 - Route File Conventions

- **One route file per module**: `src/router/routes/<module>-routes.ts` exports `<module>Routes: RouteObject[]`. `routes.tsx` only spreads them into the tree.
- **Paths are constants**: Every path comes from `ROUTE_PATHS`. Build links with the same constant.
- **Pages are lazy and named**: `lazy: lazyPage(() => import('@/modules/<module>/<module>'), '<Module>Page')` for the module's own screen, `import('@/modules/<module>/<screen>/<screen>')` for any other screen. Pages are named exports; no default exports.
- **Breadcrumbs through `handle`**: Set `handle: { breadcrumb: '<i18n key>' } satisfies RouteHandle` on routes that should appear in the header breadcrumb. Nested routes add their own crumb.
- **Errors stay inside the layout**: `createGuardedRoute` attaches `RouteErrorPage` as `errorElement`, so a crashing module keeps the shell. Do not wrap pages in extra error boundaries.
- **Folder tree mirrors the route tree**: `/calendar` is `src/modules/calendar/calendar.tsx` and `/calendar/events/:id` lives at `src/modules/calendar/event-details/` (Rule 28).

### Adding a Module Checklist

1. Add the permission(s) to `PERMISSIONS` and grant them in `ROLE_PERMISSIONS`.
2. Add the path to `ROUTE_PATHS` and the requirement to `ROUTE_ACCESS`.
3. Create the page under `src/modules/<module>/` and its locale files under `src/locale/<module>/{en,vi}.json` (namespaces are discovered automatically), then register the namespace in `src/core/types/i18next.d.ts` (Rule 35).
4. Create `src/router/routes/<module>-routes.ts` with `createGuardedRoute` and spread it in `routes.tsx`. If the page loads data on its first render, add `src/router/loaders/<module>.loader.ts` (Rule 36).
5. Add the sidebar item to `NAVIGATION_GROUPS` with the same `ROUTE_ACCESS` entry.
6. Extend `navigation.util.spec.ts` with the roles that should (not) see the module.

---

### Rule 36 - Route Loaders and the Session

- **The current user lives in React Query**: `authQueries.currentUser()` caches the `/users/me` DTO and `useCurrentUserQuery` converts it with `select`. Zustand only holds the tokens and the session end reason. Read the user with `useAuthUser()` from `@/core/hooks/use-auth-user`; never copy server data into a store.
- **Sign-in seeds the cache**: `sessionService.start(session)` writes the signed-in user into the query cache and the tokens into the store, so the shell renders without a second `/users/me` request.
- **`MainLayout` waits for the user**: It renders `PageLoader` until the current user query resolves, so guards, the sidebar and pages always see a user.
- **Pages prefetch in a loader**: A routed page whose first render needs server data declares `loader: <module>Loader` from `src/router/loaders/`, built with `createPrefetchLoader(ROUTE_ACCESS.X, prefetch)`. The helper waits for the current user, skips the prefetch when access is denied, and the prefetch parses the URL with the screen's search schema (Rule 34) and calls `void queryClient.prefetchQuery(...)` with the same query options the page uses. Loaders never block navigation on page data and never throw; the page's `useQuery` still owns loading and error states.
- **Guards stay components**: `ProtectedRoute`, `GuestRoute` and `PermissionRoute` keep reacting to the store at render time, because a session can end while the user stays on a page, and route middleware only runs on navigation.
