---
title: '[框架課程] React 19 教學（三）- React Router 動態路由'
categories:
  - 職訓教材
  - ReactJS
tag:
  - JavaScript 程式設計（假日班）
date: 2025-10-18 13:09:14
hidden: false
---

![](/assets/images/banner/react-router.png)

在上一章節，我們已經完成了一個包含多個元件的 React 應用（MyLogo、MyH1、MyForm、MyGallery 等）。現在我們要把這個應用擴展成多頁面的學習系統，透過 React Router 實現課程切換功能，並添加側邊選單（aside menu）讓學習者可以自由切換不同課程內容。

<!-- more -->

{% note info %}
**本課程使用版本：**
- **React**: 19+
- **React Router**: 7.9.4（Library 模式）
- **Vite**: 6.0+
- **Node.js**: 20+ LTS

由於 React Router 版本間可能存在 API 差異，請確認你安裝的版本。如果未來有新版本發布，請參考官方文件的版本遷移指南。
{% endnote %}

# 整合 Router
在上一章節，我們的 App.jsx 已經包含了豐富的內容：

```jsx
<App>
  <MyLogo />
  <MyH1>Vite + React</MyH1>
  <MyGallery />
  <MyForm />
  <MyButton />
</App>
```

但隨著學習內容增加，如果我們想要：
- 將不同課程的練習分開管理
- 透過 URL 直接存取特定課程（如 `/lesson01`、`/lesson02`）
- 讓使用者可以透過選單切換不同課程
- 保持瀏覽器上一頁/下一頁功能正常運作

這時候就需要 **React Router** 來管理路由！我們要將原本單一頁面的應用改造成：

```
課程學習系統
├── Lesson01：基礎元件（原本的 App.jsx 內容）
├── Lesson02：Router 功能教學（新建立的課程）
└── Lesson03：待擴充課程
```

## 為什麼需要 React Router？

React 本身**沒有內建路由功能**。如果沒有 React Router，你需要：

```jsx
// ❌ 手動管理路由（非常繁瑣）
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'home') return <HomePage />;
  if (currentPage === 'about') return <AboutPage />;
  if (currentPage === 'products') return <ProductsPage />;
  
  // 需要手動處理瀏覽器上一頁/下一頁
  // 需要手動更新網址列
  // 需要手動處理書籤和分享連結
  // ... 非常複雜！
}
```

**React Router 幫你處理所有這些複雜問題**，只需簡單宣告：

```jsx
// ✅ 使用 React Router（簡單清晰）
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/products" element={<ProductsPage />} />
</Routes>
```

### 什麼是 SPA 路由？

SPA（Single Page Application，單頁應用程式）路由，是指在**同一個網頁檔案**（通常為 `index.html`）裡，透過 JavaScript 動態控制頁面顯示內容的方法。以下提供差異說明：

**傳統多頁應用（MPA - Multi-Page Application）**

每個頁面都是獨立的 HTML 檔案，切換頁面時瀏覽器會重新載入整個頁面：

{% mermaid graph TD %}
    A["瀏覽器輸入網址"]
    B["伺服器收到請求"]
    F["伺服器返回 HTML 檔案"]
    C["index.html"]
    D["about.html"]
    E["products.html"]

    A -- /index --> B
    A -- /about --> B
    A -- /products --> B
    B -- "index.html" --> C
    B -- "about.html" --> D
    B -- "products.html" --> E
    C --> F
    D --> F
    E --> F
{% endmermaid %}

{% note info %}
當使用者在瀏覽器輸入不同網址（如 /about.html），伺服器會回傳對應的網頁檔案，讓使用者看到完整的新頁面，這是傳統多頁應用（MPA）的典型運作方式。
{% endnote %}

❌ **缺點：**
- 每次切換都要重新載入所有資源（HTML、CSS、JS）
- 畫面會閃爍，使用者體驗差
- 狀態無法保留（如購物車、使用者登入狀態）
- 伺服器負擔較大

**單頁應用（SPA - Single-Page Application）**

只有一個 HTML 檔案（`index.html`），所有頁面都是透過 JavaScript 動態渲染：

{% mermaid graph TD %}
    A["瀏覽器首次請求網址"]
    B["伺服器傳回同一份 index.html<br/>（包含 JS/CSS 資源）"]
    C["React 載入後初始化應用程式"]
    D["React Router 根據網址顯示對應元件"]
    E["HomePage 組件"]
    F["AboutPage 組件"]
    G["ProductsPage 組件"]
    H["使用者於應用內點選連結"]
    I["React Router 更新網址（History API）與內容"]

    A --> B
    B --> C
    C --> D
    D -- /index --> E
    D -- /about --> F
    D -- /products --> G
    H --> I
    I --> D
{% endmermaid %}

✅ **優點：**
- 頁面切換快速流暢，沒有閃爍
- 只需載入一次資源，節省頻寬
- 狀態可以保留（全域 State）
- 更好的使用者體驗

{% note info %}
**SPA 的運作原理：**

1. 瀏覽器首次載入 `index.html` 和 React 應用
2. 使用者點擊連結時，React Router **攔截**瀏覽器的導航行為
3. 更新瀏覽器網址列（使用 HTML5 History API）
4. 根據新網址，渲染對應的 React 元件
5. **不重新載入頁面**，只更新需要改變的 DOM 部分

這就是為什麼 SPA 切換頁面時不會看到白屏或載入畫面！
{% endnote %}

### 安裝 React Router 套件

在之前的 Vite + React 19 原本專案內中，額外安裝 React Router v7.9.4：

```bash
# 安裝指定版本（推薦）
pnpm add react-router@7.9.4

# 或安裝最新版本
pnpm add react-router
```

{% note info %}
**React Router v7 套件說明：**

- **react-router**：Library 模式的核心套件（本課程使用 v7.9.4）
- **react-router-dom**：已整合在 `react-router` 中，不需額外安裝

**版本對照（避免混淆）：**
- React Router v6：需同時安裝 `react-router` 與 `react-router-dom`（`react-router-dom` 提供瀏覽器專用元件，兩者缺一不可）
- React Router v7（7.9.4）：只需安裝 `react-router`

**確認安裝版本：**
```bash
pnpm list react-router
# 應顯示：react-router 7.9.4
```

如果看到舊教學要求安裝 `react-router-dom`，那是 v6 的做法！
{% endnote %}

### 配置 BrowserRouter
React Router 支援多種路由器型態，主要目的是符合不同的部署與使用場景。舉例來說：

- **BrowserRouter** 利用瀏覽器的 History API，讓網址看起來像傳統網頁（沒有 `#` 號），適合現代 Web 應用與 SEO 需求，但伺服器端需支援所有路由都回傳 `index.html`（確保重新整理不會 404）。
- **HashRouter** 則會在 URL 中出現 `#`，用於靜態主機或無法設定伺服器路由的環境（如 Github Pages）。雖然簡單，但對 SEO 較不友善。
- **MemoryRouter** 完全不顯示在真實網址列中，通常用於測試環境或 React Native（非瀏覽器）等特殊場景。

**Router 類型說明：**

| Router            | URL 格式      | 適用場景           | 說明                         |
| ----------------- | ------------- | ------------------ | ---------------------------- |
| **BrowserRouter** | `/lesson01`   | 現代 SPA（推薦）   | 需要伺服器配置支援           |
| **HashRouter**    | `/#/lesson01` | 靜態託管           | URL 有 `#`，SEO 不友善       |
| **MemoryRouter**  | 不顯示在 URL  | 測試、非瀏覽器環境 | 用於 React Native 或單元測試 |

選擇正確的 Router 類型能確保你的應用程式在預期的平台上正常運作、網址格式美觀且易於維護。因此，本課程示範會以 `BrowserRouter` 為例，讓你學會基本設定與部署注意事項。修改 `main.jsx`，使用 `BrowserRouter` 包裹整個應用：

```jsx src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

**程式碼說明：**
- `BrowserRouter`：啟用 HTML5 History API，讓 URL 看起來像傳統網站（如 `/lesson01`）
- 包裹 `<App />`：讓整個應用都能使用路由功能
- 必須放在最外層（`StrictMode` 內）

## 步驟 1：規劃專案結構

建立模組化的目錄結構，每個頁面都是獨立的模組：

```
src/
├── main.jsx                 # 配置 BrowserRouter
├── App.jsx                  # 路由配置
├── index.css                # 全域樣式
├── components/
│   ├── Layout.jsx           # 佈局元件（側邊選單 + Outlet）
│   └── Layout.css           # Layout 專屬樣式
└── pages/
    ├── lesson01/            # Lesson01 頁面模組
    │   ├── index.jsx        # 頁面主元件（原本的 App.jsx）
    │   ├── index.css        # 頁面樣式（原本的 App.css）
    │   └── components/      # 頁面專屬元件
    │       ├── MyLogo/      # Logo 元件
    │       ├── MyH1/        # 標題元件
    │       ├── MyForm/      # 表單元件
    │       ├── MyButton/    # 按鈕元件
    │       └── MyGallery/   # 幻燈片元件
    ├── lesson02/            # Lesson02 頁面模組（Router 教學）
    │   ├── index.jsx
    │   ├── index.css
    │   └── components/
    └── lesson03/            # Lesson03 頁面模組（待擴充）
        ├── index.jsx
        ├── index.css
        └── components/
```

{% note success %}
**模組化設計的好處：**

每個頁面模組（Page Module）都是獨立的，包含：
- `index.jsx`：頁面主元件
- `index.css`：頁面專屬樣式
- `components/`：該頁面專用的子元件

這樣的結構讓每個頁面都能：
- ✅ 獨立開發和維護
- ✅ 避免命名衝突
- ✅ 清楚的檔案組織
- ✅ 容易複製或重用
{% endnote %}

## 步驟 2：移植原本的 App.jsx 內容

將上一章節的 App.jsx 完整移植為 Lesson01 元件，並將相關元件都放在 Lesson01 模組內：

**移植步驟說明：**

1. **建立目錄**：`pages/lesson01/` 作為 Lesson01 頁面模組
2. **移植主元件**：原本的 `App.jsx` → `pages/lesson01/index.jsx`
3. **移植樣式**：原本的 `App.css` → `pages/lesson01/index.css`
4. **移植子元件**：將 MyLogo、MyH1、MyForm、MyButton、MyGallery 移到 `pages/lesson01/components/`
5. **保留功能**：所有的 state、事件處理、元件組合都完整保留
6. **調整引入路徑**：使用相對路徑引入元件（`./components/...`）

```jsx src/pages/lesson01/index.jsx
import { useState } from 'react';
import './index.css'; // 引入 Lesson01 專屬樣式
import MyLogo from './components/MyLogo/MyLogo';
import MyH1 from './components/MyH1/MyH1';
import MyForm from './components/MyForm/MyForm';
import MyButton from './components/MyButton/MyButton';
import MyGallery from './components/MyGallery/MyGallery';

export default function Lesson01() {
  const [count, setCount] = useState(0);
  const [toShow, setToShow] = useState(true);
  const h1Title = 'Vite + React';

  // 表單事件處理（狀態提升）
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
      
      {/* 圖片幻燈片元件 */}
      <MyGallery toShow={toShow} setToShow={setToShow} />
      <MyGallery {...{ toShow, setToShow }} />
      
      <div className="card" style={{ color: 'red', background: 'black' }}>
        {/* 表單元件 */}
        <MyForm onLokiSubmit={onPasswordSubmit} onLokiChange={onPasswordChange} />
        
        {/* 按鈕元件 */}
        <MyButton>Click Me!</MyButton>
        
        {/* 計數器按鈕 */}
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

```css src/pages/lesson01/index.css
/* 這是原本 App.css 的內容，現在成為 Lesson01 專屬樣式 */

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

## 步驟 3：建立其他頁面模組

先建立 Lesson02 和 Lesson03 的佔位頁面：

```jsx src/pages/lesson02/index.jsx
export default function Lesson02() {
  return (
    <div>
      <h1>Lesson 02：Router 功能教學</h1>
      <p>這裡將會學習所有 React Router 的功能。</p>
    </div>
  );
}
```

```jsx src/pages/lesson03/index.jsx
export default function Lesson03() {
  return (
    <div>
      <h1>Lesson 03：待擴充內容</h1>
      <p>這裡未來可以放置第三個頁面的內容。</p>
    </div>
  );
}
```

## 步驟 4：建立 Layout 元件

建立 Layout 元件來提供統一的佈局框架，包含側邊選單（aside menu）和主要內容區域：

```jsx src/components/Layout.jsx
import { Outlet, NavLink } from 'react-router';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      {/* 側邊選單 */}
      <aside className="sidebar">
        <h2>🎓 React 學習系統</h2>
      <nav>
        <ul>
          <li>
              <NavLink to="/lesson01">
                📘 Lesson 01：基礎元件
              </NavLink>
          </li>
          <li>
              <NavLink to="/lesson02">
                📗 Lesson 02：Router 教學
              </NavLink>
            </li>
            <li>
              <NavLink to="/lesson03">
                📕 Lesson 03：待擴充
              </NavLink>
          </li>
        </ul>
      </nav>
      </aside>

      {/* 主要內容區域 */}
      <main className="content">
          <Outlet />
      </main>
    </div>
  );
}
```

```css src/components/Layout.css
.layout {
  display: flex;
  min-height: 100vh;
}

/* 側邊選單樣式 */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  margin: 0 0 2rem 0;
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav li {
  margin-bottom: 0.5rem;
}

.sidebar nav a {
  display: block;
        color: white;
  text-decoration: none;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s;
  font-weight: 500;
}

.sidebar nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.sidebar nav a.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 主要內容區域 */
.content {
  margin-left: 280px;
  flex: 1;
  padding: 2rem;
  background-color: #f7fafc;
  min-height: 100vh;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
  position: relative;
  }

  .content {
    margin-left: 0;
  }
}
```

**Layout 設計重點：**

1. **側邊選單（`<aside>`）**：
   - 使用 `position: fixed` 固定在左側
   - 使用 `NavLink` 自動為當前頁面添加 `.active` class
   - 漸層背景與 hover 動畫效果提升視覺體驗

2. **主要內容區（`<main>`）**：
   - 使用 `<Outlet />` 作為子路由的渲染位置
   - `margin-left: 280px` 避免內容被側邊選單遮擋
   - 淺灰背景（`#f7fafc`）提升可讀性

3. **響應式設計**：
   - 小螢幕（≤768px）時側邊選單改為非固定，避免擋住內容

## 步驟 5：配置路由

在 `App.jsx` 中配置路由系統，串聯所有頁面模組：

```jsx src/App.jsx
import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout';
import Lesson01 from './pages/lesson01'; // 自動引入 index.jsx
import Lesson02 from './pages/lesson02'; // 自動引入 index.jsx
import Lesson03 from './pages/lesson03'; // 自動引入 index.jsx

export default function App() {
  return (
    <Routes>
      {/* 使用 Layout 作為父路由 */}
      <Route element={<Layout />}>
        {/* 根路徑自動導向 /lesson01 */}
        <Route index element={<Navigate to="/lesson01" replace />} />
        
        {/* 各課程路由 */}
        <Route path="lesson01" element={<Lesson01 />} />
        <Route path="lesson02" element={<Lesson02 />} />
        <Route path="lesson03" element={<Lesson03 />} />
      </Route>
    </Routes>
  );
}
```

**路由配置說明：**

1. **巢狀路由結構**：
   - `<Route element={<Layout />}>`：父路由，作為佈局容器（不設定 `path`）
   - 所有子路由都會渲染在 Layout 的 `<Outlet />` 位置

2. **預設導向（index 路由）**：
   - 使用 `<Navigate to="/lesson01" replace />` 自動導向首頁
   - `replace` 參數：替換歷史記錄，避免「上一頁」按鈕回到空白頁

3. **子路由定義**：
   - `path` 不需要前綴 `/`，會自動繼承父路由的路徑
   - 例如：`path="lesson01"` 實際對應 URL `/lesson01`
   - 每個 `element` 對應一個頁面模組元件

## 測試運行

```bash
# 啟動開發伺服器
pnpm dev
```

開啟瀏覽器訪問 `http://localhost:5173`，你應該會看到：

- ✅ 自動導向到 `/lesson01`
- ✅ 左側顯示側邊選單
- ✅ 右側顯示 Lesson01 的所有元件（MyLogo、MyH1、MyGallery 等）
- ✅ 點擊選單可以切換不同頁面，URL 也會同步改變
- ✅ 當前頁面的選單項目會高亮顯示（`.active` class）

{% note success %}
**🎉 完成基礎改造！**

現在你已經成功將單頁應用改造成支援多頁面的路由系統：
- ✅ 保留了原本 App.jsx 的所有功能
- ✅ 添加了側邊選單導航
- ✅ 每個頁面都是獨立的模組（Page Module）
- ✅ 可以輕鬆擴充新的頁面內容

接下來我們將在 Lesson02 中學習所有 React Router 的進階功能！
{% endnote %}

# Router 功能實作教學
在 Lesson01 中我們完成了基礎元件的建立，現在讓我們在 Lesson02 頁面中實作一個「個人作品集」(Portfolio) 系統，透過這個完整的 demo 來學習所有 React Router 的核心功能。


我們要在 Lesson02 中建立一個包含以下功能的作品集系統：

```
Lesson02（作品集系統）
├── 作品列表頁面（ProjectList）
├── 作品詳情頁面（ProjectDetail）- 使用動態路由 ✨
├── 關於我頁面（About）
└── 聯絡表單頁面（Contact）- 使用程式導航 ✨
```

## 步驟 1：更新 App.jsx 路由配置

首先，讓我們為 Lesson02 添加子路由：

- `path="lesson02/*"`：`/*` 表示 Lesson02 內部還有更多子路由
- 這樣 Lesson02 就可以自己管理內部的路由結構

```jsx src/App.jsx
import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout';
import Lesson01 from './pages/lesson01';
import Lesson02 from './pages/lesson02';
import Lesson03 from './pages/lesson03';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/lesson01" replace />} />
        <Route path="lesson01" element={<Lesson01 />} />
        
        {/* Lesson02 及其子路由 */}
        <Route path="lesson02/*" element={<Lesson02 />} />
        
        <Route path="lesson03" element={<Lesson03 />} />
      </Route>
    </Routes>
  );
}
```

## 步驟 2：建立 Lesson02 主架構

```jsx src/pages/lesson02/index.jsx
import { Routes, Route, Navigate, Link, Outlet } from 'react-router';
import './index.css';

// 子頁面元件（稍後建立）
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';

export default function Lesson02() {
  return (
    <div className="lesson02-container">
      {/* 內部導航列 */}
      <nav className="lesson02-nav">
        <h2>📂 我的作品集</h2>
        <div className="nav-links">
          <Link to="/lesson02/projects" className="nav-link">作品列表</Link>
          <Link to="/lesson02/about" className="nav-link">關於我</Link>
          <Link to="/lesson02/contact" className="nav-link">聯絡我</Link>
        </div>
      </nav>

      {/* 子路由渲染區域 */}
      <div className="lesson02-content">
        <Routes>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}
```

```css src/pages/lesson02/index.css
.lesson02-container {
  max-width: 1200px;
  margin: 0 auto;
}

.lesson02-nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lesson02-nav h2 {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.lesson02-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}
```

## 步驟 3：建立作品列表頁面（Link 導航）

```jsx src/pages/lesson02/pages/ProjectList.jsx
import { Link } from 'react-router';
import './ProjectList.css';

// 模擬作品資料
const projects = [
  {
    id: 1,
    title: 'React 部落格系統',
    description: '使用 React + Router 建立的現代化部落格',
    tech: ['React', 'Router', 'CSS'],
    image: '🌐',
  },
  {
    id: 2,
    title: '待辦事項應用',
    description: '支援拖拉排序、分類標籤的 Todo App',
    tech: ['React', 'LocalStorage', 'CSS Grid'],
    image: '📝',
  },
  {
    id: 3,
    title: '天氣查詢應用',
    description: '串接 OpenWeather API 的天氣預報工具',
    tech: ['React', 'API', 'Axios'],
    image: '🌤️',
  },
];

export default function ProjectList() {
  return (
    <div>
      <h1>我的作品集</h1>
      <p className="subtitle">點擊任一作品查看詳細資訊</p>

      <div className="project-grid">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/lesson02/projects/${project.id}`}
            className="project-card"
          >
            <div className="project-image">{project.image}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.tech.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

```css src/pages/lesson02/pages/ProjectList.css
.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  display: block;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  background: white;
}

.project-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
}

.project-image {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
}

.project-card h3 {
  margin: 0 0 0.5rem 0;
  color: #667eea;
}

.project-card p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.tech-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: #f0f4ff;
  color: #667eea;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}
```

**學習重點：**
- 使用 `<Link to={...}>` 建立可點擊的卡片
- 動態生成路徑：`` to={`/lesson02/projects/${project.id}`} ``
- 使用 `:hover` 提供視覺回饋

## 步驟 4：建立作品詳情頁面（useParams）

```jsx src/pages/lesson02/pages/ProjectDetail.jsx
import { useParams, useNavigate, Link } from 'react-router';
import './ProjectDetail.css';

// 模擬完整作品資料
const projectsData = {
  1: {
    title: 'React 部落格系統',
    description: '使用 React + Router 建立的現代化部落格系統，支援文章分類、標籤搜尋、留言功能。',
    tech: ['React 19', 'React Router v7', 'CSS Modules', 'LocalStorage'],
    features: [
      '文章列表與詳情頁面',
      '分類與標籤過濾',
      '搜尋功能',
      '響應式設計',
      '深色模式切換',
    ],
    demoUrl: 'https://example.com/blog',
    githubUrl: 'https://github.com/example/blog',
    image: '🌐',
  },
  2: {
    title: '待辦事項應用',
    description: '支援拖拉排序、分類標籤的 Todo App，資料儲存在 LocalStorage。',
    tech: ['React', 'LocalStorage', 'CSS Grid', 'Drag & Drop API'],
    features: [
      '新增/編輯/刪除待辦事項',
      '拖拉排序功能',
      '分類管理',
      '完成度統計',
      '資料持久化',
    ],
    demoUrl: 'https://example.com/todo',
    githubUrl: 'https://github.com/example/todo',
    image: '📝',
  },
  3: {
    title: '天氣查詢應用',
    description: '串接 OpenWeather API 的天氣預報工具，支援城市搜尋與多日預報。',
    tech: ['React', 'OpenWeather API', 'Axios', 'Chart.js'],
    features: [
      '即時天氣查詢',
      '7 天天氣預報',
      '溫度趨勢圖表',
      '城市搜尋紀錄',
      '地理位置定位',
    ],
    demoUrl: 'https://example.com/weather',
    githubUrl: 'https://github.com/example/weather',
    image: '🌤️',
  },
};

export default function ProjectDetail() {
  const { projectId } = useParams(); // 🌟 從 URL 獲取參數
  const navigate = useNavigate();
  const project = projectsData[projectId];

  // 如果作品不存在
  if (!project) {
    return (
      <div className="not-found">
        <h2>😢 找不到此作品</h2>
        <p>專案 ID「{projectId}」不存在</p>
        <Link to="/lesson02/projects" className="btn-primary">
          返回作品列表
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      {/* 返回按鈕 */}
      <button onClick={() => navigate(-1)} className="btn-back">
        ← 返回
      </button>

      {/* 專案標題 */}
      <div className="project-header">
        <div className="project-icon">{project.image}</div>
        <div>
          <h1>{project.title}</h1>
          <p className="project-desc">{project.description}</p>
        </div>
      </div>

      {/* 技術標籤 */}
      <div className="section">
        <h2>🛠️ 使用技術</h2>
        <div className="tech-list">
          {project.tech.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 功能列表 */}
      <div className="section">
        <h2>✨ 主要功能</h2>
        <ul className="feature-list">
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* 連結按鈕 */}
      <div className="section">
        <h2>🔗 相關連結</h2>
        <div className="link-buttons">
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-demo">
            線上 Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-github">
            GitHub 原始碼
          </a>
        </div>
      </div>

      {/* 導航到其他作品 */}
      <div className="section">
        <h2>📂 其他作品</h2>
        <div className="nav-projects">
          {Number(projectId) > 1 && (
            <Link
              to={`/lesson02/projects/${Number(projectId) - 1}`}
              className="btn-nav"
            >
              ← 上一個作品
            </Link>
          )}
          {Number(projectId) < 3 && (
            <Link
              to={`/lesson02/projects/${Number(projectId) + 1}`}
              className="btn-nav"
              style={{ marginLeft: 'auto' }}
            >
              下一個作品 →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
```

```css src/pages/lesson02/pages/ProjectDetail.css
.project-detail {
  max-width: 800px;
  margin: 0 auto;
}

.btn-back {
  padding: 0.5rem 1rem;
  background: #e2e8f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s;
}

.btn-back:hover {
  background: #cbd5e0;
}

.project-header {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.project-icon {
  font-size: 5rem;
}

.project-header h1 {
  margin: 0 0 0.5rem 0;
  color: #667eea;
}

.project-desc {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.section {
  margin-bottom: 2rem;
}

.section h2 {
  color: #333;
  margin-bottom: 1rem;
}

.tech-list {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tech-badge {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 500;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 0.75rem;
  background: #f7fafc;
  border-left: 4px solid #667eea;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.link-buttons {
  display: flex;
  gap: 1rem;
}

.btn-demo,
.btn-github {
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-demo {
  background: #667eea;
  color: white;
}

.btn-demo:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.btn-github {
  background: #333;
  color: white;
}

.btn-github:hover {
  background: #000;
  transform: translateY(-2px);
}

.nav-projects {
  display: flex;
  justify-content: space-between;
}

.btn-nav {
  padding: 0.75rem 1.5rem;
  background: #f0f4ff;
  color: #667eea;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-nav:hover {
  background: #667eea;
  color: white;
}

.not-found {
  text-align: center;
  padding: 3rem;
}

.not-found h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.btn-primary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 1rem;
}
```

**學習重點：**
- `useParams()`：從 URL 取得 `projectId` 參數
- `navigate(-1)`：返回上一頁
- 參數轉換：`Number(projectId)` 將字串轉為數字
- 錯誤處理：當作品不存在時顯示友善訊息

## 步驟 5：建立關於我頁面

```jsx src/pages/lesson02/pages/About.jsx
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>👋 關於我</h1>
      
      <section className="about-section">
        <h2>自我介紹</h2>
        <p>
          我是一名熱愛前端開發的工程師，專注於 React 生態系的學習與實踐。
          透過建立各種專案來累積經驗，並持續精進技術能力。
        </p>
      </section>

      <section className="about-section">
        <h2>技能</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>前端開發</h3>
            <p>HTML, CSS, JavaScript, React, Vue</p>
          </div>
          <div className="skill-card">
            <h3>工具與框架</h3>
            <p>Vite, Webpack, Git, NPM/PNPM</p>
          </div>
          <div className="skill-card">
            <h3>後端基礎</h3>
            <p>Node.js, Express, RESTful API</p>
          </div>
          <div className="skill-card">
            <h3>設計工具</h3>
            <p>Figma, Photoshop, Illustrator</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>學習歷程</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>2024</h3>
            <p>開始學習 React 19 與 React Router v7</p>
          </div>
          <div className="timeline-item">
            <h3>2023</h3>
            <p>深入學習 JavaScript ES6+ 語法</p>
          </div>
          <div className="timeline-item">
            <h3>2022</h3>
            <p>開始前端開發學習之旅</p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

```css src/pages/lesson02/pages/About.css
.about-container {
  max-width: 800px;
  margin: 0 auto;
}

.about-section {
  margin-bottom: 3rem;
}

.about-section h2 {
  color: #667eea;
  margin-bottom: 1rem;
}

.about-section p {
  line-height: 1.8;
  color: #666;
  font-size: 1.1rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.skill-card {
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.skill-card h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.skill-card p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #667eea;
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2.5rem;
  top: 0;
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
}

.timeline-item h3 {
  margin: 0 0 0.5rem 0;
  color: #667eea;
}

.timeline-item p {
  margin: 0;
  color: #666;
}
```

## 步驟 6：建立聯絡表單頁面（useNavigate）

```jsx src/pages/lesson02/pages/Contact.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Contact.css';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // 表單驗證
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '電子郵件格式不正確';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = '請輸入訊息內容';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '訊息內容至少需要 10 個字';
    }
    
    return newErrors;
  };

  // 處理輸入變化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 清除該欄位的錯誤訊息
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 模擬發送成功
    alert(`訊息已送出！\n 姓名：${formData.name}\nEmail：${formData.email}`);
    
    // 🌟 使用 navigate 導航到作品列表
    navigate('/lesson02/projects', {
      state: { message: '感謝您的聯絡，我會盡快回覆！' }
    });
  };

  return (
    <div className="contact-container">
      <h1>📧 聯絡我</h1>
      <p className="contact-intro">
        有任何問題或合作機會歡迎與我聯絡！
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">姓名 *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">電子郵件 *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">訊息內容 *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            送出訊息
          </button>
          <button
            type="button"
            onClick={() => navigate('/lesson02/projects')}
            className="btn-cancel"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
```

```css src/pages/lesson02/pages/Contact.css
.contact-container {
  max-width: 600px;
  margin: 0 auto;
}

.contact-intro {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.contact-form {
  background: #f7fafc;
  padding: 2rem;
  border-radius: 12px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e53e3e;
}

.error-message {
  display: block;
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-submit,
.btn-cancel {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit {
  background: #667eea;
  color: white;
}

.btn-submit:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.btn-cancel {
  background: #e2e8f0;
  color: #333;
}

.btn-cancel:hover {
  background: #cbd5e0;
}
```

**學習重點：**
- 表單驗證：即時顯示錯誤訊息
- `navigate()` 配合表單提交使用
- `navigate()` 傳遞 state 資料到下一頁

## 測試運行

現在啟動專案並測試 Lesson02：

```bash
pnpm dev
```

1. **訪問** `/lesson02`：自動導向到作品列表
2. **點擊作品卡片**：進入作品詳情頁面（觀察 URL 變化）
3. **點擊「上一個/下一個作品」**：在不同作品間切換
4. **點擊「返回」按鈕**：返回作品列表
5. **點擊「關於我」**：查看個人資訊
6. **點擊「聯絡我」**：填寫並提交表單（觀察導航行為）

## 學習總結

透過這個完整的作品集系統，我們學會了：

✅ **巢狀路由（Nested Routes）**
- Lesson02 內部管理自己的子路由
- 使用 `/*` 允許內部路由

✅ **Link 導航**
- 使用 `<Link>` 建立可點擊元素
- 動態生成路徑

✅ **useParams**
- 從 URL 獲取參數
- 根據參數顯示不同內容

✅ **useNavigate**
- 程式控制導航
- 返回上一頁 `navigate(-1)`
- 傳遞狀態資料

✅ **實際應用場景**
- 作品展示系統
- 表單驗證與提交
- 錯誤處理

下一步可以嘗試：
- 添加更多作品
- 實作分類篩選功能
- 連接真實的後端 API

## 步驟 7：添加 404 錯誤處理

在 Lesson02 的路由配置中添加 404 處理，當使用者輸入不存在的路徑時顯示友善的錯誤訊息：

```jsx src/pages/lesson02/index.jsx
import { Routes, Route, Navigate, Link } from 'react-router';
import './index.css';

import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound'; // 新增 404 頁面

export default function Lesson02() {
  return (
    <div className="lesson02-container">
      <nav className="lesson02-nav">
        <h2>📂 我的作品集</h2>
        <div className="nav-links">
          <Link to="/lesson02/projects" className="nav-link">作品列表</Link>
          <Link to="/lesson02/about" className="nav-link">關於我</Link>
          <Link to="/lesson02/contact" className="nav-link">聯絡我</Link>
        </div>
      </nav>

      <div className="lesson02-content">
        <Routes>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          {/* 404 路由：必須放在最後 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
```

建立 404 頁面元件：

```jsx src/pages/lesson02/pages/NotFound.jsx
import { Link, useNavigate } from 'react-router';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2>😢 找不到此頁面</h2>
        <p>抱歉，您訪問的頁面不存在或已被移除。</p>
        
        <div className="not-found-actions">
          <button onClick={() => navigate(-1)} className="btn-back">
            返回上一頁
          </button>
          <Link to="/lesson02/projects" className="btn-home">
            回到作品列表
          </Link>
        </div>
      </div>
    </div>
  );
}
```

```css src/pages/lesson02/pages/NotFound.css
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.not-found-content {
  text-align: center;
  padding: 3rem;
}

.not-found-title {
  font-size: 6rem;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.not-found-content h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: #333;
}

.not-found-content p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.not-found-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-back,
.btn-home {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-back {
  background: #e2e8f0;
  color: #333;
  border: none;
  cursor: pointer;
}

.btn-back:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

.btn-home {
  background: #667eea;
  color: white;
  display: inline-block;
}

.btn-home:hover {
  background: #5568d3;
  transform: translateY(-2px);
}
```

**學習重點：**
- `path="*"`：匹配所有未被其他路由匹配的路徑
- 必須放在路由配置的**最後**（優先權最低）
- 提供友善的錯誤訊息和返回選項
- 同時使用 `navigate(-1)` 和 `Link` 提供多種返回方式

## 步驟 8：useNavigate 完整用法總結

我們已經在表單提交中使用了 `useNavigate`，現在讓我們總結所有常見用法：

```jsx
import { useNavigate } from 'react-router';

function ExampleComponent() {
  const navigate = useNavigate();

  // 1. 基本導航
  const goToProjects = () => {
    navigate('/lesson02/projects');
  };

  // 2. 帶參數的動態導航
  const goToProject = (id) => {
    navigate(`/lesson02/projects/${id}`);
  };

  // 3. 相對路徑導航
  const goBack = () => {
    navigate('..'); // 返回上一層路由
  };

  // 4. 返回上一頁（瀏覽器歷史記錄）
  const goToPreviousPage = () => {
    navigate(-1); // 等同於按瀏覽器的「上一頁」
  };

  // 5. 前進下一頁
  const goToNextPage = () => {
    navigate(1); // 等同於按瀏覽器的「下一頁」
  };

  // 6. 替換當前歷史記錄（不能按「上一頁」回來）
  const replaceWithHome = () => {
    navigate('/lesson02/projects', { replace: true });
  };

  // 7. 傳遞狀態到下一頁
  const goWithState = () => {
    navigate('/lesson02/contact', { 
      state: { 
        fromPage: 'projects',
        message: '請填寫聯絡表單' 
      } 
    });
  };

  // 8. 在表單提交後導航
  const handleSubmit = (e) => {
    e.preventDefault();
    // ... 處理表單資料
    navigate('/lesson02/projects', {
      state: { message: '提交成功！' }
    });
  };

  return (
    <div>
      {/* 使用範例 */}
      <button onClick={goToProjects}>前往作品列表</button>
      <button onClick={() => goToProject(1)}>查看作品 1</button>
      <button onClick={goToPreviousPage}>返回上一頁</button>
    </div>
  );
}
```

**useNavigate vs Link 選擇指南：**

| 情況           | 使用              | 原因                                          |
| -------------- | ----------------- | --------------------------------------------- |
| 一般頁面跳轉   | `<Link>`          | 更符合語意，SEO 友善，可右鍵開新分頁          |
| 表單提交後導航 | `useNavigate()`   | 需要在程式邏輯中執行                          |
| 條件式導航     | `useNavigate()`   | 需要根據條件判斷是否導航                      |
| 返回上一頁     | `useNavigate(-1)` | 操作瀏覽器歷史記錄                            |
| 需要傳遞狀態   | 兩者皆可          | `Link` 用 `state` prop，`navigate` 用 options |

## 完整功能測試清單

現在 Lesson02 已經整合了所有 Router 核心功能，讓我們完整測試一遍：

```bash
pnpm dev
```

**測試步驟：**

1. ✅ **基礎導航**
   - 訪問 `/lesson02`
   - 應自動導向 `/lesson02/projects`

2. ✅ **Link 導航**
   - 點擊作品卡片
   - URL 應變為 `/lesson02/projects/1`（或 2、3）

3. ✅ **動態路由（useParams）**
   - 在作品詳情頁觀察內容是否正確
   - 手動修改 URL 的數字（如改成 `/lesson02/projects/2`）
   - 內容應對應改變

4. ✅ **useNavigate 返回**
   - 在作品詳情頁點擊「返回」按鈕
   - 應返回作品列表

5. ✅ **表單提交導航**
   - 填寫聯絡表單並提交
   - 應導航到作品列表並顯示 alert

6. ✅ **404 錯誤處理**
   - 訪問不存在的路徑（如 `/lesson02/test123`）
   - 應顯示 404 頁面
   - 點擊「返回上一頁」和「回到作品列表」都應正常運作

7. ✅ **作品不存在處理**
   - 訪問不存在的作品 ID（如 `/lesson02/projects/999`）
   - 應在 ProjectDetail 中顯示「找不到此作品」訊息

## 學習總結

透過 Lesson02 這個完整的作品集系統，我們已經學會了 React Router 的所有核心功能：

✅ **路由配置**
- 巢狀路由結構（`path="lesson02/*"`）
- index 路由與自動導向
- 404 路由（`path="*"`）

✅ **導航方式**
- `<Link>`：宣告式導航
- `useNavigate()`：程式式導航
- 相對路徑與絕對路徑

✅ **動態路由**
- `useParams()`：取得 URL 參數
- 參數驗證與錯誤處理

✅ **實際應用**
- 作品展示系統
- 表單驗證與提交
- 錯誤處理（404、資料不存在）
- 使用者體驗優化（返回按鈕、友善錯誤訊息）

**下一步建議：**
- 嘗試添加更多作品到 `projects` 陣列
- 實作作品分類篩選功能
- 添加搜尋功能
- 連接真實的後端 API
- 實作分頁功能

{% note success %}
**🎉 恭喜完成 Lesson02！**

現在你已經掌握了 React Router 的核心功能，可以建立完整的單頁應用了。在 Lesson03 中，我們可以進一步學習更進階的主題，如 Context API、useReducer 等狀態管理工具。
{% endnote %}

# 部署注意事項

## 問題：Refresh 後出現 404

使用 BrowserRouter 時，在部署到伺服器後會遇到一個常見問題：

```
情境：
1. 訪問 https://example.com → 正常顯示首頁 ✅
2. 點擊連結到 /lessons → 正常顯示課程列表 ✅
3. 重新整理頁面（F5） → 出現 404 錯誤 ❌
```

**原因：**
- SPA 只有一個 `index.html` 檔案
- 訪問 `/lessons` 時，伺服器會嘗試尋找 `lessons.html`
- 找不到檔案，返回 404

**解決方案：配置伺服器重定向**

### Vite Preview（開發測試）

Vite 的 preview 模式已自動處理，無需額外配置：

```bash
pnpm build
pnpm preview
```

### Netlify 部署

在專案根目錄建立 `netlify.toml`：

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel 部署

在專案根目錄建立 `vercel.json`：

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Apache 伺服器

在 `public/` 目錄建立 `.htaccess`：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx 伺服器

在 nginx 配置檔中添加：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

{% note warning %}
**如果無法配置伺服器，使用 HashRouter：**

```jsx
// main.jsx
import { HashRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
```

URL 會變成 `https://example.com/#/lessons`，但不需要伺服器配置。缺點是 URL 有 `#`，SEO 不友善。
{% endnote %}

# 總結

## 本章學習重點

✅ **SPA 路由概念**
- 理解單頁應用與多頁應用的差異
- 了解為什麼需要 React Router

✅ **React Router 核心 API**
- `BrowserRouter`：啟用路由功能
- `Routes` 和 `Route`：配置路由規則
- `Link` 和 `NavLink`：導航連結
- `Outlet`：巢狀路由的渲染位置

✅ **進階功能**
- `useParams`：獲取動態路由參數
- `useNavigate`：程式導航
- 巢狀路由與 Layout
- 404 錯誤處理

✅ **實戰應用**
- 建立完整的作品集系統（Lesson02）
- 目錄結構規劃
- 部署配置

## 下一步學習

完成 React Router 後，建議學習：

1. **State 管理**（第四章）
   - useReducer
   - Context API
   - 全域狀態管理

2. **資料獲取**
   - useEffect 非同步操作
   - TanStack Query（React Query）
   - API 整合

3. **全端框架**（進階）
   - Next.js 15（SSR、ISR、App Router）
   - Remix（React Router 團隊開發）

{% note success %}
**學習建議：**

1. **動手實作**：跟著教學建立完整的專案
2. **修改範例**：改變路由結構、添加新頁面
3. **閱讀官方文件**：[React Router 官方文件](https://reactrouter.com)
4. **解決實際問題**：用 React Router 建立自己的專案

掌握 React Router 後，你就能建立完整的單頁應用了！🎉
{% endnote %}

# 參考文獻

- [React Router Official Documentation](https://reactrouter.com)
- [React Router v7 - What's New](https://reactrouter.com/start/library/installation)
- [React 19 Official Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
