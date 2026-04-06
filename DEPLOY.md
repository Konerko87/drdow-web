# Dr.Dow AI 網站部署 — Cloudflare DNS 設定

## 任務：在 Cloudflare 加兩筆 DNS 記錄

### 步驟

1. 登入 https://dash.cloudflare.com
2. 點選 `drdowai.com` 域名
3. 左側選 **DNS** → **Records**
4. 如果有預設記錄先刪掉
5. 點 **Add Record** 加以下兩筆：

### 記錄一：CNAME

| 欄位 | 值 |
|------|-----|
| Type | **CNAME** |
| Name | `@` |
| Target | `viifql4n.up.railway.app` |
| Proxy status | **DNS only**（點橘色雲朵變成灰色雲朵） |

### 記錄二：TXT 驗證

| 欄位 | 值 |
|------|-----|
| Type | **TXT** |
| Name | `_railway-verify` |
| Content | Railway 彈窗裡顯示的完整 `railway-verify=74fd37ed...` 值 |

> Railway 的 TXT 驗證值在 Railway Dashboard → drdow-web 服務 → Settings → Networking → Custom Domain 裡的彈窗可以看到完整值。

### 步驟 6：SSL 設定

1. Cloudflare 左側 → **SSL/TLS**
2. 加密模式選 **Full**

### 驗證

DNS 生效後（約 5-10 分鐘），以下網址都要能打開：

- https://drdowai.com
- https://drdowai.com/products/tms
- https://drdowai.com/products/erp
- https://drdowai.com/blog
- https://drdowai.com/faq
- https://drdowai.com/contact
- https://drdowai.com/llms.txt
- https://drdowai.com/sitemap.xml
