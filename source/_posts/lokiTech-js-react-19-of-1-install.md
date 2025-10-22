---
title: '[框架課程] React 19 教學（一）- 環境安裝與準備'
categories:
  - 職訓教材
  - ReactJS
tag:
  - JavaScript 程式設計（假日班）
date: 2025-10-15 13:09:14
hidden: true
---
![](assets/images/banner/react.png)
React 是由 Meta（前 Facebook）所主導開發的 JavaScript 函式庫，採用元件化（Component-based）的設計思維，讓開發者能以可重用的元件來構建使用者介面。與 Angular 類似都強調元件化開發，但與 Vue.js 的 MVVM 模式不同，React 將所有邏輯（資料、事件、渲染）都整合在元件內部。

<!-- more -->

React 專注於「View 層」的渲染與更新，透過虛擬 DOM（Virtual DOM）和單向資料流（Unidirectional Data Flow）的機制，讓 UI 更新更加高效且可預測。雖然 React 常被稱為「框架」，但它的核心其實只是一個 UI 函式庫，大部分功能仍需要依賴 JavaScript 原生能力來完成。這使得 React 成為「最自由的框架」，但也意味著你需要扎實的 JavaScript 基礎。

# 關於 React
本篇系列文章採用最新的 **React 19** 版本進行教學。React 19 引入了許多新功能和改進，包括新的 Hooks（如 `useActionState`、`useOptimistic`）、改進的 Server Components 支援、以及更好的效能優化。不同版本的 React 在 API 和功能上可能有差異，請特別注意你學習和使用的版本。

## React 19 新功能亮點

React 19 是一個重大更新版本，帶來了許多令人興奮的新功能：

**核心改進**
- **React Compiler（實驗性）**：自動優化元件渲染，減少手動優化需求
- **新的 Hooks**：`useActionState`、`useOptimistic` 等專為非同步操作設計的 Hooks
- **Server Components 穩定版**：更好的伺服器端渲染支援
- **Actions 機制**：簡化表單處理和非同步操作
- **Ref 作為 Prop**：不再需要 `forwardRef`，直接傳遞 `ref`
- **文件 Metadata**：支援在元件中直接定義 `<title>`、`<meta>` 等標籤
- **資源預載**：改進的資源載入機制

**效能優化**
- 更快的初始渲染速度
- 更小的打包體積
- 改進的 Hydration 機制

{% note info %}
**學習建議：**
雖然 React 19 帶來許多新功能，但核心概念（元件、Props、State、Hooks）保持不變。本系列課程會先介紹基礎概念，再逐步深入新功能。
{% endnote %}

## 生態工具

React 本身只是一個 UI 函式庫，實際專案開發通常會搭配豐富的生態系工具：

**狀態管理**
- **Zustand**：輕量級狀態管理（推薦新專案使用）
- **Redux Toolkit**：Redux 的現代化版本
- **Jotai / Recoil**：原子化狀態管理

**路由管理**
- **React Router**：最流行的路由解決方案（v6+ 大幅改進）
- **TanStack Router**：type-safe 的路由工具

**UI 元件庫**
- **shadcn/ui**：基於 Radix UI 的現代元件庫（推薦）
- **Material-UI (MUI)**：Google Material Design 風格
- **Ant Design**：企業級 UI 元件庫

**全端框架**
- **Next.js 15**：最流行的 React 全端框架，支援 SSR、SSG、ISR
- **Remix**：專注於 Web 標準的全端框架
- **Vite**：極速的開發工具（本課程使用）

**資料獲取**
- **TanStack Query（React Query）**：強大的資料獲取和快取工具
- **SWR**：Vercel 出品的資料獲取 Hook
- **Apollo Client**：GraphQL 客戶端

{% note success %}
**新手建議：**
先專注學習 React 核心概念，等基礎穩固後再逐步接觸這些工具。本課程會優先介紹最實用的工具。
{% endnote %}

## React 核心特性

### 1. 元件化開發（Component-Based）
React 的一切都圍繞著「元件」展開。每個元件都是一個獨立、可重用的 UI 單元，包含自己的邏輯、樣式和渲染邏輯。

```javascript
// 一個簡單的元件
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// 元件可以組合使用
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
```

**優勢：**
- ✅ 程式碼可重用，減少重複開發
- ✅ 容易維護和測試
- ✅ 團隊協作更容易（各自負責不同元件）

### 2. JSX 語法（JavaScript XML）
JSX（JavaScript XML）是一種 JavaScript 的語法擴充，讓你可以在 JavaScript 內直接撰寫看起來類似 HTML 的標記語法。瀏覽器本身無法直接執行 JSX，必須透過像是 Babel 這類轉譯工具將 JSX 編譯成標準的 JavaScript 程式碼，讓 React 可以正確渲染與執行。

```javascript
// JSX 語法（開發時寫的）
const element = <h1 className="title">Hello World</h1>;

// JSX 透過 Babel 編譯後的 JavaScript 寫法（供瀏覽器執行）
const element = React.createElement('h1', { className: 'title' }, 'Hello World');
```

**為什麼使用 JSX？**
- 📝 更直觀：看起來像 HTML，容易理解
- 🔍 更安全：自動跳脫 XSS 攻擊
- ⚡ 更高效：編譯時優化

{% note info %}
**什麼是 XSS？**

XSS（跨站腳本攻擊）是指攻擊者在網頁注入惡意 JavaScript 程式碼，造成資料外洩或畫面被竄改。例如：
- 在留言輸入欄貼上 `<script>alert('XSS')</script>`
- 在圖片標籤使用 `<img src="x" onerror="alert('XSS!')">`

React JSX 會自動跳脫內容，降低 XSS 風險。但如果用 `dangerouslySetInnerHTML`，仍需小心來源安全。
{% endnote %}

{% note warning %}
**注意：**
JSX 不是 HTML！有一些語法差異：
- 使用 `className` 而不是 `class`
- 使用 `htmlFor` 而不是 `for`
- 所有標籤必須閉合（如 `<img />`, `<br />`）
- 屬性使用駝峰命名（如 `onClick`, `onChange`）
{% endnote %}

### 3. 虛擬 DOM（Virtual DOM）
React 不直接操作真實 DOM，而是維護一個「虛擬 DOM」的 JavaScript 物件樹。當狀態改變時，React 會：

1. 建立新的虛擬 DOM 樹
2. 與舊的虛擬 DOM 比較（Diffing）
3. 計算出最小的變更（Reconciliation）
4. 只更新需要改變的真實 DOM 部分

{% mermaid graph LR %}
    A["State<br/>狀態改變"]
    B["產生新的<br/>虛擬 DOM"]
    C["Diff<br/>比較"]
    D["最小化更新<br/>真實 DOM"]
    A --> B --> C --> D
{% endmermaid %}

**優勢：**
- ⚡ 效能：批次更新，減少 DOM 操作
- 🎯 精準：只更新變化的部分
- 🔄 可預測：單向資料流，容易追蹤變化

### 4. Hooks（函式元件的超能力）
從 React 16.8 開始引入，讓函式元件也能使用 state 和其他 React 功能。React 19 進一步擴展了 Hooks 的能力。

```javascript
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // State Hook
  
  useEffect(() => {
    document.title = `Count: ${count}`; // Effect Hook
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

**為什麼使用 Hooks？**
- ✅ 更簡潔：不需要 Class 的複雜語法
- ✅ 更靈活：邏輯可以抽取成自定義 Hooks
- ✅ 更易懂：沒有 `this` 的困擾

{% note info %}
**Class 元件已過時：**
雖然 React 仍然支援 Class 元件，但官方已不再推薦使用。本課程完全使用現代的函式元件 + Hooks 方式教學。如果遇到舊專案的 Class 元件，需要額外學習。
{% endnote %}

### 5. 單向資料流（Unidirectional Data Flow）
React 的資料只能從父元件流向子元件（通過 Props），子元件不能直接修改父元件的資料。

{% mermaid graph TD %}
    A["Parent Component<br/>（State 狀態）"]
    B["Child Component<br/>（Read Only）"]
    A -- Props --> B
    B -- Event --> A
    A["Parent Component<br/>（Update State）"]
{% endmermaid %}

**優勢：**
- 🔍 容易追蹤資料變化
- 🐛 更容易除錯
- 📊 資料流向清晰可預測

# 安裝方式

React 的開發環境設置有多種方式，從簡單的 CDN 引入到完整的專案建置工具。本節將介紹最常用的方法。

## React 的核心檔案

React 主要包含兩個核心函式庫：
- **react**：React 的核心邏輯（元件、Hooks、狀態管理等）
- **react-dom**：負責將 React 元件渲染到瀏覽器 DOM

如果要使用 JSX 語法，還需要編譯工具（如 Babel 或 Vite）將 JSX 轉換成瀏覽器能理解的 JavaScript。

## 方式一：使用 React 18+ CDN（快速測試用）

這種方式很適合用來快速練習或理解 React 的基本概念。官方也提供了一份[React 線上測試 HTML 範例](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html)，結合 CDN 以及 Babel Standalone 來轉譯 JSX，方便立即練習。但由於需要瀏覽器即時進行轉譯，效能相對低落，**只推薦用於課程學習和原型測試，不適合任何正式專案**。

{% note warning %}
**不推薦用於生產環境：**
- ❌ 瀏覽器需要即時編譯 JSX，效能極差
- ❌ 無法使用 npm 套件
- ❌ 沒有程式碼分割和優化
- ✅ 僅適合學習或快速原型測試
{% endnote %}

```html index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React 19 CDN 測試</title>
    <!-- React 18+ 核心函式庫（開發版，React 19 CDN 尚未正式釋出，以下先用 React 18 做練習） -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    
    <!-- Babel Standalone（將 JSX 轉換成 JavaScript） -->
    <!-- ⚠️ 警告：不要在正式環境使用！ -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    
    <!-- type="text/babel" 告訴 Babel 需要轉譯這段程式碼 -->
    <script type="text/babel">
      function MyApp() {
        return <h1>Hello, React 19!</h1>;
      }

      // React 18+ 的渲染方式
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<MyApp />);
    </script>
  </body>
</html>
```

{% note info %}
**React 18+ 的渲染變化：**
React 18 開始引入 Concurrent Mode，使用 `createRoot` API 取代舊的 `ReactDOM.render`：

```javascript
// ✅ React 18+ 正確方式
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// ❌ React 17 舊方式（已不推薦）
ReactDOM.render(<App />, document.getElementById('root'));
```
{% endnote %}

接下來，我們試著在這個簡單範例用 React 做一個 click 事件替換文字。以下故意呈現 JSX 的便利性。我們調整 script 內容。之後章節會再好好介紹 JSX。

### 使用 JSX 的寫法
透過 Babel 的 JSX 來設計，就會非常簡單。但要特別宣告`type="text/babel"` 讓 Babel 知道哪個 JS 代碼需要做 JSX 轉譯。

```html cdn-of-index-with-JSX.html
<head>
  <meta charset="UTF-8" />
  <title>Hello World</title>
  <!-- 開發版 -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Don't use this in production: -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

<body>
  <div id="root"></div>

  <!-- 告知 Babel 這裡的 JS 有 JSX 語法需要轉譯處理 -->
  <script type="text/babel">
    function MyApp() {
      const [lokiClick, setLokiClick] = React.useState(false); // 使用 Hooks 管理狀態，初始狀態 false

      if (lokiClick) {
        return <h1>I am your first click!</h1>;
      }
      return <h1 onClick={() => setLokiClick(true)}>Hello, world!</h1>;
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<MyApp />);
  </script>
</body>
```

> React 18 引入 Concurrent Mode 的 API，使用 `ReactDOM.createRoot` 提供了更好的性能和更高的靈活性，特別是在處理異步。在版本 17 以前不支援此作法，而是直接渲染例如 `ReactDOM.render(<MyApp />, document.querySelector('#root'))`

### 不使用 JSX 的寫法
如果不想使用 Babel 來編寫 React，可以完全利用 `React.createElement` 方法來建立元件，這等同於 React 幫你手動呼叫瀏覽器的 `document.createElement`、`document.createTextNode` 和 `element.addEventListener` 等底層函式。不過，這種寫法會比使用 JSX 語法糖來得繁瑣，也較不直觀。

```html cdn-of-index-without-JSX.html
<head>
  <meta charset="UTF-8" />
  <title>Hello World</title>
  <!-- 開發版 -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Don't use this in production: -->
  <!-- <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script> -->
</head>

<body>
  <div id="root"></div>
  <script type="text/javascript">
    function MyApp() {
      const [lokiClick, setLokiClick] = React.useState(false); // 使用 Hooks 管理狀態，初始狀態 false

      if (lokiClick) {
        return React.createElement('h1', null, 'I am your first click!');  // 參數分別為 (標籤名、屬性、子元素)
      }
      return React.createElement('h1', { onClick: () => setLokiClick(true) }, 'Hello, world!'); // 參數分別為 (標籤名、屬性包含點擊事件、子元素)
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(MyApp));
  </script>
</body>
```

## 部屬 NodeJS
NodeJS 是一種 Chrome V8 JavaScript 引擎的環境工具，能讓電腦成為 JavaScript 執行環境。Node.js 有龐大的 NPM（Node Package Manager）生態系統，可以快速安裝和使用第三方模組，提升開發效率。一些前端框架整合工具（如 Vite、Webpack、Babel 等）都依賴於 Node.js 安裝和管理運行。

### 直接安裝或版本管理工具
首先需要在電腦上 [安裝 NodeJS](https://nodejs.org/en)，安裝完成後整個全局環境上。此電腦的命令提示字元就能使用 node 相關指令。新專案下，安裝時通常版本會選擇 LTS 穩定常用的版本，而不會選擇 Current 當前最新的版本。如下圖，官方示範了如何用透過版本管理工具 command 指令安裝，或是直接下載安裝。

![官方提供的下載方式](/assets/images/2025-01-19-12-46-26.png)

但通常我們不會直接下載安裝，因為每個專案創立所使用的 Node 版本不同。如果在較新的 Node 版本上執行舊專案時，有可能會導致專案無法啟用成功（專案內套件有版本相依問題）。

因此我們都希望透過一個工具來讓電腦可以安裝多個 Node 版本。這樣在指定的專案執行前，我們只需透過工具做切換，讓電腦的 Node 可以抽換指定的 Node 版本。

較為有名的工具為 [nvm(Node Version Manager)](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)。但是僅適用於 Linux 或 macOS 系統，也有人為了 Windows 而開發了 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)。

但個人推薦新手的是另一套 [nvs(Node Version Switcher)](https://github.com/jasongin/nvs) 作為工具使用。他有比較易懂的介面直接操作快速上手。**不論選擇哪種**都只是一個 Node 版本管理工具，都不影響專案開發的使用。

> 目前比較熱門受討論的工具為 [fnm(Fast Node Manager)](https://github.com/Schniz/fnm)，擁有極快的執行效率。但初始設定上需要額外一些 PATH 與 shell 設定步驟。因此建議有興趣且對環境參數熟悉的人可自行了解。

你可以透過下載並安裝完畢後。直接於終端機輸入`nvs`，就能選擇安裝或執行任何 Node 版本。要切換也是輸入相同指令。還有更多指令技巧可以自行研究。

![](/assets/images/2025-01-19-14-06-17.png)

{% note info %}
**nvs 常用指令**
安裝完 nvs 後，以下是最常用的指令：

```bash
nvs use 20.11.0        # 切換到指定版本（僅限當前終端機）
nvs use lts            # 切換到最新 LTS 版本
nvs use latest         # 切換到最新版本

nvs link 20.11.0       # 設定預設的 Node 版本（全域生效）
nvs link lts           # 設定最新 LTS 為預設版本

nvs ls                 # 列出所有已安裝的 Node 版本
nvs current            # 顯示當前使用的版本

nvs rm 20.11.0         # 移除指定版本
nvs unlink             # 移除預設版本設定

node -v                # 查看 Node 版本
npm -v                 # 查看 npm 版本
```

**專案特定版本管理：**
在專案目錄下可以建立 `.node-version` 檔案，nvs 會自動使用指定版本：
```bash
# 在專案根目錄建立 .node-version
echo "20.11.0" > .node-version

# 進入專案目錄時，nvs 會自動切換到該版本
cd my-project
nvs auto on            # 啟用自動切換功能
```

**小技巧：**
- 使用 `nvs link` 設定預設版本後，每次開啟新的終端機都會自動使用該版本
- `nvs use` 只影響當前終端機，關閉後會恢復為預設版本
- 建議在專案開始前先用 `nvs link` 設定好常用的 LTS 版本
{% endnote %}

### 安裝 pnpm
接下來，使用 VSCode 準備好一個新專案目錄之上層位置。

- 使用 `nvs` 指令，選擇一個 Node 版本。
- 選擇好你指定的 Node 版本環境，確認指令為 `node -v`。
- 我們需要在全局`g`上面額外安裝 pnpm 工具。讓整台電腦 Node 隨時可以接受 pnpm 指令。（一次就好，以後不用在此 Node 上安裝）

![](/assets/images/2025-01-19-14-54-17.png)

## 使用 Vite (CLI)
CLI 是一種能夠快速建立 React 開發所需要的伺服器環境與轉譯系統。React 18 開始改推薦使用提供 [Vite](https://vite.dev/) 的 CLI 工具。能無腦的解決環境應用進行開發出一個 SPA（單頁應用程序）的專案，推薦新手學習快樹初始化一個 SPA 專案環境。

使用 Vite 開發模式下時直接利用瀏覽器原生支持的 ESModules，无需預打包（早期很多都利用 webpack 來打包），啟動速度極快。而在 Building 生成時，使用 Rollup 進行打包，類似於 Webpack 的用途，但更輕量。

> 在 React 17 版本以前推薦的 CLI 工具為 create-react-app （可另簡稱為 React cli 或為 CRA 工具），Create React App 本身僅包含了 webpack 與 babel 的前端建置管道，不提供任何後端服務功能，且 18 版本開始已經不再作為推薦方法。

使用 Vite 部屬 React 的第一步環境。在 node 指令上操作：

- 輸入指令`pnpm create vite`
- 命名一個名稱做為下層專案目錄。
- 選擇 React 為前端框架工具。
- 選擇最基本的 JavaScript。（也可以選擇 JavaScript+SWC，他會採用另一種更高快的編譯方式，開發操作上無差異）。

![](/assets/images/2025-01-19-14-55-17.gif)

- 照畫面提示的三道指令輸入
- `cd react-learn`，或者直接 VScode 直接重新開啟此目錄。
- `pnpm install`，避免遺漏套件，重新檢查安裝所需的模組套件。
- `pnpm run dev`，執行開發模式，產生及改及看的虛擬服務。

![](/assets/images/2025-01-19-16-03-24.png)

> 在 package.json 內可以看到細節，以及 scripts 腳本指令，例如輸入`pnpm dev`代表輸入`pnpm vite`。

此時會獲得一個網站網址為`http://localhost:5173/`，並且已經存在一個範例用的專案應用網站。透過這個目錄的內部層級檔案各用途說明：

- **public:**
作為公共區域，通常會把一些靜態資源例如圖片放置在這裡。
- **src:**
為 React 程式集中區，包含 React 會 import 的 css 也放在這，舉例看到一些 JSX 格式的檔案，以及 CSS 檔案。
- **dist:**
如果要將專案正式發佈到線上環境，透過`pnpm build`進行建置作業，會產生該目錄（產生瀏覽器看得懂的純 HTML、JS、CSS 專案目錄）。

## 擴展開發工具
[React Developer Tools](https://react.dev/learn/react-developer-tools) 是一個能在開發上獲得更好的檢查工具，可透過加裝 [Chrome 擴充工具](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) 協助我們開發過程上對於資料流的掌握不需要一直 console 出來看。

# 參考文獻
- [採用 SWC 取代 Babel，大幅提升編譯速度](https://medium.com/dcardlab/%E6%8E%A1%E7%94%A8-swc-%E5%8F%96%E4%BB%A3-babel-%E5%A4%A7%E5%B9%85%E6%8F%90%E5%8D%87%E7%B7%A8%E8%AD%AF%E9%80%9F%E5%BA%A6-802d9cd0db35)
- [Getting Started | Vite](https://vite.dev/guide/)
- [Installation – React](https://react.dev/learn/installation)
- [Windows 系统中 FnM 的安装与配置详述-易源 AI 资讯 | 万维易源](https://www.showapi.com/news/article/678062aa4ddd79f11a1b8758)