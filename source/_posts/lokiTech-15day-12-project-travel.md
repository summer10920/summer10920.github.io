---
title: "結業專案：洛奇旅行（一）切版"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:11:00
---

![](assets/images/banner/react.png)

這一章做洛奇旅行的切版：把 React、MUI 與 Tailwind 收成一個多頁網站。先建好專案與樣式，接著用佔位頁搭起路由，再組出外框（頁首、主導覽、頁尾）：外框先放標記，再逐一換成真正的元件；之後各頁換成真正的畫面，假資料跟著補齊。切版最後會打包並用 Live Server 預覽產物；網站要怎麼接住內頁的重新整理，留到選讀的下一篇部署時再寫。

<!-- more -->

# 建立專案

先產生一支能打包的 Vite 專案，沿用 {% post_link lokiTech-15day-09-react-basics %} 的 ESLint 與 Prettier，再裝上 MUI 與 Tailwind，並排好兩套樣式的層疊順序。頁面內容等路由接通之後才寫。

## Vite 專案

用 `pnpm create vite` 產生 React 專案的骨架。範本不附 `jsconfig.json`，要自己加，編輯器才能把原始碼資料夾當成同一個專案。清掉計數器範本、帶進第 9 篇的 ESLint 與 Prettier 之後，這個資料夾就是後面每一步的起點。

### 步驟 1：建立專案

{% note info %}
已經裝過 Node.js 26 與 pnpm 的人跳過工具鏈，直接在空目錄建立專案。剛重灌的電腦，先照 {% post_link lokiTech-15day-04-tailwind %} 的「建立 Node 開發環境」裝好 Node 26 與 pnpm。
{% endnote %}

在空目錄執行下面這行，專案名稱填 `06-project-init`，框架選 React，語言選 JavaScript。

```bash
pnpm create vite
```

產生出來的骨架如下。

{% mermaid graph TD %}
  root["06-project-init"] --> html["index.html"]
  root --> vite["vite.config.js"]
  root --> pkg["package.json"]
  root --> src["src"]
  src --> main["main.jsx"]
  src --> app["App.jsx"]
  src --> css["index.css"]
{% endmermaid %}

**解析**

- 瀏覽器先載入 `index.html`，再依其中的 `script` 載入 `main.jsx`，之後的畫面都由 React 畫進 `#root`。
- `vite.config.js` 裡的 `react()` 是 Vite 的 React 外掛，負責處理 JSX 與開發時的即時更新。
- 入口的 `createRoot` 只呼叫一次，元件與狀態的寫法見 {% post_link lokiTech-15day-09-react-basics %}。

### 步驟 2：加入 jsconfig.json

剛才產生的骨架沒有 `jsconfig.json`。接下來在專案根目錄自己建立這份檔，讓 Cursor 或 VS Code 知道哪些檔屬於同一個 JavaScript 專案。沒有它時，編輯器可能把每個 `.jsx` 當成獨立檔，跨檔跳轉與「找出所有引用」的結果會不完整。

```json 06-project-init/jsconfig.json
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

**解析**

- `include` 寫 `src`，編輯器就把 `src` 底下的檔當成同一個專案。
- `moduleResolution` 設成 `bundler`，解析 import 的方式和 Vite 一致。
- `jsx` 設成 `react-jsx`，編輯器才會把 JSX 當成合法語法。
- `checkJs` 設成 `false`，不要用 TypeScript 的型別規則去檢查這些 JavaScript 檔。
- 不必寫 `baseUrl`。這個專案的 `import` 都是相對路徑，不需要它；TypeScript 6 已把它標為棄用，預定在 7 移除。
- Vite 打包不會讀這份檔。少了它網站一樣能建置，少的是編輯器的跨檔能力。

### 步驟 3：清掉範本

把計數器、標誌圖與 `App.css` 刪掉，範本附的網站圖示換成自己的，套件名稱改成 `loki-travel`，`App` 只留標題。React、Vite 與外掛的版本則和完成品對齊。

先對齊 `package.json`。

```json 06-project-init/package.json
{
  "name": "loki-travel",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "engines": {
    "node": ">=26"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  },
  "devDependencies": {
    "@babel/core": "^8.1.0",
    "@rolldown/plugin-babel": "^0.3.1",
    "@vitejs/plugin-react": "^6.2.1",
    "babel-plugin-react-compiler": "^1.0.0",
    "vite": "^8.3.5"
  }
}
```

**解析**

- 網站執行時要用的 React 與 React DOM 放在 `dependencies`；Vite 與外掛只在開發時用，打包後的靜態檔不依賴它們。
- `type` 設成 `module`，設定檔才能用 `import` 語法。Node.js 版本則由 `engines` 限定在 26 以上。

開發伺服器的設定與 React Compiler 寫在 `vite.config.js`。

```js 06-project-init/vite.config.js
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: { host: 'localhost' },
  preview: { host: 'localhost' },
});
```

**解析**

- `plugins` 先放 `react()`，再放 `babel(...)`：`@rolldown/plugin-babel` 負責帶入 React Compiler 的預設組合 `reactCompilerPreset()`。
- React 外掛本身不用 Babel 處理 JSX，但 React Compiler 目前以 Babel 外掛的形式提供，所以只有這一步用到 Babel。
- `server` 與 `preview` 只聽 `localhost`，開發伺服器與預覽都不會綁到區網位址。

範本不附這三個 Compiler 套件，要另外補裝。

```bash
pnpm add -D @babel/core@^8.1.0 @rolldown/plugin-babel@^0.3.1 babel-plugin-react-compiler@^1.0.0
```

**解析**

- 這三個套件就是 `vite.config.js` 的 Compiler 設定所需，版本範圍與完成品相同。

網站圖示換成自己的檔，放在 `public`。

```svg 06-project-init/public/favicon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#1F6B4A"/>
  <text x="16" y="22.5" text-anchor="middle" font-family="ui-serif, 'Songti TC', serif" font-size="18" font-weight="700" fill="#FAF8F3">洛</text>
</svg>
```

**解析**

- 這個圖示是 `favicon.svg`，瀏覽器分頁會顯示綠底圓角方塊與「洛」字。
- 網站圖示放在 `public`：這個資料夾的檔不經打包，原樣複製到網站根目錄，所以網址 `/favicon.svg` 對應的就是這份檔。

`index.html` 的標題與圖示路徑一併改掉。

```html 06-project-init/index.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="洛奇旅行：台灣本島小團與京都短團，每團最多 8 人，一天只排一段路。" />
    <title>洛奇旅行</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**解析**

- 範本原本附 `public/vite.svg`，`index.html` 的 `link` 也指向它。刪掉那張圖，改放自己的檔，並把 `href` 改成新檔名。
- `title` 是分頁上的文字，`lang="zh-Hant"` 標明頁面語言是繁體中文。

入口檔只負責掛上 `App`。

```jsx 06-project-init/src/main.jsx
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**解析**

- `main.jsx` 先引入樣式，再用 `createRoot` 把 `App` 畫進 `#root`，並維持用 `StrictMode` 包住。

`App` 先只留標題。

```jsx 06-project-init/src/App.jsx
export default function App() {
  return <h1>洛奇旅行</h1>;
}
```

**解析**

- 這個 `App` 沒有狀態與路由，畫面只有一行大標題「洛奇旅行」。

樣式檔先清空，下一步才接 Tailwind。

```css 06-project-init/src/index.css
/* 下一步才接 Tailwind */
```

**解析**

- `index.css` 此刻沒有任何規則，只留一行註解。

### 步驟 4：沿用 ESLint 與 Prettier

第 9 篇已經在 `03-react` 接好程式碼檢查與排版。這一步把同一套設定帶進這個專案，規則與用法見 {% post_link lokiTech-15day-09-react-basics %}。

先放 Prettier 的設定。

```json 06-project-init/.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

**解析**

- 這份 `.prettierrc` 與 `03-react` 的相同：要分號、單引號、縮排兩格。

再放 ESLint 的設定。頁面檔會同時匯出元件與 `loader`、`action`，而規則 `react-refresh/only-export-components` 只准檔案匯出元件，所以用 `allowExportNames` 放行這兩個名字。

```js 06-project-init/eslint.config.js
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
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true, allowExportNames: ['loader', 'action'] },
      ],
    },
  },
  eslintConfigPrettier,
]);
```

**解析**

- 這份設定和 `03-react` 的相同，只多了放行 `loader` 與 `action` 的那一段。
- 最後一項 `eslintConfigPrettier` 關掉與排版衝突的規則，ESLint 就不會和 Prettier 搶著改空格與引號。

編輯器設定從練習 repo 根目錄的 `.vscode` 複製 `settings.json` 與 `extensions.json` 兩份檔到 `06-project-init/.vscode/`，內容與用途見 {% post_link lokiTech-15day-09-react-basics %}。`placeholder.code-snippets` 可以略過。

```bash
mkdir -p .vscode
cp ../.vscode/settings.json ../.vscode/extensions.json .vscode/
```

**解析**

- 複製之後，VS Code 開啟這個資料夾時就會套用存檔自動排版與 ESLint 修正，並建議安裝對應的擴充套件。

接著安裝對應的開發套件。版本範圍與完成品相同。

```bash
pnpm add -D prettier@^3.9.10 eslint@^10.14.0 eslint-config-prettier@^10.1.8 @eslint/js@^10.0.1 eslint-plugin-react-hooks@^7.1.1 eslint-plugin-react-refresh@^0.5.7 globals@^17.14.0
```

**解析**

- 這些套件放在 `devDependencies`。它們只參與開發與檢查，打包後的靜態檔不依賴它們。

裝完之後，`package.json` 會多出 `lint` 指令和這些開發套件。

```diff 06-project-init/package.json
 // ...
   "scripts": {
     "dev": "vite",
     "build": "vite build",
+    "lint": "eslint .",
     "preview": "vite preview"
   },
 // ...
   "devDependencies": {
     "@babel/core": "^8.1.0",
+    "@eslint/js": "^10.0.1",
     "@rolldown/plugin-babel": "^0.3.1",
     "@vitejs/plugin-react": "^6.2.1",
     "babel-plugin-react-compiler": "^1.0.0",
+    "eslint": "^10.14.0",
+    "eslint-config-prettier": "^10.1.8",
+    "eslint-plugin-react-hooks": "^7.1.1",
+    "eslint-plugin-react-refresh": "^0.5.7",
+    "globals": "^17.14.0",
+    "prettier": "^3.9.10",
     "vite": "^8.3.5"
 // ...
```

**解析**

- `scripts.lint` 讓 `pnpm lint` 對整個專案跑 ESLint。

## 樣式與主題

這一節先認識 MUI，用一顆按鈕確認主題有接到畫面上，再把 Tailwind 接進來並排好層疊順序。接著把色票集中寫在 `tokens`，最後載入字型與圖示字型。各元件的圓角與樣式覆寫，留到該元件第一次出現時再補。

### 步驟 1：安裝套件

這一步把後面會用到的套件裝進 `06-project-init`：路由、MUI 與它的樣式引擎，以及 Tailwind。版本範圍與完成品相同。

網站執行時要用的套件用 `pnpm add`，只在開發與打包時用的加 `-D`。

```bash
pnpm add react-router@^8.5.1 @mui/material@^9.5.0 @emotion/react@^11.14.0 @emotion/styled@^11.14.1
pnpm add -D tailwindcss@^4.3.3 @tailwindcss/vite@^4.3.3
```

**解析**

- 路由 API 都從 `react-router` 引入，只有 `RouterProvider` 例外，要從 `react-router/dom` 引入。`createBrowserRouter` 與 `RouterProvider` 的寫法見 {% post_link lokiTech-15day-11-react-router %}。
- MUI 預設用 Emotion 產生樣式，所以兩個 `@emotion` 套件要一起裝。
- Tailwind 4 用 `@tailwindcss/vite` 接進 Vite，主題寫在 CSS 裡，不必另建 `tailwind.config.js`。

裝完之後，`package.json` 會多出這些欄位。

```diff 06-project-init/package.json
 // ...
   "dependencies": {
+    "@emotion/react": "^11.14.0",
+    "@emotion/styled": "^11.14.1",
+    "@mui/material": "^9.5.0",
     "react": "^19.3.1",
-    "react-dom": "^19.3.1"
+    "react-dom": "^19.3.1",
+    "react-router": "^8.5.1"
   },
   "devDependencies": {
     "@babel/core": "^8.1.0",
     "@eslint/js": "^10.0.1",
     "@rolldown/plugin-babel": "^0.3.1",
+    "@tailwindcss/vite": "^4.3.3",
     "@vitejs/plugin-react": "^6.2.1",
     "babel-plugin-react-compiler": "^1.0.0",
     "eslint": "^10.14.0",
     "eslint-config-prettier": "^10.1.8",
     "eslint-plugin-react-hooks": "^7.1.1",
     "eslint-plugin-react-refresh": "^0.5.7",
     "globals": "^17.14.0",
     "prettier": "^3.9.10",
+    "tailwindcss": "^4.3.3",
     "vite": "^8.3.5"
 // ...
```

**解析**

- 打包後的網站會用到路由、MUI 與兩個 Emotion 套件，所以它們裝進 `dependencies`。
- `tailwindcss` 與 `@tailwindcss/vite` 放在 `devDependencies`。它們只參與開發與打包，打包後的靜態檔不依賴它們。

### 步驟 2：認識 MUI

MUI（Material UI）是一套 React 元件庫。按鈕、輸入框、對話框都有現成元件，顏色與字級集中在一份主題（theme），不必每個元件各寫一份 CSS。

這一步依序改三個檔案：建立主題、在入口把主題交給畫面，再用一顆實心按鈕確認有接上。這顆按鈕只是暫時的測試畫面，下一章就換成路由表。

先建一份主題，裡面只放主色。

```js 06-project-init/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1F6B4A' },
  },
});

export default theme;
```

**解析**

- `createTheme` 建立主題物件，傳進去的設定會蓋過 MUI 的預設色與字級。
- 這一步只設 `palette.primary.main`，先寫主色 `#1F6B4A`，完整色票與字級留到步驟 4 再補。

主題建好之後，還要在入口把它交給畫面。

```diff 06-project-init/src/main.jsx
 // ...
 import { createRoot } from 'react-dom/client';
+import { ThemeProvider } from '@mui/material/styles';
+import CssBaseline from '@mui/material/CssBaseline';
 import App from './App.jsx';
+import theme from './theme.js';
 
 createRoot(document.getElementById('root')).render(
   <StrictMode>
-    <App />
+    <ThemeProvider theme={theme}>
+      <CssBaseline />
+      <App />
+    </ThemeProvider>
   </StrictMode>,
 );
```

**解析**

- `ThemeProvider` 把主題交給它底下的 MUI 元件，要包在外面，裡面的 `Button` 才讀得到這份 `palette`。
- `CssBaseline` 是 MUI 的全域重置：清掉瀏覽器給 `body` 的預設外距，並套上主題的文字色與背景色。

最後把畫面暫時換成一顆實心按鈕。

```jsx 06-project-init/src/App.jsx
import Button from '@mui/material/Button';

export default function App() {
  return <Button variant="contained">洛奇旅行</Button>;
}
```

**解析**

- `Button` 是 MUI 的現成元件，`variant="contained"` 用 `palette.primary.main` 當底色。
- 重整後會看到一顆深綠色的「洛奇旅行」按鈕。少了 `ThemeProvider`，它會變成 MUI 內建的藍色。

### 步驟 3：Tailwind 與層疊層級

這一步把 Tailwind 接進 Vite，並處理 MUI 與 Tailwind 兩套樣式誰蓋過誰。

CSS 的 layer（圖層）可以把規則分組並排定先後：沒放進任何 layer 的規則，優先度高過所有有分層的規則；有分層的規則之間，後面的層蓋過前面的層。Tailwind 的 preflight（重置樣式）放在 base 層，會把按鈕內距歸零；而 MUI 的樣式若落在層外，Tailwind 的 class 又蓋不過它。`enableCssLayer` 把 MUI 收進夾在中間的 mui 層：preflight 清不掉按鈕內距，排在最後的 utilities 層仍蓋得過元件。

{% mermaid graph LR %}
  themeL["theme"] --> baseL["base"]
  baseL --> muiL["mui"]
  muiL --> compL["components"]
  compL --> utilL["utilities"]
{% endmermaid %}

箭頭往右，後層蓋過前層。其中的 `theme` 是 Tailwind 內建的圖層名，跟步驟 4 才會寫的 `theme.js` 不是同一個東西。各層放的內容如下：

- `theme` 層放 design token，也就是幫顏色、字級、圓角取的名字，例如步驟 4 會寫的 `--color-action`；class 與元件引用名字，不必到處抄色碼。
- `base` 層放 preflight，以及步驟 4 才寫的 `body` 樣式。
- `mui` 層放 MUI 元件的樣式。
- `components` 層留給自己寫的元件 class，這個專案沒有用到。
- `utilities` 層放 Tailwind 的工具 class，所以間距與欄數蓋得過 MUI。

這一步依序改三個檔案：在 `index.css` 宣告層級順序並引入 Tailwind，在 `vite.config.js` 接上 Tailwind 外掛，最後在 `main.jsx` 讓 MUI 的樣式進到 `mui` 層。

```css 06-project-init/src/index.css
/* 宣告層級順序，後層可以蓋過前層。mui 是我們插入的層名，必須和 MUI 寫死的名稱相同。 */
@layer theme, base, mui, components, utilities;

@import 'tailwindcss';
```

**解析**

- 第一行 `@layer` 只宣告圖層順序，不放任何規則。`@import 'tailwindcss'` 之後，Tailwind 的 token、preflight、元件 class、工具 class 會分別掛到 theme、base、components、utilities 四層。
- 中間的 mui 是我們自己插入的層名，Tailwind 預設的順序裡沒有它。層名為什麼必須叫 mui，看最後一份 `main.jsx` 就知道。
- 這一行要寫在 `@import` 之前，`index.css` 裡只宣告這一次。

再把 Tailwind 外掛加進 Vite。

```diff 06-project-init/vite.config.js
 // ...
 import react, { reactCompilerPreset } from '@vitejs/plugin-react';
 import babel from '@rolldown/plugin-babel';
+import tailwindcss from '@tailwindcss/vite';
 
 export default defineConfig({
-  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
+  plugins: [
+    react(),
+    babel({ presets: [reactCompilerPreset()] }),
+    tailwindcss(),
+  ],
   server: { host: 'localhost' },
   preview: { host: 'localhost' },
 });
```

**解析**

- `plugins` 多了 `tailwindcss()`。少了它，`@import 'tailwindcss'` 不會被處理，Tailwind 的 class 不會生效。
- `server` 與 `preview` 的設定不變。

最後讓 MUI 把自己的樣式放進剛才宣告的 `mui` 層，並依官方 Vite 作法補上圖層順序的宣告。

```diff 06-project-init/src/main.jsx
 // ...
 import { createRoot } from 'react-dom/client';
-import { ThemeProvider } from '@mui/material/styles';
+import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
 import CssBaseline from '@mui/material/CssBaseline';
+import GlobalStyles from '@mui/material/GlobalStyles';
 // ...
   <StrictMode>
-    <ThemeProvider theme={theme}>
-      <CssBaseline />
-      <App />
-    </ThemeProvider>
+    <StyledEngineProvider enableCssLayer>
+      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
+      <ThemeProvider theme={theme}>
+        <CssBaseline />
+        <App />
+      </ThemeProvider>
+    </StyledEngineProvider>
   </StrictMode>,
 // ...
```

**解析**

- `StyledEngineProvider` 要包住會渲染 MUI 的那一層。`enableCssLayer` 是布林值，只負責打開分層，不能傳入層名。
- 打開之後，MUI 會把元件樣式包進名為 `mui` 的 layer，這個名稱由 MUI 決定，我們改不了。所以 `index.css` 的 `@layer` 清單必須寫同樣的 `mui`，MUI 的規則才會落在我們排好的位置。
- 沒有這層包裹，MUI 的樣式會落在層外，優先度高過 Tailwind，工具 class 就蓋不過去。
- `GlobalStyles` 把和 `index.css` 相同的順序宣告再寫一次，並放在 `StyledEngineProvider` 的第一個位置（MUI 的 Tailwind v4 整合文件對 Vite 專案的範例就是這樣放）。原因是 MUI 的樣式由 JavaScript 動態注入，順序宣告若沒有先於 MUI 的樣式出現，`mui` 層可能先被建立，排到 `base` 與 `components` 之前。
- 兩處的順序字串必須完全相同。

{% note info %}
**打包時只會讀 index.css 的層級宣告**
Vite 把 CSS 打包成 stylesheet 時，不會讀到 `GlobalStyles` 裡的那一行。`index.css` 若少了這行，產出會回到 Tailwind 沒有 `mui` 的預設順序，我們插入 `mui` 的客製就丟失了。`GlobalStyles` 是 React 渲染時才套用規則，因此開發模式靠它能正常顯示。
{% endnote %}

### 步驟 4：主題與色票

色票只寫一份，放在 `theme.js` 匯出的 `tokens`。MUI 與 Tailwind 都從這裡取值，樣式表裡不再抄一份色碼。引入這份檔的是入口檔，樣式表本身不會 import 它。

這一步會依序改三個檔案：先把 `theme.js` 換成完整色票，再於入口檔引入它、把色票寫成 CSS 變數，最後讓樣式表去讀這些變數。元件自己的 class 與 MUI 覆寫這一步還不寫。

先把 `theme.js` 整份換掉，上一步的主色收進 `tokens.action`。

```js 06-project-init/src/theme.js
import { createTheme } from '@mui/material/styles';

/**
 * 色票來源。main.jsx 會寫進 --loki-*，Tailwind 讀這些變數。
 * 嫩綠 #3FB27F 配白字僅 2.66:1，未達 WCAG AA（大字門檻 3:1 也未過）。
 * 帶字的主按鈕與連結改用 action #1F6B4A（白字 6.44:1），hover #146845（6.78:1）。
 */
export const tokens = {
  primary: '#3FB27F',
  hover: '#2E8F63',
  action: '#1F6B4A',
  actionHover: '#146845',
  accent: '#FFC94A',
  secondary: '#FFC94A',
  ink: '#1F2A44',
  muted: '#3A4350',
  paper: '#FAF8F3',
  mist: '#E7F4EC',
  foam: '#FFF6D6',
  line: '#E4E0D4',
  alert: '#C23B4A',
  white: '#FFFFFF',
};

export const applyTokens = () => {
  Object.entries(tokens).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--loki-${key}`, value);
  });
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: tokens.action,
      light: tokens.primary,
      dark: tokens.actionHover,
      contrastText: tokens.white,
    },
    secondary: {
      main: tokens.accent,
      dark: '#E8B423',
      contrastText: tokens.ink,
    },
    error: { main: tokens.alert, contrastText: tokens.white },
    text: { primary: tokens.ink, secondary: tokens.muted },
    background: { default: tokens.paper, paper: tokens.white },
    divider: tokens.line,
  },
  typography: {
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: { fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.25 },
    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.35 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '1rem', lineHeight: 1.7 },
    button: { fontWeight: 700, fontSize: '1rem', textTransform: 'none' },
  },
});

export default theme;
```

**解析**

- `tokens` 是唯一的色票來源，MUI 與 Tailwind 都從這裡取值。
- `applyTokens` 把每個鍵名原樣接在 `--loki-` 後面，所以 `actionHover` 會變成 `--loki-actionHover`，不會改成連字號。
- MUI 的 `palette` 直接讀 `tokens` 的十六進位色碼，因為 MUI 要拿色碼計算對比色。帶字的主按鈕用 `action`，不用較亮的 `primary`。
- `cssVariables: true` 讓 MUI 另外產生自己的 CSS 變數；Tailwind 不讀那些，只讀 `--loki-*`。
- `fontFamily` 這一步仍是系統字型，步驟 5 才換。

入口檔引入 `theme.js` 之後，主題照舊交給 Provider；繪製之前，再由 `applyTokens` 把色票寫成網頁根節點上的 CSS 變數。

```diff 06-project-init/src/main.jsx
 // ...
 import App from './App.jsx';
-import theme from './theme.js';
+import theme, { applyTokens } from './theme.js';
 
+applyTokens();
+
 createRoot(document.getElementById('root')).render(
 // ...
```

**解析**

- 入口檔是唯一引入 `theme.js` 的地方，`index.css` 不會也不能 import 它。
- `theme` 照舊傳給 `ThemeProvider`，MUI 元件才讀得到 `palette`。
- `applyTokens()` 寫在 `render` 之前，第一批畫面就讀得到 `--loki-*`；寫在後面，第一幀可能會先出現沒有色票的樣子。

色票變成 CSS 變數之後，`index.css` 才去讀它們。檔案開頭的 `@layer` 與上一步相同，沒有改動。

```css 06-project-init/src/index.css
/* 宣告層級順序，後層可以蓋過前層。mui 是我們插入的層名，必須和 MUI 寫死的名稱相同。 */
@layer theme, base, mui, components, utilities;

@import 'tailwindcss';

/* 把 :root 上的 --loki-*（由 main.jsx 的 applyTokens 寫入）接到 Tailwind 的色名與字型。
   這份檔案不會引入 theme.js。 */
@theme inline {
  --color-primary: var(--loki-primary);
  --color-hover: var(--loki-hover);
  --color-action: var(--loki-action);
  --color-action-hover: var(--loki-actionHover);
  --color-accent: var(--loki-accent);
  --color-secondary: var(--loki-secondary);
  --color-ink: var(--loki-ink);
  --color-muted: var(--loki-muted);
  --color-paper: var(--loki-paper);
  --color-mist: var(--loki-mist);
  --color-foam: var(--loki-foam);
  --color-line: var(--loki-line);
  --color-alert: var(--loki-alert);
  --color-white: var(--loki-white);
  --radius-card: 24px;
  --shadow-card: 0 10px 28px rgb(31 42 68 / 8%);
}

/* 全站基底：頁面底色與文字、選取顏色，以及減少動畫。 */
@layer base {
  body {
    margin: 0;
    font-size: 16px;
    line-height: 1.7;
    background: var(--loki-paper);
    color: var(--loki-ink);
  }

  ::selection {
    background: #d8f3e6;
    color: var(--loki-ink);
  }

  * {
    scrollbar-color: var(--loki-action) var(--loki-mist);
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition: none !important;
      animation: none !important;
    }
  }
}

/* 鍵盤焦點外框。放在 components 層，才蓋得過 mui 層裡 MUI 按鈕自己清掉的 outline；
   頁尾是深色底，外框改白色，對比才夠。 */
@layer components {
  :focus-visible {
    outline: 2px solid var(--loki-action);
    outline-offset: 3px;
  }

  footer :focus-visible {
    outline-color: var(--loki-white);
  }
}
```

**解析**

- 第一行的 `@layer` 沿用步驟 3 的順序，跟色票無關。
- `@theme inline` 才是讀 `--loki-*` 的地方，它把變數對到 Tailwind 的色名：`--color-action: var(--loki-action);` 讓 `bg-action`、`text-action` 這類 class 可以用。
- Tailwind 色名用連字號，所以有 `--color-action-hover: var(--loki-actionHover);`。左邊是 Tailwind 要的名字，右邊是 `applyTokens` 寫出的變數。
- `@layer base { ... }` 把規則放進已宣告的 `base` 層，用同一組變數設定頁面底色、文字色與選取色，並在使用者偏好減少動態時關掉動畫。
- 鍵盤焦點外框放在 `components` 層，而不是 `base`：MUI 的按鈕在 `mui` 層裡把自己的 outline 清掉，`base` 排在 `mui` 前面蓋不過它，`components` 排在後面才蓋得過。頁尾是深色底，所以那裡的外框改成白色。
- 重整後，頁面底色變成米白的 `paper`，文字是深藍的 `ink`。

### 步驟 5：字型與圖示

介面用 Noto Sans TC，標題用 Noto Serif TC。Material Symbols Outlined 是圖示字型：元素的文字內容寫圖示名稱，字型就把名稱畫成圖。

這一步依序改三個檔案：在 `index.html` 載入字型、讓 MUI 的標題與按鈕改用這兩套字，再讓 Tailwind 也用同一組字型，並加上圖示 class。圖示元件留到版面那一章再寫。

```diff 06-project-init/index.html
 // ...
     <title>洛奇旅行</title>
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
+    <link rel="preconnect" href="https://fonts.googleapis.com" />
+    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
+    <link
+      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
+      rel="stylesheet"
+    />
+    <link
+      href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&family=Noto+Serif+TC:wght@600;700&display=swap"
+      rel="stylesheet"
+    />
   </head>
 // ...
```

**解析**

- 兩個 `preconnect` 先跟字型服務建立連線，後面的樣式表下載會快一些。
- 圖示字型的網址帶 `display=block`，字檔到達前先不顯示文字，避免畫面上先閃出一串圖示英文名。內文字型用 `display=swap`，先用後備字，載入後再換成 Noto。

字檔載進來之後，讓 MUI 的標題與按鈕改用這兩套字。

```diff 06-project-init/src/theme.js
 // ...
   typography: {
-    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
-    h1: {
-      fontWeight: 700,
-      fontSize: '3rem',
-      lineHeight: 1.15,
-      letterSpacing: '-0.02em',
-    },
-    h2: { fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.25 },
-    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.35 },
+    fontFamily: "'Noto Sans TC', ui-sans-serif, sans-serif",
+    h1: {
+      fontFamily: "'Noto Serif TC', serif",
+      fontWeight: 700,
+      fontSize: '3rem',
+      lineHeight: 1.15,
+      letterSpacing: '-0.02em',
+    },
+    h2: {
+      fontFamily: "'Noto Serif TC', serif",
+      fontWeight: 700,
+      fontSize: '2.25rem',
+      lineHeight: 1.25,
+    },
+    h3: {
+      fontFamily: "'Noto Serif TC', serif",
+      fontWeight: 600,
+      fontSize: '1.5rem',
+      lineHeight: 1.35,
+    },
     body1: { fontSize: '1rem', lineHeight: 1.7 },
     body2: { fontSize: '1rem', lineHeight: 1.7 },
-    button: { fontWeight: 700, fontSize: '1rem', textTransform: 'none' },
+    button: {
+      fontFamily: "'Noto Sans TC', sans-serif",
+      fontWeight: 700,
+      fontSize: '1rem',
+      textTransform: 'none',
+    },
   },
 // ...
```

**解析**

- 預設的 `fontFamily` 改成 Noto Sans TC，內文與多數元件用無襯線。
- `h1`、`h2`、`h3` 另外指定 Noto Serif TC，標題才用襯線。
- `button` 明確指定無襯線，按鈕文字就不會受標題字型影響。

最後讓 Tailwind 與圖示 class 也用同一套字檔。

```diff 06-project-init/src/index.css
 // ...
 @theme inline {
+  --font-sans: 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif;
+  --font-serif: 'Noto Serif TC', ui-serif, serif;
   --color-primary: var(--loki-primary);
 // ...
     outline-color: var(--loki-white);
   }
 }
+
+/* 把元素文字裡的圖示名稱畫成圖。liga 讓名稱連成一個圖形。 */
+.material-symbols-outlined {
+  font-family: 'Material Symbols Outlined';
+  font-weight: normal;
+  font-style: normal;
+  font-size: 24px;
+  line-height: 1;
+  letter-spacing: normal;
+  text-transform: none;
+  display: inline-block;
+  white-space: nowrap;
+  word-wrap: normal;
+  direction: ltr;
+  -webkit-font-smoothing: antialiased;
+  font-feature-settings: 'liga';
+}
```

**解析**

- `--font-sans` 與 `--font-serif` 讓 Tailwind 的 `font-sans`、`font-serif` class 對到同一組字型。
- `.material-symbols-outlined` 指定圖示字型，並用 `font-feature-settings: 'liga'` 把英文名稱（例如 `menu`）連成一個圖形。之後的 `Icon` 元件會把名稱放進帶這個 class 的 `span`。

# 路由與版面

這一章先用佔位頁與路由表，讓每個網址都有頁可看。接著組出整站外框 `SiteLayout`：頁首、主導覽與頁尾先放標記並接到路由，再逐一換成真正的元件。最後補上找不到頁面時的畫面。

檔案依 feature-based（依功能分資料夾）的方式放：各頁與它專用的元件放在 `features` 下的功能目錄，跨頁共用的放 `_shared`，整站外框放 `layout`，找不到頁面與路由錯誤頁放 `pages`。

## 路由表

這一節先寫佔位頁，再寫路由表。此時還沒有整站外框，每個網址只會看到頁名；外框下一節再加。入口檔不用改，仍然渲染 `App`。

### 步驟 1：建立佔位頁

每一頁都還沒做，先用同一個佔位元件顯示頁名。它跨頁共用，放在 `_shared`。

```jsx 06-project-init/src/_shared/Placeholder.jsx
export default function Placeholder({ title }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-serif text-4xl font-bold text-ink">{title}</h1>
    </main>
  );
}
```

**解析**

- 佔位頁只把 `title` 畫成 `h1` 大標題。
- 它的 `main` 用和多數內頁相同的最大寬度與上下間距，換成真正的頁面時版面不會跳。
- 路由表裡的頁都換成真正的元件後，就沒有路由再引用它；完成品仍保留這個檔，刪不刪都不影響。

### 步驟 2：寫路由表

先前那顆測試按鈕在這裡換成路由表。`App.jsx` 用 `createBrowserRouter` 建立路由物件陣列，再交給 `RouterProvider`。這一版還沒有外框，每個路徑直接渲染對應的佔位頁。用 `pnpm dev` 啟動後，把網址改成 `/tours` 並重整，就會看到「行程列表」。

```jsx 06-project-init/src/App.jsx
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Placeholder from './_shared/Placeholder.jsx';

const router = createBrowserRouter([
  { index: true, element: <Placeholder title="首頁" /> },
  { path: 'tours', element: <Placeholder title="行程列表" /> },
  { path: 'tours/:id', element: <Placeholder title="行程詳情" /> },
  { path: 'booking', element: <Placeholder title="報名" /> },
  { path: 'booking/:id', element: <Placeholder title="報名完成" /> },
  { path: 'me', element: <Placeholder title="我的報名" /> },
  { path: 'about', element: <Placeholder title="關於" /> },
  { path: 'login', element: <Placeholder title="登入提示" /> },
  { path: 'admin/login', element: <Placeholder title="後台登入" /> },
  { path: 'admin', element: <Placeholder title="後台行程" /> },
  { path: 'admin/bookings', element: <Placeholder title="後台報名" /> },
  { path: '*', element: <Placeholder title="找不到頁面" /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- `createBrowserRouter` 把路由物件陣列做成路由器，`App` 回傳 `RouterProvider`，由它依目前網址畫出對上的頁。
- `index: true` 對應 `/`；其餘路由都在同一層，各用一個 `path` 對應一個網址。
- 報名表的路徑是 `/booking`，行程與梯次用查詢字串傳遞，例如 `/booking?tourId=hualien-taroko&departureId=2026-12-18`；完成頁是 `/booking/:id`，`id` 是訂單編號。查詢字串不算路徑的一段，所以這兩條不會互相擋住。
- `tours/:id` 的 `id` 是路徑參數，等詳情頁才用 `useParams` 讀取，見 {% post_link lokiTech-15day-11-react-router %}。
- `*` 的優先度最低，前面都沒對上的網址才會落到它。
- 畫面上只有各頁的大標題，還沒有頁首與頁尾。

## 規劃 SiteLayout

路由已經接上。這一節組出整站外框 `SiteLayout`：它包住頁首、頁尾與中間放各頁的位置，頁首裡又有主導覽與圖示。做法是先用文字標記放好頁首、主導覽與頁尾，並把外框接到路由當父路由，在畫面上確認位置，再逐一換成真正的元件。頁首的登入鈕在這裡只是連到 `/login` 的連結，登入頁之後再做。

```
src/
├── _shared/
│   └── Icon.jsx
└── layout/
    ├── SiteLayout.jsx
    └── components/
        ├── SiteHeader.jsx
        ├── SiteNav.jsx
        └── SiteFooter.jsx
```

{% mermaid graph TD %}
  layout["SiteLayout"] --> header["SiteHeader"]
  layout --> outlet["Outlet"]
  layout --> footer["SiteFooter"]
  header --> nav["SiteNav"]
  header --> icon["Icon"]
  footer --> icon
{% endmermaid %}

### 步驟 1：下層標記與 SiteLayout

先寫頁首、主導覽與頁尾的標記元件，再組 `SiteLayout`，最後把它接到路由當父路由。頁首會渲染主導覽，所以之後換掉主導覽時，效果會出現在頁首裡。

主導覽先放標記。

```jsx 06-project-init/src/layout/components/SiteNav.jsx
export default function SiteNav() {
  return <nav className="font-bold text-ink">主導覽</nav>;
}
```

**解析**

- 此刻只顯示「主導覽」三個字。

頁首先放標記，並先渲染主導覽。

```jsx 06-project-init/src/layout/components/SiteHeader.jsx
import SiteNav from './SiteNav.jsx';

export default function SiteHeader() {
  return (
    <header className="bg-paper px-4 py-3 font-bold text-ink">
      頁首
      <SiteNav />
    </header>
  );
}
```

**解析**

- 頁首此刻只有「頁首」兩個字，加上下面的主導覽標記。真正的頁首在步驟 4 換上。

頁尾用 `mt-auto`，在直向排列的 flex 容器（`SiteLayout`）裡把它推到最下面。

```jsx 06-project-init/src/layout/components/SiteFooter.jsx
export default function SiteFooter() {
  return <footer className="mt-auto bg-ink px-4 py-6 text-white">頁尾</footer>;
}
```

**解析**

- 頁尾此刻只顯示「頁尾」。真正的內容在步驟 5 換上。

外框把頁首、中間的 `Outlet` 與頁尾組起來，並在最後放上 `ScrollRestoration`。

```jsx 06-project-init/src/layout/SiteLayout.jsx
import { Outlet, ScrollRestoration } from 'react-router';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
```

**解析**

- 最外層是直向的 flex 容器，高度至少一個螢幕（`min-h-screen`）；中間的 `flex-1` 區塊撐滿剩餘高度，頁尾因此貼在底部。
- `Outlet` 畫出子路由對上的元件，頁首與頁尾留在外面。
- `ScrollRestoration` 讓換頁後回到頁面頂端、按上一頁或下一頁時還原當時的捲動位置，不必自己寫捲動程式，用法見 {% post_link lokiTech-15day-11-react-router %}。

接著更新 `App.jsx`：引入外框，把十二條路由收進父路由的 `children`。

```jsx 06-project-init/src/App.jsx
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import SiteLayout from './layout/SiteLayout.jsx';
import Placeholder from './_shared/Placeholder.jsx';

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <Placeholder title="首頁" /> },
      { path: 'tours', element: <Placeholder title="行程列表" /> },
      { path: 'tours/:id', element: <Placeholder title="行程詳情" /> },
      { path: 'booking', element: <Placeholder title="報名" /> },
      { path: 'booking/:id', element: <Placeholder title="報名完成" /> },
      { path: 'me', element: <Placeholder title="我的報名" /> },
      { path: 'about', element: <Placeholder title="關於" /> },
      { path: 'login', element: <Placeholder title="登入提示" /> },
      { path: 'admin/login', element: <Placeholder title="後台登入" /> },
      { path: 'admin', element: <Placeholder title="後台行程" /> },
      { path: 'admin/bookings', element: <Placeholder title="後台報名" /> },
      { path: '*', element: <Placeholder title="找不到頁面" /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- 父路由沒有 `path`，只提供外框：`element` 是 `SiteLayout`，`children` 裡的頁都畫在它的 `Outlet`。
- 重整後，由上而下會看到「頁首」與「主導覽」、佔位頁的標題，以及「頁尾」。

### 步驟 2：圖示元件

標記已經在畫面上，接下來逐一換成真正的元件：先做圖示，再換主導覽，然後補頁首要用的主題設定，最後換頁首與頁尾。

「樣式與主題」那一節已經引入圖示字型，也寫好了圖示 class。現在寫一個元件，把圖示名稱放進帶那個 class 的 `span`。

```jsx 06-project-init/src/_shared/Icon.jsx
export default function Icon({ name, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
```

**解析**

- `name` 是圖示名稱，字型會把它畫成圖。頁首的選單按鈕稍後會傳 `menu`。
- `className` 讓呼叫端再加顏色或間距。
- `aria-hidden="true"` 讓輔助科技略過它，不會把圖示的英文名稱唸出來。

### 步驟 3：主導覽

把主導覽的標記換成真正的元件。頁首的桌面列與手機選單要顯示同一組連結，所以導覽獨立成一個元件。換完重整，頁首裡會出現「行程」「關於」「我的報名」三個連結。

```jsx 06-project-init/src/layout/components/SiteNav.jsx
import { NavLink } from 'react-router';

const item = ({ isActive }) =>
  `inline-flex min-h-11 items-center rounded-full px-3 font-bold ${isActive ? 'bg-action text-white' : 'text-ink hover:bg-mist'}`;

export default function SiteNav({ onNavigate, id }) {
  return (
    <nav id={id} className="flex flex-col gap-1 md:flex-row md:items-center">
      <NavLink to="/tours" className={item} onClick={onNavigate}>
        行程
      </NavLink>
      <NavLink to="/about" className={item} onClick={onNavigate}>
        關於
      </NavLink>
      <NavLink to="/me" className={item} onClick={onNavigate}>
        我的報名
      </NavLink>
    </nav>
  );
}
```

**解析**

- `NavLink` 會把 `isActive` 傳給 `className` 函式，目前所在頁的那一項畫成實心膠囊，其餘只有文字，寫法見 {% post_link lokiTech-15day-11-react-router %}。
- `item` 是函式而不是字串，因為 class 要依是不是目前頁而改變。
- `onNavigate` 給手機選單用：點了連結就收起選單。
- `id` 讓呼叫端替 `nav` 指定識別，頁首會替桌面版的導覽設成 `site-nav`。

### 步驟 4：組出 SiteHeader

頁首會用到 MUI 的頂列（`AppBar`）、按鈕（`Button`）與從側邊滑出的面板（`Drawer`，手機選單用）。這些元件的長相集中寫在 `theme.js`，全站的同類元件都會跟著套用，不必在每個元件裡重寫。

```diff 06-project-init/src/theme.js
 // ...
     divider: tokens.line,
   },
+  shape: { borderRadius: 12 },
   typography: {
 // ...
     button: {
       fontFamily: "'Noto Sans TC', sans-serif",
       fontWeight: 700,
       fontSize: '1rem',
       textTransform: 'none',
     },
   },
+  components: {
+    MuiButton: {
+      defaultProps: { disableElevation: true },
+      styleOverrides: {
+        root: {
+          borderRadius: 999,
+          minHeight: 44,
+          paddingInline: 22,
+          fontWeight: 700,
+        },
+        outlined: {
+          borderColor: tokens.line,
+          color: tokens.ink,
+          '&:hover': {
+            borderColor: tokens.action,
+            backgroundColor: tokens.mist,
+          },
+        },
+      },
+    },
+    MuiAppBar: {
+      defaultProps: { color: 'inherit', elevation: 0 },
+      styleOverrides: {
+        root: {
+          backgroundColor: 'rgb(250 248 243 / 92%)',
+          color: tokens.ink,
+          backdropFilter: 'blur(14px)',
+          borderBottom: `1px solid ${tokens.line}`,
+        },
+      },
+    },
+    MuiDrawer: {
+      styleOverrides: { paper: { borderRadius: '0 24px 24px 0', width: 280 } },
+    },
+    MuiBackdrop: {
+      styleOverrides: { root: { backgroundColor: 'rgb(31 42 68 / 45%)' } },
+    },
+  },
 });
 // ...
```

**解析**

- `shape.borderRadius` 先設成 12，作為元件的預設圓角。
- `MuiButton` 的 `root` 把圓角改成 `999`，按鈕變成膠囊；`disableElevation` 設成 `true`，按鈕預設不帶陰影。
- 實心按鈕的顏色來自 `palette` 的 `primary` 與 `secondary`，和 `tokens` 是同一組色票。
- `MuiAppBar` 設成半透明並模糊背景、沒有陰影，底邊一條分隔線；貼在上緣是 `SiteHeader` 用 `position` 決定的。
- `MuiDrawer` 的面板寬 280，圓角寫在右側兩個角。
- `MuiBackdrop` 是面板打開時後面那層半透明遮罩。

接著把頁首的標記換成真正的 `SiteHeader`。左邊是站名，右邊是導覽與登入鈕；窄螢幕改成一顆選單按鈕，點了之後從右側滑出同一組連結。

```jsx 06-project-init/src/layout/components/SiteHeader.jsx
import { useState } from 'react';
import { Link } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import SiteNav from './SiteNav.jsx';
import Icon from '../../_shared/Icon.jsx';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <AppBar id="site-header" position="sticky" component="header">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link to="/" className="font-serif text-2xl font-semibold text-ink">
          洛奇旅行
        </Link>
        <Button
          id="nav-toggle"
          className="md:hidden"
          variant="outlined"
          startIcon={<Icon name="menu" />}
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
        >
          選單
        </Button>
        <div className="hidden items-center gap-1 md:flex">
          <SiteNav onNavigate={close} id="site-nav" />
          <Button component={Link} to="/login" onClick={close}>
            登入
          </Button>
        </div>
      </div>
      <Drawer anchor="right" open={open} onClose={close}>
        <div id="site-drawer" className="flex flex-col gap-2 p-4">
          <SiteNav onNavigate={close} />
          <Button component={Link} to="/login" onClick={close}>
            登入
          </Button>
        </div>
      </Drawer>
    </AppBar>
  );
}
```

**解析**

- `AppBar` 的 `position="sticky"` 讓頂列捲動時貼在視窗上緣；`component="header"` 讓它輸出成 `header` 元素。站名是連到 `/` 的 `Link`。
- 桌面版用 `hidden` 加 `md:flex` 顯示導覽與登入鈕，選單按鈕用 `md:hidden`，只在窄螢幕出現。`md` 是 Tailwind 的斷點，寬度 768px 以上算桌面。
- 登入鈕寫成 `component={Link}`，外觀是按鈕，行為是路由連結，連到 `/login`。
- 選單開關由 `useState` 的 `open` 控制；把 `close` 傳給導覽，點了連結就收起選單。
- `aria-expanded` 與 `aria-controls` 告訴輔助科技這顆按鈕控制哪個面板、目前是否展開；`site-header`、`site-nav`、`nav-toggle` 這幾個 id 是給這些屬性與之後的程式識別用的。
- 重整後，寬畫面看到站名、三個連結與「登入」；把視窗縮窄，改成「選單」按鈕，點下去從右側滑出同一組連結。

### 步驟 5：組出 SiteFooter

把頁尾的標記換成真正的 `SiteFooter`，內容是站名、聯絡方式與探索連結。後台入口放在頁尾最底下，不放進前台選單。最底下的年份用 `new Date().getFullYear()` 取得，`Date` 見 {% post_link lokiTech-15day-06-js-basics %} 的「選讀：內建物件」。

```jsx 06-project-init/src/layout/components/SiteFooter.jsx
import { Link } from 'react-router';
import Icon from '../../_shared/Icon.jsx';

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 md:gap-8 md:py-24">
        <div>
          <p className="font-serif text-2xl font-semibold">洛奇旅行</p>
          <p className="mt-3 text-lg text-foam">每團最多 8 人的小團旅行。</p>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            台灣本島小團，以及一條京都短團。出團前用 email 對一次名單。
          </p>
        </div>
        <div>
          <p className="font-semibold">聯絡我們</p>
          <p className="mt-4 flex items-start gap-2 leading-relaxed">
            <Icon name="call" className="mt-1 text-accent" />
            電話（02）0000-1111
          </p>
          <p className="mt-2 flex items-start gap-2 leading-relaxed">
            <Icon name="location_on" className="mt-1 text-accent" />
            100 台北市中正區教材路 8 號
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            出團前以 email 確認。未成行，團費全額退回。
          </p>
        </div>
        <div>
          <p className="font-semibold">探索</p>
          <nav className="mt-3 flex flex-col">
            <Link
              className="inline-flex min-h-11 items-center text-foam hover:text-white"
              to="/tours"
            >
              行程
            </Link>
            <Link
              className="inline-flex min-h-11 items-center text-foam hover:text-white"
              to="/about"
            >
              關於
            </Link>
          </nav>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            交通部觀光署旅行業執照交觀甲 999999 號
          </p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 sm:px-6">
          <Link
            className="w-fit text-sm text-white/55 hover:text-white"
            to="/admin/login"
          >
            後台登入
          </Link>
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} 洛奇旅行
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**解析**

- 頁尾用深色背景 `bg-ink`，寬度到 `md` 以上分成三欄：站名、聯絡我們、探索。
- 電話與地址前面的圖示呼叫剛才的 `Icon`，名稱是 `call` 與 `location_on`。
- 「探索」放行程與關於兩條連結；「後台登入」連到 `/admin/login`，單獨放在最底下。
- 重整後拉到頁面底部，會看到深色頁尾。

## 找不到頁面

網址對不上任何路由時，要顯示找不到頁面；之後各頁的 `loader` 查不到資料時，會 `throw data('找不到頁面', { status: 404 })`，也要顯示同一個畫面。兩種情況都要留著頁首與頁尾，所以 `errorElement` 不掛在外框，而掛在外框與各頁之間那層沒有 `path` 的路由。

{% mermaid graph TD %}
  layout["SiteLayout 頁首、Outlet、頁尾"] --> gate["沒有 path 的那一層"]
  gate --> pages["各頁"]
  pages -->|"loader throw 404"| gate
  gate -->|"errorElement"| err["RouteErrorPage"]
  err -->|"isRouteErrorResponse 且 404"| notFound["NotFoundPage"]
  err -->|"其他錯誤"| other["發生錯誤"]
  style layout fill:#e8f5e9
  style gate fill:#fff3e0
  style err fill:#fff3e0
  style notFound fill:#e8f5e9
  style other fill:#ffebee
{% endmermaid %}

頁面的 `loader` 丟出 404 時，錯誤停在沒有 `path` 的那一層，只替換 `Outlet` 裡的畫面，頁首與頁尾留著；若把 `errorElement` 掛在外框上，整份版型會被換掉。`RouteErrorPage` 遇到 404 就渲染找不到頁面的畫面，其他錯誤顯示「發生錯誤」。一般規則見[第十一篇〈errorElement：拿不到資料時〉](/2026/08-30/lokiTech-15day-11-react-router/#errorElement：拿不到資料時)。

這一節寫 `NotFoundPage` 與 `RouteErrorPage`，再接到路由。

### 步驟 1：組出 NotFoundPage

先寫找不到頁面的畫面：超大的「404」在上，下面是標題、說明與兩顆按鈕。

```jsx 06-project-init/src/pages/NotFoundPage.jsx
import { Link, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <title>找不到頁面 · 洛奇旅行</title>
      <p className="font-serif text-8xl font-bold leading-none text-ink sm:text-9xl">
        404
      </p>
      <Typography variant="h1" className="mt-6">
        找不到這個頁面
      </Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
        這個網址沒有對應的頁面。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="contained" onClick={() => navigate(-1)}>
          返回上一頁
        </Button>
        <Button component={Link} to="/" variant="outlined">
          回首頁
        </Button>
      </div>
    </main>
  );
}
```

{% note info %}
React 19 會把元件裡的 `<title>` 提升到文件的 `<head>`，元件卸載時這段標題跟著拿掉，下一頁的標題接上。`<title>` 的內容必須是單一字串，依資料組標題時要用模板字串寫成一整段，行程詳情頁會示範。
{% endnote %}

**解析**

- 分頁標題變成「找不到頁面 · 洛奇旅行」。
- 「404」用 `font-serif` 粗體；下面的標題「找不到這個頁面」用 MUI 的 `Typography`。
- 「返回上一頁」呼叫 `useNavigate` 取得的 `navigate(-1)`，回到瀏覽紀錄的上一筆；「回首頁」是連到 `/` 的按鈕。

### 步驟 2：接到路由

先寫負責判斷錯誤種類的 `RouteErrorPage`。

```jsx 06-project-init/src/pages/RouteErrorPage.jsx
import { isRouteErrorResponse, useRouteError } from 'react-router';
import Typography from '@mui/material/Typography';
import NotFoundPage from './NotFoundPage.jsx';

/**
 * 子路由的 loader 或 action throw 之後，路由器往上找到最近的 errorElement 就畫這一頁。
 * useRouteError 讀到被丟出的值。
 * isRouteErrorResponse 為真且 status 是 404 時，渲染 NotFoundPage，頁首頁尾留著。
 * 其他的路由錯誤回應顯示 error.data；一般的 Error 顯示 error.message。
 */
export default function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404)
    return <NotFoundPage />;

  const message = isRouteErrorResponse(error) ? error.data : error?.message;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>發生錯誤 · 洛奇旅行</title>
      <Typography variant="h1">發生錯誤</Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
        {message ? String(message) : '請稍後再試'}
      </p>
    </main>
  );
}
```

**解析**

- `useRouteError` 讀到被丟出的值，`isRouteErrorResponse` 判斷它是不是 `data()` 做出的路由錯誤回應。狀態碼是 404 就渲染 `NotFoundPage`。
- 其他錯誤顯示「發生錯誤」：路由錯誤回應用 `error.data` 當說明，一般的 `Error` 用 `error.message`，都沒有時顯示「請稍後再試」。

再把星號路由與沒有 `path` 的錯誤層接到 `App.jsx`。

```jsx 06-project-init/src/App.jsx
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import SiteLayout from './layout/SiteLayout.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RouteErrorPage from './pages/RouteErrorPage.jsx';
import Placeholder from './_shared/Placeholder.jsx';

const router = createBrowserRouter([
  {
    Component: SiteLayout,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, element: <Placeholder title="首頁" /> },
          { path: 'tours', element: <Placeholder title="行程列表" /> },
          { path: 'tours/:id', element: <Placeholder title="行程詳情" /> },
          { path: 'booking', element: <Placeholder title="報名" /> },
          { path: 'booking/:id', element: <Placeholder title="報名完成" /> },
          { path: 'me', element: <Placeholder title="我的報名" /> },
          { path: 'about', element: <Placeholder title="關於" /> },
          { path: 'login', element: <Placeholder title="登入提示" /> },
          { path: 'admin/login', element: <Placeholder title="後台登入" /> },
          { path: 'admin', element: <Placeholder title="後台行程" /> },
          { path: 'admin/bookings', element: <Placeholder title="後台報名" /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- `*` 路由直接渲染 `NotFoundPage`。它在版型裡，所以網址對不上時，頁首與頁尾還在。
- 沒有 `path` 的那一層只掛 `errorElement`。子路由的 `loader` 丟出 404 時，錯誤停在這層，只換掉 `Outlet` 裡的畫面。
- 其他頁仍是佔位頁。之後各頁的 `loader` 查不到資料時丟 404，不在元件裡自己 `return <NotFoundPage />`。
- 試試網址 `/no-such`，會看到頁首、404 畫面與頁尾。

# 前台頁面

先建立各頁要共用的行程資料，再把對應的佔位元件換成真正的頁面，並且只補這一頁要讀的欄位。讀取用路由的 `loader`，寫法見 {% post_link lokiTech-15day-11-react-router %}。

前台目錄的放法如下：

- 各頁放進 `features/`：頁面檔在功能目錄下，該頁的零件進 `components/`；沒有零件的功能就不必建空資料夾。
- 每個功能的假資料放在自己的 `mock.data.js`。
- 行程和篩選選項放在 `features/*/mock.data.js`，其他功能要共用時再 import，做法與稍後首頁引用 `TourCard` 相同。
- 共用的行程與報名放在 `src/store.js` 的模組陣列。頁面用 `loader` 讀，不經過 Context。
- 下面各頁會先用圖畫出誰組誰，先組出該頁並放 placeholder、接到路由，再逐一換成真正的零件。

{% mermaid graph TD %}
  app["App"] --> store["store.js 記憶體資料"]
  app --> layout["SiteLayout 外框"]
  layout --> home["home 首頁"]
  layout --> tours["tours 行程"]
  layout --> booking["booking 報名"]
  layout --> about["about 關於"]
  layout --> auth["auth 登入"]
  store -.-> home
  store -.-> tours
  store -.-> booking
  style store fill:#fff3bf,stroke:#d97706,color:#422006
{% endmermaid %}

## 記憶體資料

首頁、行程、報名與後台讀的是同一份清單，放在模組最外層的陣列，函式直接改這個陣列。這不是 React 狀態，也沒有 Context，`App` 只渲染路由。（後台在後面的章節才會做。）頁面在 `loader` 裡呼叫取資料的函式，再用 `useLoaderData` 拿到結果；寫入放在 `action`。

`saveTour` 會呼叫後台的 `tourFromDraft`。這一節先把資料模組整份放上，其中兩處是稍後會被各頁換掉的起點：報名種子先是空陣列，該函式先原樣回傳草稿。

行程種子先留空，等各頁用到再補。

```js 06-project-init/src/features/tours/mock.data.js
export const tours = [];
```

**解析**

- `features/tours/mock.data.js` 此刻只匯出空的 `tours`。首頁輪播與列表稍後會換成真正的資料。

報名種子也先留空。

```js 06-project-init/src/features/booking/mock.data.js
export const bookings = [];
```

**解析**

- `features/booking/mock.data.js` 此刻只匯出空的 `bookings`。詳情頁與後台清單稍後再補種子。

`tourFromDraft` 先原樣回傳草稿，後台表單寫好再換成真正的轉換。

```js 06-project-init/src/features/admin/components/tourDraft.js
export const tourFromDraft = (draft) => ({ error: '', tour: draft });
```

**解析**

- 這份檔目前只有一個直接回傳草稿的函式，讓 `store.js` 先編譯得過。

記憶體資料模組放在 `src/store.js`。

```js 06-project-init/src/store.js
import { tours as seedTours } from './features/tours/mock.data.js';
import { bookings as seedBookings } from './features/booking/mock.data.js';
import { tourFromDraft } from './features/admin/components/tourDraft.js';

let tours = [...seedTours];
let bookings = [...seedBookings];

export const getTours = () => tours;

export const getTour = (id) => tours.find((item) => item.id === id) ?? null;

export const getBookings = () => bookings;

export const getBooking = (id) =>
  bookings.find((item) => item.id === id) ?? null;

export const saveTour = (editingId, draft) => {
  const { error, tour } = tourFromDraft(draft);
  if (error) return error;
  tours = editingId
    ? tours.map((item) =>
        item.id === editingId ? { ...tour, id: editingId } : item,
      )
    : [{ ...tour, id: `tour-${Date.now()}` }, ...tours];
  return '';
};

export const deleteTour = (id) => {
  tours = tours.filter((item) => item.id !== id);
};

export const setBookingStatus = (id, status) => {
  bookings = bookings.map((item) =>
    item.id === id ? { ...item, status } : item,
  );
};

export const createBooking = (input) => {
  const row = {
    id: `local-${Date.now()}`,
    status: 'pending',
    uid: 'demo-local',
    ...input,
  };
  bookings = [row, ...bookings];
  return row;
};
```

**解析**

- 行程與報名各是模組裡的一個 `let` 陣列，`getTours`、`getBooking` 這類讀取函式只讀當下的內容。
- `createBooking` 組出一筆 `id` 為 `local-` 加時間戳、狀態 `pending` 的報名，插到陣列最前面並回傳。完成頁依網址上的 `id` 去找這一筆。重新整理後回到種子。
- `saveTour` 先用 `tourFromDraft`。有錯誤就回傳那句話；新增時 `id` 是 `tour-` 加時間戳，編輯時沿用原來的 `id`。
- `deleteTour` 依 `id` 濾掉行程。`setBookingStatus` 只改那一筆的 `status`，不從清單移除。
- 頁面不要 import 陣列來自己改狀態。進入路由時由 `loader` 讀，表單送出由 `action` 寫，寫完後 `loader` 會再跑。

## 首頁

首頁讀精選行程、主題圖、三則理由與四則評價。假資料寫到該區塊用到時，再補進對應的 `mock.data.js`。列表才要的價格區間、詳情才要的每日行程，這一節先不寫。

這一節要組出 `HomePage`。頁面只組區塊元件，標題與內容寫在各區塊裡。

{% mermaid graph TD %}
  page["HomePage 首頁"] --> slider["HeroSlider 輪播"]
  page --> search["HeroSearch 搜尋表單"]
  page --> intro["IntroBanner 簡介橫幅"]
  page --> featured["FeaturedTours 熱門行程"]
  page --> themes["ThemeSection 依主題找路"]
  page --> reasons["ReasonSection 為什麼選我們"]
  page --> reviews["ReviewSection 旅客怎麼說"]
  search --> field["FieldSelect 下拉選單"]
  featured --> card["TourCard 行程卡片"]
{% endmermaid %}

### 步驟 1：組出 HomePage

先把首頁組起來並接到路由，後面寫零件時才能在畫面上對照。下層元件先用 placeholder 標出區塊位置。

輪播先放標記。

```jsx 06-project-init/src/features/home/components/HeroSlider.jsx
export default function HeroSlider() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-ink text-2xl text-white">
      輪播
    </section>
  );
}
```

**解析**

- 先回傳標記文字，讓首頁組起來就能看到輪播的位置。稍後傳入的 `slides` 此刻先不必接收，多餘的 props 會被忽略。

搜尋表單先放標記。

```jsx 06-project-init/src/features/home/components/HeroSearch.jsx
export default function HeroSearch() {
  return <p className="rounded-card bg-white p-6 shadow-card">搜尋表單</p>;
}
```

**解析**

- 先回傳標記文字，標出搜尋表單的位置。

行程卡片先放標記，之後熱門行程與列表都會用到。

```jsx 06-project-init/src/features/tours/components/TourCard.jsx
export default function TourCard() {
  return (
    <article className="rounded-card bg-white p-6 shadow-card">
      行程卡片
    </article>
  );
}
```

**解析**

- 先回傳標記文字。稍後傳入的 `tour` 此刻先不必接收。

「簡介橫幅」先放標記。

```jsx 06-project-init/src/features/home/components/IntroBanner.jsx
export default function IntroBanner() {
  return <p className="mt-12">簡介橫幅</p>;
}
```

**解析**

- 先回傳標記文字，標出這塊深色區的位置。

熱門行程先放標記。

```jsx 06-project-init/src/features/home/components/FeaturedTours.jsx
export default function FeaturedTours() {
  return <p className="mt-8">熱門行程</p>;
}
```

**解析**

- 先回傳標記文字，標出熱門行程的位置。稍後傳入的 `tours` 此刻先不必接收。

「依主題找路」先放標記。

```jsx 06-project-init/src/features/home/components/ThemeSection.jsx
export default function ThemeSection() {
  return <p className="mt-8">依主題找路</p>;
}
```

**解析**

- 先回傳標記文字，標出依主題找路的位置。

「為什麼選我們」先放標記。

```jsx 06-project-init/src/features/home/components/ReasonSection.jsx
export default function ReasonSection() {
  return <p className="mt-8">為什麼選我們</p>;
}
```

**解析**

- 先回傳標記文字，標出為什麼選我們的位置。

「旅客怎麼說」先放標記。

```jsx 06-project-init/src/features/home/components/ReviewSection.jsx
export default function ReviewSection() {
  return <p className="mt-8">旅客怎麼說</p>;
}
```

**解析**

- 先回傳標記文字，標出旅客怎麼說的位置。

接著把零件組進 `HomePage`。行程由這一頁的 `loader` 取得，元件用 `useLoaderData` 讀取。頁面只組區塊，不寫各區的標題與內容。

```jsx 06-project-init/src/features/home/HomePage.jsx
import { useLoaderData } from 'react-router';
import FeaturedTours from './components/FeaturedTours.jsx';
import HeroSearch from './components/HeroSearch.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import IntroBanner from './components/IntroBanner.jsx';
import ReasonSection from './components/ReasonSection.jsx';
import ReviewSection from './components/ReviewSection.jsx';
import ThemeSection from './components/ThemeSection.jsx';
import { getTours } from '../../store.js';

export const loader = () => ({ tours: getTours() });

export default function HomePage() {
  const { tours } = useLoaderData();
  const featured = tours.filter((tour) => tour.featured);

  return (
    <main>
      <title>洛奇旅行</title>
      <HeroSlider slides={featured.length ? featured : tours.slice(0, 4)} />
      <HeroSearch />
      <IntroBanner />
      <FeaturedTours tours={featured} />
      <ThemeSection />
      <ReasonSection />
      <ReviewSection />
    </main>
  );
}
```

**解析**

- `featured` 是標成精選的行程，同時送給輪播與 `FeaturedTours`。一筆精選都沒有時，輪播改拿陣列前面四筆，避免主視覺是空的。
- `HeroSearch` 接在輪播後面。簡介橫幅、熱門行程、依主題找路、為什麼選我們、旅客怎麼說，各由對應的區塊元件自己畫標題與內容。

接著把路由表裡的首頁佔位換成 `HomePage`。

```diff 06-project-init/src/App.jsx
 import SiteLayout from './layout/SiteLayout.jsx';
+import HomePage, { loader as homeLoader } from './features/home/HomePage.jsx';
 import NotFoundPage from './pages/NotFoundPage.jsx';
 // ...
-          { index: true, element: <Placeholder title="首頁" /> },
+          { index: true, loader: homeLoader, element: <HomePage /> },
           { path: 'tours', element: <Placeholder title="行程列表" /> },
```

**解析**

- 首頁換成 `HomePage`，其他路徑仍用佔位頁。`loader` 從同一個檔一起匯入，掛在首頁那條路由。

### 步驟 2：搜尋表單

先抽出各頁會共用的下拉選單，再把首頁的搜尋表單 placeholder 換成真正的元件。

#### 共用的 FieldSelect

首頁、行程列表、報名表和後台表單都會用到下拉選單。MUI 的 `Select` 每次都要搭配標籤與選項元件，這段包法若在各頁重寫，之後要改標籤或選單對應就要改很多處。所以先抽一個共用的 `FieldSelect` 放在共用資料夾，呼叫端只傳 id、標籤、目前值、變更函式與選項。

Select 的箭頭改成圖示字型：`ms` 產生一顆帶圖示名稱的 span，取代 Select 預設的 SVG。

```diff 06-project-init/src/theme.js
+import { createElement } from 'react';
 import { createTheme } from '@mui/material/styles';
 // ...
   });
 };
 
+/** Material Symbols 字型 icon（取代 MUI 內建 SVG）。 */
+const ms = (name, props = {}) =>
+  createElement(
+    'span',
+    {
+      'aria-hidden': 'true',
+      ...props,
+      className: `material-symbols-outlined ${props.className || ''}`.trim(),
+    },
+    name,
+  );
+const SelectArrow = ({ className }) => ms('expand_more', { className });
+
 const theme = createTheme({
 // ...
     MuiBackdrop: {
       styleOverrides: { root: { backgroundColor: 'rgb(31 42 68 / 45%)' } },
     },
+    MuiSelect: {
+      defaultProps: { IconComponent: SelectArrow },
+    },
   },
 // ...
```

**解析**

- `ms` 會產生一顆帶 `material-symbols-outlined` 的 `span`，文字就是圖示名稱，字型把它畫成圖。
- `SelectArrow` 固定用 `expand_more`。MUI 開啟選單時會把 class 傳進來，箭頭才能跟著旋轉。
- `IconComponent` 寫在 `MuiSelect` 的 `defaultProps`，全站 Select 都會換成這支箭頭，不必每個元件再傳一次。

接著把 `FormControl`、標籤與選項收進 `FieldSelect`。

```jsx 06-project-init/src/_shared/FieldSelect.jsx
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function FieldSelect({
  id,
  label,
  value,
  onChange,
  options,
  hiddenLabel = false,
}) {
  return (
    <FormControl className="w-full">
      <InputLabel
        id={`${id}-label`}
        className={hiddenLabel ? 'sr-only' : undefined}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        label={hiddenLabel ? undefined : label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value || 'all'} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
```

**解析**

- `FormControl` 包住標籤與選單，並加上 `w-full`，讓它在格子裡拉滿寬度。
- `InputLabel` 的 `id` 和 Select 的 `labelId` 對上，點標籤會作用在這個選單上。
- `hiddenLabel` 為真時，標籤加上 `sr-only`，畫面上不再顯示；Select 也不再傳 `label`，避免為了騰出標籤空間而多出一截空白。
- `onChange` 只把 `event.target.value` 往外傳，呼叫端收到的是字串，不必自己拆事件。
- `options` 是 `{ value, label }` 陣列：`value` 送給表單，`label` 顯示給使用者。空白的值用 `'all'` 當 `key`，避免 React 收到空字串 `key`。

#### 搜尋表單的 HeroSearch

接著把搜尋表單的 placeholder 換成真正的元件。地區與天數用剛剛的 `FieldSelect`，送出後把條件寫進網址，導到行程列表。

下拉選單要用地區與天數的選項，補進剛才的 `mock.data.js`。行程本體等輪播用到再補。

```diff 06-project-init/src/features/tours/mock.data.js
 export const tours = [];
+
+export const regions = ['台北', '基隆', '花蓮', '台東', '台南', '高雄', '金門', '京都'];
+
+export const dayOptions = [2, 3, 4, 5];
```

**解析**

- `regions` 與 `dayOptions` 寫在行程的 `mock.data.js`，搜尋表單與之後的列表篩選都讀這一份。

接著換成真正的搜尋表單。

```jsx 06-project-init/src/features/home/components/HeroSearch.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { dayOptions, regions } from '../../tours/mock.data.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

export default function HeroSearch() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('');
  const [days, setDays] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (region) params.set('region', region);
    if (days) params.set('days', days);
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <div className="relative z-20 mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 lg:-mt-20">
      <form
        className="rounded-card bg-white shadow-card p-6 md:p-8"
        onSubmit={submit}
      >
        <Typography variant="h2">找一趟慢一點的行程</Typography>
        <p className="mt-2 text-muted">選地區與天數，或直接看全部。</p>
        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <FieldSelect
            id="hero-region"
            label="地區"
            value={region}
            onChange={setRegion}
            options={[
              { value: '', label: '不限' },
              ...regions.map((item) => ({ value: item, label: item })),
            ]}
          />
          <FieldSelect
            id="hero-days"
            label="天數"
            value={days}
            onChange={setDays}
            options={[
              { value: '', label: '不限' },
              ...dayOptions.map((item) => ({
                value: String(item),
                label: `${item} 天`,
              })),
            ]}
          />
          <Button
            type="submit"
            variant="contained"
            className="min-h-14 md:min-w-40"
          >
            搜尋行程
          </Button>
        </div>
        <p className="mt-5">
          <Link
            className="font-bold text-action underline decoration-action/45 underline-offset-4 hover:text-action-hover"
            to="/tours"
          >
            看全部行程
          </Link>
        </p>
      </form>
    </div>
  );
}
```

**解析**

- 地區與天數各用一組 `useState`，預設是空字串，對應選項裡的「不限」。
- 地區與天數選項從行程的 `mock.data.js` 引入，再對成 `{ value, label }`。天數的 `value` 轉成字串，因為 `Select` 的值是字串；畫面標籤寫成「3 天」這種格式。
- 送出時先 `preventDefault`，再用 `URLSearchParams` 組查詢字串。有選到地區或天數才寫進參數，然後導到 `/tours`。真正比對篩選條件是列表頁的工作。
- 「看全部行程」是 `Link`，不帶查詢字串，直接進列表。
- 外層的定位寫在這個元件裡。一般寬度在輪播下方留空隙（`mt-8`）；`lg` 以上改用負邊距（`lg:-mt-20`），搭配 `z-20` 的層級，讓搜尋表單往上疊在輪播底部。

### 步驟 3：輪播

輪播要顯示價格、封面、標題與出團日。先寫價格的貨幣格式 `format.js`，再把空的 `tours` 換成四筆精選，最後把左右切換的 `IconButton` 改成圓形，再換成真正的輪播。

```js 06-project-init/src/format.js
export const ntd = (value) =>
  `NT$${Number(value).toLocaleString('zh-Hant-TW')}`;
```

**解析**

- `ntd` 把數字依台灣地區習慣加上千分位，並在前面寫上 `NT$`。

把空的 `tours` 換成這四筆。後面仍接著已有的地區與天數選項。

```diff 06-project-init/src/features/tours/mock.data.js
-export const tours = [];
+export const tours = [
+  {
+    id: 'taipei-beitou',
+    title: '台北大稻埕與北投溫泉三日',
+    region: '台北',
+    days: 3,
+    price: 18600,
+    cover: 'https://images.unsplash.com/photo-1519320993082-43a535317ddc?auto=format&fit=crop&w=1600&q=80',
+    intro: '第一天沿迪化街走到大稻埕碼頭，第二天北投泡湯，下午不排景點。',
+    departures: [{ id: '2026-12-04', date: '2026-12-04' }],
+    featured: true,
+  },
+  {
+    id: 'hualien-taroko',
+    title: '花蓮太魯閣與七星潭四日',
+    region: '花蓮',
+    days: 4,
+    price: 26800,
+    cover: 'https://images.unsplash.com/photo-1604214896221-b13d964b214a?auto=format&fit=crop&w=1600&q=80',
+    intro: '第一天沿七星潭走路，第二天進太魯閣只排燕子口與九曲洞，下午留白。',
+    departures: [{ id: '2026-12-18', date: '2026-12-18' }],
+    featured: true,
+  },
+  {
+    id: 'taitung-chishang',
+    title: '台東池上與成功海岸三日',
+    region: '台東',
+    days: 3,
+    price: 21400,
+    cover: 'https://images.unsplash.com/photo-1761549849498-8cf23a31329d?auto=format&fit=crop&w=1600&q=80',
+    intro: '第一天在池上騎一段田邊的路，第二天去成功看漁港，不把兩個地方排在同一天。',
+    departures: [{ id: '2027-01-15', date: '2027-01-15' }],
+    featured: true,
+  },
+  {
+    id: 'kyoto-nara',
+    title: '京都嵐山、伏見與奈良五日',
+    region: '京都',
+    days: 5,
+    price: 52800,
+    cover: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
+    intro: '嵐山、伏見、奈良各一天，中間留一天在市內走。四晚不換飯店。',
+    departures: [{ id: '2027-04-06', date: '2027-04-06' }],
+    featured: true,
+  },
+];
 
 export const regions = ['台北', '基隆', '花蓮', '台東', '台南', '高雄', '金門', '京都'];
 
 export const dayOptions = [2, 3, 4, 5];
```

**解析**

- 空的 `tours` 換成這四筆精選（`featured: true`），後面仍接著已有的 `regions` 與 `dayOptions`。
- 每筆的 `departures` 是出團日陣列，輪播取第一個出團日組報名連結；價格由 `ntd` 格式化。

接著把 `IconButton` 改成圓形。

```diff 06-project-init/src/theme.js
 // ...
         outlined: {
           borderColor: tokens.line,
           color: tokens.ink,
           '&:hover': {
             borderColor: tokens.action,
             backgroundColor: tokens.mist,
           },
         },
       },
     },
+    MuiIconButton: {
+      styleOverrides: { root: { borderRadius: 999 } },
+    },
     MuiAppBar: {
 // ...
```

**解析**

- 圓角 `999` 讓按鈕變圓，輪播左右鍵會用到，之後其他 `IconButton` 也會變成圓形。

接著把輪播的 placeholder 換成真正的元件。

```jsx 06-project-init/src/features/home/components/HeroSlider.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '../../../_shared/Icon.jsx';
import { ntd } from '../../../format.js';

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (!count || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return undefined;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % count),
      4500,
    );
    return () => clearInterval(timer);
  }, [count]);

  if (!count) return null;
  const go = (next) => setIndex(((next % count) + count) % count);
  const slide = slides[index % count];
  const bookTo = `/booking?tourId=${slide.id}&departureId=${slide.departures[0].id}`;

  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden lg:h-[70vh]">
      {slides.map((item, itemIndex) => (
        <img
          key={item.id}
          src={item.cover}
          alt={itemIndex === index ? item.title : ''}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${itemIndex === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/55 to-ink/35" />
      <IconButton
        aria-label="上一張"
        onClick={() => go(index - 1)}
        className="absolute top-1/2 left-3 z-20 -translate-y-1/2 bg-white text-ink shadow-card md:left-6"
      >
        <Icon name="chevron_left" />
      </IconButton>
      <IconButton
        aria-label="下一張"
        onClick={() => go(index + 1)}
        className="absolute top-1/2 right-3 z-20 -translate-y-1/2 bg-white text-ink shadow-card md:right-6"
      >
        <Icon name="chevron_right" />
      </IconButton>
      <div className="relative z-10 w-full px-5 pt-24 pb-14 sm:px-8 lg:pb-28 lg:pl-20">
        <p className="font-serif text-3xl">
          <span className="inline-block rounded-full bg-accent text-ink font-bold leading-[1.15] py-[0.12em] px-[0.55em]">
            {ntd(slide.price)}
          </span>
        </p>
        <p className="mt-3 text-base font-medium text-foam">
          {slide.region} · {slide.days} 天
        </p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold text-balance text-white md:text-6xl">
          {slide.title}
        </h1>
        <p className="mt-3 line-clamp-2 h-[2lh] max-w-xl text-base leading-relaxed text-white md:text-lg">
          {slide.intro}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button component={Link} to={bookTo} variant="contained">
            立即報名
          </Button>
          <Button
            component={Link}
            to={`/tours/${slide.id}`}
            variant="contained"
            color="secondary"
          >
            看行程
          </Button>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:bottom-24">
        {slides.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={`顯示${item.title}`}
            onClick={() => go(itemIndex)}
            className={`h-3 w-3 rounded-full ${itemIndex === index ? 'bg-accent' : 'bg-white'}`}
          />
        ))}
      </div>
    </section>
  );
}
```

**解析**

- 輪播只切換圖片的 `opacity`：當前那張是完全不透明，其餘是全透明，圖片都疊在同一層，不會左右滑動整張圖。
- `useEffect` 每 4.5 秒把編號往後加一。系統偏好減少動態時不設這個計時器；元件卸載時清掉 interval，避免畫面消失後還在改狀態。
- `go` 用取餘數包住編號，從最後一張再往後會回到第一張，從第一張再往前會到最後一張。
- 「立即報名」連到報名頁，帶上這筆行程與第一個出團日。「看行程」連到該筆詳情。
- 底部圓點與左右鈕都會呼叫 `go`。當前那張的圓點換成強調色。

### 步驟 4：簡介橫幅

把簡介橫幅的 placeholder 換成真正的元件。

```jsx 06-project-init/src/features/home/components/IntroBanner.jsx
import Typography from '@mui/material/Typography';

export default function IntroBanner() {
  return (
    <section className="mt-12 bg-ink text-white md:mt-20">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Typography
          variant="h2"
          className="text-balance text-4xl leading-snug text-white md:text-5xl"
        >
          <span className="whitespace-nowrap">小團旅行，</span>
          <br />
          <span className="whitespace-nowrap">每天只走一段路。</span>
        </Typography>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foam">
          每團最多 8 人。地名寫清楚，下午留給自己。京都五日不含國際機票。
        </p>
      </div>
    </section>
  );
}
```

**解析**

- 深色底區塊，標題與說明寫在這個元件裡。標題拆成兩行，各包 `whitespace-nowrap`，避免被切開。

### 步驟 5：熱門行程

把熱門行程的 placeholder 換成 `FeaturedTours`，並在 MUI 主題補上卡片與標籤的樣式。真正的行程卡片等到行程列表再換，首頁這裡會一起更新。

```jsx 06-project-init/src/features/home/components/FeaturedTours.jsx
import Typography from '@mui/material/Typography';
import TourCard from '../../tours/components/TourCard.jsx';

export default function FeaturedTours({ tours }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h2">熱門行程</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        這幾趟最常被選走。價格為每人，以新台幣計。
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
```

**解析**

- 標題、導讀與精選卡片的格子都寫在這個元件裡。`tours` 由首頁傳入，已是精選清單。
- 每張卡片仍是步驟 1 的 `TourCard` 標記。等到行程列表換成真正的卡片，首頁這裡會一起更新。

卡片的圓角與陰影、Chip 的配色與刪除圖示，補進主題。

```diff 06-project-init/src/theme.js
 // ...
     MuiIconButton: {
       styleOverrides: { root: { borderRadius: 999 } },
     },
+    MuiCard: {
+      styleOverrides: {
+        root: {
+          borderRadius: 24,
+          boxShadow: '0 10px 28px rgb(31 42 68 / 8%)',
+          backgroundColor: tokens.white,
+          backgroundImage: 'none',
+        },
+      },
+    },
+    MuiChip: {
+      defaultProps: { deleteIcon: ms('cancel') },
+      styleOverrides: {
+        root: { borderRadius: 999, fontWeight: 700 },
+        colorSecondary: { backgroundColor: tokens.accent, color: tokens.ink },
+        colorPrimary: { backgroundColor: tokens.action, color: tokens.white },
+      },
+    },
     MuiAppBar: {
 // ...
```

**解析**

- `MuiCard` 覆寫圓角、陰影與白底，並去掉預設的背景漸層，之後的行程卡片與理由、評價卡片都會套到。
- `MuiChip` 預設的刪除圖示改成圖示字型的 `cancel`，之後可刪除的標籤會用到。次要色用強調色底、主要色用操作色底，讓標籤跟網站色票一致。

### 步驟 6：依主題找路

主題圖是首頁自己的資料，寫在 `features/home/mock.data.js`。

```js 06-project-init/src/features/home/mock.data.js
const shot = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const themeLinks = [
  {
    theme: '城市',
    places: '大稻埕、鹽埕',
    image: shot('1598935898639-81586f7d2129'),
  },
  {
    theme: '海岸',
    places: '北海岸、九份',
    image: shot('1507525428034-b723cf961d3e'),
  },
  {
    theme: '山海',
    places: '花蓮、台東',
    image: shot('1464822759023-fed622ff2c3b'),
  },
  {
    theme: '古都',
    places: '台南府城、安平',
    image: shot('1633228491597-b39f823e0541'),
  },
  {
    theme: '離島',
    places: '金門聚落',
    image: shot('1505118380757-91f5f5632de0'),
  },
  {
    theme: '日本',
    places: '京都、奈良',
    image: shot('1526481280693-3bfa7568e0f3'),
  },
];
```

**解析**

- 每個主題有 `theme` 名稱、`places` 說明與 `image` 圖片網址，供下面的 `ThemeSection` 使用。`shot` 只是把圖片編號組成完整網址。

接著把「依主題找路」的 placeholder 換成真正的元件。

```jsx 06-project-init/src/features/home/components/ThemeSection.jsx
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';
import { themeLinks } from '../mock.data.js';

export default function ThemeSection() {
  return (
    <section className="bg-mist">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Typography variant="h2">依主題找路</Typography>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
          城市、海岸、山海、古都、離島，或飛一趟京都。
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {themeLinks.map((item) => (
            <li key={item.theme}>
              <Link
                to={`/tours?theme=${item.theme}`}
                className="relative flex min-h-52 overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-xl motion-reduce:transition-none"
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="relative mt-auto flex flex-col px-5 py-5 text-white">
                  <span className="font-serif text-3xl font-semibold">
                    {item.theme}
                  </span>
                  <span className="text-foam">{item.places}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

**解析**

- 標題「依主題找路」與導讀寫在這個元件裡。
- 每個主題是連到 `/tours` 的 `Link`，查詢字串帶上 `theme`。
- 圖片鋪滿連結，下方漸層把文字托出來。
- 游標移上去時，整張連結的陰影加深，圖片本身不動；系統偏好減少動態時關掉過渡。

### 步驟 7：為什麼選我們

把三則理由追加進同一份檔。

```diff 06-project-init/src/features/home/mock.data.js
 // ...
     theme: '日本',
     places: '京都、奈良',
     image: shot('1526481280693-3bfa7568e0f3'),
   },
 ];
+
+export const reasons = [
+  {
+    title: '每團 8 人',
+    body: '人數少，嚮導叫得出名字。不會把兩台車的人併成一團。',
+  },
+  {
+    title: '一天不排滿',
+    body: '下午沒有行程。景點之間不靠購物站填時間。',
+  },
+  { title: '住下來', body: '同一趟行程盡量不每天換飯店，行李不必每天收。' },
+];
```

**解析**

- 三則理由追加在 `features/home/mock.data.js`，與主題資料放在同一份檔。

接著把「為什麼選我們」的 placeholder 換成真正的元件。

```jsx 06-project-init/src/features/home/components/ReasonSection.jsx
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Icon from '../../../_shared/Icon.jsx';
import { reasons } from '../mock.data.js';

const icons = ['groups', 'wb_sunny', 'hotel'];

export default function ReasonSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h2">為什麼選我們</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        人少、不排滿、盡量住同一間飯店。
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {reasons.map((item, index) => {
          const iconName = icons[index];
          return (
            <Card key={item.title} className="p-6 md:p-8">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-mist text-action">
                <Icon name={iconName} />
              </span>
              <Typography variant="h3">{item.title}</Typography>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
```

**解析**

- 標題「為什麼選我們」與導讀寫在這個元件裡。
- `icons` 用下標對三則理由，資料不必存圖示名。
- 每則是一張 `Card`，上方圓形底放圖示，再接標題與說明。

### 步驟 8：旅客怎麼說

這一步先補四則評價，再把星星改成圖示字型：實心星加上 `FILL` 1，空心星維持線框。評價資料並入 `mock.data.js`，檔案整理成評價、理由、主題連結的順序，與完成品一致。

```js 06-project-init/src/features/home/mock.data.js
export const reviews = [
  {
    id: 'r1',
    tourId: 'hualien-taroko',
    author: '林可',
    rating: 5,
    body: '太魯閣沒有被排進行程表以外的停靠點。',
  },
  {
    id: 'r2',
    tourId: 'taipei-beitou',
    author: '陳予安',
    rating: 5,
    body: '迪化街走得很慢，嚮導沒有把我們推進店裡。',
  },
  {
    id: 'r3',
    tourId: 'kyoto-nara',
    author: '周以寧',
    rating: 4,
    body: '伏見只排了兩間酒造，下午自己走回到宿。',
  },
  {
    id: 'r4',
    tourId: 'taitung-chishang',
    author: '何品',
    rating: 5,
    body: '池上的田沒有被排成打卡點，成功漁港是傍晚去的。',
  },
];

export const reasons = [
  {
    title: '每團 8 人',
    body: '人數少，嚮導叫得出名字。不會把兩台車的人併成一團。',
  },
  {
    title: '一天不排滿',
    body: '下午沒有行程。景點之間不靠購物站填時間。',
  },
  { title: '住下來', body: '同一趟行程盡量不每天換飯店，行李不必每天收。' },
];

const shot = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const themeLinks = [
  {
    theme: '城市',
    places: '大稻埕、鹽埕',
    image: shot('1598935898639-81586f7d2129'),
  },
  {
    theme: '海岸',
    places: '北海岸、九份',
    image: shot('1507525428034-b723cf961d3e'),
  },
  {
    theme: '山海',
    places: '花蓮、台東',
    image: shot('1464822759023-fed622ff2c3b'),
  },
  {
    theme: '古都',
    places: '台南府城、安平',
    image: shot('1633228491597-b39f823e0541'),
  },
  {
    theme: '離島',
    places: '金門聚落',
    image: shot('1505118380757-91f5f5632de0'),
  },
  {
    theme: '日本',
    places: '京都、奈良',
    image: shot('1526481280693-3bfa7568e0f3'),
  },
];
```

**解析**

- `reviews` 每則有編號、對應行程 `tourId`、作者、分數與內文。`ReviewSection` 稍後用 `tourId` 回查行程標題。
- 這份檔案現在收齊 `reviews`、`reasons`、`themeLinks`。為了和完成品一致，把評價放在最上面，理由與主題卡片跟在後面。

接著把星星換成圖示字型。

```diff 06-project-init/src/theme.js
 // ...
     MuiSelect: {
       defaultProps: { IconComponent: SelectArrow },
     },
+    MuiRating: {
+      defaultProps: {
+        icon: ms('star', { style: { fontVariationSettings: "'FILL' 1" } }),
+        emptyIcon: ms('star'),
+      },
+      styleOverrides: { iconFilled: { color: tokens.action } },
+    },
   },
 // ...
```

**解析**

- 實心與空心都用圖示字型 `star`，實心再加上 `fontVariationSettings` 的 `FILL` 1。
- 寫在 `MuiRating` 的 `defaultProps`，之後的 Rating 都會換成這組。
- `styleOverrides` 把實心星星改成 `action` 綠色：MUI 預設的琥珀色放在白底上只有 1.88:1，看不清楚。

接著把「旅客怎麼說」的 placeholder 換成真正的元件。

```jsx 06-project-init/src/features/home/components/ReviewSection.jsx
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { reviews } from '../mock.data.js';
import { tours } from '../../tours/mock.data.js';

const titleOf = (tourId) =>
  tours.find((tour) => tour.id === tourId)?.title ?? '';

export default function ReviewSection() {
  return (
    <section className="bg-foam">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Typography variant="h2">旅客怎麼說</Typography>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
          出發回來之後，旅客留下的話。
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <Card key={review.id} component="figure" className="p-6 md:p-8">
              <Rating value={review.rating} readOnly />
              <blockquote className="mt-3 max-w-prose leading-relaxed">
                「{review.body}」
              </blockquote>
              <figcaption className="mt-3 text-muted">
                {review.author} · {review.rating} 分 · {titleOf(review.tourId)}
              </figcaption>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**解析**

- 標題「旅客怎麼說」與導讀寫在這個元件裡。
- `titleOf` 用行程編號回查標題，找不到就空字串。
- 每則是 `figure` 卡片：只讀的星星、引言，再用 `figcaption` 列出作者、分數與行程標題。

## 行程列表

列表要八筆，並依網址上的查詢參數篩選、排序。主題、價格區間與排序選項是這一頁才補進 `features/tours/mock.data.js`。

這一節要組出 `ToursPage`。畫面拆成篩選列、沒有結果時的提示，以及首頁已接到的行程卡片，篩選列再用共用的 `FieldSelect`。下面先組出這一頁並接到路由，篩選列先放標記，再補資料、換成真正的篩選列，最後把行程卡片的 placeholder 換成真正的元件。

{% mermaid graph TD %}
  page["ToursPage"] --> filters["TourFilters"]
  page --> card["TourCard"]
  page --> empty["TourEmpty"]
  filters --> field["FieldSelect"]
{% endmermaid %}

### 步驟 1：組出 ToursPage

先把列表頁組起來並接到路由，後面寫篩選列時才能在畫面上對照。篩選列先放標記；價格比對先一律當成符合，步驟 2 再換成區間算法，列表頁才編譯得過。行程的主題欄位也留到步驟 2 補，所以這一步在 `/tours` 看得到標題、「4 筆行程」與四張卡片位置的標記文字。

篩選列先放標記。

```jsx 06-project-init/src/features/tours/components/TourFilters.jsx
export default function TourFilters() {
  return <p className="mt-8">篩選列</p>;
}
```

**解析**

- 先回傳標記文字，標出篩選列的位置。真正的下拉等步驟 3 再換。

沒有符合條件時的空狀態寫成 `TourEmpty`。

```jsx 06-project-init/src/features/tours/components/TourEmpty.jsx
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TourEmpty({ onClear }) {
  return (
    <section className="mt-16 rounded-card bg-foam px-6 py-10 shadow-card">
      <Typography variant="h2">沒有符合的行程</Typography>
      <p className="mt-3 max-w-prose">換一個地區或天數，或清掉價格條件。</p>
      <Button className="mt-6" variant="contained" onClick={onClear}>
        清除條件
      </Button>
    </section>
  );
}
```

**解析**

- 標題、說明與清除條件的按鈕都寫在這個元件裡。按下按鈕時呼叫頁面傳入的 `onClear`。

價格比對先一律當成符合，列表頁才編譯得過。

```diff 06-project-init/src/format.js
 // ...
 export const ntd = (value) =>
   `NT$${Number(value).toLocaleString('zh-Hant-TW')}`;
+
+export const matchPrice = () => true;
```

**解析**

- `matchPrice` 此刻固定回傳 `true`，步驟 2 再依區間換成真正的算法。

接著組出列表頁。

```jsx 06-project-init/src/features/tours/ToursPage.jsx
import { useLoaderData, useSearchParams } from 'react-router';
import Typography from '@mui/material/Typography';
import TourCard from './components/TourCard.jsx';
import TourEmpty from './components/TourEmpty.jsx';
import TourFilters from './components/TourFilters.jsx';
import { matchPrice } from '../../format.js';
import { getTours } from '../../store.js';

export const loader = () => ({ tours: getTours() });

export default function ToursPage() {
  const { tours } = useLoaderData();
  const [params, setParams] = useSearchParams();

  const region = params.get('region') ?? '';
  const days = params.get('days') ?? '';
  const price = params.get('price') ?? '';
  const theme = params.get('theme') ?? '';
  const sort = params.get('sort') || 'price-asc';
  const list = tours.filter(
    (tour) =>
      (!region || tour.region === region) &&
      (!days || String(tour.days) === days) &&
      (!theme || tour.theme === theme) &&
      matchPrice(tour.price, price),
  );
  const rank = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'days-asc': (a, b) => a.days - b.days || a.price - b.price,
  };
  const visible = [...list].sort(rank[sort] || rank['price-asc']);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>行程 · 洛奇旅行</title>
      <Typography variant="h1">行程</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        依地區、天數與預算挑選。價格為每人，以新台幣計。
      </p>
      <TourFilters />
      <div id="tour-list">
        {visible.length ? (
          <>
            <Typography variant="h2" className="mt-10">
              {visible.length} 筆行程
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((tour) => (
                <TourCard key={tour.id} tour={tour} showTheme />
              ))}
            </div>
          </>
        ) : (
          <TourEmpty onClear={() => setParams(new URLSearchParams())} />
        )}
      </div>
    </main>
  );
}
```

**解析**

- 篩選條件都從網址的查詢參數讀；`visible` 在 render 時依地區、天數、主題與 `matchPrice` 濾出行程，再排序。
- 沒寫排序時用價格由低到高。天數由短到長時，天數相同再比價格。
- 有結果時顯示筆數，每張卡片傳 `showTheme`，主題 Chip 才會出現。
- 沒有結果時，改在同一個 `id="tour-list"` 容器裡顯示 `TourEmpty`；清除條件是把查詢參數清空。

接著把 `/tours` 換成這一頁。

```diff 06-project-init/src/App.jsx
 import HomePage, { loader as homeLoader } from './features/home/HomePage.jsx';
+import ToursPage, { loader as toursLoader } from './features/tours/ToursPage.jsx';
 // ...
           { index: true, loader: homeLoader, element: <HomePage /> },
-          { path: 'tours', element: <Placeholder title="行程列表" /> },
+          { path: 'tours', loader: toursLoader, element: <ToursPage /> },
           { path: 'tours/:id', element: <Placeholder title="行程詳情" /> },
```

**解析**

- `/tours` 從 `Placeholder` 換成 `ToursPage`，其他路徑仍用佔位。

### 步驟 2：這一頁要用的資料

列表要能依主題與價格區間篩選，先把缺的欄位、行程與選項補進 `mock.data.js`。

先替已有行程補上 `theme`，再加入其餘四筆行程，湊成八筆。

```diff 06-project-init/src/features/tours/mock.data.js
 // ...
     region: '台北',
+    theme: '城市',
     days: 3,
 // ...
+  {
+    id: 'keelung-jiufen',
+    title: '基隆北海岸與九份兩日',
+    region: '基隆',
+    theme: '海岸',
+    days: 2,
+    price: 9200,
+    cover: 'https://images.unsplash.com/photo-1606833505861-303ed278f7f2?auto=format&fit=crop&w=1600&q=80',
+    intro: '第一天只走北海岸幾個灣澳，第二天九份排上午，下午自己決定要不要再爬階梯。',
+    departures: [{ id: '2026-12-11', date: '2026-12-11' }],
+    featured: false,
+  },
   {
     id: 'hualien-taroko',
 // ...
     region: '花蓮',
+    theme: '山海',
     days: 4,
 // ...
     region: '台東',
+    theme: '山海',
     days: 3,
 // ...
+  {
+    id: 'tainan-anping',
+    title: '台南府城與安平兩日',
+    region: '台南',
+    theme: '古都',
+    days: 2,
+    price: 8800,
+    cover: 'https://images.unsplash.com/photo-1677607223752-aa6ae7e582ae?auto=format&fit=crop&w=1600&q=80',
+    intro: '早上走孔廟與赤崁一帶，下午把時間留給安平，不把小吃排成路線。',
+    departures: [{ id: '2026-11-28', date: '2026-11-28' }],
+    featured: false,
+  },
+  {
+    id: 'kaohsiung-qijin',
+    title: '高雄港都與旗津三日',
+    region: '高雄',
+    theme: '城市',
+    days: 3,
+    price: 14200,
+    cover: 'https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=1600&q=80',
+    intro: '第一天只看駁二與哈瑪星，第二天渡輪去旗津走路，第三天早上再送車站。',
+    departures: [{ id: '2027-01-08', date: '2027-01-08' }],
+    featured: false,
+  },
+  {
+    id: 'kinmen-villages',
+    title: '金門聚落與戰地三日',
+    region: '金門',
+    theme: '離島',
+    days: 3,
+    price: 16800,
+    cover: 'https://images.unsplash.com/photo-1593759057907-b3fd6244741b?auto=format&fit=crop&w=1600&q=80',
+    intro: '第一天金城與模範街，第二天只走一個聚落，戰地景點不連續排滿。',
+    departures: [{ id: '2027-01-22', date: '2027-01-22' }],
+    featured: false,
+  },
   {
     id: 'kyoto-nara',
 // ...
     region: '京都',
+    theme: '日本',
     days: 5,
 // ...
```

**解析**

- 原本四筆各加一個 `theme`，另新增基隆、台南、高雄、金門四筆，每筆都有 `theme`。

再補價格區間與排序的選項。

```diff 06-project-init/src/features/tours/mock.data.js
 // ...
 export const dayOptions = [2, 3, 4, 5];
+
+export const priceBands = [
+  { value: '', label: '不限' },
+  { value: 'lt10000', label: '一萬以下' },
+  { value: '10000-20000', label: '一到兩萬' },
+  { value: '20000-30000', label: '二到三萬' },
+  { value: 'gt30000', label: '三萬以上' },
+];
+
+export const sortOptions = [
+  { value: 'price-asc', label: '價格低到高' },
+  { value: 'price-desc', label: '價格高到低' },
+  { value: 'days-asc', label: '天數短到長' },
+];
+
 // ...
```

**解析**

- `priceBands` 與 `sortOptions` 都是 `{ value, label }` 陣列，寫在同一份 `mock.data.js`，給篩選列的下拉使用。

價格區間怎麼算符合，寫在 `format.js`。

```diff 06-project-init/src/format.js
-export const matchPrice = () => true;
+export const matchPrice = (price, band) => {
+  if (!band) return true;
+  if (band === 'lt10000') return price < 10000;
+  if (band === '10000-20000') return price >= 10000 && price < 20000;
+  if (band === '20000-30000') return price >= 20000 && price < 30000;
+  if (band === 'gt30000') return price >= 30000;
+  return true;
+};
```

**解析**

- 沒有帶區間時直接回傳 `true`，這筆價格算符合。
- `lt10000` 是小於一萬；`10000-20000` 與 `20000-30000` 含下界、不含上界；`gt30000` 是三萬以上。
- 不認得的區間也回傳 `true`。

### 步驟 3：篩選列

把篩選列的 placeholder 換成真正的元件。每個下拉一改，就把該項條件寫進或移出網址，列表會跟著更新。

```jsx 06-project-init/src/features/tours/components/TourFilters.jsx
import { useSearchParams } from 'react-router';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { dayOptions, priceBands, regions, sortOptions } from '../mock.data.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

const regionOptions = [
  { value: '', label: '不限' },
  ...regions.map((item) => ({ value: item, label: item })),
];
const dayChoices = [
  { value: '', label: '不限' },
  ...dayOptions.map((item) => ({ value: String(item), label: `${item} 天` })),
];

export default function TourFilters() {
  const [params, setParams] = useSearchParams();
  const theme = params.get('theme') ?? '';
  const region = params.get('region') ?? '';
  const days = params.get('days') ?? '';
  const price = params.get('price') ?? '';
  const sort = params.get('sort') || 'price-asc';

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || (key === 'sort' && value === 'price-asc')) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next);
  };

  const clear = () => setParams(new URLSearchParams());

  const clearTheme = () => {
    const next = new URLSearchParams(params);
    next.delete('theme');
    setParams(next);
  };

  return (
    <div className="mt-8">
      <div className="grid gap-4 md:grid-cols-4">
        <FieldSelect
          id="region"
          label="地區"
          value={region}
          onChange={(value) => set('region', value)}
          options={regionOptions}
        />
        <FieldSelect
          id="days"
          label="天數"
          value={days}
          onChange={(value) => set('days', value)}
          options={dayChoices}
        />
        <FieldSelect
          id="price"
          label="價格"
          value={price}
          onChange={(value) => set('price', value)}
          options={priceBands}
        />
        <FieldSelect
          id="sort"
          label="排序"
          value={sort}
          onChange={(value) => set('sort', value)}
          options={sortOptions}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" variant="outlined" onClick={clear}>
          清除
        </Button>
      </div>
      {theme ? (
        <Chip
          className="mt-4"
          color="primary"
          label={`主題：${theme}`}
          onDelete={clearTheme}
        />
      ) : null}
    </div>
  );
}
```

**解析**

- 篩選條件放在查詢參數，重新整理還在；四個下拉的目前值都從網址讀出來。
- 沒寫排序時當成 `price-asc`。
- `set` 會從現有的查詢參數複製一份再改。選到值就寫進對應的鍵；選回不限就刪掉該鍵。其他條件維持原樣，網址上已有的 `theme` 也會留著。
- 排序仍是價格低到高時也刪掉 `sort`，網址就不必每筆都帶這個預設值。
- 四個 `FieldSelect` 直向排列，`md` 以上改成四欄（`grid gap-4 md:grid-cols-4`）。
- 「清除」會清空查詢參數，主題也會一起從網址拿掉。有主題時，下方多一顆 Chip，`clearTheme` 只刪掉 `theme`。

### 步驟 4：行程卡片

把步驟 1 留下的行程卡片 placeholder 換成真正的元件。價格後面要標單位，京都那筆還要註明不含國際機票，先把 `perPerson` 補進 `format.js`。

{% note info %}
首頁的熱門行程已經引用行程卡片 `TourCard`，當時先放 placeholder。這一節換成真正的卡片後，首頁也會一起更新。首頁與行程列表都會用到它，但它屬於行程這個功能，所以不必搬到共用資料夾。
{% endnote %}

```diff 06-project-init/src/format.js
 // ...
 export const ntd = (value) =>
   `NT$${Number(value).toLocaleString('zh-Hant-TW')}`;
+
+export const perPerson = (tour) =>
+  tour?.id === 'kyoto-nara' ? '/ 人，不含國際機票' : '/ 人';
```

**解析**

- `perPerson` 回傳價格後面的單位文字。京都那筆另加「不含國際機票」，其他行程只寫「/ 人」。

接著換成真正的行程卡片。

```jsx 06-project-init/src/features/tours/components/TourCard.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ntd, perPerson } from '../../../format.js';

export default function TourCard({ tour, showTheme = false }) {
  return (
    <Card
      component={Link}
      to={`/tours/${tour.id}`}
      className="flex h-full flex-col overflow-hidden text-inherit no-underline transition-shadow duration-300 hover:shadow-xl motion-reduce:transition-none"
    >
      <CardMedia
        component="img"
        image={tour.cover}
        alt=""
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Chip size="small" color="secondary" label={tour.region} />
          {showTheme ? (
            <Chip size="small" variant="outlined" label={tour.theme} />
          ) : null}
          <Chip size="small" variant="outlined" label={`${tour.days} 天`} />
        </div>
        <Typography variant="h3" className="mt-3 text-ink">
          {tour.title}
        </Typography>
        <p className="mt-2 text-base leading-relaxed text-muted">
          {tour.intro}
        </p>
        <p className="mt-auto pt-5 font-serif text-2xl font-bold text-ink">
          {ntd(tour.price)}{' '}
          <span className="font-sans text-base font-normal text-muted">
            {perPerson(tour)}
          </span>
        </p>
        <Button
          component="span"
          variant="contained"
          className="mt-4 w-full"
          tabIndex={-1}
        >
          看詳情
        </Button>
      </div>
    </Card>
  );
}
```

**解析**

- 整張 `Card` 本身就是連到詳情頁的 `Link`，所以內層按鈕寫成 span 並加上 `tabIndex={-1}`，鍵盤只需對卡片聚焦一次，不會再對內層按鈕停一次。
- 封面用 `CardMedia`。游標移上去時，整張卡片的陰影加深，圖片本身不動；系統偏好減少動態時關掉過渡。
- 地區用次要色 Chip，天數用框線 Chip。`showTheme` 預設是 `false`，所以首頁不顯示主題；列表頁傳 `true`，才多一顆主題 Chip。
- 價格用 `ntd` 格式化，後面跟著 `perPerson` 的單位文字。

## 行程詳情

詳情頁補上圖集、亮點、每日行程、費用與每一梯的名額，並用報名種子計算剩餘人數。「立即報名」直接連到 `/booking`，並帶上這筆行程與選到的出發日。

這一節要組出 `TourDetailPage`。先組出這一頁並接到路由，各個畫面區塊先放標記，再補齊行程欄位，最後逐一換成真正的元件。取消與退款直接寫在頁面上，不另拆元件。畫面拆成這些零件：

- `TourHeader`
- `Gallery`
- `TourHighlights`
- `Itinerary`
- `FareBox`
- `MobileDepartures`
- `DepartureList`
- `BookingCard`
- `MobileBookingBar`

```
src/features/tours/
├── ToursPage.jsx
├── TourDetailPage.jsx
├── mock.data.js
└── components/
    ├── TourCard.jsx
    ├── TourEmpty.jsx
    ├── TourFilters.jsx
    ├── TourHeader.jsx
    ├── Gallery.jsx
    ├── TourHighlights.jsx
    ├── Itinerary.jsx
    ├── FareBox.jsx
    ├── DepartureList.jsx
    ├── MobileDepartures.jsx
    ├── BookingCard.jsx
    └── MobileBookingBar.jsx
```

{% mermaid graph TD %}
  page["TourDetailPage"] --> header["TourHeader"]
  page --> gallery["Gallery"]
  page --> highlights["TourHighlights"]
  page --> itinerary["Itinerary"]
  page --> fare["FareBox"]
  page --> mobileDep["MobileDepartures"]
  page --> card["BookingCard"]
  page --> bar["MobileBookingBar"]
  mobileDep --> list["DepartureList"]
{% endmermaid %}

### 步驟 1：組出 TourDetailPage

先把詳情頁組起來並接到路由，後面換零件時才能在畫面上對照。頁首、圖集、亮點、每日行程、費用說明、出發日、報名卡片與底部報名列先放標記。另外多一個出發梯次列表的標記，等出發日區塊換成真正的元件時才會用到。

頁首先放標記。

```jsx 06-project-init/src/features/tours/components/TourHeader.jsx
export default function TourHeader() {
  return <p>頁首</p>;
}
```

**解析**

- 先回傳標記文字，標出詳情頁頁首的位置。

圖集先放標記。

```jsx 06-project-init/src/features/tours/components/Gallery.jsx
export default function Gallery() {
  return <p className="mt-8">圖集</p>;
}
```

**解析**

- 先回傳標記文字，標出圖集的位置。

亮點先放標記。

```jsx 06-project-init/src/features/tours/components/TourHighlights.jsx
export default function TourHighlights() {
  return <div className="mt-8">亮點</div>;
}
```

**解析**

- 先回傳標記文字，標出亮點列表的位置。

每日行程先放標記。

```jsx 06-project-init/src/features/tours/components/Itinerary.jsx
export default function Itinerary() {
  return <div className="mt-14">每日行程</div>;
}
```

**解析**

- 先回傳標記文字，標出每日行程的位置。

費用說明先放標記。

```jsx 06-project-init/src/features/tours/components/FareBox.jsx
export default function FareBox() {
  return <div className="mt-14">費用說明</div>;
}
```

**解析**

- 先回傳標記文字，標出費用包含與不含的位置。

出發日先放標記。

```jsx 06-project-init/src/features/tours/components/DepartureList.jsx
export default function DepartureList() {
  return <p className="mt-4">出團梯次</p>;
}
```

**解析**

- 先回傳標記文字，標出出發梯次列表的位置。目前沒有任何元件引用它，所以畫面上還看不到。

手機出發日先放標記。

```jsx 06-project-init/src/features/tours/components/MobileDepartures.jsx
export default function MobileDepartures() {
  return <div className="mt-14 lg:hidden">出發日</div>;
}
```

**解析**

- 先回傳標記文字，標出窄螢幕出發日的位置。

報名卡片先放標記。

```jsx 06-project-init/src/features/tours/components/BookingCard.jsx
export default function BookingCard() {
  return <aside className="mt-12 hidden lg:mt-0 lg:block">報名卡片</aside>;
}
```

**解析**

- 先回傳標記文字，標出右側報名卡的位置。

底部報名列先放標記。

```jsx 06-project-init/src/features/tours/components/MobileBookingBar.jsx
export default function MobileBookingBar() {
  return <div className="fixed inset-x-0 bottom-0 lg:hidden">底部報名列</div>;
}
```

**解析**

- 先回傳標記文字，標出窄螢幕底部報名列的位置。

之後的亮點元件會對 `highlights` 做 `map`，所以每一筆行程先在 `featured` 欄位前補上 `highlights: []`，八筆都要補。下一步整檔換成有圖集與每日行程的版本時，這行會被蓋掉。

```diff 06-project-init/src/features/tours/mock.data.js
     departures: [{ id: '2026-12-04', date: '2026-12-04' }],
+    highlights: [],
     featured: true,
```

**解析**

- 每筆行程先補上空的 `highlights`，之後亮點元件對它做 `map` 時才不會出錯。下一步會換成完整內容。

報名種子先留空。

```js 06-project-init/src/features/booking/mock.data.js
export const bookings = [];
```

**解析**

- 種子目前是空陣列，下一步換成四筆。`store.js` 會讀這份檔當起始資料，詳情頁只讀它、不寫入。

剩餘名額先固定回 0，下一節換成真正的算法。

```diff 06-project-init/src/format.js
 // ...
 export const perPerson = (tour) =>
   tour?.id === 'kyoto-nara' ? '/ 人，不含國際機票' : '/ 人';
+
+export const seatsLeft = () => 0;
```

**解析**

- `seatsLeft` 此刻固定回傳 0，讓後面引用它的元件先能運作。下一步再依報名人數換成真正的算法。

接著把各個畫面區塊組進詳情頁，它們目前都是標記。對不到行程時，`loader` 丟出 404，由稍早接到路由的 `RouteErrorPage` 處理。組好後把路由表裡的詳情佔位換掉。

```jsx 06-project-init/src/features/tours/TourDetailPage.jsx
import { useState } from 'react';
import { data, useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingCard from './components/BookingCard.jsx';
import FareBox from './components/FareBox.jsx';
import Gallery from './components/Gallery.jsx';
import Itinerary from './components/Itinerary.jsx';
import MobileBookingBar from './components/MobileBookingBar.jsx';
import MobileDepartures from './components/MobileDepartures.jsx';
import TourHeader from './components/TourHeader.jsx';
import TourHighlights from './components/TourHighlights.jsx';
import { getBookings, getTour } from '../../store.js';

export const loader = ({ params }) => {
  const tour = getTour(params.id);
  if (!tour) throw data('找不到頁面', { status: 404 });
  return { tour, bookings: getBookings() };
};

export default function TourDetailPage() {
  const { tour, bookings } = useLoaderData();
  const [departureId, setDepartureId] = useState(tour.departures[0]?.id ?? '');

  const selected =
    tour.departures.find((item) => item.id === departureId) ??
    tour.departures[0];
  const bookTo = `/booking?tourId=${tour.id}&departureId=${selected.id}`;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 pb-28 sm:px-6 md:py-24 lg:pb-24">
      <title>{`${tour.title} · 洛奇旅行`}</title>
      <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(20rem,24rem)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <TourHeader tour={tour} />
          <Gallery images={tour.images} title={tour.title} />
          <TourHighlights intro={tour.intro} highlights={tour.highlights} />
          <Itinerary days={tour.itinerary} />
          <FareBox includes={tour.includes} excludes={tour.excludes} />
          <MobileDepartures tour={tour} bookings={bookings} />
          <Typography variant="h2" className="mt-14">
            取消與退款
          </Typography>
          <p className="mt-3 text-base leading-relaxed text-muted">
            出團前以 email
            確認。未成行全額退回。成行後若要改期，請來信或來電，由我們為你調整。常見問題也寫在關於頁。
          </p>
        </div>
        <BookingCard
          tour={tour}
          bookings={bookings}
          selected={selected}
          onSelect={setDepartureId}
          bookTo={bookTo}
        />
      </div>
      <MobileBookingBar price={tour.price} bookTo={bookTo} />
    </main>
  );
}
```

**解析**

- `loader` 用網址上的 `id` 呼叫 `getTour`，頁面用 `useLoaderData` 讀行程。分頁標題用行程名稱。選中的梯次預設第一筆。
- 對不到行程時 `throw data('找不到頁面', { status: 404 })`。錯誤停在沒有 path 的那一層，由錯誤頁畫出找不到頁面，頁首與頁尾留著。說明見[找不到頁面](#找不到頁面)。
- 左欄依序組上頁首、圖集、亮點、每日行程、費用與出發日，取消與退款的標題與文字直接寫在這一頁。
- 寬螢幕分成兩欄，右欄是報名卡片；窄螢幕則另外固定一條底部報名列。目前兩者都只是標記，換成真正的元件後，報名卡片才會用 `sticky` 停在離頂一段的位置。
- `bookTo` 是 `/booking` 加上查詢參數 `tourId`（這筆行程的 `id`）與 `departureId`（選到的梯次）。這一頁先算好選中的梯次與 `bookTo`，再傳給報名卡片與底部報名列，兩處的「立即報名」都連到它。

接著把詳情路徑換上。

```diff 06-project-init/src/App.jsx
 import ToursPage, { loader as toursLoader } from './features/tours/ToursPage.jsx';
+import TourDetailPage, { loader as tourLoader } from './features/tours/TourDetailPage.jsx';
 // ...
           { path: 'tours', loader: toursLoader, element: <ToursPage /> },
-          { path: 'tours/:id', element: <Placeholder title="行程詳情" /> },
+          { path: 'tours/:id', loader: tourLoader, element: <TourDetailPage /> },
           { path: 'booking', element: <Placeholder title="報名" /> },
```

**解析**

- `/tours/:id` 換成 `TourDetailPage`，並掛上 `loader`。其餘仍是佔位。

### 步驟 2：這一頁要用的資料

上一步為了讓詳情頁先畫出來，亮點先是空陣列，報名種子先是空陣列，剩餘名額先固定回 0。這一節換成完整內容。八筆都要補上同一組欄位，diff 不會比整檔短，這裡直接換成這一步的 `features/tours/mock.data.js`。

```js 06-project-init/src/features/tours/mock.data.js
const shot = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

const stay = (nights, ride, tickets) => [nights, ride, tickets];

export const tours = [
  {
    id: 'taipei-beitou',
    title: '台北大稻埕與北投溫泉三日',
    region: '台北',
    theme: '城市',
    days: 3,
    price: 18600,
    cover: shot('1519320993082-43a535317ddc'),
    images: [
      shot('1519320993082-43a535317ddc'),
      shot('1613954100945-fb1a8a1ee41f'),
      shot('1470004914212-05527e49370b'),
    ],
    intro: '第一天沿迪化街走到大稻埕碼頭，第二天北投泡湯，下午不排景點。',
    highlights: [
      '每團 8 人',
      '迪化街只走路，不進購物站',
      '兩晚都住北投，不換飯店',
    ],
    itinerary: [
      {
        day: 1,
        title: '大稻埕',
        body: '下午從迪化街走到大稻埕碼頭。晚上住北投。',
      },
      { day: 2, title: '北投', body: '上午泡湯，下午不排景點。' },
      { day: 3, title: '返程', body: '早餐後送到捷運站。' },
    ],
    includes: stay('2 晚住宿', '當地車資與司機嚮導', '行程表所列門票'),
    excludes: ['往返台北的交通', '午餐與個人消費'],
    departures: [
      { id: '2026-12-04', date: '2026-12-04', capacity: 8 },
      { id: '2027-02-19', date: '2027-02-19', capacity: 8 },
    ],
    featured: true,
  },
  {
    id: 'keelung-jiufen',
    title: '基隆北海岸與九份兩日',
    region: '基隆',
    theme: '海岸',
    days: 2,
    price: 9200,
    cover: shot('1606833505861-303ed278f7f2'),
    images: [
      shot('1606833505861-303ed278f7f2'),
      shot('1677628987592-c3ad2f546fef'),
      shot('1476673160081-cf065607f449'),
    ],
    intro:
      '第一天只走北海岸幾個灣澳，第二天九份排上午，下午自己決定要不要再爬階梯。',
    highlights: ['每團 8 人', '北海岸與九份分開兩天', '不住在九份老街裡'],
    itinerary: [
      { day: 1, title: '北海岸', body: '只停幾個灣澳，傍晚回到基隆住。' },
      {
        day: 2,
        title: '九份',
        body: '上午上九份。下午自己決定要不要再走，傍晚送車站。',
      },
    ],
    includes: stay('1 晚住宿', '當地車資與司機嚮導', '行程表所列門票'),
    excludes: ['往返基隆的交通', '午餐與個人消費'],
    departures: [
      { id: '2026-12-11', date: '2026-12-11', capacity: 8 },
      { id: '2027-03-05', date: '2027-03-05', capacity: 8 },
    ],
    featured: false,
  },
  {
    id: 'hualien-taroko',
    title: '花蓮太魯閣與七星潭四日',
    region: '花蓮',
    theme: '山海',
    days: 4,
    price: 26800,
    cover: shot('1604214896221-b13d964b214a'),
    images: [
      shot('1604214896221-b13d964b214a'),
      shot('1433086966358-54859d0ed716'),
      shot('1559827260-dc66d52bef19'),
    ],
    intro: '第一天沿七星潭走路，第二天進太魯閣只排燕子口與九曲洞，下午留白。',
    highlights: ['每團 8 人', '太魯閣一日只走兩個步道', '住壽豐，不每天換飯店'],
    itinerary: [
      {
        day: 1,
        title: '抵達花蓮',
        body: '下午到花蓮，走七星潭海岸步道。晚上住壽豐。',
      },
      {
        day: 2,
        title: '太魯閣',
        body: '燕子口、九曲洞，不進錐麓古道。下午留白。',
      },
      { day: 3, title: '壽豐與海岸', body: '上午在地市場，下午自由行動。' },
      { day: 4, title: '返程', body: '早餐後送往花蓮火車站。' },
    ],
    includes: ['3 晚住宿', '4 人座與司機嚮導', '行程表所列門票'],
    excludes: ['往返花蓮的交通', '午餐與個人消費'],
    departures: [
      { id: '2026-12-18', date: '2026-12-18', capacity: 8 },
      { id: '2027-03-12', date: '2027-03-12', capacity: 8 },
    ],
    featured: true,
  },
  {
    id: 'taitung-chishang',
    title: '台東池上與成功海岸三日',
    region: '台東',
    theme: '山海',
    days: 3,
    price: 21400,
    cover: shot('1761549849498-8cf23a31329d'),
    images: [
      shot('1761549849498-8cf23a31329d'),
      shot('1500382017468-9049fed747ef'),
      shot('1471922694854-ff1b63b20054'),
    ],
    intro:
      '第一天在池上騎一段田邊的路，第二天去成功看漁港，不把兩個地方排在同一天。',
    highlights: ['每團 8 人', '池上與成功分開兩天', '兩晚都住池上'],
    itinerary: [
      { day: 1, title: '池上', body: '下午騎一段田邊的路。晚上住池上。' },
      { day: 2, title: '成功', body: '傍晚去成功漁港，不把田和海排在同一天。' },
      { day: 3, title: '返程', body: '早餐後送往台東火車站。' },
    ],
    includes: stay('2 晚住宿', '當地車資與司機嚮導', '行程表所列門票與單車'),
    excludes: ['往返台東的交通', '午餐與個人消費'],
    departures: [
      { id: '2027-01-15', date: '2027-01-15', capacity: 8 },
      { id: '2027-04-02', date: '2027-04-02', capacity: 8 },
    ],
    featured: true,
  },
  {
    id: 'tainan-anping',
    title: '台南府城與安平兩日',
    region: '台南',
    theme: '古都',
    days: 2,
    price: 8800,
    cover: shot('1677607223752-aa6ae7e582ae'),
    images: [
      shot('1677607223752-aa6ae7e582ae'),
      shot('1528183429752-a97d0bf99b5a'),
      shot('1552465011-b4e21bf6e79a'),
    ],
    intro: '早上走孔廟與赤崁一帶，下午把時間留給安平，不把小吃排成路線。',
    highlights: ['每團 8 人', '小吃不排成路線', '一晚住府城'],
    itinerary: [
      { day: 1, title: '府城', body: '早上走孔廟與赤崁一帶。晚上住府城。' },
      { day: 2, title: '安平', body: '下午把時間留給安平，傍晚送車站。' },
    ],
    includes: stay('1 晚住宿', '當地車資與司機嚮導', '行程表所列門票'),
    excludes: ['往返台南的交通', '午餐、小吃與個人消費'],
    departures: [
      { id: '2026-11-28', date: '2026-11-28', capacity: 8 },
      { id: '2027-02-26', date: '2027-02-26', capacity: 8 },
    ],
    featured: false,
  },
  {
    id: 'kaohsiung-qijin',
    title: '高雄港都與旗津三日',
    region: '高雄',
    theme: '城市',
    days: 3,
    price: 14200,
    cover: shot('1496564203457-11bb12075d90'),
    images: [
      shot('1496564203457-11bb12075d90'),
      shot('1621848296279-7751546e9acc'),
      shot('1650039871209-8cbaa62f0821'),
    ],
    intro: '第一天只看駁二與哈瑪星，第二天渡輪去旗津走路，第三天早上再送車站。',
    highlights: ['每團 8 人', '駁二與旗津分開', '兩晚都住鹽埕'],
    itinerary: [
      { day: 1, title: '駁二與哈瑪星', body: '只看駁二與哈瑪星。晚上住鹽埕。' },
      { day: 2, title: '旗津', body: '渡輪去旗津走路，下午留白。' },
      { day: 3, title: '返程', body: '早上送車站。' },
    ],
    includes: stay('2 晚住宿', '當地車資、渡輪與司機嚮導', '行程表所列門票'),
    excludes: ['往返高雄的交通', '午餐與個人消費'],
    departures: [
      { id: '2027-01-08', date: '2027-01-08', capacity: 8 },
      { id: '2027-03-19', date: '2027-03-19', capacity: 8 },
    ],
    featured: false,
  },
  {
    id: 'kinmen-villages',
    title: '金門聚落與戰地三日',
    region: '金門',
    theme: '離島',
    days: 3,
    price: 16800,
    cover: shot('1593759057907-b3fd6244741b'),
    images: [
      shot('1593759057907-b3fd6244741b'),
      shot('1510414842594-a61c69b5ae57'),
      shot('1475924156734-496f6cac6ec1'),
    ],
    intro: '第一天金城與模範街，第二天只走一個聚落，戰地景點不連續排滿。',
    highlights: ['每團 8 人', '戰地景點不連續排滿', '兩晚都住金城'],
    itinerary: [
      { day: 1, title: '金城', body: '下午走模範街。晚上住金城。' },
      { day: 2, title: '一個聚落', body: '只走一個聚落，戰地景點不接著排。' },
      { day: 3, title: '返程', body: '早餐後送往機場。機票不含在團費。' },
    ],
    includes: stay('2 晚住宿', '島上車資與司機嚮導', '行程表所列門票'),
    excludes: ['往返金門的機票', '午餐與個人消費'],
    departures: [
      { id: '2027-01-22', date: '2027-01-22', capacity: 8 },
      { id: '2027-04-16', date: '2027-04-16', capacity: 8 },
    ],
    featured: false,
  },
  {
    id: 'kyoto-nara',
    title: '京都嵐山、伏見與奈良五日',
    region: '京都',
    theme: '日本',
    days: 5,
    price: 52800,
    cover: shot('1493976040374-85c8e12f0c0e'),
    images: [
      shot('1493976040374-85c8e12f0c0e'),
      shot('1478436127897-769e1b3f0f36'),
      shot('1632923754832-60642c12a7ed'),
    ],
    intro: '嵐山、伏見、奈良各一天，中間留一天在市內走。四晚不換飯店。',
    highlights: ['每團 8 人', '四晚不換飯店', '不含國際機票'],
    itinerary: [
      {
        day: 1,
        title: '抵達京都',
        body: '下午在飯店附近走路。四晚都住同一間。',
      },
      { day: 2, title: '嵐山', body: '嵐山走一天，傍晚回宿。' },
      { day: 3, title: '市內', body: '這天不排景點，自己走。' },
      { day: 4, title: '伏見', body: '只排兩間酒造，下午自己走回宿。' },
      {
        day: 5,
        title: '奈良與返程',
        body: '上午奈良，下午自行前往機場。國際機票不含。',
      },
    ],
    includes: ['4 晚住宿', '當地嚮導', '行程表列出的交通與門票'],
    excludes: ['國際機票', '新幹線以外你自己加的交通', '午餐與個人消費'],
    departures: [
      { id: '2027-04-06', date: '2027-04-06', capacity: 8 },
      { id: '2027-11-02', date: '2027-11-02', capacity: 8 },
    ],
    featured: true,
  },
];

export const regions = [
  '台北',
  '基隆',
  '花蓮',
  '台東',
  '台南',
  '高雄',
  '金門',
  '京都',
];

export const dayOptions = [2, 3, 4, 5];

export const priceBands = [
  { value: '', label: '不限' },
  { value: 'lt10000', label: '一萬以下' },
  { value: '10000-20000', label: '一到兩萬' },
  { value: '20000-30000', label: '二到三萬' },
  { value: 'gt30000', label: '三萬以上' },
];

export const sortOptions = [
  { value: 'price-asc', label: '價格低到高' },
  { value: 'price-desc', label: '價格高到低' },
  { value: 'days-asc', label: '天數短到長' },
];
```

**解析**

- 八筆行程補上圖集、亮點、每日行程、費用與出發梯次，這份是這一步的完整檔。
- `images` 給圖集，`intro` 與 `highlights` 給亮點，`itinerary` 給每日行程，`includes` 與 `excludes` 給費用說明，`departures` 給出發日與報名卡片。
- 每一梯多了 `capacity`，是 `seatsLeft` 計算剩餘名額的上限。
- `shot` 把 Unsplash 的圖片編號組成網址，`stay` 只是把三項費用收成陣列，讓多筆行程少寫重複的字。

把上一步的空陣列換成這四筆。

```js 06-project-init/src/features/booking/mock.data.js
/** 後台清單。姓名與「我的報名」範例不一致，兩頁各自照靜態模板。 */
export const bookings = [
  {
    id: 'b1',
    tourId: 'hualien-taroko',
    tourTitle: '花蓮太魯閣與七星潭四日',
    departureId: '2026-12-18',
    date: '2026-12-18',
    people: 2,
    name: '林可',
    email: 'lin@example.com',
    phone: '0912000111',
    subtotal: 53600,
    uid: 'demo-lin',
    status: 'pending',
  },
  {
    id: 'b2',
    tourId: 'kyoto-nara',
    tourTitle: '京都嵐山、伏見與奈良五日',
    departureId: '2027-04-06',
    date: '2027-04-06',
    people: 1,
    name: '陳予安',
    email: 'chen@example.com',
    phone: '0912000222',
    subtotal: 52800,
    uid: 'demo-chen',
    status: 'confirmed',
  },
  {
    id: 'b3',
    tourId: 'tainan-anping',
    tourTitle: '台南府城與安平兩日',
    departureId: '2026-11-28',
    date: '2026-11-28',
    people: 3,
    name: '周以寧',
    email: 'chou@example.com',
    phone: '0912000333',
    subtotal: 26400,
    uid: 'demo-chou',
    status: 'cancelled',
  },
  {
    id: 'b4',
    tourId: 'taipei-beitou',
    tourTitle: '台北大稻埕與北投溫泉三日',
    departureId: '2026-12-04',
    date: '2026-12-04',
    people: 2,
    name: '何品',
    email: 'ho@example.com',
    phone: '0912000444',
    subtotal: 37200,
    uid: 'demo-ho',
    status: 'confirmed',
  },
];
```

**解析**

- 報名種子換成四筆，狀態有待確認、已確認與已取消，詳情頁才算得出各梯的剩餘人數。

接著把剩餘名額換成真正的算法。

```diff 06-project-init/src/format.js
-export const seatsLeft = () => 0;
+export const seatsLeft = (bookings, tourId, departure) =>
+  Math.max(
+    0,
+    departure.capacity -
+      bookings
+        .filter(
+          (item) =>
+            item.tourId === tourId &&
+            item.departureId === departure.id &&
+            item.status !== 'cancelled',
+        )
+        .reduce((sum, item) => sum + Number(item.people), 0),
+  );
```

**解析**

- `seatsLeft` 用該梯 `capacity` 減去同一行程、同一梯、狀態不是 `cancelled` 的人數加總，所以待確認的報名也先佔名額。
- `Math.max(0, …)` 讓結果不會小於 0。人數先用 `Number` 轉成數字再加。
- 換上後可在詳情頁對照：台北大稻埕那團 12 月 4 日一梯剩餘 6 人，台南那團 11 月 28 日一梯因為唯一的報名已取消，仍是 8 人。

### 步驟 3：頁首

把頁首的標記換成真正的元件。這裡放回列表的連結、地區與主題標籤、標題，以及只在窄螢幕出現的價格。

```jsx 06-project-init/src/features/tours/components/TourHeader.jsx
import { Link } from 'react-router';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';

export default function TourHeader({ tour }) {
  return (
    <>
      <p>
        <Link
          className="font-bold text-action underline decoration-action/45 underline-offset-4 hover:text-action-hover"
          to="/tours"
        >
          回行程列表
        </Link>
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip color="secondary" label={tour.region} />
        <Chip variant="outlined" label={tour.theme} />
        <Chip variant="outlined" label={`${tour.days} 天`} />
      </div>
      <Typography variant="h1" className="mt-4">
        {tour.title}
      </Typography>
      <p className="mt-4 font-serif text-4xl font-bold text-ink lg:hidden">
        {ntd(tour.price)}
        <span className="font-sans text-base font-normal text-muted">
          {' '}
          / 人
        </span>
      </p>
    </>
  );
}
```

**解析**

- 連結回到 `/tours`。三個標籤分別是地區、主題與天數。地區用填色，另外兩個用外框。
- 標題是這筆行程的名稱。價格只在 `lg` 以下顯示，後面加「/ 人」；寬螢幕的價格改寫在右側報名卡片。

### 步驟 4：圖集

把圖集的標記換成真正的元件。圖集用一張大圖加一排縮圖，點縮圖就換大圖。

```jsx 06-project-init/src/features/tours/components/Gallery.jsx
import { useState } from 'react';

export default function Gallery({ images, title }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div className="mt-8">
      <img
        className="aspect-[3/2] w-full rounded-card object-cover shadow-card"
        src={current}
        width="1200"
        height="800"
        alt={title}
      />
      <div className="mt-3 flex gap-3 overflow-x-auto p-1">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            aria-label={`顯示${title}第 ${index + 1} 張`}
            onClick={() => setActive(index)}
            disabled={index === active}
            className="h-20 w-28 shrink-0 opacity-60 disabled:opacity-100"
          >
            <img
              className="h-full w-full rounded-2xl object-cover"
              src={src}
              alt=""
              width="160"
              height="106"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
```

**解析**

- `active` 記住目前大圖的索引。沒有圖片時回傳 `null`，不畫任何東西。
- 大圖的 `alt` 用行程名稱，縮圖的 `alt` 留空，改由按鈕的 `aria-label` 說明。
- 點一張縮圖就換成大圖。縮圖預設調暗成 `opacity-60`，目前那張設為 `disabled`（已經在看，不必再按），由 `disabled:opacity-100` 恢復全亮，看得出正在顯示哪一張。
- 縮圖列超出寬度時可以橫向捲動。

### 步驟 5：亮點

把亮點的標記換成真正的元件。介紹段落與亮點列表寫在一起。

```jsx 06-project-init/src/features/tours/components/TourHighlights.jsx
import Typography from '@mui/material/Typography';

export default function TourHighlights({ intro, highlights }) {
  return (
    <>
      <p className="mt-8 text-lg leading-relaxed">{intro}</p>
      <Typography variant="h2" className="mt-14">
        亮點
      </Typography>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {highlights.map((item) => (
          <li key={item} className="rounded-card bg-mist px-5 py-4 text-base">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
```

**解析**

- 介紹是一段字級較大的正文，接在圖集後面。
- 「亮點」標題下面用網格列出每一則，`sm` 以上三欄並排，更窄的螢幕改成上下排，每一則鋪上 `mist` 底。

### 步驟 6：每日行程

把每日行程的標記換成真正的元件。每一天收成一組手風琴（點標題展開內容的區塊），一次只展開一則。

先把手風琴的圓角、邊線與展開圖示補進主題，展開圖示沿用前面的 `ms`。

```diff 06-project-init/src/theme.js
 // ...
         root: {
           borderRadius: 24,
           boxShadow: '0 10px 28px rgb(31 42 68 / 8%)',
           backgroundColor: tokens.white,
           backgroundImage: 'none',
         },
       },
     },
+    MuiAccordion: {
+      styleOverrides: {
+        root: {
+          borderRadius: 24,
+          boxShadow: 'none',
+          border: `1px solid ${tokens.line}`,
+          backgroundColor: tokens.white,
+          '&:before': { display: 'none' },
+          '&.Mui-expanded': { margin: 0 },
+          '&:first-of-type, &:last-of-type': { borderRadius: 24 },
+        },
+      },
+    },
+    MuiAccordionSummary: {
+      defaultProps: { expandIcon: ms('expand_more') },
+      styleOverrides: {
+        root: {
+          minHeight: 56,
+          paddingInline: 20,
+          '&.Mui-expanded': { minHeight: 56 },
+        },
+      },
+    },
     MuiChip: {
 // ...
```

**解析**

- `MuiAccordion` 覆寫圓角、白底與邊線，並去掉陰影。展開時不再往外推 margin，第一個與最後一個維持同樣圓角。
- `MuiAccordionSummary` 的展開圖示沿用 `ms('expand_more')`。摘要列的最小高度與左右留白寫在 `styleOverrides`。
- 關於頁的常見問題會沿用同一組手風琴。

接著換成真正的每日行程元件。摘要列寫出第幾天與當天標題，收合時仍看得到這一天在做什麼。

```jsx 06-project-init/src/features/tours/components/Itinerary.jsx
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

export default function Itinerary({ days }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <Typography variant="h2" className="mt-14">
        每日行程
      </Typography>
      <p className="mt-3 text-base text-muted">
        展開每一天，看當天去哪裡、晚上住哪裡。
      </p>
      <div className="mt-5">
        {days.map((item) => (
          <Accordion
            key={item.day}
            expanded={open === item.day}
            onChange={(_, expanded) => setOpen(expanded ? item.day : null)}
            className="mb-2"
          >
            <AccordionSummary>
              第 {item.day} 天 · {item.title}
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-base leading-relaxed text-muted">
                {item.body}
              </p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
}
```

**解析**

- 「每日行程」標題與下面那行說明寫在這個元件裡，詳情頁不再另外放標題。
- `open` 記目前展開的天數。再開另一天時，前一則會合上。
- 摘要列寫「第 N 天 · 標題」，展開後的內容是當天說明。外觀套用剛剛寫進主題的手風琴覆寫。

### 步驟 7：費用說明

把費用說明的標記換成真正的元件。費用包含與不含各成一欄，兩欄的標題寫在元件裡，詳情頁不必再加標題。

```jsx 06-project-init/src/features/tours/components/FareBox.jsx
import Typography from '@mui/material/Typography';

const Column = ({ title, items }) => (
  <section>
    <Typography variant="h3">{title}</Typography>
    <ul className="mt-4 list-disc pl-5 leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
);

export default function FareBox({ includes, excludes }) {
  return (
    <div className="rounded-card bg-white shadow-card mt-14 grid gap-8 p-6 sm:grid-cols-2 md:gap-12 md:p-8">
      <Column title="費用包含" items={includes} />
      <Column title="費用不含" items={excludes} />
    </div>
  );
}
```

**解析**

- `Column` 把標題與條列收成一欄。兩欄在窄螢幕上下排，`sm` 以上並排。
- 外框自帶 `mt-14`，與上方區塊的間距由元件自己處理。

### 步驟 8：出團梯次

把出團梯次的標記換成真正的元件。每一梯列出日期與剩餘名額，按鈕直接連到報名頁。這個元件要等下一步的出發日區塊引用後，畫面上才看得到。

```jsx 06-project-init/src/features/tours/components/DepartureList.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import { seatsLeft } from '../../../format.js';

export default function DepartureList({ tour, bookings }) {
  return (
    <ul className="rounded-card bg-white shadow-card mt-4 max-w-3xl divide-y divide-line overflow-hidden px-5">
      {tour.departures.map((departure) => {
        const left = seatsLeft(bookings, tour.id, departure);
        return (
          <li
            key={departure.id}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{departure.date}</p>
              <p className="text-muted">
                名額 {departure.capacity} 人，剩餘 {left} 人
              </p>
            </div>
            <Button
              component={Link}
              to={`/booking?tourId=${tour.id}&departureId=${departure.id}`}
              variant="contained"
              className="w-full sm:w-auto"
            >
              立即報名
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
```

**解析**

- 每一梯用 `seatsLeft` 算出剩餘人數，畫面上寫名額與剩餘。
- 按鈕連到 `/booking`，查詢參數是這筆行程的 `tourId` 與這一梯的 `departureId`。

### 步驟 9：出發日

把窄螢幕的出發日標記換成真正的元件。標題與說明寫在這裡，列表沿用剛剛的 `DepartureList`。縮到 `lg` 以下就能在每日行程與費用說明之後看到它。

```jsx 06-project-init/src/features/tours/components/MobileDepartures.jsx
import Typography from '@mui/material/Typography';
import DepartureList from './DepartureList.jsx';
import { seatsLeft } from '../../../format.js';

export default function MobileDepartures({ tour, bookings }) {
  return (
    <div className="mt-14 lg:hidden">
      <Typography variant="h2">出發日</Typography>
      <p className="mt-3 text-base text-muted">
        最近一梯 {tour.departures[0].date} 尚餘{' '}
        {seatsLeft(bookings, tour.id, tour.departures[0])} 人。
      </p>
      <DepartureList tour={tour} bookings={bookings} />
    </div>
  );
}
```

**解析**

- 這個區塊只在 `lg` 以下出現，寬螢幕改在右側報名卡片選出發日。
- 說明寫出第一梯的日期與剩餘人數。下面沿用 `DepartureList`，把 `tour` 與 `bookings` 傳下去。

### 步驟 10：報名卡片

把右側報名卡片的標記換成真正的元件。它只在 `lg` 以上顯示，並用 `sticky` 停在離頂一段的位置，捲動長頁面時仍在畫面右側。

```jsx 06-project-init/src/features/tours/components/BookingCard.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import { ntd, seatsLeft } from '../../../format.js';

export default function BookingCard({
  tour,
  bookings,
  selected,
  onSelect,
  bookTo,
}) {
  return (
    <aside className="rounded-card bg-white shadow-card sticky top-24 mt-12 hidden self-start p-8 lg:mt-0 lg:block">
      <p className="flex items-baseline gap-1.5 whitespace-nowrap font-serif text-4xl">
        <span className="inline-block rounded-full bg-accent text-ink font-bold leading-[1.15] py-[0.12em] px-[0.55em]">
          {ntd(tour.price)}
        </span>
        <span className="font-sans text-base font-normal text-muted">/ 人</span>
      </p>
      {tour.id === 'kyoto-nara' ? (
        <p className="mt-3 text-base text-muted">不含國際機票</p>
      ) : null}
      <dl className="mt-6 grid gap-3 text-base">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">天數</dt>
          <dd>{tour.days} 天</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">團體上限</dt>
          <dd>{tour.departures[0]?.capacity ?? 8} 人</dd>
        </div>
      </dl>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {tour.departures.map((departure) => {
          const on = departure.id === selected.id;
          return (
            <button
              key={departure.id}
              type="button"
              onClick={() => onSelect(departure.id)}
              aria-pressed={on}
              className={`block w-full px-3 py-3 text-left ${on ? 'bg-mist text-action' : ''}`}
            >
              <span className="block font-medium">{departure.date}</span>
              <span className="text-base text-muted">
                剩餘 {seatsLeft(bookings, tour.id, departure)} 人
              </span>
            </button>
          );
        })}
      </div>
      <Button
        component={Link}
        to={bookTo}
        variant="contained"
        className="mt-8 w-full"
      >
        立即報名
      </Button>
    </aside>
  );
}
```

**解析**

- 價格用強調色圓底。`id` 是 `kyoto-nara` 時，價格下多一行「不含國際機票」。
- 定義列表寫出天數與團體上限。團體上限取第一梯的 `capacity`，沒有時用 8。
- 每一梯是一顆按鈕。選中那顆換成操作色邊與 `mist` 底，並寫出剩餘人數。按下時呼叫 `onSelect`，把該梯 `id` 交回詳情頁。
- 「立即報名」連到頁面算好的 `bookTo`。

### 步驟 11：底部報名列

把窄螢幕底部固定列的標記換成真正的元件。

```jsx 06-project-init/src/features/tours/components/MobileBookingBar.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import { ntd } from '../../../format.js';

export default function MobileBookingBar({ price, bookTo }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <p className="font-serif text-2xl font-bold text-ink">{ntd(price)}</p>
        <Button component={Link} to={bookTo} variant="contained">
          立即報名
        </Button>
      </div>
    </div>
  );
}
```

**解析**

- 這一列固定在畫面底部，只在 `lg` 以下出現。左邊是價格，右邊是「立即報名」，連到同一個 `bookTo`。
- `price` 是尚未格式化的數字，元件裡面再用 `ntd` 顯示。

### 步驟 12：找不到行程

對不到行程時，步驟 1 的 `loader` 會丟 404，導向路由上最近的 `errorElement`。手改網址、對不上任何一筆時就能看到找不到頁，頁首與頁尾留著。說明見[找不到頁面](#找不到頁面)。


## 報名

直接打開 `/booking` 就看得到這一頁。姓名與 email 先用範例「林可／lin@example.com」畫成唯讀欄位，成品會改由 Google 帳號帶入。電話才讓使用者填，小計隨著人數變。

這一節要組出 `BookingPage`。先組出這一頁並接到路由，三個零件先放標記，再逐一換成真正的元件。畫面拆成這些零件：

- `BookingSteps`
- `BookingForm`
- `BookingSummary`

{% mermaid graph TD %}
  page["BookingPage"] --> steps["BookingSteps"]
  page --> form["BookingForm"]
  page --> summary["BookingSummary"]
{% endmermaid %}

### 步驟 1：組出 BookingPage

先把報名頁組起來並接到路由，後面換零件時才能在畫面上對照。步驟條、表單與右側摘要先放標記。

步驟條先放標記。

```jsx 06-project-init/src/features/booking/components/BookingSteps.jsx
export default function BookingSteps() {
  return <p>步驟條</p>;
}
```

**解析**

- 先回傳標記文字，標出報名步驟條的位置。

表單先放標記。

```jsx 06-project-init/src/features/booking/components/BookingForm.jsx
export default function BookingForm() {
  return (
    <form id="booking-form" className="rounded-card bg-white p-6 shadow-card">
      報名表單
    </form>
  );
}
```

**解析**

- 先回傳標記文字，標出報名表的位置。

右側摘要先放標記。

```jsx 06-project-init/src/features/booking/components/BookingSummary.jsx
export default function BookingSummary() {
  return <aside>這趟行程</aside>;
}
```

**解析**

- 先回傳標記文字，標出右側摘要的位置。

接著把步驟條、表單與摘要組進報名頁，它們目前都是標記。組好後把路由表裡的報名佔位換掉。

```jsx 06-project-init/src/features/booking/BookingPage.jsx
import { data, redirect, useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingForm from './components/BookingForm.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import { createBooking, getTour } from '../../store.js';

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const tour = getTour(url.searchParams.get('tourId') || 'hualien-taroko');
  const departure =
    tour?.departures.find(
      (item) => item.id === url.searchParams.get('departureId'),
    ) || tour?.departures[0];
  if (!tour || !departure) throw data('找不到頁面', { status: 404 });
  return { tour, departure };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const phone = String(form.get('phone') ?? '').trim();
  if (!phone) return { error: '請填電話，此欄必填' };
  const row = createBooking({
    tourId: String(form.get('tourId')),
    tourTitle: String(form.get('tourTitle')),
    departureId: String(form.get('departureId')),
    date: String(form.get('date')),
    people: Number(form.get('people')),
    name: String(form.get('name')),
    email: String(form.get('email')),
    phone,
    subtotal: Number(form.get('subtotal')),
  });
  return redirect(`/booking/${row.id}`);
};

export default function BookingPage() {
  const { tour, departure } = useLoaderData();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名 · 洛奇旅行</title>
      <BookingSteps activeStep={1} />
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        這一章先用範例資料畫出姓名與 email。成品會用 Google
        帳號帶入。請留下電話，我們會用 email 確認。
      </p>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
        <BookingForm tour={tour} departure={departure} />
        <BookingSummary tour={tour} departure={departure} />
      </div>
    </main>
  );
}
```

**解析**

- 查詢沒帶 `tourId` 時用 `hualien-taroko`。出發日對不到查詢參數時用第一梯。行程與梯次走查詢字串，路徑仍是 `/booking`，不會和完成頁撞在一起。
- 有帶 `tourId` 但對不到行程，或行程沒有出發日時，找不到就丟 404，導向路由上最近的 `errorElement`。
- 左欄是 `BookingForm`，右欄是 `BookingSummary`，兩者目前都是標記。大螢幕（`lg` 以上）才分成兩欄。

接著把 `/booking` 換成這一頁。

```diff 06-project-init/src/App.jsx
 import TourDetailPage, { loader as tourLoader } from './features/tours/TourDetailPage.jsx';
+import BookingPage, {
+  action as bookingAction,
+  loader as bookingLoader,
+} from './features/booking/BookingPage.jsx';
 // ...
           { path: 'tours/:id', loader: tourLoader, element: <TourDetailPage /> },
-          { path: 'booking', element: <Placeholder title="報名" /> },
+          {
+            path: 'booking',
+            loader: bookingLoader,
+            action: bookingAction,
+            element: <BookingPage />,
+          },
           { path: 'booking/:id', element: <Placeholder title="報名完成" /> },
```

**解析**

- `/booking` 從 `Placeholder` 換成 `BookingPage`。完成頁仍是佔位。

### 步驟 2：步驟條

把步驟條的標記換成真正的元件。報名頁與完成頁共用同一組步驟文字與樣式。

先改步驟圓點：完成的步驟畫勾，進行中的步驟用實心圓，圖示沿用圖示字型。

```diff 06-project-init/src/theme.js
 // ...
 const SelectArrow = ({ className }) => ms('expand_more', { className });
+const StepIcon = ({ active, completed, icon }) => {
+  const base =
+    'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold';
+  if (completed)
+    return createElement(
+      'span',
+      { className: `${base} bg-action text-white` },
+      ms('check', { style: { fontSize: 20 } }),
+    );
+  return createElement(
+    'span',
+    {
+      className: `${base} ${active ? 'bg-action text-white' : 'bg-line text-muted'}`,
+    },
+    icon,
+  );
+};
 
 const theme = createTheme({
 // ...
         emptyIcon: ms('star'),
       },
       styleOverrides: { iconFilled: { color: tokens.action } },
     },
+    MuiStepLabel: {
+      defaultProps: { slots: { stepIcon: StepIcon } },
+    },
 // ...
```

**解析**

- 完成的步驟是操作色圓底，裡面是 `check` 圖示。進行中的步驟同樣是操作色圓底，裡面是步驟編號；還沒到的步驟用 `line` 色底與 `muted` 字。
- 這組圖示寫在 `MuiStepLabel` 的 `slots.stepIcon`，之後所有 Stepper 都會套用。

接著換成真正的步驟條元件。

```jsx 06-project-init/src/features/booking/components/BookingSteps.jsx
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

const steps = ['選出發日', '填寫資料', '送出確認'];

export default function BookingSteps({ activeStep }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      className="mb-10"
      sx={{
        '& .MuiStepLabel-label': {
          fontSize: '1.125rem',
          fontWeight: 700,
          marginTop: '8px',
        },
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
```

**解析**

- `steps` 是「選出發日」「填寫資料」「送出確認」三步，寫在這個元件裡。
- 父層傳入 `activeStep`（從 0 起算）。第一步「選出發日」已在詳情頁選梯次時完成，所以報名頁傳 1，停在「填寫資料」。
- 標籤的字級與字重寫在 `sx` 裡。

### 步驟 3：報名表單

把報名表單的標記換成真正的元件。先把文字欄的外框圓角補進主題。

```diff 06-project-init/src/theme.js
 // ...
         root: {
           borderRadius: 24,
           boxShadow: '0 10px 28px rgb(31 42 68 / 8%)',
           backgroundColor: tokens.white,
           backgroundImage: 'none',
         },
       },
     },
+    MuiOutlinedInput: {
+      styleOverrides: {
+        root: { borderRadius: 16, backgroundColor: tokens.white },
+      },
+    },
     MuiAccordion: {
 // ...
```

**解析**

- `MuiOutlinedInput` 覆寫圓角 16 與白底，報名表的文字欄會套到。

接著換成真正的報名表單。

```jsx 06-project-init/src/features/booking/components/BookingForm.jsx
import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

const preview = { name: '林可', email: 'lin@example.com' };

export default function BookingForm({ tour, departure }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [people, setPeople] = useState('2');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const subtotal = tour.price * Number(people);
  const phoneInvalid = !phone.trim();
  const error = actionData?.error ?? '';
  const showPhoneError = (touched || Boolean(error)) && phoneInvalid;
  const submitting =
    navigation.state === 'submitting' &&
    new URL(navigation.formAction, 'http://localhost').pathname === '/booking';

  return (
    <Form
      id="booking-form"
      method="post"
      replace
      noValidate
      className="rounded-card bg-white shadow-card grid gap-4 p-6 md:p-8"
    >
      <Typography variant="h2">填寫資料</Typography>
      <Alert severity="success">
        預覽 · {preview.name} · {preview.email}
      </Alert>
      <input type="hidden" name="tourId" value={tour.id} />
      <input type="hidden" name="tourTitle" value={tour.title} />
      <input type="hidden" name="departureId" value={departure.id} />
      <input type="hidden" name="date" value={departure.date} />
      <input type="hidden" name="people" value={people} />
      <input type="hidden" name="name" value={preview.name} />
      <input type="hidden" name="email" value={preview.email} />
      <input type="hidden" name="subtotal" value={subtotal} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="姓名"
          value={preview.name}
          slotProps={{ input: { readOnly: true } }}
        />
        <TextField
          label="Email"
          type="email"
          value={preview.email}
          slotProps={{ input: { readOnly: true } }}
        />
      </div>
      <FieldSelect
        id="people"
        label="人數"
        value={people}
        onChange={setPeople}
        options={[1, 2, 3, 4, 5, 6, 7, 8].map((count) => ({
          value: String(count),
          label: String(count),
        }))}
      />
      <TextField
        name="phone"
        label="電話"
        type="tel"
        required
        placeholder="0912000111"
        value={phone}
        error={showPhoneError}
        helperText={showPhoneError ? '必填：請留下可聯絡的電話' : ' '}
        onBlur={() => setTouched(true)}
        onChange={(event) => setPhone(event.target.value)}
      />
      {error ? <Alert severity="error">{error}</Alert> : null}
      <p>
        小計{' '}
        <span className="font-serif text-2xl font-bold text-action">
          {ntd(subtotal)}
        </span>
      </p>
      <p className="text-muted">小計會依人數更新。送出後我們用 email 確認。</p>
      <Button type="submit" variant="contained" disabled={submitting}>
        送出報名
      </Button>
    </Form>
  );
}
```

**解析**

- 姓名與 email 是唯讀欄位，值取自頁內的 `preview`（林可、`lin@example.com`），上方的成功 `Alert` 也寫同一組。人數預設是字串 `'2'`，小計用單價乘上人數，再交給 `ntd`。
- 這一頁沒有登入，所以姓名與 email 透過 `type="hidden"` 的隱藏欄位連同行程、梯次、人數與小計一起送出，電話則由使用者填寫。
- `<Form method="post">` 把欄位送到這一頁的 `action`。電話去掉空白後是空的，`action` 就回傳錯誤訊息，由 `useActionData` 讀到後顯示在表單上方。
- 電話欄位的紅字提示在失焦後，或 `action` 回傳錯誤後出現；使用者輸入內容後，紅字會消失，上方的錯誤 `Alert` 則留到下次送出才更新。
- 電話有內容時，`action` 呼叫 `createBooking` 寫入記憶體資料，再用 `redirect` 導向 `/booking/` 加上新訂單的 `id`。
- 送出期間 `useNavigation` 的狀態是 `submitting`，按鈕會停用。提示框的外觀，等完成頁再補進主題。

{% note info %}
`<Form>` 的 `replace` 會用完成頁取代瀏覽紀錄裡的表單頁（官方文件：不想讓使用者按上一頁回到表單時使用）。按上一頁不會回到已送出的表單，而是回到進表單之前的那一頁。
{% endnote %}

### 步驟 4：這趟行程

把右側摘要的標記換成真正的元件。

```jsx 06-project-init/src/features/booking/components/BookingSummary.jsx
import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';

export default function BookingSummary({ tour, departure }) {
  return (
    <aside className="rounded-card bg-white shadow-card p-6 md:p-8 lg:sticky lg:top-24">
      <Typography variant="h2">這趟行程</Typography>
      <dl className="mt-5 grid gap-4 text-base">
        <div>
          <dt className="text-muted">行程</dt>
          <dd className="mt-1 text-lg font-medium">{tour.title}</dd>
        </div>
        <div>
          <dt className="text-muted">出發日</dt>
          <dd className="mt-1 text-lg">{departure.date}</dd>
        </div>
        <div>
          <dt className="text-muted">天數</dt>
          <dd className="mt-1 text-lg">{tour.days} 天</dd>
        </div>
        <div>
          <dt className="text-muted">每人</dt>
          <dd className="mt-1 whitespace-nowrap font-serif text-3xl font-bold text-ink">
            {ntd(tour.price)}
            <span className="font-sans text-base font-normal text-muted">
              {' '}
              / 人
            </span>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
```

**解析**

- 右側列出行程名稱、出發日、天數與每人價格。`lg` 以上用 `sticky` 停在離頂一段的位置，表單較長時仍看得到。
- 行程與梯次由父層傳入，這一層只負責畫摘要。

## 報名完成

送出後會進到 `/booking/:id`，id 是剛才那筆訂單的編號。種子資料裡已有的編號，例如 `/booking/b1`，也會顯示對應的那一筆；對不到的 id 則渲染找不到頁面。

這一節要組出報名完成頁 `BookingResultPage`。步驟條沿用上一節的 `BookingSteps`，明細先放標記，再換成 `BookingReceipt`。這一頁會用到成功提示框，所以先把提示框的外觀補進主題。

{% mermaid graph TD %}
  page["BookingResultPage"] --> steps["BookingSteps"]
  page --> receipt["BookingReceipt"]
{% endmermaid %}

### 步驟 1：組出 BookingResultPage

先把提示框的圓角、色票與圖示補進主題，關閉鈕也改成圖示字型。接著把狀態對照寫進 `format.js`，明細先放標記，再組出完成頁並接到路由，後面換零件時才能在畫面上對照。

```diff 06-project-init/src/theme.js
 // ...
 const SelectArrow = ({ className }) => ms('expand_more', { className });
+const CloseIcon = () => ms('close');
 const StepIcon = ({ active, completed, icon }) => {
 // ...
     error: { main: tokens.alert, contrastText: tokens.white },
+    info: {
+      main: tokens.action,
+      light: tokens.mist,
+      dark: tokens.actionHover,
+      contrastText: tokens.white,
+    },
+    success: {
+      main: tokens.action,
+      light: tokens.mist,
+      dark: tokens.actionHover,
+      contrastText: tokens.white,
+    },
+    Alert: {
+      infoColor: tokens.ink,
+      infoStandardBg: tokens.mist,
+      infoIconColor: tokens.action,
+      successColor: tokens.action,
+      successStandardBg: tokens.mist,
+      successIconColor: tokens.action,
+    },
     text: { primary: tokens.ink, secondary: tokens.muted },
 // ...
         emptyIcon: ms('star'),
       },
       styleOverrides: { iconFilled: { color: tokens.action } },
     },
     MuiStepLabel: {
       defaultProps: { slots: { stepIcon: StepIcon } },
     },
+    MuiAlert: {
+      defaultProps: {
+        iconMapping: {
+          success: ms('check_circle'),
+          info: ms('info'),
+          warning: ms('warning'),
+          error: ms('error'),
+        },
+        slots: { closeIcon: CloseIcon },
+      },
+      styleOverrides: {
+        root: { borderRadius: 16, alignItems: 'center' },
+      },
+    },
 // ...
```

**解析**

- `iconMapping` 把成功、資訊、警告、錯誤四種提示換成各自的圖示；關閉鈕用 `ms('close')`，由新加的 `CloseIcon` 提供。
- 外框圓角是 16，內容垂直置中。
- 這份主題開了 `cssVariables`，標準提示的底色、文字與圖示色來自 `palette.Alert`。資訊用 `mist` 底、`ink` 字、操作色圖示；成功用 `mist` 底、操作色字與圖示。這些色票會蓋掉 Material UI 預設的資訊藍。
- 圓角與圖示套用到所有提示，包含上一節表單裡的成功與錯誤提示；色票只改資訊與成功兩種。

三個狀態代碼對到中文，完成頁和後面的報名清單都讀這一份。

```diff 06-project-init/src/format.js
 // ...
 export const perPerson = (tour) =>
   tour?.id === 'kyoto-nara' ? '/ 人，不含國際機票' : '/ 人';

+export const statusLabel = {
+  pending: '待確認',
+  confirmed: '已確認',
+  cancelled: '已取消',
+};
+
 // ...
```

**解析**

- `statusLabel` 把三種狀態碼（`pending`、`confirmed`、`cancelled`）對成「待確認」「已確認」「已取消」。對照表本身沒有預設值，對不到時怎麼顯示，由使用它的元件各自決定。

明細先放標記。

```jsx 06-project-init/src/features/booking/components/BookingReceipt.jsx
export default function BookingReceipt() {
  return <div>這筆內容</div>;
}
```

**解析**

- 先回傳標記文字，標出完成頁明細的位置。

接著組出完成頁。步驟條沿用 `BookingSteps`，`activeStep` 傳 2。組好後把路由表裡的完成頁佔位換掉。

```jsx 06-project-init/src/features/booking/BookingResultPage.jsx
import { data, Link, useLoaderData } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import BookingReceipt from './components/BookingReceipt.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import { statusLabel } from '../../format.js';
import { getBooking } from '../../store.js';

export const loader = ({ params }) => {
  const row = getBooking(params.id);
  if (!row) throw data('找不到頁面', { status: 404 });
  return { row };
};

export default function BookingResultPage() {
  const { row } = useLoaderData();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名已送出 · 洛奇旅行</title>
      <BookingSteps activeStep={2} />
      <Chip color="primary" label={statusLabel[row.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">
        報名已送出
      </Typography>
      <Alert className="mt-4 max-w-prose" severity="success">
        我們會用 email 再跟你確認。目前狀態為待確認。
      </Alert>
      <BookingReceipt row={row} />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button component={Link} to="/me" variant="contained">
          看我的報名
        </Button>
        <Button component={Link} to="/tours" variant="outlined">
          回行程
        </Button>
      </div>
    </main>
  );
}
```

**解析**

- `loader` 用網址上的 `id` 呼叫 `getBooking`。找不到時丟 404，導向路由上最近的 `errorElement`。種子裡的 `/booking/b1` 可以直接打開。
- `BookingSteps` 的 `activeStep` 是 2，停在第三步。Chip 用 `statusLabel` 把狀態碼換成中文，對不到時顯示「待確認」。
- 成功 `Alert` 套用剛才補進主題的提示框外觀。明細目前只是標記，下一步再換成 `BookingReceipt`。
- 兩顆按鈕分別連到我的報名與行程列表。

接著把 `/booking/:id` 換成這一頁。

```diff 06-project-init/src/App.jsx
 import BookingPage, {
   action as bookingAction,
   loader as bookingLoader,
 } from './features/booking/BookingPage.jsx';
+import BookingResultPage, { loader as bookingResultLoader } from './features/booking/BookingResultPage.jsx';
 // ...
           },
-          { path: 'booking/:id', element: <Placeholder title="報名完成" /> },
+          {
+            path: 'booking/:id',
+            loader: bookingResultLoader,
+            element: <BookingResultPage />,
+          },
           { path: 'me', element: <Placeholder title="我的報名" /> },
```

**解析**

- `/booking/:id` 從 `Placeholder` 換成 `BookingResultPage`。

### 步驟 2：這筆內容

把明細的標記換成真正的元件。送出一筆報名後，就能在完成頁看到這份明細。

```jsx 06-project-init/src/features/booking/components/BookingReceipt.jsx
import Typography from '@mui/material/Typography';
import { ntd, statusLabel } from '../../../format.js';

export default function BookingReceipt({ row }) {
  return (
    <>
      <Typography variant="h2" className="mt-10">
        這筆內容
      </Typography>
      <dl className="rounded-card bg-white shadow-card mt-4 max-w-prose divide-y divide-line px-5">
        {[
          ['行程', row.tourTitle],
          ['出發日', row.date],
          ['人數', row.people],
          ['電話', row.phone],
          ['小計', ntd(row.subtotal)],
          ['狀態', statusLabel[row.status] || row.status],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr]">
            <dt className="text-muted">{label}</dt>
            <dd
              className={
                label === '小計'
                  ? 'font-serif text-2xl font-bold text-action'
                  : undefined
              }
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
```

**解析**

- 明細列出行程、日期、人數、電話、小計與狀態。小計那一列用較大的操作色數字。
- 狀態用 `statusLabel` 換成中文，對不到對照表時，明細改顯示原本的狀態碼。

## 我的報名

直接打開 `/me` 就列出 `mySamples`。這四筆是專為這一頁寫的預覽清單，欄位比報名種子 `bookings` 少，也不併進 `bookings`。

這一節要組出 `MyBookingsPage`。先組出這一頁並接到路由，單筆列先放標記，再換成真正的元件，最後再補還沒有報名時的提示。畫面拆成這個零件：

- `MyBookingRow`

{% mermaid graph TD %}
  page["MyBookingsPage"] --> row["MyBookingRow"]
{% endmermaid %}

### 步驟 1：組出 MyBookingsPage

範例先寫進 `mock.data.js`，再把單筆列先放標記，組出我的報名頁並接到路由。

```diff 06-project-init/src/features/booking/mock.data.js
 // ...
 ];
+
+/** 我的報名頁的預覽清單，不匯入後台種子。 */
+export const mySamples = [
+  {
+    status: 'pending',
+    title: '花蓮太魯閣與七星潭四日',
+    date: '2026-12-18',
+    people: 2,
+    phone: '0912000111',
+    subtotal: 53600,
+  },
+  {
+    status: 'confirmed',
+    title: '京都嵐山、伏見與奈良五日',
+    date: '2027-04-06',
+    people: 1,
+    phone: '0912000222',
+    subtotal: 52800,
+  },
+  {
+    status: 'cancelled',
+    title: '台南府城與安平兩日',
+    date: '2026-11-28',
+    people: 3,
+    phone: '0912000333',
+    subtotal: 26400,
+  },
+  {
+    status: 'confirmed',
+    title: '台北大稻埕與北投溫泉三日',
+    date: '2026-12-04',
+    people: 2,
+    phone: '0912000444',
+    subtotal: 37200,
+  },
+];
```

**解析**

- `mySamples` 是這一頁的預覽清單，內容固定四筆，不依 email 過濾，也不讀 Store。
- 因此剛在報名頁送出的那一筆不會出現在這一頁。

單筆列先放標記。

```jsx 06-project-init/src/features/booking/components/MyBookingRow.jsx
export default function MyBookingRow() {
  return <article className="py-6">單筆報名</article>;
}
```

**解析**

- 先回傳標記文字，標出每一筆報名的位置。標題「你的報名」與列表外框寫在頁面上。

接著組出我的報名頁。單筆列目前是標記，清單先一律畫出來。

```jsx 06-project-init/src/features/booking/MyBookingsPage.jsx
import Typography from '@mui/material/Typography';
import MyBookingRow from './components/MyBookingRow.jsx';
import { mySamples } from './mock.data.js';

export default function MyBookingsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>我的報名 · 洛奇旅行</title>
      <Typography variant="h1">我的報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        這一頁用範例清單預覽報名長什麼樣子。成品會依 Google
        帳號讀自己的報名。如需改期或取消，請來信或來電。
      </p>
      <Typography variant="h2" className="mt-10">
        你的報名
      </Typography>
      <div className="rounded-card bg-white shadow-card mt-6 max-w-3xl divide-y divide-line px-5">
        {mySamples.map((item) => (
          <MyBookingRow
            key={`${item.title}-${item.date}`}
            status={item.status}
            title={item.title}
            date={item.date}
            people={item.people}
            phone={item.phone}
            subtotal={item.subtotal}
          />
        ))}
      </div>
    </main>
  );
}
```

**解析**

- 清單目前一律畫出來，空陣列時的提示留到最後一步再補。
- 副標是靜態說明，要改期或取消請來信或來電，所以這一頁沒有取消按鈕。

接著把 `/me` 換成這一頁。

```diff 06-project-init/src/App.jsx
 import BookingResultPage, { loader as bookingResultLoader } from './features/booking/BookingResultPage.jsx';
+import MyBookingsPage from './features/booking/MyBookingsPage.jsx';
 // ...
           },
-          { path: 'me', element: <Placeholder title="我的報名" /> },
+          { path: 'me', element: <MyBookingsPage /> },
           { path: 'about', element: <Placeholder title="關於" /> },
```

**解析**

- `/me` 從 `Placeholder` 換成 `MyBookingsPage`。

### 步驟 2：單筆報名

把單筆列的標記換成真正的元件。換上後每一筆會顯示狀態標籤、行程名稱與四項資料。

```jsx 06-project-init/src/features/booking/components/MyBookingRow.jsx
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ntd, statusLabel } from '../../../format.js';

const chipColor = {
  pending: 'primary',
  confirmed: 'secondary',
  cancelled: 'error',
};

export default function MyBookingRow({
  status,
  title,
  date,
  people,
  phone,
  subtotal,
}) {
  return (
    <article className="py-6">
      <Chip
        size="small"
        color={chipColor[status] || 'primary'}
        label={statusLabel[status] || status}
      />
      <Typography variant="h3" className="mt-3">
        {title}
      </Typography>
      <dl className="mt-3 grid gap-3 sm:grid-cols-4">
        <div>
          <dt className="text-muted">出發日</dt>
          <dd>{date}</dd>
        </div>
        <div>
          <dt className="text-muted">人數</dt>
          <dd>{people}</dd>
        </div>
        <div>
          <dt className="text-muted">電話</dt>
          <dd>{phone}</dd>
        </div>
        <div>
          <dt className="text-muted">小計</dt>
          <dd className="font-serif text-2xl font-bold text-action">
            {ntd(subtotal)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
```

**解析**

- `chipColor` 把待確認、已確認、已取消依序對到 `primary`、`secondary`、`error` 三種顏色。標籤文字用 `statusLabel`，對不到時顯示原來的狀態碼。
- 出發日、人數、電話與小計排成一列定義列表。小計用 serif、操作色，並用 `ntd` 格式化。

### 步驟 3：還沒有報名

最後補上還沒有報名時的畫面：清單是空陣列時，不畫空的列表外框，改顯示提示與前往行程列表的按鈕。

```diff 06-project-init/src/features/booking/MyBookingsPage.jsx
+import { Link } from 'react-router';
+import Button from '@mui/material/Button';
 import Typography from '@mui/material/Typography';
 // ...
       </p>
-      <Typography variant="h2" className="mt-10">
-        你的報名
-      </Typography>
-      <div className="rounded-card bg-white shadow-card mt-6 max-w-3xl divide-y divide-line px-5">
-        {mySamples.map((item) => (
-          <MyBookingRow
-            key={`${item.title}-${item.date}`}
-            status={item.status}
-            title={item.title}
-            date={item.date}
-            people={item.people}
-            phone={item.phone}
-            subtotal={item.subtotal}
-          />
-        ))}
-      </div>
+      {mySamples.length ? (
+        <>
+          <Typography variant="h2" className="mt-10">
+            你的報名
+          </Typography>
+          <div className="rounded-card bg-white shadow-card mt-6 max-w-3xl divide-y divide-line px-5">
+            {mySamples.map((item) => (
+              <MyBookingRow
+                key={`${item.title}-${item.date}`}
+                status={item.status}
+                title={item.title}
+                date={item.date}
+                people={item.people}
+                phone={item.phone}
+                subtotal={item.subtotal}
+              />
+            ))}
+          </div>
+        </>
+      ) : (
+        <section className="mt-10 max-w-3xl">
+          <Typography id="empty-title" variant="h2">
+            還沒有報名
+          </Typography>
+          <p className="mt-3 max-w-prose">選一個行程，挑一個出發日。</p>
+          <Button
+            className="mt-6"
+            component={Link}
+            to="/tours"
+            variant="contained"
+          >
+            去看行程
+          </Button>
+        </section>
+      )}
     </main>
 // ...
```

**解析**

- `mySamples.length` 是 0 時才顯示「還沒有報名」與「去看行程」；有資料時維持標題「你的報名」與列表。
- 想在畫面上看到提示，可以暫時把 `mock.data.js` 裡的 `mySamples` 改成空陣列，看完再改回來。

## 關於

關於頁是一段品牌說明、一組虛構的執照字號，以及六則常見問題。它不讀 Store，也不檢查登入。

這一節沒有再拆畫面零件。常見問題放在 `mock.data.js`，由 `AboutPage` 自己渲染。

### 步驟 1：組出 AboutPage

常見問題先寫進 `mock.data.js`，再寫關於頁。下一步接到路由後，打開 `/about` 就能看到這一頁。

```js 06-project-init/src/features/about/mock.data.js
export const faqs = [
  { q: '一個團幾個人？', a: '每團 8 人。報名時人數選 1 到 8。' },
  {
    q: '費用包含什麼？',
    a: '台灣團包含表定住宿、當地車資與行程表上的門票。午餐與個人消費不含。',
  },
  {
    q: '京都團含機票嗎？',
    a: '不含國際機票，也不含你自己另外加的交通。團費是當地住宿、嚮導，以及行程表列出的交通與門票。',
  },
  { q: '沒有成行會怎樣？', a: '出團前以 email 確認。若未成行，團費全額退回。' },
  {
    q: '怎麼看我的報名？',
    a: '用報名時的 Google 帳號登入，到「我的報名」。換一個帳號看不到別人的單。',
  },
  {
    q: '可以自己取消嗎？',
    a: '改期或取消請寫信或打電話，我們會為你更新狀態。',
  },
];
```

**解析**

- 常見問題是一組 `q`（問題）與 `a`（答案）的陣列，關於頁負責把它們畫成可展開與收合的清單。

接著寫關於頁。

```jsx 06-project-init/src/features/about/AboutPage.jsx
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { faqs } from './mock.data.js';

export default function AboutPage() {
  const [open, setOpen] = useState(null);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>關於 · 洛奇旅行</title>
      <Typography variant="h1" className="max-w-[10em]">
        關於洛奇旅行
      </Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed">
        洛奇旅行安排台灣本島與一條日本關西短團。我們把一天怎麼過寫清楚：具體地名、走路的時段、晚上住哪裡。每團
        8 人，不催促、不加購物站。
      </p>
      <section className="rounded-card bg-white shadow-card mt-12 max-w-3xl px-6 py-8">
        <Typography id="license-title" variant="h2">
          執照與品保
        </Typography>
        <p className="mt-4">交通部觀光署旅行業執照交觀甲 999999 號</p>
        <p className="mt-3 text-muted">
          出團前以 email 確認。未成行，團費全額退回。
        </p>
      </section>
      <section className="mt-12 max-w-3xl">
        <Typography id="faq-title" variant="h2">
          常見問題
        </Typography>
        <div className="mt-4">
          {faqs.map((item, index) => (
            <Accordion
              key={item.q}
              expanded={open === index}
              onChange={(_, expanded) => setOpen(expanded ? index : null)}
              className="mb-2"
            >
              <AccordionSummary>{item.q}</AccordionSummary>
              <AccordionDetails>
                <p className="max-w-prose text-muted">{item.a}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </section>
    </main>
  );
}
```

**解析**

- `open` 記目前展開的索引，一次只開一則；再開另一則時前一則會合上。
- 手風琴外觀沿用主題裡已經設過的覆寫，這裡只傳問題與答案。
- 上方是一段品牌說明。執照區塊的字號「交觀甲 999999 號」是教材用的虛構號碼。

### 步驟 2：接到路由

接著把 `/about` 換成這一頁。

```diff 06-project-init/src/App.jsx
 import MyBookingsPage from './features/booking/MyBookingsPage.jsx';
+import AboutPage from './features/about/AboutPage.jsx';
 // ...
           { path: 'me', element: <MyBookingsPage /> },
-          { path: 'about', element: <Placeholder title="關於" /> },
+          { path: 'about', element: <AboutPage /> },
           { path: 'login', element: <Placeholder title="登入提示" /> },
```

**解析**

- `/about` 從 `Placeholder` 換成 `AboutPage`。

## 登入

登入頁用對話框畫出「用 Google 帳號繼續」的提示，主按鈕不寫入狀態，也不導頁；「返回首頁」與關閉對話框都導回 `/`。真正的 Google 登入留到選讀的 {% post_link lokiTech-15day-13-project-travel-api %}。

這一節先寫 `LoginPage`，再讓已經存在的 `SiteHeader` 依路徑切換登入按鈕的文字與連結。

### 步驟 1：登入頁

先把登入對話框的圓角補進主題。

```diff 06-project-init/src/theme.js
 // ...
     MuiDrawer: {
       styleOverrides: { paper: { borderRadius: '0 24px 24px 0', width: 280 } },
     },
+    MuiDialog: {
+      styleOverrides: { paper: { borderRadius: 24 } },
+    },
     MuiBackdrop: {
 // ...
```

**解析**

- `MuiDialog` 的紙張圓角設成 24，登入對話框會套到。

接著寫登入頁。

```jsx 06-project-init/src/features/auth/LoginPage.jsx
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="flex-1">
      <title>用 Google 帳號繼續 · 洛奇旅行</title>
      <Dialog open onClose={() => navigate('/')} fullWidth maxWidth="xs">
        <DialogTitle className="font-serif text-4xl leading-tight">
          用 Google 帳號繼續
        </DialogTitle>
        <DialogContent>
          <p>
            報名和我的報名會使用 Google 的姓名與 email。我們不另外設定密碼。
          </p>
        </DialogContent>
        <DialogActions className="flex flex-col items-stretch gap-3 px-6 pb-6">
          <Button type="button" variant="contained">
            用 Google 帳號繼續
          </Button>
          <Button type="button" onClick={() => navigate('/')}>
            返回首頁
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
```

**解析**

- `Dialog` 的 `open` 恆為真，所以進到 `/login` 就一直開著。關閉（`onClose`）或按「返回首頁」都用 `navigate('/')` 導回首頁。
- 「用 Google 帳號繼續」沒有 `onClick`，按了沒有反應，也不寫入任何狀態。
- 內文說明報名和我的報名會使用 Google 的姓名與 email，不另外設定密碼。登入與讀自己的訂單，留到選讀的 {% post_link lokiTech-15day-13-project-travel-api %}。

接著把 `/login` 換成這一頁。

```diff 06-project-init/src/App.jsx
 import AboutPage from './features/about/AboutPage.jsx';
+import LoginPage from './features/auth/LoginPage.jsx';
 // ...
           { path: 'about', element: <AboutPage /> },
-          { path: 'login', element: <Placeholder title="登入提示" /> },
+          { path: 'login', element: <LoginPage /> },
           { path: 'admin/login', element: <Placeholder title="後台登入" /> },
```

**解析**

- `/login` 從 `Placeholder` 換成 `LoginPage`。後台登入仍是佔位。

### 步驟 2：更新頁首

登入頁已經接上。這一步改已經存在的 `SiteHeader`：前台仍是連到 `/login` 的「登入」，路徑以 `/admin` 開頭時改成「後台登入」。導覽與站名仍是前台的樣子，後台選單留到下一章再換。

```diff 06-project-init/src/layout/components/SiteHeader.jsx
 import { useState } from 'react';
-import { Link } from 'react-router';
+import { Link, useLocation } from 'react-router';
 // ...
 export default function SiteHeader() {
+  const { pathname } = useLocation();
+  const admin = pathname.startsWith('/admin');
   const [open, setOpen] = useState(false);
   const close = () => setOpen(false);
+  const account = (
+    <Button
+      component={Link}
+      to={admin ? '/admin/login' : '/login'}
+      onClick={close}
+    >
+      {admin ? '後台登入' : '登入'}
+    </Button>
+  );
 
   return (
 // ...
         <div className="hidden items-center gap-1 md:flex">
           <SiteNav onNavigate={close} id="site-nav" />
-          <Button component={Link} to="/login" onClick={close}>
-            登入
-          </Button>
+          {account}
         </div>
 // ...
         <div id="site-drawer" className="flex flex-col gap-2 p-4">
           <SiteNav onNavigate={close} />
-          <Button component={Link} to="/login" onClick={close}>
-            登入
-          </Button>
+          {account}
         </div>
 // ...
```

**解析**

- 前台按鈕文字是「登入」，連到 `/login`。路徑以 `/admin` 開頭時，按鈕文字是「後台登入」，連到 `/admin/login`。
- 用 `useLocation().pathname.startsWith('/admin')` 判斷，`/admin/login` 也算後台路徑。
- 登入鈕抽成 `account`，桌面版頁首與手機抽屜共用同一份。
- 這一章不依登入狀態改頁首，沒有頭像也沒有登出。


# 後台

這一章先讓頁首換成後台的樣子，再依序組出後台登入、行程管理與報名清單三頁。後台頁都能直接用網址打開預覽，身份檢查留到選讀的 {% post_link lokiTech-15day-13-project-travel-api %}。

## 後台選單

後台沿用同一份頁首與外框，不必另做一組。登入那一節已經用 `useLocation().pathname.startsWith('/admin')` 判斷路徑，讓登入按鈕在後台路徑改成「後台登入」。這一節用同一個條件，把導覽與站名也換成後台的樣子。

後台導覽有兩條 `NavLink`：行程管理連到 `/admin`，並加上 `end`，這樣 `/admin/bookings` 才不會被當成行程管理的作用中連結；報名清單連到 `/admin/bookings`。站名改成「洛奇旅行 · 後台」，連到 `/admin`。兩頁既然能用頁首切換，頁面內就不必再做一排分頁。

```diff 06-project-init/src/layout/components/SiteHeader.jsx
 import { useState } from 'react';
-import { Link, useLocation } from 'react-router';
+import { Link, NavLink, useLocation } from 'react-router';
 // ...
 import Icon from '../../_shared/Icon.jsx';
+
+const item = ({ isActive }) =>
+  `inline-flex min-h-11 items-center rounded-full px-3 font-bold ${isActive ? 'bg-action text-white' : 'text-ink hover:bg-mist'}`;
 
 export default function SiteHeader() {
 // ...
     </Button>
   );
+
+  const links = (id) =>
+    admin ? (
+      <nav id={id} className="flex flex-col gap-1 md:flex-row md:items-center">
+        <NavLink to="/admin" end className={item} onClick={close}>
+          行程管理
+        </NavLink>
+        <NavLink to="/admin/bookings" className={item} onClick={close}>
+          報名清單
+        </NavLink>
+      </nav>
+    ) : (
+      <SiteNav onNavigate={close} id={id} />
+    );
 
   return (
     <AppBar id="site-header" position="sticky" component="header">
       <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
-        <Link to="/" className="font-serif text-2xl font-semibold text-ink">
-          洛奇旅行
-        </Link>
+        <Link
+          to={admin ? '/admin' : '/'}
+          className="font-serif text-2xl font-semibold text-ink"
+        >
+          {admin ? '洛奇旅行 · 後台' : '洛奇旅行'}
+        </Link>
         <Button
 // ...
         <div className="hidden items-center gap-1 md:flex">
-          <SiteNav onNavigate={close} id="site-nav" />
+          {links('site-nav')}
           {account}
         </div>
 // ...
         <div id="site-drawer" className="flex flex-col gap-2 p-4">
-          <SiteNav onNavigate={close} />
+          {links(undefined)}
           {account}
         </div>
 // ...
```

**解析**

- 後台不另做頁首，外框仍是 `SiteLayout`。
- `admin` 仍用 `pathname.startsWith('/admin')` 判斷，`/admin/login` 也算後台。
- `/admin` 的連結加 `end`，否則以 `/admin` 開頭的路徑都會亮起行程管理。
- 站名在後台改連 `/admin`，文字是「洛奇旅行 · 後台」。前台仍連 `/`，文字仍是「洛奇旅行」。
- 打開 `/admin`，頁首導覽換成「行程管理」「報名清單」兩個連結，目前所在的那個會是實心底色。

後台頁放在 `features/admin/`，目錄如下。下面每一節先說明該頁拆哪些元件、用圖畫出誰組誰，再組出該頁並放 placeholder、接到路由，最後逐一換成真正的零件，讓每一步都能在畫面上對照。

```
src/features/admin/
├── AdminLoginPage.jsx
├── AdminToursPage.jsx
├── AdminBookingsPage.jsx
└── components/
    ├── TourTable.jsx
    ├── TourForm.jsx
    ├── DeleteTourDialog.jsx
    ├── DraftRows.jsx
    ├── tourDraft.js
    ├── BookingFilters.jsx
    ├── BookingTable.jsx
    └── BookingForm.jsx
```

## 後台登入

後台登入頁畫出 email 與密碼欄位，送出時只呼叫 `preventDefault`，不前往 `/admin`；要看後台就直接打開 `/admin`。這一節沒有再拆畫面零件，直接寫 `AdminLoginPage`。

### 步驟 1：組出 AdminLoginPage

登入卡片用 MUI 的 `Paper`，先把它的圓角補進主題，與前台的卡片同樣是 24px。

```diff 06-project-init/src/theme.js
 // ...
         root: {
           borderRadius: 24,
           boxShadow: '0 10px 28px rgb(31 42 68 / 8%)',
           backgroundColor: tokens.white,
           backgroundImage: 'none',
         },
       },
     },
+    MuiPaper: {
+      styleOverrides: { rounded: { borderRadius: 24 } },
+    },
     MuiOutlinedInput: {
 // ...
```

**解析**

- `MuiPaper` 的 `rounded` 圓角設成 24。

接著寫後台登入頁。圓角、白底與陰影沿用前面頁面的 `rounded-card`、`bg-white`、`shadow-card`。

```jsx 06-project-init/src/features/admin/AdminLoginPage.jsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24">
      <title>後台登入 · 洛奇旅行</title>
      <Paper
        component="form"
        elevation={0}
        className="rounded-card bg-white shadow-card grid max-w-md gap-4 p-6 md:p-8"
        onSubmit={(event) => event.preventDefault()}
      >
        <Typography variant="h1">後台登入</Typography>
        <p className="text-lg leading-relaxed">
          後台使用 email 與密碼。接上資料層時再接到 Authentication。
        </p>
        <TextField
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="密碼"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" variant="contained">
          登入
        </Button>
      </Paper>
    </main>
  );
}
```

**解析**

- 打開 `/admin/login`，頁首已是後台的樣子，頁面有 email、密碼兩個欄位與「登入」鈕。按下去不會換頁，因為表單 `onSubmit` 呼叫了 `preventDefault`。
- email 與密碼只留在這一頁的 state，不送到任何地方。頁內說明提到的 Authentication，要到選讀的下一篇才接。
- `Paper` 的 `component="form"` 讓它成為表單元素；`elevation={0}` 去掉預設陰影，避免與 `shadow-card` 疊兩層。

### 步驟 2：接到路由

接著把 `/admin/login` 換成這一頁。

```diff 06-project-init/src/App.jsx
 import LoginPage from './features/auth/LoginPage.jsx';
+import AdminLoginPage from './features/admin/AdminLoginPage.jsx';
 // ...
           { path: 'login', element: <LoginPage /> },
-          { path: 'admin/login', element: <Placeholder title="後台登入" /> },
+          { path: 'admin/login', element: <AdminLoginPage /> },
           { path: 'admin', element: <Placeholder title="後台行程" /> },
```

**解析**

- `/admin/login` 從 `Placeholder` 換成 `AdminLoginPage`。

## 行程管理

後台表單要寫出前台會讀到的欄位。圖庫、每日行程與出發梯次用可增刪的列來編，費用包含與費用不含比照亮點，用多行文字欄一行一則。主題選項跟首頁主題卡片用同一份清單，所以這一頁才從 `themeLinks` 導出 `themes`。

新增與編輯共用同一個 Dialog。沒有帶入行程是新增，有帶入是編輯。用這一頁的 state 控制開關，不另開路由。刪除放在列表操作欄，確認後才從列表拿掉，不寫在編輯表單裡。

這一節要組出 `AdminToursPage`。先組出這一頁並接到路由，表格與表單先放標記，再補這一頁要用的資料與表格，然後組出表單與送出，最後接上刪除。畫面拆成這些零件：

- `TourTable`
- `TourForm`：新增與編輯共用的 Dialog
- `DeleteTourDialog`：刪除確認
- `NoticeSnackbar`：兩頁共用的成功提示，放在 `src/_shared`
- `DraftRows`：圖庫、每日行程與出發梯次共用的多列輸入

{% mermaid graph TD %}
  page["AdminToursPage"] --> table["TourTable"]
  page --> form["TourForm"]
  page --> confirm["DeleteTourDialog"]
  page --> notice["NoticeSnackbar"]
  form --> rows["DraftRows"]
{% endmermaid %}

### 步驟 1：組出 AdminToursPage

先把行程管理組起來並接到路由，表格與表單先放標記。`loader` 讀清單，`open` 與 `tour` 這兩個 state 控制 Dialog。

表格先放標記。

```jsx 06-project-init/src/features/admin/components/TourTable.jsx
export default function TourTable() {
  return <p className="mt-8">行程表格</p>;
}
```

**解析**

- 先回傳標記文字，標出行程表格的位置。

表單先做成 Dialog 外殼，依有沒有帶入行程區分標題。

```jsx 06-project-init/src/features/admin/components/TourForm.jsx
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function TourForm({ open, tour, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{tour ? '編輯行程' : '新增行程'}</DialogTitle>
      <DialogContent>行程表單</DialogContent>
    </Dialog>
  );
}
```

**解析**

- 此刻只有依新增或編輯切換的對話框標題，`onClose` 讓點背景或按 Esc 能關閉。真正的欄位留到步驟 6 再補。

接著組出行程管理頁。表格與表單目前是標記。

```jsx 06-project-init/src/features/admin/AdminToursPage.jsx
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import { getTours } from '../../store.js';

export const loader = () => ({ tours: getTours() });

export default function AdminToursPage() {
  const { tours } = useLoaderData();
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(null);
  const close = () => setOpen(false);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>行程管理 · 洛奇旅行</title>
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        行程管理
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        新增、修改或下架行程。列表會立刻更新。兩頁用頁首切換。
      </p>
      <div className="mt-8">
        <Button
          variant="outlined"
          onClick={() => {
            setTour(null);
            setOpen(true);
          }}
        >
          新增行程
        </Button>
      </div>
      <TourTable
        tours={tours}
        onEdit={(item) => {
          setTour(item);
          setOpen(true);
        }}
      />
      <TourForm
        key={open ? (tour?.id ?? 'create') : 'closed'}
        open={open}
        tour={tour}
        onClose={close}
      />
    </main>
  );
}
```

**解析**

- 直接打開 `/admin` 就看得到這一頁：標題「行程管理」、「新增行程」鈕，下面只有「行程表格」這行標記。`loader` 回傳 `getTours()`。
- `open` 與 `tour` 控制 Dialog：新增時 `tour` 是 `null`，編輯時帶入該筆，不另開路由。按「新增行程」會跳出標題為「新增行程」的對話框；表格的 `onEdit` 要等表格換成真的元件才會用到。
- `key` 依開窗與行程編號重掛表單，表單的草稿才會從這一筆的資料開始。

接著把 `/admin` 換成這一頁。路由先接上 `loader`。

```diff 06-project-init/src/App.jsx
 import AdminLoginPage from './features/admin/AdminLoginPage.jsx';
+import AdminToursPage, {
+  loader as adminToursLoader,
+} from './features/admin/AdminToursPage.jsx';
 // ...
           { path: 'admin/login', element: <AdminLoginPage /> },
-          { path: 'admin', element: <Placeholder title="後台行程" /> },
+          {
+            path: 'admin',
+            loader: adminToursLoader,
+            element: <AdminToursPage />,
+          },
           { path: 'admin/bookings', element: <Placeholder title="後台報名" /> },
```

**解析**

- `/admin` 從佔位頁換成 `AdminToursPage`，並接上 `loader`。報名清單仍是佔位。
- 這一章不檢查身份，打開網址就看得到。

### 步驟 2：這一頁要用的資料

表單的主題下拉要有選項清單，先在行程資料檔補上。

```diff 06-project-init/src/features/tours/mock.data.js
+import { themeLinks } from '../home/mock.data.js';
+
 const shot = (id) =>
 // ...
 export const regions = [
   '台北',
   '基隆',
   '花蓮',
   '台東',
   '台南',
   '高雄',
   '金門',
   '京都',
 ];
 
+export const themes = themeLinks.map((item) => item.theme);
+
 // ...
```

**解析**

- 主題名稱只寫在首頁的 `themeLinks`。這裡用同一份清單做成 `themes`，後台表單的下拉直接用它。每筆行程只存 `theme` 字串，不必再做主題的增刪或另建資料表。

接著補上草稿轉行程的函式 `tourFromDraft`。`draftFromTour` 下一步再換成會帶入行程欄位的寫法。

```js 06-project-init/src/features/admin/components/tourDraft.js
const linesOf = (text) =>
  String(text)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export const empty = {
  title: '',
  region: '',
  theme: '城市',
  days: 2,
  price: 0,
  images: [''],
  intro: '',
  highlights: '',
  itinerary: [{ title: '', body: '' }],
  includes: '',
  excludes: '',
  departures: [{ date: '', capacity: 8 }],
  featured: false,
};

export const draftFromTour = () => empty;

export const tourFromDraft = (draft) => {
  if (!draft.title.trim()) return { error: '標題要填' };
  const images = (draft.images ?? [])
    .map((item) => String(item).trim())
    .filter(Boolean);
  const itinerary = (draft.itinerary ?? [])
    .map((item) => ({
      title: String(item.title ?? '').trim(),
      body: String(item.body ?? '').trim(),
    }))
    .filter((item) => item.title || item.body)
    .map((item, index) => ({
      day: index + 1,
      title: item.title,
      body: item.body,
    }));
  const departures = (draft.departures ?? [])
    .map((item) => ({
      date: String(item.date ?? '').trim(),
      capacity: Number(item.capacity) || 8,
    }))
    .filter((item) => item.date)
    .map((item) => ({
      id: item.date,
      date: item.date,
      capacity: item.capacity,
    }));
  return {
    error: '',
    tour: {
      title: draft.title.trim(),
      region: draft.region.trim(),
      theme: draft.theme,
      days: Number(draft.days),
      price: Number(draft.price),
      cover: images[0] || '',
      images,
      intro: draft.intro.trim(),
      highlights: linesOf(draft.highlights),
      itinerary,
      includes: linesOf(draft.includes),
      excludes: linesOf(draft.excludes),
      departures,
      featured: Boolean(draft.featured),
    },
  };
};
```

**解析**

- `tourFromDraft` 把表單的草稿轉成完整的行程物件，轉換規則有四條：
  - 空的網址列會略過，封面用圖庫第一張。
  - 每日行程的 `day` 依列序自動編成 1、2、3。
  - 出發梯次的 `id` 用日期。
  - 亮點與費用依換行拆開，去掉空白行。
- 標題去掉空白後是空的，回傳「標題要填」，不寫入。
- 回傳的行程不含 `id`：新增時由 Store 用 `tour-` 加上當下時間做成 `id`，編輯時沿用原來的 `editingId`。`id` 不變，詳情頁網址與報名的 `tourId` 才會保持穩定。

### 步驟 3：行程表格

先在主題裡設定表格儲存格：表頭鋪上 `mist` 底色，分隔線用色票的 `line`。

```diff 06-project-init/src/theme.js
 // ...
     MuiAlert: {
 // ...
       },
     },
+    MuiTableCell: {
+      styleOverrides: {
+        root: { borderColor: tokens.line },
+        head: {
+          fontWeight: 700,
+          backgroundColor: tokens.mist,
+          color: tokens.ink,
+        },
+      },
+    },
   },
 // ...
```

**解析**

- 儲存格的分隔線用 `line`；表頭字重 700、底色 `mist`、文字 `ink`。這份樣式之後報名清單的表格也沿用。

接著把行程表格的 placeholder 換成真正的元件。操作欄先放「編輯」。

```jsx 06-project-init/src/features/admin/components/TourTable.jsx
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ntd } from '../../../format.js';

export default function TourTable({ tours, onEdit }) {
  return (
    <>
      <TableContainer
        elevation={0}
        className="rounded-card bg-white shadow-card mt-8 hidden overflow-x-auto md:block"
      >
        <Table>
          <TableHead>
            <TableRow>
              {['標題', '地區', '主題', '天數', '價格', '操作'].map((label) => (
                <TableCell key={label} className="px-4 py-3">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="px-4 py-4">{tour.title}</TableCell>
                <TableCell className="px-4 py-4">{tour.region}</TableCell>
                <TableCell className="px-4 py-4">{tour.theme}</TableCell>
                <TableCell className="px-4 py-4">{tour.days} 天</TableCell>
                <TableCell className="px-4 py-4">{ntd(tour.price)}</TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="contained"
                      disableElevation
                      color="primary"
                      onClick={() => onEdit(tour)}
                    >
                      編輯
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-8 grid gap-4 md:hidden">
        {tours.map((tour) => (
          <Card key={tour.id} className="p-6">
            <h3 className="font-serif text-2xl font-semibold">{tour.title}</h3>
            <p className="mt-2 text-muted">
              {tour.region} · {tour.theme} · {tour.days} 天 · {ntd(tour.price)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="contained"
                disableElevation
                color="primary"
                onClick={() => onEdit(tour)}
              >
                編輯
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
```

**解析**

- `tours` 是頁面傳進來的清單，`onEdit` 是「編輯」要呼叫的函式。打開 `/admin` 會看到八筆行程。
- `md` 以上用表格，窄螢幕改成一筆一張卡片，兩邊都有「編輯」。價格用 `ntd` 轉成貨幣格式。
- 操作鈕是實心、沒有陰影的主色鈕，字級與 Dialog 裡的動作鈕相同，所以不加 `size="small"`。
- 按「編輯」會把該筆交給 `onEdit`，頁面打開同一個 Dialog，標題變成「編輯行程」；欄位要到步驟 6 才有。

### 步驟 4：草稿工具

把 `draftFromTour` 換成會帶入行程欄位的寫法，並讓空白草稿每次都是一份新物件。圖庫、每日行程與出發梯次的每一列都帶一個只活在草稿裡的 `id`。

```diff 06-project-init/src/features/admin/components/tourDraft.js
 // ...
-export const empty = {
-  title: '',
-  region: '',
-  theme: '城市',
-  days: 2,
-  price: 0,
-  images: [''],
-  intro: '',
-  highlights: '',
-  itinerary: [{ title: '', body: '' }],
-  includes: '',
-  excludes: '',
-  departures: [{ date: '', capacity: 8 }],
-  featured: false,
-};
-
-export const draftFromTour = () => empty;
+const rowId = () => crypto.randomUUID();
+
+export const empty = () => ({
+  title: '',
+  region: '',
+  theme: '城市',
+  days: 2,
+  price: 0,
+  images: [{ id: rowId(), url: '' }],
+  intro: '',
+  highlights: '',
+  itinerary: [{ id: rowId(), title: '', body: '' }],
+  includes: '',
+  excludes: '',
+  departures: [{ id: rowId(), date: '', capacity: 8 }],
+  featured: false,
+});
+
+export const draftFromTour = (tour) => ({
+  title: tour.title,
+  region: tour.region,
+  theme: tour.theme,
+  days: tour.days,
+  price: tour.price,
+  images: tour.images?.length
+    ? tour.images.map((url) => ({ id: rowId(), url }))
+    : [{ id: rowId(), url: '' }],
+  intro: tour.intro,
+  highlights: (tour.highlights ?? []).join('\n'),
+  itinerary: tour.itinerary?.length
+    ? tour.itinerary.map(({ title, body }) => ({ id: rowId(), title, body }))
+    : [{ id: rowId(), title: '', body: '' }],
+  includes: (tour.includes ?? []).join('\n'),
+  excludes: (tour.excludes ?? []).join('\n'),
+  departures: tour.departures?.length
+    ? tour.departures.map(({ date, capacity }) => ({
+        id: rowId(),
+        date,
+        capacity,
+      }))
+    : [{ id: rowId(), date: '', capacity: 8 }],
+  featured: Boolean(tour.featured),
+});

 export const tourFromDraft = (draft) => {
 // ...
-    .map((item) => String(item).trim())
+    .map((item) => String(item.url ?? '').trim())
 // ...
```

**解析**

- 草稿相關函式都留在 `tourDraft.js`。`empty()` 每次回傳一份新的空白草稿，主題預設「城市」，圖庫、每日行程與出發梯次各先放一列空白，名額預設 8。
- `draftFromTour` 把行程轉成表單：亮點與費用用換行接回一段文字；圖庫、每日行程與出發梯次做成列。沒有列時各放一列空白，方便接著改。
- 每一列有一個只活在草稿裡的 `id`，當 React 的 `key`；刪列或重排時才不會用 `index` 對錯列。存檔時 `tourFromDraft` 會拿掉它，圖庫存回網址字串，出發梯次的 `id` 仍用日期。

### 步驟 5：DraftRows

多列輸入抽成 `DraftRows`，避免圖庫、每日行程與出發梯次各寫一套新增與刪除。

```jsx 06-project-init/src/features/admin/components/DraftRows.jsx
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function DraftRows({
  title,
  items,
  blank,
  addLabel,
  onChange,
  children,
}) {
  const update = (index, next) =>
    onChange(items.map((item, current) => (current === index ? next : item)));
  const remove = (index) =>
    onChange(items.filter((_, current) => current !== index));

  return (
    <div className="sm:col-span-2 grid gap-4">
      <Typography variant="h3">{title}</Typography>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {children(item, index, update)}
          </div>
          <Button
            type="button"
            color="error"
            variant="outlined"
            onClick={() => remove(index)}
          >
            刪除
          </Button>
        </div>
      ))}
      <div>
        <Button
          type="button"
          variant="outlined"
          onClick={() =>
            onChange([...items, { ...blank, id: crypto.randomUUID() }])
          }
        >
          {addLabel}
        </Button>
      </div>
    </div>
  );
}
```

**解析**

- `DraftRows` 負責多列輸入的新增與刪除：「刪除」用 `filter` 拿掉那一列，新增鈕在 `items` 後面接上一份 `blank`，並補一個新的 `id`。列的 `key` 用草稿上的 `id`。
- 每一列裡要放哪些欄位，由呼叫端用 `children` 這個函式傳進來。下一步的 `TourForm` 會用它畫出圖庫、每日行程與出發梯次。
- 這個元件還沒有人使用，所以畫面上暫時看不到變化。

### 步驟 6：行程表單

組出新增與編輯共用的表單，再接到這一頁的 action。

#### 步驟 6-1：Dialog 與基本欄位

組出表單的 Dialog 與基本欄位。草稿用 `empty` 與 `draftFromTour`。儲存與取消按鈕先畫出來，此刻還不能送出。

```jsx 06-project-init/src/features/admin/components/TourForm.jsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { themes } from '../../tours/mock.data.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';
import { draftFromTour, empty } from './tourDraft.js';

export default function TourForm({ open, tour, onClose }) {
  const [draft, setDraft] = useState(() =>
    tour ? draftFromTour(tour) : empty(),
  );
  const set = (key) => (event) =>
    setDraft((current) => ({ ...current, [key]: event.target.value }));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <form id="admin-form">
        <DialogTitle>{tour ? '編輯行程' : '新增行程'}</DialogTitle>
        <DialogContent className="grid gap-4 pt-2 sm:grid-cols-2">
          <TextField
            className="sm:col-span-2"
            label="標題"
            value={draft.title}
            onChange={set('title')}
          />
          <TextField
            label="地區"
            value={draft.region}
            onChange={set('region')}
          />
          <FieldSelect
            id="theme"
            label="主題"
            value={draft.theme}
            onChange={(value) =>
              setDraft((current) => ({ ...current, theme: value }))
            }
            options={themes.map((item) => ({ value: item, label: item }))}
          />
          <TextField
            label="天數"
            type="number"
            slotProps={{ htmlInput: { min: 1 } }}
            value={draft.days}
            onChange={set('days')}
          />
          <TextField
            label="價格"
            type="number"
            slotProps={{ htmlInput: { min: 0 } }}
            value={draft.price}
            onChange={set('price')}
          />
          <TextField
            className="sm:col-span-2"
            label="簡介"
            multiline
            minRows={3}
            value={draft.intro}
            onChange={set('intro')}
          />
          <TextField
            className="sm:col-span-2"
            label="亮點"
            multiline
            minRows={3}
            helperText="一行一則"
            value={draft.highlights}
            onChange={set('highlights')}
          />
          <TextField
            className="sm:col-span-2"
            label="費用包含"
            multiline
            minRows={3}
            helperText="一行一則"
            value={draft.includes}
            onChange={set('includes')}
          />
          <TextField
            className="sm:col-span-2"
            label="費用不含"
            multiline
            minRows={3}
            helperText="一行一則"
            value={draft.excludes}
            onChange={set('excludes')}
          />
          <FormControlLabel
            className="sm:col-span-2"
            control={
              <Checkbox
                checked={draft.featured}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    featured: event.target.checked,
                  }))
                }
              />
            }
            label="精選，出現在首頁輪播與熱門"
          />
        </DialogContent>
        <DialogActions className="flex-wrap gap-2 p-4">
          <Button type="button" variant="contained">
            儲存
          </Button>
          <Button type="button" onClick={onClose}>
            取消
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
```

**解析**

- 沒有帶入行程是新增，有帶入是編輯，標題依此切換。草稿存在元件自己的 state，新增用 `empty()` 起頭，編輯用 `draftFromTour(tour)` 起頭；打開「新增行程」是空白欄位，打開「編輯」則看到該筆的內容。
- 文字欄共用 `set(key)` 產生 `onChange`；主題與精選的值不是從 `event.target.value` 來，所以直接改 `draft`。
- 儲存是 `type="button"`，此刻不會送出；取消呼叫 `onClose`。

#### 步驟 6-2：接上 DraftRows

把圖庫、每日行程與出發梯次接到 `DraftRows`。

```diff 06-project-init/src/features/admin/components/TourForm.jsx
 import FieldSelect from '../../../_shared/FieldSelect.jsx';
+import DraftRows from './DraftRows.jsx';
 import { draftFromTour, empty } from './tourDraft.js';
 
 export default function TourForm({ open, tour, onClose }) {
   const [draft, setDraft] = useState(() =>
     tour ? draftFromTour(tour) : empty(),
   );
   const set = (key) => (event) =>
     setDraft((current) => ({ ...current, [key]: event.target.value }));
+  const setList = (key) => (items) =>
+    setDraft((current) => ({ ...current, [key]: items }));
 
   return (
 // ...
         <DialogContent className="grid gap-4 pt-2 sm:grid-cols-2">
+          <p className="text-muted sm:col-span-2">
+            圖庫、每日行程與出發梯次可增刪列。空的網址列會略過。封面用圖庫第一張。
+          </p>
           <TextField
             className="sm:col-span-2"
             label="標題"
 // ...
             onChange={set('excludes')}
           />
+          <DraftRows
+            title="圖庫網址"
+            items={draft.images}
+            blank={{ url: '' }}
+            addLabel="新增一張"
+            onChange={setList('images')}
+          >
+            {(item, index, update) => (
+              <TextField
+                className="sm:col-span-2"
+                label={`第 ${index + 1} 張網址`}
+                type="url"
+                helperText={
+                  index === 0 ? '第一張會當作列表與輪播的封面' : undefined
+                }
+                value={item.url}
+                onChange={(event) =>
+                  update(index, { ...item, url: event.target.value })
+                }
+              />
+            )}
+          </DraftRows>
+          <DraftRows
+            title="每日行程"
+            items={draft.itinerary}
+            blank={{ title: '', body: '' }}
+            addLabel="新增一天"
+            onChange={setList('itinerary')}
+          >
+            {(item, index, update) => (
+              <>
+                <p className="text-muted sm:col-span-2">第 {index + 1} 天</p>
+                <TextField
+                  className="sm:col-span-2"
+                  label="當日標題"
+                  value={item.title}
+                  onChange={(event) =>
+                    update(index, { ...item, title: event.target.value })
+                  }
+                />
+                <TextField
+                  className="sm:col-span-2"
+                  label="當日說明"
+                  multiline
+                  minRows={2}
+                  value={item.body}
+                  onChange={(event) =>
+                    update(index, { ...item, body: event.target.value })
+                  }
+                />
+              </>
+            )}
+          </DraftRows>
+          <DraftRows
+            title="出發梯次"
+            items={draft.departures}
+            blank={{ date: '', capacity: 8 }}
+            addLabel="新增一梯"
+            onChange={setList('departures')}
+          >
+            {(item, index, update) => (
+              <>
+                <TextField
+                  label="出發日"
+                  type="date"
+                  slotProps={{ inputLabel: { shrink: true } }}
+                  value={item.date}
+                  onChange={(event) =>
+                    update(index, { ...item, date: event.target.value })
+                  }
+                />
+                <TextField
+                  label="名額"
+                  type="number"
+                  slotProps={{ htmlInput: { min: 1 } }}
+                  value={item.capacity}
+                  onChange={(event) =>
+                    update(index, { ...item, capacity: event.target.value })
+                  }
+                />
+              </>
+            )}
+          </DraftRows>
           <FormControlLabel
             className="sm:col-span-2"
             control={
 // ...
```

**解析**

- `setList(key)` 用來整組換掉圖庫、每日行程或出發梯次的列。
- 表單下方多了三組列，各有「刪除」與「新增一張」「新增一天」「新增一梯」鈕。
- 圖庫第一張會當作列表與輪播的封面，空的網址列在存檔時會略過。
- 每日行程只顯示「第 n 天」，存檔時才編成 `day`。出發梯次填出發日與名額。

#### 步驟 6-3：送出草稿

用 `useFetcher` 送出草稿：送出期間按鈕不能再按，失敗時在表單上方顯示錯誤。`action` 與路由要到下一步才接上，所以這一步完成後先不要按「儲存」。

```diff 06-project-init/src/features/admin/components/TourForm.jsx
-import { useState } from 'react';
+import { useState } from 'react';
+import { useFetcher } from 'react-router';
+import Alert from '@mui/material/Alert';
 import Button from '@mui/material/Button';
 // ...
+/**
+ * 新增與編輯行程的 Dialog。open 控制開關，tour 有值是編輯、沒有是新增，onClose 只給取消鈕。
+ * useFetcher({ key: 'tour-form' }) 與 AdminToursPage 共用同一個 fetcher；只負責送出草稿，結果由頁面讀取。
+ * @param {{ open: boolean, tour: object | null, onClose: () => void }} props
+ * @returns {JSX.Element}
+ */
 export default function TourForm({ open, tour, onClose }) {
+  const editingId = tour?.id ?? null;
+  const fetcher = useFetcher({ key: 'tour-form' });
+  const error =
+    fetcher.state === 'idle' && fetcher.data?.error ? fetcher.data.error : '';
   const [draft, setDraft] = useState(() =>
     tour ? draftFromTour(tour) : empty(),
   );
   const set = (key) => (event) =>
     setDraft((current) => ({ ...current, [key]: event.target.value }));
   const setList = (key) => (items) =>
     setDraft((current) => ({ ...current, [key]: items }));
 
+  const submit = (event) => {
+    event.preventDefault();
+    fetcher.submit(
+      {
+        intent: 'save',
+        editingId: editingId ?? '',
+        draft: JSON.stringify(draft),
+      },
+      { method: 'post' },
+    );
+  };
+
   return (
     <Dialog
       open={open}
       onClose={onClose}
       fullWidth
       maxWidth="md"
       scroll="paper"
     >
-      <form id="admin-form">
+      <form id="admin-form" onSubmit={submit}>
         <DialogTitle>{tour ? '編輯行程' : '新增行程'}</DialogTitle>
         <DialogContent className="grid gap-4 pt-2 sm:grid-cols-2">
           <p className="text-muted sm:col-span-2">
             圖庫、每日行程與出發梯次可增刪列。空的網址列會略過。封面用圖庫第一張。
           </p>
+          {error ? (
+            <Alert className="sm:col-span-2" severity="error">
+              {error}
+            </Alert>
+          ) : null}
           <TextField
             className="sm:col-span-2"
             label="標題"
 // ...
         <DialogActions className="flex-wrap gap-2 p-4">
-          <Button type="button" variant="contained">
+          <Button
+            type="submit"
+            variant="contained"
+            disabled={fetcher.state !== 'idle'}
+          >
             儲存
           </Button>
           <Button type="button" onClick={onClose}>
 // ...
```

**解析**

- `useFetcher({ key: 'tour-form' })` 的 `key` 讓表單與頁面拿到同一個 `fetcher`。表單用 `fetcher.submit` 只負責送出，不會回傳 `action` 的結果，結果由頁面讀。
- 送出的資料帶 `intent: 'save'`、`editingId` 與轉成 JSON 字串的 `draft`，送出後不會換頁。
- `error` 只在 `fetcher.state` 是 `idle` 且有 `fetcher.data.error` 時顯示，避免送出途中還顯示舊的錯誤。
- 儲存改成 `type="submit"`，`fetcher` 不是 `idle` 時按鈕不能按。`onClose` 只給取消鈕用。

#### 步驟 6-4：接到 action，成功後關閉並提示

成功提示抽成 `NoticeSnackbar`，放在 `src/_shared`。行程管理與報名清單都會用到。

```jsx 06-project-init/src/_shared/NoticeSnackbar.jsx
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function NoticeSnackbar({ notice, onClose }) {
  return (
    <Snackbar
      open={Boolean(notice)}
      autoHideDuration={3200}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="success" variant="filled" onClose={onClose}>
        {notice}
      </Alert>
    </Snackbar>
  );
}
```

**解析**

- `notice` 有字才打開，約 3.2 秒後或按下關閉會呼叫 `onClose`。位置在畫面下方置中。

頁面用同一個 `key` 讀取送出結果。成功時關閉 Dialog，並交給 `NoticeSnackbar`。

```diff 06-project-init/src/features/admin/AdminToursPage.jsx
 import { useState } from 'react';
-import { useLoaderData } from 'react-router';
+import { useFetcher, useLoaderData } from 'react-router';
 import Button from '@mui/material/Button';
 import Typography from '@mui/material/Typography';
 import TourTable from './components/TourTable.jsx';
 import TourForm from './components/TourForm.jsx';
-import { getTours } from '../../store.js';
+import NoticeSnackbar from '../../_shared/NoticeSnackbar.jsx';
+import { getTours, saveTour } from '../../store.js';
 
 export const loader = () => ({ tours: getTours() });
 
+export const action = async ({ request }) => {
+  const form = await request.formData();
+  const editingId = String(form.get('editingId') ?? '');
+  const error = saveTour(editingId, JSON.parse(String(form.get('draft'))));
+  return error ? { error } : { notice: '已儲存這筆行程', saved: true };
+};
+
 export default function AdminToursPage() {
   const { tours } = useLoaderData();
+  const save = useFetcher({ key: 'tour-form' });
   const [open, setOpen] = useState(false);
   const [tour, setTour] = useState(null);
+  const [notice, setNotice] = useState('');
+  const [seenSave, setSeenSave] = useState(null);
+  if (save.state === 'idle' && save.data?.saved && save.data !== seenSave) {
+    setSeenSave(save.data);
+    setOpen(false);
+    setNotice(save.data.notice);
+  }
+
   const close = () => setOpen(false);
+  const openTour = (item) => {
+    save.reset();
+    setTour(item);
+    setOpen(true);
+  };
 // ...
-        <Button
-          variant="outlined"
-          onClick={() => {
-            setTour(null);
-            setOpen(true);
-          }}
-        >
+        <Button variant="outlined" onClick={() => openTour(null)}>
           新增行程
         </Button>
 // ...
-      <TourTable
-        tours={tours}
-        onEdit={(item) => {
-          setTour(item);
-          setOpen(true);
-        }}
-      />
+      <TourTable tours={tours} onEdit={openTour} />
       <TourForm
         key={open ? (tour?.id ?? 'create') : 'closed'}
         open={open}
         tour={tour}
         onClose={close}
       />
+      <NoticeSnackbar notice={notice} onClose={() => setNotice('')} />
     </main>
 // ...
```

**解析**

- `action` 讀編輯中的 `id` 與草稿，交給 `saveTour`。失敗回傳 `{ error }`，成功回傳 `{ notice: '已儲存這筆行程', saved: true }`。`action` 跑完後 `loader` 會再跑一次，所以列表立刻更新，新增的行程排在最前面。
- 頁面用同一個 `key` 的 `save` 讀送出結果。回到 `idle` 且有尚未處理的 `saved: true` 時，就關閉 Dialog，並把提示文字交給 `NoticeSnackbar`。這段直接寫在渲染過程中比對，不用 `useEffect`；`seenSave` 記住已處理的結果，同一筆不會重複處理。
- 打開 Dialog 時呼叫 `save.reset()`，清掉共用 fetcher 上一次留下的資料，重開時才不會還顯示舊的錯誤。
- 在畫面上試一次：標題留空按儲存，表單上方出現紅色的「標題要填」；填好標題再儲存，Dialog 關閉，畫面下方出現「已儲存這筆行程」。

同一個 `key` 的寫法見[第十一篇〈用 key 共用 fetcher〉](/2026/08-30/lokiTech-15day-11-react-router/#用-key-共用-fetcher)。

把 `action` 接到 `/admin`。

```diff 06-project-init/src/App.jsx
 import AdminToursPage, {
-  loader as adminToursLoader,
+  action as adminToursAction,
+  loader as adminToursLoader,
 } from './features/admin/AdminToursPage.jsx';
 // ...
           {
             path: 'admin',
             loader: adminToursLoader,
+            action: adminToursAction,
             element: <AdminToursPage />,
           },
 // ...
```

**解析**

- `/admin` 加上 `action`。表單的 `fetcher.submit` 會送到這一頁的 `action`，不會換頁。

### 步驟 7：刪除行程

最後補上刪除。先寫確認用的 Dialog。

```jsx 06-project-init/src/features/admin/components/DeleteTourDialog.jsx
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteTourDialog({ tour, busy, onClose, onConfirm }) {
  return (
    <Dialog open={Boolean(tour)} onClose={onClose}>
      <DialogTitle>刪除這筆行程？</DialogTitle>
      <DialogContent>刪除後，這筆行程不會再出現在列表。</DialogContent>
      <DialogActions className="gap-2 p-4">
        <Button onClick={onClose}>留下</Button>
        <Button
          color="error"
          variant="contained"
          disabled={busy}
          onClick={onConfirm}
        >
          刪除
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

**解析**

- 有要刪的行程才打開。按下「刪除」時呼叫頁面傳入的 `onConfirm`；`busy` 為真時按鈕不能再按。

表格的操作欄加上「刪除」。

```diff 06-project-init/src/features/admin/components/TourTable.jsx
-export default function TourTable({ tours, onEdit }) {
+export default function TourTable({ tours, onEdit, onDelete }) {
   return (
 // ...
                     <Button
                       variant="contained"
                       disableElevation
                       color="primary"
                       onClick={() => onEdit(tour)}
                     >
                       編輯
                     </Button>
+                    <Button
+                      variant="contained"
+                      disableElevation
+                      color="error"
+                      onClick={() => onDelete(tour)}
+                    >
+                      刪除
+                    </Button>
                   </div>
                 </TableCell>
 // ...
                 onClick={() => onEdit(tour)}
               >
                 編輯
               </Button>
+              <Button
+                variant="contained"
+                disableElevation
+                color="error"
+                onClick={() => onDelete(tour)}
+              >
+                刪除
+              </Button>
             </div>
           </Card>
 // ...
```

**解析**

- 桌機表格與窄螢幕卡片都加上「刪除」，交給頁面的 `onDelete`。「刪除」用 `color="error"` 的實心鈕。

頁面加上刪除的 `action` 分支，並接上確認 Dialog。

```diff 06-project-init/src/features/admin/AdminToursPage.jsx
 import Button from '@mui/material/Button';
 import Typography from '@mui/material/Typography';
+import DeleteTourDialog from './components/DeleteTourDialog.jsx';
 import TourTable from './components/TourTable.jsx';
 import TourForm from './components/TourForm.jsx';
 import NoticeSnackbar from '../../_shared/NoticeSnackbar.jsx';
-import { getTours, saveTour } from '../../store.js';
+import { deleteTour, getTours, saveTour } from '../../store.js';
 
+/**
+ * 行程管理頁的 loader。進頁前呼叫 getTours，回傳值交給頁面的 useLoaderData。
+ * @returns {{ tours: object[] }}
+ */
 export const loader = () => ({ tours: getTours() });
 
+/**
+ * 接收這一頁的表單。intent 為 delete 時刪除該筆並回傳 { notice }。
+ * 否則讀 editingId 與 draft，交給 saveTour。失敗回傳 { error }，成功回傳 { notice, saved: true }。
+ * 同一 key 的 useFetcher 可從 fetcher.data 讀到這份結果。
+ * @param {{ request: Request }} args
+ * @returns {Promise<{ notice: string, saved?: boolean } | { error: string }>}
+ */
 export const action = async ({ request }) => {
   const form = await request.formData();
+  if (form.get('intent') === 'delete') {
+    deleteTour(String(form.get('id')));
+    return { notice: '已刪除這筆行程' };
+  }
   const editingId = String(form.get('editingId') ?? '');
   const error = saveTour(editingId, JSON.parse(String(form.get('draft'))));
   return error ? { error } : { notice: '已儲存這筆行程', saved: true };
 };
 
+/**
+ * 行程管理頁。useFetcher({ key: 'tour-form' }) 與 TourForm 共用同一個 fetcher。
+ * 渲染時比對尚未處理的 save.data；有 { saved: true } 就關窗並寫入 notice。
+ * 打開 Dialog 時呼叫 save.reset()，清掉上一次留下的資料。刪除另用一個沒有 key 的 fetcher。
+ * @returns {JSX.Element}
+ */
 export default function AdminToursPage() {
   const { tours } = useLoaderData();
   const save = useFetcher({ key: 'tour-form' });
+  const remove = useFetcher();
   const [open, setOpen] = useState(false);
   const [tour, setTour] = useState(null);
+  const [deletingTour, setDeletingTour] = useState(null);
   const [notice, setNotice] = useState('');
   const [seenSave, setSeenSave] = useState(null);
+  const [seenRemove, setSeenRemove] = useState(null);
   if (save.state === 'idle' && save.data?.saved && save.data !== seenSave) {
     setSeenSave(save.data);
     setOpen(false);
     setNotice(save.data.notice);
   }
+  if (
+    remove.state === 'idle' &&
+    remove.data?.notice &&
+    remove.data !== seenRemove
+  ) {
+    setSeenRemove(remove.data);
+    setDeletingTour(null);
+    setNotice(remove.data.notice);
+  }
 
   const close = () => setOpen(false);
   const openTour = (item) => {
     save.reset();
     setTour(item);
     setOpen(true);
   };
 // ...
-      <TourTable tours={tours} onEdit={openTour} />
+      <TourTable tours={tours} onEdit={openTour} onDelete={setDeletingTour} />
       <TourForm
         key={open ? (tour?.id ?? 'create') : 'closed'}
         open={open}
         tour={tour}
         onClose={close}
       />
+      <DeleteTourDialog
+        tour={deletingTour}
+        busy={remove.state !== 'idle'}
+        onClose={() => setDeletingTour(null)}
+        onConfirm={() =>
+          remove.submit(
+            { intent: 'delete', id: deletingTour?.id },
+            { method: 'post' },
+          )
+        }
+      />
       <NoticeSnackbar notice={notice} onClose={() => setNotice('')} />
     </main>
 // ...
```

**解析**

- `action` 看到 `intent` 是 `delete` 就呼叫 `deleteTour`，回傳「已刪除這筆行程」。
- 操作欄的「刪除」先把該筆放到 `deletingTour`，打開確認 Dialog。確認後用 `remove.submit` 送出，不會換頁，送出期間「刪除」不能再按。
- `remove` 是另一個沒有 `key` 的 `fetcher`，不與表單共用。它回到 `idle` 且有尚未處理的 `notice` 時，關閉確認 Dialog 並交給 `NoticeSnackbar`，同一筆也只處理一次，做法與儲存相同。
- `onConfirm` 裡寫 `deletingTour?.id`，用 `?.` 是刻意的：`deletingTour` 在沒有要刪的行程時是 `null`，而 React Compiler 會在渲染時就先讀閉包用到的 `deletingTour.id`，直接寫 `.id` 會讓整頁在渲染時出錯。
- 在畫面上試一次：按「刪除」先看到確認視窗，按「留下」只關閉視窗；按確認的「刪除」，那一列消失，畫面下方出現「已刪除這筆行程」。

## 報名清單

清單讀的是詳情頁已經放進 Store 的四筆種子，再加上這次在瀏覽器裡送出的報名。列表只放摘要，點「查看」才用 Dialog 看明細並改狀態，按「儲存」才送出；改的是記憶體，重新整理就回到種子。做法與行程管理相同。

這一節要組出 `AdminBookingsPage`。畫面拆成篩選列、表格與明細表單，成功提示沿用 `NoticeSnackbar`。先組出這一頁並接到路由，表格與明細先放標記，再換成表格與篩選，然後組出明細與送出。

{% mermaid graph TD %}
  page["AdminBookingsPage"] --> filters["BookingFilters"]
  page --> table["BookingTable"]
  page --> form["BookingForm"]
  page --> notice["NoticeSnackbar"]
{% endmermaid %}

### 步驟 1：組出 AdminBookingsPage

先把報名清單組起來並接到路由，表格與明細先放標記。`loader` 讀清單，`open` 與 `booking` 這兩個 state 控制 Dialog。

表格先放標記。

```jsx 06-project-init/src/features/admin/components/BookingTable.jsx
export default function BookingTable() {
  return <p className="mt-8">報名表格</p>;
}
```

**解析**

- 先回傳標記文字，標出報名表格的位置。

明細先放標記。

```jsx 06-project-init/src/features/admin/components/BookingForm.jsx
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function BookingForm({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>報名明細</DialogTitle>
      <DialogContent>報名表單</DialogContent>
    </Dialog>
  );
}
```

**解析**

- 先回傳標記文字，標出查看明細的 Dialog 位置。

接著組出報名清單頁。表格與明細目前是標記。

```jsx 06-project-init/src/features/admin/AdminBookingsPage.jsx
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingTable from './components/BookingTable.jsx';
import BookingForm from './components/BookingForm.jsx';
import { getBookings } from '../../store.js';

export const loader = () => ({ bookings: getBookings() });

export default function AdminBookingsPage() {
  const { bookings } = useLoaderData();
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(null);
  const close = () => setOpen(false);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名清單 · 洛奇旅行</title>
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        報名清單
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        查看所有報名，點一筆看明細並改狀態。兩頁用頁首切換。
      </p>
      <BookingTable
        bookings={bookings}
        onView={(item) => {
          setBooking(item);
          setOpen(true);
        }}
      />
      <BookingForm
        key={open ? booking.id : 'closed'}
        open={open}
        booking={booking}
        onClose={close}
      />
    </main>
  );
}
```

**解析**

- 直接打開 `/admin/bookings` 就看得到這一頁：標題「報名清單」，下面只有「報名表格」這行標記。`loader` 回傳 `getBookings()`。
- `open` 與 `booking` 控制 Dialog：點「查看」時帶入該筆再開窗，不另開路由。表格還是標記時，`onView` 還不會被用到。
- `key` 依開窗與報名編號重掛表單，表單的狀態才會從這一筆的資料開始。

接著把 `/admin/bookings` 換成這一頁。路由先接上 `loader`。

```diff 06-project-init/src/App.jsx
 import AdminToursPage, {
   action as adminToursAction,
   loader as adminToursLoader,
 } from './features/admin/AdminToursPage.jsx';
+import AdminBookingsPage, {
+  loader as adminBookingsLoader,
+} from './features/admin/AdminBookingsPage.jsx';
 // ...
           },
-          { path: 'admin/bookings', element: <Placeholder title="後台報名" /> },
+          {
+            path: 'admin/bookings',
+            loader: adminBookingsLoader,
+            element: <AdminBookingsPage />,
+          },
           { path: '*', element: <NotFoundPage /> },
```

**解析**

- `/admin/bookings` 從佔位頁換成 `AdminBookingsPage`，並接上 `loader`。

### 步驟 2：報名表格

把報名表格的 placeholder 換成真正的元件。列表只放摘要與「查看」，表頭與分隔線沿用行程表格在 `theme.js` 補的 `MuiTableCell` 樣式。

```jsx 06-project-init/src/features/admin/components/BookingTable.jsx
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { statusLabel } from '../../../format.js';

export default function BookingTable({ bookings, onView }) {
  return (
    <>
      <TableContainer
        elevation={0}
        className="rounded-card bg-white shadow-card mt-8 hidden overflow-x-auto md:block"
      >
        <Table>
          <TableHead>
            <TableRow>
              {['行程', '出發日', '姓名', '狀態', '操作'].map((label) => (
                <TableCell key={label} className="whitespace-nowrap px-4 py-3">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="px-4 py-4">{booking.tourTitle}</TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4">
                  {booking.date}
                </TableCell>
                <TableCell className="px-4 py-4">{booking.name}</TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4">
                  {statusLabel[booking.status] || booking.status}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={() => onView(booking)}
                  >
                    查看
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-8 grid gap-4 md:hidden">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-6">
            <h3 className="font-serif text-2xl font-semibold">
              {booking.tourTitle}
            </h3>
            <p className="mt-2 text-muted">
              {booking.date} · {booking.name} ·{' '}
              {statusLabel[booking.status] || booking.status}
            </p>
            <Button
              className="mt-3"
              variant="contained"
              disableElevation
              color="primary"
              onClick={() => onView(booking)}
            >
              查看
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
```

**解析**

- 列表只放行程、出發日、姓名、狀態與「查看」，完整欄位留給明細 Dialog。狀態用 `statusLabel` 轉成「待確認」「已確認」「已取消」。打開 `/admin/bookings` 會看到四筆報名。
- `md` 以上是表格，窄螢幕是卡片，兩邊都有「查看」。按鈕樣式跟行程列表的「編輯」相同：實心、沒有陰影的主色鈕。
- 按「查看」會把該筆交給 `onView`，頁面打開同一個 Dialog，標題是「報名明細」；明細內容在步驟 4 才補。

### 步驟 3：篩選

狀態與姓名的篩選、出發日的排序寫成 `BookingFilters`，頁面再用這三個值算出要顯示的報名。

```jsx 06-project-init/src/features/admin/components/BookingFilters.jsx
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { statusLabel } from '../../../format.js';

const statusOptions = ['all', 'pending', 'confirmed', 'cancelled'];

export default function BookingFilters({
  status,
  query,
  sort,
  onStatusChange,
  onQueryChange,
  onSortChange,
}) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,14rem)]">
      <TextField
        select
        label="狀態"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        {statusOptions.map((value) => (
          <MenuItem key={value} value={value}>
            {value === 'all' ? '全部' : statusLabel[value]}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="搜尋姓名"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="輸入姓名"
      />
      <TextField
        select
        label="日期排序"
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <MenuItem value="date-desc">出發日新到舊</MenuItem>
        <MenuItem value="date-asc">出發日舊到新</MenuItem>
      </TextField>
    </div>
  );
}
```

**解析**

- `BookingFilters` 自己不存狀態，三個欄位的值與變更都由頁面傳入。狀態選項的標籤沿用 `statusLabel`，「全部」對應 `all`。

把篩選接到這一頁。有結果才渲染表格，否則顯示「沒有符合的報名」。

```diff 06-project-init/src/features/admin/AdminBookingsPage.jsx
 import { useState } from 'react';
 import { useLoaderData } from 'react-router';
 import Typography from '@mui/material/Typography';
+import BookingFilters from './components/BookingFilters.jsx';
 import BookingTable from './components/BookingTable.jsx';
 import BookingForm from './components/BookingForm.jsx';
 import { getBookings } from '../../store.js';
 // ...
 export default function AdminBookingsPage() {
   const { bookings } = useLoaderData();
+  const [status, setStatus] = useState('all');
+  const [query, setQuery] = useState('');
+  const [sort, setSort] = useState('date-desc');
   const [open, setOpen] = useState(false);
   const [booking, setBooking] = useState(null);
+
+  const keyword = query.trim();
+  const shown = bookings
+    .filter((item) => status === 'all' || item.status === status)
+    .filter((item) => !keyword || item.name.includes(keyword))
+    .sort((a, b) =>
+      sort === 'date-asc'
+        ? a.date.localeCompare(b.date)
+        : b.date.localeCompare(a.date),
+    );
+
   const close = () => setOpen(false);
 // ...
         查看所有報名，點一筆看明細並改狀態。兩頁用頁首切換。
       </p>
-      <BookingTable
-        bookings={bookings}
-        onView={(item) => {
-          setBooking(item);
-          setOpen(true);
-        }}
-      />
+      <BookingFilters
+        status={status}
+        query={query}
+        sort={sort}
+        onStatusChange={setStatus}
+        onQueryChange={setQuery}
+        onSortChange={setSort}
+      />
+      {shown.length ? (
+        <BookingTable
+          bookings={shown}
+          onView={(item) => {
+            setBooking(item);
+            setOpen(true);
+          }}
+        />
+      ) : (
+        <p className="mt-8 text-base text-muted">沒有符合的報名。</p>
+      )}
       <BookingForm
 // ...
```

**解析**

- 篩選與排序在頁面裡算：先依狀態，再依姓名是否包含關鍵字，最後依出發日排序，結果是 `shown`，表格改拿它來畫。
- 有結果才渲染 `BookingTable`，否則顯示「沒有符合的報名」。例如姓名打成對不上的字，就能看到這段提示。

### 步驟 4：報名明細

把明細的 placeholder 換成真正的 Dialog。看完整欄位，並用下拉選狀態。儲存與取消按鈕先畫出來，此刻還不能送出。

```jsx 06-project-init/src/features/admin/components/BookingForm.jsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FieldSelect from '../../../_shared/FieldSelect.jsx';
import { ntd, statusLabel } from '../../../format.js';

const statuses = ['pending', 'confirmed', 'cancelled'];

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <dt className="text-muted">{label}</dt>
    <dd className="text-right">{value}</dd>
  </div>
);

export default function BookingForm({ open, booking, onClose }) {
  const [status, setStatus] = useState(booking?.status ?? 'pending');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <form>
        <DialogTitle>報名明細</DialogTitle>
        <DialogContent className="grid gap-4 pt-2">
          {booking ? (
            <dl className="grid gap-2 text-base">
              <Row label="行程" value={booking.tourTitle} />
              <Row label="出發日" value={booking.date} />
              <Row label="聯絡人" value={booking.name} />
              <Row label="Email" value={booking.email} />
              <Row label="電話" value={booking.phone} />
              <Row label="人數" value={booking.people} />
              <Row label="金額" value={ntd(booking.subtotal)} />
            </dl>
          ) : null}
          <FieldSelect
            id="booking-status"
            label="狀態"
            value={status}
            onChange={setStatus}
            options={statuses.map((item) => ({
              value: item,
              label: statusLabel[item],
            }))}
          />
        </DialogContent>
        <DialogActions className="flex-wrap gap-2 p-4">
          <Button type="button" variant="contained">
            儲存
          </Button>
          <Button type="button" onClick={onClose}>
            取消
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
```

**解析**

- 按「查看」，Dialog 列出行程、出發日、聯絡人、email、電話、人數與金額，底部是狀態下拉。`Row` 把「標籤加值」這一行抽成小元件。
- 狀態的初始值取自這一筆的 `status`；`key` 重掛表單，所以每次開窗都從該筆的狀態開始。
- 儲存是 `type="button"`，此刻不會送出；取消呼叫 `onClose`。

### 步驟 5：送出狀態

用 `useFetcher` 把新狀態送到這一頁的 `action`。表單只負責送出；成功後由頁面關閉 Dialog，並交給 `NoticeSnackbar` 顯示提示。`action` 與路由在後面兩段才接上，接好之前不要按「儲存」。

```diff 06-project-init/src/features/admin/components/BookingForm.jsx
 import { useState } from 'react';
+import { useFetcher } from 'react-router';
+import Alert from '@mui/material/Alert';
 import Button from '@mui/material/Button';
 // ...
+/**
+ * 報名明細 Dialog。open 控制開關，booking 是這一筆報名，onClose 只給取消鈕。
+ * useFetcher({ key: 'booking-form' }) 與 AdminBookingsPage 共用同一個 fetcher；只負責送出新狀態，結果由頁面讀取。
+ * @param {{ open: boolean, booking: object | null, onClose: () => void }} props
+ * @returns {JSX.Element}
+ */
 export default function BookingForm({ open, booking, onClose }) {
+  const fetcher = useFetcher({ key: 'booking-form' });
+  const error =
+    fetcher.state === 'idle' && fetcher.data?.error ? fetcher.data.error : '';
   const [status, setStatus] = useState(booking?.status ?? 'pending');
 
+  const commit = () => {
+    fetcher.submit({ id: booking?.id, status }, { method: 'post' });
+  };
+
+  const submit = (event) => {
+    event.preventDefault();
+    commit();
+  };
+
   return (
     <Dialog
       open={open}
       onClose={onClose}
       fullWidth
       maxWidth="sm"
       scroll="paper"
     >
-      <form>
+      <form onSubmit={submit}>
         <DialogTitle>報名明細</DialogTitle>
         <DialogContent className="grid gap-4 pt-2">
           {booking ? (
             <dl className="grid gap-2 text-base">
 // ...
             </dl>
           ) : null}
+          {error ? <Alert severity="error">{error}</Alert> : null}
           <FieldSelect
             id="booking-status"
             label="狀態"
 // ...
         <DialogActions className="flex-wrap gap-2 p-4">
-          <Button type="button" variant="contained">
+          <Button
+            type="submit"
+            variant="contained"
+            disabled={fetcher.state !== 'idle'}
+          >
             儲存
           </Button>
           <Button type="button" onClick={onClose}>
 // ...
```

**解析**

- `useFetcher({ key: 'booking-form' })` 的 `key` 讓表單與頁面拿到同一個 `fetcher`，做法與行程表單相同。按「儲存」才用 `fetcher.submit` 把 `id` 與新狀態送出，不會換頁，結果由頁面讀。
- `fetcher.submit` 裡寫 `booking?.id`：Dialog 關閉時 `booking` 是 `null`，而 React Compiler 會在渲染時先讀閉包用到的值，所以要用 `?.`，原因同前面的 `deletingTour?.id`。
- `error` 只在 `fetcher` 回到 `idle` 且有錯誤資料時顯示。儲存改成 `type="submit"`，`fetcher` 不是 `idle` 時按鈕不能按；`onClose` 只給取消鈕用。

接著在頁面加上 `action`，並接上提示。

```diff 06-project-init/src/features/admin/AdminBookingsPage.jsx
 import { useState } from 'react';
-import { useLoaderData } from 'react-router';
+import { useFetcher, useLoaderData } from 'react-router';
 import Typography from '@mui/material/Typography';
 // ...
 import BookingTable from './components/BookingTable.jsx';
 import BookingForm from './components/BookingForm.jsx';
-import { getBookings } from '../../store.js';
+import NoticeSnackbar from '../../_shared/NoticeSnackbar.jsx';
+import { getBookings, setBookingStatus } from '../../store.js';
 
+/**
+ * 報名清單頁的 loader。進頁前呼叫 getBookings，回傳值交給頁面的 useLoaderData。
+ * @returns {{ bookings: object[] }}
+ */
 export const loader = () => ({ bookings: getBookings() });
 
+/**
+ * 接收明細表單。讀 id 與 status，交給 setBookingStatus，回傳 { notice }。
+ * 同一 key 的 useFetcher 可從 fetcher.data 讀到這份結果。
+ * @param {{ request: Request }} args
+ * @returns {Promise<{ notice: string }>}
+ */
+export const action = async ({ request }) => {
+  const form = await request.formData();
+  setBookingStatus(String(form.get('id')), String(form.get('status')));
+  return { notice: '已更新報名狀態' };
+};
+
+/**
+ * 報名清單頁。useFetcher({ key: 'booking-form' }) 與 BookingForm 共用同一個 fetcher。
+ * 渲染時比對尚未處理的 save.data；有 notice 就關窗並寫入提示。
+ * 打開 Dialog 時呼叫 save.reset()，清掉上一次留下的資料。
+ * @returns {JSX.Element}
+ */
 export default function AdminBookingsPage() {
   const { bookings } = useLoaderData();
+  const save = useFetcher({ key: 'booking-form' });
   const [status, setStatus] = useState('all');
   const [query, setQuery] = useState('');
   const [sort, setSort] = useState('date-desc');
   const [open, setOpen] = useState(false);
   const [booking, setBooking] = useState(null);
+  const [notice, setNotice] = useState('');
+  const [seenSave, setSeenSave] = useState(null);
+  if (save.state === 'idle' && save.data?.notice && save.data !== seenSave) {
+    setSeenSave(save.data);
+    setOpen(false);
+    setNotice(save.data.notice);
+  }
 // ...
           onView={(item) => {
+            save.reset();
             setBooking(item);
             setOpen(true);
           }}
 // ...
       <BookingForm
         key={open ? booking.id : 'closed'}
         open={open}
         booking={booking}
         onClose={close}
       />
+      <NoticeSnackbar notice={notice} onClose={() => setNotice('')} />
     </main>
 // ...
```

**解析**

- `action` 讀 `id` 與狀態，交給 `setBookingStatus`，回傳「已更新報名狀態」。`action` 跑完後 `loader` 會再跑一次，列表立刻更新。
- 頁面用同一個 `key` 的 `save` 讀送出結果。回到 `idle` 且有尚未處理的 `notice` 時，關閉 Dialog 並交給先前抽好的 `NoticeSnackbar`，結果同樣只處理一次。
- 提示在 Dialog 關閉後出現在畫面下方置中，約 3.2 秒後或按關閉就消失。
- 打開 Dialog 時呼叫 `save.reset()`，清掉共用 fetcher 上一次留下的資料，重開時才不會還顯示舊的狀態。

把 `action` 接到 `/admin/bookings`。

```diff 06-project-init/src/App.jsx
 import AdminBookingsPage, {
-  loader as adminBookingsLoader,
+  action as adminBookingsAction,
+  loader as adminBookingsLoader,
 } from './features/admin/AdminBookingsPage.jsx';
 // ...
           {
             path: 'admin/bookings',
             loader: adminBookingsLoader,
+            action: adminBookingsAction,
             element: <AdminBookingsPage />,
           },
 // ...
```

**解析**

- `/admin/bookings` 加上 `action`。表單的 `fetcher.submit` 會送到這一頁的 `action`，不會換頁。

### 步驟 6：改為已取消的確認

把狀態改成「已取消」前，先開一個確認 Dialog。取消就是這筆訂單的「刪除」：訂單是帳務紀錄，要留下才能對帳，算剩餘名額時也只排除已取消的人。這種只改狀態、不真的移除資料的做法叫軟刪除（soft delete），所以這一章不提供刪除鈕，也不從陣列拿掉那一筆。

```jsx 06-project-init/src/features/admin/components/BookingForm.jsx
import { useState } from 'react';
import { useFetcher } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FieldSelect from '../../../_shared/FieldSelect.jsx';
import { ntd, statusLabel } from '../../../format.js';

const statuses = ['pending', 'confirmed', 'cancelled'];

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <dt className="text-muted">{label}</dt>
    <dd className="text-right">{value}</dd>
  </div>
);

/**
 * 報名明細 Dialog。open 控制開關，booking 是這一筆報名，onClose 只給取消鈕。
 * useFetcher({ key: 'booking-form' }) 與 AdminBookingsPage 共用同一個 fetcher；只負責送出新狀態，結果由頁面讀取。
 * @param {{ open: boolean, booking: object | null, onClose: () => void }} props
 * @returns {JSX.Element}
 */
export default function BookingForm({ open, booking, onClose }) {
  const fetcher = useFetcher({ key: 'booking-form' });
  const error =
    fetcher.state === 'idle' && fetcher.data?.error ? fetcher.data.error : '';
  const [status, setStatus] = useState(booking?.status ?? 'pending');
  const [confirmCancel, setConfirmCancel] = useState(false);

  const commit = () => {
    fetcher.submit({ id: booking?.id, status }, { method: 'post' });
  };

  const submit = (event) => {
    event.preventDefault();
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      setConfirmCancel(true);
      return;
    }
    commit();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        scroll="paper"
      >
        <form onSubmit={submit}>
          <DialogTitle>報名明細</DialogTitle>
          <DialogContent className="grid gap-4 pt-2">
            {booking ? (
              <dl className="grid gap-2 text-base">
                <Row label="行程" value={booking.tourTitle} />
                <Row label="出發日" value={booking.date} />
                <Row label="聯絡人" value={booking.name} />
                <Row label="Email" value={booking.email} />
                <Row label="電話" value={booking.phone} />
                <Row label="人數" value={booking.people} />
                <Row label="金額" value={ntd(booking.subtotal)} />
              </dl>
            ) : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
            <FieldSelect
              id="booking-status"
              label="狀態"
              value={status}
              onChange={setStatus}
              options={statuses.map((item) => ({
                value: item,
                label: statusLabel[item],
              }))}
            />
          </DialogContent>
          <DialogActions className="flex-wrap gap-2 p-4">
            <Button
              type="submit"
              variant="contained"
              disabled={fetcher.state !== 'idle'}
            >
              儲存
            </Button>
            <Button type="button" onClick={onClose}>
              取消
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={confirmCancel} onClose={() => setConfirmCancel(false)}>
        <DialogTitle>改為已取消？</DialogTitle>
        <DialogContent>
          紀錄會留下，以便對帳與計算名額。這就是這筆訂單的刪除。
        </DialogContent>
        <DialogActions className="gap-2 p-4">
          <Button onClick={() => setConfirmCancel(false)}>返回</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setConfirmCancel(false);
              commit();
            }}
          >
            確認取消
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

**解析**

- 把狀態從尚未取消改成「已取消」時，`submit` 先打開確認 Dialog，不直接送出；按「確認取消」才呼叫 `commit`。
- 原本就是「已取消」的報名再按儲存，不會出現確認。按「返回」只關掉確認，明細 Dialog 還在。
- 在畫面上試一次：把任一筆改成「已取消」按儲存，看到確認視窗；確認後明細關閉，列表上那一筆的狀態變成「已取消」，畫面下方出現「已更新報名狀態」。

十二條路徑到這裡都已換成真正的頁面，下面是整份 `App.jsx`。`Placeholder` 已經沒有人引用，所以 import 拿掉；`_shared/Placeholder.jsx` 這個檔案可以留著，也可以刪掉。

```jsx 06-project-init/src/App.jsx
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import SiteLayout from './layout/SiteLayout.jsx';
import HomePage, { loader as homeLoader } from './features/home/HomePage.jsx';
import ToursPage, {
  loader as toursLoader,
} from './features/tours/ToursPage.jsx';
import TourDetailPage, {
  loader as tourLoader,
} from './features/tours/TourDetailPage.jsx';
import BookingPage, {
  action as bookingAction,
  loader as bookingLoader,
} from './features/booking/BookingPage.jsx';
import BookingResultPage, {
  loader as bookingResultLoader,
} from './features/booking/BookingResultPage.jsx';
import MyBookingsPage from './features/booking/MyBookingsPage.jsx';
import AboutPage from './features/about/AboutPage.jsx';
import LoginPage from './features/auth/LoginPage.jsx';
import AdminLoginPage from './features/admin/AdminLoginPage.jsx';
import AdminToursPage, {
  action as adminToursAction,
  loader as adminToursLoader,
} from './features/admin/AdminToursPage.jsx';
import AdminBookingsPage, {
  action as adminBookingsAction,
  loader as adminBookingsLoader,
} from './features/admin/AdminBookingsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RouteErrorPage from './pages/RouteErrorPage.jsx';

const router = createBrowserRouter([
  {
    Component: SiteLayout,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, loader: homeLoader, Component: HomePage },
          { path: 'tours', loader: toursLoader, Component: ToursPage },
          { path: 'tours/:id', loader: tourLoader, Component: TourDetailPage },
          {
            path: 'booking',
            loader: bookingLoader,
            action: bookingAction,
            Component: BookingPage,
          },
          {
            path: 'booking/:id',
            loader: bookingResultLoader,
            Component: BookingResultPage,
          },
          { path: 'me', Component: MyBookingsPage },
          { path: 'about', Component: AboutPage },
          { path: 'login', Component: LoginPage },
          { path: 'admin/login', Component: AdminLoginPage },
          {
            path: 'admin',
            loader: adminToursLoader,
            action: adminToursAction,
            Component: AdminToursPage,
          },
          {
            path: 'admin/bookings',
            loader: adminBookingsLoader,
            action: adminBookingsAction,
            Component: AdminBookingsPage,
          },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- 十二條路徑都接上了真正的頁面，含各頁的 `loader` 與 `action`。
- 這一份把前面的 `element: <X />` 改寫成 `Component: X`，由路由器自己建立元素，兩種寫法效果相同，見 {% post_link lokiTech-15day-11-react-router %} 的說明。

# 打包與預覽

切版到這裡，原始碼應與 `05-project-prototype` 一致。這一章先打包出可以上線的靜態檔，再在本機打開 `dist/` 確認成品。

## 打包

在專案目錄執行：

```bash
pnpm build
```

**解析**

- 開發時用的 Vite 開發伺服器與 JSX 都不會原樣上線。打包之後，瀏覽器收到的是標準的 HTML、CSS 與 JS，不需要再跑開發伺服器。

終端機會印出類似下面的內容。模組數量與檔案大小會依套件版本而不同；檔名後面那串雜湊（hash）由檔案內容算出，內容一改就跟著變。

```
vite v8.3.5 building client environment for production...
transforming...
✓ 745 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.96 kB │ gzip:   0.51 kB
dist/assets/index-CroQNFc3.css   26.79 kB │ gzip:   5.80 kB
dist/assets/index--hhJhqnP.js   718.16 kB │ gzip: 226.72 kB

[plugin builtin:vite-reporter]
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 2.37s
```

**解析**

- 這則警告代表打包後的 JS 超過 500 kB，只是提醒，不影響使用。這一章先看產出長什麼樣子；選讀的下一篇部署時，再把套件拆成較小的檔。
- 打包完成後，專案根目錄多了 `dist/`：裡面有網站的進入點 `index.html`、從 `public` 原樣複製過來的 `favicon.svg`，以及 `assets/` 裡打包後的樣式與程式。

## 預覽

用編輯器的 Live Server（或任何靜態檔伺服器）把 `dist/` 當成網站根目錄打開。首頁與從頁首點進的內頁，都看得到跟開發時一樣的畫面。

**解析**

- 若在內頁按重新整理，Live Server 會回自己的 404，因為磁碟上沒有 `/tours` 這種實體路徑。React 網站只有 `index.html` 一張進入點，內頁的網址是前端路由。這個問題留到選讀的下一篇部署時，用轉送設定處理。
- 專案另有 `pnpm preview`（Vite 內建的預覽伺服器），對不到檔案的路徑會回 `index.html`，在內頁重新整理不會 404。它只是本機看成品用，不能拿來上線。

切版到此為止，這就是課程的結業專案。想再把同一份畫面接上 Firestore 與登入，見選讀的 {% post_link lokiTech-15day-13-project-travel-api %}。

# 本篇重點回顧

- 專案用 Vite 建立，加上 `jsconfig.json`，用 `@rolldown/plugin-babel` 接上 React Compiler，再裝路由、MUI、Emotion 與 Tailwind；頁面檔匯出的 `loader` 與 `action` 由 ESLint 的 `allowExportNames` 放行。
- 色票只寫在 `tokens`，MUI 與 Tailwind 共用；`@layer` 讓 MUI 進入 `mui` 層，preflight 清不掉按鈕內距，utilities 仍蓋得過元件。
- 路由先用佔位頁、`createBrowserRouter` 與 `RouterProvider` 接好，再由外框的 `Outlet` 共用頁首頁尾，並用 `ScrollRestoration` 處理捲動；對不到的路徑與錯誤的 id 都渲染找不到頁面。
- 資料放在 `store.js` 的記憶體模組，頁面用 `loader` 讀、用 `action` 或 `useFetcher` 寫；畫面改的是記憶體，重新整理就回到種子。
- 前台每一頁都是先組出來接到路由，再把標記換成真正的區塊元件，涵蓋首頁、行程列表、詳情、報名與完成、我的報名、關於與登入。
- 後台沿用同一份 `SiteHeader`，依路徑切換成後台選單；行程與報名都是列表加 Dialog，用頁面 state 控制開關，不另開路由。
- 表單用共用 `key` 的 `useFetcher` 送到頁面的 `action`，成功後關窗並用 `NoticeSnackbar` 提示；行程刪除要先確認，訂單改為已取消則是軟刪除。
- `pnpm build` 產出 `dist/` 的 HTML、CSS 與 JS，用 Live Server 預覽時內頁重新整理會 404；Firebase、雲端讀寫與登入都留到選讀的下一篇。

# 專有名詞中英對照

## 建立專案

- 建置工具（Vite）
- 套件管理器（pnpm）
- jsconfig.json
- 網站圖示（favicon）
- 依賴（dependency）
- 開發依賴（devDependency）
- 元件庫（Material UI）
- 主題提供者（ThemeProvider）
- 基準樣式（CssBaseline）
- 樣式引擎（StyledEngineProvider）
- 全域樣式（GlobalStyles）
- 層疊層級（cascade layer）
- 預設樣式（preflight）
- 主題（theme）
- design token
- 對比度（contrast ratio）
- 圖示字型（icon font）

## 路由與版面

- 路由（route）
- 版面（layout）
- 出口（outlet）
- 捲動還原（ScrollRestoration）
- 巢狀路由（nested route）
- createBrowserRouter
- RouterProvider
- 子路由（children）
- 索引路由（index route）
- 路徑參數（route parameter）
- 查詢參數（search parameter）
- 導覽連結（NavLink）
- 抽屜（Drawer）
- 佔位元件（placeholder）
- 找不到頁（not found）

## 前台頁面

- 種子資料（seed data）
- 記憶體資料模組（module store）
- 換頁前讀取（loader）
- useLoaderData
- 表單送出（action）
- 錯誤元件（errorElement）
- 不換頁的送出（useFetcher）
- 輪播（carousel）
- 步驟條（stepper）
- 唯讀欄位（read-only field）

## 後台

- 後台（admin）
- 草稿（draft）
- 圖庫（gallery）
- 精選（featured）
- 對話框（Dialog）
- 提示條（Snackbar）
- 軟刪除（soft delete）
- 共用的 fetcher（fetcher key）
- 元件重掛（remount）

## 打包與預覽

- 打包（build）
- 預覽（preview）
- 產物目錄（dist）
- 雜湊（hash）
- 前端路由（client-side routing）
