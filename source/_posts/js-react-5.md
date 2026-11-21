---
title: '[前端框架] React - 技巧'
categories:
  - Misc Notes
  - Web Frontend
tag:
  - ReactJS
  - JavaScript
date: 2021-12-11 01:51:06
hidden: true
---

![](assets/images/banner/react.png)
本篇為 React 官方手冊伴讀的最後一篇，作為部分深入操作技巧的學習之路。熟悉 React 程度須有一定標準才建議著手看過此篇。

<!-- more -->

# render prop
一種將函式設計成 porp 傳遞，使得其他元件能夠重複使用指定程式碼的技巧。被賦予 render prop 的元件不會根據自己原本的 render 來決定渲染內容，而是根據 render prop 帶回來的內容動態的顯示呼叫出來。

## 範例
假設我們有兩個雷同的範例，一個是輸出元件能夠根據滑鼠事件來渲染出座標文字顯示：

```js
import { useState } from 'react';
import {render} from 'react-dom';

/*same code start*/
function MouseTrack() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const doMove=(event)=>{
    setX(event.clientX);
    setY(event.clientY);
  }

  return(
    <div style={{
      height:'100vh',
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column'
      }} onMouseMove={doMove}>
      <h1>mouse position</h1>
      <p>[{x},{y}]</p>
    </div>
  );
}
/*same code end*/

render(<MouseTrack/>,document.getElementById('root'));
document.body.style.margin="0";
```

另一個輸出範例為，根據滑鼠事件來調整一個貓咪圖片位置：

```js
import { useState } from 'react';
import { render } from 'react-dom';
import cat from './cat.png';

function Cat(props) {
  return (
    <img src={cat} alt='cat' style={{
      position: 'fixed',
      left: props.mouse.left,
      top: props.mouse.top
    }} />
  )
}

/*same code start*/
function MouseWithCat() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const doMove = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }} onMouseMove={doMove}>
      <h1>mouse position</h1>
      <Cat mouse={{ left: x, top: y }} />
    </div>
  );
}
/*same code end*/

function MouseTrack() {
  return (
    <>
      <MouseWithCat />
    </>
  );
}

render(<MouseTrack />, document.getElementById('root'));
document.body.style.margin = "0";
```

以範例貓咪位置來說，這樣的渲染結果是根據 MouseWithCat 元件作為寫死渲染出貓咪位置。若換個角度調整，是否能將 MouseWithCat 另設計成可封裝的 Mouse 元件，未來如果要共用 Mouse 元件就能重複使用，這就需要運用到 render props 來設計。

- 規劃 Mouse 元件，這是一個能獲得外部 props 函式的元件，並根據此 props 來決定本元件會提供怎樣的動態渲染。
- Mouse 元件會根據提供的本身參數與 props.render 之函式進行結果來組合該顯示的渲染，因此 props 函式能決定 Mouse 元件該如何渲染畫面。
- MouseTrack 元件進行渲染時，下層 Mouse 元件提供 props.render 並以函式作為值，由下層 Mouse 元件內部來決定函式參數，上層 MouseTrack 元件來決定函式內容。
- 最後將內容傳給下層 Mouse 元件，使得 Mouse 元件根據不同內容有不一樣的畫面結果。
- 現在 Mouse 元件已不是固定內容渲染的元件，經過封裝後可被不同上層元件依需求來重複利用。

```js
import { useState } from 'react';
import { render } from 'react-dom';
import cat from './cat.png';

function Cat(props) {
  return (
    <img src={cat} alt='cat' style={{
      position: 'fixed',
      left: props.mouse.left,
      top: props.mouse.top
    }} />
  )
}

function Mouse(props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const doMove = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }} onMouseMove={doMove}>
      {/* <h1>mouse position</h1>
      <Cat mouse={{ left: x, top: y }} /> */}
      {props.render({ left: x, top: y })}
    </div>
  );
}

function MouseTrack() {
  return (
    <Mouse render={
      mouse => (
        <>
          <h1>mouse position</h1>
          <Cat mouse={mouse} />
        </>
      )
    } />
  );
}

render(<MouseTrack />, document.getElementById('root'));
document.body.style.margin = "0";
```

現在，可以在上層 MouseTrack 元件多要求 Pos 元件去改變 Mouse 元件該渲染的內容。

```js
import { useState } from 'react';
import { render } from 'react-dom';
import cat from './cat.png';

function Cat(props) {
  return (
    <img src={cat} alt='cat' style={{
      position: 'fixed',
      left: props.mouse.left,
      top: props.mouse.top
    }} />
  )
}

function Pos(props) {
  return (
    <p>[{props.mouse.left},{props.mouse.top}]</p>
  );
}

function Mouse(props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const doMove = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }} onMouseMove={doMove}>
      {props.render({ left: x, top: y })}
    </div>
  );
}

function MouseTrack() {
  return (
    <Mouse render={
      mouse => (
        <>
          <h1>mouse position</h1>
          <Pos mouse={mouse} />
          <Cat mouse={mouse} />
        </>
      )
    } />
  );
}

render(<MouseTrack />, document.getElementById('root'));
document.body.style.margin = "0";
```

[Codepen DEMO](https://codepen.io/summer10920/pen/bGogjxy?editors=0010)

## 規則說明
由於 render props 只是一種傳遞函式當作 props 的技巧，因此不是強迫需要命名為 props.render。你可以改用其他 props 命名，只要是這樣的操作技巧都稱呼為 render prop。例如使用 props.children 這特別 props 來完成此技巧

```js
function Mouse(props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const doMove = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }} onMouseMove={doMove}>
      {props.children({ left: x, top: y })}
    </div>
  );
}

function MouseTrack() {
  return (
    <Mouse children={
      mouse => (
        <>
          <h1>mouse position</h1>
          <Pos mouse={mouse} />
          <Cat mouse={mouse} />
        </>
      )
    } />
  );
}
```

既然是 props.children，也可以用 JSX 的 children 表示特性來完成。

```js
function Mouse(props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const doMove = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }} onMouseMove={doMove}>
      {props.children({ left: x, top: y })}
    </div>
  );
}

function MouseTrack() {
  return (
    <Mouse>
      {mouse => (
        <>
          <h1>mouse position</h1>
          <Pos mouse={mouse} />
          <Cat mouse={mouse} />
        </>
      )}
    </Mouse>
  );
}
```

# Higher-Order Components 高階元件

# 友善化網頁
這部分集結一節討論，包含 WAI-ARIA 無障礙應用技術、HTML5 語意標籤、表單輔助、

## WAI-ARIA
即是一個能藉由添加進一步的語意幫助處理這種問題的技術 ，讓瀏覽器與輔助科技可以辨識及用以讓使用者知道發生什麼事情。熟悉 Bootstrap 的人很常看到 aria-*的屬性標籤。JSX 編寫這些屬性不需要遵守駝峰命名直接寫入即可。

```js
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## 語意標籤 與 Fragment
語意化為 HTML5 提倡的觀念，盡可能用適合的標籤名稱去結構網頁想表達的內容使瀏覽器或搜尋演算法充分理解。由於常常元件互相勘套時會破壞這標籤結構且元件的 render 必須要一組標籤，因此可以使用短語法`<>`（或稱空標籤且之前出現過）來當一組標籤避免多餘層級標籤。

```js
//短語法
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

或者舊方式使用`<fragment></fragment>`分段標籤來替代，Fragment 需要從 react 宣告匯入。

```js
//Fragment
import { Fragment } from 'react';
function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}
```

唯獨不同是 Fragment 可以添加一些 props 或是 key 使用。

```js
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

## HTML5 表單機制
HTML5 在表單上提供一些有用的機制，其中例如 label 標籤的設計，需搭配 for 屬性來指定對應表單元素。然而 for 為特別關鍵字，在 JSX 內必須改用 htmlFor 來表示。

```js
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

控制 focus 看不懂 略過，跟 ref 有關
https://zh-hans.reactjs.org/docs/accessibility.html#focus-control

滑鼠事件看不懂，同上

# 未讀
错误边界（Error Boundaries）
Higher-Order Component
整合其他函式庫
Optimizing Performance 最佳化效能
Profiler API
Reconciliation
Static Type Checking