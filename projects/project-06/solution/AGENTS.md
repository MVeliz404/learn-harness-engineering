# AGENTS.md -- Project 06: Runtime Observability and Debugging (Capstone)

## Startup Rules

Before writing any code, complete these steps in order:

1. **Read this file completely.** It defines the boundaries, conventions, and architecture for this project.
2. **Read `docs/ARCHITECTURE.md`** to understand the full Electron layer structure and data flow.
3. **Read `docs/PRODUCT.md`** to understand the complete feature requirements.
4. **Read `feature_list.json`** to see the current state of all features.
5. **Run `bash init.sh`** to verify the project builds and initializes cleanly.

## Definition of Done

A feature is "done" when:

1. TypeScript compiles without errors (`npm run check`).
2. The app launches and the window is visible.
3. The feature appears in `feature_list.json` with status `"pass"` and evidence.
4. The code respects Electron layer boundaries.
5. Structured logging covers all service operations.
6. `docs/ARCHITECTURE.md` and/or `docs/PRODUCT.md` are updated.
7. `clean-state-checklist.md` passes all checks.

## Architecture (High-Level)

Electron app. 4 layers with strict boundaries:

```
Renderer (src/renderer/)       React 18, Vite. Talks only through window.knowledgeBase.*
  ↕ contextBridge
Preload (src/preload/)         Exposes: documents, indexing, qa, feedback, app
  ↕ ipcRenderer.invoke
Main (src/main/)               BrowserWindow + IPC handlers (14 channels)
  ↕ method calls
Services (src/services/)       Pure TS: DocumentService, IndexingService, QaService, PersistenceService, Logger
```

**Where to find things:**

| Need | Go to |
|------|-------|
| Types + IPC channel names | `src/shared/types.ts` |
| Full data flows + storage + logging | `docs/ARCHITECTURE.md` |
| Feature specs + UI layout | `docs/PRODUCT.md` |

## Conventions

- TypeScript strict mode. No `any` without a comment explaining why.
- Named exports only.
- IPC channels defined once in `src/shared/types.ts`.
- New IPC channels follow the pattern: `namespace:action`.
- All service methods must log at INFO level for significant events.
- DEBUG level for routine data access.
- WARN for missing but non-critical data.
- ERROR for failures.

## Clean State

Before each major testing cycle:

1. Run `bash scripts/cleanup-scanner.sh` to check for stale artifacts.
2. Use the in-app Reset button or `RESET_DATA` IPC to clear all data.
3. Verify `clean-state-checklist.md` passes.
4. Run `bash scripts/benchmark.sh` to measure performance.

## Session Handoff

When resuming work, read `session-handoff.md` for context from the previous session. When finishing a session, update it with:

- What was accomplished
- What remains
- Any blockers or decisions made
- Files that were modified
- Benchmark results if applicable