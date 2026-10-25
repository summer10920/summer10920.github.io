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

計時器、網路與讀檔都不會把整頁停住。這一篇先看程式實際的執行順序，再用 Promise 與 async／await 把等待寫成一直線。接著用 Fetch 讀寫 JSON，並把清單留在瀏覽器裡，重新整理後還在。

<!-- more -->

# 認識非同步

JavaScript 一次只跑一支呼叫堆疊，計時器在排隊時，後面的程式仍會先跑完。這一章先用很短的實驗，看出寫在下面的程式不一定比較晚。事件迴圈放在選讀：看不懂可以跳過，不影響後面寫程式；看懂了，就能解釋執行順序，以及畫面為什麼會卡頓。

## 同步與非同步

同步的程式會在這一列做完才走下一列。非同步的工作先登記給瀏覽器，這一列立刻結束，結果晚一點才回來。畫面因此還能回應點擊，代價是你不能假設下一列已經拿到結果。

### 執行順序

延遲寫 0 只表示「最快也要等這一輪同步程式結束」，不是插隊到下一列。這一節把三個 `console.log` 排好，看 B 為什麼落在最後。

**觀念**

呼叫堆疊上的程式會先跑完。`setTimeout` 只是把函式交給瀏覽器，就算延遲是 0，也要等這一段同步程式結束才輪到它。所以 A 與 C 先印，B 在後面。

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

- A 在呼叫堆疊上，所以第一行就是 A。
- setTimeout 登記完就返回，不會停在那一列等 B。
- C 還在同一段同步程式裡，因此排在 B 前面。
- 延遲 0 的意思是不會更早，不是立刻插入 C 的前面。

```text
A
C
B
```

{% note success %}
**換你試試：**
在 C 的後面再加一行同步的 log，文字是 D。B 仍然要在 D 之後。
{% endnote %}

<details>
<summary>參考答案</summary>

D 與 A、C 一樣留在呼叫堆疊上，計時器裡的 B 要等這一段都結束。

```diff 04-js/pages/149-js-order.html
  // ...
        }, 0);
        console.log('C');
+       console.log('D');
      </script>
    </body>
  // ...
```

```text
A
C
D
B
```

</details>

### 選讀：事件迴圈

這一節是選讀。看不懂可以先跳過，後面的 Promise 與 Fetch 還是寫得成。看懂之後，你就能解釋為什麼有的訊息比較晚印出來，以及為什麼一段算很久的程式會讓按鈕暫時沒反應、畫面也不更新。

#### 呼叫堆疊與單執行緒

JavaScript 一次只做一件事。函式呼叫時會疊到上面，做完才拿掉，再回到上一個函式。這一節用三個互相呼叫的函式，把進入和離開的順序印在 Console。

**觀念**

這種一次只做一件事的做法，叫做單執行緒（single thread）。正在跑的函式放在呼叫堆疊（call stack）最上面。它若再呼叫別的函式，新函式就疊上去，下面那個停在呼叫的那一列。

上面的函式整個跑完，才從呼叫堆疊拿掉。拿掉之後，下面的函式從停住的那一列繼續。所以每個函式的「離開」，都會晚於它呼叫出去的那些函式。

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

圖上從左到右是時間先後。堆疊在 third 執行時最高，因為第一、第二個函式都還在下面等。third 沒有再呼叫別人，所以它最先被拿掉。

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

```text
進入 first
進入 second
進入 third
離開 third
離開 second
離開 first
```

**解析**

- 程式呼叫 `first()`，堆疊上只有 first，所以先印「進入 first」。
- first 呼叫 second 後，second 在最上面。first 裡的「離開 first」要等 second 拿掉之後才執行。
- second 再呼叫 third。third 沒有再呼叫別人，所以「進入 third」和「離開 third」連在一起。
- third 從堆疊拿掉，回到 second，印出「離開 second」。second 接著也被拿掉。
- 最後回到 first，印出「離開 first」。同一時間只有最上面那個函式在跑。

{% note success %}
**換你試試：**
在 third 的兩個 log 中間呼叫 fourth。fourth 印出「進入 fourth」和「離開 fourth」。這兩行要夾在 third 的進入和離開之間。
{% endnote %}

<details>
<summary>參考答案</summary>

fourth 疊在 third 上面，所以它的進入和離開會先印完，third 才能印出離開。

```diff 04-js/pages/150-js-stack.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
+       const fourth = () => {
+         console.log('進入 fourth');
+         console.log('離開 fourth');
+       };
+ 
        const third = () => {
          console.log('進入 third');
+         fourth();
          console.log('離開 third');
        };
        // ...
```

```text
進入 first
進入 second
進入 third
進入 fourth
離開 fourth
離開 third
離開 second
離開 first
```

</details>

#### 瀏覽器代為等待與任務佇列

計時、讀取資料、等待點擊時，JavaScript 把晚一點要執行的函式交出去，就繼續往下跑。等待本身由瀏覽器處理。條件到了，那個函式才放進佇列，等呼叫堆疊空了再執行。

**觀念**

回呼（callback）是先交出去、等條件到了才被呼叫的函式。`setTimeout` 和 `fetch` 都把回呼交出去，自己這一行就結束。

要等的那段時間交給瀏覽器 API（Web API）。Web API 負責計時、送出網路請求、接收點擊。登記完之後，後面的程式照樣執行。

`fetch` 完成時的回呼，以及按鈕被點擊時的回呼，也是瀏覽器處理完才送出來。下面的示範只用延遲 0 的計時器，因為每一行印出的順序比較好逐行對。

等待結束後，瀏覽器把回呼放進任務佇列（task queue）。回呼要等事件迴圈取出，才會執行。

事件迴圈（event loop）每次看一次呼叫堆疊（call stack）。堆疊上還有程式時，它先不拿任務。堆疊空了，它才從任務佇列拿出一個任務，放上呼叫堆疊執行。

這個任務做完、堆疊再次清空，事件迴圈再拿下一個。同樣的檢查會一直重複。

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
    <title>瀏覽器代為等待與任務佇列</title>
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

```text
開始
結束
計時器
```

**解析**

- 第 1 步：呼叫堆疊執行 `console.log('開始')`，先印出開始。
- 第 2 步：執行 `setTimeout`。回呼交給瀏覽器 API 去計時，這一列到這裡就結束。延遲寫 0，表示時間一到就可以放進任務佇列。印出計時器是取出這個任務之後的事。
- 第 3 步：JavaScript 繼續下一列，印出結束。到這裡，呼叫堆疊上的程式才結束。
- 第 4 步：堆疊空了。瀏覽器已經把回呼放進任務佇列。事件迴圈拿出這一個任務，放上呼叫堆疊。
- 第 5 步：回呼執行，印出計時器。所以計時器在開始和結束的後面。

{% note success %}
**換你試試：**
在「結束」後面再登記一個延遲 0 的計時器，印出「計時器 2」。它要排在「計時器」後面，兩個都比「結束」晚。
{% endnote %}

<details>
<summary>參考答案</summary>

兩個計時器都在同步程式裡登記，依照登記順序進入任務佇列。堆疊清空後，事件迴圈一個接一個拿出它們。

```diff 04-js/pages/151-js-queue.html
  // ...
        }, 0);
        console.log('結束');
+       setTimeout(() => {
+         console.log('計時器 2');
+       }, 0);
      </script>
    </body>
  // ...
```

```text
開始
結束
計時器
計時器 2
```

</details>

#### 長時間運算會卡住畫面

呼叫堆疊一直留著程式時，事件迴圈要等它清空才取出下一個任務，瀏覽器也要等這時才重繪。這一節用一顆按鈕跑 3 秒的迴圈。點擊、計時器和畫面更新都會等這段迴圈結束。

**觀念**

點下按鈕後，程式用 `Date.now()` 記下 3 秒後的時間，再用 `while` 一直比較現在的時間有沒有超過。還沒超過就繼續比較，函式不結束，呼叫堆疊上就一直留著這個函式。

這段時間再點按鈕，新的點擊會先由瀏覽器收下，函式要等堆疊清空才執行。延遲 0 的計時器也在任務佇列裡等。按鈕文字雖然在程式裡改過，瀏覽器要等這次任務結束才重繪，所以畫面上會直接看到最後的文字。

工作若要算很久，就不要一次占滿呼叫堆疊。把它分成幾段，做完一段就讓堆疊清空；或把計算交給後端，頁面只等結果回來再更新。

```html 04-js/pages/152-js-block.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>長時間運算會卡住畫面</title>
  </head>
  <body>
    <p>點一次按鈕，看畫面與 Console。按鈕會一直顯示「開始」，計算結束才變成「計算結束」。</p>
    <button type="button" id="busy">開始</button>
    <script>
      const button = document.querySelector('#busy');
      button.addEventListener('click', () => {
        console.log('開始計算');
        button.textContent = '計算中';
        setTimeout(() => {
          console.log('計時器到了');
        }, 0);
        const end = Date.now() + 3000;
        while (Date.now() < end) {
          // 故意留在這個函式裡，讓呼叫堆疊一直有東西
        }
        button.textContent = '計算結束';
        console.log('計算結束');
      });
    </script>
  </body>
</html>
```

```text
開始計算
計算結束
計時器到了
```

**解析**

- 第 1 步：點一次按鈕，回呼先印出「開始計算」，並把按鈕文字改成「計算中」。這時只改了文字資料，畫面還沒重繪。
- 第 2 步：`setTimeout` 把印出「計時器到了」的回呼交給瀏覽器。回呼進入任務佇列，這時候還輪不到它。
- 第 3 步：`while` 不斷用 `Date.now()` 和結束時間比較，直到 3 秒過去。函式還沒結束，呼叫堆疊一直没空。
- 第 4 步：堆疊一直有這個函式，事件迴圈就先不拿任務。這 3 秒裡再點按鈕沒有反應，計時器還在佇列裡，畫面也不更新，按鈕仍顯示「開始」。
- 第 5 步：迴圈結束，文字改成「計算結束」，並印出「計算結束」。兩次改文字都在同一個任務裡，重繪時直接看到「計算結束」。
- 第 6 步：堆疊清空後，事件迴圈才執行計時器，印出「計時器到了」。久的計算要分段做，或交給後端，頁面才不會卡住。

{% note success %}
**換你試試：**
在「計算結束」後面加一行，印出「堆疊清空」。它要在「計時器到了」前面。計時器仍要等這次回呼結束才跑。
{% endnote %}

<details>
<summary>參考答案</summary>

「堆疊清空」還寫在這一次點擊的回呼裡，所以它比任務佇列裡的計時器早。

```diff 04-js/pages/152-js-block.html
  // ...
          button.textContent = '計算結束';
          console.log('計算結束');
+         console.log('堆疊清空');
        });
      </script>
    // ...
```

```text
開始計算
計算結束
堆疊清空
計時器到了
```

</details>

#### 微任務優先

堆疊清空之後，任務佇列的下一個任務還要再等一批更早的工作。這一批叫做微任務，會整批先做完。Promise 的寫法下一章才學，這裡只要先認出 `then` 的回呼也屬於這一批。

**觀念**

微任務（microtask）排在每一個任務做完之後。呼叫堆疊清空時，事件迴圈先把當時的微任務整批做完，才去任務佇列拿下一個。`queueMicrotask` 就是把函式排進微任務。

做微任務時如果又排了新的微任務，新的也算在這一批，會一起清完。下一章 Promise 的 `then` 收到的回呼也是微任務，所以它會早於 `setTimeout`。

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

```text
同步
同步結束
微任務
任務
```

**解析**

- 「同步」和「同步結束」都在現在這個任務裡。呼叫堆疊還沒空，所以兩行先印完。
- `queueMicrotask` 把「微任務」排進微任務這一批。任務佇列裡的「任務」要等這一批做完。
- 堆疊清空後，事件迴圈先把這一批微任務做完，因此「微任務」比「任務」早。
- `setTimeout` 的回呼在任務佇列。延遲即使寫 0，也要等微任務清空才輪到。

{% note success %}
**換你試試：**
再排一個微任務，文字是「微任務 2」。它應該緊接在「微任務」後面，仍早於「任務」。
{% endnote %}

<details>
<summary>參考答案</summary>

兩個微任務都在堆疊清空時一次做完。任務佇列要等這一批微任務結束才進得來。

```diff 04-js/pages/153-js-micro.html
  // ...
          console.log('微任務');
        });
+       queueMicrotask(() => {
+         console.log('微任務 2');
+       });
        setTimeout(() => {
          console.log('任務');
        // ...
```

```text
同步
同步結束
微任務
微任務 2
任務
```

</details>

## 回呼函式

回呼是把函式交給別人，等條件到了再呼叫。計時器已經在這樣做。這一節把「完成時呼叫哪個函式」寫成參數，然後看三層巢狀為什麼難讀。

### callback 寫法

參數的位置先講好：最後一個參數是完成時要呼叫的函式。呼叫端把函式傳進去，真正印出名字的時間是計時器到點之後，不是呼叫 `loadName` 的那一列。

**觀念**

`loadName` 自己不決定怎麼使用名字，它只負責晚一點呼叫你傳進來的函式。主程式在登記之後繼續往下走，所以「已登記」會比名字更早出現。

```html 04-js/pages/154-js-callback.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>callback 寫法</title>
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

- 開始與已登記是同步程式，會先印出來。
- done 被當成參數傳進 loadName，這一刻還沒有被呼叫。
- 約 10 毫秒後計時器呼叫 callback，Console 才出現小安。
- 名字是回呼的參數，不是 loadName 的回傳值。loadName 沒有 return 這份名字。

```text
開始
已登記
小安
```

{% note success %}
**換你試試：**
把回呼收到的名字改成「小林」。開始與已登記的順序不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

改的是計時器裡交給 callback 的引數。主程式那兩行仍是同步，所以還是先印。

```diff 04-js/pages/154-js-callback.html
  // ...
        const loadName = (callback) => {
          setTimeout(() => {
-           callback('小安');
+           callback('小林');
          }, 10);
        };
        // ...
```

```text
開始
已登記
小林
```

</details>

### 巢狀地獄

下一步要用上一步的結果時，回呼只能寫在上一個回呼裡面。三層還讀得懂，再深下去，錯誤處理會散在每一層，縮排也會一直往右。

**觀念**

每一層都等自己的計時器，完成後才登記下一層。結果的順序仍然是第一步、第二步、第三步，但程式的形狀是橫向變深，而不是向下加一步。

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
      setTimeout(() => {
        console.log('第一步');
        setTimeout(() => {
          console.log('第二步');
          setTimeout(() => {
            console.log('第三步');
          }, 10);
        }, 10);
      }, 10);
    </script>
  </body>
</html>
```

**解析**

- 外層計時器先到，印出第一步，這時才登記第二層。
- 第二步的計時器不跟第一個同時開始，所以總時間是三段相加。
- 第三步被包在最裡面，要改順序就得改三層括號。
- 這一支還沒有地方集中處理失敗。每一層都得自己再加一個錯誤回呼。

```text
第一步
第二步
第三步
```

{% note success %}
**換你試試：**
在第三步的回呼裡再印一行「做完」。它應該是 Console 的最後一行。
{% endnote %}

<details>
<summary>參考答案</summary>

做完寫在最內層，所以仍然要等三個計時器都跑過。它不會跑到第一步前面。

```diff 04-js/pages/155-js-nest.html
  // ...
            setTimeout(() => {
              console.log('第三步');
+             console.log('做完');
            }, 10);
          }, 10);
        // ...
```

```text
第一步
第二步
第三步
做完
```

</details>

# Promise

Promise 是一個代表未來結果的物件。你現在拿不到值，但可以先排好成功時做什麼、失敗時做什麼。這一章先看狀態，再把上一節的巢狀改成向下接的鏈。

## 建立與使用

用 `new Promise` 建立時，執行器函式會立刻同步執行。你在裡面呼叫 resolve 或 reject，狀態就從待定離開，而且只會離開一次。

### 三種狀態

狀態只有三種，而且只會從待定走向其中一個終點。已經完成或已經拒絕之後，再呼叫 `resolve` 或 `reject` 都不會改寫結果。

{% mermaid graph LR %}
pendingNode["pending 待定"] --> fulfilledNode["fulfilled 已完成"]
pendingNode --> rejectedNode["rejected 已拒絕"]
{% endmermaid %}

- `resolve` 把 Promise 收成已完成，並帶上一個值。之後的 `then` 會收到它。
- `reject` 把 Promise 收成已拒絕，並帶上拒絕原因。之後的 `catch` 會收到它。

**觀念**

執行器是同步的，所以「執行器」會比「同步結束」更早。真正把值印出來的 then 是微任務，排在這一段同步程式後面。第二個 Promise 先完成就定案，後面的 resolve 與 reject 都忽略。

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

- 執行器在 new Promise 的當下就跑，所以它早於同步結束。
- then 的回呼是微任務，因此完成排在同步結束後面。
- 第二個 Promise 第一次 resolve 就變成已完成，第二次 resolve 不會改值。
- 已經完成之後再 reject 不會把狀態改成已拒絕，也不會進到 catch。

```text
執行器
同步結束
完成
第一次
```

{% note success %}
**換你試試：**
把第一個 resolve 的文字改成「好了」。同步結束仍要在它前面。
{% endnote %}

<details>
<summary>參考答案</summary>

改的是完成時帶出的值。執行器仍然同步先跑，then 仍然等這一輪同步程式結束。

```diff 04-js/pages/156-js-promise.html
  // ...
        new Promise((resolve) => {
          console.log('執行器');
-         resolve('完成');
+         resolve('好了');
        }).then((value) => {
          console.log(value);
        // ...
```

```text
執行器
同步結束
好了
第一次
```

</details>

### then、catch、finally

這三個方法都回傳一個新的 Promise，所以可以繼續往下接。then 收完成的值，catch 收拒絕的原因，finally 不接收那個值，只負責收尾。

- `then` 在已完成時呼叫回呼，回傳新的 Promise。回呼的回傳值會變成下一個環節的完成值。
- `catch` 在已拒絕時呼叫回呼，回傳新的 Promise。它用來接住前面丟出的錯誤。
- `finally` 不論完成或拒絕都會呼叫回呼，回傳新的 Promise。回呼的回傳值不會取代原來的結果，除非回呼自己拋出錯誤。

**觀念**

拒絕的 Promise 會跳過 then，進到 `catch`。`finally` 接在後面，成功或失敗都會跑，適合關掉「讀取中」這種一定要收掉的狀態。

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

- reject 讓這個 Promise 變成已拒絕，then 的回呼不會執行。
- catch 收到 Error，印出的是 message，不是整個物件。
- finally 沒有參數可用，它只保證收尾這一行會出現。
- 若拿掉 catch，拒絕會變成沒有人接的錯誤，finally 仍會執行，但頁面主控台會留下未處理的拒絕。

```text
讀取失敗
收尾
```

{% note success %}
**換你試試：**
改成 resolve('讀取完成')，並把 catch 留著。Console 應先出現讀取完成，再出現收尾，而且不該出現讀取失敗。
{% endnote %}

<details>
<summary>參考答案</summary>

完成時走 then，不走 catch。finally 不看成功或失敗，所以收尾還在。

```diff 04-js/pages/157-js-then.html
  // ...
      <script>
        new Promise((resolve, reject) => {
-         reject(new Error('讀取失敗'));
+         resolve('讀取完成');
        })
          .then((value) => {
            // ...
```

```text
讀取完成
收尾
```

</details>

## 串接與錯誤

鏈的價值是每一步把結果交下去，錯誤則集中到一個 `catch`。這一節先看值怎麼傳，再看中間拋出錯誤時後面的 `then` 會被跳過，最後把巢狀回呼改寫成同一條鏈。

### 鏈式傳值

`then` 回呼 return 的一般值，會變成下一個 `then` 的參數。若 return 的是另一個 Promise，下一環會等那個 Promise 完成，再收到它的值。

**觀念**

第一環把 1 加成 2，第二環再交給一個 10 毫秒後才完成的 Promise。最後印出的 3 不是同步算出來的，而是等那個 Promise resolve 之後才進到下一個 `then`。

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

- Promise.resolve(1) 做出一個已經完成、值是 1 的 Promise。
- 第一個 then 回傳 2，這個數字直接成為下一環的參數。
- 第二個 then 回傳 Promise，鏈會停下來等它 resolve。
- 最後一環收到的是 3，也就是 wait 裡 resolve 的那個值。

```text
3
```

{% note success %}
**換你試試：**
第一環改成加 10。最後應印出 12。wait 的延遲不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

1 先加 10 得到 11，wait 再收到 12。延遲只影響何時印出，不影響最後的數字。

```diff 04-js/pages/158-js-chain.html
  // ...
        };
  
        Promise.resolve(1)
-         .then((n) => n + 1)
+         .then((n) => n + 10)
          .then((n) => wait(n + 1))
          .then((n) => {
            // ...
```

```text
12
```

</details>

### 集中錯誤處理

鏈上任何一環拋出錯誤，或回傳一個被拒絕的 Promise，後面的 then 都會先被跳過，直到 catch。catch 若沒有再拋出錯誤，它回傳的 Promise 是完成的，所以後面還能繼續接。

**觀念**

第二步用 throw 丟出錯誤。寫在它後面的 then 不會跑。`catch` 印出訊息之後，鏈恢復成完成，最後的「繼續」還是會印。

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

- throw 會拒絕這一環回傳的 Promise，效果和 reject 相同。
- 印出「跳過」的 then 在 catch 前面，所以這次不會執行。
- catch 接住錯誤並印出 message。它沒有再 throw，鏈就恢復完成。
- 最後一個 then 因此還是會跑，這也是收尾可以寫在 catch 後面的原因。

```text
第二步失敗
繼續
```

{% note success %}
**換你試試：**
在 catch 裡改印「已處理」，並再 throw error。最後的「繼續」這次不該出現。
{% endnote %}

<details>
<summary>參考答案</summary>

catch 再拋出錯誤時，它回傳的 Promise 是拒絕的。後面的 then 會被跳過，而且這個拒絕沒有下一個 catch。

```diff 04-js/pages/159-js-error.html
  // ...
          })
          .catch((error) => {
-           console.log(error.message);
+           console.log('已處理');
+           throw error;
          })
          .then(() => {
            // ...
```

```text
已處理
```

</details>

### 改寫巢狀地獄

同樣三步，每一步回傳 Promise，下一步寫在 `then` 裡，而不是寫在回呼的括號深處。時間仍然是三段相加，因為下一步是在上一步完成之後才開始等。

**觀念**

step 等 10 毫秒後印出標籤並 resolve。鏈上每次都 return 下一個 step，讀的方向變成由上往下。失敗時只要鏈尾有一個 `catch`。

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

- 第一步的計時器先開始。第二步要等它 resolve 之後才登記。
- then 的回呼回傳下一個 Promise，鏈才會等待那 10 毫秒。
- 若某一環改成 reject，後面的 step 不會開始，訊息會進到最後的 catch。
- 這個寫法與巢狀回呼的差別在形狀：步驟往下加，錯誤處理留在鏈尾。

```text
第一步
第二步
第三步
```

{% note success %}
**換你試試：**
在第三步後面再接一個 then，印出「做完」。catch 留在最後。
{% endnote %}

<details>
<summary>參考答案</summary>

做完是第三步完成之後的下一環，所以它是最後一行。catch 沒有錯誤可接時不會印東西。

```diff 04-js/pages/160-js-flat.html
  // ...
          .then(() => step('第二步'))
          .then(() => step('第三步'))
+         .then(() => {
+           console.log('做完');
+         })
          .catch((error) => {
            console.log(error.message);
          // ...
```

```text
第一步
第二步
第三步
做完
```

</details>

## 組合方法

有時要等的不是一步，而是好幾件同時開始的工作。組合方法接收一個 Promise 陣列，回傳另一個 Promise。差在「怎樣算完成」：全部成功、全部結束、最先結束，或第一個成功。

### Promise.all 與 allSettled

這兩個都會等陣列裡每一件工作結束，結果的順序跟完成的先後無關，跟你放進陣列的順序相同。差別在有人失敗時，整組要不要跟著失敗。

- `Promise.all` 等全部完成。任何一件拒絕，回傳的 Promise 就拒絕，你只拿到那一個原因。其餘工作不會被取消，只是結果不再交給你。
- `Promise.allSettled` 等全部結束，不論成功或失敗，回傳的 Promise 都會完成。值是陣列，每一格有 status，成功還有 value，失敗則有 reason。

**觀念**

task 用計時器模擬快慢與失敗。all 的兩件都成功，所以印出「甲,乙」，乙雖然比較早好，仍排在甲後面。allSettled 裡乙會失敗，整組還是完成，依序印出 fulfilled 與 rejected。

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

- all 的結果依陣列順序是甲然後乙，不是誰先做完誰排前面。
- 乙只要 10 毫秒，甲要 20 毫秒，all 仍會等到甲。
- allSettled 的乙用 reject 結束，status 是 rejected，整組不會因此拒絕。
- all 若有一件失敗，catch 只能拿到那一個原因，其他件的值不會出現在結果陣列裡。

```text
甲,乙
fulfilled
rejected
```

{% note success %}
**換你試試：**
把 all 裡的乙改成失敗。all 改接 catch，印出 error.message。allSettled 那組不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

乙的名字就是拒絕原因。all 不會印出「甲,乙」，因為整組已經拒絕。allSettled 仍會印兩行 status。

```diff 04-js/pages/161-js-all.html
  // ...
          });
        };
  
-       Promise.all([task('甲', 20, false), task('乙', 10, false)]).then((list) => {
-         console.log(list.join(','));
+       Promise.all([task('甲', 20, false), task('乙', 10, true)]).catch((error) => {
+         console.log(error.message);
        });
  
        Promise.allSettled([task('甲', 20, false), task('乙', 10, true)]).then((list) => {
          // ...
```

```text
乙
fulfilled
rejected
```

</details>

### Promise.race 與 any

這兩個不等全部，只關心誰先到達終點。`race` 連失敗也算到達，`any` 只把成功當成到達。

- `Promise.race` 回傳最先完成或最先拒絕的那一件。其他件仍會繼續跑，只是結果被忽略。
- `Promise.any` 回傳第一個完成的值。全部都拒絕時，回傳的 Promise 才拒絕，錯誤名稱是 AggregateError。

**觀念**

慢的那件要 30 毫秒，快的 10 毫秒就完成，所以 `race` 印出「快」。`any` 先遇到一件失敗，會略過它，等到後面那件成功。第三組兩件都失敗，才印出 AggregateError。

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

- race 在 10 毫秒時就完成，慢的那件 30 毫秒後仍會 resolve，只是沒有人再接收。
- 第二組的失敗發生得更早，any 不會因此結束，所以成功還印得出來。
- 第三組沒有任何一件完成，catch 拿到的名稱是 AggregateError。
- race 若最快的那件是拒絕，整組就拒絕。any 要到每一件都拒絕才拒絕。

```text
快
AggregateError
成功
```

{% note success %}
**換你試試：**
把 race 的「快」改成 10 毫秒就失敗。catch 改印「拒絕:」接上 error.message。另外兩組不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

最快落地的是拒絕，所以第一行變成拒絕:快。any 的兩組時間點不受這次修改影響。

```diff 04-js/pages/162-js-race.html
  // ...
          });
        };
  
-       Promise.race([task('慢', 30, false), task('快', 10, false)]).then((name) => {
-         console.log(name);
+       Promise.race([task('慢', 30, false), task('快', 10, true)]).catch((error) => {
+         console.log('拒絕:' + error.message);
        });
  
        Promise.any([task('失敗', 5, true), task('成功', 15, false)]).then((name) => {
          // ...
```

```text
拒絕:快
AggregateError
成功
```

</details>

## 選讀：把計時器與圖片載入包成 Promise

計時器與圖片載入原本都是回呼。包成 Promise 之後，才能放進前面的鏈，也能在下一章用 `await` 等待。這一節不做新的狀態機，只把兩種「晚一點才知道結果」的工作收成同一個形狀。

- `wait` 包住 `setTimeout`，時間到就 resolve，回傳 Promise。它沒有失敗的情況。
- `loadImage` 用 `Image` 聽 load 與 error，成功時 resolve 那張圖，失敗時 reject。回傳值同樣是 Promise。

**觀念**

先等 10 毫秒印出「等完」，再載入一張內嵌的 1×1 圖。圖的位址是 data URI，不需要另外的檔案。載入成功後印出 `naturalWidth`，這張圖的寬度是 1。

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

- setTimeout 的回呼直接把 resolve 交出去，時間到 Promise 就完成。
- 圖片要先掛好 load 與 error，再指定 src。順序反了，快取的圖可能在你監聽之前就載完。
- load 時 resolve 的是圖片元素，所以下一環讀得到 naturalWidth。
- error 時拒絕的原因是 Error。這張 data URI 會成功，不會走到拒絕。

```text
等完
1
```

{% note success %}
**換你試試：**
把 wait 的時間改成 30，並在等完之前不要印別的字。寬度那一行仍應是 1。
{% endnote %}

<details>
<summary>參考答案</summary>

延遲只改何時印出等完。圖的寬度來自檔案本身，跟等了幾毫秒無關。

```diff 04-js/pages/163-js-wrap.html
  // ...
        const tiny =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  
-       wait(10)
+       wait(30)
          .then(() => {
            console.log('等完');
            // ...
```

```text
等完
1
```

</details>

# async 與 await

async 與 await 是寫 Promise 鏈的另一種形狀。`await` 會暫停這支函式，不會暫停整個分頁。函式外面的程式，以及畫面上的點擊，都還繼續走。

## 基本寫法

一支 async 函式一定回傳 Promise。你在裡面 `await` 另一個 Promise，完成時拿到值，拒絕時則變成可以用 try 接住的例外。

### async 函式與 await

呼叫 `async` 函式的那一列會立刻拿到 Promise，不會等到裡面的 `await` 結束。所以「已呼叫」會夾在「開始」和最後的數字中間。

**觀念**

wait 在 10 毫秒後 resolve 它收到的毫秒數。run 印出開始之後才 await。函式返回時，內部停在 await，主程式接著印出已呼叫。數字 10 要等計時器到了才印。

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
      };

      run();
      console.log('已呼叫');
    </script>
  </body>
</html>
```

**解析**

- async 函式一被呼叫就開始同步執行，直到碰到第一個 await。
- 開始因此早於已呼叫。已呼叫在 run 外面，不等待 wait。
- await 拿到的是 resolve 的值，這裡就是傳進去的 10。
- run() 的回傳值是 Promise。這支程式沒有再接 then，因為結果已經在函式裡印出。

```text
開始
已呼叫
10
```

{% note success %}
**換你試試：**
在 await 的下一行改印「等到了」。已呼叫仍應夾在開始與等到了中間。
{% endnote %}

<details>
<summary>參考答案</summary>

改的是 await 之後的那一行，所以它還是最後才印。函式外的已呼叫不會被 await 拖住。

```diff 04-js/pages/164-js-async.html
  // ...
        const run = async () => {
          console.log('開始');
-         const ms = await wait(10);
-         console.log(ms);
+         await wait(10);
+         console.log('等到了');
        };
  
        run();
        // ...
```

```text
開始
已呼叫
等到了
```

</details>

### try、catch、finally

await 到一個被拒絕的 Promise 時，效果等於在那一行 throw。規則與上一篇的 try 相同：要接住就包在 `try` 裡，否則這支 async 函式回傳的 Promise 會變成拒絕。

- `try` 包住可能拒絕的 await。拒絕會跳進 catch，不會繼續執行 try 裡剩下的行。
- `catch` 收到那個 Error。這裡可以印出訊息。
- `finally` 不論成功或失敗都會跑，適合收掉讀取中的狀態。

**觀念**

fail 一進來就拋出錯誤。run 用 await 呼叫它，所以「不會到」被跳過。`catch` 印出失敗，`finally` 印出收尾。

```html 04-js/pages/165-js-try.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>try、catch、finally</title>
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

- fail 拋出的錯誤會拒絕它回傳的 Promise。
- await 那個 Promise 時，錯誤變成 run 裡的例外，所以進 catch。
- 不會到寫在 await 後面、又在同一個 try 裡，因此這次不執行。
- finally 在 catch 之後執行。若拿掉 try，run() 回傳的 Promise 會拒絕，而且沒有人接。

```text
失敗
收尾
```

{% note success %}
**換你試試：**
把 fail 改成回傳 '完成'，不要 throw。Console 應印出完成，再印出收尾。
{% endnote %}

<details>
<summary>參考答案</summary>

沒有例外時不進 catch。await 的下一行會執行，finally 仍會收尾。

```diff 04-js/pages/165-js-try.html
  // ...
      <script>
        const fail = async () => {
-         throw new Error('失敗');
+         return '完成';
        };
  
        const run = async () => {
          try {
-           await fail();
-           console.log('不會到');
+           const value = await fail();
+           console.log(value);
          } catch (error) {
            console.log(error.message);
          // ...
```

```text
完成
收尾
```

</details>

## 依序與並行

`await` 寫在下一行，就會等上一行結束才開始下一件。若兩件工作彼此不依賴，應同時開始，再用 `Promise.all` 等它們。用錯形狀時，總時間會變成相加，而不是取比較慢的那件。

### 依序等待與 Promise.all 的差別

依序的第二個計時器，要等第一個印完才登記。並行的兩個計時器在同一刻登記。這一節用 Console 的交錯順序把這件事看清楚。

- 連續兩行 `await` 會等前一件結束才開始下一件，總時間是相加。
- `Promise.all` 讓陣列裡的工作同時開始，總時間看最慢的那一件。回傳值是結果陣列。

**觀念**

四個計時器都是 20 毫秒，但依序乙要等依序甲完成才開始，所以它最後才印。並行的兩件與依序甲同時開始，20 毫秒時一起出現，接著才印「並行結束」。

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

- 依序甲、並行甲、並行乙三個計時器在一開始就登記，所以約 20 毫秒時連續出現。
- 並行結束寫在 await Promise.all 的下一行，要等兩件並行都完成。
- 依序乙的計時器在依序甲完成之後才登記，因此又晚了約 20 毫秒。
- 兩件工作若互相不依賴，用 all 讓它們同時跑。後者要用前者的結果時，才寫成上下兩行 await。

```text
依序甲
並行甲
並行乙
並行結束
依序乙
```

{% note success %}
**換你試試：**
把並行甲與並行乙的延遲改成 50，依序的兩件維持 20。依序的兩行應先印完，並行結束變成最後一行。
{% endnote %}

<details>
<summary>參考答案</summary>

並行兩件 50 毫秒後才結束，依序乙在依序甲之後再 20 毫秒就印出。所以依序兩行會排到並行前面。

```diff 04-js/pages/166-js-parallel.html
  // ...
        const oneByOne = async () => {
          await task('依序甲', 20);
-         await task('依序乙', 20);
+         await task('依序乙', 5);
        };
  
        const together = async () => {
-         await Promise.all([task('並行甲', 20), task('並行乙', 20)]);
+         await Promise.all([task('並行甲', 50), task('並行乙', 50)]);
          console.log('並行結束');
        };
        // ...
```

```text
依序甲
依序乙
並行甲
並行乙
並行結束
```

</details>

### 迴圈裡的 await

for...of 會等候圈裡的 await，下一圈才開始。forEach 不會等回呼裡的 Promise，因為它不看回呼的回傳值。需要同時開始時，先用 map 做出 Promise 陣列，再交給 `Promise.all`。

- `for...of` 配 `await` 會一圈等完再進下一圈，回傳值就是該圈 resolve 的值。
- `map` 會立刻呼叫全部，回傳 Promise 陣列。再交給 `Promise.all` 才等到全部結果。
- `forEach` 的回傳值是 undefined。寫在回呼裡的 `await` 不會讓外層迴圈停住。

**觀念**

load 每件 10 毫秒。for...of 三次是一段一段等，所以 1、2、3 之間各隔約 10 毫秒。迴圈結束後的 map 才同時發出三件，最後一行一次印出三個數字。

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
      };

      run();
    </script>
  </body>
</html>
```

**解析**

- for...of 的每一圈都等到 load resolve，所以數字是一個一個出現。
- map 會立刻把三個 load 都呼叫起來，Promise.all 再等最慢的那件。
- 最後一行的順序仍是 1、2、3，因為 all 依陣列順序交回結果。
- 若把 await 放進 forEach 的回呼，迴圈本身不會停，三件會一起開始，而且你無法在 forEach 的下一行等到它們。

```text
1
2
3
1,2,3
```

{% note success %}
**換你試試：**
把 ids 改成 [4, 5]。依序的兩行應是 4 與 5，最後一行是 4,5。
{% endnote %}

<details>
<summary>參考答案</summary>

迴圈與 all 都讀同一個陣列。陣列只剩兩格時，兩種寫法都只會處理 4 和 5。

```diff 04-js/pages/167-js-for-await.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const ids = [1, 2, 3];
+       const ids = [4, 5];
  
        const load = (id) => {
          return new Promise((resolve) => {
            // ...
```

```text
4
5
4,5
```

</details>

# JSON

JSON 是一種文字格式，用來在程式與程式之間搬資料。它長得像物件實字，但規則更嚴。瀏覽器儲存與 Fetch 的 body 都要先變成這種文字，這一章先把文字與物件分開。

## JSON 格式

JSON 只表達資料，不表達程式。鍵、字串、註解、尾端逗號這些地方，JavaScript 物件允許的寫法，JSON 常常不允許。

### 語法規則與常見錯誤

先記規則，再看違規時會發生什麼。`JSON.parse` 只接受合法的 JSON 文字，不合就拋出 `SyntaxError`，不會回傳一個修到一半的物件。

- 鍵與字串都必須用雙引號。單引號或沒有引號的鍵會讓 `parse` 拋出 SyntaxError。
- 不能寫註解，最後一項後面也不能留逗號。這兩種都是語法錯誤。
- 內容只能是物件、陣列、字串、數字、布林與 null。函式、`undefined` 與 `NaN` 都不是 JSON。

**觀念**

示範用的文字看起來像物件，但鍵沒有雙引號，字串用了單引號。parse 會失敗。接著 stringify 一個帶有 `undefined` 的物件，那個鍵會被拿掉，因為它沒有合法的 JSON 值可以寫。

```html 04-js/pages/168-js-json-rule.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>語法規則與常見錯誤</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      try {
        JSON.parse("{ name: '小安' }");
        console.log('不該成功');
      } catch (error) {
        console.log(error.name);
      }

      console.log(JSON.stringify({ name: '小安', note: undefined }));
    </script>
  </body>
</html>
```

**解析**

- 那串文字不是 JSON，所以不會印出不該成功。
- 接住的是 SyntaxError。訊息內容會指出位置，這一支只印名稱。
- stringify 的結果是雙引號字串，鍵名也有雙引號。
- note 的值是 undefined，這個鍵不會出現在文字裡。函式鍵也會被同樣省掉。

```text
SyntaxError
{"name":"小安"}
```

{% note success %}
**換你試試：**
改 parse 合法的文字 '{"name":"小安"}'。第一行應變成物件的 name，第二行維持只有 name 的 JSON 文字。
{% endnote %}

<details>
<summary>參考答案</summary>

合法文字可以 parse 成物件。stringify 那一行沒有改，undefined 的鍵仍然不會出現。

```diff 04-js/pages/168-js-json-rule.html
  // ...
      <script>
        try {
-         JSON.parse("{ name: '小安' }");
-         console.log('不該成功');
+         const data = JSON.parse('{"name":"小安"}');
+         console.log(data.name);
        } catch (error) {
          console.log(error.name);
        // ...
```

```text
小安
{"name":"小安"}
```

</details>

### JSON.parse 與 JSON.stringify

兩個方法方向相反。一個把文字變回值，一個把值收成文字。來回路過之後你拿到的是新物件，不是原來那個。

- `JSON.parse` 接收字串，回傳物件、陣列或基本值。文字不合法時拋出 SyntaxError。
- `JSON.stringify` 接收值，回傳字串。日期物件會先變成 ISO 時間文字，`parse` 不會自動還原成日期物件。

**觀念**

`note` 先被收成文字，再被 parse 回來。Console 先看到那一整段文字，再看到欄位 `title`。最後比較兩個物件是不是同一個，結果是 true 表示它們不是同一個。

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

- raw 是字串，所以第一行有大括號與雙引號，不是物件。
- back.title 是讀書，表示文字裡的欄位被還原了。
- back !== note 是 true，parse 做出新物件，改 back 不會改到 note。
- 若 raw 被人改壞，parse 會拋出 SyntaxError。使用儲存資料時要先準備接住它。

```text
{"title":"讀書","done":false}
讀書
true
```

{% note success %}
**換你試試：**
在 note 加一個欄位 count，值是 2。第一行的文字應含有 count，並多印一行 back.count。
{% endnote %}

<details>
<summary>參考答案</summary>

stringify 會把數字欄位一起寫進文字。parse 還原後 count 仍是數字 2，不是字串。

```diff 04-js/pages/169-js-json.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const note = { title: '讀書', done: false };
+       const note = { title: '讀書', done: false, count: 2 };
        const raw = JSON.stringify(note);
        const back = JSON.parse(raw);
        // ...
        console.log(back.title);
        console.log(back !== note);
+       console.log(back.count);
      </script>
    </body>
  // ...
```

```text
{"title":"讀書","done":false,"count":2}
讀書
true
2
```

</details>

## 轉換與應用

格式懂了之後，要把文字用回畫面上。這一節先從一段 JSON 文字畫出清單，再把程式裡的狀態收成文字。Fetch 之前，資料都還是你自己準備的字串。

### 從文字還原資料

伺服器或檔案給你的往往是文字。先 parse 成陣列，再用上一篇的方式做成 li。不要把整段 JSON 直接塞進 `innerHTML`。

**觀念**

`raw` 是陣列文字，兩筆各有名字與價格。parse 之後用 `forEach` 建立清單，並把名字印到 Console，方便你對照畫面。

```html 04-js/pages/170-js-json-read.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>從文字還原資料</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button, input { font: inherit; }
    </style>
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

- raw 使用雙引號，所以 parse 會成功，items 的長度是 2。
- 每一列用 textContent 放入名字與價格，中間空一格。
- Console 只印名字，價格留在畫面上那一列的文字裡。
- 若 raw 少一個括號，整支程式會停在 parse，清單會是空的。

```text
筆
紙
```

{% note success %}
**換你試試：**
在文字陣列最後加一筆，名字是尺、價格是 15。Console 應多一行尺。
{% endnote %}

<details>
<summary>參考答案</summary>

parse 會得到三個物件。forEach 多跑一圈，所以清單與 Console 都多一筆。

```diff 04-js/pages/170-js-json-read.html
  // ...
      <ul id="list"></ul>
      <script>
-       const raw = '[{"name":"筆","price":25},{"name":"紙","price":40}]';
+       const raw = '[{"name":"筆","price":25},{"name":"紙","price":40},{"name":"尺","price":15}]';
        const items = JSON.parse(raw);
        const list = document.querySelector('#list');
        // ...
```

```text
筆
紙
尺
```

</details>

### 把資料收成文字

要送出或存起來之前，物件得先變成文字。`stringify` 的回傳值是字串，型別不會再是 object。這一節把結果放到 `pre`，也印到 Console。

**觀念**

狀態只有標題與是否完成。收成文字後，`pre` 顯示同一段 JSON，Console 再印出它的型別，確認不是物件。

```html 04-js/pages/171-js-json-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>把資料收成文字</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button, input { font: inherit; }
    </style>
  </head>
  <body>
    <pre id="out"></pre>
    <script>
      const state = { title: '讀書', done: false };
      const text = JSON.stringify(state);
      document.querySelector('#out').textContent = text;
      console.log(text);
      console.log(typeof text);
    </script>
  </body>
</html>
```

**解析**

- stringify 不會在冒號後面加空格，這是正常的 JSON 文字。
- pre 用 textContent 放入這段文字，所以畫面上看得到大括號。
- typeof text 是 string。若直接把 state 交給只收文字的 API，會先被轉成不合用的形狀。
- done 在文字裡是 false 這個詞，沒有再包一層引號。它仍是布林，不是字串。

```text
{"title":"讀書","done":false}
string
```

{% note success %}
**換你試試：**
把 title 改成「寫練習」。pre 與 Console 第一行都要出現這四個字。
{% endnote %}

<details>
<summary>參考答案</summary>

欄位名稱仍是 title。改的是值，所以雙引號裡的文字跟著換，done 那一段還在。

```diff 04-js/pages/171-js-json-text.html
  // ...
      <pre id="out"></pre>
      <script>
-       const state = { title: '讀書', done: false };
+       const state = { title: '寫練習', done: false };
        const text = JSON.stringify(state);
        document.querySelector('#out').textContent = text;
        // ...
```

```text
{"title":"寫練習","done":false}
string
```

</details>

# Fetch API

Fetch 讓這一頁跟另一份資源說話，而且回傳 Promise，所以前面的寫法接得上。這一章先分清請求與回應，再讀本地的 JSON、把 JSON 送出去，最後把載入中的狀態畫回畫面上。

{% note info %}
**以前怎麼發請求**
早期是 XMLHttpRequest，jQuery 再把它包成 ajax。這一章只用 Fetch，呼叫後拿到的是 Promise。
{% endnote %}

## 認識 HTTP

瀏覽器送出請求，對方回傳回應。先認出這兩包東西裡有哪些部分，才不會把「狀態碼是 404」和「程式拋出例外」當成同一件事。

### 請求與回應的組成

一次往返分成你送出去的內容，以及對方送回來的內容。這一節讀本地的使用者檔，先看狀態碼與內容類型，還不把本體解析成陣列。

{% mermaid graph LR %}
methodNode["方法與網址"] --> reqNode["請求"]
headNode["標頭與 body"] --> reqNode
reqNode --> serverNode["伺服器"]
serverNode --> resNode["狀態碼、標頭、body"]
{% endmermaid %}

- 方法表示這次要做的事。讀取通常是 GET，它放在請求裡。
- 網址指出資源在哪。標頭是附加說明，body 是本體。GET 通常沒有本體。
- 回應帶回狀態碼、標頭與本體。狀態碼落在 2xx 時，`response.ok` 為 true。

```json 04-js/pages/data/users.json
[
  { "id": 1, "name": "小安", "city": "台北" },
  { "id": 2, "name": "小林", "city": "台南" }
]
```

{% note warning %}
**要從本機伺服器開啟**
直接雙擊時網址是 file://，瀏覽器會拒絕讀取旁邊的 JSON。請用本機伺服器開啟這一頁。
{% endnote %}

**觀念**

fetch 先給你回應物件。這一支只印狀態碼、ok，以及內容類型裡有沒有 json。名字還留在本體裡。

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

- 相對路徑會向現在這個網站要檔案，所以要用本機伺服器開啟，不能用 file://。
- status 200 表示讀取成功，ok 因此是 true。
- 內容類型後面可能還接著字元集，所以只檢查有沒有 json 這個詞。
- 還沒呼叫 json() 之前，回應本體仍是文字，程式裡還沒有使用者陣列。

```text
200
true
true
```

{% note success %}
**換你試試：**
多印一行，看 response.url 是否包含 users.json。前三行不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

url 會被補成絕對位址。用 includes 看檔名，就不必把連接埠寫死。

```diff 04-js/pages/172-js-http.html
  // ...
          console.log(response.ok);
          console.log(type.includes('json'));
+         console.log(response.url.includes('users.json'));
        };
  
        main();
      // ...
```

```text
200
true
true
true
```

</details>

### 狀態碼分類

三位數字用百位數分組。先判斷落在哪一組，再去查個別數字。這一節用存在的檔與不存在的檔，對照 200 與 404。

- 2xx 表示成功。200 是一般成功，201 常用在新增之後。
- 3xx 表示要改去別的網址。這一章不另外處理轉址。
- 4xx 表示這次請求有問題。404 是資源不存在。
- 5xx 表示伺服器處理失敗。請求有送到，但對方做不完。

**觀念**

兩個 fetch 都會完成。一個讀得到清單，一個指向不存在的檔。差別印在狀態碼上，不會先變成例外。

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

- items.json 存在，所以狀態碼是 200。
- missing.json 沒有這個檔，伺服器仍會回應，狀態碼是 404。
- 404 屬於 4xx。fetch 的 Promise 還是完成，不會因為 404 就進 catch。
- 5xx 也一樣是一份回應。只有請求根本送不出去時，Promise 才會拒絕。

```text
200
404
```

{% note success %}
**換你試試：**
把第一個網址也改成 data/missing.json。兩行都應是 404。
{% endnote %}

<details>
<summary>參考答案</summary>

兩個請求都指向不存在的檔，所以兩個狀態碼相同。這仍然不是例外。

```diff 04-js/pages/173-js-status.html
  // ...
      <script>
        const main = async () => {
-         const okRes = await fetch('data/items.json');
+         const okRes = await fetch('data/missing.json');
          const missing = await fetch('data/missing.json');
          console.log(okRes.status);
          // ...
```

```text
404
404
```

</details>

## 取得資料

讀取是這一章最常用的動作。先把本體變成陣列，再學會擋下 404，最後才把條件放進網址的查詢參數。

### fetch 與 response.json

`fetch` 的 Promise 完成時，值是回應物件。`response.json` 會再回傳一個 Promise，因為把文字解析成值也要時間。兩個都要等待，而且本體只能讀一次。

```json 04-js/pages/data/items.json
[
  { "id": 1, "name": "筆", "price": 25 },
  { "id": 2, "name": "紙", "price": 40 },
  { "id": 3, "name": "尺", "price": 15 }
]
```

**觀念**

這支程式等回應，再等 json()。三個名字來自檔案裡的 name，不是寫死在 log 裡。

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

- 第一個 await 結束時，手上還是回應物件，還沒有陣列。
- json() 會把本體解析成值，所以還要第二個 await。
- 檔案是陣列，forEach 依序印出三個名字。
- 同一份回應的本體只能讀一次。再呼叫一次 json() 會失敗。

```text
筆
紙
尺
```

{% note success %}
**換你試試：**
改讀 data/users.json，並印出 city。應看到台北與台南。
{% endnote %}

<details>
<summary>參考答案</summary>

users.json 的欄位是 name 與 city。這一支改印城市，筆數仍是兩筆。

```diff 04-js/pages/174-js-fetch.html
  // ...
      <script>
        const main = async () => {
-         const response = await fetch('data/items.json');
+         const response = await fetch('data/users.json');
          const items = await response.json();
          items.forEach((item) => {
-           console.log(item.name);
+           console.log(item.city);
          });
        };
        // ...
```

```text
台北
台南
```

</details>

### 檢查 response.ok

狀態碼是回應的一部分，所以 404 與 500 仍會讓 fetch 完成。規則是：先看 `response.ok`，不是 2xx 就自己拋出錯誤。只有連不上、被瀏覽器擋下，或請求被中止時，Promise 才會拒絕，那時才進 catch，而且手上沒有狀態碼。

**觀念**

load 先印出狀態碼，確認回應已經回來，再在不是 2xx 時拋出錯誤。catch 印到的是你拋出的訊息。

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
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 第一行 404 來自回應物件，代表 fetch 已經完成，不是網路失敗。
- ok 為 false 時主動 throw，後面的 json() 就不會執行。
- catch 印出的是你組出來的訊息。若是網路失敗，不會有第一行狀態碼。
- 讀得到檔案時不該 throw。長度會印在狀態碼下面。

```text
404
狀態 404
```

{% note success %}
**換你試試：**
改抓 data/items.json。應印出 200，再印出 3，而且不出現「狀態 200」。
{% endnote %}

<details>
<summary>參考答案</summary>

200 是成功，ok 為 true，所以不會 throw。json() 得到三筆，長度是 3。

```diff 04-js/pages/175-js-ok.html
  // ...
        };
  
        const main = async () => {
-         await load('data/missing.json');
+         await load('data/items.json');
        };
  
        main();
      // ...
```

```text
200
3
```

</details>

### 查詢參數

條件不要直接黏進網址字串裡。`URLSearchParams` 會幫你編碼，並用 `toString` 交出查詢字串。這一節改向公開的假 API 要資料，不再讀本地檔。

- `URLSearchParams` 用物件建立查詢參數，回傳參數物件。
- `toString` 回傳已經編碼的查詢字串，不含開頭的問號。問號要自己接在路徑後面。

{% note info %}
**這是公開的假 API**
jsonplaceholder.typicode.com 會回應讀取與寫入，但不會真的把資料存進去。重新讀取時，你新增的內容不會留下。
{% endnote %}

**觀念**

查詢字串寫成 userId=1。假 API 會回一組文章，第一筆的 userId 應是數字 1。

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
        const query = new URLSearchParams({ userId: '1' });
        console.log(query.toString());
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?' + query.toString()
        );
        const posts = await response.json();
        console.log(posts.length > 0);
        console.log(posts[0].userId);
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- toString 的結果沒有問號，問號是接在 posts 後面的那一個字元。
- 這次網址指向別的網站，不需要你的本地 JSON 檔。
- length > 0 用來確認有回資料，又不把筆數寫死。
- 第一筆的 userId 是數字 1，和查詢參數是同一個人。

```text
userId=1
true
1
```

{% note success %}
**換你試試：**
把 userId 改成 2。第一行應變成 userId=2，最後一行應是 2。
{% endnote %}

<details>
<summary>參考答案</summary>

參數改了，查詢字串與回來的 userId 一起改。中間那行仍只是在確認陣列不是空的。

```diff 04-js/pages/176-js-query.html
  // ...
      <script>
        const main = async () => {
-         const query = new URLSearchParams({ userId: '1' });
+         const query = new URLSearchParams({ userId: '2' });
          console.log(query.toString());
          const response = await fetch(
            // ...
```

```text
userId=2
true
2
```

</details>

## 送出資料

讀取用 GET。新增、整筆取代、改一部分、刪除，則換成別的方法，並把路徑指到同一種資源。這一節都打向同一個假 API，回應看得到，重新整理後那些寫入不會留在對方的清單裡。

### POST 送 JSON

新增時方法用 POST，路徑指向集合而不是某一筆。body 必須是文字，物件要先 `stringify`。標頭要聲明這段文字是 JSON，對方才知道怎麼解析。

**規則先看標頭。** 沒有 `Content-Type: application/json` 時，許多伺服器不會把 body 當成 JSON，回應裡的欄位就會是空的。

**觀念**

這支程式新增一則筆記。狀態碼 201 表示對方接受了新增。標題會在回應裡出現，但假 API 不會把它留到下一次讀取。

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
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- 方法是 POST，路徑是 /posts，表示在文章這個集合裡新增一筆。
- headers 聲明本體是 JSON。body 是 stringify 之後的文字，不是物件。
- 201 屬於 2xx，這次請求被接受。回應 JSON 裡看得到你送出的標題。
- 再對 /posts 做一次 GET，不會看到這則新筆記。假 API 只模擬回應。

```text
201
新筆記
```

{% note success %}
**換你試試：**
把 title 改成「第二則」。狀態碼仍應是 201，第二行改印第二則。
{% endnote %}

<details>
<summary>參考答案</summary>

標題來回應的 JSON，也就是你放進 stringify 的那個欄位。方法與標頭都沒改。

```diff 04-js/pages/177-js-post.html
  // ...
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
-           body: JSON.stringify({ title: '新筆記', body: '第一行', userId: 1 }),
+           body: JSON.stringify({ title: '第二則', body: '第一行', userId: 1 }),
          });
          const created = await response.json();
          // ...
```

```text
201
第二則
```

</details>

### PUT、PATCH、DELETE 與 REST

REST 是一種慣例：同一種資源用同一條路徑，動作靠方法區分，而不是靠 /update 或 /delete 這種動詞路徑。看到方法與路徑，就知道這次是讀、新增、整筆換掉、改一部分，還是刪除。

- GET 讀取。路徑不帶 id 時是整份清單，帶 id 時是單一筆。通常沒有 body。
- POST 在集合路徑新增一筆，body 帶新資料。
- PUT 整筆取代。路徑帶 id，body 要帶上這一筆的完整內容。
- PATCH 只改一部分。路徑帶 id，body 只放要改的欄位。
- DELETE 刪除。路徑帶 id，通常沒有 body。

**觀念**

三個請求都指向 posts/1，方法分別是整筆取代、部分更新與刪除。假 API 三個都會以 200 回應，而且不會真的改掉下一個人讀到的資料。

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

- 三個網址相同，差別在方法。路徑上的 1 指出是哪一筆文章。
- PUT 的 body 帶了標題、本文與 userId，表示整筆要長這樣。
- PATCH 只送 title，表示其他欄位維持不動。
- DELETE 沒有 body。200 只表示這次回應成功，不表示你的本地檔被刪掉。

```text
200
200
200
```

{% note success %}
**換你試試：**
在三行狀態碼後面再印 putRes.ok。應是 true。
{% endnote %}

<details>
<summary>參考答案</summary>

200 屬於 2xx，所以 ok 是 true。三個方法的狀態碼那三行不變。

```diff 04-js/pages/178-js-rest.html
  // ...
          console.log(patchRes.status);
          console.log(deleteRes.status);
+         console.log(putRes.ok);
        };
  
        main();
      // ...
```

```text
200
200
200
true
```

</details>

### FormData 送出表單

表單已經可以用 `FormData` 讀欄位。把它直接當成 fetch 的 body 時，瀏覽器會自己加上含有邊界的內容類型。規則是不要自己設定 Content-Type。自己設成 JSON 或漏掉邊界時，對方會拆不開欄位。

這一支仍打向假 API。欄位值先印在 Console，確認讀得到；狀態碼只用來確認請求有送出。假 API 主要示範 JSON 本體，回應裡不一定看得到表單欄位。

**觀念**

頁面載入後就送出表單。第一行是欄位值，第二行是狀態碼。沒有手動加 JSON 標頭。

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
    <script>
      const form = document.querySelector('#editor');

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        console.log(data.get('name'));
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: data,
        });
        console.log(response.status);
      });

      form.requestSubmit();
    </script>
  </body>
</html>
```

**解析**

- preventDefault 先停掉表單預設的整頁送出，改由 fetch 發請求。
- FormData 從表單收集欄位。get 讀到的是小安，這一步還不需要網路。
- body 放 FormData 本身，沒有設定 Content-Type，邊界才不會弄丟。
- 201 表示假 API 接受了這次 POST。回應內容不一定含有 name。

```text
小安
201
```

{% note success %}
**換你試試：**
把輸入框的 value 改成小林。Console 第一行應變成小林，狀態碼仍是 201。
{% endnote %}

<details>
<summary>參考答案</summary>

送出前先把欄位改成小林。FormData 在 requestSubmit 時讀到的就是這個新值。

```diff 04-js/pages/179-js-form.html
  // ...
          console.log(response.status);
        });
  
+       document.querySelector('[name="name"]').value = '小林';
        form.requestSubmit();
      </script>
    // ...
```

```text
小林
201
```

</details>

## 載入、成功與錯誤畫面

網路不會在下一行就結束。畫面上要有載入中、完成、失敗三種樣子，而且都由同一份狀態畫出來。做法和上一篇的重繪相同：先改狀態，再呼叫 render。

### 三種狀態的重繪

狀態只記現在是哪一種，以及成功時的陣列。render 先寫狀態文字，只有 ready 才把清單畫出來。失敗時清單是空的，避免留下上一輪的項目。

- `loading` 表示請求還沒結束。清單先清掉，文字顯示載入中。
- `ready` 表示本體已經變成陣列。這時才依陣列建立 li。
- `error` 表示狀態碼不成功，或請求被拒絕。文字顯示讀取失敗，清單維持空白。

**觀念**

載入函式先切到 loading 並印出這個字，故意等 200 毫秒，再讀 items.json。成功後印出 ready 與長度。按鈕可以再跑一次。

```html 04-js/pages/180-js-loading.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>三種狀態的重繪</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button, input { font: inherit; }
      form { display: flex; gap: 0.5rem; margin: 0.75rem 0; }
      li { margin: 0.35rem 0; }
    </style>
  </head>
  <body>
    <p id="status"></p>
    <ul id="list"></ul>
    <button type="button" id="reload">重新載入</button>
    <script>
      const state = { status: 'idle', items: [] };
      const statusEl = document.querySelector('#status');
      const list = document.querySelector('#list');

      const render = () => {
        const label = {
          idle: '尚未載入',
          loading: '載入中',
          ready: '完成',
          error: '讀取失敗',
        };
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
          await new Promise((resolve) => setTimeout(resolve, 200));
          const response = await fetch('data/items.json');
          if (!response.ok) throw new Error(String(response.status));
          state.items = await response.json();
          state.status = 'ready';
        } catch (error) {
          state.status = 'error';
          state.items = [];
        }
        render();
        console.log(state.status);
        console.log(state.items.length);
      };

      document.querySelector('#reload').addEventListener('click', () => {
        load();
      });
      load();
    </script>
  </body>
</html>
```

**解析**

- 進函式就先改成 loading 並 render，所以會先看到載入中，即使檔案其實很快就回來。
- 200 毫秒的等待只是為了把這個狀態留在畫面上。正式讀取時可以拿掉。
- ok 才把陣列放進狀態。ready 之後 render 才建立三個 li。
- 失敗時長度是 0，狀態文字是讀取失敗，不會把上一次的清單留在畫面上。

```text
loading
ready
3
```

{% note success %}
**換你試試：**
把網址改成 data/missing.json。Console 應變成 loading、error、0。畫面文字是讀取失敗。
{% endnote %}

<details>
<summary>參考答案</summary>

404 會進你丟出的錯誤，catch 把狀態改成 error。json() 不會被呼叫，items 保持空陣列。

```diff 04-js/pages/180-js-loading.html
  // ...
          try {
            await new Promise((resolve) => setTimeout(resolve, 200));
-           const response = await fetch('data/items.json');
+           const response = await fetch('data/missing.json');
            if (!response.ok) throw new Error(String(response.status));
            state.items = await response.json();
            // ...
```

```text
loading
error
0
```

</details>

### 綜合練習：抓清單與新增

這一頁同時有狀態文字、表單與清單。第一步只負責把本地檔畫出來。第二步補上載入與失敗，並在送出時 POST 到假 API，再把新的一筆推進自己的狀態。假 API 不會改寫你的 JSON 檔，所以重新整理後，新增的那筆會消失。

**第一步：畫出清單**

先確認檔案讀得到、畫面上有三列。表單先放著，這一步還不聽送出。

**觀念**

main 等 json() 之後，把每一筆做成 li，狀態文字寫成完成，並印出長度。

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

- 這一支假設檔案存在，還沒有檢查 ok，也還沒有載入中的文字。
- 三列的文字是名字、空白、價格，資料來自 items.json。
- 表單按下去會整頁送出。第二步才改由 fetch 處理。
- Console 的 3 用來對照畫面上的列數。

```text
3
```

{% note success %}
**換你試試：**
在每一列後面改印 item.name 到 Console。長度那一行留著，下面應依序是筆、紙、尺。
{% endnote %}

<details>
<summary>參考答案</summary>

forEach 多一行 log 就會依陣列順序印出名字。畫面的列數仍然是三。

```diff 04-js/pages/181-js-items.html
  // ...
            li.textContent = item.name + ' ' + item.price;
            list.append(li);
+           console.log(item.name);
          });
          console.log(items.length);
        // ...
```

```text
3
筆
紙
尺
```

</details>

**第二步：補上狀態與新增**

載入時先進入 loading。成功才畫清單，失敗就留下讀取失敗。表單通過檢查後，把名稱與價格送到假 API，回應成功才推進 state.items 並重畫。

**觀念**

load 會先印 loading。讀取成功後印 ready 與 3。送出時才會再印你輸入的名稱，這份自動執行的結果停在前三行。

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
        } catch (error) {
          state.status = 'error';
        }
        render();
        console.log(state.status);
        console.log(state.items.length);
      };

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        const data = new FormData(form);
        const name = String(data.get('name')).trim();
        const price = Number(data.get('price'));
        if (!name || Number.isNaN(price)) return;
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: name, body: String(price), userId: 1 }),
        });
        if (!response.ok) {
          state.status = 'error';
          render();
          return;
        }
        const created = await response.json();
        state.items.push({ id: created.id, name, price });
        state.status = 'ready';
        form.reset();
        render();
        console.log(name);
      });

      load();
    </script>
  </body>
</html>
```

**解析**

- loading 時 render 會把清單清掉，所以不會先閃出舊資料。
- 不是 2xx 就進 error，清單保持空白。
- 名稱去掉空白後是空的，或價格不是數字，就直接 return，不會送出。
- POST 成功後把這一筆推進陣列。假 API 不會更新 items.json，重新整理會回到檔案裡的三筆。

```text
loading
ready
3
```

{% note success %}
**換你試試：**
讀取成功後多印第一筆的 name。Console 最後一行應是筆。
{% endnote %}

<details>
<summary>參考答案</summary>

items[0] 就是檔案裡的第一個物件。送出表單的流程沒有改。

```diff 04-js/pages/181-js-items.html.final
  // ...
          console.log(state.status);
          console.log(state.items.length);
+         console.log(state.items[0].name);
        };
  
        form.addEventListener('submit', async (event) => {
          // ...
```

```text
loading
ready
3
筆
```

</details>

## 選讀：取消與逾時

人可能在回應回來之前就離開這一步。`AbortController` 可以中止進行中的 fetch。`AbortSignal.timeout` 則在時間到時自己中止。被中止的 Promise 會拒絕，錯誤名稱是 AbortError，不會帶著 HTTP 狀態碼。

- `AbortController` 建立控制器，回傳的 signal 交給 fetch。呼叫 `abort` 就中止這次請求。
- `AbortSignal.timeout` 回傳一個會在毫秒數到達時中止的 signal。時間內完成就不受影響。

**觀念**

第一個請求立刻 abort，所以名稱是 AbortError。第二個給 3000 毫秒，本地檔會在時限內讀完，ok 是 true。

```html 04-js/pages/182-js-abort.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：取消與逾時</title>
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

        const response = await fetch('data/items.json', {
          signal: AbortSignal.timeout(3000),
        });
        console.log(response.ok);
      };

      main();
    </script>
  </body>
</html>
```

**解析**

- abort 之後那個 fetch 會拒絕，不會給你回應物件。
- catch 裡看 name。AbortError 表示被中止，不是 404。
- timeout 的 signal 在時限內沒被中止，第二個請求就照常完成。
- 取消時的錯誤名稱是 AbortError。畫面若要和讀取失敗分開，就不要共用同一句狀態文字。

```text
AbortError
true
```

{% note success %}
**換你試試：**
拿掉 abort 那一行，並在 try 裡印出完成。第一行應變成完成，第二行仍是 true。
{% endnote %}

<details>
<summary>參考答案</summary>

沒有人中止時，await 會拿到回應。這一支不讀本體，只確認它完成。

```diff 04-js/pages/182-js-abort.html
  // ...
          const controller = new AbortController();
          const job = fetch('data/items.json', { signal: controller.signal });
-         controller.abort();
          try {
            await job;
-           console.log('不該完成');
+           console.log('完成');
          } catch (error) {
            console.log(error.name);
          // ...
```

```text
完成
true
```

</details>

## 選讀：同源政策與 CORS

瀏覽器預設只讓這一頁讀「同一個來源」的回應內容。來源看的是協定、主機與連接埠，三個都相同才算同一個來源。別的網站若沒有在回應裡允許你這個來源，腳本就讀不到那份回應。

這不是伺服器沒開機。請求可能已經送達，瀏覽器仍會把這次 `fetch` 拒絕，錯誤名稱是 TypeError，看起來和斷線很像。要連同 cookie 一起送時才需要設定 `credentials`。對方必須明確允許你的來源，不能用萬用字元來配合帶憑證的請求。

**觀念**

example.com 沒有允許這個練習頁讀取它的內容，所以第一行是 TypeError。旁邊的 items.json 是同一個來源，ok 仍是 true。

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

- 練習頁與 example.com 的主機不同，不是同一個來源。
- 對方沒有允許這個來源時，fetch 拒絕，名稱是 TypeError。
- 這種失敗沒有 response.status 可以讀，因為你拿不到回應物件。
- 本地 JSON 與這頁同一個來源，不受這條跨來源規則影響。

```text
TypeError
true
```

{% note success %}
**換你試試：**
把跨來源網址改成 data/items.json，兩次都讀本地檔。第一行應變成沒被擋，第二行仍是 true。
{% endnote %}

<details>
<summary>參考答案</summary>

同一個來源的檔案可以讀到本體，try 裡的 log 會執行，不會進 catch。

```diff 04-js/pages/183-js-cors.html
  // ...
        const main = async () => {
          try {
-           await fetch('https://example.com/');
+           await fetch('data/items.json');
            console.log('沒被擋');
          } catch (error) {
            // ...
```

```text
沒被擋
true
```

</details>

# 瀏覽器儲存

重新整理之後，變數裡的清單會消失。瀏覽器提供的儲存可以把文字留在這台電腦的這個來源底下。這一章用 Web Storage 留下待辦，再選讀 cookie 與兩種登入之後怎麼認得人。

## Web Storage

`localStorage` 與 `sessionStorage` 都是鍵對應到字串。介面相同，差別在資料活多久。兩者都只屬於現在這個來源，別的網站讀不到。

### localStorage 與 sessionStorage

兩個物件的方法一樣。寫入用 setItem，讀取用 getItem，刪除一筆用 removeItem。找不到鍵時 `getItem` 回傳 null，不會拋錯。

- `localStorage` 在關掉分頁、關掉瀏覽器之後還在，直到你刪掉或程式清掉。適合留下待辦與偏好。
- `sessionStorage` 只活在這個分頁。分頁關掉就沒了，重新整理還在。適合暫時的步驟。
- `clear` 會刪掉這個來源底下該儲存區的每一個鍵。課堂不要對整個儲存區呼叫它。

**容量與型別。** 值只能是字串。超出容量時 `setItem` 會拋錯，所以寫入大量資料前要知道它不是拿來放檔案的。

**觀念**

兩個儲存各寫一筆，印出來，再刪掉 localStorage 的那一筆。sessionStorage 的值這時還在，但這一支沒有再讀它。

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
    </script>
  </body>
</html>
```

**解析**

- setItem 的兩個引數都是字串。color 這筆放在 localStorage。
- step 放在 sessionStorage，讀法與 localStorage 相同。
- removeItem 只刪 color。下一次 getItem 得到 null，不是空字串，也不會拋錯。
- 重新整理後，若沒有再 remove，localStorage 的鍵還在。關掉分頁後，sessionStorage 的 step 會消失。

```text
teal
1
null
```

{% note success %}
**換你試試：**
刪掉 color 之後再讀一次 step，並把寫入的 step 改成 2。最後兩行應是 null 與 2。
{% endnote %}

<details>
<summary>參考答案</summary>

removeItem 不影響另一個儲存區。step 改的是寫入的字串，getItem 就讀到 2。

```diff 04-js/pages/184-js-storage.html
  // ...
      <script>
        localStorage.setItem('color', 'teal');
-       sessionStorage.setItem('step', '1');
+       sessionStorage.setItem('step', '2');
        console.log(localStorage.getItem('color'));
        console.log(sessionStorage.getItem('step'));
        localStorage.removeItem('color');
        console.log(localStorage.getItem('color'));
+       console.log(sessionStorage.getItem('step'));
      </script>
    </body>
  // ...
```

```text
teal
2
null
2
```

</details>

### 存物件要轉 JSON

儲存區不收物件。你把物件交進去時，它會先被轉成 [object Object] 這段文字，之後 parse 就會拋錯。規則是寫入前 `stringify`，讀出後再 parse。文字不合法時要接住錯誤，退回預設資料。

**觀念**

note 先變成文字再存。讀出來的 raw 是字串，parse 之後才有 title。示範結束就把這筆刪掉，避免留在你的瀏覽器裡。

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
      localStorage.setItem('note', JSON.stringify(note));
      const raw = localStorage.getItem('note');
      const back = JSON.parse(raw);
      console.log(typeof raw);
      console.log(back.title);
      localStorage.removeItem('note');
    </script>
  </body>
</html>
```

**解析**

- stringify 的結果才是 setItem 的第二個引數。
- getItem 永遠給字串或 null。typeof raw 因此是 string。
- parse 之後才讀得到 title。這個 back 是新物件。
- 若 setItem 時直接放 note，存進去的會是 [object Object]，parse 會拋出 SyntaxError。

```text
string
讀書
```

{% note success %}
**換你試試：**
把 title 改成「寫練習」，其餘流程不變。第二行應變成寫練習。
{% endnote %}

<details>
<summary>參考答案</summary>

鍵名仍是 note。改的是物件裡的值，stringify 會把新標題寫進文字。

```diff 04-js/pages/185-js-storage-json.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const note = { title: '讀書', done: false };
+       const note = { title: '寫練習', done: false };
        localStorage.setItem('note', JSON.stringify(note));
        const raw = localStorage.getItem('note');
        // ...
```

```text
string
寫練習
```

</details>

### 綜合練習：讓待辦清單重新整理後還在

上一篇的待辦清單重新整理就回到最初兩筆。這一節沿用那份狀態、render 與兩個監聽，把同一份資料放進 `localStorage`。鍵名用 todo-keep，不要呼叫 clear，避免刪掉這個來源底下其他練習留下的鍵。

**第一步：沿用待辦清單**

先讓新增、切換與刪除在這份新頁面上能動。這一步還沒有讀寫儲存，所以重新整理一定回到程式裡的兩筆。

**觀念**

狀態寫在程式裡。render 畫出兩列，Console 印出兩個標題，用來對照畫面。

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

- 第二筆 done 是 true，標題會有刪除線。第一筆沒有。
- 送出時推進一筆並重畫。重新整理後，新的那筆會消失。
- 點擊仍由 ul 接收，用 data-action 分辨切換或刪除。
- 這一步沒有 setItem，所以瀏覽器裡不會多出 todo-keep。

```text
讀講義,改練習檔
```

{% note success %}
**換你試試：**
把第二筆標題改成「交作業」。Console 應變成讀講義,交作業。重新整理後也還是這筆，因為它寫在程式裡。
{% endnote %}

<details>
<summary>參考答案</summary>

標題是狀態的一部分，不是從儲存讀出來的。改程式裡的字，每次開啟都是這句。

```diff 04-js/pages/186-js-todo-keep.html
  // ...
          items: [
            { id: 1, title: '讀講義', done: false },
-           { id: 2, title: '改練習檔', done: true },
+           { id: 2, title: '交作業', done: true },
          ],
        };
        // ...
```

```text
讀講義,交作業
```

</details>

**第二步：讀出與寫回**

開啟時先讀 `todo-keep`。沒有這個鍵，或文字不是合法 JSON，或裡面沒有 items 陣列，就用程式裡的兩筆。新增、切換、刪除之後都 `stringify` 再寫回去。空陣列也要寫，這樣全部刪光之後，重新整理才不會又回到兩筆預設。

{% note info %}
**若畫面不是預設兩筆**
這個鍵若已經有舊資料，開啟時會先看到舊清單。到開發者工具刪掉 localStorage 的 todo-keep，再重新整理，就會回到預設。
{% endnote %}

**觀念**

loadState 決定一開始的狀態。沒有舊資料時，Console 仍是兩個預設標題。之後每次改狀態都會 save。

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

- getItem 得到 null 時用 fallback，不會對 null 呼叫 parse。
- parse 拋錯，或 items 不是陣列，也退回預設。壞資料不會讓整頁停住。
- save 把 nextId 與 items 一起寫進去，下一筆才不會和舊 id 撞號。
- 新增、切換、刪除都在改完狀態後 save。只 render、不 save 的話，重新整理還是會丟。

```text
讀講義,改練習檔
```

{% note success %}
**換你試試：**
沒有舊資料時，把預設第二筆改成「交作業」。Console 應是讀講義,交作業。若 todo-keep 已有資料，先刪掉那個鍵再看。
{% endnote %}

<details>
<summary>參考答案</summary>

fallback 只在沒有可使用的儲存時出現。改的是這份預設標題，不是已經存過的清單。

```diff 04-js/pages/186-js-todo-keep.html.final
  // ...
          items: [
            { id: 1, title: '讀講義', done: false },
-           { id: 2, title: '改練習檔', done: true },
+           { id: 2, title: '交作業', done: true },
          ],
        });
        // ...
```

```text
讀講義,交作業
```

</details>

## 選讀：Cookie

Cookie 也是存在瀏覽器裡的一小段文字，但是每次對這個來源發請求都會自動帶上。`document.cookie` 讀到的是一整串還能被腳本看到的 cookie，不是物件。腳本讀不到設成 HttpOnly 的那些。

待辦、草稿與偏好不要放這裡。它的空間小，又會跟著請求走，放大之後只是增加每次往返的負擔。登入識別若由伺服器寫成 HttpOnly，頁面腳本本來就不該自己重做一份。

**觀念**

這支只寫一個 theme，確認讀得到，再用 max-age 設成 0 把它清掉。不要把清單 stringify 之後塞進 cookie。

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
      document.cookie = 'theme=light';
      console.log(document.cookie.includes('theme=light'));
      document.cookie = 'theme=; max-age=0';
    </script>
  </body>
</html>
```

**解析**

- 指定 cookie 是用賦值一整段文字，不是 setItem。
- 讀取時拿到的是這個頁面看得到的全部 cookie，所以用 includes 找 theme。
- max-age 設成 0 表示立刻過期，用來刪掉剛剛那一筆。
- 這份練習頁的請求以後不該為了待辦而多帶這段文字。應用資料請放 Web Storage。

```text
true
```

{% note success %}
**換你試試：**
改存 theme=dark，includes 裡的字也改成 dark。Console 仍應是 true。
{% endnote %}

<details>
<summary>參考答案</summary>

寫入與檢查要用同一組名字與值。過期那一行仍然把 theme 清掉。

```diff 04-js/pages/187-js-cookie.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       document.cookie = 'theme=light';
-       console.log(document.cookie.includes('theme=light'));
+       document.cookie = 'theme=dark';
+       console.log(document.cookie.includes('theme=dark'));
        document.cookie = 'theme=; max-age=0';
      </script>
    // ...
```

```text
true
```

</details>

## 選讀：Session 與 Token 認證

登入成功之後，伺服器得在下一次請求時認得同一個人。常見有兩種做法。Session 把狀態留在伺服器，瀏覽器只留一組識別碼，通常放在 cookie，之後的請求會自動帶上。Token 由伺服器簽好交給瀏覽器，程式之後要自己放進標頭，常見的寫法是 Authorization 以 Bearer 開頭。

這一節不做登入表單，也不把密碼送到任何地方。只把兩條流程放在一起看，並做出一個假的標頭字串，確認它的形狀。

{% mermaid graph TD %}
loginNode["登入成功"] --> sessionNode["伺服器建立 session"]
sessionNode --> cookieNode["瀏覽器保存 cookie"]
cookieNode --> autoNode["之後的請求自動帶上"]
loginNode --> tokenNode["伺服器簽發 token"]
tokenNode --> keepNode["程式自己保存 token"]
keepNode --> headerNode["之後放到 Authorization"]
{% endmermaid %}

- Session 的識別碼放在 cookie。瀏覽器自動附在請求上，伺服器再去對自己保存的狀態。
- Token 放在程式拿得到的地方，例如記憶體或 Web Storage。每次請求由程式寫進標頭。
- 兩者都不是把密碼存起來。密碼只在登入那一次送出，而且這一章沒有練習用的登入網址。

**觀念**

第一行描述 session 的請求會自己帶 cookie。第二行是程式組出來的 Bearer 標頭，token 只是示範字串，沒有送到任何伺服器。

```html 04-js/pages/188-js-auth.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：Session 與 Token</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const sessionFlow = '瀏覽器自動帶上 cookie';
      const token = 'demo-token';
      const header = 'Bearer ' + token;
      console.log(sessionFlow);
      console.log(header);
    </script>
  </body>
</html>
```

**解析**

- session 那一行不是發請求，只是把自動帶上 cookie 這件事說出來。
- header 以 Bearer 與一個空白開頭，後面才是 token。
- 這個 demo-token 不是登入結果。不要把它抄去當真的憑證。
- 若以後真的要附上標頭，是放在 fetch 的 headers，而不是放進網址。

```text
瀏覽器自動帶上 cookie
Bearer demo-token
```

{% note success %}
**換你試試：**
把 token 改成 demo-2。第二行應變成 Bearer demo-2。第一行不要改。
{% endnote %}

<details>
<summary>參考答案</summary>

標頭是字串相接。token 變了，Bearer 這個詞還在前面。

```diff 04-js/pages/188-js-auth.html
  // ...
      <script>
        const sessionFlow = '瀏覽器自動帶上 cookie';
-       const token = 'demo-token';
+       const token = 'demo-2';
        const header = 'Bearer ' + token;
        console.log(sessionFlow);
        // ...
```

```text
瀏覽器自動帶上 cookie
Bearer demo-2
```

</details>

# 本篇重點回顧

下面八句是這一篇要帶走的習慣。選讀的事件迴圈、圖片包裝、取消請求、跨來源與 cookie，可以晚一點再看。

- 同步程式先跑完。延遲 0 的計時器仍排在後面，微任務又比任務佇列更早。
- 回呼可以把結果交給下一步，但層數一多就很難讀。Promise 用完成與拒絕把後續攤成一條鏈。
- Promise.all 要全部成功，allSettled 保留每一件的結局。race 取最先落地的，any 取第一個成功。
- async 函式回傳 Promise。await 只暫停這支函式。彼此無關的工作用 `Promise.all` 同時等。
- JSON 的鍵與字串要用雙引號。`parse` 把文字變回值，`stringify` 把值收成文字。
- `fetch` 遇到 404 或 500 仍會完成，要自己看 `ok`。只有送不出去或被中止時才會拒絕。
- REST 用同一條路徑配上方法表示讀寫。送 JSON 時要帶內容類型，body 用 `stringify` 的結果。
- `localStorage` 重新整理後還在，`sessionStorage` 只留在這個分頁。物件要先變成 JSON 文字再存。

# 專有名詞中英對照

上網查這一篇的說法時，用括號裡的英文當關鍵字。順序跟內文第一次出現相同。

## 認識非同步

這一組從呼叫堆疊排到回呼。事件迴圈是選讀，用來解釋執行順序與畫面卡頓。

- 呼叫堆疊（call stack）
- 事件迴圈（event loop）
- 同步（synchronous）
- 非同步（asynchronous）
- 單執行緒（single thread）
- 回呼函式（callback）
- 瀏覽器 API（Web API）
- 任務佇列（task queue）
- 微任務（microtask）
- 微任務排程（queueMicrotask）
- 巢狀地獄（callback hell）

## Promise

這一組是 Promise 的狀態、鏈與組合方法。async 的語法放在下一組。

- 承諾（Promise）
- 待定（pending）
- 已完成（fulfilled）
- 已拒絕（rejected）
- 解決（resolve）
- 拒絕（reject）
- 承諾鏈（promise chain）
- 全部完成（Promise.all）
- 全部落定（Promise.allSettled）
- 競速（Promise.race）
- 任一成功（Promise.any）
- 聚合錯誤（AggregateError）

## async 與 await

這一組是把鏈寫成直式的語法。等待的仍是 Promise。

- 非同步函式（async function）
- 等待（await）

## JSON

這一組是文字格式與兩個轉換方法。Fetch 的本體也會用到它們。

- JSON
- 剖析（parse）
- 序列化（stringify）

## Fetch API

這一組依請求、讀取、寫入、中止與跨來源的順序排列。

- 請求（request）
- 回應（response）
- 方法（method）
- 標頭（header）
- 本體（body）
- 狀態碼（status code）
- 成功旗標（ok）
- 查詢參數（query string）
- 網址搜尋參數（URLSearchParams）
- 表述性狀態轉移（REST）
- 表單資料（FormData）
- 中止控制器（AbortController）
- 中止訊號（AbortSignal）
- 同源政策（same-origin policy）
- 跨來源資源共用（CORS）
- 憑證（credentials）

## 瀏覽器儲存

這一組是留在瀏覽器裡的文字，以及兩種認得使用者的方式。

- 網頁儲存（Web Storage）
- 本地儲存（localStorage）
- 工作階段儲存（sessionStorage）
- Cookie
- 工作階段（session）
- 令牌（token）
- 授權標頭（Authorization）

