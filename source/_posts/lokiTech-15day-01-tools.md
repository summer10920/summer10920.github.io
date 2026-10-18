---
title: "初始觀念與環境設定：網頁、三層分工、開發工具"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 09:00:00
---

![網站開發爆炸圖：HTML、CSS、JavaScript、Tailwind、React 等前端技能樹](assets/images/banner/frontend-skill-tree.png)

這門課的核心是：**從零開始學網頁開發**。這一篇先建立共同語言——網頁和網站是什麼、為什麼要碰 HTML／CSS／JavaScript，以及後面出現的 Tailwind、React 各解決什麼問題——接著才安裝 VS Code、**Google Chrome**、連 GitHub、拉隨課 repo。**這裡不寫 HTML 頁面。** 各篇會出練習，課堂會講怎麼做。預覽與 DevTools 以 Chrome 為準，畫面才對得上講義。

<!-- more -->

# 網頁與網站
存取網站要透過**瀏覽器（browser）**：在網址列輸入 URL，或點選超連結。這一節先說明瀏覽器如何把一頁拿回來並畫出來，以及網頁、網站、前後端差在哪。比較細的連線與 DevTools 名詞，收在下一節補充，可先跳過。

## 什麼是瀏覽器
**瀏覽器**是用來擷取、解析並顯示網頁的用戶代理（user agent）。市面上還有 Microsoft Edge、Apple Safari、Mozilla Firefox 等實作；行動裝置內建瀏覽器、App 內嵌的網頁檢視（WebView）同樣依 HTML、CSS、JavaScript 規格處理文件。**課堂指定使用 Google Chrome** 作為開發與除錯的瀏覽器：講義截圖、快捷鍵與 DevTools 面板名稱都以 Chrome 為準。

瀏覽器不是影像檢視器，也不是文書軟體：它處理的是標記與樣式規則，而不是開啟一張點陣圖或 `.docx`。主要流程是：

1. 依 **URL**（Uniform Resource Locator，統一資源定位符）定位資源。
2. 透過 **HTTP** 或 **HTTPS**（Hypertext Transfer Protocol，超文本傳輸協定；S 表示 TLS 加密）向伺服器發出**請求（request）**，取得**回應（response）**。
3. **解析（parse）** HTML，建立 **DOM**（Document Object Model，文件物件模型）。
4. 載入 CSS、圖片、JavaScript 等**子資源（subresource）**，進行**排版（layout）**與**繪製（paint）**，完成渲染。

HTML 檔在磁碟或伺服器上只是文字；必須由瀏覽器解析與渲染，使用端才會看到可操作的介面。瀏覽器視窗的分頁、上一頁、書籤、網址列屬於**瀏覽器介面（chrome）**（此處 chrome 指視窗外框，不是產品名 Google Chrome），不是網頁文件的一部分。網頁內容顯示在內容區（viewport 所對應的文件區域）。課堂用 Chrome 開啟頁面、按 <kbd>F12</kbd> 對照**開發者工具（DevTools）**。

{% mermaid graph TB %}
url["URL 或超連結"] --> ua["瀏覽器"]
ua --> http["HTTP／HTTPS 請求"]
http --> parse["解析 HTML、建立 DOM"]
parse --> render["排版與繪製"]
render --> view["渲染後的畫面"]
{% endmermaid %}

{% note info %}
**搜尋引擎與瀏覽器**
「查 Google」是指用瀏覽器開啟 Google 搜尋這個**網站**，送出查詢後得到結果列表。Google 搜尋是網站服務；Google Chrome 是瀏覽器產品。同一套瀏覽器可開啟任意網站，不限於搜尋引擎。
{% endnote %}

## 什麼是網頁
**網頁（web page）**是瀏覽器渲染一份 HTML **文件（document）**後的結果，內容可包含文字、圖像、超連結、表單控制項等。主文件格式為 **HTML**（HyperText Markup Language，超文本標記語言）：以**元素（element）**與**標籤（tag）**描述文件的結構與語意。

名稱中的 **HyperText（超文本）**指可含指向其他資源之連結的文本。實際用來導向其他 URL 的是 **hyperlink（超連結）**，在 HTML 中主要由 `a` 元素的 `href` 等屬性表達。沒有超連結的文件無法組成可巡覽的網站；HTML 描述連結，瀏覽器在使用者啟用超連結時發出新的導覽請求。

同一份 HTML 依公開的網頁標準渲染，各瀏覽器應盡量一致。你還沒寫 CSS 時，標題比較大、清單有圓點、連結有底線、`body` 離視窗邊有一點空隙——這些來自瀏覽器內建的**使用者代理樣式（user agent stylesheet）**。它在作者樣式（你寫的 CSS）之前先套一份預設表。各家預設字型、表單外觀可能不同，所以「沒寫樣式卻看起來不一樣」往往是 UA stylesheet 各家瀏覽器定義不同。Chrome <kbd>F12</kbd> → **Elements** → **Styles** 可看到標成 *user agent stylesheet* 的規則。課堂以 Chrome 為準。

修改檔案後要按重新整理，瀏覽器才會再跑一次上面的流程；不是把舊畫面當一張圖蓋上去。

## 從輸入網址到出現畫面
你在網址列按 Enter，或點了一個連結，瀏覽器就要去把那一頁「拿回來、畫出來」。網路上的頁面會先找到對方那台電腦、再把檔案要過來；若你是用檔案總管直接打開自己電腦裡的 `.html`，就沒有「問網路門牌、跟伺服器要檔」這兩步，改成直接讀硬碟。

可以記成這幾步：

1. **看懂網址**：這次要連哪裡、要哪一份東西。
2. **必要時查門牌**：網址裡的名稱（例如 `example.com`）不是電腦真正的住址。瀏覽器會先問 **DNS**（Domain Name System，網域名稱系統）：這個名字對應哪一組數字住址（IP），才能連線。
3. **把檔案要回來**：連上網後用 **HTTP** 對對方說「請給我這份」；對方回「好，在這裡」或「找不到」。直接開本機檔就沒有這段對話。
4. **對方怎麼說**：成功通常是 `200`；網址打錯、檔不存在常是 `404`（Not Found）——這只代表「這個網址沒有這份東西」，不是你的作業系統壞了。Chrome 按 <kbd>F12</kbd> 切到 **Network（網路）** 能看到每一次要檔成功或失敗。
5. **讀 HTML，再去拿其他東西**：先讀主文件，裡面若提到樣式、程式、圖片，瀏覽器會再去拿。全部到齊後，排位置、畫到螢幕，你才看到完整一頁。

你眼睛看到的是畫好的畫面。要看當初載入的文字，用「檢視原始碼」；要看此刻頁面上的結構（有時程式會改過），用 <kbd>F12</kbd> 的 **Elements（元素）**。

{% mermaid graph TD %}
nav["輸入網址或點連結"] --> parse["看懂網址"]
parse --> dns["查門牌 DNS<br/>網域才需要"]
dns --> bytes["把檔案要回來<br/>或讀自己電腦的檔"]
bytes --> dom["讀 HTML"]
dom --> sub["再拿樣式、程式、圖片"]
sub --> paint["排好、畫到螢幕"]
{% endmermaid %}

## 獲取檔案資源應用
網址（URL）是「去哪裡拿哪一份東西」的寫法。瀏覽器先拿 HTML 當進入點，再依裡面的標記去拿樣式、程式、圖片。對方那台負責給檔的程式叫**伺服器（server）**；開發時也可以讀自己電腦裡的檔，或用本機的開發伺服器（例如 `http://localhost:5173`）。

以 `https://example.com/tours.html` 為例：

| 這一段 | 例 | 意思 |
| --- | --- | --- |
| 怎麼連（協定 scheme） | `https` | 走加密的網頁連線 |
| 連哪裡（主機 host） | `example.com` | 網站名字或 IP |
| 要哪份（路徑 path） | `/tours.html` | 那台電腦上的哪一個資源 |

主文件拿到後，常見還會再要：

| 用來做什麼 | 常見副檔名 |
| --- | --- |
| 結構（這頁有什麼） | `.html` |
| 樣子（顏色、排版） | `.css` |
| 互動（點了之後怎麼辦） | `.js` |
| 圖、影片 | `.png` `.jpg` `.svg` `.mp4` |

HTML 裡對應的是 `link`（樣式）、`img`（圖）、`script`（程式）。<kbd>F12</kbd> 的 **Network（網路）** 會列出每一次要檔的網址、成功或失敗。

{% note warning %}
**注意事項**
用檔案總管雙擊打開（`file:`）和用 `http://localhost` 預覽，瀏覽器當成兩個不同地方。相對路徑、表單、之後的 `fetch` 可能不一樣。用 Vite 時請開開發伺服器的網址，不要兩種開法混用。
{% endnote %}

## 網站、前端與後端
**網頁**是你此刻看到的那一頁。**網站（website）**是同一台伺服器一直開著：你點不同連結，它就依網址把**另一份 HTML**送來（那一頁需要的樣式、圖片也一併再要）。首頁、列表、詳情可以各是一份檔，仍算同一個站——通常同一個網域、同一套選單感覺。

可以想成：瀏覽器問「這次要哪一頁」，伺服器回答「這份 HTML」。連續操作就是一連串這樣的問答，不是一次把整個站塞進單一檔。靜態站也是伺服器在給檔（檔事先寫好）；動態站則可能依這次請求現場組出 HTML。重點相同：**一個服務入口，多份網頁來回。**

{% mermaid graph LR %}
u["你點連結"] --> s["同一台伺服器"]
s --> p1["index.html"]
s --> p2["tours.html"]
s --> p3["booking.html"]
{% endmermaid %}

站內怎麼換畫面，常見兩種（先認得名字）：

- **多頁應用**：每一個畫面一份 HTML，點連結就向伺服器再要一整頁。
- **單頁應用 SPA**（Single Page Application）：常常先只要一份進入用的 HTML，之後由 JavaScript 依網址換畫面，不一定每次都換一整份文件。

網站能連續給你不同的 HTML，是因為**後面那台伺服器一直都在**，瀏覽器只是一次次去問「下一頁是哪份」。工作可以分成兩頭，比較好記：

- **前端（front-end）**：發生在**你的電腦、你的 Chrome**。HTML 是這一頁有什麼、CSS 是長什麼樣子、JavaScript 是點了之後怎麼動。你看得到、點得到的，幾乎都在這一頭。
- **後端（back-end）**：發生在**放網站的那台電腦**。檔要從哪裡拿、資料存在哪、有沒有權限看這一頁，都在這一頭。你人坐在瀏覽器前，進不去那台機器，只能請瀏覽器傳話（HTTP）：「請給我這份」「請幫我存這筆」。

沒有後端，瀏覽器就沒人可問，網站無法連續把不同網頁送回來。沒有前端，伺服器就算有檔，你也沒有畫面可以看、可以點。本課主要練前端；需要資料時，用本機一個小程式假裝後端在回話，不自建資料庫。

{% mermaid graph LR %}
you["你"] --> fe["前端<br/>瀏覽器裡的畫面"]
fe -->|"問：要哪一頁、存哪筆"| be["後端<br/>伺服器那一頭"]
be --> data["資料或檔案"]
data --> be
be -->|"回：這份 HTML 或資料"| fe
{% endmermaid %}

# 選讀：補充觀念
前面把瀏覽器、網頁、網站和前後端分清楚，就可以去裝環境、看三層分工。下面這些詞之後看 Network、寫網址參數、碰到快取時會再用到。現在讀不懂或趕時間，**可以整節跳過**，不是必讀。

## 用戶端、伺服器與埠號
瀏覽器所在的裝置是 **用戶端（client）**；提供資源的程式是 **伺服器（server）**。兩者透過 **TCP/IP** 連線。HTTP 預設使用 **埠號（port）** 80，HTTPS 使用 443。本機開發伺服器（Vite、Live Server）常綁在 `127.0.0.1` 的其他埠，例如 `5173`、`5500`，網址寫成 `http://localhost:5173/`。

`127.0.0.1` 與 `localhost` 都指向本機迴環（loopback），請求不會送到外網。這與之後 `file:` 開啟檔案不同：後者沒有 HTTP 伺服器，也沒有主機與埠的概念。

## URI、查詢字串與片段識別碼
**URI**（Uniform Resource Identifier，統一資源識別符）是識別資源的字串；**URL** 是其中「含有位置資訊、可據以擷取」的一類。課堂文件一律寫 URL 即可，但你會在規格裡看到 URI。

完整 URL 還可能包含：

| 部分 | 例 | 名稱與用途 |
| --- | --- | --- |
| 埠 | `:5173` | 非預設埠時必須寫出 |
| 查詢字串（query string） | `?tourId=1` | `?` 之後的鍵值對，供程式讀參數 |
| 片段識別碼（fragment） | `#site-header` | `#` 之後指向文件內的 id，**不會**當成另一次 HTTP 請求送到伺服器 |

報名頁使用 `booking.html?tourId=1` 時，伺服器仍回同一份 HTML；讀 `tourId` 是前端 JavaScript 的工作。`#nav` 只讓瀏覽器捲到對應元素。

**來源（origin）** 由 scheme、host、port 三者定義。`https://example.com` 與 `http://example.com` 不是同一來源；`http://localhost:5173` 與 `http://localhost:3000` 也不是。之後的 `fetch`、Cookie 限制都與來源有關。

## HTTP 方法與訊息標頭
HTTP 訊息包含**起始行**、**標頭（header）** 與可選的**主體（body）**。常用方法：

- **GET**：擷取資源，不應在伺服器上造成需提交的副作用；查詢參數可放在 URL。
- **POST**：提交資料（如表單、JSON），主體在 body。
- 常見的後台系統（例如表單管理），還會用 **PUT**／**PATCH**（更新）、**DELETE**（刪除）。

回應會帶一個三位數的**狀態碼 state code**。這些號碼不是 Chrome 自己編的，而是 **HTTP** 這套「怎麼要檔、怎麼回話」的公開規格裡定好的（目前主要是 IETF 的 [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110)）。伺服器依這次實際發生的事選一個號碼回你；各家瀏覽器都認同一套意思，所以 Network 裡看到的 `404` 大家讀起來才一樣。

| 代碼格式 | 意思 | 例子 |
| --- | --- | --- |
| `2XX` | 成功，東西有拿到 | `200` 正常送來 |
| `3XX` | 請改去另一個網址（重新導向） | `301`、`302` |
| `4XX` | 這次請求有問題（網址錯、沒權限等） | `404` 找不到這份資源 |
| `5XX` | 對方伺服器自己出錯 | `500` |

開發時最常對的是 `200` 和 `404`。其他號碼之後在 Network 看到，對照是 `2XX` 還是 `4XX` 那一組即可，不必一次背完。


## 快取（cache）
**快取**是把「已經成功拿過的回應」暫時存在較近的地方，下次同一個 URL 先問這份複本，不必每次都從原始伺服器完整下載。目的是降低**延遲（latency）**、節省頻寬，並減輕伺服器負載。靜態資源（CSS、JS、圖像、字型）改動少、體積大，最適合被快取；HTML 進入點有時會設較短壽命，以免使用者一直停在舊文件。

快取可能發生在好幾層：**瀏覽器 HTTP 快取**（你本機磁碟或記憶體）、公司或 ISP 的**代理（proxy）**、網站前的 **CDN**（Content Delivery Network，內容傳遞網路）。課堂開發時最常碰到的是瀏覽器自己的快取。Network 面板 Size 欄若出現 *from memory cache*／*from disk cache*，代表這一趟沒有重下主體；若狀態碼是 **`304` Not Modified**，代表瀏覽器帶了驗證資訊（常見為 **ETag** 或 **Last-Modified**）去詢問「檔案有沒有變」，伺服器說沒變，於是繼續用舊位元組——這仍是快取命中，不是請求失敗。

開發時改了 CSS 或 JS、畫面卻沒變，往往是用戶端還在用舊複本，不是檔案沒存到。正式上線反而需要快取，否則每位訪客每次都重抓整站。因此「關掉快取」是開發期的暫時手段，不是網站的預設策略。

伺服器（或 CDN）用回應標頭告訴瀏覽器能不能存、能存多久，常見名稱：

| 標頭／指令 | 意思 |
| --- | --- |
| `Cache-Control: max-age=秒數` | 在這段時間內可直接用快取，不必問伺服器 |
| `Cache-Control: no-cache` | 可以用快取，但每次先**再驗證**（可能得到 `304`） |
| `Cache-Control: no-store` | 不要把回應存進 HTTP 快取（敏感資料才需要） |
| `Expires` | 較舊的到期時間寫法；現在多與 `Cache-Control` 並存 |
| `ETag`／`Last-Modified` | 供條件式請求比對「是否仍是同一版」 |

{% note info %}
**小技巧：同一頁對照快取**
停在這篇文章，<kbd>F12</kbd> → **Network** 後重新整理。先看 Size 是實際 KB 還是 *disk cache*／*memory cache*；再勾 Disable cache 後再重新整理，同一批 CSS／JS 應較常出現完整下載（`200`）而不是複本。對照的是標頭與 Size，不必改任何檔案。
{% endnote %}

## 媒體類型（MIME）
**Content-Type**（媒體類型，亦稱 **MIME type**，Multipurpose Internet Mail Extensions）宣告這段位元組該當成哪一種格式解讀。副檔名只是慣例；瀏覽器真正依循的是回應標頭裡的 `content-type`。之後用 `fetch` 送 JSON 時，請求也要帶 `Content-Type: application/json`，否則伺服器可能把主體當表單字串。這一章先在真實網站上把標頭看出來即可。


{% note success %}
**跟著做：用本篇文章證明 MIME**
你現在讀的就是本站（Hexo 部落格）的一頁。用 **Google Chrome** 停在這一頁，按 <kbd>F12</kbd> 打開 DevTools，切到 **Network**，再重新整理（<kbd>F5</kbd> 或 <kbd>Command</kbd>+<kbd>R</kbd>）。列表會出現這頁為了渲染而發出的各次 HTTP 請求。點其中一列，右側 **Headers** → **Response Headers** 找 `content-type`（有時寫成 `Content-Type`）。可用面板上方的篩選只看某一類：

| Network 篩選 | 你會點到的資源（名稱因主題而異） | 回應裡常見的 MIME |
| --- | --- | --- |
| Doc | 這篇文章本身（文件進入點） | `text/html`（常附 `charset=utf-8`） |
| CSS | 主題樣式表（`.css`） | `text/css` |
| JS | 主題或外掛腳本（`.js`） | `application/javascript` 或 `text/javascript` |
| Img | 封面或站內圖（如 `.png`） | `image/png`、`image/jpeg`、`image/webp` 等 |

同一頁會同時出現多種 MIME：HTML 負責文件、CSS 負責呈現、JS 負責行為、圖像是子資源。若 `content-type` 與實際格式不符（例如把 CSS 標成 `text/html`），瀏覽器就不會依你預期去解析。這就是「格式由標頭宣告，不是只看副檔名」的現場證據。
{% endnote %}
## 字元編碼
文件必須宣告**字元編碼（character encoding）**。課堂使用 **UTF-8**（Unicode 的一種編碼），才能正確表示繁體中文。HTML 以 `<meta charset="UTF-8">` 告知解析器。編碼錯誤會出現亂碼，不是「字打錯」。作業系統、編輯器、HTTP 標頭 `Content-Type: …; charset=utf-8` 應一致。

## 關鍵渲染路徑
瀏覽器把位元組變成像素的管線常稱為**關鍵渲染路徑（critical rendering path）**：

1. 將 HTML 位元組解碼為字元，再**符記化（tokenize）**、建樹，得到 DOM。
2. 處理 CSS 得到 **CSSOM**（CSS Object Model）。
3. 結合 DOM 與 CSSOM 得到**渲染樹（render tree）**（不含 `display: none` 的節點）。
4. **排版（layout／reflow）**計算每個盒的幾何位置。
5. **繪製（paint）**與合成（composite）輸出到螢幕。

JavaScript 可讀寫 DOM 與 CSSOM，因此腳本執行時機會打斷解析（稍後才學 `defer`／`async`）。DevTools **Elements** 看到的是當下 DOM，不一定等於磁碟上的原始 HTML。

變更幾何（寬高、字級）可能觸發 reflow，成本高於只改顏色的重繪。這裡只需建立「渲染是分階段計算，不是貼圖」的印象即可。

## 同源政策
瀏覽器不只幫你畫網頁，也會擋「這個頁面上的程式去偷看別的網站的資料」。這套規則叫**同源政策（Same-Origin Policy）**。這裡的**來源（origin）**由三件事一起決定：怎麼連（`http`／`https`）、連哪裡（主機名）、哪個埠。三個都相同才叫同源；少一個不同就不算。

| 這個網址 | 和 `https://example.com` 比 | 原因 |
| --- | --- | --- |
| `https://example.com/tours.html` | 同源 | 協定、主機、埠都一樣（路徑不算） |
| `https://example.com:443/a` | 同源 | HTTPS 預設埠就是 443 |
| `http://example.com` | 不同源 | `http` 和 `https` 不同 |
| `https://api.example.com` | 不同源 | 主機名不同 |
| `https://example.com:3000` | 不同源 | 埠不同 |
| `http://localhost:5173` 與 `http://localhost:3000` | 不同源 | 兩個本機埠也算兩個來源 |

同源時，這一頁上的 JavaScript 通常可以讀同一站其他頁的資料、送出帶這個站 Cookie 的請求。不同源時，瀏覽器會限制例如：

- 不能任意讀另一個網站頁面裡的文字、表單內容
- 用 `fetch` 去要另一台主機的資料時，若對方沒明確允許，你在程式裡也拿不到回應內容

這是為了降低惡意網站「開了你的網銀分頁就順便把餘額讀走」這類風險。要注意：不同源的**圖片、樣式、腳本檔**往往還是能被這一頁「引用進來顯示或執行」；被擋的多半是「用程式把別人的資料讀出來」。換句話說，能顯示 ≠ 能讀走。

若一個站真心想讓別的網頁用程式來拿它的資料，伺服器要在回應裡加上 **CORS**（Cross-Origin Resource Sharing，跨來源資源共享）相關標頭，等於公開說「我允許某某來源來讀」。沒有這張通行證，瀏覽器會在 Console 報跨來源錯誤——那是保護機制，不是你的 HTML 寫壞了。

開發時 `file:` 開檔、或前端一個埠、API 另一個埠，也常被當成不同源。對策是讓頁面和資料從同一個來源出來，或由伺服器依規格放行；觀念先記到這裡即可。

## 靜態與動態
差別在**伺服器收到請求之後做了什麼**，不在頁面漂不漂亮。靜態是檔案早已寫好、原樣送出；動態是應用程式依這次請求去查資料、再組出回應。

![靜態網站由檔案伺服器原樣送出磁碟上的 HTML／CSS／JS；動態網站經應用程式伺服器查資料庫後再組出 HTML](assets/images/static-vs-dynamic-server.png)

**靜態網站**：回應主體在請求前就是磁碟上的檔（HTML／CSS／JS／JSON）。Web 伺服器找到檔案後把位元組送出，過程中不改內容。GitHub Pages 屬於此模型。

**動態網站**：請求先到應用程式伺服器，常再查資料庫、判斷權限，**現場組出** HTML（或 JSON）。同一條 URL 可因登入身分得到不同內容。

本課前段練習為靜態文件；需要資料互動時，先在本機用行程模擬 API，上線再改讀專案内的靜態 JSON——雲端仍是靜態站，沒有在 GitHub Pages 上跑資料庫。


## 語意化標籤、無障礙設計與 SEO
人看畫面，程式看標記。瀏覽器、輔助科技、搜尋引擎與各種**爬蟲（crawler）**讀的是文件結構與文字，不是你螢幕上的像素。下面三個觀念常連在一起，先認得名字即可。

- **語意化標籤（semantic markup）**  
  標籤名稱承載角色：`nav` 是導覽、`button` 是按鈕、`h1` 是本頁主標題。`div`、`span` 是沒有內建角色的通用容器。用 `div` 加 CSS 畫成按鈕，人可能看得出能點，對讀文件的程式來說卻常常只是沒有名字的盒子。`strong`／`em` 寫的是重要性與語氣；只用 CSS 加粗、變斜，只有看起來像。外觀交給 CSS，標記負責「這是什麼」。

- **無障礙設計（accessibility，常縮寫 a11y）**  
  螢幕閱讀器與鍵盤操作依文件裡的角色與名稱工作，不是依截圖。原生的連結、按鈕、表單控制項本身就能被讀出、被聚焦。語意清楚，視覺以外的使用方式才跟得上畫面。

- **SEO 與關鍵字（search engine optimization）**  
  搜尋引擎用爬蟲抓頁、建索引，並依頁面文字判斷主題——也就是你常聽到的**關鍵字（keyword）**出現在哪、被放在什麼結構裡。標題、主文裡的詞，比把字只畫在圖上、或整頁沒有意義的 `div`，更容易被認成「這頁在談什麼」。隨著 AI 相關技術普及，越來越多程式會拜訪網站、試圖理解內容（摘要、問答、引用、分類），而不只是數關鍵字出現幾次。語意化的 HTML 等於把關鍵資訊寫成人與機器都讀得懂的位置；這不是教你堆關鍵字衝排名，而是先知道：標記有沒有意義，會影響別人（與程式）認不認得你的內容。

{% note info %}
**畫面能看 ≠ 結構正確**
標記語言的工作是描述「這是什麼」，不是「這長得像什麼」。
{% endnote %}

## 開發者工具對照
Chrome 按 <kbd>F12</kbd> 打開的開發者工具，把同一頁拆成幾個面板。先對一下中文介面、英文面板名，和課堂會用到的用途，之後才知道要切到哪一頁。

| 面板 | 英文 | 用途 |
| --- | --- | --- |
| 元素 | Elements | 檢視並暫時修改 DOM 與套用的 CSS |
| 主控台 | Console | 執行訊息、例外、`console.log` |
| 網路 | Network | 各資源的 URL、方法、狀態碼、耗時 |
| 應用程式 | Application | 稍後才需要：儲存、Cookie |

**Cookie** 是伺服器或腳本寫入用戶端的小型資料，隨後請求可帶上，常用於工作階段；本課不做登入，先知名詞即可。**本機儲存（localStorage）** 亦屬用戶端儲存，不在這一章使用。

# 為什麼要學這些技術
一頁由 HTML、CSS、JavaScript 組成。Tailwind CSS 與 React 建立在這三層之上，並不取代標記語言、樣式表語言或 ECMAScript。這一章建立詞彙，不實作頁面。

**漸進增強（progressive enhancement）** 的原則是：先有可讀的 HTML 文件，再疊呈現與行為。關閉 CSS 或腳本時，內容與超連結仍應可理解。這與「先做華麗動畫再補結構」相反，也是練習時先核對 DOM 的原因。

## HTML、CSS、JavaScript
三者職責不同，除錯時依層級開啟對應檔案：

| 技術 | 職責 | 規格類型 | 後續篇章 |
| --- | --- | --- | --- |
| **HTML** | 文件結構與語意 | 標記語言（markup language） | 之後：語意、路徑、表單 |
| **CSS** | 呈現：色彩、盒模型、配置、媒體查詢 | 樣式表語言（style sheet language） | CSS（一） |
| **JavaScript** | 行為：事件、狀態更新、`fetch` | 程式語言（programming language；ECMAScript） | JavaScript 各章 |

HTML 以標籤描述結構，不含運算與控制流程。CSS 以選擇器與宣告指定呈現，同樣不是通用程式語言。JavaScript 具有變數、條件、迴圈與非同步網路請求。實務上常分為 `.html`、`.css`、`.js`，由瀏覽器載入後組成一頁。

下面用深色模式開關對照這三層。嵌入裡可切 HTML／CSS／JS 分頁；`submit` 與 `fetch` 留到表單篇。

- **HTML**：畫面上有什麼。正中一顆 `role="switch"` 的按鈕，沒有顏色、沒有動畫。
- **CSS**：看起來怎樣。美化撥桿與 `body` 背景；有沒有 **`html.dark`** 決定淺色或深色。
- **JavaScript**：什麼時候改狀態。只在 `<html>` 上追加或拿掉 class `dark`，不寫 `style.background`。

<iframe height="400" style="width: 100%;" scrolling="no" title="[blog-demo] dark mode switch" src="https://codepen.io/editor/summer10920/embed/01a07169-6325-792c-b736-e7a00a943498?default-tab=html%2Ccss%2Cjs%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
  See the Pen <a href="https://codepen.io/editor/summer10920/pen/01a07169-6325-792c-b736-e7a00a943498">[blog-demo] dark mode switch</a> by Loki Jiang (<a href="https://codepen.io/summer10920">@summer10920</a>) on <a href="https://codepen.io">CodePen</a>.
</iframe>

{% note info %}
**對照時關掉其中一層**
在嵌入裡改 CSS（或暫時清空）：正中只剩一顆空白按鈕，沒有軌道、圓點與背景色。停用 JS：`html` 不會出現 `dark`，怎麼按外觀都不變。按一次開關，在 Elements 點 `<html>` 應看到 class 被加上 `dark`，再按一次拿掉——那就是 JS 唯一的工作。
{% endnote %}

## 框架、Tailwind 與 React
**框架（framework）**是別人先搭好的一套用法：約定怎麼組織檔案、提供現成積木，讓你少從零發明輪子。它不是新的程式語言。網頁最終還是 HTML、CSS、JavaScript；框架只是在其中一層（或幾層）上，給你比較固定的寫法，有時還要先**編譯**再給瀏覽器跑。

可以先分兩類，不要混在一起：

**CSS 框架**幫你寫**看起來怎樣**。瀏覽器執行的仍是 CSS。例如 **Bootstrap** 給的是整塊元件（按鈕、導覽列長什麼樣子）；**Tailwind CSS** 是 **utility-first**（原子化 CSS），用很多單一職責的 class（如 `flex`、`mt-4`）在標記上自己組合。本課用 Tailwind v4，經 Node 與 Vite 編譯後給瀏覽器。沒搞懂選擇器與盒模型，這些 class 對不上規格——它不是另一種語言。

**JavaScript 框架**幫你寫**畫面怎麼組、資料變了怎麼更新**。頁面一變多，若處處手動改 DOM（這裡改文字、那裡顯示／隱藏），程式容易散。框架把介面拆成可重用的塊，狀態變了就更新該更新的地方。瀏覽器跑的仍是編譯過的 JS。

常見有 **React**、**Vue**、**Angular**。**React** 由 Meta 維護，官方說是 **UI 函式庫（library）**：核心是**元件（component）**與**狀態（state）**，不管後端、也不內建換網址；要做 SPA 通常另接路由套件。職缺仍常寫「前端框架」，指實務上會跟路由、打包整套一起用。**JSX** 看起來像 HTML，其實是 JS 的寫法延伸，要編譯後才能跑，不是 `.html` 檔。

{% note info %}
**library 與 framework**
**library（函式庫）**：別人先寫好一批 **function**（或模組）等你呼叫。缺功能就 `import` 過來用；**何時呼叫、程式怎麼跑，仍由你決定**。

**framework（框架）**：在某一層給你一套**既定寫法**（怎麼命名、怎麼組、檔案怎麼放），你照它的規則填內容。不限於 JavaScript：例如 **Tailwind** 是 CSS framework（用它的 utility class 來寫呈現）；**React／Vue／Angular** 則常被稱為 JS framework（畫面怎麼拆、狀態變了誰更新）。JS 這類框架裡，主流程還常是它來呼叫你的程式，而不是你從頭操 DOM——仍是 JS（有時要編譯），只是另一套寫法。

徵才常把 library／framework 混著寫。React 官方稱 library；做整站時別人還是常叫它 framework。先會用就好。
{% endnote %}

{% mermaid graph TB %}
html["HTML"] --> page["一頁"]
css["CSS"] --> page
js["JavaScript"] --> page
page --> site["網站"]
tw["Tailwind 等<br/>CSS 框架"] --> css
fw["JS 框架／函式庫"] --> js
react["React"] --> fw
vue["Vue"] -.-> fw
ng["Angular"] -.-> fw
{% endmermaid %}

# 初始安裝設定
先把編輯器、瀏覽器、Git 與 GitHub 帳號準備好，再進 VS Code 打開課堂倉庫、裝套件、開始寫。編輯器套件今天一次裝齊，後面幾天不必再裝。課堂用 VS Code 編輯、Chrome 預覽與 DevTools。Node.js 與 pnpm 留到第 4 天，第一個 Tailwind 專案需要編譯時再裝，今天先不裝。

## 環境申請安裝
這一節只做「申請帳號、把軟體裝進這台電腦」：VS Code、Chrome、Git、GitHub。還沒有打開課堂專案。

### 安裝 VS Code
VS Code（Visual Studio Code）是 Microsoft 的免費編輯器，課堂用它開專案、看檔案樹、開終端機、裝套件。請到[官方下載頁](https://code.visualstudio.com/Download)安裝穩定版，不要用來路不明的改包。

- Windows：安裝過程可勾「加入 Open with Code」方便從資料夾右鍵開啟。
- macOS：把應用程式拖進 Applications；命令列若要用 `code` 指令，之後可在命令選擇區找 “Shell Command: Install 'code' command”。

安裝完請**重開一次** VS Code，再繼續。

{% note info %}
**小技巧：界面改繁中**
若選單是英文，開倉庫根目錄後會跟其他建議套件一起出現語言包，裝完重載視窗即可。
{% endnote %}

### 安裝 Google Chrome
課堂瀏覽器指定 **Google Chrome**。請到 [google.com/chrome](https://www.google.com/chrome/) 下載並安裝穩定版（Stable），不要用 Canary／開發版當課堂預設。

安裝後請用 Chrome 開啟本機預覽與之後的 Vite 網址，並以 <kbd>F12</kbd>（macOS 亦可 <kbd>Option</kbd>+<kbd>Command</kbd>+<kbd>I</kbd>）開啟 DevTools。後續固定用這三個面板：**Elements** 檢視 DOM 與套用的 CSS、**Console** 看錯誤與 `console.log`、**Network** 看 HTTP 請求與狀態碼。

{% note info %}
**小技巧：設成預設瀏覽器**
系統若把連結丟給 Safari 或其他瀏覽器，課堂對照會對不上。請在作業系統把預設瀏覽器設成 Chrome；Live Server 開頁時也會走系統預設瀏覽器。
{% endnote %}

### Git 與 GitHub
**Git** 是分散式**版本控制系統（VCS, version control system）**，在本機記錄檔案的修訂。**GitHub** 是託管 Git 儲存庫的網站，用來發布教材、同步練習與遠端備份。

課堂指令：`clone`、`checkout`、`pull`，之後 `add`／`commit`。不涵蓋 `rebase`。圖形化對照用稍後安裝的 **Git Graph**；指令與圖是同一件事，對錯時以指令為準。

請先：

1. 到 [git-scm.com](https://git-scm.com/downloads) 安裝 Git（Windows 安裝時編輯器可選 VS Code）。
2. 到 [github.com](https://github.com/) 註冊帳號（建議用個人常用信箱，之後 Pages 也用這個帳號）。
3. 終端機或 VS Code 終端機輸入 `git --version`，有版本號即可。

| 術語 | 定義 |
| --- | --- |
| repository（repo） | Git 儲存庫：受版本控制的專案目錄 |
| clone | 將遠端儲存庫複製到本機 |
| fork | 在 GitHub 上將儲存庫複製到**你的帳號**；之後 clone、push 都對這個 fork，不是老師原庫 |
| branch | 分支；教材在 `new-tech` |
| pull | 自遠端擷取並合併更新 |
| commit | 建立一次修訂紀錄 |

## 開始 VS Code
軟體與帳號都好了，這一節用 VS Code 打開練習 repo：fork／clone、裝建議套件（含 **Git Graph**），用分支圖對照 `clone` 與 `pull`。之後寫檔、看歷史、開終端機，都停在整個 `studiesAdvanced` 根目錄。

### 取得教材 repo
練習寫在 GitHub 倉庫 [summer10920/studiesAdvanced](https://github.com/summer10920/studiesAdvanced)。這是 15 天系列的練習專案：講義在這個部落格，要交的檔在那個倉庫。你沒有原倉庫的寫入權限，所以先 **Fork** 到自己的帳號，再 clone **那一份**，分支用 `new-tech`。

{% note warning %}
**注意事項**
不要直接 clone `summer10920/studiesAdvanced` 再 `git push`，會被拒絕。網址必須是 `https://github.com/你的帳號/studiesAdvanced.git`。
{% endnote %}

登入 GitHub 後：

1. 打開 [https://github.com/summer10920/studiesAdvanced](https://github.com/summer10920/studiesAdvanced)，確認分支是 `new-tech`，按 **Fork**（fork 到自己帳號即可）。
2. 進入**你的 fork**，分支仍選 `new-tech`，按綠色 **Code**，複製 HTTPS 網址。
3. 本機開終端機，進到你要放專案的目錄後執行：

```bash
git clone --branch new-tech https://github.com/你的帳號/studiesAdvanced.git
cd studiesAdvanced
git pull
```

{% note info %}
**找不到 branch 時**
先 `git fetch origin` 再 `git checkout new-tech`。若 fork 沒帶齊 branch，到 GitHub 的 fork 設定勾同步，或 clone 時加上 `--branch new-tech`。
{% endnote %}

之後整學期都用 VS Code 的 **檔案 → 開啟資料夾**，打開 `studiesAdvanced` 這一層（倉庫根目錄）。不要只開裡面的子資料夾。根目錄的設定、程式碼片段與 Prettier 會自動套上。

上游有更新時：GitHub 你的 fork 按 **Sync fork**，本機在 **`studiesAdvanced` 根目錄**再 `git pull`。

{% note success %}
**跟著做**
1. Fork 原倉庫到自己帳號。
2. Clone **你的** fork（核對網址裡是你的帳號）。
3. Clone 時加上 `--branch new-tech`，進資料夾後 `git pull`。
4. 用 VS Code 開啟 `studiesAdvanced` 根目錄。
{% endnote %}


### 建議的 VS Code 套件
**檔案 → 開啟資料夾**，選整個 `studiesAdvanced`（倉庫根目錄）。VS Code 會讀根目錄的 **`.vscode/extensions.json`**，跳出「建議安裝」。必裝的今天裝完；建議的可以同一天裝。不要另外搜來路不明的套件。

倉庫裡的 `.vscode/extensions.json` 只是**工作區的建議清單**，用來在你打開這個資料夾時跳出安裝。套件一旦安裝，就進**使用者環境**（這台電腦上的 VS Code），因此不必在子資料夾底下各放一份。

根目錄的 `extensions.json` 只有開根目錄時才會被讀到。有的套件（例如 ESLint、Tailwind IntelliSense）要等後面的專案才會開始作用，今天沒反應是正常的。

**必裝**

這六個負責預覽、存檔排版、class 與元件補完、分支圖，以及把界面改成繁體中文。建議視窗出現時先裝這六個。

| 套件名稱 | 作者 | 用途 | 線上說明 |
| --- | --- | --- | --- |
| Live Server | Ritwick Dey | 在本機啟動靜態伺服器，於瀏覽器即時預覽網頁 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) · [Open VSX](https://open-vsx.org/extension/ritwickdey/liveserver) |
| Prettier | Prettier | 依規則格式化程式碼，可在存檔時自動排版 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) · [Open VSX](https://open-vsx.org/extension/esbenp/prettier-vscode) |
| Tailwind CSS IntelliSense | Tailwind Labs | Tailwind class 自動完成、語法提示與色票 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) · [Open VSX](https://open-vsx.org/extension/bradlc/vscode-tailwindcss) |
| ES7+ React/Redux/React-Native snippets | dsznajder | React 元件與常用語法的程式碼片段 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) · [Open VSX](https://open-vsx.org/extension/dsznajder/es7-react-js-snippets) |
| Git Graph | mhutchie | 以圖形檢視 Git 提交歷史與分支 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) · [Open VSX](https://open-vsx.org/extension/mhutchie/git-graph) |
| Chinese (Traditional) Language Pack | Microsoft | 將編輯器界面譯為繁體中文 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hant) · [Open VSX](https://open-vsx.org/extension/MS-CEINTL/vscode-language-pack-zh-hant) |

**建議**

這四個用來標程式問題、補路徑、在行號旁看圖，以及在編輯器裡得到程式建議。GitHub Copilot 用免費方案即可。

| 套件名稱 | 作者 | 用途 | 線上說明 |
| --- | --- | --- | --- |
| ESLint | Microsoft | 依專案的 ESLint 規則，在編輯器標出程式問題 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) · [Open VSX](https://open-vsx.org/extension/dbaeumer/vscode-eslint) |
| Path Intellisense | Christian Kohler | 輸入檔案或資料夾路徑時自動補全 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) · [Open VSX](https://open-vsx.org/extension/christian-kohler/path-intellisense) |
| Image Preview | Kiss Tamás | 在編輯器行號旁顯示圖片預覽 | [Marketplace](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview) · [Open VSX](https://open-vsx.org/extension/kisstkondoros/vscode-gutter-preview) |
| GitHub Copilot | GitHub | 依上下文建議程式（課堂用免費方案） | [Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) · Open VSX 無此套件 |

裝法：建議視窗把列出的套件裝上。裝完若提示 Reload，就重載視窗。線上說明裡 **Marketplace** 是 VS Code 官方市集，**[Open VSX](https://open-vsx.org/)** 是開源登錄（部分編輯器由此安裝）。

{% note success %}
**跟著做**
1. 用 VS Code 開啟整個 `studiesAdvanced`。
2. 建議視窗出現時，先裝必裝的六個；建議的四個可以同一天裝。需要的話重載視窗。
3. 擴充功能頁核對上表都已 Enabled。
{% endnote %}

### 工作區與使用者設定
套件管「有沒有裝功能」；**設定**管「編輯器怎麼動」。VS Code 有兩層：

- **使用者（User）**：寫在你這台電腦的 VS Code 裡，換開哪個資料夾都還在。主題、字體、縮放常放這裡。
- **工作區（Workspace）**：寫在目前開啟的資料夾裡的 `.vscode/settings.json`，只對這個資料夾有效，可以跟著 Git 給全班同一套。同一項設定兩邊都有時，**工作區優先**。

你開的是倉庫根目錄，所以根目錄的 `.vscode/settings.json` 與 `.prettierrc` 會自動套用：存檔時用 Prettier 排版，縮排與換行全班同一套。不必再抄到使用者層。若要改成自己的習慣，再查使用者設定即可。

### Git Graph
**Git Graph** 把提交畫成點、把分支畫成線。你剛才 `clone` 下來的歷史會出現在圖上。課堂用這張圖講 branch 與同步；指令與圖是同一件事，對錯時以指令為準。

打開倉庫根目錄後，命令選擇區搜 `Git Graph: View Git Graph`（或側邊 Git Graph 圖示）。確認目前在 `new-tech`。

第一次在這台電腦 **commit 之前**，先設定名字與信箱。這只是寫在提交紀錄上的作者資料，**不必**跟 GitHub 帳號是同一組；登入、`push` 是另一件事。

```bash
git config --global user.name "你的名字"
git config --global user.email "你的信箱@example.com"
git config --global --list
```

之後每次練習告一段落，在 **`studiesAdvanced` 根目錄**：

```bash
git status
git add 你這次改過的檔案
git commit -m "簡短說明這次改了什麼"
git push
```

`push` 是推到**你的 fork**，不是老師原庫。圖上會多出你剛打的那一點。

老師更新教材時，順序是：

1. 瀏覽器打開**你的 fork**，按 **Sync fork**（在 GitHub 網站操作，把老師的更新併進你的 fork）。
2. 本機根目錄執行 `git pull`。
3. 重整 Git Graph，應看到新的點。

不要跳過 Sync fork 只在本機 `pull`：你的 `origin` 是自己的 fork，GitHub 沒同步的話，本機拉不到老師剛推的內容。

{% note info %}
**注意事項**
沒設 `user.name`／`user.email` 時，第一次 `commit` 會失敗或出現「Please tell me who you are」。設一次（`--global`）這台電腦之後都還在。

**小技巧**
Git Graph 要開著含 `.git` 的倉庫根（`studiesAdvanced`）才看得到完整歷史。只開子資料夾時圖會不完整或開不起來。
{% endnote %}

{% note success %}
**跟著做**
1. 在倉庫根執行上面三行 `git config`，確認 `--list` 看得到 name 與 email。
2. 打開 Git Graph，確認分支是 `new-tech`。
3. 之後的節奏：自己的練習 `commit` → `push`；老師有更新則 GitHub **Sync fork** → 本機 `git pull`。
{% endnote %}

### 開啟倉庫根目錄
寫練習、看 Git、開終端機，都停在同一個視窗：VS Code 開啟的是 `studiesAdvanced` 根目錄。子資料夾是倉庫裡的專案，不要另外開成新視窗。`git pull` 與 `git status` 也在這個根目錄執行。

{% note info %}
**小技巧：Live Server**
靜態頁用 Live Server：在檔案總管對目標的 `index.html` 按右鍵，選 **Open with Live Server**。
{% endnote %}

### 認識畫面
先認得區塊即可，不必背界面名稱。內建 Git 面板可看改了哪些檔；和終端機指令是同一件事，對錯時講義以指令為準。

| 區域 | 做什麼 |
| --- | --- |
| 左側活動列 | 檔案總管、搜尋、Git、套件 |
| 檔案總管 | 專案樹；點檔案在中間編輯 |
| 中間編輯器 | 寫程式的地方；可分割視窗 |
| 下方面板 | **終端機**、問題、輸出 |
| 狀態列 | Live Server 的 **Go Live**、目前分行與縮排 |

### Emmet
VS Code 內建 **Emmet**：在 HTML（或支援的檔）打縮寫再 <kbd>Tab</kbd>，展開成標記。課堂這幾組夠用，不必背完整語法。英文假文也是 Emmet，不必裝 Lorem Ipsum 套件。說明與速查：[Emmet 文件](https://docs.emmet.io/)、[速查表](https://docs.emmet.io/cheat-sheet/)、[VS Code 的 Emmet](https://code.visualstudio.com/docs/editor/emmet)。

| 打這些再 Tab | 會變成 |
| --- | --- |
| `!` | 一份 HTML 骨架（`<!DOCTYPE html>`…） |
| `div.card` | `<div class="card"></div>` |
| `ul>li*3` | 三個 `<li>` 包在 `<ul>` 裡 |
| `a` | `<a href=""></a>` |
| `img` | `<img src="" alt="">`（`src` 是空的） |
| `lorem` | 一段英文假文 |
| `lorem10` | 約 10 個英文詞 |
| `p>lorem` | 一段包在 `<p>` 裡的英文假文 |
| `ul>li*3>lorem5` | 三個列表項，各有短假文 |

### 占位圖
練習要假圖時，不必裝假圖套件。倉庫根目錄的 `.vscode/placeholder.code-snippets` 是一組**自訂程式碼片段**（snippet）：在 HTML 打 `placehold` 或 `picsum`，再按 <kbd>Tab</kbd>，會自動長出一張占位圖。展開後再按 <kbd>Tab</kbd> 可改寬、高。

| 打這些再 Tab | 會變成 |
| --- | --- |
| `placehold` | 色塊圖（網址是 [placehold.co](https://placehold.co/)） |
| `picsum` | 照片（網址是 [picsum.photos](https://picsum.photos/)） |

也可以自己把網址寫進 `src`，例如 `https://placehold.co/600x400`。

片段檔在倉庫根目錄的 `.vscode/placeholder.code-snippets`。你開的是這個根目錄，打 `placehold` 或 `picsum` 再按 <kbd>Tab</kbd> 就會展開，不必再複製到使用者片段。展開後再按 <kbd>Tab</kbd>，可改寬、高與 `alt`。

### 快捷鍵
Windows／Linux 用 <kbd>Ctrl</kbd>，Mac 用 <kbd>Command</kbd>（表寫 Ctrl）。瀏覽器對照畫面用 Chrome 的 <kbd>F12</kbd>，不是 VS Code 快捷鍵。

| 快捷鍵 | 做什麼 |
| --- | --- |
| <kbd>Tab</kbd> | 展開 Emmet 或程式碼片段 |
| <kbd>Ctrl</kbd>+<kbd>P</kbd> | 快速開檔 |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> | 命令選擇區（搜所有指令） |
| <kbd>Ctrl</kbd>+<kbd>`</kbd> | 開關終端機 |
| <kbd>Ctrl</kbd>+<kbd>B</kbd> | 開關側邊檔案樹 |
| <kbd>Ctrl</kbd>+<kbd>S</kbd> | 存檔 |
| <kbd>Ctrl</kbd>+<kbd>/</kbd> | 註解／取消註解 |
| <kbd>Alt</kbd>+<kbd>↑</kbd>／<kbd>↓</kbd> | 整行上移／下移（Mac：<kbd>Option</kbd>+方向鍵） |
| <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>↓</kbd> | 複製整行 |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> | 選下一個相同文字（可連按） |
| <kbd>Ctrl</kbd>+<kbd>,</kbd> | 設定 |

{% note success %}
**跟著做**
1. 在已開啟的 `studiesAdvanced` 新增或打開一個 `.html`。
2. 打 `lorem10`、<kbd>Tab</kbd>；打 `ul>li*3`、<kbd>Tab</kbd>。
3. 打 `placehold`、<kbd>Tab</kbd>，應出現 placehold.co 的 `<img>`。
4. 打 `picsum`、<kbd>Tab</kbd>，應出現 picsum.photos 的 `<img>`。
{% endnote %}

# 本篇重點回顧
這一章先對齊用詞與環境，還沒寫頁面。「選讀：補充觀念」可跳過，不列入下面清單。

- 瀏覽器依網址拿回 HTML，再載入樣式、程式與圖片，排版後畫成你看到的畫面。
- 網頁是單一份文件，網站是同一服務連續送出多頁；前端在瀏覽器，後端在伺服器。
- HTML 管結構、CSS 管外觀、JavaScript 管行為；Tailwind 與 React 分別建立在 CSS 與 JavaScript 上。
- 已安裝 VS Code、Google Chrome 與 Git，並有 GitHub 帳號；預覽與 <kbd>F12</kbd> 用 Chrome。
- 已 fork 並 clone [studiesAdvanced](https://github.com/summer10920/studiesAdvanced) 的 `new-tech`，用 VS Code 開啟倉庫根目錄，設定、片段與 Prettier 會自動套用。
- 必裝套件已裝好；靜態頁在檔案總管對目標 `index.html` 按右鍵，選 **Open with Live Server**。
- 已設定 `user.name` 與 `user.email`；練習用 `commit`／`push`，上游更新則在 GitHub **Sync fork** 再 `git pull`。
- 會用 Emmet（如 `lorem10`、`ul>li*3`）與根目錄的 `placehold`／`picsum` 片段，以及表上的 VS Code 快捷鍵。
