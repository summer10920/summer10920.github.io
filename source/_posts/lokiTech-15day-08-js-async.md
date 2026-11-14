---
title: "JavaScript：非同步、Fetch 與瀏覽器儲存"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:07:00
---

![](assets/images/banner/js.png)

JavaScript 同一時間只做一件事，計時器、網路與讀檔卻都要等。這一篇從同步與非同步的差別談起，經過回呼與 try／catch／throw 的基本錯誤處理，再用 Promise 與 async／await 把等待寫成一直線。接著認識 JSON，用 fetch 讀寫資料並畫出載入中、成功、失敗三種畫面，最後用 Web Storage 讓清單重新整理後還在。選讀補充事件迴圈、race／any、計時器包成 Promise、取消與逾時、CORS、Cookie 與 session／token。

<!-- more -->

# 認識非同步

JavaScript 同一時間只做一件事，要等很久的工作就先交給瀏覽器，自己繼續往下跑，所以寫在下面的程式不一定比較晚執行。這一章先看同步與非同步的差別，再看把「完成後要做的事」交出去的回呼函式，以及回呼一層包一層時的問題。事件迴圈放在選讀：看不懂可以跳過，不影響後面寫程式；看懂了，就能解釋更細的執行順序。

## 同步與非同步

同步是一件做完才做下一件，非同步是先登記、晚點再收結果。這一節用三個小實驗看執行順序、單執行緒造成的卡住，以及非同步怎麼避免卡住。

### 執行順序

非同步的程式不一定照寫的順序出結果。這一節用 `setTimeout` 排一件晚點才做的事，看它的結果為什麼落在最後。

**觀念**

同步程式是一行做完才做下一行。非同步是先把工作登記給瀏覽器，這一行立刻結束，結果晚一點才回來。

登記時交出去的函式，叫回呼（callback），意思是「等條件到了再回頭呼叫的函式」。就算延遲寫 0，回呼也要等現在這段同步程式全部做完才輪到它。

```html 04-js/pages/149-js-order.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>執行順序</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log('A');
      setTimeout(() => {
        console.log('B');
      }, 0);
      console.log('C');
    </script>
  </body>
</html>
```

**解析**

- 頁面上只有那句說明，三行訊息都在 Console。
- A 和 C 是同步程式，依寫的順序先印出。
- `setTimeout` 登記完就返回，不會停在那一行等 B。
- 所以 B 排在 C 之後：延遲 0 的意思是「最快也要等這一段同步程式結束」，不是插在前面。

```text
A
C
B
```

本章的輸出區塊只列文字內容，和 Console 實際畫面（行號、顏色、錯誤圖示）略有不同。

### 單執行緒與阻塞

JavaScript 同一時間只做一件事，這個特性會直接影響畫面。這一節讓一個函式故意跑 3 秒，看頁面怎麼被卡住。

**觀念**

執行緒（thread）是程式執行事情的一條路線。瀏覽器裡的 JavaScript 只有一條，叫做單執行緒（single thread），而且負責更新畫面的也是這一條。

函式還沒做完，就不會去做別的事，包括回應點擊與更新畫面。這種「一件事占住整條路線」的情況叫阻塞（blocking）。

下面用 `Date.now()` 取得目前時間（毫秒），再用 `while` 反覆比較，直到 3 秒過去。這兩個都是選讀內容，這裡只拿來製造一段耗時的程式，詳見 {% post_link lokiTech-15day-06-js-basics %} 的 Date 與 while 選讀章節。

```html 04-js/pages/152-js-block.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>單執行緒與阻塞</title>
  </head>
  <body>
    <p>點一次按鈕，頁面會停住約 3 秒。這段時間按鈕不會回應，按鈕文字也不會更新。</p>
    <button type="button" id="busy">開始</button>
    <script>
      const button = document.querySelector('#busy');
      button.addEventListener('click', () => {
        console.log('開始計算');
        button.textContent = '計算中';
        const end = Date.now() + 3000;
        while (Date.now() < end) {
          // 故意一直重複比較，讓這個函式 3 秒都不結束
        }
        button.textContent = '計算結束';
        console.log('計算結束');
      });
    </script>
  </body>
</html>
```

**解析**

- 點下按鈕後，Console 先印出「開始計算」，按鈕文字已在程式裡改成「計算中」。
- 接下來 3 秒，頁面停住：畫面上按鈕仍然顯示「開始」，也無法即時回應操作。瀏覽器要等這個函式做完，才有機會處理點擊與重繪畫面。
- 函式結束後，按鈕才直接變成「計算結束」，中間的「計算中」從頭到尾沒有出現在畫面上。
- 阻塞的原因不是工作多，而是這條唯一的路線被占住。下一節看如何讓「等待」不占路線。

```text
開始計算
計算結束
```

### 非阻塞的等待

阻塞的問題在於等待時還占著執行緒。這一節換成 `setTimeout` 等 3 秒，看頁面在等待期間還能不能操作。

**觀念**

非同步的做法是把等待的事情交給瀏覽器，JavaScript 登記完就繼續往下做，執行緒空出來，頁面就能回應點擊。這叫非阻塞（non-blocking）。

計時器、網路請求與使用者的點擊，都是這樣處理：瀏覽器負責等，條件到了才回頭呼叫你交出的回呼。要算很久的運算則另有做法，例如交給後端，或交給 Web Worker（瀏覽器提供的另一條背景執行緒）。

```html 04-js/pages/152b-js-nonblock.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>非阻塞的等待</title>
  </head>
  <body>
    <p>先按「等 3 秒」，再連續按「計數」。計數會馬上增加，3 秒到了，下面的文字才改變。</p>
    <button type="button" id="wait">等 3 秒</button>
    <button type="button" id="count">計數 0</button>
    <p id="message">尚未開始</p>
    <script>
      const waitButton = document.querySelector('#wait');
      const countButton = document.querySelector('#count');
      const message = document.querySelector('#message');

      waitButton.addEventListener('click', () => {
        message.textContent = '等待中';
        setTimeout(() => {
          message.textContent = '3 秒到了';
        }, 3000);
      });

      let times = 0;
      countButton.addEventListener('click', () => {
        times += 1;
        countButton.textContent = `計數 ${times}`;
      });
    </script>
  </body>
</html>
```

**解析**

- 按下「等 3 秒」，下方文字馬上變成「等待中」，頁面沒有停住。
- 等待期間連續按「計數」，按鈕上的數字每按一次就加一，因為執行緒是空的。
- 3 秒到了，瀏覽器呼叫回呼，下方文字才變成「3 秒到了」。
- 和上一節對照：同樣是 3 秒，阻塞版什麼都不能做，非阻塞版可以繼續操作。代價是程式不能假設下一行已經拿到結果。

### 選讀：事件迴圈

這一節是選讀。看不懂可以先跳過，後面的 Promise 與 Fetch 還是寫得成。看懂之後，就能解釋回呼是排在哪裡、輪到的順序，以及有些回呼為什麼比計時器早。

#### 呼叫堆疊

上一節說執行緒一次只做一件事，這一節看它怎麼管理「正在做什麼」。管理的方式叫呼叫堆疊，這裡用三個互相呼叫的函式，把進入和離開的順序印在 Console。

**觀念**

正在跑的函式放在呼叫堆疊（call stack）最上面。它若再呼叫別的函式，新函式就疊上去，下面那個停在呼叫的那一行。

上面的函式整個跑完，才從堆疊拿掉，下面的函式再從停住的地方繼續。所以每個函式的「離開」，都晚於它呼叫出去的那些函式。

{% mermaid graph LR %}
    pushFirst["呼叫 first<br/>堆疊：first"] --> pushSecond["呼叫 second<br/>堆疊：first、second"]
    pushSecond --> pushThird["呼叫 third<br/>堆疊：first、second、third"]
    pushThird --> popThird["third 結束<br/>拿掉 third"]
    popThird --> popSecond["second 結束<br/>拿掉 second"]
    popSecond --> popFirst["first 結束<br/>拿掉 first"]
    style pushFirst fill:#e3f2fd
    style pushSecond fill:#e3f2fd
    style pushThird fill:#fff3e0
    style popThird fill:#e8f5e9
    style popSecond fill:#e8f5e9
    style popFirst fill:#e8f5e9
{% endmermaid %}

圖由左到右是時間先後。third 執行時堆疊最高，因為 first 與 second 都還停在下面等它。

```html 04-js/pages/150-js-stack.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>呼叫堆疊與單執行緒</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const third = () => {
        console.log('進入 third');
        console.log('離開 third');
      };

      const second = () => {
        console.log('進入 second');
        third();
        console.log('離開 second');
      };

      const first = () => {
        console.log('進入 first');
        second();
        console.log('離開 first');
      };

      first();
    </script>
  </body>
</html>
```

**解析**

- 頁面只有說明文字，六行訊息都在 Console。
- first 先進入堆疊，所以最先印「進入 first」。
- first 呼叫 second、second 再呼叫 third，三個函式依序疊上去，「進入」三行連續印出。
- third 沒有再呼叫別人，所以它最先結束，印「離開 third」並被拿掉。
- 堆疊往回一層一層拿掉，「離開」的順序正好和「進入」相反。

```text
進入 first
進入 second
進入 third
離開 third
離開 second
離開 first
```

#### 任務佇列

回呼不會直接插進堆疊，而是先排隊。這一節用延遲 0 的計時器，逐步看回呼什麼時候被放上堆疊。

**觀念**

要等待的事交給瀏覽器的 Web API（瀏覽器提供的計時、網路等功能）去處理。條件到了，瀏覽器把回呼放進任務佇列（task queue）排隊。

事件迴圈（event loop）負責檢查呼叫堆疊。堆疊上還有程式時，它不拿任務；堆疊空了，才從任務佇列取出一個，放上堆疊執行。這個任務做完，就再取下一個，一直重複。

{% mermaid graph LR %}
    jsNode["JS 程式"] --> webNode["瀏覽器等待<br/>Web API"]
    webNode --> queueNode["任務佇列"]
    queueNode --> loopNode["事件迴圈"]
    loopNode --> stackNode["呼叫堆疊"]
    style jsNode fill:#e3f2fd
    style webNode fill:#fff3e0
    style queueNode fill:#fce4ec
    style loopNode fill:#f3e5f5
    style stackNode fill:#e8f5e9
{% endmermaid %}

```html 04-js/pages/151-js-queue.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>任務佇列</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log('開始');
      setTimeout(() => {
        console.log('計時器');
      }, 0);
      console.log('結束');
    </script>
  </body>
</html>
```

**解析**

- 第 1 步：堆疊執行第一行，印出「開始」。
- 第 2 步：執行 `setTimeout`，回呼交給瀏覽器計時。延遲 0，所以瀏覽器馬上把它放進任務佇列，但這時還輪不到它。
- 第 3 步：同步程式繼續執行，印出「結束」，這段程式才算結束。
- 第 4 步：堆疊空了，事件迴圈從任務佇列取出回呼，放上堆疊。
- 第 5 步：回呼執行，印出「計時器」，所以它排在「開始」與「結束」之後。
- 前面的卡住實驗也是同樣原因：函式 3 秒都沒結束，堆疊一直不空，佇列裡的回呼就一直等。

```text
開始
結束
計時器
```

#### 微任務優先

任務佇列之外還有一條更優先的佇列。這一節看它排在哪裡。Promise 的寫法後面才學，這裡先認得 Promise 的 `then` 回呼也走這一條。

**一覽**

- 同步程式：直接在呼叫堆疊上執行，最先做完。
- 微任務（microtask）：每次堆疊清空後，事件迴圈先把微任務整批做完。`queueMicrotask` 用來排入微任務，Promise 的 `then` 回呼也屬於這一批。
- 任務（task）：`setTimeout` 這類回呼，等微任務都清空，才取出一個執行。

**觀念**

微任務執行時如果又排了新的微任務，新的也算在這一批，會一起做完，任務佇列才有機會被取用。因此 Promise 的回呼會早於同一時間點的 `setTimeout`。

```html 04-js/pages/153-js-micro.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>微任務優先</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log('同步');
      queueMicrotask(() => {
        console.log('微任務');
      });
      setTimeout(() => {
        console.log('任務');
      }, 0);
      console.log('同步結束');
    </script>
  </body>
</html>
```

**解析**

- 「同步」和「同步結束」都是同步程式，堆疊還沒空，所以先印完。
- `queueMicrotask` 把「微任務」排進微任務佇列，`setTimeout` 把「任務」排進任務佇列。
- 堆疊清空後，事件迴圈先清微任務，所以「微任務」比「任務」早，即使計時器的延遲是 0。

```text
同步
同步結束
微任務
任務
```

## 回呼函式

回呼是把函式交給別人，等條件到了再呼叫。上一節的計時器已經這樣做，這一節把它寫成自己的函式，再看多個非同步步驟接在一起時，程式會變成什麼樣子。

### callback 寫法

非同步的函式沒辦法直接把結果回傳給呼叫的人，常見做法是多收一個函式當參數，完成時用結果呼叫它。這一節用 `loadName` 示範這個寫法。

**觀念**

`loadName` 自己不決定怎麼使用名字，它只負責晚一點呼叫你傳進來的函式。慣例上，這個函式放在最後一個參數。

呼叫端把函式傳進去之後，主程式繼續往下走，所以「已登記」會比名字更早出現。

```html 04-js/pages/154-js-callback.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>callback</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const done = (name) => {
        console.log(name);
      };

      const loadName = (callback) => {
        setTimeout(() => {
          callback('小安');
        }, 10);
      };

      console.log('開始');
      loadName(done);
      console.log('已登記');
    </script>
  </body>
</html>
```

**解析**

- 「開始」與「已登記」是同步程式，先印出來。
- `done` 被當成參數傳進 `loadName`，傳進去的當下並沒有執行。
- 約 10 毫秒後，計時器呼叫 callback，Console 才出現「小安」。
- 名字是回呼收到的參數，不是 `loadName` 的回傳值；`loadName` 沒有 `return`，呼叫它的那一行拿不到名字。

```text
開始
已登記
小安
```

### 巢狀地獄

下一步要用上一步的結果時，只能把下一步寫在上一步的回呼裡面。這一節串三個步驟，看程式的形狀怎麼變化。

**觀念**

每一步都等自己的計時器，完成後才呼叫下一步。執行順序仍然是第一、第二、第三步，但程式碼不是往下加一行，而是一層包一層往右縮排。

層數一多，這種寫法會很難讀，俗稱巢狀地獄（callback hell）。每一層若還要各自處理失敗，更容易出錯。Promise 就是為了解決這個問題而出現，下一章開始介紹。

```html 04-js/pages/155-js-nest.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>巢狀地獄</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const addOne = (number, callback) => {
        setTimeout(() => {
          callback(number + 1);
        }, 10);
      };

      addOne(0, (first) => {
        console.log(first);
        addOne(first, (second) => {
          console.log(second);
          addOne(second, (third) => {
            console.log(third);
          });
        });
      });
    </script>
  </body>
</html>
```

**解析**

- `addOne` 是前面 callback 寫法的應用：計算完成後，用結果呼叫傳進來的函式。
- 第一層先拿到 1 並印出，才在裡面呼叫第二層，第二層拿到的是上一層的結果。
- 三個計時器是接力，不是同時開始，所以總等待時間是三段相加，約 30 毫秒。
- 最內層的 `third` 要往右縮三層才寫得到；要插入或調整一個步驟，就得改動整個巢狀結構。

```text
1
2
3
```

# Promise

Promise 是一個代表未來結果的物件：現在還拿不到值，但可以先排好成功時做什麼、失敗時做什麼。這一章先學同步程式碼怎麼接住與主動丟出錯誤，因為 Promise 的失敗就是建立在這套機制上。接著看 Promise 的建立與三種狀態，再把上一章的巢狀回呼改寫成向下接的鏈，最後學怎麼同時等好幾件工作。

## 錯誤處理基礎

程式執行到一半出錯，預設會整段停住。這一節先學兩件事：用 try 與 catch 接住錯誤，讓程式能繼續；用 throw 在語言不會報錯的地方，自己把錯誤丟出來。

### try 與 catch

可能出錯的幾行放進 try，出錯就跳到 catch 處理。try 裡剩下的行不會再跑，catch 結束後，外面的程式照常繼續。

**觀念**

- 出錯時立刻離開 `try`，`catch` 的參數就是錯誤物件，用 message 可以讀到說明文字。

- 它接得住執行到那一行才發生的錯誤。語法寫錯的程式在執行前就會整份失敗，要直接改掉那一行。

```html 04-js/pages/77-js-try.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>try 與 catch 的基本結構</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function readName(record) {
        try {
          return record.name.toUpperCase();
        } catch (error) {
          console.error(error.message);
          return '無法讀取';
        }
      }

      console.log(readName({ name: 'amy' }));
      console.log(readName(null));
      console.log('程式繼續');
    </script>
  </body>
</html>
```

**解析**

- 有 name 的物件會把字母改成大寫，印出 AMY。
- null 沒有 name 可讀，會出錯。catch 把 message 用錯誤層級印出，函式改回傳「無法讀取」。
- 最後一行仍會印出，表示錯誤已被接住，外面的程式沒有停。

```text
AMY
Cannot read properties of null (reading 'name')
無法讀取
程式繼續
```

### throw 與錯誤物件

有些情況語言不會當成錯誤，例如除以 0 只會得到 Infinity，下一行照樣執行。這時要自己用 throw 把錯誤丟出去，最近的 catch 才接得到。丟出的若是用 `new Error` 建立的標準錯誤物件，就能讀到 name 與 message；丟出字串雖然也會進 catch，卻沒有這些資訊。

**觀念**

- `throw` 會立刻離開目前的函式，一路往外找最近的 catch。

- `throw new Error('訊息')` 建立並丟出標準錯誤物件。name 預設是 Error，message 是傳入的字串。

- 丟出字串或數字不會報錯，但 catch 拿到的只是那個值，沒有 name 與 message。

```html 04-js/pages/79-js-throw.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>主動拋出錯誤</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function divide(a, b) {
        if (b === 0) {
          throw new Error('除數不能為 0');
        }
        return a / b;
      }

      try {
        console.log(divide(10, 2));
        console.log(divide(10, 0));
        console.log('這行不會印');
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
      }

      console.log('程式繼續');

      try {
        throw '不是 Error 物件';
      } catch (error) {
        console.log(typeof error);
        console.log(error.name);
        console.log(error.message);
      }
    </script>
  </body>
</html>
```

**解析**

- 10 除以 2 得到 5。除以 0 時 divide 主動丟錯，try 裡的下一行不會跑。
- catch 印出 name 與 message。外面的「程式繼續」仍會執行，因為錯誤已經被接住。
- 第二個 try 丟出的是字串，所以 typeof 印出 string，name 與 message 都是 undefined。實務上丟錯一律用 Error 物件。

```text
5
Error
除數不能為 0
程式繼續
string
undefined
undefined
```

## 建立與使用

Promise 用 `new Promise` 建立。這一節先看 Promise 在什麼時候是什麼狀態，再學 then、catch、finally 三個方法怎麼接收結果。

### 三種狀態

Promise 的狀態只有三種：待定（pending）、已完成（fulfilled）、已拒絕（rejected）。它只會從待定走向其中一個終點，定案之後再呼叫 resolve 或 reject 都不會改寫結果。建立時傳入的函式稱為執行器，它的兩個參數就是 resolve 與 reject。

{% mermaid graph LR %}
pendingNode["pending 待定"] --> fulfilledNode["fulfilled 已完成"]
pendingNode --> rejectedNode["rejected 已拒絕"]
{% endmermaid %}

**一覽**

- `resolve(值)` 把 Promise 收成已完成並帶上值，之後的 then 會收到它。
- `reject(原因)` 把 Promise 收成已拒絕並帶上原因，之後的 catch 會收到它，原因通常是 Error 物件。

**觀念**

- 執行器同步執行，所以它的輸出會比外面後面的同步程式更早。

- then 的回呼不會立刻跑，而是排進微任務佇列（等這一輪同步程式結束後才執行的待辦），因此輸出排在同步程式之後。

- 第二個 Promise 第一次 resolve 就定案，後面的 resolve 與 reject 都被忽略。

```html 04-js/pages/156-js-promise.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>三種狀態</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      new Promise((resolve) => {
        console.log('執行器');
        resolve('完成');
      }).then((value) => {
        console.log(value);
      });
      console.log('同步結束');

      new Promise((resolve, reject) => {
        resolve('第一次');
        resolve('第二次');
        reject(new Error('太晚'));
      }).then((value) => {
        console.log(value);
      });
    </script>
  </body>
</html>
```

**解析**

- 執行器在 new Promise 的當下就跑，所以「執行器」先印，接著才是「同步結束」。
- 「完成」排在同步結束之後，因為 then 的回呼要等微任務。
- 第二個 Promise 第一次 resolve 就變成已完成，之後的 resolve 不改值，reject 也不會把狀態改成已拒絕，所以不會有錯誤跑出來。

```text
執行器
同步結束
完成
第一次
```

### then、catch、finally

這三個方法都會回傳一個新的 Promise，所以可以一個接一個往下串。

**一覽**

- `then` 在已完成時呼叫回呼，回呼收到完成的值。回呼回傳的值會成為下一環的完成值。
- `catch` 在已拒絕時呼叫回呼，用來接住前面丟出的錯誤或拒絕原因。
- `finally` 不論成功或失敗都會呼叫回呼，回呼沒有參數，只負責收尾；它不改變原本的結果，除非回呼自己丟出錯誤。

**觀念**

已拒絕的 Promise 會跳過 then，直接進到最近的 catch。finally 接在最後，成功或失敗都會跑，適合收掉「讀取中」這種一定要結束的狀態。

```html 04-js/pages/157-js-then.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>then、catch、finally</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      new Promise((resolve, reject) => {
        reject(new Error('讀取失敗'));
      })
        .then((value) => {
          console.log(value);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          console.log('收尾');
        });
    </script>
  </body>
</html>
```

**解析**

- reject 讓 Promise 變成已拒絕，then 的回呼不會執行。
- catch 收到的是 Error 物件，這裡只印它的 message。
- finally 不看成功或失敗，所以收尾一定會出現。
- 若拿掉 catch，這個拒絕就沒有人接，finally 仍會執行，但 Console 會多出一行紅色的未處理拒絕（Uncaught (in promise)）。

```text
讀取失敗
收尾
```

## 串接與錯誤

鏈的價值有兩個：每一步把結果交給下一步，錯誤則集中在一個地方處理。這一節先看值怎麼往下傳，再看中間出錯時後面的 then 怎麼被跳過，最後把巢狀回呼改寫成同一條鏈。

### 鏈式傳值

then 回呼 return 的一般值，會成為下一個 then 的參數。若 return 的是另一個 Promise，鏈會停下來等它完成，再把它的值交給下一環。

**觀念**

- `Promise.resolve(值)` 直接做出一個已完成的 Promise，常用來當作鏈的起點。

- 第一環把 1 加成 2，第二環回傳一個 10 毫秒後才完成的 Promise。最後印出的 3 要等那個 Promise resolve 之後才算得出來。

```html 04-js/pages/158-js-chain.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>鏈式傳值</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const wait = (value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(value);
          }, 10);
        });
      };

      Promise.resolve(1)
        .then((n) => n + 1)
        .then((n) => wait(n + 1))
        .then((n) => {
          console.log(n);
        });
    </script>
  </body>
</html>
```

**解析**

- 第一個 then 回傳 2，這個數字直接成為下一環的參數。
- 第二個 then 回傳的是 Promise，鏈等它 resolve 之後，把 wait 裡交出的 3 往下傳。
- 最後一環印出 3，大約在 10 毫秒之後。

```text
3
```

### 集中錯誤處理

鏈上任何一環丟出錯誤，或回傳一個已拒絕的 Promise，後面的 then 都會被跳過，直到遇到 catch。catch 若沒有再丟出錯誤，它回傳的 Promise 就是已完成的，後面還能繼續接。

**觀念**

第二步用 throw 丟出錯誤，緊接在後的 then 不會跑。`catch` 印出訊息之後，鏈恢復成已完成，所以最後的「繼續」仍會印。

```html 04-js/pages/159-js-error.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>集中錯誤處理</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      Promise.resolve()
        .then(() => {
          throw new Error('第二步失敗');
        })
        .then(() => {
          console.log('跳過');
        })
        .catch((error) => {
          console.log(error.message);
        })
        .then(() => {
          console.log('繼續');
        });
    </script>
  </body>
</html>
```

**解析**

- 在 then 裡 throw，效果和 reject 相同，這一環回傳的 Promise 變成已拒絕。
- 印出「跳過」的 then 排在 catch 前面，所以不會執行。
- catch 接住錯誤並印出 message。它沒有再 throw，鏈就恢復成已完成，最後的 then 才能執行，收尾工作因此也可以寫在 catch 後面。
- 若 catch 裡再 throw 同一個錯誤，後面的 then 會繼續被跳過，錯誤交給更後面的 catch。

```text
第二步失敗
繼續
```

### 改寫巢狀回呼

上一章用巢狀回呼串三個步驟，程式會一層一層往右縮。改成 Promise，每一步回傳 Promise，下一步接在 then 裡，鏈尾只要一個 catch。時間仍是三段相加，因為下一步要等上一步完成才開始。

**觀念**

step 等 10 毫秒後印出標籤並 resolve。每個 then 都 return 下一個 step，所以程式由上往下讀，形狀不再往右縮。

```html 04-js/pages/160-js-flat.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>改寫巢狀地獄</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const step = (label) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log(label);
            resolve(label);
          }, 10);
        });
      };

      step('第一步')
        .then(() => step('第二步'))
        .then(() => step('第三步'))
        .catch((error) => {
          console.log(error.message);
        });
    </script>
  </body>
</html>
```

**解析**

- 第一步的計時器先開始，第二步要等它 resolve 之後才建立。
- then 的回呼要 return 下一個 Promise，鏈才會等待那 10 毫秒；忘了 return，下一環不會等。
- 若某一步改成 reject，後面的步驟不會開始，原因會進到最後的 catch。
- 和巢狀回呼比，差別在形狀：步驟往下加，錯誤處理只留在鏈尾一處。

```text
第一步
第二步
第三步
```

## 組合方法

有時要等的不是一步，而是好幾件同時開始的工作。組合方法接收一個 Promise 陣列，回傳另一個 Promise，差別在怎樣算結束。

**一覽**

- `Promise.all` 等全部成功，結果是依陣列順序排列的值；任一件失敗就立刻失敗。
- `Promise.allSettled` 等全部結束，不論成功或失敗，永遠回傳已完成，結果記錄每件的狀態。
- `Promise.race` 取最先結束的那一件，成功或失敗都算（選讀）。
- `Promise.any` 取第一個成功的，全部失敗才失敗（選讀）。

### Promise.all 與 allSettled

這兩個方法讓好幾件工作同時進行，結果的順序跟你放進陣列的順序相同，跟誰先完成無關。差別在有人失敗時：all 整組跟著失敗，allSettled 則把成功與失敗都收集起來。

**觀念**

- `Promise.all` 一有拒絕就立刻拒絕，只拿得到第一個失敗原因，其他工作不會被取消，只是結果不再交給你。

- `Promise.allSettled` 的結果是陣列，每一格有 status，成功時另有 value，失敗時另有 reason。

task 用計時器模擬快慢與失敗。第一組兩件都成功，乙雖然比較快，仍排在甲後面。第二組乙失敗，all 馬上拒絕；第三組同樣的情況，allSettled 仍然完成。

```html 04-js/pages/161-js-all.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Promise.all 與 allSettled</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const task = (name, ms, fail) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (fail) reject(new Error(name));
            else resolve(name);
          }, ms);
        });
      };

      Promise.all([task('甲', 20, false), task('乙', 10, false)]).then((list) => {
        console.log(list.join(','));
      });

      Promise.all([task('甲', 20, false), task('乙', 10, true)]).catch((error) => {
        console.log('all 失敗：' + error.message);
      });

      Promise.allSettled([task('甲', 20, false), task('乙', 10, true)]).then((list) => {
        list.forEach((item) => {
          console.log(item.status);
        });
      });
    </script>
  </body>
</html>
```

**解析**

- 第二組在 10 毫秒乙失敗時就拒絕，所以「all 失敗：乙」最先印出，不必等甲。
- 第一組要等到 20 毫秒甲完成，結果依陣列順序是「甲,乙」，不是誰先做完誰排前面。
- 第三組不會因為乙失敗而拒絕，等兩件都結束後，依序印出 fulfilled 與 rejected。
- 要知道哪一件失敗，就用 allSettled；只要有一件失敗就整組作廢，就用 all。

```text
all 失敗：乙
甲,乙
fulfilled
rejected
```

### 選讀：Promise.race 與 any

這兩個方法不等全部，只關心誰先到終點。race 連失敗也算到達，any 只把成功當成到達。

**觀念**

- `Promise.race` 回傳最先結束的那一件的結果，成功或失敗都算。其他工作仍會繼續跑，只是結果被忽略。

- `Promise.any` 回傳第一個成功的值。全部都失敗時才拒絕，錯誤的名稱是 AggregateError。

慢的那件要 30 毫秒，快的 10 毫秒就完成，所以 race 印出「快」。any 先遇到一件失敗，會略過它，等後面那件成功。第三組兩件都失敗，才印出 AggregateError。

```html 04-js/pages/162-js-race.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Promise.race 與 any</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const task = (name, ms, fail) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (fail) reject(new Error(name));
            else resolve(name);
          }, ms);
        });
      };

      Promise.race([task('慢', 30, false), task('快', 10, false)]).then((name) => {
        console.log(name);
      });

      Promise.any([task('失敗', 5, true), task('成功', 15, false)]).then((name) => {
        console.log(name);
      });

      Promise.any([task('甲', 5, true), task('乙', 10, true)]).catch((error) => {
        console.log(error.name);
      });
    </script>
  </body>
</html>
```

**解析**

- race 在 10 毫秒就有結果，慢的那件 30 毫秒後仍會 resolve，只是沒有人再接收。若最快的那件是失敗，race 就跟著失敗。
- 第二組的失敗發生得更早，any 不會因此結束，所以 15 毫秒時成功仍能印出。
- 第三組在 10 毫秒時所有工作都失敗，catch 拿到 AggregateError，所以它排在「成功」前面。

```text
快
AggregateError
成功
```

## 選讀：把計時器與圖片載入包成 Promise

計時器與圖片載入原本都是用回呼通知結果。包成 Promise 之後，才能放進前面的鏈，也能用 async/await 等待。這一節把兩種「晚一點才知道結果」的工作收成同一個形狀。

**一覽**

- `wait` 包住 setTimeout，時間到就 resolve。它沒有失敗的情況，所以不需要 reject。
- `loadImage` 用 Image 建立圖片物件（不必放進頁面也會載入），聽它的 load 與 error 事件，成功時 resolve 那個圖片物件，失敗時 reject。

**觀念**

先等 10 毫秒印出「等完」，再載入一張內嵌的 1×1 圖。圖片位址是 data URI（把圖檔內容直接寫成一串文字），不需要另外的檔案。載入成功後印出 naturalWidth，也就是圖片檔本身的寬度，這裡是 1。

```html 04-js/pages/163-js-wrap.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：計時器與圖片</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const wait = (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      };

      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.addEventListener('load', () => resolve(image));
          image.addEventListener('error', () => reject(new Error('圖片載入失敗')));
          image.src = src;
        });
      };

      const tiny =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

      wait(10)
        .then(() => {
          console.log('等完');
          return loadImage(tiny);
        })
        .then((image) => {
          console.log(image.naturalWidth);
        });
    </script>
  </body>
</html>
```

**解析**

- setTimeout 的回呼直接設成 resolve，時間一到 Promise 就完成。
- 圖片先掛好 load 與 error 的監聽，再指定 src，這是避免漏接事件的慣用順序。
- load 時 resolve 的是圖片物件，所以下一環讀得到 naturalWidth。
- error 時拒絕的原因是 Error 物件。這張 data URI 能正常載入，不會走到拒絕。

```text
等完
1
```

# async 與 await

async 與 await 是 Promise 的另一種寫法：把「等結果出來再接著做」寫成由上往下的一般程式，不必再串一長排 then。這一章先看基本寫法與錯誤處理，再學多件工作該依序等還是同時等。

## 基本寫法

兩個關鍵字各管一件事：async 決定函式回傳什麼，await 決定函式在哪裡等。這一節先看執行順序，再看等到的是失敗時怎麼接住。

### async 函式與 await

**一覽**

- `async` 寫在函式前面，這支函式一定回傳 Promise。函式 return 的值，會成為 Promise 完成時的值；函式拋出的錯誤，會讓 Promise 被拒絕。
- `await` 寫在 Promise 前面，在一般 script 裡只能用在 async 函式裡面（ES module 的最外層也能用，見 {% post_link lokiTech-15day-06-js-basics %} 的「選讀：ES Module」）。它暫停所在的這支函式，等 Promise 完成後取出值，再往下執行。

**觀念**

await 暫停的只有所在的那支函式，不是整個分頁。呼叫 async 函式的那一列會立刻拿到 Promise，外面的程式與畫面上的點擊都照常執行。

```html 04-js/pages/164-js-async.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>async 函式與 await</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const wait = (ms) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(ms), ms);
        });
      };

      const run = async () => {
        console.log('開始');
        const ms = await wait(10);
        console.log(ms);
        return '完成';
      };

      const result = run();
      console.log('已呼叫', result);
      result.then((value) => console.log(value));
    </script>
  </body>
</html>
```

**解析**

- async 函式被呼叫後，先同步執行到第一個 await 為止，所以「開始」最先印出。
- 函式在 await 停住後，控制權回到外面，所以「已呼叫」早於 10。
- 已呼叫那一行印出的是 Promise，表示 run 還沒結束；await 取得的值則是傳進 resolve 的 10。
- return 的『完成』成為 Promise 的結果，要靠 then 才拿得到。

```text
開始
已呼叫 Promise { <pending> }
10
完成
```

本章的輸出區塊只列出文字內容，與 Console 實際畫面略有不同，例如 Console 會顯示成 `Promise {<pending>}`。

### async 函式的錯誤處理

await 的 Promise 被拒絕時，效果等於那一行直接拋出錯誤。所以接住的方法就是前面「錯誤處理基礎」學過的 try、catch 與 finally，不需要另一套語法，只是 try 裡面多了 await。

**觀念**

- 不包 try 時，錯誤會讓這支 async 函式回傳的 Promise 被拒絕。這個 Promise 若沒有人接，Console 會出現紅字的 Uncaught (in promise)。
- 也可以由呼叫端接，在 run 回傳的 Promise 後面接 catch，做法見 Promise 章的「集中錯誤處理」。

```html 04-js/pages/165-js-try.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>async 函式的錯誤處理</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const fail = async () => {
        throw new Error('失敗');
      };

      const run = async () => {
        try {
          await fail();
          console.log('不會到');
        } catch (error) {
          console.log(error.message);
        } finally {
          console.log('收尾');
        }
      };

      run();
    </script>
  </body>
</html>
```

**解析**

- fail 拋出的錯誤拒絕了它回傳的 Promise，await 把拒絕變成 run 裡的例外，所以進 catch。
- 「不會到」寫在 await 之後，且在同一個 try 裡，這次被跳過。
- finally 在 catch 之後執行，不論有沒有出錯都會跑。

```text
失敗
收尾
```

## 依序與並行

await 寫在下一行，就會等上一行結束才開始下一件。兩件工作若彼此不依賴，卻寫成上下兩行 await，總時間會變成相加，而不是取較慢的那一件。這一節比較兩種形狀，再看迴圈裡的 await。

### 依序等待與 Promise.all

連續兩行 await 是依序，第二件要等第一件結束才開始。Promise.all 則在同一刻開始陣列裡的全部工作，總時間看最慢的那一件，回傳值是依陣列順序排列的結果陣列。

**觀念**

四個計時器都是 20 毫秒。依序乙要等依序甲完成才開始，所以最晚出現；其他三個同時開始，所以先出現。兩件工作若互相不依賴，用 Promise.all 同時跑；後一件要用前一件的結果時，才寫成上下兩行 await。

```html 04-js/pages/166-js-parallel.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>依序等待與 Promise.all</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const task = (name, ms) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log(name);
            resolve(name);
          }, ms);
        });
      };

      const oneByOne = async () => {
        await task('依序甲', 20);
        await task('依序乙', 20);
      };

      const together = async () => {
        await Promise.all([task('並行甲', 20), task('並行乙', 20)]);
        console.log('並行結束');
      };

      oneByOne();
      together();
    </script>
  </body>
</html>
```

**解析**

- 依序甲、並行甲、並行乙三個計時器一開始就登記，約 20 毫秒時連續出現。
- 並行結束寫在 await Promise.all 的下一行，要等兩件並行都完成才印。
- 依序乙的計時器在依序甲完成之後才登記，因此又晚約 20 毫秒。

```text
依序甲
並行甲
並行乙
並行結束
依序乙
```

### 迴圈裡的 await

迴圈搭配 await 有三種寫法，行為各不相同。

**一覽**

- `for...of` 搭配 await：一圈等完才進下一圈，依序執行。
- `map` 搭配 Promise.all：map 立刻呼叫全部，得到 Promise 陣列，Promise.all 再等全部完成，並行執行。
- `forEach`：它不看回呼的回傳值，回呼裡的 await 只暫停回呼自己，迴圈本身不會停，forEach 的下一行也等不到結果，所以不適合需要等待的工作。demo 的最後一段用來驗證這一點。

**觀念**

每一件 load 要 10 毫秒。for...of 一件一件等，所以 1、2、3 各隔約 10 毫秒出現；迴圈結束後，map 一次發出三件，一次印出三個結果。最後換成 forEach，它的下一行立刻執行，這時一件都還沒完成。

```html 04-js/pages/167-js-for-await.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>迴圈裡的 await</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const ids = [1, 2, 3];

      const load = (id) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(id), 10);
        });
      };

      const run = async () => {
        for (const id of ids) {
          const value = await load(id);
          console.log(value);
        }
        const all = await Promise.all(ids.map((id) => load(id)));
        console.log(all.join(','));

        const done = [];
        ids.forEach(async (id) => {
          done.push(await load(id));
        });
        console.log(done.length);
      };

      run();
    </script>
  </body>
</html>
```

**解析**

- for...of 的每一圈都等到 load 完成，所以數字是一個一個出現。
- map 立刻把三個 load 都呼叫起來，Promise.all 再等最慢的那件。
- 結果仍是 1、2、3，因為 Promise.all 依陣列順序交回結果，不依完成先後。
- forEach 的回呼各自在 await 停住，迴圈不會等它們，所以緊接著的 done.length 是 0，結果還沒放進去。

```text
1
2
3
1,2,3
0
```

# JSON

JSON 是一種純文字格式，全名 JavaScript Object Notation，用來讓程式與程式之間交換資料。它長得像物件實字，規則卻嚴格得多。後面的 Fetch 常用它傳資料，Web Storage 則只能存文字，所以這一章先學物件與 JSON 文字怎麼互相轉換。

## JSON 格式

JSON 只描述資料，不描述程式。這一節先看文字要符合什麼規則，再看兩個轉換方法，以及哪些值在轉換時會消失或改變。

### 語法規則與常見錯誤

JSON 的規則比物件實字嚴格，所以順手把物件實字貼進去，常常就失敗。JSON.parse 只接受合法的 JSON 文字，不合法就拋出 SyntaxError，不會回傳修到一半的結果。

**觀念**

- 鍵與字串都要用雙引號，單引號或沒有引號的鍵不合法。
- 不能寫註解，最後一項後面也不能留逗號。
- 值只能是物件、陣列、字串、數字、布林與 null；函式、undefined、NaN 都不是 JSON。
- parse 失敗是執行期錯誤，要用 try 與 catch 接住，寫法見前面的「錯誤處理基礎」。

```html 04-js/pages/168-js-json-rule.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JSON 語法規則與常見錯誤</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const texts = [
        '{"name":"小安"}',
        "{ name: '小安' }",
        '{"name":"小安",}',
      ];

      for (const text of texts) {
        try {
          const data = JSON.parse(text);
          console.log('成功', data.name);
        } catch (error) {
          console.log(error.name + '：' + error.message);
        }
      }
    </script>
  </body>
</html>
```

**解析**

- 第一段文字合法，所以印出成功與名字。
- 第二段鍵沒有引號、字串用單引號，第三段多了尾端逗號，兩段都拋出 SyntaxError，由 catch 印出名稱與訊息。
- 訊息會指出出錯的位置（從 0 起算的第幾個字元）。訊息的措辭隨瀏覽器引擎與版本而不同，讀位置比背文字有用。

```text
成功 小安
SyntaxError：Expected property name or '}' in JSON at position 2 (line 1 column 3)
SyntaxError：Expected double-quoted property name in JSON at position 13 (line 1 column 14)
```

### JSON.parse 與 JSON.stringify

兩個方法方向相反，一個把文字變回值，一個把值收成文字。

**一覽**

- `JSON.parse`：接收字串，回傳物件、陣列或基本值；字串不合法時拋出 SyntaxError。
- `JSON.stringify`：接收值，回傳字串；預設不加空白，整段擠成一行。

**觀念**

物件先收成文字，再還原成物件。還原出來的是全新的物件，內容相同，但不是原來那一個，所以改其中一個不會影響另一個。

```html 04-js/pages/169-js-json.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JSON.parse 與 JSON.stringify</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const note = { title: '讀書', done: false };
      const raw = JSON.stringify(note);
      const back = JSON.parse(raw);
      console.log(raw);
      console.log(back.title);
      console.log(back !== note);
    </script>
  </body>
</html>
```

**解析**

- raw 是字串，所以第一行看得到大括號與雙引號，它已經不是物件。
- back.title 是讀書，表示文字裡的欄位被還原了。
- back !== note 是 true，表示 parse 做出了新物件。

```text
{"title":"讀書","done":false}
讀書
true
```

### 不會原樣保留的值

JSON 只認得前面列出的幾種值。物件裡有其他東西時，stringify 不會報錯，而是悄悄省略或改寫，還原後就和原物件不一樣。

**觀念**

- 物件裡的 undefined 與函式，整個鍵會被省略。
- 陣列裡的 undefined 與函式，會變成 null，因為陣列要保住位置。
- NaN 與 Infinity 變成 null。
- 日期物件變成 ISO 8601 格式的字串，parse 不會自動變回日期（日期物件見 {% post_link lokiTech-15day-06-js-basics %} 的「選讀：內建物件」）。
- 物件自己指回自己（循環參照）或含有 BigInt 時，stringify 會直接拋出 TypeError。

```html 04-js/pages/169b-js-json-lost.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>stringify 不會保留的值</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const note = {
        title: '讀書',
        memo: undefined,
        score: NaN,
        tags: ['a', undefined],
        created: new Date('2026-01-15T08:00:00Z'),
        say() {},
      };

      const raw = JSON.stringify(note);
      console.log(raw);

      const back = JSON.parse(raw);
      console.log(typeof back.created);
      console.log('memo' in back, 'say' in back);
    </script>
  </body>
</html>
```

**解析**

- memo 與 say 兩個鍵都不見了，還原後用 in 檢查，結果都是 false。
- score 變成 null，tags 裡的 undefined 也變成 null，陣列長度不變。
- created 在文字裡是字串，還原後 typeof 仍是 string，要用日期時須自己轉。

```text
{"title":"讀書","score":null,"tags":["a",null],"created":"2026-01-15T08:00:00.000Z"}
string
false false
```

{% note info %}
**replacer 與 reviver**
stringify 的第二個參數可以是函式，逐一決定每個值怎麼寫出；parse 的第二個參數也是函式，在還原時逐一改寫。要把日期字串變回日期，可以這樣寫：

```js
JSON.parse(raw, (key, value) => (key === 'created' ? new Date(value) : value));
```
{% endnote %}

## 轉換與應用

格式與轉換方法都學完了，這一節把它們接回畫面：從一段 JSON 文字畫出清單，再把程式裡的狀態收成文字。Fetch 之前，資料都先用自己準備的字串代替。

### 從文字還原資料

伺服器或檔案給你的往往是一段文字。先 parse 成陣列，再用 DOM 一筆一筆建立清單項目。外部來的資料可能含有 HTML 標籤，所以放進畫面時用 textContent 當成文字顯示，不要拼成 HTML 字串。

**觀念**

raw 是陣列文字，兩筆各有名字與價格。parse 之後用迴圈為每一筆建立一個清單項目，並把名字印到 Console 對照。

```html 04-js/pages/170-js-json-read.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>從文字還原資料</title>
  </head>
  <body>
    <ul id="list"></ul>
    <script>
      const raw = '[{"name":"筆","price":25},{"name":"紙","price":40}]';
      const items = JSON.parse(raw);
      const list = document.querySelector('#list');

      items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.name + ' ' + item.price;
        list.append(li);
        console.log(item.name);
      });
    </script>
  </body>
</html>
```

**解析**

- 頁面上出現兩列：「筆 25」與「紙 40」；Console 只印名字，價格留在畫面上。
- raw 用雙引號，所以 parse 成功，items 的長度是 2。
- 若 raw 少一個括號，parse 會拋出錯誤，這支 script 在那一行停下，清單會是空的。實務上會用 try 與 catch 包住。

```text
筆
紙
```

### 把資料收成文字

要存起來或送出去之前，物件得先收成文字。stringify 的第三個參數指定縮排的空格數，讓文字換行排版，方便人讀；中間的第二個參數這裡用不到，先填 null。

**觀念**

狀態只有標題與是否完成。縮排版本放進畫面上的 pre，精簡版本與它的型別印在 Console，確認它是字串而不是物件。

```html 04-js/pages/171-js-json-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>把資料收成文字</title>
  </head>
  <body>
    <pre id="out"></pre>
    <script>
      const state = { title: '讀書', done: false };
      const compact = JSON.stringify(state);
      const pretty = JSON.stringify(state, null, 2);

      document.querySelector('#out').textContent = pretty;
      console.log(compact);
      console.log(typeof compact);
    </script>
  </body>
</html>
```

**解析**

- 頁面上的 pre 顯示四行縮排的 JSON（含頭尾兩個大括號），因為 pre 會保留換行與空白。
- Console 第一行是不縮排的精簡版，兩者內容相同，只差排版。
- 精簡版的 typeof 是 string；縮排只增加空白與換行，不改變資料，所以傳輸與儲存通常用精簡版。

```text
{"title":"讀書","done":false}
string
```

# Fetch API

Fetch 是瀏覽器內建、用來向網址要資料或送出資料的功能，呼叫後拿到 Promise，所以前面學的非同步寫法都接得上。這一章先認識請求與回應，再讀取本地的 JSON、把資料送出去，最後把載入中、成功、失敗三種狀態畫回畫面上。

{% note info %}
**以前怎麼發請求**
早期是 XMLHttpRequest，jQuery 再把它包成 ajax。現在的標準做法是 Fetch，這一章只用 Fetch。
{% endnote %}

## 認識 HTTP

HTTP 是瀏覽器與伺服器交談的規則：瀏覽器送出請求，伺服器回傳回應。這一節先認出請求與回應各有哪些部分，並分清楚「回應的狀態碼是 404」和「請求根本沒送出去」是兩件不同的事。

### 請求與回應的組成

一次往返分成你送出去的請求，以及對方送回來的回應。這一節讀本地的使用者檔，只看狀態碼與內容類型，還不把本體解析成陣列。

{% mermaid graph LR %}
reqNode["請求：方法、網址、標頭、body"] --> serverNode["伺服器"]
serverNode --> resNode["回應：狀態碼、標頭、body"]
{% endmermaid %}

**一覽**

- 方法：這次要做什麼，讀取用 GET。
- 網址：資源在哪裡。
- 標頭：附加說明，例如內容的格式。請求與回應都有。
- body：本體，也就是真正傳送的資料。GET 不能帶 body。
- 狀態碼：回應裡的三位數字，告訴你結果。落在 200 到 299 時，`response.ok` 為 true。

這份使用者資料是本節要讀取的檔案。

```json 04-js/pages/data/users.json
[
  { "id": 1, "name": "小安", "city": "台北" },
  { "id": 2, "name": "小林", "city": "台南" }
]
```

{% note warning %}
**要從本機伺服器開啟**
直接雙擊時網址是 file://，瀏覽器會拒絕讀取旁邊的 JSON。請用 Live Server 或 Vite 這類本機伺服器開啟這一頁。
{% endnote %}

**觀念**

`fetch` 完成時先給你一個回應物件，裡面有狀態碼與標頭，本體還沒有解析。這支程式只印狀態碼、ok，以及內容類型裡有沒有 json。

```html 04-js/pages/172-js-http.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>請求與回應的組成</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        const response = await fetch('data/users.json');
        const type = response.headers.get('content-type') || '';
        console.log(response.status);
        console.log(response.ok);
        console.log(type.includes('json'));
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 網址 data/users.json 是相對路徑，會向目前這個網站要檔案，所以必須用本機伺服器開啟。
- 狀態碼 200 表示讀取成功，ok 因此是 true。
- 內容類型後面可能還接著字元集，所以只檢查有沒有 json 這個詞。
- 還沒呼叫 json() 之前，本體仍是文字，程式裡還沒有使用者陣列。

Console 輸出如下。本章的輸出區塊只列文字內容，和實際 Console 畫面（行號、顏色）略有不同。

```text
200
true
true
```

### 狀態碼分類

狀態碼用百位數分組，先看落在哪一組，再去查個別數字。這一節用存在的檔與不存在的檔，對照 200 與 404。

**一覽**

- 2xx：成功。200 是一般成功，201 常用在新增之後。
- 3xx：資源搬到別的網址，需要轉址。這一章不另外處理。
- 4xx：這次請求有問題。404 是資源不存在。
- 5xx：伺服器處理失敗。請求有送到，但對方做不完。

**觀念**

兩個請求都會完成，一個讀得到清單，一個指向不存在的檔。差別只印在狀態碼上，Promise 並不會因此拒絕。

```html 04-js/pages/173-js-status.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>狀態碼分類</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        const okRes = await fetch('data/items.json');
        const missing = await fetch('data/missing.json');
        console.log(okRes.status);
        console.log(missing.status);
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- items.json 存在，狀態碼是 200。
- missing.json 沒有這個檔，伺服器仍然回應，狀態碼是 404，屬於 4xx。
- 404 與 5xx 都是正常抵達的回應，所以 await 後照常往下執行。只有請求根本送不出去（斷線、被瀏覽器擋下）時，Promise 才會拒絕。

```text
200
404
```

## 取得資料

讀取是最常用的動作。這一節先把本體變成陣列，再學會擋下 404 之類的失敗回應，最後把條件放進網址的查詢參數。

### fetch 與 response.json

`fetch` 的 Promise 完成時，值是回應物件。`response.json()` 會再回傳一個 Promise，因為把文字解析成值也要時間，所以要等兩次。

這份商品清單是後面幾個 demo 共用的資料。

```json 04-js/pages/data/items.json
[
  { "id": 1, "name": "筆", "price": 25 },
  { "id": 2, "name": "紙", "price": 40 },
  { "id": 3, "name": "尺", "price": 15 }
]
```

**觀念**

程式先等回應，再等 json()，最後依序印出每個商品的名字。

```html 04-js/pages/174-js-fetch.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>fetch 與 response.json</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        const response = await fetch('data/items.json');
        const items = await response.json();
        items.forEach((item) => {
          console.log(item.name);
        });
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 第一個 await 結束時，手上是回應物件，還不是陣列。
- 第二個 await 結束後才是解析好的陣列，forEach 依序印出三個名字。
- 同一份回應的本體只能讀一次，再呼叫一次 json() 會出錯。

```text
筆
紙
尺
```

### 檢查 response.ok

規則是：先看 `response.ok`，不是 2xx 就自己拋出錯誤。因為 404 與 500 都是正常抵達的回應，fetch 不會替你拒絕。連不上、被瀏覽器擋下或請求被中止時，Promise 才會拒絕，這時才進 catch，而且手上沒有狀態碼。

**觀念**

load 先印狀態碼，不是 2xx 就拋出錯誤，讓 catch 統一處理。demo 先讀不存在的檔，再讀存在的檔，對照兩種結果。

```html 04-js/pages/175-js-ok.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>檢查 response.ok</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const load = async (url) => {
        try {
          const response = await fetch(url);
          console.log(response.status);
          if (!response.ok) throw new Error('狀態 ' + response.status);
          const data = await response.json();
          console.log(data.length);
        } catch (error) {
          console.log(error.message);
        }
      };

      const main = async () => {
        await load('data/missing.json');
        await load('data/items.json');
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 第一行 404 來自回應物件，代表 fetch 已經完成，不是網路失敗。
- ok 為 false 時主動 throw，後面的 json() 就不會執行，catch 印出你組出來的訊息。
- 第二次讀得到檔案，ok 為 true，沒有 throw，最後印出陣列長度。
- 若是網路失敗，catch 印的會是瀏覽器給的訊息，而且前面不會有狀態碼那一行。

```text
404
狀態 404
200
3
```

### 查詢參數

查詢參數是接在網址問號後面的條件，例如 userId=1，伺服器依它篩選資料。條件不要自己用字串黏，`URLSearchParams` 會幫你編碼，再用 `toString()` 交出查詢字串。

- `URLSearchParams`：用物件建立查詢參數，每個欄位變成一組「名稱=值」。
- `toString()`：回傳已編碼的查詢字串，不含開頭的問號，問號要自己接在路徑後面。
- 中文與空白會被編碼成 % 開頭的碼，空白變成加號，伺服器收到後會還原。

查詢參數要有伺服器理解它才有用，本地檔案做不到，所以這一節改向公開的假 API 要資料。

{% note info %}
**這是公開的假 API**
jsonplaceholder.typicode.com 是專供練習的服務，會回應讀取與寫入，但不會真的存進資料。它允許其他網站跨來源讀取，所以從本機頁面呼叫沒問題；跨來源的限制見 {% post_link lokiTech-15day-08-js-async %} 的「選讀：同源政策與 CORS」。
{% endnote %}

**觀念**

第一組參數是篩選條件，第二組只用來展示編碼結果。假 API 依 userId 回傳文章，_limit 限制筆數。

```html 04-js/pages/176-js-query.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>查詢參數</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        const query = new URLSearchParams({ userId: '1', _limit: '2' });
        console.log(query.toString());
        console.log(new URLSearchParams({ keyword: '小安 台北' }).toString());

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?' + query.toString()
        );
        const posts = await response.json();
        console.log(posts.length);
        console.log(posts[0].userId);
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 第一行是 userId=1&_limit=2，多個參數用 & 相連，開頭沒有問號。
- 第二行的中文被編碼，空白變成加號。
- 請求的網址是 posts 後面接問號再接查詢字串，伺服器只回 userId 為 1 的兩篇文章。
- 所以筆數是 2，第一筆的 userId 是 1。

```text
userId=1&_limit=2
keyword=%E5%B0%8F%E5%AE%89+%E5%8F%B0%E5%8C%97
2
1
```

## 送出資料

讀取用 GET；新增、整筆取代、改一部分、刪除，則換成別的方法，並把路徑指到同一種資源。這一節都打向同一個假 API，回應看得到，但寫入不會真的留在對方的清單裡。

### POST 送 JSON

新增時方法用 POST，路徑指向整個集合而不是某一筆。body 必須是文字，所以物件要先用 `JSON.stringify` 轉換；標頭要聲明 `Content-Type: application/json`，對方才知道要當成 JSON 解析，否則許多伺服器會讀不到欄位。

**觀念**

這支程式新增一則筆記。狀態碼 201 表示新增成功，回應裡有你送出的標題與伺服器編的新編號。

```html 04-js/pages/177-js-post.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>POST 送 JSON</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: '新筆記', body: '第一行', userId: 1 }),
        });
        const created = await response.json();
        console.log(response.status);
        console.log(created.title);
        console.log(created.id);
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 方法是 POST，路徑是 /posts，表示在文章這個集合裡新增一筆。
- headers 聲明本體是 JSON，body 是 stringify 之後的文字，不是物件。
- 201 屬於 2xx，所以 ok 為 true。回應的 JSON 帶回標題，以及伺服器給的編號 101。
- 再對 /posts 做一次 GET，不會看到這則新筆記，假 API 只模擬回應。

```text
201
新筆記
101
```

### PUT、PATCH、DELETE 與 REST

REST 是一種慣例：同一種資源用同一條路徑，動作靠方法區分，而不是 /update、/delete 這類動詞路徑。看到方法與路徑，就知道這次是讀、新增、整筆換掉、改一部分，還是刪除。

**一覽**

- GET：讀取。路徑不帶 id 是整份清單，帶 id 是單一筆。沒有 body。
- POST：在集合路徑新增一筆，body 帶新資料。
- PUT：整筆取代。路徑帶 id，body 要帶這一筆的完整內容。
- PATCH：只改一部分。路徑帶 id，body 只放要改的欄位。
- DELETE：刪除。路徑帶 id，沒有 body。

**觀念**

三個請求都指向 posts/1，方法分別是整筆取代、部分更新與刪除。

```html 04-js/pages/178-js-rest.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PUT、PATCH、DELETE 與 REST</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        const base = 'https://jsonplaceholder.typicode.com/posts/1';
        const headers = { 'Content-Type': 'application/json' };
        const putRes = await fetch(base, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ id: 1, title: '整筆更新', body: '全文', userId: 1 }),
        });
        const patchRes = await fetch(base, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ title: '只改標題' }),
        });
        const deleteRes = await fetch(base, { method: 'DELETE' });
        console.log(putRes.status);
        console.log(patchRes.status);
        console.log(deleteRes.status);
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 三個網址相同，差別在方法；路徑上的 1 指出是哪一筆文章。
- PUT 的 body 帶了標題、本文與 userId，表示整筆要長這樣；PATCH 只送 title，其他欄位維持不動。
- DELETE 沒有 body，也就不需要設定標頭。
- 假 API 三個都回 200。200 只表示這次回應成功，資料實際上沒有被改動。真實的伺服器也可能用 204（成功但沒有內容）回應刪除。

```text
200
200
200
```

### FormData 送出表單

`FormData` 可以從表單收集所有欄位。把它直接放進 fetch 的 body，瀏覽器會自己加上內容類型與分隔欄位用的邊界，所以規則是不要手動設定 Content-Type。手動設成 JSON 或自己寫的值，邊界就對不上，對方拆不開欄位。

這個 demo 打向假 API。假 API 不會解析表單欄位，所以欄位值改用頁面上的文字顯示，確認 FormData 讀得到；狀態碼只用來確認請求有送出。

**觀念**

按下送出後，攔下表單預設的整頁送出，改由 fetch 發出請求，再把欄位值與狀態碼寫回頁面。

```html 04-js/pages/179-js-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FormData 送出表單</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button, input { font: inherit; }
    </style>
  </head>
  <body>
    <form id="editor">
      <input name="name" value="小安" required />
      <button type="submit">送出</button>
    </form>
    <p id="result">按下送出後，結果顯示在這裡。</p>
    <script>
      const form = document.querySelector('#editor');
      const result = document.querySelector('#result');

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: data,
        });
        result.textContent = `欄位 name：${data.get('name')}，狀態碼：${response.status}`;
      });
    </script>
  </body>
</html>
```

**解析**

- preventDefault 先停掉表單預設的整頁送出，否則頁面會重新載入。
- 傳給 FormData 的是表單元素，它依各欄位的 name 收集值，所以 get('name') 讀到小安。
- body 直接放 FormData 物件，沒有設定標頭。
- 按下送出後，輸入框下方的文字變成「欄位 name：小安，狀態碼：201」；改輸入框的內容再送，欄位值會跟著變。

## 載入、成功與錯誤畫面

網路請求要等一段時間，畫面不能只在成功時才有內容。這一節先把「載入中、完成、失敗」三種樣子交給同一份狀態重繪，再把前面學的 fetch 與表單合成一個完整的小頁面。

本節的 demo 都用 fetch 讀取相對路徑的檔案，必須用 Live Server 這類本機伺服器開啟。直接用檔案方式（網址以 file 開頭）開啟會讀不到。

### 三種狀態的重繪

做法和上一篇的狀態重繪相同：先改狀態，再呼叫 render。狀態只記現在是哪一種，以及成功時拿到的陣列；render 依狀態寫出文字，只有成功時才畫清單。

**一覽**

- `loading`：請求還沒結束。清單先清掉，文字顯示載入中。
- `ready`：本體已經轉成陣列。這時才依陣列建立 li。
- `error`：狀態碼不成功，或請求根本沒送達。文字顯示讀取失敗，清單維持空白。

**觀念**

- 每次載入都先清空舊資料再重畫，畫面就不會殘留上一輪的項目。
- 失敗要自己判斷：伺服器回 404 時 fetch 並不會拒絕，所以要檢查 ok，不成功就丟出錯誤交給 catch。

```html 04-js/pages/180-js-loading.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>三種狀態的重繪</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button { font: inherit; }
      li { margin: 0.35rem 0; }
    </style>
  </head>
  <body>
    <p id="status"></p>
    <ul id="list"></ul>
    <button type="button" id="reload">重新載入</button>
    <script>
      const state = { status: 'loading', items: [] };
      const statusEl = document.querySelector('#status');
      const list = document.querySelector('#list');

      const render = () => {
        const label = { loading: '載入中', ready: '完成', error: '讀取失敗' };
        statusEl.textContent = label[state.status];
        list.replaceChildren();
        if (state.status !== 'ready') return;
        state.items.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item.name + ' ' + item.price;
          list.append(li);
        });
      };

      const load = async () => {
        state.status = 'loading';
        state.items = [];
        render();
        console.log(state.status);
        try {
          // 故意等 200 毫秒，讓載入中停留在畫面上
          await new Promise((resolve) => setTimeout(resolve, 200));
          const response = await fetch('data/items.json');
          if (!response.ok) throw new Error(String(response.status));
          state.items = await response.json();
          state.status = 'ready';
        } catch {
          state.status = 'error';
        }
        render();
        console.log(state.status);
        console.log(state.items.length);
      };

      document.querySelector('#reload').addEventListener('click', load);
      load();
    </script>
  </body>
</html>
```

**解析**

- 頁面一開啟就先看到載入中，接著變成完成並列出三筆。程式故意多等 200 毫秒，讓載入中停留得久一點，正式讀取時可以拿掉。
- 按下重新載入會再走一輪：清單清空、顯示載入中，然後重新讀取。
- 把網址改成不存在的檔案時，404 會進入 catch，狀態變成 error，畫面只剩讀取失敗，Console 的長度是 0。

Console 的輸出為了閱讀只列文字內容，和實際畫面（行號、顏色）略有不同。

```text
loading
ready
3
```

### 綜合練習：抓清單與新增

這個頁面同時有狀態文字、表單與清單，把前面學的 fetch 讀取、POST 與重繪合在一起。分兩步：先只把本地檔畫出來，再補上載入與失敗狀態，並在送出時把新的一筆 POST 到線上的測試用 API（jsonplaceholder）。這個測試 API 只會假裝收下資料，不會真的存起來，所以重新整理後新增的那筆會消失。

**第一步：畫出清單**

先確認檔案讀得到，畫面上有三列。這一步還沒處理表單，也沒有檢查失敗。

**觀念**

main 等 json 轉好之後，把每一筆做成 li，狀態文字寫成完成，並印出長度。

```html 04-js/pages/181-js-items.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>抓清單與新增</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button, input { font: inherit; }
      form { display: flex; gap: 0.5rem; margin: 0.75rem 0; }
      li { margin: 0.35rem 0; }
    </style>
  </head>
  <body>
    <p id="status"></p>
    <form id="editor" novalidate>
      <input name="name" required placeholder="名稱" />
      <input name="price" required placeholder="價格" />
      <button type="submit">新增</button>
    </form>
    <ul id="list"></ul>
    <script>
      const statusEl = document.querySelector('#status');
      const list = document.querySelector('#list');

      const main = async () => {
        const response = await fetch('data/items.json');
        const items = await response.json();
        statusEl.textContent = '完成';
        items.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item.name + ' ' + item.price;
          list.append(li);
        });
        console.log(items.length);
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 畫面出現完成與三列文字，每列是名稱、空白、價格，資料來自 items.json。
- 這一版假設檔案一定讀得到，沒有檢查 ok，也沒有載入中的文字。
- 此時按新增，表單會以傳統方式整頁送出，頁面重新載入。第二步才改由 fetch 處理。
- Console 的 3 用來對照畫面上的列數。

```text
3
```

**第二步：補上狀態與新增**

載入時先進入 loading，成功才畫清單，失敗就留下讀取失敗。送出表單時先檢查輸入，再把名稱與價格 POST 出去，回應成功才把新的一筆推進 state 並重畫。

**觀念**

load 先印 loading，成功後印 ready 與 3。之後每新增一筆，會再印出那一筆的名稱。

```html 04-js/pages/181-js-items.html.final
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>抓清單與新增</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button, input { font: inherit; }
      form { display: flex; gap: 0.5rem; margin: 0.75rem 0; }
      li { margin: 0.35rem 0; }
    </style>
  </head>
  <body>
    <p id="status"></p>
    <form id="editor" novalidate>
      <input name="name" required placeholder="名稱" />
      <input name="price" required placeholder="價格" />
      <button type="submit">新增</button>
    </form>
    <ul id="list"></ul>
    <script>
      const state = { status: 'loading', items: [] };
      const statusEl = document.querySelector('#status');
      const list = document.querySelector('#list');
      const form = document.querySelector('#editor');

      const render = () => {
        const label = { loading: '載入中', ready: '', error: '讀取失敗' };
        statusEl.textContent = label[state.status];
        list.replaceChildren();
        if (state.status !== 'ready') return;
        state.items.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item.name + ' ' + item.price;
          list.append(li);
        });
      };

      const load = async () => {
        state.status = 'loading';
        state.items = [];
        render();
        console.log(state.status);
        try {
          const response = await fetch('data/items.json');
          if (!response.ok) throw new Error(String(response.status));
          state.items = await response.json();
          state.status = 'ready';
        } catch {
          state.status = 'error';
        }
        render();
        console.log(state.status);
        console.log(state.items.length);
      };

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (state.status !== 'ready') return;
        const data = new FormData(form);
        const name = String(data.get('name')).trim();
        const priceText = String(data.get('price')).trim();
        const price = Number(priceText);
        if (!name || !priceText || Number.isNaN(price)) {
          statusEl.textContent = '請輸入名稱與數字價格';
          return;
        }
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: name, body: String(price), userId: 1 }),
          });
          if (!response.ok) throw new Error(String(response.status));
          const created = await response.json();
          state.items.push({ id: created.id, name, price });
          form.reset();
          render();
          console.log(name);
        } catch {
          // 清單保持原樣，只提示新增失敗
          statusEl.textContent = '新增失敗';
        }
      });

      load();
    </script>
  </body>
</html>
```

**解析**

- 載入中時 render 會把清單清掉，所以不會先閃出舊資料；讀取失敗時清單保持空白。
- 名稱或價格去掉空白後是空的，或價格不是數字時（空字串轉成數字會變成 0，所以要另外檢查），只在文字區提示，不會送出請求。
- 新增失敗（狀態碼不成功，或網路不通）只顯示新增失敗，原本的清單保持不動。這是新增動作的失敗，與讀取失敗不同，不該把已讀到的清單清掉。
- POST 成功後清單多出一列，輸入框清空；重新整理會回到檔案裡的三筆。
- 狀態還不是 ready 時按新增會被直接忽略，避免在載入中或失敗時加進清單。

開啟頁面時的 Console：

```text
loading
ready
3
```

在名稱輸入「膠帶」、價格輸入 30 後送出，清單多一列，Console 多一行：

```text
膠帶
```

## 選讀：取消與逾時

使用者可能在回應回來之前就離開這一步，或是伺服器遲遲不回應。這一節介紹兩種中止進行中請求的方式：自己呼叫取消，或設定時限讓它自動中止。被中止的 fetch 會拒絕，不會給你回應物件，也沒有 HTTP 狀態碼。

**一覽**

- `AbortController`：建立控制器，把它的 signal 交給 fetch；呼叫控制器的 abort 就中止這次請求，錯誤名稱是 AbortError。
- `AbortSignal.timeout`：直接產生一個會在指定毫秒後自動中止的 signal，不需要控制器；時限到了的錯誤名稱是 TimeoutError，與主動取消不同。

### 取消請求

signal 是控制器交給 fetch 的中止訊號。fetch 一發出就立刻 abort，這次請求沒有機會完成，會以 AbortError 拒絕。

```html 04-js/pages/182-js-abort.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：取消請求</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        const controller = new AbortController();
        const job = fetch('data/items.json', { signal: controller.signal });
        controller.abort();
        try {
          await job;
          console.log('不該完成');
        } catch (error) {
          console.log(error.name);
        }
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 頁面只有一句說明，結果在 Console。
- abort 之後 await 會拒絕並進入 catch，所以不會印出「不該完成」。
- 名稱是 AbortError，表示是被中止，而不是 404 之類的伺服器回應。畫面若要分開顯示，取消時不該套用讀取失敗的文字。

```text
AbortError
```

### 設定逾時

signal 的時限一到就自動中止。請求在時限內完成就不受影響；超過時限，fetch 以 TimeoutError 拒絕。`AbortSignal.timeout` 已是各主流瀏覽器都支援的標準功能。

```html 04-js/pages/182b-js-timeout.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：設定逾時</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        // 時限內完成：照常拿到回應
        const response = await fetch('data/items.json', {
          signal: AbortSignal.timeout(3000),
        });
        console.log(response.ok);

        // 先等 200 毫秒讓 50 毫秒的時限過期，再發請求
        const signal = AbortSignal.timeout(50);
        await new Promise((resolve) => setTimeout(resolve, 200));
        try {
          await fetch('data/items.json', { signal });
        } catch (error) {
          console.log(error.name);
        }
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 第一個請求給 3000 毫秒，本地檔會在時限內讀完，ok 是 true。
- 第二個 signal 只給 50 毫秒，程式先等 200 毫秒讓時限過期。已經中止的 signal 交給 fetch，fetch 會直接拒絕，名稱是 TimeoutError。真實情況是伺服器太慢，原理相同。
- 逾時（TimeoutError）與主動取消（AbortError）名稱不同，可以在 catch 裡分開處理。

```text
true
TimeoutError
```

## 選讀：同源政策與 CORS

瀏覽器預設只讓這一頁讀取「同一個來源」的回應內容。來源由協定、主機與連接埠組成，三個都相同才算同一個來源。對方網站若沒有在回應裡明確允許你的來源，腳本就讀不到那份回應。

這個允許機制叫 CORS（跨來源資源共用），規則設定在對方的伺服器，由瀏覽器負責檢查。請求可能已經送達，瀏覽器卻仍會讓這次 fetch 拒絕，錯誤名稱是 TypeError，看起來和斷線很像。伺服器對伺服器的請求不受這道檢查限制，因為它只存在於瀏覽器。

**觀念**

example.com 沒有允許這個練習頁讀取它的內容，所以第一行是 TypeError。旁邊的 items.json 與頁面同一個來源，ok 是 true。

```html 04-js/pages/183-js-cors.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：同源政策與 CORS</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const main = async () => {
        try {
          await fetch('https://example.com/');
          console.log('沒被擋');
        } catch (error) {
          console.log(error.name);
        }
        const local = await fetch('data/items.json');
        console.log(local.ok);
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 練習頁（本機網址）與 example.com 的主機不同，不是同一個來源。
- 對方沒有允許這個來源，所以 fetch 拒絕，名稱是 TypeError，也拿不到狀態碼。CORS 的詳細訊息要看 DevTools 的 Console 與 Network。
- 本地 JSON 與這頁同一個來源，不受跨來源規則影響。
- 跨來源要連同 cookie 一起送時，須把 credentials 設成 include，而且對方必須回應明確的來源，不能使用萬用字元。

```text
TypeError
true
```

# 瀏覽器儲存

重新整理之後，變數裡的待辦清單會消失。瀏覽器提供一塊小空間，可以把文字留在這台電腦上。這一章先學 Web Storage：兩種儲存區的差別、怎麼存物件，再用它讓待辦清單重新整理後還在。選讀的部分介紹 cookie，以及登入之後網站怎麼認得同一個人。

## localStorage 與 sessionStorage

Web Storage 是瀏覽器提供的鍵值儲存：用一個名字（鍵）換一段文字（值）。它有兩個儲存區，介面完全相同，差別只在資料能活多久。兩者都只屬於目前的來源，也就是通訊協定、網域與埠號都相同的網站，其他來源的頁面讀不到。

**一覽**

- `localStorage`：關掉分頁或瀏覽器後資料仍在，同一來源的所有分頁共用，直到程式或使用者刪掉。適合留下偏好與待辦。
- `sessionStorage`：只屬於單一分頁，重新整理還在，分頁關掉就消失，不同分頁各自獨立。適合暫時的步驟。
- `setItem(鍵, 值)`：寫入一筆，同名的鍵會被覆蓋。
- `getItem(鍵)`：讀出一筆，找不到時回傳 `null`，不會拋錯。
- `removeItem(鍵)`：刪掉一筆。
- `clear()`：刪掉該儲存區在這個來源底下的所有鍵。課堂練習不要呼叫它，以免清掉其他練習留下的資料。

**觀念**

值一律是字串。下面的 demo 各寫一筆到兩個儲存區，印出來，再刪掉 localStorage 那一筆，最後確認 sessionStorage 的值不受影響。

```html 04-js/pages/184-js-storage.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>localStorage 與 sessionStorage</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      localStorage.setItem('color', 'teal');
      sessionStorage.setItem('step', '1');
      console.log(localStorage.getItem('color'));
      console.log(sessionStorage.getItem('step'));
      localStorage.removeItem('color');
      console.log(localStorage.getItem('color'));
      console.log(sessionStorage.getItem('step'));
    </script>
  </body>
</html>
```

**解析**

- 頁面上只有說明文字，四行結果都在 Console。前兩行是剛寫進去的 teal 與 1。
- `removeItem` 只刪 color，再讀同一個鍵得到 null，不是空字串。
- step 在另一個儲存區，所以第四行仍是 1。
- 重新整理後，localStorage 若沒有被刪就還在；關掉分頁後，sessionStorage 的 step 會消失。

本章的 Console 輸出區塊只列出文字，和實際畫面（行號、引號、顏色）略有不同。

```text
teal
1
null
1
```

**容量與限制**

- 每個來源每種儲存區約有 5 MB 上下的空間，各瀏覽器略有差異。寫入超過容量會拋出 `QuotaExceededError`，所以它適合放小量文字，不適合放檔案；大量資料要改用 IndexedDB（瀏覽器內建的大容量資料庫，本課不介紹）。
- 讀寫是同步的，資料量大時會卡住頁面。
- 無痕視窗或使用者封鎖網站資料時，寫入可能失敗，正式的程式要用 `try` 與 `catch` 接住錯誤。
- 同一來源的任何腳本都讀得到，所以不要放密碼或登入憑證。

{% note info %}
**用方法，不要用點語法**
`localStorage.color = 'teal'` 也能寫入，但鍵名可能和內建方法撞名（例如叫 clear）。本課一律用 setItem 與 getItem。
{% endnote %}

## 存物件與保存待辦清單

儲存區只收字串，物件與陣列要先轉成 JSON 文字才能放進去，讀出來再轉回來。這一節先看轉換規則，再把上一篇的待辦清單接上 localStorage，做出重新整理後仍然保留的版本。

### 存物件要轉 JSON

直接把物件交給 `setItem`，瀏覽器會先把它轉成 [object Object] 這段字，原本的內容就丟了，之後也無法還原。正確的做法是寫入前 `JSON.stringify`，讀出後 `JSON.parse`。

**觀念**

下面的 demo 先示範錯誤寫法，印出來是無用的字串；再示範正確寫法，讀出的 raw 是字串，parse 之後才有 title。結尾把兩個鍵都刪掉，不在你的瀏覽器裡留下東西。

```html 04-js/pages/185-js-storage-json.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>存物件要轉 JSON</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const note = { title: '讀書', done: false };

      localStorage.setItem('note-wrong', note);
      console.log(localStorage.getItem('note-wrong'));

      localStorage.setItem('note', JSON.stringify(note));
      const raw = localStorage.getItem('note');
      const back = JSON.parse(raw);
      console.log(typeof raw);
      console.log(back.title);

      localStorage.removeItem('note-wrong');
      localStorage.removeItem('note');
    </script>
  </body>
</html>
```

**解析**

- 第一行印出 [object Object]，這就是物件被直接存進去的結果。
- `getItem` 永遠回傳字串或 null，所以第二行的 typeof raw 是 string。
- parse 之後得到的 back 是一個新物件，讀得到 title；改它不會改到儲存區，要再 `setItem` 才會寫回。
- 若對 [object Object] 呼叫 parse，會拋出 SyntaxError，所以讀取來路不明的文字時要用 `try` 與 `catch`，下一節就是這樣做。

```text
[object Object]
string
讀書
```

### 待辦清單重新整理後還在

上一篇的待辦清單把資料放在程式的 state，重新整理就回到最初兩筆。這一節沿用同一份 state、render 與兩個監聽，只在開啟時讀取、改動後寫回。鍵名用 todo-keep，不要呼叫 clear，避免刪到其他練習的資料。

#### 步驟 1：沿用待辦清單

先確認新增、切換與刪除在這份頁面上能動。這一步還沒有讀寫儲存，所以重新整理一定回到程式裡的兩筆。

**觀念**

狀態寫在程式裡，render 把它畫成列表，Console 印出兩個標題，用來和畫面對照。

```html 04-js/pages/186-js-todo-keep.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>待辦清單重新整理後還在</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
      input, button { font: inherit; }
      li { margin: 0.4rem 0; }
      li.done span { text-decoration: line-through; }
      li button { margin-left: 0.35rem; }
    </style>
  </head>
  <body>
    <form id="editor" novalidate>
      <input id="title" name="title" required />
      <button type="submit">新增</button>
    </form>
    <ul id="list"></ul>
    <script>
      const state = {
        nextId: 3,
        items: [
          { id: 1, title: '讀講義', done: false },
          { id: 2, title: '改練習檔', done: true },
        ],
      };

      const list = document.querySelector('#list');
      const form = document.querySelector('#editor');

      const render = () => {
        list.replaceChildren();
        state.items.forEach((item) => {
          const li = document.createElement('li');
          if (item.done) li.classList.add('done');
          const span = document.createElement('span');
          span.textContent = item.title;
          const toggle = document.createElement('button');
          toggle.type = 'button';
          toggle.dataset.action = 'toggle';
          toggle.dataset.id = String(item.id);
          toggle.textContent = item.done ? '改回未完成' : '標成完成';
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.dataset.action = 'remove';
          remove.dataset.id = String(item.id);
          remove.textContent = '刪除';
          li.append(span, toggle, remove);
          list.append(li);
        });
      };

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        const data = new FormData(form);
        const title = String(data.get('title'));
        state.items.push({ id: state.nextId, title, done: false });
        state.nextId += 1;
        form.querySelector('#title').value = '';
        render();
      });

      list.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button || !list.contains(button)) return;
        const id = Number(button.dataset.id);
        const item = state.items.find((row) => row.id === id);
        if (!item) return;
        if (button.dataset.action === 'toggle') item.done = !item.done;
        if (button.dataset.action === 'remove') {
          state.items = state.items.filter((row) => row.id !== id);
        }
        render();
      });

      render();
      console.log(state.items.map((item) => item.title).join(','));
    </script>
  </body>
</html>
```

**解析**

- 頁面上有一個輸入框與新增鈕，下面兩列：讀講義，以及有刪除線的改練習檔，每列後面有切換與刪除鈕。
- 送出表單會推進一筆並重畫；重新整理後，新增的那筆會消失。
- 點擊由 ul 統一接收，用 data-action 分辨切換或刪除。
- 這一步沒有呼叫 `setItem`，瀏覽器裡不會多出 todo-keep。

```text
讀講義,改練習檔
```

#### 步驟 2：讀出與寫回

開啟時先讀 todo-keep。沒有這個鍵、文字不是合法 JSON，或裡面沒有 items 陣列，就用程式裡的兩筆預設；其餘情況用讀到的資料。新增、切換、刪除之後都 `stringify` 再寫回，空陣列也要寫，這樣全部刪光後重新整理，才不會又回到兩筆預設。

{% note info %}
**若畫面不是預設兩筆**
這個鍵若已有舊資料，開啟時會先看到舊清單。到 DevTools 的 Application 面板，在 Local storage 刪掉 todo-keep，再重新整理，就會回到預設。
{% endnote %}

**觀念**

loadState 決定一開始的狀態，save 在每次改動後把狀態寫回。沒有舊資料時，畫面與 Console 都和步驟 1 相同。

```html 04-js/pages/186-js-todo-keep.html.final
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>待辦清單重新整理後還在</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
      input, button { font: inherit; }
      li { margin: 0.4rem 0; }
      li.done span { text-decoration: line-through; }
      li button { margin-left: 0.35rem; }
    </style>
  </head>
  <body>
    <form id="editor" novalidate>
      <input id="title" name="title" required />
      <button type="submit">新增</button>
    </form>
    <ul id="list"></ul>
    <script>
      const KEY = 'todo-keep';

      const fallback = () => ({
        nextId: 3,
        items: [
          { id: 1, title: '讀講義', done: false },
          { id: 2, title: '改練習檔', done: true },
        ],
      });

      const loadState = () => {
        const raw = localStorage.getItem(KEY);
        if (!raw) return fallback();
        try {
          const data = JSON.parse(raw);
          if (!data || !Array.isArray(data.items)) return fallback();
          return { nextId: Number(data.nextId) || 1, items: data.items };
        } catch (error) {
          return fallback();
        }
      };

      const state = loadState();
      const list = document.querySelector('#list');
      const form = document.querySelector('#editor');

      const save = () => {
        localStorage.setItem(
          KEY,
          JSON.stringify({ nextId: state.nextId, items: state.items })
        );
      };

      const render = () => {
        list.replaceChildren();
        state.items.forEach((item) => {
          const li = document.createElement('li');
          if (item.done) li.classList.add('done');
          const span = document.createElement('span');
          span.textContent = item.title;
          const toggle = document.createElement('button');
          toggle.type = 'button';
          toggle.dataset.action = 'toggle';
          toggle.dataset.id = String(item.id);
          toggle.textContent = item.done ? '改回未完成' : '標成完成';
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.dataset.action = 'remove';
          remove.dataset.id = String(item.id);
          remove.textContent = '刪除';
          li.append(span, toggle, remove);
          list.append(li);
        });
      };

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        const data = new FormData(form);
        const title = String(data.get('title'));
        state.items.push({ id: state.nextId, title, done: false });
        state.nextId += 1;
        form.querySelector('#title').value = '';
        save();
        render();
      });

      list.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button || !list.contains(button)) return;
        const id = Number(button.dataset.id);
        const item = state.items.find((row) => row.id === id);
        if (!item) return;
        if (button.dataset.action === 'toggle') item.done = !item.done;
        if (button.dataset.action === 'remove') {
          state.items = state.items.filter((row) => row.id !== id);
        }
        save();
        render();
      });

      render();
      console.log(state.items.map((item) => item.title).join(','));
    </script>
  </body>
</html>
```

**解析**

- 第一次開啟時畫面與步驟 1 一樣。新增一筆或點切換之後重新整理，改動會留下來。
- `getItem` 得到 null 就用預設，不會對 null 呼叫 parse。
- parse 拋錯或 items 不是陣列，也退回預設，壞資料不會讓整頁停住。
- save 把 nextId 與 items 一起寫入，下一筆才不會和舊的 id 撞號。
- 只 render、忘了 save，重新整理就會丟掉改動。
- 在別的分頁開同一個網址，會讀到同一份資料，因為 localStorage 是同來源共用。

```text
讀講義,改練習檔
```

## 選讀：Cookie

Cookie 是瀏覽器替網站保存的一小段文字，和 Web Storage 的最大差別是：每次對該網站發請求，瀏覽器都會自動把它附在請求裡，伺服器也能寫入它。因此 cookie 適合伺服器要認得瀏覽器的情況，例如登入狀態；待辦、草稿與偏好不要放這裡，否則只是讓每次請求變重。

**一覽**

- 大小：每個 cookie 約 4 KB，遠小於 Web Storage。
- `max-age`：存活秒數，到期自動刪除；`max-age=0` 表示立刻刪除。沒寫的 cookie 通常在瀏覽器關閉時消失。
- `SameSite`：跨網站請求要不要帶上它。`Strict` 只在同網站內帶，`Lax` 還包含從其他網站點連結進來，`None` 全部都帶且必須同時有 `Secure`。沒寫時，現行 Chrome 視為 `Lax`。
- `Secure`：只在 HTTPS 連線送出。
- `HttpOnly`：頁面腳本讀不到，只有伺服器收得到。只能由伺服器的回應設定，`document.cookie` 無法寫入這個屬性。

**觀念**

`document.cookie` 不是物件。每次賦值只新增或更新一個 cookie，讀取時卻得到所有腳本看得到的 cookie 串成一段文字，所以要用字串的 includes 找。下面的 demo 寫入 theme，確認讀得到，再用 `max-age=0` 刪掉，最後再確認一次。

```html 04-js/pages/187-js-cookie.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：Cookie</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      document.cookie = 'theme=light; max-age=3600; SameSite=Lax';
      console.log(document.cookie.includes('theme=light'));
      document.cookie = 'theme=; max-age=0';
      console.log(document.cookie.includes('theme=light'));
    </script>
  </body>
</html>
```

**解析**

- 賦值的文字裡，第一段是名稱與值，分號後面是屬性。
- 第一行印出 true，表示讀得到剛寫的 theme；刪除後第二行印出 false。
- 刪除的做法是用同名再寫一次，並把 `max-age` 設成 0。
- 請用 Live Server 這類網址開啟。直接雙擊開檔案（網址以 file 開頭）時，Chrome 多半不保存 cookie，兩行都會是 false。

```text
true
false
```

## 選讀：Session 與 Token 認證

登入成功之後，伺服器必須在下一次請求認得同一個人，常見有兩種做法。Session 把登入狀態留在伺服器，瀏覽器只拿到一組沒有意義的識別碼，通常放在 cookie，之後的請求自動帶上。Token 則是伺服器簽發的一段憑證，由程式自己保存，每次請求再放進標頭，慣例是 Authorization 標頭、值以 Bearer 開頭。

{% mermaid graph TD %}
loginNode["登入成功"] --> sessionNode["伺服器建立 session"]
sessionNode --> cookieNode["瀏覽器保存 cookie"]
cookieNode --> autoNode["之後的請求自動帶上"]
loginNode --> tokenNode["伺服器簽發 token"]
tokenNode --> keepNode["程式自己保存 token"]
keepNode --> headerNode["之後放到 Authorization"]
{% endmermaid %}

- Session 的識別碼放在 `HttpOnly` 的 cookie，頁面腳本讀不到；因為瀏覽器會自動附上，伺服器要搭配 `SameSite` 等機制，防止別的網站借用這個自動附上的 cookie 偷偷發請求。
- Token 常見的格式是 JWT（JSON Web Token）。它通常只有簽章保護，內容沒有加密，任何人都能解開讀，所以不要把機密放進去。
- Token 放在 `localStorage`，重新整理後還在，但任何在頁面上執行的腳本（包括被注入的惡意程式）都讀得到。放在記憶體的變數比較難被長期偷走，但重新整理就消失。
- 兩種做法都不需要瀏覽器保存密碼；密碼只在登入那一次送出。

{% note warning %}
**真正的登入交給現成服務**
自己實作登入、密碼保存與 token 簽發很容易出錯。實務上會用現成的身分驗證服務，本課專案在選讀的 Firebase 文章裡用 Firebase Authentication。這一節只認識概念，不做登入表單，也不要把這裡的示範字串當成憑證。
{% endnote %}

**觀念**

demo 把示範用的 token 組成 Authorization 標頭，放進 `fetch` 的選項物件。因為沒有發出請求，也不會送到任何伺服器。

```html 04-js/pages/188-js-auth.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：Token 與 Authorization 標頭</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const token = 'demo-token';
      const options = { headers: { Authorization: `Bearer ${token}` } };
      console.log(options.headers.Authorization);
      console.log(JSON.stringify(options));
    </script>
  </body>
</html>
```

**解析**

- 標頭值是 Bearer、一個空白，再接 token，所以第一行是 Bearer demo-token。
- 第二行是選項物件轉成的文字：標頭放在 headers 裡，而不是放進網址，否則憑證會留在瀏覽紀錄與伺服器記錄中。
- 真正要發請求時，把這個選項物件當作 `fetch` 的第二個引數。

```text
Bearer demo-token
{"headers":{"Authorization":"Bearer demo-token"}}
```

# 回家作業

這份作業只用必教內容，資料取自專案的行程清單。請用 Live Server 或 Vite 開啟頁面，直接雙擊檔案時 `fetch` 讀不到本機的 JSON。課堂上不會批改，也不講解；每一題都附上完成後該看到的結果，可以自己對照。做完或卡住時，再看練習 repo 根目錄 `homework/08-js-async/` 裡的標準答案。

## 起始檔與資料

起始檔在練習專案的 `04-js/homework/08-homework.html`。行程與出發日的資料各是一支 JSON，放在同資料夾的 `data/tours.json` 與 `data/departures.json`。

```html 04-js/homework/08-homework.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>08 回家作業</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; max-width: 720px; }
      #status { min-height: 1.5em; }
      #tour-list { padding-left: 20px; }
    </style>
  </head>
  <body>
    <h1>行程列表</h1>
    <p>請用 Live Server 開啟，直接雙擊檔案讀不到 JSON。</p>
    <p>
      <button id="reload" type="button">重新載入</button>
      <button id="load-missing" type="button">讀取不存在的檔案</button>
    </p>
    <p id="status"></p>
    <ul id="tour-list"></ul>
    <p>收藏 <span id="fav-count">0</span> 筆</p>

    <h2>報名</h2>
    <form id="booking-form">
      <label>姓名 <input name="name" required /></label>
      <label>人數 <input name="people" type="number" min="1" max="8" required /></label>
      <button type="submit">送出</button>
    </form>
    <p id="booking-result"></p>

    <script>
      // 資料在 data/tours.json 與 data/departures.json
      // 在這裡開始寫
    </script>
  </body>
</html>
```

## 題目

### 題目一：讀取並顯示列表

頁面載入時用 `fetch` 讀 `data/tours.json`，把行程顯示在 `#tour-list`。讀取期間 `#status` 顯示「載入中」，成功顯示「共 8 筆」，失敗顯示「讀取失敗」。

完成後頁面有八筆行程，狀態列是「共 8 筆」。

### 題目二：區分 HTTP 錯誤

按「讀取不存在的檔案」，要讀的是一個不存在的路徑。這時 `fetch` 不會 reject，請檢查回應是否成功，並在 `#status` 顯示「HTTP 404」。網路中斷與 HTTP 錯誤要顯示不同的訊息：網路中斷顯示「讀取失敗」。

完成後按鈕按下去會看到「HTTP 404」，列表維持原樣。

### 題目三：同時讀兩份資料

用 `Promise.all` 同時讀 `tours.json` 與 `departures.json`，依行程編號把出發日的數量併進每一筆，列表上多顯示「N 個出發日」。

完成後每一列都多了「2 個出發日」。

### 題目四：載入期間停用按鈕

把讀取流程寫成 `async` 函式，用 `try`、`catch`、`finally` 處理。「重新載入」按鈕在讀取期間要停用，不論成功或失敗結束後都要恢復。

完成後連續快按兩次「重新載入」，第二次點擊在讀取期間不會有反應，結束後按鈕可再按。

### 題目五：送出報名

表單送出時不要換頁。用 `fetch` 以 POST 把姓名與人數轉成 JSON 送到 `https://jsonplaceholder.typicode.com/posts`，成功後把回應裡的 `id` 顯示在 `#booking-result`，失敗顯示「送出失敗」。送出期間按鈕停用。

完成後頁面顯示「已收到，編號 101」。

### 題目六：保存收藏

每一列加一個「收藏」按鈕，收藏的行程編號存進 `localStorage`，`#fav-count` 顯示目前筆數。重新整理後收藏狀態仍要保留。

完成後收藏兩筆、重新整理頁面，仍顯示「已收藏」且數字是 2。

# 本篇重點回顧

選讀章節有「選讀：事件迴圈」、「選讀：Promise.race 與 any」、「選讀：把計時器與圖片載入包成 Promise」、「選讀：取消與逾時」、「選讀：同源政策與 CORS」、「選讀：Cookie」、「選讀：Session 與 Token 認證」，其餘是必讀主線。

- JavaScript 只有一條執行緒，非同步把等待交給瀏覽器、完成後才呼叫回呼，所以頁面不會被卡住，但下一行也不能假設已拿到結果。
- try 與 catch 能接住錯誤讓程式繼續，語言不會報錯的情況則要自己 `throw new Error` 丟出標準錯誤物件。
- Promise 代表未來的結果，只會從待定走向已完成或已拒絕，用 then、catch、finally 串成一條鏈，錯誤集中在鏈尾處理。
- `Promise.all` 同時等多件工作並依陣列順序交回結果，一件失敗就整組失敗，要保留每件的結局則改用 allSettled。
- async 函式一定回傳 Promise，await 只暫停所在的函式，互不依賴的工作要同時等，總時間才不會相加。
- JSON 的鍵與字串要用雙引號，parse 把文字還原成值、stringify 把值收成文字，undefined 與函式不會被保留。
- fetch 遇到 404 或 500 仍會完成，所以要自己檢查 ok，並把載入中、成功、失敗三種狀態畫回畫面。
- `localStorage` 關掉瀏覽器後仍在、sessionStorage 只屬於這個分頁，兩者都只收字串，物件要先轉成 JSON 文字再存。

# 專有名詞中英對照

上網查這一篇的說法時，用括號裡的英文當關鍵字。順序跟內文第一次出現相同。

## 認識非同步

- 同步（synchronous）
- 非同步（asynchronous）
- 回呼函式（callback）
- 事件迴圈（event loop）
- 單執行緒（single thread）
- 執行緒（thread）
- 阻塞（blocking）
- 非阻塞（non-blocking）
- 計時器（timer）
- 呼叫堆疊（call stack）
- 任務佇列（task queue）
- 微任務（microtask）
- 任務（task）
- 巢狀地獄（callback hell）

## Promise

- 錯誤處理（error handling）
- 拋出（throw）
- 錯誤物件（error object）
- 待定（pending）
- 已完成（fulfilled）
- 已拒絕（rejected）
- 執行器（executor）
- 未處理拒絕（unhandled rejection）
- 鏈（promise chain）
- 組合方法（Promise combinator）

## async 與 await

- 非同步函式（async function）
- 例外（exception）
- 依序（sequential）
- 並行（parallel）

## JSON

- JSON（JavaScript Object Notation）
- 物件實字（object literal）
- 循環參照（circular reference）

## Fetch API

- 伺服器（server）
- 請求（request）
- 回應（response）
- 狀態碼（status code）
- 方法（method）
- 標頭（header）
- 本體（body）
- 內容類型（Content-Type）
- 轉址（redirect）
- 查詢參數（query parameter）
- 狀態（state）
- 取消（abort）
- 逾時（timeout）
- 控制器（controller）
- 中止訊號（signal）
- 同源政策（same-origin policy）
- 來源（origin）
- 跨來源資源共用（CORS）

## 瀏覽器儲存

- 網頁儲存（Web Storage）
- 鍵值儲存（key-value storage）
- 無痕視窗（incognito window）
- 認證（authentication）
- 識別碼（session ID）
- 憑證（credential）
- 簽章（signature）
- 加密（encryption）
