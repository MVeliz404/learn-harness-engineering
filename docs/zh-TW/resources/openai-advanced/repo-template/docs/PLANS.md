# PLANS.md

這份檔案定義執行計畫如何建立、更新、完成和歸檔。

## 什麼時候必須有 plan

當工作滿足以下任一條件時，就建立 execution plan：

- 會跨越多個工作階段
- 會同時影響多個子系統
- 驗證或上線風險不小
- 存在需要顯式記錄的開放決策

## 計畫放哪

- `docs/exec-plans/active/`：目前正在驅動工作的計畫
- `docs/exec-plans/completed/`：已完成但仍然要保留脈絡的計畫
- `docs/exec-plans/tech-debt-tracker.md`：延期處理的債務與 follow-up

## 最少要包含的部分

- 目標
- 範圍與明確不做什麼
- 驗證路徑
- 風險與 blocker
- 進度日誌
- 開放決策

## 執行規則

- 一份 active plan 同一時間應該只有一個清晰的目前步驟。
- plan 要隨著工作推進而更新，不要把它當成靜態散文。
- 只要某個決策改變了實現方向，就記到 plan 裡。
- 已完成的計畫要移到 `completed/`，讓後續 agent 仍然能發現歷史脈絡。
