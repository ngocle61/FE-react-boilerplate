# User Stories

Put the stories to implement here, one Markdown file per story, named `<id>-<short-title>.md` (for example `123-export-users.md`). Then start the workflow:

```text
/implement-story user-story/123-export-users.md
```

Agents without that command can be told `Implement user-story/123-export-users.md`. Both follow [the workflow](#workflow) below.

## Story format

Only the title and acceptance criteria are required. Paste the rest as you have it.

```md
# [FE] Export users to CSV

As an admin, I want to export the user list, so that I can share it with HR.

Figma: https://www.figma.com/design/<file-key>/<name>?node-id=<node-id>

## Acceptance criteria

- The Users screen has an Export button, visible to admins only.
- The file contains the rows that match the current filters.

## Notes

Links, API details, anything out of scope.
```

- The `[FE]` prefix tells QA this is frontend work, so it does not have to ask.
- A feature that also needs an API change gets a second `[BE]` story in [BE-nestjs-boilerplate](https://github.com/ngocle61/BE-nestjs-boilerplate/tree/develop/user-story). Do that one first.
- Leave out the `Figma:` line and the agent drafts a design for you to approve first.

## Workflow

Requirement → analyze → Figma → implement → QA → result.

The agent stops and asks you only at the points marked **Stop**.

### 1. Requirement

Read the story, [global-skill-agent/README.md](../global-skill-agent/README.md) and every rule sheet it lists.

**Stop** if the story has no acceptance criteria.

### 2. Analyze

Write a short analysis in the chat, not in the story file:

- each acceptance criterion, in testable terms
- the screens and routes involved
- the roles and permissions involved
- the API calls needed, checked against `../BE-nestjs-boilerplate/openapi.json`

**Stop** if a criterion is ambiguous or two of them conflict. Do not guess.

### 3. Figma

Figma reads are limited (20 a month on the Starter plan; writes are not counted), so read only the frames the story needs, once each. If Figma refuses a read, **stop** and report it. Never invent a design.

- **The story has a `Figma:` link.** Load the Figma `figma-design-to-code` skill first, then read the design with `get_design_context`, including its screenshot.
- **The story has no link.** Load the Figma `figma-create-new-file`, `figma-generate-design` and `figma-use` skills and draft the screens in a new file, on a plan where `whoami` shows a Full seat. Use the tokens from `src/index.css` and the components in `src/_widgets/ui`. Add the `Figma:` line to the story. **Stop** and wait for approval of the design, then read it as above.

Save a screenshot of each frame to `user-story/assets/<id>/<frame>.png` and add it to the story under `## Design` as `![<frame>](assets/<id>/<frame>.png)`. QA uses these images, so it needs no Figma reads of its own.

### 4. Implement

- The story decides behavior. The Figma design decides how it looks.
- **Stop** if they conflict.
- Reuse the tokens and components that exist. Adapt Figma's code to the project; never paste it in as is.
- When the story needs an API change, **stop** and ask for a `[BE]` story, unless the user wants it done here. Either way the API changes first, then run `npm run api:generate` here (Rule 37).
- Add tests, and run `npm run verify` until it passes.

### 5. QA

The app must be running with a seeded backend, and QA never starts it.

1. Check that http://localhost:3000 has the title `React Boilerplate`, because another project may hold that port.
2. **Stop** if it does not answer or shows another app, and give the user the start commands: `npm run start:dev` in `../BE-nestjs-boilerplate`, then `npm run dev` here.
3. **Stop** when the story involves more than one role, and ask for the accounts (see [how-to-test](../.qa/how-to-test.md)).
4. Run the `qa-agent` skill on the story and tell it to run QA now. It asks before each scenario that writes data, because the backend may use a shared database.

If a criterion fails, fix it, run `npm run verify` again and rerun QA, at most twice. After that, report what still fails.

### 6. Result

Report to the user:

- each acceptance criterion as PASS, FAIL or PENDING, with its evidence
- anything PENDING that needs the user's eye (QA leaves visual checks for a person)
- the Figma link
- the files changed, and the `npm run verify` result

Do not commit or push unless asked. When asked, push to `develop` with a `Feat :: `, `Chore :: ` or `Wip :: ` subject.
