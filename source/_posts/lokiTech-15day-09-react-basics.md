---
title: "React 基礎：JSX、元件、狀態與表單"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:08:00
---

![](assets/images/banner/react.png)

React 是用函式描述畫面的 JavaScript 函式庫：資料一變，同一個函式再跑一次，畫面跟著更新。這一篇先說明為何使用框架、為何選 React，再用 Vite 建立啟用 React Compiler 的專案，接著依序學 JSX、單向資料流、元件與 props、用 `useState` 保存的狀態與不可變更新、事件、列表與 key，以及受控表單；選讀補充 ESLint 與 Prettier 工具鏈、ES Module 的匯出與匯入，以及 `useId`。

<!-- more -->

# 認識 React

本講義的 React 是 19.3，React Router 是 8，Vite 是 8。元件與 Hooks 對照 [react.dev](https://react.dev)，路由對照 [reactrouter.com](https://reactrouter.com)。網路上的舊教學常出現 class 元件，或從 `react-router-dom` 引入路由，那是舊寫法，這門課不跟。

這一章先看框架為何存在、這門課為什麼選 React，再說明 React 是什麼、站在哪一層。

## 為何使用框架

用原生 JavaScript 做互動頁面，你要自己找出節點、一個一個改內容，資料一多就容易漏改。框架（framework）把這件事接手：你只描述畫面該長什麼樣子，由框架負責更新瀏覽器裡的 DOM。

{% mermaid graph LR %}
  code["你的程式<br/>元件 / JSX"] --> fw["框架"]
  fw --> dom["DOM"]
  dom --> screen["畫面"]
{% endmermaid %}

- 自己一步步指定要改哪個節點，叫做命令式（imperative）。07 的 DOM 操作就是這種寫法。
- 只描述畫面現在該長什麼樣子，叫做宣告式（declarative）。框架比對前後差異，只更新有變的節點。
- 框架省下的是你自己寫的更新流程；畫面真的變了，瀏覽器仍然要重排與重繪。

## 為何選擇 React

Vue、Angular、React 都能把資料變成畫面，三者都有活躍的維護與社群，沒有哪一套是標準答案。差別在畫面用什麼語法寫、官方替你決定多少事，這一節先看三者的取向，再說明這門課的選擇。

### Vue

Vue 是漸進式框架（progressive framework）：可以只嵌進既有頁面的一小塊，也可以長成整個應用。常見寫法是單檔元件（Single-File Component），一個檔案放模板（template）、腳本與樣式，條件與清單用模板專屬的指令來寫。

官方維護的周邊套件包括路由（Vue Router）與共用狀態（Pinia）；要做伺服器端渲染（server-side rendering，SSR，先在伺服器產生 HTML 再送到瀏覽器）時，常搭配 Nuxt。

### Angular

Angular 由 Google 維護，用 TypeScript 撰寫，把模板、路由、表單與 HTTP 請求都放進同一個框架。專案結構與寫法有一套官方約定，團隊內的風格比較一致，代價是要先學這套約定。

非同步資料流常用 RxJS 處理，大型應用的共用狀態也有 NgRx 這類套件可選。

### React

React 的元件是一支 JavaScript 函式，判斷、事件與要顯示的內容都留在函式裡，標記用 JSX 寫在回傳值。它沒有另一套模板語言，也不規定專案目錄；路由、共用狀態與 SSR 都靠另外的套件，例如 React Router 與 Next.js。

### 這門課的取捨

選 React 的理由有兩個：畫面邏輯就是一般的 JavaScript，剛學完 JS 的人最容易接上；周邊工具由你自己選，正好可以一步步認識每一層在做什麼。

代價是專案骨架要自己決定。這門課的分工是：Vite 負責開發與打包，Tailwind 負責外觀，React 負責畫面與狀態，React Router 負責換頁。

{% note info %}
**函式庫還是框架**
React 的核心是函式庫（library），只描述畫面；路由與資料載入要另外接，所以嚴格說它不是把全部配齊的框架。日常對話常把它叫做框架，兩種說法都會聽到。
{% endnote %}

## 什麼是 React

React 由 Meta 主導開發，是描述使用者介面（user interface）的 JavaScript 函式庫。你用函式描述畫面現在的長相，再交給 React 放進頁面。這一節看它管哪一層、怎麼用元件拼出頁面、JSX 是什麼，以及它分成哪兩個套件。

### 定位

React 專注在 View 層，也就是使用者看得到、點得到的那一層：標題文字、清單有幾列、按鈕現在能不能按，都由它決定。資料庫、帳號驗證與伺服器不在它的範圍內，那些由後端準備資料，React 只負責把拿到的資料畫成畫面。

用 React 做出來的網站多半是單頁應用（Single Page Application，SPA）。瀏覽器只載入一份幾乎空白的 `index.html`，之後換畫面都由 JavaScript 更新頁面上的節點，不重新載入整頁。

### 元件化

React 把畫面切成元件（component）：標題、清單、表單各是一塊，每塊用函式描述自己的長相，頁面再由這些區塊拼起來。同一個元件可以用在不同位置，修改這支函式，用到它的地方就一起更新。

### JSX

用純 JavaScript 逐一建立節點，寫起來冗長，也看不出畫面的層次。JSX 讓你在函式裡直接寫接近 HTML 的標記，結構一眼就對得上畫面。

瀏覽器不認得 JSX。開發時 Vite 會先把它編譯成一般的 JavaScript，上線的也是編譯後的結果。標記怎麼寫、花括號能放什麼，後面的 JSX 章再拆開說明。

### react 與 react-dom

在瀏覽器裡，React 分成兩個套件，兩者都要安裝：

- `react`：元件、狀態與 Hooks，也就是描述畫面、讓函式記住資料的部分。
- `react-dom`：把描述好的畫面放進瀏覽器的 DOM。

為什麼要分開？描述畫面的規則和輸出到哪裡是兩件事，同一套規則也能輸出到手機 App 等其他環境，那邊用的是別的套件。這門課只在瀏覽器裡用。

# 建立專案

這一章先用 Vite 建一個最小的 React 試做專案，看懂範本產生的檔案；再切到課堂準備好的 `03-react`，認識入口檔怎麼把元件掛上頁面。之後所有示範都在 `03-react` 裡執行。

## 用 Vite 建立 React 專案

這一節先認識 Vite 的 React 範本，在 `sandbox` 走完建立、安裝、接上檢查／排版／編輯器與 `jsconfig.json`、看檔與啟動，再換到 `03-react`。若 Node、nvs 與 pnpm 已在 04 裝好，這裡不重裝。

沒學過 Tailwind、第一次接觸這些工具時，請先到 {% post_link lokiTech-15day-04-tailwind %} 看完下列章節再回來（Tailwind 的 class 與樣式可以先略過，只要把工具鏈跑通）：

- [建立 Node 開發環境](/2026/08-30/lokiTech-15day-04-tailwind/#建立-Node-開發環境)：乾淨電腦上裝工具的總覽
- [為什麼需要 Node](/2026/08-30/lokiTech-15day-04-tailwind/#為什麼需要-Node)、[用 nvs 安裝 Node 26](/2026/08-30/lokiTech-15day-04-tailwind/#用-nvs-安裝-Node-26)、[安裝 pnpm](/2026/08-30/lokiTech-15day-04-tailwind/#安裝-pnpm)：Node 26 與 pnpm 怎麼裝、怎麼確認版本
- [認識 Vite](/2026/08-30/lokiTech-15day-04-tailwind/#認識-Vite)：開發伺服器與打包器在做什麼
- [手動建立專案](/2026/08-30/lokiTech-15day-04-tailwind/#手動建立專案)：用 Vite 範本建專案、`pnpm install` 與 `pnpm dev` 的流程（04 用的是 vanilla 範本；這裡改用 React）

### 認識 React 範本

Vite 同時是開發伺服器與打包器。開發時瀏覽器向它要模組，JSX 會先被編成一般 JavaScript；上線時另跑建置，把用到的模組打包成靜態檔。React 專案與 04 的純 HTML 專案用的是同一個 Vite，差別只在範本多了 JSX 的轉換插件與入口檔。

建立時可以用互動選單，也可以直接指定範本。React 相關的選項如下：

- Framework 選 React，Variant 選 JavaScript：對應 `--template react`，檔案是 `.jsx`。
- Variant 選 TypeScript：對應 `react-ts`，檔案是 `.tsx`。
- Variant 選 JavaScript + React Compiler：對應 `react-compiler`，在 `react` 之外額外加上 React Compiler 的設定。

這門課用 JavaScript，不用 TypeScript。`03-react` 另外啟用了 React Compiler，它是在建置時自動替元件做效能最佳化的工具，設定寫在 `vite.config.js`，後面看到該檔再說明。

### 手動建立專案

在 `studiesAdvanced` 倉庫根目錄建立 `sandbox` 資料夾，它和 `03-react` 分開，做壞了整個刪掉重建即可。步驟依序是：用 React 範本建立、安裝依賴、把 ESLint／Prettier／VS Code／`jsconfig.json` 設成與 `03-react` 相同、認識檔案、啟動開發伺服器。後面若一直留在 sandbox 練習，檢查、排版與編輯器跨檔能力會和課堂專案一致；Tailwind 與 React Compiler 仍只在 `03-react`（改用那一節再接）。

{% note info %}
**已做過可跳過**
已經用 Vite 做過 React 專案、`03-react` 也能啟動的人，可以略過 sandbox，直接看「改用 03-react」。
{% endnote %}

#### 步驟 1：建立專案

在 VS Code 開新終端機，它會停在倉庫根目錄。下面這行請 pnpm 暫時下載 Vite 的專案產生器，用 React 加 JavaScript 的範本建立 `sandbox`：

```bash
pnpm create vite@latest sandbox --template react
```

指令拆開看：

```bash
pnpm create          # 執行專案產生器：暫時下載 create-xxx 套件來跑，用完不留在電腦上
  vite@latest        # 產生器是 create-vite，@latest 表示用最新版
  sandbox            # 專案資料夾名稱，建在目前所在的資料夾
  --template react   # 範本：React + JavaScript
```

終端機之後還會問兩題：

- Which linter to use：選 ESLint（另一個選項是 Oxlint）。選了之後，產生器會移除 `oxlint`，改加入 `eslint` 與 React 相關的檢查套件，並寫入 `eslint.config.js`，把 lint 指令改成 `eslint .`。
- Install with pnpm and start now：選 No。安裝與啟動留給下面兩步分開做。

#### 步驟 2：安裝依賴

產生器只放檔案，還沒下載任何套件。進入資料夾後安裝：

```bash
cd sandbox     # 進入剛建立的專案資料夾
pnpm install   # 依 package.json 下載套件到 node_modules/
```

清單裡有 `react`、`react-dom`、`vite` 與轉換 JSX 的 `@vitejs/plugin-react`，加上選 ESLint 後多出的檢查套件。版本號不用自己改。

#### 步驟 3：設定 ESLint、Prettier、VS Code 與 jsconfig

產生器選 ESLint 之後，專案已有 `eslint.config.js` 與 `lint` 指令，但規則與課堂專案不完全相同，也還沒有 Prettier、編輯器設定與 `jsconfig.json`。這一節把這些改成與 `03-react` 同一套，之後若你繼續用 sandbox 而不換 `03-react`，存檔排版、`pnpm lint`、Hooks 檢查與跨檔跳轉會和課堂一致。ESLint 負責檢查規則；Prettier 只管排版；`eslint-config-prettier` 關掉會跟排版打架的 ESLint 規則；`jsconfig.json` 讓編輯器把 `src` 當成同一個 JavaScript 專案。ESLint／Prettier／VS Code 各行設定在選讀「工具鏈」再拆開說明。

先補上 Prettier 相關套件（產生器已裝過的 ESLint 套件不必重裝）：

```bash
pnpm add -D prettier eslint-config-prettier
```

用下面這份蓋掉產生器的 `eslint.config.js`（與 `03-react` 相同）：

```js sandbox/eslint.config.js
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  reactRefresh.configs.vite(),
  eslintConfigPrettier,
]);
```

在專案根目錄新增 `.prettierrc`：

```json sandbox/.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

再新增 `.vscode` 資料夾，放入與 `03-react` 相同的兩份檔。VS Code 只讀「目前開啟的那個資料夾」裡的 `.vscode`，所以請用「開啟資料夾」打開 `sandbox`（不要只開倉庫根目錄），編輯器才會套用這些設定並提示安裝建議擴充。

```json sandbox/.vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.linkedEditing": true,
  "editor.guides.bracketPairs": true,
  "files.autoSave": "afterDelay",
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "css.lint.unknownAtRules": "ignore",
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "files.trimTrailingWhitespace": false
  }
}
```

```json sandbox/.vscode/extensions.json
{
  "recommendations": [
    "ritwickdey.LiveServer",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "mhutchie.git-graph",
    "MS-CEINTL.vscode-language-pack-zh-hant",
    "dbaeumer.vscode-eslint",
    "christian-kohler.path-intellisense",
    "kisstkondoros.vscode-gutter-preview",
    "GitHub.copilot"
  ]
}
```

存檔後在 `sandbox` 執行 `pnpm lint`：沒問題時指令安靜結束。建議擴充裝好後，存檔會交給 Prettier 排版，並修 ESLint 能自動修的問題。終端機也可以跑 `pnpm exec prettier --write .`。

Vite 的 React 範本不會附 `jsconfig.json`，請在專案根目錄自己新增。它不是給 Vite 打包用的，少了它網站一樣能建置；用途是告訴 Cursor 或 VS Code：`src` 底下的 `.js`／`.jsx` 屬於同一個專案。沒有它時，編輯器可能把每個檔當成獨立檔，跨檔跳轉、「找出所有引用」、以及 JSX 語法提示會不完整或報錯。

```json sandbox/jsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "checkJs": false
  },
  "include": ["src"]
}
```

- `include` 寫 `src`：編輯器把 `src` 底下的檔當成同一個專案。
- `moduleResolution` 設成 `bundler`：解析 `import` 的方式和 Vite 一致。
- `jsx` 設成 `react-jsx`：編輯器才會把 JSX 當成合法語法（不必再手動 `import React`）。
- `checkJs` 設成 `false`：不要用 TypeScript 的型別規則去檢查這些 JavaScript 檔。
- 不必寫 `baseUrl`：本課示範都用相對路徑；TypeScript 6 已把 `baseUrl` 標為棄用。

{% note info %}
**和 03-react 還差什麼**
檢查、排版、編輯器與 `jsconfig.json` 已對齊。sandbox 還沒接 Tailwind 與 React Compiler；那兩項在「改用 03-react」才掛上。若你堅持留在 sandbox，可先略過 utility class 與 Compiler，等後面章節再用課堂專案。
{% endnote %}

#### 步驟 4：認識檔案結構

啟動前先看檔案。HTML 幾乎是空的，真正的畫面在 `src/App.jsx`，`src/main.jsx` 負責把它掛進頁面。

```bash
# sandbox/index.html             空頁面，只留 #root，腳本指向 /src/main.jsx
# sandbox/vite.config.js         plugins 裡有 react()，負責轉換 JSX
# sandbox/src/main.jsx           入口：createRoot 把 App 畫進 #root
# sandbox/src/App.jsx            畫面上那一塊元件；範本預設是標誌與計數按鈕
# sandbox/eslint.config.js       步驟 3：與 03-react 相同的檢查設定
# sandbox/.prettierrc            步驟 3：與 03-react 相同的排版規則
# sandbox/.vscode/settings.json  步驟 3：存檔排版與 ESLint 自動修
# sandbox/.vscode/extensions.json 步驟 3：建議安裝的擴充
# sandbox/jsconfig.json          步驟 3：編輯器專案範圍與 JSX
# sandbox/package.json           依賴與 dev、build、lint 指令
```

頁面本體只有一個起點。腳本的 `type="module"` 讓這個檔可以用 `import` 讀別的檔；路徑以斜線開頭，表示從專案根目錄算起。

```html sandbox/index.html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

Vite 設定裡的 React 插件負責轉換 JSX，沒有它瀏覽器讀不懂 JSX。`defineConfig` 是 Vite 提供的設定包裝函式，包不包都能跑，包起來是讓編輯器能給提示。

```js sandbox/vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
});
```

`main.jsx` 在 `03-react` 裡有一樣的檔案，下一節再看。這裡先把範本的 `App.jsx` 整份換成下面這樣，等一下才確定畫面上的字是從這個檔來的：

```jsx sandbox/src/App.jsx
export default function App() {
  return <h1>React 有跑起來</h1>;
}
```

#### 步驟 5：啟動開發伺服器

在 `sandbox` 目錄啟動開發伺服器，終端機會印出 Local 網址，通常是 `http://localhost:5173/`，用 Chrome 打開應看到「React 有跑起來」。

```bash
pnpm dev     # 開發伺服器，修改存檔後畫面自動更新
pnpm build   # 打包成上線用的靜態檔，輸出到 dist/
```

改 `App.jsx` 再存檔，畫面會立刻跟著換，這叫熱更新（Hot Module Replacement，HMR）：開發伺服器只換上你改過的那一塊，不必整頁重載。確認完在終端機按 <kbd>Ctrl</kbd>+<kbd>C</kbd> 停掉。`pnpm build` 產出的是打包後的檔案，不是正在編輯的 `src/`，要交付靜態檔時才需要跑。

### 改用 03-react

sandbox 只要確認三件事：選的是 React、看得懂 `main.jsx` 與 `App.jsx`、`pnpm dev` 看得到自己寫的標題。之後的示範都在 `03-react`，那裡已經接好 Tailwind、React Compiler、ESLint 與 Prettier，用產生器重建會蓋掉這些設定。

若 sandbox 的開發伺服器還開著，先按 <kbd>Ctrl</kbd>+<kbd>C</kbd> 停掉，再從倉庫根目錄進入專案：

```bash
cd ..            # 若還停在 sandbox，先回到倉庫根目錄
cd 03-react
pnpm install
pnpm dev
```

開啟後，左側會出現示範目錄（清單在 `src/demoRegistry.js`，依講義順序產生；側欄 UI 在 `src/Menu.jsx`），點一筆就切換到對應的示範。目前示範記在網址的 `#` 後面，做法見下方選讀。

`package.json` 的 `engines.node` 要求 Node 26 以上，安裝時若抱怨版本，用 `node -v` 確認是 v26 開頭。主要套件如下：

- `react`、`react-dom`：19.3。
- `vite`：8；`@vitejs/plugin-react`：6，負責轉換 JSX。
- `babel-plugin-react-compiler`、`@rolldown/plugin-babel`：React Compiler 與它需要的 Babel 外掛載入器。
- `tailwindcss` 與 `@tailwindcss/vite`：4。
- `eslint`、`eslint-plugin-react-hooks`、`prettier`：檢查與排版；與 sandbox 步驟 3 同一套，細節見選讀「工具鏈」。

這份 Vite 設定在 React 插件之後掛上 React Compiler 與 Tailwind。

```js 03-react/vite.config.js
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
});
```

React Compiler 在建置時分析元件，自動替重複計算的值與函式做記憶（memoization，同樣輸入就沿用上次的結果）。有了它，多數情況不必手寫記憶用的函式，這些手動寫法在後面的選讀才會出現。編譯器只處理遵守 React 規則的元件；寫法不合規則時，它會略過那個元件，ESLint 的 Hooks 規則就是用來提早抓出這類問題。

Tailwind 的樣式從入口 CSS 引入：

```css 03-react/src/index.css
@import 'tailwindcss';

body {
  margin: 0;
  font-family: system-ui, 'PingFang TC', 'Microsoft JhengHei', sans-serif;
}
```

### 選讀：用 hash 做示範選單

這一節是選讀。練習站要在同一個 Vite 專案裡快速切換幾十個示範，這階段還沒學 React Router，所以不用路徑路由，改用網址列的 hash（`#` 後面那一段）記住目前打開哪一筆。正式多頁網站請等到 {% post_link lokiTech-15day-11-react-router %}；這裡只說明練習站怎麼導覽。下面程式用到的 `useState` 在後面「狀態」章會學，第一次讀可以先抓 hash 與檔案怎麼拆，狀態細節之後再回看。

**觀念**

hash 是網址裡 `#` 之後的文字，改它通常不會向伺服器重新要頁面，適合在單一 HTML 裡切換畫面。`03-react` 把每個示範編成一個 `id`（例如 `01`），點目錄時用 `history.replaceState` 把網址改成 `#01`，狀態也設成同一個 id，再依 id 找出登錄表裡的元件畫出來。重新整理時讀一次 `location.hash`，就能停在同一個示範。

職責拆成三份：`demoRegistry.js` 放示範清單與分組，`Menu.jsx` 只負責側欄與搜尋，`App.jsx` 讀寫 hash 並掛上目前的示範元件。清單很長，所以不要全部塞進 `App.jsx`。

```jsx 03-react/src/App.jsx
import { useState } from 'react';
import { demos, groups } from './demoRegistry.js';
import Menu from './Menu.jsx';

/** 目前的範例記在網址的 # 後面，重新整理仍停在同一個。 */
function readHash() {
  const id = window.location.hash.slice(1);
  return demos.some((item) => item.id === id) ? id : demos[0].id;
}

export default function App() {
  const [current, setCurrent] = useState(readHash);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const index = demos.findIndex((item) => item.id === current);
  const demo = demos[index];
  const View = demo.Component;

  const select = (id) => {
    window.history.replaceState(null, '', '#' + id);
    setCurrent(id);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 md:flex">
      <Menu
        demoCount={demos.length}
        groups={groups}
        current={current}
        query={query}
        menuOpen={menuOpen}
        onQueryChange={setQuery}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onSelect={select}
      />
      <main className="min-w-0 flex-1 px-4 py-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <p className="text-xs text-stone-500">{demo.group}</p>
              <h1 className="text-lg font-bold">
                {demo.id} {demo.title}
                {demo.optional ? (
                  <span className="ml-2 text-xs font-normal text-stone-400">
                    選讀
                  </span>
                ) : null}
              </h1>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
                disabled={index === 0}
                onClick={() => select(demos[index - 1].id)}
              >
                上一個
              </button>
              <button
                type="button"
                className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
                disabled={index === demos.length - 1}
                onClick={() => select(demos[index + 1].id)}
              >
                下一個
              </button>
            </div>
          </div>
          <div className="pt-6">
            <View />
          </div>
        </div>
      </main>
    </div>
  );
}
```

**解析**

- `readHash` 去掉 `#`，若對不到任何示範就退回第一筆，避免網址打錯時畫面空白。
- `select` 先改 hash、再更新 `current`，目錄與主區讀同一份 id；用 `replaceState` 而不是一直 `pushState`，避免每點一筆就堆一層瀏覽器歷史。
- `View` 是登錄表裡的元件本身，寫成 `<View />` 就會渲染該示範；上一個／下一個只是換 id，不必另開路由。
- `Menu` 透過 props 拿到清單與目前 id，點擊時呼叫 `onSelect`；搜尋與手機展開目錄是選單自己的 UI，不影響示範內容。

{% note info %}
之後 {% post_link lokiTech-15day-11-react-router %} 會用路徑、layout 與 loader 做真正的多頁。練習站的 hash 選單只為了上課切示範，不要把它當成產品網站的路由做法。
{% endnote %}

## 元件與掛載

上一章說過，React 用函式描述畫面。進到 `03-react` 後，你交給它的就是這樣的函式：回傳這一塊現在該長什麼樣子。這一節先看一個最小的元件長什麼樣，再看入口檔怎麼把它放進頁面。

本節的 `export`、`import` 是 ES Module 的語法，作用是讓一個檔案把函式交給另一個檔案使用，這裡先照寫，細節見 {% post_link lokiTech-15day-06-js-basics %} 的選讀「ES Module」。

### 函式元件

**觀念**

元件就是一個回傳畫面的函式。函式名稱要大寫開頭，React 才會把它當元件；回傳的標記是 JSX，看起來像 HTML，其實是寫在 JavaScript 裡的語法。

JSX 的最外層只能有一個父元素，裡面再放子元素。外觀類別要寫成 `className`，因為 `class` 在 JavaScript 裡是保留字。這個示範只描述畫面，還沒有按鈕，也沒有會變的資料。

```jsx 03-react/src/demos/01-hello.jsx
export default function Hello() {
  return (
    <section>
      <h1 className="text-2xl font-bold">你好</h1>
      <p>這一段由元件回傳。</p>
    </section>
  );
}
```

畫面：

```text
你好
這一段由元件回傳。
```

**解析**

- `export default` 把這個函式交給別的檔案使用，一個檔案通常交出一個主要元件。
- `return` 後面的括號讓標記可以分成多行寫。
- 最外層的 `section` 是父元素，兩個標籤是它的子元素，所以回傳仍是一棵樹。
- 標籤必須成對，或像 `<img />` 那樣自己結束；少了結尾，編譯會失敗。

{% note info %}
**以前的寫法**
舊教學常見 class 元件（用 `this.state` 記資料）。現在的官方文件與這門課都只寫函式元件。
{% endnote %}

### createRoot

**觀念**

瀏覽器先載入幾乎空白的 HTML，React 從指定的節點開始把畫面畫進去。這個動作由 react-dom 的 `createRoot` 完成：它指定掛載點，再呼叫 render 把元件畫進去。第一次畫之前，React 會先清掉掛載點裡原有的內容。

範本的入口檔用 `<StrictMode>` 包住 App，所以專案一開始就啟用了嚴格模式。它是 React 提供的元件，不會產生任何 HTML 標籤，只在開發時多做檢查，目的是提早抓出不純（impure）的寫法。純的意思是：同樣的資料應算出同樣的畫面，渲染過程不該改動外面的資料。

開發時嚴格模式會做這些事：

- 元件函式會多呼叫一次，兩次都應算出一樣的畫面。函式裡的 console.log 因此會印兩次，這不代表使用者點了兩下。
- 元件第一次掛上時，每個 effect 會多跑一輪「設定、清除、再設定」，檢查清除函式有沒有寫對。effect 在下一篇才登場。

這些檢查只在開發時執行，`pnpm build` 之後的成品不會有，也不會多出一層畫面。要關掉的話，把 StrictMode 那層拿掉，直接 render App 即可；但關掉只是讓問題看不見，課堂維持開啟。

```html 03-react/index.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React 練習</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

```jsx 03-react/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

打開開發者工具，`#root` 裡會出現元件產生的標籤。

**解析**

- `index.html` 沒有正文，正文由 React 畫進 `#root`。
- `createRoot` 的引數必須是頁面上真的存在的節點，找不到就無法畫。
- `import './index.css'` 沒有取值，只是把這個樣式檔載入，Tailwind 的樣式因此生效。
- `App` 是最外層元件，之後的元件都由它往下拼。

## 選讀：工具鏈

手動建立專案的步驟 3 已把 `eslint.config.js`、`.prettierrc`、`.vscode` 與 `jsconfig.json` 設成與 `03-react` 相同；這一節用課堂專案路徑再拆 ESLint 與 Prettier，說明每一段在做什麼。ESLint 檢查規則，Prettier 只管排版，兩者分工，才不會同一行被兩套工具各改一次。`jsconfig.json` 的用途見步驟 3，此處不重複。

### ESLint

**觀念**

在 `03-react` 執行 `pnpm lint`，跑的就是下面這份設定。它用 ESLint 的 flat config（以陣列列出一組組設定的新格式），檢查所有 `.js` 與 `.jsx`，忽略 `dist`。`defineConfig` 在這裡從 `eslint/config` 匯入，和 Vite 的同名但不是同一個函式。

Prettier 的設定放在陣列最後，用來關掉與排版衝突的規則。同一個專案不要同時留兩套檢查器去改同一支程式。

```js 03-react/eslint.config.js
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  reactRefresh.configs.vite(),
  eslintConfigPrettier,
]);
```

沒有問題時，指令結束、不印任何內容；警告會印出但不讓指令失敗，錯誤則會讓指令失敗。

**解析**

- `reactHooks.configs.flat.recommended` 包含 Hooks 的使用規則，以及 React Compiler 用的檢查。
- 規則錯誤（error）有：在 effect 裡同步設定狀態、渲染過程讀寫 ref、渲染不純、在渲染中設定狀態。這幾項在後面用到時再細說。
- effect 的依賴陣列少寫，只會是警告（warning）。
- `eslint-plugin-react-refresh` 檢查檔案的匯出方式，避免熱更新失效。
- `globals.browser` 讓 `document`、`fetch` 這些瀏覽器全域名稱不會被判成未宣告。
- `eslint-config-prettier` 放最後，空格與引號就只由 Prettier 決定。

### Prettier

**觀念**

全班用同一套排版：縮排兩個空格、要分號、JavaScript 字串用單引號，JSX 屬性仍用雙引號（Prettier 的預設）。規則放在專案裡的 `.prettierrc`，不要寫進個人的使用者設定，別人 clone 專案才會套到一樣的規則。

編輯器的行為放在專案的 `.vscode` 資料夾，`03-react` 已經附上。VS Code 只讀你開啟的那個資料夾裡的 `.vscode`，所以要把 `03-react` 當專案開啟。

```json 03-react/.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

```json 03-react/.vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.linkedEditing": true,
  "editor.guides.bracketPairs": true,
  "files.autoSave": "afterDelay",
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "css.lint.unknownAtRules": "ignore",
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "files.trimTrailingWhitespace": false
  }
}
```

```json 03-react/.vscode/extensions.json
{
  "recommendations": [
    "ritwickdey.LiveServer",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "mhutchie.git-graph",
    "MS-CEINTL.vscode-language-pack-zh-hant",
    "dbaeumer.vscode-eslint",
    "christian-kohler.path-intellisense",
    "kisstkondoros.vscode-gutter-preview",
    "GitHub.copilot"
  ]
}
```

**解析**

- `singleQuote` 只管 JavaScript 字串；標籤屬性維持雙引號，與 HTML 一致。
- `tabWidth` 是縮排的空格數，這門課用 2。
- `editor.formatOnSave` 讓存檔時交給 Prettier 排版，`editor.defaultFormatter` 指定使用 Prettier 擴充。
- `source.fixAll.eslint` 設成 `explicit`，存檔時一併修 ESLint 能自動修的問題。
- `extensions.json` 列出建議安裝的擴充，打開專案時編輯器會提示安裝缺少的項目。
- 空格與引號只交給 Prettier，不要再寫成 ESLint 規則。

# JSX

JSX 讓你在 JavaScript 裡寫元素。它不是字串，也不是另開一個 HTML 檔，而是建置時由 Vite 轉成一般 JavaScript 的寫法。這一章先看 JSX 的語法規則：一個根、花括號、屬性名稱與樣式物件；再看條件怎麼決定畫哪一塊。

## JSX 語法

JSX 長得像 HTML，但規則更嚴格。這一節把最常踩到的規則依序走一遍：多個元素怎麼回傳、花括號裡能放什麼、屬性名稱與樣式要怎麼寫。

- 回傳只能有一個根。多個兄弟元素要用 Fragment 或另一個元素包起來。
- 每個標籤都要結束，沒有內容的標籤寫成自閉，例如 `<input />`。
- 花括號裡放表達式（算得出一個值的式子）。`if` 與 `for` 是敘述，要寫在回傳之前。
- 屬性名稱用駝峰：`class` 寫 `className`，`for` 寫 `htmlFor`。`aria-*` 與 `data-*` 維持原本的連字號。

### Fragment

一個元件只能回傳一個根，但有時多個兄弟元素外面不該多一層包裹。Fragment 就是不產生 HTML 的包裹。

**觀念**

JSX 會被轉成一般的 JavaScript 物件，函式不能同時回傳兩個物件，所以多個兄弟要有共同的根。空標籤 `<>...</>` 是 Fragment 的簡寫，它不會出現在 HTML 裡，裡面的元素直接成為上一層的子節點。

列表裡每一項若要回傳多個元素又要給 key，簡寫沒有地方放 key，才改寫成 `<Fragment key={...}>`。列表在後面的章節才教，這一則先用簡寫。

```jsx 03-react/src/demos/02-fragment.jsx
export default function FragmentDemo() {
  return (
    <>
      <h1 className="text-2xl font-bold">洛奇旅行</h1>
      <p>這兩個兄弟沒有多包一層 div。</p>
    </>
  );
}
```

畫面是一行標題、一行說明。用開發者工具看 `#root` 底下，標題與段落直接並列，外面沒有多出空的包裹元素。

**解析**

- 空標籤包住的兩個元素算一次回傳。如果兩個標籤並列、外面沒有任何包裹，會是語法錯誤。
- Fragment 本身不會出現在 Elements，所以看不到一個叫 Fragment 的標籤。
- 大多數版面仍用 `section`、`article` 這類有語意的標籤當根。只有多一層沒有意義時才用 Fragment。

### 表達式

花括號是從 JSX 回到 JavaScript 的入口，裡面只能放會算出一個值的式子。需要 `if` 判斷時，先在 `return` 之前算好結果，再把結果放進花括號。

**觀念**

元件函式裡先準備名稱、單價與人數。人數要換成畫面上的說法時，在回傳之前用 `if` 先決定好 `peopleLabel`，回傳時花括號裡只放這個字串。總價則直接在花括號裡做乘法，算出數字後再變成畫面上的文字。

```jsx 03-react/src/demos/03-expr.jsx
export default function ExprDemo() {
  const name = '台北城市漫遊';
  const price = 12800;
  const people = 2;
  let peopleLabel = '一人';
  if (people === 2) {
    peopleLabel = '兩人';
  } else if (people >= 3) {
    peopleLabel = '多人';
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>
        {peopleLabel} {price * people}
      </p>
    </section>
  );
}
```

畫面：

```text
台北城市漫遊
兩人 25600
```

{% note info %}
**不要這樣寫**
把 `if (people === 2) { ... }` 整段放進花括號不是合法的 JSX，`if` 是敘述，不是表達式。條件要在 `return` 之前先處理，或改用後面的三元運算子。
{% endnote %}

**解析**

- `{name}` 算出字串，成為標題文字。
- `{price * people}` 先做乘法。人數是 2 時，畫面上看到的是結果 25600，不是算式。
- `{peopleLabel}` 的值由 `return` 之前的 `if` 決定，人數是 2 時是「兩人」。
- 兩個花括號中間的空白是固定文字，固定文字與表達式可以接在同一個標籤裡。
- 物件不能直接放進花括號當子節點，React 會丟出「Objects are not valid as a React child」的錯誤。要先取出欄位，例如寫成 `{person.name}`。

### 屬性名稱與 style 物件

JSX 的屬性名稱對應的是 DOM 的屬性，而不是 HTML 的寫法。行內樣式的值是一個物件，而不是字串。

**觀念**

屬性在 JSX 裡會變成 JavaScript 物件的鍵，而 class、for 是 JavaScript 的保留字，所以改寫成 `className` 與 `htmlFor`。其餘屬性也是駝峰，例如 `readOnly` 的 O 要大寫。

行內樣式的值是物件，CSS 的 background-color 寫成 `backgroundColor`。這個物件可以先放在常數，再交給 `style`。一般的外觀仍以 Tailwind 的類別為主，這一則為了看物件，才把背景與內距寫進行內樣式。

```jsx 03-react/src/demos/04-style.jsx
export default function StyleDemo() {
  const panel = {
    backgroundColor: '#ffffff',
    padding: '12px',
  };

  return (
    <section style={panel} className="rounded border border-stone-200">
      <label htmlFor="item-name">名稱</label>
      <input
        id="item-name"
        readOnly
        value="台北城市漫遊"
        className="ml-2 rounded border px-2"
      />
    </section>
  );
}
```

畫面是一個白底、有內距的區塊。標籤寫著名稱，輸入框裡是台北城市漫遊，而且不能打字。

**解析**

- `style={panel}` 的花括號是 JavaScript 的入口，裡面的 `panel` 是物件。直接寫成 `style={{ ... }}` 的雙花括號，只是外層入口加上內層的物件。
- 樣式的鍵要用駝峰，寫成 `'background-color'` 會讓 React 在 Console 警告。多數屬性的數字值沒有單位時，React 會補上 px，字串則照寫。
- `htmlFor` 要和輸入框的 `id` 相同，點標籤才會聚焦到那一格。
- 輸入框有 `value` 卻沒有改值的處理函式時，React 會在 Console 警告。加上 `readOnly` 表示這一格刻意只顯示、不接受輸入。表單欄位的正式寫法在後面的表單章節。

### className

外觀類別是一個字串。條件只決定這個字串的內容，標籤本身不必拆成兩個 `return`。

**觀念**

`active` 為真時用深色按鈕，為假時用淺色按鈕。三元算出的是字串，放進 `className`。Tailwind 的工具類別用空白接在同一個字串裡。

兩種按鈕若只有外觀不同，就用同一個元素換類別，不要寫成兩個元件。

```jsx 03-react/src/demos/05-class.jsx
export default function ClassDemo() {
  const active = true;
  const buttonClass = active
    ? 'rounded bg-teal-800 px-3 py-1 text-white'
    : 'rounded bg-stone-200 px-3 py-1';

  return (
    <section>
      <p>{active ? '使用中' : '已停用'}</p>
      <button type="button" className={buttonClass}>
        洛奇旅行
      </button>
    </section>
  );
}
```

畫面第一行是「使用中」，按鈕是白字深底。

**解析**

- `className` 的值是字串，所以三元的兩個分支都要是字串。
- 類別之間要有空白，少了空白會變成一個不存在的類別。
- 段落的三元決定文字，按鈕的三元決定外觀，兩件事各算各的。
- 類別很長時，先放進常數再綁到屬性，回傳的標籤比較好讀。

## 條件渲染

同一個元件可以依資料回傳不同的畫面。這一節從最大的單位開始：整個元件換成另一棵樹，然後是兩個元素二選一，最後是用運算子在樹裡多畫一塊或補預設字。

- 提早 return 在函式前半就結束，適合整塊畫面完全不同的情況，例如還沒有資料。
- 三元運算子在兩個元素之間挑一個。
- `&&` 在條件為真時才多畫一塊。左邊要放布林；數字 0 放在左邊會被畫出來。
- `||` 在左邊缺內容時補預設字，0 也會被換掉。只想補 `null` 與 `undefined` 時用 `??`。

{% mermaid graph LR %}
  checkNode["先看條件"] --> earlyNode["整顆提早 return"]
  checkNode --> ternNode["三元挑一個元素"]
  checkNode --> logicNode["短路：多畫、補字、留 0"]
  style checkNode fill:#fff3e0
  style earlyNode fill:#e3f2fd
  style ternNode fill:#e3f2fd
  style logicNode fill:#e8f5e9
{% endmermaid %}

### 提早 return

條件成立時先回傳另一棵樹，後面的主要畫面就不會再執行。讀的人可以先把例外情況看完，再看正常的那一塊。

**觀念**

沒有選到行程時，函式立刻回傳一句說明；有行程時才回傳卡片。兩個 `return` 不會同時發生。

這種寫法適合「整個元件都不一樣」。元件也可以回傳 `null`，代表什麼都不畫。只是少一個小標記、或補一句預設字時，用後面的三元與邏輯運算子就夠了。

```jsx 03-react/src/demos/06-early.jsx
export default function EarlyDemo() {
  const product = null;

  if (!product) {
    return <p>尚未選擇行程。</p>;
  }

  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p>{product.price}</p>
    </article>
  );
}
```

畫面只有一行「尚未選擇行程。」，卡片那一段這一次不會執行。

**解析**

- `if` 寫在 `return` 之前，不寫在 JSX 的花括號裡。
- 第一個 `return` 執行後函式就結束，下面的卡片不會被算出來。
- `product` 是 `null` 時，去讀 `product.title` 會丟出錯誤。提早 return 正是在那一行之前把它擋下來。

### 三元運算子

兩個互斥的元素要留在同一段 JSX 裡時，用三元：條件為真取問號後面那個，為假取冒號後面那個。

**觀念**

庫存大於 0 就顯示「有庫存」，否則顯示「補貨中」。兩個段落寫在同一個地方，之後改文案不用翻到函式的另一端。

三元的兩個分支都要是可以畫出來的值。只在成立時多畫一塊、或左邊缺內容要補預設字，用下一節的短路寫法會更簡潔。

```jsx 03-react/src/demos/07-ternary.jsx
export default function TernaryDemo() {
  const stock = 3;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      {stock > 0 ? <p>有庫存</p> : <p>補貨中</p>}
    </section>
  );
}
```

畫面標題是台北城市漫遊，下面一行是「有庫存」。

**解析**

- 條件是 `stock > 0`，3 通過，所以畫出第一個段落。
- 冒號後面的段落這一次不會出現在 HTML 裡，它只是另一種可能的結果。
- 三元本身是表達式，會算出一個元素，所以可以放進花括號。
- 超過兩種結果時，三元會很難讀。改在 `return` 之前用 `if` 決定要放哪個變數。

### 邏輯運算子與短路求值

06 {% post_link lokiTech-15day-06-js-basics %} 已經教過短路求值：`&&` 左邊為假就交出左邊，`||` 左邊為假才改看右邊，`??` 只在 `null` 或 `undefined` 時改用右邊。這一節看同一套規則放進 JSX 之後的結果：條件成立才多畫一塊、缺內容時補預設字，以及怎樣避免把 0 畫出來或把 0 吃掉。

React 會把 `true`、`false`、`null`、`undefined` 當成空位，什麼都不畫；數字與字串則會照樣畫出來。數字 0 既是假值，又是可以畫出來的值，這就是幾個陷阱的來源。

#### && 運算子

條件成立才多一塊元素、不成立就什麼都不留，用 `&&`。左邊要是布林或比較，為真時才畫出右邊。

**觀念**

有折扣時才顯示折扣那一行，另外用布林 `hasTag` 決定要不要多一個標籤。兩個條件各自短路，標題與價格始終都在。

不要用 `&&` 在兩大塊畫面之間二選一，那是三元或提早 return 的工作。左邊也不要直接放件數或金額，原因在下一節。

```jsx 03-react/src/demos/08-and.jsx
export default function AndDemo() {
  const discount = 10;
  const hasTag = true;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      <p>價格 12800</p>
      {discount > 0 && <p>折扣 {discount}</p>}
      {hasTag && <p>本週推薦</p>}
    </section>
  );
}
```

畫面有四行：台北城市漫遊、價格 12800、折扣 10、本週推薦。

**解析**

- `discount > 0` 為真，所以折扣那一行會被畫出來。
- `hasTag` 本身是布林，為真時標籤段落出現，布林不會變成畫面上的文字。
- 左邊為假時，這一格沒有任何節點，不必再補 `null`。
- 左邊寫比較或布林，是用 `&&` 的安全做法。

#### 左邊是 0 的陷阱

`&&` 在左邊為假時，整個式子的值就是左邊。左邊若是數字 0，React 會把這個 0 畫出來。

**觀念**

件數是 0 時，`count && <p>...</p>` 算出來的是 0，而不是「什麼都不畫」，畫面上會多一個你沒打算顯示的 0。

要表達「大於 0 才顯示」，就把左邊寫成比較，或改用三元並讓假的那一邊給 `null`。件數、長度、金額這幾種值常常是 0，用 `&&` 之前都先改成比較。

```jsx 03-react/src/demos/09-zero.jsx
export default function ZeroDemo() {
  const count = 0;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      {count && <p>人數 {count}</p>}
    </section>
  );
}
```

畫面標題下面會出現一個 0，不會出現「人數 0」那個段落。

```text
台北城市漫遊
0
```

**解析**

- 0 是假值，所以 `&&` 交出左邊的 0。
- React 允許數字當子節點，因此 0 被畫出來；`false` 與 `null` 則不會。
- 這不是計算錯誤，而是「假值」和「可以畫出來的值」剛好重疊。
- 左邊改寫成 `count > 0` 之後，結果是 `false`，右邊的段落與那個 0 都不會出現。

#### || 運算子

字串是空的、或值是其他假值時，用 `||` 補上預設字。左邊已經有內容，就留下左邊，右邊不會執行。

**觀念**

地點是空字串時，畫面改顯示「未定地點」。備註已經寫了「含早餐」，就繼續用這句，不會換成「尚無備註」。兩種結果都是文字，段落本身都還在。

這和 `&&` 的方向相反：`&&` 是左邊成立才採用右邊，`||` 是左邊缺了才改看右邊。

```jsx 03-react/src/demos/10-or.jsx
export default function OrDemo() {
  const place = '';
  const note = '含早餐';

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      <p>地點 {place || '未定地點'}</p>
      <p>備註 {note || '尚無備註'}</p>
    </section>
  );
}
```

畫面有三行，地點補上預設字，備註留下已有的內容。

```text
台北城市漫遊
地點 未定地點
備註 含早餐
```

**解析**

- `place` 是空字串，屬於假值，`||` 交出右邊，所以地點那一行是「未定地點」。
- `note` 已有內容，`||` 不再看右邊，備註那一行就是「含早餐」。
- 兩個段落都在，差別只在花括號算出的文字。
- 數字 0 也是假值，用 `||` 補「未定」會把 0 吃掉，要留下 0 就改用下一節的 `??`。

#### ?? 運算子

0 是有效的數字。空值合併只在左邊是 `null` 或 `undefined` 時才改用右邊，所以 0 與空字串都會留下來。

**觀念**

同一筆價格是 0：用 `||` 的那一行變成「未定」，用 `??` 的那一行仍是 0。兩行並排，就是為了對照哪一種運算子把 0 當成沒有值。

補「未定」這類預設字時，若來源可能是 0（金額、件數），用 `??`。

```jsx 03-react/src/demos/11-nullish.jsx
export default function NullishDemo() {
  const price = 0;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      <p>邏輯或：{price || '未定'}</p>
      <p>空值合併：{price ?? '未定'}</p>
    </section>
  );
}
```

畫面標題下面兩行不一樣：邏輯或把 0 換成「未定」，空值合併留下 0。

```text
台北城市漫遊
邏輯或：未定
空值合併：0
```

**解析**

- 0 是假值，`||` 改用右邊，第一行是「未定」，金額 0 被吃掉。
- 0 不是 `null` 也不是 `undefined`，所以 `??` 不改用右邊，第二行留下 0。
- 左邊換成 `null` 或 `undefined` 時，兩種寫法都會落到「未定」。

# 單向資料流

React 的資料只往一個方向走：由上層的元件交給下層。這一章先說明資料怎麼向下傳，並用 React Developer Tools 看到它；再依照官方的 Thinking in React 步驟，看畫面怎麼拆成元件、會變的值該放在哪一層。

下面的示範會用到屬性（props，父層寫在標籤上、交給子層的資料）。父層是在回傳的 JSX 裡用到另一個元件的那個元件，被用到的就是子層。子層用函式參數接收屬性，並用 06 學過的解構取出需要的欄位。屬性的完整寫法在下一章再詳細說明，這一章先看資料的走向。

## 資料向下傳

資料由父層持有，用屬性傳給子層。畫面不對時，順著這個方向往上找，就能找到擁有那份資料的元件。這一節先看一個傳遞的範例，再用開發者工具看實際的元件樹。

- 父層把現在的值傳下去，子層可以讀，但不能把那份物件直接改掉。
- 子層要通知父層時，由父層再傳一個函式下去，子層呼叫它，改資料的動作仍然發生在父層。這個做法在後面的元件與狀態章節才會實作，這裡先記住方向。

### 由父層傳入

子層的參數就是父層這一次傳下來的值。同一份標題傳給兩張卡片，兩張看到的是同一個字，子層裡沒有自己的副本。

**觀念**

`Card` 只負責把收到的標題畫出來。`DownDemo` 擁有那個標題，用屬性交下去。卡片裡沒有任何能修改父層資料的函式，所以它改不了父層的常數。

```jsx 03-react/src/demos/12-down.jsx
function Card({ title }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
    </article>
  );
}

export default function DownDemo() {
  const title = '台北城市漫遊';

  return (
    <section className="grid gap-3">
      <Card title={title} />
      <Card title={title} />
    </section>
  );
}
```

畫面是上下兩張卡片，標題都是「台北城市漫遊」。

**解析**

- 兩次 `<Card title={title} />` 會各自執行一次 `Card` 函式（React 執行元件函式、算出畫面，稱為渲染），兩次讀到的是父層同一個常數。
- 子層的 `title` 只是這一次收到的值。在子層重新指定它，不會改到父層，也不會讓另一張卡片跟著變。
- 屬性名稱由你自己取，子層參數的名稱要和父層寫的屬性對上。
- 標題不對時，回到 `DownDemo` 看那個常數。

### React Developer Tools

React Developer Tools 是瀏覽器擴充功能，讓你點一個元件，就看到它這一輪收到的 props，不必在程式裡臨時加 `console.log`。

**觀念**

Chrome、Firefox 與 Edge 都可以從各自的擴充功能商店安裝；Safari 則要用官方的獨立 `react-devtools` 套件。裝好後重新整理開發中的頁面，開發者工具會多出兩個分頁：Components 看元件樹，Profiler 量測渲染的花費。

在 Components 點選元件，右側會列出它收到的 props；之後學到的狀態也會列在同一處，這一則還沒有，所以先看 props。啟用 React Compiler 的專案裡，被編譯的元件名稱旁會出現「Memo ✨」徽章。

```jsx 03-react/src/demos/12-down.jsx
function Card({ title }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
    </article>
  );
}

export default function DownDemo() {
  const title = '台北城市漫遊';

  return (
    <section className="grid gap-3">
      <Card title={title} />
      <Card title={title} />
    </section>
  );
}
```

打開上面的示範，Components 的元件樹裡可以找到 `DownDemo`，底下兩顆 `Card`；上層還有練習專案自己的 `App` 等元件。點任一顆 `Card`，props 的 `title` 是「台北城市漫遊」。

**解析**

- Components 看的是 React 的元件樹，Elements 看的才是 HTML 的標籤樹，兩者的節點不同。
- 畫面上有兩張卡片，樹上就有兩顆 `Card`。它們的 props 可以相同，但仍是兩個各自獨立的元件。
- 點 `DownDemo` 會發現它的 props 是空的，因為它的父層沒有傳任何屬性給它。
- 一般來說，正式建置會把函式名稱壓縮成短名，Components 看到的名稱就不好讀。學習階段在開發伺服器底下看即可。

## 規劃元件

Thinking in React 把「從畫面到元件」分成幾個步驟：先照畫面畫出元件界線，用固定資料組出靜態畫面，再找出哪些值會變、決定它們放在哪一層。會變的值在 React 稱為狀態（state），也就是元件記住、並會讓畫面跟著更新的資料。怎麼寫出狀態要等狀態那一章，這一節只用常數預告它會放在哪裡。

### 拆分元件

先不管資料會不會變，把畫面裡重複的區塊收成元件，固定的字先寫死或用常數傳下去。界線清楚之後，再決定狀態放哪。

**觀念**

這一頁是同一張畫面：標題「洛奇旅行」、一句說明、兩張卡片。第一個示範把整頁寫在同一個函式裡；第二個示範抽出標題、說明與卡片，父層只負責把它們組合回去。

{% note info %}
**先評估再拆**
實務上不要為了拆而拆。重複出現、可以單獨命名、之後會單獨改動的區塊，才值得收成元件。
{% endnote %}

整頁寫在同一個函式：

```jsx 03-react/src/demos/13-tree.jsx
export default function TreeDemo() {
  return (
    <section>
      <h1 className="text-2xl font-bold">洛奇旅行</h1>
      <p className="mt-2">先拆開，再由父層排回去。</p>
      <div className="mt-4 grid gap-3">
        <article className="rounded border border-stone-200 bg-white p-4">
          <h2 className="text-lg font-semibold">台北城市漫遊</h2>
          <p>12800</p>
        </article>
        <article className="rounded border border-stone-200 bg-white p-4">
          <h2 className="text-lg font-semibold">花蓮山海三日</h2>
          <p>15900</p>
        </article>
      </div>
    </section>
  );
}
```

畫面是標題「洛奇旅行」與一句說明，下面兩張卡片分別是台北城市漫遊 12800、花蓮山海三日 15900。

拆成元件之後，畫面與上面完全相同：

```jsx 03-react/src/demos/13b-tree-split.jsx
function PageTitle() {
  return <h1 className="text-2xl font-bold">洛奇旅行</h1>;
}

function PageLead() {
  return <p className="mt-2">先拆開，再由父層排回去。</p>;
}

function Card({ title, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function TreeSplitDemo() {
  return (
    <section>
      <PageTitle />
      <PageLead />
      <div className="mt-4 grid gap-3">
        <Card title="台北城市漫遊" price={12800} />
        <Card title="花蓮山海三日" price={15900} />
      </div>
    </section>
  );
}
```

**解析**

- 拆分前，卡片外框寫了兩次，要改外框就得在一大段標籤裡找，也很難拿到別處重複使用。
- 拆分後，`PageTitle` 與 `PageLead` 沒有參數，因為標題與說明在這一頁是固定的。`Card` 接收 `title` 與 `price`，因為外框相同、兩筆資料不同。
- 父層的回傳讀起來就是頁面結構：要改卡片去 `Card`，要改標題去 `PageTitle`。
- 這些小元件寫在同一個檔案、沒有 `export`，代表只有這一頁用得到。要放到別的檔案共用，見下一章的選讀「模組」。

### 狀態的位置

會變的值放在「所有用得到它的元件」的最近共同父層。只有一個元件看得到的值，就留在那個元件；能從現有資料算出來的值，不必另存成狀態。

**觀念**

價格是否顯示，兩張卡片都要跟著走，所以這個布林值屬於父層。父層把現在的布林傳下去，卡片只決定這一次要不要畫出價格，不自己保管開關。

名稱已經在，就不要再另存一個「大寫名稱」。算得出來的值，每次渲染時直接算即可。

```jsx 03-react/src/demos/14-place.jsx
function Card({ title, price, showPrice }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {showPrice ? <p>{price}</p> : null}
    </article>
  );
}

export default function PlaceDemo() {
  const showPrice = true;

  return (
    <section className="grid gap-3">
      <Card title="台北城市漫遊" price={12800} showPrice={showPrice} />
      <Card title="花蓮山海三日" price={15900} showPrice={showPrice} />
    </section>
  );
}
```

`showPrice` 目前是常數 `true`，所以兩張卡片都看得到價格。改成 `false`，兩張的價格會一起消失；真正能切換的按鈕，留到狀態那一章再做。

**解析**

- 開關若寫在 `Card` 裡面，每一張卡片會各持有一份，無法一次關掉全部。放在父層時，兩張讀到的是同一次傳下去的值。
- 卡片用三元決定要畫價格還是什麼都不畫，`null` 不會在畫面上留下節點。
- 價格已經是參數，不要為了顯示再複製一份到別的變數裡當狀態。

# 元件

元件是可重複使用的函式，回傳一塊畫面。這一章先看元件怎麼分檔、怎麼互相引用（選讀），再看父層如何用 props 把資料、函式與標籤中間的內容傳給子層。

## 選讀：模組

元件拆成多個檔案後，每個檔要先「匯出」自己的元件，別的檔才能「匯入」使用。這套機制是 ES Module，語法細節見 {% post_link lokiTech-15day-06-js-basics %} 的選讀 ES Module 章節；本課的專案不必先懂它也能照著寫，這一節只看元件最常見的兩種匯出。

一覽：

- 預設匯出（default export）：一個檔只能有一個，匯入時不加花括號，名稱可以自己取。
- 具名匯出（named export）：一個檔可以有多個，匯入時要加花括號，名稱必須和匯出時相同。

### default export

預設匯出代表這個檔的主角。本課每個 demo 都用預設匯出交出頁面元件，專案裡的頁面檔也是這樣寫，匯入的一方才不必知道裡面叫什麼名字。

**觀念**

下面的檔案有兩個元件：`Card` 用具名匯出，讓下一個 demo 引入；`CardDemo` 用預設匯出，是這個檔的主角，內容是一張固定資料的卡片。

```jsx 03-react/src/demos/15-card.jsx
export function Card({ title, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function CardDemo() {
  return <Card title="台北城市漫遊" price={12800} />;
}
```

畫面是一張白底卡片，標題「台北城市漫遊」，下面一行 12800。

**解析**

- 預設匯出決定別的檔不加花括號時會拿到誰，這裡拿到的是 `CardDemo`。
- 同一個檔裡的 `export function Card` 是具名匯出，不是第二個預設匯出。
- 一個檔寫兩個預設匯出會是語法錯誤。
- `CardDemo` 把資料寫死，只是讓這個檔單獨打開也看得到卡片。

### named export

具名匯出在匯入時要把名字放進花括號。名字拼錯或忘了花括號，都會拿不到想要的元件。

**觀念**

下面的頁面從卡片檔匯入 `Card`，排出兩張不同資料的卡片。路徑開頭的 `./` 代表同一個資料夾。

```jsx 03-react/src/demos/16-board.jsx
import { Card } from './15-card.jsx';

export default function BoardDemo() {
  return (
    <section className="grid gap-3">
      <Card title="台北城市漫遊" price={12800} />
      <Card title="花蓮山海三日" price={15900} />
    </section>
  );
}
```

畫面是上下兩張卡片：「台北城市漫遊」12800、「花蓮山海三日」15900。外框與標題樣式來自 `Card`，這一頁只決定有幾張、各是什麼資料。

**解析**

- 花括號裡的 `Card` 必須和卡片檔的具名匯出同名。
- 寫成不加花括號的匯入，拿到的會是預設匯出的 `CardDemo`，不是 `Card`。
- 兩次使用 `Card` 各傳各的資料，元件函式各執行一次，互不影響。
- 這個頁面自己用預設匯出，同時匯入別檔的具名匯出，兩種寫法可以在同一個檔裡並存。

## 傳入資料

元件的輸入叫 props（properties 的縮寫）：父層在標籤上寫的屬性，React 會收集成一個物件，交給元件函式當作唯一的參數。這一節看子層如何用解構取出需要的欄位，以及欄位沒傳時如何補預設值。

props 是唯讀的：子層可以用它畫畫面，但不要修改它，要改資料只能請父層傳新的。

### 解構

參數寫成 `{ title, price }`，就是直接對 props 物件做解構（destructuring，把物件的欄位拆成變數），函式裡就能直接用這兩個名字。

**觀念**

父層寫 `<Product title="台北城市漫遊" price={12800} />`，子層收到的參數等於 `{ title: '台北城市漫遊', price: 12800 }`。屬性值是字串時可以直接用引號，其他型別（數字、變數、函式）都要用花括號包起來，花括號表示裡面是 JavaScript 的值。

```jsx 03-react/src/demos/17-props.jsx
function Product({ title, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function PropsDemo() {
  return <Product title="台北城市漫遊" price={12800} />;
}
```

畫面是一張卡片，標題「台北城市漫遊」，下面一行 12800。

**解析**

- 解構的名字要和屬性名一一對上：父層寫 `price`，子層才取得到 `price`。
- `price={12800}` 傳的是數字；寫成 `price="12800"` 會變成字串。
- 只解構用得到的欄位即可，沒用到的屬性不必列出。
- 不要在子層改 `title`：改了也動不到父層的資料，資料要變，請父層傳新的值。

### 預設值

父層可以省略某個屬性。解構時在欄位後面用等號補預設值，子層就仍有東西可畫。

**觀念**

預設值只在該屬性是 `undefined`（沒傳）時補上；父層明確傳了空字串或 0，就用傳入的值。價格沒有寫預設值，因為缺少價格應該被發現，不該被預設值悄悄蓋掉。

```jsx 03-react/src/demos/18-defaults.jsx
function Product({ title, price, unit = '天' }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>
        {price} {unit}
      </p>
    </article>
  );
}

export default function DefaultsDemo() {
  return <Product title="台北城市漫遊" price={12800} />;
}
```

畫面是「台北城市漫遊」，下一行是「12800 天」。

**解析**

- 父層沒有傳 `unit`，所以子層用預設的「天」。
- 預設值寫在參數的解構裡，是一般的 JavaScript 語法，不是狀態，每次渲染都重新判斷一次。
- 父層若寫成 `unit="人"`，畫面就會是「12800 人」，預設值不介入。

{% note info %}
**defaultProps**
舊版 React 常見元件函式後面接 `Product.defaultProps = { … }` 設定預設值。React 19 已移除函式元件的 defaultProps，一律改用上面的預設參數；只有類別元件還保留它。
{% endnote %}

## 傳入函式與內容

props 不只能傳資料，也能傳函式，以及標籤中間夾著的內容。這一節看子層如何呼叫父層傳下來的函式來通知父層，再看版面元件如何用 children 決定中間放什麼。

### 函式型 props

資料由父層持有，子層想改資料時，沒有辦法直接動父層的狀態，只能呼叫父層傳下來的函式。這個 demo 先預告狀態的用法：`useState` 是讓元件記住會變資料的內建函式，這裡用它讓父層記住「目前選到誰」，下一章才細講。

**觀念**

`CallbackDemo` 擁有「目前選到誰」，子元件只知道自己的名稱，和一個叫 `onPick` 的函式。屬性名稱慣例用 on 開頭，表示「發生這件事時要做的事」。

`onClick` 是 React 綁定點擊事件的寫法，值是點擊時才執行的函式，細節在後面的事件章節。

```jsx 03-react/src/demos/19-callback.jsx
import { useState } from 'react';

function Choice({ title, onPick }) {
  return (
    <button
      type="button"
      className="rounded bg-stone-100 px-3 py-1"
      onClick={() => onPick(title)}
    >
      {title}
    </button>
  );
}

export default function CallbackDemo() {
  const [picked, setPicked] = useState('尚未選');

  return (
    <section>
      <p>選到 {picked}</p>
      <div className="mt-3 flex gap-2">
        <Choice title="台北城市漫遊" onPick={setPicked} />
        <Choice title="花蓮山海三日" onPick={setPicked} />
      </div>
    </section>
  );
}
```

一開始是「選到 尚未選」。按下「花蓮山海三日」，變成「選到 花蓮山海三日」；按「台北城市漫遊」則改成那個名稱。

**解析**

- `onPick={setPicked}` 把設定函式本身交下去，沒有加括號，所以此時沒有執行它。
- 箭頭函式 `() => onPick(title)` 等到點擊才執行；若直接寫成 `onClick={onPick(title)}`，渲染時就會先呼叫一次。
- 兩顆按鈕共用同一個 `onPick`，差別只在各自傳回去的 `title`。
- 更新狀態的呼叫只出現在父層，`Choice` 自己沒有狀態。

### children

寫在標籤開頭與結尾中間的內容，會以 `children` 這個 prop 傳進元件。版面元件負責外框，中間放什麼由使用它的那一方決定。

**觀念**

`Panel` 畫一個有邊框的區塊，中間放 `children`。同一個外框之後要放標題與段落，或放表單，都不必修改它。這個名字由 React 規定，不能換成別的。

```jsx 03-react/src/demos/20-children.jsx
function Panel({ children }) {
  return (
    <section className="rounded border border-stone-200 bg-white p-4">
      {children}
    </section>
  );
}

export default function ChildrenDemo() {
  return (
    <Panel>
      <h1 className="text-2xl font-bold">洛奇旅行</h1>
      <p>外框在 Panel，文字在呼叫端。</p>
    </Panel>
  );
}
```

畫面是一個白底邊框，裡面有標題「洛奇旅行」與一句說明。

**解析**

- 夾在 `<Panel>` 與 `</Panel>` 之間的兩個元素，就是這一次的 `children`。
- `Panel` 不知道中間是標題還是表單，只決定外框與內距。
- 標籤中間沒寫東西時，`children` 是 `undefined`，那一塊就是空的。
- 需要放在版面不同位置的內容（例如標題區與內容區）時，再另外用明確名稱的 props 傳入；單一區塊用 `children` 就夠。

# 狀態

會變、而且變了畫面就要跟著換的資料，放進狀態（state）。元件每次渲染（重新呼叫元件函式算出畫面）讀到的是那一輪的快照（固定不變的值），設定函式則是把下一輪要用的值排進去，渲染完成後畫面才換成新的。

## useState

`useState` 是 React 提供的函式（稱為 Hook，只能在元件裡使用的內建功能），讓元件記住會變的資料。這一節從宣告開始，依序看多個狀態、快照、更新函式、批次更新，最後是使用 Hooks 必須遵守的規則。

呼叫寫成這樣：

```jsx
/**
 * @param {*} initialValue 元件第一次掛上時使用的起始值
 * @returns [value, setValue]
 *   value：這一輪的狀態
 *   setValue：把下一輪的值排進去的函式。直接改 value 不會重畫
 */
const [value, setValue] = useState(initialValue);
```

回傳值是有兩個元素的陣列：現在的值，以及設定函式，我們用解構把它們拆成兩個名字。命名時成對，例如 `count` 與 `setCount`，讀的人一看就知道第二個用來改第一個。

起始值只在元件第一次掛上時使用，之後的渲染不會再用它蓋掉現在的值。

{% mermaid graph LR %}
  clickNode["事件呼叫設定函式"] --> queueNode["更新排進佇列"]
  queueNode --> renderNode["渲染：用快照算出元素"]
  renderNode --> commitNode["提交：寫進畫面"]
  style clickNode fill:#e3f2fd
  style queueNode fill:#fff3e0
  style renderNode fill:#fff3e0
  style commitNode fill:#e8f5e9
{% endmermaid %}

{% note info %}
**React Compiler**
元件裡重複的計算，以及子元件要不要重畫，這門課交給 React Compiler：它在建置時自動為元件加上記憶（把算過的結果留著重用）。所以不必手寫 memo、useMemo 或 useCallback。
{% endnote %}

### 宣告狀態

狀態寫在元件函式的最上面。這個 demo 用 `count` 管次數，按下按鈕就呼叫 `setCount`。

**觀念**

一次更新分成兩步。渲染（render）是 React 重新呼叫元件函式，用新的狀態算出新的畫面描述；提交（commit）是把新舊描述不同的地方寫進頁面。你沒有自己去找段落改文字，而是改狀態，畫面跟著狀態重畫。

設定函式的名字用 set 接在狀態名後面，這是慣例，換名字不會壞，但全班照慣例寫最好認。

{% note warning %}
**不要這樣寫**
直接指派不會更新 React 記住的狀態。解構出來的名字是 `const`，再指派會丟出錯誤；改成 `let` 也只是改到這一次渲染裡的變數，畫面不會重畫。

```jsx
const [count, setCount] = useState(0);

const onAdd = () => {
  count = count + 1;
};
```

要換下一輪的數字，呼叫 `setCount`。
{% endnote %}

```jsx 03-react/src/demos/21-state.jsx
import { useState } from 'react';

export default function CountDemo() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount(count + 1)}
      >
        加一
      </button>
    </section>
  );
}
```

一開始畫面是「次數 0」，按三次之後是「次數 3」。

**解析**

- 起始值 `0` 只在元件第一次放上畫面時用到，之後按按鈕不會把次數清回 0。
- 按下按鈕時呼叫 `setCount(count + 1)`，React 重新呼叫 `CountDemo`，這一次讀到的 `count` 是新數字。
- 渲染階段只是在 JavaScript 裡算出新的描述，頁面文字要到提交才改；而且渲染時不要改狀態，也不要直接動 DOM，同樣的狀態應算出同樣的畫面。
- 設定成和現在相同的值時，React 通常會略過畫面更新。
- 要歸零這類已知常數，直接交那個值，寫 `setCount(0)`。

### 多個狀態

互不相關的值各用一個 `useState`。名稱與件數會分開改，就拆成兩份，各管各的。

**觀念**

先寫名稱，再寫件數，每次渲染都維持這個順序，React 靠順序把每一份狀態對回原位。改名稱只呼叫 `setName`，件數留在原來的數字。

{% note warning %}
**不要這樣寫**
把會分開改的欄位塞進同一個物件，每次改名稱都得展開整包，把沒改的欄位再帶回去，容易漏。兩個值永遠一起換時，才適合合成一個物件。

```jsx
const [trip, setTrip] = useState({
  name: '台北城市漫遊',
  count: 1,
});

const onRename = () => {
  setTrip({ ...trip, name: '花蓮山海三日' });
};
```
{% endnote %}

```jsx 03-react/src/demos/22-multi.jsx
import { useState } from 'react';

export default function MultiDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [count, setCount] = useState(1);

  return (
    <section>
      <p>
        {name} × {count}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount(count + 1)}
      >
        加一人
      </button>
      <button
        type="button"
        className="ml-2 rounded bg-stone-200 px-3 py-1"
        onClick={() => setName('花蓮山海三日')}
      >
        改成花蓮山海三日
      </button>
    </section>
  );
}
```

一開始是「台北城市漫遊 × 1」。按「加一人」變成「× 2」，再按「改成花蓮山海三日」，變成「花蓮山海三日 × 2」。件數不會因為改名而回到 1。

**解析**

- 兩個 `useState` 是兩份獨立的狀態，更新其中一份，另一份沿用上一輪的值。
- 改名的按鈕沒有碰到 `setCount`，所以件數保持不變。
- 每份起始值各自只用一次，件數的 `1` 不會在改名時重新套用。
- 先 `name`、後 `count` 的順序每次渲染都不能變，原因在最後一節的 Hooks 規則。

### 狀態快照

每一次渲染都有自己的一份狀態快照（snapshot）：事件處理函式建立時，帶著的是那一輪的 `count`。這個 demo 故意在同一個事件裡連呼叫兩次 `setCount(count + 1)`，看畫面是不是加二。

**觀念**

兩次呼叫讀的是同一個快照。畫面是 0 時，兩次都在說「下一輪設成 1」，後一次只是重複前一次，所以結果是 1，不是 2。`console.log(count)` 也一樣，印的是按下當下的值，設定函式不會當場改掉手上的 `count`。

```jsx 03-react/src/demos/23-snapshot.jsx
import { useState } from 'react';

export default function SnapshotDemo() {
  const [count, setCount] = useState(0);

  const onAdd = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  return (
    <section>
      <p>快照次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        以為加二
      </button>
    </section>
  );
}
```

從 0 按一次「以為加二」，畫面是「快照次數 1」，Console 印出按下當下的快照：

```text
0
```

**解析**

- `count` 是這一輪渲染的常數，兩次 `setCount(count + 1)` 都從同一個數字開始算。
- 兩次排進去的值相同，所以畫面只加 1。
- `console.log(count)` 發生在設定之後，仍印出 0；新的 `count` 要到下一輪渲染才有。

### 更新函式

設定函式除了接受值，也可以接受一個函式，稱為更新函式（updater function）。React 會把它排進佇列，依序執行，每一個拿到的是前一個算出的結果。

**觀念**

`setCount((value) => value + 1)` 裡的參數，是佇列排到這一步為止的狀態，不是事件函式帶著的快照，所以同一個事件裡的兩次加一會疊上去。

選擇的原則是：下一個值依賴前一個狀態（累加、切換布林、依舊陣列產生新陣列）時，用更新函式；已知要換成哪個常數（例如歸零）時，直接交值。

更新函式必須是純的：只用參數算出新值，不修改任何東西。開發時的嚴格模式（StrictMode，專案的 main.jsx 已經包上）會故意把更新函式呼叫兩次來檢查，純函式不受影響。

```jsx 03-react/src/demos/24-updater.jsx
import { useState } from 'react';

export default function UpdaterDemo() {
  const [count, setCount] = useState(0);

  const onAdd = () => {
    setCount((value) => value + 1);
    setCount((value) => value + 1);
    console.log(count);
  };

  return (
    <section>
      <p>累加次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        正確加二
      </button>
    </section>
  );
}
```

從 0 按一次「正確加二」，畫面是「累加次數 2」，再按一次變 4。Console 仍印出 0，那一行讀的是快照，不是更新函式的參數。

```text
0
```

**解析**

- 第一個更新函式拿到 0 交出 1，第二個拿到 1 交出 2，所以按一次加二。
- 對照上一個 demo：直接交值的兩次呼叫互相蓋掉，更新函式的兩次呼叫則接在一起。
- 每次點擊只更新一次時，`setCount(count + 1)` 也正確；一個事件裡要連續疊加時，才一定得用更新函式。

### 批次更新

同一個事件裡的多次設定，React 會合併成一次渲染，這個行為稱為批次更新（batching）。React 18 起所有事件與非同步回呼裡都會批次處理。這個 demo 在同一次點擊裡同時設定名稱與件數。

**觀念**

渲染時印出 `console.log`，就能數出渲染了幾輪。兩個新值會在同一輪一起出現，不會先看到名稱變了、件數還是舊的。兩份狀態仍然拆開，批次是 React 做的，不必為了少畫一次而把不相關的值塞進同一個物件。

專案有開 StrictMode，開發時每一次渲染都會多呼叫一次元件函式來檢查純度，所以每一輪的 Console 會出現兩行相同的紀錄。這不是點了兩下，也不影響正式版。

```jsx 03-react/src/demos/25-batch.jsx
import { useState } from 'react';

export default function BatchDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [count, setCount] = useState(1);

  console.log('渲染', name, count);

  const onChange = () => {
    setName('花蓮山海三日');
    setCount(3);
  };

  return (
    <section>
      <p>
        {name} × {count}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onChange}
      >
        一次改兩項
      </button>
    </section>
  );
}
```

按下之後畫面是「花蓮山海三日 × 3」。開發模式下 Console 先是掛上時的兩行，點擊後再兩行：

```text
渲染 台北城市漫遊 1
渲染 台北城市漫遊 1
渲染 花蓮山海三日 3
渲染 花蓮山海三日 3
```

**解析**

- 兩次設定發生在同一個事件裡，所以下一輪渲染同時看到新名稱與新件數。
- Console 沒有出現「花蓮山海三日 1」或「台北城市漫遊 3」這種只改一半的紀錄，代表只渲染了一輪。
- 渲染時的 `console.log` 印的是這一輪的快照。
- 若關掉 StrictMode，每一輪只會印一行。

### Hooks 規則

Hooks 只能寫在元件函式（或自訂 Hook）的最上層，每次渲染的呼叫次數與順序都必須一樣，React 才對得回上一輪的狀態。要依條件決定畫什麼，把條件寫在回傳的 JSX 裡。

**觀念**

React 不是靠名字，而是靠呼叫的先後順序，把第幾個 `useState` 對回第幾份狀態。少呼叫或多呼叫一次，後面的狀態就會對到錯誤的位置。以下位置都不能呼叫 Hook：條件式、迴圈、提早回傳之後、事件處理函式或其他巢狀函式裡。ESLint 的 `react-hooks/rules-of-hooks` 會把這些寫法報成錯誤。

{% note warning %}
**不要這樣寫**
條件成立時才呼叫 Hook。下一輪若跳過條件，少了一次呼叫，後面的 Hook 會往前對到上一輪的第一份狀態。

```jsx
function StockDemo({ soldOut }) {
  if (!soldOut) {
    const [name, setName] = useState('台北城市漫遊');
  }
  const [stock, setStock] = useState(2);
}
```

在迴圈裡呼叫也一樣：筆數一變，Hook 的次數就變，每一筆都對不回上一次的同一份狀態。

```jsx
function ListDemo({ rows }) {
  for (const row of rows) {
    const [on, setOn] = useState(row.on);
  }
}
```

要幾份狀態，就在元件最上面寫幾次；每一筆資料各需要自己的狀態時，把那一筆拆成獨立的子元件。
{% endnote %}

下面的檔案把兩個 Hook 放在所有條件之前。有沒有庫存，只影響回傳的那一行字。

```jsx 03-react/src/demos/26-rules.jsx
import { useState } from 'react';

export default function RulesDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [stock, setStock] = useState(2);

  return (
    <section>
      <p>{stock > 0 ? name + ' 有庫存' : name + ' 補貨中'}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setStock(0)}
      >
        設為缺貨
      </button>
      <button
        type="button"
        className="ml-2 rounded bg-stone-200 px-3 py-1"
        onClick={() => setName('花蓮山海三日')}
      >
        改成花蓮山海三日
      </button>
    </section>
  );
}
```

一開始是「台北城市漫遊 有庫存」。按「設為缺貨」變成「台北城市漫遊 補貨中」，按「改成花蓮山海三日」則只換名稱。

**解析**

- 兩個 Hook 都在 `return` 之前，也不在條件或迴圈裡，每次渲染各呼叫一次、順序固定。
- `stock > 0` 只決定顯示哪一句，不影響 `useState` 有沒有被呼叫。
- 只有元件與自訂 Hook 可以呼叫 Hooks；一般函式不行。自訂 Hook 的函式名稱以 use 開頭。

## 不可變更新

狀態是 React 判斷「畫面要不要重畫」的依據，而它比較新舊狀態的方式是看「是不是同一份」。直接修改陣列或物件的內容，狀態仍是同一份，React 看不出變化；要改就複製一份，在新的那份上做變更，再交給更新函式。這一節依序看陣列的新增、刪除、修改，再看物件與巢狀物件。

**一覽**

- 不改原陣列（可以用在更新狀態）：展開 `[...items]`、`filter`、`map`、`slice`，以及 ES2023 新增的 `toSorted`、`toReversed`、`toSpliced`、`with`。
- 會改原陣列（不要用在狀態）：`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`，還有 `items[0] = x` 這種直接賦值。
- 物件同理：展開 `{ ...obj, 欄位: 新值 }` 是複製，`obj.欄位 = 新值` 是直接改。
- 巢狀物件要從改動的那一層到最外層，每一層都換成新的。

直接改狀態常常讓畫面沒有更新，這違反 React 的規則。本課專案啟用的 React Compiler 會假設元件遵守這些規則，並依此保留運算結果；直接改狀態不但不保證畫面正確，ESLint 的 React 規則也會標出來。所以不論有沒有 Compiler，做法都一樣：狀態只換新的、不改舊的。

這一節的清單先用 `map` 畫出來，`key` 的用意留到後面「列表」一節再說明。

### 陣列新增

新增是把舊元素展開到新陣列，再接上新的一筆。舊陣列原樣留著。

**觀念**

按下按鈕時產生新陣列，長度比原來多一。新字串帶上長度，避免和舊的文字重複。這個清單的文字不會重複，也不會刪除，所以先暫用文字當 `key`；會刪、會改的清單要用 id。

```jsx 03-react/src/demos/27-add.jsx
import { useState } from 'react';

export default function AddDemo() {
  const [notes, setNotes] = useState(['台北城市漫遊', '花蓮山海三日']);

  const onAdd = () => {
    setNotes((items) => [...items, '備忘' + (items.length + 1)]);
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        加一則
      </button>
      <ul className="mt-3 list-disc pl-5">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}
```

一開始是台北城市漫遊、花蓮山海三日。按一次多出「備忘3」，再按一次多出「備忘4」。

**解析**

- 展開把舊元素複製進新陣列，這一行不會動到舊陣列。
- 更新函式的參數 `items` 是目前最新的陣列，連續點擊也不會用到過期的長度。
- `notes.push(...)` 改的是原陣列，狀態的參考沒換，畫面常常不會更新。
- 要排序時，用 `toSorted` 取得排好的新陣列；舊的 `sort` 會改到原陣列，要先複製再排。

{% note warning %}
**不要改原陣列**
新增、刪除、排序都交一份新陣列。原陣列留著，這一輪的其他程式才不會看到做到一半的資料。
{% endnote %}

### 陣列刪除

刪除是留下其他筆，不是把那一格挖空。`filter` 回傳新陣列，對不上的那一筆不會在裡面。

**觀念**

每一列有自己的刪除按鈕，按下時把那一筆的 id 交給更新函式。`filter` 的條件是「id 不相同才留下」。刪掉花蓮山海三日之後，台北城市漫遊與京都紅葉散步仍在，順序不變。

按鈕上的 `() => onRemove(item.id)` 是為了把這一列的 id 帶進去，為什麼要多包一層，本章稍後的「參數與預設動作」會說明。

```jsx 03-react/src/demos/28-remove.jsx
import { useState } from 'react';

const initial = [
  { id: 'taipei', title: '台北城市漫遊' },
  { id: 'hualien', title: '花蓮山海三日' },
  { id: 'kyoto', title: '京都紅葉散步' },
];

export default function RemoveDemo() {
  const [items, setItems] = useState(initial);

  const onRemove = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.id} className="flex gap-2">
          <span>{item.title}</span>
          <button
            type="button"
            className="rounded bg-stone-200 px-2"
            onClick={() => onRemove(item.id)}
          >
            刪除
          </button>
        </li>
      ))}
    </ul>
  );
}
```

一開始三列。按下花蓮山海三日的刪除之後，只剩台北城市漫遊與京都紅葉散步。

**解析**

- `filter` 不會改原陣列，它交出一份較短的新陣列。
- 條件用 id，不用名稱。以後兩筆都叫台北城市漫遊時，才不會一次刪掉兩列。
- 全部刪光時，`map` 得到空陣列，清單就是空的，不需要另外把 `<ul>` 拿掉。
- 要在中間插入一筆，可用 `toSpliced`；它和 `splice` 的參數相同，但回傳新陣列、不改原陣列。

### 陣列修改

修改某一筆時，那一筆要換成新物件，其他筆沿用原來的。`map` 負責走訪，展開負責複製欄位。

**觀念**

按下「花蓮改價」時，只有 id 是 `hualien` 的那一筆換成價格 16800 的新物件，另外兩筆仍是原來的物件。三列都還在，只有花蓮山海三日的數字變了。

不要寫 `item.price = 16800`。那是直接改狀態裡的原物件，React 比較新舊狀態時看不出差別。

```jsx 03-react/src/demos/29-edit.jsx
import { useState } from 'react';

const initial = [
  { id: 'taipei', title: '台北城市漫遊', price: 12800 },
  { id: 'hualien', title: '花蓮山海三日', price: 15900 },
  { id: 'kyoto', title: '京都紅葉散步', price: 42800 },
];

export default function EditDemo() {
  const [items, setItems] = useState(initial);

  const onEdit = () => {
    setItems((current) =>
      current.map((item) =>
        item.id === 'hualien' ? { ...item, price: 16800 } : item,
      ),
    );
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onEdit}
      >
        花蓮改價
      </button>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.id}>
            {item.title} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

按下之後，中間一列從「花蓮山海三日 15900」變成「花蓮山海三日 16800」，另外兩列不變。

**解析**

- `map` 回傳的長度與原陣列相同，這一則不是在新增或刪除。
- 對到的那一筆用展開複製，再把 `price` 蓋掉，標題仍是花蓮山海三日。
- 沒對到的筆直接放回原物件，不必每一筆都複製。
- 三元運算子的兩個分支都要回傳一筆資料；只回傳其中一邊，另一邊那一格會變成 `undefined`。
- 只改陣列中某一格時，也可以用 `with(index, newValue)`，它回傳換掉那一格的新陣列。

### 物件欄位

改物件的一個欄位時，展開舊物件，再寫上新欄位。只交一個新欄位的物件，其他欄位會消失。

**觀念**

人物有名稱與城市。改城市時，名稱要留在新物件裡。展開放前面、新欄位放後面，同名的欄位才會以新值為準。

```jsx 03-react/src/demos/30-object.jsx
import { useState } from 'react';

export default function ObjectDemo() {
  const [profile, setProfile] = useState({ name: '阿光', city: '台北' });

  const onMove = () => {
    setProfile((current) => ({ ...current, city: '台中' }));
  };

  return (
    <section>
      <p>
        {profile.name} 在 {profile.city}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onMove}
      >
        改到台中
      </button>
    </section>
  );
}
```

一開始是「阿光 在 台北」，按下之後變成「阿光 在 台中」。

**解析**

- `profile.city = '台中'` 改的是原物件，不要用這種寫法更新狀態。
- 展開在前、新欄位在後。順序對調，新欄位會被舊值蓋回去。
- 沒有被寫在後面的欄位會保留，所以名稱仍是阿光。
- 同一次事件裡要連續更新同一個物件時，用更新函式的 `current` 當基礎，後一次才接得到前一次的結果。

### 巢狀物件

物件裡還有物件時，要改的那一層與它的每一層父物件都得換成新的。只展開最外層，裡面的地址仍是原來那一份。

**觀念**

人物有名稱，也有一個地址物件。改城市時，先展開人物，再展開地址，最後蓋掉城市。名稱與路名都留在新物件裡。

若只寫 `{ ...profile, city: '台南' }`，城市會多出現在人物這一層，地址裡的城市仍是舊的，畫面讀 `profile.address.city` 就不會變。

```jsx 03-react/src/demos/31-nested.jsx
import { useState } from 'react';

export default function NestedDemo() {
  const [profile, setProfile] = useState({
    name: '阿光',
    address: { city: '台北', street: '中山路' },
  });

  const onMove = () => {
    setProfile((current) => ({
      ...current,
      address: { ...current.address, city: '台南' },
    }));
  };

  return (
    <section>
      <p>
        {profile.name} 在 {profile.address.city} {profile.address.street}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onMove}
      >
        改到台南
      </button>
    </section>
  );
}
```

一開始是「阿光 在 台北 中山路」。按下之後，城市換成台南，路名仍是中山路。

**解析**

- 外層展開留下 `name`，沒有這層展開，名稱會消失。
- `address` 被整個換成新物件，新物件再展開舊地址，所以路名還在。
- `current.address.city = '台南'` 改的是原物件，不要用這種寫法更新狀態。
- 層數愈深愈難寫。可以先把狀態拆平，或改用 Immer（讓你用「直接改」的寫法、由它產生新物件的套件，本課不使用）。

{% note info %}
**structuredClone 不適合拿來更新狀態**
`structuredClone` 是瀏覽器內建的深層複製，但每一層都會變成新物件，沒改的部分也一併換掉；物件裡有函式時會丟出錯誤，class 的實例複製後會變成一般物件、失去方法。只換需要換的那幾層，才是更新狀態的寫法。
{% endnote %}

# 事件

使用者的點擊、輸入與送出，都經由事件處理函式進入元件。這一章先看處理函式怎麼綁、怎麼取名、怎麼取得事件物件，再看需要額外參數與取消瀏覽器預設動作的情況。

## 事件處理函式

處理函式在事件發生時才執行。寫進屬性的是函式本身，事件發生時 React 呼叫它，並把事件物件交給它。屬性與函式各有慣用的取名，讀的人一眼就看得出誰在等事件、誰在做事。

**一覽**

- 屬性名稱：`on` 加上大寫開頭的事件名，例如 `onClick`、`onChange`、`onSubmit`、`onKeyDown`、`onMouseEnter`。內建標籤（`button`、`input`）只能用這些固定名稱。
- 處理函式名稱：`handle` 加上事件名，例如 `handleClick`、`handleSubmit`。
- 自己的元件可以替 props 取符合用途的名字，例如 `onRemove`，一樣以 `on` 開頭。

### 命名慣例

`onClick` 是 JSX 的屬性，`handleClick` 是你寫的函式。兩邊不要對調，也不要在屬性上立刻呼叫函式。

**觀念**

按下按鈕時，`handleClick` 把文字改成「已記錄」，屬性寫 `onClick={handleClick}`。

若寫成 `onClick={handleClick()}`，渲染到這一行就會執行，交給 React 的是回傳值而不是函式。這個處理函式又在渲染中設定狀態，React 會不斷重畫，超過上限後丟出「Too many re-renders」的錯誤。

按鈕要寫 `type="button"`。放在表單裡時，預設的 `submit` 會順便送出表單。

```jsx 03-react/src/demos/32-event.jsx
import { useState } from 'react';

export default function EventDemo() {
  const [label, setLabel] = useState('尚未點');

  const handleClick = () => {
    setLabel('已記錄');
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={handleClick}
      >
        記錄
      </button>
      <p className="mt-2">{label}</p>
    </section>
  );
}
```

還沒點時，按鈕下面是「尚未點」。點一次之後變成「已記錄」。

**解析**

- `handleClick` 沒有在渲染時被呼叫。畫面先畫完，等使用者按下才執行。
- 設定狀態發生在處理函式裡，下一輪渲染才讀得到新的 `label`。
- 一個屬性綁一個函式。要同時做兩件事，就把兩件事寫進同一個函式。
- 處理函式不必放進 `useCallback`。每次渲染建立新的函式是正常寫法，不影響正確性。

### 事件物件

React 呼叫處理函式時會傳入一個事件物件，描述這次事件的種類與來源。這個物件是 React 包過的版本，常用的欄位與瀏覽器原生事件相同，需要原生的那一份時可用 `event.nativeEvent`。

**一覽**

- `event.type`：事件種類，點擊時是 `click`。
- `event.target`：真正被點到的元素，可能是按鈕裡更小的子元素。
- `event.currentTarget`：綁定處理函式的那個元素，不論點到哪個子元素都不變。

**觀念**

按鈕裡放了一段粗體字。點粗體字時，`target` 是粗體字的 STRONG，`currentTarget` 仍是 BUTTON；點粗體字以外的按鈕區域，兩者都是 BUTTON。要讀「處理函式綁在哪個元素上」就用 `currentTarget`。輸入框沒有子元素，所以讀輸入值時 `target` 就是它自己。

```jsx 03-react/src/demos/33-target.jsx
import { useState } from 'react';

export default function TargetDemo() {
  const [info, setInfo] = useState('尚未點');

  const handleClick = (event) => {
    setInfo(
      `type：${event.type}，target：${event.target.tagName}，currentTarget：${event.currentTarget.tagName}`,
    );
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={handleClick}
      >
        點這裡的 <strong className="underline">粗體字</strong> 或旁邊
      </button>
      <p className="mt-2">{info}</p>
    </section>
  );
}
```

點「粗體字」三個字，畫面顯示「type：click，target：STRONG，currentTarget：BUTTON」。點按鈕其他部分，顯示 target 是 BUTTON。

**解析**

- 參數 `event` 由 React 傳入，不必自己在 `onClick` 後面寫括號把事件塞進去。
- `tagName` 是元素的標籤名稱，HTML 元素會以大寫回傳。
- `currentTarget` 只在處理函式執行的當下有值，所以這個示範在 `setInfo` 前先把字串組好，不把事件物件留到之後再讀。
- 渲染的當下不會有事件，一定要等使用者操作才會執行處理函式。

## 參數與預設動作

有時處理函式需要事件以外的資料，例如這一列的 id；瀏覽器對表單也有預設動作，按下送出會整頁重新載入。兩件事都在處理函式裡處理。

- 要額外參數時，用箭頭函式包住呼叫，渲染時只建立函式、不執行它。
- `preventDefault` 取消這一次事件的預設動作，表單就不會整頁重載。

### 帶參數

每一顆按鈕對應一個名稱。處理函式收名稱，屬性上用箭頭函式把名稱傳進去。

**觀念**

`handlePick` 只負責把收到的名稱放進狀態。兩顆按鈕各寫 `onClick={() => handlePick('台北城市漫遊')}`。渲染時只是建立箭頭函式，`handlePick` 還沒執行，點下去才把字串交出去。

不要寫 `onClick={handlePick('台北城市漫遊')}`。那一行在渲染時就會執行並設定狀態，一樣會得到「Too many re-renders」，而且 `onClick` 拿到的是 `undefined`。

```jsx 03-react/src/demos/34-pick.jsx
import { useState } from 'react';

export default function PickDemo() {
  const [picked, setPicked] = useState('尚未選');

  const handlePick = (name) => {
    setPicked(name);
  };

  return (
    <section>
      <p>選到 {picked}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => handlePick('台北城市漫遊')}
        >
          台北城市漫遊
        </button>
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => handlePick('花蓮山海三日')}
        >
          花蓮山海三日
        </button>
      </div>
    </section>
  );
}
```

按下花蓮山海三日之後，上面一行是「選到 花蓮山海三日」。

**解析**

- 箭頭函式本身可以接收事件，這一則用不到，所以參數留空。真正要的名稱寫在箭頭函式裡面。
- `handlePick` 可以重用，差別只在每一顆按鈕交出去的字串。
- 名稱若來自陣列，把那一筆的欄位放進箭頭函式即可，每一列各自帶著自己的資料。
- 每次渲染都會建立新的箭頭函式，這是慣用寫法，不需要特地用 `useCallback` 包起來。

### preventDefault

表單送出時，瀏覽器預設會重新載入頁面。處理函式先取消這件事，再用狀態裡的值做事。

**觀念**

`handleSubmit` 收到事件物件後，第一行就呼叫 `preventDefault`，接著把名稱寫進畫面下方的訊息。網址列不會多出問號，頁面也不會重新載入。

輸入框在這一則先用受控的寫法：欄位顯示的值由狀態決定，每次輸入就用 `onChange` 更新狀態。各種欄位的寫法留到「表單欄位」一節。

```jsx 03-react/src/demos/35-prevent.jsx
import { useState } from 'react';

export default function PreventDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('送出 ' + name);
  };

  return (
    <form onSubmit={handleSubmit} className="grid max-w-sm gap-3">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="rounded border px-2 py-1"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出
      </button>
      <p>{message}</p>
    </form>
  );
}
```

按下送出，訊息變成「送出 台北城市漫遊」。網址沒有變，頁面沒有重新載入。

**解析**

- `onSubmit` 綁在 `<form>` 上，不綁在按鈕上。在輸入框按 Enter 時同樣會執行這個函式。
- 沒有 `preventDefault` 時，瀏覽器會以預設方式送出並重新載入，頁面上的狀態會跟著消失。
- 按鈕的 `type="submit"` 只是用來觸發表單，不是第二個送出邏輯。
- 訊息來自狀態。不要在送出時直接去改某個段落的文字內容。

{% note info %}
**React 19 的 form action**
React 19 的 `<form action={函式}>` 是另一種送出寫法：React 會自動取消預設動作，並把欄位內容交給函式。這門課的專案用 `onSubmit` 搭配狀態；`action` 的寫法見 {% post_link lokiTech-15day-10-react-advanced %} 的選讀「表單 Actions」。
{% endnote %}

# 列表與表單

清單用 `map` 把陣列轉成一組元素，並要為每個元素給穩定的 `key`；表單則把欄位的值放進狀態，讓輸入與畫面讀的是同一份資料。這一章先看列表，再看表單。

## 列表

陣列的轉換在 JavaScript 裡完成，JSX 只負責把結果放進畫面。`filter` 與 `map` 可以串在一起：先留下符合條件的，再變成元素。

**一覽**

- `map`：把陣列的每一筆轉成一個元素，長度與原陣列相同。
- `filter`：只留下條件為真的筆，不改原陣列。
- `key`：幫助 React 認出「這一個還是原來的那一筆」，每個兄弟元素都要有，且不要用會隨插入、刪除而改變的 index。

### map

三條行程各有 id，`map` 回傳一列項目。這一則先把每一筆都畫出來，篩選放在下一則。

**觀念**

`tours` 寫在元件外面，因為這三筆資料不會變，元件每次渲染都讀到同一份陣列。`map` 的回呼回傳 `<li>`，清單的子節點就是這三個元素。

每一個 `<li>` 要有 `key`，用資料自己的 id。React 用它在重畫時認出哪一筆是哪一筆；少了 `key`，Console 會出現「Each child in a list should have a unique "key" prop」的警告。

```jsx 03-react/src/demos/36-map.jsx
const tours = [
  { id: 'taipei', title: '台北城市漫遊', price: 12800 },
  { id: 'hualien', title: '花蓮山海三日', price: 15900 },
  { id: 'kyoto', title: '京都紅葉散步', price: 42800 },
];

export default function MapDemo() {
  return (
    <ul className="grid gap-2">
      {tours.map((item) => (
        <li
          key={item.id}
          className="rounded border border-stone-200 bg-white px-3 py-2"
        >
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

畫面是三列：台北城市漫遊 12800、花蓮山海三日 15900、京都紅葉散步 42800，每一列都是白底邊框。

**解析**

- `map` 寫在花括號裡，因為它的結果是一組元素。
- 回呼的參數 `item` 是陣列裡的一個物件，標題與價格從欄位讀取。
- `key` 要寫在 `map` 直接回傳的那個元素上。寫在更裡面的標籤，React 對不到這一層的兄弟。
- 箭頭函式若改用大括號寫法，就必須自己寫 `return`；忘了寫，每一筆都是 `undefined`，畫面什麼都不會出現。
- 陣列是空的時候，`map` 得到空陣列，`ul` 裡就沒有 `li`。

### filter

先留下價格低於 20000 的行程，再交給 `map`，畫面上就不會出現京都紅葉散步。篩選寫在 JavaScript，不寫成「先全部畫出來再用 CSS 藏起來」。

**觀念**

`filter` 回傳新陣列，原本的 `tours` 仍是三筆。後面的 `map` 只走訪留下的那些。

篩選的結果 `visible` 每次渲染時重新算，不需要放進狀態，因為它完全由 `tours` 與條件決定；能由現有資料算出來的值，就不要另外存一份。

```jsx 03-react/src/demos/37-filter.jsx
const tours = [
  { id: 'taipei', title: '台北城市漫遊', price: 12800 },
  { id: 'hualien', title: '花蓮山海三日', price: 15900 },
  { id: 'kyoto', title: '京都紅葉散步', price: 42800 },
];

export default function FilterDemo() {
  const visible = tours.filter((item) => item.price < 20000);

  return (
    <ul className="grid gap-2">
      {visible.map((item) => (
        <li key={item.id}>
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

畫面兩列：台北城市漫遊 12800、花蓮山海三日 15900。京都紅葉散步仍在原陣列裡，沒有進 `visible`。

**解析**

- 條件為真才留下。京都紅葉散步的價格是 42800，所以不在新陣列裡。
- 原陣列沒有被改掉，條件放寬時京都紅葉散步就會回來。
- `key` 仍用行程 id。篩選之後花蓮山海三日變成第二列，但它的 id 沒變，React 仍認得它。

### 空清單

篩選之後可能一筆都不剩。這時要另外回傳一句說明，不要留下一個沒有項目、也沒有解釋的空 `<ul>`。

**觀念**

這一則的條件是價格小於 0，沒有任何行程符合，所以 `visible` 是空陣列。長度是 0 時提早 return 一句說明，有資料才走 `map`。空陣列是正常結果，不是錯誤；之後用 fetch 讀資料時，讀取失敗另外用狀態區分。

```jsx 03-react/src/demos/38-empty.jsx
const tours = [
  { id: 'taipei', title: '台北城市漫遊', price: 12800 },
  { id: 'hualien', title: '花蓮山海三日', price: 15900 },
  { id: 'kyoto', title: '京都紅葉散步', price: 42800 },
];

export default function EmptyDemo() {
  const visible = tours.filter((item) => item.price < 0);

  if (visible.length === 0) {
    return <p>沒有符合的行程。</p>;
  }

  return (
    <ul className="grid gap-2">
      {visible.map((item) => (
        <li key={item.id}>
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

畫面只有一行「沒有符合的行程。」

**解析**

- 用 `visible.length === 0` 判斷。不要寫 `visible &&`，空陣列也是真值，空的 `ul` 仍會畫出來。
- 也不要寫 `visible.length && …`，長度 0 會直接把 `0` 印在畫面上，這就是前面「左邊是 0 的陷阱」。
- 說明與清單是兩次不同的回傳，有資料時不會同時看到那句話。
- 條件放寬之後行程就回來，因為 `filter` 沒有改到原陣列。

### key

`key` 讓 React 把狀態對回「同一筆資料」，而不是「現在排在第幾列」。元件自己的狀態（例如輸入框裡打的字）會跟著 key 走。

**一覽**

好的 key 有三個條件：

- 在兄弟之間不重複，不同的清單可以用相同的 key。
- 不會變：同一筆資料每次渲染都是同一個 key。
- 來自資料本身：資料庫的 id；在本機新增的資料，建立時就用 `crypto.randomUUID()` 之類的方式產生 id。

要避免的寫法：

- 用 index：插入、刪除、重新排序時，index 會移位，狀態就接到別筆資料上。只有永遠不變動的靜態清單才適合。
- 在渲染時才產生，例如 `key={Math.random()}`：每次 key 都不同，整份清單被丟掉重建，輸入中的文字也會消失。

另外，`key` 不會成為 props，子元件讀不到；需要 id 時要另外傳一個 props。

**觀念**

`Row` 自己記得輸入框的文字，父層的清單用 `item.id` 當 key。在台北那一列打「甲」、花蓮那一列打「乙」，刪掉台北之後，花蓮那一列仍是「乙」。

若改成 `key={index}`：台北是 key 0、花蓮是 key 1，刪掉台北後花蓮變成 key 0。React 認為 key 0 還是原來那個 `Row`，於是花蓮那一列接到台北的「甲」，原本 key 1 的「乙」連同元件一起被丟掉。身份應該跟著 id，不跟著位置。

```jsx 03-react/src/demos/39-key.jsx
import { useState } from 'react';

function Row({ label }) {
  const [text, setText] = useState('');

  return (
    <li className="flex gap-2">
      <span>{label}</span>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="rounded border px-2"
      />
    </li>
  );
}

export default function KeyDemo() {
  const [rows, setRows] = useState([
    { id: 'taipei', label: '台北城市漫遊' },
    { id: 'hualien', label: '花蓮山海三日' },
  ]);

  const onRemove = () => {
    setRows((items) => items.filter((item) => item.id !== 'taipei'));
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onRemove}
      >
        刪掉台北城市漫遊
      </button>
      <ul className="mt-3 grid gap-2">
        {rows.map((item) => (
          <Row key={item.id} label={item.label} />
        ))}
      </ul>
    </section>
  );
}
```

兩個輸入框分別打「甲」與「乙」，按下刪掉台北城市漫遊之後，畫面只剩花蓮山海三日，輸入框裡仍是乙。

**解析**

- `key` 寫在 `Row` 上，因為 `Row` 才是 `map` 直接回傳的那個元素。
- id 是資料自己的代號，重新排序後花蓮山海三日仍是 `hualien`。
- `key` 不會出現在 DOM 的屬性上；要顯示編號時，另外把編號寫進文字。
- 一個 `map` 若要回傳多個並列元素，要用 `<Fragment key={…}>`，簡寫的 `<>` 不能放 key。

## 表單欄位

表單欄位是使用者輸入資料的地方，React 的作法是讓欄位顯示的內容永遠來自狀態：使用者一輸入，事件處理函式就把新值寫進狀態，畫面再依狀態重畫。這種由狀態決定內容的欄位稱為受控欄位（controlled），這一節依序看常見的五種欄位怎麼接上狀態。

**一覽**

- `value` 與 `onChange`：文字輸入框、多行文字與下拉選單都用它，新值從 `event.target.value` 讀。
- `checked` 與 `onChange`：核取方塊與單選鈕用它，勾選狀態是布林，核取方塊從 `event.target.checked` 讀。
- `defaultValue`：只給欄位一個起始值，之後由瀏覽器自己記住內容，這種欄位稱為非受控（uncontrolled）。核取方塊與單選鈕對應的是 `defaultChecked`。

受控與非受控不能混用：欄位一開始給了 `value`，就不能中途改成沒有，否則 React 會在 Console 警告。本課的表單一律使用受控寫法，因為畫面上其他地方也常要讀同一份資料。

### input

單行文字的值就是狀態裡的字串，每一次按鍵都換成新字串，輸入框顯示的永遠是狀態，不是瀏覽器自己記的那一份。

**觀念**

只給 `value` 而沒有 `onChange`，欄位就被鎖住，使用者打字不會有任何反應，React 也會在 Console 提醒。事件物件讀到的是輸入當下整個欄位的內容，不是只有剛按下的那個鍵。

```jsx 03-react/src/demos/40-input.jsx
import { useState } from 'react';

export default function InputDemo() {
  const [name, setName] = useState('');

  return (
    <section>
      <label className="grid max-w-sm gap-1">
        名稱
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p className="mt-3">目前：{name || '尚未填'}</p>
    </section>
  );
}
```

**解析**

- 還沒打字時，下面顯示「目前：尚未填」；輸入 `abc` 之後，每打一個字，輸入框與下面那一行就同步更新，因為兩處讀的是同一個 `name`。
- 空字串是合法的受控值。不要把 `undefined` 當 `value`，欄位會被當成非受控，之後第一次給值時又變成受控，React 就會警告。
- `name || '尚未填'` 在空字串時顯示提示。空字串與 0 都是假值，這裡的欄位只有文字，所以用或運算沒有問題。

{% note info %}
想給欄位起始內容時，受控寫法是把狀態的起始值設成那段文字。`defaultValue` 屬於非受控寫法，之後改它不會讓欄位變動。
{% endnote %}

### textarea

多行文字的寫法與單行輸入框相同，內容由狀態決定。原生 HTML 的 `<textarea>` 把內容寫在開始與結束標籤中間，React 改成用 `value` 屬性，才能和其他欄位一樣接上狀態。

**觀念**

換行也是字串的一部分，使用者按下的換行會留在狀態裡。標籤中間不要再塞一份預設文字。

```jsx 03-react/src/demos/41-area.jsx
import { useState } from 'react';

export default function AreaDemo() {
  const [note, setNote] = useState('第一行');

  return (
    <section className="grid max-w-sm gap-3">
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        rows={4}
        className="rounded border px-2 py-1"
      />
      <p>字數 {note.length}</p>
    </section>
  );
}
```

**解析**

- 打開時文字區裡是「第一行」，下面是「字數 3」；再打一個字，字數變成 4。
- `note.length` 在渲染時算出來，字數不必另存一個狀態。
- `rows` 只決定文字區的初始高度，與狀態無關。
- 要清空欄位，就把狀態設成空字串，不必操作 DOM。

### select

下拉選單的 `value` 要對到某個選項的 `value` 屬性，而不是畫面上看到的文字。畫面上寫「台北」，狀態裡存的是程式用的代碼 `taipei`。

**觀念**

選單的新值同樣從事件物件讀，讀到的是被選中選項的 `value` 屬性。如果狀態的值沒有對到任何選項，React 不會出錯，畫面只會顯示第一個選項，狀態卻還是原來的值，兩邊就不一致了，所以起始值要對到真的選項。

```jsx 03-react/src/demos/42-select.jsx
import { useState } from 'react';

export default function SelectDemo() {
  const [city, setCity] = useState('taipei');

  return (
    <section>
      <select
        value={city}
        onChange={(event) => setCity(event.target.value)}
        className="rounded border px-2 py-1"
      >
        <option value="taipei">台北</option>
        <option value="tainan">台南</option>
      </select>
      <p className="mt-3">代碼 {city}</p>
    </section>
  );
}
```

**解析**

- 打開時選單停在台北，下面顯示「代碼 taipei」；改選台南之後變成 `tainan`。
- 選取的狀態寫在 `select` 上，不必在每個選項上寫 `selected`。
- 選項的 `value` 用程式要用的代碼，顯示文字可以是中文。要多一個城市，就多一個 `option`，並確認 `value` 不重複。

### checkbox

核取方塊只有勾與不勾兩種結果，所以狀態是布林。它要綁的是 `checked` 而不是 `value`：`value` 是勾選時隨表單送出的字串，不會反映有沒有勾。

**觀念**

勾選時 `event.target.checked` 是 `true`，取消時是 `false`，把它直接存進狀態即可。畫面上的文字由同一個布林決定，不必再存一份文字狀態。

```jsx 03-react/src/demos/43-check.jsx
import { useState } from 'react';

export default function CheckDemo() {
  const [gift, setGift] = useState(false);

  return (
    <section>
      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={gift}
          onChange={(event) => setGift(event.target.checked)}
        />
        加早餐
      </label>
      <p className="mt-3">{gift ? '要早餐' : '不含早餐'}</p>
    </section>
  );
}
```

**解析**

- 一開始顯示「不含早餐」；勾起來變成「要早餐」，再點一次回到「不含早餐」。
- `checked` 必須是布林，不要放字串。
- `label` 包住輸入框時，點文字也會切換勾選，不必另外綁 id。

### radio

單選鈕是一組選項裡只能選一個，所以整組共用一份狀態。每一顆的 `checked` 是「狀態是否等於我的值」，點任何一顆，就把狀態設成那一顆的值。

**觀念**

同一組單選鈕要寫相同的 `name`，瀏覽器才會把它們視為一組，鍵盤的方向鍵也才能在組內切換。真正決定哪一顆被選中的，仍然是 React 的狀態。

```jsx 03-react/src/demos/44-radio.jsx
import { useState } from 'react';

export default function RadioDemo() {
  const [unit, setUnit] = useState('person');

  return (
    <fieldset>
      <label className="mr-4">
        <input
          type="radio"
          name="unit"
          checked={unit === 'person'}
          onChange={() => setUnit('person')}
        />
        人
      </label>
      <label>
        <input
          type="radio"
          name="unit"
          checked={unit === 'day'}
          onChange={() => setUnit('day')}
        />
        天
      </label>
      <p className="mt-3">單位 {unit}</p>
    </fieldset>
  );
}
```

**解析**

- 打開時「人」被選中，下面顯示「單位 person」；點「天」之後變成 `day`，「人」不再被選中。
- 兩顆的 `checked` 都由同一個 `unit` 算出來，所以不可能同時為真。
- 每一顆的 `onChange` 直接寫入固定的值，不必讀 `event.target.value`。要增加選項，就多一顆並比對新的字串。

## 送出表單

欄位多了以後，把它們收進同一個物件，比每個欄位各開一個狀態好管理。送出時，狀態物件就是要用的資料，只要在表單的送出事件裡先取消預設動作，再使用這份物件。

### 多欄位物件

物件的每個鍵對應一個欄位，輸入框的 `name` 寫成鍵名，一個共用的 `handleChange` 就能服務所有輸入框。

**觀念**

更新時展開舊物件，再用計算屬性（用變數的值當鍵名的寫法）蓋掉被改的那一鍵，其他鍵保持不變，這與先前的物件不可變更新是同一件事。價格這一例先當字串存，要做算術時才轉成數字；若每打一個字就轉，使用者清空欄位時空字串會變成 0，反而刪不乾淨。

```jsx 03-react/src/demos/45-fields.jsx
import { useState } from 'react';

export default function FieldsDemo() {
  const [form, setForm] = useState({ name: '', price: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="grid max-w-sm gap-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="名稱"
        className="rounded border px-2 py-1"
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="價格"
        className="rounded border px-2 py-1"
      />
      <p>
        {form.name || '未填'} {form.price}
      </p>
    </section>
  );
}
```

**解析**

- 名稱欄打 `abc`、價格欄打 `100`，下面一行變成「abc 100」；名稱沒填時顯示「未填」。
- 輸入框的 `name` 必須與狀態物件的鍵相同，寫錯會在物件裡多出一個畫面讀不到的鍵。
- `[name]` 用變數的值當鍵，不是字面上的 `"name"`。
- 展開放前面、新鍵放後面，另一個欄位才不會被蓋掉。

### submit

表單的送出由 `<form>` 的送出事件處理。按下 `type="submit"` 的按鈕，或在輸入框按 Enter，都會觸發它，瀏覽器預設會重新載入頁面，所以處理函式第一行要先取消預設動作。

**觀念**

送出時不必再用 DOM 查詢輸入框的內容，狀態物件已經有完整資料。處理函式讀到的是這一次事件當下的快照，送出只讀一次，這樣就夠用。這一例只把結果顯示在畫面上，把資料送到伺服器的做法留到後面的資料章節。

```jsx 03-react/src/demos/46-submit.jsx
import { useState } from 'react';

export default function SubmitDemo() {
  const [form, setForm] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(form.name + ' ' + form.price);
  };

  return (
    <form onSubmit={handleSubmit} className="grid max-w-sm gap-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="名稱"
        className="rounded border px-2 py-1"
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="價格"
        className="rounded border px-2 py-1"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出
      </button>
      <p>{message}</p>
    </form>
  );
}
```

**解析**

- 名稱填 `abc`、價格填 `100`，按下送出，下面顯示「abc 100」，網址與頁面都沒有重載。
- 輸入的過程中 `message` 不會變，它只在送出時更新。
- 若沒有 `preventDefault`，頁面重載，狀態會全部重來，訊息也留不住。

{% note info %}
React 19 另外提供把函式交給 `<form action>` 的作法，送出進行中的狀態也能由 Hook 讀到。這屬於選讀內容，見 {% post_link lokiTech-15day-10-react-advanced %} 的「選讀：表單 Actions」。本課主線用 `onSubmit`，router 章節還會看到另一種由 `Form` 交給路由處理的送出方式。
{% endnote %}

### 選讀：useId

同一個元件在頁面上出現兩次時，寫死的 `id` 會重複，點標籤就會聚焦到第一個同 id 的輸入框。`useId` 為每個元件實例產生各自獨立的字串，專門給 `htmlFor`、`aria-describedby` 這類無障礙屬性接線。

**觀念**

每呼叫一次 `useId` 得到一個字串，需要幾個 id 就呼叫幾次，而且一律寫在元件最上層，不能放進迴圈或條件。它不是用來當列表的 `key`，`key` 要用資料本身的識別值。字串的格式會隨版本改變，程式不要依賴它長什麼樣子。

```jsx
/**
 * 產生這個元件實例專用的 id。同一頁有兩份元件時不會重複。
 * @returns {string} id
 *   id：穩定字串，接到標籤的 htmlFor 與輸入框的 id
 */
const id = useId();
```

```jsx 03-react/src/demos/47-useid.jsx
import { useId, useState } from 'react';

export default function UseIdDemo() {
  const nameId = useId();
  const priceId = useId();
  const hintId = useId();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  return (
    <form className="grid max-w-sm gap-3">
      <div>
        <label htmlFor={nameId}>名稱</label>
        <input
          id={nameId}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 block w-full rounded border px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor={priceId}>價格</label>
        <input
          id={priceId}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          aria-describedby={hintId}
          className="mt-1 block w-full rounded border px-2 py-1"
        />
        <p id={hintId} className="mt-1 text-sm text-stone-600">
          只填數字，不含貨幣符號
        </p>
      </div>
    </form>
  );
}
```

**解析**

- 點「名稱」兩個字，焦點進到第一個輸入框；點「價格」則進到第二個。標籤與輸入框靠 `htmlFor` 與 `id` 對上，兩邊必須相同。
- `hintId` 讓提示文字與價格欄關聯：輔助科技（如螢幕閱讀器）進到價格欄時，會一併唸出提示。
- 三次呼叫得到三個不同的 id，不要把同一個 id 接到兩個元素。
- 結果在元件的生命期間保持穩定，不需要放進狀態。

# 回家作業

這份作業只用必教內容，資料取自專案的行程清單，題目依序累加：前一題的畫面就是後一題的基礎。課堂上不會批改，也不講解；每一題都附上完成後該看到的結果，可以自己對照。做完或卡住時，再看練習 repo 根目錄 `homework/09-react-basics/` 裡的標準答案。

## 起始檔

起始檔在練習專案的 `03-react/src/homework/09-homework.jsx`，裡面已經有八筆行程資料和一個空的元件。在練習專案的選單裡切到「09 回家作業」就能看到。

```jsx 03-react/src/homework/09-homework.jsx
const tours = [
  { id: 'taipei-beitou', title: '台北大稻埕與北投溫泉三日', region: '台北', theme: '城市', days: 3, price: 18600 },
  { id: 'keelung-jiufen', title: '基隆北海岸與九份兩日', region: '基隆', theme: '海岸', days: 2, price: 9200 },
  { id: 'hualien-taroko', title: '花蓮太魯閣與七星潭四日', region: '花蓮', theme: '山海', days: 4, price: 26800 },
  { id: 'taitung-chishang', title: '台東池上與成功海岸三日', region: '台東', theme: '山海', days: 3, price: 21400 },
  { id: 'tainan-anping', title: '台南府城與安平兩日', region: '台南', theme: '古都', days: 2, price: 8800 },
  { id: 'kaohsiung-qijin', title: '高雄港都與旗津三日', region: '高雄', theme: '城市', days: 3, price: 14200 },
  { id: 'kinmen-villages', title: '金門聚落與戰地三日', region: '金門', theme: '離島', days: 3, price: 16800 },
  { id: 'kyoto-nara', title: '京都嵐山、伏見與奈良五日', region: '京都', theme: '日本', days: 5, price: 52800 },
];

export default function Homework09() {
  return <p>共 {tours.length} 筆行程，在這裡開始寫</p>;
}
```

## 題目

### 題目一：行程卡片

寫一個接收標題、天數與價格的元件，把八筆行程各畫成一張卡片，每張卡片要有穩定的 key。

完成後畫面有八張卡片，第一張顯示「台北大稻埕與北投溫泉三日」、3 天、NT$18600。

### 題目二：主題篩選

加上一排主題按鈕（全部、城市、山海、海岸、古都、離島、日本），點擊後只顯示該主題的卡片。沒有符合的行程時顯示「找不到符合的行程」。目前選到的主題放在狀態裡。

完成後點「城市」只剩台北與高雄兩張，點「全部」回到八張，目前選到的按鈕要有不同的外觀。

### 題目三：收藏

每張卡片加一個「收藏」按鈕，點一下切換已收藏與未收藏，畫面上方顯示「已收藏 N 筆」。收藏的行程編號放在狀態裡，更新時不能直接修改原本的陣列。

完成後收藏兩張，數字是 2；切換主題再切回來，這兩張仍顯示已收藏。

### 題目四：關鍵字搜尋

加一個搜尋欄，輸入的字要由狀態控制，標題含有這些字的行程才顯示。搜尋要和主題篩選一起作用。

完成後在「山海」下輸入「花蓮」只剩一張；清空搜尋欄會回到該主題的全部行程。

### 題目五：報名表單

做一個報名表單，欄位是姓名與人數，兩個欄位都由狀態控制。送出時不要換頁，把「姓名報名 N 人」加進一份報名清單並顯示在表單下方，然後清空欄位。姓名空白時不能送出。

完成後連續報名兩次，清單有兩筆；姓名只打空白按送出，清單不會多出一筆。

# 本篇重點回顧

選讀的部分是「選讀：用 hash 做示範選單」、「選讀：工具鏈」、「選讀：模組」與「選讀：useId」，其餘為主線。

- React 是用函式描述畫面的函式庫，專案用 Vite 建立，範本再加上 React Compiler 自動處理記憶。
- JSX 的花括號放表達式，屬性名稱用駝峰如 `className`，多個兄弟元素又不想多包一層時用 Fragment。
- 條件渲染整塊換畫面用提早 return 或三元，多畫一塊用 `&&` 且左邊要是布林，要留下 0 時補預設字改用空值合併。
- 資料單向由父層用 props 傳給子層，子層要改資料時呼叫父層傳下來的函式，狀態放在用得到它的最近共同父層。
- 元件是回傳畫面的函式，props 用解構取值並可設預設值，標籤中間的內容由 `children` 接收。
- `useState` 的狀態是快照，依賴前一個值時用更新函式，同一個事件裡的多次設定合併成一次渲染，陣列與物件都要交一份新的值。
- 事件用 `onClick` 這類屬性綁定，要帶參數就包一層箭頭函式，表單送出前要取消預設動作。
- 列表用 map 畫出並給穩定的 `key`，表單欄位用受控寫法，讓輸入與畫面讀同一份狀態。

# 專有名詞中英對照

## 認識 React

- 框架（framework）
- 命令式（imperative）
- 宣告式（declarative）
- 重排（reflow）
- 重繪（repaint）
- 漸進式框架（progressive framework）
- 單檔元件（Single-File Component）
- 模板（template）
- 伺服器端渲染（server-side rendering）
- 函式庫（library）
- 使用者介面（user interface）
- 單頁應用（Single Page Application、SPA）
- 元件化（componentization）
- 元件（component）

## 建立專案

- 專案範本（project template）
- 開發伺服器（development server）
- 打包器（bundler）
- 專案產生器（project generator）
- 依賴（dependency）
- 熱更新（Hot Module Replacement、HMR）
- JavaScript 專案設定（jsconfig.json）
- 記憶（memoization）
- hash（URL hash）
- 瀏覽器歷史（history）
- 掛載（mount）
- 函式元件（function component）
- 保留字（reserved word）
- 嚴格模式（StrictMode）
- 不純（impure）

## JSX

- 表達式（expression）
- 敘述（statement）
- 駝峰（camelCase）
- 三元運算子（ternary operator）
- 行內樣式（inline style）
- 條件渲染（conditional rendering）
- 提早 return（early return）
- 邏輯運算子（logical operator）
- 短路求值（short-circuit evaluation）
- 假值（falsy value）
- 空值合併（nullish coalescing）

## 單向資料流

- 單向資料流（one-way data flow）
- 屬性（props）
- 父層（parent component）
- 子層（child component）
- 元件樹（component tree）
- 渲染（render）

## 元件

- 模組（module）
- 匯出（export）
- 匯入（import）
- 預設匯出（default export）
- 具名匯出（named export）
- 解構（destructuring）
- 預設值（default value）
- 唯讀（read-only）
- 版面元件（layout component）
- 箭頭函式（arrow function）

## 狀態

- 狀態（state）
- 快照（snapshot）
- 設定函式（setter function）
- 提交（commit）
- 展開（spread syntax）
- 更新函式（updater function）
- 純函式（pure function）
- 批次更新（batching）
- Hooks 規則（Rules of Hooks）
- 不可變更新（immutable update）
- 巢狀物件（nested object）

## 事件

- 事件處理函式（event handler）
- 事件物件（event object）
- 預設動作（default action）

## 列表與表單

- 列表（list）
- 表單（form）
- 空清單（empty list）
- 受控欄位（controlled component）
- 多行文字（textarea）
- 下拉選單（select）
- 核取方塊（checkbox）
- 單選鈕（radio button）
- 非受控欄位（uncontrolled component）
- 無障礙（accessibility）
- 輔助科技（assistive technology）
