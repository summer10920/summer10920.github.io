---
title: '[框架課程] React 19 教學（二）- 基礎語法與核心概念'
categories:
  - 職訓教材
  - ReactJS
tag:
  - JavaScript 程式設計（假日班）
date: 2025-10-17 13:09:14
hidden: true
---
![](assets/images/banner/react.png)

本篇將深入探討 React 19 的核心概念與實作技巧，從 Vite 專案結構開始，逐步介紹 JSX 語法、元件設計、Props 傳遞、事件處理到狀態管理。透過實際範例，你將學會如何建構可重用的元件、管理應用程式狀態，以及掌握現代 React 開發的最佳實踐。

<!-- more -->

# 了解專案環境

相較於 CDN 載入方式，使用 Vite 建立的 React 專案已經內建完整的開發環境。Vite 會自動處理 JSX 轉換、模組打包、熱更新等工作，讓我們專注在應用程式開發上。本章節將從 Vite 預設產生的專案結構開始，逐步了解 React 19 的核心觀念。

## 根元件（Root Component）

React 應用程式採用 **SPA（Single Page Application，單頁應用程式）** 架構，整個網站只會載入一個 `index.html` 檔案，所有的頁面切換和內容更新都透過 JavaScript 動態完成，不需要重新載入頁面。

在 Vite 專案中，`index.html` 是整個應用的入口點，它只包含一個掛載點 `<div id="root"></div>` 和一個 JavaScript 模組引入 `<script type="module" src="/src/main.jsx"></script>`。React 會在這個掛載點渲染整個應用程式。

```html index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

{% note info %}
**為什麼使用 `.jsx` 副檔名？**

`.jsx` 副檔名明確告訴 Vite 這個檔案包含 JSX 語法，需要進行特殊處理。雖然 Vite 也能處理 `.js` 檔案中的 JSX，但使用 `.jsx` 能讓檔案用途更清晰，也方便編輯器提供更好的語法高亮和自動補全。
{% endnote %}

### main.jsx - 應用程式入口

`/src/main.jsx` 是整個 React 應用的入口檔案，負責初始化並渲染根元件。讓我們逐步了解每個部分的作用：

**📌 核心概念說明：**

1. **StrictMode（嚴格模式）**
   - React 19 的開發輔助工具，用於檢測潛在問題
   - 檢測不安全的生命週期、過時的 API 使用
   - 在開發模式下會**故意執行元件兩次**，幫助發現副作用問題
   - 只在開發環境生效，生產環境會自動移除

2. **createRoot（建立根節點）**
   - React 18+ 引入的新 API，取代舊的 `ReactDOM.render`
   - 啟用 Concurrent Mode（並行模式），支援更好的效能優化
   - 語法：`createRoot(DOM 元素）.render(React 元件）`

3. **CSS 匯入**
   - React 元件可以直接匯入 CSS 檔案
   - 父元件的樣式會影響所有子元件（CSS 繼承特性）
   - Vite 會自動處理 CSS 的打包和熱更新

4. **模組匯入簡化**
   - Vite 支援省略 `.jsx` 副檔名
   - 會自動依序尋找 `.js`、`.jsx`、`.json` 檔案
   - 例：`import App from './App'` 會自動找到 `App.jsx`

5. **虛擬 DOM 渲染**
   - `render` 方法會建立虛擬 DOM 樹
   - React 透過 Diff 演算法比較變化
   - 只更新實際改變的 DOM 部分，提升效能

```jsx /src/main.jsx
import { StrictMode } from 'react'; // 引入 StrictMode 用於開發環境的嚴格檢查
import { createRoot } from 'react-dom/client'; // React 18+ 的新 API
import './index.css'; // 引入全域 CSS 樣式
import App from './App'; // 引入主應用元件（省略副檔名， Vite 會自動解析出 .jsx）

// 建立 React 根節點並渲染應用
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

{% note warning %}
**React 18+ 重要變更：**

```javascript
// ✅ React 18+ 正確寫法（啟用 Concurrent Mode）
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// ❌ React 17 舊寫法（已不推薦）
ReactDOM.render(<App />, document.getElementById('root'));
```

**關鍵差異：**
- **Concurrent Mode**：React 18+ 預設啟用，支援自動批次更新、Suspense 等新特性
- **更好的效能**：可中斷渲染，優先處理使用者互動
- **未來兼容性**：React 19 的新功能都基於 createRoot API
{% endnote %}

{% note success %}
**JSX 轉換改進（React 17+）：**

從 React 17 開始，你不再需要在每個檔案中 `import React`：

```javascript
// ✅ React 17+ 不需要這樣宣告
// import React, { useState, useEffect } from 'react';

// 只需匯入使用到的 Hooks 或工具
import { useState, useEffect } from 'react';

function MyComponent() {
  return <div>Hello</div>; // JSX 會自動轉換，不需要 React 在作用域中
}
```

React 16 以前，因為 Babel 編譯 JSX 時會直接呼叫 `React.createElement`，所以每個使用 JSX 的檔案都必須手動寫上 `import React from 'react';`，確保 React 在作用域。自 React 17 起，Babel 或 SWC 等現代編譯器會自動注入轉換函式，讓你不必再手動引入 React，JSX 可以直接使用，開發流程更簡潔。
{% endnote %}

### App.jsx - 主應用元件

在 VSCode 中，你可以按住 <kbd>Ctrl</kbd> 並點擊 `<App />`，快速跳轉到 `App.jsx` 檔案。這是 React 應用的主要元件，所有的 UI 邏輯都從這裡開始。

React 採用**元件樹（Component Tree）**的架構，每個元件都可以包含子元件，形成巢狀結構。在這個例子中，`App` 是 `main.jsx` 的子元件，而 `App` 內部又可以包含更多子元件。每個元件都有自己獨立的邏輯、狀態和渲染輸出。

```jsx App.jsx
import { useState } from 'react'; // 匯入 useState Hook 用於狀態管理
import reactLogo from './assets/react.svg'; // 匯入 React 圖片資源
import viteLogo from '/vite.svg'; // 匯入 Vite 圖片（位於 public 目錄）
import './App.css'; // 匯入元件專屬樣式

function App() {
  // 宣告狀態：count 是當前值，setCount 是更新函式
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Fragment 空標籤：包裹多個元素但不產生額外 DOM */}
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* 點擊按鈕時，將 count + 1 */}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App; // 預設匯出，讓 main.jsx 可以引入
```

**📌 App.jsx 關鍵概念解析：**

1. **useState Hook（狀態管理）**
   ```javascript
   const [count, setCount] = useState(0);
   //     ↑       ↑            ↑
   //   當前值  更新函式    初始值
   ```
   - `count`：唯讀的狀態值，用於顯示
   - `setCount`：更新狀態的函式，呼叫後會觸發重新渲染
   - `0`：初始值，元件第一次渲染時的狀態
   - 後續章節會詳細介紹

2. **資源匯入**
   - **圖片模組化**：Vite 允許直接 import 圖片，會自動處理路徑
   - **CSS 匯入**：元件專屬樣式，支援 CSS Modules、PostCSS 等
   - **路徑規則**：
     - `./assets/xxx` - 相對路徑（src 目錄下）
     - `/xxx` - public 目錄下的檔案

3. **函式元件結構**
   ```javascript
   function ComponentName() {
     // 1. Hook 呼叫（必須在最上層）
     // 2. 邏輯處理
     // 3. return JSX
     return <div>...</div>;
   }
   ```
   - 函式名稱必須大寫開頭（React 規範）
   - return 回傳 JSX，描述 UI 長什麼樣子
   - 每次狀態改變，函式會重新執行

4. **JSX Fragment（空標籤 `<>...</>`）**
   - 用途：包裹多個並列元素，但不產生額外的 DOM 節點
   - 等同於 `<React.Fragment>...</React.Fragment>`
   - **為什麼需要？** React 元件的 return 只能回傳一個根元素
   
   ```javascript
   // ❌ 錯誤：回傳多個根元素
   return (
     <h1>Title</h1>
     <p>Content</p>
   );
   
   // ✅ 正確：使用 Fragment 包裹
   return (
     <>
       <h1>Title</h1>
       <p>Content</p>
     </>
   );
   
   // ✅ 也正確，但會多一層 div
   return (
     <div>
       <h1>Title</h1>
       <p>Content</p>
     </div>
   );
   ```

5. **export default（預設匯出）**
   - 每個檔案只能有一個 `export default`
   - 匯入時可以自訂名稱：`import MyApp from './App'`
   - 也可以使用具名匯出：`export function App() {...}`

{% note warning %}
**target="_blank" 安全性提醒：**

使用 `target="_blank"` 開啟新分頁時，建議加上 `rel="noopener noreferrer"`：

```jsx
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Link
</a>
```

- `noopener`：防止新頁面存取 `window.opener`，避免潛在的安全風險
- `noreferrer`：不發送 referrer 資訊，保護隱私

React 19 的 JSX 會自動添加 `noopener`，但明確寫出來更清楚。
{% endnote %}

## 程式碼品質管理：ESLint 與 Prettier

在團隊協作或大型專案中，統一的程式碼風格和即時的錯誤檢查至關重要。Vite 預設已經配置好 ESLint，但我們需要進一步優化設定，並整合 Prettier 來自動格式化程式碼。

| 工具         | 用途           | 範例                                         |
| ------------ | -------------- | -------------------------------------------- |
| **ESLint**   | 程式碼品質檢查 | 檢測未使用的變數、潛在錯誤、不符合規範的寫法 |
| **Prettier** | 程式碼格式化   | 統一縮排、引號、分號、換行等排版風格         |

{% note success %}
**最佳實踐組合：**
- ESLint 負責「程式邏輯」的正確性
- Prettier 負責「程式外觀」的美觀性
- 兩者互補，避免衝突
{% endnote %}

### 配置 ESLint

Vite 建立的 React 專案已經預裝 ESLint 並提供基礎配置檔 `eslint.config.js`。這是 ESLint 9+ 的新格式（扁平化配置），取代了舊的 `.eslintrc.js`。

**eslint.config.js 配置檔解析：**

```js eslint.config.js
import js from '@eslint/js'; // ESLint 核心 JavaScript 規則
import globals from 'globals'; // 全域變數定義（browser, node 等）
import react from 'eslint-plugin-react'; // React 專用規則
import reactHooks from 'eslint-plugin-react-hooks'; // React Hooks 規則
import reactRefresh from 'eslint-plugin-react-refresh'; // Vite HMR 規則

export default [
  { ignores: ['dist'] }, // 忽略打包輸出目錄
  {
    files: ['**/*.{js,jsx}'], // 檢查所有 .js 和 .jsx 檔案
    languageOptions: {
      ecmaVersion: 2020, // 支援 ES2020 語法
      globals: globals.browser, // 啟用瀏覽器全域變數（window, document 等）
      parserOptions: {
        ecmaVersion: 'latest', // 使用最新 ECMAScript 標準
        ecmaFeatures: { jsx: true }, // 啟用 JSX 語法解析
        sourceType: 'module', // 使用 ES Modules
      },
    },
    settings: { 
      react: { version: '19.2' } // 指定 React 版本（根據專案調整）
    },
    plugins: {
      react, // React 規則插件
      'react-hooks': reactHooks, // Hooks 規則插件
      'react-refresh': reactRefresh, // HMR 規則插件
    },
    rules: {
      ...js.configs.recommended.rules, // JavaScript 推薦規則
      ...react.configs.recommended.rules, // React 推薦規則
      ...react.configs['jsx-runtime'].rules, // React 17+ JSX 轉換規則
      ...reactHooks.configs.recommended.rules, // Hooks 推薦規則
      // 自訂規則覆寫
      'react/jsx-no-target-blank': 'off', // 允許 target="_blank" 不加 rel
      'react-refresh/only-export-components': [ // HMR 最佳化警告
        'warn',
        { allowConstantExport: true }, // 允許匯出常數
      ],
    },
  },
];
```

{% note info %}
**ESLint 9+ 扁平化配置說明：**

新的 `eslint.config.js` 格式更簡潔、更容易理解：

- ✅ 使用 JavaScript ES Module 語法
- ✅ 配置以陣列形式組織，順序重要
- ✅ 每個物件代表一組規則配置
- ✅ 支援更靈活的條件配置

**與舊格式的差異：**
```javascript
// ❌ 舊格式 (.eslintrc.js)
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  // ...
};

// ✅ 新格式 (eslint.config.js)
export default [
  { rules: { ...js.configs.recommended.rules } },
  // ...
];
```
{% endnote %}

### 整合 ESLint 到 VSCode

光有 ESLint 配置檔還不夠，我們需要讓 VSCode 即時顯示錯誤提示。

**步驟 1：安裝 VSCode ESLint 擴充套件**

在 VSCode 擴充套件市場搜尋「**ESLint**」（by Microsoft），點擊安裝。

![](/assets/images/2025-01-19-21-42-58.png)

**步驟 2：配置專案級設定**

在專案根目錄建立 `.vscode/settings.json` 檔案，啟用自動修復和驗證：

```json .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit" // 儲存時自動修復 ESLint 錯誤
  },
  "eslint.validate": [
    "javascript", // 驗證 .js 檔案
    "javascriptreact" // 驗證 .jsx 檔案
  ]
}
```

{% note warning %}
**專案設定共享：**

建議將 `.vscode/settings.json` 加入 Git 版本控制，讓團隊成員有一致的開發環境設定。

在 `.gitignore` 中確保沒有忽略 `.vscode/` 目錄：
```gitignore
# .gitignore
# .vscode/*  ← 註解或刪除這行
```

這樣其他人 clone 專案後，VSCode 會自動套用這些設定。
{% endnote %}

**步驟 3：測試 ESLint 自動修復**

在 `src/App.jsx` 故意添加多餘的分號：

```javascript
function App() {
  const [count, setCount] = useState(0);;  // ← 多餘的分號
  // ...
}
```

![](/assets/images/2025-01-19-22-15-19.png)

此時 ESLint 預設規則可能不會檢測這個錯誤。我們可以添加自訂規則：

```js eslint.config.js
rules: {
  ...js.configs.recommended.rules,
  ...react.configs.recommended.rules,
  ...react.configs['jsx-runtime'].rules,
  ...reactHooks.configs.recommended.rules,
  'react/jsx-no-target-blank': 'off',
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],
  'no-extra-semi': 'error', // 禁止多餘分號
},
```

儲存配置檔後，回到 `App.jsx`，錯誤提示會立即出現：

![](/assets/images/2025-01-19-22-17-56.png)

按下 <kbd>Ctrl</kbd>+<kbd>S</kbd> 儲存，ESLint 會自動移除多餘的分號。

{% note success %}
**ESLint 自動修復的魔法：**

ESLint 可以自動修復的問題類型：
- ✅ 多餘的空格、分號
- ✅ 不一致的引號（單引號 vs 雙引號）
- ✅ 缺少的分號
- ✅ 未使用的 import

無法自動修復的問題（需要手動處理）：
- ❌ 邏輯錯誤
- ❌ 未定義的變數
- ❌ React Hooks 規則違反
{% endnote %}

### 配置 Prettier

Prettier 是一個固執己見的程式碼格式化工具，能自動統一程式碼風格，避免團隊成員因為排版風格不同而產生無意義的 Git diff。

**步驟 1：安裝 Prettier 相關套件**

```bash
# 安裝 Prettier 及整合套件
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
```

**套件說明：**
- `prettier`：Prettier 核心套件
- `eslint-config-prettier`：關閉 ESLint 中與 Prettier 衝突的格式規則
- `eslint-plugin-prettier`：將 Prettier 規則整合到 ESLint 中

{% note info %}
**-D 參數說明：**

`-D` 是 `--save-dev` 的縮寫，表示安裝為**開發依賴**（devDependencies）。這些工具只在開發時使用，打包後的生產環境不需要，可以減少最終打包體積。

```json
// package.json
{
  "dependencies": {      // 生產環境需要的套件
    "react": "^19.0.0"
  },
  "devDependencies": {   // 僅開發環境需要的套件
    "prettier": "^3.0.0",
    "eslint": "^9.0.0"
  }
}
```
{% endnote %}

**步驟 2：建立 Prettier 配置檔**

在專案根目錄建立 `.prettierrc` 檔案：

```json .prettierrc
{
  "semi": true,           // 語句結尾加分號
  "tabWidth": 2,          // 縮排使用 2 個空格
  "printWidth": 100,      // 每行最大字元數
  "singleQuote": true,    // 使用單引號（字串）
  "trailingComma": "es5", // ES5 允許的地方加尾逗號（物件、陣列）
  "jsxSingleQuote": false, // JSX 屬性使用雙引號
  "bracketSpacing": true,  // 物件大括號內加空格 { foo: bar }
  "arrowParens": "always"  // 箭頭函式參數永遠加括號 (x) => x
}
```

{% note success %}
**Prettier 配置選項說明：**

| 選項             | 預設值     | 說明               | 範例                            |
| ---------------- | ---------- | ------------------ | ------------------------------- |
| `semi`           | `true`     | 語句結尾是否加分號 | `const x = 1;` vs `const x = 1` |
| `singleQuote`    | `false`    | 字串使用單引號     | `'hello'` vs `"hello"`          |
| `tabWidth`       | `2`        | 縮排空格數         | 2 或 4                          |
| `printWidth`     | `80`       | 每行最大字元數     | 80、100、120                    |
| `trailingComma`  | `"es5"`    | 尾逗號規則         | `{ a: 1, }`                     |
| `bracketSpacing` | `true`     | 物件括號內空格     | `{ foo }` vs `{foo}`            |
| `arrowParens`    | `"always"` | 箭頭函式括號       | `(x) => x` vs `x => x`          |

**React 專案推薦配置：**
- 單引號（`singleQuote: true`）：更簡潔
- JSX 雙引號（`jsxSingleQuote: false`）：符合 HTML 慣例
- 分號（`semi: true`）：避免潛在錯誤
- 100 字元（`printWidth: 100`）：平衡可讀性和寬螢幕利用率
{% endnote %}

**步驟 3：整合 Prettier 到 ESLint**

修改 `eslint.config.js`，將 Prettier 整合進來：

```js eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier'; // 新增這行

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier, // 新增這行
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-extra-semi': 'error', // 取消這行，改讓 prettier 接管，避免 ESLint 和 Prettier 的規則衝突
      'prettier/prettier': 'error', // 新增這行
    },
  },
];
```

{% note warning %}
**避免 ESLint 和 Prettier 衝突：**

由於 Prettier 會自動處理所有格式相關的問題（縮排、分號、引號等），我們應該讓 Prettier 完全接管格式化工作，ESLint 只負責程式邏輯檢查。

- ✅ 移除 `no-extra-semi` 等格式規則
- ✅ 添加 `prettier/prettier` 規則
- ✅ 使用 `eslint-config-prettier` 自動關閉衝突規則
{% endnote %}

**步驟 4：更新 VSCode 設定**

更新 `.vscode/settings.json`，設定 Prettier 為預設格式化工具：

```json .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit" // 儲存時修復 ESLint 錯誤
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact"
  ],
  "editor.formatOnSave": true, // 儲存時自動格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode" // 使用 Prettier 格式化
}
```

現在每次按 <kbd>Ctrl</kbd>+<kbd>S</kbd> 儲存時，會自動執行：
1. Prettier 格式化程式碼（縮排、引號、分號等）
2. ESLint 修復可自動修復的問題（unused imports、簡單邏輯錯誤）

**步驟 5：批次格式化整個專案**

在 `package.json` 添加格式化腳本：

```json package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "format": "prettier --write \"src/**/*.{js,jsx,css,json}\"" // 新增這行
  }
}
```

執行格式化命令：

```bash
pnpm format
```

![](/assets/images/2025-01-19-23-33-59.png)

Prettier 會掃描 `src` 目錄下的所有 `.js`、`.jsx`、`.css`、`.json` 檔案並自動格式化。

{% note success %}
**ESLint + Prettier 完美組合總結：**

| 工具         | 負責範圍                           | 觸發時機              |
| ------------ | ---------------------------------- | --------------------- |
| **ESLint**   | 程式邏輯錯誤、最佳實踐、React 規則 | 即時檢查 + 儲存時修復 |
| **Prettier** | 程式碼格式（縮排、引號、分號等）   | 儲存時自動格式化      |

**工作流程：**
1. 寫程式碼 → ESLint 即時顯示錯誤（紅色波浪線）
2. 按 <kbd>Ctrl</kbd>+<kbd>S</kbd> → Prettier 格式化 → ESLint 自動修復
3. 提交前執行 `pnpm format` 確保所有檔案格式一致
{% endnote %}

# React 核心語法與概念

環境配置完成後，讓我們深入學習 React 的核心語法和開發模式。

## JSX 語法完全指南

JSX（JavaScript XML）是 React 的核心語法擴展，讓我們能在 JavaScript 中直接撰寫類似 HTML 的標記。Vite 會透過 SWC 自動將 JSX 編譯成標準的 JavaScript。

### JSX 核心規則

**1. 所有標籤必須閉合**

```jsx
// ✅ 正確：自閉合標籤必須加斜線
<br />
<img src="photo.jpg" alt="Photo" />
<input type="text" />

// ❌ 錯誤：HTML 中可以省略閉合，JSX 不行
<br>
<img src="photo.jpg" alt="Photo">
<input type="text">
```

**2. 必須回傳單一根元素**

```jsx
// ❌ 錯誤：回傳多個並列元素
function Component() {
  return (
    <h1>Title</h1>
    <p>Content</p>
  );
}

// ✅ 正確：使用 Fragment 包裹
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}

// ✅ 也正確：使用 div 包裹（但會多一層 DOM）
function Component() {
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
}
```

{% note info %}
**Fragment 的使用時機：**

`<Fragment>` 或簡寫 `<>` 用於包裹多個元素但不產生額外 DOM。

```jsx
// 使用 Fragment（不產生 DOM）
<>
  <h1>Title</h1>
  <p>Content</p>
</>

// 如果需要 key，必須使用完整寫法
import { Fragment } from 'react';

items.map((item) => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </Fragment>
));
```

**何時需要 key？**
- `<>` 簡寫不支援 key 屬性
- 在 map() 渲染列表時，必須提供 key
- 這時要用 `<Fragment key={...}>` 完整寫法
{% endnote %}

**3. JavaScript 表達式需用 `{}` 包裹**

```jsx
function Greeting({ name, age }) {
  // 變數
  const greeting = `Hello, ${name}!`;
  
  // 運算
  const nextYear = age + 1;
  
  // 函式呼叫
  const formatted = name.toUpperCase();
  
  return (
    <div>
      <h1>{greeting}</h1>
      <p>You are {age} years old</p>
      <p>Next year you'll be {nextYear}</p>
      <p>Uppercase name: {formatted}</p>
      {/* 條件渲染 */}
      <p>{age >= 18 ? 'Adult' : 'Minor'}</p>
    </div>
  );
}
```

**4. HTML 屬性的 JSX 寫法**

由於 JSX 是 JavaScript，某些 HTML 屬性名稱需要調整：

| HTML       | JSX         | 原因                             |
| ---------- | ----------- | -------------------------------- |
| `class`    | `className` | `class` 是 JavaScript 保留字     |
| `for`      | `htmlFor`   | `for` 是 JavaScript 保留字       |
| `onclick`  | `onClick`   | 事件處理採用駝峰命名             |
| `onchange` | `onChange`  | 事件處理採用駝峰命名             |
| `tabindex` | `tabIndex`  | 屬性採用駝峰命名                 |
| `data-id`  | `data-id`   | data-* 和 aria-* 保持 kebab-case |

```jsx
// ✅ 正確的 JSX 寫法
<div className="container" data-testid="main">
  <label htmlFor="username">Username:</label>
  <input 
    id="username"
    type="text"
    onChange={handleChange}
    tabIndex={1}
  />
</div>

// ❌ 錯誤：使用 HTML 屬性名稱
<div class="container">
  <label for="username">Username:</label>
  <input onclick={handleChange} />
</div>
```

**5. 內聯樣式使用物件**

```jsx
function StyledComponent() {
  // 樣式物件
  const boxStyle = {
    backgroundColor: 'blue', // CSS 屬性改駝峰命名
    fontSize: '16px',
    padding: '20px',
    borderRadius: '8px'
  };
  
  return (
    <div>
      {/* 雙層大括號：外層是 JSX 表達式，內層是物件 */}
      <div style={{ color: 'red', margin: '10px' }}>
        Inline Style
      </div>
      
      {/* 使用預定義的樣式物件 */}
      <div style={boxStyle}>
        Styled Box
      </div>
    </div>
  );
}
```

**6. 多行 JSX 需用 `()` 包裹**

```jsx
// ✅ 正確：多行 JSX 用括號包裹
function Component() {
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
}

// ❌ 錯誤：缺少括號會被當作單行
function Component() {
  return
    <div>
      <h1>Title</h1>
    </div>;
}

// ✅ 單行可省略括號
function Component() {
  return <h1>Simple Title</h1>;
}
```

### JSX 實用技巧

#### 條件渲染

```jsx
function UserGreeting({ isLoggedIn, username }) {
  // 1. 三元運算子
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
  
  // 2. && 短路運算（僅顯示或不顯示）
  return (
    <div>
      {isLoggedIn && <h1>Welcome, {username}!</h1>}
      {!isLoggedIn && <button>Login</button>}
    </div>
  );
  
  // 3. 提前返回（推薦用於複雜邏輯）
  if (!isLoggedIn) {
    return <LoginForm />;
  }
  
  return <Dashboard user={username} />;
}
```

{% note warning %}
**條件渲染的陷阱：**

```jsx
// ❌ 危險：數字 0 會被渲染出來
{count && <p>Count: {count}</p>}  // 當 count = 0 時，會顯示 "0"

// ✅ 安全：明確比較
{count > 0 && <p>Count: {count}</p>}
{count !== 0 && <p>Count: {count}</p>}

// ❌ 危險：空字串會渲染空白
{text && <p>{text}</p>}

// ✅ 安全：明確檢查
{text.length > 0 && <p>{text}</p>}
{Boolean(text) && <p>{text}</p>}
```
{% endnote %}

#### JSX 轉換工具

如果有大量 HTML 需要轉換成 JSX，可以使用官方提供的 [HTML to JSX 線上轉換器](https://transform.tools/html-to-jsx)。

{% note success %}
**JSX 最佳實踐：**
- ✅ 使用 `className` 而非 `class`
- ✅ 所有標籤都要閉合
- ✅ 事件處理使用駝峰命名（`onClick`、`onChange`）
- ✅ 條件渲染時避免 falsy 值陷阱
- ✅ 複雜邏輯抽取成變數或函式
- ✅ 保持 JSX 簡潔易讀
{% endnote %}

### JSX 實作範例：重構 App.jsx

讓我們應用剛學到的 JSX 知識，重構 `App.jsx`，展示 JSX 的靈活性：

```jsx src/App.jsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);

  // 將 JSX 存成變數
  const myBr = <br />;
  const imgVite = <img src={viteLogo} className="logo" alt="Vite logo" />;
  const imgReact = <img src={reactLogo} className="logo react" alt="React logo" />;
  
  // 字串變數
  const h1Title = 'Vite + React';
  
  // JSX 元素變數（帶 data 屬性）
  const h1Element = <h1 data-id="123">{h1Title}</h1>;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          {imgVite}
        </a>
        {myBr}
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          {imgReact}
        </a>
      </div>
      
      {h1Element}
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
```

**範例重點：**
- ✅ JSX 可以存成變數（`myBr`、`imgVite`、`h1Element`）
- ✅ 變數可以在其他 JSX 中使用 `{變數名}`
- ✅ `data-*` 屬性保持 kebab-case 寫法
- ✅ 加上 `rel="noopener noreferrer"` 提升安全性

{% note info %}
**為什麼要把 JSX 存成變數？**

1. **重複使用**：避免重複撰寫相同的 JSX
2. **邏輯分離**：複雜的 JSX 抽離出來，讓 return 更簡潔
3. **條件渲染**：根據條件決定要顯示哪個 JSX
4. **提升可讀性**：給 JSX 有意義的名稱

```jsx
// 範例：條件渲染不同的 JSX 變數
const loadingElement = <div>Loading...</div>;
const errorElement = <div>Error occurred</div>;
const contentElement = <div>Content loaded</div>;

return (
  <>
    {isLoading && loadingElement}
    {hasError && errorElement}
    {!isLoading && !hasError && contentElement}
  </>
);
```
{% endnote %}

## React 渲染機制
在現代網頁開發中，React 透過 JSX（JavaScript 語法擴充）來描述 UI 樣貌，有效將「元件邏輯」與「畫面結構」結合，提升開發效率與可維護性。本節將帶你認識 React 如何把這些用 JS 編寫的元素型物件，映射並渲染到瀏覽器的實體 DOM，並說明核心渲染方法（如 `createRoot`）的基本運作流程。學會這一套渲染機制，是 React 應用開發的基礎！

### 虛擬 DOM 到實體 DOM
React 使用 JSX 描述 UI，但瀏覽器只認識真實的 DOM 節點。React 透過以下流程將 JSX 轉換成實際的網頁內容：

{% mermaid graph LR %}
  A["JSX 代碼"]
  B["React 元素物件"]
  C["虛擬 DOM"] 
  D["Diff 演算法"]
  E["更新實體 DOM"]
  A --> B --> C --> D --> E
{% endmermaid %}

**關鍵角色：`ReactDOM.createRoot`**

`react-dom/client` 提供的 `createRoot` API 負責：
1. 建立 React 根節點
2. 將 React 元件樹渲染到指定的 DOM 容器
3. 管理後續的更新和重新渲染

### 基本渲染範例

我們在 `main.jsx` 中已經看過基本用法：

```jsx src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// 選取 DOM 元素並建立 React 根節點
const root = createRoot(document.getElementById('root'));

// 渲染 App 元件
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**分步解析：**
1. `document.getElementById('root')` - 找到 HTML 中的掛載點
2. `createRoot(...)` - 建立 React 根節點
3. `root.render(...)` - 將元件樹渲染到 DOM

### 多個根節點渲染

在特殊情況下，你可能需要在同一個頁面的不同位置渲染獨立的 React 應用：

```html index.html
<body>
  <div id="root"></div>
  <footer id="footer"></footer>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

```jsx src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Footer from './Footer';

// 主應用
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// 頁尾獨立渲染
createRoot(document.getElementById('footer')).render(
  <Footer />
);
```

{% note warning %}
**多根節點的注意事項：**

- 每個根節點都是獨立的 React 應用
- 它們之間無法直接共享狀態
- 僅在特殊場景使用（如漸進式遷移舊專案）
- 一般情況下，整個應用只需要一個根節點

**推薦做法：**
如果需要在頁面不同位置顯示內容，應該在單一根節點中透過元件組合完成：

```jsx
// ✅ 推薦：單一根節點，透過元件組合
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
```
{% endnote %}

### React 18+ 渲染 API 變更

```javascript
// ❌ React 17 舊寫法（已不推薦）
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// ✅ React 18+ 新寫法
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

**新 API 的優勢：**
- ✅ 啟用 Concurrent Mode（並行渲染）
- ✅ 支援自動批次更新（Automatic Batching）
- ✅ 更好的 Suspense 支援
- ✅ 更優的效能和使用者體驗

{% note success %}
**渲染機制總結：**

1. **一次性渲染**：`createRoot` 和 `render` 通常只在應用啟動時呼叫一次
2. **後續更新**：透過 `useState`、`useReducer` 等 Hook 觸發
3. **自動優化**：React 會自動批次更新，只修改變化的 DOM 部分
4. **StrictMode**：開發環境下會故意執行兩次，幫助發現副作用問題
{% endnote %}

## Component 元件系統
本單元聚焦於 React 最核心的「元件系統」。你將從觀念、命名規則到語法範例，一步步掌握如何定義、撰寫、組合各種「函式元件」。同時也會說明現代 React 開發中元件拆分、組裝、資料傳遞的實務技巧。學會元件，等於掌握 React 開發的基礎與關鍵！

元件是 React 應用的基本建構單元，就像樂高積木一樣，可以組合成完整的應用程式。元件封裝了：

- **UI 結構**：JSX 描述的介面外觀
- **資料邏輯**：State 和 Props 管理
- **互動行為**：事件處理函式

元件可以小到一個按鈕，也可以大到整個頁面。

### 函式元件（Function Components）
自從 React 16.8 推出 Hooks 開始，官方就推薦優先使用**函式元件 + Hooks** 這種現代開發方式。

#### 基本語法

```jsx
// 1. 函式宣告式
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// 2. 箭頭函式（推薦用於簡單元件）
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};

// 3. 箭頭函式簡寫（單一表達式）
const Welcome = () => <h1>Hello, World!</h1>;
```

**元件命名規則：**
- ✅ 必須以大寫字母開頭（`Welcome`、`MyButton`、`UserProfile`）
- ❌ 不能用小寫開頭（`welcome`、`myButton`）- React 會當成 HTML 標籤

```jsx
// ✅ 正確：大寫開頭，React 知道這是元件
<Welcome />

// ❌ 錯誤：小寫開頭，React 會尋找 <welcome> HTML 標籤
<welcome />
```

{% note warning %}
**為什麼元件名稱必須大寫？**

這是 JSX 的語法規則，用來區分 React 元件和 HTML 標籤：

```jsx
// React 元件（大寫）
<MyButton /> → React.createElement(MyButton)

// HTML 標籤（小寫）
<button /> → React.createElement('button')
```

如果你用小寫命名元件，React 會報錯找不到對應的 HTML 標籤。
{% endnote %}

#### 過時的 Class 元件
React 在 16.8 版本後強調現代函式元件（Function Component）和 Hooks 開發模式，傳統的 Class 元件語法漸漸被棄用。本節將帶你快速對比兩種語法差異，建議直接採用「函式元件＋Hooks」這套未來趨勢寫法，寫起來更直覺、可讀性也高。

| 特性          | 函式元件（推薦） | Class 元件（已過時） |
| ------------- | ---------------- | -------------------- |
| 語法          | 簡潔直觀         | 複雜冗長             |
| 狀態管理      | `useState` Hook  | `this.state`         |
| 副作用處理    | `useEffect` Hook | 生命週期方法         |
| this 綁定     | 不需要           | 容易出錯             |
| 效能          | 更優             | 較差                 |
| React 19 支援 | ✅ 完整支援       | ⚠️ 維護模式           |

```jsx
// ✅ 現代寫法：函式元件 + Hooks
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// ❌ 舊寫法：Class 元件（不推薦）
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this); // 需要綁定 this
  }
  
  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }
  
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

{% note info %}
**Class 元件的未來：**

雖然 React 仍支援 Class 元件，但官方已明確表示：
- ✅ 新專案應使用函式元件 + Hooks
- ⚠️ 舊專案可以漸進式遷移
- ❌ 不再投入新功能開發（如 Server Components）
- 📚 如果遇到舊專案，需要額外學習 Class 語法

本課程完全使用現代的函式元件方式教學。
{% endnote %}

#### 元件組合規則
React 推崇以小元件組合大型介面的設計哲學，如何正確組織元件結構、避免常見陷阱，將直接影響專案的可維護性與效能。

**✅ 正確：扁平化定義元件**

```jsx
// 所有元件定義在同一層級
function Header() {
  return <h1>My App</h1>;
}

function Content() {
  return <p>Welcome!</p>;
}

function App() {
  return (
    <>
      <Header />
      <Content />
    </>
  );
}
```

**❌ 錯誤：巢狀定義元件**

```jsx
function App() {
  // ❌ 不要在元件內部定義另一個元件
  function Header() {
    return <h1>My App</h1>;
  }
  
  return <Header />;
}
```

**為什麼不能巢狀定義？**
- 每次 `App` 重新渲染，`Header` 都會被重新建立
- 導致 React 認為這是新元件，強制重新掛載
- 造成狀態丟失、效能問題、不必要的重新渲染

#### 元件組合與重用

元件可以像樂高積木一樣組合，形成元件樹：

```jsx
function Logo() {
  return <img src="/logo.png" alt="Logo" />;
}

function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
    </header>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>Content...</main>
      <footer>Footer...</footer>
    </>
  );
}
```

**元件樹結構：**
```
App
├── Header
│   ├── Logo
│   └── Navigation
├── main
└── footer
```

#### 實作練習：將 App.jsx 拆分成多個元件
讓我們將原本的 Logo 區域獨立成多個小元件，展示元件組合的威力：

```jsx src/App.jsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// 模擬外部資料
const alts = {
  vite: 'Vite Logo',
  react: 'React Logo',
};

// 圖片元件 A
function ImgA() {
  return <img src={viteLogo} className="logo" alt={alts.vite} />;
}

// 連結元件 A（包含圖片 A）
function LinkA() {
  return (
    <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
      <ImgA />
    </a>
  );
}

// 圖片元件 B
function ImgB() {
  return <img src={reactLogo} className="logo react" alt={alts.react} />;
}

// 連結元件 B（包含圖片 B）
function LinkB() {
  return (
    <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
      <ImgB />
    </a>
  );
}

// Logo 區域元件（組合 LinkA 和 LinkB）
function MyLogo() {
  const myBr = <br />;
  return (
    <div>
      <LinkA />
      {myBr}
      <LinkB />
    </div>
  );
}

// 主應用元件
export default function App() {
  const [count, setCount] = useState(0);
  const h1Title = 'Vite + React';
  const h1Element = <h1 data-id="123">{h1Title}</h1>;

  return (
    <>
      <MyLogo />
      {h1Element}
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
```

**元件拆分的優勢：**
1. **可讀性提升**：每個元件職責單一，容易理解
2. **可重用性**：`ImgA`、`LinkA` 可以在其他地方使用
3. **易於維護**：修改圖片邏輯只需改動 `ImgA` 或 `ImgB`
4. **測試友好**：可以單獨測試每個小元件

**元件組合結構：**
```
App
├── MyLogo
│   ├── LinkA
│   │   └── ImgA
│   ├── <br />
│   └── LinkB
│       └── ImgB
├── h1Element
├── div.card
└── p.read-the-docs
```

{% note success %}
**元件拆分原則：**

1. **單一職責**：每個元件只做一件事
2. **可重用性**：如果某段 UI 會重複出現，就抽成元件
3. **命名清晰**：元件名稱應該清楚描述其用途
4. **大小適中**：太大不好維護，太小過度複雜

**何時該拆分元件？**
- ✅ 相同的 UI 出現多次
- ✅ 某段邏輯複雜，影響可讀性
- ✅ 想要獨立測試某部分功能
- ✅ 團隊成員需要並行開發不同區塊
{% endnote %}

### Props：元件間的資料傳遞
Props（properties 的縮寫）是父元件傳遞資料給子元件的機制。就像函式的參數一樣，元件可以接收 props 並根據這些資料渲染不同的內容。

**Props 的特性：**
- **唯讀（Read-Only）**：子元件不能修改 props
- **單向資料流**：資料只能從父元件流向子元件
- **任意類型**：可以傳遞字串、數字、物件、陣列、函式等

#### Props 基本用法

```jsx
// 子元件：接收 props
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 父元件：傳遞 props
function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}
```

**執行結果：**
```
Hello, Alice!
Hello, Bob!
Hello, Charlie!
```

#### Props 解構（Destructuring）

為了讓程式碼更簡潔，通常會使用解構語法直接取出需要的 props：

```jsx
// ❌ 不推薦：每次都要寫 props.
function Greeting(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>Age: {props.age}</p>
      <p>City: {props.city}</p>
    </div>
  );
}

// ✅ 推薦：使用解構
function Greeting({ name, age, city }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}

// 使用元件
<Greeting name="Alice" age={25} city="Taipei" />
```

#### Props 傳遞各種資料類型
Props（屬性）允許父元件將任何型別的資料傳遞給子元件，包括基本型別（字串、數字、布林）、陣列、物件，甚至是函式和整段 JSX。這種設計讓 React 元件在資料傳遞和 UI 組合上具有極大的彈性。搭配解構語法，可以讓程式碼更簡潔、易讀。初學者在設計元件時，建議善用解構 props 慣例，也能避免未來 props 變更時維護上的困擾。

常見函式型 props 的用途，如將某些行為（像是 onClick、onChange、onSave 等事件處理函式）傳進去子元件，由子元件觸發時再回傳給父元件進行狀態處理，這也是 React 元件間互動的核心模式。


```jsx
function UserProfile({ 
  name,        // 字串
  age,         // 數字
  isActive,    // 布林值
  hobbies,     // 陣列
  address,     // 物件
  onSave       // 函式
}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
      <p>City: {address.city}</p>
      <button onClick={onSave}>Save Profile</button>
    </div>
  );
}

// 使用元件
function App() {
  const user = {
    name: 'Alice',
    age: 25,
    isActive: true,
    hobbies: ['Reading', 'Gaming', 'Coding'],
    address: { city: 'Taipei', country: 'Taiwan' }
  };

  const handleSave = () => {
    console.log('Profile saved!');
  };

  return (
    <UserProfile
      name={user.name}
      age={user.age}
      isActive={user.isActive}
      hobbies={user.hobbies}
      address={user.address}
      onSave={handleSave}
    />
  );
}
```

{% note info %}
**Props 語法注意事項：**

1. **字串可以不用大括號**：
```jsx
<Greeting name="Alice" />       // ✅ 字串可以不用大括號，也可以用大括號包住（但不必）。
<Greeting age={25} />           // ✅ 數字須用大括號
<Greeting isActive />           // ✅ 布林值 true 可省略（等同於 isActive={true}）
<Greeting isActive={false} />   // ✅ 傳遞布林值 false 需明確寫出
```

2. **布林值簡寫**：
```jsx
<Button disabled={true} />  // 完整寫法
<Button disabled />         // 簡寫（等同於 true）
```

3. **JSX 作為 Props**：
```jsx
<Card header={<h1>Title</h1>} />
```
{% endnote %}

#### 實作範例：重構元件使用 Props

讓我們改寫之前的範例，我們可以把 Img 的 src 值與 alt 值，利用 props 來傳遞給元件。但此時應該會出現 ESLint 的錯誤。

```jsx src\App.jsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// const alts = {
//   vite: 'Vite Logo',
//   react: 'React Logo',
// };

function ImgA(props) {
  return <img src={props.logo} className="logo" alt={props.txt} />;
}

function LinkA() {
  return (
    <a href="https://vite.dev" target="_blank">
      <ImgA logo={viteLogo} txt="Vite Logo" />
    </a>
  );
}

function ImgB({ logo, txt }) {
  return <img src={logo} className="logo" alt={txt} />;
}

function LinkB() {
  return (
    <a href="https://react.dev" target="_blank">
      <ImgB logo={reactLogo} txt="React Logo" />
    </a>
  );
}

function MyLogo() {
  const myBr = <br />;
  return (
    <div>
      <LinkA></LinkA>
      {myBr}
      <LinkB />
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const h1Title = 'Vite + React';
  const h1Element = <h1 data-id="123">{h1Title}</h1>;

  return (
    <>
      <MyLogo />
      {h1Element}
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
```

由於 Vite 的環境有 ESLint 而檢查預設開啟，因此我們必需對這兩個錯誤的元件定義 props 的型別以及是否必存在。透過套件 prop-types 來導入使用。

{% note info %}
**prop-types 是什麼？**  
`prop-types` 是一個 React 官方維護的第三方套件，用來在開發階段「檢查元件 props 的型別和必填性」。透過設置每個元件的 `propTypes` 屬性，我們可以定義每個 props 應該是什麼型別（例如：`string`、`number`、`array`、`object`），以及是否一定要傳遞。這能幫助開發時及早發現資料型別錯誤，提升專案的穩定性與可維護性。

**常見用途：**
- 避免父層傳入錯誤型別資料，導致元件渲染異常
- 提升團隊開發時的明確溝通與自動化檢查

**注意：**  
prop-types 只會在開發模式下提供警告，生產環境(正式 build)不會影響效能。如果你使用 TypeScript，則不需要再用 prop-types，因為型別檢查已被 TypeScript 覆蓋。
{% endnote %}

```jsx src\App.jsx
import PropTypes from 'prop-types';

function ImgA(props) {
  return <img src={props.logo} className="logo" alt={props.txt} />;
}

// 由於 Vite 的環境有 ESLint 而檢查預設開啟，因此我們必需定義 props 的型別以及是否必存在。

// 定義 ImgA 元件的 props 型別與是否必填
ImgA.propTypes = {
  logo: PropTypes.string.isRequired, // logo 必須是字串且為必填
  txt: PropTypes.string, // txt 是字串型別，非必填
};

function LinkA() {
  return (
    <a href="https://vite.dev" target="_blank">
      <ImgA logo={viteLogo} txt="Vite Logo" />
    </a>
  );
}

function ImgB({ logo, txt }) {
  return <img src={logo} className="logo" alt={txt} />;
}

// 設定 ImgB 元件的 props 型別驗證
ImgB.propTypes = {
  logo: PropTypes.string.isRequired,
  txt: PropTypes.string,
};

function LinkB() {
  return (
    <a href="https://react.dev" target="_blank">
      <ImgB logo={reactLogo} txt="React Logo" />
    </a>
  );
}
```

當然你可以關閉 ESLint 對 props 型別的檢查，大多數現在的新專案都會使用 TypeScript 來開發輔助錯誤檢查。只有以前的舊專案，在沒有導入 TypeScript 又需要輔助檢查錯誤時才可能利用去 props-types 做檢查。

```js eslint.config.js
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-extra-semi': 'error',
      'prettier/prettier': 'error',
      'react/prop-types': 'off', // 取消 react 對 prop-type 的檢查
    },
```

現在不需要 props-type 也不會發生錯誤了。

#### 組合 Component
小元件本身可重複利用的，在另一個大元件內利用 JSX 編寫重複使用，再透過 props 獲得差異性的顯示。例如我們的 ImgA 跟 ImgB 有類似的 UI 可以組合為 MyImg。

```jsx src\App.jsx
function MyImg({ logo, txt }) {
  return <img src={logo} className="logo" alt={txt} />;
}

function LinkA() {
  return (
    <a href="https://vite.dev" target="_blank">
      <MyImg logo={viteLogo} txt="Vite Logo" />
    </a>
  );
}

function LinkB() {
  return (
    <a href="https://react.dev" target="_blank">
      <MyImg logo={reactLogo} txt="React Logo" />
    </a>
  );
}

function MyLogo() {
  const myBr = <br />;
  return (
    <div>
      <LinkA></LinkA>
      {myBr}
      <LinkB />
    </div>
  );
}
```

可以挑戰看看把 LinkA 跟 LinkB 也組合為 MyLink。

```jsx src\App.jsx
function MyImg({ logo, txt }) {
  return <img src={logo} className="logo" alt={txt} />;
}

function MyLink({ logo, txt, link }) {
  return (
    <a href={link} target="_blank">
      <MyImg logo={logo} txt={txt} />
    </a>
  );
}

function MyLogo() {
  const myBr = <br />;
  return (
    <div>
      <MyLink logo={viteLogo} txt="Vite Logo" link="https://vite.dev"></MyLink>
      {myBr}
      <MyLink logo={reactLogo} txt="React Logo" link="https://react.dev" />
    </div>
  );
}
```

如果需要，也可以把資料獨立出來（未來可能資料來自於後端提供 API 回傳）成為一個資料陣列。透過物件方式傳遞下去，這樣就不用寫一堆 props 了。但見仁見智，React 的寫法很自由。

```jsx src\App.jsx
function MyImg({ imgItem }) {
  return <img src={imgItem.img} className="logo" alt={imgItem.name} />;
}

function MyLink({ linkItem }) {
  return (
    <a href={linkItem.url} target="_blank">
      <MyImg imgItem={linkItem} />
    </a>
  );
}

function MyLogo() {
  const myBr = <br />;
  const dataList = [
    {
      name: 'Vite Logo',
      img: viteLogo,
      url: 'https://vite.dev',
    },
    {
      name: 'React Logo',
      img: reactLogo,
      url: 'https://react.dev',
    },
  ];

  return (
    <div>
      <MyLink linkItem={dataList[0]}></MyLink>
      {myBr}
      <MyLink linkItem={dataList[1]} />
    </div>
  );
}
```

#### 匯出匯入
元件的神奇之處在於它們的可重複使用性：您可以建立由其他元件組成的元件。但是，當您嵌套越來越多的元件時，開始將它們拆分為不同的檔案通常是有意義的。這使您可以輕鬆掃描文件並在更多地方重複使用元件。您可以透過三個步驟移動元件：

- 建立一個新的 JS 檔案來放入元件。
- 從該文件導出函式元件（使用預設導出或命名導出）。
- 將其匯入到您將使用該元件的檔案中（使用匯入預設或命名匯出的相應技術）。

試著將 MyLogo 與 MyLink 獨立成檔案，在適合的地方匯入：

> 如果發生大量的`Delete ␍`錯誤，這是換行符號（line ending）的問題。這個錯誤通常出現在 Windows 系統上，因為 Windows 使用 `CRLF (\r\n)`，而 Unix/Linux 使用 `LF (\n)`。右下角可以切換本檔案使用哪種，或者在`.vscode\settings.json` 追加`"files.eol": "\n"`，使得每次新增檔案預設為 LF 格式。

```jsx src\App.jsx
import { useState } from 'react';
import './App.css';
import MyLogo from './component/MyLogo/MyLogo'; // 透過 import 取得別處的 component

export default function App() {
  //...
}

```

```jsx src\component\MyLogo\MyLogo.jsx
import reactLogo from './../../assets/react.svg';
import viteLogo from '/vite.svg';
import { MyLink } from './MyLink'; //因為是命名匯出，所以可多個

/**
 * 一個文件只能有一個 default export 預設匯出
 * 導入時可以使用任意名稱
 * 導入時不需要使用大括號
 * 如果元件是該文件的主要功能，使用 export default
 */

export default function MyLogo() {
  const myBr = <br />;
  const dataList = [
    {
      name: 'Vite Logo',
      img: viteLogo,
      url: 'https://vite.dev',
    },
    {
      name: 'React Logo',
      img: reactLogo,
      url: 'https://react.dev',
    },
  ];

  return (
    <div>
      <MyLink linkItem={dataList[0]}></MyLink>
      {myBr}
      <MyLink linkItem={dataList[1]} />
    </div>
  );
}
```
```jsx src\component\MyLogo\MyLink.jsx
function MyImg({ imgItem }) {
  return <img src={imgItem.img} className="logo" alt={imgItem.name} />;
}

//採用命名匯出
export function MyLink({ linkItem }) {
  return (
    <a href={linkItem.url} target="_blank">
      <MyImg imgItem={linkItem} />
    </a>
  );
}
```

如果路徑變得越來越複雜，也可以用別名路徑來定義。例如常用的 assets 目錄設定一個別名起頭 `import reactLogo from '@assets/react.svg';`。跟隨以下設定與新增`vite.config.js`：

```js vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
    },
  },
});
```

#### 渲染列表
JSX 支援元件陣列方式作為渲染，如果有任何資料需要提供元件，我們可以用 JS array 的原生方法來操作批次輸出多個元件。

React 支援元件陣列的寫法。React 會自動了解陣列內容，以迴圈方式多筆輸出在畫面上：
```jsx src\component\MyLogo\MyLogo.jsx
export default function MyLogo() {
  const myBr = <br />;
  const dataList = [
    {
      name: 'Vite Logo',
      img: viteLogo,
      url: 'https://vite.dev',
    },
    {
      name: 'React Logo',
      img: reactLogo,
      url: 'https://react.dev',
    },
  ];

  return (
    <div>{[<MyLink linkItem={dataList[0]}></MyLink>, <MyLink linkItem={dataList[1]} />]}</div>
  );
}

```

如果此時查看 console 會出現錯誤資訊

```shell
MyLogo.jsx:28 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `MyLogo`. See https://reactjs.org/link/warning-keys for more information.
    at MyLink (http://localhost:5173/src/component/MyLogo/MyLink.jsx:23:26)
    at MyLogo
    at App (http://localhost:5173/src/App.jsx?t=1738305513593:18:31)
```

這是因為 React 需要 key 來識別列表中的每個元素，以便在列表發生資料更新時，能夠正確地被動進行重新渲染更新或刪除已存在的畫面元素。key 是幫助 React 進行識別用而不是給開發人員使用的。用途為判斷哪些元素被改變（新增修改刪除），有以下特性：

- 每個元素的 key 都必須在同個陣列內要有唯一性才能讓 React 去追蹤這些元素。只要確保 render 該指定陣列時能透過 key 判斷出此陣列底下的這些獨立元素。
- key 的指定為在 JSX 元素上透過屬性來賦予（類似 props 方式），但是你無法讀取此值，即便 props.key 也做不到。

這樣可以幫助 React 更好地管理列表中的元素，並避免一些常見的錯誤。通常會使用資料（來自 SQL 提供） 的 id 來辦定。目前沒有 id 情況下可以手動選擇代表性且不重複的資料為值，但不要使用 array index 來當作值，因為索引值不能代表該資料的識別唯一值。修正如下：

```jsx src\component\MyLogo\MyLogo.jsx
export default function MyLogo() {
  const myBr = <br />;
  const dataList = [
    {
      id: 1, // 最好的方式是讓資料有唯一值作為識別
      name: 'Vite Logo',
      img: viteLogo,
      url: 'https://vite.dev',
    },
    {
      id: 2,
      name: 'React Logo',
      img: reactLogo,
      url: 'https://react.dev',
    },
  ];

  return (
    <div>
      {[
        <MyLink key={dataList[0].id} linkItem={dataList[0]}></MyLink>,
        <MyLink key={dataList[1].id} linkItem={dataList[1]} />,
      ]}
    </div>
  );
}
```

同時，也可以對資料陣列利用 map 方式轉換為元件陣列。

```jsx src\component\MyLogo\MyLogo.jsx
export default function MyLogo() {
  const myBr = <br />;
  const dataList = [
    {
      id: 1,
      name: 'Vite Logo',
      img: viteLogo,
      url: 'https://vite.dev',
    },
    {
      id: 2,
      name: 'React Logo',
      img: reactLogo,
      url: 'https://react.dev',
    },
  ];

  return dataList.map((val) => <MyLink key={val.id} linkItem={val} />);
}
```

每一個元件函式都必須保持乾淨的過程與結果輸出，由於元件是可以重複利用的。透過 props 來提供相同的輸入傳遞，並始終返回相同的 JSX。

#### 作為 children 傳遞
任何被元件包覆起來的元件或內容都被視為 children props，我們可以用來接受並使用，形成由上層提供至下層進行管理渲染的做法。例如我們在上層決定 children 是什麼，下層去取得自己的 children 做指定渲染。您可以將帶有 prop 的元件 children 視為具有洞口，其父元件可以使用任意 JSX 來填充。經常會使用 children 道具來進行視覺包裝：面板、格子等等。

```jsx src\component\MyH1\MyH1.jsx
const MyH1 = ({ children }) => <h1>{children}</h1>;

export default MyH1;
```
```jsx src\App.jsx
import { useState } from 'react';
import './App.css';
import MyLogo from './component/MyLogo/MyLogo';
import MyH1 from './component/MyH1/MyH1';

export default function App() {
  const [count, setCount] = useState(0);
  const h1Title = 'Vite + React';
  // const h1Element = <h1 data-id="123">{h1Title}</h1>;

  return (
    <>
      <MyLogo />

      {/* {h1Element} //捨棄 */}  
      <MyH1>{h1Title}</MyH1> {/*由此處上層決定 children 是什麼*/}

      <div className="card" style={{ color: 'red', background: 'black' }}>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
```

### 互動性
畫面上的某些內容會根據使用者輸入事件進行更新。例如 click 或 change value，在 React 中，隨時間操作變化的資料稱為 state 狀態。您可以為任何 component 元件新增 state 狀態，並根據需要更新它。在本章中，您將學習如何編寫處理互動、更新其狀態並隨時間顯示不同輸出的元件。

### 事件處理（Events）

#### React 事件系統

React 實作了一個跨瀏覽器的合成事件系統（SyntheticEvent），統一了各瀏覽器的事件處理差異，讓開發者不需要擔心瀏覽器相容性問題。

#### React 事件 vs HTML 事件

| 特性     | HTML 事件            | React 事件                 |
| -------- | -------------------- | -------------------------- |
| 命名方式 | 小寫 `onclick`       | 駝峰命名 `onClick`         |
| 事件處理 | 字串 `"alert('Hi')"` | 函式 `{handleClick}`       |
| 阻止預設 | `return false`       | `e.preventDefault()`       |
| 事件物件 | 原生 Event           | SyntheticEvent（跨瀏覽器） |

```jsx
// ❌ HTML 原生寫法
<button onclick="alert('Clicked!')">Click</button>

// ✅ React 寫法
<button onClick={() => alert('Clicked!')}>Click</button>
```

#### 事件處理的三種方式

##### 1. 內聯匿名函式（適合簡單邏輯）

```jsx
function App() {
  return (
    <button onClick={() => alert('Clicked!')}>
      Click Me
    </button>
  );
}
```

##### 2. 元件內部函式（推薦）

```jsx
function App() {
  const handleClick = () => {
    alert('Clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

{% note warning %}
**常見錯誤：不要立即執行函式！**

```jsx
// ❌ 錯誤：函式會立即執行
<button onClick={handleClick()}>Click</button>

// ✅ 正確：傳遞函式參考
<button onClick={handleClick}>Click</button>

// ✅ 正確：需要傳參數時使用箭頭函式
<button onClick={() => handleClick(123)}>Click</button>
```
{% endnote %}

##### 3. 傳遞事件處理函式給子元件

```jsx
// 子元件
function MyButton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// 父元件
function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <MyButton onClick={handleClick}>Click Me</MyButton>;
}
```

#### 常用的 React 事件

React 支援所有標準的 DOM 事件，這裡列出最常用的：

##### 滑鼠事件
- `onClick` - 點擊
- `onDoubleClick` - 雙擊
- `onMouseEnter` - 滑鼠移入
- `onMouseLeave` - 滑鼠移出
- `onMouseMove` - 滑鼠移動
- `onMouseDown` / `onMouseUp` - 滑鼠按下/放開

##### 鍵盤事件
- `onKeyDown` - 按鍵按下
- `onKeyUp` - 按鍵放開
- `onKeyPress` - 按鍵按下（已廢棄，用 onKeyDown）

##### 表單事件
- `onChange` - 輸入值改變
- `onSubmit` - 表單提交
- `onFocus` - 獲得焦點
- `onBlur` - 失去焦點

##### 其他常用事件
- `onScroll` - 滾動
- `onDrag` / `onDrop` - 拖曳
- `onLoad` / `onError` - 載入/錯誤（圖片、媒體）

#### 事件物件（Event Object）

React 事件處理函式會自動接收一個 `SyntheticEvent` 物件：

```jsx
function App() {
  const handleClick = (event) => {
    console.log('事件類型：', event.type);           // "click"
    console.log('目標元素：', event.target);         // <button>
    console.log('當前元素：', event.currentTarget); // <button>
    console.log('滑鼠座標：', event.clientX, event.clientY);
  };

  const handleInput = (event) => {
    console.log('輸入值：', event.target.value);
  };

  return (
    <>
      <button onClick={handleClick}>Click Me</button>
      <input onChange={handleInput} />
    </>
  );
}
```

#### preventDefault 與 stopPropagation

##### preventDefault - 阻止預設行為

```jsx
function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表單提交時重新載入頁面
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    console.log('提交資料：', { username, password });
    // 在這裡處理登入邏輯（如 API 請求）
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" placeholder="使用者名稱" />
      <input name="password" type="password" placeholder="密碼" />
      <button type="submit">登入</button>
    </form>
  );
}
```

{% note warning %}
**React 不支援 `return false`**

在 HTML 中可以用 `return false` 阻止預設行為，但在 React 中必須明確呼叫 `preventDefault()`：

```jsx
// ❌ HTML 寫法（React 無效）
<form onsubmit="return false">

// ✅ React 正確寫法
<form onSubmit={(e) => e.preventDefault()}>
```
{% endnote %}

##### stopPropagation - 阻止事件冒泡

```jsx
function App() {
  const handleParentClick = () => {
    console.log('父元素被點擊');
  };

  const handleChildClick = (e) => {
    e.stopPropagation(); // 阻止事件冒泡到父元素
    console.log('子元素被點擊');
  };

  return (
    <div onClick={handleParentClick} style={{ padding: '20px', background: 'lightgray' }}>
      父元素
      <button onClick={handleChildClick}>子元素按鈕</button>
    </div>
  );
}
```

#### 事件處理最佳實踐：狀態提升

通常建議將事件處理邏輯放在父元件（狀態所在處），子元件只負責觸發事件：

```jsx
// 子元件：純展示 + 觸發事件
function SearchInput({ value, onChange, onSearch }) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch();
    }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="搜尋。.."
      />
      <button type="submit">搜尋</button>
    </form>
  );
}

// 父元件：管理狀態 + 處理邏輯
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // 執行搜尋邏輯
    console.log('搜尋：', searchTerm);
    // 模擬 API 請求
    setResults([`結果 1 for ${searchTerm}`, `結果 2 for ${searchTerm}`]);
  };

  return (
    <div>
      <SearchInput
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}
```

**這種模式的優勢：**
- ✅ 關注點分離：UI 和邏輯分開
- ✅ 可重用性：子元件可以在不同場景使用
- ✅ 易於測試：邏輯集中在父元件
- ✅ 狀態管理清晰：所有狀態在一個地方

#### State 狀態管理
我們是使用 React 來協助我們對瀏覽器畫面進行控制，因此不能使用 JS 觀念認為我們可以用一般變數去控制 DOM 畫面重新變化。React 就像汽車雨刷器，當偵測到畫面需要更動時，才會進行畫面重新渲染，我們需要讓 React 知道什麼時候發生了狀態改變。React 提供了一些內建 Hook 來協助溝通。此時要學到的是 useState。

在 Vite 初始模板上有看到`const [count, setCount] = useState(0);`的使用，可以看出一些用法：

- useState() 的參數作為初始時，我們可以定義一開始數字為 0
- useState 會返回一個陣列，透過解構第一個會是讀取 state 當下的值定義為 count 變數，第二個會是可以修改值的方法，定義為`setCount()`函式。
- 我們可以顯示當下的 count 為多少，如`count is {count}`為例，而綁定一個 click 事件，試圖對當下 count+1 的結果放入到`setCount()`內。
- 當 React 感覺到 setCount 有更動，他會去自行觸發畫面需要重新渲染所需要的新畫面。

```jsx src\App.jsx
import { useState } from 'react';
//...

export default function App() {
  const [count, setCount] = useState(0);
  //...

  return (
    <>
      <MyLogo />
      <MyH1>{h1Title}</MyH1>
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <MyForm onLokiSubmit={onPasswordSubmit} onLokiChange={onPasswordChange} />
        <MyButton>Click Me!</MyButton>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button> {/*重點處*/}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
```

我們嘗試新規劃一個狀態管理作為我們的幻燈片操作。

```js src\component\MyGallery\data.js
const data = [
  {
    title: 'Lorem ipsum dolor. A',
    url: 'https://picsum.photos/300/200/?random=10',
  },
  {
    title: 'Lorem ipsum dolor. B',
    url: 'https://picsum.photos/300/200/?random=11',
  },
  {
    title: 'Lorem ipsum dolor. C',
    url: 'https://picsum.photos/300/200/?random=12',
  },
  {
    title: 'Lorem ipsum dolor. D',
    url: 'https://picsum.photos/300/200/?random=13',
  },
];

export default data;
```
```jsx src\component\MyGallery\MyGallery.jsx
import { useState } from 'react';
import data from './data.js';

const MyGallery = () => {
  const [idx, setIdx] = useState(0);

  /*
   * 這種寫法乍看之下沒啥問題，由於 idx 是我們讀取出來的暫存值，而狀態更新是異步的。
   * 這意味著如果在狀態更新完成之前再次調用 handlePrev 可能會使用到舊的 idx 值，導致計算錯誤。
   */
  const handlePrev = () => {
    const newCount = (idx + data.length - 1) % data.length;
    setIdx(newCount);
  };

  /*
   * 這種寫法則是利用 setIdx 提供當前的 idx 做計算，因此永遠都是確保值都是最新的不會發生錯誤。
   */
  const handleNext = () => {
    setIdx((idx) => (idx + data.length + 1) % data.length);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button>
      </div>
      <img src={data[idx].url} style={{ display: 'block' }} />
      <label>{data[idx].title}</label>
    </div>
  );
};

export default MyGallery;
```
```jsx src\App.jsx
//...
import MyGallery from './component/MyGallery/MyGallery';

export default function App() {
  //...

  return (
    <>
      <MyLogo />
      <MyH1>{h1Title}</MyH1>
      <MyGallery/> {/*重點處*/}
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <MyForm onLokiSubmit={onPasswordSubmit} onLokiChange={onPasswordChange} />
        <MyButton>Click Me!</MyButton>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
```

一個元件可以多個 state 管理，我們多控制一個 boolean 是否要顯示 title。

```jsx src\component\MyGallery\MyGallery.jsx
import { useState } from 'react';
import data from './data.js';

const MyGallery = () => {
  const [idx, setIdx] = useState(0);
  const [toShow, setToShow] = useState(true);

  const handleControl = (todo) => {
    switch (todo) {
      case 'next':
        setIdx((idx) => (idx + data.length + 1) % data.length);
        break;

      case 'prev':
        setIdx((idx) => (idx + data.length - 1) % data.length);
        break;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleControl('prev')}>prev</button>
        <button onClick={() => setToShow((bool) => !bool)}>{toShow ? 'hide' : 'show'}</button>
        <button onClick={() => handleControl('next')}>next</button>
      </div>
      <img src={data[idx].url} style={{ display: 'block' }} />
      {toShow && <label>{data[idx].title}</label>}
    </div>
  );
};

export default MyGallery;
```

> 你可以利用 JSX 的`{}`來插入一個複合邏輯並根據特性`true && element`將回傳 element，而`false && element`則回傳 false 之技巧，做一個簡易具備行內判斷的 JSX。注意：如果 JSX 出現`{false}`之表達結果代表忽略。

如果 App 元件重複使用 MyGallery 元件時，它們的 state 是彼此獨立不共享。如果希望這兩個元件共用同樣的 state，其作法是由上層負責 state，透過 prop 傳遞給下層使用。

```jsx src\component\MyGallery\MyGallery.jsx
import { useState } from 'react';
import data from './data.js';

const MyGallery = ({ toShow, setToShow }) => {
  const [idx, setIdx] = useState(0);

  const handleControl = (todo) => {
    switch (todo) {
      case 'next':
        setIdx((idx) => (idx + data.length + 1) % data.length);
        break;

      case 'prev':
        setIdx((idx) => (idx + data.length - 1) % data.length);
        break;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleControl('prev')}>prev</button>
        <button onClick={() => setToShow((bool) => !bool)}>{toShow ? 'hide' : 'show'}</button>
        <button onClick={() => handleControl('next')}>next</button>
      </div>
      <img src={data[idx].url} style={{ display: 'block' }} />
      {toShow && <label>{data[idx].title}</label>}
    </div>
  );
};

export default MyGallery;
```
```jsx src\App.jsx
import { useState } from 'react';
//...
import MyGallery from './component/MyGallery/MyGallery';

export default function App() {
  const [count, setCount] = useState(0);
  const [toShow, setToShow] = useState(true);
  //...

  return (
    <>
      <MyLogo />
      <MyH1>{h1Title}</MyH1>
      <MyGallery toShow={toShow} setToShow={setToShow} />
      <MyGallery {...{ toShow, setToShow }} /> {/*兩種寫法，如果故意同名可以用解構來速寫*/}
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <MyForm onLokiSubmit={onPasswordSubmit} onLokiChange={onPasswordChange} />
        <MyButton>Click Me!</MyButton>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

```

# 參考文獻
- [Quick Start – React](https://react.dev/learn)
