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

畫面畫完之後，才適合去讀檔、訂閱或對外部系統做一次性的動作。這一篇先看 effect 什麼時候跑、怎麼收尾，再把讀寫請求收成函式。接著讓多個元件共用一份狀態，並用 Context 處理中間層只為轉傳 props 的麻煩。ref、reducer 與表單 Actions 放在選讀。換頁留到 React Router。

<!-- more -->

# Effect 與資料

渲染時只負責算出這一次的畫面。計時器、讀取與訂閱放在 effect。使用者按一次才要送出的請求放在事件裡。這一章用本機 JSON 練習載入、失敗與空資料，寫入則用 JSONPlaceholder 走完新增、更新與刪除。

## useEffect 的執行時機

`useEffect` 把「畫面畫完之後才跟外面同步」寫成一次呼叫：

```jsx
useEffect(setup, deps);
```

對上真實的寫法會長這樣。第一個參數是 setup，第二個參數是 deps：

```jsx
useEffect(() => {
  console.log('效果執行');
  return () => {
    console.log('清除');
  };
}, []);
```

箭頭函式整段是 setup（準備函式）：畫面提交之後才跑，用來跟外面的世界對齊，例如計時器、讀取、訂閱；這裡印「效果執行」。`return` 出去的函式是清除函式，同一個 Hook 下一次再跑 setup 之前、以及元件卸掉時會先執行，用它清掉計時器、中止讀取、解除訂閱；這裡印「清除」。`[]` 是 deps（依賴陣列），這一則先用空陣列。完整元件與按鈕對照在「第一次執行」。

依賴陣列本身是陣列，可以列出多個值，例如 `[keyword, page]`。列出來的任何一個變了，就先執行清除，再執行下一次 setup。下面的示範多半只放一個值，方便看出是哪一個變了；能放多個，規則相同。

三種寫法：

- `[a, b]`：列出的任何一個依賴變了，就先清除再跑 setup。
- `[]`：只在第一次畫完後跑。清除發生在卸載，以及開發時嚴格模式的再掛上檢查。
- 完全省略第二個參數：每一次渲染之後都跑。setup 裡若同步呼叫設定函式，渲染與效果會互相追。見「無限迴圈」。

空陣列的第一次執行、依賴改變、清除函式、省略依賴造成的迴圈、漏寫依賴，下面各有一則。

**觀念**

元件函式負責算出這一輪要畫什麼，算完就停。總價、過濾後的清單、從狀態推得出來的文字，留在渲染裡用運算式得出來。這些值不必再放進 effect 重算一次。

使用者做一次才要發生的事，寫在事件處理函式裡。按下才送出、按下才讀一筆，都是事件。進畫面就要自動做的，才是 effect。

寫在元件函式裡的 `console.log` 每次渲染都會印，而且印在畫上畫面之前。那是渲染的過程。effect 要等這一輪提交、畫面更新之後才跑。

{% mermaid graph LR %}
  renderNode["渲染：算出元素"] --> commitNode["提交：畫上畫面"]
  commitNode --> effectNode["執行 setup"]
  effectNode --> cleanupNode["下次或卸載時清除"]
  style renderNode fill:#e3f2fd
  style commitNode fill:#e3f2fd
  style effectNode fill:#fff3e0
  style cleanupNode fill:#e8f5e9
{% endmermaid %}

### 第一次執行

這一則的依賴是空陣列。setup 印「效果執行」，清除函式印「清除」。按鈕讓計數增加，用來確認重新渲染不會讓這個 effect 再跑。

**觀念**

`[]` 表示第一次畫完後跑 setup，之後這顆元件的狀態變了也不重跑。清除仍會在卸載時跑。開發時嚴格模式還會在再掛上之前先跑一次清除。

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

開發時嚴格模式開著。這顆元件第一次掛上，Console 依序是下面三行：先「效果執行」（掛上），再「清除」（把這一次收掉），再「效果執行」（再掛上，確認清除有跑）。正式建置只印一次「效果執行」。

上一篇 {% post_link lokiTech-15day-09-react-basics %} 的「createRoot」說過，Vite 範本預設就包著 `<StrictMode>`。課堂與 `03-react` 保持打開。拿掉之後這三行會變成一行，收尾沒寫好的問題也一起看不見。

接著按下「加一」。畫面上的次數會變，Console 不會再多出這三行。`[]` 表示狀態變了，這個效果不重跑。

```text
效果執行
清除
效果執行
```

**解析**

- 開發時嚴格模式在第一次掛上檢查收尾，所以順序是「效果執行」、「清除」、「效果執行」。正式建置只印一次「效果執行」。
- 這三行來自嚴格模式的收尾檢查。課堂保持 `<StrictMode>` 打開。為什麼預設開著，見上一篇的「createRoot」。
- 空陣列會在第一次畫完後跑。
- 回傳的函式是清除。元件離開畫面之前會先執行它。開發時，嚴格模式在再掛上之前也會先執行它。
- 按下「加一」會再渲染，畫面上的次數改變。依賴是 `[]`，效果不跟著重跑，那三行也不會再增加。
- 清除函式裡不要同步設定這顆元件的狀態。元件都要卸掉了，設定已經沒有畫面可畫。

{% note success %}
**換你試試：**
在 setup 裡多印一行固定字串「已掛上」。不要在效果裡讀 `count`。按下加一之後，Console 不該再出現「已掛上」。
{% endnote %}

<details>
<summary>參考答案</summary>

多印的是固定字串，效果裡沒有讀 `count`，依賴仍是空陣列。按下加一只改畫面，setup 不重跑，「已掛上」不會再出現。

```diff 03-react/src/demos/48-effect.jsx
  // ...
  useEffect(() => {
    console.log('效果執行');
+   console.log('已掛上');
    return () => {
      console.log('清除');
    };
  }, []);
  // ...
```

</details>

### 依賴陣列

效果裡讀到的 props 與 state，都要放進依賴陣列。值變了，React 先執行清除，再用新的值跑下一次 setup。

**觀念**

依賴陣列是陣列。它可以同時列好幾個值，例如 `[keyword, page]`，任何一個變了都會先清再跑。這一則只放一個 `keyword`，畫面與 Console 都只跟著這個字。

關鍵字從「台北城市漫遊」開始。setup 印出這一次要查的字，清除函式印出上一次的字。按下按鈕換成「花蓮山海三日」之後，Console 會先印清除，再印一次新的查詢。

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

打開時，開發中的嚴格模式會依序印「查詢 台北城市漫遊」、「清除 台北城市漫遊」、「查詢 台北城市漫遊」，和上一則同一種收尾檢查。按下按鈕後，會先清除台北城市漫遊，再查詢花蓮山海三日。

```text
清除 台北城市漫遊
查詢 花蓮山海三日
```

**解析**

- 依賴裡的 `keyword` 變了，效果才會重跑。這一則的畫面只顯示查詢字，Console 也只印查詢與清除。
- 清除函式看到的是上一次的關鍵字。所以會先印「清除 台北城市漫遊」，再印「查詢 花蓮山海三日」。
- 按第二次時關鍵字已經是花蓮山海三日。設定成同一個字時，React 可以略過這次渲染，效果也不重跑。
- 陣列、物件若在渲染時現做一個新的，依賴會每次都變成新參考，效果就會每次都跑。

{% note success %}
**換你試試：**
按鈕改成把關鍵字設成京都紅葉散步。按下後應先清除舊字，再查詢京都紅葉散步。
{% endnote %}

<details>
<summary>參考答案</summary>

依賴已經寫了關鍵字，所以換成任何新字都會先清再跑。

```diff 03-react/src/demos/49-deps.jsx
  // ...
-       onClick={() => setKeyword('花蓮山海三日')}
+       onClick={() => setKeyword('京都紅葉散步')}
      >
-       改查花蓮山海三日
+       改查京都紅葉散步
      </button>
  // ...
```

</details>

### 清除函式

計時器、訂閱與請求都要在清除函式裡停掉。元件卸掉之後，回呼仍可能被呼叫，那時候不該再設定已經不在畫面上的狀態。

**觀念**

`setInterval` 每一秒把秒數加一。setup 只負責拿到計時器的 id，回傳的清除函式用這個 id 呼叫 `clearInterval`。切到別的示範時，這顆元件卸掉，秒數就不再增加，Console 也不該再報已卸載的更新。

設定狀態寫在計時器的回呼裡，不是寫在 setup 的第一行。效果本身只負責登記與清掉計時器。

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

畫面從 0 開始，大約每一秒加 1。切換到別的示範後，這個計時器應停住。

**解析**

- 空依賴表示只登記一次計時器。秒數更新不會再去 `setInterval` 一次。
- 更新函式不讀渲染時的 `seconds`，所以不會卡住在 0 加 1。
- 沒有清除的話，切走之後回呼仍會呼叫設定函式。
- 嚴格模式會先清掉第一次的計時器再登記第二次。正式建置只登記一次。

{% note success %}
**換你試試：**
把間隔改成 2000。秒數應大約每兩秒加 1，清除函式留著。
{% endnote %}

<details>
<summary>參考答案</summary>

只改間隔。清除仍用同一個 id，否則會停不掉。

```diff 03-react/src/demos/50-timer.jsx
  // ...
-   }, 1000);
+   }, 2000);
    return () => clearInterval(id);
  // ...
```

</details>

### 無限迴圈

效果若在每次渲染之後同步設定狀態，渲染與效果會一直互相追。ESLint 的 `react-hooks/set-state-in-effect` 會把效果裡同步的 `setState` 標成錯誤。

**觀念**

跟外面的系統對齊時，setup 可以改外面的東西，例如瀏覽器分頁標題。這一則把 `document.title` 設成目前的行程名稱。依賴是 `[place]`，只有行程變了才改標題。清除函式把標題還原成這一次 setup 開始前的文字。練習頁進來時的標題是「React 練習」，切到別的示範後會回到這句。

{% note warning %}
**不要存進專案**

下面這段省略了第二個參數，所以每次渲染之後都會跑。setup 裡又同步 `setCount(count + 1)`，每一次設定都排下一次渲染，下一次渲染又跑效果。

```jsx
useEffect(() => {
  setCount(count + 1);
});
```

這種寫法會讓畫面停不下來，也不要留在 `51-loop.jsx`。
{% endnote %}

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

打開時，瀏覽器分頁標題變成「台北城市漫遊」，畫面上的句子也是這個名字。按一次「改成花蓮山海三日」，標題與句子一起換成花蓮山海三日，然後停住。再按一次，字沒變，標題也不會連跳。

**解析**

- setup 只寫 `document.title`，沒有呼叫 `setPlace`。效果自己不會排下一輪渲染。
- 依賴是 `[place]`。行程沒變，效果不重跑。警告裡的片段把第二個參數整個省略，每次渲染後都會再跑。
- 按鈕把行程設成一個固定字。設成同一個字時，React 可以略過渲染，效果也不會再跑。
- 清除函式還原的是這一次 setup 開始前讀到的標題。切到別的示範時，分頁標題回到「React 練習」。
- 警告裡的 `setCount(count + 1)` 寫在 setup 的第一行。渲染結束就設定，設定又造成渲染，兩邊互相追。`react-hooks/set-state-in-effect` 會把這段標成錯誤。

{% note success %}
**換你試試：**
按鈕改成把行程設成京都紅葉散步，按鈕文字一併改成「改成京都紅葉散步」。按一次後，分頁標題應是京都紅葉散步，而且只換一次。
{% endnote %}

<details>
<summary>參考答案</summary>

設成固定的字只會再跑一次效果。標題換成京都紅葉散步之後就停住。

```diff 03-react/src/demos/51-loop.jsx
  // ...
-       onClick={() => setPlace('花蓮山海三日')}
+       onClick={() => setPlace('京都紅葉散步')}
      >
-       改成花蓮山海三日
+       改成京都紅葉散步
      </button>
  // ...
```

</details>

### 漏寫依賴

效果裡讀到的值要寫進依賴陣列。少寫時，閉包會停在第一次的值。ESLint 的 `react-hooks/exhaustive-deps` 會警告少了哪個名字。警告不會讓 `pnpm lint` 失敗，但代表這一則讀到的是舊值。

**觀念**

這一則故意把錯誤寫法留在檔案裡。效果讀了 `count`，依賴卻是 `[]`。畫面次數會隨按鈕增加，Console 在嚴格模式安頓之後停在 0。

把 `count` 放進依賴，或從效果裡拿掉這個讀取。不要用關掉警告來收尾。

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

打開時，嚴格模式會讓這個效果多跑一次，印出的都是「次數 0」。安頓之後 Console 停在這個 0。按下「加一」，畫面變成 1、2、3，Console 不再增加。

在 `03-react` 執行 `pnpm lint`，這一檔會出現 `react-hooks/exhaustive-deps`，指出少了 `count`。

**解析**

- 效果函式閉包住的是第一次渲染的 `count`，也就是 0。空依賴讓它之後不再建立新的函式。
- 畫面讀的是每一輪渲染的 `count`，所以按鈕仍會把次數加上去。兩邊讀到的進度不一樣。
- `pnpm lint` 的警告名稱是 `react-hooks/exhaustive-deps`。它點名少了 `count`。警告不會讓這條指令以失敗結束。
- 函式若在渲染時現寫一個，又被效果呼叫，也算依賴。能搬進效果裡的函式，就留在 setup 裡面。

{% note success %}
**換你試試：**
把依賴改成 `[count]`。按下加一後，Console 應跟著印出新的次數。改完再執行 `pnpm lint`，這一則少依賴的警告會消失。
{% endnote %}

<details>
<summary>參考答案</summary>

依賴補上 `count` 之後，次數一變就再跑 setup，Console 跟上畫面。按下加一，會在原本的 0 之後出現「次數 1」。開發時一開始的 0 仍可能有兩行，那是嚴格模式的掛上檢查。按按鈕加上去的數字各印一次。

```diff 03-react/src/demos/52-lint.jsx
  // ...
- }, []);
+ }, [count]);
  // ...
```

</details>

## 讀取資料

讀取有三種畫面：還在等、失敗、以及成功但沒有資料。請求要用 `AbortController` 在元件卸掉時取消，避免慢回來的回應蓋掉新的那一次。

- 載入中先畫一句話，不要畫空清單假裝已經完成。
- `response.ok` 為假時進錯誤畫面。網路丟出的例外也走同一條。
- 成功而且陣列是空的，要跟錯誤分開。空資料是正常結果。
- 清除函式呼叫 `abort`。被取消的請求不要改成錯誤畫面。

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

本機的 `items.json` 有三筆行程。效果在第一次畫完後讀它，並把狀態設成載入、完成或失敗。空陣列另外一句話，不跟失敗混在一起。下一則「空資料」沿用同一套骨架，只換資料來源。

**觀念**

`status` 起始是 `loading`，所以第一幀是「載入中」。

請求成功才改成 `ready` 並放入陣列。失敗時改成 `error`，清單清空。

設定狀態發生在 `await` 之後的回呼裡，不是效果的第一行，所以不會被當成同步設定。

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

讀取完成後是三列：台北城市漫遊 12800、花蓮山海三日 15900、京都紅葉散步 42800。

**解析**

- 第一幀不是空白。使用者看得到還在等。
- `response.ok` 為假時丟出錯誤，進到 catch，不會把錯誤頁面的 HTML 當清單。
- 空陣列與失敗是兩個畫面。這一則的檔案有資料，所以走清單。
- `key` 用資料的 id。讀取結果仍是列表，規則與上一篇相同。

{% note success %}
**換你試試：**
網址改成 `/data/missing.json`。畫面應變成讀取失敗，而不是空清單。
{% endnote %}

<details>
<summary>參考答案</summary>

檔案不存在時狀態碼不是成功，catch 把狀態設成 error。

```diff 03-react/src/demos/53-load.jsx
 // ...
-        const response = await fetch('/data/items.json');
+        const response = await fetch('/data/missing.json');
 // ...
```

</details>

### 空資料

成功與「沒有任何一筆」是不同的事。這一則與「載入與錯誤」共用同一套骨架，差別只在資料來源：這裡讀一份內容為 `[]` 的 JSON。狀態仍是 ready，畫面用長度決定要不要說沒有資料。

**觀念**

`empty.json` 的內容是 `[]`。請求成功，所以不是失敗。

長度是 0，所以不畫 `<ul>`，改寫「沒有資料」。

不要用讀取失敗的句子來表示空清單。使用者會以為網路壞了，然後重新整理。

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

畫面停在「沒有資料」。開發者工具的網路分頁應看到 empty.json 的狀態碼是 200。

**解析**

- 200 配上空陣列仍是成功。`response.ok` 為真。
- 長度判斷放在 ready 之後。載入中的陣列也是空的，但不能提早說沒有資料。
- 失敗的 catch 不會在這一則跑到，除非檔案被拿掉。
- 空狀態是一句人話。它不是把錯誤物件印出來。

{% note success %}
**換你試試：**
網址改回 `/data/items.json`。應改看到三個標題，而不是沒有資料。
{% endnote %}

<details>
<summary>參考答案</summary>

檔案裡有三筆，長度不再是 0，所以改走清單。

```diff 03-react/src/demos/54-empty.jsx
 // ...
-        const response = await fetch('/data/empty.json');
+        const response = await fetch('/data/items.json');
 // ...
```

</details>

### AbortController

元件卸掉或關鍵字換了，上一次的請求要取消。慢回來的舊回應若仍去 `setItems`，會把新的結果蓋掉。

**觀念**

`AbortController` 產生一個 signal，交給 `fetch`。

清除函式呼叫 `abort`。catch 裡若是 `AbortError`，直接返回，不要改成錯誤畫面。

嚴格模式會先跑一次再清掉，所以開發時可能看到第一次請求被取消。第二次完成的那筆才是畫面要的資料。

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

完成後仍是台北城市漫遊、花蓮山海三日、京都紅葉散步。切到別的示範時，進行中的請求會被 abort，不會把錯誤寫上已經離開的畫面。

**解析**

- signal 跟這一次 effect 綁在一起。清除時只取消這一次。
- `AbortError` 是取消，不是讀取失敗。兩種 catch 要分開。
- 取消之後不要再 `setStatus('error')`。否則嚴格模式的第一次會把畫面停在失敗。
- 依賴若之後加上關鍵字，關鍵字一變就會先 abort 再發新的請求。

{% note success %}
**換你試試：**
在 catch 裡，AbortError 時改印出「已取消」，不要改狀態。切換示範時 Console 應看得到這一行。
{% endnote %}

<details>
<summary>參考答案</summary>

取消只記一行。錯誤畫面仍只留給真的失敗。

```diff 03-react/src/demos/55-abort.jsx
 // ...
-        if (error.name === 'AbortError') return;
+        if (error.name === 'AbortError') {
+          console.log('已取消');
+          return;
+        }
 // ...
```

</details>

## 遠端寫入

讀取可以打本機檔案。新增、更新與刪除這門課打 JSONPlaceholder，它會回成功的狀態碼，但不會真的把資料留在伺服器上。重新讀取仍是原本的內容。

- GET 讀取，不改伺服器上的資料。
- POST 新增，成功時常是 201，回應裡有新的 id。
- PUT 用你交出去的整份資料替換指定的那一筆。
- DELETE 刪除指定的那一筆，這一則用狀態碼確認即可。

這些呼叫先寫在元件裡，讓每一次的方法看得分明。下一節再把它們收進同一個模組。

### GET

GET 讀取單筆文章。網址的 id 寫在路徑最後。這一則按按鈕才發請求，所以效果不是必須的。按鈕屬於事件，請求就放在事件裡。

**觀念**

按下之後把 id 為 1 的標題放進狀態。失敗時訊息是讀取失敗。載入中先把訊息設成「讀取中」，避免使用者以為沒按到。

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

按下之後，標題會換成 JSONPlaceholder 第一篇文章的標題，不再是「尚未讀取」。

**解析**

- 請求在事件裡，不在渲染裡，也不需要 effect。使用者沒按，就不會打網路。
- 路徑的 `1` 是資源的 id。換 id 就是讀另一筆。
- `post.title` 是 JSON 的欄位。狀態存標題字串，不存整個回應物件也可以。
- 失敗與成功都寫進同一個狀態，畫面只讀那一行。

{% note success %}
**換你試試：**
改讀 id 為 2 的文章。按下後標題應換成另一篇，而不是第一篇。
{% endnote %}

<details>
<summary>參考答案</summary>

只改路徑最後的 id。其餘的狀態流程不變。

```diff 03-react/src/demos/56-get.jsx
 // ...
-        'https://jsonplaceholder.typicode.com/posts/1',
+        'https://jsonplaceholder.typicode.com/posts/2',
 // ...
```

</details>

### POST

POST 把新的 JSON 放在 body。標頭要註明內容是 JSON。這一則把回應的 id 顯示出來，確認伺服器有收下這一次的描述。

**觀念**

送出的物件有標題與內文，使用者 id 固定為 1。`response.status` 在成功時多半是 201。畫面上同時留下狀態碼與新 id。

JSONPlaceholder 回的 id 是它編的練習用編號。重新整理後那一筆不會留在清單裡。

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

按下之後，訊息類似「201 id 101」。實際 id 以回應為準。

**解析**

- `method` 是 POST。沒寫的話 fetch 會用 GET，body 也不會被送出。
- `JSON.stringify` 把物件變成文字。標頭告訴對方這是 JSON。
- 狀態碼與 id 都來自回應。不要自己猜下一個 id。
- 這個服務不會保存。再按一次仍會成功，但清單頁重新讀取看不到這兩筆。

{% note success %}
**換你試試：**
標題改成「第二則」。狀態碼仍應是 201，畫面不必顯示標題也沒關係。
{% endnote %}

<details>
<summary>參考答案</summary>

只改送出的 title。方法、標頭與錯誤處理留著。

```diff 03-react/src/demos/57-post.jsx
 // ...
-          body: JSON.stringify({ title: '新行程', body: '台北城市漫遊', userId: 1 }),
+          body: JSON.stringify({ title: '第二則', body: '台北城市漫遊', userId: 1 }),
 // ...
```

</details>

### PUT

PUT 替換指定 id 的那一筆。網址要帶 id，body 是替換後的整份資料。沒寫到的欄位，在這種替換語意裡就不會留在新的那一份。

**觀念**

這一則更新 id 為 1 的文章，標題改成「更新後的標題」。成功時把回應裡的標題寫上畫面，並在 Console 印出狀態碼。常見的成功狀態碼是 200。

PATCH 只送要改的欄位。這門課的練習先用 PUT，因為畫面上交出去的就是一整份。

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

按下之後，畫面是「更新後的標題」。

```text
200
```

**解析**

- 路徑帶著要替換的 id。POST 的網址則停在集合，不帶這一筆的 id。
- body 含 id、標題、內文與 userId。這是整份替換。
- 畫面讀回應的 title，確認伺服器回的是你送出的那份描述。
- 同樣地，重新讀取 id 1 仍會看到原本的文章。練習服務沒有保存。

{% note success %}
**換你試試：**
標題改成「已改標題」，並在 Console 再印一次 `response.ok`。應是 true。
{% endnote %}

<details>
<summary>參考答案</summary>

狀態碼那一行留著，再印 ok。標題改成新的字串。

```diff 03-react/src/demos/58-put.jsx
 // ...
-            title: '更新後的標題',
+            title: '已改標題',
 // ...
       console.log(response.status);
+      console.log(response.ok);
 // ...
```

```text
200
true
```

</details>

### DELETE

DELETE 的網址指向要刪的那一筆，通常沒有 body。成功時這一則只確認狀態碼，因為回應不一定有 JSON。

**觀念**

按下後對 id 1 送出 DELETE。狀態碼是 200 時，訊息寫「已刪除」。不是成功就寫失敗與狀態碼。

不要在刪除成功前就把畫面那一列先拿掉又沒有失敗可還原。這一則沒有本地清單，只練習請求本身。

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

按下之後是「已刪除 200」。再去 GET 同一筆，練習服務仍會把文章還給你。

**解析**

- 方法是 DELETE。網址必須是那一筆，不是整個集合。
- 沒有 body，也就不必加 JSON 標頭。
- 成功的判斷仍是 `response.ok`。不要只看有沒有丟出例外，HTTP 錯誤不會自動丟出。
- 本地清單若要一起更新，用上一篇的 filter 拿掉那個 id。請求失敗時不要先改清單。

{% note success %}
**換你試試：**
改刪 id 2。成功時訊息仍是已刪除加上狀態碼。
{% endnote %}

<details>
<summary>參考答案</summary>

只改路徑上的 id。方法與成功判斷不變。

```diff 03-react/src/demos/59-delete.jsx
 // ...
-        'https://jsonplaceholder.typicode.com/posts/1',
+        'https://jsonplaceholder.typicode.com/posts/2',
 // ...
```

</details>

### API 模組

前面的 GET、POST、PUT、DELETE，以及 AbortController，都在元件裡直接 fetch。每個元件自己組網址、標頭、檢查 ok，重複又重。這一節先把請求收成模組函式，再用同一模組做完整 CRUD 示範。

#### API 模組函式

這一小節只看模組本身。五個匯出函式，加上不匯出的讀 JSON 函式，把網址、標頭與成功檢查收在一起。

**一覽**

- `readJson` 不匯出，回應成功時讀 JSON，失敗時丟出狀態碼。
- `getItems` 讀本機清單。可選參數就是前面 AbortController 節的 `controller.signal`，交給 fetch 當中止用。
- `getItem` 依 id 讀遠端單筆。
- `createItem` 新增一筆。
- `updateItem` 替換指定 id 的整筆。
- `deleteItem` 刪除指定 id，成功時回傳 true。

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

- 清單讀本機的 `/data/items.json`。單筆、新增、更新、刪除的基底是 itemsUrl，指到 jsonplaceholder 的 /posts。
- readJson 集中檢查回應是否 ok。失敗時丟出的是狀態碼。
- getItems 的可選參數可以不傳。有傳入 `controller.signal` 時，清除時才取消得了這一次讀取。
- deleteItem 成功時不讀 JSON。刪除回應常常是空的，硬讀會失敗。
- 函式名叫 item，遠端路徑仍是 posts。名字跟著清單資料，路徑跟著這個練習服務的文章介面。

#### 示範完整 CRUD

元件從模組引入函式。進畫面用 useEffect 更新清單。新增、更新、刪除在事件裡呼叫，成功後改本機狀態。示範是旅遊卡片，左邊清單、右邊共用同一份新增與編輯表單。程式裡的註解標出處理順序。

**觀念**

模組負責請求。元件負責何時呼叫，以及畫面上的狀態。左邊卡片讀的是元件裡的清單狀態，不是每次再打伺服器。練習服務新增、更新、刪除會回成功，但不會把資料留在遠端；重新整理又會從本機檔案讀回原來的三筆。所以請求成功之後，要在這份狀態裡接上新列、換掉同一個編號，或拿掉刪掉的那一筆，左邊卡片才會立刻對上。

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
        const created = await createItem(fields);
        setItems((current) => [...current, { ...fields, id: created.id }]);
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

畫面先顯示「載入中」。完成後左邊上方是「新增」，下面三張卡片：台北城市漫遊、台北、3 天、12800；花蓮山海三日、花蓮、3 天、15900；京都紅葉散步、京都、5 天、42800。每張有「編輯」和「刪除」。右邊標題是「新增」，四個欄位是空的。按「編輯」後右邊改成「編輯」並填入那一筆；送出或刪除成功後左邊跟著變，表單回到新增。重新整理又是原來的三筆。

**解析**

- 載入放在 useEffect。這裡建立 AbortController，把 `controller.signal` 交給 getItems，清除時取消這一次。名稱是 AbortError 就返回，不要改成讀取失敗。
- editingId 沒有值時是新增，有值則是正在編的那一筆。兩種送出共用同一份表單。
- 新增、更新、刪除都在事件裡呼叫，不放進 effect。
- 要等請求成功才改清單。新增接上回應的編號，更新換掉同一個 id，刪除拿掉那個 id。失敗時清單維持原樣。

{% note success %}
**換你試試：**
按「新增」清表單時，標題從空字串改成「新行程」。地點、天數、價格仍是空的。送出前輸入框裡應看得到「新行程」。
{% endnote %}

<details>
<summary>參考答案</summary>

只改新增模式那份空白表單的標題。`emptyForm` 也是一進畫面時的表單，所以還沒按「新增」也會看到「新行程」。按鈕、編輯與清單更新維持原樣。

```diff 03-react/src/demos/60-items-demo.jsx
 // ...
-const emptyForm = { title: '', place: '', days: '', price: '' };
+const emptyForm = { title: '新行程', place: '', days: '', price: '' };
 // ...
```

</details>

## 選讀：不需要 effect 的情況

這一節是選讀。很多「畫面要跟著資料變」其實在渲染時就算得出來，不必等 effect 再設定一次狀態。送出才要打的網路，放在事件裡。

- 渲染時算得出來的值，用常數接住。不要先放進狀態，再在 effect 裡抄一份。
- 使用者按下才要發生的請求，放在事件處理函式。effect 是給「畫完就要跟外部同步」的事。

### 渲染時計算

總價是單價乘上人數。這一則故意把算出來的總價放進狀態，再在 effect 裡抄一次。

**觀念**

`count` 從 2 開始，`price` 是 12800。兩個來源都在這一次渲染裡，`total` 可以直接相乘。下面這支卻把 `total` 放進 `useState`，effect 依賴 `[count]`，在裡面 `setTotal(price * count)`。

人數一變，React 先用舊的總價畫一次，效果跑完才把新總價寫回去，於是多一次渲染。在 effect 裡同步設定狀態，會被 `react-hooks/set-state-in-effect` 標成錯誤。算出來的值留在渲染，不要等效果再設定一次。

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

打開是「2 人，共 25600」，因為狀態的初值就是 `price * count`。按「加一人」，人數變成 3，總價最後會到 38400。更新仍會發生，但是 effect 同步進來的：人數改變的那一輪，畫面上的總價還是上一輪的 25600，效果裡的 `setTotal` 才排出下一輪。

**解析**

- `total` 有自己的 `useState` 和 `setTotal`。它不是渲染時宣告的常數。
- effect 在 `[count]` 變了之後跑，setup 裡同步設定總價。渲染和效果多接一次。
- 單價是常數。會變的只有人數。總價完全由這兩個值決定，不需要另存一份。
- `react-hooks/set-state-in-effect` 會標出 effect 裡的 `setTotal`。清單的 `filter` 也一樣，寫在渲染裡，不寫在 effect 裡。

拿掉 `total` 的狀態和這支 effect。在渲染時寫 `const total = price * count`。人數一變，元件再跑，總價就是新的。沒有 effect，就沒有依賴，也不會在效果裡設定狀態。`useEffect` 的引入一起拿掉。

{% note success %}
**換你試試：**
拿掉 `total` 的狀態和同步它的 effect。在渲染時寫 `const total = price * count`。兩人時應顯示共 25600。不要為總價留 `useEffect`。
{% endnote %}

<details>
<summary>參考答案</summary>

總價改在渲染時相乘。狀態只留人數。

```diff 03-react/src/demos/61-derive.jsx
 // ...
-import { useEffect, useState } from 'react';
+import { useState } from 'react';
 // ...
-  const [total, setTotal] = useState(price * count);
-
-  useEffect(() => {
-    setTotal(price * count);
-  }, [count]);
+  const total = price * count;
 // ...
```

</details>

### 事件裡的請求

按下才讀的請求，原因是點擊。這一則故意只把旗標設成 true，fetch 卻寫在 effect 裡。

**觀念**

`armed` 從 false 開始。按鈕只呼叫 `setArmed(true)`。effect 依賴 `[armed]`，旗標為 true 才去讀 `posts/5`，並把狀態與文章寫進 state。請求的原因是按鈕，卻繞去跟畫面同步的那條路。

`armed` 變成 true 之後就留在那裡。想再讀一次，還得先改回 false 再改回 true，中間多一次沒有畫面意義的渲染。開發時嚴格模式會在 effect 要跑的那次先執行、再清除、再執行。這一則沒有清除函式，旗標打開後可能把同一篇讀兩次。進畫面就要有的清單才用 effect，見「載入與錯誤」。按下要發生的事，直接寫在事件函式裡。

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

按下之前，狀態是「尚未按下」，沒有文章，也還沒有請求。按下之後 effect 才送出，狀態變成「讀取中」，成功則是「完成」，並出現 `#5` 與標題。失敗時狀態是「讀取失敗」，不留下半篇資料。再按一次，狀態停在「完成」：`armed` 已經是 true，依賴沒變，effect 不重跑。

**解析**

- 進畫面時 `armed` 是 false，effect 直接 return。沒按就不會打網路。錯在按下之後的那條路。
- 事件只改旗標。fetch 寫在 effect，和進畫面就要讀的寫法混在一起。GET 的路徑、狀態碼與 JSON 欄位見「GET」。
- 再讀一次要先把 `armed` 設回 false。那一次渲染沒有對應的使用者動作。
- 嚴格模式會把剛打開的效果多跑一次。事件函式可以是 async，元件函式本身保持同步。

把 fetch 搬進按鈕的處理函式，拿掉 `armed` 和這支 effect。路徑仍是 `posts/5`，按鈕仍是「按一下讀第五篇」。按一次就呼叫一次。再按就再讀一次，不靠旗標從 false 變成 true。這一則不留 effect。

{% note success %}
**換你試試：**
把讀取搬進按鈕的處理函式。拿掉 `armed` 和這支 effect。按鈕仍是「按一下讀第五篇」，仍讀 `posts/5`。改完不該再為這次請求留 effect。
{% endnote %}

<details>
<summary>參考答案</summary>

觸發改回事件。讀取的 try、路徑與按鈕文字不動。

```diff 03-react/src/demos/62-click.jsx
 // ...
-import { useEffect, useState } from 'react';
+import { useState } from 'react';
 // ...
-  const [armed, setArmed] = useState(false);
   const [status, setStatus] = useState('尚未按下');
   const [post, setPost] = useState(null);
 
-  useEffect(() => {
-    if (!armed) return;
-    const load = async () => {
-      setStatus('讀取中');
-      setPost(null);
-      try {
-        const response = await fetch(
-          'https://jsonplaceholder.typicode.com/posts/5',
-        );
-        if (!response.ok) throw new Error(String(response.status));
-        setPost(await response.json());
-        setStatus('完成');
-      } catch {
-        setPost(null);
-        setStatus('讀取失敗');
-      }
-    };
-    load();
-  }, [armed]);
+  const onLoad = async () => {
+    setStatus('讀取中');
+    setPost(null);
+    try {
+      const response = await fetch(
+        'https://jsonplaceholder.typicode.com/posts/5',
+      );
+      if (!response.ok) throw new Error(String(response.status));
+      setPost(await response.json());
+      setStatus('完成');
+    } catch {
+      setPost(null);
+      setStatus('讀取失敗');
+    }
+  };
 // ...
-        onClick={() => setArmed(true)}
+        onClick={onLoad}
 // ...
```

</details>

## 選讀：自訂 Hook

重複的狀態與讀取流程可以收成函式，名稱用 `use` 開頭。它裡面可以呼叫別的 Hooks，所以自己也要遵守 Hooks 規則：只在元件或其他 Hook 的最上層呼叫。自訂 Hook 可以傳入引數，讓同一套邏輯走出不同結果；會變的引數要放進內部 effect 的依賴。

- 自訂 Hook 是普通函式，不是元件。它不回傳畫面，回傳狀態與動作。
- 元件負責把回傳值畫出來。讀取與切換的細節留在 Hook 裡。

### 抽出讀取

`useLocalItems` 把載入、失敗與取消收進去，回傳狀態與清單。示範元件只負責三種畫面。

**觀念**

Hook 寫在 `src/hooks/useLocalItems.js`。它的依賴是空陣列，所以只在使用它的元件第一次畫完後讀取。回傳的物件每一輪都是新的，呼叫端不要把整個物件放進別的 effect 依賴。

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

畫面仍是三筆資料。示範檔裡沒有 `fetch`，也沒有 `useEffect`。

**解析**

- 名稱以 `use` 開頭，檢查才會把裡面的 Hooks 當 Hooks 看。
- Hook 不是元件，所以這個檔不要回傳 JSX。
- 元件可以多處呼叫它。每一處有自己的狀態，不會自動共用。
- 要共用同一份清單時，用後面的 context，不是多呼叫幾次這個 Hook。

{% note success %}
**換你試試：**
清單每一列只留名稱，價格拿掉。Hook 的回傳不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

畫面怎麼畫是元件的事。讀取仍在 Hook 裡。

```diff 03-react/src/demos/63-hook.jsx
 // ...
-        <li key={item.id}>
-          {item.title} {item.price}
-        </li>
+        <li key={item.id}>{item.title}</li>
 // ...
```

</details>

### 傳入引數

自訂 Hook 是普通函式，呼叫時可以傳引數。不同的初始值會走出不同的起始畫面。

**觀念**

`useToggle(initialOpen)` 用引數決定一開始是開還是關，並回傳目前狀態與切換函式。兩個呼叫各傳不同的初始值，左側從開開始，右側從關開始。

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

```jsx 03-react/src/demos/63b-toggle.jsx
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

一開始左側顯示「開」、右側顯示「關」。各自按切換，只改自己那一側。

**解析**

- `initialOpen` 只在第一次建立狀態時用到，之後改 props 不會自動改回狀態。
- 兩個 `Panel` 各呼叫一次 Hook，所以各有一份 `open`。
- 引數可以是布林、字串或數字。重點是同一套邏輯能依引數走出不同起點。

{% note success %}
**換你試試：**
把右側的初始值改成 `true`。重新整理後兩側都應從「開」開始。
{% endnote %}

<details>
<summary>參考答案</summary>

只改呼叫時傳入的引數。Hook 本體不用動。

```diff 03-react/src/demos/63b-toggle.jsx
 // ...
       <Panel label="左側" initialOpen={true} />
-      <Panel label="右側" initialOpen={false} />
+      <Panel label="右側" initialOpen={true} />
 // ...
```

</details>

### 引數放進依賴

若 Hook 內部的 effect 會讀到引數，而且引數之後還會變，就要把該引數寫進依賴陣列。值變了，先取消上一次讀取，再用新的值重跑。

**觀念**

`useFilteredItems(minPrice)` 讀完整清單後，留下 `price >= minPrice` 的項目。`minPrice` 放在依賴裡。父層用按鈕改門檻時，清單會跟著變。樣本價格是 12800、15900、42800，所以 15000 起剩兩筆，20000 起剩一筆。

```js 03-react/src/hooks/useFilteredItems.js
import { useEffect, useState } from 'react';
import { getItems } from '../api/fake-api.js';

export function useFilteredItems(minPrice) {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setStatus('loading');
        const list = await getItems(controller.signal);
        setItems(list.filter((item) => item.price >= minPrice));
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setItems([]);
        setStatus('error');
      }
    };
    load();
    return () => controller.abort();
  }, [minPrice]);

  return { status, items };
}
```

```jsx 03-react/src/demos/64b-filter.jsx
import { useState } from 'react';
import { useFilteredItems } from '../hooks/useFilteredItems.js';

export default function FilterHookDemo() {
  const [minPrice, setMinPrice] = useState(15000);
  const { status, items } = useFilteredItems(minPrice);

  return (
    <section className="grid gap-3">
      <p>最低價格 {minPrice}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setMinPrice(0)}
        >
          全部
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setMinPrice(15000)}
        >
          15000 起
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setMinPrice(20000)}
        >
          20000 起
        </button>
      </div>
      {status === 'loading' && <p>載入中</p>}
      {status === 'error' && <p>讀取失敗</p>}
      {status === 'ready' && (
        <ul className="grid gap-2">
          {items.map((item) => (
            <li key={item.id}>
              {item.title} {item.price}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

一開始是 15000 起，畫面上兩筆。按「20000 起」會先短暫載入，再剩京都那一筆。

**解析**

- effect 讀到 `minPrice`，依賴就要寫 `[minPrice]`。少寫時門檻變了清單不會重算。
- 清除函式呼叫 `controller.abort()`，並把 `controller.signal` 交給 `getItems` 當取消用參數，避免舊的回應蓋掉新的一次。
- 過濾在資料回來之後做。這一則先求看清楚引數與依賴的關係。
- 原本的 `useLocalItems` 仍然無參數，63 與 64 不用改。

{% note success %}
**換你試試：**
把起始門檻改成 `20000`。一進來就應只看到一筆。
{% endnote %}

<details>
<summary>參考答案</summary>

只改父層的初始狀態。Hook 與按鈕邏輯不變。

```diff 03-react/src/demos/64b-filter.jsx
 // ...
-  const [minPrice, setMinPrice] = useState(15000);
+  const [minPrice, setMinPrice] = useState(20000);
 // ...
```

</details>

### 各呼叫各一份狀態

同一個 Hook 可以被兩顆元件各呼叫一次。它們會各打一次請求，各有各的載入狀態。這不是缺點，只是你要知道它沒有自動變成全域資料。

**觀念**

`TwiceDemo` 裡放兩個小元件，各自呼叫 `useLocalItems`。

網路分頁會看到兩次 `items.json`。若你希望全頁只讀一次，把讀取留在共同父層，再用 props 傳下去。

```jsx 03-react/src/demos/64-twice.jsx
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

兩行都會變成「台北城市漫遊、花蓮山海三日、京都紅葉散步」。它們不是同一份狀態。

**解析**

- 每呼叫一次 Hook，就有一組自己的 `useState`。
- 父層沒有把清單傳下去。子層自己讀。
- 兩行字一樣，是因為檔案內容一樣，不是因為狀態共用。
- 真的要共用時，改成父層呼叫一次，再把 `items` 傳給兩顆子元件。

{% note success %}
**換你試試：**
拿掉第二個 `NameList`。畫面應只剩一行名稱，網路也只該剩下一輪讀取。
{% endnote %}

<details>
<summary>參考答案</summary>

少一次呼叫，就少一組狀態與一次請求。

```diff 03-react/src/demos/64-twice.jsx
 // ...
       <NameList />
-      <NameList />
 // ...
```

</details>

# 共用狀態

同一份會變的資料若有兩個以上的元件要讀，就把狀態放到它們的共同父層，這叫做狀態提升。子層用 props 接收值，用函式回報變更。兄弟之間不互相傳資料。中間還隔許多層、而那些層自己不用這份資料時，再用 Context，避免一層層拋丟 props。

- 父層擁有狀態與設定函式。
- 子層接收現在的值，以及一個 `onChange` 之類的函式。

## 父層持有

輸入框在子層，文字狀態在父層。子層每打一個字就呼叫父層傳來的函式。父層是唯一呼叫設定函式的地方，所以資料來源只有一處。

**觀念**

`Editor` 不知道別的地方還會不會用這段文字。它只負責受控輸入。

`LiftDemo` 把 `draft` 畫在輸入框下面，證明值在父層。

```jsx 03-react/src/demos/65-lift.jsx
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

輸入框一開始是台北城市漫遊。再打一個字，下面那行跟著變。

**解析**

- `value` 與 `onChange` 都來自父層。

子層沒有自己的 `useState`。
- 把 `setDraft` 直接當 `onChange` 可以，因為它接受下一個字串。
- 子層若自己再用一個狀態抄一份，兩份會不一致。
- 只有這顆輸入框要用的暫存，不必提升。一提升，父層的渲染範圍就變大。

{% note success %}
**換你試試：**
起始文字改成花蓮山海三日。父層那一行與輸入框都要是花蓮山海三日。
{% endnote %}

<details>
<summary>參考答案</summary>

起始值只改父層。子層仍讀 props。

```diff 03-react/src/demos/65-lift.jsx
 // ...
-  const [draft, setDraft] = useState('台北城市漫遊');
+  const [draft, setDraft] = useState('花蓮山海三日');
 // ...
```

</details>

## 兄弟元件

兩個子元件都要看到同一份選取時，狀態放在父層。一個負責選，一個負責顯示。它們不互相 import。

**觀念**

`Picker` 回報名稱。`Summary` 只讀現在的名稱。

父層把 `picked` 與 `setPicked` 分下去。選花蓮山海三日的時候，摘要立刻變成花蓮山海三日，因為它們讀的是同一次渲染的狀態。

```jsx 03-react/src/demos/66-siblings.jsx
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

按下花蓮山海三日之後，摘要是「目前 花蓮山海三日」。

**解析**

- `Picker` 沒有收到 `picked`。它不需要知道現在是誰，只負責回報。
- `Summary` 沒有設定函式。它不能自己改選取。
- 兄弟之間沒有 props 可傳。要共享只能經由父層。
- 父層是這一份選取的唯一來源。摘要不對時，回到 `picked` 看。

{% note success %}
**換你試試：**
再加一顆按鈕回報京都紅葉散步。摘要要能顯示京都紅葉散步。`Summary` 不用改。
{% endnote %}

<details>
<summary>參考答案</summary>

新的選項仍呼叫同一個 `onPick`。摘要只讀父層的狀態。

```jsx 03-react/src/demos/66-siblings.jsx
import { useState } from 'react';

function Picker({ onPick }) {
  return (
    <div className="flex gap-2">
      <button type="button" className="rounded bg-stone-100 px-3 py-1" onClick={() => onPick('台北城市漫遊')}>
        台北城市漫遊
      </button>
      <button type="button" className="rounded bg-stone-100 px-3 py-1" onClick={() => onPick('花蓮山海三日')}>
        花蓮山海三日
      </button>
      <button type="button" className="rounded bg-stone-100 px-3 py-1" onClick={() => onPick('京都紅葉散步')}>
        京都紅葉散步
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

</details>

## useContext

狀態提升之後，資料還是靠 props 往下傳。若中間還隔著好幾層元件，而那些中間層自己根本不用這份資料，每一層卻都要在參數裡多寫幾個欄位再往下拋，改一處就要改一路。這種情況叫做屬性鑽孔。Context 不是另一種狀態，只是讓真正要讀的那一層直接取得上層提供的值，中間層不必再轉手。

### 層層傳遞的問題

主題狀態在最外層，真正顯示與切換的卻是最內層的 `Banner`。中間的 `Layout` 與 `Panel` 自己不用主題，卻仍要接收再往下傳。

**觀念**

`theme` 與 `onThemeChange` 經過兩層中間元件。每一層的函式簽名都膨脹，之後若再多一層，整條鏈都要再改一次。

```jsx 03-react/src/demos/66b-drill.jsx
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

一開始是「主題 淺色」。按下之後變成「主題 深色」。`Layout` 與 `Panel` 的參數裡都有主題，但 JSX 裡沒有用到。

**解析**

- 狀態仍在最外層的 `DrillDemo`。來源只有一處，這一點與狀態提升相同。
- `Layout` 與 `Panel` 只是轉手。它們的參數簽名卻跟著主題一起膨脹。
- 若之後再包一層外殼，新的那一層也要再寫一次 `theme` 與 `onThemeChange`。
- 只有一層父子時，直接用 props 即可。問題出在中間很多層都不關心這份資料。

{% note success %}
**換你試試：**
在 `Banner` 再加一顆按鈕，把主題設回淺色。中間層的參數不用改。
{% endnote %}

<details>
<summary>參考答案</summary>

設定函式已經傳到最內層。多一顆按鈕只改 `Banner`。

```diff 03-react/src/demos/66b-drill.jsx
 // ...
       <button
         type="button"
         className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
         onClick={() => onThemeChange('深色')}
       >
         改成深色
       </button>
+      <button
+        type="button"
+        className="w-fit rounded bg-stone-200 px-3 py-1"
+        onClick={() => onThemeChange('淺色')}
+      >
+        改回淺色
+      </button>
 // ...
```

</details>

### 用 Context 改善

同一棵樹改成 Context：外層用 Provider 提供主題，內層用 `useContext` 讀取。中間的 `Layout` 與 `Panel` 不再接收主題相關的 props。同一檔裡把建立、讀取與 Provider 寫在一起也能跑；元件各自成檔時，通道要放到外面的模組，下一節說明為什麼只能建一次。

**觀念**

呼叫分成建立通道、讀值，以及把值放上樹：

```jsx
const SomeContext = createContext(defaultValue);
const value = useContext(SomeContext);
```

```jsx
<SomeContext.Provider value={value}>…</SomeContext.Provider>
```

對上主題字串，三件事接在一起會長這樣。這段是單檔暖身，練習檔裡的完整示範拆在後面幾個檔案：

```jsx
const ThemeContext = createContext('淺色');

function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}

export default function ThemeApp() {
  return (
    <ThemeContext.Provider value="深色">
      <Banner />
    </ThemeContext.Provider>
  );
}
```

`createContext` 建立通道。括號裡的 `'淺色'` 是 defaultValue：樹上沒有 Provider 時，`useContext` 拿到這個預設值。`ThemeContext.Provider` 放在共同父層，`value` 是這一輪要分享的資料。`Banner` 裡的 `useContext(ThemeContext)` 讀最近的那一層 Provider。

完整示範把主題放在狀態裡。通道在 `context/ThemeContext.js` 只建一次，`Banner` 引入那一份再讀值，`Panel` 與 `Layout` 只負責外框，狀態、按鈕與 Provider 留在 `67-context.jsx`。

- `03-react/src/context/ThemeContext.js`
- `03-react/src/demos/theme/Banner.jsx`
- `03-react/src/demos/theme/Panel.jsx`
- `03-react/src/demos/theme/Layout.jsx`
- `03-react/src/demos/67-context.jsx`

```js 03-react/src/context/ThemeContext.js
import { createContext } from 'react';

export const ThemeContext = createContext('淺色');
```

```jsx 03-react/src/demos/theme/Banner.jsx
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.js';

export default function Banner() {
  const theme = useContext(ThemeContext);
  return <p>主題 {theme}</p>;
}
```

```jsx 03-react/src/demos/theme/Panel.jsx
import Banner from './Banner.jsx';

export default function Panel() {
  return (
    <div className="rounded border border-dashed border-stone-300 p-3">
      <Banner />
    </div>
  );
}
```

```jsx 03-react/src/demos/theme/Layout.jsx
import Panel from './Panel.jsx';

export default function Layout() {
  return (
    <div className="rounded border border-stone-200 p-3">
      <Panel />
    </div>
  );
}
```

```jsx 03-react/src/demos/67-context.jsx
import { useState } from 'react';
import { ThemeContext } from '../context/ThemeContext.js';
import Layout from './theme/Layout.jsx';

export default function ContextDemo() {
  const [theme, setTheme] = useState('淺色');

  return (
    <ThemeContext.Provider value={theme}>
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
    </ThemeContext.Provider>
  );
}
```

按下之後，實線框裡的虛線框文字變成「主題 深色」。`Layout` 與 `Panel` 的參數裡沒有主題。

**解析**

- Provider 寫在 `67-context.jsx`，`value` 是主題狀態那個字串，這一則不必包成物件。
- `Banner` 從 `context/ThemeContext.js` 引入同一份 `ThemeContext`，再在元件最上層呼叫 `useContext`，不寫在條件裡。
- `Layout` 與 `Panel` 不接收主題，也不引入 context，只畫實線框與虛線框。中間層不轉 props。
- context 的值變了，讀它的 `Banner` 會再渲染。不要把一個每次渲染都新建、內容卻相同的物件毫無必要地當 value，否則讀的人每次都會再跑。
- 只有一層父子時，直接用 props。context 是為了中間很多層都不關心這份資料。

{% note success %}
**換你試試：**
在 `67-context.jsx` 再加一個按鈕，把主題設回淺色。Banner 要跟著回去。按鈕留在這一檔。
{% endnote %}

<details>
<summary>參考答案</summary>

兩顆按鈕都設定同一份狀態。Provider 的 value 仍是那個狀態。

```diff 03-react/src/demos/67-context.jsx
 // ...
         </button>
+        <button
+          type="button"
+          className="w-fit rounded bg-stone-200 px-3 py-1"
+          onClick={() => setTheme('淺色')}
+        >
+          改回淺色
+        </button>
         <Layout />
 // ...
```

</details>

### 拆成多個檔案

元件各自一個檔案時，`createContext` 必須只建一次。這個函式每呼叫一次就做出一個新的 context 物件。Provider 與 `useContext` 只有拿到同一個物件，才算走同一條通道。

**觀念**

要讀值或要提供值的檔案，都從 `ThemeContext.js` 引入那一個匯出。`Banner` 在 `demos/theme`，相對路徑往上兩層。`67-context.jsx` 在 `demos`，相對路徑往上一層。路徑不同，引入的物件相同。

若某個元件檔自己再寫一次 `createContext`，就算變數名稱也叫 `ThemeContext`，那也是另一條通道。外層 Provider 包的是 67 引入的那一份，內層 `useContext` 讀的是元件檔自己建的那一份，按鈕改的狀態就到不了文字。

上面五個檔案的職責：

- `03-react/src/context/ThemeContext.js` 只呼叫一次 `createContext` 並匯出。
- `03-react/src/demos/theme/Banner.jsx` 引入它並讀值。
- `03-react/src/demos/theme/Panel.jsx` 畫虛線框，內嵌 `Banner`。
- `03-react/src/demos/theme/Layout.jsx` 畫實線框，內嵌 `Panel`。
- `03-react/src/demos/67-context.jsx` 持有狀態，用同一份物件的 Provider 包住 `Layout`。

**解析**

- 各檔 import 的 `ThemeContext` 是同一個物件。對得上的是物件本身，不是變數名稱像不像。
- `context` 資料夾與 `hooks`、`api` 放在同一層，把可以共用的通道收成模組。元件檔只留畫面與狀態。
- `Layout` 與 `Panel` 沒有 import `ThemeContext`。它們不讀值，也不提供值，所以不需要這條通道。
- `67-context.jsx` 的 Provider 與 `Banner` 的 `useContext` 對上這同一個物件，按下按鈕才會改到外框裡的文字。

{% note success %}
**換你試試：**
在 `Banner` 的主題那一行下面，再顯示一行固定文字「這一層才讀主題」。`Layout` 與 `Panel` 保持不引入 context。
{% endnote %}

<details>
<summary>參考答案</summary>

多的那一行只加在讀值的 `Banner`。外框元件仍然不碰 `ThemeContext`。

```diff 03-react/src/demos/theme/Banner.jsx
 // ...
-  return <p>主題 {theme}</p>;
+  return (
+    <>
+      <p>主題 {theme}</p>
+      <p>這一層才讀主題</p>
+    </>
+  );
 // ...
```

</details>

### 預設值

沒有包到 Provider 時，`useContext` 得到建立 context 時的那個預設值。這一則直接用上面的 `Banner`，故意不包 Provider，讓你看見 `ThemeContext.js` 裡的預設字串。

**觀念**

預設寫在 `ThemeContext.js`，目前是淺色。`Banner` 照樣呼叫 `useContext`。因為樹上沒有 Provider，畫面就是淺色，按鈕也不存在。

預設值適合沒包到也不該爆炸的顯示。若忘了包是程式錯誤，後面搭配 reducer 的示範會改成直接丟出錯誤，比較好找。

```jsx 03-react/src/demos/68-default.jsx
import Banner from './theme/Banner.jsx';

export default function DefaultDemo() {
  return <Banner />;
}
```

畫面是「主題 淺色」。Components 分頁裡看不到 Provider。

**解析**

- 預設值只在找不到 Provider 時使用。有 Provider 時以 value 為準，所以 67 畫面上的主題仍由那一則的狀態決定。
- 這一則沒有狀態，也沒有按鈕。預設值不會因為你在別則按了什麼而改變。
- `Banner` 與 67 引入的是同一份 `ThemeContext`。這一則樹上沒有 Provider，所以讀到建立時的預設值「淺色」。
- 預設值不是會自己更新的狀態。它只是這條通道在沒有 Provider 時的後援。

{% note success %}
**換你試試：**
把 `context/ThemeContext.js` 建立 context 的預設字串改成深色。68 的畫面應變成主題深色，這一則仍然不要加 Provider。
{% endnote %}

<details>
<summary>參考答案</summary>

改的是共用模組上的預設值。68 的元件樹上仍沒有 Provider。67 有 Provider，那一則的畫面不靠這個預設字串。

```diff 03-react/src/context/ThemeContext.js
 // ...
-export const ThemeContext = createContext('淺色');
+export const ThemeContext = createContext('深色');
 // ...
```

</details>

## 選讀：useRef

`useRef` 記住一個可變的盒子，改 `current` 不會引發渲染。它適合點名某個 DOM 節點，或記住不需要畫上畫面的值，例如計時器的 id。呼叫寫成這樣：

```jsx
const ref = useRef(initialValue);
```

盒子在 `ref.current`。下面用數字當起始值，按一下只改盒子：

```jsx
function ClickBox() {
  const clicks = useRef(0);

  const onCount = () => {
    clicks.current += 1;
  };

  return (
    <button type="button" onClick={onCount}>
      只累計
    </button>
  );
}
```

`initialValue` 是盒子一開始的內容，這裡是 `0`。之後讀寫都走 `clicks.current`。接到 DOM 節點並呼叫 `focus` 的寫法在「聚焦輸入框」；把次數抄上畫面的對照在「不觸發渲染的值」。

- ref 的 `current` 可以改。React 不會因為你改了它就再渲染。
- 要讓畫面變，仍用狀態。不要把該顯示的數字只放在 ref。

### 聚焦輸入框

按下按鈕時，讓輸入框聚焦。節點存在 ref 裡，不存在狀態裡。

**觀念**

`ref={inputRef}` 在提交之後，把那個 DOM 節點放進 `inputRef.current`。

按鈕的處理函式呼叫 `focus`。聚焦不會改變 React 的狀態，所以這一則沒有 `useState`。

不要在渲染過程中讀寫 `current` 來決定要回傳哪一棵樹。那會讓渲染不純。

```jsx 03-react/src/demos/69-ref.jsx
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

按下聚焦，游標進到輸入框。畫面上的文字不會因為這一下而重畫。

**解析**

- `useRef(null)` 的起始值是 null。第一幀還沒提交，節點還不在。
- `?.` 避免節點還沒接上時呼叫 focus 而丟出錯誤。
- 把輸入的文字放進 ref 而不是狀態，畫面下方就不會跟著打字更新。
- 函式元件直接把 ref 當成屬性。不需要舊的 `forwardRef`。

{% note info %}
**以前的寫法**
要讓父層拿到子元件裡的節點，舊文件會包 `forwardRef`。現在把 `ref` 當成一般 props 即可。
{% endnote %}

{% note success %}
**換你試試：**
再加一顆按鈕，按下把輸入框的值清空。用 `inputRef.current.value = ''`，不要加狀態。
{% endnote %}

<details>
<summary>參考答案</summary>

清空 DOM 的值不會通知 React。這一則本來就沒有受控，所以這樣做看得到格子被清掉。

```jsx 03-react/src/demos/69-ref.jsx
import { useRef } from 'react';

export default function RefDemo() {
  const inputRef = useRef(null);

  const onFocus = () => {
    inputRef.current?.focus();
  };

  const onClear = () => {
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section className="grid max-w-sm gap-3">
      <input ref={inputRef} className="rounded border px-2 py-1" placeholder="名稱" />
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={onFocus}
        >
          聚焦
        </button>
        <button type="button" className="rounded bg-stone-200 px-3 py-1" onClick={onClear}>
          清空
        </button>
      </div>
    </section>
  );
}
```

</details>

### 不觸發渲染的值

ref 可以累計次數，但改 `current` 不會重畫。要把次數顯示出來，還是得另有一份狀態。

**觀念**

每按一次，ref 加一，並印到 Console。畫面的數字是 `shown`，只有按下「顯示」才把 ref 的值抄進狀態。只按計數時，畫面不變，Console 會增加。

這用來分辨「要記住」與「要畫出來」。要畫出來的值用狀態。

```jsx 03-react/src/demos/70-ref-count.jsx
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

- `clicks.current += 1` 不會觸發渲染。
- `setShown` 才會。它抄的是按下當下的 ref。
- 不要在渲染過程中寫 `clicks.current += 1`。那會讓嚴格模式的兩次渲染把次數加兩次。
- 計時器 id 也可以放在 ref。這一則用次數讓你在 Console 直接看得到。

{% note success %}
**換你試試：**
只累計按兩次再按顯示。畫面應是 2，Console 是 1 與 2。
{% endnote %}

<details>
<summary>參考答案</summary>

程式不用改。ref 每次加一，顯示只是把當下的值放進狀態。

按兩次只累計，Console 依序是 1 與 2。按下顯示之後，畫面上的次數變成 2。

</details>

## 選讀：useReducer

更新邏輯變多、而且下一個狀態取決於上一筆時，可以把分支收進 reducer。`useReducer` 回傳現在的狀態，以及一個 `dispatch`。呼叫寫成這樣：

```jsx
const [state, dispatch] = useReducer(reducer, initialArg);
```

reducer 依 `action.type` 回傳下一筆，按鈕用 `dispatch` 送出動作：

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <button type="button" onClick={() => dispatch({ type: 'add' })}>
      加一 {count}
    </button>
  );
}
```

`reducer` 是第一個參數，接收上一筆 `state` 與這次的 `action`，回傳下一筆。`initialArg` 是起始狀態，這裡是 `0`，解構出來的名字是 `count`。`dispatch({ type: 'add' })` 送進對應分支；不明的 type 走 `default`，把原狀態還回去。清單的新增、切換與刪除，以及改寫前的 `useState` 對照，在「待辦清單」。

- reducer 是純函式。它接收上一筆狀態與這次的 action，回傳下一筆狀態。
- 它不呼叫 fetch，也不改原陣列。要新陣列就回傳新陣列。

### 待辦清單

先看同一份清單用 `useState` 怎麼寫，再改成 reducer。練習檔先留著狀態的寫法，完成檔才是 reducer。

**觀念**

待辦有 id、標題與是否完成。新增、切換完成、刪除是三種 action。reducer 用 `switch` 決定回傳哪一種新陣列。不明的 type 就把原狀態還回去。

```jsx 03-react/src/demos/71-reducer.jsx
import { useState } from 'react';

export default function ReducerDemo() {
  const [todos, setTodos] = useState([{ id: 1, title: '台北城市漫遊', done: false }]);

  const onAdd = () => {
    setTodos((items) => [
      ...items,
      { id: items.length + 1, title: '待辦' + (items.length + 1), done: false },
    ]);
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
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </section>
  );
}
```

按下新增，清單多出「待辦2」。這是改寫前的寫法。

**解析**

- 這一則只有新增，狀態仍夠用。分支一多，設定函式裡的邏輯會散在各顆按鈕。
- id 用長度加一，只適合這個不會刪除後再新增的起步。完成檔改用時間戳，避免刪掉之後 id 重複。
- `key` 用 id。標題可能重複，不能當 key。
- 下一步不是再加一個 `useState`，而是把轉移寫進 reducer。

{% note success %}
**換你試試：**
完成檔改成 `useReducer`，做出新增、切換完成與刪除。不明的 type 要回傳原狀態。
{% endnote %}

<details>
<summary>參考答案</summary>

三個按鈕都只 `dispatch` 一種 action。陣列的複製留在 reducer，元件不再自己展開。

```jsx 03-react/src/demos/71-reducer.jsx
import { useReducer } from 'react';

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...todos,
        { id: action.id, title: action.title, done: false },
      ];
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

勾選未完成會變成完成，再按一次改回來。刪除拿掉那一列。新增用 `Date.now()` 當 id，避免跟被刪掉的編號撞在一起。

</details>

### 搭配 Context

reducer 的 `dispatch` 與清單若要給深一點的子元件用，把它們放進 context。子元件不用再把 `dispatch` 一層層用 props 傳。

**觀念**

`TodoProvider` 擁有 reducer。`value` 放清單與 dispatch。

`useTodos` 在沒有 Provider 時直接丟出錯誤，避免默默讀到空的預設值還以為一切正常。

清單與新增按鈕分成兩個子元件。它們都呼叫 `useTodos`，所以看到的是同一份待辦。

```jsx 03-react/src/demos/72-provider.jsx
import { createContext, useContext, useReducer } from 'react';

const TodoContext = createContext(null);

const reducer = (todos, action) => {
  switch (action.type) {
    case 'add':
      return [...todos, { id: action.id, title: action.title, done: false }];
    default:
      return todos;
  }
};

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const value = useContext(TodoContext);
  if (!value) throw new Error('缺少 TodoProvider');
  return value;
}

function AddButton() {
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

function TodoList() {
  const { todos } = useTodos();
  return (
    <ul className="mt-3 grid gap-2">
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

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

每按一次新增，清單多一列「新待辦」。按鈕與清單沒有互相傳 props。

**解析**

- Provider 包在兩顆子元件外面。少了這層，`useTodos` 會丟出錯誤。
- `dispatch` 的身份是穩定的，可以放進 context。
- 子元件各自取自己要的欄位。清單元件沒有拿到 dispatch 也可以。
- 這個 context 只服務待辦。主題若是另一份資料，另開一個 context，不要全部塞進同一個物件。

{% note success %}
**換你試試：**
`TodoList` 在沒有待辦時顯示「沒有待辦」。新增後那句話要消失。
{% endnote %}

<details>
<summary>參考答案</summary>

空狀態看的是 context 裡的陣列長度。按鈕不用知道這句話。

```diff 03-react/src/demos/72-provider.jsx
 // ...
   const { todos } = useTodos();
+  if (todos.length === 0) return <p className="mt-3">沒有待辦</p>;
   return (
 // ...
```

</details>

## 選讀：表單 Actions

React 19 可以把送出函式交給 `<form action>`。這次送出被當成一筆動作，進行中的狀態可以由 Hook 讀到。

上一篇的 `onSubmit` 加 `preventDefault` 仍然可用。這一節是另一種寫法。

- `action` 收到 `FormData`，用欄位的 name 取值。瀏覽器不會整頁重載。
- `useActionState` 把上一次的結果、這次的動作與是否進行中一起交回來。
- `useOptimistic` 在動作還沒結束時，先把預期的結果畫出來。結束或失敗後，畫面回到實際的狀態。

{% mermaid graph LR %}
  formNode["form action"] --> pendingNode["進行中"]
  pendingNode --> doneNode["用結果更新畫面"]
  style formNode fill:#e3f2fd
  style pendingNode fill:#fff3e0
  style doneNode fill:#e8f5e9
{% endmermaid %}

### form action

表單的 `action` 是一個函式時，React 會把這次送出的 `FormData` 傳進去，並取消整頁導向。

你不必再呼叫 `preventDefault`。

**觀念**

欄位的 `name` 是 `title`。

送出函式用 `formData.get('title')` 讀文字，放進狀態。函式可以是 async。這一則沒有真的打網路，只模擬把標題留下。

```jsx 03-react/src/demos/73-action.jsx
import { useState } from 'react';

export default function ActionDemo() {
  const [title, setTitle] = useState('尚未送出');

  const send = async (formData) => {
    setTitle(String(formData.get('title') || '未填'));
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="標題"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出
      </button>
      <p>{title}</p>
    </form>
  );
}
```

在格子打「台北城市漫遊」再送出，下面一行變成台北城市漫遊。網址不變。

**解析**

- `action={send}` 交給的是函式，不是一個網址字串。
- 讀值用欄位名稱，不靠受控的 `value`。這一則的輸入框是非受控的。
- 送出不會整頁重載，所以狀態留得住。
- 要沿用上一篇的受控物件也可以。兩種寫法不要在同一張表單上各寫一半又互相覆蓋。

{% note success %}
**換你試試：**
再讀一個欄位 `price`，訊息改成標題加上空白與價格。
{% endnote %}

<details>
<summary>參考答案</summary>

兩個 `get` 都來自同一份 FormData。輸入框都要有 name。

```jsx 03-react/src/demos/73-action.jsx
import { useState } from 'react';

export default function ActionDemo() {
  const [title, setTitle] = useState('尚未送出');

  const send = async (formData) => {
    const name = String(formData.get('title') || '未填');
    const price = String(formData.get('price') || '');
    setTitle(name + ' ' + price);
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <input name="title" className="rounded border px-2 py-1" placeholder="標題" />
      <input name="price" className="rounded border px-2 py-1" placeholder="價格" />
      <button type="submit" className="rounded bg-teal-800 px-3 py-1 text-white">
        送出
      </button>
      <p>{title}</p>
    </form>
  );
}
```

</details>

### useActionState

`useActionState` 把動作的回傳值變成狀態。函式的第一個參數是上一次的結果，第二個是這次的 `FormData`。第三個回傳值表示正在送出。

**觀念**

動作等 300 毫秒再回傳標題，模擬慢一點的請求。進行中時按鈕不能再按，文字顯示「送出中」。結束後，畫面換成動作回傳的字串。

不要在渲染時呼叫這個動作。把它交給 `action` 即可。

```jsx 03-react/src/demos/74-action-state.jsx
import { useActionState } from 'react';

const send = async (previous, formData) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const title = String(formData.get('title') || '未填');
  return previous === '尚未送出' ? title : previous + '、' + title;
};

export default function ActionStateDemo() {
  const [message, formAction, isPending] = useActionState(send, '尚未送出');

  return (
    <form action={formAction} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="標題"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-60"
      >
        {isPending ? '送出中' : '送出'}
      </button>
      <p>{message}</p>
    </form>
  );
}
```

第一次送出「台北城市漫遊」，約三分之一秒後訊息變成台北城市漫遊。再送出「花蓮山海三日」，訊息變成「台北城市漫遊、花蓮山海三日」。等待時按鈕是停用的。

**解析**

- 起始狀態是第二個引數「尚未送出」。第一次動作的 `previous` 就是它。
- 回傳值會變成下一次的 `message`。不需要再呼叫 `setState`。
- `isPending` 在動作結束前為真。用它停用按鈕，避免連按兩次。
- `previous` 是上一筆結果，不是輸入框裡的草稿。草稿在 FormData。

{% note success %}
**換你試試：**
動作改成只回傳這一次的標題，不要串上一筆。第二次送出應蓋掉第一筆。
{% endnote %}

<details>
<summary>參考答案</summary>

忽略 `previous`，只回傳這一次讀到的標題。

```diff 03-react/src/demos/74-action-state.jsx
 // ...
-  const title = String(formData.get('title') || '未填');
-  return previous === '尚未送出' ? title : previous + '、' + title;
+  return String(formData.get('title') || '未填');
 // ...
-      <input
-        name="title"
-        className="rounded border px-2 py-1"
-        placeholder="標題"
-      />
+      <input name="title" className="rounded border px-2 py-1" placeholder="標題" />
 // ...
```

`previous` 沒有被讀到，檢查可能警告未使用。把參數改名成 `_previous` 即可，行為不變。

</details>

### useOptimistic

動作還沒回來時，先把預期的名稱畫出來。真正的狀態仍等動作結束才更新。失敗的話，樂觀的那一層會回到實際狀態。

**觀念**

`useOptimistic` 的第一個引數是實際名稱，第二個是「如何把預期值併進現在的畫面」。

送出時先 `setOptimisticName`，再等待，最後才 `setName`。等待的那 300 毫秒，畫面已經是新名稱。

```jsx 03-react/src/demos/75-optimistic.jsx
import { useOptimistic, useState } from 'react';

export default function OptimisticDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  const send = async (formData) => {
    const next = String(formData.get('name') || name);
    setOptimisticName(next);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setName(next);
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <p>目前 {optimisticName}</p>
      <input
        name="name"
        className="rounded border px-2 py-1"
        placeholder="新名稱"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        更新
      </button>
    </form>
  );
}
```

輸入花蓮山海三日並送出，畫面上的「目前」會先變成花蓮山海三日，不必等那 300 毫秒結束才看得到。

**解析**

- 畫面讀 `optimisticName`，不直接讀 `name`。進行中時兩者可能不同。
- 動作結束後 `setName` 更新實際狀態，樂觀值會跟著回到這份實際值。
- 不要只改樂觀值卻永遠不改實際狀態。重新整理或下一次渲染會回到舊名稱。
- 這是預期成功的顯示。真的失敗時，不要呼叫最後的 `setName`，畫面會回到舊的實際名稱。

{% note success %}
**換你試試：**
等待改成 800 毫秒。送出後應仍立刻看到新名稱，只是實際狀態晚一點才跟上。
{% endnote %}

<details>
<summary>參考答案</summary>

只改等待時間。先顯示、後落地的順序不變。

```jsx 03-react/src/demos/75-optimistic.jsx
import { useOptimistic, useState } from 'react';

export default function OptimisticDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  const send = async (formData) => {
    const next = String(formData.get('name') || name);
    setOptimisticName(next);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setName(next);
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <p>目前 {optimisticName}</p>
      <input name="name" className="rounded border px-2 py-1" placeholder="新名稱" />
      <button type="submit" className="rounded bg-teal-800 px-3 py-1 text-white">
        更新
      </button>
    </form>
  );
}
```

</details>

# 本篇重點回顧

- `useEffect(setup, deps);`。setup 在畫面提交之後執行，用來跟計時器、讀取或訂閱對齊，並可以回傳清除函式。清除在下一次 setup 之前執行，元件卸載時也執行。
- 畫面推得出來的值留在渲染。按一次才要做的事放在事件裡。元件函式裡的 log 每次渲染都會印，那是渲染，不是 effect。
- 依賴陣列可以列多個值，任何一個變了就先清除再跑 setup。三種寫法：`[a, b]` 跟著列出的值，`[]` 只在第一次畫完後，省略第二個參數則每次渲染之後都跑。
- 開發時嚴格模式會在第一次掛上依序跑效果、清除、再跑效果，用來檢查收尾。正式建置只跑一次。課堂保持打開，原因在上一篇的 createRoot。
- 在 effect 裡同步設定狀態、又讓它每次渲染都再跑，渲染與效果會互相追。漏寫依賴會讓效果閉包住舊值，`react-hooks/exhaustive-deps` 會警告。
- 載入、失敗與空資料是三種畫面。清除時用 `AbortController` 取消請求；交給 fetch 的是 `controller.signal`。
- `fake-api.js` 以 `getItems`、`getItem`、`createItem`、`updateItem`、`deleteItem` 收成 API 模組。元件決定何時呼叫。新增、更新、刪除成功之後，清單改的是本機狀態。
- 兄弟元件要共享資料時，狀態放到共同父層，再用 props 與函式往下傳。
- 自訂 Hook 把重複邏輯收成 `use` 開頭的函式，可傳引數；會變的引數要放進內部 effect 的依賴。
- 中間很多層只為轉傳 props、自己不用時，用 Context：`createContext`、Provider 與 `useContext`。
- 元件拆到多個檔案時，`createContext` 只建一次並從獨立模組 import，Provider 與 `useContext` 才對得上同一條通道。
- ref、reducer 與表單 Actions 是選讀。`const ref = useRef(initialValue);`、`const [state, dispatch] = useReducer(reducer, initialArg);`。

# 專有名詞中英對照

## Effect 與資料

- 效果（effect）
- 準備函式（setup）
- 嚴格模式（React Strict Mode）：開發時對 effect 先執行、再清除、再執行
- 依賴陣列（dependency array）：可列多個值；`[a, b]`、`[]`、省略第二參數
- 清除函式（cleanup）
- 中止控制器（AbortController）
- 應用程式介面模組（API module）
- 自訂 Hook（custom Hook）

## 共用狀態

- 狀態提升（lifting state up）
- 屬性鑽孔（prop drilling）
- 情境（context）
- 參考（ref）
- 歸納函式（reducer）
- 動作（action）
- 樂觀更新（optimistic update）
