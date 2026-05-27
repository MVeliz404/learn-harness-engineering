# SOP：可觀測性回饋閉環

當除錯太慢、agent 總在沒證據的情況下宣佈成功、或者執行時期行為比程式碼本身還難看懂時，就用這份 SOP。

## 目標

給 agent 一套本地閉環，讓它可以基於 logs、metrics、traces 和可重複 workload 來判斷系統，而不是隻靠看程式碼猜。

## 最小可用棧

- 應用輸出結構化日誌
- 條件允許時輸出 metrics 和 traces
- 本地採集或 fan-out 層
- 可查詢 logs / metrics / traces 的接口
- 每次改動後都能重跑的 workload 或 user journey

## 執行 SOP

1. 先定義最重要的黃金執行旅程。
2. 給啟動流程和關鍵路徑補結構化日誌。
3. 在合適位置補 latency、failure count、queue depth 之類的 metrics。
4. 為慢路徑或多階段流程補 traces 或 timing 標記。
5. 讓這些信號能從本地開發環境查詢到。
6. 給 agent 一條可以反覆重跑的 workload 或場景。
7. 強制執行這條閉環：query -> correlate -> reason -> implement -> restart
   -> rerun -> verify。

## 除錯工作階段檢查清單

- 到底哪裡失敗了？
- 哪條信號能證明它失敗？
- 失敗歸屬哪一層？
- 修復後哪條信號發生了變化？
- App 是否能幹淨重啟？
- 同一 workload 重跑後是否通過？

## 完成定義

- agent 能用執行證據解釋失敗模式。
- 每次改動後都能重跑同一 workload。
- restart 與 rerun 已經成為正常任務循環的一部分。
- 可靠性信號已經記錄到 `docs/RELIABILITY.md`。
