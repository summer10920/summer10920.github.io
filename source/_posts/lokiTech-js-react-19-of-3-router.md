---
title: '[框架課程] React v18 教學（三）- 動態路由'
categories:
  - 職訓教材
  - ReactJS
tag:
  - JavaScript 程式設計（假日班）
date: 2025-10-18 13:09:14
hidden: true
---

![](/assets/images/banner/react-router.png)

隨著 React 的了解越多，我們需要大量練習於不同頁面。為了更好的統一實作於同一份專案上，我們需要額外使用 React 生態下的另一個特別套件 React Router。這是一個能夠很好的動態出不同路由有不同的 React 檔案，但本體網頁上還是同一份 SPA 下的渲染差異輸出。

<!-- more -->

# React Router v7
React 作為 SPA（Single-Page Application，單頁應用）的用途之一，能夠在一個 HTML 文件中動態渲染多個不同的畫面內容。這是透過 React 指定的一組 DOM 元素進行動態更新，從而實現畫面的變換。如果需要在多個不同的畫面中展示各自的 React 內容，傳統的方法是創建多個 HTML 文件，每個 HTML 文件下都有其對應的 ReactDOM 實例。然而，這種方法會導致應用程序的複雜度增加，維護成本提高。

為了解決這個問題，可使用 [ReactRouter](https://reactrouter.com) 是一種動態路由的延伸套件，能夠在一個 HTML 文件上實現多個畫面的動態路由切換。它允許在同一個 HTML 文件中，透過虛擬的動態路由，實現大畫面的渲染替換。這種方法的優點是，實際上仍然是同一份 HTML 文件進行替換，減少了應用程序的複雜度，提高了應用程序的可維護性和性能。

在 React Router v7 中，發生了顯著的變革。相比過去多提供了 SSR 環境的 framework。library 方式適合小型 React SPA 專案，能夠輕鬆地添加路由功能。然而，隨著專案規模的擴大，許多團隊開始選擇使用 Next.JS 或 Remix 等 framework 來部署新專案。這些 framework 使用 React 作為編寫語言，並提供了完整的專案環境系統，包括動態路由功能等。因此，選擇 Next 或 Remix 的團隊不會特地的額外安裝使用 React Router。從第七版開始，React Router 提供了 framework 方式的支持，保留了 library 方式。

根據目前的 7.1.4 版本來說與未來性考量。我們將選擇 library 作為 SPA 專案的傳統選擇，跟隨以下方式完成安裝設定：

```shell
pnpm add react-router
```

## 調整 main.jsx
接著來到最上層元件調整，利用 BrowserRouter 包覆整個 App，使得整個 APP 都是被 BrowserRouter 所影響判定渲染。

- 使用`BrowserRouter`將要規劃路由的根元件包覆。
- 修改 css 檔案名稱與路徑其一致，更改`index.css`為`main.css`，調整部分 css 代碼

```jsx src\main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './main.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```
```css src\main.css
:root {
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

* {
  box-sizing: border-box;
}

body {
  padding-left: 300px;
  margin: 0;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

## 複製 App.jsx 成為子路由 base.jsx
原本的 App 元件保留下來另外下放到路由元件，之後重新將 App 元件作為我們路由主要處理的單元並配置路由。

- 修改 App.css 命名為 base.css
- 複製 App.jsx 為 base.jsx，注意調整部分命名
- 將相關的 component 目錄、jsx、css 都搬移到 pages/lesson01 目錄下，整理目錄也很重要。

```jsx src\pages\lesson01\base.jsx
import { useState } from 'react';
import './base.css';
import MyLogo from './component/MyLogo/MyLogo';
import MyH1 from './component/MyH1/MyH1';
import MyButton from './component/MyButton/MyButton';
import MyForm from './component/MyForm/MyForm';
import MyGallery from './component/MyGallery/MyGallery';

export default function Base() {
  const [count, setCount] = useState(0);
  const [toShow, setToShow] = useState(true);

  const h1Title = 'Vite + React';

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
      <MyGallery toShow={toShow} setToShow={setToShow} />
      <MyGallery {...{ toShow, setToShow }} />
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
```css src\pages\lesson01\base.css
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

## 調整 App.jsx 為路由動線
現在 App.jsx 可以整個重新改寫，主要需要透過渲染進行配置<Routes>，<Route>並將 URL 段與 UI 元素耦合。

- Routes 為所有路由的集合群組，任何指定的 path 都會在這層切換。
- Route 為單一路由，他可以巢狀的疊合下層子路由。在這個設計來說，我們使用一個沒有 path 屬性作為父路由，也就是這三個子 Route 都會吃到父路由的 UI。
- 希望沒輸入網址以及 base 都是指向到 Base 元件。
- Layout 會作為分割畫面使用，左側拿來用路由導向連結，右側為路由變化的 DOM 替換。稍後解釋。
- 為了測試，除了剛搬移過的 Base 元件，多規畫一個 MyGallery 元件做稍後的路由測試準備。

```jsx src\App.jsx
import { Routes, Route } from 'react-router';
import Layout from './template/layout';
import Base from './pages/lesson01/base';
import MyGallery from './pages/lesson01/component/MyGallery/MyGallery';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Base />} />
        <Route path="base" element={<Base />} />
        <Route path="gallery" element={<MyGallery />} />
      </Route>
    </Routes>
  );
}
```

## 設計 Layout 元件
Layout 作為整個路由模板，希望換頁面只有右側區域。

- 左側使用 Link 方式指定一個 url 位置。
- 右側需要設定一個 Outlet 出口位置，其根據 App.jsx 路由的設定，該三個子路由都會在這裡切換畫面內容。
- 同時需要花心思設計一下 css，把 layout 相關檔案放在 template 目錄，分類整理目錄。

```jsx src\layout\template.jsx
import { Link, Outlet, NavLink } from 'react-router';
import './layout.css';

export default function Layout() {
  return (
    <>
      <nav>
        <h2>選單</h2>
        <ul>
          <li>
            <NavLink to="/base">基礎學習</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">幻燈片</NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <div className="container">
          <Outlet />
        </div>
        <footer>本專案為 Loki Jiang 課程教材使用</footer>
      </main>
    </>
  );
}

```
```css src\template\layout.css
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background: #f4f4f4;
  padding: 20px;
  overflow-y: auto;

  ul {
    padding-left: 20px;

    a {
      font-weight: bold;
      display: block;

      &:hover {
        color: #f65252;
      }

      &.active {
        background: #4dacff;
        color: white;
      }
    }
  }
}

main {
  padding: 20px;
  position: relative;
  min-height: 100vh;

  .container {
    max-width: 960px;
    margin: 0 auto;
  }

  footer {
    background: #343434;
    color: white;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

```

## 檢查
請檢查你的目錄結構是否如下，並點選檢查畫面是否如路由導向拿到指定畫面。包含`http://localhost:5173/`與`http://localhost:5173/gallery`

![](/assets/images/2025-02-02-12-22-21.png)
![](/assets/images/2025-02-02-12-34-42.png)

React Router 還有許多完整功能與實用設計，可以自行參考官方文件。例如：
- 如何讀取 useParams 值，例如 `http://localhost:5173/blog/1` 情況下取得 id=1 對 API 發送資料請求取得文章 1 的資料。
- 所有未匹配的路徑下，拜訪指定的 404 網頁顯示錯誤。
- 使用 useNavigate 在 js 代碼下進行跳轉路由跳轉。

# 參考文獻
- [Installation | React Router](https://reactrouter.com/start/library/installation)