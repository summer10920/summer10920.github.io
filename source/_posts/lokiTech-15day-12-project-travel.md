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

這一章做洛奇旅行的切版：把 React、MUI 與 Tailwind 收成一個多頁網站。先接通十二條路由的佔位頁，再逐頁換成真正的畫面，假資料跟著一起補齊。打包沿用 {% post_link lokiTech-15day-11-react-router %}。

<!-- more -->

# 建立專案

先產生一支能打包的 Vite 專案，再把 MUI 與 Tailwind 要的套件和層級裝上。頁面內容等路由接通之後才寫。

## Vite 專案

`pnpm create vite` 會產生 React 需要的入口。清掉計數器範本之後，這個資料夾就是後面每一步的起點。

### 步驟 1：建立專案

{% note info %}
已經裝過 Node.js 24 與 pnpm 的人跳過工具鏈，直接在空目錄建立專案。剛重灌的電腦先照 {% post_link lokiTech-15day-04-tailwind %} 把 Node 24 與 pnpm 裝好。
{% endnote %}

在空目錄執行下面這行，框架選 React，變體選 JavaScript，資料夾取名 `06-project-init`。

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

- 瀏覽器先載入 `index.html`，再依腳本去拉 `main.jsx`，之後的畫面都由 React 畫進 `#root`。
- `vite.config.js` 裡的 `react()` 把 JSX 轉成瀏覽器能執行的 JavaScript。
- `createRoot` 只呼叫一次。元件與狀態的寫法見 {% post_link lokiTech-15day-09-react-basics %}。

### 步驟 2：清掉範本

計數器、標誌圖與 `App.css` 刪掉。套件名稱改成 `loki-travel`，`App` 只留標題。`react`、`react-dom`、`vite`、`@vitejs/plugin-react` 的版本與完成品對齊。

```json 06-project-init/package.json
{
  "name": "loki-travel",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "engines": {
    "node": ">=24"
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
    "@vitejs/plugin-react": "^6.2.1",
    "vite": "^8.3.5"
  }
}
```

```js 06-project-init/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

```html 06-project-init/index.html
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>洛奇旅行</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

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

```jsx 06-project-init/src/App.jsx
export default function App() {
  return <h1>洛奇旅行</h1>;
}
```

```css 06-project-init/src/index.css
/* 下一步才接 Tailwind */
```

**解析**

- `dependencies` 只留 `react` 與 `react-dom`。Vite 與外掛放在 `devDependencies`，打包後的靜態檔不依賴它們。
- `type` 設成 `module`，設定檔才能用 `import`。`engines` 把 Node.js 定在 24 以上。
- 這個 `App` 沒有狀態，也沒有路由，畫面只有「洛奇旅行」。

## 樣式與主題

這一節先認識 MUI，用一顆按鈕確認主題有接到畫面上，再把 Tailwind 接進來並排好層疊順序。色票只寫在 `tokens`，字型與圖示字型接著載入。各元件的圓角、class 與圖示覆寫，留到該元件第一次出現的小節再補。

### 步驟 1：安裝套件

在 `06-project-init` 執行。版本範圍與完成品相同。

```bash
pnpm add react-router@^8.5.1 @mui/material@^9.5.0 @emotion/react@^11.14.0 @emotion/styled@^11.14.1
pnpm add -D tailwindcss@^4.3.3 @tailwindcss/vite@^4.3.3
```

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
+    "@tailwindcss/vite": "^4.3.3",
     "@vitejs/plugin-react": "^6.2.1",
+    "tailwindcss": "^4.3.3",
     "vite": "^8.3.5"
 // ...
```

**解析**

- 路由元件從 `react-router` 引入。宣告式路由的寫法見 {% post_link lokiTech-15day-11-react-router %}。
- MUI 9 的樣式執行期是 Emotion，所以兩個 `@emotion` 套件要一起裝。
- Tailwind 4 用 `@tailwindcss/vite` 接進 Vite，主題寫在 CSS 裡，不必另建 `tailwind.config.js`。

### 步驟 2：認識 MUI

MUI（Material UI）是一套 React 元件庫。按鈕、輸入框、對話框都有現成元件，色與字級集中在一份主題，不必每個元件各寫一份 CSS。

三個函式各管一件事。

- `createTheme` 建立主題物件。這一步只放主色，後面再補完整色票與字級。
- `ThemeProvider` 把主題交給子樹裡的 MUI 元件。包在外面，裡面的 `Button` 才讀得到。
- `CssBaseline` 清掉瀏覽器給 `body` 的預設外距，並套上主題的文字色與背景色。

下面把畫面換成一顆實心按鈕，確認主題有接到畫面上。路由那一節會整份換掉 `App`，這顆按鈕只留在這一步。

```js 06-project-init/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1F6B4A' },
  },
});

export default theme;
```

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

```jsx 06-project-init/src/App.jsx
import Button from '@mui/material/Button';

export default function App() {
  return <Button variant="contained">洛奇旅行</Button>;
}
```

**解析**

- 按鈕底色來自 `palette.primary.main`。`variant="contained"` 用這個色當底。
- 少了 `ThemeProvider`，`Button` 只用 MUI 內建主題，讀不到這份 `palette`。
- `CssBaseline` 渲染之後，`body` 的 `margin` 是 0。
- `import './index.css'` 留在 `main.jsx` 最上面，樣式會在 `render` 之前進到頁面。

### 步驟 3：Tailwind 與層疊層級

先把 Tailwind 的 Vite 外掛接上，`index.css` 才能 `@import 'tailwindcss'`。接著要處理兩套樣式誰蓋過誰。

沒有放進 layer 的規則，優先度高過任何有分層的規則。Tailwind 的 preflight 放在 `base`，會把按鈕內距歸零。MUI 的按鈕樣式若落在層級外面，後面的 class 就改不到它。`enableCssLayer` 把 MUI 收進中間的 `mui` 層：preflight 清不掉按鈕內距，排在最後的 utilities 仍蓋得過元件。

{% mermaid graph LR %}
  themeL["theme"] --> baseL["base"]
  baseL --> muiL["mui"]
  muiL --> compL["components"]
  compL --> utilL["utilities"]
{% endmermaid %}

箭頭往右，後層蓋過前層。

- `theme` 放設計代幣。
- `base` 放 preflight，以及下一步才寫的 `body`。
- `components` 放稍後才寫的 class。
- `utilities` 放 Tailwind 的工具 class，所以欄數與間距蓋得過 MUI。

層級順序只宣告一次，放在 `index.css` 第一行，而且要在 `@import` 之前。瀏覽器沿用這份順序，HTML 與執行時都不必再寫一次。

```css 06-project-init/src/index.css
@layer theme, base, mui, components, utilities;

@import 'tailwindcss';
```

```diff 06-project-init/vite.config.js
 // ...
 import react from '@vitejs/plugin-react';
+import tailwindcss from '@tailwindcss/vite';
 
 export default defineConfig({
-  plugins: [react()],
+  plugins: [react(), tailwindcss()],
 });
```

```diff 06-project-init/src/main.jsx
 // ...
 import { createRoot } from 'react-dom/client';
-import { ThemeProvider } from '@mui/material/styles';
+import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
 import CssBaseline from '@mui/material/CssBaseline';
 // ...
   <StrictMode>
-    <ThemeProvider theme={theme}>
-      <CssBaseline />
-      <App />
-    </ThemeProvider>
+    <StyledEngineProvider enableCssLayer>
+      <ThemeProvider theme={theme}>
+        <CssBaseline />
+        <App />
+      </ThemeProvider>
+    </StyledEngineProvider>
   </StrictMode>,
 // ...
```

**解析**

- `plugins` 同時留著 `react()` 與 `tailwindcss()`。少了後者，`@import 'tailwindcss'` 不會被處理。
- `StyledEngineProvider` 要包住會渲染 MUI 的那一層，`enableCssLayer` 才作用在這些元件上。
- 開發伺服器聽哪個位址、打包時怎麼拆檔，留到最後的靜態部署再補。這一節的 `vite.config.js` 只加外掛。

### 步驟 4：主題與色票

色票只留在 `tokens`。`applyTokens` 在繪製之前把每一色寫成 CSS 變數，名稱是 `--loki-` 加上鍵名。`@theme inline` 用這些變數對到顏色 class，樣式表裡不再抄一份色碼。

MUI 的 `palette` 要拿色碼算對比，所以寫十六進位。嫩綠 `#3FB27F` 配白字是 2.66:1，帶字的主按鈕改用 `#1F6B4A`（白字 6.44:1），hover 用 `#146845`。

`@layer base` 用同一組變數設定頁面底色、文字色、選取範圍與鍵盤焦點。元件自己的 class 與 MUI 覆寫還不寫。把 `theme.js` 整份換成下面這樣，上一步的主色收進 `tokens.action`。

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
    primary: { main: tokens.action, light: tokens.primary, dark: tokens.actionHover, contrastText: tokens.white },
    secondary: { main: tokens.accent, dark: '#E8B423', contrastText: tokens.ink },
    error: { main: tokens.alert, contrastText: tokens.white },
    text: { primary: tokens.ink, secondary: tokens.muted },
    background: { default: tokens.paper, paper: tokens.white },
    divider: tokens.line,
  },
  typography: {
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    h1: { fontWeight: 700, fontSize: '3rem', lineHeight: 1.15, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.25 },
    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.35 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '1rem', lineHeight: 1.7 },
    button: { fontWeight: 700, fontSize: '1rem', textTransform: 'none' },
  },
});

export default theme;
```

```css 06-project-init/src/index.css
@layer theme, base, mui, components, utilities;

@import 'tailwindcss';

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

  :focus-visible {
    outline: 2px solid var(--loki-action);
    outline-offset: 3px;
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
```

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

- `applyTokens` 寫在 `render` 之前，第一批畫面就讀得到 `--loki-*`。
- `cssVariables` 讓 MUI 另外寫出自己的 CSS 變數。Tailwind 不讀那些名字，只讀 `--loki-*`。
- `--color-action` 對到 class `bg-action`、`text-action`。連字號是 Tailwind 的色名，`tokens` 裡的鍵維持駝峰。
- 字型名稱下一步再換。這一步的 `fontFamily` 仍是系統無襯線字。

### 步驟 5：字型與圖示

介面用 Noto Sans TC，標題用 Noto Serif TC。Material Symbols Outlined 是圖示字型：元素的文字內容寫圖示名稱，字型把名稱畫成圖。圖示元件留到頁首再寫，這裡只把字檔與 class 載進來。

```diff 06-project-init/index.html
 // ...
     <title>洛奇旅行</title>
+    <link rel="preconnect" href="https://fonts.googleapis.com" />
+    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
+    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
+    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&family=Noto+Serif+TC:wght@600;700&display=swap" rel="stylesheet" />
   </head>
 // ...
```

```diff 06-project-init/src/theme.js
 // ...
   typography: {
-    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
-    h1: { fontWeight: 700, fontSize: '3rem', lineHeight: 1.15, letterSpacing: '-0.02em' },
-    h2: { fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.25 },
-    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.35 },
+    fontFamily: "'Noto Sans TC', ui-sans-serif, sans-serif",
+    h1: { fontFamily: "'Noto Serif TC', serif", fontWeight: 700, fontSize: '3rem', lineHeight: 1.15, letterSpacing: '-0.02em' },
+    h2: { fontFamily: "'Noto Serif TC', serif", fontWeight: 700, fontSize: '2.25rem', lineHeight: 1.25 },
+    h3: { fontFamily: "'Noto Serif TC', serif", fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.35 },
     body1: { fontSize: '1rem', lineHeight: 1.7 },
     body2: { fontSize: '1rem', lineHeight: 1.7 },
-    button: { fontWeight: 700, fontSize: '1rem', textTransform: 'none' },
+    button: { fontFamily: "'Noto Sans TC', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'none' },
   },
 // ...
```

```diff 06-project-init/src/index.css
 // ...
 @theme inline {
+  --font-sans: 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif;
+  --font-serif: 'Noto Serif TC', ui-serif, serif;
   --color-primary: var(--loki-primary);
 // ...
       animation: none !important;
     }
   }
 }
+
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

- `font-sans` 與 `font-serif` 給 Tailwind 的 `font-sans`、`font-serif`。MUI 的 `typography` 另外寫字型名稱，標題元件才會用襯線。
- 圖示字型的網址帶 `display=block`，字檔到達前先不顯示名稱。內文字型用 `display=swap`，先用後備字再換。
- `font-feature-settings: 'liga'` 把圖示名稱連成一個圖形。頁首的 `Icon` 會把名稱放進帶這個 class 的 `span`。
# 路由與版面

十二條路徑先全部掛上，每頁只顯示頁名。頁首、頁尾與連結可以先點過一輪，再逐頁換成真正的畫面。

## 共用版面

`Outlet` 決定版面中間換哪一頁。頁首、頁尾與佔位元件先獨立，路由表只負責把網址對到元件。

### 頁首與頁尾

這一版頁首還沒有登入狀態，登入鈕只是一條連到 `/login` 的連結。圖示是一顆寫著名稱的 `<span>`，字型在上一步已引入。

```jsx 06-project-init/src/components/Icon.jsx
export default function Icon({ name, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} aria-hidden="true">
      {name}
    </span>
  );
}
```

```jsx 06-project-init/src/components/NavLinks.jsx
import { NavLink } from 'react-router';

const item = ({ isActive }) => `inline-flex min-h-11 items-center rounded-full px-3 font-bold ${isActive ? 'bg-action text-white' : 'text-ink hover:bg-mist'}`;

export default function NavLinks({ onNavigate, id }) {
  return (
    <nav id={id} className="flex flex-col gap-1 md:flex-row md:items-center" aria-label="主要">
      <NavLink to="/tours" className={item} onClick={onNavigate}>行程</NavLink>
      <NavLink to="/about" className={item} onClick={onNavigate}>關於</NavLink>
      <NavLink to="/me" className={item} onClick={onNavigate}>我的報名</NavLink>
    </nav>
  );
}
```

「跳到內容」的 class，以及頁首按鈕、頂列、抽屜與遮罩的覆寫，補在這一節。`shape.borderRadius` 先設成 12，按鈕再改成膠囊。

```diff 06-project-init/src/index.css
 // ...
 }
 
+@layer components {
+  .skip {
+    position: absolute;
+    width: 1px;
+    height: 1px;
+    margin: -1px;
+    overflow: hidden;
+    clip: rect(0, 0, 0, 0);
+    white-space: nowrap;
+    border: 0;
+  }
+
+  .skip:focus {
+    position: absolute;
+    top: 0.5rem;
+    left: 1rem;
+    z-index: 80;
+    width: auto;
+    height: auto;
+    margin: 0;
+    clip: auto;
+    overflow: visible;
+    border-radius: 999px;
+    background: var(--loki-white);
+    color: var(--loki-ink);
+    padding: 0.5rem 0.75rem;
+  }
+}
+
 .material-symbols-outlined {
 // ...
```

```diff 06-project-init/src/theme.js
 // ...
     divider: tokens.line,
   },
+  shape: { borderRadius: 12 },
   typography: {
 // ...
     button: { fontFamily: "'Noto Sans TC', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'none' },
   },
+  components: {
+    MuiButton: {
+      defaultProps: { disableElevation: true },
+      styleOverrides: {
+        root: { borderRadius: 999, minHeight: 44, paddingInline: 22, fontWeight: 700 },
+        containedPrimary: {
+          backgroundColor: tokens.action,
+          color: tokens.white,
+          '&:hover': { backgroundColor: tokens.actionHover },
+        },
+        containedSecondary: {
+          backgroundColor: tokens.accent,
+          color: tokens.ink,
+          '&:hover': { backgroundColor: '#E8B423' },
+        },
+        outlined: { borderColor: tokens.line, color: tokens.ink, '&:hover': { borderColor: tokens.action, backgroundColor: tokens.mist } },
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

```jsx 06-project-init/src/components/SiteHeader.jsx
import { useState } from 'react';
import { Link } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import NavLinks from './NavLinks.jsx';
import Icon from './Icon.jsx';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <AppBar id="site-header" position="sticky" component="header">
      <a className="skip" href="#content">跳到內容</a>
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link to="/" className="font-serif text-2xl font-semibold text-ink">洛奇旅行</Link>
        <Button id="nav-toggle" className="md:hidden" variant="outlined" startIcon={<Icon name="menu" />} aria-expanded={open} aria-controls="site-drawer" onClick={() => setOpen(true)}>選單</Button>
        <div className="hidden items-center gap-1 md:flex">
          <NavLinks onNavigate={close} id="site-nav" />
          <Button component={Link} to="/login" onClick={close}>登入</Button>
        </div>
      </div>
      <Drawer anchor="right" open={open} onClose={close}>
        <div id="site-drawer" className="flex flex-col gap-2 p-4">
          <NavLinks onNavigate={close} />
          <Button component={Link} to="/login" onClick={close}>登入</Button>
        </div>
      </Drawer>
    </AppBar>
  );
}
```

```jsx 06-project-init/src/components/SiteFooter.jsx
import { Link } from 'react-router';
import Icon from './Icon.jsx';

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 md:gap-8 md:py-24">
        <div>
          <p className="font-serif text-2xl font-semibold">洛奇旅行</p>
          <p className="mt-3 text-lg text-foam">上午走路，下午留白。</p>
          <p className="mt-4 text-base leading-relaxed text-white/90">台灣本島小團，以及一條京都短團。出團前用 email 對一次名單。</p>
        </div>
        <div>
          <p className="font-semibold">聯絡我們</p>
          <p className="mt-4 flex items-start gap-2 leading-relaxed"><Icon name="call" className="mt-1 text-accent" />電話（02）0000-1111</p>
          <p className="mt-2 flex items-start gap-2 leading-relaxed"><Icon name="location_on" className="mt-1 text-accent" />100 台北市中正區教材路 8 號</p>
          <p className="mt-4 text-base leading-relaxed text-white/90">出團前以 email 確認。未成行，團費全額退回。</p>
        </div>
        <div>
          <p className="font-semibold">探索</p>
          <nav className="mt-3 flex flex-col" aria-label="頁尾">
            <Link className="inline-flex min-h-11 items-center text-foam hover:text-white" to="/tours">行程</Link>
            <Link className="inline-flex min-h-11 items-center text-foam hover:text-white" to="/about">關於</Link>
          </nav>
          <p className="mt-4 text-base leading-relaxed text-white/90">交通部觀光署旅行業執照交觀甲 999999 號</p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 sm:px-6">
          <Link className="w-fit text-sm text-white/55 hover:text-white" to="/admin/login">後台登入</Link>
          <p className="text-sm text-white/55">© {new Date().getFullYear()} 洛奇旅行</p>
        </div>
      </div>
    </footer>
  );
}
```

**解析**

- `NavLink` 會帶 `isActive`。目前這一項用實心膠囊，其餘維持文字。寫法見第 11 篇。
- 頁首的 id 是 `site-header`，手機選單按鈕的 id 是 `nav-toggle`。
- 頁尾另放一條「後台登入」，前台選單不放後台連結。
- `skip` 這個 class 把「跳到內容」移出畫面，鍵盤焦點進來才顯示。
- 按鈕改成膠囊、去掉陰影。頂列半透明貼在上緣，抽屜從右側打開，後面的遮罩是 Backdrop。

### 佔位頁

佔位元件只顯示頁名，讓整站先能點來點去。版面這一版還沒有提示訊息，`notice` 等報名頁再接。

```jsx 06-project-init/src/components/Placeholder.jsx
export default function Placeholder({ title }) {
  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-serif text-4xl font-bold text-ink">{title}</h1>
    </main>
  );
}
```

```jsx 06-project-init/src/layouts/SiteLayout.jsx
import { Outlet } from 'react-router';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
```

**解析**

- `Outlet` 渲染子路由對上的元件，頁首與頁尾留在外面。
- 每個佔位頁都有 `id="content"`，對應頁首那個跳到內容的錨點。
- 十二頁都換成真正的元件之後，刪掉 `Placeholder.jsx`。

## 路由表

巢狀在 `SiteLayout` 底下的路徑共用頁首頁尾。星號也留在版面裡，找不到頁時頁首頁尾還在。

{% mermaid graph LR %}
  layout["SiteLayout"] --> home["/ HomePage"]
  layout --> tours["/tours ToursPage"]
  layout --> detail["/tours/:id TourDetailPage"]
  layout --> booking["/booking BookingPage"]
  layout --> done["/booking/done BookingDonePage"]
  layout --> me["/me MyBookingsPage"]
  layout --> about["/about AboutPage"]
  layout --> login["/login LoginPage"]
  layout --> aLogin["/admin/login AdminLoginPage"]
  layout --> aTours["/admin AdminToursPage"]
  layout --> aBooks["/admin/bookings AdminBookingsPage"]
  layout --> miss["* NotFoundPage"]
{% endmermaid %}

`Routes` 要包在 `BrowserRouter` 裡才讀得到網址。上一步那顆按鈕從這裡換成路由表。

```diff 06-project-init/src/main.jsx
 // ...
 import CssBaseline from '@mui/material/CssBaseline';
+import { BrowserRouter } from 'react-router';
 import App from './App.jsx';
 // ...
         <CssBaseline />
-        <App />
+        <BrowserRouter>
+          <App />
+        </BrowserRouter>
       </ThemeProvider>
 // ...
```

```jsx 06-project-init/src/App.jsx
import { Route, Routes } from 'react-router';
import SiteLayout from './layouts/SiteLayout.jsx';
import Placeholder from './components/Placeholder.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Placeholder title="首頁" />} />
        <Route path="tours" element={<Placeholder title="行程列表" />} />
        <Route path="tours/:id" element={<Placeholder title="行程詳情" />} />
        <Route path="booking" element={<Placeholder title="報名" />} />
        <Route path="booking/done" element={<Placeholder title="報名完成" />} />
        <Route path="me" element={<Placeholder title="我的報名" />} />
        <Route path="about" element={<Placeholder title="關於" />} />
        <Route path="login" element={<Placeholder title="登入提示" />} />
        <Route path="admin/login" element={<Placeholder title="後台登入" />} />
        <Route path="admin" element={<Placeholder title="後台行程" />} />
        <Route path="admin/bookings" element={<Placeholder title="後台報名" />} />
        <Route path="*" element={<Placeholder title="找不到頁面" />} />
      </Route>
    </Routes>
  );
}
```

**解析**

- `index` 就是 `/`。`booking/done` 與 `admin/login` 和較短的 path 寫在同一層，各自對自己的網址。
- `tours/:id` 的 `id` 等詳情頁才用 `useParams` 讀取。路徑參數見第 11 篇。
- 星號放在最後，前面的路徑都沒對上才會進來。
- `BrowserRouter` 提供目前網址。`App` 裡的 `Routes` 靠它把路徑對到佔位頁。

# 前台頁面

每個小節把對應的佔位元件換成真正的頁面，並且只補這一頁要讀的欄位。共用狀態等到第一個用到它的頁面才加。React 狀態與 context 的寫法見 {% post_link lokiTech-15day-10-react-advanced %}，這裡不再展開。

## 首頁

首頁讀精選行程、主題圖、三則理由與四則評價。列表才要的價格區間、詳情才要的每日行程，先不寫進資料檔。

```js 06-project-init/src/format.js
export const ntd = (value) => `NT$${Number(value).toLocaleString('zh-Hant-TW')}`;

export const perPerson = (tour) => (tour?.id === 'kyoto-nara' ? '/ 人，不含國際機票' : '/ 人');
```

```js 06-project-init/src/data/tours.js
export const tours = [
  {
    id: 'taipei-beitou',
    title: '台北大稻埕與北投溫泉三日',
    region: '台北',
    days: 3,
    price: 18600,
    cover: 'https://images.unsplash.com/photo-1519320993082-43a535317ddc?auto=format&fit=crop&w=1600&q=80',
    intro: '第一天沿迪化街走到大稻埕碼頭，第二天北投泡湯，下午不排景點。',
    departures: [{ id: '2026-12-04', date: '2026-12-04' }],
    featured: true,
  },
  {
    id: 'hualien-taroko',
    title: '花蓮太魯閣與七星潭四日',
    region: '花蓮',
    days: 4,
    price: 26800,
    cover: 'https://images.unsplash.com/photo-1604214896221-b13d964b214a?auto=format&fit=crop&w=1600&q=80',
    intro: '第一天沿七星潭走路，第二天進太魯閣只排燕子口與九曲洞，下午留白。',
    departures: [{ id: '2026-12-18', date: '2026-12-18' }],
    featured: true,
  },
  {
    id: 'taitung-chishang',
    title: '台東池上與成功海岸三日',
    region: '台東',
    days: 3,
    price: 21400,
    cover: 'https://images.unsplash.com/photo-1761549849498-8cf23a31329d?auto=format&fit=crop&w=1600&q=80',
    intro: '第一天在池上騎一段田邊的路，第二天去成功看漁港，不把兩個地方排在同一天。',
    departures: [{ id: '2027-01-15', date: '2027-01-15' }],
    featured: true,
  },
  {
    id: 'kyoto-nara',
    title: '京都嵐山、伏見與奈良五日',
    region: '京都',
    days: 5,
    price: 52800,
    cover: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    intro: '嵐山、伏見、奈良各一天，中間留一天在市內走。四晚不換飯店。',
    departures: [{ id: '2027-04-06', date: '2027-04-06' }],
    featured: true,
  },
];
```

```js 06-project-init/src/data/options.js
export const regions = ['台北', '基隆', '花蓮', '台東', '台南', '高雄', '金門', '京都'];

export const dayOptions = [2, 3, 4, 5];

const shot = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const themeLinks = [
  { theme: '城市', places: '大稻埕、鹽埕', image: shot('1598935898639-81586f7d2129') },
  { theme: '海岸', places: '北海岸、九份', image: shot('1507525428034-b723cf961d3e') },
  { theme: '山海', places: '花蓮、台東', image: shot('1464822759023-fed622ff2c3b') },
  { theme: '古都', places: '台南府城、安平', image: shot('1633228491597-b39f823e0541') },
  { theme: '離島', places: '金門聚落', image: shot('1505118380757-91f5f5632de0') },
  { theme: '日本', places: '京都、奈良', image: shot('1526481280693-3bfa7568e0f3') },
];

export const reasons = [
  { title: '每團 8 人', body: '人數少，嚮導叫得出名字。不會把兩台車的人併成一團。' },
  { title: '一天不排滿', body: '上午走路，下午留白。景點之間不靠購物站填時間。' },
  { title: '住下來', body: '同一趟行程盡量不每天換飯店，行李不必每天收。' },
];
```

```js 06-project-init/src/data/reviews.js
export const reviews = [
  { id: 'r1', tourId: 'hualien-taroko', author: '林可', rating: 5, body: '太魯閣沒有被排進行程表以外的停靠點。' },
  { id: 'r2', tourId: 'taipei-beitou', author: '陳予安', rating: 5, body: '迪化街走得很慢，嚮導沒有把我們推進店裡。' },
  { id: 'r3', tourId: 'kyoto-nara', author: '周以寧', rating: 4, body: '伏見只排了兩間酒造，下午自己走回到宿。' },
  { id: 'r4', tourId: 'taitung-chishang', author: '何品', rating: 5, body: '池上的田沒有被排成打卡點，成功漁港是傍晚去的。' },
];
```

```jsx 06-project-init/src/store.jsx
import { createContext, useContext, useState } from 'react';
import { tours as seedTours } from './data/tours.js';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [tours] = useState(seedTours);
  return (
    <StoreContext.Provider value={{ tours }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
```

Select 的箭頭改成圖示字型。`ms` 產生一顆帶圖示名稱的 `span`，`MuiSelect` 用它取代預設的 SVG。

```diff 06-project-init/src/theme.js
+import { createElement } from 'react';
 import { createTheme } from '@mui/material/styles';
 // ...
   });
 };
 
+
+/** Material Symbols 字型 icon（取代 MUI 內建 SVG）。 */
+const ms = (name, props = {}) => createElement('span', { 'aria-hidden': 'true', ...props, className: `material-symbols-outlined ${props.className || ''}`.trim() }, name);
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

```jsx 06-project-init/src/components/FieldSelect.jsx
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function FieldSelect({ id, label, value, onChange, options, hiddenLabel = false }) {
  return (
    <FormControl className="w-full">
      <InputLabel id={`${id}-label`} className={hiddenLabel ? 'sr-only' : undefined}>{label}</InputLabel>
      <Select labelId={`${id}-label`} id={id} label={hiddenLabel ? undefined : label} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <MenuItem key={option.value || 'all'} value={option.value}>{option.label}</MenuItem>)}
      </Select>
    </FormControl>
  );
}
```

搜尋表單用 `.panel`，文字連結用 `.text-link`。兩個 class 從這裡加進 `components` 層。

```diff 06-project-init/src/index.css
 // ...
     padding: 0.5rem 0.75rem;
   }
+
+  .panel {
+    border-radius: 24px;
+    background: var(--loki-white);
+    box-shadow: var(--shadow-card);
+  }
+
+  .text-link {
+    font-weight: 700;
+    color: var(--loki-action);
+    text-decoration-line: underline;
+    text-decoration-color: color-mix(in srgb, var(--loki-action) 45%, transparent);
+    text-underline-offset: 4px;
+  }
+
+  .text-link:hover {
+    color: var(--loki-actionHover);
+  }
 }
 // ...
```

```jsx 06-project-init/src/components/HeroSearch.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { dayOptions, regions } from '../data/options.js';
import FieldSelect from './FieldSelect.jsx';

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
    <form className="panel p-6 md:p-8" onSubmit={submit}>
      <Typography variant="h2">找一趟慢一點的行程</Typography>
      <p className="mt-2 text-muted">選地區與天數，或直接看全部。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <FieldSelect id="hero-region" label="地區" value={region} onChange={setRegion} options={[{ value: '', label: '不限' }, ...regions.map((item) => ({ value: item, label: item }))]} />
        <FieldSelect id="hero-days" label="天數" value={days} onChange={setDays} options={[{ value: '', label: '不限' }, ...dayOptions.map((item) => ({ value: String(item), label: `${item} 天` }))]} />
        <Button type="submit" variant="contained" className="min-h-14 md:min-w-40">搜尋行程</Button>
      </div>
      <p className="mt-5"><Link className="text-link" to="/tours">看全部行程</Link></p>
    </form>
  );
}
```

價格膠囊是 `.price-tag`。左右切換的 IconButton 改成圓形。

```diff 06-project-init/src/index.css
 // ...
     box-shadow: var(--shadow-card);
   }
+
+  .price-tag {
+    display: inline-block;
+    border-radius: 999px;
+    background: var(--loki-accent);
+    color: var(--loki-ink);
+    font-weight: 700;
+    line-height: 1.15;
+    padding: 0.12em 0.55em;
+  }
 
   .text-link {
 // ...
```

```diff 06-project-init/src/theme.js
 // ...
         outlined: { borderColor: tokens.line, color: tokens.ink, '&:hover': { borderColor: tokens.action, backgroundColor: tokens.mist } },
       },
     },
+    MuiIconButton: {
+      styleOverrides: { root: { borderRadius: 999 } },
+    },
     MuiAppBar: {
 // ...
```

```jsx 06-project-init/src/components/HeroSlider.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from './Icon.jsx';
import { ntd } from '../format.js';

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (!count || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), 4500);
    return () => clearInterval(timer);
  }, [count]);

  if (!count) return null;
  const go = (next) => setIndex(((next % count) + count) % count);
  const slide = slides[index % count];
  const bookTo = `/booking?tourId=${slide.id}&departureId=${slide.departures[0].id}`;

  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden lg:h-[70vh]" aria-roledescription="carousel" aria-label="熱門風景">
      {slides.map((item, itemIndex) => (
        <img
          key={item.id}
          src={item.cover}
          alt={itemIndex === index ? item.title : ''}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${itemIndex === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25" />
      <IconButton aria-label="上一張" onClick={() => go(index - 1)} className="absolute top-1/2 left-3 z-20 -translate-y-1/2 bg-white text-ink shadow-card md:left-6"><Icon name="chevron_left" /></IconButton>
      <IconButton aria-label="下一張" onClick={() => go(index + 1)} className="absolute top-1/2 right-3 z-20 -translate-y-1/2 bg-white text-ink shadow-card md:right-6"><Icon name="chevron_right" /></IconButton>
      <div className="relative z-10 w-full px-5 pt-24 pb-14 sm:px-8 lg:pb-28 lg:pl-20">
        <p className="font-serif text-3xl"><span className="price-tag">{ntd(slide.price)}</span></p>
        <p className="mt-3 text-base font-medium text-foam">{slide.region} · {slide.days} 天</p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold text-balance text-white md:text-6xl">{slide.title}</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white md:text-lg">{slide.intro}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button component={Link} to={bookTo} variant="contained">立即報名</Button>
          <Button component={Link} to={`/tours/${slide.id}`} variant="contained" color="secondary">看行程</Button>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:bottom-24">
        {slides.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={`顯示${item.title}`}
            aria-current={itemIndex === index ? 'true' : undefined}
            onClick={() => go(itemIndex)}
            className={`h-3 w-3 rounded-full ${itemIndex === index ? 'bg-accent' : 'bg-white'}`}
          />
        ))}
      </div>
    </section>
  );
}
```

卡片的圓角與陰影、Chip 的配色與刪除圖示，補進主題。

```diff 06-project-init/src/theme.js
 // ...
     MuiIconButton: {
       styleOverrides: { root: { borderRadius: 999 } },
     },
+    MuiCard: {
+      styleOverrides: {
+        root: { borderRadius: 24, boxShadow: '0 10px 28px rgb(31 42 68 / 8%)', backgroundColor: tokens.white, backgroundImage: 'none' },
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

```jsx 06-project-init/src/components/TourCard.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ntd, perPerson } from '../format.js';

export default function TourCard({ tour, showTheme = false }) {
  return (
    <Card component={Link} to={`/tours/${tour.id}`} className="group flex h-full flex-col overflow-hidden text-inherit no-underline">
      <CardMedia component="img" image={tour.cover} alt="" className="aspect-[4/3] w-full object-cover transition duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Chip size="small" color="secondary" label={tour.region} />
          {showTheme ? <Chip size="small" variant="outlined" label={tour.theme} /> : null}
          <Chip size="small" variant="outlined" label={`${tour.days} 天`} />
        </div>
        <Typography variant="h3" className="mt-3 text-ink">{tour.title}</Typography>
        <p className="mt-2 text-base leading-relaxed text-muted">{tour.intro}</p>
        <p className="mt-auto pt-5 font-serif text-2xl font-bold text-ink">{ntd(tour.price)} <span className="font-sans text-base font-normal text-muted">{perPerson(tour)}</span></p>
        <Button component="span" variant="contained" className="mt-4 w-full" tabIndex={-1}>看詳情</Button>
      </div>
    </Card>
  );
}
```

```jsx 06-project-init/src/components/ThemeGrid.jsx
import { Link } from 'react-router';
import { themeLinks } from '../data/options.js';

export default function ThemeGrid() {
  return (
    <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {themeLinks.map((item) => (
        <li key={item.theme}>
          <Link to={`/tours?theme=${item.theme}`} className="group relative flex min-h-52 overflow-hidden rounded-card shadow-card">
            <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
            <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            <span className="relative mt-auto flex flex-col px-5 py-5 text-white">
              <span className="font-serif text-3xl font-semibold">{item.theme}</span>
              <span className="text-foam">{item.places}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

```jsx 06-project-init/src/components/ReasonList.jsx
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Icon from './Icon.jsx';
import { reasons } from '../data/options.js';

const icons = ['groups', 'wb_sunny', 'hotel'];

export default function ReasonList() {
  return (
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
  );
}
```

星星改用圖示字型。實心星加上 `FILL` 1，空心星維持線框。

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
+    },
   },
 // ...
```

```jsx 06-project-init/src/components/ReviewList.jsx
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import { reviews } from '../data/reviews.js';
import { tours } from '../data/tours.js';

const titleOf = (tourId) => tours.find((tour) => tour.id === tourId)?.title ?? '';

export default function ReviewList() {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      {reviews.map((review) => (
        <Card key={review.id} component="figure" className="p-6 md:p-8">
          <Rating value={review.rating} readOnly aria-label={`${review.rating} 分`} />
          <blockquote className="mt-3 max-w-prose leading-relaxed">「{review.body}」</blockquote>
          <figcaption className="mt-3 text-muted">{review.author} · {review.rating} 分 · {titleOf(review.tourId)}</figcaption>
        </Card>
      ))}
    </div>
  );
}
```

```jsx 06-project-init/src/pages/HomePage.jsx
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import HeroSearch from '../components/HeroSearch.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import ReasonList from '../components/ReasonList.jsx';
import ReviewList from '../components/ReviewList.jsx';
import ThemeGrid from '../components/ThemeGrid.jsx';
import TourCard from '../components/TourCard.jsx';
import { useStore } from '../store.jsx';

export default function HomePage() {
  const { tours } = useStore();
  const featured = tours.filter((tour) => tour.featured);
  useEffect(() => { document.title = '洛奇旅行'; }, []);

  return (
    <main id="content">
      <HeroSlider slides={featured.length ? featured : tours.slice(0, 4)} />
      <div className="relative z-20 mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 lg:-mt-20">
        <HeroSearch />
      </div>
      <section className="mt-12 bg-ink text-white md:mt-20">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Typography variant="h2" className="text-balance text-4xl leading-snug text-white md:text-5xl"><span className="whitespace-nowrap">把日子排鬆，</span><br /><span className="whitespace-nowrap">把路走慢。</span></Typography>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foam">每團最多 8 人。地名寫清楚，一天只排一段路，下午留給自己。京都五日不含國際機票。</p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24" aria-labelledby="featured-title">
        <Typography id="featured-title" variant="h2">熱門行程</Typography>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">這幾趟最常被選走。價格為每人，以新台幣計。</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      </section>
      <section className="bg-mist" aria-labelledby="theme-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Typography id="theme-title" variant="h2">依主題找路</Typography>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">城市、海岸、山海、古都、離島，或飛一趟京都。</p>
          <ThemeGrid />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24" aria-labelledby="reason-title">
        <Typography id="reason-title" variant="h2">為什麼選我們</Typography>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">人少、不排滿、盡量住同一間飯店。</p>
        <ReasonList />
      </section>
      <section className="bg-foam" aria-labelledby="review-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Typography id="review-title" variant="h2">旅客怎麼說</Typography>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">出發回來之後，旅客留下的話。</p>
          <ReviewList />
        </div>
      </section>
    </main>
  );
}
```

```jsx 06-project-init/src/App.jsx
import { Route, Routes } from 'react-router';
import { StoreProvider } from './store.jsx';
import SiteLayout from './layouts/SiteLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import Placeholder from './components/Placeholder.jsx';

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tours" element={<Placeholder title="行程列表" />} />
          <Route path="tours/:id" element={<Placeholder title="行程詳情" />} />
          <Route path="booking" element={<Placeholder title="報名" />} />
          <Route path="booking/done" element={<Placeholder title="報名完成" />} />
          <Route path="me" element={<Placeholder title="我的報名" />} />
          <Route path="about" element={<Placeholder title="關於" />} />
          <Route path="login" element={<Placeholder title="登入提示" />} />
          <Route path="admin/login" element={<Placeholder title="後台登入" />} />
          <Route path="admin" element={<Placeholder title="後台行程" />} />
          <Route path="admin/bookings" element={<Placeholder title="後台報名" />} />
          <Route path="*" element={<Placeholder title="找不到頁面" />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}
```

**解析**

- `featured` 為真的行程同時進輪播與熱門區。一筆精選都沒有時，輪播改拿陣列前面的行程。
- 輪播只切換圖片的 `opacity`。系統偏好減少動態時，不設那個 4.5 秒的計時器。
- 搜尋把地區與天數寫進查詢字串，導到 `/tours`。真正的篩選留在列表頁。
- 評價只存 `tourId`，標題從行程陣列回查，兩處標題才不會各寫一份。
- `Store` 目前只提供 `tours`。報名陣列等詳情頁要算剩餘名額再放進來。
- `.panel`、`.text-link`、`.price-tag` 寫在 `components` 層。Select 箭頭、圓形 IconButton、卡片、Chip 與星星的覆寫寫進 `theme.js`。

{% note success %}
**換你試試：**
把輪播間隔從 4.5 秒改成 8 秒。偏好減少動態時維持不自動播放。
{% endnote %}

<details>
<summary>參考答案</summary>

只改間隔的毫秒數。偏好減少動態的那個判斷留著。

```diff 06-project-init/src/components/HeroSlider.jsx
 // ...
     if (!count || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
-    const timer = setInterval(() => setIndex((current) => (current + 1) % count), 4500);
+    const timer = setInterval(() => setIndex((current) => (current + 1) % count), 8000);
     return () => clearInterval(timer);
 // ...
```
</details>

## 行程列表

列表要八筆，並依網址上的查詢參數篩選、排序。主題、價格區間與排序選項是這一頁才補進資料的。

```diff 06-project-init/src/data/tours.js
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

```diff 06-project-init/src/data/options.js
 // ...
 export const dayOptions = [2, 3, 4, 5];
 
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

```diff 06-project-init/src/format.js
 // ...
 export const perPerson = (tour) => (tour?.id === 'kyoto-nara' ? '/ 人，不含國際機票' : '/ 人');
+
+export const matchPrice = (price, band) => {
+  if (!band) return true;
+  if (band === 'lt10000') return price < 10000;
+  if (band === '10000-20000') return price >= 10000 && price < 20000;
+  if (band === '20000-30000') return price >= 20000 && price < 30000;
+  if (band === 'gt30000') return price >= 30000;
+  return true;
+};
```

手風琴的圓角、邊線與展開圖示補進主題。展開圖示沿用 `ms`。

```diff 06-project-init/src/theme.js
 // ...
         root: { borderRadius: 24, boxShadow: '0 10px 28px rgb(31 42 68 / 8%)', backgroundColor: tokens.white, backgroundImage: 'none' },
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
+      styleOverrides: { root: { minHeight: 56, paddingInline: 20, '&.Mui-expanded': { minHeight: 56 } } },
+    },
     MuiChip: {
 // ...
```

```jsx 06-project-init/src/components/TourFilters.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { dayOptions, priceBands, regions, sortOptions } from '../data/options.js';
import FieldSelect from './FieldSelect.jsx';

const regionOptions = [{ value: '', label: '不限' }, ...regions.map((item) => ({ value: item, label: item }))];
const dayChoices = [{ value: '', label: '不限' }, ...dayOptions.map((item) => ({ value: String(item), label: `${item} 天` }))];

const read = (params) => ({
  region: params.get('region') ?? '',
  days: params.get('days') ?? '',
  price: params.get('price') ?? '',
  sort: params.get('sort') || 'price-asc',
});

export default function TourFilters() {
  const [params, setParams] = useSearchParams();
  const query = params.toString();
  const [draft, setDraft] = useState(() => read(params));
  useEffect(() => { setDraft(read(new URLSearchParams(query))); }, [query]);
  const [open, setOpen] = useState('region');
  const theme = params.get('theme') ?? '';
  const set = (key) => (value) => setDraft((current) => ({ ...current, [key]: value }));

  const apply = (event) => {
    event.preventDefault();
    const next = new URLSearchParams();
    if (draft.region) next.set('region', draft.region);
    if (draft.days) next.set('days', draft.days);
    if (draft.price) next.set('price', draft.price);
    if (draft.sort && draft.sort !== 'price-asc') next.set('sort', draft.sort);
    if (theme) next.set('theme', theme);
    setParams(next);
  };

  const fields = [
    { key: 'region', label: '地區', options: regionOptions },
    { key: 'days', label: '天數', options: dayChoices },
    { key: 'price', label: '價格', options: priceBands },
    { key: 'sort', label: '排序', options: sortOptions },
  ];

  return (
    <form className="mt-8" onSubmit={apply}>
      <div className="md:hidden">
        {fields.map((field) => (
          <Accordion key={field.key} expanded={open === field.key} onChange={(_, expanded) => setOpen(expanded ? field.key : '')} className="mb-2">
            <AccordionSummary>{field.label}</AccordionSummary>
            <AccordionDetails>
              <FieldSelect id={`m-${field.key}`} label={field.label} hiddenLabel value={draft[field.key]} onChange={set(field.key)} options={field.options} />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <div className="hidden gap-4 md:grid md:grid-cols-4">
        {fields.map((field) => (
          <FieldSelect key={field.key} id={field.key} label={field.label} value={draft[field.key]} onChange={set(field.key)} options={field.options} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="submit" variant="contained">套用條件</Button>
        <Button type="button" variant="outlined" onClick={() => { setDraft({ region: '', days: '', price: '', sort: 'price-asc' }); setParams(new URLSearchParams()); }}>清除</Button>
      </div>
      {theme ? <Chip className="mt-4" color="primary" label={`主題：${theme}`} onDelete={() => { const next = new URLSearchParams(params); next.delete('theme'); setParams(next); }} /> : null}
    </form>
  );
}
```

提示框的圓角、成功色與圖示補進主題。關閉鈕也改成圖示字型。

```diff 06-project-init/src/theme.js
 // ...
 const SelectArrow = ({ className }) => ms('expand_more', { className });
+const CloseIcon = () => ms('close');
 
 const theme = createTheme({
 // ...
         emptyIcon: ms('star'),
       },
     },
+    MuiAlert: {
+      defaultProps: {
+        iconMapping: { success: ms('check_circle'), info: ms('info'), warning: ms('warning'), error: ms('error') },
+        slots: { closeIcon: CloseIcon },
+      },
+      styleOverrides: {
+        root: { borderRadius: 16, alignItems: 'center' },
+        standardSuccess: {
+          backgroundColor: tokens.mist,
+          color: tokens.action,
+          '& .MuiAlert-icon': { color: tokens.action },
+        },
+      },
+    },
   },
 // ...
```

```jsx 06-project-init/src/pages/ToursPage.jsx
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TourCard from '../components/TourCard.jsx';
import TourFilters from '../components/TourFilters.jsx';
import { matchPrice } from '../format.js';
import { useStore } from '../store.jsx';

export default function ToursPage() {
  const { tours } = useStore();
  const [params, setParams] = useSearchParams();
  useEffect(() => { document.title = '行程 · 洛奇旅行'; }, []);

  const visible = useMemo(() => {
    const region = params.get('region') ?? '';
    const days = params.get('days') ?? '';
    const price = params.get('price') ?? '';
    const theme = params.get('theme') ?? '';
    const sort = params.get('sort') || 'price-asc';
    const list = tours.filter((tour) => (
      (!region || tour.region === region)
      && (!days || String(tour.days) === days)
      && (!theme || tour.theme === theme)
      && matchPrice(tour.price, price)
    ));
    const rank = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'days-asc': (a, b) => a.days - b.days || a.price - b.price,
    };
    return [...list].sort(rank[sort] || rank['price-asc']);
  }, [params, tours]);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1">行程</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">依地區、天數與預算挑選。價格為每人，以新台幣計。</p>
      <TourFilters />
      <div id="tour-list">
      {visible.length ? (
        <>
          <Typography variant="h2" className="mt-10">{visible.length} 筆行程</Typography>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((tour) => <TourCard key={tour.id} tour={tour} showTheme />)}
          </div>
        </>
      ) : (
        <section id="tour-empty" className="mt-16 rounded-card bg-foam px-6 py-10 shadow-card" aria-labelledby="empty-title">
          <Alert severity="info">沒有符合的條件。</Alert>
          <Typography id="empty-title" variant="h2" className="mt-3">沒有符合的行程</Typography>
          <p className="mt-3 max-w-prose">換一個地區或天數，或清掉價格條件。</p>
          <Button className="mt-6" variant="contained" onClick={() => setParams(new URLSearchParams())}>清除條件</Button>
        </section>
      )}
      </div>
    </main>
  );
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import HomePage from './pages/HomePage.jsx';
+import ToursPage from './pages/ToursPage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
           <Route index element={<HomePage />} />
-          <Route path="tours" element={<Placeholder title="行程列表" />} />
+          <Route path="tours" element={<ToursPage />} />
           <Route path="tours/:id" element={<Placeholder title="行程詳情" />} />
 // ...
```

**解析**

- 篩選條件放在查詢參數，重新整理還在。表單先改草稿，按「套用條件」才寫回網址。
- `theme` 由首頁的主題圖帶入。清除地區與價格時要留著它，拿掉主題用 Chip 的 `onDelete`。
- 網址沒寫排序時，當成價格由低到高，網址就不必每筆都帶預設值。
- `id="tour-list"` 同時包住有結果與沒結果，空狀態才不會落在這個節點外面。
- 手風琴的外框與 Alert 的圖示在這一節寫進 `theme.js`。關於頁的常見問題沿用同一組手風琴。

## 行程詳情

詳情頁補上圖集、亮點、每日行程、費用與每一梯的名額，並用報名種子計算剩餘人數。未登入按報名，會先去登入頁，原本要去的網址放在 `next`。

八筆都要補上同一組欄位，diff 不會比整檔短，這裡直接換成完成後的 `tours.js`。

```js 06-project-init/src/data/tours.js
const shot = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

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
    images: [shot('1519320993082-43a535317ddc'), shot('1613954100945-fb1a8a1ee41f'), shot('1470004914212-05527e49370b')],
    intro: '第一天沿迪化街走到大稻埕碼頭，第二天北投泡湯，下午不排景點。',
    highlights: ['每團 8 人', '迪化街只走路，不進購物站', '兩晚都住北投，不換飯店'],
    itinerary: [
      { day: 1, title: '大稻埕', body: '下午從迪化街走到大稻埕碼頭。晚上住北投。' },
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
    images: [shot('1606833505861-303ed278f7f2'), shot('1677628987592-c3ad2f546fef'), shot('1476673160081-cf065607f449')],
    intro: '第一天只走北海岸幾個灣澳，第二天九份排上午，下午自己決定要不要再爬階梯。',
    highlights: ['每團 8 人', '北海岸與九份分開兩天', '不住在九份老街裡'],
    itinerary: [
      { day: 1, title: '北海岸', body: '只停幾個灣澳，傍晚回到基隆住。' },
      { day: 2, title: '九份', body: '上午上九份。下午自己決定要不要再走，傍晚送車站。' },
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
    images: [shot('1604214896221-b13d964b214a'), shot('1433086966358-54859d0ed716'), shot('1559827260-dc66d52bef19')],
    intro: '第一天沿七星潭走路，第二天進太魯閣只排燕子口與九曲洞，下午留白。',
    highlights: ['每團 8 人', '太魯閣一日只走兩個步道', '住壽豐，不每天換飯店'],
    itinerary: [
      { day: 1, title: '抵達花蓮', body: '下午到花蓮，走七星潭海岸步道。晚上住壽豐。' },
      { day: 2, title: '太魯閣', body: '燕子口、九曲洞，不進錐麓古道。下午留白。' },
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
    images: [shot('1761549849498-8cf23a31329d'), shot('1500382017468-9049fed747ef'), shot('1471922694854-ff1b63b20054')],
    intro: '第一天在池上騎一段田邊的路，第二天去成功看漁港，不把兩個地方排在同一天。',
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
    images: [shot('1677607223752-aa6ae7e582ae'), shot('1528183429752-a97d0bf99b5a'), shot('1552465011-b4e21bf6e79a')],
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
    images: [shot('1496564203457-11bb12075d90'), shot('1621848296279-7751546e9acc'), shot('1650039871209-8cbaa62f0821')],
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
    images: [shot('1593759057907-b3fd6244741b'), shot('1510414842594-a61c69b5ae57'), shot('1475924156734-496f6cac6ec1')],
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
    images: [shot('1493976040374-85c8e12f0c0e'), shot('1478436127897-769e1b3f0f36'), shot('1632923754832-60642c12a7ed')],
    intro: '嵐山、伏見、奈良各一天，中間留一天在市內走。四晚不換飯店。',
    highlights: ['每團 8 人', '四晚不換飯店', '不含國際機票'],
    itinerary: [
      { day: 1, title: '抵達京都', body: '下午在飯店附近走路。四晚都住同一間。' },
      { day: 2, title: '嵐山', body: '嵐山走一天，傍晚回宿。' },
      { day: 3, title: '市內', body: '這天不排景點，自己走。' },
      { day: 4, title: '伏見', body: '只排兩間酒造，下午自己走回宿。' },
      { day: 5, title: '奈良與返程', body: '上午奈良，下午自行前往機場。國際機票不含。' },
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
```

```js 06-project-init/src/data/bookings.js
/** 後台清單。姓名與「我的報名」範例不一致，兩頁各自照靜態模板。 */
export const bookings = [
  {
    id: 'b1', tourId: 'hualien-taroko', tourTitle: '花蓮太魯閣與七星潭四日', departureId: '2026-12-18', date: '2026-12-18',
    people: 2, name: '林可', email: 'lin@example.com', phone: '0912000111', subtotal: 53600, uid: 'demo-lin', status: 'pending',
  },
  {
    id: 'b2', tourId: 'kyoto-nara', tourTitle: '京都嵐山、伏見與奈良五日', departureId: '2027-04-06', date: '2027-04-06',
    people: 1, name: '陳予安', email: 'chen@example.com', phone: '0912000222', subtotal: 52800, uid: 'demo-chen', status: 'confirmed',
  },
  {
    id: 'b3', tourId: 'tainan-anping', tourTitle: '台南府城與安平兩日', departureId: '2026-11-28', date: '2026-11-28',
    people: 3, name: '周以寧', email: 'chou@example.com', phone: '0912000333', subtotal: 26400, uid: 'demo-chou', status: 'cancelled',
  },
  {
    id: 'b4', tourId: 'taipei-beitou', tourTitle: '台北大稻埕與北投溫泉三日', departureId: '2026-12-04', date: '2026-12-04',
    people: 2, name: '何品', email: 'ho@example.com', phone: '0912000444', subtotal: 37200, uid: 'demo-ho', status: 'confirmed',
  },
];
```

```jsx 06-project-init/src/session.jsx
import { createContext, useContext, useMemo, useState } from 'react';

const KEY = 'loki-travel-session';
const SessionContext = createContext(null);

const readUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
};

export function SessionProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const api = useMemo(() => ({
    user,
    signIn() {
      const next = { name: '林可', email: 'lin@example.com', role: 'member' };
      sessionStorage.setItem(KEY, JSON.stringify(next));
      setUser(next);
    },
    signInAdmin() {
      const next = { name: '管理員', email: 'admin@gmail.com', role: 'admin' };
      sessionStorage.setItem(KEY, JSON.stringify(next));
      setUser(next);
    },
    signOut() {
      sessionStorage.removeItem(KEY);
      setUser(null);
    },
  }), [user]);
  return <SessionContext.Provider value={api}>{children}</SessionContext.Provider>;
}

export const useSession = () => useContext(SessionContext);
```

```diff 06-project-init/src/format.js
 // ...
 export const perPerson = (tour) => (tour?.id === 'kyoto-nara' ? '/ 人，不含國際機票' : '/ 人');
 
+export const seatsLeft = (bookings, tourId, departure) => Math.max(
+  0,
+  departure.capacity - bookings
+    .filter((item) => item.tourId === tourId && item.departureId === departure.id && item.status !== 'cancelled')
+    .reduce((sum, item) => sum + Number(item.people), 0),
+);
+
 // ...
```

```diff 06-project-init/src/store.jsx
 // ...
 import { tours as seedTours } from './data/tours.js';
+import { bookings as seedBookings } from './data/bookings.js';
 
 // ...
   const [tours] = useState(seedTours);
+  const [bookings] = useState(seedBookings);
   return (
-    <StoreContext.Provider value={{ tours }}>
+    <StoreContext.Provider value={{ tours, bookings }}>
       {children}
 // ...
```

```jsx 06-project-init/src/components/Gallery.jsx
import { useState } from 'react';

export default function Gallery({ images, title }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div className="mt-8">
      <img className="aspect-[3/2] w-full rounded-card object-cover shadow-card" src={current} width="1200" height="800" alt={title} />
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            aria-label={`顯示${title}第 ${index + 1} 張`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => setActive(index)}
            className={`h-20 w-28 shrink-0 overflow-hidden rounded-2xl ring-2 ring-offset-2 ring-offset-paper ${index === active ? 'ring-action' : 'ring-transparent'}`}
          >
            <img className="h-full w-full object-cover" src={src} alt="" width="160" height="106" />
          </button>
        ))}
      </div>
    </div>
  );
}
```

```jsx 06-project-init/src/components/Itinerary.jsx
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default function Itinerary({ days }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="mt-5">
      {days.map((item) => (
        <Accordion key={item.day} expanded={open === item.day} onChange={(_, expanded) => setOpen(expanded ? item.day : null)} className="mb-2">
          <AccordionSummary>第 {item.day} 天 · {item.title}</AccordionSummary>
          <AccordionDetails><p className="text-base leading-relaxed text-muted">{item.body}</p></AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
```

```jsx 06-project-init/src/components/FareBox.jsx
import Typography from '@mui/material/Typography';

const Column = ({ title, items }) => (
  <section>
    <Typography variant="h3">{title}</Typography>
    <ul className="mt-4 list-disc pl-5 leading-relaxed">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  </section>
);

export default function FareBox({ includes, excludes }) {
  return (
    <div className="panel mt-14 grid gap-8 p-6 sm:grid-cols-2 md:gap-12 md:p-8">
      <Column title="費用包含" items={includes} />
      <Column title="費用不含" items={excludes} />
    </div>
  );
}
```

```jsx 06-project-init/src/components/DepartureList.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import { seatsLeft } from '../format.js';
import { useSession } from '../session.jsx';

export default function DepartureList({ tour, bookings }) {
  const { user } = useSession();
  return (
    <ul className="panel mt-4 max-w-3xl divide-y divide-line overflow-hidden px-5">
      {tour.departures.map((departure) => {
        const left = seatsLeft(bookings, tour.id, departure);
        const next = `/booking?tourId=${tour.id}&departureId=${departure.id}`;
        const to = user ? next : `/login?next=${encodeURIComponent(next)}`;
        return (
          <li key={departure.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{departure.date}</p>
              <p className="text-muted">名額 {departure.capacity} 人，剩餘 {left} 人</p>
            </div>
            <Button component={Link} to={to} variant="contained" className="w-full sm:w-auto">立即報名</Button>
          </li>
        );
      })}
    </ul>
  );
}
```

```jsx 06-project-init/src/pages/TourDetailPage.jsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import DepartureList from '../components/DepartureList.jsx';
import FareBox from '../components/FareBox.jsx';
import Gallery from '../components/Gallery.jsx';
import Itinerary from '../components/Itinerary.jsx';
import Placeholder from '../components/Placeholder.jsx';
import { ntd, seatsLeft } from '../format.js';
import { useSession } from '../session.jsx';
import { useStore } from '../store.jsx';

export default function TourDetailPage() {
  const { id } = useParams();
  const { tours, bookings } = useStore();
  const { user } = useSession();
  const tour = tours.find((item) => item.id === id);
  const [departureId, setDepartureId] = useState(tour?.departures[0]?.id ?? '');
  useEffect(() => { document.title = tour ? `${tour.title} · 洛奇旅行` : '找不到頁面 · 洛奇旅行'; }, [tour]);
  useEffect(() => { setDepartureId(tour?.departures[0]?.id ?? ''); }, [tour]);
  if (!tour) return <Placeholder title="找不到頁面" />;

  const selected = tour.departures.find((item) => item.id === departureId) ?? tour.departures[0];
  const next = `/booking?tourId=${tour.id}&departureId=${selected.id}`;
  const bookTo = user ? next : `/login?next=${encodeURIComponent(next)}`;

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 pb-28 sm:px-6 md:py-24 lg:pb-24">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(20rem,24rem)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <p><Link className="text-link" to="/tours">回行程列表</Link></p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip color="secondary" label={tour.region} />
            <Chip variant="outlined" label={tour.theme} />
            <Chip variant="outlined" label={`${tour.days} 天`} />
          </div>
          <Typography variant="h1" className="mt-4">{tour.title}</Typography>
          <p className="mt-4 font-serif text-4xl font-bold text-ink lg:hidden">{ntd(tour.price)}<span className="font-sans text-base font-normal text-muted"> / 人</span></p>
          <Gallery images={tour.images} title={tour.title} />
          <p className="mt-8 text-lg leading-relaxed">{tour.intro}</p>
          <Typography variant="h2" className="mt-14">亮點</Typography>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {tour.highlights.map((item) => <li key={item} className="rounded-card bg-mist px-5 py-4 text-base">{item}</li>)}
          </ul>
          <Typography variant="h2" className="mt-14">每日行程</Typography>
          <p className="mt-3 text-base text-muted">展開每一天，看當天去哪裡、晚上住哪裡。</p>
          <Itinerary days={tour.itinerary} />
          <FareBox includes={tour.includes} excludes={tour.excludes} />
          <div className="mt-14 lg:hidden">
            <Typography variant="h2">出發日</Typography>
            <p className="mt-3 text-base text-muted">最近一梯 {tour.departures[0].date} 尚餘 {seatsLeft(bookings, tour.id, tour.departures[0])} 人。</p>
            <DepartureList tour={tour} bookings={bookings} />
          </div>
          <Typography variant="h2" className="mt-14">取消與退款</Typography>
          <p className="mt-3 text-base leading-relaxed text-muted">出團前以 email 確認。未成行全額退回。成行後若要改期，請來信或來電，由我們為你調整。常見問題也寫在關於頁。</p>
        </div>
        <aside className="panel sticky top-24 mt-12 hidden self-start p-8 lg:mt-0 lg:block">
          <p className="flex items-baseline gap-1.5 whitespace-nowrap font-serif text-4xl"><span className="price-tag">{ntd(tour.price)}</span><span className="font-sans text-base font-normal text-muted">/ 人</span></p>
          {tour.id === 'kyoto-nara' ? <p className="mt-3 text-base text-muted">不含國際機票</p> : null}
          <dl className="mt-6 grid gap-3 text-base">
            <div className="flex justify-between gap-4"><dt className="text-muted">天數</dt><dd>{tour.days} 天</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted">團體上限</dt><dd>{tour.departures[0]?.capacity ?? 8} 人</dd></div>
          </dl>
          <div className="mt-6 grid gap-3" role="radiogroup" aria-label="選擇梯次">
            {tour.departures.map((departure) => {
              const on = departure.id === selected.id;
              return (
                <button
                  key={departure.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setDepartureId(departure.id)}
                  className={`rounded-card border px-4 py-3 text-left ${on ? 'border-action bg-mist' : 'border-line bg-white'}`}
                >
                  <span className="block font-medium">{departure.date}</span>
                  <span className="text-base text-muted">剩餘 {seatsLeft(bookings, tour.id, departure)} 人</span>
                </button>
              );
            })}
          </div>
          <Button component={Link} to={bookTo} variant="contained" className="mt-8 w-full">立即報名</Button>
        </aside>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <p className="font-serif text-2xl font-bold text-ink">{ntd(tour.price)}</p>
          <Button component={Link} to={bookTo} variant="contained">立即報名</Button>
        </div>
      </div>
    </main>
  );
}
```

```jsx 06-project-init/src/App.jsx
import { Route, Routes } from 'react-router';
import { SessionProvider } from './session.jsx';
import { StoreProvider } from './store.jsx';
import SiteLayout from './layouts/SiteLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ToursPage from './pages/ToursPage.jsx';
import TourDetailPage from './pages/TourDetailPage.jsx';
import Placeholder from './components/Placeholder.jsx';

export default function App() {
  return (
    <SessionProvider>
      <StoreProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tours" element={<ToursPage />} />
            <Route path="tours/:id" element={<TourDetailPage />} />
            <Route path="booking" element={<Placeholder title="報名" />} />
            <Route path="booking/done" element={<Placeholder title="報名完成" />} />
            <Route path="me" element={<Placeholder title="我的報名" />} />
            <Route path="about" element={<Placeholder title="關於" />} />
            <Route path="login" element={<Placeholder title="登入提示" />} />
            <Route path="admin/login" element={<Placeholder title="後台登入" />} />
            <Route path="admin" element={<Placeholder title="後台行程" />} />
            <Route path="admin/bookings" element={<Placeholder title="後台報名" />} />
            <Route path="*" element={<Placeholder title="找不到頁面" />} />
          </Route>
        </Routes>
      </StoreProvider>
    </SessionProvider>
  );
}
```

**解析**

- 網址上的 id 對不到行程時，先渲染佔位頁。找不到頁的元件留到最後一節再換上。
- 未登入時，報名連結的 `next` 是原本要去的 `/booking?tourId=...`。登入頁只接受站內路徑。
- `seatsLeft` 用名額減去未取消的人數，結果不會小於 0。寬螢幕把梯次放在右欄，窄螢幕改用 `DepartureList`，底部另外固定一條報名列。
- `session` 在這一頁第一次用到，所以 `App` 從這裡才包上 `SessionProvider`。兩個登入方法先一起放進 context，後台頁才會呼叫管理員那個。

## 報名

未登入進 `/booking` 會被送到 `/login?next=`。姓名與 email 來自 session，電話才讓使用者填，小計隨著人數變。

```jsx 06-project-init/src/components/MemberGate.jsx
import { Navigate, useLocation } from 'react-router';
import { useSession } from '../session.jsx';

export default function MemberGate({ children }) {
  const { user } = useSession();
  const location = useLocation();
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`} replace />;
  return children;
}
```

文字欄的外框圓角補進主題。

```diff 06-project-init/src/theme.js
 // ...
         root: { borderRadius: 24, boxShadow: '0 10px 28px rgb(31 42 68 / 8%)', backgroundColor: tokens.white, backgroundImage: 'none' },
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

```jsx 06-project-init/src/components/BookingForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ntd } from '../format.js';
import { useStore } from '../store.jsx';
import FieldSelect from './FieldSelect.jsx';

export default function BookingForm({ tour, departure, user }) {
  const navigate = useNavigate();
  const { createBooking } = useStore();
  const [people, setPeople] = useState('2');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const subtotal = tour.price * Number(people);
  const name = user.name || user.email.split('@')[0];
  const phoneInvalid = !phone.trim();
  const showPhoneError = (touched || submitted) && phoneInvalid;

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (phoneInvalid) {
      setError('請填電話，此欄必填');
      return;
    }
    createBooking({
      tourId: tour.id,
      tourTitle: tour.title,
      departureId: departure.id,
      date: departure.date,
      people: Number(people),
      name,
      email: user.email,
      phone: phone.trim(),
      subtotal,
    });
    navigate('/booking/done');
  };

  return (
    <form id="booking-form" noValidate className="panel grid gap-4 p-6 md:p-8" onSubmit={submit}>
      <Typography variant="h2">填寫資料</Typography>
      <Alert severity="success">已登入 · {name} · {user.email}</Alert>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="姓名" value={name} slotProps={{ input: { readOnly: true } }} />
        <TextField label="Email" type="email" value={user.email} slotProps={{ input: { readOnly: true } }} />
      </div>
      <FieldSelect id="people" label="人數" value={people} onChange={setPeople} options={[1, 2, 3, 4, 5, 6, 7, 8].map((count) => ({ value: String(count), label: String(count) }))} />
      <TextField
        label="電話"
        type="tel"
        required
        placeholder="0912000111"
        value={phone}
        error={showPhoneError}
        helperText={showPhoneError ? '必填：請留下可聯絡的電話' : ' '}
        onBlur={() => setTouched(true)}
        onChange={(event) => { setPhone(event.target.value); if (event.target.value.trim()) setError(''); }}
      />
      {error ? <Alert severity="error">{error}</Alert> : null}
      <p>小計 <span className="font-serif text-2xl font-bold text-action">{ntd(subtotal)}</span></p>
      <p className="text-muted">小計會依人數更新。送出後我們用 email 確認。</p>
      <Button type="submit" variant="contained">送出報名</Button>
    </form>
  );
}
```

```diff 06-project-init/src/store.jsx
 // ...
   const [tours] = useState(seedTours);
-  const [bookings] = useState(seedBookings);
+  const [bookings, setBookings] = useState(seedBookings);
+  const [lastBooking, setLastBooking] = useState(null);
+  const [notice, setNotice] = useState('');
+
+  const createBooking = (input) => {
+    const row = { id: `local-${Date.now()}`, status: 'pending', uid: 'demo-local', ...input };
+    setBookings((list) => [row, ...list]);
+    setLastBooking(row);
+    setNotice('報名已送出，狀態是待確認');
+    return row;
+  };
+
   return (
-    <StoreContext.Provider value={{ tours, bookings }}>
+    <StoreContext.Provider value={{ tours, bookings, lastBooking, notice, clearNotice: () => setNotice(''), createBooking }}>
       {children}
 // ...
```

```diff 06-project-init/src/layouts/SiteLayout.jsx
 import { Outlet } from 'react-router';
+import Alert from '@mui/material/Alert';
+import Snackbar from '@mui/material/Snackbar';
 import SiteHeader from '../components/SiteHeader.jsx';
 import SiteFooter from '../components/SiteFooter.jsx';
+import { useStore } from '../store.jsx';
 
 export default function SiteLayout() {
+  const { notice, clearNotice } = useStore();
   return (
 // ...
       <SiteFooter />
+      <Snackbar open={Boolean(notice)} autoHideDuration={3200} onClose={clearNotice} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
+        <Alert severity="success" variant="filled" onClose={clearNotice}>{notice}</Alert>
+      </Snackbar>
     </div>
 // ...
```

步驟圓點改成圖示字型。完成的步驟畫勾，進行中的步驟用實心圓。

```diff 06-project-init/src/theme.js
 // ...
 const CloseIcon = () => ms('close');
+const StepIcon = ({ active, completed, icon }) => {
+  const base = 'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold';
+  if (completed) return createElement('span', { className: `${base} bg-action text-white` }, ms('check', { style: { fontSize: 20 } }));
+  return createElement('span', { className: `${base} ${active ? 'bg-action text-white' : 'bg-line text-muted'}` }, icon);
+};
 
 const theme = createTheme({
 // ...
         emptyIcon: ms('star'),
       },
     },
+    MuiStepLabel: {
+      defaultProps: { slots: { stepIcon: StepIcon } },
+    },
     MuiAlert: {
 // ...
```

```jsx 06-project-init/src/pages/BookingPage.jsx
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import Alert from '@mui/material/Alert';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import BookingForm from '../components/BookingForm.jsx';
import MemberGate from '../components/MemberGate.jsx';
import { ntd } from '../format.js';
import { useSession } from '../session.jsx';
import { useStore } from '../store.jsx';

const steps = ['選出發日', '填寫資料', '送出確認'];

function BookingBody() {
  const { user } = useSession();
  const { tours } = useStore();
  const [params] = useSearchParams();
  const tour = tours.find((item) => item.id === (params.get('tourId') || 'hualien-taroko'));
  const departure = tour?.departures.find((item) => item.id === params.get('departureId')) || tour?.departures[0];
  useEffect(() => { document.title = '報名 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Stepper activeStep={1} alternativeLabel className="mb-10" sx={{ '& .MuiStepLabel-label': { fontSize: '1.125rem', fontWeight: 700, marginTop: '8px' } }}>
        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">姓名與 email 由登入帳號帶入。請留下電話，我們會用 email 確認。</p>
      {!tour || !departure ? (
        <Alert className="mt-8" severity="warning">找不到這趟行程或出發日。<Link className="ml-2 underline" to="/tours">回行程</Link></Alert>
      ) : (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
          <BookingForm tour={tour} departure={departure} user={user} />
          <aside className="panel p-6 md:p-8 lg:sticky lg:top-24">
            <Typography variant="h2">這趟行程</Typography>
            <dl className="mt-5 grid gap-4 text-base">
              <div><dt className="text-muted">行程</dt><dd className="mt-1 text-lg font-medium">{tour.title}</dd></div>
              <div><dt className="text-muted">出發日</dt><dd className="mt-1 text-lg">{departure.date}</dd></div>
              <div><dt className="text-muted">天數</dt><dd className="mt-1 text-lg">{tour.days} 天</dd></div>
              <div>
                <dt className="text-muted">每人</dt>
                <dd className="mt-1 whitespace-nowrap font-serif text-3xl font-bold text-ink">{ntd(tour.price)}<span className="font-sans text-base font-normal text-muted"> / 人</span></dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </main>
  );
}

export default function BookingPage() {
  return <MemberGate><BookingBody /></MemberGate>;
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import TourDetailPage from './pages/TourDetailPage.jsx';
+import BookingPage from './pages/BookingPage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
             <Route path="tours/:id" element={<TourDetailPage />} />
-            <Route path="booking" element={<Placeholder title="報名" />} />
+            <Route path="booking" element={<BookingPage />} />
             <Route path="booking/done" element={<Placeholder title="報名完成" />} />
 // ...
```

**解析**

- `MemberGate` 沒有使用者時，把目前路徑與查詢參數放進 `next`，並用 `replace` 換掉這一筆歷史紀錄。
- 姓名與 email 唯讀。電話是空的就不能送出，`id="booking-form"` 留在這張表單上。
- `createBooking` 把新的一筆插到陣列最前面，並記下 `lastBooking`，完成頁才讀得到剛送出的內容。
- 提示文字放在 `notice`。版面用 Snackbar 顯示，重新整理就回到種子，提示也跟著消失。
- 輸入框圓角與步驟圖示在這一節補進 `theme.js`。

{% note success %}
**換你試試：**
把人數的起始值從 2 改成 1，打開報名頁時小計應等於一人的價格。
{% endnote %}

<details>
<summary>參考答案</summary>

只改 `useState` 的起始字串。送出時仍會用當時選到的人數去算小計。

```diff 06-project-init/src/components/BookingForm.jsx
 // ...
   const { createBooking } = useStore();
-  const [people, setPeople] = useState('2');
+  const [people, setPeople] = useState('1');
   const [phone, setPhone] = useState('');
 // ...
```
</details>

## 報名完成

直接打開完成頁、記憶體裡還沒有剛送出的那一筆時，畫面用寫在頁面裡的範例，狀態是待確認。

```diff 06-project-init/src/format.js
 // ...
 export const perPerson = (tour) => (tour?.id === 'kyoto-nara' ? '/ 人，不含國際機票' : '/ 人');
 
+export const statusLabel = { pending: '待確認', confirmed: '已確認', cancelled: '已取消' };
+
 // ...
```

```jsx 06-project-init/src/pages/BookingDonePage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import MemberGate from '../components/MemberGate.jsx';
import { ntd, statusLabel } from '../format.js';
import { useStore } from '../store.jsx';

const steps = ['選出發日', '填寫資料', '送出確認'];
const sample = {
  tourTitle: '花蓮太魯閣與七星潭四日', date: '2026-12-18', people: 2, phone: '0912000111', subtotal: 53600, status: 'pending',
};

function DoneBody() {
  const { lastBooking } = useStore();
  const row = lastBooking || sample;
  useEffect(() => { document.title = '報名已送出 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Stepper activeStep={2} alternativeLabel className="mb-8">
        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>
      <Chip color="primary" label={statusLabel[row.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">報名已送出</Typography>
      <Alert className="mt-4 max-w-prose" severity="success">我們會用 email 再跟你確認。目前狀態為待確認。</Alert>
      <Typography variant="h2" className="mt-10">這筆內容</Typography>
      <dl className="panel mt-4 max-w-prose divide-y divide-line px-5">
        {[['行程', row.tourTitle], ['出發日', row.date], ['人數', row.people], ['電話', row.phone], ['小計', ntd(row.subtotal)], ['狀態', statusLabel[row.status] || row.status]].map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr]"><dt className="text-muted">{label}</dt><dd className={label === '小計' ? 'font-serif text-2xl font-bold text-action' : undefined}>{value}</dd></div>
        ))}
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button component={Link} to="/me" variant="contained">看我的報名</Button>
        <Button component={Link} to="/tours" variant="outlined">回行程</Button>
      </div>
    </main>
  );
}

export default function BookingDonePage() {
  return <MemberGate><DoneBody /></MemberGate>;
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import BookingPage from './pages/BookingPage.jsx';
+import BookingDonePage from './pages/BookingDonePage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
             <Route path="booking" element={<BookingPage />} />
-            <Route path="booking/done" element={<Placeholder title="報名完成" />} />
+            <Route path="booking/done" element={<BookingDonePage />} />
             <Route path="me" element={<Placeholder title="我的報名" />} />
 // ...
```

**解析**

- 有 `lastBooking` 就顯示那一筆，否則用頁內的 `sample`。這筆範例不寫進 `data/`。
- Stepper 停在第三步。三個狀態代碼共用 `statusLabel`，後面的報名清單也讀這一份。
- 這一頁同樣套 `MemberGate`。`FieldSelect` 已在首頁寫過，報名表直接沿用。

## 我的報名

林可看得到四筆範例，欄位比後台那四筆少，而且不放進同一個匯出。這次在瀏覽器裡送出的報名會排在範例上面。

```diff 06-project-init/src/data/bookings.js
 // ...
 ];
+
+/** 我的報名頁照模板：四筆都掛在林可底下，不匯入後台種子。 */
+export const mySamples = [
+  { status: 'pending', title: '花蓮太魯閣與七星潭四日', date: '2026-12-18', people: 2, phone: '0912000111', subtotal: 53600 },
+  { status: 'confirmed', title: '京都嵐山、伏見與奈良五日', date: '2027-04-06', people: 1, phone: '0912000222', subtotal: 52800 },
+  { status: 'cancelled', title: '台南府城與安平兩日', date: '2026-11-28', people: 3, phone: '0912000333', subtotal: 26400 },
+  { status: 'confirmed', title: '台北大稻埕與北投溫泉三日', date: '2026-12-04', people: 2, phone: '0912000444', subtotal: 37200 },
+];
```

```jsx 06-project-init/src/pages/MyBookingsPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import MemberGate from '../components/MemberGate.jsx';
import { mySamples } from '../data/bookings.js';
import { ntd, statusLabel } from '../format.js';
import { useSession } from '../session.jsx';
import { useStore } from '../store.jsx';

const chipColor = { pending: 'primary', confirmed: 'secondary', cancelled: 'error' };

function Row({ status, title, date, people, phone, subtotal }) {
  return (
    <article className="py-6">
      <Chip size="small" color={chipColor[status] || 'primary'} label={statusLabel[status] || status} />
      <Typography variant="h3" className="mt-3">{title}</Typography>
      <dl className="mt-3 grid gap-3 sm:grid-cols-4">
        <div><dt className="text-muted">出發日</dt><dd>{date}</dd></div>
        <div><dt className="text-muted">人數</dt><dd>{people}</dd></div>
        <div><dt className="text-muted">電話</dt><dd>{phone}</dd></div>
        <div><dt className="text-muted">小計</dt><dd className="font-serif text-2xl font-bold text-action">{ntd(subtotal)}</dd></div>
      </dl>
    </article>
  );
}

function MeBody() {
  const { user } = useSession();
  const { bookings } = useStore();
  const fresh = bookings.filter((item) => item.email === user.email && String(item.id).startsWith('local-'));
  const samples = user.email === 'lin@example.com' ? mySamples : [];
  useEffect(() => { document.title = '我的報名 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1">我的報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">{user.name} · {user.email}。如需改期或取消，請來信或來電。</p>
      {fresh.length || samples.length ? (
        <>
          <Typography variant="h2" className="mt-10">你的報名</Typography>
          <div className="panel mt-6 max-w-3xl divide-y divide-line px-5">
            {fresh.map((item) => <Row key={item.id} status={item.status} title={item.tourTitle} date={item.date} people={item.people} phone={item.phone} subtotal={item.subtotal} />)}
            {samples.map((item) => <Row key={`${item.title}-${item.date}`} status={item.status} title={item.title} date={item.date} people={item.people} phone={item.phone} subtotal={item.subtotal} />)}
          </div>
        </>
      ) : null}
      {!fresh.length && !samples.length ? (
        <section className="mt-10 max-w-3xl" aria-labelledby="empty-title">
          <Typography id="empty-title" variant="h2">還沒有報名</Typography>
          <p className="mt-3 max-w-prose">選一個行程，挑一個出發日。</p>
          <Button className="mt-6" component={Link} to="/tours" variant="contained">去看行程</Button>
        </section>
      ) : null}
    </main>
  );
}

export default function MyBookingsPage() {
  return <MemberGate><MeBody /></MemberGate>;
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import BookingDonePage from './pages/BookingDonePage.jsx';
+import MyBookingsPage from './pages/MyBookingsPage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
             <Route path="booking/done" element={<BookingDonePage />} />
-            <Route path="me" element={<Placeholder title="我的報名" />} />
+            <Route path="me" element={<MyBookingsPage />} />
             <Route path="about" element={<Placeholder title="關於" />} />
 // ...
```

**解析**

- 這次送出的報名，用 `id` 前綴 `local-` 再加上 email，對上目前的使用者。
- `mySamples` 只在信箱是林可時接上。後台清單讀的是另一個 `bookings` 匯出，兩頁的姓名不必相同。
- 兩種都是空的時候顯示空狀態。這一頁沒有取消按鈕。

## 關於

關於頁是一段品牌說明、一組虛構的執照字號，以及六則常見問題。它不讀 Store，也不檢查登入。

```js 06-project-init/src/data/faqs.js
export const faqs = [
  { q: '一個團幾個人？', a: '每團 8 人。報名時人數選 1 到 8。' },
  { q: '費用包含什麼？', a: '台灣團包含表定住宿、當地車資與行程表上的門票。午餐與個人消費不含。' },
  { q: '京都團含機票嗎？', a: '不含國際機票，也不含你自己另外加的交通。團費是當地住宿、嚮導，以及行程表列出的交通與門票。' },
  { q: '沒有成行會怎樣？', a: '出團前以 email 確認。若未成行，團費全額退回。' },
  { q: '怎麼看我的報名？', a: '用報名時的 Google 帳號登入，到「我的報名」。換一個帳號看不到別人的單。' },
  { q: '可以自己取消嗎？', a: '改期或取消請寫信或打電話，我們會為你更新狀態。' },
];
```

```jsx 06-project-init/src/pages/AboutPage.jsx
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { faqs } from '../data/faqs.js';

export default function AboutPage() {
  const [open, setOpen] = useState(null);
  useEffect(() => { document.title = '關於 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1" className="max-w-[10em]">關於洛奇旅行</Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed">洛奇旅行安排台灣本島與一條日本關西短團。我們把一天怎麼過寫清楚：具體地名、走路的時段、晚上住哪裡。每團 8 人，不催促、不加購物站。</p>
      <section className="panel mt-12 max-w-3xl px-6 py-8" aria-labelledby="license-title">
        <Typography id="license-title" variant="h2">執照與品保</Typography>
        <p className="mt-4">交通部觀光署旅行業執照交觀甲 999999 號</p>
        <p className="mt-3 text-muted">出團前以 email 確認。未成行，團費全額退回。</p>
      </section>
      <section className="mt-12 max-w-3xl" aria-labelledby="faq-title">
        <Typography id="faq-title" variant="h2">常見問題</Typography>
        <div className="mt-4">
          {faqs.map((item, index) => (
            <Accordion key={item.q} expanded={open === index} onChange={(_, expanded) => setOpen(expanded ? index : null)} className="mb-2">
              <AccordionSummary>{item.q}</AccordionSummary>
              <AccordionDetails><p className="max-w-prose text-muted">{item.a}</p></AccordionDetails>
            </Accordion>
          ))}
        </div>
      </section>
    </main>
  );
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import MyBookingsPage from './pages/MyBookingsPage.jsx';
+import AboutPage from './pages/AboutPage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
             <Route path="me" element={<MyBookingsPage />} />
-            <Route path="about" element={<Placeholder title="關於" />} />
+            <Route path="about" element={<AboutPage />} />
             <Route path="login" element={<Placeholder title="登入提示" />} />
 // ...
```

**解析**

- 常見問題一次只展開一則。狀態記的是目前打開的索引，再開另一則時前一則會合上。
- 手風琴的外觀已在 `theme.js` 設過，這一頁只傳問題與答案。
- 執照字號「交觀甲 999999 號」是教材用的虛構號碼。

## 登入

按下按鈕寫入的是固定的旅客林可，沒有接上 Google。`next` 只接受站內路徑，通過之後頁首要改顯示姓名與登出。

登入對話框的圓角補進主題。

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

```jsx 06-project-init/src/pages/LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSession } from '../session.jsx';

export default function LoginPage() {
  const { user, signIn } = useSession();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const raw = params.get('next') || '/';
  const next = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/';
  useEffect(() => { document.title = '用 Google 帳號繼續 · 洛奇旅行'; }, []);

  const go = () => {
    if (!user) signIn();
    navigate(next);
  };

  return (
    <main id="content" className="flex-1">
      <Dialog open onClose={() => navigate('/')} fullWidth maxWidth="xs" aria-labelledby="login-title">
        <DialogTitle id="login-title" className="font-serif text-4xl leading-tight">用 Google 帳號繼續</DialogTitle>
        <DialogContent>
          <p>報名和我的報名會使用 Google 的姓名與 email。我們不另外設定密碼。</p>
          {user ? <p className="mt-4 text-muted">目前是 {user.name}。繼續會沿用這個帳號。</p> : null}
        </DialogContent>
        <DialogActions className="flex flex-col items-stretch gap-3 px-6 pb-6">
          <Button variant="contained" onClick={go}>用 Google 帳號繼續</Button>
          <Button onClick={() => navigate('/')}>返回首頁</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
```

```jsx 06-project-init/src/components/SiteHeader.jsx
import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NavLinks from './NavLinks.jsx';
import Icon from './Icon.jsx';
import { useSession } from '../session.jsx';

const item = ({ isActive }) => `inline-flex min-h-11 items-center rounded-full px-3 font-bold ${isActive ? 'bg-action text-white' : 'text-ink hover:bg-mist'}`;

export default function SiteHeader() {
  const { user, signOut } = useSession();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const admin = pathname.startsWith('/admin');
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const close = () => { setOpen(false); setAnchor(null); };
  const logout = () => { signOut(); close(); navigate('/'); };

  const account = (
    user ? (
      <Button type="button" aria-haspopup="true" aria-expanded={Boolean(anchor)} onClick={(event) => setAnchor(event.currentTarget)} className="gap-2 text-ink">
        <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{user.name.slice(0, 1)}</Avatar>
        {user.name}
      </Button>
    ) : <Button component={Link} to={admin ? '/admin/login' : '/login'} onClick={close}>{admin ? '後台登入' : '登入'}</Button>
  );

  const links = (id) => (admin ? (
    <nav id={id} className="flex flex-col gap-1 md:flex-row md:items-center" aria-label="後台">
      <NavLink to="/admin" end className={item} onClick={close}>行程管理</NavLink>
      <NavLink to="/admin/bookings" className={item} onClick={close}>報名清單</NavLink>
    </nav>
  ) : <NavLinks onNavigate={close} id={id} />);

  return (
    <AppBar id="site-header" position="sticky" component="header">
      <a className="skip" href="#content">跳到內容</a>
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link to={admin ? '/admin' : '/'} className="font-serif text-2xl font-semibold text-ink">{admin ? '洛奇旅行 · 後台' : '洛奇旅行'}</Link>
        <Button id="nav-toggle" className="md:hidden" variant="outlined" startIcon={<Icon name="menu" />} aria-expanded={open} aria-controls="site-drawer" onClick={() => setOpen(true)}>選單</Button>
        <div className="hidden items-center gap-1 md:flex">
          {links('site-nav')}
          {account}
        </div>
      </div>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {admin ? null : <MenuItem component={Link} to="/me" onClick={close}>我的報名</MenuItem>}
        <MenuItem onClick={logout}>登出</MenuItem>
      </Menu>
      <Drawer anchor="right" open={open} onClose={close}>
        <div id="site-drawer" className="flex flex-col gap-2 p-4">
          {links(undefined)}
          {user ? (
            <Button type="button" aria-haspopup="true" onClick={(event) => setAnchor(event.currentTarget)} className="justify-start gap-2 text-ink">
              <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{user.name.slice(0, 1)}</Avatar>
              {user.name}
            </Button>
          ) : <Button component={Link} to={admin ? '/admin/login' : '/login'} onClick={close}>{admin ? '後台登入' : '登入'}</Button>}
        </div>
      </Drawer>
    </AppBar>
  );
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import AboutPage from './pages/AboutPage.jsx';
+import LoginPage from './pages/LoginPage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
             <Route path="about" element={<AboutPage />} />
-            <Route path="login" element={<Placeholder title="登入提示" />} />
+            <Route path="login" element={<LoginPage />} />
             <Route path="admin/login" element={<Placeholder title="後台登入" />} />
 // ...
```

**解析**

- `signIn` 把林可寫進 `sessionStorage`，鍵名是 `loki-travel-session`。關掉分頁就消失，重新整理還在。
- `next` 要以單一斜線開頭。`//` 開頭會被瀏覽器當成協定相對網址，這種值退回首頁。
- 已經登入時不再呼叫 `signIn`，直接前往 `next`。
- 頁首從這一節起讀 session。路徑以 `/admin` 開頭時，商標與選單改成後台那一組。
- 登入 Dialog 的圓角在這一節補進 `theme.js`。

# 後台與部署

這一章把切版收尾。後台兩頁先確認 `role` 為 `admin`，旅客進得了網址時畫面只留警告與前往後台登入的按鈕。找不到的路徑換成正式頁面，打包時再讓靜態主機接得住重新整理後的網址。

## 後台登入

管理員是另一組寫進同一個 session 的身份。按下之後前往 `/admin`，擋人的邏輯放在後台頁，不放在這一頁。

`Paper` 的圓角補進主題。白底與陰影仍用已經寫好的 `.panel`。

```diff 06-project-init/src/theme.js
 // ...
         root: { borderRadius: 24, boxShadow: '0 10px 28px rgb(31 42 68 / 8%)', backgroundColor: tokens.white, backgroundImage: 'none' },
       },
     },
+    MuiPaper: {
+      styleOverrides: { rounded: { borderRadius: 24 } },
+    },
     MuiOutlinedInput: {
 // ...
```

```jsx 06-project-init/src/pages/AdminLoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSession } from '../session.jsx';

export default function AdminLoginPage() {
  const { signInAdmin } = useSession();
  const navigate = useNavigate();
  useEffect(() => { document.title = '後台登入 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24">
      <Paper elevation={0} className="panel max-w-md p-6 md:p-8">
        <Typography variant="h1">後台登入</Typography>
        <p className="mt-4 text-lg leading-relaxed">行程與報名只有管理員可以進入。</p>
        <Button className="mt-6 w-full" variant="contained" onClick={() => { signInAdmin(); navigate('/admin'); }}>用 Google 帳號繼續</Button>
      </Paper>
    </main>
  );
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import LoginPage from './pages/LoginPage.jsx';
+import AdminLoginPage from './pages/AdminLoginPage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
             <Route path="login" element={<LoginPage />} />
-            <Route path="admin/login" element={<Placeholder title="後台登入" />} />
+            <Route path="admin/login" element={<AdminLoginPage />} />
             <Route path="admin" element={<Placeholder title="後台行程" />} />
 // ...
```

**解析**

- `signInAdmin` 寫入的 `role` 是 `admin`，信箱是 `admin@gmail.com`。與旅客共用同一個儲存鍵，後來登入的會蓋掉前一個。
- 這一頁不檢查目前是誰。已經是管理員時再按一次，仍然前往 `/admin`。
- 頁首在後台路徑會顯示「後台登入」，連到的就是這一頁。
- `Paper` 的圓角在這一節補進 `theme.js`。

## 行程管理

表單沒有出現的每日行程、圖集與費用，儲存時留在原本那筆上。主題選項這一頁才補進 `options.js`。

```diff 06-project-init/src/data/options.js
 export const regions = ['台北', '基隆', '花蓮', '台東', '台南', '高雄', '金門', '京都'];
 
+export const themes = ['城市', '海岸', '山海', '古都', '離島', '日本'];
+
 // ...
```

```diff 06-project-init/src/store.jsx
 // ...
+
+const highlightsOf = (text) => String(text).split('\n').map((line) => line.trim()).filter(Boolean);
 
 export function StoreProvider({ children }) {
-  const [tours] = useState(seedTours);
+  const [tours, setTours] = useState(seedTours);
   const [bookings, setBookings] = useState(seedBookings);
 // ...
   const [notice, setNotice] = useState('');
 
+  const saveTour = (editingId, draft) => {
+    const id = draft.id.trim();
+    if (!id || !draft.title.trim()) return '編號和標題要填';
+    const prev = tours.find((item) => item.id === (editingId || id));
+    if (tours.some((item) => item.id === id && item !== prev)) return '這個編號已經有了';
+    const highlights = highlightsOf(draft.highlights);
+    const next = prev
+      ? {
+          ...prev,
+          id,
+          title: draft.title.trim(),
+          region: draft.region.trim(),
+          theme: draft.theme,
+          days: Number(draft.days),
+          price: Number(draft.price),
+          cover: draft.cover.trim(),
+          intro: draft.intro.trim(),
+          highlights,
+          departures: prev.departures.length
+            ? [{ ...prev.departures[0], id: draft.date, date: draft.date, capacity: Number(draft.capacity) }, ...prev.departures.slice(1)]
+            : [{ id: draft.date, date: draft.date, capacity: Number(draft.capacity) }],
+        }
+      : {
+          id,
+          title: draft.title.trim(),
+          region: draft.region.trim(),
+          theme: draft.theme,
+          days: Number(draft.days),
+          price: Number(draft.price),
+          cover: draft.cover.trim(),
+          images: [draft.cover.trim()],
+          intro: draft.intro.trim(),
+          highlights,
+          itinerary: [],
+          includes: [],
+          excludes: [],
+          departures: [{ id: draft.date, date: draft.date, capacity: Number(draft.capacity) }],
+          featured: false,
+        };
+    setTours(prev ? tours.map((item) => (item.id === prev.id ? next : item)) : [next, ...tours]);
+    setNotice('已儲存這筆行程');
+    return '';
+  };
+
+  const deleteTour = (id) => {
+    setTours((list) => list.filter((item) => item.id !== id));
+    setNotice('已刪除這筆行程');
+  };
+
 // ...
   return (
-    <StoreContext.Provider value={{ tours, bookings, lastBooking, notice, clearNotice: () => setNotice(''), createBooking }}>
+    <StoreContext.Provider value={{ tours, bookings, lastBooking, notice, clearNotice: () => setNotice(''), saveTour, deleteTour, createBooking }}>
       {children}
 // ...
```

```jsx 06-project-init/src/components/AdminGate.jsx
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useSession } from '../session.jsx';

export default function AdminGate({ children }) {
  const { user } = useSession();
  if (user?.role === 'admin') return children;
  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Alert severity="warning">行程與報名只有管理員可以進入。</Alert>
      <Button className="mt-6" component={Link} to="/admin/login" variant="contained">到後台登入</Button>
    </main>
  );
}
```

分頁取消大寫，高度改成 48。

```diff 06-project-init/src/theme.js
 // ...
           '& .MuiAlert-icon': { color: tokens.action },
         },
       },
     },
+    MuiTab: {
+      styleOverrides: { root: { textTransform: 'none', fontWeight: 700, minHeight: 48 } },
+    },
   },
 // ...
```

```jsx 06-project-init/src/components/AdminTabs.jsx
import { useLocation, useNavigate } from 'react-router';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export default function AdminTabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const value = pathname.startsWith('/admin/bookings') ? '/admin/bookings' : '/admin';
  return (
    <Tabs value={value} onChange={(_, next) => navigate(next)} className="mt-4">
      <Tab value="/admin" label="行程" />
      <Tab value="/admin/bookings" label="報名清單" />
    </Tabs>
  );
}
```

```jsx 06-project-init/src/components/TourForm.jsx
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { themes } from '../data/options.js';
import { useStore } from '../store.jsx';
import FieldSelect from './FieldSelect.jsx';

const empty = { id: '', title: '', region: '', theme: '城市', days: 2, price: 0, cover: '', intro: '', highlights: '', date: '', capacity: 8 };

export const draftFromTour = (tour) => ({
  id: tour.id,
  title: tour.title,
  region: tour.region,
  theme: tour.theme,
  days: tour.days,
  price: tour.price,
  cover: tour.cover,
  intro: tour.intro,
  highlights: tour.highlights.join('\n'),
  date: tour.departures[0]?.date ?? '',
  capacity: tour.departures[0]?.capacity ?? 8,
});

export default function TourForm({ editingId, draft, setDraft, onClear, onSaved }) {
  const { saveTour, deleteTour } = useStore();
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (key) => (event) => setDraft((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const message = saveTour(editingId, draft);
    setError(message);
    if (!message) onSaved(draft.id.trim());
  };

  return (
    <form id="admin-form" className="panel mt-12 grid max-w-3xl gap-4 p-6 sm:grid-cols-2 md:p-8" onSubmit={submit}>
      <Typography variant="h2" className="sm:col-span-2">{editingId ? '編輯行程' : '新增行程'}</Typography>
      <p className="text-muted sm:col-span-2">每日行程、圖集與費用說明若未出現在表單中，儲存時會一併保留。</p>
      {error ? <Alert className="sm:col-span-2" severity="error">{error}</Alert> : null}
      <TextField label="編號" value={draft.id} onChange={set('id')} />
      <TextField label="標題" value={draft.title} onChange={set('title')} />
      <TextField label="地區" value={draft.region} onChange={set('region')} />
      <FieldSelect id="theme" label="主題" value={draft.theme} onChange={(value) => setDraft((current) => ({ ...current, theme: value }))} options={themes.map((item) => ({ value: item, label: item }))} />
      <TextField label="天數" type="number" slotProps={{ htmlInput: { min: 1 } }} value={draft.days} onChange={set('days')} />
      <TextField label="價格" type="number" slotProps={{ htmlInput: { min: 0 } }} value={draft.price} onChange={set('price')} />
      <TextField className="sm:col-span-2" label="封面圖網址" type="url" value={draft.cover} onChange={set('cover')} />
      <TextField className="sm:col-span-2" label="簡介" multiline minRows={3} value={draft.intro} onChange={set('intro')} />
      <TextField className="sm:col-span-2" label="亮點" multiline minRows={3} helperText="一行一則" value={draft.highlights} onChange={set('highlights')} />
      <TextField label="出發日" type="date" slotProps={{ inputLabel: { shrink: true } }} value={draft.date} onChange={set('date')} />
      <TextField label="名額" type="number" slotProps={{ htmlInput: { min: 1 } }} value={draft.capacity} onChange={set('capacity')} />
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <Button type="submit" variant="contained">儲存</Button>
        <Button type="button" color="error" variant="outlined" disabled={!editingId} onClick={() => setConfirmDelete(true)}>刪除</Button>
        <Button type="button" onClick={() => { setError(''); onClear(); }}>清空，改為新增</Button>
      </div>
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} aria-labelledby="delete-title">
        <DialogTitle id="delete-title">刪除這筆行程？</DialogTitle>
        <DialogContent>刪除後，這筆行程不會再出現在列表。</DialogContent>
        <DialogActions className="gap-2 p-4">
          <Button onClick={() => setConfirmDelete(false)}>留下</Button>
          <Button color="error" variant="contained" onClick={() => { deleteTour(editingId); setConfirmDelete(false); onClear(); }}>刪除</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export { empty };
```

表頭鋪上 mist，分隔線用色票的 `line`。

```diff 06-project-init/src/theme.js
 // ...
     MuiAlert: {
 // ...
       },
     },
+    MuiTableCell: {
+      styleOverrides: {
+        root: { borderColor: tokens.line },
+        head: { fontWeight: 700, backgroundColor: tokens.mist, color: tokens.ink },
+      },
+    },
     MuiTab: {
 // ...
```

```jsx 06-project-init/src/pages/AdminToursPage.jsx
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AdminGate from '../components/AdminGate.jsx';
import AdminTabs from '../components/AdminTabs.jsx';
import TourForm, { draftFromTour, empty } from '../components/TourForm.jsx';
import { ntd } from '../format.js';
import { useStore } from '../store.jsx';

function AdminToursBody() {
  const { tours } = useStore();
  const initial = tours.find((item) => item.id === 'hualien-taroko') || tours[0];
  const [editingId, setEditingId] = useState(initial?.id ?? null);
  const [draft, setDraft] = useState(() => (initial ? draftFromTour(initial) : empty));
  useEffect(() => { document.title = '行程管理 · 洛奇旅行'; }, []);

  const edit = (tour) => {
    setEditingId(tour.id);
    setDraft(draftFromTour(tour));
    document.getElementById('admin-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">行程管理</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">新增、修改或下架行程。列表會立刻更新。</p>
      <AdminTabs />
      <div className="mt-4">
        <Button variant="outlined" onClick={() => { setEditingId(null); setDraft(empty); document.getElementById('admin-form')?.scrollIntoView({ behavior: 'smooth' }); }}>新增行程</Button>
      </div>
      <TableContainer elevation={0} className="panel mt-8 hidden overflow-x-auto md:block">
        <Table>
          <TableHead>
            <TableRow>
              {['標題', '地區', '主題', '天數', '價格', '操作'].map((label) => <TableCell key={label} className="px-4 py-3">{label}</TableCell>)}
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
                <TableCell className="px-4 py-4"><Button onClick={() => edit(tour)}>編輯</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-8 grid gap-4 md:hidden">
        {tours.map((tour) => (
          <Card key={tour.id} className="p-6">
            <h3 className="font-serif text-2xl font-semibold">{tour.title}</h3>
            <p className="mt-2 text-muted">{tour.region} · {tour.theme} · {tour.days} 天 · {ntd(tour.price)}</p>
            <Button className="mt-3" onClick={() => edit(tour)}>編輯</Button>
          </Card>
        ))}
      </div>
      <TourForm
        editingId={editingId}
        draft={draft}
        setDraft={setDraft}
        onSaved={(id) => setEditingId(id)}
        onClear={() => { setEditingId(null); setDraft(empty); }}
      />
    </main>
  );
}

export default function AdminToursPage() {
  return <AdminGate><AdminToursBody /></AdminGate>;
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import AdminLoginPage from './pages/AdminLoginPage.jsx';
+import AdminToursPage from './pages/AdminToursPage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
             <Route path="admin/login" element={<AdminLoginPage />} />
-            <Route path="admin" element={<Placeholder title="後台行程" />} />
+            <Route path="admin" element={<AdminToursPage />} />
             <Route path="admin/bookings" element={<Placeholder title="後台報名" />} />
 // ...
```

**解析**

- `AdminGate` 只放行 `role` 為 `admin` 的使用者。其餘情況留下警告與按鈕，網址不變。
- `saveTour` 找到舊資料時，保留表單沒有的圖集、每日行程與費用。編號已存在，或編號、標題是空的，函式回傳錯誤字串。
- 刪除前先開 Dialog。桌機用表格，窄螢幕改成一筆一張卡片。
- `AdminTabs` 用目前路徑決定選到哪一頁，報名清單那一頁會再沿用它。
- 分頁與表頭的覆寫在這一節補進 `theme.js`。

## 報名清單

清單讀的是詳情頁已經放進 Store 的那四筆種子，再加上這次在瀏覽器裡送出的報名。狀態用下拉改變，重新整理就回到種子。

```diff 06-project-init/src/store.jsx
 // ...
+
+  const setBookingStatus = (id, status) => {
+    setBookings((list) => list.map((item) => (item.id === id ? { ...item, status } : item)));
+    setNotice('已更新報名狀態');
+  };
 
   const createBooking = (input) => {
 // ...
   return (
-    <StoreContext.Provider value={{ tours, bookings, lastBooking, notice, clearNotice: () => setNotice(''), saveTour, deleteTour, createBooking }}>
+    <StoreContext.Provider value={{ tours, bookings, lastBooking, notice, clearNotice: () => setNotice(''), saveTour, deleteTour, setBookingStatus, createBooking }}>
       {children}
 // ...
```

```jsx 06-project-init/src/components/BookingTable.jsx
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ntd, statusLabel } from '../format.js';
import { useStore } from '../store.jsx';
import { tokens } from '../theme.js';

const statuses = ['pending', 'confirmed', 'cancelled'];

const statusTone = {
  pending: { border: tokens.accent, color: tokens.ink },
  confirmed: { border: tokens.action, color: tokens.action },
  cancelled: { border: '#C5C2B8', color: '#6E756E' },
};

function StatusSelect({ booking }) {
  const { setBookingStatus } = useStore();
  const tone = statusTone[booking.status] || statusTone.pending;
  return (
    <Select
      size="small"
      aria-label={`${booking.name}這筆的狀態`}
      value={booking.status}
      onChange={(event) => setBookingStatus(booking.id, event.target.value)}
      sx={{
        width: 148,
        color: tone.color,
        backgroundColor: tokens.white,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: tone.border, borderWidth: 2 },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: tone.border },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: tone.border },
        '& .MuiSelect-icon': { color: tone.color },
      }}
    >
      {statuses.map((status) => <MenuItem key={status} value={status}>{statusLabel[status]}</MenuItem>)}
    </Select>
  );
}

export default function BookingTable({ bookings }) {
  return (
    <>
      <TableContainer elevation={0} className="panel mt-8 hidden overflow-x-auto md:block">
        <Table>
          <TableHead>
            <TableRow>
              {[['行程', 'left'], ['出發日', 'left'], ['人數', 'right'], ['姓名', 'left'], ['電話', 'left'], ['小計', 'right'], ['狀態', 'left']].map(([label, align]) => <TableCell key={label} align={align} className="whitespace-nowrap px-4 py-3">{label}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="px-4 py-4">{booking.tourTitle}</TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4">{booking.date}</TableCell>
                <TableCell align="right" className="px-4 py-4">{booking.people}</TableCell>
                <TableCell className="px-4 py-4">{booking.name}<br />{booking.email}</TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4">{booking.phone}</TableCell>
                <TableCell align="right" className="whitespace-nowrap px-4 py-4">{ntd(booking.subtotal)}</TableCell>
                <TableCell className="px-4 py-4"><StatusSelect booking={booking} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-8 grid gap-4 md:hidden">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-6">
            <h3 className="font-serif text-2xl font-semibold">{booking.tourTitle}</h3>
            <dl className="mt-3 grid gap-2 text-base">
              <div className="flex justify-between gap-4"><dt className="text-muted">出發日</dt><dd>{booking.date}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">人數</dt><dd className="text-right">{booking.people}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">姓名</dt><dd className="text-right">{booking.name}<br />{booking.email}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">電話</dt><dd>{booking.phone}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">小計</dt><dd className="text-right">{ntd(booking.subtotal)}</dd></div>
            </dl>
            <div className="mt-3"><StatusSelect booking={booking} /></div>
          </Card>
        ))}
      </div>
    </>
  );
}
```

```jsx 06-project-init/src/pages/AdminBookingsPage.jsx
import { useEffect, useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdminGate from '../components/AdminGate.jsx';
import AdminTabs from '../components/AdminTabs.jsx';
import BookingTable from '../components/BookingTable.jsx';
import { statusLabel } from '../format.js';
import { useStore } from '../store.jsx';

const statusOptions = ['all', 'pending', 'confirmed', 'cancelled'];

function AdminBookingsBody() {
  const { bookings } = useStore();
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('date-desc');
  useEffect(() => { document.title = '報名清單 · 洛奇旅行'; }, []);

  const shown = useMemo(() => {
    const keyword = query.trim();
    return bookings
      .filter((booking) => status === 'all' || booking.status === status)
      .filter((booking) => !keyword || booking.name.includes(keyword))
      .sort((a, b) => (sort === 'date-asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
  }, [bookings, status, query, sort]);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">報名清單</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">查看所有報名，並把狀態改為待確認、已確認或已取消。</p>
      <AdminTabs />
      <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,14rem)]">
        <TextField select label="狀態" value={status} onChange={(event) => setStatus(event.target.value)}>
          {statusOptions.map((value) => <MenuItem key={value} value={value}>{value === 'all' ? '全部' : statusLabel[value]}</MenuItem>)}
        </TextField>
        <TextField label="搜尋姓名" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="輸入姓名" />
        <TextField select label="日期排序" value={sort} onChange={(event) => setSort(event.target.value)}>
          <MenuItem value="date-desc">出發日新到舊</MenuItem>
          <MenuItem value="date-asc">出發日舊到新</MenuItem>
        </TextField>
      </div>
      {shown.length ? <BookingTable bookings={shown} /> : <p className="mt-8 text-base text-muted">沒有符合的報名。</p>}
    </main>
  );
}

export default function AdminBookingsPage() {
  return <AdminGate><AdminBookingsBody /></AdminGate>;
}
```

```diff 06-project-init/src/App.jsx
 // ...
 import AdminToursPage from './pages/AdminToursPage.jsx';
+import AdminBookingsPage from './pages/AdminBookingsPage.jsx';
 import Placeholder from './components/Placeholder.jsx';
 // ...
             <Route path="admin" element={<AdminToursPage />} />
-            <Route path="admin/bookings" element={<Placeholder title="後台報名" />} />
+            <Route path="admin/bookings" element={<AdminBookingsPage />} />
             <Route path="*" element={<Placeholder title="找不到頁面" />} />
 // ...
```

**解析**

- 狀態、姓名與日期排序都是這一頁自己的 state，不寫進網址，也不會把種子從檔案裡刪掉。
- `setBookingStatus` 只改記憶體裡那一筆的 `status`。`AdminGate` 與 `AdminTabs` 沿用上一節。
- 狀態顏色要畫在 Select 的外框上，這個元件沒有對應的 class 可以換色，所以只有這裡使用 `sx`。
- 桌機是表格，窄螢幕是卡片，兩邊的欄位相同。

## 找不到頁面

星號路由與詳情頁對不到 id 的情況，都渲染同一個找不到頁。佔位元件至此沒有人引用。

```jsx 06-project-init/src/pages/NotFoundPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NotFoundPage() {
  useEffect(() => { document.title = '找不到頁面 · 洛奇旅行'; }, []);
  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <Typography variant="h1" className="max-w-[8em]">這頁不在路線上</Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">這個網址沒有對應的頁面。回到首頁，或去看行程。</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button component={Link} to="/" variant="contained">回首頁</Button>
        <Button component={Link} to="/tours" variant="outlined">去行程</Button>
      </div>
    </main>
  );
}
```

```diff 06-project-init/src/pages/TourDetailPage.jsx
 // ...
 import Itinerary from '../components/Itinerary.jsx';
-import Placeholder from '../components/Placeholder.jsx';
+import NotFoundPage from './NotFoundPage.jsx';
 import { ntd, seatsLeft } from '../format.js';
 // ...
   useEffect(() => { setDepartureId(tour?.departures[0]?.id ?? ''); }, [tour]);
-  if (!tour) return <Placeholder title="找不到頁面" />;
+  if (!tour) return <NotFoundPage />;
 
 // ...
```

```diff 06-project-init/src/App.jsx
 // ...
 import AdminBookingsPage from './pages/AdminBookingsPage.jsx';
-import Placeholder from './components/Placeholder.jsx';
+import NotFoundPage from './pages/NotFoundPage.jsx';
 
 // ...
             <Route path="admin/bookings" element={<AdminBookingsPage />} />
-            <Route path="*" element={<Placeholder title="找不到頁面" />} />
+            <Route path="*" element={<NotFoundPage />} />
           </Route>
 // ...
```

**解析**

- `NotFoundPage` 仍放在 `SiteLayout` 裡面，頁首與頁尾還在，並提供回首頁與去行程兩條路。
- 詳情頁把原先的佔位換成這個元件，兩處文案才會一致。
- 刪掉 `src/components/Placeholder.jsx`。十二條路徑到這裡都已換成完成品裡的頁面。

## 靜態部署

未知路徑為什麼要另外準備一個 404 頁，見 {% post_link lokiTech-15day-11-react-router %} 的選讀。這份專案在打包之後把首頁複製成那一頁；網站掛在網域根目錄時，路由維持預設。

```diff 06-project-init/package.json
 // ...
     "dev": "vite",
-    "build": "vite build",
+    "build": "vite build && cp dist/index.html dist/404.html",
     "preview": "vite preview"
 // ...
```

開發伺服器與 preview 只綁 localhost。`manualChunks` 把 React 與 MUI 拆成獨立檔，畫面不變。

```diff 06-project-init/vite.config.js
 // ...
 export default defineConfig({
   plugins: [react(), tailwindcss()],
+  server: { host: 'localhost' },
+  preview: { host: 'localhost' },
+  build: {
+    rollupOptions: {
+      output: {
+        manualChunks(id) {
+          if (!id.includes('node_modules')) return undefined;
+          if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
+          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) return 'react';
+          return undefined;
+        },
+      },
+    },
+  },
 });
```

**解析**

- `pnpm build` 先產出 `dist/`，再複製一份 `404.html`，靜態主機才接得住重新整理後的路徑。
- `server` 與 `preview` 只聽 localhost，不對區網開放。
- `manualChunks` 只拆檔，不改變路由或樣式。
- 網站從 `/` 開始時，`BrowserRouter` 維持預設，不必加 `basename`。
- 做完後的原始碼應與 `05-project-prototype` 一致，包含這條 build 指令，以及 `vite.config.js` 的 localhost 與 `manualChunks`。

切版到此為止。同一份畫面怎麼接上資料層、Hooks、Firestore 與管理員登入，見 {% post_link lokiTech-15day-13-project-travel-api %}。

# 本篇重點回顧

- Vite 專案先清掉範本，再安裝 React Router、MUI、Emotion 與 Tailwind。
- `@layer` 只寫在 `index.css` 第一行。MUI 進入 `mui` 層之後，preflight 清不掉按鈕內距，utilities 仍蓋得過元件。
- 十二條路由先用佔位元件接通，頁首頁尾經由 `Outlet` 共用。
- 假資料隨著頁面追加。畫面改的是記憶體，重新整理回到種子。
- 旅客與管理員是兩種 session。報名頁與後台頁各自先檢查身份。
- 打包沿用第 11 篇：`vite build` 之後複製一份 `404.html`。
- 切版在這一章結束。資料層、Hooks、Firestore 與管理員登入寫在下一篇。

# 專有名詞中英對照

## 建立專案

- 建置工具（Vite）
- 套件管理器（pnpm）
- 依賴（dependency）
- 開發依賴（devDependency）
- 元件庫（Material UI）
- 主題提供者（ThemeProvider）
- 基準樣式（CssBaseline）
- 樣式引擎（StyledEngineProvider）
- 層疊層級（cascade layer）
- 預設樣式（preflight）
- 主題（theme）
- 設計代幣（design token）
- 對比度（contrast ratio）
- 圖示字型（icon font）

## 路由與版面

- 路由（route）
- 巢狀路由（nested route）
- 版面（layout）
- 出口（outlet）
- 路徑參數（route parameter）
- 查詢參數（search parameter）
- 佔位元件（placeholder）

## 前台頁面

- 種子資料（seed data）
- 情境（context）
- 工作階段（session）
- 工作階段儲存（sessionStorage）
- 路由守衛（route guard）
- 唯讀欄位（read-only field）

## 後台與部署

- 角色（role）
- 找不到頁（not found）
- 靜態網站（static site）
