# NexT 主題客製與升級注意事項

目前主題是 NexT 8.23.2（放在 `themes/next`），升級目標是 8.29.1。

**主題資料夾現在與官方原始碼完全一致，所有客製都放在站台端。** 升級時主題資料夾可以直接換成新版官方檔案，客製不會被蓋掉；只需要確認站台端的設定名稱與依賴的結構沒有被新版改掉。

## 檔案結構與命名規則

站台自己的外觀分成兩類，**凡是依賴 NexT 結構（class、標記、CSS 變數）的客製，檔名一律用 `loki-theme` 開頭或放在 `loki-theme/` 資料夾**，升級主題時就只要檢查這些檔案：

```text
_config.next.yml                  主題設定（檔名固定，要對應 theme: next）
inject/loki-theme.njk             頁尾版權列的模板
source/_data/
  loki-theme.styl                 樣式變數覆蓋
  languages.yml                   覆蓋主題的語言字串（NexT 官方的自訂語言檔）
  head.njk、body-end.njk          載入字型、CSS、JS 的入口
source/assets/
  js/loki-theme.js                站台所有的 JS
  css/
    loki.css                      CSS 入口：列出所有站台客製的檔案與各自用途，順序即層疊順序
    base/                         與 NexT 結構無關
      variables.css               顏色變數（含無障礙用的衍生色）
      reboot.css                  全域元素：連結、kbd、程式碼字型
    loki-theme/                   依賴 NexT 結構，依畫面區塊分檔
      layout.css                  頁面骨架：body flex、main
      header.css                  頁首橫幅與主選單
      sidebar.css                 側欄、回頂端、文章目錄、頂端細條
      footer.css                  頁尾
      post-header.css             文章標題列（首頁與內頁共用）
      post-inline.css             文章內的行內程式碼與粗體（首頁摘要與內頁共用）
      page-home.css               首頁文章列表
      page-archive.css            分類總覽、歸檔、分類文章頁
      page-post.css               文章內頁的內文
      post-table.css              文章裡的表格
      code-window.css             程式碼區塊與檔名標題列
```

CSS 的匯入順序就是層疊順序，寫在 `loki.css`（每個 `@import` 旁都有註解說明用途，哪些是站台客製一眼就看得出來），不要隨意調換；新增或改名 CSS 檔要同步改那裡。每個 CSS 檔開頭都有註解，說明它管哪個區塊、依賴哪些主題的 class。

### 為什麼用原生 CSS

CSS 用原生巢狀語法（`.a { .b { } }`），現代瀏覽器都支援，不需要 Sass 或 Stylus 建置，檔案放在 `source/assets/` 底下 Hexo 會直接原樣輸出。主題自己的 Stylus 變數則在 `loki-theme.styl`。

## 顏色與無障礙（WCAG AA）

配色是**冷灰藍（slate）搭配血紅點綴**。紅色 `#e91061` 只當點綴，不整塊使用（整塊紅看起來像警告提示）：標題文字、引用、側欄文字、分類標籤、表格行內碼都是灰藍系；紅色只出現在連結、行內碼文字、章節編號、標題的線條（h1、h3 底線上的短線，h2、h4 的左側粗線，h5 的虛線底線）、頁首選單滑過與目前項目的底線、頁首與頁尾的細條這類線條與小面積，不做成色塊。黑色只用在大面積深色區塊（側欄、頁尾、頁首遮罩），而且是帶藍的炭灰（`#2b323a`、`#37404a`），不用純黑。新增樣式時延續這兩個原則。

品牌紅直接當文字或配白字底，對比略低於 AA 的 4.5:1（對淺底 4.04、白字 4.46），所以**文字一律用 `base/variables.css` 裡依底色分開的衍生色**，`#e91061` 本身只用在非文字（色條、圖示、邊框、捲軸）：

- `--main-text-color`：淺底上的紅色文字（對 `#f2f4f6` 5.06:1）；滑過加深用 `--main-hover-color`。
- `--main-strong-color`：白字的紅色底（徽章），白字 5.24:1。
- `--main-on-dark`：深底（側欄、程式碼視窗）上的紅色文字，對 `#2b323a` 4.84:1。
- `--text-color`、`--text-strong-color`：內文與標題粗體，11:1 以上。
- `--muted-text-color` / `--muted-on-dark`：淺底、深底上的次要文字，4.8:1 以上。

新增樣式時不要在別處寫死顏色，也不要用 opacity 把文字變淡（會讓對比度掉到 AA 以下）。

頁首：橫幅仍是 `loki-theme.js` 畫的文字雲（`lokiKeyword`），整個橫幅蓋一層 `--header-scrim`（冷灰藍半透明），字雲變暗但看得到；標題、副標題、選單直接用白字（對遮罩後的底色 7.4～8.7:1）垂直置中、上下疊放，選單是無底色的文字連結，目前項目底下一條紅線（`loki-theme/header.css`）。

標題 h1～h6 沿用原本「每一級用不同版型區分」的做法，不靠符號前綴（`loki-theme/page-post.css`）：

- h1：大字、灰色底線加紅色短線。
- h2：灰藍色帶加 5px 紅色左線。
- h3：細底線加紅色短線。
- h4：3px 紅色左線。
- h5：紅色虛線底線。
- h6：縮小變淡（`--muted-text-color`），灰色點線底線。

其他無障礙處理都在樣式裡，沒有改主題的標記：

- 主題把連結的 `outline` 設成 0，鍵盤操作看不到焦點，所以 `base/reboot.css` 補了 `:focus-visible` 外框；深色區塊與頁首改用淺色外框。
- 內文連結一律有底線，不只靠顏色辨識。
- 斷行不再用 `word-break: break-all`（會把英文單字切成兩半），改成 `overflow-wrap: anywhere`。
- `prefers-reduced-motion` 開啟時停用轉場與動畫。
- 程式碼視窗的語法顏色有兩種（紅、粉紅）對 `#282c34` 不到 4.5:1，在 `loki-theme/code-window.css` 調亮。

檢查方式：用 chrome-devtools 在每個頁面逐段計算對比度（含祖先的 opacity；頁首文字的底色是文字雲灰疊上遮罩），9 個頁面、約 3.8 萬段文字沒有不合格。標籤雲的顏色來自主題的 `.tag-cloud-0`～`.tag-cloud-10`（由 `$tag-cloud-start` 漸層到 `$tag-cloud-end`），在 `loki-theme.styl` 把兩端設成同一個深灰。`loki-theme.styl` 改的是 NexT 編譯進 `main.css` 的品牌色與側欄高亮，改完要重啟 dev server 才會生效。

## 各項客製放在哪裡

| 客製內容 | 位置 | 做法 |
| --- | --- | --- |
| 主題設定（46 項） | `_config.next.yml` | NexT 官方做法：站台根目錄的設定檔會覆蓋主題設定，只寫與預設不同的項目 |
| 樣式變數（品牌色、rem 字級、行高、內容寬度） | `source/_data/loki-theme.styl` | 透過 `custom_file_path.variable` 在官方變數之後覆蓋 |
| 文字用語（「發表於」改成「發表」） | `source/_data/languages.yml` | NexT 官方的自訂語言機制，只寫與官方不同的字串；改完要重啟 dev server |
| 頁尾版權列 | `inject/loki-theme.njk` | 透過 `custom_file_path.footer` 補內容；官方那一行用 `footer.copyright: false` 關掉 |
| 頁尾外觀、計數容器顯示 | `loki-theme/footer.css` | 深色底、品牌色上緣、版權獨占第一行、統計用文字標籤；頁尾不參與主題的進場動畫 |
| 頁面撐滿視窗高度（頁尾貼底） | `loki-theme/layout.css` | `body` 用 flex，`main` 吃掉剩餘高度 |
| 程式碼視窗檔名標題列 | `loki-theme/code-window.css` | 正常排版、長路徑可在 `/` 後換行 |
| 側欄目錄展開高度 | `loki-theme/sidebar.css` | 子清單多留 10px |
| Google 字型、`loki.css` | `source/_data/head.njk` | `custom_file_path.head` |
| 文字雲套件、`loki-theme.js` | `source/_data/body-end.njk` | `custom_file_path.bodyEnd` |
| 橫幅畫布與文字雲、計數千分位、程式碼檔名斷行、回頂端進度、資訊列冒號換「×」 | `source/assets/js/loki-theme.js` | 站台所有的 JS，一個檔案 |
| 計數服務（vercount） | `_config.next.yml` 的 `vendors.busuanzi` | 官方提供的設定項 |

`inject/loki-theme.njk` 不能放在 `source/_data/`，因為 Hexo 會把那個資料夾的檔案當資料處理，裡面有模板語法時會報錯。

主題資料夾從 `themes/next-8.23.2` 改名為 `themes/next`，根目錄 `_config.yml` 的 `theme:` 也改成 `next`，這樣 `_config.next.yml` 的檔名之後不用再跟著版本改。

## 原本改了主題檔的 7 個檔案，現在怎麼處理

這 7 個檔案原本是直接修改主題檔，已全部還原成官方版，改用上面的方式取代：

| 原本改的檔案 | 原本的改動 | 現在的做法 |
| --- | --- | --- |
| `_config.yml` | 46 項設定 | `_config.next.yml` |
| `layout/_layout.njk` | 頁首加 `<canvas id="lokiBanner">` | `loki-theme.js` 載入時插入 `.main > .column` 最前面 |
| `layout/_partials/footer.njk` | 版權列順序、圖示樣式 | `inject/loki-theme.njk` 補自訂版權列；排序與樣式在 `loki-theme/footer.css` |
| `layout/_third-party/statistics/busuanzi-counter.njk` | 計數腳本換成 vercount | `vendors.busuanzi` 設成 `https://vercount.one/js` |
| `source/css/_common/outline/footer/index.styl` | 拿掉計數容器載入前的隱藏規則 | `loki-theme/footer.css` 把容器設回 `display: inline` |
| `source/css/_variables/base.styl` | 品牌色、字級、行高、內容寬度 | `loki-theme.styl` |
| `source/js/utils.js` | 回頂端 `--progress`、側欄目錄高度加 10px | `loki-theme.js` 設 `--progress`；`loki-theme/sidebar.css` 用 `calc()` 多加 10px |

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
| 全部 CSS | 主題的 CSS 變數：`--highlight-background`（`--main-color` 等是站台自己在 `base/variables.css` 定義的；`--link-color` 與主題同名，覆蓋它會影響主題所有連結） |
| `loki-theme/layout.css` | `<body>` 的直接子層結構：`.headband`、`main`、`footer`；`.header`、`.main-inner`（主題在 768～840px 把它們固定成 800px，這裡限制不超過視窗）；`.pagination .page-number.current` |
| `loki-theme/header.css` | `.main > .column`、`header.header`、`.site-brand-container`（含手機版的 `.toggle-line`）、`.site-nav .main-menu`；`#lokiBanner` 由 `loki-theme.js` 建立 |
| `loki-theme/sidebar.css` | `.sidebar-toggle`、`.github-corner`、`.headband`、`.sidebar-panel-container`、`.back-to-top`（`--progress`）、`.post-toc .nav .active > .nav-child`（主題寫入的 `--height`） |
| `loki-theme/footer.css`、`inject/loki-theme.njk` | `theme.footer.icon.name`、`theme.footer.since`、`config.author`；`.footer-inner` 是 flex（才能用 `order`）；`.wordcount`、`.busuanzi-count`、`.post-meta-item` 以及各項目的 `[title]` 屬性（當統計的文字標籤）；`.use-motion .footer`；`#busuanzi_container_site_uv / _pv` |
| `loki-theme/post-header.css` | `.posts-expand header.post-header`、`.post-title`、`.post-meta-container`、`a.post-edit-link` |
| `loki-theme/page-home.css` | `.main-inner.index.posts-expand .post-block`、`article.post-content`、`a.fancybox` |
| `loki-theme/page-archive.css` | `.main-inner.page / .archive / .category`、`.posts-collapse`、`.category-all`、`.collection-title`、`.collection-year` |
| `loki-theme/page-post.css`、`post-table.css`、`post-inline.css` | `.main-inner.post.posts-expand .post-body`、`.tabs`、`.note`、`.headerlink`、`div.table-container` |
| `loki-theme/code-window.css` | `figure.highlight`、`figcaption`、`.code-lang`、`.table-container` |
| `loki-theme.js` | `.main > .column`、`.back-to-top`、`figure.highlight figcaption`、`#busuanzi_value_*`、`.post-meta-container .post-meta-item-text`（結尾的冒號換成 `.loki-meta-sep`） |
| `inject/loki-theme.njk` | 模板變數 `theme`、`config`，以及 `date()` 函式 |

### 驗收方法

升級前先建置一份（`pnpm exec hexo generate`，複製 `public/` 當基準），升級後再建置並比對：

```bash
diff 基準/css/main.css public/css/main.css
diff 基準/index.html public/index.html
```

這次重構的結果可以當參考：`main.css` 只差兩處，一處是每次建置都會隨機換的連結顏色，另一處是官方的計數容器隱藏規則（已由 `loki-theme/footer.css` 蓋回）。

外觀可以用瀏覽器的計算後樣式比對：重構前後各取一次所有元素的計算後樣式（顏色、間距、尺寸、定位等），逐一比較雜湊，只會剩下幾個每次建置都會隨機換顏色的社群連結。

再用瀏覽器看一輪：

- 頁首有文字雲橫幅，選單置中。
- 側欄寬度 360px、圓形頭像、社群連結、品牌色高亮。
- 文章頁寬度與行高；程式碼區塊是 mac 樣式，有語言標籤與複製按鈕，手機寬度下長檔名會在 `/` 後換行。
- 回到頂端按鈕的進度會隨捲動變化。
- 頁尾：深色底、品牌色上緣；第一行是版權，下面是「總字數、所需總閱讀時間、訪客總數、總瀏覽次數」四項數字；頁尾一開始就看得到，內容很少的頁面（例如標籤頁）頁尾仍貼在視窗底部。
- 搜尋、Mermaid、Fancybox、隱藏文章（`hexo-hide-posts`）都正常。
