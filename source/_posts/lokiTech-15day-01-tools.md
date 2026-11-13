---
title: "初始觀念與環境設定：網頁、前後端、開發工具"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 09:00:00
---

![網站開發爆炸圖：HTML、CSS、JavaScript、Tailwind、React 等前端技能樹](assets/images/banner/frontend-skill-tree.png)

這門課從零開始學網頁開發。這一篇先建立共同語言：瀏覽器、網頁、網站與前後端各是什麼，HTML、CSS、JavaScript 與後面的 Tailwind、React 各負責什麼。接著安裝 VS Code、Google Chrome、Git，註冊 GitHub，取得課堂用的練習 repo，並認識編輯器的套件、設定與常用快捷鍵。HTML 頁面從下一篇才開始寫，課堂預覽與開發者工具一律以 Chrome 為準。

<!-- more -->

# 網頁與網站
使用網站要透過瀏覽器：在網址列輸入網址，或點選超連結。這一章說明瀏覽器怎麼把一頁拿回來並畫出來，以及網頁、網站、前端與後端各指什麼。較細的連線與快取名詞收在「選讀：補充觀念」，可以先跳過。

## 瀏覽器
這一節先說明瀏覽器是什麼，之後談網頁與網站才有共同的起點。

**瀏覽器（browser）**是取得、解析並顯示網頁的軟體。Microsoft Edge、Apple Safari、Mozilla Firefox 都是瀏覽器，手機 App 內嵌的網頁檢視也依同一套 HTML、CSS、JavaScript 規格運作。課堂指定使用 Google Chrome，講義截圖、快捷鍵與開發者工具名稱都以它為準。

瀏覽器處理的是文字寫成的標記與樣式規則，不是開啟一張圖片。一頁從網址到畫面，大致經過下面幾步：

1. 依 **URL**（Uniform Resource Locator，網址）找到要拿的資源。
2. 透過 **HTTP** 或 **HTTPS**（超文本傳輸協定；HTTPS 多了加密）向伺服器發出**請求（request）**，取得**回應（response）**。
3. **解析（parse）** HTML，建立 **DOM**（Document Object Model，文件物件模型），也就是瀏覽器記在記憶體裡的文件結構樹。
4. 再載入 CSS、圖片、JavaScript 等**子資源（subresource）**，完成**排版（layout）**與**繪製（paint）**。

{% mermaid graph TB %}
url["URL 或超連結"] --> ua["瀏覽器"]
ua --> http["HTTP／HTTPS 請求"]
http --> parse["解析 HTML、建立 DOM"]
parse --> render["排版與繪製"]
render --> view["渲染後的畫面"]
{% endmermaid %}

HTML 檔本身只是文字，要由瀏覽器解析與渲染才看得到畫面。分頁、上一頁、書籤、網址列屬於瀏覽器自己的介面，不是網頁的一部分。

{% note info %}
**搜尋引擎與瀏覽器**
Google 搜尋是一個網站，Google Chrome 是瀏覽器。「查 Google」是用瀏覽器開啟這個網站，同一個瀏覽器可以開啟任何網站。
{% endnote %}

## 網頁
瀏覽器渲染出來的畫面，來自一份 HTML 文件，這一節說明網頁與 HTML 的關係。

**網頁（web page）**是瀏覽器渲染一份 HTML 文件後的結果，內容可以有文字、圖像、超連結與表單。**HTML**（HyperText Markup Language，超文本標記語言）用**元素（element）**與**標籤（tag）**描述文件的結構與語意。

名稱中的 HyperText 指「含有連結的文本」。**超連結（hyperlink）**讓使用者從一份文件跳到另一個網址，一份份文件靠連結串起來，才組成可以瀏覽的網站。

還沒寫 CSS 時，標題仍然比較大、清單有圓點、連結有底線，這是瀏覽器內建的**使用者代理樣式表（user agent stylesheet）**。各瀏覽器的預設值略有差異，所以沒寫樣式卻看起來不太一樣，通常出在這裡。在 Chrome 按 <kbd>F12</kbd> 開啟開發者工具，**Elements** 面板的 **Styles** 裡標著 user agent stylesheet 的就是這些規則。

修改檔案後必須重新整理，瀏覽器才會把上面的流程再跑一次。

## 從輸入網址到出現畫面
這一節把上面的流程換成生活語言再走一次，並認識網址的結構。

在網址列按 Enter 或點連結後，瀏覽器依序做這幾件事：

1. 看懂網址：要連哪裡、要哪一份資源。
2. 查地址：網址裡的網域名稱不是電腦真正的位置，瀏覽器先問 **DNS**（Domain Name System，網域名稱系統），查出對應的 **IP**（數字地址）。
3. 要檔案：連上後用 HTTP 向對方要這份資源，對方回傳內容或回報找不到。
4. 讀 HTML，再依裡面的標記去拿樣式、程式與圖片。
5. 全部到齊後排版並畫到螢幕。

如果是雙擊打開自己電腦裡的 HTML 檔，就沒有查地址與連線這兩步，瀏覽器直接讀硬碟。

{% mermaid graph TD %}
nav["輸入網址或點連結"] --> parse["看懂網址"]
parse --> dns["查地址 DNS<br/>網域才需要"]
dns --> bytes["要回檔案<br/>或讀自己電腦的檔"]
bytes --> dom["讀 HTML"]
dom --> sub["再拿樣式、程式、圖片"]
sub --> paint["排版、畫到螢幕"]
{% endmermaid %}

### 網址的組成
以 `https://example.com/page.html` 為例，網址由三段組成：

- 協定（scheme）：`https`，用加密的網頁連線。
- 主機（host）：`example.com`，網站的網域名稱，也可以是 IP。
- 路徑（path）：`/page.html`，那台電腦上的哪一份資源。

### 瀏覽器會再去拿哪些檔案
瀏覽器先拿 HTML 當進入點，再依裡面的標記去拿其他檔案：

- 結構：`.html`，用 `a` 連到別頁。
- 樣子：`.css`，用 `link` 載入。
- 互動：`.js`，用 `script` 載入。
- 圖片與影片：`.png`、`.jpg`、`.svg`、`.mp4`，用 `img` 等元素載入。

按 <kbd>F12</kbd> 切到 **Network** 面板，可以看到每一次要檔的網址、狀態碼與是否成功。狀態碼 `200` 表示成功，`404` 表示這個網址沒有這份資源，並不是電腦壞了。

要看當初載入的原始文字用「檢視原始碼」；要看此刻頁面上的結構（程式可能已經改過）用 **Elements**。

{% note warning %}
**file: 與 localhost 不同**
雙擊打開的檔案（網址以 `file:` 開頭）和用本機伺服器預覽，對瀏覽器是兩個不同的地方，相對路徑與之後的資料請求行為可能不一樣。課堂的靜態頁用 Live Server（本篇稍後安裝）開，Vite 專案用它給的網址，不要混用。
{% endnote %}

## 網站、前端與後端
這一節把單一網頁擴大到整個網站，並分清楚前端與後端各在哪一頭。

**網站（website）**是同一個服務持續在線上：點不同連結，伺服器就依網址送來另一份 HTML，同一個網域下的多份網頁組成一個網站。靜態網站的檔案事先寫好，動態網站則可能依請求現場組出內容，兩者在選讀的「靜態與動態」比較。

站內換畫面常見兩種做法：

- **多頁應用**：每個畫面是一份 HTML，點連結就向伺服器再要一整頁。
- **單頁應用 SPA**（Single Page Application）：先載入一份進入用的 HTML，之後由 JavaScript 依網址換畫面。React 專案多屬此類。

網站的工作分成兩頭：

- **前端（front-end）**：發生在你的電腦與瀏覽器裡。HTML 決定有什麼內容，CSS 決定外觀，JavaScript 決定互動，所有看得到、點得到的都在這一頭。
- **後端（back-end）**：發生在放網站的那台電腦。檔案從哪裡拿、資料存在哪、誰有權限看，都由這一頭處理。

前端與後端靠 HTTP 溝通，前端問「請給我這份」或「請幫我存這筆」，後端回覆檔案或資料。本課主要練前端；需要資料時，由專案內的 JSON 檔提供，不自建伺服器與資料庫。

{% mermaid graph LR %}
you["你"] --> fe["前端<br/>瀏覽器裡的畫面"]
fe -->|"請求：要哪一頁、存哪筆"| be["後端<br/>伺服器那一頭"]
be --> data["資料或檔案"]
data --> be
be -->|"回應：HTML 或資料"| fe
{% endmermaid %}

# 為什麼要學這些技術
一個網頁由 HTML、CSS、JavaScript 三種技術組成，Tailwind CSS 與 React 建立在它們之上，並不取代它們。這一章說明三者的分工，以及框架解決什麼問題。

## HTML、CSS、JavaScript
網頁由這三種技術分工組成，出問題時要先判斷是哪一層。

- **HTML**：標記語言，描述文件的結構與語意，不含運算。
- **CSS**：樣式表語言，描述顏色、盒模型、版面配置與響應式，不是通用程式語言。
- **JavaScript**：程式語言，有變數、條件、迴圈，負責事件、狀態更新與向伺服器要資料。

下面的深色模式開關可以切換 HTML、CSS、JS 分頁對照三層分工：

- HTML：畫面上有什麼。正中一顆開關按鈕，沒有顏色也沒有動畫。
- CSS：看起來怎樣。畫出軌道與圓點，並依 `html` 有沒有 `dark` class 決定淺色或深色。
- JavaScript：什麼時候改狀態。只負責在 `html` 上加上或拿掉 `dark`。

<iframe height="400" style="width: 100%;" scrolling="no" title="[blog-demo] dark mode switch" src="https://codepen.io/editor/summer10920/embed/01a07169-6325-792c-b736-e7a00a943498?default-tab=html%2Ccss%2Cjs%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
  See the Pen <a href="https://codepen.io/editor/summer10920/pen/01a07169-6325-792c-b736-e7a00a943498">[blog-demo] dark mode switch</a> by Loki Jiang (<a href="https://codepen.io/summer10920">@summer10920</a>) on <a href="https://codepen.io">CodePen</a>.
</iframe>

{% note info %}
**對照時關掉其中一層**
在嵌入裡清空 CSS，只剩一顆空白按鈕；停用 JS，按了開關外觀也不會變。在 Elements 點選 `html`，按一次開關會看到 class 被加上，再按一次被拿掉，那就是 JavaScript 唯一的工作。
{% endnote %}

## 框架、Tailwind 與 React
這一節說明為什麼在三種基礎技術之上，還會再用框架。

**框架（framework）**是別人先搭好的一套用法，約定檔案怎麼組織、提供現成積木，讓你不必從零發明。它不是新的語言，瀏覽器最終執行的仍是 HTML、CSS、JavaScript，框架只是在某一層提供固定寫法，有時需要先**編譯**（轉換成瀏覽器看得懂的檔案）。

框架可以分成兩類：

- **CSS 框架**：處理看起來怎樣。**Tailwind CSS** 是 utility-first（原子化）的做法，用許多單一用途的 class 在標籤上組合出外觀，本課使用 Tailwind 4。它背後仍是 CSS，沒搞懂選擇器與盒模型，就看不懂這些 class 在做什麼。
- **JavaScript 框架**：處理畫面怎麼組、資料變了怎麼更新。頁面一多，到處手動改 DOM 會讓程式散亂，框架把介面拆成可重用的**元件（component）**，資料（**狀態 state**）一變就自動更新對應的畫面。**React** 是目前最主流的選擇，本課使用 React 19。

React 的 **JSX** 寫法長得像 HTML，其實是 JavaScript 的語法延伸，必須編譯後才能執行。

{% note info %}
**library 與 framework**
library（函式庫）是別人寫好一批功能讓你呼叫，什麼時候用由你決定。framework（框架）則提供一套既定的寫法，你照規則填內容。React 官方稱自己是 library，徵才與日常則常叫它框架，兩種說法都會遇到，先會用就好。
{% endnote %}

{% mermaid graph TB %}
html["HTML"] --> page["一頁"]
css["CSS"] --> page
js["JavaScript"] --> page
page --> site["網站"]
tw["Tailwind 等<br/>CSS 框架"] --> css
fw["JS 框架／函式庫"] --> js
react["React"] --> fw
{% endmermaid %}

# 初始安裝設定
這一章把開發環境準備好：安裝編輯器、瀏覽器與 Git，註冊 GitHub，取得課堂 repo，再認識編輯器的套件、設定與常用操作。以下假設電腦是剛重灌的狀態，已經裝好的工具可以跳過該步。Node.js 與 pnpm 要到 Tailwind 專案才需要，安裝方式在 {% post_link lokiTech-15day-04-tailwind %} 說明，這一篇先不裝。

## 安裝工具與帳號
這一節只安裝軟體與申請帳號，還沒有打開課堂專案。

### 安裝 VS Code
**VS Code**（Visual Studio Code）是 Microsoft 的免費編輯器，課堂用它開專案、編輯檔案、開終端機。請到[官方下載頁](https://code.visualstudio.com/Download)安裝穩定版。

- Windows：安裝時可勾選加入「Open with Code」，之後能在資料夾上按右鍵開啟。
- macOS：把應用程式拖進 Applications。

{% note info %}
**界面改繁體中文**
第一次開啟時右下角通常會詢問是否安裝繁體中文語言套件，也可以之後在建議套件裡裝，裝完重載視窗即可。
{% endnote %}

### 安裝 Google Chrome
請到 [google.com/chrome](https://www.google.com/chrome/) 安裝穩定版。建議在作業系統把它設成預設瀏覽器，Live Server 開頁時會走系統預設瀏覽器。

按 <kbd>F12</kbd>（macOS 也可以按 <kbd>Option</kbd>+<kbd>Command</kbd>+<kbd>I</kbd>）開啟**開發者工具（DevTools）**，課堂固定用三個面板：

- **Elements（元素）**：檢視 DOM 與套用的 CSS，並能暫時修改。
- **Console（主控台）**：看錯誤訊息與 `console.log` 的輸出。
- **Network（網路）**：看每個請求的網址、狀態碼與耗時。

### Git 與 GitHub
**Git** 是**版本控制系統**，在本機記錄檔案每一次修訂。**GitHub** 是存放 Git 儲存庫的網站，課堂用它發布教材與備份你的練習。

1. 到 [git-scm.com](https://git-scm.com/downloads) 安裝 Git，Windows 安裝過程中的預設編輯器可以選 VS Code。
2. 到 [github.com](https://github.com/) 註冊帳號，建議用常用信箱，之後部署網站也會用這個帳號。
3. 在終端機輸入 `git --version`，出現版本號就代表安裝成功。

課堂只用到複製、拉取、加入、提交、推送這幾個基本操作，不涵蓋 `rebase`。先認識幾個名詞：

- repository（repo）：Git 儲存庫，一個受版本控制的專案資料夾。
- clone：把遠端儲存庫複製到本機。
- fork：在 GitHub 上把別人的儲存庫複製一份到你的帳號，之後的 clone、push 都對這份 fork。
- branch：分支，同一個儲存庫裡可以並存的獨立版本線。老師每期開課會從 `master` 建一條班級分支，名稱格式是 `fe/YYYMM`：YYY 是民國年，MM 是該年課程的第幾期，例如 `fe/11601` 是民國 116 年第 1 期。你的教材就在那條分支上。
- commit：建立一次修訂紀錄。
- push／pull：把本機的紀錄推上遠端／從遠端拉下更新。

## 取得課堂 repo 並開始使用 VS Code
工具裝好後，這一節取得練習專案、安裝建議套件，並認識編輯器的設定與常用操作。之後整學期的練習都在這個 repo 裡進行。

### 取得課堂 repo
練習放在 GitHub 的 [summer10920/studiesAdvanced](https://github.com/summer10920/studiesAdvanced)，講義在這個部落格，要看的程式碼與作業起始檔在那個 repo。你沒有原 repo 的寫入權限，所以先 fork 到自己的帳號，再 clone 你自己的那一份。

{% note warning %}
**不要直接 clone 老師的 repo**
直接 clone 原 repo 再 `git push` 會被拒絕。網址必須是你自己的帳號：`https://github.com/你的帳號/studiesAdvanced.git`。
{% endnote %}

1. 登入 GitHub，打開原 repo，按 **Fork**。原 repo 的預設分支是 `master`，班級分支另外存在，所以建立 fork 的畫面要取消勾選「只複製預設分支」，班級分支才會一併帶到你的 fork。
2. 進入你的 fork，按綠色 **Code**，複製 HTTPS 網址。
3. 在要放專案的資料夾開啟終端機，執行：

```bash
git clone --branch fe/11601 https://github.com/你的帳號/studiesAdvanced.git
cd studiesAdvanced
```

`fe/11601` 是範例，請換成老師公布的班級分支名稱。

接著用 VS Code 的「檔案 → 開啟資料夾」打開 `studiesAdvanced` 這一層（repo 根目錄），不要只開裡面的子資料夾。根目錄的設定檔、程式碼片段與 Prettier 規則，只有開根目錄才會自動套用，Git 指令也都在這個根目錄執行。

老師更新教材時，先到 GitHub 你的 fork，切到你的班級分支後按 **Sync fork**，再回本機根目錄執行 `git pull`。只在本機 `pull` 拉不到更新，因為你的 `origin` 是你自己的 fork。

{% note info %}
**找不到班級分支時**
先執行 `git fetch origin`，再執行 `git checkout fe/11601`（換成你的班級分支名稱）。
{% endnote %}

練習資料夾與講義的對應如下：

- `01-html-css-js/02-html/`：02 HTML，用 Live Server 開啟。
- `01-html-css-js/03-css/`：03 CSS，用 Live Server 開啟。
- `02-tailwind/`：04 Tailwind，需要 Node 與 pnpm。
- `01-html-css-js/04-js/`：06～08 JavaScript，用 Live Server 開啟。
- `03-react/`、`04-react-router/`：React 與 React Router，需要 Node 與 pnpm。
- `05-project-prototype/`、`06-project-init/`、`07-project-final/`：結業專案。

各資料夾的 `README.md` 有 demo 對照表。

{% note success %}
**跟著做**
1. 在 GitHub fork 原 repo，並確認 fork 裡有老師公布的班級分支。
2. clone 你自己的 fork，網址裡要是你的帳號。
3. 用 VS Code 開啟 `studiesAdvanced` 根目錄。
{% endnote %}

### 建議的 VS Code 套件
**套件（extension）**為編輯器增加功能。用 VS Code 開啟根目錄後，它會讀取 `.vscode/extensions.json` 並跳出「建議安裝」，這份清單只是這個資料夾的推薦，安裝後的套件屬於這台電腦的 VS Code。如果提示沒有出現，在左側活動列的套件頁依名稱搜尋即可。

必裝的六個：

- Live Server（Ritwick Dey）：在本機啟動靜態伺服器，存檔後瀏覽器自動更新。
- Prettier（Prettier）：依規則格式化程式碼，搭配存檔自動排版。
- Tailwind CSS IntelliSense（Tailwind Labs）：Tailwind class 的自動完成與色票提示。
- ES7+ React/Redux/React-Native snippets（dsznajder）：React 常用語法的程式碼片段。
- Git Graph（mhutchie）：用圖形檢視提交歷史與分支。
- Chinese (Traditional) Language Pack（Microsoft）：編輯器界面改為繁體中文。

建議安裝的四個：

- ESLint（Microsoft）：依專案規則標出程式問題。
- Path Intellisense（Christian Kohler）：輸入路徑時自動補全。
- Image Preview（Kiss Tamás）：在行號旁顯示圖片預覽。
- GitHub Copilot（GitHub）：在編輯器內給程式建議，課堂用免費方案即可。

ESLint 與 Tailwind IntelliSense 要到有對應設定的專案才會作用，現在沒反應是正常的。裝完若提示重載，就重載視窗。

{% note success %}
**跟著做**
1. 在已開啟根目錄的 VS Code，安裝必裝的六個，建議的四個也一併裝。
2. 到套件頁確認它們都顯示為已啟用。
{% endnote %}

### 工作區與使用者設定
套件決定有什麼功能，**設定**決定編輯器怎麼運作。VS Code 的設定有兩層：

- **使用者（User）**：存在這台電腦的 VS Code，不管開哪個資料夾都生效，主題與字體常放這裡。
- **工作區（Workspace）**：存在資料夾內的 `.vscode/settings.json`，只對這個資料夾生效，可以跟著 Git 讓全班同一套。兩邊都設定同一項時，工作區優先。

課堂 repo 的工作區設定已經處理好用 Prettier 排版、縮排為兩個空白、結尾換行等規則，開根目錄就會自動套用，不必另外抄到使用者設定。工作區設定也開了自動存檔，Live Server 會在存檔後更新瀏覽器。想改成自己的習慣時，按 <kbd>Ctrl</kbd>+<kbd>,</kbd> 開啟設定頁調整。

### 提交紀錄與 Git Graph
**Git Graph** 把提交畫成點、把分支畫成線，方便對照歷史與目前所在的分支。開啟它的方式是在命令選擇區（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>）輸入 `Git Graph: View Git Graph`，或點選 Git 面板上的 Git Graph 圖示。要開在含 `.git` 的根目錄才看得到完整歷史。

第一次 commit 之前，要先設定寫在提交紀錄上的作者名稱與信箱，這台電腦只要設定一次，內容不必和 GitHub 帳號相同：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的信箱@example.com"
git config --global --list
```

沒設定就 commit 會失敗，並出現「Please tell me who you are」。每次練習告一段落，在根目錄執行：

```bash
git status
git add 你這次改過的檔案
git commit -m "簡短說明這次改了什麼"
git push
```

`push` 會推到你自己的 fork，不是老師的原 repo，Git Graph 上會多出你剛建立的那個點。commit 訊息要寫這次做了哪一部分，不要只寫 `update`。

{% note success %}
**跟著做**
1. 執行上面三行 `git config`，確認 `--list` 看得到名稱與信箱。
2. 開啟 Git Graph，確認目前在你的班級分支。
3. 之後的節奏：自己的練習 commit 再 push；老師有更新時，先在 GitHub 的 fork 切到班級分支並 Sync fork，再在本機 pull。
{% endnote %}

### 認識畫面
先認得區塊即可，不必背介面名稱。

- 左側活動列：切換檔案總管、搜尋、Git、套件。
- 檔案總管：專案的檔案樹，點檔案會在中間開啟。
- 編輯器：寫程式的地方，可以分割視窗。
- 下方面板：終端機、問題、輸出。
- 狀態列：目前的分支與縮排，開啟靜態頁後會出現 **Go Live**。

靜態頁用 Live Server 預覽：在檔案總管對目標資料夾的 `index.html` 按右鍵，選 **Open with Live Server**。

### Emmet
VS Code 內建 **Emmet**：在 HTML 檔輸入縮寫再按 <kbd>Tab</kbd>，展開成完整標記。課堂只用到下面幾組，完整語法可查 [Emmet 速查表](https://docs.emmet.io/cheat-sheet/)。

- `!`：展開成一份 HTML 骨架。
- `div.card`：展開成帶 class 的 `div`。
- `ul>li*3`：三個 `li` 包在 `ul` 裡。
- `a`、`img`：展開成帶空屬性的連結與圖片。
- `lorem`：一段英文假文，`lorem10` 約十個字。
- `ul>li*3>lorem5`：三個列表項，各帶短假文。

### 占位圖
練習需要圖片時，不必準備圖檔。根目錄的 `.vscode/placeholder.code-snippets` 是自訂的**程式碼片段（snippet）**：

- `placehold`：展開成 [placehold.co](https://placehold.co/) 的色塊圖。
- `picsum`：展開成 [picsum.photos](https://picsum.photos/) 的照片。

在 HTML 輸入後按 <kbd>Tab</kbd> 展開，再按 <kbd>Tab</kbd> 依序跳到寬、高與替代文字修改。也可以自己把網址寫進圖片的來源屬性，例如 `placehold.co` 後接 `600x400`。

### 常用快捷鍵
下列以 Windows／Linux 的 <kbd>Ctrl</kbd> 表示，Mac 改用 <kbd>Command</kbd>。

- <kbd>Tab</kbd>：展開 Emmet 或程式碼片段。
- <kbd>Ctrl</kbd>+<kbd>P</kbd>：快速開檔。
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>：命令選擇區，搜尋所有指令。
- <kbd>Ctrl</kbd>+<kbd>`</kbd>：開關終端機。
- <kbd>Ctrl</kbd>+<kbd>B</kbd>：開關側邊欄。
- <kbd>Ctrl</kbd>+<kbd>S</kbd>：存檔。
- <kbd>Ctrl</kbd>+<kbd>/</kbd>：註解或取消註解。
- <kbd>Alt</kbd>+<kbd>↑</kbd>／<kbd>↓</kbd>：整行上移或下移，Mac 用 <kbd>Option</kbd>。
- <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>↓</kbd>：複製整行。
- <kbd>Ctrl</kbd>+<kbd>D</kbd>：選取下一個相同文字，可連按。
- <kbd>Ctrl</kbd>+<kbd>,</kbd>：開啟設定。

{% note success %}
**跟著做**
1. 在 `studiesAdvanced` 新增一個 `.html` 檔。
2. 輸入 `lorem10` 按 <kbd>Tab</kbd>，再輸入 `ul>li*3` 按 <kbd>Tab</kbd>。
3. 輸入 `placehold` 按 <kbd>Tab</kbd>，確認出現 placehold.co 的 `img`；`picsum` 同理。
{% endnote %}

# 選讀：補充觀念
前面已經分清楚瀏覽器、網頁、網站與前後端，並備好環境。下面這些名詞，之後看 Network 面板、寫網址參數或遇到快取時才會用到，現在讀不懂或趕時間可以整章跳過。

## 用戶端、伺服器與埠號
瀏覽器所在的裝置是**用戶端（client）**，提供資源的程式是**伺服器（server）**，兩者透過 **TCP/IP** 連線。HTTP 預設使用**埠號（port）** `80`，HTTPS 預設使用 `443`。本機開發伺服器（Vite、Live Server）常用其他埠，例如 `5173`、`5500`，網址寫成 `http://localhost:5173/`。

`localhost` 與 `127.0.0.1` 都指向自己這台電腦，請求不會送到外網。

## URL 的其他部分
**URI**（Uniform Resource Identifier）是識別資源的字串，URL 是其中能據以取得資源的一種。課堂一律寫 URL，規格文件裡會看到 URI。

完整的 URL 還可能含有：

- 埠：`:5173`，非預設埠時必須寫出。
- 查詢字串（query string）：`?id=1`，`?` 之後的鍵值對，供程式讀取參數。
- 片段識別碼（fragment）：`#top`，`#` 之後指向文件內某個 `id`，不會送到伺服器。

以 `page.html?id=1` 為例，伺服器回傳的仍是同一份 HTML，讀取 `id` 是前端 JavaScript 的工作。

## HTTP 方法與狀態碼
HTTP 訊息由起始行、**標頭（header）**與可選的**主體（body）**組成。常見的方法有：

- **GET**：取得資源，參數放在 URL。
- **POST**：提交資料，例如表單或 JSON，內容放在主體。
- **PUT**／**PATCH**：更新資料。
- **DELETE**：刪除資料。

回應會附一個三位數的**狀態碼（status code）**，由 HTTP 規格（IETF 的 [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110)）統一定義，所以各瀏覽器讀起來意思一致。第一碼代表類別：

- 2XX：成功，例如 `200`。
- 3XX：請改去另一個網址（重新導向），例如 `301`、`302`。
- 4XX：這次請求有問題，例如 `404` 找不到、`403` 沒有權限。
- 5XX：伺服器自己出錯，例如 `500`。

開發時最常看到 `200` 與 `404`，遇到其他號碼先看第一碼即可，不必背。

## 快取
**快取（cache）**是把拿過的回應暫存在較近的地方，下次同一個網址先用這份複本，不必每次重新下載，目的是降低延遲、節省頻寬並減輕伺服器負擔。CSS、JS、圖片、字型改動少、體積大，最適合快取。

快取可能發生在好幾層：瀏覽器自己的 HTTP 快取、公司或電信業者的代理（proxy），以及網站前面的 **CDN**（Content Delivery Network，內容傳遞網路）。開發時最常碰到的是瀏覽器快取：改了 CSS 或 JS 畫面卻沒變，往往是瀏覽器還在用舊複本，不是檔案沒存到。

在 Network 面板，Size 欄出現 from memory cache 或 from disk cache，表示這次沒有重新下載；狀態碼 `304 Not Modified` 表示瀏覽器問過伺服器「檔案有沒有變」，答案是沒變，所以繼續用舊的，這仍是快取命中。

伺服器用回應標頭決定能不能快取、能快取多久，常見的有：

- `Cache-Control: max-age=秒數`：這段時間內直接用快取，不必問伺服器。
- `Cache-Control: no-cache`：可以用快取，但每次先向伺服器再驗證，可能得到 `304`。
- `Cache-Control: no-store`：不存進快取，用於敏感資料。
- `ETag`／`Last-Modified`：讓瀏覽器比對檔案是否仍是同一版。

{% note info %}
**用 Network 對照快取**
停在這篇文章，按 <kbd>F12</kbd> 切到 **Network** 後重新整理，先看 Size 欄；再勾選 Disable cache 後重新整理，同一批 CSS、JS 會改為完整下載。開發期間可以暫時停用快取，正式網站則需要快取。
{% endnote %}

## 媒體類型
**Content-Type**（媒體類型，又稱 **MIME type**）是回應標頭，宣告這段內容該當成哪種格式解讀。副檔名只是慣例，瀏覽器真正依據的是這個標頭。之後用 `fetch` 送 JSON 時，也要帶 `Content-Type: application/json`。

{% note success %}
**跟著做：在本篇文章看 MIME**
用 Chrome 停在這一頁，按 <kbd>F12</kbd> 切到 **Network** 並重新整理。點任一列，在 **Headers** 的 **Response Headers** 找 `content-type`。用面板上方的篩選分類查看：

- Doc：這篇文章本身，通常是 `text/html`，常附 `charset=utf-8`。
- CSS：主題樣式表，`text/css`。
- JS：主題或外掛腳本，`text/javascript`。
- Img：站內圖片，`image/png`、`image/jpeg`、`image/webp` 等。

若標頭與實際格式不符，例如把 CSS 標成 `text/html`，瀏覽器就不會依預期解析。
{% endnote %}

## 字元編碼
文件必須宣告**字元編碼（character encoding）**，課堂使用 **UTF-8** 才能正確顯示繁體中文。HTML 用 `<meta charset="UTF-8">` 告訴瀏覽器。編碼不一致會出現亂碼，作業系統、編輯器與 HTTP 標頭的編碼應該一致。

## 關鍵渲染路徑
瀏覽器把位元組變成畫面的流程，稱為**關鍵渲染路徑（critical rendering path）**：

1. 把 HTML 解碼並建成 DOM。
2. 處理 CSS，得到 **CSSOM**（CSS Object Model，樣式規則的結構樹）。
3. 合併 DOM 與 CSSOM 成**渲染樹（render tree）**，不含 `display: none` 的節點。
4. **排版（layout）**：計算每個元素的大小與位置。
5. **繪製（paint）**與合成：輸出到螢幕。

JavaScript 能讀寫 DOM 與 CSSOM，所以腳本執行的時機會影響解析，稍後學 `defer` 時會用到。Elements 看到的是當下的 DOM，不一定等於磁碟上的原始 HTML。改變寬高、字級會重新排版，成本比只改顏色高。

## 同源政策
瀏覽器會限制「這一頁的程式去讀別的網站的資料」，這套規則稱為**同源政策（Same-Origin Policy）**。**來源（origin）**由協定、主機名、埠三者決定，全部相同才算同源，路徑不算。以 `https://example.com` 為基準：

- `https://example.com/page.html`：同源，只有路徑不同。
- `https://example.com:443/a`：同源，`443` 是 HTTPS 預設埠。
- `http://example.com`：不同源，協定不同。
- `https://api.example.com`：不同源，主機名不同。
- `https://example.com:3000`：不同源，埠不同。
- `http://localhost:5173` 與 `http://localhost:3000`：彼此不同源，本機的兩個埠也算兩個來源。

不同源時，程式不能任意讀取另一個網站的頁面內容，用 `fetch` 要另一個來源的資料時，若對方沒有明確允許，也拿不到回應內容。不過圖片、樣式、腳本檔仍可以被引用進來顯示或執行，被擋的是用程式讀走別人的資料。

伺服器要開放給其他來源讀取，必須在回應加上 **CORS**（Cross-Origin Resource Sharing，跨來源資源共享）標頭。沒有這個標頭時，Console 會出現跨來源錯誤，那是瀏覽器的保護機制，不是 HTML 寫錯。

## 靜態與動態
差別在於伺服器收到請求之後做了什麼，與頁面外觀無關。

![靜態網站由檔案伺服器原樣送出磁碟上的 HTML／CSS／JS；動態網站經應用程式伺服器查資料庫後再組出 HTML](assets/images/static-vs-dynamic-server.png)

- **靜態網站**：回應內容在請求前就是磁碟上的檔案，伺服器找到後原樣送出。GitHub Pages 屬於這一類。
- **動態網站**：請求先到應用程式伺服器，常再查資料庫、判斷權限，現場組出 HTML 或 JSON。同一個網址可依登入身分得到不同內容。

本課的資料來自專案內的 JSON 檔，部署後仍是靜態網站，不需要自己架資料庫。

## 語意化標籤、無障礙與 SEO
瀏覽器、輔助工具、搜尋引擎與**爬蟲（crawler）**讀的是文件的結構與文字，不是畫面上的像素。下面三個觀念常連在一起。

- **語意化標籤（semantic markup）**：標籤名稱承載角色，`nav` 是導覽、`button` 是按鈕、`h1` 是主標題，而 `div` 沒有內建角色。外觀交給 CSS，標記負責說明「這是什麼」。
- **無障礙設計（accessibility，縮寫 a11y）**：螢幕閱讀器與鍵盤操作依文件裡的角色與名稱運作。原生的連結、按鈕、表單控制項本身就能被讀出與聚焦。
- **SEO**（search engine optimization，搜尋引擎優化）：搜尋引擎用爬蟲抓頁並建立索引，依標題與主文判斷主題。越來越多 AI 程式也會讀網頁內容，語意清楚的 HTML 對人與機器都容易讀懂。

{% note info %}
**畫面能看不代表結構正確**
標記語言的工作是描述「這是什麼」，不是「長得像什麼」。
{% endnote %}

## 開發者工具的其他面板
除了前面常用的三個面板，Chrome 的 **Application（應用程式）**面板可以檢視 Cookie 與本機儲存。**Cookie** 是伺服器或腳本寫在用戶端的小型資料，之後的請求會帶上，常用於登入狀態；**`localStorage`** 也是存在用戶端的儲存空間。本課的主線不會用到這些，先知道名字即可。

# 本篇重點回顧
這一篇先對齊用詞與環境，還沒有寫頁面。「選讀：補充觀念」不列入下面的清單。

- 瀏覽器依網址拿回 HTML，再載入樣式、程式與圖片，排版後畫成畫面。
- 網頁是一份文件的呈現，網站是同一個服務連續送出的多份網頁。
- 前端在瀏覽器，負責畫面與互動；後端在伺服器，負責檔案與資料。
- HTML 管結構、CSS 管外觀、JavaScript 管行為，Tailwind 與 React 分別建立在 CSS 與 JavaScript 之上。
- 已安裝 VS Code、Chrome、Git 並有 GitHub 帳號，預覽與開發者工具用 Chrome。
- 已 fork 並 clone `studiesAdvanced` 的班級分支，用 VS Code 開啟 repo 根目錄，設定與片段自動套用。
- 已安裝建議套件並設定 Git 作者資料，練習用 commit 與 push，老師更新時先 Sync fork 再 pull。
- 會用 Emmet、占位圖片段與常用快捷鍵。

# 專有名詞中英對照

## 網頁與網站
- 瀏覽器（browser）
- 網址（URL, Uniform Resource Locator）
- 請求（request）、回應（response）
- 解析（parse）
- 文件物件模型（DOM, Document Object Model）
- 子資源（subresource）
- 排版（layout）、繪製（paint）
- 網頁（web page）
- 超文本標記語言（HTML, HyperText Markup Language）
- 元素（element）、標籤（tag）
- 超連結（hyperlink）
- 使用者代理樣式表（user agent stylesheet）
- 網域名稱系統（DNS, Domain Name System）
- 網站（website）
- 單頁應用（SPA, Single Page Application）
- 前端（front-end）、後端（back-end）

## 為什麼要學這些技術
- 框架（framework）
- 函式庫（library）
- 元件（component）
- 狀態（state）

## 初始安裝設定
- 開發者工具（DevTools）
- 版本控制系統（VCS, version control system）
- 儲存庫（repository, repo）
- 分支（branch）
- 套件（extension）
- 使用者設定（User settings）、工作區設定（Workspace settings）
- 程式碼片段（snippet）

## 選讀：補充觀念
- 用戶端（client）、伺服器（server）
- 埠號（port）
- 查詢字串（query string）、片段識別碼（fragment）
- 標頭（header）、主體（body）
- 狀態碼（status code）
- 快取（cache）、內容傳遞網路（CDN, Content Delivery Network）
- 媒體類型（MIME type）
- 字元編碼（character encoding）
- 關鍵渲染路徑（critical rendering path）
- 渲染樹（render tree）
- 來源（origin）、同源政策（Same-Origin Policy）
- 跨來源資源共享（CORS, Cross-Origin Resource Sharing）
- 語意化標籤（semantic markup）
- 無障礙設計（accessibility, a11y）
- 搜尋引擎優化（SEO, search engine optimization）
- 爬蟲（crawler）
