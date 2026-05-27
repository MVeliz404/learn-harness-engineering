# 繁體中文資源庫

這個資料夾把課程裡的方法整理成可以直接參考和複用的材料，不是再講一遍概念，而是盡量回答兩個問題：

- 我現在應該先抄哪些檔案
- 這些檔案分別解決什麼問題

## 適合什麼時候用

當你準備讓 Codex、Claude Code 或其他 coding agent 在一個儲存庫裡持續工作時，就可以從這裡開始。它特別適合這些場景：

- 多輪工作階段開發，擔心脈絡斷裂
- 功能多，容易出現做一半就停的半成品
- 常常提前宣布完成，但實際沒測透
- 每次開工都要重新摸索啟動方式

## 從這裡開始

如果你想先搭一個最小可用版本，優先看這些檔案：

- 根指令檔案：[`templates/AGENTS.md`](./templates/AGENTS.md) 或 [`templates/CLAUDE.md`](./templates/CLAUDE.md)
- 功能狀態檔案：[`templates/feature_list.json`](./templates/feature_list.json)
- 進度日誌：[`templates/claude-progress.md`](./templates/claude-progress.md)
- 啟動腳本參考：`docs/zh-TW/resources/templates/init.sh`

然後按需要補上：

- 工作階段交接範本：[`templates/session-handoff.md`](./templates/session-handoff.md)
- 收尾檢查清單：[`templates/clean-state-checklist.md`](./templates/clean-state-checklist.md)
- 評審範本：[`templates/evaluator-rubric.md`](./templates/evaluator-rubric.md)

如果你想直接採用 OpenAI 那篇 harness engineering 文章裡更完整的儲存庫組織方式，可以繼續看：

- [`openai-advanced/index.md`](./openai-advanced/index.md)

## 資源庫結構

- [`templates/`](./templates/index.md)：可以直接複製到真實儲存庫裡的範本
- [`reference/`](./reference/index.md)：方法說明、啟動流程和問題對照表
- [`openai-advanced/`](./openai-advanced/index.md)：更完整的 OpenAI 風格高階資源包，包括儲存庫骨架、品質檔案、執行計畫和系統級治理檔案

## 推薦最小組合

- `AGENTS.md` 或 `CLAUDE.md`
- `feature_list.json`
- `claude-progress.md`
- `init.sh`

先把這四樣放進專案裡，再開始讓 agent 持續工作，通常就已經能明顯降低返工和瞎猜。

如果你的儲存庫已經進入多模組、多階段、多角色協作，可以直接升級到
[`openai-advanced/`](./openai-advanced/index.md) 這一套高階結構，而不是繼續把最小範本硬撐成一個大而亂的系統。
