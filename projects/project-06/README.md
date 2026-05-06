# Project 06: Runtime Observability and Debugging (Capstone)

Capstone project: build and benchmark a complete harness, then run cleanup loops to verify quality and maintainability.

## Directory Guide

| Directory | Meaning |
|------|------|
| `starter/` | **Starting point**: complete product code, but the harness is intentionally weakened (only basic AGENTS.md, with no feature_list.json, session handoff, or clean-state checklist). |
| `solution/` | **Reference implementation**: maximum harness, with all artifact files present, high quality-document scores, benchmark scripts, and cleanup scanners. |

## How to Use

```sh
cd starter
npm install
# Run the benchmark suite with the weak harness and record the results

cd ../solution
npm install
# Run the same benchmark with the complete harness
# Execute cleanup loops
# Compare score changes in quality-document.md

# Run benchmark tests
./scripts/benchmark.sh

# Run cleanup scan
./scripts/cleanup-scanner.sh
```

## Features Covered

- Import documents
- Build or refresh the index
- Answer questions with citations
- Runtime feedback
- Readable, restartable repository state

## Related Lectures

- [Lecture 11: Why Observability Belongs Inside the Harness](../../docs/en/lectures/lecture-11-why-observability-belongs-inside-the-harness/index.md)
- [Lecture 12: Why Every Session Must Leave a Clean State](../../docs/en/lectures/lecture-12-why-every-session-must-leave-a-clean-state/index.md)
