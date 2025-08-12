---
title: "[基礎課程] JavaScript 教學（三）：BOM 與 DOM"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-20 21:07:53
---
![](assets/images/D8v3RVP.png)

本篇將深入介紹 JavaScript 中最重要的兩個概念：BOM（Browser Object Model，瀏覽器物件模型）與 DOM（Document Object Model，文件物件模型）。這兩個模型是 JavaScript 與網頁互動的基礎，掌握它們將讓您能夠動態控制網頁內容和瀏覽器行為。

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
`window` 是 BOM 的根物件，代表整個瀏覽器視窗。在瀏覽器環境中，全域變數和函數都屬於 `window` 物件。

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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
```javascript
// 選擇所有 p 標籤（回傳 HTMLCollection）
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length); // 2
console.log(paragraphs[0]); // 第一個 p 元素
```

### getElementsByClassName
```javascript
// 選擇所有 class 為 "text" 的元素（回傳 HTMLCollection）
let textElements = document.getElementsByClassName("text");
console.log(textElements.length); // 2
```

### getElementsByName
```html
<input type="text" name="username" value="使用者名稱">
```

```javascript
// 選擇所有 name 為 "username" 的元素
let inputs = document.getElementsByName("username");
console.log(inputs[0].value); // "使用者名稱"
```

### querySelector （推薦）
除了傳統的選擇方法，現代瀏覽器還支援更強大和靈活的 `querySelector` 方法。這些方法使用 CSS 選擇器語法，讓元素選擇變得更加直觀和強大。`querySelector` 系列方法是目前推薦使用的選擇方法。

```javascript
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
```javascript
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
```javascript
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
```javascript
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
```javascript
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

```javascript
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

```javascript
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
可以直接透過 JavaScript 來操作 HTML 元素的屬性。這包括讀取、修改和刪除屬性。以下是一些常見的屬性操作方法：

```javascript
// demo > HTML 元素屬性
// --------------------------------------------------
let element = document.getElementById("title");

// 讀取屬性
console.log(element.id); // "title"
console.log(element.className); // 如果有 class 的話

// 設定屬性
element.className = "new-class";
element.setAttribute("data-custom", "自訂屬性值");

// 移除屬性
element.removeAttribute("data-custom");
```

### 樣式操作
DOM 提供了多種方式來設定元素的 CSS 樣式，每種方法都有其適用場景：

| 方法              | 特點                             | 適用場景             |
| ----------------- | -------------------------------- | -------------------- |
| `element.style.*` | 精確控制 style，不會影響其他樣式 | 單一屬性修改         |
| `element.style`   | 完全覆蓋 style 所有樣式          | 需要重新設定所有樣式 |
| Object.assign()   | 批量設定，程式碼簡潔             | 需要設定多個相關樣式 |
| cssText           | 一次性設定，效能較好             | 大量樣式設定         |
| setProperty()     | 支援 CSS 變數和複雜值            | CSS 變數和特殊屬性   |
| setAttribute()    | 使用字串設定，靈活性高           | 動態組合樣式         |

{% note warning %}
**重要提醒：**
- 直接設定 `element.style = "css 字串"` 會覆蓋元素的所有現有樣式
- 如果需要保留某些樣式，建議使用 `cssText` 或 `Object.assign()`
- `setAttribute("style", "css 字串")` 也會完全覆蓋現有樣式
- 在複雜的樣式操作中，建議先備份原有樣式
{% endnote %}

{% note info %}
**最佳實踐：**
- 單一屬性修改使用 `element.style.property = value`
- 多個相關樣式使用 `Object.assign()` 或 `cssText`
- 需要動態組合樣式時使用 `setAttribute()`
- CSS 變數操作使用 `setProperty()`
- 完全重新設定樣式時使用直接賦值或 `setAttribute()`
{% endnote %}

{% note info %}
**setAttribute vs style 物件：**
- `setAttribute("style", "css 字串")` - 完全覆蓋所有樣式
- `element.style.property = value` - 精確控制單一屬性
- 選擇哪種方法取決於具體需求
{% endnote %}


以下是表格中提到的所有方法的完整範例：

```javascript
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
**各方法特點總結：**
- **element.style.*** - 最精確，適合單一屬性修改
- **element.style** - 完全覆蓋，適合重新設定所有樣式
- **Object.assign()** - 程式碼簡潔，適合批量設定
- **cssText** - 效能最佳，適合大量樣式設定
- **setProperty()** - 功能最強，支援 CSS 原生變數和 important
- **setAttribute()** - 靈活性最高，適合動態組合樣式
{% endnote %}

## 事件處理

事件處理是 JavaScript 與用戶互動的核心機制。透過事件處理，我們可以響應用戶的各種操作，如點擊、滑鼠移動、鍵盤輸入等。JavaScript 可以監聽這些事件並執行相應的程式碼。

| 事件類型   | 事件名稱    | 描述         |
| ---------- | ----------- | ------------ |
| 滑鼠事件   | `click`     | 點擊元素     |
| 滑鼠事件   | `dblclick`  | 雙擊元素     |
| 滑鼠事件   | `mouseover` | 滑鼠移入     |
| 滑鼠事件   | `mouseout`  | 滑鼠移出     |
| 鍵盤事件   | `keydown`   | 按下按鍵     |
| 鍵盤事件   | `keyup`     | 放開按鍵     |
| 表單事件   | `change`    | 內容改變     |
| 表單事件   | `submit`    | 表單提交     |
| 瀏覽器事件 | `load`      | 頁面載入完成 |

### 事件處理方法

JavaScript 提供了多種方式來綁定事件處理器，每種方法都有其優缺點。從簡單的 HTML 屬性到現代的 `addEventListener` 方法，我們需要根據具體需求選擇合適的方法。

#### 方法一：HTML 屬性
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

#### 方法二：JavaScript 綁定
```html
<button id="myButton">點擊我</button>
<input type="text" id="myInput">

<script>
// 獲取元素
let button = document.getElementById("myButton");
let input = document.getElementById("myInput");

// 綁定事件
button.onclick = function() {
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

#### 方法三：addEventListener（推薦）
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
- 支援事件委派
- 更好的錯誤處理
- 可以控制事件捕獲和冒泡階段
- 更容易維護和除錯
- 符合現代 JavaScript 最佳實踐

**缺點：**
- 語法稍微複雜
- 需要記住正確的事件名稱（如 "click" 而不是 "onclick"）
{% endnote %}

當需要移除事件處理器時，必須使用 `removeEventListener` 方法：

```html
<button id="myButton">點擊我</button>
<button id="removeBtn">移除事件</button>

<script>
let button = document.getElementById("myButton");
let removeBtn = document.getElementById("removeBtn");

// 定義事件處理器函數（必須是具名函數）
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
- 只能移除具名函數的處理器，匿名函數無法移除
- 必須提供相同的函數參考和事件類型
- 常用於清理資源、防止記憶體洩漏
- 在組件卸載或頁面切換時特別重要
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
| `event.preventDefault()`  | 阻止預設行為                      | 表單提交、連結跳轉控制 |
| `event.stopPropagation()` | 阻止事件冒泡                      | 事件傳播控制           |

#### 事件綁定方式的 event 物件獲取

前面我們學習了三種事件綁定方式，現在讓我們看看每種方式如何獲取和使用事件物件：

##### 方法一：HTML 屬性方式

```html
<button onclick="handleClick(event)">點擊我</button>
<input type="text" onchange="handleChange(event)">
<input type="text" onkeydown="handleKeyDown(event)">

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
    
    // 阻止 Enter 鍵的預設行為
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log("已阻止 Enter 鍵的預設行為");
    }
}
</script>
```

{% note info %}
**HTML 屬性方式特點：**
- 必須手動傳遞 `event` 參數
- 語法：`onclick="handleClick(event)"`
- 事件物件會自動傳入，但需要在函數參數中接收
{% endnote %}

##### 方法二：JavaScript 綁定方式

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
    
    // 阻止 Enter 鍵的預設行為
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log("已阻止 Enter 鍵的預設行為");
    }
};
    </script>
```

{% note info %}
**JavaScript 綁定方式特點：**
- 事件物件自動傳入函數參數
- 語法：`element.onclick = function(event) { ... }`
- 不需要手動傳遞 event 參數
{% endnote %}

##### 方法三：addEventListener 方式（推薦）

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
    
    // 阻止 Enter 鍵的預設行為
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log("已阻止 Enter 鍵的預設行為");
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
- 事件物件自動傳入函數參數
- 語法：`element.addEventListener("event", function(event) { ... })`
- 可以綁定多個事件處理器
- 支援事件委派
- 提供 `currentTarget` 屬性區分事件委派
{% endnote %}

#### 三種方式的對比

| 特性           | HTML 屬性方式 | JavaScript 綁定 | addEventListener |
| -------------- | ------------- | --------------- | ---------------- |
| 事件物件傳遞   | 需手動傳遞    | 自動傳入        | 自動傳入         |
| 多個處理器支援 | ❌             | ❌               | ✅                |
| 事件委派支援   | ❌             | ❌               | ✅                |
| 程式碼分離     | ❌             | ✅               | ✅                |
| 維護性         | 差            | 中等            | 好               |
| 現代開發推薦   | ❌             | ❌               | ✅                |

{% note warning %}
**重要提醒：**
- HTML 屬性方式是唯一需要手動傳遞 `event` 參數的方式
- JavaScript 綁定和 addEventListener 都會自動傳入事件物件
- 現代開發推薦使用 addEventListener 方式
- 事件物件在所有方式中都是相同的，包含相同的屬性和方法
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
    </style>

    <form id="myForm">
  <fieldset>
    <legend>Enter your email</legend>
        <div class="form-group">
      <input type="email" id="email" placeholder="Enter your email">
      <div id="error-message" style="color: red; font-size: 14px; margin-top: 5px; display: none;"></div>
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
      return;
    }

    if (!emailRegex.test(email)) {
      errorMessage.textContent = '請輸入有效的電子郵件地址';
      errorMessage.style.display = 'block';
    } else {
      // 驗證通過，隱藏錯誤訊息
      errorMessage.style.display = 'none';
    }
  });

  // 表單提交時的驗證
  document.getElementById('myForm').addEventListener('submit', function (event) {
    const email = emailInput.value.trim();

    if (email === '' || !emailRegex.test(email)) {
      event.preventDefault();
      if (email === '') {
        errorMessage.textContent = '請輸入電子郵件地址';
      } else {
        errorMessage.textContent = '請輸入有效的電子郵件地址';
      }
      errorMessage.style.display = 'block';
      return false;
    }

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
- 事件物件在事件處理函數中自動傳入，無需手動傳遞
{% endnote %}

{% note warning %}
**注意事項：**
- HTML 屬性方式需要手動傳遞 `event` 參數
- JavaScript 方式的事件物件會自動傳入
- 某些事件（如 `keydown`）需要元素獲得焦點才能觸發
- 使用 `preventDefault()` 時要謹慎，確保不會影響用戶體驗
{% endnote %}

### 事件傳播機制：捕獲與冒泡

JavaScript 的事件傳播分為三個階段：**捕獲階段**、**目標階段**、**冒泡階段**。完整的事件傳播順序是：先從 document 向下捕獲到目標元素，然後在目標元素觸發，最後從目標元素向上冒泡到 document。

{% mermaid graph TD %}
subgraph EventFlow["DOM 結構"]
  Document["document"]
  Body["body"]
  Container["container"]
  Outer["outer"]
  Inner["inner"]
  
  Document --> Body
  Body --> Container
  Container --> Outer
  Outer --> Inner
end
subgraph Phases["傳播階段"]
  Phase1["1. 捕獲階段<br/>document → body → container → outer → inner"]
  Phase2["2. 目標階段<br/>inner （目標元素）"]
  Phase3["3. 冒泡階段<br/>inner → outer → container → body → document"]
end

style Phase1 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
style Phase2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
style Phase3 fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
{% endmermaid %}

#### 事件捕獲（Event Capturing）
事件捕獲是指事件從 document 開始，向下傳播到目標元素的過程。在這個階段，事件會先觸發最外層的元素，然後逐層向下傳播。

#### 事件冒泡（Event Bubbling）
事件冒泡是指事件從目標元素開始，向上傳播到 document 的過程。在這個階段，事件會先觸發目標元素，然後逐層向上傳播。

{% mermaid graph TD %}
    subgraph DOM["DOM 結構"]
        Document["document"]
        Document --> Body["body"]
        Body --> Ul["ul#todoList"]
        Ul --> Li1["li 項目 1"]
        Ul --> Li2["li 項目 2"]
        Ul --> Li3["li 項目 3"]
    end
    
    subgraph EventFlow["事件冒泡流程"]
        Click1["1. 點擊 li 項目 2"]
        Click1 --> Bubble1["2. 事件冒泡到 ul"]
        Bubble1 --> Bubble2["3. 事件冒泡到 body"]
        Bubble2 --> Bubble3["4. 事件冒泡到 document"]
    end
    
    style Click1 fill:#ff6b6b,stroke:#d63031,stroke-width:2px
    style Bubble1 fill:#74b9ff,stroke:#0984e3,stroke-width:2px
    style Bubble2 fill:#a29bfe,stroke:#6c5ce7,stroke-width:2px
    style Bubble3 fill:#fd79a8,stroke:#e84393,stroke-width:2px
{% endmermaid %}

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
在掌握了基礎的 DOM 操作後，我們可以進一步學習一些進階概念。這些概念將幫助您更深入地理解 DOM 的運作機制，並能夠處理更複雜的網頁互動需求。

### 創建新元素
```javascript
// 創建新的 div 元素
let newDiv = document.createElement("div");
newDiv.textContent = "新創建的元素";
newDiv.className = "new-element";

// 添加到頁面
document.body.appendChild(newDiv);
```

### 移除元素
```javascript
// 移除指定元素
let elementToRemove = document.getElementById("elementToRemove");
if (elementToRemove) {
    elementToRemove.parentNode.removeChild(elementToRemove);
}
```

### 插入元素
```javascript
// 在指定元素前插入新元素
let newElement = document.createElement("p");
newElement.textContent = "插入的段落";
let targetElement = document.getElementById("target");
targetElement.parentNode.insertBefore(newElement, targetElement);
```

# 課堂作業

透過實際的專案練習，我們可以將所學知識整合應用。以下作業將幫助您鞏固學習成果，並培養解決實際問題的能力。建議您獨立完成這些作業，這將是檢驗學習效果的最佳方式。

## 作業一：簡單的待辦事項清單

建立一個待辦事項清單，具備以下功能：
1. 可以添加新的待辦項目
2. 點擊項目可以標記為完成（加上刪除線）
3. 可以刪除已完成的項目
4. 顯示未完成項目的數量

## 作業二：顏色選擇器

顏色選擇器是一個實用的工具，結合了多種 DOM 操作技巧。這個作業將考驗您對事件處理、樣式操作和用戶介面設計的綜合運用能力。

建立一個顏色選擇器，具備以下功能：
1. 使用 RGB 滑桿控制顏色
2. 即時預覽顏色效果
3. 可以儲存喜歡的顏色
4. 顯示當前顏色的十六進位值

{% note success %}
**跟著做：**
完成上述作業後，可以嘗試添加更多功能，如：
- 鍵盤快捷鍵支援
- 本地儲存功能
- 動畫效果
{% endnote %}

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
- [MDN Web Docs - BOM](https://developer.mozilla.org/zh-TW/docs/Web/API/Window)
- [JavaScript 事件參考](https://developer.mozilla.org/zh-TW/docs/Web/Events)
{% endnote %}

## cookie 物件
`document.cookie` 提供了對瀏覽器 cookie 的存取功能。cookie 是儲存在用戶瀏覽器中的小型文字檔案，常用於儲存用戶偏好設定、會話資訊等。

```javascript
// 設定 cookie
document.cookie = "username=John; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";

// 讀取所有 cookie
console.log(document.cookie); // "username=John; theme=dark; language=zh-TW"

// 設定 cookie 的完整語法
document.cookie = "name=value; expires=date; path=path; domain=domain; secure; samesite=value";
```

{% note info %}
**cookie 參數說明：**
- `name=value`：cookie 的名稱和值
- `expires=date`：過期時間（GMT 格式）
- `path=path`：cookie 的作用路徑
- `domain=domain`：cookie 的作用域名
- `secure`：僅在 HTTPS 連線時傳送
- `samesite=value`：防止 CSRF 攻擊（Strict/Lax/None）
{% endnote %}

**常用 cookie 操作：**
- `document.cookie = "name=value"` - 設定簡單 cookie
- `document.cookie = "name=value; expires=date"` - 設定過期時間
- `document.cookie = "name=value; path=/"` - 設定作用路徑
- `document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC"` - 刪除 cookie

{% note warning %}
**cookie 使用注意事項：**
- 每個 cookie 最大 4KB
- 每個域名最多 20 個 cookie
- 需要考慮安全性（XSS、CSRF 攻擊）
- 現代開發中建議使用 localStorage/sessionStorage
- 某些瀏覽器可能阻擋第三方 cookie
{% endnote %}

```javascript demo.js
// localStorage 範例
// ----------------------------------------------------------------
// 儲存用戶偏好設定
localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'zh-TW');

// 讀取儲存的資料
console.log('主題：', localStorage.getItem('theme')); // 主題：dark
console.log('語言：', localStorage.getItem('language')); // 語言：zh-TW

// 檢查儲存空間是否可用，或者儲存情況都可能拋出異常
function checkStorageSupport() {
  try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
  
      // 以下情況可能會拋出異常：
      // 1. 儲存空間已滿 （超過 5-10MB 限制）
      // 2. 瀏覽器隱私模式下無法使用 localStorage
      // 3. 用戶禁用了 Web Storage 功能
      // 4. 存取權限被拒絕
      // 5. 儲存的值不是合法的字串格式
      return true; // 支援 localStorage
  } catch (e) {
      console.log('localStorage 不可用：', e.message);
      return false; // 不支援 localStorage
  }
}

// 清除特定資料
localStorage.removeItem('theme');

// sessionStorage 範例
// ----------------------------------------------------------------
// 儲存表單狀態
sessionStorage.setItem('formData', JSON.stringify({
  name: '張三',
  email: 'zhang@example.com',
  message: '這是一個測試訊息'
}));

// 讀取表單資料
const formData = JSON.parse(sessionStorage.getItem('formData'));
console.log('表單資料：', formData);

// 清除特定資料
sessionStorage.clear(); // 清除所有 sessionStorage 資料
```

{% note info %}
**小技巧：**
- localStorage 資料會永久保存，除非手動刪除
- sessionStorage 資料在關閉分頁後會自動清除
- 儲存容量限制約為 5-10MB
- 只能儲存字串，物件需要先轉換為 JSON
{% endnote %}
