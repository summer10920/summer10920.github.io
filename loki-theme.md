# NexT 主題客製與升級注意事項

目前主題是 NexT 8.23.2（放在 `themes/next`），升級目標是 8.29.1。

**主題資料夾現在與官方原始碼完全一致，所有客製都放在站台端。** 升級時主題資料夾可以直接換成新版官方檔案，客製不會被蓋掉；只需要確認站台端的設定名稱與依賴的結構沒有被新版改掉。

## 客製放在哪裡

| 客製內容 | 位置 | 做法 |
| --- | --- | --- |
| 主題設定（46 項） | `_config.next.yml` | NexT 官方做法：站台根目錄的設定檔會覆蓋主題設定，只寫與預設不同的項目 |
| 樣式變數（品牌色、rem 字級、行高、內容寬度） | `source/_data/loki-theme.styl` | 透過 `custom_file_path.variable` 在官方變數之後覆蓋 |
| 頁尾版權列 | `inject/loki-theme.njk` | 透過 `custom_file_path.footer` 補內容；官方那一行用 `footer.copyright: false` 關掉 |
| Google 字型、`loki.css` | `source/_data/head.njk` | `custom_file_path.head` |
| 文字雲套件、`loki.js` | `source/_data/body-end.njk` | `custom_file_path.bodyEnd` |
| 版面與外觀 | `source/assets/css/*.css`（由 `loki.css` 匯入） | 站台自己的 CSS |
| 對官方樣式的小調整 | `source/assets/css/loki-theme.css` | 見下方 |
| 橫幅畫布、回頂端進度、頁尾圖示、程式碼檔名斷行 | `source/assets/js/loki.js` | 站台自己的 JS |
| 計數服務（vercount） | `_config.next.yml` 的 `vendors.busuanzi` | 官方提供的設定項 |

`inject/loki-theme.njk` 不能放在 `source/_data/`，因為 Hexo 會把那個資料夾的檔案當資料處理，裡面有模板語法時會報錯。

主題資料夾從 `themes/next-8.23.2` 改名為 `themes/next`，根目錄 `_config.yml` 的 `theme:` 也改成 `next`，這樣 `_config.next.yml` 的檔名之後不用再跟著版本改。

## 升級前主題資料夾改過什麼、現在怎麼處理

這 7 個檔案原本是直接修改主題檔，已全部還原成官方版，改用上面的方式取代：

| 原本改的檔案 | 原本的改動 | 現在的做法 |
| --- | --- | --- |
| `_config.yml` | 46 項設定 | `_config.next.yml` |
| `layout/_layout.njk` | 頁首加 `<canvas id="lokiBanner">` | `loki.js` 載入時插入 `.main > .column` 最前面 |
| `layout/_partials/footer.njk` | 版權列順序、圖示樣式 | `inject/loki-theme.njk` 補自訂版權列、CSS 的 `order: -1` 排最前面；圖示的 `with-love` class 由 `loki.js` 加上 |
| `layout/_third-party/statistics/busuanzi-counter.njk` | 計數腳本換成 vercount | `vendors.busuanzi` 設成 `https://vercount.one/js` |
| `source/css/_common/outline/footer/index.styl` | 拿掉計數容器載入前的隱藏規則 | `loki-theme.css` 把容器設回 `display: inline` |
| `source/css/_variables/base.styl` | 品牌色、字級、行高、內容寬度 | `loki-theme.styl` |
| `source/js/utils.js` | 回頂端 `--progress`、側欄目錄高度加 10px | `loki.js` 設 `--progress`；`loki-theme.css` 用 `calc()` 多加 10px |

另外，`utils.js` 原本有一行寫成 `parseInt(..., 10 + 10)`，等於用 20 進位解析，看起來是手誤，重構時沒有保留。

## 升級步驟

1. 先備份：建 tag 或複製整個站台資料夾。
2. 取得新版官方主題，直接取代 `themes/next` 的內容（建議用 git 看差異，確認沒有殘留舊檔）。
3. 對照新版的 `_config.yml`，檢查 `_config.next.yml` 裡每一項設定名稱是否仍存在、有沒有改名（特別是 `google_analytics`，UA 已停用，新版可能改用 GA4 的設定）。
4. 檢查 `loki-theme.styl` 裡的變數名稱在新版 `_variables/base.styl` 是否仍存在；若官方新增了用舊字級先算好的衍生變數（現在重新指定了 `$table-font-size`、`$font-size-subtitle` 等 5 個），也要補上。
5. 檢查站台端依賴的結構（見下節）。
6. 建置並驗收。

### 站台端依賴主題的哪些東西

| 站台端檔案 | 依賴 |
| --- | --- |
| `custom_file_path` 四項 | 新版仍支援 `head`、`footer`、`bodyEnd`、`variable` |
| `inject/loki-theme.njk` | `theme.footer.icon.name`、`theme.footer.since`、`config.author`；`.footer-inner` 仍是 flex 欄（才能用 `order`） |
| `loki-theme.css` | `.busuanzi-count #busuanzi_container_site_uv / _pv`、`.post-toc .nav .active > .nav-child` |
| `post-page.css` | `figure.highlight figcaption`、`.code-lang`，並蓋掉主題對標題列的 `word-break: break-all` |
| `sidebar.css` | `.back-to-top`，以及 `--progress` 變數 |
| `header-banner.css` | `.main > .column`、`header.header`，以及 `#lokiBanner` |
| `loki.js` | `.main > .column`、`.back-to-top`、`.footer .post-meta-item-icon`、`#busuanzi_value_*` |
| 各 CSS | 主題的 CSS 變數（`--main-color`、`--text-color`、`--body-bg-color`、`--highlight-background` 等） |

### 驗收方法

升級前先建置一份（`pnpm exec hexo generate`，複製 `public/` 當基準），升級後再建置並比對：

```bash
diff 基準/css/main.css public/css/main.css
diff 基準/index.html public/index.html
```

這次重構的結果可以當參考：`main.css` 只差兩處，一處是每次建置都會隨機換的連結顏色，另一處是官方的計數容器隱藏規則（已由 `loki-theme.css` 蓋回）。

再用瀏覽器看一輪：

- 頁首有文字雲橫幅，選單置中。
- 側欄寬度 360px、圓形頭像、社群連結、品牌色高亮。
- 文章頁寬度與行高；程式碼區塊是 mac 樣式，有語言標籤與複製按鈕，手機寬度下長檔名會在 `/` 後換行。
- 回到頂端按鈕的進度會隨捲動變化。
- 頁尾第一個是版權列，字數與瀏覽統計的數字都有顯示。
- 搜尋、Mermaid、Fancybox、隱藏文章（`hexo-hide-posts`）都正常。
