---
title: "Tailwind：utilities、RWD、深色模式"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
  - TailwindCSS
date: 2026-08-30 10:03:00
---

![Tailwind CSS](assets/images/banner/tailwind.png)

Tailwind CSS 把常用的 CSS 宣告做成一粒一粒的 class，稱為 utility（工具類）。名字多半是「屬性－值」：`bg-teal-700` 是背景色，`p-4` 是內距。這一篇先在一台乾淨的電腦裝好 Node 工具鏈與 Vite（環境只建立一次），再從 utility-first 的基本讀法，一路學到 hover、focus 等狀態變體、跟著系統的深色模式、手機優先的 RWD 與容器查詢，最後用 `@theme` 加上自己的顏色、間距與字型。Preflight、Play CDN、group 與 peer、導覽列、手動深色切換，以及 `@layer` 與 `@utility` 是選讀。

<!-- more -->

刻度、色票與前綴總表在 {% post_link lokiTech-15day-05-tailwind-cheatsheet Tailwind CSS v4 公式表 %}（選讀附錄，不佔上課時間）。這一篇先在一台乾淨的電腦裝好 Node、pnpm 與 Vite，再走 Tailwind 的觀念。每個題目看一到兩個範例，再自己改一處。預覽以 Chrome 為準。按 <kbd>F12</kbd> 看 **Elements → Styles**，核對的是編成之後的 CSS。

{% note info %}
**網路上的舊版設定檔**
很多教學是 Tailwind v3 的寫法，會要你另外建立一份 JavaScript 設定檔。本課用 v4，主題設定直接寫在 CSS 裡，看到那種 config 檔可以當成舊版做法。

```js
// v3 教學常要你建立 tailwind.config.js
// 本課主題寫在 CSS 的 @theme，不建這份檔
```
{% endnote %}

# 建立 Node 開發環境

Tailwind 的 class 要先編成一般 CSS，瀏覽器才看得懂；編譯、安裝套件、開發伺服器，都跑在 **Node.js**（讓 JavaScript 離開瀏覽器、在電腦上執行的環境）上。這一章假設這台電腦剛還原、還沒裝過任何工具：先用 nvs 安裝 Node 26，再安裝 pnpm，接著認識 Vite 並手動做一個小專案，最後改用課堂準備好的練習專案。環境只在這裡建立一次，後面的章節都從準備好的資料夾開始。

{% note info %}
**本課使用的版本**
以 2026 年 11 月為準，課堂工具的主版本是：Node 26（長期支援版）、pnpm 12、Vite 8、Tailwind CSS 4、React 19、React Router 8、ESLint 10、Prettier 3，專案另外用到 MUI 9。講義只寫到主版本，小版本以練習專案的 `package.json` 與鎖定檔為準，所以重新安裝後版本號可能比講義畫面新一點，用法不變。看到網路教學版本差很多時，先確認主版本是否一樣。
{% endnote %}

{% note info %}
**已經裝過的人可以跳過**
每一步開頭都有跳過的說明。仍請在新的終端機執行 `node -v` 與 `pnpm -v`，確認是 Node 26，而且找得到 pnpm。
{% endnote %}

## 安裝 Node 工具鏈

這一節把前端專案的底層工具裝好：先說明為什麼需要 Node，再用 nvs 安裝並切換 Node 26，最後安裝 pnpm。做完後，新開的終端機要能印出 Node 與 pnpm 的版本號。

### 為什麼需要 Node

Node.js 在這門課只負責工具：安裝套件、啟動開發伺服器、把專案編成可以上線的檔案。我們不用它寫後端，也不需要先懂 Node 的伺服器程式。

直接到 [Node.js 官網](https://nodejs.org/) 下載安裝檔，一台電腦只會有一個版本。Node 更新很頻繁，各個專案需要的版本又不同，所以業界通常用版本管理工具，讓同一台電腦保留多個版本、需要時再切換。課堂使用 **nvs**（Node Version Switcher），它在 Windows、macOS、Linux 的指令一致，也能依專案資料夾裡的版本檔自動切換。

### 用 nvs 安裝 Node 26

下面三個步驟依序完成：安裝 nvs、用它裝 Node 26、設定進入專案時自動切換版本。

#### 步驟 1：安裝 nvs

{% note info %}
**已安裝過可跳過**
已安裝過 nvs 可跳過此步。終端機輸入 `nvs`，出現版本選單即可。
{% endnote %}

Windows 用安裝檔或套件管理器；macOS 沒有安裝檔，改在終端機執行官方的安裝指令。裝好後，已經開著的終端機不會更新，要關掉重開（Windows 請完全關掉 VS Code 再開）。

- Windows：到 [nvs 的 Releases](https://github.com/jasongin/nvs/releases) 下載 `.msi` 一路下一步，或在 PowerShell 執行 `winget install jasongin.nvs`。
- macOS：在終端機執行下面三行（需要 01 工具篇裝好的 Git）。`install` 會把 nvs 寫進你的 shell 設定檔，所以新開的終端機才會生效。

```bash
export NVS_HOME="$HOME/.nvs"
git clone https://github.com/jasongin/nvs "$NVS_HOME"
. "$NVS_HOME/nvs.sh" install
```

#### 步驟 2：安裝 Node 26

{% note info %}
**已安裝過可跳過**
已安裝過 Node 26 可跳過此步。`node -v` 顯示 `v26` 開頭即可。
{% endnote %}

課堂固定使用 **Node 26**（2026 年 10 月起的長期支援版）。三行指令分別負責下載、切換目前這個終端機，以及設成以後新開終端機的預設版本：

```bash
nvs add 26     # 把 Node 26 下載到這台電腦
nvs use 26     # 只影響目前這個終端機
nvs link 26    # 之後新開的終端機預設也是 26
node -v        # 應印出 v26 開頭的版本號
```

`nvs ls` 可以列出這台電腦已經有的 Node 版本。

#### 步驟 3：用 .nvmrc 自動切換

在專案資料夾放一個只寫版本號的文字檔 `.nvmrc`，nvs 就知道這個專案要用哪一版。這個檔名是 nvm 的慣例，nvs 也讀得懂，同事不管用哪套工具都能依同一份檔案切換。練習專案已經附好這個檔：

```text 02-tailwind/.nvmrc
26
```

自動切換預設是關閉的，要先打開一次。打開後，進入有版本檔的資料夾，Node 會換成檔案指定的版本（還沒裝會自動下載），離開資料夾則回到預設版本。不想開自動切換，進資料夾後手動執行第二行也可以。

```bash
nvs auto on    # 之後 cd 進有 .nvmrc 的資料夾就自動切換
nvs use auto   # 不開自動切換時，進資料夾後改執行這行
```

{% note info %}
**自動切換的小提醒**

- Windows 請用 PowerShell 或 VS Code 的終端機（預設就是 PowerShell），命令提示字元（cmd）不支援自動切換。
- 版本檔也可以叫 `.node-version`，nvs 一樣會讀；nvm 只認 `.nvmrc`，所以課堂統一用這個檔名。
{% endnote %}

### 安裝 pnpm

**套件管理器**負責下載專案需要的工具（例如 Vite、Tailwind）並記住版本。Node 自帶的是 **npm**，課堂改用 **pnpm**：同一個版本的套件在整台電腦只存一份，而且專案沒有寫進 `package.json` 的套件不能被匯入。npm 有時匯得到沒宣告的套件，這種沒寫卻用得到的依賴叫**幽靈依賴**，換一台電腦就可能壞掉。

Node 26 不再內建 corepack（早期版本附的 pnpm 啟用工具），所以要自己安裝 pnpm。Node 附的 npm 就能裝，一行指令即可。

{% note info %}
**已安裝過可跳過**
已安裝過 pnpm 可跳過此步。`pnpm -v` 印得出版本號即可。
{% endnote %}

```bash
npm install -g pnpm@latest   # 用 npm 把 pnpm 裝成全域指令
pnpm -v                      # 印出版本號就成功了
```

裝好後要關掉目前的終端機再開一個新的，`pnpm` 才會被找到。Windows 若出現權限不足，用「以系統管理員身分執行」開一次終端機，只跑第一行，再回到 VS Code 的終端機執行 `pnpm -v`。pnpm 官方的 [安裝說明](https://pnpm.io/installation) 還有其他安裝方式（例如獨立安裝指令），在 Windows 上官方建議用 npm 安裝，避免防毒軟體擋下執行檔。

npm 與 pnpm 的指令幾乎一一對應，課堂後面都用 pnpm：

- 安裝專案套件：`npm install` 對應 `pnpm install`。
- 新增開發用套件：`npm install -D 套件` 對應 `pnpm add -D 套件`。
- 執行腳本：`npm run dev` 對應 `pnpm dev`（也可以寫成 `pnpm run dev`）。
- 磁碟用量：npm 每個專案各存一份套件，pnpm 全機共用。

## 用 Vite 建立 Tailwind 專案

工具裝好後，這一節先認識 Vite 的角色，再從空白範本自己做出一個 Tailwind 專案，確認整條流程走得通；最後換到課堂準備好的 `02-tailwind`，讓大家的練習環境一致。

### 認識 Vite

**Vite**（發音 /vit/）同時是開發伺服器與打包器。開發時它在本機起一個網站，瀏覽器依 ES modules（瀏覽器原生的模組載入方式）向它索取目前用到的檔案，存檔後只更新改動的那一塊，所以啟動和更新都很快。

上線時不能靠開發伺服器，而是執行建置：把用到的模組打包、壓縮成成品資料夾，減少請求次數，也去掉沒用到的程式。Tailwind 的插件在這兩個階段都會執行：開發時即時編成你正在看的 CSS，建置時把 CSS 放進成品。直接雙擊 HTML 開啟是 `file:` 網址，不會經過 Vite，utility 也就不會生效。

### 手動建立專案

先在練習倉庫裡把流程走通：用 Vite 的空白範本建專案、加上 Tailwind、改一個 class 看畫面、再產出成品。專案叫 `sandbox`，建在倉庫根目錄，和後面準備好的課堂專案分開，做壞了刪掉重建即可。倉庫根目錄的 `.gitignore` 已經忽略 `node_modules` 與 `dist`，但沒有忽略 `sandbox` 本身，所以它會出現在 Git 的變更清單裡。這只是試做用的資料夾，不要加入版本控制，確認完流程就整個刪掉。

#### 建立專案

在 VS Code 開新的終端機，它會停在倉庫根目錄（Windows 多半是 PowerShell，macOS 是 zsh，下面的指令兩邊相同）。這是第一行建立專案的指令，先看完整版，再看逐項說明：

```bash
pnpm create vite@latest sandbox --template vanilla --no-immediate
```

```bash
pnpm create          # 執行專案產生器：暫時下載 create-xxx 套件來跑，用完不留在電腦上
  vite@latest        # 產生器是 create-vite，@latest 表示用最新版
  sandbox            # 專案資料夾名稱，建在目前所在的倉庫根目錄
  --template vanilla # 範本：vanilla 是不加框架的純 JavaScript；另有 react、vue 等
  --no-immediate     # 建好後不要自動安裝與啟動，由我們自己一步步做
```

產生器只負責放檔案，還沒有下載任何套件，所以接著進入資料夾，依範本的 `package.json` 安裝：

```bash
cd sandbox     # 進入剛建立的專案資料夾
pnpm install   # 依 package.json 下載套件到 node_modules/
```

#### 加入 Tailwind

範本此時還不認得 Tailwind 的 class。下面三步接上 Tailwind v4 的 Vite 插件，並讓入口 CSS 載入它。官方說明見 [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)。

##### 步驟 1：安裝套件

這兩個套件只在開發與建置時使用，所以用 `-D` 加進開發依賴：

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

##### 步驟 2：建立 vite.config.js

範本沒有這份設定檔，請在專案根目錄新增，把 Tailwind 註冊成 Vite 插件：

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

{% note info %}
**舊教學的 postcss.config.js、tailwind.config.js**
Tailwind v3 以前是 PostCSS（用 JavaScript 處理 CSS 的工具）的插件，所以舊教學會要你建立 `postcss.config.js`、`tailwind.config.js`，並在 CSS 寫三行 `@tailwind` 指令。

v4 改成自己的編譯引擎，在 Vite 專案裡直接當插件執行，前綴處理也已內建。主題設定改寫在 CSS 裡，下一章會看到。看到這些舊寫法的教學，多半是 v3，課堂上不用照做。
{% endnote %}

##### 步驟 3：匯入 tailwindcss

把 `src/style.css` 的內容整份換成下面這一行。範本原本的 CSS 會干擾你要試的 utility，所以不要留著：

```css
@import 'tailwindcss';
```

範本的 `src/main.js` 已經會載入這份 CSS，不用再改。接著打開 `index.html`，在 `body` 裡原本的容器前面加一行標題。class 要寫成完整的名稱，Tailwind 才掃描得到：

```html
<body>
  <!-- 新增這行：text-3xl 字級、font-bold 粗體、text-teal-700 深青綠字 -->
  <h1 class="text-3xl font-bold text-teal-700">Tailwind 有編譯到</h1>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
```

#### 啟動與建置

在 `sandbox` 目錄啟動開發伺服器。終端機會印出 Local 網址，多半是 `http://localhost:5173/`，用 Chrome 打開，應看到那行青綠色大字；看完按 <kbd>Ctrl</kbd>+<kbd>C</kbd> 停止。

```bash
pnpm dev     # 日常開發
pnpm build   # 輸出到 dist/：打包後的成品，不是正在編輯的 src/
```

日常開發只用開發伺服器，要交付靜態檔時才執行建置。

### 改用 02-tailwind 練習環境

試做專案確認工具鏈沒問題即可，之後想試新寫法也能回來用。後面的範例都在課堂專案 `02-tailwind`，Tailwind 插件、入口 CSS 與 Prettier 已經接好。請在 VS Code 新開一個終端機（它會開在倉庫根目錄，若還停在 `sandbox`，先回到根目錄），再進入專案、安裝、啟動：

```bash
cd 02-tailwind   # 後面的範例都在這裡
pnpm install
pnpm dev
```

同樣用終端機印出的 Local 網址開 Chrome，再依各章指定的檔名開啟 `pages/` 裡的範例。建置結果會輸出到 `02-tailwind/dist/`。專案的 `package.json` 要求 Node 26 以上；安裝時若抱怨版本，先用 `node -v` 確認，並確認終端機已經進到這個資料夾，版本檔才會讓 nvs 切換。

{% note info %}
**為什麼這裡不用 iframe**
02、03 的練習站用左邊選單加 iframe，是因為當時還沒有 Node 與 Vite，只能讓瀏覽器在同一頁裡再開一頁。02-tailwind 跑在 Vite 上，不再需要 iframe：`pages/` 裡每個範例都是完整、獨立的網頁，網址列就是目前這一頁，可以重新整理、加書籤或分享，Tailwind 也掃描得到每一頁的 class。

正式網站的共用頁首、頁尾，是在建置或伺服器端組合進每一頁，同樣不會用 iframe 拼頁面。
{% endnote %}

專案裡幾個檔案的角色：頁面在結尾載入入口腳本，`type="module"` 讓 Vite 處理裡面的 `import`，路徑開頭的斜線代表專案根目錄。

```html
<!-- 放在 body 結尾 -->
<script type="module" src="/src/main.js"></script>
```

```js 02-tailwind/src/main.js
import './style.css';
```

入口 CSS `src/style.css` 的第一行就是匯入 Tailwind，後面的主題設定會寫在同一份檔案裡：

```css
@import 'tailwindcss';
```

排版交給專案裡的 Prettier：要分號、單引號、2 空格縮排。VS Code 的 Tailwind CSS IntelliSense 擴充會在你輸入 class 時列出候選，可以直接選用。

```json 02-tailwind/.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

# 認識 Tailwind

Tailwind 讓每個 class 只做一件事，樣式的組合直接發生在標籤上。這一章先把同一張卡片的兩種寫法並排比較，再練習怎麼讀一個 class 名字：字首代表哪個屬性、最後一段是色階還是字級，最後看編譯器為什麼只輸出原始碼裡出現過的完整字串。按鈕和卡片的排版留到後面的章節。

## 用 class 描述外觀

這一節先比較傳統選擇器與 utility 的差別，再依序練習怎麼讀名字：屬性與值、色階與透明度。所有名稱的完整對照在 05 速查表，這裡只練習對上畫面。

### utility-first 是什麼

傳統寫法把內距、圓角、背景收進同一個選擇器，改一個圓角要先找到它，而且元件愈多，要取的名字和要維護的規則也愈多。**utility-first**（原子化 CSS）把設計系統裡量好的間距、顏色、字級做成固定詞彙，一個 class 只管一件事，直接寫在標籤上。見 [用 utility 寫樣式](https://tailwindcss.com/docs/styling-with-utility-classes)。

**觀念**

下面左邊那張卡的外觀寫在 `style` 的選擇器裡，右邊同一張卡把同一組外觀拆成標籤上的 class。畫面要長得幾乎一樣，差別在日後改顏色：左邊要回去找選擇器，右邊直接改那一個 class。

{% note info %}
**同一個屬性只留一個 class**
兩個 class 若改到同一個 CSS 屬性，誰勝出取決於它們在編譯後樣式表裡的順序，而不是寫在標籤上的順序。例如 `p-4` 和 `p-8` 都改四邊內距，同時留著只會讓人誤以為兩個都有效。
{% endnote %}

```html 02-tailwind/pages/01-compare.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>傳統 CSS 與 utility</title>
    <style>
      /* 只服務左邊。最大寬度、圓角、白底、陰影收在同一個選擇器 */
      .trip-card {
        max-width: 24rem;
        overflow: hidden;
        border-radius: 1rem;
        background: #fff;
        box-shadow:
          0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);
      }
      /* 高 11rem、寬 100%、裁切填滿。display:block 拿掉圖片底部的縫 */
      .trip-card img {
        display: block;
        height: 11rem;
        width: 100%;
        object-fit: cover;
      }
      .trip-card .body {
        padding: 1.25rem;
      }
      /* 眉題：較小字、字重 500、字距略開、青綠 */
      .trip-card .meta {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.025em;
        color: #0f766e;
      }
      .trip-card h2 {
        margin: 0.5rem 0 0;
        font-size: 1.25rem;
        font-weight: 600;
      }
      .trip-card .summary {
        margin: 0.5rem 0 0;
        color: #57534e;
        font-size: 0.875rem;
        line-height: 1.5rem;
      }
      .trip-card .price {
        margin: 0.75rem 0 0;
        color: #134e4a;
        font-size: 1.125rem;
        font-weight: 600;
      }
      .trip-card a {
        display: inline-block;
        margin-top: 1rem;
        border-radius: 0.5rem;
        background: #0f766e;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #fff;
        text-decoration: none;
      }
    </style>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="mb-2 text-2xl font-bold">同一張行程卡，兩種寫法</h1>
    <p class="mb-6 max-w-prose text-sm leading-6 text-stone-600">
      左右兩張是同一趟花蓮小團。左邊外觀收在 style，右邊把同一組外觀拆到標籤上。
    </p>
    <div class="flex flex-wrap items-start gap-6">
      <article class="trip-card">
        <img src="https://picsum.photos/id/1015/800/500" alt="太魯閣步道" />
        <div class="body">
          <p class="meta">花蓮 · 3 天</p>
          <h2>太魯閣與七星潭</h2>
          <p class="summary">清晨走峽谷步道，下午到七星潭看海。含兩晚住宿。</p>
          <p class="price">NT$16,800</p>
          <a href="#book">看行程</a>
        </div>
      </article>
      <article class="max-w-sm overflow-hidden rounded-2xl bg-white shadow-md">
        <!-- 圓角 1rem、白底、中等陰影、超出的圖片被裁掉。對齊左邊的 .trip-card -->
        <img class="h-44 w-full object-cover" src="https://picsum.photos/id/1016/800/500" alt="七星潭海岸" />
        <div class="p-5">
          <!-- text-xs 字級、tracking-wide 字距、text-teal-700 文字色 -->
          <p class="text-xs font-medium tracking-wide text-teal-700">花蓮 · 3 天</p>
          <h2 class="mt-2 text-xl font-semibold">太魯閣與七星潭</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">清晨走峽谷步道，下午到七星潭看海。含兩晚住宿。</p>
          <p class="mt-3 text-lg font-semibold text-teal-900">NT$16,800</p>
          <!-- bg-teal-700 只管背景，px-4 py-2 只管內距，rounded-lg 只管圓角 -->
          <a class="mt-4 inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white" href="#book">
            看行程
          </a>
        </div>
      </article>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 頁面是淺石色底，標題下面有一行說明，再來是兩張並排的卡片；視窗寬度小於約 840px（兩張卡加間距與頁面留白）時，右邊那張會換到下一行。
- 兩張卡的結構相同：上方是橫幅照片，下面依序是青綠色小字眉題、標題、灰色摘要、深青綠價錢，最後是青綠底白字的連結。
- 圖片的上方兩個角跟著卡片的圓角被裁掉，這是 `overflow-hidden` 搭配圓角的效果。
- 左邊的外觀集中在 `style` 的選擇器裡，要把按鈕改色，得回去改連結那條規則。
- 右邊每一塊的顏色、留白、圓角都在自己的標籤上，改價錢顏色只動價錢那一個 class。
- 右邊的 `shadow-md` 與左邊 `box-shadow` 寫的值相同，所以兩張卡的陰影一致。

### 屬性與值

讀 class 時先看最後一段，再看字首。這一節用一則課程公告，把「文字顏色」和「字的大小」放進同一張卡片，因為兩者的字首都是 `text`。

**觀念**

名字大多是「屬性－值」，中間用連字號分開：字首代表要改哪個 CSS 屬性，最後一段是顏色、字級或色階。字首後面若是色族加數字，就是顏色；若是 sm、xl 這類尺寸詞，就是大小。字級見 [font-size](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#font-size)，色名見 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)。

**一覽**

- 字首 `bg` 接色名，是背景色。
- 字首 `text` 接色名，是文字顏色；接字級，是字的大小。同一個字首會因後面的值變成不同屬性。

```html 02-tailwind/pages/02-naming.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>命名</title>
  </head>
  <body class="bg-stone-50 p-6 text-stone-900">
    <article class="max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <!-- text-sm 是字級；text-teal-700 是文字顏色。兩個 text- 各管一件事 -->
      <p class="text-sm font-medium text-teal-700">2026 春季梯</p>
      <!-- text-3xl 接到字級，所以是 font-size，不是顏色 -->
      <h1 class="mt-1 text-3xl font-bold text-stone-900">花蓮太魯閣三日</h1>
      <!-- text-base 是內文字級；text-stone-600 是比純黑柔的內文色 -->
      <p class="mt-3 text-base leading-7 text-stone-600">
        第一天進太魯閣，第二天走清水斷崖，第三天在七星潭解散。含兩晚住宿與早餐。
      </p>
      <!-- text-2xl 把價錢放大；text-teal-900 把價錢塗成深青綠 -->
      <p class="mt-4 text-2xl font-semibold text-teal-900">NT$16,800</p>
      <!-- bg- 是背景色，跟 text- 的文字色分開 -->
      <a class="mt-5 inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white" href="#dates">
        看這梯日期
      </a>
    </article>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 畫面是一張白底卡片：最上面是又小又綠的眉題，標題明顯大上一截，字色接近黑。
- 內文比標題小、字色偏灰、行距較鬆；價錢再放大，換成深青綠；最下面是青綠底白字的連結。
- 眉題同時有小字和綠色，所以是兩個 class：一個管大小，一個管顏色。
- 標題的 `text` 後面接到字級，所以只把字放大，不會順便上色。
- 按鈕的青綠來自背景那個 class，和眉題的文字色是兩件事。

### 色階與透明度

同一個色族從很淺排到很深，這一節把淺底、標籤、實心按鈕和半透明橫條放在同一張卡片上，看出數字與斜線各自改什麼。

**觀念**

這個範例的排版 class（定位、間距）後面章節才教，先照抄即可，只看顏色相關的名字。每個色族從很淺排到很深，數字越小越淺：最淺的幾階常用來當底，偏深的幾階用來當字或實心按鈕。顏色後面接斜線加數字，是把這一個顏色的不透明度降到那個百分比，其他部分不受影響。色階見 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)，讓整個元素一起變淡見 [opacity](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#opacity)。

```html 02-tailwind/pages/05-palette.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>色票與色階</title>
  </head>
  <body class="bg-teal-50 p-6 text-teal-950">
    <!-- bg-teal-50：同一色族最淺那階當頁面底 -->
    <article class="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-md">
      <div class="relative">
        <img class="h-52 w-full object-cover" src="https://picsum.photos/id/1015/800/500" alt="清水斷崖海岸" />
        <!-- bg-teal-900/70：深青綠，斜線把不透明度降到 70%，照片會透出來 -->
        <p class="absolute inset-x-0 bottom-0 bg-teal-900/70 px-4 py-2 text-sm text-white">剩餘 4 席</p>
      </div>
      <div class="space-y-3 p-5">
        <div class="flex flex-wrap gap-2">
          <!-- bg-teal-100 淺底、text-teal-800 深字 -->
          <p class="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">花蓮 · 一日</p>
        </div>
        <!-- text-teal-950：這一族最深的一階當標題 -->
        <h1 class="text-2xl font-bold">清水斷崖日出</h1>
        <!-- text-teal-900/80：同一顆深色，只把字的不透明度降到 80% -->
        <p class="text-sm leading-6 text-teal-900/80">
          清晨從花蓮市區出發，在觀景台等第一道陽光。回程經七星潭，下午解散。
        </p>
        <!-- bg-teal-700：偏深的實心，配白字 -->
        <a class="inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white" href="#book">
          報名這梯
        </a>
        <!-- 淺琥珀底配深字，跟青綠色行程分開 -->
        <p class="rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-950">雨備：若風浪過大，改走七星潭步道。</p>
      </div>
    </article>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 整頁底是很淺的青綠，中間一張白卡；照片底部壓著一條深色橫條，照片還透得出來，因為這條底色的不透明度只有 70%。
- 淺底深字的標籤，和實心底配白字的按鈕不是同一階；標題是這個色族最深的一階，摘要同樣是深色但略淡。
- 最下面一段改用琥珀色族：淺琥珀底配深色字，和青綠色的行程資訊區分開。
- 斜線只降低那一個顏色的不透明度。要讓橫條更透，只改斜線後面的數字；若改成整個元素一起變淡，連字也會跟著淡掉，席次那行就難讀了。

### 間距單位

內距、外距和元素之間的縫用同一套數字。這一節用一張卡片，把卡片內距、標題外距、標籤縫和清單縫分開看。

**一覽**

- 內距：`p-` 四邊，`px-` 左右，`py-` 上下。
- 外距：`m-` 四邊，`mt-` 只有上方。
- 縫：`gap-` 用在 flex 或 grid，讓子元素彼此相距。
- 直向間距：`space-y-` 讓上下相鄰的子元素相距，橫向對應 `space-x-`。

**觀念**

後面的數字是刻度。Tailwind 以 `0.25rem` 為一格，數字 4 就是四格，也就是 1rem，字級 16px 時是 16px。刻度是 rem，所以使用者調大瀏覽器字級時間距跟著放大。只換字首，同一個數字就落在不同方向或不同位置。刻度對照見 [padding](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#padding)。

{% note info %}
**同一軸留一種縫**
相鄰元素的距離，父層用縫或用外距，擇一即可。同一顆元素又寫縫又寫上下外距，空隙會疊加，之後很難調。
{% endnote %}

```html 02-tailwind/pages/15-scale.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>間距刻度</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <!-- p-6：6 × 0.25rem = 1.5rem，頁面四邊內距 -->
    <article class="max-w-md rounded-2xl bg-white p-6 shadow-sm">
      <h1 class="text-2xl font-bold">第一天 · 花蓮市區</h1>
      <!-- mt-2：只有上外距 0.5rem，把說明推離標題 -->
      <p class="mt-2 text-sm text-stone-600">車站東門集合，走完市區再北上七星潭。</p>
      <!-- gap-3：標籤彼此相距 0.75rem。這一組只用 gap，不再寫 space-y -->
      <div class="mt-4 flex flex-wrap gap-3 text-sm">
        <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">集合 08:30</span>
        <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">車站東門</span>
        <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">含午餐</span>
      </div>
      <!-- space-y-3：清單上下相鄰的項目相距 0.75rem -->
      <ul class="mt-4 space-y-3 text-sm leading-6 text-stone-700">
        <!-- px-4 py-3：左右 1rem、上下 0.75rem，跟父層的縫是兩件事 -->
        <li class="rounded-lg bg-stone-50 px-4 py-3">上午：松園別館散步</li>
        <li class="rounded-lg bg-stone-50 px-4 py-3">中午：公正街包子</li>
        <li class="rounded-lg bg-stone-50 px-4 py-3">下午：七星潭看海</li>
      </ul>
      <!-- px-4 py-2：左右 1rem、上下 0.5rem；mt-6 把按鈕再往下推 1.5rem -->
      <a class="mt-6 inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white" href="#day1">
        看集合地圖
      </a>
    </article>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 淺石色頁面上有一張白卡，卡片和視窗邊緣有一圈留白，卡片裡的文字也沒有貼邊，這是兩層內距。
- 標題和灰色說明之間的空隙來自說明自己的上外距。
- 三顆淺青綠標籤排成一列，彼此的縫寫在父層；放不下時會換行，換行後上下也有縫。
- 三列清單各有淺底，列與列之間的距離寫在 `ul` 上，列裡的左右與上下留白寫在每個 `li` 上，兩者是不同的事。
- 最下面的連結離最後一列更遠，因為它多了較大的上外距；連結本身左右寬、上下扁。

### 選讀：Preflight 重置了什麼

Preflight 是 Tailwind 隨入口那一行帶進來的基礎樣式，把各瀏覽器不一致的預設樣式清成同一張白紙。理解它之後，遇到標題變得和內文一樣大、清單沒有圓點，就知道是正常現象。

**一覽**

- 外距與內距：所有元素的預設外距、內距歸零，標題和段落不再自帶間隔。
- 盒模型與邊框：寬高把邊框算在裡面；邊框預設是無，所以只寫 `border` 會得到 1px、顏色跟著文字色的實線。
- 標題：字級與字重和內文相同，要自己加大。
- 清單：沒有圓點或數字，要用 `list-disc` 這類 class 找回來。
- 圖片、影片等：變成區塊，最大寬度不超過父層。
- 按鈕與表單：字型繼承周圍文字；按鈕的游標是預設箭頭，不是手指。

**觀念**

這些重置是刻意的：全部清掉之後，每個間距和大小都由你寫的 class 決定，不會有看不見的預設值混進來。缺點是剛開始會覺得版面「塌」在一起，補法是在父層寫直向間距，或給需要的元素加上外距。

下面兩張卡的內容完全相同。左邊沒有寫任何外距，右邊只在父層加了直向間距。

```html 02-tailwind/pages/29-preflight.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preflight</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="mb-2 text-2xl font-bold">預設外距被拿掉之後</h1>
    <p class="mb-6 max-w-prose text-sm text-stone-600">左邊那張卡沒有另外加上外距，右邊用父層把同一份內容撐開。</p>
    <div class="flex flex-wrap items-start gap-6">
      <!-- w-80 是 20rem。border-4 的框算在這 20rem 裡面，卡片不會因為加框變寬 -->
      <section class="w-80 max-w-full rounded-2xl border-4 border-stone-200 bg-white p-5">
        <p class="text-sm font-medium text-teal-700">花蓮小團</p>
        <h2 class="text-xl font-semibold">太魯閣三日</h2>
        <p class="text-sm text-stone-600">清晨進峽谷，下午到海邊。</p>
        <!-- 清單被重置成沒有圓點，要自己加 list-disc 與左內距 -->
        <ul class="list-disc pl-5 text-sm text-stone-700">
          <li>太魯閣步道</li>
          <li>七星潭</li>
        </ul>
        <!-- 圖片是區塊、最大寬度 100%，所以獨佔一行，不會跟文字並排 -->
        <img class="w-full rounded-lg" src="https://picsum.photos/id/1016/800/500" alt="七星潭海岸" />
        <!-- 按鈕沒有另外設定字型，跟旁邊內文用同一套字 -->
        <button type="button" class="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">我要報名</button>
      </section>
      <!-- space-y-4：子元素上下相距 1rem，補回被拿掉的預設外距 -->
      <section class="w-80 max-w-full space-y-4 rounded-2xl border-4 border-stone-200 bg-white p-5">
        <p class="text-sm font-medium text-teal-700">花蓮小團</p>
        <h2 class="text-xl font-semibold">太魯閣三日</h2>
        <p class="text-sm text-stone-600">清晨進峽谷，下午到海邊。</p>
        <ul class="list-disc pl-5 text-sm text-stone-700">
          <li>太魯閣步道</li>
          <li>七星潭</li>
        </ul>
        <img class="w-full rounded-lg" src="https://picsum.photos/id/1016/800/500" alt="七星潭海岸" />
        <button type="button" class="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">我要報名</button>
      </section>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 兩張白卡並排，都有一圈石色框；視窗太窄時右邊那張會換到下面。
- 左邊的眉題、標題、摘要、清單、照片和按鈕緊緊疊在一起，標題比摘要大只是因為 class 另外給了字級，不是預設樣式。
- 右邊同一份內容被父層的直向間距撐開，每一塊之間都有固定的縫，整張卡比左邊高。
- 兩張卡的外框寬度相同，框線沒有讓卡片變寬，因為邊框算在寬度裡面。
- 照片獨佔一行，因為圖片預設是區塊；清單的圓點是 `list-disc` 補回來的。
- 按鈕的字跟內文同一套，因為按鈕繼承字型。

## 只輸出用到的 class

Tailwind 不會把所有 class 都放進樣式表，只編出專案原始碼裡找得到的。這一節看編譯器怎麼找，以及這個規則對寫法的限制。

**觀念**

編譯器把專案裡的檔案當成純文字，切出看起來像 class 的字串，對得上某個 utility 才產生那一條 CSS。它不會執行或理解程式，所以要記得三件事：

- 名字必須完整出現在檔案裡。把前半段和色名拆開再接起來的寫法，掃不到。
- 掃的是檔案文字，不分註解、說明文字或標籤屬性。文字裡提到完整的 class 名字，就會產生那條樣式。
- 範圍是整個專案：編成的樣式表只有一份，所有頁面共用。排除的是 `.gitignore` 列出的檔案、`node_modules`、圖片這類二進位檔、CSS 檔和 lockfile。

瀏覽器載入頁面之後才改動的 class，編譯器看不到，這也是為什麼在 DevTools 手動加上沒用過的名字沒有效果。

{% note warning %}
**class 要整串寫出來**
拼接出來的名字不會被收進樣式表。要依狀況換色，就把每一種完整名字都寫在原始碼裡，之後的 React 專案也是同樣的寫法。
{% endnote %}

```text
bg-${color}-500        掃不到：完整名字從沒出現過
bg-teal-500、bg-rose-500   掃得到：兩個完整名字都寫了
```

```html 02-tailwind/pages/04-scan.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>只輸出用到的 class</title>
  </head>
  <body class="bg-stone-50 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">這一梯的報名狀態</h1>
    <div class="mt-4 flex flex-wrap gap-4">
      <article class="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-5">
        <h2 class="text-lg font-semibold">太魯閣三日</h2>
        <p class="mt-2 text-sm text-stone-600">4/12 出發 · 尚有名額</p>
        <!-- bg-teal-700 整串寫在檔案裡，編譯器才會產生這條背景 -->
        <p class="mt-4 inline-block rounded-full bg-teal-700 px-3 py-1 text-sm font-medium text-white">可報名</p>
      </article>
      <article class="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-5">
        <h2 class="text-lg font-semibold">清水斷崖一日</h2>
        <p class="mt-2 text-sm text-stone-600">4/18 出發 · 候補中</p>
        <!-- 只有框線，沒有任何背景 class -->
        <p class="mt-4 inline-block rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-700">候補中</p>
      </article>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 兩張白卡橫排，窄螢幕會上下排。
- 第一張下面有一顆深青綠、白字、全圓的標籤，因為 `bg-teal-700` 整串寫在檔案裡。
- 第二張的標籤只有淺框和深色字，因為它沒有寫任何背景 class。
- 打開 DevTools，在第二顆標籤的 class 上手動加 `bg-fuchsia-700`，背景不會變：專案沒有任何檔案寫過這個名字，樣式表裡就沒有這條規則。
- 把這個名字寫進檔案並存檔，Vite 重新編譯後才會有背景；註解裡寫它也一樣會產生，所以頁面裡不放這個字串。

## 選讀：Play CDN

Play CDN 是 Tailwind 官方提供的一行 script，讓你不用安裝任何東西就能試寫 class。它只能試玩，課堂與專案仍走 Vite。

**觀念**

script 放進頁面的 head，瀏覽器載入頁面時才讀 class 並現場編譯。官方文件把它定位成開發用途，不用於正式站。

- 自訂主題變數：寫在 `<style type="text/tailwindcss">` 裡的 `@theme`。
- 舊寫法：網路上舊教學的 `cdn.tailwindcss.com` 和 `tailwind.config` 是 v3 的做法，不要沿用。

```html 02-tailwind/pages/30-play-cdn.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Play CDN</title>
    <!-- 官方 Play CDN：頁面載入時在瀏覽器裡現編，只適合試玩，不放正式站 -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body class="bg-teal-50 p-6 text-teal-950">
    <h1 class="text-2xl font-bold">樣式在瀏覽器裡現編</h1>
    <p class="mt-2 max-w-prose text-sm text-teal-900">這一頁沒有引入專案的 CSS，head 裡那行 script 讀到 class 才編出樣式。</p>
  </body>
</html>
```

**解析**

- 頁面是淺青綠底、深色字，標題加大加粗，說明限制行長。
- 樣式不是來自專案的 CSS，而是 head 裡的 script 在瀏覽器裡編出來的；斷網時這一頁會變回沒有樣式。
- 這個檔案放在專案裡，所以也會被專案本身掃描，但頁面的樣式不靠那份編譯結果。

# 基礎排版練習

名字讀得懂之後，用同一套詞彙排一組動作和一張卡片。這一章先看按鈕怎麼分主次，再看卡片怎麼把圖、標題、摘要和價錢收進同一個區塊。

## 按鈕

一組按鈕要讓人一眼分出主要動作、次要動作、輔助說明和不能按的狀態。這一節把四種放在同一列，用畫面差異記住各自的 class。

**一覽**

- 實心：深底白字，是主要動作，去別的網址用連結。
- 線框：白底加框，是次要動作，在這一頁做事用按鈕。
- 文字按鈕：平時沒有框，滑過才出現底線。
- 停用：帶 `disabled` 屬性，顏色退成灰，游標改成禁止符號。

**觀念**

連結和按鈕外觀可以做得一樣，但用途不同：連結帶使用者去別的網址，按鈕在目前這一頁觸發動作，要寫 `type="button"`，避免放進表單時被當成送出。滑過才變深、鍵盤聚焦才畫外框，是把條件寫在 class 前面，後面的變體章節會系統地講，這裡先在畫面上看到效果。

{% note info %}
**v4 的按鈕游標是箭頭**
Preflight 讓按鈕維持預設的箭頭游標，連結本來就是手指。想讓按鈕也是手指，要在按鈕上加 `cursor-pointer`；停用的那一顆則維持禁止符號。
{% endnote %}

```html 02-tailwind/pages/11-button.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>按鈕</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <section class="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm">
      <p class="text-sm font-medium text-teal-700">花蓮 · 太魯閣三日</p>
      <h1 class="mt-1 text-2xl font-bold">4/12 星期日出發</h1>
      <p class="mt-2 text-sm text-stone-600">含兩晚住宿與早餐。名額 12 人，目前剩餘 3 席。</p>
      <p class="mt-4 text-2xl font-semibold text-teal-900">
        NT$16,800 <span class="text-sm font-normal text-stone-500">/ 人</span>
      </p>
      <div class="mt-5 flex flex-wrap items-center gap-3">
        <!-- 主要動作：去別的網址，用連結 -->
        <!-- inline-flex 寬度依內容縮；rounded-lg 圓角 0.5rem；bg-teal-700 青綠底；text-white 白字 -->
        <!-- hover:bg-teal-800 滑過再深一階；focus-visible: 開頭的三個 class 讓鍵盤聚焦時畫出外框 -->
        <a
          class="inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
          href="#book"
        >
          立即預訂
        </a>
        <!-- 次要動作：在這一頁做事，用按鈕；border-teal-700 青綠框、hover:bg-teal-50 滑過鋪淺底 -->
        <!-- cursor-pointer：v4 的按鈕游標預設是箭頭，要手指要自己加 -->
        <button
          type="button"
          class="cursor-pointer rounded-lg border border-teal-700 bg-white px-4 py-2 font-medium text-teal-800 hover:bg-teal-50"
        >
          加入比較
        </button>
        <!-- 文字按鈕：hover:underline 滑過才加底線；underline-offset-4 把底線推開 -->
        <button
          type="button"
          class="cursor-pointer rounded-lg px-4 py-2 font-medium text-teal-800 underline-offset-4 hover:underline"
        >
          退改規則
        </button>
        <!-- 停用：disabled 屬性讓它點不下去；bg-stone-300、text-stone-500、cursor-not-allowed 讓畫面也看得出來 -->
        <button
          type="button"
          class="cursor-not-allowed rounded-lg bg-stone-300 px-4 py-2 font-medium text-stone-500"
          disabled
        >
          候補已滿
        </button>
      </div>
    </section>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 白底卡片上方是青綠色小字、標題、說明，以及深青綠價錢；價錢後面的「/ 人」比價錢小、顏色較淡。
- 下半一排四個動作，垂直對齊、彼此有縫，放不下會換行。
- 「立即預訂」是深青綠實心白字；指標移上去底色再深一階，用鍵盤移到它時外圍多一圈有距離的深色框。它是連結，會去別的網址。
- 「加入比較」是白底青綠框；指標移上去鋪一層很淺的青綠。它是按鈕，留在這一頁。
- 「退改規則」平時沒有框和底線，指標移上去才出現底線，底線和文字之間有一小段距離。
- 「候補已滿」是灰底灰字，游標移上去是禁止符號，點下去沒有反應。

## 卡片

卡片把照片、小字、標題、摘要、清單和價錢收在同一個文章區塊。這一節看圓角怎麼切到照片、不同比例的圖怎麼變成同一高度，以及價錢怎麼分出主次。

**觀念**

- 外層把超出的部分裁掉並加圓角，圖片的角才會跟著切齊。
- 圖片固定高度並用裁切填滿，不同比例的照片才會是同一高度。
- 原價用刪除線退到旁邊，售價用較深、較大的字留在視線末端。
- 陰影讓卡片和頁面底分開；`shadow-md` 是中等深度，更深的還有 `shadow-lg`、`shadow-xl`。

```html 02-tailwind/pages/12-card.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>卡片</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="mb-6 text-2xl font-bold">本週可報名</h1>
    <!-- max-w-sm 最大 24rem；overflow-hidden 配 rounded-2xl，圖片的角跟著切 -->
    <!-- bg-white 白底；shadow-md 中等陰影 -->
    <article class="max-w-sm overflow-hidden rounded-2xl bg-white shadow-md">
      <!-- h-44 高 11rem；w-full 寬 100%；object-cover 裁切後填滿 -->
      <img class="h-44 w-full object-cover" src="https://picsum.photos/id/1018/800/500" alt="風景照片" />
      <!-- space-y-3 子項上下相距 0.75rem；p-5 四邊 1.25rem -->
      <div class="space-y-3 p-5">
        <!-- text-xs 較小字級；tracking-wide 字距略開 -->
        <p class="text-xs font-medium tracking-wide text-teal-700">台北 · 3 天 2 夜</p>
        <h2 class="text-xl font-semibold">城市漫遊</h2>
        <p class="text-sm leading-6 text-stone-600">迪化街、大稻埕河岸，最後一晚住在老屋改建的旅社。</p>
        <ul class="space-y-1 text-sm text-stone-700">
          <li>含早餐與一趟夜間導覽</li>
          <li>週五晚間台北車站集合</li>
          <li>最多 8 人小團</li>
        </ul>
        <!-- justify-between 原價靠左、售價靠右；items-baseline 讓兩個價錢的文字基線對齊 -->
        <div class="flex items-baseline justify-between">
          <!-- line-through 刪除線 -->
          <p class="text-sm text-stone-400 line-through">NT$15,800</p>
          <p class="text-lg font-semibold text-teal-900">NT$12,800</p>
        </div>
        <!-- w-full 連結跟內文同寬；text-center 字置中 -->
        <a
          class="inline-block w-full rounded-lg bg-teal-700 px-4 py-2 text-center text-sm font-medium text-white"
          href="#detail"
        >
          看詳情
        </a>
      </div>
    </article>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 標題下面是一張限寬的白卡，帶一點陰影。
- 上方照片的兩個上角是圓角，沒有方角凸出來；高度固定，多出來的部分被裁掉。
- 內文由上往下是一行小的青綠色字、標題、灰色摘要、三行清單，各塊之間有固定的縫。
- 標題上方的小字（眉題）比內文小、字距拉開，和正文分得開。
- 原價在左，淡色加刪除線；售價在右，較大、深青綠，兩者文字基線對齊。
- 最下面是一條跟內文同寬的青綠連結，字在中間。

# 變體前綴

變體是寫在 utility 前面、以冒號連接的條件：冒號左邊是條件，右邊才是 utility。條件成立，後面的 class 才套上。

```text
hover:bg-teal-800      指標移上來，背景才改成 teal-800
md:hover:bg-teal-800   視窗寬度到達 md 這個斷點，而且指標移上來
```

多個條件可以疊在一起，同一個專案固定一種順序（例如斷點在前、狀態在後）比較好讀。這一章先看滑過、鍵盤聚焦、按下，以及跟著系統的深色；寬度前綴、版心、自訂斷點和容器查詢在下一章。

## 狀態變體

狀態變體對應元素當下的狀態，例如指標停在上面、被聚焦、被按住或被停用。這一節先看單顆元素的狀態，選讀再看整組一起變的 group 與 peer。

### hover、focus、active

滑過、聚焦、按下和停用是最常寫的四種狀態，它們的差別在條件何時成立，而不在效果本身。

**一覽**

- `hover:`：指標停在元素上。v4 只在支援滑過的裝置（有滑鼠的電腦）上生效，觸控螢幕不會留下「黏住」的滑過樣式，所以重要資訊不要只靠滑過才出現。
- `focus:`：元素取得焦點就套用，連滑鼠點進輸入框也算。
- `focus-visible:`：只在瀏覽器判斷需要顯示焦點時套用，鍵盤移動焦點時成立，滑鼠點按鈕通常不會；按鈕與連結的外框用它。
- `active:`：按住還沒放開。
- `disabled:`：元素帶有 `disabled` 屬性。

**觀念**

按鈕和連結用 `focus-visible:` 畫外框，滑鼠使用者不會被多餘的框打擾，鍵盤使用者仍看得到焦點在哪。輸入框則用 `focus:`，因為點進去也需要提示。想拿掉瀏覽器預設外框時，v4 的 `outline-hidden` 是對應的寫法，同時要用邊框或 ring 補上聚焦提示，否則鍵盤使用者看不到焦點。

```html 02-tailwind/pages/17-states.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>狀態變體</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">滑過、聚焦、按下、停用</h1>
    <p class="mt-2 max-w-prose text-sm text-stone-600">
      滑鼠移上去、按住不放，再用 Tab 鍵逐一移動焦點，觀察每個元件的變化。
    </p>
    <div class="mt-6 flex flex-wrap items-center gap-3">
      <!-- hover:bg-teal-800 滑過變深；active:scale-95 按下時縮小一點 -->
      <!-- focus-visible: 開頭的三個 class 只在鍵盤聚焦時畫出外框，滑鼠點擊不會 -->
      <button
        type="button"
        class="cursor-pointer rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900 active:scale-95"
      >
        立即預訂
      </button>
      <!-- disabled: 只在帶有 disabled 屬性時才套用 -->
      <button
        type="button"
        class="rounded-lg bg-teal-700 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
        disabled
      >
        候補已滿
      </button>
    </div>
    <label class="mt-6 block max-w-xs text-sm font-medium">
      聯絡信箱
      <!-- focus: 輸入框一取得焦點就套用，滑鼠點進去也算 -->
      <!-- focus:outline-hidden 拿掉預設外框，改由邊框與 ring 取代 -->
      <input
        class="mt-1 block w-full rounded-lg border border-stone-300 bg-white px-3 py-2 focus:border-teal-700 focus:ring-2 focus:ring-teal-200 focus:outline-hidden"
        type="email"
      />
    </label>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 「立即預訂」滑過時變深；按住時整顆縮小一點；用 Tab 移到它時外圍多一圈深色框，滑鼠點它不會出現這圈框。
- 「候補已滿」是灰底灰字，游標是禁止符號；它的底色本來寫青綠，帶 `disabled` 屬性才換成灰，又沒寫滑過樣式，所以滑過沒有變化。
- 輸入框平時是灰框；點進去或用 Tab 移進去，邊框變青綠並多一圈淺青綠 ring，預設外框已被拿掉。

### 選讀：group 與 peer

整張卡一起反應，或者兄弟元素互相連動時，只寫在自己身上的狀態變體不夠用，這時用 `group` 與 `peer` 標記狀態的來源。

**一覽**

- `group`：標記在父層；子層寫 `group-hover:` 之類的前綴，父層被滑過時子層跟著變。
- `peer`：標記在前面的兄弟；後面的兄弟寫 `peer-checked:` 之類的前綴，前面的狀態成立時跟著變。標記一定要在前，因為兄弟選擇器只能往後找。
- `transition`：讓顏色、陰影、縮放在兩個狀態之間補間，預設約 150 毫秒，`duration-300` 可放慢。

**觀念**

group 解決「滑過父層，改子層」，peer 解決「勾選前面的方塊，改後面的標籤與段落」。核取方塊本身用 `sr-only` 在畫面上隱藏但仍可用鍵盤操作，所以標籤要自己補上聚焦外框。

```html 02-tailwind/pages/17b-group-peer.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>group 與 peer</title>
  </head>
  <body class="space-y-8 bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">整組一起變</h1>
    <!-- group 放在父層，子層寫 group-hover:，滑過整張卡時一起變 -->
    <!-- transition 開補間，預設約 150 毫秒；duration-300 讓圖片放大慢一點 -->
    <!-- overflow-hidden 讓放大的圖停在圓角裡 -->
    <article class="group max-w-sm overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">
      <img
        class="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
        src="https://picsum.photos/id/1015/800/500"
        alt="山景"
      />
      <div class="p-4">
        <h2 class="font-semibold transition group-hover:text-teal-800">滑過整張卡，標題與圖片一起變</h2>
        <p class="mt-1 text-sm text-stone-600">父層標記 group，子層用 group-hover。</p>
      </div>
    </article>
    <!-- peer 放在前面的兄弟；後面的兄弟才能寫 peer-checked: -->
    <div>
      <input id="agree" class="peer sr-only" type="checkbox" />
      <label
        class="inline-block cursor-pointer rounded border border-stone-300 px-3 py-1 peer-checked:border-teal-700 peer-checked:bg-teal-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-700"
        for="agree"
      >
        我已閱讀行前說明
      </label>
      <p class="mt-2 hidden text-sm text-teal-800 peer-checked:block">勾選後這行才出現。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 滑過整張卡，卡片陰影加深、圖片放大一點、標題改成深青綠；圖片放大後被圓角裁掉，不會凸出卡片。
- 指標停在標題或圖片上時，卡片同樣算被滑過，因為子元素被滑過，父層也算。
- 標籤平時是灰框；勾選後框和底變青綠，下方多出一行「勾選後這行才出現」。
- 用 Tab 移到方塊時，標籤外圍出現聚焦外框，因為標籤用 `peer-focus-visible:` 接收方塊的聚焦狀態。

## 深色模式

深色模式用 `dark:` 前綴表示：條件成立時，後面的 utility 才套上。v4 預設的條件是作業系統的外觀設定，也可以改成由頁面上的 class 決定。這一節先看預設的跟著系統，再看選讀的手動切換。見 [Dark mode](https://tailwindcss.com/docs/dark-mode)。

### 跟著系統

預設的 `dark:` 對應 CSS 的 `prefers-color-scheme: dark` 媒體查詢，所以頁面上不需要按鈕。寫法是先寫淺色的 class，再寫深色那一組，深色成立時後者蓋過前者。

測試時不必改系統設定：按 <kbd>F12</kbd> 開 DevTools，再按 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>（macOS 為 <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>），執行 **Show Rendering**，把 **Emulate CSS media feature prefers-color-scheme** 切到 dark。

```html 02-tailwind/pages/09-dark-system.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>跟隨系統深色</title>
  </head>
  <body class="bg-white text-teal-950 scheme-light dark:bg-teal-950 dark:text-teal-50 dark:scheme-dark">
    <main class="mx-auto max-w-xl px-6 py-10">
      <p class="text-sm text-teal-700 dark:text-teal-200">跟著作業系統的外觀</p>
      <h1 class="mt-2 text-3xl font-bold">深色時這塊會換底</h1>
      <p class="mt-4 text-stone-600 dark:text-teal-100">沒有按鈕。系統是淺色就用沒有前綴的 class；系統是深色才套 dark:。</p>
      <article class="mt-6 rounded-xl bg-teal-50 p-5 dark:bg-teal-900">
        <h2 class="font-semibold">台北城市漫遊</h2>
        <p class="mt-2 text-sm">三天 · 含早餐</p>
      </article>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 淺色時，頁面是白底深字；切到深色後，`dark:` 那一組蓋過前面的淺色 class，變成深底淺字。
- 卡片原本是淺青綠底，深色時換成較深的青綠底。
- `scheme-light` 與 `dark:scheme-dark` 設定 `color-scheme`，讓捲軸、表單控制項等瀏覽器自己畫的部分跟著換色。
- 頁面載入共用的 main.js，沒有改寫 dark 的定義，所以只會跟系統走，沒有切換鈕。

### 選讀：手動切換

產品想讓使用者自己按鈕切換、不受系統設定限制時，要用 `@custom-variant` 重新定義 dark：把條件從媒體查詢改成「根元素上有 class dark」。切換的 JavaScript 屬於 {% post_link lokiTech-15day-07-js-dom %} 與 {% post_link lokiTech-15day-08-js-async %} 的內容（DOM 與本地儲存），這裡照抄即可，重點在 class 與變體。

這個重新定義只應該影響切換頁，所以放在獨立的樣式檔，由那一頁自己載入，其他頁面仍跟著系統。

```css 02-tailwind/src/dark-manual.css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

`&` 代表正在套用這個變體的元素。括號裡的意思是：元素本身有 class dark，或它是有 class dark 的元素的後代；`:where()` 讓這個條件的權重為零，不會干擾其他樣式的優先順序。

JavaScript 只做三件事：決定一開始要不要加 `dark`、按鈕切換 class、把選擇記到瀏覽器的本地儲存。

```js 02-tailwind/src/dark-toggle.js
const root = document.documentElement;
const button = document.querySelector('#theme-toggle');
const stored = localStorage.getItem('theme');
const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.classList.toggle('dark', stored ? stored === 'dark' : preferDark);

const paint = () => {
  button.textContent = root.classList.contains('dark') ? '切換亮色' : '切換深色';
};

paint();
button.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  paint();
});
```

```html 02-tailwind/pages/10-dark-toggle.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>手動切換深色</title>
    <link rel="stylesheet" href="/src/dark-manual.css" />
  </head>
  <body class="min-h-screen bg-stone-50 text-stone-900 scheme-light dark:bg-stone-950 dark:text-stone-100 dark:scheme-dark">
    <header class="flex items-center justify-between border-b border-stone-200 px-6 py-4 dark:border-stone-700">
      <p class="font-semibold">洛奇旅行</p>
      <button
        id="theme-toggle"
        type="button"
        class="rounded-lg border border-stone-300 px-3 py-1.5 text-sm dark:border-stone-600"
      >
        切換深色
      </button>
    </header>
    <main class="mx-auto max-w-xl px-6 py-8">
      <h1 class="text-3xl font-bold">按鈕決定這一頁的外觀</h1>
      <p class="mt-4 text-stone-600 dark:text-stone-300">
        html 上有 dark 這個 class 時，dark: 才生效。重新整理會記住上次的選擇。
      </p>
      <article class="mt-6 rounded-xl bg-white p-5 shadow-sm dark:bg-stone-900">
        <h2 class="text-lg font-semibold">花蓮山海</h2>
        <p class="mt-2 text-sm text-stone-600 dark:text-stone-300">兩天一夜。卡片的底也跟著換。</p>
      </article>
    </main>
    <script type="module" src="/src/dark-toggle.js"></script>
  </body>
</html>
```

**解析**

- 第一次開頁時沒有存過選擇，程式照系統偏好決定要不要在根元素加 class dark；之後按按鈕，就以按鈕的選擇為準，重新整理也會記住。
- 按鈕文字會跟著狀態在「切換深色」與「切換亮色」之間改變。
- 這頁載入的是 dark-manual.css，不是 main.js，所以 `dark:` 只認 class；用 DevTools 改系統外觀不會有任何反應。
- 樣式檔以 `link` 載入，Vite 的 Tailwind 外掛會處理它，和用 `main.js` 匯入的效果相同。
- 切換的程式是 module 腳本，頁面先畫出來才加上 class，習慣深色的使用者重新整理時可能閃一下淺色。正式產品會把決定 class 的那幾行改成放在 head 內同步執行，這裡不處理。

# RWD 與容器

RWD（響應式網頁設計）讓同一份 HTML 在手機到寬螢幕都排得下。Tailwind 的做法是：先寫窄螢幕的樣子，再用寬度前綴在視窗變寬時加欄、改橫排；版心則負責不讓內容橫向無限拉長。這一章依序介紹斷點、版面實作，以及依父層寬度而非視窗寬度判斷的容器查詢。

## 手機優先與斷點

斷點是「版面該改變」的視窗寬度。Tailwind 預設給五個，寬度前綴就是以它們命名；也可以自己加。這一節先確認手機優先的寫法，再看預設斷點、只在較窄寬度生效的範圍，以及自訂斷點。

### 手機優先

沒有前綴的 class 在所有寬度都生效，那就是手機那一版；`sm:` 以後的前綴是「夠寬才加上」，更寬時仍然成立。所以先寫窄畫面讀得完的樣子，再往寬處補，不要先寫桌面再往回修。

手機瀏覽器預設會把頁面當成桌面寬度再縮小，寬度前綴就量不到真正的手機寬度。標準模板裡這一行要留在 head：`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`，讓頁面寬度等於裝置寬度。

下面這頁故意不加任何寬度前綴，當作基準。

```html 02-tailwind/pages/19-mobile.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>手機優先</title>
  </head>
  <body class="bg-stone-50 text-stone-900">
    <header class="bg-teal-800 px-4 py-6 text-white">
      <h1 class="text-2xl font-bold">洛奇旅行</h1>
      <p class="mt-2 max-w-prose text-sm text-teal-100">先讓窄畫面讀得完。沒有前綴的 class 在所有寬度都生效。</p>
    </header>
    <section class="grid grid-cols-1 gap-4 p-4">
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="text-lg font-semibold">台北城市漫遊</h2>
        <p class="mt-1 text-sm text-stone-600">預設一欄，卡片跟內容區一樣寬。</p>
      </article>
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="text-lg font-semibold">花蓮山海</h2>
        <p class="mt-1 text-sm text-stone-600">拉寬瀏覽器時，這一頁還沒有 sm:、md:。</p>
      </article>
    </section>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- `grid-cols-1` 沒有前綴，所以不論視窗多寬，卡片都是一欄，寬度跟內容區一樣。
- `gap-4` 是兩張卡之間的 1rem 縫。
- `max-w-prose` 只限制那一行說明的最大行長，整頁仍跟視窗一樣寬，不是版心。

### 預設斷點

預設斷點都是最小寬度（min-width）條件：視窗到達那個寬度就成立，再拉更寬仍然成立。同一個屬性寫了好幾個前綴時，較寬的那個蓋過較窄的。門檻見下列，完整對照見 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。

- `sm:`：40rem，約 640px。
- `md:`：48rem，約 768px。
- `lg:`：64rem，約 1024px。
- `xl:`：80rem，約 1280px。
- `2xl:`：96rem，約 1536px。

這些前綴編譯後都是 `@media (width >= 門檻)`。媒體查詢裡的 rem 以瀏覽器預設字級計算，通常是 16px。

下面這頁把視窗從窄拉到寬時，頂端色帶與清單欄數會同時改變。

```html 02-tailwind/pages/20-breakpoints.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>斷點</title>
  </head>
  <body class="bg-stone-50 text-stone-900">
    <p class="bg-rose-200 px-4 py-3 text-sm font-medium sm:bg-orange-200 md:bg-amber-200 lg:bg-lime-200 xl:bg-teal-200 2xl:bg-violet-200">
      <span class="sm:hidden">現在小於 sm（40rem）</span>
      <span class="hidden sm:inline md:hidden">sm 以上，還沒到 md</span>
      <span class="hidden md:inline lg:hidden">md 以上，還沒到 lg</span>
      <span class="hidden lg:inline xl:hidden">lg 以上，還沒到 xl</span>
      <span class="hidden xl:inline 2xl:hidden">xl 以上，還沒到 2xl</span>
      <span class="hidden 2xl:inline">2xl 以上</span>
    </p>
    <main class="p-6">
      <h1 class="text-2xl font-bold">同一份清單，欄數隨寬度增加</h1>
      <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">台北</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">新北</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">基隆</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">桃園</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">新竹</li>
        <li class="rounded-lg bg-white px-3 py-2 shadow-sm">台中</li>
      </ul>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 視窗窄於 640px 時，色帶是玫瑰色，只顯示「小於 sm」那句，清單一欄。
- 每過一個門檻，色帶換成下一種顏色，清單多一欄：640px 起兩欄，768px 三欄，1024px 四欄，1280px 五欄，1536px 以上六欄。
- 色帶上的句子有兩種寫法：第一句預設顯示，`sm:hidden` 在 40rem 起隱藏；其餘幾句預設 `hidden`，到了自己那一段才改成 `inline`，下一段再藏起來。
- 背景色與欄數都不必「關閉」前一段：較寬的前綴直接蓋過較窄的，所以 `grid-cols-1` 不用特地收回。

### max-* 範圍變體

一般的寬度前綴是「這個寬度以上」；加上 `max-` 就是「小於這個寬度」，例如 `max-md:` 編譯成 `@media (width < 48rem)`。剛好 48rem 時，`md:` 成立、`max-md:` 不成立，所以兩段不會重疊。其他斷點也有同一套，如 `max-sm:`、`max-lg:`。

只想改窄螢幕時，用 `max-*` 就不必先設預設再寫一條收回去。要限定在兩個斷點之間，把「以上」與「小於」疊在同一個 class 上，例如 `md:max-xl:` 是 48rem 以上且小於 80rem。

{% note warning %}
**三個很像的名字**

- `md:`：視窗至少 48rem。
- `max-md:`：視窗小於 48rem。
- `max-w-md`：元素最大寬度 28rem，是尺寸，和視窗斷點無關。
{% endnote %}

下面三句預設都隱藏，各自只在自己的寬度範圍顯示。

```html 02-tailwind/pages/27-max.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>範圍變體</title>
  </head>
  <body class="space-y-4 bg-stone-50 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">max-md: 是小於 md，不是 max-w-md</h1>
    <p class="hidden rounded-lg bg-amber-100 px-4 py-3 text-amber-950 max-md:block">小於 md（48rem）才看得到這句。</p>
    <p class="hidden rounded-lg bg-teal-100 px-4 py-3 text-teal-950 md:max-xl:block">md 以上、且小於 xl（80rem）。</p>
    <p class="hidden rounded-lg bg-violet-100 px-4 py-3 text-violet-950 xl:block">xl 以上一直顯示。</p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 視窗窄於 768px 時，只看得到第一句（琥珀色）；`max-md:block` 把預設的隱藏改成區塊。
- 768px 到 1279px 之間，只看得到第二句（青綠色），因為 `md:max-xl:block` 要兩個條件同時成立。
- 1280px 以上只剩第三句（紫色）；`xl:block` 從 80rem 起蓋過隱藏，沒有更寬的前綴再把它藏起來。

### 用 @theme 自訂斷點

預設斷點不夠用時，在 `@theme` 加以 `--breakpoint-` 開頭的變數：值是寬度，名字變成新的前綴，用法和內建的相同，也自動有對應的 `max-` 版本。單位建議統一用 rem，Tailwind 才能把新斷點排在正確的位置；新名字不要跟內建的重複，否則會蓋掉內建的。想移除內建斷點可以用 `initial`，這門課不需要。

下面的範例有自己的樣式檔，只有這一頁認得 `tablet:` 與 `3xl:`。

```css 02-tailwind/src/breakpoints.css
@import "tailwindcss";

@theme {
  --breakpoint-tablet: 52rem;
  --breakpoint-3xl: 120rem;
}
```

```html 02-tailwind/pages/22-custom-breakpoint.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>自訂斷點</title>
    <link rel="stylesheet" href="/src/breakpoints.css" />
  </head>
  <body class="bg-stone-50 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">tablet: 設在 52rem</h1>
    <p class="mt-3 max-w-prose">比 md（48rem）再寬一點才變成兩欄。3xl（120rem）那句只有非常寬的視窗看得到。</p>
    <div class="mt-6 grid grid-cols-1 gap-4 tablet:grid-cols-2">
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="font-semibold">左欄</h2>
        <p class="text-sm text-stone-600">52rem 以前跟右欄上下排。</p>
      </article>
      <article class="rounded-xl bg-white p-4 shadow-sm">
        <h2 class="font-semibold">右欄</h2>
        <p class="text-sm text-stone-600">過了 tablet 才並排。</p>
      </article>
    </div>
    <p class="mt-6 hidden rounded-lg bg-violet-100 px-4 py-3 text-violet-950 3xl:block">
      視窗到 3xl 了。一般筆電的視窗拉不滿這條，把瀏覽器縮放調小才容易看到。
    </p>
  </body>
</html>
```

**解析**

- 視窗窄於 832px（52rem）時，兩張卡上下排；到 832px 起並排成兩欄，比預設的 `md:` 再晚一點。
- 最後一段預設不顯示，視窗到 1920px（120rem）才出現；一般筆電的視窗拉不滿，把瀏覽器縮放調小才容易看到。
- 自訂前綴也是最小寬度條件，對應的「小於」寫法是 `max-tablet:`。
- 自訂變數仍寫在 `@theme`；顏色、間距與字型的主題變數見下一章。

## 版面實作

斷點最常用在兩種版面：隨寬度增加欄數的卡片牆，以及限制整頁最大寬度的版心。這一節把前面學過的 Flex、Grid 與寬度前綴組成頁面骨架，選讀再看一個會隨寬度變形的導覽列。

### 卡片牆

Flex 管一列內的對齊，Grid 管欄數會隨寬度改變的卡片。單格怎麼寫見 [常見組合](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#常見組合) 與 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。

```html 02-tailwind/pages/16-layout.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flex 與 Grid</title>
  </head>
  <body class="space-y-10 bg-stone-50 p-6 text-stone-900">
    <section>
      <h1 class="text-2xl font-bold">Flex：一列排開</h1>
      <div class="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4">
        <p class="font-semibold">洛奇旅行</p>
        <div class="flex gap-4 text-sm text-teal-800">
          <a href="#a">行程</a>
          <a href="#b">關於</a>
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-2xl font-bold">Grid：卡片牆</h2>
      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article class="rounded-xl bg-white p-4 shadow-sm">
          <h3 class="font-semibold">台北</h3>
          <p class="text-sm text-stone-600">3 天</p>
        </article>
        <article class="rounded-xl bg-white p-4 shadow-sm">
          <h3 class="font-semibold">花蓮</h3>
          <p class="text-sm text-stone-600">2 天</p>
        </article>
        <article class="rounded-xl bg-white p-4 shadow-sm">
          <h3 class="font-semibold">台南</h3>
          <p class="text-sm text-stone-600">4 天</p>
        </article>
      </div>
    </section>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 上半是頁首：品牌靠左、連結靠右，並排放不下時，`flex-wrap` 讓它換行，`items-center` 垂直置中。
- 下半是卡片牆：`grid-cols-1` 先是一欄，640px 起兩欄，1024px 起三欄。
- `gap-4` 同時管行與列的縫，所以換欄數時間距不用重寫。

### 版心與 max-w-*

版心是「這一欄最寬到這裡，多出來的空間分到左右」。做法是最大寬度加水平置中，再加左右內距，讓視窗比版心窄時文字仍離邊一點。

- `mx-auto`：左右外距設為自動，在父層比元素寬時置中，所以前面要先有最大寬度。
- `max-w-6xl`：最大寬度 72rem；`max-w-3xl` 是 48rem；`max-w-prose` 約 65 個字元寬，適合閱讀。
- `px-4`：左右內距 1rem。

注意 `max-w-sm`（24rem）是元素的最大寬度，和斷點 `sm:`（40rem）是兩回事。

Tailwind 也內建一個 `container` class：寬度 100%，並在每個斷點把最大寬度設成該斷點的寬度。但 v4 的 `container` 不會自動置中，也沒有左右內距；要補上就用 `@utility` 延伸它。用 `@utility` 註冊，這個 class 才能搭配斷點前綴使用。圖層與工具的差別見客製化那一章的選讀。

```css 02-tailwind/src/container.css
@import "tailwindcss";

@utility container {
  margin-inline: auto;
  padding-inline: 1rem;
  @media (width >= 40rem) {
    padding-inline: 1.5rem;
  }
}
```

```html 02-tailwind/pages/21-container.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>版心</title>
    <link rel="stylesheet" href="/src/container.css" />
  </head>
  <body class="bg-stone-200 text-stone-900">
    <div class="container bg-white py-8">
      <p class="text-xs font-medium text-teal-700">class="container"</p>
      <h1 class="mt-2 text-2xl font-bold">白底停在版心裡，外面仍是灰</h1>
      <p class="mt-3">這個 container 內建各斷點的最大寬度，src/container.css 再補上置中與左右留白。</p>
    </div>
    <div class="mx-auto mt-6 max-w-6xl bg-teal-50 px-4 py-8 sm:px-6">
      <p class="text-xs font-medium text-teal-800">mx-auto max-w-6xl px-4</p>
      <h2 class="mt-2 text-xl font-semibold">不取名字時，三個 class 做同一件事</h2>
      <p class="mt-3 max-w-3xl">max-w-6xl 是 72rem，管的是整條版心。這段說明再用 max-w-3xl 收到 48rem。</p>
    </div>
  </body>
</html>
```

**解析**

- 上半的白底寬度由 `container` 決定：窄視窗時佔滿並留 1rem 內距，過了 640px 內距變 1.5rem，最大寬度則停在當時的斷點寬度，兩側露出灰底。
- 下半用 `mx-auto max-w-6xl px-4` 做同一件事，最寬 72rem；`sm:px-6` 讓內距在 640px 起加大。
- 最後一段加 `max-w-3xl`，只縮那一段說明，青綠底仍是整條版心的寬度。
- 最大寬度的刻度見 [max-width](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#max-width)。

### 選讀：導覽列

窄螢幕的導覽常收成一顆「選單」鈕，點了才展開。這一節不寫 JavaScript：用前面「group 與 peer」的做法，讓核取方塊記住展開或收起，再由它後面的兄弟元素跟著顯示或隱藏，並用 `md:` 讓寬螢幕直接攤開成橫排。

**觀念**

- 核取方塊加上 `peer`，後面的導覽寫 `peer-checked:flex`：方塊被勾選時，導覽才從隱藏變成顯示。
- 方塊用 `sr-only` 移出畫面，使用者點的是標籤；標籤的 `for` 指向方塊，點標籤就等於勾選。
- 標籤與導覽各加 `md:` 的寫法：標籤在 48rem 以上隱藏，導覽改成一直顯示的橫排。

```html 02-tailwind/pages/13-nav.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>導覽列</title>
  </head>
  <body class="bg-stone-50 text-stone-900">
    <header class="relative bg-teal-800 text-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a class="text-lg font-bold" href="/">洛奇旅行</a>
        <input id="nav-toggle" class="peer sr-only" type="checkbox" />
        <label
          class="cursor-pointer rounded border border-white/40 px-3 py-1 peer-focus-visible:outline-2 md:hidden"
          for="nav-toggle"
          >選單</label
        >
        <nav
          class="absolute inset-x-0 top-full hidden flex-col gap-3 bg-teal-800 px-4 py-4 peer-checked:flex md:static md:flex md:flex-row md:gap-6 md:bg-transparent md:p-0"
        >
          <a class="hover:underline" href="#home">首頁</a>
          <a class="hover:underline" href="#tours">行程</a>
          <a class="hover:underline" href="#about">關於</a>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-8">
      <h1 class="text-2xl font-bold">把視窗拉窄再拉寬</h1>
      <p class="mt-3 max-w-prose text-stone-600">窄的時候按「選單」。寬到 md 之後，連結回到橫排，按鈕隱藏。</p>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 視窗窄於 48rem（768px）時，頁首只有品牌名稱與「選單」鈕；導覽預設隱藏，勾選後 `peer-checked:flex` 讓它變成直排，浮在頁首下緣。
- 視窗到 48rem 以上，「選單」鈕消失，導覽連結改成一直顯示的橫排，不再需要勾選。
- `peer-focus-visible:outline-2` 讓鍵盤使用者按 <kbd>Tab</kbd> 時，看得到焦點落在標籤上；方塊本身看不見，沒有這條就沒有任何提示。
- 浮在下緣的導覽用絕對定位，參照最近的定位祖先，也就是加了 `relative` 的頁首。

## 容器查詢

斷點看的是整個視窗，但元件常被放進寬度各異的欄位：視窗很寬，裝它的那一欄卻很窄。容器查詢（container query，讓元素依「父層容器」的寬度改樣式，而不是依視窗寬度）就是為這種情況設計的。Tailwind v4 內建，不必另外安裝；見 [容器查詢](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#容器查詢)。

**一覽**

- `@container`：把這個元素標成容器，後代才能查詢它的寬度。
- `@md:`：容器寬度達到 28rem 以上時套用，對象是最近的那層容器。
- `@md/main:`：同樣的門檻，但對象是名為 main 的容器，用在容器有兩層以上的時候。
- `@max-md:`：容器寬度小於 28rem 時套用，和視窗的 `max-md:` 對應。

容器前綴的名字和視窗前綴相似，門檻卻是另一組數字：容器的 `@sm`、`@md`、`@lg` 依序是 24rem、28rem、32rem，視窗的 `md` 則是 48rem。

{% note warning %}
**@md、md、container 各看一處**

三個名字長得像，用途不同：

- `md:` 看視窗，門檻 48rem。
- `@md:` 看容器，門檻 28rem。
- `container` 是版心 class，管置中與最大寬度，和查詢無關。
{% endnote %}

### 未具名容器

第一個 demo 把外框標成容器，並用 resize-x 讓它能橫向拖曳，所以不必改視窗，拖外框右下角就能看到變化。沒有寫名字時，容器前綴對到最近的那層容器。

```html 02-tailwind/pages/23-container-query.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>容器查詢</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">拖右邊，改的是這張卡的寬度</h1>
    <p class="mt-2 max-w-prose text-sm text-stone-600">視窗可以很寬，排版看的是下面這個可拉伸的框。</p>
    <div class="@container mt-6 w-72 resize-x overflow-auto rounded-xl border border-stone-300 bg-white p-4">
      <article class="flex flex-col gap-4 @md:flex-row">
        <img class="h-32 w-full rounded-lg object-cover @md:w-40 @md:shrink-0" src="https://picsum.photos/id/1016/800/500" alt="湖面與山" />
        <div>
          <h2 class="text-lg font-semibold">花蓮山海</h2>
          <p class="mt-1 text-sm text-stone-600">框還窄時圖在上，框的內容寬到 28rem 時圖改到左邊。</p>
        </div>
      </article>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 外框的 `@container` 把它變成查詢對象，w-72 是起始寬度 18rem，所以一開始圖在上、文字在下。
- 容器是用內容寬度計算的，外框有內距和邊框，所以拖到外框約 482px 寬、內容達 28rem 時，卡片才從直排改成橫排。
- 圖片的寬度和排列用同一個門檻：先佔滿寬度，橫排後改成固定的 10rem，並加上不縮小的設定，避免被文字擠扁。
- 整段過程視窗寬度沒變，證明改變來自容器而不是視窗。

### 具名容器

容器有兩層時，沒有名字的前綴只會對到最近的那層。要查詢更外層，就給容器取名：`@container/page` 的斜線後面是名字，查詢時寫 `@2xl/page:`，斜線後面同樣是名字，不是視窗斷點。

```html 02-tailwind/pages/23b-container-named.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>具名容器</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <div class="@container/page max-w-3xl rounded-xl bg-stone-200 p-4">
      <p class="text-sm text-stone-600">外層叫 page，寬度最多 48rem。裡面有一個較窄、可橫向拖的 card。</p>
      <div class="@container/card mt-4 w-64 resize-x overflow-auto rounded-lg bg-white p-4">
        <h1 class="text-base font-semibold @lg/card:text-2xl">標題看 card</h1>
        <p class="mt-2 text-sm text-stone-600 @2xl/page:text-lg">這段文字看 page，不管 card 拖到多寬。</p>
      </div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 標題寫 `@lg/card:`，只問 card 的內容寬度：拖到 32rem 以上才放大。這裡 card 就是最近的容器，寫成 `@lg:` 結果相同，名字只是讓意圖更清楚。
- 段落寫 `@2xl/page:`，要問的是離它較遠的 page。沒有名字就會對到 card，所以這種跳過一層的查詢一定要用名字。
- page 最寬 48rem；視窗寬於約 760px 時它的內容寬度超過 42rem，段落就是大字，和 card 拖多寬無關。

### 側欄實作

整頁的欄數仍由視窗決定，主文裡的卡片則改看主文自己的寬度。這個 demo 窄螢幕時側欄在上、主文在下，視窗到 `lg`（64rem）後變成四欄格子，側欄一欄、主文三欄。

卡片不用視窗前綴的原因是：並排之後側欄佔掉一欄，視窗雖然寬，主文卻比視窗窄很多。所以主文標成具名容器，卡片查詢它的寬度。

```html 02-tailwind/pages/28-sidebar.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>側欄</title>
  </head>
  <body class="bg-stone-100 text-stone-900">
    <div class="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-4">
      <aside class="rounded-xl bg-teal-800 p-4 text-white">
        <p class="text-sm font-medium">目的地</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li>台北</li>
          <li>花蓮</li>
          <li>台南</li>
        </ul>
      </aside>
      <main class="@container/main lg:col-span-3">
        <h1 class="text-2xl font-bold">窄螢幕時側欄在上面</h1>
        <p class="mt-2 text-sm text-stone-600">並排看視窗的 lg，卡片橫排看 main 自己的寬度。</p>
        <article class="mt-4 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm @3xl/main:flex-row">
          <img class="h-32 w-full rounded-lg object-cover @3xl/main:w-40 @3xl/main:shrink-0" src="https://picsum.photos/id/1015/800/500" alt="山景" />
          <div>
            <h2 class="text-lg font-semibold">花蓮山海</h2>
            <p class="mt-1 text-sm text-stone-600">視窗剛到 lg 時，主欄約 738px，還不到 48rem，圖仍在上面。</p>
          </div>
        </article>
      </main>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 外層 `grid` 在窄螢幕是單欄，側欄與主文上下排，縫由 gap 負責；`lg:grid-cols-4` 讓 1024px 以上變成四欄。
- 主文用 `lg:col-span-3` 佔三欄，同時是名為 main 的容器。
- 卡片的橫排與圖片寬度都問 main，門檻選 `@3xl`（48rem）：視窗剛到 1024px 時主文約 738px，還不夠，圖仍在上面。
- 視窗再寬到約 1064px 以上，主文達 48rem，卡片才改橫排。若卡片寫成 `lg:flex-row`，在 1024px 就會橫排，而此時主文已經偏窄。

### 選擇斷點或容器查詢

頁面骨架跟著視窗：導覽要不要橫排、側欄要不要並排、整頁卡片牆幾欄，用 `sm:` 到 `2xl:`。元件會被放進不同寬度的欄位時，用容器查詢，讓它跟著父層。

- 視窗斷點適合頁首、側欄與整頁欄數；容器查詢適合同一張卡出現在側欄或主文。
- 只有一層容器時不必取名；要跳過最近的容器，才寫 `@md/main:` 這類具名前綴。
- 整頁只有一個寬度來源時，不必再包 `@container`。

# 客製化

預設色票、間距與字型不夠用時，在 CSS 裡用 `@theme` 加變數，新的名字就能像內建名字一樣寫成 class。至於重複出現、而且你改不到那顆標籤時，才把一串 class 收進樣式表。

## @theme 自訂設計變數

主題變數（theme variable）是寫在 `@theme` 裡的特殊 CSS 變數：它既是一般的 CSS 變數，也會讓 Tailwind 產生對應的 utility。寫在 `:root` 的普通變數只有前者。變數名字開頭決定它產生哪一類 class，你新增的名字會和內建的合併，不會覆蓋。變數一覽見 [主題指令](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#主題指令) 與 [@theme inline 與 static](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#theme-inline-與-static)。

- `--color-*` 產生背景、文字、邊框等顏色 class。
- `--spacing-*` 產生內距、外距、寬度、縫隙等 class。
- `--font-*` 產生字型 class。

### 品牌色

色階仍用 50 到 950，才能和預設色票用同一套深淺數字。下面是入口 CSS `style.css` 的第一步，只有品牌色；這裡的 brand 沿用青綠色票的色碼，之後換品牌色只改這一處。

```css 02-tailwind/src/style.css
@import "tailwindcss";

@theme {
  --color-brand-50: #f0fdfa;
  --color-brand-100: #ccfbf1;
  --color-brand-200: #99f6e4;
  --color-brand-300: #5eead4;
  --color-brand-400: #2dd4bf;
  --color-brand-500: #14b8a6;
  --color-brand-600: #0d9488;
  --color-brand-700: #0f766e;
  --color-brand-800: #115e59;
  --color-brand-900: #134e4a;
  --color-brand-950: #042f2e;
}
```

{% note info %}
入口 CSS 在下一小節還會加入間距與字型兩項，練習資料夾的 `src/style.css` 是加完之後的版本。斷點與版心另放在 RWD 那章各自的樣式檔，不在這份入口 CSS 裡。
{% endnote %}

```html 02-tailwind/pages/08-theme.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>品牌色</title>
  </head>
  <body class="bg-brand-50 p-6 text-brand-950">
    <p class="text-sm font-medium tracking-wide text-brand-700">洛奇旅行</p>
    <h1 class="mt-2 text-3xl font-bold text-brand-900">品牌色來自 @theme</h1>
    <p class="mt-3 max-w-prose text-brand-800">這一頁的底色與字色，都對應 src/style.css 裡的 brand 色階。</p>
    <a class="mt-6 inline-block rounded-lg bg-brand-700 px-4 py-2 font-medium text-white" href="#tours">看行程</a>
    <ul class="mt-8 grid max-w-lg gap-2 text-sm">
      <li class="rounded bg-brand-100 px-3 py-2">brand-100</li>
      <li class="rounded bg-brand-300 px-3 py-2">brand-300</li>
      <li class="rounded bg-brand-500 px-3 py-2 text-white">brand-500</li>
      <li class="rounded bg-brand-700 px-3 py-2 text-white">brand-700</li>
      <li class="rounded bg-brand-900 px-3 py-2 text-white">brand-900</li>
    </ul>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 淺底、深字、實心按鈕分別讀 `--color-brand-50`、`--color-brand-900`、`--color-brand-700`。
- class 名字中間的 brand 就是 `@theme` 裡取的色族名，所以頁面沒有任何 teal。
- 下面五格是同一個色族的不同深淺，可以對照色階的明暗。

### 間距與字型

Tailwind v4 的間距是一個基準值 `--spacing`（0.25rem）乘上數字，所以 `p-18` 等於 4.5rem，不必自己宣告。`--spacing-*` 適合取有意義的名字，例如整站固定的欄位內距。

字型同理：`--font-display` 產生 `font-display`。預設整頁文字走 `--font-sans`，改這個變數就改掉整頁預設字型，不必在 body 另加 class。要用的字型必須已經安裝或載入；找不到時瀏覽器會改用逗號後面的下一個，所以最後都留系統字型當備援。

下面是這一節加進同一個 `@theme` 的三行，其餘行不變：

```css 02-tailwind/src/style.css
@theme {
  /* 與品牌色寫在同一個 @theme，這裡只列出這一節多加的行 */
  --spacing-gutter: 1.5rem;
  --font-sans: "Noto Sans TC", ui-sans-serif, system-ui, sans-serif;
  --font-display: Georgia, "Times New Roman", serif;
}
```

```html 02-tailwind/pages/08b-theme-spacing-font.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>間距與字型</title>
  </head>
  <body class="bg-brand-50 p-6 text-brand-950">
    <h1 class="font-display text-3xl font-bold">Rocky Travel 洛奇旅行</h1>
    <p class="mt-2 text-sm text-brand-800">標題用 font-display，其餘文字走預設的 font-sans。</p>
    <div class="mt-6 max-w-md rounded-xl bg-white p-gutter shadow-sm">
      <p>這張卡的內距是 p-gutter，來自 --spacing-gutter。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 標題的 `font-display` 讀 `--font-display`，英文字母變成襯線字；中文字仍落到系統的中文字型。
- 白色卡片的內距 `p-gutter` 來自 `--spacing-gutter`，等於 1.5rem。
- 其餘文字沒寫字型 class，仍用 `--font-sans`；本頁沒有載入 Noto Sans TC，畫面上會落到下一個系統無襯線字，變數本身仍然生效。

## 寫進樣式表

多數外觀留在標籤的 class 上，只有少數情況需要寫進樣式表或繞過刻度。這一節看 `@apply`、方括號任意值與 important；接得上斷點的自訂工具放在最後的選讀。

### @apply

`@apply` 讓你在自己的 CSS 裡引用 utility，收成一個 class。它只適合同一串 utility 大量重複、而你改不到那些標籤的情況，例如 CMS 輸出的內容、第三方套件產生的標籤。自己寫的 HTML 或 React 元件，重複就抽成元件，class 仍留在標籤上，名字才看得出樣式。

這個 demo 把按鈕收成 `.btn-solid`。獨立的 CSS 檔看不到主題，所以開頭要用 `@reference` 指向入口 CSS，`@apply` 才認得 teal 這些名字；規則放進 components 圖層，標籤上另寫的 utility 才蓋得過它。

```css 02-tailwind/src/apply.css
@reference "./style.css";

@layer components {
  .btn-solid {
    @apply inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white;
  }
}
```

```js 02-tailwind/src/apply.js
import './style.css';
import './apply.css';
```

```html 02-tailwind/pages/24-apply.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@apply</title>
  </head>
  <body class="bg-stone-50 p-6">
    <h1 class="mb-4 text-2xl font-bold text-stone-900">兩顆連結共用一個 class</h1>
    <a class="btn-solid" href="#tours">報名這梯</a>
    <a class="btn-solid ml-3" href="#more">下一梯</a>
    <p class="mt-4 max-w-prose text-sm text-stone-600">標題與這段說明沒有重複，utility 直接寫在標籤上。</p>
    <script type="module" src="/src/apply.js"></script>
  </body>
</html>
```

**解析**

- 兩顆連結都只寫 `btn-solid`，畫面上是青綠底、白字、圓角的按鈕。
- 第二顆多的左外距寫在自己的標籤上，不放進共用 class。
- 標題與說明沒有重複，字級和顏色留在標籤上。
- `@reference` 只借用主題，不會把 Tailwind 的樣式再輸出一次。

### 任意值與 ! 覆寫

刻度沒有的值寫在方括號裡，稱為任意值（arbitrary value）。底線會被當成空白。能用既有刻度就用刻度，每一頁才不會各長各的。寫法見 [任意值與任意屬性](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意值與任意屬性)。

```html 02-tailwind/pages/26-arbitrary.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>任意值</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">方括號寫刻度沒有的值</h1>
    <div class="mt-4 grid max-w-xl grid-cols-[1fr_2fr] gap-4 rounded-[1.25rem] bg-[#fff7e6] p-4">
      <p class="rounded bg-white p-2 text-sm">1fr 欄</p>
      <p class="rounded bg-white p-2 text-sm">2fr 欄，寬度約是左欄的兩倍</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- `grid-cols-[1fr_2fr]` 的底線變成空白，也就是兩欄 `1fr 2fr`，右欄寬度約是左欄的兩倍。
- 圓角 1.25rem 介於 `rounded-2xl`（1rem）與 `rounded-3xl`（1.5rem）之間，刻度沒有這一格，所以寫成方括號。
- 背景色 `#fff7e6` 是不在色票裡的顏色，方括號同樣適用。

兩個 utility 改同一個屬性時，誰贏取決於 Tailwind 產生 CSS 的順序，不是 class 屬性裡的前後。在 class 最後加驚嘆號，會把那一條宣告標成 important（優先權最高）。v4 的驚嘆號寫在結尾；舊版寫在前面，也還看得到。用在壓過你控制不了的樣式；自己能拿掉多餘的 class 時，不要用。寫法見 [任意變體、important、前綴](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意變體、important、前綴)。

```html 02-tailwind/pages/26b-important.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>important</title>
  </head>
  <body class="bg-stone-100 p-6">
    <h1 class="text-2xl font-bold text-stone-900">結尾的 ! 標成 important</h1>
    <p class="mt-4 text-stone-500 text-teal-800!">這行同時寫了兩個文字顏色，青綠色一定贏。</p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 那行同時寫了灰色與青綠色兩個文字顏色，畫面上是青綠字。
- 青綠色後面的驚嘆號讓它變成 important，所以不論哪一條先產生，都是青綠色贏。

### 選讀：@layer 與 @utility

自訂 class 可以放在兩個地方。放進 `@layer components` 的是普通 CSS，可以被標籤上的 utility 覆蓋，但前面加不上滑過或斷點等前綴。用 `@utility` 註冊的名字則和內建 utility 一樣，能接這些前綴。對照見 [@layer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#layer) 與 [@utility](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#utility)；RWD 那章的版心 `container` 也是用 `@utility` 寫的。

```css 02-tailwind/src/layer.css
@import "./style.css";

@layer components {
  .kicker {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    color: var(--color-teal-700);
  }
}

@utility chip {
  border-radius: calc(infinity * 1px);
  padding-inline: 0.75rem;
  padding-block: 0.25rem;
  font-size: 0.75rem;
  background-color: var(--color-teal-50);
  color: var(--color-teal-900);
}
```

```js 02-tailwind/src/layer.js
import './layer.css';
```

```html 02-tailwind/pages/25-layer.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@layer 與 @utility</title>
  </head>
  <body class="space-y-4 bg-stone-50 p-6 text-stone-900">
    <p class="kicker">kicker 在 components 圖層，直接寫有效</p>
    <p class="md:kicker">md:kicker 不會產生規則，所以這行是普通文字</p>
    <p class="md:chip">md 以上才套用 chip</p>
    <script type="module" src="/src/layer.js"></script>
  </body>
</html>
```

**解析**

- 第一行寫 `kicker`，有小字與青綠色；第二行寫成 `md:kicker`，Tailwind 不會產生任何規則，所以是普通文字。
- 第三行的 `md:chip` 要視窗達 48rem 才套用膠囊底、圓角與字級，比較窄時這一行沒有那些樣式。
- 需要接前綴的自訂 class 就用 `@utility`；不需要、又想讓標籤的 utility 能覆蓋它，才放進 `@layer components`。

# 回家作業

這份作業只用必教內容，請用 Tailwind 把一頁沒有樣式的行程列表排出來。內容取自專案的行程清單。課堂上不會批改，也不講解；每一題都附上完成後該看到的結果，可以自己對照。做完或卡住時，再看練習 repo 根目錄 `homework/04-tailwind/` 裡的標準答案。

## 起始檔

起始檔在練習專案的 `02-tailwind/pages/homework-04.html`，用 `pnpm dev` 開啟後到 `/pages/homework-04.html`。HTML 結構已經寫好，只要加 class，必要時改 `src/style.css`。

```html 02-tailwind/pages/homework-04.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>04 回家作業</title>
  </head>
  <body>
    <header>
      <a href="#">洛奇旅行</a>
      <nav>
        <a href="#">首頁</a>
        <a href="#">行程</a>
        <a href="#">報名</a>
      </nav>
    </header>
    <main>
      <h1>熱門行程</h1>
      <ul>
        <li>
          <p>城市</p>
          <h2>台北大稻埕與北投溫泉三日</h2>
          <p>3 天</p>
          <p>NT$18600</p>
          <a href="#">看行程</a>
        </li>
        <li>
          <p>山海</p>
          <h2>花蓮太魯閣與七星潭四日</h2>
          <p>4 天</p>
          <p>NT$26800</p>
          <a href="#">看行程</a>
        </li>
        <li>
          <p>古都</p>
          <h2>台南府城與安平兩日</h2>
          <p>2 天</p>
          <p>NT$8800</p>
          <a href="#">看行程</a>
        </li>
        <li>
          <p>日本</p>
          <h2>京都嵐山、伏見與奈良五日</h2>
          <p>5 天</p>
          <p>NT$52800</p>
          <a href="#">看行程</a>
        </li>
      </ul>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## 題目

### 題目一：版頭與版心

讓版頭的品牌名在左、導覽在右，導覽連結之間留間距。主要內容用版心包起來，最大寬度 72rem、水平置中、左右留白。

完成後寬螢幕時內容置中，兩側有空白；版頭兩端對齊。

### 題目二：卡片

每個列表項目做成卡片：白底、圓角、邊框或陰影、內距。主題標籤做成小膠囊，標題加粗，價格用較深的顏色並加粗，「看行程」做成按鈕。

完成後卡片之間有明顯的邊界，主題標籤只和文字一樣寬。

### 題目三：響應式卡片牆

把列表排成格線：手機一欄、中等寬度兩欄、寬螢幕四欄，卡片之間留間距。

完成後從手機寬度慢慢拉寬，欄數依序變成 1、2、4。

### 題目四：互動狀態

「看行程」按鈕的底色用 `src/style.css` 裡已有的品牌色階：平常一個色階，滑鼠移入深一階，點擊按下再深一階；用鍵盤聚焦時顯示清楚的外框。

完成後滑鼠移入、Tab 聚焦與按下各有不同的外觀。

### 題目五：深色模式

跟著系統設定切換深色：深色時頁面是深色背景、淺色文字，卡片與按鈕也要換成適合深色的顏色。

完成後在系統設定切換深色或淺色，頁面會跟著變，文字都看得清楚。

### 題目六：自己的顏色

練習專案的 `src/style.css` 已經有課堂上定義的品牌色。請在它的主題設定裡再新增一個自己命名的顏色，並改用它來設定價格的顏色，不要在 class 裡寫任意值。

完成後改動這個顏色的值，四張卡片的價格顏色會一起變。

# 本篇重點回顧

選讀小節有：Preflight 重置了什麼、Play CDN、group 與 peer、手動切換、導覽列，以及 @layer 與 @utility，這些可以整節跳過。

- Node 26 用 nvs 安裝、pnpm 用 npm 全域安裝，Vite 開發時當本機伺服器，建置時才把成品打包到 `dist/`。
- utility 是「屬性－值」的 class，編譯器只收原始碼裡寫完整的名字，例如 `bg-teal-700`。
- 條件寫成前綴：`hover:` 是滑過，鍵盤聚焦、按下、停用各有自己的前綴，預設的 dark 前綴則跟著作業系統外觀。
- 寬度前綴是最小寬度，夠寬才加上、更寬仍成立，要限定小於某個寬度就用 `max-md:`。
- 版心由最大寬度、水平置中與左右內距組成，內建的 `container` 要另外補上置中與內距。
- 元件會放進不同寬度的欄位時改用容器查詢，父層標成容器後，門檻另算（@md 是 28rem，視窗的 md 是 48rem）。
- 客製化從 `@theme` 開始：品牌色、有意義的間距名稱（如 gutter）、字型與斷點，寫成變數就會長出對應的 class。
- 改不到標籤（CMS、第三方）時才用 `@apply` 收成 class，刻度沒有的值寫成方括號任意值，結尾加驚嘆號則標成 important。

# 專有名詞中英對照

## 建立 Node 開發環境

- 開發伺服器（development server）
- 終端機（terminal）
- 版本管理工具（version manager）
- 套件管理器（package manager）
- 幽靈依賴（phantom dependency）
- 打包器（bundler）
- 模組（module）
- 建置（build）
- 壓縮（minification）
- 插件（plugin）
- 範本（template）
- 專案產生器（project generator）
- 框架（framework）
- 開發依賴（development dependency）
- 靜態檔（static file）
- 入口 CSS（entry stylesheet）

## 認識 Tailwind

- 工具類（utility）
- 編譯器（compiler）
- 選擇器（selector）
- 原子化 CSS（utility-first）
- 設計系統（design system）
- 內距（padding）
- 圓角（border radius）
- 陰影（box shadow）
- 色階（color scale）
- 色族（color family）
- 不透明度（opacity）
- 色票（color palette）
- 間距（spacing）
- 外距（margin）
- 縫（gap）
- 刻度（spacing scale）
- 重置（CSS reset）
- 盒模型（box model）
- 原始碼（source code）
- 掃描（scanning）

## 基礎排版練習

- 按鈕（button）
- 連結（link）
- 滑過（hover）
- 停用（disabled）
- 鍵盤聚焦（focus-visible）
- 游標（cursor）
- 刪除線（line-through）

## 變體前綴

- 變體（variant）
- 前綴（prefix）
- 按下（active）
- 狀態變體（state variant）
- 焦點（focus）
- 外框（outline）
- 補間（transition）
- 核取方塊（checkbox）
- 深色模式（dark mode）
- 媒體查詢（media query）
- 根元素（root element）
- 權重（specificity）
- 本地儲存（local storage）

## RWD 與容器

- 響應式網頁設計（RWD）
- 版心（page container）
- 容器查詢（container query）
- 手機優先（mobile first）
- 斷點（breakpoint）
- 視窗（viewport）
- 門檻（threshold）
- 最小寬度（min-width）
- 範圍變體（range variant）
- 自訂斷點（custom breakpoint）
- 導覽列（navigation bar）
- 卡片牆（card grid）
- 最大寬度（max-width）
- 容器（@container）
- 具名容器（named container）

## 客製化

- 樣式表（stylesheet）
- 主題變數（theme variable）
- 品牌色（brand color）
- 備援字型（fallback font）
- 襯線字型（serif）
- 無襯線字型（sans-serif）
- 套用指令（@apply）
- 任意值（arbitrary value）
- 最高優先權（important）
- 自訂工具（@utility）
- 參照主題（@reference）
- 圖層（layer）
