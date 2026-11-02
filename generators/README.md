# Code generators

`npm run gen` runs [Plop](https://plopjs.com) with `plopfile.js`. Generators write code that already follows the rules in `global-skill-agent/`, so `npm run verify` passes on the output.

## `list-screen`

A paginated list screen wired end to end from one BE endpoint.

1. In `../BE-nestjs-boilerplate`, add the endpoint with Zod request and response schemas, then run `npm run openapi:generate` (Rule 37).
2. Run `npm run api:generate`, then `npm run gen` and pick `list-screen`.
3. Answer the prompts. The endpoint list comes from `../BE-nestjs-boilerplate/openapi.json`: only `GET` operations whose 200 response is `{ items, total, page, pageSize }` with an `id` on each item are offered. The column choices are the item's fields.

It creates:

| Layer  | Files                                                                                                                       |
| :----- | :-------------------------------------------------------------------------------------------------------------------------- |
| core   | `types/<entity>.dto.ts` (inferred from the contract), `apis/<entity>.api.ts` (with `responseSchema`)                        |
| module | page, `-table` / `-table-body` / `-table-row` / `-status-row`, constants, converter, queries, service, search schema, types |
| router | `routes/<module>-routes.ts`, `loaders/<module>.loader.ts`                                                                   |
| locale | `<module>/en.json`, `<module>/vi.json`                                                                                      |
| test   | converter spec, table spec under `src/test/modules/<module>/`                                                               |

It patches `API_ENDPOINTS`, `ROUTE_PATHS`, `ROUTE_ACCESS`, `I18N_NAMESPACES`, `i18next.d.ts`, `routes.tsx`, the navigation keys and items, and the sidebar labels in `locale/common/*.json`. Each patch looks for a fixed anchor and stops with the file name when the anchor is gone, so a refactor of those files shows up as a clear error instead of misplaced code. The last step runs Prettier and `eslint --fix` on every file it touched and prints what is left to do by hand.

## Layout

```text
generators/
  actions.js            custom Plop actions: patch, json, format, next-steps
  contract.js           reads ../BE-nestjs-boilerplate/openapi.json and checks src/core/contract/zod.gen.ts
  names.js              kebab / camel / Pascal / CONSTANT names
  list-screen/
    list-screen.generator.js   prompts and the action list
    build-data.js              answers + operation → template data (cells, row types, converter expressions)
    patches.js                 registry edits, one anchor each
    templates/*.hbs            one template per generated file
```

## Adding a generator

Copy `list-screen/`, keep the prompts in the generator file and every computed string in a `build-data.js`, so templates only interpolate. Build the templates from a module that already passes `npm run verify`, run the generator once into a scratch module, run `npm run verify`, and delete the scratch module before committing.
