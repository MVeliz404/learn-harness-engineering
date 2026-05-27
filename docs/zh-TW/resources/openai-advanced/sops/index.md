# OpenAI 高級 SOP

這些 SOP 把文章裡的工作方式翻成可以直接參考、執行、改造的操作手冊。

## 包含哪些 SOP

- [`layered-domain-architecture.md`](./layered-domain-architecture.md)：
  搭建顯式分層與跨領域邊界
- [`encode-knowledge-into-repo.md`](./encode-knowledge-into-repo.md)：
  把聊天、外部文件、腦內知識變成 repo-local 文件
- [`observability-feedback-loop.md`](./observability-feedback-loop.md)：
  給 agent 提供 logs、metrics、traces 與可重複的除錯閉環
- [`chrome-devtools-validation-loop.md`](./chrome-devtools-validation-loop.md)：
  用瀏覽器自動化和快照反覆驗證 UI，直到 clean

## 怎麼用

1. 先選和你目前瓶頸最相符的 SOP。
2. 按檢查清單補齊缺失工件或工具。
3. 把得到的規則編碼回 `repo-template/` 裡的文件。
4. 把反覆出現的 review 評論升級成檢查、腳本或 guardrail。

這些 SOP 不是讓你機械照抄，而是為了讓 harness 更可讀、更可執行、更可複用。
