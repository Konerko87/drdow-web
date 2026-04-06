# Dr.Dow AI — 待辦設定（請依序完成後把值回報）

## 1. Google Analytics 4（追蹤訪客數據）

1. 打開 https://analytics.google.com
2. 左下角「管理」→「建立」→「資源」
3. 資源名稱輸入：`Dr.Dow AI`
4. 時區選台灣、幣別選 TWD
5. 下一步 → 產業選「商業服務」→ 公司規模選最小
6. 建立「資料串流」→ 選「網站」
7. 網站網址輸入：`drdowai.com`
8. 串流名稱輸入：`Dr.Dow AI Website`
9. 建立後會顯示 **評估 ID**，格式像 `G-XXXXXXXXXX`
10. **把這個 G- 開頭的 ID 記下來**

## 2. Google Search Console（讓 Google 收錄網站）

1. 打開 https://search.google.com/search-console
2. 點「新增資源」
3. 選右邊的「URL 前置字元」
4. 輸入：`https://drdowai.com`
5. 按繼續
6. 驗證方式選「HTML 標記」
7. 會顯示一段 `<meta name="google-site-verification" content="XXXXXXXX" />`
8. **把 content="" 裡面的值記下來**（先不要按驗證）

## 3. Resend（留言表單寄信用）

1. 打開 https://resend.com
2. 用 GitHub 帳號 Sign up（最快）
3. 登入後，左側選「API Keys」
4. 點「Create API Key」
5. Name 輸入：`drdow-web`
6. Permission 選 `Sending access`
7. Domain 選 `All domains`
8. 點 Create
9. **把產生的 re_ 開頭的 API Key 記下來**（只會顯示一次）

---

## 完成後

把以下三個值交給 Kevin：

```
GA4 評估 ID：G-__________
Search Console 驗證碼：__________
Resend API Key：re___________
```

Kevin 會把這些設定到 Railway 環境變數裡。
