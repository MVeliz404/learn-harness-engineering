# SOP：Chrome DevTools 驗證閉環

當 UI 改動必須經過真實互動、截圖、DOM 狀態和 console 輸出來判斷，而不是隻靠讀程式碼時，就用這份 SOP。

## 目標

把 UI 驗證變成 agent 可以反覆執行的互動閉環，直到這條使用者旅程變乾淨。

## 核心閉環

1. 選定目標頁面或 app 實例。
2. 清掉舊的 console 噪聲。
3. 記錄 BEFORE 狀態。
4. 觸發 UI 路徑。
5. 觀察互動過程中的 runtime events。
6. 記錄 AFTER 狀態。
7. 修復問題，必要時重啟 app。
8. 反覆重跑驗證，直到這條旅程 clean。

## 必需輸入

- 穩定的啟動命令
- 可重複的 UI journey
- 能抓 DOM、console 或截圖的方式
- 明確“什麼算 clean”的規則

## 執行 SOP

1. 把目標旅程寫進 active plan。
2. 用可觀察行為定義成功：文字出現、按鈕可點、錯誤消失、console 乾淨、請求成功。
3. 互動前先拍初始狀態。
4. 一次只觸發一條路徑。
5. 記錄 runtime event、DOM 變化和可見輸出。
6. 如果失敗，只修最小負責層，然後重啟。
7. 重跑同一路徑，對比 BEFORE/AFTER 證據。

## Clean 標準

- 目標可見狀態已經出現
- 沒有意外錯誤
- console 噪聲已理解或清理
- 重跑同一路徑結果一致

## 需要同步更新的儲存庫工件

- 目前 active execution plan
- 如果它變成黃金旅程，更新 `docs/RELIABILITY.md`
- 如果可見行為改變了，更新 product spec
