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

網址決定現在畫哪一頁。這一篇用 React Router 8 的宣告式寫法，從 `react-router` 引入，把 `03-react` 複製成 `04-react-router`，再把原本用按鈕切換的示範收成練習筆記網站。路由表、左側目錄、連結、路徑參數與查詢參數都接在同一份專案上。

<!-- more -->

# 認識路由

這一章先用狀態把選單與主畫面配在一起，看重新整理與網址各自少了什麼，再說明為什麼要另外找路由套件、React Router 負責什麼。三種接法分在後面三章；可跑的路由表要等複製出 `04-react-router` 之後才開始寫。

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

這一節說明為什麼畫面不能只靠狀態切換，以及 React Router 負責網址的哪一段。接著依序看宣告式、資料模式與框架模式的寫法與目錄，最後決定課堂要用哪一種。

### 為什麼需要路由

上一節的選單只改元件裡的狀態，網址沒有跟著變，重新整理也回到起點。這一節看 React 為什麼不管網址，以及自己把網址接上畫面時，哪些需求會讓程式變繁瑣。

React 只依狀態決定要渲染哪些元件，不處理網址。手刻路由可以自己聽瀏覽器的歷史事件，再依路徑換元件；巢狀版面、網址參數與查詢字串加進來之後，外框要留著、路徑裡的編號要取出、問號後面的篩選要保留，拆路徑、對歷史堆疊、重新整理後還原畫面都得自己寫，過程繁瑣也容易出錯。這些工作和把資料畫進 DOM 是兩件事，所以改用專門做路由的第三方套件。

### React Router 是什麼

React Router 是目前最普遍的 React 路由套件。它把現在的網址對到要畫的元件，並提供換頁用的連結與導覽 Hook，讓文件不用整頁重載。這一節先看它負責的三件事；資料在哪裡讀，留到後面的三種接法。

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

套件把網址、歷史與換頁接起來，不負責這一頁的資料在哪裡讀。讀取留在元件裡，或提前寫在路由上，是後面三種接法的差別。同一套對應可以寫成宣告式、資料模式或框架模式；先確認專案是不是已經帶了別的路由，再看這三種怎麼寫。

{% note info %}
**Next.js 自帶路由**
Next.js 依檔案結構決定路徑（檔案路由，file-based routing），用 Next.js 的專案不必再裝 React Router。本課用 Vite，所以接 React Router。
{% endnote %}

### 宣告式

三種接法裡，課堂與結業專案只用宣告式。路由寫在元件樹，頁面掛上之後才讀資料，專案骨架仍是一般的 Vite 與 React。下面先看資料夾怎麼分，再看程式怎麼對網址。

#### 目錄架構

宣告式不改變 Vite 專案的骨架，只在 `src` 裡多出路由相關的分工。正式專案通常這樣規劃：入口負責掛上路由器，路由表集中在一個檔案，共用版型放在 `layouts`，每個網址對應 `pages` 裡的一個頁面元件，跨頁共用的小元件放在 `components`。

{% mermaid graph LR %}
root["專案根目錄"] --> html["index.html<br/>網頁外殼，掛載點 #root"]
root --> pkg["package.json<br/>相依套件，含 react-router"]
root --> vite["vite.config.js<br/>Vite 設定"]
root --> src["src/"]
src --> main["main.jsx<br/>入口：createRoot 並以 BrowserRouter 包住 App"]
src --> app["App.jsx<br/>路由表：Routes 與 Route，最後一條 path=* 接 404"]
src --> layouts["layouts/"]
layouts --> layout["MainLayout.jsx<br/>共用版型：頁首、選單與 Outlet"]
src --> pages["pages/"]
pages --> home["Home.jsx<br/>路徑 /"]
pages --> list["TripList.jsx<br/>路徑 /trips"]
pages --> nf["NotFoundPage.jsx<br/>404：對不上任何路徑時"]
src --> comps["components/<br/>跨頁共用的小元件"]
src --> api["api/"]
api --> fake["fake-api.js<br/>getItems 等讀寫，由頁面自己呼叫"]
classDef router fill:#fff3e0,stroke:#fb8c00
class pkg,main,app,layout,nf router
{% endmermaid %}

下一段觀念的五個檔就是這棵樹的最小版本。版型與 404 頁面後面章節會逐步加上：404 頁面跟其他頁面一樣放在 `pages`，在路由表裡用 `path="*"` 登記在最後一條，前面的路徑都對不上時才輪到它。課堂為了逐則對照，把這些角色放成 `src/demos` 的編號檔，例如版型是 `03-layout.jsx`、404 頁面是 `11-missing.jsx`；結業專案再照這棵樹拆成 `layouts` 與 `pages`。

#### 觀念

宣告式把路由寫成 JSX。入口用 `BrowserRouter` 包住整個應用，讓元件樹聽得到網址；路由表再把每一條路徑配上要畫的頁面，網址變了就換畫另一個頁面。下面照上一段的目錄架構拆成五個檔，清單頁的資料向後端 `fake-api` 拿。

```jsx src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
/** BrowserRouter 聽網址，包在 App 外層，裡面的 Routes 才讀得到目前路徑。 */
import { BrowserRouter } from 'react-router';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

```jsx src/App.jsx
/** Routes 與 Route 用 JSX 登記路徑，path 對到網址，element 是要畫的元件。 */
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

```jsx src/layouts/MainLayout.jsx
/** Link 換頁不重新載入；Outlet 是子路由頁面要畫進來的位置。 */
import { Link, Outlet } from 'react-router';

/** 共用版型。頁首與選單每頁都在，中間的 Outlet 依網址換成首頁或清單。 */
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

```jsx src/pages/Home.jsx
/** 路徑 / 要畫的頁面。 */
export default function Home() {
  return <h1>首頁</h1>;
}
```

```jsx src/pages/TripList.jsx
import { useEffect, useState } from 'react';
/** getItems 向後端 fake-api 要行程清單，回傳 Promise。 */
import { getItems } from '../api/fake-api.js';

/**
 * 路徑 /trips 要畫的頁面。
 * 宣告式的路由表不負責讀資料，頁面掛上後自己在 useEffect 向 fake-api 拿資料。
 */
export default function TripList() {
  const [items, setItems] = useState([]);

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

網址是根路徑時畫首頁，是 `/trips` 時畫清單。`main.jsx` 只負責掛上路由器，`App.jsx` 只負責把網址對到頁面，頁面本身不知道自己掛在哪個路徑。

{% note info %}
**舊的套件名稱**
v8 已移除套件 `react-router-dom`。v7 時它只是相容用的再出口。不要再安裝那個套件，也不要照舊文件的入口去引入。
{% endnote %}

### 選讀：資料模式

本課後續練習仍只用宣告式，這一節對照另一種接法。路由寫成物件，讀取放在進頁前的 loader，元件只消費已經拿到的資料。看完即可，課堂的 `04-react-router` 不要改成這一套。

#### 目錄架構

資料模式仍是 Vite 專案，入口把路由器物件交給 `RouterProvider`。路徑與 `loader` 寫在同一份路由模組，頁面檔負責把已經拿到的資料畫出來。

{% mermaid graph LR %}
root["專案根目錄"] --> html["index.html<br/>網頁外殼，掛載點 #root"]
root --> pkg["package.json<br/>相依套件，含 react-router"]
root --> vite["vite.config.js<br/>Vite 設定"]
root --> src["src/"]
src --> main["main.jsx<br/>入口：createRoot 並渲染 RouterProvider"]
src --> router["router.jsx<br/>createBrowserRouter：路徑、loader、errorElement"]
src --> layouts["layouts/"]
layouts --> layout["MainLayout.jsx<br/>共用版型：頁首、選單與 Outlet"]
src --> pages["pages/"]
pages --> home["Home.jsx<br/>路徑 /"]
pages --> list["TripList.jsx<br/>路徑 /trips，useLoaderData 取資料"]
pages --> nf["NotFoundPage.jsx<br/>404：errorElement 或 path=*"]
src --> api["api/"]
api --> fake["fake-api.js<br/>getItems，由 loader 呼叫"]
classDef router fill:#fff3e0,stroke:#fb8c00
class pkg,main,router,layout,list,nf router
{% endmermaid %}

#### 觀念

資料模式把路由表寫成陣列，交給 `createBrowserRouter`。清單的 `loader` 在進入該路徑之前執行，元件用 `useLoaderData` 接結果，自己不再寫第一次的 `useEffect`。

```jsx src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
/** RouterProvider 從 react-router/dom 引入，把路由器物件畫出來；入口不寫 Routes。 */
import { RouterProvider } from 'react-router/dom';
import router from './router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

```jsx src/router.jsx
/** createBrowserRouter 把路由陣列變成路由器物件。 */
import { createBrowserRouter } from 'react-router';
import { getItems } from './api/fake-api.js';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import TripList from './pages/TripList.jsx';

/**
 * 父路由畫版型，children 畫進版型的 Outlet。
 * index 是首頁；trips 多掛 loader，進頁前呼叫 getItems，回傳值交給頁面。
 * 同一層還可以加 action（表單送出）與 errorElement（錯誤頁），這裡先不掛。
 */
const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: 'trips', loader: () => getItems(), Component: TripList },
    ],
  },
]);

export default router;
```

```jsx src/layouts/MainLayout.jsx
/** Link 換頁不重新載入；Outlet 是子路由頁面要畫進來的位置。 */
import { Link, Outlet } from 'react-router';

/** 共用版型。頁首與選單每頁都在，中間的 Outlet 依網址換成首頁或清單。 */
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

```jsx src/pages/Home.jsx
/** 路徑 / 要畫的頁面。 */
export default function Home() {
  return <h1>首頁</h1>;
}
```

```jsx src/pages/TripList.jsx
/** useLoaderData 取得這條路由 loader 的回傳值。 */
import { useLoaderData } from 'react-router';

/** 行程清單。資料在進頁前已經拿到，頁面裡沒有 useEffect。 */
export default function TripList() {
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

進入清單路徑之前就執行 `getItems`，清單元件接到的是 `loader` 的回傳值。

### 選讀：框架模式

框架模式的前身是 Remix。它在資料模式之上加上檔案路由、伺服器端渲染（SSR）、程式碼切分（code splitting），並由建置工具負責打包；需要搜尋引擎最佳化（SEO）或 SSR 時，整個專案架構都跟著這套走。課堂的 Vite 專案維持宣告式，不換成這套目錄。

#### 目錄架構

框架模式的檔案位置是約定的一部分。路徑、頁面模組、全站外框與建置設定各有固定角色，改路徑時改的是登記檔。

{% mermaid graph LR %}
root["專案根目錄"] --> pkg["package.json<br/>相依套件，含 @react-router/dev"]
root --> cfg["react-router.config.ts<br/>框架設定，例如是否開 SSR"]
root --> vite["vite.config.ts<br/>掛上 React Router 的 Vite 插件"]
root --> app["app/"]
app --> rootf["root.tsx<br/>根版型：全站外框與 Outlet"]
app --> routes["routes.ts<br/>路徑登記：每列指向一個模組"]
app --> rdir["routes/"]
rdir --> home["home.tsx<br/>首頁模組"]
rdir --> trips["trips.tsx<br/>清單模組：匯出 loader 與元件"]
rdir --> nf["not-found.tsx<br/>404：登記為 * 路徑"]
app --> api["api/"]
api --> fake["fake-api.ts<br/>getItems，由路由模組的 loader 呼叫"]
app --> ec["entry.client.tsx<br/>瀏覽器入口：HydratedRouter 水合（可省略）"]
app --> es["entry.server.tsx<br/>伺服器入口：SSR 輸出（可省略）"]
classDef router fill:#fff3e0,stroke:#fb8c00
class pkg,cfg,vite,rootf,routes,trips,nf,ec router
{% endmermaid %}

#### 觀念

框架模式用設定檔登記路徑與模組檔。清單的讀取函式與預設元件寫在路由模組裡，由框架在進頁前呼叫。

```tsx app/root.tsx
/** Links、Meta、Scripts 由框架填入 head 與腳本；Outlet 畫各路由模組。 */
import { Link, Links, Meta, Outlet, Scripts } from 'react-router';

/** 根版型，角色等同 MainLayout。整份 HTML 外框也寫在這裡。 */
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
        <Scripts />
      </body>
    </html>
  );
}
```

```ts app/routes.ts
/**
 * index 與 route 從 @react-router/dev/routes 引入，只負責登記模組檔。
 * 這份設定沒有元件：index 指向首頁模組，route 的第一個引數是路徑、第二個是模組檔。
 */
import { type RouteConfig, index, route } from '@react-router/dev/routes';

/** 路徑對到模組檔。改 /trips 對到哪一個檔時，改的是 route 的第二個引數。 */
export default [
  index('./routes/home.tsx'),
  route('trips', './routes/trips.tsx'),
] satisfies RouteConfig;
```

```tsx app/routes/trips.tsx
import { useLoaderData } from 'react-router';
import { getItems } from '../api/fake-api.ts';

/**
 * 行程清單的讀取。框架在進 /trips 前呼叫，回傳值交給預設元件。
 * getItems 寫在這個路由模組，不寫在 routes.ts。
 * @returns {Promise<Array>}
 */
export async function loader() {
  return getItems();
}

/** 預設匯出是這一頁的元件，用 useLoaderData 接 loader 的陣列並把清單畫出來。 */
export default function TripList() {
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

路徑放在 `app/routes.ts`，`loader` 與預設元件放在對應的路由模組。進清單路徑之前，框架呼叫該模組匯出的 `loader`，預設匯出的元件再把清單畫出來。

### 怎麼選

三種接法都能把網址對上元件。路由表可以寫在元件樹、寫成路由物件，或交給框架的設定檔；資料可以等頁面掛上再讀，也可以在進頁前由路由先讀好。

後面的練習都在從 `03-react` 複製出來的 `04-react-router` 上，只用宣告式往下加，不為另外兩種各開一個專案。先學宣告式；資料流變複雜再換資料模式；要做完整的伺服器端渲染（SSR）網站，選框架模式或 Next.js。

# 啟用路由

這一章起，練習都在 `04-react-router`。先把 `03-react` 複製成這份，清掉舊的依賴再安裝，然後裝上 `react-router`、在入口包住 `BrowserRouter`。後面在同一份裡把按鈕切換改成路由表、左側目錄與各則筆記的網址。

## 安裝與入口

`04-react-router` 的起點就是 `03-react` 的成品：同一套 Vite、React 19 與示範元件。這一節只做複製、安裝與入口。路由表、版型與目錄在後面幾節接到同一份專案。

### 步驟 1：複製專案

在 `studiesAdvanced` 倉庫根目錄，把 `03-react` 整份複製成 `04-react-router`。Node、nvs 與 pnpm 前面幾天已經裝過，這裡不要重裝。目的資料夾還不存在時才複製；已經有這份時，跳過複製，從下一步清依賴開始。

macOS（終端機在倉庫根目錄）：

```bash
cp -R 03-react 04-react-router
```

Windows（PowerShell，同樣在倉庫根目錄）：

```powershell
Copy-Item -Recurse 03-react 04-react-router
```

複製完成後，打開 `04-react-router/package.json`，把 `name` 改成資料夾名稱。依賴先維持複製過來的 React 19，路由套件下一步再加。

```json
{
  "name": "04-react-router"
}
```

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

Windows（PowerShell）：

```powershell
Remove-Item -Recurse -Force 04-react-router\node_modules, 04-react-router\dist -ErrorAction SilentlyContinue
cd 04-react-router
pnpm install
```

{% note info %}
**已安裝過可跳過**
這兩個資料夾本來就不在，或你已經在 `04-react-router` 成功跑過 `pnpm install`，就不必為了重跑再刪一次。
{% endnote %}

### 步驟 3：安裝路由套件

終端機停在 `04-react-router`（上一步若已 `cd` 進去就不用再換）。用 pnpm 加上路由套件 8，React 維持 19。裝完後 `package.json` 的 `dependencies` 會出現 `react-router`，後面的 `import` 才找得到套件。

```bash
pnpm add react-router@8
```

{% note info %}
**已有 react-router 8 可跳過**
倉庫這份的 `package.json` 已經寫入 `react-router` 8。你的專案裡若看得到這個依賴，確認版本即可，不必再裝一次。
{% endnote %}

### 步驟 4：BrowserRouter

複製過來的 `src/main.jsx` 與 `03-react` 相同，嚴格模式裡直接渲染 `App`。現在在嚴格模式裡面加上 `BrowserRouter`。元件仍從 `#root` 畫起，只是多了一層知道網址的元件。沒有這一層，後面的 `Routes` 與 Hook 都讀不到現在的路徑。

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

## 路由表與版型

複製過來的 `App` 仍用按鈕在示範之間切換。這一節改成路由表與共用版型，讓網址 `/` 畫出左側外框與首頁總覽。單則筆記、搜尋與找不到的頁面都沿用這兩個檔，後面再補進同一張表。

**一覽**

- `Routes` 是路由表。它比較目前網址，畫出第一個對上的 `Route`。
- `Route` 用 `path` 對路徑、用 `element` 指定要畫的元素。`index` 表示跟父路徑同一個網址，這一條只留 `index` 與 `element`。
- `Outlet` 是版型裡子路由出現的位置。子路由寫在父 `Route` 的標籤中間，才會嵌進這個位置。

{% mermaid graph LR %}
  urlNode["網址 /"] --> tableNode["Routes"]
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

路由表集中在 `src/App.jsx`。父路由的路徑是 `/`，元件是版型；`index` 那一條跟父路徑同一個網址，所以打開網站根目錄時，版型中間是首頁。後面的單則筆記會寫成 `demos/:id`，跟父路徑接成 `/demos/01` 這種網址。

**語法**

```jsx
/**
 * 路由表。看目前網址，畫出第一個對上的 Route。
 * @param {object} props
 * @param {React.ReactNode} props.children 若干 Route
 * @returns {React.ReactElement}
 */
const table = <Routes>{/* Route */}</Routes>;

/**
 * 一條路徑與要畫的元素。index 為 true 時，這一條跟父路徑同一個網址。
 * @param {object} props
 * @param {string} [props.path] 路徑片段，會接在父路徑後面
 * @param {boolean} [props.index] 為 true 時對上父路由自己的網址
 * @param {React.ReactElement} props.element 對上時畫出的元素
 * @returns {React.ReactElement|null}
 */
const route = <Route path="/" element={<MainLayout />} />;
```

**觀念**

這種包在父路由裡面的寫法是巢狀路由：外層負責一直留在畫面上的版型，內層負責換掉的那一頁。`element` 傳入的是已經建立的元素，例如 `<Home />`。路徑用小寫，根路徑寫成斜線。

```jsx 04-react-router/src/App.jsx
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';

/**
 * 路由表。父路由畫版型，index 在同一個網址畫首頁。
 * 子路由要寫在父 Route 的標籤裡面，才會出現在 Outlet。
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
```

打開 `/` 時，畫面分成版型與首頁兩塊。別的路徑目前還沒有對應的頁，主區是空的。

{% note success %}
**換你試試：**
把首頁那條暫時改成一段文字，確認主區出現「總覽」兩個字。看完改回 `Home`，後面的總覽仍用頁面元件。
{% endnote %}

<details>
<summary>參考答案</summary>

`element` 可以是任何元素。這則只為了看主區換字，看完請改回首頁元件。

```diff 04-react-router/src/App.jsx
 // ...
-        <Route index element={<Home />} />
+        <Route index element={<p>總覽</p>} />
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

寬螢幕時左側是一欄、右側是主區。窄螢幕時目錄在上、主區在下。站名這一則還是文字，連結下一章再換。

{% note success %}
**換你試試：**
在 `Outlet` 上面加一行「主區」。首頁標題仍應出現在這行下面。
{% endnote %}

<details>
<summary>參考答案</summary>

那一行屬於版型，每一頁都會看到。首頁元件不用改。

```diff 04-react-router/src/layouts/MainLayout.jsx
 // ...
       <main className="px-4 py-6">
+        <p className="mb-3 text-sm text-stone-500">主區</p>
         <Outlet />
 // ...
```

</details>

### 首頁總覽

首頁是打開網站時的第一眼，用來說明這份筆記站在做什麼。目錄的則數與主題下一節才從資料算出來，這一則先把總覽的句子放上。

**語法**

```jsx
/**
 * 跟父路徑同一個網址的那一頁。
 * @param {object} props
 * @param {boolean} props.index 為 true 時對上父路由自己的網址
 * @param {React.ReactElement} props.element 這一頁的元素
 * @returns {React.ReactElement|null}
 */
const homeRoute = <Route index element={<Home />} />;
```

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

打開 `/`，左側是「練習筆記」，主區是標題與那一句說明。

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

目錄是這份筆記網站的清單。主題順序與每一則的編號、標題、元件都放在同一份資料，左側選單與首頁總覽都讀它，換一則的標題時只改這一處。

**一覽**

- `topics` 是主題。每一筆有 `id` 與畫在畫面上的 `title`，陣列順序就是左側由上到下的順序。
- `demos` 是單則筆記。`id` 用兩位數，`topic` 對到某個主題的 `id`，`Component` 是該則要畫出的元件。

**語法**

```jsx
/**
 * 一則筆記在目錄裡的資料。
 * @typedef {object} DemoRecord
 * @property {string} id 兩位數編號，與路徑 /demos/:id 相同
 * @property {string} title 畫在目錄上的標題
 * @property {string} topic 主題 id，對到 topics 裡的某一筆
 * @property {React.ComponentType} Component 該則要畫出的元件
 */
```

**觀念**

分組跟著編號走：同一段編號共用一個主題，左側才會一段接一段，上一則與下一則也才跟上課順序相同。這一則先把編號與標題印出來，點了還不會換頁；連結、路徑與搜尋都在後面加上。首頁改為讀同一份資料，主區的則數與主題名稱就跟左側一致。

```js 04-react-router/src/data/catalog.js
/**
 * 練習筆記的目錄。左側選單與單則頁面都讀這一份。
 * topics 是主題的順序與標題。demos 每一筆的 id 與路徑 /demos/:id 相同，topic 對到 topics 的 id，Component 是該則要畫的元件。
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
import RefDemo from '../examples/73-ref.jsx';
import RefCountDemo from '../examples/74-ref-count.jsx';
import ReducerCountDemo from '../examples/75-reducer-count.jsx';
import ReducerStateDemo from '../examples/76-reducer-state.jsx';
import ReducerDemo from '../examples/77-reducer.jsx';
import TodoPropsDemo from '../examples/78-propsDemo/index.jsx';
import ProviderDemo from '../examples/79-providerDemo/index.jsx';
import ActionDemo from '../examples/80-action.jsx';
import ActionStateDemo from '../examples/81-action-state.jsx';
import OptimisticDemo from '../examples/82-optimistic.jsx';

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
];

export const demos = [
  { id: '01', title: '函式元件', topic: 'component', Component: Hello },
  { id: '02', title: '表達式', topic: 'component', Component: ExprDemo },
  { id: '03', title: '由父層傳入', topic: 'component', Component: DownDemo },
  { id: '04', title: '拆分元件', topic: 'component', Component: TreeDemo },
  { id: '05', title: '狀態的位置', topic: 'component', Component: PlaceDemo },
  { id: '06', title: 'Fragment', topic: 'jsx', Component: FragmentDemo },
  { id: '07', title: 'style 物件', topic: 'jsx', Component: StyleDemo },
  { id: '08', title: 'className', topic: 'jsx', Component: ClassDemo },
  { id: '09', title: '提早 return', topic: 'jsx', Component: EarlyDemo },
  { id: '10', title: '三元運算子', topic: 'jsx', Component: TernaryDemo },
  { id: '11', title: '邏輯且', topic: 'jsx', Component: AndDemo },
  { id: '12', title: '數字 0', topic: 'jsx', Component: ZeroDemo },
  { id: '13', title: '邏輯或', topic: 'jsx', Component: OrDemo },
  { id: '14', title: '空值合併', topic: 'jsx', Component: NullishDemo },
  { id: '15', title: 'default export', topic: 'module', Component: CardDemo },
  { id: '16', title: 'named export', topic: 'module', Component: BoardDemo },
  { id: '17', title: '解構', topic: 'module', Component: PropsDemo },
  { id: '18', title: '預設值', topic: 'module', Component: DefaultsDemo },
  { id: '19', title: '函式型 props', topic: 'module', Component: CallbackDemo },
  { id: '20', title: 'children', topic: 'module', Component: ChildrenDemo },
  { id: '21', title: '宣告狀態', topic: 'state', Component: CountDemo },
  { id: '22', title: '多個狀態', topic: 'state', Component: MultiDemo },
  {
    id: '23',
    title: '狀態快照：只加一',
    topic: 'state',
    Component: SnapshotDemo,
  },
  { id: '24', title: '更新函式：加二', topic: 'state', Component: UpdaterDemo },
  { id: '25', title: '批次更新', topic: 'state', Component: BatchDemo },
  { id: '26', title: 'Hooks 規則', topic: 'state', Component: RulesDemo },
  { id: '27', title: '陣列新增', topic: 'state', Component: AddDemo },
  { id: '28', title: '陣列刪除', topic: 'state', Component: RemoveDemo },
  { id: '29', title: '陣列修改', topic: 'state', Component: EditDemo },
  { id: '30', title: '物件欄位', topic: 'state', Component: ObjectDemo },
  { id: '31', title: '巢狀物件', topic: 'state', Component: NestedDemo },
  { id: '32', title: '命名慣例', topic: 'event', Component: EventDemo },
  { id: '33', title: '事件物件', topic: 'event', Component: TargetDemo },
  { id: '34', title: '帶參數', topic: 'event', Component: PickDemo },
  { id: '35', title: 'preventDefault', topic: 'event', Component: PreventDemo },
  { id: '36', title: 'map', topic: 'list', Component: MapDemo },
  { id: '37', title: 'filter', topic: 'list', Component: FilterDemo },
  { id: '38', title: '空清單', topic: 'list', Component: EmptyDemo },
  { id: '39', title: 'key', topic: 'list', Component: KeyDemo },
  { id: '40', title: 'input', topic: 'list', Component: InputDemo },
  { id: '41', title: 'textarea', topic: 'list', Component: AreaDemo },
  { id: '42', title: 'select', topic: 'list', Component: SelectDemo },
  { id: '43', title: 'checkbox', topic: 'list', Component: CheckDemo },
  { id: '44', title: 'radio', topic: 'list', Component: RadioDemo },
  { id: '45', title: '多欄位物件', topic: 'list', Component: FieldsDemo },
  { id: '46', title: 'submit', topic: 'list', Component: SubmitDemo },
  { id: '47', title: 'useId', topic: 'list', Component: UseIdDemo },
  { id: '48', title: '第一次執行', topic: 'effect', Component: EffectMount },
  { id: '49', title: '依賴陣列', topic: 'effect', Component: DepsDemo },
  { id: '50', title: '清除函式', topic: 'effect', Component: TimerDemo },
  { id: '51', title: '無限迴圈', topic: 'effect', Component: LoopDemo },
  { id: '52', title: '漏寫依賴', topic: 'effect', Component: LintDemo },
  { id: '53', title: '載入與錯誤', topic: 'effect', Component: LoadDemo },
  { id: '54', title: '空資料', topic: 'effect', Component: EmptyLoadDemo },
  { id: '55', title: 'AbortController', topic: 'effect', Component: AbortDemo },
  { id: '56', title: 'GET', topic: 'effect', Component: GetDemo },
  { id: '57', title: 'POST', topic: 'effect', Component: PostDemo },
  { id: '58', title: 'PUT', topic: 'effect', Component: PutDemo },
  { id: '59', title: 'DELETE', topic: 'effect', Component: DeleteDemo },
  { id: '60', title: 'API 模組', topic: 'effect', Component: ItemsDemo },
  { id: '61', title: '渲染時計算', topic: 'effect', Component: DeriveDemo },
  {
    id: '62',
    title: '事件裡的請求',
    topic: 'effect',
    Component: ClickFetchDemo,
  },
  { id: '63', title: '抽出讀取', topic: 'effect', Component: HookDemo },
  { id: '64', title: '傳入引數', topic: 'effect', Component: ToggleDemo },
  {
    id: '65',
    title: '引數放進依賴',
    topic: 'effect',
    Component: FilterHookDemo,
  },
  { id: '66', title: '各呼叫各一份狀態', topic: 'share', Component: TwiceDemo },
  { id: '67', title: '父層持有', topic: 'share', Component: LiftDemo },
  { id: '68', title: '兄弟元件', topic: 'share', Component: SiblingsDemo },
  { id: '69', title: '層層傳遞', topic: 'share', Component: DrillDemo },
  {
    id: '70',
    title: '用 Context 改善',
    topic: 'share',
    Component: ContextDemo,
  },
  {
    id: '71',
    title: '拆成多個檔案',
    topic: 'share',
    Component: ContextSplitDemo,
  },
  { id: '72', title: '預設值', topic: 'share', Component: DefaultDemo },
  { id: '73', title: '聚焦輸入框', topic: 'more', Component: RefDemo },
  { id: '74', title: '不觸發渲染的值', topic: 'more', Component: RefCountDemo },
  {
    id: '75',
    title: '計數（useReducer）',
    topic: 'more',
    Component: ReducerCountDemo,
  },
  {
    id: '76',
    title: '待辦（useState）',
    topic: 'more',
    Component: ReducerStateDemo,
  },
  {
    id: '77',
    title: '待辦（useReducer）',
    topic: 'more',
    Component: ReducerDemo,
  },
  {
    id: '78',
    title: '拆成元件用 props',
    topic: 'more',
    Component: TodoPropsDemo,
  },
  { id: '79', title: '改用 Context', topic: 'more', Component: ProviderDemo },
  { id: '80', title: 'form action', topic: 'more', Component: ActionDemo },
  {
    id: '81',
    title: 'useActionState',
    topic: 'more',
    Component: ActionStateDemo,
  },
  {
    id: '82',
    title: 'useOptimistic',
    topic: 'more',
    Component: OptimisticDemo,
  },
];
```

```jsx 04-react-router/src/pages/DemoList.jsx
import { demos, topics } from '../data/catalog.js';

/**
 * 左側目錄。topics 決定分組順序，同一主題的示範排在該組下面。
 * 這一則先印出編號與標題。
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
                <li key={demo.id} className="px-2 py-1 text-sm">
                  {demo.id} {demo.title}
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

目錄放進版型的左側，首頁改成讀同一份主題與則數。

```diff 04-react-router/src/layouts/MainLayout.jsx
 import { Outlet } from 'react-router';
+import DemoList from '../pages/DemoList.jsx';
 // ...
           <span className="font-semibold">練習筆記</span>
+          <DemoList />
 // ...
```

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

重新整理 `/`，左側每個主題下面是該組的編號與標題，主區寫出則數，並依同樣的順序列出主題名稱。

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

`Link` 畫出連結，點了只改網址，文件不整頁重載。`NavLink` 在這個基礎上多告訴你這一條是不是目前頁，選單才有辦法把目前這一則標成不同的樣子。首頁的「從第一則開始」用 `Link`，左側每一則與站名用 `NavLink`。

**一覽**

- `Link` 的 `to` 是目標路徑。它渲染成 `<a>`，點擊推進瀏覽器歷史，對上的元件換掉。
- `NavLink` 同樣用 `to` 換頁。`className` 可以是函式，參數裡的 `isActive` 為真時表示這一條對上目前網址。
- `end` 要求路徑完全符合。站名連到 `/` 時要加上，否則停在 `/demos/01` 時首頁那一條也會算成使用中。

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

首頁主區需要一條前往第一則筆記的連結。它只要把人帶到 `/demos/01`，不必知道自己是不是目前頁，所以用 `Link`。

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
const jump = <Link to="/demos/01">從第一則開始</Link>;
```

**觀念**

`to` 寫的是路由路徑，從網站根目錄算起。第一則的編號是目錄裡的 `01`，所以路徑是 `/demos/01`。單則的路由在路徑參數那一節才登記，連結可以先寫上；路由補上之後，點了主區就會換成那一則元件。

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
+        <Link className="text-teal-800 underline" to="/demos/01">
+          從第一則開始
+        </Link>
+      </p>
     </section>
 // ...
```

主區主題清單下面多一條底線連結。路由表還沒有 `demos/:id` 時，點了主區是空的；下一節補上路徑之後，同一條連結會打開第一則。

{% note success %}
**換你試試：**
把連結文字改成「打開第一則」。`to` 仍指向 `/demos/01`。
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
  <NavLink to="/demos/01" className={({ isActive }) => (isActive ? 'on' : '')}>
    01 函式元件
  </NavLink>
);
```

**觀念**

目錄的 `to` 用該則的 `id` 接成 `/demos/` 加上編號。`isActive` 為真時套深色底與白字，其餘只留一行淡色。站名若連到 `/` 卻沒有 `end`，往後只要路徑以斜線開頭，站名都會亮；加上 `end` 之後，只有停在總覽時站名才是使用中。

```diff 04-react-router/src/layouts/MainLayout.jsx
-import { Outlet } from 'react-router';
+import { NavLink, Outlet } from 'react-router';
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

```diff 04-react-router/src/pages/DemoList.jsx
-import { demos, topics } from '../data/catalog.js';
+import { NavLink } from 'react-router';
+import { demos, topics } from '../data/catalog.js';
 // ...
-                <li key={demo.id} className="px-2 py-1 text-sm">
-                  {demo.id} {demo.title}
+                <li key={demo.id}>
+                  <NavLink
+                    to={'/demos/' + demo.id}
+                    className={({ isActive }) =>
+                      isActive
+                        ? 'block rounded bg-teal-800 px-2 py-1 text-sm text-white'
+                        : 'block rounded px-2 py-1 text-sm hover:bg-stone-100'
+                    }
+                  >
+                    {demo.id} {demo.title}
+                  </NavLink>
                 </li>
 // ...
```

路徑參數那一節補上路由之後，點「01 函式元件」會到 `/demos/01`，該列變成深色。回到總覽時，只有站名是深色字，目錄列恢復淡色。

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

每一則筆記共用同一個頁面元件，網址中段的編號決定要畫哪一則。這個會變的片段叫路徑參數。讀取用 `useParams`，上一則與下一則改網址用 `useNavigate`。

**一覽**

- `useParams` 讀路徑上的參數，回傳的欄位都是字串。這裡的 `id` 就是 `/demos/:id` 裡那一段。
- `useNavigate` 回傳一個函式。呼叫時傳入路徑，效果與點連結相同：推進歷史並換成對上的頁面。送出表單或按下「下一則」這種不是連結的動作才用它。

{% mermaid graph LR %}
  pathNode["/demos/01"] --> paramsNode["useParams 得到 id"]
  paramsNode --> pageNode["畫出該則元件"]
  pageNode --> nextNode["useNavigate 到相鄰編號"]
  style pathNode fill:#e3f2fd
  style paramsNode fill:#fff3e0
  style pageNode fill:#e8f5e9
  style nextNode fill:#fff3e0
{% endmermaid %}

### useParams

路徑寫成 `demos/:id`。冒號後面的名字就是參數名，打開 `/demos/01` 時，`id` 是字串 `'01'`。頁面用這個字串到目錄裡找同一筆，找到才畫出該則的 `Component`。

**語法**

```jsx
/**
 * 讀取目前路徑上的參數，欄位都是字串。
 * @returns {{ id: string }} 與 Route 的 :id 同名
 */
const { id } = useParams();
```

**觀念**

目錄的 `id` 也是字串，所以直接用 `===` 比較，不用先轉成數字。對不到任何一筆時，留在這一頁說明沒有這則，並給一條回總覽的連結。對得到時，主區先寫主題與標題，再把該則元件畫在下面。

```diff 04-react-router/src/App.jsx
 import MainLayout from './layouts/MainLayout.jsx';
+import DemoPage from './pages/DemoPage.jsx';
 import Home from './pages/Home.jsx';
 // ...
         <Route index element={<Home />} />
+        <Route path="demos/:id" element={<DemoPage />} />
 // ...
```

```jsx 04-react-router/src/pages/DemoPage.jsx
import { Link, useParams } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 單則筆記。useParams 的 id 是字串，和目錄的 id 相同才畫出 Component。
 * 對不到時留在這一頁，並用 Link 回總覽。
 */
export default function DemoPage() {
  const { id } = useParams();
  const demo = demos.find((item) => item.id === id);

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
        {demo.id} {demo.title}
      </h1>
      <div className="mt-6">
        <View />
      </div>
    </article>
  );
}
```

點目錄的「01 函式元件」，網址變成 `/demos/01`，主區是該則的標題與元件，該列是深色。打開 `/demos/99`，主區是「沒有這則筆記」，因為目錄沒有這個編號。重新整理仍停在同一個網址。

{% note success %}
**換你試試：**
把對不到時的標題改成「目錄裡沒有這個編號」。回目錄的連結留著。
{% endnote %}

<details>
<summary>參考答案</summary>

這句話在找不到資料的那個分支。路由的 `:id` 不用改。

```diff 04-react-router/src/pages/DemoPage.jsx
 // ...
-        <h1 className="text-2xl font-bold">沒有這則筆記</h1>
+        <h1 className="text-2xl font-bold">目錄裡沒有這個編號</h1>
 // ...
```

</details>

### useNavigate

上一則與下一則是按鈕，不是一開始就寫死的連結。按下去要改到相鄰編號的網址，所以用 `useNavigate`。順序跟 `demos` 陣列相同，第一則沒有上一則，最後一則沒有下一則。

**語法**

```jsx
/**
 * 取得換頁函式。傳入路徑後推進歷史，並畫出對上的頁面。
 * @returns {(to: string) => void}
 */
const navigate = useNavigate();
```

**觀念**

先用 `findIndex` 找出目前這筆在陣列裡的位置，前一格是上一則，後一格是下一則。找不到時索引是 `-1`，而負數索引會讀到陣列尾端，所以要先改成 `null`，才會走進「沒有這則筆記」。按鈕在沒有相鄰筆記時停用。按得下時才呼叫 `navigate`，路徑仍是 `/demos/` 加上那一則的 `id`。

```diff 04-react-router/src/pages/DemoPage.jsx
-import { Link, useParams } from 'react-router';
+import { Link, useNavigate, useParams } from 'react-router';
 // ...
- * 對不到時留在這一頁，並用 Link 回總覽。
+ * 對不到時留在這一頁，並用 Link 回總覽。上一則與下一則跟著目錄陣列，用 useNavigate 改網址；第一則與最後一則的按鈕停用。
 // ...
 export default function DemoPage() {
   const { id } = useParams();
-  const demo = demos.find((item) => item.id === id);
+  const navigate = useNavigate();
+  const index = demos.findIndex((demo) => demo.id === id);
+  const demo = index < 0 ? null : demos[index];
 // ...
   const topic = topics.find((item) => item.id === demo.topic);
+  const prev = demos[index - 1];
+  const next = demos[index + 1];
   const View = demo.Component;
 // ...
         {demo.id} {demo.title}
       </h1>
+      <div className="mt-4 flex gap-2">
+        <button
+          type="button"
+          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
+          disabled={!prev}
+          onClick={() => navigate('/demos/' + prev.id)}
+        >
+          上一則
+        </button>
+        <button
+          type="button"
+          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
+          disabled={!next}
+          onClick={() => navigate('/demos/' + next.id)}
+        >
+          下一則
+        </button>
+      </div>
       <div className="mt-6">
 // ...
```

停在 `/demos/01` 時，「上一則」是淡的，按「下一則」會到 `/demos/02`，目錄的深色列跟著移到下一則。瀏覽器的上一頁可以回到 `01`。

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

**觀念**

關鍵字比對編號或標題，大小寫忽略。某個主題篩完沒有留下任何一則，該組標題也不畫。輸入變成空字串時寫入空物件，網址回到沒有問號的路徑。目錄連到單則時把同一個 `q` 帶在路徑後面，否則一點進筆記，篩選就會不見。

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
      demo.id.includes(keyword) || demo.title.toLowerCase().includes(keyword)
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
                  <li key={demo.id}>
                    <NavLink
                      to={
                        q
                          ? `/demos/${demo.id}?q=${encodeURIComponent(q)}`
                          : `/demos/${demo.id}`
                      }
                      className={({ isActive }) =>
                        isActive
                          ? 'block rounded bg-teal-800 px-2 py-1 text-sm text-white'
                          : 'block rounded px-2 py-1 text-sm hover:bg-stone-100'
                      }
                    >
                      {demo.id} {demo.title}
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

在總覽的網址加上 `?q=狀態`，或在左側輸入「狀態」。目錄只留下標題裡有這兩個字的列，網址列看得到 `q`。清空輸入框後，問號消失，全部主題回到左側。

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

```diff 04-react-router/src/App.jsx
 import Home from './pages/Home.jsx';
+import WherePage from './pages/WherePage.jsx';
 // ...
         <Route path="demos/:id" element={<DemoPage />} />
+        <Route path="where" element={<WherePage />} />
 // ...
```

打開 `/where?q=狀態#note`，三行分別是路徑 `/where`、查詢 `?q=狀態`、雜湊 `#note`。左側目錄仍在。

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

把 `*` 放進版型的子路由，而且放在最後面。`/demos/01` 這種更具體的路徑會先對上，剩下的網址才落到星號。未知網址仍留在版型裡，左側目錄不會被拿掉，主區換成找不到的那一頁，並附上回總覽的連結。

**語法**

```jsx
/**
 * 接住前面沒有對上的路徑。放在版型的子路由裡時，主區換成這個元素，目錄留著。
 * @param {object} props
 * @param {string} props.path 星號，表示其餘路徑
 * @param {React.ReactElement} props.element 找不到時的頁面
 * @returns {React.ReactElement|null}
 */
const missed = <Route path="*" element={<NotFoundPage />} />;
```

**觀念**

404 頁面只負責主區的說明與回目錄連結。回目錄的路徑是 `/`，點了主區回到總覽，左側仍是同一份版型。`demos/:id` 比星號具體，所以 `/demos/01` 不會掉進 404；`/demos/99` 會進單則頁面裡「沒有這則筆記」的分支，因為那條路由已經對上了，只是目錄沒有這個編號。

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

```diff 04-react-router/src/App.jsx
 import Home from './pages/Home.jsx';
+import NotFoundPage from './pages/NotFoundPage.jsx';
 import WherePage from './pages/WherePage.jsx';
 // ...
- * 路由表。父路由畫版型，index 在同一個網址畫首頁。
- * 子路由要寫在父 Route 的標籤裡面，才會出現在 Outlet。
+ * 筆記網站的路由表。版型包住首頁、單則筆記、位置頁與找不到的頁面。
+ * 子路由寫在父 Route 裡面，才會畫進版型的 Outlet。星號放在最後，更具體的路徑先對上。
 // ...
         <Route path="where" element={<WherePage />} />
+        <Route path="*" element={<NotFoundPage />} />
       </Route>
 // ...
```

打開 `/no-such`，左側目錄還在，主區是找不到頁面。點「回目錄」會回到 `/`。

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
 * 星號與版型並列時，未知網址整頁換成 404，版型的目錄不會出現。
 * @returns {React.ReactElement}
 */
const central = (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {/* 首頁、單則與位置仍寫在版型裡 */}
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
```

**觀念**

子頁面的元件與上一則相同，差別是 `*` 不在版型裡面。兩種星號不要同時留著：版型裡的星號會先接住，外面的就不會輪到。看完這一則，把星號移回版型裡面，完成的表仍用分散式。

{% note success %}
**換你試試：**
把星號暫時移到版型外面，打開 `/no-such`。目錄應消失。看完移回版型裡，確認目錄還在。
{% endnote %}

<details>
<summary>參考答案</summary>

目錄在不在，只看 404 有沒有被版型包住。下面是暫時移出去的差。看完請移回版型裡。

```diff 04-react-router/src/App.jsx
 // ...
         <Route path="where" element={<WherePage />} />
-        <Route path="*" element={<NotFoundPage />} />
       </Route>
+      <Route path="*" element={<NotFoundPage />} />
     </Routes>
 // ...
```

</details>

# 選讀：部署到 GitHub Pages

這份筆記網站若放到 GitHub Pages 的專案子路徑，例如倉庫名稱那一段，打包後的檔案與路由的前綴都要算進去。`vite` 的 `base` 負責打包後的檔案路徑，`basename` 負責路由。另外，GitHub Pages 對未知路徑會找 `404.html`。單頁應用要讓那份檔案跟 `index.html` 相同，重新整理 `/demos/01` 這種子路徑才進得了 React。`HashRouter` 則是伺服器只肯回傳一個檔案時的退路。

## basename 與 404.html

建置前在 Vite 設定 `base`，下面用 `/04-react-router/` 當這個筆記網站的專案頁路徑。路由的 `basename` 用同一個前綴，但拿掉結尾斜線，而且讀 Vite 提供的 `BASE_URL`，前綴就只寫在 `base` 一處。建置完成後，把 `dist/index.html` 複製成 `dist/404.html`。

**語法**

```jsx
/**
 * 路由的基底路徑。Link 與 Route 仍寫從根目錄算起的路徑，實際網址會先接上這一段。
 * @param {object} props
 * @param {string} [props.basename] 不含結尾斜線的前綴。開發時 BASE_URL 去掉斜線後是空字串
 * @param {React.ReactNode} props.children 路由表與其頁面
 * @returns {React.ReactElement}
 */
const rooted = <BrowserRouter basename={basename}>{/* App */}</BrowserRouter>;
```

**觀念**

本機 `pnpm dev` 的 `BASE_URL` 是 `/`，去掉斜線後是空字串，網址與現在一樣。只有建置時把 `base` 設成專案頁路徑，前綴才會出現。元件裡的 `to="/demos/01"` 仍寫 `/demos/01`，實際會指向 `/04-react-router/demos/01`。結尾斜線只留在 `base`。`404.html` 必須在每次建置後重新複製，舊的那份不會含這一次的檔名雜湊。

```diff 04-react-router/src/main.jsx
 import './index.css';
 
+const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
+
 createRoot(document.getElementById('root')).render(
   <StrictMode>
-    <BrowserRouter>
+    <BrowserRouter basename={basename}>
       <App />
 // ...
```

```diff 04-react-router/vite.config.js
 export default defineConfig({
+  base: '/04-react-router/',
   plugins: [react(), tailwindcss()],
 });
```

`pnpm build` 之後再複製。`dist/404.html` 的內容與當時的 `dist/index.html` 相同。

```bash
cp dist/index.html dist/404.html
```

本機若已把 `base` 改成專案頁路徑，開發時的網址也要加上這段前綴才打得開。看完這節，把 `base` 那一行拿掉，平常的 `pnpm dev` 與 `pnpm build` 才從網站根目錄輸出。`basename` 那一行可以留著。

{% note success %}
**換你試試：**
把例子的 `/04-react-router/` 改成 `/lecture/`。`basename` 那一行不要改寫死。建置後看 `dist/index.html` 的 script 路徑應含 `lecture`。看完把 `base` 拿掉。
{% endnote %}

<details>
<summary>參考答案</summary>

只改 Vite 的 `base`。路由仍讀 `BASE_URL`，所以前綴只寫一處。改完要重新建置，再複製 404。本機練習結束後刪掉 `base`。

```diff 04-react-router/vite.config.js
 // ...
-  base: '/04-react-router/',
+  base: '/lecture/',
 // ...
```

</details>

## HashRouter

`HashRouter` 把目前頁面放在 `#` 後面，例如 `/#/demos/01`。伺服器收到的路徑只有 `#` 前面那一段，靜態主機只要能打開 `index.html` 即可。代價是網址比較不好讀。這份筆記網站平常仍用 `BrowserRouter`。

**語法**

```jsx
/**
 * 把路徑放在網址的井字號後面，包住會讀網址的那棵元件樹。
 * @param {object} props
 * @param {string} [props.basename] 基底路徑，可省略
 * @param {React.ReactNode} props.children 路由表與其頁面
 * @returns {React.ReactElement}
 */
const hashed = <HashRouter>{/* App */}</HashRouter>;
```

**觀念**

下面這段入口只用來對照，它不設 `basename`。目錄、路由表與 `to` 都維持原樣。井字號後面的變化不會向伺服器要一份新文件，所以不必為 `/demos/01` 準備 `404.html`。

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

/**
 * 對照用入口。路徑放在井字號後面，路由表與目錄連結不用改。
 * 筆記網站的完成版仍用 BrowserRouter。
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
```

若暫時改用這份入口，第一則的網址會像 `http://localhost:5173/#/demos/01`。重新整理仍停在該則。做完把入口改回 `BrowserRouter`。

{% note success %}
**換你試試：**
對照兩種網址：`BrowserRouter` 的 `/demos/01`，以及 `HashRouter` 的 `/#/demos/01`。目錄的 `to` 都不必改。
{% endnote %}

<details>
<summary>參考答案</summary>

`to` 寫的是路由路徑。兩種路由器都會把它接到自己的網址形式。平常把入口留在 `BrowserRouter`。只有在靜態主機無法用 `404.html` 回到同一頁時，才改看 `HashRouter`。

</details>

# 本篇重點回顧

- `04-react-router` 由 `03-react` 複製後再裝 `react-router`，課堂用宣告式的 `BrowserRouter`、`Routes` 與 `Route`。
- 同一份專案把按鈕切換改成練習筆記：`MainLayout` 左側是目錄，主區是 `Outlet`，首頁是筆記總覽。
- 目錄資料在 `src/data/catalog.js`，依主題分組；選單用 `NavLink` 的 `isActive`，連回首頁的那一條要加 `end`。
- 單則筆記的路徑是 `/demos/:id`，`useParams` 取出字串 id，上一則與下一則用 `useNavigate`。
- 篩選目錄用查詢 `?q=`，`useSearchParams` 讀、`setSearchParams` 寫，重新整理仍留著同一組結果。
- 分散式把 `*` 放在版型裡，找不到時目錄還在；集中式把 `*` 與版型並列，未知網址整頁替換。
- 選讀的 `useLocation` 讀整段位置，常用欄位是 `pathname`、`search` 與 `hash`。
- 選讀把這個筆記網站部署到 GitHub Pages 時，要同時處理 `base`、`basename` 與 `404.html`，`HashRouter` 是靜態主機的退路。

# 專有名詞中英對照

下面依這篇的大章收集會拿去搜尋的詞。中文在前，括號裡是英文關鍵字，順序跟文章第一次出現時一樣。

## 認識路由

這一組是網址怎麼對上畫面、三種接法，以及選讀才出現的讀取與框架檔案。課堂專案用宣告式。

- 路由（routing）
- 連結（Link）
- 宣告式（declarative mode）
- 資料模式（data mode）
- 框架模式（framework mode）
- 瀏覽器路由（BrowserRouter）
- createBrowserRouter
- RouterProvider
- 換頁前讀取（loader）
- 表單送出（action）
- 錯誤頁（errorElement）
- Remix
- 伺服器端渲染（SSR）
- 程式碼切分（code splitting）
- 搜尋引擎最佳化（SEO）
- 檔案路由（file-based routing）
- HydratedRouter
- Next.js
- 舊套件入口（react-router-dom）
- useLoaderData
- 路由設定（routes.ts）
- 路由模組（route module）

## 啟用路由

這一組是把複製來的專案接上宣告式路由、路由表、版型與目錄資料。

- 歷史 API（History API）
- 路由表（Routes）
- 路由（Route）
- 索引路由（index route）
- 路徑（path）
- 元素（element）
- 插槽（Outlet）
- 巢狀路由（nested route）

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

## 找不到的頁面

這一組是星號路徑的兩種放法。差別在 404 還包不包得住版型與目錄。

- 星號路由（splat route）
- 分散式星號路由（nested splat route）
- 集中式星號路由（central splat route）

## 選讀：部署到 GitHub Pages

這一組是把筆記網站放到子路徑時的前綴，以及井字號路由這條退路。`base` 管打包，`basename` 管路由。

- 單頁應用（single-page application）
- 基底路徑（basename）
- 建置基底（base）
- BASE_URL
- 雜湊路由（HashRouter）
