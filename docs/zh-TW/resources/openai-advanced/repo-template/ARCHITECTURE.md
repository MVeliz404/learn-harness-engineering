# ARCHITECTURE.md

這份檔案是系統的頂層地圖。它應該保持簡短，只提供最關鍵的結構資訊，並把更深的內容指向其他文件。

## 系統形態

- 產品：`[替換成產品名稱]`
- 主使用者流程：`[替換成核心流程]`
- 執行面：`[desktop / web / cli / services / workers]`
- 產品行為真相來源：`docs/product-specs/`

## 領域地圖

| 領域 | 負責什麼 | 主要入口 | 對應規格 |
|------|---------|---------|---------|
| `[domain-a]` | `[職責]` | `[模組 / 路由 / 命令]` | `[spec path]` |
| `[domain-b]` | `[職責]` | `[模組 / 路由 / 命令]` | `[spec path]` |

## 分層模型

用固定方向的分層模型，避免 agent 臨場發明架構：

`Types -> Config -> Repo -> Service -> Runtime -> UI`

跨領域關注點應該透過明確的 provider 或 adapter 邊界進入，而不是直接跨層穿透。

## 硬性依賴規則

- 低層不能依賴高層。
- UI 不能繞過 runtime 或 service 契約。
- 資料存取必須透過 repo 或等價 adapter 進行。
- 共享 util 必須保持通用，不能慢慢堆成領域邏輯垃圾桶。
- 新依賴要在對應 plan 或 design doc 裡說明理由。

## 橫切接口

| 關注點 | 允許的邊界 | 備註 |
|-------|-----------|------|
| 日誌與 tracing | `[provider / utility path]` | `[只允許結構化日誌，不允許臨時 console]` |
| Auth | `[provider path]` | `[token/session 規則]` |
| 外部 API | `[client 或 provider path]` | `[限流 / 重試原則]` |
| Feature flags | `[flag boundary]` | `[歸屬]` |

## 目前熱點

- `[最難安全修改的區域]`
- `[邊界最弱或測試最脆的區域]`

## 變更檢查

當你修改了會影響架構的程式碼：

1. 如果領域地圖或允許邊界變了，就更新這份檔案。
2. 如果背後的設計理由變了，就更新 `docs/design-docs/` 裡的相關文件。
3. 如果規則應該機械執行，就補一個可執行檢查。
