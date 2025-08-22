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
Tree-shaking 是一種優化技術，用於移除專案中未使用的程式碼。在 TailwindCSS 中：

1. 掃描指定路徑下的所有檔案
2. 識別實際使用的 CSS 類別
3. 移除未使用的樣式定義
4. 產生最小化的 CSS 檔案

這使得最終的 CSS 檔案大小可以從數 MB 縮減到幾 KB。

{% mermaid graph TD %}
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

{% note success %}
**實際效果：**
- 開發時可使用全部功能類別
- 建置時自動優化檔案大小
- 提升網站載入速度
{% endnote %}

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

在不建立專案建置流程的前提下，仍可透過行內設定客製化主題，但注意的是，這樣的設定方式不支援所有外掛生態，僅適合簡單客製。

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
# 建立 Vite 專案（以 vanilla JS 範本為例）
# --------------------------------------------------------------------
# npm create vite@latest：使用 npm 建立最新的 Vite 專案
# my-app：專案資料夾名稱，可自行修改
# -- --template vanilla：指定使用 vanilla（純 JavaScript）範本，不包含框架
# --------------------------------------------------------------------
npm create vite@latest my-app -- --template vanilla

# 切換路徑進入專案資料夾
# --------------------------------------------------------------------
cd my-app

# 安裝 Tailwind CSS v4.1 的 Vite 插件
# --------------------------------------------------------------------
# npm install：安裝套件
# -D：--save-dev 的縮寫，將套件安裝為開發依賴
# @tailwindcss/vite：Tailwind CSS v4.1 的官方 Vite 插件
# --------------------------------------------------------------------
npm install -D @tailwindcss/vite

# 初始化 Tailwind CSS 設定檔
# --------------------------------------------------------------------
# npx：執行 node_modules 中的套件，不需要全域安裝
# @tailwindcss/vite init：初始化 Tailwind CSS v4.1 設定檔
# --------------------------------------------------------------------
npx @tailwindcss/vite init
```

設定 `vite.config.js` 來啟用 Tailwind CSS v4.1 插件：

```javascript vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // plugins：Vite 插件配置
  plugins: [
    // @tailwindcss/vite：Tailwind CSS v4.1 的官方 Vite 插件
    // 自動處理 PostCSS 配置和 Tailwind CSS 的編譯
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

创建 Tailwind CSS 入口文件，建立樣式檔並匯入：

```css src/index.css
/* 引入基礎樣式（重置瀏覽器預設樣式） */
@tailwind base;
/* 引入元件樣式（按鈕、卡片等預設元件） */
@tailwind components;
/* 引入實用工具類別（如 p-4、text-center 等） */
@tailwind utilities;
```

{% note info %}
**v4.1 的 CSS 指令：**
- `@tailwind base`：引入基礎樣式，重置瀏覽器預設樣式
- `@tailwind components`：引入元件樣式，包含預設的元件類別
- `@tailwind utilities`：引入實用工具類別，這是 Tailwind 的核心功能
{% endnote %}

在入口檔匯入樣式（例如 `main.js`）：

```javascript src/main.js
// import：ES6 模組語法，用來引入其他檔案
// './index.css'：引入同目錄下的 index.css 檔案
import './index.css'
```

啟動開發伺服器：

```bash
# npm run dev：執行 package.json 中定義的 dev 指令
# 這會啟動 Vite 開發伺服器，通常在 http://localhost:5173
# v4.1 版本會自動處理 Tailwind CSS 的編譯和熱重載
npm run dev
```

{% note success %}
**v4.1 的優勢：**
- 自動熱重載：修改 CSS 或 HTML 時，變更會立即反映在瀏覽器中
- 更快的編譯速度：優化的編譯流程，減少等待時間
- 更好的錯誤提示：更清晰的錯誤訊息和警告
{% endnote %}

核對 `package.json` 指令（若使用官方範本通常已內建）：

```json package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0"
  }
}
```

{% note info %}
**package.json scripts 說明：**
- `"dev": "vite"`：開發模式，啟動開發伺服器（v4.1 自動處理 Tailwind CSS）
- `"build": "vite build"`：建置生產版本，自動優化 Tailwind CSS
- `"preview": "vite preview"`：預覽建置後的檔案
{% endnote %}

{% note warning %}
**注意：**
- v4.1 版本會自動處理所有 Tailwind CSS 相關的配置
- 不需要手動配置 PostCSS 或其他工具
- 建置時會自動移除未使用的樣式（Tree-shaking）
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

```bash
# 初始化專案與安裝
# npm init -y：初始化 Node.js 專案，-y 表示使用所有預設值
npm init -y
# npm install -D tailwindcss：安裝 Tailwind CSS 作為開發依賴
npm install -D tailwindcss
# npx tailwindcss init：初始化 Tailwind 設定檔（不包含 PostCSS 設定）
npx tailwindcss init
```

設定掃描路徑：

```javascript tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // content：指定 Tailwind 要掃描的檔案路徑
  content: [
    "./*.html",                    // 根目錄下所有 HTML 檔案
    "./src/**/*.{html,js,ts,jsx,tsx}", // src 資料夾下所有相關檔案
  ],
  // theme：自訂主題設定（使用預設值）
  theme: { extend: {} },
  // plugins：Tailwind 外掛列表（目前沒有安裝任何外掛）
  plugins: [],
}
```

建立輸入樣式與建置：

```css src/input.css
/* @tailwind base：引入 Tailwind 的基礎樣式 */
@tailwind base;
/* @tailwind components：引入 Tailwind 的元件樣式 */
@tailwind components;
/* @tailwind utilities：引入 Tailwind 的實用工具類別 */
@tailwind utilities;
```

```bash
# 開發監看模式
# -i：input 的縮寫，指定輸入檔案路徑
# -o：output 的縮寫，指定輸出檔案路徑
# --watch：監看模式，檔案變更時自動重新建置
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

# 生產環境建置（最小化輸出）
# --minify：最小化 CSS，移除空白和註解，減少檔案大小
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

在頁面引用輸出後的 CSS（`dist/output.css`）：

```html index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./dist/output.css" />
  </head>
  <body>
    <h1 class="text-2xl font-bold text-emerald-600">Hello Tailwind</h1>
  </body>
</html>
```

建議將常用指令寫入 `package.json`：

```json package.json
{
  "scripts": {
    "dev": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
    "build": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify"
  }
}
```

### 方式三：自訂建置（PostCSS/webpack/Rollup/Parcel）

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

設定 PostCSS：

```javascript postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

在打包流程中處理含有 `@tailwind` 指令的 CSS，並確保 `tailwind.config.js` 的 `content` 指向實際的模板與原始碼路徑。

以 webpack 為例：

```bash
npm install -D webpack webpack-cli style-loader css-loader postcss-loader
```

```javascript webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
}
```

在入口檔引入 CSS（例如 `src/main.js`）：

```javascript src/main.js
import './styles.css'
```

### Purge／Tree-shaking 與 `content` 設定

Tailwind v3 採即時引擎（JIT），會依 `content` 指定的檔案掃描實際用到的類別，建置時只輸出必要樣式：

```javascript tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
}
```

{% note primary %}
**重點：**
- 僅掃描到的類別會被保留；若類名以字串組合動態產生，請使用 `safelist` 保留。
- 於生產模式下搭配最小化（如 CLI 的 `--minify`）可得到最小體積的 CSS。
{% endnote %}

#### 動態類名與 safelist 範例

若類名來自動態字串（例如來自 API 或使用字串拼接），請以 `safelist` 保留可能出現的類別或使用正則規則：

```javascript tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  safelist: [
    'sm:w-1/2',
    'lg:w-1/3',
    { pattern: /bg-(red|green|blue)-(100|200|300)/ },
    { pattern: /(text|bg|border)-(primary|secondary)/ }
  ]
}
```

{% note warning %}
**常見錯誤：**
- 忘記更新 `content` 路徑，導致樣式被大量清空或未生效。
- 使用動態拼接類名卻未 `safelist`，生產環境看起來「少了樣式」。
- 於 CDN 模式期待外掛與 Tree-shaking（兩者皆不適用）。
{% endnote %}

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

```javascript
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