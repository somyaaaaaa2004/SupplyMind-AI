# components/

Shared, reusable React components. Strictly presentational — no business logic.

## Structure

```
components/
├── ui/         # Shadcn UI primitives (auto-generated via `npx shadcn@latest add`)
│               # Do NOT edit these files manually.
└── common/     # App-level shared components built on top of ui/ primitives
                # Examples: PageHeader, DataTable, ConfirmDialog, EmptyState,
                #           LoadingSpinner, Avatar, Badge, StatusPill
```

## Rules

- `ui/` components are **generated** — never edit manually; re-run shadcn to update.
- `common/` components must be **domain-agnostic** — no procurement/inventory references.
- All components must be **typed** with explicit TypeScript interfaces.
- Use `cn()` from `@/utils/cn` to merge Tailwind classes.
- Export everything through the closest `index.ts` barrel.
