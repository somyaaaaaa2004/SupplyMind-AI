# Contributing to SupplyMind AI

Thank you for contributing! This guide covers the workflow for team members.

---

## Branching Strategy (Git Flow)

```
main          ← production-ready code only
└── develop   ← integration branch
    ├── feature/SM-123-purchase-order-approval
    ├── fix/SM-456-inventory-sync-bug
    ├── chore/update-dependencies
    └── docs/add-api-docs
```

### Branch Naming

| Prefix | Use for |
|--------|---------|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `hotfix/` | Urgent production fixes |
| `chore/` | Tooling, dependencies |
| `docs/` | Documentation only |
| `refactor/` | Code restructuring |

---

## Commit Convention (Conventional Commits)

```
<type>(<scope>): <short description>

[optional body]

[optional footer: BREAKING CHANGE, closes #issue]
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting (no logic change) |
| `refactor` | Refactoring (no feature/fix) |
| `test` | Adding or fixing tests |
| `chore` | Build system, tooling |
| `perf` | Performance improvement |

### Examples

```
feat(procurement): add purchase order approval workflow
fix(auth): refresh token not rotating on concurrent requests
docs(api): document shipment tracking endpoint
chore(deps): upgrade Prisma to 6.1.0
```

---

## Pull Request Process

1. Create a branch from `develop` (never from `main`).
2. Implement your changes following the code style guidelines below.
3. Run `pnpm typecheck` and `pnpm lint` — both must pass.
4. Open a PR against `develop` with:
   - A clear title following Conventional Commits.
   - A description linking the ticket (`Closes SM-123`).
   - Screenshots or recordings for UI changes.
5. Request review from at least one team member.
6. Squash-merge after approval.

---

## Code Style

### TypeScript

- Strict mode is ON — no `any`, no `@ts-ignore` without a comment.
- Prefer `type` over `interface` for plain data shapes; use `interface` for extensible APIs.
- Use `const` by default; `let` only when reassignment is needed.
- Async functions must declare their return type explicitly.

### Naming

| Concept | Convention |
|---------|-----------|
| Files | `kebab-case.ts` |
| React components | `PascalCase.tsx` |
| Variables / functions | `camelCase` |
| Constants | `SCREAMING_SNAKE_CASE` |
| Types / interfaces | `PascalCase` |
| Zod schemas | `camelCase` + `Schema` suffix |

### Formatting

Run Prettier before committing:
```bash
pnpm format
```

---

## Testing Standards (implement in features phase)

| Layer | Tool | Coverage target |
|-------|------|-----------------|
| Unit (services, utils) | Vitest | ≥ 80% |
| Integration (API routes) | Supertest | All happy + error paths |
| E2E (critical flows) | Playwright | Auth, PO creation, inventory |

---

## Questions?

Open a discussion in the team Slack channel `#supplymind-dev`.
