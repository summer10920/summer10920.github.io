---
title: "[學習之路] TypeScript 的基礎知識"
categories:
  - Zero Road
  - Web Fronted
tag:
  - TypeScript
date: 2021-08-25 13:31:03
# hidden: true
---
![](https://i.imgur.com/VL6vpbF.png)
微軟所提供的一種程式語言，可當作具有類型語意的 JavaScript。主要是解決 JavaScript 的一些語意設計問題所存在，可以當做它是一種 JS 預處理前的程式階段並透過編譯 complier 後轉為 JavaScript。TypeScript 的語法更嚴謹規範能改善解決編寫 JS 因太過自由而遇到的問題。
<!-- more -->

由於 JavaScript 原本誕生作為簡單的腳本語言，隨著主流性發展導致原本語意單調設計上的引起錯亂，舉例來說：

```js
console.log(""==0,1<5<3,5*undefined);
/* true true NaN */

const obj={ba:10}
const val=obj.baa*100;
/*打錯字的不存在變數不會出現錯誤資訊，此時內容為 NaN 繼續仍可往下執行*/
```

因此修正 JS 的語意類型的前置作業就是 TypeScript 的存在目標。TypeScript 的存在來自於 JavaScript 的問題性改善：

1. 靜態型別 Static Type 檢查
由於 JavaScript 採用動態方式特別自由不受限制，容易發生預期以外之型態結果（如上面範例）；TypeScript 採用靜態型別模式，在使用變數時就必需指定型別做為指定並檢查。
2. 變數領域規劃
JavaScript 的變數只能作為全域變數或區間變數使用，無法在某物件或類別 class 內使用。
3. 物件導向邏輯不同
JavaScript 的物件導向觀念採用獨特的原生鍊 Prototype Based 類型並非屬於程式領域中正規的 Class Based 之觀念。因此很多程式設計者無法套用原本已熟悉的物件導向觀念做功能使用；TypeScript 則可使用 Class Based 觀念並加以使用，像是 classs 繼承與介面等正規物件導向功能，更適合大型專案開發所用。

# 安裝
可從 [官方網站](https://www.typescriptlang.org/zh/) 深入了解並下載，這裡使用 npm 來獲得安裝 (Node.js)。

```npm npm
npm install typescript -g
```
>這裡需參數 g 來安裝到主機上而不是專案目錄下

## 執行
試著在專案內新增一筆檔案 `test.ts`，跟著輸入以下代碼準備轉檔

```ts test.ts
class loki {
  constructor(public title: string, public msg: string) {

  }
  print() {
    return `
      <h1>${this.title}</h1>
      <p>${this.msg}</p>`;
  }
};
const msg: loki = new loki("TITLE", "MESSAGE");
document.write(msg.print());
```

### 直接使用 tsc 指令
直接單純的使用 TSC 模組來完成指定檔案轉換，後透過終端機指令 `tsc test.tsc` 會進行編譯成 `test.js` 。另外提供直接用 ES6 方式寫的差別做比對：

{% tabs tsvsjs %}
<!-- tab test.js <br>(TypeScript to JavaScript)-->
```js test.js
var loki = /** @class */ (function () {
    function loki(title, msg) {
        this.title = title;
        this.msg = msg;
    }
    loki.prototype.print = function () {
        return "\n      <h1>" + this.title + "</h1>\n      <p>" + this.msg + "</p>";
    };
    return loki;
}());
;
var msg = new loki("TITLE", "MESSAGE");
document.write(msg.print());
```
<!-- endtab -->
<!--tab testbyES6.js<br>（改用 ES6 觀念的寫法）-->
```js testbyES6.js
class loki {
  constructor(title, msg) {
    this.title = title;
    this.msg = msg;
  }
  print() {
    return `
      <h1>${this.title}</h1>
      <p>${this.msg}</p>`;
  }
};
const msg = new loki("TITLE", "MESSAGE");
document.write(msg.print());
```
<!-- endtab -->
{% endtabs %}

從上列可知道以下觀念（觀察 TypeScript 與 JavaScriptES6)：
- 編寫 class 的程式觀念上，使用 TypeScript 更直覺操作。畢竟原 ES5 寫法不是標準的 class 而是採用函式。雖 ES6 已經支援 Class 了，這裡因 TypeScript 的預設參數為 ES5 語法，但可自行調整此編譯語法參數。
- TypeScript 主要是協助開發者完成代碼後轉換成 JavaScript 能理解的寫法
- TypeScript 對於變數的型態宣告有強迫性，這是為了幫助開發者風險降低
- TypeScript 的主要用途是讓開發者寫得更簡短與穩定，不是為了取代 JavsScript 標準

事實上，任何轉檔調整需求都需要專案根目錄下的 TypeScript 設定檔案`tsconfig.json`來控制轉檔細部設定。這裡沒提供則不影響皆依 tsc 預設為輸出。在此試著規劃參數檔。

1. 專案目錄下直接建立`tsconfig.json`檔案。可以手動自己建立，也能透過終端指令`tsc --init`完成並會提供參數說明。
2. `tsconfig.json`的參數非常多，這裡只隨便兩種設定即可，未設定的都以初始值，甚至都不寫也可以。
```json
{
  "compilerOptions": {
    "target": "es6", //輸出 JS 版本，可選擇 ES3、 ES5 、 ES2015 、 ES2016 、 ES2017 、 ES2018 、 ESNext 和 JSON
    "module": "ES6", //指定生成為哪種模組，可不寫則根據 target 為 ES3/ES5 預設為 commonjs，否則預設值為 ES6
  }
}
//更多參數詳閱 https://www.staging-typescript.org/tsconfig
```
3. 接著在終端指令輸入`tsc` 就能根據 tsconfig.json 來轉檔，預設會自動對該專案資料夾內所有 ts 或 tsx 檔案為對象。

### 由 VSCode 提交 tsc 指令
而 VScode 本身除了支援 TypeScript 語法高量與智能提示，還能進一步透過 tasks 工作排程方式送出 tsc 指令。前提是專案內要存在`tsconfig.json`才能被 VS Code 協助（必要）。

- 接著換個方式。改用 VSCode 的 task 功能來執行 tsc。按下<kbd>F1</kbd>來呼叫命令視窗，輸入 task 關鍵字選擇`Task:Configure Task` （工作：設定工作）。
- 此時因為專案下有 tsconfig.json 檔案，VSCode 會對此檔案產生`建置 build`（一次性轉換）與`監看 watch` （同步轉換）兩種工作指令。

**建置 build**
1. 選擇 `build 建置` 則會再產生 `.vscode/tasks.json` 記住此工作排程設定。內容如下：
```json .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "problemMatcher": [
        "$tsc"
      ],
      "group": "build",
      "label": "tsc: 建置 - tsconfig.json",.
      
    }
  ]
}
```
2. 現在專案已經綁了一個 Task 工作細節，要執行工作的方式為按下<kbd>CTRL+SHIFT+B</kbd>選取工作即可，選擇剛建立的`tsc: 建置 - tsconfig.json`。
3. 自動彈出終端機並自行執行 tsc -p 指令，同時要求你按下任何按鈕關閉此介面。
```shell
> Executing task: tsc -p d:\github\test\tsconfig.json <

工作將被重新啟用。按任意鍵關閉。
```
4. 如果覺得這個按鈕動作很討厭，根據官方手冊可以不特別彈出顯示。
```json .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "problemMatcher": [
        "$tsc"
      ],
      "group": "build",
      "label": "tsc: 建置 - tsconfig.json",
      "presentation": {
        "reveal": "silent" //僅當未掃描輸出以查找錯誤和警告時，才將終端面板置於前面。
      }
    }
  ]
}
```

**監看 watch**
1. 回到上面流程這次改選 `監看 watch` 則會再對 `.vscode/tasks.json` 產生一個新工作排程設定。內容如下：
```json .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "problemMatcher": [
        "$tsc"
      ],
      "group": "build",
      "label": "tsc: 建置 - tsconfig.json",
      "presentation": {
        "reveal": "silent"
      }
    },
    {
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "option": "watch",
      "problemMatcher": [
        "$tsc-watch"
      ],
      "group": "build",
      "label": "tsc: 監看 - tsconfig.json"
    }
  ]
}
```
2. 這次改執行這個工作項目，按下<kbd>CTRL+SHIFT+B</kbd>選取剛建立的`tsc: 監看 - tsconfig.json`。
3. 現在每次對目標檔案 ts 存檔時，就會自動監看變化並同步轉檔。

# 型別 Type

##  判斷
由於 TypeScript 是 TypeScript 的超集合 (superset)，因此在 Typescript 內輸入純 JavaScript 語法也是可行的，只差於在 TypeScript 領域裡會保守的做任何型別檢查並報錯。型別檢查有以下機制：

### 根據推論
TypeScript 了解 Javascript 的語法因此直接使用 Javascript 來設定型別時 TypeScript 會試著去推理出變數的型別。如下例，第一行沒有告知型別，TypeScript 能推測出屬於字串，接著第二行會出現錯誤，TypeScript 已知道這變數為字串而不能改成數字。

```ts
let jsword = "hello World";
jsword = 5;
console.log(typeof (jsword));
```

### 透過定義
可以自己告知 TypeScript 這變數屬於什麼型別，有三種基本寫法：

```ts 寫法 1
const str: string = "hello";  /*寫法 1，在 name 處指定型別*/
const num = <number>456;  /*寫法 2，在 value 前綴添加<> */
const bool = true as boolean; /*寫法 3，在 value 用 as 綁定*/
```

這習慣很容易培養，每次創立變數時記得宣告這變數的型別即可，舉例如下：

```ts
const
  price: number = 100,
  tax: number = 0.05,
  total: number = price * (1 + tax);
const msg:string="$"+price+"含稅價為：$"+total+"。";

console.log(msg);
```

當然可試著將所有的定義型別移除，TS 程式仍可以正常轉換為 Javascript 不會報錯，這是 TypeScript 透過推論協助出來的。但不要太過於依賴推論功能，如果可以還是想成習慣宣告型別，避免遇到不可預期的邏輯錯誤。

#### any 通用型別
由於 TypeScript 非常要求靜態型別的宣告，因此有必要時可使用 any 通用型別，可以像 Javascript 那樣保留動態不受限定型別
```ts
let anyVal: any = 123;
anyVal = "world";
```

下一篇開始將介紹各種定義的規則與方式。

## 定義型別
目前已經知道 number,string,boolean,any 這四種基本型別的用法，我們接著介紹其他複雜的型別與規則。

### 別名
型別本身可以使用別名來登記，再透過套用別名方式來達到宣告型別。舉例如下：

```ts
type userName = string;
type userAge = number;
//宣告這些別名且持有型別

let a: userName = "Loki";
let b: userAge = 18;
//透過別名獨立額外寫成型別別名，能讓變數使用上更直覺清楚

console.log(a, b);

/******to js
  let a = "Loki";
  let b = 18;
  console.log(a, b);
*/
```

### 陣列
陣列的指定型別方式需要多一個`[]`宣告在後餟，這樣的操作下會是陣列內所有資料的型別都是同樣的，雖然不像 Javascript 自由彈性，但也是保護你的資料都是同樣 type 型別。

```ts
let ary:number[]=[123,456];
ary.push(789);  //[123,456,789]

let total:number=0;
for (const i in ary) {
  total+=ary[i];
}

console.log(ary,`SUM=${total}`);
```

如果需要不同的型別，可以用`|`來做多種可能。

```ts
let ary: (string | number)[] = ['Loki', 'Jiang', 18]
arr.push("taiwan");
console.log(arr);
```

#### enum 列舉
enum 是一種特別的資料型別稱呼為列舉型別。能預先將一些固定的資料存入並自動提供索引 key，結果會是以物件方式保存且不可再事後添加。使用列舉型別可以獲得 key 與 value 相反對應的物件，透過以下代碼做檢視就能明白：

```ts
enum lokiStatus { scuess, warn, error }
console.log(lokiStatus); 
//{0: 'scuess', 1: 'warn', 2: 'error', scuess: 0, warn: 1, error: 2}
```

TypeScript 會自動將這些 value 做成 key 值，如果需要就能去尋找這些值的相關動作。

```ts
enum lokiStatus { scuess, warn, error }
console.log(lokiStatus); 
//{0: 'scuess', 1: 'warn', 2: 'error', scuess: 0, warn: 1, error: 2}

// use value check in enum
const code:string="scuess";
switch (lokiStatus[code]) {
  case lokiStatus.scuess:
    console.log("is scuess");
    break;
  case lokiStatus.error:
    console.log("is error");
    break;
  case lokiStatus.warn:
    console.log("is warning");
    break;
}
```

也可以去手動設定這些 index 值，舉例來說前後端的 status 對應可以用到。

```ts
enum apiStatus {
  scuess = 200,
  warn = 300,
  error = 400
}
console.log(apiStatus);
//{200: 'scuess', 300: 'warn', 400: 'error', scuess: 200, warn: 300, error: 400}

// use index check in enum
const getcode: number = 400;
switch (getcode) {
  case apiStatus.scuess:
    console.log("is scuess");
    break;
  case apiStatus.error:
    console.log("is error");
    break;
  case apiStatus.warn:
    console.log("is warning");
    break;
}
```

也能指定字串作為索引 key，只是不會額外產生反向關聯 key 與 value。
```ts
enum msgStatus {
  scuess = 'ok',
  warn = 'alert',
  error = 'fail'
}
console.log(msgStatus);
//{scuess: 'ok', warn: 'alert', error: 'fail'}

//use key check in enum
const { scuess, error } = msgStatus; //可透過這方法再把 enum 轉回幾個變數，但名稱要存在
const msg = "ok";

switch (msg as string) { //如果不指定 type 會出現 type 無法比較。因為前一行沒有宣告型別，這裡事後指定這裡的資料為字串
  case scuess:
    console.log("is scuess");
    break;
  case error:
    console.log("is warning");
    break;
}
```

應外注意的是 enum 可以使用 const 來宣告，差別在於不會產生 object 但仍可正常於 TypeScript 上去列舉資料（實際因需求而存在）。可以觀察 TypeScript 產生的 JavaScript 精省到什麼程度減少內存效能。然而因為物件不存在，所以無法反向取值透過 index 數字去找到 value。

```ts
const enum constStatus {
  scuess = 'ok',
  error = 'fail',
  apple=100,
  banana=200
}
//應該但不存在的物件
//{100: 'apple', 200: 'banana', scuess: 'ok', error: 'fail', apple: 100, banana: 200}

console.log(constStatus) // 報錯，無此物件
console.log(constStatus.scuess); //fail:string
console.log(constStatus[200]); //不可能找到，沒有物件就沒有 index
console.log(constStatus.apple); // 100:number
```

#### tuple 元組
元祖是一種更嚴謹的陣列，相別於前面的寫法，能強迫嚴格指定每個陣列位置的型別為何。

```ts
let ary1: [string, string, number, string];
ary1 = ['Loki', 'Jaing', 18, 'Taiwan']; //必須對應正確的型態否則會錯誤

//上面兩行可簡化直接一行寫完
let ary2: [string, string, number, string] = ['Loki', 'Jaing', 18, 'Taiwan'];

console.log(ary1, ary2);
```

搭配列舉與別名的範例

```ts
enum sex { man, woman };  //列舉型別物件
type username = string; //別名
type mail = string; //別名
type age = number; //別名

let author: [username, mail, sex, age]; //設定 author 變數為元祖型別
author = ['Loki', 'summer@gmail.com', sex.man, 18]; //sex.man 會塞入 index 值

console.log(author);
//(4) ['Loki', 'summer@gmail.com', 0, 18]
```

如果搭配資料庫規劃可做成這樣的陣列宣告，將 type tuple 當作一個別名指定給陣列。

```ts
enum sex { man, woman };  //列舉型別物件
type username = string; //別名
type mail = string; //別名
type age = number; //別名
type author = [username, mail, sex, age]; //別名為元祖型別

////////////////////////////////////////////////////

let rows: author[] = []; //宣告變數為 author 這個別名型別

rows.push(['Loki', 'loki@gmail.com', sex.man, 18]);
rows.push(['Kelly', 'kelly@gmail.com', sex.woman, 16]);

console.log(rows);
/*
  (2) [Array(4), Array(4)]
  0: (4) ['Loki', 'loki@gmail.com', 0, 18]
  1: (4) ['Kelly', 'kelly@gmail.com', 1, 16]
*/
```

### 函式
除了變數需要指定型別，在函式的應用上也會用到定義函式，例如傳遞參數、回傳參數以及函式型變數等場合。

#### 傳遞與回傳
規則如變數一樣，在傳遞變數後綴指定型別，而回傳的資料也需要型別，寫在函式本體後綴指定型別。

```ts
function calc(price: number, tax: number): number {  //回傳型別寫在函式本身後綴
  return Math.floor(price * (1 + tax / 100));
}
console.log(calc(99, 5));  // 99*1.05=103.95=> 103
```

##### 選擇性參數
如果傳遞參數為選配，可透過`?`來指定。

```ts
function calc(price: number, tax?: number): void {  //回傳型別寫在函式本身後綴
  const tx = tax ? tax : 5;  //如果 tax 變數存在就指定，這裡不會報錯是因為透過推論得到為 number
  const total: number = Math.floor(price * (1 + tx / 100));
  console.log(total);
}

calc(100); //105
calc(100,7); //107
```

##### 無回傳 void
如果沒有要回傳變數時，需函式型別為`void`來告知這個函式沒有回傳資料。

```ts
function calc(price: number, tax: number): void {  //回傳型別寫在函式本身後綴
  const total:number=Math.floor(price * (1 + tax / 100)); // 99*1.05=103.95=> 103
  console.log(total);
}

calc(99,5); //do
```

##### 不回傳 never
與 void 很相近都是用在於不會回傳的函式，主要嚴格用在沒有結果的函式（無限迴圈或拋出錯誤），例如：

```ts
function errorMsg(message:string): never{
  throw new Error(message);
}
```

##### 超載 overload
Overload 機制用於考量同一個函式下，有不同型別的參數與回傳可能時，透過宣告定義函式持有多種載入輸出的不同型別使用（雖然直接 function 傳入傳出吃`any` 或`|`就能直接搞定了）。

```ts
function setConvert(arg: [string, number]): number; //傳入 tuple 傳出 number
function setConvert(arg: number): [string, number]; //傳入 number 傳出 tuple

function setConvert(arg: any): any {
  enum aryCode { 'A', 'B', 'C', 'D' }; //A=0,B=1,...
  switch (typeof arg) {
    case 'number':
      const na: string = aryCode[Math.floor(arg / 5)];
      const nb: number = arg % 5;
      return [na, nb];

    case 'object':
      const oa: string = arg[0];
      const ob: string = arg[1];
      return aryCode[oa] * 5 + ob;
      return
  }
}

console.log(setConvert(7)); // array ['B', 2]
console.log(setConvert(['B', 2])); // 7
```

##### 泛用型別 generics
泛型的應用就是將規劃參數時不先做型別宣告，先使用`<>`作替代，等到執行函式時當下傳入的值再做型別說明。
```ts
function calc1<myType>(price: myType): myType {  //myType 是泛用型別，作為暫定型別使用
  return price * 1.05;  //報錯，TypeScript 預先不知道這是一個數字 type
}
console.log(calc1<number>(100));  // 

function calc2<myType extends number>(price: myType): number {  //可透過 extends 擴展為 number
  return price * 1.05;
}
console.log(calc2<number>(100));

function calc3<T extends number, U extends number>(price: T, tax: U): number {  //多個泛型傳遞參數之寫法
  return price * (1 + tax / 100);
}
console.log(calc3<number, number>(100, 7));
```

##### 其餘參數 rest parameter
同 JavaScript 用法，使用`...`來表示不確定數量的參數，因為被當作陣列所以記得陣列的型別宣告。

```ts
function sumArg(...ary: number[]): void {
  let total: number = 0;
  for (const item of ary) total += item;
  console.log(total);
}
sumArg(1,2,3,4,5);
```

#### 函式表達式
前面介紹的都是故意使用一般命名函式方式來設計，如要改採用匿名函式做表達式之變數其寫法也差不多。

```ts
// 函式宣告
function add1(x: number, y: number): number {
  return x + y;
}

// 函式表達式
let add2 = function (x: number, y: number): number {
  return x + y;
};
```

其 add2 的寫法不完整，雖然是透過推論出來的。如下列寫法說明解釋，`=`的右側為匿名函式沒有問題，差別在於等號的左邊沒有給予宣告型別。所以右側將用到的傳遞與回傳之變數型別也要同樣宣告到左邊去，才能檢查傳遞進去的參數是哪種型別，也就是等號兩邊都要對應到。

```ts
// 補充 add2 的型別，其正確的完整寫法為 add3
let add3: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
}
```
> TypeScript 中的 `=>` 和 ES6 中的 `=>` 有所不同，在 TypeScript 邏輯上的 `=>` 用來宣告type is function 之傳遞與回傳區別定義。

如果只有一個傳遞參數，其實可以省略變數名：
```ts
let add4: (number) => number = function (x: number): number {
  return x + x;
}
```

#### 箭頭函式 Arrow Function
熟悉 JavaScript 函式表達式的話，其箭頭函式的用法就清楚了，唯獨`=>`比較容易混淆需要特別注意一下。將上面的 add4 改成箭頭函式的寫法如下：

```ts
/*
let add5: (x: number, y: number) => number = (x: number, y: number): number => {
  return x + y;
}
 */
/* 箭頭函式的特性簡化後 */
let add5: (x: number, y: number) => number = (x: number, y: number): number => x + y;

//如果只有一個傳遞參數，可以省略變數名
let add6: (number) => number = (x: number): number => x + x;
```

##### 參數上使用箭頭函式
箭頭函式可以當作一個變數，既然是變數就能傳送到別的函式做承接使用。

```ts
function echo(num: number, fn: (number) => number) { //傳遞變數分別為數字與函式且都有宣告型態
  const total: number = fn(num); //將num作為傳遞參數fn之使用
  console.log(total);
}

const sum: (number) => number = (n: number) => n * n;//宣告sum這個函式主要會將參數2次方並回傳用途

echo(7, sum); //將數字7以及變數sum整個都傳給echo函式做處理。
```



---

#### interface 斷言
另外如果是對物件內部設定型別，可透過變數斷言 interface 來定義。

```ts
const obj1 = {
  name: "loki" as string,
  id: 0 as number
} /*逐項定義*/

interface objtype {
  name: string,
  id: number,
} /*透過斷言來規範，注意命名與數量需匹配一致*/

const obj2: objtype = {
  name: "loki",
  id: 0
}
```

interface 也能套用在 class 與傳遞變數的場合

# 參考文獻
- [TypeScript: TSConfig Reference - Docs on every TSConfig option](https://www.staging-typescript.org/tsconfig)
- [Tasks in Visual Studio Code](https://code.visualstudio.com/docs/editor/tasks)