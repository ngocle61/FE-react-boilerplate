# Knowledge index

Map of ingested documents. Search for detail: `kb.py search "<topic>"`.

## AGENTS.md  (324 words, 4 chunks)
- Agent Guide: Read [global skill agent/README.md](./global skill agent/README.md) and every rule sheet it lists before touching code.
- Agent Guide > Stack: React 19 · TypeScript 7 ( tsc , with the TypeScript 6 API kept for typescript eslint) · Vite 8 · Tailwind CSS 4 · shadcn/ui (radix nova) · React Router 8 (data
- Agent Guide > Commands: Command   Purpose     :    :       npm run dev    Dev server on http://localhost:3000 (proxies  /api  to the NestJS API in  ../BE nestjs boilerplate )      npm
- Agent Guide > Layers: Folder   Holds   May import     :    :    :       src/ widgets    Design system primitives ( ui/ , imported via  @ui ) and form fields ( ui/form/ , imported via

## generators\README.md  (365 words, 4 chunks)
- Code generators: npm run gen  runs [Plop](https://plopjs.com) with  plopfile.js .
- Code generators > `list-screen`: A paginated list screen wired end to end from one BE endpoint.
- Code generators > Layout: 
- Code generators > Adding a generator: Copy  list screen/ , keep the prompts in the generator file and every computed string in a  build data.js , so templates only interpolate.

## global-skill-agent\form.md  (1211 words, 7 chunks)
- Form Rules: React Hook Form and validation conventions.
- Form Rules > Summary: Every form is  const form = useForm<… (…)  rendered through  <Form form={form} onSubmit={submit}  from  @ui/form  (RHF  FormProvider  +  <form noValidate ).
- Form Rules > Rule 23 - Controlled Field Component Pattern: One way to wire a form : Keep the whole  useForm  return as  const form = useForm<… (…)  (no destructuring) and render  <Form form={form} onSubmit={submit} .
- Form Rules > Rule 24 - Centralized Zod Validation & Submission: Schema factories in  schema/ : Declare  create<Form Schema = (t: TFunction<'<namespace ' ) =  z.object(...)  in  schema/<form .schema.ts  so messages are localized.
- Form Rules > Advanced Form Patterns: Need   Use     :    :      Repeating rows (contacts, attachments)    useFieldArray , rendering one field component per row with  name={ items.${i}.x }      Show

## global-skill-agent\react.md  (1891 words, 20 chunks)
- React Rules: React component practices.
- React Rules > Rule 3 - No API Calls in Shared Components: Never make API calls in  src/shared/components  because all components there are dumb/presentational components.
- React Rules > ⚛️ React Composition Patterns: Guidelines for building flexible, modular, and scaling components.

## global-skill-agent\README.md  (852 words, 4 chunks)
- ⚠️ MANDATORY RULE: READ BEFORE CODING: This repository enforces strict engineering rules that both human developers and AI coding agents must follow.
- ⚠️ MANDATORY RULE: READ BEFORE CODING > Rule 25 - Mandatory Pre-coding Rule Inspection: Always read the rules first : Upon receiving a task or entering the environment, scan all files in  global skill agent/  to ensure compliance with every numbered rule (1 to 37).
- ⚠️ MANDATORY RULE: READ BEFORE CODING > How Each Rule Is Enforced: A rule enforced by a tool fails  npm run verify  or CI on its own.

## global-skill-agent\routing.md  (977 words, 8 chunks)
- Routing & Access Rules: How routes are declared, guarded, and connected to navigation.
- Routing & Access Rules > Summary: One data router ( createBrowserRouter ) in  src/router/router.ts , built from the tree in  src/router/routes.tsx , which is composed from one route file per module.
- Routing & Access Rules > Rule 29 - Route Access Levels: Every route belongs to exactly one access level.
- Routing & Access Rules > Rule 30 - Single Source of Access Truth: Roles and permissions are constants :  ROLES  ( core/constants/roles.constant.ts ),  PERMISSIONS  ( permissions.constant.ts ,  resource:action  strings) and  RO
- Routing & Access Rules > Rule 31 - Route File Conventions: One route file per module :  src/router/routes/<module routes.ts  exports  <module Routes: RouteObject[] .
- Routing & Access Rules > Adding a Module Checklist: 1. Add the permission(s) to  PERMISSIONS  and grant them in  ROLE PERMISSIONS .
- Routing & Access Rules > Rule 36 - Route Loaders and the Session: The current user lives in React Query :  authQueries.currentUser()  caches the  /users/me  DTO and  useCurrentUserQuery  converts it with  select .

## global-skill-agent\shadcn.md  (1460 words, 14 chunks)
- shadcn/ui Rules: Complete shadcn/ui component management rules for searching, adding, styling, composing, and upgrading UI elements.
- shadcn/ui Rules > Summary: Complete shadcn/ui component management for adding, searching, fixing, styling, and composing UI.
- shadcn/ui Rules > Rule 13 - UI Styling & Spacing Restrictions (Tailwind CSS): No arbitrary colors or typography overrides : Do not overwrite predefined component styles or hardcode colors/typography.
- shadcn/ui Rules > Rule 14 - Form Layout & Validation Standards: Use FieldGroup & Field : Do not structure forms with generic layout divs or raw grid layouts.
- shadcn/ui Rules > Rule 15 - Component Structure & Accessibility: Items must be inside their Group : Interactive options must reside within their respective container groups (e.g.,  SelectItem  inside  SelectGroup ,  DropdownM
- shadcn/ui Rules > Rule 32 - List Tables Fit the Viewport: The page never scrolls for a table : List pages live inside the  h svh  app shell.
- shadcn/ui Rules > Rule 16 - Icon Handling in Components: Use data icon for Button Icons : Icon alignment within buttons is controlled via  data icon="inline start"  or  data icon="inline end"  properties.
- shadcn/ui Rules > Rule 17 - Component Lifecycle & CLI Workflows: Registry reference first : Before building or changing a primitive, read the latest shadcn source for it.
- shadcn/ui Rules > Component Selection Reference: Category   UI Element / Component   Selection / Purpose     :    :    :       Actions     Button    Standard trigger actions and form submissions      Form Inpu

## global-skill-agent\structure.md  (2673 words, 16 chunks)
- Structure Rules: Architecture, folder/file organization, and import boundaries.
- Structure Rules > Rule 1 - Design System Component Structure: No atomic design directories : Do not use  atoms ,  molecules , or  organisms  sub directories in  src/ widgets/ui .
- Structure Rules > Rule 2 - Feature-Based Architecture for Modules: Feature isolation : Organise components and code inside  src/modules  by domain features.
- Structure Rules > Rule 8 - Core Layer Import Boundaries: Relative imports inside core : Code inside  src/core  must use relative imports ( ./  or  ../ ) to import other  core  files.
- Structure Rules > Rule 10 - Logic Helper Separation: Decouple utility functions : Place logic processing helpers, calculations, or pure parsing utility functions in a  utils  folder or file.
- Structure Rules > Rule 12 - Component File Naming and Direct Imports: Name files after components : Component files must be named after the component (e.g.,  app sidebar.tsx ) rather than using  index.tsx .
- Structure Rules > Rule 28 - Component Tree, Screens and Role Suffixes: Applies to every module.
- Structure Rules > Rule 37 - The API Contract Is Generated, and Every Response Is Parsed: The backend's Zod schemas are the single source of truth for the wire format.

## global-skill-agent\style.md  (1293 words, 16 chunks)
- Style Rules: Code style and conventions.
- Style Rules > Rule 4 - Domain/System Texts Must Be Constants or Enums: Only domain/system texts must be declared as constants or enums (for example: table columns, API status values, business status values, system messages).
- Style Rules > Rule 5 - Import Order: Import order must follow this sequence: 1.
- Style Rules > Rule 33 - Statement Groups in Components and Hooks: Inside a component or hook body, statements are grouped like imports.
- Style Rules > Rule 6 - Use Global Design Tokens for Styles: Never hard code HEX color values in components.
- Style Rules > Rule 7 - No Comments in Code: Do not add comments to the source code (neither single line  //  nor multi line  /   / ).
- Style Rules > 🎨 Tailwind CSS v4 Design System Guidelines: This guide specifies how to build and maintain production ready design systems using  Tailwind CSS v4  within this codebase.

## global-skill-agent\typescript.md  (345 words, 6 chunks)
- TypeScript Rules: TypeScript type practices and conventions.
- TypeScript Rules > Rule 9 - Use Global Utility Types for Null/Undefined: Do not use raw union types like   null  or   undefined  in the source code.
- TypeScript Rules > Rule 11 - Centralized Type Declarations: All type and interface declarations must be placed in a  types  folder or files named  types.ts .
- TypeScript Rules > Rule 35 - Translation Keys Are Typed: Resources are declared once :  src/core/types/i18next.d.ts  maps every namespace to its  en.json  through  CustomTypeOptions .

## README.md  (1646 words, 14 chunks)
- FE React Boilerplate: A production ready React 19 starter built around feature modules, strict layer boundaries and permission based routing.
- FE React Boilerplate > Stack: Area   Library     :    :      UI   React 19, shadcn/ui ( radix nova ), Tailwind CSS 4, lucide react     Routing   React Router 8 data router with lazy routes
- FE React Boilerplate > Getting started: This repository holds the frontend only.
- FE React Boilerplate > Scripts: Script   Description     :    :       npm run dev    Start the dev server      npm run build    Typecheck and build for production      npm run size    Check th
- FE React Boilerplate > CI/CD: [ .github/workflows/ci.yml ](./.github/workflows/ci.yml) runs on pull requests into  develop  or  main  and on pushes to them: formatting, the API contract chec
- FE React Boilerplate > Project structure: Imports between layers are enforced by  eslint plugin boundaries :  widgets  imports nothing from the app,  core  never imports UI,  shared  never imports modules, and modules never import each other.
- FE React Boilerplate > Routing and access: Anonymous users are sent to  /sign in?redirect=<path  and returned there after signing in.
- FE React Boilerplate > Connecting a real backend: Set  VITE API URL  (see  .env.example ).
- FE React Boilerplate > UI components: The design tokens (Hanken Grotesk, brand green, 44px inputs, 48px buttons, card radius and shadows) are defined in  src/index.css , with a matching dark palette.
- FE React Boilerplate > Coding rules: Human and AI contributors follow the rule sheets in [global skill agent/](./global skill agent/README.md): structure, routing, React composition, styling, TypeScript, shadcn and forms.
- FE React Boilerplate > Roadmap: AI Chat module: streaming responses, conversation history, markdown rendering   Calendar module: month/week/agenda views and event management

## user-story\README.md  (197 words, 3 chunks)
- User Stories: Put the stories to implement here, one Markdown file per story, named  <id <short title .md  (for example  123 export users.md ).
- User Stories > Story format: Only the title and acceptance criteria are required.
- User Stories > For agents: 1. Read [global skill agent/README.md](../global skill agent/README.md) and every rule sheet it lists.

## .qa\how-to-test.md  (73 words, 1 chunks)
- How to test: The user's words:   ok.
