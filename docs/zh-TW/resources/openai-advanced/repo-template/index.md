# 高級儲存庫範本

當你希望把儲存庫升級成更接近 OpenAI 文中那種 agent-first 文件面，而不只是一個最小 harness 時，就複製這套起步範本。

## 推薦複製順序

1. 先把 `AGENTS.md` 和 `ARCHITECTURE.md` 放到儲存庫根目錄。
2. 再複製整個 `docs/` 目錄樹。
3. 優先把 `docs/PRODUCT_SENSE.md`、`docs/QUALITY_SCORE.md`、
   `docs/RELIABILITY.md` 填起來。
4. 在 `docs/exec-plans/active/` 下建立你的第一份 active plan。
5. 始終保持入口檔案很短，詳細規則拆到連結文件裡。

## 這套範本主要最佳化什麼

- 持久、repo-local 的脈絡
- 漸進披露，而不是一個超長 instruction 檔案
- 明確的計畫生命週期
- 隨時間演化的品質追蹤
- 對 agent 和人都更可讀的邊界

這裡的每個檔案都只是起點。真正投入使用前，把佔位文字、示例命令和樣例規則替換成你自己的專案現實。
