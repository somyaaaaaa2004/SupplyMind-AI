# Architecture Decision Records (ADRs)

ADRs document significant architectural decisions made during the SupplyMind AI project.
Each record captures the context, options considered, decision made, and consequences.

## Format

Each ADR lives in a separate Markdown file: `ADR-NNNN-title.md`

### Template

```markdown
# ADR-NNNN: Title

**Status**: Proposed | Accepted | Deprecated | Superseded by ADR-XXXX
**Date**: YYYY-MM-DD
**Deciders**: [names or roles]

## Context
What is the issue or situation that requires a decision?

## Options Considered
1. Option A — pros / cons
2. Option B — pros / cons
3. Option C — pros / cons

## Decision
Which option was chosen and why.

## Consequences
What are the resulting tradeoffs, risks, and benefits?
```

---

## Index

| # | Title | Status | Date |
|---|-------|--------|------|
| [0001](./ADR-0001-mongodb-over-postgresql.md) | Use MongoDB with Prisma ODM | Accepted | TBD |
| [0002](./ADR-0002-jwt-stateless-auth.md) | Stateless JWT authentication | Accepted | TBD |
| [0003](./ADR-0003-python-ai-microservices.md) | Separate Python AI microservices | Accepted | TBD |
| [0004](./ADR-0004-nextjs-app-router.md) | Next.js 15 App Router over Pages Router | Accepted | TBD |
| [0005](./ADR-0005-feature-sliced-frontend.md) | Feature-sliced frontend architecture | Accepted | TBD |
