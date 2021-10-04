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
Sass 已經將主要更新維護落於 Dart Sass 這個版本，如果你還聽過 libSass 也被官方宣告不再維護了，Dart Sass 是採用 JavaScript 來開發的，編譯時間上稍微慢但也沒啥問題。先從下列方式獲得 Dart Sass 編輯能力。

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

## 區塊檔案 Partials
在正式介紹 SASS 語法之前，先介紹 Partials 的整理觀念，這是 SASS 最重要的誘因之處。隨著專案的 CSS 龐大複雜而冗長不好維護（想想 Bootstrap.css 2 萬多行的恐怖之處），過往開發設計者為了方便維護，會將 CSS 寫成多筆檔案來宣告，之後使用模組方式載入到主樣式表內。Sass Partials 的觀念 能適時地將 CSS 分割在不同的 Sass 檔案內，最後經輸出統整回一個樣式表。這樣維護性與時效性都能顧及到，而 Bootstrap Source 包就是這樣設計的。


### 區塊應用 @import
想備區塊化的 sass 檔案，需要特殊的命名方式讓 Sass 知道這些不是作為轉換用的單獨 css 檔案，命名方式以`_`開頭，除非你在某 Sass 檔案內呼喚他們否則 Sass 會忽略這些檔案。

值得提前知道的事，目前@import未來逐漸會被汰換採用新的模組moudles觀念的@use來運作


模組的載入方式分為新舊語法，你可以選擇透過@import或@use來匯入區塊檔案。早期是使用`@import`舊方式來載入區塊檔案的內容，跟`@user`效果雷同差異在於舊方式會有全域性覆蓋問題且效能不佳即將淘汰。詳情可參閱 [Introducing Sass Modules | CSS-Tricks](https://css-tricks.com/introducing-sass-modules/)。

>目前只有 Dart Sass 有支持`@use`。其他實現的用戶必須改用該@import規則。

![Bootstrap 的 partials files](https://i.imgur.com/54feHba.png)

接著需要載入的 sass 內透過`@import`陳述式來宣告。舉例 bootstrap 建立一個`bootstrap.scss`檔案並匯入指定的區塊檔案，事後導出檔案時會自動載入這些區塊內的 css 內容。

```scss bootstrap-reboot.scss
...
// @import "_functions.scss"; //sass 會判斷，因此可省略 _ 與 .scss 編寫
@import "functions"; // _functions.scss
@import "variables"; // _variables.scss
@import "mixins"; // _mixins.scss
@import "root"; // _root.scss
@import "reboot"; // _reboot.scss
...
```
> Sass 的@import 與 css 的@import 不同，這裡是使進行區塊合併。

Sass 開發人員會有條理地整理這些檔案，透過子目錄依據功能來分類，最後在最外層編寫主樣式表之 Sass，Bootstrap 的作法就是如此。如果區塊檔案在某目錄下之路徑也要寫在@import 上，舉例 Bootstrap 提供四種 css 版本，其中 bootstrap-grid.scss 這檔案寫法長這樣

```scss bootstrap-grid.scss
//...
@import "variables";

@import "mixins/lists"; //mixins 目錄下的 _lists.scss
@import "mixins/breakpoints";
@import "mixins/container";
@import "mixins/grid";
@import "mixins/utilities";
```

Bootstrap 透過目錄來區分要載入哪些項目區塊，如果好奇可發現 Bootstrap 的`@import "mixins"`其實是指向一個窗口檔案，這個檔案負責載入 mixins 目錄下所有項目區塊。

```scss _mixins.scss
//...
// Toggles
//
// Used in conjunction with global variables to enable certain theme features.

// Vendor
@import "vendor/rfs";

// Deprecate
@import "mixins/deprecate";

// Helpers
@import "mixins/breakpoints";
@import "mixins/color-scheme";
@import "mixins/image";
@import "mixins/resize";
@import "mixins/visually-hidden";
//...
```

## 變數
如果熟悉原生 SCC 的變數，這裡也是差不多的做法。差別於 Sass 使用`$`符號代表變數宣告與套入，不像原生 CSS 需要透過 var() 函式才能使用。

```scss _variables.scss
$blue: #0d6efd; // 宣告變數

h1 {
  color: $blue; //使用變數
}
```

良好的整理習慣會單獨一個檔案（通常是取名`_variables.scss`) 來存放整個專案 Sass 的變數。而其他區塊檔案要使用這些變數勢必要優先 import variables 才能被其他區塊檔案所使用否則無法認識。

```scss bootstrap.scss
//..
@import "variables"; //變數集中在這裡
//..
@import "root"; // :root 的全域屬性會用到部分變數
//..
@import "buttons"; btn-color //會用部分變數
//..
```

**多重變數**
變數的常見用法會導向多個步驟來定義，舉例根據網站的先定義常用顏色變數，隨著不同的特定元素綁定此顏色變數形成多重變數。最後將這個特定元素用在其他區塊檔案內導入各種場合內。多重變數這個觀念能確保來源指向同一個變數，使得事後修改更方便。

```scss _variables.scss
// scss-docs-start color-variables
$blue:    #0d6efd !default;
$indigo:  #6610f2 !default;
$purple:  #6f42c1 !default;
$pink:    #d63384 !default;
$red:     #dc3545 !default;
$orange:  #fd7e14 !default;
$yellow:  #ffc107 !default;
$green:   #198754 !default;
$teal:    #20c997 !default;
$cyan:    #0dcaf0 !default;

// scss-docs-start theme-color-variables
$primary:       $blue !default;
$secondary:     $gray-600 !default;
$success:       $green !default;
$info:          $cyan !default;
$warning:       $yellow !default;
$danger:        $red !default;
$light:         $gray-100 !default;
$dark:          $gray-900 !default;
```

> `!default` 為預設值，如果沒有出現同名之變數值（不含 null) 會以此為值。

**適用字串**
變數也會用在 font family 上，在需要的選擇器下帶入變數

```scss _variables.scss
$font-family-sans-serif:      system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
$font-family-monospace:       SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default;
```

**變數運算利用**
變數可以拿來做彈性的設計，透過加減乘除獲得指定一個數據的比例調整。但注意進行加減行為需要相同單位否則無法計算。

```scss
$margin-top:20px;
$margin-bottom:$margin-top / 2; //10px
$margin-left:$margin-top - 5px; //15px
$margin-right:$margin-top  + 5px; //25px

div {
  margin-top: $margin-top;
  margin-bottom: $margin-bottom;
  margin-left: $margin-left;
  margin-right: $margin-right;
}
```

## 選擇器應用

### 巢狀選擇器 Nesting
對多層元素下達多個選擇器時，在原 CSS 需要分多個選擇器來指定。舉例一個父元素與兩個子元素的樣式如下：

```css style.css
.nav {
  /*.nav 屬性*/
}

.nav li {
  /*.nav li 屬性*/
}

.nav a {
  /*.nav a 屬性*/
}
```

在 Sass 可以當作集合的觀念寫在父子之間，Sass 會自動認出從屬關係。

```scss
.nav {
  //.nav 屬性

  li {
    //.nav li 屬性
  }

  a {
    //.nav a 屬性
  }

}
```

> Sass 的註解語法可多使用原生 CSS 沒有的`//`。

### 上層存取
`&`符號代表的是本身自己的選擇器為上層的選擇器，舉例來說以偽類使用 Sass 簡化。

```scss
a {
  color: #f00;

  &:link {  //& 等價 a
    color: #ff0;
  }

  &:visited {
    color: #f0f;
  }

  &:hover {
    color: #00f;
  }

  &:active {
    color: #0ff;
  }
}

/***************** complier css ************
a {
  color: #f00;
}

a:link {
  color: #ff0;
}

a:visited {
  color: #f0f;
}

a:hover {
  color: #00f;
}

a:active {
  color: #0ff;
}
*/
```

另一種是命名 class 的替代。假設 HTML 的結構如下

```html
<!-- .main>.main-title+.main-body -->
<div class="main">
  <div class="main-title"></div>
  <div class="main-body"></div>
</div>
```

Sass 可以這樣利用`&`編寫作為文字（取自父選擇器）替代。

```scss
.main {
  color: #f00;

  &-main {  // &-main 等價  .main-title
    color: #ff0;
  }

  &-body { // &-body 等價 .main-body
    color: #f0f;
  }
}
```

巢狀的複雜程度沒有限制但越少越好約 1~2 層，否則轉譯過程會耗費較多時間且不易掌控。盡可能把相關的放在適合的巢狀內。

```scss
.nav {
  //.nav 屬性

  li {
    //.nav li 屬性
  }

  a {
    //.nav a 屬性
    &:hover{
      //.nav a:hover 屬性
    }
  }

}
```

### 繼承屬性
繼承`@extend`能將某一個選擇器內部的屬性整個繼承過來，類似組合選擇 (ex:h1,h2) 但又賦予個別彈性添加。

```scss
h1 {
  color: #222;
  font-family: 'Raleway', Arial, Helvetica, sans-serif;
}

h2{
  @extend h1;
  margin-top: 20px;
}

h3{
  @extend h1;
  margin-top: 10px;
}
/******** complier css *******
h1, h2, h3 {
  color: #222;
  font-family: 'Raleway', Arial, Helvetica, sans-serif;
}

h2 {
  margin-top: 20px;
}

h3 {
  margin-top: 10px;
}
*******************************/
```

> `@extend` 可放置在行數內任何位置不影響，大多人會放在第一行方便察覺。

不過要注意的繼承效果非常強烈過度。前列範例上指定一個存在的選擇，繼承的對象除了所指定的選擇器 A，其實也會參考其他包含此 A 的選擇器。然而以下會發生不想要 #main h1, #main h2, #main h3 的結果

```scss
#main h1 {
  background: #333;
}

h1 {
  color: #222;
  font-family: 'Raleway', Arial, Helvetica, sans-serif;
}

h2 {
  @extend h1;
  margin-top: 20px;
}

h3 {
  @extend h1;
  margin-top: 10px;
}

/************complier css
#main h1, #main h2, #main h3 {
  background: #333;
}

h1, h2, h3 {
  color: #222;
  font-family: 'Raleway', Arial, Helvetica, sans-serif;
}

h2 {
  margin-top: 20px;
}

h3 {
  margin-top: 10px;
}
**************************/
```

#### 佔位選擇器
因此需要避免繼承過度發展到其他實存選擇器上，Sass 提供了類似別名不存在任何網頁元素的佔位選擇器 Placeholder Selector。透過符號`%`前綴一個選擇器，而這個不屬於任何 HTML 元素所圈選的非真實存在，只是一個假的選擇器。

```scss
#main h1 {
  background: #333;
}

%headStyle {
  color: #222;
  font-family: 'Raleway', Arial, Helvetica, sans-serif;
}

h1 {
  @extend %headStyle;
  margin-top: 30px;
}

h2 {
  @extend %headStyle;
  margin-top: 20px;
}

h3 {
  @extend %headStyle;
  margin-top: 10px;
}

/***************complier css
#main h1 {
  background: #333;
}

h1, h2, h3 {
  color: #222;
  font-family: 'Raleway', Arial, Helvetica, sans-serif;
}

h1 {
  margin-top: 30px;
}

h2 {
  margin-top: 20px;
}

h3 {
  margin-top: 10px;
}
****************************/
```

繼承的應用場合通常發生在一個具有相同數的外觀，再額外的個別差異使用。多看一個例子結束這話題。

```scss
%btn {
  display: inline-block;
  padding: 1rem;
  border-radius: 3px;
  color: white;
}

.btn-danger {
  @extend %btn;
  background: red;
}
.btn-primary {
  @extend %btn;
  background: blue;
}
.btn-info {
  @extend %btn;
  background: cyan;
}
```

## Mixins 混和
類似一種 Funciton 的觀念可重複使用整合混入，建立方式為`@mixin name{}`而使用方式為`@include name`。而良好的習慣上會將所有 mixin 的語法都另存為`_mixins.scss`區塊檔案，並在一開始進行合併提供使用。通常會在 variables 之後因為 mixin 可能會用到變數。

```scss bootstrap-reboot.scss 
@import "functions";
@import "variables";  //好習慣會另外區塊檔案集中管理 mixin
@import "mixins";
@import "root";
@import "reboot";
```

舉例如何建立與使用 mixin：

```scss
///////////////////////// mixins.scss
@mixin myFlex {
  display: -webkit-flex;
  display: flex;
}

//////////////////////// style.scss
@import "mixins";
//...

.container{
  @include myFlex;
}

/***** complier css ******
.container {
  display: -webkit-box;
  display: flex;
}
*************************/
```

> extend 與 mixin 的用途看似類同，但 mixin 用途更廣泛的應用多元場合下。

### 傳遞變數
mixin 可像函式一樣夾帶引數作為參數使用。

```scss
// mixins.scss
@mixin myRotate($deg) {
  -webkit-transform: rotate($deg);
  -ms-transform: rotate($deg);
  transform: rotate($deg);
}

.container {
  @include  myRotate(10deg); //傳遞字串 10deg 給 myRotate
}

/***** complier css ******
.container {
  -webkit-transform: rotate(10deg);
  transform: rotate(10deg);
}
*************************/
```

**插值 interpolation**

然而如果想傳遞數字做為引述並在 mixin 內組合成文字，需使用插值 interpolation 方式來做替換，否則語意上無法預期作業。字串內的插值寫法為`#{name}`：

```scss
// mixins.scss
@mixin myRotate($num) {
  -webkit-transform: rotate(#{$num}deg);
  -ms-transform: rotate(#{$num}deg);
  transform: rotate(#{$num}deg);
}

.container {
  @include myRotate(10);
}

/***** complier css ******
.container {
  -webkit-transform: rotate(10deg);
  transform: rotate(10deg);
}
*************************/
```

**參數預設值**
傳遞變數可以指定預設值，當未獲得參數時會以預設值來使用。原則上參數需全部必填存在，除非若預設值為 null 則忽略並不會回傳該此結果屬性（選填）。而參數順序上若需必填應排列前面，選填（具備預設值或 null) 排列後面才能正常運作。

```scss
@mixin myText($size, $height:null, $weight:normal, $color:null) {
  font-size: $size;
  line-height: $height;
  font-weight: $weight;
  color: $color;
}

p {
  @include myText(10px);
}

/***** complier css ******
p {
  font-size: 10px;
  font-weight: normal;
}
*************************/
```

引數的排序位置因為匿名對應配合參數位置，除非特別在引數上寫參數名來指定名曾。但注意使用此指名引數之後，其餘後列引數不可再恢復匿名。

```scss
@include myText(10px, $color:red); //scuess
@include myText(10px, $color:red, bold); //error
@include myText(10px, $color:red, $weight:bold); //scuess
@include myText(10px, 2rem, $color:red, $weight:bold); //scuess
```

>最後，mixins 就像函式一樣只要特定的參數就能獲得外觀屬性值，因此你可以創造一個第自訂函式來快速得到 CSS 外觀屬性組合。也可從訪間尋找一些免費提供的 mixins library 來快速獲得網站外觀。

### 內容綁定
若在`@mixin`內出現`@content`，則代表這部分的內容屬性來自於呼叫端`@include{}`之外部內容，可藉由此方式更彈性運用

```scss
@mixin myText($size) {
  font-size: $size;
  @content;  //此部分內容將從 include{}來定義替換
}

p {
  @include myText(10px) { // {}作為@content 之內容
    color: red;
    background: gray;
  }
  ;
}

/***** complier css ******
p {
  font-size: 10px;
  color: red;
  background: gray;
}
*************************/
```

## Media Query
編寫媒體查詢時，直接寫在選擇器內進行宣告即可，會自動產生對應該選器的媒體條件。但其缺點他不會整合相同的@media 條件，隨樣式表擴大會產生大量相同的@media 條件，這利弊關係（好管理，不精簡）的支持者分兩派爭議。

```scss
.container {
  width: 100%;
  margin: 0 auto;

  @media (min-width:576px) {
    min-width: 540px;
  }

  @media (min-width:768px) {
    min-width: 720px;
  }

}

.display {
  font-size: 1rem;

  @media (min-width:576px) {
    font-size: 2rem;

  }

  @media (min-width:768px) {
    font-size: 3rem;

  }
}

/*********complier css*****

.container {
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 576px) {
  .container {
    min-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    min-width: 720px;
  }
}

.display {
  font-size: 1rem;
}

@media (min-width: 576px) {
  .display {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  .display {
    font-size: 3rem;
  }
}

**************************/
```

### 設計 RWD 範例
我們可以運用變數與 Mixin 來重新規劃 Media Query 的響應式範例。

1. 將響應的 break point 做成變數放置在`_variables.scss`內，未來調整時也方便。
```scss _variables.scss
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
```
2. 將 media query 定義成 mixin 函式，之後任何選擇器要加入 RWD 機制直接使用該 mixin 進行 include，獲得 break point 的機制。
```scss _mixins.scss
@mixin grid {
  @media (max-width:$sm - 1px) {
    @content;
  }
}

@mixin grid-sm {
  @media (min-width:$sm) and (max-width:$md - 1px) {
    @content;
  }
}

@mixin grid-md {
  @media (min-width:$md) and (max-width:$lg - 1px) {
    @content;
  }
}

@mixin grid-lg {
  @media (min-width:$lg) and (max-width:$xl - 1px) {
    @content;
  }
}

@mixin grid-xl {
  @media (max-width:$xl) {
    @content;
  }
}
```
3. 接著呼喚 mixin 來獲得 media query 條件，條件內的屬性由外部來編寫設計。使得 media query 的規劃從該元素的選擇器來一併整合。
```scss style.scss
@import "variables";
@import "mixins";

.container {
  width: 100%;
  margin: 0 auto;

  @include grid {
    background: lightyellow;
  }

  @include grid-sm {
    background: lightblue;
  }

  @include grid-md {
    background: lightcoral;
  }

  @include grid-lg {
    background: lightgoldenrodyellow;
  }

  @include grid-xl {
    background: lightpink;
  }
}
```
4. 最後輸出結果為：
```scss
.container {
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 575px) {
  .container {
    background: lightyellow;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .container {
    background: lightblue;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .container {
    background: lightcoral;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    background: lightgoldenrodyellow;
  }
}

@media (max-width: 1200px) {
  .container {
    background: lightpink;
  }
}
```

# 參考文獻
[-](https://www.geeksforgeeks.org/how-to-import-sass-through-npm/)
[-](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md)