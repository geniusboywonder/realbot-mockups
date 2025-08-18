# Botarmy-POC to Bolt Mapping Report

## Part 1: Minimum Needed for POC
| botarmy-poc Component/Screen | Bolt Equivalent | Description | Gaps/Redundancies | Concerns | Improvements | Dependencies |
|-----------------------------|-----------------|-------------|-------------------|----------|--------------|--------------|
| `ModularApp.jsx` | `AppProvider` + `DashboardLayout.tsx` | Main app entry, wraps routes/layout. | No auth; `AppProvider` supports `SignInPage`. | Missing file; assumes routing. | Add `react-router-dom` routes; stub auth. | `react`, `react-router-dom`, `AppProvider`, `DashboardLayout.tsx` |
| `Header.jsx` | `DashboardHeader` | Top bar with branding, dark mode toggle. | Redundant with `DashboardHeader`. | Not provided; lacks TypeScript. | Convert to `.tsx`; use `DashboardHeader` slots. | `react`, `lucide-react`, Tailwind CSS, `DashboardHeader` |
| `Sidebar.jsx` | `DashboardSidebarSubNavigation` | Navigation with page links. | Redundant; `DashboardSidebarSubNavigation` more flexible. | Hardcoded nav; not provided. | Convert to `.tsx`; use `navigation` prop. | `react`, `lucide-react`, `react-router-dom`, `DashboardSidebarSubNavigation` |
| `Dashboard.jsx` | `PageContainer` + Custom Content | Agent stats and chat overview. | No analytics; needs custom content. | Mock data; not provided. | Convert to `.tsx`; fetch from `/bots`. | `react`, `useAgents`, `useChat`, `lucide-react`, `PageContainer` |
| `Tasks.jsx` | `PageContainer` + Custom Table | Task queue table view. | No real data; needs table component. | Mock data; not provided. | Convert to `.tsx`; fetch from `/tasks`. | `react`, `lucide-react`, `PageContainer` |
| `Logs.jsx` | `PageContainer` + Custom Log Viewer | JSONL logs display. | No filtering; needs log renderer. | Mock logs; not provided. | Convert to `.tsx`; add filtering via `useChat`. | `react`, `useChat`, `lucide-react`, `PageContainer` |
| `Button.tsx` | MUI `Button` | Reusable button for actions. | Redundant with MUI `Button`. | Unclear implementation. | Use MUI `Button` with Tailwind. | `react`, `@mui/material`, Tailwind CSS |
| `CommandPalette.tsx` | None | Shortcuts for quick actions. | No equivalent; unnecessary for POC. | Not used in `ModularApp.jsx`. | Drop for POC; add `react-hotkeys` later if needed. | None |
| `useAgents.js` | None (Custom Hook) | Manages agent state. | Mock data; no equivalent. | Not provided; lacks TypeScript. | Convert to `.ts`; fetch from `/bots`. | `react`, `useChat`, `axios` |
| `useChat.js` | None (Custom Hook) | Manages chat/logs. | Mock data; no equivalent. | Not provided; lacks TypeScript. | Convert to `.ts`; use WebSocket. | `react`, `axios` or WebSocket client |
| `useArtifacts.js` | None (Custom Hook) | Manages artifact state. | Mock data; not used in POC. | Not provided; lacks TypeScript. | Drop for POC; add `.ts` later. | None |

**Gaps**:
- Authentication missing; `AppProvider` supports `SignInPage`.
- Mock data in hooks; needs API integration.
- No `AnalyticsPage`; no Bolt chart equivalent.
- No assets (icons/logos).

**Redundancies**:
- `Header.jsx`, `Sidebar.jsx` overlap with `DashboardHeader`, `DashboardSidebarSubNavigation`.
- `Button.tsx` redundant with MUI `Button`.
- `CommandPalette.tsx` likely unnecessary.

**Concerns**:
- Missing files require stubbing.
- Mock data limits functionality.
- `.jsx` lacks type safety.
- Bolt.new deployment needs GitHub setup.

**Improvements**:
- Stub components/hooks.
- Use `DashboardLayout.tsx` with `PageContainer`.
- Mock APIs in `ApiService.ts`.
- Drop `CommandPalette.tsx`, `useArtifacts.js`.
- Use relative imports.
- Configure Vite/Tailwind.

**Dependencies**:
- External: `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@toolpad/core`, `lucide-react`, `axios`, Tailwind CSS.
- Internal: `ModularApp.jsx` → `Header.jsx`, `Sidebar.jsx`, pages, hooks; pages → hooks, `Button.tsx`.

**Effort**: 19-27 hours (~2-3 days).

## Part 2: Best Practices for Production System
**Enhancements**:
- **Type Safety**: Convert to `.tsx`; define interfaces in `src/utils/types.ts`.
- **State Management**: Use `zustand`, `react-query` for caching.
- **Performance**: Lazy load pages; memoize components; virtualize lists.
- **Accessibility**: Add ARIA labels; ensure keyboard nav; audit with Lighthouse.
- **Security**: Add JWT auth with `SignInPage`; sanitize APIs; use HTTPS.
- **UX**: Add toasts, skeletons, modals.
- **Testing**: Unit tests (`jest`, `react-testing-library`); E2E (`playwright`).
- **Deployment**: Use Bolt.new; integrate with GitHub.

**Concerns**:
- Backend sync: Avoid overload with caching.
- Scalability: Paginate/virtualize lists.
- Real-time: Ensure stable WebSocket.
- File case sensitivity in Git.

**Improvements**:
- Add `Analytics.jsx` with `recharts`.
- Use WebSocket in `useChat.ts`.
- Add error boundaries.
- Configure `tsconfig.json` for cleaner imports.
- Use `lucide-react` for icons.

**Dependencies**:
- Additions: `zustand`, `react-query`, `recharts`, `react-toastify`, `dompurify`, `react-virtuoso`, `playwright`.
- Relationships: Components → `zustand`, `react-query`; Tailwind → components; `react-router-dom` → routes.

**Effort**: 7-10 days.