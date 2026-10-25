---
title: 'JavaScript：BOM、DOM 與事件'
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:06:00
---

![](assets/images/banner/js.png)

瀏覽器把這一頁收成物件之後，JavaScript 才碰得到畫面。這一篇從 window 與 document 開始，接著選取、改寫、建立節點，再把點擊、輸入與送出接上函式。最後用一份資料重畫清單。網路請求與瀏覽器儲存留到下一篇。

<!-- more -->

# 認識瀏覽器環境

JavaScript 在瀏覽器裡不是獨自存在，它一開始就站在分頁提供的物件上。這一章先分清瀏覽器物件模型與文件物件模型，再用一棵小樹看出文件怎麼層層包住。接著處理 script 什麼時候執行，避免程式在元素出現之前就去找它。

## BOM 與 DOM

瀏覽器物件模型（Browser Object Model）描述分頁本身，文件物件模型（Document Object Model）描述這一份 HTML。文件物件掛在分頁物件上，所以改網址與改標題是兩層不同的物件，卻從同一個起點走下去。

{% mermaid graph LR %}
windowNode["window"] --> locationNode["location"]
windowNode --> historyNode["history"]
windowNode --> navigatorNode["navigator"]
windowNode --> documentNode["document"]
{% endmermaid %}

### window 與 document

window 代表這個分頁，是瀏覽器裡的全域物件。document 是它的一個屬性，指向目前這份文件。這一節只確認兩者的關係，還不改畫面上的文字。

**觀念**

瀏覽器分頁的全域物件是 window，文件物件 document 就掛在它身上，兩種讀法拿到的是同一個物件。用 const 宣告的名字留在程式裡，不會自動變成這個全域物件的屬性。

```html 04-js/pages/85-js-window.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>window 與 document</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(window.window === window);
      console.log(document === window.document);

      const course = 'DOM';
      console.log(window.course);
    </script>
  </body>
</html>
```

**解析**

- 第一行是 true，因為全域物件的 window 屬性還是指回自己。
- 第二行是 true，直接寫 document 就是在讀 window 上的那份文件。
- course 用 const 宣告，第三行印出 undefined，它沒有被掛到 window 上。
- 舊式的 var 才會變成全域物件的屬性。這一課不使用那種宣告。

```text
true
true
undefined
```

{% note success %}
**換你試試：**
在最後再印出 `'setTimeout' in window`。確認計時器函式一開始就在全域物件上。
{% endnote %}

<details>
<summary>參考答案</summary>

setTimeout 是瀏覽器放在 window 上的函式，所以 in 的結果是 true。course 仍然不是 window 的屬性，第三行還是 undefined。

```diff 04-js/pages/85-js-window.html
  // ...
        const course = 'DOM';
        console.log(window.course);
+       console.log('setTimeout' in window);
      </script>
    </body>
  // ...
```

```text
true
true
undefined
true
```

</details>

### DOM 樹

document 裡面的標籤會組成一棵樹。html 是樹根元素，head 與 body 是它的兩個子元素，你寫在 body 裡的標題與段落再往下長。程式之後都是沿著這棵樹找到節點。

**觀念**

文件節點的最外層元素可以用 documentElement 拿到，它就是 html。head 與 body 則是 document 上現成的兩個屬性，對應樹的左右兩枝。這一節只印出標籤名，往下數子節點留到選取那一節。

{% mermaid graph TD %}
documentNode["document"] --> htmlNode["html"]
htmlNode --> headNode["head"]
htmlNode --> bodyNode["body"]
bodyNode --> mainNode["main"]
mainNode --> h1Node["h1 標題"]
mainNode --> pNode["p 段落"]
{% endmermaid %}

```html 04-js/pages/86-js-dom-tree.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM 樹</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <main>
      <h1>標題</h1>
      <p>段落</p>
    </main>
    <script>
      console.log(document.documentElement.tagName);
      console.log(document.head.tagName);
      console.log(document.body.tagName);
    </script>
  </body>
</html>
```

**解析**

- 第一行是 HTML，也就是畫面上那棵樹的根元素。
- 第二行是 HEAD，第三行是 BODY，對應 html 底下的兩枝。
- 標籤名由 tagName 讀出時是大寫。
- body 裡的 main、標題與段落已經在樹上，這一支程式還沒有走下去讀它們。

```text
HTML
HEAD
BODY
```

{% note success %}
**換你試試：**
再印出 document.title。它應是這份 HTML 的 title，也就是「DOM 樹」。
{% endnote %}

<details>
<summary>參考答案</summary>

title 是文件的標題文字，讀的是 head 裡的 title 元素。前三行的標籤名不變。

```diff 04-js/pages/86-js-dom-tree.html
  // ...
        console.log(document.head.tagName);
        console.log(document.body.tagName);
+       console.log(document.title);
      </script>
    </body>
  // ...
```

```text
HTML
HEAD
BODY
DOM 樹
```

</details>

## script 載入時機

瀏覽器由上往下讀 HTML。script 若在元素還沒被讀到時就執行，文件裡的 body 仍是 null，後面的程式就會失敗。這一節看四種做法：把 script 放在 body 尾端、加上 defer、等 DOMContentLoaded，以及模組腳本。

### 放在 body 尾端

上一篇的課堂 demo 把 script 放在 body 最後。放在最後時，前面的元素已經進到樹上，程式讀得到 body。外部檔是實務做法；為了閱讀方便，課堂 demo 把程式寫在同一份 HTML 裡。

**觀念**

瀏覽器讀到沒有 defer 的 script 會先停下來執行，再繼續往下讀 HTML。把 script 放在 body 尾端，執行當下 body 已經存在，tagName 讀得到。

```html 04-js/pages/87-js-script-end.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>script 放在 body 尾端</title>
  </head>
  <body>
    <p id="message">頁面文字</p>
    <script>
      console.log(document.body.tagName);
    </script>
  </body>
</html>
```

**解析**

- script 寫在段落後面，瀏覽器先把段落放進樹，再執行這段 script。
- document.body 已經是那個 body 元素，所以印出 BODY。
- 段落的 id 這時也已經在文件裡，只是這一支程式還沒有去選它。

```text
BODY
```

{% note success %}
**換你試試：**
把 script 移到 head，並拿掉任何 defer。程式改印 document.body 本身，確認結果是 null，頁面不要因此丟出錯誤。
{% endnote %}

<details>
<summary>參考答案</summary>

script 在 head 裡立刻執行時，瀏覽器還沒讀到 body，所以 document.body 是 null。這就是程式要嘛放在尾端、要嘛延後執行的原因。

```html 04-js/pages/87-js-script-end.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>script 放在 body 尾端</title>
    <script>
      console.log(document.body);
    </script>
  </head>
  <body>
    <p id="message">頁面文字</p>
  </body>
</html>
```

```text
null
```

</details>

### defer

外部檔可以留在 head，只要 script 帶有 src 並加上 defer。瀏覽器先下載，等整份文件解析完再依序執行，畫面就不會被一支很大的程式檔卡住。

內嵌的 script 沒有 src，寫上 defer 也不會延後。課堂 demo 為了閱讀方便把程式寫在同一份 HTML，所以這一頁把程式放在 body 尾端，執行時機和外部檔的 defer 同一類。

**觀念**

defer 只對有 src 的 script 生效，告訴瀏覽器先把 HTML 讀完再執行。多支 defer 會依照它們在文件裡的順序執行。這一頁沒有另開檔，改把同一段程式放在 body 尾端，執行時 body 已經存在。

```html 04-js/pages/88-js-defer.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>defer</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(document.body.tagName);
    </script>
  </body>
</html>
```

**解析**

- script 在段落後面，所以不會在 head 裡提前執行。
- 執行時 body 已經在樹上，印出 BODY。這和外部檔加上 defer 的時機同一類。
- 段落仍留在畫面上，程式只寫進 Console。

```text
BODY
```

{% note success %}
**換你試試：**
把 script 移到 head，不要加 defer，程式改印 `document.body`。重新整理後，Console 應出現 null。看完再移回 body 尾端。
{% endnote %}

<details>
<summary>參考答案</summary>

沒有 defer 的內嵌 script 在 head 裡會立刻執行，當時 body 還沒出現，所以印出 null。移回 body 尾端之後，才會再印出 BODY。外部檔若要留在 head，要加上 defer 才會延後。

```html 04-js/pages/88-js-defer.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>defer</title>
    <script>
      console.log(document.body);
    </script>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
  </body>
</html>
```

```text
null
```

</details>

### DOMContentLoaded

有時外部檔必須放在 head，又不能加 defer。這時改聽文件解析完成的事件，等樹建好再讀 body。事件的綁法下一章會展開，這裡先用它把執行時機延後。

**觀念**

DOMContentLoaded 在瀏覽器解析完 HTML 時發出，當時圖片可以還沒下載完。這一頁的 script 放在 head，才能在登記當下看到 body 仍是 null。其他課堂 demo 把程式放在 body 尾端。外部檔若也放在 head 又沒有 defer，同樣要等這個事件。

```html 04-js/pages/89-js-ready.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOMContentLoaded</title>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        console.log(document.body.tagName);
      });
    </script>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
  </body>
</html>
```

**解析**

- script 在 head，而且沒有 defer，所以一讀到標籤就執行到 addEventListener。
- 監聽只是先登記，函式要等文件解析完才跑，因此印出的是 BODY。
- 若在監聽外面直接讀 tagName，body 仍是 null，那一行會失敗。

```text
BODY
```

{% note success %}
**換你試試：**
在 addEventListener 之前先印出 document.body。第一行應是 null，事件裡那一行仍是 BODY。
{% endnote %}

<details>
<summary>參考答案</summary>

登記監聽的那一刻，解析還沒走到 body，所以第一行是 null。等 DOMContentLoaded 發生，第二行才印出 BODY。

```diff 04-js/pages/89-js-ready.html
  // ...
      <title>DOMContentLoaded</title>
      <script>
+       console.log(document.body);
+ 
        document.addEventListener('DOMContentLoaded', () => {
          console.log(document.body.tagName);
        // ...
```

```text
null
BODY
```

</details>

### 模組腳本

上一篇選讀把程式拆成模組時，script 要加上 type="module"。這種腳本會延後執行，就算標籤寫在 head，也會等文件解析完。

**觀念**

模組腳本預設就有 defer 的時機，而且一份檔案一個作用域。標籤放在 head 時，這支程式仍會在 body 出現之後才執行，所以讀得到 tagName。

需要 import 與 export 時必須拆成多個檔。這一頁借用同一種外部 script，其他課堂 demo 則把程式寫在同一份 HTML。

```html 04-js/pages/90-js-module.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>模組腳本</title>
    <script type="module" src="90-js-module.js"></script>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
  </body>
</html>
```

```js 04-js/pages/90-js-module.js
console.log(document.body.tagName);
```

**解析**

- type 設成 module 之後，這支檔不會在讀到標籤時立刻執行。
- 執行時文件已經解析完，所以印出 BODY。
- 這一支還沒有使用匯出與匯入，只借用模組腳本的載入時機。

```text
BODY
```

{% note success %}
**換你試試：**
拿掉 type="module"，程式改印 document.body。確認 Console 出現 null，再把模組型別加回去。
{% endnote %}

<details>
<summary>參考答案</summary>

拿掉模組型別後，head 裡的 script 會立刻執行，document.body 仍是 null。加回 type="module" 才會延後到印出 BODY。

```diff 04-js/pages/90-js-module.html
  // ...
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>模組腳本</title>
-     <script type="module" src="90-js-module.js"></script>
+     <script src="90-js-module.js"></script>
    </head>
    <body>
      // ...
```

```js 04-js/pages/90-js-module.js
console.log(document.body);
```

```text
null
```

</details>

# BOM

瀏覽器物件模型是掛在 `window` 上的物件與函式。這一章先處理網址與導覽，再看視窗、瀏覽器資訊、列印與計時。會換頁、捲動或列印的動作都包成函式，打開頁面後在 Console 自己呼叫，結果看 DevTools 的 Console。

## 認識 window

`window` 是這個分頁的全域物件。直接寫屬性名稱，就等於從它再點一次。網址、視窗與瀏覽器資訊都從這裡往下找。

### 全域物件

直接寫 `innerWidth`，讀到的就是 `window.innerWidth`，兩邊是同一個值。用 const 或 let 宣告的名字只留在自己的程式裡。底下這些物件也掛在 window 上，後面按用途拆開來用。

{% mermaid graph LR %}
windowNode["window"] --> locationNode["location"]
windowNode --> historyNode["history"]
windowNode --> navigatorNode["navigator"]
windowNode --> screenNode["screen"]
windowNode --> documentNode["document"]
{% endmermaid %}

```html 04-js/pages/91-js-global.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>全域物件</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(window.innerWidth === innerWidth);

      const label = 'bom';
      let count = 1;
      console.log(window.label);
      console.log(window.count);
    </script>
  </body>
</html>
```

```text
true
undefined
undefined
```

**解析**

- 第一行是 true。直接寫名字，與從 `window` 點出來，是同一個值。
- 後兩行是 undefined。`const` 與 `let` 不會變成全域屬性。

{% note warning %}
**const 與 let**
`const` 與 `let` 不會變成 window 的屬性。舊式的 var 才會掛上去，這一課不用。
{% endnote %}

{% note success %}
**換你試試：**
在最後印出 `typeof window.alert`。內建函式會得到 `'function'`。
{% endnote %}

<details>
<summary>參考答案</summary>

alert 一開始就掛在 window 上，所以 typeof 是 `'function'`。這一行只詢問型別，不會把對話框叫出來。label 與 count 仍然不是 window 的屬性。

```diff 04-js/pages/91-js-global.html
  // ...
        console.log(window.label);
        console.log(window.count);
+       console.log(typeof window.alert);
      </script>
    </body>
  // ...
```

```text
true
undefined
undefined
function
```

</details>

### 常用的 BOM 物件

下面常用的五個物件都掛在 `window` 上，直接寫名字就讀得到。各用一句話記它負責什麼，後面的小節再拆開使用。

- `location` 讀寫網址，也可以導向或重新載入。
- `history` 在瀏覽紀錄裡返回、前進，或改寫目前這一筆。
- `navigator` 讀語言與連線，也可以寫入剪貼簿。
- `screen` 讀整塊螢幕的寬高，不隨視窗拉窄而變。
- `document` 指向這一份 HTML，改內容留到下一章。

列印、捲動與計時不是獨立物件，而是 window 上的函式，後面各有一節。

## 網址與導覽

`location` 管網址列現在的內容，`history` 管這個分頁走過的紀錄。先讀出網址的各段，再決定要導向、重新載入，或在紀錄之間往返。不重新載入也能改網址的寫法放在選讀。

### 讀取網址（location）

一個網址由協定、主機、路徑、查詢字串與 hash 組成。`location` 把每一段拆成屬性，讀出來就能判斷目前在哪一頁、帶了什麼參數。

- `href` 回傳完整網址。
- `origin` 回傳協定、主機與連接埠。
- `protocol` 回傳協定，會帶著最後的冒號。
- `host` 回傳主機與連接埠。
- `pathname` 回傳路徑。
- `search` 回傳問號開頭的查詢字串，沒有時是空字串。
- `hash` 回傳井字號開頭的片段，沒有時是空字串。

```html 04-js/pages/92-js-location.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>讀取網址</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(location.href);
      console.log(location.origin);
      console.log(location.protocol);
      console.log(location.host);
      console.log(location.pathname);
      console.log(location.search);
      console.log(location.hash);
    </script>
  </body>
</html>
```

在網址後面加上 `?page=2#top` 再重新整理，Console 會多出查詢字串與片段：

```text
http://127.0.0.1:5500/01-html-css-js/04-js/pages/92-js-location.html?page=2#top
http://127.0.0.1:5500
http:
127.0.0.1:5500
/01-html-css-js/04-js/pages/92-js-location.html
?page=2
#top
```

**解析**

- 第一行是完整網址，後面幾行是把它拆開的結果，用 Live Server 開啟與直接開檔時，協定和主機會不同。
- search 包含開頭的問號，hash 包含開頭的井字號，沒有這兩段時都是空字串。
- 這支程式只有讀取，沒有改任何屬性，所以頁面不會跳走。

{% note info %}
查詢字串若要取出單一參數，可以用 `new URLSearchParams(location.search).get('page')`，會得到字串 `'2'`。
{% endnote %}

{% note success %}
**換你試試：**
指定 `location.hash = 'next'` 後再印一次 location.hash，確認網址列只多了 `#next`，頁面沒有整頁重新載入。
{% endnote %}

<details>
<summary>參考答案</summary>

指定 hash 時不必自己加井字號，瀏覽器會補上，所以印出 `#next`。改 hash 只是移到同一份文件的片段，不會向伺服器重新要一整頁。

```diff 04-js/pages/92-js-location.html
  // ...
      <p>結果在 DevTools 的 Console。</p>
      <script>
-       console.log(location.href);
-       console.log(location.origin);
-       console.log(location.protocol);
-       console.log(location.host);
-       console.log(location.pathname);
-       console.log(location.search);
        console.log(location.hash);
+       location.hash = 'next';
+       console.log(location.hash);
      </script>
    </body>
  // ...
```

```text

#next
```

</details>

### 導向與重新載入（location）

要用程式換頁時，可以指定 `location.href`，或呼叫 assign、replace 這兩個方法。href 與 assign 效果相同，都會在瀏覽紀錄新增一筆，使用者按「上一頁」可以回到原頁；replace 則用新網址取代目前這一筆紀錄，原頁就回不去了。reload 不換網址，只是把目前這一頁重新載入。

- 指定 `href` 會導向並新增一筆紀錄。
- `assign` 同樣導向並新增一筆紀錄，上一頁可以回來。
- `replace` 導向並取代目前紀錄，上一頁回不到原頁。
- `reload` 重新載入目前這一頁，不換網址。

導向會讓頁面立刻離開，如果直接寫在檔案裡，一開頁就會跳走。所以這個範例把每種寫法包成函式，打開頁面後在 Console 自己呼叫。

```html 04-js/pages/93-js-redirect.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>導向與重新載入</title>
  </head>
  <body>
    <p>在 DevTools 的 Console 呼叫 goAssign()、goReplace() 或 reloadPage()。</p>
    <script>
      const target = '92-js-location.html';

      const goAssign = () => {
        location.assign(target);
      };

      const goReplace = () => {
        location.replace(target);
      };

      const reloadPage = () => {
        location.reload();
      };

      console.log('目前頁面：', location.pathname);
    </script>
  </body>
</html>
```

**解析**

- 在 Console 輸入 `goAssign()` 會跳到 92 號頁面，按上一頁可以回到這一頁。
- 重新打開這一頁再輸入 `goReplace()`，同樣跳到 92 號頁面，但按上一頁會跳過這一頁，回到更早的頁面。
- `reloadPage()` 不換網址，Console 會被清空並重新印出目前頁面。
- 三種寫法都包在函式裡，只有呼叫時才會導向，頁面打開時不會自己跳走。

{% note info %}
登入成功後要讓使用者能回上一頁時用 assign；導向錯誤頁或登入檢查失敗時用 replace，避免使用者按上一頁又回到不該停留的頁面。
{% endnote %}

{% note success %}
**換你試試：**
新增一個 `goHref` 函式，用指定 location.href 的方式導向同一個目標，並確認它跟 goAssign 一樣可以按上一頁回來。
{% endnote %}

<details>
<summary>參考答案</summary>

指定 href 與呼叫 assign 都會新增一筆瀏覽紀錄，所以兩者按上一頁的結果相同。

```diff 04-js/pages/93-js-redirect.html
  // ...
          location.replace(target);
        };
  
+       const goHref = () => {
+         location.href = target;
+       };
+ 
        const reloadPage = () => {
          location.reload();
        // ...
```

</details>

### 返回與前進（history）

`back` 回到上一筆紀錄，`forward` 前往下一筆。相對步數交給 go，筆數看 length，四個都在 history 上。這一節用網址片段造出幾筆紀錄，再從 Console 呼叫函式來往返。

- `back` 回到上一筆，不回傳有用的值。
- `forward` 前往下一筆，不回傳有用的值。
- `go` 依整數步數移動，負數往回、正數往前，0 會重新載入。
- `length` 回傳紀錄筆數。步數超出範圍時，頁面留在原地，筆數也不增加。

{% mermaid graph LR %}
olderNode["更早的紀錄<br/>back"] --> nowNode["目前這一筆"]
nowNode --> newerNode["下一筆<br/>forward"]
{% endmermaid %}

```html 04-js/pages/94-js-history.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>返回與前進</title>
  </head>
  <body>
    <p>在 DevTools 的 Console 呼叫 showPlace()、goBack()、goForward() 或 goSteps(步數)。</p>
    <script>
      if (location.hash === '') {
        location.hash = 'one';
        location.hash = 'two';
        location.hash = 'three';
      }

      const showPlace = () => {
        console.log(location.hash);
        console.log(history.length);
      };

      const goBack = () => {
        history.back();
      };

      const goForward = () => {
        history.forward();
      };

      const goSteps = (step) => {
        history.go(step);
      };

      showPlace();
    </script>
  </body>
</html>
```

空白分頁直接打開時，Console 是：

```text
#three
4
```

從練習選單點進來時，`length` 會把更早的頁面算進去，數字比 4 大。三段片段仍各加一筆。

呼叫 goBack()，等網址變成 `#two`，再呼叫 showPlace()：

```text
#two
4
```

**解析**

- 片段還是空的時候才連寫 one、two、three，瀏覽器會補上井字號，停在 `#three`。
- 空白分頁的第一筆是打開這一頁，再加上三段片段，所以 `length` 是 4。
- `goBack` 與 `goSteps` 不會在同一輪立刻改掉網址。等網址變了再呼叫 showPlace。
- 往返只在既有紀錄裡移動，length 維持原數字。`go(0)` 才會重新載入。
- 重新載入後網址仍帶著片段，if 就不會再累加。`go(20)` 這種超出範圍的步數會停在原頁。

{% note success %}
**換你試試：**
在 if 裡再加一段，把 hash 設成 `'four'`。先把網址列的井字號與後面的字刪掉再重新整理。

然後呼叫 goSteps(-1)，等網址變了再 showPlace，片段是 `#three`。
{% endnote %}

<details>
<summary>參考答案</summary>

多寫一段 four 之後，空白分頁的 length 變成 5，停在 `#four`。goSteps(-1) 回到 `#three`，筆數仍是 5。網址已經帶有片段時，if 不會重跑，所以要先清掉井字號再重新整理。

```diff 04-js/pages/94-js-history.html
  // ...
          location.hash = 'two';
          location.hash = 'three';
+         location.hash = 'four';
        }
  
        const showPlace = () => {
          // ...
```

載入時：

```text
#four
5
```

呼叫 goSteps(-1)，等網址變了再呼叫 showPlace()：

```text
#three
5
```

</details>

### 選讀：pushState 與 replaceState

`pushState` 多加一筆紀錄，並帶上一小包資料，文件不會重新載入。`replaceState` 改的是目前這一筆，筆數不增加。

- `pushState` 多加一筆紀錄並寫入 state，文件不重新載入。
- `replaceState` 改寫目前這一筆，筆數不增加。
- 第一個引數會變成 `history.state`，還沒寫過時是 null。
- 第二個引數是標題，現在的瀏覽器不用，傳空字串。
- 第三個引數是新的網址片段。

```html 04-js/pages/95-js-state.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：pushState 與 replaceState</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      history.pushState({ page: 1 }, '', '#one');
      console.log(history.state.page);
      console.log(location.hash);

      history.replaceState({ page: 1, note: 'replaced' }, '', '#one');
      console.log(history.state.note);
      console.log(history.length);
    </script>
  </body>
</html>
```

空白分頁直接打開時：

```text
1
#one
replaced
2
```

從選單進來時，最後一行會把更早的頁面算進去。`replaceState` 不會讓這個數字再加 1。

**解析**

- `pushState` 讓網址片段變成 `#one`，state 的 page 是 1，文件沒有整頁重載。
- `replaceState` 改掉目前這一筆的 state，所以接著印出 replaced，筆數停在原地。
- 按上一頁時瀏覽器會發出 `popstate`。這一節先不監聽。

{% note success %}
**換你試試：**
再 pushState 一筆 page 為 2 的資料，片段用 `#two`，然後印出 `history.state.page` 與 history.length。最後的 page 是 2，筆數比剛才多 1。
{% endnote %}

<details>
<summary>參考答案</summary>

第二次 pushState 變成目前這一筆，所以 page 是 2。空白分頁上，replace 之後的筆數是 2，再 push 一次變成 3。

```diff 04-js/pages/95-js-state.html
  // ...
        console.log(history.state.note);
        console.log(history.length);
+ 
+       history.pushState({ page: 2 }, '', '#two');
+       console.log(history.state.page);
+       console.log(history.length);
      </script>
    </body>
  // ...
```

```text
1
#one
replaced
2
2
3
```

</details>

## 視窗與畫面

這一節看視窗、螢幕與捲動。尺寸先印在一起對照，捲動再另外改位置。系統深色與寬度斷點留在選讀。

### 視窗與螢幕尺寸

視窗內部的尺寸會跟著拉動邊緣改變，整塊螢幕的像素則維持不變。內部寬高與像素比在 `window` 上，螢幕寬高在 `screen` 上。兩組數字放在同一份輸出，才看得出差別。

- `innerWidth` 與 `innerHeight` 是視窗內部可排版的寬高，不含四周工具列。
- `outerWidth` 是外框寬度。側邊沒有捲軸時，它可能與內部寬相同。
- `screen.width` 是整塊螢幕的寬，不隨視窗拉窄而變。`availWidth` 再扣掉系統工作列。
- `devicePixelRatio` 是一個 CSS 像素對應幾個實體像素。高密度螢幕常見 2，一般螢幕常是 1。

```html 04-js/pages/96-js-size.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>視窗與螢幕尺寸</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(innerWidth);
      console.log(innerHeight);
      console.log(outerWidth);
      console.log(screen.width);
      console.log(screen.availWidth);
      console.log(devicePixelRatio);
    </script>
  </body>
</html>
```

下面是某一種視窗與螢幕的例子，實際數字以你的裝置為準：

```text
1185
800
1200
1440
1440
2
```

**解析**

- 前兩行是視窗內部的寬與高。拉動視窗邊緣後重新整理，這兩個數字會變。
- 第三行是外框寬度。頁面還沒有高到出現捲軸時，它常與第一行相同。
- 第四行是整塊螢幕的寬。把瀏覽器拉窄再重新整理，它仍維持螢幕大小。
- 第五行是扣掉系統工作列之後的可用寬度，不會大於螢幕寬。
- 最後一行是 `devicePixelRatio`。它掛在 window 上，直接寫名字即可。

{% note success %}
**換你試試：**
再印出 `outerHeight` 與 `screen.height`。含工具列時外框高度通常更大，螢幕高度則不隨視窗拉窄而變。
{% endnote %}

<details>
<summary>參考答案</summary>

outerHeight 把工具列算進視窗高度，所以通常大於 innerHeight。screen.height 是整塊螢幕的高，不隨視窗拉窄而變。前六行仍是內部寬高、外框寬、螢幕寬、可用寬與像素比。

```diff 04-js/pages/96-js-size.html
  // ...
        console.log(screen.availWidth);
        console.log(devicePixelRatio);
+       console.log(outerHeight);
+       console.log(screen.height);
      </script>
    </body>
  // ...
```

```text
1185
800
1200
1440
1440
2
900
900
```

</details>

### 捲動位置

捲動距離放在 `scrollX` 與 `scrollY`，單位是像素，停在最左上角時兩個都是 0。要改位置就用 scrollTo 或 scrollBy。這兩個方法掛在 window 上，包成函式後在 Console 呼叫，頁面才會動。

- `scrollX` 與 `scrollY` 回傳目前捲動的像素，停在左上角時都是 0。
- `scrollTo` 移到指定的 top 與 left，不回傳有用的值。
- `scrollBy` 在目前位置上再加一段距離，也不回傳有用的值。
- 選項 behavior 設成 smooth 就是平滑，設成 auto 就是立刻跳。

{% mermaid graph LR %}
topNode["scrollY 為 0"] --> downNode["scrollBy 往下加"]
downNode --> backNode["scrollTo 回到 0"]
{% endmermaid %}

```html 04-js/pages/97-js-scroll.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>捲動位置</title>
  </head>
  <body>
    <p>在 DevTools 的 Console 呼叫 showScroll()、scrollDown() 或 scrollTop()。</p>
    <div style="height: 1800px"></div>
    <p>頁面底部</p>
    <script>
      const showScroll = () => {
        console.log(scrollX);
        console.log(scrollY);
      };

      const scrollDown = () => {
        scrollBy({ top: 400, left: 0, behavior: 'smooth' });
      };

      const scrollTop = () => {
        scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      };

      showScroll();
    </script>
  </body>
</html>
```

頁面載入時：

```text
0
0
```

呼叫 scrollDown()，等捲動停下來再呼叫 showScroll()：

```text
0
400
```

**解析**

- 載入時頁面在最上方，所以 scrollX 與 scrollY 都是 0。
- `scrollDown` 用 scrollBy 往下加 400，`behavior` 是平滑。
- 平滑捲動還沒停時就印位置，scrollY 仍可能是 0。等它停了再呼叫 showScroll。
- `scrollTop` 用 scrollTo 回到左上角，同樣是平滑移動。

{% note success %}
**換你試試：**
把下移距離從 400 改成 800。等捲動停下來再看 `scrollY`，約是 800。
{% endnote %}

<details>
<summary>參考答案</summary>

scrollBy 的 top 改成 800 之後，停下來的垂直距離約是 800。scrollTop 仍回到 0。

```diff 04-js/pages/97-js-scroll.html
  // ...
        };
  
        const scrollDown = () => {
-         scrollBy({ top: 400, left: 0, behavior: 'smooth' });
+         scrollBy({ top: 800, left: 0, behavior: 'smooth' });
        };
  
        const scrollTop = () => {
          // ...
```

```text
0
800
```

</details>

### 選讀：媒體查詢與深色模式

`matchMedia` 讀的是瀏覽器目前是否符合某段媒體查詢。`(prefers-color-scheme: dark)` 用來問系統是不是深色。

直接寫名字就等於 `window.matchMedia`，寬度斷點也用同一種問法。

- `matchMedia` 回傳一份查詢結果，不是布林。
- `matches` 回傳目前是否符合，符合是 true，不符合是 false。

```html 04-js/pages/98-js-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：媒體查詢與深色模式</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      console.log(darkQuery.matches);

      const wideQuery = matchMedia('(min-width: 800px)');
      console.log(wideQuery.matches);
    </script>
  </body>
</html>
```

系統是淺色、視窗寬過 800 像素時：

```text
false
true
```

**解析**

- `window.matchMedia` 與直接寫名字是同一個函式。
- 回傳的是查詢結果，不是布林。`matches` 才是目前是否符合。
- 系統是淺色時第一行是 false。視窗寬過 800 像素時，第二行是 true。
- 改了系統深色或把視窗拉窄之後，要重新整理才會換成新的結果。
- 這一節不監聽偏好的後續變化。

{% note success %}
**換你試試：**
再讀 `(max-width: 600px)`。視窗比 600 像素窄時，這一列是 true。
{% endnote %}

<details>
<summary>參考答案</summary>

第三段問的是視窗是否夠窄。寬過 800 像素時，最小寬度那列是 true，最大寬度 600 那列是 false。把視窗拉窄到 600 以下再重新整理，後兩列會對調。

```diff 04-js/pages/98-js-media.html
  // ...
        const wideQuery = matchMedia('(min-width: 800px)');
        console.log(wideQuery.matches);
+ 
+       const narrowQuery = matchMedia('(max-width: 600px)');
+       console.log(narrowQuery.matches);
      </script>
    </body>
  // ...
```

```text
false
true
false
```

</details>

## 選讀：瀏覽器資訊

`navigator` 提供語言、連線與識別字串，剪貼簿也從這個物件寫入。整節都是選讀，做完網址與視窗再看即可。

### 語言與連線（navigator）

`navigator.language` 是瀏覽器偏好的語言，`navigator.onLine` 表示瀏覽器是否認為目前有網路。這一節只讀這些值，不改瀏覽器的設定。

- `language` 回傳偏好語言的字串，繁體中文環境常見 zh-TW。
- `languages` 回傳偏好語言清單，第一個多半與 language 相同。
- `onLine` 回傳瀏覽器是否認為有網路，型別是布林。
- `userAgent` 回傳一長串識別文字，內容會隨版本改變。

```html 04-js/pages/99-js-navigator.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>語言與連線</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(navigator.language);
      console.log(navigator.onLine);
      console.log(navigator.userAgent);
    </script>
  </body>
</html>
```

下面是一台 Mac 上的 Chrome、繁體中文、目前有網路的例子。第三行的版本號會依你的瀏覽器不同：

```text
zh-TW
true
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
```

**解析**

- 第一行是偏好語言。繁體中文的環境常見 `zh-TW`。
- 第二行在瀏覽器認為有網路時是 `true`。它代表瀏覽器眼中的連線狀態。
- 第三行是 `userAgent`，中文叫使用者代理字串。瀏覽器每次向伺服器要網頁時，都會附上這串文字自我介紹，JS 也讀得到同一串。

這串文字由幾段組成，從左到右大致是：

- `Mozilla/5.0` 是早年留下的開頭。現在幾乎所有瀏覽器都這樣寫，已經沒有實際意義。
- 括號裡的 `Macintosh; Intel Mac OS X 10_15_7` 是作業系統。Windows 會寫成 Windows NT 10.0，手機會出現 iPhone 或 Android。
- `AppleWebKit/537.36 (KHTML, like Gecko)` 是排版引擎。寫「像 Gecko」是為了讓只認 Firefox 的舊網站也願意給正常版面。
- `Chrome/141.0.0.0` 才是真正的瀏覽器與版本。
- 結尾的 `Safari/537.36` 也是為了相容舊網站而加上的，並不代表你在用 Safari。

所以同一串裡同時出現 Mozilla、Gecko、Chrome、Safari，是瀏覽器互相模仿留下的歷史包袱。近年瀏覽器還會刻意把部分資訊固定住，例如較新的 macOS 也一律寫成 10_15_7，版本號後面幾位也常被歸零，避免被拿來追蹤使用者。

{% note warning %}
**識別字串不可靠**
`userAgent` 適合拿來看看，不適合拿來寫判斷，因為內容會變、還會互相模仿，猜錯的機率很高。想知道某個功能能不能用，與其猜「這是哪一種瀏覽器」，不如直接檢查那個功能存不存在，例如寫 `if (navigator.clipboard)`：有就使用，沒有就改用別的做法。這種寫法叫做功能偵測。
{% endnote %}

{% note success %}
**換你試試：**
再印出 `navigator.languages[0]`。它多半與第一行相同。
{% endnote %}

<details>
<summary>參考答案</summary>

languages 是偏好語言的清單，第一個多半就是 language。最後一行仍是那串識別文字。

```diff 04-js/pages/99-js-navigator.html
  // ...
        console.log(navigator.onLine);
        console.log(navigator.userAgent);
+       console.log(navigator.languages[0]);
      </script>
    </body>
  // ...
```

```text
zh-TW
true
Mozilla/5.0 ...
zh-TW
```

</details>

### 寫入剪貼簿

剪貼簿是 `navigator.clipboard`，寫入用 `writeText`。呼叫包成函式，在 Console 執行。

它回傳 Promise，成功時用 `.then` 接下一行，Promise 的細節在下一篇。

```html 04-js/pages/100-js-clipboard.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>寫入剪貼簿</title>
  </head>
  <body>
    <p>在 DevTools 的 Console 呼叫 copyText()。</p>
    <script>
      const copyText = () => {
        navigator.clipboard.writeText('BOM').then(() => {
          console.log('已複製');
        });
      };

      console.log('呼叫 copyText()');
    </script>
  </body>
</html>
```

載入時先印出提示。在 localhost 呼叫 copyText() 且成功時，會再多一行：

```text
呼叫 copyText()
已複製
```

**解析**

- 頁面打開時只印出提示，不會自己寫進剪貼簿。
- 寫入的文字是 BOM，成功後 `.then` 才印已複製。
- 第二行要比第一行晚出現，因為要等 Promise 完成。

{% note info %}
**安全連線與 Promise**
`writeText` 要在 https 或 localhost 下使用，Live Server 的 127.0.0.1 算 localhost。Promise 的寫法見 {% post_link lokiTech-15day-08-js-async %}。從 Console 呼叫時若出現錯誤，多半是網址不在安全連線，或瀏覽器還要求一次點擊。
{% endnote %}

{% note success %}
**換你試試：**
把寫入的文字改成 `'history'`，成功時改印 `已寫入`。
{% endnote %}

<details>
<summary>參考答案</summary>

writeText 的引數改成 history，then 裡的文字改成已寫入。呼叫方式仍是 copyText()。

```diff 04-js/pages/100-js-clipboard.html
  // ...
      <script>
        const copyText = () => {
-         navigator.clipboard.writeText('BOM').then(() => {
-           console.log('已複製');
+         navigator.clipboard.writeText('history').then(() => {
+           console.log('已寫入');
          });
        };
        // ...
```

```text
呼叫 copyText()
已寫入
```

</details>

## 列印與對話框

`print` 會打開系統的列印對話框。確認、警示與輸入是另外三個會把程式停住的函式，詳細做法在前一篇。這一節先講列印，再簡單列出另外三個。

### 列印

`print` 是 window 的方法，會打開列印對話框，預設印出目前這一頁。對話框關掉之前，函式裡的下一行不會跑。若直接寫在檔案最外層，一開頁就會跳出，所以包成函式再從 Console 呼叫。

```html 04-js/pages/101-js-print.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>列印</title>
  </head>
  <body>
    <p>在 DevTools 的 Console 呼叫 printPage()。</p>
    <script>
      const printPage = () => {
        print();
      };

      console.log('呼叫 printPage() 會打開列印對話框');
    </script>
  </body>
</html>
```

```text
呼叫 printPage() 會打開列印對話框
```

**解析**

- 頁面打開時只印出提示，不會自己跳出列印。
- 在 Console 呼叫 `printPage` 才會打開對話框。
- 按取消就回到這一頁，網址與文件都留在原地。

{% note success %}
**換你試試：**
在 `print` 前後各印「列印之前」和「列印之後」。關掉對話框才看得到第二句。
{% endnote %}

<details>
<summary>參考答案</summary>

print 會停住這個分頁。先印出「列印之前」，對話框關掉之後才印「列印之後」。載入時的那行提示仍然先出現。

```diff 04-js/pages/101-js-print.html
  // ...
      <script>
        const printPage = () => {
+         console.log('列印之前');
          print();
+         console.log('列印之後');
        };
  
        console.log('呼叫 printPage() 會打開列印對話框');
      // ...
```

呼叫 printPage() 並關掉對話框之後：

```text
呼叫 printPage() 會打開列印對話框
列印之前
列印之後
```

</details>

{% note info %}
**另開視窗**
`window.open` 會開出新分頁或新視窗。呼叫當下若沒有使用者的點擊，瀏覽器通常會把這個視窗擋下來。
{% endnote %}

### alert、confirm 與 prompt

這三個函式在 {% post_link lokiTech-15day-06-js-basics %} 已經看過完整示範。這裡只記用途、回傳值，以及它們會把程式停住。三者都掛在 window 上。

- `alert` 只顯示訊息，按掉之後回傳 `undefined`。
- `confirm` 讓人選確定或取消，回傳 true 或 false。
- `prompt` 回傳輸入的字串，按取消得到 `null`。

對話框關掉之前，函式裡的下一行不會跑，頁面的點擊也一起停。所以可以先用 `confirm` 問過，再決定要不要呼叫 `print`。

```html 04-js/pages/102-js-confirm.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>alert、confirm 與 prompt</title>
  </head>
  <body>
    <p>在 DevTools 的 Console 呼叫 printIfConfirmed()。</p>
    <script>
      const printIfConfirmed = () => {
        const ok = confirm('要列印這一頁嗎');
        console.log(ok);
        if (ok) {
          print();
        }
      };

      console.log('呼叫 printIfConfirmed()');
    </script>
  </body>
</html>
```

載入時只印出提示。呼叫 printIfConfirmed() 之後要先關掉確認框，才看得到 true 或 false：

```text
呼叫 printIfConfirmed()
true
```

**解析**

- 頁面打開時只印出提示，不會自己跳出確認或列印。
- `confirm` 會停住這個分頁。印出 ok 的那一行要等對話框關掉才出現。
- 按確定時 ok 是 true，接著才呼叫 print。按取消時是 false，不會列印。
- 按取消就回到這一頁，網址與文件都留在原地。

{% note success %}
**換你試試：**
按取消時改印「已取消」，按確定仍開啟列印。不要再印出 ok。
{% endnote %}

<details>
<summary>參考答案</summary>

按取消才走進 else，印出已取消，並且不會列印。按確定仍呼叫 print，Console 不會多出已取消。載入時的提示還是先出現。

```diff 04-js/pages/102-js-confirm.html
  // ...
        const printIfConfirmed = () => {
          const ok = confirm('要列印這一頁嗎');
-         console.log(ok);
          if (ok) {
            print();
+         } else {
+           console.log('已取消');
          }
        };
        // ...
```

按取消並關掉對話框之後：

```text
呼叫 printIfConfirmed()
已取消
```

</details>

## 計時器

計時器把函式排進稍後的工作，程式不會停在那一行乾等。setTimeout 做一次，setInterval 每隔一段做一次。兩者都回傳識別碼，要取消就交給對應的 clear 函式。這一節先把結果印在 Console。選讀再看 `requestAnimationFrame`，它對齊下一次畫面更新。

- `setTimeout` 排程一次，回傳識別碼，交給 `clearTimeout` 取消。
- `setInterval` 依間隔重複，回傳的識別碼交給 `clearInterval`。

{% note info %}
**時間只保證不會更早**
延遲的毫秒是下限。分頁切到背景時，瀏覽器可能把計時器拖得更晚。
{% endnote %}

### setTimeout 與 clearTimeout

setTimeout 登記一次工作。還沒到點就可以用回傳的識別碼取消；到點之後再取消也不會拋錯，只是工作已經做完。

- `setTimeout` 登記一次函式，至少等待第二個引數的毫秒，回傳識別碼。
- `clearTimeout` 用那個識別碼取消。識別碼對不上時，什麼都不會發生。

{% mermaid graph LR %}
setNode["setTimeout"] --> idNode["識別碼"]
idNode --> clearNode["clearTimeout 取消"]
idNode --> runNode["到點執行"]
{% endmermaid %}

**觀念**

setTimeout 的第一個引數是到點要呼叫的函式，第二個是至少等待的毫秒。回傳值交給 clearTimeout 就會取消這一次。識別碼要留在變數裡，臨時寫出來的計時器沒有名字可取消。

```html 04-js/pages/103-js-timeout.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>setTimeout 與 clearTimeout</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const pending = setTimeout(() => {
        console.log('這句不該出現');
      }, 500);
      clearTimeout(pending);

      setTimeout(() => {
        console.log('一秒後');
      }, 1000);
    </script>
  </body>
</html>
```

**解析**

- pending 那次在 500 毫秒前就被取消，Console 不會出現「這句不該出現」。
- 第二個計時器沒有取消，大約一秒後印出「一秒後」。
- 兩次呼叫各自有識別碼，clearTimeout 只會取消你交出去的那一個。
- 頁面上的說明文字保持原樣，結果只在 Console。

```text
一秒後
```

{% note success %}
**換你試試：**
把第二個延遲改成 2000，印出的文字改成「兩秒後」。被取消的那句仍然不可以出現。
{% endnote %}

<details>
<summary>參考答案</summary>

clearTimeout 仍拿 pending 的識別碼，所以 500 毫秒那次不會執行。留下的計時器等兩秒，印出「兩秒後」。

```diff 04-js/pages/103-js-timeout.html
  // ...
        clearTimeout(pending);
  
        setTimeout(() => {
-         console.log('一秒後');
-       }, 1000);
+         console.log('兩秒後');
+       }, 2000);
      </script>
    </body>
  // ...
```

```text
兩秒後
```

</details>

### setInterval 與 clearInterval

setInterval 會依間隔重複呼叫，直到你清除它。回傳的識別碼要交給 clearInterval，不能拿去給 clearTimeout 用在語意上雖然多半仍能停，課堂仍配對使用，避免之後讀程式的人看錯。

- `setInterval` 依間隔重複呼叫函式，回傳識別碼。
- `clearInterval` 用那個識別碼停下。課堂把 set 與 clear 配成同一對。

**觀念**

間隔函式裡要自己決定何時停。把 setInterval 的回傳值留在變數，數到目標就 clearInterval。沒有清除的間隔會一直佔著這個分頁。

```html 04-js/pages/104-js-interval.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>setInterval 與 clearInterval</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      let count = 0;

      const id = setInterval(() => {
        count += 1;
        console.log(count);
        if (count === 3) {
          clearInterval(id);
          console.log('已停止');
        }
      }, 400);
    </script>
  </body>
</html>
```

**解析**

- count 用 let，因為每次間隔都要加 1。
- 大約每 400 毫秒印出 1、2、3。
- 數到 3 時用同一個 id 清除，後面不再繼續加。
- 「已停止」印出之後，這個間隔就結束了。

```text
1
2
3
已停止
```

{% note success %}
**換你試試：**
改成數到 5 才 clearInterval，停止訊息仍印在最後一個數字後面。
{% endnote %}

<details>
<summary>參考答案</summary>

條件改成 5 之後，間隔會多跑兩次才清除。識別碼仍是同一個 id。

```diff 04-js/pages/104-js-interval.html
  // ...
          count += 1;
          console.log(count);
-         if (count === 3) {
+         if (count === 5) {
            clearInterval(id);
            console.log('已停止');
          // ...
```

```text
1
2
3
4
5
已停止
```

</details>

### 選讀：requestAnimationFrame

`requestAnimationFrame` 把函式排到下一次畫面更新，並回傳識別碼。`cancelAnimationFrame` 用這個識別碼取消。它只排一次，這一節不在回呼裡再排下一次。

- `requestAnimationFrame` 把函式排到下一次畫面更新，回傳識別碼。
- `cancelAnimationFrame` 用那個識別碼取消這一次。

```html 04-js/pages/105-js-frame.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：requestAnimationFrame</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const id = requestAnimationFrame(() => {
        console.log('下一幀');
      });
      console.log('已預約', id);
    </script>
  </body>
</html>
```

第一行的數字是識別碼，每次可能不同。重點是它比下一幀更早出現。

```text
已預約 1
下一幀
```

**解析**

- 同步的那行先印出識別碼，回呼裡的文字等下一次畫面更新才出現。
- 識別碼交給 `cancelAnimationFrame` 就能取消這一次。
- 這一節只預約一幀。

{% note success %}
**換你試試：**
用 `cancelAnimationFrame` 取消剛才的識別碼，讓下一幀不會出現。
{% endnote %}

<details>
<summary>參考答案</summary>

取消之後，回呼不會再印下一幀。Console 只留下已取消與識別碼。

```diff 04-js/pages/105-js-frame.html
  // ...
          console.log('下一幀');
        });
-       console.log('已預約', id);
+       cancelAnimationFrame(id);
+       console.log('已取消', id);
      </script>
    </body>
  // ...
```

```text
已取消 1
```

</details>

# DOM

文件物件模型是那棵已經建好的樹。這一章先把節點選出來，再改內容、屬性與 class，最後建立、搬移與移除節點。事件下一章才綁。程式仍在載入時跑一次，畫面會立刻變成結果。

## 選取元素

選取是後面所有改寫的起點。一個選擇器對上一個元素時用 querySelector，對上一整組時用 querySelectorAll。找不到時兩者的回傳值不一樣，先分清楚再呼叫方法。

- `querySelector` 回傳第一個符合的元素，找不到時是 null。
- `querySelectorAll` 回傳查詢當下的節點清單，沒有符合時長度是 0。

### querySelector

querySelector 從呼叫它的那個節點往下，在它的子孫層裡依文件順序找出第一個符合選擇器的元素。寫成 `document.querySelector` 時，起點就是整份文件。這一節先從 document 找起，並練習選不到時怎麼先停下來。

**觀念**

選擇器寫法和 CSS 相同，id 用井字號，class 用句點。找到就回傳那個元素；沒有符合的元素時回傳 null，這時不能再點出方法。

所以不一定要從 document 開始。`querySelector` 也掛在每個元素上，先選到某個容器，再對它呼叫，搜尋範圍就只剩那個容器的子孫，同名 class 只會對上那一塊裡面的元素，容器本身不算在內。

```html 04-js/pages/106-js-query.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>querySelector</title>
  </head>
  <body>
    <h1 id="title">原標題</h1>
    <p class="note">原補充</p>
    <script>
      const title = document.querySelector('#title');
      title.textContent = '已選到標題';

      const missing = document.querySelector('#missing');
      console.log(missing);
      if (missing) {
        missing.textContent = '有找到';
      }
    </script>
  </body>
</html>
```

**解析**

- 第一個選擇器對上 h1，所以標題變成「已選到標題」。
- `#missing` 在這份文件裡不存在，Console 印出 null。
- if 先擋住 null，後面那行就不會去改一個不存在的元素。

{% note success %}
**換你試試：**
再選到 class 為 note 的段落，把文字改成「這是補充」。標題與 null 的判斷留著。
{% endnote %}

<details>
<summary>參考答案</summary>

class 選擇器會對上那個段落。缺的 id 仍然是 null，所以 if 裡面不會執行。

```diff 04-js/pages/106-js-query.html
  // ...
          missing.textContent = '有找到';
        }
+ 
+       const note = document.querySelector('.note');
+       note.textContent = '這是補充';
      </script>
    </body>
  // ...
```

</details>

### querySelectorAll

一次要改同一組元素時，改問 querySelectorAll。回傳的清單可以走訪，就算一個都沒有，也不會是 null。

**觀念**

回傳值是 NodeList，長度用 length 讀。它記得的是查詢當下的那些元素，之後再插入的新元素不會自動跑進這份清單。清單本身沒有 map，要逐項處理就用 forEach。從某個元素呼叫時，範圍只有它的後代。

```html 04-js/pages/107-js-query-all.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>querySelectorAll</title>
  </head>
  <body>
    <ul id="list">
      <li class="item">蘋果</li>
      <li class="item">香蕉</li>
      <li class="item">橘子</li>
    </ul>
    <script>
      const items = document.querySelectorAll('.item');

      items.forEach((item, index) => {
        item.textContent = `${index + 1}. ${item.textContent}`;
      });

      console.log(items.length);
    </script>
  </body>
</html>
```

**解析**

- 選擇器對上三個 li，length 是 3。
- forEach 的 index 從 0 開始，畫面上的序號改從 1 顯示。
- 原本文字被讀出來再組回去，所以蘋果仍在第一列。
- 清單是空的時 length 為 0，forEach 只是不跑，不會丟出錯誤。

{% note success %}
**換你試試：**
序號保留，每項文字後面再接上「（清單）」。
{% endnote %}

<details>
<summary>參考答案</summary>

模板字串可以把序號、原本文字與後綴接成一次指派。三列都會帶上同一個後綴。

```diff 04-js/pages/107-js-query-all.html
  // ...
        const items = document.querySelectorAll('.item');
  
        items.forEach((item, index) => {
-         item.textContent = `${index + 1}. ${item.textContent}`;
+         item.textContent = `${index + 1}. ${item.textContent}（清單）`;
        });
  
        console.log(items.length);
      // ...
```

</details>

### 在容器裡找

querySelector 與 querySelectorAll 可以改從某一塊元素呼叫，搜尋就縮在那一塊裡面。同名 class 散落在不同區塊時，就不會互相抓到。這一節用新聞區與商品區比對數量。

**觀念**

這兩個方法文件上有，元素上也有。搜尋起點是呼叫它的那個節點，範圍是後代。容器自己要改由父層或 document 來選。

```html 04-js/pages/108-js-query-scope.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>在容器裡找</title>
  </head>
  <body>
    <section id="news">
      <p class="item">新聞一</p>
      <p class="item">新聞二</p>
    </section>
    <section id="shop">
      <p class="item">商品一</p>
    </section>
    <script>
      const shop = document.querySelector('#shop');
      const news = document.querySelector('#news');
      console.log(document.querySelectorAll('.item').length);
      console.log(shop.querySelectorAll('.item').length);
      console.log(shop.querySelector('#shop'));
      console.log(news.querySelector('.item').textContent);
    </script>
  </body>
</html>
```

Console：

```text
3
1
null
新聞一
```

**解析**

- 整頁有三段 class 為 item 的段落，所以第一個長度是 3。
- 從商品區往下找，只剩商品一，長度是 1。
- 商品區自己的 id 不在它的後代裡，第三行是 null。
- 新聞區的第一段是新聞一，商品區的同名 class 沒有被改到。

{% note success %}
**換你試試：**
只把新聞區第一個 .item 的文字改成「頭條」。商品區不要動。
{% endnote %}

<details>
<summary>參考答案</summary>

範圍縮在新聞區，所以只有頭條被改寫。兩區的數量仍是 3 與 1。

```diff 04-js/pages/108-js-query-scope.html
  // ...
        console.log(shop.querySelectorAll('.item').length);
        console.log(shop.querySelector('#shop'));
+       news.querySelector('.item').textContent = '頭條';
        console.log(news.querySelector('.item').textContent);
      </script>
    // ...
```

```text
3
1
null
頭條
```

</details>

### 節點關係

選到一個元素之後，可以沿樹往上、往下或往旁走，也可以問它自己符不符合某個選擇器。這一節以 section#card 為中心，四個方向分開看。文件裡外層是 article#story，中間是 main#app。

- 往上
    - `parentElement` 是直接父元素，沒有父元素時回傳 null。
    - `closest` 從自己往上找最近的符合者，含自己，找不到回傳 null。
- 往下
    - `children` 是直接子元素的即時集合，只算元素。
    - `firstElementChild` 與 `lastElementChild` 是第一個與最後一個子元素，沒有時回傳 null。
    - `querySelector` 找第一個後代，`querySelectorAll` 找全部後代，範圍不含自己。
- 同層
    - `previousElementSibling` 是前一個元素兄弟，沒有時回傳 null。
    - `nextElementSibling` 是後一個元素兄弟，沒有時回傳 null。
- 判斷
    - `matches` 回答自己是否符合選擇器，回傳 true 或 false，不去找別的元素。

{% mermaid graph TD %}
story["article#story<br/>closest 祖先"] --> app["main#app<br/>parentElement"]
app --> intro["p#intro<br/>previousElementSibling"]
app --> card["section#card<br/>被選到的元素"]
app --> outro["p#outro<br/>nextElementSibling"]
card --> heading["h2#heading<br/>firstElementChild"]
card --> text["p#text"]
card --> action["button#action<br/>lastElementChild"]
{% endmermaid %}

{% note info %}
**元素與文字節點**
`parentNode` 與 `childNodes` 會把換行空白算成文字節點。

`nextSibling` 同樣會算到旁邊的空白。找元素時用帶 Element 的版本。
{% endnote %}

#### 往上

父元素是包住它的那一層。還要再往上時，用選擇器找最近的祖先，自己如果已經符合也算。這一節從卡片出發，把兩層的 id 寫回狀態列。

**觀念**

parentElement 只看直接包住卡片的 main。closest 會一路往上，直到碰到符合的 article，找不到就停在 null。

```html 04-js/pages/109-js-up.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>往上找</title>
  </head>
  <body>
    <article id="story">
      <main id="app">
        <p id="intro">前言</p>
        <section id="card">
          <h2 id="heading">標題</h2>
          <p id="text">內文</p>
          <button type="button" id="action">按鈕</button>
        </section>
        <p id="outro">結語</p>
      </main>
    </article>
    <p id="status"></p>
    <script>
      const card = document.querySelector('#card');
      const status = document.querySelector('#status');
      status.textContent = `${card.parentElement.id} / ${card.closest('article').id}`;
      console.log(card.closest('aside'));
    </script>
  </body>
</html>
```

Console：

```text
null
```

**解析**

- 卡片的直接父元素是 main，所以狀態列前半是 app。
- closest 找到外層 article，後半是 story。
- 文件裡沒有 aside，Console 是 null。

{% note success %}
**換你試試：**
把 Console 那行改成 closest('#text')。#text 在卡片裡面，不是祖先。
{% endnote %}

<details>
<summary>參考答案</summary>

closest 含自己、再往祖先找。卡片自己不是 #text，祖先也不是，所以仍是 null。狀態列維持 app / story。

```diff 04-js/pages/109-js-up.html
  // ...
        const status = document.querySelector('#status');
        status.textContent = `${card.parentElement.id} / ${card.closest('article').id}`;
-       console.log(card.closest('aside'));
+       console.log(card.closest('#text'));
      </script>
    </body>
  // ...
```

```text
null
```

</details>

#### 往下

往下可以只看下一層，也可以用選擇器把所有後代找出來。這一節先數卡片的直接子元素，再只在卡片裡找段落。

**觀念**

children 只算元素，第一個與最後一個用 firstElementChild、lastElementChild。從卡片呼叫 querySelectorAll 時，範圍停在卡片的後代。

```html 04-js/pages/110-js-down.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>往下找</title>
  </head>
  <body>
    <article id="story">
      <main id="app">
        <p id="intro">前言</p>
        <section id="card">
          <h2 id="heading">標題</h2>
          <p id="text">內文</p>
          <button type="button" id="action">按鈕</button>
        </section>
        <p id="outro">結語</p>
      </main>
    </article>
    <p id="status"></p>
    <script>
      const card = document.querySelector('#card');
      console.log(card.children.length);
      console.log(card.firstElementChild.id);
      console.log(card.lastElementChild.id);
      console.log(card.querySelectorAll('p').length);
    </script>
  </body>
</html>
```

Console：

```text
3
heading
action
1
```

**解析**

- 卡片下一層有標題、段落、按鈕，長度是 3。
- 第一個子元素是 heading，最後一個是 action。
- 卡片裡的段落只有內文那一段，前言在卡片外面，所以長度是 1。

{% note success %}
**換你試試：**
再印出 childNodes.length。它會把標籤之間的換行也算進去。
{% endnote %}

<details>
<summary>參考答案</summary>

三個元素之間與前後各有換行，所以 childNodes 的長度是 7。前四行維持元素的結果。

```diff 04-js/pages/110-js-down.html
  // ...
        console.log(card.lastElementChild.id);
        console.log(card.querySelectorAll('p').length);
+       console.log(card.childNodes.length);
      </script>
    </body>
  // ...
```

```text
3
heading
action
1
7
```

</details>

#### 同層

同一層的鄰居不包含父元素，也不包含自己的子元素。這一節讀卡片左右兩邊的元素 id。

**觀念**

previousElementSibling 與 nextElementSibling 只認元素。標籤之間的換行不會變成兄弟。

```html 04-js/pages/111-js-side.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>同層元素</title>
  </head>
  <body>
    <article id="story">
      <main id="app">
        <p id="intro">前言</p>
        <section id="card">
          <h2 id="heading">標題</h2>
          <p id="text">內文</p>
          <button type="button" id="action">按鈕</button>
        </section>
        <p id="outro">結語</p>
      </main>
    </article>
    <p id="status"></p>
    <script>
      const card = document.querySelector('#card');
      console.log(card.previousElementSibling.id);
      console.log(card.nextElementSibling.id);
    </script>
  </body>
</html>
```

Console：

```text
intro
outro
```

**解析**

- 卡片前面的元素是前言，id 是 intro。
- 後面的元素是結語，id 是 outro。
- 標題在卡片裡面，不會被算成同層鄰居。

{% note success %}
**換你試試：**
再印出 #intro 的 previousElementSibling。前言已經是 main 裡的第一個元素。
{% endnote %}

<details>
<summary>參考答案</summary>

前言沒有更前面的元素兄弟，所以第三行是 null。前兩行仍是 intro 與 outro。

```diff 04-js/pages/111-js-side.html
  // ...
        console.log(card.previousElementSibling.id);
        console.log(card.nextElementSibling.id);
+       console.log(document.querySelector('#intro').previousElementSibling);
      </script>
    </body>
  // ...
```

```text
intro
outro
null
```

</details>

#### 判斷

有時不必再找一個元素，只要知道手上這顆符不符合選擇器。matches 回答的是布林值。

**觀念**

matches 檢查元素自己。它不往上，也不往下，不符合時回傳 false，不會回傳 null。

```html 04-js/pages/112-js-match.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>matches</title>
  </head>
  <body>
    <article id="story">
      <main id="app">
        <p id="intro">前言</p>
        <section id="card">
          <h2 id="heading">標題</h2>
          <p id="text">內文</p>
          <button type="button" id="action">按鈕</button>
        </section>
        <p id="outro">結語</p>
      </main>
    </article>
    <p id="status"></p>
    <script>
      const card = document.querySelector('#card');
      console.log(card.matches('section'));
      console.log(card.matches('p'));
    </script>
  </body>
</html>
```

Console：

```text
true
false
```

**解析**

- 卡片是 section，第一行是 true。
- 它不是段落，第二行是 false。
- 這個方法不回傳元素，所以沒有找到或沒找到的 null。

{% note success %}
**換你試試：**
再印出 #text 是否符合 p。那一顆是段落。
{% endnote %}

<details>
<summary>參考答案</summary>

內文那顆段落符合 p，第三行是 true。卡片的兩個結果留著。

```diff 04-js/pages/112-js-match.html
  // ...
        console.log(card.matches('section'));
        console.log(card.matches('p'));
+       console.log(document.querySelector('#text').matches('p'));
      </script>
    </body>
  // ...
```

```text
true
false
true
```

</details>

### 選讀：getElementById 與 getElements 系列

舊程式、文章與第三方範例仍常出現這組寫法，讀得到才能改。新的程式以 querySelector 與 querySelectorAll 為主。這一節只把對照建立起來，後面的練習仍用選擇器。

#### getElementById

getElementById 用 id 找一顆元素。參數是 id 文字本身。這一節拿它和選擇器對到的結果比對，並看找不到時的回傳值。

**觀念**

參數不要加井字號。找到就回傳那顆元素，找不到回傳 null，結果與 querySelector 配上同一個 id 選擇器相同。

```html 04-js/pages/113-js-by-id.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>getElementById</title>
  </head>
  <body>
    <h1 id="title">原標題</h1>
    <ul id="list">
      <li class="item">蘋果</li>
      <li class="item">香蕉</li>
    </ul>
    <script>
      const list = document.getElementById('list');
      console.log(list === document.querySelector('#list'));
      console.log(document.getElementById('missing'));
    </script>
  </body>
</html>
```

Console：

```text
true
null
```

**解析**

- 兩種寫法對上同一顆 ul，第一行是 true。
- getElementById 的參數是 list，井字號只出現在選擇器那一邊。
- missing 不在文件裡，第二行是 null。

{% note success %}
**換你試試：**
用 getElementById 選到 title，把文字改成「已用 id 選到」。
{% endnote %}

<details>
<summary>參考答案</summary>

標題被改寫。兩行 Console 仍是 true 與 null，因為清單與 missing 沒有變。

```diff 04-js/pages/113-js-by-id.html
  // ...
        console.log(list === document.querySelector('#list'));
        console.log(document.getElementById('missing'));
+       document.getElementById('title').textContent = '已用 id 選到';
      </script>
    </body>
  // ...
```

```text
true
null
```

</details>

#### 即時集合

getElementsByClassName 與 getElementsByTagName 一次拿回一組元素。getElementsByName 依 name 找，表單欄位較常見，回傳的也是即時集合，這一節不另做練習。下面用 class 對照選擇器，看新增一列之後誰的長度會變。

**觀念**

回傳值是 HTMLCollection，文件一改它就跟著變，而且沒有 forEach。逐項走訪用 for...of，或先用 Array.from 轉成陣列。querySelectorAll 回傳的 NodeList 停在查詢當下，而且可以 forEach。

```html 04-js/pages/114-js-live.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>即時集合</title>
  </head>
  <body>
    <ul id="list">
      <li class="item">蘋果</li>
      <li class="item">香蕉</li>
    </ul>
    <script>
      const list = document.getElementById('list');
      const live = document.getElementsByClassName('item');
      const snap = document.querySelectorAll('.item');
      console.log(live.length);
      console.log(snap.length);

      const extra = document.createElement('li');
      extra.className = 'item';
      extra.textContent = '橘子';
      list.append(extra);

      console.log(live.length);
      console.log(snap.length);

      for (const item of live) {
        console.log(item.textContent);
      }
    </script>
  </body>
</html>
```

Console：

```text
2
2
3
2
蘋果
香蕉
橘子
```

**解析**

- 新增之前兩邊都是 2。
- 多了一顆 li 之後，即時集合的長度變成 3，節點清單仍是 2。
- for...of 走訪的是變長之後的集合，所以印出蘋果、香蕉、橘子。
- 節點清單沒有自動收進橘子。它有 forEach，即時集合沒有。

{% note success %}
**換你試試：**
再印出 getElementsByTagName('li') 的長度，並用 Array.from 把查詢當下的清單轉成陣列後 forEach，印出每一項文字。
{% endnote %}

<details>
<summary>參考答案</summary>

標籤名那份也是即時集合，三顆 li 都算進去，長度是 3。forEach 走的是新增前的清單，只剩蘋果與香蕉。

```diff 04-js/pages/114-js-live.html
  // ...
          console.log(item.textContent);
        }
+ 
+       console.log(document.getElementsByTagName('li').length);
+       Array.from(snap).forEach((item) => {
+         console.log(item.textContent);
+       });
      </script>
    </body>
  // ...
```

```text
2
2
3
2
蘋果
香蕉
橘子
3
蘋果
香蕉
```

</details>

## 操作元素

選到元素之後才能改它。先改文字與標記，再分清 `attribute` 與 `property`：日常直接改欄位，屬性方法只留給少數情況，最後讀畫面上算完的樣式、尺寸與位置。事件下一章才綁，需要人去觸發的函式先在 Console 呼叫。

### 內容

讀者看到的文字，和瀏覽器要解析的標記，是兩件事。隱藏起來的字也未必會跟著出現。下面先分清純文字的兩種讀法，再寫元素裡面的標記，最後看連元素自己一起換掉。

#### textContent 與 innerText

兩種都讀寫元素裡的文字。差別在於會不會看 CSS，以及會不會為了答案去排版。這一節用一段被藏起來的字把兩邊分開。

- `textContent` 讀寫子樹的純文字，隱藏的字也包含在內。
- `innerText` 讀寫畫面上看得到的文字，會先排版再回答。

**觀念**

textContent 把子樹裡的文字接起來，display 設成 none 的內容也算。innerText 依畫面上看得到的結果來讀，隱藏的字不會出現，而且讀的時候會觸發排版。

```html 04-js/pages/115-js-content.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>textContent 與 innerText</title>
  </head>
  <body>
    <p id="box">可見<span style="display: none">隱藏</span></p>
    <script>
      const box = document.querySelector('#box');
      console.log(box.textContent);
      console.log(box.innerText);
    </script>
  </body>
</html>
```

Console：

```text
可見隱藏
可見
```

**解析**

- 第一行把可見與隱藏接在一起，是可見隱藏。
- 第二行只剩畫面上的可見。
- innerText 會先排版才回答，文字很多時比另一種讀法慢。

{% note success %}
**換你試試：**
把 textContent 設成「可見」，再印一次 innerText。
{% endnote %}

<details>
<summary>參考答案</summary>

整段被換成可見之後，沒有隱藏的子元素，innerText 也是可見。

```diff 04-js/pages/115-js-content.html
  // ...
        console.log(box.textContent);
        console.log(box.innerText);
+       box.textContent = '可見';
+       console.log(box.innerText);
      </script>
    </body>
  // ...
```

```text
可見隱藏
可見
可見
```

</details>

#### innerHTML

讀寫的是元素裡面的標記。寫進去的字串會被解析成子節點，原來的子元素整段被換掉。使用者打的字不要從這裡放進頁面。

- `innerHTML` 讀出裡面目前的標記字串。
- 指派新字串，或用 `+=` 接上一段，都會清掉原子元素再整段重建。

**觀念**

指派新字串時，瀏覽器先清掉全部子元素，再依字串建立新的。原本子元素上的監聽不會留在新內容裡，輸入框裡打過的字也不會出現在畫面上。`+=` 會先讀出整段標記再整段寫回，連剛建立的子元素也會被換成新的一顆。

使用者打的字串若放進來，角括號會被當成標籤，這是跨站腳本攻擊（XSS）。純文字用 `textContent`。

```html 04-js/pages/116-js-inner.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>innerHTML</title>
  </head>
  <body>
    <div id="card">
      <input id="name" value="小明" />
      <button id="save" type="button">儲存</button>
    </div>
    <p id="plain"></p>
    <script>
      const card = document.querySelector('#card');
      const name = document.querySelector('#name');
      const save = document.querySelector('#save');
      name.value = '改過';
      save.addEventListener('click', () => {
        console.log('按過');
      });
      console.log(name.value);

      card.innerHTML = '<b id="mark">粗體</b>';
      const mark = document.querySelector('#mark');
      card.innerHTML += '<i>斜體</i>';
      console.log(card.innerHTML);
      console.log(mark.isConnected);
      console.log(mark === document.querySelector('#mark'));
      console.log(name.isConnected);
      console.log(save.isConnected);
    </script>
  </body>
</html>
```

Console：

```text
改過
<b id="mark">粗體</b><i>斜體</i>
false
false
false
false
```

**解析**

- 第一行是改過的輸入值。按鈕上此時已有點擊監聽。
- 標記那行是 `+=` 之後的結果，畫面上是粗體與斜體。
- mark 在接上斜體之前就選到了。重建後它的 isConnected 是 false，和重新選到的 b 也不是同一顆。
- name 與 save 的 isConnected 都是 false。輸入值與監聽留在舊節點上，畫面上沒有原來的輸入框與按鈕。

{% note warning %}
**不要插入來路不明的字串**
字串會被解析成標籤，使用者打的內容放進來就有跨站腳本攻擊（XSS）的風險。純文字放進 `textContent`。只有程式自己寫死的一小段標記，才偶爾交給 `innerHTML`。
{% endnote %}

{% note success %}
**換你試試：**
把 `'<b>純文字</b>'` 放進 #plain 的 textContent，並印出 textContent。畫面上要看得到角括號。
{% endnote %}

<details>
<summary>參考答案</summary>

textContent 不解析標記，b 會照字串留在畫面上。上面的卡片仍是粗體與斜體。

```diff 04-js/pages/116-js-inner.html
  // ...
        console.log(name.isConnected);
        console.log(save.isConnected);
+ 
+       const plain = document.querySelector('#plain');
+       plain.textContent = '<b>純文字</b>';
+       console.log(plain.textContent);
      </script>
    </body>
  // ...
```

```text
改過
<b id="mark">粗體</b><i>斜體</i>
false
false
false
false
<b>純文字</b>
```

</details>

#### outerHTML

讀出來的字串包含元素自己的開始與結束標籤。寫入時，瀏覽器用解析出來的節點換掉這顆元素。原來的變數不會自動改指到換上的那顆。

- `outerHTML` 讀取時連同元素自己的標籤。
- 指派新字串會把元素本身換掉，變數仍指向舊元素。

**觀念**

讀取時，字串從自己的開始標籤排到結束標籤。指派之後舊元素離開頁面，再改舊變數，畫面仍是新節點上的文字。

```html 04-js/pages/117-js-outer.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>outerHTML</title>
  </head>
  <body>
    <p id="note">舊公告</p>
    <script>
      const note = document.querySelector('#note');
      console.log(note.outerHTML);
      note.outerHTML = '<p id="note">新公告</p>';
      const next = document.querySelector('#note');
      console.log(note.isConnected);
      console.log(note === next);
      note.textContent = '改舊的';
      console.log(next.textContent);
    </script>
  </body>
</html>
```

Console：

```text
<p id="note">舊公告</p>
false
false
新公告
```

**解析**

- 第一行包含 p 自己的標籤，文字是舊公告。
- 舊變數的 isConnected 是 false，它和重新選到的元素比較也是 false。
- 舊變數改成改舊的之後，重新選到的文字仍是新公告。要改畫面，得改重新選到的那顆。

{% note warning %}
**寫入 outerHTML 的注意事項**

寫入後變數仍指向舊元素。舊元素已經離開頁面，`isConnected` 是 false。再改它，畫面不會變，要重新 `querySelector` 才拿得到新元素。

舊元素上的事件監聽跟著舊節點離開畫面。新元素沒有那些監聽。

剛 `createElement`、還沒插入頁面時，元素沒有父節點，指派後沒有變化。`document.documentElement` 的父節點是文件，不能整顆換掉，指派會丟出 NoModificationAllowedError。

和 innerHTML 一樣會把字串解析成標籤，使用者輸入有跨站腳本攻擊（XSS）的風險。

要換掉整顆元素時，用 `replaceWith`，或建立新元素再插上，比指派字串清楚。
{% endnote %}

{% note success %}
**換你試試：**
把指派的字串改成 `<section id="note">新公告</section>`，再印出兩顆元素的 tagName。
{% endnote %}

<details>
<summary>參考答案</summary>

頁面上換成 section，舊變數仍是原來的 p。第一行還是換掉之前讀到的標記。

```diff 04-js/pages/117-js-outer.html
  // ...
        const note = document.querySelector('#note');
        console.log(note.outerHTML);
-       note.outerHTML = '<p id="note">新公告</p>';
+       note.outerHTML = '<section id="note">新公告</section>';
        const next = document.querySelector('#note');
        console.log(note.isConnected);
        // ...
        note.textContent = '改舊的';
        console.log(next.textContent);
+       console.log(next.tagName);
+       console.log(note.tagName);
      </script>
    </body>
  // ...
```

```text
<p id="note">舊公告</p>
false
false
新公告
SECTION
P
```

</details>

### attribute 與 property

文字和標記改的是元素裡面。標籤上寫的 `attribute` 是當初的字串，DOM 物件上的 `property` 是目前狀態。多數會對應並一起更新，下面三處不一樣。

- 讀 `href` 這個 property 會得到完整網址，標籤上仍是相對路徑。
- 輸入框的 `value`，property 是現在框裡的文字，attribute 停在一開始的值。
- 標籤上的 class 對應 `className`，兩邊字串會一起改。

**觀念**

日常改 property 就好。屬性方法讀的是標籤上的原始字串，下一節再談何時才需要。下面用輸入框和連結把三處差異印出來。

```html 04-js/pages/118-js-prop.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>attribute 與 property</title>
  </head>
  <body>
    <input id="name" type="text" value="原始" />
    <a id="link" class="nav" href="/tour">行程</a>
    <script>
      const name = document.querySelector('#name');
      const link = document.querySelector('#link');
      name.value = '目前';
      console.log(name.getAttribute('value'));
      console.log(name.value);
      console.log(link.getAttribute('href'));
      console.log(link.href);
      console.log(link.getAttribute('class'));
      console.log(link.className);
    </script>
  </body>
</html>
```

Console：

```text
原始
目前
/tour
http://127.0.0.1:5500/tour
nav
nav
```

**解析**

- 第一行仍是標籤上的原始，第二行才是框裡的目前。
- 第三行是標籤上的 /tour，第四行被補成完整網址。主機以你開這頁的位址為準，下面用 Live Server 當例子。
- 後兩行都是 nav。class 和 className 是同一段字，欄位不叫 class。

{% note success %}
**換你試試：**
把 className 設成 'nav current'，再印 getAttribute('class') 與 className。
{% endnote %}

<details>
<summary>參考答案</summary>

改 className 之後，標籤上的 class 跟著變成兩個名字。前面六行不變。

```diff 04-js/pages/118-js-prop.html
  // ...
        console.log(link.getAttribute('class'));
        console.log(link.className);
+       link.className = 'nav current';
+       console.log(link.getAttribute('class'));
+       console.log(link.className);
      </script>
    </body>
  // ...
```

```text
原始
目前
/tour
http://127.0.0.1:5500/tour
nav
nav
nav current
nav current
```

</details>

### 屬性方法

已經有對應的 property，上一節直接改就好。沒有對應欄位、自訂屬性，或想讀 HTML 原本寫的值，才用屬性方法。讀寫的都是標籤上的字串。

讀原始字串，或問屬性在不在。

- `getAttribute` 讀標籤上的字，沒有該屬性時回傳 null。
- `hasAttribute` 只問在不在，回傳 true 或 false。

寫上一段字，或把屬性拿掉。

- `setAttribute` 把字串寫回標籤，沒有該屬性就先加上。
- `removeAttribute` 從標籤拿掉屬性，之後再讀是 null。

`toggleAttribute` 會在有無之間切換，第二個引數可以強制加上或拿掉。日常少用，這裡不展開。

**觀念**

`aria-label` 沒有同名 property，所以用方法改。自訂屬性也沒有對應欄位。想讀相對路徑時，方法拿得到標籤上寫的那段，href 則會補成完整網址。

```html 04-js/pages/119-js-attr.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>屬性方法</title>
  </head>
  <body>
    <button type="button" id="go" aria-label="收藏行程">收藏</button>
    <a id="link" href="/tour">行程</a>
    <script>
      const go = document.querySelector('#go');
      const link = document.querySelector('#link');
      console.log(go.getAttribute('aria-label'));
      go.setAttribute('aria-label', '已收藏');
      console.log(go.getAttribute('aria-label'));
      console.log(go.hasAttribute('aria-label'));
      go.removeAttribute('aria-label');
      console.log(go.getAttribute('aria-label'));
      go.setAttribute('data-note', '熱門');
      console.log(go.getAttribute('data-note'));
      console.log(link.getAttribute('href'));
      console.log(link.href);
    </script>
  </body>
</html>
```

Console：

```text
收藏行程
已收藏
true
null
熱門
/tour
http://127.0.0.1:5500/tour
```

**解析**

- 第一行是標籤上的收藏行程，第二行被改成已收藏。
- 第三行 true 表示屬性還在。拿掉之後，下一行是 null。
- data-note 是自訂屬性，沒有對應欄位，寫進去再讀是熱門。
- 後兩行是同一條連結。方法讀到 /tour，href 是完整網址。主機以你開這頁的位址為準。

{% note success %}
**換你試試：**
再印一次 hasAttribute('aria-label')。移除之後應該是 false。
{% endnote %}

<details>
<summary>參考答案</summary>

aria-label 已經拿掉，所以最後一行是 false。data-note 還在。前面七行不變。

```diff 04-js/pages/119-js-attr.html
  // ...
        console.log(link.getAttribute('href'));
        console.log(link.href);
+       console.log(go.hasAttribute('aria-label'));
      </script>
    </body>
  // ...
```

```text
收藏行程
已收藏
true
null
熱門
/tour
http://127.0.0.1:5500/tour
false
```

</details>

### property 存取（推薦）

上一節的方法留在少數情況。有對應欄位時，直接讀寫 property，這是日常做法。下面五段都掛在元素物件上，回傳的東西不一樣。

- 一般欄位直接改 `id`、src、alt、href、value。
- 布林欄位用 true 或 false 開關 `hidden`、disabled 與 checked。
- `dataset` 讀寫 data- 開頭的自訂資料，得到的都是字串。
- `classList` 管現在有哪些 class，一次加減一個名字。
- `style` 只管行內樣式，樣式表裡的規則碰不到。

#### 一般 property

字串欄位用點指定新值就好。`src` 與 `href` 讀出來是完整網址。輸入框的 value 前面看過，改的是框裡現在的字，標籤上不一定跟著變。

- `id` 讀寫識別名稱，寫入後標籤上變成同一個字。
- `alt` 讀寫替代文字，圖片載不到時顯示這段。
- `src` 讀寫圖片位址，讀欄位得到完整網址。
- `href` 讀寫連結位址，讀欄位同樣是完整網址。
- `value` 讀寫輸入框現在的文字。

**觀念**

下面一次改圖片、連結和輸入框。id 與 alt 寫進去就印出來。`src` 改成相對路徑後，`getAttribute` 讀到的仍是 cover.png。href 設成完整網址，印出來就是這段。value 改的是框裡現在的字。

```html 04-js/pages/120-js-field.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>一般 property</title>
  </head>
  <body>
    <img id="photo" alt="舊說明" src="photo.png" />
    <a id="link" href="/tour">行程</a>
    <input id="name" type="text" value="原始" />
    <script>
      const photo = document.querySelector('#photo');
      const link = document.querySelector('#link');
      const name = document.querySelector('#name');
      photo.id = 'cover';
      photo.alt = '夏季特賣';
      photo.src = 'cover.png';
      console.log(photo.id);
      console.log(photo.alt);
      console.log(photo.getAttribute('src'));
      link.href = 'https://example.com/tour';
      console.log(link.href);
      name.value = '目前';
      console.log(name.value);
    </script>
  </body>
</html>
```

Console：

```text
cover
夏季特賣
cover.png
https://example.com/tour
目前
```

**解析**

- id 改成 cover，alt 改成夏季特賣。兩張圖故意不放，載不到時會看到替代文字。
- 第三行是標籤上的 cover.png。直接讀 src 會得到完整網址。
- href 設成完整網址，印出來就是這段。
- value 從原始改成目前，這一行是框裡的文字。

{% note success %}
**換你試試：**
再印 getAttribute('value') 與 value，對照標籤上的原始值。
{% endnote %}

<details>
<summary>參考答案</summary>

框裡已是目前，標籤上的 value 仍是原始。前面五行不變，最後兩行是原始與目前。

```diff 04-js/pages/120-js-field.html
  // ...
        name.value = '目前';
        console.log(name.value);
+       console.log(name.getAttribute('value'));
+       console.log(name.value);
      </script>
    </body>
  // ...
```

```text
cover
夏季特賣
cover.png
https://example.com/tour
目前
原始
目前
```

</details>

#### 布林 property

上一節那些欄位是字串。hidden、disabled、checked 是布林，要設 true 或 false，不要把 false 這個字寫進標籤。標籤上這類叫布林屬性，物件上則是布林 property。

- `hidden` 為 true 時，元素不佔版面。
- `disabled` 為 true 時，不能按、也不能改。
- `checked` 為 true 時，方塊是勾選的，不要拿 value 判斷。

**觀念**

按鈕一開始帶著 `disabled`。設成 false 之後，屬性從標籤消失，按鈕就可以按。`checked` 用來表示有沒有勾，不要拿 value 判斷。hidden 設成 true 時，按鈕離開版面。

```html 04-js/pages/121-js-bool.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>布林 property</title>
  </head>
  <body>
    <p><button type="button" id="go" disabled>送出</button></p>
    <p><input id="ok" type="checkbox" /></p>
    <script>
      const go = document.querySelector('#go');
      const ok = document.querySelector('#ok');
      go.disabled = false;
      console.log(go.disabled);
      go.hidden = true;
      console.log(go.hidden);
      ok.checked = true;
      console.log(ok.checked);
    </script>
  </body>
</html>
```

Console：

```text
false
true
true
```

**解析**

- disabled 設成 false，按鈕可以按。
- hidden 設成 true，按鈕從版面消失。
- checked 設成 true，方塊變成勾選。

{% note warning %}
**布林不要寫成字串**
`setAttribute` 的第二個引數一律是字串。把 disabled 加回標籤時，即使寫成 false 這個字，屬性只要在，`disabled` 就是 true，按鈕又不能按。要打開按鈕，把 disabled 設成 false。
{% endnote %}

{% note success %}
**換你試試：**
把 hidden 設回 false，再印一次。按鈕會回到版面，而且可以按。
{% endnote %}

<details>
<summary>參考答案</summary>

hidden 回到 false 之後，按鈕重新出現。前面三行不變，disabled 仍是 false，checked 仍是 true。

```diff 04-js/pages/121-js-bool.html
  // ...
        ok.checked = true;
        console.log(ok.checked);
+       go.hidden = false;
+       console.log(go.hidden);
      </script>
    </body>
  // ...
```

```text
false
true
true
false
```

</details>

#### dataset

前面用 `setAttribute` 寫得進自訂屬性。編號這類 data- 開頭的資料改走 `dataset`，不用自己拼前綴。讀到的值都是字串。

名字對上屬性，寫入後標籤會跟著多一段。

- `dataset.userId` 對上 data-user-id，沒有該欄位時是 undefined。
- `getAttribute` 要寫完整屬性名，沒有該屬性時回傳 null。
- 指定 level 會加上 data-level，讀回來仍是字串，不是數字。

**觀念**

下面先讀 userId，再寫入 level。兩種讀法都是字串，所以 7 不是數字。

```html 04-js/pages/122-js-dataset.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>dataset</title>
  </head>
  <body>
    <p id="item" data-user-id="7">商品</p>
    <script>
      const item = document.querySelector('#item');
      console.log(item.dataset.userId);
      console.log(item.getAttribute('data-user-id'));
      item.dataset.level = '2';
      console.log(item.dataset.level);
      console.log(item.getAttribute('data-level'));
    </script>
  </body>
</html>
```

Console：

```text
7
7
2
2
```

**解析**

- 前兩行都是 7。dataset 用小駝峰，getAttribute 用完整屬性名，值都是字串。
- 寫入 level 之後，標籤上多了 data-level，後兩行都是 2。

{% note success %}
**換你試試：**
再設 dataset.unit 為 '支'，印出 getAttribute('data-unit')。
{% endnote %}

<details>
<summary>參考答案</summary>

unit 沒有連字號，對上的屬性名是 data-unit。最後一行是支。前面四行不變。

```diff 04-js/pages/122-js-dataset.html
  // ...
        console.log(item.dataset.level);
        console.log(item.getAttribute('data-level'));
+       item.dataset.unit = '支';
+       console.log(item.getAttribute('data-unit'));
      </script>
    </body>
  // ...
```

```text
7
7
2
2
支
```

</details>

#### classList

前面用 `className` 會把 class 整段換掉。`classList` 是 property 回傳的物件，加減的是個別名字。顏色留在樣式表，下面讓盒子先變大，再換成另一個狀態。

加上、拿掉，或依目前狀態切換。

- `add` 與 `remove` 可以一次傳多個 class。
- `toggle` 省略第二個引數時，在有無之間切換。
- 第二個引數是布林時，改成強制加上或拿掉。
- `contains` 回傳現在有沒有這個 class。
- `replace` 拿掉舊名並放入新名，舊名不存在時不會放新的。

**觀念**

一次加上 on 與 big。`toggle` 的第二個引數是 false，所以原本沒有的 hit 不會被加上。`replace` 再拿掉 big、放上 hit。

```html 04-js/pages/123-js-class.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>classList</title>
    <style>
      #box { padding: 0.75rem 1rem; border: 2px solid #0f766e; display: inline-block; }
      #box.on { background: #99f6e4; }
      #box.hit { background: #bbf7d0; }
      #box.big { font-size: 1.4rem; }
    </style>
  </head>
  <body>
    <p id="box">盒子</p>
    <script>
      const box = document.querySelector('#box');
      box.classList.add('on', 'big');
      box.classList.toggle('hit', false);
      console.log(box.classList.contains('on'));
      box.classList.replace('big', 'hit');
      console.log(box.classList.contains('big'));
    </script>
  </body>
</html>
```

Console：

```text
true
false
```

**解析**

- add 一次放上 on 與 big，盒子出現青色背景與較大的字。
- toggle 的第二個引數是 false，hit 被強制拿掉，不會因為原本沒有就反被加上。
- replace 拿掉 big、放上 hit。樣式表裡 hit 寫在 on 後面，背景改成綠色。
- 第一行是 true，第二行是 false。

{% note info %}
**狀態用 class，數字才用 style**
外觀的開關留在 class。寬度、座標這類每次不同的數字，才寫進行內樣式。
{% endnote %}

{% note success %}
**換你試試：**
用 toggle 把 on 強制拿掉，再印一次 contains('on')。
{% endnote %}

<details>
<summary>參考答案</summary>

強制拿掉之後，盒子只剩 hit。第三行是 false。

```diff 04-js/pages/123-js-class.html
  // ...
        box.classList.replace('big', 'hit');
        console.log(box.classList.contains('big'));
+       box.classList.toggle('on', false);
+       console.log(box.classList.contains('on'));
      </script>
    </body>
  // ...
```

```text
true
false
false
```

</details>

#### style

class 管的是狀態，顏色留在樣式表。算出來的數字才寫進 `style`。它是 property 回傳的物件，只碰行內樣式，屬性名用小駝峰。

- 行內樣式用小駝峰讀寫，例如 `backgroundColor`。
- 把值設成空字串，會清掉那一條行內樣式。
- `setProperty` 用來寫入 `--gap` 這類 CSS 變數。

**觀念**

背景色寫進 `backgroundColor`。變數名字以兩條減號開頭，style 物件沒有這種欄位，改用 `setProperty`。讀回來的顏色常常是 rgb 寫法。

```html 04-js/pages/124-js-style.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>style</title>
    <style>
      #box { color: #0f766e; padding: 0.75rem 1rem; display: inline-block; }
    </style>
  </head>
  <body>
    <p id="box">盒子</p>
    <script>
      const box = document.querySelector('#box');
      box.style.backgroundColor = '#ccfbf1';
      box.style.setProperty('--gap', '8px');
      box.style.marginTop = 'var(--gap)';
      console.log(box.style.backgroundColor);
      console.log(box.style.getPropertyValue('--gap'));
    </script>
  </body>
</html>
```

Console：

```text
rgb(204, 251, 241)
8px
```

**解析**

- 背景色寫進行內樣式，盒子多了一塊青色。
- 讀回來的顏色是 rgb(204, 251, 241)，不是當初的十六進位。
- 變數 --gap 是 8px，上邊界用這個變數，所以盒子往下移一點。

{% note success %}
**換你試試：**
把 backgroundColor 設成空字串，再印一次。變數留著。
{% endnote %}

<details>
<summary>參考答案</summary>

空字串清掉行內背景，樣式表沒有另設背景，青色就消失。第三行是空的。

```diff 04-js/pages/124-js-style.html
  // ...
        console.log(box.style.backgroundColor);
        console.log(box.style.getPropertyValue('--gap'));
+       box.style.backgroundColor = '';
+       console.log(box.style.backgroundColor);
      </script>
    </body>
  // ...
```

```text
rgb(204, 251, 241)
8px

```

</details>

### 選讀：讀取畫面結果

前面改的是元素上的 property。這一節讀的是瀏覽器算完、畫在畫面上的結果，不會寫回你設過的欄位。樣式問最終值，位置問排版之後的矩形。

- `getComputedStyle` 讀最終樣式，唯讀。
- 尺寸與位置讀排版之後的寬高與座標，也可以把元素捲進視窗。

#### getComputedStyle

上一節的 `style` 讀不到樣式表裡的顏色。`getComputedStyle` 是 window 的方法，直接寫名字就能呼叫。它讀算完的最終樣式，每個值都是字串，而且唯讀。

- `style.color` 只看行內樣式，樣式表裡的顏色讀不到。
- `getComputedStyle` 回傳算完的結果，不能拿來改值。

**觀念**

這一頁的文字顏色寫在樣式表。第一行是空字串，第二行是 rgb 形式。狀態仍優先改 class，這裡只示範怎麼讀。

```html 04-js/pages/125-js-computed.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>getComputedStyle</title>
    <style>
      #box { color: #0f766e; }
    </style>
  </head>
  <body>
    <p id="box">盒子</p>
    <script>
      const box = document.querySelector('#box');
      console.log(box.style.color);
      console.log(getComputedStyle(box).color);
    </script>
  </body>
</html>
```

Console：

```text

rgb(15, 118, 110)
```

**解析**

- 第一行是空字串，因為顏色不在行內樣式。
- 第二行是樣式表上的 #0f766e，以 rgb(15, 118, 110) 出現。
- 狀態仍優先改 class。這裡只示範怎麼讀已經生效的值。

{% note success %}
**換你試試：**
把 style.color 設成 'rgb(15, 118, 110)'，再印一次 style.color。
{% endnote %}

<details>
<summary>參考答案</summary>

寫進行內之後，style.color 才讀得到。第三行與計算後的顏色相同。

```diff 04-js/pages/125-js-computed.html
  // ...
        console.log(box.style.color);
        console.log(getComputedStyle(box).color);
+       box.style.color = 'rgb(15, 118, 110)';
+       console.log(box.style.color);
      </script>
    </body>
  // ...
```

```text

rgb(15, 118, 110)
rgb(15, 118, 110)
```

</details>

#### 尺寸與位置

顏色問的是最終樣式。元素多大、離視窗多遠，要等排版之後才知道，而且不是你設過的 property。下面把讀尺寸和捲到某一段包成函式，打開頁面後在 Console 自己呼叫。

- `getBoundingClientRect` 回傳相對視窗的矩形，裡面有 top、left、width、height。
- `offsetWidth` 與 `offsetHeight` 回傳含框線的整數寬高。
- `scrollIntoView` 把元素捲進視窗，不回傳有用的值。

**觀念**

矩形的 top 會跟著捲動變。`offsetWidth` 是含框線的整數寬。`scrollIntoView` 把 behavior 設成 smooth 就是平滑移動。

```html 04-js/pages/126-js-rect.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>尺寸與位置</title>
    <style>
      #box { display: inline-block; padding: 8px; border: 2px solid #0f766e; }
    </style>
  </head>
  <body>
    <div style="height: 240px"></div>
    <p id="box">目標</p>
    <div style="height: 900px"></div>
    <p id="end">頁面底部</p>
    <script>
      const showBox = () => {
        const box = document.querySelector('#box');
        const rect = box.getBoundingClientRect();
        console.log(Math.round(rect.top));
        console.log(box.offsetWidth);
      };

      const goEnd = () => {
        document.querySelector('#end').scrollIntoView({ behavior: 'smooth' });
      };

      console.log('呼叫 showBox() 或 goEnd()');
    </script>
  </body>
</html>
```

Console：

```text
呼叫 showBox() 或 goEnd()
260
68
```

**解析**

- 載入時只印出提示，頁面不會自己捲動。
- showBox 的第一個數字是目標離視窗頂端的距離，實際數字以你的畫面為準。
- 第二個數字是含框線的寬。offsetHeight 則是含框線的高。
- goEnd 會平滑捲到頁面底部那一段。

{% note success %}
**換你試試：**
showBox 再多印 offsetHeight。
{% endnote %}

<details>
<summary>參考答案</summary>

第三個數字是含框線的高度。提示與前兩個數字仍會先出現。下面的高度只是一種視窗的例子。

```diff 04-js/pages/126-js-rect.html
  // ...
          console.log(Math.round(rect.top));
          console.log(box.offsetWidth);
+         console.log(box.offsetHeight);
        };
  
        const goEnd = () => {
          // ...
```

```text
呼叫 showBox() 或 goEnd()
260
68
40
```

</details>

## 節點操作

頁面載入時還沒有的列，要用程式建立後再插進樹。已經在樹上的節點若再插入別處，瀏覽器是把它搬走，不是複製一份。複製、移除與清空留在下一節。

### 建立與插入

新的節點先被做出來，再決定放在目標的哪一邊。四個方法對上四個位置，舊的寫法只要看得懂即可。下面這張圖以 p#target 為中心。

- 建立
    - `createElement` 做出一顆還沒掛上文件的元素。
    - `createTextNode` 做出純文字節點，沒有自己的標籤。
    - `cloneNode` 複製節點，留到下一節再練。
- 以目標為基準
    - `before` 放在目標同層的前面，可一次放多個節點或字串。
    - `prepend` 放在目標內部的最前面。
    - `append` 放在目標內部的最後面。
    - `after` 放在目標同層的後面。
- 位置字串
    - `beforebegin` 就是 before 那個位置。
    - `afterbegin` 就是 prepend 那個位置。
    - `beforeend` 就是 append 那個位置。
    - `afterend` 就是 after 那個位置。
- 搬移
    - 把已在頁面上的節點再插一次就是搬走，文件裡仍只有一顆。

{% mermaid graph TD %}
beforeNode["before / beforebegin<br/>目標前面"] --> targetNode["p#target"]
targetNode --> startNode["prepend / afterbegin<br/>內部最前"]
targetNode --> endNode["append / beforeend<br/>內部最後"]
afterNode["after / afterend<br/>目標後面"]
targetNode --> afterNode
{% endmermaid %}

{% note info %}
**舊的插入寫法**
`appendChild` 與 `insertBefore` 一次只收一顆節點，而且會回傳那顆節點。現在的 before、prepend、append、after 可以混用節點與字串，字串會變成純文字。課堂用新的四個方法。
{% endnote %}

同一個目標可以同時示範四個插入點。字串若直接放進這四個方法，會變成純文字。這一節改用元素與一個文字節點，讓位置在畫面上分開。

**觀念**

before 與 after 是目標的兄弟。prepend 與 append 在目標裡面。createTextNode 做出的文字沒有標籤，接在終點後面。

`insertAdjacentElement` 與 `insertAdjacentHTML` 用前面那四個位置字串，效果與四個方法相同。

`insertAdjacentText` 插入的是純文字，不會被解析成標籤。

```html 04-js/pages/127-js-create.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>建立與插入</title>
  </head>
  <body>
    <div id="stage">
      <p id="target">目標</p>
    </div>
    <script>
      const stage = document.querySelector('#stage');
      const target = document.querySelector('#target');

      const before = document.createElement('p');
      before.textContent = '前面';
      target.before(before);

      const start = document.createElement('span');
      start.textContent = '起點';
      target.prepend(start);

      const end = document.createElement('span');
      end.textContent = '終點';
      target.append(end);

      const after = document.createElement('p');
      after.textContent = '後面';
      target.after(after);

      target.append(document.createTextNode('尾端文字'));

      const labels = [];
      for (const node of stage.children) labels.push(node.textContent);
      console.log(labels.join(' | '));
    </script>
  </body>
</html>
```

Console：

```text
前面 | 起點目標終點尾端文字 | 後面
```

**解析**

- 舞台上的三列依序是前面、目標內部的文字、後面。
- 目標內部從左到右是起點、目標、終點、尾端文字，所以中間沒有空格。
- `before` 放在目標同層前面，位置字串是 `beforebegin`。
- `prepend` 放在目標內部最前，位置字串是 `afterbegin`。
- `append` 放在目標內部最後，位置字串是 `beforeend`。
- `after` 放在目標同層後面，位置字串是 `afterend`。

{% note success %}
**換你試試：**
把「前面」再 append 到 #stage。觀察它從第一列變成最後一列，而且沒有變兩顆。
{% endnote %}

<details>
<summary>參考答案</summary>

已在頁面上的節點再插入就是搬移。第二行只剩一顆「前面」，而且在最後。

```diff 04-js/pages/127-js-create.html
  // ...
        for (const node of stage.children) labels.push(node.textContent);
        console.log(labels.join(' | '));
+ 
+       stage.append(before);
+       const moved = [];
+       for (const node of stage.children) moved.push(node.textContent);
+       console.log(moved.join(' | '));
      </script>
    </body>
  // ...
```

```text
前面 | 起點目標終點尾端文字 | 後面
起點目標終點尾端文字 | 後面 | 前面
```

</details>

### 移動、複製與移除

同一個節點在文件裡只會有一個位置。把已經存在的節點再 append 到別處，它會從舊位置消失並出現在新位置。要留下原件，就先複製。

- `cloneNode` 複製節點。引數 true 時連子節點一起複製，回傳的新節點還沒掛上文件。
- 把已在頁面上的節點再插入別處是搬移，文件裡仍只有一顆。
- `remove` 把節點從樹上拿掉。
- `replaceChildren` 不帶引數時清掉全部子節點。

**觀念**

cloneNode(true) 連子節點一起複製，回傳的是新節點，還沒有掛上文件。remove 把節點從樹上拿掉。replaceChildren 不帶引數時，會清掉全部子節點。

```html 04-js/pages/128-js-node-move.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>移動、複製與移除</title>
  </head>
  <body>
    <ul id="list">
      <li id="first">第一</li>
      <li id="second">第二</li>
    </ul>
    <script>
      const list = document.querySelector('#list');
      const first = document.querySelector('#first');
      const copy = first.cloneNode(true);
      list.append(copy);

      const second = document.querySelector('#second');
      list.prepend(second);
    </script>
  </body>
</html>
```

**解析**

- 複製出來的「第一」被 append 到結尾，原來的第一列還在。
- `#second` 本來就在清單裡，prepend 是把它搬到最前，不會變成兩顆。
- true 代表深複製。傳 false 時只複製元素自己，裡面的文字不會跟著走。

{% note success %}
**換你試試：**
改成先 replaceChildren 清空清單，再 append 一列「只剩這項」。
{% endnote %}

<details>
<summary>參考答案</summary>

replaceChildren 拿掉原本的兩列與任何複製。畫面上只留下新建立的那一列。

```diff 04-js/pages/128-js-node-move.html
  // ...
      <script>
        const list = document.querySelector('#list');
-       const first = document.querySelector('#first');
-       const copy = first.cloneNode(true);
-       list.append(copy);
+       list.replaceChildren();
  
-       const second = document.querySelector('#second');
-       list.prepend(second);
+       const item = document.createElement('li');
+       item.textContent = '只剩這項';
+       list.append(item);
      </script>
    </body>
  // ...
```

</details>

### 選讀：template 元素

同一種列要做很多次時，可以把骨架放在 template 裡。template 的內容不會直接出現在畫面上，程式複製之後再填文字、再插入。

**觀念**

template.content 是一份文件片段。cloneNode(true) 複製出片段，查詢與填值都在片段上做完，最後 append 到真正的清單。片段插進去時，外層不會多包一層。

```html 04-js/pages/129-js-template.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：template 元素</title>
  </head>
  <body>
    <template id="row">
      <li><span class="name"></span></li>
    </template>
    <ul id="list"></ul>
    <script>
      const list = document.querySelector('#list');
      const row = document.querySelector('#row');
      const fragment = row.content.cloneNode(true);

      fragment.querySelector('.name').textContent = '筆';
      list.append(fragment);
    </script>
  </body>
</html>
```

**解析**

- template 自己不佔畫面上的一列，清單一開始是空的。
- 複製後在片段裡找到 span，文字改成「筆」。
- append 片段時，瀏覽器放入的是裡面的 li。

{% note success %}
**換你試試：**
用同樣的步驟再加一列，文字是「紙」。畫面上要有兩列。
{% endnote %}

<details>
<summary>參考答案</summary>

每次 cloneNode 都得到新的片段，改其中一列不會改到另一列，也不會改到 template 原本的骨架。

```diff 04-js/pages/129-js-template.html
  // ...
        const list = document.querySelector('#list');
        const row = document.querySelector('#row');
-       const fragment = row.content.cloneNode(true);
  
-       fragment.querySelector('.name').textContent = '筆';
-       list.append(fragment);
+       const pen = row.content.cloneNode(true);
+       pen.querySelector('.name').textContent = '筆';
+       list.append(pen);
+ 
+       const paper = row.content.cloneNode(true);
+       paper.querySelector('.name').textContent = '紙';
+       list.append(paper);
      </script>
    </body>
  // ...
```

</details>

# DOM 事件

到這裡為止，程式都在載入時改一次畫面。事件讓函式改在使用者動作時才跑。這一章先綁定與解除，再讀事件物件，然後處理輸入、鍵盤、委派與表單送出。捕獲與冒泡的完整階段放在選讀。

## 綁定與解除

監聽是「這個元素發生這件事時，呼叫這個函式」。函式要留成同一個參考，之後才拿得掉。同一個事件可以疊好幾個函式，也可以聲明只跑一次。

- `addEventListener` 登記一份監聽，同一事件可以疊很多份。
- `removeEventListener` 用同一個函式參考拿掉其中一份，匿名函式對不上就拿不掉。

### addEventListener

點擊是第一個要接上的事件。按鈕被按下時改寫狀態文字，並另外登記一個只會執行一次的監聽。

- `addEventListener` 用事件名與函式登記一份監聽，同一事件可以疊很多份。
- 選項 `once` 讓這份跑完第一次就被移除。

**觀念**

addEventListener 的第一個引數是事件名，第二個是函式。選項 `{ once: true }` 讓這個函式在第一次之後就被拿掉。

```html 04-js/pages/130-js-listen.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>addEventListener</title>
  </head>
  <body>
    <button type="button" id="go">點我</button>
    <p id="status">尚未點</p>
    <script>
      const status = document.querySelector('#status');
      const go = document.querySelector('#go');

      go.addEventListener('click', () => {
        status.textContent = '點過了';
      });

      go.addEventListener('click', () => {
        console.log('只會看到一次');
      }, { once: true });
    </script>
  </body>
</html>
```

**解析**

- 兩份監聽都綁在同一個按鈕的 click 上，第一下會先改文字，再印出那句。
- 第二份帶有 once，所以從第二下開始 Console 不再出現那句。
- 第一份沒有 once，之後每次點擊仍會把文字設成「點過了」。

{% note success %}
**換你試試：**
把只會跑一次的那份改成設定文字「首次點過了」，不要再印到 Console。觀察第一下與第二下的文字。
{% endnote %}

<details>
<summary>參考答案</summary>

同一個點擊會依登記順序執行。第一下先寫成「點過了」，再被改成「首次點過了」。第二下只剩第一份監聽。

```diff 04-js/pages/130-js-listen.html
  // ...
        });
  
        go.addEventListener('click', () => {
-         console.log('只會看到一次');
+         status.textContent = '首次點過了';
        }, { once: true });
      </script>
    // ...
```

</details>

### removeEventListener

解除監聽時，瀏覽器用函式參考來辨認是哪一份。匿名函式各寫一次就是不同的函式，對不上，也就拿不掉。

**觀念**

把函式先存進變數，addEventListener 與 removeEventListener 都傳這同一個變數。事件名也要相同，這裡都是 click。

```html 04-js/pages/131-js-unlisten.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>removeEventListener</title>
  </head>
  <body>
    <p id="status">0</p>
    <button type="button" id="go">加一</button>
    <button type="button" id="stop">停止</button>
    <script>
      const status = document.querySelector('#status');
      const go = document.querySelector('#go');
      const stop = document.querySelector('#stop');

      const onClick = () => {
        const count = Number(status.textContent) + 1;
        status.textContent = String(count);
      };

      go.addEventListener('click', onClick);

      stop.addEventListener('click', () => {
        go.removeEventListener('click', onClick);
      });
    </script>
  </body>
</html>
```

**解析**

- 按下「加一」時，onClick 把段落裡的數字加 1。
- 按下「停止」後，同一個 onClick 被移除，再按「加一」不會增加。
- 停止鈕自己的監聽是另一個函式，不受這次移除影響。

{% note success %}
**換你試試：**
在 onClick 裡，數字變成 3 時就移除自己。停止鈕仍然可以提前移除。
{% endnote %}

<details>
<summary>參考答案</summary>

函式執行中可以拿自己的參考去解除。第三次點擊把數字設成 3 之後，這份監聽已經不在了。

```diff 04-js/pages/131-js-unlisten.html
  // ...
          const count = Number(status.textContent) + 1;
          status.textContent = String(count);
+         if (count === 3) {
+           go.removeEventListener('click', onClick);
+         }
        };
  
        go.addEventListener('click', onClick);
        // ...
```

</details>

### 選讀：onclick 等舊式寫法

HTML 屬性與元素上的 onclick 都還在規格裡，舊程式與舊教學很常見，所以要看得懂。新的程式一律用 addEventListener。這一節用三顆按鈕把三種寫法並排。

- HTML 屬性把一段字串寫在標籤上，只能呼叫全域函式。
- 指派給 `onclick` 只能留一個函式，後寫的會蓋掉前面的。
- `addEventListener` 可以疊很多份，也能帶上只跑一次或捕獲階段的選項。

**觀念**

標籤上的 onclick 是一段字串，只能呼叫全域函式，函式宣告才會變成全域，const 則不會。把函式指派給元素的 onclick 時，一顆元素只能留一個，後寫的蓋掉前面的，解除時設回 null。它不能設定 once 或 capture。嚴格的內容安全政策會擋掉寫在標籤上的事件。

```html 04-js/pages/132-js-onclick.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：onclick</title>
  </head>
  <body>
    <button type="button" id="old" onclick="fromHtml()">HTML 屬性</button>
    <button type="button" id="prop">屬性指派</button>
    <button type="button" id="modern">addEventListener</button>
    <p id="status">尚未點</p>
    <script>
      const status = document.querySelector('#status');

      function fromHtml() {
        status.textContent = '來自 HTML 屬性';
      }

      const prop = document.querySelector('#prop');
      prop.onclick = () => {
        status.textContent = '第一個函式';
      };
      prop.onclick = () => {
        status.textContent = '只剩第二個';
      };

      const modern = document.querySelector('#modern');
      modern.addEventListener('click', () => {
        console.log('第一份');
      });
      modern.addEventListener('click', () => {
        console.log('第二份');
      });
    </script>
  </body>
</html>
```

Console：

```text
第一份
第二份
```

**解析**

- 點第一顆時，狀態變成來自 HTML 屬性。那份程式是字串，而且呼叫全域函式。
- 第二顆被指派兩次，畫面上只剩只剩第二個。第一個函式已經被蓋掉。
- 第三顆的兩份監聽都會執行。點下去時 Console 先出現第一份，再出現第二份。
- 舊式寫法沒有被規格移除。新程式仍用 addEventListener，才能疊加、移除，並帶上選項。

{% note success %}
**換你試試：**
在兩次指派之後，把第二顆的 onclick 設成 null。再點它應沒有反應。
{% endnote %}

<details>
<summary>參考答案</summary>

設成 null 會清掉這顆按鈕的舊式監聽。第三顆的兩份 addEventListener 仍會印出。

```diff 04-js/pages/132-js-onclick.html
  // ...
          status.textContent = '只剩第二個';
        };
+       prop.onclick = null;
  
        const modern = document.querySelector('#modern');
        modern.addEventListener('click', () => {
          // ...
```

```text
第一份
第二份
```

</details>

## event 物件

監聽的函式會收到一個事件物件，裡面有這次動作的資訊。最常用的是實際點到誰、監聽掛在誰身上，以及要不要取消瀏覽器原本會做的事。

- 共通
    - `type` 是這次事件的名字，例如 click。
    - `target` 是實際發生事件的那個元素。
    - `currentTarget` 是這份監聽登記的元素，和 target 可以不同。
    - `timeStamp` 回傳從頁面載入到這次事件的毫秒數。
- 滑鼠
    - `clientX` 與 `clientY` 是相對視窗左上角的座標。
    - `pageX` 與 `pageY` 是相對整份文件左上角，有捲動時會比視窗座標大。
    - `offsetX` 與 `offsetY` 是相對事件目標內緣的座標。
    - `button` 回傳哪一個按鍵，0 是左鍵。
- 鍵盤
    - `key` 是這一刻產生的字，會受到 Shift 與輸入法影響。
    - `code` 是鍵盤上的位置，例如 KeyS，不跟著輸入法改變。
    - `repeat` 在按住不放、重複觸發時回傳 true。
    - `ctrlKey` 與 `metaKey` 表示 Ctrl 或 ⌘ 是否按住，回傳布林。
    - `shiftKey` 與 `altKey` 表示另外兩個修飾鍵是否按住。
- 方法
    - `preventDefault` 取消瀏覽器這次的預設動作，傳播還會繼續。
    - `stopPropagation` 從這一層打斷後續傳播。

{% mermaid graph LR %}
pageNode["文件左上角<br/>pageX pageY"] --> viewNode["視窗左上角<br/>clientX clientY"]
viewNode --> padNode["元素內緣<br/>offsetX offsetY"]
{% endmermaid %}


### target 與 currentTarget

監聽可以掛在父元素上，點擊卻發生在子元素。事件物件用兩個屬性把這兩層分開。

**觀念**

target 是實際被點到的元素。currentTarget 是這份監聽登記的那個元素。點清單裡的文字時，兩者通常不是同一個節點。

```html 04-js/pages/133-js-target.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>target 與 currentTarget</title>
  </head>
  <body>
    <ul id="menu">
      <li>蘋果</li>
      <li>香蕉</li>
    </ul>
    <p id="status"></p>
    <script>
      const menu = document.querySelector('#menu');
      const status = document.querySelector('#status');

      menu.addEventListener('click', (event) => {
        status.textContent = `${event.target.tagName} / ${event.currentTarget.id}`;
      });
    </script>
  </body>
</html>
```

**解析**

- 監聽掛在 ul 上，所以 currentTarget 的 id 是 menu。
- 點到文字時，target 是那顆 li，標籤名是 LI。
- 點在兩顆 li 上，第二段都是 menu，第一段都是 LI。

{% note success %}
**換你試試：**
改成把 event.target 的文字寫進狀態段落。點蘋果時段落應是「蘋果」。
{% endnote %}

<details>
<summary>參考答案</summary>

target 就是被點到的 li，textContent 是那一列的文字。currentTarget 這次沒有寫出來。

```diff 04-js/pages/133-js-target.html
  // ...
        const status = document.querySelector('#status');
  
        menu.addEventListener('click', (event) => {
-         status.textContent = `${event.target.tagName} / ${event.currentTarget.id}`;
+         status.textContent = event.target.textContent;
        });
      </script>
    // ...
```

</details>

### 滑鼠座標

同一種移動會帶出三組座標。這一節先在方塊上即時顯示視窗座標與元素內座標，再讓點擊把小圓點放到游標的位置。

**觀念**

clientX 與 clientY 從視窗左上角算起，捲動頁面時這組數字會變。offsetX 與 offsetY 從事件目標的內緣算起，圓點要用這組才會落在方塊裡。pageX 與 pageY 從整份文件的左上角算起，有捲動時比視窗座標大。

```html 04-js/pages/134-js-pointer.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>滑鼠座標</title>
    <style>
      #pad { position: relative; height: 160px; background: #ccfbf1; }
      #dot { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: #0f766e; left: 0; top: 0; }
    </style>
  </head>
  <body>
    <p id="pos">在方塊上移動滑鼠</p>
    <div id="pad"><span id="dot"></span></div>
    <script>
      const pos = document.querySelector('#pos');
      const pad = document.querySelector('#pad');
      const dot = document.querySelector('#dot');

      pad.addEventListener('mousemove', (event) => {
        const text = `${event.clientX}, ${event.clientY} / ${event.offsetX}, ${event.offsetY}`;
        pos.textContent = text;
        console.log(text);
      });

      pad.addEventListener('click', (event) => {
        dot.style.left = `${event.offsetX}px`;
        dot.style.top = `${event.offsetY}px`;
      });
    </script>
  </body>
</html>
```

Console：

```text
180, 90 / 24, 16
```

**解析**

- 斜線前是視窗座標，斜線後是方塊內座標。數字跟著游標變，下面只是某一點的例子。
- 點在方塊裡時，圓點的 left 與 top 用的是 offset，所以會落在游標下方。
- 若改用 client 來放圓點，捲動或方塊不在原點時，位置會偏掉。

{% note success %}
**換你試試：**
mousemove 的文字再補上 pageX 與 pageY，放在斜線之後的下一組。
{% endnote %}

<details>
<summary>參考答案</summary>

第三組是文件座標。方塊還沒被捲走時，它會和視窗座標很接近。

```diff 04-js/pages/134-js-pointer.html
  // ...
        const dot = document.querySelector('#dot');
  
        pad.addEventListener('mousemove', (event) => {
-         const text = `${event.clientX}, ${event.clientY} / ${event.offsetX}, ${event.offsetY}`;
+         const text = `${event.clientX}, ${event.clientY} / ${event.offsetX}, ${event.offsetY} / ${event.pageX}, ${event.pageY}`;
          pos.textContent = text;
          console.log(text);
        // ...
```

```text
180, 90 / 24, 16 / 180, 90
```

</details>

### 鍵盤資訊

keydown 帶來的不只是字，還有這顆鍵在鍵盤上的位置、是否為重複觸發，以及有沒有按住修飾鍵。這一節把這些資訊寫上畫面，並用一組快捷鍵擋掉瀏覽器的存檔。

**觀念**

key 是這一刻產生的字，Shift 或輸入法會讓它改變。code 是物理位置，KeyS 不會因為輸入法換成中文就改掉。repeat 在按住不放時變成 true。ctrlKey、metaKey、shiftKey、altKey 是四個布林。

```html 04-js/pages/135-js-keyinfo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>鍵盤資訊</title>
  </head>
  <body>
    <p id="info">按任意鍵</p>
    <p id="saved"></p>
    <script>
      const info = document.querySelector('#info');
      const saved = document.querySelector('#saved');

      document.addEventListener('keydown', (event) => {
        const mods = [
          event.ctrlKey ? 'Ctrl' : '',
          event.metaKey ? 'Meta' : '',
          event.shiftKey ? 'Shift' : '',
          event.altKey ? 'Alt' : '',
        ].filter(Boolean);
        const text = `${event.key} / ${event.code} / ${event.repeat} / ${mods.join('+')}`;
        info.textContent = text;
        console.log(text);
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          event.preventDefault();
          saved.textContent = '已儲存';
        }
      });
    </script>
  </body>
</html>
```

Console：

```text
a / KeyA / false / 
```

**解析**

- 按 a 時，key 是 a、code 是 KeyA、repeat 是 false。下面是這種按法的例子。
- 按住 Shift 再按同一顆鍵，key 可能變成 A，code 仍是 KeyA。
- 切換輸入法之後，key 可能變成中文，code 仍指向原來的位置。
- Ctrl 或 ⌘ 配上 s 時，preventDefault 擋掉瀏覽器存檔，畫面出現已儲存。

{% note success %}
**換你試試：**
改成 key 是 k 時顯示「已搜尋」，同樣擋掉預設動作。S 那組不要留著。
{% endnote %}

<details>
<summary>參考答案</summary>

組合鍵改看 k。畫面寫已搜尋，瀏覽器不會因為這個鍵去執行它原本的動作。

```diff 04-js/pages/135-js-keyinfo.html
  // ...
          info.textContent = text;
          console.log(text);
-         if ((event.ctrlKey || event.metaKey) && event.key === 's') {
+         if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
-           saved.textContent = '已儲存';
+           saved.textContent = '已搜尋';
          }
        });
      // ...
```

```text
a / KeyA / false / 
```

</details>

### preventDefault

有些元素自帶動作。連結會前往 href，表單會送出並重新載入。取消這件事不會拆掉監聽，只是這一次不去做預設動作。

**觀念**

在監聽裡呼叫 preventDefault，瀏覽器就不會跟著預設動作走。事件仍然會繼續冒泡，傳播要留到後面再停。

```html 04-js/pages/136-js-prevent.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>preventDefault</title>
  </head>
  <body>
    <p><a id="jump" href="https://example.com">前往範例</a></p>
    <p id="status">還在這頁</p>
    <script>
      const status = document.querySelector('#status');

      document.querySelector('#jump').addEventListener('click', (event) => {
        event.preventDefault();
        status.textContent = '已攔下預設跳轉';
      });
    </script>
  </body>
</html>
```

**解析**

- 連結的 href 仍是範例網站，預設動作是離開這頁。
- preventDefault 讓這次點擊留在原頁，段落改成攔下的說明。
- 沒有呼叫它的話，瀏覽器會開啟那個網址。

{% note success %}
**換你試試：**
再加一條 id 為 more 的連結，指向 https://example.org，用另一份監聽同樣攔下。
{% endnote %}

<details>
<summary>參考答案</summary>

兩條連結各自有監聽，都會取消預設跳轉。狀態文字共用同一個段落。

```diff 04-js/pages/136-js-prevent.html
  // ...
    <body>
      <p><a id="jump" href="https://example.com">前往範例</a></p>
+     <p><a id="more" href="https://example.org">另一條</a></p>
      <p id="status">還在這頁</p>
      <script>
        // ...
          status.textContent = '已攔下預設跳轉';
        });
+ 
+       document.querySelector('#more').addEventListener('click', (event) => {
+         event.preventDefault();
+         status.textContent = '已攔下預設跳轉';
+       });
      </script>
    </body>
  // ...
```

</details>

## 常用事件

click 之外，表單控制項最常遇到輸入與選定，文字框還會遇到鍵盤。這一節先分清字每次變化，以及值確定下來，是兩個事件。

- `input` 在內容每次改變時發生，文字框打一個字就會觸發。
- `change` 在文字框離開焦點後，或選單換了選項時發生。
- `keydown` 在鍵按下時發生，按住會重複。
- `keyup` 在鍵放開時發生，不會因為按住而重複。

### input 與 change

文字框正在打字時，和選單選定某一項時，通知程式的時機不同。預覽要跟著每一個字，選定的結果則等值確定。

- `input` 在內容每次改變時發生，預覽可以跟著每一個字。
- `change` 等值確定才發生，文字框要離開焦點，選單則是選項真的換了。

**觀念**

input 在內容每次改變時發生。change 在文字框離開焦點後，或選單選了不同選項時發生。兩者都用 value 讀目前的值。

```html 04-js/pages/137-js-input.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>input 與 change</title>
  </head>
  <body>
    <input id="name" type="text" />
    <p id="preview"></p>
    <select id="color">
      <option value="紅">紅</option>
      <option value="藍">藍</option>
    </select>
    <p id="picked"></p>
    <script>
      const name = document.querySelector('#name');
      const preview = document.querySelector('#preview');
      const color = document.querySelector('#color');
      const picked = document.querySelector('#picked');

      name.addEventListener('input', () => {
        preview.textContent = name.value;
      });

      color.addEventListener('change', () => {
        picked.textContent = color.value;
      });
    </script>
  </body>
</html>
```

**解析**

- 每打一個字，input 就更新預覽，不必等離開文字框。
- 選單要等選項真的換了，change 才把值寫進第二段。
- value 是控制項目前的字串，選單的 value 來自 option。

{% note success %}
**換你試試：**
選單發生 change 時，除了寫進選定段落，也把「輸入值 / 顏色」寫進預覽。
{% endnote %}

<details>
<summary>參考答案</summary>

change 的當下可以同時讀文字框與選單。預覽會改成兩段資訊，之後再打字仍由 input 覆蓋成只有名字。

```diff 04-js/pages/137-js-input.html
  // ...
        color.addEventListener('change', () => {
          picked.textContent = color.value;
+         preview.textContent = `${name.value} / ${color.value}`;
        });
      </script>
    // ...
```

</details>

### keydown

鍵盤事件看的是這一次按下的鍵，而不是文字框裡的整段內容。Enter 常用來表示確定，Escape 常用來表示取消。

- `keydown` 在鍵按下時發生，按住會重複，鍵名看 key。
- `keyup` 在鍵放開時發生。方向鍵、打字與蓄力都從這兩個事件長出來。

**觀念**

keydown 在鍵按下時發生。event.key 是鍵的名字，例如 Enter。若這個文字框以後放進表單，Enter 可能會觸發送出，所以這裡先取消預設動作。

```html 04-js/pages/138-js-keydown.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>keydown</title>
  </head>
  <body>
    <input id="name" type="text" />
    <p id="status"></p>
    <script>
      const name = document.querySelector('#name');
      const status = document.querySelector('#status');

      name.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          status.textContent = name.value;
        }
      });
    </script>
  </body>
</html>
```

**解析**

- 只有 key 是 Enter 時才讀 value，其他鍵不會改段落。
- preventDefault 避免 Enter 去觸發包住它的表單。這一頁還沒有表單，呼叫它仍然安全。
- 段落顯示的是按下 Enter 當下的整段文字。

{% note success %}
**換你試試：**
key 是 Escape 時，把文字框的 value 設成空字串。Enter 的行為保留。
{% endnote %}

<details>
<summary>參考答案</summary>

同一個 keydown 可以依 key 分兩條路。Escape 只清輸入框，不改狀態段落。

```diff 04-js/pages/138-js-keydown.html
  // ...
            status.textContent = name.value;
          }
+         if (event.key === 'Escape') {
+           name.value = '';
+         }
        });
      </script>
    // ...
```

</details>

#### 方向鍵移動方塊

方向鍵可以改一個方塊的位置。第一步先讓它移動，先不處理邊界，方塊可以跑出欄位。完成寫法在 139-js-arrow.html.final。

**觀念**

監聽放在 document 上，方塊不需要先被點選。四個方向各改 x 或 y。方向鍵的預設動作會捲動頁面，所以先 preventDefault。座標同時寫進狀態段落與 Console。

```html 04-js/pages/139-js-arrow.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>方向鍵移動</title>
    <style>
      #field { position: relative; width: 240px; height: 160px; background: #ccfbf1; }
      #box { position: absolute; width: 32px; height: 32px; background: #0f766e; left: 0; top: 0; }
    </style>
  </head>
  <body>
    <div id="field"><div id="box"></div></div>
    <p id="status">0, 0</p>
    <script>
      const box = document.querySelector('#box');
      const status = document.querySelector('#status');
      let x = 0;
      let y = 0;

      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') x += 16;
        if (event.key === 'ArrowLeft') x -= 16;
        if (event.key === 'ArrowDown') y += 16;
        if (event.key === 'ArrowUp') y -= 16;
        if (!event.key.startsWith('Arrow')) return;
        event.preventDefault();
        box.style.left = `${x}px`;
        box.style.top = `${y}px`;
        status.textContent = `${x}, ${y}`;
        console.log(status.textContent);
      });
    </script>
  </body>
</html>
```

Console：

```text
16, 0
```

**解析**

- 按一次右鍵，x 增加 16，狀態與 Console 都是 16, 0。
- 左鍵與上鍵會把數字減下去，這一步允許出現負數。
- 不是方向鍵時直接結束，其他鍵不會改位置。

{% note success %}
**換你試試：**
碰到欄位邊緣就停住。往右的最大值是欄位寬減掉方塊寬，這一頁是 208。
{% endnote %}

<details>
<summary>參考答案</summary>

加上邊界之後，數字不會小於 0，也不會大於欄位減掉方塊的尺寸。完成檔是 139-js-arrow.html.final。

```diff 04-js/pages/139-js-arrow.html.final
  // ...
      <script>
        const box = document.querySelector('#box');
+       const field = document.querySelector('#field');
        const status = document.querySelector('#status');
        let x = 0;
        // ...
          if (!event.key.startsWith('Arrow')) return;
          event.preventDefault();
+         const maxX = field.clientWidth - box.offsetWidth;
+         const maxY = field.clientHeight - box.offsetHeight;
+         x = Math.min(maxX, Math.max(0, x));
+         y = Math.min(maxY, Math.max(0, y));
          box.style.left = `${x}px`;
          box.style.top = `${y}px`;
          // ...
```

```text
208, 0
```

</details>

#### 打字小遊戲

畫面上隨機出現一個英文字母。按對就加分並換下一個，這一步按錯先不提示。完成寫法在 140-js-type.html.final。字母每次重新整理都不一樣。

**觀念**

只處理長度為 1 的 key，方向鍵與 Enter 就不會被當成答案。比對前先轉成大寫，所以小寫按鍵也算對。分數寫進段落，並印出新的分數。

```html 04-js/pages/140-js-type.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>打字小遊戲</title>
  </head>
  <body>
    <p id="letter">A</p>
    <p id="score">0</p>
    <p id="hint"></p>
    <script>
      const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
      const letter = document.querySelector('#letter');
      const score = document.querySelector('#score');
      let points = 0;

      const nextLetter = () => {
        letter.textContent = letters[Math.floor(Math.random() * letters.length)];
      };

      nextLetter();

      document.addEventListener('keydown', (event) => {
        if (event.key.length !== 1) return;
        if (event.key.toUpperCase() === letter.textContent) {
          points += 1;
          score.textContent = String(points);
          console.log(points);
          nextLetter();
        }
      });
    </script>
  </body>
</html>
```

Console：

```text
1
```

**解析**

- 載入時先抽一個字母，分數是 0。
- 按對一次，分數變成 1，Console 印出 1，字母立刻換成下一個。
- 按錯時這一步沒有提示，分數也不會減少。

{% note success %}
**換你試試：**
按錯時把 #hint 設成「再試一次」。按對就清空提示，再換下一個字母。
{% endnote %}

<details>
<summary>參考答案</summary>

按錯只改提示，不加分。按對時提示被清掉，分數才加 1。完成檔是 140-js-type.html.final。

```diff 04-js/pages/140-js-type.html.final
  // ...
        const letter = document.querySelector('#letter');
        const score = document.querySelector('#score');
+       const hint = document.querySelector('#hint');
        let points = 0;
  
        const nextLetter = () => {
          letter.textContent = letters[Math.floor(Math.random() * letters.length)];
+         hint.textContent = '';
        };
  
        nextLetter();
        // ...
            console.log(points);
            nextLetter();
+         } else {
+           hint.textContent = '再試一次';
          }
        });
      // ...
```

```text
1
```

</details>

#### 空白鍵蓄力

按住空白鍵開始蓄力，放開時再用兩次時間戳的差當作力道。這一步只做到按下時顯示蓄力中。完成寫法在 141-js-charge.html.final。

**觀念**

keydown 遇到空白鍵且不是重複觸發時，記下 timeStamp，並擋掉捲動頁面的預設動作。按住不放時 repeat 是 true，起點不會被後面的重複事件改掉。

```html 04-js/pages/141-js-charge.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>空白鍵蓄力</title>
  </head>
  <body>
    <p id="power">力道 0</p>
    <script>
      let start = 0;

      document.addEventListener('keydown', (event) => {
        if (event.key !== ' ' || event.repeat) return;
        event.preventDefault();
        start = event.timeStamp;
        document.querySelector('#power').textContent = '蓄力中';
        console.log('蓄力中');
      });
    </script>
  </body>
</html>
```

Console：

```text
蓄力中
```

**解析**

- 按下空白鍵，畫面與 Console 都是蓄力中。
- 按住不放不會重新起算，因為重複的 keydown 被略過。
- 這一步還沒有聽 keyup，放開時力道還不會出現。

{% note success %}
**換你試試：**
放開空白鍵時，用這次 timeStamp 減去起點，四捨五入後顯示「力道 數字」。實際數字等於你按住的毫秒。
{% endnote %}

<details>
<summary>參考答案</summary>

keyup 只在有起點時計算。放開後畫面變成力道加上毫秒，下面的 180 只是按住約 0.18 秒的例子。完成檔是 141-js-charge.html.final。

```diff 04-js/pages/141-js-charge.html.final
  // ...
      <script>
        let start = 0;
+       const power = document.querySelector('#power');
  
        document.addEventListener('keydown', (event) => {
          if (event.key !== ' ' || event.repeat) return;
          event.preventDefault();
          start = event.timeStamp;
-         document.querySelector('#power').textContent = '蓄力中';
+         power.textContent = '蓄力中';
          console.log('蓄力中');
        });
+ 
+       document.addEventListener('keyup', (event) => {
+         if (event.key !== ' ' || !start) return;
+         const force = Math.max(0, Math.round(event.timeStamp - start));
+         start = 0;
+         power.textContent = `力道 ${force}`;
+         console.log(power.textContent);
+       });
      </script>
    </body>
  // ...
```

```text
蓄力中
力道 180
```

</details>

## 事件委派

點到內層元素時，click 會一路往外層傳。這種往外送叫做事件冒泡，所以父層的監聽也收得到。`event.target` 是真正被點到的元素。完整的三個階段留在後面選讀，這裡先不談捕獲。

清單會動態新增、刪除、重繪。監聽只放在不會被換掉的父層，新出現的按鈕也收得到，不用每次重綁。後面的待辦清單就用這招。

- `closest` 從被點到的節點往上找按鈕，含自己，找不到回傳 null。
- 按鈕的 `dataset` 存放要做的動作，父層讀到才決定怎麼改。

**觀念**

父層收到 click 之後，用 `closest` 從被點到的節點往上找按鈕。找不到，或按鈕在父層外面，就直接結束。找得到就讀那顆按鈕的 `dataset`。

```html 04-js/pages/142-js-delegate.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>事件委派</title>
  </head>
  <body>
    <ul id="list">
      <li><button type="button" data-id="1">一</button></li>
      <li><button type="button" data-id="2">二</button></li>
    </ul>
    <p id="status"></p>
    <script>
      const list = document.querySelector('#list');
      const status = document.querySelector('#status');

      list.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button || !list.contains(button)) return;
        status.textContent = button.dataset.id;
        console.log(event.target.tagName);
      });
    </script>
  </body>
</html>
```

```text
BUTTON
```

**解析**

- 點第一顆時，Console 印出 BUTTON。那就是 `event.target`，監聽掛在清單上仍收得到，是因為 click 往外冒泡。
- `closest` 從被點到的節點往上找，點在按鈕文字上也找得到那顆按鈕。
- `contains` 確認這顆按鈕是清單的後代。`dataset.id` 就是標籤上的 data-id，點第一顆時段落是 1。
- 之後用程式或 HTML 加進來的按鈕，只要還在這份清單裡，同一份監聽就收得到。

{% note success %}
**換你試試：**
在清單裡加第三顆按鈕，data-id 設成 3，文字是「三」。不要新增監聽。點它時段落應是 3。
{% endnote %}

<details>
<summary>參考答案</summary>

新按鈕還是這份清單的後代，冒泡仍會進到同一份監聽。讀到的 id 是 3。

```diff 04-js/pages/142-js-delegate.html
  // ...
        <li><button type="button" data-id="1">一</button></li>
        <li><button type="button" data-id="2">二</button></li>
+       <li><button type="button" data-id="3">三</button></li>
      </ul>
      <p id="status"></p>
      // ...
```

</details>

## 選讀：捕獲與冒泡

前面只用到冒泡。這裡看完整的三個階段：由外往內的捕獲、抵達目標、再由內往外的冒泡。

{% mermaid graph LR %}
docDown["document"] -- 捕獲 --> outerCap["#outer 捕獲監聽"]
outerCap -- 捕獲 --> innerTarget["#inner 目標"]
innerTarget -- 冒泡 --> outerBubble["#outer 冒泡監聽"]
outerBubble -- 冒泡 --> docUp["document"]
{% endmermaid %}

預設的監聽發生在冒泡階段，也就是事件已經到了目標、正往外走的時候。若要在往內走時就先看到，要把捕獲打開。

- 捕獲由外往內。第三個引數 true，或選項 `capture`，會在這階段呼叫。
- 冒泡由內往外。沒寫選項時，監聽走這一段。
- `stopPropagation` 從呼叫的那一層打斷後面的路，已經走過的捕獲不會取消。

**觀念**

選項 `capture` 代表這份監聽走捕獲階段，第三個引數寫 true 也是同一件事。`stopPropagation` 從呼叫的那一層打斷後續的路，已經走過的捕獲不會被取消。

```html 04-js/pages/143-js-bubble.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：捕獲與冒泡</title>
    <style>
      #outer { padding: 1rem; background: #ccfbf1; }
      button { margin-right: 0.4rem; }
    </style>
  </head>
  <body>
    <div id="outer">
      <button type="button" id="inner">內層</button>
      <button type="button" id="stop">停止冒泡</button>
    </div>
    <p id="status"></p>
    <script>
      const outer = document.querySelector('#outer');
      const inner = document.querySelector('#inner');
      const stop = document.querySelector('#stop');
      const status = document.querySelector('#status');

      outer.addEventListener('click', () => {
        status.textContent = '外捕獲';
        console.log('外捕獲');
      }, true);

      inner.addEventListener('click', () => {
        status.textContent = `${status.textContent} 內層`;
        console.log('內層');
      });

      outer.addEventListener('click', () => {
        status.textContent = `${status.textContent} 外冒泡`;
        console.log('外冒泡');
      });

      stop.addEventListener('click', (event) => {
        event.stopPropagation();
        status.textContent = `${status.textContent} 停止`;
        console.log('停止');
      });
    </script>
  </body>
</html>
```

```text
外捕獲
內層
外冒泡
```

**解析**

- 點「內層」時，Console 依序是外捕獲、內層、外冒泡。捕獲監聽先把文字設成第一段。
- 點「停止冒泡」時，捕獲仍會先發生，接著 `stopPropagation` 讓外層的冒泡監聽不跑。
- 外層有兩份 click，一份在捕獲、一份在冒泡，它們是分開登記的。

{% note success %}
**換你試試：**
在內層的監聽裡也呼叫 stopPropagation。點「內層」時，畫面上應停在「外捕獲 內層」。
{% endnote %}

<details>
<summary>參考答案</summary>

內層已經是目標。在目標呼叫 stopPropagation 會取消後面的冒泡，外層那份冒泡監聽就不會再改文字。捕獲階段在這之前已經跑過。

```diff 04-js/pages/143-js-bubble.html
  // ...
          console.log('外捕獲');
        }, true);
  
-       inner.addEventListener('click', () => {
+       inner.addEventListener('click', (event) => {
+         event.stopPropagation();
          status.textContent = `${status.textContent} 內層`;
          console.log('內層');
        // ...
```

</details>

## 表單處理

表單控制項的目前內容在 value，核取方塊的是否勾選在 checked。整張表單要一次讀取時，改用 FormData。送出前先取消重新載入，再依規則檢查。

### value 與 checked

文字框的 value 是目前打進去的字串。核取方塊不用 value 表示有沒有勾，那個答案在 checked，是布林值。

- `value` 回傳文字框目前的字串。
- `checked` 回傳核取方塊是否勾選，型別是布林。

**觀念**

文字變化聽 input，勾選變化聽 change。畫面上的句子由一支小函式負責組，載入時先呼叫一次，才不會等使用者動作才出現。

```html 04-js/pages/144-js-form-value.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>value 與 checked</title>
  </head>
  <body>
    <p><input id="title" type="text" value="草稿" /></p>
    <p><label><input id="done" type="checkbox" /> 完成</label></p>
    <p id="result"></p>
    <script>
      const title = document.querySelector('#title');
      const done = document.querySelector('#done');
      const result = document.querySelector('#result');

      const render = () => {
        const mark = done.checked ? '已勾選' : '未勾選';
        result.textContent = `${title.value} / ${mark}`;
      };

      title.addEventListener('input', render);
      done.addEventListener('change', render);
      render();
    </script>
  </body>
</html>
```

**解析**

- 載入時 value 已是「草稿」，checked 是 false，所以先看到未勾選。
- 打字觸發 input，勾選觸發 change，兩條路都呼叫同一支 render。
- 三元運算子只負責把布林改成要顯示的那兩個詞。

{% note success %}
**換你試試：**
在核取方塊的標籤上加上 checked。重新整理後，第一眼應是「草稿 / 已勾選」。
{% endnote %}

<details>
<summary>參考答案</summary>

checked 屬性讓這顆方塊一開始就是勾選的，render 在載入時讀到 true。之後仍可改勾選狀態。

```diff 04-js/pages/144-js-form-value.html
  // ...
    <body>
      <p><input id="title" type="text" value="草稿" /></p>
-     <p><label><input id="done" type="checkbox" /> 完成</label></p>
+     <p><label><input id="done" type="checkbox" checked /> 完成</label></p>
      <p id="result"></p>
      <script>
        // ...
```

</details>

### 送出與檢查

表單的預設動作是依 action 送出並重新載入。這一頁還沒有要送給伺服器，所以送出時先留在原頁，再讀欄位。

- `preventDefault` 取消這次送出的重新載入。
- `checkValidity` 回傳是否通過 required 等規則。
- `reportValidity` 請瀏覽器顯示沒通過的提示。
- `FormData` 依 name 把欄位打包成一包資料。
- `get` 從這包資料取出單一字串，沒有該 name 時是 null。

**觀念**

novalidate 關掉瀏覽器自動擋下送出，submit 才一定進得了監聽。監聽裡用 checkValidity 看 required 等規則，失敗就 reportValidity，請瀏覽器顯示提示。通過之後用 FormData 依 name 取值。

```html 04-js/pages/145-js-submit.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>送出與檢查</title>
  </head>
  <body>
    <form id="editor" novalidate>
      <input name="title" required />
      <button type="submit">送出</button>
    </form>
    <p id="result"></p>
    <script>
      const form = document.querySelector('#editor');
      const result = document.querySelector('#result');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          result.textContent = '還沒通過檢查';
          return;
        }
        const data = new FormData(form);
        result.textContent = data.get('title');
      });
    </script>
  </body>
</html>
```

**解析**

- preventDefault 取消重新載入，無論檢查過不過都要先呼叫。
- 空白時 checkValidity 是 false，因為輸入框有 required。
- FormData 用 name 找欄位。沒有 name 的控制項不會進這包資料。
- 通過檢查後，段落就是標題欄的字串。

{% note success %}
**換你試試：**
輸入框加上 minlength="2"。只打一個字就送出時，段落應是「還沒通過檢查」，並出現瀏覽器的提示。
{% endnote %}

<details>
<summary>參考答案</summary>

minlength 也是約束驗證的規則。一個字不算通過，checkValidity 仍是 false，FormData 那一行不會執行。

```diff 04-js/pages/145-js-submit.html
  // ...
    <body>
      <form id="editor" novalidate>
-       <input name="title" required />
+       <input name="title" required minlength="2" />
        <button type="submit">送出</button>
      </form>
      // ...
```

</details>

# 資料驅動畫面

前面每一個監聽都直接改某個元素。清單一長，容易改到畫面卻忘了改資料，或相反。這一章把資料放在一個物件，畫面只由一支 render 依資料重畫。

## 狀態與重繪

狀態是現在這份清單有哪些項目。render 不負責決定要新增什麼，它只看狀態，先清空再把每一項做成元素。點擊只改狀態，然後再呼叫 render。

- 狀態物件記下現在要顯示的資料，畫面不另外記一份。
- `render` 只依狀態重畫。新增與刪除先改狀態，再呼叫它。

{% mermaid graph LR %}
stateNode["狀態"] --> renderNode["render"]
renderNode --> viewNode["畫面"]
viewNode --> eventNode["事件改狀態"]
eventNode --> stateNode
{% endmermaid %}

**觀念**

項目放在 state.items。render 用 replaceChildren 清掉舊列，再用 createElement 與 textContent 依陣列重做。這樣畫面上不會留下上一輪的節點。

```html 04-js/pages/146-js-render.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>狀態與重繪</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button { font: inherit; }
    </style>
  </head>
  <body>
    <ul id="list"></ul>
    <button type="button" id="add">加一筆</button>
    <script>
      const state = { items: ['筆', '紙'] };
      const list = document.querySelector('#list');

      const render = () => {
        list.replaceChildren();
        state.items.forEach((name) => {
          const li = document.createElement('li');
          li.textContent = name;
          list.append(li);
        });
      };

      document.querySelector('#add').addEventListener('click', () => {
        state.items.push('新項目');
        render();
      });

      render();
    </script>
  </body>
</html>
```

**解析**

- 載入時就呼叫 render，所以不用等點擊也看得到兩列。
- 按鈕只對陣列 push，不自己建立 li。新列是下一次 render 畫出來的。
- 每次都整份重畫，狀態與畫面就不會各記各的。
- 文字來自陣列裡的字串，用 textContent 放進 li。

{% note success %}
**換你試試：**
按鈕 push 的文字改成「橡皮擦」。連點兩次，清單應出現兩次橡皮擦。
{% endnote %}

<details>
<summary>參考答案</summary>

兩次點擊是兩次 push，陣列裡會有兩筆相同文字。render 照陣列長度畫，不會把相同文字合併。

```diff 04-js/pages/146-js-render.html
  // ...
        };
  
        document.querySelector('#add').addEventListener('click', () => {
-         state.items.push('新項目');
+         state.items.push('橡皮擦');
          render();
        });
        // ...
```

</details>

## 綜合練習：待辦清單

待辦的每一筆是物件，含有 id、標題與是否完成。畫面仍然只由 render 產生。新增走表單送出，完成與刪除走清單上的一份 click，用按鈕的 data-action 分辨。

### 從狀態畫出清單

第一步先不要接事件。狀態裡放兩筆待辦，render 為每一筆做出標題與兩顆按鈕，完成的那筆加上 class。

**觀念**

done 為 true 時，li 加上 done，樣式表負責刪除線。按鈕先放上 data-action 與 data-id，下一步才用它們分辨點擊。id 轉成字串後放進 dataset。

```html 04-js/pages/147-js-todo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>待辦清單</title>
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

      render();
    </script>
  </body>
</html>
```

**解析**

- 第一筆 done 是 false，沒有刪除線。第二筆是 true，標題有刪除線。
- 每一列有兩顆按鈕，文字會依 done 在「標成完成」與「改回未完成」之間切換。
- 這一支還沒有聽表單，也還沒有聽清單，點按鈕不會改狀態。

{% note success %}
**換你試試：**
把第二筆的 done 改成 false。重新整理後，兩列都不該有刪除線，兩顆切換鈕都顯示「標成完成」。
{% endnote %}

<details>
<summary>參考答案</summary>

class 只在 done 為 true 時加上。兩筆都是 false 時，render 不會給任何 li 加上 done。

```diff 04-js/pages/147-js-todo.html
  // ...
          items: [
            { id: 1, title: '讀講義', done: false },
-           { id: 2, title: '改練習檔', done: true },
+           { id: 2, title: '改練習檔', done: false },
          ],
        };
        // ...
```

</details>

### 新增、切換與刪除

第二步補上兩份監聽。表單負責推進陣列，清單負責改某一筆的 done 或把它濾掉。兩邊最後都只呼叫 render。

**觀念**

submit 先 preventDefault，再用 checkValidity 看 required。通過後用 FormData 讀 title，推進 state.items，並把輸入框清掉。click 用 closest 找按鈕，依 data-action 決定要切換還是刪除。

```html 04-js/pages/147-js-todo.html.final
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>待辦清單</title>
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
    </script>
  </body>
</html>
```

**解析**

- 空白標題過不了 required，監聽會先停住，陣列不會多一筆。
- 新增時用 nextId 當新的 id，然後加 1，避免和舊列重複。
- 切換只改那一筆的 done。刪除用 filter 留下 id 不同的項目。
- 按鈕是 render 每次重做的，所以監聽必須放在 ul，不能放在按鈕上。

{% note success %}
**換你試試：**
標題去掉前後空白後若是空字串，不要推進陣列，也不要把輸入框清掉。只打空白再送出時，清單筆數不變。
{% endnote %}

<details>
<summary>參考答案</summary>

required 只把完全沒字視為沒填，幾個空白仍算有值。trim 之後若是空字串就 return，輸入框還留著那些空白。

```diff 04-js/pages/147-js-todo.html.final
  // ...
          }
          const data = new FormData(form);
-         const title = String(data.get('title'));
+         const title = String(data.get('title')).trim();
+         if (!title) return;
          state.items.push({ id: state.nextId, title, done: false });
          state.nextId += 1;
          // ...
```

</details>

# 選讀：打地鼠

這一節把計時器、狀態、class 與事件委派放進同一個小遊戲。九個洞用按鈕排出來，顏色代表狀態：黃是閒置，紅是地鼠出現，綠是剛被打中。

開始後倒數 20 秒。大約每 700 毫秒挑一個閒置洞變紅，800 毫秒沒被打到就回黃。只有紅色可以得分，得分後短暫變綠再回黃。時間到就清掉所有計時器，開始鈕可以再按。

## 畫面與狀態

第一步只建立狀態與 render。九個洞的狀態都放在同一個陣列，畫面的 class 完全由這份陣列決定。開始鈕先留著，還沒有接計時器。

**觀念**

state 集中分數、剩餘秒數、是否進行中，以及每個洞要清除的計時器識別碼。render 先拿掉 up 與 hit，再依陣列把不是閒置的狀態加回去。進行中時開始鈕設為不能按。

```html 04-js/pages/148-js-mole.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：打地鼠</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button { font: inherit; }
      .board { display: grid; grid-template-columns: repeat(3, 4.5rem); gap: 0.5rem; margin: 1rem 0; }
      .hole { width: 4.5rem; height: 4.5rem; border: 2px solid #0f766e; background: #fef9c3; }
      .hole.up { background: #ef4444; }
      .hole.hit { background: #22c55e; }
    </style>
  </head>
  <body>
    <p>剩餘 <span id="time">20</span> 秒，分數 <span id="score">0</span></p>
    <button type="button" id="start">開始</button>
    <div id="board" class="board">
      <button type="button" class="hole" data-index="0"></button>
      <button type="button" class="hole" data-index="1"></button>
      <button type="button" class="hole" data-index="2"></button>
      <button type="button" class="hole" data-index="3"></button>
      <button type="button" class="hole" data-index="4"></button>
      <button type="button" class="hole" data-index="5"></button>
      <button type="button" class="hole" data-index="6"></button>
      <button type="button" class="hole" data-index="7"></button>
      <button type="button" class="hole" data-index="8"></button>
    </div>
    <script>
      const state = {
        holes: ['idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle'],
        score: 0,
        timeLeft: 20,
        playing: false,
        clockId: 0,
        spawnId: 0,
        hideIds: {},
      };

      const render = () => {
        document.querySelector('#score').textContent = String(state.score);
        document.querySelector('#time').textContent = String(state.timeLeft);
        document.querySelectorAll('.hole').forEach((hole) => {
          const index = Number(hole.dataset.index);
          hole.classList.remove('up', 'hit');
          if (state.holes[index] !== 'idle') hole.classList.add(state.holes[index]);
        });
        document.querySelector('#start').disabled = state.playing;
      };

      render();
    </script>
  </body>
</html>
```

**解析**

- 九個按鈕都有 data-index，render 用這個數字對上 holes 陣列。
- 初始都是 idle，所以沒有紅也沒有綠，秒數是 20，分數是 0。
- playing 是 false，開始鈕可以按，但還沒有監聽。
- 分數與秒數寫進 span 的 textContent，不重組整段 HTML。

{% note info %}
**三種顏色對應三種素材**
黃色、紅色、綠色分別是閒置、出現與打中。若改用圖片，仍然用 class 切換。
不要把任何輸入接進圖片位址。這一課用色塊就夠把狀態看清楚。
{% endnote %}

{% note success %}
**換你試試：**
把 state 的 timeLeft 改成 15。重新整理後，畫面上的秒數應是 15。洞的顏色仍全部是黃。
{% endnote %}

<details>
<summary>參考答案</summary>

畫面上的 20 只是 HTML 的初值。render 一執行就改成 state 裡的數字，所以改狀態才會留在畫面上。

```diff 04-js/pages/148-js-mole.html
  // ...
          holes: ['idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle'],
          score: 0,
-         timeLeft: 20,
+         timeLeft: 15,
          playing: false,
          clockId: 0,
          // ...
```

</details>

## 開局、命中與結束

第二步把工作拆開。start 重置這一局並啟動計時器，spawn 讓地鼠出現，hit 處理打中，tick 每秒減時間，end 結束並清掉計時器。點擊只綁在棋盤上。

{% mermaid graph TD %}
startNode["start"] --> tickNode["tick 每秒"]
startNode --> spawnNode["spawn 挑閒置洞"]
spawnNode --> upNode["狀態改成 up"]
upNode --> hideNode["時間到改回 idle"]
upNode --> hitNode["hit"]
hitNode --> scoreNode["分數加一"]
tickNode --> endNode["時間到就 end"]
endNode --> clearNode["清除計時器"]
{% endmermaid %}

**觀念**

進行中若再呼叫 start 就直接結束，避免兩組 setInterval 疊在一起。每個紅洞的 setTimeout 識別碼放在 hideIds，打中或結束時都要 clearTimeout。地鼠回黃之前若已經不是 up，就不要覆蓋成閒置。

```html 04-js/pages/148-js-mole.html.final
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>選讀：打地鼠</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button { font: inherit; }
      .board { display: grid; grid-template-columns: repeat(3, 4.5rem); gap: 0.5rem; margin: 1rem 0; }
      .hole { width: 4.5rem; height: 4.5rem; border: 2px solid #0f766e; background: #fef9c3; }
      .hole.up { background: #ef4444; }
      .hole.hit { background: #22c55e; }
    </style>
  </head>
  <body>
    <p>剩餘 <span id="time">20</span> 秒，分數 <span id="score">0</span></p>
    <button type="button" id="start">開始</button>
    <div id="board" class="board">
      <button type="button" class="hole" data-index="0"></button>
      <button type="button" class="hole" data-index="1"></button>
      <button type="button" class="hole" data-index="2"></button>
      <button type="button" class="hole" data-index="3"></button>
      <button type="button" class="hole" data-index="4"></button>
      <button type="button" class="hole" data-index="5"></button>
      <button type="button" class="hole" data-index="6"></button>
      <button type="button" class="hole" data-index="7"></button>
      <button type="button" class="hole" data-index="8"></button>
    </div>
    <script>
      const STAY_MS = 800;
      const SPAWN_MS = 700;

      const state = {
        holes: ['idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle'],
        score: 0,
        timeLeft: 20,
        playing: false,
        clockId: 0,
        spawnId: 0,
        hideIds: {},
      };

      const render = () => {
        document.querySelector('#score').textContent = String(state.score);
        document.querySelector('#time').textContent = String(state.timeLeft);
        document.querySelectorAll('.hole').forEach((hole) => {
          const index = Number(hole.dataset.index);
          hole.classList.remove('up', 'hit');
          if (state.holes[index] !== 'idle') hole.classList.add(state.holes[index]);
        });
        document.querySelector('#start').disabled = state.playing;
      };

      const clearTimers = () => {
        clearInterval(state.clockId);
        clearInterval(state.spawnId);
        Object.keys(state.hideIds).forEach((key) => {
          clearTimeout(state.hideIds[key]);
        });
        state.hideIds = {};
      };

      const spawn = () => {
        const idleIndexes = [];
        state.holes.forEach((status, index) => {
          if (status === 'idle') idleIndexes.push(index);
        });
        if (idleIndexes.length === 0) return;
        const index = idleIndexes[Math.floor(Math.random() * idleIndexes.length)];
        state.holes[index] = 'up';
        state.hideIds[index] = setTimeout(() => {
          if (state.holes[index] === 'up') state.holes[index] = 'idle';
          render();
        }, STAY_MS);
        render();
      };

      const hit = (index) => {
        if (!state.playing || state.holes[index] !== 'up') return;
        clearTimeout(state.hideIds[index]);
        state.holes[index] = 'hit';
        state.score += 1;
        render();
        state.hideIds[index] = setTimeout(() => {
          state.holes[index] = 'idle';
          render();
        }, 300);
      };

      const end = () => {
        state.playing = false;
        clearTimers();
        state.holes = ['idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle'];
        render();
      };

      const tick = () => {
        state.timeLeft -= 1;
        if (state.timeLeft <= 0) {
          state.timeLeft = 0;
          end();
          return;
        }
        render();
      };

      const start = () => {
        if (state.playing) return;
        clearTimers();
        state.score = 0;
        state.timeLeft = 20;
        state.playing = true;
        state.holes = ['idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle', 'idle'];
        state.clockId = setInterval(tick, 1000);
        state.spawnId = setInterval(spawn, SPAWN_MS);
        spawn();
      };

      document.querySelector('#board').addEventListener('click', (event) => {
        const hole = event.target.closest('.hole');
        if (!hole || !event.currentTarget.contains(hole)) return;
        hit(Number(hole.dataset.index));
      });

      document.querySelector('#start').addEventListener('click', start);
      render();
    </script>
  </body>
</html>
```

**解析**

- start 先清掉上一局可能留下的計時器，分數歸零，秒數回到 20，九個洞回到 idle。
- spawn 只從 idle 的洞裡隨機挑，所以不會把已經是紅或綠的洞再排一次。
- hit 先確認正在遊戲而且該洞是 up，才加分並改成 hit。
- tick 把秒數減到 0 時呼叫 end。end 會清間隔、清每個洞的 timeout，並讓開始鈕恢復。
- 棋盤的 click 用 closest 找到洞，再把 data-index 交給 hit。點在洞以外不會計分。

{% note success %}
**換你試試：**
把地鼠停留的 STAY_MS 改成 1200。其他秒數不要改。紅洞應比原來更晚才自己回黃。
{% endnote %}

<details>
<summary>參考答案</summary>

停留時間只影響出現後自動回黃的那個 timeout。打中時仍會先清掉它，再改走 300 毫秒的變綠流程。

```diff 04-js/pages/148-js-mole.html.final
  // ...
      </div>
      <script>
-       const STAY_MS = 800;
+       const STAY_MS = 1200;
        const SPAWN_MS = 700;
  
        const state = {
          // ...
```

</details>

# 本篇重點回顧

下面八句是這一篇要帶走的習慣。選讀的 template 與打地鼠可以晚一點再做，前面的選取、重繪與事件要先熟。

- `window` 是分頁的全域物件，`document` 掛在它身上，用 const 宣告的名字不會變成它的屬性。
- 課堂 demo 把 script 放在 body 尾端。外部檔要延後就加 `defer`，模組腳本另開檔。寫在 head 且會立刻執行的程式，改等 `DOMContentLoaded`。
- 換頁用 `location.assign` 或 replace，往返用 `history.back`，尺寸比較 `innerWidth` 與 `screen.width`，捲動用 scrollTo。
- 單筆選取用 `querySelector`，多筆用 `querySelectorAll`，前者找不到是 null，後者則是長度為 0 的清單。
- 給人讀的文字放進 `textContent`，使用者打的字不要放進 `innerHTML`。有對應欄位就改 property，外觀用 class，最終樣式與尺寸另讀。
- 新節點用 `createElement` 建立後再插入，已經在樹上的節點再插入是搬移，要留下原件就先 `cloneNode`。
- 監聽用 addEventListener 登記並用同一個函式解除，被點到的是 `target`，父層代收時用 `closest` 找按鈕。
- 表單送出時先 `preventDefault`，檢查通過後用 FormData 讀值，資料改了就 `render`，結束時把計時器識別碼交給對應的 clear。

# 專有名詞中英對照

上網查這一篇的說法時，用括號裡的英文當關鍵字。順序跟內文第一次出現相同。

## 認識瀏覽器環境

這一組是分頁、文件樹，以及 script 何時執行。先分清全域物件與文件，再決定程式要不要延後。

- 瀏覽器物件模型（Browser Object Model）
- 文件物件模型（Document Object Model）
- 全域物件（global object）
- 節點（node）
- DOM 樹（DOM tree）
- 延遲腳本（defer）
- 文件解析完成（DOMContentLoaded）
- 模組腳本（module script）

## BOM

這一組依網址、視窗、瀏覽器資訊、列印與計時的順序排列。它們都掛在 window 上，也可以直接寫名字。

- 位置（Location）
- 歷史紀錄（History）
- 瀏覽器資訊（Navigator）
- 剪貼簿（Clipboard）
- 螢幕（Screen）
- 指派（assign）
- 取代（replace）
- 重新載入（reload）
- 返回（back）
- 前進（forward）
- 相對步數（go）
- 歷史狀態（history.state）
- 推入狀態（pushState）
- 取代狀態（replaceState）
- 內部寬度（innerWidth）
- 內部高度（innerHeight）
- 外部寬度（outerWidth）
- 可用寬度（availWidth）
- 裝置像素比（devicePixelRatio）
- 水平捲動（scrollX）
- 垂直捲動（scrollY）
- 捲動到（scrollTo）
- 相對捲動（scrollBy）
- 媒體查詢（matchMedia）
- 偏好語言（language）
- 連線狀態（onLine）
- 使用者代理（userAgent）
- 功能偵測（feature detection）
- 寫入剪貼簿（writeText）
- 列印（print）
- 警示對話框（alert）
- 確認對話框（confirm）
- 輸入對話框（prompt）
- 計時器（timer）
- 延遲執行（setTimeout）
- 間隔執行（setInterval）
- 動畫幀（requestAnimationFrame）
- 取消動畫幀（cancelAnimationFrame）

## DOM

這一組是選取、走訪、改寫與建立節點。事件的名字放在下一組。

- 選擇器（selector）
- 後代（descendant）
- 節點清單（NodeList）
- 父元素（parent element）
- 子元素（child element）
- 兄弟元素（sibling element）
- 最近祖先（closest）
- 符合選擇器（matches）
- 即時集合（HTMLCollection）
- 文字內容（textContent）
- 內部文字（innerText）
- 內部 HTML（innerHTML）
- 跨站腳本攻擊（XSS）
- 外部 HTML（outerHTML）
- HTML 屬性（attribute）
- DOM 屬性（property）
- 類別名稱（className）
- 取得屬性（getAttribute）
- 是否有屬性（hasAttribute）
- 設定屬性（setAttribute）
- 移除屬性（removeAttribute）
- 切換屬性（toggleAttribute）
- 布林屬性（boolean attribute）
- 布林 property（boolean property）
- 自訂資料（dataset）
- 自訂資料屬性（data-*）
- 類別清單（classList）
- 行內樣式（inline style）
- 計算後樣式（computed style）
- 邊界矩形（DOMRect）
- 捲入視窗（scrollIntoView）
- 建立元素（createElement）
- 文字節點（text node）
- 範本元素（template element）
- 文件片段（DocumentFragment）

## DOM 事件

這一組是監聽、委派與表單送出。名字依照點擊、輸入、冒泡、委派、捕獲、送出的順序。

- 事件監聽（event listener）
- 行內事件處理器（inline event handler）
- 內容安全政策（Content Security Policy）
- 事件物件（event object）
- 事件目標（event target）
- 目前目標（currentTarget）
- 視窗座標（clientX）
- 頁面座標（pageX）
- 偏移座標（offsetX）
- 鍵值（key）
- 實體鍵碼（code）
- 重複按鍵（repeat）
- 修飾鍵（modifier key）
- 預設行為（default action）
- 事件冒泡（event bubbling）
- 事件委派（event delegation）
- 事件捕獲（event capture）
- 表單資料（FormData）
- 約束驗證（constraint validation）

## 資料驅動畫面

這一組是清單怎麼跟著資料重畫。待辦清單是這個做法的練習。

- 狀態（state）
- 重繪（re-render）

## 選讀：打地鼠

這一組是遊戲裡兩個會重複發生的動作。停留時間與分數都寫在狀態裡。

- 生成（spawn）
- 命中（hit）

