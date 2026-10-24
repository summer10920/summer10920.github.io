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

網址決定現在畫哪一頁。這一篇用 React Router 8，從 `react-router` 引入，預設是 `BrowserRouter`。你會把清單、詳情與表單接成選單，用查詢參數把 id 帶到表單，並為對不上的網址留下 404。官方說明在 [reactrouter.com](https://reactrouter.com)。

<!-- more -->

# 啟用路由

這一章用 React Router 8，套件是 `react-router`。官方說明在 [reactrouter.com](https://reactrouter.com)。預設用 `BrowserRouter`。若文件要你從 `react-router-dom` 引入，那是舊版套件的入口。

路由讓網址決定畫哪一頁。選單用連結換頁，瀏覽器的上一頁才回得去。基礎篇用狀態切換示範時，網址不會變，所以不適合整個站。

{% mermaid graph LR %}
  urlNode["網址"] --> tableNode["路由表對上 Route"]
  tableNode --> layoutNode["版型"]
  layoutNode --> slotNode["Outlet 畫出子頁"]
  style urlNode fill:#e3f2fd
  style tableNode fill:#fff3e0
  style layoutNode fill:#e3f2fd
  style slotNode fill:#e8f5e9
{% endmermaid %}

{% note info %}
**另一種模式**
`createBrowserRouter` 的 loader 與 action 屬於 data 模式，框架模式還會把路由寫進檔案慣例。這門課只用宣告式的 `BrowserRouter`。
{% endnote %}

## 安裝與啟用

套件是 `react-router`。

最外層包 `BrowserRouter`，裡面用 `Routes` 與 Route 把路徑對到元件。

版型用 `Outlet` 把這一頁的內容嵌進選單下面。

- `BrowserRouter` 聽瀏覽器網址。它要包住所有會用到路由的元件。
- `Route` 的 `path` 對上時，才畫它的 element。
- `Outlet` 是版型裡「子路由出現的位置」。沒有它，子頁面沒有地方畫。

### BrowserRouter

`main.jsx` 在嚴格模式裡面加上路由。元件仍從 `#root` 畫起，只是多了一層知道網址的元件。

**觀念**

`BrowserRouter` 使用瀏覽器的 History API。網址是一般路徑，不是井字號後面的片段。開發伺服器已經會把未知路徑回傳同一份 index，所以重新整理子頁面也不會變成找不到檔案。

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

終端機在這個專案執行 `pnpm dev` 後，打開首頁應看得到版型與「路由已經接上」。

**解析**

- 引入來源是 `react-router`。不要再裝一套 `react-router-dom` 來拿同樣的元件。
- `BrowserRouter` 放在 `App` 外面，整棵樹才讀得到網址。
- 嚴格模式仍包在最外層。它不取代路由。
- 還沒有 `basename`。本機開發的路徑從網站根目錄算起。

{% note success %}
**換你試試：**
確認 `package.json` 的依賴有 `react-router`，而且版本是 8。沒有的話用 pnpm 安裝。
{% endnote %}

<details>
<summary>參考答案</summary>

在 `04-react-router` 安裝。React 與 React DOM 維持 19。

```bash
pnpm add react-router@8
```

裝好後 `main.jsx` 的引入才找得到 `BrowserRouter`。

</details>

### 路由表

`Routes` 是路由表。它看目前網址，畫出第一個對上的 `Route`。

起始版只有首頁，首頁畫在版型的 `Outlet` 裡。後面的清單與表單再補進這張表。

**觀念**

父路由的路徑是 `/`，元件是 `Layout`。

`index` 表示跟父路徑同一個網址，不另外再接一段。

所以打開 `/` 時，版型中間是 `HomePage`。

```jsx 04-react-router/src/App.jsx
import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';

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

網址是 `/` 時，主區標題是首頁。別的路徑目前還沒有對應的頁。

**解析**

- `index` 不能再寫 `path`。它就是父路由自己的網址。
- 子路由寫在父路由的標籤中間，才會嵌進父層的 `Outlet`。
- 路徑用小寫。這一則的根路徑是斜線。
- 元件用 `element` 傳入已經建立的元素，不是傳入元件函式本身。

{% note success %}
**換你試試：**
把首頁標題改成「練習首頁」。路由結構留著。
{% endnote %}

<details>
<summary>參考答案</summary>

標題在頁面元件，不在路由表。

```jsx 04-react-router/src/pages/HomePage.jsx
export default function HomePage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">練習首頁</h1>
      <p className="mt-2">路由已經接上。</p>
    </section>
  );
}
```

</details>

### Outlet

版型負責選單與主區的外框。`Outlet` 的位置就是子路由的頁面。沒有 `Outlet` 時，路由即使對上了，主區仍是空的。

**觀念**

`Layout` 先畫 `SiteMenu`，再在 main 裡放 Outlet。首頁的標題會出現在選單下面，而不是取代整頁。

```jsx 04-react-router/src/components/Layout.jsx
import { Outlet } from 'react-router';
import SiteMenu from './SiteMenu.jsx';

export default function Layout() {
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

選單目前只有「練習站」三個字。主區是首頁。兩塊來自不同元件。

**解析**

- `Outlet` 沒有 children。子路由由 `App` 的路由表決定。
- 版型不要自己用狀態猜現在是哪一頁。網址已經說明了。
- 主區的寬度與背景放在版型，各頁就不必重複。
- 選單元件這一則還沒有連結。下一節才加上 `Link` 與 `NavLink`。

{% note success %}
**換你試試：**
在 `Outlet` 上面加一行「主區」。首頁標題仍應出現在這行下面。
{% endnote %}

<details>
<summary>參考答案</summary>

那一行屬於版型，每一頁都會看到。首頁元件不用改。

```jsx 04-react-router/src/components/Layout.jsx
import { Outlet } from 'react-router';
import SiteMenu from './SiteMenu.jsx';

export default function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <SiteMenu />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <p className="mb-3 text-sm text-stone-500">主區</p>
        <Outlet />
      </main>
    </div>
  );
}
```

</details>

## 清單頁

`03-react` 用 `fetch` 讀 `/data/items.json`，再用 `map` 畫出名稱與價格。這裡把同一份資料搬進 `04-react-router` 的頁面：每一列改成 `Link`，連到 `/items/` 加上 id。後面的 `SiteMenu` 會把「清單」指到這個路徑。

起始的 `App.jsx` 仍只有首頁。清單先寫在完成檔，等後面的路由表完成版才掛上 `path="items"`。

**觀念**

讀取與進階篇的載入示範相同，第一次畫完後要 JSON。失敗就留空陣列。差別是文字包在連結裡，點了才換網址。

```jsx 04-react-router/src/pages/ListPage.jsx.final
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function ListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/data/items.json');
      if (!response.ok) return;
      setItems(await response.json());
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
              {item.name} {item.price}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

完成版路由表掛上之後，打開 `/items` 會看到筆 25、紙 40、尺 15。三列都是連結。

**解析**

- 資料檔欄位是 `id`、`name`、`price`，與 `03-react` 的 `public/data/items.json` 相同。
- `key` 仍用 `item.id`。連結只負責換頁，不取代 key。
- 這一頁先不畫載入中與失敗。那三種畫面在進階篇，這裡先把清單放進路由。
- 完成版的子路由是 `path="items"`。起始路由表沒有這一行，所以選單先點下去時，主區可能還是空的。

{% note success %}
**換你試試：**
連結文字在價格後面加上「元」。筆那一列應變成筆 25 元。
{% endnote %}

<details>
<summary>參考答案</summary>

只改連結裡的文字。讀取與路徑留著。

```jsx 04-react-router/src/pages/ListPage.jsx.final
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function ListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/data/items.json');
      if (!response.ok) return;
      setItems(await response.json());
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
              {item.name} {item.price} 元
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

</details>

# 連結與選單

換頁用連結，選單用能表示使用中的 `NavLink`。路徑上的 id 用 `useParams` 讀，送出後要用程式離開這一頁時用 `useNavigate`，問號上的一小段資訊用 `useSearchParams`。整段位置物件放在選讀。

## 連結

換頁用連結，不用按鈕偷偷改狀態。`Link` 產生一個 `<a>`，點了會換路由，不會整頁重載。

`NavLink` 多告訴你這一條是否正對上現在的網址，用來做選單的使用中樣式。

- `Link` 的 `to` 是目標路徑。用在文章裡的「看清單」這種一次性連結。
- `NavLink` 會把比對結果交給 `className` 的函式。

首頁要加 `end`，否則所有以斜線開頭的網址都會把它算成使用中。

### Link

首頁放一條到清單的連結。清單頁在上一節的完成檔。這一則先讓首頁的連結存在。完成檔才改首頁，起始的首頁仍是沒有連結的那一版。

**觀念**

`to="/items"` 是絕對路徑，從網站根目錄算。不要寫成 `items` 除非你確定相對的是現在這層。首頁在根路徑，兩種寫法剛好一樣，仍建議站內主要連結用斜線開頭。

```jsx 04-react-router/src/pages/HomePage.jsx.final
import { Link } from 'react-router';

export default function HomePage() {
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

點「看清單」之後，網址變成 `/items`。若清單路由還沒接上，主區會空著，但網址已經變了。

**解析**

- `Link` 畫出來是 `<a>`。可以開新分頁，也可以讓輔助工具把它當連結。
- 不要用 `onClick` 配 `navigate` 來做一般選單。那會少掉連結的預設行為。
- `className` 是字串。這一則不需要知道自己是否為使用中。
- 完成檔取代起始的首頁。起始檔先留著，路由表仍指向 `HomePage`。

{% note success %}
**換你試試：**
再加一條連結到 `/search`，文字是搜尋。看清單那條留著。
{% endnote %}

<details>
<summary>參考答案</summary>

兩條都是 `Link`。路徑不同，元件相同。

```jsx 04-react-router/src/pages/HomePage.jsx.final
import { Link } from 'react-router';

export default function HomePage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">首頁</h1>
      <p className="mt-2 flex gap-4">
        <Link className="text-teal-800 underline" to="/items">
          看清單
        </Link>
        <Link className="text-teal-800 underline" to="/search">
          搜尋
        </Link>
      </p>
    </section>
  );
}
```

</details>

### NavLink

選單用 `NavLink`。對上的那一條加底線與深色，其餘用一般文字。

首頁加上 `end`，停在 `/items` 時首頁不會一起亮。

**觀念**

`className` 收到 `{ isActive }`。回傳的字串就是這一條的類別。四條對應首頁、清單、搜尋與新增。這些路徑會在後面的路由表出現。

```jsx 04-react-router/src/components/SiteMenu.jsx.final
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

停在首頁時，只有「首頁」有底線。點到清單，底線跟著過去。

**解析**

- `end` 要求路徑整個對上，不是只對上前綴。首頁需要它。
- 清單沒有寫 `end` 時，`/items/1` 也會讓「清單」亮起。這一則可以接受，因為詳情仍屬於清單。
- `isActive` 由路由比對而來。不要自己用 `window.location` 再判斷一次。
- 起始的選單只有文字。完成檔才換成連結，避免路由還沒接上就點進空頁。

{% note success %}
**換你試試：**
再給「清單」加上 `end`。停在 `/items/1` 時，清單不該亮。
{% endnote %}

<details>
<summary>參考答案</summary>

`end` 與首頁那條相同。搜尋與新增不用加，它們沒有更深的路徑。

```jsx 04-react-router/src/components/SiteMenu.jsx.final
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
        <NavLink to="/items" end className={itemClass}>
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

</details>

## 路徑參數

路徑裡的 `:id` 用 `useParams` 讀。送出之後要換頁，用 `useNavigate`。一般連結仍用 `Link`。

- `useParams` 的鍵就是路徑裡冒號後面的名字。值永遠是字串。
- `useNavigate` 回傳一個函式。表單成功之後再用它。

### useParams

清單的每一列連到 `/items/` 加上 id。詳情頁用參數找到那一筆。找不到時寫一句話，不要丟出空白。

**觀念**

本機 JSON 的 id 是數字，參數是字串，所以用 `String(item.id)` 比較。對上就畫名稱與價格，對不上就說找不到。

```jsx 04-react-router/src/pages/DetailPage.jsx.final
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function DetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [item, setItem] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/data/items.json');
        if (!response.ok) throw new Error(String(response.status));
        const items = await response.json();
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
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="mt-2">{item.price}</p>
    </article>
  );
}
```

打開 `/items/1` 應看到筆與 25。打開 `/items/9` 應看到找不到這筆。完成檔在查詢參數那一節會多一條「填這筆」。這一則先把 id 對上。

**解析**

- 依賴寫了 `id`。從筆改到紙時，效果會再讀一次。
- 比較前把資料的 id 轉成字串。`1 === '1'` 在 JavaScript 裡是假。
- 找不到不是讀取失敗。檔案成功了，只是沒有那一筆。
- 清單頁的連結用這個 id，詳情才對得上。

{% note success %}
**換你試試：**
詳情再顯示一行「編號」加上 id。筆那一頁應看得到編號 1。
{% endnote %}

<details>
<summary>參考答案</summary>

參數已經在 `id`。多一行文字即可，不必再讀一次網址。

```jsx 04-react-router/src/pages/DetailPage.jsx.final
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function DetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [item, setItem] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/data/items.json');
        if (!response.ok) throw new Error(String(response.status));
        const items = await response.json();
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
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="mt-2">編號 {id}</p>
      <p className="mt-2">{item.price}</p>
    </article>
  );
}
```

</details>

### useNavigate

新增頁送出之後回到清單。這是程式要換頁，不是使用者點了一條連結，所以用 `useNavigate`。

**觀念**

表單仍先 `preventDefault`，把名稱留在訊息裡，然後 `navigate('/items')`。清單頁會再讀一次本機 JSON。這一則沒有真的把新筆寫進檔案，重點是送出後的換頁。

`navigate` 的引數是路徑。要回到上一頁可以傳 `-1`，這一則用明確路徑，使用者才知道會落到清單。

```jsx 04-react-router/src/pages/FormPage.jsx.final
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function FormPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    navigate('/items');
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="名稱"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出並回到清單
      </button>
    </form>
  );
}
```

填了名稱再送出，網址變成 `/items`，主區換成清單。完成檔在下一節會多讀 `itemId`。這一則先把送出後的換頁接上。

**解析**

- `useNavigate` 寫在元件最上層。不要在條件裡才呼叫它。
- 換頁放在 `preventDefault` 之後。否則瀏覽器可能先整頁重載。
- 一般「去清單」的入口仍用 `Link`。這裡是送出成功才離開。
- 名稱這一則沒有送到伺服器。換頁前若要檢查空字串，先 return，不要 navigate。

{% note success %}
**換你試試：**
名稱是空的時候不要換頁。有名稱才 `navigate`。
{% endnote %}

<details>
<summary>參考答案</summary>

空字串先停下來。有值才離開這一頁。

```jsx 04-react-router/src/pages/FormPage.jsx.final
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function FormPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!name) return;
    navigate('/items');
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="名稱"
      />
      <button type="submit" className="rounded bg-teal-800 px-3 py-1 text-white">
        送出並回到清單
      </button>
    </form>
  );
}
```

</details>

## 查詢參數

問號後面的參數適合跨頁帶一小段資訊，也適合同一頁可以分享的篩選。結業專案會用它把行程 id 帶到報名頁。跨頁寫入用 `Link` 的 `to`，讀取用 `useSearchParams`。

- 詳情的 `Link` 寫出 `?itemId=`，表單頁用 `get` 讀來預填。
- 同一頁要改篩選時，用 `setSearchParams`。設定它會換網址，不會整頁重載。

### useSearchParams

`useSearchParams` 回傳目前的查詢，以及一個寫回查詢的函式。跨頁帶 id 時，來源頁用 `Link` 把鍵寫進 `to`，表單頁只讀。同一頁要改篩選時，才用設定函式。

**觀念**

詳情在價格下面加一條 `Link`，`to` 是 `/new?itemId=` 接上這筆的 id。表單頁用 `searchParams.get('itemId')` 放進唯讀欄。沒有這個鍵時是 null，改成空字串，欄位就留空。

送出後仍 `navigate('/items')`。選單的「新增」進沒有問號的 `/new`，編號是空的；「搜尋」仍進 `/search`。路由表不用為了這個鍵再加一條路徑。

{% note info %}
**鍵名**
這一則用 `itemId`。結業專案的報名頁用同一個讀法，鍵名是 `tourId`，網址寫成 `/booking?tourId=`。
{% endnote %}

```jsx 04-react-router/src/pages/DetailPage.jsx.final
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

export default function DetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [item, setItem] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/data/items.json');
        if (!response.ok) throw new Error(String(response.status));
        const items = await response.json();
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
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="mt-2">{item.price}</p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to={'/new?itemId=' + item.id}>
          填這筆
        </Link>
      </p>
    </article>
  );
}
```

```jsx 04-react-router/src/pages/FormPage.jsx.final
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function FormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('itemId') ?? '';
  const [name, setName] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    navigate('/items');
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        編號
        <input
          readOnly
          name="itemId"
          value={itemId}
          className="rounded border bg-stone-100 px-2 py-1"
        />
      </label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="名稱"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出並回到清單
      </button>
    </form>
  );
}
```

打開 `/items/1`，點「填這筆」，網址變成 `/new?itemId=1`，編號欄是 1。直接開 `/new`，編號欄是空的。

**解析**

- `Link` 的 `to` 直接寫上問號與 `itemId`。跨頁寫入走連結。`setSearchParams` 留給同一頁的篩選。
- `get('itemId')` 沒有這個鍵時是 null。`?? ''` 讓唯讀欄是空字串，而不是文字 `null`。
- 這一則只讀查詢，所以設定函式沒有用到。送出後的換頁仍是 `navigate`。
- 鍵名這一則是 `itemId`。結業專案改成 `tourId`，讀法相同。

{% note success %}
**換你試試：**
編號改成隱藏欄。表單上方改顯示一句話：有 `itemId` 時寫「這筆編號」加上值，沒有時寫「沒有帶編號」。
{% endnote %}

<details>
<summary>參考答案</summary>

隱藏欄仍帶著同一個值。畫面上改成一句話，送出與換頁留著。

```jsx 04-react-router/src/pages/FormPage.jsx.final
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function FormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('itemId') ?? '';
  const [name, setName] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    navigate('/items');
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
      <p>{itemId ? '這筆編號 ' + itemId : '沒有帶編號'}</p>
      <input type="hidden" name="itemId" value={itemId} />
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="rounded border px-2 py-1"
        placeholder="名稱"
      />
      <button type="submit" className="rounded bg-teal-800 px-3 py-1 text-white">
        送出並回到清單
      </button>
    </form>
  );
}
```

</details>

**同一頁的篩選**

問號也適合留在同一頁，把篩選分享出去。`q` 是關鍵字。空的時候顯示全部，有字的時候只留名稱有包含它的筆。

**觀念**

`searchParams.get('q')` 沒有這個鍵時是 null，這裡用空字串代替。

表單送出時 `setSearchParams({ q: keyword })`，網址變成 `/search?q=筆`。重新整理後關鍵字還在，因為它在網址上，不在元件狀態裡。

輸入過程的草稿仍用 `useState`。網址只在送出時更新，避免每打一個字就推進一筆歷史紀錄。

```jsx 04-react-router/src/pages/SearchPage.jsx.final
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const [draft, setDraft] = useState(keyword);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/data/items.json');
      if (!response.ok) return;
      setItems(await response.json());
    };
    load();
  }, []);

  const visible = items.filter((item) => item.name.includes(keyword));

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
          placeholder="名稱"
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
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

打開 `/search?q=筆` 只看到筆。把草稿清空再送出，網址回到 `/search`，三筆都在。

**解析**

- `setSearchParams({})` 會清掉查詢。不要自己組問號字串。
- 篩選在渲染時做。清單不必因為關鍵字再放進另一份狀態。
- 草稿與網址上的關鍵字可以短暫不同。送出才把草稿寫進網址。
- 這一頁的表單用 `preventDefault`。它不是要交給伺服器重新載入的傳統表單。

{% note success %}
**換你試試：**
搜尋改成比對價格的字串。`q=25` 時應只剩筆。
{% endnote %}

<details>
<summary>參考答案</summary>

價格是數字，先轉成字串再 `includes`。

```jsx 04-react-router/src/pages/SearchPage.jsx.final
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const [draft, setDraft] = useState(keyword);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/data/items.json');
      if (!response.ok) return;
      setItems(await response.json());
    };
    load();
  }, []);

  const visible = items.filter((item) => String(item.price).includes(keyword));

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
          placeholder="價格"
        />
        <button type="submit" className="rounded bg-teal-800 px-3 py-1 text-white">
          搜尋
        </button>
      </form>
      <ul className="mt-4 grid gap-2">
        {visible.map((item) => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

</details>

## 選讀：位置資訊

這一段是選讀。`useLocation` 把目前網址拆成路徑、查詢與雜湊，一次看完整段位置。它不換頁，換頁仍用連結或 `navigate`。

- `search` 含問號，和 `useSearchParams` 讀到的是同一段查詢。
- 改 `location` 上的欄位不會更新網址。

### useLocation

`useLocation` 讀現在這一段位置。

它有 `pathname`、`search` 與 hash。

改這些欄位不會換頁，換頁仍要靠連結或 `navigate`。

**觀念**

這一頁把三段印出來。停在 `/where` 時，路徑是 `/where`，查詢與雜湊多半是空的。

若你手動在網址加上 `?q=1#note`，重新整理後三段都會對上。

```jsx 04-react-router/src/pages/WherePage.jsx.final
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

打開 `/where?q=1#note`，三行分別是路徑 `/where`、查詢 ?q=1、雜湊 #note。

**解析**

- `search` 含問號。沒有查詢時是空字串。
- `hash` 含井字號。它不是 `useParams` 的 id。
- 這一頁不需要 effect。位置在渲染時就讀得到。
- 不要把 `location` 整個放進依賴又在 effect 裡設定狀態來抄一份。畫面直接讀即可。

{% note success %}
**換你試試：**
再印一行 `location.key`。同一個網址用連結進來與重新整理，這個 key 不一定相同。
{% endnote %}

<details>
<summary>參考答案</summary>

`key` 是這一筆歷史紀錄的識別，不是路徑的一部分。

```jsx 04-react-router/src/pages/WherePage.jsx.final
import { useLocation } from 'react-router';

export default function WherePage() {
  const location = useLocation();

  return (
    <section>
      <h1 className="text-2xl font-bold">位置</h1>
      <p className="mt-2">路徑 {location.pathname}</p>
      <p>查詢 {location.search || '（沒有）'}</p>
      <p>雜湊 {location.hash || '（沒有）'}</p>
      <p>紀錄 {location.key}</p>
    </section>
  );
}
```

</details>

# 找不到的頁面

沒有任何路由對上時，要有一頁說明找不到，而不是空白。星號路徑 `*` 接住剩下的網址。放在版型裡面或外面，選單會不會留下來，結果不同。

- 分散式星號路由寫在版型的子路由裡。找不到時，選單還在，主區換成 404。
- 集中式星號路由與版型並列。找不到時，整頁換成 404，選單一併消失。

## 分散式星號路由

把 `*` 放進 `Layout` 的子路由。未知網址仍留在版型裡，選單不會被拿掉。

主區換成 `NotFoundPage`。清單、詳情、搜尋、新增與位置都寫在同一張表裡。

**觀念**

這份 `App.jsx.final` 是路由表的完成狀態。清單頁在 `ListPage.jsx.final`，詳情、搜尋、新增與位置用前面的完成檔。星號接住剩下的網址。

```jsx 04-react-router/src/pages/NotFoundPage.jsx.final
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

```jsx 04-react-router/src/App.jsx.final
import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ListPage from './pages/ListPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import FormPage from './pages/FormPage.jsx';
import WherePage from './pages/WherePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
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
- 清單的 `to` 用 id 接在 `/items/` 後面。詳情的參數才讀得到。「填這筆」再把 `itemId` 帶到 `/new`，選單的「搜尋」進 `/search`。
- 這一張表是完成狀態。起始的 `App.jsx` 仍只保留首頁，避免做到一半就有一堆空頁。

{% note success %}
**換你試試：**
在星號頁面的標題下面加一行目前打不開的說明：「路徑沒有對上」。連結留著。
{% endnote %}

<details>
<summary>參考答案</summary>

說明寫在 404 元件。路由表不用為了這句話改路徑。

```jsx 04-react-router/src/pages/NotFoundPage.jsx.final
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">找不到頁面</h1>
      <p className="mt-2">路徑沒有對上</p>
      <p className="mt-2">
        <Link className="text-teal-800 underline" to="/">
          回首頁
        </Link>
      </p>
    </section>
  );
}
```

</details>

## 集中式星號路由

星號與版型並列時，未知網址不會走進 `Layout`。選單消失，整頁只剩 404。適合「連版型都不該出現」的情況。站內的未知路徑若仍想留著選單，用上一則的分散式寫法。

**觀念**

這份檔案只示範集中式的差在哪。子頁面的元件與上一則相同，差別是 `*` 不在 `Layout` 裡面。

```jsx 04-react-router/src/App.central.jsx.final
import { Route, Routes } from 'react-router';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ListPage from './pages/ListPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import FormPage from './pages/FormPage.jsx';
import WherePage from './pages/WherePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
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

- 星號是 `Routes` 的直接子路由，所以不會渲染 `Layout`。
- 已知路徑仍走版型。只有對不上的才整頁替換。
- 不要兩種星號同時留在會被用到的那一份裡。分散式的星號會先接住，外面的就不會輪到。
- 這一門課的完成版用分散式，讓使用者在 404 仍回得了首頁選單。集中式留作對照。

{% note success %}
**換你試試：**
把集中式的星號暫時放進版型裡再看一次 `/no-such`。選單應出現。看完改回並列，確認選單消失。
{% endnote %}

<details>
<summary>參考答案</summary>

選單在不在，只看 404 有沒有被 `Layout` 包住。並列時沒有包住，所以沒有選單。

完成版請用上一則的分散式路由表。集中式這份留在 `App.central.jsx.final`，不要覆蓋平時在跑的 `App.jsx`。

</details>

# 選讀：部署到 GitHub Pages

靜態站若放在 `https://帳號.github.io/倉庫名稱/`，資源與路由的前綴都要算進倉庫名稱。

`vite` 的 `base` 負責打包後的檔案路徑，basename 負責路由。

另外，GitHub Pages 對未知路徑會找 `404.html`，單頁應用要讓那份檔案跟 `index.html` 相同，重新整理子路徑才進得了 React。

- `basename` 沒有結尾斜線。`base` 通常有結尾斜線。用 `BASE_URL` 去掉結尾斜線，兩處就不會各寫一次倉庫名。
- `HashRouter` 把路由放在井字號後面。伺服器只看得到井字號前面的檔案，所以不必為子路徑準備 `404.html`。網址會多一個 `#`。

## basename 與 404.html

建置前在 Vite 設定 `base`。路由的 `basename` 用同一個前綴，但拿掉結尾斜線。

建置完成後，把 `dist/index.html` 複製成 `dist/404.html`。

**觀念**

本機 `pnpm dev` 的 `BASE_URL` 仍是 /，去掉斜線後是空字串，路由就跟現在一樣。

只有建置時把 `base` 設成倉庫路徑，前綴才會出現。

下面用 `/demo/` 當例子。你的倉庫名稱不同時，換成那個名稱，兩邊一起換。

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

`pnpm build` 之後執行複製。

`dist/404.html` 的內容與當時的 `dist/index.html` 相同。

```bash
cp dist/index.html dist/404.html
```

本機若已把 `base` 改成 `/demo/`，開發伺服器的網址也要加上這段前綴才打得開。

平常練習把 `base` 留空、用預設的 `/` 即可。

**解析**

- `base` 影響打包後的 script 與 css 路徑。沒設時，GitHub Pages 的子路徑會去網站根目錄找檔案而 404。
- `basename` 讓 `<Link to="/items">` 實際指向 /demo/items。

元件裡仍寫 `/items`。
- 結尾斜線只留在 `base`。`basename` 帶著結尾斜線時，路徑比較容易多一段空的。
- `404.html` 必須在每次建置後重新複製。舊的那份不會含這一次的檔名雜湊。

{% note success %}
**換你試試：**
把例子的 `/demo/` 改成 `/lecture/`，basename 那一行不要改寫死。

建置後看 `dist/index.html` 的 script 路徑應含 lecture。
{% endnote %}

<details>
<summary>參考答案</summary>

只改 Vite 的 `base`。路由仍讀 `BASE_URL`，所以前綴只寫一處。

```js 04-react-router/vite.config.js.final
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/lecture/',
  plugins: [react(), tailwindcss()],
});
```

`main.jsx.final` 維持用 `import.meta.env.BASE_URL`。

改完要重新 `pnpm build`，再複製 404。

</details>

## HashRouter

`HashRouter` 把目前頁面放在 `#` 後面，例如 /#/items。

伺服器收到的路徑只有 `#` 前面那一段，靜態主機只要能打開 `index.html` 即可。代價是網址比較不好讀，也不利於沒有 JavaScript 時的分享預覽。

**觀念**

這份檔案只用來對照，不要取代正在用的 `main.jsx`。它不設 `basename`。

選單與路由表維持原樣，因為 `Link` 的 `to` 不用改。

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

若暫時改用這份入口，清單的網址會像 `http://localhost:5173/#/items`。重新整理仍停在清單，而且不需要 `404.html`。

**解析**

- 井字號後面的變化不會對伺服器發出新的文件請求。
- 路由元件仍是 `Routes` 與 `Route`。換的是最外層的路由器。
- 站內連結不要自己加上 `#`。

`to="/items"` 會由 `HashRouter` 補上。
- 這一門課的完成版仍用 `BrowserRouter` 加 `basename`。

`HashRouter` 是主機不能回傳同一份 HTML 時的退路。

{% note success %}
**換你試試：**
對照兩種網址：BrowserRouter 的 `/items`，以及 HashRouter 的 `/#/items`。

選單的 `to` 都不必改。
{% endnote %}

<details>
<summary>參考答案</summary>

`to` 寫的是路由路徑，不是完整網址。兩種路由器都會把它接到自己的網址形式。

平常把入口留在 `BrowserRouter`。

只有在靜態主機無法用 `404.html` 回到同一頁時，才改看 `main.hash.jsx.final`。

</details>

# 本篇重點回顧

- 套件是 `react-router`。最外層用 `BrowserRouter`，路由表用 `Routes` 與 `Route`。
- 版型把子頁面畫在 `Outlet`。選單用 `NavLink` 的 `isActive`，首頁要加 `end`。
- 清單頁沿用讀 JSON 再 `map` 的寫法，每一列用 `Link` 連到 `/items/:id`。
- `useParams` 讀到的 id 是字串。送出後換頁用 `useNavigate`，一般入口仍用 `Link`。
- 查詢參數用 `useSearchParams` 讀。詳情的 `Link` 帶 `itemId`，表單頁預填。結業專案的鍵名是 `tourId`。
- 分散式把 `*` 放在版型裡，404 仍留著選單。集中式把 `*` 與版型並列，未知網址整頁替換。
- 選讀：`useLocation` 讀整段位置。GitHub Pages 要同時處理 `base`、`basename` 與 `404.html`。

# 專有名詞中英對照

## 啟用路由

- 路由（route）
- 路由表（route table）
- 瀏覽器路由（BrowserRouter）
- 插槽（Outlet）

## 連結與選單

- 連結（Link）
- 導覽連結（NavLink）
- 路徑參數（param）
- 導向（navigate）

## 查詢參數

- 查詢參數（search param）

## 選讀：位置資訊

- 位置（location）

## 找不到的頁面

- 分散式星號路由（nested splat route）
- 集中式星號路由（central splat route）

## 選讀：部署到 GitHub Pages

- 基底路徑（basename）
- 雜湊路由（HashRouter）
