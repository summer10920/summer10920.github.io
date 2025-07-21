---
title: "[基礎課程] JavaScript 教學（一）：基礎觀念"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-13 17:27:33
hidden: true
---
![](assets/images/D8v3RVP.png)
在網頁設計領域中，我們能將一個由 HTML/CSS 所編譯出的靜態網頁透過伺服器請求一次性的傳送到用戶端之瀏覽器，換言之連線已經結束伺服器不會再提供任何資料給用戶。

<!-- more -->

而使用 JavaScript 能透過腳本編譯過後的規則，幫助我們在用戶端重新對這個靜態網頁進行再造可能。簡單來說就像透過印表機已印出且定案的 A4 文件，事後 JavaScript 能像魔法之念能力（輕薄的假象？!）根據指定動作重新對 A4 文件再做任何變化，能塗抹修改甚至刪除部分資料。我們也能俗稱 JS 為前端的網頁動態程式語言腳本。

本系列章節會從零開始對 JavaScript（簡稱 JS) 進行介紹，並利用簡單易懂的形容方式加深程式印象。另外不會特別著重在<mark>程式邏輯</mark>上的訓練或複雜性的程式開發技術，重點放置於前端人員如何透過 JS 去進行<mark>畫面控制</mark>。如果你希望成為一個全端人員或者能將 JS 的開發能力提升，建議還是要多參考一些書籍或學習管道補強撰寫程式上的開發技巧。

{% note success %}
**跟著做：**
正式撰寫 JS 文件之前，請使用 Chrome 開啟任何空白網頁，透過 F12 進行開發人員工具，並使用 Console 分頁進行練習 JS 程式執行做初步認識，這能省去透過編寫 HTML+JS 編寫再由 Browser 執行的過程。
{% endnote %}

# 基礎概念
如同其他的程式語言學習，JS 領域內也是透過程式完成相關的邏輯判斷輸出，所有最基本的概念為變數進行資料暫存，你可以指定任何名稱作為變數，必須要英文字母開頭且大小寫區分（部分特定意義單字不可使用），可混數字使用但不可數字開頭。

## 輸出與註解
除非你透過檢查工具或輸出來進行人為過程的輸出審核，否則程式過程的任何數據原則上看不到。這裡所提供的輸出只單純拿來提供開發人員檢查使用，這不是標準的網頁處理作業：

```javascript
a=100;  //a 是一個變數，同時它代表個數字為 100
a;  //Chrome Console 開發工具特殊檢查方式，能查詢該變數
console.log(a); // 將 a 這個變數內容輸出到 Console 紀錄。
alert(a); // 透過內建函式 alert() 將變數內容印出到提示視窗。
typeof(a); //透過內建函式 typeof() 對變數檢查為何種型態。亦可輸入 typeof a
```

JS 的註解方式透過 `//...` 進行整行註解，或透過`/* ... */`為局部註解，你應該習慣添加註解添加程式說明。程式有註解語法可以讓程式忽略執行。常用於交叉測試（隱藏內容）或是說明提示。要注意在哪個程式內則用對應的註解語法。

程式最基本的單位是變數。變數名稱有大小寫之分。變數名稱可以是英文字母、數字、底線和十六進位所組成，但是第一個字元不能是以數字開頭。當你命名好一個變數名稱之後，你就可以對該變數塞入任何資料，或重複使用這個變數。
## 基本運算子
變數能透過運算進行數學式處理，也包含了指定某個數據為該變數之等號。變數可以是一個數字、文字串、布林值、函式物件等各種暫存的數據內容。

### 文字串與數值
你能指定一個數字或文字給一個變數，或者對變數進行數學計算或文字串連接。

- 指定 `=`：
將右側結果數據指定給左側變數 | ex `a=b+1`, `c='hello world'`;

- 算數 `+` `-` `*` `/`：
進行加減乘除 | ex `5*5`, `b=5*5`;

- 複合指定 `+=` `-=` `*=` `/=`：
自我累加算數 | ex `a+=10` 等價為 `a=a+10`

- 遞增遞減 `++` `--`
數據變化遞增+1 遞減-1 | ex `a++`, `b--`

- 字串 `'text'` `"word"`
指定為文字串數據，可應用於文字串接。
```javascript
text='hello';
word="world";

//用+來串接
console.log(text+" "+word+"!!");

//ES6 新寫法，在字串裡面抽換變數
console.log(`${text} ${word}!!`);
```
試著以下文字串練習
```javascript
title = "冷笑話";   //將文字存到變數去，用""標記起來，讓程式知道這是文字不是指令
title += ":";   // 等同於 title = title + "："

who = "小明";
where = "超商";
why = "為什麼";
when = "繳費";
how = "坐著輪椅";

//請試著善用變數組合出 console.log 顯示這句話 => 冷笑話：為什麼小明去超商繳費後，小明出來卻要坐著輪椅？
console.log(`${title}${why}${who}去${where}${when}後，${who}出來卻要${how}?`);
```

### 布林值
有種型態能讓程式知道什麼是真話與假話，透過布林邏輯得到的結果 TRUE 或 FALSE，我們稱呼為布林值。這是很重要的一環，之後的邏輯判斷都會依賴布林值

- 相等
```
a==b //等於
a!=b //不等於
a===b //完全等於
a!==b //完全不等於
```
等於 vs 完全等於
```javascript
a='100';
b=100;
console.log(a==b,a===b);
```
- 比較
```
a>b //大於
a>=b //大於且等於
a<b //小於
a<=b //小於等於
```

- 複合邏輯 `&&` `||`
AND 與 OR 之邏輯，結果為布林值
```
（條件 A)&&（條件 B)：為 AND 所有條件，所有條件皆為 true 時成立。
（條件 A)||（條件 B)：為 OR 任一條件，任一條件為 true 時成立。
```

---
## 自訂函式
函式又能稱為函數，你可以將局部的程式碼包裝成一個函式並取名。之後透過指定名稱之函式執行運作該段程式碼。函式的方式與結構非常多，需循序式的親自接觸理解。

{% note success %}
**跟著做：可以試著將 JS 寫到網頁上並使用 script 標籤包覆，並透過 Chrome Console 來接續執行腳本指令。**
```html TryJS.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>...
  </script>
</body>
</html>
```
{% endnote %}

### 基本函式
  ```javascript TryJS.html
  function sayHi(name) {
    console.log(`Hi, I am ${name}`);
  }
  ```
  ```javascript Chrome Console
  sayHi("loki");
  //執行函式方法，輸入函式名稱加上 () 執行，可從外部傳遞變數給函式使用。
  ```
  > 函式可從外部取得變數進來，然而變數可能名字於內外不一致，主要是函式會採領域內的名稱去當函式內的專用變數。

### 函式型的變數
函式可以指定給變數，事後透過變數來使用該函式

```javascript TryJS.html
// word 是函數型的變數
var word = function() {
  console.log('hi');
}
function say(aaa) {
  aaa();
}
```
```javascript Chrome Console
word();
say(word); 
//say 是函式，word 是變數，aaa 是 say 函式內的變數
```

函式型變數的回傳

```javascript TryJS.html
//兩個函數型變數
var say1 = function show(name){
  return "hi,"+name;
}
console.log(say1("loki"));

var say2 = function(name){
  return "hi,"+name;
}
console.log(say2("max"));
```

> say1 跟 say2 都是函式型態的變數，而內容的 function 是否有名字看起來是沒有差的。

宣告後直接執行函式？加上 ()

  ```javascript TryJS.html
  var say = function(){
    console.log('hi');
  }();
  // 等號右側不是一個函式，而是某函式的執行指令。整個指定行為上，左側 say 變數的型態不是變數。
  typeof(say); //say 為尚未定義的已存在變數
  ```
  ```javascript TryJS.html
  var say = function(){
    console.log('hi');
    return "yee";
  }();
  // 等號右側執行後會回傳 yee，所以右側等於結果出現了文字，能指定給左側變數
  typeof(say); //say 為文字串 yee 的已存在變數
  ```

### 匿名函式
```javascript TryJS.html
//匿名函式+直接執行，該函式本身沒有名字
(function(){
  console.log('hi');
})();
```

>()() 兩個小括號，前者代表函式內容，後者代表執行。

### 函式的模組化
函式裡面宣告兩個小函式，透過物件的寫法回傳給外部。
```javascript TryJS.html
function Module() {
  function dogsay() {
    console.log('汪');
  }
  function catsay() {
    console.log('喵');
  }
  return {
    dog: dogsay,
    cat: catsay
  };
}
```
如果要使用函式內的小函式，可透過物件方式去找到該小函式。
```javascript Chrome Console
Module().dog();

var ask = Module();
ask.dog(); // 汪
ask.cat(); // 喵
```

### 函式內的 this
當你看到 this，通常是指向本函式之前，原本該物件的範圍。
```javascript TryJS.html
function room() {
  // console.log('hi');
  console.log(this.word); //印出這個世界下，this 物件內的變數 word 內容為何
}
var word = 'A';
var obj = {
  word: 'B',
  first: room,
  second:{
    word:'C',
    goto:room
  }
}
```
```javascript Chrome Console
console.log(word); //A
console.log(this); //windows object
console.log(this.word); //windows object's var word

room()//A
obj.first() //B
obj.second.goto() //C
```
>函式本身處於獨立的空間世界，在這個世界內的變數只對這個函式而活。

### 函式內的載入預設值 (ES6)
```javascript
function num(a=100){
  console.log(a);
}
num();//100
num(200);//200
```
## 變數
前面都是很草率的創造一個變數（事實上你不應該這樣做），在 JS 的世界中變數需要好好的思考用何種類型進行創造而宣告出來，而類型一被宣告之後，就無法再另改成另一個類型。在 JavaScript 中，我們可以使用三種關鍵字來聲明變數：var、let 和 const。以及變數的宣告位置可以分為「區域變數」和「全域變數」，這兩個是用來描述變數的作用域範圍的術語。

「區域變數」（Local Variables）是指在特定範圍或區域內聲明的變數。這個範圍可以是函式、迴圈、條件陳述式或任何區塊。區域變數只在其聲明的區域內有效，無法在該區域外部訪問。這意味著其他函式或全域範圍無法直接存取或修改區域變數。區域變數的作用域通常是在其聲明的區塊內，一旦離開該區塊，變數就會被銷毀。

「全域變數」（Global Variables）是指在整個程式碼中聲明的變數，並且可以在程式的任何地方訪問。全域變數不受特定區域或函式的限制，因此在程式的任何地方都可以使用和修改它們。全域變數的作用域延伸到整個程式，因此其他函式或區塊都可以存取和修改全域變數。

區域變數和全域變數的主要區別在於其作用域範圍的大小和可見性。區域變數僅在其聲明的區域內有效，提供了更小的作用域範圍和更好的封裝性。這有助於避免命名衝突和混淆。全域變數則具有全局範圍，可以在整個程式中訪問，但它們可能會導致命名衝突和程式結構上的問題。

在程式設計中，儘量避免過度使用全域變數，因為它們可能會導致不易維護的程式碼和意外的副作用。相反，應該優先使用區域變數，並將變數的作用範圍限制在需要的最小範圍內，以提高程式碼的可讀性和可靠性。

### var
是 ES5 中引入的變數聲明關鍵字，它具有函式作用域（不具備區塊作用域）或全域作用域。這意味著使用 var 變數在整個函式內或全域範圍內都是可見的。此外，var 變數可以被重複聲明，並且存在變數提升的特性。相反的變數可以被影響複寫的缺點。

```javascript
var a=3; //宣告於全域作用域
function test(){
    var b=4; //宣告於函式作用域
    console.log(a,b);
}
test(); //3,4
console.log(a,b); //3,undefind
```

注意是 var 不代表具備區塊作用域特性。

```js
var a=3; //宣告於全域作用域
if(true){
    var b=4; //宣告於 if 區塊作用域，仍為全域作用上
    console.log(a,b);  // 3,4
}

console.log(a,b); //3,4
```

### let
是 ES6 中引入的新關鍵字，它具有塊級作用域（包含了全域作用域）觀念。塊級作用域是由花括號 {} 所定義的區域，例如條件語句、循環語句或函式內部。let 聲明的變數只在塊級作用域內有效，並且不會被變數提升。此外，let 不允許重複聲明相同的變數名稱於同一個作用域。而在不同的區塊作用域底下都是獨立的不同記憶體位置可共存。

```javascript
let c=3; //全域下的變數
if(true){
  let c=4; //區域下的變數
  console.log(c); //4
}
console.log(c); //3
```

也無法讀取來自別的作用域，以保護該作用域的變數不被影響。

```js
let a=3; //宣告於全域作用域
if(true){
    var b=4; //宣告於 if 區塊作用域，仍為全域作用上
    console.log(a,b);  // 3,4
}

console.log(a,b); //ReferenceError: b is not defined
```

在下例子當中，能理解 for 迴圈每次不斷的更改 i 值，然而 var 可以重複修改，因此五次的 console 於最後一起執行讀的是同一記憶體；然而每次的 let i 都能獨立記憶體位置，因此最後一起執行讀的是五處不同記憶體。
```js
for(let i=1;i<=5;i++) { //let 改成 var 看看
  setTimeout(function(){
    console.log(i)
  },1000);
}
```

### const
也是 ES6 中引入的新關鍵字，它也具有塊級作用域。const 聲明的變數類似於 let，但它`要求變數被聲明後不能再重新賦值`，因此被稱為常數。這意味著一旦用 const 聲明了一個變數，就不能再對其進行賦值。但要注意的是，const 只是保證變數的引用不變，並不表示變數內容不可變。對於對象或數組，const 只保證它們的引用不變，但可以修改對象或數組的內容。

```javascript
const b="Hello";
console.log(b); //Hello
b="World";
console.log(b); //error
```

### 臨時變數
沒寫會被當臨時變數且為全域。可以透過 delete 刪除掉。一般而言應避免使用臨時變數

```javascript
d=123;
function test(){
console.log(d);
}
test();
delete d;
console.log(d);
```

此外，透過逗點多個要一起宣告，可以多筆
```javascript
var a=1,b=2,c=3;
console.log(a,b,c);

for(i=1,j=10;i<11;i++,j--){
console.log(`i=${i},j=${j}`);
}
```

### NULL vs UNDEFINED vs EMPTY vs NaN
使用變數可能會遇到某個<mark>無我</mark>的狀況，這裡我們可以分為四種模式大致解釋，但這裡不會特別介紹，你可以自己深入了解。

- null：
為沒有東西可表示的意思，你可以指定一個變數為 null，或是某狀態下沒有任何資料回傳時我們可以回傳個 null 表示沒有東西要給你看。
- undefined：
沒有明確定義的意思，如果你沒有先宣告或某變數沒有給予他任何資料，這個變數雖存在但是內容為未定義之變數。
- empty：
通常是指空字串，如果變數為字串型變數但沒有塞入文字，會是一個 empty 的字串變數。
- NaN:
指的是Not a Number，該變數為數字邏輯之結果(型別為number)但值並非唯一個數字，通常發生於錯誤的計算結果。

```js
let
  a=null,
  b,
  c='',
  d=5*'A'+3;

console.log(a,b,c,d); //null undefined '' NaN
```

# 條件式判斷
透過條件的成立 (TRUE 或 FALSE) 判斷執行力，根據布林值決定是否執行{}內的代碼。包含了 if else 跟 switch case。

## if else
if else 為所有程式語言當中最基本的程式邏輯，你可以對程式下達條件做不同對應的結果。

語法範例為
```javascript
if（條件 A) {A 指令}	//當這裡條件是對的，執行這裡{}內的指令
else {C 指令}	//當前一個 if 是錯的，執行這裡{}內的指令
```

另外還有多重判斷，原理為 else 當下進行新的 if else 之組合應用，你可以想成投幣機的幣值判斷。
```javascript
if（條件 A) {A 指令}	//當這裡條件是對的，執行這裡{}內的指令
else if（條件 B) {B 指令}	//當前一個 if 是錯的 and 這裡條件是對的，執行這裡{}內的指令
else {C 指令}	//當前一個 if 是錯的，執行這裡{}內的指令
```

練習：跟著做學會基本的判斷
```javascript
$which=true;	//試著將 true 變成 false,0,1 分別看結果為何
if($which) {
  console.log("這世界有好人");
}
else{
  console.log("這世界不友善");
}
```
```javascript
height = 50;
money = 100;
face = 0; //1=true, 0=false

if ((height > 170) && (money > 10000000) && (face))  console.log("100 分");
else console.log("0~99 分");

if ((height > 170) || (money > 10000000) || (face)) console.log("60~99 分");
else console.log("0~60 分");
```
```javascript
var aa=1,bb=1,cc=1;  //可於連續同型態下連續多筆宣告
if(aa==bb==cc==1) {console.log("豹子")}
else if(aa+bb+cc>9) {console.log("大")}
else {console.log("小")}
```

### 三元運算子
顧名思義有大三元 `where?ture:false;` 將簡易條件描述整合化，適合套入指定變數。

```javascript
day=5;
message=day<6?"is workday":"is holiday";
console.log(message);
```

## switch case
跟 if else 觀念很像但不一樣的是，比較整潔清楚好閱讀。也是一行行的往下執行判斷。語法為：

```javascript
switch (variable) {
  case 'value':
    //#code...
    break;

  default:
    //#code...
    break;
}
```
當 var 變數的內容等於 case 內的 value 時。會執行該#code。如果遇到 break 會結束 switch 行為，否則會繼續往下一行 code 執行檢查。只有當 case 條件都不成立時則前往 default 執行該#code。

練習：
```javascript
lang = "tw"; //試著抽換其他國家代碼
switch (lang) {
  case "jp":
    console.log("愛洗爹路唷");
    break;
  case "kr":
    console.log("沙拉黑唷");
    break;
  case "tw":
    console.log("我好喜歡你唷");
    break;
  default:
    console.log("sorry, 你的語言我不會");
    break;
}
```

可以思考如何用 if else 來取代 switch case，兩者的優劣式為何？

```javascript
$lang = "kr";
if ($lang == "jp") console.log("愛洗爹路唷");
else if ($lang == "kr") console.log("沙拉黑唷");
else if ($lang == "tw") console.log("我好喜歡你唷");
else console.log("sorry, 你的語言我不會");
```

- 在編寫行數優點來說 if>switch，以閱讀性優點來說 switch>if
- ifelse 可以模擬出 switch，但反過來卻不行，由於 switch 只限定於判斷等於的處理。

---

# 迴圈執行條件
迴圈是只重複的執行一樣的動作，除非達到指定條件才會結束迴圈動作。JS 的迴圈主要也是 For 與 While，而如果是對資料結構（陣列或物件）會另外有適合的迴圈存取方法，稍晚再介紹。

## for
迴圈是只重複的執行一樣的動作，除非達到指定條件才會結束迴圈動作。for() 內主要有三個宣告動作分別用<kbd>;</kbd>分開，分別為：

- 初次動作：第一次執行的宣告動作，之後重複迴圈時忽略此項
- 條件判斷：每次進來時的條件檢查，當成立時才會執行、{code\}內的 code
- 離開動作：\{code\}執行結束後，會執行這個動作

```javascript
var str = "";
for(let i=0;i<9;i++){
  str+=i;
}
console.log(str);
```
練習：試著用 Console.log 印出
```
1
4
7
10
```
```javascript
for(let i=1;i<=10;i+=3){
  console.log(i);
}
```

雙 for 迴圈跑 99 乘法表：
```javascript
for(let i=1;i<10;i++){
  for(let j=1;j<10;j++){
    console.log(`${i} * ${j} = ${i*j}`);
  }
}
```
## while
while() 也是迴圈的一種，結構較簡單。跟前者差異在於 while() 只有一個條件判斷是否要執行該段{code}。

```javascript
var n=0;
while(n<5) {
  console.log(n);
  n++;
}
```
練習模仿 for 行為
```javascript
var i=0;
while(i<10){
  console.log(i);
  i++;
}
```
## do while
do while 是 while 的變形版本，比較常見於檢查下，譬如 do 裡面要求使用者收入某資料，透過 while 去判定是否重新做一遍才離開迴圈。

```javascript
var re="",i=0;
do {
  i++;
  re+=i;
} while (i < 5);
console.log(re);
```
## 迴圈的跳脫：continue vs break vs return
迴圈重複過程中，可以透過指令進行離開迴圈。使用時須十分謹慎知道自己在做什麼事，否則你會進入無窮迴圈。

- continue：強迫結束本回合，回到迴圈判斷繼續執行。
- break：迴圈崩壞結束，離開迴圈不再執行。
```javascript
//忽略此趟跟整個跳脫，注意控制不當會導致無窮迴圈
var n=0;
while(n<10) {
  n++;
  if(n==4) continue;
  if(n==8) break;
  console.log(n);
}
```
- return：為函式專用的回傳跳脫並結束函式生命，但也能合併於函式的迴圈內直接結束。

```javascript
function parrot(say) {
  n=4;
  while(n>0){
    console.log('阿~~~!');
    if (say == 'mute') return;
    console.log(say);
    n--;
  }
}

parrot('hi');
parrot('mute');
parrot('what');
```
>return 指令只能活在 function 內。
---

# 陣列與物件
在 JavaScript 領域中也提供了陣列做為資料應用，陣列是一種結構性的資料儲存單位，而陣列的結構只有索引編號與值。另一種稱呼為物件，物件的結構分為屬性與值。兩者差異在於，JavaScript 的資料主要都依賴物件 JSON 來進行處理，而陣列概念算是特別的物件。陣列偏向資料演算使用，物件偏向資料整理使用。

## 陣列
陣列是一種結構性的資料儲存空間，可以儲存多筆資料到一個陣列內，分別由不同的元素做對應位置。陣列內每個元素包含了索引值跟內容值，提供尋找跟讀取。簡單來說，以前學的變數只能指定一個值。但如果是陣列型態的變數，就能多個變數且沒有侷限。可以建議初學者，在學習陣列會以火車列車廂串接作為假想情境。

```javascript
var a=new Array(); //宣告空陣列
a.push(123,456); //透過陣列原生函式 push 與 pop 進行塞入與移除

var b=[123,456]; //直接指定陣列結構的資料給變數 b

console.log(a,b); //顯示陣列
console.log(a[0],b[0]); //顯示陣列內的指定項之值

//陣列有填入的依序特性
a.push(789);
b[3]=789;
console.log(a,b);

a.push(000);
b.push(000);
console.log(a,b);

//陣列的移出有反序特性
var va=a.pop();
var vb=b.pop();
console.log(va,vb);
var va=a['pop']();
var vb=b['pop']();
console.log(va,vb);

//二維陣列
b=new Array();
b[0]=[1,3,5];
b[1]=[2,4,6];
console.log(b[1][0]);

c=[[1,3,5],[2,4,6]];
```
## 陣列函式
陣列除了可以存放值，另外主要做為資料演算處理使用，因此會有專於陣列才有的許多函式。
```javascript
//push & pop
for(i=1;i<11;i++) a.push(i);
a.pop();

//Foreach 
function showme(value,item){
  console.log(`item=${item},value=${value}`);
} 
a.forEach(showme);

//for-of  (by ES6)
//通常陣列沒有屬性名稱，適合帶 value 不帶 key，除非搭配 Object.keys()，但不如直接用 for..in 快
for(var value of a){
  console.log(`value=${value}`);
}

a[50]=5;
console.log(a); //會有 empty 的欄值

//filter 過濾，等於 foreach 行為並加上檢查後回傳，成為一個陣列之返回動作
function clearempty(value){
  return (value!=null);
}
a.filter(clearempty);
a=a.filter(clearempty); //改寫陣列

//由於陣列只能索引數字，如果要索引名則要改用物件宣告方式來進行規劃為多資料結構之變數。
a={cat:123,dog:456};
console.log(a['cat']);

for(var key in a){  //可遍歷出 key
  console.log(`key=${key},value=${a[key]}`);
}
```
>更多的陣列相關原生（延伸）物件，請 ==[參考文件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array)==
## 物件
JSON 全名叫做 JavaScript Object Notation，就是在 JavaScript 拿來表示物件的一種資料格式文字。透過 JSON 文字串我們能將一個變數存成一個物件型變數，這樣我們就能透過 key 找到我們要的 value。而 JS 很多函式都是透過物件方式讓你進行呼叫使用。

物件 (JSON) 的存取 `obj.a` `obj['a']`
```javascript
obj={'a':123,b:456} //字串可+''可不+
console.log(obj.a,obj['a']);
```

關係 
```javascript
obj={a:123,b:456}
'a' in obj; //be ture
```

> 陣列也算是一種物件比較特別，雖然沒有 key 能使用，但比普通物件而言，陣列的原生物件（鍊）較多。
---

# 常用函式
- 長度計算
  ```javascript
  const say = 'Hello World';
  say.length; // 11

  var data=[123,456,789];
  data.length; //3
  ```
- 型態轉換
  ```javascript
  a='5';
  b=100;
  console.log(a+3+b);
  console.log(a+(3+b));
  console.log(Number(a)+3+String(b)); 
  ```
- Math
  所有數學計算都收入到 Math() 裡面
  ```javascript
  Math.round(6.4);//四捨五入
  Math.ceil(6.4);//無條件進
  Math.floor(6.4);//無條件捨
  Math.random();//隨機 0<x<1 之浮點數
  Math.floor(Math.random()*15); //利用變 15 倍，得到 0<x<15 之間浮點數，在無條件捨去得到 0~14 隨機整數

  /*如果想要範圍 50~80
    =>Math.floor(Math.random()*31); 0~30
    =>Math.floor(Math.random()*31)+50; //50~80
    =>寫成 FUNCTION
  */
  function myrand(min,max){
    return Math.floor(Math.random()*(max-min+1))+min; //min~max
  }
  ```
- typeof
  可確認該變數的型態為何者，通常做檢查用
  ```javascript
  var a="123";
  typeof(a);
  var b=123;
  typeof(b);
  var c=false;
  typeof(c);
  ```
- Date
  ```javascript
  var now=Date();
  var time=new Date();
  console.log(now,time);
  //兩者不同，前者為物件指向為變數使用 new，後者只是當作文字，要做 Date 的變化只能前者

  //Date() 預設不填寫為目前時間，你可以指定任何時間，此為參數表示法為例，月份 0~11 數字代表
  var custime1=new Date(2019, 11, 31, 23, 59, 59, 999);
  var custime2=new Date("2019-12-31T23:59:59");;//ISO 表示法

  /*如何抽出日期數字*/
  time.getFullYear();
  time.getMonth()+1;
  time.getDate();
  time.getHours();
  time.getMinutes();
  time.getSeconds();

  /*如何計算倒數日期*/
  var time=new Date();
  var custime2=new Date("2019-12-31T23:59:59");;//ISO 表示法
  tmin=time.getTime(); //兩者先取得時間戳記（毫秒）
  tmax=custime2.getTime();
  beto=Math.floor((tmax-tmin)/1000);
  //區間總數 （秒），不要小數點是因為秒數我們只要整數，小數點單位（毫秒）就不要了
  //假設此時 beto=54321 秒，以下進行示範說明
  
  bsec=beto%60;
  /*
   * 54321%60=21
   * 也就是說 21 秒是無法升級為分的殘餘
   */
   
  // bmin=(beto/60)%60;
  /*
   * 54321/60=905.35    
   * 其中 0.35 如果* 60 會等於 21
   * 也就是說小數點可以代表上一個秒的值，由於這裡我們不要秒所以你可以 floor 處理
   * 結論我們要的 bmin 會是
   * 1=>(Math.floor(beto/60))%60 
   * 或 
   * 2=>Math.floor(beto/60)%60)
   * 不論 1 還是 2 答案都一樣，因為小數點都是上一階段沒消除的業障。
  */
  
  bmin=Math.floor((beto/60)%60);
  //同理
  
  bhur=Math.floor((beto/60/60)%24);
  //同理
  
  bday=Math.floor(beto/60/60/24);
  //這裡不用餘數，是因為不再昇華到下一階段，最大單位就是天數
   
  
  console.log(`今年只剩${bday}天${bhur}時${bmin}分${bsec}秒就跨年囉！`);
  ```
  {% note default %}
  格式表示法還有很多，請自行查詢 https://www.w3schools.com/js/js_date_formats.asp
  {% endnote %}

  前面介紹了`.get_______`，另外還有 `.set_______` 系列，能對時間物件進行修改或是累加累減取得之後，達到某些時間數字之修改。舉例想知道 21 天後的日子為何
  ```javascript
  var now=new Date();
  now.setDate(now.getDate()+21);
  console.log(now);
  ```
---

# 將 JS 放入 HTML
前面只稍微提到如何執行網頁下的 JS Code，這裡會重新解釋一遍。在 HTML 文件內，遊覽器解讀順序由上到下，當碰到 HTML Code 就會開始解讀內容並轉換成媒體畫面。碰到 JS 也會直接開始解讀。要如何將 JS 寫到 HTML 內有以下方法。

## 在 body 內寫入 script 標籤

```html
<body>
  <script>
    document.write("我的第一個 JS 顯示");
  </script>
  <h1>hello world</h1>
</body>
```
接著練習分成同一個 script 有宣告函式跟執行函式，也能正常執行。
```html
<body>
  <h1>hello world</h1>
  <script>
    writeit();
    function writeit() {
      document.write("我的第一個 JS 顯示");
    }
  </script>
</body>
```

試著去跟你的 HTML 對調位置，基本上出現在哪，就是在哪執行 JS。接著試試兩組 script，一個做宣告函式一個做使用函式。

```html
<body>
  <script>
    writeit();
  </script>
  <h1>hello world</h1>
  <script>
    function writeit() {
      document.write("我的第一個 JS 顯示");
    }
  </script>
</body>
```
只時能發現 HTML 跟 JS 的讀取順序都是由上到下，且分成兩個區域工作下進行上到下解讀，反而第一時間不認識`writeit()`。正確觀念應讓函式宣告先跑出來，這樣能確保函式可以被認識到。或者利用 JS 的 window.onload 去規劃，使 document 倍加載完成後才執行此 JS 代碼。
```html
<body>
  <script>
    window.onload = function () {
      writeit();
    }
  </script>
  <h1>hello world</h1>
  <script>
    function writeit() {
      document.write("我的第一個 JS 顯示");
    }
  </script>
</body>
```
此時你發現 document 不如你預期的顯示正確結果，這是因為 document 已經載入完成，document.write 應該在加載完畢前使用，因此你需要使用 DOM 來去對已存在的 document 進行讀寫。
此時，試著把 document.write 改成以下 DOM 之寫入方法，之後我們會開始正式介紹 DOM。

```html
<body>
  <script>
    window.onload = function () {
      writeit();
    }
  </script>
  <h1>hello world</h1>
  <p id="demo"></p> <!-- for DOM USE IT -->
  <script>
    function writeit() {
      // document.write("我的第一個 JS 顯示");
      document.getElementById("demo").textContent="我的第一個 JS 顯示";
    }
  </script>
</body>
```
上面遺失的狀況劇也會發生在 DOM 操作上，當 HTML 文件還沒解讀到 p 標籤時，你嘗試要對 p#demo 寫入也是會失敗的。所以，不論何種寫法大部分剛學習 JS 的都會希望你把 JS 放置到 body 最後面，使得 JS 可以順利取得 document 的資源。然而屬於現有外掛的 JS（或 CSS) 會希望你擺放到 body 前面（或 head)，確保接下來，要使用外掛過程中不會找不到此資源。

## 用 srcipt+src 做外部路徑整合帶入
你可以把 JS 代碼做成 JS 檔案並另用外部匯入整合到 HTML 內，如果你不想要 onload，記得要放在 body 最下面確保 JS 讀取順序沒有意外。

```html demo.html
<body>
  <h1>hello world</h1>
  <p id="demo"></p> <!-- for DOM USE IT -->
  <script src="demo.js"></script>
</body>
```

```javascript demo.js
function writeit() {
  // document.write("我的第一個 JS 顯示");
  document.getElementById("demo").textContent = "我的第一個 JS 顯示";
}
writeit();
```
## 自我練習
試著只使用空白網頁，只透過 JS 印出 99 乘法表，版型不要求，印出方式為 document.write(); 如果可以請只用一個 for 迴圈。
```javascript
  <script>
    for(var i=1,j=1;j<10;i++){
      document.write(`${j}*${i}=${i*j}<br>`);
      if(i==9) {
        i=0,j++;
        document.write(`<hr>`);
      }
    }
  </script>
```