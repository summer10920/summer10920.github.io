---
title: "[基礎課程] JavaScript 教學（二）：資料處理"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
  - JavaScript
  - 前端入門
date: 2025-08-02 17:27:33
---
![](assets/images/banner/js.png)

JavaScript 是現代網頁開發不可或缺的程式語言，它讓原本靜態的 HTML 網頁能夠擁有動態互動功能。本教學將從零開始，循序漸進地介紹 JavaScript 的基礎觀念。

<!-- more -->

JavaScript 是一種「腳本語言」（Scripting Language），最初設計用於網頁瀏覽器中，讓開發者能夠對瀏覽器下達指令，動態操作網頁內容。透過 JavaScript，我們可以根據特定的語法，要求瀏覽器執行各種動作，例如：

- 動態修改畫面上的 HTML 結構或樣式
- 偵測並回應使用者的互動（如點擊、輸入、滑鼠移動等事件）
- 執行各種運算與資料處理
- 與伺服器進行資料交換（如 AJAX 技術）

{% note info %}
  **小技巧：現代 JavaScript 的應用**
  除了在瀏覽器中操作網頁，現代 JavaScript 也能在伺服器端（如 Node.js）、行動裝置、桌面應用程式等多種環境中運行，應用範圍非常廣泛。
{% endnote %}

{% note primary %}
**學習環境準備：**
- 現代瀏覽器（Chrome、Firefox、Safari、Edge）
- 使用 <kbd>F12</kbd> 開啟開發者工具
- 在 Console 分頁中練習程式碼
- 建議安裝 Visual Studio Code 作為程式編輯器
{% endnote %}

# 大型資料型別與處理

當我們需要處理大量相關資料時，單純的變數就不夠用了。JavaScript 提供了陣列和物件兩種重要的資料結構，讓我們能夠有效地組織和管理資料。

## 陣列

陣列是用來儲存多個值的資料結構，就像一個有編號的清單。每個元素都有一個索引（從 0 開始），我們可以透過索引來存取特定的元素。

### 建立陣列
{% blockquote MDN https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array %}
在 JavaScript 中，Array（陣列）是一種用來儲存有序資料集合的物件。陣列的每個元素都可以透過索引（從 0 開始）來存取。現代 JavaScript 提供了許多強大的陣列方法，讓資料處理更加方便與彈性。
{% endblockquote %}

**`[]` 與 `new Array()` 差異說明**

- 使用 `[]`（陣列字面量）建立陣列是最常見且推薦的方式，例如：`let arr = [1, 2, 3];`
- 使用 `new Array()` 建立陣列時，如果只傳一個數字參數，會建立指定長度但內容為空的陣列，例如：`let arr = new Array(3);` 會產生長度為 3 的空陣列（內容皆為 empty slot）。
- 若傳入多個參數，`new Array()` 會將這些參數作為陣列元素，例如：`let arr = new Array(1, 2, 3);` 結果與 `[1, 2, 3]` 相同。

通常建議使用 `[]` 來建立「陣列實例」（Array instance），這樣建立出來的物件會自動擁有所有陣列方法（如 push、pop、forEach 等），語法簡潔且不易混淆。只有建立出「陣列實例」時，才能使用這些陣列專屬的方法。


```javascript array-creation.js
// 方法 1：使用方括號（推薦）
let emptyArray = [];
let fruits = ["蘋果", "香蕉", "橘子"];
let numbers = [1, 2, 3, 4, 5];

// 方法 2：使用 new Array() 建構函式
let emptyArray2 = new Array();
let fruits2 = new Array("蘋果", "香蕉", "橘子");
let numbers2 = new Array(1, 2, 3, 4, 5);

console.log(fruits);   // ["蘋果", "香蕉", "橘子"]
console.log(fruits2);  // ["蘋果", "香蕉", "橘子"]
console.log(numbers);  // [1, 2, 3, 4, 5]
console.log(numbers2); // [1, 2, 3, 4, 5]
```

{% note info %}
**兩種建立陣列方式的差異：**

**方括號方式（推薦）：**
- 語法簡潔：`let arr = [];`
- 效能較好
- 更直觀易懂
- 現代 JavaScript 的標準做法

**new Array() 方式：**
- 語法較長：`let arr = new Array();`
- 因為是從 Array 建構式（Constructor）繼承出來的物件，建立時會經過額外的建構流程效能稍差，通常不如直接使用方括號 `[]` 來得簡潔高效
- 需要注意特殊情況

**特殊情況：**
```javascript
// 使用 new Array() 時要注意
let arr1 = new Array(3);    // 建立長度為 3 的空陣列 [empty × 3]
let arr2 = [3];             // 建立包含數字 3 的陣列 [3]

console.log(arr1.length);   // 3
console.log(arr2.length);   // 1
console.log(arr1[0]);       // undefined
console.log(arr2[0]);       // 3
```

**建議：**
- 一般情況使用方括號 `[]`
- 只有在需要動態建立指定長度陣列時才考慮 `new Array()`
{% endnote %}

### 存取陣列元素

```javascript array-access.js
let colors = ["紅", "綠", "藍"];

// 存取元素（索引從 0 開始）
console.log(colors[0]); // 紅
console.log(colors[1]); // 綠
console.log(colors[2]); // 藍

// 修改元素
colors[1] = "黃";
console.log(colors); // ["紅", "黃", "藍"]

// 取得陣列長度
console.log(colors.length); // 3
```
### 陣列與迴圈
```javascript array-loop.js
let students = ["小明", "小華", "小李", "小王"];

// 使用 for 迴圈遍歷陣列
for (let i = 0; i < students.length; i++) {
    console.log(`學生 ${i + 1}：${students[i]}`);
}

// 使用 for...of 迴圈（更簡潔）
for (let student of students) {
    console.log(`學生：${student}`);
}

// 使用 forEach 方法（需要函式概念）
students.forEach((student, index) => {
    console.log(`學生 ${index + 1}：${student}`);
});
```

### 陣列實例
Array（陣列）是 JavaScript 中用來儲存多個資料的資料結構。每個元素都有一個索引（從 0 開始），可以用來快速存取、修改、刪除資料。

{% blockquote MDN https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array %}
在 JavaScript 中，陣列（Array）其實是一種特殊的物件（Object），它除了可以用數字索引存取元素外，還繼承了 Array.prototype 上的各種原生方法（function），例如 `push()`、`pop()`、`map()`、`filter()` 等，讓我們能夠方便地進行資料處理與操作。這些方法大幅提升了陣列的實用性與靈活性，是現代 JavaScript 程式設計不可或缺的工具。
{% endblockquote %}

#### 常用方法
在 JavaScript 中，陣列（Array）本身是一種線性資料結構，允許我們根據不同需求，利用內建方法實現「先進先出」（FIFO, First-In-First-Out）或「後進先出」（FILO, First-In-Last-Out，也稱 LIFO）等資料存取行為。例如，`push()` 和 `pop()` 方法可讓陣列像堆疊（stack）一樣運作（LIFO），而 `push()` 搭配 `shift()` 則可模擬佇列（queue）的行為（FIFO）。

```javascript array-methods.js
let animals = ["狗", "貓"];

// 在尾端新增元素
animals.push("兔子");
console.log(animals); // ["狗", "貓", "兔子"]

// 在開頭新增元素
animals.unshift("魚");
console.log(animals); // ["魚", "狗", "貓", "兔子"]

// 移除尾端元素
let lastAnimal = animals.pop();
console.log(lastAnimal); // 兔子
console.log(animals);    // ["魚", "狗", "貓"]

// 移除開頭元素
let firstAnimal = animals.shift();
console.log(firstAnimal); // 魚
console.log(animals);     // ["狗", "貓"]
```

除了基本的新增與刪除操作外，陣列也提供了檢查元素是否存在、尋找特定資料的位置，以及將整個陣列快速轉換為字串等常用功能。

```javascript array-practical.js
let numbers = [1, 2, 3, 4, 5];

// 檢查是否包含某個元素
console.log(numbers.includes(3)); // true
console.log(numbers.includes(6)); // false

// 尋找元素的索引
console.log(numbers.indexOf(4)); // 3
console.log(numbers.indexOf(6)); // -1（找不到）

// 將陣列轉換為字串
let fruits = ["蘋果", "香蕉", "橘子"];
console.log(fruits.join(", ")); // 蘋果，香蕉，橘子
```

{% note primary %}
**陣列實例的常用方法速查表**

| 方法         | 功能說明                        | 使用語法                                     | 範例程式碼                            |
| ------------ | ------------------------------- | -------------------------------------------- | ------------------------------------- |
| `push()`     | 在陣列尾端新增元素              | `array.push(item)`                           | `fruits.push("橘子")`                 |
| `pop()`      | 移除並回傳尾端元素              | `array.pop()`                                | `let last = fruits.pop()`             |
| `unshift()`  | 在陣列開頭新增元素              | `array.unshift(item)`                        | `fruits.unshift("蘋果")`              |
| `shift()`    | 移除並回傳開頭元素              | `array.shift()`                              | `let first = fruits.shift()`          |
| `splice()`   | 新增/移除指定位置元素           | `array.splice(start, deleteCount, ...items)` | `fruits.splice(1, 1, "梨子")`         |
| `slice()`    | 擷取陣列的一部分                | `array.slice(start, end)`                    | `let part = fruits.slice(1, 3)`       |
| `concat()`   | 合併兩個或多個陣列              | `array1.concat(array2)`                      | `let all = fruits.concat(vegetables)` |
| `join()`     | 將陣列轉為字串                  | `array.join(separator)`                      | `fruits.join(", ")`                   |
| `sort()`     | 排序陣列元素                    | `array.sort([compareFn])`                    | `fruits.sort()`                       |
| `includes()` | 判斷陣列是否包含某個值          | `array.includes(value)`                      | `fruits.includes("蘋果")`             |
| `indexOf()`  | 尋找元素的索引（找不到回傳 -1） | `array.indexOf(value)`                       | `fruits.indexOf("橘子")`              |
{% endnote %}

#### 資料處理方法
這些方法都需要傳入一個「函式」作為參數，等學到 function 章節會詳細介紹。

- **forEach\(fn\)**：對每個元素執行操作，不會回傳新陣列，常用於遍歷或執行副作用。
- **map\(fn\)**：將每個元素轉換後產生新陣列，原陣列不變，常用於資料格式轉換。
- **filter\(fn\)**：篩選出符合條件的元素，回傳新陣列。
- **find\(fn\)**：尋找第一個符合條件的元素，回傳該元素（找不到則回傳 `undefined`）。
- **some\(fn\)**：檢查是否有任一元素符合條件，回傳布林值（true/false）。
- **every\(fn\)**：檢查是否所有元素都符合條件，回傳布林值（true/false）。
- **reduce\(fn, init\)**：將陣列元素依序累加、合併或歸納為單一值，常用於總和、計數、物件合併等情境。

### Array 建構函式
在 JavaScript 中，`Array` 是一個「建構函式（Constructor）」也是一個「全域物件（Global Object）」。你可以用 `new Array()` 建立新的陣列實體，也可以直接呼叫 `Array` 上的靜態方法（如 `Array.from()`、`Array.isArray()`、`Array.of()`）來進行各種陣列相關操作。

- `new Array()`：使用建構函式語法建立新的陣列實體。
- `Array.from()`、`Array.isArray()`、`Array.of()`：這些是 Array 物件本身的「靜態方法」，不是陣列實例的方法。

兩者的「Array」都是指內建的 `Array` 物件（全域的 Array function），只是用法和用途不同。

#### Array.from
`Array.from()` 可以將「類陣列物件」或「可迭代物件」轉換成真正的陣列。
- 語法：`Array.from(arrayLike[, mapFn[, thisArg]])`
- 常見應用：
  - 將 Set、Map 轉成陣列
  - 將字串轉成字元陣列
  - 產生指定長度的陣列

```javascript array-from-demo.js
// 將 Set 轉成陣列
let s = new Set([1, 2, 3]);
let arr1 = Array.from(s);
console.log(arr1); // [1, 2, 3]

// 將字串轉成字元陣列
let str = "hello";
let arr2 = Array.from(str);
console.log(arr2); // ["h", "e", "l", "l", "o"]

// 產生長度為 5 的陣列，內容為索引值
let arr3 = Array.from({ length: 5 }, (_, i) => i);
console.log(arr3); // [0, 1, 2, 3, 4]
```

#### Array.isArray
`Array.isArray()` 用來判斷某個值是否為陣列，回傳布林值。
```javascript
Array.isArray([1,2,3]); // true
Array.isArray('abc');   // false
```

#### Array.of
`Array.of()` 根據傳入的參數建立一個新陣列（和 `new Array()` 不同，單一數字也會變成元素）。
```javascript
Array.of(3);        // [3]
Array.of(1,2,3);    // [1,2,3]
new Array(3);       // [empty × 3]（長度為3的空陣列）
```

{% note info %}
**小技巧：Array 的靜態方法與陣列實例方法**
- `Array.from()`、`Array.isArray()`、`Array.of()` 必須用 `Array.` 呼叫，不能用在陣列實例上。
- `push()`、`sort()`、`map()` 等是「陣列實例」的方法，必須用在陣列變數上。
- `Array.from(obj)` 與 `[...obj]` 都能將可迭代物件轉成陣列，`Array.from` 可搭配 map 函式直接轉換內容。
{% endnote %}

## 物件

物件（Object）是 JavaScript 中用來儲存多個相關資料的資料結構。與陣列（Array）只能用索引（數字）存取元素不同，物件是以「鍵值對」（key-value pair）的形式儲存資料，每個值（value）都對應一個具意義的名稱（鍵，key），讓資料更有結構且易於理解與存取。

### 建立物件

```javascript object-creation.js
// 建立空物件
let emptyObject = {};

// 建立有屬性的物件
let person = {
    name: "小明",
    age: 25,
    city: "台北",
    isStudent: true
};

console.log(person);
```

### 存取物件屬性

```javascript object-access.js
let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    color: "白色"
};

// 使用點記法存取
console.log(car.brand); // Toyota
console.log(car.year);  // 2020

// 使用方括號記法存取
console.log(car["model"]); // Camry
console.log(car["color"]); // 白色

// 修改屬性
car.year = 2021;
car["color"] = "黑色";
console.log(car);

// 讀取不存在的屬性會返回 undefined
console.log(car.price);        // undefined
console.log(car["engine"]);    // undefined
```

#### 處理不存在的屬性

```javascript object-safe-access.js
let user = {
    name: "小明",
    age: 25
};

// 傳統方式：檢查屬性是否存在
if (user.email) {
    console.log("電子郵件：" + user.email);
} else {
    console.log("沒有電子郵件");
}

// ES6 可選鏈運算子（?.）- 避免錯誤
console.log(user.email?.toUpperCase()); // undefined（不會報錯）

// 巢狀物件的安全存取
let company = {
    name: "科技公司",
    department: {
        it: {
            manager: "張經理"
        }
    }
};

// 傳統方式（可能出錯）
// console.log(company.department.hr.manager); // 錯誤！hr 不存在

// 使用可選鏈運算子
console.log(company.department?.hr?.manager); // undefined（安全）
console.log(company.department?.it?.manager); // 張經理

// 實際應用範例
let student = {
    name: "小華",
    contact: {
        phone: "0912345678"
    }
};

// 安全地存取可能不存在的屬性
let email = student.contact?.email || "沒有電子郵件";
let phone = student.contact?.phone || "沒有電話";
console.log("聯絡方式：", { email, phone });
```

{% note info %}
**關於 undefined 和可選鏈運算子：**
- **undefined**：當存取不存在的物件屬性時，JavaScript 會返回 `undefined`
- **可選鏈運算子（?.）**：ES6 的新語法，當屬性不存在時會返回 `undefined` 而不是報錯
- **使用時機**：當你不確定物件是否有某個屬性時，使用 `?.` 可以避免程式崩潰
- **相容性**：可選鏈運算子是較新的語法，在舊版瀏覽器中可能不支援
{% endnote %}

### 新增和刪除屬性

```javascript object-modify.js
let book = {
    title: "JavaScript 入門",
    author: "張三"
};

// 新增屬性
book.pages = 300;
book["publisher"] = "資訊出版社";
console.log(book);

// 刪除屬性
delete book.pages;
console.log(book);
```

### 物件與迴圈

```javascript object-loop.js
let student = {
    name: "小華",
    age: 22,
    major: "資訊工程",
    grade: "大三"
};

// 使用 for...in 迴圈遍歷物件屬性
for (let key in student) {
    console.log(`${key}: ${student[key]}`);
}

// 檢查屬性是否存在
if ("name" in student) {
    console.log("學生有姓名資料");
}
```

### Object 建構函式

在 JavaScript 中，`Object` 是一個內建的建構函式，它提供了許多有用的靜態方法來處理物件。我們已經知道可以用 `{}` 來建立物件，但也可以用 `new Object()` 來建立：

```javascript object-constructor.js
// 兩種建立物件的方式
let obj1 = {};                    // 物件字面量語法
let obj2 = new Object();          // Object 建構函式

// 兩種方式建立的物件是等價的
console.log(typeof obj1);         // object
console.log(typeof obj2);         // object
console.log(obj1.constructor);    // ƒ Object() { [native code] }
console.log(obj2.constructor);    // ƒ Object() { [native code] }

// 實際使用範例
let person = new Object();
person.name = "小明";
person.age = 25;
console.log(person); // {name: "小明", age: 25}
```

{% note info %}
**補充說明：constructor 屬性是什麼？**

- 每個 JavaScript 物件都有一個 `constructor` 屬性，指向建立該物件的建構函式（Constructor Function）。
- 例如：用物件字面量 `{}` 或 `new Object()` 建立的物件，其 `constructor` 都指向內建的 `Object` 函式。
- 這個屬性可以用來判斷物件是由哪個建構函式產生的，也常用於物件型別的檢查。

```javascript constructor-demo.js
let arr = [];
console.log(arr.constructor === Array); // true
let obj = {};
console.log(obj.constructor === Object); // true
```

**注意事項：**
- `constructor` 屬性可被覆蓋或修改，並非絕對安全的型別判斷方式。
- 更嚴謹的型別判斷可用 `instanceof` 或 `Object.prototype.toString.call(obj)`。

```javascript instanceof-demo.js
let arr = [];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true
let date = new Date();
console.log(date instanceof Date); // true
console.log(date instanceof Object); // true

// `instanceof` 用來判斷物件是否為某個建構函式的實例，適合判斷自訂類別或內建型別

console.log(Object.prototype.toString.call([]));        // [object Array]
console.log(Object.prototype.toString.call({}));        // [object Object]
console.log(Object.prototype.toString.call(null));      // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(123));       // [object Number]
console.log(Object.prototype.toString.call('abc'));     // [object String]
console.log(Object.prototype.toString.call(new Date())); // [object Date]

// `Object.prototype.toString.call(obj)` 可精確判斷各種內建型別，回傳格式為 `[object Type]`
```

**應用場景：**
- 檢查物件來源、建立自訂類別時理解原型鏈、進行物件型別判斷等。
{% endnote %}

{% note info %}
**Object 建構函式：**
- `Object` 是 JavaScript 的內建建構函式
- 所有物件都繼承自 `Object.prototype`
- 提供許多靜態方法來操作物件
- 通常使用物件字面量語法 `{}` 更簡潔
{% endnote %}

### Object 的靜態方法

`Object` 建構函式提供了許多有用的靜態方法，讓我們能夠更方便地處理物件：

```javascript object-static-methods.js
let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    color: "白色"
};

// Object.keys() - 取得所有屬性名稱（鍵）
let keys = Object.keys(car);
console.log("屬性名稱：", keys); // ["brand", "model", "year", "color"]

// Object.values() - 取得所有屬性值
let values = Object.values(car);
console.log("屬性值：", values); // ["Toyota", "Camry", 2020, "白色"]

// Object.entries() - 取得鍵值對陣列
let entries = Object.entries(car);
console.log("鍵值對：", entries); // [["brand", "Toyota"], ["model", "Camry"], ["year", 2020], ["color", "白色"]]

// 使用 for...of 迴圈遍歷 Object.entries()
for (let [key, value] of entries) {
    console.log(`${key}: ${value}`);
}

// 實際應用：計算物件屬性數量
let propertyCount = Object.keys(car).length;
console.log("物件有 " + propertyCount + " 個屬性"); // 物件有 4 個屬性

// 檢查物件是否為空
let emptyObject = {};
let isEmpty = Object.keys(emptyObject).length === 0;
console.log("空物件？", isEmpty); // 空物件？ true
```

{% note info %}
**Object 靜態方法說明：**
- **Object.keys\(\)**：返回物件所有可列舉屬性名稱的陣列
- **Object.values\(\)**：返回物件所有可列舉屬性值的陣列  
- **Object.entries\(\)**：返回物件所有可列舉鍵值對的陣列

這些方法讓我們能夠將物件轉換為陣列，方便使用陣列的方法來處理物件資料。在後續學習陣列的函式式方法時，這些轉換技巧會非常有用。
{% endnote %}

{% note warning %}
**注意事項：**
- `Object.keys()`、`Object.values()`、`Object.entries()` 只會返回可列舉的屬性
- 繼承的屬性不會被包含在結果中
- 這些方法返回的是陣列，可以使用所有陣列方法
{% endnote %}

## 函式
當我們需要處理複雜的資料操作時，函式是必不可少的工具。函式讓我們能夠將程式碼組織成可重複使用的區塊，同時 JavaScript 也提供了許多內建函式來處理常見的任務。函式是一段可以重複使用的程式碼，用來完成特定的任務。學會使用函式是程式設計的重要里程碑。

當我們需要重複執行相同的程式碼時，函式可以讓程式更簡潔、更容易維護：

```javascript why-functions.js
// 沒有使用函式的重複程式碼
console.log("歡迎來到我們的網站！");
console.log("今天是美好的一天！");
console.log("=============================");

console.log("歡迎來到我們的網站！");
console.log("今天是美好的一天！");
console.log("=============================");

// 使用函式後，程式碼更簡潔
function showWelcome() {
    console.log("歡迎來到我們的網站！");
    console.log("今天是美好的一天！");
    console.log("=============================");
}

// 呼叫函式
showWelcome();
```

### 函式的基本語法

函式是 JavaScript 中最重要的概念之一，讓我們來學習函式的基本語法和各種用法：

```javascript function-syntax.js
// 函式宣告
function greet() {
    console.log("Hello, World!");
}

// 呼叫函式
greet(); // Hello, World!

// 帶有參數的函式
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

sayHello("小明"); // Hello, 小明！
sayHello("小華"); // Hello, 小華！
```

#### 函式參數的使用

函式可以接收參數來處理不同的資料：

```javascript function-parameters.js
// 單一參數
function square(number) {
    let result = number * number;
    console.log(`${number} 的平方是 ${result}`);
}

square(5); // 5 的平方是 25
square(8); // 8 的平方是 64

// 多個參數
function add(a, b) {
    let sum = a + b;
    console.log(`${a} + ${b} = ${sum}`);
}

add(3, 4); // 3 + 4 = 7
add(10, 20); // 10 + 20 = 30
```

#### 函式的回傳值

函式可以使用 `return` 語句來回傳結果：

```javascript function-return.js
// 有回傳值的函式
function multiply(a, b) {
    return a * b;
}

let result = multiply(6, 7);
console.log(result); // 42

// 在其他地方使用回傳值
let price = 100;
let quantity = 3;
let total = multiply(price, quantity);
console.log(`總價：${total}`); // 總價：300
```

#### 函式的預設參數

ES6 引入了預設參數，讓我們可以為參數設定預設值：

```javascript function-default-params.js
// 預設參數
function introduce(name, age = 0, city = "未知") {
    console.log(`我是 ${name}，${age} 歲，住在 ${city}`);
}

introduce("小明");                    // 我是 小明，0 歲，住在 未知
introduce("小華", 25);                // 我是 小華，25 歲，住在 未知
introduce("小李", 30, "台北");          // 我是 小李，30 歲，住在 台北
```

{% note info %}
**函式語法重點：**
- **函式宣告**：使用 `function` 關鍵字定義函式
- **參數**：函式可以接收一個或多個參數
- **回傳值**：使用 `return` 語句回傳結果
- **預設參數**：ES6 語法，為參數設定預設值
- **呼叫函式**：使用函式名稱加括號來呼叫函式
{% endnote %}

{% note warning %}
**注意事項：**
- 函式宣告（Function Declaration）在 JavaScript 中會被「提升」（Hoisting），也就是說你可以在函式定義之前就呼叫該函式，這是因為 JavaScript 會在執行前先將所有函式宣告提升到該作用域頂端。
- 函式的參數名稱應該具備語意，能夠清楚表達該參數的用途，這樣不僅方便自己閱讀，也方便他人維護程式碼。
- 當函式執行到 `return` 語句時，會立即結束該函式的執行，並將 `return` 後的值回傳給呼叫者。`return` 之後的程式碼將不會被執行。
- 在設定函式的預設參數時，必須將預設值的參數放在參數列表的最後面，否則可能會導致預期外的行為或錯誤，這是因為 JavaScript 會依照參數順序對應傳入的值。
{% endnote %}

### JSDoc 樣板註解
JSDoc 是 JavaScript 常用的標準化註解格式，主要用於說明「函式、參數、回傳值」等資訊。這種註解不僅讓程式碼更容易閱讀，也能被工具自動產生 API 文件，提升團隊協作效率。

**基本語法：**
```javascript
/**
 * 這是函式的說明文字
 * @param {型別} 參數名稱 - 參數用途說明
 * @returns {型別} 回傳值說明
 */
function add(a, b) {
  return a + b;
}
```

**常用標籤：**
- `@param {型別} 參數名稱`：說明每個參數的型別與用途
- `@returns {型別}`：說明回傳值的型別與內容
- `@example`：提供實際使用範例，讓團隊成員一看就懂
- `@author`、`@version`、`@date`：作者、版本、日期

**VSCode 快速鍵小技巧：**
- 輸入 `/**` 然後按 <kbd>Enter</kbd>，可自動產生 JSDoc 樣板

**範例：**
```javascript
/**
 * Check if the person is at least 18 years old based on the given birth year.
 * @param {number} birthYear - The year of birth (e.g., 2005)
 * @returns {boolean} Returns true if the person is 18 or older, otherwise false.
 * @example
 * isAdult(2000); // true (if current year is 2025)
 * isAdult(2010); // false
 */
function isAdult(birthYear) {
  const currentYear = new Date().getFullYear();
  return (currentYear - birthYear) >= 18;
}
```

### 箭頭函式

箭頭函式是 ES6 引入的新語法，提供更簡潔的函式撰寫方式：

```javascript arrow-functions.js
// 傳統函式
function add(a, b) {
    return a + b;
}

// 箭頭函式
const addArrow = (a, b) => {
    return a + b;
};

// 更簡潔的箭頭函式（單一表達式）
const addSimple = (a, b) => a + b;

// 單一參數可省略括號
const double = x => x * 2;

// 無參數需要空括號
const sayHello = () => console.log("Hello!");

// 使用範例
console.log(add(5, 3));        // 8
console.log(addArrow(5, 3));   // 8
console.log(addSimple(5, 3));  // 8
console.log(double(10));       // 20
sayHello();                    // Hello!
```

### 匿名函式與函式表達式

除了函式宣告外，JavaScript 還支援匿名函式（函式表達式）的寫法。這種方式讓我們能夠將函式賦值給變數：

```javascript anonymous-functions.js
// 函式宣告（提升）
function greet(name) {
    console.log(`Hello, ${name}!`);
}

// 匿名函式（函式表達式）
const greetAnonymous = function(name) {
    console.log(`Hello, ${name}!`);
};

// 立即執行函式表達式 (IIFE)
(function() {
    console.log("這個函式會立即執行");
})();

// 帶參數的立即執行函式
(function(name) {
    console.log(`Hello, ${name}!`);
})("小明");

// 將立即執行函式的結果賦值給變數
const result = (function(a, b) {
    return a + b;
})(5, 3);

console.log(result); // 8
```

#### 函式宣告 vs 函式表達式

```javascript function-declaration-vs-expression.js
// 函式宣告 - 會被提升 (hoisting)
sayHello("小明"); // 可以正常執行

function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

// 函式表達式 - 不會被提升
// sayGoodbye("小華"); // 錯誤！函式還未定義

const sayGoodbye = function(name) {
    console.log(`Goodbye, ${name}!`);
};

sayGoodbye("小華"); // 可以正常執行
```

#### 匿名函式的實際應用

```javascript anonymous-functions-usage.js
// 1. 作為回調函式
let numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(num) {
    console.log(`數字：${num}`);
});

// 2. 作為事件處理函式
const button = document.querySelector('button');
button.addEventListener('click', function() {
    console.log('按鈕被點擊了！');
});

// 3. 作為物件的方法
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    multiply: function(a, b) {
        return a * b;
    }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.multiply(4, 6)); // 24

// 4. 條件式函式定義
let operation;
if (Math.random() > 0.5) {
    operation = function(a, b) {
        return a + b;
    };
} else {
    operation = function(a, b) {
        return a - b;
    };
}

console.log(operation(10, 5)); // 可能是 15 或 5
```

{% note info %}
**匿名函式的特點：**
- **沒有名稱**：函式本身沒有名稱，但可以賦值給變數
- **不會提升**：必須先定義才能使用
- **靈活性高**：可以動態建立和傳遞
- **立即執行**：可以定義後立即執行 (IIFE)
- **作為值**：函式可以像其他值一樣傳遞和使用
{% endnote %}

{% note warning %}
**注意事項：**
- **函式宣告（Function Declaration）會被提升（Hoisting）**：在 JavaScript 中，使用 `function` 關鍵字宣告的函式，會在程式執行前自動被提升到目前作用域的最上方，因此你可以在函式定義之前就呼叫該函式。例如：
  ```javascript
  greet(); // 可以正常執行
  function greet() {
      console.log("Hello!");
  }
  ```
- **函式表達式（Function Expression）不會被提升**：將函式賦值給變數的寫法（如 `let fn = function() {}`），必須先定義後才能使用，否則會出現錯誤。這是因為只有變數名稱會被提升，函式內容不會被提升。例如：
  ```javascript
  sayHi(); // 這裡會出錯
  let sayHi = function() {
      console.log("Hi!");
  };
  ```
- **匿名函式（Anonymous Function）常用於回呼函式（Callback）與事件處理**：匿名函式沒有名稱，通常直接作為參數傳遞給其他函式，例如陣列的 `forEach`、事件監聽（`addEventListener`）等，讓程式更靈活。
- **IIFE（Immediately Invoked Function Expression，立即執行函式表達式）常用於建立私有作用域**：IIFE 是一種定義後立即執行的匿名函式，常用來避免變數污染全域命名空間，或建立私有變數。例如：
  ```javascript
  (function() {
      // 這裡的變數只在這個函式內有效
      let secret = "隱藏資訊";
      console.log(secret);
  })();
  console.log(secret); // 這裡會出錯，因為 secret 只存在於 IIFE 內
  ```
{% endnote %}

### 變數作用域

在一開始的變數章節中，我們已經學習了變數的基本概念。現在讓我們深入探討函式中的變數作用域，了解全域變數和區域變數在函式中的行為：

```javascript variable-scope.js
// 全域變數
let globalVar = "我是全域變數";

function testScope() {
    // 區域變數
    let localVar = "我是區域變數";
    
    console.log(globalVar); // 可以存取全域變數
    console.log(localVar);  // 可以存取區域變數
}

testScope();
console.log(globalVar); // 可以存取全域變數
console.log(localVar); // 錯誤！無法存取區域變數
```

{% note info %}
**函式中的變數作用域規則：**
- **全域變數**：在函式外宣告的變數，可以在函式內外存取
- **區域變數**：在函式內宣告的變數，只能在函式內存取
- **參數變數**：函式的參數也是區域變數，只在函式內有效
- **作用域鏈**：函式可以存取外層作用域的變數，但外層無法存取內層變數
{% endnote %}

### 閉包

閉包（Closure）是 JavaScript 中一個重要的概念，它允許函式「記住」並存取其詞法作用域（lexical scope）中的變數，即使該函式在其原始作用域之外執行。

{% note info %}
**閉包的核心概念：**
- 函式可以存取其被定義時的作用域中的變數
- 即使外部函式已經執行完畢，內部函式仍然可以存取這些變數
- 閉包常用於資料隱藏、模組化程式設計
{% endnote %}


{% note info %}
**閉包的三個關鍵要素：**
1. **外部函式**：`outerFunction` 建立作用域
2. **內部函式**：`innerFunction` 存取外部變數
3. **變數保持**：即使外部函式結束，內部函式仍能存取變數
{% endnote %}


#### 基本閉包範例

```javascript closure-basic.js
function outerFunction() {
  let message = "Hello from outer function";
  
  function innerFunction() {
    console.log(message); // 存取外部變數
  }
  
  return innerFunction;
}

let myFunction = outerFunction();
myFunction(); // 輸出：Hello from outer function
```


{% note warning %}
**重要理解：**
- `message` 變數在 `outerFunction` 執行完畢後仍然存在
- `innerFunction` 透過閉包機制「記住」了 `message` 的值
- 這就是閉包的核心：函式可以存取其被定義時的作用域
{% endnote %}

##### 作用域層級結構

{% mermaid graph TD %}
    subgraph "全域作用域 Global Scope"
        A["let myFunction = outerFunction()<br/>全域變數，接收返回的函式"]
    end
    
    subgraph "outerFunction 作用域 Function Scope"
        B["let message = 'Hello from outer function'<br/>外部函式的私有變數"]
        C["function innerFunction() {<br/>console.log(message);<br/>}<br/>內部函式定義"]
        D["return innerFunction<br/>返回內部函式"]
    end
    
    subgraph "innerFunction 作用域 Closure Scope"
        E["console.log(message)<br/>存取外部變數<br/>形成閉包引用"]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    
    B -.->|"閉包引用"| E
    C -.->|"形成閉包"| E
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:4px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:4px
    style C fill:#e8f5e8,stroke:#2e7d32,stroke-width:4px
    style D fill:#fff3e0,stroke:#ef6c00,stroke-width:4px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:4px
{% endmermaid %}


##### 逐行分析
讓我們逐行分析這個基本閉包範例的執行過程：

**第 1 行：`function outerFunction() {`**
- **動作**：宣告一個名為 `outerFunction` 的函式
- **思考**：這是外部函式，建立一個新的作用域
- **作用域**：創建一個函式作用域，內部變數對外部不可見

**第 2 行：`let message = "Hello from outer function";`**
- **動作**：在 `outerFunction` 作用域內宣告變數 `message`
- **思考**：這是外部函式的區域變數
- **作用域**：`message` 只在 `outerFunction` 內部可見

**第 4-6 行：`function innerFunction() { console.log(message); }`**
- **動作**：在 `outerFunction` 內部定義 `innerFunction`
- **思考**：這是內部函式，形成閉包
- **閉包特性**：`innerFunction` 可以存取 `outerFunction` 的變數 `message`
- **詞法作用域**：JavaScript 根據函式定義的位置決定作用域

**第 8 行：`return innerFunction;`**
- **動作**：返回 `innerFunction` 函式本身（不是執行結果）
- **思考**：將內部函式暴露給外部
- **閉包形成**：`innerFunction` 會「記住」其被定義時的作用域

**第 11 行：`let myFunction = outerFunction();`**
- **動作**：呼叫 `outerFunction()` 並將返回的函式賦值給 `myFunction`
- **思考**：此時 `outerFunction` 執行完畢，但 `innerFunction` 被保存
- **閉包保持**：`innerFunction` 仍然保持對 `message` 變數的引用

**第 12 行：`myFunction();`**
- **動作**：執行 `myFunction`（實際上是 `innerFunction`）
- **思考**：即使 `outerFunction` 已經結束，`innerFunction` 仍能存取 `message`
- **閉包作用**：`console.log(message)` 成功輸出 `"Hello from outer function"`




##### 閉包形成過程

{% mermaid graph TD %}
    A["1. outerFunction 執行"] --> B["2. message 變數被宣告"]
    B --> C["3. innerFunction 被定義，形成閉包"]
    C --> D["4. innerFunction 記住 message 變數"]
    D --> E["5. outerFunction 返回 innerFunction"]
    E --> F["6. outerFunction 執行完畢，但 message 仍被 innerFunction 引用"]
    
    style A fill:#f1f8e9,stroke:#388e3c,stroke-width:2px
    style B fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style C fill:#fff8e1,stroke:#f57f17,stroke-width:2px
    style D fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style E fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    style F fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
{% endmermaid %}

##### 執行階段流程

{% mermaid graph TD %}
    A["7. myFunction() 被呼叫"] --> B["8. innerFunction 執行"]
    B --> C["9. 透過閉包存取 message 變數"]
    C --> D["10. 輸出：Hello from outer function"]
    
    style A fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style B fill:#f1f8e9,stroke:#388e3c,stroke-width:2px
    style C fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style D fill:#fff8e1,stroke:#f57f17,stroke-width:2px
{% endmermaid %}

##### 作用域與閉包關係圖

{% mermaid graph TD %}
    subgraph "作用域層級結構"
        subgraph "全域作用域 Global Scope"
            A["let myFunction = outerFunction()"]
        end
        
        subgraph "outerFunction 作用域 Function Scope"
            B["let message = 'Hello from outer function'"]
            C["function innerFunction() { console.log(message); }"]
            D["return innerFunction"]
        end
        
        subgraph "innerFunction 作用域 Closure Scope"
            E["console.log(message) - 存取外部變數"]
        end
    end
    
    subgraph "閉包引用關係"
        F["innerFunction 的閉包環境"]
        G["包含：message 變數的引用"]
        H["即使 outerFunction 結束，引用仍存在"]
    end
    
    subgraph "執行時的作用域鏈"
        I["innerFunction 執行時"]
        J["1. 檢查自己的作用域"]
        K["2. 找不到 message，向上查找"]
        L["3. 在閉包環境中找到 message"]
        M["4. 成功存取並輸出"]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    
    E -.->|"閉包引用"| F
    F --> G
    G --> H
    
    I --> J
    J --> K
    K --> L
    L --> M
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:3px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
    style C fill:#e8f5e8,stroke:#2e7d32,stroke-width:3px
    style D fill:#fff3e0,stroke:#ef6c00,stroke-width:3px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:3px
    style F fill:#fff8e1,stroke:#f57f17,stroke-width:3px
    style G fill:#f1f8e9,stroke:#388e3c,stroke-width:3px
    style H fill:#e0f2f1,stroke:#00695c,stroke-width:3px
    style I fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
    style J fill:#e8f5e8,stroke:#2e7d32,stroke-width:3px
    style K fill:#fff3e0,stroke:#ef6c00,stroke-width:3px
    style L fill:#fce4ec,stroke:#c2185b,stroke-width:3px
    style M fill:#fff8e1,stroke:#f57f17,stroke-width:3px
{% endmermaid %}

#### 計數器閉包

```javascript closure-counter.js
function createCounter() {
  let count = 0; // 私有變數
  
  function increment() {
    count++;
    console.log(`計數：${count}`);
  }
  
  function getCount() {
    return count;
  }
  
  return {
    increment,
    getCount
  };
}

const counter = createCounter();
counter.increment(); // 計數：1
counter.increment(); // 計數：2
console.log(counter.getCount()); // 2
```

##### 計數器閉包作用域結構

{% mermaid graph TD %}
    subgraph "createCounter 函式作用域"
        A["let count = 0<br/>私有計數變數"]
        B["function increment() {<br/>count++;<br/>console.log(`計數：${count}`);<br/>}"]
        C["function getCount() {<br/>return count;<br/>}"]
        D["return {<br/>increment,<br/>getCount<br/>}"]
    end
    
    subgraph "閉包引用關係"
        E["increment 函式<br/>引用 count 變數<br/>形成閉包"]
        F["getCount 函式<br/>引用 count 變數<br/>形成閉包"]
        G["count 變數被兩個函式共享<br/>狀態在函式間保持"]
    end
    
    A --> B
    A --> C
    B --> D
    C --> D
    
    B -.->|"閉包引用"| E
    C -.->|"閉包引用"| F
    E --> G
    F --> G
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:4px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:4px
    style C fill:#e8f5e8,stroke:#2e7d32,stroke-width:4px
    style D fill:#fff3e0,stroke:#ef6c00,stroke-width:4px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:3px
    style F fill:#f1f8e9,stroke:#388e3c,stroke-width:3px
    style G fill:#e0f2f1,stroke:#00695c,stroke-width:3px
{% endmermaid %}

##### 計數器狀態變化

{% mermaid graph TD %}
    A["初始狀態：count = 0"] --> B["counter.increment()"]
    B --> C["狀態：count = 1"]
    C --> D["counter.increment()"]
    D --> E["狀態：count = 2"]
    E --> F["counter.getCount()"]
    F --> G["返回：2"]
    
    style A fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style C fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style D fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style E fill:#f1f8e9,stroke:#388e3c,stroke-width:2px
    style F fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    style G fill:#fff8e1,stroke:#f57f17,stroke-width:2px
{% endmermaid %}

#### 模組化閉包
函式裡面宣告兩個小函式，透過物件的寫法回傳給外部。

```javascript closure-module.js
function Module() {
  // 共享的作用域變數
  let animalCount = 0;
  let lastAnimal = '';
  
  function dogsay() {
    animalCount++;
    lastAnimal = '狗';
    console.log(`汪！這是第 ${animalCount} 次動物叫聲，最後叫的是：${lastAnimal}`);
  }
  
  function catsay() {
    animalCount++;
    lastAnimal = '貓';
    console.log(`喵！這是第 ${animalCount} 次動物叫聲，最後叫的是：${lastAnimal}`);
  }
  
  function getStats() {
    return {
      totalCalls: animalCount,
      lastAnimal: lastAnimal
    };
  }
  
  return {
    dog: dogsay,
    cat: catsay,
    stats: getStats
  };
}

// 使用閉包模組
const animalModule = Module();
animalModule.dog(); // 輸出：汪！這是第 1 次動物叫聲，最後叫的是：狗
animalModule.cat(); // 輸出：喵！這是第 2 次動物叫聲，最後叫的是：貓
animalModule.dog(); // 輸出：汪！這是第 3 次動物叫聲，最後叫的是：狗

// 查看統計資訊
console.log(animalModule.stats()); // 輸出：{ totalCalls: 3, lastAnimal: '狗' }
```

##### 模組化閉包作用域結構

{% mermaid graph TD %}
    subgraph "Module 函式作用域"
        A["let animalCount = 0<br/>共享計數變數"]
        B["let lastAnimal = ''<br/>共享狀態變數"]
        C["function dogsay() {<br/>animalCount++;<br/>lastAnimal = '狗';<br/>console.log(...);<br/>}"]
        D["function catsay() {<br/>animalCount++;<br/>lastAnimal = '貓';<br/>console.log(...);<br/>}"]
        E["function getStats() {<br/>return {<br/>totalCalls: animalCount,<br/>lastAnimal: lastAnimal<br/>};<br/>}"]
        F["return {<br/>dog: dogsay,<br/>cat: catsay,<br/>stats: getStats<br/>}"]
    end
    
    subgraph "閉包引用關係"
        G["dogsay 函式<br/>引用 animalCount 和 lastAnimal<br/>形成閉包"]
        H["catsay 函式<br/>引用 animalCount 和 lastAnimal<br/>形成閉包"]
        I["getStats 函式<br/>引用 animalCount 和 lastAnimal<br/>形成閉包"]
        J["三個函式共享同一個作用域<br/>狀態在函式間保持"]
    end
    
    A --> C
    A --> D
    A --> E
    B --> C
    B --> D
    B --> E
    C --> F
    D --> F
    E --> F
    
    C -.->|"閉包引用"| G
    D -.->|"閉包引用"| H
    E -.->|"閉包引用"| I
    G --> J
    H --> J
    I --> J
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:4px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:4px
    style C fill:#e8f5e8,stroke:#2e7d32,stroke-width:4px
    style D fill:#fff3e0,stroke:#ef6c00,stroke-width:4px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:4px
    style F fill:#f1f8e9,stroke:#388e3c,stroke-width:4px
    style G fill:#e0f2f1,stroke:#00695c,stroke-width:3px
    style H fill:#fff8e1,stroke:#f57f17,stroke-width:3px
    style I fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
    style J fill:#e8f5e8,stroke:#2e7d32,stroke-width:3px
{% endmermaid %}

### 函式內的 this

`this` 是 JavaScript 中一個重要的關鍵字，它代表當前執行環境的上下文物件。`this` 的值取決於函式如何被呼叫，而不是函式如何被定義。

{% note info %}
**this 的核心概念：**
- `this` 的值在函式執行時才決定
- `this` 指向呼叫函式的物件
- 不同的呼叫方式會產生不同的 `this` 值
{% endnote %}

#### 基本 this 範例

```javascript this-basic.js
function room() {
  console.log(this.word); // 印出 this 物件內的 word 變數
}

var word = 'A'; // 全域變數

var obj = {
  word: 'B',
  first: room,
  second: {
    word: 'C',
    goto: room
  }
};

// 不同的呼叫方式，this 指向不同物件
room();           // 輸出：A (this 指向全域物件)
obj.first();      // 輸出：B (this 指向 obj)
obj.second.goto(); // 輸出：C (this 指向 obj.second)
```

#### this 的呼叫方式

{% mermaid graph TD %}
    subgraph "this 的決定方式"
        A["函式呼叫方式"] --> B["this 指向的物件"]
        B --> C["函式執行時的上下文"]
    end
    
    subgraph "呼叫方式分類"
        D["1. 直接呼叫<br/>room()"]
        E["2. 物件方法呼叫<br/>obj.method()"]
        F["3. 建構函式呼叫<br/>new Constructor()"]
        G["4. 箭頭函式<br/>() => {}"]
    end
    
    subgraph "this 指向"
        H["全域物件<br/>(window/global)"]
        I["呼叫的物件<br/>(obj)"]
        J["新建立的實例<br/>(instance)"]
        K["外層的 this<br/>(lexical)"]
    end
    
    A --> D
    A --> E
    A --> F
    A --> G
    
    D --> H
    E --> I
    F --> J
    G --> K
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:4px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:4px
    style C fill:#e8f5e8,stroke:#2e7d32,stroke-width:4px
    style D fill:#fff3e0,stroke:#ef6c00,stroke-width:3px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:3px
    style F fill:#f1f8e9,stroke:#388e3c,stroke-width:3px
    style G fill:#e0f2f1,stroke:#00695c,stroke-width:3px
    style H fill:#fff8e1,stroke:#f57f17,stroke-width:3px
    style I fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
    style J fill:#e8f5e8,stroke:#2e7d32,stroke-width:3px
    style K fill:#fff3e0,stroke:#ef6c00,stroke-width:3px
{% endmermaid %}

#### 現代 JavaScript 中的 this

```javascript this-modern.js
// 1. 全域環境中的 this
console.log(this); // 在瀏覽器中指向 window，在 Node.js 中指向 global

// 2. 物件方法中的 this
const person = {
  name: '小明',
  age: 25,
  sayHello() {
    console.log(`你好，我是 ${this.name}，今年 ${this.age} 歲`);
  },
  birthday: function() {
    this.age++;
    console.log(`生日快樂！現在 ${this.age} 歲了`);
  }
};

person.sayHello(); // 輸出：你好，我是 小明，今年 25 歲
person.birthday(); // 輸出：生日快樂！現在 26 歲了
```


#### this 的執行環境圖解

{% mermaid graph TD %}
    subgraph "this 的執行環境"
        A["全域環境<br/>this = window/global"]
        B["物件方法<br/>this = 呼叫的物件"]
        C["建構函式<br/>this = 新建立的實例"]
        D["箭頭函式<br/>this = 外層的 this"]
    end
    
    subgraph "呼叫方式"
        E["直接呼叫<br/>func()"]
        F["物件方法<br/>obj.method()"]
        G["建構函式<br/>new Constructor()"]
        H["箭頭函式<br/>() => {}"]
    end
    
    subgraph "this 指向"
        I["全域物件<br/>window/global"]
        J["呼叫物件<br/>obj"]
        K["新實例<br/>instance"]
        L["詞法 this<br/>outer this"]
    end
    
    E --> I
    F --> J
    G --> K
    H --> L
    
    A --> E
    B --> F
    C --> G
    D --> H
    
    style A fill:#e3f2fd,stroke:#1565c0,stroke-width:4px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:4px
    style C fill:#e8f5e8,stroke:#2e7d32,stroke-width:4px
    style D fill:#fff3e0,stroke:#ef6c00,stroke-width:4px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:3px
    style F fill:#f1f8e9,stroke:#388e3c,stroke-width:3px
    style G fill:#e0f2f1,stroke:#00695c,stroke-width:3px
    style H fill:#fff8e1,stroke:#f57f17,stroke-width:3px
    style I fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
    style J fill:#e8f5e8,stroke:#2e7d32,stroke-width:3px
    style K fill:#fff3e0,stroke:#ef6c00,stroke-width:3px
    style L fill:#fce4ec,stroke:#c2185b,stroke-width:3px
{% endmermaid %}

{% note warning %}
**注意事項：**
- `this` 的值在函式執行時才決定，不是定義時
- 箭頭函式沒有自己的 `this`，會繼承外層的 `this`
- 在嚴格模式下，全域函式的 `this` 是 `undefined`
- 使用 `call`、`apply`、`bind` 可以明確控制 `this` 的值
{% endnote %}

## 陣列資料處理
現在你知道匿名函式與箭頭函式，你可以在陣列處理時，透過函式返回一個結果。

- 陣列資料處理方法都需要傳入一個「函式」作為參數，通常用匿名函式或箭頭函式
- forEach 只做動作不回傳新陣列，map/filter/find/some/every/reduce 會根據邏輯回傳新資料或結果
- 常用於資料轉換、篩選、搜尋、統計等情境，是現代 JavaScript 處理資料的核心工具

### forEach
對陣列中的每個元素執行指定的動作，常用於遍歷或輸出資料。

```javascript array-foreach.js
let fruits = ["蘋果", "香蕉", "橘子"];
fruits.forEach(function(item, index) {
  console.log(index, item);
});
// 0 蘋果
// 1 香蕉
// 2 橘子
```

### map
將每個元素轉換為新值，並回傳一個新陣列，常用於資料格式轉換。

```javascript array-map.js
let numbers = [1, 2, 3];
let doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

### filter
篩選出符合條件的元素，回傳新陣列，常用於資料過濾。

```javascript array-filter.js
let scores = [80, 55, 90, 70];
let passed = scores.filter(score => score >= 60);
console.log(passed); // [80, 90, 70]
```

### find
尋找第一個符合條件的元素，回傳該元素本身，常用於搜尋特定資料。

```javascript array-find.js
let users = [
  { name: "小明", age: 18 },
  { name: "小華", age: 22 }
];
let user = users.find(u => u.age > 20);
console.log(user); // { name: "小華", age: 22 }
```

### some
檢查陣列中是否有任何一個元素符合條件，回傳布林值，常用於條件判斷。

```javascript array-some.js
let arr = [1, 3, 5, 8];
let hasEven = arr.some(n => n % 2 === 0);
console.log(hasEven); // true
```

### every
檢查陣列中是否所有元素都符合條件，回傳布林值，常用於整體驗證。

```javascript array-every.js
let arr = [2, 4, 6];
let allEven = arr.every(n => n % 2 === 0);
console.log(allEven); // true
```

### reduce
將陣列歸納為單一值，常用於加總、統計等彙總運算。

```javascript array-reduce.js
let nums = [1, 2, 3, 4];
let sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 10
```

## 展開運算子

展開運算子（Spread Operator） `...` 可以將陣列或物件的元素展開，方便用來合併、擴充或重組資料。

### 陣列的重組

```javascript spread-array.js
let ary = [1, 2, 3];
let newAry = [...ary, 4, 5];
console.log(newAry); // [1, 2, 3, 4, 5]

// 合併多個陣列
let a = [1, 2], b = [3, 4];
let merged = [...a, ...b];
console.log(merged); // [1, 2, 3, 4]
```

### 物件的重組

```javascript spread-object.js
let obj = { name: "小明", age: 18 };
let newObj = { ...obj, city: "台北" };
console.log(newObj); // { name: "小明", age: 18, city: "台北" }

// 覆蓋原有屬性
let updated = { ...obj, name: "小華" };
console.log(updated); // { name: "小華", age: 18 }
```

### 應用場景
- 陣列或物件的「淺拷貝」
- 新增或覆蓋資料時不改變原本的資料（不可變資料設計）
- React/Vue 等框架中常用於狀態更新

{% note info %}
**展開運算子小技巧**
- 陣列展開時順序很重要，`[...ary, x]` 會把 x 加在最後，`[x, ...ary]` 則加在最前面
- 物件展開時，後面的屬性會覆蓋前面的同名屬性
- 展開運算子只能做「淺拷貝」，巢狀物件或陣列仍是參考同一份資料
{% endnote %}

## 解構賦值

在現代 JavaScript 中，「解構賦值」（Destructuring Assignment）是一種方便的語法，能夠快速從陣列或物件中取出資料並賦值給變數，讓程式碼更簡潔易讀。

### 陣列的解構賦值

```javascript array-destructuring.js
let arr = [10, 20, 30];
let [a, b, c] = arr;
console.log(a); // 10
console.log(b); // 20
console.log(c); // 30

// 跳過某些元素
let [x, , z] = arr;
console.log(x, z); // 10 30

// 預設值
let [m, n, o = 100, p = 200] = [1, 2];
console.log(m, n, o, p); // 1 2 100 200

// 使用 ...rest 取得剩餘元素
let numbers = [10, 20, 30, 40, 50];
let [first, second, ...others] = numbers;
console.log(first);   // 10
console.log(second);  // 20
console.log(others);  // [30, 40, 50]
```

#### ...rest 的應用（陣列）
- 可以快速取得陣列中「剩下」的元素，常用於分割資料、批次處理等情境。
- 注意：...rest 只能放在最後一個解構變數。

{% note info %}
**小技巧：陣列解構與 ...rest**
- `[a, b, ...rest] = ary` 會將 ary 的前兩個元素分別賦值給 a、b，其餘元素組成新陣列 rest
- 常用於只關心前幾個元素，或需要將剩下的資料批次處理時
{% endnote %}

### 物件的解構賦值

```javascript object-destructuring.js
let person = { name: "小明", age: 18, city: "台北", job: "學生" };
let { name, age } = person;
console.log(name); // 小明
console.log(age);  // 18

// 重新命名變數
let { city: hometown } = person;
console.log(hometown); // 台北

// 預設值
let { job = "學生" } = person;
console.log(job); // 學生

// 使用 ...rest 取得剩餘屬性
let { name: n, ...rest } = person;
console.log(n);    // 小明
console.log(rest); // { age: 18, city: "台北", job: "學生" }
```

#### ...rest 的應用
- 可以快速取得物件中「剩下」的屬性，常用於過濾、拆分資料、React/Vue props 處理等情境。
- 注意：...rest 只能放在最後一個解構變數。

{% note info %}
**小技巧：物件解構與 ...rest**
- 物件解構時，`{ a, b, ...rest } = obj` 會將 obj 內除了 a、b 以外的所有屬性收集到 rest 物件中。
- 常用於需要排除部分屬性、或將剩餘屬性傳遞給其他元件/函式時。
{% endnote %}

### 巢狀解構

```javascript nested-destructuring.js
let user = {
  info: { id: 1, username: "loki" },
  scores: [90, 80, 70]
};
let {
  info: { username },
  scores: [first, second]
} = user;
console.log(username); // loki
console.log(first, second); // 90 80
```

### 參數解構

解構也常用於函式參數，讓函式更易讀且靈活：

```javascript function-param-destructuring.js
function printUser({ name, age }) {
  console.log(`姓名：${name}，年齡：${age}`);
}
printUser({ name: "小華", age: 22 });
```

### 交換變數

```javascript swap-destructuring.js
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

{% note info %}
**解構賦值小技巧與注意事項**
- 陣列解構依照「順序」對應，物件解構依照「屬性名稱」對應
- 可搭配預設值、重新命名、巢狀結構
- 物件解構時，變數名稱必須與屬性名稱一致，除非使用冒號重新命名
- 解構常用於函式參數、React/Vue 等框架的 props 處理、API 回傳資料解析等
- 若來源為 undefined/null，解構會報錯，建議搭配預設值或安全判斷
{% endnote %}

## 物件下的其他屬性值

物件的屬性值不僅可以是基本資料類型（字串、數字、布林值），還可以是更複雜的資料結構，包括函式、陣列、巢狀物件等。這讓物件成為 JavaScript 中非常強大的資料結構。

{% note info %}
**物件屬性值的類型：**
- 基本資料類型：字串、數字、布林值、null、undefined
- 複雜資料類型：函式、陣列、物件
- 特殊值：Symbol、BigInt
{% endnote %}

### 物件屬性值的各種類型

```javascript object-property-types.js
const person = {
  // 基本資料類型
  name: '小明',           // 字串
  age: 25,               // 數字
  isStudent: true,       // 布林值
  hobby: null,           // null
  address: undefined,    // undefined
  
  // 函式（方法）
  sayHello() {
    console.log(`你好，我是 ${this.name}`);
  },
  
  greet: function() {
    console.log(`歡迎，${this.name}！`);
  },
  
  // 箭頭函式（注意：箭頭函式的 this 不會指向物件）
  introduce: () => {
    console.log('這是箭頭函式');
  },
  
  // 陣列
  skills: ['JavaScript', 'HTML', 'CSS'],
  scores: [85, 92, 78],
  
  // 巢狀物件
  contact: {
    email: 'xiaoming@example.com',
    phone: '0912-345-678',
    address: {
      city: '台北市',
      district: '大安區'
    }
  },
  
  // 混合類型
  info: {
    name: '小明',
    age: 25,
    getInfo() {
      return `${this.name}, ${this.age} 歲`;
    }
  }
};

// 使用各種屬性
console.log(person.name);                    // 小明
console.log(person.skills[0]);              // JavaScript
console.log(person.contact.address.city);   // 台北市
person.sayHello();                          // 你好，我是 小明
person.greet();                             // 歡迎，小明！
console.log(person.info.getInfo());         // 小明, 25 歲
```

### 物件方法定義的兩種語法

```javascript object-methods-syntax.js
const calculator = {
  // 方法 1：簡寫語法（ES6+，推薦）
  add(a, b) {
    return a + b;
  },
  
  // 方法 2：傳統語法（ES5 及之前）
  subtract: function(a, b) {
    return a - b;
  },
  
  // 方法 3：箭頭函式（注意 this 的指向）
  multiply: (a, b) => {
    return a * b;
  },
  
  // 方法 4：匿名函式賦值
  divide: function(a, b) {
    return a / b;
  }
};

// 使用各種方法
console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(5, 3)); // 2
console.log(calculator.multiply(5, 3)); // 15
console.log(calculator.divide(6, 2));   // 3
```

### 物件屬性值的動態操作

```javascript object-dynamic-properties.js
const user = {
  name: '使用者',
  age: 30
};

// 動態添加屬性
user.email = 'user@example.com';
user.sayHi = function() {
  console.log(`你好，${this.name}！`);
};

// 動態添加巢狀物件
user.profile = {
  avatar: 'avatar.jpg',
  bio: '這是一個使用者'
};

// 動態添加陣列
user.posts = [
  { title: '第一篇文章', content: '內容...' },
  { title: '第二篇文章', content: '內容...' }
];

// 使用動態添加的屬性
user.sayHi();                           // 你好，使用者！
console.log(user.profile.avatar);       // avatar.jpg
console.log(user.posts[0].title);      // 第一篇文章

// 檢查屬性是否存在
console.log('email' in user);           // true
console.log(user.hasOwnProperty('age')); // true
```

### 物件屬性值的進階應用

```javascript object-advanced-properties.js
// 1. 計算屬性名稱（ES6+）
const propertyName = 'dynamicProperty';
const dynamicObj = {
  [propertyName]: '動態屬性值',
  [`method_${Date.now()}`]() {
    return '動態方法';
  }
};

// 2. 物件解構與重組
const { name, age, ...rest } = {
  name: '小明',
  age: 25,
  city: '台北',
  hobby: '程式設計'
};

// 3. 物件方法中的 this 綁定
const counter = {
  count: 0,
  increment() {
    this.count++;
    return this.count;
  },
  reset() {
    this.count = 0;
    return this.count;
  }
};

// 4. 物件作為函式參數
function processUser(user) {
  return {
    ...user,
    processed: true,
    timestamp: Date.now()
  };
}

const processedUser = processUser({
  name: '小明',
  age: 25
});
```

### 物件屬性值的類型檢查

```javascript object-type-checking.js
const mixedObject = {
  string: '字串',
  number: 42,
  boolean: true,
  array: [1, 2, 3],
  function: () => {},
  object: { key: 'value' },
  null: null,
  undefined: undefined
};

// 檢查各種屬性類型
console.log(typeof mixedObject.string);     // string
console.log(typeof mixedObject.number);     // number
console.log(typeof mixedObject.boolean);    // boolean
console.log(Array.isArray(mixedObject.array)); // true
console.log(typeof mixedObject.function);   // function
console.log(typeof mixedObject.object);     // object
console.log(mixedObject.null === null);    // true
console.log(mixedObject.undefined === undefined); // true
```

{% note warning %}
**注意事項：**
- 箭頭函式作為物件方法時，`this` 不會指向物件本身
- 使用 `Object.freeze()` 可以防止物件被修改
- 深層巢狀物件的修改需要特別注意
- 動態屬性名稱需要使用方括號語法
{% endnote %}

# 其他的建構函式與物件

JavaScript 提供了許多功能強大的「內建物件」與「建構函式」，讓我們可以方便地處理數學運算、字串操作、日期時間、陣列資料等各種常見需求。本章將介紹幾個最常用的內建物件（如 Date、Math、String、Array 等），並說明它們的基本用法與常見應用情境，幫助你在開發過程中靈活運用這些工具。

## Set

`Set` 是 ES6 新增的資料結構，用來儲存「不重複」的值集合。每個值在 Set 中只會出現一次，且元素的順序依插入順序排列。常見應用場景包括：
- 陣列去重（移除重複值）
- 資料集合判斷（如是否包含某元素）
- 集合運算（如交集、聯集、差集）

### 建立 Set
- `new Set()`：建立空集合
- `new Set(iterable)`：由可迭代物件（如陣列）建立集合

### 常用方法
- `add(value)`：新增元素
- `delete(value)`：刪除元素
- `has(value)`：判斷是否包含某值
- `clear()`：清空所有元素
- `size`：元素個數
- `forEach(fn)`：遍歷所有元素

### 範例
```javascript set-demo.js
let s = new Set();
s.add(1);
s.add(2);
s.add(2); // 重複不會加入
console.log(s); // Set(2) {1, 2}

let arr = [1, 2, 2, 3, 4, 4];
let unique = new Set(arr);
console.log(unique); // Set(4) {1, 2, 3, 4}
console.log(unique.has(3)); // true
unique.delete(2);
console.log(unique.size); // 3
unique.forEach(v => console.log(v)); // 1 3 4

// 轉回陣列
let ary = Array.from(unique);
console.log(ary); // [1, 3, 4]
```

{% note info %}
**小技巧：用 Set 快速陣列去重複**
- `let unique = Array.from(new Set(arr));`
- 這種寫法可快速將陣列重複值去除，常用於資料清理
{% endnote %}

## Map

`Map` 是 ES6 新增的建構函式，用來建立「鍵值對」資料結構。它和傳統的物件（Object）類似，但有更多彈性與現代化的特性。

### Map 的特性
- **任何型別都能當 key**：不只字串，物件、數字、函式等都可以當 key。
- **保留插入順序**：遍歷時會依照 key 加入的順序。
- **可直接迭代**：支援 `for...of`、`forEach` 等迭代方式。
- **高效查找與刪除**：適合大量動態增刪查的場景。

### 建立 Map
- 空 Map：`let map = new Map();`
- 由陣列初始化：`let map = new Map([[key1, value1], [key2, value2]]);`

### 常用方法
- `set(key, value)`：新增或更新鍵值對
- `get(key)`：取得指定 key 的值
- `has(key)`：判斷是否有指定 key
- `delete(key)`：刪除指定 key
- `clear()`：清空所有鍵值對
- `size`：Map 內元素個數
- `forEach(fn)`：遍歷所有鍵值對

### 範例
```javascript map-demo.js
let map = new Map();
map.set('name', '小明');
map.set(123, '數字 key');
let objKey = { id: 1 };
map.set(objKey, '物件 key');

console.log(map.get('name')); // 小明
console.log(map.get(123));    // 數字 key
console.log(map.get(objKey)); // 物件 key

console.log(map.has('name')); // true
map.delete(123);
console.log(map.size); // 2

// 遍歷 Map
map.forEach((value, key) => {
  console.log(key, value);
});

// 也可用 for...of
for (let [key, value] of map) {
  console.log(key, value);
}
```

### Map vs Object 差異
| 特性     | Object               | Map                            |
| -------- | -------------------- | ------------------------------ |
| key 型別 | 字串、Symbol         | 任何型別                       |
| 順序     | 無明確順序           | 保留插入順序                   |
| 可迭代性 | 需用 `Object.keys()` | 直接可用 `for...of`、`forEach` |
| 長度     | 需手動計算           | `map.size`                     |
| 性能     | 大量增刪查較慢       | 更適合頻繁操作                 |

{% note info %}
**小技巧：Map 的應用場景**
- 適合需要「物件當 key」、保留插入順序、或大量動態增刪查的情境。
- 若 key 都是字串且結構簡單，Object 也能勝任。
{% endnote %}

## Math

`Math` 物件是 JavaScript 提供的數學工具箱，包含各種常用的數學常數與運算方法。它不是建構函式，無法用 `new Math()` 建立，只能直接使用其屬性與方法。

### 常見屬性
- `Math.PI`：圓周率 π
- `Math.E`：自然常數 e

### 常用方法
- `Math.abs(x)`：取絕對值
- `Math.round(x)`：四捨五入
- `Math.floor(x)`：無條件捨去
- `Math.ceil(x)`：無條件進位
- `Math.max(a, b, ...)`：取最大值
- `Math.min(a, b, ...)`：取最小值
- `Math.random()`：產生 0~1 之間的隨機小數
- `Math.pow(x, y)`：x 的 y 次方
- `Math.sqrt(x)`：開根號

### 範例
```javascript math-demo.js
console.log(Math.PI);           // 3.141592653589793
console.log(Math.abs(-10));     // 10
console.log(Math.round(2.7));   // 3
console.log(Math.floor(2.7));   // 2
console.log(Math.ceil(2.1));    // 3
console.log(Math.max(1, 5, 3)); // 5
console.log(Math.random());     // 0~1 之間的隨機數
console.log(Math.pow(2, 3));    // 8
console.log(Math.sqrt(16));     // 4
```

{% note info %}
**小技巧：Math.random() 產生隨機整數**
- 產生 1~10 的隨機整數：
  ```javascript
  let n = Math.floor(Math.random() * 10) + 1;
  ```
- 產生指定範圍的隨機整數：
  ```javascript
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  ```
{% endnote %}

### 練習

{% tabs 大樂透產生器 %}
<!-- tab 題目 -->
請寫一個 JavaScript 函式，產生 1~46 之間隨機且不重複的 6 個號碼，並將結果由小到大排序，回傳一個陣列。

- 輸出範例：`[3, 8, 15, 22, 34, 45]`
- 提示：可用 `Math.random()`、`Set`、`Array`、`sort()` 等方法
<!-- endtab -->
<!-- tab 答案 -->
**Set + while 寫法（有放回抽樣）**

```javascript lotto-demo.js
// 產生 1~46 的大樂透號碼，隨機取 6 個不重複並排序 （有放回抽樣）
function getLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    let n = Math.floor(Math.random() * 46) + 1;
    numbers.add(n);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

console.log(getLottoNumbers()); // 例如：[3, 8, 15, 22, 34, 45]
```

**抽球寫法（無放回抽樣）**

```javascript lotto-demo.js
function getLottoNumbers() {
  let pool = Array.from({ length: 46 }, (_, i) => i + 1);
  let selected = [];

  for (let i = 0; i < 6; i++) {
    let idx = Math.floor(Math.random() * pool.length);
    selected.push(pool[idx]);
    pool.splice(idx, 1);
  }

  return selected.sort((a, b) => a - b);
}

console.log(getLottoNumbers()); // 例如：[3, 8, 15, 22, 34, 45]
```

<!-- endtab -->
{% endtabs %}

## Date

`Date` 物件用來處理日期與時間。可以取得現在時間、格式化日期、計算時間差等。

### 建立日期物件
- `new Date()`：取得現在時間，並回傳一個 `Date` 物件。這個物件內建許多原生方法（如 `getFullYear()`、`getMonth()` 等），可用來取得或操作日期與時間的各種資訊。
- `new Date（年，月，日，時，分，秒）`：指定年月日時分秒（注意：月從 0 開始，0 代表 1 月）
- `new Date（字串）`：由字串（建議使用 ISO 格式，如 `2024-08-01T12:00:00`）建立日期。ISO 格式（YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss）最能確保跨瀏覽器解析正確。

```js
// 建立 Date 物件的三種常見寫法範例

// 1. 取得現在時間
let now = new Date();
console.log("現在時間：", now);

// 2. 指定年月日時分秒（注意：月份從 0 開始，0 代表 1 月）
let birthday = new Date(1990, 4, 15, 8, 30, 0); // 1990/5/15 08:30:00
console.log("指定日期（年月日時分秒）：", birthday);

// 3. 由字串建立日期（建議使用 ISO 格式）
let isoDate = new Date("2024-08-01T12:00:00");
console.log("由字串建立日期：", isoDate);
```

### get 取得方法系列
- `getFullYear()`：取得年份
- `getMonth()`：取得月份（0~11）
- `getDate()`：取得日期（1~31）
- `getDay()`：取得星期（0~6，0 代表星期日）
- `getHours()`：取得小時
- `getMinutes()`：取得分鐘
- `getSeconds()`：取得秒數
- `getTime()`：取得自 1970/1/1 00:00:00 UTC 以來的「時間戳記」（Timestamp，單位為毫秒，millisecond）
- `toLocaleString()`：格式化日期字串，會根據瀏覽器用戶的地區（Locale）自動顯示對應的日期與時間格式

```javascript date-demo.js
let now = new Date();
console.log(now); // 當下時間
console.log(now.getFullYear()); // 年
console.log(now.getMonth() + 1); // 月（要 +1）
console.log(now.getDate()); // 日
console.log(now.getDay()); // 星期
console.log(now.getHours(), now.getMinutes(), now.getSeconds()); // 時分秒
console.log(now.toLocaleString()); // 依地區格式化

// 指定日期
let d = new Date(2024, 7, 1); // 2024/8/1
console.log(d.toLocaleDateString());
```

{% note info %}
**小技巧：計算兩個日期的天數差**
  ```javascript
d1 = new Date('2024-08-01');
d2 = new Date('2024-08-10');
let diff = (d2 - d1) / (1000 * 60 * 60 * 24);
console.log(diff); // 9
```
- 日期運算時，直接相減會得到毫秒差，需轉換為天數
{% endnote %}

### set 指定方法系列
- `setFullYear(year)`：設定年份
- `setMonth(month)`：設定月份（0~11）
- `setDate(date)`：設定日期（1~31）
- `setHours(hours)`：設定小時（0~23）
- `setMinutes(minutes)`：設定分鐘（0~59）
- `setSeconds(seconds)`：設定秒數（0~59）
- `setTime(timestamp)`：設定時間戳記
- `setMilliseconds(ms)`：設定毫秒（0~999）

```javascript date-set-demo.js
let date = new Date();
console.log('原始時間：', date.toLocaleString());

// 設定年份
date.setFullYear(2025);
console.log('設定年份後：', date.toLocaleString());

// 設定月份（注意：0=1月，11=12月）
date.setMonth(5); // 設定為6月
console.log('設定月份後：', date.toLocaleString());

// 設定日期
date.setDate(15);
console.log('設定日期後：', date.toLocaleString());

// 設定時間
date.setHours(14, 30, 45); // 時、分、秒
console.log('設定時間後：', date.toLocaleString());

// 組合設定
let customDate = new Date();
customDate.setFullYear(2024, 7, 15); // 年、月、日
customDate.setHours(9, 0, 0); // 時、分、秒
console.log('自訂日期：', customDate.toLocaleString());
```

{% note info %}
**小技巧：使用 set 方法調整日期**
```javascript
// 將日期調整到下個月的同一天
function nextMonthSameDay(date) {
    let newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    return newDate;
}

// 將時間調整到明天同一時間
function tomorrowSameTime(date) {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    return newDate;
}

// 將時間調整到下一小時
function nextHour(date) {
    let newDate = new Date(date);
    newDate.setHours(date.getHours() + 1);
    return newDate;
}

let now = new Date();
console.log('現在：', now.toLocaleString());
console.log('下個月同一天：', nextMonthSameDay(now).toLocaleString());
console.log('明天同一時間：', tomorrowSameTime(now).toLocaleString());
console.log('下一小時：', nextHour(now).toLocaleString());
```
- 利用 set 方法可以方便地調整日期和時間
{% endnote %}

### 練習
{% tabs 跨年倒數 %}
<!-- tab 題目 -->
請寫一個 JavaScript 程式，計算「距離今年跨年（12/31 23:59:59）」還有幾天、幾小時、幾分鐘、幾秒，並將結果用 `console.log` 輸出。

- 提示：可用 `Date` 物件、時間相減、毫秒轉換等技巧

<!-- endtab -->
<!-- tab 答案 -->
```javascript date-countdown.js
function getCountdownToNewYear() {
  const now = new Date();
  const year = now.getFullYear();
  // 12/31 23:59:59
  const newYear = new Date(year, 11, 31, 23, 59, 59);
  let diff = Math.max(0, newYear - now); // 毫秒差

  const sec = Math.floor(diff / 1000) % 60;
  const min = Math.floor(diff / (1000 * 60)) % 60;
  const hr = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));

  console.log(`距離今年跨年還有 ${day} 天 ${hr} 小時 ${min} 分 ${sec} 秒`);
}

getCountdownToNewYear();
```
<!-- endtab -->
{% endtabs %}

# 錯誤處理與除錯

學習如何處理錯誤和除錯程式。

## 常見錯誤類型

```javascript common-errors.js
// 語法錯誤（Syntax Error）
// console.log("Hello World"  // 缺少右括號

// 參照錯誤（Reference Error）
// console.log(unknownVariable); // 變數不存在

// 類型錯誤（Type Error）
// let number = 5;
// number.toUpperCase(); // 數字沒有 toUpperCase 方法

// 範圍錯誤（Range Error）
// let array = new Array(-1); // 陣列長度不能為負數
```

## 使用 try-catch 處理錯誤

在程式執行過程中，難免會遇到各種錯誤（例如：資料格式錯誤、除以零、存取不存在的屬性等）。如果不加以處理，這些錯誤會導致程式中斷。JavaScript 提供了 `try-catch` 機制，讓我們可以「攔截」錯誤，並給予適當的處理方式，提升程式的穩定性與使用者體驗。

- `try` 區塊：放入可能發生錯誤的程式碼
- `catch` 區塊：當 try 內發生錯誤時，會跳到這裡執行錯誤處理
- `finally` 區塊（可選）：不論有無錯誤，最後都會執行這裡的程式碼（常用於資源釋放、收尾工作）

這種結構讓我們可以針對錯誤進行友善提示、記錄錯誤資訊，甚至避免整個程式崩潰。

```javascript try-catch.js
function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error('除數不能為零');
        }
        return a / b;
    } catch (error) {
        console.error('發生錯誤：', error.message);
        return null;
    } finally {
        console.log('除法運算完成');
    }
}

console.log(divide(10, 2));  // 5
console.log(divide(10, 0));  // null，並顯示錯誤訊息
```

{% note info %}
**補充說明：throw new Error(message) 是什麼？**
- `throw` 是 JavaScript 用來「主動拋出」錯誤的關鍵字，會立即中斷目前的程式流程，並將錯誤物件傳遞到最近的 catch 區塊。
- `new Error(message)` 會建立一個錯誤物件，訊息內容可自訂。
- 結合起來，`throw new Error('除數不能為零')` 代表「主動產生一個錯誤，並帶有自訂訊息」，讓我們可以針對特定情境（如除以零）給出明確的錯誤提示。
- 這種寫法常用於資料驗證、API 回傳錯誤、流程控制等場合。
{% endnote %}

## 除錯技巧

```javascript debugging-tips.js
// 1. 使用 console.log 追蹤程式執行
function calculateSum(numbers) {
    console.log('開始計算總和，輸入：', numbers);
    
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        console.log(`第 ${i} 個數字：${numbers[i]}`);
        sum += numbers[i];
        console.log(`目前總和：${sum}`);
    }
    
    console.log('計算完成，結果：', sum);
    return sum;
}

// 2. 使用 console.table 顯示陣列或物件
let students = [
    { name: '小明', score: 85 },
    { name: '小華', score: 92 },
    { name: '小李', score: 78 }
];
console.table(students);

// 3. 使用 console.time 測量執行時間
console.time('計算時間');
let result = calculateSum([1, 2, 3, 4, 5]);
console.timeEnd('計算時間');

// 4. 條件性除錯
const DEBUG = true;
function debugLog(message) {
    if (DEBUG) {
        console.log('[DEBUG]', message);
    }
}

debugLog('這是除錯訊息');
```

## 輸入驗證

```javascript input-validation.js
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
        console.log('電子郵件驗證成功：', email);
        return true;
    } catch (error) {
        console.error('電子郵件驗證失敗：', error.message);
        return false;
    }
}

// 測試
processEmail('user@example.com');  // 成功
processEmail('');                  // 失敗
processEmail('invalid-email');     // 失敗
processEmail(123);                 // 失敗
```

# 學習總結

恭喜您完成了 JavaScript 基礎教學！讓我們回顧一下學習的內容：

## 已學習的概念

- **陣列**：儲存和操作多個值的資料結構
- **物件**：儲存相關資料的集合
- **函式**：撰寫可重複使用的程式碼塊
- **內建函式**：使用 JavaScript 提供的數學、字串、日期等功能
- **網頁整合**：將 JavaScript 整合到 HTML 網頁中
- **錯誤處理**：使用 try-catch 處理錯誤，學習除錯技巧

## 繼續學習的方向

{% note info %}
**進階主題建議：**
1. **非同步程式設計**：Promise 和 async/await
2. **ES6+ 新功能**：類別語法
3. **DOM 操作進階**：事件處理、表單驗證
4. **前端框架**：React、Vue.js 或 Angular
5. **Node.js**：使用 JavaScript 進行後端開發
6. **開發工具**：Webpack、Babel、ESLint
{% endnote %}

JavaScript 是一個不斷發展的語言，新的功能和最佳實踐會持續出現。保持學習的熱忱，並將所學應用到實際專案中，您很快就能成為一名優秀的 JavaScript 開發者！

記住：每個專業程式設計師都是從基礎開始的，重要的是持續練習和應用所學的知識。祝您在 JavaScript 的學習之路上順利！

# 學習資源

- [MDN Web Docs](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript) - 最權威的 JavaScript 文件
- [JavaScript.info](https://javascript.info/) - 深入淺出的 JavaScript 教學
- [ES6 功能介紹](https://es6.ruanyifeng.com/) - 現代 JavaScript 新功能
