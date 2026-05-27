# 中文參考

這一部分解釋這些範本該怎麼配合使用，而不是把它們當成一堆孤立檔案。

## 內部參考材料

- [`method-map.md`](./method-map.md)：把常見長時任務翻車點映射到對應方法和工件
- [`initializer-agent-playbook.md`](./initializer-agent-playbook.md)：初始化代理在第一輪應該產出什麼
- [`coding-agent-startup-flow.md`](./coding-agent-startup-flow.md)：後續編碼代理每次開工的固定流程
- [`prompt-calibration.md`](./prompt-calibration.md)：根指令應該寫到什麼程度才合適

## 重點參考文章

這裡的篩選標準很窄：只保留能直接解釋 harness 機制的文章。Harness 在這裡指模型外部的執行系統，包括 agent loop、工具執行、沙箱、狀態、脈絡、驗證、終止條件、控制平面和觀測回饋；不是泛泛的 prompt engineering 或 agent 框架介紹。

保留原始三篇作為課程主軸：

- [OpenAI: Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)（2026-02-11）：agent-first 儲存庫、repo-local context、custom lint、結構性 guardrail。
- [Anthropic: Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)（2025-11-26）：initializer agent、coding agent、feature list、progress log、跨脈絡窗口交接。
- [Anthropic: Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)（2026-03-24）：planner / generator / evaluator 三角色、context reset、harness 簡化和元件過期問題。

額外只加入幾篇高相關、高價值的 2026 文章：

- [OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)（2026-01-23）：解釋 Codex runtime harness 的核心循環、工具呼叫、脈絡增長和終止狀態。
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)（2026-01-09）：明確評估 agent 時評的是 model + harness，並區分 evaluation harness 與 agent harness。
- [LangChain: Improving Deep Agents with harness engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)（2026-02-17）：同一模型不變，只改 system prompt、tools、middleware、tracing 和 self-verification，讓 coding agent 在 Terminal Bench 2.0 上從 Top 30 進到 Top 5。
- [Thoughtworks / Martin Fowler: Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html)（2026-04-02）：把 coding-agent user harness 拆成 feedforward guides 和 feedback sensors，並區分 deterministic controls 與 inferential controls。
- [Cursor: Continually improving our agent harness](https://cursor.com/blog/continually-improving-agent-harness)（2026-04-30）：把 harness 當成持續迭代的產品系統，用離線評估、線上指標、工具錯誤分類、模型定製和 mid-chat model switching 改善 agent 行為。

## 2026 擴展參考

這些文章不作為課程主軸，但在設計特定 harness 模組時很有借鑑價值。只保留文章正文直接涉及 agent loop、工具執行、脈絡管理、驗證、沙箱、控制層、迴歸治理等機制的材料；純 agent 產品、平臺發佈、團隊實踐或 benchmark 不放進這裡。

- [OpenAI: Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness/)（2026-02-04）：把 harness 抽象成 App Server 協定，覆蓋 thread lifecycle、resume、fork、diff 和客戶端整合。
- [OpenAI Developers: Run long horizon tasks with Codex](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)（2026-02-23）：長時任務中的 durable project memory、milestone validation 和 done-when 例子。
- [OpenAI: The next evolution of the Agents SDK](https://openai.com/index/the-next-evolution-of-the-agents-sdk/)（2026-04-15）：model-native harness、sandbox execution、檔案與命令執行能力。
- [OpenAI: An open-source spec for Codex orchestration: Symphony](https://openai.com/index/open-source-codex-orchestration-symphony/)（2026-04-27）：把 issue tracker / Linear 變成多 agent 控制平面。
- [Anthropic: Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler)（2026-02-05）：並行 agent 團隊、任務鎖、git 同步、容器隔離和自主循環。
- [Anthropic: Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)（2026-04-08）：meta-harness 視角，把 session、harness、sandbox 拆成可替換接口。
- [Anthropic: An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)（2026-04-23）：reasoning effort、context pruning、system prompt 都屬於 harness 變更，且需要回歸治理。
- [LangChain: Context Management for Deep Agents](https://www.langchain.com/blog/context-management-for-deepagents)（2026-01-28）：filesystem offloading、tool-call truncation、summarization 和 targeted evals 組成的 context-management harness。
- [LangChain: Tuning Deep Agents to Work Well with Different Models](https://www.langchain.com/blog/tuning-deep-agents-different-models)（2026-04-29）：用 model-specific harness profiles 調整 prompt、tool names、middleware 和 subagent 配置。
- [LangChain: Continual learning for AI agents](https://www.langchain.com/blog/continual-learning-for-ai-agents)（2026-04-05）：把 agent 改進拆成 model、harness、context 三層，並把 traces 作為改進信號。
- [Microsoft: Agent Harness in Agent Framework](https://devblogs.microsoft.com/agent-framework/agent-harness-in-agent-framework/)（2026-03-12）：shell/filesystem harness、approval flow、hosted shell、context compaction。
- [Google: Announcing ADK for Java 1.0.0](https://developers.googleblog.com/announcing-adk-for-java-100-building-the-future-of-ai-agents-in-java/)（2026-03-30）：插件、event compaction、HITL、session/memory service、A2A 等可複用 harness primitives。
- [GitHub: Automate repository tasks with GitHub Agentic Workflows](https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/)（2026-02-13）：把 GitHub Actions 變成 agentic workflow runner，包含 safe outputs、sandboxing、permissions、review。
- [AWS: AI agents in enterprises: Best practices with Amazon Bedrock AgentCore](https://aws.amazon.com/blogs/machine-learning/ai-agents-in-enterprises-best-practices-with-amazon-bedrock-agentcore/)（2026-02-03）：Runtime、Memory、Gateway、Identity/Policy、Observability、Evaluations 的企業級 harness 分層。
- [Stripe: Minions: Stripe's one-shot, end-to-end coding agents](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)（2026-02-09）和 [Part 2](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2)（2026-02-19）：devbox 隔離、custom agent harness、blueprints 狀態機、規則檔案、MCP tool curation、安全控制、pre-push/CI 回饋循環。
- [Cognition: What We Learned Building Cloud Agents](https://cognition.ai/blog/what-we-learned-building-cloud-agents)（2026-04-23）：雲端 agent runtime 的 VM 隔離、session snapshot/resume、orchestration、governance、audit logging 和 integrations。
- [Cognition: Multi-Agents: What's Actually Working](https://cognition.ai/blog/multi-agents-working)（2026-04-22）：generator-verifier loop、clean-context reviewer、smart-friend routing、manager-child coordination 和跨 agent 通信邊界。
- [Replit: Decision-Time Guidance: Keeping Replit Agent Reliable](https://blog.replit.com/decision-time-guidance)（2026-01-20，2026-01-23 更新）：用輕量分類器在關鍵決策點注入短指令，而不是把所有規則塞進系統提示詞。
- [Vercel: How we made v0 an effective coding agent](https://vercel.com/blog/how-we-made-v0-an-effective-coding-agent)（2026-01-07）：動態系統提示、streaming rewrite layer 和 deterministic/model-driven autofixers。
- [Vercel: Introducing deepsec](https://vercel.com/blog/introducing-deepsec-find-and-fix-vulnerabilities-in-your-code-base)（2026-05-04）：面向安全掃描的 coding-agent harness，包含 scan、investigate、revalidate、enrich、export、plugin 和 refusal-checker。
- [Sourcegraph: CodeScaleBench](https://sourcegraph.com/blog/codescalebench-testing-coding-agents-on-large-codebases-and-multi-repo-software-engineering-tasks)（2026-03-03）：偏 eval/tooling harness，包含 MCP tool adoption、tool-use transcripts、benchmark QA、verifier/reproducibility gates 和 prompt/preamble 迭代。

嚴格按時間篩選時，2025-only 的泛參考不進入主列表。原始三篇中的 Anthropic 2025 文章保留，是因為它是本課程方法的基礎來源。

## 推薦閱讀順序

1. `method-map.md`
2. `initializer-agent-playbook.md`
3. `coding-agent-startup-flow.md`
4. `prompt-calibration.md`
5. OpenAI Harness engineering
6. Anthropic Effective harnesses
7. Anthropic Harness design for long-running application development
8. OpenAI Codex agent loop
9. Anthropic agent evals
10. LangChain Improving Deep Agents
11. Thoughtworks / Martin Fowler Harness engineering for coding agent users
12. Cursor Continually improving our agent harness
