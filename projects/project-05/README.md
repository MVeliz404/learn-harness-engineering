# Project 05: Evaluator Loops and Three-Role Upgrades

Measure how role separation (single role, generator plus evaluator, planner plus generator plus evaluator) changes implementation quality.

## Directory Guide

| Directory | Meaning |
|------|------|
| `starter/` | **Starting point**: based on the P4 solution, with multi-turn QA history still to implement. |
| `solution/single-role/` | **Variant A**: one agent does all work (planning, implementation, and self-review). Baseline quality. |
| `solution/gen-eval/` | **Variant B**: generator plus evaluator pattern. Higher quality, with revision evidence. |
| `solution/plan-gen-eval/` | **Variant C**: planner plus generator plus evaluator. Highest quality, with a sprint contract and scoring criteria. |

## How to Use

```sh
# Run each of the three variants independently
cd solution/single-role && npm install  # single-role mode
cd solution/gen-eval && npm install     # generator plus evaluator mode
cd solution/plan-gen-eval && npm install # full three-role mode

# Compare the three variants:
# - Code quality (evaluator-rubric.md score)
# - Number of defects found
# - Amount of rework required
```

## Features Covered

- Multi-turn QA history (conversational UI)
- Sprint contract
- Evaluator rubric tuning

## Related Lectures

- [Lecture 09: Why Agents Declare Victory Too Early](../../docs/en/lectures/lecture-09-why-agents-declare-victory-too-early/index.md)
- [Lecture 10: Why End-to-End Testing Changes Results](../../docs/en/lectures/lecture-10-why-end-to-end-testing-changes-results/index.md)
