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
如名般的 Type Script(（類型腳本語言），微軟所提供的一種超集 JavaScript 之程式語言，可當作具有 type 類型系統的 JavaScript。主要是解決 JavaScript 的動態 type 設計不良所存在，可以當做它是一種 JS 預處理前置作業的檢查類型無誤後透過編譯 complier 後轉為 JavaScript。TypeScript 的語法可以使用純 JavaScript 來編寫，兩者差異就只是 type 的補足完整宣告。
<!-- more -->

由於 JavaScript 原本誕生作為簡單的腳本語言，隨著主流性發展導致原本語意單調設計上的引起錯亂，舉例來說：

```js
console.log("" == 0, 1 < 5 < 3, 5 * undefined);
/* true true NaN */

const obj = { ba: 10 }
const val = obj.baa * 100; /*因打錯字所產生不存在的變數，卻不會出現錯誤，且內容為 NaN 仍繼續執行*/
```

因此修正 JS 的語意類型的前置作業就是 TypeScript 的存在目標。TypeScript 的存在來自於 JavaScript 的問題性改善：

1. 靜態類型 Static Type 檢查
由於 JavaScript 採用動態方式特別自由不受限制，容易發生預期以外之型態結果（如上面範例）；TypeScript 採用靜態類型模式，在使用變數時就必需指定類型做為指定並檢查。
2. 變數領域規劃
JavaScript 的變數只能作為全域變數或區間變數使用，無法在某物件或類別 class 內使用。
3. 物件導向邏輯不同
JavaScript 的物件導向觀念採用獨特的原生鍊 Prototype Based 類型並非屬於程式領域中正規的 Class Based 之觀念（但在 ES6 版本已出現）。因此很多程式設計者無法套用原本已熟悉的物件導向觀念做功能使用；TypeScript 則可使用 Class Based 觀念並加以使用，像是 classs 繼承與介面等正規物件導向功能，更適合大型專案開發所用。

# 安裝
可從 [官方網站](https://www.typescriptlang.org/zh/) 深入了解並下載，這裡使用 npm 來獲得安裝 (Node.js)。

```npm npm
npm install typescript -g
```
>這裡需引數 g 來安裝到主機上而不是專案目錄下

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
- 編寫 class 的程式觀念上，使用 TypeScript 更直覺操作。畢竟原 ES5 寫法不是標準的 class 而是採用函式。雖 ES6 已經支援 Class 了，這裡因 TypeScript 的預設引數為 ES5 語法，但可自行調整此編譯語法引數。
- TypeScript 主要是協助開發者完成代碼後轉換成 JavaScript 能理解的寫法
- TypeScript 對於變數的型態宣告有強迫性，這是為了幫助開發者風險降低
- TypeScript 的主要用途是讓開發者寫得更簡短與穩定，不是為了取代 JavsScript 標準

事實上，任何轉檔調整需求都需要專案根目錄下的 TypeScript 設定檔案`tsconfig.json`來控制轉檔細部設定。這裡沒提供則不影響皆依 tsc 預設為輸出。在此試著規劃引數檔。

1. 專案目錄下直接建立`tsconfig.json`檔案。可以手動自己建立，也能透過終端指令`tsc --init`完成並會提供引數說明。
2. `tsconfig.json`的引數非常多，這裡只隨便兩種設定即可，未設定的都以初始值，甚至都不寫也可以。
```json
{
  "compilerOptions": {
    "target": "es6", //輸出 JS 版本，可選擇 ES3、 ES5 、 ES2015 、 ES2016 、 ES2017 、 ES2018 、 ESNext 和 JSON
    "module": "ES6", //指定生成為哪種模組，可不寫則根據 target 為 ES3/ES5 預設為 commonjs，否則預設值為 ES6
  }
}
//更多引數詳閱 https://www.staging-typescript.org/tsconfig
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

## tsconfig.json 引數
這裡列一些值得討論的引數設定（內容隨作者慢慢增加），不設定也沒關係。你可以跳過這篇等到上手環境再回來看。

| compilerOptions | default Value | Allowed                                                                                               | info                             |
| --------------- | ------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------- |
| target          | ES3           | ES5,<br>ES6/ES2015 (synonymous),<br>ES7/ES2016,<br>ES2017,<br>ES2018,<br>ES2019,<br>ES2020,<br>ESNext | 輸出的 JS 版本                   |
| noEmitOnError   | false         | true                                                                                                  | 如果報告了任何錯誤時停止 JS 輸出 |

# 類型判斷方式
在 TypeScript 領域內，行如其名所有的東西都會有靜態 Type，可分為系統自動判斷與人為手動定義兩種。當你未做任何動作情況下系統會自動判斷可能的 Type 來自動列入除錯考量。但可以的話就自行定義畢竟也可能會出現推論錯誤可能。

由於 TypeScript 是 TypeScript 的超集 (superset)，因此在 Typescript 內輸入純 JavaScript 語法也是可行的，只差於在 TypeScript 領域裡會保守的做任何類型檢查並報錯。類型檢查有以下機制：

## 根據推論
TypeScript 了解 Javascript 的語法因此直接使用 Javascript 來設定類型時 TypeScript 會試著去推理出變數的類型。如下例，第一行沒有告知類型，TypeScript 能推測出屬於字串，接著第二行會出現錯誤，TypeScript 已知道這變數為字串而不能改成數字。

```ts
let jsword = "hello World";
jsword = 5;
console.log(typeof (jsword));
```

## 透過定義
可以自己告知 TypeScript 這變數屬於什麼類型，有三種基本寫法：

```ts 寫法 1
const str: string = "hello";  /*指定寫法：在 name 處指定類型*/
const num = <number>456;  /*斷言（Type Assertion）寫法：在 value 前綴添加<> */
const bool = true as boolean; /*斷言（Type Assertion）寫法：在 value 用 as 綁定*/
```

這習慣很容易培養，每次創立變數時記得宣告這變數的類型即可，舉例如下：

```ts
const
  price: number = 100,
  tax: number = 0.05,
  total: number = price * (1 + tax);
const msg:string="$"+price+"含稅價為：$"+total+"。";

console.log(msg);
```

當然可試著將所有的定義類型移除，TS 程式仍可以正常轉換為 Javascript 不會報錯，這是 TypeScript 透過推論協助出來的。但不要太過於依賴推論功能，如果可以還是想成習慣宣告類型，避免遇到不可預期的邏輯錯誤。

# 類型
JavaScript 的型別分為兩種：原始資料類型（Primitive data types）和物件類型（Object types）。

## 原始類型 Primitive Types
又稱呼資料類型 Data Types，目前已看過 number,string,boolean,any 這四種基本類型的出現，我們接著詳細介紹類型與規則。但注意不要跟 JavaScript 原生的內建物件搞混，舉例來說`boolean vs new Boolean()`，或`number vs new Number()`。

### boolean, number, string
布林值可以指定類型為`boolean`，另一種寫法為`Boolean`代表的是 JS 原生的建構式勿搞混。

```ts
const bl: boolean = false;
const blObj: Boolean = new Boolean(0);
const blbak: boolean = Boolean(0);

console.log(bl); //false
console.log(blObj); //Boolean {false}
console.log(blbak); //false
```

數字類型涵蓋了各種數值

```ts
const
  decLiteral: number = 6,
  hexLiteral: number = 0xf00d, // 61453
  binaryLiteral: number = 0b1010, // 10 (ES6 二進位）
  octalLiteral: number = 0o744, //484 (ES6 八進位）
  notANumber: number = NaN, //非數字
  infinityNumber: number = Infinity; //無限大

const numObj: Number = new Number(5);  //Number {5}
```

字串如此簡單，之後不再演示 new String() 之類了唷。

```ts
const
  name: string = 'Loki',
  age: number = 18;

const echo: string = `My name is ${name}. I'll be ${age + 1} years tomorrow.`;
```

### void, null, undefined
void 為空值之意，如果是宣告在變數身上代表沒有內容，宣告在函式身上是代表此函式沒有回傳內容。可以指定 undefind 或 null 作為值。

```ts
const void1: void = undefined;
const void2: void = null;

function fn1(): void {
  console.log('hello world');
}

const fn2: () => void = function (): void {
  console.log('hello world');
}

/*
  fn2 的類型寫法為 ()=>void 
  是指 fn2 這個變數的為一個函式，沒有傳遞變數而回傳為 void
  這裡的=>是函式的描述用途
*/
```

或者直接指定該類型為 undefind 或 null。此外任何類型都可以存在 undefined 或 null，void 則不可以（就真的空值沒有存在意義）。

```ts
const
  udf: undefined = undefined,
  nl: null = null,
  num: number = undefined, //ok
  str: string = null; //ok

console.log(udf, nl, num, str); //undefined null undefined null
```

### any 通用類型
由於 TypeScript 非常要求靜態類型的宣告，因此有必要時可使用 any 通用類型，可以像 Javascript 那樣保留動態不受限定類型。然而如果宣告變數時沒指定 type 也會被 TypeScript 當作 any。

```ts
let anyVal: any = 123;  //原為 number
anyVal = "word"; //可改為 string

let anyVar = 123; //根據推論指定為 number
anyVar = "word"; // error：類型 'string' 不可指派給類型 'number'。

let anyOne;  //無法推論，故指定為 any
anyOne = 123;
anyOne = "word";
```

### 複合類型
選擇宣告類型時，可以透過符號`|`來告知此宣告允許多種 type 格式。

```ts
let val: string | number = 123;
val = "123";
console.log(val); //123

function both(arg: number | string): string {
  return `You push is ${arg}!!`;
}
console.log(both(123), both("word")); //You push is 123!! You push is word!!
```

## 物件類型 Object types
又稱呼用戶自訂類型 User Defined Types。在 TypeScript 中所有不是原始類型的都是物件類型的子類。例如有 class、介面、函式、內建物件、陣列、元組等，我們將在後續章節中詳細介紹：

### JavaScript 內建物件
JavaScript 的內建物件總類眾多

#### 標準物件
標準的內建物件類型寫法如下，這裡不全列出，只需注意與原始類型差異為大寫命名方式。

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

#### BOM 與 DOM 物件
BOM 與 DOM 本身的物件也有各自的類型，其名字注意大概為 HTMLElement、NodeList、MouseEvent 這些常用，可嘗試不寫改由系統來推論。

```ts
let body: HTMLElement = document.body;
let id: Element = document.getElementById('myid');
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function (e: MouseEvent) {
  //
});
```

### 介面 interface
介面是一種約束行為的自訂資料類型，能要求必需含有哪些項目類型，打包成一個自訂的介面 type。常用於 object 與 class。

```ts
interface Objtype {
  name: string,
  id: number,
} /*透過介面先整理好，注意命名與數量需匹配一致*/
```

> 通常開發者命名習慣上會用字首大寫或 I 開頭，這樣能醒目知道而是一個介面類型的名稱。

#### 繼承 extends
介面也可以透過繼承觀念來得到父介面與子介面的關係。繼承觀念在 class 會再討論一次。

```ts
interface Fa {
  name: string,
  id: number,
}

interface Son extends Fa{
  sex: string
}

const obj:Son={  //error: 類型 '{ sex: string; }' 在類型 'Son' 中缺少下列屬性：name, id
  sex:'man'
}
```

#### 合併介面
當存在相同名稱的介面可視同合併成一個同名介面，但注意屬性與類型組合不可有衝突。而方法的組合衝突時等同於函式的多載效果。

```ts
interface User {
  name: string;
  id: number;
  echo(s:number):number;
}
interface User {
  id: number;
  sex: string;
  echo(s:string):string;
}

/* same as
interface User {
  name: string;
  id: number;
  sex: string;
  echo(s:number):number;
  echo(s:string):string;
}*/

interface Box {
  price: string;
}
interface Box {
  id: number;
  price: number;  //error: 後續的屬性宣告必須具有相同的類型。屬性 'price' 的類型必須是 'string'，但此處卻是類型 'number'。
}
```

### 物件 object
如果是宣告一個物件資料 JSON。定義之前一定要先使用介面並將類型都指定整理好。接著將這個介面名稱當作類型進行宣告給予變數，有些須注意：

- 這個變數 object 必需與介面擁有一樣名稱與數量，否則缺少就會報錯。

```ts
interface Objtype {
  name: string,
  id: number,
} /*透過介面先整理好，注意命名與數量需匹配一致*/

const obj: Objtype = {
  name: "loki",
  id: 0
}
```

#### 可選、任意、唯獨屬性
- 透過屬性名稱後綴`?`可指定某屬性為非約束之可選屬性，可存在也可不存在
- `[propName: string]: any` 代表任何名稱與任何的值類型，如果把 any 改成 string，會影響 id 報錯（因為這句會套用其他的屬性上）
- 透過屬性名稱前綴`readonly`，一旦被 obj 套入類型後，obj 這個屬性會獲得不可修改之狀況。

```ts
interface user {
  name: string;
  id: number;
  birthMonth?: number; //問號則可允許不存在
  [propName: string]: any; //屬性名稱與類型皆為未指定，加這個就能允許 obj 自添加
  readonly city: string;
}

const obj: user = {
  name: 'loki',
  id: 1,
  sex: 'man',
  city: 'tp'
}

console.log(obj); //{name: 'loki', id: 1, sex: 'man', city: 'tp'}

obj.city = 'nt'; //報錯：因為 'city' 為唯讀屬性，所以無法指派至 'city'。
```

注意的是`[propName: string]`等於是指任何屬性，也約束在其他已寫出的屬性，注意使用場合避免衝突。

```ts
interface user {
  name: string;
  id: number;
  [propName: string]: string; //如果這裡指定 string，介面任何 type 都必需是 string
  //也就是此邏輯套用在任何定義上
}

// 報錯：類型 'number' 的屬性 'id' 不可指派給字串索引類型 'string'。
```

### 陣列 array
陣列的指定類型方式需要多一個`[]`宣告在後餟，這樣的操作下會是陣列內所有值的類型都是同樣的，雖然不像 Javascript 自由彈性，但也是保護你的資料都是同樣 type 類型。

```ts
let ary:number[]=[123,456];
ary.push(789);  //[123,456,789]

let total:number=0;
for (const i in ary) {
  total+=ary[i];
}

console.log(ary,`SUM=${total}`);
```

如果需要彈性的類型資料，可使用複合方式達到。

```ts
let ary: (string | number)[] = ['Loki', 'Jiang', 18];
ary.push("taiwan");
console.log(ary); //(4) ['Loki', 'Jiang', 18, 'taiwan']
```

#### 搭配泛型
陣列泛型（Array Generic）的寫法是專用給陣列的一種宣告方式。透過 Array 這個 JS 原生建構式獲得類型，並且傳遞 number 作為泛型的替代。

```ts
const ary: Array<number> = [1, 2, 3];
```

> `ary:any[]` 的解讀角度比較像是 ary 本身是 any type 且為陣列結構之類型，而 `ary:Array<any>` 的解讀為 ary 從 JS 建構式 Array 獲得類型，並由泛型的指定其內容值替代為 any type。

#### 搭配介面
也可以用介面來做成約束類型給予陣列，但以下用法太複雜很少用於這種形式的陣列上。

```ts
interface Istr {
  [index: number]: string; //只要 index 是數字類型，其值為 string 類型
}

let ary: Istr[] = ['Loki', 'Jiang'];
ary.push("taiwan");
console.log(ary); //(3) ['Loki', 'Jiang', 'taiwan']
```

如果是用在陣列內的 value:Object 上就蠻適合的。

```ts
interface Staff {  //設計介面
  name: string;
  age: number;
}
let ary: Staff[] = []; //陣列內的值都是採用介面類型

ary.push({  //直接 obj 塞入 ary，當下檢查此 obj 需約束於介面 Staff
  name: 'Jasmin',
  age: 9
});

const user: Staff = {　　//先宣告一個 obj 已需約束於介面 Staff
  name: 'Roxie',
  age: 6
}
ary.push(user); //再將 obj 塞入 ary

console.log(ary);
/*
[
  {
    "name": "Jasmin",
    "age": 9
  },
  {
    "name": "Roxie",
    "age": 6
  }
]
*/
```

### 列舉 enum
enum 是一種特別的資料類型稱呼為列舉類型。能預先將一些固定的資料存入並自動提供索引 key，結果會是以物件方式保存且不可再事後添加。使用列舉類型可以獲得 key 與 value 相反對應的物件，透過以下代碼做檢視就能明白：

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
> 避免同時存在手動索引值與自動索引值共存，TypeScript 會笨笨從 0 列項開始自動賦予索引值，可能會自動地給覆蓋掉。例如`[a=2,b,c,d]`的 c 會自動拿到 2，導致 a 手動的 2 被覆蓋。

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

switch (msg as string) { //如果不指定 type 會出現 type 無法比較。因為前一行沒有宣告類型，這裡事後指定這裡的資料為字串
  case scuess:
    console.log("is scuess");
    break;
  case error:
    console.log("is warning");
    break;
}
```

#### 常數列舉 const enum
enum 可以使用 const 來宣告，差別在於編譯完成後會刪除 object 但仍可正常於 TypeScript 上去列舉資料（實際因需求而存在）。可以觀察 TypeScript 產生的 JavaScript 精省到什麼程度減少內存效能。然而因為物件不存在，所以無法反向取值透過 index 數字去找到 value。

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
console.log(constStatus.error); //'fail':string
console.log(constStatus[200]); //不可能找到，沒有物件就沒有 index
console.log(constStatus.apple); // 100:number
```

#### 聲明列舉 declare enum
聲明用途的列舉，僅檢查用途，編譯時不會有存在 object 與任何換算結果。

```ts
declare enum constStatus {
  scuess,
  error
}
```

### 元組 tuple
元組是指一種更嚴謹的陣列，相別於前面的寫法，能強迫嚴格指定每個陣列位置的類型為何。

```ts
let ary1: [string, string, number, string];
ary1 = ['Loki', 'Jaing', 18, 'Taiwan']; //必需對應正確的型態否則會錯誤

//上面兩行可簡化直接一行寫完
let ary2: [string, string, number, string] = ['Loki', 'Jaing', 18, 'Taiwan'];

console.log(ary1, ary2);
```

搭配列舉與別名的範例

```ts
enum sex { man, woman };  //列舉類型物件
type username = string; //別名
type mail = string; //別名
type age = number; //別名

let author: [username, mail, sex, age]; //設定 author 變數為元祖類型
author = ['Loki', 'summer@gmail.com', sex.man, 18]; //sex.man 會塞入 index 值

console.log(author);
//(4) ['Loki', 'summer@gmail.com', 0, 18]
```

如果搭配資料庫規劃可做成這樣的陣列宣告，將 type tuple 當作一個別名指定給陣列。

```ts
enum sex { man, woman };  //列舉類型物件
type username = string; //別名
type mail = string; //別名
type age = number; //別名
type author = [username, mail, sex, age]; //別名為元祖類型

////////////////////////////////////////////////////

let rows: author[] = []; //宣告變數為 author 這個別名類型

rows.push(['Loki', 'loki@gmail.com', sex.man, 18]);
rows.push(['Kelly', 'kelly@gmail.com', sex.woman, 16]);

console.log(rows);
/*
  (2) [Array(4), Array(4)]
  0: (4) ['Loki', 'loki@gmail.com', 0, 18]
  1: (4) ['Kelly', 'kelly@gmail.com', 1, 16]
*/
```

### 函式 Function
除了變數需要指定類型，在函式的應用上也會用到定義函式，例如傳遞引數、回傳值以及函式型變數等場合。

#### 傳遞與回傳
規則如變數一樣，在傳遞變數後綴指定類型，而回傳的資料也需要類型，寫在函式本體後綴指定類型。

```ts
function calc(price: number, tax: number): number {  //回傳類型寫在函式本身後綴
  return Math.floor(price * (1 + tax / 100));
}
console.log(calc(99, 5));  // 99*1.05=103.95=> 103
```

##### 傳遞：選配、預設、其餘
如果傳遞引數為選配，可透過`?`來指定。

```ts
function calc(price: number, tax?: number): void {  //回傳類型寫在函式本身後綴
  const tx = tax ? tax : 5;  //如果 tax 變數存在就指定，這裡不會報錯是因為透過推論得到為 number
  const total: number = Math.floor(price * (1 + tx / 100));
  console.log(total);
}

calc(100); //105
calc(100,7); //107
```
> 注意選擇性引數的順序需要於必要引數之後，不可以持有`?`的引數比沒有持有的引數還早出現。

而預設引數與 JavaScript ES6 相同觀念使用。

```ts
function calc(price: number, tax: number = 5): void {  //回傳類型寫在函式本身後綴
  const total: number = Math.floor(price * (1 + tax / 100));
  console.log(total);
}

calc(100); //105
calc(100, 7); //107
```

其餘引數 rest parameter 同 JavaScript 用法，使用`...`來表示不確定數量的引數，因為是一種陣列結構所以需宣告陣列類型。

```ts
function sumArg(...ary: number[]): void {
  let total: number = 0;
  for (const item of ary) total += item;
  console.log(total);
}
sumArg(1,2,3,4,5);
```

##### 回傳：void、never
如果沒有要回傳變數時，需函式類型為`void`來告知這個函式沒有回傳資料。

```ts
function calc(price: number, tax: number): void {  //回傳類型寫在函式本身後綴
  const total:number=Math.floor(price * (1 + tax / 100)); // 99*1.05=103.95=> 103
  console.log(total);
}

calc(99,5); //do
```

不回傳 never 與 void 很相近都是用在於不會回傳的函式，主要嚴格用在沒有結果的函式（無限迴圈或拋出錯誤），例如：

```ts
function errorMsg(message:string): never{
  throw new Error(message);
}
```

##### 超載 overload
Overload 機制用於考量同一個函式下，多種方案用途其有不同類型的引數與回傳。透過宣告定義函式持有多種載入輸出的不同類型使用。

```ts
function setConvert(arg: [string, number]): number; //函式定義：傳入 tuple 傳出 number
function setConvert(arg: number): [string, number]; //函式定義：傳入 number 傳出 tuple

function setConvert(arg: [string, number] | number): number | [string, number] { //函式實現
  enum aryCode { 'A', 'B', 'C', 'D' }; //A=0,B=1,...
  switch (typeof arg) {
    case 'number':
      const na: string = aryCode[Math.floor(arg / 5)];
      const nb: number = arg % 5;
      return [na, nb];

    case 'object':
      const oa: string = arg[0];
      const ob: number = arg[1];
      return aryCode[oa] * 5 + ob;
  }
}

console.log(setConvert(7)); // array ['B', 2]
console.log(setConvert(['B', 2])); // 7
```

> 乍看之下拿掉函式定義單靠函式實現的複合類型也能正常執行，但其真正差異於當程式開始檢查型態時會從第一組函式定義循序做檢查。

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

其 add2 的寫法不完整，雖然是透過推論出來的。如下列寫法說明解釋：`=`的右側為匿名函式比較沒有問題，差別在於等號的左邊沒有給予宣告類型這是怎樣函式。所以右側將用到的傳遞與回傳之變數類型也要同樣宣告到左邊去，才能檢查傳遞進去的引數是哪種類型，也就是等號兩邊都要對應到。

```ts
// 補充 add2 的類型，其正確的完整寫法為 add3
let add3: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
}
```
> TypeScript 中的 `=>` 和 ES6 中的 `=>` 有所不同，在 TypeScript 邏輯上的 `=>` 用來宣告 type is function 之傳遞與回傳區別定義。

如果只有一個傳遞引數，其實可以省略變數名：
```ts
let add4: (number) => number = function (x: number): number {
  return x + x;
}
```

#### 搭配介面
也可以用介面來做成約束類型給予函式

```ts
interface User {
  (name: string, age: number): void;
}

let mySearch: User = function (name: string, age: number) {
  console.log(name,age);
}

mySearch('loki', 18); //loki 18
```

#### 搭配斷言
在複合類型搭配的可能下，需要處理某類型的動作可以額外採用斷言讓系統知道這是針對複合類型的指定類型之處理。

```ts
function getLength(arg: string | number): number {
  // if (typeof arg == 'string' && arg.length) {
  if ((<string>arg).length) {
    // return arg.length;
    return (<string>arg).length;
  } else {
    return arg.toString().length;
  }
}

console.log(getLength('hello')); //5
console.log(getLength(100)); //3
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

//如果只有一個傳遞引數，可以省略變數名
let add6: (number) => number = (x: number): number => x + x;
```

##### 引數上使用箭頭函式
箭頭函式可以當作一個變數，既然是變數就能傳送到別的函式做承接使用。

```ts
function echo(num: number, fn: (number) => number) { //傳遞變數分別為數字與函式且都有宣告型態
  const total: number = fn(num); //將 num 作為傳遞引數 fn 之使用
  console.log(total);
}

const sum: (number) => number = (n: number) => n * n;//宣告 sum 這個函式主要會將引數 2 次方並回傳用途

echo(7, sum); //將數字 7 以及變數 sum 整個都傳給 echo 函式做處理。
```

### 類別 Class
類別 class 在 JavaScript ES6 開始提供使用。類別作為物件導向的物件設計藍圖應用。比較常見的在建構函式上對其使用建構子、屬性、方法其定義。一旦類別定義完成後，透過指定來獲得實例化物件。如果你還不熟悉 ES6 的類別，可一邊學習 TypeScript 的寫法與查看轉譯後的 JavaScript ES6 之 Class 寫法。

類別的規劃可以分為三個部分：
- **attribute 屬性**
為整個類別下可使用的變數，可先寫好也可以透過建構子來獲得外部引數為值。在類別內想要存取屬性都得需要透過 this 來導向至該變數位置。
- **constructor 建構子**
固定作為宣告時的特殊執行，當在外部使用 new 實例化物件時透過傳遞引數至建構子進行處理，藉此完成物件完成的初始前置動作。
- **method 方法**
類似類別下專有的函式，不需要寫 function 字眼，之後操作實例化物件時直接就能找到此函式來執行。

當設計完成時，透過 new 來實例化能呼叫這個建構式。

```ts
class info {　　//建立類別 class

  //規劃屬性變數，可固定或透過建構子來賦予
  name: string;
  age: number;
  sex: string = 'boy';

  constructor(na: string, ag: number) { //規劃建構子
    //透過建立物件當下的傳遞變數來進行處理回存到屬興趣
    this.name = na;
    this.age = ag;
  }

  echo(): string {  //規劃方法，等同函式設計無差異
    return `${this.name}'s ages is ${this.age}`;
  }
}

const obj: info = new info('Loki', 18); //建立 info 這個類別，並傳遞引數提供建構子做處理，最終獲得整個實例化物件
console.log(obj); //檢查實例化物件的內容
/*
>info {name: 'Loki', age: 18}
  age: 18
  name: "Loki"
  >[[Prototype]]: Object
    constructor: class info
    echo: ƒ echo()
    [[Prototype]]: Object
*/

console.log(obj.echo()); //呼叫物件內的方法
//Loki's ages is 18
```

#### 訪問修飾子 Access Modifier
指定類別內的屬性或方法是否可被別處使用。可前綴指定 public（預設）無限制、private（限自身 class)、protected（限自身 class 與 extends 繼承之子類別）。透過以下範例可以得到錯誤資訊說明：

```ts
class tryit {
  public x: number; //預設，可從實例化物件或繼承之子 class 所存取
  private y: number; //限定 class 自身所存取
  protected z: number; //限定 class 自身或繼承之子 class 所存取

  constructor(tox: number, toy: number, toz: number) {
    this.x = tox;
    this.y = toy;
    this.z = toz;
  }
}

const obj: tryit = new tryit(1, 2, 3);
console.log(obj.x, obj.y, obj.z);
/*
error TS2341: Property 'y' is private and only accessible within class 'tryit'.
error TS2445: Property 'z' is protected and only accessible within class 'tryit' and its subclasses.
*/

obj.y=5;
obj.z=6;
/*
error TS2341: Property 'y' is private and only accessible within class 'tryit'.
error TS2445: Property 'z' is protected and only accessible within class 'tryit' and its subclasses. 
*/
```

> 在 JavaScript ES6 版本還沒有存取修飾子這個觀念，因此 TypeScript 報錯後的編譯下都仍視同 public 存取，因此還需要搭配 Accessor 設計才完善。

修飾子也能用在建構子內的傳遞引數使用，等同於 class 的屬性之取代。直接接給屬性了

```ts
class tryit {
  /*替代
  public x: number;
  private y: number;
  protected z: number;
  */

  /*
  傳遞引數做了 2 件事情，第一個是在 class 宣告了訪問屬性，第二個將值寫到這個塞給這個訪問屬性
  */

  constructor(public x: number,private y: number,protected z: number) {
    // this.x = x;
    // this.y = y;
    // this.z = z;
  }
}

const obj: tryit = new tryit(1, 2, 3);
console.log(obj.x, obj.y, obj.z); //1 2 3
/*
error TS2341: Property 'y' is private and only accessible within class 'tryit'.
error TS2445: Property 'z' is protected and only accessible within class 'tryit' and its subclasses.
*/

obj.x = 4;
obj.y = 5;
obj.z = 6;
/*
error TS2341: Property 'y' is private and only accessible within class 'tryit'.
error TS2445: Property 'z' is protected and only accessible within class 'tryit' and its subclasses.
*/
console.log(obj.x, obj.y, obj.z); //4 5 6
```

另外一種是 readonly 的讀寫限制，可以跟訪問修飾子共存（注意寫位的順序）

```ts
class tryit {
  public readonly x: number;
  public y: number;
  protected z: number;

  constructor(tox: number,toy: number,toz: number) {
    this.x = tox;
    this.y = toy;
    this.z = toz;
  }
}

const obj: tryit = new tryit(1, 2, 3);
console.log(obj.x, obj.y, obj.z); //1 2 3
//error:'z' 是受保護屬性，只可從類別 'tryit' 及其子類別中存取。

obj.x = 4; //error: 因為 'x' 為唯讀屬性，所以無法指派至 'x'。
obj.y = 5;
obj.z = 6; //error: 'z' 是受保護屬性，只可從類別 'tryit' 及其子類別中存取。
```

#### 存取器 Accessor
假設屬性或方法已經設定 private 情況下，添加 Accessor 的功能達到寫入與讀取的唯一窗口。Accessor 採用 Method 方法的函式形式來設計，分為 get（讀）與 set（寫）關鍵字使用。將前段的例子做調整（簡化移除 protected 考量）：

```ts
class tryit {
  public x: number; //公開
  private y: number; //私有，限定 class 自身所存取

  get yy(): number { //創造 get yy 函式，作為外部讀取的方法，有 return 但不可有傳遞引數
    return this.y; //從內部轉達屬性值
  }

  set yy(newNum: number) {  ////創造 set yy 函式，作為外部寫入的方法，不可有 return 但有傳遞引數
    this.y = newNum;  //從內部改變屬性值
  }

  constructor(tox: number, toy: number) {
    this.x = tox;
    this.y = toy;
  }
}

const obj: tryit = new tryit(1, 2); // 實例化物件
obj.yy=5; //透過 set yy 當窗口改寫物件屬性，實際上變化發生在 class 內
console.log(obj.x, obj.yy);  //讀取也是透過 get yy 來外部獲得
```
> get 視同唯讀不可有傳遞變數，而 set 視同唯寫不可有回傳變數。否則 TypeScript 會報錯。

如此一來 TypeScript 已符合存取條件不再報錯，同時這裡大多數的人不會額外命名，會把內部變數名稱與對外變數名稱以 `_` 一字之差來做提示自己。另外也可以添加通關密碼來做存取器的條件。

```ts
const
  readpwd: string = 'lokineedget111',
  writepwd: string = 'lokineedset111';

class tryit {
  public x: number; //預設，可從實例化物件或繼承之子 class 所存取
  private _y: number; //限定 class 自身所存取

  get y(): number | never {
    if (readpwd && readpwd == 'lokineedget') return this._y;
    else throw 'get no access';
  }

  set y(newNum: number) {  //不可回傳所以不寫 return:type
    if (writepwd && writepwd == 'lokineedset') this._y = newNum;
    else console.error(':set no access');
  }

  constructor(tox: number, toy: number) {
    this.x = tox;
    this._y = toy;
  }
}

const obj: tryit = new tryit(1, 2);

obj.y = 5; //set no access
console.log(obj.x, obj.y); ////get no access
```

#### 繼承 extends
繼承如名詞解釋，可以新建立一個的子類別 class 來繼承父類別 class 的所有項目（屬性與方法）。在建立子類別當下描述寫入繼承自何處`class newClass extends SourceClass {}`。

子類別除了來自父類別的繼承，也能添加自己特有的項目（但此觀念不可反向適用於父類別身上）。而子類別不能直接使用父類別的建構子，必需透過 super 關鍵字來呼叫父類別的建構子與方法。以下範例觀察父子類別之特性：

```ts
class father {
  public money: number;
  public face: string;
  public lastName: string = 'jiang';

  constructor(m: number, f: string) {
    this.money = m;
    this.face = f;
  }

  print(): string {
    return `俺姓${this.lastName}，顏值如${this.face}且身價有${this.money}個億。`;
  }
}

class son extends father {　//son 會繼承 father 內的屬性與方法
  public iq: number;  //這屬性寫在自身 class 只有 son 有，father 不會持有

  constructor(m: number, f: string, i: number) { 
    super(m, f); //使用建構子必需就得有 super 才能操作 father 的建構子
    this.iq = i;
  }

  print2(): string {
    return `我姓${this.lastName}，拜老爸所賜顏值如${this.face}且身價有${this.money}個億。我的 IQ 有${this.iq}高`;
  }
}

const objf = new father(5, 'gold5'); //實例化物件只是從寫死的 class 建構物件出來，因此 class 的初始引數永遠是乾淨的
const objs = new son(10, 'sliver5', 157); // 因此不可誤會 money 跟 face 可省略不寫，還是得跑一次初始建構作業，只是 son 已經從 father 繼承了不用宣告屬性

console.log(objf, objs);
/*
father {lastName: 'jiang', money: 5, face: 'gold5'}
son {lastName: 'jiang', money: 10, face: 'sliver5', iq: 157}
*/

console.log(objf.print()); //俺姓 jiang，顏值如 gold5 且身價有 5 個億。

console.log(objs.print());  //father 方法也會繼承給 son
//俺姓 jiang，顏值如 sliver5 且身價有 10 個億。

console.log(objs.print2()); //我姓 jiang，拜老爸所賜顏值如 sliver5 且身價有 10 個億。我的 IQ 有 157 高
```

##### 抽象類別 abstract 
對 class 指定為 abstract 模式，則能保護此 class 無法透過 new 實例化出來，只能被子 class 所繼承使用。

```ts
abstract class father { //抽象化無法被 new 使用
  public money: number;
  public face: string;

  constructor(m: number, f: string) {
    this.money = m;
    this.face = f;
  }
}

class son extends father {　//son 會繼承 father
  public iq: number;

  constructor(m: number, f: string, i: number) { 
    super(m, f); //使用建構子必需就得有 super 才能操作 father 的建構子
    this.iq = i;
  }
}

const objf = new father(5, 'gold5'); //error：無法建立抽象類別的執行個體。
const objs = new son(10, 'sliver5', 157); //OK

console.log(objf, objs);

/*
father {money: 5, face: 'gold5'}
son {money: 10, face: 'sliver5', iq: 157}
*/
```

> 這裡雖然會報錯，但編譯後的 JavaScript 還是存在父 class。

##### 複寫 Override
設計繼承時，如果 son 的方法跟來自 father 的方法撞名時，會發生複寫現象並以 son 自身為主。需特別注意：

```ts
class father {
  public money: number;
  public face: string;
  public lastName: string = 'jiang';

  constructor(m: number, f: string) {
    this.money = m;
    this.face = f;
  }

  print(): string {
    return `俺姓${this.lastName}，顏值如${this.face}且身價有${this.money}個億。`;
  }
}

class son extends father {
  public iq: number;

  constructor(m: number, f: string, i: number) {
    super(m, f);
    this.iq = i;
  }

  print(): string {
    return `我姓${this.lastName}，拜老爸所賜顏值如${this.face}且身價有${this.money}個億。我的 IQ 有${this.iq}高`;
  }
}

const objf = new father(5, 'gold5');
const objs = new son(10, 'sliver5', 157);

console.log(objf.print()); //俺姓 jiang，顏值如 gold5 且身價有 5 個億。
console.log(objs.print()); //俺姓 jiang，顏值如 sliver5 且身價有 10 個億。
```

假設需要相同方法名稱下，你該考慮的方向很簡單，就是有兩個 class 可以新建構，你想選哪個做方法 print 使用：

```ts
class father {
  public money: number;
  public face: string;
  public lastName: string = 'jiang';
  constructor(m: number, f: string) {
    this.money = m;
    this.face = f;
  }
  print(): string {
    return `俺姓${this.lastName}，顏值如${this.face}且身價有${this.money}個億。`;
  }
}

class son extends father {
  public iq: number;
  constructor(m: number, f: string, i: number) {
    super(m, f);
    this.iq = i;
  }
  print(): string {
    return `我姓${this.lastName}，拜老爸所賜顏值如${this.face}且身價有${this.money}個億。我的 IQ 有${this.iq}高`;
  }
}

let obj: father = null;
/*
利用技巧性，先創設一個變數為 null，但事後需要存入實例化物件，因此宣告類型為 father 物件
因為 son 有 father 的繼承，所以如果存入 son 的實例化物件不會有事，反若改用 son 當此 obj 類型則會失敗
*/

const who: number = 2;
switch (who) {
  case 1:
    obj = new father(5, 'gold5');
    break;
  case 2:
    obj = new son(10, 'sliver5', 157);
    break;
}

console.log(obj.print());
```

#### 靜態 static
大多知道，透過實例化出來的物件的內容，可透過建構子在建構化過程中以 this 的物件導向觀念去修改值，也能實例化後再自行修改物件內容。

```ts
class father {
  public money: number;
  public face: string;
  public lastName: string = 'jiang';
  constructor(m: number, f: string) {
    this.money = m;
    this.face = f;
  }
  print(): string {
    return `俺姓${this.lastName}，顏值如${this.face}且身價有${this.money}個億。`;
  }
}

let obj = new father(5, 'gold5');

obj.lastName="chen";
console.log(obj.print()); //俺姓 chen，顏值如 gold5 且身價有 5 個億。

let obj2= new father(10, 'sliver5');
console.log(obj2.print()); //俺姓 jiang，顏值如 sliver5 且身價有 10 個億。
```

然而如果一開始類別內的屬性或方法有設定 static 狀態時，這個對象就只限定給 class 使用，無法透過在外部從 this 導向呼喚出來。

```ts
class father {
  public money: number;
  public face: string;
  public static lastName: string = 'jiang'; //獲得 static 的屬性，只會配置於 class 內，之後無法透過物件導向 this 呼叫使用
  constructor(m: number, f: string) {
    this.money = m;
    this.face = f;
  }
  print1(): string {
    return `俺姓${this.lastName}，顏值如${this.face}且身價有${this.money}個億。`;
    //報錯，無法透過 this 找到靜態的 lastName
  }
  print2(): string {
    return `俺姓${father.lastName}，顏值如${this.face}且身價有${this.money}個億。`;
    //直接從 class 獲取這個屬性，而不是用 this 導向找到
  }
}

let obj1 = new father(5, 'gold5'); //ok
console.log(obj1); //father {money: 5, face: 'gold5'}

obj.lastName="chen"; //報錯不存在，這裡只是後製強塞一個 key:value
console.log(obj.print1()); //俺姓 chen，顏值如 gold5 且身價有 5 個億。

let obj2= new father(10, 'sliver5'); //ok
console.log(obj2.print2()); //俺姓 jiang，顏值如 sliver5 且身價有 10 個億。
```

#### 搭配介面
interface 如果套用在 class 的屬性也是一種約束作業，多個 class 除了繼承這種 1 對多個觀念，還有一種狀況為這些 class 彼此有相同非繼承的特性（屬性與方法），可以用介面來將這些共同特性設為約束產生完整的靈活性。 
- class 要指定介面時必需要透過 implements 實現約束。
- class 可綁定多個介面，介面名稱使用`,`符號分開。例如 `class lokiwithface implements User, Company`

```ts
interface User {  //介面，約定持有 2+1 個屬性與方法
  name: string;
  id: number;
  print(): string;
}

class lokiwithface implements User { //根據 implements 來實踐介面 user，因故不可缺少此 name,id,print()
  public name: string; //必存
  public id: number; //必存
  public sex: string = 'man'; //可以多增加介面沒有的

  constructor(n: string, i: number) {
    this.name = n;
    this.id = i;
  }
  print(): string { //必存
    return `#${this.id} ${this.name}`;
  }
}
class lokionly { //對造組，跟介面無關的 class
  public name: string;
  public id: number;
  public sex: string = 'man';
  constructor(n: string, i: number) {
    this.name = n;
    this.id = i;
  }
  print(): string {
    return `#${this.id} ${this.name}`;
  }
}

const a1: user = new lokiwithface('loki', 1);   //"介面約束的 class" 來實例化物件
const a2: lokionly = new lokionly('loki', 1);   //"普通的 class" 來實例化物件
const a3: user = {                              //"介面約束的 object" 來設計 object
  name: 'loki',
  id: 1,
  sex: 'man', //報錯，不可以規劃 user 介面所沒有的東西
  print(): string {
    return `#${this.id} ${this.name}`;
  }
};

console.log(a1, a1.print());
console.log(a2, a2.print());
console.log(a3, a3.print());

//結果來說差異不大，都能 print 相同內容。
```

介面也可以反過來繼承自 class 認父來擴展介面內的屬性或方法。再提供給 object 或 class 做約束。

```ts
class User {
  name: string;
  age: number;
}
interface Member extends User {
  id: number;
  /*
  因為繼承，等於多了這兩項
  name: string;
  age: number;
  */
}
let obj: Member = { name: 'Loki', age: 18, id: 3 };
```

介面能約束 class 的屬性與方法，也能約束

##### 舉例 多個 class 有相同特性
能會發現一個介面對應一個 class 的使用意義不大，有點事是多此一舉的動作。介面真正的用途在於一個介面去約定多個 class 才是他真正價值。舉例且說明如下：

1. 3 個 class 代表法術說明應用，1 個 class 代表使用法術之遊戲按鈕。
2. clsBoth 這個 class 有前 2 個 class 相同用途。
3. joycon 這個 class 會透過傳遞的實例化物件來執行法術的應用。

```ts
class clsAdd { //補血效果
  target: string;
  constructor(t: string) {
    this.target = t;
  }
  addHP(): void {
    console.log(`使用${this.target} +自身血`);
  }
}

class clsSub { //扣血效果
  target: string;
  constructor(t: string) {
    this.target = t;
  }
  subHP(): void {
    console.log(`使用${this.target} -敵人血`);
  }
}

class clsBoth { //補扣血效果
  target: string;
  constructor(t: string) {
    this.target = t;
  }
  addHP(): void {
    console.log(`使用${this.target} +自身血`);
  }
  subHP(): void {
    console.log(`使用${this.target} -敵人血`);
  }
}

class joycon {
  static btnA(e: clsAdd) { //按鈕 A 將執行傳入引數 class 的 add 詠唱
    e.addHP();
  }
  static btnB(e: clsSub) { //按鈕 B 將執行傳入引數 class 的 sub 詠唱
    e.subHP();
  }
}

const spell_1 = new clsAdd('恢復術'); // 恢復術 代號 spell_1 能補自身血
joyCon.btnA(spell_1); //按下按鈕 A 觸發 spell_1

const spell_2 = new clsSub('傷害術'); // 傷害術 代號 spell_2 能扣敵人血
joyCon.btnB(spell_2); //按下按鈕 B 觸發 spell_2

const spell_3 = new clsBoth('聖光術'); // 聖光術 代號 spell_3 能補自身血也能扣敵人血
joyCon.btnA(spell_3); //按下按鈕 C 觸發 spell_3
joyCon.btnB(spell_3); //按下按鈕 D 觸發 spell_3
```

在沒有介面的約束情況下，這些 class 等於是各自提供自己 type 來告知傳遞內容物為何。一旦加上介面整個物件導向的流程會明確清晰：

- 3 個法術 class 都是根據介面約束的定義 method 之應用。
- joycon 拿到傳遞引數之 type 不再是 cls* 之 class，而是這些共同約束 itf* 之介面當作 type。

```ts
interface itfAdd {
  addHP(): void;
}
interface itfSub {
  subHP(): void;
}

class clsAdd implements itfAdd { //補血效果
  target: string;
  constructor(t: string) {
    this.target = t;
  }
  addHP(): void {
    console.log(`使用${this.target} +自身血`);
  }
}

class clsSub implements itfSub { //扣血效果
  target: string;
  constructor(t: string) {
    this.target = t;
  }
  subHP(): void {
    console.log(`使用${this.target} -敵人血`);
  }
}

class clsBoth implements itfAdd, itfSub { //補扣血雙效果，綁兩個介面可用符號 ',' 表示
  target: string;
  constructor(t: string) {
    this.target = t;
  }
  addHP(): void {
    console.log(`使用${this.target} +自身血`);
  }
  subHP(): void {
    console.log(`使用${this.target} -敵人血`);
  }
}

class joyCon {
  static btnA(e: itfAdd) { //按鈕 A 將執行傳入引數 e 的 add 詠唱
    e.addHP();
  }
  static btnB(e: itfSub) { //按鈕 B 將執行傳入引數 e 的 sub 詠唱
    e.subHP();
  }
}

const Spell_1 = new clsAdd('恢復術'); // 恢復術 代號 Spell_1 能補自身血
joyCon.btnA(Spell_1); //按下按鈕 A 觸發 Spell_1

const Spell_2 = new clsSub('傷害術'); // 傷害術 代號 Spell_2 能扣敵人血
joyCon.btnB(Spell_2); //按下按鈕 B 觸發 Spell_2

const Spell_3 = new clsBoth('聖光術'); // 聖光術 代號 Spell_3 能補自身血也能扣敵人血
joyCon.btnA(Spell_3); //按下按鈕 A 觸發 Spell_3
joyCon.btnB(Spell_3); //按下按鈕 B 觸發 Spell_3
```

> 如果問這兩段代碼的差異在哪，最大差別在於 type 是否是指向同一個宣告領域。

# 進階技巧
避免後續介紹太複雜，這裡先偷跑一些需要的 type 觀念做初步介紹，詳細用法會在各單元再出現時依據必要性提供說明。

## 別名機制
類型本身可以使用別名來登記，再透過套用別名方式來達到宣告類型。舉例如下：

```ts
type userName = string;
type userAge = number;
//宣告這些別名且持有類型

let a: userName = "Loki";
let b: userAge = 18;
//透過別名獨立額外寫成類類型名，能讓變數使用上更直覺清楚

console.log(a, b);

/******to js
  let a = "Loki";
  let b = 18;
  console.log(a, b);
*/
```

### 字串字面值 (String Literal)
透過別名並指定限定的字串多個選擇限定。範例定義了一個字串字面值之類型為 EventNames 只接受三種字串中的一種。

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(el: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // ok
handleEvent(document.getElementById('world'), 'dbclick'); // error: 類型 '"dbclick"' 的引數不可指派給類型 'EventNames' 的參數。
}

handleEvent(document.getElementById('hello'), 'scroll');  // ok
handleEvent(document.getElementById('world'), 'dbclick'); // 報錯，event 不能為 'dbclick'

```

## 泛型 Generics
泛型的應用就是將規劃類型當下不先做宣告，在變數名稱後綴先使用`<關鍵字>`作替寫，等到執行函式時當下傳入的值再做類型說明。可適用於函式、介面、類別等各種場合出現。

### 用於函式
舉例以下設計 any 的傳遞引數與回傳如下。雖然整個函式都看似正常。如果 any 的思考則僅要求傳遞與回傳的類型是相同的，也就傳遞與回傳為 `string and string[]`就跟目前的`any and any[]`設計不適當。

```ts
function ary(value: any): any[] { //回傳 any 陣列
  let re = []; //不寫，系統自動為 any
  re.push(value);
  return re;
}

console.log(ary('A')); // (2) ['A', 'A']
console.log(ary(3)); // (2) [3, 3]
console.log(ary(true)); // (2) [true, true]
```

此時可透過泛型先做替代的類型，等到執行函式當下決定用什麼類型來決定傳遞與回傳類型。

```ts
function ary<T>(value: T): T[] { //函式名稱後面使用<T>來指定泛型，其中 T 為關鍵字。接著在函式內部包含傳遞回傳都能用 T 這個類型名
  let re: T[] = []; //指定 T type
  re.push(value);
  return re;
}

//在使用函式時，提供真正 type 為泛型替換
console.log(ary<string>('A')); // (2) ['A', 'A'] 
console.log(ary<number>(3)); // (2) [3, 3]

//如果沒有指定給泛型，系統會自動推論 type 給泛型
console.log(ary(true)); // (2) [true, true]
```

#### 多個泛型

泛型能允許多個存在，使用符號`,`來分開。

```ts
function swap<T, U>(val: [T, U]): [T, U] { //回傳元祖
  return [val[1], val[0]];
}

let tpl: [string, number] = ['A', 1];

//故意不寫泛型的真實 type，讓系統自己去推論
console.log(swap(tpl)); // (2)  [1, 'A']
```

#### 泛型條件約束
另外有 2 個在函式上使用泛型的報錯現象值得討論，在使用泛型時在不清楚真實 type 之前，任何操作都可能因 type 不對盤而報錯。

```ts
function calc1<myType>(price: myType): myType {  //myType 是泛用類型，作為暫定類型使用
  return price * 1.05;  //報錯，雖邏輯正確，但一開始預先不知道這是一個數字 type 不被認同數字計算
  
}
console.log(calc1<number>(100)); //將 number 提供給泛型做替換
/*
  類型 'number' 不可指派給類型 'myType'。
  'myType' 可以使用與 'number' 無關的任意類型來具現化。
*/
```

原因為 myType 無法進行算術符號，因此透過繼承來獲得 number type 的形狀，使得該泛型能進行對盤的操作。

```ts
function calc2<myType extends number>(price: myType): myType {  //可透過 extends 繼承 number，那麼這個 myType 初始情況下有 number 的定義可允許先接受數字計算
  return price * 1.05;
}
console.log(calc2<number>(100));

function calc3<T extends number, U extends number>(price: T, tax: U): number {  //多個泛型傳遞引數之寫法
  return price * (1 + tax / 100);
}
console.log(calc3<number, number>(100, 7));
```

另外一個問題如下：

```ts
function long<myType>(str: myType): number {  // 未知確定 string 情況下，沒有 length 的原生屬性
  return str.length;  //error: 類型 'myType' 沒有屬性 'length'。
}
console.log(long<string>('HELLO'));  //5
```

原因為 myType 沒有 length 這個屬性，因此 myType 透過繼承方式從介面來獲得 length 這個屬性形狀。注意這裡是用 extends 來繼承做形狀擴展，不是前面範例當作類型賦予。但如果傳進來資料不是 string 就不符合介面的約束報錯。

```ts
interface Plus{
  length: number;
}
function long<myType extends Plus>(str: myType): number {  // 未知 string 情況下，沒有 length 的猿聲屬性
  return str.length;  //ok
}
console.log(long<string>('HELLO'));  //5
console.log(long<number>(100));  //error: 類型 'number' 不符合條件約束 'Plus'。
```

最後一個技巧為泛型與泛型進行約束。下列函式設計用途說明如下：

- 將泛型 T 繼承至泛型 U，不討論兩者形狀是否雷同。我們最終目的為來源資料（套用泛型 U) 能判斷可否覆蓋至目標資料（套用泛型 T ) 上。
- 因為泛型 T 繼承了 U，所以 T 已受到約束必需持有 U 該有的屬性欄位。
- 當第一次函式執行時目標 T 類型為 a,b,c，而來源 U 為 b,c。因此程式可以正常執行。
- 而第二次函式執行時目標 T 類型為 a,b,c，而來源 U 為 d,c。因為 T 繼承了 U 所以應該需要 abcd 這些屬性。而傳入的 data 只有 abc 導致類型不符合產生報錯，達到偵測錯誤之目的。

```ts
function overWrite<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}

let data = { a: 1, b: 2, c: 3 };

console.log(overWrite(data, { b: 10, c: 20 }));  //{a: 1, b: 10, c: 3, d: 20}

console.log(overWrite(data, { d: 10, c: 20 }));  //error:
/*
類型 '{ a: number; b: number; c: number; }' 的引數不可指派給類型 '{ d: number; c: number; }' 的引數。
類型 '{ a: number; b: number; c: number; }' 缺少屬性 'd'，但類型 '{ d: number; c: number; }' 必須有該屬性。
*/
```

### 用於搭配介面的函式
三者合併示範搭配介面的函式如何整合泛型的應用。透過前面找到搭配介面的函式進行步驟說明：

```ts
//由介面來約束 mySearch 的 type 形狀如何。
interface User {
  (name: string, age: number): void;
}

let mySearch: User = function (name: string, age: number) {
  console.log(name,age);
}

mySearch('loki', 18); //loki 18
```

- 接著把 age 這個引數之類型 number 換成泛型名稱 T，有兩個地方要替換泛型 T。
- 函式綁定泛型如出一轍的替換；而介面的形狀寫法為 function 的形狀，因此介面綁泛型的方式與位置相同。
- 最後在函式執行的引數上指定泛型真正型態為 number，若省略此步驟其系統將自動推論出 number 給泛型。

```ts
interface User {
  <T>(name: string, age: T): void; //這裡是函式形狀有綁泛型
}

let mySearch: User = function <T>(name: string, age: T) {
  console.log(name, age);
}

mySearch('loki', <number>18); //loki 18
```

- 介面綁泛型的方式也可寫在外面。缺點於 mySearch 這個類型指定就必需告知實際 type 不然會報錯。

```ts
interface User<T> { //變成是 User 這裡綁泛型
  (name: string, age: T): void;
}

let mySearch: User<number> = function <T>(name: string, age: T) {  //理所當然使用 User 這個介面告知泛型的實際 type
  console.log(name, age);
}

mySearch('loki', <number>18); //loki 18
```

### 用於類別
用法差不多，從前面單元找範例調整一下來綁泛型：

```ts
class info {
  name: string;
  age: number;

  constructor(na: string, ag: number) {
    this.name = na;
    this.age = ag;
  }

  echo(): string {
    return `${this.name}'s ages is ${this.age}`;
  }
}

const obj: info = new info('Loki', 18);
console.log(obj.echo()); //Loki's ages is 18
```

- 將 class 內的 string 替換成泛型，而 class 外面使用`<T>`做泛型綁定。
- class 內的所有 string 換成關鍵字 T
- new info 時可以告知泛型實際 type，或者讓系統推論
- obj 指定時可選擇告知為 class 類型，但必需要告知 class 的泛型 type
- 會發現 echo() 方法的回傳報錯，既使透過約束 extends string 也無效。

```ts
class info<T extends string> {
  name: T;
  age: number;

  constructor(na: T, ag: number) {
    this.name = na;
    this.age = ag;
  }

  echo(): T {
    return `${this.name}'s ages is ${this.age}`;
    //error: 這裡因回傳一定是 string，泛型 T 無法確保其他可能，因此建議你乾脆直接寫 string 才對
  }
}

const obj: info<string> = new info<string>('Loki', 18); // 等號：左邊無法推論需綁定；右邊可推論 Loki 為 string
console.log(obj.echo()); //Loki's ages is 18
```

改回固定的 string 回傳，畢竟很明顯只有 string 一種可能，也取消約束必要性。

```ts
class info<T> {
  name: T;
  age: number;

  constructor(na: T, ag: number) {
    this.name = na;
    this.age = ag;
  }

  echo(): string {
    return `${this.name}'s ages is ${this.age}`;
    //error: 這裡因回傳一定是 string，泛型 T 無法確保其他可能，因此建議你乾脆直接寫 string 才對
  }
}

const obj: info<string> = new info<string>('Loki', 18); // 等號：左邊無法推論需綁定；右邊可推論 Loki 為 string
console.log(obj.echo()); //Loki's ages is 18
```

### 泛型之預設 type
泛型可以預先綁定一組預設 type，如果外部沒有特別告知時會先嘗試自行推論，無法推論時會採用此預設 type

```ts
function ary<T = string>(value: T): T[] {  
  let re: T[] = []; //指定 T type
  re.push(value);
  return re;
}
```

---

## 宣告檔案
當專案內有使用一些第三方套件時，由於非 JavaScript 核心的關鍵名稱會導致 TypeScript 無法辨識產生錯誤。因此需要額外對這些關鍵名稱給予定義。舉例 jQuery 來解釋：

```ts
$("#title").html('hello world');  //找不到名稱 '$'。需要安裝 jQuery 的型別定義嗎？請嘗試 `npm i --save-dev @types/jquery`。
```

這裡不認識`$`符號，但 TypeScript 回報懷疑是 jQuery 並建議你從第三方函式庫 npm 來安裝@type 擴充包來補充 jQuery 類型定義。跟著往下看：

### 獲取 npm 上的 @type
現在你可以嘗試使用 TypeScript 所提示的 npm 安裝 jQuery 類型定義擴展，透過 npm 來獲得指示上的指令，其中中的`i` 等價 `install`。

```npm npm
npm i --save-dev @types/jquery
```

> 如果你有手動宣告這些第三方套件的類型定義會告知衝突存在，例如「無法重新宣告區塊範圍變數 '$'」。移除手動的 `.d.ts` 檔案即可。

未來任何第三方套件都能嘗試從 npm 尋找現成的 type 定義擴展包。官方提供 [TypeScript: Search for typed packages](https://www.typescriptlang.org/dt/search) 網頁查詢。注意安裝來源的是`@types/*`而不是套件本身。

![範例：搜尋 Bootstrap](https://i.imgur.com/Cd776ku.png)

### 宣告行為 declare
假設不透過 npm 獲取 npm 上的 @type，或在上面找不到第三方套件之類型定義包，只能手動來宣告檔案之類型定義。原理為在編譯檔案`*.ts`之前會從檔案`*.d.ts`讀取內容作為宣告的前置作業。因此你可以在這個環節設計一些做為全域類型作用的變數、函式、類別等物件。使得之後的 TypeScript 編譯當下能獲得認知。

#### 宣告變數 declare var
最簡單的作法並同樣採用 jQuery 來示範。請移除從 npm 獲得的任何檔案目錄做練習。

1. 我們需要將`$()`這個函式補充類型之形狀，就能正常解析並將`$`當作一個（函數型）變數來處理
2. 宣告的描述習慣上不會跟 TypeScript 之內容放在一起（當然堅持也可以）。另創立`*.d.ts`檔案可放置在任何位置。
3. 每次編譯 TypeScript 會試著優先從專案內這些`*.d.ts`先理解宣告內容才會開始解析內容。

```ts jQuery.d.ts
declare var $: (selector: string) => any;
/* declare var 為宣告全域 var */
```
> 假如仍然無法解析，那麼可以檢查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，確保其包含了 `jQuery.d.ts` 檔案。

`declare`作為宣告，接著變數 var,let,const 都可以給予`$`這個變數，但注意使用 const 就無法再修改。建議用 const 避免宣告定義被改寫。

> 這裡為了練習方便都合併在 test.ts 上一起寫並注意順序，不再宣告寫至 `*.d.ts`。

```ts test.ts
declare const $: (selector: string) => any;
//declare (var|let|const) 只能用在定義類型，不可用在其他用途，例如：
/* 錯誤示範
declare const $ = function (dom) {
  return document.querySelector(dom);
};
*/

$("#title").html('hello world');  //找不到名稱 '$'。需要安裝 jQuery 的型別定義嗎？請嘗試 `npm i --save-dev @types/jquery`。

//嘗試重新修改$失敗
$ = function (dom) {  //error: 因為 '$' 為常數，所以無法指派至 '$'。
  return document.querySelector(dom);
};
```

#### 宣告函式 declare function
作為宣告一個全域方法。前例為`$`當作一個函數型變數，這裡將`$`當作一個函式（方法）來處理。如此一來，全域範圍下都認識這個 function 之類型。

```ts test.ts
declare function $(selector: string): any;
```

也支援多載應用寫法

```ts
// in jQuery.d.ts
declare function $(selector: string): any;
declare function $(domReadyCallback: () => any): any;

//in test.ts
$("#title").html('hello world');
$(function() {
    console.log('document ready!');
});
```

#### 宣告類別 declare class
這裡沒辦法用 jQuery 來說明，假設你已經持有一個來自第三方的 class 為`plugin.js`且已透過`<script src=>`加入專案，現在就是欠缺這個 class 的類型描述。

```js plugin.js
//這是現成的 js 且沒有 TypeScript 所需要的 Type
class user {
  name;
  age;
  sex = 'boy';

  constructor(na, ag) {
    this.name = na;
    this.age = ag;
  }

  echo() {
    return `${this.name}'s ages is ${this.age}`;
  }
}
```
```ts test.ts
const obj: user = new user('Loki', 18); // error: 找不到名稱 'user'。
```

因此 TypeScript 需要於全域部分進行宣告 class 之類型。

```ts test.ts
declare class user{
  name:string;
  age:number;
  sex:string;

  constructor(na:string,ag:number);

  echo():string;
}

const obj: user = new user('Loki', 18); // error: 找不到名稱 'user'。
```

>寫到這已開始明白當匯入自其他處的 js 檔案時，在 ts 檔案上嘗試使用該 js 資料物件因缺乏 type 而無法編譯，declare 就是根據不同物件類型有不同的用法。

#### 宣告列舉 declare enum
同樣主要是在全域上宣告指定列舉之類型。

```ts
// in jQuery.d.ts
declare enum lokiStatus { scuess, warn, error }

//int test.ts
let st = [lokiStatus.scuess, lokiStatus.warn, lokiStatus.error];
```

#### 宣告命名空間 declare namespace
用來表示一個組合性的自訂模組，例如 jQuery 有多種方法、屬性、建構式。可以透過命名空間一次組合起來宣告這些類型。

```ts
// in jQuery.d.ts
declare namespace $ {
  function ajax(url: string, settings?: any): void;
  const version: number;
  class Event {
    blur(eventType: EventType): void
  }
}

// in test.ts
$.ajax('/api/get_something');
console.log($.version);
const e = new $.Event();
```

命名空間可使用巢狀結構，再包一個命名空間之組合。

```ts
// in jQuery.d.ts
declare namespace $ {
  function ajax(url: string, settings?: any): void;
  namespace fn {
    function extend(object: any): void;
  }
}

//in test.ts
$.ajax('/api/get_something');
$.fn.extend({
  check: function () {
    return this.each(function () {
      this.checked = true;
    });
  }
});
```

其中的 fn 如果僅單獨抽取出來宣告命名，可以寫成以下宣告。

```ts test.ts
declare namespace $.fn {
  function extend(object: any): void;
}

$.fn.extend({
  check: function () {
    return this.each(function () {
      this.checked = true;
    });
  }
});
```

#### 介面與別名
這裡不是使用 declare 來操作宣告，而是只是將介面與別名放置到`*.d.ts`提升到外部作為全域類型使得整份專案都能讀到。

```ts
// in jQuery.d.ts
interface AjaxSettings {
  method?: 'GET' | 'POST'
  data?: any;
}

declare namespace jQuery {
  function ajax(url: string, settings?: AjaxSettings): void;
}

// in test.ts
let settings: AjaxSettings = {
  method: 'POST',
  data: {
    name: 'foo'
  }
};

jQuery.ajax('/api/post_something', settings);
declare namespace jQuery {
  function ajax(url: string, settings?: AjaxSettings): void;
}
```

然而提升到外部的宣告區則承擔了曝光風險，包含了可能取名上重複，可以技巧性地放置在已知的命名空間底下。

```ts
// in jQuery.d.ts
declare namespace $ {
  interface AjaxSettings {  //把特定介面放在$這個命名空間內
    method?: 'GET' | 'POST'
    data?: any;
  }
  function ajax(url: string, settings?: AjaxSettings): void;
}

// in test.ts
let settings: &.AjaxSettings = {  //使用介面時，透過$.AjaxSettings 來找到
  method: 'POST',
  data: {
    name: 'foo'
  }
};
$.ajax('/api/post_something', settings);
```

#### 宣告合併
當宣告不同物件類型且同名時是可以視同兩者合併不會影響。舉例 jQuery 來示範。

```ts
// in jQuery.d.ts
declare function $(selector: string): any;
declare namespace $ {
  function ajax(url: string, settings?: any): void;
}

//in test.ts
$('#foo');
$.ajax('/api/get_something');
```

## 開發套件之類型包
暫時無法消化反芻，等待花暖春開之時便是更新之日。有興趣請自詳閱[這裡](https://willh.gitbook.io/typescript-tutorial/basics/declaration-files#npm-tao-jian)

To Be Continued...

# 參考文獻
- [TypeScript: TSConfig Reference - Docs on every TSConfig option](https://www.staging-typescript.org/tsconfig)
- [Tasks in Visual Studio Code](https://code.visualstudio.com/docs/editor/tasks)
- [TypeScript 入门教程](https://ts.xcatliu.com/)
- [Will 保哥 - TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/)