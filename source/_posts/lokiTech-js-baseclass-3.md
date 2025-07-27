---
title: "[基礎課程] JavaScript 教學（二）：BOM 與 DOM"
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

## 什麼是 BOM 與 DOM？

在開始學習具體操作之前，我們需要先理解這兩個模型的基本概念：

### BOM（Browser Object Model）
BOM 是瀏覽器物件模型，它提供了 JavaScript 與瀏覽器本身互動的介面。透過 BOM，我們可以：
- 控制瀏覽器視窗
- 操作瀏覽器歷史記錄
- 獲取螢幕資訊
- 控制 URL 導向

### DOM（Document Object Model）
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

### 兩者的關係
- **BOM** 是瀏覽器的整體模型，`window` 是其根物件
- **DOM** 是 BOM 的一部分，`document` 物件代表整個 HTML 文件
- 我們通常透過 `window.document` 來存取 DOM

{% note info %}
**重要觀念：**
- BOM 控制瀏覽器行為（如開啟新視窗、導向頁面）
- DOM 控制網頁內容（如修改文字、改變樣式）
- 兩者配合使用，可以創造豐富的網頁互動體驗
{% endnote %}

## BOM 基礎操作

### window 物件
`window` 是 BOM 的根物件，代表整個瀏覽器視窗。在瀏覽器環境中，全域變數和函數都屬於 `window` 物件。

```javascript
// 以下兩種寫法效果相同
console.log("Hello World");
window.console.log("Hello World");

// 全域變數實際上是 window 的屬性
let globalVar = "全域變數";
console.log(window.globalVar); // "全域變數"
```

### 常用的 BOM 方法

BOM 提供了豐富的方法來與瀏覽器互動。這些方法可以分為幾個主要類別，每種類別都有其特定的用途和應用場景。讓我們從最常用的對話框方法開始學習。

#### 1. 對話框方法
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

{% note success %}
**跟著做：**
請在瀏覽器控制台中逐一執行上述程式碼，觀察不同對話框的效果。
{% endnote %}

#### 2. 計時器方法

計時器是 JavaScript 中非常重要的功能，它允許我們在指定的時間後執行程式碼，或者重複執行某些操作。這在製作動畫、自動更新內容等場景中非常有用。
```javascript
// setTimeout - 延遲執行
let timeoutId = setTimeout(function() {
    console.log("3 秒後執行");
}, 3000);

// clearTimeout - 取消延遲執行
// clearTimeout(timeoutId);

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

#### 3. 視窗控制

視窗控制功能允許我們程式化地操作瀏覽器視窗，包括開啟新視窗、調整視窗大小等。不過需要注意的是，現代瀏覽器基於安全考量對這些功能有所限制。
```javascript
// 開啟新視窗
let newWindow = window.open("https://www.google.com", "_blank", "width=500,height=400");

// 關閉視窗
// newWindow.close(); // 只能在同源視窗中使用

// 調整視窗大小
// window.resizeTo(800, 600); // 現代瀏覽器可能限制此功能
```

### location 物件

`location` 物件是 BOM 中處理 URL 和頁面導向的重要工具。它包含了當前頁面的完整 URL 資訊，並提供了豐富的方法來操作和導向頁面。無論是獲取當前頁面資訊還是進行頁面跳轉，`location` 物件都是不可或缺的。

```javascript
// 獲取當前 URL
console.log(location.href);

// 導向到新頁面 - 方法一：直接設定 href
// location.href = "https://www.google.com";

// 導向到新頁面 - 方法二：使用 assign() 方法
// location.assign("https://www.google.com");

// 導向到新頁面 - 方法三：使用 replace() 方法（替換當前頁面）
// location.replace("https://www.google.com");

// 重新載入頁面
// location.reload();

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

### screen 物件

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

### history 物件

`history` 物件讓我們能夠程式化地控制瀏覽器的前進、後退功能。這在製作單頁應用程式（SPA）或需要自訂導航行為的網頁中非常有用。透過 `history` 物件，我們可以實現更靈活的頁面導航體驗。

```javascript
// 回到上一頁
// history.back();

// 前往下一頁
// history.forward();

// 跳轉指定頁數（正數前進，負數後退）
// history.go(-2); // 回到前兩頁
```

{% note warning %}
**注意事項：**
- 基於安全考量，現代瀏覽器對某些 BOM 操作有限制
- 彈出視窗可能被瀏覽器阻擋
- 某些方法需要用戶互動才能執行
{% endnote %}

## 其他重要的 BOM 物件與方法

除了前面介紹的核心物件外，BOM 還提供了許多其他有用的物件和方法。這些物件在特定場景下非常有用，值得了解它們的存在和基本用途。

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

### 其他 window 方法
window 物件還提供了許多實用的方法。

| 方法                 | 描述           | 用途               |
| -------------------- | -------------- | ------------------ |
| `window.scrollTo()`  | 滾動到指定位置 | 頁面導航、錨點跳轉 |
| `window.scrollBy()`  | 相對滾動       | 平滑滾動效果       |
| `window.print()`     | 列印當前頁面   | 列印功能           |
| `window.focus()`     | 讓視窗獲得焦點 | 視窗管理           |
| `window.blur()`      | 讓視窗失去焦點 | 視窗管理           |
| `window.moveTo()`    | 移動視窗位置   | 視窗定位           |
| `window.resizeTo()`  | 調整視窗大小   | 視窗尺寸控制       |
| `window.innerWidth`  | 視窗內部寬度   | 響應式設計         |
| `window.innerHeight` | 視窗內部高度   | 響應式設計         |
| `window.outerWidth`  | 視窗外部寬度   | 視窗管理           |
| `window.outerHeight` | 視窗外部高度   | 視窗管理           |

### 其他 location 屬性
location 物件還有一些實用的屬性。

| 屬性                | 描述           | 用途         |
| ------------------- | -------------- | ------------ |
| `location.search`   | URL 查詢參數   | 參數解析     |
| `location.hash`     | URL 錨點部分   | 單頁應用路由 |
| `location.origin`   | 協議+主機+端口 | 同源檢測     |
| `location.port`     | 端口號         | 環境檢測     |
| `location.hostname` | 主機名稱       | 域名檢測     |

### 其他 history 方法
history 物件提供更多導航控制功能。

| 方法                     | 描述         | 用途         |
| ------------------------ | ------------ | ------------ |
| `history.pushState()`    | 新增歷史記錄 | 單頁應用路由 |
| `history.replaceState()` | 替換歷史記錄 | 路由狀態管理 |
| `history.length`         | 歷史記錄數量 | 導航狀態檢測 |
| `history.state`          | 當前狀態     | 狀態管理     |

### 其他 screen 屬性
screen 物件還有一些實用的屬性。

| 屬性                 | 描述           | 用途     |
| -------------------- | -------------- | -------- |
| `screen.availLeft`   | 可用區域左邊距 | 視窗定位 |
| `screen.availTop`    | 可用區域上邊距 | 視窗定位 |
| `screen.colorDepth`  | 色彩深度       | 圖片品質 |
| `screen.pixelDepth`  | 像素深度       | 顯示品質 |
| `screen.orientation` | 螢幕方向       | 適配設計 |

### 其他重要物件

#### Performance API
| 方法/屬性            | 描述         | 用途     |
| -------------------- | ------------ | -------- |
| `performance.now()`  | 高精度時間戳 | 性能測量 |
| `performance.memory` | 記憶體使用   | 性能監控 |
| `performance.timing` | 頁面載入時間 | 性能分析 |

#### Console API
| 方法                | 描述     | 用途     |
| ------------------- | -------- | -------- |
| `console.log()`     | 一般日誌 | 除錯輸出 |
| `console.warn()`    | 警告訊息 | 警告輸出 |
| `console.error()`   | 錯誤訊息 | 錯誤輸出 |
| `console.table()`   | 表格輸出 | 資料展示 |
| `console.group()`   | 分組輸出 | 日誌組織 |
| `console.time()`    | 計時開始 | 性能測量 |
| `console.timeEnd()` | 計時結束 | 性能測量 |

{% note info %}
**使用建議：**
- 這些物件和方法在特定場景下非常有用
- 建議根據實際需求選擇合適的 API
- 注意瀏覽器相容性和安全限制
- 優先使用現代標準 API
- 常用方法建議熟記，不常用的可以查閱文件
{% endnote %}

## DOM 基礎概念
DOM 將 HTML 文件表示為一個樹狀結構，每個 HTML 元素都是一個節點（Node）。透過這個結構，JavaScript 可以精確地找到並操作任何元素。

### DOM 樹狀結構
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

### 節點類型
DOM 中有多種節點類型：
- **元素節點**：HTML 標籤（如 `<div>`、`<p>`）
- **文字節點**：標籤內的文字內容
- **屬性節點**：HTML 屬性（如 `id`、`class`）

## DOM 元素選擇

在 DOM 操作中，第一步就是要找到我們想要操作的元素。JavaScript 提供了多種方法來選擇元素，每種方法都有其特定的使用場景和優缺點。掌握這些選擇方法是進行 DOM 操作的基礎。

### 基本選擇方法

#### 透過 ID 選擇
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

#### 透過標籤名稱選擇
```javascript
// 選擇所有 p 標籤（回傳 HTMLCollection）
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length); // 2
console.log(paragraphs[0]); // 第一個 p 元素
```

#### 透過類別名稱選擇
```javascript
// 選擇所有 class 為 "text" 的元素（回傳 HTMLCollection）
let textElements = document.getElementsByClassName("text");
console.log(textElements.length); // 2
```

#### 透過 name 屬性選擇
```html
<input type="text" name="username" value="使用者名稱">
```

```javascript
// 選擇所有 name 為 "username" 的元素
let inputs = document.getElementsByName("username");
console.log(inputs[0].value); // "使用者名稱"
```

#### 使用 document 子物件

除了透過選擇方法存取元素外，`document` 物件還提供了一些直接存取的子物件，這些物件代表 HTML 文件中的重要結構元素。

| document. 子物件   | 描述                                                            |
| ------------------ | --------------------------------------------------------------- |
| `document.head`    | head 元素，但唯獨屬性不可修改                                   |
| `document.body`    | body 元素，操作例如`document.body.style.backgroundColor="red";` |
| `document.forms`   | 文件內的全部表單元素之通用集合                                  |
| `document.links`   | 文件內的全部具備 href 之元素之通用集合                          |
| `document.images`  | 文件內的全部 img 元素之通用集合                                 |
| `document.scripts` | 文件內的全部 script 元素之通用集合                              |

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
- 回傳的是 HTMLCollection 或單一元素
- 在實際開發中非常實用
{% endnote %}

### 現代選擇方法（querySelector）

除了傳統的選擇方法，現代瀏覽器還支援更強大和靈活的 `querySelector` 方法。這些方法使用 CSS 選擇器語法，讓元素選擇變得更加直觀和強大。`querySelector` 系列方法是目前推薦使用的選擇方法。

除了傳統方法，現代瀏覽器支援更強大的 `querySelector` 方法：

```javascript
// 選擇第一個符合條件的元素
let firstP = document.querySelector("p");
let title = document.querySelector("#title");
let textClass = document.querySelector(".text");

// 選擇所有符合條件的元素（回傳 NodeList）
let allTexts = document.querySelectorAll(".text");
let allButtons = document.querySelectorAll("button");
```

{% note info %}
**NodeList vs HTMLCollection 差異：**
- **HTMLCollection**：`getElementsBy*` 方法回傳，是動態集合
  - 會自動更新，當 DOM 改變時集合會同步更新
  - 只能使用數字索引存取
  - 範例：`document.getElementsByTagName("p")`

- **NodeList**：`querySelectorAll` 方法回傳，是靜態集合
  - 不會自動更新，DOM 改變時集合不會同步更新
  - 可以使用數字索引或 `forEach` 方法
  - 範例：`document.querySelectorAll("p")`

**實際差異範例：**
```javascript
// HTMLCollection - 動態更新
let elements1 = document.getElementsByTagName("p");
console.log(elements1.length); // 假設有 2 個 p 元素

// 新增一個 p 元素
let newP = document.createElement("p");
document.body.appendChild(newP);

console.log(elements1.length); // 自動變成 3 個

// NodeList - 靜態集合
let elements2 = document.querySelectorAll("p");
console.log(elements2.length); // 假設有 2 個 p 元素

// 新增一個 p 元素
let newP2 = document.createElement("p");
document.body.appendChild(newP2);

console.log(elements2.length); // 仍然是 2 個，不會自動更新
```
{% endnote %}


{% note info %}
**小技巧：**
- `querySelector` 使用 CSS 選擇器語法，更直觀
- `querySelector` 只回傳第一個符合的元素
- `querySelectorAll` 回傳所有符合的元素
{% endnote %}


## DOM 內容操作

找到元素後，下一步就是對元素進行操作。DOM 提供了豐富的方法來讀取和修改元素的內容、屬性和樣式。這些操作是動態網頁開發的核心，讓我們能夠創造豐富的用戶體驗。

### 讀取和修改內容

#### innerHTML vs textContent
```javascript
let element = document.getElementById("title");

// 讀取內容
console.log(element.innerHTML); // "我的網頁"
console.log(element.textContent); // "我的網頁"

// 修改內容
element.innerHTML = "<em>新的標題</em>"; // 支援 HTML 標籤
element.textContent = "純文字標題"; // 只支援純文字
```

#### 實際範例
```javascript
// 獲取元素
let container = document.getElementById("container");
let btn = document.getElementById("btn");

// 讀取內容
console.log("容器內容：" + container.innerHTML);

// 修改按鈕文字
btn.textContent = "已點擊";

// 動態添加內容
container.innerHTML += "<p>新添加的段落</p>";
```

### 屬性操作

除了內容操作，我們還需要能夠讀取和修改元素的屬性。屬性操作包括 HTML 屬性和 CSS 樣式，這些都是動態網頁開發中不可或缺的技能。

#### 讀取和設定屬性
```javascript
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

#### 樣式操作
```javascript
let element = document.getElementById("title");

// 直接設定樣式
element.style.color = "red";
element.style.backgroundColor = "#f0f0f0";
element.style.fontSize = "24px";

// 讀取樣式
console.log(element.style.color); // "red"
```

{% note success %}
**跟著做：**
請在瀏覽器控制台中執行以下程式碼，觀察元素變化：
```javascript
let title = document.getElementById("title");
title.style.color = "blue";
title.style.fontSize = "32px";
title.textContent = "動態修改的標題";
```
{% endnote %}

## 事件處理基礎

事件處理是 JavaScript 與用戶互動的核心機制。透過事件處理，我們可以響應用戶的各種操作，如點擊、滑鼠移動、鍵盤輸入等。掌握事件處理是製作互動網頁的關鍵技能。

### 什麼是事件？
事件是網頁中發生的動作，如點擊、滑鼠移動、鍵盤按下等。JavaScript 可以監聽這些事件並執行相應的程式碼。

### 常見事件類型

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

### 事件物件
事件處理器會自動接收一個事件物件，包含事件的詳細資訊：

```javascript
button.addEventListener("click", function(event) {
    console.log("事件類型：" + event.type);
    console.log("目標元素：" + event.target);
    console.log("滑鼠位置：" + event.clientX + ", " + event.clientY);
});
```

## 實作練習

理論學習固然重要，但真正的技能提升來自於實際操作。透過以下練習，我們將把前面學習的知識應用到實際場景中，幫助您更好地理解和掌握 BOM 與 DOM 的操作。

### 練習一：簡單的互動按鈕

{% note primary %}
**素材準備：**
```html interactive-button.html
<!DOCTYPE html>
<html>
<head>
    <title>互動按鈕練習</title>
    <style>
        .button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>互動按鈕練習</h1>
    <button id="changeColorBtn" class="button">改變顏色</button>
    <button id="changeTextBtn" class="button">改變文字</button>
    <div id="displayArea" style="padding: 20px; border: 1px solid #ccc; margin: 20px;">
        這裡是顯示區域
    </div>
    
    <script>
        // 在這裡實作互動功能
    </script>
</body>
</html>
```
{% endnote %}

**實作要求：**
1. 點擊「改變顏色」按鈕時，隨機改變顯示區域的背景顏色
2. 點擊「改變文字」按鈕時，改變顯示區域的文字內容
3. 當滑鼠移入按鈕時，在控制台顯示訊息

```javascript
// 實作程式碼
let changeColorBtn = document.getElementById("changeColorBtn");
let changeTextBtn = document.getElementById("changeTextBtn");
let displayArea = document.getElementById("displayArea");

// 顏色陣列
let colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"];

// 改變顏色功能
changeColorBtn.addEventListener("click", function() {
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    displayArea.style.backgroundColor = randomColor;
    console.log("背景顏色已改變為：" + randomColor);
});

// 改變文字功能
changeTextBtn.addEventListener("click", function() {
    let texts = ["Hello World!", "JavaScript 很有趣！", "DOM 操作很簡單", "繼續學習吧！"];
    let randomText = texts[Math.floor(Math.random() * texts.length)];
    displayArea.textContent = randomText;
});

// 滑鼠移入事件
changeColorBtn.addEventListener("mouseover", function() {
    console.log("滑鼠移入改變顏色按鈕");
});

changeTextBtn.addEventListener("mouseover", function() {
    console.log("滑鼠移入改變文字按鈕");
});
```

### 練習二：表單驗證

表單驗證是網頁開發中非常常見的需求。透過這個練習，我們將學習如何結合事件處理和 DOM 操作來實現即時的表單驗證功能，這在實際的網頁應用中非常重要。

{% note primary %}
**素材準備：**
```html form-validation.html
<!DOCTYPE html>
<html>
<head>
    <title>表單驗證練習</title>
    <style>
        .form-group {
            margin: 10px 0;
        }
        .error {
            color: red;
            font-size: 12px;
        }
        .success {
            color: green;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <h1>表單驗證練習</h1>
    <form id="myForm">
        <div class="form-group">
            <label for="username">使用者名稱：</label>
            <input type="text" id="username" name="username">
            <span id="usernameError" class="error"></span>
        </div>
        
        <div class="form-group">
            <label for="email">電子郵件：</label>
            <input type="email" id="email" name="email">
            <span id="emailError" class="error"></span>
        </div>
        
        <div class="form-group">
            <label for="age">年齡：</label>
            <input type="number" id="age" name="age">
            <span id="ageError" class="error"></span>
        </div>
        
        <button type="submit">提交</button>
    </form>
    
    <script>
        // 在這裡實作表單驗證
    </script>
</body>
</html>
```
{% endnote %}

**實作要求：**
1. 使用者名稱不能為空，且長度至少 3 個字元
2. 電子郵件必須符合基本格式
3. 年齡必須是數字，且範圍在 1-120 之間
4. 提交時顯示驗證結果

```javascript
// 實作程式碼
let form = document.getElementById("myForm");
let username = document.getElementById("username");
let email = document.getElementById("email");
let age = document.getElementById("age");

// 驗證函數
function validateUsername() {
    let value = username.value.trim();
    let error = document.getElementById("usernameError");
    
    if (value === "") {
        error.textContent = "使用者名稱不能為空";
        return false;
    } else if (value.length < 3) {
        error.textContent = "使用者名稱至少需要 3 個字元";
        return false;
    } else {
        error.textContent = "";
        return true;
    }
}

function validateEmail() {
    let value = email.value.trim();
    let error = document.getElementById("emailError");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === "") {
        error.textContent = "電子郵件不能為空";
        return false;
    } else if (!emailRegex.test(value)) {
        error.textContent = "請輸入有效的電子郵件格式";
        return false;
    } else {
        error.textContent = "";
        return true;
    }
}

function validateAge() {
    let value = parseInt(age.value);
    let error = document.getElementById("ageError");
    
    if (isNaN(value)) {
        error.textContent = "請輸入有效的年齡";
        return false;
    } else if (value < 1 || value > 120) {
        error.textContent = "年齡必須在 1-120 之間";
        return false;
    } else {
        error.textContent = "";
        return true;
    }
}

// 綁定驗證事件
username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
age.addEventListener("blur", validateAge);

// 表單提交事件
form.addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止表單預設提交
    
    let isUsernameValid = validateUsername();
    let isEmailValid = validateEmail();
    let isAgeValid = validateAge();
    
    if (isUsernameValid && isEmailValid && isAgeValid) {
        alert("表單驗證成功！");
        console.log("表單資料：", {
            username: username.value,
            email: email.value,
            age: age.value
        });
    } else {
        alert("請修正表單錯誤後再提交");
    }
});
```

## 進階概念

在掌握了基礎的 DOM 操作後，我們可以進一步學習一些進階概念。這些概念將幫助您更深入地理解 DOM 的運作機制，並能夠處理更複雜的網頁互動需求。

### DOM 節點操作

#### 創建新元素
```javascript
// 創建新的 div 元素
let newDiv = document.createElement("div");
newDiv.textContent = "新創建的元素";
newDiv.className = "new-element";

// 添加到頁面
document.body.appendChild(newDiv);
```

#### 移除元素
```javascript
// 移除指定元素
let elementToRemove = document.getElementById("elementToRemove");
if (elementToRemove) {
    elementToRemove.parentNode.removeChild(elementToRemove);
}
```

#### 插入元素
```javascript
// 在指定元素前插入新元素
let newElement = document.createElement("p");
newElement.textContent = "插入的段落";
let targetElement = document.getElementById("target");
targetElement.parentNode.insertBefore(newElement, targetElement);
```

### 事件委派

當網頁中有大量相似元素需要相同的事件處理時，為每個元素都綁定事件處理器會造成效能問題。事件委派是一種優雅的解決方案，它利用事件冒泡機制來統一處理多個元素的事件。
當有多個相似元素需要相同事件處理時，可以使用事件委派：

```html
<ul id="todoList">
    <li>項目 1</li>
    <li>項目 2</li>
    <li>項目 3</li>
</ul>
```

```javascript
let todoList = document.getElementById("todoList");

// 使用事件委派處理所有 li 元素的點擊
todoList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.style.textDecoration = "line-through";
        console.log("點擊了：" + event.target.textContent);
    }
});
```

{% note info %}
**事件委派的優點：**
- 減少事件監聽器數量
- 動態添加的元素自動具有事件處理
- 提高效能
{% endnote %}

## 課堂作業

透過實際的專案練習，我們可以將所學知識整合應用。以下作業將幫助您鞏固學習成果，並培養解決實際問題的能力。建議您獨立完成這些作業，這將是檢驗學習效果的最佳方式。

### 作業一：簡單的待辦事項清單

建立一個待辦事項清單，具備以下功能：
1. 可以添加新的待辦項目
2. 點擊項目可以標記為完成（加上刪除線）
3. 可以刪除已完成的項目
4. 顯示未完成項目的數量

### 作業二：顏色選擇器

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

## 總結

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