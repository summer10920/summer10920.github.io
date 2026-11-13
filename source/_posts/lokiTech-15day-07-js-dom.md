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

瀏覽器把分頁與這一份 HTML 都收成物件，JavaScript 才碰得到畫面。這一篇先分清 BOM 與 DOM，並決定 script 何時執行；接著選取、改寫與建立節點，再用事件與表單接上使用者的操作，最後讓清單由一份狀態重畫出來。選讀補充瀏覽紀錄、視窗尺寸、剪貼簿與列印、navigator、requestAnimationFrame、事件的捕獲與冒泡，以及打地鼠小遊戲。網路請求與瀏覽器儲存留到下一篇。

<!-- more -->

# 認識瀏覽器環境

JavaScript 在瀏覽器裡不是獨自存在，它一開始就站在分頁提供的物件上。這一章先分清瀏覽器物件模型與文件物件模型，再用一棵小樹看出文件怎麼層層包住。接著處理 script 什麼時候執行，避免程式在元素出現之前就去找它。

## BOM 與 DOM

瀏覽器給 JavaScript 兩組物件：瀏覽器物件模型（Browser Object Model，簡稱 BOM）描述分頁與瀏覽器本身，文件物件模型（Document Object Model，簡稱 DOM）描述分頁裡的這一份 HTML。文件物件掛在分頁物件底下，所以改網址與改標題是兩層不同的物件，卻從同一個起點走下去。

{% mermaid graph LR %}
windowNode["window"] --> locationNode["location"]
windowNode --> historyNode["history"]
windowNode --> navigatorNode["navigator"]
windowNode --> documentNode["document"]
{% endmermaid %}

location 是目前網址，history 是這個分頁的瀏覽紀錄，navigator 是瀏覽器與裝置的資訊，三者屬於 BOM，下一章逐一使用。document 屬於 DOM，之後操作畫面都從它開始。這一節先看 window 與 document 的關係，再看文件如何組成一棵樹。本章的輸出區塊只列出 Console 的文字內容，和實際畫面（行號、顏色）略有不同。

### window 與 document

window 是瀏覽器分頁裡的全域物件，也就是程式隨處讀得到的最外層物件。document 掛在它身上，兩種寫法拿到的是同一個東西。

**觀念**

- 直接寫 document，瀏覽器會往全域物件找，找到的就是 window 上的那一份。同理，瀏覽器提供的函式例如 setTimeout 也掛在 window 上，所以平常可省略前綴。
- 自己用 const 或 let 宣告的名字留在程式裡，不會變成 window 的屬性。只有舊式的 var 會，這是現在不用它的原因之一。

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

- 第一行是 true，因為 window 上有個屬性叫 window，指回它自己。
- 第二行是 true，直接寫的 document 就是 window 的那份文件。
- 第三行是 undefined，course 只活在這段程式裡，並沒有被掛到 window 上。

```text
true
true
undefined
```

### DOM 樹

document 裡面的標籤會組成一棵樹，上層元素包著下層元素。html 是樹根，head 與 body 是它的兩個子元素，寫在 body 裡的標題與段落再往下長。程式之後都是沿著這棵樹找到節點。

**觀念**

- 最外層的 html 元素用 document.documentElement 拿到。
- head 與 body 是 document 上現成的屬性，對應樹的兩枝。
- 這一節只印出標籤名；怎麼往下找 main、標題與段落，留到選取元素那一節。

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

- 第一行是 HTML，第二行是 HEAD，第三行是 BODY。HTML 文件裡的標籤名由 tagName 讀出時一律是大寫。
- 這支程式只讀了樹的第一層，沒有走進 main 底下，那部分留到選取元素。

```text
HTML
HEAD
BODY
```

## script 載入時機

瀏覽器由上往下讀 HTML，讀到 script 就先執行它。如果 script 寫在元素之前，執行當下那些元素還不在樹上，連 body 都還是 null，後面的程式就會失敗。這一節看幾種讓程式晚一點執行的做法，由簡單到常用依序介紹。

**一覽**

- 放在 body 尾端：最直接，前面的元素都讀完了才輪到程式。
- `defer`：script 可以留在 head，等整份 HTML 解析完才執行，要搭配外部檔。
- `DOMContentLoaded`：程式自己登記一個事件，等文件解析完再跑。
- 模組腳本：預設就有 defer 的時機，是選讀。

### 放在 body 尾端

最簡單的辦法是把 script 寫在要用的元素後面。瀏覽器讀到它時，前面的元素都已經在樹上。

**觀念**

瀏覽器讀到沒有 defer 的 script，會先停下來執行完，才繼續往下讀 HTML。所以 head 裡的 script 看不到 body，body 尾端的 script 則看得到。實務上常把程式放進外部檔，這一章為了閱讀方便，除了外部檔的示範，其餘都寫在同一份 HTML。

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
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(document.body.tagName);
    </script>
  </body>
</html>
```

**解析**

- Console 先出現 null，這是 head 裡的 script 印的：它執行時瀏覽器還沒讀到 body。
- 接著出現 BODY，這是 body 尾端的 script 印的：段落已經在樹上，body 也就存在了。

```text
null
BODY
```

### defer

程式放在 body 尾端，要等 HTML 讀到最後才開始下載，檔案一長就拖慢載入；現在的寫法是把外部檔留在 head，並加上 defer。瀏覽器一邊讀 HTML 一邊下載它，等整份文件解析完才依序執行。

**觀念**

defer 只對有 src 的 script 生效，內嵌的 script 加了也不會延後。多支 defer 會照它們在文件裡的順序執行。這一頁因此把程式拆成一支外部檔。

```html 04-js/pages/88-js-defer.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>defer</title>
    <script defer src="88-js-defer.js"></script>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
  </body>
</html>
```

```js 04-js/pages/88-js-defer.js
console.log(document.body.tagName);
```

**解析**

- script 寫在 head，卻在 body 解析完之後才執行，所以 Console 印出 BODY，不是 null。

```text
BODY
```

{% note info %}
**async 與 defer 不同**：`async` 是下載完就立刻執行，不等 HTML，多支之間的順序也不固定，適合各自獨立的程式（例如統計碼）。要操作頁面元素的程式用 defer。
{% endnote %}

### DOMContentLoaded

有時程式必須寫在 head 的內嵌 script，又不能用 defer。這時改成請瀏覽器在文件解析完時通知程式，這個通知就是 DOMContentLoaded 事件。

**觀念**

- DOMContentLoaded 在 HTML 解析完、defer 的程式跑完之後發出，不等圖片下載完；等到圖片等資源都載完才發出的是 window 的 load 事件。
- 事件的綁法下一章才會展開，這裡只要知道：用 addEventListener 先登記一個函式，等事件發生才執行它。

```html 04-js/pages/89-js-ready.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOMContentLoaded</title>
    <script>
      console.log(document.body);

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

- 第一行 null 來自事件外面的程式：它在 head 裡立刻執行，當時 body 還沒出現。
- 第二行 BODY 來自事件裡的函式：登記時只是先記下，等文件解析完才執行，這時 body 已經存在。
- 若搭配 defer 或把程式放在 body 尾端，通常就不需要這個事件。

```text
null
BODY
```

### 選讀：模組腳本

程式拆成多支檔案時，script 要寫成模組（寫法見 {% post_link lokiTech-15day-06-js-basics %} 的「選讀：ES Module」）。模組腳本的載入時機有個好處：不用另外加 defer。

**觀念**

- 外部模組腳本預設就像加了 defer，標籤寫在 head 也會等文件解析完才執行。
- 模組檔必須透過網址（本機伺服器或 Vite）開啟；直接用檔案路徑開啟時，瀏覽器會因跨來源限制而拒絕載入它。
- 這一頁沒用到 import 與 export，只借它示範載入時機。

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

- script 在 head，卻印出 BODY，因為模組腳本等到文件解析完才執行。
- 沒有 type 屬性的同一支檔會在 head 立刻執行，並印出 null。

# BOM

瀏覽器物件模型（BOM）是瀏覽器掛在 `window` 上的一組物件與函式，用來操作瀏覽器本身，而不是網頁內容。這一章先處理網址與導覽，再看視窗、瀏覽器資訊、列印與計時。會換頁、捲動或列印的動作都包成函式，打開頁面後在 Console 自己呼叫，結果看 DevTools 的 Console。輸出區塊只列出文字內容，和 Console 實際畫面（行號、引號、顏色）略有不同。

## 認識 window

BOM 的一切都從 window 開始：網址、瀏覽紀錄、視窗尺寸與瀏覽器資訊，都是它底下的物件。這一節先看 window 本身的性質，再用一覽認識最常用的五個物件。

### 全域物件

`window` 是這個分頁的全域物件，也就是整個分頁共用、隨處都能直接取用的最上層物件。直接寫名字，等於從 window 再點一次。下圖是後面會用到的物件，它們都掛在 window 上，所以寫 `location` 與寫 `window.location` 是同一個東西。

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
      console.log(window.location === location);
      console.log(window.history === history);
      console.log(window.navigator === navigator);
      console.log(window.screen === screen);
    </script>
  </body>
</html>
```

```text
true
true
true
true
true
```

**解析**

- 五行都是 true，直接寫名字與從 window 點出來，讀到的是同一個東西。
- 這也是為什麼平常寫 location、history 時不必加 window 前綴。

### 常用的 BOM 物件

下面五個物件都掛在 window 上，直接寫名字就讀得到，後面的小節會逐一使用。

**一覽**

- `location` 讀寫網址，也可以導向或重新載入。
- `history` 在瀏覽紀錄裡返回、前進，或改寫目前這一筆。
- `navigator` 讀語言與連線狀態，也可以寫入剪貼簿。
- `screen` 讀整塊螢幕的寬高，不隨視窗拉窄而變。
- `document` 指向這一份 HTML，改內容留到下一章。

列印、捲動與計時不是獨立物件，而是 window 上的函式，後面各有一節。

## 網址與導覽

`location` 管網址列現在的內容，`history` 管這個分頁走過的紀錄。這一節先讀出網址的各段，特別是查詢字串，因為頁面常靠它接收參數。接著學導向與重新載入，最後用選讀看紀錄往返，以及不重新載入就能改網址的寫法。

### 讀取網址

一個網址由協定、主機、路徑、查詢字串與片段組成。`location` 把每一段拆成屬性，讀出來就能判斷目前在哪一頁、帶了什麼參數。

**一覽**

- `href` 回傳完整網址。
- `origin` 回傳協定、主機與連接埠，三者合起來決定網站的來源。
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

- 第一行是完整網址，後面六行依序是它拆開的各段。協定與主機會依你開啟頁面的方式而不同。
- `search` 包含開頭的問號，`hash` 包含開頭的井字號；網址沒有這兩段時，兩者都是空字串。
- 這支程式只讀取、不改任何屬性，所以頁面不會跳走。

### 讀取查詢參數

查詢字串是網址裡問號之後的一串「名稱=值」，用 `&` 隔開，例如 `?page=2&tag=js`。列表頁用它指定第幾頁，搜尋頁用它帶關鍵字。`location.search` 只給整串文字，要取出單一參數，就交給內建的 `URLSearchParams`：把查詢字串傳進去，得到一個可以逐項查詢的物件。

**一覽**

- `get` 回傳指定名稱的第一個值，一律是字串，沒有這個名稱時是 `null`。
- `getAll` 回傳指定名稱的全部值，是陣列，沒有時是空陣列。
- `has` 回傳這個名稱是否存在，是 true 或 false。

```html 04-js/pages/92b-js-search-params.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>讀取查詢參數</title>
  </head>
  <body>
    <p>點下面的連結換一組查詢字串，結果在 DevTools 的 Console。</p>
    <ul>
      <li><a href="?page=2&tag=js&tag=css">?page=2&amp;tag=js&amp;tag=css</a></li>
      <li><a href="?keyword=台北">?keyword=台北</a></li>
      <li><a href="92b-js-search-params.html">沒有查詢字串</a></li>
    </ul>
    <script>
      const params = new URLSearchParams(location.search);

      console.log(location.search);
      console.log(params.get('page'));
      console.log(params.get('tag'));
      console.log(params.getAll('tag'));
      console.log(params.has('keyword'));
      console.log(params.get('keyword'));

      const page = Number(params.get('page') ?? 1);
      console.log(page);
    </script>
  </body>
</html>
```

點第一個連結，網址變成 `?page=2&tag=js&tag=css`，Console 是：

```text
?page=2&tag=js&tag=css
2
js
(2) ['js', 'css']
false
null
2
```

點第二個連結，網址帶的是 `?keyword=台北`，Console 是：

```text
?keyword=%E5%8F%B0%E5%8C%97
null
null
[]
true
台北
1
```

點第三個連結，沒有查詢字串，`location.search` 是空字串，`get` 全部回傳 `null`，`has` 是 false，最後的 page 是 1。

**解析**

- 每個連結都只改查詢字串，所以頁面重新載入，程式重跑一次，Console 顯示新的結果。
- `get('page')` 得到的是字串 `'2'`，不是數字。要當數字用就包 `Number`。
- 同一個名稱出現兩次時，`get` 只拿第一個，要全部就用 `getAll`。
- 中文在網址裡會被編碼成 `%E5%8F%B0%E5%8C%97`，所以 `location.search` 是編碼後的樣子；`get` 會自動解碼，拿到的是「台北」。
- 參數缺少時 `get` 回傳 `null`。`Number(null)` 是 0，所以預設值要先用 `?? 1` 補上，再轉成數字。

### 組出查詢字串

反過來要把物件組成查詢字串時，也用 `URLSearchParams`。它會自動把中文與特殊字元編碼，不必自己拼接字串。組好的字串可以接在路徑後面，變成新的網址，常用在換頁或搜尋。

**一覽**

- `new URLSearchParams(物件)` 用物件的每一組屬性建立查詢參數。
- `set` 設定指定名稱的值，名稱已存在就覆蓋。
- `append` 再加上一組同名的值，不覆蓋。
- `toString` 回傳不含問號的查詢字串，放進樣板字串時會自動呼叫。

```html 04-js/pages/92c-js-build-query.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>組出查詢字串</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const query = new URLSearchParams({ page: 2, keyword: '台北' });
      console.log(query.toString());

      query.set('page', 3);
      query.append('tag', 'js');
      console.log(query.toString());

      console.log(`${location.pathname}?${query}`);
    </script>
  </body>
</html>
```

```text
page=2&keyword=%E5%8F%B0%E5%8C%97
page=3&keyword=%E5%8F%B0%E5%8C%97&tag=js
/01-html-css-js/04-js/pages/92c-js-build-query.html?page=3&keyword=%E5%8F%B0%E5%8C%97&tag=js
```

**解析**

- 第一行：物件裡的數字 2 會被轉成文字，「台北」被編碼，兩組參數用 `&` 連起來。
- 第二行：`set` 把 page 改成 3，`append` 在最後加上 tag，原有的 keyword 不變。
- 第三行：樣板字串把路徑、問號與查詢字串接成完整的相對網址，可以交給下一節的導向使用。後面 fetch 請求資料時，也是用同樣的方式組出網址。

### 導向與重新載入

要用程式換頁時，可以指定網址，或呼叫 assign、replace 兩個方法，差別在瀏覽紀錄。紀錄是這個分頁走過的每一頁，使用者按「上一頁」就是往回走一筆。重新載入則不換網址。

**一覽**

- 指定 `href` 導向新網址，並新增一筆紀錄，按上一頁可以回到原頁。
- `assign` 效果與指定 href 相同，只是寫成方法呼叫。
- `replace` 導向新網址，並用它取代目前這一筆紀錄，按上一頁回不到原頁。
- `reload` 重新載入目前這一頁，不換網址。
- 指定 `hash` 只移到同一份文件的片段，不重新載入，也會新增一筆紀錄。

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

- 頁面一打開，Console 只印出目前頁面的路徑，不會自己跳走，因為三種寫法都包在函式裡，要呼叫才會執行。
- 在 Console 輸入 `goAssign()` 會跳到 92 號頁面，按上一頁可以回到這一頁。
- 重新打開這一頁再輸入 `goReplace()`，同樣跳到 92 號頁面，但按上一頁會跳過這一頁，回到更早的頁面。
- `reloadPage()` 不換網址，頁面重新載入後，Console 預設會被清空，再重新印出目前頁面。

{% note info %}
一般換頁用 assign，讓使用者能按上一頁回來。登入成功後導向首頁，或登入檢查失敗而導向登入頁時用 replace，避免使用者按上一頁又回到不該停留的頁面。
{% endnote %}

### 選讀：返回與前進

瀏覽紀錄的往返由 history 負責。這一節用網址片段造出幾筆紀錄，再從 Console 呼叫函式來往返。

**一覽**

- `back` 回到上一筆紀錄。
- `forward` 前往下一筆紀錄。
- `go` 依整數步數移動，負數往回、正數往前，0 會重新載入。
- `length` 回傳紀錄筆數。

前三個都不回傳有用的值，而且移動是非同步的，呼叫之後網址要等一下才會變。步數超出範圍時，頁面留在原地。

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

第一次打開時，Console 是下面的樣子。`length` 會把這個分頁先前瀏覽過的頁面也算進去，所以你看到的數字可能不同，這裡以 4 為例：

```text
#three
4
```

呼叫 goBack()，等網址變成 `#two`，再呼叫 showPlace()：

```text
#two
4
```

**解析**

- 片段還是空的時候才連寫 one、two、three，瀏覽器會補上井字號，網址停在 `#three`。
- 這個例子的分頁原本有 1 筆紀錄，再加上三段片段，所以 `length` 是 4。
- goBack 與 goSteps 不會在同一輪立刻改掉網址，要等網址變了再呼叫 showPlace。
- 往返只在既有紀錄裡移動，`length` 維持原數字；`go(0)` 才會重新載入，`go(20)` 這種超出範圍的步數會停在原頁。
- 重新載入後網址仍帶著片段，if 條件不成立，就不會再累加紀錄。

### 選讀：pushState 與 replaceState

改 hash 只能產生網址片段。要在不重新載入的前提下，把紀錄與網址整個換掉，就用 `pushState` 與 `replaceState`。後面 React Router 換頁時不重載整頁，靠的就是這組方法。

**一覽**

- `pushState` 新增一筆紀錄並寫入資料，文件不重新載入。
- `replaceState` 改寫目前這一筆，筆數不增加。

兩者的參數相同：

- 第一個是要保存的資料，之後從 `history.state` 讀出，還沒寫過時是 null。
- 第二個是標題，現在的瀏覽器不使用，傳空字串。
- 第三個是新的網址，這個範例只換片段。

```html 04-js/pages/95-js-state.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pushState 與 replaceState</title>
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

第一次打開時，最後一行的筆數同樣依分頁先前的紀錄而定，這裡以 2 為例：

```text
1
#one
replaced
2
```

**解析**

- `pushState` 讓網址片段變成 `#one`，state 的 page 是 1，文件沒有整頁重載。
- `replaceState` 改掉目前這一筆的 state，所以接著印出 replaced，筆數維持 push 之後的數字，沒有再加 1。
- 使用者按上一頁時，瀏覽器會發出 `popstate` 事件通知頁面。事件留到下一章，這裡先不監聽。

## 選讀：視窗與畫面

瀏覽器視窗的大小、螢幕的大小與頁面捲到哪裡，都可以用程式讀出來。這一節依序看尺寸、捲動，以及用程式問目前符合哪一種媒體查詢。

### 視窗與螢幕尺寸

視窗和螢幕是兩件事：拉動視窗邊緣，視窗的尺寸會變，整塊螢幕的尺寸不會變。視窗相關的屬性掛在 `window` 上，螢幕相關的掛在 `screen` 上，這裡把兩組數字印在一起對照。

**一覽**

- `innerWidth` 與 `innerHeight`：頁面可排版的區域尺寸，單位是 CSS 像素。若有垂直捲軸，寬度會包含捲軸。
- `outerWidth` 與 `outerHeight`：整個瀏覽器視窗的尺寸，連工具列與邊框都算進去，所以不會比內部尺寸小。
- `screen.width` 與 `screen.availWidth`：整塊螢幕的寬，以及扣掉系統工作列之後的可用寬。
- `devicePixelRatio`：一個 CSS 像素對應幾個實體像素。高密度螢幕常是 2，一般螢幕是 1；瀏覽器縮放頁面時，這個數字也會跟著變。

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
      console.log('innerWidth', innerWidth);
      console.log('innerHeight', innerHeight);
      console.log('outerWidth', outerWidth);
      console.log('screen.width', screen.width);
      console.log('screen.availWidth', screen.availWidth);
      console.log('devicePixelRatio', devicePixelRatio);
    </script>
  </body>
</html>
```

下面是某一台電腦的例子，實際數字以你的裝置為準。本篇的輸出區塊只列出文字內容，和 Console 實際畫面（行號、顏色）略有不同。

```text
innerWidth 1200
innerHeight 780
outerWidth 1200
screen.width 1440
screen.availWidth 1440
devicePixelRatio 2
```

**解析**

- 頁面上只有那句說明，六個數字都印在 Console。
- 前兩行是頁面區域的寬與高。程式只在載入時讀一次，所以拉動視窗後要重新整理，才會印出新的數字。
- 第三行的外框寬度一定不小於內部寬度。視窗最大化時兩者常常相同。
- 第四、五行是螢幕的寬，不會因為視窗拉窄而改變；可用寬度扣掉工作列，不會大於螢幕寬。
- 最後一行是像素比。`innerWidth` 這類掛在 window 上的名字，前面的 `window.` 可以省略；螢幕的數字則要保留 `screen.`。

### 捲動位置

頁面捲動的距離放在 `scrollX` 與 `scrollY`，單位是像素，停在最左上角時都是 0。要用程式移動位置，就呼叫 `scrollTo` 或 `scrollBy`。

**一覽**

- `scrollX` 與 `scrollY`：讀出目前水平與垂直的捲動距離。
- `scrollTo`：直接移到指定位置。
- `scrollBy`：在目前位置上再加一段距離。
- 選項 `behavior`：`smooth` 是平滑移動，`instant` 是立刻跳過去；預設的 `auto` 則交給 CSS 的 scroll-behavior 決定，沒有設定時就是立刻跳。

{% mermaid graph LR %}
topNode["scrollY 為 0"] --> downNode["scrollBy 往下加"]
downNode --> backNode["scrollTo 回到 0"]
{% endmermaid %}

下面的函式要在 Console 呼叫才會執行，頁面才會動。

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

呼叫 `scrollDown()`，等捲動停下來再呼叫 `showScroll()`：

```text
0
400
```

**解析**

- 頁面是一段 1800 像素高的空白加上底部文字，所以可以往下捲。
- 載入時停在最上方，所以兩個距離都是 0。
- `scrollDown` 用 `scrollBy` 往下加 400 像素，頁面會平滑地往下滑。
- 平滑捲動還沒停時就印位置，垂直距離可能還在中間值。等畫面停下來再呼叫 `showScroll`，才會是 400。
- `scrollTop` 用 `scrollTo` 回到左上角，同樣是平滑移動；回去後再印位置，兩個數字會回到 0。

### 媒體查詢與深色模式

CSS 用 `@media` 描述「寬度超過多少」「系統是深色」這類條件。JavaScript 也能問同樣的問題：`matchMedia` 接收一段媒體查詢文字，回傳一份查詢結果，其中的 `matches` 是目前是否符合，符合是 true，不符合是 false。

- `(prefers-color-scheme: dark)` 問系統或瀏覽器是否設為深色。
- `(min-width: 800px)` 問視窗寬度是否至少 800 像素。

```html 04-js/pages/98-js-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>媒體查詢與深色模式</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const darkQuery = matchMedia('(prefers-color-scheme: dark)');
      console.log('深色模式', darkQuery.matches);

      const wideQuery = matchMedia('(min-width: 800px)');
      console.log('寬度至少 800', wideQuery.matches);
    </script>
  </body>
</html>
```

系統是淺色、視窗寬過 800 像素時：

```text
深色模式 false
寬度至少 800 true
```

**解析**

- 頁面只有說明文字，兩行結果在 Console。
- `matchMedia` 回傳的是查詢結果，不是布林，要讀它的 `matches` 才知道符不符合。
- 程式只在載入時印一次，系統切成深色或視窗拉窄之後，Console 不會自動更新。
- `darkQuery` 留在頁面裡，所以可以直接在 Console 輸入 `darkQuery.matches`，不必重新整理就能讀到最新結果。
- 這裡只讀目前的狀態。要在狀態改變的當下收到通知，需要事件的做法，見本篇後面的事件章節。

{% note info %}
**樣式優先用 CSS**
只是換顏色或版面時，直接在 CSS 寫 `@media`，Tailwind 的 `dark:` 也是同一套機制。只有需要依結果執行程式（例如換成另一組資料）時，才用 `matchMedia`。
{% endnote %}

## 選讀：瀏覽器資訊

`navigator` 是代表瀏覽器本身的物件：提供偏好語言、連線狀態與識別字串，剪貼簿也從它寫入。這一節先讀語言與連線，再看識別字串，最後把文字寫進剪貼簿。

### 語言與連線

`navigator` 有幾個屬性只讀、不改瀏覽器的設定，這一節只讀取它們。

**一覽**

- `language`：瀏覽器偏好的語言，回傳字串，繁體中文環境常見 zh-TW。
- `languages`：偏好語言的陣列，第一個多半與 `language` 相同。
- `onLine`：瀏覽器認為目前有沒有網路，回傳布林。

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
      console.log('language', navigator.language);
      console.log('languages', navigator.languages);
      console.log('onLine', navigator.onLine);
    </script>
  </body>
</html>
```

繁體中文的 Chrome、目前有網路時：

```text
language zh-TW
languages ['zh-TW', 'zh', 'en-US', 'en']
onLine true
```

**解析**

- 第一行是偏好語言。網站常用它決定預設要顯示哪種語言。
- 第二行是陣列，依偏好順序排列，內容隨你的瀏覽器語言設定而不同。
- 第三行的 `onLine` 只是參考：`false` 比較可信，代表一定連不出去；`true` 只代表有接上網路，不保證真的連得到網站。要確定連線，應該實際發出請求，再處理失敗的情況。

### 識別字串 userAgent

`navigator.userAgent` 是使用者代理字串（user agent）。瀏覽器每次向伺服器要網頁時，都會附上這串文字自我介紹，JavaScript 也讀得到同一串。

```html 04-js/pages/99b-js-useragent.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>識別字串 userAgent</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log(navigator.userAgent);
    </script>
  </body>
</html>
```

下面是一台 Mac 上的 Chrome 的例子，版本號依你的瀏覽器而不同：

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
```

**解析**

這串文字由幾段組成，從左到右大致是：

- `Mozilla/5.0` 是早年留下的開頭，現在幾乎所有瀏覽器都這樣寫，沒有實際意義。
- 括號裡是作業系統。Windows 會出現 Windows NT 10.0，手機會出現 iPhone 或 Android。
- `AppleWebKit/537.36 (KHTML, like Gecko)` 是排版引擎的標示。「像 Gecko」是為了讓只認 Firefox 的舊網站也願意給正常版面。
- `Chrome/141.0.0.0` 才是真正的瀏覽器與主版本號。
- 結尾的 `Safari/537.36` 同樣是為了相容舊網站，並不代表你在用 Safari。

同一串裡同時出現 Mozilla、Gecko、Chrome、Safari，是瀏覽器互相模仿留下的歷史包袱。Chrome 還刻意把細節固定住：macOS 版本永遠寫成 10_15_7，版本號後三段也一律是 0，避免被拿來辨識個別使用者。

{% note warning %}
**識別字串不可靠**
`userAgent` 適合拿來看看，不適合拿來寫判斷，因為內容會變、還會互相模仿。想知道某個功能能不能用，與其猜這是哪一種瀏覽器，不如直接檢查那個功能存不存在，例如 `if (navigator.clipboard)`：有就使用，沒有就改用別的做法。這種寫法叫做功能偵測。
{% endnote %}

### 寫入剪貼簿

`navigator.clipboard.writeText` 把一段文字寫進系統剪貼簿，之後就可以在別處貼上。瀏覽器對這件事有幾個限制：

- 頁面必須是安全連線：https，或本機的 localhost、127.0.0.1（Live Server 用的就是後者）。不在安全連線時，`navigator.clipboard` 根本不存在。
- 頁面必須在前景並取得焦點。在 DevTools 的 Console 輸入程式時，焦點在 DevTools 而不是頁面，常會失敗，錯誤訊息類似 Document is not focused。
- 實務上要由使用者的點擊觸發，所以這個 demo 用按鈕。按鈕與 `addEventListener` 在本篇後面的事件章節才說明，這裡先照著用。

寫入需要時間，`writeText` 回傳的是 Promise（代表一件還沒完成的事），成功後用 `.then` 接下一步。Promise 的細節見 {% post_link lokiTech-15day-08-js-async %}。

```html 04-js/pages/100-js-clipboard.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>寫入剪貼簿</title>
  </head>
  <body>
    <button type="button">複製文字</button>
    <script>
      const button = document.querySelector('button');

      button.addEventListener('click', () => {
        navigator.clipboard.writeText('BOM').then(() => {
          console.log('已複製');
        });
      });

      console.log('等待點擊');
    </script>
  </body>
</html>
```

載入時先印出提示。點擊按鈕且成功時，再多一行：

```text
等待點擊
已複製
```

**解析**

- 頁面上有一個「複製文字」按鈕，載入時只印出「等待點擊」，不會自己寫進剪貼簿。
- 點擊按鈕後，文字 BOM 被寫進剪貼簿；到任何輸入框按貼上，就會看到它。
- 「已複製」比「等待點擊」晚出現，因為要等寫入完成才執行 `.then` 裡的函式。
- 若寫入被拒絕，Console 會出現紅色的 NotAllowedError，多半是網址不在安全連線，或頁面沒有焦點。

## 選讀：列印與對話框

`print` 會打開系統的列印對話框；`alert`、`confirm`、`prompt` 是另外三個內建對話框。這四個函式有一個共通點：對話框關掉之前，這個分頁的程式會停在原地等待。

### 列印

`print` 是 window 的方法，打開列印對話框，預設印出目前這一頁。對話框開著的期間，下一行程式不會跑，要等對話框關掉才繼續。若直接寫在檔案最外層，一開頁就會跳出對話框，所以先包成函式，再從 Console 呼叫。

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
        console.log('列印之前');
        print();
        console.log('列印之後');
      };

      console.log('呼叫 printPage() 會打開列印對話框');
    </script>
  </body>
</html>
```

呼叫 `printPage()` 並關掉對話框之後：

```text
呼叫 printPage() 會打開列印對話框
列印之前
列印之後
```

**解析**

- 頁面打開時只印出提示，不會自己跳出列印。
- 在 Console 呼叫 `printPage` 才會打開對話框，「列印之前」先出現。
- 「列印之後」要等對話框關掉才會出現，這就是程式被停住的證明。
- 按取消只是關掉對話框，網址與頁面內容都留在原地。

{% note info %}
**另開視窗**
`window.open` 會開出新分頁或新視窗。瀏覽器只允許在使用者點擊的當下呼叫，否則會把它當成彈出廣告擋下來，並回傳 `null`。
{% endnote %}

### alert、confirm 與 prompt

這三個函式在 {% post_link lokiTech-15day-06-js-basics %} 的「選讀：alert、confirm 與 prompt」已有完整示範，這裡只回顧用途與回傳值，再和 `print` 搭配。

**一覽**

- `alert`：只顯示訊息，沒有可用的回傳值。
- `confirm`：讓人選確定或取消，回傳 true 或 false。
- `prompt`：讓人輸入文字，回傳輸入的字串，按取消得到 `null`。

三者和 `print` 一樣會停住程式，所以可以先用 `confirm` 問過，再決定要不要呼叫 `print`。

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

載入時只印出提示。呼叫 `printIfConfirmed()` 並按確定後，先印出 true，接著打開列印對話框：

```text
呼叫 printIfConfirmed()
true
```

**解析**

- 頁面打開時只印出提示，不會自己跳出確認框。
- `confirm` 會停住這個分頁，印出 ok 的那一行要等確認框關掉才出現。
- 按確定時 ok 是 true，接著呼叫 `print`；按取消時 ok 是 false，只印出 false，不會列印。

## 計時器

程式預設一行接著一行跑完，不會自己等。計時器讓你把一個函式先登記起來，時間到了再由瀏覽器呼叫它，程式本身不用停在原地乾等。這一節先看只執行一次的 setTimeout，再看每隔一段時間重複的 setInterval，以及怎麼取消它們。選讀最後介紹對齊畫面更新的 requestAnimationFrame。

**一覽**

- 執行一次：`setTimeout(函式, 毫秒)` 等了指定毫秒之後呼叫一次函式；`clearTimeout(識別碼)` 在它執行之前取消。
- 重複執行：`setInterval(函式, 毫秒)` 每隔指定毫秒就呼叫一次，直到被停止；`clearInterval(識別碼)` 負責停止。
- 兩個 set 函式都回傳識別碼，是一個用來指認這個計時器的數字。要取消時，把識別碼交給對應的 clear 函式。
- 交給計時器的函式叫回呼函式（callback）：不是現在執行，而是時間到了由別人呼叫。

{% mermaid graph LR %}
setNode["setTimeout 或 setInterval"] --> idNode["識別碼"]
idNode --> clearNode["clear 函式取消"]
idNode --> runNode["時間到，執行函式"]
{% endmermaid %}

{% note info %}
**毫秒是最短等待時間**
1000 毫秒是 1 秒。這個數字是保證至少等多久，不是準時，因為時間到了還要等目前的程式跑完才輪到。分頁切到背景時，瀏覽器也會把計時器放慢，Chrome 對背景分頁大約每秒才檢查一次。
{% endnote %}

### setTimeout 與 clearTimeout

setTimeout 登記一次工作：等待指定的毫秒後，呼叫函式一次，之後就結束。這一節分三步：先看它怎麼運作、再看它何時真正執行、最後看如何取消。

#### 延遲執行一次

第一個引數是到時要呼叫的函式，第二個是等待的毫秒。登記之後程式繼續往下跑，不會停在這一行。

```html 04-js/pages/103-js-timeout.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>setTimeout</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log('開始');

      setTimeout(() => {
        console.log('一秒後');
      }, 1000);

      console.log('結束');
    </script>
  </body>
</html>
```

```text
開始
結束
一秒後
```

**解析**

- 頁面只有說明文字，結果在 Console。
- 「開始」與「結束」幾乎同時印出，因為 setTimeout 只負責登記，不會讓程式停下來等一秒。
- 大約一秒後，才印出計時器裡的「一秒後」。
- 計時器只執行一次，印完之後不會再有新的輸出。

{% note warning %}
**交出函式，不要直接呼叫**
第一個引數要是函式本身，例如箭頭函式。若寫成 `setTimeout(show(), 1000)`，`show()` 會立刻執行，交給計時器的只是它的回傳值，到時什麼都不會發生。
{% endnote %}

#### 計時器何時執行

時間到了，計時器的函式也不會立刻插隊。瀏覽器會等目前這一段程式全部跑完，才輪到它。即使延遲寫 0 毫秒也一樣。

```html 04-js/pages/103b-js-timeout-order.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>計時器何時執行</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      console.log('第一行');

      setTimeout(() => {
        console.log('計時器，延遲 0 毫秒');
      }, 0);

      console.log('第二行');
    </script>
  </body>
</html>
```

```text
第一行
第二行
計時器，延遲 0 毫秒
```

**解析**

- 計時器寫在中間，卻最後才印出，因為它要等這個 script 全部執行完才有機會跑。
- 這是計時器最重要的規則：登記的函式一律在目前的程式結束之後才執行，後面的 setInterval、事件與非同步請求也都遵守同一個規則。
- 這個規則背後的機制，在 {% post_link lokiTech-15day-08-js-async %} 的「選讀：事件迴圈」有完整說明。

#### 取消計時器

登記時拿到的識別碼要存進變數。在時間到之前呼叫 `clearTimeout`，這個計時器就不會執行。

```html 04-js/pages/103c-js-clear-timeout.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>clearTimeout</title>
  </head>
  <body>
    <p>結果在 DevTools 的 Console。</p>
    <script>
      const pending = setTimeout(() => {
        console.log('這句不會出現');
      }, 500);
      console.log('識別碼', pending);

      clearTimeout(pending);
      console.log('已取消');
    </script>
  </body>
</html>
```

識別碼的數字可能不同：

```text
識別碼 1
已取消
```

**解析**

- 識別碼在瀏覽器裡是一個正整數；每個計時器各有一個。
- 計時器登記後馬上被 `clearTimeout` 取消，所以過了 500 毫秒，Console 也不會出現「這句不會出現」。
- 時間到了之後才取消，不會出錯，只是函式早已執行完，取消沒有效果。
- 識別碼只能取消它所屬的那一個計時器；沒有存下識別碼的計時器，就沒有辦法取消。

### setInterval 與 clearInterval

setInterval 和 setTimeout 的差別只有一點：它不會自己結束，而是每隔指定的毫秒就呼叫一次，直到你用 clearInterval 停止，或是頁面被關掉。第一次呼叫也要等一個間隔之後，不是登記時立刻執行。

停止的時機要由函式自己判斷：把回傳的識別碼存起來，數到目標就呼叫 `clearInterval`。沒有清除的間隔會一直執行，直到分頁關閉。取消時用配對的 clear 函式，程式比較好讀。

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

```text
1
2
3
已停止
```

**解析**

- `count` 用 let 宣告，因為每次呼叫都要加 1。
- 大約每 400 毫秒印出一個數字：1、2、3，第一個數字在 400 毫秒之後才出現。
- 數到 3 時，用同一個識別碼呼叫 `clearInterval`，之後不會再有輸出。
- 如果拿掉 `clearInterval`，數字會一直印下去，直到你關掉頁面。

### 選讀：requestAnimationFrame

`requestAnimationFrame` 把函式排到「下一次畫面更新之前」執行，回傳識別碼，`cancelAnimationFrame` 用它取消。它專門給動畫使用：畫面常見每秒更新 60 次（高更新率螢幕更多），函式的執行時機剛好對齊畫面，比用 setTimeout 估算更順暢；分頁在背景時它也會暫停，不浪費運算。要連續播放，就必須在函式裡再登記下一次；這一節只預約一次。

```html 04-js/pages/105-js-frame.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>requestAnimationFrame</title>
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

識別碼的數字可能不同：

```text
已預約 1
下一幀
```

**解析**

- 「已預約」先印出，因為這一行是目前程式的一部分；「下一幀」要等目前程式結束、畫面準備更新時才出現，規則和計時器相同。
- 識別碼可以交給 `cancelAnimationFrame` 取消這一次預約。
- 只是讓畫面動起來時，優先用 CSS 的 transition 或 animation；需要用程式逐幀計算位置時，才用 `requestAnimationFrame`。

# DOM

DOM（文件物件模型）是瀏覽器讀完 HTML 之後，在記憶體裡建好的一棵節點樹，JavaScript 透過這棵樹讀取與改寫畫面。這一章先把節點選出來，再改內容、屬性與 class，最後建立、搬移與移除節點；綁定事件留到後面的章節。本章的程式都放在頁面最後，載入時跑一次，所以畫面一打開就是改寫後的結果。

## 選取元素

要改畫面上的任何東西，第一步都是先拿到它。這一節從最常用的 CSS 選擇器開始，再學怎麼在一塊範圍裡找、沿著樹往上往下往旁邊走，選讀則介紹舊程式裡常見的另一組寫法。

**一覽**

- `querySelector`：用 CSS 選擇器找，回傳第一個符合的元素；沒有符合時回傳 null。
- `querySelectorAll`：回傳所有符合的元素，裝在一份 NodeList 裡；沒有符合時是長度 0 的清單，不是 null。
- 節點關係：已經拿到一個元素，再用 `parentElement`、`children`、`nextElementSibling` 這類屬性走到它的上下左右。
- 選讀的 `getElementById` 與 `getElementsBy…` 系列：依 id、class、標籤名找，舊程式很常見。

### querySelector

`querySelector` 在呼叫它的節點底下，由上到下找出第一個符合選擇器的元素。寫成 `document.querySelector` 時，範圍就是整份文件。這一節先看找得到與找不到兩種結果，以及找不到時怎麼避免出錯。

**觀念**

- 選擇器寫法和 CSS 相同：id 用井字號，class 用句點，標籤直接寫名稱。符合的元素不只一個時，只回傳最前面那一個。
- 找不到時回傳 null，意思是「沒有這個元素」。對 null 讀屬性或改文字會丟出錯誤，所以要先確認。
- 找不到最常見的原因有兩個：選擇器打錯，或程式比元素更早執行。本課 script 都放在 body 最後，元素已經存在。

保護的方法有兩種。只讀取時，用第 06 篇學過的 `?.`，沒有元素就得到 undefined；要改寫時，用 if 先判斷，因為 `?.` 不能放在指派的左邊。

demo 裡的 `textContent` 是元素裡的文字內容，指派新字串畫面就會改變，下一節再詳細說明。

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

      const note = document.querySelector('.note');
      note.textContent = '這是補充';

      const missing = document.querySelector('#missing');
      console.log(missing);
      console.log(missing?.textContent);
      if (missing) {
        missing.textContent = '有找到';
      }
    </script>
  </body>
</html>
```

Console（本章的輸出區塊只列出文字，和 Console 實際畫面的行號、顏色略有不同）：

```text
null
undefined
```

**解析**

- 畫面上標題變成「已選到標題」，段落變成「這是補充」，前者用 id 選擇器、後者用 class 選擇器選到。
- `#missing` 在文件裡不存在，所以第一行 Console 是 null。
- 第二行用 `?.` 讀取，null 擋住了後面的 textContent，結果是 undefined，沒有出錯。
- if 的條件是 null，不成立，所以不會去改一個不存在的元素。

{% note info %}
**選擇器本身寫錯**
選擇器文字不合法（例如只寫一個 `#` 沒有名稱）時，會直接丟出錯誤，而不是回傳 null。null 只代表「語法正確，但文件裡沒有符合的元素」。
{% endnote %}

### querySelectorAll

一次要改同一組元素時，改用 `querySelectorAll`。它回傳一份清單，可以逐項走訪；就算一個都沒找到，也不會是 null。

**觀念**

回傳的是 NodeList，一種節點清單：有 length 與順序，但不是真正的陣列，所以沒有 map。它有 forEach，要用 map 或 filter 時，先用展開語法轉成陣列。

另一個特性是「靜態」：清單只記得查詢當下找到的元素，之後文件再多出符合的元素，這份清單不會自動增加。選讀的最後一節會用 demo 驗證這件事。

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
      console.log(items.length);

      const names = [...items].map((item) => item.textContent);
      console.log(names);

      items.forEach((item, index) => {
        item.textContent = `${index + 1}. ${item.textContent}`;
      });

      const none = document.querySelectorAll('.missing');
      console.log(none.length);
    </script>
  </body>
</html>
```

Console：

```text
3
['蘋果', '香蕉', '橘子']
0
```

**解析**

- 選擇器對上三個 li，所以 length 是 3。
- 展開後得到真正的陣列，才能用 map 把每項文字收集起來。
- 畫面上三列依序變成「1. 蘋果」「2. 香蕉」「3. 橘子」；forEach 的 index 從 0 開始，所以顯示時加 1。
- 沒有符合的選擇器得到長度 0 的清單，forEach 對它只是不執行，不會丟出錯誤。

### 在容器裡找

這兩個方法不只掛在 document 上，每個元素也有。先選到某一塊容器，再從它呼叫，搜尋範圍就縮到那一塊的後代裡，散落在不同區塊的同名 class 不會互相抓到。這一節用新聞區與商品區，比對範圍縮小前後的差別。

**觀念**

- 搜尋範圍是呼叫它的節點的後代，容器本身不算在內，所以容器自己要改從父層或 document 選。
- 回傳規則不變：`querySelector` 找不到是 null，`querySelectorAll` 沒有符合是空清單。

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

- 頁面上沒有任何變化，因為程式只讀取、沒有改寫。
- 整份文件有三個 class 為 item 的段落，所以第一行是 3。
- 從商品區往下找，只剩商品一，所以第二行是 1。
- 商品區自己的 id 不在它的後代裡，所以第三行是 null。
- 從新聞區找到的第一個 item 是新聞一，不會誤抓到商品區那一段。

### 節點關係

選到一個元素之後，可以沿著樹往上、往下或往旁邊走，不必每次都回到 document 重選。這一節以 section#card 為中心，分往上、往下、同層與判斷四個方向。

**一覽**

- 往上
    - `parentElement`：直接父元素，沒有時回傳 null。
    - `closest`：從自己開始往上找最近的符合者，包含自己，找不到回傳 null。
- 往下
    - `children`：直接子元素的集合，只算元素。
    - `firstElementChild` 與 `lastElementChild`：第一個與最後一個子元素，沒有時回傳 null。
    - 後代搜尋沿用上一節的 `querySelector` 與 `querySelectorAll`。
- 同層
    - `previousElementSibling`：前一個元素兄弟，沒有時回傳 null。
    - `nextElementSibling`：後一個元素兄弟，沒有時回傳 null。
- 判斷
    - `matches`：回答「我自己符不符合這個選擇器」，回傳 true 或 false，不去找別的元素。

下面是 demo 共用的結構：外層 article#story 包著 main#app，main 裡依序是 p#intro、section#card、p#outro，卡片裡有 h2#heading、p#text、button#action。

{% mermaid graph TD %}
story["article#story<br/>closest 找到的祖先"] --> app["main#app<br/>parentElement"]
app --> intro["p#intro<br/>previousElementSibling"]
app --> card["section#card<br/>被選到的元素"]
app --> outro["p#outro<br/>nextElementSibling"]
card --> heading["h2#heading<br/>firstElementChild"]
card --> text["p#text"]
card --> action["button#action<br/>lastElementChild"]
{% endmermaid %}

#### 往上

父元素是直接包住它的那一層；要找更外層、符合某個條件的祖先，就用 `closest`。這一節從卡片出發，把兩層祖先的 id 寫到畫面上。

**觀念**

- `parentElement` 只看緊鄰的上一層。
- `closest` 一路往上，碰到第一個符合選擇器的就回傳；自己符合時回傳自己，一路都沒有就是 null。

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
    <p id="result"></p>
    <script>
      const card = document.querySelector('#card');
      const result = document.querySelector('#result');
      result.textContent = `${card.parentElement.id} / ${card.closest('article')?.id}`;

      console.log(card.closest('section') === card);
      console.log(card.closest('aside'));
      console.log(card.closest('aside')?.id);
    </script>
  </body>
</html>
```

Console：

```text
true
null
undefined
```

**解析**

- 畫面最下方的結果列顯示「app / story」：卡片的直接父元素是 main，`closest` 往上找到 article。
- 卡片自己就是 section，所以第一行是 true，這是 `closest` 含自己的證據。
- 文件裡沒有 aside，所以第二行是 null。
- 回傳可能是 null 時，用 `?.` 接後面的屬性，得到 undefined 而不是出錯。

#### 往下

往下可以只看緊鄰的下一層，也可以用選擇器把範圍內所有後代找出來。這一節先數卡片的子層，再只在卡片裡找段落。

**觀念**

- `children` 只包含元素，是會隨文件改變的即時集合，細節留到選讀；它有 length，也能用索引取值。
- `childNodes` 則連標籤之間的換行與縮排都算進去，那些是文字節點。找元素時用 children 與帶 Element 的屬性比較直覺。

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
    <script>
      const card = document.querySelector('#card');
      console.log(card.children.length);
      console.log(card.firstElementChild.id);
      console.log(card.lastElementChild.id);
      console.log(card.querySelectorAll('p').length);
      console.log(card.childNodes.length);
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
7
```

**解析**

- 頁面上只有排好的文字與按鈕，程式沒有改動它。
- 卡片下一層有標題、段落、按鈕，所以 children 長度是 3；第一個與最後一個子元素的 id 是 heading 與 action。
- 前言在卡片外面，卡片裡的 p 只有內文那一個，所以第四行是 1。
- childNodes 是 7：三個元素加上它們前後的四段換行縮排。
- 沒有子元素時，`firstElementChild` 是 null，和前面的 `?.` 搭配使用。

{% note info %}
**元素與文字節點**
`childNodes`、`firstChild` 與 `nextSibling` 這組屬性會把換行空白也算成文字節點。要找元素時，用名稱帶 Element 的那一組。
{% endnote %}

#### 同層

同一層的鄰居，指的是和自己有同一個父元素的前後元素，不包含父元素，也不包含自己的子元素。這一節讀卡片前後的元素，再看邊界上沒有鄰居的情況。

**觀念**

`previousElementSibling` 與 `nextElementSibling` 只認元素，標籤之間的換行不會當成兄弟。排在最前面的元素沒有前一個兄弟，回傳 null，再往下讀 id 就會出錯，要用 `?.`。

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
    <script>
      const card = document.querySelector('#card');
      const intro = document.querySelector('#intro');
      console.log(card.previousElementSibling.id);
      console.log(card.nextElementSibling.id);
      console.log(intro.previousElementSibling);
      console.log(intro.previousElementSibling?.id);
    </script>
  </body>
</html>
```

Console：

```text
intro
outro
null
undefined
```

**解析**

- 頁面上沒有變化，只有 Console 有輸出。
- 卡片前面的鄰居是前言，後面是結語，id 分別是 intro 與 outro。
- 標題在卡片裡面，是子元素，不會被算成同層鄰居。
- 前言是 main 裡的第一個元素，前面沒有兄弟，所以第三行是 null，第四行用 `?.` 讀 id 得到 undefined。

#### 判斷

有時不需要再找一個元素，只想知道手上這一顆符不符合某個選擇器。`matches` 就是專門回答這件事。

**觀念**

`matches` 只檢查元素自己，不往上也不往下，結果是布林值，不符合時是 false，不是 null。後面做事件委派時，常用它判斷被點到的是哪一種元素。

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

- 頁面沒有變化，兩行結果都在 Console。
- 卡片是 section，所以第一行是 true。
- 卡片不是段落，所以第二行是 false；即使它的子元素裡有 p，也不影響結果。

### 選讀：getElementById 與 getElementsBy 系列

這是舊程式、舊文章與第三方範例裡仍常見的另一組找元素寫法，讀得懂才改得動。新的程式以前面的 `querySelector` 與 `querySelectorAll` 為主，這一節只建立對照。

**一覽**

- `getElementById`：依 id 找一個元素，回傳元素或 null，只能從 document 呼叫。
- `getElementsByClassName` 與 `getElementsByTagName`：依 class 或標籤名找一組元素，回傳 HTMLCollection，可以從任何元素呼叫。
- `getElementsByName`：依表單欄位的 name 屬性找，回傳的是即時的 NodeList。

#### getElementById

`getElementById` 用 id 找一個元素，參數就是 id 文字本身。這一節拿它和選擇器的結果比對，並看找不到時的回傳值。

**觀念**

- 參數不加井字號。
- 找到就回傳那個元素，找不到回傳 null，和 `querySelector` 配上同一個 id 選擇器的結果完全相同。

```html 04-js/pages/113-js-by-id.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>getElementById</title>
  </head>
  <body>
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

- 畫面上是一份兩項的清單，程式只讀取、沒有改動。
- 兩種寫法選到同一個 ul，所以第一行是 true；井字號只出現在選擇器那一邊。
- missing 不在文件裡，所以第二行是 null，要和 `querySelector` 一樣先確認再使用。

#### 即時集合

`getElementsByClassName` 與 `getElementsByTagName` 回傳的 HTMLCollection，和 `querySelectorAll` 的 NodeList 最大差別在於是否「即時」。這一節新增一個 li，看兩份結果誰會跟著變長。

**觀念**

- HTMLCollection 是即時集合：文件一改，它的內容馬上跟著變。它沒有 forEach，逐項走訪用 for...of，要 map 或 filter 先用 `Array.from` 轉成陣列。
- `querySelectorAll` 的 NodeList 是靜態的，停在查詢當下，而且有 forEach。
- 前面節點關係的 `children` 也是即時的 HTMLCollection。

demo 用到的 `createElement` 與 `append`，會在後面建立節點的章節詳細說明，這裡只把它們當成「讓文件多出一個元素」的動作。

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

- 畫面上的清單從兩項變成三項，最後一項是橘子。
- 新增之前，即時集合與靜態清單的長度都是 2。
- 新增之後，即時集合變成 3，靜態清單仍是 2，沒有自動收進橘子。
- for...of 走訪的是變長之後的即時集合，所以印出蘋果、香蕉、橘子。
- `getElementsByTagName` 同樣是即時集合；`getElementsByName` 則是即時的 NodeList。

## 操作元素

選到元素之後，下一步是改它。這一節先改元素裡的文字與標記，再分清標籤上的 attribute 與物件上的 property，接著學日常最常用的寫法：直接讀寫 property、用 `classList` 切換樣式。選讀則是讀瀏覽器排版後的樣式、尺寸與位置。事件要到下一章才綁，所以需要人去觸發的函式，先在 Console 輸入呼叫。

### 內容

元素裡的內容有兩種讀法：讀者看到的純文字，以及瀏覽器要解析的標記（HTML 標籤組成的字串）。選哪一種，決定了內容會不會被當成標籤處理，也決定了安全性。這一節先看純文字，再看標記，最後看連元素自己一起換掉的寫法。

**一覽**

- 純文字：`textContent` 讀寫子樹裡全部的文字，包含被 CSS 藏起來的；`innerText` 只讀畫面上看得到的文字。
- 元素裡面的標記：`innerHTML` 讀寫元素內部的 HTML 字串，寫入時會被解析成子元素。
- 連元素自己：`outerHTML` 讀寫的字串包含元素自己的標籤，寫入時整顆元素被換掉。

#### textContent 與 innerText

兩者都能讀寫元素裡的文字，差別在於讀的時候看不看 CSS。下面用一段被 `display: none` 藏起來的字，把兩種讀法分開。

**觀念**

- `textContent` 把子樹裡所有文字接起來，不管有沒有顯示。
- `innerText` 依畫面上看得到的結果讀，隱藏的字不算；讀的時候瀏覽器得先算出版面，文字很多時比 `textContent` 慢。
- 指派時，兩者都把原本的子元素換成一段純文字，內容裡的角括號不會被當成標籤。

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

```text
可見隱藏
可見
```

**解析**

- 頁面上只看得到「可見」，後面的 span 設了 `display: none`。
- Console 第一行是 `textContent` 的結果，連隱藏的字也接進來，所以是「可見隱藏」。
- 第二行是 `innerText` 的結果，只剩畫面上的「可見」。
- 本節的輸出區塊只列出文字內容，和 Console 實際畫面（行號、引號、顏色）略有不同。

#### innerHTML

`innerHTML` 讀寫的是元素內部的標記。寫入的字串會被解析成子元素，原本的子元素整批丟掉，再重新建立。

**觀念**

- 讀取時，得到內部子元素組成的 HTML 字串。
- 指派新字串，或用 `+=` 接上一段，都是清掉全部子元素再重建。已經存起來的子元素變數會指向舊的、已離開頁面的元素。
- `+=` 看起來只是接上一段，其實是先讀出整段標記，再整段寫回。

下面的 demo 先讀出標記，再用 `+=` 接上一段，最後檢查原本選到的元素。`isConnected` 是元素的布林 property，表示它現在還在不在頁面上。

```html 04-js/pages/116-js-inner.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>innerHTML</title>
  </head>
  <body>
    <div id="card"><b id="title">標題</b></div>
    <script>
      const card = document.querySelector('#card');
      const title = document.querySelector('#title');

      console.log(card.innerHTML);
      card.innerHTML += '<i>斜體</i>';
      console.log(card.innerHTML);

      console.log(title.isConnected);
      console.log(title === document.querySelector('#title'));
    </script>
  </body>
</html>
```

```text
<b id="title">標題</b>
<b id="title">標題</b><i>斜體</i>
false
false
```

**解析**

- 頁面上出現粗體的「標題」，後面接著斜體的「斜體」。
- 第一行是接上斜體之前的標記字串，第二行是接上之後的結果。
- 變數 `title` 是在接上之前選到的。重建後它的 `isConnected` 是 false，表示這顆舊元素已經離開頁面。
- 重新選到的 `#title` 和 `title` 比較也是 false，兩者長得一樣，卻是不同的兩顆元素。
- 所以這種寫法不適合在畫面上有輸入框、已選好元素的區塊使用，輸入框裡打的字也會跟著被重建而消失。

**不要把使用者的字串交給 innerHTML**

跨站腳本攻擊（XSS，cross-site scripting）是指：攻擊者讓你的頁面把他寫的程式當成自己的來執行。只要把使用者輸入、網址參數、API 回傳這類不是你寫死的字串交給 innerHTML，就可能發生。下面的 demo 把同一段含標籤的字串寫進兩處，一處當純文字，一處當標記；後者的圖片載入失敗時，會執行 `onerror` 裡的程式。

```html 04-js/pages/116b-js-xss.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>innerHTML 與 XSS</title>
  </head>
  <body>
    <p id="safe"></p>
    <div id="unsafe"></div>
    <script>
      const userInput = `<img src="x" onerror="console.log('被執行了')">`;

      document.querySelector('#safe').textContent = userInput;
      document.querySelector('#unsafe').innerHTML = userInput;
    </script>
  </body>
</html>
```

```text
被執行了
```

**解析**

- 第一段（`#safe`）把整串當成純文字，頁面上直接看到 `<img ...>` 這串字，沒有任何東西被執行。
- 第二段（`#unsafe`）把字串解析成真的圖片。圖片網址不存在，載入失敗就觸發 `onerror`，Console 出現「被執行了」，另外還會有一行圖片 404 的錯誤。
- 實際攻擊時，這裡的程式可能是偷走登入資訊、偽造畫面，而不只是印一行字。

{% note warning %}
**innerHTML 的使用原則**

- 使用者的字串一律用 `textContent`，它不解析標記，最安全。
- 只有程式自己寫死、不含外部資料的標記，才適合交給 `innerHTML`。
- 只擋 `<script>` 標籤並不夠：透過 `innerHTML` 插入的 `<script>` 雖然不會執行，但像上例的事件屬性照樣會執行。
- 真的需要顯示使用者提供的 HTML（例如文章編輯器的內容），要先經過消毒（sanitize，移除危險標籤與屬性），常見做法是使用 DOMPurify 這類套件。瀏覽器內建的 `setHTML` 是同類功能，但目前還不是各主流瀏覽器都支援，不建議當作唯一的防線。
- 後面的 React 預設就會把文字當純文字，需要插入 HTML 時才要特別寫 `dangerouslySetInnerHTML`，名字就是在提醒這件事。
{% endnote %}

#### outerHTML

`outerHTML` 的字串包含元素自己的開始與結束標籤。寫入時，瀏覽器解析新字串，用新元素把原本那顆換掉。

**觀念**

- 讀取時，得到從元素自己的開始標籤到結束標籤的完整字串。
- 指派新字串後，原本的元素離開頁面，但變數仍指向它，不會自動改指新元素。
- 寫入的字串同樣會被解析成標籤，使用者輸入的限制和 `innerHTML` 相同。

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

```text
<p id="note">舊公告</p>
false
false
新公告
```

**解析**

- 頁面上最後只有一行「新公告」，舊的 p 已經被換掉。
- 第一行包含 p 自己的標籤，這是換掉之前讀到的字串。
- 舊變數 `note` 的 `isConnected` 是 false，和重新選到的 `next` 比較也是 false。
- 對舊變數改文字，畫面不會變，所以最後一行仍是「新公告」。要改畫面，必須改重新選到的那顆。

{% note info %}
**要換掉整顆元素時**

指派 `outerHTML` 比較少用，因為變數會失效，舊元素上的事件監聽也不會留在新元素上。比較清楚的做法是先建立新元素再放進頁面，下一節「節點操作」會教。
{% endnote %}

### attribute 與 property

同一個元素有兩個地方存放設定：HTML 標籤上寫的字串叫 attribute，瀏覽器依標籤建立的 DOM 物件上的欄位叫 property。多數時候兩邊同步，但初始值與完整網址這類情況會分開，下面先用三個例子看出差別。

**觀念**

- attribute 是標籤上原本寫的字串，讀取時用方法 `getAttribute`；property 是物件上的欄位，代表元素目前的狀態。
- 輸入框的 `value`：property 是框裡現在的文字，attribute 停在標籤一開始寫的值。
- 連結的 `href`：property 讀出來是完整網址，attribute 仍是標籤上寫的相對路徑。
- 標籤上的 `class` 與 property 的 `className` 是同一段字串，只是欄位名稱不同，因為 class 是 JavaScript 的關鍵字。

```html 04-js/pages/118-js-prop.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>attribute 與 property</title>
  </head>
  <body>
    <input id="nameInput" type="text" value="原始" />
    <a id="link" class="nav" href="/tour">行程</a>
    <script>
      const nameInput = document.querySelector('#nameInput');
      const link = document.querySelector('#link');

      nameInput.value = '目前';
      console.log(nameInput.getAttribute('value'));
      console.log(nameInput.value);

      console.log(link.getAttribute('href'));
      console.log(link.href);

      console.log(link.getAttribute('class'));
      console.log(link.className);
    </script>
  </body>
</html>
```

```text
原始
目前
/tour
http://127.0.0.1:5500/tour
nav
nav
```

**解析**

- 頁面上是一個輸入框，裡面的字已經被改成「目前」，旁邊有一條「行程」連結。
- 前兩行：標籤上的 value 仍是「原始」，property 才是框裡現在的「目前」。
- 中間兩行：標籤上寫 `/tour`，property 被補成完整網址。主機與埠號依你開頁面的位址而定，這裡以 Live Server 為例。
- 最後兩行都是 nav，兩個欄位名稱不同，內容是同一段 class 字串。

日常直接讀寫 property 就好，標籤上的原始字串只在少數情況才需要，下一節說明。

### 屬性方法

想讀標籤上寫的原始字串，或操作沒有對應 property 的自訂屬性時，要改用方法。這一節學這四個讀寫標籤的方法，demo 以 `aria-label`（給讀屏軟體的標籤）為例。

**一覽**

- 讀：`getAttribute` 讀標籤上的字串，沒有該屬性時回傳 null；`hasAttribute` 只問在不在，回傳 true 或 false。
- 寫：`setAttribute` 把字串寫回標籤，沒有該屬性就先加上；`removeAttribute` 從標籤拿掉屬性。
- 另有 `toggleAttribute` 在有無之間切換，日常少用，這裡不展開。

**觀念**

- 這些方法讀寫的永遠是字串，寫入的值會被轉成字串。
- 有對應 property 的設定（如 `value`、`href`），日常直接改 property；方法留給原始字串與自訂屬性。

```html 04-js/pages/119-js-attr.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>屬性方法</title>
  </head>
  <body>
    <button type="button" id="fav" aria-label="收藏商品">收藏</button>
    <script>
      const fav = document.querySelector('#fav');

      console.log(fav.getAttribute('aria-label'));
      fav.setAttribute('aria-label', '已收藏');
      console.log(fav.getAttribute('aria-label'));
      console.log(fav.hasAttribute('aria-label'));

      fav.removeAttribute('aria-label');
      console.log(fav.hasAttribute('aria-label'));
      console.log(fav.getAttribute('aria-label'));

      fav.setAttribute('data-note', '熱門');
      console.log(fav.getAttribute('data-note'));
    </script>
  </body>
</html>
```

```text
收藏商品
已收藏
true
false
null
熱門
```

**解析**

- 頁面上只有一顆「收藏」按鈕，屬性的變化只出現在標籤裡，要用 DevTools 的 Elements 面板才看得到。
- 第一、二行是同一個 `aria-label` 改寫前後的字串。
- 第三行 true 表示屬性還在；移除之後 `hasAttribute` 變成 false，`getAttribute` 則回傳 null，兩種問法對應兩種結果。
- 最後一行：`data-note` 原本不存在，`setAttribute` 先加上再讀回「熱門」。

### 透過 property 讀寫

有對應欄位時，直接讀寫 property 是日常做法，寫法短、型別也比較好用。這一節依欄位型態分五種：一般字串、布林、自訂資料、class 與行內樣式。

**一覽**

- 一般欄位：`id`、`src`、`alt`、`href`、`value` 等，直接指派字串。
- 布林欄位：`hidden`、`disabled`、`checked` 設成 true 或 false 來開關。
- `dataset`：讀寫 `data-` 開頭的自訂資料，值都是字串。
- `classList`：管理元素現在有哪些 class，一次加減一個名字。
- `style`：讀寫行內樣式，樣式表裡的規則碰不到。

#### 一般 property

字串型的欄位用點直接指定新值。圖片、連結與輸入框是最常見的三種，下面一次改完，再把結果印出來。

**觀念**

- 寫入 `id`、`alt`、`href`、`src` 與 `value` 都是直接指派字串。
- 讀 `src` 與 `href` 會得到完整網址；要看標籤上寫的字串，才用 `getAttribute`。
- `value` 改的是輸入框現在的文字，不是標籤上的初始值。

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
    <input id="nameInput" type="text" value="原始" />
    <script>
      const photo = document.querySelector('#photo');
      const link = document.querySelector('#link');
      const nameInput = document.querySelector('#nameInput');

      photo.id = 'cover';
      photo.alt = '夏季特賣';
      photo.src = 'cover.png';
      console.log(photo.id);
      console.log(photo.alt);
      console.log(photo.getAttribute('src'));

      link.href = 'https://example.com/tour';
      console.log(link.href);

      nameInput.value = '目前';
      console.log(nameInput.value);
    </script>
  </body>
</html>
```

```text
cover
夏季特賣
cover.png
https://example.com/tour
目前
```

**解析**

- 頁面上，圖片檔案故意不存在，所以顯示的是替代文字「夏季特賣」；旁邊是「行程」連結與一個內容為「目前」的輸入框。
- 前兩行是改完的 `id` 與 `alt`。第三行是標籤上的 `cover.png`：改 `src` 時寫的是相對路徑，標籤上就是這段字。
- 第四行：`href` 設成完整網址，印出來就是這段。
- 最後一行是輸入框現在的文字。

#### 布林 property

布林型的欄位只有 true 與 false 兩種值。標籤上這類屬性只看有沒有寫出來，所以在 property 上要設 true 或 false，不要把 false 當成字串寫進標籤。

**觀念**

- `hidden` 為 true，元素不佔版面，等於沒有顯示。
- `disabled` 為 true，按鈕不能按、輸入框不能改。
- `checked` 為 true，核取方塊是勾選的。判斷有沒有勾要看它，不要看 `value`，核取方塊的 `value` 是送出時的值，不會因為勾不勾而改變。

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

```text
false
true
true
```

**解析**

- 標籤上的按鈕本來是 `disabled`，程式先把它設成 false，所以第一行是 false。
- 接著 `hidden` 設成 true，按鈕離開版面，所以頁面最後只剩下一個已勾選的核取方塊。
- 三行輸出對應三個布林欄位目前的值。

{% note warning %}
**布林屬性不要用字串**

標籤上的布林屬性，只要寫出來就是 true，內容是什麼都不重要。若用 `setAttribute('disabled', 'false')`，屬性仍然存在，按鈕還是不能按。要打開按鈕，把 `disabled` 設成 false。
{% endnote %}

#### dataset

`data-` 開頭的自訂屬性是 HTML 提供給你放自訂資料的地方，例如項目編號、狀態。`dataset` 讓你不用手動拼出前綴，直接用名字讀寫。

**觀念**

- 屬性名稱的連字號會被改成小駝峰：`data-user-id` 對應 `dataset.userId`。
- 沒有該欄位時，讀到 undefined。
- 讀出來一律是字串，需要數字時要自己轉，例如 `Number('7')`。
- 指派 `dataset.level` 會在標籤上加上 `data-level`。

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

```text
7
7
2
2
```

**解析**

- 頁面上只有一行「商品」，資料都放在標籤裡，要用 DevTools 的 Elements 面板才看得到。
- 前兩行都是 7：用 `dataset.userId` 與完整屬性名 `data-user-id` 讀到同一個字串。
- 寫入 `level` 之後，標籤多了 `data-level="2"`，後兩行都是 2。
- 7 與 2 都是字串，若要拿來運算必須先轉成數字。

#### classList

class 是控制外觀最常用的開關：樣式寫在樣式表，程式只負責決定元素現在帶哪些 class。`className` 是一整段字串，改它等於整段換掉，容易把別的 class 一起洗掉；`classList` 則是一個物件，一次只加減一個名字，所以改 class 時優先用它。

**一覽**

- 加減：`add` 與 `remove` 可一次傳入多個名字。
- 切換：`toggle` 在有無之間切換並回傳切換後有沒有；第二個引數是布林時，強制加上或拿掉。
- 查詢：`contains` 回傳現在有沒有這個名字。
- 替換：`replace` 把舊名換成新名，舊名不存在時什麼都不做。

下面的 demo 先加上兩個 class，切換同一個名字兩次，再換成另一個。

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
      box.classList.toggle('big');
      box.classList.toggle('big');
      console.log(box.classList.contains('big'));

      box.classList.replace('big', 'hit');
      console.log(box.classList.contains('big'));
      console.log(box.className);
    </script>
  </body>
</html>
```

```text
true
false
on hit
```

**解析**

- 頁面上最後是一個淺綠色背景、字沒有放大的盒子，過程中的變化會一閃而過。
- `add` 一次加上 `on` 與 `big`；`toggle('big')` 第一次拿掉、第二次又加回，所以第一行是 true。
- `replace` 把 `big` 換成 `hit`，所以第二行是 false，字也回到原本大小。
- 樣式表裡 `hit` 寫在 `on` 後面，同樣權重時後面的規則勝出，背景是 `hit` 的綠色。
- 最後一行用 `className` 看整段字串，可見 class 現在是 on 與 hit。

#### style

`style` 讀寫的是元素的行內樣式，屬性名稱用小駝峰，例如 `backgroundColor`。行內樣式的優先權很高，樣式表很難蓋過它，所以狀態的開關不要寫在這裡，交給 `classList`；只有寬度、座標這類算出來才知道的數字，才適合用 `style`。

**觀念**

- 把值設成空字串，會清掉那一條行內樣式。
- CSS 變數（以兩條減號開頭）不是物件上的欄位，要用 `setProperty` 寫、`getPropertyValue` 讀。
- 它只管行內樣式，讀不到樣式表裡的規則（選讀一節用 `getComputedStyle` 讀最終結果）。

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

```text
rgb(204, 251, 241)
8px
```

**解析**

- 頁面上的盒子多了一塊淺青色背景，上方也空出 8px 的距離。
- 第一行讀回的是 `rgb(204, 251, 241)`，瀏覽器把當初寫的十六進位色碼轉成 rgb 形式。
- 第二行是 CSS 變數 `--gap` 的值 8px。上邊界 `marginTop` 引用了這個變數，所以盒子往下移了一點。

### 選讀：讀取畫面結果

前面讀寫的都是你設過的欄位。這一節讀的是瀏覽器排版完成後的結果：最終樣式、元素的實際尺寸與位置。這些值是算出來的，不能直接寫回去。

**一覽**

- 最終樣式：`getComputedStyle` 回傳套用所有規則後的樣式，唯讀。
- 尺寸與位置：`getBoundingClientRect` 回傳相對視窗的矩形；`offsetWidth` 與 `offsetHeight` 回傳含框線的整數寬高；`scrollIntoView` 把元素捲進視窗。

#### getComputedStyle

`style` 只讀行內樣式，樣式表裡設的顏色它讀不到。`getComputedStyle` 是 window 的方法，可以直接寫名字呼叫，回傳元素最終生效的樣式，每個值都是字串，而且不能改。

**觀念**

- 回傳的是算完的值，例如寫成十六進位的顏色會變成 rgb 形式。
- 只拿來讀。要改外觀，仍是改 class 或行內樣式。

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

```text

rgb(15, 118, 110)
```

**解析**

- 頁面上是一行深青色的「盒子」，顏色來自樣式表。
- 第一行是空字串（上面的區塊裡是空行），因為顏色沒有寫在行內樣式。
- 第二行是樣式表上的 `#0f766e` 轉成的 rgb(15, 118, 110)。

#### 尺寸與位置

元素有多大、離視窗邊緣多遠，要排版完才知道。下面的 demo 載入時先印出一次，再留下兩個函式，讓你在 Console 輸入名字呼叫，觀察捲動前後的差別。

**觀念**

- `getBoundingClientRect` 回傳的矩形有 top、left、width、height，位置相對視窗，所以頁面捲動時 top 會跟著變。
- `offsetWidth` 與 `offsetHeight` 是含 padding 與框線的整數尺寸。
- `scrollIntoView` 把元素捲到可見處，傳入 `behavior: 'smooth'` 會平滑移動。

```html 04-js/pages/126-js-rect.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>尺寸與位置</title>
    <style>
      body { margin: 0; }
      .gap-top { height: 240px; }
      .gap-bottom { height: 900px; }
      #box { width: 120px; height: 40px; padding: 8px; border: 2px solid #0f766e; }
    </style>
  </head>
  <body>
    <div class="gap-top"></div>
    <div id="box">目標</div>
    <div class="gap-bottom"></div>
    <p id="end">頁面底部</p>
    <script>
      const box = document.querySelector('#box');

      const showBox = () => {
        const rect = box.getBoundingClientRect();
        console.log(rect.top);
        console.log(rect.height);
        console.log(box.offsetHeight);
      };

      const goEnd = () => {
        document.querySelector('#end').scrollIntoView({ behavior: 'smooth' });
      };

      showBox();
      console.log('在 Console 輸入 goEnd() 捲到底部，再輸入 showBox() 看 top 的變化');
    </script>
  </body>
</html>
```

```text
240
60
60
在 Console 輸入 goEnd() 捲到底部，再輸入 showBox() 看 top 的變化
```

**解析**

- 頁面上方有一段空白，接著是帶框線的「目標」方塊，再往下是一大段空白與底部的文字。
- 載入時頁面還沒捲動，印出三個數字：top 是 240，是方塊離視窗上緣的距離；height 與 offsetHeight 都是 60（內容 40 加上 padding 16 與框線 4）。
- 在 Console 輸入 `goEnd()`，頁面平滑捲到底部。
- 捲動之後再輸入 `showBox()`，top 會變小，方塊捲出視窗上緣時甚至是負數；height 不受捲動影響。
- `getBoundingClientRect` 的數字可能帶小數（例如縮放或變形時），`offsetHeight` 一定是整數。

## 節點操作

頁面載入時還沒有的內容，要用程式做出新節點，再放進樹裡。這一節先學建立與插入，再看搬移、複製與移除，最後用 template 一次做出很多列。

### 建立與插入

做新節點分兩步：先建立，再決定放在目標的哪個位置。放進去之前，新節點只存在記憶體裡，畫面上看不到。

**一覽**

- 建立
    - `createElement` 做出一顆還沒掛上文件的元素，引數是標籤名稱。
    - `createTextNode` 做出純文字節點，沒有標籤。
- 插入（以目標元素為基準，一次可放多個節點或字串，字串會變成純文字）
    - `before` 放在目標同層的前面。
    - `prepend` 放在目標內部的最前面。
    - `append` 放在目標內部的最後面。
    - `after` 放在目標同層的後面。

{% mermaid graph TD %}
beforeNode["before：目標前面"] --- targetNode["p#target"]
targetNode --> startNode["prepend：內部最前"]
targetNode --> endNode["append：內部最後"]
targetNode --- afterNode["after：目標後面"]
{% endmermaid %}

before 與 after 把節點放在目標的旁邊，成為兄弟；prepend 與 append 把節點放進目標裡面，成為子節點。

**觀念**

- 同一個節點只能在樹上的一個位置。把已經在頁面上的節點再插入別處，是把它搬走，文件裡仍只有一顆。
- 新元素的文字用 `textContent` 設定，內容一律當作純文字，不會被解析成標籤，用在使用者輸入的資料上也安全。
- 下面的 demo 為了讓位置在畫面上分開，改用元素與一個文字節點，而不是直接傳字串。

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
    </script>
  </body>
</html>
```

**解析**

- 頁面由上到下共三列：第一列「前面」，第二列「起點目標終點尾端文字」，第三列「後面」。
- 「前面」與「後面」是 p 元素，插在目標的兄弟位置，所以各自獨立成一列。
- 起點與終點是 span，放進目標裡面，原本的文字「目標」夾在中間；最後的文字節點接在終點之後。目標內部沒有空格，所以第二列的文字連在一起。

{% note info %}
**舊的與另一組插入寫法**

- 舊程式常見 `appendChild` 與 `insertBefore`：一次只收一顆節點，不收字串，會回傳那顆節點。
- 另有 insertAdjacent 開頭的三個方法（Element、Text、HTML），用四個位置字串指定地點，分別對應 before、prepend、append、after。
- 其中 insertAdjacentHTML 會把字串解析成標籤，內含使用者輸入時有被插入惡意標籤的風險，改用 textContent 或前面的方法。
{% endnote %}

### 移動、複製與移除

節點建好之後，常要調整位置、留下複本，或把不要的拿掉。這一節用清單項目看這幾個動作。

**一覽**

- `cloneNode` 複製節點，回傳還沒掛上文件的新節點。引數 true 連子節點一起複製（深複製），false 只複製元素本身。
- 搬移沒有專屬方法：把已在頁面上的節點交給 prepend、append 等方法，它就從舊位置移到新位置。
- `remove` 呼叫在節點上，把自己從樹上拿掉。
- `replaceChildren` 呼叫在父元素上，不帶引數時清空全部子節點；帶節點時，用它們取代原本的內容。

**觀念**

要留下原件就先複製再插入；直接插入原件則是搬移。複製時 id 也會一起複製，同一頁出現重複的 id 不符合 HTML 規定，選取時也只會拿到第一顆，所以複本通常要改掉或拿掉 id。

```html 04-js/pages/128-js-node-move.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>移動與複製</title>
  </head>
  <body>
    <ul id="list">
      <li id="first">第一</li>
      <li id="second">第二</li>
    </ul>
    <script>
      const list = document.querySelector('#list');
      const first = document.querySelector('#first');
      const second = document.querySelector('#second');

      const copy = first.cloneNode(true);
      copy.removeAttribute('id');
      list.append(copy);

      list.prepend(second);
    </script>
  </body>
</html>
```

**解析**

- 清單由上到下是「第二」「第一」「第一」，共三列。
- 最後一列是複本，原來的「第一」還在；複本先拿掉 id，避免頁面上出現兩個 first。
- 「第二」本來就在清單裡，prepend 把它搬到最前面，沒有變成兩顆。

接著看移除與清空。

```html 04-js/pages/128b-js-node-remove.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>移除與清空</title>
  </head>
  <body>
    <ul id="fruits">
      <li>蘋果</li>
      <li id="banana">香蕉</li>
      <li>橘子</li>
    </ul>
    <ul id="drinks">
      <li>紅茶</li>
      <li>綠茶</li>
    </ul>
    <script>
      const banana = document.querySelector('#banana');
      banana.remove();

      const drinks = document.querySelector('#drinks');
      const item = document.createElement('li');
      item.textContent = '只剩這項';
      drinks.replaceChildren(item);
    </script>
  </body>
</html>
```

**解析**

- 第一份清單剩下「蘋果」與「橘子」，香蕉被 remove 從樹上拿掉。
- 第二份清單原有的兩項都不見，只剩新做的「只剩這項」，因為 replaceChildren 先清空再放入。
- 被 remove 的節點只是離開了頁面，變數 banana 仍抓得到它，可以再插回去。

### 選讀：template 元素

同一種列要做很多次時，可以把骨架寫在 template 裡。template 的內容不會顯示在頁面上，程式複製它之後填入資料，再放進清單。這個寫法就是用程式重複產生畫面，React 的元件之後會把這件事做得更簡單。

**觀念**

- template 的 content 是一份文件片段（放子節點的暫時容器），不屬於頁面。
- 每次要一列，就對 content 做一次 cloneNode(true)，在片段裡找到元素、填入文字，最後 append 到清單。
- 片段被插入時，只有它裡面的子節點進入清單，片段本身不會多包一層。

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
      const names = ['筆', '紙', '尺'];

      for (const name of names) {
        const fragment = row.content.cloneNode(true);
        fragment.querySelector('.name').textContent = name;
        list.append(fragment);
      }
    </script>
  </body>
</html>
```

**解析**

- 頁面上出現三列：筆、紙、尺。template 本身不顯示。
- 迴圈每一圈都從 content 複製出一份新的片段，所以各列互不影響，template 裡的骨架也沒有被改到。
- append 之後，進入清單的是片段裡的 li，不是片段本身。

# DOM 事件

到這裡為止，程式都在載入時改一次畫面。事件讓函式改在使用者動作時才跑。這一章先學綁定與解除，再讀事件物件，然後處理輸入、鍵盤、委派與表單送出。捕獲與冒泡的完整階段放在選讀。

## 綁定與解除

事件是瀏覽器通知「這裡發生了某件事」，例如點擊、輸入、按鍵。監聽（listener）是預先交給某個元素的函式：該元素發生指定事件時，瀏覽器就呼叫它。這一節學怎麼登記監聽，以及怎麼拿掉。

**一覽**

- `addEventListener` 登記一份監聽，引數是事件名稱、函式與選項；同一個事件可以疊很多份，依登記順序執行。
- `removeEventListener` 拿掉一份監聽，事件名稱與函式要和登記時相同；匿名函式每寫一次都是新函式，對不上就拿不掉。
- 選項是第三個引數的物件：`once` 讓監聽跑一次後自動移除，`passive` 與 `capture` 留到後面的章節。

### addEventListener

最常見的事件是點擊。登記監聽時，函式是「交給瀏覽器、以後再呼叫」，所以只寫函式本身，不加括號呼叫。

**觀念**

- 事件名稱是字串，不加 on，例如點擊就是 click。
- 同一個元素、同一個事件可以登記多份監聽，彼此不會蓋掉對方。
- 函式內部想改畫面，就用前面學過的方式選取元素後修改。

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
    <p id="output">尚未點</p>
    <script>
      const output = document.querySelector('#output');
      const go = document.querySelector('#go');
      let count = 0;

      go.addEventListener('click', () => {
        count += 1;
        output.textContent = `已點 ${count} 次`;
      });

      go.addEventListener('click', () => {
        console.log('第二份監聽也跑了');
      });
    </script>
  </body>
</html>
```

**解析**

- 載入時畫面顯示「尚未點」，監聽只是登記好，函式還沒執行。
- 每點一下按鈕，段落文字更新成「已點 1 次」「已點 2 次」，依此類推。
- 每點一下，Console 也印出一行「第二份監聽也跑了」；兩份監聽都跑，順序就是登記順序。

接著看選項 `once`。它適合只該發生一次的事，例如第一次載入的歡迎訊息。

```html 04-js/pages/130b-js-once.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>once 選項</title>
  </head>
  <body>
    <button type="button" id="go">點我</button>
    <p id="welcome">尚未點</p>
    <p id="total">累計 0 次</p>
    <script>
      const welcome = document.querySelector('#welcome');
      const total = document.querySelector('#total');
      const go = document.querySelector('#go');
      let count = 0;

      go.addEventListener('click', () => {
        welcome.textContent = '第一次點擊的歡迎訊息';
      }, { once: true });

      go.addEventListener('click', () => {
        count += 1;
        total.textContent = `累計 ${count} 次`;
      });
    </script>
  </body>
</html>
```

**解析**

- 第一下點擊後，兩個段落都變了：「第一次點擊的歡迎訊息」與「累計 1 次」。
- 第二下之後，歡迎訊息不再更新，因為帶 once 的那份監聽跑完第一次就被移除；累計次數則每次點擊都增加。

### removeEventListener

瀏覽器靠函式的參考辨認要拿掉哪一份監聽，所以要先把函式存進變數，登記與解除都傳同一個變數。事件名稱也要相同，這裡都是 click。

**觀念**

- 解除只認得「同一個函式」。直接把匿名箭頭函式寫在括號裡，之後就沒有辦法再指到它。
- 拿掉的是那一份監聽，同一個元素上的其他監聽不受影響。

```html 04-js/pages/131-js-unlisten.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>removeEventListener</title>
  </head>
  <body>
    <p id="output">0</p>
    <button type="button" id="go">加一</button>
    <button type="button" id="stopButton">停止</button>
    <script>
      const output = document.querySelector('#output');
      const go = document.querySelector('#go');
      const stopButton = document.querySelector('#stopButton');

      const onClick = () => {
        output.textContent = Number(output.textContent) + 1;
      };

      go.addEventListener('click', onClick);

      stopButton.addEventListener('click', () => {
        go.removeEventListener('click', onClick);
      });
    </script>
  </body>
</html>
```

**解析**

- 按「加一」時，段落裡的數字每次加 1。
- 按「停止」之後，同一個 onClick 被拿掉，再按「加一」，數字不會再變。
- 「停止」按鈕自己的監聽是另一個函式，所以不受這次移除影響。

{% note info %}
**舊式寫法：on 屬性**

舊程式與舊教學常見在標籤上寫 `onclick="fromHtml()"`，或在程式裡指派 `button.onclick = 函式`。這兩種寫法一顆元素同一事件只能留一份，後寫的會蓋掉前面的；也不能帶 once 這類選項，標籤上的寫法還會被嚴格的內容安全政策（CSP）擋掉。它們仍然能運作，所以要看得懂，但新的程式都用 addEventListener。
{% endnote %}

## event 物件

監聽的函式會收到一個事件物件，裡面記錄這次動作的細節。這一節先總覽常用的屬性與方法，再依序看實際點到誰、指標座標、鍵盤資訊，以及取消瀏覽器的預設動作。

**一覽**

- 共通
    - `type` 是事件的名字，例如 click。
    - `target` 是實際發生事件的元素。
    - `currentTarget` 是登記這份監聽的元素，可能與 target 不同。
    - `timeStamp` 是從頁面載入到事件發生的毫秒數。
- 指標（滑鼠、觸控、手寫筆都適用）
    - `clientX`、`clientY` 從視窗左上角算起。
    - `pageX`、`pageY` 從整份文件左上角算起，捲動後比視窗座標大。
    - `offsetX`、`offsetY` 從 target 的內緣算起。
    - `pointerType` 說明來源，值是 mouse、touch 或 pen。
    - `button` 是按下的鍵，0 是左鍵。
- 鍵盤
    - `key` 是這次按鍵產生的字。
    - `code` 是按下的實體位置，例如 KeyS。
    - `repeat` 在按住不放、連續觸發時是 true。
    - `ctrlKey`、`metaKey`、`shiftKey`、`altKey` 各自表示修飾鍵是否按住，值是布林。
- 方法
    - `preventDefault` 取消瀏覽器這次的預設動作，事件仍會繼續傳播。
    - `stopPropagation` 從這一層打斷後續傳播，傳播的規則放在後面的事件委派一節。

{% mermaid graph LR %}
pageNode["文件左上角<br/>pageX pageY"] --> viewNode["視窗左上角<br/>clientX clientY"]
viewNode --> padNode["元素內緣<br/>offsetX offsetY"]
{% endmermaid %}

### target 與 currentTarget

監聽可以掛在父元素上，點擊卻發生在子元素，這時就要分清楚兩個角色。這一節點擊清單，把兩個屬性的值顯示出來。

**觀念**

登記監聽的元素只有一個，實際被點到的元素卻會隨位置不同。把一份監聽掛在清單上，就能處理所有列的點擊，再靠 target 判斷是哪一列。

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
      <li>蘋果 <b>熱門</b></li>
      <li>香蕉</li>
    </ul>
    <p id="output">點選清單裡的文字</p>
    <script>
      const menu = document.querySelector('#menu');
      const output = document.querySelector('#output');

      menu.addEventListener('click', (event) => {
        output.textContent = `target：${event.target.tagName}，currentTarget：${event.currentTarget.id}`;
      });
    </script>
  </body>
</html>
```

**解析**

- 頁面一開始顯示「點選清單裡的文字」。點擊後，段落會改成「target：…，currentTarget：menu」。
- currentTarget 永遠是 menu，因為監聽登記在 ul 上。
- 點到「香蕉」或「蘋果」這幾個字時，target 是那顆 li，顯示 LI。
- 點到「熱門」時，target 是裡面的 b，顯示 B，因為它才是最內層被點到的元素；currentTarget 仍是 menu。
- 要拿被點到那一列的資訊，用 target 而不是 currentTarget。

### 指標座標

同一次移動會帶出三組座標，差別只在從哪裡開始量。這一節先把三組數字顯示出來比較，再用其中一組把圓點放到點擊的位置。這裡用 pointer 系列事件，滑鼠、觸控與手寫筆都會觸發。

**觀念**

- 視窗座標不理會捲動，頁面往下捲，同一個內容位置的數字就不同。
- 文件座標包含捲走的部分，所以捲動之後會比視窗座標大。
- 方塊內座標與頁面位置無關，適合「在這個元素裡的哪一點」這種需求。

```html 04-js/pages/134-js-pointer.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>指標座標</title>
    <style>
      body { height: 1600px; }
      #pos { position: sticky; top: 0; margin: 0; padding: 8px; height: 4.5em; background: #fef3c7; white-space: pre-line; }
      #pad { height: 160px; margin: 40px; background: #ccfbf1; }
    </style>
  </head>
  <body>
    <p id="pos">在方塊上移動指標</p>
    <div id="pad"></div>
    <script>
      const pos = document.querySelector('#pos');
      const pad = document.querySelector('#pad');

      pad.addEventListener('pointermove', (event) => {
        pos.textContent = [
          `視窗座標 ${event.clientX}, ${event.clientY}`,
          `文件座標 ${event.pageX}, ${event.pageY}`,
          `方塊內座標 ${event.offsetX}, ${event.offsetY}`,
        ].join('\n');
      });
    </script>
  </body>
</html>
```

**解析**

- 頁面上方的黃色橫條固定在視窗頂端，內容分成視窗、文件、方塊內三行（橫條高度固定，方塊不會被擠動），數字跟著指標變動，也可能帶小數。
- 頁面沒有捲動時，視窗與文件座標相同。往下捲動一段後，視窗座標仍從視窗頂端算起，文件座標則多出捲走的高度。
- 方塊內座標從方塊左上角開始，指標剛進入左上角時接近 0, 0。
- 方塊離視窗左緣約 48px（外距加上 body 的預設外距），所以方塊內的 X 會比視窗的 X 小約 48。

下面的 demo 用方塊內座標放置圓點：點哪裡，圓點就出現在哪裡。

```html 04-js/pages/134b-js-pointer-dot.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>用方塊內座標放置圓點</title>
    <style>
      #pad { position: relative; height: 160px; margin: 40px; background: #ccfbf1; }
      #dot { position: absolute; left: 0; top: 0; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: #0f766e; pointer-events: none; }
    </style>
  </head>
  <body>
    <p>點一下方塊，圓點會移到點擊的位置</p>
    <div id="pad"><span id="dot"></span></div>
    <script>
      const pad = document.querySelector('#pad');
      const dot = document.querySelector('#dot');

      pad.addEventListener('click', (event) => {
        dot.style.left = `${event.offsetX}px`;
        dot.style.top = `${event.offsetY}px`;
      });
    </script>
  </body>
</html>
```

**解析**

- 點擊方塊後，圓點的中心會移到點擊處。
- 圓點用 left 與 top 定位，基準是方塊，所以數字要用方塊內座標；改用視窗座標，位置就會偏掉。
- 圓點設成 pointer-events: none，指標會穿過它，target 永遠是方塊；否則點到圓點本身時，offset 會改從圓點算起。

### 鍵盤資訊

keydown 除了按下的字，還帶有這顆鍵的實體位置、是否為重複觸發，以及修飾鍵的狀態。這一節把這些值顯示在頁面上。

**觀念**

key 與 code 回答不同的問題：key 問「產生了什麼字」，會隨 Shift、鍵盤配置與輸入法改變；code 問「按的是哪一顆鍵」，只看位置。判斷按了哪個鍵時用這兩個屬性，舊的 keyCode 已不建議使用。

```html 04-js/pages/135-js-keyinfo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>鍵盤資訊</title>
    <style>
      #info { white-space: pre-line; }
    </style>
  </head>
  <body>
    <p id="info">按任意鍵</p>
    <script>
      const info = document.querySelector('#info');

      document.addEventListener('keydown', (event) => {
        const mods = [
          event.ctrlKey ? 'Ctrl' : '',
          event.metaKey ? 'Meta' : '',
          event.shiftKey ? 'Shift' : '',
          event.altKey ? 'Alt' : '',
        ].filter(Boolean);

        info.textContent = [
          `key：${event.key}`,
          `code：${event.code}`,
          `repeat：${event.repeat}`,
          `修飾鍵：${mods.join('+') || '無'}`,
        ].join('\n');
      });
    </script>
  </body>
</html>
```

**解析**

- 頁面一開始顯示「按任意鍵」，按下鍵之後換成 key、code、repeat 與修飾鍵四行。
- 單按 a：key 是 a，code 是 KeyA，repeat 是 false，修飾鍵顯示「無」。
- 按住 Shift 再按 a：key 變成 A，code 仍是 KeyA，修飾鍵顯示 Shift。
- 按住 a 不放：第一次 repeat 是 false，之後連續觸發的都是 true。
- 輸入法正在組字時，key 可能是 Process（依系統與瀏覽器而異），code 仍是實體位置。
- Mac 的 ⌘ 對應 metaKey，Ctrl 對應 ctrlKey，兩者是不同的屬性。

### preventDefault

有些元素自帶動作：連結會前往網址，表單送出會重新載入頁面，瀏覽器還有存檔等快捷鍵。這一節看如何在監聽裡取消這些動作。

**觀念**

在監聽裡呼叫 preventDefault，瀏覽器就不會做這件事的預設動作。取消的只是這一次，監聽仍在，事件也會繼續傳播。

```html 04-js/pages/136-js-prevent.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>preventDefault 取消連結跳轉</title>
  </head>
  <body>
    <p><a id="jump" href="https://example.com">前往範例</a></p>
    <p id="output">還在這頁</p>
    <script>
      const output = document.querySelector('#output');

      document.querySelector('#jump').addEventListener('click', (event) => {
        event.preventDefault();
        output.textContent = '已攔下預設跳轉';
      });
    </script>
  </body>
</html>
```

**解析**

- 頁面一開始顯示「還在這頁」。點擊連結後，段落改成「已攔下預設跳轉」，瀏覽器沒有前往 example.com。
- 把 preventDefault 那一行拿掉，點擊就會離開這頁。

同樣的做法也能攔下鍵盤的預設動作。下面攔下瀏覽器的存檔快捷鍵，改成顯示一行文字。

```html 04-js/pages/136b-js-shortcut.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>preventDefault 攔下快捷鍵</title>
  </head>
  <body>
    <p>按 Ctrl + S（Mac 按 ⌘ + S）</p>
    <p id="output">尚未儲存</p>
    <script>
      const output = document.querySelector('#output');

      document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyS') {
          event.preventDefault();
          output.textContent = '已儲存';
        }
      });
    </script>
  </body>
</html>
```

**解析**

- 按 Ctrl + S（Mac 按 ⌘ + S）時，瀏覽器不會跳出存檔視窗，段落改成「已儲存」。
- 判斷用 code 而不是 key，是因為它不受大小寫與輸入法影響；代價是鍵盤配置不同時，這顆鍵上的字母可能不是 S。
- 單按 S 不會觸發，因為條件要求 Ctrl 或 ⌘ 同時按住。

## 常用事件

click 只能知道使用者按了哪裡，表單與鍵盤還需要更細的通知：文字框每多打一個字、選單換了選項、某顆鍵被按下。這一節先分清楚 input 與 change 兩個容易混淆的事件，再用鍵盤事件做三個小互動。

**一覽**

- 表單控制項的變化
  - `input`：內容每次改變就發生，文字框打一個字就觸發一次。
  - `change`：值「確定」才發生，文字框是離開焦點之後（或按 Enter），選單與核取方塊是選項換了的當下。
- 鍵盤
  - `keydown`：鍵按下時發生，按住不放會連續重複。
  - `keyup`：鍵放開時發生，每按一次只有一次。

### input 與 change

文字框打字時，程式想跟著每一個字更新畫面，用 input；選單換了選項才需要處理的事，用 change。兩者讀取目前內容的方式相同：控制項的 value 屬性，內容永遠是字串。

**觀念**

- 即時預覽（跟著輸入）聽 input，要等值確定才處理就聽 change。

- 選單的 value 取自被選中那個 option 的 value 屬性。

- 選單、核取方塊與單選鈕換了選項時，input 與 change 兩個事件都會發生；文字框才有「每打一字」與「離開才確定」的差別。

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
      const nameInput = document.querySelector('#name');
      const preview = document.querySelector('#preview');
      const colorSelect = document.querySelector('#color');
      const picked = document.querySelector('#picked');

      nameInput.addEventListener('input', () => {
        preview.textContent = nameInput.value;
      });

      colorSelect.addEventListener('change', () => {
        picked.textContent = colorSelect.value;
      });
    </script>
  </body>
</html>
```

**解析**

- 在文字框每打一個字，第一個段落立刻跟著變，不必離開文字框。
- 選單換成另一個選項的當下，第二個段落才出現「紅」或「藍」。載入時兩段都是空的，因為還沒有事件發生。
- 如果把文字框的 input 改成 change，段落要等到點到別處、文字框失去焦點才更新。

{% note info %}
**為什麼變數不叫 name**
name 與 status 本來就是 window 的屬性，在頁面最上層拿來當變數名稱，容易和瀏覽器內建的值混淆。這份講義的 demo 一律取別的名字，例如 `nameInput`。
{% endnote %}

### 鍵盤事件

鍵盤事件看的是「這一次按了哪一顆鍵」，不是文字框裡的整段內容。監聽放在 document 上，整個頁面都收得到；放在文字框上，則只有它取得焦點時才收得到。

#### 讀取按下的鍵

event.key 是這顆鍵產生的名字，例如 Enter、Escape、ArrowLeft，空白鍵是一個空白字元。常見用法是先判斷是哪顆鍵，再決定要不要處理。

**觀念**

- 只有 key 是 Enter 時才讀文字框的 value，其他鍵什麼都不做。

- keydown 在文字還沒進到文字框之前就發生。想讀「按完之後的整段內容」，改聽 input。

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
    <p id="output"></p>
    <script>
      const nameInput = document.querySelector('#name');
      const output = document.querySelector('#output');

      nameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          output.textContent = nameInput.value;
        }
      });
    </script>
  </body>
</html>
```

**解析**

- 在文字框打字時段落不變，直到按下 Enter，段落才出現當下整段文字。
- 同一個 keydown 對每顆鍵都會跑一次，是 if 擋掉了 Enter 以外的鍵。

{% note warning %}
**輸入中文時的 Enter**
用注音等輸入法選字時，按 Enter 是「確認選字」，也會觸發 keydown，而且在 Chrome 上 key 常常仍是 Enter，文字框卻只是選好字，還沒打完。要避開這種情況，判斷時再加上 `!event.isComposing`，只處理不在組字中的按鍵。Safari 的順序不同，確認選字的那次 keydown 其 isComposing 已是 false，需要在 Safari 支援時另外測試。
{% endnote %}

#### 方向鍵移動方塊

方向鍵可以改變一個方塊的位置：按一下，方塊就移動一格。這個 demo 只做移動，不處理邊界，所以方塊可以離開底色區塊。

**觀念**

- 監聽放在 document，方塊不需要先被點選。

- 四個方向各自加減座標，再寫回 style。方向鍵的預設動作是捲動頁面，所以先呼叫 preventDefault 擋掉。

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
    <p id="output">0, 0</p>
    <script>
      const box = document.querySelector('#box');
      const output = document.querySelector('#output');
      let x = 0;
      let y = 0;

      document.addEventListener('keydown', (event) => {
        if (!event.key.startsWith('Arrow')) return;
        event.preventDefault();
        if (event.key === 'ArrowRight') x += 16;
        if (event.key === 'ArrowLeft') x -= 16;
        if (event.key === 'ArrowDown') y += 16;
        if (event.key === 'ArrowUp') y -= 16;
        box.style.left = `${x}px`;
        box.style.top = `${y}px`;
        output.textContent = `${x}, ${y}`;
        console.log(output.textContent);
      });
    </script>
  </body>
</html>
```

Console（簡化後只列文字）：

```text
16, 0
```

**解析**

- 按一次右鍵，方塊往右移 16px，畫面上的座標與 Console 都是 16, 0。
- 按左鍵或上鍵會把座標減下去，這個版本允許出現負數，方塊會跑出底色區塊。
- 其他鍵在第一行就結束，不會動到座標，也不會擋掉它們的預設動作。

#### 打字小遊戲

頁面隨機出現一個英文字母，按對就加一分並換下一個。判斷對錯就是把 event.key 和畫面上的字母比較。

{% note info %}
這個 demo 用 `Math.random` 抽字母，它屬於選讀的內建物件，用法見 {% post_link lokiTech-15day-06-js-basics %} 的「選讀：內建物件」。這裡只要知道它會回傳 0 到 1 之間的亂數，乘上字母數再無條件捨去，就得到可用的位置。
{% endnote %}

**觀念**

- 只處理長度為 1 的 key，Enter、方向鍵這類名字較長的鍵就不會被當成答案。

- key 轉成大寫再比對，所以大小寫都算對。

```html 04-js/pages/140-js-type.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>打字小遊戲</title>
  </head>
  <body>
    <p id="letter"></p>
    <p id="score">0</p>
    <script>
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
          score.textContent = points;
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

- 載入時先呼叫一次 nextLetter，畫面出現一個隨機字母，分數是 0。字母每次重新整理都不一樣。
- 按對時分數加一，Console 印出新的分數，字母立刻換下一個。上面的 1 是第一次按對的結果。
- 按錯時什麼都不發生，分數也不會減少。

#### 空白鍵蓄力

按住空白鍵開始蓄力，放開時用兩次的時間差當作力道。這裡是 keydown 與 keyup 成對使用的例子：一個記下起點，一個算出結果。

{% note info %}
這個 demo 用 `Math.round` 把毫秒數四捨五入成整數，屬於選讀的內建物件，見 {% post_link lokiTech-15day-06-js-basics %} 的「選讀：內建物件」。
{% endnote %}

**觀念**

- event.timeStamp 是事件發生的時間，單位毫秒。keydown 記下起點，keyup 用新的時間減去起點，就是按住了多久。

- 按住不放時 keydown 會一直重複觸發，這時 event.repeat 是 true。只在第一次記錄起點，起點才不會被後面的重複事件覆蓋。

```html 04-js/pages/141-js-charge.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>空白鍵蓄力</title>
  </head>
  <body>
    <p id="power">按住空白鍵再放開</p>
    <script>
      const power = document.querySelector('#power');
      let start = 0;

      document.addEventListener('keydown', (event) => {
        if (event.key !== ' ') return;
        event.preventDefault();
        if (event.repeat) return;
        start = event.timeStamp;
        power.textContent = '蓄力中';
        console.log('蓄力中');
      });

      document.addEventListener('keyup', (event) => {
        if (event.key !== ' ' || !start) return;
        const force = Math.round(event.timeStamp - start);
        start = 0;
        power.textContent = `力道 ${force}`;
        console.log(power.textContent);
      });
    </script>
  </body>
</html>
```

Console：

```text
蓄力中
力道 180
```

**解析**

- 按下空白鍵，畫面與 Console 都變成蓄力中；按住不放，畫面維持蓄力中，起點也不會重算。
- 放開時畫面變成力道加毫秒數，Console 印出同一行。180 只是按住約 0.18 秒的例子，實際數字取決於你按了多久。
- keyup 先檢查 start 不是 0，沒有先按過空白鍵就不會算出奇怪的數字；算完把 start 歸零，下一次才能重新開始。
- 空白鍵預設會捲動頁面，所以 keydown 裡用 preventDefault 擋掉。

## 事件委派

清單會動態新增、刪除與重繪，若每顆按鈕各綁一份監聽，新出現的按鈕就沒有監聽。事件委派的做法是把監聽放在不會被換掉的父層，由它統一處理底下所有按鈕。這能成立，是因為 click 會從被點到的元素一路往外層傳，稱為事件冒泡，所以父層也收得到。後面的待辦清單就用這個做法。

**觀念**

- 父層收到 click，先用 closest 從被點到的元素往外找按鈕。找不到就結束。

- 用 dataset 讀按鈕上的 data-id，就知道這顆按鈕代表哪一筆資料。

- 按鈕是之後才新增的，只要放進這份清單，同一份監聽就收得到。

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
      <li><button type="button" data-id="1"><span>項目 1</span></button></li>
      <li><button type="button" data-id="2"><span>項目 2</span></button></li>
    </ul>
    <button type="button" id="add">新增項目</button>
    <p id="output"></p>
    <script>
      const list = document.querySelector('#list');
      const add = document.querySelector('#add');
      const output = document.querySelector('#output');
      let count = 2;

      list.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        output.textContent = `按了項目 ${button.dataset.id}`;
        console.log(event.target.tagName, button.dataset.id);
      });

      add.addEventListener('click', () => {
        count += 1;
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.id = count;
        button.textContent = `項目 ${count}`;
        const item = document.createElement('li');
        item.append(button);
        list.append(item);
      });
    </script>
  </body>
</html>
```

Console（簡化後只列文字）：

```text
SPAN 1
```

**解析**

- 點「項目 1」的文字，Console 印出 SPAN 1，段落顯示按了項目 1。target 是文字外面的 span，不是按鈕，closest 才從它往外找到那顆按鈕。
- 點按鈕邊緣的空白處，target 就是 BUTTON 本身，closest 找到的是自己，結果相同。
- 點「新增項目」後清單多一顆項目 3，直接點它，段落顯示按了項目 3。清單上只有一份監聽，新按鈕不必另外綁。
- 點清單外的「新增項目」按鈕，click 不會進到清單的監聽，所以不會被當成項目。
- closest 會一路往外找到整份文件。若清單外層還包著別的同類元素，可能找到清單外的那一個；這種結構需要再用 list.contains 確認它在清單內。

## 選讀：捕獲與冒泡

前面的委派只用到冒泡。事件實際上有三個階段：先由外往內的捕獲，抵達目標，再由內往外的冒泡。預設的監聽在冒泡階段才被呼叫。

{% mermaid graph LR %}
docDown["document"] -- 捕獲 --> outerCap["#outer 捕獲監聽"]
outerCap -- 捕獲 --> innerTarget["#inner 目標"]
innerTarget -- 冒泡 --> outerBubble["#outer 冒泡監聽"]
outerBubble -- 冒泡 --> docUp["document"]
{% endmermaid %}

**一覽**

- 捕獲：事件由外往內走，加上選項 `{ capture: true }` 的監聽在這一段被呼叫。
- 冒泡：事件由內往外走，沒有寫選項的監聽走這一段。
- `stopPropagation`：從呼叫它的那一層起，不讓事件繼續往後傳；已經跑過的監聽不會被取消。

**觀念**

- 同一個元素可以在捕獲與冒泡各登記一份監聽，兩份分開計算。

- 在外層用 stopPropagation 擋事件，會連委派在更外層的監聽一起擋掉，所以平常不要輕易使用。

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
    <p id="output"></p>
    <script>
      const outer = document.querySelector('#outer');
      const inner = document.querySelector('#inner');
      const stopButton = document.querySelector('#stop');
      const output = document.querySelector('#output');

      outer.addEventListener('click', () => {
        output.textContent = '外捕獲';
        console.log('外捕獲');
      }, { capture: true });

      inner.addEventListener('click', () => {
        output.textContent = `${output.textContent} 內層`;
        console.log('內層');
      });

      outer.addEventListener('click', () => {
        output.textContent = `${output.textContent} 外冒泡`;
        console.log('外冒泡');
      });

      stopButton.addEventListener('click', (event) => {
        event.stopPropagation();
        output.textContent = `${output.textContent} 停止`;
        console.log('停止');
      });
    </script>
  </body>
</html>
```

Console（簡化後只列文字）：

```text
外捕獲
內層
外冒泡
```

**解析**

- 點「內層」時，Console 依序是外捕獲、內層、外冒泡，畫面上的段落也依同樣順序累積成「外捕獲 內層 外冒泡」。
- 外層的捕獲監聽最先跑並重設文字，所以每次點擊都從「外捕獲」開始。
- 點「停止冒泡」時，外捕獲仍會先發生，接著按鈕自己的監聽呼叫 stopPropagation，外冒泡就不會跑，畫面是「外捕獲 停止」。

## 表單處理

表單是使用者把資料交給網頁的主要方式，這一節整理程式怎麼和它互動：讀取控制項目前的值、在送出時一次取走整張表單，以及在送出前檢查資料對不對。這些寫法也是後面 React 處理表單的基礎，React 只是把「值」交給狀態保管。

### 讀取欄位的值

不同控制項用不同屬性表示「目前的答案」，讀取時要分清楚型別。

**一覽**

- `value`：文字框、選單、日期等控制項目前的內容，一律是字串，連 number 類型的框也一樣。
- `checked`：核取方塊與單選鈕有沒有被選取，型別是布林。

**觀念**

- 文字變化聽 input，勾選變化聽 change。

- 兩種事件共用同一支 render 函式負責組出畫面上的句子，載入時也呼叫一次，畫面才不會等使用者動作才出現內容。

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
      const titleInput = document.querySelector('#title');
      const doneInput = document.querySelector('#done');
      const result = document.querySelector('#result');

      const render = () => {
        const mark = doneInput.checked ? '已勾選' : '未勾選';
        result.textContent = `${titleInput.value} / ${mark}`;
      };

      titleInput.addEventListener('input', render);
      doneInput.addEventListener('change', render);
      render();
    </script>
  </body>
</html>
```

**解析**

- 載入時文字框已有「草稿」，核取方塊未勾選，所以畫面一開始就是「草稿 / 未勾選」。
- 打字觸發 input，勾選觸發 change，兩條路都呼叫同一支 render，畫面永遠跟控制項目前的狀態一致。
- 三元運算子只負責把布林換成要顯示的詞。

### 送出表單與 FormData

表單的預設動作是依 action 送出並重新載入整個頁面。用 JavaScript 處理資料時，要聽表單的 submit 事件，先用 preventDefault 取消預設，再自己讀資料。聽 submit 而不是按鈕的 click，因為使用者在文字框按 Enter 也會送出表單，submit 兩種情況都收得到。

**一覽**

- `submit`：使用者按下送出按鈕或在欄位按 Enter 時，發生在表單上。
- `FormData`：依控制項的 name 把整張表單打包起來，建立方式是 `new FormData(form)`。
- `get`：用 name 取出單一欄位的字串，找不到時是 null。
- `has`：用 name 問有沒有這個欄位，回傳布林。
- `getAll`：同一個 name 有多筆時（例如多個核取方塊），取出全部成陣列。
- `Object.fromEntries`：把整包 FormData 轉成一般物件，之後要傳給伺服器或存起來時使用。

**觀念**

- FormData 只收有 name、而且沒有停用（disabled）的控制項。沒有勾選的核取方塊不會出現，勾選的預設值是字串 on。

- Object.fromEntries 遇到同名的多筆，只留最後一筆；要保留全部請用 getAll。

- 控制項要放在 form 裡，submit 才知道有哪些欄位。

```html 04-js/pages/145-js-submit.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>送出與 FormData</title>
  </head>
  <body>
    <form id="editor">
      <p><label>標題 <input name="title" type="text" /></label></p>
      <p>
        <label>分類
          <select name="category">
            <option value="工作">工作</option>
            <option value="生活">生活</option>
          </select>
        </label>
      </p>
      <p><label><input name="done" type="checkbox" /> 完成</label></p>
      <button type="submit">送出</button>
    </form>
    <p id="result"></p>
    <script>
      const form = document.querySelector('#editor');
      const result = document.querySelector('#result');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        console.log(Object.fromEntries(data));
        const mark = data.has('done') ? '已完成' : '未完成';
        result.textContent = `${data.get('title')} / ${data.get('category')} / ${mark}`;
      });
    </script>
  </body>
</html>
```

Console（簡化後只列文字）：

```text
{title: '買牛奶', category: '工作', done: 'on'}
```

**解析**

- 在標題輸入「買牛奶」、勾選完成後送出，頁面不會重新載入，段落顯示「買牛奶 / 工作 / 已完成」。
- 上面的 Console 是勾選時的結果。沒有勾選時，物件裡就沒有 done 這個欄位，所以程式用 has 判斷有沒有這個 name。
- 三個控制項各有 name，讀取時 get 就是用這個 name 找欄位，不用再一個個 querySelector。

### 表單驗證

送出前檢查資料是否合理，有兩層做法：先在 HTML 屬性上宣告規則，由瀏覽器負責擋；規則不夠用時再用 JavaScript 補上自己的判斷與訊息。這一節依序看內建屬性、自訂訊息，以及把錯誤顯示在頁面上。

#### 內建驗證屬性

在控制項上寫屬性，瀏覽器就會在送出時自動檢查，不合格就擋下送出並在欄位旁顯示提示，submit 事件根本不會發生。

**一覽**

- `required`：欄位不能空白。
- `minlength` 與 `maxlength`：文字長度的下限與上限。
- `pattern`：值要符合的規則（正規表示式），整段內容都要符合；搭配 title 屬性寫出提示文字。
- `type="email"`：值要像 email。url、number 等類型也各有自己的檢查。

**觀念**

- 瀏覽器擋下的送出不會進到 submit 監聽，所以監聽裡的程式能放心假設資料已經通過檢查。

- 提示文字由瀏覽器依使用者的語言產生。

```html 04-js/pages/145b-js-validate.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>內建驗證屬性</title>
  </head>
  <body>
    <form id="signup">
      <p>
        <label>帳號
          <input name="account" required minlength="4" pattern="[A-Za-z0-9]+" title="只能用英文字母與數字" />
        </label>
      </p>
      <p><label>Email <input name="email" type="email" required /></label></p>
      <button type="submit">送出</button>
    </form>
    <p id="result">尚未送出</p>
    <script>
      const form = document.querySelector('#signup');
      const result = document.querySelector('#result');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        result.textContent = '通過檢查，進入 submit';
      });
    </script>
  </body>
</html>
```

**解析**

- 帳號留空就送出，瀏覽器在欄位旁顯示「請填寫這個欄位」之類的提示，段落仍是「尚未送出」，submit 沒有被觸發。
- 帳號只打 abc，會因為少於 4 個字被擋；打 ab-12 含有連字號，則因為不符合 pattern 被擋，提示會帶出 title 的文字。
- Email 打的內容不像 email 時也會被擋。三個欄位全部合格，段落才變成「通過檢查，進入 submit」。
- submit 裡只需要 preventDefault 與後續處理，不必自己再檢查一遍這些規則。

#### 自訂驗證訊息

內建屬性只能檢查單一欄位本身。像「兩次密碼要一樣」這種跨欄位的規則，要自己用程式判斷，再用 setCustomValidity 告訴瀏覽器這個欄位目前有沒有問題。

**觀念**

- 傳入非空字串，欄位就被標成不合格，這串文字就是提示。傳入空字串，才會解除。

- 條件改變時必須重新呼叫。忘了傳空字串，欄位會一直被視為不合格，連正確的輸入也送不出。

```html 04-js/pages/145c-js-custom-validity.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>自訂驗證訊息</title>
  </head>
  <body>
    <form id="signup">
      <p><label>密碼 <input id="password" type="password" required minlength="6" /></label></p>
      <p><label>再輸入一次 <input id="confirm" type="password" required /></label></p>
      <button type="submit">送出</button>
    </form>
    <p id="result">尚未送出</p>
    <script>
      const form = document.querySelector('#signup');
      const passwordInput = document.querySelector('#password');
      const confirmInput = document.querySelector('#confirm');
      const result = document.querySelector('#result');

      const checkMatch = () => {
        const same = confirmInput.value === passwordInput.value;
        confirmInput.setCustomValidity(same ? '' : '兩次輸入的密碼不一樣');
      };

      passwordInput.addEventListener('input', checkMatch);
      confirmInput.addEventListener('input', checkMatch);

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        result.textContent = '密碼設定完成';
      });
    </script>
  </body>
</html>
```

**解析**

- 密碼已填滿 6 個字以上、兩個欄位內容不同時按送出，確認欄位旁出現「兩次輸入的密碼不一樣」，段落仍是「尚未送出」。
- 把確認欄位改成與密碼相同，checkMatch 傳入空字串解除標記，再送出，段落變成「密碼設定完成」。
- 兩個欄位都要聽 input：改了密碼欄位，原本一致的確認欄位也可能變成不一致。
- required 與 minlength 仍照常運作，自訂訊息是在內建規則之外多加一條。

#### 把錯誤顯示在頁面上

瀏覽器的提示泡泡樣式固定，也不好配合設計。實務上常在表單加上 novalidate 關掉自動擋下，改由程式檢查，再把訊息放進頁面自己的位置。React 的表單也是這個做法。

**一覽**

- `novalidate`：加在 form 上，瀏覽器不再自動擋下送出，submit 一定會發生。
- `checkValidity`：回傳整張表單（或單一欄位）是否通過所有規則，布林。
- `validationMessage`：欄位目前的錯誤文字，通過時是空字串。
- `reportValidity`：和 checkValidity 一樣會檢查，但不通過時還會叫出瀏覽器的提示泡泡。

**觀念**

- 輸入時用 validationMessage 即時更新錯誤文字，送出時再用 checkValidity 擋下不合格的資料。

- 想更細地知道錯在哪，欄位的 validity 物件有 valueMissing、typeMismatch 等布林，各自對應一種規則。

```html 04-js/pages/145d-js-error-message.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>顯示錯誤訊息</title>
    <style>
      .error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <form id="login" novalidate>
      <p>
        <label>Email <input id="email" name="email" type="email" required /></label>
        <span id="emailError" class="error"></span>
      </p>
      <button type="submit">送出</button>
    </form>
    <p id="result">尚未送出</p>
    <script>
      const form = document.querySelector('#login');
      const emailInput = document.querySelector('#email');
      const emailError = document.querySelector('#emailError');
      const result = document.querySelector('#result');

      emailInput.addEventListener('input', () => {
        emailError.textContent = emailInput.validationMessage;
      });

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        emailError.textContent = emailInput.validationMessage;
        if (!form.checkValidity()) {
          result.textContent = '還沒通過檢查';
          return;
        }
        result.textContent = `已送出 ${emailInput.value}`;
      });
    </script>
  </body>
</html>
```

**解析**

- 沒有任何輸入就按送出，submit 仍然發生，紅色的錯誤文字出現在欄位旁，段落是「還沒通過檢查」，沒有瀏覽器的提示泡泡。
- 開始輸入時，每打一個字就更新錯誤文字：內容還不像 email，訊息就留著；輸入完整的 email，訊息變成空字串，紅字消失。
- 通過檢查再送出，段落變成「已送出」加上輸入的 email。
- 錯誤文字是瀏覽器依語言產生的字串，想要自己的文案，可以讀 validity 的各個布林，自己決定要顯示什麼。

# 資料驅動畫面

前面每個監聽都是直接改某個元素。清單一長，就容易改了畫面卻忘了改資料，或是相反。這一章把資料集中放在一個物件，畫面永遠由資料重畫出來，再用待辦清單把整套做法完整走一遍。

## 狀態與重繪

狀態（state）是此刻畫面該呈現的全部資料，例如清單目前有哪些項目。做法是讓狀態成為唯一的資料來源，畫面只是依它重畫出來的結果。重畫由一支自己取名叫 render 的函式負責：先清空畫面，再依狀態把每一項重新做成元素。整個流程是一個循環，如下圖與三點規則。

- 事件只改狀態，不直接動畫面。
- 改完狀態，呼叫 render 重畫。
- render 只讀狀態，不自己決定要新增或刪除什麼。

{% mermaid graph LR %}
stateNode["狀態"] --> renderNode["render"]
renderNode --> viewNode["畫面"]
viewNode --> eventNode["事件改狀態"]
eventNode --> stateNode
{% endmermaid %}

**觀念**

清單項目放在陣列 `state.items`。render 先清掉舊的列，再依陣列逐筆做出 li。每次都整份重畫，所以畫面上不會殘留上一輪的節點，也不會和資料不一致。

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
        state.items.push(`項目 ${state.items.length + 1}`);
        render();
      });

      render();
    </script>
  </body>
</html>
```

**解析**

- 載入時先呼叫一次 render，頁面一開始就有「筆」與「紙」兩列。
- 每按一次按鈕，陣列多一筆「項目 3」「項目 4」……，清單就長出對應的一列。
- 按鈕的監聽只對陣列 push，不自己建立 li。新的一列是 render 依陣列畫出來的。
- 在 DevTools 的 Elements 面板展開 ul，每次按下去，底下所有 li 都是 render 重新產生的新節點。
- 文字用 textContent 放進 li，內容會被當成純文字，不會被當成 HTML 解析。

{% note info %}
**這就是 React 的核心做法**
React 沿用同一個想法：畫面由狀態決定，狀態改了就重畫。差別是我們不再自己寫 render 與清空節點，只要描述「這份狀態長什麼樣子」，React 會重新執行描述，並只把真正有變的部分更新到畫面上。狀態怎麼宣告與修改，到 React 章節再學。
{% endnote %}

## 綜合練習：待辦清單

這一節把前面學的元素建立、事件委派與表單合在一起，做一份可以新增、完成與刪除的待辦清單。每一筆待辦是一個物件，記錄 id、標題與是否完成；畫面仍然只由 render 產生。

### 從狀態畫出清單

第一步先不接事件，只確認狀態能畫成清單。狀態放兩筆待辦，render 為每一筆做出標題與兩顆按鈕，已完成的那筆加上 class 讓樣式畫上刪除線。

**觀念**

done 為 true 時，li 加上 done class，樣式表負責刪除線。按鈕用 `data-action` 記下要做什麼、`data-id` 記下是哪一筆，下一步的監聽就靠它們分辨。自訂屬性讀出來一定是字串，所以監聽之後要用 Number 轉回數字，才能和待辦的 id 比對。

```html 04-js/pages/147-js-todo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>待辦清單</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.5rem; }
      button { font: inherit; }
      li { margin: 0.4rem 0; }
      li.done span { text-decoration: line-through; }
      li button { margin-left: 0.35rem; }
    </style>
  </head>
  <body>
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

- 頁面上有兩列：第一筆沒有刪除線，第二筆因為 done 是 true 而有刪除線。
- 每一列有兩顆按鈕，切換鈕的文字依 done 在「標成完成」與「改回未完成」之間變化。
- 這一步還沒有任何監聽，所以點按鈕不會有反應。

### 新增、切換與刪除

第二步補上兩份監聽：表單負責把新待辦推進陣列，清單負責改某一筆的 done，或把它從陣列濾掉。兩邊最後都只做一件事，呼叫 render。

**觀念**

- 送出表單時先擋掉瀏覽器預設的重新載入，再檢查必填；沒通過就顯示瀏覽器提示並結束。
- 通過後讀出標題、去掉前後空白，推進 `state.items`，並清空輸入框。
- 清單的 click 用 `closest` 找到被按的按鈕，再依 `data-action` 決定切換或刪除。
- 三種操作最後都只做同一件事：呼叫 render。

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
        const title = String(data.get('title')).trim();
        if (!title) return;
        state.items.push({ id: state.nextId, title, done: false });
        state.nextId += 1;
        form.querySelector('#title').value = '';
        render();
      });

      list.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
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

- 完全沒填會被 required 擋下，並出現瀏覽器的提示。只打空白能通過 required，但 trim 之後是空字串，所以監聽直接結束，清單不會多一筆。
- 新增時用 nextId 當新待辦的 id，再加 1。不用「陣列長度加一」，是因為刪除之後長度會變小，可能和既有的 id 重複。
- 切換只改那一筆的 done；刪除用 filter 留下 id 不同的項目。兩種操作都沒有碰 DOM，畫面變化全來自最後的 render。
- 按鈕是每次 render 重新做的，舊按鈕上的監聽會跟著消失，所以監聽要放在不會被重畫的 ul 上，這就是事件委派。

# 選讀：打地鼠

這一節把計時器、狀態、class 與事件委派放進同一個小遊戲。九個洞用按鈕排成三乘三，顏色代表狀態：黃是閒置，紅是地鼠出現，綠是剛被打中。

開始後倒數 20 秒。大約每 700 毫秒挑一個閒置的洞變紅，800 毫秒沒被打到就回黃。只有紅色的洞按了才得分，得分後短暫變綠再回黃。時間到就清掉所有計時器，開始鈕恢復可以再按。

## 畫面與狀態

第一步只建立狀態與 render，不接計時器。九個洞的狀態放在同一個陣列，畫面上的顏色完全由這份陣列決定。

**觀念**

state 集中記下分數、剩餘秒數、是否進行中，以及之後要清除的計時器識別碼：兩個間隔計時器各一個，每個洞的 setTimeout 識別碼則以洞的編號為鍵放進 hideIds。render 先拿掉每個洞的 `up` 與 `hit` class，再依陣列把不是閒置的狀態加回去。進行中時，開始鈕設為不能按。

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
      // 九個洞，每個洞一個狀態：idle、up 或 hit
      const createHoles = () => [
        'idle', 'idle', 'idle',
        'idle', 'idle', 'idle',
        'idle', 'idle', 'idle',
      ];

      const state = {
        holes: createHoles(),
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
- 初始全部是 idle，所以沒有紅也沒有綠；畫面上秒數是 20、分數是 0。
- playing 是 false，開始鈕可以按，但這一步還沒有監聽，按了沒有反應。
- 分數與秒數寫進 span 的 textContent，不需要重組整段 HTML。

## 開局、命中與結束

第二步把工作拆成幾支函式：start 重置這一局並啟動計時器，spawn 讓地鼠出現，hit 處理打中，tick 每秒減一秒，end 結束並清掉計時器。點擊只綁在棋盤上，用事件委派判斷點到哪一洞。

{% mermaid graph TD %}
startNode["start"] --> tickNode["tick 每 1 秒"]
startNode --> spawnNode["spawn 每 0.7 秒挑閒置洞"]
spawnNode --> upNode["狀態改成 up"]
upNode --> hideNode["0.8 秒沒打到改回 idle"]
upNode --> hitNode["hit"]
hitNode --> scoreNode["分數加一，0.3 秒後回 idle"]
tickNode --> endNode["時間到就 end"]
endNode --> clearNode["清除計時器"]
{% endmermaid %}

**觀念**

- 打中時要 clearTimeout 取消那個洞的回黃計時器。不取消的話，洞回黃後若又冒出新地鼠，舊計時器到點會把新地鼠提早收掉。
- 回黃的計時器到點時，先確認該洞還是 up 才改回 idle，這是多一層保險。
- 結束時要清掉兩個間隔計時器與 hideIds 裡所有計時器，否則遊戲結束後洞還會繼續變色。
- spawn 隨機挑洞用 `Math.random`，用法見 {% post_link lokiTech-15day-06-js-basics %} 的「選讀：內建物件」。

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

      // 九個洞，每個洞一個狀態：idle、up 或 hit
      const createHoles = () => [
        'idle', 'idle', 'idle',
        'idle', 'idle', 'idle',
        'idle', 'idle', 'idle',
      ];

      const state = {
        holes: createHoles(),
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
        state.holes = createHoles();
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
        state.holes = createHoles();
        state.clockId = setInterval(tick, 1000);
        state.spawnId = setInterval(spawn, SPAWN_MS);
        spawn();
      };

      document.querySelector('#board').addEventListener('click', (event) => {
        const hole = event.target.closest('.hole');
        if (!hole) return;
        hit(Number(hole.dataset.index));
      });

      document.querySelector('#start').addEventListener('click', start);
      render();
    </script>
  </body>
</html>
```

**解析**

- start 先清掉上一局可能留下的計時器，再把分數歸零、秒數回到 20、九個洞回到 idle。
- spawn 只從 idle 的洞裡隨機挑，已經是紅或綠的洞不會被重複挑中。
- hit 先確認正在遊戲且該洞是 up，才加分並改成 hit，300 毫秒後回 idle。點到黃洞或綠洞都不計分。
- tick 把秒數減到 0 時呼叫 end。end 會清掉兩個間隔計時器與每個洞的 timeout，洞全部回黃，開始鈕恢復。
- 棋盤的 click 用 closest 找到被點的洞，再把 data-index 交給 hit。點在洞以外的空白處不會計分。

# 回家作業

這份作業只用必教內容，資料取自專案的行程清單，題目依序累加：前一題的列表就是後一題的基礎。課堂上不會批改，也沒有標準答案；每一題都附上完成後該看到的結果，自己對照即可。

## 起始檔

起始檔在練習專案的 `04-js/homework/07-homework.html`，頁面骨架與八筆行程資料都已經備好，只需要把程式寫在標示的位置。

```html 04-js/homework/07-homework.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>07 回家作業</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; max-width: 720px; }
      #theme-filter button { margin: 0 4px 8px 0; }
      #tour-list { padding-left: 20px; }
      form label { display: block; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <h1>行程列表</h1>
    <div id="theme-filter">
      <button type="button" data-theme="all">全部</button>
      <button type="button" data-theme="城市">城市</button>
      <button type="button" data-theme="山海">山海</button>
      <button type="button" data-theme="海岸">海岸</button>
      <button type="button" data-theme="古都">古都</button>
      <button type="button" data-theme="離島">離島</button>
      <button type="button" data-theme="日本">日本</button>
    </div>
    <p><input id="search" type="search" placeholder="搜尋標題" /></p>
    <p>收藏 <span id="fav-count">0</span> 筆</p>
    <ul id="tour-list"></ul>
    <p id="empty" hidden>找不到符合的行程</p>

    <h2>報名</h2>
    <form id="booking-form" novalidate>
      <label>姓名 <input name="name" required /></label>
      <label>Email <input name="email" type="email" required /></label>
      <label>人數 <input name="people" type="number" min="1" max="8" required /></label>
      <button type="submit">送出</button>
    </form>
    <ul id="booking-errors"></ul>
    <p id="booking-result"></p>

    <script>
      const tours = [
        { id: 'taipei-beitou', title: '台北大稻埕與北投溫泉三日', region: '台北', theme: '城市', days: 3, price: 18600 },
        { id: 'keelung-jiufen', title: '基隆北海岸與九份兩日', region: '基隆', theme: '海岸', days: 2, price: 9200 },
        { id: 'hualien-taroko', title: '花蓮太魯閣與七星潭四日', region: '花蓮', theme: '山海', days: 4, price: 26800 },
        { id: 'taitung-chishang', title: '台東池上與成功海岸三日', region: '台東', theme: '山海', days: 3, price: 21400 },
        { id: 'tainan-anping', title: '台南府城與安平兩日', region: '台南', theme: '古都', days: 2, price: 8800 },
        { id: 'kaohsiung-qijin', title: '高雄港都與旗津三日', region: '高雄', theme: '城市', days: 3, price: 14200 },
        { id: 'kinmen-villages', title: '金門聚落與戰地三日', region: '金門', theme: '離島', days: 3, price: 16800 },
        { id: 'kyoto-nara', title: '京都嵐山、伏見與奈良五日', region: '京都', theme: '日本', days: 5, price: 52800 },
      ];

      // 在這裡開始寫
    </script>
  </body>
</html>
```

## 題目

### 題目一：把資料畫成列表

用 `tours` 陣列在 `#tour-list` 裡產生八個列表項目。每一項顯示標題、天數與價格，並附一個「收藏」按鈕，按鈕要帶著行程編號。用 `textContent` 放文字，不要用 `innerHTML` 拼字串。

完成後頁面有八列，第一列是「台北大稻埕與北投溫泉三日　3 天　NT$18600」。

### 題目二：依主題篩選

點上方的主題按鈕，只顯示該主題的行程；點「全部」恢復八筆。篩選要用事件委派，只在 `#theme-filter` 上綁一個監聽。沒有符合的行程時，顯示 `#empty`。

完成後點「城市」只剩台北與高雄兩筆，點「山海」剩花蓮與台東。

### 題目三：關鍵字搜尋

在搜尋欄輸入時就即時篩選，標題含有輸入的字就保留。搜尋要和主題篩選同時作用：先選「山海」再輸入「花蓮」，只剩花蓮一筆。把目前的主題與關鍵字放進同一個 `state` 物件，畫面由一個 `render` 函式依 state 重畫。

完成後輸入「三日」，會留下標題含有「三日」的四筆。

### 題目四：收藏

點「收藏」按鈕可以切換收藏狀態，已收藏的按鈕文字改為「已收藏」，`#fav-count` 顯示目前收藏幾筆。收藏的編號放在 `state` 裡，切換主題或搜尋後，收藏狀態仍要正確。

完成後收藏兩筆再切換主題，回到「全部」時那兩筆仍顯示「已收藏」，數字是 2。

### 題目五：報名表單驗證

表單送出時不要換頁。依序檢查三個欄位是否通過瀏覽器的驗證，沒通過的把各欄位的 `validationMessage` 列在 `#booking-errors`。全部通過就用 `FormData` 讀出欄位，把「某某報名 N 人」寫到 `#booking-result`，並清空錯誤清單。

完成後不填任何欄位按送出會看到三則錯誤；填入姓名、Email 與 3 人後送出，會看到「某某報名 3 人」。

# 本篇重點回顧

選讀章節有：模組腳本、返回與前進、pushState 與 replaceState、視窗與畫面、瀏覽器資訊、列印與對話框、requestAnimationFrame、getElementById 與 getElementsBy 系列、讀取畫面結果、template 元素、捕獲與冒泡、打地鼠，以下只整理主線。

- 瀏覽器物件模型管分頁、文件物件模型管這一份 HTML，兩者都從全域物件 `window` 出發。
- script 要等元素出現才能操作，所以放在 body 尾端，或用 defer、DOMContentLoaded 延後執行。
- 網址與查詢字串用 location 和 URLSearchParams 處理，計時器要把識別碼存起來，才取消得了。
- 單筆選取找不到是 null，多筆選取沒有符合時是長度 0 的清單，所以單筆要先確認再使用。
- 使用者的字串用 `textContent` 放進畫面，不交給 innerHTML，日常設定改 property，外觀交給 classList。
- 新節點先建立再插入，已經在頁面上的節點再插入是搬移，要留下原件就先 cloneNode。
- 事件用 addEventListener 登記，會重畫的清單把監聽放在父層做事件委派，再用 closest 找到被按的按鈕。
- 表單送出時先 preventDefault 再用 FormData 讀值，資料集中成狀態，改了就重新 render 畫出畫面。

# 專有名詞中英對照

上網查這一篇的說法時，用括號裡的英文當關鍵字。順序跟內文第一次出現相同。

## 認識瀏覽器環境

- 瀏覽器物件模型（Browser Object Model，BOM）
- 文件物件模型（Document Object Model，DOM）
- 全域物件（global object）
- DOM 樹（DOM tree）
- 跨來源限制（cross-origin restriction）
- 模組腳本（module script）

## BOM

- 協定（protocol）
- 主機（host）
- 路徑（path）
- 查詢字串（query string）
- 片段（fragment）
- 來源（origin）
- 編碼（encoding）
- 導向（redirect）
- 瀏覽紀錄（history）
- 非同步（asynchronous）
- 像素比（device pixel ratio）
- 媒體查詢（media query）
- 深色模式（dark mode）
- 偏好語言（preferred language）
- 使用者代理字串（user agent string）
- 排版引擎（layout engine）
- 功能偵測（feature detection）
- 安全連線（secure context）
- 剪貼簿（clipboard）
- 對話框（dialog）
- 回呼函式（callback）
- 計時器（timer）
- 識別碼（timer ID）

## DOM

- 節點（node）
- 元素（element）
- 選擇器（selector）
- 節點清單（NodeList）
- 展開語法（spread syntax）
- 靜態（static）
- 後代（descendant）
- 父元素（parent element）
- 子元素（child element）
- 兄弟元素（sibling element）
- 祖先（ancestor）
- 即時集合（live collection）
- 文字節點（text node）
- 標記（markup）
- 純文字（plain text）
- 跨站腳本攻擊（cross-site scripting，XSS）
- 消毒（sanitize）
- HTML 屬性（attribute）
- DOM 屬性（property）
- 行內樣式（inline style）
- 布林屬性（boolean attribute）
- 小駝峰（camelCase）
- 最終樣式（computed style）
- 深複製（deep clone）
- 文件片段（DocumentFragment）

## DOM 事件

- 事件（event）
- 監聽（event listener）
- 內容安全政策（Content Security Policy，CSP）
- 事件物件（event object）
- 指標（pointer）
- 修飾鍵（modifier key）
- 預設動作（default action）
- 傳播（propagation）
- 事件委派（event delegation）
- 控制項（form control）
- 焦點（focus）
- 組字（IME composition）
- 事件冒泡（event bubbling）
- 事件捕獲（event capture）
- 表單驗證（form validation）
- 正規表示式（regular expression）

## 資料驅動畫面

- 狀態（state）
- 重繪（re-render）
- 唯一資料來源（single source of truth）

## 選讀：打地鼠

- 閒置（idle）
- 地鼠出現（spawn）
- 命中（hit）
