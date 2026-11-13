---
title: "React 進階：Effect 與共用狀態"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:09:00
---

![](assets/images/banner/react.png)

畫面畫完之後，才適合去讀檔、訂閱或對外部系統做一次性的動作，這就是 effect 的工作。這一篇先看 useEffect 什麼時候執行、怎麼用依賴陣列控制重跑、用清除函式收尾，再用它完成載入中、失敗與沒有資料三種畫面的資料讀取模式。接著處理多個元件要共用資料的情況：把狀態提升到父層，兄弟元件透過 props 互相溝通。選讀的部分包含用 API 模組做遠端寫入、避免不必要的 effect、自訂 Hook、Context、React Compiler 與手動記憶化（useMemo、memo、useCallback）、useRef、useReducer，以及表單 Actions（useActionState、useOptimistic）。最後的專案會改用路由的 loader 讀取資料（第 11 篇）。

<!-- more -->

# Effect 與資料

元件在渲染時只負責算出畫面，和畫面以外的世界打交道，例如計時器、讀取資料、改瀏覽器分頁標題，要交給 effect。這一章先學 effect 的執行時機、依賴陣列與清除函式，再用它完成最基本的資料讀取：載入中、失敗與沒有資料三種畫面。選讀的部分是取消請求，以及用 JSONPlaceholder 練習新增、更新與刪除。

## useEffect 的執行時機

effect 是畫面更新之後才執行的函式，用來讓元件和外部系統（React 管不到的東西，例如計時器、網路、瀏覽器 API）保持一致。這一節先分清楚 effect、渲染與事件處理各負責什麼，再看 effect 何時執行、怎麼清除，以及寫錯時會出什麼問題。

**觀念**

React 官方把 effect 定位成「與外部系統同步」的出口，不是「某個值變了就做某件事」的通用工具。一件事該放哪裡，先問它是什麼性質：

- 渲染：從 props 與 state 算出這一輪的畫面。總價、過濾後的清單這類算得出來的值，直接在渲染裡用運算式算，不必放進 state 或 effect。
- 事件處理函式：使用者按一次才要發生的事，例如送出表單、按下才讀一筆資料。
- effect：畫面出現或某些值改變之後，需要和外部系統對齊的事。

{% mermaid graph LR %}
  renderNode["渲染：算出元素"] --> commitNode["提交：畫上畫面"]
  commitNode --> effectNode["執行 setup"]
  effectNode --> cleanupNode["下次或卸載時清除"]
  style renderNode fill:#e3f2fd
  style commitNode fill:#e3f2fd
  style effectNode fill:#fff3e0
  style cleanupNode fill:#e8f5e9
{% endmermaid %}

寫法是呼叫 `useEffect(setup, deps)`，傳入兩個參數：

- setup：準備函式，在畫面提交（React 把結果更新到畫面上）之後執行。
- setup 可以回傳一個清除函式（cleanup）：下一次 setup 執行之前，以及元件離開畫面時會先執行它，用來停掉計時器、取消訂閱。不需要清除就不回傳。
- deps：依賴陣列，列出 setup 裡讀到的 props 與 state。React 用 `Object.is` 比較每一項和上一輪是否相同。

**一覽**

第二個參數有三種寫法，決定 setup 何時再跑：

- `[a, b]`：第一次畫完後執行，之後只要列出的任何一項變了就再執行。
- `[]`：只在第一次畫完後執行。
- 省略第二個參數：每一次渲染之後都執行。

effect 的規則也有 ESLint 在把關。本課專案使用 eslint-plugin-react-hooks 7，下面會用到它的兩條規則：`react-hooks/exhaustive-deps` 檢查依賴有沒有寫齊，`react-hooks/set-state-in-effect` 檢查有沒有在 effect 裡同步設定 state。

### 第一次執行

依賴是空陣列時，setup 只在元件第一次出現後執行，清除函式則在元件離開畫面時執行。這個 demo 讓 setup 與清除函式各印一行，再放一個按鈕讓元件重新渲染，用來確認重新渲染不會讓 effect 再跑。

**觀念**

空陣列表示這個 effect 不依賴任何會變的值，所以只在第一次畫完後跑，之後無論 state 怎麼變都不重跑。

開發時 `<StrictMode>` 還會刻意多做一輪檢查：第一次掛上後，立刻執行清除，再執行一次 setup，看清除函式有沒有把 setup 做的事復原。這輪檢查只在開發模式出現，正式建置只跑一次。`<StrictMode>` 為什麼預設開著，見 {% post_link lokiTech-15day-09-react-basics %} 的「createRoot」。

```jsx 03-react/src/demos/48-effect.jsx
import { useEffect, useState } from 'react';

export default function EffectMount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('效果執行');
    return () => {
      console.log('清除');
    };
  }, []);

  return (
    <section>
      <p>計數 {count}。效果只在第一次畫完後執行，請看 Console。</p>
      <button
        type="button"
        className="mt-3 rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一
      </button>
    </section>
  );
}
```

**解析**

- 畫面第一次出現時，Console 依序印出三行：「效果執行」、「清除」、「效果執行」。中間那行就是 StrictMode 的檢查，把第一次的 setup 收尾，再重新做一次。
- 在正式建置裡，同一個畫面只會印一次「效果執行」。
- 按下「加一」，畫面上的次數增加，Console 沒有新的輸出，因為依賴是空陣列，重新渲染不會讓 effect 重跑。
- 切換到別的 demo，這個元件卸載（離開畫面），Console 會再印一次「清除」。

```text
效果執行
清除
效果執行
```

### 依賴陣列

effect 裡讀到的 props 與 state 都要列進依賴陣列，列出的值只要有一個變了，React 就先執行上一次的清除，再用新的值執行 setup。

**觀念**

依賴陣列可以列很多項，例如 `[keyword, page]`。這個 demo 只列一項，方便看出是哪一個值引起重跑。setup 印出這一次的查詢字，清除函式印出上一次的查詢字。

```jsx 03-react/src/demos/49-deps.jsx
import { useEffect, useState } from 'react';

export default function DepsDemo() {
  const [keyword, setKeyword] = useState('台北城市漫遊');

  useEffect(() => {
    console.log('查詢', keyword);
    return () => {
      console.log('清除', keyword);
    };
  }, [keyword]);

  return (
    <section>
      <p>查詢字 {keyword}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setKeyword('花蓮山海三日')}
      >
        改查花蓮山海三日
      </button>
    </section>
  );
}
```

**解析**

- 剛打開時，StrictMode 的檢查讓 Console 先出現「查詢 台北城市漫遊」、「清除 台北城市漫遊」、「查詢 台北城市漫遊」，和上一則是同一種檢查。
- 按下按鈕後，查詢字變成「花蓮山海三日」，依賴改變，Console 先印「清除 台北城市漫遊」，再印「查詢 花蓮山海三日」。清除函式看到的是上一輪的值。
- 再按一次，查詢字沒有改變，React 看依賴相同，不會重跑 effect。
- 依賴是用 `Object.is` 比較，渲染時現做的物件或陣列，每一輪都是新的參考，effect 就可能每次都重跑（React Compiler 有時會幫忙穩定參考，但不要依賴這點），所以盡量只放原始值（字串、數字、布林）。

```text
清除 台北城市漫遊
查詢 花蓮山海三日
```

### 清除函式

清除函式負責把 setup 開始的事停下來：計時器要清掉、訂閱要取消、進行中的請求要中止。沒有清除，元件離開畫面後，這些工作仍然繼續運作。

**觀念**

這個 demo 用計時器：setup 啟動一個每秒加一的計時器，並把計時器編號（id）記下來，清除函式用這個編號停掉計時器。計時器的回呼裡才設定 state，setup 本身只負責啟動與停止計時器。

```jsx 03-react/src/demos/50-timer.jsx
import { useEffect, useState } from 'react';

export default function TimerDemo() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>秒數 {seconds}</p>;
}
```

**解析**

- 畫面上的秒數從 0 開始，大約每一秒加 1。
- 依賴是空陣列，計時器只啟動一次，秒數更新造成的重新渲染不會再啟動新的計時器。
- 設定秒數時用更新函式（拿到最新值再加一），不讀渲染當下的值，所以空依賴也不會讓秒數卡在同一個數字。
- 切到別的 demo 後，清除函式把計時器停掉。如果沒有清除，計時器會在背景一直跑，持續浪費資源。
- 開發時，StrictMode 會先清掉第一個計時器再重新啟動一個，畫面上不會看到兩倍速；正式建置只啟動一次。

### 無限迴圈

渲染和 effect 若互相觸發，就會停不下來：effect 設定 state，state 改變造成渲染，渲染後 effect 又執行。這一節先看會造成迴圈的寫法，再看正確的做法。

**觀念**

迴圈要同時滿足兩件事：effect 每一輪渲染後都會執行（省略依賴，或依賴每次都變），而且 setup 裡同步設定了 state。下面這段就是典型的錯誤。

{% note warning %}
**不要放進專案**

沒有第二個參數，所以每一輪渲染後都會執行；setup 裡又同步設定 state，造成下一輪渲染。React 在開發模式會在 Console 警告超過更新次數上限。

```jsx
useEffect(() => {
  setCount(count + 1);
});
```
{% endnote %}

`react-hooks/set-state-in-effect` 會把「在 effect 本體同步呼叫設定函式」標成問題，即使有依賴也一樣，因為這種寫法多半可以改成渲染時直接算出來，少一輪多餘的渲染。能由 props 或 state 算出來的值就不要存進 state；effect 留給改動外部系統，例如下面的瀏覽器分頁標題。

```jsx 03-react/src/demos/51-loop.jsx
import { useEffect, useState } from 'react';

export default function LoopDemo() {
  const [place, setPlace] = useState('台北城市漫遊');

  useEffect(() => {
    const previous = document.title;
    document.title = place;
    return () => {
      document.title = previous;
    };
  }, [place]);

  return (
    <section>
      <p>分頁標題 {place}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setPlace('花蓮山海三日')}
      >
        改成花蓮山海三日
      </button>
    </section>
  );
}
```

**解析**

- setup 只改外部的 `document.title`，沒有呼叫設定函式，所以 effect 不會再引起渲染，不會形成迴圈。
- 依賴是 `[place]`，只有地點改變才重新設定標題。
- 打開後，分頁標題變成「台北城市漫遊」，畫面上的句子也是這個名字。按一次按鈕，標題與句子一起換成「花蓮山海三日」，然後停住；再按一次，值沒變，什麼都不會發生。
- 清除函式把標題還原成這一次 setup 之前的文字，所以切到別的 demo 後，分頁標題回到「React 練習」。
- 以上只是用來說明 effect 改外部系統。React 19 也可以直接在元件裡寫 title 標籤，React 會把它放進文件的 head，實務上改分頁標題用這個比較簡單。

### 漏寫依賴

effect 裡讀到的 props 與 state 少列在依賴陣列時，effect 會一直拿著第一次渲染的舊值。`react-hooks/exhaustive-deps` 會警告少了哪個名字；它是警告，不會讓 `pnpm lint` 失敗，但不能放著不管。

**觀念**

這個 demo 故意寫成有問題的版本：effect 讀了 `count`，依賴卻是空陣列。修正的做法有兩種：把缺的值補進依賴，或把那個讀取從 effect 裡拿掉。用註解把警告關掉不算修正，那只是讓 React 以為依賴齊全。

```jsx 03-react/src/demos/52-lint.jsx
import { useEffect, useState } from 'react';

export default function LintDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('次數', count);
  }, []);

  return (
    <section>
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一
      </button>
    </section>
  );
}
```

**解析**

- 打開時，StrictMode 讓 effect 跑兩次，Console 印出兩行「次數 0」。
- 按下「加一」，畫面上的次數變成 1、2、3，Console 卻不再有新輸出，因為 effect 只在第一次渲染後建立，記住的 `count` 永遠是 0。
- 在 `03-react` 資料夾執行 `pnpm exec eslint src/demos/52-lint.jsx`，會看到 `react-hooks/exhaustive-deps` 指出少了 `count`。
- 修正是把依賴改成 `[count]`，下面是完整的修正版：按下「加一」後，Console 每次都跟著印出新的次數。

```jsx 03-react/src/demos/52b-lint-fixed.jsx
import { useEffect, useState } from 'react';

export default function LintFixedDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('次數', count);
  }, [count]);

  return (
    <section>
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一
      </button>
    </section>
  );
}
```

## 讀取資料

讀取資料是 effect 最常見的用途：元件第一次出現後，向本機檔案或遠端 API 要資料，再放進 state 畫出來。讀取不是瞬間完成，所以畫面要準備三種情況：還在等、失敗，以及成功但沒有資料。

{% note info %}
本課專案的資料讀取是用路由的 loader 完成，見 {% post_link lokiTech-15day-11-react-router %}。在 effect 裡讀取是需要理解的基本概念，但不是專案採用的寫法。若不用路由的 loader，實務上多半會改用 TanStack Query、SWR 這類資料函式庫，它們幫你處理快取與取消請求。
{% endnote %}

**一覽**

- 載入中：請求還沒回來，畫一句等待的文字，不要用空清單假裝已經完成。
- 失敗：網路出錯或回應不成功，畫錯誤訊息。
- 沒有資料：請求成功但陣列是空的，這是正常的結果，要和失敗分開，畫「沒有資料」。
- 有資料：畫出清單。

{% mermaid graph LR %}
  loadNode["載入中"] --> okNode["成功"]
  loadNode --> errNode["失敗"]
  okNode --> emptyNode["沒有資料"]
  okNode --> listNode["畫出清單"]
  style loadNode fill:#fff3e0
  style okNode fill:#e3f2fd
  style errNode fill:#ffebee
  style emptyNode fill:#e8f5e9
  style listNode fill:#e8f5e9
{% endmermaid %}

### 載入與錯誤

用一個 state 記錄目前處於哪一種狀態，另一個 state 放資料。這個 demo 讀本機 `public/data/` 底下的 `items.json`，裡面有三筆資料，並把狀態設成載入中、完成或失敗。

**觀念**

- 狀態一開始就是 `loading`，所以第一個畫面直接顯示「載入中」。初始值由 `useState` 給，不是在 effect 裡設定。
- effect 的函式本身不能加 `async`（它必須回傳清除函式或什麼都不回傳，不能回傳 Promise），所以在裡面定義一個 async 函式再呼叫它。
- `fetch` 只有在網路出錯時才會失敗，遇到 404、500 仍算收到回應，所以要檢查 `response.ok`，不成功就丟出錯誤，由 catch 統一處理。
- 設定 state 發生在 `await` 之後，不是 effect 本體同步執行，所以不會被 `react-hooks/set-state-in-effect` 標記。

```jsx 03-react/src/demos/53-load.jsx
import { useEffect, useState } from 'react';

export default function LoadDemo() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/data/items.json');
        if (!response.ok) throw new Error(String(response.status));
        setItems(await response.json());
        setStatus('ready');
      } catch {
        setItems([]);
        setStatus('error');
      }
    };
    load();
  }, []);

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;
  if (items.length === 0) return <p>沒有資料</p>;

  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.id}>
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

**解析**

- 第一個畫面是「載入中」，使用者看得到還在等。請求完成後變成三列：台北城市漫遊 12800、花蓮山海三日 15900、京都紅葉散步 42800。
- 回應不成功時進入 catch，畫面變成「讀取失敗」，不會把錯誤頁面的內容當成清單。回應是成功但內容不是 JSON 時，解析 JSON 會丟出例外，同樣進 catch。
- 三種提早 return 的順序是先看載入、再看錯誤、最後才看資料是否為空。
- 開發時 StrictMode 會讓 effect 多跑一輪，所以網路分頁會看到兩次請求，結果相同，畫面不受影響。
- 列表的 `key` 用資料本身的 id，規則和前面的列表一樣。

### 空資料

成功拿到一份空陣列，和失敗是兩件事。這個 demo 的程式骨架和上一則完全相同，只把資料來源換成內容為 `[]` 的 `empty.json`。

**觀念**

請求成功，所以狀態是 ready；清單長度為 0，所以不畫清單，改寫「沒有資料」。不要用「讀取失敗」來表示沒有資料，使用者會誤以為網路壞了而一直重新整理。

```jsx 03-react/src/demos/54-empty.jsx
import { useEffect, useState } from 'react';

export default function EmptyLoadDemo() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/data/empty.json');
        if (!response.ok) throw new Error(String(response.status));
        setItems(await response.json());
        setStatus('ready');
      } catch {
        setItems([]);
        setStatus('error');
      }
    };
    load();
  }, []);

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;
  if (items.length === 0) return <p>沒有資料</p>;

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

- 畫面停在「沒有資料」，瀏覽器網路分頁裡 `empty.json` 的狀態碼是 200，也就是請求成功，只是內容為空。
- 長度判斷放在 ready 之後。載入中時陣列同樣是空的，但這時不能說沒有資料。
- 錯誤的分支在這個 demo 不會執行，除非檔案被移除。

### 選讀：AbortController

連續發出多個請求時，回應回來的順序不一定和發出的順序相同。舊的請求若比新的晚回來，又去設定 state，就會把新的結果蓋掉，這個問題叫做競態（race condition）。元件卸載後，進行中的請求也還在跑。AbortController 可以取消進行中的請求，用在 effect 的清除函式最合適。

**觀念**

`AbortController` 產生一個 signal，交給 fetch；清除函式呼叫 abort，請求就被取消，fetch 會以名稱為 `AbortError` 的例外結束。這是主動取消，不是讀取失敗，所以 catch 裡看到它要直接返回，不要改成錯誤畫面。

```jsx 03-react/src/demos/55-abort.jsx
import { useEffect, useState } from 'react';

export default function AbortDemo() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const response = await fetch('/data/items.json', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(String(response.status));
        setItems(await response.json());
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setItems([]);
        setStatus('error');
      }
    };

    load();
    return () => controller.abort();
  }, []);

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;

  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.id}>
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

**解析**

- signal 和這一次 effect 綁在一起，清除時只取消這一次的請求。
- 開發時 StrictMode 會先跑 setup、清除、再跑 setup，第一次請求被取消後返回，不設定任何 state，第二次請求完成後才畫出三列資料。
- 取消後不能設定錯誤狀態，否則第一次被取消的請求會把畫面停在失敗。
- 依賴若之後加上查詢條件，條件一變就先取消舊請求，再發新請求，舊回應不會蓋掉新結果。
- React 官方文件也示範另一種做法：在 effect 裡放一個旗標變數，清除時把它設成 true，回應回來時先檢查旗標，已作廢就不設定 state。這種做法不取消請求，只忽略舊的回應。

## 選讀：遠端寫入

前面的讀取在元件第一次出現時進行。新增、更新與刪除則是使用者按一次才發生，所以請求要寫在事件處理函式裡，不放進 effect。這一節用 JSONPlaceholder（一個練習用的公開 API）走完四種常用的請求，最後把它們收進同一個模組。JSONPlaceholder 會回傳成功的狀態碼，但不會真的保存資料，重新讀取仍是原本的內容。

**一覽**

- GET：讀取資料，不改伺服器上的資料。
- POST：新增一筆，成功時狀態碼通常是 201，回應裡有新資料的 id。
- PUT：用送出的整份資料替換指定 id 的那一筆；只改部分欄位的是 PATCH。
- DELETE：刪除指定 id 的那一筆。

### GET

GET 讀取單筆文章，路徑最後一段是文章的 id。這個 demo 按下按鈕才發請求，請求屬於使用者的操作，所以放在事件處理函式裡，不需要 effect。

**觀念**

按下之後先把訊息設成「讀取中」，避免使用者以為沒按到；成功後換成文章標題，失敗則顯示「讀取失敗」。

```jsx 03-react/src/demos/56-get.jsx
import { useState } from 'react';

export default function GetDemo() {
  const [title, setTitle] = useState('尚未讀取');

  const onLoad = async () => {
    setTitle('讀取中');
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      if (!response.ok) throw new Error(String(response.status));
      const post = await response.json();
      setTitle(post.title);
    } catch {
      setTitle('讀取失敗');
    }
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onLoad}
      >
        讀取第一篇
      </button>
      <p className="mt-3">{title}</p>
    </section>
  );
}
```

**解析**

- 沒有按按鈕就不會發出請求，請求在事件裡，不在渲染裡。
- 路徑的 `1` 是文章 id，換一個數字就是讀另一筆。
- 成功與失敗都寫進同一個 state，畫面只讀那一行。
- 按下之後，畫面上的「尚未讀取」換成第一篇文章的標題。

### POST

POST 把新資料放在請求的 body，標頭要註明內容是 JSON。這個 demo 送出一筆新資料，並把回應裡的狀態碼與 id 顯示出來。

**觀念**

JSONPlaceholder 回應的 id 是練習用的編號，那一筆不會真的留在伺服器上，重新讀取也看不到。

```jsx 03-react/src/demos/57-post.jsx
import { useState } from 'react';

export default function PostDemo() {
  const [message, setMessage] = useState('尚未送出');

  const onCreate = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: '新行程', body: '台北城市漫遊', userId: 1 }),
        },
      );
      if (!response.ok) throw new Error(String(response.status));
      const created = await response.json();
      setMessage(response.status + ' id ' + created.id);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onCreate}
      >
        新增
      </button>
      <p className="mt-3">{message}</p>
    </section>
  );
}
```

**解析**

- `method` 設成 POST。沒寫的話 fetch 會用 GET，body 也不會被送出。
- `JSON.stringify` 把物件轉成文字，標頭 `Content-Type` 告訴對方這是 JSON。
- 按下之後，訊息類似「201 id 101」，狀態碼與 id 都來自回應，不要自己猜 id。
- 再按一次仍然成功，因為練習服務不會保存任何資料。

### PUT

PUT 替換指定 id 的那一筆，網址要帶 id，body 是替換後的整份資料。沒有送出的欄位，在替換的語意下就不會留在新的那一份。這門課的練習用 PUT，因為示範的表單就是交出完整的一份。

**觀念**

這個 demo 把 id 為 1 的文章標題改成「更新後的標題」，成功時把回應裡的標題顯示在畫面上，並在 Console 印出狀態碼。

```jsx 03-react/src/demos/58-put.jsx
import { useState } from 'react';

export default function PutDemo() {
  const [title, setTitle] = useState('尚未更新');

  const onUpdate = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 1,
            title: '更新後的標題',
            body: '內容',
            userId: 1,
          }),
        },
      );
      if (!response.ok) throw new Error(String(response.status));
      const updated = await response.json();
      console.log(response.status);
      setTitle(updated.title);
    } catch (error) {
      setTitle(error.message);
    }
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onUpdate}
      >
        更新第一篇
      </button>
      <p className="mt-3">{title}</p>
    </section>
  );
}
```

**解析**

- 路徑帶著要替換的 id；POST 的網址則停在集合，不帶 id。
- body 含 id、標題、內文與 userId，是整份替換。
- 按下之後，畫面變成「更新後的標題」，Console 印出狀態碼 200。
- 練習服務沒有真的保存，重新讀取 id 1 仍是原本的文章。

```text
200
```

### DELETE

DELETE 的網址指向要刪除的那一筆，通常沒有 body。這個 demo 只確認狀態碼，因為刪除的回應不一定有 JSON 內容。

**觀念**

按下後對 id 1 送出 DELETE，成功就顯示「已刪除」加狀態碼，失敗則顯示錯誤訊息。畫面上若有清單，要等請求成功後才更新它，失敗時維持原樣，下一節的完整示範就是這樣做。

```jsx 03-react/src/demos/59-delete.jsx
import { useState } from 'react';

export default function DeleteDemo() {
  const [message, setMessage] = useState('尚未刪除');

  const onDelete = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
        { method: 'DELETE' },
      );
      if (!response.ok) throw new Error(String(response.status));
      setMessage('已刪除 ' + response.status);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onDelete}
      >
        刪除第一篇
      </button>
      <p className="mt-3">{message}</p>
    </section>
  );
}
```

**解析**

- 方法是 DELETE，網址指向那一筆，不是整個集合。
- 沒有 body，所以不必加 JSON 標頭。
- 成功的判斷仍然是 `response.ok`，HTTP 的 404、500 不會讓 fetch 自己丟出例外。
- 按下之後，畫面顯示「已刪除 200」。再去讀同一筆，練習服務仍然會回傳原本的文章。

### API 模組

前面每個 demo 都在元件裡自己組網址、標頭、檢查 `response.ok`，重複而且冗長。實務上會把請求收進一個模組，元件只負責什麼時候呼叫、畫面上的狀態如何改變。這一節先看模組本身，再看使用它的完整示範。

{% note info %}
本節用到 `import` 與 `export`，是 JavaScript 的模組寫法，細節見 {% post_link lokiTech-15day-06-js-basics %} 的選讀章節「ES Module」。這裡只需要知道：`export` 的函式可以被其他檔案 `import` 來用。
{% endnote %}

#### 模組函式

模組集中處理網址、標頭與成功檢查，每個函式對應一種請求。

**一覽**

- `readJson`：模組內部使用，回應成功時讀出 JSON，不成功就丟出含狀態碼的錯誤。
- `getItems`：讀本機的清單，可以傳入 AbortController 的 signal 讓呼叫端取消。
- `getItem`：依 id 讀單筆。
- `createItem`：新增一筆。
- `updateItem`：替換指定 id 的整筆。
- `deleteItem`：刪除指定 id，成功時回傳 `true`。

```js 03-react/src/api/fake-api.js
const itemsUrl = 'https://jsonplaceholder.typicode.com/posts';

const readJson = async (response) => {
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
};

export const getItems = async (signal) => {
  const response = await fetch('/data/items.json', { signal });
  return readJson(response);
};

export const getItem = async (id) => {
  const response = await fetch(itemsUrl + '/' + id);
  return readJson(response);
};

export const createItem = async (item) => {
  const response = await fetch(itemsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return readJson(response);
};

export const updateItem = async (id, item) => {
  const response = await fetch(itemsUrl + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return readJson(response);
};

export const deleteItem = async (id) => {
  const response = await fetch(itemsUrl + '/' + id, { method: 'DELETE' });
  if (!response.ok) throw new Error(String(response.status));
  return true;
};
```

**解析**

- 清單讀本機的 `/data/items.json`；單筆、新增、更新與刪除的基底網址指向 JSONPlaceholder 的 `/posts`。
- `readJson` 集中檢查回應是否成功，失敗時丟出的錯誤訊息是狀態碼。
- `getItems` 的 signal 可以不傳；有傳時，呼叫端的清除函式才取消得了這次請求。
- `deleteItem` 成功時不讀 JSON，因為刪除的回應常常是空的，硬讀反而會失敗。

#### 示範完整 CRUD

這個示範把前面學到的東西串在一起：進畫面時在 effect 裡讀清單，新增、更新、刪除則在事件裡呼叫模組函式。

**觀念**

- 元件讀的是自己的清單 state，不是每次都重新向伺服器要。
- 練習服務不會保存，所以請求成功後，要自己更新清單：新增是接上新的一列，更新是換掉同一個 id，刪除是拿掉那個 id。
- 新增的編號由本機清單自己算，因為練習服務回應的編號不可靠，不適合拿來當 key。
- 重新整理頁面，清單會回到本機檔案裡的三筆。

```jsx 03-react/src/demos/60-items-demo.jsx
import { useEffect, useState } from 'react';
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from '../api/fake-api.js';

// 空白表單：新增與清表單共用
const emptyForm = { title: '', place: '', days: '', price: '' };

export default function ItemsDemo() {
  // 清單、表單、正在編輯的 id、載入訊息
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('載入中');
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  // 進畫面讀清單一次；清除時中止這次請求
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setItems(await getItems(controller.signal));
        setMessage('');
        setReady(true);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setMessage('讀取失敗');
      }
    };
    load();
    return () => controller.abort();
  }, []);

  // 表單欄位、清成新增、帶入編輯
  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onNew = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const onEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      place: item.place,
      days: String(item.days),
      price: String(item.price),
    });
  };

  // 刪除成功後改本機清單
  const onDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems((current) => current.filter((item) => item.id !== id));
      if (editingId === id) onNew();
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // 送出：新增或更新；成功後改本機清單並清表單
  const onSubmit = async (event) => {
    event.preventDefault();
    const id = editingId;
    const fields = {
      title: form.title,
      place: form.place,
      days: Number(form.days),
      price: Number(form.price),
    };
    try {
      if (id === null) {
        // 練習服務不會真的存，回的編號不可靠，本機清單自己算下一個編號
        const nextId = Math.max(0, ...items.map((item) => item.id)) + 1;
        await createItem(fields);
        setItems((current) => [...current, { ...fields, id: nextId }]);
      } else {
        await updateItem(id, { ...fields, id });
        setItems((current) =>
          current.map((item) => (item.id === id ? { ...fields, id } : item)),
        );
      }
      onNew();
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // 載入中先擋；左邊卡片＋新增，右邊共用表單
  if (!ready) return <p>{message}</p>;

  return (
    <section className="grid items-start gap-4 md:grid-cols-2">
      <div className="grid gap-3">
        <button
          type="button"
          className="justify-self-start rounded bg-teal-800 px-3 py-1 text-white"
          onClick={onNew}
        >
          新增
        </button>
        <ul className="grid gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="grid gap-2 rounded border border-stone-200 bg-white p-4"
            >
              <p>{item.title}</p>
              <p>
                {item.place} {item.days} 天 {item.price}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded bg-teal-800 px-3 py-1 text-white"
                  onClick={() => onEdit(item)}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="rounded bg-teal-800 px-3 py-1 text-white"
                  onClick={() => onDelete(item.id)}
                >
                  刪除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
        <p>{editingId === null ? '新增' : '編輯'}</p>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="標題"
          className="rounded border px-2 py-1"
        />
        <input
          name="place"
          value={form.place}
          onChange={onChange}
          placeholder="地點"
          className="rounded border px-2 py-1"
        />
        <input
          name="days"
          value={form.days}
          onChange={onChange}
          placeholder="天數"
          className="rounded border px-2 py-1"
        />
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="價格"
          className="rounded border px-2 py-1"
        />
        <button
          type="submit"
          className="justify-self-start rounded bg-teal-800 px-3 py-1 text-white"
        >
          送出
        </button>
        {message ? <p>{message}</p> : null}
      </form>
    </section>
  );
}
```

**解析**

- 畫面先顯示「載入中」。完成後左邊上方是「新增」按鈕，下面是三張卡片：台北城市漫遊（台北、3 天、12800）、花蓮山海三日（花蓮、3 天、15900）、京都紅葉散步（京都、5 天、42800），每張有「編輯」與「刪除」。右邊是表單，標題「新增」，四個欄位是空的。
- 按「編輯」，右邊標題改成「編輯」並填入那一筆的資料。送出或刪除成功後，左邊的清單跟著更新，表單回到新增模式。
- 載入放在 effect，裡面建立 AbortController 並把 signal 交給 `getItems`；名稱是 `AbortError` 就直接返回，不改成讀取失敗。
- `editingId` 是空值時是新增，有值時是正在編輯的那一筆，兩種送出共用同一份表單。
- 新增、更新、刪除都在事件處理函式裡呼叫，不放進 effect。請求失敗時清單維持原樣，只顯示錯誤訊息。

## 選讀：不需要 effect 的情況

這一節是選讀。effect 是讓元件跟外部系統（網路、計時器、瀏覽器 API）同步的出口，沒有外部系統要同步時，多半不需要它。下面兩種寫法最常見：能在渲染時算出來的值直接算，使用者按下才發生的請求放在事件函式裡。

### 渲染時計算

總價等於單價乘人數，這種由現有資料就能算出的值，不必另外存進狀態。這一節先看多此一舉的寫法，再看直接計算的寫法。

**觀念**

狀態只存「無法由別的資料算出」的東西。人數是使用者操作的結果，需要狀態；總價完全由單價和人數決定，每次渲染時相乘即可。若把總價也放進狀態，再用 effect 在人數改變後補寫，畫面會先用舊的總價渲染一次，effect 跑完才再渲染一次，白白多一輪，兩份資料也可能對不上。

下面這支是多此一舉的寫法。`eslint-plugin-react-hooks` 的規則 `react-hooks/set-state-in-effect` 會把 effect 裡同步呼叫的 `setTotal` 標成錯誤。

```jsx 03-react/src/demos/61-derive.jsx
import { useEffect, useState } from 'react';

export default function DeriveDemo() {
  const [count, setCount] = useState(2);
  const price = 12800;
  const [total, setTotal] = useState(price * count);

  useEffect(() => {
    setTotal(price * count);
  }, [count]);

  return (
    <section>
      <p>
        {count} 人，共 {total}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一人
      </button>
    </section>
  );
}
```

打開是「2 人，共 25600」，因為狀態初值就是 `price * count`。按「加一人」，人數變成 3，但那一輪渲染的總價仍是 25600，effect 跑完才排出下一輪，總價才變成 38400。

**解析**

- `total` 有自己的狀態和設定函式，卻完全可以由 `price` 與 `count` 算出，這就是多餘的狀態。
- effect 在人數改變之後才補寫總價，所以每次人數變動都比必要的多渲染一次。
- 清單的篩選、排序、組字串也是同一類，直接寫在渲染裡。

下面是改好的版本：拿掉總價的狀態與 effect，渲染時直接相乘。人數一變，元件重新執行，總價自然跟著更新。

```jsx 03-react/src/demos/61b-derive-fixed.jsx
import { useState } from 'react';

export default function DeriveFixedDemo() {
  const [count, setCount] = useState(2);
  const price = 12800;
  const total = price * count;

  return (
    <section>
      <p>
        {count} 人，共 {total}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一人
      </button>
    </section>
  );
}
```

畫面與上一支完全相同，但少了一個狀態、一支 effect，也不會再被規則標出錯誤。

### 事件裡的請求

請求若是由按鈕觸發，就寫在按鈕的事件函式裡。這一節先看把請求繞進 effect 的寫法，再看直接寫在事件裡的寫法。

**觀念**

判斷放哪裡，只要問「這件事為什麼要發生」。因為元件顯示在畫面上而需要的（進頁面就讀清單），放 effect；因為使用者做了某個動作才需要的（按下就送出），放事件函式。

下面這支把按鈕做成只改旗標 `armed`，再讓 effect 依賴 `armed`，旗標變成 true 才去讀資料。請求的原因明明是按鈕，卻繞了一圈經過狀態與 effect。

```jsx 03-react/src/demos/62-click.jsx
import { useEffect, useState } from 'react';

export default function ClickFetchDemo() {
  const [armed, setArmed] = useState(false);
  const [status, setStatus] = useState('尚未按下');
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!armed) return;
    const load = async () => {
      setStatus('讀取中');
      setPost(null);
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts/5',
        );
        if (!response.ok) throw new Error(String(response.status));
        setPost(await response.json());
        setStatus('完成');
      } catch {
        setPost(null);
        setStatus('讀取失敗');
      }
    };
    load();
  }, [armed]);

  return (
    <section>
      <p>狀態 {status}</p>
      <button
        type="button"
        className="mt-3 rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setArmed(true)}
      >
        按一下讀第五篇
      </button>
      {post ? (
        <p className="mt-3">
          #{post.id} {post.title}
        </p>
      ) : null}
    </section>
  );
}
```

按下之前，狀態是「尚未按下」，沒有請求。按下之後 effect 才送出，狀態依序是「讀取中」、「完成」，並出現 `#5` 與標題；失敗時是「讀取失敗」。再按一次沒有任何反應：`armed` 早已是 true，依賴沒變，effect 不會重跑。

**解析**

- 事件只改旗標，真正的請求在 effect 裡，讀程式的人要追兩個地方才看得懂「按下會發生什麼」。
- 想重新讀取，得先把 `armed` 設回 false 再設成 true，多出一輪沒有畫面意義的渲染。
- GET 的路徑、狀態碼與 JSON 欄位，見 08 的 fetch 章節。

下面是改好的版本：把請求搬進按鈕的處理函式，拿掉旗標與 effect。事件函式可以是 async；元件函式本身仍然是同步的。

```jsx 03-react/src/demos/62b-click-event.jsx
import { useState } from 'react';

export default function ClickEventDemo() {
  const [status, setStatus] = useState('尚未按下');
  const [post, setPost] = useState(null);

  const onLoad = async () => {
    setStatus('讀取中');
    setPost(null);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/5',
      );
      if (!response.ok) throw new Error(String(response.status));
      setPost(await response.json());
      setStatus('完成');
    } catch {
      setPost(null);
      setStatus('讀取失敗');
    }
  };

  return (
    <section>
      <p>狀態 {status}</p>
      <button
        type="button"
        className="mt-3 rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onLoad}
      >
        按一下讀第五篇
      </button>
      {post ? (
        <p className="mt-3">
          #{post.id} {post.title}
        </p>
      ) : null}
    </section>
  );
}
```

按幾次就讀幾次，每次都先顯示「讀取中」。要在使用者操作之外、進畫面就讀取的資料，才回到 effect（見「載入與錯誤」）。

## 選讀：自訂 Hook

重複的狀態與讀取流程可以收成一個函式，名稱以 `use` 開頭，這就是自訂 Hook。它是普通函式，不是元件：不回傳畫面，回傳狀態與動作，畫面仍由元件負責。因為裡面會呼叫別的 Hooks，它也要遵守 Hooks 規則，只在元件或其他 Hook 的最上層呼叫。

### 抽出讀取

讀取、載入、失敗、取消這一套流程，可以收進一個 Hook，讓元件只負責依狀態畫出畫面。

**觀念**

`useLocalItems` 把原本寫在元件裡的狀態與 effect 整包搬走，依賴是空陣列，所以只在使用它的元件第一次畫完後讀取一次。它回傳的物件每一輪都是新的，呼叫端不要把整個物件放進別的 effect 依賴。

```js 03-react/src/hooks/useLocalItems.js
import { useEffect, useState } from 'react';
import { getItems } from '../api/fake-api.js';

export function useLocalItems() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setItems(await getItems(controller.signal));
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setItems([]);
        setStatus('error');
      }
    };
    load();
    return () => controller.abort();
  }, []);

  return { status, items };
}
```

示範元件只剩三種畫面，裡面沒有 `fetch`，也沒有 effect。

```jsx 03-react/src/demos/63-hook.jsx
import { useLocalItems } from '../hooks/useLocalItems.js';

export default function HookDemo() {
  const { status, items } = useLocalItems();

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;

  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.id}>
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
```

畫面先顯示「載入中」，讀完後是三筆資料；讀取失敗則顯示「讀取失敗」。

**解析**

- 名稱以 `use` 開頭，Lint 才會把裡面的 Hooks 當成 Hooks 檢查。
- Hook 不是元件，所以那個檔不回傳 JSX。
- 每個呼叫它的元件各有一份自己的狀態，不會自動共用。

### 傳入引數

自訂 Hook 和一般函式一樣可以接收引數，同一套邏輯就能依引數走出不同的結果。

**觀念**

`useToggle` 用引數決定一開始是開還是關，並回傳目前狀態與切換函式。引數只在第一次建立狀態時用到，之後再改引數，不會把狀態改回去。

```js 03-react/src/hooks/useToggle.js
import { useState } from 'react';

export function useToggle(initialOpen) {
  const [open, setOpen] = useState(initialOpen);

  const toggle = () => {
    setOpen((value) => !value);
  };

  return { open, toggle };
}
```

兩個 `Panel` 各呼叫一次，各傳不同的初始值。

```jsx 03-react/src/demos/64-toggle.jsx
import { useToggle } from '../hooks/useToggle.js';

function Panel({ label, initialOpen }) {
  const { open, toggle } = useToggle(initialOpen);

  return (
    <section className="rounded border p-3">
      <p>
        {label}：{open ? '開' : '關'}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={toggle}
      >
        切換
      </button>
    </section>
  );
}

export default function ToggleDemo() {
  return (
    <section className="grid gap-3">
      <Panel label="左側" initialOpen={true} />
      <Panel label="右側" initialOpen={false} />
    </section>
  );
}
```

一開始左側顯示「開」、右側顯示「關」。各自按「切換」，只改自己那一側。

**解析**

- 兩個 `Panel` 各呼叫一次 Hook，所以各有一份 `open`，互不影響。
- 引數可以是布林、字串、數字，重點是同一套邏輯能依引數有不同的起點。

### 引數放進依賴

若 Hook 內部的 effect 會讀到引數，而引數之後還會變，就要把它寫進依賴陣列。值一變，React 先執行上一次的清除，再用新的值重跑。

**觀念**

`usePost(id)` 依編號讀取一篇文章，`[id]` 是依賴。使用者換編號時，上一次尚未回來的請求就沒有用了，所以清除函式把 `ignore` 設成 true，舊的回應回來也不會寫進狀態，避免慢回來的舊資料蓋掉新資料。

```js 03-react/src/hooks/usePost.js
import { useEffect, useState } from 'react';
import { getItem } from '../api/fake-api.js';

export function usePost(id) {
  const [status, setStatus] = useState('loading');
  const [post, setPost] = useState(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setStatus('loading');
      try {
        const data = await getItem(id);
        if (ignore) return;
        setPost(data);
        setStatus('ready');
      } catch {
        if (ignore) return;
        setPost(null);
        setStatus('error');
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  return { status, post };
}
```

```jsx 03-react/src/demos/65-hook-deps.jsx
import { useState } from 'react';
import { usePost } from '../hooks/usePost.js';

export default function HookDepsDemo() {
  const [id, setId] = useState(1);
  const { status, post } = usePost(id);

  return (
    <section className="grid gap-3">
      <p>目前編號 {id}</p>
      <div className="flex gap-2">
        {[1, 2, 3].map((value) => (
          <button
            key={value}
            type="button"
            className="rounded bg-teal-800 px-3 py-1 text-white"
            onClick={() => setId(value)}
          >
            第 {value} 篇
          </button>
        ))}
      </div>
      {status === 'loading' && <p>載入中</p>}
      {status === 'error' && <p>讀取失敗</p>}
      {status === 'ready' && (
        <p>
          #{post.id} {post.title}
        </p>
      )}
    </section>
  );
}
```

一開始編號是 1，先顯示「載入中」，再出現第 1 篇的編號與標題。按「第 2 篇」，編號馬上變成 2，標題在新資料回來前仍短暫是上一篇的，接著變成「載入中」，再換成第 2 篇。

**解析**

- effect 讀到 `id`，依賴就要寫 `[id]`。少寫的話，換編號時資料不會重讀，畫面停在舊的文章。
- 清除函式設定 `ignore`，讓過期的請求結果被丟棄。開發時嚴格模式會讓 effect 在進畫面時多跑一次，第一次的結果同樣被這個旗標擋掉。
- 這一個 Hook 的邏輯是讀取一篇文章。像「篩選已載入的清單」這種可以直接在渲染時算的事，不該寫成依賴引數的 effect。

### 各呼叫各一份狀態

同一個 Hook 被呼叫幾次，就有幾份獨立的狀態與幾次請求。它只是共用程式碼，不是共用資料。

**觀念**

`TwiceDemo` 裡放兩個 `NameList`，各自呼叫一次 `useLocalItems`。

```jsx 03-react/src/demos/66-twice.jsx
import { useLocalItems } from '../hooks/useLocalItems.js';

function NameList() {
  const { status, items } = useLocalItems();
  if (status !== 'ready') return <p>{status}</p>;
  return <p>{items.map((item) => item.title).join('、')}</p>;
}

export default function TwiceDemo() {
  return (
    <section className="grid gap-2">
      <NameList />
      <NameList />
    </section>
  );
}
```

兩行都會變成「台北城市漫遊、花蓮山海三日、京都紅葉散步」，網路分頁會看到兩次 `items.json`。

**解析**

- 兩行文字一樣，是因為讀到的檔案一樣，不是狀態共用。
- 想只讀一次，把 Hook 呼叫在共同父層，再用 props 傳給兩個子元件，這就是下一章「共用狀態」要教的狀態提升。

# 共用狀態

兩個以上的元件要讀同一份會變的資料時，不能各存一份，否則一邊更新另一邊就對不上。做法是把狀態放到它們最近的共同父層，這叫做狀態提升（lifting state up）。這一章先看父層怎麼持有狀態，再看兩個兄弟元件如何靠父層共享，最後的選讀介紹 Context。結業專案的資料由路由的 loader 讀取，不走 Context。

## 父層持有

狀態提升的核心是單一資料來源（single source of truth）：每一份資料只有一個元件擁有它，其他元件拿到的都是從它傳下來的值，而不是自己的複本。

**觀念**

資料流動的方向固定，口訣是「資料往下、事件往上」：

- 資料往下：父層把目前的值用 props 傳給子層。
- 事件往上：子層不能直接改父層的狀態，只能呼叫父層傳下來的函式，通知它要改。

{% mermaid graph LR %}
parent["父層：持有狀態與設定函式"] -->|"props：目前的值"| child["子層：顯示與接收輸入"]
child -->|"呼叫父層給的函式回報"| parent
{% endmermaid %}

下面的輸入框在子層，文字狀態在父層。子層沒有自己的狀態，只拿到 `value` 和 `onChange` 兩個 props：每打一個字，就呼叫 `onChange` 把新文字交給父層，父層更新狀態後再把新值傳回來。這種值完全由父層決定的輸入框，叫做受控元件。

```jsx 03-react/src/demos/67-lift.jsx
import { useState } from 'react';

function Editor({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded border px-2 py-1"
    />
  );
}

export default function LiftDemo() {
  const [draft, setDraft] = useState('台北城市漫遊');

  return (
    <section className="grid max-w-sm gap-3">
      <Editor value={draft} onChange={setDraft} />
      <p>父層看到 {draft}</p>
    </section>
  );
}
```

輸入框一開始是「台北城市漫遊」。每打一個字，輸入框與下面那行「父層看到 …」同時更新。

**解析**

- 狀態與 `setDraft` 都屬於父層，子層只能透過 `onChange` 請父層修改，所以文字只有一份，不可能不一致。
- `onChange={setDraft}` 可以這樣直接傳，因為子層呼叫它時給的就是新字串。
- 子層若自己再用狀態抄一份文字，就有兩份資料，會慢慢對不上；所以子層保持沒有狀態。
- 只有這顆輸入框自己用的暫存值，不必提升。放在越下層，影響的渲染範圍越小。

## 兄弟元件

兩個兄弟元件（同一個父層的兩個子元件）之間沒有直接傳資料的管道，最直接的共享方式，是把狀態放在它們共同的父層。

**觀念**

先看沒有提升的結果。下面的選擇區與摘要區各自有一份 `picked` 狀態，點選擇區的按鈕，只有選擇區自己的那份變了，摘要區讀不到，永遠停在「尚未選」。

```jsx 03-react/src/demos/68b-siblings-split.jsx
import { useState } from 'react';

function Picker() {
  const [picked, setPicked] = useState('尚未選');

  return (
    <div className="grid gap-2">
      <p>選擇區 {picked}</p>
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => setPicked('台北城市漫遊')}
        >
          台北城市漫遊
        </button>
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => setPicked('花蓮山海三日')}
        >
          花蓮山海三日
        </button>
      </div>
    </div>
  );
}

function Summary() {
  const [picked] = useState('尚未選');
  return <p>摘要區 {picked}</p>;
}

export default function SiblingsSplitDemo() {
  return (
    <section className="grid gap-3">
      <Picker />
      <Summary />
    </section>
  );
}
```

按下任一顆按鈕，「選擇區」那行會變成所選的名稱，「摘要區」那行仍是「尚未選」。

接著把狀態提升到共同父層。`Picker` 只負責回報，`Summary` 只負責顯示，兩者都沒有狀態，也不 import 對方。

{% mermaid graph LR %}
parent["SiblingsDemo：picked 與 setPicked"] -->|"onPick"| picker["Picker：按鈕"]
picker -->|"onPick(名稱)"| parent
parent -->|"picked"| summary["Summary：顯示"]
{% endmermaid %}

```jsx 03-react/src/demos/68-siblings.jsx
import { useState } from 'react';

function Picker({ onPick }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="rounded bg-stone-100 px-3 py-1"
        onClick={() => onPick('台北城市漫遊')}
      >
        台北城市漫遊
      </button>
      <button
        type="button"
        className="rounded bg-stone-100 px-3 py-1"
        onClick={() => onPick('花蓮山海三日')}
      >
        花蓮山海三日
      </button>
    </div>
  );
}

function Summary({ picked }) {
  return <p>目前 {picked}</p>;
}

export default function SiblingsDemo() {
  const [picked, setPicked] = useState('尚未選');

  return (
    <section className="grid gap-3">
      <Picker onPick={setPicked} />
      <Summary picked={picked} />
    </section>
  );
}
```

一開始摘要是「目前 尚未選」。按下「花蓮山海三日」，父層的 `picked` 改變、整個 `SiblingsDemo` 重新渲染，摘要立刻變成「目前 花蓮山海三日」。

**解析**

- `Picker` 沒有收到 `picked`，因為它只需要回報，不需要知道現在選了誰。
- `Summary` 沒有收到設定函式，所以它只能顯示，不能自己改選取。
- `Summary` 讀到的，就是 `Picker` 回報後父層存下的那一份，沒有第二份可以對不上。
- 摘要不對時，只要回到父層的 `picked` 查，不必在兩個子元件之間找。

## 選讀：useContext

狀態提升之後，資料還是靠 props 一層一層往下傳。若中間隔了好幾層，而這些中間層自己不用這份資料，每一層都得在參數裡多寫欄位再轉手，這種情況叫做屬性鑽孔（props drilling）。Context 不是另一種狀態，它只是讓真正要讀的元件，直接取得上層提供的值，中間層不必轉手。

**一覽**

- `createContext(預設值)`：建立一條通道，通道本身是一個物件。
- `<ThemeContext value={…}>`：在上層把值放進通道（React 19 起可直接這樣寫，舊版是 `<ThemeContext.Provider>`）。
- `useContext(ThemeContext)`：在下層讀取最近一層上方放進來的值，只能在元件最上層呼叫。
- `use(ThemeContext)`：React 19 的另一種讀法，可以寫在條件或提早 return 之後。

### 層層傳遞的問題

先看沒有 Context 的寫法，感受中間層被迫轉手的麻煩。

**觀念**

主題狀態在最外層的 `DrillDemo`，真正顯示並切換的是最內層的 `Banner`。中間的 `Layout` 與 `Panel` 自己不用主題，卻得接收 `theme` 與 `onThemeChange` 再傳下去。

```jsx 03-react/src/demos/69-drill.jsx
import { useState } from 'react';

function Banner({ theme, onThemeChange }) {
  return (
    <div className="grid gap-2">
      <p>主題 {theme}</p>
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => onThemeChange('深色')}
      >
        改成深色
      </button>
    </div>
  );
}

function Panel({ theme, onThemeChange }) {
  return (
    <div className="rounded border border-dashed border-stone-300 p-3">
      <Banner theme={theme} onThemeChange={onThemeChange} />
    </div>
  );
}

function Layout({ theme, onThemeChange }) {
  return (
    <div className="rounded border border-stone-200 p-3">
      <Panel theme={theme} onThemeChange={onThemeChange} />
    </div>
  );
}

export default function DrillDemo() {
  const [theme, setTheme] = useState('淺色');

  return (
    <section className="grid gap-3">
      <Layout theme={theme} onThemeChange={setTheme} />
    </section>
  );
}
```

一開始是「主題 淺色」。按「改成深色」後變成「主題 深色」。

**解析**

- 狀態仍在最外層，資料來源只有一處，這點和狀態提升相同。
- `Layout` 與 `Panel` 的 JSX 裡沒有用到主題，只是轉手，參數卻跟著膨脹。
- 之後若再多包一層，新的那層也得再寫一次兩個 props。
- 只有一層父子時直接用 props 就好，問題出在中間有很多層都不關心這份資料。

### 用 Context 改善

同一棵樹改用 Context：外層放值，內層直接讀，中間層不再有主題相關的 props。

**觀念**

通道用 `createContext` 建立一次，括號裡的值是預設值。外層用 `<ThemeContext value={theme}>` 把目前主題放上去，這一層稱為 provider，它底下的元件都能讀到。內層呼叫 `useContext(ThemeContext)` 取得最近一層 provider 的值；值改變時，讀它的元件會重新渲染。

```jsx 03-react/src/demos/70-context.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('淺色');

function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}

function Panel() {
  return (
    <div className="rounded border border-dashed border-stone-300 p-3">
      <Banner />
    </div>
  );
}

function Layout() {
  return (
    <div className="rounded border border-stone-200 p-3">
      <Panel />
    </div>
  );
}

export default function ContextDemo() {
  const [theme, setTheme] = useState('淺色');

  return (
    <ThemeContext value={theme}>
      <section className="grid gap-3">
        <button
          type="button"
          className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setTheme('深色')}
        >
          改成深色
        </button>
        <Layout />
      </section>
    </ThemeContext>
  );
}
```

一開始是「主題 淺色」。按「改成深色」後，最內層文字變成「主題 深色」，而 `Layout` 與 `Panel` 的參數裡沒有任何主題。

**解析**

- `value` 是狀態裡的字串，按鈕改狀態，provider 的 value 跟著變，`Banner` 就重新渲染。
- `Banner` 在元件最上層呼叫 `useContext`，不寫在條件裡。
- `Layout` 與 `Panel` 沒有 import Context，也不轉 props，只畫外框。
- 值放在 provider 裡之後，要改它仍然得經過父層的狀態與設定函式，資料來源依舊只有一處。

### 拆成多個檔案

元件分檔時，通道只能建立一次，其他檔案都 import 同一個物件；各自建立的兩條通道互不相通。

**觀念**

下面把同一個示範拆進資料夾 `71-contextDemo`，每個檔只做一件事：

- `ThemeContext.js`：只呼叫一次 `createContext` 並匯出。
- `Banner.jsx`：import 那個物件，再讀值。
- `Panel.jsx`、`Layout.jsx`：只畫外框，不碰 Context。
- `index.jsx`：持有狀態，用 provider 包住 `Layout`。

`import` 與 `export` 的語法見 {% post_link lokiTech-15day-06-js-basics %} 的選讀 ES Module 章節。

```js 03-react/src/demos/71-contextDemo/ThemeContext.js
import { createContext } from 'react';

export const ThemeContext = createContext('淺色');
```

```jsx 03-react/src/demos/71-contextDemo/Banner.jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';

export default function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}
```

```jsx 03-react/src/demos/71-contextDemo/Panel.jsx
import Banner from './Banner.jsx';

export default function Panel() {
  return (
    <div className="rounded border border-dashed border-stone-300 p-3">
      <Banner />
    </div>
  );
}
```

```jsx 03-react/src/demos/71-contextDemo/Layout.jsx
import Panel from './Panel.jsx';

export default function Layout() {
  return (
    <div className="rounded border border-stone-200 p-3">
      <Panel />
    </div>
  );
}
```

```jsx 03-react/src/demos/71-contextDemo/index.jsx
import { useState } from 'react';
import { ThemeContext } from './ThemeContext.js';
import Layout from './Layout.jsx';

export default function ContextSplitDemo() {
  const [theme, setTheme] = useState('淺色');

  return (
    <ThemeContext value={theme}>
      <section className="grid gap-3">
        <button
          type="button"
          className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setTheme('深色')}
        >
          改成深色
        </button>
        <Layout />
      </section>
    </ThemeContext>
  );
}
```

畫面與上一節相同：先是「主題 淺色」，按下按鈕後變成「主題 深色」。

**解析**

- `Banner.jsx` 與 `index.jsx` import 的是同一個物件，能對上的是物件本身，不是變數名稱相同。
- 若 `Banner.jsx` 自己再呼叫一次 `createContext`，那是另一條通道，外層的 provider 對它沒有作用。
- `Panel` 與 `Layout` 完全不認識 Context，所以之後換成別種資料也不必動它們。

### 預設值

樹上沒有 provider 時，讀取的人拿到建立 Context 時的預設值。

**觀念**

預設值只是最後的後備，而且是固定的，不會隨狀態改變；要讓值隨時間變，一定要靠 provider 加上狀態。下面直接用資料夾裡的 `Banner`，故意不包 provider，畫面就是 `ThemeContext.js` 裡設定的預設字串。

```jsx 03-react/src/demos/72-default.jsx
import Banner from './71-contextDemo/Banner.jsx';

export default function DefaultDemo() {
  return <Banner />;
}
```

畫面是「主題 淺色」，沒有按鈕，也不會變。

**解析**

- 有 provider 時一律以 provider 的 value 為準，預設值不會被用到。
- 預設值適合「沒包到也能照常顯示」的情況。若沒包 provider 就是程式錯誤，可以像後面 Context 搭配 `useReducer` 的範例那樣，在自訂 Hook 裡丟出錯誤，比較好找。

### 用 use 讀取

React 19 提供 `use`，也能讀 Context。它和 `useContext` 的差別在位置：`use` 可以寫在條件或提早 return 之後，`useContext` 不行。

**觀念**

下面的 `ThemeLabel` 在 `show` 為 false 時提早 return，之後才呼叫 `use(ThemeContext)`。同樣的位置換成 `useContext` 就違反 Hooks 規則。讀到的值與 `useContext` 相同：最近一層 provider 的值，沒有 provider 則是預設值。

```jsx 03-react/src/demos/72b-use-context.jsx
import { createContext, use, useState } from 'react';

const ThemeContext = createContext('淺色');

function ThemeLabel({ show }) {
  if (!show) return <p>沒有顯示主題</p>;
  const theme = use(ThemeContext);
  return <p>主題 {theme}</p>;
}

export default function UseContextDemo() {
  const [show, setShow] = useState(false);

  return (
    <ThemeContext value="深色">
      <section className="grid gap-3">
        <button
          type="button"
          className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setShow((value) => !value)}
        >
          切換顯示
        </button>
        <ThemeLabel show={show} />
      </section>
    </ThemeContext>
  );
}
```

一開始畫面是「沒有顯示主題」。按「切換顯示」變成「主題 深色」，再按一次又回到「沒有顯示主題」。

**解析**

- `use` 可以接在 `if` 與提早 return 之後，這是它與 `useContext` 唯一的使用差異。
- provider 寫在父元件 `UseContextDemo`，讀取的 `ThemeLabel` 是它的子元件，`use` 只會往上找，不會讀同一個元件自己放出的 provider。
- 一般情況沿用 `useContext` 即可，需要在條件之後讀取時才用 `use`。

## 選讀：React Compiler 與手動記憶化

元件每次重新渲染都會把函式從頭跑一遍，有些計算、函式與子元件其實和上一次完全相同。把這些結果記住、輸入沒變就重複使用，稱為記憶化（memoization）。React 提供三個手動工具，而本課專案啟用了 React Compiler，會在建置時自動做同一件事。這一節先釐清兩者的分工，後面三節才逐一看手動工具怎麼運作。

### 編譯器做什麼

React Compiler 是建置時的工具，會分析元件與自訂 hook 的程式碼，替裡面的值、函式與 JSX 加上等同手動記憶化的處理。以前要自己寫的三種工具，編譯器都能代勞：

**一覽**

- `useMemo` 記住一次計算的結果，見下一節。
- `memo` 包住元件，props 沒變就跳過它的重渲染，見再下一節。
- `useCallback` 記住函式本身，讓它在多次渲染間保持同一個，見第三節。

多數情況下，編譯器自動記住的範圍與精準度不輸手寫，所以新寫的程式不需要主動加這三個工具。它能安全運作的前提是程式遵守 React 的規則，例如渲染過程保持純粹、不直接改動 props 與 state。

### 仍需要手動記憶化的情況

編譯器只處理元件與 hook 內部，這幾種情形仍要自己決定：

- 計算寫在元件與 hook 之外的一般函式，編譯器不會替它記憶化；而且記住的結果不會在不同元件之間共用。
- 某個值或函式要當作 effect 的依賴，又必須在內容沒變時保持同一份，官方文件指出這時仍可用 `useMemo` 或 `useCallback` 精準控制。
- 舊程式或沒有啟用編譯器的專案，原本的手動記憶化要保留；官方建議移除前先充分測試，因為移除可能改變編譯後的結果。

在動手加記憶化之前，官方文件建議先用更根本的做法：讓元件用 `children` 接收 JSX、把狀態放在需要它的最近一層、保持渲染純粹，並避免不必要的 effect。這些做法常常就讓問題消失，也是本課專案的寫法，因此專案裡沒有用到這三個工具。

eslint-plugin-react-hooks 7 內建一組和編譯器對應的檢查，在編輯器裡就會標出不合規則的寫法：

- `purity`：渲染中呼叫了已知不純的函式。
- `refs`：渲染中讀寫了 ref 的 `current`。
- `set-state-in-effect`：在 effect 裡同步呼叫 `setState`。
- `preserve-manual-memoization`：手寫的記憶化與編譯器的分析不相容。

### 關閉編譯器：use no memo

編譯器開著時，後面三節的「沒有記憶化」範例會被自動優化，看不出重渲染的差別。為了讓範例的現象成立，這些檔案最上方都寫了檔案層級的指令 `'use no memo'`，告訴編譯器略過整個檔案。

這個指令也能寫在單一函式主體的最開頭，只關閉那一個函式。官方文件把它定位為暫時的緊急出口，用在除錯編譯器造成的問題，或搭配與編譯器不相容的第三方函式庫，建議註明為什麼關閉。位置寫在函式中間或使用反引號都會失效。

另外，專案用 StrictMode 執行，開發模式下 React 會把元件函式多呼叫一次以找出不純的寫法，所以 Console 的訊息常會成對出現（React DevTools 可能把第二則顯示成較淡）。後面的範例看的是「操作之後有沒有新增訊息」，不必在意實際印了幾行。

## 選讀：useMemo

很多次渲染其實跟某個計算無關，例如輸入框只是多打了一個字，算出來的結果卻和上次一模一樣，這種重算就是白做工。`useMemo` 把計算結果記住，只有計算用到的值改變時才重算，其他時候的渲染直接沿用上次的結果。它省下的是每次渲染裡重複的計算，並不會讓元件少渲染一次；要跳過整個元件的重渲染，用下一節的 `memo`。

下面先看沒有使用 `useMemo` 時浪費在哪裡，再改成使用 `useMemo` 對照效果。

### 沒有使用 useMemo 時

元件每次重渲染，寫在函式裡的計算都會再做一次。

**觀念**

`text` 是留言內容，畫面顯示輸入字數；`star` 是星等，預設五顆星，點第幾顆就改成幾顆。評語只看星等：四顆以上是「值得推薦」，否則是「普通」。計算前先印出「計算中」，方便在 Console 數次數。

```jsx 03-react/src/demos/73-memo.jsx
// 關閉 React Compiler，才看得到沒有自動記憶化時的行為
'use no memo';

import { useState } from 'react';

export default function MemoDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(5);

  console.log('計算中');
  const label = star >= 4 ? '值得推薦' : '普通';

  return (
    <section className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        留言
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p>輸入字數 {text.length}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className="text-2xl text-amber-500"
            onClick={() => setStar(n)}
          >
            {n <= star ? '★' : '☆'}
          </button>
        ))}
      </div>
      <p>星等 {star}</p>
      <p>評語 {label}</p>
    </section>
  );
}
```

**解析**

- 五顆星是用 `map` 畫出的五顆按鈕。編號小於等於目前星等的顯示 ★，其餘顯示 ☆，點哪一顆就把星等設成那個編號。
- 點星星改星等，重算評語是應該的。
- 在留言欄打字會呼叫 `setText`，元件重渲染，整個函式從頭再跑一次。星等沒變，評語那行卻又執行，Console 每次按鍵都新增「計算中」，結果和上次一樣，這次計算就是浪費。
- `useState` 本身不是負擔，花時間的是函式裡那些算畫面資料的程式。

{% note info %}
這裡的評語只是比大小再選字串，就算每次重算，負擔也很小。若計算很複雜，例如對上千筆資料篩選、排序或統計，每打一個字都重跑就會拖慢畫面，這時記住結果才有明顯效果。範例故意用簡單的計算，是為了看清楚什麼時候會重算。
{% endnote %}

{% mermaid graph TD %}
  textNode["留言改變"] --> renderNode["元件重渲染"]
  renderNode --> calcNode["評語又算一次"]
  style textNode fill:#e3f2fd
  style renderNode fill:#fff3e0
  style calcNode fill:#ffcdd2
{% endmermaid %}

### 使用 useMemo

`useMemo` 接收一個計算函式與依賴陣列。依賴沒變就沿用上次的值，不再執行計算；依賴變了才重算，並記住新的結果。依賴的比較用 `Object.is`。

同一支範例把評語放進 `useMemo`，依賴是 `[star]`。

```jsx 03-react/src/demos/73b-memo-use.jsx
// 關閉 React Compiler，才看得到沒有自動記憶化時的行為
'use no memo';

import { useMemo, useState } from 'react';

export default function MemoUseDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(5);
  const label = useMemo(() => {
    console.log('計算中');
    return star >= 4 ? '值得推薦' : '普通';
  }, [star]);

  return (
    <section className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        留言
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p>輸入字數 {text.length}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className="text-2xl text-amber-500"
            onClick={() => setStar(n)}
          >
            {n <= star ? '★' : '☆'}
          </button>
        ))}
      </div>
      <p>星等 {star}</p>
      <p>評語 {label}</p>
    </section>
  );
}
```

**解析**

- 留言打字仍會重渲染，但星等沒變，`useMemo` 沿用上次的值，Console 不再新增「計算中」。
- 點星星改了星等，依賴變了，才重算並再印一次。
- 計算函式要保持純粹，不要在裡面改動 props 或其他既有的物件；開發模式的 StrictMode 會把它多呼叫一次來檢查。
- 官方文件建議先用 `console.time` 量測，總耗時達到約 1 毫秒以上才可能有幫助；`useMemo` 也不會加快第一次渲染，只省下更新時的重複計算。

{% mermaid graph TD %}
  textNode["留言改變"] --> renderNode["元件重渲染"]
  renderNode --> sameNode["依賴沒變"]
  sameNode --> keepNode["沿用上次的評語"]
  starNode["星等改變"] --> redoNode["重新計算"]
  style textNode fill:#e3f2fd
  style renderNode fill:#fff3e0
  style sameNode fill:#fff3e0
  style keepNode fill:#e8f5e9
  style starNode fill:#e3f2fd
  style redoNode fill:#ffcdd2
{% endmermaid %}

{% note info %}
本課專案啟用了 React Compiler，一般元件裡的計算會被自動記住，不必手寫 `useMemo`。手動版本仍有用的時機見本節之前的「React Compiler 與手動記憶化」。
{% endnote %}

## 選讀：memo

父層一重渲染，子元件預設也會跟著重渲染，就算交給它的 props 跟上次一模一樣。`memo` 把元件包起來之後，父層重渲染時會先比對 props；每一個 props 都和上次相同，就跳過這次渲染，沿用上次的畫面。

下面先看沒有使用 `memo` 時子元件怎麼被拖著重渲染，再改成使用 `memo` 對照效果。

### 沒有使用 memo 時

父層重渲染時，子元件會一起重渲染，即使 props 沒變。

**觀念**

延續評價留言的範例。父層有留言輸入框與五顆星按鈕；`StarView` 是子元件，只接收目前的星等，畫出五顆亮暗星星，每次渲染印出「星星列渲染」。

```jsx 03-react/src/demos/74-memo-component.jsx
// 關閉 React Compiler，才看得到沒有自動記憶化時的行為
'use no memo';

import { useState } from 'react';

function StarView({ star }) {
  console.log('星星列渲染');

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className="text-2xl text-amber-500">
          {n <= star ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function MemoComponentDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(5);

  return (
    <section className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        留言
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p>輸入字數 {text.length}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className="text-2xl text-amber-500"
            onClick={() => setStar(n)}
          >
            {n <= star ? '★' : '☆'}
          </button>
        ))}
      </div>
      <StarView star={star} />
      <p>星等 {star}</p>
    </section>
  );
}
```

**解析**

- `StarView` 只看 `star` 決定哪幾顆亮。點父層的星星按鈕改星等，子元件跟著重渲染是應該的。
- 在留言欄打字會呼叫 `setText`，父層重渲染。星等沒變、子元件收到的 props 也沒變，卻還是一起重渲染，Console 每次按鍵都新增「星星列渲染」。這就是浪費。

{% mermaid graph TD %}
  textNode["留言改變"] --> parentNode["父層重渲染"]
  parentNode --> childNode["星星列又渲染一次"]
  style textNode fill:#e3f2fd
  style parentNode fill:#fff3e0
  style childNode fill:#ffcdd2
{% endmermaid %}

### 使用 memo

`memo` 包起來的元件，在父層重渲染時會先比對 props。每一個 props 都和上次相同，就跳過這次渲染，沿用上次的畫面。

同一支範例把 `StarView` 用 `memo` 包起來。

```jsx 03-react/src/demos/74b-memo-wrap.jsx
// 關閉 React Compiler，才看得到沒有自動記憶化時的行為
'use no memo';

import { memo, useState } from 'react';

const StarView = memo(function StarView({ star }) {
  console.log('星星列渲染');

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className="text-2xl text-amber-500">
          {n <= star ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
});

export default function MemoWrapDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(5);

  return (
    <section className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        留言
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p>輸入字數 {text.length}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className="text-2xl text-amber-500"
            onClick={() => setStar(n)}
          >
            {n <= star ? '★' : '☆'}
          </button>
        ))}
      </div>
      <StarView star={star} />
      <p>星等 {star}</p>
    </section>
  );
}
```

**解析**

- 留言打字時父層仍會重渲染，但 `star` 沒變，`memo` 判定 props 相同，星星列跳過渲染，Console 不再新增「星星列渲染」。
- 點星星改了星等，`star` 變了，星星列才重渲染並再印一次。
- 被 `memo` 包住的元件，自己的狀態改變、或它讀取的 context 改變時，仍然會重渲染；`memo` 只擋父層帶來的重渲染。

{% mermaid graph TD %}
  textNode["留言改變"] --> parentNode["父層重渲染"]
  parentNode --> sameNode["props 沒變"]
  sameNode --> skipNode["星星列跳過渲染"]
  starNode["星等改變"] --> redoNode["星星列重渲染"]
  style textNode fill:#e3f2fd
  style parentNode fill:#fff3e0
  style sameNode fill:#fff3e0
  style skipNode fill:#e8f5e9
  style starNode fill:#e3f2fd
  style redoNode fill:#ffcdd2
{% endmermaid %}

{% note info %}
`memo` 比對 props 時用的是 `Object.is`：數字、字串相同就算過，但每次渲染都新建的物件或函式，即使內容一樣也被判定成不同，`memo` 就擋不住。例如多傳一個每次都新建的 `style` 物件，每打一個字星星列又會重渲染。下一節的 `useCallback` 用來處理函式這種情況。有啟用 React Compiler 時，編譯器會自動套用等同 `memo` 的效果，通常不必手動加。
{% endnote %}

## 選讀：useCallback

上一節的 `memo` 靠比對 props 決定要不要跳過渲染。元件每次重新渲染，寫在裡面的函式也會重新建立一份；內容一樣，卻是新的函式。把它當 props 交給 `memo` 包住的子元件，子元件每次都收到「不同的」props，`memo` 就擋不住。`useCallback` 把函式記住，依賴沒變就交出同一個函式，讓子元件判斷 props 沒變而跳過重渲染。

下面先看沒有使用 `useCallback` 時的情形，再改成使用 `useCallback` 對照效果。

### 沒有使用 useCallback 時

**觀念**

星星按鈕拆成子元件 `StarPicker`，並用 `memo` 包起來；它從父層收到目前的星等，以及點選時要呼叫的函式。父層的事件處理函式寫成一般函式，每次渲染都會重新建立。子元件每次渲染印出「星星列渲染」。

```jsx 03-react/src/demos/75-callback.jsx
// 關閉 React Compiler，才看得到沒有自動記憶化時的行為
'use no memo';

import { memo, useState } from 'react';

const StarPicker = memo(function StarPicker({ star, onPick }) {
  console.log('星星列渲染');

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className="text-2xl text-amber-500"
          onClick={() => onPick(n)}
        >
          {n <= star ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
});

export default function UseCallbackDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(5);
  const handlePick = (n) => {
    setStar(n);
  };

  return (
    <section className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        留言
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p>輸入字數 {text.length}</p>
      <StarPicker star={star} onPick={handlePick} />
      <p>星等 {star}</p>
    </section>
  );
}
```

**解析**

- `StarPicker` 用 `star` 決定哪幾顆亮，點按鈕時呼叫 `onPick(n)`，由父層把星等設成 `n`。
- 在留言欄打字會讓父層重渲染，`handlePick` 又被建立成新的函式。
- `memo` 比對時，`star` 沒變，但 `onPick` 是新函式，所以判定 props 不同。星星列跟著重渲染，Console 每次按鍵都新增「星星列渲染」。

{% mermaid graph TD %}
  textNode["留言改變"] --> parentNode["父層重渲染"]
  parentNode --> fnNode["handlePick 變成新的函式"]
  fnNode --> childNode["星星列又渲染一次"]
  style textNode fill:#e3f2fd
  style parentNode fill:#fff3e0
  style fnNode fill:#fff3e0
  style childNode fill:#ffcdd2
{% endmermaid %}

### 使用 useCallback

`useCallback` 記住一個函式，並看依賴陣列。依賴沒變就交出上次那一個函式；依賴變了才換成這次的新函式。

```jsx
/**
 * @param {function} fn 要記住的函式
 * @param {Array} deps 依賴陣列。裡面的值變了才換成新的函式
 * @returns {function} 依賴沒變時是上次那一個函式
 */
const handlePick = useCallback(fn, deps);
```

同一支範例把 `handlePick` 放進 `useCallback`，依賴是 `[]`。

```jsx 03-react/src/demos/75b-callback-use.jsx
// 關閉 React Compiler，才看得到沒有自動記憶化時的行為
'use no memo';

import { memo, useCallback, useState } from 'react';

const StarPicker = memo(function StarPicker({ star, onPick }) {
  console.log('星星列渲染');

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className="text-2xl text-amber-500"
          onClick={() => onPick(n)}
        >
          {n <= star ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
});

export default function UseCallbackUseDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(5);
  const handlePick = useCallback((n) => {
    setStar(n);
  }, []);

  return (
    <section className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        留言
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p>輸入字數 {text.length}</p>
      <StarPicker star={star} onPick={handlePick} />
      <p>星等 {star}</p>
    </section>
  );
}
```

**解析**

- `handlePick` 只呼叫 `setStar`。React 保證設定函式每次渲染都是同一個，不必放進依賴，所以依賴是 `[]`。
- 留言打字時父層仍會重渲染，但 `handlePick` 還是同一個函式。`memo` 比對到 `star` 和 `onPick` 都沒變，星星列跳過渲染，Console 不再新增「星星列渲染」。
- 點星星改了星等，`star` 變了，星星列才重渲染並再印一次。

{% mermaid graph TD %}
  textNode["留言改變"] --> parentNode["父層重渲染"]
  parentNode --> sameNode["handlePick 還是同一個"]
  sameNode --> skipNode["星星列跳過渲染"]
  starNode["星等改變"] --> redoNode["星星列重渲染"]
  style textNode fill:#e3f2fd
  style parentNode fill:#fff3e0
  style sameNode fill:#fff3e0
  style skipNode fill:#e8f5e9
  style starNode fill:#e3f2fd
  style redoNode fill:#ffcdd2
{% endmermaid %}

{% note info %}
`useCallback` 要搭配 `memo` 包住的子元件才有意義；子元件沒有 `memo` 時，函式是不是同一個都沒差，只有函式被當成 effect 依賴時例外。這裡的星星列只有五顆按鈕，重渲染的負擔很小，實務上不必為它加 `memo` 與 `useCallback`。在啟用 React Compiler 的專案裡，編譯器通常已經替你記住函式與元件，更不需要手動加。
{% endnote %}

## 選讀：useRef

有時你要的不是畫面上顯示的文字，而是那顆真正的 DOM 節點，例如按下按鈕時呼叫 `focus()`、量尺寸，或捲到某個位置。這些是瀏覽器對節點提供的方法；只靠狀態描述「現在顯示什麼」，拿不到那顆節點。

`useRef` 用來在多次渲染之間記住一份值。它回傳一個普通物件，只有一個 `current` 欄位，每次渲染拿到的都是同一個物件。

要記住 DOM 時，先建立這個物件，再把它交給 JSX 的 ref 屬性（寫法見下方範本）。ref 是 JSX 的特殊屬性，不是 HTML 屬性。你交出去的是整個物件；畫面提交之後，React 才把節點寫進它的 `current`，節點被移除時再改回 `null`。

```jsx
/**
 * @param {*} initialValue 第一次建立時寫進 current 的值。要記住 DOM 時先給 null
 * @returns {object} ref
 *   current：跨渲染留下的同一份值。交給 JSX 的 ref 後，提交時 React 把節點寫進來
 */
const inputRef = useRef(initialValue);
// …
<input ref={inputRef} />
// 事件裡：inputRef.current?.focus()
```

不要寫 `ref={inputRef.current}`。一開始它是 `null`，等於只傳空值進去，React 沒有物件可以把節點寫回去。

### 聚焦輸入框

按「聚焦」時，對記在 ref 裡的那個輸入框呼叫 `focus()`。

**觀念**

起始值是 `null`，因為在 React 把畫面交給瀏覽器之前，DOM 節點還不存在。掛上 ref 之後，`current` 才變成 DOM 元素，所以要在事件處理函式或 effect 裡才讀它。

不要在渲染過程中讀寫 `current`：這會讓渲染不再純粹，React 官方文件不建議，eslint-plugin-react-hooks 的 `refs` 規則也會標出。

聚焦是瀏覽器對畫面的行為（游標進到輸入框），跟 React 重跑元件無關，所以這一支不需要狀態。

{% note info %}
**跟過去學 JS 操作 DOM 的差別**
以前用 JavaScript 直接改節點（找元素、改屬性、呼叫 `focus()`），覺得很理所當然。現在畫面多半靠 JSX 告訴 React「這次要長成什麼」，再由它去算差、更新 DOM；要碰真正的節點時，才透過 `ref` 伸手進去。
{% endnote %}

```jsx 03-react/src/demos/76-ref.jsx
import { useRef } from 'react';

export default function RefDemo() {
  const inputRef = useRef(null);

  const onFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="grid max-w-sm gap-3">
      <input
        ref={inputRef}
        className="rounded border px-2 py-1"
        placeholder="名稱"
      />
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onFocus}
      >
        聚焦
      </button>
    </section>
  );
}
```

按下聚焦，游標進到輸入框，畫面上的文字不會因為這一下而重畫。

**解析**

- `useRef(null)` 的起始值是 `null`，第一次渲染時節點還不在。
- `?.` 避免節點還沒接上時呼叫 `focus` 而丟出錯誤。
- 這支範例沒有受控的輸入框，輸入的文字留在 DOM 裡，不經過 React 狀態。

### ref 當作 props

函式元件預設不會把 ref 交出裡面的節點。在 React 19，元件直接把 `ref` 當成一般 props 接收，再轉給內部的內建元素，父層就能拿到那顆節點。

```jsx 03-react/src/demos/76b-ref-prop.jsx
import { useRef } from 'react';

// React 19：函式元件直接收 ref 這個 props，不必再用 forwardRef
function NameInput({ ref }) {
  return (
    <input
      ref={ref}
      className="rounded border px-2 py-1"
      placeholder="名稱"
    />
  );
}

export default function RefPropDemo() {
  const inputRef = useRef(null);

  return (
    <section className="grid max-w-sm gap-3">
      <NameInput ref={inputRef} />
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => inputRef.current?.focus()}
      >
        聚焦
      </button>
    </section>
  );
}
```

**解析**

- `NameInput` 的參數直接解構出 `ref`，再放到 `<input>` 上。
- 父層對 `NameInput` 寫 `ref={inputRef}`，按下聚焦時，`inputRef.current` 就是子元件裡的那個輸入框。

{% note info %}
**以前的寫法**
React 18 以前，函式元件拿不到 `ref` 這個 props，要用 `forwardRef` 包起來。React 19 起新元件不需要它，官方表示未來版本會棄用並移除，舊程式裡看到仍可運作。
{% endnote %}

### ref 函式與清理函式

`ref` 除了接物件，也可以接一個函式。節點出現時 React 呼叫它並傳入節點；React 19 起，這個函式可以回傳清理函式，節點被移除時 React 就執行它，用法和 effect 的清理類似。

**觀念**

這適合「節點一出現就要做事、消失時要收尾」的情況，例如訂閱某個節點的大小變化。下面用最簡單的聚焦與記錄示範。函式寫在元件外面，讓每次渲染拿到的是同一個函式；若在元件裡寫成每次都新建的函式，React 會判定 ref 變了，而在每次渲染時先清理、再重新呼叫。

```jsx 03-react/src/demos/76c-ref-callback.jsx
import { useState } from 'react';

// 放在元件外面，每次渲染都是同一個函式
function focusOnMount(node) {
  node.focus();
  console.log('輸入框出現，已聚焦');

  // React 19：ref 函式可以回傳清理函式，節點移除時執行
  return () => {
    console.log('輸入框移除，清理');
  };
}

export default function RefCallbackDemo() {
  const [open, setOpen] = useState(false);

  return (
    <section className="grid max-w-sm gap-3">
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? '隱藏' : '顯示'}輸入框
      </button>
      {open && (
        <input
          ref={focusOnMount}
          className="rounded border px-2 py-1"
          placeholder="名稱"
        />
      )}
    </section>
  );
}
```

按「顯示輸入框」，輸入框出現並取得焦點，Console 印出「輸入框出現，已聚焦」；按「隱藏輸入框」，印出「輸入框移除，清理」。

**解析**

- 回傳了清理函式，React 在節點移除時就不再用 `null` 呼叫 ref 函式。沒有回傳清理函式的舊寫法，移除時仍會收到 `null`，函式裡需要自己處理。
- StrictMode 在開發模式會替每個 ref 函式多跑一輪設定、清理、再設定，所以按「顯示輸入框」時 Console 會依序看到出現、移除、出現三行；正式版只有一行。清理寫得正確，這額外一輪就不會造成問題。

### 不觸發渲染的值

除了 DOM，`current` 也可以放「要跨渲染留下、但畫面不必顯示」的值。這時不要用 `useState` 硬記：每次 `set…` 都會整輪重跑，值沒畫上畫面也白跑。也不要用元件內的 `let`：每次重跑都會重新宣告，接不住上次的值。模組頂層的 `let` 雖然能留下，卻會讓多個實例搶同一份。

若用 `useState` 記，而畫面根本不顯示該值：

{% mermaid graph LR %}
  needNode["只要記住<br/>畫面不顯示"] --> setNode["卻用 setState"]
  setNode --> rerunNode["整輪重跑＋比對"]
  rerunNode --> wasteNode["畫面其實沒變"]
  style needNode fill:#e8f5e9
  style setNode fill:#fff3e0
  style rerunNode fill:#e3f2fd
  style wasteNode fill:#ffcdd2
{% endmermaid %}

若在元件函式裡寫 `let count = 0`：

{% mermaid graph LR %}
  needNode2["只要記住<br/>畫面不顯示"] --> letNode["元件內 let"]
  letNode --> r1Node["渲染 1：count = 0"]
  r1Node --> clickNode["事件 += 1"]
  clickNode --> r2Node["渲染 2：又從 0<br/>記不住"]
  style needNode2 fill:#e8f5e9
  style letNode fill:#fff3e0
  style r1Node fill:#e3f2fd
  style clickNode fill:#e3f2fd
  style r2Node fill:#ffcdd2
{% endmermaid %}

那把 `let` 寫在元件函式外面呢？值確實能留下，因為模組只載入一次。但那一份變數屬於整個模組，不屬於某一次元件實例：

{% mermaid graph TD %}
  sharedNode["模組頂層 let count = 0"]
  aClick["元件 A 按一次<br/>count += 1"] --> sharedNode
  bClick["元件 B 再按一次<br/>count += 1"] --> sharedNode
  sharedNode --> resultNode["兩邊讀到的都是 2<br/>不是各自累計"]
  style sharedNode fill:#fff3e0
  style aClick fill:#e3f2fd
  style bClick fill:#e3f2fd
  style resultNode fill:#ffcdd2
{% endmermaid %}

`useRef` 就是為這種情況：每個元件實例各有自己的 ref 物件，改 `current` 不會觸發渲染。反過來說，要顯示在畫面上的數字仍放狀態；只放在 ref 裡，畫面不會自己更新。

**觀念**

每按一次「只累計」，ref 加一並印到 Console。畫面上的數字是 `shown`，只有按下「顯示」才把 ref 的值抄進狀態。這用來分辨「要記住」與「要畫出來」：要畫出來的值用狀態。

```jsx 03-react/src/demos/77-ref-count.jsx
import { useRef, useState } from 'react';

export default function RefCountDemo() {
  const clicks = useRef(0);
  const [shown, setShown] = useState(0);

  const onCount = () => {
    clicks.current += 1;
    console.log(clicks.current);
  };

  return (
    <section>
      <p>畫面上的次數 {shown}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onCount}
      >
        只累計
      </button>
      <button
        type="button"
        className="ml-2 rounded bg-stone-200 px-3 py-1"
        onClick={() => setShown(clicks.current)}
      >
        顯示
      </button>
    </section>
  );
}
```

連按只累計三次，Console 是 1、2、3，畫面仍是 0。再按顯示，畫面變成 3。

**解析**

- `clicks.current += 1` 寫在事件處理函式裡，不會觸發渲染。
- `setShown` 才會觸發渲染，它抄的是按下當下的 ref 值。
- 不要在渲染過程中寫 `clicks.current += 1`：StrictMode 的兩次渲染會把次數加兩次，lint 的 `refs` 規則也會標出。
- 計時器 id 也適合放在 ref；這一支用次數，是為了讓你在 Console 直接看到。

## 選讀：useReducer

`useState` 更新一兩個值很順手。可是同一份狀態有好幾種改法（加一、減一、歸零），或下一個值一定要看上一筆（清單新增、勾選、刪除）時，設定函式會散在各顆按鈕裡，讀起來要在元件上下找邏輯。

`useReducer` 把「狀態怎麼變」收進一個函式。元件負責送出「發生了什麼」，那個函式再依動作算出下一筆狀態。呼叫形狀是：

```jsx
/**
 * 依這次的動作算出下一筆狀態。
 * @param {*} state 上一筆狀態
 * @param {*} action 這次的動作，常見是帶 type 的物件
 * @returns {*} 下一筆狀態。認不出的動作把原狀態原封還回去
 */
const reducer = (state, action) => {
  // ...
  return nextState;
};

/**
 * @param reducer 上面計算下一筆狀態的函式
 * @param {*} initialArg 起始狀態
 * @returns [state, dispatch]
 *   state：現在的狀態
 *   dispatch：送出 action 的函式，不直接塞新值
 */
const [state, dispatch] = useReducer(reducer, initialArg);
```

兩個回傳值跟 `useState` 對得上：左邊是現在的狀態，右邊是更新用的函式。差別在於右邊不是直接塞新值，而是呼叫 `dispatch`，送進一筆描述這次動作的物件（常見寫法是帶 `type`）。

真正算下一筆的是第一個參數 reducer。它接收「上一筆狀態」與「這次的 action」，必須回傳「下一筆狀態」。常用 `switch` 依 action 的 type 分支，認不出的走 `default`。

### 計數按鈕

下面用加一、減一、歸零把整條路接起來。按一下就送出一筆 action，React 把目前的 `count` 與這筆 action 交給 reducer，再用回傳值重跑畫面。

**觀念**

起始狀態是 `0`。三種按鈕各送一種 `type`；數字的加減與歸零都寫在 reducer 裡，元件只負責送出動作。

```jsx 03-react/src/demos/78-reducer-count.jsx
import { useReducer } from 'react';

function reducer(count, action) {
  switch (action.type) {
    case 'add':
      return count + 1;
    case 'sub':
      return count - 1;
    case 'reset':
      return 0;
    default:
      return count;
  }
}

export default function ReducerCountDemo() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <section className="grid max-w-sm gap-3">
      <p className="text-2xl font-semibold">{count}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => dispatch({ type: 'add' })}
        >
          加一
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => dispatch({ type: 'sub' })}
        >
          減一
        </button>
        <button
          type="button"
          className="rounded bg-stone-200 px-3 py-1"
          onClick={() => dispatch({ type: 'reset' })}
        >
          歸零
        </button>
      </div>
    </section>
  );
}
```

按下加一，數字變大；減一變小；歸零回到 0。三種改法都走同一個 `dispatch`。

**解析**

- `useReducer(reducer, 0)` 的第二個參數是起始狀態。
- 每個按鈕只描述「發生什麼」，不自己算下一筆數字。
- 和 `useState` 一樣，`dispatch` 之後在同一個事件處理函式裡讀到的 `count` 仍是舊值，新值要到下一次渲染才有。
- `default` 把不認識的 `type` 原樣擋下。官方文件的範例改成丟出錯誤，打錯 `type` 時能立刻發現；本課為了簡短，選擇原狀態還回。

{% note info %}
**reducer 要當純函式**
reducer 只能依傳進來的 `state` 與 `action` 算出下一筆並回傳：不要改動原來的陣列或物件，也不要在裡面打 API、讀時間或產生亂數。開發模式的 StrictMode 會把 reducer 多呼叫一次，丟掉其中一個結果；寫得純，多呼叫不會有影響，若直接改原陣列，就會看到待辦被加兩次。
{% endnote %}

### 待辦清單

同一份待辦（新增、勾選完成、刪除），下面先用 `useState` 寫一則，再用 `useReducer` 寫一則，對照邏輯放在哪裡。

**觀念**

每一筆待辦至少有 id、標題、是否完成。三種動作可以散在三個設定函式裡，也可以收進同一個 reducer：按鈕只送出 action，`switch` 依 `type` 回傳新陣列。

#### 用 useState

三種改法各自一個函式，裡面都要自己展開或對應陣列。

```jsx 03-react/src/demos/79-reducer-state.jsx
import { useState } from 'react';

export default function ReducerStateDemo() {
  const [todos, setTodos] = useState([
    { id: 1, title: '台北城市漫遊', done: false },
  ]);

  const onAdd = () => {
    setTodos((items) => [
      ...items,
      { id: Date.now(), title: '新待辦', done: false },
    ]);
  };

  const onToggle = (id) => {
    setTodos((items) =>
      items.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const onRemove = (id) => {
    setTodos((items) => items.filter((todo) => todo.id !== id));
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        新增
      </button>
      <ul className="mt-3 grid gap-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex gap-2">
            <button
              type="button"
              className="rounded bg-stone-100 px-2"
              onClick={() => onToggle(todo.id)}
            >
              {todo.done ? '完成' : '未完成'}
            </button>
            <span>{todo.title}</span>
            <button
              type="button"
              className="rounded bg-stone-200 px-2"
              onClick={() => onRemove(todo.id)}
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

按下新增會多一列「新待辦」；切換完成與刪除也看得到變化。行為正確，但「狀態怎麼變」散在 `onAdd`、`onToggle`、`onRemove`。

**解析**

- 每個事件處理函式都直接呼叫 `setTodos`，並在回呼裡算下一筆陣列。
- id 用 `Date.now()`，避免刪掉之後再新增時跟舊編號撞號。
- `key` 用 id。標題可能重複，不能當 key。

#### 用 useReducer

同一組行為改由 reducer 集中處理。元件只送出 action，陣列怎麼複製留在 `switch` 裡。

```jsx 03-react/src/demos/80-reducer.jsx
import { useReducer } from 'react';

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, title: action.title, done: false }];
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
};

export default function ReducerDemo() {
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, title: '台北城市漫遊', done: false },
  ]);

  const onAdd = () => {
    dispatch({ id: Date.now(), title: '新待辦', type: 'add' });
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        新增
      </button>
      <ul className="mt-3 grid gap-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex gap-2">
            <button
              type="button"
              className="rounded bg-stone-100 px-2"
              onClick={() => dispatch({ type: 'toggle', id: todo.id })}
            >
              {todo.done ? '完成' : '未完成'}
            </button>
            <span>{todo.title}</span>
            <button
              type="button"
              className="rounded bg-stone-200 px-2"
              onClick={() => dispatch({ type: 'remove', id: todo.id })}
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

畫面上的操作與上一則相同。差在新增、切換、刪除的轉移都寫在 reducer，元件讀起來較短。

**解析**

- 三個按鈕都只送出一種 action；陣列的複製留在 reducer。
- 新增時的 id 在 `onAdd` 裡用 `Date.now()` 產生，再放進 action 交給 reducer。reducer 要保持純粹，不能自己讀時間，否則同樣的輸入會得到不同結果。
- 對照上一則：行為一樣時，選 `useState` 或 `useReducer` 差在邏輯要不要集中，不是能不能做出清單。

### 搭配 Context

清單變大之後，通常會把畫面拆成幾個子元件。拆開之後，狀態和 `dispatch` 還留在父層，子元件要用就得靠 props 傳下去。這一節先看用 props 怎麼傳，再改成 context，對照少掉了哪些傳遞。

#### 拆成元件用 props

**觀念**

把上一則的新增按鈕和列表各拆成一個子元件，狀態仍由最外層持有，所以狀態與 `dispatch` 要從父層當 props 交給子元件。三個檔案放在資料夾 `81-propsDemo/`：

- `AddButton.jsx`：新增按鈕，只需要 `dispatch`。
- `TodoList.jsx`：列表，要 `todos` 來畫，也要 `dispatch` 來切換與刪除。
- `index.jsx`：放 reducer、持有 `useReducer` 並組合畫面。reducer 跟持有狀態的元件放同一個檔案，是小專案最常見的寫法。

```jsx 03-react/src/demos/81-propsDemo/AddButton.jsx
export default function AddButton({ dispatch }) {
  return (
    <button
      type="button"
      className="rounded bg-teal-800 px-3 py-1 text-white"
      onClick={() => dispatch({ type: 'add', id: Date.now(), title: '新待辦' })}
    >
      新增
    </button>
  );
}
```

```jsx 03-react/src/demos/81-propsDemo/TodoList.jsx
export default function TodoList({ todos, dispatch }) {
  return (
    <ul className="mt-3 grid gap-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex gap-2">
          <button
            type="button"
            className="rounded bg-stone-100 px-2"
            onClick={() => dispatch({ type: 'toggle', id: todo.id })}
          >
            {todo.done ? '完成' : '未完成'}
          </button>
          <span>{todo.title}</span>
          <button
            type="button"
            className="rounded bg-stone-200 px-2"
            onClick={() => dispatch({ type: 'remove', id: todo.id })}
          >
            刪除
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```jsx 03-react/src/demos/81-propsDemo/index.jsx
import { useReducer } from 'react';
import AddButton from './AddButton.jsx';
import TodoList from './TodoList.jsx';

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, title: action.title, done: false }];
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
};

export default function TodoPropsDemo() {
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, title: '台北城市漫遊', done: false },
  ]);

  return (
    <section>
      <AddButton dispatch={dispatch} />
      <TodoList todos={todos} dispatch={dispatch} />
    </section>
  );
}
```

操作跟上一則相同：新增多一列，切換完成、刪除都有效。差在畫面拆成兩個子元件，資料由父層用 props 傳進去。

**解析**

- reducer 跟上一則一模一樣，拆元件不影響狀態怎麼變。
- `AddButton` 只接 `dispatch`，`TodoList` 接 `todos` 與 `dispatch`，都是父層用 props 傳進來的。
- 目前只有一層，props 還不算麻煩。若中間再多幾層外框元件，每一層都得幫忙轉傳，就變成前面 context 那一節提過的 props 層層傳遞。

#### 改用 Context

**觀念**

做法跟前面 context 的主題色範例一樣：狀態搬進提供者元件，子元件自己從 context 取資料。資料夾 `82-providerDemo/` 共五個檔案：

- `todo-context.js`：只放 context 物件與 `useTodos`（包一層 `useContext`）。外層忘了包提供者時，它會直接丟錯，而不是默默拿到空值。
- `TodoContext.jsx`：放 reducer 與 `TodoProvider`，用 `<TodoContext value={...}>` 把 `{ todos, dispatch }` 交出去。React 19 直接把 context 當元件寫，不必再加 `.Provider`。
- `AddButton.jsx`、`TodoList.jsx`：不再接 props，改呼叫 `useTodos()` 取自己要的欄位。
- `index.jsx`：不再持有狀態，只用 `TodoProvider` 把畫面包起來。

元件檔只匯出元件，Fast Refresh 才不會被 hook 或常數擋住，所以 context 物件與 `useTodos` 獨立成 `.js` 檔。

```js 03-react/src/demos/82-providerDemo/todo-context.js
import { createContext, useContext } from 'react';

export const TodoContext = createContext(null);

export const useTodos = () => {
  const value = useContext(TodoContext);
  if (!value) throw new Error('缺少 TodoProvider');
  return value;
};
```

```jsx 03-react/src/demos/82-providerDemo/TodoContext.jsx
import { useReducer } from 'react';
import { TodoContext } from './todo-context.js';

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, title: action.title, done: false }];
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
};

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, title: '台北城市漫遊', done: false },
  ]);
  return (
    <TodoContext value={{ todos, dispatch }}>
      {children}
    </TodoContext>
  );
}
```

```jsx 03-react/src/demos/82-providerDemo/AddButton.jsx
import { useTodos } from './todo-context.js';

export default function AddButton() {
  const { dispatch } = useTodos();
  return (
    <button
      type="button"
      className="rounded bg-teal-800 px-3 py-1 text-white"
      onClick={() => dispatch({ type: 'add', id: Date.now(), title: '新待辦' })}
    >
      新增
    </button>
  );
}
```

```jsx 03-react/src/demos/82-providerDemo/TodoList.jsx
import { useTodos } from './todo-context.js';

export default function TodoList() {
  const { todos, dispatch } = useTodos();
  return (
    <ul className="mt-3 grid gap-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex gap-2">
          <button
            type="button"
            className="rounded bg-stone-100 px-2"
            onClick={() => dispatch({ type: 'toggle', id: todo.id })}
          >
            {todo.done ? '完成' : '未完成'}
          </button>
          <span>{todo.title}</span>
          <button
            type="button"
            className="rounded bg-stone-200 px-2"
            onClick={() => dispatch({ type: 'remove', id: todo.id })}
          >
            刪除
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```jsx 03-react/src/demos/82-providerDemo/index.jsx
import { TodoProvider } from './TodoContext.jsx';
import AddButton from './AddButton.jsx';
import TodoList from './TodoList.jsx';

export default function ProviderDemo() {
  return (
    <TodoProvider>
      <section>
        <AddButton />
        <TodoList />
      </section>
    </TodoProvider>
  );
}
```

畫面和操作跟上一則相同。差在父層的 JSX 不再寫 `dispatch={dispatch}`，子元件自己從 context 取資料。

**解析**

- `TodoProvider` 包在兩個子元件外面。少了這層，`useTodos` 會丟出錯誤。
- `dispatch` 的身份是穩定的，放進 context 不會因它而讓使用者重渲染。
- `AddButton` 只拿 `dispatch`，`TodoList` 兩個都拿。
- `value` 裡的物件在每次 `TodoProvider` 渲染時都是新建的；提供者重渲染（例如它的父層更新）時，所有讀這個 context 的元件都會跟著渲染。沒有編譯器時，官方文件的做法是用 `useMemo` 記住這個物件；本課專案有編譯器，通常不必手動處理。
- 這個 context 只服務待辦。主題若是另一份資料，另開一個 context，不要全部塞進同一個物件。

## 選讀：表單 Actions

表單送出後常要等伺服器回應，這段期間得顯示「送出中」、處理結果，必要時還要先把預期的畫面顯示出來。React 19 把這類流程統一成 Actions：把函式交給 `<form action>`，React 會把這次送出當成一筆動作（Action）來追蹤，進行中的狀態也能由 Hook 讀到。

上一篇的 `onSubmit` 加 `preventDefault` 仍然可用，這一節是另一種寫法。

**一覽**

- `<form action>`：送出時 React 呼叫你的函式，傳入 FormData，並取消整頁導向。
- `useActionState`：把動作的回傳結果與是否進行中一起交回來。
- `useFormStatus`：讓表單裡的子元件讀到這張表單是否正在送出。
- `useOptimistic`：動作還沒結束時，先顯示預期的結果。

{% mermaid graph LR %}
  formNode["form action"] --> pendingNode["進行中"]
  pendingNode --> doneNode["用結果更新畫面"]
  style formNode fill:#e3f2fd
  style pendingNode fill:#fff3e0
  style doneNode fill:#e8f5e9
{% endmermaid %}

### form action

表單的 `action` 是函式時，React 會在 Transition（可被打斷、不阻塞畫面的更新）裡執行它，把這次送出的 FormData 傳進去，並取消整頁導向，所以不必再呼叫 `preventDefault`。

**觀念**

欄位的 `name` 是 `title`，送出函式用 `formData.get('title')` 讀值，組成訊息後放進狀態。函式可以是 async；這一則沒有真的打網路，只模擬留下這次詢問。

```jsx 03-react/src/demos/83-action.jsx
import { useState } from 'react';

export default function ActionDemo() {
  const [message, setMessage] = useState('尚未詢問');

  const send = async (formData) => {
    setMessage('已收到詢問：' + String(formData.get('title') || '未填'));
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="想去的行程（例如台北城市漫遊）"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出詢問
      </button>
      <p>{message}</p>
    </form>
  );
}
```

送出前下面一行是「尚未詢問」。在輸入框打「台北城市漫遊」再按送出，下面一行變成「已收到詢問：台北城市漫遊」，網址不變，輸入框同時被清空。

**解析**

- `action` 收到的是函式，不是網址字串。
- 讀值靠欄位的 name，輸入框是非受控的，不需要 `value` 與 `onChange`。
- 函式順利結束後，React 會自動重設表單裡的非受控欄位，所以輸入框清空；狀態 `message` 不受影響，畫面上的訊息留著。
- 函式若丟出錯誤，錯誤會交給最近的 Error Boundary，欄位不會被重設。
- 同一張表單不要一半用受控物件、一半用 action 各寫一套，兩邊會互相覆蓋。

### useActionState

送出後通常要等伺服器回一個結果，例如「已儲存」或錯誤訊息，再顯示在畫面上。等待期間按鈕最好不能再按，免得同一筆送兩次。全靠 `useState` 要自己管「結果」和「是否送出中」兩份狀態；`useActionState` 把它們收在一起，你只寫一個送出函式。

```jsx
/**
 * 送出時要做的事。實際專案會把 FormData 送到伺服器，再回傳伺服器給的結果。
 * @param {*} previous 上一次 send 回傳的結果
 * @param {FormData} formData 這次表單的欄位
 * @returns {*} 回傳什麼，state 就變成什麼，不必再呼叫 setState
 */
const send = async (previous, formData) => {
  // ...
  return result;
};

/**
 * @param send 上面的送出函式
 * @param initialState 還沒送出過的起始結果
 * @returns [state, formAction, isPending]
 *   state：最近一次 send 回傳的值，第一次是 initialState
 *   formAction：交給 <form action> 的函式，按下送出時 React 會呼叫 send
 *   isPending：send 還沒結束時為 true
 */
const [state, formAction, isPending] = useActionState(send, initialState);
```

**觀念**

沿用前面寫好的假 API：`send` 呼叫 `createItem`，把行程名稱 POST 出去，拿回應裡的 `title` 串成報名訊息。進行中時按鈕停用並顯示「報名中」，結束後畫面換成 `send` 回傳的字串。`send` 不要自己呼叫，把拿到的 `formAction` 放進 `action` 即可。

```jsx 03-react/src/demos/84-action-state.jsx
import { useActionState } from 'react';
import { createItem } from '../api/fake-api.js';

const send = async (previous, formData) => {
  const item = await createItem({ title: String(formData.get('title') || '未填') });
  const title = item.title;
  return previous === '尚未報名' ? '已報名：' + title : previous + '、' + title;
};

export default function ActionStateDemo() {
  const [message, formAction, isPending] = useActionState(send, '尚未報名');

  return (
    <form action={formAction} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="想報名的行程"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-60"
      >
        {isPending ? '報名中' : '報名'}
      </button>
      <p>{message}</p>
    </form>
  );
}
```

第一次送出「台北城市漫遊」，等假 API 回應後訊息變成「已報名：台北城市漫遊」。再送出「花蓮山海三日」，訊息變成「已報名：台北城市漫遊、花蓮山海三日」。等待時按鈕停用、文字是「報名中」，每次送出後輸入框都會清空。

**解析**

- 第二個引數「尚未報名」是起始狀態，第一次動作的 `previous` 就是它。
- 回傳值成為下一次的 `message`，不需要 `setState`。
- `previous` 是上一筆結果，不是輸入框裡的草稿，草稿在 FormData。
- 連續送出的動作會排隊，一次執行一個，後一個拿到前一個的結果。
- 預期內的錯誤（例如欄位驗證）要當成回傳值放進狀態；如果 `send` 丟出錯誤，會交給 Error Boundary，後面排隊的動作也會被取消。這一則的假 API 失敗時就會丟錯，教學用，沒有另外處理。
- 在 `send` 裡 `await` 之後才呼叫 `setState`，需要再包一層 `startTransition`（`useActionState` 文件列為目前的限制）。

### useFormStatus

按鈕、送出提示常被拆成獨立元件。這時元件不必從父層傳 `isPending` 進來，直接用 `useFormStatus` 讀它所在那張表單的狀態。

```jsx
import { useFormStatus } from 'react-dom'; // 注意來自 react-dom

// 不接收參數，回傳：
//   pending：這張表單的 action 正在進行中時為 true
//   data：正在送出的 FormData，沒有送出時為 null
//   method：表單的 method，'get' 或 'post'
//   action：傳給表單 action 的函式，沒有時為 null
const { pending, data, method, action } = useFormStatus();
```

**觀念**

`useFormStatus` 只讀「外層」的 `<form>`：呼叫它的元件必須是 form 的子元件，寫在放 `<form>` 的同一個元件裡永遠讀到 false。因此送出按鈕獨立成 `SubmitButton`，放在 form 裡面。

```jsx 03-react/src/demos/84b-form-status.jsx
import { useFormStatus } from 'react-dom';

// 必須是 <form> 裡面的子元件，useFormStatus 才讀得到那張表單的狀態
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-60"
    >
      {pending ? '送出中' : '送出'}
    </button>
  );
}

export default function FormStatusDemo() {
  const send = async () => {
    // 模擬伺服器 2 秒後才回應
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="輸入任何文字"
      />
      <SubmitButton />
    </form>
  );
}
```

按下送出後，按鈕停用並顯示「送出中」，2 秒後恢復成「送出」，輸入框同時清空。

**解析**

- `SubmitButton` 沒有任何 props，狀態來自外層的 form。
- `send` 是 async 函式，React 以它是否結束判斷 `pending`。
- 想在同一個元件內自己用 `isPending`，改用 `useActionState` 第三個回傳值即可。

### useOptimistic

動作還沒回來時，先把預期的結果畫出來，讓畫面不必等伺服器。真正的狀態仍在動作結束後才更新；動作結束或失敗時，樂觀的那一層就消失，回到實際的狀態。

```jsx
/**
 * 把預期值併進目前的狀態。省略時，setOptimistic 收到的值會直接當成下一筆樂觀狀態。
 * @param {*} current 目前的實際狀態
 * @param {*} optimistic 這次 setOptimistic 傳入的預期值
 * @returns {*} 畫面上要顯示的樂觀狀態
 */
const reducer = (current, optimistic) => {
  // ...
  return next;
};

/**
 * @param {*} value 實際狀態；沒有進行中的動作時，就是畫面顯示的值
 * @param reducer 可省略。上面這個合併函式，必須是純函式
 * @returns [optimisticState, setOptimistic]
 *   optimisticState：動作進行中是預期結果，結束或失敗後回到 value
 *   setOptimistic：設定預期值，必須在 Action 裡呼叫
 */
const [optimisticState, setOptimistic] = useOptimistic(value, reducer);
```

**觀念**

`setOptimistic` 只能在 Action 裡呼叫，`<form action>` 的函式就是一個 Action，所以可以直接用。這一則直接用新的名稱取代舊的，所以省略 reducer。

送出時先 `setOptimisticName`，再等待，最後更新實際狀態。等待的 3 秒內畫面已經是新名稱。這裡故意不用假 API，因為它回得太快，看不出差別。`await` 之後的 `setName` 要包 `startTransition`，才會被視為同一筆 Transition，樂觀值與實際值在同一次畫面更新裡一起換成新值。

```jsx 03-react/src/demos/85-optimistic.jsx
import { startTransition, useOptimistic, useState } from 'react';

export default function OptimisticDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  const send = async (formData) => {
    const next = String(formData.get('name') || name);
    setOptimisticName(next);
    // 故意不用 fake-api：模擬伺服器 3 秒後才返回，讓先顯示、後更新的差別看得出來
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // await 之後的狀態更新要再包一層 startTransition，樂觀值才會和實際值同一次換掉
    startTransition(() => setName(next));
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <p>旅程名稱 {optimisticName}</p>
      <input
        name="name"
        className="rounded border px-2 py-1"
        placeholder="新的旅程名稱"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        更新名稱
      </button>
    </form>
  );
}
```

輸入「花蓮山海三日」並送出，畫面上的「旅程名稱」立刻變成花蓮山海三日，不必等 3 秒；3 秒後實際狀態跟上，畫面維持同一個名稱，輸入框同時清空。

**解析**

- 畫面讀 `optimisticName`，不直接讀 `name`，進行中時兩者可能不同。
- 動作結束後 `name` 變成新值，樂觀值與實際值就一致了。
- 樂觀值只在動作進行中存在。若永遠沒有更新實際狀態，動作一結束畫面就跳回舊名稱。
- 動作失敗時不要更新實際狀態，樂觀值就消失，畫面回到舊名稱；可以另用一個狀態顯示錯誤訊息。
- 實際專案要放回清單時，會用第二個引數 reducer 把預期項目併進清單。

{% note info %}
`useFormStatus` 與 `useActionState` 的 `isPending` 都是「動作進行中」；`useOptimistic` 解決的是「進行中先顯示什麼」，三者可以同時用在同一張表單。
{% endnote %}

# 回家作業

這份作業只用必教內容，資料取自專案的行程清單。請在練習專案裡開啟，行程資料放在 `public/data/tours.json`，用 `fetch('/data/tours.json')` 讀取。課堂上不會批改，也沒有標準答案；每一題都附上完成後該看到的結果，自己對照即可。

## 起始檔

起始檔在練習專案的 `03-react/src/homework/10-homework.jsx`，在練習專案的選單裡切到「10 回家作業」就能看到。

```jsx 03-react/src/homework/10-homework.jsx
// 資料在 public/data/tours.json，用 fetch('/data/tours.json') 讀取

export default function Homework10() {
  return <p>在這裡開始寫</p>;
}
```

## 題目

### 題目一：讀取資料

元件載入時用 effect 讀取行程資料並顯示列表。讀取期間顯示「載入中」，失敗顯示「讀取失敗」，資料是空陣列時顯示「目前沒有行程」。離開畫面時要避免舊的請求結果覆蓋畫面。

完成後第一次看到「載入中」，接著出現八筆行程；把路徑暫時改成不存在的檔案，畫面顯示「讀取失敗」。

### 題目二：共用的收藏

每筆行程旁有「收藏」按鈕。另外在同一個畫面放一個「收藏清單」元件，列出已收藏的行程，並且可以從清單移除。收藏的編號只放在共同的父層，兩個元件都透過 props 取得。

完成後在列表按收藏，清單立刻多一筆；在清單按移除，列表那筆的按鈕變回未收藏。

### 題目三：同步分頁標題

用 effect 讓瀏覽器分頁標題跟著收藏數量變化，例如「收藏 2 筆｜洛奇旅行」。收藏數量沒有改變時，這個 effect 不應重新執行。

完成後每次收藏或移除，分頁標題的數字隨之改變。

### 題目四：重新整理後還在

收藏的編號要存進 `localStorage`，重新整理頁面後仍然保留。初始值從 `localStorage` 讀取，讀不到時用空陣列。

完成後收藏兩筆、重新整理，收藏清單仍有那兩筆。

### 題目五：避免不必要的 effect

檢查你寫的程式：「已收藏筆數」是不是用 effect 更新的另一個狀態？如果是，改成在渲染時直接由收藏陣列算出來。

完成後畫面行為不變，但程式裡沒有只為了算筆數而存在的 effect 與狀態。

# 本篇重點回顧

選讀的章節有：選讀：AbortController、選讀：遠端寫入、選讀：不需要 effect 的情況、選讀：自訂 Hook、選讀：useContext、選讀：React Compiler 與手動記憶化、選讀：useMemo、選讀：memo、選讀：useCallback、選讀：useRef、選讀：useReducer、選讀：表單 Actions。

- effect 的 setup 在畫面提交之後執行，用來跟計時器、讀取或訂閱這類外部系統對齊，語法是 `useEffect(setup, deps)`。
- 依賴陣列決定重跑時機：列出的值任何一個改變就重跑，空陣列只在第一次畫完後跑，省略則每次渲染之後都跑。
- 清除函式在下一次 setup 之前與元件離開畫面時執行，負責停掉計時器、取消訂閱與中止請求。
- 在 effect 裡設定狀態又讓它每次重跑會造成無限迴圈，漏寫依賴則會讓效果沿用舊值。
- 讀取資料要把載入中、失敗與沒有資料當成三種不同的畫面來處理，並用清除函式避免過期的回應蓋掉新結果。
- 畫面推得出來的值直接在渲染時算，按一次才要做的事放在事件裡，不必都交給 effect。
- 兩個以上的元件要讀同一份會變的資料時，把狀態提升到最近的共同父層，再用 props 往下傳。
- 兄弟元件之間不能直接溝通，由父層持有狀態，一邊透過傳下去的函式更新，另一邊就會拿到新值。

# 專有名詞中英對照

## Effect 與資料

- 效果（effect）
- 依賴陣列（dependency array）
- 清除函式（cleanup）
- 準備函式（setup）
- 無限迴圈（infinite loop）
- 競態（race condition）
- 嚴格模式（Strict Mode）
- API 模組（API module）
- 自訂 Hook（custom Hook）

## 共用狀態

- 狀態提升（lifting state up）
- 單一資料來源（single source of truth）
- 屬性鑽孔（props drilling）

## 選讀：React Compiler 與手動記憶化

- 記憶化（memoization）
- 編譯器（React Compiler）

## 選讀：表單 Actions

- 動作（Action）
- 非受控（uncontrolled）
- 樂觀狀態（optimistic state）
