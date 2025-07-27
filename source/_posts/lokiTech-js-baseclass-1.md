---
title: "[基礎課程] JavaScript 教學（一）：現代基礎觀念"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-13 17:27:33
---
![](assets/images/D8v3RVP.png)

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

# 基礎觀念

在開始撰寫程式之前，讓我們先了解 JavaScript 的特性和基本概念，然後學習如何撰寫第一個程式。

JavaScript 是一種程式語言，具有以下特點：

- **直譯式語言**：不需要編譯，瀏覽器可以直接執行
- **動態型別**：變數的資料型別可以在執行時改變
- **區分大小寫**：`hello` 和 `Hello` 是不同的
- **弱型別**：不需要事先宣告變數的資料型別

我們主要使用瀏覽器的 Console 來練習 JavaScript：

1. 開啟瀏覽器（建議使用 Chrome）
2. 按 <kbd>F12</kbd> 開啟開發者工具
3. 點選 "Console" 分頁
4. 在這裡可以直接輸入 JavaScript 程式碼

## 第一個 JavaScript 程式

讓我們從最簡單的程式開始學習。在 JavaScript 中，我們可以使用 `console.log()` 來輸出訊息：

```javascript first-program.js
console.log("Hello, World!");
```

當您在瀏覽器 Console 中輸入這行程式碼並按 <kbd>Enter</kbd> 時，會看到輸出：`Hello, World!`

{% note success %}
**跟著做：**
1. 打開瀏覽器的 Console
2. 輸入 `console.log("Hello, World!");`
3. 按 <kbd>Enter</kbd> 執行
4. 觀察輸出結果
{% endnote %}

除了 `console.log()` 之外，還有其他輸出方式：

```javascript output-methods.js
// 一般訊息
console.log("這是一般訊息");

// 警告訊息
console.warn("這是警告訊息");

// 錯誤訊息
console.error("這是錯誤訊息");

// 資訊訊息
console.info("這是資訊訊息");

// 彈出視窗（不建議常用）
alert("這是彈出視窗");
```

{% note info %}
**現代最佳實踐：**
- 主要使用 `console.log()` 來觀察程式執行結果
- 使用 `console.warn()` 顯示警告訊息
- 使用 `console.error()` 顯示錯誤訊息
- 避免在正式網站中使用 `alert()`
{% endnote %}

## 整合到網頁

現在我們學習如何將 JavaScript 整合到 HTML 網頁中，這是 JavaScript 實際應用的重要環節。

### 內嵌 JavaScript

最簡單的方式是直接在 HTML 中加入 `<script>` 標籤：

```html inline-js.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一個 JavaScript 網頁</title>
</head>
<body>
    <h1>Hello, JavaScript!</h1>
    
    <script>
        console.log("網頁載入完成！");
        console.log("今天是：" + new Date().toLocaleString());
    </script>
</body>
</html>
```

### DOM 操作需等載入

當我們需要操作網頁元素時，必須等待網頁完全載入：

```html wait-for-load.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>等待載入示例</title>
</head>
<body>
    <h1>JavaScript 整合示例</h1>
    <p id="message">原始內容</p>
    <button id="myButton">點擊我</button>

    <script>
        // 等待網頁載入完成再執行
        document.addEventListener('DOMContentLoaded', function() {
            console.log("網頁載入完成，可以開始操作！");
            
            // 修改文字內容
            document.getElementById('message').textContent = 'JavaScript 已成功載入！';
            
            // 為按鈕添加點擊功能
            document.getElementById('myButton').addEventListener('click', function() {
                alert('按鈕被點擊了！');
            });
        });
    </script>
</body>
</html>
```

{% note info %}
**關於 DOMContentLoaded：**
- `DOMContentLoaded` 事件會在網頁的 HTML 結構完全載入後觸發
- 這確保我們的 JavaScript 能夠找到頁面上的元素
- DOM（Document Object Model）是下一篇教學的重點
- 現在只需記住：要操作網頁元素時，先等待網頁載入完成
{% endnote %}

### 外部 JavaScript 檔案

將 JavaScript 程式碼放在外部檔案中，讓 HTML 更簡潔：

```html external-js.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>外部 JavaScript</title>
</head>
<body>
    <h1>外部 JavaScript 示例</h1>
    <p id="demo">載入中。..</p>
    
    <!-- 引入外部 JavaScript 檔案 -->
    <script src="script.js"></script>
</body>
</html>
```

```javascript script.js
// 外部 JavaScript 檔案
document.addEventListener('DOMContentLoaded', function() {
    console.log("外部 JavaScript 檔案已載入！");
    
    // 修改頁面內容
    document.getElementById('demo').textContent = '外部 JavaScript 已載入！';
    
    // 顯示當前時間
    let now = new Date();
    let timeString = now.toLocaleString();
    console.log("當前時間：" + timeString);
});
```

### JavaScript 放置位置

```html script-placement.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 放置位置</title>
    
    <!-- 可以放在 head 中 -->
    <script>
        console.log("這是在 head 中的 JavaScript");
    </script>
</head>
<body>
    <h1>JavaScript 放置示例</h1>
    
    <!-- 也可以放在 body 中 -->
    <script>
        console.log("這是在 body 中的 JavaScript");
    </script>
    
    <!-- 通常放在 body 結束前 -->
    <script>
        console.log("這是在 body 結束前的 JavaScript");
        console.log("這個位置確保 HTML 元素都已載入");
    </script>
</body>
</html>
```

{% note warning %}
**載入順序很重要：**
- JavaScript 程式碼會按照在 HTML 中出現的順序執行
- 如果要操作 HTML 元素，必須確保元素已經載入
- 建議將 JavaScript 放在 `</body>` 標籤前，或使用 `DOMContentLoaded` 事件
{% endnote %}

{% note success %}
**跟著做：基本整合練習**
1. 建立一個 HTML 檔案，在其中使用 `console.log()` 輸出歡迎訊息
2. 嘗試修改網頁標題的文字內容
3. 建立一個外部 JavaScript 檔案並引入到 HTML 中
4. 使用瀏覽器的開發者工具查看 Console 輸出
{% endnote %}

## 註解語法

註解是程式中的說明文字，不會被執行，主要用來解釋程式碼的用途。良好的註解習慣是專業程式開發的重要技能。

### 註解的種類

JavaScript 有兩種註解方式：

```javascript comments.js
// 這是單行註解
// 任何在 // 後面的文字都會被忽略

/*
這是多行註解
可以寫很多行
都不會被執行
*/

console.log("這行會被執行"); // 這行後面的註解不會執行
```

### 註解的用途

```javascript comment-usage.js
// 程式說明
console.log("歡迎來到 JavaScript 世界");

// 暫時隱藏程式碼
// console.log("這行被註解掉了，不會執行");

/* 
多行註解常用於：
1. 程式碼的詳細說明
2. 版權資訊
3. 暫時隱藏大段程式碼
*/

// 解釋複雜的邏輯
let result = 5 * 3 + 2; // 先乘除後加減，結果是 17
```

{% note warning %}
**注意事項：**
- 註解要寫得清楚明瞭
- 不要過度註解顯而易見的程式碼
- 註解要與程式碼保持同步更新
- 用註解來解釋「為什麼」而不是「是什麼」
{% endnote %}

## 變數與資料

變數是用來儲存資料的容器，就像是一個有名字的盒子。在 JavaScript 中，變數可以儲存不同類型的資料，如數字、文字、布林值等。

### 變數宣告

現代 JavaScript 主要使用 `let` 和 `const` 來宣告變數：

```javascript variable-declaration.js
// 使用 let 宣告可以改變的變數
let name = "小明";
let age = 25;

// 使用 const 宣告不會改變的變數（常數）
const PI = 3.14159;
const SCHOOL_NAME = "資訊學院";
```

### 變數的使用

```javascript variable-usage.js
// 宣告變數
let userName = "小華";
let userAge = 30;

// 使用變數
console.log(userName); // 小華
console.log(userAge);  // 30

// 修改變數的值
userName = "小李";
userAge = 28;

console.log(userName); // 小李
console.log(userAge);  // 28
```

### let vs const

```javascript let-vs-const.js
// let：可以重新賦值
let score = 85;
score = 90; // 允許
console.log(score); // 90

// const：不能重新賦值
const maxScore = 100;
// maxScore = 120; // 錯誤！不能改變 const 的值

// 但是 const 物件和陣列的內容可以修改
const student = { name: "小明", age: 20 };
student.age = 21; // 允許修改屬性
console.log(student.age); // 21
```

{% note warning %}
**關於 var 關鍵字**
- `var` 是 JavaScript 早期的變數宣告方式
- `var` 宣告的變數沒有區塊作用域，會提升到函式頂部
- 現代 JavaScript 應避免使用 `var`，改用 `let` 和 `const`
- `var` 容易造成變數污染和作用域混淆
{% endnote %}


### 隱式全域變數

如果直接賦值給一個沒有宣告的變數，會創建隱式全域變數（或稱呼為臨時變數），這是很危險的做法：

```javascript implicit-global.js
// 危險的做法：沒有使用 let 或 const
userName = "小明"; // 創建了全域變數，很危險！

// 正確的做法
let userName = "小明"; // 明確宣告變數
```

#### 為什麼全域變數很危險？

全域變數可以在任何位置讀取或修改。當不同程式碼範圍都有變數想要暫存資料時，可能會不小心用到別人的變數，覆蓋掉別人的資料：

```javascript variable-collision.js
// 全域變數：任何地方都可以存取和修改
userName = "小明";

// 第一段程式碼
function showGreeting() {
    console.log("你好，" + userName); // 小明
}

// 第二段程式碼（不小心用了相同的變數名）
function processData() {
    userName = "處理中。..";  // 意外覆蓋了別人的資料！
    console.log("狀態：" + userName);
}

// 執行結果
showGreeting();  // 你好，小明
processData();   // 狀態：處理中。..
showGreeting();  // 你好，處理中。..（資料被破壞了！）
```

#### 作用域的保護作用

`let` 因為作用域的關係，即使重複撞名在每段程式碼內，也不會發生共用變數。作用域是指花括號 `{}` 包圍的範圍：

```javascript scope-protection.js
// 使用 let 宣告，有作用域保護
let userName = "小明";

// 第一段程式碼
function showGreeting() {
    console.log("你好，" + userName); // 小明
}

// 第二段程式碼
function processData() {
    let userName = "處理中。..";  // 只在這個 {} 內有效
    console.log("狀態：" + userName);
}

// 執行結果
showGreeting();  // 你好，小明
processData();   // 狀態：處理中。..
showGreeting();  // 你好，小明（資料沒有被破壞）
```

#### 作用域範例

```javascript scope-example.js
let globalVar = "全域變數";

{
    let localVar = "區域變數";
    console.log(globalVar); // 可以存取全域變數
    console.log(localVar);  // 可以存取區域變數
}

console.log(globalVar); // 可以存取全域變數
// console.log(localVar); // 錯誤！無法存取區域變數
```

{% note danger %}
**全域變數的問題：**
- 任何地方都可以讀取和修改
- 不同程式碼用相同變數名會互相覆蓋
- 很難知道是誰修改了變數
{% endnote %}

{% note success %}
**解決方法：**
- 永遠使用 `let` 或 `const` 宣告變數
- 利用作用域（花括號 `{}`）保護變數
- 避免使用全域變數
{% endnote %}

## 基本資料型別

JavaScript 有幾種基本的資料型別，了解這些型別是程式設計的基礎。

### 數字（Number）

```javascript number-type.js
// 整數
let age = 25;
let count = 100;

// 小數
let price = 299.99;
let temperature = 36.5;

// 負數
let debt = -1000;
let freezingPoint = -273.15;

// 特殊數字值的產生
let infinity = 1 / 0;              // 除以零得到 Infinity
let notANumber = "hello" / 2;      // 字串除以數字得到 NaN

console.log(age);         // 25
console.log(price);       // 299.99
console.log(debt);        // -1000
console.log(infinity);    // Infinity
console.log(notANumber);  // NaN

// 更多產生特殊值的方式
console.log(10 / 0);      // Infinity
console.log(-10 / 0);     // -Infinity
console.log(0 / 0);       // NaN
console.log(Math.sqrt(-1)); // NaN（負數開平方根）
```

### 字串（String）

```javascript string-type.js
// 使用雙引號
let message = "Hello, World!";

// 使用單引號
let name = '小明';

// 使用模板字串（反引號）
let greeting = `你好，${name}！`;

// 包含特殊字元的字串
let quote = "他說：\"今天天氣很好、"";
let multiLine = `這是
多行
字串`;

console.log(message);     // Hello, World!
console.log(name);        // 小明
console.log(greeting);    // 你好，小明！
console.log(quote);       // 他說："今天天氣很好"
console.log(multiLine);   // 這是、n 多行、n 字串
```

### 布林值（Boolean）

```javascript boolean-type.js
// 只有兩個值：true 或 false
let isStudent = true;
let isGraduated = false;

// 布林值常用於條件判斷
let hasPermission = true;
let isLoggedIn = false;

console.log(isStudent);    // true
console.log(isGraduated);  // false
console.log(hasPermission); // true
console.log(isLoggedIn);   // false
```

### 檢查資料型別

```javascript typeof-operator.js
let name = "小明";
let age = 25;
let isStudent = true;
let nothing = null;
let undefined_var;

console.log(typeof name);          // string
console.log(typeof age);           // number
console.log(typeof isStudent);     // boolean
console.log(typeof nothing);       // object (JavaScript 的歷史 bug)
console.log(typeof undefined_var); // undefined
```

{% note info %}
**typeof null 的歷史 bug：**
`typeof null` 返回 `"object"` 是 JavaScript 的一個著名錯誤。在 JavaScript 的第一版實作中，所有值都用 32 位元表示，而 `null` 的表示方式剛好和物件相同（都是 000 開頭）。雖然這個錯誤被發現了，但為了保持向後相容性，一直沒有修正。正確的做法是判斷 `null` 應該使用 `value === null`。
{% endnote %}

### 特殊值

```javascript special-values.js
// undefined：未定義的值
let notDefined;
console.log(notDefined); // undefined

// null：空值
let emptyValue = null;
console.log(emptyValue); // null

// NaN：不是數字
let result = "hello" / 2;
console.log(result); // NaN

// 檢查特殊值
console.log(typeof notDefined); // undefined
console.log(typeof emptyValue); // object
console.log(typeof result);     // number （即使是 NaN)
```

{% note info %}
**型別轉換：**
JavaScript 會自動進行型別轉換，但有時會產生意外的結果。建議明確進行型別轉換：
- 轉數字：`Number("123")` 
- 轉字串：`String(123)`
- 轉布林：`Boolean(0)`
{% endnote %}

## 運算子

運算子用來對變數和值進行運算。理解運算子是程式設計的基礎，它們讓我們能夠進行數學計算、比較值、以及組合邏輯條件。

### 算術運算子

```javascript arithmetic-operators.js
let a = 10;
let b = 3;

console.log(a + b); // 13 加法
console.log(a - b); // 7  減法
console.log(a * b); // 30 乘法
console.log(a / b); // 3.333... 除法
console.log(a % b); // 1  餘數運算（取模）

// 指數運算 (ES2016)
console.log(a ** b); // 1000 (10 的 3 次方）

// 遞增遞減
let count = 5;
count++;      // count = count + 1
console.log(count); // 6
count--;      // count = count - 1
console.log(count); // 5
```

### 賦值運算子

```javascript assignment-operators.js
let score = 100;

score = score + 10;  // 基本賦值
score += 10;         // 複合賦值（相當於 score = score + 10）
score -= 5;          // 複合賦值（相當於 score = score - 5）
score *= 2;          // 複合賦值（相當於 score = score * 2）
score /= 4;          // 複合賦值（相當於 score = score / 4）
score %= 3;          // 複合賦值（相當於 score = score % 3）

console.log(score);  // 最終結果

// 字串的複合賦值
let message = "Hello";
message += " World";
console.log(message); // Hello World
```

### 比較運算子

```javascript comparison-operators.js
let x = 5;
let y = "5";

// 相等比較
console.log(x == y);   // true  （寬鬆相等，會轉換型別）
console.log(x === y);  // false （嚴格相等，不轉換型別）

// 不等比較
console.log(x != y);   // false
console.log(x !== y);  // true

// 大小比較
console.log(x > 3);    // true
console.log(x >= 5);   // true
console.log(x < 10);   // true
console.log(x <= 4);   // false

// 更多比較範例
console.log(10 > 5);   // true
console.log("a" < "b", "a".charCodeAt(), "b".charCodeAt()); // true （字串比較，用 Unicode 編碼值比較）
console.log("10" > "9"); // false （字串比較，不是數字比較）
```

{% note danger %}
**重要觀念：**
- 永遠使用 `===` 和 `!==` 進行比較
- 避免使用 `==` 和 `!=`，因為它們會進行型別轉換，容易造成錯誤
- 字串比較是從左到右，逐字符根據 Unicode 編碼值進行比較，一旦遇到可判定大小的字符，就會停止比較並得出結果。
- 除了可以使用 `charCodeAt` 查詢字元的 Unicode 編碼值外，現代 JavaScript 也建議使用 `codePointAt`，特別是處理表情符號或特殊字元時更為準確。
{% endnote %}

### 邏輯運算子

```javascript logical-operators.js
let isAdult = true;
let hasLicense = false;
let hasInsurance = true;

// AND 運算子：所有條件都必須為 true
console.log(isAdult && hasLicense); // false
console.log(isAdult && hasInsurance); // true

// OR 運算子：任一條件為 true 即可
console.log(isAdult || hasLicense); // true
console.log(hasLicense || hasInsurance); // true

// NOT 運算子：反轉布林值
console.log(!isAdult);    // false
console.log(!hasLicense); // true

// 複合條件
console.log(isAdult && (hasLicense || hasInsurance)); // true
console.log((isAdult && hasLicense) || hasInsurance); // true
```

{% note info %}
**進階技巧（後續會詳細學習）：**
除了基本的邏輯判斷功能外，邏輯運算子在實務上還有許多靈活的應用方式。這些進階用法將在後續課程中詳細介紹，目前只需先建立初步印象即可。

**短路求值：**
```javascript
// 決定要不要執行某個操作
isLoggedIn && console.log("歡迎回來！");  // 只有 isLoggedIn 為 true 才執行

// 設定預設值
let userName = userInput || "訪客";  // 如果 userInput 為空，使用 "訪客"
```

**布林值轉換：**
```javascript
// 快速轉換為布林值
console.log(!0);      // true（0 轉為 false，再取反）
console.log(!null);    // true（null 轉為 false，再取反）
console.log(!!"hello"); // true（字串轉為 true）
```
{% endnote %}

### 三元運算子

```javascript ternary-operator.js
let age = 20;

// 傳統 if-else
let message1;
if (age >= 18) {
    message1 = "成年人";
} else {
    message1 = "未成年";
}

// 使用三元運算子（簡潔的寫法）
let message2 = age >= 18 ? "成年人" : "未成年";

console.log(message1); // 成年人
console.log(message2); // 成年人

// 巢狀三元運算子（不建議過度使用）
let grade = 85;
let level = grade >= 90 ? "優秀" : grade >= 80 ? "良好" : "需要加油";
console.log(level); // 良好
```

## 字串處理

字串是 JavaScript 中非常重要的資料型別。了解如何有效地處理字串對於網頁開發至關重要。

### 字串的建立與模板字串

```javascript string-creation.js
// 單引號
let message1 = 'Hello, World!';

// 雙引號
let message2 = "Hello, World!";

// 模板字串（推薦使用）
let name = "小明";
let age = 25;
let city = "台北";
let message3 = `我是 ${name}，今年 ${age} 歲，住在 ${city}`;

console.log(message1); // Hello, World!
console.log(message2); // Hello, World!
console.log(message3); // 我是 小明，今年 25 歲，住在 台北

// 包含表達式的模板字串
let price = 100;
let quantity = 3;
let total = `總價：${price * quantity} 元`;
console.log(total); // 總價：300 元

// 多行字串
let multiLine = `
第一行
第二行
第三行
`;
console.log(multiLine);
```

### 字串連接與處理

```javascript string-processing.js
let firstName = "王";
let lastName = "小明";

// 傳統方式（不推薦）
let fullName1 = firstName + lastName;

// 使用模板字串（推薦）
let fullName2 = `${firstName}${lastName}`;

console.log(fullName1); // 王小明
console.log(fullName2); // 王小明

// 字串與數字混合
let score = 85;
let result = `你的分數是 ${score} 分`;
console.log(result); // 你的分數是 85 分

// 轉義字元（又稱跳脫字元）
let quote = "他說：\"今天天氣很好、"";
let path = "C:\\Users\\Documents";
console.log(quote); // 他說："今天天氣很好"
console.log(path);  // C:\Users\Documents
```

### 字串屬性和方法

```javascript string-methods.js
let text = "Hello, JavaScript World!";

// 取得字串長度
console.log(text.length); // 23

// 轉換大小寫
console.log(text.toUpperCase());   // HELLO, JAVASCRIPT WORLD!
console.log(text.toLowerCase());   // hello, javascript world!

// 取得字元
console.log(text[0]);              // H
console.log(text[7]);              // J
console.log(text.charAt(7));       // J

// 搜尋文字
console.log(text.indexOf("Java"));        // 7
console.log(text.lastIndexOf("o"));       // 20
console.log(text.includes("Script"));     // true
console.log(text.startsWith("Hello"));    // true
console.log(text.endsWith("World!"));     // true

// 擷取字串
// slice(start：起始索引包含，end：結束索引不包含）
console.log(text.slice(0, 5));      // Hello
console.log(text.slice(7, 17));     // JavaScript

// substring(start, end) 方法：擷取從 start（起始索引，包含）到 end（結束索引，不包含）之間的字串
console.log(text.substring(0, 5));  // Hello
console.log(text.slice(-6, -1));    // World
console.log(text.substring(7, 2));  // llo, 
console.log(text.slice(7, 2));      // （回傳空字串）
```

{% note info %}
**小技巧：`slice()` 與 `substring()` 差異**

| 方法名稱    | 說明                                                                                   | 範例說明                                                                       |
| ----------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `slice`     | 起始索引、結束索引皆可為負數，負數代表從字串尾端倒數計算。若 start > end，回傳空字串。 | `text.slice(2, 5)` 取第 2 ~ 4 字元；`text.slice(-3)` 取最後三字元              |
| `substring` | 起始索引、結束索引皆為 0 或正數，若 start > end 會自動交換順序。負數會被視為 0。       | `text.substring(2, 5)` 取第 2 ~ 4 字元；`text.substring(5, 2)` 也取第 2~4 字元 |

**重點比較：**
- `slice()` 支援負數索引，`substring()` 不支援。
- `slice(start, end)` 若 start > end，回傳空字串；`substring(start, end)` 會自動交換 start、end。
- 兩者皆不包含 end 位置的字元。

{% endnote %}

### 實用的字串處理

```javascript string-practical.js
let email = "  user@example.com  ";
let message = "Hello, World!";
let data = "apple,banana,orange,grape";

// 去除空白
let cleanEmail = email.trim();
console.log(cleanEmail); // user@example.com

// 取代文字
let newMessage = message.replace("World", "JavaScript");
console.log(newMessage); // Hello, JavaScript!

// 全部取代
let text = "cat and dog and cat";
let replaced = text.replaceAll("cat", "bird");
console.log(replaced); // bird and dog and bird

// 分割字串
let fruits = data.split(",");
console.log(fruits); // ["apple", "banana", "orange", "grape"]

// 重複字串
let pattern = "=".repeat(20);
console.log(pattern); // ====================

// 字串填充
let number = "5";
let padded = number.padStart(3, "0");
console.log(padded); // 005

// 組合使用
let userName = "  John Doe  ";
let cleanName = userName.trim().toLowerCase().replace(" ", "_");
console.log(cleanName); // john_doe
```

{% note info %}
**小技巧：字串方法速查卡片**

| 方法名稱                | 說明                       | 範例                        |
| ----------------------- | -------------------------- | --------------------------- |
| `length`                | 取得字串長度               | `text.length`               |
| `toUpperCase()`         | 轉成大寫                   | `text.toUpperCase()`        |
| `toLowerCase()`         | 轉成小寫                   | `text.toLowerCase()`        |
| `charAt(index)`         | 取得指定位置字元           | `text.charAt(0)`            |
| `indexOf(str)`          | 搜尋字串，回傳索引         | `text.indexOf("Java")`      |
| `lastIndexOf(str)`      | 從後面搜尋字串，回傳索引   | `text.lastIndexOf("o")`     |
| `includes(str)`         | 是否包含指定字串（布林值） | `text.includes("Script")`   |
| `startsWith(str)`       | 是否以指定字串開頭         | `text.startsWith("Hello")`  |
| `endsWith(str)`         | 是否以指定字串結尾         | `text.endsWith("World!")`   |
| `slice(start, end)`     | 擷取字串（可用負數）       | `text.slice(0, 5)`          |
| `substring(start, end)` | 擷取字串（不支援負數）     | `text.substring(0, 5)`      |
| `trim()`                | 去除前後空白               | `text.trim()`               |
| `replace(a, b)`         | 取代第一個出現的字串       | `text.replace("a", "b")`    |
| `replaceAll(a, b)`      | 取代所有出現的字串         | `text.replaceAll("a", "b")` |
| `split(str)`            | 分割字串為陣列             | `text.split(",")`           |
| `repeat(n)`             | 重複字串 n 次              | `"Hi".repeat(3)`            |
| `padStart(len, str)`    | 前方補字元至指定長度       | `"5".padStart(3, "0")`      |
| `padEnd(len, str)`      | 後方補字元至指定長度       | `"5".padEnd(3, "0")`        |

這張卡片可以幫助你快速查找常用的字串方法，建議收藏！
{% endnote %}

# 條件判斷

條件判斷是程式設計中最重要的概念之一，它讓程式能夠根據不同情況執行不同的程式碼。就像我們在日常生活中會根據天氣決定穿什麼衣服，程式也可以根據不同的條件做出不同的決定。

## if 語句

最基本的條件判斷是 `if` 語句，當條件為 `true` 時執行程式碼：

```javascript if-statement.js
let age = 20;

if (age >= 18) {
    console.log("已成年，可以投票");
}

// 另一個例子
let weather = "sunny";

if (weather === "sunny") {
    console.log("今天天氣很好！");
}

// 數字條件
let score = 85;
if (score >= 60) {
    console.log("考試及格");
}

// 布林條件
let isLoggedIn = true;
if (isLoggedIn) {
    console.log("歡迎回來！");
}
```

## if-else 語句

當我們需要在條件不成立時執行其他程式碼時，使用 `if-else` 語句：

```javascript if-else.js
let score = 85;

if (score >= 60) {
    console.log("及格了！");
} else {
    console.log("不及格，要加油！");
}

// 另一個例子
let temperature = 25;

if (temperature > 30) {
    console.log("今天很熱，記得多喝水");
} else {
    console.log("今天溫度適中");
}

// 時間判斷
let hour = 14;
if (hour < 12) {
    console.log("早上好");
} else {
    console.log("下午好");
}
```

## 多重條件判斷

使用 `else if` 可以處理多個條件：

```javascript multiple-conditions.js
let score = 85;

if (score >= 90) {
    console.log("優秀 - A");
} else if (score >= 80) {
    console.log("良好 - B");
} else if (score >= 70) {
    console.log("普通 - C");
} else if (score >= 60) {
    console.log("及格 - D");
} else {
    console.log("不及格 - F");
}

// 季節判斷
let month = 7;
if (month >= 3 && month <= 5) {
    console.log("春天");
} else if (month >= 6 && month <= 8) {
    console.log("夏天");
} else if (month >= 9 && month <= 11) {
    console.log("秋天");
} else {
    console.log("冬天");
}

// 年齡階段
let age = 25;
if (age < 13) {
    console.log("兒童");
} else if (age < 18) {
    console.log("青少年");
} else if (age < 65) {
    console.log("成年人");
} else {
    console.log("年長者");
}
```

{% note info %}
**小技巧：else if 的本質**

`else if` 其實是巢狀單行的 `else { if }` 的語法糖。也就是說，下面兩種寫法效果完全一樣：

```javascript
// 常見寫法
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}

// 等價於
if (score >= 90) {
  console.log("A");
} else {
  if (score >= 80) {
    console.log("B");
  } else {
    console.log("C");
  }
}
```

這種設計讓多重條件判斷的程式碼更簡潔、易讀，也方便維護。
{% endnote %}

## 複合條件

使用邏輯運算子組合多個條件：

```javascript compound-conditions.js
let age = 25;
let hasLicense = true;
let hasInsurance = false;

// 使用 AND 運算子
if (age >= 18 && hasLicense) {
    console.log("可以開車");
} else {
    console.log("不能開車");
}

// 使用 OR 運算子
let isWeekend = true;
let isHoliday = false;

if (isWeekend || isHoliday) {
    console.log("今天休假");
} else {
    console.log("今天要上班");
}

// 複雜的組合條件
if (age >= 18 && (hasLicense || hasInsurance)) {
    console.log("符合基本條件");
} else {
    console.log("不符合條件");
}

// 使用 NOT 運算子
let isRaining = false;
if (!isRaining) {
    console.log("可以出去玩");
} else {
    console.log("待在家裡");
}
```

## switch 語句

當需要根據一個變數的不同值執行不同程式碼時，`switch` 語句會比多個 `if-else` 更清晰：

```javascript switch-statement.js
let day = 3;

switch (day) {
    case 1:
        console.log("星期一");
        break;
    case 2:
        console.log("星期二");
        break;
    case 3:
        console.log("星期三");
        break;
    case 4:
        console.log("星期四");
        break;
    case 5:
        console.log("星期五");
        break;
    case 6:
        console.log("星期六");
        break;
    case 7:
        console.log("星期日");
        break;
    default:
        console.log("無效的日期");
}

// 分組 case
let grade = 'B';
switch (grade) {
    case 'A':
    case 'A+':
        console.log("優秀");
        break;
    case 'B':
    case 'B+':
        console.log("良好");
        break;
    case 'C':
        console.log("普通");
        break;
    default:
        console.log("需要加油");
}
```

{% note info %}
**補充說明：switch 語句中的 break**

在 switch 語句中，每個 case 區塊結尾通常都會加上 `break` 指令。這是因為 switch 會從符合條件的 case 開始執行，若沒有遇到 break，會繼續往下執行後續所有 case（這種現象稱為「貫穿」fall through）。

- `break` 的作用是「跳出」switch 區塊，避免執行到其他 case。
- 如果省略 break，當條件成立時，會連同後面所有 case 的程式碼一起執行，直到遇到 break 或 switch 結束。

**範例：**
```javascript switch-break-demo.js
let fruit = "apple";
switch (fruit) {
  case "apple":
    console.log("這是蘋果");
  case "banana":
    console.log("這是香蕉");
  default:
    console.log("未知水果");
}
// 輸出：
// 這是蘋果
// 這是香蕉
// 未知水果
```

如上例，因為沒有 break，所有 case 都會被執行。

**結論：**
- 大多數情況下，記得在每個 case 區塊結尾加上 break。
- 只有在你有意要讓多個 case 共用同一段程式碼時，才可以省略 break。
{% endnote %}

## 條件判斷的最佳實踐

```javascript best-practices.js
// 1. 使用明確的條件
let userAge = 25;
let userName = "小明";
let isActive = true;

// 好的做法
if (userAge >= 18) {
    console.log("成年用戶");
}

// 不好的做法
if (userAge) {  // 不夠明確
    console.log("有年齡");
}

// 2. 處理 null 和 undefined
let data = null;
if (data !== null && data !== undefined) {
    console.log("資料存在");
} else {
    console.log("資料不存在");
}

// 3. 使用防衛性程式設計
let email = "user@example.com";
if (email && email.includes("@")) {
    console.log("有效的電子郵件");
} else {
    console.log("無效的電子郵件");
}

// 4. 避免過深的巢狀
let score = 85;
let attendance = 90;
let homework = 80;

// 不好的做法
if (score >= 60) {
    if (attendance >= 80) {
        if (homework >= 70) {
            console.log("通過");
        } else {
            console.log("作業不及格");
        }
    } else {
        console.log("出席率不足");
    }
} else {
    console.log("考試不及格");
}

// 好的做法
if (score < 60) {
    console.log("考試不及格");
} else if (attendance < 80) {
    console.log("出席率不足");
} else if (homework < 70) {
    console.log("作業不及格");
} else {
    console.log("通過");
}
```

## 小節練習
嘗試撰寫程式碼來完成以下任務：

{% tabs 條件判斷練習 %}
<!-- tab 題目 -->
**練習 1：成績等級判斷**
根據分數給出等級：
- A: 90-100
- B: 80-89  
- C: 70-79
- D: 60-69
- F: 0-59

規劃一變數`score`如果賦值`95`，經判斷後 console 顯示`分數 95 的等級是：A`。

**練習 2：閏年判斷**
判斷一個年份是否為閏年：
- 能被 4 整除但不能被 100 整除
- 或者能被 400 整除

規劃一變數`year`如果賦值`2000`，經判斷後 console 顯示`2020 年是閏年：true`。

**練習 3：BMI 體重狀態**
BMI（身體質量指數）計算公式：BMI = 體重 (kg) ÷ 身高 (m)²

例如：身高 170cm（1.7m），體重 65kg
BMI = 65 ÷ (1.7 × 1.7) = 65 ÷ 2.89 = 22.5

根據身高與體重，計算 BMI 值並判斷體重狀態：
- 過輕：< 18.5
- 正常：18.5 - 24.9
- 過重：25 - 29.9
- 肥胖：>= 30

規劃兩變數 `height`（身高，單位：cm）、`weight`（體重，單位：kg），如果賦值 `170`、`70`，經計算 BMI 並判斷後 console 顯示 `身高 170cm，體重 70kg，BMI 24.2，體重狀態：正常`。

<!-- endtab -->

<!-- tab 答案 -->
```javascript conditional-practice-answers.js
// 練習 1：成績等級判斷
let score = 95;
let grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

console.log(`分數 ${score} 的等級是：${grade}`); // 分數 95 的等級是：A

// 練習 2：閏年判斷
let year = 2020;
let isLeap;

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    isLeap = true;
} else {
    isLeap = false;
}

console.log(`${year} 年是閏年：${isLeap}`); // 2020 年是閏年：true

// 練習 3：BMI 體重狀態
let height = 170;  // 身高 (cm)
let weight = 70;   // 體重 (kg)

// 將身高轉換為公尺
let heightInMeters = height / 100;

// 計算 BMI
let bmi = weight / (heightInMeters * heightInMeters);

// 判斷體重狀態
let status;

if (bmi < 18.5) {
    status = "過輕";
} else if (bmi >= 18.5 && bmi <= 24.9) {
    status = "正常";
} else if (bmi >= 25 && bmi <= 29.9) {
    status = "過重";
} else {
    status = "肥胖";
}

console.log(`身高 ${height}cm，體重 ${weight}kg，BMI ${bmi.toFixed(1)}，體重狀態：${status}`); 
// 身高 170cm，體重 70kg，BMI 24.2，體重狀態：正常
```
<!-- endtab -->
{% endtabs %}

{% note warning %}
**常見錯誤避免：**
- 忘記使用 `===` 進行嚴格比較
- 在 `switch` 語句中忘記 `break`
- 條件判斷邏輯過於複雜，難以理解
- 沒有考慮到 `null` 和 `undefined` 的情況
{% endnote %}

# 迴圈

迴圈用來重複執行相同的程式碼。

## for 迴圈

```javascript for-loop.js
// 基本 for 迴圈
for (let i = 1; i <= 5; i++) {
    console.log(`第 ${i} 次執行`);
}

// 另一個例子：計算 1 到 10 的總和
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
console.log(sum); // 55
```

{% note info %}
**補充說明：i++ 與 i-- 的用法與差異**

- `i++`：將變數 i 的值「加 1」（遞增），等同於 `i = i + 1` 或 `i += 1`
- `i--`：將變數 i 的值「減 1」（遞減），等同於 `i = i - 1` 或 `i -= 1`

這兩個運算子常用於 for 迴圈的計數控制：
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
for (let j = 5; j > 0; j--) {
  console.log(j); // 5, 4, 3, 2, 1
}
```

**前置（++i / --i）與後置（i++ / i--）的差異**
- `i++`：先取用 i 的原值，再將 i 加 1（後置遞增）
- `++i`：先將 i 加 1，再取用新值（前置遞增）
- `i--` 與 `--i` 亦同理

**範例：**
```javascript increment-demo.js
let a = 5;
console.log(a++); // 5（先印出 5，再加 1）
console.log(a);   // 6

let b = 5;
console.log(++b); // 6（先加 1，再印出 6）
```

**常見用途：**
- 迴圈計數、陣列索引移動、累加/累減計算

**注意事項：**
- 前置與後置的差異，只有在「表達式中同時取值與遞增/遞減」時才會有影響
- 單獨一行使用時，`i++` 與 `++i` 效果相同
{% endnote %}

## while 迴圈

```javascript while-loop.js
// while 迴圈
let count = 1;
while (count <= 5) {
    console.log(`計數：${count}`);
    count++;
}

// 另一個例子
let number = 1;
while (number <= 100) {
    if (number % 2 === 0) {
        console.log(number); // 印出偶數
    }
    number++;
}
```

## do-while 迴圈

```javascript do-while-loop.js
// do-while 迴圈（至少執行一次）
let input = 0;
do {
    console.log(`輸入的數字是：${input}`);
    input++;
} while (input < 3);
```

## 迴圈控制
在迴圈（for、while、do-while）中，`break` 和 `continue` 都是用來控制流程的關鍵指令，但用途不同：

- `break`：**立即結束整個迴圈**，跳出迴圈區塊，後續的迴圈內容都不會再執行。
- `continue`：**結束本次迴圈**，直接進入下一輪判斷，不會執行本輪剩下的程式碼。

**範例：**
```javascript break-continue-demo.js
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        break; // 當 i 等於 5 時跳出迴圈
    }
    console.log(i); // 只會印出 1, 2, 3, 4
}

// continue：跳過這次迴圈
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue; // 跳過偶數
    }
    console.log(i); // 只會印出 1, 3, 5, 7, 9
}
```

**說明：**
- 當 i 為 2 時，continue 讓本輪結束，i=2 不會被印出。
- 當 i 為 5 時，break 讓整個 for 迴圈結束，後面 6~10 都不會執行。

**常見用途：**
- `break`：用於提早結束搜尋、遇到特殊條件時跳出迴圈。
- `continue`：用於跳過不需要處理的資料、只處理特定條件的項目。

**注意事項：**
- `break` 會直接離開整個迴圈。
- `continue` 只會跳過本輪，下一輪仍會繼續。
- 巢狀迴圈中，break 只會跳出「最近一層」的迴圈。

## 巢狀迴圈

```javascript nested-loop.js
// 九九乘法表
for (let i = 1; i <= 9; i++) {
    let row = "";
    for (let j = 1; j <= 9; j++) {
        row += `${i} × ${j} = ${i * j}\n`;
    }
    console.log(row);
}
```

{% note success %}
**跟著做：迴圈練習**
1. 使用 for 迴圈印出 1 到 100 的奇數
2. 使用 while 迴圈計算 1 到 100 的總和
3. 使用巢狀迴圈印出一個 5×5 的星號方陣
{% endnote %}

# 學習總結

恭喜您完成了 JavaScript 基礎教學！讓我們回顧一下學習的內容：

- **JavaScript 基礎觀念**：了解 JavaScript 是什麼，如何設置學習環境
- **輸出與註解**：使用 `console.log()` 輸出訊息，撰寫有意義的註解
- **變數與資料型別**：使用 `let` 和 `const` 宣告變數，了解基本資料型別
- **運算子**：算術、比較、邏輯運算子的使用
- **字串處理**：字串的建立、連接和常用方法
- **條件判斷**：使用 `if-else` 和三元運算子進行條件判斷
- **迴圈**：使用 `for`、`while` 和 `do-while` 重複執行程式碼

下個階段我們繼續學習對於大型資料處理的語法，包含陣列物件函式以及特定資料處理與除錯
