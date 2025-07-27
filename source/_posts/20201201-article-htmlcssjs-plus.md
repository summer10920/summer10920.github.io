---
title: "[學習之路] 重新認識你知道的 HTML、CSS、JavaScript"
categories:
  - Misc Notes
  - Web Fronted
tag:
  - HTML
  - CSS
  - JavaScript
date: 2020-12-01 00:06:07
---

本篇主要為強化之前的新手文章教學（包含 HTML、CSS、JavaScript) 的不足之處，提供一些觀念與語法上深入知識與應用技巧。本篇內容寫法極為簡略，建議完成基本課程的對象重新再接觸本篇文章。

<!-- more -->

# HTML5

## 知識篇

- HTML 可以不分大小寫，不論是`<head>`或`<HTML>`都是同樣標籤，建議仍小寫習慣。
- 屬性值可以用`"`,`'`或不寫來包覆字串內容，建議仍使用`"`包覆。
- 連續多個半形空白只會被當作一個半形空白。
- HTML4 (4.01) 與 XHTML 與 HTML5 的三者關係
  |              | HTML4                                      | XHTML                                                                                                                       | HTML5                                                                          |
  | ------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
  | 說明         | 上一世代的網頁語法，源自於 1993 年發布 1.0 | 目的為取代過 HTML4 的過渡品，仍使用 HTML4 標籤但調整為 XML 規則來補足標籤的不足，變成較嚴格的寫法                           | 遵循 HTML4 標籤但擴充了標籤與 API，使 WEB 應用更廣且支援跨平台瀏覽。為目前主流 |
  | DOCTYPE 宣告 | 不用，直接從`<html></html>`開始            | `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">` | `<!DOCTYPE html>`                                                              |
- HTML5 的優勢
  - 支援更多標籤，像是`<video>`,`<audio>`,`<canvas>`的多媒體應用，同時多種語意標籤像是`<section>`,`<article>`,`<header>`讓網頁更結構具備判別性。
  - API 的彈性多元，像是 Canvase API 技術能輕易使用 canvas 完成 2D 繪圖，以及使用 Media API 技術能直接用`<video>`或`<audio>`來控制視訊與音效（早期還需要安裝 real Player 或 flash 唷）
  - HTML5 還提供 localStrorage 與 sessionStorage 技術可以拿來取代 Cookie 技術 （皆透過 JS 來讀寫）。
  - HTML5 支援 SVG 且可使用 MathML 顯示
  - HTML5 表單元素的完整性更多且支援驗證功能。
  - HTML5 的 meta,charset 讓網頁情報更完整。
  - HTML5 對 script 額外提供了 async & defer 技術，讓效率有更彈性的選擇。
  - HTML5 對元素提供彈性屬性應用，像是 tabindex, hidden, data-\* 等。
  - HTML5 可以如 PDF 那樣內嵌字型，當然網頁流量會增加。
  - 部分舊元素不再支援，如果你還能使用那只是瀏覽器額外為了自家品質而接受該語法喧染。

## 標籤與屬性篇

- \*[accesskey]
  能指定快速鍵來獲得焦點
- \*[dir=ltr|rtl|auto]
  指定文字方向是從右還是左開始
- \*[lang]
  指定該內容文字為何語言
- \*[tabindex]
  指定透過 tab 選取焦點之順序，可以值為`-1`為不列入選取。
- cite
  作為引言或參考處，通常是定義產品名稱像是書籍、電影或歌曲等等。
- ol[type=1|A|a|I|i]>li
  指定項目列表之編號可以是數字、英文大小寫、羅馬數字大小姐。
- ol[reversed]>li
  指定順序編號改為由大至小。
- dl>(dt+dd)\*num
  為自訂清單，dt 作為名稱定義而 dd 作為描述說明。
- a[target=_blank|_self|_top|_parent|iframeName]
  指定目標網址在哪個視窗開始，依序為新視窗、目前位置（預設）、分割視窗之根部、分割視窗之上層、指定 iframe 名稱之元素位置。
- table>caption+thead+tbody....
  caption 元素作為表格的標題文字，通常寫在 table 內的第一個元素位置。
- table>tr>th#idName^tr>td[headers=idName]
  headers 能將一個儲存格 td 指定對應至哪一個標題列儲存格
- details>summary+\*
  建立收合的區塊，summary 為保留標題做互動，而其他元素都將被隱藏起來。
- figure>\*+figcaption
  為 HTML5 的語意標籤定義，規劃一個區段的內容（可能是圖片表格或代碼），提供說明文字 (figcaption)，沒有特別外觀效果只有結構意義。
- label[for=idName]{DOWNLOAD}+process#idName[value=32][max=100]{32%}
  process 做為一個比例 bar 預設最小為 0，需指定目前值與最大值。另外還有個類似的元素為`<meter>`則需要設定最小值。
- ruby
  提供拼音輔助描述文字，另外還有 rp 元素可提供不支援的瀏覽器輔助，但現在幾乎都有支援所以可省略。
```html element ruby
<ruby> 東京<rt>TOKYO</rt> </ruby> <ruby> 漢 <rt>Kan</rt> 字 <rt>ji</rt> </ruby>
```
- video>track
  track 主要提供影片進行外部載入字幕檔（格式為 vtt)，也能指定多國語言不同的字幕檔案載入。
- input+datalist>option\*n
  額外提供用戶對輸入欄位有非必要的下拉選單預設帶入功能。
```html
<label for="browser">Choose your browser from the list:</label>
<input list="browsers" name="browser" id="browser" />
<datalist id="browsers">
  <option value="Edge"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
```
- input[pattern=""]
欄位驗證用途，字串使用正規表達式來指定允許的輸入符號。
- input[autofocus]
指定網頁載入後預設獲得焦點，省去使用者需自行點選欄位。
- input 其他 HTML5 類型欄位
```html
<input type="range" min="0" max="100" step="0.5">
<input type="number" min="0" max="120">
<input type="time">
<input type="date">
<input type="month">
<input type="week">
<input type="color">
<input type="url">  <!--用戶不寫 http:// 會自動補上 -->
<input type="email">
```
- form>output
  表單內提供互動結果的 output 元素，當需要進行 JS 計算回傳畫面可使用此元素。雖然可以改套用任何其他 input 拿來改值變動，差異最大的好處在於提交不會送出 value。for 可以語意完整說明來關聯性的 id 元素。
```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" id="a" name="a" value="50" /> +
  <input type="number" id="b" name="b" value="10" /> =
  <output name="result" for="a b"></output>
  <input type="submit" value="send" />
</form>
```
- \*[contenteditable=true]
  任何元素都能調整為可修改之狀態（類似 input)，這對於客製化視覺的表單（透過非表單元素+event button+DOM) 設計很有幫助。
- \*[hidden]
  能將指定元素進行隱藏，等同於自訂 CSS 為`display:none`，因此你可以透過添加`display:block`改為顯示。
- _[data-_=\*]
  自訂資料屬性添加，對 HTML 不會有任何影響，對於 JS 操作讀取資料做判別或存取有很大彈性又不傷 HTML 的複雜化。

## 語意篇
語意標籤是 HTML5 的重點改革，希望讓網頁更有意義且簡潔，而不是大量的 DIV 去編寫一個沒有可讀性的 HTML 代碼。也能對維護工程師提供更好的閱讀提高工作效率，也包含人工智慧或爬蟲對於文件的判讀運作。HTML5 的語意標籤沒有強迫規定如何使用，反而之如果適用得宜能讓語意發揮更能呈現該代碼的說明能力：
- `<header>`
  作為一個的標題區塊，也可以是整個網頁的標題或是任何一個區段標籤內的標題區塊。譬如可以是 body>header>nav>a，或者 article>header>h1+p 這樣使用。
- `<section>`
  作為一般或應用區域的區塊，可以當作一個 groupx 來操作。譬如 section>article\*n 或 article>section\*n 都可以。由於是一般用途所以如果有更適合的語意請改用其他語意標籤。
- `<article>`
  作為文章區域，通常是一種含有完整內容成分的群組化區塊，完整程度能夠轉貼至其他網站（如 RSS/Facebook)，可能是某個摘要文章、部落文、留言回應等。
- `<aside>`
  可以做些額外資訊來補足主要內容，通常被拿來做側邊區塊，可能是廣告、索引選單、輔助說明等一些非重要性內容的資訊。
- `<nav>`
  導覽標籤常為選單區，通常是一些超連結集成的導覽如 nav>ul>(li>a)\*n。
- `<footer>`
  註腳區塊，如 header 對應可以是整個網頁之頁尾區或任何語意標籤之註腳區（不包含 header 或另一個 footer 內），通常都內容都是作者、引用連結、版權或聯絡方式等資訊。
- `<figure><figcaption>`
  提供給一個範圍區塊的輔助說明文字，應用於圖片或程式碼的輔助，結構為 figure>img\*n+figcaption 使用。
- `<mark>`
  標記文字內容，具備外觀為黃底螢光效果。與 strong 標籤不同的是，這不是一種強調文字而只是單純標示出相關文字（譬如透過 JS 行提供互動的搜尋文字結果或錯誤代碼）。
- `<process><meter>`
  顯示進度或測量值的表現方式，使用屬性方式前面已經介紹過。
- `<detail><summary>`
  提供可折疊的資訊區塊，使用者能透過點選進行隱藏或顯示，使用屬性方式前面已經介紹過。

## 多媒體
- Audio
HTML5 的音樂播放格式為 MP3、WAV、OGG 為主。範例如下：
```html
<audio src="test.mp3" autoplay controls></audio>
<!--
  -------------可用屬性名不需帶值
  autoplay 自動播放
  controls 顯示控制
  loop 重複播放
  muted 指定為靜音

  prload="none（預設）"|"auto"|"metadata" 說明如下
  
  !!!!!!!!!!!!!!!!
  prload 只有在未指定 autoplay 才有效，可指定載入網頁時是否需要預先影音檔載入，none 不載入、auto 自動載入、metadat 只先載資訊。
  !!!!!!!!!!!!!!!!
-->
```
如果需要滿足不同瀏覽器對格式不支援的問題，可以透過 `audio>source` 標籤讓瀏覽器自動選擇能播放的檔案 (type 需寫對格式讓瀏覽器判斷）。如果瀏覽器看不懂至少看得懂 p 元素而顯示文字表示。source 用途同樣可套用在 image 或 video 使用。
```html
<audio autoplay controls>
  <source src="test.ogg" type="audio/ogg">
  <source src="test.mp3" type="audio/mp4">
  <p>您瀏覽器不支援 HTML5 Audio</p>
</audio>
```
- Video
同 audio 的玩法且屬性也差不多，支援 mp4(h264/acc)、ogg/ogv、webm
```html
<video autoplay controls poster="https://fakeimg.pl/400x300" width="400" height="300" muted>
  <source src="test.ogg">
  <source src="test.mp4">
  <p>您瀏覽器不支援 HTML5 Video</p>
</video>
<!-- 與 audio 屬性差不多，唯獨 poster 能提供預載之靜態畫面，而 width 與 height 能指定寬高 -->
```

# CSS3
因為 CSS3 的特效屬性強大，很多人都使用 CSS3 來設計網站，所以現在 CSS3 幾乎都已經是主流版本，不太需要去理解舊版本 CSS 的差異，因此直接介紹一些少聽聞過的 CSS3 屬性應用。

## 選擇器

### 偽元素

- p::first-letter
  所有 p 元素的第一個內容字母生效。
- p::first-line
  所有 p 元素的第一行生效，若文字被擠壓到第二行就失去選擇套用。
- ::selection

### 偽類

- input:focus
  作用於該元素獲得焦點時運作。
- p:lang(zh-TW)
  在所有 p 元素當中持有 lang 屬性且值為 zh-TW 的對象。
- :root
  指的是跟目錄的元素，也就是整體 HTML 的最外層元素。
- p:empty
  指沒有子元素的 p 元素，注意若 content 文字並不是子元素。
- input:enabled|disabled|checked
  input 元素的啟用|關閉|已打勾的狀態已作用則為對象。
- p:first-child
  在某父元素下的所有子元素當中，第一個是 p 元素才為對象。若該子元素內第一個並不是 p 元素，則不列入選擇對象。
- p:first-of-type
  在某父元素下的所有子元素當中，只要首次出現 p 元素出現為對象，此 p 元素不一定需要排在整個子元素內的第一個。
  -p:last-child
  在某父元素下的所有子元素當中，最後一個是 p 元素才為對象。若該子元素內最後一個並不是 p 元素，則不列入選擇對象。
- p:last-of-type
  在某父元素下的所有子元素當中，所有子元素內最後一筆出現的 p 元素為對象。
- p:only-child
  在某父元素下的只有一個子元素，且這個唯一的子元素為指定的 p 元素則為對象。
- p:only-of-type
  在某父元素下的所有子元素當中，所有子元素內只出現的唯一的 p 元素為對象，若子元素有兩個以上則不列入選擇。
- p:nth-child(2)
  在某父元素下的所有子元素當中，排序第二個如果是 p 元素則為對象。
- p:nth-of-type(2)
  在某父元素下的所有子元素當中，不用考慮連續，只要是第二個出現的 p 元素為對象。
- p:nth-child(2n+1)
  在某父元素下的所有子元素當中，全部排序第 1,3,5,7.... 如果是 p 元素才為對象。
- p:nth-of-type(2n+1)
  在某父元素下的所有子元素當中，不用考慮連續，只要是第 1,3,5,7.... 出現的 p 元素為對象。
- p:nth-last-child(2)
  在某父元素下的所有子元素當中，反向排序第二個如果是 p 元素則為對象。
- p:nth-last-of-type(2)
  在某父元素下的所有子元素當中，不用考慮連續，只要是倒數第二個出現的 p 元素為對象。
- p:nth-last-child(2n+1)
  在某父元素下的所有子元素當中，全部倒數排序第 1,3,5,7.... 如果是 p 元素才為對象。
- p:nth-last-of-type(2n+1)
  在某父元素下的所有子元素當中，不用考慮連續，只要是倒數第 1,3,5,7.... 出現的 p 元素為對象。
  > \*-child 與、\*-of-type 的差異在於：前者需考量所有的子元素們且要符合元素；後者則先挑選出符合元素再考慮順序這些挑選後的子元素們。
  > nth-\*系列可以搭配 n 做連動，n 可以視同 0 開始批次選擇。

### 層級

- p~ul
  選擇所有 ul 且前面的兄弟是 p 元素的對象。

## 屬性篇

- `column-count:3;`
  Multi-column 觀念，對父元素設定要求子元素排列，能將網頁內容以 3 欄位呈現，像是雜誌報紙或 inDesign 平面設計的多欄配置。
- `column-gap:20px;`
  對父元素設定要求子元素間距，提供欄位間格，此空間跟 BOX 模型無關，可套用在 flexbox,grid,Multi-column 設計內。
- `display:table|table-row|table-cel`
  能將元素模擬成表格的效果，分別顯示成 table,tr,td 之格式。這對於排版有很大彈性（譬如三攔同高度）。
- `column-count:3;`
  能將網頁內容以多欄位呈現，像是雜誌報紙或 inDesign 平面設計的多欄配置。

# JavaScript

## 知識篇

- 現在常說的 JavaScript 其實正確名稱是 ECMAScript，他是根據 ECMA-262 所規範標準，目前版本為 ES6。
- 原本 JavaScript（早期叫做 LiveScript) 是由瀏覽器 Netscape 所使用的腳本，1995 年之後各大瀏覽器也跟進支援應用。
- 瀏覽器 IE3 時代時，微軟也自己設計出 JScript（劣品），兩者是不同的語言只是都遵循 ECMA 規範，結果 IE4 的時候卻多支援了 JavaScript 規格。
- JavaScript 是腳本語言，Java 是應用程式語言（需額外編譯器 JVM 才能在網頁上執行），兩者雖語法類似但完全不同的東西。
- JS 的核心觀念都是物件，所以說它是一個物件導向的程式語言。JS 能完整控制網頁與瀏覽視窗進行網頁改寫或行為事件處理。
- 由於 JS 是客戶端的腳本語言，因此要盡量避免 XSS 注入攻擊。
- 當變數為 NaN 代表為 Not a Number，通常用於數字計算後因錯誤的（非數字）型態運算後的產物。
- 當變數為 Infinity 代表數字過大超過上限範圍，若出現 -Infinity 則是超過負數上限範圍。
- 變數內容為 0,null,underfined 視同 false；若不等於 0 則為 true。
- 指定變數為 null 時，代表變數存在但要求沒有值。
- 變數型態為 Undified 時，代表有宣告變數但尚未指定過值，處於搞不清楚該值是什麼的狀態。
- 字串可使用 Escape 跳脫字元，像是`\n`代表換行字元來表達文字輸出。
- 運算子運作時採用先乘除後加減方式，以及其他運算符號都有優先順序。
- 不同資料型態進行相加時會有強制轉換原則：
  - Number + String => String
  - Boolean("true" | "false") + String => String
  - Boolean(1 | 0) + Number => Number
- 巢狀函式：function A 內可以宣告 function B 且執行，可惜的是 function A 以外的地方不認識 function B 且無法使用。
- 變數型態的原始 vs 物件：
```javascript
let a = "A";
let objA1 = new String("A");
let objA2 = new String("A");
console.log(a == objA1, objA1 == objA2); // true false
/*
  使用 new 所產生的都是物件型態，本體來說是一個空間位置（記憶體所在處不同），因此 objA1 與 objA2 是不同的物件而不相同
  然而 a 與 objA1 比較時，會產生以 a 的原始內容 A 與 A1 物件回傳的內容 A 進行比較得到 true
*/

let aryA = new Array(1, 2, 3);
let aryB = new Array(1, 2, 3);
console.log(aryA == aryB, aryA.toString() == aryB.toString()); //false true
/*
  array 物件也是一樣，兩者進行比較時因為空間位置不同屬於不同的項目。
  若需要對內容進行比較可以將陣列轉為字串後再進行比較。
*/
```
- 物件型態之變數特點：
```javascript
let num = 1,
  bool = true;
function room1(num, bool) {
  num = 2;
  bool = false;
  console.log(num, bool);
}
room1(num, bool); //2 false
console.log(num, bool); //1 true
//此原理都知道，兩筆 console 輸出是不同的東西，因為函式內的變數是另一個宇宙房間（區域變數與全域變數）。

let str = "A1",
  objAry = new Array("B1", "B2");
function room2(str, objStr) {
  str = "A2";
  objAry.push("B3");
  console.log(str, objAry);
}
room2(str, objAry); //A2 (3) ["B1", "B2", "B3"]
console.log(str, objAry); //A1 (3) ["B1", "B2", "B3"]
//然而 objAry 屬於一個空間位置，所以證明為對同個物件所做修改
```
- 函式的 arguments 參數陣列
  其實函式所有的傳入參數都會偷存放到 arguments 之偽陣列（物件），即使函式沒有設計參數也能同樣運作。
```javascript
function roomA(aa, bb) {
  // console.log(aa,bb);
  console.log(roomA.arguments);
}
function roomB() {
  console.log(roomB.arguments);
}
roomA(1, 2); //Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
roomB(3, 4); //Arguments(2) [3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```
- 自訂函式傳遞變數的選擇，也可以是一個函數型變數
```javascript
let msg = "hello world",
  print = (e) => {
    console.log(e);
  };
function say(tt, pp) {
  pp(tt);
}
say(msg, print);
//宣告兩個變數為字串與函式，可以在另一個自訂函式內執行。
```
- Google Chrome 的偵錯模式：
  1. 瀏覽器可以透過 <kbd>F12</kbd> 啟用開發人員工具，選擇 `source` 分頁並選擇要偵測的檔案。
  2. 選定檔案後，可以選擇任何的行數指定為 Breakpoint 起始處（標記為藍底），接著刷新頁面。
  3. 此時已啟用偵錯模式，瀏覽器會停留在該中斷點，並透過旁側的 Scope 標籤視窗告知你目前的變數內容。
  4. 你可以透過 <kbd>F9</kbd> 讓程式往下一個步驟移動，利於觀看這些代碼變化對變數的引響。
  5. 也能透過 <kbd>F11</kbd> 跳到有函式運作的步驟位置。
  6. 如果有需要監看指定的對象參數，可在 Watch 標籤視窗透過 `+` 符號自行手動輸入。
  7. 任何時候按下 <kbd>F8</kbd> 則會取消中斷點直接全程跑完代碼。
- JSON 與 String 格式轉換：
```javascript
const txt='{"a":"dog","b":"cat"}'; //string
const jsn={c:"mouse",d:"horse"}; //json
console.log(JSON.parse(txt)); //{a: "dog", b: "cat"} | json
console.log(JSON.stringify(jsn)); //"{"c":"mouse","d":"horse"}"  | string
```
- JS 的物件操作可以分為三大類：
  - 內建函式物件：提供 11 種 Objects 包含 Array, Boolean, Date, Function, Global, Math, Number, Object, RegExp, Error, String。你可以透過 new 來建構內建函式。
  - 自訂資料物件：自行使用 JSON 格式去設計創造出想要的物件資料。
  - BOM 本體模型：瀏覽器本體的物件，可以輕易去操作使用瀏覽器功能與網頁內容 (DOM) 調整。
- 自訂物件的刪除屬性方式：
```javascript
let obj = new Object();
obj.name = "Loki";
obj.age = "18";
delete obj.age;
console.log(obj);
```
- 自定義建構函式物件：你可以像內建物件那樣的自定義。
下面的方法是透過 fn 宣告來當作類別觀念的建構子（原本上沒有 class 寫法），而 ES6 提供了 Class 寫法可自行 [參考這裡](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes)
```javascript
function fn(blood, height, weight) {
  this.b = blood;
  this.h = height;
  this.w = weight;
  this.print = () => {
    console.log(`${this.b}型、${this.h}公分、${this.w}公斤`);
  };
}
const userA = new fn("B", 185, 82); //method1 to setting
userA.print(); // B 型、185 公分、82 公斤
//透過傳遞參數將物件模型規劃。

let userB = new fn(); //method2 to setting
userB.b = "O";
userB.h = 165;
userB.w = 70;
userB.print(); //O 型、165 公分、70 公斤
//雖然沒有傳遞參數，仍可以使用物件導向找到該屬性位置直接寫入
```
- Function Object 使用方法：以字串方式設定 FN 參數
```javascript
let say1 = new Function('console.log("hello world")');
say1(); // hello world

let say2 = new Function("name", "return `hi! ${name}`;");
console.log(say2("Loki")); // hi! Loki
```
- 函式型態物件的 call 方法
```javascript
function fn1(blood, height, weight) {
  this.b = blood;
  this.h = height;
  this.w = weight;
  this.print = () => {
    console.log(`${this.b}型、${this.h}公分、${this.w}公斤`);
  };
}
const userA = new fn1("B", 185, 82);
userA.print(); //method1 to print 'B 型、185 公分、82 公斤'
/******/
function fn2(blood, height, weight) {
  this.b = blood;
  this.h = height;
  this.w = weight;
}
function print() {
  console.log(`${this.b}型、${this.h}公分、${this.w}公斤`);
}
const userB = new fn2("O", 163, 65);
print.call(userB); //method2 use call to print 'O 型、163 公分、65 公斤'
/*
任何函式可以使用 call 方式將某物件呼叫到自己的函式裡，形成自己的資源
*/
```
- prototype 原型練（原生練）
  任何內建 Object 或自訂 object 都有各自的屬性或方法，我們稱呼為 prototype。每當使用 new 來宣告新物件時會繼承原本 object 的屬性或方法（但不是複製方式，所以記憶體共用減少負擔），你可以容易去對這些原生練調整或追加，即使是 new 之後也沒關係，畢竟是繼承方式。
```javascript
function fn1(blood, height, weight) {
  //is 建構函式
  // this.name="User";  //is 區間變數
  this.b = blood;
  this.h = height;
  this.w = weight;
  this.print = () => {
    console.log(`${this.name}：${this.b}型、${this.h}公分、${this.w}公斤`);
  };
}
let userA = new fn1("B", 185, 82);
fn1.prototype.name = "Loki"; // is 原生變數，能繼承給 userA
userA.print(); // Loki：B 型、185 公分、82 公斤
/*
  fn1.prototype.name 為指定原生練屬性，因此 this.name 取自原生練
  this.b 這些為後指定的物件屬性值，所以查詢 fn1.prototype 只會看到 name （原生練只有一個）
  如果有先指定 this.name="User" 那 this.name 則指向為這裡並不會指到 prototype.name
  你可以使用 chrome console 輸入 userA 展開查詢物件的屬性與原生練之內容差異
*/
```
- Closure 閉包觀念 （物件導向）
  在函式內的普通區域變數在函式執行結束後會消失，如果是巢狀且採用匿名函式將可以形成閉包空間，所有的函式都能夠記住被創造的當下的環境以及變數。這是一種物件導向觀念，透過 Closure 特性設計出 private member。
```javascript
function closure(a) {
  this.fnGet = function () {
    return a;
  };
  this.fnSet = function (b) {
    a = b;
  };
}
let val = new closure(10);
val.fnGet(); //10
val.fnSet(20);
val.fnGet(); //20
```
- 建構出來的函式物件可加載靜態屬性
```javascript
function fn1(blood, height, weight) {
  //is 建構函式
  // this.name="User";  //is 區間變數
  this.b = blood;
  this.h = height;
  this.w = weight;
  this.print = () => {
    console.log(`${this.name}：${this.b}型、${this.h}公分、${this.w}公斤`);
  };
}
let userA = new fn1("B", 185, 82);
fn1.prototype.name = "Loki"; // is 原生變數，能繼承給 userA
userA.print(); // Loki：B 型、185 公分、82 公斤

fn1.test = "AAA"; // is 靜態屬性，不會繼承給 userA
console.log(fn1.test, userA.test);
```
- prototype 原生練的繼承
```javascript
function fn1(blood, height, weight) {
  //is 建構函式
  this.b = blood;
  this.h = height;
  this.w = weight;
}
function show(name) {
  this.pr = () => {
    console.log(`${name}：${this.b}型、${this.h}公分、${this.w}公斤`);
  };
}
show.prototype = new fn1("B", 185, 82); //將 fn1 繼承給 show 的原生練，已知道 bhw 值

let msg = new show("Loki"); //msg 成為函式物件，
msg.pr(); // Loki：B 型、185 公分、82 公斤
```
- 命名空間規劃觀念
```javascript
////method1: 以物件方式呼叫執行函式
let fn1 = (() => {
  let num = 1;
  let inc = () => {
    return num++;
  };
  let clear = () => {
    return (num = 1);
  };

  return {
    next: inc,
    reset: clear,
  };
})();
/*
fn1 為 ()() 寫法，可解讀為：
第一個 () 是函式內容，也就是指定一個匿名箭頭函式其為內容
第二個 () 是直接執行，因此只要指令 fn1 代表這個箭頭函式執行
整體行為 只要輸入 fn1 就會 return {next: ƒ, reset: ƒ}，不需要寫 fn1()
*/
fn1.next();
fn1.reset();
fn1.next();
////method2: 用函式包裝物件作為呼叫
let fn2 = {};
((e) => {
  let num = 1;
  e.next = () => {
    return num++;
  };
  e.reset = () => {
    return (num = 1);
  };
})(fn2);
fn2.next();
fn2.reset();
fn2.next();
/*
fn1 為物件，透過函式執行 ()() 來呼叫：
第一個 () 是函式內容，也就是指定一個匿名箭頭函式其為內容，同時賦予一個傳遞參數
第二個 (fn2) 是直接執行且會將 fn2 當作傳遞參數給匿名箭頭函式（也就是變成函式內的 e 參數）。因此 fn2 能獲得一個處理結果
整體行為 只要輸入 fn2 就會 return {next: ƒ, reset: ƒ}，不需要寫 fn2()
*/
```
- 命名空間的用途
```javascript
////method1: 以物件方式呼叫執行函式
fn = () => {
  let num = 1;
  let inc = () => {
    return num++;
  };
  let clear = () => {
    return (num = 1);
  };
  return {
    next: inc,
    reset: clear,
  };
};
let userA = fn();
let userB = fn();
userA.next(); //1
userA.next(); //2
userA.next(); //3
userB.next(); //1
userB.next(); //2
//透過命名空間操作，可以兩者獨立且位在不同的命名空間
```
- 物件的屬性 Implicit vs Explicit
  宣告變數時雖然都是物件但可以分為隱性或顯性，最大差異在於後者有提供 prototype 原生練且透過內建或自訂函式來生成。
```javascript
let a = "AAA"; //隱式
let b = new String("BBB"); //顯式
console.log(a, b); ///AAA String {"BBB"}
```
- 建構子 constructor 與原生練 prototype
```javascript
function info(name, height, weight) { //傳統的Prototype-based的寫法
  //在函式內宣告這些建構子 constructor
  this.name = name;
  this.height = height;
  this.weight = weight;
}
info.prototype.message = function () {
  //強迫指定 prototype
  return `姓名：${this.name}, 身高${this.height}, 體重${this.weight}`;
};
let user1 = new info("Loki", 10, 20); //建立物件，除了會載入建構子，也會繼承原生 prototype
console.log(user1);
/*
info {name: "Loki", height: 10, weight: 20}
  height: 10
  name: "Loki"
  weight: 20
  __proto__:
  message: ƒ ()
  constructor: ƒ info(name, height, weight)
  __proto__: Object
*/
console.log(user1.message());
```
> constructor 與 prototype 都能共用擁有，最大差異於前者是獨立占用記憶體（每次 new 都會占用記憶體），後者是繼承方式因此記憶體只有一處
- hasOwnProperty() | in | isPrototypeOf()
  查詢 constructor 建構子是否存在於函式物件內、以及查詢某變數是否存在於函式物件內、查詢某函式物件是某曾繼承於指定物件宣告來源。
```javascript
function test() {
  this.str1 = "ABC";
}
test.prototype.str2 = "abc";

let fn = new test();
let fake = new String();

//hasOwnProperty 提供檢查指定變數名稱是否於存在於建構子內
console.log(fn.hasOwnProperty("str1"), fn.hasOwnProperty("str2")); //true false

//in 關鍵字 提供檢查指定變數是否存在於函式物件內
console.log("str1" in fn, "str2" in fn); //true false

//prototype.isPrototypeOf() 提供查詢函式物件內是否 prototype 被繼承給指定的變數物件
console.log(
  test.prototype.isPrototypeOf(fn),
  test.prototype.isPrototypeOf(fake)
); //true false
```
- toString() | valueOf()
  當宣告某物件後，如需要檢查內容可以透過。toString() 將物件以字串方式回傳，或透過 valueOf() 將內容取出，不同型態的會有不同的字串格式。
```javascript
let a = new Array("A", "B", "C");
a.toString(); //"A,B,C"
a.valueOf(); //(3)["A", "B", "C"]

let b = new Date();
b.toString(); //"Tue Dec 08 2020 17:03:32 GMT+0800 （台北標準時間）"
b.valueOf(); //1607418212678
```
- 其餘參數 rest parameter
能表示不確定數量的參數，並將其視為一個陣列。與函式的 arguments 參數陣列不一樣是：
  1. 其餘參數是 arguments 物件被傳入到函式當下還未指定成變數名稱的引數。
  2. arguments 物件不是實際陣列，而其餘參數是實體陣列（可調用 sort, map, forEach, pop)。
  3. arguments 物件自身有額外功能例如 callee 屬性。
```javascript
//其餘參數陣列可被解構(直接將參數陣列讀出來)
function fun1(...[a, b, c]) {
  console.log(a + b + c);
}
fun1(1, 2); // NaN == 1+2+undefined
fun1(1, 2, 3); // 6 == 1+2+3
fun1(1, 2, 3, 4); // 6 ==1+2+3

//其餘參數的存取方式
function fun2(...ary) {
  console.log(ary);
}
fun2(1, 2); // (2) [1, 2]
fun2(1, 2, 3); // (3) [1, 2, 3]
fun2(1, 2, 3, 4); // (4) [1, 2, 3, 4]

//一般參數與其餘參數混和
function fun3(symbol, ...ary) {
  ary.forEach((value) => {
    console.log(`${symbol} ${value}`)
  });
}
fun3("★", 1, 2, 3, 4); // (2) [1, 2]
fun3("-", 4, 5); // (3) [1, 2, 3]

/* console.log
  ★ 1
  ★ 2
  ★ 3
  ★ 4
  - 4
  - 5
*/
```
- 解構賦值 Destructuring assignment
可以把陣列或物件中的資料解開擷取成為獨立變數。
```javascript 陣列解構
let a, b, ary;

//對陣列解構：
[a, b] = [1, 2];
console.log(a, b); //1 2
[a, b, ...ary] = [1, 2, 3, 4, 5];
console.log(a, b, ary); //1 2 (3) [3, 4, 5]

let c = 10, d = 20;
//利用解構發生順序完成資料互換
[c, d] = [d, c];
console.log(c, d);//20 10

let e, f;
//使用解構來來對應回傳陣列會更方便
[e, f] = function () {
  return [1, 2];
}();
console.log(e, f); //1 2

//忽略部分回傳值
[e, , f] = function () {
  return [1, 2, 3];
}();
console.log(e, f); //1 3

//透過rest扮演pop功能
let prt, data = [1, 2, 3, 4];
[prt, ...data] = data;
console.log(prt, data); // 1 (3) [2, 3, 4]
[prt, ...data] = data;
console.log(prt, data); // 2 (2) [3, 4]
```
```javascript 物件解構
let a, b, ary;

//對物件解構：

//避免等號被當作指定式需多加外層()，而變數名稱也需一致
({ dog, cat } = { dog: "lucky", cat: "mimi" });
console.log(dog, cat); //lucky mimi

({ dog, cat, ...ary } = { dog: "lucky", cat: "mimi", mouse: "miki", horse: "ben" });
console.log(dog, cat, ary); //lucky mimi {mouse: "miki", horse: "ben"}


const animal = { dog: "lucky", cat: "mimi" };
//可指派到新變數名稱
const { dog: c, cat: d } = animal;
console.log(c, d); //lucky mimi

//指派到新名稱且提供預設值(當無法對應變數名稱時)
const { mouse: e = "noName", dog: f, cat: g } = animal;
console.log(e, f, g); //noName lucky mimi

//物件解構與函式參數的組合
const guy = {
  name: "Loki",
  msg: {
    age: 18,
    city: "taipei"
  }
}
const who = ({ name }) => name;
const whois = ({ name, msg: { age: newA, city: newB } }) => name + "|" + newA + "|" + newB;
/* same as
const whois = ({ name, msg}) => name + "|" + msg.age + "|" + msg.city;
*/
console.log(who(guy)); //Loki
console.log(whois(guy)); //Loki|18|taipei

// 透過解構物件解決JS變數命名規則上的錯誤識別符號
const css = { "background-color": "red" };
const { "background-color": backgroundColor } = css;
console.log(backgroundColor); //red
```
```javascript 陣列解構與物件解構的混和
  const data = [
    { id: 1, name: "Loki" },
    { id: 2, name: "July" }
  ];
  const [me, { name }] = data;

  console.log(me); //{id: 1, name: "Loki"}
  console.log(name); //july
  ```

- 箭頭函式 
比函式還簡短的語法。它沒有自己的 this、arguments、super、new.target 等語法。適用於非方法的函式但不能被用作 constructor 建構式。
```javascript 基本寫法
/*method 1*/
const demo1 = (a, b, c) => {
  console.log(a, b, c);
}
/* same as
function(a,b,c){
  console.log(a,b,c)
}
*/
demo1("A", "B", "C");

/*method 2 {}的省略*/
const demo2 = (a, b, c) => a + b + c;  //結果 自帶 return 回傳出去
/* same as
function(a,b,c){
  return a+b+c;
}
*/
const demo3 = (a, b, c) => console.log(a + b + c);  //沒要 return 也能用指令只是 return 為 undefined
/* same as
function(a,b,c){
  return console.log(a + b + c);  //undefined
}
*/

const result2 = demo2("A", "B", "C"); // return ABC to result2
const result3 = demo3("D", "E", "F");  // print DEF

console.log(result2, result3); //ABC undefined

/* method 3 () 的省略*/
const demo4 = a => { //只有一個傳遞變數可省略 ()
  console.log("hello!!" + a);
}
/* same as
function(a){
  console.log("hello!!" + a);
}
*/
const demo5 = () => { //沒有傳遞變數需保留 ()
  console.log("hello world!!");
}
```
- 進階應用
```javascript
//簡化 return 應用時，當表示式用 () 包起來時，則{}將被當作 JSON 資料格式
const demo6 = () => ({
  dog: "lucky",
  cat: "mimi"
})
console.log(demo5()); // {dog: "lucky", cat: "mimi"}

//支援預設參數應用
const demo7 = (a=100,b=200) => a+b;
console.log(demo7(200)); // 400

//支援其餘參數應用
const demo8 = (a, ...rest) => {
  let all = a;
  rest.forEach(val => all += val);
  return all;
};
console.log(demo8(100,1,2,3,4,5)); // 115

//支援解構的應用
const num = [1, 2, 3], animal = { dog: "lucky", cat: "mimi" };
const fun = ([a, b] = num, { dog: c, cat: d } = animal) => {
  console.log(a, b, c, d);
};
fun(); //1 2 "lucky" "mimi"

```

## 標準內建物件（函式）

### String

- new String()
```javascript
let a = "AAA";
let b = new String("BBB");
console.log(a, b); ///AAA String {"BBB"}
```
- parseInt(string,format)
  可指定某字串轉換為 10 進位，能指定判別屬於 16 進位或 8 進位（需指定 format 值為何），字串必須是數字開頭且能自動忽略非數字字元。不指定 format 則自動以 10 進未處理（單純字串轉數字）。
- parseFloat(string)
  同上轉換為具有浮點數之數字但沒有 format 判讀功能。
- escape(string)|unescape(string)
  能將非英數字元（中文、空白、標點符號）轉換為 URL 編碼，也能反向轉回。細節上中文採用%uXXXX、空白與符號為%XX(XX 皆為 16 進位）。
- toLowerCase()|toUpperCase()
  能將字串進行大小寫轉換
```javascript
let a = "A",
  b = new String("B");
console.log(a.toLowerCase(), b.toLowerCase()); //a b
```
- charAt()|charCodeAt()
  取得字串當中的字元，索引值 index 最初始處為 0 開始計算
```javascript
let a = "ABCD";
console.log(a.charAt(2)); //C by char
console.log(a.charCodeAt(2)); //67 by char's unicode value  (C=67)
```
- indexOf() | lastIndexOf() | match() | search()
  提供字串的搜尋方法
```javascript
let a = "ABCDEA";
a.indexOf("C"); // 預設 index 0 開始查找，找到回傳 index 值 為 2，找到一個就結束了
a.indexOf("C", 3); // 從 index 3 開始找，因為找不到回傳 -1

a.lastIndexOf("A"); // 同上，反序從最後面往前查找 回傳 5

a.match("A"); //  找到回傳的會是找到的字串  ["A", index: 0, input: "ABCDEA", groups: undefined]
a.match("F"); //，若找不到則是回傳 null

a.search("C"); // to index of ，回傳 2
```
- replace() | split() | substr() | substring() | concat()
  字串的替換分割取出
```javascript
let a = "ABCDEDCBA";
let r1 = a.replace("AB", "F"); // 產生字串替換接著回存到 a
console.log(r1); //FCDEDCBA

let r2 = a.split("D"); //指定之字串當作切割抹去，剩餘的字串會採用陣列回傳
console.log(r2); //(3) ["ABC", "E", "CBA"]

let r3 = a.substr(2, 3); //預設從 index 0 開始連續抽取多少字元，這裡從 index 2 開始抽取
console.log(r3); //CDE

let r4 = a.substring(2, 5); // 從 index 2 抽取範圍至 index 5
console.log(r4); //CDE

let r5 = a.concat("XX"); //將指定新字串加入到原字串後面  等同 a+"XX"
console.log(r5); //ABCDEDCBAXX
```

### Array

- new Array() 宣告
  你可以選擇指定長度（一個參數）或直接寫入（多個參數），也能使用空陣列
```javascript
let a = new Array(100, 200); //[100,200]
let b = new Array(3); //[empty*3]
```
- join() | reverse() | sort() | concat()
  陣列轉字串排序合併
```javascript
let a = new Array("A", "C", "B");

console.log(a.join()); // 將陣列轉成字串並回傳，間格為，符號。如 A,C,B

a.reverse(); //將陣列反轉並變更
console.log(a); //(3) ["B", "C", "A"]

a.sort(); //將陣列排序並變更
console.log(a); //(3) ["A", "B", "C"]

let b = new Array("D", "E");
let c = a.concat(b); //將目前陣列加入所指定陣列向後合併延伸。
console.log(c); // ["A", "B", "C", "D", "E"]
```
- new Array() 方式不能直接建立二維陣列，所以需要回圈執行子層級 new Array()

### Date

- UTC 之時間表示方式，取寫可 get 也能 set，適用各種格式應用。
```javascript
let time = new Date();
console.log(time); //Mon Dec 07 2020 20:29:25 GMT+0800 （台北標準時間）
console.log(time.getHours(), time.getUTCHours()); // 20 12
/*UTC 為國際標準時間，也就是 GTM 格林威治標準時間 */
```
- getTimezoneOffset() | toUTCString() | toLocaleString() | getTime() | Date.now()
  時間轉換方式：UTC 時間差、轉 UTC、轉指定時區時間、時間戳記
```javascript
let time = new Date();
console.log(time); //Mon Dec 07 2020 20:29:25 GMT+0800 （台北標準時間）
console.log(time.getTimezoneOffset()); //與 UTC 時間差 | -480 (min) = > -8H
console.log(time.toUTCString()); //將時間轉為 UTC 標準時間 | 15 Mon, 07 Dec 2020 12:49:21 GMT

const gmt = new Date(Date.UTC(2020, 1, 1, 0, 0, 0, 999)); //建立時間物件，採 UTC 時間 2020/01/01 00:00:00
console.log(`Default in Local(Taiwan): ${gmt.toLocaleString()}`); //Default in Local(Taiwan): 2020/2/1 上午 8:00:00
console.log(
  `en-US: ${gmt.toLocaleString("en-US", { timeZone: "America/New_York" })}`
); //en-US: 1/31/2020, 7:00:00 PM
console.log(
  `ja-JP: ${gmt.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`
); //ja-JP: 2020/2/1 9:00:00

/*
dateObj.toLocaleString([locales [, options]]) 提供兩組參數可設定
locales 會根據當地的時間描述方式呈現
option 能做細部設定，像是可指定時間之文字單位、TimeZone 時區等處理
*/

console.log(time.getTime(), Date.now()); // 為時間戳記與 1970/1/1 之總毫秒差
/*
getTime() 方式為指定時間物件之時間戳記
Date.now() 為靜態函式，指定目前時間之時間戳記
*/
```

### Math

- max(val,val) | min(val,val)
  提供參數比對並回傳最大與最小值

### Error

每當執行時發生錯誤會自動產生的物件，能取得執行時的錯誤訊息，提供錯誤碼 (number)、字串 (massage)、描述 (description)。需呈現例外處理透過`try { } catch (error) { } finally { }`結構呼叫：
```javascript
let x = 10;
try {
  //塞入需測試的代碼
  x = y;
} catch (e) {
  //發生錯誤時，error 物件會傳入至此
  console.log(e); //ReferenceError: y is not defined
  console.log(`${e.name} => ${e.message}`); //ReferenceError => y is not defined
} finally {
  //不管是否有發生錯誤，這裡都會執行
  console.log("test done");
}
```

### RegExp

用來比對符合自訂規則之正規表達式 (regular expressions) 的文字。提供 exec(str) 與 test(str) 之方法使用。不易簡易說明請參考網站 [RegExp - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

### 其他類型

- new Boolean()
  參數若提供 false, 0, null, NaN, 空字串則產生布林物件為 false，否則其他都會是 true。
- new Function()
  普通的函式本身就是一種物件，所以此方式 new 宣告是一樣的結果。
```javascript
function fn1(x, y) {
  return x + y;
}
let fn2 = new Function("x", "y", "return (x+y)");
//fn1 與 fn2 都是一樣的函式建立
```
- Global
  Global 物件本身不能使用 new 來建立，因為這類型物件都是 JS 引擎初始化時自動產生的，包含 Infinity 或 NaN 物件，這些物件本身不帶有名字只是一個屬性狀態。因此他不是提供給使用者來建立，而是提供主體程式使用產生。
- new Number()
  建立一個具有數字型態的物件變數
```javascript
let a = new Number("5");
let b = "5";
console.log(typeof a, typeof b); //object string
console.log(
  `${typeof a.toString()}=>${a.toString()}, ${typeof b.toString()}=>${b.toString()}`
);
//string=>5, string=>5
```
在不是使用建構式的情境中（即不用 new 運算子）, Number 可以被用來轉換型別，譬如輸入 `Number.MAX_VALUE` 取得 JS 可以表現之最大值。
-new Object()
所有 JS 物件的祖宗物件，可以拿來自訂物件或建立內建物件。
```javascript
let obja = new Object();
obja.name = "Loki";
obja.age = "18";
let objb = new Object({ name: "Loki", age: 18 });
delete obja.age, delete objb.age;
console.log(obja, objb); //{name: "Loki"} {name: "Loki"}
```

## BOM 模型

- open() | cloase()
  開啟視窗或關閉目前視窗，開啟視窗的語法為`window.open(strUrl, strWindowName, [strWindowFeatures])` 可其中指定 strWindowFeatures 部分可指定視窗定位、寬高、顯示欄位等參數，採用字串（用`,`分開）方式填寫。
- scroll() | scrollTo() | scrollBy()
  滾動視窗位置，可分為固定或相對偏移，而 scroll() 與 scrollTo() 沒有差別。
```html
<div style="position: fixed;background: #3003;width: 100%;padding: 10px;">
  <button onclick="window.scroll(0,100)">
    scroll y=100，固定移動至指定位置
  </button>
  <button onclick="window.scrollTo(0,100)">
    scrollTo y=100，同 scroll 效果無差別
  </button>
  <button onclick="window.scrollBy(0,100)">
    scrollBy y=100，根據目前位置再相對偏移指定位置
  </button>
</div>
<script>
  for (const key in window.document) {
    //增加畫面內容
    document.write(`${key}:${window.document[key]}<br>`);
  }
</script>
```
- screen.name
  提供螢幕的解析寬高、視界寬高、色彩數
```javascript
console.log(`
解析度寬高=${screen.width}*${screen.height}\n
view 視界寬高=${screen.availWidth}*${screen.availHeight}\n
螢幕色彩度=${screen.colorDepth}
`); //1920*1080,1920*1040,24
```
- navigator
  提供瀏覽器與用戶相關資訊
```javascript
let bs = navigator;
console.log(`
瀏覽器程式碼名稱：${bs.appCodeName}\n
瀏覽器名稱：${bs.appName}\n
作業系統與瀏覽器版本：${bs.appVersion}\n
瀏覽器語系：${bs.language}\n
支援 Cookie:${bs.cookieEnabled}\n
是否處於網路連線中：${bs.onLine}\n
作業系統平台：${bs.platform}\n
HTTP 協定下的 user agent 資料：${bs.userAgent}\n
`);
/*勞動北分署約聘
瀏覽器程式碼名稱：Mozilla
瀏覽器名稱：Netscape
作業系統與瀏覽器版本：5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36
瀏覽器語系：zh-TW
支援 Cookie:true
是否處於網路連線中：true
作業系統平台：Win32
HTTP 協定下的 user agent 資料：Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36
*/
```
- history.back() | forward() | go(num)
  歷史紀錄，可指定紀錄往上一頁、下一頁、或指定 num 數（<0 為上幾頁，>0 為下幾頁，0 為重整）。history.length 能查出全部記錄總數。
- location
  目前 URL 之詳細資料，你可以讀也可以直接改變內容（形成轉址）。
```javascript
// location.href = "https://www.google.com"; //修改 URL 為 Google 網址，而不是轉走網頁所以沒有歷史紀錄可回上頁
let loc = location;
console.log(`
主機網域名稱或 IP: ${loc.hostname}\n
URL 網址：${loc.href}\n
hostname 與通訊埠：${loc.host}\n
網址錨點 id 值：${loc.hash}\n
通訊埠：${loc.port}\n
網頁檔名：${loc.pathname}\n
get 變數，例？p=3&v=5: ${loc.search}\n
通訊協定，例 http: ${loc.protocol}\n
`);
```
- location.reload() | replace(url)
  重新載入目前網頁或轉址至指定 URL（同等 href 修改，不保留歷史紀錄）

- document.open() | close() | write(str)
  這是一種對當前文件重新編譯的操作，open 開啟文件重新改寫內容，close 結束並關閉文件改寫。如果已關閉文件時進行 write 行為等於重新改寫內容，反之未關閉的情況下可以接著 write()
```javascript
document.open();
document.write("<p>Hello world!</p>");
document.write("<p>I am a fish</p>");
document.close();
```

## DOM 模型

- 獲取節點後，其屬性值有許多方法可找出，舉部分例子如下：
```html
<a href="https://www.google.com" id="link" class="menu" title="goto">Google</a>
<script>
  let aa = document.getElementById("link");
  console.log(aa.nodeName); //A
  console.log(aa.href); //https://www.google.com/
  console.log(aa.tagName); //A
  console.log(aa.textContent); //Google
  console.log(aa.className); //menu
  console.log(aa.title); //goto
</script>
```
- 使用 getElement`s`系列獲得的多項目節點時，可透過 item(index) 或當作陣列使用、[index\] 方式找到。
```html
<p class="list">lorem1</p>
<p class="list">lorem2</p>
<p class="list">lorem3</p>
<script>
  let aa = document.getElementsByClassName("list");
  console.log(aa.item(2).textContent, aa[2].textContent); //lorem3 lorem4
</script>
```
- querySelector() | querySelectorAll()
  使用 CSS 選擇器概念進行探找，與 getElement(s) 方式不同，這裡回傳的是 NodeList 物件（節點集合體，含元素）而不是 HTMLCollection 物件（元素集合體）。雖然 DOM 存取方式都一樣是動態行為，但 NodeList 的集合體更龐大。querySelector() 只會回傳一筆首次符合之對象，querySelectorAll() 則是全部回傳。jQuery 的 `$()` 便是採用 querySelectorAll 來設計。
```html
<div class="all">
  <p class="list">lorem1</p>
  <p class="list">lorem2</p>
  <p class="list">lorem3</p>
</div>
<script>
  let aa = document.getElementsByClassName("list"); //HTMLCollection(3) [p.list, p.list, p.list]
  let bb = document.querySelectorAll(".list"); //NodeList(3) [p.list, p.list, p.list]
  console.log(aa[0].innerHTML, bb[0].innerHTML);
</script>
```
- 節點物件之 innerHTML | outerHTML
  前者僅取得該對象之子內容 HTML，後者取得包含自己父層之完整 HTML。
```html
<div class="all">
  <p class="list">lorem1</p>
  <p class="list">lorem2</p>
  <p class="list">lorem3</p>
</div>
<script>
  let aa = document.getElementsByClassName("all")[0];
  console.log(aa.innerHTML, aa.outerHTML);
</script>
```
- 節點物件之 offsetLeft | offsetTop | offsetWidth | offsetHeight | offParent
  獲得節點的參考定位 XY 與空間寬高，也能查參考定位之上層節點為誰（這跟 position 空間有關，沒有特別指定情況下參考定位之上層節點通常是 body)
- 節點物件之 scrollIntoView(option)
  能類似 HTML 錨點連結效果，滾動畫面至該節點位置。可指定簡易參數 true（預設） 為節點之 top、false 為節點之 bottom，或細部參數 (behavior, block, inline) 採用物件寫法。
```javascript
for (const key in window.document) {
  //增加畫面內容高度
  document.write(`${key}:${window.document[key]}<br>`);
}
document.write(`<p>demo in last line</p>`);

setTimeout(() => {
  document
    .querySelector("p")
    .scrollIntoView({ block: "end", behavior: "smooth" });
  // 3 秒後移動至節點底部且過場為 smooth 模式
}, 3000);
```
- 節點的遍歷至其他元素
  能透過目前節點去走訪附近或對應關係之其他元素。如同字面說明之取得處：
```html
<section class="lv1">
  <h5 class="lv2">level 2</h5>
  <ul class="lv2">
    <li class="lv3">level 3-1</li>
    <li class="lv3">level 3-2</li>
    <li class="lv3">level 3-3</li>
  </ul>
</section>
<script>
  document.querySelector("ul.lv2").firstElementChild.textContent; //"level 3-1"
  document.querySelector("ul.lv2").lastElementChild.textContent; // "level 3-3"
  document.querySelector("ul.lv2").parentNode; //<section class="lv1">...</section>
  document.querySelector("h5.lv2").nextElementSibling; //<ul class="lv2">...</ul>
  document.querySelector("ul.lv2").previousElementSibling; //<h5 class="lv2">level 2</h5>
  document.querySelector("ul.lv2").previousElementSibling.nodeName; //h5
  document.querySelector("ul.lv2").previousElementSibling.nodeType; //1   (1: 標籤；2: 屬性；3: 文字）
  document.querySelector("ul.lv2").childElementCount; //3
</script>
```
- 節點的遍歷至其他節點
  語法與選項與前面差不多，但這裡連文字（包含空白或斷行等符號）都會包含在內，不是單純元素為對象。這種方法較沒有商用效果。這裡只舉例 firstChild：
```html
<p id="p1">A<span>First span</span>B</p>
<p id="p2">A<span>First span</span>B</p>
<script type="text/javascript">
  document.getElementById("p1").firstChild; //  "↵"A
  document.getElementById("p2").firstChild; //  A
</script>
```
- children vs childNodes
  跟前面觀念一樣，前者是回傳子元素之集合陣列；後者是連同文字符號都當兒子輸出之集合陣列。
- document.anchors | .forms | .images | .links
  提供一些常用元素的集合物件，返回的是集合陣列。如果這些元素持有 name 元素能更快獲得該元素節點。
```html
<a href="https://www.google.com" name="a1">Google</a>
<a href="https://tw.yahoo.com">Yahoo Link</a>

<form name="form1">
  <input type="text" />
</form>
<form>
  <input type="text" />
</form>

<img src="https://fakeimg.pl/100x100" name="img1" />
<img src="https://fakeimg.pl/200x200" />

<script>
  document.anchors; //HTMLCollection [a, a1: a]  //必需是要 a[name] 元素，額外添加物件可指向
  document.anchors[0]; //<a href=​"http:​/​/​www.google.com" name=​"isA">​Google Link​</a>​
  document.anchors.a1; //<a href=​"http:​/​/​www.google.com" name=​"isA">​Google Link​</a>​

  document.forms; //HTMLCollection(2) [form, form, f1: form]  //任何 form 元素之集合，有 name 會額外添加物件可指向
  document.images; //HTMLCollection(2) [img, img, img1: img]  //任何 image 元素之集合，有 name 會額外添加物件可指向
  document.links; //HTMLCollection(2) [a, a, a1: a]  //任何 a[href] 元素之集合，有 name 會額外添加物件可指向
</script>
```
- 節點之讀寫屬性方式
  你可以檢查該節點之建構子會提供一些元素屬性可以讀寫，或者用原生函式來讀寫。
```html
<a>Google</a>
<script>
  document.querySelector("a").href = "https://www.google.com"; // 直接暴力指定屬性為何
  document.querySelector("a").href; //直接讀取該值

  document.querySelector("a").getAttribute("href"); //同上，取得屬性值
  document.querySelector("a").setAttribute("title", "Google"); // 同樣，修改屬性值
  document.querySelector("a").removeAttribute("title"); //移除指定屬性
</script>
```
- 節點之 Dataset 自訂屬性存取
  如果是自訂屬性可以透過 dataset 找到
```html
<div data-time="tw" class="demo">10:00</div>
<script>
  document.querySelector("div").dataset; //DOMStringMap {time: "tw"}
  document.querySelector("div").dataset.time; //tw

  document.querySelector("div").attributes; //NamedNodeMap {0: data-time, 1: class, data-time: data-time, class: class, length: 2}
  //雖然可以查到但由於符號"-"無法使用，建議使用 dataset 來取得，或用陣列觀念來寫。
  document.querySelector("div").attributes["data-time"].nodeValue; //tw
</script>
```

## Event 事件

- 事件可以分為三種處理方式：
  - HTML 屬性：透過 HTML 標籤屬性來指定 JS 觸發指令
  - JS 屬性：指定某元素之物件屬性來指定觸發
  - 監聽事件：指定原生練 EventLister() 來註冊事件觸發，可另外透過 removeEventListener() 來解除（不適合使用匿名函式的 add 方式）。
- 而事件發生當下，會產生一個 event 物件提供事件相關的調度處理。
```html
<button onclick="console.log(event)">click</button>
<button class="demo1">click</button>
<button class="demo2">click</button>
<script>
  document.querySelector(".demo1").onclick = () => {
    console.log(event);
  };
  document.querySelector(".demo2").addEventListener("click", (ev) => {
    console.log(ev);
  });
</script>
```
- 事件處理流程 Capturing vs Bubbling
  HTML 的元素採取層級觀念設計，因此如果這些層級各自有自己的事件會發生疊合效果。疊合時需考量誰先觸發事件（也就是什麼時候觸發）。網頁執行一個 click 時會有兩個階段，第一階段試著從外層往內進行連鎖之捕獲事件（滑鼠的按下對應到哪個 DOM)，再來是第二階段冒泡事件由內層往外層去回應事件要處理了。對於解讀順序來說一定事先捕獲再冒泡，如果你是利用 addEventListener 來完成事件那可以要求這個事件在捕獲還是冒泡階段做執行，反之如果是其他方式下 event，大多數的瀏覽器預設是採用冒泡流程。
  addEventLister() 的第三個參數（預設 false 代表選擇冒泡）就是拿來提供時機選項。
```html
<div>
  <p>
    <button>click</button>
  </p>
</div>
<script>
  document.querySelector("div").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：div");
    },
    true
  );
  document.querySelector("div").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：div");
    },
    false
  );
  document.querySelector("p").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：p");
    },
    true
  );
  document.querySelector("p").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：p");
    },
    false
  );
  document.querySelector("button").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：button");
    },
    true
  );
  document.querySelector("button").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：button");
    },
    false
  );

  document.querySelector("button").click();
  /*
  捕獲 capturing：div
  捕獲 capturing：p
  捕獲 capturing：button
  冒泡 bubbling：button
  冒泡 bubbling：p
  冒泡 bubbling：div
  */
</script>
```
試著顛倒 false 與 true 宣告順序，外層都沒變化，但最裡層的時候沒有分所謂的捕獲跟冒泡，因為已經不需要再往下尋找，因此這兩個沒有差別，只差在誰先宣告先跑。
```html
<div>
  <p>
    <button>click</button>
  </p>
</div>
<script>
  document.querySelector("div").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：div");
    },
    false
  );
  document.querySelector("div").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：div");
    },
    true
  );
  document.querySelector("p").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：p");
    },
    false
  );
  document.querySelector("p").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：p");
    },
    true
  );
  document.querySelector("button").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：button");
    },
    false
  );
  document.querySelector("button").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：button");
    },
    true
  );

  document.querySelector("button").click();
  /*
  捕獲 capturing：div
  捕獲 capturing：p
  冒泡 bubbling：button
  捕獲 capturing：button
  冒泡 bubbling：p
  冒泡 bubbling：div
  */
</script>
```
- 切斷事件流程之連鎖 event.stopPropagation()
  同上話題，如果你希望斷開這個流程的傳遞，可以透過當下 event 物件的`stopPropagation()`來阻止下一步的流程（捕獲或冒泡階段皆可阻止）。
```html
<div>
  <p>
    <button>click</button>
  </p>
</div>
<script>
  document.querySelector("div").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：div");
    },
    true
  );
  document.querySelector("div").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：div");
    },
    false
  );
  document.querySelector("p").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：p");
      event.stopPropagation();
    },
    true
  );
  document.querySelector("p").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：p");
    },
    false
  );
  document.querySelector("button").addEventListener(
    "click",
    () => {
      console.log("捕獲 capturing：button");
    },
    true
  );
  document.querySelector("button").addEventListener(
    "click",
    () => {
      console.log("冒泡 bubbling：button");
    },
    false
  );

  document.querySelector("button").click();
  /*
  捕獲 capturing：div
  捕獲 capturing：p
  */
</script>
```
- 取消事件的預設行為 event.preventDefault()
  部分的元素進行互動時會有一些預設的事件處理，你可以取消這些原先的預設事件，但不影響目前的自訂事件觸發。
```html
<input type="checkbox">
<script>
  document.querySelector("input").addEventListener("click", () => {
    event.preventDefault();
    console.log("因為 click 所以我出現了");
  });
  /*
  checkbox 的預設打勾反應被取消
  如果對象為 a:link 的預設開啟網頁也會被取消
   */
```
- 全網頁的 event 控制
  如果某個事件是建立在整個網頁，你可以直接使用 `document.onclick=console.log(event)` 來指定。舉個例子來說你可以鎖定整個網頁的右鍵選單：
```html
<button>close blocking-menu</button>
<script>
  document.oncontextmenu = (e) => {
    e.preventDefault();
  }; //鎖定
  document.querySelector("button").onclick = () => {
    document.oncontextmenu = null;
  }; //取消鎖定
</script>
```
- onload 事件
  如果你曾寫過 `window.onload=()=>{}` 來保護 DOM 生成時間，這也是一種標準的事件處理，透過當文件完全載入時觸發事件執行。
- event 物件的常用屬性
  如果你試著將 event 透過 console.log 拿出來看，會發現很多內容可以使用，譬如 altKey|ctrlKey|shiftKey 能判斷是否有按下此輔助鍵、按下的位置在螢幕 screenX|screenY 處、按下的位置在用戶視窗 clientX|clientY 處。.. 等等。

## 表單技巧
- from[name] 表單獲取
具備 name 的 form 元素集合額外提供直接獲取，只要持有 name 就能快速找到。此外也提供 forms 與 elements 物件陣列來取得。
```html
<form name="myform">
  <input type="text" name="myinput" value="aaa">
</form>
<script>
  document.myform.myinput.value; //aaa
  document.forms["myform"].elements["myinput"].value;//aaa
</script>
```
- 指定欄位長度透過屬性 maxLength 完成
```html
<form name="myform">
  <input type="text" name="myinput" value="aaa">
</form>
<script>
  document.myform.myinput.maxLength=5; //最多輸入長度為 5
</script>
```
- Option 物件 的 add | remove
提供 Select 元素對 Option 物件的添加刪除技巧
```html
<form name="myform">
  <select name="myselect">
  </select>
</form>
<script>
  let objS = document.myform.myselect; //找到 select 元素

  for (let i = 0; i < 5; i++) {
    let objO = new Option("text" + i, "val" + i);  //需透過 new 建立 Option 物件，指定文字與值
    objS.add(objO, objS.options.length); //透過原生函式塞入 Option 物件並指定索引位置
  }
  objS.remove(2); //移除指定索引位置之 Option
  objS.onchange = () => { console.log(objS.selectedIndex) }; //檢查索引變化已重新排序整理
</script>
```
- 表單驗證
主要是控制 form 元素的 submit 事件阻止或送出，這裡舉出三種方法達到，包含之前介紹過的 event.preventDefault()
```html
<!-- 不使用普通按鈕，觸發檢查內容而決定表單提交行為 -->
<form name="method1">
  <input type="text" name="yourname">
  <button type="button">send1</button>
</form>
<script>
  document.method1.elements[1].onclick = (evt) => {
    if (evt.target.previousElementSibling.value !== "") document.method1.submit();
    else alert("不可空");
  };
</script>
<!-- 表單 submit 當下檢查，若回傳布林決定是否進行提交 -->
<form name="method2">
  <input type="text" name="yourname">
  <button type="submit">send2</button>
</form>
<script>
  document.method2.onsubmit = (evt) => {
    if (evt.target.firstElementChild.value != "") return true;
    alert("不可空");
    return false;
  };
</script>
<!-- 表單 submit 當下檢查，若不想提交取消事件預設行為 -->
<form name="method3">
  <input type="text" name="yourname">
  <button type="submit">send3</button>
</form>
<script>
  document.method3.onsubmit = (evt) => {
    if (evt.target.firstElementChild.value=="") {
      alert("不可空");
      evt.preventDefault();
    }
  };
</script>
```
## 儲存方式
除了 cookie 寫法，HTML5 多了用戶端的 localStorage 與 sessionStorage 方法來寫讀資料。操作方式寫法兩者都一樣。
- localStorage: 時效長，除非 JS 代碼要求或用戶清空快取才會消失。
- sessionStorage: 關閉網頁視窗時才會消失。
```html
<input type="text">
<button class="save">Save</button>
<button class="clear">Clear</button>
<script>
  document.querySelector(".save").onclick = () => {
    localStorage.setItem("userName", document.querySelector("input").value);
    sessionStorage.setItem("userName", document.querySelector("input").value);

    alert("done,refresh page nowing. plz check console.log.");
    location.reload();
  }

  console.log(localStorage.userName, sessionStorage.userName);

  document.querySelector(".clear").onclick=()=>{
    localStorage.removeItem("userName");
    sessionStorage.removeItem("userName");
    location.reload();
  }
</script>
```
## 控制技巧

- 邏輯運算子
  AND 特性，其 true&&20 結果為 20，你可以這樣取代 if 控制。
```javascript
let a = 1,
  b = 1;
c = a == b && 20; //if(a==b) c=20;
```
OR 特性部分，當讀取到 true 時會自動忽略||之後的運算，結果為本體變數。
```javascript
let c = a || 10; // c=(a==true)?a:10;
//true: a!=0,a!=null
//false: a=0,a=null
```
- DOM
  如果你很常使用 DOM 單項目節點探找，可以試著簡化操作
```javascript
const get(who)=document.querySelector(who);
const demo1=get("#id");
const demo2=get(".class");
const demo3=get("#id>span");
```

## 小品練習

- 猜數字
```javascript
const rand = Math.floor(Math.random() * 99) + 1;
let ans = 0,
  times = 0,
  min = 1,
  max = 99;
do {
  ans = prompt(`請猜數字介於${min}~${max}之間`, ans);
  if (ans == null) break;
  if (ans <= min || ans >= max) {
    alert("我覺得你有閱讀障礙。.. 請重新輸入！");
    continue;
  }
  if (ans > rand) max = ans;
  else if (ans < rand) min = ans;
  times++;
} while (ans != rand);
alert(
  `${
    ans == null ? "不猜了？" : "答對囉！"
  }\n 答案是 ${rand} ，你一共猜了 ${times} 次`
);
```
- 字數限制
```html
<p>你還可以輸入<span>20</span>個字</p>
<textarea cols="30" rows="10"></textarea>
<script>
  let maxlong = document.querySelector("span").innerHTML;
  window.onload = () => {
    document.querySelector("textarea").addEventListener("keydown", (eIn) => {
      /****按下時先檢查可不可輸入*****/
      let nowlong = eIn.target.value.length; //target 為目標，也就是觸發 event 的對象。我們取得 textareat 的值之長度，也就是文字串長度
      if (nowlong < maxlong) {
        eIn.target.onkeyup = (eOut) => {
          /******彈起時才計算畫面該顯示剩多少字*****/
          nowlong = eOut.target.value.length;
          document.querySelector("span").innerHTML = maxlong - nowlong;
        };
      } else eIn.preventDefault(); //取消打字的行為
    });
  };
</script>
```
- 音樂控制器
audio 控制除了利用 HTML 的 controls 屬性顯示面板，你也可以透過 JS 來執行動作。
```html
  <audio src="test.mp3" controls></audio>
  <hr>
  <button class="play">play</button>
  <button class="pause">pause</button>
  <button class="muted">muted</button>
  <input class="volume" type="range" min="0" max="1" step="0.1">
  <div class="time"></div>
  <a href="text.mp3"> download</a>
  <script>
    let ado = document.querySelector("audio");

    document.querySelector(".play").onclick = () => {
      ado.play();
    }
    document.querySelector(".pause").onclick = () => {
      ado.pause();
    }
    document.querySelector(".muted").onclick = () => {
      ado.volume = (ado.volume) ? 0 : 1;
    }
    document.querySelector(".volume").onchange = (e) => {
      ado.volume = e.target.value;
    }
    ado.ontimeupdate = () => { //audio 之時間變化時觸發
      const nowtime = `${parseInt(ado.currentTime / 60 % 60)}:${parseInt(ado.currentTime % 60)}`; //目前位置秒數 轉 分秒
      const endtime = `${parseInt(ado.duration / 60 % 60)}:${parseInt(ado.duration % 60)}`; //完整秒數 轉 分秒
      document.querySelector(".time").textContent = `${nowtime}/${endtime}`;
    }
  </script>
  ```
- 影片控制器
```html
<video src="test.mp4" controls poster="https://fakeimg.pl/400x300" width="400" height="300" preload="auto"></video>
<hr>
<div class="msg"></div>
<button class="run">play/pause</button>
<button class="stop">stop</button>
<button class="muted">muted</button>
<input class="volume" type="range" min="0" max="1" step="0.1">
<div class="state">停止</div>
<div class="time"></div>
<script>
  let vdo = document.querySelector("video");

  document.querySelector(".run").onclick = () => {
    if (vdo.paused) {  //是否為 pause 狀態，成立為 true 反之 false
      vdo.play();
      document.querySelector(".state").innerHTML = "播放"
    }
    else {
      vdo.pause();
      document.querySelector(".state").innerHTML = "暫停"
    }
  }
  
  window.onload=()=>{ //影片原始尺寸，需等影片載入完成才能獲取到
    document.querySelector(".msg").innerHTML=`Source: ${vdo.videoWidth}X${vdo.videoHeight}`;
  }

  document.querySelector(".stop").onclick = () => {
    vdo.currentTime = vdo.duration;
    document.querySelector(".state").innerHTML = "停止"
  }
  document.querySelector(".muted").onclick = () => {
    vdo.volume = (vdo.volume) ? 0 : 1;
  }
  document.querySelector(".volume").onchange = (e) => {
    vdo.volume = e.target.value;
  }

  vdo.ontimeupdate = () => { //video 之時間變化時觸發
    const nowtime = `${parseInt(vdo.currentTime / 60 % 60)}:${parseInt(vdo.currentTime % 60)}`; //目前位置秒數 轉 分秒
    const endtime = `${parseInt(vdo.duration / 60 % 60)}:${parseInt(vdo.duration % 60)}`; //完整秒數 轉 分秒
    document.querySelector(".time").textContent = `${nowtime}/${endtime}`;
  }
</script>
```