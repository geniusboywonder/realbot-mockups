# RealBotArmyUI-Bolt UI Inventory

## Overview
This inventory catalogs the `RealBotArmyUI-Bolt` repository, including `ModularApp.jsx` as an alternative to `App.tsx`/`RealBotArmy-polishedUI.jsx`. `ModularApp.jsx` introduces a modular structure with separate layout and page components and custom hooks, improving over the monolithic `App.tsx`. The inventory focuses on `src/components/`, `src/layouts/`, `src/pages/`, `src/hooks/`, `src/utils/`, and `assets/`, with integration guidance for `botarmy-poc`.

## src/components/
| Component | Description | Dependencies | Concerns | Improvements |
|-----------|-------------|--------------|----------|--------------|
| `Button.tsx` | Reusable button (assumed in pages, from `App.tsx`). | React, TypeScript, Tailwind CSS. | Not provided; unclear implementation. | Define with TypeScript interfaces; use Tailwind. |
| `CommandPalette.tsx` | Command palette for shortcuts (in `App.tsx`, not `ModularApp.jsx`). | React, TypeScript, Tailwind CSS. | Not used in `ModularApp.jsx`; may be deprecated. | Implement with `react-hotkeys` if needed; add type safety. |

## src/layouts/
| Component | Description | Dependencies | Concerns | Improvements |
|-----------|-------------|--------------|----------|--------------|
| `Header.jsx` | Top bar with dark mode toggle, agent status. | React, Tailwind CSS, `lucide-react` (assumed). | Not provided; inferred from `App.tsx`. | Convert to `.tsx`; add prop interfaces. |
| `Sidebar.jsx` | Navigation sidebar with page links. | React, Tailwind CSS, `lucide-react` (assumed). | Not provided; hardcoded nav items. | Convert to `.tsx`; use `react-router-dom`. |

## src/pages/
| Component | Description | Dependencies | Concerns | Improvements |
|-----------|-------------|--------------|----------|--------------|
| `Dashboard.jsx` | Agent cards and chat (from `App.tsx` dashboard). | React, `useAgents`, `useChat`, `Button.tsx`, Tailwind CSS, `lucide-react`. | Not provided; mock data. | Convert to `.tsx`; fetch agents via `useAgents`. |
| `Tasks.jsx` | Task table view (from `App.tsx` tasks). | React, Tailwind CSS, `lucide-react`. | Not provided; mock data. | Convert to `.tsx`; fetch tasks from API. |
| `Logs.jsx` | JSONL logs display (from `App.tsx` logs). | React, `useChat`, Tailwind CSS, `lucide-react`. | Not provided; mock logs. | Convert to `.tsx`; add dynamic filtering. |
| `Artifacts.jsx` | Artifacts table/file tree (from `App.tsx` artifacts). | React, `useArtifacts`, Tailwind CSS, `lucide-react`. | Not provided; mock URLs. | Convert to `.tsx`; fetch artifacts from API. |
| `Settings.jsx` | Agent/system configuration (from `App.tsx` settings). | React, `useAgents`, Tailwind CSS, `lucide-react`. | Not provided; no persistence. | Convert to `.tsx`; save settings via API. |
| `AnalyticsPage` | Metrics and charts (in `App.tsx`, not `ModularApp.jsx`). | React, TypeScript, Tailwind CSS, `lucide-react`. | Missing in `ModularApp.jsx`; placeholder charts. | Add to `src/pages/`; use `recharts`. |

## src/hooks/
| Hook | Description | Dependencies | Concerns | Improvements |
|------|-------------|--------------|----------|--------------|
| `useAgents.js` | Manages agent state, updates, expansion. | React, `useChat` (for `setChatMessages`, `setLogs`). | Not provided; likely mock data. | Convert to `.ts`; fetch from `/bots` API. |
| `useChat.js` | Manages chat messages and logs. | React, `useRef`. | Not provided; mock data. | Convert to `.ts`; use WebSocket/polling. |
| `useArtifacts.js` | Manages artifact tabs and folder state. | React. | Not provided; mock URLs. | Convert to `.ts`; fetch artifacts from API. |

## src/utils/
| File | Description | Dependencies | Concerns | Improvements |
|------|-------------|--------------|----------|--------------|
| (None) | No utility files provided. | N/A | Missing API utilities. | Add `api.ts` for `botarmy-poc` API calls; use `axios`. |

## assets/
| File | Description | Dependencies | Concerns | Improvements |
|------|-------------|--------------|----------|--------------|
| (None) | No assets provided. | N/A | Missing logo/icons. | Add optimized `logo.png`, `bot-icon.svg`; use WebP/SVG sprites. |

## Dependencies
- **External**: 
  - `react`, `react-dom` (from `main.tsx`, `ModularApp.jsx`).
  - `lucide-react` (inferred for icons in pages).
  - Tailwind CSS (in `index.css` or CDN).
  - For integration: `axios`/`react-query` (API calls), `react-router-dom` (routing), `recharts` (analytics).
- **Internal**:
  - `ModularApp.jsx` uses `Header.jsx`, `Sidebar.jsx`, page components, hooks.
  - Pages depend on hooks (`useAgents`, `useChat`, `useArtifacts`), `Button.tsx`.
  - `main.tsx` renders `ModularApp.jsx` (if used).

## Minimum Needed for POC
- **Components**: `Header.jsx`, `Sidebar.jsx`, `Dashboard.jsx`, `Tasks.jsx`, `useAgents.js`, `useChat.js`.
- **Setup**:
  - Copy `main.tsx`, `ModularApp.jsx`, `src/layout/`, `src/pages/`, `src/hooks/`, `index.css` to `botarmy-poc/client/src`.
  - Update `main.tsx` to render `ModularApp.jsx`.
  - Install `react`, `react-dom`, `lucide-react`, `axios`.
  - Configure Vite with Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer; npx tailwindcss init`).
  - Add `src/utils/api.ts` for API calls (e.g., `GET /bots` in `useAgents`).
  - Stub `Button.jsx` as basic component if not provided.
- **Configuration**:
  - Add `.env` with `VITE_API_URL` for backend.
  - Use relative imports (e.g., `import Header from './layout/Header'`).
- **Concerns**:
  - Missing files (`Header.jsx`, `Dashboard.jsx`, hooks) require stubbing.
  - Mock data in hooks must be replaced.
  - `.jsx` lacks type safety.
- **Improvements**:
  - Stub missing components/hooks with minimal implementations.
  - Add error handling in `useAgents`, `useChat`.
  - Convert to `.tsx` for type checking.

## Best Practices for Production
- **Modularization**:
  - Ensure components/hooks are in `src/layout/`, `src/pages/`, `src/hooks/`.
  - Use `react-router-dom` for routing (e.g., `<Route path="/dashboard" element={<Dashboard />} />`).
- **State Management**: Use hooks or add `zustand` for complex state.
- **Data Fetching**: Use `react-query` in hooks for API caching/retries.
- **Styling**: Configure Tailwind CSS in `index.css`; ensure consistent typography.
- **Type Safety**:
  - Convert `.jsx` to `.tsx`.
  - Define interfaces for `Agent`, `ChatMessage`, `Log`, `Artifact` in `src/utils/types.ts`.
  - Add prop types (e.g., `interface DashboardProps { agents: Agent[] }`).
- **Performance**:
  - Lazy load pages (e.g., `React.lazy(() => import('./pages/Dashboard'))`).
  - Optimize assets with WebP/SVG sprites.
- **Accessibility**:
  - Add ARIA labels to `Sidebar.jsx`, `Dashboard.jsx`.
  - Ensure keyboard navigation in `Header.jsx`, forms.
- **Error Handling**:
  - Add error boundary in `ModularApp.jsx`.
  - Include loading states in `Dashboard.jsx`, `Tasks.jsx`.
- **Testing**: Use `jest`, `react-testing-library` for unit tests.
- **Concerns**:
  - Missing files hinder implementation.
  - Mock data limits functionality.
  - Missing analytics page.
- **Improvements**:
  - Implement `Analytics.jsx` with `recharts`.
  - Use WebSocket in `useChat` for real-time updates.
  - Add JWT authentication for APIs.