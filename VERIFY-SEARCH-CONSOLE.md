# Google Search Console 驗證 + 提交 Sitemap

## Step 1：完成驗證

1. 打開 https://search.google.com/search-console
2. 找到 `https://drdowai.com` 資源
3. 點「驗證」按鈕
4. 應該會顯示「已驗證擁有權」（因為 meta tag 已經部署上去了）

## Step 2：提交 Sitemap

1. 驗證成功後，左側選「Sitemap」
2. 在「新增 Sitemap」欄位輸入：`sitemap.xml`
3. 點「提交」
4. 狀態應該顯示「成功」，會列出 10 個網址

## Step 3：要求建立索引（加速收錄）

1. 左側選「網址審查」
2. 在上方搜尋欄輸入：`https://drdowai.com`
3. 點「要求建立索引」
4. 再輸入：`https://drdowai.com/products/tms`，點「要求建立索引」
5. 再輸入：`https://drdowai.com/products/erp`，點「要求建立索引」
6. 再輸入：`https://drdowai.com/faq`，點「要求建立索引」

這樣 Google 會優先爬這 4 個最重要的頁面。

## 完成確認

- [ ] Search Console 驗證成功
- [ ] Sitemap 提交成功（10 個 URL）
- [ ] 至少 4 個頁面已要求建立索引
