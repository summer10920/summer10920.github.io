---
title: '[框架課程] React 19 教學（一）- 環境安裝與準備'
categories:
  - 職訓教材
  - ReactJS
tag:
  - JavaScript 程式設計（假日班）
date: 2025-10-15 13:09:14
hidden: false
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

## 快速測試：使用 React 18+ CDN

這種方式很適合用來快速練習或理解 React 的基本概念。官方也提供了一份 [React 線上測試 HTML 範例](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html)，結合 CDN 以及 Babel Standalone 來轉譯 JSX，方便立即練習。但由於需要瀏覽器即時進行轉譯，效能相對低落，**只推薦用於課程學習和原型測試，不適合任何正式專案**。

{% note warning %}
**不推薦用於生產環境：**
- ❌ 瀏覽器需要即時編譯 JSX，效能極差
- ❌ 無法使用 npm 套件
- ❌ 沒有程式碼分割和優化
- ✅ 僅適合學習或快速原型測試
{% endnote %}

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <title>React 19 CDN 測試</title>
    <!-- React 18+ 核心函式庫（開發版，React 19 CDN 尚未正式釋出，以下先用 React 18 做練習） -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- Babel Standalone（將 JSX 轉換成 JavaScript） -->
    <!-- ⚠️ 警告：僅供學習使用，正式環境必須使用建置工具！ -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    
    <!-- type="text/babel" 告訴 Babel 需要轉譯這段程式碼 -->
    <script type="text/babel">
      function MyApp() {
        return (
          <div>
            <h1>Hello, React 19! 🎉</h1>
            <p>這是使用 CDN 方式載入的 React 應用</p>
          </div>
        );
      }

      // React 18+ 的渲染方式（React 19 相容）
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
<!DOCTYPE html>
<html lang="zh-TW">
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

  <!-- type="text/babel" 告訴 Babel 這裡的 JS 有 JSX 語法需要轉譯處理 -->
  <script type="text/babel">
    function MyApp() {
      // 使用 useState Hook 管理狀態，初始狀態為 false
      const [isClicked, setIsClicked] = React.useState(false);

      // 條件渲染：根據狀態顯示不同內容
      if (isClicked) {
        return <h1>這是你的第一次點擊！</h1>;
      }
      
      return (
        <h1 onClick={() => setIsClicked(true)}>
          點擊我試試看！
        </h1>
      );
    }

    // React 18+ 的渲染方式（React 19 完全相容）
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<MyApp />);
  </script>
</body>
</html>
```

{% note info %}
**React 18+ 的 Concurrent Mode：**

React 18 開始引入 Concurrent Mode（並發模式），使用 `ReactDOM.createRoot` API 取代舊的 `ReactDOM.render`，提供更好的效能和靈活性，特別是在處理非同步更新時：

```javascript
// ✅ React 18+ / React 19 正確方式
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyApp />);

// ❌ React 17 舊方式（已廢棄，不建議使用）
ReactDOM.render(<MyApp />, document.getElementById('root'));
```

**Concurrent Mode 的優勢：**
- ⚡ 更流暢的 UI 更新（可中斷渲染）
- 🔄 自動批次處理（Automatic Batching）
- 📊 更好的優先級管理
- 🎯 支援 Suspense 和 Transitions
{% endnote %}

### 不使用 JSX 的寫法

如果不想使用 Babel 來編寫 React，可以完全使用 `React.createElement` 方法來建立元件。這是 JSX 背後的真實運作方式 —— JSX 最終都會被編譯成 `React.createElement` 呼叫。不過，這種寫法會比使用 JSX 語法糖來得繁瑣，也較不直觀。

```html cdn-of-index-without-JSX.html
<!DOCTYPE html>
<html lang="zh-TW">
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
      // 使用 useState Hook 管理狀態
      const [isClicked, setIsClicked] = React.useState(false);

      // 條件渲染
      if (isClicked) {
        // React.createElement（標籤名，屬性物件，子元素。..)
        return React.createElement('h1', null, '這是你的第一次點擊！');
      }
      
      // React.createElement（標籤名，屬性物件（包含事件處理）, 子元素。..)
      return React.createElement(
        'h1', 
        { onClick: () => setIsClicked(true) }, 
        '點擊我試試看！'
      );
    }

    // React 18+ 的渲染方式
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(MyApp));
  </script>
</body>
</html>
```

**JSX vs React.createElement 對照：**

```javascript
// JSX 寫法（需要 Babel）
<div className="container">
  <h1>Hello</h1>
  <p>World</p>
</div>

// 編譯後的 React.createElement 寫法
React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'World')
)
```

{% note warning %}
**為什麼推薦使用 JSX？**

雖然理論上可以不使用 JSX，但實務上幾乎沒有人這樣做：
- ❌ 程式碼冗長難讀
- ❌ 巢狀結構非常複雜
- ❌ 容易出錯
- ✅ JSX 更直觀、更接近 HTML

**了解 `React.createElement` 的價值：**
- 理解 JSX 的本質（只是語法糖）
- 除錯時看懂編譯後的程式碼
- 理解 React 的底層運作

但在實際開發中，請務必使用 JSX！
{% endnote %}

## 部署 Node.js 開發環境

Node.js 是基於 Chrome V8 JavaScript 引擎的執行環境，讓 JavaScript 可以在瀏覽器之外運行。對於 React 開發而言，Node.js 是必備工具，因為：

**為什麼 React 開發需要 Node.js？**
- 📦 **套件管理**：使用 npm 或 pnpm 安裝 React 及相關套件
- 🔧 **建置工具**：Vite、Webpack、Babel 等工具都需要 Node.js 運行
- 🚀 **開發伺服器**：提供熱模組替換（HMR）的開發體驗
- 📝 **程式碼轉譯**：將 JSX、TypeScript 轉換成瀏覽器可執行的程式碼
- 🎯 **生產建置**：打包優化後的程式碼供部署使用

{% note info %}
**Node.js 不等於後端開發！**

雖然 Node.js 可以用來開發後端服務，但在 React 開發中，Node.js 主要是作為**前端建置工具的執行環境**。你不需要會寫 Node.js 後端程式也能開發 React 應用。
{% endnote %}

### 為什麼需要版本管理工具？

你可以直接從 [Node.js 官網](https://nodejs.org/en) 下載安裝檔，但這樣做會遇到問題：

**直接安裝的問題：**
- ❌ 一台電腦只能安裝一個 Node.js 版本
- ❌ 舊專案可能需要舊版本 Node.js
- ❌ 新專案可能需要新版本 Node.js
- ❌ 切換版本需要重新安裝，非常麻煩
- ❌ 不同專案的套件可能有版本相依性問題

**版本管理工具的優勢：**
- ✅ 一台電腦可安裝多個 Node.js 版本
- ✅ 快速切換不同版本（幾秒鐘）
- ✅ 每個專案可使用不同版本
- ✅ 團隊協作時確保環境一致

![官方提供的下載方式](/assets/images/2025-01-19-12-46-26.png)

### 推薦的版本管理工具
我們都希望透過一個工具來讓電腦可以安裝多個 Node 版本。這樣在指定的專案執行前，我們只需透過工具做切換，讓電腦的 Node 可以抽換指定的 Node 版本。

#### 🌟 nvs (Node Version Switcher) - 最推薦新手使用

**為什麼推薦 nvs？**
- ✅ 支援 Windows、macOS、Linux 三大平台
- ✅ 互動式介面，直觀易用
- ✅ 無需複雜設定，安裝即用
- ✅ 指令簡單好記

**安裝方式：**
1. 前往 [nvs GitHub](https://github.com/jasongin/nvs) 下載安裝檔
2. 執行安裝程式
3. 重新開啟終端機
4. 輸入 `nvs` 確認安裝成功

安裝完成後，直接在終端機輸入 `nvs`，就會出現互動式選單，可以直接選擇安裝或切換 Node 版本：

![nvs 互動式介面](/assets/images/2025-01-19-14-06-17.png)

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

**LTS vs Current 版本選擇：**
- **LTS（Long Term Support）**：長期支援版本，穩定可靠，適合正式專案
- **Current**：最新功能版本，可能有未知 bug，適合嘗鮮或測試
- **建議：新手和正式專案請使用 LTS 版本**
{% endnote %}

#### 🚀 其他版本管理工具

**nvm (Node Version Manager)**
- 最老牌的 Node 版本管理工具
- 僅支援 macOS 和 Linux
- Windows 需使用 [nvm-windows](https://github.com/coreybutler/nvm-windows)
- 指令：`nvm install 20`, `nvm use 20`

**fnm (Fast Node Manager)**
- 超快速的版本管理工具（Rust 開發）
- 支援所有平台
- 需要手動設定 PATH 和 Shell
- 適合進階使用者
- 指令：`fnm install 20`, `fnm use 20`

{% note success %}
**新手建議：**
如果你是第一次設定 Node.js 環境，強烈建議使用 **nvs**。它的互動式介面最友善，不需要記憶複雜指令，也不需要手動設定環境變數。等熟悉後再考慮其他工具也不遲。
{% endnote %}

### 安裝套件管理器：pnpm

設定好 Node.js 版本後，接下來需要安裝**套件管理器**。Node.js 預設提供 npm，但我們推薦使用更現代、更高效的 **pnpm**。

#### 什麼是套件管理器？

套件管理器（Package Manager）負責「下載、安裝、更新、管理」專案所需的各種第三方套件（如 React、Vite 等）。想像它是一個「軟體商店」，幫你自動處理套件之間的相依性。

#### npm vs pnpm 詳細比較

| 特性              | npm                | pnpm                  |
| ----------------- | ------------------ | --------------------- |
| 安裝速度          | 慢                 | 超快（2-3 倍快）      |
| 硬碟空間          | 重複儲存，浪費空間 | 全域共用，節省 50-70% |
| node_modules 大小 | 極大（可達數 GB）  | 小（使用符號連結）    |
| 依賴管理          | 扁平化，可能衝突   | 嚴謹，避免幽靈依賴    |
| 學習成本          | -                  | 極低（指令幾乎相同）  |
| 生態支援          | 官方預設           | 主流專案廣泛採用      |

**什麼是幽靈依賴（Phantom Dependencies）？**

npm 會將所有套件「扁平化」安裝在 `node_modules` 根目錄，導致你可以 import 根本沒有在 `package.json` 聲明的套件。這會造成：
- 專案在別人電腦上無法執行（缺少隱含依賴）
- 套件升級時意外破壞功能

pnpm 使用嚴格的依賴管理，只能 import 明確聲明的套件，避免上述問題。

#### 安裝 pnpm

**步驟 1：確認 Node.js 版本**
```bash
# 使用 nvs 切換到 LTS 版本
nvs use lts

# 確認版本（建議 18.0 以上）
node -v
```

**步驟 2：全域安裝 pnpm**
```bash
# 全域安裝 pnpm（只需執行一次）
npm install -g pnpm

# 確認安裝成功
pnpm -v
```

![安裝 pnpm](/assets/images/2025-01-19-14-54-17.png)

{% note success %}
**pnpm 指令與 npm 對照：**

| 操作         | npm 指令              | pnpm 指令                    |
| ------------ | --------------------- | ---------------------------- |
| 安裝套件     | `npm install`         | `pnpm install` 或 `pnpm i`   |
| 新增套件     | `npm install react`   | `pnpm add react`             |
| 新增開發套件 | `npm install -D vite` | `pnpm add -D vite`           |
| 移除套件     | `npm uninstall react` | `pnpm remove react`          |
| 執行腳本     | `npm run dev`         | `pnpm dev` 或 `pnpm run dev` |
| 更新套件     | `npm update`          | `pnpm update`                |

**小技巧：** pnpm 執行腳本時可省略 `run`，例如 `pnpm dev` 即可。
{% endnote %}

{% note info %}
**為什麼 React 19 專案推薦 pnpm？**

1. **效能提升**：React 19 搭配 Vite，pnpm 的快速安裝能讓開發更流暢
2. **專案品質**：嚴格的依賴管理避免隱藏問題
3. **業界趨勢**：主流開源專案（Vite、Vue、Nuxt 等）都已改用 pnpm
4. **團隊協作**：一致的 `node_modules` 結構，減少「在我電腦能跑」的問題

安裝一次，終身受益！
{% endnote %}

## 使用 Vite 建立 React 19 專案

### 什麼是 Vite？

**Vite**（法語「快」的意思，發音為 /vit/）是新一代的前端建置工具，由 Vue.js 作者尤雨溪（Evan You）開發。React 官方從 React 18 開始推薦使用 Vite 取代舊的 Create React App（CRA）。

**Vite 的核心優勢：**

| 特性       | Vite              | Create React App (CRA) |
| ---------- | ----------------- | ---------------------- |
| 啟動速度   | ⚡ 極快（< 1 秒）  | 🐢 慢（5-10 秒）        |
| 熱更新速度 | ⚡ 即時（< 100ms） | 🐢 慢（1-3 秒）         |
| 建置工具   | Rollup（輕量）    | Webpack（笨重）        |
| 開發模式   | ESM 原生支援      | 需預先打包             |
| 配置複雜度 | 簡單              | 複雜（需 eject）       |
| 生態支援   | 主流推薦          | 已不再維護             |

**Vite 的運作原理：**

{% mermaid graph LR %}
    A["開發模式<br/>Dev Server"]
    B["瀏覽器<br/>原生 ESM"]
    C["即時編譯<br/>On-Demand"]
    D["生產模式<br/>Build"]
    E["Rollup<br/>打包優化"]
    F["優化後的<br/>靜態檔案"]
    
    A --> B
    B --> C
    D --> E
    E --> F
{% endmermaid %}

- **開發模式**：直接使用瀏覽器原生 ES Modules，不需預先打包，啟動極快
- **生產模式**：使用 Rollup 打包優化，產生高效能的靜態檔案

{% note warning %}
**Create React App (CRA) 已不推薦使用！**

React 官方已不再推薦 Create React App（CRA），原因：
- ❌ 啟動和熱更新速度慢
- ❌ 配置複雜，需要 `eject` 才能自訂
- ❌ 已長期不更新，不支援最新功能
- ❌ 打包後的檔案體積大

**請使用 Vite！** 這是 React 19 官方推薦的建置工具。
{% endnote %}

### 建立 React 19 + Vite 專案

**步驟 1：建立專案**

打開終端機（Terminal），輸入以下指令：

```bash
pnpm create vite
```

接著會出現互動式問答：

1. **專案名稱（Project name）**：輸入專案名稱，例如 `my-react-app`
2. **選擇框架（Select a framework）**：選擇 `React`
3. **選擇變體（Select a variant）**：選擇 `JavaScript` 或 `JavaScript + SWC`

![Vite 建立專案流程](/assets/images/2025-01-19-14-55-17.gif)

{% note info %}
**JavaScript vs JavaScript + SWC，該選哪個？**

- **JavaScript**：使用 Babel 編譯，穩定成熟，適合新手
- **JavaScript + SWC**：使用 SWC 編譯，速度更快（2-20 倍），適合大型專案

**SWC（Speedy Web Compiler）是什麼？**
- 用 Rust 開發的超高速編譯器
- 編譯速度比 Babel 快 20 倍以上
- 支援多執行緒編譯
- React 19 + Vite 完美支援

**建議：**
- 新手學習：選 `JavaScript`（錯誤訊息更詳細）
- 正式專案：選 `JavaScript + SWC`（效能更好）

兩者使用方式完全相同，只是編譯器不同！
{% endnote %}

**步驟 2：進入專案目錄並安裝套件**

```bash
# 進入專案目錄
cd my-react-app

# 安裝所有依賴套件
pnpm install

# 啟動開發伺服器
pnpm dev
```

![啟動 Vite 開發伺服器](/assets/images/2025-01-19-16-03-24.png)

**步驟 3：開啟瀏覽器**

開發伺服器啟動後，會顯示本地網址（通常是 `http://localhost:5173/`），在瀏覽器開啟即可看到 React 應用！

{% note success %}
**開發伺服器的特性：**
- ⚡ **熱模組替換（HMR）**：修改程式碼時，畫面即時更新，不會重新載入整個頁面
- 🔍 **即時錯誤提示**：語法錯誤會直接顯示在瀏覽器上
- 📊 **效能監控**：可以看到每個模組的載入時間
- 🎯 **自動開啟瀏覽器**：啟動時可自動開啟預設瀏覽器

**常用開發指令：**
```bash
pnpm dev          # 啟動本地開發伺服器，支援熱更新（HMR），即時預覽程式碼修改
pnpm build        # 將專案編譯、優化成生產用靜態檔案（輸出至 dist/ 目錄）
pnpm preview      # 在本地啟動預覽 Web Server 伺服器，載入 dist/ 目錄下的檔案，模擬正式建置後的網站效果
```
{% endnote %}

### Vite 專案結構解析

建立完成後，專案目錄結構如下：

```
my-react-app/
├── node_modules/       # 套件依賴目錄（pnpm 管理）
├── public/             # 靜態資源目錄
│   └── vite.svg       # 公開的靜態檔案（不經過編譯）
├── src/                # React 原始碼目錄
│   ├── assets/        # 資源檔案（會被編譯優化）
│   │   └── react.svg
│   ├── App.css        # App 元件樣式
│   ├── App.jsx        # 主要元件
│   ├── index.css      # 全域樣式
│   └── main.jsx       # 應用程式入口
├── .gitignore          # Git 忽略檔案設定
├── eslint.config.js    # ESLint 配置
├── index.html          # HTML 模板（唯一的 HTML 檔）
├── package.json        # 專案配置和依賴清單
├── pnpm-lock.yaml      # pnpm 鎖定版本檔案
├── README.md           # 專案說明文件
└── vite.config.js      # Vite 配置檔案
```

**重要目錄和檔案說明：**

| 目錄/檔案        | 用途      | 說明                                                                  |
| ---------------- | --------- | --------------------------------------------------------------------- |
| `public/`        | 靜態資源  | 放置不需編譯的檔案（如 favicon、robots.txt），可直接透過 `/` 路徑存取 |
| `src/`           | 原始碼    | React 元件、樣式、邏輯都放這裡，會經過編譯和優化                      |
| `src/main.jsx`   | 入口檔案  | 應用程式的起點，負責渲染根元件到 DOM                                  |
| `src/App.jsx`    | 主元件    | 預設的主要元件，可自由修改                                            |
| `index.html`     | HTML 模板 | SPA 的唯一 HTML 檔案，`<div id="root">` 是 React 掛載點               |
| `package.json`   | 專案配置  | 記錄依賴套件、腳本指令、專案資訊                                      |
| `vite.config.js` | Vite 配置 | 自訂建置規則、外掛、路徑別名等                                        |
| `dist/`          | 建置輸出  | 執行 `pnpm build` 後生成，包含優化後的靜態檔案                        |

{% note warning %}
**public/ vs src/assets/ 的差異：**

- public/：檔案會原封不動複製到 `dist/`，不經過編譯
  - 適合：favicon.ico、robots.txt、不需優化的第三方檔案
  - 存取方式：`/vite.svg`（根路徑）
  
- src/assets/：檔案會經過 Vite 編譯優化
  - 適合：圖片、字型、CSS 等需要優化的資源
  - 存取方式：`import logo from './assets/react.svg'`
  - 優勢：自動壓縮、hash 檔名（防快取）、死碼消除

**建議：** 除非有特殊需求，一般資源都放 `src/assets/`，享受自動優化！
{% endnote %}

## 擴展開發工具
在開發大型應用程式時，推薦額外安裝與整合多種輔助型開發工具，可以大幅提升開發效率、減少重複性錯誤，並統一團隊內的程式碼風格。本單元將介紹一些常見且實用的 React 開發搭配工具，協助你建立更專業、可維護的技術環境。

### React Developer Tools（瀏覽器擴充套件）

[React Developer Tools](https://react.dev/learn/react-developer-tools) 是一個能在開發上獲得更好的檢查工具，可透過加裝 [Chrome 擴充工具](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) 協助我們開發過程上對於資料流的掌握不需要一直 console 出來看。

**主要功能：**
- 🔍 檢視元件樹狀結構
- 📊 查看 Props 和 State 的即時變化
- 🎯 追蹤 Hooks 的執行狀態
- ⚡ 分析元件渲染效能
- 🐛 快速定位問題元件

{% note success %}
**安裝建議：**
React 開發必裝！安裝後在瀏覽器的開發者工具（F12）會多出 **Components** 和 **Profiler** 兩個分頁，可以即時查看 React 元件的狀態和效能。
{% endnote %}

### VSCode 擴充套件推薦

以下是 React 開發時強烈推薦的 VSCode 擴充套件，能大幅提升開發效率：

#### 🎯 必裝套件

**1. ES7+ React/Redux/React-Native snippets**
- **作者：** dsznajder
- **功能：** 提供大量 React 程式碼片段快捷鍵
- **常用快捷鍵：**
  - `rfce` → 建立函式元件（附 export）
  - `rafce` → 建立箭頭函式元件（附 export）
  - `useState` → 快速插入 useState Hook
  - `useEffect` → 快速插入 useEffect Hook
- **為什麼需要：** 大幅減少重複輸入，提升開發速度

**2. Auto Rename Tag**
- **作者：** Jun Han
- **功能：** 自動重新命名成對的 HTML/JSX 標籤
- **範例：** 修改 `<div>` 時自動同步修改 `</div>`
- **為什麼需要：** 避免標籤不配對的錯誤

**3. Auto Close Tag**
- **作者：** Jun Han
- **功能：** 自動補全閉合標籤
- **範例：** 輸入 `<div>` 自動補上 `</div>`
- **為什麼需要：** 減少手動輸入，避免遺漏閉合標籤

**4. Prettier - Code formatter**
- **作者：** Prettier
- **功能：** 自動格式化程式碼，統一程式碼風格
- **設定建議：** 啟用「Format On Save」自動儲存時格式化
- **為什麼需要：** 團隊協作必備，確保程式碼風格一致

**5. ESLint**
- **作者：** Microsoft
- **功能：** 即時檢查程式碼錯誤和潛在問題
- **特點：** 顯示錯誤提示、語法警告、最佳實踐建議
- **為什麼需要：** 提早發現錯誤，養成良好編碼習慣

#### 💡 進階推薦套件

**6. ES6 Code Snippets**
- **作者：** charalampos karypidis
- **功能：** 提供 ES6+ 語法快捷鍵
- **常用快捷鍵：**
  - `imp` → `import moduleName from 'module'`
  - `imd` → `import { } from 'module'`
  - `exp` → `export default`
  - `fof` → `for...of` 迴圈
- **為什麼需要：** 加速現代 JavaScript 語法撰寫

**7. Console Ninja**
- **作者：** WallabyJs
- **功能：** 在編輯器內直接顯示 console.log 結果
- **特點：** 不用切換到瀏覽器就能看到 log 輸出
- **為什麼需要：** 極大提升除錯效率

**8. Error Lens**
- **作者：** Alexander
- **功能：** 將錯誤和警告直接顯示在程式碼行末
- **特點：** 不用移到問題面板就能看到錯誤訊息
- **為什麼需要：** 即時發現問題，減少來回切換

**9. Path Intellisense**
- **作者：** Christian Kohler
- **功能：** 自動補全檔案路徑
- **範例：** 輸入 `import './` 自動顯示可用檔案
- **為什麼需要：** 避免路徑打錯，加速檔案引入

**10. GitLens — Git supercharged**
- **作者：** GitKraken
- **功能：** 強化 Git 功能，顯示程式碼作者和修改歷史
- **特點：** 可以看到每行程式碼是誰、何時寫的
- **為什麼需要：** 團隊協作時追蹤程式碼變更

#### 🎨 UI/UX 增強套件

**11. Material Icon Theme**
- **作者：** Philipp Kief
- **功能：** 為檔案和資料夾提供美觀的圖示
- **特點：** 快速辨識檔案類型
- **為什麼需要：** 提升視覺辨識度，更容易找到檔案

**12. Indent Rainbow**
- **作者：** oderwat
- **功能：** 為縮排添加彩色標記
- **特點：** 更容易看出程式碼層級
- **為什麼需要：** 減少縮排錯誤，提升可讀性

**13. Highlight Matching Tag**
- **作者：** vincaslt
- **功能：** 高亮顯示配對的 HTML/JSX 標籤
- **特點：** 游標移到標籤時，自動標記對應的開始/結束標籤
- **為什麼需要：** 快速找到標籤配對，避免結構混亂

#### 🔧 React 專屬套件

**14. vscode-styled-components**
- **作者：** Styled Components
- **功能：** 為 styled-components 提供語法高亮和自動補全
- **適用對象：** 使用 CSS-in-JS 的開發者
- **為什麼需要：** 在 JS 檔案中撰寫 CSS 時獲得完整支援

**15. Tailwind CSS IntelliSense**
- **作者：** Tailwind Labs
- **功能：** Tailwind CSS 自動補全和語法提示
- **適用對象：** 使用 Tailwind CSS 的開發者
- **為什麼需要：** 不用記住所有 class 名稱，大幅提升效率

{% note info %}
**快速安裝設定**

你可以在 VSCode 中按下 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>（macOS: <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>）開啟擴充套件面板，直接搜尋套件名稱安裝。

**Prettier 設定建議（settings.json）：**
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "prettier.semi": true,
  "prettier.singleQuote": true,
  "prettier.tabWidth": 2
}
```

**ESLint 設定建議（.eslintrc.json）：**
Vite 建立的 React 專案會自動產生，通常不需要額外設定。
{% endnote %}

{% note success %}
**新手建議安裝順序：**
1. 先裝「必裝套件」（1-5）
2. 熟悉後再加裝「進階推薦」（6-10）
3. 根據專案需求選裝「UI/UX」和「React 專屬」套件

不用一次全裝，太多套件可能影響 VSCode 效能。建議根據實際需求逐步添加。
{% endnote %}

# 參考文獻
- [採用 SWC 取代 Babel，大幅提升編譯速度](https://medium.com/dcardlab/%E6%8E%A1%E7%94%A8-swc-%E5%8F%96%E4%BB%A3-babel-%E5%A4%A7%E5%B9%85%E6%8F%90%E5%8D%87%E7%B7%A8%E8%AD%AF%E9%80%9F%E5%BA%A6-802d9cd0db35)
- [Getting Started | Vite](https://vite.dev/guide/)
- [Installation – React](https://react.dev/learn/installation)
- [Windows 系统中 FnM 的安装与配置详述-易源 AI 资讯 | 万维易源](https://www.showapi.com/news/article/678062aa4ddd79f11a1b8758)