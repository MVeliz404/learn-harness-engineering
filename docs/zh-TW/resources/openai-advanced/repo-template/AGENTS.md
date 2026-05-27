# AGENTS.md

這個儲存庫面向長時執行的 coding-agent 工作流。保持這個檔案簡短，把它當成“唯一事實來源”文件的入口和路由層，而不是一個不斷膨脹的大說明書。

## 開工流程

改程式碼前先做這些事：

1. 用 `pwd` 確認儲存庫根目錄。
2. 讀取 `ARCHITECTURE.md`，理解目前系統地圖和硬性依賴規則。
3. 讀取 `docs/QUALITY_SCORE.md`，先知道最弱的產品領域和架構層。
4. 讀取 `docs/PLANS.md`，再打開目前要執行的 active plan。
5. 讀取相關的 `docs/product-specs/` 規格文件。
6. 跑這個儲存庫約定的 bootstrap 與驗證路徑。
7. 如果基礎驗證先失敗，先修 baseline，再加新範圍。

## 路由地圖

- `ARCHITECTURE.md`：領域地圖、分層模型、依賴規則
- `docs/design-docs/index.md`：設計決策與核心信念
- `docs/product-specs/index.md`：目前產品行為與驗收目標
- `docs/PLANS.md`：計畫生命週期與執行計畫規則
- `docs/QUALITY_SCORE.md`：產品領域與架構層健康度
- `docs/RELIABILITY.md`：執行信號、benchmark、重啟要求
- `docs/SECURITY.md`：密鑰、沙箱、資料和外部動作規則
- `docs/FRONTEND.md`：UI 約束、設計系統規則、無障礙檢查

## 工作約定

- 一次只圍繞一個有邊界的計畫或功能切片工作。
- 不能只靠讀程式碼就宣佈完成，必須有可執行證據。
- 只要改了行為，就同步更新對應的產品、計畫或可靠性文件。
- 如果某類 review feedback 反覆出現，把它升級成機械規則、檢查或 linter，不要一直在聊天裡重複解釋。
- 生成物放進 `docs/generated/`，外部 reference 放進 `docs/references/`。
- 需要更多細節時，優先補小而新的文件，而不是繼續把這個檔案寫長。

## 完成定義

一個改動只有在以下條件都滿足時才算完成：

- 目標行為已實現
- 要求的驗證真的跑過
- 證據已經掛到相關 plan 或品質文件裡
- 受影響的文件仍然是最新的
- 儲存庫能按標準啟動路徑乾淨重啟

## 收尾

結束工作階段前：

1. 更新目前 active execution plan。
2. 如果產品領域或架構層有明顯變化，更新 `docs/QUALITY_SCORE.md`。
3. 如果有延期處理的債務，記到 `docs/exec-plans/tech-debt-tracker.md`。
4. 已完成的計畫及時移到 `docs/exec-plans/completed/`。
5. 保證儲存庫可重啟，並留下清晰的下一步動作。
