# Project 04: Runtime Observability and Structural Control

Introduce runtime observability and structural boundary checks while debugging a seeded runtime defect.

## Directory Guide

| Directory | Meaning |
|------|------|
| `starter/` | **Starting point**: based on the P3 solution, with logging and structural boundary features still to implement. `IndexingService` contains a hidden seeded bug: files longer than 1000 characters produce empty chunks. There is no architecture-check script. |
| `solution/` | **Reference implementation**: structured logging module, architecture boundary-check script, and the seeded bug fixed. |

## How to Use

```sh
cd starter
npm install
# 1. Observe whether the agent can locate the bug through logs
# 2. Import a large file and check whether chunking behaves incorrectly

cd ../solution
npm install
# Compare how structured logs speed up diagnosis
```

## Features Covered

- Startup logs
- Import and indexing logs
- Visible QA failure path
- Explicit boundaries between main, preload, renderer, and services layers
- Debugging a seeded runtime defect

## Related Lectures

- [Lecture 07: Why Agents Overreach and Under-Finish](../../docs/en/lectures/lecture-07-why-agents-overreach-and-under-finish/index.md)
- [Lecture 08: Why Feature Lists Are Harness Primitives](../../docs/en/lectures/lecture-08-why-feature-lists-are-harness-primitives/index.md)
