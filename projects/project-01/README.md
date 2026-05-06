# Project 01: Baseline vs Minimal Harness

Compare how a weak harness (prompt only) and an explicit harness (rule files plus verification mechanisms) affect the completion rate of AI coding-agent tasks.

## Directory Guide

| Directory | Meaning |
|------|------|
| `starter/` | **Starting point**: only a vague `task-prompt.md`, with no AGENTS.md and no feature_list.json. This is the "weak harness" version you give to the agent. |
| `solution/` | **Reference implementation**: the same application code, but with complete harness files (AGENTS.md, feature_list.json, init.sh, claude-progress.md). This is the "explicit harness" version. |

## How to Use

```sh
# 1. Run the agent task once with starter (weak harness)
cd starter
npm install
# Give the contents of task-prompt.md as the prompt to Claude Code / Codex
# Ask the agent to complete: window startup, document list, QA panel, data directory

# 2. Run the same task with solution (explicit harness)
cd ../solution
npm install
# Ask the agent to read AGENTS.md and follow the rules for the same task

# 3. Compare the two results
# - Was the task completed?
# - How many retries were needed?
# - Did the agent claim "done" too early?
```

## Features Covered

- Electron window starts successfully
- UI shows the document-list area
- UI shows the QA panel
- App creates and uses a local data directory

## Related Lectures

- [Lecture 01: Why Capable Agents Still Fail](../../docs/en/lectures/lecture-01-why-capable-agents-still-fail/index.md)
- [Lecture 02: What a Harness Actually Is](../../docs/en/lectures/lecture-02-what-a-harness-actually-is/index.md)
