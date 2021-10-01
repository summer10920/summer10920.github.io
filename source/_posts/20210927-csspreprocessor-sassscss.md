---
title: '[學習之路] CSS 進階處理系列（二） -Sass/Scss'
categories:
  - Zero Road
  - Web Fronted
tag:
  - SASS
date: 2021-09-27 18:06:58
---
![](https://i.imgur.com/KgMI01E.png)
本篇介紹 Sass 這套預處理器，他能將大型專案上編寫 CSS 不易維護的問題進行改善。使用 Sass 的 Script 語言來進行 CSS 開發，再透過編譯 complier 後轉為瀏覽器可閱讀的 CSS。

<!-- more -->

# Sass
Sass 於 2006 年誕生，屬於最成熟且廣為人知的 CSS Preprocessor 預處理器編輯語言（可稱為 SassScript)，起初用於 ruby 程式語言所使用 的 CSS 框架，可相容原生 CSS 語法並以副檔名 `*.sass` 來保存。

## 新舊差異
早期的編譯副檔名為`*.sass`編寫方式，隨同敵 LESS 的出現後才推出新版的副檔名`*.scss`的編寫方式，主要是因為原`*.sass`的寫法省略範圍符號`{}`與結尾符號`;`的方，導致 web 開發人員在學習上不易習慣與視察維護，推新出 Sassy CSS `*.scss`之編寫習慣更貼近 css 原生格式。而這兩者都併存目前皆可使用解讀編譯，如果學習選擇直接以新的`*.scss`編譯習慣即可。

{% tabs Sass %}
<!-- tab Scss 寫法（新）-->
```scss
/*Scss SYNTAX */
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```
<!-- endtab -->
<!-- tab Sass 寫法（舊）-->
```scss
/*Sass SYNTAX */
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```
<!-- endtab -->
<!-- tab CSS 輸出 -->
```css
/* CSS OUTPUT */
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```
<!-- endtab -->

{% endtabs %}

雖然如此官方名稱仍以 Sass 稱呼，只需理解 Sass 的 Script 語言提供了`*.sass`與`*.scss`兩種轉換編碼即可。一律聲稱所學的是 Sass 並採新編譯方式 Scss 使用。

## 安裝
早期需要安裝 ruby 才能使用編譯 Complier（元祖版本），隨著時代推進發展至 Node.js 為主流市場已停止維護（包含 LibSass 版）。改由 Dart Sass 版本來工作。以下方法皆不使用 ruby 方式下進行安裝。但方法其實不只一種，其主要的是需要找到工具能夠協助將 Sass 編譯成 CSS 即可。列出 2 種方式與各自工具：

> 現在大部分都採用 Dart Sass 版來編譯使用，如果不清楚最好判別的方式為 Dart Sass 版本目前是 1.42.1 而 LibSass 版本為 3.6.5。如果不是採用官方的管道來安裝 Sass，很可能是該作者根據 Sass 邏輯來自設計或嵌入 Dart Sass 某版，版本上的新功能嘗鮮或閹割就沒這麼正統便是。
> 
### Dart Sass
Sass 慢慢將主要維護版本落於 Dart Sass 這個版本，如果你還聽過 libSass 也被官方宣告不再維護了，Dart Sass 是採用 JavaScript 來開發的，編譯時間上稍微慢但也沒啥問題。先從下列方式獲得 Dart Sass 編輯能力。

**獨立安裝**
從 [Github](https://github.com/sass/dart-sass/releases/) 安裝主程式，透過 Dart Sass 主程式來安裝到電腦，並自行設定 PATH 使得 CMD 支援 Sass 指令。

>本篇不介紹自行前往了解。

**自動化管理工具**
大多數的資深開發人員都會選擇這方面的套件管理工具，選擇支援 Sass 的管理工具來使用，像是 [Webpack](https://webpack.js.org/) （推薦）、Gulp 等。

>本篇不介紹。未來有機會介紹 webpack

#### Node.js  安裝與測試
身為 Web 開發人員，從 NPM 方式來獲取是最便捷的，這裡教學兩種 npm 安裝，分別是全域模式與專案模式。

##### 全域安裝
使用指令`npm install -g sass`來全域安裝，注意由於是 JavaScript 來實現因此執行效率稍慢一些。

```shell
# 全域安裝方式
npm i sass -g
```
> `i`等價 install；`-g`等價安裝至 Global 也就整台電腦上，使得 node.js 終端指令能使用 sass 模組。

接著測試一下終端指令。開啟終端機輸入 sass 獲得提示，你可以執行以下指令要求輸入來源與輸出位置

```shell
# 來源檔案 目標檔案 兩種寫法
sass <input.scss> [output.css]
sass <input.scss>:<output.css>
# 來源目錄：目標目錄
sass <input/>:<output/> <dir/>
```

**單一檔案轉換**
舉例透過前面的 scss 範例代碼存為 test.scss，輸入以下指令將能獲得 myOutput.css 與 myOutput.map 檔案
```shell
sass test.scss myOutput.css
```

> 如果需要多個檔案轉換，可一次輸入例如 `sass a.scss:myA.css b.scss:B.css`

**目錄下全數轉換**
將多個 scss 檔案放置在自訂目錄下例如`/scss/*`，而想要指定輸出至目錄`/dist/css/*`，根據以下指令完成（你可以拿 Bootstrap Source 包來測試）。能發現原本 Bootstrap 的 scss 目錄內之多個檔案變成只有 8 隻檔案。
```shell
sass scss:dist/css
```

> 如果整個根目錄底下的 scss 都要轉換且輸出位置同於輸入位置，可暴力使用指令 `sass .`來全部完成。

**watch 監看**
如果每次轉換都要手動很麻煩，可以對指令多添加--watch。第一次轉換之後就會保持監看模式，一但來源檔案有所異動就會立即同步至輸出檔案，除非按下<kbd>Ctrl+C</kbd>停止監看。

```shell
sass --watch test.scss myOutput.css
sass --watch scss:dist/css
```

##### 專案安裝
如果只想綁定在專案上使用，我們需要規畫一個 npm 初始化並在這個專案上設定 script 指令來出動。

> 如果前面有試過全域安裝，可考慮先移除 `npm remove sass -g` 避免功能差異上之混淆。

1. 在專案下終端輸入`npm init`使得專案獲得 npm 環境，過程可以先 pass 跑完。
2. 檢查剛產生的 package.json 可能長這樣
```json package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
3. 接著終端指令輸入`npm i sass -save`，要求安裝 sass 至專案下。
> `i`等價 install；`-save`等價寫入，能自動寫入此 sass 模組相關資訊至 package.json
4. 再次檢查 package.json 長這樣
```json package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "sass": "^1.42.1"
  }
}
```
5. 接著我們開始能自訂指令寫入到 package.json 的 script 項目內，舉例來只要輸入 sass 就能幫我們自動轉換（指定目錄）並監看模式中。
```json package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "autosass": "sass --watch scss:dist/css"
  },
  "author": "",
  "license": "ISC"
}
```
6. 然後執行指令`npm run autosass`就能透過名稱 autosass 這個 script，開始將 scss 目錄轉換至 dist/css 目錄並保持 watch。
> 可以多創造幾個喜歡的 script 指令

### VSCode 插件
與前面 Dart SASS 的工具不同，由插件來使 VSCode 獲得 SASS 編譯能力。因此指令操作不是同前方式執行。假若只是做為新手練習快速獲得檢視（需搭配 Live Server) 使用下值得推薦。

#### 啟用步驟

1. 前往 [vscode-live-sass-compiler](https://ritwickdey.github.io/vscode-live-sass-compiler/) 獲得 VSCode 安裝外掛
2. 按下右下角狀態列之 Watch Sass / Watching.. 之按鈕，能切換 Sass 啟用並預設的自動將專案目錄下所有 sass 檔案轉為 css 並放置相同位置。

#### 參數調整
透過 VSCode 的 setting.json（或從套件找到設定參數）進行客製調整

**liveSassCompile.settings.formats**
為導出的 css 設置格式（樣式）、擴展名和保存位置（支持多種格式）。
```json
"liveSassCompile.settings.formats": [ //輸出格式
  // This is Default.
  {
    "format": "expanded", // CSS 格式：expanded(Default 未壓縮）, compressed（壓縮，排除空格及縮排）, or compact, nested.
    "extensionName": ".css", // 副檔名：可選副檔名 .min.css
    "savePath": "~/../css/"
    /*  
      儲存路徑
      /：相對根目錄，ex: /dist/css
      ~：相對於每個 SASS 檔案，ex: ~/../css/
    */
  },
  // You can add more，可多添加並同時輸出不同規則
  {
    "format": "compressed",
    "extensionName": ".min.css",
    "savePath": "/dist/css"
  }
],
```

**liveSassCompile.settings.excludeList**
排除特定目錄。目錄內的所有 Sass/Scss 文件都將被忽略。
```json
"liveSassCompile.settings.excludeList": [ //排除特定目錄
  "**/node_modules/**",
  ".vscode/**"
],
```

**liveSassCompile.settings.includeItems**
指定特定檔案才進行導出
```json
"liveSassCompile.settings.includeItems": [
    "path/subpath/a.scss",
    "path/subpath/b.scss",
],
```

**liveSassCompile.settings.generateMap**
是否要導出 map 檔案
```json
"liveSassCompile.settings.generateMap": false,
```

**liveSassCompile.settings.autoprefix**
是否啟用自動對 css 自動前綴，能增加瀏覽器相容程度。預設值為 null 不使用。

```json
"liveSassCompile.settings.autoprefix": [
  "> 1%", //瀏覽器市佔率
  "last 2 versions" //支援最新的版本數
],
```

**liveSassCompile.settings.showOutputWindow**
預設為 true，若不想顯示視窗工作訊息，可調整為 false
```json
"liveSassCompile.settings.showOutputWindow": false,
```

舉例以下參數使用，會生成*.min.css, *.css ,*.map，提供 autoprefix 並排除部分檔案。
```json setting.json
{
  //...
  "liveSassCompile.settings.formats": [
    {
      "format": "expanded",
      "extensionName": ".css",
      "savePath": "/css"
    },
    {
      "format": "compressed",
      "extensionName": ".min.css",
      "savePath": "/style"
    }
  ],
  "liveSassCompile.settings.excludeList": [
    "**/node_modules/**",
    ".vscode/**"
  ],
  "liveSassCompile.settings.generateMap": false,
  "liveSassCompile.settings.autoprefix": [
    "> 1%",
    "last 2 versions"
  ],
  //...
}
```

## Partials 區塊化
在正式介紹 SASS 語法之前，先介紹 Partials 的整理觀念，這是 SASS 最重要的誘因之處。隨著專案的 CSS 龐大複雜而冗長不好維護（想想 Bootstrap.css 2 萬多行的恐怖之處），過往開發設計者為了方便維護，會將 CSS 寫成多筆宣告來載入或使用 css 之 import 語法載入到主樣式表內，但反而會影響網頁加載花費時間（原則上 css 檔案的讀取樹木越少越好）。因此 Sass Partials 的觀念 能適時地將 CSS 分割在不同的 Sass 檔案內，最後經輸出統整回一個樣式表。這樣維護性與時效性都能顧及到，而 Bootstrap Source 包就是這樣設計的。

### 建立使用
想備區塊化的 sass 檔案，需要特殊的命名方式讓 Sass 知道這些不是作為轉換用的單獨 css 檔案，命名方式以`_`開頭，除非你在某 Sass 檔案內呼喚 `@import`他們否則 Sass 會忽略這些檔案。

![Bootstrap 的 partials files](https://i.imgur.com/54feHba.png)

接著需要載入的 sass 內透過`@import`陳述式來宣告。舉例 bootstrap 建立一個`bootstrap.scss`檔案並匯入指定的區塊檔案，事後導出檔案時會自動載入這些區塊內的 css 內容。

```scss bootstrap-reboot.scss
...
// @import "_functions.scss"; //sass 會判斷，因此可省略 _ 與 .scss 編寫
@import "functions";
@import "variables";
@import "mixins";
@import "root";
@import "reboot";
...
```
> Sass 的@import 與 css 的@import 不同，這裡是使進行區塊合併。

>Sass 開發人員會有條理地整理這些檔案，透過子目錄依據功能來分類，最後在最外層編寫主樣式表之 Sass，Bootstrap 的作法就是如此。

# 參考文獻
[-](https://www.geeksforgeeks.org/how-to-import-sass-through-npm/)
[-](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md)