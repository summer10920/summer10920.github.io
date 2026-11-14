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

網址決定現在畫哪一頁。這一篇先說明路由是什麼、React Router 的宣告式、資料、框架三種模式怎麼選（專案用資料模式），再把 `03-react` 複製成 `04-react-router` 接上路由器，改成練習筆記網站：路由表與共用版型、`Link` 與 `NavLink`、路徑參數與查詢參數、找不到的頁面，接著用 `loader`、`action`、`Form`、`redirect` 與 `errorElement` 讀取並送出資料，並以 `useFetcher` 與 `useNavigation` 處理不換頁的送出與讀取中狀態。選讀有宣告式與框架模式、`useLocation`，以及部署到 GitHub Pages。

<!-- more -->

# 認識路由

這一章先用狀態把選單與主畫面配在一起，看重新整理與網址各自少了什麼，再說明為什麼要另外找路由套件，以及 React Router 的三種使用模式怎麼選。課堂用資料模式，宣告式與框架模式留作選讀對照。可跑的路由器要等複製出 `04-react-router` 之後才開始寫。

## 狀態切頁

還沒有路由套件時，最直接的做法是把選單與主畫面放在同一個元件裡，用一個狀態決定現在畫哪一塊。按鈕改的是 `page`，主區就在首頁與清單之間切換。先看這份可跑的元件怎麼配在一起，再看重新整理與網址會停在哪裡。

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
- 每次重新整理，元件重新掛上，狀態又從起始值 `'home'` 開始，畫面回到最初的首頁。
- 清單沒有自己的網址，所以無法分享、無法收成書籤；瀏覽器的上一頁也回不到清單，因為歷史紀錄裡沒有這一筆。

## React Router

網址要對上元件、換頁要進瀏覽器歷史、重新整理要停在同一條路徑，這些事 React 本身不處理。上一節的狀態切頁只改了元件裡的值，網址完全沒動；若自己去聽瀏覽器的歷史事件，再加上巢狀版面、路徑參數與查詢字串，拆路徑與還原畫面都得自己寫。這一節說明專門處理這件事的套件 React Router 做什麼、有哪三種使用模式，以及課堂為什麼選資料模式。

### 路由套件做什麼

React Router 把現在的網址對到要畫的元件，並提供換頁用的連結與導覽 Hook，換頁時文件不用整頁重載。

**一覽**

- 對網址：讀現在的路徑，決定要畫哪一個元件。
- 管歷史：把換頁推進瀏覽器歷史，上一頁與下一頁回到當時的畫面，重新整理仍停在同一個路徑。
- 換頁：連結只改網址，不整頁重載，只有對上的元件換掉。

{% mermaid graph LR %}
  urlNode["網址"] --> routerNode["React Router"]
  routerNode --> viewNode["對上的元件"]
  style urlNode fill:#e3f2fd
  style routerNode fill:#fff3e0
  style viewNode fill:#e8f5e9
{% endmermaid %}

{% note info %}
**Next.js 自帶路由**
Next.js 依檔案結構決定路徑（檔案路由，file-based routing），用 Next.js 的專案不必再裝 React Router。本課用 Vite，所以接 React Router。
{% endnote %}

{% note info %}
**舊的套件名稱 react-router-dom**
React Router v7 以前，瀏覽器用的 API 要從 `react-router-dom` 引入；v7 把它們併進 `react-router`，`react-router-dom` 只剩轉出用的空殼，v8 則把這個套件移除。新專案只裝 `react-router`，也不要照舊文件從 `react-router-dom` 引入。
{% endnote %}

### 三種使用模式

官方把 React Router 分成三種模式，由簡到繁是宣告式（Declarative）、資料（Data）、框架（Framework），後者包含前者的功能。差別在於路由設定寫在哪裡，以及能不能在進頁前載入資料、在送出表單時處理資料。

**一覽**

- 宣告式：用 `BrowserRouter` 包住應用，把路由寫成 JSX 元件，只負責對網址、換頁與連結的作用中狀態。
- 資料：把路由寫成物件陣列，用 `createBrowserRouter` 建立路由器、`RouterProvider` 畫出來，再加上資料載入（`loader`）、表單處理（`action`）與等待中狀態。
- 框架：資料模式再包上 Vite 插件，加入路由模組、型別安全的 API、程式碼切分，以及單頁（SPA）、伺服器端渲染（SSR）、靜態輸出等策略。

課堂與結業專案用資料模式：專案要在進頁前讀資料、送出表單、顯示讀取中與錯誤頁，這些都是資料模式提供的；同時它仍是一般的 Vite 與 React 專案，入口與目錄結構不必改。

資料模式的完整可跑範例從下一章開始，這一節先看它的樣子：路由器在元件外面建立，再交給 `RouterProvider`。

{% mermaid graph TD %}
  entry["main.jsx<br/>createRoot 渲染 App"]
  routes["App.jsx<br/>createBrowserRouter 建立路由器<br/>RouterProvider 畫出來"]
  layout["layouts<br/>共用版面，Outlet 放子頁"]
  page["pages<br/>各頁元件，可帶 loader"]
  entry --> routes
  routes --> layout
  layout --> page
  style entry fill:#e3f2fd
  style routes fill:#fff3e0
  style layout fill:#e3f2fd
  style page fill:#e8f5e9
{% endmermaid %}

### 選讀：宣告式

宣告式是 React Router v6.4 以前的傳統寫法：入口用 `BrowserRouter` 包住應用，路由寫成 `Routes` 與 `Route` 的 JSX。它不提供 `loader` 與 `action`，資料要等元件掛上後，自己在 `useEffect` 裡讀。已有舊專案是這種寫法、或資料層另外處理（例如自己管快取）時才會選它。

```jsx
// main.jsx：BrowserRouter 聽網址，讓裡面的 Routes 讀得到目前路徑
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// App.jsx：路由寫成 JSX。element 是對上時要畫的元素
import { Route, Routes } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="trips" element={<TripList />} />
    </Routes>
  );
}
```

這段只是對照用的片段，不放進練習專案。重點是路由設定寫在 JSX 裡，與資料模式的物件陣列不同。

### 選讀：框架模式

框架模式把資料模式包成一整套架構：由 Vite 插件接手入口，路由登記在 `app/routes.ts`，每個頁面是一個匯出 `loader`、`action` 與元件的路由模組，伺服器端渲染（SSR）也在這個模式內。需要搜尋引擎最佳化（SEO）、或想直接採用一套完整框架時才會選它，和 Next.js 屬於同一類選擇。

```ts
// app/routes.ts：登記網址對應的模組檔，這裡沒有引入任何元件
import { index, route } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  route('trips', './routes/trips.tsx'),
];
```

```tsx
// app/routes/trips.tsx：路由模組，loader 的結果由 loaderData 傳進元件
import type { Route } from './+types/trips';

export async function loader() {
  return [{ id: '1', title: '看海' }];
}

export default function Trips({ loaderData }: Route.ComponentProps) {
  return (
    <ul>
      {loaderData.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

這兩段同樣只是對照用的片段，需要另外用框架模式的專案範本建立，不屬於練習專案。

### 怎麼選

三種模式都能把網址對上元件，官方的說法是它們都支援任何架構與部署方式，選擇的重點是想讓 React Router 替你做多少事。

- 想用最少的設定、或維持舊寫法：宣告式。
- 想要資料載入與表單處理，又想自己掌控打包與資料層：資料模式，也就是課堂與結業專案的選擇。
- 想要整套架構，包含 SSR 與型別安全的 API：框架模式。

後面的 `04-react-router` 從 `03-react` 複製而來，全程使用資料模式，不為另外兩種各開一個專案。

# 啟用路由

這一章起，練習都在 `04-react-router`。先把 `03-react` 複製成這份，清掉舊的依賴再安裝，然後裝上 `react-router`，在 `App.jsx` 用 `createBrowserRouter` 與 `RouterProvider` 接上路由器。後面在同一份專案裡，把按鈕切換改成路由表、版面與各頁網址。

## 安裝與入口

`04-react-router` 的起點就是 `03-react` 的成品：同一套 Vite、React 19 與示範元件。這一節依序做複製、清依賴、安裝路由套件，最後在 `App.jsx` 接上路由器。Node 與 pnpm 前面已經裝過，這裡不重裝。

### 步驟 1：複製專案

在 `studiesAdvanced` 倉庫根目錄，把 `03-react` 整份複製成 `04-react-router`。

macOS（終端機在倉庫根目錄）：

```bash
cp -R 03-react 04-react-router
```

Windows（PowerShell，同樣在倉庫根目錄）：

```powershell
Copy-Item -Recurse 03-react 04-react-router
```

複製完成後，打開 `04-react-router/package.json`，把 `name` 改成與資料夾相同的名稱。依賴先維持複製過來的內容，路由套件下一步再加。

```json
{
  "name": "04-react-router"
}
```

{% note info %}
**資料夾已經在倉庫裡**
課堂倉庫的 `04-react-router` 就是這一章的練習專案，起點與 `03-react` 的成品相同，後面各節的示範檔也已經在裡面。此時不要再複製一次：macOS 的 `cp -R` 會把來源嵌進既有資料夾。直接做下一步。
{% endnote %}

### 步驟 2：清掉依賴再安裝

`node_modules` 與 `dist` 是這一台電腦裝出來、建出來的結果，不要跟著複製帶走。先刪掉這兩個資料夾，再在 `04-react-router` 裡重新安裝，依賴才會對上這份專案的 `package.json` 與鎖定檔。

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

終端機停在 `04-react-router`（上一步若已進入就不用再換）。用 pnpm 加上路由套件，主版本指定 8。

```bash
pnpm add react-router@8
```

裝完後 `package.json` 的 `dependencies` 會出現 `react-router`，後面的 `import` 才找得到它。這個版本要求 Node 22.22 以上、React 19.2.7 以上，本課的 Node 26 與 React 19 都符合。

{% note info %}
**已有 react-router 8 可跳過**
倉庫這份的 `package.json` 已經寫入 `react-router` 8。你的專案裡若看得到這個依賴，確認版本即可，不必再裝一次。
{% endnote %}

### 步驟 4：建立路由器

複製過來的 `src/main.jsx` 與 `03-react` 相同，嚴格模式裡直接渲染 `App`，這份檔案不用改。

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

- 資料模式不在入口包 `BrowserRouter`，入口只負責把 `App` 掛上 `#root`。
- 路由器寫在 `App.jsx`，由 `App` 回傳 `RouterProvider`。

**觀念**

`createBrowserRouter` 使用瀏覽器的歷史功能（History API），網址是一般路徑，例如 `/items`，不是井字號後面的片段。它收一個路由物件陣列，回傳路由器；路由器要寫在元件函式外面、只建立一次，再交給 `RouterProvider` 畫出來。

引入的來源有兩處：`createBrowserRouter` 從 `react-router`，`RouterProvider` 從 `react-router/dom`。兩個入口的 `RouterProvider` 是同一個元件，差別在後者會接上 React DOM 的同步更新機制，官方建議瀏覽器應用都用 `react-router/dom`。

下面是接上路由器的起點，路由表之後再換成版面與各頁。把內容放進 `src/App.jsx`，畫面應出現「路由已經接上」。

```jsx 04-react-router/src/App-start.jsx
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

// 路由器寫在元件外面，只建立一次，不要放進 state。
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

- 路由表目前只有一筆：路徑 `/` 對上一段文字，用來確認路由器有畫出來。
- 第二個參數的基底路徑 `basename` 取自 Vite 的 `BASE_URL` 去掉結尾斜線。開發時 `BASE_URL` 是 `/`，去掉之後等於從網站根目錄算起；部署到子路徑時的做法留到部署那一節。
- 開發伺服器遇到沒有對應檔案的路徑，會回傳同一份 `index.html`，所以直接在子路徑重新整理也不會找不到頁面。

## 路由表與版型

複製過來的 `App` 還是用按鈕在示範之間切換。這一節改成路由表加共用版型：網址是 `/` 時，畫面左邊是全站外框，中間是首頁。路由表怎麼寫、版型怎麼留出位置、首頁怎麼接上，依序看。單則筆記、搜尋與找不到的頁面之後都會補進同一張表。下面用到的版型與首頁檔案，在後面兩節補上。

**一覽**

- 路由表是物件陣列，交給 `createBrowserRouter`。路由器依路徑的具體程度挑出對上的那一筆，不是照陣列順序找第一筆。
- 每一筆用 `path` 對路徑，再用 `element` 指定要畫的元素。
- `children` 是子路由，寫在父路由裡，頁面才會畫進版型的 `Outlet`。
- `index: true` 的那一筆跟父路徑是同一個網址，不寫 `path`。
- `Outlet` 是版型裡留給子路由的位置，畫什麼由路由表決定。

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

路由表集中寫在 `src/App.jsx`。外層路由的路徑是根目錄，元素是版型；內層放進 `children`，這種一層包一層的寫法叫巢狀路由：外層是一直留在畫面上的版型，內層是會換掉的那一頁。

**觀念**

`index: true` 的子路由沒有自己的路徑，打開網站根目錄時就由它補在版型中間。

之後的單則筆記會寫成 `demos/:slug`，其中冒號開頭的 slug 是動態片段（路徑中會變動的一段），細節留到路徑參數那一節。子路由的路徑不加開頭斜線，會自動接在父路徑後面，變成 /demos/01-hello 這種網址。

`element` 收的是已經建立好的元素，也就是寫成 JSX 標籤的元件。官方文件的範例多半改寫 `Component`，直接傳元件函式，由路由器自己建立元素；兩種寫法都能用，本課這一節統一用 `element`，路由表因此一眼看得出畫什麼。

```jsx 04-react-router/src/App.jsx
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';

/**
 * 路由表。外層路由畫版型，index 路由在同一個網址畫首頁。
 * 子路由寫在 children 裡，才會畫進版型的 Outlet。
 * basename 取自 Vite 的 BASE_URL。開發時是 /，去掉結尾斜線後等於空字串。
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [{ index: true, element: <Home /> }],
    },
  ],
  { basename },
);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- 路由表是陣列，交給 `createBrowserRouter`，再由 `RouterProvider` 畫出來。
- 打開 `/` 時，外層的版型與 index 的首頁一起出現：版型是外框，首頁在 `Outlet` 的位置。
- 別的路徑目前沒有對應的路由，主區是空的；找不到頁面的處理在後面的章節。
- 這是這一節的起點，之後每加一種頁面，只是在 `children` 多寫一筆。

{% note info %}
**不寫 path 的版型路由**
外層路由也可以省略 `path`，只留 `element` 與 `children`：它不會在網址上多出一段，只是替底下的子路由包一層共用版型。本課的版型剛好是 `/`，所以直接寫 `path: '/'`。
{% endnote %}

{% note info %}
**lazy：進到才載入的路由**
路由物件的 `lazy` 可以改成進到那條路由時，才用動態 `import` 載入元件與 loader，縮小第一次載入的檔案。本課的頁面不多，不使用。
{% endnote %}

### 版型

版型負責左側與主區的外框，每一頁都共用。`Outlet` 只負責留出位置：沒有它，路由即使對上，子路由的頁面也沒有地方出現。

#### 步驟 1：Outlet

這一步左側先只放站名，目錄下一節才接上。寬度與背景放在版型，各頁就沿用同一套；現在是哪一頁由網址決定，版型不用再靠狀態去判斷。

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

- `Outlet` 畫在 `main` 裡。子路由對上之後，頁面出現在這個位置，左側外框一直留著。
- 寬螢幕時左側是一欄、右側是主區；窄螢幕時目錄在上、主區在下。
- 站名這一步只是文字，換成連結是之後連結與選單那一章的事。

#### 步驟 2：捲動還原

換頁後，視窗要回到頁面頂端；按瀏覽器的上一頁或下一頁，則要回到當時的捲動位置。資料模式提供 `ScrollRestoration`，放進版型、與 `Outlet` 同一層即可，不必自己寫捲動程式。宣告式模式沒有這個元件。

```jsx 04-react-router/src/layouts/MainLayout.jsx
import { Outlet, ScrollRestoration } from 'react-router';

/**
 * 全站共用的外框。ScrollRestoration 放在 Outlet 同一層，
 * 換頁時捲到頂部，上一頁、下一頁時還原先前的位置。
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
      <ScrollRestoration />
    </div>
  );
}
```

**解析**

- `ScrollRestoration` 本身不畫出任何看得見的東西，只負責記住並還原每一個歷史紀錄的捲動位置。
- 用連結或 `navigate` 換頁時，視窗捲到頂部；按上一頁或下一頁，回到離開那一頁之前的位置。
- 整個應用只放一個。

### 首頁總覽

首頁是打開網站時的第一眼，說明這份筆記在做什麼。目錄的則數與主題名稱，下一節才會從資料算出來，這一步先放標題與說明。

**觀念**

首頁只是一個普通的頁面元件，只管主區裡的內容。左側的站名來自版型，所以首頁出現時外框早就在了。重新整理仍停在 `/`，因為這一頁有自己的網址。

```jsx 04-react-router/src/pages/Home.jsx
/**
 * 筆記總覽。這一步先放標題與說明，目錄與連結之後再接上。
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
- 版型裡的站名與首頁裡的標題是兩個不同的元素，改其中一個不會影響另一個。

## 示範目錄

目錄是這份筆記網站的清單。主題順序，以及每一則的網址名稱、標題、元件，都放在同一份資料裡，左側選單與首頁總覽都讀它，要改標題時只改這一處。

**一覽**

- `topics` 是主題，每一筆有 `id` 與畫在畫面上的 `title`，陣列順序就是左側由上到下的順序。
- `demos` 是單則筆記：`slug` 是範例檔名去掉 `.jsx`，也是路徑 `/demos/:slug` 的一段；`topic` 對到某個主題的 `id`；`Component` 是該則要畫出的元件。

### 步驟 1：目錄資料

分組跟著編號走：同一段編號共用一個主題，左側才會一段接一段，順序與上課相同。

每一則用一個物件描述，元件從範例檔用 `import` 引入。01 到 85 是前兩天寫好的範例，86 到 92 是後面「讀取與送出資料」那一章的示範，檔案已經在專案裡。

`import` 與 `export` 是 ES Module 的寫法，只要知道它是把別的檔案的東西取進來即可，細節見 {% post_link lokiTech-15day-06-js-basics %} 的選讀章節「ES Module」。

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
import FetcherKeyDemo from '../examples/92-fetcher-key.jsx';

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
  {
    slug: '92-fetcher-key',
    title: '用 key 共用 fetcher',
    topic: 'data',
    Component: FetcherKeyDemo,
  },
];
```

**解析**

- `topics` 與 `demos` 都寫在這一份資料裡，其他檔案只用 `import` 讀取，不另外複製。
- `slug` 等於範例檔名去掉 `.jsx`，與路徑 `/demos/:slug` 的那一段相同，所以之後可以拿網址反查資料。
- 換一則的標題或主題名稱時，只改這裡；左側目錄與首頁總覽讀的是同一份。

### 步驟 2：左側目錄

目錄元件依 `topics` 的順序分組，同一主題的示範排在該組下面。這一步先把 slug 與標題印出來，還不能點；連結與目前頁的標示留到下一章。

```jsx 04-react-router/src/pages/DemoList.jsx
import { demos, topics } from '../data/catalog.js';

/**
 * 左側目錄。topics 決定分組順序，同一主題的示範排在該組下面。
 * 這一步先印出 slug 與標題。
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

- 每個主題畫成一個區塊：主題名稱是小標題，底下列出 `topic` 對上該主題 `id` 的那些示範。
- 這份元件只負責顯示，沒有狀態；資料變了，畫面就跟著變。

### 步驟 3：目錄放進版型

目錄掛在版型的左側、站名下面，每一頁共用同一份側欄。

```jsx 04-react-router/src/layouts/MainLayout.jsx
import { Outlet, ScrollRestoration } from 'react-router';
import DemoList from '../pages/DemoList.jsx';

/**
 * 全站共用的外框。左側是站名與目錄，右側 Outlet 是子路由的主區。
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 md:grid md:grid-cols-[18rem_1fr]">
      <aside className="border-b border-stone-200 bg-white md:min-h-screen md:border-r md:border-b-0">
        <div className="px-4 py-4 md:sticky md:top-0 md:max-h-screen md:overflow-y-auto">
          <span className="font-semibold">練習筆記</span>
          <DemoList />
        </div>
      </aside>
      <main className="px-4 py-6">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
```

**解析**

- 目錄元件放在版型裡，不在任何一個頁面裡，所以換頁時它不會被換掉。
- 版型沒有改變 `Outlet` 與 `ScrollRestoration` 的位置。

### 步驟 4：首頁讀同一份資料

首頁改成讀同一份目錄資料，主區的則數與主題名稱就會跟左側一致。

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
        左側目錄列出全部示範，並依主題分成幾組。這一頁把則數與主題名稱放在主區。
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
- 左側與主區都讀 `catalog.js`，改一處標題，兩側會一起變；例如把「元件」改成「元件基礎」，左側第一組與主區清單同時改名。

# 連結與選單

筆記網站左側的目錄要能換頁，也要看得出現在停在哪一則。這一章先看換頁用的連結與選單，再看網址上會變的片段：路徑參數決定畫哪一則，查詢參數留住篩選條件。選讀補上讀取完整位置的方法。

## 連結

一般的 `<a href>` 點下去，瀏覽器會向伺服器重新要整頁，畫面上的狀態全部清掉。React Router 提供兩個替代品：點了只改網址，由路由表換掉對應的那一塊畫面，其餘不動。這一節依序看一般連結與會標出目前頁的選單連結。

**一覽**

- `Link` 是一般的換頁連結。`to` 是目標路徑，渲染成 `<a>`，點了推進瀏覽器歷史。
- `NavLink` 是多一個功能的 `Link`：它知道自己是不是目前所在的頁，可以依此換樣式。

分法很簡單：選單、分頁這類要標出目前頁的連結用 `NavLink`，其他都用 `Link`。

{% mermaid graph LR %}
  clickNode["點連結"] --> linkNode["只改網址"]
  linkNode --> matchNode["路由表對上新網址"]
  matchNode --> viewNode["Outlet 換成新頁面"]
  matchNode --> flagNode["NavLink 標出目前頁"]
  style clickNode fill:#e3f2fd
  style linkNode fill:#fff3e0
  style matchNode fill:#e3f2fd
  style viewNode fill:#e8f5e9
  style flagNode fill:#e8f5e9
{% endmermaid %}

### Link：換頁連結

首頁主區需要一條前往第一則筆記的連結。它只要把人帶到那一則，不必知道自己是不是目前頁，所以用 `Link`。

**語法**

```jsx
/**
 * 換頁連結。點了改網址，文件不整頁重載。
 * @param {object} props
 * @param {string} props.to 目標路徑，以 / 開頭是從網站根目錄算起
 * @param {string} [props.className] 連結的外觀
 * @param {React.ReactNode} props.children 連結文字
 * @returns {React.ReactElement}
 */
const jump = <Link to="/demos/01-hello">從第一則開始</Link>;
```

**觀念**

`to` 以斜線開頭時是絕對路徑，不管現在停在哪一頁都指向同一處。不以斜線開頭的寫法是相對路徑，會接在目前這條路由的後面；它適合版型內的子頁互相連結，這份筆記站一律寫絕對路徑，比較不容易看錯。連結可以先寫上，路由還沒登記時點了只會落到找不到的頁面，登記之後同一條連結就生效。

```jsx 04-react-router/src/pages/Home.jsx
import { Link } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 筆記總覽。主題與則數來自目錄資料，Link 前往第一則。
 * Link 改的是網址，文件不整頁重載。
 */
export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold">練習筆記</h1>
      <p className="mt-2 max-w-xl">
        左側是前兩天的示範目錄。點一則就換到該則的網址，重新整理仍停在同一則，也可以把網址存成書籤。
      </p>
      <p className="mt-4">
        共 {demos.length} 則，分成 {topics.length} 個主題。
      </p>
      <ul className="mt-4 grid gap-1">
        {topics.map((topic) => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/01-hello">
          從第一則開始
        </Link>
      </p>
    </section>
  );
}
```

**解析**

- 主區清單下面有一條底線連結，點下去網址變成 `/demos/01-hello`，主區換成該則，左側外框沒有重新載入。
- 這一頁的連結不需要知道自己是不是目前頁，所以用 `Link`，不用 `NavLink`。

### NavLink：標出目前頁

左側每一則與上方的站名都要能換頁，也要標出現在停在哪裡。`NavLink` 會自己比對目前網址，結果有三種方式可以拿來換樣式。

**一覽**

- `className` 與 `style` 可以寫成函式，參數是 `isActive` 與 `isPending`，回傳這一刻要用的類別或樣式。`children` 也可以是函式，用來改連結內的內容。
- 沒有自己寫函式時，目前頁的連結會自動加上 `active` 這個 class；正要前往這個連結的網址、資料還在載入（網址尚未換掉）時是 `pending`。
- 目前頁的連結也會自動帶上 `aria-current="page"`，讀屏軟體用它告訴使用者「現在在這一頁」，不必自己加。
- `end` 要求路徑完全相同才算使用中，下面細說。

**語法**

```jsx
/**
 * 會標出目前頁的連結。
 * @param {object} props
 * @param {string} props.to 目標路徑
 * @param {boolean} [props.end] 為 true 時，網址要與 to 完全相同才算使用中
 * @param {function({ isActive: boolean, isPending: boolean }): string} [props.className] 依狀態回傳類別
 * @returns {React.ReactElement}
 */
const item = (
  <NavLink to="/demos/01-hello" className={({ isActive }) => (isActive ? 'on' : '')}>
    01-hello 函式元件
  </NavLink>
);

// 沒有 end：網址 /admin 與 /admin/bookings 都算使用中
// 有 end：只有網址正好是 /admin 時才算使用中
const parent = (
  <NavLink to="/admin" end>
    後台總覽
  </NavLink>
);
```

**觀念**

比對預設看前綴：連結指向 `/admin` 時，網址 `/admin/bookings` 也算對上，因為它在 `/admin` 底下。這對「父項目在子頁仍亮著」很方便；若不要，就加 `end`。連到 `/` 的連結是特例：它本來就只在根路徑算使用中，加不加 `end` 都一樣，所以下面的站名不需要它。

左側目錄的 `NavLink` 在下面「查詢參數」那一節的 `DemoList.jsx` 裡。這一節先看版型：站名連回 `/`，只有停在總覽時才是深色字。

```jsx 04-react-router/src/layouts/MainLayout.jsx
import { NavLink, Outlet, ScrollRestoration } from 'react-router';
import DemoList from '../pages/DemoList.jsx';

/**
 * 全站共用的外框。左側是目錄，右側 Outlet 依網址換主區。
 * 站名連回 /，NavLink 只在停在總覽時才標成使用中。
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 md:grid md:grid-cols-[18rem_1fr]">
      <aside className="border-b border-stone-200 bg-white md:min-h-screen md:border-r md:border-b-0">
        <div className="px-4 py-4 md:sticky md:top-0 md:max-h-screen md:overflow-y-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-teal-800' : 'font-semibold'
            }
          >
            練習筆記
          </NavLink>
          <DemoList />
          <p className="mt-6 text-sm">
            <NavLink
              to="/where"
              className={({ isActive }) =>
                isActive
                  ? 'text-teal-800 underline'
                  : 'text-stone-600 underline'
              }
            >
              位置
            </NavLink>
          </p>
        </div>
      </aside>
      <main className="px-4 py-6">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
```

**解析**

- 站名是連到 `/` 的 `NavLink`。停在總覽時是深色字，到了任何一則筆記就恢復一般顏色，因為 `/` 只在根路徑算使用中。
- 版型同時掛上目錄元件、捲動還原與底下的「位置」連結；前兩者在上一章已經出現，「位置」連結在本章選讀那一節才說明。
- 目錄裡的連結也是 `NavLink`。從首頁的 `Link` 進到 `/demos/01-hello` 後，左側對應的那一列會自動變深色，因為 `NavLink` 看的是目前網址，與怎麼點進來無關。

## 路徑參數

每一則筆記共用同一個頁面元件，網址決定畫哪一則。網址裡會變的片段叫路徑參數：路由登記成 `demos/:slug`，冒號後面是參數名，`/demos/01-hello` 這個網址上它的值就是字串 `01-hello`。這一節看怎麼讀到它，以及怎麼用程式換到相鄰的一則。

**一覽**

- `useParams` 讀目前路徑上的參數，回傳物件，每個欄位都是字串；網址上沒有的參數是 `undefined`。
- `useNavigate` 回傳一個函式，呼叫時傳入路徑，效果與點連結相同：推進歷史並換頁。它的第二個參數可以放選項，`replace: true` 讓新網址取代目前這一筆歷史，不留下上一頁；`state` 可以順便帶一份資料到新頁，新頁用 `useLocation().state` 讀。

{% mermaid graph LR %}
  pathNode["/demos/01-hello"] --> paramsNode["useParams 得到 slug"]
  paramsNode --> pageNode["畫出該則元件"]
  pageNode --> nextNode["useNavigate 到相鄰 slug"]
  style pathNode fill:#e3f2fd
  style paramsNode fill:#fff3e0
  style pageNode fill:#e8f5e9
  style nextNode fill:#fff3e0
{% endmermaid %}

**語法**

```jsx
/**
 * 讀取目前路徑上的參數，欄位都是字串。
 * @returns {{ slug: string }} 與路徑裡 :slug 同名
 */
const { slug } = useParams();

/**
 * 取得換頁函式。
 * @returns {(to: string, options?: { replace?: boolean, state?: unknown }) => void}
 */
const navigate = useNavigate();
navigate('/demos/02-expr'); // 推進歷史，上一頁可以回來
navigate('/demos/02-expr', { replace: true }); // 取代目前這一筆，上一頁不會回到舊的
```

**觀念**

路由表要多一筆 `demos/:slug`。路由器依「具體程度」比對，而不是依寫的順序：固定文字的路徑比含參數的具體，含參數的又比星號具體，所以順序不影響結果。頁面用 `slug` 到目錄裡找同一筆：目錄的 `slug` 也是字串，直接用 `===` 比較，不用轉成數字。找不到時留在這一頁說明沒有這則；找到時畫出標題與該則的元件。

上一則與下一則的順序跟目錄陣列相同，所以先用 `findIndex` 找出這一則的位置，前一格是上一則、後一格是下一則，沒有時按鈕停用。

下面的路由寫法是 `App.jsx` 中這幾筆的摘錄，完整的 `App.jsx` 還包含後面章節的路由。

```jsx
// App.jsx 的 children 裡的幾筆路由
{ index: true, element: <Home /> },
{ path: 'demos/:slug', element: <DemoPage /> },
{ path: 'where', element: <WherePage /> },
{ path: '*', element: <NotFoundPage /> },
```

```jsx 04-react-router/src/pages/DemoPage.jsx
import { Link, useNavigate, useParams } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 單則筆記。useParams 的 slug 是字串，和目錄的 slug 相同才畫出 Component。
 * 對不到時留在這一頁，並用 Link 回總覽。上一則與下一則跟著目錄陣列，用 useNavigate 改網址；第一則與最後一則的按鈕停用。
 */
export default function DemoPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const demo = demos.find((item) => item.slug === slug);
  const index = demos.findIndex((item) => item.slug === slug);

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
  const prev = demos[index - 1];
  const next = demos[index + 1];
  const View = demo.Component;

  return (
    <article>
      <p className="text-sm text-stone-500">{topic ? topic.title : ''}</p>
      <h1 className="mt-1 text-2xl font-bold">
        {demo.slug} {demo.title}
      </h1>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
          disabled={!prev}
          onClick={() => prev && navigate('/demos/' + prev.slug)}
        >
          上一則
        </button>
        <button
          type="button"
          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
          disabled={!next}
          onClick={() => next && navigate('/demos/' + next.slug)}
        >
          下一則
        </button>
      </div>
      <div className="mt-6">
        <View />
      </div>
    </article>
  );
}
```

**解析**

- 點目錄的「01-hello 函式元件」，網址變成 `/demos/01-hello`，主區顯示標題、兩個按鈕與該則元件，目錄那一列是深色。
- 「上一則」在第一則是淡色停用的；按「下一則」到 `/demos/02-expr`，深色列跟著移到下一則，瀏覽器的上一頁可以回到 `01-hello`，因為 `navigate` 推進了歷史。
- 兩顆按鈕的 `onClick` 先檢查 `prev`、`next` 存在才讀 `slug`。按鈕停用時它們仍是 `undefined`；React Compiler 會把閉包裡用到的 `prev.slug` 當成相依值，在渲染時就先讀取，少了檢查，第一則與最後一則會整頁出錯。
- 打開 `/demos/not-found`，路由對上了，只是目錄沒有這個 `slug`，所以顯示「沒有這則筆記」與回目錄的連結。
- 這裡用按鈕示範 `navigate`。單純點了就去別頁的，用 `Link` 更好，因為使用者可以在新分頁開啟、搜尋引擎也看得到；`navigate` 留給非點擊的時機，例如計時結束或送出之後。

{% note info %}
**loader 也拿得到參數**
資料章節的 `loader` 函式會收到物件參數，裡面的 `params` 與 `useParams` 的內容相同，例如 `params.slug`。需要在畫面前讀資料時，在 `loader` 裡用它；只要在畫面上顯示參數，才用 `useParams`。本站的目錄是直接 import 進來的，所以元件裡讀就夠了。
{% endnote %}

## 查詢參數

目錄很長時，可以用問號後面的查詢參數記住篩選條件。`?q=狀態` 這種網址重新整理仍是同一組結果，也可以把篩過的目錄分享給別人。路徑參數決定「哪一頁」，查詢參數則是同一頁的選項，兩者不要混用。

**一覽**

- `useSearchParams` 回傳一對值：目前的查詢（用法接近瀏覽器的 `URLSearchParams`）與寫回查詢的函式。讀不到的參數，`get` 回傳 `null`。
- 寫回函式可以傳物件，例如 `{ q: '狀態' }`；傳空物件會清掉查詢；也可以傳函式，參數是目前的查詢，回傳新的查詢，寫法與 `setState` 的函式形式類似。
- 它會換掉網址並觸發一次換頁，所以第二個參數可以放與 `navigate` 相同的選項，輸入框每打一個字都寫入時，通常加 `replace: true`，避免歷史被塞滿。

{% mermaid graph LR %}
  inputNode["輸入框"] --> setNode["寫入查詢"]
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

// 讀：沒有這組參數時是 null
const q = params.get('q');

// 寫：物件、空物件（清掉查詢）、函式都可以，第二個參數是換頁選項
setParams({ q: '狀態' }, { replace: true });
setParams((prev) => {
  prev.set('page', '2'); // 保留其他參數，只改 page
  return prev;
});
```

**觀念**

網址是這個篩選的唯一資料來源：輸入框的值直接讀自查詢，打字就是寫回查詢，不另外放一個狀態。函式形式適合「只改其中一個參數、保留其餘」。它不像 `setState` 會把同一輪的多次呼叫串起來，所以同一個事件裡要改多個參數，合併成一次呼叫。

關鍵字比對 slug 或標題，大小寫忽略。篩完沒有留下任何一則的主題，標題也不畫。輸入變成空字串時寫入空物件，網址回到沒有問號的路徑。目錄連到單則時把同一個 `q` 帶在路徑後面，否則一點進筆記，篩選就不見了。

```jsx 04-react-router/src/pages/DemoList.jsx
import { NavLink, useSearchParams } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 左側目錄。topics 決定分組順序，同一主題的示範排在該組下面，篩完沒有項目的主題不畫。
 * NavLink 的 isActive 為真時，這一則用深色底標出目前頁。
 * 輸入框把關鍵字寫進查詢 q；空字串會清掉查詢，replace 讓每次輸入取代同一筆歷史紀錄。
 * 連到單則時帶上同一個 q，換頁後篩選還在。
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
    setParams(next ? { q: next } : {}, { replace: true });
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

- 在左側輸入「狀態」，網址列出現 `?q=...`，目錄只留下標題含這兩個字的列；直接打開帶 `?q=狀態` 的網址，結果相同。
- 清空輸入框後，問號消失，全部主題回到左側。重新整理仍是同一組篩選結果。
- 點篩過的某一則，網址變成 `/demos/…?q=…`，目錄的篩選仍在，那一列是深色。`NavLink` 判斷使用中只比對路徑，不看問號後面的部分。
- 每次輸入都用 `replace`，所以打完一個字詞再按上一頁，會離開這一頁，不必逐字倒退。

## 選讀：位置資訊

`useLocation` 把目前網址拆成路徑、查詢與雜湊，一次看完整段位置。它適合確認「現在瀏覽器實際停在哪裡」，也可以讀 `navigate` 或 `Link` 的 `state` 帶來的資料。改它的欄位不會換頁，換頁仍用連結或 `navigate`。

**語法**

```jsx
/**
 * 讀取目前這一段位置。
 * @returns {object} location
 *   pathname：路徑，例如 /where
 *   search：查詢字串，含問號；沒有時是空字串
 *   hash：雜湊，含井字號；沒有時是空字串
 *   state：換頁時用 state 選項帶來的資料；沒有時是 null
 *   key：這一筆歷史紀錄的識別
 */
const location = useLocation();
```

**觀念**

位置在渲染時就讀得到，直接畫出來即可。這一頁把路徑、查詢與雜湊印出來，打開 `/where?q=狀態#note` 可以看到三段分開；沒有查詢或雜湊的網址，兩行都顯示「（沒有）」。路由表要補上 `where`（見路徑參數那一節的摘錄），版型底下的「位置」連結就能點進來，左側目錄仍在，因為這一頁也是版型的子路由。

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

- 停在 `/where` 時，路徑是 `/where`，查詢與雜湊顯示「（沒有）」。
- 網址加上 `?q=狀態#note` 後，三行分別是 `/where`、查詢、`#note`；中文會是百分比編碼（`?q=%E7%8B%80%E6%85%8B`），因為 `search` 是瀏覽器網址原樣的字串，要解碼後的值用 `useSearchParams` 的 `get`。

# 找不到的頁面

沒有任何路由對上網址時，要有一頁說明找不到，並能回到目錄。這一章先看接住剩餘網址的星號路由，兩種放法的差別在左側目錄會不會留下來；再看沒有星號路由時，路由器怎麼處理對不上的網址，以及 `errorElement` 在哪個位置接手。

## 星號路由

路徑寫成 `*` 的路由叫星號路由（splat route），會對上前面所有路由都沒對上的網址。它的優先順序最低，固定路徑與含參數的路徑都會先被比對到，慣例上寫在最後一筆方便閱讀。星號放在哪一層，決定 404 會不會被版型包住。

**一覽**

- 星號在版型的 `children` 裡：未知網址仍畫進版型，目錄還在，主區換成 404。這是這份筆記站與最後專案採用的寫法。
- 星號與版型並列：未知網址不走進版型，整頁只剩 404，目錄一併消失。

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

### 星號放在版型裡

404 頁只負責主區的說明與回目錄連結。星號接住的那一段網址，可以用 `useParams` 的 `'*'` 欄位讀到，開頭沒有斜線；網址是 `/no-such` 時，它的值是 `no-such`。

**語法**

```jsx
/**
 * 接住前面沒有對上的路徑。放在版型 children 的最後一筆時，主區換成這個元素，目錄留著。
 * @type {{ path: string, element: React.ReactElement }}
 */
const missed = { path: '*', element: <NotFoundPage /> };

// 星號接住的那一段網址，在 params 的 '*' 欄位
const { '*': rest } = useParams();
```

**觀念**

路由表的寫法見路徑參數那一節的摘錄：星號是版型 `children` 裡的一筆。`demos/:slug` 比星號具體，所以 `/demos/01-hello` 不會掉進 404；`/demos/not-found` 也不會，它對上的是單則頁面，只是目錄裡沒有這個 `slug`，顯示的是那一頁自己的「沒有這則筆記」。

```jsx 04-react-router/src/pages/NotFoundPage.jsx
import { Link, useParams } from 'react-router';

/**
 * 沒有路由對上時的主區。星號放在版型裡，左側目錄還在，這裡只換主區的說明。
 * useParams 的 '*' 欄位是星號接住的那一段網址，回目錄的 Link 指向 /。
 */
export default function NotFoundPage() {
  const { '*': missed } = useParams();

  return (
    <section>
      <h1 className="text-2xl font-bold">找不到頁面</h1>
      <p className="mt-2">網址 /{missed} 沒有對上任何筆記。</p>
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

- 打開 `/no-such`，左側目錄還在，主區是「找不到頁面」，並寫出網址 `/no-such`。
- 網址有多段時（例如 `/a/b`），`'*'` 的值是 `a/b`。
- 點「回目錄」回到 `/`，主區是總覽，左側外框從頭到尾沒有換掉。

### 星號與版型並列

星號寫在最外層、與版型同級時，未知網址不會走進版型，目錄消失，整頁只剩 404 元件。這種寫法適合 404 想用完全不同外觀的網站；筆記站想讓使用者留在目錄旁，所以不採用。

**語法**

```jsx
/**
 * 星號與版型路由同級時，未知網址整頁換成 404，版型的目錄不會出現。
 * 04-react-router 的完成版不用這一種。
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

- 星號與版型同級，不在 `children` 裡；找不到時整頁換成 404，目錄不會出現。
- 兩種寫法選一種就好，不必同時放。

## 對不上網址時的錯誤處理

沒有星號路由時，路由器會把對不上的網址當成一個 404 錯誤，交給最上層那條路由的錯誤畫面處理；沒有指定時，顯示路由器內建的預設 404 畫面。錯誤畫面用路由上的 `errorElement` 指定，它不只處理 404：路由的 `loader`、`action` 或畫面出錯時，同樣由最近的那一層接手，下一章會實際用到。

**一覽**

- 星號路由：自己的元素當成一般頁面畫出來，不算錯誤，適合在版型內顯示 404。
- `errorElement`：寫在路由物件上的錯誤畫面。出錯時，路由器由內往外找最近的一個，換掉那條路由原本要畫的內容。
- `useRouteError` 取得錯誤內容；`isRouteErrorResponse` 判斷它是不是帶狀態碼的回應（例如 404）。

**語法**

```jsx
import { isRouteErrorResponse, useRouteError } from 'react-router';

/**
 * 錯誤畫面。對不上網址、loader 或 action 丟出錯誤、畫面出錯都會來到這裡。
 * @returns {React.ReactElement}
 */
function ErrorPage() {
  const error = useRouteError();

  // 帶狀態碼的回應，例如 404；其他錯誤是一般的 Error
  if (isRouteErrorResponse(error)) {
    return <h1>{error.status} {error.statusText}</h1>;
  }
  return <h1>出了點問題</h1>;
}

// 掛在路由上：這一層底下出的錯，由它接手
const route = { path: '/', element: <MainLayout />, errorElement: <ErrorPage />, children: [] };
```

**觀念**

星號路由與 `errorElement` 分工不同：網址根本不存在，用星號路由在版型內顯示 404；某一則資料讀不到或表單送出失敗，用 `errorElement` 只換掉出錯的那一塊。兩者可以並存，因為星號會先接住所有對不上的網址，`errorElement` 就只處理真正的錯誤。`errorElement` 的位置決定受影響的範圍：寫在版型上，出錯時整個版型一起被換掉；寫在子路由上，版型仍在，只有那一塊主區換成錯誤畫面。讀不到資料時怎麼丟出 404、怎麼在子路由放 `errorElement`，在下一章的「errorElement」那一節示範。

# 讀取與送出資料

路由與連結接上之後，頁面還要能取得資料，也要能把表單送出去。資料模式把這兩件事寫在路由物件上：進頁前先讀取資料，送出時由路由接手處理，讀取或送出出錯時有固定的畫面可以換。這一章依序學這幾個部分。

- `loader`：進頁前執行的函式，回傳值由 `useLoaderData` 讀取。
- `action`：接收 `Form` 送出的資料，回傳值由 `useActionData` 讀取。
- `redirect`：`action` 完成後把使用者帶去另一個網址。
- `errorElement`：`loader` 或 `action` 丟出錯誤時顯示的畫面。
- `useFetcher` 與 `useNavigation`：不換頁的送出，以及換頁或送出時的「進行中」狀態。

每一則練習的網址就是範例檔名去掉副檔名，從 86-loader 到 92-fetcher-key，網址前面加上 /demos/。

{% note info %}
**哪一種路由器能用**
這一章的功能只配合資料路由器，也就是 createBrowserRouter、createHashRouter、createMemoryRouter 這幾個函式建立的路由器，再交給 RouterProvider。框架模式則是在路由模組裡匯出 loader 與 action。宣告式的 BrowserRouter 與 Routes 不支援，三種接法見[三種使用模式](#三種使用模式)。
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
  action -->|"回傳值"| actionHook["useActionData"]
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

示範資料有兩個來源：86 與 89 到 91 讀寫 notes-db.js 裡的陣列，87 與 88 用 fake-api.js。陣列只存在記憶體，重新整理頁面就回到最初的「看海」與「寫筆記」兩筆。

## 用 loader 讀資料

`loader` 是掛在路由物件上的函式，路由器在畫出這個網址的元件之前先執行它，等它做完才換頁。這一節先讀記憶體裡的清單，還沒有表單，目的是看清楚資料從 `loader` 流到畫面的路線。

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

`loader` 收到一個物件，目前常用的是其中兩個欄位：

- `request`：代表這次請求的標準 Request 物件，網址上的查詢參數可以從它的網址取得。
- `params`：路徑參數，例如 `demos/:slug` 對上時的 `slug`。

回傳什麼，元件裡的 `useLoaderData` 就拿到什麼；回傳 Promise 時路由器會等它完成。資料因此在畫面出現之前就備好，元件不必先畫一個空畫面，再靠 effect 與 state 補資料。

示範的資料放在 notes-db.js。它把陣列留在模組變數裡，再匯出讀寫函式，讓不同檔案共用同一份資料。匯入與匯出的規則見選讀的 ES Module 一章：{% post_link lokiTech-15day-06-js-basics %}。

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

- `listNotes` 回傳整份陣列，`getNote` 依 id 找一筆，找不到時回傳 `null`。
- `addNote` 與 `toggleNote` 不直接改陣列，而是建立新陣列再取代舊的，和 state 的不可變更新是同一個習慣。

下面是第一則 demo。

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

- 打開 `/demos/86-loader`，路由器先跑 `loader`，畫面直接是「看海」與「寫筆記」兩列（剛重新整理時；在別的示範新增過筆記，這裡也會多出來）。從側欄點進來時，舊畫面會留著，直到資料備好才換頁。
- 元件裡沒有 `useEffect` 也沒有 `useState`，資料完全來自 `useLoaderData`。

路由物件把 loader 與元件掛在一起。每個示範檔匯出的函式都叫 loader，所以 App.jsx 匯入時用 as 改名來區分。完整的路由表見前面的「路由表與版型」，這裡只看這一筆：

```jsx
{ path: 'demos/86-loader', loader: loader86, Component: LoaderDemo },
```

路由器依路徑的具體程度比對，`demos/86-loader` 比 `demos/:slug` 具體，所以與寫在路由表裡的先後無關。

## 用 action 與 Form 送出

讀取之後是寫入。React Router 提供的 `Form` 送出時不會整頁重載，而是把欄位交給路由上的 action，路由器等它做完再更新畫面。這一節用一個「新增標題」的表單，看 action 怎麼讀欄位、怎麼回報錯誤。

{% mermaid graph TD %}
  form["Form method=post"] --> action["action"]
  action -->|"createItem 回傳 { item }"| hook["useActionData 顯示"]
  action -->|"回傳 data errors 400"| hook
  style form fill:#e3f2fd
  style action fill:#fff3e0
  style hook fill:#e8f5e9
{% endmermaid %}

**觀念**

action 與 loader 一樣收到 request，但它處理的是送出的內容。`await request.formData()` 取得 FormData（瀏覽器內建、存放表單欄位的物件），再用 `get` 依欄位名讀值；欄位不存在時是 null。這個 get 是 FormData 的方法，和 HTTP 的 GET 無關。

action 的回傳值由頁面的 `useActionData` 讀取，第一次送出之前是 undefined。驗證不過時回傳帶 400 狀態碼的錯誤物件，表單與頁面都留在原處，才有地方顯示錯誤訊息。

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

- 填一個標題再按「新增」，畫面出現伺服器回傳的 id 與標題，網址仍是 `/demos/87-action`。jsonplaceholder 接受 POST 並回傳帶 id 的物件，但不會真的存起來，所以這一則沒有清單。
- `Form` 會自己攔下瀏覽器預設的整頁送出，不必寫 `event.preventDefault()`。只有想在送出前自己攔下來時，才在 `onSubmit` 裡呼叫它。
- 沒有 `action` 屬性時，表單送到目前這條路由的 `action`。
- 標題留白時，`action` 回傳 400 的錯誤物件，輸入框下面出現「請填標題」。這是回傳而不是 throw，頁面還在，才能顯示訊息；throw 會換成錯誤畫面，下一節說明。
- `data(..., { status: 400 })` 只是替回應標上狀態碼，頁面讀到的仍是那份物件，讀法與直接回傳相同。另一個作用是：action 成功後路由器會重跑 loader 更新畫面（稱為重新驗證，見 useFetcher 一節），狀態碼不是 2xx 時就不會重跑。
- 因為 `useActionData` 一開始是 `undefined`，所以寫成 `result?.errors?.title` 與 `result?.item`。

這條路由只掛 action 與元件，不需要 loader：

```jsx
{ path: 'demos/87-action', action: action87, Component: ActionDemo },
```

## redirect：送出後轉址

資料寫入成功之後，使用者通常不該停在表單上，而是回到列表。`redirect` 產生一個轉址回應，action 把它回傳，路由器就改去那個網址，並執行新網址的 loader。這一節用列表加編輯頁兩條路由示範。

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

列表與編輯是兩條路由。編輯頁的表單送到這一條的 action，寫入後轉址，路由器改去列表路徑並重跑列表的 loader，畫面上就是新的標題。

### 步驟 1：列表頁

列表路由只負責讀取：loader 取得清單，每一列連到編輯頁。

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

- `loader` 進頁前呼叫 `getItems`，回傳 `{ items }`，頁面用 `useLoaderData` 接。
- 每一列的「編輯」連到 `/demos/88-redirect-edit/:itemId`，`itemId` 是該筆的 id。

### 步驟 2：編輯頁

編輯路由同時有 loader 與 action：前者依路徑參數找出要編輯的那一筆，後者把新標題寫回去，最後轉址。

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

- `loader` 的 `params.itemId` 是路徑上的 id，用它找出這一筆，輸入框用 `defaultValue` 帶入目前標題。
- `action` 讀 `title`、呼叫 `updateItem` 寫入，最後一行 `return redirect('/demos/88-redirect-list')` 把使用者帶回列表。
- `getItems` 與 `updateItem` 共用同一份還留在記憶體裡的清單，所以回到列表時讀到的是剛改的標題。

{% note info %}
**return 還是 throw**
redirect 回傳的是一個 Response 物件，在 action 或 loader 裡用 return 或 throw 效果相同。寫在函式最後一行就用 return；需要從輔助函式深處直接跳走時用 throw，例如「沒登入就轉去登入頁」的檢查。預設狀態碼是 302。
{% endnote %}

### 步驟 3：在路由表掛上兩條路由

兩條路由各有自己的路徑：列表只掛 loader，編輯頁掛 loader 與 action，路徑中的 :itemId 就是編輯頁 loader 讀到的 params.itemId。

```jsx
{
  path: 'demos/88-redirect-list',
  loader: loader88List,
  Component: RedirectList,
},
{
  path: 'demos/88-redirect-edit/:itemId',
  loader: loader88Edit,
  action: action88,
  Component: RedirectEdit,
},
```

**解析**

- 側欄只列列表那一則，編輯頁是從列表點進去的。
- 兩個檔案都匯出叫 `loader` 的函式，所以在 `App.jsx` 匯入時分別改名成 `loader88List` 與 `loader88Edit`。

## errorElement：拿不到資料時

資料不一定拿得到，例如網址上的 id 根本不存在。這時 loader 不該回傳一份空資料讓頁面硬畫，而是丟出錯誤；路由器不再渲染這條路由的元件，改畫 `errorElement` 指定的畫面。這一節示範明細頁找不到筆記時的 404。

{% mermaid graph TD %}
  loader["loader"] -->|"throw data"| err["errorElement"]
  err --> hook["useRouteError"]
  style loader fill:#e3f2fd
  style err fill:#ffebee
  style hook fill:#ffebee
{% endmermaid %}

**觀念**

`data(body, { status })` 把內容和狀態碼包在一起。在 loader 裡要用 throw 丟出它，函式才會停住、元件才不會渲染；如果只是 return，它會被當成正常資料。

錯誤畫面用 `useRouteError` 讀出被丟出的值。這個值有兩種，用 `isRouteErrorResponse` 判斷是哪一種：

- 丟出 data 時的路由錯誤回應，帶有 status（狀態碼）與 data（內容）。
- 程式出錯時的一般 Error，帶有 message。

錯誤會往上找最近一層有 `errorElement` 的路由，只換掉那一層以下的畫面。掛在明細路由時，版型留著，只換 `Outlet` 裡的主區；只掛在上層版型或都沒掛時，連版型一起被換掉。

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

驗證錯誤與找不到資料要分開處理：使用者填錯欄位，用 return 把錯誤交給 useActionData，表單留在原頁；資料根本不存在，才用 throw 交給錯誤畫面。

路由表裡，只有明細那一條掛 errorElement。路徑的 :noteId 對上 notes/ 後面的任何一段，所以網址最後是 not-found 也是這條路由，`params.noteId` 的值就是 not-found。

```jsx
{
  path: 'demos/89-error-element',
  loader: loader89,
  Component: ErrorElementDemo,
},
{
  path: 'demos/89-error-element/notes/:noteId',
  loader: loader89,
  Component: NoteDetail,
  errorElement: <NoteMissing />,
},
```

89-error-element.jsx 放了清單、明細，以及明細路由的錯誤畫面。兩條路由共用同一個 loader：沒有 noteId 時回傳清單，有時找那一筆。

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

- 「打開一筆不存在的筆記」連到 `/demos/89-error-element/notes/not-found`，`getNote` 回傳 `null`，`loader` 就 `throw data('找不到', { status: 404 })`。
- `NoteDetail` 不會渲染，主區換成 `NoteMissing`，側欄與版型都還在。
- `isRouteErrorResponse(error)` 為真，畫面標題是「找不到」，內文是 `error.data`，也就是 `data()` 的第一個引數。

{% note info %}
**errorElement 與 ErrorBoundary**
路由物件上還有 `ErrorBoundary`，作用相同，但傳的是元件而不是元素，兩者不能同時使用。React Router 8 兩種都支援，官方文件現在以 ErrorBoundary 為主，這門課的專案沿用 errorElement。
{% endnote %}

{% note info %}
資料模式的網站是單頁應用，瀏覽器實際拿到的網頁仍是 HTTP 200，這個 404 只作用在畫面上。只有框架模式搭配伺服器端渲染，才會把狀態碼真的送出去。
{% endnote %}

## 不換頁的送出與讀取中狀態

有些送出不該改網址，例如在列表上把一筆標成完成；有些換頁或送出需要讓人看見「正在進行」。這一節的三則依序是：`useFetcher` 不換頁送出，`useNavigation` 顯示換頁時的進行中狀態，最後是專案裡的對話框常用的「用 key 共用 fetcher」。

### useFetcher

Form 送出算是一次導覽，路由器會照換頁的流程處理，也可能留下瀏覽歷史。`useFetcher` 取得一組自己的送出工具，送到的仍是這條路由的 action，但不算導覽，網址不動。它回傳的物件有這幾個成員：

- `fetcher.Form`：用法與 `Form` 相同，送出時走 fetcher。
- `fetcher.submit`：用程式送出，不一定要有表單。
- `fetcher.load`：不經過導覽，直接執行某條路由的 `loader`。
- `fetcher.state`：`idle`（閒置）、`submitting`（正在跑 `action`）、`loading`（正在重新讀取資料）。
- `fetcher.data`：`action` 或 `loader` 最近一次的回傳值。fetcher 送出的結果只會出現在這裡，不會出現在 `useActionData`。
- `fetcher.reset`：把 fetcher 清回沒有資料的閒置狀態。

action 做完之後，路由器會自動重跑目前畫面上各條路由的 loader，讓畫面與資料一致，這個動作叫重新驗證（revalidation）。只有 action 的回應是 2xx 才會發生，所以這一則不必手動更新清單。

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

**觀念**

每一列的按鈕包在 fetcher.Form 裡，用隱藏欄位帶 id。action 讀出 id 後翻轉那一筆，清單的更新則交給重新驗證。

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

- 按下「標成完成」或「改回未完成」，同一列的文字換成另一種狀態，網址仍是 `/demos/90-fetcher`。標題下面的「狀態」依序是 submitting、loading、idle，讀記憶體很快，肉眼可能只看到一閃。
- 寫入的是 `action` 裡的 `toggleNote`，清單會更新是因為 `loader` 在 `action` 之後自動重跑。
- 所有列共用同一個 fetcher，「狀態」只反映最近一次送出。若每一列都要有自己的狀態，就把列拆成元件，各自呼叫 `useFetcher`。

```jsx
{
  path: 'demos/90-fetcher',
  loader: loader90,
  action: action90,
  Component: FetcherDemo,
},
```

{% note info %}
**不想重新驗證時**
預設的重新驗證不必設定。想控制時，可以在路由物件上寫 `shouldRevalidate` 函式，回傳 false 就跳過；單次送出也能傳 `defaultShouldRevalidate={false}` 跳過。action 回傳 4xx 或 5xx 狀態碼（例如 400）時，預設也不重新驗證。
{% endnote %}

### useNavigation

`useNavigation` 描述路由器此刻有沒有在換頁或送出表單，不包含 fetcher。它的 state 有三種值：

- idle：閒置。
- loading：正在跑 loader。
- submitting：正在跑 action。

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

點連結到有 loader 的頁面時，依序是 idle、loading、idle；送出表單時依序是 idle、submitting、loading、idle，action 之後沒有 loader 要重跑時，loading 一閃而過。程式可以依 state 顯示讀取列，或在 submitting 期間停用按鈕，避免同一份表單連按兩次。

**觀念**

「重新讀取」連到同一頁但查詢參數 n 不同的網址，查詢參數一變，這條路由的 loader 就會重跑。為了讓進行中的畫面看得清楚，這一則的 loader 與 action 各等 400 毫秒；讀記憶體本來很快，實際專案不需要這段延遲。

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

- 點「重新讀取」，「狀態」變成 loading 並出現「讀取中」，約 400 毫秒後回到 idle。換頁期間舊內容仍留在畫面上。
- 按「新增」，狀態先是 submitting（約 400 毫秒，按鈕停用），接著 loading（`loader` 再等 400 毫秒），清單出現新的一筆後回到 idle。
- 按鈕只在 `submitting` 時停用，`loading` 階段已經可以再按。若要整段都鎖住，改成 `state !== 'idle'`。

```jsx
{
  path: 'demos/91-navigation',
  loader: loader91,
  action: action91,
  Component: NavigationDemo,
},
```

### 用 key 共用 fetcher

常見的流程是：按下按鈕彈出對話框，送出成功後關掉對話框並顯示提示。對話框元件關起來就卸載，但送出的結果頁面還需要。解法是兩邊呼叫 `useFetcher({ key })` 時傳同一把 key，路由器就讓它們共用同一個 fetcher：表單只負責送出，頁面在渲染時讀結果。沒有 key 時，每個元件各有自己的 fetcher。

{% mermaid graph TD %}
  subgraph share["useFetcher({ key })"]
    page["頁面"]
    form["表單"]
  end
  form -->|"submit"| action["action"]
  action -->|"fetcher.data"| page
  page -->|"有新結果，關閉表單"| ui["畫面"]
{% endmermaid %}

**觀念**

頁面在渲染時檢查：fetcher 閒置、有新的提示，而且這份資料還沒處理過，就關起表單並記下提示。「處理過」用一個 state 記住那份資料，讓同一筆結果只處理一次。這樣不需要 effect，因為在渲染中以條件式設定自己元件的 state 是 React 允許的寫法。表單關掉後，只要頁面還在用這把 key，fetcher 與它的資料就留著；再次打開表單前呼叫 `reset`，把 fetcher 清回沒有資料的狀態。

```jsx 04-react-router/src/examples/92-fetcher-key.jsx
import { useState } from 'react';
import { useFetcher } from 'react-router';

/**
 * 接收表單。讀 title，回傳 { notice }。同一 key 的 useFetcher 可從 fetcher.data 讀到這份結果。
 * @param {{ request: Request }} args
 * @returns {Promise<{ notice: string }>}
 */
export const action = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '');
  return { notice: `已送出：${title}` };
};

/**
 * 子表單。useFetcher({ key: 'notice-form' }) 與頁面共用同一個 fetcher，只負責送出標題。
 * @param {{ onClose: () => void }} props
 * @returns {JSX.Element}
 */
function NoticeForm({ onClose }) {
  /**
   * 與頁面共用同一個 fetcher。Form 把標題送到這一條路由的 action，網址不變。
   * @returns {{ Form: React.ElementType, state: 'idle' | 'loading' | 'submitting', data: { notice?: string } | undefined, reset: () => void }}
   */
  const fetcher = useFetcher({ key: 'notice-form' });
  return (
    <fetcher.Form method="post" className="mt-4 grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        defaultValue="看海"
      />
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          disabled={fetcher.state !== 'idle'}
        >
          送出
        </button>
        <button
          type="button"
          className="rounded border px-3 py-1"
          onClick={onClose}
        >
          取消
        </button>
      </div>
    </fetcher.Form>
  );
}

/**
 * 示範頁。useFetcher({ key: 'notice-form' }) 與 NoticeForm 共用同一個 fetcher。
 * 渲染時比對尚未處理的 fetcher.data；有 notice 就關起表單並顯示提示。
 * 再次打開時呼叫 fetcher.reset()，清掉上一次留下的資料。
 * @returns {JSX.Element}
 */
export default function FetcherKeyDemo() {
  /**
   * 與 NoticeForm 共用同一個 fetcher。data 是 action 的回傳值。
   * reset 把 fetcher 清回空的 idle。
   * @returns {{ state: 'idle' | 'loading' | 'submitting', data: { notice?: string } | undefined, reset: () => void }}
   */
  const fetcher = useFetcher({ key: 'notice-form' });
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [seen, setSeen] = useState(null);
  if (
    fetcher.state === 'idle' &&
    fetcher.data?.notice &&
    fetcher.data !== seen
  ) {
    setSeen(fetcher.data);
    setOpen(false);
    setNotice(fetcher.data.notice);
  }

  const openForm = () => {
    fetcher.reset();
    setOpen(true);
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">92 用 key 共用 fetcher</h1>
      {notice ? <p className="mt-3">{notice}</p> : null}
      {open ? (
        <NoticeForm onClose={() => setOpen(false)} />
      ) : (
        <button
          type="button"
          className="mt-4 rounded bg-teal-800 px-3 py-1 text-white"
          onClick={openForm}
        >
          打開表單
        </button>
      )}
    </section>
  );
}
```

**解析**

- 頁面與 `NoticeForm` 都呼叫 `useFetcher({ key: 'notice-form' })`，拿到同一個 fetcher。
- 按「送出」後，`action` 回傳 `{ notice: '已送出：看海' }`。頁面渲染時發現這是沒處理過的新結果，關起表單，並在標題下方顯示提示，網址仍是 `/demos/92-fetcher-key`。
- 再按「打開表單」時，`reset()` 清掉上一次的 `data`。同一筆結果不會被重複處理是靠 `seen`，`reset` 只是讓 fetcher 回到乾淨的起點。

```jsx
{
  path: 'demos/92-fetcher-key',
  action: action92,
  Component: FetcherKeyDemo,
},
```

# 選讀：部署到 GitHub Pages

`pnpm build` 產生的 `dist` 資料夾就是一般的靜態檔案，GitHub Pages 可以免費代管。這一章先說明用 GitHub Actions 自動建置與發佈的流程，以及專案頁網址多出一段子路徑時要設定的 `base`。接著處理單頁應用程式在靜態主機上最常見的問題：直接打開或重新整理 `/demos/01-hello` 會得到 404，解法有 `404.html` 與 `createHashRouter` 兩種。

## 建置與發佈

GitHub Pages 是純靜態主機，只負責把檔案送出去。這一節看如何讓 GitHub 在每次推送後自動建置，並設定專案頁需要的子路徑。

### 用 GitHub Actions 發佈

GitHub Actions 是 GitHub 內建的自動化服務，推送程式碼時可以替你執行指令。發佈步驟是：到倉庫的 Settings → Pages，把 Build and deployment 的 Source 改成 GitHub Actions；再在倉庫根目錄新增工作流程檔 `.github/workflows/deploy.yml`。

**觀念**

工作流程做四件事：取得程式碼、安裝套件並建置、把 `dist` 打包成 Pages 的上傳檔、部署出去。其中後三個動作是 GitHub 官方提供的 Pages 專用動作。下面的範例依 Vite 官方文件的寫法調整成 pnpm，練習倉庫的專案在子資料夾，所以建置指令要指定資料夾；若你的專案就在倉庫根目錄，拿掉 `working-directory` 與路徑前綴即可。

```yaml
# .github/workflows/deploy.yml（說明用，不在練習專案內）
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: npm install -g pnpm
      - run: pnpm install --frozen-lockfile
        working-directory: 04-react-router
      - run: pnpm build
        working-directory: 04-react-router
      # SPA 的 404 備援，下一節說明
      - run: cp dist/index.html dist/404.html
        working-directory: 04-react-router
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: 04-react-router/dist
      - id: deployment
        uses: actions/deploy-pages@v5
```

**解析**

- `permissions` 授權工作流程寫入 Pages，`environment` 的名稱 `github-pages` 讓部署結果顯示在倉庫的 Environments。
- 每次推送到 `main`，或在 Actions 頁面手動執行，就會重新建置並覆蓋上一版網站。
- 動作版本以撰寫時 Vite 官方文件列出的為準；實際使用時請對照該頁，動作升版很快。
- `cp` 那一步是 Linux 指令，只在 GitHub 的 Ubuntu 機器上執行，不影響你本機的 Windows 或 Mac。

### 專案頁的 base

網址有兩種形式。用 `帳號.github.io` 倉庫本身或自訂網域，網站從 `/` 開始，什麼都不用設。一般倉庫的專案頁網址是 `https://帳號.github.io/倉庫名稱/`，多了 `/倉庫名稱/` 這段，打包後的 JS 與 CSS 要到這段底下找，否則整頁會是空白。

解法是在 `vite.config.js` 設定 `base` 選項，只需在 `defineConfig` 裡加上這一項：

```js
export default defineConfig({
  base: '/倉庫名稱/', // 專案頁才需要；其餘設定照舊
  // plugins: [...]
});
```

練習專案的路由已經配合好：`App.jsx` 用 `import.meta.env.BASE_URL` 算出 `basename` 交給路由器。`base` 一改，`BASE_URL` 跟著變，路由就從這段子路徑算起，元件裡的 `to="/demos/01-hello"` 都不用改。

## 重新整理後的 404

單頁應用程式只有一份 `index.html`，網址其實是 React Router 在瀏覽器裡畫出來的。靜態主機不知道這件事，這一節說明問題的成因與兩種解法。

### 為什麼會 404

從首頁點目錄進 `/demos/01-hello` 都正常，因為這是瀏覽器內的換頁，沒有向伺服器要新文件。問題出在直接輸入網址或按重新整理：伺服器會去找 `demos/01-hello` 這個檔案，找不到就回 404，React 根本沒機會載入。開發時沒遇過，是因為 Vite 的開發伺服器對未知路徑一律回 `index.html`。

GitHub Pages 無法設定「其他路徑都改走 `index.html`」的規則，常見的做法有兩種：

- 用 `404.html` 接住：找不到檔案時 GitHub 會回傳 `404.html`，讓它的內容和 `index.html` 一樣，React 照樣載入，路由器再依網址畫出那一頁。
- 改用 `createHashRouter`：路徑放在 `#` 後面，伺服器永遠只收到首頁的請求。

### 404.html 備援

**觀念**

每次建置後，把 `dist/index.html` 複製成 `dist/404.html` 再部署。打包後的檔名帶有雜湊，所以每次都要重新複製，不能沿用舊的。上一節的工作流程已經包含這一步；本機要試的話可以手動執行：

```bash
cp dist/index.html dist/404.html
```

**解析**

- 使用者重新整理 `/demos/01-hello` 時，GitHub 找不到該檔，改送 `404.html`，瀏覽器載入同一份程式，路由器看網址就畫出對應頁面。
- 這份回應的 HTTP 狀態碼仍是 404。瀏覽器照樣畫出頁面，使用者看不出差別，但搜尋引擎會把它當成錯誤頁，需要被收錄的網站不適合這個做法。
- 本機的 `pnpm preview` 和開發伺服器一樣會把未知路徑改送 `index.html`，所以在本機看不出 404 問題，要部署後才會遇到。

### createHashRouter

**觀念**

`createHashRouter` 把目前頁面放在 `#` 後面，例如 `/#/demos/01-hello`。伺服器只會收到 `#` 前面的路徑，靜態主機只要能打開 `index.html` 就夠了，不需要 `404.html`。代價是網址比較不好看，搜尋引擎也不易分辨各頁。

它和 `createBrowserRouter` 接收同樣的路由表與選項（包含 `basename`），回傳的路由器同樣交給 `RouterProvider`。換用時只改建立路由器的那一行，其餘不動：

```jsx
import { createHashRouter, RouterProvider } from 'react-router';

const router = createHashRouter(routes, { basename });

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- `routes` 與 `basename` 都是原來的變數，換掉的只有建立路由器的函式。
- 這只在資料模式（Data Mode）可用，不能再於外面包 `HashRouter`；`RouterProvider` 已經負責畫出路由。
- 本課的完成版仍用 `createBrowserRouter`，只有在主機無法提供 `404.html` 備援時才改用 `createHashRouter`。

{% note info %}
有 `404.html` 與 `createHashRouter` 以外的選項：改放到支援「改寫規則」的主機（例如 Firebase Hosting 的 rewrite），所有路徑都回 `index.html`，網址乾淨且狀態碼正常。Firebase 的部署步驟見後面的選讀文章。
{% endnote %}

# 回家作業

這份作業只用必教內容，資料取自專案的行程清單，題目依序累加。請用 `pnpm dev` 開啟練習專案，再到 `/homework.html`：作業用雜湊路由，網址會是 `homework.html#/tours`。課堂上不會批改，也不講解；每一題都附上完成後該看到的結果，可以自己對照。做完或卡住時，再看練習 repo 根目錄 `homework/11-react-router/` 裡的標準答案。

## 起始檔

起始檔在練習專案的 `04-react-router/` 裡：`homework.html` 是入口頁，`src/homework/main.jsx` 建立路由器，`src/homework/data.js` 提供模擬的行程與報名資料（每個函式都會延遲約三百毫秒，模擬網路）。

起始檔只有路由器，頁面要自己建檔。照本篇練習專案的做法，每一頁各放一個檔案在 `src/homework/` 底下（檔名自訂，例如 `Layout.jsx`、`Tours.jsx`），該頁的 `loader` 與 `action` 用具名匯出放在同一個檔案，預設匯出元件，再回到 `main.jsx` 引入並組進路由表。

```jsx 04-react-router/src/homework/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import '../index.css';

const router = createHashRouter([
  { path: '/', element: <p>在這裡開始寫</p> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

```js 04-react-router/src/homework/data.js
const tours = [
  { id: 'taipei-beitou', title: '台北大稻埕與北投溫泉三日', region: '台北', theme: '城市', days: 3, price: 18600 },
  { id: 'keelung-jiufen', title: '基隆北海岸與九份兩日', region: '基隆', theme: '海岸', days: 2, price: 9200 },
  { id: 'hualien-taroko', title: '花蓮太魯閣與七星潭四日', region: '花蓮', theme: '山海', days: 4, price: 26800 },
  { id: 'taitung-chishang', title: '台東池上與成功海岸三日', region: '台東', theme: '山海', days: 3, price: 21400 },
  { id: 'tainan-anping', title: '台南府城與安平兩日', region: '台南', theme: '古都', days: 2, price: 8800 },
  { id: 'kaohsiung-qijin', title: '高雄港都與旗津三日', region: '高雄', theme: '城市', days: 3, price: 14200 },
  { id: 'kinmen-villages', title: '金門聚落與戰地三日', region: '金門', theme: '離島', days: 3, price: 16800 },
  { id: 'kyoto-nara', title: '京都嵐山、伏見與奈良五日', region: '京都', theme: '日本', days: 5, price: 52800 },
];

const bookings = [];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTours() {
  await wait(300);
  return tours;
}

export async function getTour(id) {
  await wait(300);
  return tours.find((tour) => tour.id === id) ?? null;
}

export async function addBooking(booking) {
  await wait(400);
  const saved = { ...booking, id: bookings.length + 1 };
  bookings.push(saved);
  return saved;
}

export async function getBookings() {
  await wait(300);
  return bookings;
}
```

## 題目

### 題目一：版型與導覽

建立一個版型路由，頁首有「首頁」「行程」「報名」三個導覽連結，目前所在的連結要有不同外觀；各頁內容顯示在版型的出口。先為三個路徑各建立一個只有標題的頁面，路徑分別是 `/`、`/tours` 與 `/booking`。

完成後點三個連結會換頁但頁首不會重新載入，目前頁面的連結是亮的。

### 題目二：用 loader 讀行程列表

行程頁用 loader 取得 `getTours()` 的結果並顯示成列表。換頁讀取期間在頁首顯示「載入中」。

完成後點「行程」先看到「載入中」，約半秒後出現八筆行程。

### 題目三：用網址保存篩選

在行程頁加主題篩選（主題連結之外再放一個「全部」，點了會清掉查詢參數），選到的主題寫進網址的查詢參數（例如 `?theme=城市`），列表依網址顯示。重新整理頁面後篩選仍在。

完成後點「城市」網址多出 `?theme=城市`，列表剩兩筆；貼上這個網址重新開啟，結果相同。

### 題目四：詳情頁與找不到

每筆行程可以點進詳情頁，路徑帶行程編號，用 loader 讀取單筆資料。編號不存在時要丟出 404，並由路由的錯誤畫面顯示「找不到這個行程」。

完成後點進任一行程顯示標題、天數與價格；把網址的編號改成不存在的值，看到「找不到這個行程」。

### 題目五：報名表單與轉址

在報名頁放一個表單（姓名、行程、人數），用 action 呼叫 `addBooking` 儲存，成功後轉址到 `/bookings`，那是顯示報名清單的頁面，清單用 loader 讀取 `getBookings()`。送出期間按鈕要停用並顯示「送出中」。

完成後送出表單，頁面轉到報名清單並看到剛才那筆；送出的過程中按鈕無法重複點擊。

# 本篇重點回顧

選讀的部分是「選讀：宣告式」、「選讀：框架模式」、「選讀：位置資訊」與「選讀：部署到 GitHub Pages」，其餘都是課堂主線。

- 路由讓網址決定畫哪一頁，並能保留瀏覽歷史與重新整理後的位置；React Router 有宣告式、資料、框架三種模式，課堂使用資料模式。
- 專案由 `03-react` 複製並安裝 `react-router`，路由器以 `createBrowserRouter` 建立，再交給 RouterProvider 畫出來。
- 路由表是物件陣列，路由器依路徑的具體程度比對，共用的版型用 `children` 與 Outlet 放進各頁。
- 換頁用 Link，選單要標出目前頁就用 NavLink，連到 `/` 的 NavLink 只在根路徑算使用中。
- 網址上會變的片段用路徑參數與 `useParams` 讀取，要保存篩選條件則用查詢參數與 `useSearchParams`。
- 沒有路由對上時用星號路由接住，放在版型的 `children` 裡就能在 404 時保留左側目錄。
- 路由用 `loader` 在進頁前讀資料，用 `action` 搭配 Form 接收送出，成功後以 redirect 轉址。
- 資料拿不到時丟出錯誤由 `errorElement` 顯示，不換頁的送出用 `useFetcher`，換頁與送出的進行中狀態則用 `useNavigation` 讀取。

# 專有名詞中英對照

## 認識路由

- 路由（routing）
- 資料模式（Data Mode）
- 宣告式模式（Declarative Mode）
- 框架模式（Framework Mode）
- 檔案路由（file-based routing）
- 伺服器端渲染（SSR）
- 搜尋引擎最佳化（SEO）
- 程式碼切分（code splitting）
- 路由模組（route module）

## 啟用路由

- 歷史功能（History API）
- 基底路徑（basename）
- 路由表（route table）
- 巢狀路由（nested route）
- 索引路由（index route）
- 子路由（child route）
- 動態片段（dynamic segment）
- 版型（layout）
- 捲動還原（ScrollRestoration）

## 連結與選單

- 換頁連結（Link）
- 絕對路徑（absolute path）
- 相對路徑（relative path）
- 使用中（isActive）
- 路徑參數（path param）
- 查詢參數（search params）
- 位置（location）
- 雜湊（hash）

## 找不到的頁面

- 星號路由（splat route）
- 錯誤畫面（errorElement）

## 讀取與送出資料

- 資料路由器（data router）
- 不可變更新（immutable update）
- 狀態碼（status code）
- 重新驗證（revalidation）
- 轉址（redirect）
- 路由錯誤回應（route error response）

## 選讀：部署到 GitHub Pages

- 靜態主機（static host）
- 專案頁（project page）
- 子路徑（subpath）
- 改寫規則（rewrite）
