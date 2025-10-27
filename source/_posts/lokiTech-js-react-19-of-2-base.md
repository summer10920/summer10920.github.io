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
在 React 中，「元件」本質上就是由**函式**來宣告的一段程式，用來描述畫面的某一部分。你只需要撰寫一個 JavaScript 函式，並回傳 JSX，就可以建立一個自訂的元件，不需要寫 class、繼承或額外語法。這讓 React 的元件開發變得簡單、直觀，也利於複用與維護。

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
在撰寫 JSX 時，React 會根據標籤名稱自動判斷該標籤應被解讀為「React 元件」還是「原生 HTML 標籤」。**以大寫字母開頭**的標籤會被視為 React 元件，而**小寫字母開頭**的則會解讀為原生 HTML 標籤。若不小心將自訂元件以小寫命名，React 會嘗試尋找相應的 DOM 標籤，造成錯誤（找不到對應 HTML 標籤）。因此，請務必遵守元件命名規則，確保 React 能正確渲染元件。

- ✅ 必須以大寫字母開頭（`Welcome`、`MyButton`、`UserProfile`）
- ❌ 不能用小寫開頭（`welcome`、`myButton`）- React 會當成 HTML 標籤

```jsx
// ✅ 正確：大寫開頭，React 知道這是元件
<Welcome />

// ❌ 錯誤：小寫開頭，React 會尋找 <welcome> HTML 標籤
<welcome />

```

元件名稱必須大寫，用來區分 React 元件和 HTML 標籤：

```jsx
// React 元件（大寫）
<MyButton /> → React.createElement(MyButton)

// HTML 標籤（小寫）
<button /> → React.createElement('button')
```

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
React 強調「小元件組合而成大型介面」的設計理念。能否妥善組織元件結構、避開常見錯誤，將直接影響開發的可維護性與效能。

**觀念重點：**
- **外部定義元件（最佳實踐）**：例如 `Header` 若定義在元件外層，函式只建立一次，每次重新渲染只是重跑函式內容。子元件會隨父元件一起重新渲染，但元件實例（狀態）保持不變。
- **巢狀定義元件（常見陷阱）**：如果在 `App` 內部重新宣告 `Header`，每次 `App` 渲染時，`Header` 也會被認為是全新的，React 會強制重新掛載（re-mount），造成狀態丟失與效能浪費。
- **總結**：元件應該都定義在外層，勿在其他元件內部宣告。

**什麼是重新渲染？什麼是重新掛載？**

- **重新渲染 (Re-render\)**：原本的元件實例存在，只會重新執行函式內容並更新畫面。
- **重新掛載 (Re-mount\)**：舊元件被完全移除（連同所有狀態），然後建立一個全新實例。

> 元件必須定義在外部作用域，切勿在其他元件內部宣告。這有助於狀態穩定與執行效能最佳化。

**✅ 正確：扁平化定義元件**

```jsx
// 所有元件定義在同一層級外部
function Header() {
  return <h1>My App</h1>;
}

function Content() {
  return <p>Welcome!</p>;
}

function App() {
  return (
    <>
      <Header /> {/* Header 函數只建立一次，每次只是重新渲染*/}
      <Content /> {/* Content 函數只建立一次，每次只是重新渲染 */}
    </>
  );
}
```

**❌ 錯誤：巢狀定義元件**

```jsx
function App() {
  // ❌ 不要在元件內部定義另一個元件
  // 每次 App 重新渲染時，這個函數都會被重新建立
  function Header() {
    return <h1>My App</h1>;
  }
  
  return <Header />; {/* React 認為這是新元件，會重新掛載 */}
}
```

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
在 React 中，Props（properties 的縮寫）是元件之間傳遞資料的主要方式。就像函式可以接收參數一樣，React 元件可以接收 props 並根據這些資料來決定渲染的內容。

#### Props 基本概念

**三個重要特性：**
1. **唯讀（Read-Only）**
   - Props 是唯讀的，子元件不能修改接收到的 props
   - 這確保了資料流的可預測性

2. **單向資料流**
   - 資料只能從父元件傳遞到子元件
   - 這種單向流動讓程式更容易理解和除錯

3. **資料型別**
   - 可以傳遞任何 JavaScript 資料型別
   - 包括：字串、數字、布林值、物件、陣列、函式等

#### Props 基本用法

讓我們從最簡單的例子開始：

```jsx
// 1. 最基本的 props 使用方式
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Greeting name="Alice" />;
}
```

當我們需要傳遞多個 props 時：

```jsx
// 2. 傳遞多個 props
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>年齡：{props.age}</p>
      <p>城市：{props.city}</p>
    </div>
  );
}

function App() {
  return (
    <UserCard 
      name="Alice"
      age={25}
      city="台北"
    />
  );
}
```

**注意事項：**
- 字串可以直接用引號：`name="Alice"`
- 其他型別要用大括號：`age={25}`
- 布林值 `true` 可以省略值：`isActive` 等同於 `isActive={true}`

#### Props 解構寫法

在 React 中，我們常常使用解構賦值（Destructuring）來簡化 props 的使用。讓我們看看如何逐步改善程式碼：

```jsx
// 1. 基本寫法：使用 props 物件
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>年齡：{props.age}</p>
      <p>城市：{props.city}</p>
    </div>
  );
}

// 2. 解構寫法：在參數中解構
function UserCard({ name, age, city }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>年齡：{age}</p>
      <p>城市：{city}</p>
    </div>
  );
}

// 3. 函式內解構：當需要用到 props 本身時
function UserCard(props) {
  const { name, age, city } = props;
  return (
    <div>
      <h2>{name}</h2>
      <p>年齡：{age}</p>
      <p>城市：{city}</p>
    </div>
  );
}

// 使用元件
function App() {
  return <UserCard name="Alice" age={25} city="台北" />;
}
```

#### Props 傳遞各種資料類型

React 的 props 可以傳遞各種資料類型，讓我們逐一看看：

```jsx
// 1. 基本型別
function BasicProps({ 
  name,     // 字串
  age,      // 數字
  isActive  // 布林值
}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>年齡：{age}</p>
      <p>狀態：{isActive ? '啟用' : '停用'}</p>
    </div>
  );
}

// 2. 陣列與物件
function AdvancedProps({ 
  hobbies,   // 陣列
  address    // 物件
}) {
  return (
    <div>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
      <p>地址：{address.city}, {address.country}</p>
    </div>
  );
}

// 3. 函式（事件處理）
function ButtonWithHandler({ 
  onClick,    // 函式
  children    // JSX
}) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

// 使用範例
function App() {
  // 準備資料
  const userData = {
    name: "Alice",
    age: 25,
    isActive: true,
    hobbies: ["閱讀", "寫程式", "旅遊"],
    address: {
      city: "台北",
      country: "台灣"
    }
  };

  // 事件處理函式
  const handleClick = () => {
    console.log("按鈕被點擊了！");
  };

  return (
    <div>
      {/* 傳遞基本型別 */}
      <BasicProps 
        name={userData.name}
        age={userData.age}
        isActive={userData.isActive}
      />

      {/* 傳遞陣列與物件 */}
      <AdvancedProps 
        hobbies={userData.hobbies}
        address={userData.address}
      />

      {/* 傳遞函式和 JSX */}
      <ButtonWithHandler onClick={handleClick}>
        點擊我
      </ButtonWithHandler>
    </div>
  );
}
```

{% note info %}
**Props 使用的最佳實踐**

1. **命名規範**
   - Props 名稱使用小駝峰式命名（camelCase）
   - 事件處理函式以 `on` 開頭：`onClick`、`onChange`
   - 布林值 props 使用 `is`、`has` 開頭：`isActive`、`hasError`

2. **預設值處理**
   ```jsx
   function UserCard({ name = "訪客", age = 0 }) {
     return <div>{name} ({age}歲）</div>;
   }
   ```

3. **型別檢查**
   - 開發時使用 PropTypes 或 TypeScript
   - 避免傳遞錯誤的資料型別

4. **資料整理**
   - 複雜的資料處理放在父元件
   - 子元件保持簡單，專注於渲染

5. **避免過度傳遞**
   - 只傳遞必要的 props
   - 使用物件打包相關的 props
{% endnote %}

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
prop-types 只會在開發模式下提供警告，生產環境（正式 build) 不會影響效能。如果你使用 TypeScript，則不需要再用 prop-types，因為型別檢查已被 TypeScript 覆蓋。
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

React 的一大特色是可以將小元件組合成更大的元件。透過這種組合方式，我們可以：
1. 重複使用相似的 UI 結構
2. 讓程式碼更容易維護
3. 提高程式碼的可讀性

讓我們透過實際範例，一步步學習如何組合元件：

**步驟 1：建立基礎圖片元件**
```jsx src\App.jsx
// 1. 建立可重用的圖片元件
function MyImg({ logo, txt }) {
  return <img src={logo} className="logo" alt={txt} />;
}

// 2. 使用基礎元件建立兩個連結
function LinkA() {
  return (
    <a href="https://vite.dev" target="_blank">
      <MyImg 
        logo={viteLogo} 
        txt="Vite Logo" 
      />
    </a>
  );
}

function LinkB() {
  return (
    <a href="https://react.dev" target="_blank">
      <MyImg 
        logo={reactLogo} 
        txt="React Logo" 
      />
    </a>
  );
}

// 3. 組合成一個完整的 Logo 區塊
function MyLogo() {
  return (
    <div>
      <LinkA />
      <br />
      <LinkB />
    </div>
  );
}
```

**步驟 2：優化元件結構**

觀察上面的程式碼，我們可以發現 `LinkA` 和 `LinkB` 結構非常相似，只是傳入的資料不同。
讓我們將它們合併成一個更通用的 `MyLink` 元件：

```jsx src\App.jsx
// 1. 基礎圖片元件（保持不變）
function MyImg({ logo, txt }) {
  return <img src={logo} className="logo" alt={txt} />;
}

// 2. 建立通用的連結元件
function MyLink({ logo, txt, link }) {
  return (
    <a href={link} target="_blank">
      <MyImg logo={logo} txt={txt} />
    </a>
  );
}

// 3. 使用通用元件
function MyLogo() {
  return (
    <div>
      <MyLink 
        logo={viteLogo} 
        txt="Vite Logo" 
        link="https://vite.dev"
      />
      <br />
      <MyLink 
        logo={reactLogo} 
        txt="React Logo" 
        link="https://react.dev" 
      />
    </div>
  );
}
```

**步驟 3：資料與元件的分離**

在實際開發中，資料通常會從 API 或配置檔案中獲取。讓我們將資料與元件分離，使程式碼更容易維護：

```jsx src\App.jsx
// 1. 基礎圖片元件（使用物件解構）
function MyImg({ imgItem }) {
  return (
    <img 
      src={imgItem.img} 
      className="logo" 
      alt={imgItem.name} 
    />
  );
}

// 2. 通用連結元件（使用物件解構）
function MyLink({ linkItem }) {
  return (
    <a href={linkItem.url} target="_blank">
      <MyImg imgItem={linkItem} />
    </a>
  );
}

// 3. Logo 區塊（資料與渲染分離）
function MyLogo() {
  // 資料可能來自 API 或配置檔案
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
      <MyLink linkItem={dataList[0]} />
      <br />
      <MyLink linkItem={dataList[1]} />
    </div>
  );
}
```

{% note info %}
**元件組合的最佳實踐**

1. **單一職責原則**
   - 每個元件只負責一個功能
   - 避免元件過於複雜
   - 適時拆分大型元件

2. **資料流向**
   - Props 從父元件向下傳遞
   - 保持資料流向清晰
   - 避免過度傳遞 props

3. **命名規範**
   - 元件名稱使用大寫開頭
   - Props 名稱使用小駝峰式
   - 保持命名語意化

4. **程式碼組織**
   - 相關元件放在同一目錄
   - 共用元件獨立管理
   - 適當的檔案結構

5. **效能考量**
   - 避免不必要的渲染
   - 適時使用 memo 優化
   - 注意資料結構的設計
{% endnote %}

#### 匯出匯入（Export & Import）

隨著專案成長，我們需要將元件拆分到不同的檔案中，這樣可以：
- 提高程式碼的可維護性
- 方便團隊協作開發
- 實現元件的重複使用

**匯出匯入的兩種方式：**

1. **預設匯出（Default Export）**
   - 一個檔案只能有一個預設匯出
   - 匯入時可以使用任意名稱
   - 適合作為檔案的主要元件

2. **命名匯出（Named Export）**
   - 一個檔案可以有多個命名匯出
   - 匯入時需要使用大括號和原始名稱
   - 適合匯出多個相關的元件或函式

讓我們看看如何將元件拆分到不同檔案：

**步驟 1：建立元件檔案結構**

```plaintext
src/
├── components/
│   ├── MyLogo/
│   │   ├── MyLogo.jsx   # 主要元件
│   │   ├── MyLink.jsx   # 子元件
│   │   └── MyImg.jsx    # 子元件
│   └── ...
└── App.jsx
```

**步驟 2：撰寫各個元件檔案**

{% tabs React 分檔練習 %}
<!-- tab App.jsx -->
```jsx
// 1. 預設匯入：不需要大括號
import MyLogo from './components/MyLogo/MyLogo';
// 2. 樣式匯入
import './App.css';

export default function App() {
  return (
    <div>
      <MyLogo />
      {/* 其他內容。.. */}
    </div>
  );
}
```
<!-- endtab -->

<!-- tab MyLogo.jsx -->
```jsx
// 1. 資源匯入
import reactLogo from '@assets/react.svg';
import viteLogo from '@assets/vite.svg';
// 2. 命名匯入：使用大括號
import { MyLink } from './MyLink';

// 預設匯出：一個檔案只能有一個
export default function MyLogo() {
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
      {dataList.map(item => (
        <MyLink key={item.name} linkItem={item} />
      ))}
    </div>
  );
}
```
<!-- endtab -->

<!-- tab MyLink.jsx -->
```jsx
// 1. 命名匯入
import { MyImg } from './MyImg';

// 命名匯出：可以有多個
export function MyLink({ linkItem }) {
  return (
    <a href={linkItem.url} target="_blank">
      <MyImg imgItem={linkItem} />
    </a>
  );
}
```
<!-- endtab -->

<!-- tab MyImg.jsx -->
```jsx
// 命名匯出
export function MyImg({ imgItem }) {
  return (
    <img 
      src={imgItem.img} 
      className="logo" 
      alt={imgItem.name} 
    />
  );
}
```
<!-- endtab -->
{% endtabs %}

**步驟 3：使用路徑別名（Path Alias）**

在大型專案中，我們常常需要處理複雜的檔案路徑。路徑別名可以幫助我們：
- 簡化匯入路徑
- 避免過長的相對路徑
- 提高程式碼可讀性

{% note info %}
**設定路徑別名的步驟**

1. **編輯 vite.config.js**
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',               // 指向 src 目錄
      '@assets': '/src/assets',  // 指向資源目錄
      '@components': '/src/components', // 指向元件目錄
    },
  },
});
```

2. **使用別名匯入**
```jsx
// 舊寫法：使用相對路徑
import MyButton from '../../components/MyButton';
import logo from '../../assets/logo.svg';

// 新寫法：使用路徑別名
import MyButton from '@components/MyButton';
import logo from '@assets/logo.svg';
```
{% endnote %}

**實際應用範例：**

```jsx src\components\MyLogo\MyLogo.jsx
// 使用路徑別名匯入資源
import reactLogo from '@assets/react.svg';
import viteLogo from '@assets/vite.svg';
// 使用路徑別名匯入元件
import { MyLink } from '@components/MyLogo/MyLink';

export default function MyLogo() {
  return (
    <div>
      <img src={viteLogo} className="logo" alt="Vite Logo" />
      <img src={reactLogo} className="logo" alt="React Logo" />
    </div>
  );
}
```

{% note success %}
**匯出匯入的最佳實踐**

1. **檔案組織**
   - 相關元件放在同一目錄
   - 使用 index.js 匯出公開 API
   - 保持檔案結構清晰

2. **命名規範**
   - 檔案名稱與元件名稱一致
   - 使用 PascalCase 命名元件檔案
   - 使用 camelCase 命名工具檔案

3. **匯出策略**
   - 主要元件使用預設匯出
   - 工具函式使用命名匯出
   - 避免混用兩種匯出方式

4. **路徑管理**
   - 使用路徑別名避免深層相對路徑
   - 集中管理路徑別名配置
   - 保持匯入路徑一致性

5. **效能考量**
   - 使用動態匯入延遲載入
   - 適當拆分程式碼
   - 避免循環依賴
{% endnote %}

{% note warning %}
**換行符號錯誤處理**

如果發生大量的 `Delete ␍` 錯誤，這是**換行符號（Line Ending）**的問題。

**問題原因：**
- **Windows 系統**：使用 `CRLF (\r\n)` 作為換行符號
- **Unix/Linux/Mac**：使用 `LF (\n)` 作為換行符號
- **Git 差異**：不同系統間的換行符號不一致會造成版本控制問題

**錯誤症狀：**
```shell
# 在 Git 中會看到類似這樣的錯誤
warning: LF will be replaced by CRLF in src/App.jsx
The file will have its original line endings in your working directory
```

**解決方法：**

**方法 1：VSCode 右下角切換**
- 點擊 VSCode 右下角的 `CRLF` 或 `LF`
- 選擇 `LF` 並重新載入檔案

**方法 2：全域設定（推薦）**
```json .vscode/settings.json
{
  "files.eol": "\n",  // 統一使用 LF 格式
  "files.insertFinalNewline": true,  // 檔案結尾自動加入換行
  "files.trimFinalNewlines": true    // 移除多餘的結尾換行
}
```

**方法 3：Git 設定**
```bash
# 設定 Git 自動轉換換行符號
git config core.autocrlf false
git config core.eol lf
```

**預防措施：**
- 團隊統一使用 LF 格式
- 在 `.editorconfig` 檔案中設定換行符號規則
- 使用 ESLint 檢查換行符號一致性
{% endnote %}

#### 渲染列表（List Rendering）

在 React 中，我們經常需要將資料陣列轉換成元件列表來顯示。React 提供了簡單且強大的方式來處理列表渲染：

1. **使用陣列直接渲染**
   - JSX 可以直接渲染元件陣列
   - React 會自動展開陣列內容

2. **使用 map 方法轉換**
   - 將資料陣列轉換為元件陣列
   - 更靈活且易於維護

讓我們透過實際範例來學習列表渲染：
**方法 1：直接使用元件陣列**

```jsx
function SimpleList() {
  // 1. 準備資料
  const items = ['React', 'Vue', 'Angular'];
  
  // 2. 直接在 JSX 中使用陣列
  return (
    <ul>
      {[
        <li>第一個項目</li>,
        <li>第二個項目</li>,
        <li>第三個項目</li>
      ]}
    </ul>
  );
}

// 使用資料陣列（但還沒有 key）
function LogoList() {
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
      {[
        <MyLink linkItem={dataList[0]}></MyLink>,
        <MyLink linkItem={dataList[1]} />
      ]}
    </div>
  );
}

```

**重要：列表渲染中的 key**

當我們執行上面的程式碼時，會在 console 看到警告：

```shell
Warning: Each child in a list should have a unique "key" prop.
```

{% note warning %}
**為什麼需要 key？**

React 需要 `key` 屬性來識別列表中的每個元素，這樣才能：
- 正確追蹤元素的變化
- 優化重新渲染的效能
- 維護元素的狀態

**key 的特性：**
1. 在同一個列表中必須唯一
2. 不會作為 props 傳遞給元件
3. 應該保持穩定（不要使用隨機數或索引）

**選擇 key 的原則：**
- ✅ 使用資料的唯一識別（如 ID）
- ✅ 使用穩定且唯一的值
- ❌ 避免使用索引（index）作為 key
- ❌ 避免使用不穩定的值（如隨機數）
{% endnote %}

讓我們修改程式碼，加入適當的 key：

**方法 2：使用 map 方法**

```jsx
// 1. 簡單的列表範例
function SimpleList() {
  const items = ['React', 'Vue', 'Angular'];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// 2. 使用物件陣列
function LogoList() {
  const dataList = [
    {
      id: 1,          // 加入唯一識別
      name: 'Vite Logo',
      img: viteLogo,
      url: 'https://vite.dev',
    },
    {
      id: 2,          // 加入唯一識別
      name: 'React Logo',
      img: reactLogo,
      url: 'https://react.dev',
    },
  ];

  return (
    <div>
      {dataList.map(item => (
        <MyLink 
          key={item.id}    // 使用唯一識別作為 key
          linkItem={item} 
        />
      ))}
    </div>
  );
}
```

{% note info %}
**map 方法的優點：**

1. **更具彈性**
   - 可以對資料進行轉換
   - 可以加入條件判斷
   - 程式碼更容易維護

2. **更好的效能**
   - React 可以更有效地追蹤變化
   - 減少不必要的重新渲染

3. **更好的可讀性**
   - 程式碼更簡潔
   - 邏輯更清晰
{% endnote %}

{% note success %}
**列表渲染的進階技巧**

1. **條件渲染**
```jsx
{items.map(item => (
  item.isVisible && (
    <ListItem 
      key={item.id} 
      data={item} 
    />
  )
))}
```

2. **資料轉換**
```jsx
{items.map(item => (
  <ListItem 
    key={item.id}
    title={item.name.toUpperCase()}
    {...item}
  />
))}
```

3. **巢狀列表**
```jsx
{categories.map(category => (
  <div key={category.id}>
    <h2>{category.name}</h2>
    <ul>
      {category.items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
))}
```
{% endnote %}

#### 實作範例：規劃為渲染列表

現在讓我們把之前的 Logo 元件改寫成使用列表渲染的方式：

```jsx src\component\MyLogo\MyLogo.jsx
export default function MyLogo() {
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

  return (
    <div>
      {dataList.map((val) => (
        <MyLink key={val.id} linkItem={val} />
      ))}
    </div>
  );
}
```

這個改寫有幾個重點：
1. 加入 `id` 作為唯一識別
2. 使用 `map` 方法轉換資料
3. 設定 `key` 屬性避免警告
4. 使用 `div` 包裹確保返回單一根元素
5. 移除未使用的 `myBr` 變數

這樣的寫法不僅更簡潔且易於擴充，同時也符合 React 的基本原則：
- 每個元件必須返回單一根元素
- 列表項目需要唯一的 key
- 資料與渲染邏輯分離

#### 作為 children 傳遞

在 React 中，`children` 是一個特殊的 prop，它代表元件標籤之間的內容。這個機制讓我們能夠建立更靈活的可重用元件。

{% note info %}
**children prop 的三個重要特性：**

1. **自動傳遞**
   - React 自動收集標籤內的內容
   - 不需要明確宣告或傳遞
   - 可以包含任何有效的 JSX

2. **彈性使用**
   - 可以傳遞文字、數字
   - 可以傳遞其他 React 元件
   - 可以傳遞複雜的 JSX 結構

3. **容器模式**
   - 適合建立包裝元件
   - 方便實現共用的 UI 結構
   - 提高程式碼重用性
{% endnote %}

**為什麼需要 children？**

想像一下，如果沒有 children，我們要建立一個通用的卡片元件：

```jsx
// ❌ 不好的做法：需要定義很多 props
function Card({ title, content, footer }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{content}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}

// 使用時很不靈活
<Card 
  title="標題"
  content={<p>內容</p>}
  footer={<button>確定</button>}
/>
```

使用 children 後：

```jsx
// ✅ 好的做法：使用 children 更靈活
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// 使用時更直覺且靈活
<Card>
  <h2>我的標題</h2>
  <p>任何內容都可以</p>
  <img src="圖片。jpg" />
  <button>甚至可以放按鈕</button>
</Card>
```

這就是為什麼我們需要 children：
- 更靈活的內容傳遞
- 更直覺的元件使用方式
- 更好的程式碼可維護性

#### 實作範例：使用 children 改寫標題元件

讓我們透過實際的例子來了解如何使用 children prop：

```jsx src\component\MyH1\MyH1.jsx
/*
  **React 元件的不同宣告方式**

  1. 使用函式宣告（Function Declaration）
  function MyH1({ children }) {
    return <h1>{children}</h1>;
  }
  
  2. 使用箭頭函式（Arrow Function）
  const MyH1 = ({ children }) => <h1>{children}</h1>;
  
  3. 使用函式表達式（Function Expression）
  const MyH1 = function({ children }) {
    return <h1>{children}</h1>;
  };
*/

// 這三種寫法都是合法的，我們使用第二種
const MyH1 = ({ children }) => <h1>{children}</h1>;

export default MyH1;
```

然後在 App 元件中使用它：

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

## 互動性
畫面上的某些內容會根據使用者輸入事件進行更新。例如 click 或 change value，在 React 中，隨時間操作變化的資料稱為 state 狀態。您可以為任何 component 元件新增 state 狀態，並根據需要更新它。在本章中，您將學習如何編寫處理互動、更新其狀態並隨時間顯示不同輸出的元件。

### 事件處理（Events）
React 實作了一個跨瀏覽器的合成事件系統（SyntheticEvent），統一了各瀏覽器的事件處理差異，讓開發者不需要擔心瀏覽器相容性問題。

**React 事件 vs HTML 事件**

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

在 React 中，我們有三種主要的事件處理方式：

1. **內聯匿名函式**：適合簡單的邏輯處理
2. **元件內部函式**：推薦的做法，讓程式碼更清晰且易於維護
3. **傳遞給子元件**：在父元件中管理狀態，讓子元件保持純粹

```jsx
// 1. 內聯匿名函式（適合簡單邏輯）
function App() {
  return (
    <button onClick={() => alert('Clicked!')}>
      Click Me
    </button>
  );
}

// 2. 元件內部函式（推薦）
function App() {
  const handleClick = () => {
    alert('Clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}

// 3. 傳遞事件處理函式給子元件
function MyButton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <MyButton onClick={handleClick}>Click Me</MyButton>;
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

#### 常用的 React 事件

React 支援所有標準的 DOM 事件，這裡列出最常用的：

| 事件類型     | 事件名稱        | 說明               | 範例                                                |
| ------------ | --------------- | ------------------ | --------------------------------------------------- |
| **滑鼠事件** | `onClick`       | 點擊               | `<button onClick={handleClick}>點擊</button>`       |
|              | `onDoubleClick` | 雙擊               | `<div onDoubleClick={handleDoubleClick}>雙擊</div>` |
|              | `onMouseEnter`  | 滑鼠移入           | `<div onMouseEnter={handleEnter}>移入</div>`        |
|              | `onMouseLeave`  | 滑鼠移出           | `<div onMouseLeave={handleLeave}>移出</div>`        |
|              | `onMouseMove`   | 滑鼠移動           | `<div onMouseMove={handleMove}>移動</div>`          |
|              | `onMouseDown`   | 滑鼠按下           | `<button onMouseDown={handleDown}>按下</button>`    |
|              | `onMouseUp`     | 滑鼠放開           | `<button onMouseUp={handleUp}>放開</button>`        |
| **鍵盤事件** | `onKeyDown`     | 按鍵按下           | `<input onKeyDown={handleKeyDown} />`               |
|              | `onKeyUp`       | 按鍵放開           | `<input onKeyUp={handleKeyUp} />`                   |
|              | `onKeyPress`    | 按鍵按下（已廢棄） | 建議使用 `onKeyDown`                                |
| **表單事件** | `onChange`      | 輸入值改變         | `<input onChange={handleChange} />`                 |
|              | `onSubmit`      | 表單提交           | `<form onSubmit={handleSubmit}>`                    |
|              | `onFocus`       | 獲得焦點           | `<input onFocus={handleFocus} />`                   |
|              | `onBlur`        | 失去焦點           | `<input onBlur={handleBlur} />`                     |
| **其他事件** | `onScroll`      | 滾動               | `<div onScroll={handleScroll}>滾動</div>`           |
|              | `onDrag`        | 拖曳               | `<div onDrag={handleDrag}>拖曳</div>`               |
|              | `onDrop`        | 放置               | `<div onDrop={handleDrop}>放置</div>`               |
|              | `onLoad`        | 載入完成           | `<img onLoad={handleLoad} />`                       |
|              | `onError`       | 載入錯誤           | `<img onError={handleError} />`                     |

**實際範例：綜合事件處理**

```jsx
function EventDemo() {
  const [message, setMessage] = useState('請與我互動');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 滑鼠事件
  const handleClick = () => setMessage('你點擊了按鈕！');
  const handleMouseEnter = () => setMessage('滑鼠移入了！');
  const handleMouseLeave = () => setMessage('滑鼠移出了！');
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setMessage(`滑鼠位置：${e.clientX}, ${e.clientY}`);
  };

  // 鍵盤事件
  const handleKeyDown = (e) => {
    setMessage(`按下了鍵：${e.key}`);
  };

  // 表單事件
  const handleChange = (e) => {
    setMessage(`輸入內容：${e.target.value}`);
  };

  return (
    <div>
      <h3>{message}</h3>
      <p>滑鼠座標：{position.x}, {position.y}</p>
      
      <button onClick={handleClick}>點擊我</button>
      
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}
      >
        滑鼠互動區域
      </div>
      
      <input 
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="輸入文字或按鍵"
      />
    </div>
  );
}
```

#### 事件物件（Event Object）
React 事件處理函式會自動接收一個 `SyntheticEvent` 物件，它封裝了原生 DOM 事件，提供跨瀏覽器的一致性：

| 屬性                              | 說明                 | 範例                               |
| --------------------------------- | -------------------- | ---------------------------------- |
| `event.type`                      | 事件類型             | `"click"`, `"change"`, `"keydown"` |
| `event.target`                    | 觸發事件的元素       | `<button>`, `<input>`              |
| `event.currentTarget`             | 綁定事件的元素       | 通常與 `target` 相同               |
| `event.clientX` / `event.clientY` | 滑鼠相對於視窗的座標 | `150`, `200`                       |
| `event.pageX` / `event.pageY`     | 滑鼠相對於頁面的座標 | `150`, `200`                       |
| `event.screenX` / `event.screenY` | 滑鼠相對於螢幕的座標 | `150`, `200`                       |
| `event.preventDefault()`          | 阻止預設行為         | 阻止表單提交、連結跳轉             |
| `event.stopPropagation()`         | 阻止事件冒泡         | 防止事件向上傳播                   |

**實際範例：事件物件使用**

```jsx
function EventObjectDemo() {
  const [log, setLog] = useState([]);

  const addLog = (message) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleClick = (event) => {
    addLog(`點擊事件 - 類型：${event.type}`);
    addLog(`目標元素：${event.target.tagName}`);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // 阻止表單預設提交
    addLog('表單提交被阻止');
  };

  const handleInputChange = (event) => {
    addLog(`輸入值：${event.target.value}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addLog('按下了 Enter 鍵');
    }
  };

  return (
    <div>
      <h3>事件日誌</h3>
      <div>
        {log.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      
      <button onClick={handleClick}>點擊我</button>
      
      <form onSubmit={handleFormSubmit}>
        <input 
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="輸入文字"
        />
        <button type="submit">提交表單</button>
      </form>
    </div>
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

#### 實作範例：事件物件與處理

讓我們透過實際的專案範例來學習事件處理的應用。我們將建立一個按鈕元件和表單元件，展示不同的事件處理方式。

**步驟 1：建立按鈕元件**

```jsx src\component\MyButton\MyButton.jsx
const handleClick = () => console.log('is click event!!');
const MyButton = ({ children }) => <button onClick={handleClick}>{children}</button>;

export default MyButton;
```

這個按鈕元件展示了基本的事件處理：
- 使用 `onClick` 屬性綁定點擊事件
- 事件處理函式 `handleClick` 在元件內部定義
- 透過 `children` prop 接收按鈕文字

**步驟 2：在 App 中使用按鈕元件**

```jsx src\App.jsx
import { useState } from 'react';
import './App.css';
import MyLogo from './component/MyLogo/MyLogo';
import MyH1 from './component/MyH1/MyH1';
import MyButton from './component/MyButton/MyButton';

export default function App() {
  const [count, setCount] = useState(0);
  const h1Title = 'Vite + React';

  return (
    <>
      <MyLogo />
      <MyH1>{h1Title}</MyH1>
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <MyButton>Click Me!</MyButton>{/*追加此行*/}
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>{/*原本的事件按鈕*/}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
```

這裡展示了兩種不同的按鈕：
- **自定義元件**：`<MyButton>` 使用元件內部的事件處理
- **內聯事件**：`onClick={() => setCount(...)}` 直接在 JSX 中定義

**步驟 3：建立表單元件（preventDefault 應用）**

```jsx src\component\MyForm\MyForm.jsx
import MyButton from '../MyButton/MyButton';

const MyForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表單預設提交行為
    console.log('submit');
  };

  const handelChangeText = (e) => {
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="請輸入內容" onChange={handelChangeText} />
      <MyButton>提交</MyButton>
      <hr />
    </form>
  );
};

export default MyForm;
```

這個表單元件展示了：
- **`preventDefault()`**：阻止表單的預設提交行為（頁面重新載入）
- **`onChange` 事件**：監聽輸入框內容變化
- **事件物件使用**：透過 `e.target.value` 取得輸入值

**步驟 4：整合表單到 App**

```jsx src\App.jsx
//...
import MyForm from './component/MyForm/MyForm';

export default function App() {
  const [count, setCount] = useState(0);
  const h1Title = 'Vite + React';

  return (
    <>
      <MyLogo />
      <MyH1>{h1Title}</MyH1>
      <div className="card" style={{ color: 'red', background: 'black' }}>
        <MyForm /> {/*追加此行*/}
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

#### 事件處理最佳實踐：狀態提升

通常建議將事件處理邏輯放在父元件（狀態所在處），子元件只負責觸發事件：

**這種模式的優勢：**
- ✅ 關注點分離：UI 和邏輯分開
- ✅ 可重用性：子元件可以在不同場景使用
- ✅ 易於測試：邏輯集中在父元件
- ✅ 狀態管理清晰：所有狀態在一個地方

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

#### 實作範例：狀態提升

讓我們透過實際範例來學習狀態提升的概念。我們將修改 `MyForm` 元件，將事件處理邏輯提升到父元件 `App` 中。

**步驟 1：修改 MyForm 元件（移除內部事件處理）**

這個修改展示了：
- **移除內部事件處理**：註解掉原本的 `handleSubmit` 和 `handelChangeText`
- **接收 props 函式**：透過 `onLokiSubmit` 和 `onLokiChange` 接收父元件傳入的事件處理函式
- **純粹的 UI 元件**：元件只負責渲染，不包含業務邏輯

```jsx src\component\MyForm\MyForm.jsx
import MyButton from '../MyButton/MyButton';

const MyForm = ({ onLokiSubmit, onLokiChange }) => {
  // 原本的事件處理函式被註解掉，改由父元件提供
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('submit');
  // };

  // const handelChangeText = (e) => {
  //   console.log(e.target.value);
  // };

  return (
    <form onSubmit={onLokiSubmit}>
      <input type="text" placeholder="請輸入內容" onChange={onLokiChange} />
      <MyButton>提交</MyButton>
      <hr />
    </form>
  );
};

export default MyForm;
```

**步驟 2：在 App 中實現事件處理邏輯**

這個實作展示了：
- **事件處理提升**：將 `MyForm` 的事件處理邏輯移到 `App` 元件
- **自由命名 props**：父元件可以自由命名函式（如 `onPasswordSubmit`），然後傳給子元件
- **props 傳遞**：透過 `onLokiSubmit={onPasswordSubmit}` 將父元件的函式傳給子元件

```jsx src\App.jsx
//...
export default function App() {
  const [count, setCount] = useState(0);
  const h1Title = 'Vite + React';

  /*提升 MyForm 事件處理至父層，父層自由命名 props，提供給子層*/
  const onPasswordSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };
  const onPasswordChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <MyLogo />
      <MyH1>{h1Title}</MyH1>
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

**狀態提升的優勢：**

1. **關注點分離**：UI 元件專注於渲染，邏輯元件專注於業務邏輯
2. **可重用性**：`MyForm` 可以在不同場景使用，只需傳入不同的事件處理函式
3. **易於測試**：邏輯集中在父元件，更容易進行單元測試
4. **狀態管理清晰**：所有狀態和邏輯都在父元件中，便於管理

{% note info %}
**狀態提升的核心概念**

- **子元件**：只負責 UI 渲染，透過 props 接收事件處理函式
- **父元件**：負責狀態管理和業務邏輯，將函式透過 props 傳遞給子元件
- **命名自由**：父元件可以自由命名函式，子元件透過 props 名稱接收
{% endnote %}

### State 狀態管理
在傳統的 JavaScript 中，我們可以直接操作 DOM 來更新畫面：

```js
// 傳統 JavaScript 方式
let count = 0;
const button = document.getElementById('myButton');
const display = document.getElementById('display');

button.addEventListener('click', () => {
  count++;
  display.textContent = `count is ${count}`;
});
```

但在 React 中，我們不能直接操作 DOM，因為 React 使用**虛擬 DOM（Virtual DOM）**來管理畫面更新。

#### 虛擬 DOM 的概念

React 的虛擬 DOM 是一個 JavaScript 物件，它代表真實 DOM 的結構：

```jsx
// 虛擬 DOM 物件（簡化版）
const virtualDOM = {
  type: 'div',
  props: {
    children: [
      {
        type: 'button',
        props: {
          onClick: handleClick,
          children: 'Click me'
        }
      },
      {
        type: 'span',
        props: {
          children: `count is ${count}`
        }
      }
    ]
  }
};
```

**虛擬 DOM 的工作流程：**
1. **狀態改變**：當 `useState` 的 setter 被調用時
2. **重新渲染**：React 重新執行元件函式，產生新的虛擬 DOM
3. **差異比較**：React 比較新舊虛擬 DOM 的差異（Diffing）
4. **更新真實 DOM**：只更新有變化的部分

{% mermaid graph LR %}
A["狀態改變<br/>（setState/setter）"]
B["元件重新執行<br/>產生新虛擬 DOM"]
C["差異比較（Diffing）<br/>新舊虛擬 DOM"]
D["只更新有變化部分<br/>同步至真實 DOM"]

A --> B --> C --> D
{% endmermaid %}

**為什麼需要虛擬 DOM？**

傳統的 DOM 操作存在以下問題：

1. **效能瓶頸**：直接操作 DOM 會觸發瀏覽器的重排（reflow）和重繪（repaint），這些都是昂貴的操作
2. **頻繁更新**：每次狀態改變都要重新計算整個 DOM 樹
3. **難以追蹤**：手動管理 DOM 更新容易出錯，難以維護

**虛擬 DOM 的優勢：**

- **批量更新**：將多個 DOM 操作合併為一次更新
- **差異比較**：只更新真正改變的部分，避免不必要的 DOM 操作
- **預測性**：透過 JavaScript 物件操作，比直接操作 DOM 更快
- **跨瀏覽器一致性**：統一不同瀏覽器的 DOM 操作差異

**效能對比範例：**

```js
// ❌ 傳統 DOM 操作（效能差）
function updateCounter(count) {
  // 每次都要重新查詢和更新 DOM
  document.getElementById('counter').textContent = count;
  document.getElementById('status').textContent = count > 10 ? 'High' : 'Low';
  document.getElementById('progress').style.width = count + '%';
}

// ✅ React 虛擬 DOM（效能好）
function Counter({ count }) {
  return (
    <div>
      <span>{count}</span>
      <span>{count > 10 ? 'High' : 'Low'}</span>
      <div style={{ width: count + '%' }} />
    </div>
  );
}
```

React 的虛擬 DOM 設計讓開發者可以專注於狀態管理，而不用擔心 DOM 操作的效能問題。

#### useState Hook 基本概念

`useState` 是 React 提供的一個 Hook，用於在函式元件中管理狀態：

```jsx
const [state, setState] = useState(initialValue);
```

**useState 的特點：**
- **參數**：`initialValue` 是狀態的初始值
- **返回值**：返回一個陣列，包含兩個元素
  - `state`：當前的狀態值
  - `setState`：更新狀態的函式
- **重新渲染**：當 `setState` 被調用時，元件會重新渲染

**基本使用範例：**

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 初始值為 0
  
  return (
    <div>
      <p>count is {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### 狀態更新的兩種方式

React 提供了兩種更新狀態的方式，理解它們的差異對於避免常見的狀態更新錯誤非常重要。

**方式 1：直接傳遞新值**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1); // 使用當前 count 值
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+1</button>
      </div>
  );
}
```

**方式 2：使用函式更新（推薦）**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1); // 使用前一個值
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}
```

**為什麼推薦使用函式更新？**

讓我們透過實際範例來理解兩種方式的差異：

**問題場景：快速點擊按鈕**

```jsx
function ProblematicCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ❌ 問題：快速點擊時可能使用舊的 count 值
    setCount(count + 1);
    setCount(count + 1); // 第二次更新可能基於舊值
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+2 （可能有問題）</button>
    </div>
  );
}
```

**解決方案：使用函式更新**

```jsx
function FixedCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ✅ 正確：每次更新都基於最新的狀態值
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1); // 確保使用最新值
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+2 （正確）</button>
    </div>
  );
}
```
**關鍵差異總結：**

| 特性         | 直接傳遞新值     | 函式更新           |
| ------------ | ---------------- | ------------------ |
| **基於值**   | 當前渲染的狀態值 | 最新的狀態值       |
| **異步安全** | ❌ 可能使用舊值   | ✅ 總是使用最新值   |
| **批量更新** | ❌ 可能計算錯誤   | ✅ 正確處理         |
| **適用場景** | 簡單的單次更新   | 複雜邏輯、多次更新 |

**最佳實踐建議：**

1. **簡單更新**：如果只是簡單的單次更新，兩種方式都可以
2. **複雜邏輯**：涉及條件判斷或多次更新時，必須使用函式更新
3. **依賴前值**：當新值依賴於前一個值時，使用函式更新
4. **批量操作**：多個狀態更新時，使用函式更新確保正確性

#### 實作範例：圖片幻燈片

讓我們透過建立一個圖片幻燈片元件來學習 useState 的實際應用。這個範例將展示多個狀態管理、條件渲染，以及狀態提升的概念。

**步驟 1：準備圖片資料**

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

**步驟 2：建立基礎幻燈片元件**

```jsx src\component\MyGallery\MyGallery.jsx
import { useState } from 'react';
import data from './data.js';

const MyGallery = () => {
  const [idx, setIdx] = useState(0); // 當前圖片索引

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

這個基礎版本展示了：
- **單一狀態管理**：使用 `idx` 來追蹤當前圖片
- **狀態更新**：`handlePrev` 使用直接賦值，`handleNext` 使用函式更新
- **陣列索引計算**：使用模運算實現循環切換

**步驟 3：添加多個狀態管理**
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

這個版本展示了：
- **多個狀態**：`idx` 和 `toShow` 兩個獨立的狀態
- **條件渲染**：使用 `{toShow && <label>}` 來控制標題顯示
- **函式更新**：`setToShow((bool) => !bool)` 切換布林值

**步驟 4：狀態提升到父元件**

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

這個最終版本展示了：
- **狀態提升**：將 `toShow` 狀態提升到 `App` 元件
- **共享狀態**：兩個 `MyGallery` 元件共享同一個 `toShow` 狀態
- **props 傳遞**：透過 props 將狀態和更新函式傳遞給子元件
- **解構語法**：`{...{ toShow, setToShow }}` 簡化 props 傳遞

{% note info %}
**條件渲染技巧**

使用 `{condition && <element>}` 來實現條件渲染：
- `true && element` 回傳 `element`
- `false && element` 回傳 `false`（React 會忽略）
- 比 `condition ? <element> : null` 更簡潔
{% endnote %}

# 參考文獻
- [Quick Start – React](https://react.dev/learn)
