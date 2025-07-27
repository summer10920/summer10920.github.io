---
title: '[前端框架] React - Hook'
categories:
  - Misc Notes
  - ReactJS
tag:
  - ReactJS
  - JavaScript
date: 2021-11-16 11:59:04
---

![](assets/images/iWnyS9n.png)
Hook 是 React 自版本 16.8 開始推廣出來的新功能，主要是用於不需要 class 就能輕鬆使用 state 的方式。出現的動機主要是避免開發人員對於 class 的 this 定義容易混淆，且將使用邏輯更容易直接上手。

<!-- more -->

Hook 本身也是一個多功能的巨集。未來 class 寫法也將被 React 的 hook 所取代。目前業界來說分別為新舊兩派正在使用 class 或 hook。想使用 hook 必須只能使用在 function 組件上，不能在 class 內使用（畢竟未來要捨棄 class)。Hook 可以在函式或函式型變數內使用。例如：
```js
function Example1(props) {
  // 你可以在這裡使用 Hook！
  return <div />;
}

const Example2 = (props) => {
  // 你可以在這裡使用 Hook！
  return <div />;
}
```

# useState
利用 Hook 來使用 State，算是 Hook 最主要的功能。useState 本身是一個函式透過傳遞參數提供初始值後，將回傳該 state 與可修改之函式。以下提供 state hook 與 class 的差異寫法之處。

{% tabs hookVSstate%}
<!-- tab state Hook -->
```js
import { useState } from 'react';
import { render } from 'react-dom';

function Example() {
  // 宣告一個新的 state 變數，我們稱作為「count」。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

render(
  <Example />, document.getElementById('root')
);
```
<!-- endtab -->
<!-- tab state Class -->
```js
import { Component } from 'react';
import { render } from 'react-dom';

class Example extends Component {
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>
          Click me
        </button>
      </div>
    );
  }
}

render(
  <Example />, document.getElementById('root')
);
```
<!-- endtab -->
{% endtabs %}

很明顯 Hook 不用管太多 this 直接用就好。從上面範例上可以觀察到：

- 使用 useState 需要從 react.js 匯入`{useState}`或`React.useState`。
- 利用陣列解構來一次規劃兩個變數接住 state 與可更新的函式。
- useState 回傳的第一個內容為目前的 state，可使用自訂變數 count 接住，他等價 class 的 this.state.count
- useState 回傳的第二個內容為可更新 state 的函式，可使用自訂變數 setCount 接住，他等價 class 的 this.setState()
- 這些變數不會因為 function 結束而消失，React 會保留這些 state 內容。
- 觀察 JSX 的 p 標籤，function 內要讀取該 state 時直接使用即可，不用加什麼 this.state 等物件寫法。
- 更新 state 的方式，從你指定的函式變數名稱來執行即可。

如果你需要多個 state，就多筆使用 useState()。
```js
function ExampleWithManyStates() {
  // 宣告多個 state 變數！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  //...
}
```

> Hook 的內建函式名稱幾乎都是 use 開頭，保持這個命名習慣如果你未來有自訂 Hook 函式。

## 初始值
提供初始值給useState時只有第一次render有用到，之後觸發的render渲染將被忽略此值，如果有需要複雜計算出初始值可以透過匿名函式回傳的組合寫法：

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

# useEffect
useEffect 是能讓你在組件內使用 Side Effect 副作用，對主調用函式產生附加的影響。useEffect 本身等價於生命週期的 componentDidMount, componentDidUpdate, componentWillUnmount 的組合用途，每當 react 對組件進行 render 時會觸發 useEffect 內的工作。

> 使用 useEffect 時同樣的需要從 React.js 匯入獲得此函式。

{% tabs hookVSeffect,1 %}
<!-- tab effect Hook -->
```js
import { useState, useEffect } from 'react';
import { render } from 'react-dom';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('clicked');
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

render(
  <Example />, document.getElementById('root')
);
```
<!-- endtab -->
<!-- tab effect Class -->
```js
import { Component } from 'react';
import { render } from 'react-dom';

class Example extends Component {
  state = {
    count: 0
  }
  componentDidMount(){
    console.log('click by Mount')
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate(){
    console.log('click by Update')
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>
          Click me
        </button>
      </div>
    );
  }
}

render(
  <Example />, document.getElementById('root')
);
```
<!-- endtab -->
{% endtabs %}

預設情況下，useEffect 在第一個 render 和隨後每一個更新之後執行。把 effect 想成發生在「render 之後」所觸發，而不是考慮「mount」和「update」的生命週期。 React 能保證 DOM 在執行 effect 時已被更新。

## 清除 Effect
在原 React Class 的生命週期觀念中，我們會在 componentDidMount 當下設計一段動作事件，另外再 componentWillUnmount 時將該動作事件清除。舉例來說以下是 Class 的設計，利用假設的 ChatAPI 訂閱模組提供啟用與取消動作分別規劃在生命週期的掛載與卸除上：

```js
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
    console.log('Mount');
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus( 
      this.props.friend.id,
      this.handleStatusChange
    );
    console.log('Unount');
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

同樣的需求，使用 Hook useEffect 來完成，關鍵的卸除部分為透過對 useEffect() 完成一個 return 自訂函式來達到。

```js
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    console.log('Mount');

    // 指定如何在這個 effect 之後執行清除：
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      console.log('Unmount');
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

如果試著操作觀察兩者的 console.log，可以發現先前介紹 class 時的生命週期只會一次，因此除非觸發 ReactDOM.unmountComponentAtNode() 來卸載 DOM 否則`console.log('Unount')`不會執行。

但 useEffect 不一樣，每次 effect 被 render 執行時會清除前一次的 effect 被迫卸載，原因於每次重新 render 時，React 都會安排另一個不同 effect 來替代上一個。這使 effect 的行為像是 render 結果的一部分，這是一種優點能避免 BUG 或效能問題。

useEffect 也可以選擇回傳對象為一匿名箭頭函式，或者不回傳（不綁訂清除時動作）。

```js
//...
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
//...

//...
  useEffect(() => {
  document.title = `You clicked ${count} times`;
});
//...
```

### useEffect 清除時機
接著來探討清除（卸載的）時機點為當下一個 render 觸發後才會執行。卻不如生命週期那樣被 unmount 時執行一次就好。整體來說是為了避免記憶體資料錯亂的問題減少 BUG 發生。舉例來說前面出現的好友狀態 API 存在瑕疵性：

```js
componentDidMount() {
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentWillUnmount() {
  ChatAPI.unsubscribeFromFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```

如果發生以下動作：

1. 這個畫面被 render 了觸發 mount 而產生了好友 A 的狀態。
2. 此時 props 的 id 更改成好友 B，也就是導致會繼續顯示好友 B 的狀態。
3. 接著觸發關 DOM 進行卸載，只能取消訂閱好友 B 而好友 A 的狀態就卡在記憶體內了。

因此，class 設計時還要補上發生 update(props 改變）的退訂與加訂動作。忘記處理這部分是很常見的致命錯誤。

```js
  componentDidMount() {
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentDidUpdate(prevProps) {
  // 從先前的 friend.id 取消訂閱
  ChatAPI.unsubscribeFromFriendStatus(
    prevProps.friend.id,
    this.handleStatusChange
  );
  // 訂閱下一個 friend.id
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentWillUnmount() {
  ChatAPI.unsubscribeFromFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```

所以討論到這，使用 Hook 的 useEffect 就沒有這困擾，每次的 render 都是另一個 Effect。

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  //...
}
```

假設自 render 開始，隨 props 初始從 100 變化 200 接著 300 最後卸除。其 useEffect 所帶來的時間執行過程變成以下順序：

```js
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 執行第一個 effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除前一個 effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 執行下一個 effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除前一個 effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 執行下一個 effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最後一個 effect
```

## 多筆工作
對於 class 在使用生命週期時，當需組合多個任務時，只需單純在於各項階段掛載時的多筆工作。舉例前例整合了記數改變網頁標題與好友狀態 api 兩項工作。

**網頁標題**
- 掛載時，改變網頁標題並使用
- 變化時，改變網頁標題並使用

**好友狀態**
- 掛載時，確認好友狀態資訊
- 卸除時，取消好友狀態資訊

```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`; //job A: mount
    ChatAPI.subscribeToFriendStatus( //job B: mount
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;  //job A: update
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus( //job B: unmount
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
}
```

如果在 Hook 的 useEffect 使用方式，由於 useEffect 本身就是具備掛載、更新、卸除（透過 return) 的獨立項目。因此只需要利用多組 useEffect 來完成多筆工作。修改如下：

```js
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {  //job A: mount, update
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => { //job B: mount, unmount
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

## 改善最佳化
在 class 的生命週期操作上每次 render 時都會觸發 update 工作，效能上會比較糟糕。而 class 的解決方式就是想辦法透過 prevProps 或 prevState 來檢查上次與目前的實際值是否變化才決定是否執行：

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

但在 Hook 的 useEffect 已經加入此設計。只需要在 useEffect 第二個參數提供一陣列（也就是可以確認多筆值），每次 update 時 React 會從上一個 useEffect 與目前 useEffect 的這部分陣列是否一致。如果相同則會自動忽略此 update：

```js
//...
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 僅在計數更改時才重新執行 effect

//...
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // 僅在 props.friend.id 改變時重新訂閱
```

舉第一例來說原本 count=5，第一次被 Mount 時 useEffect 這裡提供了 [5]，下次 render 時如果 count 不變，React 比對前後這部分 [5] 與 [5] 因無變化而忽略這個 effect。如果 count 改為 6 而 render 當下因為 [5] 與 [6] 不相同 React 會重新執行此 effect。第二例的清除設計也是一樣。

> React 的動作會先 render 再執行 useEffect。

- 使用此最佳化，通常都是第二參數內是可變化的像是 props 或 state。否則他可能會沒意義的保持舊值不變化檢查 update 時是否執行，只剩 mount 與 unmount 的部分。
- 如果就是不想檢查 update 的設計可以指定空陣列 []，也就成為不會因 update 而執行的 Effect，他只剩 mount 與 unmount 的部分（其實有其他方法）。但這樣的設計就等於之前 class 的 bug 隱患問題。

# Hook 規則
Hook 本身只是 React 開發出來的 javascrtipt 函式作為使用。因此重點說明使用 Hook 該注意的規則經驗。主要有兩個部分。

## 只在最上層呼叫 Hook
不要在迴圈、條件式或是巢狀的 function 內的地方使用 Hook。你只會在組件內的第一層直接使用它。React 才能 useState 和 useEffect 之間呼叫 state。

舉例來說，我們符合規則使用 2 組 useState 與 useEffect，並觀察它的執行時間過程。
```js
function Form() {
  // 1. 使用 name state 變數
  const [name, setName] = useState('Mary');

  // 2. 使用一個 effect 來保存表單
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. 使用 surname state 變數
  const [surname, setSurname] = useState('Poppins');

  // 4. 使用一個 effect 來更新標題
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```
React 會仰賴於 Hook 被呼叫的順序，因此 Effect 能準確地執行獲得 state 值將他們聯繫一起。
```js
// ------------
// 第一次 render
// ------------
useState('Mary')           // 1. 用 'Mary' 來初始化 name state 變數
useEffect(persistForm)     // 2. 增加一個 effect 來保存表單
useState('Poppins')        // 3. 用 'Poppins' 來初始化 surname state 變數
useEffect(updateTitle)     // 4. 增加一個 effect 來更新標題

// -------------
// 第二次 render
// -------------
useState('Mary')           // 1. 讀取 name state 變數 （參數被忽略了）
useEffect(persistForm)     // 2. 替換了用來保存表單的 effect
useState('Poppins')        // 3. 讀取 surname state 變數 （參數被忽略了）
useEffect(updateTitle)     // 4. 替換了用來更新標題的 effect

// ...
```

反之，將其中的 useEffect 放置在某判斷式底下。

```js
// 🔴 我們違反了第一個規則，在條件式中使用 Hook
if (name !== '') {
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });
}
```

假設一開始成立，使得第一次 render 獲得 4 筆。其後因為使用者操作為`name=''`，這會影響 React 的 update 時找不到第二個 hook(useEffect)，前一次與這次的順序整個無法對應上，導致發生問題。

```js
// ------------
// 第一次 render
// ------------
useState('Mary')           // 1. 用 'Mary' 來初始化 name state 變數
useEffect(persistForm)     // 2. 增加一個 effect 來保存表單
useState('Poppins')        // 3. 用 'Poppins' 來初始化 surname state 變數
useEffect(updateTitle)     // 4. 增加一個 effect 來更新標題

// -------------
// 第二次 render
// -------------
useState('')           // 1. 讀取 name state 變數 （參數被忽略了）
// useEffect(persistForm)  // 這個 Hook 被跳過了！
useState('Poppins')        // 2 （但之前是 3). 未能讀取 surname state 變數
useEffect(updateTitle)     // 3 （但之前是 4). 未能取代 effect
```

因此，既使你不想執行內容也得確保每次 render 的筆數順序不會產生無法對應之問題。

```js
useEffect(function persistForm() {
  // 👍 我們不再違反第一個規則
  if (name !== '') {
    localStorage.setItem('formData', name);
  }
});
```

## 只在 React Function 中呼叫 Hook
也就 React 的函式型組件內去使用它或者自訂 Hook，不要在普通的函式內使用。因為 React 設計它拿來做為組件內的功能用途。這部分不做解說。

## ESList 輔助工具
如果你有使用 ESLint 來協助開發環境，可透過以下插件來增加 Hook 對上列 2 個條件增加規則限制：

```shell
npm install eslint-plugin-react-hooks --save-dev
```
```json
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 檢查 Hook 的規則
    "react-hooks/exhaustive-deps": "warn" // 檢查 effect 的相依性
  }
}
```

# 自訂 Hook
比較簡單的說法為，透過自訂一個 function 將使用 state 的相同邏輯做成一個 use 名稱的 hook 函式。讓這個函式本身符合 hook 規則（只能被上層呼叫且提供給 function 組件使用）。

舉例以下說明：有兩個函式組件透過某一邏輯使用到 useState 與 useEffect 做一個結果後的不同 return，而這邏輯內容一致：

```js
import { useState, useEffect } from 'react';

//提供好友 id，告知是否在線上
function FriendStatus(props) {
  //same code start
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  //same code end

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

//提供好友 id，回傳 li 元素並標示狀況顏色
function FriendListItem(props) {
  //same code start
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  //same code end

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

因此我們可以試著將這些有使用到 Hook 處理過程抽取成為一個自訂的 Hook，命名上使用 use 開頭能確保提醒自己或工具這需要符合 Hook 規則。利用 return 將所需要的 state 值提供回來。

```js
import { useState, useEffect } from 'react';

//自訂 Hook，並以 use 開頭命名
function useFriendCheck(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange);
    };
  });
  return isOnline;
}

//提供好友 id，告知是否在線上
function FriendStatus(props) {
  //same code start
  const isOnline = useFriendCheck(props.friend.id);
  //same code end

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

//提供好友 id，回傳 li 元素並標示狀況顏色
function FriendListItem(props) {
  //same code start
  const isOnline = useFriendCheck(props.friend.id);
  //same code end

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

基本的自訂 Hook 已完成，有以下特性需注意：

- 自訂 Hook 可以內不去使用原有的 Hook 函式，自訂 Hook 只是一個普通 function。
- 自訂 Hook 命名 use 開頭有提醒規則之用途（包含工具辨識）。
- 不同組件使用同自訂 Hook 為彼此獨立，自訂 Hook 本身只是一個函式無特別之處。因此不同組件其邏輯操作到的 useState 與 useEffect 獨立不共享。

我們也能對自訂 Hook 傳遞一個可變的像是上層 state 進去，促使下次該組件進行渲染時執行觸發獲得可變的 return 回來。下面為當上層 state 提供數字給自訂 useFriendCheck 能協助回應上線之狀態結果。下次當觸發修改 state 時又會從自訂 useFriendCheck 獲得另一個結果。而 useEffect 每次執行獨立性，前一個好友狀態會再下一次的 useEffect 執行而自動取消本次 useEffect 觸發 unsubscribeFromFriendStatus。

```js
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isOnline = useFriendCheck(recipientID);

  return (
    <>
      <Circle color={isOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```

# 參考文獻

- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation)
- [\[ESLint\] Feedback for 'exhaustive-deps' lint rule ](https://github.com/facebook/react/issues/14920)
