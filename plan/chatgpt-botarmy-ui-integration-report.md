# BotArmy Front-End Integration Plan
**Repository Targets:**  
- Implementation: `geniusboywonder/botarmy-poc`  
- UI Mockup: `geniusboywonder/RealBotArmyUI-Bolt`  

**Audience:** Solutions Architecture, Front‑End & Full‑Stack Engineering  
**Date:** 2025‑08‑18 (Africa/Johannesburg)

---

## 1) Scope & Objectives

- Replace the lightweight Vite front-end in `botarmy-poc` with the RealBotArmyUI-Bolt design system and page structure.
- Keep the Python-based orchestration/LLM logic in `botarmy-poc` intact; expose stable HTTP/WebSocket APIs for the UI.
- Deliver a cohesive, type-safe front-end with routing, data fetching, real-time streaming, error handling, and test coverage.
- Produce a pragmatic work plan with effort sizing, estimated LOC, and a step-by-step execution path.

> **Assumptions & Constraints**  
> - `botarmy-poc` contains the primary domain modules (`agents`, `artifacts`, `conflict`, `escalation`, `prompts`, `workflow`, etc.) and top-level Python files (`agents.py`, `config.py`, `database.py`, `llm_client.py`, `main.py`) with a minimal Vite front-end scaffold (`package.json`, `vite.config.js`, `src/`).  
> - RealBotArmyUI-Bolt is a Vite + TypeScript + Tailwind UI mockup with `index.html`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig*.json`, `eslint.config.js`, and a `src/` folder that houses the component/page structure.  
> - File-by-file enumeration inside `src/` of the UI mockup is assumed to follow common Vite/React conventions. If internal filenames differ, adjust mappings accordingly after local clone.

---

## 2) Current-State Review (Front-End Perspective)

### 2.1 `botarmy-poc` (front-end only)
- **Observed front-end footprint**: Minimal Vite setup with `package.json`, `vite.config.js`, and a `src/` directory. The repository is majority Python and is not front-end centric.  
- **Implication**: Treat any existing front-end as disposable scaffolding—supersede with the RealBotArmyUI-Bolt design system.

### 2.2 `RealBotArmyUI-Bolt` (UI mockup)
- **Observed toolchain**: Vite + TypeScript + Tailwind + PostCSS + ESLint + TSConfig; `index.html` present; `src/` contains UI code.  
- **Implication**: Use this project as the canonical front-end. Either:  
  1) **Integrate as a standalone UI** that talks to the Python backend via HTTP/WebSocket; or  
  2) **Fold into a mono-repo** (two packages: `apps/ui` and `apps/server`).

**Recommendation**: Start standalone for speed of adoption; convert to mono-repo later if you want atomic CI, shared versioning, and end-to-end type sharing.

---

## 3) Target Architecture

- **Front-End App (from RealBotArmyUI-Bolt)**  
  - Routing (public vs. app routes)  
  - Global theming & layout (header/sidebar, content shell)  
  - Feature pages mapped to BotArmy domain:  
    - Dashboard (system status, recent runs/activity)
    - Agents (list, detail, create/edit, enable/disable)
    - Workflows (list, detail/run history; optional builder later)
    - Runs / Jobs (active & historical, with real-time logs)
    - Artifacts (outputs, datasets, files)
    - Prompts (library of prompt templates)
    - Conflict Resolution (pending conflicts; resolve/approve)
    - Escalations (queue & resolution workflow)
    - Settings (models, API keys, environment & telemetry)
  - State & Data: Query/mutation cache, optimistic updates, background refresh
  - Real-time: Streaming logs/events via WebSocket or SSE
  - Observability: Error boundaries, toast notifications, request tracing (X-Request-Id)

- **Backend (from `botarmy-poc`)**  
  - Stabilize API surface for the features above (REST + WebSocket)  
  - Standardize models: Agent, Workflow, Run, Artifact, Prompt, Conflict, Escalation, User/Session
  - Pagination, filtering, sorting semantics
  - Consistent error envelope (code, message, fields)
  - CORS + auth (token header)

---

## 4) Module Mapping & Work Packages

> **Sizing key**:  
> S = 0.5–1 day (≤ 200 LOC) • M = 1–2 days (200–600 LOC) • L = 3–5 days (600–1200 LOC) • XL = >5 days (>1200 LOC).  
> LOC ranges are estimates for **new or modified** front-end files only, excluding generated types.

### A. Project Setup & Foundations
- **A1 — Standalone UI project baseline**  
  - Action: Use RealBotArmyUI-Bolt as the main UI repo; ensure scripts, linting, Tailwind, and TS configs are coherent.  
  - Deliverables: Clean `package.json` scripts, `.env.example`, `README`, lint/format hooks.  
  - Est. LOC: 80–150 • Effort: **S**

- **A2 — Routing & App Shell**  
  - Action: Establish route tree for all feature pages, with protected app layout (sidebar/header) and a public login route (if applicable).  
  - Deliverables: Route config, base layouts, error boundary, not-found page.  
  - Est. LOC: 200–350 • Effort: **M**

- **A3 — API Client & Types**  
  - Action: Introduce a typed API layer (handwritten or generated from OpenAPI/JSON schemas). Add an HTTP client and hooks layer.  
  - Deliverables: API service functions, request/response models, error envelope, retry/backoff.  
  - Est. LOC: 250–450 • Effort: **M**

- **A4 — State & Data Fetching**  
  - Action: Add a query/mutation library with caching, invalidation, polling, and optimistic updates.  
  - Deliverables: Query client provider, reusable hooks, pagination helpers.  
  - Est. LOC: 120–220 • Effort: **S**

- **A5 — Theming & Design Tokens**  
  - Action: Map RealBotArmyUI-Bolt styles to Tailwind tokens; define typography, spacing, color ramps, dark mode.  
  - Deliverables: Tailwind config tokens, global CSS, utility conventions.  
  - Est. LOC: 120–200 • Effort: **S**

### B. Feature Pages

- **B1 — Dashboard**  
  - Action: Cards for KPIs (agents online, active runs, error rate, recent artifacts), recent activity feed.  
  - Dependencies: A3/A4, back-end metrics & activity endpoint(s).  
  - Est. LOC: 200–350 • Effort: **M**

- **B2 — Agents**  
  - Action: List, search/filter, create/edit, enable/disable, detail with recent runs and config summary.  
  - Dependencies: A3/A4; endpoints for CRUD & status; artifacts linkage.  
  - Est. LOC: 350–600 • Effort: **M–L**

- **B3 — Workflows**  
  - Action: List/detail, run history; later add a visual builder (deferred).  
  - Dependencies: A3/A4; run trigger endpoint; history list.  
  - Est. LOC: 250–450 (without builder) • Effort: **M**

- **B4 — Runs / Jobs**  
  - Action: Active runs with live logs; historical runs with filters; detail view with steps & timings.  
  - Dependencies: A3/A4; WebSocket/SSE (C1); artifacts linkage.  
  - Est. LOC: 300–550 • Effort: **M–L**

- **B5 — Artifacts**  
  - Action: List and preview of generated outputs (text, tables, images, files); download support.  
  - Dependencies: A3/A4; signed URL/download endpoint.  
  - Est. LOC: 220–380 • Effort: **M**

- **B6 — Prompts Library**  
  - Action: Catalogue prompts, tag/owner, clone, version notes; preview & quick test modal.  
  - Dependencies: A3/A4.  
  - Est. LOC: 220–380 • Effort: **M**

- **B7 — Conflict Resolution**  
  - Action: Queue list, detail panel with proposed actions, accept/retry/override flows.  
  - Dependencies: A3/A4.  
  - Est. LOC: 250–450 • Effort: **M**

- **B8 — Escalations**  
  - Action: Queue, assignment, resolution notes, SLA timers.  
  - Dependencies: A3/A4.  
  - Est. LOC: 250–450 • Effort: **M**

- **B9 — Settings**  
  - Action: Model/provider config, API keys, environment, telemetry toggles.  
  - Dependencies: A3/A4.  
  - Est. LOC: 180–320 • Effort: **S–M**

### C. Cross-Cutting

- **C1 — Real-Time Stream**  
  - Action: WebSocket or SSE client wrapper; subscribe to run/log channels; reconnect & backoff; presence indicators.  
  - Est. LOC: 150–280 • Effort: **S–M**

- **C2 — Auth & Session**  
  - Action: Token storage strategy, refresh flow, route guards, user menu.  
  - Est. LOC: 150–250 • Effort: **S–M**

- **C3 — Errors, Toasts & Telemetry**  
  - Action: Error boundary pages, API error normalization, toasts/snackbars, minimal UX telemetry hooks.  
  - Est. LOC: 120–220 • Effort: **S**

- **C4 — Accessibility & Responsiveness**  
  - Action: Keyboard navigation, focus rings, aria-* attributes, mobile breakpoints.  
  - Est. LOC: 80–150 • Effort: **S**

### D. Quality Engineering

- **D1 — Unit & Component Tests**  
  - Action: Test runners/config; component tests for key pages and hooks.  
  - Est. LOC: 200–350 • Effort: **M**

- **D2 — E2E Tests**  
  - Action: Smoke flow: login → agents → create run → watch logs → view artifact.  
  - Est. LOC: 150–280 • Effort: **S–M**

- **D3 — CI Setup**  
  - Action: Lint, type-check, test, build; preview deployments.  
  - Est. LOC: 60–120 • Effort: **S**

---

## 5) Dependencies (Front-End)

- Core: React (or compatible framework used in the mockup), React Router, TypeScript, Vite, Tailwind, PostCSS
- Data: TanStack Query (or equivalent), fetch/axios, WebSocket/SSE client
- Validation/Types: Zod (or OpenAPI-generated types), utility types
- UI Utilities: Headless or lightweight UI primitives, icons, date/time utilities
- Tooling: ESLint, Prettier, Husky + lint-staged (optional), Vitest/RTL, Playwright (E2E)
- Ops: Dotenv (Vite), environment switch with `import.meta.env`

> All additions should respect the mockup’s existing lints/configs. Favor lightweight, framework-agnostic libs to keep bundle size small.

---

## 6) Recommendations & Fixes

1. **Treat `botarmy-poc` front-end as scaffolding** and replace with RealBotArmyUI-Bolt design and structure.  
2. **Define and freeze an API contract**: publish OpenAPI/JSON schema; include pagination, filters, errors.  
3. **Normalize resource models** across features (Agent, Workflow, Run, Artifact, Prompt, Conflict, Escalation).  
4. **Introduce a real-time channel** for runs and logs (WebSocket or SSE) with standardized event payloads.  
5. **Consolidate configuration**: `.env` (+ example), environment-specific base URLs, feature flags.  
6. **Harden error handling**: global boundary, toast strategy, retry/backoff, empty states and skeletons.  
7. **Accessibility pass**: keyboard focus management, aria labels, color contrast, tab order.  
8. **Testing strategy**: minimum smoke E2E + component tests for all CRUD pages.  
9. **Documentation**: a short contributor guide and API usage notes for front-end devs.  
10. **Plan for a mono-repo** later if needed (Nx/Turborepo) for shared models and unified CI.

---

## 7) Estimated Total Effort & LOC (Front-End)

- **Foundations (A1–A5)**: 3–5 days • ~770–1,370 LOC  
- **Features (B1–B9)**: 12–18 days • ~2,320–3,930 LOC  
- **Cross-Cutting (C1–C4)**: 3–5 days • ~500–900 LOC  
- **Quality (D1–D3)**: 3–4 days • ~410–750 LOC  

**Grand Total**: **21–32 days** • **~4,000–6,900 LOC** (1–2 devs, parallelizable after A1–A3)

> Notes: Timeline assumes stable back-end endpoints and availability of a product owner for UX acceptance. Add 15–25% contingency if API contracts are evolving.

---

## 8) Step-by-Step Implementation Plan

**Phase 0 — Prep (0.5–1 day)**  
- Clone both repos; run locally.  
- Confirm Node/PNPM/Yarn versions; align on one package manager.  
- Create `.env.example` for the UI and document required variables.

**Phase 1 — Foundations (3–5 days)**  
1. Adopt RealBotArmyUI-Bolt as the canonical UI app.  
2. Add routing/app shell and placeholder pages for all features.  
3. Install/query library and create API client scaffold with base URL from env.  
4. Wire up query provider and error boundary; add basic toasts.  
5. Port theming tokens and verify Tailwind configuration.

**Phase 2 — CRUD & Lists (6–9 days)**  
1. Agents: list/detail/create/edit/enable-disable.  
2. Prompts: list/detail/clone.  
3. Artifacts: list/download/preview types.  
4. Settings: models, providers, keys, environment toggles.

**Phase 3 — Workflows & Runs (4–6 days)**  
1. Workflows: list/detail, run trigger; show run history.  
2. Runs: active runs table; detail page with step list and timings.  
3. Add filters/sorting/pagination across tables.

**Phase 4 — Real-Time & Ops (3–5 days)**  
1. Add WebSocket/SSE for live logs and run status.  
2. Implement reconnect/backoff and presence indicators.  
3. Finalize empty/loading/error states; polish responsive views.

**Phase 5 — Testing & Hardening (3–4 days)**  
1. Component tests for all CRUD pages and run views.  
2. E2E smoke path (login → agents → new run → watch logs → view artifact).  
3. CI: lint, type-check, test, build; preview deploys.  
4. Docs: contributor guide and API notes.

**Phase 6 — Optional Enhancements (post‑MVP)**  
- Workflow visual builder & drag-and-drop.  
- Role-based access control.  
- Saved views, advanced analytics, and dashboards.  
- Monorepo migration with shared types.

---

## 9) File & Module Inventory (as reference for integration)

- **`botarmy-poc` (relevant to front-end integration)**  
  - Top-level files: `package.json`, `vite.config.js`, `README.md`  
  - Python domain files: `agents.py`, `config.py`, `database.py`, `llm_client.py`, `main.py`  
  - Folders: `agents/`, `artifacts/`, `conflict/`, `data/`, `docs/`, `escalation/`, `prompts/`, `src/`, `static/`, `tests/`, `workflow/`  
  - Action: Treat `src/` as placeholder; replace with RealBotArmyUI-Bolt app or host UI as separate repo pointing to the backend.

- **`RealBotArmyUI-Bolt` (UI mockup)**  
  - Top-level files: `index.html`, `package.json`, `postcss.config.js`, `tailwind.config.js`, `tsconfig.json`, `tsconfig.app.json`, `eslint.config.js`, `vite.config.ts`  
  - Folder: `src/` (components/pages/layouts)  
  - Action: Use as the UI foundation; add routes/pages per Section 4.

> If internal `src/` file names differ from expectations, create a short mapping sheet during Phase 1 after a local clone (`pages/*`, `components/*`, `lib/*`, `routes/*`).

---

## 10) Acceptance Criteria (Front-End MVP)

- Navigable routes for all feature pages with a consistent app shell.  
- Lists with pagination/filter/sort for Agents, Workflows, Runs, Artifacts, Prompts.  
- Create/Edit flows for Agents and Prompts.  
- Real-time updates for active runs and logs.  
- Settings page with environment and provider configuration.  
- Error boundaries, toasts, loading states; basic a11y and responsive layout.  
- Component tests for core pages; a working E2E smoke path.  
- Build & deploy succeeds in CI with environment-based configuration.

---

## 11) Risks & Mitigations

- **Evolving API contracts** → Freeze an MVP schema and version it; use feature flags.  
- **Real-time complexity** → Start with polling; add WebSocket/SSE in Phase 4.  
- **Auth scope creep** → Begin with token header; defer SSO/RBAC to post-MVP.  
- **Asset previews** → Support common types first; stub fallbacks for unknowns.  
- **Bundle size** → Avoid heavy UI kits; prefer headless primitives and lazy routes.  

---

## 12) Handover Checklist

- `.env.example` with documented variables  
- API schema (OpenAPI/JSON) committed and versioned  
- README with local dev, scripts, and workflows  
- CI pipeline producing preview URLs for PRs  
- Minimum test coverage gates for critical surfaces

---

**End of document.**
