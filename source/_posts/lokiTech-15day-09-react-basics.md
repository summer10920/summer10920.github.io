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

React 是在瀏覽器裡用函式描述畫面的函式庫。資料一變，同一個函式再跑一次，畫面跟著換。這一篇先看它是什麼、為什麼用它，再寫 JSX、元件、狀態、事件、列表與表單。

<!-- more -->

# 認識 React

本講義的 React 是 19.3，React Router 是 8，Vite 是 8。元件與 Hooks 對照 [react.dev](https://react.dev)，路由對照 [reactrouter.com](https://reactrouter.com)。查到要從 `react-router-dom` 引入，或寫成 class 元件，那是舊版，這門課不跟。

這一章先看框架為何存在，以及這門課為什麼選 React。

## 為何使用框架

沒有框架（framework）時，你要自己驅動 DOM，以及跟畫面連動的瀏覽器 API。用了框架，你改寫元件與 JSX 這種描述畫面的程式；框架當中間的代理人，替你跟瀏覽器溝通，所以更新 DOM 與相關的瀏覽器物件模型（Browser Object Model，BOM），對開發者比較有效率。

{% mermaid graph LR %}
  code["Your code<br/>JSX / components"] --> fw["Framework"]
  fw --> browser["Browser"]
  browser --> domNode["DOM"]
  browser --> bomNode["BOM"]
{% endmermaid %}

- 框架站在你的寫法和瀏覽器之間：你描述畫面，函式庫更新 DOM；瀏覽器 API 與 BOM 也透過這套模型來用，不必每一步都自己接上。
- 自己一步步指定要改哪個節點，叫做命令式（imperative）；只描述畫面現在該長什麼樣子，叫做宣告式（declarative）。
- 框架簡化的是你寫出來的控制流程；真正的畫面一變，瀏覽器仍會重排（reflow）與重繪（repaint）。

## 為何選擇 React

Vue、Angular、React 都能把狀態畫成畫面。差別在畫面寫在哪裡、邏輯跟著哪一種語法走，以及專案目錄要不要由工具先定好。這一節先把三套都看過，再說明這門課為什麼停在 React。

### Vue

Vue 的定位是漸進式框架（progressive framework）。同一套工具可以只嵌進既有頁面的一小塊，也可以長大成整份應用，範圍由你決定。

常見寫法是單檔元件（Single-File Component，SFC）。一個檔案裡放下這塊畫面的模板、腳本與樣式；使用者看到的結構寫在模板（template）裡，條件與清單用模板自己的指令（template directive），而不是一般的 JavaScript 陳述。官方的路由與狀態也沿同一套文件與套件走，專案往下接時仍在 Vue 的約定裡。

核心以外，往下做完整專案時還常再接這些套件。

- Vue Router 負責網址與頁面的對應。
- Pinia 管理多個元件共用的狀態。舊專案裡還可能看到 Vuex。
- 要做成全端應用時，常改接 Nuxt。
- 介面元件庫（component library）常見 Element Plus 與 Vuetify。

### Angular

Angular 把模板、路由、表單和專案結構收得更完整，一開始就用同一套框架約定把這些擺在一起。新專案通常依這套約定長出來，目錄的形狀在產生器裡就定了。

畫面一樣寫在模板裡。路由怎麼對應頁面、表單怎麼綁資料、資料夾怎麼分層，都有框架自己的做法。模板和這些約定讓同一個專案裡的寫法穩定；要另外熟悉的，是那一種模板語法與目錄。

核心以外，就業與實務往下還常再接這些套件。

- 響應式程式庫（RxJS）處理非同步與資料流，寫 Angular 時幾乎都會碰到。
- 大型應用的共用狀態常再接 NgRx。
- 介面元件庫常見 Angular Material。
- 職缺與周邊生態常要求會 TypeScript。

### React

React 裡，元件是一支函式。這塊畫面的判斷、事件與要顯示的內容留在 JavaScript，標記用 JSX 寫進同一支函式的回傳。

它不另外準備一套模板語言，也不規定專案目錄該怎麼切。檔案怎麼分、路由與共用狀態日後接哪一套，函式庫不過問。你沿用已經會的 JavaScript，再多學 JSX 這一種寫法。

核心以外，往下常再接這些套件。

- React Router 負責換頁。本課後面會教。
- 全端與伺服器端渲染（server-side rendering，SSR）常見 Next.js。
- 共用狀態常見 Zustand 與 Redux Toolkit。
- 介面元件庫常見 MUI 與 Ant Design。

### 這門課的取捨

這門課選 React，是因為它留在 JavaScript 旁邊，寫畫面的自由仍是寫 JS 的自由。元件怎麼判斷、資料怎麼變成畫面，都還是一般的 JavaScript 與 JSX，而不是改去學一套模板語言。

準確地說，React 是描述使用者介面的函式庫（library）。路由與共用狀態不在核心裡，要用再接上；這門課後面會用到 React Router。開發與打包交給 Vite，外觀交給 Tailwind，畫面與狀態留給 React，三件分開。把路由、資料與伺服器端渲染綁成一套的全端框架，例如 Next.js，是更後面的題目。官方的元件與 Hooks 說明在 [react.dev](https://react.dev)，和課堂上的函式元件是同一套寫法。

代價也寫在前面。專案骨架要自己定：檔案怎麼分、路由與共用狀態接哪一套，用到的那一天再補。JavaScript 要夠熟，因為畫面以外的流程仍是一般的 JS 在接。

{% note info %}
**小技巧：函式庫還是框架**
React 的核心是函式庫，負責描述畫面。路由、共用狀態與專案目錄要另外接，所以它不像把模板、路由、表單一次配齊的框架。日常對話仍常叫它框架。兩種說法指的是同一套工具，差在有沒有把周邊套件算進去。
{% endnote %}

## 什麼是 React

React 由 Meta（前身 Facebook）主導，是用來描述使用者介面（user interface）的 JavaScript 函式庫。你用函式寫出畫面現在的長相，瀏覽器裡的節點由另一個套件掛上去。這一節分開看它站在哪一層、頁面怎麼由元件拼成、JSX 為什麼要先編譯，以及兩個套件各管什麼。

### 定位

React 專注在 View 層，也就是使用者看得到、點得到的那一層。標題文字、清單有幾列、按鈕現在能不能按，都是這一層要回答的事。

資料庫、帳號驗證與伺服器不在這一套裡。那些程式把資料準備好；React 負責把已經到手的資料畫成畫面。它不取代後端，也不規定資料存在哪裡。

做出來的應用常常是單頁應用（Single Page Application，SPA）。瀏覽器先載入一份 `index.html`，裡面留一個掛載點 `#root`。之後換畫面靠 JavaScript 更新這一塊，不必整頁重新載入。掛載點怎麼接、入口檔怎麼把元件放進去，下一章建立專案會對著實際檔案做一次。

### 元件化

做法是元件化（component-based）。標題、清單、表單各自是一塊元件（component），每塊用函式描述自己現在的長相，頁面再由這些區塊拼起來。

同一種清單可以出現在不同位置，因為它是同一支函式。你改的是這支函式回傳的樣子，用到它的地方跟著那一支走。判斷與事件可以寫在元件裡面；資料庫連線與登入流程仍留在這套畫面函式庫外面。

### JSX 與編譯

直接用 JavaScript 建立每個節點，參數會拉得很長，畫面結構也不容易一眼看完。JSX 是語法糖（syntactic sugar）：在函式裡寫接近 HTML 的標記，讀的時候對得上畫面上的層次。

瀏覽器不執行 JSX。開發時由 Vite 編成一般的 JavaScript，瀏覽器跑的是編成後的程式。正式站載入的同樣是建置過的結果，不是編輯器裡的 JSX 原文。標記怎麼寫、花括號裡能放什麼，後面的 JSX 章再拆開練。

### react 與 react-dom

在瀏覽器裡，React 分成兩個套件。寫元件的那一半，和把畫面放進頁面的那一半，不在同一個套件裡。

- `react` 管元件、狀態與 Hooks。你宣告的函式，以及讓函式記住資料的工具，從這個套件來。
- `react-dom` 管掛載。它把上一項描述好的畫面，放進瀏覽器的 DOM。

少了前者，沒有元件與狀態可寫。少了後者，描述好的畫面不會出現在頁面上。函式怎麼掛上去、第一個元件回傳什麼，下一章建立專案再對著入口檔看。

# 建立專案

上一階段已經裝好 Node、nvs 與 pnpm。這一章先在練習倉庫根目錄用 Vite 做出一個 React 試做專案，確認畫面跑得起來，再切回課堂準備好的 `03-react`。後面的元件、檢查工具與資料流，都在 `03-react` 裡看。

## 用 Vite 建立 React 專案

工具鏈上一階段已經能跑，這裡不必重裝。上一階段的 Vite 範本是純 HTML、CSS、JavaScript；這次改選 React，產生器會多放 `main.jsx`、`App.jsx` 與轉換 JSX 的插件。先在 `sandbox` 走完建立、安裝、看檔、啟動，再換到 `03-react`，讓大家的練習環境一致。

### 認識 React 範本

**Vite** 同時是開發伺服器與打包器，上一階段已經用它看過 Tailwind。React 專案仍由它啟動：開發時瀏覽器跟它要目前用到的模組，JSX 會先編成一般 JavaScript。上線另跑建置，把用到的模組打包到成品資料夾。

範本用互動選單或一行參數都可以。選單裡 Framework 選 React，Variant 選 JavaScript。等價的參數是 `--template react`。Variant 選 TypeScript 時，範本名稱是 `react-ts`，檔案會變成 `.tsx`。這門課用 JavaScript 那一項。

```bash
pnpm dev     # 開發伺服器；終端機印出的 Local 多半是 http://localhost:5173/
pnpm build   # 打包、壓縮，輸出到 dist/；直接雙擊 HTML 不會經過 Vite，JSX 也不會被轉換
```

### 手動建立專案（sandbox）

在 `studiesAdvanced` 倉庫根目錄自己做出一份能跑的 React 專案。它和課堂的 `03-react` 分開，做壞了把整個 `sandbox` 資料夾刪掉重建即可。後面的示範留在 `03-react`。

```bash
# sandbox：試做專案，建置結果在 sandbox/dist/
# 03-react：課堂範例，和 sandbox 分開；正式練習一律 cd 03-react
```

{% note info %}
**已安裝過可跳過**
Node、nvs、pnpm 上一階段已裝好，這裡不要重裝。若 `03-react` 已經能開開發伺服器，而且你做過一次 Vite 的 React 專案，可以略過 sandbox，從「改用 03-react」的安裝開始。第一次做 React 專案，請把下面四步走完。
{% endnote %}

#### 步驟 1：建立專案

在 VS Code 開一個新的終端機，它會停在倉庫根目錄（Windows 多半是 PowerShell，macOS 是 zsh，後面的指令兩邊相同）。先確認旁邊看得到 `03-react` 資料夾，再下建立指令。

這是課堂上建立 React 專案的指令：請 pnpm 下載 Vite 官方的專案產生器，用 React 加 JavaScript 的範本，在目前位置建立 `sandbox` 資料夾。先看完整指令，再看拆開的註解：

```bash
pnpm create vite@latest sandbox -- --template react
```

```bash
pnpm create          # 執行「專案產生器」：暫時下載 create-xxx 套件來跑，用完不留在電腦上
  vite@latest        # 產生器是 create-vite，@latest 表示用最新版
  sandbox            # 專案資料夾名稱，會建在目前所在的倉庫根目錄
  --                 # 分隔線：後面的參數原封不動交給產生器（npm 必須寫，pnpm 寫了也沒關係）
  --template react   # 範本：react 是 React + JavaScript；react-ts 是 TypeScript，這門課不選
```

就算寫了 `--template react`，終端機多半還會再問兩題。Which linter to use 選 ESLint。本課一律選 ESLint。選完之後，產生器會拿掉範本裡的 `oxlint` 套件與 `.oxlintrc.json`，改加入 `eslint`、`@eslint/js`、`eslint-plugin-react-hooks`、`eslint-plugin-react-refresh`、`globals`，寫入 `eslint.config.js`，並把 `scripts.lint` 改成 `eslint .`。sandbox 先認得這份骨架；規則怎麼寫、怎麼跟 Prettier 搭配，留到後面的工具鏈，對照 `03-react`。Install with pnpm and start now 選 No，安裝與啟動留給下面兩步，你才看得到指令自己跑完。

{% note success %}
**試試：不指定範本**
也可以拿掉範本參數，改用互動選單建立另一個資料夾。畫面會一步步問你框架（Framework）與語言（Variant），用方向鍵選、Enter 確定。Framework 選 React，Variant 選 JavaScript，會得到和上面一樣的結果。Variant 還有 TypeScript、JavaScript + React Compiler、RSC，以及名稱後面帶箭頭、會改跑別的指令的項目，那些先不要選。Which linter to use 同樣選 ESLint，是否立刻安裝仍選 No。試完不需要的資料夾直接刪掉即可。

```bash
# 拿掉 --template，改走互動選單；sandbox2 是另一個資料夾
pnpm create vite@latest sandbox2
# Framework：React
# Variant：JavaScript
# Which linter to use：ESLint
# 完成後比較兩邊的 package.json：lint 都是 eslint .，並都有 eslint.config.js
```
{% endnote %}

#### 步驟 2：安裝依賴

產生器只負責放檔案，還沒有下載任何套件。進入資料夾，依選完 ESLint 之後的 `package.json` 安裝 React、Vite 與檢查套件。

```bash
cd sandbox     # 進入剛建立的專案資料夾
pnpm install   # 依 package.json 下載套件到 node_modules/
```

範本已經寫好 React、React DOM、Vite 與 `@vitejs/plugin-react`。選 ESLint 之後，同一份清單還會多出 `eslint`、`@eslint/js`、`eslint-plugin-react-hooks`、`eslint-plugin-react-refresh` 與 `globals`，`lint` 指令是 `eslint .`。這一步只是下載，不必再手動改版本。React 與 React DOM 要一起在；清單裡少一邊時，畫面畫不上去。

#### 步驟 3：認識檔案結構

安裝完先看檔，再啟動。HTML 幾乎是空的，真正的畫面在 `src/App.jsx`，`src/main.jsx` 負責把那個元件掛進頁面。

```bash
# sandbox/index.html      空頁面，只留 #root，腳本指向 /src/main.jsx
# sandbox/vite.config.js  plugins 裡有 react()，負責轉換 JSX
# sandbox/src/main.jsx    入口：createRoot 把 App 畫進 #root
# sandbox/src/App.jsx     畫面上那一塊元件；範本預設是標誌與計數按鈕
# sandbox/eslint.config.js  選 ESLint 後產生器寫入的檢查設定
# sandbox/package.json      依賴與 dev、build、lint 指令；lint 是 eslint .
```

對一下檢查器改過的片段。`react`、`react-dom`、`vite` 仍在同一份檔案裡，這裡只留你要核對的指令與套件。版本號以產生器當下寫入的為準，名稱要對得上。

```json sandbox/package.json
{
  "scripts": {
    "lint": "eslint ."
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0"
  }
}
```

頁面本體只有一個起點。腳本的 `type="module"` 讓這個檔可以用 `import` 讀別的檔，路徑以斜線開頭，表示這個專案的根目錄。

```html sandbox/index.html
<body>
  <div id="root"></div>
  <!-- 範本原本就有：main.jsx 會畫進 #root -->
  <script type="module" src="/src/main.jsx"></script>
</body>
```

入口盯著 `#root`，再把 `App` 畫進去。外面包的 `StrictMode` 是開發時的檢查，進到 `03-react` 之後會再看一次。下面依課堂排版補了分號，結構與產生器給的檔相同。

```jsx sandbox/src/main.jsx
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

設定檔裡要有 React 插件，瀏覽器才讀得懂 JSX。`defineConfig` 是 Vite 提供的設定包裝函式，從 `vite` 匯入。傳進去的物件就是這份 Vite 設定，下面的例子放的是 `plugins`。

```js sandbox/vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()], // 沒有這個插件，JSX 不會被轉換
});
```

{% note info %}
**包裝函式把設定包起來再匯出**
多數情況直接寫 `export default { … }` 也能跑。包一層主要是寫法統一，並讓編輯器較好給提示。
{% endnote %}

範本的 `App.jsx` 比較長，畫面上會是標誌和一顆計數按鈕。整份換成下面這樣，等一下才確定字是從這個檔來的。改完記得存檔。

```jsx sandbox/src/App.jsx
export default function App() {
  return <h1>React 有跑起來</h1>;
}
```

{% note info %}
**Tailwind 設定留在課堂專案**
sandbox 這一步只要跑起來，並對上 `eslint.config.js` 與 `lint` 指令。正式練習的完整設定在 `03-react`，sandbox 先認得產生器給的 ESLint 骨架。想在 sandbox 順便看到工具類別，可以照上一階段把 Tailwind 的 Vite 插件掛上，標題改成 `className="text-3xl font-bold text-teal-700"`，做完不必留著。
{% endnote %}

#### 步驟 4：啟動開發伺服器

在 `sandbox` 目錄啟動開發伺服器，終端機會印出 Local 網址，多半是 `http://localhost:5173/`。用 Chrome 打開，應看到「React 有跑起來」。

```bash
pnpm dev   # 日常開發；終端機印出的 Local 多半是 http://localhost:5173/
```

改 `App.jsx` 再存檔，畫面會跟著換。這叫熱更新（Hot Module Replacement，HMR）：開發伺服器換上你改過的那一塊。看完在終端機按 <kbd>Ctrl</kbd>+<kbd>C</kbd> 停掉。要產出上線用的檔案再執行：

```bash
pnpm build   # 輸出到 sandbox/dist/，是打包後的檔，不是正在編輯的 src/
```

建置結果放在輸出資料夾。之後日常開發仍用開發伺服器，要交靜態檔時才再跑建置。

### 改用 03-react 練習環境

試做專案確認三件事即可：選的是 React、看懂 `main.jsx` 與 `App.jsx`、`pnpm dev` 看得到自己寫的標題。後面每一則示範都在課堂專案。Tailwind 插件、入口 CSS、ESLint 與 Prettier 已經接好。正式練習一律進入 `03-react`。

在 VS Code 新開一個終端機（它會開在倉庫根目錄），再進入專案、安裝、啟動。若目前終端機還停在試做資料夾，先回到根目錄。sandbox 的開發伺服器若還開著，先在那個終端機按 <kbd>Ctrl</kbd>+<kbd>C</kbd>。

```bash
cd ..            # 若還停在 sandbox，先回到倉庫根目錄
cd 03-react      # 後面的示範都在這裡
pnpm install
pnpm dev
```

{% note info %}
**專案已經在手上**
`03-react` 是倉庫裡準備好的資料夾，用產生器重建會蓋掉課堂檔。Node、pnpm 與這個資料夾都已經能用時，終端機進入 `03-react`，執行 `pnpm install` 與 `pnpm dev` 即可。
{% endnote %}

同樣用終端機印出的 Local 網址開 Chrome。應看到一排示範按鈕，主區是編號 01。建置會把這個專案輸出到它自己的成品資料夾。套件清單要求的 Node 至少是 24；若安裝時抱怨版本，回到上一階段確認版本號。

```bash
# pnpm build 輸出到 03-react/dist/
# pnpm preview 看成品；pnpm lint 跑這一專案的 ESLint
# package.json 的 engines.node 是 >=24
node -v   # 安裝若抱怨版本，確認是 v24 開頭
```

依賴已經寫在 `package.json`，`pnpm install` 會裝上。React 與 React DOM 是 19，兩邊都在清單裡。Vite 是 8，`@vitejs/plugin-react` 是 6，JSX 由這個插件轉換。Tailwind 是 4，插件與入口 CSS 都接好了。

```bash
# dependencies：react、react-dom（19）
# devDependencies：vite 8、@vitejs/plugin-react 6
# Tailwind：tailwindcss 4、@tailwindcss/vite 4
# 檢查與排版：eslint、prettier、eslint-config-prettier
#   eslint-plugin-react-hooks、eslint-plugin-react-refresh、globals
```

Vite 設定同時留下 React 與 Tailwind 兩個插件。樣式從入口 CSS 引入。

```js 03-react/vite.config.js
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

```css 03-react/src/index.css
@import 'tailwindcss';

body {
  margin: 0;
  font-family: system-ui, 'PingFang TC', 'Microsoft JhengHei', sans-serif;
}
```

入口仍是 `index.html` 的 `#root` 與 `src/main.jsx`，和 sandbox 同一條路。課堂的 `App.jsx` 用一份清單切換後面的示範，按按鈕就換內容，網址不會變。掛載在下一節拆開看，檢查設定與那份清單在工具鏈。

## 元件與掛載

上一章把 React 放在用函式描述畫面的位置。進到 `03-react` 之後，你交給它的就是這樣一個函式：回傳這一塊現在的長相。狀態變了，React 再呼叫這個函式，用新的回傳換掉畫面上的那一塊。

- 元件是回傳畫面的函式。一塊標題、一列清單、一張表單，都可以各是一個元件。
- 渲染（render）是 React 呼叫元件、算出這一次的元素。提交（commit）才把差異寫進頁面上的節點。

### 函式元件

元件就是一個函式。名稱用大寫開頭，回傳你要的元素。React 呼叫它，把回傳的那棵元素畫進頁面。

**觀念**

函式名稱要大寫開頭，React 才把它當元件。回傳的標籤寫在函式裡，看起來像 HTML，實際上是 JavaScript 裡的 JSX。最外層只有一個父元素，裡面可以再放標題與段落。

直接寫 `class` 會跟 JavaScript 的類別撞名，所以外觀類別寫成 `className`。這一則只描述畫面，還沒有按鈕，也還沒有會變的資料。

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

- `export default` 把這個函式交給別的檔使用。一個檔案通常交出一個主要元件。
- 回傳外面的括號，是為了讓標籤可以分成多行寫。
- 父層是 `section`。裡面兩個標籤是它的子元素，所以這一次回傳仍是一棵樹。
- 標籤必須成對，或像輸入框那樣自己結束。少了結尾，轉換會失敗。

{% note info %}
**以前的寫法**
class 元件用 `this.state` 記資料。現在的文件與這門課都只寫函式元件。
{% endnote %}

{% note success %}
**換你試試：**
標題改成「你好，React」。下面那句留著，父層仍是同一個 section。
{% endnote %}

<details>
<summary>參考答案</summary>

回傳的文字改了，函式再跑時畫面就會換成新的標題。這一則還沒有按鈕，所以存檔後看畫面即可。

```jsx 03-react/src/demos/01-hello.jsx
export default function Hello() {
  return (
    <section>
      <h1 className="text-2xl font-bold">你好，React</h1>
      <p>這一段由元件回傳。</p>
    </section>
  );
}
```

</details>

### createRoot

瀏覽器先載入一份幾乎是空的 HTML。React 從指定的那個節點開始畫。開發時外面包一層嚴格模式，讓有問題的寫法更早出現。

**觀念**

HTML 只留一個空的 `div` 當起點。

`createRoot` 盯著這個節點，`render` 把元件畫進去。嚴格模式在開發時會多做檢查，你看到的畫面仍是元件的回傳。

嚴格模式在開發時可能讓元件函式多跑一次，用來提早抓到不純的渲染。正式建置不會因為它而多畫一層給使用者看。

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

畫面的最外層是 `App`。打開開發者工具，`#root` 裡面會出現元件產生的標籤。

**解析**

- `index.html` 沒有正文內容。正文由 React 畫進 `#root`。
- 腳本的 `type="module"` 讓這個檔可以用 `import` 讀別的檔。
- `createRoot` 的引數必須是頁面上真的有的那個節點。找不到就無法畫。
- `StrictMode` 只在開發時加強檢查。它不會變成使用者畫面上的一層外框。

{% note success %}
**換你試試：**
把 HTML 的標題改成「元件練習」。`#root` 與腳本那行留著。
{% endnote %}

<details>
<summary>參考答案</summary>

分頁標題來自 HTML 的 `title`，跟元件裡的標題是兩件事。

```diff 03-react/index.html
  // ...
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-     <title>React 練習</title>
+     <title>元件練習</title>
    </head>
    <body>
      // ...
```

</details>

## 工具鏈

`03-react` 裡 Vite 負責開發伺服器與打包，Tailwind 負責外觀的工具類別，ESLint 看 React 的規則，Prettier 只排版。四件事都寫在專案裡，不要寫進個人的使用者設定。這一節打開檢查、排版，以及最外層怎麼切換示範。

### ESLint

ESLint 看程式有沒有違反 React 的規則。Prettier 只負責空格、引號與分號。兩件事分開，避免同一行被兩套工具各改一次。你在 `03-react` 執行 `pnpm lint`，跑的就是這份設定。

{% note info %}
**檢查器選 ESLint**
`pnpm create vite` 問 Which linter to use 時，本課一律選 ESLint。sandbox 認的是產生器留下的骨架，`03-react` 的 `eslint.config.js` 再往下接 Prettier。同一個專案不要同時留兩套檢查器改同一支程式。
{% endnote %}

**觀念**

這份設定用 ESLint 的 flat config。檢查範圍是 JavaScript 與 JSX。`dist` 不檢查。React Hooks 的建議規則，以及 Vite 重新整理元件時要守的規則，都掛在這裡。

Prettier 的設定放在陣列最後，讓排版規則不要跟檢查規則打架。終端機用 `pnpm lint` 看結果。

這裡的 `defineConfig` 從 `eslint/config` 匯入。它和 Vite 的 `defineConfig` 同名，套件不同，是另一個函式。用途類似：把設定包起來再匯出。前面 `vite.config.js` 見過同名寫法，來源不同；這裡包的是 flat config，內容是陣列。

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

沒有錯誤時，指令結束、終端機不印問題清單。警告仍會印出來，但不會讓指令失敗。

**解析**

- `eslint-plugin-react-hooks` 會抓 Hooks 的呼叫順序。effect 的依賴若少寫，它會提出警告。
- 在 effect 裡同步呼叫設定狀態，這套規則會當成錯誤。那是下一篇才會碰到的寫法。
- `eslint-plugin-react-refresh` 避免一個檔案匯出的內容讓熱更新失效。
- `globals.browser` 讓 document 與 fetch 不會被當成未宣告變數。
- `eslint-config-prettier` 放最後，空格與引號才不會被 ESLint 再判一次錯。

{% note success %}
**換你試試：**
在專案資料夾執行 `pnpm lint`。起始程式應能通過。
{% endnote %}

<details>
<summary>參考答案</summary>

通過時不會列出錯誤。若某個示範少了依賴或改壞了 Hooks 的規則，同一支指令會指出檔名與行號。

```bash
pnpm lint
```

</details>

### Prettier

全班用同一套排版：兩個空格、要分號、JavaScript 用單引號。JSX 的屬性仍用雙引號，這是 Prettier 的預設。

**觀念**

設定只放專案裡的 `.prettierrc`。存檔時要排版，並讓 ESLint 能一併修可自動修的問題。這份編輯器設定放在專案的 `.vscode`，不要寫進個人的使用者設定。

規則跟專案走。不要在使用者的 `settings.json` 另外寫 `prettier.semi` 這一類鍵。

```json 03-react/.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

```json 03-react/.vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

存檔後，JavaScript 字串會是單引號，語句結尾有分號。JSX 屬性仍是雙引號。

**解析**

- `singleQuote` 只管 JavaScript 字串。標籤屬性維持雙引號，讀起來才跟 HTML 一致。
- `tabWidth` 是縮排幾個空格。這門課用 2。
- 存檔修 ESLint 用的是專案設定。別人 clone 同一份專案，會套到同一套。
- 排版問題不要寫進 ESLint 規則。空格與引號只交給 Prettier。

{% note success %}
**換你試試：**
在任一隻示範檔故意把字串改成雙引號，存檔。存完應回到單引號，分號還在。
{% endnote %}

<details>
<summary>參考答案</summary>

Prettier 會依 `.prettierrc` 把 JavaScript 字串改回單引號。不要為了這一點去改 ESLint。

```jsx 03-react/src/demos/03-expr.jsx
export default function ExprDemo() {
  const name = '筆';
  const price = 25;

  return (
    <section>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>兩支 {price * 2}</p>
    </section>
  );
}
```

</details>

### 示範清單

切換清單記著現在要看哪一個示範。狀態存的是編號，按鈕把編號換成另一個。網址不會變，換頁留到 React Router。

**觀念**

每一筆有編號、標題與元件。找到對上的那一筆之後，把元件放到變數 `View`，再用標籤把它畫出來。變數名稱要大寫開頭，React 才會把它當元件。

這一頁的狀態只負責切換。各示範自己的狀態在切走之後會卸掉，再點回來會重新開始。

```jsx 03-react/src/App.jsx
import { useState } from 'react';
import Hello from './demos/01-hello.jsx';
import FragmentDemo from './demos/02-fragment.jsx';
import ExprDemo from './demos/03-expr.jsx';
import StyleDemo from './demos/04-style.jsx';
import EarlyDemo from './demos/05-early.jsx';
import TernaryDemo from './demos/06-ternary.jsx';
import AndDemo from './demos/07-and.jsx';
import ZeroDemo from './demos/08-zero.jsx';
import DownDemo from './demos/09-down.jsx';
import TreeDemo from './demos/10-tree.jsx';
import PlaceDemo from './demos/11-place.jsx';
import CardDemo from './demos/12-card.jsx';
import BoardDemo from './demos/13-board.jsx';
import PropsDemo from './demos/14-props.jsx';
import DefaultsDemo from './demos/15-defaults.jsx';
import CallbackDemo from './demos/16-callback.jsx';
import ChildrenDemo from './demos/17-children.jsx';
import CountDemo from './demos/18-state.jsx';
import SnapshotDemo from './demos/19-snapshot.jsx';
import UpdaterDemo from './demos/20-updater.jsx';
import BatchDemo from './demos/21-batch.jsx';
import RulesDemo from './demos/22-rules.jsx';
import AddDemo from './demos/23-add.jsx';
import RemoveDemo from './demos/24-remove.jsx';
import EditDemo from './demos/25-edit.jsx';
import NestedDemo from './demos/26-nested.jsx';
import EventDemo from './demos/27-event.jsx';
import TargetDemo from './demos/28-target.jsx';
import PickDemo from './demos/29-pick.jsx';
import PreventDemo from './demos/30-prevent.jsx';
import MapDemo from './demos/31-map.jsx';
import FilterDemo from './demos/32-filter.jsx';
import KeyDemo from './demos/33-key.jsx';
import InputDemo from './demos/34-input.jsx';
import AreaDemo from './demos/35-area.jsx';
import SelectDemo from './demos/36-select.jsx';
import CheckDemo from './demos/37-check.jsx';
import RadioDemo from './demos/38-radio.jsx';
import FieldsDemo from './demos/39-fields.jsx';
import SubmitDemo from './demos/40-submit.jsx';
import ClassDemo from './demos/41-class.jsx';
import MultiDemo from './demos/42-multi.jsx';
import UseIdDemo from './demos/43-useid.jsx';
import ObjectDemo from './demos/44-object.jsx';
import EmptyDemo from './demos/45-empty.jsx';
import EffectMount from './demos/46-effect.jsx';
import DepsDemo from './demos/47-deps.jsx';
import TimerDemo from './demos/48-timer.jsx';
import LoopDemo from './demos/49-loop.jsx';
import LintDemo from './demos/50-lint.jsx';
import LoadDemo from './demos/51-load.jsx';
import EmptyLoadDemo from './demos/52-empty.jsx';
import AbortDemo from './demos/53-abort.jsx';
import GetDemo from './demos/54-get.jsx';
import PostDemo from './demos/55-post.jsx';
import PutDemo from './demos/56-put.jsx';
import DeleteDemo from './demos/57-delete.jsx';
import ApiDemo from './demos/58-api.jsx';
import DeriveDemo from './demos/59-derive.jsx';
import ClickFetchDemo from './demos/60-click.jsx';
import HookDemo from './demos/61-hook.jsx';
import TwiceDemo from './demos/62-twice.jsx';
import LiftDemo from './demos/63-lift.jsx';
import SiblingsDemo from './demos/64-siblings.jsx';
import ContextDemo from './demos/65-context.jsx';
import RefDemo from './demos/66-ref.jsx';
import ReducerDemo from './demos/67-reducer.jsx';
import ProviderDemo from './demos/68-provider.jsx';
import ActionDemo from './demos/69-action.jsx';
import ActionStateDemo from './demos/70-action-state.jsx';
import OptimisticDemo from './demos/71-optimistic.jsx';
import DefaultDemo from './demos/72-default.jsx';
import RefCountDemo from './demos/73-ref-count.jsx';

const demos = [
  { id: '01', title: '函式元件', Component: Hello },
  { id: '02', title: 'Fragment', Component: FragmentDemo },
  { id: '03', title: '表達式', Component: ExprDemo },
  { id: '04', title: 'style 物件', Component: StyleDemo },
  { id: '05', title: '提早 return', Component: EarlyDemo },
  { id: '06', title: '三元運算子', Component: TernaryDemo },
  { id: '07', title: '邏輯且', Component: AndDemo },
  { id: '08', title: '數字 0', Component: ZeroDemo },
  { id: '09', title: '由父層傳入', Component: DownDemo },
  { id: '10', title: '拆分元件', Component: TreeDemo },
  { id: '11', title: '狀態的位置', Component: PlaceDemo },
  { id: '12', title: 'default export', Component: CardDemo },
  { id: '13', title: 'named export', Component: BoardDemo },
  { id: '14', title: '解構', Component: PropsDemo },
  { id: '15', title: '預設值', Component: DefaultsDemo },
  { id: '16', title: '函式型 props', Component: CallbackDemo },
  { id: '17', title: 'children', Component: ChildrenDemo },
  { id: '18', title: '宣告狀態', Component: CountDemo },
  { id: '19', title: '狀態快照', Component: SnapshotDemo },
  { id: '20', title: '更新函式', Component: UpdaterDemo },
  { id: '21', title: '批次更新', Component: BatchDemo },
  { id: '22', title: 'Hooks 規則', Component: RulesDemo },
  { id: '23', title: '陣列新增', Component: AddDemo },
  { id: '24', title: '陣列刪除', Component: RemoveDemo },
  { id: '25', title: '陣列修改', Component: EditDemo },
  { id: '26', title: '巢狀物件', Component: NestedDemo },
  { id: '27', title: '命名慣例', Component: EventDemo },
  { id: '28', title: '事件物件', Component: TargetDemo },
  { id: '29', title: '帶參數', Component: PickDemo },
  { id: '30', title: 'preventDefault', Component: PreventDemo },
  { id: '31', title: 'map', Component: MapDemo },
  { id: '32', title: 'filter', Component: FilterDemo },
  { id: '33', title: 'key', Component: KeyDemo },
  { id: '34', title: 'input', Component: InputDemo },
  { id: '35', title: 'textarea', Component: AreaDemo },
  { id: '36', title: 'select', Component: SelectDemo },
  { id: '37', title: 'checkbox', Component: CheckDemo },
  { id: '38', title: 'radio', Component: RadioDemo },
  { id: '39', title: '多欄位物件', Component: FieldsDemo },
  { id: '40', title: 'submit', Component: SubmitDemo },
  { id: '41', title: 'className', Component: ClassDemo },
  { id: '42', title: '多個狀態', Component: MultiDemo },
  { id: '43', title: 'useId', Component: UseIdDemo },
  { id: '44', title: '物件欄位', Component: ObjectDemo },
  { id: '45', title: '空清單', Component: EmptyDemo },
  { id: '46', title: '第一次執行', Component: EffectMount },
  { id: '47', title: '依賴陣列', Component: DepsDemo },
  { id: '48', title: '清除函式', Component: TimerDemo },
  { id: '49', title: '無限迴圈', Component: LoopDemo },
  { id: '50', title: '漏寫依賴', Component: LintDemo },
  { id: '51', title: '載入與錯誤', Component: LoadDemo },
  { id: '52', title: '空資料', Component: EmptyLoadDemo },
  { id: '53', title: 'AbortController', Component: AbortDemo },
  { id: '54', title: 'GET', Component: GetDemo },
  { id: '55', title: 'POST', Component: PostDemo },
  { id: '56', title: 'PUT', Component: PutDemo },
  { id: '57', title: 'DELETE', Component: DeleteDemo },
  { id: '58', title: 'API 模組', Component: ApiDemo },
  { id: '59', title: '渲染時計算', Component: DeriveDemo },
  { id: '60', title: '事件裡的請求', Component: ClickFetchDemo },
  { id: '61', title: '抽出讀取', Component: HookDemo },
  { id: '62', title: '在元件裡使用', Component: TwiceDemo },
  { id: '63', title: '父層持有', Component: LiftDemo },
  { id: '64', title: '兄弟元件', Component: SiblingsDemo },
  { id: '65', title: 'Provider', Component: ContextDemo },
  { id: '66', title: '聚焦輸入框', Component: RefDemo },
  { id: '67', title: '待辦清單', Component: ReducerDemo },
  { id: '68', title: '搭配 Context', Component: ProviderDemo },
  { id: '69', title: 'form action', Component: ActionDemo },
  { id: '70', title: 'useActionState', Component: ActionStateDemo },
  { id: '71', title: 'useOptimistic', Component: OptimisticDemo },
  { id: '72', title: '預設值', Component: DefaultDemo },
  { id: '73', title: '不觸發渲染的值', Component: RefCountDemo },
];

export default function App() {
  const [current, setCurrent] = useState('01');
  const demo = demos.find((item) => item.id === current) ?? demos[0];
  const View = demo.Component;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-4 py-3">
          {demos.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                item.id === demo.id
                  ? 'rounded bg-teal-800 px-3 py-1 text-sm text-white'
                  : 'rounded bg-stone-100 px-3 py-1 text-sm'
              }
              onClick={() => setCurrent(item.id)}
            >
              {item.id} {item.title}
            </button>
          ))}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">
        <View />
      </main>
    </div>
  );
}
```

打開頁面時，主區是編號 01 的示範。按下別的編號，主區換成那一則，網址仍停在原處。

**解析**

- 起始編號是 01，所以一打開是第一則。
- `find` 找不到時用第一筆，避免編號對不上就整頁空白。
- 按鈕的 `key` 用編號。標題可以改，身份仍是那個編號。
- 大寫的 `View` 才會被當成元件。小寫開頭會被當成普通標籤。

{% note success %}
**換你試試：**
把起始編號改成 03。重新整理後應先看到表達式那個示範。
{% endnote %}

<details>
<summary>參考答案</summary>

只改起始值。清單與按鈕不用動。

```diff 03-react/src/App.jsx
  // ...
  export default function App() {
-   const [current, setCurrent] = useState('01');
+   const [current, setCurrent] = useState('03');
    const demo = demos.find((item) => item.id === current) ?? demos[0];
    // ...
  }
```

重新整理後，主區是花括號表達式那一則。

</details>

## 單向資料流

資料由父層持有，用屬性傳給子層。子層不要改父層交下來的那一份，要改就請父層換一份新的。這樣你永遠追得回來：畫面不對，就從擁有那份資料的元件看起。

- 單向資料流是父層把現在的值傳下去。子層用得到，但不能把那份物件直接改掉。
- 要往上通知時，父層再傳一個函式下去。子層呼叫它，真正的更新仍發生在父層。
- 狀態放在「用得到它的那些元件」的共同父層。只服務一顆元件的值，就留在那一顆。

Thinking in React 是官方建議的拆法：先照畫面把元件界線畫出來，用固定資料把靜態畫面組好，再決定哪幾個值會變、該放在哪一層。這一節先做前半。會變的值用到的 `useState`，在狀態那一章才寫。

### 由父層傳入

子層的參數就是父層這一次傳下來的值。同一份名稱傳給兩張卡片，兩張看到的是同一個字，子層裡沒有自己的副本可以偷偷改。

**觀念**

`Card` 只負責把收到的名稱畫出來。`DownDemo` 擁有那個名稱，用屬性交下去。卡片裡沒有設定函式，所以它改不了父層的常數。

這就是單向。之後狀態放進父層時，方向仍然一樣，只是值會在父層被換成新的。

```jsx 03-react/src/demos/09-down.jsx
function Card({ name }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
    </article>
  );
}

export default function DownDemo() {
  const name = '筆';

  return (
    <section className="grid gap-3">
      <Card name={name} />
      <Card name={name} />
    </section>
  );
}
```

畫面是上下兩張卡片，標題都是「筆」。

**解析**

- 兩次 `<Card name={name} />` 各是一次渲染。它們讀到的是父層同一個常數。
- 子層的參數 `name` 是這一次的值。在子層寫 `name = '紙'` 不會改到父層，也不會讓另一張卡片跟著變。
- 卡片沒有自己的資料來源。標題不對時，回到 `DownDemo` 看那個常數。
- 屬性名稱是你自己取的。子層的參數名稱要跟父層寫的屬性對上。

{% note success %}
**換你試試：**
父層的常數改成「紙」。兩張卡片的標題都要跟著變，卡片元件裡不要寫死文字。
{% endnote %}

<details>
<summary>參考答案</summary>

文字只改父層。子層仍只讀 `name`，所以兩張一起換。

```diff 03-react/src/demos/09-down.jsx
  // ...
  }
  
  export default function DownDemo() {
-   const name = '筆';
+   const name = '紙';
  
    return (
      <section className="grid gap-3">
        // ...
```

</details>

### 拆分元件

先不要管資料會不會變。把畫面裡重複的區塊收成元件，固定的字先寫死或用常數傳下去。界線清楚之後，再決定狀態放哪。

**觀念**

一頁文具有標題、一句說明、兩張卡片。標題與說明各是一個小元件，卡片再吃名稱與價格。父層只負責把它們排在同一個 `section` 裡。

這一步對應 Thinking in React 的前兩步：畫出元件階層，以及用固定資料組出靜態版本。按鈕與刪除留到狀態那一章。

```jsx 03-react/src/demos/10-tree.jsx
function PageTitle() {
  return <h1 className="text-2xl font-bold">文具</h1>;
}

function PageLead() {
  return <p className="mt-2">先拆開，再由父層排回去。</p>;
}

function Card({ name, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function TreeDemo() {
  return (
    <section>
      <PageTitle />
      <PageLead />
      <div className="mt-4 grid gap-3">
        <Card name="筆" price={25} />
        <Card name="紙" price={40} />
      </div>
    </section>
  );
}
```

畫面上方是標題「文具」與一句說明，下面兩張卡片分別是筆 25、紙 40。

**解析**

- `PageTitle` 與 `PageLead` 沒有參數。它們的畫面在這一頁是固定的。
- `Card` 有參數，因為同樣的外框要套在兩筆不同的資料上。
- 父層的回傳可以看出頁面結構。細項改卡片，標題改 `PageTitle`，不用在父層裡翻一段很長的標籤。
- 小元件寫在同一個檔、不匯出，代表只有這一頁用得到。下一章才把它們拆到別的檔。

{% note success %}
**換你試試：**
再排一張卡片，名稱是尺、價格是 15。標題與說明那兩個元件留著。
{% endnote %}

<details>
<summary>參考答案</summary>

新卡片仍由父層決定位置與內容。卡片元件本身不用改。

```diff 03-react/src/demos/10-tree.jsx
  // ...
          <Card name="筆" price={25} />
          <Card name="紙" price={40} />
+         <Card name="尺" price={15} />
        </div>
      </section>
    // ...
```

</details>

### 狀態的位置

會變的值放在「所有用得到它的元件」上面那一層。只有一顆元件看得到的值，不要抬到更外面。誰都不看的值，不要放進狀態。

**觀念**

價格是否顯示，兩張卡片都要跟著走，所以這個布林值屬於父層。父層再把現在的布林傳下去。卡片只負責決定這一次要不要畫出價格，不自己保管開關。

能從現有資料算出來的字，也不要另存一份。名稱已經在，就不要再存一個「大寫名稱」。

```jsx 03-react/src/demos/11-place.jsx
function Card({ name, price, showPrice }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      {showPrice ? <p>{price}</p> : null}
    </article>
  );
}

export default function PlaceDemo() {
  const showPrice = true;

  return (
    <section className="grid gap-3">
      <Card name="筆" price={25} showPrice={showPrice} />
      <Card name="紙" price={40} showPrice={showPrice} />
    </section>
  );
}
```

`showPrice` 目前是常數 `true`，所以兩張卡片都看得到價格。

把它改成 `false` 時，兩張的價格一起消失。真正的按鈕留到 `useState`。

**解析**

- 開關若寫在 `Card` 裡面，每一張卡片會各持有一份，無法一次關掉全部。
- 放在父層時，兩張讀到的是同一次傳下去的值。
- 卡片用三元決定要畫價格還是什麼都不畫。`null` 不會在畫面上留下節點。
- 價格的數字已經是參數。不要再為了顯示而複製一份到別的變數裡當狀態。

{% note success %}
**換你試試：**
把 `showPrice` 改成 `false`。兩張卡片都只留名稱，卡片元件的參數不要刪。
{% endnote %}

<details>
<summary>參考答案</summary>

父層的值一改，兩張卡片收到的屬性一起改。這就是「狀態該放在共同父層」的原因，即使這一則還沒有寫 `useState`。

```diff 03-react/src/demos/11-place.jsx
  // ...
  }
  
  export default function PlaceDemo() {
-   const showPrice = true;
+   const showPrice = false;
  
    return (
      <section className="grid gap-3">
        // ...
```

</details>

### React Developer Tools

React Developer Tools 是瀏覽器擴充功能。它讓你點畫面上的元件，直接看這一輪的 props 與 state，而不用在程式裡臨時加 `console.log`。

**觀念**

到 Chrome 或 Firefox 的擴充功能商店安裝 React Developer Tools。裝好後重新整理開發中的頁面，開發者工具會多出 Components 分頁。

在 Components 裡點選一顆元件，右側會列出它收到的 props，以及它自己的 state 與 hooks。這一則還沒有 state，所以你會先看到 props。下一章的計數元件，則可以在同一個分頁看 `count` 怎麼變。

```jsx 03-react/src/demos/09-down.jsx
function Card({ name }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
    </article>
  );
}

export default function DownDemo() {
  const name = '筆';

  return (
    <section className="grid gap-3">
      <Card name={name} />
      <Card name={name} />
    </section>
  );
}
```

打開示範「由父層傳入」。Components 樹裡會看到 `DownDemo`，下面兩顆 `Card`。

點任一顆 `Card`，props 的 `name` 是筆。

**解析**

- Components 分頁看的是 React 的元件樹，不是 HTML 的標籤樹。標籤樹仍在 Elements。
- 點子層時，右側的 props 就是父層這一次傳下來的值。
- 畫面上有兩顆 `Card`，樹上也有兩顆。它們的 props 可以相同，仍是兩個元件。
- 正式建置若沒有開發用的除錯資訊，這個分頁可能對不到你的函式名稱。開發伺服器底下看即可。

{% note success %}
**換你試試：**
在 Components 點 `DownDemo`。

確認它沒有 props，再點一顆 `Card`，讀出 `name`。
{% endnote %}

<details>
<summary>參考答案</summary>

`DownDemo` 是這一頁的根，沒有人傳 props 給它。

`Card` 的 `name` 來自父層的常數，所以右側會看到筆。

元件樹由上到下是 `DownDemo`，然後兩顆 `Card`。

不要在 Elements 裡找這個名稱，HTML 上只會有 `section` 與 `article`。

</details>

# JSX

JSX 讓你在 JavaScript 裡寫元素。它不是字串，也不是另開一個 HTML 檔。這一章看一棵樹怎麼回傳、花括號能放什麼、樣式物件怎麼寫，以及條件渲染的三種寫法差在哪。

## JSX 語法

標籤要有結尾，或寫成自閉。花括號裡放的是值，不是一整段敘述。樣式若要寫在元素上，交給一個物件，屬性名稱用駝峰。

- 回傳只能有一個父層。多個兄弟用 Fragment，或包進 `section`。
- 花括號裡放表達式。變數、運算、函式呼叫都可以。`if` 與 `for` 要寫在回傳外面。
- 類別寫 `className`。`style` 的值是物件，鍵用駝峰，例如 `backgroundColor`。

### Fragment

兩個兄弟要一起回傳、又不想多一個父標籤時，用 Fragment。簡寫是空標籤。需要 `key` 時才寫出 `Fragment` 這個名稱。

**觀念**

空標籤 `<>...</>` 是 Fragment 的簡寫。它會消失在 HTML 裡，裡面的標題與段落直接變成上一層的子節點。

列表裡的每一項如果要回傳兩個元素又要有 key，簡寫沒有地方放 key。那時改用 `Fragment`。

這一則先用簡寫。

```jsx 03-react/src/demos/02-fragment.jsx
export default function FragmentDemo() {
  return (
    <>
      <h1 className="text-2xl font-bold">文具</h1>
      <p>這兩個兄弟沒有多包一層 div。</p>
    </>
  );
}
```

畫面是一行標題、一行說明。用開發者工具看 `#root` 裡這一層，標題與段落的外面不會多一個空的包裹元素。

**解析**

- 簡寫包住的兩個標籤算一次回傳。拿掉簡寫、讓它們並列，轉換會失敗。
- Fragment 本身不會出現在 Elements。你看不到一個叫做 Fragment 的標籤。
- 要在列表裡給這一組兄弟一個 key 時，寫 `<Fragment key={id}>`，並從 react 引入 Fragment。
- 大多數版面仍然用 `section` 或 `article` 當父層。只有「多這一層沒有意義」時才用 Fragment。

{% note success %}
**換你試試：**
在段落下面再加一個段落，文字是「仍然沒有外框」。簡寫留著。
{% endnote %}

<details>
<summary>參考答案</summary>

三個兄弟都放在同一個 Fragment 裡，回傳還是只有一個根。

```diff 03-react/src/demos/02-fragment.jsx
  // ...
        <h1 className="text-2xl font-bold">文具</h1>
        <p>這兩個兄弟沒有多包一層 div。</p>
+       <p>仍然沒有外框</p>
      </>
    );
  // ...
```

</details>

### 表達式

花括號裡放會算出一個值的式子。文字要插進畫面時用花括號，不要把整段 JavaScript 敘述塞進標籤中間。

**觀念**

元件函式裡先準備名稱與價格。回傳時用花括號把名稱放進標題，把總價放進段落。乘法會先算出數字，再變成文字節點。

`if` 不能寫在花括號裡。要依條件換畫面時，用後面的條件渲染，或在 `return` 之前先算好。

```jsx 03-react/src/demos/03-expr.jsx
export default function ExprDemo() {
  const name = '筆';
  const price = 25;

  return (
    <section>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>兩支 {price * 2}</p>
    </section>
  );
}
```

畫面：

```text
筆
兩支 50
```

**解析**

- `{name}` 的結果是字串，所以標題就是筆。
- `{price * 2}` 先做乘法。花括號裡看到的是結果 50，不是算式本身。
- 花括號外面的「兩支」是固定文字。固定文字與表達式可以接在同一段。
- 物件直接放進花括號當子節點，畫面不會變成你期望的文字。物件要先取出欄位。

{% note success %}
**換你試試：**
段落改成三支的總價。標題仍是名稱。三支應顯示 75。
{% endnote %}

<details>
<summary>參考答案</summary>

乘數改成 3。價格仍只有一份來源，總價在畫面上算出來。

```diff 03-react/src/demos/03-expr.jsx
  // ...
      <section>
        <h1 className="text-2xl font-bold">{name}</h1>
-       <p>兩支 {price * 2}</p>
+       <p>三支 {price * 3}</p>
      </section>
    );
  // ...
```

```text
筆
三支 75
```

</details>

### style 物件

JSX 的屬性名稱沿用 DOM 的屬性，不是每一個 HTML 屬性都照抄。要直接寫行內樣式時，值是一個物件。

**觀念**

`htmlFor` 對應 HTML 的 for，因為 for 在 JavaScript 裡另有用途。

`readOnly` 中間的 O 要大寫。

`style` 接受物件。CSS 的 background-color 寫成 `backgroundColor`。

物件可以先放在常數，再交給 `style`。Tailwind 的 `className` 仍是字串。兩者可以同時在，這一則為了看物件，才把顏色寫進行內樣式。

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
        value="筆"
        className="ml-2 rounded border px-2"
      />
    </section>
  );
}
```

畫面是一個白底、有內距的區塊。標籤寫著名稱，輸入框裡是筆，而且不能打字。

**解析**

- `style={panel}` 的花括號代表「這裡是 JavaScript 的值」。裡面那個物件不是字串。
- 樣式的鍵是駝峰。寫成 `'background-color'` 不會套到你要的顏色。
- `htmlFor` 必須跟輸入框的 `id` 相同，點標籤才會聚焦到那一格。
- `readOnly` 是屬性，不是子元素。它讓這一格只顯示、不接受輸入。

{% note success %}
**換你試試：**
把內距改成 `20px`，輸入框的值改成紙。

`htmlFor` 與 `id` 仍要相同。
{% endnote %}

<details>
<summary>參考答案</summary>

樣式物件換一個欄位，輸入框換 `value`。標籤與輸入框的對應不要拆開。

```jsx 03-react/src/demos/04-style.jsx
export default function StyleDemo() {
  const panel = {
    backgroundColor: '#ffffff',
    padding: '20px',
  };

  return (
    <section style={panel} className="rounded border border-stone-200">
      <label htmlFor="item-name">名稱</label>
      <input id="item-name" readOnly value="紙" className="ml-2 rounded border px-2" />
    </section>
  );
}
```

</details>

### className

外觀類別是一個字串。條件只決定這個字串的內容，標籤本身不必拆成兩個 `return`。

**觀念**

`active` 為真時用深色按鈕，為假時用淺色按鈕。三元算出的是字串，放進 `className`。Tailwind 的工具類別用空白接在同一個字串裡。

不要把兩種按鈕寫成兩個元件，除非它們的結構真的不同。這裡只差外觀。

```jsx 03-react/src/demos/41-class.jsx
export default function ClassDemo() {
  const active = true;
  const buttonClass = active
    ? 'rounded bg-teal-800 px-3 py-1 text-white'
    : 'rounded bg-stone-200 px-3 py-1';

  return (
    <section>
      <p>{active ? '使用中' : '已停用'}</p>
      <button type="button" className={buttonClass}>
        文具
      </button>
    </section>
  );
}
```

畫面第一行是「使用中」，按鈕是白字深底。

**解析**

- `className` 的值是字串。三元的兩個分支都要是字串，不能一邊是字串、一邊是元件。
- 工具類別之間留一個空白。少了空白，Tailwind 會把它看成一個不存在的類別。
- 段落的三元決定文字，按鈕的三元決定外觀。兩件事可以各算各的。
- 類別很多時，先放進常數再綁到屬性上，回傳的標籤比較短。

{% note success %}
**換你試試：**
把 `active` 改成 `false`。第一行應變成「已停用」，按鈕改成淺底。
{% endnote %}

<details>
<summary>參考答案</summary>

同一個布林同時餵給文字與類別。改一處，兩處一起換。

```diff 03-react/src/demos/41-class.jsx
  export default function ClassDemo() {
-   const active = true;
+   const active = false;
    const buttonClass = active
      ? 'rounded bg-teal-800 px-3 py-1 text-white'
      // ...
```

</details>

## 條件渲染

同一顆元件可以依資料回傳不同的元素。三種寫法都是在決定這一次畫什麼，差別在「整顆換掉」還是「只換樹裡的一截」。

- 提早 return 在函式前半就結束。適合整塊畫面完全不同的情況，例如還沒有資料。
- 三元運算子在兩個元素之間挑一個。兩個分支都寫在附近，讀的人看得到另一種長相。
- `&&` 在條件為真時才畫出後面的元素。條件為假時，那一格不留節點。數字 0 是這個寫法的陷阱。

{% mermaid graph LR %}
  checkNode["先看條件"] --> earlyNode["整顆提早 return"]
  checkNode --> ternNode["三元挑一個元素"]
  checkNode --> andNode["&& 決定畫或不畫"]
  style checkNode fill:#fff3e0
  style earlyNode fill:#e3f2fd
  style ternNode fill:#e3f2fd
  style andNode fill:#e8f5e9
{% endmermaid %}

### 提早 return

條件成立時先回傳另一棵樹，後面的主要畫面就不會再執行。讀程式的人可以先把例外看完，再看正常的那一塊。

**觀念**

沒有選到商品時，函式立刻回傳一句說明。有商品時才回傳卡片。兩個 `return` 不會同時發生。

這種寫法適合「整頁都不一樣」。只是少一個小標記時，用三元或 `&&` 就夠了，不必把整顆元件分成兩大段。

```jsx 03-react/src/demos/05-early.jsx
export default function EarlyDemo() {
  const product = null;

  if (!product) {
    return <p>尚未選擇商品。</p>;
  }

  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>{product.price}</p>
    </article>
  );
}
```

畫面只有一行「尚未選擇商品。」。卡片那一段這一次不會跑到。

**解析**

- `if` 寫在 `return` 之前，不寫在 JSX 的花括號裡。
- 第一個 `return` 執行後，函式結束。下面的卡片不會被算出來。
- product 是 `null` 時去讀 `product.name` 會丟出錯誤。

提早 return 就是在那一行之前擋下來。
- 主要畫面仍是一個父元素。例外畫面這一則只有一個段落，也符合一次回傳一棵樹。

{% note success %}
**換你試試：**
把 `product` 改成一筆真的資料，名稱筆、價格 25。畫面應變成卡片，說明那一行消失。
{% endnote %}

<details>
<summary>參考答案</summary>

條件不再成立，函式會走到第二個 `return`。卡片用的是物件的欄位。

```diff 03-react/src/demos/05-early.jsx
  export default function EarlyDemo() {
-   const product = null;
+   const product = { name: '筆', price: 25 };
  
    if (!product) {
      return <p>尚未選擇商品。</p>;
    // ...
```

</details>

### 三元運算子

兩個互斥的元素要留在同一段 JSX 裡時，用三元。條件為真取問號後面那個，為假取冒號後面那個。

**觀念**

庫存大於 0 就顯示「有庫存」，否則顯示「補貨中」。兩個段落都寫在附近，之後改文案不用翻到函式的另一端。

三元的兩個分支都應該是可畫的值。一邊是元素、另一邊卻是一段沒有回傳的敘述，語法不會過。

```jsx 03-react/src/demos/06-ternary.jsx
export default function TernaryDemo() {
  const stock = 3;

  return (
    <section>
      <h1 className="text-2xl font-bold">筆</h1>
      {stock > 0 ? <p>有庫存</p> : <p>補貨中</p>}
    </section>
  );
}
```

畫面標題是筆，下面一行是「有庫存」。

**解析**

- 條件是 `stock > 0`。3 通過，所以畫出第一個段落。
- 冒號後面的段落這一次不會出現在 HTML 裡，但它留在程式裡當另一種結果。
- 三元本身放在花括號裡，因為它是表達式，會算出一個元素。
- 分支一多就會很難讀。超過兩個結果時，改在 `return` 前用 `if` 先決定要回傳哪一個變數。

{% note success %}
**換你試試：**
把庫存改成 0。標題留著，下面應變成「補貨中」。
{% endnote %}

<details>
<summary>參考答案</summary>

條件變成假，三元改走冒號後面的元素。

```diff 03-react/src/demos/06-ternary.jsx
  export default function TernaryDemo() {
-   const stock = 3;
+   const stock = 0;
  
    return (
      <section>
        // ...
```

</details>

### 邏輯且

只想在條件成立時多畫一塊、不成立時什麼都沒有，用 `&&`。左邊為真時，結果就是右邊那個元素。

**觀念**

有折扣時才顯示那一行。沒有折扣時，`&&` 的結果是假值，React 不會為它產生節點。標題與價格始終都在。

不要用 `&&` 在兩個很長的畫面之間二選一。那種情況三元或提早 return 比較好讀。

```jsx 03-react/src/demos/07-and.jsx
export default function AndDemo() {
  const discount = 10;

  return (
    <section>
      <h1 className="text-2xl font-bold">筆</h1>
      <p>價格 25</p>
      {discount > 0 && <p>折扣 {discount}</p>}
    </section>
  );
}
```

畫面有三行：筆、價格 25、折扣 10。

**解析**

- `discount > 0` 為真，所以 `&&` 後面的段落會被畫出來。
- 比較的結果是布林。布林本身不會變成畫面上的文字。
- 假的時候，這一格沒有元素。不要再寫一個 `null` 在後面，那是三元的工作。
- 左邊若不是布林，而是數字，就要看下一節。0 會被畫出來。

{% note success %}
**換你試試：**
把折扣改成 0。第三行應消失，前兩行留著。
{% endnote %}

<details>
<summary>參考答案</summary>

比較變成假，`&&` 短路，段落不會出現。這裡的左邊是比較結果，不是數字 0 本身。

```diff 03-react/src/demos/07-and.jsx
  export default function AndDemo() {
-   const discount = 10;
+   const discount = 0;
  
    return (
      <section>
        // ...
```

</details>

### 數字 0

`&&` 的左邊如果是數字 0，React 會把 0 畫到畫面上。0 是假值，但它也是合法的子節點。

**觀念**

件數是 0 時，`count && <p>...</p>` 的結果就是 0，不是「什麼都不畫」。畫面上會多一個你沒打算顯示的 0。

要表達「大於 0 才顯示」，就把左邊寫成比較。或改用三元，假的那一邊給 `null`。

```jsx 03-react/src/demos/08-zero.jsx
export default function ZeroDemo() {
  const count = 0;

  return (
    <section>
      <h1 className="text-2xl font-bold">筆</h1>
      {count && <p>件數 {count}</p>}
    </section>
  );
}
```

畫面標題下面會出現一個 0，不會出現「件數 0」那個段落。

```text
筆
0
```

**解析**

- `&&` 在左邊為假時，整個表達式的值就是左邊。0 為假，所以值是 0。
- React 允許數字當子節點，因此 0 被畫出來。`false` 與 `null` 則不會。
- 這不是數學錯，是「假值」與「可渲染的值」重疊了。
- 寫成 `count > 0 && ...` 之後，左邊變成布林，0 就不會再漏到畫面上。

{% note warning %}
**件數、長度、金額**
這三種常常是 0。拿它們直接當 `&&` 的左邊之前，先改成比較。
{% endnote %}

{% note success %}
**換你試試：**
左邊改成 `count > 0`。畫面應只剩標題，那個 0 消失。
{% endnote %}

<details>
<summary>參考答案</summary>

比較的結果是 `false`。`false` 不會被畫成文字，右邊的段落也不會出現。

```diff 03-react/src/demos/08-zero.jsx
  // ...
      <section>
        <h1 className="text-2xl font-bold">筆</h1>
-       {count && <p>件數 {count}</p>}
+       {count > 0 && <p>件數 {count}</p>}
      </section>
    );
  // ...
```

</details>

# 元件

元件是可重複使用的函式。這一章把卡片拆到另一個檔，再用 props 把資料與函式傳進去。父層若要決定子層中間畫什麼，就把那一塊當成 children 夾在標籤裡。

## 模組

一個檔可以同時交出預設元件與具名元件。引入的一邊要對上交法：預設的不加花括號，具名的要加，而且名稱要一樣。

- default export 是這個檔的主角。引入時名稱可以自己取，一個檔只有一個預設匯出。
- named export 可以有好幾個。引入時用花括號，名稱必須跟交出時相同。

### default export

預設匯出給切換清單這樣的呼叫端使用。呼叫端寫 `<CardDemo />`，不必自己準備名稱與價格。

**觀念**

這個檔的主角是 `CardDemo`。它在內部使用 `Card`，並傳入固定的名稱與價格。

`Card` 另外用具名匯出，下一節的頁面才接得走。

只看這一則時，畫面就是一張卡片。預設匯出負責把元件變成「打開就能看」的示範。

```jsx 03-react/src/demos/12-card.jsx
export function Card({ name, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function CardDemo() {
  return <Card name="筆" price={25} />;
}
```

畫面是一張白底卡片，標題筆，下面一行 25。

**解析**

- `export default` 這一行決定別的檔在不加快括號時會拿到誰。
- 同一個檔還有 `export function Card`。那是具名匯出，不是第二個預設匯出。
- 一個檔不能有兩個 `export default`。第二個會讓轉換失敗。
- `CardDemo` 把資料寫死，是為了單獨打開這個檔也能看到卡片。真正的列表會改由父層傳不同的資料。

{% note success %}
**換你試試：**
預設匯出裡的價格改成 40，名稱改成紙。`Card` 的參數不要改成固定文字。
{% endnote %}

<details>
<summary>參考答案</summary>

改的是呼叫 `Card` 時傳下去的值。卡片元件仍舊只負責顯示參數。

```diff 03-react/src/demos/12-card.jsx
  // ...
  }
  
  export default function CardDemo() {
-   return <Card name="筆" price={25} />;
+   return <Card name="紙" price={40} />;
  }
```

</details>

### named export

具名匯出要在引入時把名字放進花括號。名字寫錯，或忘了花括號，這個檔就接不到 `Card`。

**觀念**

`BoardDemo` 從卡片檔引入 `Card`，排兩張不同的卡片。它自己用預設匯出，因為切換清單要的是這一頁，不是卡片。

路徑寫成 `./12-card.jsx`。這個點代表同一個資料夾。不要用一整條從磁碟根目錄開始的路徑。

```jsx 03-react/src/demos/13-board.jsx
import { Card } from './12-card.jsx';

export default function BoardDemo() {
  return (
    <section className="grid gap-3">
      <Card name="筆" price={25} />
      <Card name="紙" price={40} />
    </section>
  );
}
```

畫面是上下兩張卡片：筆 25、紙 40。外框與標題樣式來自 `Card`，這一頁只決定有幾張、各是什麼。

**解析**

- 花括號裡的 `Card` 必須跟 `12-card.jsx` 的具名匯出相同。
- 寫成 `import Card from './12-card.jsx'` 會拿到預設的 `CardDemo`，不是卡片本身。
- 兩次使用 `Card` 各傳各的 props。元件函式會各跑一次。
- 頁面元件用 `export default`，跟卡片的具名匯出是兩種交法，可以同時存在於不同檔。

{% note success %}
**換你試試：**
再加一張卡片，名稱尺、價格 15。引入那一行留著。
{% endnote %}

<details>
<summary>參考答案</summary>

新的資料仍由這一頁決定。卡片檔不用為了第三張而修改。

```diff 03-react/src/demos/13-board.jsx
  // ...
        <Card name="筆" price={25} />
        <Card name="紙" price={40} />
+       <Card name="尺" price={15} />
      </section>
    );
  // ...
```

</details>

## props

props 是父層傳給子層的參數。子層用解構把要的欄位取出來，沒傳的欄位可以給預設值。父層也可以把函式當參數傳下去，或把標籤中間的內容當成 children。

- 解構寫在參數的位置，欄位名稱要跟父層的屬性一樣。
- 預設值在沒有傳那個屬性時補上。父層有傳，就算傳的是空字串，也不會改用預設值。
- 函式型 props 讓子層在某個時機通知父層。子層不擁有那份狀態。
- children 是標籤中間的內容。子層決定放在版面的哪裡，不決定內容是什麼。

### 解構

參數寫成 `{ name, price }` 時，函式裡面可以直接用這兩個名字。不解構的話，它們會待在同一個物件上。

**觀念**

父層寫 `<Product name="筆" price={25} />`。子層的參數就是 `{ name: '筆', price: 25 }`。

解構之後，`name` 與 `price` 是兩個區域變數。

屬性是字串時用雙引號。屬性是數字時用花括號。花括號裡的 `25` 是數字，不是文字「25」。

```jsx 03-react/src/demos/14-props.jsx
function Product({ name, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function PropsDemo() {
  return <Product name="筆" price={25} />;
}
```

畫面是一張卡片，標題筆，下面一行 25。

**解析**

- 解構的名字跟屬性名一一對上。父層寫 `price`，子層才能取出 `price`。
- `price={25}` 的花括號表示這是 JavaScript 的值。寫成 `price="25"` 會變成字串。
- 子層不要改 `name` 再指望父層跟著變。這一次的參數只活在這一次渲染。
- 多個屬性可以只解構用得到的那些。用不到的不必全部列出。

{% note success %}
**換你試試：**
再傳一個屬性 `unit`，值是「支」。卡片在價格後面顯示這個單位。
{% endnote %}

<details>
<summary>參考答案</summary>

新欄位要在父層傳、在子層的解構裡接。只寫其中一邊，另一邊會是 `undefined`。

```jsx 03-react/src/demos/14-props.jsx
function Product({ name, price, unit }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>
        {price} {unit}
      </p>
    </article>
  );
}

export default function PropsDemo() {
  return <Product name="筆" price={25} unit="支" />;
}
```

</details>

### 預設值

解構時可以在欄位後面給預設值。父層省略那個屬性時，子層仍有東西可畫。

**觀念**

單位常常是「件」，所以預設寫在參數上。這一則父層沒有傳 `unit`，畫面仍會出現件。價格沒有預設，因為每樣商品都不該偷偷變成 0。

預設值只在值是 `undefined` 時介入。父層若明確傳了空字串，畫面上就是空的，不會被預設值蓋掉。

```jsx 03-react/src/demos/15-defaults.jsx
function Product({ name, price, unit = '件' }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>
        {price} {unit}
      </p>
    </article>
  );
}

export default function DefaultsDemo() {
  return <Product name="筆" price={25} />;
}
```

畫面是「筆」，下一行是「25 件」。

**解析**

- `unit = '件'` 寫在解構裡。這是參數的預設值，不是狀態。
- 父層沒有寫 `unit` 這個屬性，所以子層用件。
- 預設值每次渲染會重新看一次。它不會被記到下一次。
- 不要為了預設值去改父層傳下來的物件。預設發生在參數這一層。

{% note success %}
**換你試試：**
呼叫時加上 `unit="盒"`。畫面應變成 25 盒，預設的件這一次不會出現。
{% endnote %}

<details>
<summary>參考答案</summary>

父層傳了值，預設值就不會介入。參數上的 `'件'` 留著，給下一次沒傳的時候用。

```diff 03-react/src/demos/15-defaults.jsx
  // ...
  }
  
  export default function DefaultsDemo() {
-   return <Product name="筆" price={25} />;
+   return <Product name="筆" price={25} unit="盒" />;
  }
```

</details>

### 函式型 props

父層把函式傳下來，子層在點擊時呼叫它。被點到的是哪一筆，由子層把名字交回去，狀態仍留在父層。

**觀念**

`Shelf` 擁有「目前選到誰」。

`Choice` 只知道自己的名稱，以及一個叫做 `onPick` 的函式。

按下時它呼叫 `onPick(name)`，不自己保存選取結果。

屬性名稱用 `on` 開頭，表示「發生這件事時」。子層裡對應的參數也沿用這個名字。真正更新狀態的那一行只出現在父層。

```jsx 03-react/src/demos/16-callback.jsx
import { useState } from 'react';

function Choice({ name, onPick }) {
  return (
    <button
      type="button"
      className="rounded bg-stone-100 px-3 py-1"
      onClick={() => onPick(name)}
    >
      {name}
    </button>
  );
}

export default function CallbackDemo() {
  const [picked, setPicked] = useState('尚未選');

  return (
    <section>
      <p>選到 {picked}</p>
      <div className="mt-3 flex gap-2">
        <Choice name="筆" onPick={setPicked} />
        <Choice name="紙" onPick={setPicked} />
      </div>
    </section>
  );
}
```

一開始是「選到 尚未選」。按下紙之後，變成「選到 紙」。筆那一顆會把文字改成筆。

**解析**

- `onPick={setPicked}` 把設定函式交下去。子層拿到的是函式本身，不是呼叫結果。
- 箭頭函式 `() => onPick(name)` 等到點擊才跑。寫成 `onClick={onPick(name)}` 會在渲染時就呼叫。
- 兩顆按鈕共用同一個 `onPick`。差在各自閉包裡的 `name`。
- 父層是唯一呼叫 `setPicked` 的地方。子層沒有自己的 `useState`。

{% note success %}
**換你試試：**
再加一顆選項，名稱是尺。按下之後，上面那一行應變成「選到 尺」。
{% endnote %}

<details>
<summary>參考答案</summary>

新按鈕仍把同一個設定函式傳下去，只是名稱不同。

```diff 03-react/src/demos/16-callback.jsx
  // ...
          <Choice name="筆" onPick={setPicked} />
          <Choice name="紙" onPick={setPicked} />
+         <Choice name="尺" onPick={setPicked} />
        </div>
      </section>
    // ...
```

</details>

### children

標籤中間的內容會變成子層的 `children`。版面元件負責外框，不負責中間的句子是什麼。

**觀念**

`Panel` 畫一個有邊框的區塊，中間放 `{children}`。

父層把標題與段落寫在 `<Panel>` 與 `</Panel>` 之間。

下次要放一張表單，仍用同一個外框，不必改 `Panel`。

`children` 這個名字是 React 定的。不要另外取一個 `content`，除非你真的想用屬性而不是標籤中間。

```jsx 03-react/src/demos/17-children.jsx
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
      <h1 className="text-2xl font-bold">文具</h1>
      <p>外框在 Panel，文字在呼叫端。</p>
    </Panel>
  );
}
```

畫面是一個白底邊框，裡面有標題「文具」與一句說明。

**解析**

- 開始標籤與結束標籤中間的元素，就是這一次的 `children`。
- `Panel` 不知道中間是標題還是表單。它只決定外框與內距。
- 沒有寫中間內容時，`children` 是 `undefined`，那一塊就是空的。
- 要限制只能放一種子元件時，再另外用明確的 props。一般的外框用 `children` 就夠。

{% note success %}
**換你試試：**
在段落下面再放一行「第二段仍在外框裡」。`Panel` 的實作不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

多出來的段落仍是 `children` 的一部分。外框元件會照單全收。

```diff 03-react/src/demos/17-children.jsx
  // ...
        <h1 className="text-2xl font-bold">文具</h1>
        <p>外框在 Panel，文字在呼叫端。</p>
+       <p>第二段仍在外框裡</p>
      </Panel>
    );
  // ...
```

</details>

# 狀態

會變、而且變了就要重畫的資料，放進狀態。React 在渲染時讀到的是這一輪的快照。設定函式把下一輪要的值排進去，提交之後畫面才換成新的。

## useState

`useState` 是這一章的起點。它回傳現在的值，以及一個把下一輪換成新值的函式。同一個事件裡可以排好幾個更新，React 會收成一次渲染。

- `useState(起始值)` 的起始值只在這顆元件第一次出現時使用。
- 渲染讀到的狀態是快照。事件函式裡的區域變數不會因為你剛剛呼叫了設定函式就立刻變成新值。
- 更新函式的寫法是 `setCount((value) => value + 1)`。它用排到它的那一次狀態來算，不看這一次渲染抓住的舊數字。
- 同一個事件裡的多次設定會批次處理，通常只再渲染一次。

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
同一輪裡重複的計算，以及子元件要不要重畫，這門課交給 React Compiler。不另外寫 memo、useMemo 或 useCallback。
{% endnote %}

### 宣告狀態

`useState` 寫在元件函式的最上面。陣列的第一個是現在的值，第二個是設定函式。名字成對，讀的人看得出來它們管同一份資料。

**觀念**

計數從 0 開始。按下按鈕時，用更新函式把現在的數字加一。畫面上的「次數」讀的是 `count`。你沒有自己去找那個段落再改文字。

設定函式的名字用 `set` 接在狀態名後面。這是慣例，React 不會因為你換了名字就壞掉，但全班這樣寫最好認。

```jsx 03-react/src/demos/18-state.jsx
import { useState } from 'react';

export default function CountDemo() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一
      </button>
    </section>
  );
}
```

一開始畫面是「次數 0」。按三次之後是「次數 3」。

**解析**

- 起始值 `0` 只在這顆元件被放上畫面的第一次用到。之後按按鈕不會再把次數清回 0。
- 直接寫 `count = count + 1` 改不到 React 記住的那一份，畫面也不會更新。
- `(value) => value + 1` 的 `value` 是更新當下的狀態。連續點擊不會用到過期的數字。
- 設定成同一個數字時，React 可以略過這次渲染。畫面上的次數不會無故閃動。

{% note success %}
**換你試試：**
再加一顆按鈕，按下去把次數設回 0。加一那顆留著。
{% endnote %}

<details>
<summary>參考答案</summary>

歸零不依賴舊值，直接把 0 交出去即可。兩顆按鈕各管自己的設定。

```diff 03-react/src/demos/18-state.jsx
  // ...
          加一
        </button>
+       <button
+         type="button"
+         className="ml-2 rounded bg-stone-200 px-3 py-1"
+         onClick={() => setCount(0)}
+       >
+         歸零
+       </button>
      </section>
    );
  // ...
```

</details>

### render 與 commit

一次更新分成渲染與提交。渲染只呼叫你的元件、算出元素。提交才把跟上一輪不同的地方寫進頁面。

**觀念**

按下加一之後，React 先重新呼叫 `CountDemo`。這一次函式讀到的 `count` 已經是新的數字，回傳的段落也是新的描述。提交時，畫面上的文字才換成那個數字。

官方文件用 render 與 commit 說明這兩步。渲染是純的計算：同樣的狀態應算出同樣的元素，不要在渲染過程中改狀態或改畫面。

```jsx 03-react/src/demos/18-state.jsx
import { useState } from 'react';

export default function CountDemo() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一
      </button>
    </section>
  );
}
```

按一次，段落從「次數 0」變成「次數 1」。按鈕的文字沒有改，提交時那一顆按鈕可以留在原處。

**解析**

- 渲染發生在 JavaScript 裡。這時候頁面上的文字還是舊的。
- 提交比對這一次與上一次的元素，只更新有差的節點。
- 元件函式裡不要寫「順便改某個 DOM」。那會跟提交打架。
- 開發時的嚴格模式可能讓渲染多跑一次。多跑的那次仍應算出同一棵元素。

{% note success %}
**換你試試：**
按加一三次。確認每一次都是渲染讀到新的 `count` 之後，畫面才變成 1、2、3。
{% endnote %}

<details>
<summary>參考答案</summary>

每一次點擊都排進一個「加一」。React 渲染時讀到的是加上去之後的快照，提交才把段落換成那個數字。三次點擊就是三次這樣的循環，所以停在 3。

程式維持原樣即可。若數字一次跳 3，代表一個事件裡呼叫了三次設定，而不是按了三下。

</details>

### 多個狀態

互不相關的值分成多個 `useState`。不要為了少寫一行，把它們塞進同一個物件，除非它們真的會一起改。

**觀念**

名稱與件數各有自己的狀態。改名稱時只呼叫 `setName`，件數留在原來的數字。兩份狀態讓兩次渲染各自只換要換的那一個。

呼叫 Hooks 的順序要固定。先名稱、後件數，每一次渲染都維持這個順序。不要把其中一個放進 `if`。

```jsx 03-react/src/demos/42-multi.jsx
import { useState } from 'react';

export default function MultiDemo() {
  const [name, setName] = useState('筆');
  const [count, setCount] = useState(1);

  return (
    <section>
      <p>
        {name} × {count}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一件
      </button>
      <button
        type="button"
        className="ml-2 rounded bg-stone-200 px-3 py-1"
        onClick={() => setName('紙')}
      >
        改成紙
      </button>
    </section>
  );
}
```

一開始是「筆 × 1」。按加一件變成「筆 × 2」。再按改成紙，變成「紙 × 2」。件數不會因為改名而回到 1。

**解析**

- 兩個 `useState` 是兩份狀態。更新其中一份，另一份用上一輪的值留到這一輪。
- 改名那顆按鈕沒有碰到 `setCount`，所以件數保持不變。
- 起始值各自只算一次。件數的 `1` 不會在改名時重跑。
- 若兩個值永遠同時改，可以合成一個物件。會分開改的，拆開比較不容易互相蓋掉。

{% note success %}
**換你試試：**
再加一個狀態 `city`，起始值台北，以及一顆按鈕把它改成台南。名稱與件數那兩行更新留著。
{% endnote %}

<details>
<summary>參考答案</summary>

第三個 Hook 仍寫在元件最上面。按鈕只呼叫它自己的設定函式。

```diff 03-react/src/demos/42-multi.jsx
  // ...
    const [name, setName] = useState('筆');
    const [count, setCount] = useState(1);
+   const [city, setCity] = useState('台北');
  
    return (
      <section>
        <p>
-         {name} × {count}
+         {name} × {count} · {city}
        </p>
        <button
          // ...
          改成紙
        </button>
+       <button
+         type="button"
+         className="ml-2 rounded bg-stone-200 px-3 py-1"
+         onClick={() => setCity('台南')}
+       >
+         改到台南
+       </button>
      </section>
    );
  // ...
```

</details>

### 狀態快照

每一次渲染都有自己的狀態快照。事件函式看得到的，是「建立這次渲染時」的那個值。設定函式不會把同一個函式裡的區域變數當場改掉。

**觀念**

這個按鈕連呼叫兩次 `setCount(count + 1)`。兩次都用同一個 `count`，也就是按下當下畫面上的數字。若畫面是 0，兩次都是在排「設成 1」。

Console 印出的也是 0，因為 `console.log` 讀的是區域變數，不是下一輪的狀態。

想連加兩次，要用下一節的更新函式。快照這則故意用舊值，讓你看見它們沒有累加。

```jsx 03-react/src/demos/19-snapshot.jsx
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
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        加一
      </button>
    </section>
  );
}
```

從 0 按一次，畫面變成「次數 1」，不是 2。

```text
0
```

**解析**

- `count` 是這一次渲染的常數。事件函式把它關在閉包裡。
- 兩次 `setCount(count + 1)` 排的是同一個下一輪的值。後一次把前一次蓋掉。
- `console.log(count)` 發生在設定之後，印出的仍是按下之前的數字。
- 下一輪渲染才會有新的 `count`。新的事件函式也會跟著新的渲染一起建立。

{% note success %}
**換你試試：**
在 `console.log` 後面再印一次 `count + 1`。畫面仍只加 1，Console 第二行應是 1。
{% endnote %}

<details>
<summary>參考答案</summary>

`count + 1` 只是把快照拿來做算術，不會多排一次更新。畫面仍由那兩次相同的設定決定，停在 1。

```diff 03-react/src/demos/19-snapshot.jsx
  // ...
      setCount(count + 1);
      console.log(count);
+     console.log(count + 1);
    };
  
    return (
      // ...
```

```text
0
1
```

</details>

### 更新函式

設定狀態時傳入一個函式，React 會把「排到這一次為止的值」交給你。下一次更新看得到上一次更新函式的結果。

**觀念**

連寫兩個 `(value) => value + 1`，第一個把 0 變成 1，第二個接到 1 再變成 2。這跟快照那一則的差別，只在有沒有用更新函式。

事件函式裡的 `count` 仍是舊的。更新函式的參數才是佇列裡的下一個值。需要累加、切換布林、或依據上一筆陣列產生新陣列時，都用這個寫法。

```jsx 03-react/src/demos/20-updater.jsx
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
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        加二
      </button>
    </section>
  );
}
```

從 0 按一次，畫面是「次數 2」。Console 仍印出 0，因為那一行讀的是快照。

```text
0
```

**解析**

- 更新函式的參數不是這一次渲染的 `count`，而是佇列裡最新的那一個。
- 兩次加一因此會疊加。快照寫法的兩次設定則會互相覆蓋。
- `console.log(count)` 沒有讀更新函式的參數，所以仍是按下之前的 0。
- 下一輪渲染的 `count` 是 2。再按一次，會從 2 加到 4。

{% note success %}
**換你試試：**
再排第三個更新函式，同樣加一。按一次，畫面應從 0 變成 3。Console 仍是 0。
{% endnote %}

<details>
<summary>參考答案</summary>

三個更新函式依序接到 0、1、2，最後排定的值是 3。

```diff 03-react/src/demos/20-updater.jsx
  // ...
      setCount((value) => value + 1);
      setCount((value) => value + 1);
+     setCount((value) => value + 1);
      console.log(count);
    };
    // ...
```

```text
0
```

</details>

### 批次更新

同一個事件裡的多次設定，React 會收成一次渲染。你不用自己把兩個值拼成一個物件，只為了少畫一次。

**觀念**

名稱與件數在同一個點擊裡各設定一次。元件函式裡的 `console.log` 會在渲染時印出兩個新值。按一次，只多一輪「渲染」，不會先看到名稱變了、件數還是舊的那一輪。

開發時，嚴格模式可能在第一次載入印出兩次相同的起始渲染。那是檢查，不是點了兩下。按下按鈕之後，應只再增加一次。

```jsx 03-react/src/demos/21-batch.jsx
import { useState } from 'react';

export default function BatchDemo() {
  const [name, setName] = useState('筆');
  const [count, setCount] = useState(1);

  console.log('渲染', name, count);

  const onChange = () => {
    setName('紙');
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

按下之後畫面是「紙 × 3」。

```text
渲染 筆 1
渲染 紙 3
```

開發模式第一次載入時，第一行可能連續出現兩次。按下按鈕後，新的那一行只有一次。

**解析**

- 兩次設定發生在同一個事件裡，所以下一次渲染同時看得到新名稱與新件數。
- 渲染時的 `console.log` 印的是這一輪的快照，不是按鈕函式裡的區域變數。
- 不要為了批次而把兩個不相關的值硬併成一個狀態。批次是 React 做的。
- 嚴格模式多跑的那次渲染應算出同樣的畫面。若印出的兩次起始值不同，表示渲染過程改到了外部資料。

{% note success %}
**換你試試：**
按鈕裡把件數改成 5，名稱改成尺。按下後 Console 應多一行「渲染 尺 5」，而且只有這一次新增。
{% endnote %}

<details>
<summary>參考答案</summary>

同一個事件裡的兩個新值會一起出現在下一輪渲染。

```diff 03-react/src/demos/21-batch.jsx
  // ...
    console.log('渲染', name, count);
  
    const onChange = () => {
-     setName('紙');
-     setCount(3);
+     setName('尺');
+     setCount(5);
    };
  
    return (
      // ...
```

```text
渲染 尺 5
```

</details>

### Hooks 規則

Hooks 只在元件或自訂 Hook 的最上層呼叫。每一次渲染的呼叫順序要一樣。條件要包住 Hook 算出來的值，不要包住 Hook 本身。

**觀念**

`useState` 放在 `if` 裡面時，某一次渲染可能少呼叫一次。React 是靠順序把上一輪的狀態對回這一輪的，順序一變，值就會對到別的狀態。

ESLint 的 `react-hooks/rules-of-hooks` 會把這種寫法當成錯誤。這一則把兩個 Hook 放在任何條件之前。有沒有庫存，只影響回傳的那一行字。

```jsx 03-react/src/demos/22-rules.jsx
import { useState } from 'react';

export default function RulesDemo() {
  const [name, setName] = useState('筆');
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
        onClick={() => setName('紙')}
      >
        改成紙
      </button>
    </section>
  );
}
```

一開始是「筆 有庫存」。按下設為缺貨，變成「筆 補貨中」。名稱那顆按鈕仍改得到文字。

**解析**

- 兩個 Hook 都在 `return` 之前、也不在條件裡。每次渲染都會各呼叫一次。
- 庫存判斷寫在 JSX 裡，影響的是畫出來的字，不是 Hook 有沒有被呼叫。
- 迴圈裡呼叫 `useState` 同樣會讓次數不固定。要幾個狀態，就在最上面寫幾個。
- 普通函式不是元件，名稱也不是大寫開頭時，不要在裡面呼叫 Hooks。

{% note success %}
**換你試試：**
把 `setStock(0)` 改成更新函式，讓庫存減 1。按兩次應變成補貨中。Hook 仍留在最上面。
{% endnote %}

<details>
<summary>參考答案</summary>

減一要用上一輪的庫存，所以用更新函式。條件仍只負責選句子。

```diff 03-react/src/demos/22-rules.jsx
  // ...
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
-         onClick={() => setStock(0)}
+         onClick={() => setStock((value) => value - 1)}
        >
          設為缺貨
        // ...
```

從 2 按一次還是有庫存，再按一次庫存是 0，句子變成補貨中。

</details>

## 不可變更新

狀態裡的陣列與物件不能直接改內容。`push`、改某個欄位，都不會穩定地觸發下一輪渲染。要複製一份，在新的那份上留下變更，再交出去。

- 新增時把舊元素展開到新陣列，再接上新的一筆。
- 刪除時用 `filter` 留下不是那一筆的元素。
- 修改時用 `map` 找到那一筆，展開後蓋掉要改的欄位，其他筆原樣放回。
- 巢狀物件要每一層都換新的。只展開最外層時，裡面的物件仍是原來的那一份。

### 陣列新增

備忘從兩則開始。按按鈕時產生新陣列，長度比原來多一。原來的陣列沒有被 `push`。

**觀念**

新陣列先把現有項目攤開，再接上新字串。新字串帶上長度，避免跟舊的文字重複。清單用文字當 `key` 只是因為這一則的文字不會重複。會刪、會改的清單要改用 id，列表那一節會專門看。

```jsx 03-react/src/demos/23-add.jsx
import { useState } from 'react';

export default function AddDemo() {
  const [notes, setNotes] = useState(['買筆', '買紙']);

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

一開始是買筆、買紙。按一次多出「備忘3」。

**解析**

- 展開會複製元素到新陣列。舊陣列的內容不會被這一行改掉。
- 更新函式的 `items` 是排到這一次的陣列。連續點擊也不會用到過期的長度。
- `notes.push(...)` 改的是原陣列。狀態的參考沒換，畫面常常不會更新。
- `sort` 也會改到呼叫它的那一份。要排序時先複製再排。

{% note warning %}
**不要改原陣列**
新增、刪除、排序都交一份新陣列。原陣列留著，這一輪的其他程式才不會看到做到一半的資料。
{% endnote %}

{% note success %}
**換你試試：**
再加一顆按鈕，按下去把備忘變成空陣列。加一則的按鈕留著。
{% endnote %}

<details>
<summary>參考答案</summary>

空清單是新的陣列 `[]`，不是把原陣列的長度改成 0。清空後再加，序號會從 1 重新數。

```diff 03-react/src/demos/23-add.jsx
  // ...
          加一則
        </button>
+       <button
+         type="button"
+         className="ml-2 rounded bg-stone-200 px-3 py-1"
+         onClick={() => setNotes([])}
+       >
+         清空
+       </button>
        <ul className="mt-3 list-disc pl-5">
          {notes.map((note) => (
            // ...
```

</details>

### 陣列刪除

刪除是留下其他筆，不是把那一格挖空。`filter` 回傳的是新陣列，對不上 id 的那一筆不會在裡面。

**觀念**

每一列有自己的刪除按鈕。按下時把那一筆的 id 交給更新函式。`filter` 的條件是「id 不相同才留下」。筆被刪掉之後，紙與尺還在，而且順序不變。

```jsx 03-react/src/demos/24-remove.jsx
import { useState } from 'react';

const initial = [
  { id: 'pen', name: '筆' },
  { id: 'paper', name: '紙' },
  { id: 'ruler', name: '尺' },
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
          <span>{item.name}</span>
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

一開始三列。按下紙的刪除之後，只剩筆與尺。

**解析**

- `filter` 不會改原陣列。它交出一份較短的新陣列。
- 條件用 id，不用名稱。以後兩筆都叫筆時，才不會一次刪掉兩列。
- 箭頭函式把這一列的 id 傳進 `onRemove`。不要寫成 `onClick={onRemove(item.id)}`。
- 刪到最後一筆時，`map` 得到空陣列，清單就是空的，不需要另外把 `<ul>` 拿掉。

{% note success %}
**換你試試：**
刪除改成只留被點到的那一筆，其他筆都拿掉。按紙之後，清單只剩紙。
{% endnote %}

<details>
<summary>參考答案</summary>

條件改成 id 相同才留下。這仍是新陣列，不是把其他元素設成空的。

```diff 03-react/src/demos/24-remove.jsx
  // ...
    const [items, setItems] = useState(initial);
  
    const onRemove = (id) => {
-     setItems((current) => current.filter((item) => item.id !== id));
+     setItems((current) => current.filter((item) => item.id === id));
    };
  
    return (
      // ...
```

</details>

### 陣列修改

修改某一筆時，那一筆要換成新物件，其他筆可以沿用原來的參考。`map` 負責走訪，展開負責複製欄位。

**觀念**

按下「紙改價」時，只有 id 是 `paper` 的那一筆換成價格 45 的新物件。筆與尺仍是原來的物件。畫面三列都還在，紙的數字變了。

不要寫 `item.price = 45`。那是在改狀態裡的原物件，下一輪渲染可能看不出有什麼需要更新。

```jsx 03-react/src/demos/25-edit.jsx
import { useState } from 'react';

const initial = [
  { id: 'pen', name: '筆', price: 25 },
  { id: 'paper', name: '紙', price: 40 },
  { id: 'ruler', name: '尺', price: 15 },
];

export default function EditDemo() {
  const [items, setItems] = useState(initial);

  const onEdit = () => {
    setItems((current) =>
      current.map((item) =>
        item.id === 'paper' ? { ...item, price: 45 } : item,
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
        紙改價
      </button>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

按下之後，中間一列從「紙 40」變成「紙 45」。另外兩列不變。

**解析**

- `map` 的長度與原陣列相同。這一則不是在新增或刪除。
- 對到的那一筆用展開複製，再把 `price` 蓋掉。名稱仍是紙。
- 沒對到的筆直接放回原來的物件。不必每一筆都複製。
- 三元的兩個分支都要是物件。一邊回傳物件、一邊什麼都不回傳，那一格會變成 `undefined`。

{% note success %}
**換你試試：**
同一顆按鈕把紙的名稱也改成「信紙」。價格仍是 45。
{% endnote %}

<details>
<summary>參考答案</summary>

兩個新欄位都寫在展開後面。舊的名稱與價格都會被覆蓋。

```diff 03-react/src/demos/25-edit.jsx
  // ...
      setItems((current) =>
        current.map((item) =>
-         item.id === 'paper' ? { ...item, price: 45 } : item,
+         item.id === 'paper' ? { ...item, name: '信紙', price: 45 } : item,
        ),
      );
    // ...
```

按下之後是「信紙 45」。

</details>

### 物件欄位

改物件的一個欄位時，展開舊物件，再寫上新欄位。只交一個新欄位的物件，其他欄位會消失。

**觀念**

人物有名稱與城市。改城市時，名稱要留在新物件裡。展開放前面、新欄位放後面，同名時才會留下新的城市。

這是巢狀更新的前一步。只有一層時，展開一次就夠。

```jsx 03-react/src/demos/44-object.jsx
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

一開始是「阿光 在 台北」。按下之後變成「阿光 在 台中」。

**解析**

- `profile.city = '台中'` 改的是原物件。不要用這種寫法更新狀態。
- 展開在前、新欄位在後。順序對調就會被舊的城市蓋回去。
- 名稱沒有寫在後面，所以仍是阿光。沒被覆蓋的欄位會保留。
- 更新函式的 `current` 是上一輪的人物。不要改用渲染時的 `profile` 再展開，連續更新才不會蓋掉彼此。

{% note success %}
**換你試試：**
同一顆按鈕除了改城市，也把名稱改成「阿明」。
{% endnote %}

<details>
<summary>參考答案</summary>

兩個新欄位都寫在展開後面。舊的名稱與城市都會被覆蓋。

```diff 03-react/src/demos/44-object.jsx
  // ...
    const [profile, setProfile] = useState({ name: '阿光', city: '台北' });
  
    const onMove = () => {
-     setProfile((current) => ({ ...current, city: '台中' }));
+     setProfile((current) => ({ ...current, name: '阿明', city: '台中' }));
    };
  
    return (
      // ...
```

按下之後是「阿明 在 台中」。

</details>

### 巢狀物件

物件裡還有物件時，要改的那一層與它的每一層父物件都得換成新的。只展開最外層，裡面的地址仍是原來的參考。

**觀念**

人物有名稱，也有一個地址物件。改城市時，先展開人物，再展開地址，最後蓋掉城市。名稱與路名都留在新物件裡。

只寫 `{ ...profile, city: '台南' }` 會把城市放在人物這一層，地址裡的城市仍是舊的，畫面若讀的是 `profile.address.city` 就不會變。

```jsx 03-react/src/demos/26-nested.jsx
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

- 外層展開留下 `name`。沒有這層展開，名稱會消失。
- `address` 被一整個換成新物件。新物件再展開舊地址，所以路名還在。
- `current.address.city = '台南'` 改的是原物件。不要用這種寫法更新狀態。
- 更深的巢狀就繼續一層一個展開。不要為了省事把整包狀態變成可直接改的外部變數。

{% note success %}
**換你試試：**
同一顆按鈕把路名也改成「民生路」。城市仍是台南，名稱仍是阿光。
{% endnote %}

<details>
<summary>參考答案</summary>

路名與城市都寫在地址那一層的展開後面。人物的名稱沒有被覆蓋。

```diff 03-react/src/demos/26-nested.jsx
  // ...
      setProfile((current) => ({
        ...current,
-       address: { ...current.address, city: '台南' },
+       address: { ...current.address, city: '台南', street: '民生路' },
      }));
    };
    // ...
```

按下之後是「阿光 在 台南 民生路」。

</details>

# 事件

使用者的點擊、輸入與送出，都經由事件處理函式進入元件。屬性用 `on` 接事件名，處理函式用 `handle` 接動作。需要額外參數時，用箭頭函式包一層，不要在渲染時就把函式呼叫掉。

## 事件處理函式

處理函式在事件發生時才跑。寫進 `onClick` 的是函式本身。React 會把事件物件交給它。命名分成屬性與函式兩邊，讀的人看得出誰在等事件、誰在做事。

- 屬性叫 `onClick`、onChange、onSubmit。

`on` 後面的事件名用大寫開頭。
- 函式叫 `handleClick`、handleChange、handleSubmit。

同一個動作在子層的參數也可以沿用 `onClick` 這種名字。

### 命名慣例

`onClick` 是 JSX 的屬性。`handleClick` 是你寫的函式。兩邊不要對調，也不要在屬性上立刻呼叫函式。

**觀念**

按下按鈕時，`handleClick` 把文字改成「已記錄」。屬性寫 `onClick={handleClick}`。

若寫成 `onClick={handleClick()}`，渲染到這一行就會執行，而且交給 React 的是回傳值，不是函式。

按鈕要寫 `type="button"`。放在表單裡時，預設的 `submit` 會順便送出表單。

```jsx 03-react/src/demos/27-event.jsx
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

- `handleClick` 沒有在渲染時被呼叫。畫面先畫完，等使用者按下才跑。
- 屬性名稱是 `onClick`，不是 HTML 字串 `'onclick'`。JSX 裡這是一個函式屬性。
- 設定狀態發生在處理函式裡。下一輪渲染才讀得到新的 `label`。
- 一個屬性綁一個函式。要先做兩件事，把兩件事寫進同一個 `handleClick`。

{% note success %}
**換你試試：**
再加一顆按鈕，屬性是 `onClick`，處理函式叫 `handleReset`，按下把文字設回「尚未點」。
{% endnote %}

<details>
<summary>參考答案</summary>

新的處理函式仍是「把函式交給屬性」。不要在 `onClick` 後面加上呼叫括號。

```diff 03-react/src/demos/27-event.jsx
  // ...
      setLabel('已記錄');
    };
  
+   const handleReset = () => {
+     setLabel('尚未點');
+   };
+ 
    return (
      <section>
        // ...
          記錄
        </button>
+       <button
+         type="button"
+         className="ml-2 rounded bg-stone-200 px-3 py-1"
+         onClick={handleReset}
+       >
+         還原
+       </button>
        <p className="mt-2">{label}</p>
      </section>
    // ...
```

</details>

### 事件物件

React 呼叫處理函式時會傳入事件物件。要讀「被點到的那一個元素」時用 `currentTarget`。它是你綁定監聽的那個節點。

**觀念**

`handleClick` 把按鈕上的文字放進狀態，並在 Console 印出事件種類。`currentTarget` 不會因為你點到按鈕裡的子元素就換成別的節點。這一則的按鈕沒有子標籤，文字就是按鈕自己的內容。

```jsx 03-react/src/demos/28-target.jsx
import { useState } from 'react';

export default function TargetDemo() {
  const [label, setLabel] = useState('尚未點');

  const handleClick = (event) => {
    setLabel(event.currentTarget.textContent);
    console.log(event.type);
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={handleClick}
      >
        記錄這顆按鈕
      </button>
      <p className="mt-2">{label}</p>
    </section>
  );
}
```

點一次之後，那段文字變成「記錄這顆按鈕」。

```text
click
```

**解析**

- 參數 `event` 由 React 傳入。你不用在 `onClick` 後面自己寫括號把事件塞進去。
- `event.type` 在點擊時是 `click`。這可以用來確認處理函式真的有跑。
- `currentTarget` 是綁定 `onClick` 的按鈕。

`target` 可能是按鈕裡面更小的節點。
- 渲染的當下不會印出 click。一定要等使用者按下。

{% note success %}
**換你試試：**
Console 除了事件種類，再印出按鈕文字。畫面的那段文字維持不變。
{% endnote %}

<details>
<summary>參考答案</summary>

文字已經在設定狀態時讀過一次。再印一次同一個來源，Console 就會多一行按鈕文字。

```diff 03-react/src/demos/28-target.jsx
  // ...
      setLabel(event.currentTarget.textContent);
      console.log(event.type);
+     console.log(event.currentTarget.textContent);
    };
  
    return (
      // ...
```

```text
click
記錄這顆按鈕
```

</details>

## 參數與預設動作

有時處理函式需要按鈕以外的資料，例如這一列的 id。瀏覽器對表單還有預設動作：按下送出會整頁重新載入。兩件事都在處理函式裡處理。

- 要額外參數時，用箭頭函式包住呼叫，讓渲染時只建立函式、不執行它。
- `preventDefault` 取消這一次事件的預設動作。表單就不會整頁重載，網址也不會被瀏覽器改掉。

### 帶參數

每一顆按鈕對應一個名稱。處理函式收名稱，屬性上用箭頭函式把那個名稱傳進去。

**觀念**

`handlePick` 只負責把收到的名稱放進狀態。兩顆按鈕各寫 `onClick={() => handlePick('筆')}`。

渲染時箭頭函式被建立，但 `handlePick` 還沒跑。點下去才把字串交出去。

不要寫 `onClick={handlePick('筆')}`。

那一行在渲染時就會挑好筆，而且 `onClick` 拿到的是 `undefined`。

```jsx 03-react/src/demos/29-pick.jsx
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
          onClick={() => handlePick('筆')}
        >
          筆
        </button>
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => handlePick('紙')}
        >
          紙
        </button>
      </div>
    </section>
  );
}
```

按下紙之後，上面一行是「選到 紙」。

**解析**

- 箭頭函式的參數是事件物件，這一則用不到，所以留空。真正要的名稱寫在箭頭函式裡面。
- `handlePick` 可以重用。差在每一顆按鈕交出去的字串。
- 渲染時 Console 不該出現選取結果。出現的話，就是在屬性上呼叫了函式。
- 名稱若來自陣列，把那一筆的欄位放進箭頭函式，不要把整個事件當成名稱。

{% note success %}
**換你試試：**
再加一顆按鈕，按下把選取設成尺。`handlePick` 不要複製第二份。
{% endnote %}

<details>
<summary>參考答案</summary>

第三顆按鈕呼叫同一個處理函式，只換傳進去的字串。

```diff 03-react/src/demos/29-pick.jsx
  // ...
            紙
          </button>
+         <button
+           type="button"
+           className="rounded bg-stone-100 px-3 py-1"
+           onClick={() => handlePick('尺')}
+         >
+           尺
+         </button>
        </div>
      </section>
    // ...
```

</details>

### preventDefault

表單的送出有預設動作：瀏覽器會重新載入頁面。處理函式先取消這件事，再讀你放在狀態裡的值。

**觀念**

`handleSubmit` 收到事件物件後第一行就呼叫 `preventDefault`。接著把名稱寫進畫面下方的訊息。網址列不會多出問號，示範頁也不會整頁刷新回第一個按鈕。

輸入框這一則先用受控的寫法：`value` 與 onChange 都綁到 `name`。

表單那一章會把每一種欄位拆開看。

```jsx 03-react/src/demos/30-prevent.jsx
import { useState } from 'react';

export default function PreventDemo() {
  const [name, setName] = useState('筆');
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

按下送出，訊息變成「送出 筆」。網址沒有變，頁面沒有整個重載。

**解析**

- `onSubmit` 綁在 `<form>` 上，不綁在按鈕上。按 Enter 時同樣會跑到這個函式。
- 沒有 `preventDefault` 時，瀏覽器會用預設方式送出，React 這一頁的狀態會跟著重載消失。
- 按鈕的 `type="submit"` 是為了觸發表單。它不是第二個送出邏輯。
- 訊息來自狀態。不要在送出時直接改某個段落的 `textContent`。

{% note success %}
**換你試試：**
送出時改把訊息設成「已收到」加上名稱。仍要先取消預設動作。
{% endnote %}

<details>
<summary>參考答案</summary>

`preventDefault` 留在第一行。後面只換要放進狀態的字串。

```diff 03-react/src/demos/30-prevent.jsx
  // ...
    const handleSubmit = (event) => {
      event.preventDefault();
-     setMessage('送出 ' + name);
+     setMessage('已收到' + name);
    };
  
    return (
      // ...
```

名稱是筆時，訊息是「已收到筆」。

</details>

# 列表與表單

清單用 `map` 把陣列轉成一組元素，再用 `filter` 先拿掉不要的筆。

每一個兄弟要有穩定的 `key`。表單則把欄位的值放進狀態，讓輸入與畫面讀的是同一份資料。

## 列表

陣列在 JavaScript 裡轉換，JSX 只負責把轉換結果放進樹裡。`filter` 與 `map` 可以串在一起：先留下符合條件的，再變成元素。

- `map` 的回傳要是元素，長度與你交出去的陣列相同。
- `filter` 不改原陣列。它先決定哪些筆有資格出現。
- `key` 幫助 React 認出「這一個還是原來的那一筆」。不要用會跟著插入、刪除而改變的 index。

### map

三項商品各有 id。`map` 回傳一列項目。這一則先把每一筆都畫出來，篩選放在下一則。

**觀念**

`products` 寫在元件外面，因為這三筆不會變。元件每次渲染都讀得到同一份陣列。

`map` 的回呼回傳 `<li>`，所以清單的子節點就是這三個元素。

```jsx 03-react/src/demos/31-map.jsx
const products = [
  { id: 'pen', name: '筆', price: 25 },
  { id: 'paper', name: '紙', price: 40 },
  { id: 'ruler', name: '尺', price: 15 },
];

export default function MapDemo() {
  return (
    <ul className="grid gap-2">
      {products.map((item) => (
        <li
          key={item.id}
          className="rounded border border-stone-200 bg-white px-3 py-2"
        >
          {item.name} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

畫面是三列：筆 25、紙 40、尺 15。每一列都是白底邊框。

**解析**

- `map` 寫在花括號裡，因為它的結果是一組元素。
- 回呼的參數 `item` 是陣列裡的一個物件。名稱與價格從欄位讀。
- `key` 寫在 `map` 直接回傳的那個元素上。寫在更裡面的標籤，React 對不到這一層兄弟。
- 陣列是空的時候，`map` 得到空陣列，ul 裡就沒有 li。

{% note success %}
**換你試試：**
陣列再加一筆，id 是 `eraser`，名稱橡皮，價格 10。前三筆留著。
{% endnote %}

<details>
<summary>參考答案</summary>

新的 id 沒有跟舊的重複，所以四列都能各自對上。

```diff 03-react/src/demos/31-map.jsx
  // ...
    { id: 'paper', name: '紙', price: 40 },
    { id: 'ruler', name: '尺', price: 15 },
+   { id: 'eraser', name: '橡皮', price: 10 },
  ];
  
  export default function MapDemo() {
    // ...
```

</details>

### filter

先留下價格低於 30 的商品，再交給 `map`。畫面上就不會出現紙。條件寫在 JavaScript，不寫成「先全部畫出來再用 CSS 藏起來」。

**觀念**

`filter` 回傳新陣列，原 `products` 仍是三筆。

後面的 `map` 只走訪留下的那些。兩個動作串在同一個花括號裡，讀的人看得到先篩再畫。

價格的條件用數字比較。不要把價格先變成字串再比大小。

```jsx 03-react/src/demos/32-filter.jsx
const products = [
  { id: 'pen', name: '筆', price: 25 },
  { id: 'paper', name: '紙', price: 40 },
  { id: 'ruler', name: '尺', price: 15 },
];

export default function FilterDemo() {
  const visible = products.filter((item) => item.price < 30);

  return (
    <ul className="grid gap-2">
      {visible.map((item) => (
        <li key={item.id}>
          {item.name} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

畫面兩列：筆 25、尺 15。紙被留在原陣列裡，沒有進 `visible`。

**解析**

- `filter` 的條件為真才留下。紙的價格是 40，所以不在新陣列裡。
- 原陣列沒有被改掉。下一輪若條件放寬，紙還在。
- `visible` 在渲染時算出來。它不必放進狀態，因為它完全由 `products` 與條件決定。
- `key` 仍用商品 id。篩選之後尺還是 `ruler`，不會因為它變成第二列就換身份。

{% note success %}
**換你試試：**
條件改成價格大於 20。畫面應變成筆與紙，尺消失。
{% endnote %}

<details>
<summary>參考答案</summary>

尺的價格是 15，過不了新的條件。筆與紙留下。

```diff 03-react/src/demos/32-filter.jsx
  // ...
  ];
  
  export default function FilterDemo() {
-   const visible = products.filter((item) => item.price < 30);
+   const visible = products.filter((item) => item.price > 20);
  
    return (
      <ul className="grid gap-2">
        // ...
```

</details>

### 空清單

篩選之後可能一筆都不剩。這種情況要另外回傳一句說明，不要留下一個沒有項目、也沒有解釋的空 `<ul>`。

**觀念**

價格小於 0 的商品在這份資料裡不存在，所以 `visible` 是空陣列。長度是 0 時提早 return 一句話。有資料時才走 `map`。

空陣列是正常結果，不是錯誤。下一篇的讀取失敗會另外用狀態區分。

```jsx 03-react/src/demos/45-empty.jsx
const products = [
  { id: 'pen', name: '筆', price: 25 },
  { id: 'paper', name: '紙', price: 40 },
  { id: 'ruler', name: '尺', price: 15 },
];

export default function EmptyDemo() {
  const visible = products.filter((item) => item.price < 0);

  if (visible.length === 0) {
    return <p>沒有符合的商品。</p>;
  }

  return (
    <ul className="grid gap-2">
      {visible.map((item) => (
        <li key={item.id}>
          {item.name} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

畫面只有一行「沒有符合的商品。」

**解析**

- 長度是 0 才提早 return。不要用 `visible &&` 判斷陣列，空陣列也是真值。
- 說明與清單是兩次不同的回傳。有資料時不會同時看到那句話。
- `filter` 沒有改到原陣列。條件放寬之後，商品還在。
- 這一句是給人看的空狀態。它不是讀取失敗。

{% note success %}
**換你試試：**
條件改成價格小於 30。說明應消失，改出現筆與尺。
{% endnote %}

<details>
<summary>參考答案</summary>

條件放寬後長度不再是 0，函式走到清單那個回傳。

```diff 03-react/src/demos/45-empty.jsx
  // ...
  ];
  
  export default function EmptyDemo() {
-   const visible = products.filter((item) => item.price < 0);
+   const visible = products.filter((item) => item.price < 30);
  
    if (visible.length === 0) {
      return <p>沒有符合的商品。</p>;
    // ...
```

</details>

### key

`key` 讓 React 把狀態對回「同一筆資料」，而不是「現在排在第幾列」。子元件自己的輸入狀態會跟著 key 走。用 index 當 key 時，刪掉前面一列，後面的文字會黏在錯誤的那一列上。

**觀念**

`Row` 自己記得輸入框的文字。父層的清單用 `item.id` 當 key。你在紙那一列打了字，再刪掉筆，紙的文字還在紙旁邊。

若改成 `key={index}`，刪掉第一列之後，原本第二列的元件會被當成第一列重用，文字就黏到剩下的那一列上。身份應該跟著 id，不跟著位置。

```jsx 03-react/src/demos/33-key.jsx
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
    { id: 'pen', label: '筆' },
    { id: 'paper', label: '紙' },
  ]);

  const onRemove = () => {
    setRows((items) => items.filter((item) => item.id !== 'pen'));
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onRemove}
      >
        刪掉筆
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

在紙的輸入框打「甲」。按下刪掉筆之後，畫面上只剩紙，輸入框裡仍是甲。

**解析**

- `key` 寫在 Row 上，因為 Row 才是 map 直接回傳的那個元素。
- id 用資料自己的代號。重新排序後，紙仍是 `paper`。
- `key` 不會變成 DOM 上的屬性。要顯示編號時，另外把編號寫進文字。
- 用 index 當 key，刪掉第一筆時，後面每一筆的 key 都會往前移，輸入框裡的字可能跟著錯位。

{% note success %}
**換你試試：**
把 `key` 暫時改成 `index`，在紙那一列打字再刪掉筆。

看完文字黏到哪一列之後，改回 `item.id`。
{% endnote %}

<details>
<summary>參考答案</summary>

`index` 會讓 React 以為「現在的第 0 列」仍是剛才的第 0 列。筆刪掉之後，紙變成第 0 列，於是沿用了筆那個輸入框的狀態，紙打的字反而留不下來。

改回 id 之後，紙的 key 一直是 `paper`，輸入框的文字跟著紙走。

```jsx 03-react/src/demos/33-key.jsx
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
    { id: 'pen', label: '筆' },
    { id: 'paper', label: '紙' },
  ]);

  const onRemove = () => {
    setRows((items) => items.filter((item) => item.id !== 'pen'));
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onRemove}
      >
        刪掉筆
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

</details>

## 表單欄位

受控欄位的值放在狀態裡。畫面讀狀態，使用者一輸入就用事件把狀態換成新的字串或布林。不同的欄位讀值的方式不一樣。

- `input` 與 textarea 用 value 配 onChange，從 `event.target.value` 讀文字。
- `select` 同樣用 value 對到選項的 value，不是對到畫面上的那一行字。
- `checkbox` 讀 `checked`。

`radio` 用同一份狀態比對每一顆的值。

### input

單行文字的值就是狀態裡的字串。每一次按鍵都換成新字串，輸入框顯示的永遠是狀態，不是瀏覽器自己記的那一份。

**觀念**

`value={name}` 讓輸入框變成受控。沒有 `onChange` 時，使用者打字不會更新狀態，畫面會像卡住。

`event.target.value` 是這一刻輸入框裡的整段文字，不是只有新按下的那一個鍵。

```jsx 03-react/src/demos/34-input.jsx
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

還沒打字時，下面是「目前：尚未填」。打上筆之後，變成「目前：筆」。

**解析**

- 空字串是合法的受控值。不要用 `undefined` 當 `value`，那會讓輸入框在受控與非受控之間切換。
- `onChange` 在每一個輸入時發生，不只有失焦的時候。
- 下面那一行讀的是同一個 `name`。輸入框與文字不會各記各的。
- `name || '尚未填'` 在空字串時顯示提示。0 不會出現在這個欄位，所以這裡可以用或運算。

{% note success %}
**換你試試：**
起始值改成筆。打開頁面時輸入框裡就有筆，下面一行也是筆。
{% endnote %}

<details>
<summary>參考答案</summary>

起始值只影響第一次。之後仍由 `onChange` 更新。

```diff 03-react/src/demos/34-input.jsx
  import { useState } from 'react';
  
  export default function InputDemo() {
-   const [name, setName] = useState('');
+   const [name, setName] = useState('筆');
  
    return (
      <section>
        // ...
```

</details>

### textarea

多行文字的寫法與單行輸入框相同，都是 `value` 配 `onChange`。不要把要顯示的文字放在開始標籤與結束標籤中間，那是 HTML 的寫法，在受控元件裡不會跟著狀態走。

**觀念**

備註放在 `note`。輸入框用 `<textarea value={note} />`。換行也是字串的一部分，狀態裡會保留使用者按下的換行。

```jsx 03-react/src/demos/35-area.jsx
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

打開時文字區裡是「第一行」，下面是「字數 3」。再打一個字，字數變成 4。

**解析**

- `value` 放在屬性上。標籤中間不要再塞一份預設文字。
- `rows` 只影響高度。它不是狀態，這一則沒有讓使用者改列數。
- `note.length` 在渲染時算出來。字數不必另存一個狀態。
- 清空時把狀態設成空字串。不要去呼叫文字區的 DOM 方法。

{% note success %}
**換你試試：**
加一顆按鈕，按下把備註設成空字串。字數應變成 0。
{% endnote %}

<details>
<summary>參考答案</summary>

按鈕只更新 `note`。字數跟著下一輪渲染重算。

```diff 03-react/src/demos/35-area.jsx
  // ...
          className="rounded border px-2 py-1"
        />
+       <button
+         type="button"
+         className="rounded bg-stone-200 px-3 py-1"
+         onClick={() => setNote('')}
+       >
+         清空
+       </button>
        <p>字數 {note.length}</p>
      </section>
    // ...
```

</details>

### select

下拉選單的 `value` 對到某個 `<option value="...">`。

畫面上的「台北」是給人看的，狀態裡存的是 `taipei`。

**觀念**

`city` 起始是 `taipei`，所以打開時選在台北。

`onChange` 仍從 `event.target.value` 讀，讀到的是選項的 value，不是標籤中間的文字。

沒有任何選項的 value 與狀態相同時，React 會在開發時提出警告。起始值要對到一個真的選項。

```jsx 03-react/src/demos/36-select.jsx
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

打開時下面是「代碼 taipei」。改選台南之後變成 `tainan`。

**解析**

- `value` 在 select 上，不在每一個 option 上用 `selected`。
- 選項的 `value` 用你程式裡的代碼。顯示文字可以是中文。
- 狀態換了，選單會自己跳到對應的選項。不必再找 DOM 去設 `selectedIndex`。
- 這一則只有兩個城市。要加第三個，就再加一個 `<option>`，並確定 value 不重複。

{% note success %}
**換你試試：**
加一個選項，value 是 `taichung`，文字是台中。選了之後代碼那一行應是 taichung。
{% endnote %}

<details>
<summary>參考答案</summary>

新選項的 value 就是會進狀態的字串。顯示文字只出現在選單上。

```diff 03-react/src/demos/36-select.jsx
  // ...
          <option value="taipei">台北</option>
          <option value="tainan">台南</option>
+         <option value="taichung">台中</option>
        </select>
        <p className="mt-3">代碼 {city}</p>
      // ...
```

</details>

### checkbox

核取方塊的狀態是布林。

讀 `event.target.checked`，綁定用 checked，不要用 value 記住有沒有勾。

**觀念**

`gift` 為真時顯示「要禮盒」。

勾選時 `checked` 是 true，取消時是 false。

`value` 這一則沒有用來保存勾選，因為勾選不是一段文字。

```jsx 03-react/src/demos/37-check.jsx
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
        加禮盒
      </label>
      <p className="mt-3">{gift ? '要禮盒' : '不包禮盒'}</p>
    </section>
  );
}
```

一開始是「不包禮盒」。勾起來之後變成「要禮盒」。再點一次回到不包。

**解析**

- `checked` 必須是布林。不要把字串 `'on'` 放進去。
- `onChange` 讀 `checked`。

讀 `value` 會拿到輸入框的 value 屬性，不是勾選狀態。
- 標籤包住輸入框時，點文字也會切換。`htmlFor` 那一則是另一種綁法。
- 畫面下方的句子由同一個布林決定。不要再存一份「要禮盒」的文字狀態。

{% note success %}
**換你試試：**
起始值改成 `true`。打開頁面時應已勾選，文字是要禮盒。
{% endnote %}

<details>
<summary>參考答案</summary>

起始布林改成真。事件仍把使用者的下一次勾選寫回狀態。

```diff 03-react/src/demos/37-check.jsx
  import { useState } from 'react';
  
  export default function CheckDemo() {
-   const [gift, setGift] = useState(false);
+   const [gift, setGift] = useState(true);
  
    return (
      <section>
        // ...
```

</details>

### radio

同一組選項共用一個狀態。每一顆的 `checked` 是「狀態是否等於我的值」。點任何一顆，都把狀態設成那一顆的值。

**觀念**

`unit` 起始是 `piece`。

第一顆的 `checked` 為真，第二顆為假。兩顆都叫同一個 `name`，瀏覽器才把它們當同一組。真正決定畫面的仍是 React 的狀態，不是瀏覽器記住的那一顆。

```jsx 03-react/src/demos/38-radio.jsx
import { useState } from 'react';

export default function RadioDemo() {
  const [unit, setUnit] = useState('piece');

  return (
    <fieldset>
      <label className="mr-4">
        <input
          type="radio"
          name="unit"
          checked={unit === 'piece'}
          onChange={() => setUnit('piece')}
        />
        件
      </label>
      <label>
        <input
          type="radio"
          name="unit"
          checked={unit === 'box'}
          onChange={() => setUnit('box')}
        />
        盒
      </label>
      <p className="mt-3">單位 {unit}</p>
    </fieldset>
  );
}
```

打開時單位那一行是 `piece`。點盒之後變成 `box`，件那一顆不再勾選。

**解析**

- 兩顆的 `checked` 來自同一份 `unit`。不會兩顆同時為真。
- `onChange` 寫成設定固定的值。這一則不必讀 `event.target.value`，因為值已經寫在那一顆上。
- `name` 相同讓鍵盤與瀏覽器把它們當一組。React 的狀態才是你之後送出時要讀的那一份。
- 要加第三顆時，再比對一個新的字串，並在點擊時設定那個字串。

{% note success %}
**換你試試：**
加一顆「打」，值是 `dozen`。點了之後，下面一行應是 dozen。
{% endnote %}

<details>
<summary>參考答案</summary>

第三顆用同一個狀態。

`checked` 只有在 unit 等於 dozen 時為真。

```diff 03-react/src/demos/38-radio.jsx
  // ...
          件
        </label>
-       <label>
+       <label className="mr-4">
          <input
            type="radio"
            // ...
          盒
        </label>
+       <label>
+         <input
+           type="radio"
+           name="unit"
+           checked={unit === 'dozen'}
+           onChange={() => setUnit('dozen')}
+         />
+         打
+       </label>
        <p className="mt-3">單位 {unit}</p>
      </fieldset>
    // ...
```

</details>

## 送出表單

多個欄位可以收在同一個物件裡，欄位的 `name` 對到物件的鍵。送出時讀這份物件。標籤與輸入框的 id 用 `useId` 產生，避免同一頁有兩份表單時 id 撞在一起。

- 物件欄位用一個 `onChange` 依 `event.target.name` 更新對應的鍵。
- `handleSubmit` 先 `preventDefault`，再使用這一份物件。
- `useId` 每呼叫一次給一組穩定的 id。

把它接到 `htmlFor` 與 `id`。

### 多欄位物件

名稱與價格分屬物件的兩個鍵。一個 `handleChange` 服務兩個輸入框，靠輸入框的 `name` 決定改哪一鍵。

**觀念**

更新時展開舊物件，再用計算屬性蓋掉被改的那一鍵。另一鍵留著。這跟巢狀物件是同一件事，只是欄位都在第一層。

兩個輸入框都受控。價格這一則先當字串，送出前若要做算術再轉成數字。不要在每打一個字時就轉，否則空字串會變成 0，使用者會刪不掉。

```jsx 03-react/src/demos/39-fields.jsx
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

在名稱打筆、價格打 25，下面一行變成「筆 25」。

**解析**

- 輸入框的 `name` 必須是狀態物件裡的鍵。寫錯就會多出一個你沒在畫面上讀的鍵。
- `[name]` 是計算屬性。它用變數的值當鍵，不是用字面的 `"name"`。
- 展開放在前面，新鍵放在後面，另一個欄位才不會被清掉。
- 兩個輸入框共用 `handleChange`。不必每個欄位各寫一個幾乎一樣的函式。

{% note success %}
**換你試試：**
物件再加一個鍵 `unit`，起始是空字串，並加一個對應的輸入框。打「盒」時，下面一行也要看得到。
{% endnote %}

<details>
<summary>參考答案</summary>

新鍵靠同一個 `handleChange` 更新。

輸入框的 `name` 寫成 `unit`。

```diff 03-react/src/demos/39-fields.jsx
  import { useState } from 'react';
  
  export default function FieldsDemo() {
-   const [form, setForm] = useState({ name: '', price: '' });
+   const [form, setForm] = useState({ name: '', price: '', unit: '' });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      // ...
          className="rounded border px-2 py-1"
        />
+       <input
+         name="unit"
+         value={form.unit}
+         onChange={handleChange}
+         placeholder="單位"
+         className="rounded border px-2 py-1"
+       />
        <p>
-         {form.name || '未填'} {form.price}
+         {form.name || '未填'} {form.price} {form.unit}
        </p>
      </section>
    // ...
```

</details>

### submit

送出時不要再去問 DOM 裡的輸入框。狀態物件就是要送出的那一份。先取消預設動作，再把結果寫到畫面上。

**觀念**

`handleSubmit` 用名稱與價格組成一句話。兩個輸入框的更新仍走 `handleChange`。

送出按鈕是 `type="submit"`，表單綁 `onSubmit`。

這一則只把結果留在畫面。下一篇才把同一份物件送到網路上。

```jsx 03-react/src/demos/40-submit.jsx
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

名稱填筆、價格填 25，按下送出，訊息是「筆 25」。網址不變。

**解析**

- `preventDefault` 放在讀狀態之前。頁面沒重載，訊息才留得住。
- 訊息用的是送出當下的 `form`。這是這一次事件的快照，夠用，因為送出只讀一次。
- 輸入過程中 `message` 不會跟著變。它只在送出時更新。
- 不要在送出時用 `document.querySelector` 再讀一次輸入框。狀態已經有了。

{% note success %}
**換你試試：**
名稱是空的時候不要更新訊息，改把訊息設成「請填名稱」。有名稱時仍送出原本那句。
{% endnote %}

<details>
<summary>參考答案</summary>

空字串在送出時擋下來。兩個輸入框的受控寫法不用改。

```diff 03-react/src/demos/40-submit.jsx
  // ...
    const handleSubmit = (event) => {
      event.preventDefault();
+     if (!form.name) {
+       setMessage('請填名稱');
+       return;
+     }
      setMessage(form.name + ' ' + form.price);
    };
    // ...
```

</details>

### useId

`useId` 產生這一輪元件專用的 id。

把它接到標籤的 `htmlFor` 與輸入框的 `id`，點標籤就會聚焦到那一格。同一頁有兩份元件時，兩組 id 不會撞在一起。

**觀念**

每呼叫一次 `useId` 得到一個字串。名稱與價格各要一組，所以呼叫兩次，而且兩次都在元件最上面。不要把 `useId` 放進迴圈或條件。

id 的值不要自己寫死成 `name`。另一個元件若也寫 `name`，點標籤會聚焦到頁面上第一個同 id 的輸入框。

```jsx 03-react/src/demos/43-useid.jsx
import { useId, useState } from 'react';

export default function UseIdDemo() {
  const nameId = useId();
  const priceId = useId();
  const [name, setName] = useState('');

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
          className="mt-1 block w-full rounded border px-2 py-1"
        />
      </div>
    </form>
  );
}
```

點「名稱」兩個字，焦點進到第一個輸入框。點「價格」則進到第二個。用開發者工具看，兩個 id 不會都叫 name。

**解析**

- `htmlFor` 必須與輸入框的 `id` 相同。只寫其中一個，點文字不會聚焦。
- 兩次 `useId` 的結果不同。不要把同一個 id 接到兩個輸入框。
- `useId` 的結果在這顆元件的生命裡是穩定的。不要把它放進狀態再改。
- 價格這一格先示範標籤綁定。要讓它受控時，再加一份狀態與 `value`。

{% note success %}
**換你試試：**
讓價格也受控，狀態放在 `price`，起始是空字串。

標籤的 `htmlFor` 仍用 `priceId`。
{% endnote %}

<details>
<summary>參考答案</summary>

第二個欄位補上 `value` 與 `onChange`。

id 繼續用 `useId` 的結果，不要改回寫死的字串。

```diff 03-react/src/demos/43-useid.jsx
  // ...
    const priceId = useId();
    const [name, setName] = useState('');
+   const [price, setPrice] = useState('');
  
    return (
      <form className="grid max-w-sm gap-3">
        // ...
          <input
            id={priceId}
+           value={price}
+           onChange={(event) => setPrice(event.target.value)}
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        // ...
```

</details>

# 本篇重點回顧

- 元件是回傳元素的函式。渲染算出這一次的元素，提交才寫進畫面。
- 資料從父層用 props 往下流。子層要改資料時，呼叫父層傳下來的函式。狀態放在用得到它的共同父層。
- JSX 的花括號放表達式。條件可以用提早 return、三元或 `&&`，數字 0 不要直接放在 `&&` 左邊。
- `className` 寫類別，`style` 寫駝峰物件。多個兄弟又不想多包一層時用 Fragment。
- 狀態是快照。同一個事件裡要累加，用更新函式。陣列與物件都交一份新的值。
- 事件屬性用 `onClick` 這種名字。要參數就包一層箭頭函式，表單送出要 `preventDefault`。
- 列表用 `map` 畫出，key 用穩定的 id。表單欄位受控，多欄位可以收成一個物件，標籤 id 用 `useId`。

# 專有名詞中英對照

## 認識 React

- 框架（framework）
- 重排（reflow）
- 重繪（repaint）
- 宣告式（declarative）
- 命令式（imperative）
- 漸進式框架（progressive framework）
- 單檔元件（Single-File Component、SFC）
- 模板（template）
- 模板指令（template directive）
- Vue 狀態管理（Pinia）
- Vue 全端框架（Nuxt）
- Vue 介面元件庫（Element Plus）
- Vue 介面元件庫（Vuetify）
- 響應式程式庫（RxJS）
- Angular 狀態管理（NgRx）
- Angular 介面元件庫（Angular Material）
- React 狀態管理（Zustand）
- React 狀態管理（Redux Toolkit）
- React 介面元件庫（MUI）
- React 介面元件庫（Ant Design）
- 函式庫（library）
- JSX
- 使用者介面（user interface）
- View
- 元件（component）
- 元件化（component-based）
- 單頁應用（Single Page Application、SPA）
- 語法糖（syntactic sugar）

## 建立專案

- 元件（Component）
- JSX
- 渲染（render）
- 提交（commit）
- 嚴格模式（Strict Mode）
- 單向資料流（one-way data flow）
- Thinking in React
- props
- React 開發者工具（React Developer Tools）
- 專案範本（project template）
- 專案產生器（project generator）
- 熱更新（Hot Module Replacement、HMR）
- Vite 的 defineConfig（defineConfig，from vite）
- ESLint
- ESLint 的 defineConfig（defineConfig，from eslint/config）

## JSX

- Fragment
- 條件渲染（conditional rendering）
- 表達式（expression）

## 元件

- 預設匯出（default export）
- 具名匯出（named export）
- 解構（destructuring）
- 子元素（children）

## 狀態

- 狀態（state）
- 快照（snapshot）
- Hook
- 更新函式（updater function）
- 批次更新（batching）

## 事件

- 事件處理函式（event handler）
- 預設動作（default action）

## 列表與表單

- 鍵（key）
- 受控元件（controlled component）
- 表單（form）
