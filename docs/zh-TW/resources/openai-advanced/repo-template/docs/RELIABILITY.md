# RELIABILITY.md

這份檔案定義系統如何證明自己健康、可診斷、可重啟。

## 標準路徑

- Bootstrap：`[command]`
- Verification：`[command]`
- 啟動應用或服務：`[command]`
- 除錯或查看執行態：`[command]`

## 必需執行信號

- 啟動與關鍵流程的結構化日誌
- 關鍵服務的 health check
- 條件允許時為慢路徑提供 trace 或 timing 資料
- 對可恢復失敗提供使用者可見的錯誤狀態

## 黃金旅程

- `[journey 1]`
- `[journey 2]`
- `[journey 3]`

每條黃金旅程都應該有可重複的驗證路徑和清晰的失敗信號。

## 可靠性規則

- 只要系統不能幹淨重啟，功能就不能算完成。
- 執行失敗必須能從 repo-local 信號裡定位。
- 某類失敗模式一旦反覆出現，就給它補 benchmark 或 guardrail。
- cleanup 屬於可靠性的一部分，不是另外一件事。
