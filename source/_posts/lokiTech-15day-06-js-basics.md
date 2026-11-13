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

JavaScript 是瀏覽器內建、負責行為的程式語言：資料變了，接下來要算什麼。這一篇先不改畫面，只在 Console 把值算對：變數、型別、字串、判斷、迴圈、函式，再到陣列、物件與解構展開。Math、Date、錯誤處理與模組放在選讀。選取元素、重繪列表與非同步請求分在後面兩篇。

<!-- more -->

# 認識 JavaScript

JavaScript 是瀏覽器用來描述行為的程式語言。這一章先說明它是什麼：和 HTML、CSS 怎麼分工、ECMAScript 是什麼，以及它能在哪些環境執行。接著學最基本的寫法：把程式寫進 HTML、用 Console 看結果、加上註解，再把程式拆成外部檔。選讀看瀏覽器內建的彈窗。

## JavaScript 是什麼

網頁分成結構、外觀、行為三層。前兩層你已經寫過，行為這層才開始用程式描述事情發生之後要做什麼。這一節依序看三層的分工、語言的標準版本，以及程式可以執行的環境。

### HTML、CSS、JavaScript 的分工

HTML 負責結構，CSS 負責外觀，JavaScript 負責行為。標記與樣式只決定頁面上有什麼、長什麼樣子；點了之後要算什麼、送出前要檢查什麼，這些互動要寫成 JavaScript 才會發生。

![同一塊內容的三層：HTML 是結構骨架，CSS 加上外觀，JavaScript 處理點擊後的行為](assets/images/js-html-css-js-roles.jpg)

### ECMAScript 與現代寫法

瀏覽器內建了 JavaScript 的執行能力，讀到 script 就由上往下執行。語言的標準叫做 ECMAScript，2015 年的第 6 版（ES6）加入 `let`、`const`、箭頭函式與模組，本課使用 ES6 以後的現代寫法。

名稱裡有 Java，但它和 Java 是兩種不同的語言，語法與執行環境都不一樣。

![JavaScript 版本時間軸：1995 誕生、2009 ES5、2015 ES6 帶來 let／const、箭頭函式、class、module，之後每年一版；本課使用 ES6 以後的現代寫法](assets/images/js-ecmascript-timeline.jpg)

### 執行環境：瀏覽器與 Node.js

同一套 JavaScript 可以在兩個地方執行：瀏覽器用它操作網頁與表單，Node.js（讓 JavaScript 離開瀏覽器、在電腦上執行的環境）可以讀寫檔案，pnpm 與 Vite 這類工具也是靠 Node.js 執行。前面安裝的 Node.js 負責工具鏈，寫出來的網頁程式最後仍然送到瀏覽器執行。

{% mermaid graph LR %}
js["JavaScript"] --> browser["瀏覽器"]
js --> node["Node.js"]
browser --> b1["操作頁面、處理點擊與表單"]
browser --> b2["DevTools 的 Console 查看結果"]
node --> n1["讀寫檔案"]
node --> n2["執行 pnpm、Vite 等用 JavaScript 寫成的工具"]
{% endmermaid %}

本篇先在瀏覽器裡學語言本身：值、變數、函式，以及陣列和物件。結果都印到 Console，下一篇才開始用 JavaScript 操作畫面，也就是文件物件模型（DOM）。

## 撰寫與執行 JavaScript

程式要放進 HTML 才會被瀏覽器執行，結果則要打開 DevTools 的 Console 才看得到。這一節先把程式直接寫在 HTML 裡，認識 Console 與註解，最後再看實務上的做法：把程式拆成外部檔。選讀的最後是瀏覽器內建的彈窗。

### 內嵌 script

程式可以直接寫在 HTML 的 script 標籤中間，不必另開檔案。瀏覽器讀頁面時由上往下處理，碰到 script 就執行裡面的程式。

**觀念**

- 多個 script 依照它們在頁面裡的位置，由上往下各跑一次。

- 內嵌只適合單頁的小程式。程式變長或多頁要共用時，改用後面介紹的外部檔。

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

- 頁面上只看得到那句說明，兩段 script 的結果都在 Console，因為程式沒有改動 HTML。
- 瀏覽器先執行第一段，再執行第二段，所以 Console 的順序和標籤在檔案裡的先後相同。

```text
第一段
第二段
```

本章的輸出區塊只列出文字內容，和 Console 實際畫面（行號、引號、顏色）略有不同。後面的 demo 為了閱讀方便，除了外部檔那一節，程式都寫在同一份 HTML 的 script 裡。

### Console 與 console.log

Console 是 DevTools 裡顯示程式輸出的面板，也是學習階段最常用的除錯工具。程式呼叫 console 提供的指令（稱為方法）把訊息送進去，頁面本身不會被改動。

打開任一個網頁，按 <kbd>F12</kbd>（Mac 可按 <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>J</kbd>）打開 DevTools 並切到 Console，也可以直接在裡面輸入一行程式再按 Enter，馬上看到結果。這種寫法不會存進檔案，重新整理就消失，適合臨時試算。

```js
100 + 50
```

Console 會在下一行顯示 `150`。要讓程式自己把結果印出來，就用下面這些方法。

**一覽**

- `console.log` 印一般訊息。
- `console.warn` 印黃色提醒。
- `console.error` 印紅色錯誤。

**觀念**

- 每一句程式結尾寫分號。

- 文字要用單引號包起來，引號只是標示範圍，不會印出來。

- 重新整理會把整份程式再跑一遍。上一輪留在 Console 的內容，可以按清除圖示清掉，避免和這一次混在一起。

```html 04-js/pages/02-js-console-log.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>console.log、console.warn 與 console.error</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log('Hello JavaScript');
      console.log('一般訊息');
      console.warn('這是提醒');
      console.error('這是錯誤');
    </script>
  </body>
</html>
```

**解析**

- 打開 Console 重新整理，由上到下出現四行：兩行一般訊息、一行黃色提醒、一行紅色錯誤。
- 三種方法只差在顯示的樣式與層級，訊息內容都是括號裡的文字。
- 頁面中間仍是那句說明，因為這四行都只寫進 Console。

```text
Hello JavaScript
一般訊息
這是提醒
這是錯誤
```

{% note info %}**Console 的篩選器**可以分開顯示一般訊息、提醒與錯誤。為了觀察而留下的輸出，正式上線前要刪掉，避免 Console 堆滿雜訊。{% endnote %}

### 註解

註解是寫給人看的說明，瀏覽器會整段跳過。它也能暫時停用一段程式，不必刪掉。

**觀念**

- 兩條斜線之後到行尾，都是單行註解。

- 斜線加星號可以包住很多行，結尾必須成對，否則後面的程式會被一起吃掉。

- 註解可以接在一行程式的後面。字串裡的兩條斜線只是文字，不是註解。

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
      // 單行註解：兩條斜線到行尾都不會執行
      console.log('第一行');

      /*
      多行註解：
      中間每一行都不會執行
      */
      // console.log('被註解掉的程式');

      console.log('第二行'); // 行尾註解
    </script>
  </body>
</html>
```

**解析**

- Console 只有兩行，因為被註解掉的 `console.log` 和多行註解裡的文字都不會執行。
- 行尾註解不影響前面那句程式，它仍然照常印出。
- 若多行註解少了結尾，後面的 `console.log` 也會被包進去，Console 就只剩第一行。

```text
第一行
第二行
```

{% note info %}
**註解寫原因**
「印出第一行」這種註解只是重複程式。比較有用的是說明為什麼這樣寫，例如「這筆先不印，因為值還沒決定」。
{% endnote %}

### 外部 script 檔

內嵌的程式只能給單頁使用。實務上把程式放進獨立的 `.js` 檔，HTML 用 script 的 src 屬性指到它，同一份程式就能掛到多個頁面，HTML 也不會被程式碼撐得很長。

#### 載入與執行順序

瀏覽器讀到帶有 src 的 script，會先載入檔案再執行，寫在它後面的 HTML 要等它跑完才繼續處理。多支外部檔也依照它們在頁面裡的位置，由上往下各跑一次。

{% mermaid graph LR %}
html["HTML 載入 script"] --> run["瀏覽器由上往下執行"]
run --> log["console.log 印出值"]
log --> panel["DevTools 的 Console"]
{% endmermaid %}

本篇的 demo 都把 script 放在 body 最後，頁面內容先被讀到，程式再執行，載入檔案時才不會擋住頁面顯示。

#### src 的相對路徑

src 寫的是外部檔的位置，路徑寫錯，這支程式就完全不會執行。

**觀念**

- 路徑相對於這份 HTML 所在的資料夾。檔案在同一個資料夾，直接寫檔名即可。

- 檔案在子資料夾，路徑要帶資料夾名稱；檔案在上一層，路徑以 `../` 開頭。

- 路徑以斜線開頭，是從網站根目錄算起。開發時的根目錄和部署後的根目錄可能不同，所以本課一律用相對路徑。

```text
src="03b-js-console.js"      同一個資料夾
src="js/03b-js-console.js"   子資料夾 js 裡
src="../03b-js-console.js"   上一層資料夾
src="/03b-js-console.js"     網站根目錄
```

```html 04-js/pages/03b-js-console.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>外部 script 檔</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script src="03b-js-console.js"></script>
  </body>
</html>
```

```js 04-js/pages/03b-js-console.js
console.log('外部檔已載入');
```

**解析**

- HTML 和 js 放在同一個資料夾，src 只寫檔名，瀏覽器就能載入。Console 顯示「外部檔已載入」，表示外部檔跑成功。
- 把 src 改成 `js/03b-js-console.js`，這個資料夾底下沒有 js 子資料夾，檔案找不到。用 Live Server 開啟時 Console 會出現 404，直接開檔案時多半是 `ERR_FILE_NOT_FOUND`。
- 兩種訊息都代表檔案沒載到，外部檔裡的程式完全沒執行。

```text
外部檔已載入
```

### 選讀：alert、confirm 與 prompt

這三個是瀏覽器內建的函式，會跳出必須先處理的視窗。程式本來就一行一行往下跑，碰到彈窗就停住，等視窗關掉才繼續，這種等待叫做同步阻斷。

**觀念**

- `alert` 只顯示訊息，沒有可用的回傳值（函式執行完交回來的結果）。

- `confirm` 讓人選確定或取消，回傳 `true` 或 `false`。

- `prompt` 讓人輸入文字，回傳輸入的字串；按取消得到 `null`。

- 實務上很少用：彈窗會卡住整個分頁，樣式也不能改成網站自己的風格。除錯請改看 Console。

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

- 重新整理後跳出 alert，這時 Console 只有「alert 之前」。視窗開著時頁面不能點，後面的 log 也不會出現。
- 按掉 alert 後，Console 印出 `undefined`，那是 alert 的回傳值；接著才印「alert 之後」與「confirm 之前」，然後跳出 confirm。
- confirm 按確定印出 `true`，按取消印出 `false`。
- prompt 輸入文字再按確定，印出那個字串；按取消印出 `null`；沒輸入就按確定，印出空字串，和取消不同。

以下輸出是 confirm 按確定、prompt 輸入「小明」再按確定的結果。

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
# 變數與資料型別

變數是替值取的名字，程式可以先把值記在名字上，之後要印出或計算，只要寫名字就好。這一章先學怎麼宣告變數、分辨 `const` 與 `let`、了解名字有效的範圍，再認識值的種類（資料型別）、不同種類之間的轉換，以及三種容易混淆的特殊值。字串的寫法與方法留到下一章。

## 變數與常數

宣告變數就是替一個值取名字。這一節依序說明宣告與命名的規則、`const` 與 `let` 該怎麼選，以及名字有效的範圍。

### 宣告變數與命名

宣告時先寫關鍵字（`const` 或 `let`），接著是名字、等號與值。名字決定別人讀程式時能不能看懂這個值是什麼，所以要遵守硬性規則，也要照慣例命名。

**觀念**

- 宣告的寫法是 `const price = 12800;`，字串要加引號，數字不加。`const` 的用法下一小節說明。
- 名字不能以數字開頭，也不能使用保留字（語法自己要用的詞，例如 `return`、`if`）。
- 名字會區分大小寫，`userName` 與 `UserName` 是兩個互不相干的名字。
- 違反硬性規則時，瀏覽器在開始執行前就報 SyntaxError（語法錯誤，看不懂這行寫法），整份 script 都不會執行，連前面的 `console.log` 也不會出現。
- 名字要看得出用途：`price` 一看就知道是價格，`x`、`temp`、`data1` 看不出來，要換成有意義的名字。

名字由多個英文單字組成時不能有空白，業界依用途有固定的大小寫慣例。這些不是語法規定，但照著寫，別人一看就知道名字是哪一類東西：

```js
// 小駝峰 camelCase：第一個單字小寫，其餘單字首字母大寫
// 一般變數與函式都用這種，本課程照這個寫
const userName = 'Amy';
const pricePerPerson = 12800;

// 大駝峰 PascalCase：每個單字首字母都大寫
// 習慣保留給 class 與 React 元件（之後的章節才會學到）
const UserCard = '習慣上不拿來當一般變數';

// 全大寫 UPPER_SNAKE_CASE：單字之間用底線連接
// 習慣用在整個程式都固定不變的設定值
const MAX_PEOPLE = 12;
```

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
      const userName = 'Amy';
      const UserName = 'Bob';
      const pricePerPerson = 12800;
      const days3 = 3;
      const returnDate = '2026-12-24';

      console.log(userName, UserName);
      console.log(pricePerPerson);
      console.log(days3, returnDate);

      // 下面兩行都會 SyntaxError，所以維持註解
      // const 3days = 3;
      // const return = 'x';
    </script>
  </body>
</html>
```

**解析**

- 第一行同時印出兩個名字的值。`userName` 與 `UserName` 只差一個字母的大小寫，卻各自保存自己的值，不會互相覆蓋，也不會報錯。
- 名字中間或結尾可以有數字，所以 `days3` 合法；保留字也只是不能單獨當名字，包含在較長的名字裡（例如 `returnDate`）沒有問題。
- 最後兩行是故意寫錯的命名：第一行以數字開頭，第二行用了保留字。若拿掉註解，整份 script 會因 SyntaxError 一行都不執行，上面的三行 `console.log` 也看不到。

```text
Amy Bob
12800
3 2026-12-24
```

### let 與 const 的差別

兩個關鍵字都能宣告變數，差別在於宣告之後，名字能不能再指到別的值。現代寫法預設用 `const`，只有確定這個名字之後要換成新值時才改用 `let`，讀程式的人看到 `const` 就知道它不會變。

**觀念**

- `const` 宣告之後不能再賦值（用等號放進新值），再寫一次等號會得到 TypeError（型別錯誤），原本的值留著。
- `let` 宣告之後可以用等號換成新值。
- 先寫 `const`，寫到後來真的需要換值，再改成 `let`。
- 同一個名字在同一層不能宣告兩次，否則是 SyntaxError。
- 每個名字都要先宣告再用。沒有宣告就直接賦值不會報錯，卻會產生整個程式都能改到的名字，容易出錯。

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
      const productName = '無線滑鼠';
      const taxRate = 0.05;
      let price = 12800;

      price = 13900;

      console.log(productName);
      console.log(taxRate);
      console.log(price);

      // 下面這行會 TypeError，所以維持註解
      // taxRate = 0.1;
    </script>
  </body>
</html>
```

**解析**

- 三行依序印出字串、固定的稅率 0.05，以及換值之後的價格 13900。
- `price` 用 `let` 宣告，所以能從 12800 換成 13900；`productName` 與 `taxRate` 整段程式都不會變，所以用 `const`。
- 最後一行若拿掉註解，Console 會出現 TypeError，錯誤發生的那一刻才停下來，前面三行已經印完。

```text
無線滑鼠
0.05
13900
```

{% note info %}
**const 鎖住的是名字與值的對應**
數字、字串、布林放進 const 之後就不能換成別的值。陣列與物件是容器，變數裡存的是指向容器的參考，容器裡面的內容能不能改，陣列那一章會一併說明。
{% endnote %}

### 區塊作用域

一對大括號形成一個區塊，區塊裡用 `let` 或 `const` 宣告的名字，只在這一對大括號裡有效，這個有效範圍叫作用域。範圍分得清楚，同樣的名字才能在不同區塊各自使用而不互相干擾。

**觀念**

- 內層可以再宣告一個和外層同名的名字，兩者各自保存自己的值。
- 內層沒有自己宣告時，會往外層找同名的名字。
- 內層的名字在右大括號之後就不存在，要讀它會得到 ReferenceError（找不到這個名字）。

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
      const country = '台灣';

      {
        const place = '花蓮';
        const days = 3;
        console.log(place);
        console.log(days);
        console.log(country);
      }

      console.log(place);

      // 下面這行會 ReferenceError，所以維持註解
      // console.log(days);
    </script>
  </body>
</html>
```

**解析**

- 前兩行是大括號裡面的值：內層的「花蓮」與數字 3。第三行的 `country` 內層沒有宣告，所以往外層找到「台灣」。
- 離開大括號後再印 `place`，回到外層的「台北」，可見內層同名的宣告沒有蓋掉外層。
- 最後一行若拿掉註解，Console 會說 days 沒有定義，因為它只存在於那一對大括號裡。

```text
花蓮
3
台灣
台北
```

{% note warning %}
**不要省略宣告**
若內層寫成 `place = '花蓮'` 而沒有關鍵字，那不是新名字，而是在改外層的 place。外層是 const 時會 TypeError，外層是 let 時則悄悄把外層的值換掉。要一個獨立的內層名字，一定要寫宣告。
{% endnote %}

{% note info %}
**var 已淘汰**
`var` 是 ES6（2015）之前宣告變數的唯一寫法，現代程式碼已不再使用。它不認區塊，只認函式範圍（之後學函式時會看到），所以大括號擋不住；同一個名字也能重複宣告而不報錯，容易不小心蓋掉原本的值。讀到舊程式碼遇到 `var` 時，把它當成較鬆散的 `let` 來看即可。

```js
{
  var place = '台北';
  let spot = '花蓮';
}
console.log(place); // 台北，大括號擋不住 var
// console.log(spot); // let 出了大括號就找不到

var days = 3;
var days = 5; // 可重複宣告，5 蓋掉 3
```
{% endnote %}

## 資料型別與轉型

每個值都有自己的種類，文字是字串、計算用的是數字、成立與否是布林。種類不同，運算規則就不同，連看起來一樣的 3 與 '3' 行為都不同。這一節先認識資料型別，接著學習在種類之間明確轉換，最後分清三種「沒有值」或「無效值」。

### 資料型別

宣告變數時不必先寫種類，值放進去的那一刻種類就決定了。一個名字固定放同一種用途的值，讀程式的人才不會誤判。這一小節先認識最常用的三種：數字、字串與布林，並用 `typeof` 查詢種類。

**觀念**

- 數字不加引號，整數與小數都是數字。
- 字串用引號包住，引號裡的數字仍然是文字。本課程統一使用單引號。
- 布林只有 `true` 與 `false` 兩個值，代表成立或不成立。
- `typeof` 後面空一格接上值，結果是種類名稱的字串，不是值本身。

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

      // 引號決定種類：同樣是 3，有沒有引號種類就不同
      console.log(typeof '3');
    </script>
  </body>
</html>
```

**解析**

- 前四行是種類名稱，依序為字串、數字、數字、布林。整數與小數都是 number。
- 最後一行的 `'3'` 有引號，所以種類是 string。畫面上長得和數字 3 一樣，但相加與比較的規則不同，下一小節會看到後果。

```text
string
number
number
boolean
string
```

{% note warning %}
**typeof 對陣列與 null 的結果**
陣列拿去 typeof 得到的是 object，要確認一個值是不是陣列，改用 `Array.isArray`，陣列那一章會說明。`typeof null` 也是 object，這是早期留下來的結果，null 的判斷方式見後面的小節。
{% endnote %}

### 型別轉換

不同種類的值碰在一起時，JavaScript 有時會自己轉換，結果常常出乎意料，所以需要轉換時要自己明確地寫。這一小節看三個內建的轉換函式、字串接數字時的陷阱，以及從字串取出數字的兩種做法。

**觀念**

- `Number` 把值轉成數字，整段都是合法數字才成功，否則得到 NaN（不是有效數字的結果，下一小節說明）。
- `String` 把值轉成字串。
- `Boolean` 判斷值算真還是算假，空字串、0 與 NaN 是假，其餘的字串與數字是真。
- 字串碰到加號會把旁邊的值接成文字，所以 `'5' + 1` 是 `'51'`，不是 6。
- `parseInt` 從左邊開始讀，遇到第一個不是數字的字元就停，因此 `'12px'` 得到 12；第二個參數寫 10 表示用十進位讀。

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
      // Number 與 String：互相轉換，並用 typeof 確認種類
      console.log(Number('3'), typeof Number('3'));
      console.log(String(12800), typeof String(12800));

      // Number 要求整段都是數字：「3天」是 NaN，空字串是 0
      console.log(Number('3天'), Number(''));

      // Boolean：0 與空字串是 false，文字 '0' 是 true
      console.log(Boolean(0), Boolean(''), Boolean('0'));

      // 加號會把數字接成文字；先轉成數字再加才是 6
      console.log('5' + 1);
      console.log(Number('5') + 1);

      // parseInt 從左邊讀到不是數字就停；Number 則整段都要合法
      console.log(Number('12px'), parseInt('12px', 10));
      console.log(Number('3.8'), parseInt('3.8', 10));
    </script>
  </body>
</html>
```

**解析**

- 前兩行是明確轉換的結果：字串 '3' 變成種類為 number 的 3，數字 12800 變成種類為 string 的 '12800'。
- 第三行的「3天」含有非數字，所以 Number 得到 NaN；空字串什麼都沒有，得到 0。
- 第四行說明三種真假：0 與空字串是 false，文字 '0' 因為不是空的，所以是 true。
- `'5' + 1` 得到字串 51；先用 Number 轉成數字，才會得到 6。
- 最後兩行比較讀法：'12px' 對 Number 是 NaN，對 parseInt 是 12；'3.8' 對 Number 是 3.8，對 parseInt 只取整數部分得到 3。

```text
3 number
12800 string
NaN 0
false false true
51
6
NaN 12
3.8 3
```

{% note info %}
**判斷 NaN 要用 Number.isNaN**
`Number.isNaN` 只有在值本身就是 NaN 時才是 true。全域的 isNaN 會先把值轉成數字，字串 '三' 也會被判成 true，容易誤判，所以不使用。
{% endnote %}

### null、undefined 與 NaN

這三個值都代表「沒有一個可用的值」，但原因不同：有的是還沒給值，有的是刻意留空，有的是運算失敗。分清楚原因，才知道看到它們時該怎麼處理。

**觀念**

- `undefined`：名字已宣告但還沒給值，系統自己放上的預設結果。
- `null`：程式刻意設定的「沒有值」，要表示空位時自己賦值，不要拿空字串代替。
- `NaN`：數學運算或轉成數字失敗的結果，種類仍是 number。
- 判斷 null 用嚴格相等 `=== null`，不要用 `typeof`。嚴格相等是比較兩邊是否完全相同，運算子那一章會詳細說明。
- NaN 與包括自己在內的任何值都不嚴格相等，要判斷它必須用 `Number.isNaN()`。

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

      // 宣告了但還沒給值，讀到 undefined
      console.log(guide);

      // null 是刻意設的空位，用 === null 判斷
      console.log(backup);
      console.log(backup === null);
      // typeof null 是 object，這是早期留下的結果，不能拿來判斷
      console.log(typeof backup);

      // 轉成數字失敗得到 NaN，種類仍是 number
      console.log(broken);
      console.log(typeof broken);

      // NaN 不等於自己，要用 Number.isNaN 判斷
      console.log(broken === broken);
      console.log(Number.isNaN(broken));
    </script>
  </body>
</html>
```

**解析**

- `guide` 沒有放值，印出 undefined。
- `backup` 是刻意設定的 null，用嚴格相等判斷得到 true；`typeof backup` 卻回報 object，所以不能靠 typeof 判斷 null。
- `broken` 是轉換失敗的 NaN，種類仍是 number，這代表它是「無效的數字」，不是別的種類。
- NaN 與自己比較得到 false，所以要用 `Number.isNaN` 才能得到 true。

```text
undefined
null
true
object
NaN
number
false
true
```

{% note info %}
**空字串不是 null**
空字串是長度為 0 的字串，仍是一個有值的字串。要表示「沒有值」就用 null，兩者不要混用。
{% endnote %}

# 字串

字串是一排有順序的字元，用來表示名稱、句子這類文字。這一章先學怎麼寫出字串、讀取其中一個字元，以及用模板字串把變數嵌進句子，再認識字串方法共用的原型，最後依用途學會查詢、裁切、轉換這幾類最常用的方法。

## 字串基礎

這一節處理字串的寫法與基本讀取，並學會模板字串。每一個字串方法都建立在這些基礎上。

### 建立與存取

字串可以用單引號、雙引號或反引號包起來，三種寫法得到的都是字串。包起來之後，可以用 `length` 知道有幾個字元，也可以用從 0 開始的索引（字元的位置編號）讀出其中一個字元。

**觀念**

- 本課程的字串預設用單引號；內容本身含有單引號時，整段改用雙引號包住。
- 反引號是第三種包法，主要用途是下一小節的模板字串。
- `length` 是屬性，讀到的是字元數，後面不加括號。
- 索引從 0 開始，第一個字元是索引 0，最後一個字元是 `length - 1`。
- 字串不可變（immutable）：方法只會交回一個新字串，原來的字串維持不變。

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

      // 三種包法都是字串，雙引號裡的單引號照樣印出
      console.log(single);
      console.log(double);
      console.log(plain);

      // length 是字元數 6；索引 0 是「台」，索引 2 是「城」
      console.log(title.length);
      console.log(title[0]);
      console.log(title[2]);

      // toUpperCase 把英文轉成大寫，交回新字串；原字串維持小寫
      const upper = 'taipei'.toUpperCase();
      console.log(upper);
      console.log('taipei');
    </script>
  </body>
</html>
```

**解析**

- 三種包法印出的都是字串本身，雙引號那一行保留了內容裡的單引號。
- 長度是 6，索引 0 是「台」，索引 2 是「城」。
- 大寫結果是新字串 TAIPEI；最後一行仍是小寫，證明方法沒有改動原來的字串。

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

{% note warning %}
**不能改掉索引上的字元**
字串沒有「改掉某個字元」的寫法，`title[0] = '高'` 不會報錯，也不會生效（嚴格模式下才會是 TypeError）。想得到不同的文字，就用方法產生新字串，並用 `const` 接住。
{% endnote %}

### 模板字串

模板字串用反引號包住整個句子，句子裡用 `${}` 嵌入變數或運算結果。前面學過字串加數字會接成文字，但要接很多段時寫法冗長；模板字串讓句子保持原樣，只在需要的位置放入值，之後組合畫面文字時會大量使用。

**觀念**

- 嵌入的語法是 `$` 接一對大括號，大括號裡可以放變數，也可以放運算。
- 反引號內可以直接換行，換行會保留在字串裡。
- `$` 單獨出現時只是普通字元，後面緊接大括號才是嵌入。
- 要印出字面的 `${`，在 `$` 前面加反斜線跳脫，變成 `\${`。

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
      const title = '台北城市漫遊';
      const place = '台北';
      const days = 3;
      const price = 12800;

      const line = `${place}・${title}・${days} 天・NT$${price}`;
      console.log(line);

      // 大括號裡可以放運算
      console.log(`總價 NT$${price * days}`);

      // 反引號可以直接換行
      const note = `第一行
第二行`;
      console.log(note);

      // 要印出字面的 ${}，在 $ 前面加反斜線
      console.log(`\${price} 會被當成文字`);
    </script>
  </body>
</html>
```

**解析**

- 第一個結果是由四個變數組成的一整句字串，不是四次輸出。`NT$` 的 `$` 是普通字元，緊接著的 `${price}` 才是嵌入。
- 第二個結果在大括號裡先算出 12800 乘以 3，再嵌入句子。
- 第三個結果分成兩行印出，因為反引號內的換行也是字串的一部分。
- 第四個結果印出字面的 `${price}`，因為前面的反斜線讓它不再是嵌入。

```text
台北・台北城市漫遊・3 天・NT$12800
總價 NT$38400
第一行
第二行
${price} 會被當成文字
```

## 字串原型與方法

字串的方法不是複製在每個字串上，而是放在所有字串共用的原型。這一節先說明這個機制，之後陣列、物件看到的方法，運作方式都和這裡一樣；接著依用途學習最常用的字串方法。

### 原型

每一種型別都有一份共用的內建原型，可以想成該型別專用的工具書，裡面放著它能用的方法。對字串寫上點號呼叫方法時，JavaScript 會到字串原型這本工具書裡找出那支函式來執行；數字有自己的另一本，兩邊互不相通。

**觀念**

- 字串的原型是 `String.prototype`，數字的原型是 `Number.prototype`。
- 同型別的所有值共用原型上的同一支函式。方法名稱後面要加括號才會執行，`length` 這種屬性則直接讀值。
- null 與 undefined 沒有原型，對它們寫點號呼叫方法會丟出 TypeError。

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

      // 得到 ABC，word 仍是 abc；這支函式就是字串原型上的那一支
      console.log(word.toUpperCase());
      console.log(word);
      console.log(word.toUpperCase === String.prototype.toUpperCase);
      // length 是屬性，讀到 3，不用括號
      console.log(word.length);

      const amount = 42;
      // toFixed(0) 印出 42，回傳的是字串，而且等於數字原型上的函式
      console.log(amount.toFixed(0));
      console.log(amount.toFixed === Number.prototype.toFixed);

      // null 沒有原型，拿掉下一行註解會丟出 TypeError
      const missing = null;
      // console.log(missing.toUpperCase());

      // 在 Console 展開這一行，對照字串原型上的方法名稱
      console.log(String.prototype);
    </script>
  </body>
</html>
```

**解析**

- 第一組結果是 ABC、abc、true：轉大寫得到新字串，word 沒變，而且 word 用的函式就是字串原型上的那一支。
- 長度是 3，因為 `length` 是屬性，所以沒有括號。
- 數字 42 呼叫方法後印出文字 42，且用的是數字原型上的函式，證明兩種型別各有自己的原型。
- 對 null 呼叫方法的那一行維持註解；拿掉註解會丟出 TypeError，並中斷後面的程式。
- 最後一行不在下方的輸出清單裡：在 Console 展開它，可以看到字串所有可用的方法名稱。

```text
ABC
abc
true
3
42
true
```

{% note info %}
**不確定有沒有值時**
null 與 undefined 沒有原型，直接呼叫方法會丟出 TypeError。值可能不存在時，可以改寫成 `?.`（可選串連）：左邊是這兩個值就停住，整段得到 undefined。物件那一章會正式教。
{% endnote %}

{% note info %}
**不必背完整方法清單**
字串方法很多，講義只挑常用的。需要查參數與回傳值時，看 MDN 的 [String](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String) 即可。
{% endnote %}

### 查詢與判斷

這一類方法用來問「某段文字在不在字串裡」，回傳布林值或索引，不會改動原字串。比對時區分大小寫，所以 `'A'` 與 `'a'` 視為不同。

**觀念**

- `includes`：有出現這段文字就回傳 true，否則 false。最常用，用來判斷關鍵字是否存在。
- `startsWith`：是否以這段文字開頭，回傳布林。
- `endsWith`：是否以這段文字結尾，回傳布林。
- `indexOf`：回傳第一次出現的索引，找不到時回傳 -1。

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
      // 「城市」從索引 2 開始；沒有「花蓮」得到 -1
      console.log(title.indexOf('城市'));
      console.log(title.indexOf('花蓮'));
      // 原字串沒有被改
      console.log(title);
    </script>
  </body>
</html>
```

**解析**

- 前六行是三個判斷方法各問一次，對得上是 true，對不上是 false。
- 「城市」的索引是 2，而找不到「花蓮」時得到 -1，這個值不是有效索引。
- 最後一行仍是原來的標題，查詢類方法都不會改寫字串。

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
**判斷是否存在，用 includes**
`indexOf` 找不到時是 -1，而索引 0 是第一個字元，兩者都會讓「直接拿回傳值當條件」的寫法判斷錯誤。只想知道有沒有，用回傳布林的 `includes` 最不容易出錯。
{% endnote %}

### 擷取與轉換

這一類方法從字串取出一段、清理內容、替換文字、補齊長度或拆成陣列。它們都交回新值，原來的字串不會被改掉，最後要用變數接住結果才能繼續使用。

**觀念**

- `trim`：去掉前後的空白，中間的空白保留，交回新字串。處理使用者輸入時先做這一步。
- `slice`：依索引裁出一段，格式是起點與終點，終點的字元不包含，只給起點時裁到結尾，交回新字串。
- `replace`：把第一處對上的文字換成新文字，交回新字串。
- `replaceAll`：把所有對上的文字都換掉，交回新字串。
- `split`：依分隔文字拆開，交回陣列。
- `padStart`：在左邊補字，直到長度達到指定值，交回新字串，常用來補零。

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

      // 去掉兩端空白：帶空白的長度是 10，去掉之後是 6
      console.log(title);
      console.log(rawTitle.length);
      console.log(title.length);

      // 結束索引不包含，前兩個字是「花蓮」；只給起點則裁到結尾
      console.log('花蓮山海三日'.slice(0, 2));
      console.log('花蓮山海三日'.slice(2));

      // replace 只換第一處，replaceAll 全部都換
      console.log('京都散步與散步'.replace('散步', '五日'));
      console.log('京都散步與散步'.replaceAll('散步', '五日'));

      // 依「・」拆成三個元素的陣列
      console.log('台北・花蓮・京都'.split('・'));

      // 補到長度 3，得到 007；code 仍是 7
      console.log(code.padStart(3, '0'));
      console.log(code);
    </script>
  </body>
</html>
```

**解析**

- `trim` 之後長度從 10 變成 6，但 rawTitle 仍是原來帶空白的字串，證明交回的是新字串。
- `slice(0, 2)` 取到索引 1 為止，所以是「花蓮」；`slice(2)` 從索引 2 一路裁到結尾。
- 兩種替換的差別看輸出就清楚：前者只換了第一個「散步」，後者兩個都換了。
- `split` 交回的是陣列，不是字串，所以 Console 印出的是中括號包起來的清單，前面的 (3) 是元素個數。
- 補零後得到 007，但 code 仍是 7；補出來的結果依然是字串，不是數字。

```text
台北城市漫遊
10
6
花蓮
山海三日
京都五日與散步
京都五日與五日
(3) ['台北', '花蓮', '京都']
007
7
```

{% note info %}
**先 trim 再比較**
使用者輸入的文字常常夾帶前後空白。先 `trim` 再用 `===` 比較，才不會因為多一個空格就對不上。
{% endnote %}

{% note info %}
**padStart 補零的結果是字串**
編號、時間這類固定寬度的文字用 `padStart` 補零；補完仍是字串，要拿去做數學運算前必須先轉成數字。
{% endnote %}

### 選讀：at 與大小寫轉換

專案較少用到這兩類方法，但日常讀程式碼會遇到：`at` 可以用負數索引從結尾往回取字元，大小寫轉換則常用在不分大小寫的比對。

**觀念**

- `at`：依索引取一個字元，負數從結尾倒數，超出範圍得到 undefined，程式不會中斷。
- `toUpperCase` 與 `toLowerCase`：把英文字母轉成大寫或小寫，中文字元保持原樣，交回新字串。

```html 04-js/pages/15b-js-string-at.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>at 與大小寫轉換</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const city = 'taipei';

      // 0 是第一個字元，-1 是最後一個，索引 10 超出範圍
      console.log(city.at(0));
      console.log(city.at(-1));
      console.log(city.at(10));

      // 轉大小寫，city 本身不變
      console.log(city.toUpperCase());
      console.log('JS'.toLowerCase());
      console.log(city);
    </script>
  </body>
</html>
```

**解析**

- 索引 -1 取到最後一個字元，這是用中括號索引做不到的；超出範圍時得到 undefined 而不是錯誤。
- 大小寫轉換都交回新字串，最後一行的 city 仍是原本的小寫。

```text
t
i
undefined
TAIPEI
js
taipei
```

# 運算子與流程控制

程式要先算出新的值，再依結果決定接下來做什麼，有時還要把同一件事重複很多次。運算子負責把現有的值運算成新值，條件判斷依結果決定哪一段程式要執行，迴圈則讓同一段程式重複執行。這一章依序學這三件事。

## 運算子

運算子是連接值的符號，運算後會得到一個新的值。後面的條件判斷與迴圈，都建立在這些運算結果上。

**一覽**

- 算術與賦值：做出新的數字，或把運算結果放回變數。
- 比較：比大小、比相等，結果是 true 或 false。
- 邏輯：組合多個條件，也能在兩個值之間挑一個交出來。
- 空值合併：只在值「不存在」時才補上預設值。
- 條件運算子：依一個條件，在兩個值之間挑一個。

### 算術運算子與賦值運算子

算術運算子把數字做成新數字，賦值運算子則把運算後的結果放回變數裡。

**觀念**

- 加、減、乘、除與數學相同，先乘除後加減，要先算的部分用括號包起來。
- 除法的結果可能是小數，不會自動變成整數。
- 餘數 `%` 取的是除不盡剩下的數，常用來判斷奇偶。
- 次方 `**` 的左邊是底數，右邊是次方。
- 複合賦值 `+=` 的意思是「取出變數現在的值，運算後再放回同一個變數」，所以左邊必須是用 `let` 宣告的變數；`-=` 同理，是減掉後放回。

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
      let total = 90;
      const people = 4;
      const each = total / people;

      console.log(each);
      console.log(7 % 3);
      console.log(2 ** 3);

      total += 10;
      console.log(total);

      total -= 20;
      console.log(total);

      console.log(each);
    </script>
  </body>
</html>
```

**解析**

- 90 除以 4 得到 22.5，除法保留了小數。
- 7 除以 3 商 2 餘 1，所以餘數印出 1；2 的 3 次方是 8。
- `total` 先加 10 變成 100，再減 20 變成 80；每一次都是改掉變數本身。
- `each` 是在改動 `total` 之前算好的值，已經存進自己的變數，所以最後仍是 22.5。

```text
22.5
1
8
100
80
22.5
```

{% note warning %}
**小數不是精確的十進位**
JavaScript 的數字是二進位浮點數，`0.1 + 0.2` 的結果是 0.30000000000000004，不是剛好的 0.3，拿它與 0.3 比相等（下一節學）會得到 false。金額這類要精確的數字，改用最小單位的整數計算，不要拿兩個小數直接比相等。
{% endnote %}

### 比較運算子與嚴格相等

比較運算子拿兩個值互相比較，結果一定是布林值 true 或 false，後面的條件判斷就是靠這個結果來決定要走哪一條路。

**觀念**

- 大於、小於、大於等於、小於等於的寫法與數學相同，用來比數字的大小。
- `===` 與 `!==` 是嚴格比較，連型別都要相同；型別不同就直接視為不相等。
- `==` 與 `!=` 會先自動轉型再比，`'20'` 與 20 會被當成一樣，容易誤判，新程式不要使用。
- 字串也能比大小，但比的是字元編碼的順序，不是數字的大小。

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
      const age = 20;
      const ageText = '20';

      console.log(age === 20);
      console.log(age === ageText);
      console.log(age !== ageText);
      console.log(age == ageText); // 會轉型，不要用
      console.log(age >= 18);

      console.log('10' > '9');
      console.log(Number('10') > Number('9'));
    </script>
  </body>
</html>
```

**解析**

- 前三行是嚴格比較：數字 20 對數字 20 是 true；數字 20 對字串 `'20'` 型別不同，是 false；所以 `!==` 是 true。
- 第四行的兩個等號先把字串轉成數字，結果變成 true，這就是它容易誤判的地方。
- 20 大於等於 18，所以第五行是 true。
- 字串 `'10'` 與 `'9'` 比較時，先比第一個字元，`'1'` 的編碼比 `'9'` 小，所以是 false；先用 `Number` 轉成數字再比，才是數字意義上的 true。

```text
true
false
true
true
true
false
true
```

{% note danger %}
**比較前先讓兩邊型別一致**
表單與輸入框取得的值常是字串，要和數字比較時，先用 `Number` 轉成數字，再用 `===` 比。
{% endnote %}

{% note info %}
**選讀：Object.is**
`Object.is` 與嚴格相等幾乎相同，只多認得兩件事：NaN 與 NaN 視為相同，+0 與 -0 視為不同。日常比較仍然寫 `===`。
{% endnote %}

### 邏輯運算子

邏輯運算子用來把多個條件組合成一個條件，這一節先看兩邊都是布林值的情況。

**觀念**

- `&&`（而且）：兩邊都成立，結果才成立。
- `||`（或者）：任何一邊成立，結果就成立。
- `!`（不是）：把成立與不成立反過來。

```html 04-js/pages/18-js-logic.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>邏輯運算子</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const age = 20;
      const hasTicket = true;
      const isAdult = age >= 18;

      console.log(isAdult && hasTicket);
      console.log(isAdult && age > 60);
      console.log(age < 10 || hasTicket);
      console.log(age < 10 || age > 60);
      console.log(!isAdult);
    </script>
  </body>
</html>
```

**解析**

- 成年且有票，兩邊都成立，第一行是 true；成年但不到 60 歲，第二行是 false。
- 不到 10 歲不成立，但有票成立，只要一邊成立就行，第三行是 true；兩邊都不成立，第四行是 false。
- 最後一行把成年的 true 反過來，得到 false。

```text
true
false
true
false
false
```

{% note info %}
**用括號標出先後**
`!` 最先處理，`&&` 比 `||` 先處理。條件一多，用括號寫出先看哪一組，就不必背優先順序。
{% endnote %}

### 真值、假值與短路求值

`&&` 與 `||` 不只回傳 true 或 false，而是交出左右其中一邊的值；左邊的值足以決定結果時，右邊就不會被執行，這叫短路求值。要看懂它，得先知道哪些值在判斷時會被當成成立，哪些不會。

**觀念**

- 假值（falsy）是在條件判斷時視為不成立的值：false、數字 0、空字串、null、undefined、NaN，另有很少用到的 -0 與 BigInt 的 0n。
- 其餘的值都是真值（truthy），包括 true、非 0 的數字與有內容的字串（連 `'0'` 也是）。
- `&&` 的左邊是假值就交出左邊，右邊不執行；左邊是真值才交出右邊。
- `||` 的左邊是真值就交出左邊，右邊不執行；左邊是假值才交出右邊，常用來補預設值。
- `Boolean()` 能把任何值轉成 true 或 false，用來確認一個值算真值還是假值。

```html 04-js/pages/18b-js-short.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>真值、假值與短路求值</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      // 假值：全部都是 false
      console.log(Boolean(false));
      console.log(Boolean(0));
      console.log(Boolean(''));
      console.log(Boolean(null));
      console.log(Boolean(undefined));
      console.log(Boolean(NaN));

      // 真值：全部都是 true
      console.log(Boolean('0'));
      console.log(Boolean('hello'));
      console.log(Boolean(-1));

      // 短路求值：交出的是其中一邊的值
      const name = 'Amy';
      const empty = '';
      const count = 0;

      console.log(name && 100);
      console.log(count && 'has');
      console.log(name || '訪客');
      console.log(empty || '訪客');

      // 左邊成立才會執行右邊
      const isMember = true;
      const isGuest = false;
      isMember && console.log('顯示會員價');
      isGuest && console.log('不會印出');
    </script>
  </body>
</html>
```

**解析**

- 前六行的值全是假值，印出 false；接著三行有內容或非 0，印出 true，注意字串 `'0'` 是真值。
- 左邊 `name` 有內容，`&&` 交出右邊，所以是 100；左邊 `count` 是 0，`&&` 交出左邊，所以是 0。
- 左邊 `name` 有內容，`||` 直接交出它，仍是 Amy；左邊是空字串，`||` 改交出右邊，得到訪客。
- `isMember` 為 true，右邊才會執行，Console 多出一行；`isGuest` 為 false，右邊整個被跳過，所以沒有輸出。

```text
false
false
false
false
false
false
true
true
true
100
0
Amy
訪客
顯示會員價
```

{% note info %}
**用 && 當作簡寫只是示範**
範例把 `&&` 當成「成立才執行」，只是為了看清短路。實際要決定做不做某件事，用後面條件判斷一章的 if 更清楚。
{% endnote %}

### 空值合併運算子

用 `||` 補預設值有個副作用：0 與空字串也是假值，一樣會被換掉，但它們往往是有效的值。空值合併運算子 `??` 只在左邊是 null 或 undefined（也就是真正「沒有值」）時才改用右邊。

**觀念**

- `??` 只在左邊是 null 或 undefined 時交出右邊，0 與空字串會原樣保留。
- `||` 會把所有假值都換成右邊。
- 0 與空字串是有效的值時用 `??`；連 0 與空字串都要視為「沒有」時才用 `||`。

```html 04-js/pages/19-js-nullish.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>空值合併運算子</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const count = 0;
      const missing = null;
      const text = '';

      console.log(count || 10); // 0 是假值，被換掉
      console.log(count ?? 10); // 0 保留
      console.log(missing ?? 10); // null 才改用右邊

      console.log(text || '尚無備註'); // 空字串被換掉
      console.log((text ?? '尚無備註').length); // 空字串保留，長度是 0
    </script>
  </body>
</html>
```

**解析**

- 同樣是 0，`||` 把它換成 10，`??` 則保留 0。
- 左邊是 null，`??` 沒有值可用，改用右邊的 10。
- 空字串用 `||` 會換成「尚無備註」；用 `??` 則保留空字串，印出它的長度 0。

```text
10
0
10
尚無備註
0
```

{% note warning %}
**?? 不能與 || 或 && 直接混用**
在同一個式子裡，`??` 與 `||`、`&&` 要用括號隔開，寫成 `a || b ?? c` 會直接產生語法錯誤。
{% endnote %}

### 條件運算子

條件運算子依一個條件，在兩個值之間挑一個，整段式子本身就是一個值，適合「只差一個值」的簡單選擇。

**觀念**

- 寫法是 `條件 ? 成立的值 : 不成立的值`，條件成立取問號後面、冒號前面的值。
- 整段是一個值，可以直接放進 `const` 或當成引數。
- 一行裡不要再套另一層問號；分支超過兩個時，改用後面條件判斷一章的 if。

```html 04-js/pages/19b-js-ternary.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>條件運算子</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const score = 75;
      const result = score >= 60 ? '及格' : '不及格';
      console.log(result);

      const isMember = false;
      const price = isMember ? 80 : 100;
      console.log(price);
    </script>
  </body>
</html>
```

**解析**

- 75 大於等於 60，條件成立，取冒號左邊的「及格」。
- `isMember` 是 false，條件不成立，取冒號右邊的 100。

```text
及格
100
```

## 條件判斷

條件判斷讓程式依條件決定要執行哪一段。結果有兩種以上、或每種結果要做的事不只一行時，條件運算子就不夠用，改用 if 這組寫法；同一個值要對照多個固定選項時，用 switch 會更好讀。

### if、else if、else

if 的括號裡放條件，成立就執行緊接的大括號，然後整段結束；都不成立才執行 else。else if 可以接很多段，由上往下找第一個成立的，順序就是優先順序。

**觀念**

- 括號裡的條件不是布林時，會依真值、假值判斷。
- 條件後面不要加分號，否則大括號會被當成另一段永遠會執行的程式。
- 只做一件事時大括號可以省略，但課堂一律加上，避免之後多加一行時綁錯。
- else 不是必須的，沒有它時，不成立就什麼都不做。

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
      const score = 75;
      let grade;

      if (score >= 90) {
        grade = 'A';
      } else if (score >= 80) {
        grade = 'B';
      } else if (score >= 60) {
        grade = 'C';
      } else {
        grade = 'F';
      }

      console.log(grade);

      if (score >= 60) {
        console.log('通過');
      }
    </script>
  </body>
</html>
```

**解析**

- 75 沒有達到 90，也沒有達到 80，前兩段都跳過；它達到 60，所以是 C，後面的 else 不會再執行。
- 若把分數改成 95，第一段就成立，直接得到 A，後面的條件都不看。
- 因為每條路會放進不同的字，`grade` 要用 `let`。
- 最後一個 if 沒有 else，75 達到 60 所以印出「通過」；分數不到 60 時，這段什麼都不會發生。

```text
C
通過
```

{% note info %}
**門檻要由嚴到寬排**
若先寫 `score >= 60`，90 分也會在這裡成立，後面的 A 與 B 永遠走不到。條件有包含關係時，先寫最嚴格的，再依序放寬。
{% endnote %}

{% note info %}
**條件先取成名字**
括號裡的比較一長，先把結果放進看得出意思的布林變數，if 只看那個名字。

```js
const isMiddle = score >= 60 && score < 80;

if (isMiddle) {
  grade = 'C';
}
```
{% endnote %}

### switch 與 case

switch 拿一個值，依序和每個 case 比對，對上就執行該段。適合同一個值對照多個固定選項，不適合範圍判斷。

**觀念**

- switch 括號裡放要比對的值，case 後面放比對的值，比對用嚴格相等。
- 每一段結尾要寫 break 離開 switch；沒寫會繼續往下執行下一段。
- default 接住所有沒對上的值，放在最後。

```html 04-js/pages/21-js-switch.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>switch 與 case</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const light = 'green';
      let action;

      switch (light) {
        case 'red':
          action = '停';
          break;
        case 'yellow':
          action = '注意';
          break;
        case 'green':
          action = '行';
          break;
        default:
          action = '號誌異常';
      }

      console.log(action);
    </script>
  </body>
</html>
```

**解析**

- `light` 是 green，對上第三個 case，`action` 設成「行」，break 讓程式離開 switch，不會再碰到 default。
- 若把 green 那一段的 break 拿掉，會繼續往下執行 default，`action` 被蓋成「號誌異常」。

```text
行
```

{% note warning %}
**case 後面不能寫範圍**
`case score >= 60` 比對的是「switch 的值是否嚴格等於 true 或 false」，不是在判斷範圍，所以結果不是想要的。範圍交給 if，固定的字串或編號才用 switch。
{% endnote %}

### switch 合併 case

break 的用途是「這段做完就離開」。反過來利用，把幾個 case 疊在一起、中間不寫程式也不寫 break，對上其中任何一個，都會往下掉到同一段程式，這個現象叫 fall-through。它的效果等於「這幾個值任何一個成立」。

**觀念**

- 疊在一起的 case 共用最後一個 case 底下的程式，只有那一段需要 break。
- 中間空著的 case 是常見寫法，大家看得懂；但若某段 case 有寫程式卻故意不寫 break，要加一行註解說明是刻意的，否則別人會以為是漏寫。

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

- `day` 是「週六」，對上第一個 case，但那一行沒有程式也沒有 break，於是往下掉到「週日」，再往下執行 `ticket = '假日票'`，遇到 break 才離開。
- 換成「週日」也會跑到同一段；週一到週五同理，五個值共用「平日票」那一段。
- 同樣的判斷用 if 要寫成 `day === '週六' || day === '週日'`，選項一多，疊 case 的寫法比較好讀。

```text
假日票
```

## 迴圈

迴圈讓同一段程式重複執行，不必把相同的程式碼抄很多遍。迴圈每執行一圈就檢查條件，成立就再跑一圈，直到條件不成立為止；所以一定要讓條件有一天會變成 false，否則分頁會卡死，這種情況叫無限迴圈。這一節主線學 for 迴圈；選讀的有 while、break 與 continue，以及 do...while 與巢狀迴圈。

### for 迴圈

for 適合已經知道要重複幾次的情況。括號裡分成三段，由分號隔開：計數器（記錄目前第幾圈的變數）從多少開始、什麼條件下繼續、每圈結束後計數器怎麼改。大括號裡是每一圈要做的事。

**觀念**

- 計數器用 `let` 宣告，因為每一圈都要換成下一個數字。
- 中間的條件是「還可以進下一圈」，不是「最後一圈的號碼」。
- 第三段的 `n += 1` 若忘了寫，條件永遠成立，迴圈就停不下來。
- 計數器宣告在括號裡，迴圈結束後，外面就不能再使用這個名字。

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
      let total = 0;

      for (let n = 1; n <= 5; n += 1) {
        total += n;
        console.log(n, total);
      }
    </script>
  </body>
</html>
```

**解析**

- `n` 從 1 開始，只要還小於等於 5 就執行大括號，結束後加 1，所以一共執行 5 圈。
- 每一圈把 `n` 加進 `total`，印出目前的 `n` 與累計的合計：1、3、6、10、15。
- 若條件改成小於 5，最後一圈會被排除，只會印到 4。

```text
1 1
2 3
3 6
4 10
5 15
```

{% note info %}
**常見簡寫 n++**
`n++` 等於 `n += 1`，很多程式碼會這樣寫。本課程為了讓寫法一致，統一寫 `+= 1`。
{% endnote %}

{% note info %}
**走訪陣列改用 for...of**
for 用來數已知的次數。要讀陣列裡的每一個值，到陣列那一章會學 for...of。for...in 走的是鍵（屬性名稱），陣列的鍵是 `'0'`、`'1'` 這樣的字串，不要用它來取陣列的值；物件的鍵留到物件那一章。
{% endnote %}

### 選讀：while、break 與 continue

while 只寫繼續的條件，計數器要自己在大括號裡改。不知道會重複幾圈、只知道做到某個狀況為止，就用 while。另外兩個關鍵字可以在迴圈裡控制流程。

**觀念**

- 條件用到的變數要在迴圈外先準備好，並在迴圈裡往結束的方向改，否則不會停。
- `continue` 跳過這一圈剩下的程式，直接進下一圈。
- `break` 立刻結束整個迴圈。
- 兩者都只影響包住它們的那一層迴圈。

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
      let count = 3;

      while (count > 0) {
        console.log(count);
        count -= 1;
      }

      console.log('結束');

      for (let n = 1; n <= 5; n += 1) {
        if (n === 2) {
          continue;
        }
        if (n === 4) {
          break;
        }
        console.log(n);
      }
    </script>
  </body>
</html>
```

**解析**

- while 印出 3、2、1，減到 0 時條件不成立，離開迴圈後印出「結束」。
- 下面的 for 在 `n` 是 2 時遇到 continue，這一圈剩下的程式被跳過，所以沒有印 2。
- `n` 是 4 時遇到 break，整個迴圈結束，4 與 5 都不會印，留下的是 1 與 3。

```text
3
2
1
結束
1
3
```

{% note info %}
**break 不是錯誤**
它是你規定的提早結束。例如找到第一筆符合的就可以停，不必把後面的圈數也跑完。
{% endnote %}

### 選讀：do...while

do...while 把條件放在大括號後面，先執行一圈才檢查。條件成立就再跑一圈，不成立就離開。

**觀念**

- 條件寫在大括號後面的括號裡，整段以分號結束。
- 進入前不檢查，所以至少執行一次。
- 計數器同樣要在迴圈裡往結束的方向改。

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

- 「while 先檢查」印出後，`count` 是 0，大於 0 不成立，大括號一次都沒進去，所以沒有數字。
- 「do 先執行」印出後，先把 `tries` 加成 1 並印出，然後才檢查；1 不小於 1，於是離開。
- 兩段在第一次檢查時條件都不成立，差別只在檢查的時機：while 先檢查，執行 0 次；do...while 後檢查，執行 1 次。

```text
while 先檢查
do 先執行
1
```

### 選讀：巢狀迴圈

一個迴圈的大括號裡可以再放另一個迴圈。外圈每走一步，內圈就從自己的起點跑完一整輪，總次數是兩層次數相乘。

**觀念**

- 外圈的計數器要等內圈整輪結束，才會加 1。
- 內圈每一輪都從頭開始，不會接著上一輪最後的數字。
- 兩層要用不同的名字，例如外層 `row`、內層 `col`，內層才不會改到外層的數字。

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
          console.log(row + '×' + col + '=' + row * col);
        }
      }
    </script>
  </body>
</html>
```

**解析**

- `row` 先停在 1，內圈的 `col` 從 1 走到 3，印出三行；內圈結束後，外圈才變成 2，內圈再從 1 重新走到 3。
- 外圈 2 次、每次內圈 3 次，相乘是 6，所以一共六行。

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
兩層已經足夠看清誰先跑完。再多一層時，先把最裡面的迴圈收成函式，用名字呼叫它，而不是在迴圈裡再套一層。
{% endnote %}

# 函式

函式是把一段程式包起來並取一個名字，需要時呼叫這個名字，裡面的程式才會執行，也就能重複使用而不必重寫。這一章先學怎麼宣告與呼叫，再學把值交給函式、從函式拿回結果、不合理的輸入先擋下來，以及參數沒傳時怎麼補預設值，最後學不定數量的引數。接著把函式本身當成一個值：放進變數、寫成箭頭函式，或交給另一支函式使用。選讀的部分是函式怎麼記住外面的變數。

## 函式宣告與呼叫

這一節從最基本的寫法開始：先宣告函式並呼叫它，再學參數與引數如何把值交進去、return 如何把結果交出來。之後處理輸入不合理時的提早離開、參數沒傳時的預設值，以及一次收下不定數量的引數。

### 宣告與呼叫

函式用 `function` 關鍵字宣告，後面接函式名稱，大括號裡放這支函式要做的事。這一小節的小括號先留空。

**觀念**

- 宣告不會執行。檔案讀到函式宣告時，只是把大括號裡的程式記起來。
- 呼叫才會執行：寫出函式名稱，再加一對小括號。
- 同一支函式可以重複呼叫，每呼叫一次就再執行一次。

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

- 檔案先讀到 sayHello 的宣告，這時大括號裡的程式還沒跑，所以不會印出 Hello。
- 後面三行才是呼叫，每一行執行一次，Console 因此出現三行 Hello。

```text
Hello
Hello
Hello
```

### 參數與引數

函式常常需要外面交給它資料才能工作。參數是宣告時小括號裡用來接值的名稱，引數是呼叫時實際交進去的值，兩者依照位置一一對上。

下圖以 `add(3, 5)` 為例，引數依序交給宣告裡的參數。

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

- 引數與參數只看位置，不看名字：第一個引數給第一個參數，第二個給第二個。
- 少傳的參數是 `undefined`，不要拿它去做運算，結果不會是預期的數字。
- 多傳的引數沒有參數可接，函式裡看不到，等於被忽略。
- 參數只活在函式裡面，這是函式作用域，和前面學的區塊作用域相似：函式外面找不到這個名字。
- 傳入數字、字串、布林這類基本型別時，函式拿到的是複本，在函式裡改參數，不會改到外面的變數。

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
- bump 的參數與外面的 value 同名，但是兩個不同的變數。函式裡把參數改成 6 並印出，函式結束後外面的 value 仍是 5，因為傳進去的是複本。
- 最後一行若拿掉註解會出現 ReferenceError：left 只活在 printPair 裡，外面找不到。

{% note info %}
**物件改的是同一份**
基本型別傳進函式後，改參數不影響外面。物件在後面的章節才介紹，先記住一件事：物件傳進函式後，若改的是它的欄位，外面看得到，因為兩邊指的是同一份資料。
{% endnote %}

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

### return 與回傳值

函式不只能做事，還能把結果交回呼叫的地方，這就是 return 的工作。return 同時會立刻結束函式。

**觀念**

- 回傳值就是這次呼叫的結果，可以放進變數、嵌進模板字串，或當作另一個函式的引數。
- 沒有寫 return，或寫了 `return;` 但右邊沒有值，呼叫的結果都是 `undefined`。
- `console.log` 只是把值印給人看；後面的程式還要用這個結果，就要 return。
- return 會立刻離開函式，函式裡寫在它後面的程式不會執行，下一小節的提早 return 就靠這一點。

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

- getTotal 把 240 交回來放進 total，所以第一行是 240。第二行把 160 嵌進模板字串，第三行把回傳值當成引數：裡面先得到 20，外面再算 20 乘 4，得到 80。getTotal 裡沒有任何 log，這三行都是呼叫端印出來的。
- printTotal 自己先印出 240，但它沒有 return，外層的 console.log 印出這次呼叫的結果，所以緊接著是 undefined。
- blank 寫了 return 但沒有值，結果同樣是 undefined。

{% note warning %}
**印出來不等於交回來**
函式裡有 console.log，只表示 Console 多了一行。把這次呼叫放進變數或模板字串，拿到的仍是 undefined，除非函式有 return。
{% endnote %}

```text
240
合計 160
80
240
undefined
undefined
```

### 提早 return

函式收到的參數不一定合理，例如人數傳入 0，除法會算出 `Infinity` 或 `NaN`，錯誤的結果還會一路往後傳。提早 return（guard clause）的做法，是在函式一開頭先檢查無效輸入，不合法就立刻 return，後面的主要計算只需要處理正常情況。

**觀念**

- 檢查放在函式最上方，一條規則寫一個 if。
- 有回傳值的函式，不合法時回傳 `null`，讓呼叫的人知道這次沒有結果，而不是拿到一個看似正常的錯誤數字。
- 只負責做事的函式，不合法時直接寫 `return;`，後面的動作就不會執行。
- 每個 if 都在 return 後結束，不需要 else，通過所有檢查後剩下的就是正常計算。

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
          console.log(`${name} 的分數無效`);
          return;
        }
        console.log(`${name} 考了 ${score} 分`);
      }

      printScore('Amy', 88);
      printScore('Ben', 120);
    </script>
  </body>
</html>
```

**解析**

- averageRaw 沒有檢查，人數是 0 時得到 Infinity 或 NaN，這些值傳到後面只會讓錯誤擴大。
- average 的第一個 if 擋下人數 0，印出原因並回傳 null，下面的除法完全沒執行。`average(-10, 2)` 的人數正常，通過第一個 if，卻在第二個 if 因總和是負數被擋下，同樣印出原因並回傳 null。
- 兩關都通過的 `average(240, 3)` 才走到最後的除法，得到 80。
- printScore 沒有值要交回，檢查不通過時只寫 `return;`，Ben 印出無效後就結束，不會再印分數。

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

### 預設參數

呼叫時若沒有傳引數，參數就是 undefined。在參數後面用 `=` 寫預設值，可以在沒傳時自動補上一個合理的值。

**觀念**

- 有預設值的參數習慣放在參數列表的尾端，前面的參數仍要照位置傳。
- 只有引數是 undefined 時才套用預設值，沒傳和明確傳入 undefined 結果相同。
- 0、空字串、null 都是明確傳入的值，不會被取代。
- 舊寫法 `count = count || 1` 會把 0 一起換掉。人數、次數、分數都可能是 0，所以改用預設參數，或前面學過的空值合併。

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

- showCount 沒傳引數時印出預設的 1，傳 3 印出 3；傳 0 時 0 被留下，因為 0 不是 undefined。
- 明確傳入 undefined 和沒傳一樣，套用 1；傳入 null 則不套用，第五行是 null。
- countByOr 用 `||` 補值，0 被當成缺值換成 1，這就是舊寫法的問題。
- countByNullish 用空值合併，只有 null 或 undefined 才改用右邊，所以 0 留下，null 才變成 1。

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

### 其餘參數

有時候無法事先知道會傳幾個引數，例如加總任意多個數字。其餘參數（rest parameters）在最後一個參數前面加上 `...`，把該位置之後的引數全部收集成一個陣列。

**觀念**

- 其餘參數只能放在參數列表的最後一個，前面的普通參數仍照位置先對上。
- 收集到的是真正的陣列，沒有傳任何引數時是空陣列。陣列下一章才詳細介紹，這裡只用兩件事：`numbers.length` 是個數，`numbers[0]` 用索引讀第一筆。

```html 04-js/pages/32-js-rest.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>其餘參數</title>
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

- 第一次呼叫收集到三個數字，for 迴圈依索引 0、1、2 讀出 10、20、30，加總得到 60。
- 第二次只有一筆，迴圈跑一次，結果是 5。
- 第三次沒有引數，長度是 0，迴圈一次都不進，total 維持 0。同一支函式收得下不同數量的引數。

```text
60
5
0
```

## 函式表達式

函式本身也是一個值，可以放進變數、當成引數交給別的函式。這一節先學把函式存進變數的函式表達式，再學它的簡寫箭頭函式，最後學把函式交給另一支函式使用。後面的陣列方法與 React 都大量依賴這幾種寫法。

### 匿名函式

函式表達式把沒有寫名字的函式賦值給變數，再透過變數呼叫，這種沒有名字的函式叫匿名函式。它與宣告式的差別在於何時可以呼叫，下面用提升（hoisting）來說明。

**觀念**

- 匿名函式用變數呼叫，變數用 `const` 保存，避免後來被改成別的值。
- 函式宣告會被提升（hoisting）到所在作用域的頂端，所以呼叫可以寫在宣告的上面。
- 函式表達式是一則賦值，賦值那一行還沒執行，變數還沒有指向函式，提早呼叫會出錯。

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

- 第一行在宣告之前呼叫 sumDeclared 仍印出 5，因為函式宣告已被提升。
- add 是函式表達式，要等 const 那一行跑完才指向函式。註解那一行若拿掉，會在賦值前呼叫 add，出現 ReferenceError，後面的程式也不會執行。
- 賦值之後呼叫 add 印出 5。兩次都是 2 加 3，差別只在名字何時可用。

```text
5
5
```

### 箭頭函式

箭頭函式是函式表達式的精簡寫法，用 `=>` 取代 function 關鍵字，只做一件小事的函式可以寫成一行。簡寫有固定規則，寫錯時程式不一定報錯，卻會得到意料之外的結果，所以下面逐一說明。

**觀念**

- 從匿名函式改成箭頭函式：拿掉 function，在參數的小括號與大括號之間加上 `=>`。
- 大括號裡只有一行 return 時，可以連大括號與 return 一起省略，箭頭右邊運算式的結果就是回傳值，稱為隱式回傳。
- 只有一個參數時語法上可省略小括號，但 Prettier 預設會補回來，課堂一律保留，寫成 `(n) => n * 2`。
- 沒有參數時小括號不能省略，要寫成 `() =>`；兩個以上的參數也一定要有小括號。
- 一旦寫了大括號，它就是一般的函式區塊，要交回值必須自己寫 return，否則結果是 undefined。
- 隱式回傳物件時，物件的大括號會被誤認成函式區塊，外面要再包一層小括號：`() => ({ ... })`。物件在後面的章節才介紹，這裡先記住括號的位置。

{% note info %}
**箭頭函式不只是寫法不同**
箭頭函式沒有自己的 this 與 arguments，也不能用 new 呼叫。this 要到物件那一章才學，屆時再回頭對照。
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
- sayHi 與 add 示範小括號：沒有參數時保留空括號，得到 Hi；兩個參數用括號包起來，右邊的加法直接回傳 5。
- forgotten 寫了大括號卻沒有 return，乘法雖然執行了，結果沒有交出來，所以印出 undefined。
- pair 把物件包在小括號裡才會當成回傳值，少了那層括號，大括號會被當成函式區塊，拿不到物件。

```text
8
8
8
Hi
5
undefined
{left: 2, right: 3}
```

### 函式當作參數

函式是值，所以可以像數字或字串一樣當成引數交給另一支函式，由接收的那一方在適當的時機呼叫它。被交進去的函式稱為回呼函式（callback）。這個模式讓同一支函式的流程固定，而變動的部分由外面決定，陣列方法與事件處理都是這樣用的。

**觀念**

- 把函式當引數時，只寫函式名稱，不加小括號。加了小括號就變成「現在就呼叫」，交出去的是它的回傳值。
- 接收的函式用參數名稱加小括號來呼叫它，例如 `operation(a, b)`。
- 交進去的函式可以是已宣告的函式名稱、匿名函式或箭頭函式，三種寫法效果相同。

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
      // operation 是接收進來的函式，由 calc 決定何時呼叫它
      function calc(a, b, operation) {
        const result = operation(a, b);
        console.log(result);
      }

      function add(a, b) {
        return a + b;
      }

      calc(10, 4, add); // 傳函式名稱，不加小括號
      calc(10, 4, function (a, b) {
        return a * b;
      });
      calc(10, 4, (a, b) => a - b);
      calc(10, 4, (a, b) => a / b);

      // calc(10, 4, add()); // 錯誤：傳進去的是 add() 的回傳值 NaN，不是函式
    </script>
  </body>
</html>
```

**解析**

- calc 本身只負責呼叫 operation 並印出結果，要做哪種運算由第三個引數決定，同一支 calc 因此得到不同結果。
- 第一次交進宣告好的 add，印出 14；第二次交匿名函式做乘法，印出 40；第三次、第四次交箭頭函式做減法與除法，印出 6 與 2.5。
- 最後一行若拿掉註解，`add()` 先被呼叫，沒有引數所以得到 NaN，calc 拿到的不是函式，`operation(a, b)` 會出現 TypeError。

```text
14
40
6
2.5
```

## 選讀：閉包

閉包是函式「記住」自己建立當下外層變數的現象。外層函式執行完後，內層函式仍讀得到、也改得到那些變數，前提是內層函式被 return 或當作參數交到外層之外。這種由程式碼寫在哪裡，決定能讀到哪些變數的規則，稱為詞法作用域（lexical scope）。

**觀念**

- 內層函式使用了外層的變數，又被交到外層之外，這組綁定就叫閉包。記住的是變數本身，不是當時數字的複本。
- 外層函式每呼叫一次，就做出一份新的變數；兩次呼叫得到的內層函式，各記各的，互不影響。
- 外面碰不到那個變數，只能透過交出來的函式讀寫，這叫封裝，用來把狀態藏在函式裡。

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
- 物件的寫法在後面的章節才展開，這裡用它把兩支函式一起交回。

# 陣列

陣列是一組有順序的值，用從 0 開始的索引取出每一格，`length` 是目前的格數。這一章先學怎麼建立陣列、增減格子，並看清楚 const 為什麼擋不住格子內容的改變；接著依用途學會搜尋、轉換、篩選、排序等陣列方法，並分清楚哪些會改到原陣列、哪些交回新陣列。最後的選讀用 Set 去掉重複的值。

## 陣列基礎

這一節處理陣列的寫法、增減格子的方法，以及變數與陣列之間的關係，重點是「哪些動作會直接改到原來那一份」，後面的陣列方法都要先分清楚這一點。

### 建立與存取

陣列用中括號把值依序寫出來，再用索引取出某一格。索引從 0 開始，所以長度是 3 的陣列，合法索引是 0、1、2；讀到不存在的索引會得到 undefined。

**觀念**

- 最後一格的索引是長度減 1，也可以用 `at` 傳入負數從結尾倒數：`at(-1)` 是最後一格，`at(-2)` 是倒數第二格。
- 陣列在 typeof 裡也是 object，分不出和物件的差別，要判斷是不是陣列，改用 `Array.isArray`。
- `for...of` 依序取出每一格的值；只有需要索引時，才用 for 搭配計數器，條件寫成小於 length。

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
      const places = ['台北', '花蓮', '京都'];

      console.log(places.length);
      console.log(places[0]);
      console.log(places[5]);
      console.log(places.at(-1));
      console.log(Array.isArray(places));
      console.log(typeof places);

      for (const place of places) {
        console.log(place);
      }
    </script>
  </body>
</html>
```

**解析**

- 長度是 3；索引 0 是第一個字串，索引 5 沒有這一格，所以是 undefined；`at(-1)` 是最後一個字串。
- `Array.isArray` 是 true，但 typeof 仍印出 object，所以不能靠 typeof 判斷陣列。
- `for...of` 依序印出三個字串，變數 `place` 每一圈拿到的是格子裡的值，不是索引。

```text
3
台北
undefined
京都
true
object
台北
花蓮
京都
```

本篇的輸出區塊是簡化版：Chrome Console 會在陣列前多印長度，例如 `(3) ['台北', '花蓮', '京都']`，物件則印成 `{id: 1, days: 3}` 的樣子。

{% note warning %}
**不要用 for...in 走陣列**
`for...in` 走的是鍵。陣列的鍵是 '0'、'1' 這種字串，還可能遇到原型上額外的鍵。要讀每一格的值，用 `for...of`；走物件的鍵留到下一章。
{% endnote %}

### 新增與刪除元素

這一組方法用來在陣列的頭尾增減格子，或在中間插入、刪除。它們都直接改動原來那個陣列，沒有另外交回一份新的。要特別留意回傳值：它們回傳的不是改完的陣列。

**一覽**

- `push`：加在最後，回傳新的長度。
- `pop`：拿掉最後一格，回傳被拿掉的值。
- `unshift`：加在最前面，回傳新的長度。
- `shift`：拿掉第一格，回傳被拿掉的值。
- `splice`：從指定索引刪掉若干格，也可以在同一位置插入新值，回傳被刪掉的那些值（包成新陣列）。

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
      const places = ['台北', '花蓮', '京都'];

      console.log(places.push('台南'));
      console.log(places.pop());
      console.log(places.unshift('高雄'));
      console.log(places.shift());
      console.log(places.splice(1, 1, '台東'));
      console.log(places);
    </script>
  </body>
</html>
```

**解析**

- `push` 回傳 4，表示加上台南之後有四格；接著 `pop` 把台南拿回來，陣列回到三格。
- `unshift` 又把長度變回 4，`shift` 把高雄拿掉，陣列再次回到三個地名。
- `splice(1, 1, '台東')` 從索引 1 刪掉 1 格，被刪掉的是花蓮，所以回傳只有花蓮的陣列；原陣列的索引 1 則換成台東。

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
push 回傳的是長度，是數字。若寫成 `places.push('台南').map(...)`，數字上面沒有 map，程式會中斷。要接著轉換，先讓 push 改完，再對 places 呼叫方法。
{% endnote %}

### const 與參考

變數裡存的不是陣列的內容，而是指向這個陣列的參考，像一張寫著陣列放在哪裡的字條。

![const 變數 fruits 指向記憶體裡的同一份陣列。改索引是改格子裡的值，所以可以；寫 fruits 等於一個新陣列是要換成另一個容器，會發生 TypeError](assets/images/js-const-reference-memory.jpg)

**觀念**

- const 鎖住的是「名字指向哪一個陣列」，不是陣列裡的內容。
- 改 `fruits[0]`，或呼叫會動到格子的方法，動的是同一個陣列，因此合法。
- 寫 `fruits = []` 是要讓名字改指到另一個陣列，會丟出 TypeError，後面的程式停在這一行。
- 函式收到陣列參數時，拿到的是同一個參考，函式裡改格子，外面看得到。物件也是同樣的規則，下一章會再看到。

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

      // 拿掉註解會丟出 TypeError：const 不能改指到另一個陣列
      // fruits = [];
    </script>
  </body>
</html>
```

**解析**

- 索引 0 改成 kiwi、再 push 一格 mango，印出的仍是原來那個陣列，只是格子變了，const 沒有報錯。
- `replaceFirst` 收到同一個參考，把第 0 格改成 pear，函式外面再讀，已經是 pear。
- 最後一行若拿掉註解，會在重新賦值那一行丟出 TypeError，因為 const 不允許把 `fruits` 改指到新的空陣列。

```text
['kiwi', 'banana', 'cherry', 'mango']
pear
['pear', 'banana', 'cherry', 'mango']
```

{% note info %}
**真的不准改，以及函式裡的修改**
`Object.freeze` 可以凍結第一層，索引不能再改，也不能再加格子；包在裡面的陣列或物件不會一起凍結。非模組的 script 沒有自動的嚴格模式，凍結後再改格子會安靜失敗，嚴格模式才會丟出 TypeError。

若要交給函式一份互不影響的資料，要先複製，寫法在[展開運算子](#展開運算子)。
{% endnote %}

## 陣列原型與方法

陣列的方法放在 `Array.prototype`，每個陣列共用這一份；字串章的[原型](#原型)已經說明，自己身上沒有的函式，就到原型上找。這一節依搜尋、轉換、篩選、排序與串接的用途來學，使用前先分清楚每個方法會不會改到原陣列：改原陣列的，要小心別的地方也在用這一份；交回新結果的，要記得用變數接住。

**一覽**

- 會改原陣列：前一節的 `push`、`pop`、`unshift`、`shift`、`splice`，加上 `sort` 與 `reverse`，後兩者回傳的就是原陣列自己。
- 不改原陣列、交回新結果：其餘的方法，各小節的一覽會逐一說明交回布林、索引、值、新陣列、字串或累計值。唯一的例外是 `forEach`，它不交回東西，回傳值固定是 undefined。
- `toSorted`、`toReversed`、`toSpliced`、`with` 是 `sort`、`reverse`、`splice` 與「用索引改一格」的不改原陣列版本，交回新陣列。

{% note warning %}
**不要往原型加方法**
自己往 `Array.prototype` 加方法，每一個陣列都會看到它，容易和之後內建的新方法撞名，也會影響別人的程式，所以不要這麼做。
{% endnote %}

各方法的參數與回傳值，查 MDN 的 [Array](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array) 最準。

### 搜尋與判斷

這一類用來問值在不在，或有沒有格子符合條件，原陣列不會被改。

**一覽**

- `includes`：問值在不在，回傳布林。
- `indexOf`：回傳第一次出現的索引，沒有就是 -1。
- `find`：回傳第一個符合條件的值，沒有就是 undefined。
- `findIndex`：回傳第一個符合條件的索引，沒有就是 -1。
- `some`：問有沒有任何一格符合條件，回傳布林。
- `every`：問是不是每一格都符合條件，回傳布林。

**觀念**

- 傳給方法的函式稱為回呼（callback）：方法替每一格呼叫它一次，把格子的值當參數交進去，由回傳的 true 或 false 決定符不符合。
- 找單一個值用 `includes`；找「符合某條件」的格子，用需要回呼的 `find` 系列、`some` 與 `every`。
- `includes` 能找到 NaN（不是數字的特殊值），`indexOf` 找不到，所以只想知道「有沒有」時優先用 `includes`。

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

- 92 第一次出現在索引 1，後面另一個 92 不會被回傳；`find` 與 `findIndex` 同樣只取第一個符合的格子。
- `some` 與 `every` 都回答是或否，原陣列的順序和內容都沒有變。
- 最後兩行顯示 `includes` 能找到 NaN，`indexOf` 卻得到 -1。

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
沒有任何一格可以違反條件時，`every` 的定義是 true，所以空陣列呼叫 every 也會得到 true。要表示「至少有一格」，用 `some`，或先看 length。
{% endnote %}

### 逐一處理與轉換

這一類用來走訪每一格：`forEach` 負責「做事」，`map` 負責「換成新值」。兩者都不會刪格子，也不會改原陣列。

**一覽**

- `forEach`：每一格各執行一次回呼，回傳值固定是 undefined。
- `map`：每一格交給回呼，用回傳值組成一個一樣長的新陣列。

**觀念**

- 回呼函式依序收到三個參數：值、索引、整個陣列。
- `forEach` 沒有回傳值，不能放在串接中間，也不能用來產生新陣列；要新陣列，用 `map`。
- `map` 的回呼若寫了大括號卻忘了 return，新陣列會滿是 undefined。

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

- `forEach` 印出三行，索引從 0 到 2，長度都是 3，每一圈收到的價格都是原來的數字。
- `map` 交回兩倍的新陣列，`prices` 三個數字都還在。
- 最後一行是 undefined，那是 `forEach` 的回傳值。

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
`prices.map(...)` 若沒有放進 `const`，新陣列會被丟掉，原陣列也不會變成兩倍。
{% endnote %}

### 篩選與累計

這一類把陣列收成另一份結果，且不改原陣列：`filter` 留下符合的格子，`reduce` 把整個陣列收成一個值。

**一覽**

- `filter`：留下回呼回傳真值的格子，交回較短或一樣長的新陣列。
- `reduce`：每一格依序交給回呼，把回呼回傳的累計值帶到下一格，最後交回一個值。

**觀念**

- `filter` 的回呼要回傳布林，找不到任何符合的格子時，交回空陣列。

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

- 大於等於 80 的是 88、92、95，組成新陣列。
- 原陣列仍是五格，`filter` 交回的是另一份陣列。

```text
[88, 92, 95]
[88, 92, 76, 95, 61]
5
```

**觀念：reduce**

- 像滾雪球：回呼的第一個參數是目前的累計，第二個參數是這一格，必須 return 下一次的累計。
- 第二個參數是累計的起點；省略時會拿第一格當起點、從第二格開始，為了結果的型別明確，建議一律寫出起點。
- 最常見的用法是加總：回呼每次回傳「目前的累計加上這一格」。

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

      // 從 0 依序相加，得到 71500
      const total = prices.reduce((sum, price) => {
        return sum + price;
      }, 0);
      console.log(total);

      // 有起點時，空陣列得到起點 0
      console.log([].reduce((sum, price) => sum + price, 0));

      // 起點寫成空字串，數字會被接成文字
      console.log(prices.reduce((sum, price) => sum + price, ''));
    </script>
  </body>
</html>
```

**解析**

- 累計從 0 開始，依序加上三個價格，得到 71500。
- 有起點時，空陣列得到起點 0；若沒給起點，空陣列呼叫 `reduce` 會丟出 TypeError。
- 起點是空字串時，每一次相加都是字串相加，三個數字被接成一長串文字，所以起點的種類就是結果的種類。

```text
71500
0
128001590042800
```

### 排序與組合

這一類處理陣列的順序與拼接，其中 sort 與 reverse 會改到原陣列，要特別留意。

**一覽**

- `slice`：依索引裁出一段（終點不含），不給參數就複製整份，交回新陣列。
- `concat`：把更多值或陣列接在後面，交回新陣列。
- `join`：用分隔字串把每一格接成一個字串。
- `sort`：排序並改動原陣列，預設把格子轉成字串再比。
- `reverse`：倒序並改動原陣列。
- `toSorted`、`toReversed`：和 `sort`、`reverse` 結果相同，但原陣列不變，交回新陣列。

先看三個不改原陣列、都交回新結果的方法：slice、concat 與 join。

```html 04-js/pages/44b-js-combine.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>slice、concat 與 join</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const places = ['台北', '花蓮', '京都'];

      // 從索引 1 裁到結尾；從 0 裁到索引 2 之前
      console.log(places.slice(1));
      console.log(places.slice(0, 2));
      // 接上更多值，交回四格的新陣列
      console.log(places.concat(['台南']));
      // 接成一個字串
      console.log(places.join('、'));
      // 原陣列沒有被改
      console.log(places);
    </script>
  </body>
</html>
```

**解析**

- `slice(1)` 從索引 1 裁到結尾；`slice(0, 2)` 的終點索引 2 不包含，所以只有前兩格。
- `concat` 交回有四個地名的新陣列，`join` 交回一個字串，不是陣列。
- 最後一行仍是原本的三個地名，這三個方法都沒有改到它。

```text
['花蓮', '京都']
['台北', '花蓮']
['台北', '花蓮', '京都', '台南']
台北、花蓮、京都
['台北', '花蓮', '京都']
```

接著看排序。`sort` 不給比較函式時，會先把每一格轉成字串再比，所以數字要自己提供比較函式（傳給 sort 的回呼，每次比兩格 a 與 b）：回傳負數表示 a 排前面，正數表示 a 排後面，0 表示不動。

下面先用規則相同、但不改原陣列的 `toSorted` 看比較規則，再看 `sort` 本身會直接改動原陣列。

```html 04-js/pages/44-js-sort.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>排序</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const scores = [20, 3, 100];

      // 不給比較函式時依字串比較，變成 100、20、3
      console.log(scores.toSorted());
      // 數字比較才是 3、20、100
      console.log(scores.toSorted((a, b) => a - b));
      // toSorted 不改原陣列
      console.log(scores);

      const fruits = ['cherry', 'apple', 'banana'];
      const sorted = fruits.sort();

      // sort 直接改了 fruits，回傳的就是 fruits 自己
      console.log(fruits);
      console.log(sorted === fruits);

      // toReversed 交回倒序的新陣列，fruits 維持原順序
      console.log(fruits.toReversed());
      console.log(fruits);
    </script>
  </body>
</html>
```

**解析**

- 不給比較函式時，20 排在 3 前面，因為比的是字串 '20' 與 '3'；給了 `(a, b) => a - b` 才是數字由小到大。
- `toSorted` 兩次都沒有改到 `scores`，最後它仍是 20、3、100。
- `sort` 直接把 `fruits` 排好，而且回傳值與 `fruits` 是同一個陣列，所以比較結果是 true；之後的 `toReversed` 只交回倒序的新陣列，`fruits` 維持排好的順序。

```text
[100, 20, 3]
[3, 20, 100]
[20, 3, 100]
['apple', 'banana', 'cherry']
true
['cherry', 'banana', 'apple']
['apple', 'banana', 'cherry']
```

{% note info %}
**toSorted 與 sort，以及中文排序**
`toSorted`、`toReversed` 與 toSpliced、with 都是 ES2023 加入的寫法，現行瀏覽器都支援；要留著原順序時優先用它們，舊程式碼裡則常見先 slice 複製再 sort。字串預設依編碼排序，中文要依語言規則排序時，比較函式寫成 `a.localeCompare(b, 'zh-Hant')`。
{% endnote %}

### 方法串接

方法串接是把前一個方法交回的新陣列，直接接上下一個方法，例如 `.filter(...).map(...)`。filter 與 map 交回新陣列，所以能繼續接；`reduce` 交回的是單一累計值，通常放在最後。整條串接都不會改到原陣列。

**觀念**

- 每一段處理的都是上一段的回傳值：`filter` 交給 `map` 的是較短的新陣列。
- 串接之後，`map` 看到的索引屬於篩完的那一份，不是原陣列。
- `forEach` 回傳 undefined，放在中間會讓下一段接到 undefined 而中斷。

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

- `filter` 留下 12800、15900、6800，`map` 各乘 2，`reduce` 從 0 加總，得到 71000。
- `prices` 仍是原來的四個數字，整條串接都沒有改到它。
- 最後一行若拿掉註解，`forEach` 回傳 undefined，接著呼叫 `map` 會丟出 TypeError。

```text
71000
[12800, 15900, 42800, 6800]
```

## 選讀：Set

`Set` 是一組不會重複的值，同一個值再放一次，數量不會增加，適合問「這個值出現過沒有」或替陣列去重。

**觀念**

- `new Set` 會依第一次出現的順序留下值；`size` 是去重後的數量，`has` 問值在不在，`add` 再放一個值。
- `Set` 沒有索引，也不能直接呼叫 map；需要陣列方法時，先用 `Array.from` 依插入順序交出新陣列。
- 比較值的方式和 includes 類似，所以 NaN 在 `Set` 裡只會留一份。

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

- 四個字串放進去之後，重複的台北只留一份，`size` 是 3；花蓮還在，`has` 是 true。
- 加上台南變成 4；再加一次台北，數量仍是 4。
- `Array.from` 依插入順序交出台北、花蓮、京都、台南。

```text
3
true
4
4
['台北', '花蓮', '京都', '台南']
```

{% note info %}
**Set 轉陣列的另一種寫法**
學了[展開運算子](#展開運算子)之後，也可以把 Set 攤進一對中括號轉成陣列。需要索引、排序，或要用 map 與 filter 處理的清單，仍然用陣列。
{% endnote %}

# 物件

物件用名字（key）對應到值（value），把一筆資料的各個欄位放在一起；陣列靠順序找資料，物件靠名字找資料。這一章先學怎麼建立物件、讀寫與刪除欄位、在物件裡寫函式，以及用可選串連安全地讀可能不存在的欄位，再認識物件的原型與 Object 上的靜態方法，最後在選讀補充 Map、方法被拆下來時的 this，以及一支把陣列方法與物件合用的完整範例。

## 物件基礎

這一節學物件最基本的操作：建立、讀寫欄位、放進函式，以及安全地讀取可能不存在的欄位。

### 建立與存取屬性

物件字面值用大括號包住一組「名字: 值」，欄位之間以逗號分隔。讀取時最常用點記法；名字放在變數裡、或名字含有減號、空白這類不能當識別字的字元時，改用中括號。讀不存在的欄位不會出錯，只會得到 undefined。

**觀念**

- 屬性簡寫：變數名稱與欄位名稱相同時，只寫一次，例如在大括號裡直接寫 `title`。
- 計算屬性：建立物件時用中括號包住運算式，欄位名稱到執行時才決定。
- 點記法與中括號讀到的是同一個欄位；中括號內可以放任何運算式，所以能用變數當欄位名稱。

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
        title, // 屬性簡寫，等同 title: title
        place: '台北',
        days: 3,
        price: 12800,
        [field + 'Code']: 'TPE', // 計算屬性，欄位名稱是 placeCode
      };

      console.log(tour.title);
      console.log(tour['place']);
      console.log(tour[field]);
      console.log(tour.placeCode);
      console.log(tour.guide);
    </script>
  </body>
</html>
```

**解析**

- 簡寫的 title 欄位拿到外面變數的值，所以第一行印出標題。
- 點記法與中括號讀的是同一個欄位；`tour[field]` 先把變數 field 換成字串 'place'，再去讀 place 欄位。
- 計算屬性由 field 接上 'Code' 組成名稱，所以讀得到 placeCode。
- 物件裡沒有 guide，讀到的是 undefined，不會中斷程式。

```text
台北城市漫遊
台北
台北
TPE
undefined
```

### 新增修改與刪除屬性

物件建立後仍可以變動：賦值給已有的名字是修改，賦值給還沒有的名字是新增，delete 則拿掉欄位。要檢查欄位在不在，用 `in` 或 `Object.hasOwn`。

**觀念**

- 修改與新增都用賦值，差別只在名字原本有沒有。
- delete 刪掉物件自己的欄位，刪完後再讀會得到 undefined。
- in 會往原型（物件繼承來的共用方法所在）上找，Object.hasOwn 只看物件自己身上的欄位。

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

      tour.price = 13900; // 修改
      tour.seats = 8; // 新增
      console.log(tour.price);
      console.log('seats' in tour);
      console.log(Object.hasOwn(tour, 'seats'));

      // toString 在原型上，不是 tour 自己的欄位
      console.log('toString' in tour);
      console.log(Object.hasOwn(tour, 'toString'));

      delete tour.seats;
      console.log(tour.seats);
      console.log(tour.days);

      // tour = { id: 2 }; // 拿掉註解會是 TypeError
    </script>
  </body>
</html>
```

**解析**

- price 被改成 13900，seats 是新加的，兩個檢查都顯示 seats 在 tour 身上。
- toString 是每個物件從原型繼承來的方法，所以 in 回傳 true，hasOwn 回傳 false，這就是兩者的差別。
- delete 之後 seats 讀到 undefined，沒有被刪的 days 仍是 3。

```text
13900
true
true
true
false
undefined
3
```

{% note warning %}
**const 擋的是換一個物件**
改欄位、加欄位、刪欄位動的都是同一個物件，不受 const 限制；寫成 `tour = { id: 2 }` 是要換成另一個物件，才會被擋下。
{% endnote %}

### 方法

放在物件裡的函式稱為方法。用「物件.方法()」呼叫時，方法裡的 `this` 就是點號左邊的那個物件，因此方法可以用 this 讀同一個物件上的其他欄位。

**觀念**

- 方法簡寫 `label() {}` 與 `label: function () {}` 寫法不同、用法相同，新寫的程式用簡寫。
- 方法必須透過物件呼叫，單獨寫 label() 會找不到這個名字。
- 方法不要寫成箭頭函式，因為箭頭函式沒有自己的 this；陣列方法的回呼才適合用箭頭。

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

- 呼叫 `tour.label()` 時，點號左邊是 tour，所以 this.title 與 this.days 讀到 tour 的兩個欄位，接成一行字交回。

```text
花蓮山海三日・3 天
```

{% note info %}
**方法被拆下來會怎樣**
把方法複製到別的變數再呼叫，this 就不再指向原物件。這個情況見選讀的「方法呼叫時的 this」。
{% endnote %}

### 可選串連

讀深層欄位時，中間某一層若是 null 或 undefined，再往下用點號讀會丟出 TypeError。可選串連 `?.` 放在點號前面：左邊有值就照常往下讀，左邊是 null 或 undefined 就停下來，整段得到 undefined，不會中斷。

**觀念**

- `?.` 只擋 null 與 undefined；0、空字串、false 都算有值，會繼續往下讀。
- 停下來得到 undefined 之後，若要補預設值，接上前面學過的 `??`。

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

      // console.log(other.guide.name); // 拿掉註解會是 TypeError
    </script>
  </body>
</html>
```

**解析**

- 第一個物件有 guide，所以讀得到「林」；第二個物件沒有 guide，可選串連在這裡停下，得到 undefined。
- 再接 `??`，undefined 被換成預設的「未定」。
- 最後一行沒有 `?.`，other.guide 是 undefined，再讀 name 就會丟出 TypeError。

```text
林
undefined
未定
```

## 物件原型與方法

物件和字串一樣有共用的原型 Object.prototype，toString 這類方法放在那裡，用點號呼叫。另一類方法直接放在 Object 本身，稱為靜態方法，呼叫時把物件當參數傳進去，例如 Object.keys(tour)。這一節學習用靜態方法取得物件的欄位，並用迴圈逐一走訪。

### 靜態方法

keys、values、entries 把物件自己的欄位整理成陣列，fromEntries 則反過來把陣列組回物件，四個都不會改動原物件。順序依欄位建立的順序；名稱是整數形式（如 '1'）的欄位例外，會先由小到大排在最前面。

**一覽**

- `Object.keys(obj)`：交回欄位名稱的陣列。
- `Object.values(obj)`：交回欄位值的陣列。
- `Object.entries(obj)`：交回「[名稱, 值]」兩格陣列所組成的陣列，名稱與值都保留。
- `Object.fromEntries(entries)`：反過來把「[名稱, 值]」的陣列組回新物件。

**觀念**

- 這三個方法要寫成 Object.keys(tour) 的形式；物件自己身上沒有 keys 這個欄位。
- 因為交回的是陣列，所以可以接著使用上一章的陣列方法。

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
      console.log(Object.fromEntries(Object.entries(tour)));

      // 物件自己身上沒有 keys，得到 undefined
      console.log(tour.keys);
      // toString 來自原型，所以取得到，型別是 function
      console.log(typeof tour.toString);
    </script>
  </body>
</html>
```

**解析**

- keys 得到三個欄位名稱，values 得到對應的值，兩者的順序一致。
- entries 的每一格又是一個兩格陣列，左邊是名稱，右邊是值；`Object.fromEntries` 把它組回一個和原本內容相同的新物件。
- `tour.keys` 是 undefined，因為 keys 不在這個物件上，要透過 Object 呼叫。
- toString 從原型取得，所以 typeof 是 function。

```text
['id', 'title', 'days']
[1, '台北城市漫遊', 3]
[['id', 1], ['title', '台北城市漫遊'], ['days', 3]]
{id: 1, title: '台北城市漫遊', days: 3}
undefined
function
```

### 走訪欄位

想逐一處理物件的每個欄位，把 Object.entries 的結果交給 for...of 迴圈。每一圈拿到的是一組兩格陣列，索引 0 是欄位名稱，索引 1 是值。

**觀念**

- 迴圈變數是兩格陣列，不是欄位名稱本身。
- 迴圈只是讀取，不會改掉原物件。

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

- 三組資料依建立順序印出，左邊是欄位名稱，右邊是值。
- 每一圈的 pair 都是新的兩格陣列，原物件的欄位完全不變。

```text
id 1
title 台北城市漫遊
days 3
```

{% note warning %}
**for...in 會走到繼承來的鍵**
`for...in` 走的是可列舉的鍵，範圍包含原型上的；Object.keys 只給物件自己的欄位。走訪物件請用 keys、values 或 entries 配 for...of。
{% endnote %}

## 選讀：Map

物件的鍵一律是字串（或 Symbol），數字 1 與字串 '1' 會變成同一個欄位。Map 是另一種「鍵對值」的集合，鍵可以是任何型別，數字 1 與字串 '1' 是不同的鍵。固定欄位的一筆資料仍然用物件，只有鍵不固定、型別不限時才考慮 Map。

**觀念**

- 用 set 放入「鍵、值」，用 get 以鍵取出，size 是目前的筆數。
- 鍵不存在時 get 得到 undefined；get(1) 與 get('1') 是不同的兩格。
- Map 與 Set 一樣是內建的集合；需要順序、要用 map 與 filter 處理的清單仍用陣列。

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

- 數字鍵 1 取出 12800；字串 '1' 不是同一把鍵，所以得到 undefined。
- 放入兩筆，size 是 2。

```text
12800
undefined
2
```

## 選讀：方法呼叫時的 this

this 的值取決於「怎麼呼叫」，而不是函式寫在哪裡。用「物件.方法()」呼叫時，this 是點號左邊的物件；把方法複製到另一個變數再呼叫，左邊沒有物件，this 就不再是原物件。

**觀念**

- 同一個函式，透過物件呼叫與單獨呼叫，this 不同。
- 單獨呼叫時 this 不是原物件：在一般的 script 裡是 window，讀不到這些欄位；嚴格模式下是 undefined，讀欄位會丟出 TypeError。
- 事件處理函式會再遇到這個問題，到時再回頭看這一節。

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

- 第一行透過 tour 呼叫，this 是 tour，兩個欄位都讀得到。
- 第二行把函式本身放進 copied 再呼叫，左邊沒有物件，this 不是 tour，兩個欄位都是 undefined，所以字串變成「undefined・undefined 天」。

```text
花蓮山海三日・3 天
undefined・undefined 天
```

## 選讀：綜合練習

這一節把陣列方法、物件與函式放在同一支檔：陣列的每一格是物件，函式接收陣列，用 filter、map、find 交回新的結果，原陣列不被改動。

**觀念**

- 函式的第一個參數是整份陣列，不寫死某個陣列的名字，換一份資料仍可重複使用。
- 篩選用嚴格相等 `===`，數字不要和字串比。
- filter 留下符合條件的格子，map 取出需要的欄位，find 找出第一筆符合的，沒有就是 undefined。

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
      console.log(findById(tours, 9)?.title);
      console.log(tours.length);
    </script>
  </body>
</html>
```

**解析**

- filterByDays 留下 days 嚴格等於 3 的兩筆，titlesOf 再把它們收成標題陣列。
- findById 對上 id 1，交回整筆物件。
- id 9 不存在，find 得到 undefined，所以後面用 `?.` 讀 title，結果是 undefined 而不會中斷。
- 原陣列長度仍是 3，京都那筆還在，證明這些方法都沒有改動原陣列。

```text
['台北城市漫遊', '花蓮山海三日']
{id: 1, title: '台北城市漫遊', place: '台北', days: 3, price: 12800}
undefined
3
```

# 選讀：內建物件

內建物件是 JavaScript 隨語言附帶、不用自己建立就能使用的現成工具。這一章介紹兩個：Math 提供數學常數與運算，Date 處理日期與時間。它們和用大括號自己寫出來的物件不同，後者是一筆自己的資料，前者是語言提供的功能。整章是選讀，專案用到時回來查即可。

## Math

Math 把數學常數與函式收在同一個名字上，用點號直接呼叫，不必也不能建立。這一節從常數與基本運算開始，接著是取整數、最大最小值與亂數，最後用這些組成一個大樂透號碼產生器。

{% note danger %}
**Math 不能 new**
`new Math()` 會丟出 TypeError。常數與方法全語言共用，不需要另外做出一個 Math。
{% endnote %}

**一覽**

- 常數：`Math.PI` 是圓周率，`Math.E` 是自然常數。
- 運算：`abs` 取絕對值，`pow` 算次方，`sqrt` 算平方根。
- 取整數：`round`、`floor`、`ceil`、`trunc` 都回傳整數，差在往哪個方向收。
- 比大小：`max` 與 `min` 在傳入的數字裡挑最大與最小。
- 亂數：`random` 回傳 0 以上、小於 1 的小數。

### 常數與基本運算

圓周率、絕對值、次方與平方根都放在 Math 上。次方也可以用前面學過的 `**`，結果與 `Math.pow` 相同。

```html 04-js/pages/56-js-math.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>常數與基本運算</title>
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

### 取整數與四捨五入

四個取整數的方法都把小數收成整數，差別在方向：就近、往小、往大，或直接砍掉小數。正數時 `floor` 與 `trunc` 結果相同，到了負數才分得出來。

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
      console.log(Math.round(2.5));
      console.log(Math.round(-2.5));
    </script>
  </body>
</html>
```

**解析**

- 2.7 四捨五入是 3，往小收是 2。2.1 往大收是 3，2.9 去掉小數是 2。
- -2.3 用 `floor` 往小收成 -3，用 `trunc` 朝 0 砍成 -2。
- 剛好 .5 時 `round` 往正無限大的方向收，所以 2.5 是 3，-2.5 是 -2；它不是「離 0 較遠的那一邊」。

```text
3
2
3
2
-3
-2
3
-2
```

### 最大值、最小值與亂數

`Math.max` 與 `Math.min` 在傳進去的數字裡挑一個，個數不限；資料在陣列裡時，用展開語法把元素攤成參數（展開在下一章正式介紹）。

`Math.random` 沒有參數，每次呼叫回傳 0 以上、小於 1 的小數，不會等於 1。要得到指定範圍的整數，先把小數放大成區間的寬度，用 floor 砍掉小數，再平移到起點，包成 getRandomInt。公式是 `Math.floor(Math.random() * (max - min + 1)) + min`，min 與 max 都可能抽到。

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

      const scores = [72, 95, 88];
      console.log(Math.max(...scores));

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

- 1、5、3 的最大是 5，最小是 1。陣列展開後同樣用 `Math.max`，得到 95。
- 亂數那一行是 0 到小於 1 的小數，getRandomInt(1, 10) 是 1 到 10 的整數，這兩行每次執行都不同。

```text
5
1
95
0.482
7
```

### 大樂透產生器

台灣大樂透是從 1 到 49 抽出 6 個不重複的號碼。這個完整示範用 `Set` 記住已抽過的號碼，`while` 在湊滿 6 個之前繼續抽，最後轉回陣列由小到大排好；這兩者在前面章節的選讀已介紹過。

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
          const n = Math.floor(Math.random() * 49) + 1;
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

- 每個號碼是 1 到 49 的整數。抽到重複的號碼放進 Set 不會讓 `size` 增加，所以迴圈會繼續，直到湊滿 6 個。
- `Array.from` 把 Set 轉成陣列，`sort` 的比較函式 `(a, b) => a - b` 讓數字由小到大排，並且改的是這個陣列本身。
- 長度是 6，再放進 Set 數量仍是 6，表示沒有重複。第一行的號碼每次執行都不同。

```text
[8, 15, 22, 27, 34, 45]
6
6
```

Chrome Console 會把陣列寫成 `(6) [8, 15, ...]`，內容以數字為準。

## Date

Date 表示一個時間點，內部存的是與時區無關的毫秒數，顯示時才依電腦時區換算。這一節先學建立、讀取與修改，再學時間戳記與 UTC 時區這兩個容易搞混的觀念，最後是格式化、日期計算與跨年倒數。

**一覽**

- 建立：`new Date()` 是現在，`new Date(年, 月, ...)` 指定本地時間，`new Date('ISO 字串')` 由字串建立。
- 讀取：`getFullYear`、`getMonth`、`getDate`、`getDay`、`getHours`、`getMinutes`、`getSeconds` 讀出本地時間的各個欄位。
- 修改：對應的 `set` 開頭方法，直接改掉這個物件。
- 毫秒：`getTime` 與 `Date.now()` 取得時間戳記。
- 輸出：`toISOString` 輸出 UTC 字串，`toLocaleString` 系列與 `Intl.DateTimeFormat` 輸出給人看的文字。

{% note warning %}
**月份從 0 開始**
`getMonth` 與建立時的月份參數都是 0 到 11，0 是 1 月，11 是 12 月。印給人看時要加 1。星期的 `getDay` 也是從 0 開始，0 是星期日。
{% endnote %}

### 建立指定日期

`new Date()` 沒有參數時是現在。要指定時間，依序傳入年、月、日、時、分、秒，沒傳的欄位是日從 1、其餘從 0。這種寫法一律解讀成本地時間，月份要傳 0 到 11，所以 5 月傳 4。也可以傳 ISO 格式的字串；字串怎麼被解讀，見後面的 UTC 與時區。

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
      const dayOnly = new Date(2026, 7, 1);
      const isoLocal = new Date('2026-08-01T12:00:00');

      console.log(now.getFullYear());
      console.log(
        birthday.getMonth() + 1,
        birthday.getDate(),
        birthday.getHours(),
        birthday.getMinutes()
      );
      console.log(dayOnly.getHours(), dayOnly.getMinutes());
      console.log(isoLocal.getMonth() + 1, isoLocal.getDate(), isoLocal.getHours());
    </script>
  </body>
</html>
```

**解析**

- 第一行是執行當下的年份，每次執行都不同。
- 月份索引 4 加 1 是 5 月，日期 15，時間 8 時 30 分。
- 只傳年月日時，時與分都是 0。
- 帶 T 與時間、沒有時區的字串，被讀成本地的 8 月 1 日 12 時。

```text
2026
5 15 8 30
0 0
8 1 12
```

### new Date 與 Date 的差異

同樣是 Date 這個名字，有沒有 new 差很多。`new Date()` 做出日期物件，物件上才有 getFullYear 這類方法。不加 new 的 `Date()` 只回傳當下時間的字串，字串上沒有日期方法。這是歷史遺留的寫法，實務上永遠加 new。

`Date.now()` 不建立物件，直接回傳毫秒數的時間戳記。

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

- `new Date()` 是 object，`Date()` 是 string，`Date.now()` 是 number。
- `getFullYear` 後面沒有括號，只是讀取屬性；字串沒有這個屬性，所以得到 undefined，程式不會中斷。
- 物件上的 getFullYear 是 function。

```text
object
string
undefined
function
number
```

### 讀取日期與時間

讀取用 get 開頭的方法，只看值，不改原本的時間。`getDate` 是幾號，`getDay` 是星期，名字只差一個字，要印出幾號用前者。時、分、秒各自有對應的方法。

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
    </script>
  </body>
</html>
```

**解析**

- 年份 2026，月份索引 7 加 1 是 8 月，日期是 1。
- 2026 年 8 月 1 日是星期六，`getDay` 得到 6。
- 14 時 30 分 45 秒是建立時傳入的時間。

```text
2026
8
1
6
14 30 45
```

### 設定日期與時間

set 開頭的方法會直接改掉原來那一個日期物件。要留著改之前的時間，就先用 `new Date(date)` 複製一份，再對複本呼叫 set。數字超出該欄的範圍時會自動進位，例如 1 月 `setDate(32)` 會進到 2 月 1 日。

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

- 第一行是改之前的 15 日 10 時 20 分。接下來的 set 都改在同一個物件上，月份索引 5 讀回來是 6 月。
- `setHours` 可以一次寫入時、分、秒，接著分、秒、毫秒各自再改。
- base 保持 15 日、7 月、10 時不變；三個複本分別是明天 16 日、下個月 8 月、下一小時 11 時。
- 1 月 1 日設成 32 號，進位成 2 月 1 日。

```text
15 10 20
2027 6 20
14 5 8 250
15 16
7 8
10 11
2 1
```

{% note warning %}
**月底改月份**
把 1 月 31 日用 `setMonth` 改成 2 月，2 月沒有 31 日，會進位成 3 月 3 日（2026 年）。月底的日期加減月份時要留意。
{% endnote %}

### 時間戳記

時間戳記（timestamp）是從 1970-01-01 00:00:00 UTC 起算經過的毫秒數，這個起點稱為 Unix epoch。它是一個 number，與時區無關，所以適合比較、儲存，以及計算兩個時間相差多久。

**觀念**

- `Date.now()` 取得當下的毫秒，`getTime` 讀出某個 Date 的毫秒，`new Date(毫秒)` 把毫秒轉回 Date。
- Unix 系統與許多後端 API 的時間戳記以秒為單位，JavaScript 用毫秒：秒要乘 1000 才能放進 Date，毫秒除以 1000 再取整才是秒。
- 兩個 Date 相減，JavaScript 會先轉成毫秒再相減，結果是 number。

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

- `new Date(0)` 是 epoch。ISO 字串是 UTC 午夜，本地時間在台灣是 08:00，所以第二行是 1970 年 1 月 1 日 08:00。
- `getTime` 讀出 2026-08-01 午夜 UTC 的毫秒，下一行是執行當下，每次都不同。
- 秒乘 1000 轉回同一個 UTC 午夜，毫秒除以 1000 取整得到 Unix 的秒。
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

第二行以台灣 UTC+8 為例，括號內的時區名稱依執行環境而定。

### UTC 與時區

UTC 是協調世界時，全世界共用的基準；各地的鐘面是在這個基準上加減時差，台灣是 UTC+8，所以 UTC 的 00:00 是台灣的 08:00。Date 物件存的只是一個時間點，顯示時才依電腦時區換算，同一個時間點在不同時區的電腦上會顯示成不同的鐘面時間。

用字串建立 Date 時，有沒有寫時區，會決定這個時間點落在哪裡，這是最常見的陷阱。

**觀念**

- 字串結尾有 `Z`（代表 UTC）或 `+08:00` 這類時差，時間點就是明確的，在任何電腦上都相同。
- 只有日期的 `'2026-08-01'` 被當成 UTC 午夜，台灣的本地時間是同日 08:00。
- 有時間但沒有時差的 `'2026-08-01T12:00:00'` 被當成本地時間，在不同時區的電腦上是不同的時間點。
- `toISOString` 一律顯示 UTC；`getHours` 讀本地小時，`getUTCHours` 讀同一時間點的 UTC 小時。

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
      console.log(point.toLocaleString('zh-TW'));
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
- 只有日期的字串是 UTC 午夜，本地小時在台灣是 8。
- 沒有時差的中午是本地 12 時，轉成 UTC 是 04:00；帶 Z 的中午是 UTC 12 時，台灣本地是 20 時。

```text
Sat Aug 01 2026 12:00:00 GMT+0800 (台北標準時間)
2026/8/1 下午12:00:00
2026-08-01T04:00:00.000Z
12 4
2026-08-01T00:00:00.000Z 8
12 2026-08-01T04:00:00.000Z
20 2026-08-01T12:00:00.000Z
```

以台灣 UTC+8 為例。帶 Z 或 +08:00 的字串，ISO 輸出在任何地方都相同；沒有時差的字串，輸出會隨電腦時區改變。需要精確時，就在字串上寫明時區。

### 日期格式化

Date 本身沒有格式，要把它印給人看，用 `toLocaleString` 系列依地區與選項產生文字：本尊含日期與時間，名字中間加 Date 只有日期，加 Time 只有時間。第一個參數是語言標籤，如 zh-TW；沒傳時會跟著使用者的瀏覽器設定，不同電腦印出的文字會不同。

第二個參數是選項物件，可以指定年月日的樣貌、是否 12 小時制，以及要換算成哪個時區。同樣的選項也能交給 `Intl.DateTimeFormat`：先建立一個格式器，再套用到任意日期，需要格式化很多筆時只建立一次比較有效率。

- 年月日的樣貌可以逐項指定，也可以用現成的組合，分成 full、long、medium、short 四種長度。
- 時區用 timeZone 指定，不寫就是執行環境的本地時區。

```html 04-js/pages/66-js-date-format.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>日期格式化</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const point = new Date(2026, 7, 1, 14, 30, 45);

      console.log(point.toLocaleString('zh-TW'));
      console.log(point.toLocaleDateString('zh-TW'));
      console.log(point.toLocaleTimeString('zh-TW'));

      console.log(
        point.toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        })
      );
      console.log(point.toLocaleTimeString('zh-TW', { hour12: false }));

      const full = new Intl.DateTimeFormat('zh-TW', {
        dateStyle: 'full',
        timeStyle: 'short',
      });
      console.log(full.format(point));

      const tokyo = new Intl.DateTimeFormat('zh-TW', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        timeZone: 'Asia/Tokyo',
      });
      console.log(tokyo.format(point));
    </script>
  </body>
</html>
```

**解析**

- 前三行指定 zh-TW，分別是日期加時間、只有日期、只有時間。
- 第四行用選項取得「2026年8月1日星期六」這種完整寫法，第五行改成 24 小時制。
- `Intl.DateTimeFormat` 的 full 加 short 產生「2026年8月1日 星期六 下午2:30」，樣式與 `toLocaleString` 的選項是同一套。
- 最後指定 Asia/Tokyo 時區，台灣 14:30 換算成東京是 15:30。

```text
2026/8/1 下午2:30:45
2026/8/1
下午2:30:45
2026年8月1日星期六
14:30:45
2026年8月1日 星期六 下午2:30
2026年8月1日 下午3:30:45
```

實際文字可能因瀏覽器版本與語言資料而有細微差別，例如空白或「下午」的寫法。

### 日期計算

兩個 Date 相減得到毫秒，除以一天的毫秒數 `1000 * 60 * 60 * 24` 就換成天數。往前或往後推幾天，用 get 讀出再 set 寫回，進位會自動處理；兩個 Date 也可以直接用大於、小於符號比較先後，因為比的是毫秒。

```html 04-js/pages/66b-js-date-diff.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>日期計算</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const start = new Date(2026, 7, 1);
      const end = new Date(2026, 7, 10);
      const ms = end - start;
      console.log(ms);
      console.log(ms / (1000 * 60 * 60 * 24));

      function daysBetween(from, to) {
        return Math.round((to - from) / (1000 * 60 * 60 * 24));
      }

      console.log(daysBetween(new Date(2026, 0, 1), new Date(2026, 11, 31)));

      const deadline = new Date(2026, 7, 1);
      deadline.setDate(deadline.getDate() + 30);
      console.log(deadline.getMonth() + 1, deadline.getDate());
      console.log(new Date(2026, 7, 1) < new Date(2026, 7, 2));
    </script>
  </body>
</html>
```

**解析**

- 8 月 1 日到 8 月 10 日相差 777600000 毫秒，換成 9 天。
- 自訂的 daysBetween 多包一層 `Math.round`，避免因為日光節約時間造成一天只有 23 或 25 小時而出現小數；台灣沒有日光節約，不會遇到。
- 8 月 1 日加 30 天，讀回是 8 月 31 日。
- 最後一行比較兩個日期，8 月 1 日早於 8 月 2 日，所以是 true。

```text
777600000
9
364
8 31
true
```

{% note info %}
**Temporal 是 Date 的接班人**
Date 的月份從 0 開始、物件可變、時區處理容易出錯，所以語言新增了 Temporal 來取代它。Temporal 已進入 TC39 Stage 4，Firefox 139、Chrome／Edge 144 與 Node 26 起可直接使用，但 Safari 截至目前仍只有 Technology Preview，尚未成為 Baseline；目前的專案仍以 Date 為主，本課不教 Temporal。
{% endnote %}

### 跨年倒數

目標放在今年的 12 月 31 日 23:59:59，用現在時間去減，得到剩下的毫秒，再用 `Math.floor` 與 `%` 拆成天、時、分、秒。月份傳 11 才是 12 月。

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

- 目標用今年的年份配上 12 月 31 日 23:59:59，12 月的索引是 11。
- 差若是負的，代表時間已過，`Math.max` 把它收成 0，避免印出負數。
- 毫秒先換成秒，再用餘數依 60、60、24 取出不滿一分、一小時、一天的部分，天數是剩下的整天，不再取餘數。
- 實際數字依執行時間而定；已經過了那個時間，四個數字都會是 0。

```text
距離今年跨年還有 69 天 11 小時 38 分 49 秒
```

# 解構與展開

解構把陣列的某一格或物件的某個欄位取成變數，展開把已有的格子或欄位攤進新的陣列、新的物件或函式的引數。這一章先學解構的三種寫法，再學展開的三種用法，最後把兩者合起來，學會「不改動原資料、改交回一份新資料」的不可變更新。React 的狀態與元件參數大量依賴這幾個寫法。

## 解構賦值

解構是把「取值並命名」寫成一行：陣列看位置，物件看欄位名，函式的參數也能直接拆開傳進來的物件。解構只是多了幾個變數，原來的陣列和物件完全不受影響。

### 陣列解構

陣列解構在左邊用中括號依位置取名字，右邊放陣列。第一個名字對到索引 0，想跳過的位置留空。它常用在函式一次回傳多個值的場合，呼叫的一方用中括號把值分別接住。

**觀念**

- 左邊名字的順序就是索引的順序。
- 想跳過的位置留空，兩旁的逗號不能省。
- 函式只能回傳一個值，回傳陣列再解構，就能一次拿到兩個以上的值。

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

      // 函式回傳陣列，呼叫端用解構接住
      function getRange() {
        return [1, 10];
      }
      const [min, max] = getRange();
      console.log(min, max);
    </script>
  </body>
</html>
```

**解析**

- first 對到索引 0，second 對到索引 1。
- 兩個空位讓 third 對到索引 2，所以是京都紅葉散步。
- 長度仍是 3，解構沒有拿掉任何一格。
- getRange 回傳的陣列依序解構成 min 與 max，印出 1 和 10。

```text
台北城市漫遊
花蓮山海三日
京都紅葉散步
3
1 10
```

{% note info %}
**React 的 useState 就是陣列解構**
之後會看到 `const [count, setCount] = useState(0)`。useState 回傳一個兩格的陣列，第 0 格是目前的值，第 1 格是更新用的函式，名字由你在左邊自己取。
{% endnote %}

### 物件解構

物件解構在左邊用大括號寫欄位名，右邊放物件。對到的是名字，和寫的順序無關。欄位不存在時可以給預設值，想換一個變數名則用冒號重新命名。

**觀念**

- 大括號裡寫的是物件的欄位名。
- 冒號右邊是新的變數名，原欄位名不再是變數。
- 預設值只在取到的值是 undefined（包含沒有這個欄位）時才用上，0、空字串與 null 都會原樣留著。

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
      const tour = { title: '京都紅葉散步', place: '京都', days: 5, price: 0 };

      const { title, place } = tour;
      const { days: duration } = tour;
      const { guide = '未定', price = 999 } = tour;

      console.log(title, place);
      console.log(duration);
      console.log(guide);
      console.log(price);
    </script>
  </body>
</html>
```

**解析**

- title 與 place 直接取得欄位的值，不必寫 tour.title 與 tour.place。
- days 被改名為 duration，所以印出的是 5。
- tour 沒有 guide 欄位，預設值「未定」才用上。
- price 的值是 0，不是 undefined，所以保留 0，預設值 999 沒有出場。

```text
京都紅葉散步 京都
5
未定
0
```

### 函式參數解構

函式的參數位置也能直接寫大括號。呼叫時仍然傳入整個物件，函式裡只取需要的欄位當變數。React 的元件正是用這種寫法接收 props。

**觀念**

- 呼叫端傳的是一整顆物件，不是把欄位分開傳。
- 大括號裡沒寫到的欄位不會消失，仍留在原物件上。
- 預設值與重新命名的寫法，和物件解構相同。

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

      function label({ title, price, unit = 'NT$' }) {
        return `${title}・${unit}${price}`;
      }

      console.log(label(tour));
      console.log(tour.days);
    </script>
  </body>
</html>
```

**解析**

- label 收到整顆 tour，參數的大括號取出 title 與 price，unit 沒有傳，用預設的 NT$，接成一行字。
- days 沒有寫進參數，物件上的 days 仍是 3。

```text
台北城市漫遊・NT$12800
3
```

### 解構搭配其餘

解構時在最後面加上 `...名字`，可以把「沒被取走的剩下部分」收成一個新的陣列或物件。這和函式章教過的其餘參數是同一個寫法，只是這次用在解構的左邊，細節請回頭看 {% post_link lokiTech-15day-06-js-basics %} 的「其餘參數」。

**觀念**

- 陣列解構的其餘收成陣列，物件解構的其餘收成物件。
- 其餘一定放在最後，後面不能再有名字。
- 用物件解構的其餘，可以得到「少了某幾個欄位」的新物件。

```html 04-js/pages/70b-js-rest-destructure.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>解構搭配其餘</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const places = ['台北', '花蓮', '京都', '台南'];
      const [head, ...others] = places;
      console.log(head);
      console.log(others);

      const tour = { id: 7, title: '花蓮山海三日', days: 3, price: 15900 };
      const { id, ...info } = tour;
      console.log(id);
      console.log(info);
    </script>
  </body>
</html>
```

**解析**

- head 取走第 0 格，others 是剩下三格組成的新陣列。
- id 被取走，info 是不含 id 的新物件，原來的 tour 沒有變。

```text
台北
['花蓮', '京都', '台南']
7
{ title: '花蓮山海三日', days: 3, price: 15900 }
```

## 展開運算子

展開運算子是三個點 `...`，把已有的格子或欄位攤開。寫在中括號裡得到新陣列，寫在大括號裡得到新物件，寫在函式呼叫的引數位置則是逐個傳進參數。前兩種得到的是新的陣列或物件，不會動到原來那一份。

### 陣列展開

三個點寫在中括號裡，把另一個陣列的格子依序攤進來，結果是一個新陣列。可以在前面、中間或後面再接其他值，也可以只展開自己來複製一份。

**觀念**

- 新陣列和原陣列是兩個獨立的陣列，改其中一個不會影響另一個。
- 展開可以和其他值寫在同一對中括號裡，順序就是寫的順序。

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
      console.log(places);
      console.log(more);

      const copy = [...places];
      copy.push('高雄');
      console.log(places);
      console.log(copy);
    </script>
  </body>
</html>
```

**解析**

- more 在後面多了台南，places 仍是三個地名。
- copy 是另一份，push 高雄之後只有 copy 變長，places 沒變。

```text
['台北', '花蓮', '京都']
['台北', '花蓮', '京都', '台南']
['台北', '花蓮', '京都']
['台北', '花蓮', '京都', '高雄']
```

### 物件展開

三個點寫在大括號裡，把另一個物件的欄位攤進新物件。同名欄位以寫在後面的為準，所以「先展開，再寫要改的欄位」就是複製並覆蓋。這是淺拷貝：第一層的數字與字串是獨立的新值，但巢狀的陣列或物件仍是同一個參考。

**觀念**

- 後寫的同名欄位蓋過先攤開的，沒寫到的欄位照樣複製過去。
- 改新物件第一層的值，不會影響原物件。
- 巢狀的陣列或物件只複製了參考，兩邊看到的是同一份。

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

- discounted 的 price 被後寫的 11800 蓋過，原物件仍是 12800。
- title 沒有被改寫，所以新物件的標題還是台北城市漫遊。
- tags 是巢狀陣列，展開時複製的是參考。從新物件 push 之後，原物件的 tags 也變成兩個字串。這是淺拷貝的陷阱，後面的不可變更新會教怎麼避開。

```text
12800
11800
台北城市漫遊
['城市', '步行']
['城市', '步行']
```

{% note info %}
**整份深層複製用 structuredClone**
展開只複製第一層。連巢狀的陣列和物件都要完整複製時，用 `structuredClone(tour)`，它交回一份完全獨立的新資料。它無法複製函式，遇到時會丟出錯誤。
{% endnote %}

### 函式呼叫時展開

三個點寫在呼叫的引數位置，把陣列的格子依序送進參數。它不能單獨成一行，只能出現在中括號、大括號或引數列表裡。

**觀念**

- 陣列的第 0 格給第一個參數，後面依序對上。
- 展開是「把已有的陣列拆開」，其餘參數是「把多出來的引數收成陣列」，兩者方向相反。

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
      console.log(Math.max(...prices));
    </script>
  </body>
</html>
```

**解析**

- 展開把三個價格依序送進 a、b、c，和是 71500。
- 第二行逐個傳入，結果相同，可見展開就是省掉逐個取值的寫法。
- Math.max 本來要一個一個傳數字，展開讓它直接找出陣列裡的最大值 42800。

```text
71500
71500
42800
```

## 不可變更新

不可變更新的意思是：不修改原來的物件或陣列，而是用展開做出一份改好的新資料，再用新資料取代舊的。React 靠「新舊參考是否不同」判斷狀態有沒有改變，直接修改原資料畫面就不會更新，所以這是之後寫 React 時每天用到的寫法。

### 更新物件欄位

要改物件的一個欄位時，先展開原物件，再寫上要改的欄位，得到一個新物件。巢狀的物件也要用同樣的方式，從裡到外每一層都展開一次，不然那一層仍會共用同一個參考。

**觀念**

- 不直接寫 `obj.欄位 = 新值`，而是 `{ ...obj, 欄位: 新值 }`。
- 巢狀物件要逐層展開：外層展開之後，裡面要改的那一層也再展開一次。
- 新舊兩個物件是不同的參考，用 `===` 比較會是 false，這正是 React 看到的「有變化」。

```html 04-js/pages/73b-js-immutable-object.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>更新物件欄位</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const user = { name: 'Amy', age: 28, address: { city: '台北', zip: '100' } };

      // 改第一層欄位：展開後覆蓋 age
      const older = { ...user, age: 29 };
      console.log(user.age, older.age);
      console.log(user === older);

      // 改巢狀欄位：address 也要再展開一次
      const moved = { ...user, address: { ...user.address, city: '高雄' } };
      console.log(user.address.city);
      console.log(moved.address.city);
      console.log(moved.address.zip);
    </script>
  </body>
</html>
```

**解析**

- older 的 age 是 29，原來的 user 仍是 28。兩個物件不是同一個，比較結果是 false。
- moved 把 address 換成新物件：先展開舊的 address，再覆蓋 city。所以新物件的城市是高雄，原物件仍是台北。
- zip 沒有寫到，由展開自動帶過來，仍是 100。

```text
28 29
false
台北
高雄
100
```

### 新增與刪除陣列項目

陣列的不可變更新有三個固定寫法：新增用展開加上新項目，刪除用 filter 留下不要刪的，修改某一項用 map 逐項處理、遇到目標才換成新物件。三種寫法都交回新陣列，原陣列不動。filter 與 map 的用法在陣列方法一章已經學過。

**觀念**

- 新增：`[...list, 新項目]`，要加在前面就把新項目寫在展開前面。
- 刪除：`list.filter(...)` 留下條件成立的項目，不要的自然消失。
- 修改：`list.map(...)` 對每一項決定「原樣交回」或「交回改過的新物件」。

```html 04-js/pages/73c-js-immutable-array.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>新增與刪除陣列項目</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const todos = [
        { id: 1, text: '買牛奶', done: false },
        { id: 2, text: '寫講義', done: false },
      ];

      // 新增
      const added = [...todos, { id: 3, text: '運動', done: false }];
      console.log(added.length);

      // 刪除 id 為 1 的項目
      const removed = todos.filter((todo) => todo.id !== 1);
      console.log(removed);

      // 把 id 為 2 的項目改成完成
      const toggled = todos.map((todo) =>
        todo.id === 2 ? { ...todo, done: true } : todo,
      );
      console.log(toggled);

      console.log(todos);
    </script>
  </body>
</html>
```

**解析**

- added 有 3 筆，新項目在最後。
- removed 只剩 id 為 2 的那一筆。
- toggled 的第二筆是用展開做出的新物件，done 變成 true，第一筆原樣交回。
- 最後印出的 todos 仍是兩筆、done 都是 false，證明三次操作都沒有動到原陣列。

```text
3
[ { id: 2, text: '寫講義', done: false } ]
[ { id: 1, text: '買牛奶', done: false }, { id: 2, text: '寫講義', done: true } ]
[ { id: 1, text: '買牛奶', done: false }, { id: 2, text: '寫講義', done: false } ]
```

{% note warning %}
**push、splice、直接賦值會改到原資料**
`todos.push(...)`、`todos[0].done = true` 這類寫法直接修改原陣列或原物件。在 React 的狀態上這樣寫，畫面不會更新，要改用上面的新資料寫法。陣列的 sort 與 reverse 也會直接改原陣列，可改用回傳新陣列的 toSorted 與 toReversed。
{% endnote %}

# 選讀：錯誤處理

程式跑起來之後仍可能中斷，例如名字打錯、對這個值呼叫它沒有的方法，或數值超出範圍。中斷時 Console 會留下錯誤類型、說明與行號，讀懂它就能找到出錯的那一行。這一章先認識常見的錯誤類型與讀懂錯誤訊息，再整理除錯技巧，最後補上 finally、自訂錯誤與輸入驗證。try、catch 與 throw 的基本寫法放在 {% post_link lokiTech-15day-08-js-async %} 的錯誤處理基礎，專案會用到，所以那裡是必教，這一章直接沿用。

## 錯誤類型與訊息

錯誤發生後若沒有接住，同一支腳本在該行之後的程式不會再跑。這一節先分清楚四種常見類型，再學怎麼從 Console 的紅字讀出原因與位置。

### 常見錯誤類型

四種錯誤看名稱就能分開：每個錯誤物件都有 name（類型）與 message（這次為什麼觸發）。第一種語法錯誤在腳本開始跑之前就會被找出來，其餘三種要執行到那一行才發生。示範把能接住的三種放進 try，語法錯誤那一行只留在註解，否則整份腳本不會執行。

**觀念**

- SyntaxError：程式不符合語法，例如括號或引號沒有成對。整份腳本在執行前就停住。
- ReferenceError：用到還沒宣告的名字。
- TypeError：這個值不支援該操作，例如對數字呼叫字串方法，或對 null 讀屬性。
- RangeError：數值超出允許範圍，例如陣列長度設成負數。

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

- 註解那一行若真的寫進去，Console 只會出現一則 missing ) after argument list，下面的 try 都不會跑。
- 三個 catch 各自印出 name 與 message，最後一行出現，表示腳本沒有中斷。
- ReferenceError 的說明帶有那個不存在的名字；TypeError 指出數字 score 沒有字串方法。
- RangeError 來自長度為負的陣列。長度 0 仍是合法的空陣列，不會進這個 catch。

### 讀懂錯誤訊息

沒被接住的錯誤會以紅字停在 Console。先看類型與說明知道出了什麼事，再看行號回到腳本裡的那一行；函式一層層怎麼呼叫過來，則記錄在呼叫堆疊裡。用 try 接住之後紅字不會自動出現，要自己把類型與說明印出來，後面的程式才會繼續。

**觀念**

- 紅字要同時看類型、說明與行號：類型與說明告訴你原因，行號告訴你位置。
- error.name 是類型，error.message 是說明。
- 沒接住的紅字下方會列出呼叫堆疊（stack），由出錯點往回列出是哪些函式呼叫過來的。

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

- name 是 TypeError，message 指出無法對 null 讀取 toFixed。
- label 把 null 傳進 formatScore，出錯點在 formatScore，呼叫它的是 label，堆疊會依這個順序列出。
- 若拿掉 try，Console 會出現帶行號的紅字，「程式繼續」不會印。接住之後它仍會出現。

## 除錯技巧

紅字只告訴你結果，中間的值要自己印出來看。逐步追蹤、表格與計時都能用 console 完成；想在某一行暫停檢查變數，就在那一行寫 debugger。示範把暫停那一行放在註解裡，頁面才會一次跑完。

**觀念**

- console.log 在關鍵步驟印出目前的值，用來確認程式有走到這裡。
- console.table 把陣列或物件畫成表格；console.time 與 console.timeEnd 用同一個標籤量出耗時。
- debugger 在 DevTools 打開時會暫停，可以逐行檢查當下的變數；在 Sources 面板點行號設中斷點，效果相同而且不必改程式。
- 用常數 DEBUG 控制除錯訊息：改成 false 就全部不印，不必逐行刪除。

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

- 前三筆資料在 Console 會畫成表，欄位是 name 與 score；上面的文字表格是同一份輸出的另一種呈現。
- 帶 [DEBUG] 的那行表示函式已開始。迴圈每一圈印出索引、這一筆與累計。
- 耗時的毫秒數每次不同，上面只是某一次的結果。最後的 60 是回傳值。
- debugger 被註解，所以不會暫停。取消註解且 DevTools 開著時，會停在那一行。

## 進階錯誤處理

這一節處理 try 與 catch 之外的三件事：收尾用的 finally、自己定義的錯誤類型，以及把錯誤用在輸入驗證。它們都建立在 08 教過的 try、catch 與 throw 之上。

### finally

finally 接在 catch 後面，這次有沒有出錯都會執行，適合把收尾工作集中放在一處。就算 try 或 catch 裡已經寫了 return，收尾仍會先跑完，值才交回呼叫端，所以 Console 會先看到收尾行，再看到回傳值。

**觀念**

- 有出錯或沒出錯，finally 都會執行。
- return 不會跳過它：先執行 finally，才把值交出去。

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
- 第二筆是 null，讀屬性時出錯，catch 印出 TypeError 並準備回傳 null，finally 仍先印收尾。
- 兩次呼叫都有收尾行，表示它不看這次有沒有出錯。

### 自訂錯誤

內建的 Error 可以再分出一種自己的錯誤類型，讓 catch 能分辨「驗證失敗」與「其他問題」。做法是宣告一個繼承 Error 的類別，並把 name 改成新名字。class 與 extends 是物件導向的語法，這裡只要照著示範的樣子寫即可。

**觀念**

- 新的錯誤類別繼承 Error，建構式先用 super 傳入訊息，再設定 this.name。
- 用 instanceof 判斷接到的是不是這個類別；其他錯誤仍是一般的 Error。

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
- null 與缺少名稱都丟出 ValidationError，前面標「驗證」，並印出 name 與 message。
- 年齡為負丟的是一般 Error，前面標「其他」，instanceof 讓這兩種走進不同的分支。

### 輸入驗證

輸入驗證是在使用資料之前先檢查它。把檢查獨立寫成一個函式：通過就回傳 true，不通過就主動丟錯；呼叫端只負責接住，成功與失敗都在同一個流程裡處理。不同的問題帶不同的 name 或 message，就能分辨是哪一關沒過。

**觀念**

- 檢查函式通過時回傳 true，不通過就 throw，自己不負責印錯誤。
- 型別不對丟 TypeError；空字串或格式不對丟一般的 Error，用 message 區分。

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

- 含有 @ 的字串通過所有檢查，印出驗證成功與原信箱。
- 空字串與缺少 @ 都是 Error，兩句 message 不同；空字串在長度檢查就停住。
- 數字不是字串，name 是 TypeError。型別檢查先失敗，後面的檢查不會再跑，所以檢查的順序要由寬到細。

# 選讀：ES Module

程式變長之後，全部寫在同一支檔案會很難維護，名字也容易互相衝突。ES Module 是 ES2015 定下的模組標準：每支檔案有自己的作用域，需要分享的名字用 export 送出，另一支檔案再用 import 接進來。課程專案的 React 程式到處都是 import 與 export，但不理解這一章也能照著寫出 React，所以這裡只講必要的觀念：為什麼要拆檔、怎麼載入模組，以及具名與預設兩種匯出。

## 什麼是 ES Module

早期的頁面把好幾支 script 一路掛下去，它們共用頁面上的同一層名字。這一節說明這會帶來什麼問題、模組怎麼解決，以及瀏覽器載入模組時和一般 script 有哪些不同。

### 為什麼要拆檔

一支檔案塞滿資料與運算，改一個名字就要在很長的程式裡找；拆成多支檔案之後，每一支只負責一件事，容易閱讀也容易重複使用。

問題在於一般的 script 共用同一層名字。兩支檔案宣告了同名的 var 或函式，後載入的會蓋掉先載入的；宣告了同名的 const，則在載入時就會直接報錯。

模組解決了這個問題：每支模組檔都有自己的作用域，沒有 export 的名字留在檔案裡，別的檔案碰不到。要讓別人用，就明確送出；要使用別人的，就明確接進來，彼此的依賴一目了然。

### 載入模組

要把 JS 檔當成模組載入，script 標籤要加上 type="module"，它和一般的 script 有三個差別。

- 預設延後執行（等同 defer）：下載時不會擋住 HTML 的解析，等文件解析完才依出現的順序執行。
- 自動使用嚴格模式：例如沒有宣告就賦值會直接報錯。
- 必須透過伺服器載入：網址是 http 或 https 開頭才行。直接用檔案總管打開，網址是 file:// 開頭，在 Chrome 等瀏覽器裡模組會被 CORS 規則擋下，Console 出現類似 blocked by CORS policy 的錯誤；各家瀏覽器對 file:// 的限制不完全相同，但可靠的做法一律是用本機伺服器，例如 VS Code 的 Live Server 外掛，或之後專案用的 Vite 開發伺服器。

{% note info %}
**import 的路徑從這支檔自己算起**
同一個資料夾裡的檔案要寫 ./ 開頭的相對路徑，並且帶上副檔名 .js。漏了其中一個，模組就載不進來，後面的程式也不會跑。（Vite 等打包工具允許省略副檔名，但瀏覽器直接載入時不行。）
{% endnote %}

## 匯出與匯入

export 把名字送出去，import 再把它接進來。匯出有兩種形式：具名匯出可以有很多個，匯入時名字要對得上；預設匯出每個檔案只有一個，匯入時可以自己取名。React 元件檔常常預設匯出一個元件，所以兩種都會看到。

先用一段註解把兩種形式對照在一起，下面兩小節再各自用完整的頁面示範：

```js
// 具名匯出（可有多個）
export const a = 1;
export const b = 2;
// 具名匯入：名字要對上
import { a, b } from './x.js';

// 預設匯出（每檔至多一個）
export default function f() {}
// 預設匯入：名字自己取，不加大括號
import f from './x.js';
```

### 具名匯出與匯入

具名匯出就是在宣告前面加上 export，一支檔案可以有很多個。匯入的一方用大括號列出要用的名字，名字必須和匯出的一模一樣，對不上時 Console 會報錯。示範把陣列與函式放在資料檔，入口檔只負責匯入再印出結果。

**觀念**

- 資料檔用 export 送出名字；沒有 export 的 const 留在檔案內，其他檔案看不到。
- 入口檔的 import 路徑以它自己的位置為準，要寫 ./ 開頭與 .js 副檔名。
- 頁面只掛入口那一支 script，資料檔由 import 帶進來。

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

```text
['台北城市漫遊', '花蓮山海三日']
3
```

**解析**

- 入口檔自己沒有寫陣列，資料與函式都是從資料檔接進來的。它留下天數等於 3 的兩筆，再取出標題。
- 資料檔匯出了三筆資料，所以長度是 3。
- 若改用 file:// 直接打開頁面，這兩支檔都不會執行，Console 只會看到載入被擋下的錯誤。

{% note info %}
**改名與整包匯入**
大括號裡的 as 只改變這一支檔裡的名字，資料檔的匯出名字不變。星號寫法則把所有具名匯出收成一個物件，再用點記法取用。

```js
import { filterByDays as byDays } from './82-js-module-data.js';
import * as data from './82-js-module-data.js';

console.log(byDays(data.tours, 3));
```
{% endnote %}

### 預設匯出

預設匯出用 export default，一支檔案最多只能有一個，寫第二個會在載入時報錯。匯入時不加大括號，名字由匯入的一方自己決定。檔案主要只提供一個函式或元件時適合用預設匯出；要同時交出好幾個平起平坐的名字時，用具名匯出，呼叫的人一看大括號就知道有哪些名字。兩種可以同時存在於同一支檔案。

**觀念**

- 預設匯入沒有大括號，名字可以自取，不必和原本的函式同名。
- 預設與具名同時匯入時，預設寫在前面，具名放進大括號。

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

```text
NT$12800
TWD
```

**解析**

- formatPrice 是預設匯出，匯入時沒有大括號，名字是入口檔自己取的。
- currency 是具名匯出，所以放在大括號裡，名字必須對得上。
- 第一行把 12800 嵌進模板字串，得到 NT$12800；第二行印出貨幣代碼 TWD。
- React 元件檔常是這個形狀：預設匯出元件本身，其餘的常數或輔助函式用具名匯出。

# 回家作業

這份作業只用必教內容，資料取自專案的行程清單。起始檔已經放好八筆資料，不需要上網或安裝任何東西。課堂上不會批改，也沒有標準答案；每一題都附上完成後該看到的結果，自己對照即可。

## 起始檔與資料

作業的起始檔在練習專案的 `04-js/homework/06-homework.html`，裡面已經宣告好陣列 `tours`，每一筆行程是一個物件，欄位有編號、標題、地區、主題、天數、價格、是否精選。只有部分行程多了 `guide` 欄位，記錄領隊姓名。把程式寫在標示的位置，結果都印到 Console。

```html 04-js/homework/06-homework.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>06 回家作業</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。把你的程式寫在資料下面。</p>
    <script>
      const tours = [
        { id: 'taipei-beitou', title: '台北大稻埕與北投溫泉三日', region: '台北', theme: '城市', days: 3, price: 18600, featured: true, guide: { name: '阿凱' } },
        { id: 'keelung-jiufen', title: '基隆北海岸與九份兩日', region: '基隆', theme: '海岸', days: 2, price: 9200, featured: false },
        { id: 'hualien-taroko', title: '花蓮太魯閣與七星潭四日', region: '花蓮', theme: '山海', days: 4, price: 26800, featured: true, guide: { name: '小薇' } },
        { id: 'taitung-chishang', title: '台東池上與成功海岸三日', region: '台東', theme: '山海', days: 3, price: 21400, featured: true },
        { id: 'tainan-anping', title: '台南府城與安平兩日', region: '台南', theme: '古都', days: 2, price: 8800, featured: false },
        { id: 'kaohsiung-qijin', title: '高雄港都與旗津三日', region: '高雄', theme: '城市', days: 3, price: 14200, featured: false },
        { id: 'kinmen-villages', title: '金門聚落與戰地三日', region: '金門', theme: '離島', days: 3, price: 16800, featured: false },
        { id: 'kyoto-nara', title: '京都嵐山、伏見與奈良五日', region: '京都', theme: '日本', days: 5, price: 52800, featured: true },
      ];

      // 在這裡開始寫
    </script>
  </body>
</html>
```

## 題目

### 題目一：整理成一行文字

把每一筆行程整理成「標題｜天數 天｜NT$價格」的字串，放進新陣列，再逐行印出。原本的 `tours` 不能被改動。

完成後第一行應該是：

```text
台北大稻埕與北投溫泉三日｜3 天｜NT$18600
```

### 題目二：精選行程由便宜到貴

找出精選的行程，依價格由低到高排序，只印出標題。排序時不能改動原本的 `tours`，也就是說印完這一題之後，`tours` 的順序仍然和起始檔相同。

完成後應該依序看到：

```text
台北大稻埕與北投溫泉三日
台東池上與成功海岸三日
花蓮太魯閣與七星潭四日
京都嵐山、伏見與奈良五日
```

### 題目三：平均每天最便宜的三個地區

計算每一筆行程「價格除以天數」的四捨五入整數，找出最便宜的三筆，印出地區與每天的價格。

完成後應該看到：

```text
台南 4400
基隆 4600
高雄 4733
```

### 題目四：每種主題有幾筆行程

用陣列的累計方法，把行程依主題統計成一個物件，鍵是主題、值是筆數，最後印出這個物件。

完成後應該看到：

```text
{ 城市: 2, 海岸: 1, 山海: 2, 古都: 1, 離島: 1, 日本: 1 }
```

### 題目五：領隊姓名與預設值

為每一筆行程印出領隊姓名。沒有安排領隊的行程要顯示「尚未安排」。使用可選串連與空值合併，不要用 if 判斷。

完成後八行依序是：阿凱、尚未安排、小薇，之後五行都是尚未安排。

### 題目六：調整價格，原資料不動

寫一個函式，接收行程陣列、行程編號與新的價格，回傳一份新的陣列：只有該編號的行程價格被換掉，其他行程原封不動。用展開與陣列方法完成，不要直接修改傳進來的陣列或物件。

用 `taitung-chishang` 與 `19800` 呼叫之後，請確認兩件事：新陣列裡那一筆的價格是 19800，而原本的 `tours` 裡仍然是 21400。

# 本篇重點回顧

標題帶「選讀」的章節（閉包、Set、Map、this、Math 與 Date、錯誤處理、ES Module）可以先跳過，之後需要時再回來查。

- JavaScript 負責網頁的行為，標準名稱是 ECMAScript，本課使用 ES6 之後的現代寫法，並在 Console 觀察結果。
- 變數預設用 const，需要重新賦值才用 let；const 鎖住的是綁定，物件與陣列的內容仍可修改。
- 字串方法一律回傳新字串，不會改動原值；要把變數嵌進句子，用模板字串。
- 比較用嚴格相等，空值給預設值用 ??，多個固定選項的對照用 switch，重複的工作用 for。
- 函式用參數接收資料、用 return 交回結果；箭頭函式常拿來當作傳給其他函式的回呼。
- 陣列方法要先分清楚「會改動原陣列」和「回傳新結果」，map、filter、find、reduce 是之後處理列表資料的主力。
- 物件用欄位名稱對應到值，可能不存在的欄位用可選串連 ?. 讀取。
- 解構把陣列或物件的值拆成變數，展開用來複製與合併；更新資料時不改原物件，而是複製後改一個欄位。

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
- 真值（truthy）
- 假值（falsy）
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
- 可選串連（optional chaining）
- 點記法（dot notation）
- 識別字（identifier）
- 屬性簡寫（shorthand property）

## 選讀：內建物件

- 內建物件（built-in object）
- 四捨五入（rounding）
- 亂數（random number）
- 時區（time zone）
- 時間戳記（Unix timestamp）
- 協調世界時（UTC）
- 時差（time zone offset）
- 本地時間（local time）

## 解構與展開

- 展開運算子（spread syntax）
- 解構賦值（destructuring assignment）
- 不可變更新（immutable update）
- 淺拷貝（shallow copy）
- 深層複製（deep clone）

## 選讀：錯誤處理

- 除錯（debugging）
- 堆疊追蹤（stack trace）
- 自訂錯誤（custom error）
- 語法錯誤（syntax error）
- 錯誤物件（error object）
- 執行期錯誤（runtime error）

## 選讀：ES Module

- 模組（module）
- 匯出（export）
- 匯入（import）
- 具名匯出（named export）
- 預設匯出（default export）

