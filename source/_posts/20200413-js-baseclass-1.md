---
title: "[基礎課程] JavaScript 教學（一）：基礎觀念與現代語法"
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
- `new Date()`：取得現在時間
- `new Date（年，月，日，時，分，秒）`：指定年月日時分秒（注意：月從 0 開始，0 代表 1 月）
- `new Date（字串）`：由字串建立日期

### 常用方法
- `getFullYear()`：取得年份
- `getMonth()`：取得月份（0~11）
- `getDate()`：取得日期（1~31）
- `getDay()`：取得星期（0~6，0 代表星期日）
- `getHours()`：取得小時
- `getMinutes()`：取得分鐘
- `getSeconds()`：取得秒數
- `getTime()`：取得自 1970/1/1 以來的毫秒數
- `toLocaleString()`：格式化日期字串

### 範例
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

1. **JavaScript 基礎觀念**：了解 JavaScript 是什麼，如何設置學習環境
2. **輸出與註解**：使用 `console.log()` 輸出訊息，撰寫有意義的註解
3. **變數與資料型別**：使用 `let` 和 `const` 宣告變數，了解基本資料型別
4. **運算子**：算術、比較、邏輯運算子的使用
5. **字串處理**：字串的建立、連接和常用方法
6. **條件判斷**：使用 `if-else` 和三元運算子進行條件判斷
7. **迴圈**：使用 `for`、`while` 和 `do-while` 重複執行程式碼
8. **陣列**：儲存和操作多個值的資料結構
9. **物件**：儲存相關資料的集合
10. **函式**：撰寫可重複使用的程式碼塊
11. **內建函式**：使用 JavaScript 提供的數學、字串、日期等功能
12. **網頁整合**：將 JavaScript 整合到 HTML 網頁中
13. **錯誤處理**：使用 try-catch 處理錯誤，學習除錯技巧

## 現代 JavaScript 特色

在本教學中，我們特別強調了現代 JavaScript 的最佳實踐：

- 使用 `const` 和 `let` 而非 `var`
- 使用模板字串而非字串串接
- 使用箭頭函式的簡潔語法
- 使用 `===` 進行嚴格比較
- 使用 JSDoc 進行函式文件化

## 繼續學習的方向

{% note info %}
**進階主題建議：**
1. **非同步程式設計**：Promise 和 async/await
2. **ES6+ 新功能**：解構賦值、展開運算子、類別語法
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
