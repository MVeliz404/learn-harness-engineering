# SOP：分層領域架構

當 agent 反覆跨層亂連、在不同層重複邏輯、或者幾輪工作階段後程式碼越來越難審時，就用這份 SOP。

## 目標

把領域邊界寫清楚、立起來、能執行，讓 agent 在高速度下也不至於悄悄把結構做爛。

## 目標模型

在一個業務領域內部，優先使用這條單向流：

`Types -> Config -> Repo -> Service -> Runtime -> UI`

跨領域關注點透過明確的 provider 或 adapter 進入。共享 utils 保持在領域之外，不能慢慢長成業務邏輯垃圾場。

## 建設檢查清單

- 在 `ARCHITECTURE.md` 裡列清目前 domains。
- 在 `ARCHITECTURE.md` 裡寫清允許的依賴方向。
- 記錄 auth、telemetry、外部 API 等 cross-cutting interface。
- 為目前最難處理的邊界違規寫一條短說明。
- 決定哪些規則應該升級成 lint、test 或 script。

## 執行 SOP

1. 先給程式碼庫畫 domain map，再談實現風格。
2. 對每個 domain，明確允許的 layer sequence。
3. 找出所有橫切關注點，並把它們改走 provider 或 adapter。
4. 把含糊的 shared logic 重新放回所屬 domain，或抽成真正通用的 utils。
5. 把規則寫進 `ARCHITECTURE.md`。
6. 先為代價最高的一類違規補一個可執行 guardrail。
7. 改完後更新品質評分。

## 完成定義

- 一個全新的 agent 能判斷某個改動應該落在哪一層。
- UI 不再直接連 repo 或外部副作用。
- 橫切能力都有明確入口。
- 至少一條重要邊界已經被機械執行。

## 需要同步更新的儲存庫工件

- `ARCHITECTURE.md`
- `docs/QUALITY_SCORE.md`
- 如果設計理由變了，更新 `docs/design-docs/`
- `docs/PLANS.md` 或目前 active execution plan
