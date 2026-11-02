# User Stories

Put the stories to implement here, one Markdown file per story, named `<id>-<short-title>.md` (for example `123-export-users.md`). Then tell the agent which one to implement:

```text
Implement user-story/123-export-users.md
```

## Story format

Only the title and acceptance criteria are required. Paste the rest as you have it.

```md
# Export users to CSV

As an admin, I want to export the user list, so that I can share it with HR.

## Acceptance criteria

- The Users screen has an Export button, visible to admins only.
- The file contains the rows that match the current filters.

## Notes

Designs, links, API details, anything out of scope.
```

## For agents

1. Read [global-skill-agent/README.md](../global-skill-agent/README.md) and every rule sheet it lists.
2. Treat the acceptance criteria as the scope. Ask when one is ambiguous instead of guessing, and do not build what the story does not ask for.
3. When the story needs an API change, make it in `../BE-nestjs-boilerplate` first and run `npm run openapi:generate` there, then run `npm run api:generate` here (Rule 37).
4. Run `npm run verify` before reporting the story as done.
5. Report each acceptance criterion as done or not done.
