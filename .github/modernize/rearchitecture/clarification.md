---
schema: clarification/v1
generated_at: "2026-10-14T10:45:00Z"
scope:
  - frontend
  - backend
  - generic
clarity_score: 1.00
rounds: 1
gaps:
  - field: auth.framework
    resolution: default
    default_used: "preserve existing auth mechanism; detect from codebase"
  - field: nfr.sla
    resolution: default
    default_used: "match current production baseline; no regression"
blocking_gaps: []
---

# Scenario Clarification

## Frontend

- **Target framework**: Current stable Next.js release using the App Router and built-in file-system routing.
- **Component library**: Current stable React-Bootstrap release.
- **Design system**: Clean, responsive Bootstrap-based admin dashboard.
- **Accessibility**: WCAG 2.1 AA.
- **Browser targets**: Modern evergreen browsers.
- **Responsive strategy**: Mobile-first responsive layout.
- **i18n locales**: English only.
- **State management**: Redux Toolkit.
- **Routing**: Next.js built-in routing (App Router).

## Backend

- **Target framework**: Current stable json-server release.
- **API contract preservation**: Define a new conventional json-server CRUD API.
- **Data migration strategy**: Seed json-server from `db.json`; no legacy data migration.
- **Auth framework**: Preserve existing auth mechanism; detect from codebase (default; no existing app found).
- **SLA targets**: Match current production baseline; no regression (default; local/demo app).

## Generic

- **Success definition**: Create, list, view, edit, and delete products with validated forms and json-server persistence.
- **Out of scope**: None specified.
- **Existing test posture**: Must pass.
- **Additional constraints**: None beyond the decisions listed in this specification.

## Gaps & Defaults Applied

- `auth.framework`: default applied because this is a new app with no existing authentication to preserve.
- `nfr.sla`: default applied; use the local/demo baseline.
- The repository was empty, so no existing UI screenshots, API, authentication system, or product data migration were available or required.

## Downstream Usage Notes

- The user confirmed the requested libraries, CRUD scope, responsive design direction, WCAG 2.1 AA, English-only locale, and must-pass test posture.
- Use Bootstrap styling and accessible labels, focus behavior, and form validation feedback.
- Treat json-server and its seeded `db.json` as local development/demo persistence, not a production database.