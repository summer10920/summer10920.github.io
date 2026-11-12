---
title: "React Router：路由、連結與參數"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:10:00
---

![](assets/images/banner/react.png)

網址決定現在畫哪一頁。這一篇用 React Router 8 資料模式的 `createBrowserRouter` 與 `RouterProvider`，從 `react-router` 引入，把 `03-react` 複製成 `04-react-router`，再把原本用按鈕切換的示範收成練習筆記網站。路由表、左側目錄、連結、路徑參數與查詢參數都接在同一份專案上。

<!-- more -->

# 認識路由

這一章先用狀態把選單與主畫面配在一起，看重新整理與網址各自少了什麼，再說明為什麼要另外找路由套件、React Router 負責什麼。課堂用資料模式，宣告式與框架模式留在同一節對照。可跑的路由表要等複製出 `04-react-router` 之後才開始寫。

## 狀態切頁

還沒複製 04 之前，先在 `03-react` 裡試。選單與主畫面可以先放在同一個元件裡，用一個狀態決定現在畫哪一塊。按鈕改的是 `page`，主區就在首頁與清單之間切換。先看這份可跑的元件怎麼配在一起，再看重新整理與網址會停在哪裡。

```jsx 03-react/src/demos/86-state-pages.jsx
import { useState } from 'react';

const trips = [
  { id: 1, title: '台北城市漫遊' },
  { id: 2, title: '花蓮山海三日' },
  { id: 3, title: '京都紅葉散步' },
];

export default function StatePages() {
  const [page, setPage] = useState('home');

  return (
    <section>
      <nav className="flex gap-3">
        <button type="button" onClick={() => setPage('home')}>
          首頁
        </button>
        <button type="button" onClick={() => setPage('list')}>
          清單
        </button>
      </nav>
      {page === 'home' ? (
        <h1 className="mt-4 text-2xl font-bold">首頁</h1>
      ) : (
        <ul className="mt-4 grid gap-2">
          {trips.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

**解析**

- 按下「清單」之後，主區換成三個標題，網址列仍停在原來的路徑。
- 每次重新整理，元件重新掛上，`useState` 又從起始值 `'home'` 開始，畫面就從最初的首頁重新來過。
- 清單沒有自己的地址，所以無法把這一頁分享出去或收成書籤；瀏覽器的上一頁也回不到清單，因為歷史紀錄裡沒有這一筆。

{% note success %}
**換你試試：**
把起始值改成 `'list'`。重新整理後應先看到三個標題，而不是「首頁」。
{% endnote %}

<details>
<summary>參考答案</summary>

只改起始值。按鈕與資料留著。

```diff 03-react/src/demos/86-state-pages.jsx
 // ...
 export default function StatePages() {
-  const [page, setPage] = useState('home');
+  const [page, setPage] = useState('list');
 // ...
```

</details>

## React Router

網址要對上元件、換頁要進瀏覽器歷史、重新整理要停在同一條路徑，這些事 React 本身不做。React Router 負責這一段，同一套畫面對應可以接成資料模式、宣告式或框架模式。課堂與結業專案用資料模式，另外兩種留作選讀對照。

### 三種接法一覽

React 只依狀態決定要渲染哪些元件，不處理網址。上一節的選單只改元件裡的狀態，所以網址沒有跟著變，重新整理也回到起點。手刻路由要自己聽瀏覽器的歷史事件，再依路徑換元件；巢狀版面、路徑參數與查詢字串加進來之後，外框要留著、編號要取出、問號後面的篩選要保留，拆路徑與還原畫面都得自己寫。這些工作和把資料畫進 DOM 是兩件事，所以改用專門做路由的套件。

React Router 把現在的網址對到要畫的元件，並提供換頁用的連結與導覽 Hook，文件不用整頁重載。下面三件事三種接法都做得到。

**一覽**

- 對網址：讀現在的路徑，決定要畫哪一個元件。
- 管歷史：把換頁推進瀏覽器歷史，上一頁與下一頁回到當時那個畫面，重新整理仍停在同一個路徑。
- 換頁：連結改的是網址，文件不整頁重載，只有對上的元件換掉。

{% mermaid graph LR %}
  urlNode["網址"] --> routerNode["React Router"]
  routerNode --> viewNode["對上的元件"]
  style urlNode fill:#e3f2fd
  style routerNode fill:#fff3e0
  style viewNode fill:#e8f5e9
{% endmermaid %}

套件把網址、歷史與換頁接起來。讀取可以留在頁面掛上之後，也可以寫在路由上、於進頁前完成。先看課堂要用的資料模式。

{% note info %}
**Next.js 自帶路由**
Next.js 依檔案結構決定路徑（檔案路由，file-based routing），用 Next.js 的專案不必再裝 React Router。本課用 Vite，所以接 React Router。
{% endnote %}

{% note info %}
**舊的套件名稱**
v8 已移除套件 `react-router-dom`。v7 時它只是相容用的再出口。不要再安裝那個套件，也不要照舊文件的入口去引入。
{% endnote %}

### 資料模式

資料模式把路由寫成物件陣列，在元件外面交給 `createBrowserRouter`，再由 `RouterProvider` 畫出來。專案骨架仍是一般的 Vite 與 React。

{% mermaid graph TD %}
  entry["src/main.jsx<br/>createRoot 渲染 App，不包 BrowserRouter"]
  routes["src/App.jsx<br/>createBrowserRouter 與 RouterProvider"]
  layout["src/layouts/MainLayout.jsx<br/>Link、Outlet、ScrollRestoration"]
  page["src/pages/TripList.jsx"]
  data["loader 進頁前，頁面用 useLoaderData"]
  entry --> routes
  routes --> layout
  layout --> page
  routes --> data
  data --> page
  classDef entryC fill:#e3f2fd,stroke:#1e88e5
  classDef routesC fill:#fff3e0,stroke:#f9a825
  classDef layoutC fill:#e3f2fd,stroke:#1e88e5
  classDef pageC fill:#e8f5e9,stroke:#43a047
  classDef dataC fill:#fff3e0,stroke:#f9a825
  classDef differBlue fill:#e3f2fd,stroke:#fb8c00,stroke-width:2px
  classDef differOrange fill:#fff3e0,stroke:#fb8c00,stroke-width:2px
  classDef differGreen fill:#e8f5e9,stroke:#fb8c00,stroke-width:2px
  class entry,layout differBlue
  class routes,data differOrange
  class page pageC
{% endmermaid %}

這份迷你範例的選單是首頁與行程清單，`/` 畫 `Home`，`/trips` 畫 `TripList`。`action`、`Form`、`redirect` 與 `errorElement` 寫在後面的「讀取與送出資料」，這一節只留一條 `loader`。三種接法都呼叫同一支 `getItems`，先寫在下面的假資料檔。

#### 步驟 1：準備假資料

三種接法都呼叫同一支 `getItems`，先放在 `src/api/fake-api.js`。

```js src/api/fake-api.js
/**
 * 讀取清單。三種接法都呼叫這個函式，差別只在誰、何時呼叫。
 * @returns {Promise<{ id: string, title: string }[]>}
 */
export function getItems() {
  return Promise.resolve([
    { id: '1', title: '看海' },
    { id: '2', title: '寫筆記' },
  ]);
}
```

**解析**

- `getItems` 回傳一個已經完成的 Promise，內容是兩筆物件，標題依序是「看海」與「寫筆記」。
- 三種接法都呼叫這支函式。這一節由 `loader` 在進頁前呼叫，後面兩節沿用同一支函式，只在程式裡引入。

#### 步驟 2：入口

`src/main.jsx` 用 `createRoot` 渲染 `App`，不包 `BrowserRouter`。

```jsx src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

/**
 * 把應用掛上 #root。資料模式不在入口包 BrowserRouter。
 * createRoot(container) 的 container 是掛載點，render(element) 把元素畫進去。
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**解析**

- 入口只從 `react`、`react-dom/client` 與 `./App.jsx` 引入。
- `createRoot` 把樹掛上 `#root`，嚴格模式裡只有 `App`。

#### 步驟 3：路由表

路由物件陣列寫在 `src/App.jsx`，交給 `createBrowserRouter` 與 `RouterProvider`。

```jsx src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import TripList, { loader as tripLoader } from './pages/TripList.jsx';

/**
 * 建立資料路由器。路由表是物件陣列，寫在元件外面，不要放進 state。
 * 每一筆用 path 對網址，用 element 指定已經建立的元素。
 * 也可以改寫 Component，傳入元件函式，由路由器建立元素。
 * index 為 true 時代表父路徑本身，同一筆不要再寫 path。
 * children 是巢狀子路由，畫進父層 element 裡的 Outlet。
 * loader 在該路由的元件畫出來之前執行，回傳 Promise 時路由器會等待，值交給 useLoaderData。
 * @param {object[]} routes 路由物件陣列
 * @returns {object} 資料路由器，交給 RouterProvider 的 router
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'trips', element: <TripList />, loader: tripLoader },
    ],
  },
]);

/**
 * 把資料路由器畫進 React 樹。
 * @param {object} props
 * @param {object} props.router createBrowserRouter 的回傳值
 * @returns {React.ReactElement}
 */
export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- `createBrowserRouter` 收到路由物件陣列，回傳資料路由器。這個物件寫在元件外面，再交給 `RouterProvider`。
- 父路由的 `element` 是版型。`index: true` 那一筆不寫 `path`，網址就是 `/`。`path: 'trips'` 與父路徑接成 `/trips`，並掛上清單的 `loader`。
- 同一筆也可以改寫 `Component: Home`，傳入元件函式，由路由器建立元素。這一則用 `element`，和後面「啟用路由」的路由表相同。

#### 步驟 4：版型

`MainLayout` 放選單、`Outlet` 與 `ScrollRestoration`。

```jsx src/layouts/MainLayout.jsx
/**
 * Link 改網址且不整頁重載。
 * @param {object} props
 * @param {string} props.to 目標路徑
 * @param {React.ReactNode} props.children 連結文字
 * @returns {React.ReactElement}
 */
/**
 * Outlet 畫出對上的子路由。沒有對上的子路由時是 null。
 * @returns {React.ReactElement | null}
 */
/**
 * ScrollRestoration 在換頁後還原捲動位置。
 * 資料模式與框架模式可用，放在根版型一次。
 * @returns {React.ReactElement | null}
 */
import { Link, Outlet, ScrollRestoration } from 'react-router';

/** 共用版型。選單每頁都在，Outlet 依網址換成首頁或清單。 */
export default function MainLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">首頁</Link> | <Link to="/trips">行程清單</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
```

**解析**

- `Link` 的 `to` 是站內路徑，點下去改網址，文件不整頁重載。
- `Outlet` 畫出對上的子路由，`/` 是首頁，`/trips` 是清單。
- `ScrollRestoration` 放在根版型一次，換頁時還原捲動位置。

#### 步驟 5：首頁

首頁只回傳一個標題，後面兩種接法沿用這一份。

```jsx src/pages/Home.jsx
/** 路徑 / 的頁面。這一頁沒有自己的資料讀取。 */
export default function Home() {
  return <h1>首頁</h1>;
}
```

**解析**

- 首頁只畫一個標題。後面兩種接法的首頁元件相同，直接沿用這一份。

#### 步驟 6：頁面與資料

清單頁匯出 `loader`，進頁前讀資料，再用 `useLoaderData` 接。

```jsx src/pages/TripList.jsx
import { useLoaderData } from 'react-router';
import { getItems } from '../api/fake-api.js';

/**
 * 進 /trips 之前執行。回傳值就是 useLoaderData 的結果。
 * 路由器會等待這個 Promise。
 * @returns {Promise<{ id: string, title: string }[]>}
 */
export function loader() {
  return getItems();
}

/** 路徑 /trips 的頁面。 */
export default function TripList() {
  /**
   * 讀取目前這條路由 loader 的回傳值。
   * @returns {{ id: string, title: string }[]}
   */
  const items = useLoaderData();

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

**解析**

- `loader` 在 `TripList` 畫出來之前執行，回傳的 Promise 由路由器等待，完成後的陣列就是 `useLoaderData()` 的結果。
- 畫面上兩列是「看海」與「寫筆記」。這一頁沒有 `useEffect`。


### 選讀：宣告式

宣告式把路由寫成 JSX，入口用 `BrowserRouter` 包住應用，頁面掛上之後才讀資料。課堂與結業專案用的是資料模式，這一節只對照寫法。

{% mermaid graph TD %}
  entry["src/main.jsx<br/>BrowserRouter 包住 App"]
  routes["src/App.jsx<br/>Routes 與 Route"]
  layout["src/layouts/MainLayout.jsx<br/>Link、Outlet"]
  page["src/pages/TripList.jsx"]
  data["頁面掛上後，useEffect 呼叫 getItems"]
  entry --> routes
  routes --> layout
  layout --> page
  page --> data
  classDef entryC fill:#e3f2fd,stroke:#1e88e5
  classDef routesC fill:#fff3e0,stroke:#f9a825
  classDef layoutC fill:#e3f2fd,stroke:#1e88e5
  classDef pageC fill:#e8f5e9,stroke:#43a047
  classDef dataC fill:#fff3e0,stroke:#f9a825
  classDef differBlue fill:#e3f2fd,stroke:#fb8c00,stroke-width:2px
  classDef differOrange fill:#fff3e0,stroke:#fb8c00,stroke-width:2px
  classDef differGreen fill:#e8f5e9,stroke:#fb8c00,stroke-width:2px
  class entry,layout differBlue
  class routes,data differOrange
  class page pageC
{% endmermaid %}

這一模式沒有 `loader` 與 `action`，官方的 `ScrollRestoration` 也不在這裡。假資料與首頁和資料模式相同，檔案是 `src/api/fake-api.js` 與 `src/pages/Home.jsx`。下面只寫入口、路由表、版型與清單頁的差別。

#### 步驟 1：入口

`src/main.jsx` 用 `BrowserRouter` 包住 `App`，再交給 `createRoot`。

```jsx src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';

/**
 * BrowserRouter 聽瀏覽器網址，讓子樹裡的 Routes 讀得到目前路徑。
 * 它沒有 router 屬性，路徑對應寫在子樹的 Route。
 * @param {object} props
 * @param {React.ReactNode} props.children 要聽網址的元件樹
 * @returns {React.ReactElement}
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

**解析**

- `BrowserRouter` 包在 `App` 外面，裡面的 `Routes` 才讀得到目前路徑。
- 入口仍用 `createRoot` 掛上 `#root`。引入來源是 `react-router`。

#### 步驟 2：路由表

路由寫成 `src/App.jsx` 裡的 `Routes` 與 `Route`。

```jsx src/App.jsx
/**
 * Routes 在子層 Route 裡挑符合目前網址的那一筆。
 * @param {object} props
 * @param {React.ReactNode} props.children 若干 Route
 * @returns {React.ReactElement | null}
 */
/**
 * 一條路徑。path 是網址片段，element 是要畫的元素，children 是巢狀路由。
 * index 不寫 path，代表父路徑本身。宣告式的 Route 沒有 loader 與 action。
 * @param {object} props
 * @param {string} [props.path] 網址片段
 * @param {boolean} [props.index] 為 true 時對上父路徑
 * @param {React.ReactElement} [props.element] 要畫的元素
 * @param {React.ReactNode} [props.children] 巢狀的 Route
 * @returns {React.ReactElement | null}
 */
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import TripList from './pages/TripList.jsx';

/**
 * 父路由畫版型，子路由畫進版型的 Outlet。
 * index 代表父路徑 / 本身；trips 與父路徑接成 /trips。
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="trips" element={<TripList />} />
      </Route>
    </Routes>
  );
}
```

**解析**

- `<Routes>` 依目前網址在子層 `<Route>` 裡挑一筆。`path` 對片段，`element` 是要畫的元素。
- 父路由畫 `MainLayout`。`index` 不寫 `path`，網址是 `/`。`path="trips"` 接成 `/trips`。
- 這些 `Route` 沒有 `loader` 屬性。資料不在進頁前讀。

#### 步驟 3：版型

版型仍是 `src/layouts/MainLayout.jsx`，只放 `Link` 與 `Outlet`。

```jsx src/layouts/MainLayout.jsx
/**
 * Link 改網址且不整頁重載。
 * @param {object} props
 * @param {string} props.to 目標路徑
 * @param {React.ReactNode} props.children 連結文字
 * @returns {React.ReactElement}
 */
/**
 * Outlet 畫出對上的子路由。沒有對上的子路由時是 null。
 * @returns {React.ReactElement | null}
 */
import { Link, Outlet } from 'react-router';

/** 共用版型。選單每頁都在，Outlet 依網址換成首頁或清單。 */
export default function MainLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">首頁</Link> | <Link to="/trips">行程清單</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

**解析**

- 版型只有 `Link` 與 `Outlet`。選單兩條分別前往 `/` 與 `/trips`。
- 宣告式沒有官方的 `ScrollRestoration`，所以這裡不放。

#### 步驟 4：頁面與資料

清單頁在掛上之後，用 `useEffect` 呼叫 `getItems`。

```jsx src/pages/TripList.jsx
import { useEffect, useState } from 'react';
import { getItems } from '../api/fake-api.js';

/**
 * 路徑 /trips。宣告式沒有 loader，元件掛上後才讀 getItems。
 * getItems 與資料模式相同，檔案是 src/api/fake-api.js。
 */
export default function TripList() {
  /**
   * 目前清單。useState 回傳 [目前值, 更新函式]，初值是空陣列。
   * @param {{ id: string, title: string }[]} initialState 一開始的清單
   * @returns {[{ id: string, title: string }[], function]}
   */
  const [items, setItems] = useState([]);

  /**
   * 元件掛上後執行。第二個引數是依賴陣列，空陣列表示只在掛上時跑一次。
   * getItems 回傳 Promise，完成後用 setItems 寫進狀態。
   * @param {function(): void} effect 掛上後要跑的函式
   * @param {unknown[]} deps 依賴陣列
   */
  useEffect(() => {
    getItems().then(setItems);
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

**解析**

- 元件掛上後，`useEffect` 才呼叫 `getItems()`。Promise 完成時 `setItems` 把空陣列換成兩筆資料。
- 路由表沒有 `loader`，頁面也沒有 `useLoaderData`。第一個畫面先是空清單，讀完才出現「看海」與「寫筆記」。


### 選讀：框架模式

框架模式在資料模式之上加上路由模組、伺服器端渲染（SSR）與程式碼切分，並由 Vite 插件負責打包。需要搜尋引擎最佳化（SEO）時，整個專案架構跟著這套走。課堂與結業專案用的是資料模式的 `createBrowserRouter`。

{% mermaid graph TD %}
  entry["vite.config.ts<br/>reactRouter 接手入口，沒有自己寫的 main.jsx"]
  routes["app/routes.ts"]
  layout["app/root.tsx"]
  page["app/routes/trips.tsx"]
  data["loader 進頁前，頁面用 useLoaderData"]
  entry --> routes
  routes --> layout
  layout --> page
  routes --> data
  data --> page
  classDef entryC fill:#e3f2fd,stroke:#1e88e5
  classDef routesC fill:#fff3e0,stroke:#f9a825
  classDef layoutC fill:#e3f2fd,stroke:#1e88e5
  classDef pageC fill:#e8f5e9,stroke:#43a047
  classDef dataC fill:#fff3e0,stroke:#f9a825
  classDef differBlue fill:#e3f2fd,stroke:#fb8c00,stroke-width:2px
  classDef differOrange fill:#fff3e0,stroke:#fb8c00,stroke-width:2px
  classDef differGreen fill:#e8f5e9,stroke:#fb8c00,stroke-width:2px
  class entry,layout differBlue
  class routes,data differOrange
  class page differGreen
{% endmermaid %}

是否開啟 SSR 寫在根目錄的 `react-router.config.ts`，內容是 `export default { ssr: true } satisfies Config`，型別從 `@react-router/dev/config` 引入。`package.json` 依賴 `react-router`，開發依賴是 `@react-router/dev`。假資料與首頁和資料模式相同，檔案是 `app/api/fake-api.ts` 與 `app/routes/home.tsx`。`action`、`Form`、`redirect` 與 `errorElement` 見「讀取與送出資料」。

#### 步驟 1：入口

`vite.config.ts` 放入 `reactRouter()`，由插件接手入口，不必自己寫 `main.jsx`。

```ts vite.config.ts
/**
 * 框架模式的 Vite 設定。plugins 放入 reactRouter() 之後，
 * 由插件接手開發與打包入口，專案裡不必自己寫 main.jsx。
 */
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
});
```

**解析**

- `reactRouter()` 來自 `@react-router/dev/vite`，負責開發伺服器與打包入口。
- 這份設定裡沒有自己寫的 `main.jsx` 或 `RouterProvider`。

#### 步驟 2：路由表

路由表寫在 `app/routes.ts`，只登記模組路徑，不引入頁面元件。

```ts app/routes.ts
/**
 * index(file) 登記首頁模組，畫在 /，出現在 root.tsx 的 Outlet。
 * @param {string} file 相對 app 目錄的模組路徑
 * @returns {object} 一筆索引路由設定
 */
/**
 * route(path, file) 登記一條網址。path 是網址樣式，file 是模組路徑。
 * @param {string} path 網址樣式，trips 會接到 /trips
 * @param {string} file 相對 app 目錄的模組路徑
 * @returns {object} 一筆路由設定
 */
import { type RouteConfig, index, route } from '@react-router/dev/routes';

/** 路徑對到模組檔。這份設定沒有 React 元件。 */
export default [
  index('./routes/home.tsx'),
  route('trips', './routes/trips.tsx'),
] satisfies RouteConfig;
```

**解析**

- `app/routes.ts` 只登記模組路徑，不引入頁面元件。`index` 對上 `/`，`route('trips', ...)` 對上 `/trips`。
- 改哪一個檔負責清單時，改的是 `route` 的第二個引數。讀取函式寫在那個模組裡，不寫在這份表。

#### 步驟 3：版型

`app/root.tsx` 同時是版型與 HTML 外殼，子路由畫進 `Outlet`。

```tsx app/root.tsx
/**
 * 根路由，是 routes.ts 每一筆的父層，並負責整份 HTML。
 * Link 的 to 是站內路徑。
 * Meta、Links 由框架填入 head。不用 React 19 原生 metadata 時要留這兩個。
 * Outlet 畫出子路由。ScrollRestoration 換頁後還原捲動，根版型放一次。
 * Scripts 填入框架的客戶端腳本。
 * @returns {React.ReactElement}
 */
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

/** 根版型。角色等同 MainLayout，再加上整份 HTML 外框。 */
export default function App() {
  return (
    <html lang="zh-Hant">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <Link to="/">首頁</Link> | <Link to="/trips">行程清單</Link>
        </nav>
        <main>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

**解析**

- `app/root.tsx` 是每一條路由的父層，子路由畫進 `Outlet`。選單與資料模式相同，通往 `/` 與 `/trips`。
- `ScrollRestoration` 放在這份根版型一次。`Scripts` 負責客戶端腳本，`Meta` 與 `Links` 填進 `head`。
- 預設設定裡沒有學生自己寫的 `main.jsx`。入口由 Vite 插件接手。

#### 步驟 4：頁面與資料

清單模組 `app/routes/trips.tsx` 匯出 `loader`，進頁前讀資料，再用 `useLoaderData` 接。

```tsx app/routes/trips.tsx
import { useLoaderData } from 'react-router';
import { getItems } from '../api/fake-api.ts';

/**
 * 進 /trips 前執行。回傳值交給 useLoaderData，Promise 會被等待。
 * 框架模式也可把結果以 loaderData 屬性傳入元件，型別是 ./+types 的 Route.ComponentProps。
 * 這一則仍用 hook，方便和資料模式對照。
 * getItems 與前面相同，檔案是 app/api/fake-api.ts。
 * @returns {Promise<{ id: string, title: string }[]>}
 */
export async function loader() {
  return getItems();
}

/** 這一頁的元件。 */
export default function TripList() {
  /**
   * 讀取這個路由模組 loader 的回傳值。
   * @returns {{ id: string, title: string }[]}
   */
  const items = useLoaderData();

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

**解析**

- 框架在進入 `/trips` 之前呼叫這個模組匯出的 `loader`，`useLoaderData()` 拿到的就是 `getItems()` 的陣列。
- 也可以改用 `Route.ComponentProps` 的 `loaderData` 屬性接同一份結果。這一則用 hook，和資料模式的清單頁同一種讀法。
- `action`、`Form`、`redirect` 與 `errorElement` 的寫法見「讀取與送出資料」。

### 怎麼選

三種接法都能把網址對上元件。差別在路由表放在哪一個檔、入口由誰掛上，以及資料在進頁前讀還是等頁面掛上再讀。

| | 資料模式 | 宣告式 | 框架模式 |
| --- | --- | --- | --- |
| 路由設定寫在哪個檔 | `src/App.jsx` 的路由物件 | `src/App.jsx` 的 `Routes` | `app/routes.ts` |
| 入口 | `main.jsx` 渲染 `App`，由 `RouterProvider` 掛上 | `main.jsx` 以 `BrowserRouter` 包住 `App` | Vite 插件 `reactRouter()`，不自寫入口 |
| 資料何時讀 | 進頁前，`loader` | 頁面掛上後，`useEffect` | 進頁前，路由模組的 `loader` |
| loader / action | 有 | 沒有 | 有，寫在路由模組 |
| ScrollRestoration | 有，放在根版型 | 沒有官方元件 | 有，放在 `root.tsx` |
| 適合 | 課堂與後面的練習 | 薄寫法的對照 | 插件、路由模組與 SSR／SEO |

課堂和後面的 `04-react-router`（從 `03-react` 複製）都用資料模式，不為另外兩種各開一個專案。宣告式寫起來較薄，但沒有官方的 `ScrollRestoration`，也沒有 `loader` 與 `action`；要把 Vite 插件、路由模組與伺服器端渲染當成一整套架構時，再看框架模式或 Next.js。路由與連結接好之後，`loader` 與 `action` 寫在「讀取與送出資料」。

# 啟用路由

這一章起，練習都在 `04-react-router`。先把 `03-react` 複製成這份，清掉舊的依賴再安裝，然後裝上 `react-router`，在 `App.jsx` 用 `createBrowserRouter` 與 `RouterProvider` 接上路由器。`main.jsx` 不用包 `BrowserRouter`。後面在同一份裡把按鈕切換改成路由表、左側目錄與各則筆記的網址。

## 安裝與入口

`04-react-router` 的起點就是 `03-react` 的成品：同一套 Vite、React 19 與示範元件。這一節只做複製、安裝，並在 `App.jsx` 接上路由器。`main.jsx` 維持直接渲染 `App`。路由表、版型與目錄在後面幾節接到同一份專案。

### 步驟 1：複製專案

在 `studiesAdvanced` 倉庫根目錄，把 `03-react` 整份複製成 `04-react-router`。Node、nvs 與 pnpm 前面幾天已經裝過，這裡不要重裝。目的資料夾還不存在時才複製；已經有這份時，跳過複製，從下一步清依賴開始。

macOS（終端機在倉庫根目錄）：

```bash
cp -R 03-react 04-react-router
```

**解析**

- 這是在 macOS 把 `03-react` 整份複製成 `04-react-router`。目的資料夾還不存在時才執行。

Windows（PowerShell，同樣在倉庫根目錄）：

```powershell
Copy-Item -Recurse 03-react 04-react-router
```

**解析**

- 這是同一道複製在 PowerShell 的寫法。

複製完成後，打開 `04-react-router/package.json`，把 `name` 改成資料夾名稱。依賴先維持複製過來的 React 19，路由套件下一步再加。

```json
{
  "name": "04-react-router"
}
```

**解析**

- 把 `name` 改成與資料夾相同的 `04-react-router`。依賴先維持複製過來的內容，路由套件下一步再加。

{% note info %}
**資料夾已經在倉庫裡**
課堂倉庫的 `04-react-router` 就是這篇的練習專案，起點與 `03-react` 的成品相同，後面各節的示範檔也已經在裡面。此時不要再複製一次：macOS 的 `cp -R` 會把來源嵌進既有資料夾。直接做下一步。
{% endnote %}

### 步驟 2：清掉依賴再安裝

`node_modules` 與 `dist` 是這一台電腦裝出來、建出來的結果，不要跟著複製帶走。先刪掉這兩個資料夾，再在 `04-react-router` 裡重新 `pnpm install`，依賴才會對上這份 `package.json` 與鎖定檔。

macOS：

```bash
rm -rf 04-react-router/node_modules 04-react-router/dist
cd 04-react-router
pnpm install
```

**解析**

- 刪掉複製過來的 `node_modules` 與 `dist`，再於 `04-react-router` 重新安裝依賴。

Windows（PowerShell）：

```powershell
Remove-Item -Recurse -Force 04-react-router\node_modules, 04-react-router\dist -ErrorAction SilentlyContinue
cd 04-react-router
pnpm install
```

**解析**

- 這是同一道清理與安裝在 PowerShell 的寫法。

{% note info %}
**已安裝過可跳過**
這兩個資料夾本來就不在，或你已經在 `04-react-router` 成功跑過 `pnpm install`，就不必為了重跑再刪一次。
{% endnote %}

### 步驟 3：安裝路由套件

終端機停在 `04-react-router`（上一步若已 `cd` 進去就不用再換）。用 pnpm 加上路由套件 8，React 維持 19。裝完後 `package.json` 的 `dependencies` 會出現 `react-router`，後面的 `import` 才找得到套件。

```bash
pnpm add react-router@8
```

**解析**

- 裝上 `react-router` 8 之後，`package.json` 的 `dependencies` 會出現這個套件，後面的 `import` 才找得到它。

{% note info %}
**已有 react-router 8 可跳過**
倉庫這份的 `package.json` 已經寫入 `react-router` 8。你的專案裡若看得到這個依賴，確認版本即可，不必再裝一次。
{% endnote %}

### 步驟 4：createBrowserRouter

複製過來的 `src/main.jsx` 與 `03-react` 相同，嚴格模式裡直接渲染 `App`。資料模式不是在入口包一層 `BrowserRouter`，而是建立路由器物件，再交給 `RouterProvider`。這份專案把路由器寫在 `App.jsx`，`main.jsx` 不用改。

```jsx
/**
 * 建立使用 History API 的路由器。路由表是物件陣列。
 * @param {object[]} routes 每一筆含 path、index、element、children
 * @param {object} [opts]
 * @param {string} [opts.basename] 基底路徑。開發時由 BASE_URL 去掉結尾斜線
 * @returns {object} 路由器物件
 */
const router = createBrowserRouter(routes, { basename });

/**
 * 把路由器畫出來。由 App 回傳，入口不再包一層。
 * @param {object} props
 * @param {object} props.router createBrowserRouter 的回傳值
 * @returns {React.ReactElement}
 */
const view = <RouterProvider router={router} />;
```

**解析**

- 路由陣列交給 `createBrowserRouter`，回傳的物件再交給 `RouterProvider`。
- 這個物件寫在元件函式外面，由 `App` 回傳 `RouterProvider`，入口不必再包一層。

**觀念**

`createBrowserRouter` 使用瀏覽器的 History API。網址是一般路徑，例如 `/items`，不是井字號後面的片段。會讀網址的元件要畫在 `RouterProvider` 裡面，所以路由器放在 `App`，`main.jsx` 只負責把 `App` 掛上 `#root`。開發伺服器已經會把未知路徑回傳同一份 `index.html`，重新整理子路徑也不會變成找不到檔案。`basename` 是 `createBrowserRouter` 的第二個參數，值用 Vite 的 `BASE_URL` 去掉結尾斜線。開發時 `BASE_URL` 預設是 `/`，去掉之後與從網站根目錄算起相同。子路徑怎麼跟著 `base` 變，留到部署那一節。

```jsx 04-react-router/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**解析**

- 這份入口與 `03-react` 相同，嚴格模式裡直接渲染 `App`。
- 沒有包 `BrowserRouter`。路由器寫在下面的 `App.jsx` 草稿，路由表下一節再補。
- 樣式仍由 `index.css` 引入。嚴格模式不取代路由，也不會幫你對路徑。

下面是接上路由器的草稿，路由表下一節再換成版型與首頁。畫面應出現「路由已經接上」。

```jsx 04-react-router/src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router';

/**
 * 路由器先接上。路由表下一節再寫進這個陣列。
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createBrowserRouter(
  [{ path: '/', element: <p>路由已經接上</p> }],
  { basename },
);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- `createBrowserRouter` 與 `RouterProvider` 都從 `react-router` 引入。
- 第二個參數的 `basename` 用 `BASE_URL` 去掉結尾斜線。開發時效果與從網站根目錄算起相同。
- 這一則的 `element` 只是一句話，用來確認路由器有畫出來。下一節改成版型與首頁。

## 路由表與版型

複製過來的 `App` 仍用按鈕在示範之間切換。這一節改成路由表與共用版型，讓網址 `/` 畫出左側外框與首頁總覽。單則筆記、搜尋與找不到的頁面都沿用這兩個檔，後面再補進同一張表。

**一覽**

- 路由表是物件陣列，交給 `createBrowserRouter`。它比較目前網址，用第一筆對上的路由。
- 每一筆用 `path` 對路徑、用 `element` 指定要畫的元素。`index: true` 表示跟父路徑同一個網址，這一筆只留 `index` 與 `element`。
- `children` 是子路由。寫在父路由裡，才會畫進版型的 `Outlet`。
- `Outlet` 是版型裡子路由出現的位置。畫什麼由路由表決定。

{% mermaid graph LR %}
  urlNode["網址 /"] --> tableNode["路由物件"]
  tableNode --> layoutNode["MainLayout"]
  layoutNode --> menuNode["左側目錄"]
  layoutNode --> slotNode["Outlet 主區"]
  style urlNode fill:#e3f2fd
  style tableNode fill:#fff3e0
  style layoutNode fill:#e3f2fd
  style menuNode fill:#e8f5e9
  style slotNode fill:#e8f5e9
{% endmermaid %}

### 路由表

路由表集中在 `src/App.jsx`，用物件陣列交給 `createBrowserRouter`。父路由的 `path` 是 `/`，`element` 是版型；`index: true` 那一筆跟父路徑同一個網址，所以打開網站根目錄時，版型中間是首頁。後面的單則筆記會寫成 `demos/:slug`，跟父路徑接成 `/demos/01-hello` 這種網址。`slug` 與範例檔名去掉 `.jsx` 相同。上一節的草稿整份換成下面這份。

**語法**

```jsx
/**
 * 父路由。path 是網址，element 是要畫的元素，children 畫進版型的 Outlet。
 * @type {{ path: string, element: React.ReactElement, children: object[] }}
 */
const layoutRoute = {
  path: '/',
  element: <MainLayout />,
  children: [],
};

/**
 * 跟父路徑同一個網址的那一筆。index 為 true 時不寫 path。
 * @type {{ index: true, element: React.ReactElement }}
 */
const indexRoute = { index: true, element: <Home /> };
```

**解析**

- `path` 對路徑，`element` 指定要畫的元素。`index: true` 跟父路徑同一個網址。
- `children` 寫在父路由裡，才會畫進版型的 `Outlet`。

**觀念**

這種寫在父路由 `children` 裡的做法是巢狀路由：外層負責一直留在畫面上的版型，內層負責換掉的那一頁。`element` 傳入的是已經建立的元素，例如 `<Home />`。路徑用小寫，根路徑寫成斜線。`basename` 仍是第二個參數，開發時與從網站根目錄算起相同。

```jsx 04-react-router/src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';

/**
 * 路由表。父路由畫版型，index 在同一個網址畫首頁。
 * 子路由寫在父路由的 children 裡，才會畫進版型的 Outlet。
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
], { basename });

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- 路由表是陣列，交給 `createBrowserRouter`，再由 `RouterProvider` 渲染。
- 父路由的 `path` 是 `/`，`element` 是版型。`children` 裡 `index: true` 的那筆跟父路徑同一個網址，打開 `/` 時主區是 `Home`。
- `basename` 來自 Vite 的 `BASE_URL`。開發時預設是 `/`，去掉結尾斜線後，路徑仍從網站根目錄算起。
- 打開 `/` 時，畫面分成版型與首頁兩塊。別的路徑目前還沒有對應的頁，主區是空的。

{% note success %}
**換你試試：**
把首頁那筆暫時改成一段文字，確認主區出現「總覽」兩個字。看完改回 `Home`，後面的總覽仍用頁面元件。
{% endnote %}

<details>
<summary>參考答案</summary>

`element` 可以是任何元素。這則只為了看主區換字，看完請改回首頁元件。

```diff 04-react-router/src/App.jsx
 // ...
-      { index: true, element: <Home /> },
+      { index: true, element: <p>總覽</p> },
 // ...
```

</details>

### 版型

版型負責左側與主區的外框，每一頁都共用。`Outlet` 不決定要畫哪一頁，它只留下子路由出現的位置。沒有它時，路由即使對上了，主區仍是空的。

**語法**

```jsx
/**
 * 子路由畫出來的位置。畫什麼由路由表決定。
 * @returns {React.ReactElement|null}
 */
const slot = <Outlet />;
```

**解析**

- `Outlet` 是子路由出現的位置。版型自己不決定要畫哪一頁。

**觀念**

左側這一則先放站名，目錄下一節再接上。主區的寬度與背景放在版型，各頁就沿用同一套。網址已經說明現在是哪一頁，版型不用再拿狀態去猜。

```jsx 04-react-router/src/layouts/MainLayout.jsx
import { Outlet } from 'react-router';

/**
 * 全站共用的外框。左側先留目錄的位置，右側 Outlet 是子路由的主區。
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 md:grid md:grid-cols-[18rem_1fr]">
      <aside className="border-b border-stone-200 bg-white md:min-h-screen md:border-r md:border-b-0">
        <div className="px-4 py-4 md:sticky md:top-0 md:max-h-screen md:overflow-y-auto">
          <span className="font-semibold">練習筆記</span>
        </div>
      </aside>
      <main className="px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
```

**解析**

- `Outlet` 畫在 `main` 裡。子路由對上之後，頁面出現在這個位置，左側外框留著。
- 寬螢幕時左側是一欄、右側是主區。窄螢幕時目錄在上、主區在下。
- 站名這一則還是文字，連結下一章再換。

{% note success %}
**換你試試：**
在 `Outlet` 上面加一行「主區」。首頁標題仍應出現在這行下面。看完拿掉這一行，後面的版型不再留它。
{% endnote %}

<details>
<summary>參考答案</summary>

那一行屬於版型，每一頁都會看到。首頁元件不用改。看完刪掉這一行。

```diff 04-react-router/src/layouts/MainLayout.jsx
 // ...
       <main className="px-4 py-6">
+        <p className="mb-3 text-sm text-stone-500">主區</p>
         <Outlet />
 // ...
```

</details>

換頁時要捲到頂部，按瀏覽器上一頁或下一頁時要回到當時的位置。資料模式提供官方的 `ScrollRestoration`，放在版型裡、與 `Outlet` 同層，不必自己寫 `window.scrollTo`。宣告式沒有這個元件。

```diff 04-react-router/src/layouts/MainLayout.jsx
-import { Outlet } from 'react-router';
+import { Outlet, ScrollRestoration } from 'react-router';
 // ...
       <main className="px-4 py-6">
         <Outlet />
       </main>
+      <ScrollRestoration />
     </div>
 // ...
```

**解析**

- `ScrollRestoration` 與 `Outlet` 同層，放在外層 `div` 裡、`main` 之後。
- 用連結或 `navigate` 換頁時，視窗捲到頂部。
- 按瀏覽器上一頁或下一頁時，還原離開那一頁之前的捲動位置。

### 首頁總覽

首頁是打開網站時的第一眼，用來說明這份筆記站在做什麼。目錄的則數與主題下一節才從資料算出來，這一則先把總覽的句子放上。

**語法**

```jsx
/**
 * 跟父路徑同一個網址的那一筆。index 為 true 時對上父路由自己的網址。
 * @type {{ index: true, element: React.ReactElement }}
 */
const homeRoute = { index: true, element: <Home /> };
```

**解析**

- 打開網站根目錄時，版型中間畫的是這個首頁元件。

**觀念**

首頁元件只負責主區的標題與說明。左側的站名來自版型，所以總覽出現時，外框已經在了。重新整理仍停在 `/`，因為現在這一頁有自己的網址。

```jsx 04-react-router/src/pages/Home.jsx
/**
 * 筆記總覽。這一則先放標題與說明，目錄與連結下一節再接上。
 */
export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold">練習筆記</h1>
      <p className="mt-2 max-w-xl">
        前兩天用按鈕在示範之間切換。從這裡開始，主區先放總覽，左側稍後接上目錄。
      </p>
    </section>
  );
}
```

**解析**

- 打開 `/`，左側是「練習筆記」，主區是標題與那一句說明。
- 重新整理仍停在 `/`，因為這一頁已經有自己的網址。

{% note success %}
**換你試試：**
把主區標題改成「筆記總覽」。版型上的站名留著。
{% endnote %}

<details>
<summary>參考答案</summary>

標題在首頁元件。版型的站名是另一行。

```diff 04-react-router/src/pages/Home.jsx
 // ...
-      <h1 className="text-2xl font-bold">練習筆記</h1>
+      <h1 className="text-2xl font-bold">筆記總覽</h1>
 // ...
```

</details>

## 示範目錄

目錄是這份筆記網站的清單。主題順序與每一則的 slug、標題、元件都放在同一份資料，左側選單與首頁總覽都讀它，換一則的標題時只改這一處。

**一覽**

- `topics` 是主題。每一筆有 `id` 與畫在畫面上的 `title`，陣列順序就是左側由上到下的順序。
- `demos` 是單則筆記。`slug` 是範例檔名去掉 `.jsx`，與路徑 `/demos/:slug` 相同，`topic` 對到某個主題的 `id`，`Component` 是該則要畫出的元件。

**語法**

```jsx
/**
 * 一則筆記在目錄裡的資料。
 * @typedef {object} DemoRecord
 * @property {string} slug 檔名去掉 .jsx，與路徑 /demos/:slug 相同
 * @property {string} title 畫在目錄上的標題
 * @property {string} topic 主題 id，對到 topics 裡的某一筆
 * @property {React.ComponentType} Component 該則要畫出的元件
 */
```

**解析**

- 每一則筆記用 `slug`、`title`、`topic` 與 `Component` 描述，之後目錄與總覽都讀這些欄位。

**觀念**

分組跟著編號走：同一段編號共用一個主題，左側才會一段接一段，上一則與下一則也才跟上課順序相同。這一則先把 slug 與標題印出來，點了還不會換頁；連結、路徑與搜尋都在後面加上。首頁改為讀同一份資料，主區的則數與主題名稱就跟左側一致。

```js 04-react-router/src/data/catalog.js
/**
 * 練習筆記的目錄。左側選單與單則頁面都讀這一份。
 * topics 是主題的順序與標題。demos 每一筆的 slug 與路徑 /demos/:slug 相同，topic 對到 topics 的 id，Component 是該則要畫的元件。
 */
import Hello from '../examples/01-hello.jsx';
import ExprDemo from '../examples/02-expr.jsx';
import DownDemo from '../examples/03-down.jsx';
import TreeDemo from '../examples/04-tree.jsx';
import PlaceDemo from '../examples/05-place.jsx';
import FragmentDemo from '../examples/06-fragment.jsx';
import StyleDemo from '../examples/07-style.jsx';
import ClassDemo from '../examples/08-class.jsx';
import EarlyDemo from '../examples/09-early.jsx';
import TernaryDemo from '../examples/10-ternary.jsx';
import AndDemo from '../examples/11-and.jsx';
import ZeroDemo from '../examples/12-zero.jsx';
import OrDemo from '../examples/13-or.jsx';
import NullishDemo from '../examples/14-nullish.jsx';
import CardDemo from '../examples/15-card.jsx';
import BoardDemo from '../examples/16-board.jsx';
import PropsDemo from '../examples/17-props.jsx';
import DefaultsDemo from '../examples/18-defaults.jsx';
import CallbackDemo from '../examples/19-callback.jsx';
import ChildrenDemo from '../examples/20-children.jsx';
import CountDemo from '../examples/21-state.jsx';
import MultiDemo from '../examples/22-multi.jsx';
import SnapshotDemo from '../examples/23-snapshot.jsx';
import UpdaterDemo from '../examples/24-updater.jsx';
import BatchDemo from '../examples/25-batch.jsx';
import RulesDemo from '../examples/26-rules.jsx';
import AddDemo from '../examples/27-add.jsx';
import RemoveDemo from '../examples/28-remove.jsx';
import EditDemo from '../examples/29-edit.jsx';
import ObjectDemo from '../examples/30-object.jsx';
import NestedDemo from '../examples/31-nested.jsx';
import EventDemo from '../examples/32-event.jsx';
import TargetDemo from '../examples/33-target.jsx';
import PickDemo from '../examples/34-pick.jsx';
import PreventDemo from '../examples/35-prevent.jsx';
import MapDemo from '../examples/36-map.jsx';
import FilterDemo from '../examples/37-filter.jsx';
import EmptyDemo from '../examples/38-empty.jsx';
import KeyDemo from '../examples/39-key.jsx';
import InputDemo from '../examples/40-input.jsx';
import AreaDemo from '../examples/41-area.jsx';
import SelectDemo from '../examples/42-select.jsx';
import CheckDemo from '../examples/43-check.jsx';
import RadioDemo from '../examples/44-radio.jsx';
import FieldsDemo from '../examples/45-fields.jsx';
import SubmitDemo from '../examples/46-submit.jsx';
import UseIdDemo from '../examples/47-useid.jsx';
import EffectMount from '../examples/48-effect.jsx';
import DepsDemo from '../examples/49-deps.jsx';
import TimerDemo from '../examples/50-timer.jsx';
import LoopDemo from '../examples/51-loop.jsx';
import LintDemo from '../examples/52-lint.jsx';
import LoadDemo from '../examples/53-load.jsx';
import EmptyLoadDemo from '../examples/54-empty.jsx';
import AbortDemo from '../examples/55-abort.jsx';
import GetDemo from '../examples/56-get.jsx';
import PostDemo from '../examples/57-post.jsx';
import PutDemo from '../examples/58-put.jsx';
import DeleteDemo from '../examples/59-delete.jsx';
import ItemsDemo from '../examples/60-items-demo.jsx';
import DeriveDemo from '../examples/61-derive.jsx';
import ClickFetchDemo from '../examples/62-click.jsx';
import HookDemo from '../examples/63-hook.jsx';
import ToggleDemo from '../examples/64-toggle.jsx';
import FilterHookDemo from '../examples/65-filter.jsx';
import TwiceDemo from '../examples/66-twice.jsx';
import LiftDemo from '../examples/67-lift.jsx';
import SiblingsDemo from '../examples/68-siblings.jsx';
import DrillDemo from '../examples/69-drill.jsx';
import ContextDemo from '../examples/70-context.jsx';
import ContextSplitDemo from '../examples/71-contextDemo/index.jsx';
import DefaultDemo from '../examples/72-default.jsx';
import MemoDemo from '../examples/73-memo.jsx';
import MemoComponentDemo from '../examples/74-memo-component.jsx';
import UseCallbackDemo from '../examples/75-callback.jsx';
import RefDemo from '../examples/76-ref.jsx';
import RefCountDemo from '../examples/77-ref-count.jsx';
import ReducerCountDemo from '../examples/78-reducer-count.jsx';
import ReducerStateDemo from '../examples/79-reducer-state.jsx';
import ReducerDemo from '../examples/80-reducer.jsx';
import TodoPropsDemo from '../examples/81-propsDemo/index.jsx';
import ProviderDemo from '../examples/82-providerDemo/index.jsx';
import ActionDemo from '../examples/83-action.jsx';
import ActionStateDemo from '../examples/84-action-state.jsx';
import OptimisticDemo from '../examples/85-optimistic.jsx';
import LoaderDemo from '../examples/86-loader.jsx';
import FormActionDemo from '../examples/87-action.jsx';
import RedirectList from '../examples/88-redirect-list.jsx';
import ErrorElementDemo from '../examples/89-error-element.jsx';
import FetcherDemo from '../examples/90-fetcher.jsx';
import NavigationDemo from '../examples/91-navigation.jsx';

export const topics = [
  { id: 'component', title: '元件' },
  { id: 'jsx', title: 'JSX 與條件' },
  { id: 'module', title: '模組與 props' },
  { id: 'state', title: '狀態' },
  { id: 'event', title: '事件' },
  { id: 'list', title: '列表與表單' },
  { id: 'effect', title: 'Effect 與資料' },
  { id: 'share', title: '共用狀態' },
  { id: 'more', title: 'Ref、Reducer 與 Actions' },
  { id: 'data', title: '資料模式' },
];

export const demos = [
  { slug: '01-hello', title: '函式元件', topic: 'component', Component: Hello },
  { slug: '02-expr', title: '表達式', topic: 'component', Component: ExprDemo },
  {
    slug: '03-down',
    title: '由父層傳入',
    topic: 'component',
    Component: DownDemo,
  },
  {
    slug: '04-tree',
    title: '拆分元件',
    topic: 'component',
    Component: TreeDemo,
  },
  {
    slug: '05-place',
    title: '狀態的位置',
    topic: 'component',
    Component: PlaceDemo,
  },
  {
    slug: '06-fragment',
    title: 'Fragment',
    topic: 'jsx',
    Component: FragmentDemo,
  },
  { slug: '07-style', title: 'style 物件', topic: 'jsx', Component: StyleDemo },
  { slug: '08-class', title: 'className', topic: 'jsx', Component: ClassDemo },
  {
    slug: '09-early',
    title: '提早 return',
    topic: 'jsx',
    Component: EarlyDemo,
  },
  {
    slug: '10-ternary',
    title: '三元運算子',
    topic: 'jsx',
    Component: TernaryDemo,
  },
  { slug: '11-and', title: '邏輯且', topic: 'jsx', Component: AndDemo },
  { slug: '12-zero', title: '數字 0', topic: 'jsx', Component: ZeroDemo },
  { slug: '13-or', title: '邏輯或', topic: 'jsx', Component: OrDemo },
  {
    slug: '14-nullish',
    title: '空值合併',
    topic: 'jsx',
    Component: NullishDemo,
  },
  {
    slug: '15-card',
    title: 'default export',
    topic: 'module',
    Component: CardDemo,
  },
  {
    slug: '16-board',
    title: 'named export',
    topic: 'module',
    Component: BoardDemo,
  },
  { slug: '17-props', title: '解構', topic: 'module', Component: PropsDemo },
  {
    slug: '18-defaults',
    title: '預設值',
    topic: 'module',
    Component: DefaultsDemo,
  },
  {
    slug: '19-callback',
    title: '函式型 props',
    topic: 'module',
    Component: CallbackDemo,
  },
  {
    slug: '20-children',
    title: 'children',
    topic: 'module',
    Component: ChildrenDemo,
  },
  { slug: '21-state', title: '宣告狀態', topic: 'state', Component: CountDemo },
  { slug: '22-multi', title: '多個狀態', topic: 'state', Component: MultiDemo },
  {
    slug: '23-snapshot',
    title: '狀態快照：只加一',
    topic: 'state',
    Component: SnapshotDemo,
  },
  {
    slug: '24-updater',
    title: '更新函式：加二',
    topic: 'state',
    Component: UpdaterDemo,
  },
  { slug: '25-batch', title: '批次更新', topic: 'state', Component: BatchDemo },
  {
    slug: '26-rules',
    title: 'Hooks 規則',
    topic: 'state',
    Component: RulesDemo,
  },
  { slug: '27-add', title: '陣列新增', topic: 'state', Component: AddDemo },
  {
    slug: '28-remove',
    title: '陣列刪除',
    topic: 'state',
    Component: RemoveDemo,
  },
  { slug: '29-edit', title: '陣列修改', topic: 'state', Component: EditDemo },
  {
    slug: '30-object',
    title: '物件欄位',
    topic: 'state',
    Component: ObjectDemo,
  },
  {
    slug: '31-nested',
    title: '巢狀物件',
    topic: 'state',
    Component: NestedDemo,
  },
  { slug: '32-event', title: '命名慣例', topic: 'event', Component: EventDemo },
  {
    slug: '33-target',
    title: '事件物件',
    topic: 'event',
    Component: TargetDemo,
  },
  { slug: '34-pick', title: '帶參數', topic: 'event', Component: PickDemo },
  {
    slug: '35-prevent',
    title: 'preventDefault',
    topic: 'event',
    Component: PreventDemo,
  },
  { slug: '36-map', title: 'map', topic: 'list', Component: MapDemo },
  { slug: '37-filter', title: 'filter', topic: 'list', Component: FilterDemo },
  { slug: '38-empty', title: '空清單', topic: 'list', Component: EmptyDemo },
  { slug: '39-key', title: 'key', topic: 'list', Component: KeyDemo },
  { slug: '40-input', title: 'input', topic: 'list', Component: InputDemo },
  { slug: '41-area', title: 'textarea', topic: 'list', Component: AreaDemo },
  { slug: '42-select', title: 'select', topic: 'list', Component: SelectDemo },
  { slug: '43-check', title: 'checkbox', topic: 'list', Component: CheckDemo },
  { slug: '44-radio', title: 'radio', topic: 'list', Component: RadioDemo },
  {
    slug: '45-fields',
    title: '多欄位物件',
    topic: 'list',
    Component: FieldsDemo,
  },
  { slug: '46-submit', title: 'submit', topic: 'list', Component: SubmitDemo },
  { slug: '47-useid', title: 'useId', topic: 'list', Component: UseIdDemo },
  {
    slug: '48-effect',
    title: '第一次執行',
    topic: 'effect',
    Component: EffectMount,
  },
  { slug: '49-deps', title: '依賴陣列', topic: 'effect', Component: DepsDemo },
  {
    slug: '50-timer',
    title: '清除函式',
    topic: 'effect',
    Component: TimerDemo,
  },
  { slug: '51-loop', title: '無限迴圈', topic: 'effect', Component: LoopDemo },
  { slug: '52-lint', title: '漏寫依賴', topic: 'effect', Component: LintDemo },
  {
    slug: '53-load',
    title: '載入與錯誤',
    topic: 'effect',
    Component: LoadDemo,
  },
  {
    slug: '54-empty',
    title: '空資料',
    topic: 'effect',
    Component: EmptyLoadDemo,
  },
  {
    slug: '55-abort',
    title: 'AbortController',
    topic: 'effect',
    Component: AbortDemo,
  },
  { slug: '56-get', title: 'GET', topic: 'effect', Component: GetDemo },
  { slug: '57-post', title: 'POST', topic: 'effect', Component: PostDemo },
  { slug: '58-put', title: 'PUT', topic: 'effect', Component: PutDemo },
  {
    slug: '59-delete',
    title: 'DELETE',
    topic: 'effect',
    Component: DeleteDemo,
  },
  {
    slug: '60-items-demo',
    title: 'API 模組',
    topic: 'effect',
    Component: ItemsDemo,
  },
  {
    slug: '61-derive',
    title: '渲染時計算',
    topic: 'effect',
    Component: DeriveDemo,
  },
  {
    slug: '62-click',
    title: '事件裡的請求',
    topic: 'effect',
    Component: ClickFetchDemo,
  },
  { slug: '63-hook', title: '抽出讀取', topic: 'effect', Component: HookDemo },
  {
    slug: '64-toggle',
    title: '傳入引數',
    topic: 'effect',
    Component: ToggleDemo,
  },
  {
    slug: '65-filter',
    title: '引數放進依賴',
    topic: 'effect',
    Component: FilterHookDemo,
  },
  {
    slug: '66-twice',
    title: '各呼叫各一份狀態',
    topic: 'share',
    Component: TwiceDemo,
  },
  { slug: '67-lift', title: '父層持有', topic: 'share', Component: LiftDemo },
  {
    slug: '68-siblings',
    title: '兄弟元件',
    topic: 'share',
    Component: SiblingsDemo,
  },
  { slug: '69-drill', title: '層層傳遞', topic: 'share', Component: DrillDemo },
  {
    slug: '70-context',
    title: '用 Context 改善',
    topic: 'share',
    Component: ContextDemo,
  },
  {
    slug: '71-contextDemo',
    title: '拆成多個檔案',
    topic: 'share',
    Component: ContextSplitDemo,
  },
  {
    slug: '72-default',
    title: '預設值',
    topic: 'share',
    Component: DefaultDemo,
  },
  { slug: '73-memo', title: 'useMemo', topic: 'share', Component: MemoDemo },
  {
    slug: '74-memo-component',
    title: 'memo',
    topic: 'share',
    Component: MemoComponentDemo,
  },
  {
    slug: '75-callback',
    title: 'useCallback',
    topic: 'share',
    Component: UseCallbackDemo,
  },
  { slug: '76-ref', title: '聚焦輸入框', topic: 'more', Component: RefDemo },
  {
    slug: '77-ref-count',
    title: '不觸發渲染的值',
    topic: 'more',
    Component: RefCountDemo,
  },
  {
    slug: '78-reducer-count',
    title: '計數（useReducer）',
    topic: 'more',
    Component: ReducerCountDemo,
  },
  {
    slug: '79-reducer-state',
    title: '待辦（useState）',
    topic: 'more',
    Component: ReducerStateDemo,
  },
  {
    slug: '80-reducer',
    title: '待辦（useReducer）',
    topic: 'more',
    Component: ReducerDemo,
  },
  {
    slug: '81-propsDemo',
    title: '拆成元件用 props',
    topic: 'more',
    Component: TodoPropsDemo,
  },
  {
    slug: '82-providerDemo',
    title: '改用 Context',
    topic: 'more',
    Component: ProviderDemo,
  },
  {
    slug: '83-action',
    title: 'form action',
    topic: 'more',
    Component: ActionDemo,
  },
  {
    slug: '84-action-state',
    title: 'useActionState',
    topic: 'more',
    Component: ActionStateDemo,
  },
  {
    slug: '85-optimistic',
    title: 'useOptimistic',
    topic: 'more',
    Component: OptimisticDemo,
  },
  {
    slug: '86-loader',
    title: 'loader 讀資料',
    topic: 'data',
    Component: LoaderDemo,
  },
  {
    slug: '87-action',
    title: 'action 與 Form',
    topic: 'data',
    Component: FormActionDemo,
  },
  {
    slug: '88-redirect-list',
    title: '送出後轉址',
    topic: 'data',
    Component: RedirectList,
  },
  {
    slug: '89-error-element',
    title: 'errorElement',
    topic: 'data',
    Component: ErrorElementDemo,
  },
  {
    slug: '90-fetcher',
    title: 'fetcher 不換頁',
    topic: 'data',
    Component: FetcherDemo,
  },
  {
    slug: '91-navigation',
    title: 'useNavigation',
    topic: 'data',
    Component: NavigationDemo,
  },
];
```

**解析**

- `topics` 與 `demos` 都寫在這一份資料裡。`slug` 等於範例檔名去掉 `.jsx`，與路徑 `/demos/:slug` 相同。
- 換一則的標題或主題名稱時，只改這裡；左側目錄與首頁總覽都讀同一份。

```jsx 04-react-router/src/pages/DemoList.jsx
import { demos, topics } from '../data/catalog.js';

/**
 * 左側目錄。topics 決定分組順序，同一主題的示範排在該組下面。
 * 這一則先印出 slug 與標題。
 */
export default function DemoList() {
  return (
    <div className="mt-4 grid gap-4">
      {topics.map((topic) => {
        const items = demos.filter((demo) => demo.topic === topic.id);
        return (
          <section key={topic.id}>
            <h2 className="text-xs font-semibold tracking-wide text-stone-500">
              {topic.title}
            </h2>
            <ul className="mt-1 grid">
              {items.map((demo) => (
                <li key={demo.slug} className="px-2 py-1 text-sm">
                  {demo.slug} {demo.title}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
```

**解析**

- 目錄依 `topics` 的順序分組，每一則列出 `slug` 與標題。這一則先印出來，點了還不會換頁。

目錄放進版型的左側，首頁改成讀同一份主題與則數。

```diff 04-react-router/src/layouts/MainLayout.jsx
 import { Outlet, ScrollRestoration } from 'react-router';
+import DemoList from '../pages/DemoList.jsx';
 // ...
           <span className="font-semibold">練習筆記</span>
+          <DemoList />
 // ...
```

**解析**

- 目錄元件掛在版型左側、站名下面。每一頁共用同一份側欄。

```jsx 04-react-router/src/pages/Home.jsx
import { demos, topics } from '../data/catalog.js';

/**
 * 筆記總覽。主題與則數來自目錄資料，主區先列出有哪些主題。
 */
export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold">練習筆記</h1>
      <p className="mt-2 max-w-xl">
        左側目錄列出前兩天的示範，並依主題分成幾組。這一頁把則數與主題名稱放在主區。
      </p>
      <p className="mt-4">
        共 {demos.length} 則，分成 {topics.length} 個主題。
      </p>
      <ul className="mt-4 grid gap-1">
        {topics.map((topic) => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
    </section>
  );
}
```

**解析**

- 重新整理 `/`，左側每個主題下面是該組的 slug 與標題，主區寫出則數，並依同樣的順序列出主題名稱。
- 左側與主區都讀 `catalog.js`，改一處標題兩側會一起變。

{% note success %}
**換你試試：**
把主題「元件」的標題改成「元件基礎」。左側第一組與主區清單應一起改名。
{% endnote %}

<details>
<summary>參考答案</summary>

標題只寫在 `topics`。`demos` 用 `topic: 'component'` 對組，不用改每一則。

```diff 04-react-router/src/data/catalog.js
 // ...
-  { id: 'component', title: '元件' },
+  { id: 'component', title: '元件基礎' },
 // ...
```

</details>

# 連結與選單

目錄上的文字要能換頁，而且要看得出現在停在哪一則。一般換頁用 `Link`，選單用 `NavLink` 多拿一個是否為目前頁的旗標。單則網址、上一則與下一則、目錄搜尋都接在同一份筆記網站上。

## 連結

一般的 `<a href>` 點下去，瀏覽器會向伺服器重新要整頁，畫面上的狀態全部清掉。`Link` 看起來一樣是連結，點了只換網址，React Router 依新網址換掉對應的那一塊畫面，其餘不動。`NavLink` 是多一個功能的 `Link`：它知道自己是不是目前所在的頁，是的話自動加上 `active` class。分法很簡單：要依「是不是目前頁」換樣式的連結（選單、分頁）用 `NavLink`，其他一般連結都用 `Link`。所以首頁的「從第一則開始」用 `Link`，左側每一則與站名用 `NavLink`。點了首頁的 `Link` 進到 `/demos/01-hello` 後，左側對應的那一則會自動變成 active：`NavLink` 看的是目前網址，不管你從哪裡點進來。

**一覽**

- `Link` 的 `to` 是目標路徑。它渲染成 `<a>`，點擊推進瀏覽器歷史，對上的元件換掉。
- `NavLink` 同樣用 `to` 換頁。`className` 可以是函式，參數裡的 `isActive` 為真時表示這一條對上目前網址。
- `end` 要求路徑完全符合。站名連到 `/` 時要加上，否則停在 `/demos/01-hello` 時首頁那一條也會算成使用中。

{% mermaid graph LR %}
  clickNode["點選單"] --> linkNode["NavLink 改網址"]
  linkNode --> matchNode["路由表對上該則"]
  matchNode --> flagNode["isActive 標出目前頁"]
  style clickNode fill:#e3f2fd
  style linkNode fill:#fff3e0
  style matchNode fill:#e3f2fd
  style flagNode fill:#e8f5e9
{% endmermaid %}

### Link

首頁主區需要一條前往第一則筆記的連結。它只要把人帶到 `/demos/01-hello`，不必知道自己是不是目前頁，所以用 `Link`。

**語法**

```jsx
/**
 * 換頁連結。點了改網址，文件不整頁重載。
 * @param {object} props
 * @param {string} props.to 目標路徑
 * @param {string} [props.className] 連結的外觀
 * @param {React.ReactNode} props.children 連結文字
 * @returns {React.ReactElement}
 */
const jump = <Link to="/demos/01-hello">從第一則開始</Link>;
```

**解析**

- `to` 是目標路徑。`Link` 點了只改網址，文件不整頁重載。

**觀念**

`to` 寫的是路由路徑，從網站根目錄算起。第一則的 `slug` 是檔名 `01-hello`，所以路徑是 `/demos/01-hello`。單則的路由在路徑參數那一節才登記，連結可以先寫上；路由補上之後，點了主區就會換成那一則元件。

```diff 04-react-router/src/pages/Home.jsx
+import { Link } from 'react-router';
 import { demos, topics } from '../data/catalog.js';
 // ...
- * 筆記總覽。主題與則數來自目錄資料，主區先列出有哪些主題。
+ * 筆記總覽。主題與則數來自目錄資料，Link 前往第一則。
+ * Link 改的是網址，文件不整頁重載。
 // ...
-        左側目錄列出前兩天的示範，並依主題分成幾組。這一頁把則數與主題名稱放在主區。
+        左側是前兩天的示範目錄。點一則就換到該則的網址，重新整理仍停在同一則，也可以把網址存成書籤。
 // ...
       </ul>
+      <p className="mt-4">
+        <Link className="text-teal-800 underline" to="/demos/01-hello">
+          從第一則開始
+        </Link>
+      </p>
     </section>
 // ...
```

**解析**

- 主區主題清單下面多一條底線連結，`to` 是 `/demos/01-hello`。
- 路由表還沒有 `demos/:slug` 時，點了主區是空的；下一節補上路徑之後，同一條連結會打開第一則。

{% note success %}
**換你試試：**
把連結文字改成「打開第一則」。`to` 仍指向 `/demos/01-hello`。
{% endnote %}

<details>
<summary>參考答案</summary>

文字在 `Link` 的內容。路徑留著。

```diff 04-react-router/src/pages/Home.jsx
 // ...
-          從第一則開始
+          打開第一則
 // ...
```

</details>

### NavLink

左側每一則與上方的站名都要能換頁，也要標出現在停在哪裡。`NavLink` 的 `className` 收到 `isActive`，目前這一則用深色底，其餘維持淡色。站名連回 `/`，並加上 `end`。

**語法**

```jsx
/**
 * 會標出目前頁的連結。
 * @param {object} props
 * @param {string} props.to 目標路徑
 * @param {boolean} [props.end] 為 true 時，路徑要完全符合才算使用中
 * @param {function({ isActive: boolean }): string} [props.className] 依是否為目前頁回傳類別
 * @param {React.ReactNode} props.children 連結文字
 * @returns {React.ReactElement}
 */
const item = (
  <NavLink to="/demos/01-hello" className={({ isActive }) => (isActive ? 'on' : '')}>
    01-hello 函式元件
  </NavLink>
);
```

**解析**

- `className` 可以是函式，參數裡的 `isActive` 為真時表示這一條對上目前網址。
- 站名連到 `/` 時要加 `end`，才不會在子路徑也算成使用中。

**觀念**

目錄的 `to` 用該則的 `slug` 接成 `/demos/` 加上檔名。`isActive` 為真時套深色底與白字，其餘只留一行淡色。站名若連到 `/` 卻沒有 `end`，往後只要路徑以斜線開頭，站名都會亮；加上 `end` 之後，只有停在總覽時站名才是使用中。

```diff 04-react-router/src/layouts/MainLayout.jsx
-import { Outlet, ScrollRestoration } from 'react-router';
+import { NavLink, Outlet, ScrollRestoration } from 'react-router';
 import DemoList from '../pages/DemoList.jsx';
 // ...
-/**
- * 全站共用的外框。左側先留目錄的位置，右側 Outlet 是子路由的主區。
- */
+/**
+ * 全站共用的外框。左側是目錄，右側 Outlet 依網址換主區。
+ * 標題連回首頁並加上 end，避免停在單則筆記時首頁仍顯示為使用中。
+ */
 // ...
-          <span className="font-semibold">練習筆記</span>
+          <NavLink
+            to="/"
+            end
+            className={({ isActive }) =>
+              isActive ? 'font-semibold text-teal-800' : 'font-semibold'
+            }
+          >
+            練習筆記
+          </NavLink>
 // ...
```

**解析**

- 站名改成連回 `/` 的 `NavLink`，並加上 `end`，只有停在總覽時才算使用中。

```diff 04-react-router/src/pages/DemoList.jsx
-import { demos, topics } from '../data/catalog.js';
+import { NavLink } from 'react-router';
+import { demos, topics } from '../data/catalog.js';
 // ...
-                <li key={demo.slug} className="px-2 py-1 text-sm">
-                  {demo.slug} {demo.title}
+                <li key={demo.slug}>
+                  <NavLink
+                    to={'/demos/' + demo.slug}
+                    className={({ isActive }) =>
+                      isActive
+                        ? 'block rounded bg-teal-800 px-2 py-1 text-sm text-white'
+                        : 'block rounded px-2 py-1 text-sm hover:bg-stone-100'
+                    }
+                  >
+                    {demo.slug} {demo.title}
+                  </NavLink>
                 </li>
 // ...
```

**解析**

- 路徑參數那一節補上路由之後，點「01-hello 函式元件」會到 `/demos/01-hello`，該列變成深色。
- 回到總覽時，只有站名是深色字，目錄列恢復淡色。站名有加 `end`，所以停在子路徑時不會一直亮著。

{% note success %}
**換你試試：**
把使用中那一列的底色改成 `bg-teal-900`。其餘列的類別留著。
{% endnote %}

<details>
<summary>參考答案</summary>

只改 `isActive` 為真時的那一串類別。

```diff 04-react-router/src/pages/DemoList.jsx
 // ...
                       isActive
-                        ? 'block rounded bg-teal-800 px-2 py-1 text-sm text-white'
+                        ? 'block rounded bg-teal-900 px-2 py-1 text-sm text-white'
                         : 'block rounded px-2 py-1 text-sm hover:bg-stone-100'
 // ...
```

</details>

## 路徑參數

每一則筆記共用同一個頁面元件，網址上的 slug 決定要畫哪一則。slug 就是範例檔名去掉 `.jsx`。這個會變的片段叫路徑參數。讀取用 `useParams`，上一則與下一則改網址用 `useNavigate`。

**一覽**

- `useParams` 讀路徑上的參數，回傳的欄位都是字串。這裡的 `slug` 就是 `/demos/:slug` 裡那一段。
- `useNavigate` 回傳一個函式。呼叫時傳入路徑，效果與點連結相同：推進歷史並換成對上的頁面。送出表單或按下「下一則」這種不是連結的動作才用它。

{% mermaid graph LR %}
  pathNode["/demos/01-hello"] --> paramsNode["useParams 得到 slug"]
  paramsNode --> pageNode["畫出該則元件"]
  pageNode --> nextNode["useNavigate 到相鄰 slug"]
  style pathNode fill:#e3f2fd
  style paramsNode fill:#fff3e0
  style pageNode fill:#e8f5e9
  style nextNode fill:#fff3e0
{% endmermaid %}

### useParams

路徑寫成 `demos/:slug`。冒號後面的名字就是參數名，打開 `/demos/01-hello` 時，`slug` 是字串 `'01-hello'`。頁面用這個字串到目錄裡找同一筆，找到才畫出該則的 `Component`。

**語法**

```jsx
/**
 * 讀取目前路徑上的參數，欄位都是字串。
 * @returns {{ slug: string }} 與 path 裡的 :slug 同名
 */
const { slug } = useParams();
```

**解析**

- `useParams` 讀路徑上的參數，欄位都是字串。這裡的 `slug` 就是 `/demos/:slug` 裡那一段。

**觀念**

目錄的 `slug` 也是字串，所以直接用 `===` 比較，不用先轉成數字。對不到任何一筆時，留在這一頁說明沒有這則，並給一條回總覽的連結。對得到時，主區先寫主題與標題，再把該則元件畫在下面。

```diff 04-react-router/src/App.jsx
 import MainLayout from './layouts/MainLayout.jsx';
+import DemoPage from './pages/DemoPage.jsx';
 import Home from './pages/Home.jsx';
 // ...
       { index: true, element: <Home /> },
+      { path: 'demos/:slug', element: <DemoPage /> },
 // ...
```

**解析**

- 單則筆記共用 `DemoPage`，路徑參數 `:slug` 決定要畫哪一則。這條要寫在更寬鬆的路徑前面。

```jsx 04-react-router/src/pages/DemoPage.jsx
import { Link, useParams } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 單則筆記。useParams 的 slug 是字串，和目錄的 slug 相同才畫出 Component。
 * 對不到時留在這一頁，並用 Link 回總覽。
 */
export default function DemoPage() {
  const { slug } = useParams();
  const demo = demos.find((item) => item.slug === slug);

  if (!demo) {
    return (
      <section>
        <h1 className="text-2xl font-bold">沒有這則筆記</h1>
        <p className="mt-2">
          <Link className="text-teal-800 underline" to="/">
            回目錄
          </Link>
        </p>
      </section>
    );
  }

  const topic = topics.find((item) => item.id === demo.topic);
  const View = demo.Component;

  return (
    <article>
      <p className="text-sm text-stone-500">{topic ? topic.title : ''}</p>
      <h1 className="mt-1 text-2xl font-bold">
        {demo.slug} {demo.title}
      </h1>
      <div className="mt-6">
        <View />
      </div>
    </article>
  );
}
```

**解析**

- 點目錄的「01-hello 函式元件」，網址變成 `/demos/01-hello`，主區是該則的標題與元件，該列是深色。
- 打開 `/demos/not-found`，主區是「沒有這則筆記」，因為目錄沒有這個 slug。重新整理仍停在同一個網址。

{% note success %}
**換你試試：**
把對不到時的標題改成「目錄裡沒有這個編號」。回目錄的連結留著。
{% endnote %}

<details>
<summary>參考答案</summary>

這句話在找不到資料的那個分支。路由的 `:slug` 不用改。

```diff 04-react-router/src/pages/DemoPage.jsx
 // ...
-        <h1 className="text-2xl font-bold">沒有這則筆記</h1>
+        <h1 className="text-2xl font-bold">目錄裡沒有這個編號</h1>
 // ...
```

</details>

### useNavigate

上一則與下一則是按鈕，不是一開始就寫死的連結。按下去要改到相鄰那一則的網址，所以用 `useNavigate`。順序跟 `demos` 陣列相同，第一則沒有上一則，最後一則沒有下一則。

**語法**

```jsx
/**
 * 取得換頁函式。傳入路徑後推進歷史，並畫出對上的頁面。
 * @returns {(to: string) => void}
 */
const navigate = useNavigate();
```

**解析**

- `useNavigate` 回傳一個函式。呼叫時傳入路徑，效果與點連結相同：推進歷史並換成對上的頁面。

**觀念**

先用 `find` 以 `slug` 對到目錄那一筆，對不到就留在「沒有這則筆記」。`findIndex` 取出同一筆的位置，前一格是上一則，後一格是下一則。按鈕在沒有相鄰筆記時停用。按得下時才呼叫 `navigate`，路徑是 `/demos/` 加上那一則的 `slug`。

```diff 04-react-router/src/pages/DemoPage.jsx
-import { Link, useParams } from 'react-router';
+import { Link, useNavigate, useParams } from 'react-router';
 // ...
- * 對不到時留在這一頁，並用 Link 回總覽。
+ * 對不到時留在這一頁，並用 Link 回總覽。上一則與下一則跟著目錄陣列，用 useNavigate 改網址；第一則與最後一則的按鈕停用。
 // ...
 export default function DemoPage() {
   const { slug } = useParams();
+  const navigate = useNavigate();
   const demo = demos.find((item) => item.slug === slug);
+  const index = demos.findIndex((item) => item.slug === slug);
 // ...
   const topic = topics.find((item) => item.id === demo.topic);
+  const prev = demos[index - 1];
+  const next = demos[index + 1];
   const View = demo.Component;
 // ...
         {demo.slug} {demo.title}
       </h1>
+      <div className="mt-4 flex gap-2">
+        <button
+          type="button"
+          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
+          disabled={!prev}
+          onClick={() => navigate('/demos/' + prev.slug)}
+        >
+          上一則
+        </button>
+        <button
+          type="button"
+          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
+          disabled={!next}
+          onClick={() => navigate('/demos/' + next.slug)}
+        >
+          下一則
+        </button>
+      </div>
       <div className="mt-6">
 // ...
```

**解析**

- 停在 `/demos/01-hello` 時，「上一則」是淡的，按「下一則」會到 `/demos/02-expr`，目錄的深色列跟著移到下一則。
- 瀏覽器的上一頁可以回到 `01-hello`，因為 `navigate` 會推進歷史。

{% note success %}
**換你試試：**
把按鈕文字「上一則」改成「前一則」。「下一則」留著。
{% endnote %}

<details>
<summary>參考答案</summary>

兩個按鈕各管一個方向，只改上一則的文字。

```diff 04-react-router/src/pages/DemoPage.jsx
 // ...
-          上一則
+          前一則
 // ...
```

</details>

## 查詢參數

目錄很長，用問號後面的查詢參數篩選要留下哪些列。`?q=狀態` 這種網址重新整理仍是同一組結果，也可以把篩過的目錄分享出去。讀與寫都用同一組 Hook。

**一覽**

- `useSearchParams` 讀取目前的查詢，用法接近 `URLSearchParams`。`get('q')` 沒有該參數時是 `null`。
- `setSearchParams` 寫回查詢並換掉網址上的問號後段。傳入空物件會清掉查詢。它改的是同一頁的網址，目錄元件不用因此換一條路由。

{% mermaid graph LR %}
  inputNode["輸入框"] --> setNode["setSearchParams"]
  setNode --> urlNode["?q="]
  urlNode --> readNode["useSearchParams"]
  readNode --> listNode["篩過的目錄"]
  style inputNode fill:#e3f2fd
  style setNode fill:#fff3e0
  style urlNode fill:#e3f2fd
  style readNode fill:#fff3e0
  style listNode fill:#e8f5e9
{% endmermaid %}

**語法**

```jsx
/**
 * 讀寫目前網址的查詢參數。
 * @returns {[URLSearchParams, function]} 目前的查詢，以及寫回查詢的函式
 */
const [params, setParams] = useSearchParams();

/**
 * 讀一個參數。沒有這組參數時是 null。
 * @param {string} name 參數名
 * @returns {string|null}
 */
const q = params.get('q');
```

**解析**

- `useSearchParams` 讀取目前的查詢。`get('q')` 沒有該參數時是 `null`。
- `setSearchParams` 寫回問號後段；傳入空物件會清掉查詢。

**觀念**

關鍵字比對 slug 或標題，大小寫忽略。某個主題篩完沒有留下任何一則，該組標題也不畫。輸入變成空字串時寫入空物件，網址回到沒有問號的路徑。目錄連到單則時把同一個 `q` 帶在路徑後面，否則一點進筆記，篩選就會不見。

```jsx 04-react-router/src/pages/DemoList.jsx
import { NavLink, useSearchParams } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 左側目錄。topics 決定分組順序，同一主題的示範排在該組下面，篩完沒有項目的主題不畫。
 * NavLink 的 isActive 為真時，這一則用深色底標出目前頁。
 * 輸入框把關鍵字寫進查詢 q；空字串會清掉查詢。連到單則時帶上同一個 q，換頁後篩選還在。
 */
export default function DemoList() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const keyword = q.trim().toLowerCase();
  const visible = demos.filter((demo) => {
    if (!keyword) return true;
    return (
      demo.slug.includes(keyword) || demo.title.toLowerCase().includes(keyword)
    );
  });

  const onSearch = (event) => {
    const next = event.target.value;
    setParams(next ? { q: next } : {});
  };

  return (
    <div className="mt-4">
      <input
        value={q}
        onChange={onSearch}
        placeholder="搜尋筆記"
        className="w-full rounded border border-stone-300 px-2 py-1 text-sm"
      />
      {visible.length === 0 ? (
        <p className="mt-3 text-sm text-stone-500">沒有符合的筆記</p>
      ) : null}
      <div className="mt-4 grid gap-4">
        {topics.map((topic) => {
          const items = visible.filter((demo) => demo.topic === topic.id);
          if (items.length === 0) return null;
          return (
            <section key={topic.id}>
              <h2 className="text-xs font-semibold tracking-wide text-stone-500">
                {topic.title}
              </h2>
              <ul className="mt-1 grid">
                {items.map((demo) => (
                  <li key={demo.slug}>
                    <NavLink
                      to={
                        q
                          ? `/demos/${demo.slug}?q=${encodeURIComponent(q)}`
                          : `/demos/${demo.slug}`
                      }
                      className={({ isActive }) =>
                        isActive
                          ? 'block rounded bg-teal-800 px-2 py-1 text-sm text-white'
                          : 'block rounded px-2 py-1 text-sm hover:bg-stone-100'
                      }
                    >
                      {demo.slug} {demo.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
```

**解析**

- 在總覽的網址加上 `?q=狀態`，或在左側輸入「狀態」，目錄只留下標題裡有這兩個字的列，網址列看得到 `q`。
- 清空輸入框後，問號消失，全部主題回到左側。重新整理仍是同一組篩選結果。

{% note success %}
**換你試試：**
把輸入框的提示文字改成「篩選目錄」。篩選的參數名仍是 `q`。
{% endnote %}

<details>
<summary>參考答案</summary>

提示文字是 `placeholder`。`setParams` 仍寫入 `q`。

```diff 04-react-router/src/pages/DemoList.jsx
 // ...
         value={q}
         onChange={onSearch}
-        placeholder="搜尋筆記"
+        placeholder="篩選目錄"
 // ...
```

</details>

## 選讀：位置資訊

`useLocation` 把目前網址拆成路徑、查詢與雜湊，一次看完整段位置。它適合確認「現在瀏覽器實際停在哪裡」，例如搜尋之後問號還在不在。改 `location` 上的欄位不會換頁。

**語法**

```jsx
/**
 * 讀取目前這一段位置。改欄位不會換頁。
 * @returns {object} location
 *   pathname：路徑名稱，例如 /where
 *   search：查詢字串，含問號。沒有查詢時是空字串
 *   hash：雜湊，含井字號。沒有時是空字串
 *   key：這一筆歷史紀錄的識別
 */
const location = useLocation();
```

**解析**

- `useLocation` 一次讀出路徑、查詢與雜湊。改這些欄位不會換頁。

**觀念**

這一頁把路徑、查詢與雜湊印出來，用來核對筆記網站的網址。停在 `/where` 時，路徑是 `/where`，查詢與雜湊多半是空的。若網址加上 `?q=狀態#note`，三段會一起對上。位置在渲染時就讀得到，直接畫出來即可。

```jsx 04-react-router/src/pages/WherePage.jsx
import { useLocation } from 'react-router';

/**
 * 選讀。渲染時讀 useLocation，把網址拆開來畫。pathname 是路徑，search 含問號，沒有查詢時是空字串，hash 含井字號。
 * 改這些欄位不會換頁。換頁仍用連結或 navigate。
 */
export default function WherePage() {
  const location = useLocation();

  return (
    <section>
      <h1 className="text-2xl font-bold">位置</h1>
      <p className="mt-2">路徑 {location.pathname}</p>
      <p>查詢 {location.search || '（沒有）'}</p>
      <p>雜湊 {location.hash || '（沒有）'}</p>
    </section>
  );
}
```

**解析**

- 這一頁把 `pathname`、`search`、`hash` 印出來。位置在渲染時就讀得到，直接畫即可。

位置頁掛在版型裡面，左側目錄還在。站名下方加一條連到 `/where` 的連結，路由表補上 `where`。

```diff 04-react-router/src/layouts/MainLayout.jsx
 // ...
           <DemoList />
+          <p className="mt-6 text-sm">
+            <NavLink
+              to="/where"
+              className={({ isActive }) =>
+                isActive
+                  ? 'text-teal-800 underline'
+                  : 'text-stone-600 underline'
+              }
+            >
+              位置
+            </NavLink>
+          </p>
 // ...
```

**解析**

- 站名下方加一條連到 `/where` 的 `NavLink`，方便打開位置頁核對網址。

```diff 04-react-router/src/App.jsx
 import Home from './pages/Home.jsx';
+import WherePage from './pages/WherePage.jsx';
 // ...
       { path: 'demos/:slug', element: <DemoPage /> },
+      { path: 'where', element: <WherePage /> },
 // ...
```

**解析**

- 打開 `/where?q=狀態#note`，三行分別是路徑 `/where`、查詢 `?q=狀態`、雜湊 `#note`。左側目錄仍在。
- 路由表的 `where` 寫在版型的 `children` 裡，所以這一頁仍包在同一份外框。

{% note success %}
**換你試試：**
再印一行 `location.key`。同一個網址用連結進來與重新整理，這個 key 不一定相同。
{% endnote %}

<details>
<summary>參考答案</summary>

`key` 是這一筆歷史紀錄的識別，路徑本身不含這一段。

```diff 04-react-router/src/pages/WherePage.jsx
 // ...
       <p>雜湊 {location.hash || '（沒有）'}</p>
+      <p>紀錄 {location.key}</p>
     </section>
 // ...
```

</details>

# 找不到的頁面

沒有任何路由對上時，要有一頁說明找不到，並能回到目錄。星號路徑 `*` 接住剩下的網址。放在版型裡面或與版型並列，左側目錄會不會留下來，結果不同。筆記網站的完成版把星號放在版型裡，未知網址仍看得到目錄。

**一覽**

- 分散式星號路由寫在版型的子路由裡。找不到時，目錄還在，主區換成 404。
- 集中式星號路由與版型並列。找不到時，整頁換成 404，目錄一併卸下。

{% mermaid graph LR %}
  missNode["對不上的網址"] --> nestNode["星號在版型內"]
  missNode --> topNode["星號與版型並列"]
  nestNode --> keepNode["目錄還在"]
  topNode --> dropNode["整頁只有 404"]
  style missNode fill:#e3f2fd
  style nestNode fill:#e8f5e9
  style topNode fill:#fff3e0
  style keepNode fill:#e8f5e9
  style dropNode fill:#ffebee
{% endmermaid %}

## 分散式星號路由

把 `*` 放進版型的子路由，而且放在最後面。`/demos/01-hello` 這種更具體的路徑會先對上，剩下的網址才落到星號。未知網址仍留在版型裡，左側目錄不會被拿掉，主區換成找不到的那一頁，並附上回總覽的連結。

**語法**

```jsx
/**
 * 接住前面沒有對上的路徑。放在版型的 children 最後一筆時，主區換成這個元素，目錄留著。
 * @type {{ path: string, element: React.ReactElement }}
 */
const missed = { path: '*', element: <NotFoundPage /> };
```

**解析**

- 星號接住前面沒有對上的路徑。放在版型 `children` 的最後一筆時，主區換成 404，目錄留著。

**觀念**

404 頁面只負責主區的說明與回目錄連結。回目錄的路徑是 `/`，點了主區回到總覽，左側仍是同一份版型。`demos/:slug` 比星號具體，所以 `/demos/01-hello` 不會掉進 404；`/demos/not-found` 會進單則頁面裡「沒有這則筆記」的分支，因為那條路由已經對上了，只是目錄沒有這個 slug。

```jsx 04-react-router/src/pages/NotFoundPage.jsx
import { Link } from 'react-router';

/**
 * 沒有路由對上時的主區。星號放在版型裡，左側目錄還在，這裡只換主區的說明。
 * 回目錄的 Link 指向 /，主區回到總覽。
 */
export default function NotFoundPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">找不到頁面</h1>
      <p className="mt-2">這個網址沒有對上任何筆記。</p>
      <p className="mt-2">
        <Link className="text-teal-800 underline" to="/">
          回目錄
        </Link>
      </p>
    </section>
  );
}
```

**解析**

- 404 頁只負責主區的說明，並提供一條回到 `/` 的連結。

```diff 04-react-router/src/App.jsx
 import Home from './pages/Home.jsx';
+import NotFoundPage from './pages/NotFoundPage.jsx';
 import WherePage from './pages/WherePage.jsx';
 // ...
- * 路由表。父路由畫版型，index 在同一個網址畫首頁。
- * 子路由寫在父路由的 children 裡，才會畫進版型的 Outlet。
+ * 筆記網站的路由表。版型包住首頁、單則筆記、位置頁與找不到的頁面。
+ * 子路由寫在父路由的 children 裡，才會畫進版型的 Outlet。星號放在最後，更具體的路徑先對上。
 // ...
       { path: 'where', element: <WherePage /> },
+      { path: '*', element: <NotFoundPage /> },
 // ...
```

**解析**

- 星號是版型 `children` 的最後一筆，仍包在版型裡，找不到時左側目錄還在。
- 註解與完成的 `App.jsx` 相同：子路由寫在 `children`，更具體的路徑先對上。
- 打開 `/no-such`，左側目錄還在，主區是找不到頁面。點「回目錄」會回到 `/`。

{% note success %}
**換你試試：**
在標題下面加一行「路徑沒有對上」。回目錄的連結留著。
{% endnote %}

<details>
<summary>參考答案</summary>

說明寫在 404 元件。路由表不用為了這句話改路徑。

```diff 04-react-router/src/pages/NotFoundPage.jsx
 // ...
       <h1 className="text-2xl font-bold">找不到頁面</h1>
+      <p className="mt-2">路徑沒有對上</p>
       <p className="mt-2">這個網址沒有對上任何筆記。</p>
 // ...
```

</details>

## 集中式星號路由

星號與版型並列時，未知網址不會走進版型。目錄消失，整頁只剩 404。筆記站的未知路徑仍想留著目錄，所以完成版用上一則的分散式寫法。這一則用來對照兩種放法的差別。

**語法**

```jsx
/**
 * 星號與版型路由同級時，未知網址整頁換成 404，版型的目錄不會出現。
 * 完成的 04-react-router 不用這一種，星號仍留在 children 裡。
 */
const central = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      /* 首頁、單則與位置仍寫在版型裡 */
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
```

**解析**

- 星號與版型路由同級，不在 `children` 裡。找不到時整頁換成 404，目錄不會出現。
- 完成的 `04-react-router` 不用這一種，星號仍留在版型的 `children`。

**觀念**

子頁面的元件與上一則相同，差別是星號與版型路由同級，不在 `children` 裡。找不到頁就沒有側欄。兩種星號不要同時留著：版型裡的星號會先接住，外面的就不會輪到。看完這一則，把星號移回版型的 `children`，完成的 `04-react-router` 仍用分散式。

{% note success %}
**換你試試：**
把星號暫時移到版型外面，打開 `/no-such`。目錄應消失。看完移回版型裡，確認目錄還在。
{% endnote %}

<details>
<summary>參考答案</summary>

目錄在不在，只看 404 有沒有被版型包住。下面是暫時移出去的差。看完請移回版型裡。

```diff 04-react-router/src/App.jsx
 // ...
       { path: 'where', element: <WherePage /> },
-      { path: '*', element: <NotFoundPage /> },
     ],
   },
+  { path: '*', element: <NotFoundPage /> },
 ], { basename });
 // ...
```

</details>

# 讀取與送出資料

路由與連結接上之後，進頁前的讀取與表單送出寫在路由物件上。`loader` 在畫面前把資料準備好，`action` 接收 `Form` 的請求，寫進同一份筆記後相關的 `loader` 會自己再跑。每一則練習網址就是範例檔名去掉 `.jsx`，從 `/demos/86-loader` 到 `/demos/91-navigation`。路徑裡若有 `notes/`，後面那一段仍是 `noteId`。這一章的六則都排在 `demos/:slug` 前面，才不會被路徑參數吃掉。

{% note info %}
**哪一種路由器能用**
`loader`、`action`、`Form`、`useFetcher`、`errorElement` 以及這一章的相關 Hook，只配合資料路由器：`createBrowserRouter`、`createHashRouter`、`createMemoryRouter` 與 `RouterProvider`；框架模式則在路由模組匯出 `loader` 與 `action`。宣告式的 `BrowserRouter` 與 `Routes` 不能用這些，三種接法見[三種接法](#React-Router)。
{% endnote %}

{% mermaid graph TD %}
  route["路由物件<br/>path、loader、action、Component、errorElement"]
  loader["loader"]
  action["action"]
  comp["Component"]
  err["errorElement"]
  route --> loader
  route --> action
  route --> comp
  route --> err
  loader -->|"回傳值"| dataHook["useLoaderData"]
  dataHook --> comp
  comp -->|"Form method=post 或 useFetcher"| action
  action -->|"回傳錯誤"| actionHook["useActionData"]
  actionHook --> comp
  action -->|"redirect"| newUrl["換成新網址"]
  action -->|"throw"| err
  err --> errHook["useRouteError"]
  style route fill:#fff3e0
  style loader fill:#e3f2fd
  style action fill:#e3f2fd
  style comp fill:#e8f5e9
  style err fill:#ffebee
  style dataHook fill:#e8f5e9
  style actionHook fill:#e8f5e9
  style newUrl fill:#fff3e0
  style errHook fill:#ffebee
{% endmermaid %}

{% mermaid sequenceDiagram %}
  participant U as 使用者
  participant C as Component
  participant A as action
  participant L as loader
  U->>C: 送出 Form
  C->>A: POST 表單
  A->>L: 路由器重跑 loader
  L->>C: 新資料重畫
  Note over C: useNavigation 依序是 submitting、loading、idle
{% endmermaid %}

`loader` 在進頁前把資料備好，頁面用 `useLoaderData` 接。`Form` 或 `useFetcher` 把欄位送到這條路由的 `action`；成功後路由器會再跑相關的 `loader`，或依 `redirect` 換到新網址。`action` 回傳的錯誤用 `useActionData` 顯示，`throw` 則交給 `errorElement`，由 `useRouteError` 讀取。細節見下面各節。

`86-loader` 與 `89-error-element` 到 `91-navigation` 共用 `notes-db.js` 裡的陣列。`87-action` 與 `88-redirect-list` 用 `fake-api.js`，不寫這份檔案。重新整理開發伺服器會回到最初的兩筆。

## 用 loader 讀資料

`loader` 是路由物件上的函式，在這個網址的元件畫出來之前執行。回傳的值由頁面裡的 `useLoaderData` 讀取。這一則只讀清單，還沒有表單。

{% mermaid graph LR %}
  route["路由的 loader"] --> wait["進頁前執行"]
  wait --> view["渲染元件"]
  view --> hook["useLoaderData 接回傳值"]
  style route fill:#e3f2fd
  style wait fill:#fff3e0
  style view fill:#e8f5e9
  style hook fill:#e8f5e9
{% endmermaid %}

**觀念**

`notes-db.js` 把陣列留在模組作用域，匯出讀取與寫入函式。`86-loader.jsx` 的 `loader` 呼叫 `listNotes`，把陣列放進 `notes`。頁面解構同一份結果，用 `map` 畫出標題。

```js 04-react-router/src/examples/notes-db.js
/** @type {{ id: string, title: string, done: boolean }[]} */
let notes = [
  { id: '1', title: '看海', done: false },
  { id: '2', title: '寫筆記', done: true },
];

/**
 * 讀出目前全部筆記，回傳模組裡的同一份陣列。
 * @returns {{ id: string, title: string, done: boolean }[]}
 */
export const listNotes = () => notes;

/**
 * 依 id 找一筆。找不到時回傳 null。
 * @param {string} id
 * @returns {{ id: string, title: string, done: boolean } | null}
 */
export const getNote = (id) => notes.find((item) => item.id === id) ?? null;

/**
 * 新增一筆並放在最前面。id 用目前時間的毫秒數。
 * @param {string} title
 * @returns {{ id: string, title: string, done: boolean }}
 */
export const addNote = (title) => {
  const note = { id: String(Date.now()), title, done: false };
  notes = [note, ...notes];
  return note;
};

/**
 * 把指定 id 的 done 翻轉。沒有這筆時陣列內容不變。
 * @param {string} id
 * @returns {void}
 */
export const toggleNote = (id) => {
  notes = notes.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item,
  );
};
```

**解析**

- `listNotes`、`getNote`、`addNote`、`toggleNote` 都操作模組裡的同一份陣列。
- `86-loader` 與 `89-error-element` 到 `91-navigation` 共用這份檔案。`87-action` 與 `88-redirect-list` 用 `fake-api.js`，不寫這裡。重新整理開發伺服器會回到最初的「看海」與「寫筆記」兩筆。


```jsx 04-react-router/src/examples/86-loader.jsx
import { useLoaderData } from 'react-router';
import { listNotes } from './notes-db.js';

/**
 * 在這個網址的元件畫出來之前執行。回傳值交給 useLoaderData。
 * 路由器會傳入 { params, request }。這一則不讀路徑參數，直接回傳全部筆記。
 * 回傳 Promise 時路由器會先等待。這一則是同步回傳。
 * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
 */
export const loader = () => ({ notes: listNotes() });

/** 畫出 loader 準備好的標題。 */
export default function LoaderDemo() {
  /**
   * 讀取這條路由 loader 的回傳值。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">86 loader 讀資料</h1>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </section>
  );
}
```

**解析**

- 打開 `/demos/86-loader` 會先跑 `loader`，畫面上是「看海」與「寫筆記」兩列，沒有另外的讀取中文字。
- `useLoaderData` 拿到的就是 `loader` 的回傳值。這一則沒有 `useEffect`。

路由要註冊在 `demos/:slug` 前面。`App.jsx` 用具名匯入把 `loader` 掛到 `demos/86-loader`。

```diff 04-react-router/src/App.jsx
 import WherePage from './pages/WherePage.jsx';
+import LoaderDemo, { loader as loader86 } from './examples/86-loader.jsx';
 // ...
+        { path: 'demos/86-loader', loader: loader86, Component: LoaderDemo },
         { path: 'demos/:slug', element: <DemoPage /> },
 // ...
```

**解析**

- `demos/86-loader` 比 `demos/:slug` 更具體，所以這一則不會掉進單則筆記頁。
- 用具名匯入把 `loader` 掛到這條路由，寫在 `demos/:slug` 前面。

{% note success %}
**換你試試：**
在標題下面加一行，顯示目前有幾筆筆記。
{% endnote %}

<details>
<summary>參考答案</summary>

筆數用 `notes.length`。路由與 `loader` 不用改。

```diff 04-react-router/src/examples/86-loader.jsx
 // ...
       <h1 className="text-2xl font-bold">86 loader 讀資料</h1>
+      <p className="mt-2">目前 {notes.length} 筆</p>
       <ul className="mt-4 grid gap-2">
 // ...
```

</details>

## 用 action 與 Form 送出

`Form method=post` 把欄位送到這條路由的 `action`，不會整頁換成另一份文件。`action` 用 `request.formData()` 讀欄位，再呼叫 `createItem` 對 jsonplaceholder 發出 POST，頁面用 `useActionData` 顯示伺服器回傳的那一筆。

{% mermaid graph TD %}
  form["Form method=post"] --> action["action"]
  action -->|"createItem 回傳 { item }"| hook["useActionData 顯示"]
  action -->|"回傳 data errors 400"| hook
  style form fill:#e3f2fd
  style action fill:#fff3e0
  style hook fill:#e8f5e9
{% endmermaid %}

**觀念**

`form.get('title')` 是 FormData 的方法，用來讀取表單裡 name 為 `title` 的欄位，不是 HTTP 的 GET。沒有這個欄位時是 `null`。去掉空白後是空字串就回 `data({ errors: { title: '請填標題' } }, { status: 400 })`，有字才呼叫 `../api/fake-api.js` 的 `createItem({ title })`，把 `{ item }` 交給 `useActionData`。jsonplaceholder 不會把資料留下來，所以這一則不維護清單。

```jsx 04-react-router/src/examples/87-action.jsx
import { data, Form, useActionData } from 'react-router';
import { createItem } from '../api/fake-api.js';

/**
 * 接收這一條路由的表單。request 是這次送出。
 * request.formData() 回傳 Promise，解析後是 FormData。
 * form.get('title') 是 FormData 的方法，讀取 name 為 title 的欄位，不是 HTTP GET。
 * 沒有這個欄位時是 null。標題去掉空白後是空字串，就回傳
 * data({ errors: { title } }, { status: 400 })。
 * 有字就呼叫 createItem({ title })，對 jsonplaceholder 發出 POST，
 * 並回傳 { item }。這個服務不會把資料留下來，所以這一則不維護清單。
 * @param {{ request: Request }} args
 * @returns {Promise<{ errors: { title: string } } | { item: { id: number, title: string } }>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '').trim();
  if (!title) return data({ errors: { title: '請填標題' } }, { status: 400 });
  const item = await createItem({ title });
  return { item };
};

/**
 * Form method="post" 把欄位送到目前這條路由的 action，不整頁換成另一份文件。
 * 沒有 action 屬性時，目標就是目前網址。
 * 成功後用 useActionData 顯示伺服器回傳的那一筆。
 */
export default function ActionDemo() {
  /**
   * 最近一次 action 的回傳值。還沒送出時是 undefined。
   * @returns {{ errors?: { title: string }, item?: { id: number, title: string } } | undefined}
   */
  const result = useActionData();
  return (
    <section>
      <h1 className="text-2xl font-bold">87 action 與 Form</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的標題"
        />
        {result?.errors?.title ? (
          <p className="text-red-700">{result.errors.title}</p>
        ) : null}
        {result?.item ? (
          <p>
            伺服器回傳 #{result.item.id} {result.item.title}
          </p>
        ) : null}
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          新增
        </button>
      </Form>
    </section>
  );
}
```

**解析**

- 填一個標題再按「新增」，畫面出現伺服器回傳的 id 與標題。網址仍是 `/demos/87-action`。
- `<Form>` 是 React Router 的元件，會自己攔下瀏覽器預設的整頁送出，改把欄位交給 `action`，所以不用寫 `event.preventDefault()`。只有想在送出前擋下來（例如先跳確認）時，才在 `onSubmit` 裡呼叫它。
- `form.get('title')` 是 FormData 的方法，用來讀取欄位名為 `title` 的值，不是向伺服器發 HTTP GET。
- jsonplaceholder 接受 POST 後會回傳一筆帶 id 的物件，但不會真的存下來，所以這一則不用 `loader` 列清單，也不會看到列表變長。
- 標題留白就送出時，`action` 回傳 `data({ errors: { title: '請填標題' } }, { status: 400 })`，輸入框下面出現這句話。這是回傳，不是 throw，所以頁面與表單都還在，才能顯示訊息。throw 會交給 `errorElement`，整頁被換成錯誤畫面。
- `useActionData` 在第一次送出前是 `undefined`，所以用 `result?.errors?.title` 與 `result?.item` 讀取。
- `data(..., { status: 400 })` 只設定回應的狀態碼，頁面讀到的仍是那份物件，讀法與直接回傳相同。
- 同一份 `errors` 物件也可以交給 MUI 的 `TextField`，用 `error` 與 `helperText` 顯示該欄訊息。

```diff 04-react-router/src/App.jsx
 import LoaderDemo, { loader as loader86 } from './examples/86-loader.jsx';
+import ActionDemo, {
+  action as action87,
+} from './examples/87-action.jsx';
 // ...
         { path: 'demos/86-loader', loader: loader86, Component: LoaderDemo },
+        {
+          path: 'demos/87-action',
+          action: action87,
+          Component: ActionDemo,
+        },
         { path: 'demos/:slug', element: <DemoPage /> },
 // ...
```

**解析**

- 這條路由掛 `action` 與 `Component`，不必再掛 `loader`。路徑寫在 `demos/:slug` 前面。

{% note success %}
**換你試試：**
把空標題的錯誤改成「標題不可以空白」。
{% endnote %}

<details>
<summary>參考答案</summary>

只改 `action` 回傳的那句話。

```diff 04-react-router/src/examples/87-action.jsx
 // ...
-  if (!title) return data({ errors: { title: '請填標題' } }, { status: 400 });
+  if (!title) return data({ errors: { title: '標題不可以空白' } }, { status: 400 });
 // ...
```

</details>

## redirect：送出後轉址

編輯表單送出後，`action` 用 `updateItem` 寫入標題，並 `return redirect('/demos/88-redirect-list')`。路由器改去那個網址，並執行列表的 `loader`。

{% mermaid graph TD %}
  subgraph route["Route"]
    subgraph list["List"]
      listPath["/demos/88-redirect-list"]
      listLoader["loader"]
    end
    subgraph edit["Edit"]
      editPath["/demos/88-redirect-edit/:itemId"]
      editLoader["loader"]
      form["Form"]
      action["action"]
    end
  end
  action -->|"redirect"| listPath
{% endmermaid %}

列表與編輯是兩條路由。編輯頁的 `Form` 送到這一條的 `action`；`action` 呼叫 `updateItem` 後回傳 `redirect`。路由器改去列表路徑，並再跑列表的 `loader`，畫面上是新的標題。

### 步驟 1：列表頁

```jsx 04-react-router/src/examples/88-redirect-list.jsx
import { Link, useLoaderData } from 'react-router';
import { getItems } from '../api/fake-api.js';

/**
 * 列表路由的 loader。進頁前呼叫 getItems，回傳值交給列表頁的 useLoaderData。
 * @returns {Promise<{ items: { id: number, title: string }[] }>}
 */
export const loader = async () => ({ items: await getItems() });

/**
 * 列表頁。每一列有「編輯」連到 /demos/88-redirect-edit/:itemId。
 * @returns {JSX.Element}
 */
export default function RedirectList() {
  /**
   * @returns {{ items: { id: number, title: string }[] }}
   */
  const { items } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">88 送出後轉址</h1>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <span>{item.title}</span>
            <Link
              className="text-teal-800 underline"
              to={`/demos/88-redirect-edit/${item.id}`}
            >
              編輯
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

**解析**

- `loader` 進頁前呼叫 `getItems`，回傳 `{ items }`。頁面用 `useLoaderData` 接。
- 每一列有「編輯」連到 `/demos/88-redirect-edit/:itemId`。

### 步驟 2：編輯頁

```jsx 04-react-router/src/examples/88-redirect-edit.jsx
import { Form, Link, redirect, useLoaderData } from 'react-router';
import { getItems, updateItem } from '../api/fake-api.js';

/**
 * 編輯路由的 loader。params.itemId 是路徑上的項目 id。
 * 從 getItems 找出這一筆，交給編輯頁的 useLoaderData。
 * @param {{ params: { itemId: string } }} args
 * @returns {Promise<{ item: { id: number, title: string } }>}
 */
export const loader = async ({ params }) => {
  const items = await getItems();
  const item = items.find((row) => String(row.id) === String(params.itemId));
  return { item };
};

/**
 * 接收編輯頁的表單。request.formData() 讀取 title，updateItem 寫入後
 * 回傳 redirect('/demos/88-redirect-list')。路由器改去列表並跑列表的 loader。
 * @param {{ params: { itemId: string }, request: Request }} args
 * @returns {Promise<Response>}
 */
export const action = async ({ params, request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '');
  const items = await getItems();
  const current = items.find((row) => String(row.id) === String(params.itemId));
  await updateItem(params.itemId, { ...current, title });
  return redirect('/demos/88-redirect-list');
};

/**
 * 編輯頁。Form method="post" 送到目前網址的 action，沒有 action 屬性。
 * defaultValue 帶入目前標題。送出後由 action 轉回列表。
 * @returns {JSX.Element}
 */
export default function RedirectEdit() {
  /**
   * @returns {{ item: { id: number, title: string } }}
   */
  const { item } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">編輯標題</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          defaultValue={item.title}
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          儲存
        </button>
      </Form>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/88-redirect-list">
          回列表
        </Link>
      </p>
    </section>
  );
}
```

**解析**

- `Form method="post"` 送到目前網址的 `action`，沒有 `action` 屬性。欄位只有標題。
- `action` 讀取 `title`，呼叫 `updateItem` 寫入，最後一行是 `return redirect('/demos/88-redirect-list')`。路由器改去列表並跑列表的 `loader`，畫面上是新的標題。
- `getItems` 與 `updateItem` 共用同一份還留在記憶體裡的清單，所以轉回去時列表會讀到剛改的標題。

### 步驟 3：在 App.jsx 掛上兩條路由

```diff 04-react-router/src/App.jsx
 import ActionDemo, { action as action87 } from './examples/87-action.jsx';
+import RedirectList, {
+  loader as loader88List,
+} from './examples/88-redirect-list.jsx';
+import RedirectEdit, {
+  action as action88,
+  loader as loader88Edit,
+} from './examples/88-redirect-edit.jsx';
 // ...
           Component: ActionDemo,
         },
+        {
+          path: 'demos/88-redirect-list',
+          loader: loader88List,
+          Component: RedirectList,
+        },
+        {
+          path: 'demos/88-redirect-edit/:itemId',
+          loader: loader88Edit,
+          action: action88,
+          Component: RedirectEdit,
+        },
         { path: 'demos/:slug', element: <DemoPage /> }
 // ...
```

**解析**

- 列表路徑是 `demos/88-redirect-list`，`loader` 回傳清單，`Component` 是預設匯出的列表。
- 編輯路徑是 `demos/88-redirect-edit/:itemId`，掛上 `loader`、`action` 與編輯頁。`itemId` 是路徑上的項目 id。
- 這兩條比 `demos/:slug` 更具體，所以寫在它前面。側欄只列列表那一則；編輯頁從列表點進去。

{% note success %}
**換你試試：**
把儲存按鈕的文字改成「儲存並回列表」。
{% endnote %}

<details>
<summary>參考答案</summary>

只改按鈕文字。

```diff 04-react-router/src/examples/88-redirect-edit.jsx
 // ...
-          儲存
+          儲存並回列表
 // ...
```

</details>

## errorElement：拿不到資料時

明細的 `loader` 找不到筆記時 `throw data('找不到', { status: 404 })`。頁面元件不會渲染，這條路由的 `errorElement` 改畫錯誤元件，元件用 `useRouteError` 與 `isRouteErrorResponse` 讀出被丟出的值。

{% mermaid graph TD %}
  loader["loader"] -->|"throw data"| err["errorElement"]
  err --> hook["useRouteError"]
  style loader fill:#e3f2fd
  style err fill:#ffebee
  style hook fill:#ffebee
{% endmermaid %}

`data(body, { status })` 把一份內容和狀態碼包在一起。在 `loader` 裡必須 `throw`，不能 `return`，函式在這裡停住，頁面元件不會渲染。`isRouteErrorResponse` 分辨這是 `throw data()` 的回應（有 `.status` 與 `.data`），還是一般的 `Error`（有 `.message`）。驗證錯誤用 `return` 交給 `useActionData`，表單留在原頁；資料找不到則 `throw`，改由 `errorElement` 畫出。

{% note info %}
沒有指定 errorElement 時，錯誤會往上找路由上最近一層的 errorElement，只替換那一層以下的畫面
{% endnote %}

{% mermaid graph TD %}
  subgraph keep["errorElement 掛在子路由"]
    layoutKeep["版型，裡面是 Outlet"] --> pageKeep["子路由 loader throw"]
    pageKeep --> outKeep["只換 Outlet 裡的畫面"]
  end
  subgraph drop["errorElement 只掛在版型，或沒有掛"]
    layoutDrop["版型，裡面是 Outlet"] --> pageDrop["子路由 loader throw"]
    pageDrop --> outDrop["整份版型被換掉"]
  end
  style layoutKeep fill:#e8f5e9
  style outKeep fill:#e8f5e9
  style layoutDrop fill:#ffebee
  style outDrop fill:#ffebee
{% endmermaid %}

`errorElement` 掛在明細路由時，只換掉版型 `Outlet` 裡的主區。只掛在版型上、或這一層都沒掛時，整份版型會被換掉。

{% note info %}
資料模式下，這個 404 只作用在畫面上，瀏覽器拿到的仍是 SPA 的 HTTP 200。只有框架模式的伺服器端渲染，才會把這個狀態碼當成真正的回應狀態送出。
{% endnote %}

明細路由才掛 `errorElement`。`notes/:noteId` 對上 `notes/` 後面的任何一段，所以 `not-found` 走同一條路由。

```diff 04-react-router/src/App.jsx
 import RedirectEdit, {
   action as action88,
   loader as loader88Edit,
 } from './examples/88-redirect-edit.jsx';
+import ErrorElementDemo, {
+  loader as loader89,
+  NoteDetail,
+  NoteMissing,
+} from './examples/89-error-element.jsx';
 // ...
           Component: RedirectEdit,
         },
+        {
+          path: 'demos/89-error-element',
+          loader: loader89,
+          Component: ErrorElementDemo,
+        },
+        {
+          path: 'demos/89-error-element/notes/:noteId',
+          loader: loader89,
+          Component: NoteDetail,
+          errorElement: <NoteMissing />,
+        },
         { path: 'demos/:slug', element: <DemoPage /> },
 // ...
```

**解析**

- 列表路徑是 `demos/89-error-element`，明細路徑是 `demos/89-error-element/notes/:noteId`，兩條共用 `loader89`。
- 沒有 `noteId` 時 `loader` 回傳清單；有 `noteId` 時用 `getNote`，找不到就 `throw data('找不到', { status: 404 })`。
- `errorElement: <NoteMissing />` 只寫在明細那一條。列表路由沒有 `errorElement`。
- `demos/89-error-element/notes/:noteId` 對上 `notes/` 後面的任何一段，所以 `/demos/89-error-element/notes/not-found` 就是這條路由，`params.noteId` 為 `'not-found'`，不必再宣告一條路徑。

`89-error-element.jsx` 放清單、明細，以及明細路由的錯誤畫面。

```jsx 04-react-router/src/examples/89-error-element.jsx
import {
  data,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from 'react-router';
import { getNote, listNotes } from './notes-db.js';

/**
 * 列表與明細共用。params 是路徑參數，明細路由才有 noteId。
 * 沒有 noteId 時回傳清單，交給列表頁的 useLoaderData。
 * 有 noteId 時用 getNote 回傳那一筆，交給 NoteDetail。
 * 找不到就 throw data(body, { status })。data 把資料和狀態碼包成路由錯誤回應，
 * 第一個引數會成為 error.data，status 是狀態碼。
 * 在 loader 裡必須 throw，不能 return：函式在這裡停住，頁面元件不會渲染，
 * 路由器畫這條路由的 errorElement。
 * @param {{ params: { noteId?: string } }} args
 * @returns {{ notes: { id: string, title: string, done: boolean }[] } | { note: { id: string, title: string, done: boolean } }}
 */
export const loader = ({ params }) => {
  if (!params.noteId) return { notes: listNotes() };
  const note = getNote(params.noteId);
  if (!note) throw data('找不到', { status: 404 });
  return { note };
};

/**
 * 列表頁。列出筆記，並提供一條連到不存在 id 的連結。
 * 使用沒有 noteId 時 loader 回傳的 { notes }。
 * @returns {JSX.Element}
 */
export default function ErrorElementDemo() {
  /**
   * 沒有 params.noteId 時，loader 回傳的是 { notes }。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">89 errorElement</h1>
      <p className="mt-4">
        {/* not-found 是不存在的 id，用來觸發 404。這個網址由 demos/89-error-element/notes/:noteId 對上，params.noteId 是 'not-found'，沒有另外宣告路由。 */}
        <Link
          className="text-teal-800 underline"
          to="/demos/89-error-element/notes/not-found"
        >
          打開一筆不存在的筆記
        </Link>
      </p>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              className="text-teal-800 underline"
              to={`/demos/89-error-element/notes/${note.id}`}
            >
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * 明細頁。loader 在有 noteId 且找得到時回傳 { note }。
 * 找不到時 loader 已 throw，這個元件不會渲染。
 * @returns {JSX.Element}
 */
export function NoteDetail() {
  /**
   * @returns {{ note: { id: string, title: string, done: boolean } }}
   */
  const { note } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="mt-2">{note.done ? '已完成' : '未完成'}</p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/89-error-element">
          回列表
        </Link>
      </p>
    </section>
  );
}

/**
 * 明細路由的 errorElement。列表那一條沒有掛這個元件。
 * useRouteError 讀取被丟出的值。
 * isRouteErrorResponse 為 true 時，這是 throw data() 的回應，有 .status 與 .data，畫面顯示 error.data。
 * 否則顯示「找不到」。
 * @returns {JSX.Element}
 */
export function NoteMissing() {
  /**
   * @returns {unknown}
   */
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? error.data : '找不到';
  return (
    <section>
      <h1 className="text-2xl font-bold">找不到</h1>
      <p className="mt-2">{String(message)}</p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/89-error-element">
          回列表
        </Link>
      </p>
    </section>
  );
}
```

**解析**

- 「打開一筆不存在的筆記」連到 `/demos/89-error-element/notes/not-found`。
- `loader` `throw data(...)` 之後，`NoteDetail` 不會渲染，主區換成 `NoteMissing`。
- `isRouteErrorResponse(error)` 為真，畫面出現標題「找不到」與 `error.data` 的「找不到」。

{% note success %}
**換你試試：**
把 404 丟出的文字改成「沒有這筆」。
{% endnote %}

<details>
<summary>參考答案</summary>

`data` 的第一個引數就是 `error.data`。

```diff 04-react-router/src/examples/89-error-element.jsx
 // ...
-  if (!note) throw data('找不到', { status: 404 });
+  if (!note) throw data('沒有這筆', { status: 404 });
 // ...
```

</details>

## 不換頁的送出與讀取中狀態

有的送出不應該改網址，例如列表上把一筆標成完成。有的送出或換頁需要讓人看見「正在進行」。這兩則都是後面專案會用到的寫法：後台對話框用 `useFetcher` 留在列表頁，讀取中的提示用 `useNavigation`。

### useFetcher

`useFetcher` 拿得到一組自己的 `Form` 與 `submit`。送到的仍是這一條路由的 `action`，網址留在 `/demos/90-fetcher`。`action` 改完筆記後，`loader` 一樣會自己重跑。

{% mermaid sequenceDiagram %}
  participant U as 使用者
  participant C as Component
  participant A as action
  participant L as loader
  alt fetcher.Form 或 fetcher.submit
    U->>C: 送出表單
    Note over C: fetcher.state 是 submitting
    C->>A: 跑 action
    Note over C: fetcher.state 是 loading，fetcher.data 是 action 回傳值
    A->>L: 路由器重跑 loader
    L->>C: 新資料重畫
    Note over C: fetcher.state 是 idle
  else fetcher.load
    U->>C: 呼叫 load
    Note over C: fetcher.state 是 loading
    C->>L: 跑 loader
    L->>C: 資料進 fetcher.data
    Note over C: fetcher.state 是 idle
  end
{% endmermaid %}

送出時 `fetcher.state` 依序是 idle、submitting、loading、idle。`submitting` 是正在跑 `action`，畫面常把按鈕停用，或改顯示「儲存中…」；接著的 `loading` 是路由器重跑 `loader`，可顯示讀取列。`fetcher.load()` 沒有 submitting，只走 idle、loading、idle。`fetcher.data` 是 `action` 或 `loader` 的回傳值。`useFetcher` 不會換頁，網址維持原樣。

**觀念**

每一列的按鈕包在 `fetcher.Form` 裡，用隱藏欄位帶 `id`。`toggleNote` 只翻轉那一筆的 `done`。

```jsx 04-react-router/src/examples/90-fetcher.jsx
import { useFetcher, useLoaderData } from 'react-router';
import { listNotes, toggleNote } from './notes-db.js';

/**
 * 進頁前讀清單。回傳值交給 useLoaderData。
 * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
 */
export const loader = () => ({ notes: listNotes() });

/**
 * 接收送到這條路由的表單。form.get('id') 取出隱藏欄位。
 * toggleNote 只翻轉那一筆的 done。回傳值可從 fetcher.data 讀到。
 * @param {{ request: Request }} args
 * @returns {Promise<{ ok: boolean }>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  toggleNote(String(form.get('id')));
  return { ok: true };
};

/** 每一列用 fetcher.Form 送出，網址留在 /demos/90-fetcher。 */
export default function FetcherDemo() {
  /**
   * 讀取這條路由 loader 的回傳值。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  /**
   * 不換頁的送出。fetcher.Form 把表單送到這條路由的 action，網址不變。
   * state 是 'idle'、'loading' 或 'submitting'，data 是 action 的回傳值。
   * 畫面用 state 顯示目前狀態。
   * @returns {{ Form: React.ElementType, state: 'idle' | 'loading' | 'submitting', data: unknown }}
   */
  const fetcher = useFetcher();
  return (
    <section>
      <h1 className="text-2xl font-bold">90 fetcher 不換頁</h1>
      <p className="mt-3">狀態：{fetcher.state}</p>
      <ul className="mt-4 grid max-w-sm gap-3">
        {notes.map((note) => (
          <li key={note.id} className="flex items-center justify-between gap-3">
            <span>
              {note.title} · {note.done ? '已完成' : '未完成'}
            </span>
            <fetcher.Form method="post">
              <input type="hidden" name="id" value={note.id} />
              <button
                type="submit"
                className="rounded bg-teal-800 px-3 py-1 text-white"
              >
                {note.done ? '改回未完成' : '標成完成'}
              </button>
            </fetcher.Form>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

**解析**

- 按下「標成完成」或「改回未完成」後，同一列的文字換成另一種狀態，網址仍是 `/demos/90-fetcher`。標題下面的「狀態」會依序顯示 submitting、loading，再回到 idle。
- 寫入的是 `action` 裡的 `toggleNote`。清單更新是因為 `loader` 在 action 之後自動重跑。

```diff 04-react-router/src/App.jsx
+import FetcherDemo, {
+  action as action90,
+  loader as loader90,
+} from './examples/90-fetcher.jsx';
 // ...
           path: 'demos/89-error-element/notes/:noteId',
           loader: loader89,
           Component: NoteDetail,
           errorElement: <NoteMissing />,
         },
+        {
+          path: 'demos/90-fetcher',
+          loader: loader90,
+          action: action90,
+          Component: FetcherDemo,
+        },
         { path: 'demos/:slug', element: <DemoPage /> },
 // ...
```

**解析**

- 這條路由同時掛 `loader`、`action` 與 `Component`，路徑寫在 `demos/:slug` 前面。送出後網址仍停在 `/demos/90-fetcher`。

{% note success %}
**換你試試：**
已完成時，按鈕文字改成「取消完成」。
{% endnote %}

<details>
<summary>參考答案</summary>

```diff 04-react-router/src/examples/90-fetcher.jsx
 // ...
-                {note.done ? '改回未完成' : '標成完成'}
+                {note.done ? '取消完成' : '標成完成'}
 // ...
```

</details>

### useNavigation

`useNavigation` 描述路由器此刻在做什麼。`state` 為 `loading` 是正在跑 loader，`submitting` 是正在跑 action，`idle` 是閒置。這一則的 `loader` 與 `action` 各等 400 毫秒，只為了讓「讀取中」留在畫面上看得清楚。專案裡的記憶體讀取不必做這個延遲。

{% mermaid sequenceDiagram %}
  participant U as 使用者
  participant C as Component
  participant A as action
  participant L as loader
  alt 點選 Link
    U->>C: 點連結
    Note over C: navigation.state 是 loading
    C->>L: 跑新頁面的 loader
    L->>C: 畫新頁面
    Note over C: navigation.state 是 idle
  else 送出 Form
    U->>C: 送出表單
    Note over C: navigation.state 是 submitting
    C->>A: 跑 action
    Note over C: navigation.state 是 loading
    A->>L: 路由器重跑 loader
    L->>C: 新資料重畫
    Note over C: navigation.state 是 idle
  end
{% endmermaid %}

點連結時 `navigation.state` 依序是 idle、loading、idle，畫面可顯示讀取列。送出 `Form` 時依序是 idle、submitting、loading、idle；`submitting` 期間可把按鈕停用，或改顯示「儲存中…」。`useNavigation` 追蹤的是換頁，網址會改變。

**觀念**

「重新讀取」用查詢 `n` 換一個網址，同一條路由的 `loader` 會再跑。送出表單時，按鈕在 `submitting` 期間停用。

```jsx 04-react-router/src/examples/91-navigation.jsx
import {
  Form,
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';
import { addNote, listNotes } from './notes-db.js';

/**
 * 進頁前讀清單。這裡多等 400 毫秒，讓讀取中留在畫面上。
 * 回傳值交給 useLoaderData。回傳 Promise 時路由器會等待。
 * @returns {Promise<{ notes: { id: string, title: string, done: boolean }[] }>}
 */
export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { notes: listNotes() };
};

/**
 * 接收目前路由的表單。同樣先等 400 毫秒。
 * formData 與 form.get 讀取標題，有字才寫入。回傳 null，這一則沒有用 useActionData。
 * @param {{ request: Request }} args
 * @returns {Promise<null>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const title = String(form.get('title') ?? '').trim();
  if (title) addNote(title);
  return null;
};

/**
 * Form method="post" 送到目前網址的 action，沒有 action 屬性。
 * 送出期間用 navigation.state 停用按鈕。
 */
export default function NavigationDemo() {
  /**
   * 讀取這條路由 loader 的回傳值。
   * @returns {{ notes: { id: string, title: string, done: boolean }[] }}
   */
  const { notes } = useLoaderData();
  /**
   * 路由器此刻的導覽。state 為 'idle'（閒置）、'loading'（正在跑 loader）或 'submitting'（正在跑 action）。
   * @returns {{ state: 'idle' | 'loading' | 'submitting' }}
   */
  const navigation = useNavigation();
  const [params] = useSearchParams();
  const nonce = Number(params.get('n') ?? '0');
  const pending =
    navigation.state === 'loading' || navigation.state === 'submitting';
  return (
    <section>
      <h1 className="text-2xl font-bold">91 useNavigation</h1>
      <p className="mt-3">狀態：{navigation.state}</p>
      {pending ? <p className="mt-3">讀取中</p> : null}
      <p className="mt-3">
        <Link
          className="text-teal-800 underline"
          to={`/demos/91-navigation?n=${nonce + 1}`}
        >
          重新讀取
        </Link>
      </p>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的筆記標題"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-40"
          disabled={navigation.state === 'submitting'}
        >
          新增
        </button>
      </Form>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </section>
  );
}
```

**解析**

- 點「重新讀取」或按「新增」時，標題下面的「狀態」會變成 loading 或 submitting，並出現「讀取中」，大約 400 毫秒後清單才換成新的結果，狀態回到 idle。
- 這段等待只寫在這一則的 `loader` 與 `action`。記憶體裡的讀取本身很快，專案不必複製這個 `setTimeout`。
- 送出期間按鈕停用，避免同一份表單連按兩次。

```diff 04-react-router/src/App.jsx
+import NavigationDemo, {
+  action as action91,
+  loader as loader91,
+} from './examples/91-navigation.jsx';
 // ...
           path: 'demos/90-fetcher',
           loader: loader90,
           action: action90,
           Component: FetcherDemo,
         },
+        {
+          path: 'demos/91-navigation',
+          loader: loader91,
+          action: action91,
+          Component: NavigationDemo,
+        },
         { path: 'demos/:slug', element: <DemoPage /> },
 // ...
```

**解析**

- 這條路由同時掛 `loader`、`action` 與 `Component`，路徑寫在 `demos/:slug` 前面。

{% note success %}
**換你試試：**
把這一則的等待改成 800 毫秒，看完再改回 400。兩處 `setTimeout` 一起改。
{% endnote %}

<details>
<summary>參考答案</summary>

```diff 04-react-router/src/examples/91-navigation.jsx
 // ...
-  await new Promise((resolve) => setTimeout(resolve, 400));
+  await new Promise((resolve) => setTimeout(resolve, 800));
 // ...
-  await new Promise((resolve) => setTimeout(resolve, 400));
+  await new Promise((resolve) => setTimeout(resolve, 800));
 // ...
```

看完把 800 改回 400。專案的記憶體 loader 不要加這段等待。

</details>

# 選讀：部署到 GitHub Pages

`pnpm build` 產生的 `dist` 就是一般靜態檔案，網站從 `/` 開始，首頁是 `dist/index.html`。放上 GitHub Pages 後，從首頁點左側目錄進 `/demos/01-hello` 都正常。問題出在直接打開或重新整理 `/demos/01-hello`：GitHub Pages 是純靜態主機，會去找 `demos/01-hello` 這個檔案，找不到就回 404，React 根本沒機會載入。開發時沒遇過，是因為 Vite 的開發伺服器對未知路徑一律回 `index.html`。

GitHub Pages 不能設定「其他路徑都改走 `index.html`」的規則，常見的做法有兩種：

- 用 `404.html` 接住：找不到檔案時 GitHub 會回傳 `404.html`。讓它的內容和 `index.html` 一樣，React 照樣載入，React Router 再依網址畫出那一頁。
- 改用 `createHashRouter`：路徑放在 `#` 後面，伺服器永遠只收到首頁的請求。同一份路由表，只換建立路由器的函式。

## 404.html

**觀念**

每次 `pnpm build` 之後，把 `dist/index.html` 複製成 `dist/404.html`，再把 `dist` 部署上去。打包後的檔名帶有雜湊，所以每次建置都要重新複製，不能沿用舊的那份。

```bash
cp dist/index.html dist/404.html
```

**解析**

- 每次 `pnpm build` 之後，把剛產出的 `dist/index.html` 複製成 `dist/404.html`，再部署 `dist`。

也可以寫進 `package.json`，建置完自動複製：

```diff 04-react-router/package.json
 "scripts": {
-  "build": "vite build",
+  "build": "vite build && cp dist/index.html dist/404.html",
 // ...
```

**解析**

- 之後每次 `pnpm build` 會自動複製，不必再手打那道指令。
- 這份 `404.html` 回傳時，HTTP 狀態碼仍是 404，但瀏覽器照樣畫出頁面，使用者看到的就是正確的那一則。

{% note info %}
**網址多一段子路徑時：**
用 `帳號.github.io` 本身或自訂網域，網站就從 `/` 開始，什麼都不用設。若是一般倉庫的專案頁，網址會是 `https://帳號.github.io/倉庫名稱/`，多了 `/倉庫名稱/` 這段。這時要在 `vite.config.js` 設 `base: '/倉庫名稱/'`，讓打包後的檔案去這段底下找。路由的 `basename` 已經寫在 `createBrowserRouter` 的第二個參數，值是 `import.meta.env.BASE_URL.replace(/\/$/, '')`。`base` 一改，`BASE_URL` 跟著變，路由也從這段算起。元件裡的 `to="/demos/01-hello"` 都不用改。
{% endnote %}

{% note success %}
**換你試試：**
在 `04-react-router` 執行 `pnpm build`，再執行 `pnpm preview`，打開首頁後點進任一則，再直接重新整理，看看會發生什麼事。
{% endnote %}

<details>
<summary>參考答案</summary>

`pnpm preview` 跟開發伺服器一樣會把未知路徑改送 `index.html`，所以重新整理也正常。換到 GitHub Pages 就不會這樣，所以才需要 `404.html`。

</details>

## createHashRouter

`createHashRouter` 把目前頁面放在 `#` 後面，例如 `/#/demos/01-hello`。伺服器收到的路徑只有 `#` 前面那一段，靜態主機只要能打開 `index.html` 即可。代價是網址比較不好讀。`App` 已經回傳 `RouterProvider`，不能再在外面加 `HashRouter`。要試井字號網址，把同一份路由表的 `createBrowserRouter` 暫時換成 `createHashRouter`。平常完成版仍用 `createBrowserRouter`。

**語法**

```jsx
/**
 * 與 createBrowserRouter 同一份路由表，網址改放在井字號後面。
 * @param {object[]} routes 路由物件陣列
 * @param {object} [opts]
 * @param {string} [opts.basename] 基底路徑，可省略
 * @returns {object} 交給 RouterProvider 的路由器
 */
const router = createHashRouter(routes, { basename });
```

**解析**

- 與 `createBrowserRouter` 使用同一份路由表，只是網址改放在井字號後面。
- 仍交給 `RouterProvider`，不必另外包 `HashRouter`。

**觀念**

下面只換建立路由器的函式，路由表、目錄與 `to` 都維持原樣。井字號後面的變化不會向伺服器要一份新文件，所以不必為 `/demos/01-hello` 準備 `404.html`。這是觀念示範，沒有另外的練習檔。看完改回 `createBrowserRouter`。

```diff 04-react-router/src/App.jsx
-import { createBrowserRouter, RouterProvider } from 'react-router';
+import { createHashRouter, RouterProvider } from 'react-router';
 // ...
-const router = createBrowserRouter([
+const router = createHashRouter([
 // ...
```

**解析**

- `RouterProvider` 不用換。不能在 `App` 外面再包 `HashRouter`，因為 `App` 已經把路由器畫出來了。
- 路由物件與 `basename` 留著。第一則的網址會像 `http://localhost:5173/#/demos/01-hello`。
- 重新整理仍停在該則。做完把函式改回 `createBrowserRouter`。

{% note success %}
**換你試試：**
對照兩種網址：`createBrowserRouter` 的 `/demos/01-hello`，以及 `createHashRouter` 的 `/#/demos/01-hello`。目錄的 `to` 都不必改。看完改回 `createBrowserRouter`。
{% endnote %}

<details>
<summary>參考答案</summary>

`to` 寫的是路由路徑。兩種路由器都會把它接到自己的網址形式。平常完成版留在 `createBrowserRouter`。只有在靜態主機無法用 `404.html` 回到同一頁時，才暫時改看 `createHashRouter`。

</details>

# 本篇重點回顧

- `04-react-router` 由 `03-react` 複製後再裝 `react-router`。課堂用資料模式的 `createBrowserRouter` 與 `RouterProvider`；宣告式與框架模式只留作選讀對照。
- 同一份專案把按鈕切換改成練習筆記：`MainLayout` 左側是目錄，主區是 `Outlet`，同層的 `ScrollRestoration` 負責換頁捲動。
- 目錄資料在 `src/data/catalog.js`，依主題分組；選單用 `NavLink` 的 `isActive`，連回首頁的那一條要加 `end`。
- 單則筆記的路徑是 `/demos/:slug`，`useParams` 取出字串 slug，slug 與範例檔名去掉 `.jsx` 相同。篩選用 `?q=` 與 `useSearchParams`。星號 `*` 放在版型裡時，找不到仍留著目錄。
- `loader` 在畫面前讀資料，頁面用 `useLoaderData` 接。`Form method="post"` 進到 `action`；`87-action` 用 `useActionData` 顯示 `createItem` 回傳的項目，或依欄位回傳的錯誤。後面幾則寫入後，`loader` 會自動重跑。
- 編輯表單送出後，`action` 用 `updateItem` 寫入標題，再 `return redirect('/demos/88-redirect-list')`。列表的 `loader` 接著重跑，畫面上是新標題。
- 明細找不到時 `throw data(..., { status: 404 })`，頁面元件不渲染，由這條路由的 `errorElement` 用 `useRouteError` 讀取。沒有指定 `errorElement` 時，錯誤往上找最近一層，只替換那一層以下的畫面。`useFetcher` 送出但不換頁；`useNavigation` 讀取讀取中與送出中。
- `demos/86-loader` 到 `demos/91-navigation` 要寫在 `demos/:slug` 前面。91 的 400 毫秒等待只為了看得到 pending，記憶體讀取不必複製。
- 選讀：`useLocation`、GitHub Pages 的 `404.html`，以及 `createHashRouter`。網址有子路徑時才需要 `base` 與 `basename`。

# 專有名詞中英對照

下面依這篇的大章收集會拿去搜尋的詞。中文在前，括號裡是英文關鍵字，順序跟文章第一次出現時一樣。

## 認識路由

這一組是網址怎麼對上畫面，以及課堂用的資料模式。宣告式、`BrowserRouter`、`Routes`、`Route` 是選讀對照。框架模式也是選讀。

- 路由（routing）
- 資料模式（data mode）
- createBrowserRouter
- 資料路由器（data router）
- RouterProvider
- 捲動還原（ScrollRestoration）
- 換頁前讀取（loader）
- useLoaderData
- 表單送出（action）
- 錯誤頁（errorElement）
- 連結（Link）
- 舊套件入口（react-router-dom）
- 選讀對照：宣告式（declarative mode）
- 選讀對照：瀏覽器路由（BrowserRouter）
- 選讀對照：路由表（Routes）
- 選讀對照：路由（Route）
- 框架模式（framework mode）
- Remix
- 伺服器端渲染（SSR）
- 程式碼切分（code splitting）
- 搜尋引擎最佳化（SEO）
- 檔案路由（file-based routing）
- HydratedRouter
- Next.js
- 路由設定（routes.ts）
- 路由模組（route module）
- 路由元件屬性（Route.ComponentProps）

## 啟用路由

這一組是把複製來的專案接上資料模式、路由表、版型與目錄資料。`basename` 是 `createBrowserRouter` 的第二個參數。

- 歷史 API（History API）
- 索引路由（index route）
- 路徑（path）
- 代稱（slug）
- 元素（element）
- 子路由（children）
- 插槽（Outlet）
- 巢狀路由（nested route）
- 基底路徑（basename）
- BASE_URL

## 連結與選單

這一組從連結、選單、路徑參數、查詢參數排到選讀的位置物件。`useNavigate` 用在上一則、下一則這種按鈕。

- 目標路徑（to）
- 導覽連結（NavLink）
- 使用中（isActive）
- 完全符合（end）
- 路徑參數（param）
- useParams
- 導覽函式（useNavigate）
- 查詢參數（search params）
- useSearchParams
- 設定查詢（setSearchParams）
- 位置（location）
- useLocation
- 路徑名稱（pathname）
- 查詢字串（search）
- 雜湊（hash）
- 紀錄鍵（key）

## 讀取與送出資料

這一組是路由上的讀取與送出。`Form` 是元件，`data()` 用來丟出帶狀態碼的路由錯誤。

- 雜湊路由器（createHashRouter）
- 記憶體路由器（createMemoryRouter）
- 換頁前讀取（loader）
- useLoaderData
- 表單送出（action）
- 表單（Form）
- useActionData
- 重新驗證（revalidation）
- 重新導向（redirect）
- 路由錯誤資料（data()）
- 錯誤元件（errorElement）
- 路由錯誤回應（isRouteErrorResponse）
- useRouteError
- 不換頁的送出（useFetcher）
- 導覽狀態（useNavigation）

## 找不到的頁面

這一組是星號路徑的兩種放法。差別在 404 還包不包得住版型與目錄。

- 星號路由（splat route）
- 分散式星號路由（nested splat route）
- 集中式星號路由（central splat route）

## 選讀：部署到 GitHub Pages

這一組是讓靜態主機接住子路徑的做法。`base` 管打包；`basename` 沿用前面 `createBrowserRouter` 的第二個參數。

- 建置基底（base）
- 雜湊路由（HashRouter）
