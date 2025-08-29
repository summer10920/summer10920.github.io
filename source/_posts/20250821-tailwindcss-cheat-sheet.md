---
title: '[基礎課程] TailwindCSS v4.1 - 簡介與公式表'
categories:
  - Misc Notes
  - Web Frontend
tag:
  - CSS
  - TailwindCSS
  - 前端框架
  - 原子化 CSS
date: 2025-08-21 14:26:44
hidden: true
---

![](/assets/images/banner/tailwind.png)

TailwindCSS 是一個功能類優先的 CSS 框架，它提供了大量預定義的實用工具類，讓您能夠快速構建現代化的使用者介面。本課程將深入介紹 TailwindCSS 的核心概念、安裝方法，並提供完整的公式表供快速參考。

<!-- more -->

# 介紹 TailwindCSS

TailwindCSS 是由 Adam Wathan 開發的現代化 CSS 框架，採用「功能類優先」（Utility-First）的設計理念。與傳統的 CSS 框架不同，TailwindCSS 不提供預製的元件，而是提供數百個實用工具類，讓開發者直接在 HTML 中組合使用。

## 設計哲學
TailwindCSS 的設計哲學是「約束創造自由」。通過提供一套一致的設計系統，開發者可以專注於功能實現，而不必擔心樣式設計的一致性問題。

{% note info %}
**TailwindCSS 的三大特色：**

1. **功能類優先**：直接在 HTML 中使用預定義的 CSS 類別
2. **響應式設計**：內建響應式斷點系統
3. **高度可定制**：可根據專案需求調整配置
{% endnote %}

## 與 Bootstrap 比較

雖然 TailwindCSS 和 Bootstrap 都是 CSS 框架，但它們的設計理念和使用方式有顯著差異。

| 特性       | TailwindCSS  | Bootstrap  |
| ---------- | ------------ | ---------- |
| 設計哲學   | 功能類優先   | 元件優先   |
| 學習曲線   | 較陡峭       | 較平緩     |
| 檔案大小   | 可優化至很小 | 相對較大   |
| 定制性     | 高度可定制   | 有限定制   |
| 設計一致性 | 需要自行維護 | 內建一致性 |

### 使用場景

{% note primary %}
**選擇建議：**

- **選擇 TailwindCSS**：需要高度定制化、追求最小化 CSS 檔案、團隊有設計系統
- **選擇 Bootstrap**：快速原型開發、需要現成元件、團隊缺乏設計資源
{% endnote %}

### 程式碼對比範例

**Bootstrap 方式：**
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">標題</h5>
    <p class="card-text">內容</p>
    <button class="btn btn-primary">按鈕</button>
  </div>
</div>
```

**TailwindCSS 方式：**
```html
<div class="bg-white rounded-lg shadow-md p-6">
  <h5 class="text-xl font-semibold mb-2">標題</h5>
  <p class="text-gray-600 mb-4">內容</p>
  <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    按鈕
  </button>
</div>
```

## Tree-shaking 機制
Tree-shaking 是一種優化技術，用於移除專案中未使用的程式碼。在使用 TailwindCSS 時，透過 PostCSS 插件和 Node.js 建置流程，可以自動移除未使用的 CSS 類別，達到檔案優化的目的：

- 掃描專案檔案並識別實際使用的 CSS 類別
- 移除未使用的樣式並產生最小化的 CSS 檔案
- 開發時可使用全部功能類別，建置時自動優化
- 最終的 CSS 檔案大小可以從數 MB 縮減到幾 KB，大幅提升網站載入速度與效能。

{% mermaid graph LR %}
A["完整的 TailwindCSS<br/>（數 MB）"]
B["掃描專案檔案"]
C["識別使用的類別"]
D["移除未使用樣式"]
E["最終 CSS<br/>（幾 KB）"]

A --> B
B --> C
C --> D
D --> E
{% endmermaid %}

# 安裝方式
TailwindCSS 提供兩種主要安裝方式：**CDN** 與 **Node 安裝**。CDN 不需要任何設定就能使用，但會載入完整樣式表；Node 安裝需要搭配 `tailwind.config.js` 綁定掃描路徑，建置時可自動移除未使用的樣式（Tree-shaking / Purge）。

## 使用 CDN（快速開始）
最簡單的方式，適合學習與快速原型：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1 class="text-3xl font-bold text-blue-600">Hello TailwindCSS!</h1>
</body>
</html>
```

此外，在不建立專案建置流程的前提下，仍可透過行內設定客製化主題，但注意的是，這樣的設定方式不支援所有外掛生態，僅適合簡單客製。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              brand: '#0ea5e9'
            }
          }
        }
      }
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <button class="bg-brand text-white px-4 py-2 rounded">Brand</button>
  </body>
  </html>
```

{% note warning %}
**注意：CDN 特色**
- 不需配置 `tailwind.config.js`
- 載入完整樣式表，檔案較大，不建議用於生產環境
- CDN 模式不會 Tree-shake，且外掛支援有限；複雜專案請改用 Node 安裝。
{% endnote %}

## 使用 Node 安裝（建議）
適合正式專案，可客製化與移除未用樣式，產出最小化 CSS。由於 Tailwind CSS 本身就是一個 PostCSS 的外掛，因此需要 PostCSS 這個 JavaScript 工具來處理與轉換 CSS。PostCSS 不僅能讓 Tailwind 的功能類別轉換成真正的 CSS，透過 autoprefixer 外掛還可以自動添加瀏覽器前綴（例如 -webkit-）。

大多數使用 Tailwind CSS 的環境都是 Node 環境，因此在 Node 環境下安裝 Tailwind CSS 最簡單的方式是使用 npm。

**優點：**
- 可設定 `content` 掃描路徑，自動移除未使用的類別
- 可客製主題、安裝外掛、支援深色模式策略
- 整合現代建置工具（Vite、Webpack、Rollup 等）

### 方式一：Vite + Tailwind
Vite + Tailwind 適合現代前端專案，特別是使用 React、Vue、Svelte 等框架的複雜應用。這種方式提供優秀的開發體驗，包括快速的熱重載、現代 JavaScript 語法支援、內建最佳化和程式碼分割功能。對於需要多人協作、效能優化或未來擴展的生產專案來說，Vite + Tailwind 是最佳選擇。

[Vite](https://vitejs.dev/) 是現今最受歡迎的前端建置工具之一，相較於傳統的 Webpack，它具有以下優勢：

- 開發環境使用原生 ES 模組，不需打包，啟動速度比 Webpack 快 10-100 倍
- 簡單的配置方式，不需要複雜的 webpack.config.js
- 內建開發伺服器，支援 HMR (Hot Module Replacement)
- 預設支援 TypeScript、JSX、CSS 等多種檔案格式

Tailwind CSS v4.1 針對 Vite 用戶提供了全新的 `@tailwindcss/vite` 插件，大幅簡化了安裝和配置流程。新版本不再需要手動配置 PostCSS，讓設定更加簡潔。

{% note info %}
**TailwindCSS v4.1 的新特性：**
- 全新的 `@tailwindcss/vite` 官方插件
- 自動處理 PostCSS 配置
- 更快的建置速度
- 簡化的設定流程
- 更好的開發體驗
{% endnote %}

以下是在 Vite 專案中安裝 Tailwind CSS v4.1 的步驟：

```bash
# 建立 Vite 專案（如果還沒有的話）
# --------------------------------------------------------------------
# npm create vite@latest：使用 npm 建立最新的 Vite 專案
# my-project：專案資料夾名稱，可自行修改
# --------------------------------------------------------------------
npm create vite@latest my-project

# 切換路徑進入專案資料夾
# --------------------------------------------------------------------
cd my-project

# 安裝 Tailwind CSS v4.1
# --------------------------------------------------------------------
# npm install：安裝套件
# tailwindcss：Tailwind CSS 核心套件
# @tailwindcss/vite：Tailwind CSS v4.1 的官方 Vite 插件
# --------------------------------------------------------------------
npm install tailwindcss @tailwindcss/vite
```

設定 `vite.config.js` 來啟用 Tailwind CSS v4.1 插件：

```js vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // plugins：Vite 插件配置
  plugins: [
    // @tailwindcss/vite：Tailwind CSS v4.1 的官方 Vite 插件
    tailwindcss(),
  ],
})
```

{% note info %}
**v4.1 的改進：**
- 不再需要手動建立 `tailwind.config.js` 和 `postcss.config.js`
- 插件會自動處理所有必要的配置
- 更簡潔的設定流程
- 更好的開發體驗
{% endnote %}

在 CSS 檔案中引入 Tailwind CSS：

```css src/index.css
/* 引入 Tailwind CSS v4.1 */
@import "tailwindcss";
```

{% note info %}
**v4.1 的新語法：**
- 使用 `@import "tailwindcss"` 替代舊版的 `@tailwind` 指令
- 更簡潔的引入方式
- 自動包含所有 Tailwind CSS 功能
{% endnote %}

在入口檔匯入樣式（例如 `main.js`）：

```js src/main.js
// import：ES6 模組語法，用來引入其他檔案
// './index.css'：引入同目錄下的 index.css 檔案
import './index.css'
```

啟動開發伺服器：

```bash
# npm run dev：執行 package.json 中定義的 dev 指令
# 這會啟動 Vite 開發伺服器，通常在 http://localhost:5173
npm run dev
```

{% note success %}
**v4.1 的優勢：**
- 自動熱重載：修改 CSS 或 HTML 時，變更會立即反映在瀏覽器中
- 更快的編譯速度：優化的編譯流程，減少等待時間
- 更好的錯誤提示：更清晰的錯誤訊息和警告
- 簡化的配置：不需要額外的設定檔案
{% endnote %}

核對 `package.json` 指令（若使用官方範本通常已內建）：

```json package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "tailwindcss": "^4.1.0",
    "@tailwindcss/vite": "^4.1.0"
  }
}
```

{% note info %}
**package.json scripts 說明：**
- `"dev": "vite"`：開發模式，啟動開發伺服器
- `"build": "vite build"`：建置生產版本，自動優化 Tailwind CSS
- `"preview": "vite preview"`：預覽建置後的檔案
{% endnote %}

{% note warning %}
**注意：**
- v4.1 版本會自動處理所有 Tailwind CSS 相關的配置
- 不需要手動配置 PostCSS 或其他工具
- 執行 `vite build` 打包時會自動移除未使用的樣式（Tree-shaking），優化最終的 CSS 檔案大小
- 使用 `@import "tailwindcss"` 替代舊版的 `@tailwind` 指令
{% endnote %}

{% note info %}
**npm 與 npx（v4.1 版本）**
npm（Node Package Manager）主要用途是管理套件（安裝 / 移除 / 更新 / 執行 scripts）。

常見用途為：
- `npm install <package>` → 安裝套件
- `npm uninstall <package>` → 移除套件
- `npm run <script>` → 執行 package.json 裡的自定義指令（scripts 區塊）

特色：
- 安裝套件到 `node_modules`（依據是全域或專案本地）
- 是一個「套件管理工具」

npx（Node Package Execute，隨 npm 5.2+ 版本內建）主要用途是直接執行套件

常見用途：
- `npx <package>` → 執行一個套件（不需要先全域安裝）
- 範例：`npx @tailwindcss/vite init`（v4.1 新指令）
  - 這裡 Tailwind CSS v4.1 初始化工具就算沒全域安裝，仍然能臨時下載、執行

特色：
- 不需要全域安裝工具，減少污染
- 優先執行專案 `node_modules/.bin` 裡的指令
- 如果專案沒有，就會臨時下載一個可執行版本
{% endnote %}

### 方式二：Tailwind CLI（不依賴打包器）
CLI 工具適合簡單專案和學習階段，特別是靜態網站、簡單的 HTML 頁面或快速原型開發。這種方式設定簡單，學習成本低，不依賴複雜的建置工具鏈。對於想要了解 Tailwind CSS 運作原理、需要快速建立原型，或專案規模較小不需要重型工具的開發者來說，CLI 工具是最佳選擇。它可以直接在瀏覽器中開啟 HTML 檔案，部署時也只需要靜態檔案。

```bash
# 安裝 Tailwind CSS v4.1 和 CLI 工具
# --------------------------------------------------------------------
# npm install：安裝套件
# tailwindcss：Tailwind CSS 核心套件
# @tailwindcss/cli：Tailwind CSS v4.1 的 CLI 工具
# --------------------------------------------------------------------
npm install tailwindcss @tailwindcss/cli
```

在 CSS 檔案中引入 Tailwind CSS：

```css src/input.css
/* 引入 Tailwind CSS v4.1 */
@import "tailwindcss";
```

啟動 Tailwind CLI 建置流程：

```bash
# 開發監看模式
# --------------------------------------------------------------------
# npx @tailwindcss/cli：執行 Tailwind CSS v4.1 的 CLI 工具
# -i：input 的縮寫，指定輸入檔案路徑
# -o：output 的縮寫，指定輸出檔案路徑
# --watch：監看模式，檔案變更時自動重新建置
# --------------------------------------------------------------------
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

在 HTML 中使用編譯後的 CSS：

```html src/index.html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

建議將常用指令寫入 `package.json`：

```json package.json
{
  "scripts": {
    "dev": "@tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch",
    "build": "@tailwindcss/cli -i ./src/input.css -o ./src/output.css --minify"
  }
}
```

{% note info %}
**v4.1 CLI 的改進：**
- 使用 `@tailwindcss/cli` 替代舊版的 `tailwindcss` 指令
- 使用 `@import "tailwindcss"` 替代舊版的 `@tailwind` 指令
- 不需要手動建立 `tailwind.config.js` 設定檔
- 自動掃描專案檔案並優化輸出
{% endnote %}

### 方式三：使用 PostCSS
PostCSS 方式適合已有成熟建置流程的現有專案，或需要特殊配置和最佳化的企業環境。這種方式不僅提供完整的控制權，還能與現有的工具鏈完美整合，支援各種特殊的專案需求。對於進階開發者來說，不論是維護遺留專案，或是需要精細控制的特殊情況，直接使用 PostCSS 都是最靈活且強大的選擇。透過 PostCSS，您可以完全掌握 Tailwind CSS 的整合流程，實現最佳化的客製開發體驗。

```bash
# 安裝 Tailwind CSS v4.1 和 PostCSS 相關套件
# --------------------------------------------------------------------
# npm install：安裝套件
# tailwindcss：Tailwind CSS 核心套件
# @tailwindcss/postcss：Tailwind CSS v4.1 的 PostCSS 插件
# postcss：PostCSS 核心套件
# --------------------------------------------------------------------
npm install tailwindcss @tailwindcss/postcss postcss
```

在 PostCSS 配置中添加 Tailwind CSS：

```js postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
```

在 CSS 檔案中引入 Tailwind CSS：

```css src/styles.css
/* 引入 Tailwind CSS v4.1 */
@import "tailwindcss";
```

啟動建置流程：

```bash
# npm run dev：執行 package.json 中定義的 dev 指令
npm run dev
```

在 HTML 中使用編譯後的 CSS：

```html index.html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/dist/styles.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

{% note info %}
**v4.1 PostCSS 的改進：**
- 使用 `@tailwindcss/postcss` 替代舊版的 `tailwindcss` 插件
- 使用 `@import "tailwindcss"` 替代舊版的 `@tailwind` 指令
- 不需要手動建立 `tailwind.config.js` 設定檔
- 自動掃描專案檔案並優化輸出
{% endnote %}

### Tree-shaking 與自動掃描

TailwindCSS v4.1 採用更智能的掃描機制，會自動分析專案中的檔案並識別實際使用的 CSS 類別。建置時只會輸出必要的樣式，大幅減少最終 CSS 檔案的大小。

{% note primary %}
**v4.1 的改進：**
- 自動掃描專案檔案，無需手動配置 `content` 路徑
- 更精確的類別識別，減少誤判
- 建置時自動優化，無需額外的最小化設定
- 支援動態類名的智能識別
{% endnote %}

#### 動態類名處理

v4.1 版本對動態生成的類名有更好的支援，但仍建議在需要時使用 `safelist` 確保樣式被保留：

```js tailwind.config.js
export default {
  safelist: [
    'sm:w-1/2',
    'lg:w-1/3',
    { pattern: /bg-(red|green|blue)-(100|200|300)/ },
    { pattern: /(text|bg|border)-(primary|secondary)/ }
  ]
}
```

{% note warning %}
**v4.1 注意事項：**
- 大部分情況下不需要手動配置 `content` 或 `safelist`
- 自動掃描功能會處理大部分動態類名
- 只有在特殊情況下才需要手動配置
- CDN 模式仍然不支援 Tree-shaking
{% endnote %}

# 核心概念

| 概念              | 說明                 | 範例                                 |
| ----------------- | -------------------- | ------------------------------------ |
| **Utility-First** | 功能類優先的設計理念 | `class="p-4 bg-blue-500 text-white"` |
| **原子化 CSS**    | 每個類別只做一件事   | `w-full`、`h-screen`、`text-center`  |
| **一致性設計**    | 預定義的設計系統     | `spacing`、`colors`、`typography`    |
| **可組合性**      | 類別可以自由組合     | `flex items-center justify-between`  |

## 實用工具
TailwindCSS 是一個以功能類優先（Utility-First）的 CSS 框架，透過大量預定義的 class name 來套用 CSS 樣式。在深入了解各個功能類別之前，我們先來認識一些重要的組合概念。每個 class 代表一個明確的 CSS 屬性效果，多個 class 可以自由組合出複雜的樣式。這種原子化的設計確保了樣式的可重用性，同時也支援響應式設計、狀態變化等進階用法。

為了幫助已熟悉 CSS 的讀者快速理解，接下來的範例會同時展示 Tailwind class 與對應生成的 CSS 程式碼。這種對照方式可以讓您更容易理解每個功能類別的實際效果，並掌握如何運用它們來建構現代化的網頁介面。

### 懸停和焦點狀態的樣式
```html
<style>
/* 背景色 */
.bg-sky-500 {
  background-color: rgb(14, 165, 233);
}

/* 滑鼠之背景色 */
.hover\:bg-sky-700:hover {
  background-color: rgb(3, 105, 161);
}

/* 禁用狀態下的懸停之背景色 */
.disabled\:hover\:bg-sky-500:disabled:hover {
  background-color: rgb(14, 165, 233);
}
</style>

<!-- 一般按鈕 -->
<button class="bg-sky-500 hover:bg-sky-700 ...">...</button>

<!-- 當按鈕被設定 disabled 屬性時，在滑鼠懸停時，改變背景色 -->
<button class="bg-sky-500 disabled:hover:bg-sky-500 ...">...</button>
```

### 媒體查詢與斷點
```html
<style>
/* 螢幕寬度 sm 以上時 */
.sm\:grid-cols-3 {
  @media (width >= 40rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
<div class="grid grid-cols-2 sm:grid-cols-3">...</div>
```

### 指定對象黑暗模式
```html
<style>
/* 黑暗模式下的背景色 */
.dark\:bg-gray-800 {
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-gray-800);
  }
}
</style>

<!-- 支援跟隨系統偏好設定的黑暗模式 -->
<div class="bg-white dark:bg-gray-800">
  <h3 class="text-gray-900 dark:text-white">...</h3>
  <p class="text-gray-500 dark:text-gray-400">...</p>
</div>
```

### 使用類別組合
```html
<style>
/* 模糊效果 - 輕微模糊 */
.blur-sm {
  --tw-blur: blur(var(--blur-sm));
  filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-grayscale,); /* 套用濾鏡效果 */
}

/* 灰階效果 - 完全黑白 */
.grayscale {
  --tw-grayscale: grayscale(100%);
  filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-grayscale,); /* 套用濾鏡效果 */
}
</style>
<!-- 混合類別：既使在同一個 filter 屬性也能混和用途 -->
<div class="blur-sm grayscale">...</div>
```

### 使用任意值
非大型靜態 css 的固定存在 selector，根據 tailwindcss 的掃描持有`[]`的命名規則，來動態產生實際會使用的客製化任意值之 css class。

```html
<style>
/* 背景顏色：#316ff6 */
.bg-\[\#316ff6\] {
  background-color: #316ff6;
}

/* Grid 欄位：24rem、2.5rem、minmax(0, 1fr) */
.grid { display: grid; }
.grid-cols-\[24rem_2\.5rem_minmax\(0\,1fr\)\] {
  grid-template-columns: 24rem 2.5rem minmax(0, 1fr);
}

/* 最高高度：calc(100dvh - (--spacing(6))) */
.max-h-\[calc\(100dvh-\(\-\-spacing\(6\)\)\)\] {
  max-height: calc(100dvh - 9rem); /* 示意：假設 spacing(6) ≈ 1.5rem * 6 = 9rem */
}

/* 設定自訂變數：--gutter-width */
.\[\-\-gutter-width\:1rem\] {
  --gutter-width: 1rem;
}
@media (min-width: 1024px) { /* 對應 lg 斷點 */
  .lg\:\[\-\-gutter-width\:2rem\] {
    --gutter-width: 2rem;
  }
}
</style>

<button class="bg-[#316ff6] ...">...</button>
<div class="grid grid-cols-[24rem_2.5rem_minmax(0,1fr)]">...</div>
<div class="max-h-[calc(100dvh-(--spacing(6)))]">...</div>
<div class="[--gutter-width:1rem] lg:[--gutter-width:2rem]">...</div>
```

### 複雜選擇器
```html
<style>
@media (prefers-color-scheme: dark) and (width >= 64rem) {
  button[data-current]:hover {
    background-color: var(--color-indigo-600);
  }
}
</style>

<!-- 
dark: - 深色模式下
lg: - 大螢幕 (>=64rem) 時
data-current: - 具有 data-current 屬性時
hover: - 滑鼠懸停時
bg-indigo-600 - 設定背景色為 indigo-600
-->
<button class="dark:lg:data-current:hover:bg-indigo-600">...</button>
```

```html
<style>
/* 只有支援 hover 的裝置才套用 */
@media (hover: hover) {
  a:hover span {
    text-decoration-line: underline;
  }
}
</style>

<!-- 
group - 標記父元素為群組
group-hover: - 當父元素被懸停時，子元素套用樣式
group-* - 透過 group-* 方式建立父子元素之間的互動關係
-->

<a href="#" class="group rounded-lg p-8">
  <span class="group-hover:underline">...</span>
</a>
```

### 何時使用行內樣式
以 React 為例子，我們可能透過 API 或計算產生行內樣式。

```jsx
export function BrandedButton({ buttonColor, textColor, children }) {
  return (
    <button
      style={{
        backgroundColor: buttonColor,
        color: textColor,
      }}
      className="rounded-md px-3 py-1.5 font-medium"
    >
      {children}
    </button>
  );
}
```

但你可能想改變的是 tailwind 的屬性，因此透過行內樣式方式來做，但可能寫起來像這樣複雜且難以理解。

```html
<div style="grid-template-columns: 2fr max(0, var(--gutter-width)) calc(var(--gutter-width) + 10px)">...</div>
```

但比較好維護理解的寫法是根據 css 變數來控制 tailwind 搭配。

```jsx
export function BrandedButton({ buttonColor, buttonColorHover, textColor, children }) {
  return (
    <button
      style={{
        "--bg-color": buttonColor,
        "--bg-color-hover": buttonColorHover,
        "--text-color": textColor,
      }}
      className="bg-(--bg-color) text-(--text-color) hover:bg-(--bg-color-hover) ..."
    >
      {children}
    </button>
  );
}
```

### 管理重複
使用實用程式類別建立整個專案時，您將不可避免地發現自己重複某些模式以在不同的地方重新創建相同的設計。例如，這裡每個頭像圖像的實用程式類別重複五次：但這是很正常的現象勿需擔心。

```html
<div>
  <div class="flex items-center space-x-2 text-base">
    <h4 class="font-semibold text-slate-900">Contributors</h4>
    <span class="bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 ...">204</span>
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="..." alt="" />
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>
</div>
```

主要仍需要依賴框架語法來做為設計。以 Svelte 為例子，我們可以透過 each 方式來解決重複的問題。

```html
<div>
  <div class="flex items-center space-x-2 text-base">
    <h4 class="font-semibold text-slate-900">Contributors</h4>
    <span class="bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 ...">204</span>
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    {#each contributors as user}
      <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={user.avatarUrl} alt={user.handle} />
    {/each}
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>
</div>
```

或者透過框架的建立模版方式，以最小元件來處理。

```jsx
export function VacationCard({ img, imgAlt, eyebrow, title, pricing, url }) {
  return (
    <div>
      <img className="rounded-lg" src={img} alt={imgAlt} />
      <div className="mt-4">
        <div className="text-xs font-bold text-sky-500">{eyebrow}</div>
        <div className="mt-1 font-bold text-gray-700">
          <a href={url} className="hover:underline">
            {title}
          </a>
        </div>
        <div className="mt-2 text-sm text-gray-600">{pricing}</div>
      </div>
    </div>
  );
}
```

### 使用自訂 CSS
你可以建立自己的 selector 並搭配 tailwind 提供的 CSS 變數（如 `var(--color-*)`、`--spacing()`、`--shadow-*` 等）來撰寫自訂 class。這種方式可在不依賴 `@apply` 的情況下，直接套用 Tailwind 的設計系統：
- 保持色彩、間距、陰影等語彙與 Tailwind 主題一致，降低設計漂移。
- 能配合條件與媒體查詢（例如 `@media (hover: hover)`）細緻控制互動。
- 自訂的 selectors 不會被「類名掃描」剔除，通常固定打包，請只封裝穩定且重複的樣式並定期清點，避免體積膨脹。

```html
<!-- 自訂的 class name -->
<button class="btn-primary">Save changes</button>
```

```css
@import "tailwindcss";
@layer components {
  .btn-primary {
    border-radius: calc(infinity * 1px);
    background-color: var(--color-violet-500);
    padding-inline: --spacing(5);
    padding-block: --spacing(2);
    font-weight: var(--font-weight-semibold);
    color: var(--color-white);
    box-shadow: var(--shadow-md);
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-violet-700);
      }
    }
  }
}
```

## 懸停、聚焦和其他狀態

# 公式表

以下提供完整的 TailwindCSS 公式表，按照功能分類整理，方便您快速查找和使用。

## 佈局（Layout）

佈局相關的類別用於控制元素的顯示方式、定位和排列。

### 顯示（Display）

控制元素的顯示類型。

### 定位（Positioning）

控制元素在文件流中的定位方式。

### 浮動（Float）

控制元素的浮動行為。

### 清除浮動（Clear）

控制元素與浮動元素的關係。

### 物件擬合（Object Fit）

控制替換元素（如圖片）如何擬合其容器。

### 物件位置（Object Position）

控制替換元素在其容器中的位置。

### 溢出（Overflow）

控制元素內容超出容器時的處理方式。

### 可見性（Visibility）

控制元素的可見性。

### Z 索引（Z-Index）

控制元素的堆疊順序。

## 間距（Spacing）

間距類別用於控制元素的內邊距和外邊距。

### 邊距（Margin）

控制元素的外邊距。

### 內邊距（Padding）

控制元素的內邊距。

### 空間（Space Between）

控制子元素之間的間距。

## 尺寸（Sizing）

尺寸類別用於控制元素的寬度和高度。

### 寬度（Width）

控制元素的寬度。

### 最小寬度（Min Width）

控制元素的最小寬度。

### 最大寬度（Max Width）

控制元素的最大寬度。

### 高度（Height）

控制元素的高度。

### 最小高度（Min Height）

控制元素的最小高度。

### 最大高度（Max Height）

控制元素的最大高度。

## 排版（Typography）

排版類別用於控制文字的外觀和排列。

### 字體系列（Font Family）

控制文字的字體。

### 字體大小（Font Size）

控制文字的大小。

### 字體粗細（Font Weight）

控制文字的粗細程度。

### 字體樣式（Font Style）

控制文字的樣式（如斜體）。

### 文字顏色（Text Color）

控制文字的顏色。

### 文字對齊（Text Align）

控制文字的對齊方式。

### 文字裝飾（Text Decoration）

控制文字的裝飾效果。

### 文字轉換（Text Transform）

控制文字的大小寫轉換。

### 行高（Line Height）

控制文字的行高。

### 字母間距（Letter Spacing）

控制字母之間的間距。

### 文字溢出（Text Overflow）

控制文字超出容器時的處理方式。

### 垂直對齊（Vertical Align）

控制行內元素的垂直對齊。

### 空白處理（Whitespace）

控制空白字元的處理方式。

### 文字換行（Word Break）

控制文字的換行行為。

## 背景（Backgrounds）

背景類別用於控制元素的背景外觀。

### 背景附件（Background Attachment）

控制背景圖片的滾動行為。

### 背景裁剪（Background Clip）

控制背景的裁剪區域。

### 背景顏色（Background Color）

控制背景的顏色。

### 背景原點（Background Origin）

控制背景的原點位置。

### 背景位置（Background Position）

控制背景圖片的位置。

### 背景重複（Background Repeat）

控制背景圖片的重複方式。

### 背景大小（Background Size）

控制背景圖片的大小。

### 背景漸層（Background Gradient）

建立背景漸層效果。

## 邊框（Borders）

邊框類別用於控制元素的邊框外觀。

### 邊框圓角（Border Radius）

控制邊框的圓角。

### 邊框樣式（Border Style）

控制邊框的樣式。

### 邊框寬度（Border Width）

控制邊框的寬度。

### 邊框顏色（Border Color）

控制邊框的顏色。

### 邊框分離（Border Collapse）

控制表格邊框的分離方式。

### 邊框間距（Border Spacing）

控制表格邊框的間距。

### 分離邊框（Divide Width）

控制分隔線的寬度。

### 分離顏色（Divide Color）

控制分隔線的顏色。

### 分離樣式（Divide Style）

控制分隔線的樣式。

### 環形邊框（Ring Width）

控制焦點環的寬度。

### 環形顏色（Ring Color）

控制焦點環的顏色。

### 環形偏移（Ring Offset Width）

控制焦點環的偏移量。

### 環形偏移顏色（Ring Offset Color）

控制焦點環偏移的顏色。

## 效果（Effects）

效果類別用於添加視覺效果。

### 陰影（Box Shadow）

控制元素的陰影效果。

### 不透明度（Opacity）

控制元素的透明度。

### 混合模式（Mix Blend Mode）

控制元素的混合模式。

### 背景混合模式（Background Blend Mode）

控制背景的混合模式。

## 過渡（Transitions）

過渡類別用於控制動畫效果。

### 過渡屬性（Transition Property）

控制過渡效果的屬性。

### 過渡持續時間（Transition Duration）

控制過渡效果的持續時間。

### 過渡時間函數（Transition Timing Function）

控制過渡效果的時間函數。

### 過渡延遲（Transition Delay）

控制過渡效果的延遲時間。

### 動畫（Animation）

控制動畫效果。

## 變形（Transforms）

變形類別用於控制元素的變形效果。

### 縮放（Scale）

控制元素的縮放。

### 旋轉（Rotate）

控制元素的旋轉。

### 平移（Translate）

控制元素的平移。

### 傾斜（Skew）

控制元素的傾斜。

### 變形原點（Transform Origin）

控制變形的原點。

## 互動（Interactivity）

互動類別用於控制使用者的互動效果。

### 游標（Cursor）

控制滑鼠游標的樣式。

### 使用者選擇（User Select）

控制使用者選擇文字的行為。

### 調整大小（Resize）

控制元素的可調整大小性。

### 滾動行為（Scroll Behavior）

控制滾動的行為。

### 滾動邊距（Scroll Margin）

控制滾動的邊距。

### 滾動填充（Scroll Padding）

控制滾動的填充。

### 觸摸操作（Touch Action）

控制觸摸操作的行為。

### 滾動捕捉（Scroll Snap）

控制滾動捕捉的行為。

## SVG

SVG 類別用於控制 SVG 元素的外觀。

### 填充（Fill）

控制 SVG 的填充顏色。

### 描邊（Stroke）

控制 SVG 的描邊。

### 描邊寬度（Stroke Width）

控制 SVG 描邊的寬度。

### 描邊線帽（Stroke Line Cap）

控制 SVG 描邊的線帽樣式。

### 描邊連接（Stroke Line Join）

控制 SVG 描邊的連接樣式。

## 可訪問性（Accessibility）

可訪問性類別用於改善網頁的可訪問性。

### 螢幕閱讀器（Screen Readers）

控制螢幕閱讀器的行為。

### 減少動畫（Reduce Motion）

控制動畫的減少。

### 高對比度（High Contrast）

控制高對比度模式。
### 首選顏色方案（Preferred Color Scheme）

控制首選的顏色方案。

## 響應式設計（Responsive Design）

TailwindCSS 提供內建的響應式斷點系統，讓您能夠為不同螢幕尺寸設計不同的樣式。

### 斷點系統

TailwindCSS 使用以下預設斷點：

- `sm`：640px 及以上
- `md`：768px 及以上
- `lg`：1024px 及以上
- `xl`：1280px 及以上
- `2xl`：1536px 及以上

### 使用方式

在類別名稱前加上斷點前綴即可：

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 在小螢幕上佔滿寬度，中等螢幕佔一半，大螢幕佔三分之一 -->
</div>
```

## 深色模式（Dark Mode）

TailwindCSS 支援深色模式，讓您能夠為深色主題提供不同的樣式。

### 啟用深色模式

在 `tailwind.config.js` 中配置：

```js
module.exports = {
  darkMode: 'class', // 或 'media'
  // ... 其他配置
}
```

### 使用方式

使用 `dark:` 前綴來指定深色模式的樣式：

```html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  <!-- 淺色模式白色背景黑色文字，深色模式深灰背景白色文字 -->
</div>
```

{% note info %}
**小技巧：響應式設計**
使用 TailwindCSS 的響應式前綴可以輕鬆建立適配各種裝置的設計，建議採用「行動優先」的設計理念。
{% endnote %}

# 總結

TailwindCSS 是一個強大的現代化 CSS 框架，通過功能類優先的設計理念，讓開發者能夠快速構建一致且美觀的使用者介面。掌握 TailwindCSS 不僅能提升開發效率，還能確保設計的一致性和可維護性。

{% note success %}
**學習建議：**
1. 先熟悉常用的工具類別
2. 練習響應式設計
3. 學習自定義配置
4. 建立自己的元件庫
{% endnote %}

希望這份 TailwindCSS 公式表能夠幫助您更好地掌握這個強大的 CSS 框架！
