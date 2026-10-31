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

網址決定現在畫哪一頁。這一篇用 React Router 8 的宣告式寫法，從 `react-router` 引入，把路由表、連結、路徑參數與查詢參數接起來。讀寫沿用上一篇的 `getItems` 與 `createItem`，最後把用狀態切頁的畫面改成多頁。

<!-- more -->

# 認識路由

這一章先用狀態把選單與主畫面配在一起，看重新整理與網址各自少了什麼，再說明為什麼要另外找路由套件、React Router 負責什麼，以及它的三種接法。可跑的路由表從下一章才開始寫。

## 狀態切頁

選單與主畫面可以先放在同一個元件裡，用一個狀態決定現在畫哪一塊。按鈕改的是 `page`，主區就在首頁與清單之間切換。先看這份可跑的元件怎麼配在一起，再看重新整理與網址會停在哪裡。

```jsx 04-react-router/src/demos/01-state-pages.jsx
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

按下「清單」之後，主區換成三個標題，網址列仍停在原來的路徑。每次重新整理，元件重新掛上，`useState` 又從起始值 `'home'` 開始，畫面就從最初的首頁重新來過。網址也無法區分現在是哪一個畫面：清單沒有自己的地址，所以無法把這一頁分享出去、收成書籤，瀏覽器的上一頁也回不到清單，因為歷史紀錄裡沒有這一筆。

{% note success %}
**換你試試：**
把起始值改成 `'list'`。重新整理後應先看到三個標題，而不是「首頁」。
{% endnote %}

<details>
<summary>參考答案</summary>

只改起始值。按鈕與資料留著。

```diff 04-react-router/src/demos/01-state-pages.jsx
 // ...
 export default function StatePages() {
-  const [page, setPage] = useState('home');
+  const [page, setPage] = useState('list');
 // ...
```

</details>

## React Router

React 是專注於如何有效率地把畫面渲染到 DOM 的函式庫，因此保持輕量。像「由網址驅動畫面」的路由並不內建，而是從 React 生態系另外取得。

React Router 是最普遍的路由套件。它把網址對應到元件，並提供 `Link` 與導覽用的 Hook。這套對應有三種接法，下一節先看它們差在哪裡。

## 三種模式

上一節說的那套對應有三種接法，這門課只用宣告式。下面先看三種差在哪，簽名則用來認得文件裡的另外兩種，不另做一套專案。

**一覽**

- 宣告式：元件樹裡寫路由表。`BrowserRouter` 聽網址，它是包住子樹的元件，不另外交一個 router 物件。
- 資料模式：`createBrowserRouter` 接收路由陣列與選項，回傳路由器。`RouterProvider` 負責把它畫出來。進頁前的讀取可以寫在路由上，元件就比較少自己 `useEffect`。
- 框架模式：路由常常對到檔案路徑，建置工具會一併處理伺服器渲染。它比資料模式多一層專案慣例。

{% mermaid graph LR %}
  urlNode["網址"] --> decNode["宣告式 BrowserRouter"]
  urlNode --> dataNode["資料模式 createBrowserRouter"]
  urlNode --> frameNode["框架模式"]
  style urlNode fill:#e3f2fd
  style decNode fill:#e8f5e9
  style dataNode fill:#fff3e0
  style frameNode fill:#f3e5f5
{% endmermaid %}

```jsx
/**
 * 進這條路由之前讀資料。這門課不使用。
 * @returns {Promise<object>}
 */
const loader = async () => {
  // ...
};

/**
 * 一條資料模式的路由物件。
 * @param {string} [path] 路徑
 * @param {function} Component 對上時要渲染的元件
 * @param {function} [loader] 上面的讀取函式
 */
const route = { path, Component, loader };

/**
 * 建立資料模式的路由器。從 react-router 引入。
 * @param {Array} routes 路由物件陣列
 * @param {object} [opts] 選項
 * @param {string} [opts.basename] 基底路徑，可省略
 * @returns {object} router 交給 RouterProvider 的路由器
 */
const router = createBrowserRouter(routes, opts);

/**
 * 把資料模式的路由器畫進樹裡。從 react-router/dom 引入。
 * @param {object} props
 * @param {object} props.router createBrowserRouter 的回傳值
 * @returns {React.ReactElement}
 */
const provider = <RouterProvider router={router} />;
```

**觀念**

v8 的分法是：`RouterProvider` 與 `HydratedRouter` 從 `react-router/dom` 引入，其餘從 `react-router` 引入。課堂會用到的 `BrowserRouter`、`Routes`、`Route`、`Outlet`、`Link`、`NavLink` 與各個 Hook 都屬於其餘那一組，所以寫 `from 'react-router'`。`createBrowserRouter` 也從 `react-router` 引入，但回傳的是路由器物件，不是直接放進 JSX 的元件。

{% note info %}
**舊的套件名稱**
v8 已移除套件 `react-router-dom`。v7 時它只是相容用的再出口。不要再安裝那個套件，也不要照舊文件的入口去引入。
{% endnote %}

{% note info %}
**Next.js 的路由**
Next.js 有自己內建的路由驅動（以檔案結構為基礎的 file-based routing，檔案路由），不需要 React Router。React Router 適用於一般 React 與 Vite 專案。
{% endnote %}

**解析**

- 宣告式的元件從 `react-router` 引入。這門課的路由表、連結與 Hook 都走這個入口。
- `createBrowserRouter` 也從 `react-router` 引入。它回傳路由器，要交給 `RouterProvider`，不能自己當版型。
- `RouterProvider` 與 `HydratedRouter` 從 `react-router/dom` 引入。其餘 API 不要改去那個路徑。
- 這門課不建立資料模式的專案，也不使用 `loader` 與 `action`。

{% note success %}
**換你試試：**
寫出 `createBrowserRouter` 與 `RouterProvider` 各從哪個路徑引入。`HydratedRouter` 跟著哪一個走，也一起寫上。
{% endnote %}

<details>
<summary>參考答案</summary>

`createBrowserRouter` 從 `react-router` 引入。`RouterProvider` 與 `HydratedRouter` 從 `react-router/dom` 引入。

```jsx
import { createBrowserRouter } from 'react-router';
import { HydratedRouter, RouterProvider } from 'react-router/dom';
```

</details>

下一章啟用路由，用宣告式把這個套件接到入口與第一張路由表。

# 啟用路由

這一章把宣告式路由接到畫面上。先裝套件、在入口包住 `BrowserRouter`，再寫一張只有首頁的路由表，最後用 `getItems` 把清單放進一個路徑。連結的差別、參數與找不到的頁面，都等這張表先能畫出一頁。

## 安裝與入口

套件要先在專案裡，入口才找得到 `BrowserRouter`。這一節只做安裝與入口。路由表的內容在下一節，頁面元件也等到表寫好再加。

### 步驟 1：安裝套件

在練習專案裡用 pnpm 安裝。React 維持 19，路由套件用 8。Node、nvs 與 pnpm 前面幾天已經裝過，這裡不要重裝。若這個資料夾的依賴已經裝好，而且 `package.json` 裡有 `react-router` 8，下面兩行都可以略過，直接做下一步。

```bash
cd 04-react-router
pnpm install
pnpm add react-router@8
```

{% note info %}
**已安裝過可跳過**
課堂這份專案已經寫入 `react-router` 8 與 React 19。你的電腦裡若裝過，確認版本即可，不必為了重跑指令再裝一次。
{% endnote %}

### 步驟 2：BrowserRouter

`main.jsx` 在嚴格模式裡面加上 `BrowserRouter`。元件仍從 `#root` 畫起，只是多了一層知道網址的元件。沒有這一層，後面的 `Routes` 與 Hook 都讀不到現在的路徑。

```jsx
/**
 * 用瀏覽器的 History API 聽網址，包住會讀網址的那棵元件樹。
 * @param {object} props
 * @param {string} [props.basename] 基底路徑，可省略。開發時通常不寫
 * @param {React.ReactNode} props.children 路由表與其頁面
 * @returns {React.ReactElement}
 */
const router = <BrowserRouter>{/* children */}</BrowserRouter>;
```

**觀念**

`BrowserRouter` 使用瀏覽器的 History API。網址是一般路徑，例如 `/items`，不是井字號後面的片段。它必須包住所有會讀網址的元件，所以放在 `App` 外面、嚴格模式裡面。開發伺服器已經會把未知路徑回傳同一份 `index.html`，重新整理子路徑也不會變成找不到檔案。`basename` 現在先不寫，路徑從網站根目錄算起。

```jsx 04-react-router/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

這一則還沒有路由表，畫面要等下一節的 `App` 接上才會出現「路由已經接上」。

**解析**

- 引入來源是 `react-router`。不要再裝一套 `react-router-dom` 來拿同樣的元件。
- `BrowserRouter` 放在 `App` 外面，整棵樹才讀得到網址。
- 嚴格模式仍包在最外層。它不取代路由，也不會幫你對路徑。
- 這一則還沒有 `basename`。本機開發的路徑從網站根目錄算起。

{% note success %}
**換你試試：**
在 `BrowserRouter` 寫上 `basename=""`。開發時前綴仍是網站根目錄，首頁路徑還是 `/`。
{% endnote %}

<details>
<summary>參考答案</summary>

空字串跟預設一樣，都是從網站根目錄算。選讀裡才會改成倉庫名稱。

```diff 04-react-router/src/main.jsx
 // ...
-    <BrowserRouter>
+    <BrowserRouter basename="">
       <App />
 // ...
```

</details>

## 路由表與版型

`Routes` 看現在的網址，畫出第一個對上的 `Route`。父路由可以包住子路由，子路由的畫面出現在父元件的 `Outlet`。這一節先讓 `/` 畫出版型與首頁，清單與其他路徑後面再補進同一張表。

**一覽**

- `Routes` 是路由表。它比較網址，渲染第一個對上的子路由，沒有對上就什麼都不畫。
- `Route` 的 `path` 是要對的路徑，`element` 是對上時畫出的元素。`index` 表示跟父路徑同一個網址，這種路由不能再寫 `path`。
- `Outlet` 是版型裡子路由出現的位置。沒有它，子路由即使對上了，主區仍是空的。

{% mermaid graph LR %}
  urlNode["網址"] --> tableNode["Routes 對上 Route"]
  tableNode --> layoutNode["版型"]
  layoutNode --> slotNode["Outlet 畫出子頁"]
  style urlNode fill:#e3f2fd
  style tableNode fill:#fff3e0
  style layoutNode fill:#e3f2fd
  style slotNode fill:#e8f5e9
{% endmermaid %}

### 路由表

父路由的路徑是 `/`，元件是版型。`index` 那一條不另外接路徑，所以打開 `/` 時，版型中間是首頁。後面的清單會寫成 `path="items"`，跟父路徑接成 `/items`。

```jsx
/**
 * 路由表。看目前網址，畫出第一個對上的 Route。
 * @param {object} props
 * @param {React.ReactNode} props.children 若干 Route
 * @returns {React.ReactElement}
 */
const table = <Routes>{/* Route */}</Routes>;

/**
 * 一條路徑與要畫的元素。index 為 true 時不要再寫 path。
 * @param {object} props
 * @param {string} [props.path] 路徑。跟父路徑接在一起
 * @param {boolean} [props.index] 為 true 時對上父路由自己的網址
 * @param {React.ReactElement} props.element 對上時畫出的元素，不是元件函式
 * @returns {React.ReactElement|null}
 */
const route = <Route path="/" element={<Layout />} />;
```

**觀念**

子路由要寫在父路由的標籤中間，才會嵌進父層的 `Outlet`。`element` 傳入的是已經建立的元素，例如 `<HomePage />`，不是 `HomePage` 這個函式。路徑用小寫，根路徑寫成斜線。

```jsx 04-react-router/src/App.jsx
import { Route, Routes } from 'react-router';
import Layout from './demos/03-layout.jsx';
import HomePage from './demos/02-home.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}
```

```jsx 04-react-router/src/demos/02-home.jsx
export default function HomePage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">首頁</h1>
      <p className="mt-2">路由已經接上。</p>
    </section>
  );
}
```

網址是 `/` 時，主區標題是首頁，下面一行是「路由已經接上」。別的路徑目前還沒有對應的頁。

**解析**

- `index` 不能再寫 `path`。它就是父路由自己的網址。
- 子路由寫在父路由的標籤中間，才會嵌進父層的 `Outlet`。
- 路徑用小寫。這一則的根路徑是斜線。
- `element` 傳入已經建立的元素，不是元件函式本身。

{% note success %}
**換你試試：**
把首頁標題改成「練習首頁」。路由結構留著。
{% endnote %}

<details>
<summary>參考答案</summary>

標題在頁面元件，不在路由表。

```diff 04-react-router/src/demos/02-home.jsx
 // ...
-      <h1 className="text-2xl font-bold">首頁</h1>
+      <h1 className="text-2xl font-bold">練習首頁</h1>
 // ...
```

</details>

### 插槽

版型負責頁首與主區的外框。`Outlet` 的位置就是子路由的頁面。沒有 `Outlet` 時，路由即使對上了，主區仍是空的，因為版型沒有留洞。

```jsx
/**
 * 子路由畫出來的位置。沒有 children，畫什麼由路由表決定。
 * @returns {React.ReactElement|null}
 */
const slot = <Outlet />;
```

**觀念**

版型先畫頁首，再在 `main` 裡放 `Outlet`。首頁的標題會出現在頁首下面，而不是取代整頁。頁首這一則只有「練習站」三個字，還沒有連結。

```jsx 04-react-router/src/demos/03-layout.jsx
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-3xl gap-4 px-4 py-3">
          <span className="font-semibold">練習站</span>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
```

打開 `/` 時，上方是練習站，主區是首頁。兩塊來自版型與首頁兩個元件。

**解析**

- `Outlet` 沒有 children。子路由由路由表決定，不由版型自己挑。
- 版型不要再用狀態猜現在是哪一頁。網址已經說明了。
- 主區的寬度與背景放在版型，各頁就不必重複。
- 頁首這一則還沒有連結。`Link` 與 `NavLink` 在下一章。

{% note success %}
**換你試試：**
在 `Outlet` 上面加一行「主區」。首頁標題仍應出現在這行下面。
{% endnote %}

<details>
<summary>參考答案</summary>

那一行屬於版型，每一頁都會看到。首頁元件不用改。

```diff 04-react-router/src/demos/03-layout.jsx
 // ...
       <main className="mx-auto max-w-3xl px-4 py-6">
+        <p className="mb-3 text-sm text-stone-500">主區</p>
         <Outlet />
 // ...
```

</details>

## 清單頁

清單把上一篇讀過的三筆畫成連結。欄位是 `id`、`title`、`place`、`days`、`price`，這一頁先顯示標題、地點與價格。讀取用 `getItems`，它讀本機的 `/data/items.json`。每一列的 `Link` 連到 `/items/` 加上 id，詳情頁再依這段路徑把那一筆找出來。

**觀念**

`getItems` 在第一次畫完後執行，失敗就留空陣列。文字包在 `Link` 裡，`to` 是目標路徑。`Link` 會畫出 `<a>`，點了換路由，不整頁重載。它和 `NavLink` 的差別、選單要不要加 `end`，下一章再拆。這一頁先把 id 放進路徑。三筆資料長這樣：

```json 04-react-router/public/data/items.json
[
  {
    "id": 1,
    "title": "台北城市漫遊",
    "place": "台北",
    "days": 3,
    "price": 12800
  },
  {
    "id": 2,
    "title": "花蓮山海三日",
    "place": "花蓮",
    "days": 3,
    "price": 15900
  },
  {
    "id": 3,
    "title": "京都紅葉散步",
    "place": "京都",
    "days": 5,
    "price": 42800
  }
]
```

```jsx 04-react-router/src/demos/04-list.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getItems } from '../api/fake-api.js';

export default function ListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setItems(await getItems());
      } catch {
        setItems([]);
      }
    };
    load();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold">清單</h1>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link className="text-teal-800 underline" to={'/items/' + item.id}>
              {item.title} {item.place} {item.price}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

路由表補上 `path="items"` 之後，打開 `/items` 會看到台北城市漫遊、花蓮山海三日、京都紅葉散步。三列都是連結。

**解析**

- 資料欄位是 `id`、`title`、`place`、`days`、`price`。清單先用標題、地點與價格。
- 讀取呼叫 `getItems`。它讀的是本機 `/data/items.json`，不是每一頁自己再寫一次 `fetch`。
- `key` 仍用 `item.id`。連結只負責換頁，不取代 key。
- `to` 把 id 接在 `/items/` 後面。詳情頁再用這個字串去對資料。

{% note success %}
**換你試試：**
連結文字在價格後面加上「元」。第一列應變成台北城市漫遊 台北 12800 元。
{% endnote %}

<details>
<summary>參考答案</summary>

只改連結裡的文字。讀取與路徑留著。

```diff 04-react-router/src/demos/04-list.jsx
 // ...
-              {item.title} {item.place} {item.price}
+              {item.title} {item.place} {item.price} 元
 // ...
```

</details>

# 連結與選單

換頁用連結，選單用能表示使用中的 `NavLink`。路徑上的 id 用 `useParams` 讀，送出成功之後要用程式離開這一頁時用 `useNavigate`。問號上的一小段資訊用 `useSearchParams`。整段位置物件放在選讀。

## 連結

換頁用連結，不用按鈕偷偷改狀態。`Link` 產生一個 `<a>`，點了會換路由，不會整頁重載。`NavLink` 多告訴你這一條是否正對上現在的網址，用來做選單的使用中樣式。首頁要加 `end`，否則所有以斜線開頭的網址都會把它算成使用中。

**一覽**

- `Link` 的 `to` 是目標路徑。它畫出連結，不告訴你自己是不是使用中，用在「看清單」這種一次性的入口。
- `NavLink` 同樣會換頁。`className` 可以收到 `isActive`。`end` 要求路徑完全符合，避免首頁在每個子路徑都亮著。

{% mermaid graph LR %}
  clickNode["點 Link 或 NavLink"] --> historyNode["推一筆歷史"]
  historyNode --> matchNode["路由表對上"]
  style clickNode fill:#e3f2fd
  style historyNode fill:#fff3e0
  style matchNode fill:#e8f5e9
{% endmermaid %}

### Link

首頁放一條到清單的連結。`to="/items"` 是絕對路徑，從網站根目錄算。不要寫成 `items`，除非你確定相對的是現在這層。首頁在根路徑，兩種寫法剛好一樣，站內主要連結仍用斜線開頭。

```jsx
/**
 * 產生連結。點了換路由，不整頁重載。
 * @param {object} props
 * @param {string} props.to 目標路徑
 * @param {string} [props.className] 類別字串
 * @param {React.ReactNode} props.children 連結文字
 * @returns {React.ReactElement}
 */
const link = <Link to="/items">看清單</Link>;
```

**觀念**

一般「去某一頁」的入口用 `Link`，不要用 `onClick` 去呼叫導覽函式。連結可以被開進新分頁，輔助工具也認得它是 `<a>`。選單要標出使用中時才改用 `NavLink`。

```jsx 04-react-router/src/demos/05-home-link.jsx
import { Link } from 'react-router';

export default function HomeLinkPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">首頁</h1>
      <p className="mt-2">
        <Link className="text-teal-800 underline" to="/items">
          看清單
        </Link>
      </p>
    </section>
  );
}
```

點「看清單」之後，網址變成 `/items`。若清單那條路由還沒接上，主區會空著，但網址已經變了。

**解析**

- `Link` 畫出來是 `<a>`。可以開新分頁，也可以讓輔助工具把它當連結。
- 不要用 `onClick` 配 `navigate` 來做一般選單。那會少掉連結的預設行為。
- `className` 這裡是字串。這一則不需要知道自己是否為使用中。
- `to="/items"` 從網站根目錄算。站內主要連結用斜線開頭。

{% note success %}
**換你試試：**
再加一條連結到 `/search`，文字是搜尋。看清單那條留著。
{% endnote %}

<details>
<summary>參考答案</summary>

兩條都是 `Link`。路徑不同，元件相同。

```diff 04-react-router/src/demos/05-home-link.jsx
 // ...
-      <p className="mt-2">
+      <p className="mt-2 flex gap-4">
         <Link className="text-teal-800 underline" to="/items">
           看清單
         </Link>
+        <Link className="text-teal-800 underline" to="/search">
+          搜尋
+        </Link>
       </p>
 // ...
```

</details>

### NavLink

選單用 `NavLink`。對上的那一條加底線與深色，其餘用一般文字。首頁加上 `end`，停在 `/items` 時首頁不會一起亮。

```jsx
/**
 * 依這一條是否對上現在的網址，回傳 class 字串。
 * @param {object} state 路由比對的結果
 * @param {boolean} state.isActive 路徑對上時為 true
 * @returns {string}
 */
const itemClass = ({ isActive }) =>
  isActive ? 'text-teal-800 underline' : 'text-stone-700';

/**
 * 會表示使用中的連結。
 * @param {object} props
 * @param {string} props.to 目標路徑
 * @param {boolean} [props.end] 為 true 時必須完全符合，不能只對上前綴
 * @param {function|string} [props.className] 字串，或上面的 itemClass
 * @param {React.ReactNode} props.children 連結文字
 * @returns {React.ReactElement}
 */
const nav = (
  <NavLink to="/" end className={itemClass}>
    首頁
  </NavLink>
);
```

**觀念**

`className` 收到 `{ isActive }`。回傳的字串就是這一條的類別。四條對應首頁、清單、搜尋與新增。清單先不加 `end`，所以停在 `/items/1` 時「清單」仍會亮，詳情還算清單的下一層。

```jsx 04-react-router/src/demos/06-nav.jsx
import { NavLink } from 'react-router';

const itemClass = ({ isActive }) =>
  isActive ? 'text-teal-800 underline' : 'text-stone-700';

export default function SiteMenu() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-3xl gap-4 px-4 py-3">
        <NavLink to="/" end className={itemClass}>
          首頁
        </NavLink>
        <NavLink to="/items" className={itemClass}>
          清單
        </NavLink>
        <NavLink to="/search" className={itemClass}>
          搜尋
        </NavLink>
        <NavLink to="/new" className={itemClass}>
          新增
        </NavLink>
      </nav>
    </header>
  );
}
```

停在首頁時，只有「首頁」有底線。點到清單，底線跟著過去，首頁會滅掉。

**解析**

- `end` 要求路徑整個對上，不是只對上前綴。首頁需要它。
- 清單沒有寫 `end` 時，`/items/1` 也會讓「清單」亮起。詳情仍屬於清單，這一則可以接受。
- `isActive` 由路由比對而來。不要自己用 `window.location` 再判斷一次。
- 四條路徑對應首頁、清單、搜尋與新增。使用中的樣式只看比對結果。

{% note success %}
**換你試試：**
再給「清單」加上 `end`。停在 `/items/1` 時，清單不該亮。
{% endnote %}

<details>
<summary>參考答案</summary>

`end` 與首頁那條相同。搜尋與新增不用加，它們沒有更深的路徑。

```diff 04-react-router/src/demos/06-nav.jsx
 // ...
-        <NavLink to="/items" className={itemClass}>
+        <NavLink to="/items" end className={itemClass}>
           清單
 // ...
```

</details>

## 路徑參數

路徑裡的 `:id` 是路徑參數，用 `useParams` 讀回來。送出成功之後要離開這一頁，用 `useNavigate` 回傳的函式。使用者自己點的入口仍用 `Link` 或 `NavLink`，不要為了換頁就改成導覽函式。

**一覽**

- `useParams` 回傳一個物件。鍵是路徑上冒號後面的名字，值永遠是字串，沒有對上的鍵不會出現。
- `useNavigate` 回傳一個函式。引數可以是路徑，或 `-1` 這種在歷史紀錄裡移動的步數。它用在送出成功之後，不用來做選單。

{% mermaid graph LR %}
  linkNode["Link 換頁"] --> paramsNode["useParams 讀 id"]
  formNode["送出成功"] --> navNode["useNavigate"]
  style linkNode fill:#e3f2fd
  style paramsNode fill:#fff3e0
  style formNode fill:#e3f2fd
  style navNode fill:#e8f5e9
{% endmermaid %}

### useParams

清單的每一列連到 `/items/` 加上 id。詳情頁用參數在 `getItems` 拿到的陣列裡找那一筆。找不到時寫一句話，不要丟出空白。本機 JSON 的 id 是數字，參數是字串，所以用 `String(row.id)` 比較。

```jsx
/**
 * 讀取路徑上冒號後面的參數。值一律是字串。
 * @returns {object} params
 *   id：對 path="items/:id" 來說，就是網址上那一段
 */
const { id } = useParams();
```

**觀念**

對上就畫標題、地點、天數與價格，對不上就說找不到。讀取失敗是另一句話，跟「檔案成功但沒有這筆」分開。不要改呼叫 `getItem`：那支函式打的是另一個服務，編號對不上本機這三筆。

```jsx 04-react-router/src/demos/07-params.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getItems } from '../api/fake-api.js';

export default function DetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [item, setItem] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const items = await getItems();
        setItem(items.find((row) => String(row.id) === id) ?? null);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };
    load();
  }, [id]);

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;
  if (!item) return <p>找不到這筆</p>;

  return (
    <article>
      <h1 className="text-2xl font-bold">{item.title}</h1>
      <p className="mt-2">
        {item.place} {item.days} 天 {item.price}
      </p>
    </article>
  );
}
```

打開 `/items/1` 應看到台北城市漫遊、台北、3 天、12800。打開 `/items/9` 應看到找不到這筆。

**解析**

- 依賴寫了 `id`。從一筆改到另一筆時，效果會再讀一次。
- 比較前把資料的 id 轉成字串。`1 === '1'` 在 JavaScript 裡是假。
- 找不到不是讀取失敗。檔案成功了，只是沒有那一筆。
- 這裡用 `getItems` 再在陣列裡找。不要改呼叫 `getItem`，那支函式的編號對不上這三筆。

{% note success %}
**換你試試：**
詳情再顯示一行「編號」加上 id。第一筆那一頁應看得到編號 1。
{% endnote %}

<details>
<summary>參考答案</summary>

參數已經在 `id`。多一行文字即可，不必再讀一次網址。

```diff 04-react-router/src/demos/07-params.jsx
 // ...
       <h1 className="text-2xl font-bold">{item.title}</h1>
+      <p className="mt-2">編號 {id}</p>
       <p className="mt-2">
 // ...
```

</details>

### useNavigate

新增頁在 `createItem` 成功之後回到清單。這是程式要換頁，不是使用者點了一條連結，所以用 `useNavigate`。一般「去清單」的入口仍留在 `Link`。

```jsx
/**
 * 取得導覽函式。要寫在元件最上層。
 * @returns {function} navigate
 */
const navigate = useNavigate();

/**
 * 換到另一個網址，或在歷史紀錄裡前進後退。
 * @param {string|number} to 路徑，或 -1 這種相對步數
 * @param {object} [options] 選項
 * @param {boolean} [options.replace] 為 true 時替換目前這筆歷史，而不是再推一筆
 * @returns {void}
 */
navigate(to, options);
```

**觀念**

表單先 `preventDefault`，再呼叫 `createItem`，成功才 `navigate('/items')`。引數是路徑。要回到上一頁可以傳 `-1`，這一則用明確路徑，使用者才知道會落到清單。`replace: true` 會改掉目前這筆歷史，而不是再推一筆。這一則不需要替換，所以不傳選項。

```jsx 04-react-router/src/demos/08-form.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createItem } from '../api/fake-api.js';

export default function FormPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      await createItem({
        title,
        place,
        days: Number(days),
        price: Number(price),
      });
      navigate('/items');
    } catch {
      setMessage('送出失敗');
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="標題"
      />
      <input
        value={place}
        onChange={(event) => setPlace(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="地點"
      />
      <input
        value={days}
        onChange={(event) => setDays(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="天數"
      />
      <input
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="價格"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出並回到清單
      </button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
```

填了標題再送出，請求成功後網址變成 `/items`。`createItem` 打到練習用的假 API，本機 JSON 不會多一筆，清單仍是原來三筆。

**解析**

- `useNavigate` 寫在元件最上層。不要在條件裡才呼叫它。
- 換頁放在 `preventDefault` 之後，而且要等 `createItem` 成功。失敗就留在這一頁。
- 一般「去清單」的入口仍用 `Link`。這裡是送出成功才離開。
- `createItem` 不會改寫本機的 `items.json`。回到清單後仍是原來三筆，重點是送出成功才換頁。

{% note success %}
**換你試試：**
標題是空的時候不要送出，也不要換頁。有標題才 `createItem`。
{% endnote %}

<details>
<summary>參考答案</summary>

空字串先停下來。有值才打 API、才離開這一頁。

```diff 04-react-router/src/demos/08-form.jsx
 // ...
     event.preventDefault();
+    if (!title) return;
     setMessage('');
 // ...
```

</details>

## 查詢參數

問號後面的查詢適合帶一小段可以分享的資訊。跨頁時把鍵寫進 `Link` 的 `to`，下一頁用 `get` 讀。同一頁要改篩選時，才用 `setSearchParams` 寫回網址。兩種都不會為了這個鍵再加一條 `Route`。

**一覽**

- `useSearchParams` 回傳目前的查詢，以及一個寫回查詢的函式。`get` 讀一個鍵，沒有這個鍵時是 `null`。它不負責改路徑。
- 跨頁把鍵寫在 `Link` 的 `to`，例如 `/new?itemId=1`。同一頁要改篩選才呼叫 `setSearchParams`，問號會更新，不會整頁重載。

{% mermaid graph LR %}
  linkNode["Link 的 to 帶問號"] --> readNode["下一頁 get"]
  formNode["送出篩選"] --> setNode["setSearchParams"]
  setNode --> sameNode["同一頁的查詢更新"]
  style linkNode fill:#e3f2fd
  style readNode fill:#fff3e0
  style formNode fill:#e3f2fd
  style setNode fill:#fff3e0
  style sameNode fill:#e8f5e9
{% endmermaid %}

### useSearchParams

`useSearchParams` 回傳目前的查詢，以及一個寫回查詢的函式。跨頁帶 id 時，來源頁用 `Link` 把鍵寫進 `to`，表單頁只讀。同一頁要改篩選時，才用設定函式，那是下一則。

```jsx
/**
 * 讀取目前網址的查詢，並取得寫回查詢的函式。
 * @returns {Array} 目前的查詢與寫回函式
 *   searchParams：用 get(鍵) 讀字串，沒有這個鍵是 null
 *   setSearchParams：寫回查詢。傳入物件或下一份查詢，問號會更新
 */
const [searchParams, setSearchParams] = useSearchParams();
```

**觀念**

詳情在價格下面加一條 `Link`，`to` 是 `/new?itemId=` 接上這筆的 id。表單頁用 `searchParams.get('itemId')` 放進唯讀欄。沒有這個鍵時是 `null`，改成空字串，欄位就留空。送出後仍 `navigate('/items')`。選單的「新增」進沒有問號的 `/new`。

{% note info %}
**鍵名**
這一則用 `itemId`。結業專案的報名頁用同一個讀法，鍵名是 `tourId`。
{% endnote %}

詳情相對上一則，多了這條連結：

```diff 04-react-router/src/demos/07-params.jsx
 // ...
-import { useParams } from 'react-router';
+import { Link, useParams } from 'react-router';
 // ...
       <p className="mt-2">
         {item.place} {item.days} 天 {item.price}
       </p>
+      <p className="mt-4">
+        <Link className="text-teal-800 underline" to={'/new?itemId=' + item.id}>
+          填這筆
+        </Link>
+      </p>
 // ...
```

表單多讀一個鍵。送出與 `createItem` 留著：

```diff 04-react-router/src/demos/08-form.jsx
 // ...
-import { useNavigate } from 'react-router';
+import { useNavigate, useSearchParams } from 'react-router';
 // ...
   const navigate = useNavigate();
+  const [searchParams] = useSearchParams();
+  const itemId = searchParams.get('itemId') ?? '';
   const [title, setTitle] = useState('');
 // ...
     <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
+      <label className="grid gap-1">
+        編號
+        <input
+          readOnly
+          name="itemId"
+          value={itemId}
+          className="rounded border bg-stone-100 px-2 py-1"
+        />
+      </label>
       <input
         value={title}
 // ...
```

打開 `/items/1`，點「填這筆」，網址變成 `/new?itemId=1`，編號欄是 1。直接開 `/new`，編號欄是空的。

**解析**

- `Link` 的 `to` 直接寫上問號與 `itemId`。跨頁寫入走連結，`setSearchParams` 留給同一頁的篩選。
- `get('itemId')` 沒有這個鍵時是 `null`。`?? ''` 讓唯讀欄是空字串，而不是文字 `null`。
- 這一則的表單只讀查詢，所以設定函式沒有用到。送出後的換頁仍是 `navigate`。
- 路由表不用為了這個鍵再加一條路徑。問號不是 `path`。

{% note success %}
**換你試試：**
編號改成隱藏欄。表單上方改顯示一句話：有 `itemId` 時寫「這筆編號」加上值，沒有時寫「沒有帶編號」。
{% endnote %}

<details>
<summary>參考答案</summary>

隱藏欄仍帶著同一個值。畫面上改成一句話，送出與換頁留著。這是接在上一則已經讀到 `itemId` 之後。

```diff 04-react-router/src/demos/08-form.jsx
 // ...
     <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
-      <label className="grid gap-1">
-        編號
-        <input
-          readOnly
-          name="itemId"
-          value={itemId}
-          className="rounded border bg-stone-100 px-2 py-1"
-        />
-      </label>
+      <p>{itemId ? '這筆編號 ' + itemId : '沒有帶編號'}</p>
+      <input type="hidden" name="itemId" value={itemId} />
       <input
         value={title}
 // ...
```

</details>

### setSearchParams

問號也適合留在同一頁，把篩選分享出去。`q` 是關鍵字。空的時候顯示全部，有字的時候只留標題有包含它的筆。輸入過程的草稿仍用 `useState`，網址只在送出時更新，避免每打一個字就推進一筆歷史紀錄。

```jsx
/**
 * 寫回目前網址的查詢。傳入空物件會清掉問號後面的內容。
 * @param {object|URLSearchParams} next 下一份查詢。物件的鍵會變成查詢鍵
 * @returns {void}
 */
setSearchParams(next);
```

**觀念**

`searchParams.get('q')` 沒有這個鍵時是 `null`，這裡用空字串代替。表單送出時 `setSearchParams({ q: keyword })`，網址變成 `/search?q=` 加上草稿。草稿清空再送出就傳 `{}`，查詢被清掉。篩選在渲染時做，不必再為了關鍵字放一份清單狀態。

```jsx 04-react-router/src/demos/09-search.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getItems } from '../api/fake-api.js';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const [draft, setDraft] = useState(keyword);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setItems(await getItems());
      } catch {
        setItems([]);
      }
    };
    load();
  }, []);

  const visible = items.filter((item) => item.title.includes(keyword));

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchParams(draft ? { q: draft } : {});
  };

  return (
    <section>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="rounded border px-2 py-1"
          placeholder="標題"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          搜尋
        </button>
      </form>
      <ul className="mt-4 grid gap-2">
        {visible.map((item) => (
          <li key={item.id}>
            {item.title} {item.place} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

打開 `/search` 會看到三筆。送出「台北」之後，網址變成 `/search?q=台北`，只剩台北城市漫遊。把草稿清空再送出，網址回到 `/search`，三筆都在。

**解析**

- `setSearchParams({})` 會清掉查詢。不要自己組問號字串。
- 篩選在渲染時做。清單不必因為關鍵字再放進另一份狀態。
- 草稿與網址上的關鍵字可以短暫不同。送出才把草稿寫進網址。
- 這一頁的表單用 `preventDefault`。它不是要交給伺服器重新載入的傳統表單。

{% note success %}
**換你試試：**
搜尋改成比對價格的字串。`q=15900` 時應只剩花蓮山海三日。
{% endnote %}

<details>
<summary>參考答案</summary>

價格是數字，先轉成字串再 `includes`。

```diff 04-react-router/src/demos/09-search.jsx
 // ...
-  const visible = items.filter((item) => item.title.includes(keyword));
+  const visible = items.filter((item) =>
+    String(item.price).includes(keyword),
+  );
 // ...
-          placeholder="標題"
+          placeholder="價格"
 // ...
```

</details>

## 選讀：位置資訊

`useLocation` 把目前網址拆成路徑、查詢與雜湊，一次看完整段位置。它不換頁。`search` 含問號，和 `useSearchParams` 讀到的是同一段查詢。改 `location` 上的欄位不會更新網址，換頁仍用連結或 `navigate`。

```jsx
/**
 * 讀取目前這一段位置。改欄位不會換頁。
 * @returns {object} location
 *   pathname：路徑名稱，例如 /where
 *   search：查詢字串，含問號。沒有查詢時是空字串
 *   hash：雜湊，含井字號。沒有時是空字串
 *   key：這一筆歷史紀錄的識別，不是路徑的一部分
 */
const location = useLocation();
```

**觀念**

這一頁把路徑、查詢與雜湊印出來。停在 `/where` 時，路徑是 `/where`，查詢與雜湊多半是空的。若網址加上 `?q=1#note`，重新整理後三段都會對上。位置在渲染時就讀得到，不需要 effect，也不必抄進另一份狀態。

```jsx 04-react-router/src/demos/10-where.jsx
import { useLocation } from 'react-router';

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

打開 `/where?q=1#note`，三行分別是路徑 `/where`、查詢 `?q=1`、雜湊 `#note`。

**解析**

- `search` 含問號，沒有查詢時是空字串。`hash` 含井字號，它不是 `useParams` 的 id。
- 這一頁不需要 effect。位置在渲染時就讀得到，直接畫出來即可。
- 改 `location` 上的欄位不會換頁。換頁仍要靠連結或 `navigate`。
- 不要把整份 `location` 放進 effect 再抄一份狀態。畫面直接讀就夠了。

{% note success %}
**換你試試：**
再印一行 `location.key`。同一個網址用連結進來與重新整理，這個 key 不一定相同。
{% endnote %}

<details>
<summary>參考答案</summary>

`key` 是這一筆歷史紀錄的識別，不是路徑的一部分。

```diff 04-react-router/src/demos/10-where.jsx
 // ...
       <p>雜湊 {location.hash || '（沒有）'}</p>
+      <p>紀錄 {location.key}</p>
     </section>
 // ...
```

</details>

# 找不到的頁面

沒有任何路由對上時，要有一頁說明找不到，而不是空白。星號路徑 `*` 接住剩下的網址。放在版型裡面或外面，選單會不會留下來，結果不同。

**一覽**

- 分散式星號路由寫在版型的子路由裡。找不到時，選單還在，主區換成 404。
- 集中式星號路由與版型並列。找不到時，整頁換成 404，選單一併消失。

{% mermaid graph LR %}
  missNode["對不上的網址"] --> nestNode["星號在版型內"]
  missNode --> topNode["星號與版型並列"]
  nestNode --> keepNode["選單還在"]
  topNode --> dropNode["整頁只有 404"]
  style missNode fill:#e3f2fd
  style nestNode fill:#e8f5e9
  style topNode fill:#fff3e0
  style keepNode fill:#e8f5e9
  style dropNode fill:#ffebee
{% endmermaid %}

## 分散式星號路由

把 `*` 放進版型的子路由。未知網址仍留在版型裡，選單不會被拿掉，主區換成找不到的那一頁。清單、詳情、搜尋、新增與位置都寫在同一張表裡，星號放在最後面，更具體的路徑會先對上。

**觀念**

版型換成有 `NavLink` 的那一份，子頁面用前面各則的元件。星號的元件只負責一句話和回首頁的連結。`items/:id` 比 `*` 具體，所以 `/items/1` 不會掉進 404。

```jsx 04-react-router/src/demos/11-missing.jsx
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">找不到頁面</h1>
      <p className="mt-2">
        <Link className="text-teal-800 underline" to="/">
          回首頁
        </Link>
      </p>
    </section>
  );
}
```

```jsx 04-react-router/src/demos/12-shell.jsx
import { Outlet } from 'react-router';
import SiteMenu from './06-nav.jsx';

export default function Shell() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteMenu />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
```

```jsx 04-react-router/src/App.jsx.final
import { Route, Routes } from 'react-router';
import Shell from './demos/12-shell.jsx';
import HomeLinkPage from './demos/05-home-link.jsx';
import ListPage from './demos/04-list.jsx';
import DetailPage from './demos/07-params.jsx';
import SearchPage from './demos/09-search.jsx';
import FormPage from './demos/08-form.jsx';
import WherePage from './demos/10-where.jsx';
import NotFoundPage from './demos/11-missing.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<HomeLinkPage />} />
        <Route path="items" element={<ListPage />} />
        <Route path="items/:id" element={<DetailPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="new" element={<FormPage />} />
        <Route path="where" element={<WherePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
```

打開 `/no-such` 時，選單還在，主區是找不到頁面。點回首頁會回到 `/`。

**解析**

- 星號放在版型裡面，所以 `Outlet` 會畫出 404，選單不會被卸掉。
- 更具體的路徑要寫得出來。`items/:id` 會先對上 `/items/1`，不會掉進星號。
- 清單的 `to` 用 id 接在 `/items/` 後面。搜尋進 `/search`，新增進 `/new`。
- 位置頁的路徑是 `where`。選單沒有這一條，用網址直接打開。

{% note success %}
**換你試試：**
在星號頁面的標題下面加一行「路徑沒有對上」。連結留著。
{% endnote %}

<details>
<summary>參考答案</summary>

說明寫在 404 元件。路由表不用為了這句話改路徑。

```diff 04-react-router/src/demos/11-missing.jsx
 // ...
       <h1 className="text-2xl font-bold">找不到頁面</h1>
+      <p className="mt-2">路徑沒有對上</p>
       <p className="mt-2">
 // ...
```

</details>

## 集中式星號路由

星號與版型並列時，未知網址不會走進版型。選單消失，整頁只剩 404。適合連版型都不該出現的情況。站內的未知路徑若仍想留著選單，用上一則的分散式寫法。

**觀念**

子頁面的元件與上一則相同，差別是 `*` 不在版型裡面。不要兩種星號同時留著：裡面的星號會先接住，外面的就不會輪到。

```jsx 04-react-router/src/App.central.jsx.final
import { Route, Routes } from 'react-router';
import Shell from './demos/12-shell.jsx';
import HomeLinkPage from './demos/05-home-link.jsx';
import ListPage from './demos/04-list.jsx';
import DetailPage from './demos/07-params.jsx';
import SearchPage from './demos/09-search.jsx';
import FormPage from './demos/08-form.jsx';
import WherePage from './demos/10-where.jsx';
import NotFoundPage from './demos/11-missing.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shell />}>
        <Route index element={<HomeLinkPage />} />
        <Route path="items" element={<ListPage />} />
        <Route path="items/:id" element={<DetailPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="new" element={<FormPage />} />
        <Route path="where" element={<WherePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

用這份取代路由表之後，打開 `/no-such` 看不到選單。已知的 `/items` 仍有選單。

**解析**

- 星號是 `Routes` 的直接子路由，所以不會渲染版型。
- 已知路徑仍走版型。只有對不上的才整頁替換。
- 不要兩種星號同時留在會被用到的那一份裡。分散式的星號會先接住，外面的就不會輪到。
- 完成的那張表用分散式，讓 404 仍回得了選單。集中式留作對照。

{% note success %}
**換你試試：**
把集中式的星號暫時放進版型裡再看一次 `/no-such`。選單應出現。看完改回並列，確認選單消失。
{% endnote %}

<details>
<summary>參考答案</summary>

選單在不在，只看 404 有沒有被版型包住。下面是暫時放進去的差。看完請改回並列，完成的表仍用上一則的分散式。

```diff 04-react-router/src/App.central.jsx.final
 // ...
         <Route path="where" element={<WherePage />} />
+        <Route path="*" element={<NotFoundPage />} />
       </Route>
-      <Route path="*" element={<NotFoundPage />} />
     </Routes>
 // ...
```

</details>

# 選讀：部署到 GitHub Pages

靜態站若放在子路徑，例如倉庫名稱那一段，打包後的檔案與路由的前綴都要算進去。`vite` 的 `base` 負責打包後的檔案路徑，`basename` 負責路由。另外，GitHub Pages 對未知路徑會找 `404.html`。單頁應用要讓那份檔案跟 `index.html` 相同，重新整理子路徑才進得了 React。`HashRouter` 則是伺服器只肯回傳一個檔案時的退路。

## basename 與 404.html

建置前在 Vite 設定 `base`。路由的 `basename` 用同一個前綴，但拿掉結尾斜線。建置完成後，把 `dist/index.html` 複製成 `dist/404.html`。平常練習把 `base` 留在預設的 `/` 即可，下面用 `/demo/` 當例子。

**觀念**

本機 `pnpm dev` 的 `BASE_URL` 仍是 `/`，去掉斜線後是空字串，路由就跟現在一樣。只有建置時把 `base` 設成倉庫路徑，前綴才會出現。倉庫名稱不同時，換成那個名稱，`base` 改一處即可，因為路由讀的是 `BASE_URL`。

```js 04-react-router/vite.config.js.final
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/demo/',
  plugins: [react(), tailwindcss()],
});
```

```jsx 04-react-router/src/main.jsx.final
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

`pnpm build` 之後再複製。`dist/404.html` 的內容與當時的 `dist/index.html` 相同。

```bash
cp dist/index.html dist/404.html
```

本機若已把 `base` 改成 `/demo/`，開發時的網址也要加上這段前綴才打得開。平常練習維持預設的 `/`。

**解析**

- `base` 影響打包後的 script 與 css 路徑。沒設時，子路徑站會去網站根目錄找檔案而失敗。
- `basename` 讓 `<Link to="/items">` 實際指向 `/demo/items`。
  元件裡仍寫 `/items`。
- 結尾斜線只留在 `base`。`basename` 帶著結尾斜線時，路徑比較容易多一段空的。
- `404.html` 必須在每次建置後重新複製。舊的那份不會含這一次的檔名雜湊。

{% note success %}
**換你試試：**
把例子的 `/demo/` 改成 `/lecture/`。`basename` 那一行不要改寫死。建置後看 `dist/index.html` 的 script 路徑應含 `lecture`。
{% endnote %}

<details>
<summary>參考答案</summary>

只改 Vite 的 `base`。路由仍讀 `BASE_URL`，所以前綴只寫一處。改完要重新建置，再複製 404。

```diff 04-react-router/vite.config.js.final
 // ...
-  base: '/demo/',
+  base: '/lecture/',
 // ...
```

</details>

## HashRouter

`HashRouter` 把目前頁面放在 `#` 後面，例如 `/#/items`。伺服器收到的路徑只有 `#` 前面那一段，靜態主機只要能打開 `index.html` 即可。代價是網址比較不好讀，也不利於沒有 JavaScript 時的分享預覽。

```jsx
/**
 * 把路徑放在網址的井字號後面，包住會讀網址的那棵元件樹。
 * @param {object} props
 * @param {string} [props.basename] 基底路徑，可省略
 * @param {React.ReactNode} props.children 路由表與其頁面
 * @returns {React.ReactElement}
 */
const hashed = <HashRouter>{/* children */}</HashRouter>;
```

**觀念**

這份入口只用來對照，它不設 `basename`。選單與路由表維持原樣，因為 `Link` 的 `to` 不用改。井字號後面的變化不會向伺服器要一份新文件，所以不必為子路徑準備 `404.html`。

```jsx 04-react-router/src/main.hash.jsx.final
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
```

若暫時改用這份入口，清單的網址會像 `http://localhost:5173/#/items`。重新整理仍停在清單。

**解析**

- 井字號後面的變化不會對伺服器發出新的文件請求。
- 路由元件仍是 `Routes` 與 `Route`。換的是最外層的路由器。
- 站內連結不要自己加上 `#`。
  `to="/items"` 會由 `HashRouter` 補上。
- 這門課仍以 `BrowserRouter` 加 `basename` 為完成版。
  `HashRouter` 是主機不能回傳同一份 HTML 時的退路。

{% note success %}
**換你試試：**
對照兩種網址：`BrowserRouter` 的 `/items`，以及 `HashRouter` 的 `/#/items`。選單的 `to` 都不必改。
{% endnote %}

<details>
<summary>參考答案</summary>

`to` 寫的是路由路徑，不是完整網址。兩種路由器都會把它接到自己的網址形式。平常把入口留在 `BrowserRouter`。只有在靜態主機無法用 `404.html` 回到同一頁時，才改看 `HashRouter` 這份入口。

</details>

# 單頁改成多頁

第 9 天用元件、狀態與表單把畫面組起來，第 10 天用 `getItems` 與 `createItem` 讀寫同一份資料。洛奇旅行這一章把首頁、清單、詳情與新增留在畫面上，只把切頁從 `setPage` 換成網址。資料仍是那三筆：`id`、`title`、`place`、`days`、`price`。

## 狀態切換

這一版還沒有路由。頁首的按鈕把 `page` 設成 `home`、`list`、`detail` 或 `new`，主區跟著換，網址不變。清單用 `getItems`，卡片把 id 交回父層，詳情在已經拿到的陣列裡用字串 id 找。新增在 `createItem` 成功之後把 `page` 設回清單。

**觀念**

這就是上一章開頭那個問題的完整版：畫面能換，重新整理卻回到首頁，上一頁也回不到詳情。入口沒有 `BrowserRouter`，因為這一則故意還不用網址。空標題直接 return，避免送出空白。

```jsx 04-react-router/travel/src/main.jsx
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

```jsx 04-react-router/travel/src/App.jsx
import { useEffect, useState } from 'react';
import { createItem, getItems } from './api/fake-api.js';

const emptyForm = { title: '', place: '', days: '', price: '' };

function TripCard({ item, onOpen }) {
  return (
    <li className="rounded border border-stone-200 bg-white p-4">
      <p className="font-semibold">{item.title}</p>
      <p className="mt-1">
        {item.place} {item.days} 天 {item.price}
      </p>
      <button
        type="button"
        className="mt-3 rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => onOpen(item.id)}
      >
        看這一筆
      </button>
    </li>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setItems(await getItems());
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };
    load();
  }, []);

  const selected =
    items.find((item) => String(item.id) === String(selectedId)) ?? null;

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.title) return;
    setMessage('');
    try {
      await createItem({
        title: form.title,
        place: form.place,
        days: Number(form.days),
        price: Number(form.price),
      });
      setForm(emptyForm);
      setPage('list');
    } catch {
      setMessage('送出失敗');
    }
  };

  let view;
  if (page === 'home') {
    view = (
      <section>
        <h1 className="text-2xl font-bold">洛奇旅行</h1>
        <p className="mt-2">城市散步、山海與社寺。</p>
      </section>
    );
  } else if (page === 'list') {
    if (status === 'loading') view = <p>載入中</p>;
    else if (status === 'error') view = <p>讀取失敗</p>;
    else {
      view = (
        <ul className="grid gap-2">
          {items.map((item) => (
            <TripCard
              key={item.id}
              item={item}
              onOpen={(id) => {
                setSelectedId(id);
                setPage('detail');
              }}
            />
          ))}
        </ul>
      );
    }
  } else if (page === 'detail') {
    view = selected ? (
      <article>
        <h1 className="text-2xl font-bold">{selected.title}</h1>
        <p className="mt-2">
          {selected.place} {selected.days} 天 {selected.price}
        </p>
      </article>
    ) : (
      <p>找不到這筆</p>
    );
  } else {
    view = (
      <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          className="rounded border px-2 py-1"
          placeholder="標題"
        />
        <input
          name="place"
          value={form.place}
          onChange={onChange}
          className="rounded border px-2 py-1"
          placeholder="地點"
        />
        <input
          name="days"
          value={form.days}
          onChange={onChange}
          className="rounded border px-2 py-1"
          placeholder="天數"
        />
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          className="rounded border px-2 py-1"
          placeholder="價格"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          送出並回到清單
        </button>
        {message ? <p>{message}</p> : null}
      </form>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-3xl gap-4 px-4 py-3">
          <button type="button" onClick={() => setPage('home')}>
            首頁
          </button>
          <button type="button" onClick={() => setPage('list')}>
            清單
          </button>
          <button type="button" onClick={() => setPage('new')}>
            新增
          </button>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{view}</main>
    </div>
  );
}
```

按下「清單」會看到三張卡片。點「看這一筆」才出現那一筆的標題與天數。網址列一直停在原來的路徑。

**解析**

- `page` 決定現在畫首頁、清單、詳情或新增。網址不會跟著變。
- 清單用 `getItems`。卡片是子元件，點了才把 id 放進 `selectedId`，並把 `page` 改成 `detail`。
- 詳情在已經拿到的陣列裡用字串 id 找，沒有再打 `getItem`。
- 新增在 `createItem` 成功之後把 `page` 設回 `list`。標題是空的就先 return。

{% note success %}
**換你試試：**
把起始頁改成 `'list'`。重新整理後應先看到三張卡片。
{% endnote %}

<details>
<summary>參考答案</summary>

只改起始值。按鈕與讀取留著。

```diff 04-react-router/travel/src/App.jsx
 // ...
 export default function App() {
-  const [page, setPage] = useState('home');
+  const [page, setPage] = useState('list');
 // ...
```

</details>

## 改接路由

同一份畫面改由網址決定。頁首的按鈕換成 `NavLink`，清單上的「看這一筆」換成 `Link`，詳情改讀 `useParams`，新增成功後改呼叫 `useNavigate`。版型用 `Outlet` 留主區，星號放在版型裡，找不到時選單還在。

**一覽**

- `setPage('list')` 改成路徑 `/items`。選單用 `NavLink`，首頁的「看清單」用 `Link`。
- `selectedId` 改成路徑上的 `:id`。詳情自己呼叫 `getItems`，再在陣列裡用字串 id 找。
- 新增成功後的 `setPage('list')` 改成 `navigate('/items')`。`createItem` 仍在換頁之前。

{% mermaid graph LR %}
  stateNode["setPage"] --> pathNode["Route 的 path"]
  idNode["selectedId"] --> paramNode["useParams"]
  backNode["送出成功"] --> navNode["useNavigate"]
  style stateNode fill:#fff3e0
  style pathNode fill:#e8f5e9
  style idNode fill:#fff3e0
  style paramNode fill:#e8f5e9
  style backNode fill:#e3f2fd
  style navNode fill:#e8f5e9
{% endmermaid %}

**觀念**

入口先包 `BrowserRouter`，路由表再一條一條補。元件裡的讀寫不用重寫，變的是「誰決定現在這一頁」。本機 JSON 仍然不會因為 `createItem` 多一筆，回到清單還是原來三筆。

### 步驟 1：入口

最外層改聽網址。嚴格模式仍包在外面，`BrowserRouter` 包住 `App`。這一則的入口引入的仍是 `./App.jsx`，路由表的完成內容在後面的完成檔。

```jsx 04-react-router/travel/src/main.jsx.final
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

還沒有路由表時，`App` 若仍用按鈕切頁，網址不會自己變。下一步才把表掛上。

### 步驟 2：先掛兩條

先只留首頁與清單，確認版型的 `Outlet` 會換主區。詳情、新增與星號下一步再補。頁面元件用完成檔裡的 `HomePage`、`ListPage` 與 `Layout`。

```jsx
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="items" element={<ListPage />} />
      </Route>
    </Routes>
  );
}
```

打開 `/` 是首頁，點「看清單」或選單的「清單」會到 `/items`。這時 `/items/1` 還沒有對應的頁。

### 步驟 3：詳情與新增

詳情用 `items/:id`，新增用 `new`，剩下的網址用星號留在版型裡。清單的連結把 id 放進路徑，表單在 `createItem` 成功後才 `navigate('/items')`。

```jsx 04-react-router/travel/src/App.jsx.final
import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router';
import { createItem, getItems } from './api/fake-api.js';

const itemClass = ({ isActive }) =>
  isActive ? 'text-teal-800 underline' : 'text-stone-700';

function SiteMenu() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-3xl gap-4 px-4 py-3">
        <NavLink to="/" end className={itemClass}>
          首頁
        </NavLink>
        <NavLink to="/items" className={itemClass}>
          清單
        </NavLink>
        <NavLink to="/new" className={itemClass}>
          新增
        </NavLink>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">洛奇旅行</h1>
      <p className="mt-2">城市散步、山海與社寺。</p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/items">
          看清單
        </Link>
      </p>
    </section>
  );
}

function ListPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const load = async () => {
      try {
        setItems(await getItems());
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };
    load();
  }, []);

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;

  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded border border-stone-200 bg-white p-4"
        >
          <p className="font-semibold">{item.title}</p>
          <p className="mt-1">
            {item.place} {item.days} 天 {item.price}
          </p>
          <p className="mt-3">
            <Link className="text-teal-800 underline" to={'/items/' + item.id}>
              看這一筆
            </Link>
          </p>
        </li>
      ))}
    </ul>
  );
}

function DetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [item, setItem] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const items = await getItems();
        setItem(items.find((row) => String(row.id) === id) ?? null);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };
    load();
  }, [id]);

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;
  if (!item) return <p>找不到這筆</p>;

  return (
    <article>
      <h1 className="text-2xl font-bold">{item.title}</h1>
      <p className="mt-2">
        {item.place} {item.days} 天 {item.price}
      </p>
    </article>
  );
}

function NewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!title) return;
    setMessage('');
    try {
      await createItem({
        title,
        place,
        days: Number(days),
        price: Number(price),
      });
      navigate('/items');
    } catch {
      setMessage('送出失敗');
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="標題"
      />
      <input
        value={place}
        onChange={(event) => setPlace(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="地點"
      />
      <input
        value={days}
        onChange={(event) => setDays(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="天數"
      />
      <input
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="價格"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出並回到清單
      </button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}

function NotFoundPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">找不到頁面</h1>
      <p className="mt-2">
        <Link className="text-teal-800 underline" to="/">
          回首頁
        </Link>
      </p>
    </section>
  );
}

function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteMenu />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="items" element={<ListPage />} />
        <Route path="items/:id" element={<DetailPage />} />
        <Route path="new" element={<NewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
```

打開 `/items/1` 應看到台北城市漫遊。`/no-such` 仍有選單，主區是找不到頁面。新增送出成功後，網址變成 `/items`。

**解析**

- 入口的 `BrowserRouter` 讓整棵樹讀得到網址。路由表用巢狀 `Route`，主區留在 `Outlet`。
- 清單的 `Link` 把 id 放進路徑。詳情用 `useParams`，不再靠 `selectedId`。
- 新增成功後用 `useNavigate` 到 `/items`。一般換頁用 `NavLink` 與 `Link`。
- 星號放在版型裡，找不到時選單還在。`createItem` 仍不會改寫本機 JSON。

{% note success %}
**換你試試：**
給清單那條 `NavLink` 加上 `end`。停在 `/items/1` 時，清單不該亮。
{% endnote %}

<details>
<summary>參考答案</summary>

跟選單那一節相同。首頁已經有 `end`，清單補上之後，詳情就不會再把清單算成使用中。

```diff 04-react-router/travel/src/App.jsx.final
 // ...
-        <NavLink to="/items" className={itemClass}>
+        <NavLink to="/items" end className={itemClass}>
           清單
 // ...
```

</details>

# 本篇重點回顧

下面八句是這篇要留下的做法。

- 套件是 `react-router`，宣告式用 `BrowserRouter`、`Routes` 與 `Route`，狀態切頁也改成這張表，資料模式只認得 `createBrowserRouter` 的簽名。
- 版型把子頁面畫在 `Outlet`，選單用 `NavLink` 的 `isActive`，首頁要加 `end`。
- 清單用 `getItems`，欄位是 `id`、`title`、`place`、`days`、`price`，列上的 `Link` 連到 `/items/:id`。
- `useParams` 讀到的 id 是字串，一般換頁用 `Link` 或 `NavLink`，送出成功後才用 `useNavigate`。
- 查詢用 `useSearchParams`，跨頁用 `Link` 帶 `itemId`，同一頁的篩選用 `setSearchParams`。
- 分散式把 `*` 放在版型裡，404 仍留著選單，集中式把 `*` 與版型並列，未知網址整頁替換。
- 選讀的 `useLocation` 讀整段位置，常用欄位是 `pathname`、`search` 與 `hash`。
- 選讀的 GitHub Pages 要同時處理 `base`、`basename` 與 `404.html`，`HashRouter` 是靜態主機的退路。

# 專有名詞中英對照

下面依這篇的大章收集會拿去搜尋的詞。中文在前，括號裡是英文關鍵字，順序跟文章第一次出現時一樣。

## 認識路由

這一組是網址怎麼對上畫面，以及三種接法的名字。資料模式的建立函式也放在這裡，課堂沒有拿它做第二套專案。檔案路由放在最後，用來劃清什麼時候不必裝這個套件。

- 路由（routing）
- 連結（Link）
- 宣告式（declarative mode）
- 資料模式（data mode）
- 框架模式（framework mode）
- createBrowserRouter
- RouterProvider
- HydratedRouter
- 檔案路由（file-based routing）
- Next.js

## 啟用路由

這一組是把宣告式路由接到入口、路由表與版型。舊套件名稱放在最後，提醒文件若還寫那個入口就不要跟。

- 瀏覽器路由（BrowserRouter）
- 歷史 API（History API）
- 路由表（Routes）
- 路由（Route）
- 索引路由（index route）
- 路徑（path）
- 元素（element）
- 插槽（Outlet）
- 舊套件入口（react-router-dom）

## 連結與選單

這一組從連結、選單、路徑參數、查詢參數排到選讀的位置物件。`useNavigate` 是送出成功後的導覽函式，跟 `Link` 的換頁分開記。

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

## 找不到的頁面

這一組是星號路徑的兩種放法。差別在 404 還包不包得住版型與選單。

- 星號路由（splat route）
- 分散式星號路由（nested splat route）
- 集中式星號路由（central splat route）

## 選讀：部署到 GitHub Pages

這一組是子路徑站的前綴，以及井字號路由這條退路。`base` 管打包，`basename` 管路由。

- 基底路徑（basename）
- 建置基底（base）
- BASE_URL
- 雜湊路由（HashRouter）

## 單頁改成多頁

這一組是把整站收成一個網址應用，再改由客戶端路由換頁。做法用的仍是前面的路由表與連結。

- 單頁應用（single-page application）
- 客戶端路由（client-side routing）
