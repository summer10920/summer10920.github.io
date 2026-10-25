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

Tailwind CSS 把常用的 CSS 宣告做成一粒一粒的 class，稱為 utility（工具類）。名字多半是「屬性－值」：`bg-teal-700` 是背景色，`p-4` 是內距。你把這些 class 寫在標籤上，Vite 在開發時編成瀏覽器看得懂的 CSS。

<!-- more -->

刻度、色票與前綴總表在 {% post_link lokiTech-15day-05-tailwind-cheatsheet TailwindCSS v4.1 公式表 %}。這一篇先在一台乾淨的電腦裝好 Node、pnpm 與 Vite，再走 Tailwind 的觀念。每個題目看一到兩個範例，再自己改一處。預覽以 Chrome 為準。按 <kbd>F12</kbd> 看 **Elements → Styles**，核對的是編成之後的 CSS。

這一篇的大主題與會用到的觀念：

- **建立 Node 開發環境**：nvs、Node 24、pnpm、Vite、手動專案，再進 `02-tailwind`
- **認識 Tailwind**：utility 命名、掃描、只輸出用到的 class
- **基礎排版練習**：按鈕、卡片
- **變體（前綴）**：滑過是 `hover:`，鍵盤聚焦是 `focus-visible:`。
- **變體（前綴）**：按下是 `active:`，深色是 `dark:`。
- **RWD 與容器**：手機優先、斷點、版心、容器查詢
- **客製化**：主題變數是 `@theme`，重複的一串收進 `@apply`。
- **客製化**：刻度沒有的長度用任意值，`!` 放在 class 最後。
- **選讀**：Play CDN、Preflight，以及 `group` 與 `peer`。
- **選讀**：導覽列、手動深色，以及 `@layer`。

{% note info %}
**網路上的舊版設定檔**
很多教學是 Tailwind v3 的寫法，會要你另外建立一份 JavaScript 設定檔。本課用 v4，主題設定直接寫在 CSS 裡，看到那種 config 檔可以當成舊版做法。

```js
// v3 教學常要你建立 tailwind.config.js
// 本課主題寫在 CSS 的 @theme，不建這份檔
```
{% endnote %}

# 建立 Node 開發環境

Tailwind 的 class 要先編成一般 CSS，瀏覽器才看得懂。編譯、安裝套件、開發伺服器都跑在 **Node.js** 上。這一章假設這台電腦剛還原、還沒裝過 Node：先裝版本切換工具 nvs 與 Node 24，再用 corepack 啟用 pnpm，認識 Vite，在練習倉庫手動做一個小專案，最後改到課堂準備好的練習環境。

```css
/* p-4 會編成 padding: 1rem */
```

```bash
# sandbox：倉庫根目錄，這一章手動建立，做壞了刪掉重建
# 02-tailwind：後面的課堂範例
```

{% note info %}
**已安裝過可跳過**
已安裝過 nvs／Node／pnpm 可跳過此步。仍請在新的終端機執行 `node -v` 與 `pnpm -v`，確認是 Node 24，而且找得到 pnpm。
{% endnote %}

## 安裝 Node 工具鏈

這一節把寫前端專案的底層工具裝好：先了解為什麼需要 Node，再用 nvs 安裝並切換 Node 24，最後用 corepack 啟用 pnpm。做完後，新開的終端機要能正確印出 `node -v` 與 `pnpm -v`。

### 為什麼需要 Node

Node.js 是瀏覽器以外的 JavaScript 執行環境。課堂用它安裝套件、啟動 Vite、把專案編成可以上線的檔案，不是用它寫後端、也不是開資料庫。你不需要先會 Node 的伺服器程式，才能做後面的頁面。

一般要執行 Node，會到 [Node.js 官網](https://nodejs.org/) 下載安裝檔，在電腦裝上一個版本。不過 Node 更新得很頻繁，公司或手上的專案各自建立的時間不同，需要的版本也不一樣；如果每次新專案都要求最新版，舊專案又得留在舊版，只裝一個版本會很難管理。所以業界通常會用 nvm 或 nvs 這類版本管理工具，在同一台電腦保留多個 Node 版本，需要時再切換。課堂用 **nvs**（Node Version Switcher），它可以用一行指令切換版本，也能依專案資料夾裡的 `.nvmrc` 自動換到對的版本。

### 用 nvs 安裝 Node 24

下面三個步驟依序完成：先裝 nvs，再用它裝 Node 24，最後設定進入專案時自動切換版本。

#### 步驟 1：安裝 nvs

nvs 在 Windows、macOS、Linux 用同一組指令安裝與切換 Node。裝好之後新開的終端機才吃得到指令；VS Code 裡已經開著的舊終端機要關掉重開。

{% note info %}
**已安裝過可跳過**
已安裝過 nvs 可跳過步驟 1。終端機輸入 `nvs`，出現可以選版本的選單即可。
{% endnote %}

Windows 用安裝檔。macOS 用官方的終端機指令，因為 nvs 沒有提供 macOS 安裝包。兩種都裝完後，關掉終端機再新開一個，輸入 `nvs` 確認。

到 [nvs 的 Releases](https://github.com/jasongin/nvs/releases) 下載 Windows 安裝檔（`.msi`），執行後一路下一步。裝完請完全關掉 VS Code 再打開，舊的終端機不會更新 PATH。

{% note info %}
**macOS**
macOS 請在終端機執行（需要第 1 天裝好的 Git）：

```bash
export NVS_HOME="$HOME/.nvs"
git clone https://github.com/jasongin/nvs "$NVS_HOME"
. "$NVS_HOME/nvs.sh" install
```

`install` 會把 nvs 寫進你的 shell 設定。關掉終端機再新開一個，輸入 `nvs`。
{% endnote %}

#### 步驟 2：安裝 Node 24

課堂固定 **Node 24**。下面三行分別負責下載、切換目前這個終端機，以及以後新開的終端機。

{% note info %}
**已安裝過可跳過**
已安裝過 Node 24 可跳過此步。`node -v` 顯示 `v24` 開頭即可，不必為了課堂再裝一次。
{% endnote %}

```bash
nvs add 24     # 把 Node 24 下載到這台電腦
nvs use 24     # 只影響目前這個終端機
nvs link 24    # 之後新開的終端機預設也是 24
node -v
```

最後一行應印出 `v24` 開頭的版本號。`nvs ls` 可以列出這台電腦已經有的 Node。

#### 步驟 3：用 .nvmrc 自動切換

有的專案要 24、有的專案以後可能要別的版本。在專案資料夾放一個文字檔 `.nvmrc`，裡面只寫一行版本。這個檔名是 nvm 的慣例，nvs 也讀得懂，所以不管同事用哪一套工具，都能依同一份檔案切到對的版本。

```text 02-tailwind/.nvmrc
24
```

自動切換預設是關閉的，要先打開一次。打開之後，進入放了版本檔的資料夾，終端機裡的 Node 會改用檔案指定的版本（還沒裝時會自動下載）；離開資料夾則回到預設版本。不想開自動切換的話，進資料夾後也可以手動切一次。

```bash
nvs auto on    # 打開後，cd 進有 .nvmrc 的資料夾就會自動換 node
nvs use auto   # 不想開自動切換時，進資料夾後改執行這行
```

{% note info %}
**自動切換的小提醒**

- Windows 請在 PowerShell 或 VS Code 的終端機（預設是 PowerShell）使用，命令提示字元（cmd）不支援自動切換。
- 有些專案用的是 `.node-version`，nvs 一樣會讀。
- nvm 只認 `.nvmrc`，所以課堂統一用這個檔名。
{% endnote %}

### 啟用 pnpm（corepack）

**套件管理器**負責下載專案要的工具（Vite、Tailwind）並記住版本。Node 自己帶的是 **npm**。課堂改用 **pnpm**：磁碟上同一版套件只留一份，而且你沒寫進 `package.json` 的套件不能被拿來 `import`（npm 有時可以，那種沒宣告卻用得到的套件叫幽靈依賴，換一台電腦就會壞）。

pnpm 不要用 `npm install -g pnpm` 安裝。Node 24 附帶 **corepack**，用它啟用 pnpm 即可。

{% note info %}
**已安裝過可跳過**
已安裝過 pnpm 可跳過此步。`pnpm -v` 印得出版本號即可。
{% endnote %}

```bash
corepack enable
pnpm -v
```

若 `pnpm` 仍找不到，或版本很舊，再執行：

```bash
corepack prepare pnpm@latest --activate
pnpm -v
```

Windows 若出現權限不足，用「以系統管理員身分執行」開一次終端機，只跑 `corepack enable`，然後回到 VS Code 的終端機再測 `pnpm -v`。

npm 與 pnpm 的差別：

- **怎麼來的**：npm 為 裝 Node 就有；pnpm 為 `corepack enable` 啟用。
- **磁碟**：npm 為 每個專案各存一份套件；pnpm 為 同一版本全機共用。
- **沒寫進 package.json 的套件**：npm 為 有時仍能 import；pnpm 為 不能 import。
- **安裝**：npm 為 `npm install`；pnpm 為 `pnpm install`。
- **新增開發套件**：npm 為 `npm install -D 套件`；pnpm 為 `pnpm add -D 套件`。

指令幾乎一一對應。課堂後面都用 pnpm。`pnpm dev` 等於 `pnpm run dev`。

## 用 Vite 建立 Tailwind 專案

工具裝好後，接著認識 Vite 這個開發伺服器與打包器，自己從空白範本做出一個 Tailwind 專案，確認整條流程能跑；最後再換到課堂準備好的 `02-tailwind`，讓大家的練習環境一致。

### 認識 Vite

**Vite**（發音 /vit/）同時是開發伺服器與打包器。開發時它起一個本機網站，瀏覽器依 ES modules 跟它要目前用到的檔，改存檔就更新那一塊，不必先把整個專案黏成一支大檔，所以啟動很快。

上線不能靠這個開發伺服器。建置會把真正用到的模組打包、壓縮，輸出到成品資料夾，為的是少發很多次小檔請求，並拿掉沒被用到的程式。Tailwind 的插件在開發和建置都會跑：開發時編成你正在看的 CSS，建置時把那份 CSS 放進成品裡。直接用檔案總管雙擊 HTML 不會經過 Vite，utility 就不會生效。

```bash
pnpm build   # 打包、壓縮，輸出到 dist/；建置時 Tailwind 的 CSS 也放進這裡
# 檔案總管雙擊 HTML 是 file: 網址，不會經過 Vite
```

### 手動建立專案（sandbox）

先在練習倉庫裡把工具鏈走通：Vite 的空白範本、加上 Tailwind、改一個 class、看到畫面、再產出成品。專案建在倉庫根目錄，自己動手試做，和後面準備好的課堂專案分開，做壞了刪掉重建即可。

```bash
# sandbox：試做專案，建置結果在 sandbox/dist/
# 02-tailwind：課堂範例，和 sandbox 分開
```

#### 建立專案

在 VS Code 開一個新的終端機，它會停在倉庫根目錄（Windows 多半是 PowerShell，macOS 是 zsh，後面的指令兩邊相同）。

這是課堂上第一行「建立專案」的指令：請 pnpm 下載 Vite 官方的專案產生器，用純 HTML、CSS、JavaScript 的範本，在目前位置建立 `sandbox` 資料夾。先看完整指令，再看拆開的註解：

```bash
pnpm create vite@latest sandbox -- --template vanilla
```

```bash
pnpm create          # 執行「專案產生器」：暫時下載 create-xxx 套件來跑，用完不留在電腦上
  vite@latest        # 產生器是 create-vite，@latest 表示用最新版
  sandbox            # 專案資料夾名稱，會建在目前所在的倉庫根目錄
  --                 # 分隔線：後面的參數原封不動交給產生器（npm 必須寫，pnpm 寫了也沒關係）
  --template vanilla # 範本：vanilla 是不加任何框架的純 JS；另有 react、vue 等範本
```

{% note success %}
**試試：不指定範本**
也可以拿掉範本參數，改用互動選單建立另一個資料夾。畫面會一步步問你框架（Framework）與語言（Variant），用方向鍵選、Enter 確定。選 Vanilla、JavaScript 會得到和上面一樣的結果；也可以換別的選項，再打開兩個資料夾比較套件清單與檔案結構有什麼不同。試完不需要的資料夾直接刪掉即可。

```bash
# 拿掉 --template，改走互動選單；sandbox2 是另一個資料夾
pnpm create vite@latest sandbox2
# 完成後比較兩邊的 package.json
```
{% endnote %}

產生器只負責放檔案，還沒有下載任何套件。所以接著進入資料夾，依範本的 `package.json` 安裝 Vite 等工具：

```bash
cd sandbox     # 進入剛建立的專案資料夾
pnpm install   # 依 package.json 下載套件到 node_modules/
```

#### 加入 Tailwind

範本此時還不懂 `bg-teal-700`。下面三步把 Tailwind v4 的 Vite 插件接上，並讓入口 CSS 載入它。官方安裝說明見 [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)。

##### 步驟 1：安裝套件

這兩個套件只在開發與建置時用，所以加開發依賴。

```bash
# -D 表示 devDependency，只在開發與建置時用
pnpm add -D tailwindcss @tailwindcss/vite
```

##### 步驟 2：設定 vite.config.js

在專案根目錄建立設定檔。若範本已經有這份檔，就改成下面這樣。

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()], // plugins 裡要有 tailwindcss()
});
```

{% note info %}
**網路上的 postcss.config.js**
在 v3 以前，Tailwind 本身是一個 PostCSS 插件（PostCSS 是用 JavaScript 處理 CSS 的工具），所以舊教學會要你多建一份 `postcss.config.js`，再另外安裝 autoprefixer 來補瀏覽器前綴。

v4 改用 Tailwind 自己的編譯引擎，前綴這類處理也內建了。在 Vite 專案裡，它直接當 Vite 插件執行，也就是上面那一行，不需要 PostCSS 設定檔。只有不使用 Vite 的專案，才會改裝 `@tailwindcss/postcss`，把它當 PostCSS 插件使用。看到要你建 `postcss.config.js` 的教學，多半是 v3 的寫法，課堂上不用照做。
{% endnote %}

##### 步驟 3：匯入 tailwindcss

把入口樣式表的內容換成這一行。範本原本的 CSS 會蓋掉你要試的 utility，所以不要留著。

```css
/* 取代 src/style.css 原本的內容 */
@import "tailwindcss";
```

範本的 JavaScript 已經會載入這份 CSS，不用再改。接著打開 `index.html`，在原本的容器前面加一行標題。class 要寫成完整的名稱，Tailwind 才掃描得到：

```html
<body>
  <!-- 新增這行：text-3xl 字級、font-bold 粗體、text-teal-700 深青綠字 -->
  <h1 class="text-3xl font-bold text-teal-700">Tailwind 有編譯到</h1>
  <div id="app"></div>
  <!-- 範本原本就有：main.js 會 import style.css -->
  <script type="module" src="/src/main.js"></script>
</body>
```

改完記得存檔。

#### 啟動與建置

在 `sandbox` 目錄啟動開發伺服器，終端機會印出 Local 網址，多半是 `http://localhost:5173/`。用 Chrome 打開，應看到那行青綠大字。

```bash
pnpm dev   # 日常開發；終端機印出的 Local 多半是 http://localhost:5173/
```

看完在終端機按 <kbd>Ctrl</kbd>+<kbd>C</kbd> 停掉。要產出上線用的檔案再執行：

```bash
pnpm build   # 輸出到 dist/，是打包後的檔，不是正在編輯的 src/
```

建置結果是打包後的 HTML、CSS 與 JavaScript，放在輸出資料夾，不是你正在編輯的原始碼。之後日常開發仍用開發伺服器，要交靜態檔時才再跑建置。

### 改用 02-tailwind 練習環境

試做專案確認工具鏈沒問題即可，之後想試新寫法也可以回來用。後面的範例都在課堂專案，Tailwind 插件、入口 CSS 與 Prettier 已經接好。在 VS Code 新開一個終端機（它會開在倉庫根目錄），再進入專案、安裝、啟動；若目前終端機還停在試做資料夾，先回到根目錄。

{% note info %}
**為什麼這裡不用 iframe**
02、03 的練習站用左邊選單加 iframe，是因為那時還沒有 Node 與 Vite，只能讓瀏覽器在同一頁裡再開一個頁面。現在 02-tailwind 跑在 Vite 上，就改用 `vite-plugin-html-inject` 這個 Vite 套件：每一頁寫一行 `<load src="../partials/nav.html" />`，Vite 會在開發與建置時把選單的 HTML 直接貼進該頁。

這樣做有幾個好處：

- 每一頁都是完整、獨立的網頁，網址列就是目前這一頁，可以重新整理、加書籤或分享。
- Tailwind 掃描得到選單裡的 class，樣式不會遺漏。
- 也不需要任何 JavaScript。

正式網站的共用頁首、頁尾，也是在建置或伺服器端組合，不會用 iframe 拼頁面。
{% endnote %}

```bash
cd ..            # 若還停在 sandbox，先回到倉庫根目錄
cd 02-tailwind   # 後面的範例都在這裡
pnpm install
pnpm dev
```

同樣用終端機印出的 Local 網址開 Chrome。建置會把這個專案輸出到它自己的成品資料夾。套件清單要求的 Node 至少是 24；若安裝時抱怨版本，回到上面確認版本號，並確認你在這個資料夾裡，版本檔會讓切換工具對到課堂版本。

```bash
# pnpm build 輸出到 02-tailwind/dist/
# package.json 的 engines.node 是 >=24
node -v   # 安裝若抱怨版本，確認是 v24 開頭；.nvmrc 會讓 nvs 切到 24
```

多數頁面在頁尾載入入口腳本，模組類型讓 Vite 處理裡面的匯入。路徑以斜線開頭，表示這個專案的根目錄。

```js 02-tailwind/src/main.js
import './style.css'; // Vite 會處理這個 import
```

```html
<!-- 放在 body 結尾；type="module" 讓 Vite 處理 import -->
<!-- src 以 / 開頭，表示這個專案的根目錄 -->
<script type="module" src="/src/main.js"></script>
```

入口 CSS 以這一行開頭，後面的 `@theme` 與此同一份檔：

```css 02-tailwind/src/style.css
@import "tailwindcss";
```

排版用專案裡的 Prettier：要分號、雙引號、2 空格。這一階段不放 ESLint。VS Code 的 Tailwind CSS IntelliSense 會在你打 `bg-` 時列出色族；候補仍要能翻回 CSS。

```json 02-tailwind/.prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
}
```

# 認識 Tailwind

一個 utility 只做一件事，組合發生在標籤上。這一章先把同一張卡片的兩種寫法並排看過，再練怎麼切開 class 名字：字首是哪個屬性、最後一段是色階還是字級、數字是哪一格間距，最後看編譯器為什麼只輸出原始碼裡出現過的完整字串。按鈕和卡片的排版在下一章。

## 用 class 描述外觀

這一節把「為什麼拆開」和「名字怎麼讀」放在一起：先看傳統選擇器與 utility 的差別，再依序練屬性、色階、間距。總表在公式表，這裡只練怎麼對上畫面。

### utility-first 是什麼

傳統寫法把內距、圓角、背景收進同一個選擇器，改一個圓角要先找到它；名字若要把所有外觀都塞進去，會愈加愈長。**utility-first**（原子化 CSS）把設計系統裡量好的間距、顏色、字級做成固定詞彙，一顆 class 只管一件事。見 [用 utility 寫樣式](https://tailwindcss.com/docs/styling-with-utility-classes)。

**觀念**

左邊那張卡的外觀寫在 `style` 裡，class 是元件名字。右邊同一組圓角、白底、陰影、圖片高度和按鈕色，拆成標籤上的 class。畫面要長得一樣，差別在你改顏色時要回去找選擇器，還是直接改那一顆 class。

{% note info %}
**同一顆元素留一顆同屬性的 class**
兩顆 class 若改到同一個 CSS 屬性，誰勝出看編成後樣式表裡的順序。`p-4` 和 `p-8` 都在改四邊內距，同時留著會讓人以為兩個都有效。同一屬性留一顆。
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

- 頁面是淺石色底。
- 標題下面有一行說明，再來是兩張並排的卡片。
- 視窗不夠寬時改成上下堆，中間有一道縫。
- 兩張卡都是上面一張橫幅照片、青綠色小字眉題、標題、灰色摘要、深青綠價錢，以及一顆青綠底白字的連結。
- 照片的角跟著卡片圓角被切掉，沒有方圖凸出圓角外面。
- 左邊這些效果集中在樣式表的選擇器裡。
- 要把按鈕從青綠改成別的顏色，得回去改連結那條規則。
- 右邊每一塊可見的顏色、留白、圓角都在自己的標籤上，改價錢顏色只動價錢那一顆 class。

```html
<!-- 外層 flex flex-wrap items-start gap-6：橫排、放不下換行、頂端對齊、縫 1.5rem -->
<!-- 右邊 max-w-sm 是 24rem；overflow-hidden 配 rounded-2xl，圖片才跟著切角 -->
<!-- h-44 w-full object-cover：高 11rem、寬 100%、裁成同一高度 -->
<!-- p-5 是 1.25rem 內距；shadow-md 是中等陰影 -->
```

{% note success %}
**換你試試：**
只改右邊那張卡。價錢下面加一行「每週六出發」，字級小一號、用石色。右邊那顆連結的圓角加大到跟卡片同一階。刻度在 [border-radius](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#border-radius)。
{% endnote %}

<details>
<summary>參考答案</summary>

這行小字只改字級和顏色，加在右邊的標籤上就會出現，不用回樣式表新增選擇器。按鈕圓角加大到跟卡片同一階，只動這一顆連結。左邊維持原樣，並排時才看得出右邊多了一行、按鈕更圓。

```diff 02-tailwind/pages/01-compare.html
  // ...
            <p class="mt-2 text-sm leading-6 text-stone-600">清晨走峽谷步道，下午到七星潭看海。含兩晚住宿。</p>
            <p class="mt-3 text-lg font-semibold text-teal-900">NT$16,800</p>
-           <a class="mt-4 inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white" href="#book">
+           <p class="mt-1 text-xs text-stone-500">每週六出發</p>
+           <a class="mt-4 inline-block rounded-2xl bg-teal-700 px-4 py-2 text-sm font-medium text-white" href="#book">
              看行程
            </a>
          // ...
```

</details>

### 屬性與值

讀 class 時先切最後一段，再看字首。這一節用一則春季梯公告，把「文字顏色」和「字的大小」放在同一張卡上，因為兩者的字首都是 `text`。

**觀念**

名字多半是「屬性－值」，中間用連字號分開：字首代表要改哪一個 CSS 屬性，最後一段是顏色、字級或色階。總表在公式表，這裡只練怎麼切這個名字。

#### 步驟 1：先看最後一段

名字用連字號切開之後，先讀最後一段。那一段若是色族加數字，就是顏色；若是 `sm`、`xl` 這種字級，就是大小。字級見 [font-size](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#font-size)，色名見 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)。

#### 步驟 2：再看字首接到什麼

最後一段決定值，字首決定它要改哪一個 CSS 屬性。`bg` 接到色名就是背景色；`text` 接到色名是文字顏色，接到字級卻是字的大小。同一個字首會因後面的值變成不同屬性。

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

- 畫面是一張白底卡片。
- 最上面一行又小又綠。
- 標題明顯大上一截，字色是接近黑的石色。
- 內文比標題小，灰色，行距比較鬆。
- 價錢再放大，而且換成深青綠。
- 最下面是一塊青綠底、白字的連結。
- 眉題同時有小字和綠色，所以是兩顆 class：一顆管大小，一顆管顏色。
- 標題那個字首後面接到字級，所以只把字變大，沒有順便上色。
- 按鈕的青綠來自背景那顆 class，跟眉題的文字色不是同一件事。

{% note success %}
**換你試試：**
標題從現在的字級再大一階。眉題「2026 春季梯」改成琥珀色，讓日期提醒和深青綠價錢分開。字級見 [font-size](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#font-size)。
{% endnote %}

<details>
<summary>參考答案</summary>

標題的 `text-` 改接到更大的字級，字變大，顏色沒有一起改。眉題改接琥珀色，它仍是小字，只是不再跟價錢一樣綠。

```diff 02-tailwind/pages/02-naming.html
  // ...
    <body class="bg-stone-50 p-6 text-stone-900">
      <article class="max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
-       <p class="text-sm font-medium text-teal-700">2026 春季梯</p>
-       <h1 class="mt-1 text-3xl font-bold text-stone-900">花蓮太魯閣三日</h1>
+       <p class="text-sm font-medium text-amber-800">2026 春季梯</p>
+       <h1 class="mt-1 text-4xl font-bold text-stone-900">花蓮太魯閣三日</h1>
        <p class="mt-3 text-base leading-7 text-stone-600">
          第一天進太魯閣，第二天走清水斷崖，第三天在七星潭解散。含兩晚住宿與早餐。
        // ...
```

</details>

### 色階與透明度

同一個色族從很淺排到很深。這一節把淺底、標籤、實心按鈕和半透明橫條放在同一張卡片上，看出數字和斜線各自改什麼。

**觀念**

每個色族從很淺排到很深，數字越小越淺。最淺那階常用來當底，偏深的幾階常用來當字或實心按鈕。斜線後面是這顆色的不透明度，沿用同一顆色，只是把透明度降下來。色階見 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)，整顆一起變淡見 [opacity](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#opacity)。

{% note warning %}
**琥珀色 500 太亮**
`amber-500` 當底再配白字，字會融進背景。提示改用淺琥珀底配深色字。
{% endnote %}

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

- 整頁底是很淺的青綠，中間一張白卡。
- 照片底部壓著一條深色橫條，照片還透得出來，因為那條底不是全不透明。
- 淺底深字的標籤，跟實心按鈕不是同一階。
- 標題幾乎是這顆色最深的一階。
- 摘要仍是深色，但比標題淡。
- 實心按鈕是偏深的底配白字。
- 最下面另一段是另一個色族：淺琥珀底、深色字。
- 斜線只降這一顆色的透明度。
- 若改用整顆元素一起變淡，字和底會同時淡掉，席次那行就不好讀。

```html
<!-- 50 當頁面底，100 當標籤底，700 當實心按鈕，900 與 950 當深字 -->
<!-- /70、/80 是不透明度。照片上的橫條用背景的斜線，字保持白色 -->
<!-- absolute inset-x-0 bottom-0：橫條貼齊照片左、右、底 -->
```

{% note success %}
**換你試試：**
把「剩餘 4 席」的不透明度再降，讓海岸多露出來。再在「花蓮 · 一日」旁邊加一顆實心標籤「含早餐」，底和字跟「報名這梯」同一組。
{% endnote %}

<details>
<summary>參考答案</summary>

橫條從 70% 改成 40%，還是同一顆深青綠，只是更透。 「含早餐」用實心那一階配白字，跟淺底標籤並排，才看得出 100 和 700 的差別。

```diff 02-tailwind/pages/05-palette.html
  // ...
        <div class="relative">
          <img class="h-52 w-full object-cover" src="https://picsum.photos/id/1015/800/500" alt="清水斷崖海岸" />
-         <p class="absolute inset-x-0 bottom-0 bg-teal-900/70 px-4 py-2 text-sm text-white">剩餘 4 席</p>
+         <p class="absolute inset-x-0 bottom-0 bg-teal-900/40 px-4 py-2 text-sm text-white">剩餘 4 席</p>
        </div>
        <div class="space-y-3 p-5">
          <div class="flex flex-wrap gap-2">
            <p class="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">花蓮 · 一日</p>
+           <p class="rounded-full bg-teal-700 px-3 py-1 text-xs font-medium text-white">含早餐</p>
          </div>
          <h1 class="text-2xl font-bold">清水斷崖日出</h1>
          // ...
```

</details>

### 間距單位

內距、外距和元素之間的縫用同一套數字。這一節用一張卡片，把卡片內距、標題外距、標籤縫和清單縫分開看。

**觀念**

內距的數字是刻度，乘上預設的一級間距（四分之一 rem）。字級 16px 時，數字 4 的四邊就是 16px，畫面上的像素也會跟著瀏覽器字級變。只加左右、只加上下、外距，以及並排元素的縫，是同一套刻度換字首。寫法見 [padding](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#padding)。

{% note info %}
**同一軸留一種縫**
相鄰元素的上下距離，父層用縫或用外距其中一種。同一顆元素又寫縫又寫上下外距，空隙會疊加，之後很難調。
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
      <!-- gap-3：標籤彼此相距 0.75rem。這顆用 gap，不再寫 space-y -->
      <div class="mt-4 flex flex-wrap gap-3 text-sm">
        <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">集合 08:30</span>
        <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">車站東門</span>
        <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">含午餐</span>
      </div>
      <!-- space-y-3：清單上下相鄰 0.75rem -->
      <ul class="mt-4 space-y-3 text-sm leading-6 text-stone-700">
        <!-- px-4 py-3：左右 1rem、上下 0.75rem，跟父層的縫是兩件事 -->
        <li class="rounded-lg bg-stone-50 px-4 py-3">上午：松園別館散步</li>
        <li class="rounded-lg bg-stone-50 px-4 py-3">中午：公正街包子</li>
        <li class="rounded-lg bg-stone-50 px-4 py-3">下午：七星潭看海</li>
      </ul>
      <!-- px-4 py-2：按鈕左右 1rem、上下 0.5rem。mt-6 把它再往下推 1.5rem -->
      <a class="mt-6 inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white" href="#day1">
        看集合地圖
      </a>
    </article>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 淺石色頁面上有一張白卡，卡片和視窗邊緣有一圈留白，卡片裡的文字也沒有貼邊。
- 標題緊接著一行灰色說明，中間只有一小段空隙。
- 三顆淺青綠標籤排成一列，彼此有縫，放不下會換行。
- 下面三列各自有淺底和內距，列與列之間再空一截。
- 最下面那顆連結離最後一列更遠，按鈕本身左右寬、上下扁。
- 標籤那一列的縫寫在父層，每一顆標籤自己的左右留白是另一顆 class。
- 清單的列距也寫在 `ul` 上，列裡的內距寫在 `li` 上。
- 數字一樣時，換字首就換到不同方向。

```html
<!-- p- 四邊內距，px- 只有左右，py- 只有上下，m- 與 mt- 是外距 -->
<!-- gap- 是 flex 或 grid 的縫；space-y- 是直向相鄰元素的外距 -->
<!-- 橫排用到 flex，版面那一章再拆。這裡先看縫 -->
```

{% note success %}
**換你試試：**
卡片四邊內距從 6 加大到 8。三顆時間標籤的縫、以及清單列之間的距離，都從 3 改成 6。顏色和字級不要動。
{% endnote %}

<details>
<summary>參考答案</summary>

數字是同一套刻度。卡片內距變成 2rem，標籤縫和清單列距都變成 1.5rem。清單裡的文字與顏色保持原樣。標籤列仍只用縫，清單仍只用直向間距，沒有疊在同一顆元素上。

```diff 02-tailwind/pages/15-scale.html
  // ...
    </head>
    <body class="bg-stone-100 p-6 text-stone-900">
-     <article class="max-w-md rounded-2xl bg-white p-6 shadow-sm">
+     <article class="max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 class="text-2xl font-bold">第一天 · 花蓮市區</h1>
        <p class="mt-2 text-sm text-stone-600">車站東門集合，走完市區再北上七星潭。</p>
-       <div class="mt-4 flex flex-wrap gap-3 text-sm">
+       <div class="mt-4 flex flex-wrap gap-6 text-sm">
          <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">集合 08:30</span>
          <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">車站東門</span>
          <span class="rounded-full bg-teal-50 px-3 py-1 text-teal-800">含午餐</span>
        </div>
-       <ul class="mt-4 space-y-3 text-sm leading-6 text-stone-700">
+       <ul class="mt-4 space-y-6 text-sm leading-6 text-stone-700">
          <li class="rounded-lg bg-stone-50 px-4 py-3">上午：松園別館散步</li>
          <li class="rounded-lg bg-stone-50 px-4 py-3">中午：公正街包子</li>
          // ...
```

</details>

### 選讀：Preflight 重置了什麼

入口那一行會帶入 Preflight，所以幾件瀏覽器預設會被改掉：

- 標題和段落的預設外距會被拿掉，沒寫上外距時，標題會貼著上一塊。
- 盒模型把邊框算在寬高裡面。
- 圖片預設是區塊，最大寬度跟父層一樣。
- 按鈕會繼承字型。

某一塊突然貼在一起時，先補上外距，或讓父層的子元素彼此隔開。

**觀念**

`@import "tailwindcss"` 會順便做這層重置。下面兩張卡的文字、清單、圖片、按鈕內容相同：左邊沒有另外寫上下外距，所以區塊貼在一起；右邊只在父層加上直向間距，同一份內容就分開了。

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
    <p class="mb-6 max-w-prose text-sm text-stone-600">左邊那張卡沒有另外加上外距。右邊用父層把同一份內容撐開。</p>
    <div class="flex flex-wrap items-start gap-6">
      <!-- w-80 是 20rem。border-4 的框算在這 20rem 裡面，卡片不會因為加框變寬 -->
      <section class="w-80 max-w-full rounded-2xl border-4 border-stone-200 bg-white p-5">
        <p class="text-sm font-medium text-teal-700">花蓮小團</p>
        <h2 class="text-xl font-semibold">太魯閣三日</h2>
        <p class="text-sm text-stone-600">清晨進峽谷，下午到海邊。</p>
        <ul class="list-disc pl-5 text-sm text-stone-700">
          <li>太魯閣步道</li>
          <li>七星潭</li>
        </ul>
        <!-- 圖片是區塊、最大寬度 100%，所以獨佔一行，不會跟文字並排 -->
        <img class="w-full rounded-lg" src="https://picsum.photos/id/1016/800/500" alt="七星潭海岸" />
        <!-- 沒有另設字型，按鈕跟旁邊內文同一套字 -->
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
        <img class="h-36 w-full rounded-lg object-cover" src="https://picsum.photos/id/1016/800/500" alt="七星潭海岸" />
        <button type="button" class="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">我要報名</button>
      </section>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 兩張白卡並排，都有一圈石色框。
- 左邊的眉題、標題、摘要、清單、照片和按鈕緊緊疊在一起，中間幾乎沒有空隙。
- 右邊同一份文字被撐開，照片也裁成較矮的橫幅。
- 框線沒有把卡片撐得比預定寬度更寬，因為邊框算在寬高裡面。
- 照片獨佔一行，是圖片預設變成區塊、而且最寬不超過父層。
- 按鈕的字看起來跟內文同一套，因為按鈕繼承字型，這一顆又用字級 class 把大小說清楚。

```css
/* @import "tailwindcss" 會帶入 Preflight */
/* 盒模型是 border-box；圖片 display:block、max-width:100% */
/* 沒寫上外距時，標題會貼著上一塊；父層用直向間距可一次分開 */
```

{% note success %}
**換你試試：**
左邊改成跟右邊一樣分開，並把左邊照片裁成同樣的橫幅高度。不要逐顆加上外距。
{% endnote %}

<details>
<summary>參考答案</summary>

`space-y-4` 讓父層的子元素上下隔開 `1rem`，一次補回被拿掉的預設外距，所以不必每顆都寫上外距。圖片固定高度並用裁切填滿，才會跟右邊一樣是橫幅，而不是整張原圖的高度。

```diff 02-tailwind/pages/29-preflight.html
  // ...
      <p class="mb-6 max-w-prose text-sm text-stone-600">左邊那張卡沒有另外加上外距。右邊用父層把同一份內容撐開。</p>
      <div class="flex flex-wrap items-start gap-6">
-       <section class="w-80 max-w-full rounded-2xl border-4 border-stone-200 bg-white p-5">
+       <section class="w-80 max-w-full space-y-4 rounded-2xl border-4 border-stone-200 bg-white p-5">
          <p class="text-sm font-medium text-teal-700">花蓮小團</p>
          <h2 class="text-xl font-semibold">太魯閣三日</h2>
          // ...
            <li>七星潭</li>
          </ul>
-         <img class="w-full rounded-lg" src="https://picsum.photos/id/1016/800/500" alt="七星潭海岸" />
+         <img class="h-36 w-full rounded-lg object-cover" src="https://picsum.photos/id/1016/800/500" alt="七星潭海岸" />
          <button type="button" class="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">我要報名</button>
        </section>
        // ...
```

</details>

## 只輸出用到的 class

編譯器掃描的是原始碼裡的完整字串，瀏覽器後來改過的畫面它看不到。這一節用兩張卡片對照：一顆標籤的背景寫在檔案裡，另一顆沒有。

**觀念**

檔案裡出現完整的 class 名字，這條規則才會產生。v4 會自己找模板檔，以前要手寫的檔案清單可以省掉。註解裡提到的名字、或把字首和色名拆開再接起來的寫法，都對不到那條規則。

{% note warning %}
**class 要是原始碼裡的完整字串**
`bg-rose-700` 必須整串出現在 class 上。只在註解裡寫、或在瀏覽器裡臨時拼上去，樣式表裡不會有這條背景。
{% endnote %}

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
        <!-- bg-teal-700 整串寫在檔案裡，背景才是青綠 -->
        <p class="mt-4 inline-block rounded-full bg-teal-700 px-3 py-1 text-sm font-medium text-white">可報名</p>
      </article>
      <article class="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-5">
        <h2 class="text-lg font-semibold">清水斷崖一日</h2>
        <p class="mt-2 text-sm text-stone-600">4/18 出發 · 候補中</p>
        <!-- 只有框線。檔案裡沒有 bg-rose-700 -->
        <p class="mt-4 inline-block rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-700">候補中</p>
      </article>
    </div>
    <p class="mt-4 max-w-prose text-sm text-stone-600">
      第二顆標籤先不要寫背景。用 F12 在 Elements 加上 bg-rose-700，再對照存檔後的結果。
    </p>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**解析**

- 兩張白卡橫排。
- 第一張卡片下面有一顆深青綠、白字、全圓的標籤。
- 第二張的標籤只有淺框和深色字，中間是白的。
- 說明那一行提醒你下一步要在開發者工具裡試。
- 第一顆標籤的背景分成三段：字首是背景色，中間是色族，最後是偏深的那一階。
- 第二顆還沒有這三段組成的完整名字，所以沒有玫瑰色底。

```html
<!-- 可報名：bg-teal-700 背景、text-white 白字、rounded-full 全圓 -->
<!-- 候補中：border-stone-300 只有框，沒有背景 class -->
```

### 步驟 1：在 DevTools 加上沒寫過的 class

這一步確認編譯器沒看到的名字，不會出現在樣式表。打開第二顆「候補中」，按 <kbd>F12</kbd>，在 Elements 面板把它的 class 手動加上 `bg-rose-700`。背景不會變，因為檔案裡從沒出現過這個 class，編成的 CSS 裡就沒有它。

### 步驟 2：把 class 寫回檔案

回到編輯器，把背景和白字寫進第二顆標籤的 class，存檔後編譯器才掃得到。這一步就是下面的練習。

{% note success %}
**換你試試：**
把第二顆「候補中」的背景直接寫進檔案，改成玫瑰色，字改白色。色名在 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)。
{% endnote %}

<details>
<summary>參考答案</summary>

class 寫進檔案、存檔後，編譯器掃到完整字串，背景才變成玫瑰色。白字在深底上比較讀得清楚。開發者工具裡臨時加過的名字在重新整理後會消失，以檔案裡的為準。

```diff 02-tailwind/pages/04-scan.html
  // ...
          <h2 class="text-lg font-semibold">清水斷崖一日</h2>
          <p class="mt-2 text-sm text-stone-600">4/18 出發 · 候補中</p>
-         <p class="mt-4 inline-block rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-700">候補中</p>
+         <p class="mt-4 inline-block rounded-full bg-rose-700 px-3 py-1 text-sm font-medium text-white">候補中</p>
        </article>
      </div>
      // ...
```

</details>

### 選讀：Play CDN

有些舊教學讓你在頁首貼一段會在瀏覽器裡臨時編譯的 script，但正式站的體積不好控，也沒有這個專案的主題設定。這一節只幫你認得那段 script，課堂仍走 Vite。

**觀念**

舊路徑是在 `head` 貼一段外站 script，瀏覽器開頁時才編譯。本課的樣式從 CSS 入口進來，主題之後寫在 `@theme`，不另建 JavaScript 設定檔。看到教學要你用設定檔改主題，把它當成舊路徑。

```html
<!-- 舊教學常在 head 貼這段，課堂不要貼 -->
<script src="https://cdn.tailwindcss.com"></script>
```

```js
// 舊路徑：tailwind.config = { theme: { extend: ... } }
// 本課的主題在 CSS 的 @theme
```

**解析**

- 那段 script 的網址是 `cdn.tailwindcss.com`。
- 它會在瀏覽器裡現編一套預設 utility，不會讀你專案裡的 `@theme`，也無法跟 Vite 的建置放在一起。
- 入口改成下面這一行之後，頁面上的 class 才會進到本機編成的樣式表。

```css 02-tailwind/src/style.css
@import "tailwindcss";
/* 後面的 @theme 留給品牌色與斷點，這一節不要刪 */
```

{% note success %}
**換你試試：**
打開 CSS 入口，確認第一行是上面的匯入，而且專案裡沒有 JavaScript 設定檔。
{% endnote %}

<details>
<summary>參考答案</summary>

入口就是這一行。v4 會從這裡帶入 Preflight 和 utility，主題留在同一個 CSS 檔後面的主題區塊。舊教學的 script 與設定檔不要加進這個專案，也不要把入口檔覆蓋成只有這一行。

```css 02-tailwind/src/style.css
@import "tailwindcss";
/* 後面的 @theme 留給品牌色與斷點，這一節不要刪 */
```

</details>

# 基礎排版練習

名字讀得懂之後，用同一套詞彙排一組動作和一張卡片。去別的網址和在這一頁做事，用的標籤不一樣；圖、標題、摘要和價錢則放在同一篇文章區塊裡。

## 按鈕

這一節排一組動作：主要動作是實心連結，次要動作是線框，說明用文字按鈕，不能按的那顆停用。四顆放在同一列，用畫面差異記住 class。

**觀念**

這一頁的動作分成幾種：

- 實心用深底白字，是主要動作。
- 線框是次要動作。
- 文字按鈕滑過才加底線。
- 去別的網址用連結；在這一頁做事用按鈕，並寫上 `type="button"`。
- 停用時加上停用屬性，顏色改成 stone，游標改成禁止點擊的樣子。

{% note info %}
**冒號是條件**
滑過才變深、鍵盤聚焦才出現外框，都是條件寫在 utility 前面。下一章會把這類前綴拆開。這一節先把它留在主要動作上，看畫面變化。
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
        <!-- inline-flex 寬度依內容縮；rounded-lg 圓角 0.5rem -->
        <!-- bg-teal-700 青綠底；px-4 py-2 左右 1rem、上下 0.5rem；text-white 白字 -->
        <!-- hover:bg-teal-800 滑過再深一階 -->
        <!-- focus-visible:outline-2 與 outline-offset-2、outline-teal-900：鍵盤聚焦才畫外框 -->
        <a
          class="inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
          href="#book"
        >
          立即預訂
        </a>
        <!-- border-teal-700 框、bg-white 白底、hover:bg-teal-50 滑過淺底 -->
        <button
          type="button"
          class="rounded-lg border border-teal-700 bg-white px-4 py-2 font-medium text-teal-800 hover:bg-teal-50"
        >
          加入比較
        </button>
        <!-- hover:underline 滑過才加底線；underline-offset-4 把底線推開 -->
        <button type="button" class="rounded-lg px-4 py-2 font-medium text-teal-800 underline-offset-4 hover:underline">
          退改規則
        </button>
        <!-- disabled 停用；bg-stone-300、text-stone-500、cursor-not-allowed -->
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

- 白底卡片上半是一行青綠色小字、一個標題、一行說明，以及深青綠價錢。
- 價錢後面的小字比價錢小、顏色較淡。
- 下半一排四個動作，放不下就換行，垂直對齊，彼此有縫。
- 「立即預訂」是深青綠實心、白字。
- 指標移上去，底色再深一階。
- 用鍵盤移到它上面時，外圍多一圈深色框，而且框和按鈕之間有一點距離。
- 它是連結，會去別的網址。
- 「加入比較」是白底、青綠框、青綠字。
- 指標移上去時鋪一層很淺的青綠。
- 它是按鈕，留在這一頁。
- 「退改規則」平時沒有底線。
- 指標移上去才出現底線，底線和文字之間有一小段距離。
- 「候補已滿」是灰色字配灰色底，游標變成禁止符號。
- 它有停用屬性，點下去不會送出。

```html
<!-- 外層 flex flex-wrap items-center gap-3：橫排、換行、垂直置中、縫 0.75rem -->
<!-- font-medium 是字重 500 -->
```

{% note success %}
**換你試試：**
「立即預訂」的圓角改成全圓。在「退改規則」後面加一顆「下載行程表」，外觀跟「加入比較」相同，用按鈕。刻度在 [border-radius](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#border-radius)。
{% endnote %}

<details>
<summary>參考答案</summary>

全圓只改主要動作那一顆的圓角，內距和顏色不變，所以它變成長膠囊，其他顆仍是小圓角。 「下載行程表」複用線框那一組 class，才會跟「加入比較」一樣是白底青綠框；它是這一頁的動作，所以用按鈕。

```diff 02-tailwind/pages/11-button.html
  // ...
        <div class="mt-5 flex flex-wrap items-center gap-3">
          <a
-           class="inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
+           class="inline-flex items-center rounded-full bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
            href="#book"
          >
            // ...
          <button
            type="button"
+           class="rounded-lg border border-teal-700 bg-white px-4 py-2 font-medium text-teal-800 hover:bg-teal-50"
+         >
+           下載行程表
+         </button>
+         <button
+           type="button"
            class="cursor-not-allowed rounded-lg bg-stone-300 px-4 py-2 font-medium text-stone-500"
            disabled
          // ...
```

</details>

## 卡片

卡片把照片、小字、標題、摘要、清單和價錢收在同一個文章區塊。這一節看圓角怎麼切到照片、不同比例的圖怎麼變成同一高度。

**觀念**

卡片裡三件事一起決定外觀：

- 外層把超出的部分裁掉並加上圓角，圖片的角才會跟著切齊。
- 圖片用裁切填滿，不同比例的照片才會變成同一高度。
- 原價用刪除線退到旁邊，售價用較深的字留在視線末端。

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
      <img class="h-44 w-full object-cover" src="https://picsum.photos/id/1018/800/500" alt="台北夜市燈籠" />
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
        <!-- justify-between 原價靠左、售價靠右；items-baseline 讓兩行價錢的文字基線對齊 -->
        <div class="flex items-baseline justify-between">
          <!-- line-through 刪除線 -->
          <p class="text-sm text-stone-400 line-through">NT$15,800</p>
          <p class="text-lg font-semibold text-teal-900">NT$12,800</p>
        </div>
        <!-- w-full 按鈕跟內文同寬；text-center 字置中 -->
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
- 上方照片的左右和上方是圓角，沒有方圖凸出來。
- 照片高度固定，多出來的部分被裁掉。
- 內文由上往下是一行較小的青綠色字、標題、灰色摘要、三行清單。
- 原價在左、顏色淡、有刪除線。
- 售價在右、較大、深青綠。
- 最下面是一條跟內文同寬的青綠連結，字在中間。
- 內文各塊之間有固定的縫，不是貼在一起。
- 眉題比內文小，字距拉開，所以短的眉題不會糊成一行正文。

{% note success %}
**換你試試：**
陰影再深一階。在眉題上面加一顆「熱門」小標：淺玫瑰底、深玫瑰字、全圓、極小字。對照在 [box-shadow](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#box-shadow)。
{% endnote %}

<details>
<summary>參考答案</summary>

`shadow-lg` 比 `shadow-md` 更浮，卡片和頁面底的分界更清楚。 「熱門」是獨立的一小塊，淺底深字，放在眉題前面，內層的直向縫會把它和地名分開。它不是按鈕，只是標示。

```diff 02-tailwind/pages/12-card.html
  // ...
    <body class="bg-stone-100 p-6 text-stone-900">
      <h1 class="mb-6 text-2xl font-bold">本週可報名</h1>
-     <article class="max-w-sm overflow-hidden rounded-2xl bg-white shadow-md">
+     <article class="max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg">
        <img class="h-44 w-full object-cover" src="https://picsum.photos/id/1018/800/500" alt="台北夜市燈籠" />
        <div class="space-y-3 p-5">
+         <p class="inline-block rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-800">熱門</p>
          <p class="text-xs font-medium tracking-wide text-teal-700">台北 · 3 天 2 夜</p>
          <h2 class="text-xl font-semibold">城市漫遊</h2>
          // ...
```

</details>

# 變體（前綴）

冒號左邊是條件，右邊才是 utility。只寫滑過，就是指標移上來才改背景；再加一個寬度條件，就是視窗夠寬而且指標移上來。建議斷點在前、狀態在後、屬性在最後，同一專案固定這個順序。

```html
<!-- hover:bg-teal-800：指標移上來，背景才改成 teal-800 -->
<!-- md:hover:bg-teal-800：視窗到達 md，而且指標移上來 -->
```

這一章先看滑過、鍵盤聚焦、按下，以及跟著系統的深色；寬度前綴、版心、自訂斷點和容器查詢在下一章。`dark:` 預設看作業系統的外觀，不是一顆按鈕。

## 狀態變體

狀態變體寫在 utility 前面，條件成立時後面的 class 才套上。觸控螢幕沒有可靠的 hover，重要資訊不要只靠滑過才出現。整組一起變的寫法放在這節的選讀。

### hover、focus、active

狀態變體寫在 utility 前面，條件成立時後面的 class 才套上。滑過、鍵盤聚焦、按下還沒放開，以及停用，是這一節會用到的四種。這些前綴可以接在斷點後面。狀態名稱見 [常用變體](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#常用變體)。

```html
<!-- hover: 指標移上來 -->
<!-- focus-visible: 鍵盤聚焦（滑鼠點一下通常不會畫這圈） -->
<!-- active: 按下還沒放開，例如 active:bg-teal-900 -->
<!-- disabled: 在停用時套用 -->
```

按鈕那一顆實心連結已經寫了滑過時改背景。滑過時只改背景，字仍是白色。鍵盤聚焦那三個 class 一起才有外框的寬度、偏移與顏色。

```html
<!-- hover:bg-teal-800 只改背景，字仍是 text-white -->
<!-- focus-visible: 要寬度、偏移、顏色三個 class 一起才有外框 -->
```

{% note success %}
**換你試試：**
滑過時的背景改成更深的一階，或換成另一個色族。背景色在 [background-color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#background-color)。
{% endnote %}

<details>
<summary>參考答案</summary>

實心連結滑過時的背景改成更深的一階。若要換成玫瑰色，字色維持白色。

```html
<!-- hover:bg-teal-800 改成 hover:bg-teal-900 -->
<!-- 換成玫瑰色則寫 hover:bg-rose-800，字色維持 text-white -->
```

</details>

### 選讀：group 與 peer

滑過整張卡要帶動裡面的圖和標題時，父層標記成一組，子層用同一組的滑過前綴。兄弟之間則由前面那個元素帶動後面的元素：標記寫在前面的兄弟，勾選前綴寫在後面的兄弟。導覽列用的是同一種兄弟寫法，放在這一節後面。具名寫法見 [具名 group 與 peer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#具名-group-與-peer)。

```html
<!-- 父層加 group，子層寫 group-hover: -->
<!-- 兄弟：前面加 peer，後面寫 peer-checked: -->
```

轉場讓顏色、陰影、縮放在兩個狀態之間補間。時間大約兩百毫秒，圖片縮放再稍長一點。見 [transition-property](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#transition-property)。

```html
<!-- transition 開補間；duration-200 約 200 毫秒；圖片縮放用 duration-300 -->
```

```html 02-tailwind/pages/17-states.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>狀態與轉場</title>
  </head>
  <body class="space-y-8 bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">滑過、聚焦、整組一起變</h1>
    <a
      class="inline-block rounded-lg bg-teal-700 px-4 py-2 font-medium text-white transition duration-200 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
      href="#go"
    >
      用鍵盤 Tab 到我
    </a>
    <article class="group max-w-sm overflow-hidden rounded-2xl bg-white shadow transition duration-200 hover:shadow-lg">
      <img
        class="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
        src="https://picsum.photos/id/1015/800/500"
        alt="山景"
      />
      <div class="p-4">
        <h2 class="font-semibold group-hover:text-teal-800">滑過整張卡，標題與圖片一起變</h2>
        <p class="mt-1 text-sm text-stone-600">group 放在父層，group-hover: 放在子層。</p>
      </div>
    </article>
    <div>
      <input id="agree" class="peer sr-only" type="checkbox" />
      <label
        class="inline-block cursor-pointer rounded border border-stone-300 px-3 py-1 peer-checked:border-teal-700 peer-checked:bg-teal-50"
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

文章區塊建立一組之後，滑過整張卡時圖片會稍微放大；父層把超出的部分裁掉，放大的圖才停在圓角裡，標題也在同一時機改字色。卡片自己的滑過則只在指標直接停在卡片上時加深陰影。

```html
<!-- article 的 group 建立一組 -->
<!-- 圖片 group-hover:scale-105：滑過整張卡時放大到 1.05 倍 -->
<!-- 父層 overflow-hidden 讓放大的圖停在圓角裡 -->
<!-- 標題 group-hover:text-teal-800 在同一時機改字色 -->
<!-- 卡片自己的 hover:shadow-lg 只在指標停在卡片上時加深陰影 -->
```

核取方塊把狀態交給後面的標籤與段落：標籤在勾選後換底，段落預設藏起來、勾選後才顯示。方塊要放在標籤前面，標籤的對應屬性才指得到方塊的識別名稱。

```html
<!-- 方塊加 peer，給後面的標籤與段落用 -->
<!-- 標籤 peer-checked:bg-teal-50：勾選後換底 -->
<!-- 段落預設 hidden，peer-checked:block 在勾選後顯示 -->
<!-- 方塊在標籤前面，for 對到 id -->
```

{% note success %}
**換你試試：**
滑過整張卡時，標題再深一階。字色在 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)，父層寫法在 [具名 group 與 peer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#具名-group-與-peer)。
{% endnote %}

<details>
<summary>參考答案</summary>

標題的滑過字色再深一階。分組標記仍留在文章區塊上。

```html
<!-- group-hover:text-teal-800 改成 group-hover:text-teal-900 -->
<!-- group 仍留在 article 上 -->
```

</details>

### 選讀：導覽列

窄螢幕用一顆核取方塊當開關，只做一套導覽：兄弟標記寫在方塊上，勾選前綴寫在它後面的兄弟上。方塊移出視覺，標籤仍對得到；寬度到達中段斷點時，導覽回到橫排，選單標籤隱藏。

```html
<!-- 只做一套 nav -->
<!-- peer 寫在方塊上，peer-checked: 寫在它後面的兄弟上 -->
<!-- 方塊用 sr-only 移出視覺，標籤的 for 仍對得到 -->
<!-- 寬度到達 md 時，導覽回到橫排，選單標籤隱藏 -->
```

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
        <label class="cursor-pointer rounded border border-white/40 px-3 py-1 md:hidden" for="nav-toggle">選單</label>
        <nav
          class="absolute left-0 right-0 top-full hidden flex-col gap-3 bg-teal-800 px-4 py-4 peer-checked:flex md:static md:flex md:flex-row md:gap-6 md:bg-transparent md:p-0"
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

`nav` 這一串分成窄螢幕與 `md` 以後：

- `absolute left-0 right-0 top-full`：貼在頁首下緣，左右拉滿。
- `hidden flex-col gap-3`：預設不顯示；一旦變成 flex，就是直向，連結相距 0.75rem。
- `peer-checked:flex`：前面的方塊被勾選時才顯示。
- `md:static md:flex md:flex-row`：48rem 以上回到文件流、一直顯示、改成橫排。
- `md:bg-transparent md:p-0 md:gap-6`：清掉手機選單的底色與內距，連結改隔 1.5rem。

「選單」標籤到了中段斷點就隱藏。框線是半透明的白。

```html
<!-- md:hidden：到了 md 就隱藏 -->
<!-- border-white/40：白框 40% 不透明 -->
```

{% note success %}
**換你試試：**
橫排改到 `lg` 才出現，比 `md` 再寬一階。對照 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。
{% endnote %}

<details>
<summary>參考答案</summary>

選單標籤改成再寬一階才隱藏。導覽上每一個中段前綴改成那一階。勾選後顯示的那一條維持不變。

```html
<!-- 標籤 md:hidden 改成 lg:hidden -->
<!-- nav 上每一個 md: 改成 lg: -->
<!-- lg:static lg:flex lg:flex-row lg:gap-6 lg:bg-transparent lg:p-0 -->
<!-- peer-checked:flex 維持不變 -->
```

</details>

## 深色模式

深色前綴是變體，條件成立時後面的 utility 才套上。v4 的預設條件是作業系統的深色外觀，所以同一顆元素先寫淺色 class，再寫深色那一組。見 [Dark mode](https://tailwindcss.com/docs/dark-mode)。

```css
/* dark: 預設對應 prefers-color-scheme: dark */
```

```html
<!-- 先寫淺色 class，再寫 dark: 那一組 -->
```

### 跟著系統

沒有改寫 `dark` 的定義時，頁面上沒有開關。按 <kbd>F12</kbd>，<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（macOS 為 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>），執行 **Show Rendering**，把 **prefers-color-scheme** 設成 `dark`。

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
      <p class="mt-4 text-stone-600 dark:text-teal-100">
        沒有按鈕。系統是淺色就用沒有前綴的 class；系統是深色才套 dark:。
      </p>
      <article class="mt-6 rounded-xl bg-teal-50 p-5 dark:bg-teal-900">
        <h2 class="font-semibold">台北城市漫遊</h2>
        <p class="mt-2 text-sm">三天 · 含早餐</p>
      </article>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

頁面本體先寫淺色底與深字，深色條件成立時改成深底與淺字。另外兩顆 class 讓表單控制項的原生顏色跟著走。卡片用淺色底，深色時另一顆背景蓋過它。

```html
<!-- 淺色：bg-white text-teal-950 -->
<!-- 深色：dark:bg-teal-950 dark:text-teal-50 -->
<!-- scheme-light 與 dark:scheme-dark 讓表單控制項跟著走 -->
<!-- 卡片 bg-teal-50，深色時 dark:bg-teal-900 蓋過它 -->
```

{% note success %}
**換你試試：**
深色時把標題改成琥珀色的淺字。色階在 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)。
{% endnote %}

<details>
<summary>參考答案</summary>

標題加上深色時的琥珀色淺字。淺色時仍用繼承來的深字，只有深色條件成立才換成琥珀色。

```html
<!-- h1 加上 dark:text-amber-200；只有 dark: 成立才換色 -->
```

</details>

### 選讀：手動切換（@custom-variant）

跟著系統的 `dark:` 在前面已經用過。產品要一顆按鈕，讓這一頁的深色和作業系統分開時，才重新定義 `dark`。這一行若寫進全站入口，每一頁都會改看 class，所以它放在另一份 CSS，只有切換頁會載入。

下面這一行只放在切換頁會載入的 CSS。按鈕把深色 class 加到根元素，並用瀏覽器的本地儲存記住上次的選擇。

```html
<!-- 按鈕把 class dark 加到 html -->
```

```js
// 用 localStorage 記住上次的選擇
```

```css 02-tailwind/src/dark-manual.css
@custom-variant dark (&:where(.dark, .dark *));
```

這個符號代表正在套用這個變體的元素。深色 class 加在根元素上，星號選到它的後代。按鈕只負責在文件根節點上切換這個 class。

```css
/* & 是正在套用這個變體的元素 */
/* .dark 是 html 上的 class，.dark * 是它的後代 */
```

```js
// 按鈕只在 document.documentElement 上切換 class dark
```

```js 02-tailwind/src/dark-toggle.js
import './style.css';
import './dark-manual.css';

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

還沒按過按鈕時先跟系統偏好，並把結果寫成根元素的 class。按按鈕會切換 class，把深色或淺色兩個字串存進本地儲存。

```js
// 還沒按過：跟系統偏好，結果寫到 html 的 class
// 按按鈕：切換 class，把 'dark' 或 'light' 存進 localStorage
```

```html 02-tailwind/pages/10-dark-toggle.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>手動切換深色</title>
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
      <article class="mt-6 rounded-xl bg-white p-5 shadow dark:bg-stone-900">
        <h2 class="text-lg font-semibold">花蓮山海</h2>
        <p class="mt-2 text-sm text-stone-600 dark:text-stone-300">兩天一夜。卡片的底也跟著換。</p>
      </article>
    </main>
    <script type="module" src="/src/dark-toggle.js"></script>
  </body>
</html>
```

深色背景在根元素有深色 class 時，把頁面底改成近黑。卡片的白底在淺色生效，深色時換成深灰。頁尾腳本會再載入手動深色那份樣式表。

```html
<!-- dark:bg-stone-950：html 有 class dark 時，頁面底改成近黑 -->
<!-- 卡片 bg-white 淺色生效，dark:bg-stone-900 深色生效 -->
<!-- 頁尾 script 是 dark-toggle.js，它會再載入 dark-manual.css -->
```

{% note success %}
**換你試試：**
深色時卡片加一圈深灰框。邊框色在 [border-color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#border-color)。
{% endnote %}

<details>
<summary>參考答案</summary>

`article` 的 class 補上 `dark:border dark:border-stone-700`。

</details>

# RWD 與容器

窄螢幕先排得下，視窗變寬再加欄、改橫排。整頁的側欄看的是視窗寬度；同一張卡片有時在窄欄、有時在寬欄時，改看包住它的父層。

沒有前綴的 class 在所有寬度都生效，那就是手機那一版；`sm:` 以後是「夠寬才加上」，更寬時仍然成立。版心用最大寬度加水平置中，內文才不會貼著視窗兩邊。

## 手機優先與斷點

沒有前綴的 class 在所有寬度都生效，那就是手機那一版。下面先看一份完全不加斷點的頁，再對預設斷點、只在較窄寬度生效的範圍，以及用主題變數自訂的名字。

```html
<!-- 預設斷點是 min-width，例如 sm:、md: -->
<!-- max-* 範圍是小於那個寬度，例如 max-md: -->
<!-- 自訂斷點的名字寫在 @theme -->
```

先寫窄畫面讀得完的樣子，不要先寫桌面再往回修。沒有寬度前綴的欄數、字級、排向，拉寬瀏覽器也不會變。視口那一行要留在頁首，手機才不會把頁面縮成桌面寬度的一小條。

```html
<!-- 沒有 sm:、md: 的欄數、字級、排向，拉寬也不會變 -->
<!-- 這行要留在 head -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

下面這頁故意不加斷點。頁首和卡片都是一欄，把視窗拉寬，卡片仍跟內容區一樣寬。

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

格線欄數沒有前綴，所以從手機到寬螢幕都是一欄。縫是欄與欄之間的一級間距。行長限制只限制那一行說明的最大寬度，整頁仍跟視窗一樣寬。

```html
<!-- grid-cols-1 沒有前綴，手機到寬螢幕都是一欄 -->
<!-- gap-4 是欄與欄之間的 1rem -->
<!-- max-w-prose 只限制那一行說明，不會把整頁收成版心 -->
```

{% note success %}
**換你試試：**
清單在 `sm` 改成兩欄，比 `sm` 窄時仍是一欄。欄數在 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。
{% endnote %}

<details>
<summary>參考答案</summary>

`section` 的 class 改成 `grid grid-cols-1 gap-4 p-4 sm:grid-cols-2`。

</details>

### 預設斷點

下面這幾個前綴都是最小寬度（min-width）：視窗到達那個寬度之後條件成立，再拉更寬仍然成立。同一個屬性寫了好幾個前綴時，較寬的那個蓋過較窄的。門檻見下列，也見 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。rem 在媒體查詢裡相對瀏覽器預設字級，通常 16px。

- **（沒有）**：最小寬度 0；大約像素 手機直向；編成的查詢 沒有媒體查詢。
- `sm:`：最小寬度 40rem；大約像素 640px；編成的查詢 `@media (width >= 40rem)`。
- `md:`：最小寬度 48rem；大約像素 768px；編成的查詢 `@media (width >= 48rem)`。
- `lg:`：最小寬度 64rem；大約像素 1024px；編成的查詢 `@media (width >= 64rem)`。
- `xl:`：最小寬度 80rem；大約像素 1280px；編成的查詢 `@media (width >= 80rem)`。
- `2xl:`：最小寬度 96rem；大約像素 1536px；編成的查詢 `@media (width >= 96rem)`。

頂端色帶用「先隱藏、到了這段才顯示、下一段再隱藏」，一次只留一句。清單從一欄開始，每個斷點多一欄；把視窗從窄拉到寬，色帶和欄數會一起變。

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

這份範例裡，三件事分開看：

- 色帶上的每一句用「預設先藏或先顯示、到了這段才換、下一段再換」，一次只留一句。
- 背景沒有對應的關掉寫法，較寬的背景直接蓋過較窄的。
- 清單的一欄一直都在，最寬的前綴只在最寬那段再蓋成六欄。

```html
<!-- 第一句只有 sm:hidden：預設看得到，40rem 起隱藏 -->
<!-- 第二句 hidden sm:inline md:hidden：預設不顯示，sm 到 md 之間變成行內，48rem 起又隱藏 -->
<!-- 較寬的 sm:bg-orange-200、md:bg-amber-200 會蓋過沒有前綴的 bg-rose-200 -->
<!-- grid-cols-1 一直都在；2xl:grid-cols-6 只在 96rem 以上再蓋成六欄 -->
```

{% note success %}
**換你試試：**
六個地名改成 `md` 才兩欄、`xl` 才四欄，不要每一段都加欄。斷點在 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。
{% endnote %}

<details>
<summary>參考答案</summary>

`ul` 的 class 改成 `mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4`。

</details>

### max-* 範圍變體

中段前綴是「這個寬度以上」，加上 max 則是「小於這個寬度」。正好卡在門檻上時，只有「以上」成立，「小於」不成立，所以兩段不會重疊。其餘幾個 max 前綴是同一套，門檻仍是表上的那些寬度。

```css
/* md: 是 48rem 以上 */
/* max-md: 是小於 48rem，編成 @media (width < 48rem) */
/* 正好 48rem 時 md: 成立、max-md: 不成立 */
/* max-sm:、max-lg:、max-xl:、max-2xl: 同一套，門檻仍是 40、64、80、96rem */
```

手機上才要的樣式，用手機優先可以寫成預設生效、到了中段斷點就收掉。若你只想改窄螢幕、不想再寫一條把樣式收回來，用「小於」那個前綴。兩段之間才生效，把「以上」和「小於更寬的一階」疊在同一個 class 上。

```html
<!-- 手機優先：預設生效，md:hidden 到了 48rem 就收掉 -->
<!-- 只改窄螢幕：max-md: -->
<!-- 兩段之間：md:max-xl: 是 48rem 以上、且小於 80rem -->
```

{% note warning %}
**三個很像的名字**

- 一個看視窗夠不夠寬。
- 一個看視窗還夠不夠窄。
- 一個是元素自己的最大寬度，跟斷點無關。


```html
<!-- md: 視窗至少 48rem -->
<!-- max-md: 視窗小於 48rem -->
<!-- max-w-md 是元素最大寬度 28rem，跟斷點無關 -->
```
{% endnote %}

三句都先藏起來：第一句只在小於中段斷點出現，第二句只在中段到再寬一階之間，第三句從那一階起一直在。

```html
<!-- 三句都先 hidden -->
<!-- 第一句只在小於 md；第二句只在 md 到 xl 之間；第三句從 xl 起一直在 -->
```

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

三句的顯示條件不一樣：

- 第一句沒有前綴時先隱藏，小於中段才改成區塊。
- 中間那句要兩個條件同時成立。
- 最寬那句從再寬的門檻起蓋過隱藏，而且沒有更寬的前綴再把它藏起來。

```css
/* hidden 是 display: none，沒有前綴，所有寬度都先不顯示 */
```

```html
<!-- max-md:block 只在小於 48rem 時改成區塊 -->
<!-- md:max-xl:block 要兩個條件同時成立 -->
<!-- xl:block 從 80rem 起蓋過 hidden，沒有更寬的前綴再把它藏起來 -->
```

{% note success %}
**換你試試：**
中間那句改成只在 `lg` 以上、小於 `2xl` 時出現。範圍寫法見 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)。
{% endnote %}

<details>
<summary>參考答案</summary>

第二句的 `md:max-xl:block` 改成 `lg:max-2xl:block`。

</details>

### 用 @theme 自訂斷點

預設五個斷點不夠用時，在同一個主題區塊加斷點開頭的變數。變數的值是寬度，名字會變成新的前綴，落在中段和下一階之間。名字不要用內建前綴，才不會蓋掉它們。品牌色與那一格自訂間距留在同一個主題區塊。什麼時候改用另外兩種主題寫法，見 [@theme inline 與 static](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#theme-inline-與-static)。

```css
/* 在 @theme 加 --breakpoint- 開頭的變數 */
/* --breakpoint-tablet: 52rem 產生前綴 tablet: */
/* 落在 md（48rem）和 lg（64rem）之間 */
/* 名字用 tablet，才不會蓋掉內建的 sm */
/* 品牌色與 --spacing-18 留在同一個 @theme */
/* 什麼時候改用 inline 或 static，見公式表 */
```

再加一個更寬的斷點，大約是 1920px，很多筆電視窗拉不滿，所以主要變化放在平板那個前綴。不要用保留字拿掉內建斷點。

```css
/* --breakpoint-3xl: 120rem 約 1920px，筆電常常拉不滿 */
/* 主要變化放在 tablet: */
/* 不要用 initial 拿掉內建斷點 */
```

```css 02-tailwind/src/style.css
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
  </head>
  <body class="bg-stone-50 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">tablet: 設在 52rem</h1>
    <p class="mt-3 max-w-prose">
      比 md（48rem）再寬一點才變成兩欄。3xl（120rem）那句只有非常寬的視窗看得到。
    </p>
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
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

格線先是一欄，過了自訂的平板寬度改兩欄。最後一段預設不顯示，視窗到最寬的自訂斷點才變成區塊。自訂前綴一樣是最小寬度，也有對應的「小於」寫法。

```html
<!-- grid-cols-1 先是一欄；tablet:grid-cols-2 在 52rem 以上改兩欄 -->
<!-- hidden 3xl:block：預設不顯示，視窗到 120rem 才變成區塊 -->
<!-- 自訂前綴一樣是 min-width，也有對應的 max-tablet: -->
```

{% note success %}
**換你試試：**
過了 `tablet` 改成三欄。欄數在 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。
{% endnote %}

<details>
<summary>參考答案</summary>

`tablet:grid-cols-2` 改成 `tablet:grid-cols-3`。

</details>

## 版面實作

斷點會用在兩種版面上：一列怎麼對齊、卡片牆隨寬度加欄，以及整頁最寬停在哪裡。單格的按鈕與卡片前面已經寫過，這裡看它們怎麼排進頁面。

### 卡片牆

Flex 管一列怎麼對齊，Grid 管會隨寬度加欄的卡片。上半是頁首：品牌靠左、連結靠右，放不下就換行。下半預設一欄，`sm` 兩欄，`lg` 三欄。單格怎麼寫見 [常見組合](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#常見組合) 與 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。

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

頁首那一列打開橫排，放不下就換行，垂直置中，左右貼邊，項目之間留縫。卡片牆打開格線，所有寬度先是一欄，到了最小斷點改兩欄，再寬改三欄。縫同時管行與列。

```html
<!-- 頁首：flex 橫排、flex-wrap 換行、items-center 垂直置中 -->
<!-- justify-between 左右貼邊、gap-3 是項目之間的縫 -->
<!-- 卡片牆：grid 打開格線，grid-cols-1 先是一欄 -->
<!-- sm:grid-cols-2 從 40rem 起兩欄，lg:grid-cols-3 從 64rem 起三欄 -->
<!-- gap-4 同時管行與列的縫 -->
```

{% note success %}
**換你試試：**
手機維持一欄，`md` 才兩欄，`xl` 才三欄。斷點在 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)，欄數在 [grid-template-columns](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#grid-template-columns)。
{% endnote %}

<details>
<summary>參考答案</summary>

卡片牆的 class 改成 `mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3`。

</details>

### 版心與 max-w-*

版心是「這一欄最寬到這裡，多出來的空間分到左右」。左右外距設成自動，父層比元素寬才看得到置中，所以要先有最大寬度，或寫死的寬度；左右內距則讓視窗比版心窄時，文字仍離邊一點。

```css
/* mx-auto 是左右 margin: auto，父層比元素寬才看得到置中 */
/* 要先有 max-w-* 或寫死的寬度 */
/* px-4 是左右內距 1rem */
```

不取新名字時，整頁版心是水平置中、一個最大寬度、再加上左右內距。閱讀用的一段可以再窄。卡片上的最大寬度只限制那張卡，那個數字和最小斷點的門檻是兩回事。

```html
<!-- 整頁版心：mx-auto max-w-6xl px-4（水平置中、最大 72rem、左右 1rem） -->
<!-- 閱讀再窄：mx-auto max-w-3xl（48rem），或 max-w-prose -->
<!-- 卡片 max-w-sm 是 24rem，只限制那張卡；斷點 sm: 是 40rem -->
```

這一版沒有舊版那種自帶置中與左右留白的容器 class。若要一個 class 同時做這三件事，並讓最大寬度跟著斷點變，用工具指令自己定義。這個 class 要能接斷點，所以用工具註冊，普通選擇器接不上斷點。圖層和工具的差別放在客製化那一章的選讀。

```css
/* v4 沒有舊版自帶置中與左右留白的 container */
/* 要同時做置中、留白、最大寬度跟著斷點：@utility container */
/* 要能接斷點，所以用 @utility，不是普通選擇器 */
/* @layer 和 @utility 的差別在客製化那一章的選讀 */
```

```css 02-tailwind/src/style.css
@utility container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
  @media (width >= 40rem) {
    max-width: 40rem;
    padding-inline: 1.5rem;
  }
  @media (width >= 48rem) {
    max-width: 48rem;
  }
  @media (width >= 64rem) {
    max-width: 64rem;
  }
  @media (width >= 80rem) {
    max-width: 80rem;
  }
  @media (width >= 96rem) {
    max-width: 96rem;
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
  </head>
  <body class="bg-stone-200 text-stone-900">
    <div class="container bg-white py-8">
      <p class="text-xs font-medium text-teal-700">class="container"</p>
      <h1 class="mt-2 text-2xl font-bold">白底停在版心裡，外面仍是灰</h1>
      <p class="mt-3">這條 container 在 src/style.css，用 @utility 寫成置中、左右留白、最大寬度跟著斷點。</p>
    </div>
    <div class="mx-auto mt-6 max-w-6xl bg-teal-50 px-4 py-8 sm:px-6">
      <p class="text-xs font-medium text-teal-800">mx-auto max-w-6xl px-4</p>
      <h2 class="mt-2 text-xl font-semibold">不取名字時，三個 class 做同一件事</h2>
      <p class="mt-3 max-w-3xl">max-w-6xl 是 72rem，管的是整條版心。這段說明再用 max-w-3xl 收到 48rem。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

自訂的容器 class：寬度跟父層一樣、左右外距自動所以置中、左右內距一級；過了最小斷點以後，最大寬度跟著視窗斷點變，左右內距再加大一點。下面那條沒有自訂工具，用三個 class 做同一件事，到了最小斷點再把左右內距加大。說明那段的最大寬度只縮那一段，青綠底仍維持版心寬度。最大寬度的刻度見 [max-width](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#max-width)。

```css
/* container：width 100%、margin-inline: auto 置中、左右內距 1rem */
/* 40rem 以後最大寬度跟著斷點，左右內距改 1.5rem */
```

```html
<!-- 沒有自訂工具：mx-auto 置中，max-w-6xl 限寬 72rem，px-4 留白 -->
<!-- sm:px-6 在 40rem 以後把左右內距改成 1.5rem -->
<!-- 說明的 max-w-3xl 只縮那一段，不會把青綠底一起縮窄 -->
```

{% note success %}
**換你試試：**
`@utility container` 在 40rem 以後的左右留白改成 2rem。內距寫法在 [padding](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#padding)。
{% endnote %}

<details>
<summary>參考答案</summary>

40rem 那段的 `padding-inline: 1.5rem;` 改成 `padding-inline: 2rem;`。

</details>

## 容器查詢

斷點看的是整個視窗。側欄佔掉 16rem 之後，主文可能還很窄；卡片若仍用 `md:flex-row`，會在視窗夠寬、自己卻擠成直條時提早橫排。父層加 `@container`，子層才改看這個框的寬度。見 [容器查詢](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#容器查詢)。

容器前綴和視窗前綴用同一組名字，門檻卻是另一組數字：容器的三階比視窗的同名前綴窄很多。視窗的中段斷點仍是表上那個較大的寬度。

```html
<!-- 容器 @sm 24rem、@md 28rem、@lg 32rem -->
<!-- 視窗 sm:、md:、lg: 是另一組；視窗的 md 是 48rem -->
```

{% note warning %}
**@md、md、container 各看一處**

這三個名字的門檻和用途都不一樣。

- 一個看視窗。
- 一個看容器。
- 一個是版心 class。


```html
<!-- md: 看視窗，門檻 48rem -->
<!-- @md: 看容器，門檻 28rem -->
<!-- class container 是置中與最大寬度 -->
```
{% endnote %}

### 未具名容器

外框標記成容器，並允許橫向拖曳，拖右邊即可。框還窄時圖在上，拖過大約中段容器門檻之後圖到左邊；沒有寫名字時，容器前綴對到最近的那層容器。

```html
<!-- 外框 @container 與 resize-x，拖右邊即可 -->
<!-- 沒有寫名字時，@md: 對到最近的那層 @container -->
```

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
    <p class="mt-2 max-w-prose text-sm text-stone-600">視窗可以很寬。排版看的是下面這個可拉伸的框。</p>
    <div class="@container mt-6 w-72 resize-x overflow-auto rounded-xl border border-stone-300 bg-white p-4">
      <article class="flex flex-col gap-4 @md:flex-row">
        <img class="h-32 w-full rounded-lg object-cover @md:w-40" src="https://picsum.photos/id/1016/800/500" alt="湖" />
        <div>
          <h2 class="text-lg font-semibold">花蓮山海</h2>
          <p class="mt-1 text-sm text-stone-600">框還窄時圖在上。框寬到 @md（28rem）圖改到左邊。</p>
        </div>
      </article>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

外框建立查詢對象，起始寬度是一個固定刻度，並允許橫向拖。排列先直向，容器到達中段門檻時改橫排。圖片先佔滿寬度，同一門檻改成固定寬。

```html
<!-- @container 建立查詢對象 -->
<!-- w-72 起始寬度 18rem；resize-x 可以橫向拖 -->
<!-- flex-col 先直排；@md:flex-row 在容器 28rem 時改橫排 -->
<!-- 圖片 w-full 先佔滿；@md:w-40 在同一門檻改成 10rem 寬 -->
```

{% note success %}
**換你試試：**
圖文改到容器的 `@lg`（32rem）才橫排。寬度對照在 [@container](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#container)。
{% endnote %}

<details>
<summary>參考答案</summary>

圖文改到容器更寬的那一階才橫排，圖片寬度一起改。

```html
<!-- @md:flex-row 與 @md:w-40 改成 @lg:flex-row、@lg:w-40 -->
```

</details>

### 具名容器

兩層都是容器時，沒有名字的較寬前綴會對到最近的祖先。內層要明明只看自己，就給容器取名：斜線後面是名字，視窗斷點不寫在這個位置。

```html
<!-- 沒有名字的 @lg: 會對到最近的祖先 -->
<!-- 父層 @container/page、內層 @container/card，子層寫 @lg/card: -->
<!-- 斜線後面是名字，不是視窗斷點 -->
```

外層固定很寬。內層從 `w-64`（16rem）起，拖右邊才會變寬。標題的 `@lg/card:text-2xl` 要等 card 自己到 32rem，外層 page 已經很寬也不算數。

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
    <p class="mt-2 max-w-prose text-sm text-stone-600">視窗可以很寬。排版看的是下面這個可拉伸的框。</p>
    <div class="@container mt-6 w-72 resize-x overflow-auto rounded-xl border border-stone-300 bg-white p-4">
      <article class="flex flex-col gap-4 @md:flex-row">
        <img class="h-32 w-full rounded-lg object-cover @md:w-40" src="https://picsum.photos/id/1016/800/500" alt="湖" />
        <div>
          <h2 class="text-lg font-semibold">花蓮山海</h2>
          <p class="mt-1 text-sm text-stone-600">框還窄時圖在上。框寬到 @md（28rem）圖改到左邊。</p>
        </div>
      </article>
    </div>
    <div class="@container/page mt-10 max-w-3xl rounded-xl bg-stone-200 p-4">
      <p class="text-sm text-stone-600">外層叫 page。裡面再放一個較窄、可橫向拖的 card。</p>
      <div class="@container/card mt-4 w-64 resize-x overflow-auto rounded-lg bg-white p-4">
        <h2 class="text-base font-semibold @lg/card:text-2xl">標題只看 card</h2>
        <p class="mt-2 text-sm text-stone-600">@lg/card: 要 card 自己到 32rem 才放大。寫成 @lg: 會對到最近的容器。</p>
      </div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

外層那個名字同時設定容器類型和容器名稱。內層是另一個名字。子層的前綴只問那個名字的寬度。

```css
/* @container/page 同時設定 container-type: inline-size 和 container-name: page */
/* @container/card 是另一個名字 */
```

```html
<!-- @lg/card: 只問名為 card 的那一層寬度 -->
```

{% note success %}
**換你試試：**
標題改成 card 到 `@md`（28rem）就放大。具名寫法在 [@container](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#container)。
{% endnote %}

<details>
<summary>參考答案</summary>

標題改成 card 到較窄的那一階就放大。具名容器留在內層。

```html
<!-- @lg/card:text-2xl 改成 @md/card:text-2xl -->
<!-- @container/card 留在內層 -->
```

</details>

### 側欄實作

整頁的側欄跟著視窗走：窄的時候側欄在上、主文在下，`lg`（64rem）以後變成四欄格子，側欄佔一欄、主文佔三欄。版心仍是 `mx-auto max-w-6xl px-4`。

主文裡的卡片不要再用視窗的橫排前綴。視窗到了並排的門檻，側欄已經吃掉一欄，主文可能還沒到容器的中段寬度。主文加上具名容器，卡片用那個名字的前綴。格線子項預設最小寬度是內容寬，長圖會把欄撐破；主欄把最小寬度降到零，容器量到的才是欄寬。

```html
<!-- 卡片不要再用 lg:flex-row -->
<!-- 視窗到了 lg，側欄吃掉一欄，主文可能還沒到容器的 @md（28rem） -->
<!-- main 加上 @container/main，卡片用 @md/main: -->
<!-- 主欄加上 min-w-0，容器量到的才是欄寬 -->
```

```html 02-tailwind/pages/28-sidebar.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>側欄</title>
  </head>
  <body class="bg-stone-100 text-stone-900">
    <div class="mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-4 lg:gap-6">
      <aside class="mb-6 rounded-xl bg-teal-800 p-4 text-white lg:col-span-1 lg:mb-0">
        <p class="text-sm font-medium">目的地</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li>台北</li>
          <li>花蓮</li>
          <li>台南</li>
        </ul>
      </aside>
      <main class="@container/main min-w-0 lg:col-span-3">
        <h1 class="text-2xl font-bold">側欄在窄螢幕時在上面</h1>
        <p class="mt-2 text-sm text-stone-600">並排看視窗的 lg。卡片橫排看 main 自己的寬度。</p>
        <article class="mt-4 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm @md/main:flex-row">
          <img class="h-32 w-full rounded-lg object-cover @md/main:w-40" src="https://picsum.photos/id/1015/800/500" alt="山景" />
          <div>
            <h2 class="text-lg font-semibold">花蓮山海</h2>
            <p class="mt-1 text-sm text-stone-600">視窗已經到 lg 時，主欄仍可能窄於容器的 @md（28rem），圖就還在上面。</p>
          </div>
        </article>
      </main>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

外層沒有寬度前綴時是普通區塊，側欄與主文上下排，底下留一條縫。到了並排門檻改成四欄格子，側欄佔一欄、主文佔三欄，並拿掉側欄底下那條縫。卡片在所有容器寬度都先直排，橫排與圖片寬度只問名為 main 的容器。

```html
<!-- 沒有 lg: 時 aside 與 main 上下排，mb-6 把兩塊分開 -->
<!-- lg:grid lg:grid-cols-4 從 64rem 起改成四欄 -->
<!-- lg:col-span-1 與 lg:col-span-3 分配欄數；lg:mb-0 拿掉側欄底下那條縫 -->
<!-- 卡片 flex-col 先直排；@md/main:flex-row 與 @md/main:w-40 只問名為 main 的容器 -->
```

{% note success %}
**換你試試：**
並排改到 `xl` 才出現。卡片改到容器的 `@lg`（32rem）才橫排。斷點在 [視窗斷點](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#視窗斷點)，容器寬度在 [@container](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#container)。
{% endnote %}

<details>
<summary>參考答案</summary>

並排改到再寬一階才出現。卡片改到容器更寬的那一階才橫排。

```html
<!-- 外層 lg:grid lg:grid-cols-4 lg:gap-6 → xl:grid xl:grid-cols-4 xl:gap-6 -->
<!-- 側欄 lg:col-span-1 lg:mb-0 → xl:col-span-1 xl:mb-0 -->
<!-- 主欄 lg:col-span-3 → xl:col-span-3 -->
<!-- 卡片 @md/main:flex-row 與 @md/main:w-40 → @lg/main:flex-row、@lg/main:w-40 -->
```

</details>

## 斷點與容器查詢怎麼選

頁面骨架跟著視窗：導覽要不要橫排、側欄要不要並排、整頁卡片牆要幾欄，用 `sm:` 到 `2xl:`。元件會被放進不同寬度的欄位時，用容器查詢，讓它跟著父層，不跟著視窗。

- 視窗斷點的前綴寫成 `md:`，「小於這個寬度」則寫成 `max-md:`，看的是整個視窗。
- 容器查詢的前綴寫成 `@md:`，要指定某一層時寫成 `@md/main:`，看的是某個祖先的寬度。
- 視窗斷點的 `md` 是 48rem，容器查詢的 `@md` 是 28rem。
- 視窗斷點適合頁首、側欄和整頁欄數；容器查詢適合同一張卡出現在側欄或主文。
- 兩層容器時才寫 `@container/main`；視窗斷點不需要名字。

整頁只有一個寬度來源時，不必再包 `@container`。容器查詢解決的是「視窗很寬，但這個框很窄」。

# 客製化

預設色票、間距和字型不夠用時，在 CSS 的 `@theme` 加變數，讓新的名字和內建 utility 同一套寫法。重複出現、而且你改不到那顆標籤時，才把一串 class 收進樣式表。

## @theme 自訂設計變數

預設色票沒有你的品牌名時，在 CSS 裡用主題指令宣告變數。色變數會同時做出背景、文字、邊框三種 class。間距變數會做出內距、外距、寬度、縫，既有的小刻度仍留著。你新增的名字和內建的合併；課堂只加品牌色與需要的間距格，既有的青綠色票維持原樣。變數一覽見 [主題指令](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#主題指令) 與 [@theme inline 與 static](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#theme-inline-與-static)。

```css
/* --color-brand-700 會同時做出 bg-brand-700、text-brand-700、border-brand-700 */
/* --spacing-18: 4.5rem 會做出 p-18、m-18、w-18、gap-18，不會改掉 p-4 */
/* 只加 brand，不去覆蓋 teal */
```

### 品牌色

色階仍用 50 到 950，之後換深淺才和預設色票同一套數字。下面這段加進入口 CSS 的 `@theme`，頁面底、標題與按鈕都用 `brand`。

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
  --spacing-18: 4.5rem;
}
```

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
    <p class="mt-3 max-w-prose text-brand-800">
      這一頁的 bg-brand-50、text-brand-900 對應 src/style.css 裡的 --color-brand-*。
    </p>
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

淺底、深字、實心按鈕分別讀三個色變數。名字中間那一段就是你在主題裡取的色族。

```css
/* bg-brand-50 讀 --color-brand-50 */
/* text-brand-900 讀 --color-brand-900 */
/* bg-brand-700 讀 --color-brand-700 */
/* 中間的 brand 就是 @theme 裡取的色族 */
```

{% note success %}
**換你試試：**
那顆實心連結的內距改用 `--spacing-18` 做出的那一格，四邊一起加。寫法在 [padding](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#padding)。
{% endnote %}

<details>
<summary>參考答案</summary>

主題裡保留那一格自訂間距。按鈕的左右與上下內距換成那一格的四邊內距。

```css
/* @theme 裡保留 --spacing-18: 4.5rem; */
```

```html
<!-- 按鈕的 px-4 py-2 換成 p-18 -->
```

</details>

### 間距與字型

那一格自訂間距會做出內距、外距、寬度與縫，既有的小刻度仍留著。小數字仍乘預設的一級間距；刻度沒有的格子才要自己宣告。上一節的主題區塊已經留了這一行，和品牌色寫在同一個區塊，不要再開第二個主題區塊。

```css
/* --spacing-18: 4.5rem → p-18、m-18、w-18、gap-18，不改 p-4 */
/* 數字 4 仍乘預設 --spacing（0.25rem） */
/* 18 這種刻度沒有的格子才要自己宣告 */
/* --spacing-18 和品牌色寫在同一個 @theme，不要再開第二個 */
```

`--font-sans` 決定 `font-sans` 用哪一組字型。名字要能在這台電腦或頁面上找到；找不到時，瀏覽器會改用逗號後面的下一個。課堂把繁體中文的無襯線字放在最前，後面仍留系統無襯線字當備援。

```css 02-tailwind/src/style.css
@theme {
  /* 與品牌色寫在同一個 @theme，這裡只列出這一節多加的兩行 */
  --spacing-18: 4.5rem;
  --font-sans: "Noto Sans TC", ui-sans-serif, system-ui, sans-serif;
}
```

無襯線那顆 class 加在頁面本體上，整頁就改走這組字。沒有另外載入那個繁體字型檔時，畫面上會落到下一個系統無襯線字，變數本身仍然生效。

```css
/* font-sans 加在 body 上 */
/* 沒載入 Noto Sans TC 時，會落到 ui-sans-serif */
```

## 寫進樣式表

多數外觀留在標籤的 class 上，重複的一串才收進 `@apply`。刻度沒有的長度寫在方括號裡，`!` 也在這一節；接得上斷點的自訂工具放在下面的選讀，可以跳過。

### @apply

同一串 utility 會在很多你改不到的標籤上重複時，才在 CSS 裡收成一個 class。按鈕和卡片若是你自己寫的 HTML，class 就留在標籤上；整頁都收進樣式表，名字又會看不出內距。這份檔要看得到主題，所以用引用指向入口 CSS。說明見 [@layer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#layer)。

```css
/* 重複的一串才 @apply 收成一個 class */
/* 整頁都 @apply，名字會看不出 padding */
/* 這份檔用 @reference 指向入口 CSS，@apply 才看得到主題 */
```

```css 02-tailwind/src/apply.css
@reference "./style.css";

.btn-solid {
  @apply inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white;
}
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
    <h1 class="mb-4 text-2xl font-bold text-stone-900">元件 class 只留一顆按鈕</h1>
    <a class="btn-solid" href="#tours">報名這梯</a>
    <a class="btn-solid ml-3" href="#more">下一梯</a>
    <p class="mt-4 max-w-prose text-sm text-stone-600">兩顆按鈕共用 .btn-solid。標題與說明仍把 utility 寫在標籤上。</p>
    <script type="module" src="/src/apply.js"></script>
  </body>
</html>
```

這個 class 展開成內距、圓角、青綠底與白字。兩顆連結都只寫這一個 class。標題的字級與粗體仍在標籤上，因為它沒有重複到需要收進 CSS。第二顆自己的左外距不必放進共用 class。

```html
<!-- .btn-solid 展開成內距、圓角、青綠底與白字 -->
<!-- 標題的 text-2xl font-bold 仍在標籤上 -->
<!-- ml-3 是第二顆自己的左外距，不必放進 .btn-solid -->
```

```js 02-tailwind/src/apply.js
import './style.css';
import './apply.css';
```

{% note success %}
**換你試試：**
滑過時背景再深一階，加在 `@apply` 那一行裡。狀態前綴見 [常用變體](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#常用變體)，顏色見 [background-color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#background-color)。
{% endnote %}

<details>
<summary>參考答案</summary>

```css
.btn-solid {
  @apply inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800;
}
```

</details>

### 任意值與 ! 覆寫

刻度沒有的長度寫在方括號裡，底線會被當成空白。能用既有刻度就用刻度，每一頁才不會各長各的。寫法見 [任意值與任意屬性](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意值與任意屬性)。

```html
<!-- w-[22rem]：方括號裡是刻度沒有的長度 -->
<!-- grid-cols-[1fr_2fr] 的底線會被當成空白，也就是 1fr 2fr -->
<!-- 能用 p-4、gap-3 就用刻度 -->
```

```html 02-tailwind/pages/26-arbitrary.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>任意值</title>
  </head>
  <body class="bg-stone-100 p-6 text-stone-900">
    <h1 class="text-2xl font-bold">刻度沒有的寬度</h1>
    <div class="mt-4 w-[22rem] rounded-xl bg-white p-4 shadow">
      <p>這張卡的寬度是刻度沒有的 22rem。</p>
      <p class="mt-2 text-sm text-stone-600">w-[22rem] 是 22rem，介在 max-w-xs 與 max-w-sm 之間，刻度沒有這一格。</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

方括號把寬度設成裡面那個長度。旁邊兩顆最大寬度分別是再窄一格和再寬一格，中間這一格沒有名字。

```html
<!-- w-[22rem] 是 22rem -->
<!-- max-w-xs 是 20rem，max-w-sm 是 24rem，中間沒有名字 -->
```

{% note success %}
**換你試試：**
卡片圓角改成刻度沒有的 `1.25rem`。任意值在 [任意值與任意屬性](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意值與任意屬性)，圓角名稱在 [border-radius](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#border-radius)。
{% endnote %}

<details>
<summary>參考答案</summary>

`rounded-xl` 改成 `rounded-[1.25rem]`。

</details>

同一屬性上兩個 utility 平常看編成後的順序。`!` 寫在 class 最後，把這條宣告標成 important，用來壓過另一個 utility。能拿掉多餘的那條 class 時，不要用 `!`。寫法見 [任意變體、important、前綴](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#任意變體、important、前綴)。

```html 02-tailwind/pages/26-arbitrary.html
<p class="text-stone-500 text-teal-800!">這行是青綠，而且要壓過 stone。</p>
```

兩顆文字顏色都在改同一個屬性。後面的驚嘆號讓青綠色這條變成 important，所以畫面上是青綠字。

```html
<!-- text-stone-500 與 text-teal-800! 都在改 color -->
<!-- 後面的 ! 讓青綠色變成 important -->
```

{% note success %}
**換你試試：**
青綠色再深一階，`!` 仍留在 class 最後。色階在 [color](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#color)。
{% endnote %}

<details>
<summary>參考答案</summary>

青綠色再深一階，驚嘆號仍留在 class 最後。另一顆灰色留著，才看得出 important 壓過它。

```html
<!-- text-teal-800! 改成 text-teal-900! -->
<!-- text-stone-500 留著 -->
```

</details>

### 選讀：@layer 與 @utility

圖層裡的 class 是普通 CSS，前面加不上斷點。工具指令註冊的名字才能接滑過和斷點。版心的容器已在 RWD 那章定義過，這一節只比較接不上前綴的 class，和註冊成工具之後可以加斷點的名字。對照見 [@layer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#layer) 與 [@utility](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#utility)。

```html
<!-- @layer components 裡的 class 不能寫成 md:kicker -->
<!-- @utility 註冊的名字才能接 hover:、md: -->
<!-- 版心的 container 已在 RWD 那章用 @utility 定義過 -->
<!-- 註冊之後可以寫 md:chip -->
```

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

```html 02-tailwind/pages/25-layer.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@layer 與 @utility</title>
  </head>
  <body class="space-y-4 bg-stone-50 p-6 text-stone-900">
    <p class="kicker">@layer components，前綴接不上這個名字</p>
    <p class="md:chip">md 以上才套用 chip</p>
    <script type="module" src="/src/layer.js"></script>
  </body>
</html>
```

眉題 class 在元件圖層裡。標籤寫這個名字就有小字與青綠色；前面加斷點不會產生規則。膠囊用工具指令註冊，所以斷點前綴在中段寬度以上才套用膠囊底、圓角與字級，比較窄的時候這一行沒有那些樣式。

```html
<!-- .kicker 在 @layer components；寫 kicker 就有效，md:kicker 不會產生規則 -->
<!-- chip 用 @utility 註冊，所以 md:chip 在 48rem 以上才套用 -->
```

```js 02-tailwind/src/layer.js
import './layer.css';
```

{% note success %}
**換你試試：**
眉題也要能寫成 `md:kicker`，只在 `md` 以上套用那組字級與顏色。對照 [@layer](/2026/08-30/lokiTech-15day-05-tailwind-cheatsheet/#layer)。
{% endnote %}

<details>
<summary>參考答案</summary>

`.kicker` 改放到 `@utility`：

```css
@utility kicker {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: var(--color-teal-700);
}
```

標籤改成 `class="md:kicker"`。

</details>

# 本篇重點回顧

下面只收這篇做過的事。選讀（Play CDN、Preflight、group／peer、導覽列、手動深色、`@layer`）可以整節跳過。

- Node 24 用 nvs 安裝：先 `nvs add 24`，再用 `nvs use 24`。
- 接著 `nvs link` 把這個版本設成預設，pnpm 用 `corepack enable` 啟用。
- 已裝過的可以跳過，用 `node -v` 與 `pnpm -v` 核對。
- Vite 開發時當本機伺服器，`pnpm build` 才把用到的模組打包進 `dist/`；Tailwind 的 class 要先編成 CSS。
- utility 是「屬性－值」：`bg-teal-700` 塗背景，`p-4` 是 1rem 內距；編譯器只認原始碼裡的完整 class。
- `hover:` 是滑過，`focus-visible:` 是鍵盤聚焦。
- `active:` 是按下，`dark:` 預設跟系統深色。沒有前綴的 class 則在所有寬度都在。
- `sm:` 到 `2xl:` 是最小寬度，夠寬才加上，更寬仍然成立。
- `max-md:` 只在小於 48rem 時成立。
- 整頁欄數與側欄用視窗斷點。同一張卡會放進不同欄寬時，父層加 `@container`，子層用 `@md:`。
- 巢狀時用具名 `@container/main`，前綴寫成 `@md/main:`。
- 版心是 `mx-auto max-w-6xl px-4`，或 `@utility container`。
- `max-w-sm`（24rem）不是斷點 `sm:`（40rem）。
- `max-sm:` 是小於那個斷點，跟元素的最大寬度無關。
- `@theme` 裡的 `--color-brand-*` 會做出同名的背景 class。
- `--spacing-18` 會做出 `p-18`。
- `--font-sans` 改無襯線字型。
- `--breakpoint-tablet` 做出 `tablet:`。
- 重複的一串才用 `@apply`，刻度沒有的長度寫 `w-[22rem]`。
- `!` 放在 class 最後，才壓過另一條 utility。

上網查這篇的說法時，用括號裡的英文當關鍵字。

# 專有名詞中英對照

## 建立 Node 開發環境

- 開發伺服器（development server）
- 執行環境（runtime）
- 版本管理工具（version manager）
- 套件管理器（package manager）
- 幽靈依賴（phantom dependency）
- 打包器（bundler）
- 範本（template）
- 建置（build）
- 模組（module）
- 壓縮（minification）
- 插件（plugin）
- 專案產生器（project generator）
- 框架（framework）
- 開發依賴（development dependency）
- 瀏覽器前綴（vendor prefix）
- 入口樣式表（entry stylesheet）
- 原始碼（source code）
- 靜態檔（static file）

## 認識 Tailwind、基礎排版練習

- 宣告（declaration）
- 工具類（utility）
- 內距（padding）
- 刻度（spacing scale）
- 色票（color palette）
- 掃描（scanning）
- 色族（color family）
- 色階（color scale）
- 間距（spacing）
- 編譯器（compiler）
- 選擇器（selector）
- 圓角（border radius）
- 原子化 CSS（utility-first）
- 設計系統（design system）
- 陰影（box shadow）
- 縫（gap）
- 不透明度（opacity）
- 外距（margin）
- 重置（CSS reset）

## 變體（前綴）

- 深色模式（dark mode）
- 變體（variant）
- 滑過（hover）
- 鍵盤聚焦（focus-visible）
- 按下（active）
- 停用（disabled）
- 狀態變體（state variant）
- 轉場（transition）
- 補間（interpolation）

## RWD 與容器

- 手機優先（mobile first）
- 斷點（breakpoint）
- 版心（content width）
- 容器查詢（container query）
- 視窗斷點（viewport breakpoint）
- 視口（viewport）
- 最小寬度（min-width）
- 媒體查詢（media query）
- 具名容器（named container）

## 客製化

- 任意值（arbitrary value）
- 設計變數（theme variable）
- 主題指令（@theme）
- 無襯線字型（sans-serif）
