---
schema: clarification-answers/v1
status: submitted
generated_at: "2026-10-14T10:42:20.574Z"
scope: [frontend, backend, generic]
questions_file: clarification-questions.json
---

# Rearchitecture Clarification Answers

## 🖥️ Frontend

- **F1** Which Next.js major version should the new application use?
  - answer: Next.js current stable release
  - source: user
- **F2** Which React-Bootstrap version should be used?
  - answer: React-Bootstrap current stable release
  - source: user
- **F3** What visual design direction should the new product-management interface follow?
  - answer: Clean responsive Bootstrap-based admin dashboard
  - source: user
- **F4** Which accessibility standard should the app target?
  - answer: WCAG 2.1 AA
  - source: user
- **F5** Which browsers should the app support?
  - answer: Modern evergreen browsers
  - source: user
- **F6** What responsive layout strategy should the product screens use?
  - answer: Mobile-first responsive layout
  - source: user
- **F7** Which languages/locales should the app support?
  - answer: English only
  - source: user
- **F8** Which client-side state approach should be used?
  - answer: Redux Toolkit
  - source: user
- **F9** Which Next.js built-in routing mode should the app use?
  - answer: Next.js built-in routing
  - source: user

## ⚙️ Backend

- **B1** Which json-server version should provide the product CRUD API?
  - answer: json-server current stable release
  - source: user
- **B2** What product API contract should the new app expose?
  - answer: Define a new conventional json-server CRUD API
  - source: user
- **B3** How should product data be initialized and persisted for this new app?
  - answer: Seed json-server from db.json; no legacy data migration
  - source: user
- **B4** Should product-management screens require authentication?
  - answer: preserve existing auth mechanism; detect from codebase
  - source: user
- **B5** What performance or availability expectations should apply to the json-server demo?
  - answer: match current production baseline; no regression
  - source: user

## 📋 General

- **G1** What outcome will define success for this product CRUD application?
  - answer: Create, list, view, edit, and delete products with validated forms and json-server persistence
  - source: user
- **G2** Are there any features or constraints that should be explicitly excluded from this app?
  - answer: no
  - source: user
- **G3** How should existing tests be treated?
  - answer: must pass
  - source: user
- **G5** Any additional requirements, exclusions, dependencies, compliance rules, or operational constraints?
  - answer: None beyond the decisions listed in this specification.
  - source: user