---
title: '[框架課程] React v18 教學（一）- 環境安裝與準備'
categories:
  - 職訓教材
  - ReactJS
tag:
  - JavaScript 程式設計（假日班）
date: 2025-01-15 13:09:14
---
![](assets/images/iWnyS9n.png)
React 是由 Facebook (Meta) 所主導開發的 JavaScript 框架，與 AngularJS 相同都是採用組件 Component-based 來進行觀念導向設計，不像 VueJS 採用 MVVM（Model 資料管理、View 畫面顯示、ViewModal 溝通橋梁）觀念去區分細節，而是整個融合在 Component 整個零件內。

<!-- more -->

React 是一種能夠協助開發者在 JavaScript 互動設計的用戶介面能更快完成，使用 React 幫助我們對 View 的資料流處理能更加便捷。同時 React 雖然稱呼為 js 框架 framework，但其實 React 的核心規模僅達到 JS 函式庫等級，大多數還是依賴 JavaScript 來完成所有代碼開發，因此 React 也被稱呼為最自由的框架，需要充足的 JavaScript 的經驗與知識作為基本能力。

# 關於 React
本篇系列文章編寫時，採用最新版本的 React v18.3，React 的新舊版本不同可能會影響可用的函式，請注意學習上的使用版本差異。

## 生態工具
因為 React 僅為一種 JS Library。因此大多數使用 React 為前端開發的專案，還會搭配 React 大型生態域社群相關的延伸套件工具，列舉部分以下常聽聞過的 React 工具：

- React Router: 用於處理應用程式的路由。
- Redux: 用於管理應用程式的狀態。
- Material-UI: 提供一組現成的 UI 元件，基於 Google 的 Material Design。
- Next.js: 用於 SSR 或 SSG（伺服器端渲染）的 React 框架，一套包含多種工具綑綁的整合型框架。

這些僅只是一些常見的延伸工具，你可以在了解一定的 React 之後，陸續再根據需求必要，慢慢接觸了解這些額外熱門套件。

## 特性
介紹前以下有幾個 React 特性可以討稐。

- 組件導向
React 凡事都採用 Component 來製作組件，需要就可重複運用。且都主要依賴 JavaScript 來編寫，因此整體維護性質很高。
- 只有 View
由於不是 MVC 觀念，只注重在顯示 View 這部分。因此較能輕易跟其他框架工具混合使用。
- 以 JSX 來表示 HTML
由於 React 主要環境以 JavaScript 來編寫，輸出 HTML 元素相對麻煩些（你需要先用 JS 建立 Element 然後 插入到 document 等過程）， 因此大多數 React 專案為了方便而使用 JSX  技術來完成這部分。JSX 是指透過**特殊標籤方式**直接寫在 JavaScript 內，當 React 進行 編譯 building 時透過 Babel 編譯成一般的 JavaScript 語法去指定瀏覽器產生 html 元素，Babel 是一種轉譯語言（與 TypeScript 為同類型轉譯工具），Babel 主要用途除了 JSX 這種快速編寫 HTML 的技術，另外也提供像是 JS 編譯降版相容等功能。
- Virtual DOM 渲染
同上，React 沒有 html 實體元素，因此不是直接操作網頁實體 DOM，而是透過自己的虛擬化 DOM 來進行渲染化。虛擬化 DOM 只會針對局部已改變的應用套在實體 DOM，這能加快所有 html 的改變上的速度。
- Hook 功能
在 React 16.8 版本開始的引用函式之方式，過去舊 React 採用 JavaScript 的 Class（舊方法）封裝類別進行使用 React 核心功能。本系列都是使用 hook 方式呼喚操作，如果公司的舊專案 React 環境仍使用 class 方式，則需要額外去理解舊版本 React 的 class 工具用法。

# 安裝方式
使用 React 時，我們需要理解一共有 2 個重要的檔案，以及額外的 1 筆 Babel 檔案（如果你要用 JSX 來編寫 HTML 則需用到）。React 檔案除了主檔案`react.js`之外，還有一隻負責 Virtual DOM 的`react-dom.js`。本節的 React 語法可以看不懂先無視，主要是測試 React 安裝是否可運作。而你開始接觸 JS 框架這個程度上，你很清楚在專案上的安裝使用可以分很多方法來完成。React 不例外也分為以下方法使用：

## 透過 CDN
此方式知道就好，開發者幾乎不會選擇此方式來做 react 安裝，React[官網提供](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) 一個 html 檔案包含了 CDN 方式載入 react library，你可以直接複製貼到你的本機下使用。

想直接使用可透過 CDN 來引入，提供了未壓縮（開發用）跟已壓縮兩種來源。

```html index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <!-- 開發版 -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
    
      function MyApp() {
        return <h1>Hello, world!</h1>;
      }

      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      root.render(<MyApp />);

    </script>
    <!--
      Note: this page is a great way to try React but it's not suitable for production.
      It slowly compiles JSX with Babel in the browser and uses a large development build of React.

      Read this page for starting a new React project with JSX:
      https://react.dev/learn/start-a-new-react-project

      Read this page for adding React with JSX to an existing project:
      https://react.dev/learn/add-react-to-an-existing-project
    -->
  </body>
</html>
```

> 我們不會這樣用於工作的專案上，這種方式會需要依賴瀏覽器去執行 babel 套件來動態的去解析 JSX 導致產生嚴重的效能拖緩。因此這僅適合新手觀念理解 JSX 的編寫觀念。事實上要使用 JSX 最好是依賴後續提到的 node 或是 react 生態框架（例如 next.js, vite.js 等）。

我們試著在這個簡單範例用 React 做一個 click 事件替換文字。以下故意呈現 JSX 的便利性。我們調整 script 內容。之後章節會再好好介紹 JSX。

### 使用 JSX 的寫法
透過 Babel 的 JSX 來設計，就會非常簡單。但要特別宣告`type="text/babel"` 讓 Babel 知道哪個 JS 代碼需要做 JSX 轉譯。

```html cdn-of-index-with-JSX.html
<head>
  <meta charset="UTF-8" />
  <title>Hello World</title>
  <!-- 開發版 -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Don't use this in production: -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

<body>
  <div id="root"></div>

  <!-- 告知 Babel 這裡的 JS 有 JSX 語法需要轉譯處理 -->
  <script type="text/babel">
    function MyApp() {
      const [lokiClick, setLokiClick] = React.useState(false); // 使用 Hooks 管理狀態

      if (lokiClick) {
        return <h1>I am your first click!</h1>;
      }
      return <h1 onClick={() => setLokiClick(true)}>Hello, world!</h1>;
    }

    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    root.render(<MyApp />);
  </script>
</body>
```

> React 18 引入 Concurrent Mode 的 API，使用 `ReactDOM.createRoot` 提供了更好的性能和更高的靈活性，特別是在處理異步。在版本 17 以前不支援此作法，而是直接渲染例如 `ReactDOM.render(<MyApp />, document.querySelector('#root'))`

### 不使用 JSX 的寫法
這裡提供不想使用 Babel 來編寫 React 的寫法，需要完全透過`react-dom`工具的`React.createElement`來產生，就像請 React 幫忙規劃輸出瀏覽器語法`document.createElement`,`document.createTextNode`,`element.addEventListener`等一堆指令。但在 JSX 的語法糖上，ReactDOM 的建立語法上仍比 JSX 複雜度較高。

```html cdn-of-index-without-JSX.html
<head>
  <meta charset="UTF-8" />
  <title>Hello World</title>
  <!-- 開發版 -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Don't use this in production: -->
  <!-- <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script> -->
</head>

<body>
  <div id="root"></div>
  <script type="text/javascript">
    function MyApp() {
      const [lokiClick, setLokiClick] = React.useState(false); // 使用 Hooks 管理狀態

      if (lokiClick) {
        return React.createElement('h1', null, 'I am your first click!');
      }
      return React.createElement('h1', { onClick: () => setLokiClick(true) }, 'Hello, world!');
    }

    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(MyApp));
  </script>
</body>
```

## 部屬 NodeJS
NodeJS 是一種 Chrome V8 JavaScript 引擎的環境工具，能讓電腦成為 JavaScript 執行環境。Node.js 有龐大的 NPM（Node Package Manager）生態系統，可以快速安裝和使用第三方模組，提升開發效率。一些前端框架整合工具（如 Vite、Webpack、Babel 等）都依賴於 Node.js 安裝和管理運行。

### 直接安裝或版本管理工具
首先需要在電腦上 [安裝 NodeJS](https://nodejs.org/en)，安裝完成後整個全局環境上。此電腦的命令提示字元就能使用 node 相關指令。新專案下，安裝時通常版本會選擇 LTS 穩定常用的版本，而不會選擇 Current 當前最新的版本。如下圖，官方示範了如何用透過版本管理工具 command 指令安裝，或是直接下載安裝。

![官方提供的下載方式](/assets/images/2025-01-19-12-46-26.png)

但通常我們不會直接下載安裝，因為每個專案創立所使用的 Node 版本不同。如果在較新的 Node 版本上執行舊專案時，有可能會導致專案無法啟用成功（專案內套件有版本相依問題）。

因此我們都希望透過一個工具來讓電腦可以安裝多個 Node 版本。這樣在指定的專案執行前，我們只需透過工具做切換，讓電腦的 Node 可以抽換指定的 Node 版本。

較為有名的工具為 [nvm(Node Version Manager)](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)。但是僅適用於 Linux 或 macOS 系統，也有人為了 Windows 而開發了 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)。

但個人推薦新手的是另一套 [nvs(Node Version Switcher)](https://github.com/jasongin/nvs) 作為工具使用。他有比較易懂的介面直接操作快速上手。**不論選擇哪種**都只是一個 Node 版本管理工具，都不影響專案開發的使用。

> 目前比較熱門受討論的工具為 [fnm(Fast Node Manager)](https://github.com/Schniz/fnm)，擁有極快的執行效率。但初始設定上需要額外一些 PATH 與 shell 設定步驟。因此建議有興趣且對環境參數熟悉的人可自行了解。

你可以透過下載並安裝完畢後。直接於終端機輸入`nvs`，就能選擇安裝或執行任何 Node 版本。要切換也是輸入相同指令。還有更多指令技巧可以自行研究。

![](/assets/images/2025-01-19-14-06-17.png)

### 安裝 pnpm
接下來，使用 VSCode 準備好一個新專案目錄之上層位置。

- 使用 `nvs` 指令，選擇一個 Node 版本。
- 選擇好你指定的 Node 版本環境，確認指令為 `node -v`。
- 我們需要在全局`g`上面額外安裝 pnpm 工具。讓整台電腦 Node 隨時可以接受 pnpm 指令。（一次就好，以後不用在此 Node 上安裝）

![](/assets/images/2025-01-19-14-54-17.png)

## 使用 Vite (CLI)
CLI 是一種能夠快速建立 React 開發所需要的伺服器環境與轉譯系統。React 18 開始改推薦使用提供 [Vite](https://vite.dev/) 的 CLI 工具。能無腦的解決環境應用進行開發出一個 SPA（單頁應用程序）的專案，推薦新手學習快樹初始化一個 SPA 專案環境。

使用 Vite 開發模式下時直接利用瀏覽器原生支持的 ESModules，无需預打包（早期很多都利用 webpack 來打包），啟動速度極快。而在 Building 生成時，使用 Rollup 進行打包，類似於 Webpack 的用途，但更輕量。

> 在 React 17 版本以前推薦的 CLI 工具為 create-react-app （可另簡稱為 React cli 或為 CRA 工具），Create React App 本身僅包含了 webpack 與 babel 的前端建置管道，不提供任何後端服務功能，且 18 版本開始已經不再作為推薦方法。

使用 Vite 部屬 React 的第一步環境。在 node 指令上操作：

- 輸入指令`pnpm create vite`
- 命名一個名稱做為下層專案目錄。
- 選擇 React 為前端框架工具。
- 選擇最基本的 JavaScript。（也可以選擇 JavaScript+SWC，他會採用另一種更高快的編譯方式，開發操作上無差異）。

![](/assets/images/2025-01-19-14-55-17.gif)

- 照畫面提示的三道指令輸入
- `cd react-learn`，或者直接 VScode 直接重新開啟此目錄。
- `pnpm install`，避免遺漏套件，重新檢查安裝所需的模組套件。
- `pnpm run dev`，執行開發模式，產生及改及看的虛擬服務。

![](/assets/images/2025-01-19-16-03-24.png)

> 在 package.json 內可以看到細節，以及 scripts 腳本指令，例如輸入`pnpm dev`代表輸入`pnpm vite`。

此時會獲得一個網站網址為`http://localhost:5173/`，並且已經存在一個範例用的專案應用網站。透過這個目錄的內部層級檔案各用途說明：

- **public:**
作為公共區域，通常會把一些靜態資源例如圖片放置在這裡。
- **src:**
為 React 程式集中區，包含 React 會 import 的 css 也放在這，舉例看到一些 JSX 格式的檔案，以及 CSS 檔案。
- **dist:**
如果要將專案正式發佈到線上環境，透過`pnpm build`進行建置作業，會產生該目錄（產生瀏覽器看得懂的純 HTML、JS、CSS 專案目錄）。

## 擴展開發工具
[React Developer Tools](https://react.dev/learn/react-developer-tools) 是一個能在開發上獲得更好的檢查工具，可透過加裝 [Chrome 擴充工具](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) 協助我們開發過程上對於資料流的掌握不需要一直 console 出來看。

# 參考文獻
- [採用 SWC 取代 Babel，大幅提升編譯速度](https://medium.com/dcardlab/%E6%8E%A1%E7%94%A8-swc-%E5%8F%96%E4%BB%A3-babel-%E5%A4%A7%E5%B9%85%E6%8F%90%E5%8D%87%E7%B7%A8%E8%AD%AF%E9%80%9F%E5%BA%A6-802d9cd0db35)
- [Getting Started | Vite](https://vite.dev/guide/)
- [Installation – React](https://react.dev/learn/installation)
- [Windows 系统中 FnM 的安装与配置详述-易源 AI 资讯 | 万维易源](https://www.showapi.com/news/article/678062aa4ddd79f11a1b8758)