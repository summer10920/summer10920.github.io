---
title: "JavaScript 基礎：值、函式、陣列與模組"
categories:

  - 職訓課程

  - 本年度課程
tag:

  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:05:00
---

![](assets/images/banner/js.png)

JavaScript 是瀏覽器內建、負責行為的程式語言：資料變了，接下來要算什麼。這一篇先不改畫面，只在 Console 把值算對：變數、型別、字串、判斷、迴圈、函式，再到陣列、物件、內建物件與錯誤處理。模組放在選讀。選取元素、重繪列表與 `fetch` 分在後面兩篇。

<!-- more -->

# 認識 JavaScript

JavaScript 是瀏覽器用來描述行為的程式語言。這一章先說明它是什麼：和 HTML、CSS 怎麼分工、ECMAScript 與現代寫法、以及在瀏覽器與 Node.js 的執行環境。接著先看內嵌 script，再看外部檔與 src。外部檔是實務做法；為了閱讀方便，課堂 demo 把程式寫在同一份 HTML。然後用 Console 與 `console.log` 看結果，並認識註解。選讀看 alert、confirm 與 prompt。

## JavaScript 是什麼

網頁分成結構、外觀、行為。前兩層你已經寫過，行為這層才開始用程式描述資料變了之後要算什麼。這一節分三部分：HTML、CSS、JavaScript 的分工，ECMAScript 與現代寫法，以及瀏覽器與 Node.js 的執行環境。

### HTML、CSS、JavaScript 的分工

HTML 負責結構，CSS 負責外觀，JavaScript 負責行為。第 02 天寫的標記、第 03 天寫的樣式，都還只決定頁面上有什麼、長什麼樣子。點了之後要算什麼、送出前要檢查什麼，這些互動要寫成 JavaScript 才會發生。

![同一塊內容的三層：HTML 是結構骨架，CSS 加上外觀，JavaScript 處理點擊後的行為](assets/images/js-html-css-js-roles.jpg)

### ECMAScript 與現代寫法

JavaScript 是瀏覽器內建的程式語言，瀏覽器讀到 script 就由上往下執行。語言的標準叫做 ECMAScript，2015 年的第 6 版（ES6）定下 `let`、`const`、箭頭函式與模組，本課用 ES6 以後的現代寫法。

名稱裡有 Java，它和 Java 是兩種語言，語法與執行環境都不一樣。

![JavaScript 版本時間軸：1995 誕生、2009 ES5、2015 ES6 帶來 let／const、箭頭函式、class、module，之後每年一版；本課使用 ES6 以後的現代寫法](assets/images/js-ecmascript-timeline.jpg)

### 執行環境：瀏覽器與 Node.js

這裡先分執行的地方，再說明這一篇停在語言本身，下一篇才碰文件物件模型（DOM）。

![同一份 JavaScript 可以在瀏覽器操作網頁與表單，也可以在 Node.js 讀寫檔案、執行 pnpm 與 Vite 等工具](assets/images/js-runtime-browser-node.jpg)

同一套 JavaScript 可以在瀏覽器執行，也可以在 Node.js 執行。第 04 天裝的 Node 用來安裝套件、啟動 Vite；第 06 天到第 08 天先在瀏覽器裡學語言與畫面。React 階段才會大量用到 Node 的工具鏈，開發伺服器與打包都靠它，寫出來的程式最後仍送到瀏覽器執行。

本篇學的是語言本身：值、變數、函式，以及陣列和物件這些資料怎麼放。下一篇才用 JavaScript 操作畫面，也就是文件物件模型（DOM）。這裡的練習只把結果印到 Console；選取元素與改寫頁面文字留到下一篇。

## 撰寫與執行 JavaScript

這一節先看內嵌 script，再看外部檔，並核對 src 的相對路徑。外部檔是實務做法。為了閱讀方便，後面的課堂 demo 把程式寫在同一份 HTML。接著是 Console 與 `console.log`、註解。選讀看 alert、confirm 與 prompt。結果都看 DevTools 的 Console。

### 內嵌 script

程式可以直接寫在 HTML 的 script 標籤中間，不必另開檔案。這一節看它怎麼跟著頁面由上往下執行。外部檔留給多頁要共用的時候；課堂 demo 為了好讀，仍寫在同一份 HTML。

**觀念**

- script 標籤中間可以直接寫 JavaScript。程式和 HTML 放在同一個檔案，只給這一頁用。

- 執行順序就是這些 script 在頁面裡的位置，由上往下各跑一次。

- 多個頁面沒辦法共用這段程式，HTML 也會被程式碼弄得很長。下一節介紹外部檔，那是多頁共用時的實務做法。為了閱讀方便，課堂 demo 把程式寫在同一份 HTML 裡。

```html 04-js/pages/01-js-inline.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>內嵌 script</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log('第一段');
    </script>
    <script>
      console.log('第二段');
    </script>
  </body>
</html>
```

**解析**

- 頁面上有兩段 script，都只呼叫 `console.log`。
- 瀏覽器先碰到第一段，印出「第一段」，再碰到第二段，印出「第二段」。順序跟標籤在檔案裡的先後相同。
- 這兩段都寫在 HTML 裡，沒有另開檔案，也不會去載別的檔。
- 頁面那句說明仍在，因為程式只寫進 Console。

```text
第一段
第二段
```

{% note success %}
**換你試試：**
在 head 裡、其他內容之前，再加一段 script，用 `console.log` 印出「更早的一段」。重新整理後，這句要出現在 Console 的第一行。
{% endnote %}

<details>
<summary>參考答案</summary>

新的 script 寫在 head，位置比 body 裡的兩段更上面。Console 第一行先出現「更早的一段」，後面兩行的順序不變。

```diff 04-js/pages/01-js-inline.html
  // ...
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>內嵌 script</title>
+     <script>
+       console.log('更早的一段');
+     </script>
    </head>
    <body>
      // ...
```

```text
更早的一段
第一段
第二段
```

</details>

### 外部 script 檔

內嵌只服務一頁，所以實務上改用外部檔。程式放在獨立的 `.js`，HTML 用 script 的 src 指到它。同一份邏輯可以掛到多頁，HTML 也不會被程式碼撐得很長。

這一節的練習仍分成 HTML 與 js 兩個檔，才能改 src、看載入失敗。Console 那一節沿用同一頁。從註解開始，課堂 demo 把程式寫在同一份 HTML 的 script，對照時不用切檔。多頁要共用時，仍用這裡的外部檔。選讀的模組因為要 import 別的檔，也維持分開。

#### 載入與執行順序

瀏覽器讀到帶有 src 的 script，會先把檔案載入再執行。寫在這個標籤後面的 HTML 會等它跑完。多支外部檔也是依照它們在頁面裡的位置，由上往下各跑一次。

{% mermaid graph LR %}
html["HTML 載入 script"] --> run["瀏覽器由上往下執行"]
run --> log["console.log 印出值"]
log --> panel["DevTools 的 Console"]
{% endmermaid %}

這一篇把 script 放在 body 最後，頁面上的說明先被讀到，程式再跑。還沒拆成模組之前，同一頁 script 裡的變數在同一層，同名會互相影響。作用域怎麼切開，留在選讀的模組。

#### src 的相對路徑

`src` 是這份 HTML 去找外部檔的位置。下面用 `04-js` 練習資料夾的真實結構對一次。路徑寫錯時，這支程式完全不會執行。

**觀念**

- `src` 寫的是相對這份 HTML 所在位置的路徑。和 HTML 放在同一資料夾時，直接寫檔名，例如 `main.js`。

- 檔案放在子資料夾，路徑要帶資料夾名稱，例如 `js/main.js`。檔案在上一層，就先寫 `../main.js`。

- 路徑開頭加斜線，是從網站根目錄算起。Live Server 的根目錄和部署之後的根目錄可能不同，所以課堂一律用相對路徑。

- 路徑寫錯時，Console 會出現 404 或 `ERR_FILE_NOT_FOUND`。這支檔完全不會執行。

```text
04-js/
├── index.html
├── css/
│   └── site.css
└── pages/
    ├── 01-js-inline.html
    ├── 02-js-console.html
    └── 02-js-console.js
```

```html 04-js/pages/02-js-console.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>console.log、console.warn 與 console.error</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script src="02-js-console.js"></script>
  </body>
</html>
```

**解析**

- `02-js-console.html` 與 `02-js-console.js` 都在 pages。src 只寫檔名，瀏覽器就從這份 HTML 的資料夾把 js 載進來。
- `01-js-inline.html` 的程式寫在標籤中間，所以沒有 src。
- `index.html` 在 04-js 這一層。它若要載入 pages 裡的 js，得寫成 `pages/02-js-console.js`，因為檔案在子資料夾。
- 從 pages 裡的 HTML 要回到上一層找樣式，路徑寫成 `../css/site.css`。index.html 自己載入同一份檔時，因為已經在 04-js，所以寫的是 `css/site.css`。
- 開頭寫成 `/02-js-console.js` 時，瀏覽器從網站根目錄找，不會從 pages 找。
- Live Server 把開啟的資料夾當根，部署後根目錄又是網站的另一層，所以同一個斜線路徑兩邊結果可能不同。課堂一律用相對路徑。
- 把 src 改成 `js/02-js-console.js` 時，pages 底下沒有 js 這個資料夾。用 Live Server 開啟，Console 是 404；用檔案協定直接開啟，多半是 `ERR_FILE_NOT_FOUND`。
- 兩種訊息都代表檔案沒載到，程式完全沒執行。

{% note success %}
**換你試試：**
打開 `pages/02-js-console.html`，把 src 改成 `missing.js`，重新整理，看 Console 的錯誤。確認沒有印出任何結果後，再改回同資料夾的檔名。
{% endnote %}

<details>
<summary>參考答案</summary>

`missing.js` 在 pages 裡不存在，所以程式沒有執行。Live Server 會顯示 404，直接開檔則常是 ERR_FILE_NOT_FOUND。改回 `02-js-console.js` 之後，瀏覽器再次從同一資料夾載入。

```html 04-js/pages/02-js-console.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>console.log、console.warn 與 console.error</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script src="02-js-console.js"></script>
  </body>
</html>
```

</details>

### Console 與 console.log

還沒把程式寫進頁面時，可以先在 Console 直接算一行。打開第 02 天的任一頁，按 <kbd>F12</kbd> 切到 Console，輸入下面這一行再按 Enter，下一行是 `15900`。這一行沒有存進檔案，重新整理就消失；後面的練習改寫進同一份 HTML 的 script，結果仍看同一塊 Console。

```js
12800 + 3100
```

`console` 是瀏覽器提供的除錯物件。三個方法都只寫進 Console，不會改這一頁的文字。

- `log` 印一般結果。

- `warn` 印提醒。

- `error` 印失敗。

**觀念**


- 這一頁仍用 src 載入同資料夾的 js，路徑相對這份 HTML。檔名打錯時，Console 會出現載入失敗，後面的程式不會跑。

- 每一句執行完要有分號。字串用引號包起來，引號本身不是印出的內容。

- 重新整理會把這份檔再跑一遍。上一輪留在 Console 的字可以按清除圖示清掉，避免和這一次混在一起。

```html 04-js/pages/02-js-console.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>console.log、console.warn 與 console.error</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script src="02-js-console.js"></script>
  </body>
</html>
```

```js 04-js/pages/02-js-console.js
console.log('洛奇旅行');
console.log('這一梯有三條行程');
console.warn('京都那一梯尚未開放報名');
console.error('找不到編號 9 的行程');
```

**解析**

- 按 <kbd>F12</kbd> 打開 Console，重新整理。由上到下四行：一般訊息「洛奇旅行」、一般訊息「這一梯有三條行程」、黃色提醒、紅色錯誤。
- 頁面中間仍是那一句說明，因為這四行沒有改到 HTML。
- 把 src 改成不存在的檔名再整理，前四行會消失，改成一筆載入失敗。改回正確檔名就恢復。

```text
洛奇旅行
這一梯有三條行程
京都那一梯尚未開放報名
找不到編號 9 的行程
```

{% note info %}**Console 面板**`log`、`warn`、error 可以在篩選器裡分開看。正式上線前把只為了觀察而留的輸出刪掉，避免 Console 堆滿課堂訊息。{% endnote %}

{% note success %}
**換你試試：**
在最後再加一行 `console.log`，印出「開賣日 4/12」。把 `console.warn` 那句改成「花蓮那一梯只剩兩位」。
{% endnote %}

<details>
<summary>參考答案</summary>

多出來的那一行接在最後，所以 Console 第五行才是開賣日。`warn` 仍是提醒等級，只是句子換成花蓮的名額。

```html 04-js/pages/02-js-console.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>console.log、console.warn 與 console.error</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script src="02-js-console.js"></script>
  </body>
</html>
```

```js 04-js/pages/02-js-console.js
console.log('洛奇旅行');
console.log('這一梯有三條行程');
console.warn('花蓮那一梯只剩兩位');
console.error('找不到編號 9 的行程');
console.log('開賣日 4/12');
```

</details>

### 註解

註解是寫給人看的說明。單行、多行、行尾三種，瀏覽器都會整段跳過。用它解釋為什麼這樣算，不要複述下一行已經看懂的事。暫時不跑的程式也可以先註解起來，而不是刪掉還沒想好的那幾行。

**觀念**


- 兩條斜線後面到行尾都是註解。

- 斜線加星號可以包很多行，必須有成對的結尾，否則後面的程式會被一起吃掉。

- 註解可以寫在一行程式的後面。字串裡的兩條斜線是文字，不是註解。

```html 04-js/pages/03-js-comment.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>註解</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      // 這一梯先賣三條國內與日本行程
      console.log('洛奇旅行');

      /*
      下一行先不跑。
      確認欄位後再打開。
      */
      // console.log('草稿：名額尚未決定');

      console.log('行程以天數計價'); // 畫面還沒畫，只先核對資料
    </script>
  </body>
</html>
```

**解析**

- Console 只有兩行一般訊息。草稿那一行因為整行被註解，不會出現。
- 多行註解裡的中文也不會出現。行尾註解只給讀程式的人看，不影響前面那句 `log`。
- 若多行註解少寫結尾，後面的 `log` 也會被包進去，Console 就只剩第一行。

```text
洛奇旅行
行程以天數計價
```

{% note info %}
**註解寫為什麼**
「印出標題」這種話和程式重複。比較有用的是「這筆先不印，因為值還沒決定」這類原因。
{% endnote %}

{% note success %}
**換你試試：**
把草稿那一行的註解拿掉，讓它真的印出來。再在最後加一行註解，寫「價格單位是新台幣」，不要讓這句出現在 Console。
{% endnote %}

<details>
<summary>參考答案</summary>

拿掉行首的兩條斜線後，草稿變成會執行的程式，所以 Console 中間多一行。最後那句放在兩條斜線後面，瀏覽器跳過，不會多印一行。

```diff 04-js/pages/03-js-comment.html
  // ...
        確認欄位後再打開。
        */
+       console.log('草稿：名額尚未決定');
  
        console.log('行程以天數計價'); // 畫面還沒畫，只先核對資料
      </script>
    // ...
```

</details>

### 選讀：alert、confirm 與 prompt

這三個都是瀏覽器內建的函式，會跳出必須先處理的視窗。程式一行一行跑，碰到彈窗就整個停住，頁面的點擊和畫面更新也一起停。按掉之後，下一行才繼續。

**觀念**

- `alert` 只顯示訊息。按掉之後沒有帶回可用的結果。

- confirm 讓人選確定或取消，回傳 `true` 或 `false`。

- `prompt` 回傳輸入的字串。按取消會得到 `null`。

- 這種停住叫做同步、阻斷。程式本來就一行一行跑；碰到彈窗時，要等瀏覽器處理完這個視窗，下一行才會執行。後面的程式、頁面上的操作、還沒畫上去的畫面都在等。

- 實務上很少用。彈窗會卡住整個分頁，樣式也不能改成網站自己的樣子。除錯要看 Console，才不會被視窗打斷。

```html 04-js/pages/04-js-dialog.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>alert、confirm 與 prompt</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。每個視窗都要按掉，後面的程式才會繼續。</p>
    <script>
      console.log('alert 之前');
      console.log(alert('只顯示訊息'));
      console.log('alert 之後');
      console.log('confirm 之前');
      console.log(confirm('要繼續嗎'));
      console.log('confirm 之後');
      console.log('prompt 之前');
      console.log(prompt('請輸入名字'));
      console.log('prompt 之後');
    </script>
  </body>
</html>
```

**解析**

- 重新整理後，頁面先出現說明文字，接著跳出 alert。這時 Console 只有「alert 之前」。
- 視窗開著的時候頁面不能點，後面的 log 也不會出現。
- 按掉 alert 之後，Console 接著印出 `undefined`、alert 之後、confirm 之前，然後才跳出 confirm。
- `undefined` 是 alert 的回傳值，它沒有帶回訊息內容。
- confirm 按確定，下一行是 `true`；按取消是 `false`。
- 視窗關掉後才印出 confirm 之後和 prompt 之前，然後跳出 prompt。
- prompt 輸入文字再按確定，Console 印出那個字串。按取消則印 `null`。
- 沒輸入就按確定，印出的是空字串，它和按取消不同。
- 最後一行「prompt 之後」一定等這個視窗關掉才出現。
- 三個視窗都結束後，頁面中間仍是原來那句說明，因為這些程式沒有改 HTML。
- 下面假設 confirm 按確定、prompt 輸入「小明」再按確定：

```text
alert 之前
undefined
alert 之後
confirm 之前
true
confirm 之後
prompt 之前
小明
prompt 之後
```

{% note success %}
**換你試試：**
在最後再呼叫一次 `confirm`，訊息寫「再問一次」。前後各用 `console.log` 印「第二次之前」和「第二次之後」。分別按確定和取消，看中間那行差在哪。
{% endnote %}

<details>
<summary>參考答案</summary>

多出來的 confirm 接在三個視窗後面。按確定時，第二次之前和第二次之後中間是 `true`；按取消則是 `false`。

```diff 04-js/pages/04-js-dialog.html
  // ...
        console.log(prompt('請輸入名字'));
        console.log('prompt 之後');
+       console.log('第二次之前');
+       console.log(confirm('再問一次'));
+       console.log('第二次之後');
      </script>
    </body>
  // ...
```

</details>

# 變數與資料型別

變數是一個名字，對到目前記住的值。先把值放進名字，後面的計算才不用把數字散落在每一行。名字區分大小寫，`price` 和 `Price` 是兩個不同的名字。這一章先給值取名字，再分辨種類與轉型。字串的寫法與方法在下一章。

## 變數與常數

變數是幫一個值取名字，方便之後使用。值先放進名字，後面要印出來或拿去計算時，寫名字就好。

### 宣告變數與命名

用 `let` 把一個值取成名字，等號右邊放第一個值。名字用英文 camelCase，讓人看得出這個值是什麼。不能數字開頭，也不能把保留字拿來當名字。

**觀念**


- 宣告寫成 `let tourTitle = '台北城市漫遊';`。字串加引號，數字不加。

- 名字由好幾個英文單字組成時，中間不能有空白，業界依用途有固定的大小寫慣例。這些只是開發習慣，不是語法規定，但照著寫，別人一看就知道這個名字是什麼東西：

```js
// 小駝峰 camelCase：第一個單字全小寫，後面每個單字首字母大寫
// 一般變數、函式都用這種，本篇的變數都照這個寫
let tourTitle = '台北城市漫遊';
let pricePerPerson = 12800;

// 大駝峰 PascalCase：每個單字首字母都大寫
// 語法上也能宣告變數，但習慣保留給 class 與元件（React 階段會大量用到）
let TourTitle = '台北城市漫遊'; // 能跑，但 PascalCase 習慣上留給 class 和元件用

// 全大寫 UPPER_SNAKE_CASE：全部大寫、單字用底線連接
// 習慣用在整個程式都固定不變的設定值，通常搭配 const（下一節會介紹）
const MAX_PEOPLE = 12;
const TAX_RATE = 0.05;
```

- `3days` 不合法，因為數字不能當開頭；`tourDays` 可以。

- 保留字是語法自己要用的詞，不能再拿來當名字，例如 `let` 與 `const`。

- `return` 與 `if` 也是保留字，同樣不能當名字。

- 名字要看得出用途。`tourTitle` 看得出是標題，`data` 看不出來存的是什麼。

```html 04-js/pages/05-js-name.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>宣告變數與命名</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      let tourTitle = '台北城市漫遊';
      let TourTitle = '台北城市漫遊'; // 能跑，但 PascalCase 習慣上留給 class 和元件用
      let tourDays = 3;
      let pricePerPerson = 12800;

      console.log(tourTitle);
      console.log(tourDays);
      console.log(pricePerPerson);
      console.log(tourTitle, TourTitle);

      // let 3days = 3;
      // let return = '不能用保留字';
    </script>
  </body>
</html>
```

**解析**

- 前三行依序是 `tourTitle`、天數、單價：一個字串、數字 3、數字 12800。這三個名字都是 camelCase，看得出各自存什麼。
- JavaScript 會區分大小寫，所以 `TourTitle` 和 `tourTitle` 是兩個不同的變數。
- 兩個同時存在也不會互相覆蓋，也不會報錯。
- 多出來的那一行 `console.log` 把兩個名字的值印在同一行，Console 才看得到它們各自都在。
- 最後兩行是故意寫錯的命名，所以維持註解。
- 宣告變數時，名字有兩條硬性規則：不能用數字開頭，也不能用 JavaScript 已經保留給語法使用的單字（保留字）。
- 數字可以出現在名字中間或結尾，保留字也只是不能「單獨」拿來當名字，包含在較長的名字裡沒關係。
- 違反規則時，瀏覽器在讀程式的階段就會報 SyntaxError，整個檔案都不會執行，連前面的 console.log 也不會出現。

```js
// 不能用數字開頭
let 3days = 3;      // ✗ SyntaxError
let days3 = 3;      // ✓ 數字放在後面可以
let tourDays = 3;   // ✓ 建議寫法

// 不能用保留字當名字
let return = 'x';   // ✗ return 是保留字
let if = 'x';       // ✗ if、for、let、const、function 等都是保留字
let returnDate = '2026-12-24'; // ✓ 包含保留字的長名字可以
```

```text
台北城市漫遊
3
12800
台北城市漫遊 台北城市漫遊
```

{% note info %}
**名字給人讀**
同一篇練習用同一套寫法：英文 camelCase、單引號字串。看到 x、temp、data1，就換成看得出用途的名字。
{% endnote %}

{% note success %}
**換你試試：**
再宣告 `placeName` 為「花蓮」，以及 `onSale` 為 true。兩個都印出來。不要用數字開頭，也不要用保留字當名字。
{% endnote %}

<details>
<summary>參考答案</summary>

`placeName` 與 `onSale` 都是合法的 camelCase。地點帶引號，開賣與否是布林 true，不加引號。錯誤寫法仍留在註解裡，所以程式跑得完。

```diff 04-js/pages/05-js-name.html
  // ...
        let tourDays = 3;
        let pricePerPerson = 12800;
+       let placeName = '花蓮';
+       let onSale = true;
  
        console.log(tourTitle);
        console.log(tourDays);
        console.log(pricePerPerson);
        console.log(tourTitle, TourTitle);
+       console.log(placeName);
+       console.log(onSale);
  
        // let 3days = 3;
        // let return = '不能用保留字';
      </script>
    // ...
```

</details>

### let 與 const 的差別

預設用 `const`：這個名字固定對到同一個值，再寫一次等號會在 Console 報錯，原本的值留著。只有整個要換成另一個值時才用 `let`，例如把一個數字改成另一個數字。

同一個名字在同一層不能宣告兩次。沒有宣告就直接賦值，會變成誰都能改到的全域名字，所以每一個值都先宣告。

**觀念**


- 宣告用 `let` 或 `const`，名字在等號左邊，值在右邊。

- `let` 之後可以用等號換成新值。`const` 再賦值會是 TypeError。

- 同一個名字在同一層不能宣告兩次。沒有宣告就直接賦值，會變成誰都能改到的全域名字。

- 先寫 `const`。寫到後來這個名字真的要改，再換成 `let`。讀程式的人就知道哪些名字會變。

```html 04-js/pages/06-js-let.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>let 與 const 的差別</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      let price = 12800;
      const days = 3;
      const title = '台北城市漫遊';

      price = 13900;

      console.log(title);
      console.log(days);
      console.log(price);
      // days = 4;
    </script>
  </body>
</html>
```

**解析**

- 三行依序是字串、數字 3、換成 13900 之後的數字。
- `price` 用 `let` 宣告，所以等號可以把它從 12800 換成 13900。
- `days` 是 `const`，最後那一行若拿掉註解，Console 會出現 TypeError。
- 前面的三行已經印完，錯誤停在這一行。

```text
台北城市漫遊
3
13900
```

{% note info %}
**先 const，需要再改成 let**
一開始先綁死。寫到一半發現這個名字真的要換成新值，再改成 `let`。整段都不會換成新值的，就留在 `const`。
{% endnote %}

{% note success %}
**換你試試：**
把 price 再改成 14200，並新增一個 `let`，名字叫 seats，從 8 改成 6，最後把 seats 印出來。days 維持不能換。
{% endnote %}

<details>
<summary>參考答案</summary>

`price` 與 `seats` 都是 let，所以各自可以換成新數字。

`days` 仍是 `const`，Console 不會因為名額改變而把天數換成別的數。

```diff 04-js/pages/06-js-let.html
  // ...
        const days = 3;
        const title = '台北城市漫遊';
+       let seats = 8;
  
-       price = 13900;
+       price = 14200;
+       seats = 6;
  
        console.log(title);
        console.log(days);
        console.log(price);
+       console.log(seats);
        // days = 4;
      </script>
    </body>
  // ...
```

</details>

{% note info %}
**var 已淘汰**

`var` 是早期宣告變數的方式，缺乏區塊作用域保護：只認函式範圍，`{}` 擋不住，同一個名字也能再宣告一次。

ES6（2015）推出 `let` 與 `const` 之後，現代 JavaScript 已淘汰這種寫法。

```js
{
  var place = '台北';
  let spot = '花蓮';
}
console.log(place); // 台北。大括號擋不住 var
// console.log(spot); // let 出了大括號就找不到

var days = 3;
var days = 5; // 可重複宣告，5 蓋掉 3
```
{% endnote %}

{% note info %}
**const 鎖住的是綁定**
數字、字串、布林放進 const 之後不能再賦值。陣列和物件是容器，變數裡存的是指向容器的參考。格子裡的內容能不能改，陣列那一章會和重新賦值放在一起看。
{% endnote %}

### 區塊作用域

一對大括號是一個區塊作用域。裡面宣告的名字只活在那一對括號裡，外面同名的名字不會被蓋掉。內層的值讀完，外層那個名字還是原來的值。

**觀念**


- 內層可以再用一次外面已經用過的名字，兩個名字各看各的值。

- 內層的名字在右括號之後就找不到，拿去 `log` 會是 ReferenceError。

- 內層沒有自己的宣告時，會往外層找到同名的那個值。

```html 04-js/pages/07-js-scope.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>區塊作用域</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const place = '台北';

      {
        const place = '花蓮';
        const days = 3;
        console.log(place);
        console.log(days);
      }

      console.log(place);
      // console.log(days);
    </script>
  </body>
</html>
```

**解析**

- 第一行是內層的字串「花蓮」，第二行是內層的數字。
- 大括號結束後再印 `place`，回到外層的「台北」。
- 最後一行若拿掉註解，Console 會說 days 沒有宣告，因為它只存在那一對括號裡。

```text
花蓮
3
台北
```

{% note warning %}
**不要省略宣告**
若內層寫成 `place = '花蓮'` 而沒有 `const`，改到的是外層那個名字。區塊作用域就失去隔開的作用。
{% endnote %}

{% note success %}
**換你試試：**
在內層加上 `const title = '花蓮山海三日'` 並印出來。外層再宣告另一個 `title` 為「台北城市漫遊」，放在大括號後面印出，確認兩個標題沒有互相蓋掉。
{% endnote %}

<details>
<summary>參考答案</summary>

內層印出的是花蓮的標題。右括號之後那個 `title` 是外層新宣告的名字，所以最後一行是台北，花蓮那筆不會漏出來。

```diff 04-js/pages/07-js-scope.html
  // ...
          const place = '花蓮';
          const days = 3;
+         const title = '花蓮山海三日';
          console.log(place);
          console.log(days);
+         console.log(title);
        }
  
+       const title = '台北城市漫遊';
        console.log(place);
+       console.log(title);
        // console.log(days);
      </script>
    </body>
  // ...
```

</details>

## 資料型別與轉型

每個值都有種類：文字是字串，用來計算的是數字，成立與否是布林。種類不同時，看起來一樣的「3」比較起來不會相等。要換成另一種，就寫明轉換，不要指望程式自己猜。這一節先看資料型別，再看型別轉換，最後看 null、undefined 與 NaN。

### 資料型別

JavaScript 宣告時不必先寫種類，值放進去的那一刻種類就定了。同一個 `let` 之後可以改放別種值，但那樣讀起來容易誤判，課堂讓一個名字維持一種用途。

常見的種類可以先分成下面幾種。要確認種類時，`typeof` 會回報種類的名稱。

- 數字不加引號，可以是整數或小數。

- 字串用引號包住，引號裡的數字仍是文字。

- 布林只有兩個值，寫來代表成立或不成立。

**觀念**


- 字串可以用單引號或雙引號，一篇裡選定一種。本課程統一使用單引號。

- `typeof` 後面空一格再放值，結果是種類的字串，不是值本身。

- 布林不是「有」和「沒有」兩個中文字，只有 true 與 false。

```html 04-js/pages/08-js-types.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>number、string 與 boolean</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const title = '台北城市漫遊';
      const days = 3;
      const price = 12800;
      const onSale = true;

      console.log(typeof title);
      console.log(typeof days);
      console.log(typeof price);
      console.log(typeof onSale);
      console.log(title);
    </script>
  </body>
</html>
```

**解析**

- 前四行是種類名稱：字串、數字、數字、布林。最後一行才是字串本身。
- 數字很大，種類仍是數字，不會因為位數變多就變成字串。

```text
string
number
number
boolean
台北城市漫遊
```

{% note info %}
**引號決定種類**
`3` 是數字，`'3'` 是只有一個字元的字串。畫面上長得一樣，比較與加減的規則不同。
{% endnote %}

{% note warning %}
**typeof 有兩個舊結果**
`typeof null` 得到的字串是 object。這是早期留下的結果，判斷空位要改用嚴格相等對上 null。

陣列拿去 typeof，得到的也是 object。要確認一個值是不是陣列，用 `Array.isArray`。用法在陣列那一章。
{% endnote %}

{% note success %}
**換你試試：**
再加上字串「花蓮」，以及一個布林 false。把這兩個值的種類與值都印出來。
{% endnote %}

<details>
<summary>參考答案</summary>

地點帶引號，種類是 string。`full` 沒有引號，而且是布林的 false，種類才是 boolean。若寫成 `'false'`，種類會變成 string。

```diff 04-js/pages/08-js-types.html
  // ...
        const price = 12800;
        const onSale = true;
+       const place = '花蓮';
+       const full = false;
  
        console.log(typeof title);
        console.log(typeof days);
        // ...
        console.log(typeof onSale);
        console.log(title);
+       console.log(typeof place);
+       console.log(place);
+       console.log(typeof full);
+       console.log(full);
      </script>
    </body>
  // ...
```

</details>

### 型別轉換

JavaScript 內建了一批可以直接呼叫的函式，例如 Number、String 與 Boolean。自己寫函式留到函式那一章再教。字串要變成數字時，下面兩種讀法停的地方不一樣。

- parseInt 從左邊開始讀數字，遇到第一個不是數字的字元就停下，所以 `'12px'` 會得到 12。第二個參數固定寫 10。

- Number 要求整段都是合法的數字，否則會得到 NaN。

**觀念**

- `Number` 把值轉成數字。

- `String` 把值轉成字串。

- `Boolean` 判斷這個值算真還是算假。

- 字串碰到加號，會把旁邊的數字接成文字。`'5' + 1` 得到 51，不是 6。

```html 04-js/pages/09-js-convert.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>型別轉換</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const daysText = '3';
      const priceText = '12800';

      // 原字串與種類；Number 後才是數字。售價轉數字，12800 再轉回字串
      console.log(daysText, typeof daysText);
      console.log(Number(daysText), typeof Number(daysText));
      console.log(Number(priceText), String(12800), typeof String(12800));
      // 「3天」是 NaN，空字串是 0。0 是 false，文字 '0' 是 true
      console.log(Number('3天'), Number(''));
      console.log(Boolean(0), Boolean('0'));
      // 加號接成字串 51；先轉成數字再加才是 6
      const joined = '5' + 1;
      console.log(joined, typeof joined);
      console.log(Number('5') + 1);
      // parseInt 從左邊讀，遇到小數點或單位就停。Number 則整段都要合法
      console.log(Number('3.8'), parseInt('3.8', 10));
      console.log(Number('12px'), parseInt('12px', 10));
      // 空字串：Number 得到 0，parseInt 沒有數字可讀，得到 NaN
      console.log(Number(''), parseInt('', 10));
      // 第二個參數固定寫 10。16 把 ff 讀成 255；寫 10 時 f 不是數字，得到 NaN
      // 省略這個參數時，早期環境看到 0 開頭可能當成八進位
      console.log(parseInt('ff', 16), parseInt('ff', 10));
      // Number.isNaN 只認已經是 NaN 的值。全域 isNaN 會先轉型，字串「三」也得到 true
      console.log(Number.isNaN(Number('12px')), Number.isNaN('三'), isNaN('三'));
    </script>
  </body>
</html>
```

**解析**

- `Number(daysText)` 那行是數字 3，種類是 number。daysText 仍是字串。
- `String(12800)` 看起來像數字，種類是 string。
- 「3天」是 NaN，空字串是 0。
- `Boolean(0)` 是 false，文字 '0' 是 true。
- `'5' + 1` 是字串 51，先轉成數字再加才是 6。
- '12px' 對 Number 是 NaN，對 parseInt 是 12。
- 空字串對 Number 是 0，對 parseInt 是 NaN。

```text
3 string
3 number
12800 12800 string
NaN 0
false true
51 string
6
3.8 3
NaN 12
0 NaN
255 NaN
true false true
```

{% note success %}
**換你試試：**
把 '5' 轉成數字後乘上 8600，印出結果。再轉回字串，印出它的種類。

再印出 `parseInt('20人', 10)` 與 `Number('20人')`。

最後印出 `parseInt('08', 10)`，確認得到 8。
{% endnote %}

<details>
<summary>參考答案</summary>

乘完是 43000。轉回字串之後，種類是 string。

「20人」對 parseInt 停在 20，對 Number 是 NaN。指定進位 10 後，「08」得到 8。

```diff 04-js/pages/09-js-convert.html
  // ...
        console.log(parseInt('ff', 16), parseInt('ff', 10));
        // Number.isNaN 只認已經是 NaN 的值。全域 isNaN 會先轉型，字串「三」也得到 true
        console.log(Number.isNaN(Number('12px')), Number.isNaN('三'), isNaN('三'));
+ 
+       const total = Number('5') * 8600;
+       const label = String(total);
+       console.log(total, typeof label);
+       console.log(parseInt('20人', 10));
+       console.log(Number('20人'));
+       console.log(parseInt('08', 10));
      </script>
    </body>
  // ...
```

</details>

### null、undefined 與 NaN

算出來的結果不一定能接著用。有的名字只宣告、還沒放值，有的是你刻意留的空位，有的是數字沒算成功。這三種「沒有值」或「無效值」要先分開，才不會把還沒給、故意空著，和算失敗當成同一件事。

- `undefined` 是有宣告但還沒給值。

- `null` 是刻意設成「沒有值」。

- `NaN` 是數學運算或轉成數字失敗時得到的結果，型別仍然是 number。

**觀念**

- 只宣告、不賦值，讀到的是 undefined。

- 沒有值就賦值 null，不要用空字串冒充。

- 判斷是不是 null，用 `=== null`。

- 判斷是不是 NaN，用 `Number.isNaN()`。

- NaN 和自己嚴格相等，結果是 false。

```html 04-js/pages/10-js-special.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>null、undefined 與 NaN</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      let guide;
      const backup = null;
      const broken = Number('abc');

      // 有宣告但還沒給值，讀到 undefined
      console.log(guide);
      // null 是刻意設的空位。用 === null 判斷，不要用 typeof
      console.log(backup);
      console.log(backup === null);
      // typeof null 是 object，這是早期留下的結果
      console.log(typeof backup);
      // 轉成數字失敗得到 NaN，種類仍是 number
      console.log(broken);
      console.log(typeof broken);
      // Number.isNaN 才認得出 NaN。NaN === NaN 是 false
      console.log(Number.isNaN(broken));
      console.log(broken === broken);
    </script>
  </body>
</html>
```

**解析**

- guide 沒有放值，印出來是 `undefined`。
- backup 用嚴格相等對上 null 是 true，`typeof` 卻印出 object。
- broken 是 NaN，種類仍是 number。
- `Number.isNaN` 是 true，自己和自己嚴格相等是 false。

```text
undefined
null
true
object
NaN
number
true
false
```

{% note info %}
**空字串不是 null**
沒有值就用 null。空字串是長度為 0 的字串，和空位不是同一件事。
{% endnote %}

{% note success %}
**換你試試：**
多宣告一個沒有賦值的 `note`，以及 `const seats = Number('滿')`。

印出 note 是否為 `undefined`、seats 是否為 NaN。
{% endnote %}

<details>
<summary>參考答案</summary>

`note` 沒有值，和 undefined 嚴格相等是 true。

`'滿'` 無法轉成數字，`Number.isNaN` 是 true。

```diff 04-js/pages/10-js-special.html
  // ...
        const backup = null;
        const broken = Number('abc');
+       let note;
+       const seats = Number('滿');
  
        // 有宣告但還沒給值，讀到 undefined
        console.log(guide);
        // null 是刻意設的空位。用 === null 判斷，不要用 typeof
        // ...
        console.log(Number.isNaN(broken));
        console.log(broken === broken);
+       console.log(note === undefined);
+       console.log(Number.isNaN(seats));
      </script>
    </body>
  // ...
```

</details>

# 字串

字串是一排有順序的字元。先把它寫出來，用索引讀其中一個字，再用模板字串把算好的值嵌進句子。方法放在共用的原型上，呼叫之後得到的是新字串。這一章先看怎麼建立，再看原型與兩類常用方法。

## 字串基礎

這一節處理字串怎麼寫、怎麼讀一個字元。模板字串仍是字串，差別是句子中間可以放入別的值。

### 建立與存取

字串可以用單引號、雙引號或反引號包起來，三種都是字串。`length` 是字元數，中括號用從 0 開始的索引讀一個字元。字串不可變，方法交回另一份新字串，原來那一份還在。

**觀念**

- 這門課的字串預設用單引號。內容裡已經有單引號時，整段改用雙引號包住。

- 反引號在這一節只是第三種包法。把變數嵌進句子，留到下一節。

- `length` 讀到數字，後面不加括號。索引 0 是第一個字元。

- 方法會交回新字串。原來的值沒有被改掉，這種特性叫做不可變（immutable）。

```html 04-js/pages/11-js-string-basic.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>建立與存取</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const single = '台北';
      const double = "it's JS";
      const plain = `城市`;
      const title = '台北城市漫遊';

      console.log(single);
      console.log(double);
      console.log(plain);
      console.log(title.length);
      console.log(title[0]);
      console.log(title[2]);

      const upper = 'taipei'.toUpperCase();
      console.log(upper);
      console.log('taipei');
    </script>
  </body>
</html>
```

**解析**

- 三種包法印出的都是字串本身。雙引號那一行留得住內容裡的單引號。
- 長度是 6。索引 0 是「台」，索引 2 是「城」。
- 大寫結果是新字串 TAIPEI。最後一行仍是小寫，方法沒有改掉原來的字面值。

```text
台北
it's JS
城市
6
台
城
TAIPEI
taipei
```

{% note info %}
**課程裡的引號**
一般字串用單引號。反引號留給要插值的句子。內容本身含有單引號時才用雙引號。
{% endnote %}

{% note warning %}
**不要改索引上的字**
字串沒有改掉某個字元的作法。要留下不同的文字，把方法的回傳值放進新的 `const`。
{% endnote %}

{% note success %}
**換你試試：**
印出「花蓮山海」的長度，以及索引 1 的字元。再印出小寫結果，並再印一次字面值 `'JS'`，確認仍是大寫。
{% endnote %}

<details>
<summary>參考答案</summary>

長度是 4，索引 1 是「蓮」。小寫結果是 js，字面值仍是 JS，因為方法交回的是新字串。

```diff 04-js/pages/11-js-string-basic.html
  // ...
        console.log(upper);
        console.log('taipei');
+ 
+       console.log('花蓮山海'.length);
+       console.log('花蓮山海'[1]);
+       console.log('JS'.toLowerCase());
+       console.log('JS');
      </script>
    </body>
  // ...
```

</details>

### 模板字串

反引號裡的 `${}` 會先算出結果，再嵌進句子。數字嵌進去時會變成文字的一部分。引號字串做不到這種插值。型別轉換那一節看過，字串加數字會接成文字。句子中間要放入變數時，改用模板字串。

**觀念**


- 包住整句的是反引號，不是單引號。插值的括號是 `$` 接一對大括號。

- 大括號裡放變數或運算。學會函式之後，也可以放函式呼叫。

- 想印出字面的 `${` 時才需要跳脫。一般句子直接寫。

```html 04-js/pages/12-js-template.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>模板字串</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const id = 1;
      const title = '台北城市漫遊';
      const place = '台北';
      const days = 3;
      const price = 12800;

      const line = `${place}・${title}・${days} 天・NT${price}`;
      console.log(line);
    </script>
  </body>
</html>
```

**解析**

- 四個插值依序嵌進句子。`NT$` 後面緊接插值，所以不會多出空格，印出來是 NT$12800。
- 這一整句是一個字串，不是四次 `log`。

```text
台北・台北城市漫遊・3 天・NT$12800
```

{% note info %}
**句子是結果，不是畫面**
這一頁只把句子印在 Console。下一篇才把同樣的句子放進列表。現在不要用它去改頁面上的文字。
{% endnote %}

{% note success %}
**換你試試：**
用這幾個變數再組一句「編號 1・台北」。編號與 place 都放進插值。
{% endnote %}

<details>
<summary>參考答案</summary>

第二句的兩個插值對到 id 與 place。第一句維持不變，兩句都是字串。

```diff 04-js/pages/12-js-template.html
  // ...
        const price = 12800;
  
        const line = `${place}・${title}・${days} 天・NT${price}`;
+       const code = `編號 ${id}・${place}`;
        console.log(line);
+       console.log(code);
      </script>
    </body>
  // ...
```

</details>

## 字串原型與方法

方法不是複製在每一個字串上，而是放在共用的原型，用點號取出再呼叫。這一節把原型講完，是全篇唯一一次完整說明。後面的陣列與物件直接用方法，對照的就是這裡。

### 原型

每種型別都有內建原型，用點號找到方法。字串與數字各有自己的那一份，呼叫時用的是那一份上的函式。

- 字串的原型是 `String.prototype`。

- 數字的原型是 `Number.prototype`。

**觀念**

- 呼叫時用的是原型上的同一支函式。

- `length` 是屬性，讀到數字，不用加括號。

- 字串方法回傳新值，原來的字串不變。這種特性叫做不可變（immutable）。

- null 與 undefined 沒有原型。對它們寫上點號會丟出 TypeError。

- `?.` 在左邊是這兩個值時停住，整段得到 undefined。

```html 04-js/pages/13-js-prototype.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>原型</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const word = 'abc';

      // 得到 ABC。word 仍是 abc。這支函式就是字串原型上的那一支
      console.log(word.toUpperCase());
      console.log(word);
      console.log(word.toUpperCase === String.prototype.toUpperCase);
      // length 是屬性，讀到 3，不用括號
      console.log(word.length);

      const amount = 42;
      // toFixed(0) 印出 42，回傳的是字串，而且等於數字原型上的函式
      console.log(amount.toFixed(0));
      console.log(amount.toFixed === Number.prototype.toFixed);

      const missing = null;
      // 可選串連在 null 停住，得到 undefined。拿掉下一行註解會丟出 TypeError
      console.log(missing?.toUpperCase());
      // console.log(missing.toUpperCase());

      // 在 Console 展開 [[Prototype]]，對照字串原型上的方法名稱
      console.dir(word);
      console.log(String.prototype);
    </script>
  </body>
</html>
```

**解析**

- 第一個結果是 ABC，word 仍是 abc，和字串原型上的函式比較得到 true。
- 長度是 3。這一行讀的是屬性，所以沒有括號。
- 數字 42 呼叫 toFixed 之後印出 42，那個結果是字串，用的是數字原型上的函式。
- 可選串連在 null 停住，得到 undefined。直接點呼叫會丟出 TypeError，後面的程式不會再跑。

```text
ABC
abc
true
3
42
true
undefined
```

{% note info %}
**字串是不可變的**
呼叫方法時會暫時把字串包成物件，到原型找出方法，用完就丟。要留下結果，就用 `const` 接住。

參數與回傳值查 MDN 的 [String](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String)。展開 Console 裡的原型，對得上方法名稱。講義不把清單抄出來。
{% endnote %}

{% note success %}
**換你試試：**
印出 `'JS'.toLowerCase()`，再印一次字面值 `'JS'`。到 Console 展開字串原型，確認看得到這個方法。
{% endnote %}

<details>
<summary>參考答案</summary>

小寫結果是 js。字面值仍是 JS，因為方法交回的是新字串。這個方法放在同一份字串原型上。

```diff 04-js/pages/13-js-prototype.html
  // ...
        console.dir(word);
        console.log(String.prototype);
+ 
+       console.log('JS'.toLowerCase());
+       console.log('JS');
      </script>
    </body>
  // ...
```

</details>

### 查詢與判斷

`String.prototype` 上的方法可以依用途分成幾類。這一類回傳布林或索引，用來查一段文字在不在、從哪裡開始、出現在哪個位置，而且比對區分大小寫，原來的字串不會被改掉。

**觀念**

- `includes` 問一段文字有沒有出現，回傳布林。

- `startsWith` 問是不是以某段開頭，回傳布林。

- `endsWith` 問是不是以某段結尾，回傳布林。

- `indexOf` 問第一次出現的索引，沒有就回傳 -1。

```html 04-js/pages/14-js-string.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>查詢與判斷</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const title = '台北城市漫遊';

      // 「城市」有出現，true；「花蓮」沒有，false
      console.log(title.includes('城市'));
      console.log(title.includes('花蓮'));
      // 開頭是「台北」所以 true，不是「城市」所以 false
      console.log(title.startsWith('台北'));
      console.log(title.startsWith('城市'));
      // 結尾是「漫遊」所以 true，不是「台北」所以 false
      console.log(title.endsWith('漫遊'));
      console.log(title.endsWith('台北'));
      // 「城市」在索引 2；沒有「花蓮」得到 -1
      console.log(title.indexOf('城市'));
      console.log(title.indexOf('花蓮'));
      // 原字串沒有被改
      console.log(title);
    </script>
  </body>
</html>
```

**解析**

- 有出現、對得上開頭或結尾時是 true，對不上是 false。
- 「城市」的索引是 2。找不到時 indexOf 回傳 -1，那個值不是第一個字。
- 最後一行仍是原來的標題，這些方法都沒有改寫它。

```text
true
false
true
false
true
false
2
-1
台北城市漫遊
```

{% note info %}
**沒找到時看回傳值**
判斷方法對不上時得到 false。`indexOf` 對不上時得到 -1。索引 0 才是第一個字。
{% endnote %}

{% note success %}
**換你試試：**
問「花蓮山海」是否包含「山海」、是否以「花蓮」開頭、是否以「山海」結尾，以及「山」第一次出現的索引。四行都印出來。
{% endnote %}

<details>
<summary>參考答案</summary>

四行依序是 true、true、true、2。「山」是第三個字，索引從 0 數，所以是 2。

```diff 04-js/pages/14-js-string.html
  // ...
        console.log(title.indexOf('花蓮'));
        // 原字串沒有被改
        console.log(title);
+ 
+       console.log('花蓮山海'.includes('山海'));
+       console.log('花蓮山海'.startsWith('花蓮'));
+       console.log('花蓮山海'.endsWith('山海'));
+       console.log('花蓮山海'.indexOf('山'));
      </script>
    </body>
  // ...
```

</details>

### 擷取與轉換

另一類也在 `String.prototype` 上。它們從字串取出一段、轉換內容、補齊或拆開，得到的都是新值。其中 `at` 超出範圍時得到 undefined，程式不會中斷，原來的字串都還在。

**觀念**

- `slice` 依索引裁出一段新字串，結束索引不包含。

- `at` 用索引取一個字元，超出範圍時得到 undefined。

- `trim` 去掉兩端空白，中間的空白留著。

- `toUpperCase` 把英文字母轉成大寫，中文字元保持原樣。

- `padStart` 在左邊補字，直到長度達到指定值。

- `replaceAll` 把所有對上的那段都換成新文字。

- `split` 依分隔文字拆成一陣列。

```html 04-js/pages/15-js-pad.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>擷取與轉換</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const rawTitle = '  台北城市漫遊  ';
      const title = rawTitle.trim();
      const code = '7';
      const city = 'taipei';

      // 去掉兩端空白。帶空白的長度仍是 10，去掉之後是 6
      console.log(title);
      console.log(rawTitle.length);
      console.log(title.length);
      // 結束索引不包含，前兩個字是「花蓮」
      console.log('花蓮山海三日'.slice(0, 2));
      // 0 是「花」，-1 是「蓮」，索引 5 超出範圍，得到 undefined
      console.log('花蓮'.at(0));
      console.log('花蓮'.at(-1));
      console.log('花蓮'.at(5));
      // 得到 TAIPEI。city 仍是小寫
      console.log(city.toUpperCase());
      console.log(city);
      // 補到長度 3，得到 007。code 仍是 7
      console.log(code.padStart(3, '0'));
      console.log(code);
      // 兩處「散步」都換成「五日」。依「・」拆成三個元素
      console.log('京都散步與散步'.replaceAll('散步', '五日'));
      console.log('台北・花蓮・京都'.split('・'));
    </script>
  </body>
</html>
```

**解析**

- trim 交回沒有前後空白的新字串，長度從 10 變成 6，原來帶空白的變數還在。
- 依索引取字元時，超出範圍得到 undefined，程式沒有中斷。
- 轉換與補零都交回新字串，city 與 code 都沒有被改掉。
- split 交回的是陣列，不是字串。

```text
台北城市漫遊
10
6
花蓮
花
蓮
undefined
TAIPEI
taipei
007
7
京都五日與五日
['台北', '花蓮', '京都']
```

{% note info %}
**先 trim 再比較**
表單稍後可能送來前後有空白的字串。先 `trim`，再用 `===` 比，才不會因為一個空格就對不上。
{% endnote %}

{% note info %}
**編號要對齊時再用 padStart**
編號、時間這種固定寬度的文字，用 `padStart` 補 0。拿去和數字比之前，仍要先轉成數字。
{% endnote %}

{% note success %}
**換你試試：**
取「台北城市漫遊」的前兩個字。把 `'42'` 補成長度 4。印出「京都紅葉」的最後一個字。把「京都紅葉散步」裡的「散步」全部換成「五日」，再把「三日・三日」以「・」拆開。
{% endnote %}

<details>
<summary>參考答案</summary>

前兩個字是「台北」。`'42'` 補到長度 4 是 0042。最後一個字是「葉」。取代得到「京都紅葉五日」，拆開得到兩個「三日」。

```diff 04-js/pages/15-js-pad.html
  // ...
        console.log('京都散步與散步'.replaceAll('散步', '五日'));
        console.log('台北・花蓮・京都'.split('・'));
+ 
+       console.log('台北城市漫遊'.slice(0, 2));
+       console.log('42'.padStart(4, '0'));
+       console.log('京都紅葉'.at(-1));
+       console.log('京都紅葉散步'.replaceAll('散步', '五日'));
+       console.log('三日・三日'.split('・'));
      </script>
    </body>
  // ...
```

</details>

# 運算子與流程控制

先算出一個新值，再依結果決定要不要做某件事，或把同一件事做很多次。運算子把現有的值做成新值；條件再看那個結果，決定哪一段程式要跑；迴圈則重複同一段程式。這一章包含運算子、條件判斷與迴圈。

## 運算子

這一節依運算子交出來的結果來分。

- 算術做出新數字。

- 比較得到布林。

- 邏輯運算子依值是否有內容而短路，交出其中一邊的值。

- 條件運算子在兩個結果裡挑一個。

- 空值合併在沒有值時補上預設。

### 算術運算子與賦值運算子

加、減、乘、除、餘數、次方都做出新數字。`+=` 這類寫法是「用現在的值運算後再放回去」，左邊必須是可以重新指派的 `let`。

**觀念**


- 除法得到的可能是小數。若結果要整數，先想好要不要在這一步處理。

- 餘數 `%` 看的是除不盡剩下多少，用來判斷奇偶或分組。

- `+=` 會改掉左邊的名字。只是想看計算結果、又不想改原本的值時，把結果放到一個新的 `const`。

```html 04-js/pages/16-js-arith.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>算術運算子與賦值運算子</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      let price = 15900;
      const days = 3;
      const perDay = price / days;

      console.log(perDay);
      console.log(days % 2);
      console.log(2 ** 3);

      price += 1100;
      console.log(price);
    </script>
  </body>
</html>
```

**解析**

- 15900 除以 3 得到 5300。
- 3 除以 2 餘 1。
- 2 的 3 次方是 8，這一行只示範次方。
- 最後 `+=` 把左邊加上 1100，price 變成 17000。
- `perDay` 是在 `+=` 之前算的，仍是 5300，不會跟著改。

```text
5300
1
8
17000
```

{% note info %}
**先乘除後加減**
和數學一樣。要先算完某一段再做下一個運算時，用括號把先算的那一段包起來。
{% endnote %}

{% note warning %}
**小數不是精確的十進位**
JavaScript 的數字是二進位浮點數。`0.1 + 0.2` 加出來不是剛好的 0.3，用嚴格相等去比會得到 false。

金額用整數相加，例如以元為單位的整數。不要把兩個小數用 `===` 硬比相等。
{% endnote %}

{% note success %}**換你試試：**用 `let seats = 8`，再 `-= 2`，印出減完的數字。

另外用一個新的 const 計算 price 的兩倍，不要改掉 price 本身。{% endnote %}

<details>
<summary>參考答案</summary>

`seats` 從 8 減掉 2，剩下 6。

兩人總價放在新的 `const`，所以 `price` 仍是加價後的 17000，總價是它的兩倍 34000。

```diff 04-js/pages/16-js-arith.html
  // ...
        price += 1100;
        console.log(price);
+ 
+       let seats = 8;
+       seats -= 2;
+       const twoPeople = price * 2;
+       console.log(seats);
+       console.log(twoPeople);
      </script>
    </body>
  // ...
```

</details>

### 比較運算子與嚴格相等

比較的結果是布林。課堂用三個等號，種類不同就視為不相等。兩個等號會先偷偷轉型，`'3'` 和 `3` 會被當成一樣，篩選時容易一筆都對不上或全部對上。

**觀念**


- `===` 與 `!==` 不轉型。

- `==` 與 `!=` 會轉型，新程式不要用。

- 大於、小於也可以比字串，比的是字元編碼的順序，不是數字大小。

- 字串 `'10'` 比 `'9'` 時，先比第一個字元，所以不會得到數字意義上的大小。

```html 04-js/pages/17-js-compare.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>比較運算子與嚴格相等</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const days = 3;
      const daysText = '3';

      console.log(days === 3);
      console.log(days === daysText);
      console.log(days == daysText);
      console.log(days !== daysText);
      console.log('10' > '9');
      console.log(Number('10') > Number('9'));
    </script>
  </body>
</html>
```

**解析**

- 第一行數字 3 對上數字 3，是 true。
- 第二行種類不同，嚴格相等是 false。
- 第三行兩個等號會把字串轉成數字，變成 true，這就是它容易誤判的地方。
- `!==` 在種類不同時是 true。
- 字串 `'10'` 與 `'9'` 比大小是 false，因為字元 '1' 的編碼比 '9' 小。
- 兩邊都先 `Number` 再比，才是數字的 true。

```text
true
false
true
true
false
true
```

{% note danger %}
**比較數字要用數字對數字**
下拉選單稍後傳來的常常是字串。在比較前轉成數字，或兩邊都轉成字串再比。不要寫兩個等號交差。
{% endnote %}

{% note info %}
**選讀：Object.is**
`Object.is` 和嚴格相等幾乎一樣。它多認兩件事：NaN 與 NaN 相同，而 +0 與 -0 分成兩個值。日常比較仍寫 `===`。
{% endnote %}

{% note success %}**換你試試：**讓 `price` 為 15900、`limit` 為 20000，印出是否小於上限、是否嚴格等於字串 '15900'。{% endnote %}

<details>
<summary>參考答案</summary>

15900 小於 20000，所以是 true。價格是 number、右邊是 string，嚴格相等是 false。若改成兩個等號，第二行會變成 true，課堂不這樣寫。

```diff 04-js/pages/17-js-compare.html
  // ...
        console.log('10' > '9');
        console.log(Number('10') > Number('9'));
+ 
+       const price = 15900;
+       const limit = 20000;
+       console.log(price < limit);
+       console.log(price === '15900');
      </script>
    </body>
  // ...
```

</details>

### 邏輯運算子與短路求值

邏輯運算子用來組合條件，也用來在兩個值裡留下其中一個。JavaScript 先看左邊是 truthy 還是 falsy，再決定要不要執行右邊。最後交出來的是其中一邊的值；兩邊都是布林時，那個值才剛好是 true 或 false。

**觀念**


- falsy 有六個：false、數字 0、空字串、null、undefined、NaN。有字的字串、非 0 的數字，以及 true，是 truthy。demo 裡用註解逐個標出。

- `&&` 左邊是 falsy 就交出左邊，右邊不執行。左邊是 truthy 才交出右邊。

- `||` 左邊是 truthy 就交出左邊，右邊不執行。左邊是 falsy 才改看右邊，空字串因此可以補上一句預設文字。

- 0 也是 falsy。用 `||` 補預設值時，0 會被換成右邊的數字。空值合併留到下一節，專門把 0 留住。

```html 04-js/pages/18-js-logic.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>邏輯運算子與短路求值</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const days = 3;
      const price = 12800;
      const shortTrip = days <= 3;
      const underBudget = price < 20000;

      console.log(shortTrip && underBudget);
      console.log(days === 5 || underBudget);
      console.log(!shortTrip);

      const soldOut = false;
      const seatsLeft = 0;
      let tourNote = '';
      const backupGuide = null;
      let guideName;
      const badDays = Number('三天');
      const place = '花蓮';

      console.log(soldOut); // falsy：false
      console.log(seatsLeft); // falsy：0
      console.log(tourNote.length); // falsy：空字串，長度是 0
      console.log(backupGuide); // falsy：null
      console.log(guideName); // falsy：undefined，只宣告還沒賦值
      console.log(badDays); // falsy：NaN
      console.log(place); // truthy：有內容的字串
      console.log(days); // truthy：非 0 的數字

      console.log(place && price); // 左邊有內容，交出右邊的價格
      console.log((tourNote && price) === ''); // 左邊是空字串，交出左邊
      console.log(soldOut || place); // 左邊不成立，交出右邊
      console.log(place || '未定地點'); // 左邊已有內容，不再看右邊

      const isLoggedIn = true;
      isLoggedIn && console.log('顯示會員價');

      const guest = false;
      guest && console.log('這行不會出現');

      const note = tourNote || '尚無備註';
      console.log(note);
    </script>
  </body>
</html>
```

**解析**

- 前三行兩邊都是布林，印出來仍是 true 或 false。
- 兩個條件都成立，第一行成立。
- 第一個比較不成立，但第二個成立，第二行仍成立。
- 取反之後是第三行，不成立。
- 接下來先印 falsy，再印 truthy。
- false 之後那個 0 是數字 0。再下一個 0 是空字串的長度，因為空字串本身印不出字。
- 接著是 null、undefined 與 NaN。有內容的字串「花蓮」與數字 3 是 truthy。
- 左邊是有內容的字串，`&&` 交出右邊的數字，所以是 12800。
- 左邊是空字串，`&&` 交出左邊，和空字串嚴格相等，所以下一行是 true。
- 左邊是 false，`||` 改看右邊，得到「花蓮」。
- 左邊的字串已有內容，`||` 不再看後面的預設字串，仍是「花蓮」。
- 登入狀態為 true 時，`&&` 才會執行右邊，Console 多出「顯示會員價」。
- 另一行把登入改成 false，右邊不會跑，所以沒有印出「這行不會出現」。
- 備註是空字串，`||` 交出右邊的預設句「尚無備註」。

```text
true
true
false
false
0
0
null
undefined
NaN
花蓮
3
12800
true
花蓮
花蓮
顯示會員價
尚無備註
```

{% note info %}
**括號標出先後**
`&&` 比 `||` 更先結合。條件一多，用括號寫出先看哪一組，就不必背優先順序。
{% endnote %}

{% note success %}
**換你試試：**
在檔案最後另宣告一個 false 的登入狀態，確認會員價那一行不會再出現。

再宣告一段「含早餐」，用 `||` 接上預設句，確認印出的是含早餐。

最後讓 rainy 為 true，印出它和「請帶雨具」用 `&&` 接起來的結果。
{% endnote %}

<details>
<summary>參考答案</summary>

false 的登入狀態讓 `&&` 略過右邊，所以不會多印會員價。

「含早餐」有內容，`||` 交出左邊，不會換成預設句。

rainy 成立，`&&` 交出右邊的字串「請帶雨具」。

```diff 04-js/pages/18-js-logic.html
  // ...
        const note = tourNote || '尚無備註';
        console.log(note);
+ 
+       const member = false;
+       member && console.log('顯示會員價');
+ 
+       const breakfast = '含早餐';
+       console.log(breakfast || '尚無備註');
+ 
+       const rainy = true;
+       console.log(rainy && '請帶雨具');
      </script>
    </body>
  // ...
```

</details>

### 條件運算子與預設值

數字 0 仍是有效數字，不能被預設值蓋掉。空值合併只在 `null` 與 `undefined` 時才改用右邊。條件運算子則依一個布林，在兩個結果裡挑一個，適合只差一句結果的時候。

**觀念**


- `??` 只在左邊是 null 或 undefined 時交出右邊。0 與空字串會留下。

- `||` 把 0 也當成沒有值。左邊是 0 時會被換成 10。

- 三元運算子整段是一個值，可以放進 `const`。不要在一行裡再套另一層問號。

- 分支超過兩個時，改用下一節的 `if`。

```html 04-js/pages/19-js-nullish.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>條件運算子與預設值</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      let tourSeats = 0;
      let missingSeats;
      let tourNote = '';

      const seatsByOr = tourSeats || 10;
      const seats = tourSeats ?? 10;
      const fallbackSeats = missingSeats ?? 10;

      console.log(seatsByOr); // 0 是 falsy，|| 改用 10
      console.log(seats); // ?? 留下 0
      console.log(fallbackSeats); // undefined 才改用 10

      const noteByOr = tourNote || '尚無備註';
      const noteByNullish = tourNote ?? '尚無備註';
      console.log(noteByOr); // 空字串是 falsy，|| 改用預設句
      console.log(noteByNullish.length); // ?? 留下空字串，長度是 0

      const price = 12800;
      const label = price < 20000 ? '三萬內' : '三萬以上';
      console.log(label);
    </script>
  </body>
</html>
```

**解析**

- 左邊的數字是 0。`||` 把 0 當成沒有值，第一行變成 10。
- 空值合併只在 null 或 undefined 時才改用右邊，所以第二行留下 0。
- 還沒賦值的那個是 undefined，空值合併改用 10，第三行是 10。
- 空字串對 `||` 會換成「尚無備註」。
- 空值合併不把空字串當空值，留下的字串長度是 0，所以下一行是 0。
- 數字小於 20000，三元運算子挑冒號左邊的「三萬內」。

```text
10
0
10
尚無備註
0
三萬內
```

{% note info %}
**可選串連**
`?.` 讀的是可能還沒有的物件屬性。屬性不在時得到 undefined，程式不會因此中斷。物件字面值會在物件那一章詳細介紹，那一章有完整 demo。這一節先用獨立變數練習預設值。
{% endnote %}

{% note success %}
**換你試試：**
另設一個值為 null 的變數，分別用 `||` 與 `??` 補 10。

再用三元運算子：小於 15000 時標籤為「輕裝」，否則為「標準」。
{% endnote %}

<details>
<summary>參考答案</summary>

null 對兩種運算子都算空值，所以兩行都是 10。這和上面的 0 不同：0 只會被 `||` 換掉。

12800 小於 15000，三元運算子挑「輕裝」。原先的「三萬內」仍留著，兩個標籤回答的是不同門檻。

```diff 04-js/pages/19-js-nullish.html
  // ...
        const label = price < 20000 ? '三萬內' : '三萬以上';
        console.log(label);
+ 
+       let cancelledSeats = null;
+       console.log(cancelledSeats || 10);
+       console.log(cancelledSeats ?? 10);
+ 
+       const band = price < 15000 ? '輕裝' : '標準';
+       console.log(band);
      </script>
    </body>
  // ...
```

</details>

## 條件判斷

結果要分成三種以上時，就把每一段條件寫開。讀的人由上往下看到第一個成立的，就只跑那一段。範圍或複合條件用 `if` 這組寫法；同一個值對照多個固定選項時用 `switch`。

### if、else if、else

括號裡放布林。成立就跑緊接的大括號，然後整段 if 結束。都不成立才跑 `else`。`else if` 可以接很多段，順序就是你要的優先順序。

**觀念**


- 條件後面不要加分號，否則大括號會被當成另一段永遠會跑的程式。

- 只做一件事時也可以加大括號。課堂一律加大括號，避免後面加行時綁錯。

- `else` 不是必須的。有些情況只是成立才印，不成立就什麼都不做。

```html 04-js/pages/20-js-if.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>if、else if、else</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const price = 15900;
      let band;

      if (price < 15000) {
        band = '輕裝';
      } else if (price < 30000) {
        band = '標準';
      } else {
        band = '深度';
      }

      console.log(band);
    </script>
  </body>
</html>
```

**解析**

- 15900 沒有小於 15000，第一段跳過。它小於 30000，所以走「標準」，不再看 `else`。
- 若改成 42800，前兩段都不成立，才會是「深度」。
- `band` 用 `let` 是因為三條路會把不同的字放進去。

```text
標準
```

{% note info %}
**先寫最窄的條件**
若先寫 `price < 30000`，15900 與 12800 都會進同一段，後面的「輕裝」永遠走不到。門檻要由嚴到寬，或由小到大，選一種順序寫完。
{% endnote %}

{% note info %}
**條件先取成名字**
括號裡的比較一長，先把結果放進看得出來意思的布林，if 只看那個名字。提早離開函式的寫法在函式那一章。

```js
const isStandard = price >= 15000 && price < 30000;

if (isStandard) {
  band = '標準';
}
```
{% endnote %}

{% note success %}
**換你試試：**
用另一組 if：等於 1 印「一日遊」，等於 3 印「短途」，其他印「多日」。以 days 為 5 試跑，再在註解裡寫若改成 3 會印什麼。
{% endnote %}

<details>
<summary>參考答案</summary>

5 天兩段都不中，所以是「多日」。註解不是輸出。若把 `days` 改成 3，會在第二段停住，印出「短途」，不會掉進「多日」。

```diff 04-js/pages/20-js-if.html
  // ...
        }
  
        console.log(band);
+ 
+       const days = 5;
+       let lengthLabel;
+       if (days === 1) {
+         lengthLabel = '一日遊';
+       } else if (days === 3) {
+         lengthLabel = '短途';
+       } else {
+         lengthLabel = '多日';
+       }
+       console.log(lengthLabel);
      </script>
    </body>
  // ...
```

</details>

### switch 與 case

同一個名字只和幾個固定字串對照時，`switch` 把對照寫在一起。每一段要用 `break` 離開，否則會繼續跑下一段。

區間（例如一個數字小於另一個）仍用 `if`，不要硬寫進 `switch`。

**觀念**


- 括號裡放要對的那個值，`case` 後面放對照的值，用嚴格相等。

- 忘了 `break` 會掉進下一個 case，兩段都會跑。這個特性也能刻意利用，本節後半會示範。

- `default` 接住沒對上的值，放在最後面。

```html 04-js/pages/21-js-switch.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>switch</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const place = '花蓮';
      let region;

      switch (place) {
        case '台北':
          region = '北部';
          break;
        case '花蓮':
          region = '東部';
          break;
        case '台南':
          region = '南部';
          break;
        default:
          region = '其他';
      }

      console.log(region);
    </script>
  </body>
</html>
```

**解析**

- `place` 對上「花蓮」，`region` 設成「東部」，break 讓它不要再往下掉進台南或 default。
- 若拿掉花蓮那段的 `break`，會繼續執行下一段，把 `region` 改成「南部」，最後印出的就不是東部。

```text
東部
```

{% note warning %}
**case 不要寫範圍**
`case price < 15000` 不會照你想的方式工作。範圍交給 `if`。固定字串或編號才用 switch。
{% endnote %}

{% note success %}
**換你試試：**
把 place 改成「京都」，確認印出「其他」。再加一個 case「京都」，對應字串為「日本」，並加上 `break`。
{% endnote %}

<details>
<summary>參考答案</summary>

加上京都的 case 之後，對到的是「日本」而不是 default。`break` 讓它停住。default 仍留著，給還沒列進清單的地點。

```diff 04-js/pages/21-js-switch.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const place = '花蓮';
+       const place = '京都';
        let region;
  
        switch (place) {
          // ...
            region = '南部';
            break;
+         case '京都':
+           region = '日本';
+           break;
          default:
            region = '其他';
        // ...
```

</details>

**觀念：故意省略 break 合併 case**

`break` 的用途是「這段做完就離開」。反過來利用這個特性，把幾個 `case` 疊在一起、中間不寫任何程式也不寫 `break`，對上其中任何一個都會往下掉到同一段程式。效果等於「這幾個值任一個成立」，像是用 `||` 串起多個 `===`。

```html 04-js/pages/22-js-switch-group.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>switch 合併 case</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const day = '週六';
      let ticket;

      switch (day) {
        case '週六':
        case '週日':
          ticket = '假日票';
          break;
        case '週一':
        case '週二':
        case '週三':
        case '週四':
        case '週五':
          ticket = '平日票';
          break;
        default:
          ticket = '日期有誤';
      }

      console.log(ticket);
    </script>
  </body>
</html>
```

**解析**

- `day` 是「週六」，對上第一個 case。那一行沒有程式也沒有 `break`。
- 於是往下掉到「週日」，再往下執行 `ticket = '假日票'`，遇到 `break` 才離開。
- 換成「週日」也會跑到同一段。週一到週五同理，五個值共用「平日票」那一段。

```text
假日票
```

- 同樣的判斷用 if 要寫成 `day === '週六' || day === '週日'`。選項一多，疊 case 的寫法比較好讀。

{% note info %}
**刻意省略要讓人看得出來**
疊在一起、中間沒有程式的 case 是常見寫法，大家看得懂。若某段 case 有寫程式卻故意不寫 `break`，要在那裡加一行註解說明是刻意的，不然別人會以為是漏寫。
{% endnote %}

{% note success %}
**換你試試：**
把 `day` 改成「國定假日」，讓它和週六、週日一樣拿到「假日票」。
{% endnote %}

<details>
<summary>參考答案</summary>

在「週日」下面再疊一個 `case '國定假日':`，同樣不寫程式也不寫 `break`，就會掉進假日票那段。

```diff 04-js/pages/22-js-switch-group.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const day = '週六';
+       const day = '國定假日';
        let ticket;
  
        switch (day) {
          case '週六':
          case '週日':
+         case '國定假日':
            ticket = '假日票';
            break;
          // ...
```

</details>

## 迴圈

同一段程式要依序做很多次時，不必把多行 `log` 抄很多遍。迴圈用一個計數器重複同一段程式，次數由條件決定。次數寫錯時，Console 會印出一大串，或是完全沒有。

`for` 適合已知要數幾次，`while` 適合做到某個條件為止，例如一個數字減到 0。兩者都要讓條件有一天會變成 false，否則分頁會卡在這一頁。這一節先看 for 迴圈，再看 while、break 與 continue。選讀看 do...while 與巢狀迴圈。

### for 迴圈

括號裡分成三段：計數器從多少開始、什麼時候繼續、每圈結束如何改變計數器。大括號裡是每一圈要做的事。計數器用 `let`，因為每一圈都要換成下一個數字。

**觀念**


- 三段用分號隔開。繼續的條件是「還可以進下一圈」，不是「最後一圈的號碼」。

- `day += 1` 若忘了寫，`day` 永遠停在 1，條件一直成立，迴圈不會停。

- 計數器宣告在括號裡時，迴圈結束後外面就沒有這個名字。

```html 04-js/pages/23-js-for.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>for 迴圈</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const days = 3;

      for (let day = 1; day <= days; day += 1) {
        console.log(day);
      }
    </script>
  </body>
</html>
```

**解析**

- 從 1 開始，只要 `day` 還小於或等於 3 就印出目前的數字，然後加 1。所以是 1、2、3 三行。
- 若條件寫成小於 `days`，只會印到 2，最後一圈被排除。
- 從 0 開始則會多出一個 0，這組資料沒有 0 這一筆。

```text
1
2
3
```

{% note warning %}
**先確認會停**
寫完迴圈先看計數器有沒有往結束的方向走。這一篇的練習資料很小，真的寫成無限迴圈時，改程式後重新整理即可。
{% endnote %}

{% note info %}
**走訪陣列改用 for...of**
這一節的 for 用來數已知的次數。陣列裡的每一格，到陣列那一章改用 for...of 讀值。

for...in 走的是鍵。陣列的鍵是 `'0'`、`'1'` 這種字串，不要拿它來列陣列的值。物件的鍵留到物件那一章。
{% endnote %}

{% note success %}
**換你試試：**
把 days 改成 5，並在每一行前面印出「第」，後面印出「天」。字串用加號接起來。
{% endnote %}

<details>
<summary>參考答案</summary>

條件改成小於等於 5，所以有五行。加號把字串和數字接在一起時，數字會被轉成文字再接上，這裡是故意要做出一句話。

```diff 04-js/pages/23-js-for.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const days = 3;
+       const days = 5;
  
        for (let day = 1; day <= days; day += 1) {
-         console.log(day);
+         console.log('第' + day + '天');
        }
      </script>
    // ...
```

</details>

### while、break 與 continue

`while` 只寫繼續的條件，計數器要自己在迴圈裡改。另外兩個寫法決定這一圈要不要做完、整段要不要停。

- `continue` 跳過這一圈剩下的程式，直接進下一圈。

- `break` 則整段迴圈立刻結束。

**觀念**


- 條件用到的那個 `let` 要在迴圈外面先準備好，迴圈裡要改它，否則不會停。

- `continue` 與 `break` 只影響包住它們的那一層迴圈。

- 還不知道正好幾圈的事用 `while`。已經知道次數就用 `for`。

```html 04-js/pages/24-js-while.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>while、break 與 continue</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      let seats = 3;

      while (seats > 0) {
        console.log(seats);
        seats -= 1;
      }

      console.log('額滿');

      for (let day = 1; day <= 5; day += 1) {
        if (day === 2) {
          continue;
        }
        if (day === 4) {
          break;
        }
        console.log(day);
      }
    </script>
  </body>
</html>
```

**解析**

- 3、2、1 各印一次，減到 0 後條件不成立，接著印「額滿」。
- 下面的 `for` 在數字 2 遇到 `continue`，所以沒有印 2。
- 數字 4 遇到 break，4 和 5 都不會印。留下的是 1 和 3。

```text
3
2
1
額滿
1
3
```

{% note info %}
**break 不是錯誤**
它是你規定的提早結束。例如找到第一筆符合的就可以停，不必把後面的圈數也走完。
{% endnote %}

{% note success %}
**換你試試：**
把 seats 改成從 2 開始倒數。`for` 改成跳過 1、在 3 停止，確認印出的數字只剩 2。
{% endnote %}

<details>
<summary>參考答案</summary>

名額只印 2 和 1。日子從 1 走到 5，第 1 天被跳過，第 2 天印出，第 3 天 `break`，所以日子只剩一行 2。

```diff 04-js/pages/24-js-while.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       let seats = 3;
+       let seats = 2;
  
        while (seats > 0) {
          console.log(seats);
          // ...
        console.log('額滿');
  
        for (let day = 1; day <= 5; day += 1) {
-         if (day === 2) {
+         if (day === 1) {
            continue;
          }
-         if (day === 4) {
+         if (day === 3) {
            break;
          }
          // ...
```

</details>

### 選讀：do...while

`do...while` 把條件放在迴圈後面，大括號先跑完一圈才檢查。條件成立就再跑，不成立就離開。同一個一開始就不成立的條件，`while` 一次都不進，這種寫法仍會進一次。

**觀念**

- 條件寫在後面的括號裡，整段以分號結束。進入之前不檢查。

- 條件一開始就是 false 時，`while` 一次都不跑，`do...while` 仍會跑一次。

- 計數器要在迴圈裡往結束的方向改。條件一直成立，這一段就不會停。

```html 04-js/pages/25-js-do.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>do...while</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      let count = 0;

      console.log('while 先檢查');
      while (count > 0) {
        count += 1;
        console.log(count);
      }

      let tries = 0;

      console.log('do 先執行');
      do {
        tries += 1;
        console.log(tries);
      } while (tries < 1);
    </script>
  </body>
</html>
```

**解析**

- 「while 先檢查」印出之後，`count` 是 0，大於 0 不成立，大括號一次都沒進，所以沒有數字。
- 「do 先執行」印出之後，先把 `tries` 加成 1 並印出，然後才檢查。1 已經不小於 1，於是離開。
- 兩段都遇到不成立的條件：while 是零次，do...while 是一次，差別只在檢查的時機。

```text
while 先檢查
do 先執行
1
```

{% note success %}
**換你試試：**
把後面的條件改成 `tries < 3`，讓 do 那段印出 1、2、3。上面的 while 不要改，數字仍然不該出現。
{% endnote %}

<details>
<summary>參考答案</summary>

條件改成小於 3 後，印出 1 和 2 時檢查仍成立，會再進一圈，印出 3 才停。while 的條件還是大於 0，`count` 停在 0，大括號仍然沒進去。

```diff 04-js/pages/25-js-do.html
  // ...
          tries += 1;
          console.log(tries);
-       } while (tries < 1);
+       } while (tries < 3);
      </script>
    </body>
  // ...
```

</details>

### 選讀：巢狀迴圈

一個迴圈的大括號裡可以再放另一個迴圈。外圈每走一步，內圈就從自己的起點跑完一整輪，總次數是兩層次數相乘。內層計數器要另取名字，才不會改到外層的數字。

**觀念**

- 外圈的計數器要等內圈這一輪全部結束，才會加 1。

- 內圈每一輪都從頭開始，不會接著上一輪最後的數字。

- 兩層要用不同的名字，例如外層 `row`、內層 `col`。

```html 04-js/pages/26-js-nested.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>巢狀迴圈</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      for (let row = 1; row <= 2; row += 1) {
        for (let col = 1; col <= 3; col += 1) {
          console.log(row + '×' + col + '=' + (row * col));
        }
      }
    </script>
  </body>
</html>
```

**解析**

- `row` 先停在 1，內圈的 `col` 從 1 走到 3，印出這一列的三格。
- 內圈結束後，外圈才變成 2，內圈再從 1 重新走到 3。
- 外圈 2 次、內圈每次 3 次，相乘是 6，所以一共六行。
- 內圈若沿用外圈的名字，加一改的是同一個變數，外圈的進度會被內圈帶走。

```text
1×1=1
1×2=2
1×3=3
2×1=2
2×2=4
2×3=6
```

{% note info %}
**巢狀不要超過兩層**
外圈再加內圈，兩層就夠看清誰先跑完。再多一層時，先把最裡面的迴圈收成函式，用名字呼叫它，而不是在迴圈裡再套一層。
{% endnote %}

{% note success %}
**換你試試：**
把外圈改成走到 3、內圈改成走到 2。總行數仍是兩層相乘，最後一行是 `3×2=6`。
{% endnote %}

<details>
<summary>參考答案</summary>

外圈多一輪、內圈少一輪，3 乘 2 還是六行。每一列只剩兩格，最後一格是 3 乘 2。

```diff 04-js/pages/26-js-nested.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       for (let row = 1; row <= 2; row += 1) {
-         for (let col = 1; col <= 3; col += 1) {
+       for (let row = 1; row <= 3; row += 1) {
+         for (let col = 1; col <= 2; col += 1) {
            console.log(row + '×' + col + '=' + (row * col));
          }
        // ...
```

</details>

# 函式

函式是把一段程式包起來，取一個名字。需要的時候呼叫這個名字，裡面的程式才會執行，而且可以重複使用，不必每次重寫。這一章先學怎麼宣告、怎麼呼叫，再學把值交給函式、從函式拿回結果，不該繼續時先離開，以及值沒交到時怎麼補；接著把函式本身當成一個值來寫。選讀再看一次交進多個值，以及函式怎麼記住外面的變數。

## 函式宣告與呼叫

這一節先把函式寫下來並呼叫它，確認每呼叫一次就執行一次。接著學習把值交給函式、從函式拿回結果，不該繼續時先離開，以及值沒交到時怎麼補。選讀再看一次交進多個值。

### 宣告與呼叫

函式用 `function` 這個關鍵字宣告。關鍵字後面寫函式名稱，大括號裡放這支函式要做的事。宣告只把程式記下來，不會執行；寫出名稱再加上小括號才是呼叫，每呼叫一次就執行一次。這一節的小括號先留空。

**觀念**

- `function` 是宣告函式的關鍵字，後面緊接函式名稱。
- 大括號裡的程式，就是這支函式要做的事。
- 宣告不會執行。檔案讀到函式時，只是把大括號裡的程式記在這個名稱上。
- 呼叫才會執行。寫出函式名稱，再加上一對小括號，裡面的程式才會跑。
- 同一支函式可以重複呼叫。每呼叫一次，就再執行一次。

```html 04-js/pages/27-js-function.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>宣告與呼叫</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function sayHello() {
        console.log('Hello');
      }

      sayHello();
      sayHello();
      sayHello();
    </script>
  </body>
</html>
```

**解析**

- 檔案先讀到 `sayHello` 的宣告。這時候大括號裡的程式還沒跑，所以不會印出 Hello。
- 後面三行才是呼叫。每一行執行一次，Console 因此出現三行 Hello。
- 三行呼叫的是同一支函式。重複呼叫就會重複執行。

```text
Hello
Hello
Hello
```

{% note success %}
**換你試試：**
再寫一支 `sayThanks`，大括號裡印出 Thanks，並呼叫兩次。三行 Hello 後面應再多兩行 Thanks。這支新函式同樣要等呼叫才會印。
{% endnote %}

<details>
<summary>參考答案</summary>

sayThanks 寫在 sayHello 後面，兩次呼叫放在最後。Hello 仍是三行，Thanks 出現在後面。

```diff 04-js/pages/27-js-function.html
  // ...
          console.log('Hello');
        }
  
+       function sayThanks() {
+         console.log('Thanks');
+       }
+ 
        sayHello();
        sayHello();
        sayHello();
+       sayThanks();
+       sayThanks();
      </script>
    </body>
  // ...
```

</details>

### 參數與引數

參數是宣告時括號裡用來接值的名稱，引數是呼叫時實際傳進去的值。兩者依照位置對上，而且參數只活在函式裡面。傳入基本型別時，函式拿到的是複本。

下圖以 `add(3, 5)` 為例，呼叫時的引數會依照位置，依序交給宣告裡的參數。

{% mermaid graph LR %}
  subgraph call["呼叫：add(3, 5)"]
    A1["引數 3"]
    A2["引數 5"]
  end
  subgraph decl["宣告：function add(a, b)"]
    P1["參數 a"]
    P2["參數 b"]
  end
  A1 -- "第 1 個位置" --> P1
  A2 -- "第 2 個位置" --> P2
{% endmermaid %}

**觀念**

- 第一個引數給第一個參數，第二個引數給第二個參數。你在外面就算有同名變數，傳進去的仍是那個位置上的值。

- 少傳的參數會是 `undefined`。還沒學會判斷之前，不要拿它直接去加減，否則結果不會是你預期的數字。

- 多傳的引數沒有參數可接，函式裡看不到，等於被忽略。參數個數就是這支函式準備要收的數量。

- 參數只在函式內有效，這是函式作用域。規則和前面的區塊作用域一樣：大括號外面沒有這個名字。函式裡若沒有自己的參數或宣告，才會向外層找同名變數。

- 傳入數字、字串、布林這些基本型別時，函式拿到的是值的複本。在函式裡把參數改成別的值，外面的變數仍是呼叫前的那個。

{% note info %}
**物件改的是同一份**
基本型別在函式裡改參數，外面的變數不變。物件下一章才建立。物件傳進函式後，若改的是它的欄位，外面看得到，因為兩邊指的是同一份資料。
{% endnote %}

```html 04-js/pages/28-js-params.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>參數與引數</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function printPair(left, right) {
        console.log(left);
        console.log(right);
      }

      printPair(10, 20);
      printPair(10);
      printPair(10, 20, 30);

      function bump(value) {
        value = value + 1;
        console.log(value);
      }

      let value = 5;
      bump(value);
      console.log(value);

      // console.log(left);
    </script>
  </body>
</html>
```

**解析**

- 第一次呼叫兩個引數都有，依序印出 10 與 20。
- 第二次只傳 10，right 沒有對上引數，所以是 undefined。第三次多傳的 30 沒有參數可接，畫面仍只有 10 與 20。
- `bump` 的參數和外面的 `value` 同名，但是兩個名字。
- 函式裡把參數改成 6 並印出來，函式結束後再印外面的 value，仍是 5。數字傳進去的是複本，改參數不會改到外面。
- 最後一行若拿掉註解，會是 ReferenceError。left 只活在 printPair 的函式作用域裡，和區塊作用域一樣，括號外面找不到。

```text
10
20
10
undefined
10
20
6
5
```

{% note success %}
**換你試試：**
把外面的 value 改成 9，再呼叫 bump。函式裡應印出 10，函式結束後外面仍是 9。
{% endnote %}

<details>
<summary>參考答案</summary>

外面的起點改成 9，bump 仍只改自己的參數，所以先印 10，再印 9。前面 printPair 的六行不變。

```diff 04-js/pages/28-js-params.html
  // ...
          console.log(value);
        }
  
-       let value = 5;
+       let value = 9;
        bump(value);
        console.log(value);
      // ...
```

</details>

### return 與回傳值

`return` 做兩件事：把值交回呼叫的地方，並且立刻結束函式。沒有交回值時，呼叫結果是 undefined。`console.log` 只把值印出來，不能代替 return。

**觀念**

- 沒有寫 return 的呼叫，結果是 `undefined`。寫了 return、右邊卻沒有值，結果同樣是 undefined。

- log 和 return 常被看成同一件事。log 是副作用，把訊息留在 Console；return 是把值交回呼叫端。只為了讓人眼看到，可以 log；下一步還要用這個結果，就要 return。

- 回傳值可以直接拿去用。放進 `const`、嵌進模板字串，或當作另一個函式的引數，用的都是交回來的那個值。

- return 會立刻離開函式。寫在它後面的同一層程式不會執行，這個規則下一節的提早 return 會再用到。

{% note warning %}
**印出來不等於交回來**
函式裡有 console.log，只表示 Console 多了一行。你把這次呼叫放進變數或模板字串，拿到的仍是 undefined，除非函式有 return。
{% endnote %}

```html 04-js/pages/29-js-return.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>return 與回傳值</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function getTotal(price, count) {
        return price * count;
      }

      function printTotal(price, count) {
        console.log(price * count);
      }

      const total = getTotal(80, 3);
      console.log(total);

      const line = `合計 ${getTotal(80, 2)}`;
      console.log(line);

      console.log(getTotal(getTotal(10, 2), 4));

      console.log(printTotal(80, 3));

      function blank() {
        return;
      }

      console.log(blank());
    </script>
  </body>
</html>
```

**解析**

- `getTotal(80, 3)` 把 240 交回來，放進 total，所以第一行是 240。
- 模板字串裡又呼叫了一次，80 乘 2 的回傳值嵌進句子，第二行是「合計 160」。
- 第三行把回傳值當成引數。裡面的呼叫先得到 20，外面再用 20 與 4 相乘，得到 80。
- 這三行都沒有在 getTotal 裡 log，畫面上的字是呼叫端印出來的。
- `printTotal(80, 3)` 自己先印出 240，函式沒有 return，外層的 console.log 再把這次呼叫的結果印出來，所以緊接著是 undefined。
- `blank` 寫了 return 但沒有值，最後一行同樣是 undefined。
- 兩種「沒有交回值」的寫法，結果一樣。

```text
240
合計 160
80
240
undefined
undefined
```

{% note success %}
**換你試試：**
寫 `getDouble`，回傳 n 的兩倍。用模板字串印出「兩倍是 12」。再寫一支只 log、沒有 return 的函式，把呼叫放進 console.log，確認多一行 undefined。
{% endnote %}

<details>
<summary>參考答案</summary>

getDouble(6) 交回 12，模板字串接成「兩倍是 12」。printOnly 先印出 6，外層再印出它的回傳值 undefined。

```diff 04-js/pages/29-js-return.html
  // ...
        }
  
        console.log(blank());
+ 
+       function getDouble(n) {
+         return n * 2;
+       }
+ 
+       console.log(`兩倍是 ${getDouble(6)}`);
+ 
+       function printOnly(n) {
+         console.log(n);
+       }
+ 
+       console.log(printOnly(6));
      </script>
    </body>
  // ...
```

</details>

### 提早 return

函式收到的參數不一定都合理，例如人數傳入 0，除法就會算出 `Infinity` 或 `NaN`，錯誤的結果還會一路往後傳。提早 return（也叫 guard clause）的做法是在函式一開頭先檢查這些無效輸入，不合法就立刻 return 結束函式，後面的主要計算只需要處理正常情況。

**觀念**

- 會讓計算出錯的輸入要先擋下來，檢查放在函式最上方，一條規則寫一個 if。
- 有回傳值的函式，不合法時印出原因並 return `null`，讓呼叫的人知道這次沒有結果，而不是拿到一個看似正常的錯誤數字。
- 只負責做事、不需要回傳值的函式（例如只用 console.log 印出結果），直接寫 `return;` 就能終止，後面的動作都不會執行。
- 每個 if 都在 return 後結束，不需要 else。通過所有檢查之後，剩下的程式就是正常情況的計算。

{% note warning %}
**return 後面的程式不會跑**
同一層寫在 `return` 之後的程式不會執行，包含 `console.log`。檢查用的訊息要放在 return 之前。
{% endnote %}

```html 04-js/pages/30-js-guard.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>提早 return</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      // 沒有檢查：參數不合理時，除法照樣算出結果
      function averageRaw(total, count) {
        return total / count;
      }

      console.log(averageRaw(240, 3)); // 80
      console.log(averageRaw(240, 0)); // Infinity
      console.log(averageRaw(0, 0)); // NaN

      // 提早 return：先擋掉無效輸入，再做正常計算
      function average(total, count) {
        if (count <= 0) {
          console.log('人數必須大於 0');
          return null;
        }
        if (total < 0) {
          console.log('分數總和不能是負數');
          return null;
        }
        return total / count;
      }

      console.log(average(240, 3)); // 80
      console.log(average(240, 0)); // 先印原因，再印 null
      console.log(average(-10, 2)); // 先印原因，再印 null

      // 不需要回傳值：用 return; 單純終止動作
      function printScore(name, score) {
        if (score < 0 || score > 100) {
          console.log(name + ' 的分數無效');
          return;
        }
        console.log(name + ' 考了 ' + score + ' 分');
      }

      printScore('Amy', 88);
      printScore('Ben', 120);
    </script>
  </body>
</html>
```

**解析**

- averageRaw 沒有任何檢查，人數是 0 時，240 除以 0 得到 `Infinity`，0 除以 0 得到 `NaN`，這些值傳到後面的計算只會讓錯誤擴大。
- average 的第一個 if 檢查人數，`average(240, 0)` 在這裡印出原因後就 return `null`，下面的除法完全沒有執行。
- 第二個 if 檢查總和，`average(-10, 2)` 通過了人數檢查，卻在這一關被擋下。
- `average(240, 3)` 通過兩個檢查，才走到最後一行的除法，得到正常的 80。
- printScore 只負責印出訊息，沒有值要交回去，所以檢查不通過時只寫 `return;`，`printScore('Ben', 120)` 印出無效後就結束，不會再印出分數。

```text
80
Infinity
NaN
80
人數必須大於 0
null
分數總和不能是負數
null
Amy 考了 88 分
Ben 的分數無效
```

{% note success %}
**換你試試：**
每個人的分數最高 100 分，所以總和不能超過 `count * 100`。在 average 裡加上第三個檢查，超過時印出「總和超過上限」並 return `null`，再呼叫 `average(500, 3)` 確認被擋下。
{% endnote %}

<details>
<summary>參考答案</summary>

新的檢查一樣放在除法之前，printScore 不受影響。500 大於 3 乘以 100 的 300，所以印出原因並回傳 `null`，除法不會執行。原本的三次呼叫結果不變。

```diff 04-js/pages/30-js-guard.html
  // ...
            return null;
          }
+         if (total > count * 100) {
+           console.log('總和超過上限');
+           return null;
+         }
          return total / count;
        }
  
        console.log(average(240, 3)); // 80
-       console.log(average(240, 0)); // 先印原因，再印 null
-       console.log(average(-10, 2)); // 先印原因，再印 null
+       console.log(average(240, 0)); // null
+       console.log(average(-10, 2)); // null
+       console.log(average(500, 3)); // null
  
        function printScore(name, score) {
          if (score < 0 || score > 100) {
            // ...
```

</details>

### 預設參數

參數用 `=` 給預設值，只有引數是 undefined 時才套用，傳 null 不會套用。舊寫法用或運算補值時，傳入的 0 也會被換掉。預設參數會留下 0，這和前面學過的空值合併同一類。

**觀念**

- 預設值寫在參數後面。有預設值的參數放在參數列表的尾端，前面的參數仍要照位置傳。

- 只有引數是 undefined 時才套用預設值。沒有傳，和明確傳入 undefined，結果相同。

- 傳入 null 不會套用預設值，參數就是 null。0 與空字串也是明確傳入的值，會留下來。

- 舊寫法常把缺值寫成 `x = x || 0`。0 在邏輯運算裡會被換成右邊，於是傳 0 也被換掉。改用預設參數，或改用前面學過的空值合併，0 才留得住。

{% note warning %}
**0 是有效的引數**
用 `||` 補預設值時，傳入 0 會被換成右邊。人數、次數、分數都可能是 0，這種寫法會把真的 0 吃掉。
{% endnote %}

```html 04-js/pages/31-js-default-param.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>預設參數</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function showCount(count = 1) {
        console.log(count);
      }

      showCount();
      showCount(3);
      showCount(0);
      showCount(undefined);
      showCount(null);

      function countByOr(count) {
        count = count || 1;
        console.log(count);
      }

      countByOr(0);

      function countByNullish(count) {
        console.log(count ?? 1);
      }

      countByNullish(0);
      countByNullish(null);
    </script>
  </body>
</html>
```

**解析**

- showCount 的預設值是 1。沒有傳引數時印出 1，傳 3 印出 3。
- 傳 0 時 0 被留下來，因為 0 不是 undefined。
- 明確傳入 undefined，和沒傳一樣，套用 1。
- 傳入 null 不會套用預設值，第五行是 null。
- `countByOr(0)` 用 `||` 補 1，0 被換掉，第六行是 1。
- 空值合併只在 null 或 undefined 時才改用右邊，所以 0 留下，最後的 null 才變成 1。
- 預設參數的觸發條件和空值合併同一類：undefined 才補，0 不補。

```text
1
3
0
1
null
1
0
1
```

{% note success %}
**換你試試：**
寫 `showCurrency`，參數 currency 的預設值是「TWD」。分別不傳、傳入「USD」、傳入 null，三行應是 TWD、USD、null。
{% endnote %}

<details>
<summary>參考答案</summary>

不傳時用預設的 TWD。USD 蓋過預設值。null 不是 undefined，預設值不會套上，所以第三行是 null。

```diff 04-js/pages/31-js-default-param.html
  // ...
        countByNullish(0);
        countByNullish(null);
+ 
+       function showCurrency(currency = 'TWD') {
+         console.log(currency);
+       }
+ 
+       showCurrency();
+       showCurrency('USD');
+       showCurrency(null);
      </script>
    </body>
  // ...
```

</details>

### 選讀：其餘參數

其餘參數（rest parameters）用 `...numbers` 收集不定數量的引數，得到的是真正的陣列。這裡用一般 for 迴圈配合長度，把收集到的數字加總。

**觀念**

- `...numbers` 把該位置之後的引數全部收集起來，得到的是真正的陣列。沒有傳任何引數時，這個陣列是空的，長度是 0。

- 其餘參數只能放在參數列表的最後一個。它前面可以有普通參數，那些參數仍照位置先對上。

- 讀每一筆時用索引。第一筆的索引是 0，下一筆加 1，索引小於長度就繼續。這是已經學過的 for，只是計數器改去對陣列的位置。

```html 04-js/pages/32-js-rest.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：其餘參數</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function sumAll(...numbers) {
        let total = 0;
        for (let i = 0; i < numbers.length; i += 1) {
          total += numbers[i];
        }
        return total;
      }

      console.log(sumAll(10, 20, 30));
      console.log(sumAll(5));
      console.log(sumAll());
    </script>
  </body>
</html>
```

**解析**

- 第一次呼叫收集到三個數字。索引 0、1、2 依序是 10、20、30，加完是 60。
- 第二次只有一筆，迴圈跑一次，結果是 5。
- 第三次沒有引數，長度是 0，迴圈一次都不進，total 維持 0。
- 三個呼叫的引數數量不同，同一支函式都收得下來。

```text
60
5
0
```

{% note success %}
**換你試試：**
寫 `countAll`，用其餘參數收集引數，回傳陣列的長度。`countAll(8, 8, 8)` 應為 3，不傳引數應為 0。
{% endnote %}

<details>
<summary>參考答案</summary>

長度就是這一次收到的引數數量。三個 8 的長度是 3，空的呼叫長度是 0。這裡還不需要把每一筆加總。

```diff 04-js/pages/32-js-rest.html
  // ...
        console.log(sumAll(5));
        console.log(sumAll());
+ 
+       function countAll(...numbers) {
+         return numbers.length;
+       }
+ 
+       console.log(countAll(8, 8, 8));
+       console.log(countAll());
      </script>
    </body>
  // ...
```

</details>

## 函式表達式

函式也可以先做成一個值，放進變數再呼叫，這種寫法叫函式表達式。箭頭函式是匿名函式表達式的簡寫。函式既然是值，就能當作參數交給另一個函式。

### 匿名函式

函式表達式寫成 `const add = function (a, b) { ... }`。function 後面沒有名字，所以叫匿名函式，透過變數呼叫。它和宣告式的差別在於何時可以呼叫：宣告式會提升，表達式要等賦值之後才能用。

**觀念**

- 匿名函式沒有自己的名字，呼叫時寫的是變數。變數用 `const` 保存，避免這個名字後來被改成別的值。

- 函式宣告會被提到所在作用域的頂端，所以同一個作用域裡，呼叫可以寫在宣告上面。這叫做宣告提升，英文是 hoisting。

- 函式表達式是一則賦值。賦值那一行還沒執行，變數還沒有指向函式，提早呼叫會出錯。

{% note info %}
**宣告式與表達式的差別**
函式宣告在同一個作用域裡會被提升，寫在呼叫的前面或後面都能呼叫。

函式表達式要等賦值那一行執行完，變數才指向函式。在那一行之前呼叫，會出現 `ReferenceError`，後面的程式也會停住。
{% endnote %}

```html 04-js/pages/33-js-anonymous.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>匿名函式</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(sumDeclared(2, 3));

      function sumDeclared(a, b) {
        return a + b;
      }

      // console.log(add(2, 3));

      const add = function (a, b) {
        return a + b;
      };

      console.log(add(2, 3));
    </script>
  </body>
</html>
```

**解析**

- 第一行呼叫 sumDeclared 時，函式宣告還寫在下面，仍然印出 5。函式宣告被提升到這個作用域的頂端，呼叫找得到它。
- add 是函式表達式，函式沒有自己的名字，要等 const 那一行跑完才指向這個匿名函式。
- 註解那一行若拿掉，會在賦值前呼叫 add，Console 出現 ReferenceError，最後一行也不會執行。
- 賦值之後的呼叫印出 5。兩次都是 2 加 3，差別只在名字何時可用。

```text
5
5
```

{% note success %}
**換你試試：**
再寫 `multiply`，用函式表達式回傳兩數相乘。呼叫 `multiply(4, 5)`，應印出 20。不要把呼叫寫在 const 那一行之前。
{% endnote %}

<details>
<summary>參考答案</summary>

multiply 和 add 一樣，是賦值之後才能呼叫的匿名函式。4 乘 5 得到 20，寫在檔案底部，所以出現在兩個 5 之後。

```diff 04-js/pages/33-js-anonymous.html
  // ...
        };
  
        console.log(add(2, 3));
+ 
+       const multiply = function (a, b) {
+         return a * b;
+       };
+ 
+       console.log(multiply(4, 5));
      </script>
    </body>
  // ...
```

</details>

### 箭頭函式

箭頭函式是函式表達式的簡寫，用 `=>` 取代 function 關鍵字。它最大的特色是可以依情況省略括號、大括號和 return，讓只做一件小事的函式寫成一行。這些省略都有固定的規則，寫錯了程式不一定會報錯，卻會得到意料之外的結果，所以下面先把每一種省略的條件說清楚。

**觀念**

- 把匿名函式表達式改成箭頭函式時，拿掉 function，在參數的小括號和大括號之間加上 `=>`，其餘不變。
- 大括號裡只有一行 return 時，可以把大括號和 return 一起省略，箭頭右邊運算式的結果就是回傳值，這叫隱式回傳。
- 只有一個參數時，語法上可以省略參數的小括號，寫成 `n => n * 2`。不過 Prettier 預設會自動把括號補回來，課堂上一律保留括號，寫成 `(n) => n * 2`。
- 沒有參數時，小括號不能省略，要寫成 `() =>`。兩個以上的參數也一定要用小括號包起來。
- 一旦寫了大括號，它就是一般的函式區塊，要交回值就得自己寫 return，沒寫時呼叫結果是 undefined。
- 隱式回傳一個物件時，物件的大括號會被誤認成函式區塊，外面要再包一層小括號，寫成 `() => ({ ... })`。物件下一章才會正式介紹，這裡先記住括號的位置。

{% note warning %}
**大括號裡要自己 return**
省略大括號時，箭頭右邊的運算式就是回傳值。一旦加上大括號，就要自己寫 `return`，沒寫的話呼叫結果是 `undefined`。
{% endnote %}

```html 04-js/pages/34-js-arrow.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>箭頭函式</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      // 1. 匿名函式表達式
      const double1 = function (n) {
        return n * 2;
      };

      // 2. 拿掉 function，加上 =>
      const double2 = (n) => {
        return n * 2;
      };

      // 3. 只有一行 return：省略大括號與 return（隱式回傳）
      const double3 = (n) => n * 2;
      // 只有一個參數時語法上可以寫成 n => n * 2，Prettier 會自動補回括號

      // 沒有參數：小括號不能省略
      const sayHi = () => 'Hi';

      // 兩個以上參數：一定要有小括號
      const add = (a, b) => a + b;

      // 寫了大括號卻忘了 return
      const forgotten = (n) => {
        n * 2;
      };

      // 隱式回傳物件：外面再包一層小括號
      const pair = (left, right) => ({ left: left, right: right });

      console.log(double1(4));
      console.log(double2(4));
      console.log(double3(4));
      console.log(sayHi());
      console.log(add(2, 3));
      console.log(forgotten(4));
      console.log(pair(2, 3));
    </script>
  </body>
</html>
```

**解析**

- double1、double2、double3 是同一支函式的三種寫法，從完整的函式表達式一步步省略，三行都印出 8。
- double3 省略了大括號與 return，箭頭右邊的 `n * 2` 算出的結果就是回傳值。
- sayHi 沒有參數，所以保留空的小括號，呼叫後得到字串 Hi。
- add 有兩個參數，用小括號包起來，右邊的加法直接回傳 5。
- forgotten 寫了大括號卻沒有 return，乘法雖然有執行，結果沒有交出來，所以印出 undefined。
- pair 把物件包在小括號裡，才會當成回傳值。少了那層小括號時，大括號會被當成函式區塊，拿不到物件。

```text
8
8
8
Hi
5
undefined
{ left: 2, right: 3 }
```

{% note success %}
**換你試試：**
下面這支 square 是用匿名函式表達式寫的。把它改寫成最精簡的箭頭函式，呼叫 `square(5)` 應印出 25。
{% endnote %}

```js
const square = function (n) {
  return n * n;
};
```

<details>
<summary>參考答案</summary>

拿掉 function 並加上 `=>`，再因為大括號裡只有一行 return，把大括號和 return 一起省略。參數只有一個，依課堂慣例保留小括號。

```diff 04-js/pages/34-js-arrow.html
  // ...
        console.log(forgotten(4));
        console.log(pair(2, 3));
+ 
+       const square = (n) => n * n;
+       console.log(square(5));
      </script>
    </body>
  // ...
```

</details>

### 函式當作參數

函式也是值，可以存進變數、當作參數傳給另一個函式，由接收的一方決定何時呼叫。這種傳進去的函式叫做 callback。下面的 `calc` 會分別接收具名函式、匿名函式與箭頭函式。

**觀念**

- 參數的名字就是這一次要用的函式。接收方在自己的程式裡加上括號，才真正呼叫，並且可以把自己的數字傳給它。

- 傳入時不要加呼叫括號。括號會先把函式跑完，傳進去的變成回傳值，接收方再把它當函式呼叫就會出錯。

- 具名函式、匿名函式、箭頭函式都可以當這個引數。接收方只負責呼叫參數，不在乎它是哪一種寫法。

- 後面的陣列方法，以及第 07 天的事件處理，都會把函式交出去，由對方決定何時呼叫。

{% note warning %}
**傳進去的是函式本身**
第三個引數寫 `add`，是把函式交出去。寫成 `add()` 會先做完加法，交出去的是數字。
{% endnote %}

```html 04-js/pages/35-js-callback.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>函式當作參數</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function calc(a, b, operation) {
        const result = operation(a, b);
        console.log(result);
      }

      function add(a, b) {
        return a + b;
      }

      calc(10, 4, add);

      calc(10, 4, function (a, b) {
        return a * b;
      });

      calc(10, 4, (a, b) => a - b);
    </script>
  </body>
</html>
```

**解析**

- calc 自己不決定加減乘。它把 a、b 交給第三個參數，再把交回來的結果印出。
- 三次呼叫的前兩個引數都是 10 與 4，結果不同，是因為 operation 不同。
- 第一次傳入具名函式 add，10 加 4 得到 14。
- 第二次傳入匿名函式，10 乘 4 得到 40。
- 第三次傳入箭頭函式，10 減 4 得到 6。
- 三支函式都是在 calc 裡面才被呼叫。

```text
14
40
6
```

{% note info %}
**後面會一直這樣寫**
陣列方法會對每一筆呼叫你傳進去的函式。第 07 天的事件處理也是：點擊發生時，瀏覽器才呼叫你交出去的函式。
{% endnote %}

{% note success %}
**換你試試：**
再呼叫一次 calc，第三個引數用箭頭函式做除法。傳入 10 與 4，應印出 2.5。
{% endnote %}

<details>
<summary>參考答案</summary>

除法和前面的減法一樣，是一支箭頭函式，在 calc 裡才執行。10 除以 4 是 2.5。

```diff 04-js/pages/35-js-callback.html
  // ...
        });
  
        calc(10, 4, (a, b) => a - b);
+ 
+       calc(10, 4, (a, b) => a / b);
      </script>
    </body>
  // ...
```

</details>

## 選讀：閉包

閉包屬於函式與詞法作用域（lexical scope）。函式建立時會記住當時外層的變數，外層函式執行完，內層函式仍然讀得到。前提是把內層函式 return 出去，或當作參數交出去。

**觀念**

- 內層函式使用了外層的變數，又被傳到外層之外，這組綁定就叫閉包。變數活在被記住的那個作用域裡，不是複製一份數字貼到內層。沒有被留下的內層函式，外層執行完就沒有人再讀那些變數。

- 這不是物件導向的機制。回傳的物件只負責把兩支函式一起交出去，記得變數的是函式本身。

- 外層函式每呼叫一次，就做出一份新的變數。兩次呼叫得到的兩支內層函式，各記各的那一份，互不影響。

- 外面若不能直接碰到那個變數，就只能透過交出來的函式讀寫。這就是把狀態封在函式裡，外面改不到內部的 count。

下圖對照下方 `36-js-closure.html` 裡的 script。`const first = createCounter()` 執行一次函式，裡面的 let count = 0 與兩支函式一起被做出來，再由 return 的物件交給 first。second 是另一次呼叫，拿到的是另一份 count。

{% mermaid graph LR %}
  subgraph run1["const first = createCounter()"]
    C1["let count = 0"]
    I1["function increment()<br>count += 1"] --> C1
    G1["function getCount()<br>return count"] --> C1
    R1["return { increment, getCount }"]
    R1 --> I1
    R1 --> G1
  end
  subgraph run2["const second = createCounter()"]
    C2["let count = 0"]
    I2["function increment()"] --> C2
    G2["function getCount()"] --> C2
    R2["return { increment, getCount }"]
    R2 --> I2
    R2 --> G2
  end
  F["first.increment()<br>first.getCount()"] --> R1
  S["second.getCount()"] --> R2
  X["first.count"] -. "undefined" .-x C1
{% endmermaid %}

```html 04-js/pages/36-js-closure.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：閉包</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function createCounter() {
        let count = 0;

        function increment() {
          count += 1;
          return count;
        }

        function getCount() {
          return count;
        }

        return {
          increment: increment,
          getCount: getCount,
        };
      }

      const first = createCounter();
      console.log(first.increment());
      console.log(first.increment());
      console.log(first.getCount());
      console.log(first.count);

      const second = createCounter();
      console.log(second.getCount());
      console.log(first.getCount());
    </script>
  </body>
</html>
```

```text
1
2
2
undefined
0
2
```

**解析**

- `createCounter` 執行時做出 count，並把 increment、getCount 放進回傳的物件。
- 這次呼叫結束後，外面沒有 count 這個名字，但 first 仍握著那兩支函式，所以 count 還在。
- 前兩次 increment 把同一份 count 從 0 改成 1、再改成 2。getCount 只讀不改，第三行仍是 2。
- `first.count` 是 undefined，因為 count 不是物件上的欄位，外面碰不到，只能透過交出來的函式操作，這就是封裝。
- second 是另一次 createCounter，有自己的 count，所以 getCount 是 0。最後再讀 first，仍是 2，兩份狀態沒有混在一起。
- 物件的寫法下一章會展開，這裡用它把兩支函式一起交回。

{% note success %}
**換你試試：**
再呼叫一次 first 的 increment，應得到 3。另外再做一個 createCounter，只 increment 一次，應得到 1，而且 first 的 getCount 仍是 3。
{% endnote %}

<details>
<summary>參考答案</summary>

first 的 count 已是 2，再加一次是 3。新的那一份從 0 開始，increment 一次是 1，不會把 first 改掉。

```diff 04-js/pages/36-js-closure.html
  // ...
        console.log(second.getCount());
        console.log(first.getCount());
+ 
+       console.log(first.increment());
+ 
+       const third = createCounter();
+       console.log(third.increment());
+       console.log(first.getCount());
      </script>
    </body>
  // ...
```

</details>

# 陣列

陣列是一組有順序的值，用從 0 開始的索引取出每一格，`length` 是目前的格數。

這一章先會建立、改格子、看 const 為什麼擋不住內容，再使用陣列共用的方法。選讀用 Set 去掉重複的值。

## 陣列基礎

字面值用中括號寫出陣列，再用索引取出某一格。增加或刪掉格子的那組方法，改的是原來那一份。`const` 鎖住的是變數指向哪一個陣列，不是格子裡的內容。

### 建立與存取

中括號裡的值依序排好。取出某一格要靠索引，種類名稱也分不出這是陣列。

- 第一格的索引是 0，最後一格是長度減 1。

- `at` 可以用負數從結尾倒數。

- typeof 分不出陣列，要改用 `Array.isArray`。

**觀念**

- 索引從 0 開始。長度是 3 時，合法索引是 0、1、2。讀到不存在的索引會得到 undefined。

- `at(-1)` 是最後一格，`at(-2)` 是倒數第二格。正數索引和中括號相同。

- `for...of` 依序取出每一格的值。需要索引時才用 for 配計數器，條件要寫成小於 length。

```html 04-js/pages/37-js-array.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>建立、索引與 length</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const titles = ['台北城市漫遊', '花蓮山海三日', '京都紅葉散步'];

      console.log(titles.length);
      console.log(titles[0]);
      console.log(titles.at(-1));
      console.log(Array.isArray(titles));
      console.log(typeof titles);

      for (const title of titles) {
        console.log(title);
      }
    </script>
  </body>
</html>
```

**解析**

- 長度是 3。索引 0 是第一個字串，`at(-1)` 是最後一個字串。
- `Array.isArray` 是 true，但 typeof 仍印出 object。陣列在型別系統裡被歸在物件這一邊，所以不能靠 typeof 判斷。
- `for...of` 依序印出三個字串，變數 `title` 每一圈都是格子裡的值，不是索引。

```text
3
台北城市漫遊
京都紅葉散步
true
object
台北城市漫遊
花蓮山海三日
京都紅葉散步
```

{% note warning %}
**不要用 for...in 走陣列**
`for...in` 走的是鍵。陣列的鍵是 '0'、'1' 這種字串，還可能遇到原型上額外的鍵。

讀每一格的值用 `for...of`。走物件的鍵留到下一章。
{% endnote %}

{% note success %}
**換你試試：**
印出 `at(-2)`。再用 for 配索引，每一行印出「索引: 值」，索引 0 那一行應為「0: 台北城市漫遊」。
{% endnote %}

<details>
<summary>參考答案</summary>

`at(-2)` 是倒數第二格。`for` 的條件是小於長度，所以索引只走到 2，不會多印一格 undefined。

```diff 04-js/pages/37-js-array.html
  // ...
          console.log(title);
        }
+ 
+       console.log(titles.at(-2));
+ 
+       for (let index = 0; index < titles.length; index += 1) {
+         console.log(index + ': ' + titles[index]);
+       }
      </script>
    </body>
  // ...
```

</details>

### 新增與刪除元素

push、pop、unshift、shift、`splice` 都改原來那個陣列。它們的回傳值不是改完的陣列本身，呼叫之後若沒把回傳值認清楚，下一個方法會接錯對象。

**觀念**

- `push` 加在最後，回傳新的長度。`pop` 拿掉最後一格，回傳被拿掉的值。

- `unshift` 加在最前面，回傳新的長度。`shift` 拿掉第一格，回傳被拿掉的值。

- `splice` 從指定索引刪掉若干格，還可以在同一個位置插入新值。回傳的是被刪掉的那些值，包成一個新陣列。

```html 04-js/pages/38-js-mutate.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>新增與刪除元素</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const titles = ['台北', '花蓮', '京都'];

      console.log(titles.push('台南'));
      console.log(titles.pop());
      console.log(titles.unshift('高雄'));
      console.log(titles.shift());
      console.log(titles.splice(1, 1, '台東'));
      console.log(titles);
    </script>
  </body>
</html>
```

**解析**

- `push` 回傳 4，表示加上台南之後有四格，接著 pop 把台南拿回來。
- unshift 又把長度變回 4，shift 把高雄拿掉，陣列回到三個地名。
- `splice(1, 1, '台東')` 從索引 1 刪掉 1 格，那個被刪掉的值是花蓮，所以回傳只有花蓮的陣列。
- 原陣列的索引 1 改成台東，變成台北、台東、京都。

```text
4
台南
4
高雄
['花蓮']
['台北', '台東', '京都']
```

{% note warning %}
**回傳值不是陣列本身**
push 回傳的是長度，是數字。若寫成 `titles.push('台南').map(...)`，數字上面沒有 map，程式會中斷。

要接著轉換，先讓 push 改完，再對 `titles` 呼叫方法。
{% endnote %}

{% note success %}
**換你試試：**
沿用做完上面步驟的陣列，`splice(0, 2)` 拿掉前兩格。印出回傳值，以及剩下的陣列。
{% endnote %}

<details>
<summary>參考答案</summary>

做到上一節結束時，陣列是台北、台東、京都。再從索引 0 刪掉兩格，回傳的是這兩格，剩下京都。

```diff 04-js/pages/38-js-mutate.html
  // ...
        console.log(titles.splice(1, 1, '台東'));
        console.log(titles);
+ 
+       console.log(titles.splice(0, 2));
+       console.log(titles);
      </script>
    </body>
  // ...
```

</details>

### const 與參考

陣列是放很多個值的容器，用索引取出每一格。變數裡存的不是容器的內容，而是指向這一個容器的參考。變數那一章的 `const` 鎖住的是「這個名字指向哪一個容器」，所以不能把名字改指到另一個陣列；透過索引或 `push` 改格子，容器還是同一個，因此合法。

![const 變數 fruits 指向記憶體裡的同一份陣列。改索引是改格子裡的值，所以可以；寫 fruits 等於一個新陣列是要換成另一個容器，會發生 TypeError](assets/images/js-const-reference-memory.jpg)

**觀念**

- 改 `fruits[0]`，或呼叫會動到格子的方法，動的是同一個陣列。`const` 不會阻止這件事。

- 寫 `fruits = []` 是要讓名字改指到另一個陣列，Console 會出現 TypeError。後面的程式停在這一行。

- 函式的參數若收到陣列，函式裡改格子，外面看得到。傳進去的是同一個參考。物件也是容器，下一章用同一套規則。

```html 04-js/pages/39-js-const-ref.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>const 與參考</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const fruits = ['apple', 'banana', 'cherry'];

      fruits[0] = 'kiwi';
      fruits.push('mango');
      console.log(fruits);

      function replaceFirst(list) {
        list[0] = 'pear';
      }

      replaceFirst(fruits);
      console.log(fruits[0]);
      console.log(fruits);

      // fruits = [];
    </script>
  </body>
</html>
```

**解析**

- 索引 0 改成 kiwi，再 `push` 一格 mango，印出的仍是原來那個陣列，只是格子變了。
- `replaceFirst` 收到同一個參考，把第 0 格改成 pear，函式外面再讀，已經是 pear。
- 最後一行若拿掉註解，會丟出 TypeError，因為 const 不允許把 `fruits` 改指到一個新的空陣列。
- 前面的 log 已經印完，錯誤停在重新賦值那一行。

```text
['kiwi', 'banana', 'cherry', 'mango']
pear
['pear', 'banana', 'cherry', 'mango']
```

{% note info %}
**真的不准改，以及函式裡的修改**
`Object.freeze` 可以凍結第一層，索引不能再改，也不能再加格子。包在裡面的陣列或物件沒有一起凍結。這一篇的 script 不是模組，沒有自動的嚴格模式；凍結之後再改格子會安靜失敗，嚴格模式才會丟出 TypeError。

這個參考也解釋了函式的參數。傳進去的是陣列或物件時，函式裡改的是同一份容器，呼叫端看得到。若要交給函式一份互不影響的資料，要另外複製。寫法在[展開運算子](#展開運算子)。
{% endnote %}

{% note success %}
**換你試試：**
沿用函式跑完之後的陣列，把索引 2 改成 `'lime'`，再 `pop`。印出長度和剩下的陣列。重新賦值那一行維持註解。
{% endnote %}

<details>
<summary>參考答案</summary>

函式結束時是 pear、banana、cherry、mango。索引 2 從 cherry 改成 lime，`pop` 拿掉 mango，長度變成 3。`const` 仍然指著同一個陣列。

```diff 04-js/pages/39-js-const-ref.html
  // ...
        console.log(fruits[0]);
        console.log(fruits);
  
        // fruits = [];
+ 
+       fruits[2] = 'lime';
+       fruits.pop();
+       console.log(fruits.length);
+       console.log(fruits);
      </script>
    </body>
  // ...
```

</details>

## 陣列原型與方法

陣列的方法放在 `Array.prototype`，每個陣列共用這一份。字串章的[原型](#原型)已經說明：自己身上沒有的函式，就到原型上找。這一節依搜尋、轉換、篩選、排序與串接來用，並分清哪些方法會改到原陣列。

{% note warning %}
**不要往原型加方法**
不要往 `Array.prototype` 上加自己的方法。加上去之後，每一個陣列都會看到它。參數與回傳值查 MDN 的 [Array](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array)。
{% endnote %}

### 搜尋與判斷

`Array.prototype` 上的方法可以依用途分成幾類。這一類用來問值在不在，或有沒有格子符合條件。回傳的是布林、索引或那一格的值，而且原陣列不會被改掉。

**觀念**

- `includes` 問值在不在，回傳布林。

- `indexOf` 回傳第一次出現的索引，沒有就是 -1。

- `find` 回傳第一個符合的值，沒有就是 undefined。

- `findIndex` 回傳那個索引，沒有就是 -1。

- `some` 問有沒有任何一格符合，答案確定就停。

- `every` 問是不是每一格都符合，回傳布林。

```html 04-js/pages/40-js-search.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>搜尋與判斷</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const scores = [88, 92, 76, 92];

      // 92 在陣列裡，true；第一次出現在索引 1
      console.log(scores.includes(92));
      console.log(scores.indexOf(92));
      // 小於 80 的第一個值是 76，索引是 2
      console.log(scores.find((score) => score < 80));
      console.log(scores.findIndex((score) => score < 80));
      // 有分數大於等於 90，true；每一格都大於等於 60，true
      console.log(scores.some((score) => score >= 90));
      console.log(scores.every((score) => score >= 60));
      // 原陣列沒有被改
      console.log(scores);

      const mixed = [1, NaN];
      // includes 找得到 NaN；indexOf 得到 -1
      console.log(mixed.includes(NaN));
      console.log(mixed.indexOf(NaN));
    </script>
  </body>
</html>
```

**解析**

- 92 第一次出現在索引 1，後面另一個 92 不會被回傳。
- 原陣列的順序和內容都沒變。
- NaN 用 includes 找得到，用 indexOf 得到 -1。

```text
true
1
76
2
true
true
[88, 92, 76, 92]
true
-1
```

{% note info %}
**空陣列的 every**
沒有任何一格可以違反條件時，`every` 的定義是 true。空陣列呼叫 every 也會得到 true。

要表示「至少有一格」，用 `some`，或先看 length。
{% endnote %}

{% note success %}
**換你試試：**
印出 92 的 `findIndex`、是不是每一格都大於等於 90，以及 `includes(76)`。原陣列仍應是四格。
{% endnote %}

<details>
<summary>參考答案</summary>

92 第一次出現的索引是 1。88 沒有大於等於 90，所以 `every` 是 false。76 在陣列裡，`includes` 是 true。

```diff 04-js/pages/40-js-search.html
  // ...
        console.log(mixed.includes(NaN));
        console.log(mixed.indexOf(NaN));
+ 
+       console.log(scores.findIndex((score) => score === 92));
+       console.log(scores.every((score) => score >= 90));
+       console.log(scores.includes(76));
      </script>
    </body>
  // ...
```

</details>

### 逐一處理與轉換

這一類用來走訪每一格。`forEach` 負責做事，`map` 負責換成新值。兩個方法都不刪格子，也不改原陣列裡的數字。

**觀念**

- `forEach` 的回傳值永遠是 undefined，不能放在串接中間。

- `map` 交回一樣長的新陣列。
  回呼若寫了大括號卻忘了 return，新陣列會滿是 undefined。

```html 04-js/pages/41-js-map.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>forEach 與 map</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const prices = [12800, 15900, 42800];

      // 三行依序是索引 0、1、2，價格是原數字，長度都是 3
      prices.forEach((price, index, array) => {
        console.log(index, price, array.length);
      });

      // 兩倍的新陣列。原陣列仍是三個原價。forEach 的回傳值是 undefined
      const doubled = prices.map((price) => price * 2);
      console.log(doubled);
      console.log(prices);
      console.log(prices.forEach((price) => price));
    </script>
  </body>
</html>
```

**解析**

- forEach 印出三行，索引從 0 到 2，長度都是 3。
- map 交回兩倍的新陣列，prices 三個數字都還在。
- 最後一行是 undefined，那是 forEach 的回傳值。

```text
0 12800 3
1 15900 3
2 42800 3
[25600, 31800, 85600]
[12800, 15900, 42800]
undefined
```

{% note info %}
**回傳值要接住**
`prices.map(...)` 若沒有放進 `const`，新陣列會被丟掉，原陣列也不會變成兩倍。要印的是接住的那個名字。
{% endnote %}

{% note success %}
**換你試試：**
用 `map` 做出每一格都加 1000 的新陣列並印出。再印 `prices[0]`，確認仍是 12800。
{% endnote %}

<details>
<summary>參考答案</summary>

新陣列是 13800、16900、43800。原陣列第 0 格沒有被賦值，所以仍是 12800。

```diff 04-js/pages/41-js-map.html
  // ...
        console.log(prices);
        console.log(prices.forEach((price) => price));
+ 
+       const raised = prices.map((price) => price + 1000);
+       console.log(raised);
+       console.log(prices[0]);
      </script>
    </body>
  // ...
```

</details>

### 篩選與累計

這一類把陣列收成另一份結果，而且不改原陣列。`filter` 留下符合的格子，`reduce` 收成一個值。

練習檔先用 for 與 push 把條件寫對，完成的寫法在同名的 `.html.final`。

**觀念**

- `filter` 的回呼要回傳布林。回傳非 0 的數字也會被當成真。

- `reduce` 的回呼要回傳下一次的累計，括號裡的 0 是起點。

- 加總的起點用 0。起點若是空字串，數字會被接成文字。

- 空陣列又沒有起點時，reduce 會丟出 TypeError。

```html 04-js/pages/42-js-filter.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>filter</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const scores = [88, 92, 76, 95, 61];

      // 留下大於等於 80 的新陣列。原陣列仍是五格
      const passed = scores.filter((score) => score >= 80);

      console.log(passed);
      console.log(scores);
      console.log(scores.length);
    </script>
  </body>
</html>
```

**解析**

- 大於等於 80 的是 88、92、95。
- 原陣列仍是五格。filter 交回的是另一份陣列。

```text
[88, 92, 95]
[88, 92, 76, 95, 61]
5
```

{% note success %}
**換你試試：**
再篩出小於 80 的分數並印出。原陣列的長度仍應是 5。
{% endnote %}

<details>
<summary>參考答案</summary>

小於 80 的是 76 與 61。`filter` 沒有把這兩格從原陣列刪掉。

```diff 04-js/pages/42-js-filter.html
  // ...
        console.log(scores);
        console.log(scores.length);
+ 
+       const failed = scores.filter((score) => score < 80);
+       console.log(failed);
      </script>
    </body>
  // ...
```

</details>

`reduce` 適合把數字收成一個總和。回呼每次回傳目前的累計加上這一格。

```html 04-js/pages/43-js-reduce.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>reduce</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const prices = [12800, 15900, 42800];

      // 從 0 依序相加，得到 71500。原陣列長度仍是 3
      const total = prices.reduce((sum, price) => {
        return sum + price;
      }, 0);

      console.log(total);
      console.log(prices.length);
    </script>
  </body>
</html>
```

**解析**

- 累計從 0 加上三個價格，得到 71500。
- 有起點時，空陣列也會得到 0，而不是 TypeError。

```text
71500
3
```

{% note info %}
**起點的種類就是結果的種類**
起點是數字，一路相加就維持數字。起點若寫成空字串，數字會被接成一長串文字。
{% endnote %}

{% note success %}
**換你試試：**
在陣列最後加上 6800，四個數字從 0 加總。結果應為 78300。
{% endnote %}

<details>
<summary>參考答案</summary>

四個數字相加是 78300。`reduce` 沒有刪掉任何一格。

```diff 04-js/pages/43-js-reduce.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const prices = [12800, 15900, 42800];
+       const prices = [12800, 15900, 42800, 6800];
  
        const total = prices.reduce((sum, price) => {
          return sum + price;
        // ...
```

</details>

### 排序與組合

排序和組合要先看這一步會不會改到原來那一份。

- `sort` 會改原陣列，而且預設把格子轉成字串再比。數字要自己給比較函式。

- slice、concat 與 join 不改原陣列，`toSorted` 與 `toReversed` 則交回另一份。

**觀念**

- `sort` 不給比較函式時，20 會排在 3 後面，因為比的是字串。

- 比較函式回傳負數表示第一個參數排前面，正數表示排後面。

- `slice` 不給參數時複製整份，不改原陣列。

- `concat` 接上更多值，交回新陣列。

- `join` 用分隔字串收成一個字串。

- `reverse` 會改原陣列，回傳的就是原陣列自己。

```html 04-js/pages/44-js-sort.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>排序與組合</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const scores = [20, 3, 100];
      const places = ['花蓮', '台北', '京都'];

      // 先複製再排序。不給比較函式時依字串變成 100、20、3
      const asText = scores.slice().sort();
      // 數字比較才是 3、20、100。原陣列仍是 20、3、100
      const ranked = scores.slice().sort((a, b) => a - b);
      // 地名依 zh-Hant 比較，順序是台北、京都、花蓮
      const byLocale = places.slice().sort((a, b) => a.localeCompare(b, 'zh-Hant'));

      console.log(asText);
      console.log(ranked);
      console.log(scores);
      console.log(byLocale);
      // concat 是四個地名的新陣列，join 是一個字串
      console.log(places.concat(['台南']));
      console.log(places.join('、'));
      // toReversed 倒過來，原陣列仍是 20、3、100
      console.log(scores.toReversed());
      console.log(scores);
    </script>
  </body>
</html>
```

**解析**

- 不給比較函式時，20 會排在 3 後面。
- 排序改的是複本，原陣列仍是 20、3、100。
- toReversed 交回倒序的新陣列，原順序還在。

```text
[100, 20, 3]
[3, 20, 100]
[20, 3, 100]
['台北', '京都', '花蓮']
['花蓮', '台北', '京都', '台南']
花蓮、台北、京都
[100, 3, 20]
[20, 3, 100]
```

{% note info %}
**哪些方法會改原陣列**
會改原陣列的有前面的 push、pop、unshift、shift、splice，以及這裡的 `sort` 與 reverse。

不改原陣列、交回新結果的有 slice、concat、join、map、filter、reduce，以及 `toSorted` 與 toReversed。

後兩個是較新的寫法，要留著原順序時優先用它們。
{% endnote %}

{% note success %}
**換你試試：**
用 `toSorted` 配比較函式 `(a, b) => a - b` 排出 scores。印出新陣列，以及原陣列的第一格仍是 20。
{% endnote %}

<details>
<summary>參考答案</summary>

`toSorted` 交回 3、20、100，不改 `scores`。第一格仍是 20。

```diff 04-js/pages/44-js-sort.html
  // ...
        console.log(scores.toReversed());
        console.log(scores);
+ 
+       const byNumber = scores.toSorted((a, b) => a - b);
+       console.log(byNumber);
+       console.log(scores[0]);
      </script>
    </body>
  // ...
```

</details>

### 方法串接

`filter` 與 `map` 都回傳新陣列，所以下一個方法可以接在點號後面。

`reduce` 回傳的是累計，所以通常放在整條的最後，而且原陣列不會被改掉。

**觀念**

- 每一段都看上一段的回傳值。`filter` 交給 map 的是較短的新陣列。

- 串接之後，map 看到的索引屬於篩完的那一份，不是原陣列。

- `forEach` 回傳 undefined，不能放在中間。

```html 04-js/pages/45-js-chain.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>方法串接</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const prices = [12800, 15900, 42800, 6800];

      // 留下小於 20000 的三個價格，各乘 2，從 0 加總得到 71000
      const total = prices
        .filter((price) => price < 20000)
        .map((price) => price * 2)
        .reduce((sum, price) => sum + price, 0);

      console.log(total);
      console.log(prices);

      // forEach 回傳 undefined，接著呼叫 map 會中斷
      // prices.filter((price) => price < 20000).forEach((price) => price).map((price) => price);
    </script>
  </body>
</html>
```

**解析**

- 三個價格各自乘 2 之後加總，得到 71000。
- prices 仍是原來的四個數字。
- 最後一行若拿掉註解，接著呼叫 map 會中斷。

```text
71000
[12800, 15900, 42800, 6800]
```

{% note success %}
**換你試試：**
只留下大於等於 20000 的價格，不要乘 2，用 `reduce` 加總。這份資料裡只有 42800。
{% endnote %}

<details>
<summary>參考答案</summary>

`filter` 只留下 42800，reduce 從 0 加上它，結果是 42800。中間沒有 `map` 也可以，因為上一段已經是陣列。

```diff 04-js/pages/45-js-chain.html
  // ...
        console.log(total);
        console.log(prices);
  
+       const high = prices
+         .filter((price) => price >= 20000)
+         .reduce((sum, price) => sum + price, 0);
+       console.log(high);
      </script>
    </body>
  // ...
```

</details>

## 選讀：Set

`Set` 是一組不會重複的值。同一個值再放一次，數量不會增加。它不負責排序後的清單頁，適合問「這個值出現過沒有」。要交回陣列時用 `Array.from`。

**觀念**

- `new Set` 會依第一次出現的順序留下值。size 是去重之後的數量，`has` 問值在不在，add 再放一個值。

- `Set` 不是陣列，沒有索引，也不能直接呼叫 map。`Array.from` 依插入順序交出新陣列。

- 值用的是和 includes 類似的比較，`NaN` 在 Set 裡只會留一份。

```html 04-js/pages/46-js-set.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：Set</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const places = ['台北', '花蓮', '台北', '京都'];
      const unique = new Set(places);

      console.log(unique.size);
      console.log(unique.has('花蓮'));

      unique.add('台南');
      console.log(unique.size);
      unique.add('台北');
      console.log(unique.size);
      console.log(Array.from(unique));
    </script>
  </body>
</html>
```

**解析**

- 四個字串放進去之後，重複的台北只留一份，`size` 是 3。花蓮還在，`has` 是 true。
- 加上台南變成 4。再加一次台北，數量仍是 4。
- `Array.from` 依插入順序交出台北、花蓮、京都、台南。原陣列 places 沒有被這個 `Set` 改掉。

```text
3
true
4
4
['台北', '花蓮', '京都', '台南']
```

{% note info %}
**要保持順序、要交給陣列方法時仍用陣列**
Set 只用在「這個值出現過沒有」。需要 map 或 filter 時，先用 `Array.from` 轉回陣列。

學了[展開運算子](#展開運算子)之後，也可以把 `Set` 攤進一對中括號。
{% endnote %}

{% note success %}
**換你試試：**
印出 has 是否看得到「京都」。再 add 一次「京都」，印出 `size`，數量應仍是 4。
{% endnote %}

<details>
<summary>參考答案</summary>

京都已經在 Set 裡，`has` 是 true。再加一次不會讓 `size` 變成 5。

```diff 04-js/pages/46-js-set.html
  // ...
        console.log(unique.size);
        console.log(Array.from(unique));
+ 
+       console.log(unique.has('京都'));
+       unique.add('京都');
+       console.log(unique.size);
      </script>
    </body>
  // ...
```

</details>

# 物件

物件用 `key` 對到 `value`，把一筆資料的欄位放在一起。陣列負責順序，物件負責名字。

這一章先建立物件、改欄位、寫方法，並用可選串連讀可能不存在的欄位。接著看物件的原型與靜態方法。選讀再補 Map，以及呼叫方法時的 this。最後把陣列方法與函式放在同一支檔。

## 物件基礎

這一節從物件字面值開始：大括號寫出欄位，用點記法或中括號讀寫，再改欄位或刪欄位。放在物件裡的函式就是方法。欄位可能不存在時，用可選串連停下，避免再往下讀。

### 建立與存取屬性

點記法用在合法的識別字。key 放在變數裡、或名字裡有減號這類不能當識別字的字元時，改用中括號。這一節先把物件寫出來，並把已經寫上的欄位讀出來。

**觀念**

- 屬性簡寫是變數名字和欄位名字相同時，只寫一次。

- 計算屬性用中括號，名字到執行時才決定。

- 沒有那個欄位時，讀到的是 undefined。

```html 04-js/pages/47-js-object.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>建立與存取屬性</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const title = '台北城市漫遊';
      const field = 'place';

      const tour = {
        id: 1,
        title,
        place: '台北',
        days: 3,
        price: 12800,
        [field + 'Code']: 'TPE',
      };

      console.log(tour.title);
      console.log(tour['place']);
      console.log(tour.placeCode);
      console.log(tour.guide);
    </script>
  </body>
</html>
```

**解析**

- `title` 用簡寫，欄位的值和外面的變數相同。
- placeCode 是計算屬性，名字由 `field + 'Code'` 接出來。
- 點記法與中括號都讀得到已經寫上的欄位。
- 沒有 guide 這個欄位，讀到的是 undefined。

```text
台北城市漫遊
台北
TPE
undefined
```

{% note info %}
**中括號什麼時候必要**
key 在變數裡，或字串裡有減號、空白，點記法寫不出來，用中括號。建立物件時，要把運算結果當欄位名，也是用中括號包住。
{% endnote %}

{% note success %}
**換你試試：**
用變數 `place` 的簡寫再做一筆：id 為 2、標題「花蓮山海三日」、地點「花蓮」、3 天、15900。印出標題，以及中括號取出的價格。
{% endnote %}

<details>
<summary>參考答案</summary>

`place` 和欄位同名，所以只寫一次。中括號裡的 `'price'` 對到 15900。第一個物件維持原樣。

```diff 04-js/pages/47-js-object.html
  // ...
        console.log(tour.placeCode);
        console.log(tour.guide);
+ 
+       const place = '花蓮';
+       const hualien = {
+         id: 2,
+         title: '花蓮山海三日',
+         place,
+         days: 3,
+         price: 15900,
+       };
+ 
+       console.log(hualien.title);
+       console.log(hualien['price']);
      </script>
    </body>
  // ...
```

</details>

### 新增修改與刪除屬性

已經建立的物件可以改已有的欄位，也可以加上新欄位。`delete` 拿掉物件自己的欄位。`const` 鎖住的是變數指向哪一個物件，改欄位仍然合法，把變數改指到另一個物件會丟出 TypeError。

**觀念**

- 賦值給已有的名字是修改。賦值給還沒有的名字是新增。

- `delete` 刪掉物件自己的欄位。沒有那個欄位時，讀到的是 undefined。

- `in` 會看到原型上的名字。`Object.hasOwn` 只看物件自己的欄位。

```html 04-js/pages/48-js-object-update.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>新增修改與刪除屬性</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tour = {
        id: 1,
        title: '台北城市漫遊',
        days: 3,
        price: 12800,
      };

      tour.price = 13900;
      tour.seats = 8;
      console.log(tour.price);
      console.log('seats' in tour);
      console.log(Object.hasOwn(tour, 'seats'));
      console.log(Object.hasOwn(tour, 'toString'));
      console.log('toString' in tour);

      delete tour.seats;
      console.log(Object.hasOwn(tour, 'seats'));
      console.log(tour.days);

      // tour = { id: 2 };
    </script>
  </body>
</html>
```

**解析**

- price 從 12800 改成 13900，又新增 `seats`。in 與 hasOwn 都看得到 seats。
- `toString` 不在這個物件自己身上，hasOwn 是 false。它在原型上，所以 in 是 true。
- delete 之後，seats 不再是自己的欄位。`days` 沒有被刪，仍是 3。
- 最後一行若拿掉註解，會是 TypeError。`const` 不允許改指到另一個物件。

```text
13900
true
true
false
true
false
3
```

{% note warning %}
**const 擋的是換一顆物件**
改欄位、加欄位、刪欄位，動的都是同一顆物件。寫成 `tour = { id: 2 }` 是要換成另一顆，這一行會中斷。
{% endnote %}

{% note success %}
**換你試試：**
把 `days` 改成 4，新增 `place` 為「台北」。印出 days，再刪掉 place，印出 hasOwn 的結果。
{% endnote %}

<details>
<summary>參考答案</summary>

days 改成 4。place 新增後又被刪掉，hasOwn 是 false。前面的 seats 已經刪過，這一題只多看 days 與 place。

```diff 04-js/pages/48-js-object-update.html
  // ...
        console.log(Object.hasOwn(tour, 'seats'));
        console.log(tour.days);
  
        // tour = { id: 2 };
+ 
+       tour.days = 4;
+       tour.place = '台北';
+       console.log(tour.days);
+       delete tour.place;
+       console.log(Object.hasOwn(tour, 'place'));
      </script>
    </body>
  // ...
```

</details>

### 方法

物件裡的函式叫做方法，簡寫 `label() {}` 和寫成 label: function () {} 是同一件事。用物件.方法() 呼叫時，方法裡的 `this` 就是點號左邊那個物件。

箭頭函式沒有自己的 this，所以不拿來寫這種方法。把方法拆出來之後 this 對不到物件的情況，留在選讀。

**觀念**

- 方法寫在物件裡，呼叫時寫成 `tour.label()`。只寫 `label()` 找不到這個名字。

- 方法可以收參數、用 `return` 交回值。`this.title` 讀的是同一個物件上的欄位。

- 方法簡寫裡不要改成箭頭函式。陣列的 `map` 回呼才用箭頭。

```html 04-js/pages/49-js-method.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>方法</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tour = {
        title: '花蓮山海三日',
        days: 3,
        label() {
          return this.title + '・' + this.days + ' 天';
        },
      };

      console.log(tour.label());
    </script>
  </body>
</html>
```

**解析**

- `tour.label()` 的點號左邊是 tour，所以 this.title 與 this.days 讀得到這兩個欄位，接成一行字。
- 方法沒有改到欄位，只是把值交回來。

```text
花蓮山海三日・3 天
```

{% note success %}
**換你試試：**
在同一個物件加上方法 `nights`，回傳天數減 1。用 `tour.nights()` 印出 2。
{% endnote %}

<details>
<summary>參考答案</summary>

`nights` 一樣由 tour.nights() 呼叫，this.days 是 3，減 1 得到 2。`label` 仍印出原來那一行。

```diff 04-js/pages/49-js-method.html
  // ...
            return this.title + '・' + this.days + ' 天';
          },
+         nights() {
+           return this.days - 1;
+         },
        };
  
        console.log(tour.label());
+       console.log(tour.nights());
      </script>
    </body>
  // ...
```

</details>

### 可選串連

`?.` 在點記法的中間停下：左邊是 null 或 undefined 時，整段得到 undefined，不再往下讀，也不會中斷。運算子那一章用過這個符號的卡片，這裡用物件把深層欄位讀完。左邊有值時，它就和平常的點記法一樣。

**觀念**

- `tour.guide?.name` 在 guide 不在時得到 undefined。直接寫 tour.guide.name 會丟出 TypeError。

- `?.` 只處理 null 與 undefined。0 和空字串仍會繼續往下讀。

- 得到 undefined 之後，若要補一句預設文字，接上一章的 `??`。

```html 04-js/pages/50-js-optional.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>可選串連</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tour = { title: '台北城市漫遊', guide: { name: '林' } };
      const other = { title: '花蓮山海三日' };

      console.log(tour.guide?.name);
      console.log(other.guide?.name);
      console.log(other.guide?.name ?? '未定');

      // console.log(other.guide.name);
    </script>
  </body>
</html>
```

**解析**

- 第一筆的 `guide` 是物件，所以讀得到名字「林」。第二筆沒有 guide，可選串連停住，得到 undefined。
- 再接 `??`，undefined 被換成「未定」。
- 最後一行若拿掉註解，會在讀 `name` 時中斷，因為 `other.guide` 是 undefined，不能再點下去。

```text
林
undefined
未定
```

{% note success %}
**換你試試：**
讓 other 也有 guide，名字是「陳」，印出 `other.guide?.name`。應為「陳」。
{% endnote %}

<details>
<summary>參考答案</summary>

補上 `guide` 之後，`?.` 左邊有物件，就讀得到 name。原先沒有 guide 的那一行已經印過 undefined，新的物件是另一個值。

```diff 04-js/pages/50-js-optional.html
  // ...
        console.log(other.guide?.name);
        console.log(other.guide?.name ?? '未定');
  
+       const withGuide = { title: '花蓮山海三日', guide: { name: '陳' } };
+       console.log(withGuide.guide?.name);
      </script>
    </body>
  // ...
```

</details>

## 物件原型與方法

物件也有原型 `Object.prototype`，toString 這類方法放在那裡，用點號呼叫。常用的 keys、values、entries 不在原型上，而是放在 Object 本身，這種寫法叫靜態方法。呼叫時把物件傳進去，寫成 `Object.keys(tour)`。

### 靜態方法

這三個靜態方法把物件自己的欄位收成陣列，而且不改原物件。順序依欄位建立的順序。

**觀念**

- `Object.keys` 交出自己的欄位名。

- `Object.values` 交出那些欄位的值。

- `Object.entries` 把每一組鍵與值收成一個兩格的陣列。

```html 04-js/pages/51-js-keys.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>靜態方法</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tour = { id: 1, title: '台北城市漫遊', days: 3 };

      console.log(Object.keys(tour));
      console.log(Object.values(tour));
      console.log(Object.entries(tour));
      console.log(tour.keys);
      console.log(typeof tour.toString);
    </script>
  </body>
</html>
```

**解析**

- 欄位名是 id、title、days。值是數字 1、字串，以及數字 3。
- entries 的每一格又是一個兩格陣列，左邊是欄位名，右邊是值。
- `tour.keys` 是 undefined，因為 keys 不在這顆物件身上，要寫成 Object.keys。
- toString 從原型取得，typeof 是 function。原物件的三個欄位都還在。

```text
['id', 'title', 'days']
[1, '台北城市漫遊', 3]
[['id', 1], ['title', '台北城市漫遊'], ['days', 3]]
undefined
function
```

{% note info %}
**靜態方法寫在 Object 上**
點號呼叫的是原型上的方法。keys、values、entries 要寫 `Object.keys(tour)` 這種形式，物件自己沒有 keys 這個欄位。
{% endnote %}

{% note success %}
**換你試試：**
加上 `price: 12800`，印出 `Object.keys(tour).length`。應為 4。
{% endnote %}

<details>
<summary>參考答案</summary>

多一個自己的欄位，keys 的長度從 3 變成 4。前面三行是加上 price 之前就印出的，長度那一行才是 4。

```diff 04-js/pages/51-js-keys.html
  // ...
        console.log(tour.keys);
        console.log(typeof tour.toString);
+ 
+       tour.price = 12800;
+       console.log(Object.keys(tour).length);
      </script>
    </body>
  // ...
```

</details>

### 走訪欄位

`Object.entries` 交回的陣列可以用 `for...of` 逐組讀。每一組是兩格，索引 0 是欄位名，索引 1 是值。

`for...in` 會走到原型上的鍵，這一節不拿它當預設寫法。欄位名放在索引 0，值放在索引 1。

**觀念**

- 迴圈變數是一小陣列，不是欄位名本身。

- 索引 0 讀欄位名，索引 1 讀值。原物件不會被這個迴圈改掉。

```html 04-js/pages/52-js-entries.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>走訪欄位</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tour = { id: 1, title: '台北城市漫遊', days: 3 };

      for (const pair of Object.entries(tour)) {
        console.log(pair[0], pair[1]);
      }
    </script>
  </body>
</html>
```

**解析**

- 三組依建立順序印出。左邊是欄位名，右邊是值。
- pair 每一圈都是新的兩格陣列。原物件的三個欄位都還在。

```text
id 1
title 台北城市漫遊
days 3
```

{% note warning %}
**for...in 會走到繼承來的鍵**
`for...in` 走的是可列舉的鍵，範圍包含原型。`Object.keys` 只給物件自己的欄位。

讀欄位用 keys、values 或 entries，再配 for...of。

```js
for (const key in tour) {
  console.log(key);
}
```
{% endnote %}

{% note success %}
**換你試試：**
加上 `price: 12800`。迴圈會多印一行，左邊是 price，右邊是 12800。
{% endnote %}

<details>
<summary>參考答案</summary>

多一個自己的欄位，迴圈從三行變成四行。price 是最後建立的，所以印在最後。

```diff 04-js/pages/52-js-entries.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const tour = { id: 1, title: '台北城市漫遊', days: 3 };
+       const tour = { id: 1, title: '台北城市漫遊', days: 3, price: 12800 };
  
        for (const pair of Object.entries(tour)) {
          console.log(pair[0], pair[1]);
        // ...
```

</details>

## 選讀：Map

`Map` 用 set 放入、get 取出，鍵可以維持數字。物件的鍵則會被轉成字串，所以數字 1 和字串 '1' 會撞成同一個欄位；固定的一筆資料仍用物件，不要為了幾個固定欄位改用 Map。

**觀念**

- `set` 的第一個參數是鍵，第二個是值。`size` 是目前的筆數。

- 鍵不存在時 get 得到 undefined。`get(1)` 和 get('1') 不是同一格。

- 鍵的比較和 `Set` 類似。需要順序、需要 map 與 filter 的清單仍用陣列。

```html 04-js/pages/53-js-map.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：Map</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const prices = new Map();
      prices.set(1, 12800);
      prices.set(2, 15900);

      console.log(prices.get(1));
      console.log(prices.get('1'));
      console.log(prices.size);
    </script>
  </body>
</html>
```

**解析**

- 數字鍵 1 取出 12800。字串 '1' 沒有這把鍵，得到 undefined。
- 目前兩筆，`size` 是 2。
- 若改把資料放進物件再用中括號，鍵會變成字串，和這裡的數字鍵不是同一套規則。

```text
12800
undefined
2
```

{% note success %}
**換你試試：**
再 `set` 一筆鍵 3、值 42800。印出 `prices.size`，應為 3。
{% endnote %}

<details>
<summary>參考答案</summary>

第三筆放進去之後，`size` 是 3。字串鍵 `'1'` 仍然取不到 12800。

```diff 04-js/pages/53-js-map.html
  // ...
        prices.set(1, 12800);
        prices.set(2, 15900);
+       prices.set(3, 42800);
  
        console.log(prices.get(1));
        console.log(prices.get('1'));
        // ...
```

</details>

## 選讀：方法呼叫時的 this

方法寫在物件裡，用 `物件.方法()` 呼叫時，`this` 就是那個物件。

若只把方法抄到另一個名字再呼叫，`this` 不再指向那個物件，欄位會變成 `undefined`。另外，箭頭函式沒有自己的 this，不適合拿來當這種方法。

**觀念**


- 方法的簡寫是 `label() { ... }`，和 `label: function () { ... }` 同一件事。

- 呼叫時點號左邊是誰，`this` 就是誰。

- 把方法拆下來傳給別處之前，這一節先觀察拆下來會發生什麼事。下一篇的事件函式會再遇到。

```html 04-js/pages/54-js-this.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>方法呼叫時的 this</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tour = {
        title: '花蓮山海三日',
        days: 3,
        label() {
          return this.title + '・' + this.days + ' 天';
        },
      };

      console.log(tour.label());

      const copied = tour.label;
      console.log(copied());
    </script>
  </body>
</html>
```

**解析**

- 第一行透過 `tour.label()` 呼叫，`this` 就是那個物件，所以接得出兩個欄位。
- 第二行把函式本身放到 copied，呼叫時左邊沒有物件，this 不是那筆物件，兩個欄位都是 undefined，接出來仍是一行字，只是中間沒有標題。

```text
花蓮山海三日・3 天
undefined・undefined 天
```

{% note warning %}
**不要在方法裡改用箭頭**
箭頭函式會去用外層的 `this`，在這一頁的最外層通常不是這個物件。物件方法維持簡寫，陣列的 `map` 回呼才用箭頭。
{% endnote %}

{% note success %}**換你試試：**在同一筆物件加上 `price: 15900` 與方法 `quote`，回傳 this.price * people。

用 `tour.quote(2)` 印出 31800。{% endnote %}

<details>
<summary>參考答案</summary>

`quote` 由 `tour.quote(2)` 呼叫，this.price 是 15900，乘上參數 2 得到 31800。

拆開來的 `label` 仍會失去 `this`，兩件事互不影響。

```diff 04-js/pages/54-js-this.html
  // ...
          title: '花蓮山海三日',
          days: 3,
+         price: 15900,
          label() {
            return this.title + '・' + this.days + ' 天';
          },
+         quote(people) {
+           return this.price * people;
+         },
        };
  
        console.log(tour.label());
+       console.log(tour.quote(2));
  
        const copied = tour.label;
        console.log(copied());
      // ...
```

</details>

## 綜合練習

這一節把陣列方法、物件與函式放在同一支檔。函式接收陣列，用 filter、map、find、reduce 交回新的結果，不改原來那一份。這裡不用 `import` 與 `export`，因為模組留在選讀。

**觀念**

- 陣列的每一格是物件。函式的第一個參數是這份陣列，篩選條件用 `===`，數字不要和字串比。

- `filter` 留下天數相同的格子，map 只取出標題。

- find 對上 id，沒有就是 undefined。

- `reduce` 從 0 把價格加總。

- 函式裡不要寫死那一份陣列的名字。換一份陣列時，仍呼叫同一個函式。

```html 04-js/pages/55-js-tours.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>綜合練習</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tours = [
        { id: 1, title: '台北城市漫遊', place: '台北', days: 3, price: 12800 },
        { id: 2, title: '花蓮山海三日', place: '花蓮', days: 3, price: 15900 },
        { id: 3, title: '京都紅葉散步', place: '京都', days: 5, price: 42800 },
      ];

      const filterByDays = (list, days) => {
        return list.filter((tour) => tour.days === days);
      };

      const titlesOf = (list) => {
        return list.map((tour) => tour.title);
      };

      const findById = (list, id) => {
        return list.find((tour) => tour.id === id);
      };

      console.log(titlesOf(filterByDays(tours, 3)));
      console.log(findById(tours, 1));
      console.log(tours.length);
    </script>
  </body>
</html>
```

**解析**

- `filterByDays` 留下 days 嚴格等於 3 的兩筆，titlesOf 把它們收成標題陣列。
- `findById` 對上 id 1，交回整筆物件。原陣列長度仍是 3，京都那筆還在。
- `find` 可能是 undefined。這裡的 id 1 一定在，所以接著讀欄位也不會中斷。
- id 不存在時要先確認，再讀欄位。

```text
['台北城市漫遊', '花蓮山海三日']
{ id: 1, title: '台北城市漫遊', place: '台北', days: 3, price: 12800 }
3
```

{% note success %}
**換你試試：**
加上第四筆：id 為 4、標題「台南古蹟一日」、地點「台南」、1 天、6800。再寫 `totalPrice`，用 `reduce` 從 0 把傳入陣列的價格加總。印出四筆的總和，應為 78300。
{% endnote %}

<details>
<summary>參考答案</summary>

第四筆的天數是 1，所以天數等於 3 的標題仍是兩筆。`totalPrice` 不篩選，四個價格相加是 78300。id 1 仍是第一筆。

```diff 04-js/pages/55-js-tours.html
  // ...
          { id: 2, title: '花蓮山海三日', place: '花蓮', days: 3, price: 15900 },
          { id: 3, title: '京都紅葉散步', place: '京都', days: 5, price: 42800 },
+         { id: 4, title: '台南古蹟一日', place: '台南', days: 1, price: 6800 },
        ];
  
        const filterByDays = (list, days) => {
          // ...
          return list.find((tour) => tour.id === id);
        };
  
+       const totalPrice = (list) => {
+         return list.reduce((sum, tour) => sum + tour.price, 0);
+       };
+ 
        console.log(titlesOf(filterByDays(tours, 3)));
        console.log(findById(tours, 1));
        console.log(tours.length);
+       console.log(totalPrice(tours));
      </script>
    </body>
  // ...
```

</details>

# 內建物件

JavaScript 自己就帶著一批內建物件，例如 `Math` 與 `Date`，名字已經存在，不用先建立。它們是語言提供的工具，和你用大括號寫出來的物件字面值不同：後者是一筆自己的資料，前者是現成的功能。

## Math

Math 把常數和數學函式收在同一個名字上，使用時直接寫 `Math.abs` 這種點號。它不是建構函式，`new Math()` 會中斷，也不會做出另一個 Math。

{% note danger %}
**Math 不能 new**
`new Math()` 會丟出 TypeError。常數與方法全語言共用，不需要另外做出一個 Math。
{% endnote %}

### 數學常數與基本運算

圓周率、自然常數、絕對值、次方和平方根都放在 Math 上，呼叫時一樣用點號。次方也可以用前面學過的 `**`，算出來和 `Math.pow` 相同。

**觀念**

- `Math.PI` 是圓周率，`Math.E` 是自然常數。

- `Math.abs` 去掉正負號，只留大小。

- `Math.pow` 算次方，`Math.sqrt` 算平方根。

```html 04-js/pages/56-js-math.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>數學常數與基本運算</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(Math.PI);
      console.log(Math.E);
      console.log(Math.abs(-10));
      console.log(Math.pow(2, 3));
      console.log(2 ** 3);
      console.log(Math.sqrt(16));
    </script>
  </body>
</html>
```

**解析**

- 前兩行是固定常數，每次執行都一樣。
- 絕對值把 -10 收成 10。
- `Math.pow(2, 3)` 與 `2 ** 3` 都是 8。
- 16 的平方根是 4。

```text
3.141592653589793
2.718281828459045
10
8
8
4
```

{% note success %}
**換你試試：**
再印 `Math.abs(-3.5)` 與 `Math.sqrt(9)`，應為 3.5 與 3。
{% endnote %}

<details>
<summary>參考答案</summary>

-3.5 的絕對值是 3.5，9 的平方根是 3。前面的常數與 2 的 3 次方仍先印出來。

```diff 04-js/pages/56-js-math.html
  // ...
        console.log(2 ** 3);
        console.log(Math.sqrt(16));
+ 
+       console.log(Math.abs(-3.5));
+       console.log(Math.sqrt(9));
      </script>
    </body>
  // ...
```

</details>

### 取整數與四捨五入

這四個方法都把小數收成整數，差在往哪一邊收。負數時 `Math.floor` 會往更小的整數走，`Math.trunc` 只把小數砍掉、朝向 0。

**觀念**

- `Math.round` 四捨五入到最接近的整數。

- `Math.floor` 往較小的整數收。

- `Math.ceil` 往較大的整數收。

- `Math.trunc` 直接去掉小數。

```html 04-js/pages/57-js-round.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>取整數與四捨五入</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(Math.round(2.7));
      console.log(Math.floor(2.7));
      console.log(Math.ceil(2.1));
      console.log(Math.trunc(2.9));
      console.log(Math.floor(-2.3));
      console.log(Math.trunc(-2.3));
    </script>
  </body>
</html>
```

**解析**

- 2.7 四捨五入是 3，往較小的整數收則是 2。
- 2.1 往較大的整數收是 3。2.9 去掉小數是 2。
- -2.3 用 floor 得到 -3，用 trunc 得到 -2。

```text
3
2
3
2
-3
-2
```

{% note success %}
**換你試試：**
印出 `Math.ceil(-2.3)`。往較大的整數收，應為 -2。
{% endnote %}

<details>
<summary>參考答案</summary>

-2 比 -3 大，所以 ceil 停在 -2。前面六行維持不變。

```diff 04-js/pages/57-js-round.html
  // ...
        console.log(Math.floor(-2.3));
        console.log(Math.trunc(-2.3));
+ 
+       console.log(Math.ceil(-2.3));
      </script>
    </body>
  // ...
```

</details>

### 最大值、最小值與亂數

`Math.max` 與 `Math.min` 在你傳進去的那些數字裡挑一個，個數不限兩個。

`Math.random` 回傳 0 以上、小於 1 的小數，每次執行都不一樣。

要指定範圍的整數，先把這個小數放大成區間的寬度，用 floor 砍掉小數，再平移到起點，並包成 getRandomInt。

**觀念**

- `Math.max` 取最大，`Math.min` 取最小。

- `Math.random` 沒有參數，結果小於 1，不會等於 1。

- 範圍整數寫成 `Math.floor(Math.random() * (max - min + 1)) + min`。min 與 max 都包含在內。

```html 04-js/pages/58-js-random.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>最大值、最小值與亂數</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(Math.max(1, 5, 3));
      console.log(Math.min(1, 5, 3));
      console.log(Math.random());

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      console.log(getRandomInt(1, 10));
    </script>
  </body>
</html>
```

**解析**

- 1、5、3 的最大是 5，最小是 1。
- 第三行是 0 到小於 1 的小數，實際值依執行時間而定。
- getRandomInt(1, 10) 是 1 到 10 的整數，實際值依執行時間而定。

```text
5
1
0.482
7
```

第三行與第四行的實際值依執行時間而定。小數落在 0 到小於 1，整數落在 1 到 10。上面兩個數字只是一次執行的例子。

{% note success %}
**換你試試：**
再呼叫 `getRandomInt(20, 25)`。結果是 20 到 25 的整數，實際值依執行時間而定。
{% endnote %}

<details>
<summary>參考答案</summary>

多印的那一行仍是整數，最小 20、最大 25。前面的最大、最小與 1 到 10 的亂數照原樣先出現。

```diff 04-js/pages/58-js-random.html
  // ...
        }
  
        console.log(getRandomInt(1, 10));
+       console.log(getRandomInt(20, 25));
      </script>
    </body>
  // ...
```

</details>

### 綜合練習：大樂透產生器

從 1 到 46 抽出 6 個不重複的整數，再由小到大排好。這裡用 `Set` 記住已經抽過的號碼，`while` 在湊滿 6 個之前繼續抽。

**觀念**

- 重複的號碼再放進 `Set` 不會讓 `size` 增加，所以可以一直抽到滿 6 個。

- `Array.from` 把 Set 轉回陣列，再用 sort 由小到大排。比較函式寫成 `(a, b) => a - b`。

```html 04-js/pages/59-js-lotto.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>綜合練習：大樂透產生器</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function getLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
          const n = Math.floor(Math.random() * 46) + 1;
          numbers.add(n);
        }
        return Array.from(numbers).sort((a, b) => a - b);
      }

      const picked = getLottoNumbers();
      console.log(picked);
      console.log(picked.length);
      console.log(new Set(picked).size);
    </script>
  </body>
</html>
```

**解析**

- 每個號碼都是 1 到 46 的整數。抽到重複的會被 Set 擋下，所以迴圈會繼續。
- `sort` 會改這個陣列本身，印出來時已經由小到大。
- 長度是 6，再放進 Set 之後數量仍是 6，表示沒有重複。實際號碼依執行時間而定。

```text
[8, 15, 22, 27, 34, 45]
6
6
```

第一行的號碼實際值依執行時間而定，上面只是一次執行的例子。後兩行一定是 6。

{% note success %}
**換你試試：**
再用抽球寫法做一次：先準備 1 到 46，抽出的號碼用 `splice` 從球池拿掉，所以不會放回去。一樣印出 6 個由小到大的號碼，實際號碼依執行時間而定。
{% endnote %}

<details>
<summary>參考答案</summary>

第一個函式是有放回再靠 Set 去掉重複。第二個函式先把 1 到 46 放進球池，每次抽到的索引用 splice 拿掉，球池變短，所以不會再抽到同一個號碼。兩次印出的號碼都依執行時間而定，長度和去重後的數量都是 6。

```html 04-js/pages/59-js-lotto.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>綜合練習：大樂透產生器</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function getLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
          const n = Math.floor(Math.random() * 46) + 1;
          numbers.add(n);
        }
        return Array.from(numbers).sort((a, b) => a - b);
      }

      function getLottoByDraw() {
        const pool = [];
        for (let n = 1; n <= 46; n += 1) {
          pool.push(n);
        }
        const selected = [];
        for (let i = 0; i < 6; i += 1) {
          const idx = Math.floor(Math.random() * pool.length);
          selected.push(pool[idx]);
          pool.splice(idx, 1);
        }
        return selected.sort((a, b) => a - b);
      }

      const picked = getLottoNumbers();
      console.log(picked);
      console.log(picked.length);
      console.log(new Set(picked).size);

      const drawn = getLottoByDraw();
      console.log(drawn);
      console.log(drawn.length);
      console.log(new Set(drawn).size);
    </script>
  </body>
</html>
```

</details>

## Date

Date 表示一個時間點：物件裡存的是與時區無關的瞬間，顯示時才依電腦時區換算，比較與計算則用毫秒時間戳記。有 `new` 才會得到物件，不加 new 只會得到時間字串；讀和改都走這個物件上的方法，月份從 0 起算。

### UTC 與時區

UTC 是協調世界時，全世界共用的基準時間。各地的鐘面是在這個基準上加減時差，台灣是 UTC+8，所以 UTC 的 00:00 是台灣的 08:00。Date 物件內部存的是一個與時區無關的時間點，顯示時才依電腦時區轉換；用字串建立時，有沒有寫時區也會決定這個點落在哪裡。

**觀念**

- UTC 是協調世界時，各地在這個基準上加減時差。台灣是 UTC+8，所以 UTC 的 00:00 是台灣的 08:00。

- Date 存的是與時區無關的時間點。`toString` 與 `toLocaleString` 顯示本地時間。

- `toISOString` 顯示 UTC，字串結尾的 Z 代表 UTC。

- `getHours` 讀本地小時，`getUTCHours` 讀同一個時間點的 UTC 小時。

- 只有日期的 `'2026-08-01'` 被當成 UTC 午夜。沒有 Z 的 `'2026-08-01T12:00:00'` 被當成本地時間。

- 結尾加上 `Z` 或 `+08:00`，才是明確指定時區。

```html 04-js/pages/60-js-utc.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>UTC 與時區</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const point = new Date('2026-08-01T12:00:00+08:00');
      console.log(point.toString());
      console.log(point.toLocaleString());
      console.log(point.toISOString());
      console.log(point.getHours(), point.getUTCHours());

      const dateOnly = new Date('2026-08-01');
      console.log(dateOnly.toISOString(), dateOnly.getHours());

      const localNoon = new Date('2026-08-01T12:00:00');
      console.log(localNoon.getHours(), localNoon.toISOString());

      const utcNoon = new Date('2026-08-01T12:00:00Z');
      console.log(utcNoon.getHours(), utcNoon.toISOString());
    </script>
  </body>
</html>
```

**解析**

- 前兩行是本地的 12:00，第三行是同一個時間點的 UTC，所以是 04:00，結尾 Z。
- `getHours` 是 12，`getUTCHours` 是 4，台灣相差 8 小時。
- 只有日期的字串對到 UTC 午夜，本地小時在台灣是 8。
- 沒有 Z 的中午在台灣是 12 時，ISO 落到 UTC 04:00。帶 Z 的中午是 UTC 12 時，台灣本地是 20 時。

```text
Sat Aug 01 2026 12:00:00 GMT+0800 (台北標準時間)
2026/8/1 下午12:00:00
2026-08-01T04:00:00.000Z
12 4
2026-08-01T00:00:00.000Z 8
12 2026-08-01T04:00:00.000Z
20 2026-08-01T12:00:00.000Z
```

以台灣 UTC+8 為例。寫明 Z 或 +08:00 的 ISO 字串固定；沒有 Z 的日期時間所對到的 ISO、本地文字與小時，實際值依執行環境而定。

{% note success %}
**換你試試：**
再建立 `new Date('2026-08-01T00:00:00Z')`，印出 `getHours`。以台灣 UTC+8 為例應為 8，實際值依執行環境而定。
{% endnote %}

<details>
<summary>參考答案</summary>

UTC 午夜在台灣是早上 8 點，所以 `getHours` 是 8。前面同一個時間點的本地與 UTC、以及三種字串寫法都還在。

```diff 04-js/pages/60-js-utc.html
  // ...
        const utcNoon = new Date('2026-08-01T12:00:00Z');
        console.log(utcNoon.getHours(), utcNoon.toISOString());
+ 
+       const utcMidnight = new Date('2026-08-01T00:00:00Z');
+       console.log(utcMidnight.getHours());
      </script>
    </body>
  // ...
```

</details>

### 時間戳記

時間戳記 timestamp 是從 1970-01-01 00:00:00 UTC 起算經過的毫秒數，這個起點稱為 Unix epoch。它是一個數字，跟時區無關，所以適合拿來比較、儲存，以及計算兩個時間相差多久。Unix 常見的時間戳以秒為單位，JavaScript 用毫秒，單位要先換算再放進 Date。

**觀念**

- 時間戳記的型別是 `number`，從 1970-01-01 00:00:00 UTC 起算毫秒，與時區無關。

- `Date.now()` 取得當下的毫秒，`getTime` 讀出某個 Date 的毫秒。

- `new Date(時間戳)` 把毫秒轉回 Date。Unix 的秒要乘 1000，才是 JavaScript 的毫秒。

- 毫秒除以 1000 得到 Unix 的秒。兩個 Date 相減，就是兩邊的時間戳記相減。

```html 04-js/pages/61-js-timestamp.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>時間戳記</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const epoch = new Date(0);
      console.log(epoch.toISOString());
      console.log(epoch.toString());

      const point = new Date('2026-08-01T00:00:00Z');
      console.log(point.getTime());
      console.log(Date.now());

      const unixSeconds = 1785542400;
      console.log(new Date(unixSeconds * 1000).toISOString());
      console.log(Math.floor(point.getTime() / 1000));

      const start = new Date(2026, 7, 1);
      const end = new Date(2026, 7, 2);
      console.log(end - start);
      console.log(end.getTime() - start.getTime());
    </script>
  </body>
</html>
```

**解析**

- `new Date(0)` 是 epoch。ISO 字串是 UTC 午夜，本地在台灣是 08:00。
- `getTime` 讀出 2026-08-01 午夜 UTC 的毫秒。下一行是執行當下，每次都不同。
- 秒乘 1000 轉回同一個 UTC 午夜，毫秒除以 1000 得到 Unix 的秒。
- 兩個 Date 相減與 `getTime` 相減都是 86400000，也就是一天的毫秒。

```text
1970-01-01T00:00:00.000Z
Thu Jan 01 1970 08:00:00 GMT+0800 (台北標準時間)
1785542400000
1792731067778
2026-08-01T00:00:00.000Z
1785542400
86400000
86400000
```

第二行以台灣 UTC+8 為例，括號內的時區名稱依執行環境而定。第四行是執行當下的毫秒，實際值依執行時間而定。

{% note success %}
**換你試試：**
再印 `new Date(86400000)` 的 `toISOString`。一天是 86400000 毫秒，應為 1970-01-02 的 UTC 午夜。
{% endnote %}

<details>
<summary>參考答案</summary>

86400000 毫秒是 epoch 的隔天，ISO 字串是 1970-01-02 的 UTC 午夜。前面的 epoch、當下毫秒與一天的差都還在。

```diff 04-js/pages/61-js-timestamp.html
  // ...
        console.log(end - start);
        console.log(end.getTime() - start.getTime());
+ 
+       console.log(new Date(86400000).toISOString());
      </script>
    </body>
  // ...
```

</details>

### new Date 與 Date 的差異

同樣是 Date 這個名字，有沒有 `new` 差很多。`new Date()` 做出日期物件，上面才有 getFullYear 這類方法。

不加 new 的 `Date()` 只回傳當下時間的字串，型別是 string。字串上沒有日期方法，`typeof Date().getFullYear` 得到 undefined。這裡沒有加上呼叫括號，所以程式不會中斷。

`Date.now()` 不建立物件，直接交回的毫秒數就是時間戳記，型別是 number。

**觀念**

- `new Date()` 的 typeof 是 object，`Date()` 的 typeof 是 string。

- 物件上的 getFullYear 是 function。字串上沒有這個名字，所以是 undefined。

- `Date.now()` 的 typeof 是 number。

```html 04-js/pages/62-js-date-call.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>new Date 與 Date 的差異</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(typeof new Date());
      console.log(typeof Date());
      console.log(typeof Date().getFullYear);
      console.log(typeof new Date().getFullYear);
      console.log(typeof Date.now());
    </script>
  </body>
</html>
```

**解析**

- 第一行是物件，第二行是字串。兩行都沒有把時間文字印出來。
- 第三行停在「字串上沒有這個名字」，得到 undefined，程式繼續往下。
- 第四行看的是物件上的方法，typeof 是 function。第五行是呼叫 Date.now 之後的數字。

```text
object
string
undefined
function
number
```

{% note success %}
**換你試試：**
印出 `typeof Date.now`，括號不要加。應為 function。
{% endnote %}

<details>
<summary>參考答案</summary>

不加括號時，Date.now 本身是函式。加上括號才會執行，得到 number。前面五行照原樣先出現。

```diff 04-js/pages/62-js-date-call.html
  // ...
        console.log(typeof new Date().getFullYear);
        console.log(typeof Date.now());
+ 
+       console.log(typeof Date.now);
      </script>
    </body>
  // ...
```

</details>

### 建立指定日期

現在時間用沒有參數的 `new Date()`。指定年月日時分秒時，月份從 0 開始，所以 5 月要傳 4。

字串寫成 `2026-08-01T12:00:00` 這種 ISO 格式時，瀏覽器把它當成本地時間。只有日期、以及 Z 與時差的寫法，見 UTC 與時區。

**觀念**

- 六個數字依序是年、月、日、時、分、秒。月的 0 代表 1 月。

- 沒有傳進去的時分秒會是 0。下面的生日有帶到時與分。

- ISO 字串要含有 T 與時間。只有日期的字串見 UTC 與時區。

```html 04-js/pages/63-js-date.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>建立指定日期</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const now = new Date();
      const birthday = new Date(1990, 4, 15, 8, 30, 0);
      const isoDate = new Date('2026-08-01T12:00:00');

      console.log(now.getFullYear());
      console.log(
        birthday.getMonth() + 1,
        birthday.getDate(),
        birthday.getHours(),
        birthday.getMinutes()
      );
      console.log(isoDate.getMonth() + 1, isoDate.getDate(), isoDate.getHours());
    </script>
  </body>
</html>
```

**解析**

- 第一行是執行當下的年份，實際值依執行時間而定。
- 月份索引 4 加 1 是 5 月，日期 15，時間 8 時 30 分。
- ISO 字串的 8 月 1 日 12 時被讀成日曆上的 8 月、1 日、12 時。

```text
2026
5 15 8 30
8 1 12
```

第一行的實際值依執行時間而定。

{% note success %}
**換你試試：**
建立 2026 年 12 月 31 日 23 時 59 分 59 秒，印出日曆月份、日期與小時，應為 12、31、23。
{% endnote %}

<details>
<summary>參考答案</summary>

12 月的索引是 11。讀回時月份加 1 才是 12，日期是 31，小時是 23。第一行仍是當下年份。

```diff 04-js/pages/63-js-date.html
  // ...
        );
        console.log(isoDate.getMonth() + 1, isoDate.getDate(), isoDate.getHours());
+ 
+       const yearEnd = new Date(2026, 11, 31, 23, 59, 59);
+       console.log(yearEnd.getMonth() + 1, yearEnd.getDate(), yearEnd.getHours());
      </script>
    </body>
  // ...
```

</details>

### 讀取日期與時間

讀取用 get 開頭的方法，只看值，不改原本的時間。`getMonth` 從 0 起算，印給人看時要加 1。

`getDate` 是幾號，`getDay` 是星期，0 代表星期日。兩個名字只差一個字，要印出幾號就用前者。

時、分、秒各自讀出。`getTime` 讀出的毫秒就是時間戳記。

**觀念**

- 星期的 0 是星期日，6 是星期六。

- `getTime` 就是時間戳記，單位與換算見時間戳記。

```html 04-js/pages/64-js-date-get.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>讀取日期與時間</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const point = new Date(2026, 7, 1, 14, 30, 45);

      console.log(point.getFullYear());
      console.log(point.getMonth() + 1);
      console.log(point.getDate());
      console.log(point.getDay());
      console.log(point.getHours(), point.getMinutes(), point.getSeconds());
      console.log(point.getTime());
    </script>
  </body>
</html>
```

**解析**

- 年份 2026，月份索引 7 加 1 是 8 月，日期是 1。
- 2026 年 8 月 1 日是星期六，`getDay` 得到 6。
- 14 時 30 分 45 秒是建立時傳入的時間。
- 最後一行是時間戳記。以台灣 UTC+8 為例，實際值依執行環境而定。

```text
2026
8
1
6
14 30 45
1785565845000
```

最後一行以台灣 UTC+8 為例，實際值依執行環境而定。

{% note success %}
**換你試試：**
另建 2026 年 8 月 2 日，印出 `getDay`。這一天是星期日，應為 0。
{% endnote %}

<details>
<summary>參考答案</summary>

8 月 2 日接在星期六的隔天，`getDay` 回到 0。前面那一個時間點的六行不變。

```diff 04-js/pages/64-js-date-get.html
  // ...
        console.log(point.getHours(), point.getMinutes(), point.getSeconds());
        console.log(point.getTime());
+ 
+       const nextDay = new Date(2026, 7, 2);
+       console.log(nextDay.getDay());
      </script>
    </body>
  // ...
```

</details>

### 設定日期與時間

set 開頭的方法會直接改掉原來那一個日期物件。還要留著改之前的時間，就先用 `new Date(date)` 複製一份，再對複本呼叫 set。

數字超出該欄的範圍時會自動進位。例如 `setDate(32)` 會從 1 月進到 2 月。

**觀念**

- 年份、月份、日期、時分秒與毫秒都有對應的 set 方法。`setHours` 可以一次傳入時、分、秒。

- `setTime` 用毫秒時間戳記把整筆時間改掉。

- 複製用 `new Date(date)`。之後改複本，原本那一份還在。

```html 04-js/pages/65-js-date-set.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>設定日期與時間</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const date = new Date(2026, 0, 15, 10, 20, 30);
      console.log(date.getDate(), date.getHours(), date.getMinutes());

      date.setFullYear(2027);
      date.setMonth(5);
      date.setDate(20);
      console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());

      date.setHours(14, 30, 45);
      date.setMinutes(5);
      date.setSeconds(8);
      date.setMilliseconds(250);
      console.log(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );

      const mark = new Date(2026, 0, 1, 0, 0, 0);
      date.setTime(mark.getTime());
      console.log(date.getMonth() + 1, date.getDate(), date.getHours());

      const base = new Date(2026, 6, 15, 10, 0, 0);
      const tomorrow = new Date(base);
      tomorrow.setDate(base.getDate() + 1);
      const nextMonth = new Date(base);
      nextMonth.setMonth(base.getMonth() + 1);
      const nextHour = new Date(base);
      nextHour.setHours(base.getHours() + 1);
      console.log(base.getDate(), tomorrow.getDate());
      console.log(base.getMonth() + 1, nextMonth.getMonth() + 1);
      console.log(base.getHours(), nextHour.getHours());

      const overflow = new Date(2026, 0, 1);
      overflow.setDate(32);
      console.log(overflow.getMonth() + 1, overflow.getDate());
    </script>
  </body>
</html>
```

**解析**

- 第一行是改之前的 15 日 10 時 20 分。接下來的 set 都改在同一個物件上。
- 年份 2027、月份索引 5、日期 20，讀回來是 2027 年 6 月 20 日。
- `setHours` 一次寫入 14 時 30 分 45 秒，接著分鐘改成 5、秒改成 8、毫秒改成 250。
- `setTime` 把時間設成 2026 年 1 月 1 日零時，所以讀回 1 月 1 日 0 時。
- base 仍是 15 日、7 月、10 時。三個複本分別是明天 16 日、下個月 8 月、下一小時 11 時。
- 1 月 1 日設成 32 號，進位成 2 月 1 日。

```text
15 10 20
2027 6 20
14 5 8 250
1 1 0
15 16
7 8
10 11
2 1
```

{% note success %}
**換你試試：**
另建 2026 年 1 月 15 日 10 時，對它 `setHours(24)`。小時超過 23 會進到隔天，印出的日期與小時應為 16 與 0。
{% endnote %}

<details>
<summary>參考答案</summary>

24 時沒有留在當天，日期從 15 進到 16，小時回到 0。前面的 set 示範都還在。

```diff 04-js/pages/65-js-date-set.html
  // ...
        overflow.setDate(32);
        console.log(overflow.getMonth() + 1, overflow.getDate());
+ 
+       const roll = new Date(2026, 0, 15, 10, 0, 0);
+       roll.setHours(24);
+       console.log(roll.getDate(), roll.getHours());
      </script>
    </body>
  // ...
```

</details>

### 日期格式化與計算

`toLocaleString` 把日期和時間組成當地的一句話。只要日期用 `toLocaleDateString`，並傳入 zh-TW 指定繁體中文。

只要時間則用 `toLocaleTimeString`。這一行沒有指定地區，文字會跟著瀏覽器的地區設定改變。

兩個日期相減就是時間戳記相減，見時間戳記。再除以一天的毫秒數 `1000 * 60 * 60 * 24`，就換成天數。

**觀念**

- 相減的結果先是毫秒，再除以一天的毫秒數才是天。

- 沒有指定地區的那兩行，實際文字依瀏覽器地區設定而定。指定 `'zh-TW'` 的日期比較固定。

```html 04-js/pages/66-js-date-format.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>日期格式化與計算</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const point = new Date(2026, 7, 1, 14, 30, 45);
      console.log(point.toLocaleString());
      console.log(point.toLocaleDateString('zh-TW'));
      console.log(point.toLocaleTimeString());

      const start = new Date(2026, 7, 1);
      const end = new Date(2026, 7, 10);
      const ms = end - start;
      console.log(ms);
      console.log(ms / (1000 * 60 * 60 * 24));
    </script>
  </body>
</html>
```

**解析**

- 第一行同時有日期和時間，第三行只有時間。這兩行的實際文字依瀏覽器地區設定而定。
- 第二行指定 zh-TW，常見結果是 2026/8/1。
- 8 月 1 日到 8 月 10 日相差 777600000 毫秒，換成 9 天。

```text
2026/8/1 下午2:30:45
2026/8/1
下午2:30:45
777600000
9
```

前三行的實際文字依瀏覽器地區設定而定。上面是繁體中文環境的常見結果，日期和「下午」之間的空白可能略有不同。

{% note success %}
**換你試試：**
再算 2026 年 8 月 1 日到 8 月 16 日的天數，應為 15。
{% endnote %}

<details>
<summary>參考答案</summary>

8 月 16 日減 8 月 1 日是 15 天。毫秒差那一行仍是 9 天的 777600000。

```diff 04-js/pages/66-js-date-format.html
  // ...
        console.log(ms);
        console.log(ms / (1000 * 60 * 60 * 24));
+ 
+       const later = new Date(2026, 7, 16);
+       console.log((later - start) / (1000 * 60 * 60 * 24));
      </script>
    </body>
  // ...
```

</details>

### 綜合練習：跨年倒數

目標放在今年的 12 月 31 日 23:59:59，用現在時間去減，得到剩下的毫秒。再用 `Math.floor` 與 `%` 拆成天、時、分、秒。月份傳 11 才是 12 月。

**觀念**

- 差是負的代表那個時間已經過了。先用 `Math.max` 收成 0，避免印出負數。

- 換算時先變成秒，再用餘數取出不滿 60 的秒與分、不滿 24 的時。天數不再取餘數。

```html 04-js/pages/67-js-countdown.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>綜合練習：跨年倒數</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function getCountdownToNewYear() {
        const now = new Date();
        const target = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
        const diff = Math.max(0, target - now);
        const sec = Math.floor(diff / 1000) % 60;
        const min = Math.floor(diff / (1000 * 60)) % 60;
        const hr = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const day = Math.floor(diff / (1000 * 60 * 60 * 24));
        console.log(`距離今年跨年還有 ${day} 天 ${hr} 小時 ${min} 分 ${sec} 秒`);
      }

      getCountdownToNewYear();
    </script>
  </body>
</html>
```

**解析**

- 目標用今年的年份配上 12 月 31 日 23:59:59。12 月的索引是 11。
- 毫秒先換成秒，再依 60、60、24 拆開。天數是剩下的整天。
- 這一行的實際值依執行時間而定。已經過了那個時間，四個數字都會是 0。

```text
距離今年跨年還有 69 天 11 小時 38 分 49 秒
```

實際值依執行時間而定。上面只是一次執行的例子。

{% note success %}
**換你試試：**
用同樣的算法，改算距離今年 6 月 1 日 0 時還有多久。6 月之後執行，應印出 0 天 0 小時 0 分 0 秒。
{% endnote %}

<details>
<summary>參考答案</summary>

6 月的索引是 5。6 月 1 日已經過去時，`Math.max` 把負的毫秒差收成 0，所以四個單位都是 0。跨年那一行仍依執行時間而定。

```diff 04-js/pages/67-js-countdown.html
  // ...
          console.log(`距離今年跨年還有 ${day} 天 ${hr} 小時 ${min} 分 ${sec} 秒`);
        }
  
+       function getCountdownToJune() {
+         const now = new Date();
+         const target = new Date(now.getFullYear(), 5, 1, 0, 0, 0);
+         const diff = Math.max(0, target - now);
+         const sec = Math.floor(diff / 1000) % 60;
+         const min = Math.floor(diff / (1000 * 60)) % 60;
+         const hr = Math.floor(diff / (1000 * 60 * 60)) % 24;
+         const day = Math.floor(diff / (1000 * 60 * 60 * 24));
+         console.log(`距離今年 6 月 1 日還有 ${day} 天 ${hr} 小時 ${min} 分 ${sec} 秒`);
+       }
+ 
        getCountdownToNewYear();
+       getCountdownToJune();
      </script>
    </body>
  // ...
```

</details>

# 選讀：解構與展開

解構把陣列的某一格，或物件的某個欄位，取成一個變數。展開把已有的格子或欄位攤進新的容器，也可以攤進函式的引數。兩者都用在已經學過的陣列、物件與函式上。這一章可以整章跳過，前面的綜合練習沒有用到它們。

## 解構賦值

解構依位置或欄位名，把要用的值取成變數。陣列看的是順序，物件看的是名字，函式的參數也可以直接拆開物件。原來的陣列和物件都還在。

### 陣列解構

左邊用中括號依位置取名字，右邊是陣列。第一個名字對到索引 0，想跳過的位置留空。這只是多了幾個變數，原陣列的格子還在。

**觀念**

- 左邊的順序就是索引的順序。

- 跳過時留空位，逗號不能省。

- 原陣列的 `length` 不變。

```html 04-js/pages/68-js-array-destructure.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>陣列解構</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const titles = ['台北城市漫遊', '花蓮山海三日', '京都紅葉散步'];

      const [first, second] = titles;
      console.log(first);
      console.log(second);

      const [, , third] = titles;
      console.log(third);
      console.log(titles.length);
    </script>
  </body>
</html>
```

**解析**

- first 是索引 0，second 是索引 1。
- 兩個空位讓 third 對到索引 2，標題是京都紅葉散步。
- 長度仍是 3。解構沒有拿掉任何一格。

```text
台北城市漫遊
花蓮山海三日
京都紅葉散步
3
```

{% note success %}
**換你試試：**
再宣告 `places` 為台北、花蓮、京都。跳過第一格，印出第二格與第三格。
{% endnote %}

<details>
<summary>參考答案</summary>

空位把第一格留在陣列裡，city 是花蓮，last 是京都。titles 那四行維持不變。

```diff 04-js/pages/68-js-array-destructure.html
  // ...
        console.log(third);
        console.log(titles.length);
+ 
+       const places = ['台北', '花蓮', '京都'];
+       const [, city, last] = places;
+       console.log(city);
+       console.log(last);
      </script>
    </body>
  // ...
```

</details>

### 物件解構

左邊用大括號寫欄位名，對到的是名字，和書寫順序無關。欄位不在時可以寫預設值，想用另一個變數名時用冒號重新命名。原物件的欄位不會被刪掉。

**觀念**

- 大括號裡寫的是欄位名。順序和物件裡的書寫順序無關。

- 冒號右邊是新的變數名。預設值只在那個欄位是 undefined 時才用上。

- 0 和空字串會留著，不會被預設值換掉。

```html 04-js/pages/69-js-destructure.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>物件解構</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tours = [
        { id: 1, title: '台北城市漫遊', place: '台北', days: 3, price: 12800 },
        { id: 2, title: '花蓮山海三日', place: '花蓮', days: 3, price: 15900 },
        { id: 3, title: '京都紅葉散步', place: '京都', days: 5, price: 42800 },
      ];

      const { title, place, days } = tours[0];
      const { price, days: kyotoDays, guide = '未定' } = tours[2];

      console.log(title);
      console.log(place + ' ' + days + ' 天');
      console.log(kyotoDays);
      console.log(price);
      console.log(guide);
    </script>
  </body>
</html>
```

**解析**

- 第 0 筆取出三個名字。標題是台北城市漫遊，下一行把地點和天數接起來。
- 第 2 筆的 days 改名成 `kyotoDays`，所以是 5。價格是 42800。
- 這一筆沒有 guide，預設值「未定」才用上。第 2 筆還在原陣列裡。

```text
台北城市漫遊
台北 3 天
5
42800
未定
```

{% note info %}
**預設值看的是 undefined**
欄位的值若是 0 或空字串，預設值不會補上。只有沒有那個欄位，或值是 undefined，才改用預設值。
{% endnote %}

{% note success %}
**換你試試：**
從第 1 筆把 `place` 改名成 `city` 並印出。應為「花蓮」。
{% endnote %}

<details>
<summary>參考答案</summary>

第 1 筆的地點是花蓮，改名之後的變數是 `city`。原來的 place 變數仍是第 0 筆的台北。

```diff 04-js/pages/69-js-destructure.html
  // ...
        console.log(price);
        console.log(guide);
+ 
+       const { place: city } = tours[1];
+       console.log(city);
      </script>
    </body>
  // ...
```

</details>

### 函式參數解構

參數的位置可以直接寫大括號，呼叫時仍傳入整個物件。大括號裡的名字會變成函式裡的變數，沒寫到的欄位留在物件上。預設值只在那個欄位是 undefined 時才用上。

**觀念**

- 呼叫時傳的是一整顆物件，不是把欄位一個一個分開傳。

- 函式裡用到的名字來自物件上的欄位。物件上多出來的欄位不會消失。

- 預設值的寫法與物件解構相同。

```html 04-js/pages/70-js-param-destructure.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>函式參數解構</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tour = { title: '台北城市漫遊', price: 12800, days: 3 };

      function label({ title, price }) {
        return `${title}・NT${price}`;
      }

      console.log(label(tour));
      console.log(tour.days);
    </script>
  </body>
</html>
```

**解析**

- label 收到整顆 tour，參數大括號取出 title 與 price，接成一行字。
- days 沒有寫進參數，物件上的 days 仍是 3。解構沒有刪欄位。

```text
台北城市漫遊・NT$12800
3
```

{% note success %}
**換你試試：**
寫 `brief`，參數拆開 title、days，guide 預設「未定」。印出這筆的結果，中間應有「3 天」與「未定」。
{% endnote %}

<details>
<summary>參考答案</summary>

這筆沒有 guide，預設值才用上。title 與 days 從同一顆物件讀出，label 那一行仍在。

```diff 04-js/pages/70-js-param-destructure.html
  // ...
        console.log(label(tour));
        console.log(tour.days);
+ 
+       function brief({ title, days, guide = '未定' }) {
+         return `${title}・${days} 天・${guide}`;
+       }
+ 
+       console.log(brief(tour));
      </script>
    </body>
  // ...
```

</details>

## 展開運算子

三個點 `...` 把已有的格子或欄位攤開。寫在中括號裡得到新陣列，寫在大括號裡得到新物件，寫在呼叫的引數位置則是逐個傳進參數。它和其餘參數的差別，放在最後一節。

### 陣列展開

三個點寫在中括號裡，把另一個陣列的格子依序攤進來。得到的是新陣列。對新陣列加格子，原來那一份的長度不變。

**觀念**

- 展開可以放在中括號的前面、中間或後面，和其他值接在一起。

- 新陣列和原來那個不是同一個參考。`push` 只影響你呼叫它的那一份。

```html 04-js/pages/71-js-array-spread.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>陣列展開</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const places = ['台北', '花蓮', '京都'];

      const more = [...places, '台南'];
      console.log(places.length);
      console.log(more);
      console.log(more.length);

      const copy = [...places];
      copy.push('高雄');
      console.log(places);
      console.log(copy);
    </script>
  </body>
</html>
```

**解析**

- more 在後面多一格台南，長度是 4。places 的長度仍是 3。
- copy 是另一份。push 高雄之後，places 仍是原來的三個地名。

```text
3
['台北', '花蓮', '京都', '台南']
4
['台北', '花蓮', '京都']
['台北', '花蓮', '京都', '高雄']
```

{% note success %}
**換你試試：**
把「高雄」寫在展開的前面。印出新陣列的長度，以及 `places[0]` 仍是台北。
{% endnote %}

<details>
<summary>參考答案</summary>

高雄在新陣列的索引 0，長度是 4。places 的第一格沒有被賦值，仍是台北。

```diff 04-js/pages/71-js-array-spread.html
  // ...
        console.log(places);
        console.log(copy);
+ 
+       const withKaohsiung = ['高雄', ...places];
+       console.log(withKaohsiung.length);
+       console.log(places[0]);
      </script>
    </body>
  // ...
```

</details>

### 物件展開

三個點寫在大括號裡，把欄位攤進一個新物件。同名欄位以後面寫的為準。這是淺拷貝：第一層的數字和字串是新的值，巢狀的陣列仍是同一個參考。

**觀念**

- 後寫的同名欄位蓋過先攤開的那一個。沒寫到的欄位會被複製過去。

- 改新物件第一層的數字，不會改到原來那一筆。

- 巢狀陣列被 `push` 時，兩邊看得到同一份。

```html 04-js/pages/72-js-spread.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>物件展開</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const tour = {
        title: '台北城市漫遊',
        days: 3,
        price: 12800,
        tags: ['城市'],
      };

      const discounted = { ...tour, price: 11800 };

      console.log(tour.price);
      console.log(discounted.price);
      console.log(discounted.title);

      discounted.tags.push('步行');
      console.log(tour.tags);
      console.log(discounted.tags);
    </script>
  </body>
</html>
```

**解析**

- 新物件把 price 寫成 11800，後寫的蓋過同名欄位。原物件的價格仍是 12800。
- 標題沒有被改寫，所以新物件的標題還是台北城市漫遊。
- tags 是巢狀陣列，展開時複製的是參考。push 進新物件的那一格，原物件的 tags 也變成兩個字串。

```text
12800
11800
台北城市漫遊
['城市', '步行']
['城市', '步行']
```

{% note info %}
**整份深層複製用 structuredClone**
展開只複製第一層。連巢狀的陣列和物件都要拆開時，用 `structuredClone`。它交回一個新的值，之後改巢狀內容不會回到原來那一份。函式、以及部分特殊物件，不在它能複製的範圍裡。

```js
const deep = structuredClone(tour);
deep.tags.push('夜');
```
{% endnote %}

{% note success %}
**換你試試：**
展開同一筆，把 `days` 改成 4、`price` 改成 18900。印出新物件的 days，以及原物件的 days 仍是 3。
{% endnote %}

<details>
<summary>參考答案</summary>

後寫的 days 與 price 只出現在新物件上。原物件的 days 沒有被賦值，所以仍是 3。

```diff 04-js/pages/72-js-spread.html
  // ...
        console.log(tour.tags);
        console.log(discounted.tags);
+ 
+       const longer = { ...tour, days: 4, price: 18900 };
+       console.log(longer.days);
+       console.log(tour.days);
      </script>
    </body>
  // ...
```

</details>

### 函式呼叫時展開

三個點寫在呼叫的引數位置，把陣列的格子依序送進參數。它不能單獨成一行，只能出現在中括號、大括號或引數列表裡。

**觀念**

- 陣列的第 0 格給第一個參數，後面依序對上。

- 參數個數少於格子數時，多出來的格子不會被這個函式用到。

```html 04-js/pages/73-js-spread-call.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>函式呼叫時展開</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function total(a, b, c) {
        return a + b + c;
      }

      const prices = [12800, 15900, 42800];

      console.log(total(...prices));
      console.log(total(prices[0], prices[1], prices[2]));
    </script>
  </body>
</html>
```

**解析**

- 展開把三個價格依序送進 a、b、c，和是 71500。
- 下一行逐個傳入，得到同一個和。兩種寫法用的是同一組數字。

```text
71500
71500
```

{% note info %}
**三個點有兩種方向**
函式章的[選讀：其餘參數](#選讀：其餘參數)也使用 `...`。其餘參數把多出來的引數收集成陣列。展開是把已經有的陣列拆開，逐個傳進參數。
{% endnote %}

{% note success %}
**換你試試：**
寫 `joinPlaces`，收兩個地名，用頓號接起來。對 `['花蓮', '京都']` 展開後印出。
{% endnote %}

<details>
<summary>參考答案</summary>

展開把花蓮給第一個參數、京都給第二個參數，接成「花蓮、京都」。total 的兩行仍是 71500。

```diff 04-js/pages/73-js-spread-call.html
  // ...
        console.log(total(...prices));
        console.log(total(prices[0], prices[1], prices[2]));
+ 
+       function joinPlaces(a, b) {
+         return a + '、' + b;
+       }
+ 
+       console.log(joinPlaces(...['花蓮', '京都']));
      </script>
    </body>
  // ...
```

</details>

# 選讀：錯誤處理與除錯

程式跑起來之後仍可能中斷，例如名字打錯、對這個值呼叫它沒有的方法，或數值超出範圍。中斷時 Console 會留下類型、說明與行號；用 `try` 與 `catch` 可以把錯誤接住，讓後面的程式繼續。除錯則是把中間值印出來，或在 DevTools 暫停，再對照那則訊息找到出錯的那一行。

## 常見錯誤類型

下面四種最常出現在 Console。第一種多半在腳本開始跑之前就被找出來，後面三種則是執行到那一行才發生。發生後若沒有接住，該行之後的程式不會再跑，所以示範裡能接住的都放進 try，語法錯誤只留在註解。

### 錯誤類型

四種錯誤看 `name` 就能分開，`message` 則寫出這次為什麼觸發。能執行的三種放進 try；語法那一行若真的寫進檔案，後面的輸出就不會出現。

**觀念**

- `SyntaxError` 表示程式不符合語法。括號或引號沒有成對時，整份腳本在執行前就停住。

- `ReferenceError` 表示用到還沒宣告的名字。

- `TypeError` 表示這個值不支援該操作，例如對數字呼叫字串方法，或對空值讀屬性。

- `RangeError` 表示數值超出允許範圍，例如陣列長度設成負數。

```html 04-js/pages/74-js-error-type.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>錯誤類型</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      // SyntaxError：括號沒配對時整份腳本無法執行，所以這行保持註解
      // console.log('hi'

      try {
        console.log(notDeclared);
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
      }

      try {
        const score = 80;
        console.log(score.toUpperCase());
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
      }

      try {
        const scores = new Array(-1);
        console.log(scores);
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
      }

      console.log('三種錯誤都接住了');
    </script>
  </body>
</html>
```

```text
ReferenceError
notDeclared is not defined
TypeError
score.toUpperCase is not a function
RangeError
Invalid array length
三種錯誤都接住了
```

**解析**

- 註解那一行若真的執行，訊息是 `missing ) after argument list`，下面的 try 都不會跑。
- 三個 catch 各自印出 name 與 message，最後一行表示腳本沒有中斷。
- ReferenceError 的說明裡帶有那個不存在的名字；TypeError 指出 score 沒有字串方法。
- RangeError 來自長度為負的陣列。長度 0 仍是合法的空陣列，不會進這個 catch。

{% note success %}
**換你試試：**
在最後再包一個 try，對 null 呼叫 `toFixed(0)`，印出 name 與 message。
{% endnote %}

<details>
<summary>參考答案</summary>

前面三種先印完。null 沒有 toFixed，name 是 TypeError，message 裡看得到這個方法。

```diff 04-js/pages/74-js-error-type.html
  // ...
        }
  
        console.log('三種錯誤都接住了');
+ 
+       try {
+         const empty = null;
+         console.log(empty.toFixed(0));
+       } catch (error) {
+         console.log(error.name);
+         console.log(error.message);
+       }
      </script>
    </body>
  // ...
```

</details>

### 讀懂錯誤訊息

沒被接住的錯誤會以紅字停在 Console。同一則先看類型與說明，再看行號對回腳本；函式怎麼呼叫過來，記在 stack。用 try 接住之後紅字不會自動出現，要自己印出類型與說明，後面的程式才會繼續。

**觀念**

- 紅字要同時看類型、說明與行號，行號才對得回腳本裡的那一行。

- `error.name` 是類型，`error.message` 是說明。

- `stack` 記下函式怎麼呼叫過來。示範用 `try` 接住，避免紅字中斷後面的程式。

```html 04-js/pages/75-js-error-message.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>讀懂錯誤訊息</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function formatScore(score) {
        return score.toFixed(0);
      }

      function label(score) {
        return formatScore(score);
      }

      try {
        console.log(label(null));
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
      }

      console.log('程式繼續');
    </script>
  </body>
</html>
```

```text
TypeError
Cannot read properties of null (reading 'toFixed')
程式繼續
```

**解析**

- name 是 TypeError，message 指出 null 沒有 `toFixed`。
- `label` 把 null 傳進 `formatScore`，出錯點在後者，呼叫它的是前者。
- 若拿掉 try，紅字會多出行號，最後一行不會印。接住之後「程式繼續」仍會出現。

{% note success %}
**換你試試：**
改呼叫 `label(80)`。應印 80，然後仍印「程式繼續」。
{% endnote %}

<details>
<summary>參考答案</summary>

80 可以 toFixed，所以不會進 catch。80 先印出來，接著仍印程式繼續。

```diff 04-js/pages/75-js-error-message.html
  // ...
        }
  
        try {
-         console.log(label(null));
+         console.log(label(80));
        } catch (error) {
          console.log(error.name);
          // ...
```

</details>

### 除錯技巧

紅字只告訴你結果，中間值要自己印。逐步追蹤、表格與計時都走 console；要暫停時在那一行寫 debugger。示範把暫停註解掉，頁面打開後才會一次跑完。

**觀念**

- `console.log` 在關鍵步驟印出目前的值，用來確認程式有走到這裡。

- `console.table` 把陣列或物件畫成表，`console.time` 與 timeEnd 用同一個標籤量耗時。

- `debugger` 在 DevTools 打開時會暫停，可以查看當下的變數。這行保持註解，程式才會一次跑完。

- DEBUG 為 true 才印除錯訊息，改成 false 就不會出現。

```html 04-js/pages/76-js-debug.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>除錯技巧</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const DEBUG = true;

      function debugLog(message) {
        if (DEBUG) {
          console.log('[DEBUG]', message);
        }
      }

      function sumScores(scores) {
        debugLog('開始加總');
        console.time('加總');
        let total = 0;
        for (let i = 0; i < scores.length; i++) {
          total += scores[i];
          console.log(`第 ${i} 個：${scores[i]}，目前 ${total}`);
        }
        console.timeEnd('加總');
        // debugger：DevTools 打開時會在這裡暫停，故註解
        return total;
      }

      const rows = [
        { name: '小明', score: 85 },
        { name: '小華', score: 92 },
        { name: '小李', score: 78 },
      ];

      console.table(rows);
      console.log(sumScores([10, 20, 30]));
    </script>
  </body>
</html>
```

```text
┌─────────┬────────┬───────┐
│ (index) │ name   │ score │
├─────────┼────────┼───────┤
│ 0       │ '小明' │ 85    │
│ 1       │ '小華' │ 92    │
│ 2       │ '小李' │ 78    │
└─────────┴────────┴───────┘
[DEBUG] 開始加總
第 0 個：10，目前 10
第 1 個：20，目前 30
第 2 個：30，目前 60
加總: 0.092ms
60
```

**解析**

- Chrome 會把前三筆畫成表，欄位是 name 與 score。上面的文字表格是同一份輸出的另一種呈現。
- DEBUG 那一行表示函式已開始。迴圈每一圈印出索引、這一筆與累計。
- `console.timeEnd` 的毫秒數每次不同，上面是某一次的結果。最後的 60 是回傳值。
- debugger 被註解，所以不會暫停。取消註解且 DevTools 開著時，會停在那一行。

{% note success %}
**換你試試：**
把 DEBUG 改成 false。除錯那行應該消失，表格、每一圈與總和仍在。
{% endnote %}

<details>
<summary>參考答案</summary>

DEBUG 為 false 時，`[DEBUG] 開始加總` 不會出現。表格、每一圈、耗時與 60 都還在。

```diff 04-js/pages/76-js-debug.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       const DEBUG = true;
+       const DEBUG = false;
  
        function debugLog(message) {
          if (DEBUG) {
            // ...
```

</details>

## try 與 catch

可能出錯的程式放進 `try`，出錯就改走 `catch`，由你決定要印什麼、回傳什麼。不論這次有沒有錯，收尾都會再跑一次；要主動中斷時就丟出錯誤物件。第 08 天講非同步時，會再使用同樣的寫法接住失敗。

### try 與 catch 的基本結構

可能出錯的幾行放進 try，出錯就交給 catch。try 裡剩下的行不會再跑，外面的程式在 catch 結束後照常繼續。執行期錯誤接得住；同一份腳本的語法錯誤在解析階段就失敗，這組結構包不到。

**觀念**

- 出錯時立刻離開 `try`，`catch` 的參數就是錯誤物件。

- 這組結束後，外面的程式仍會執行。

- 同一份腳本的語法錯誤發生在解析時，要直接改掉那一行。

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

```text
AMY
Cannot read properties of null (reading 'name')
無法讀取
程式繼續
```

**解析**

- 有 name 的物件會把字母改成大寫，印出 AMY。
- null 沒有 name。catch 用 `console.error` 印 message，Console 以錯誤層級顯示，函式改回傳「無法讀取」。
- 最後一行仍會印出，表示錯誤已被接住，外面的程式沒有停。

{% note success %}
**換你試試：**
再呼叫 `readName({ name: 3 })`。數字沒有 toUpperCase，同樣進 catch。
{% endnote %}

<details>
<summary>參考答案</summary>

前面兩次呼叫先印完。數字 3 沒有 toUpperCase，message 是 `record.name.toUpperCase is not a function`，函式仍回傳無法讀取，最後一行也還在。

```diff 04-js/pages/77-js-try.html
  // ...
        console.log(readName({ name: 'amy' }));
        console.log(readName(null));
+       console.log(readName({ name: 3 }));
        console.log('程式繼續');
      </script>
    // ...
```

</details>

### finally

`finally` 接在 catch 後面，這次有沒有出錯都會執行，適合把收尾放在一處。若 `try` 或 catch 裡寫了 return，收尾仍會先跑完，值才交回呼叫端。因此 Console 上會先看到收尾行，再看到回傳值。

**觀念**

- 有錯誤、沒錯誤，`finally` 都會跑。

- `return` 不會跳過它，收尾印完才把值交出去。

```html 04-js/pages/78-js-finally.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>finally</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function readScore(record) {
        try {
          return record.score;
        } catch (error) {
          console.log(error.name);
          return null;
        } finally {
          console.log('讀取結束');
        }
      }

      console.log(readScore({ score: 90 }));
      console.log(readScore(null));
    </script>
  </body>
</html>
```

```text
讀取結束
90
TypeError
讀取結束
null
```

**解析**

- 第一筆有分數，try 準備回傳 90，但會先印「讀取結束」，外面才印 90。
- 第二筆是 null，catch 印出 TypeError 並準備回傳 null，finally 仍先印收尾。
- 兩次呼叫都有收尾行，表示它不看這次有沒有出錯。

{% note success %}
**換你試試：**
在 finally 再印「已收尾」。兩次呼叫都應看得到這三個字。
{% endnote %}

<details>
<summary>參考答案</summary>

每次呼叫都會印讀取結束與已收尾。成功那次接著印 90；失敗那次先印 TypeError，再印這兩行，最後印 null。

```diff 04-js/pages/78-js-finally.html
  // ...
          } finally {
            console.log('讀取結束');
+           console.log('已收尾');
          }
        }
        // ...
```

</details>

### 主動拋出錯誤

有些結果語言不會當成錯誤，例如除以 0 會得到 Infinity，下一行仍會執行。這種時候要自己把錯誤丟出去，最近的 catch 才接得到。丟出的若是標準錯誤物件，就能讀到 name 與 message；丟出字串就沒有這些資訊，也沒有 stack。

**觀念**

- `throw` 會立刻離開目前的函式，最近的 catch 接到你丟出的值。

- `throw new Error('訊息')` 建立並丟出標準錯誤物件。

- `error.name` 預設是 Error，`error.message` 是你傳入的字串。

- 丟出字串或數字也會進 catch，但沒有 name、message 與 stack。

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

```text
5
Error
除數不能為 0
程式繼續
string
undefined
undefined
```

**解析**

- 10 除以 2 得到 5。除以 0 時主動丟錯，try 裡的下一行不會跑。
- catch 印出 name 與 message。外面的「程式繼續」仍會執行，因為錯誤已經被接住。
- 第二個 try 丟出的是字串，typeof 是 string，name 與 message 都是 undefined，也沒有 stack。

{% note success %}
**換你試試：**
除數小於 0 時也丟出 Error，訊息是「除數不能為負」。另寫一個 try 呼叫 `divide(10, -1)`。
{% endnote %}

<details>
<summary>參考答案</summary>

第一個 try 仍在除以 0 時停住。第二個 try 呼叫負數，name 是 Error，message 是除數不能為負。

```diff 04-js/pages/79-js-throw.html
  // ...
            throw new Error('除數不能為 0');
          }
+         if (b < 0) {
+           throw new Error('除數不能為負');
+         }
          return a / b;
        }
        // ...
          console.log(error.message);
        }
+ 
+       try {
+         console.log(divide(10, -1));
+       } catch (error) {
+         console.log(error.name);
+         console.log(error.message);
+       }
      </script>
    </body>
  // ...
```

</details>

### 自訂錯誤

內建的 Error 可以再分出一種自己的錯誤。做法是宣告新類別去繼承它，建立時把 name 改成新名字。catch 裡就能分開印，不會把驗證失敗和其他問題混在一起。

**觀念**

- 新的錯誤類別繼承 `Error`，建構式用 super 傳入訊息，並設定 `this.name`。

- `instanceof` 可以判斷接到的是不是這個類別。其他錯誤仍是一般的 Error。

```html 04-js/pages/80-js-custom-error.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>自訂錯誤</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      class ValidationError extends Error {
        constructor(message) {
          super(message);
          this.name = 'ValidationError';
        }
      }

      function checkUser(user) {
        if (!user) {
          throw new ValidationError('資料不能為空');
        }
        if (!user.name) {
          throw new ValidationError('名稱不能為空');
        }
        if (user.age < 0) {
          throw new Error('年齡不能為負數');
        }
        return user.name + ' 通過';
      }

      function run(user) {
        try {
          console.log(checkUser(user));
        } catch (error) {
          if (error instanceof ValidationError) {
            console.log('驗證', error.name, error.message);
          } else {
            console.log('其他', error.name, error.message);
          }
        }
      }

      run({ name: 'Amy', age: 25 });
      run(null);
      run({ age: 25 });
      run({ name: 'Amy', age: -1 });
    </script>
  </body>
</html>
```

```text
Amy 通過
驗證 ValidationError 資料不能為空
驗證 ValidationError 名稱不能為空
其他 Error 年齡不能為負數
```

**解析**

- 資料齊全時印出名稱與「通過」，沒有進入 catch。
- null 與缺少名稱都是 ValidationError，前面標「驗證」，並印出 name 與 message。
- 年齡為負是一般 Error，前面標「其他」。instanceof 讓這兩種不會印成同一句。

{% note success %}
**換你試試：**
再呼叫 `run({ age: 20 })`。缺少名稱，應印驗證與「名稱不能為空」。
{% endnote %}

<details>
<summary>參考答案</summary>

前面四次先印完。只有 age、沒有 name 的物件走驗證分支，name 是 ValidationError，message 是名稱不能為空。

```diff 04-js/pages/80-js-custom-error.html
  // ...
        run({ age: 25 });
        run({ name: 'Amy', age: -1 });
+       run({ age: 20 });
      </script>
    </body>
  // ...
```

</details>

### 輸入驗證

檢查可以單獨寫成函式：通過就回傳 true，不通過就主動丟錯。呼叫端只負責接住，成功與失敗的印法都放在同一個流程裡。型別不對、空字串、格式不對會帶著不同的 name 或 message。

**觀念**

- 檢查函式通過時回傳 true，不通過就 `throw`，自己不印錯誤。

- 型別不對丟 `TypeError`，空字串或格式不對丟 `Error`。

```html 04-js/pages/81-js-validate.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>輸入驗證</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      function validateEmail(email) {
        if (typeof email !== 'string') {
          throw new TypeError('電子郵件必須是字串');
        }
        if (email.length === 0) {
          throw new Error('電子郵件不能為空');
        }
        if (!email.includes('@')) {
          throw new Error('電子郵件格式不正確');
        }
        return true;
      }

      function processEmail(email) {
        try {
          validateEmail(email);
          console.log('驗證成功', email);
        } catch (error) {
          console.log(error.name);
          console.log(error.message);
        }
      }

      processEmail('user@example.com');
      processEmail('');
      processEmail('invalid-email');
      processEmail(123);
    </script>
  </body>
</html>
```

```text
驗證成功 user@example.com
Error
電子郵件不能為空
Error
電子郵件格式不正確
TypeError
電子郵件必須是字串
```

**解析**

- 含有 @ 的字串印出驗證成功與原信箱。
- 空字串與缺少 @ 都是 Error，兩句 message 不同。空字串在長度檢查就停住。
- 數字不是字串，name 是 TypeError。型別檢查先失敗，後面的格式檢查不會跑。

{% note success %}
**換你試試：**
再測 `'a@b'` 與 `null`。前者依目前規則成功，後者不是字串。
{% endnote %}

<details>
<summary>參考答案</summary>

`'a@b'` 含有 @，印出驗證成功。null 的型別不是字串，name 是 TypeError，message 是電子郵件必須是字串。前面四次呼叫先印完。

```diff 04-js/pages/81-js-validate.html
  // ...
        processEmail('invalid-email');
        processEmail(123);
+       processEmail('a@b');
+       processEmail(null);
      </script>
    </body>
  // ...
```

</details>

# 選讀：ES Module

一支檔案若把全部程式碼放在一起，名字會和別的檔案擠在同一層。ES Module 是 ES2015 定下的模組標準，瀏覽器可以直接載入，Vite 與 React 專案也用這一套。這一章看它怎麼把檔案切開，以及名字怎麼送出去、怎麼接進來。

## 什麼是 ES Module

早期的頁面把好幾支 script 掛在一起，變數放在同一層，後載入的同名變數會蓋掉先載入的。模組讓每一支檔案有自己的作用域，沒有送出去的名字，別的檔案碰不到。

### 為什麼要拆檔

一個檔案塞滿資料、計算與觀察用的 `console.log`，改一個名字就要在很長的檔案裡找。拆開之後，每一支檔只負責一件事。

一般的 script 共用頁面上的同一層變數。兩支檔案都去宣告或賦值同一個名字時，可能互相蓋掉，也可能在讀到程式時就因為重複宣告而失敗。

寫成模組之後，沒有 `export` 的 const 留在該檔案裡，不會變成大家都能改到的名字。這個名字要先送出，另一支檔再 `import`，才進得來。

### type="module" 的行為

要載入模組，script 標籤加上 `type="module"`。它和一般的 script 有三個差別。

- 它預設等同 `defer`：下載不會擋住 HTML 的解析，等文件解析完再依出現的順序執行。就算寫在 head，執行時也已經看得到 body 裡的元素。這一篇還不操作畫面，只要知道它不會把頁面卡住。

- 它自動使用嚴格模式。沒有宣告就賦值會直接報錯，不能靠省略宣告造出一個誰都能改的名字。這也是這一篇一直先寫 `const` 與 `let` 的原因。

- 模組檔必須用伺服器打開。用 VS Code 的 Live Server 開 `04-js/index.html`，網址是 http 開頭。若用檔案總管直接打開，網址是 `file://`，瀏覽器會擋下模組載入，Console 出現 CORS 錯誤。

{% note info %}
**路徑從這支檔自己算起**
下一節的 `import` 要寫 ./ 開頭的相對路徑，並且帶上副檔名 `.js`。漏了其中一個，模組就載不進來，後面的 log 不會跑。
{% endnote %}

## 匯出與匯入

`export` 把名字送出去，`import` 再接進來。一支檔案可以送出很多個具名匯出；主要只送出一個東西時，用預設匯出。React 元件檔常常一個檔案預設匯出一個元件，匯入的人自己取名。

### 具名匯出與匯入

具名匯出可以很多個。匯入時用大括號，名字要對上；對不上就會在 Console 報錯。

這一節分兩步：第一步先在同一支檔寫好陣列與函式，用 log 看天數等於 3 的標題。第二步把陣列與函式搬到資料檔，入口檔只負責匯入再印。完成的頁面是 `82-js-module.html.final`，程式是同名的 js.final。

**觀念**

- 路徑以這支檔自己為準，寫 `./` 開頭，副檔名 `.js` 要寫上。

- 匯入時可以用 `as` 在這一支檔裡改名。`import * as` 則把該檔的具名匯出收成一個物件，再用點記法取出。

- 沒有匯出的 `const`，另一支檔看不到。模組不會把變數變成大家都能改的名字。

```html 04-js/pages/82-js-module.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>具名匯出與匯入</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script type="module" src="82-js-module.js"></script>
  </body>
</html>
```

```js 04-js/pages/82-js-module-data.js
export const tours = [
  { id: 1, title: '台北城市漫遊', place: '台北', days: 3, price: 12800 },
  { id: 2, title: '花蓮山海三日', place: '花蓮', days: 3, price: 15900 },
  { id: 3, title: '京都紅葉散步', place: '京都', days: 5, price: 42800 },
];

export const filterByDays = (list, days) => {
  return list.filter((tour) => tour.days === days);
};
```

```js 04-js/pages/82-js-module.js
import { tours, filterByDays } from './82-js-module-data.js';

const titles = filterByDays(tours, 3).map((tour) => tour.title);
console.log(titles);
console.log(tours.length);
```

**解析**

- 入口檔沒有自己再寫一份陣列。它從資料檔接進 `tours` 與 filterByDays，留下 days 嚴格等於 3 的兩筆，再取出標題。
- 資料檔匯出了三筆，所以長度是 3。
- 頁面只掛入口那一支 script，資料檔由 `import` 帶進來。直接用 `file://` 打開時，這兩支檔都不會執行。

```text
['台北城市漫遊', '花蓮山海三日']
3
```

{% note info %}
**改名與整包匯入**
大括號裡的 `as` 只影響這一支檔的名字，資料檔的匯出名字不變。星號則把具名匯出收成一個物件。

```js
import { filterByDays as byDays } from './82-js-module-data.js';
import * as data from './82-js-module-data.js';

console.log(byDays(data.tours, 3));
```
{% endnote %}

{% note success %}
**換你試試：**
在資料檔再匯出 `findById`，用 id 找一筆。入口檔印出 id 為 2 的標題，應為「花蓮山海三日」。
{% endnote %}

<details>
<summary>參考答案</summary>

`findById` 和 `filterByDays` 一樣留在資料檔，入口檔只呼叫。id 2 的標題是花蓮山海三日。匯入的大括號要把新名字也寫上，否則入口檔不認識它。

```html 04-js/pages/82-js-module.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>具名匯出與匯入</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script type="module" src="82-js-module.js"></script>
  </body>
</html>
```

```diff 04-js/pages/82-js-module-data.js
  // ...
    return list.filter((tour) => tour.days === days);
  };
+ 
+ export const findById = (list, id) => {
+   return list.find((tour) => tour.id === id);
+ };
```

```js 04-js/pages/82-js-module.js
import { tours, filterByDays, findById } from './82-js-module-data.js';

const titles = filterByDays(tours, 3).map((tour) => tour.title);
console.log(titles);
console.log(tours.length);
console.log(findById(tours, 2).title);
```

</details>

### 預設匯出

一個檔案只能有一個預設匯出。匯入時不要加大括號，名字由匯入的那一邊自己取。這個檔案主要只提供一個函式或一個元件時，用預設匯出。要同時交出好幾個平起平坐的名字時，用具名匯出，呼叫端從大括號就看得到名字。兩者可以同時存在。

**觀念**

- 預設匯出每個檔最多一個。再寫第二個 `export default` 會在讀到程式時失敗。

- 匯入的名字可以自取，不一定要和原本的函式同名。課堂仍取同一個名字，避免對不上。

- 預設與具名同時存在時，預設寫在前面，具名放在大括號。

```html 04-js/pages/83-js-default.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>預設匯出</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script type="module" src="83-js-default.js"></script>
  </body>
</html>
```

```js 04-js/pages/83-js-price.js
export default function formatPrice(price) {
  return `NT$${price}`;
}

export const currency = 'TWD';
```

```js 04-js/pages/83-js-default.js
import formatPrice, { currency } from './83-js-price.js';

console.log(formatPrice(12800));
console.log(currency);
```

**解析**

- `formatPrice` 是預設匯出，匯入時沒有大括號，名字是這一支檔自己取的。
- `currency` 是具名匯出，放在大括號裡。
- 第一行把 12800 嵌進模板字串，得到 `NT$12800`。第二行是貨幣代碼 TWD。
- React 元件之後也常這樣：一個檔案預設匯出元件，另外的常數再用具名匯出。

```text
NT$12800
TWD
```

{% note info %}
**很多個工具函式用具名匯出**
上一節的陣列和函式要一起送出好幾個名字，全部具名，呼叫的人一眼看得到。預設匯出留給這個檔主要只有一個東西的時候。
{% endnote %}

{% note success %}
**換你試試：**
在同一支檔加上具名函式 `formatDays`，參數是一個數字，回傳這個數字再接上「天」。入口檔匯入它，印出 3 天的那句。
{% endnote %}

<details>
<summary>參考答案</summary>

`formatDays` 是第二個具名匯出，和 currency 一起放進大括號。預設的 formatPrice 仍寫在大括號外面。3 傳進去得到「3 天」。

```html 04-js/pages/83-js-default.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>預設匯出</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script type="module" src="83-js-default.js"></script>
  </body>
</html>
```

```js 04-js/pages/83-js-price.js
export default function formatPrice(price) {
  return `NT$${price}`;
}

export const currency = 'TWD';

export const formatDays = (days) => {
  return `${days} 天`;
};
```

```js 04-js/pages/83-js-default.js
import formatPrice, { currency, formatDays } from './83-js-price.js';

console.log(formatPrice(12800));
console.log(currency);
console.log(formatDays(3));
```

</details>

# 本篇重點回顧

下面整理這篇的重點。標題帶「選讀」的章節（閉包、Set、Map、this、解構與展開，以及 ES Module）可以整節跳過，等需要時再回來查。

- JavaScript 負責網頁的行為，標準叫 ECMAScript，本課採用 ES6 之後的現代寫法並在 Console 看結果。課堂 demo 把程式寫在同一份 HTML 的 script；要多頁共用才放到外部檔，src 用相對這份 HTML 的路徑。模組要 import 別的檔，所以仍拆開。
- 會重新賦值的變數用 `let`，其餘一律用 `const`；const 鎖住的是變數指向哪個值，所以陣列和物件的內容仍然可以改。
- 型別轉換用內建函式 Number、String、Boolean，要從帶單位的字串取出開頭整數時用 parseInt 並指定進位 10。
- 每種型別都有內建原型，用 `.` 就能呼叫原型上的方法；字串方法一律回傳新字串，不會改動原值。
- 比較一律用 `===`，多個固定選項的對照用 switch。
- `&&` 與 `||` 可以拿來短路執行與設定預設值，空值合併也一樣。
- 函式用參數接收資料、用 return 交回結果，提早 return 能讓邏輯扁平，箭頭函式常拿來當作傳給其他函式的參數。
- 陣列方法來自 `Array.prototype`，要分清楚哪些會改動原陣列、哪些會回傳新陣列。物件用欄位名字對到值，可能不在的欄位用 `?.` 讀；Math 與 Date 是語言附帶的工具，Math 直接點出來用，Date 要 new 才是物件，時間點與時區分開，比較用毫秒時間戳記。執行期錯誤用 try 與 catch 接住，要自己中斷就丟出 Error，Console 會標出類型、訊息與行號。

上網查這篇的說法時，用括號裡的英文當關鍵字。

# 專有名詞中英對照

## 認識 JavaScript

- 執行環境（runtime）
- 內嵌（inline script）
- 註解（comment）
- 文件物件模型（DOM）
- 相對路徑（relative path）

## 變數與資料型別

- 變數（variable）
- 字串（string）
- 資料型別（data type）
- 數字（number）
- 常數（constant）
- 宣告（declaration）
- 保留字（reserved word）
- 小駝峰（camelCase）
- 大駝峰（PascalCase）
- 全大寫（UPPER_SNAKE_CASE）
- 布林（boolean）
- 賦值（assignment）
- 全域（global）
- 區塊作用域（block scope）
- 綁定（binding）
- 型別轉換（type conversion）
- 整數（integer）
- 小數（floating-point number）

## 字串

- 方法（method）
- 字元（character）
- 索引（index）
- 模板字串（template literal）
- 原型（prototype）
- 不可變（immutable）
- 字面值（literal）
- 插值（interpolation）
- 跳脫（escape）
- 屬性（property）

## 運算子與流程控制

- 迴圈（loop）
- 嚴格相等（strict equality）
- 可選串連（optional chaining）
- 運算子（operator）
- 條件判斷（conditional statement）
- 邏輯運算子（logical operator）
- 條件運算子（conditional operator）
- 空值合併（nullish coalescing）
- 算術運算子（arithmetic operator）
- 賦值運算子（assignment operator）
- 比較運算子（comparison operator）
- 短路求值（short-circuit evaluation）
- 預設值（default value）
- 三元運算子（ternary operator）
- 計數器（counter）
- 巢狀迴圈（nested loop）
- 無限迴圈（infinite loop）

## 函式

- 函式（function）
- 箭頭函式（arrow function）
- 呼叫（function call）
- 回傳值（return value）
- 參數（parameter）
- 引數（argument）
- 基本型別（primitive）
- 副作用（side effect）
- 預設參數（default parameter）
- 其餘參數（rest parameter）
- 函式表達式（function expression）
- 匿名函式（anonymous function）
- 宣告提升（hoisting）
- 隱式回傳（implicit return）
- 閉包（closure）
- 詞法作用域（lexical scope）

## 陣列

- 陣列（array）
- 參考（reference）
- 回呼（callback）
- 嚴格模式（strict mode）
- 累計（accumulator）
- 方法串接（method chaining）

## 物件

- 物件（object）
- 物件字面值（object literal）
- 靜態方法（static method）
- 點記法（dot notation）
- 識別字（identifier）
- 屬性簡寫（shorthand property）

## 內建物件

- 內建物件（built-in object）
- 四捨五入（rounding）
- 亂數（random number）
- 時區（time zone）
- 時間戳記（Unix timestamp）
- 協調世界時（UTC）
- 時差（time zone offset）
- 本地時間（local time）

## 選讀：解構與展開

- 展開運算子（spread syntax）
- 解構賦值（destructuring assignment）
- 淺拷貝（shallow copy）
- 深層複製（deep clone）

## 選讀：錯誤處理與除錯

- 錯誤處理（error handling）
- 除錯（debugging）
- 語法錯誤（syntax error）
- 錯誤物件（error object）
- 執行期錯誤（runtime error）
- 拋出（throw）

## 選讀：ES Module

- 模組（module）
- 匯出（export）
- 匯入（import）
- 具名匯出（named export）
- 預設匯出（default export）
