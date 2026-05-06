# Project 02: Agent-Readable Workspace

Demonstrate how repository readability and explicit continuity artifacts reduce context loss during multi-session development.

## Directory Guide

| Directory | Meaning |
|------|------|
| `starter/` | **Starting point**: based on the P1 solution, with document import, detail view, and persistence still to implement. The harness is weak: AGENTS.md is minimal and there is no session handoff. |
| `solution/` | **Reference implementation**: all new features are implemented, with complete workspace documentation (ARCHITECTURE.md, PRODUCT.md, session-handoff.md). |

## How to Use

```sh
# Requires at least 2 agent sessions to complete
cd starter
npm install
# Session A: implement document import and the detail view
# Session B: implement persistence (observe whether the agent quickly regains context)

cd ../solution
npm install
# Rerun with the complete harness and compare session recovery speed
```

## Features Covered

- Document import flow (file picker plus IPC transfer)
- Document detail view (metadata plus content display)
- Basic persistence (imported documents remain after restart)

## Related Lectures

- [Lecture 03: Why the Repository Must Become the System of Record](../../docs/en/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/index.md)
- [Lecture 04: Why One Giant Instruction File Fails](../../docs/en/lectures/lecture-04-why-one-giant-instruction-file-fails/index.md)
