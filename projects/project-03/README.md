# Project 03: Scope Control and Grounded Verification

Evaluate whether explicit scope control and verification gates improve delivery accuracy.

## Directory Guide

| Directory | Meaning |
|------|------|
| `starter/` | **Starting point**: based on the P2 solution, with document chunking, metadata extraction, index status, and basic QA still to implement. There is no "one feature at a time" strategy constraint. |
| `solution/` | **Reference implementation**: all features are implemented. AGENTS.md includes a "one feature at a time" strategy, and feature_list.json shows the fail-to-pass transition and verification evidence. |

## How to Use

```sh
cd starter
npm install
# Observe whether the agent implements multiple features at once (scope drift)

cd ../solution
npm install
# Rerun with scope control and compare feature delivery accuracy
```

## Features Covered

- Document chunking (paragraph-aware, about 500 characters)
- Metadata extraction (word count, line count, paragraph count)
- Index status displayed in the UI
- Basic QA flow with source citations

## Related Lectures

- [Lecture 05: Why Long-Running Tasks Lose Continuity](../../docs/en/lectures/lecture-05-why-long-running-tasks-lose-continuity/index.md)
- [Lecture 06: Why Initialization Needs Its Own Phase](../../docs/en/lectures/lecture-06-why-initialization-needs-its-own-phase/index.md)
