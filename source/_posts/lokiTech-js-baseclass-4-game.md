---
title: "[練習課程] JavaScript 教學（四）：實作打地鼠遊戲"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
  - JavaScript
  - 前端入門
date: 2025-08-04 01:32:41
---
![](assets/images/banner/js.png)

本篇將實作一個「打地鼠」小品遊戲，練習 DOM 操作、事件監聽與互動流程設計。你將學會如何結合 HTML、CSS 與 JS，打造出具備即時反應與分數統計的互動遊戲，並理解事件委派（Event Delegation）在實務開發中的應用。


<!-- more -->

# 素材準備
本教學聚焦於 JavaScript 互動邏輯，HTML 與 CSS 版型素材已完整提供，請將下方範例程式碼複製至 `index.html`，即可直接預覽遊戲畫面效果。

## 圖片素材
- 自行準備三張圖片檔（100x100），分別代表對應在專案適當位置：`/img/state.png`（等待）、`/img/on.png`（出現/可得分）、`/img/off.png`（得分）
- 或自行複製以下三張圖片作為練習圖片
{% gp 3-3 %}
![](assets/images/lokiTech-js-game-wackMole/state.png)
![](assets/images/lokiTech-js-game-wackMole/on.png)
![](assets/images/lokiTech-js-game-wackMole/off.png)
{% endgp %}

## 版型素材
先建立 3x3 圖片格子與下方控制列（時間、按鈕、分數）。為避免拖曳與誤觸，圖片加上 `-webkit-user-drag: none`、`user-select: none` 與 `touch-action: manipulation`。

```html index.html
<style>
  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    gap: 10px;

    .imgs-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 10px;

      img {
        border: 5px solid #6bd1eb;
        cursor: pointer;
        width: 100px;
        height: 100px;

        -webkit-user-drag: none;
        user-select: none;
        touch-action: manipulation;

        &[src*='state'] {
          background: yellow;
        }

        &[src*='on'] {
          background: red;
        }

        &[src*='off'] {
          background: green;
        }
      }
    }

    .control {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .info {
      padding: 10px 0;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
    }
  }
</style>

<div class="imgs-box">
  <img src="/img/state.png" />
</div>
<div class="control">
  <span>剩餘時間：<span id="time">0</span>s</span>
  <button>遊戲開始</button>
  <span>成績分數：<span id="combo">0</span></span>
</div>
<div class="info">
  <b>遊戲說明</b>
  <p>打地鼠遊戲，請點擊紅色圖片獲得分數（滿分 100 分）</p>
</div>
```

到目前為止你應該能得到以下的版面。
![](/assets/images/2025-08-18-22-08-12.png)

# 遊戲規則與流程說明
- **計時與重入控制**：按下「遊戲開始」後計時 60 秒，使用 `{ once: true }` 避免重複觸發；時間到再重新開放。
- **事件生成**：共 100 次紅色事件，均勻分佈在 0~57 秒，以 `setTimeout` 觸發到特定格子。
- **佔用避讓**：目標格若非等待狀態（非 `state.png`），延遲 100ms 改投到其他格，避免事件擁塞與浪費機會。
- **得分判定**：僅當格子為紅色（`on.png`）時有效，成功後變綠（`off.png`），1 秒後自動回黃（`state.png`）。
- **鍵盤對應（數字鍵盤）**：
  - 第一列：`7(103) → 0`、`8(104) → 1`、`9(105) → 2`
  - 第二列：`4(100) → 3`、`5(101) → 4`、`6(102) → 5`
  - 第三列：`1(97) → 6`、`2(98) → 7`、`3(99) → 8`

## 流程圖
{% mermaid graph TD %}
  A["開始點擊 Start"]
  B["設定 60 秒倒數<br/>註冊 100 次事件"]
  C["每次事件：挑選一格 space"]
  D{"該格為黃色？<br/>(state.png)"}
  E["標記為紅色 on.png<br/>排程 delay 秒後回黃"]
  F["100ms 後改投其他格"]
  G["玩家點擊或按鍵對應"]
  H{"當下是否紅色？"}
  I["得分 +1，變綠 off.png"]
  J["清除原 delay 排程"]
  K["1 秒後回黃 state.png"]
  L["時間歸零，允許重新開始"]

  A --> B --> C --> D
  D -- 是 --> E
  D -- 否 --> F --> C
  E --> G --> H
  H -- 是 --> I --> J --> K --> C
  H -- 否 --> C
  B --> L --> A
{% endmermaid %}

## 設計要點
- 請挑戰使用 addEventListener 來規劃事件，避免使用 HTML 來操作。使用 JS 將圖片抽換為指定三種圖片來源。
- 遊戲開始按鈕需注意，每次遊戲中只能執行一次，直到遊戲結束才能開放再次執行。
- 利用多個 function 將不同功能規劃起來，可以將常用變數規劃於 function 之外，彼此共用此變數。
- 遊戲時間內，將 100 個紅色事件隨機分散在九個位置與不同時間點之上。試圖讓 100 個事件彼此錯開這些位置與時間線且不重疊。
- 紅色事件經指定時間下，預定將轉為黃色。如果經使用者 click，則改轉為綠色，勢必要取消原本轉黃色的預訂行為。
- 除了滑鼠點選，也請讓鍵盤也能點選操作。

# 程式規劃
這裡相對於比較複雜，根據遊戲規則需要拆成多筆處理來判斷。利用 function 分工合作處理。

## 初始宣告與規劃位置
有一些 DOM 可以規劃為全域變數，方便利於所有 function 都能接受使用。同時將代碼規劃為初始執行區域，以及可用的函式。
包含以下：

```javascript
// public variables
// -----------------------------------------------------------
const time = document.getElementById('time');
const combo = document.getElementById('combo');
const animal = document.querySelectorAll('.imgs-box>img');
const btn = document.querySelector('.control>button');

// init
// -----------------------------------------------------------

// private method
// -----------------------------------------------------------
```

## 遊戲開始
每一次遊戲開始時，我們需要考慮處理一些事情，可規劃一個 function 為 gameStart，包含：

- 將時間設定為 60，分數為 0，更新於畫面上。
- 時間會每秒鐘減少 1 秒，直到 0。
- 遊戲開始時，產生 100 個紅色事件，指定到九宮格內不同的位置，以及曝光時間。同時它們的出現時間隨機落於 0 ~ 57 秒。
- 避免複雜不好維護，另規劃一個 function 命名為 toRedEvent 來處理 DOM 改變的工作。
- 目前按鈕沒有作用，需要規劃按鈕可以觸發 gameStart 但只需一次，因為 gameStart 不應該觸發 2 次以上於同遊戲時間內。

```js
// public variables
// -----------------------------------------------------------
const time = document.getElementById('time');
const combo = document.getElementById('combo');
const animal = document.querySelectorAll('.imgs-box>img');
const btn = document.querySelector('.control>button');

// init
// -----------------------------------------------------------
btn.addEventListener('click', gameStart, { once: true });

// private method
// -----------------------------------------------------------
function toRedEvent({ space, delay }) {
  // todo
}

function gameStart() {
  let sec = 60;
  time.textContent = sec;
  combo.textContent = 0;

  let start = setInterval(() => {
    if (sec === 0) {
      clearInterval(start);
      btn.addEventListener('click', gameStart, { once: true });
    } else {
      time.textContent = --sec;
    }
  }, 1000);

  for (let i = 0; i < 100; i++) {
    setTimeout(
      () =>
        toRedEvent({
          space: Math.floor(Math.random() * 9), //隨機 0~8 處
          delay: Math.floor(Math.random() * 3) + 2, //隨機 2~4 秒
        }),
      Math.floor(Math.random() * 57000) //隨機 0~56999 ms
    );
  }
}
```

## 觸發紅色事件
紅色事件的 function 工作主要是要將 100 個事件中的任何一個事件，根據要求改變為目前的格子改變為紅色。但有些重點需知道：

- 為了 100 個事件可以正常消化與遊戲表現正常，每一個事件都必須確保都出現在遊戲時間內。因此絕對不能出現覆蓋
- 每次轉紅事件處理之前，需要判定當前格子是否處於黃色，只有黃色閒置狀態下才能安排轉紅事件
- 同上，如果當前格子為忙碌狀態，最佳解法為快點重新找一個新隨機位置再安排一次轉紅事件。
- 轉紅事件需要根據曝光時間，當曝光結束後，預設應自動轉黃列入閒置狀態。
- 同上，某情況需要取消這個自動轉黃的事件。因此需要偷塞入這個 timeout 註冊 ID 綁定到 DOM 格子上。

```js
// private method
// -----------------------------------------------------------
function toRedEvent({ space, delay }) {
  const targetImg = animal[space];
  if (!targetImg.src.includes('state'))
    setTimeout(
      () => toRedEvent({ space: Math.floor(Math.random() * 9), delay }),
      100
    );
  else {
    targetImg.src = '/img/on.png';
    targetImg.beYellowTimeIdx = setTimeout(
      () => (targetImg.src = '/img/state.png'),
      delay * 1000
    );
  }
}
function gameStart() {
//... 略
}
```

## 點擊得分
接著需要規劃一個 function 來處理這些事情

- 如果當前格子不是綠色不能作為得分，直接結束 function 不工作。
- 判定如果當前是紅色我們要計算得一分並改變為綠色。並固定 1 秒後才轉為黃色。
- 同時，原本這個格子預定會轉黃事件，應取消該轉黃工作，由當下的轉綠回黃的事件來處理。
- 同上，可以利用稍早 toRedEvent 偷寫入到 DOM 的參數。很輕鬆移除原 timeout 工作。
- 另外我們需要初始化工作時，先定義九格的 click 事件做得分工作。
- 同時，我們也需要讓鍵盤也支援指定的得分，他能代表某格格子的得分工作。

```js
// init
// -----------------------------------------------------------
animal.forEach((img, index) => {
  img.addEventListener('click', () => getCount(index));
});

document.addEventListener('keydown', (e) => {
  const keyMap = {
    103: 0,
    104: 1,
    105: 2,
    100: 3,
    101: 4,
    102: 5,
    97: 6,
    98: 7,
    99: 8,
  };
  keyMap[e.keyCode] && getCount(keyMap[e.keyCode]);
});

btn.addEventListener('click', gameStart, { once: true });

// private method
// -----------------------------------------------------------
function toRedEvent({ space, delay }) {
  //...
  else {
    targetImg.src = '/img/on.png';
    targetImg.beYellowTimeIdx = setTimeout(
      () => (targetImg.src = '/img/state.png'),
      delay * 1000
    );
  }
}

function getCount(who) {
  const targetImg = animal[who];
  if (!targetImg.src.includes('on')) return;

  targetImg.src = '/img/off.png';
  combo.textContent = Number(combo.textContent) + 1;

  clearTimeout(targetImg.beYellowTimeIdx);
  setTimeout(() => (targetImg.src = '/img/state.png'), 1000);
}

function gameStart() {
//...
}
```

{% note default %}
**示範參考：** 
- [View Full Code](https://github.com/summer10920/studies_TeachDemo_JSJQ/blob/master/vanillaJS/whackMole/index.html)
- [DEMO Page](https://summer10920.github.io/studies_TeachDemo_JSJQ/vanillaJS/whackMole/)
{% endnote %}，