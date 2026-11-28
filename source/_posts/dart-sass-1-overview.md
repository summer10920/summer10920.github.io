---
title: 'Dart Sass 1.42：CSS 預處理器'
categories:
  - 前端
  - HTML/CSS
tag:
  - Sass
  - CSS
date: 2021-09-27 18:06:58
---
![](assets/images/banner/scss.png)
本篇介紹 Sass 這套預處理器，他能將大型專案上編寫 CSS 不易維護的問題進行改善。使用 Sass 的 Script 語言來進行 CSS 開發，再透過編譯 complier 後轉為瀏覽器可閱讀的 CSS。

<!-- more -->

{% note warning %}
**版本提醒**
本文使用 Dart Sass 1.42（2021 年）。Sass 後來已不建議使用 `@import`（Dart Sass 1.80 起標示為棄用，之後的主要版本會移除），官方改建議使用 `@use` 與 `@forward`；其餘語法與觀念仍然適用。
{% endnote %}

# Sass
Sass 於 2006 年誕生，屬於最成熟且廣為人知的 CSS Preprocessor 預處理器編輯語言（可稱為 SassScript)，起初用於 ruby 程式語言所使用 的 CSS 框架，可相容原生 CSS 語法並以副檔名 `*.sass` 來保存。

## 新舊差異 `*.scss` & `*.sass`
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
早期需要安裝 ruby 才能使用編譯 Compiler（元祖版本），隨著時代推進發展至 Node.js 為主流市場已停止維護（包含 LibSass 版）。改由 Dart Sass 版本來工作。以下方法皆不使用 ruby 方式下進行安裝。但方法其實不只一種，其主要的是需要找到工具能夠協助將 Sass 編譯成 CSS 即可。列出 2 種方式與各自工具：

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

>更多指令請參閱官方網站手冊 https://sass-lang.com/documentation/cli/dart-sass

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

## 區塊化檔案 Partials
在正式介紹 Sass 語法之前，先介紹將檔案設計成區塊的整理觀念。隨著專案的 CSS 龐大複雜而冗長不好維護（想想 Bootstrap.css 2 萬多行的恐怖之處），開發設計者為了方便維護，會將 CSS 寫成多筆區塊檔案來宣告並適時地將 CSS 分割整理在在不同的 Sass 檔案內，之後再使用一些語法並統整出一份樣式表。這樣維護性與時效性都能顧及到，而 Bootstrap Source 包就是這樣設計的。

非樣式表用的區塊檔案，需要特殊的命名方式讓 Sass 知道這些不是作為轉換用的單獨 css 檔案，命名方式以`_`開頭，除非你在某 Sass 檔案內呼喚他們否則 Sass 會忽略這些檔案。
![Bootstrap 的 partials files](https://i.imgur.com/54feHba.png)

> 這些非樣式表的 sass 區塊檔案的應用方式可分為匯入（舊觀念）的`@import`語法，以及模組（新觀念）的`@use`語法。在介紹`@import`之前值得提早知道的是，未來版本的`@import`逐漸會被汰換。取而代之改推薦 Modules `@use`來運作。但目前市面上包含 Bootstrap 這些大廠仍延續使用 import 舊方式來合併區塊，因此還是有學習之必要。Modules 的@use 操作會另外特別仔細介紹。

### 匯入規則 @import
將區塊化檔案進行匯入，需要匯入的 sass 內透過`@import`陳述式來宣告。舉例 bootstrap 設計方式為建立一個`bootstrap-reboot.scss`檔案並匯入指定的區塊檔案完整內容，事後導出檔案時會自動載入這些區塊內的 css 內容。

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

然而 Sass 的`@import` 與 css 的`@import` 不同且不影響判別運作，這裡是指進行區塊合併。

```scss
@import "variables"; // SCSS 區塊合併
@import url('layout.css'); // 原生 CSS 外部載入
```
> 在原生 CSS 規則上的觀念，原生 css 的@import 必須編寫於於任何選擇器之前之頁首處，且不可寫於 Media Query 之內。

Sass 開發人員會有條理地整理這些檔案，透過子目錄依據功能來分類，最後在最外層編寫主樣式表之 Sass，Bootstrap 的作法就是如此。如果區塊檔案在某目錄下之路徑也要寫在`@import` 上，舉例 Bootstrap 提供四種 css 版本，其中 bootstrap-grid.scss 這檔案寫法長這樣

```scss bootstrap-grid.scss
//...
@import "variables";

@import "mixins/lists"; //mixins 目錄下的 _lists.scss
@import "mixins/breakpoints";
@import "mixins/container";
@import "mixins/grid";
@import "mixins/utilities";
```

Bootstrap 透過目錄來區分要載入哪些項目區塊，如果好奇可發現 Bootstrap 的`@import "mixins"`其實是指向一個窗口用的區塊檔案，再從這個區塊檔案載入 mixins 目錄下所有項目區塊檔案。

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

#### 嵌套 Nesting
若在某選擇器下進行@import 某選擇器內容，等同形成選擇器的 Nesting 嵌套效果。

```scss _theme.scss
pre, code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}
```
```scss style.css
.theme-sample {
  @import "theme";
}

/*********complier css*******
.theme-sample pre, .theme-sample code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}
*****************************/
```

## 變數
如果熟悉原生 SCC 的變數，這裡也是差不多的做法。差別於 Sass 使用`$`符號代表變數宣告與套入，不像原生 CSS 需要透過 var() 函式才能使用。變數除了拿來作為屬性內容也能作為布林值其他用途。

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

### 全域變數與區間變數
變數本身如果宣告在最外層為全域性任何地方都能存取，若存在某選擇器{}內則為只有該區間能存取。

```scss
$global-var: "global";

.content {
  $local-var: "local";
  content: $global-var; //global
  content: $local-var; //local
}

.sidebar {
  content: $global-var; //global
  content: $local-var; // Error: Undefined variable.
}
```

若在區間變數與全域變數同名時，會以區間變數為主。

```scss
$let: "global";

.content {
  $let: "local";
  content: $let; //local
}

.sidebar {
  content: $let; //global
}
```

同上，若想從區間內設置全域變數，需告知這個變數為`!global`指的是全域變數不是新創的區間變數。

```scss
$let: "global";

.content {
  $let: "local" !global;
  content: $let; //local
}

.sidebar {
  content: $let; //local
}
```

> !global 只在 Dart Sass 2.0.0 版本出現的功能，其他 Ruby 與 LibSass 版本沒有。

## 屬性
操作屬性上也提供一些規則寫法。

### 前綴同名整合
CSS 屬性常有相同前綴的`name-*`屬性名名稱，可以透過選擇範圍搭配`:`符號來簡化。

```scss
.enlarge {
  font-size: 14px;

  transition: { //透過：綁定提供以下屬性皆為前綴 *- 組合
    property: font-size;
    duration: 4s;
    delay: 2s;
  }

  &:hover {  //等價 .enlarge:hover
    font-size: 36px;
  }
}

/*********complier css*********
.enlarge {
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
}
.enlarge:hover {
  font-size: 36px;
}
******************************/
```

如果加上自身也有值，提供另一種變化寫法

```scss
.info-page {
  margin: auto {
    bottom: 10px;
    top: 2px;
  }
}

/*********complier css ***********
.info-page {
  margin: auto;
  margin-bottom: 10px;
  margin-top: 2px;
}
*********************************/
```

### 隱藏屬性
若屬性指定為 null，此屬性不會被編譯出來

```scss
$boolean: false;

.button {
  border: 1px solid black;
  border-radius: if($boolean, 5px, null); //三元運算子
}

/******complier css*******
.button {
  border: 1px solid black;
}
************************/
```

## 資料型態 Value Types
在 Sass 領域內，任何的資料 types 可以是 number,string,color,lists,maps,boolean,null,function，並可指定給變數或進行判斷使用。本篇不會提供執行範例，只需知道各種數值型態的觀念與可用規則

### 數字 Number
支援原生 CSS 原本的數字型之屬性值，且能進行簡單的數學計算，單位是否存在不影響 Sass 對數字處理的能力。

> 如果希望在終端機呈現數字，可添加`@debug`來檢測輸出

```scss
// 基礎數字
@debug 100; / 100
@debug 0.8;
@debug 16px;
@debug 5px*2px; //10px*px 不適合作為計算結果
@debug 5px*2; //10px

//科學計算 小數點表示法
@debug 5.2e3; // 5200
@debug 6e-2; // 0.06

//精確度：只能到小數點第 11 位並四捨五入回歸第 10 位
@debug 0.012345678912345; // 0.0123456789
@debug 0.01234567891;     // 0.0123456789
@debug 0.01234567895;     // 0.012345679
@debug 1.00000000009;     // 1.0000000001
@debug 0.99999999991;     // 0.9999999999

//單位
@debug 4px * 6px; // 24px*px 
// 若兩個都有數字跟單位進行計算，會分成 數字與數字處理回傳，單位與單位處理回傳

@debug math.div(5px, 2s); // 2.5px/s
@debug 5px * math.div(math.div(30deg, 2s), 24em);  //3.125px*deg/s*em

//math.div() 為內建模組，使用前需先宣告 @use "sass:math"; 才能使用，作用為除數

$degrees-per-second: math.div(20deg, 1s);
@debug $degrees-per-second; // 20deg/s
@debug math.div(1, $degrees-per-second); // 0.05s/deg
```

單位上的計算處理看起來很詭異，但有些場合下可以剛好抵銷使得規劃上容易處理。
```scss
@use "sass:math";

$transition-speed: math.div(1s, 50px); // 0.02s/px

@mixin move($left-start, $left-stop) {
  position: absolute;
  left: $left-start;
  transition: left ($left-stop - $left-start) * $transition-speed;  
  // (120px-10px)*0.02s/px
  // 110px * 0.02s/px
  // 110*0.02 px*s/px
  // 2.2 s

  &:hover {
    left: $left-stop;
  }
}

.slider {
  @include move(10px, 120px);
}

/*********complier css*******
.slider {
  position: absolute;
  left: 10px;
  transition: left 2.2s;
}
.slider:hover {
  left: 120px;
}
***************************/
```

#### 運算元
相關運算元細節總類請參考以下官方說明，不再解釋。

- 運算 - [Sass: Numeric Operators](https://sass-lang.com/documentation/operators/numeric)

### 文字串 String
帶雙引號（例如 font-family) 或不帶雙引號（例如 bold) 的字串型態都能使用。如果需要拔除或添加雙引號可透過內建模組`sass:string`的特殊函式來協助。

```scss
@use "sass:string";

@debug string.unquote(".widget:hover"); // .widget:hover
@debug string.quote(bold); // "bold"
```

```scss
//基本操作
@debug bold; // bold
@debug -webkit-flex; // -webkit-flex
@debug --123; // --123

//插值
$prefix: ms; 
@debug -#{$prefix}-flex; // -ms-flex；

//跳脫字元 
@debug "\""; // "
@debug \.widget; // \.widget
@debug "\a"; // "\a" （代表換行）
@debug "line1\a line2";  //產生兩行如下
// line1
// line2"
@debug "Nat + Liz \1F46D"; // "Nat + Liz 👭"
```

#### 運算元
字串連接的符號為`+`，相關運算元細節總類請參考以下官方說明，不再解釋。

- 字串 - [Sass: String Operators](https://sass-lang.com/documentation/operators/string)

### 顏色 Colors
因為 CSS 的色系定義，Sass 特別規劃了 color 這個型態操作。包含所知道的幾種顏色表示法

```scss
//基本操作
@debug #f2ece4;                   // #f2ece4
@debug #b37399aa;                 // #b37399aa
@debug midnightblue;              // midnightblue
@debug rgb(204, 102, 153);        // #cc6699
@debug rgba(107, 113, 127, 0.8);  // rgba(107, 113, 127, 0.8)
@debug hsl(228, 7%, 86%);         // #dadbdf
@debug hsla(20, 20%, 85%, 0.7);   // rgb(225, 215, 210, 0.7)

// 內建模組 sass:color 不需要宣告就能直接使用
$venus: #998099;
@debug scale-color($venus, $lightness: +15%); // #a893a8 亮度調整
@debug mix($venus, midnightblue); // #594d85 //混和顏色
```

### 列表 Lists
Sass 沒有陣列結構的觀念，因此當多個 value 的型態統稱為 lists，表示方式可以用`,`,` `,`/`來區隔出不同值 (`/`會誤判為除法只有在 list.slash 這個內建模組函式用到），只要在 lists 內能保持一致不要混用符號。lists 也可以用中誇號`[]`來提示這是一個 lists。由於 lists 不是直接拿來做屬性值使用，通常需要搭配函式或場合才有作用。舉幾個例子

```scss
//內建模組 list
@use "sass:list";

//指定找第 N 個位置，首位置為 1，末位置為-1
@debug list.nth(10px 12px 16px, 2); // 12px，第二位置
@debug list.nth([line1, line2, line3], -1); // line3；倒數第一位置

//批次執行
$sizes: 40px, 50px, 80px;

@each $size in $sizes { //循序抽取 lists 內的值
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}

/*******complier css*********
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
**************************/
```

list 不可以對舊索引處的舊值進行修改，但可以再後面新索引位置添加新值，透過內建函式`append()`達到

```scss
//內建函式 `append()` 可以對 lists 讀取出來並在後面添加新值。
$list:10px 12px 16px;
$list:append($list, 25px);
@debug $list; // 10px 12px 16px 25px

@debug append([col1-line1], col1-line2); // [col1-line1, col1-line2]
```

若在 list 內查找某值是否存在，可透過內建模組 sass:list 的`index()`來判斷。index 的用法如下

```scss
// 內建模組 list
@use "sass:list";

//搜尋 list 回傳 index 索引值
@debug list.index(1px solid red, 1px); // 1 ，1px 位於 list 的 index 為 1
@debug list.index(1px solid red, solid); // 2 ，solid 位於 list 的 index 為 2
@debug list.index(1px solid red, dashed); // null，告知無結果
```

搭配一些判斷就能進行檢查與報錯功能。
```scss
$valid-sides: top, bottom, left, right;

@mixin attach($side) {
  @if not list.index($valid-sides, $side) { //not null 等價 not false 等價 true
    @error "#{$side} is not a valid side. Expected one of #{$valid-sides}.";
  }

  // ...
}
```

list 本身可作為其餘參數的原型，舉例提供給 mixin 的參數為 list。

```scss
@use "sass:meta"; //內建模組，可以把

@mixin syntax-colors($args...) {

  @debug meta.keywords($args); //將 args 這個其餘變數整個實際內容帶出來
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)
```

### 映射 Maps
意思是指只能透過某個關鍵字 key 去獲得對應的值 value，類似 JavaScript 內的物件資料。map 的資料通常會編寫在 list 內，使得這個資料形成了物件的映射關聯。使用方式可搭配批次來抽取，key 本身也可以加以利用。例如 each 能循序抽出 key 與 value。

```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $key, $value in $icons {
  .icon-#{$key}:before {
    font-family: "Icon Font";
    content: $value;
  }
}

/********complier css*********
.icon-eye:before {
  font-family: "Icon Font";
  content: "\f112";
}

.icon-start:before {
  font-family: "Icon Font";
  content: "\f12e";
}

.icon-stop:before {
  font-family: "Icon Font";
  content: "\f12f";
}
******************************/
```

可對 map 進行新增修改與讀取，不過記得內建模組的 map 相關函式只是帶結果，因此需要時必須回存到變數內。

```scss
@use "sass:map"; //內建模組
$font-weights: ("regular": 400, "medium": 500, "bold": 700); //list 內有三組具備索引的資料

//讀取
@debug map.get($font-weights, "medium"); // 500，透過內建模組之函式 get 來查找 key 對應的值
@debug map.get($font-weights, "extra-bold"); // null

//新增
$font-weights:map.set($font-weights, "extra-bold", 900); //透過內建模組之函式 get 來添加修改 key 對應的值，並需要複寫回變數
@debug $font-weights; //("regular": 400, "medium": 500, "bold": 700, "extra-bold": 900)

//修改
$font-weights:map.set($font-weights, "bold", 900);
@debug $font-weights; //("regular": 400, "medium": 500, "bold": 900, "extra-bold": 900)
```

合併 map 的作業透過`map.merge()`來達成，如果有重複的 key 會以後出現的第二組而覆蓋。

```scss
@use "sass:map";

$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

//合併
$font-weights: map.merge($light-weights, $heavy-weights);
@debug $font-weights; // ("lightest": 100, "light": 300, "medium": 500, "bold": 700)

//合併衝突時
$weights: ("light": 300, "medium": 500);
@debug map.merge($weights, ("medium": 700)); // ("light": 300, "medium": 700)
```

> 已宣告的 map 內容是不可修改的，因此前列的作法都是重新定義變數而不是修改調整 map。

### 布林值 Booleans
獲得布林值的方式除了直接指定 true 與 false，也能透過比較式或透過內建模組的結果取得布林值，以及複合邏輯、否定式

```scss
@use "sass:math";

@debug 1px == 2px; // false
@debug 1px == 1px; // true
@debug 10px < 3px; // false
@debug math.compatible(100px, 3in); // true，單位相容性檢查 例如 cm 可與 mm 相容

@debug true and true; // true
@debug true and false; // false
@debug true or false; // true
@debug false or false; // false

@debug not true; // false
@debug not false; // true
```

使用時機用於邏輯判斷上等多種場合之下。

```scss
@use "sass:math";

@mixin avatar($size, $circle: false) {
  height: $size;

  //if 判斷式
  @if $circle {
    // border-radius: $size / 2;  //雖然可執行但會警告不適合/符號出現
    border-radius: math.div($size, 2); //應當透過 div 來相除
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}

.circle-av {
  @include avatar(100px, $circle: true);
}

//三元運算
@debug if(true, 10px, 30px); // 10px
@debug if(false, 10px, 30px); // 30px
```

> 判斷時機當下，有值也可以當作 true，若為 null 可當作 false 使用

#### 運算元
相關運算元細節總類請參考以下官方說明，不再解釋。

- 基礎 - [Sass: Operators](https://sass-lang.com/documentation/operators)
- 等價 - [Sass: Equality Operators](https://sass-lang.com/documentation/operators/equality)
- 比較 - [Sass: Relational Operators](https://sass-lang.com/documentation/operators/relational)
- 布林 - [Sass: Boolean Operators](https://sass-lang.com/documentation/operators/boolean)

### 無 null
所有的型態都有 null 的可能，代表缺少這內容。

```scss
@use "sass:map";
@use "sass:string";

@debug string.index("Helvetica Neue", "Roboto"); // null
@debug map.get(("large": 20px), "small"); // null
@debug &; // null
```

若將 null 出現在 list 上則為省略。指定給 css 屬性作為值，會忽略此屬性的輸出。

```scss
$fonts1: ("serif": "Helvetica Neue", "monospace": "Consolas");
h3 {
  font: 18px bold map-get($fonts1, "sans");
}

$fonts2: ("serif": "Helvetica Neue", "monospace": "Consolas");
h4 {
  font: {
    size: 18px;
    weight: bold;
    family: map-get($fonts2, "sans");
  }
}

/******complier css******
h3 {
  font: 18px bold;
}

h4 {
  font-size: 18px;
  font-weight: bold;
}
************************/

```

### 函式 Functions
函式也可以當作一個值，需透過`meta.get-function()`轉換為一個值。若需要對這個函式之值提供參數則需要透過`meta.call($fn, $arg)`才能執行函式與結果。這在函式的進階操作上很有用。

```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

@function demo($lists, $funVar) { //
  $new-list: ();
  $separator: list.separator($lists); //查詢 list 內的分隔符號為何，這裡回傳為 'comma'
  @each $item in $lists { // $item 批次為 Tahoma, "Helvetica Neue", Helvetica, sans-serif; 
    @if not meta.call($funVar, $item) {  //meta.call 能將變數值當作參數提供給函式值 做合併執行。批次出現 null,1,1,null
      $new-list: list.append($new-list, $item, $separator: $separator); //回存到新的 list
    }
  }
  @return $new-list; //回傳
}

//list
$fonts: Tahoma, "Helvetica Neue", Helvetica, sans-serif; 

//selsetor 
.content {
  @function myfn($string) { //告知指定文字 Helvetica 在指定 list 內的 index 值為多少
    @return string.index($string, "Helvetica");
  }
  font-family: demo($fonts, meta.get-function("myfn")); //透過 meta.get-function() 將函式當作值變成一個參數
  //嘗試移除 "Helvetica Neue", Helvetica 作業
}

/********complier css****************
.content {
  font-family: Tahoma, sans-serif;
}
*************************************/
```

## 選擇器規則

### 嵌套 Nesting
俄羅斯娃娃的設計觀念，對多層元素下達選擇器時，在原 CSS 需要分多個選擇器來指定。舉例一個父元素與兩個子元素的樣式如下：

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

在 Sass 可以當作集合的觀念寫在父子之間，Sass 會自動整合來自外部選擇器的關係。

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

> Sass 的註解語法為`//`，若使用`/**/`則為 CSS 註解並會保留轉譯出。

#### 組合列表
嵌套下的內部選擇器若使用`,`多選，會組合出所有選擇器結果。

```scss
.alert, .warning {
  ul, p {
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 0;
  }
}

///////////////// complier CSS ////////////////////
// .alert ul, .alert p, .warning ul, .warning p {
//   margin-right: 0;
//   margin-left: 0;
//   padding-bottom: 0;
// }
```

#### 複合子選擇
操作`>`,`+`,`~`等等複合子選擇時，可以彈性放在選擇範圍之外部、內部、甚至獨立寫都可以。

```scss
SCSS 語法
ul > { //可寫在外部
  li {
    list-style-type: none;
  }
}

h2 {
  + p { //可寫在內部
    border-top: 1px solid gray;
  }
}

p {
  ~ { //獨立一個選擇器
    span {
      opacity: 0.8;
    }
  }
}
```

### 父選擇器 &
`&`符號代表的是本身自己相對應之外層選擇器為代表替換，使得舉例常用於偽類這方面需求設計。

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

也能對`&`符號添加後綴，利用`&`替代文字特性，呈現另一種 class 重複利用的簡寫。

```scss
.main {
  color: #f00;

  &_title {
    color: #ff0;
  }

  &_body {
    color: #f0f;
  }
}

/*******complier css****
.main {
  color: #f00;
}
.main_title {
  color: #ff0;
}
.main_body {
  color: #f0f;
}
***********************/
```

在嵌套內的複雜程度沒有限制但越少越好約 1~2 層，否則轉譯過程會耗費較多時間且不易掌控。盡可能把相關的放在適合的嵌套內。

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

### Media Query 嵌套
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

### 繼承屬性 extend
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
#main h1 {  //跟目標對象 A 有關的其他選擇器
  background: #333;
}

h1 {  //目標對象 A
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

#### 佔位符號 %
Sass 提供了類似別名不存在任何網頁元素的佔位選擇器 Placeholder Selector。透過符號`%`前綴一個選擇器，而這個不屬於任何 HTML 元素所圈選的非真實存在，只是一個假的選擇器。因此需要避免繼承過度發展到其他實際存在的選擇器，透過虛擬的佔位選擇器來做為繼承區分開來。

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

## 混入 Mixins
一種多重繼承的實現並可重複使用，但不是函式。建立方式為`@mixin name{}`而使用方式為`@include name`。而良好的習慣上會將所有 mixin 的語法都另存為`_mixins.scss`區塊檔案，並在一開始進行合併提供使用。通常會在 variables 之後因為 mixin 可能會用到變數。

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

### 傳遞參數
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

#### 插值 interpolation
然而如果想傳遞數字做為引述並在 mixin 內組合成文字，需使用插值 interpolation 方式來做替換，否則語意上無法預期作業。字串內的插值寫法為`#{name}`，插值幾乎可以在 Sass 樣式表的任何地方使用，只需在任何位置插入`#{}`作為使用。

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

插值可以抵替 mixin 內任何位置，包含屬性名、值、甚至也可以頂替 mixin 內的選擇器名

```scss
@mixin demo($name, $fontawesome) {
  .loki::#{$name} {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: $fontawesome;
  }
}

@include demo("before", "\f007");

/***** complier css ******
.loki::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f007";
}
*************************/
```

或作為快速混入一個動畫名稱與內容之範例。

```scss
@mixin addAnimate($duration) {
  $name: loki-#{unique-id()}; //unique-id() 為產生隨機碼的函式

  @keyframes #{$name} {
    @content;
  }

  animation: $name $duration infinite;
}

.pulse {
  @include addAnimate(2s) {
    from {
      background: yellow
    }

    to {
      background: red
    }
  }
}

/**********complier css*******
.pulse {
  animation: loki-uhkd28f 2s infinite;
}
@keyframes loki-uhkd28f {
  from {
    background: yellow;
  }
  to {
    background: red;
  }
}
******************************/
```

#### 參數預設值
傳遞參數可以指定預設值，當未獲得參數時會以預設值來使用。原則上參數需全部必填存在，除非若預設值為 null 則忽略並不會回傳該此結果屬性（選填）。而參數順序上若需必填應排列前面，選填（具備預設值或 null) 排列後面才能正常運作。

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

#### 參數關鍵字
引數的排序位置因為匿名對應配合參數位置，除非特別在引數上寫關鍵字來指定名稱。但注意使用此指名引數之後，其餘後列引數不可再恢復匿名。

```scss
@include myText(10px, $color:red); //scuess
@include myText(10px, $color:red, bold); //error
@include myText(10px, $color:red, $weight:bold); //scuess
@include myText(10px, 2rem, $color:red, $weight:bold); //scuess
```

>最後，mixins 就像函式一樣只要特定的參數就能獲得外觀屬性值，因此你可以創造一個第自訂函式來快速得到 CSS 外觀屬性組合。也可從訪間尋找一些免費提供的 mixins library 來快速獲得網站外觀。

#### 其餘參數
接受任意數量的參數可使用`...` 代表。再搭配一些邏輯規則就能做出批次作業。

```scss
@mixin order($height, $args...) {
  @for $i from 0 to length($args) { // i=0~2
    #{nth($args, $i + 1)} {
      height: $height;
      width: $i * $height;
    }
  }
}

@include order(150px, ".a1", ".a2", ".a3");

/**************complier css************
.a1 {
  height: 150px;
  width: 0px;
}

.a2 {
  height: 150px;
  width: 150px;
}

.a3 {
  height: 150px;
  width: 300px;
}
***************************************/
```

也可以用變數來作為其餘參數內容，透過`,`分開。

```scss
$lokiArgs:".a1", ".a2", ".a3";
@include order(150px, $lokiArgs...);
```

### 內容綁定 @content
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

### Mixin vs Extend
這兩者角色十分貼近能辦到類似的效果。選擇哪種根據以下判斷：

**是否需要傳遞參數**
如果需要透過外層的引數來傳遞參數進行處理獲得結果屬性，也只能 mixin 才能辦到，extend 沒有這樣的功能。

**樣式表生成的大小**
透過 mixin 所產生出來的選擇是獨立的會出現大量重複的選擇器之結構屬性，如果 mixin 呼喚 10 次會產生 10 組選擇器。而呼喚 10 次 extend 只會產生 1 組多選的選擇器。

### 組合應用
這裡提供一些上述介紹過的語法進行應用組合。

#### 調度父容器
即使是 mixin 也能認出`&`來自誰。透過這方式可在 mixin 內加以利用`&`。

```scss
@mixin bgColor($color) {
  #{if(&, '&.bg', '.bg')} { //三元，如果&存在的話
    background-color: $color;
    color: rgba(#fff, 0.75);
  }
}

@include bgColor(#036); //若在這裡&代表 null

.sidebar {
  @include bgColor(#c6538c); // 在這裡&代表 .slider
}

/******complier css***************
.bg {
  background-color: #036;
  color: rgba(255, 255, 255, 0.75);
}

.sidebar.bg {
  background-color: #c6538c;
  color: rgba(255, 255, 255, 0.75);
}
*********************************/
```

#### breakpoint
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

目前為止以足夠讓你開始使用 SCSS 來取代原生 CSS 之開發設計。後面開始會介紹更程式邏輯的功能技巧。

## 模組 Modules
目前只有 Dart Sass 這個版本有提供 Modules 觀念（包含內建模組）。因此像是 VSCode 插件的 vscode-live-sass-compiler 就不支援了。`@use`的使用方式雷同並將取代`@import`並提供更彈性的用法。欲將區塊檔案從模組進行參照變數、mixin、function 時，其規則與條件較為繁瑣些。

### 加載規則 @use
假設區塊檔案長這樣。
```scss _base.scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

與@import 方式相同，當從區塊檔案獲得選擇器，直接`@use`即可。
```scss styles.scss
// styles.scss
@use 'base';

/*******complier css*****
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

***********************/
```

以上做法指限定選擇器可直接引用，然而如果是變數、mixin、function 這類就無法像`@import`這樣直接使用。因為這是原詬病的全域重疊問題，這裡需要透過名字來找到藏於模組下的空間位置。名字預設為檔案名稱，或者可另外由命名空間方式來重新取名。

```scss styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;  //僅取檔案名稱下的變數
  color: white;
}

/*******complier css*****
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
***********************/
```

#### 命名空間
命名空間主要是保護當從區塊檔案獲得的模組為獨一性不與原樣式表下的名稱重疊（全域下之覆蓋問題），因此當進行`@use`規則時給予命名才能獲得找模組內的名稱空間位置。命名空間的作法能套用在變數、mixin、function 且不受重名覆蓋影響。

```scss src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}
```
```scss style.scss
@use "src/corners" as loki; //你必須命名才能以模組名稱來訪問內容

.button {
  @include loki.rounded;  //找到命名下的 mixin
  padding: 5px + loki.$radius;  //這裡變成要從 loki 找到變數
}

/*******complier css*****
.button {
  border-radius: 3px;
  padding: 8px;
}
***********************/
```

如果沒有特別取名，則模組的別名預設為同區塊檔案之檔案名稱。

```scss style.css
@use "corners"; //假若不特別指定別名

.button {
  @include corners.rounded; //則預設為同檔名之名稱
  padding: corners.$radius; //同黨名之模組名稱
}
```

也可以直接命名為`*`就能像＠import 那樣使用，但模組就變成全域下的訪問（需自己注意重名覆蓋問題）。同上修改：

```scss style.scss
@use "src/corners" as *; //不以物件方式保存，以全域空間來加載模組

.button {
  @include rounded;  //全域下的內容
  padding: 5px + $radius;  //全域下的內容
}
```

>早期`@import`舊方式來載入檔案的內容，跟`@user`效果雷同差異在於舊方式會有全域性之覆蓋問題且效能不佳即將淘汰。詳情可參閱 [Introducing Sass Modules | CSS-Tricks](https://css-tricks.com/introducing-sass-modules/)。

#### 禁止訪問 `-`
假設有個項目僅作為該區塊檔案內的使用，並不想被外面的樣式表給模組讀取，可添加`-`前綴使得模組提取過程中所忽略禁止。

```scss _corners.scss
$-radius: 3px;

@mixin rounded {
  border-radius: $-radius;
}
```
```scss style.scss
@use "corners" as loki;

.button {
  @include loki.rounded; // Ok: border-radius: 3px;
  padding: 5px + loki.$radius;  //Error: Undefined variable.
}
```

#### 可配置 with
類似函式的傳遞引數效果，開發人員可從樣式表在進行 use 先提供變數並配置修改給區塊檔案之前置流程，再把模組結果回傳獲得取回。但區塊檔案內這些變數要先存在且需綁定`!default` 設定為默認值才能允許被開發人員重新配置。

```scss _library.scss
$black: #000 !default;  //默認值，如果變數已存在則捨棄此設定
$border-radius: 0.25rem !default; //默認值
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default; //默認值

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```
```scss style.scss
@use 'library' with (  //配置已存在於區塊內之變數給模組
  $black: #222,
  $border-radius: 0.1rem
);

/************complier css***********
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
***********************************/
```

> 變數值後綴寫上`!default`之意，只有在該變數沒有被定義或值 null 時才會被分配給變數。

然而如果只是簡單的配置可以這樣使用`with()`，反之如果高級複雜性的例如傳遞後判斷性則需要用 mixin 比較適合。

```scss _libary.scss
$-black: #000;
$-border-radius: 0.25rem;
$-box-shadow: null;

@mixin configure($b1: null, $b2: null, $b3: null) {
  @if $b1 {
    $-black: $b1 !global;
  }
  @if $b2 {
    $-border-radius: $b2 !global;
  }
  @if $b3 {
    $-box-shadow: $b3 !global;
  }
}

@mixin styles {
  code {
    border-radius: $-border-radius;
    box-shadow: 0 0.5rem 1rem rgba($-black, 0.15);
  }
}
```
```scss style.scss
// style.scss
@use 'library';

@include library.configure(
  $b1: #222,
  $b2: 0.1rem
);

@include library.styles;
/************complier css***********
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
***********************************/
```

### 轉發規則 @forward
與@use 雷同但場合不同，如果 use 模組來源是另一個窗口型中繼站的區塊檔案，該中繼站可使用`@forward`來進行轉往到其他區塊檔案獲取內容。跟舊方式`@import`兩次有同用途之意思（如 bootstrap 的_mixis.scss)。

```scss mixins/_breakpoints.scss
@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}
```
```scss _mixins.scss
@forward "mixins/list"; // mixins/_list.scss
```
```scss bootstrap-reboot.scss
@use "mixins"; // _mixins.scss

.container {
  @include mixins.list-reset; // 模組名稱來自 use 的位置
}
```

#### 命名空間並前綴
透過`@forward`獲得的區塊內容當下可選擇考慮命名至轉發內容，方式為`as name-*`能保留原名稱添加前綴。使得本體樣式表呼喚時根據此新名稱來獲取。

```scss mixins/_breakpoints.scss
@mixin reset {  //原名稱
  margin: 0;
  padding: 0;
  list-style: none;
}
```
```scss _mixins.scss
@forward "mixins/list" as loki-*; // 添加前綴名稱
```
```scss bootstrap-reboot.scss
@use "mixins"; // _mixins.scss

.container {
  @include mixins.loki-reset; // 內容名稱已改
}
```

#### 禁止訪問 hide
部分內容不想被轉發出去，可以在`@forward`當下指定那些內容不被轉發，多個用`,`分開。

```scss _list.scss
$horizontal-list-gap: 2em;  //不想轉發這個

@mixin list-reset { //不想轉發這個
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin list-horizontal {
  @include reset;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: $horizontal-list-gap;
    }
  }
}
```
```scss bootstrap.scss
@forward "list" hide list-reset, $horizontal-list-gap;
```

#### 可配置 with
可設定配置內容作為取代，同樣需指定`!default`參數使得上游樣式表可進行配置，且允許下游樣修改它。

```scss _library.scss
$color: #000 !default;  //覆蓋為 red
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($color, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```
```scss _opinionated.scss
@forward 'library' with (
  $color: blue !default,  //替換為紅色，再配置給 forward
  $border-radius: 0.1rem !default
);
```
```scss style.scss
@use 'opinionated' with ($color: red); //配置 red

/*********complier css**********
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(255, 0, 0, 0.15);
}
*******************************/
```

## 函式 @function
Sass 可透過自訂函式來達到一些複雜動作，與 Mixins 最大不同的是直接寫上 name() 就能得到，但要主動進行`@return`將結果傳回。

```scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent { //4*4*4
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;  //直接使用函式執行
}

/*********complier css*******
.sidebar {
  float: left;
  margin-left: 64px;
}
****************************/
```

### 參數預設值
傳遞參數可以指定預設值，當未獲得參數時會以此預設值來使用。

```scss
@function invert($color, $amount: 100%) {
  $inverse: change-color($color, $hue: hue($color) + 180);  //內建函式 sass:color 。動作為反轉色（透過 hue 反轉 180 度）
  @return mix($inverse, $color, $amount); // 內建函式 sass:color。動作為將兩色混入與比例
一種多重繼承的實現 ary-color: #036;

.header {
  background: invert($primary-color, 80%);
  //complier css =>  background: #523314;
}
.footer {
  background: invert($primary-color);
  //complier css =>  background: #663300;
}
```

### 參數關鍵字
參數的排序位置因為匿名對應配合參數位置，除非特別在引數上寫關鍵字來指定名稱。
```scss
$primary-color: #036;
.banner {
  background-color: $primary-color;
  color: scale-color($primary-color, $lightness: +40%); //內建函式 sass:color。動作為調整亮度
}
```

### 其餘參數
接受任意數量的參數可使用`...` 代表。再搭配一些邏輯規則就能做出批次作業。

```scss
@function sum($arg...) {
  $sum: 0;

  @each $number in $arg { //批次相加
    $sum: $sum + $number;
  }

  @return $sum;
}

.micro {
  width: sum(50px, 30px, 100px);  // complier=> width:180px;
}
```

也可以用變數來作為其餘參數內容，透過`,`分開。

```scss
$widths: 50px, 30px, 100px;
.micro {
  width: min($widths...);
}
```

## 除錯測試
若是 Sass 標準安裝，遇到語法或使用錯誤會將錯誤訊息輸出在編譯後的 css 上。若開發者的編輯階段需要測試相關資訊回傳分以下規劃。

### 錯誤輸出 @error
使用`@error`能將文字輸出在編譯 css 上。一旦`@error`執行時會中斷整個 Sass 工作。舉例在 mixin 與 function 的內部判斷底下，需要檢查參數內容為何

```scss style.scss
@mixin demo($arrow, $value) {
  @if $arrow !=left and $arrow !=right {
    @error "arrow #{$arrow} must be either left or right.";
  }

  $left-value: if($arrow==right, initial, $value);
  $right-value: if($arrow==right, $value, initial);

  left: $left-value;
  right: $right-value;

  [dir=rtl] & {
    left: $right-value;
    right: $left-value;
  }
}

.sidebar {
  @include demo(top, 12px);
}
```
```css complier css
/* Error: "arrow top must be either left or right."
 *    ,
 * 19 |   @include demo(top, 12px);
 *    |   ^^^^^^^^^^^^^^^^^^^^^^^^
 *    '
 *   style.scss 19:3  root stylesheet */
```

### 警告輸出 @warn
同前面用法，差別於 Sass 會繼續執行不會中斷 Sass。

```scss style.scss
@mixin demo($arrow, $value) {
  @if $arrow !=left and $arrow !=right {
    @warn "arrow #{$arrow} must be either left or right.";
  }

  $left-value: if($arrow==right, initial, $value);
  $right-value: if($arrow==right, $value, initial);

  left: $left-value;
  right: $right-value;

  [dir=rtl] & {
    left: $right-value;
    right: $left-value;
  }
}

.sidebar {
  @include demo(top, 12px);
}
```
```css complier css
.sidebar {
  left: 12px;
  right: initial;
}
[dir=rtl] .sidebar {
  left: initial;
  right: 12px;
}

/* Error: "arrow top must be either left or right."
 *    ,
 * 19 |   @include demo(top, 12px);
 *    |   ^^^^^^^^^^^^^^^^^^^^^^^^
 *    '
 *   style.scss 19:3  root stylesheet */

/*# sourceMappingURL=test.css.map */
```

### 除錯 @debug
拿來測試用的輸出，例如是拿來檢查變數內容。輸出情報的地方於終端機上呈現而不是在編譯後的 css 檔案內。

```scss
@mixin demo($arrow, $value) {
  @debug "arrow is #{$arrow}, value is #{$value}";
  
  $left-value: if($arrow==right, initial, $value); //三元運算子之函式
  $right-value: if($arrow==right, $value, initial);

  left: $left-value;
  right: $right-value;

  [dir=rtl] & {
    left: $right-value;
    right: $left-value;
  }
}

.sidebar {
  @include demo(top, 12px);
}
```
```shell cmd
style.scss:2 Debug: arrow is top, value is 12px
Compiled test.scss to test.css.
```

## 邏輯判斷
Sass 提供了邏輯判斷的語法，能設計在 Mixin 與 function 提供良好的演算法則，使得 Sass 更聰明智慧。

### @if
if 的判斷條件為布林值進行處理，進階用法為當變數內容存在等價 true，若 null 等價 false。使用方式為`@if`與`@else`。

```scss
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size / 2;
  }
}

.true {
  @include avatar(100px, $circle: false);
}
.false {
  @include avatar(100px, $circle: null);
}
.val {
  @include avatar(100px, $circle: 10px);
}
.null {
  @include avatar(100px, $circle: null);
}

/********complier css**********
.true {
  width: 100px;
  height: 100px;
}

.false {
  width: 100px;
  height: 100px;
}

.val {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}

.null {
  width: 100px;
  height: 100px;
}
*****************************/
```

#### @else
不成立時若存在 else 則由這部分處理。

```scss
$light-background: #f2ece4;
$light-text: #036;
$dark-background: #6b717f;
$dark-text: #d2e1dd;

@mixin delo($light-theme: true) {
  @if $light-theme {
    background-color: $light-background;
    color: $light-text;
  } @else {
    background-color: $dark-background;
    color: $dark-text;
  }
}

.banner {
  @include delo($light-theme: true);
  body.dark & {
    @include delo($light-theme: false);
  }
}

/********complier css***********
.banner {
  background-color: #f2ece4;
  color: #036;
}
body.dark .banner {
  background-color: #6b717f;
  color: #d2e1dd;
}
*********************************/
```

#### @else if
前一個`@if`不成立時，因 else 因素進入此判斷式同時在給予 if 的判斷。此外 if 除了直接提供布林值也可以透過比較式來得到布林值。

```scss
@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: $size / 2;

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}

/************complier css*******
.next {
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 2.5px;
  border-left-color: black;
}
*******************************/
```

#### 三元運算子 if(,,)
由內建函式來提供，透過三個傳遞參數來回傳。

```scss
@mixin delo($light-theme: true) {
  $light-text: white;
  $dark-text: black;
  color: if($light-theme, $light-text, $dark-text);
}

.banner {
  @include delo($light-theme: true);

  body.dark & {
    @include delo($light-theme: false);
  }
}

/**********complier css********
.banner {
  color: white;
}
body.dark .banner {
  color: black;
}

******************************/
```

### @each
Sass 沒有陣列觀念但有列表（多筆以`,`分隔）觀念，可透過`@each`來對列表做循序同樣的內容工作。使用 each 需提供批次下替代變數與來源變數。語法為`@each <variable> in <expression>`。

```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}

/*******complier css********
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
***************************/
```

#### 映射 with maps
遇到列表變數的資料型態為`("key": "value", ...)`進行抽取（類似 json 但沒有此觀念），多一個變數於 each 語法內。

```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");  //資料型列表 的 變數

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    font-family: "Icon Font";
    content: $glyph;
  }
}

/*********complier css***********
.icon-eye:before {
  font-family: "Icon Font";
  content: "\f112";
}

.icon-start:before {
  font-family: "Icon Font";
  content: "\f12e";
}

.icon-stop:before {
  font-family: "Icon Font";
  content: "\f12f";
}
*********************************/
```

#### 解構 destructuring
遇到列表變數的資料型態為`("value" "value" "value", ...)`，使用對應的變數數量來抽取。

```scss
$icons:
  "eye" "\f112" 12px,
  "start" "\f12e" 16px,
  "stop" "\f12f" 10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}

/*********complier css*******
.icon-eye:before {
  font-family: "Icon Font";
  content: "\f112";
  font-size: 12px;
}

.icon-start:before {
  font-family: "Icon Font";
  content: "\f12e";
  font-size: 16px;
}

.icon-stop:before {
  font-family: "Icon Font";
  content: "\f12f";
  font-size: 10px;
}

*************************/
```

### @for
for 的語法非常簡易，只需指定一個變數並告知兩個整數（最小值與最大值），每次變化為+1 次。

```scss
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%); //內建函式，動作調整亮度
  }
}

/**********complier css******
ul:nth-child(3n+1) {
  background-color: #004080;
}

ul:nth-child(3n+2) {
  background-color: #004d99;
}

ul:nth-child(3n+3) {
  background-color: #0059b3;
}

****************************/
```

### @while
迴圈 while 的結構只有布林值判斷，除非獲得 false 否則會再進行重複迴圈。

```scss
@function scale-below($value, $base, $ratio: 1.5) {
  @while $value>$base {
    $value: $value - $ratio;
  }

  @return $value;
}

sup {
  font-size: scale-below(200px, 16px);
}

/***********complier css**********
sup {
  font-size: 15.5px;
}
**********************************/
```

## 內建模組
Sass 提供了一些已設計好的內建模組提供使用，提供更高階便利的進階技巧使用。各個內建模組具備多種 function 或 mixin 作為應用，每次使用這些內建模組與載入區塊檔案作為模組方式相同`@use 'name'`。只差別於 name 都為`sass:*`為前綴代表為 Sass 提供模組。另外還有一些 function 已存在於全域空間上不需透過呼喚內建模組來宣告，可直接使用。

### 全域函式
這些都是 Sass 基本提供的便利函式，直接就能使用

#### hsl() 與 rgb()
原已存在的 CSS 原生函式`hsl()`，由 hue 色調（單位 deg:0~360)、saturation 飽和度、lightness 明亮度來組成顏色（可配 alpha 透明度）。以及 CSS 函生函式`rgb()` 由三原色來代表。

而 Sass 也特意撞名提供`hsl()`與`rgb()`之 Sass 內建函式，目的為協助轉為 16 進位（無透明色）或 rgba（有透明度）的色碼。

```scss
// 原生 CSS 規則 HSL 寫法組合
hsl($hue $saturation $lightness)
hsl($hue $saturation $lightness / $alpha: % or floor<1)
hsl($hue, $saturation, $lightness, $alpha: floor<1)

hsla($hue $saturation $lightness)
hsla($hue $saturation $lightness / $alpha: % or floor<1)
hsla($hue, $saturation, $lightness, $alpha: 1) //=> color 

// 原生 CSS 規則 RGB 寫法組合
rgb($red $green $blue)
rgb($red $green $blue / $alpha: % or floor<1)
rgb($red, $green, $blue, $alpha: 1)
rgb($color, $alpha)
rgba($red $green $blue)
rgba($red $green $blue / $alpha: % or floor<1)
rgba($red, $green, $blue, $alpha: 1)
rgba($color, $alpha) //=> color 
```

當由 Sass 編譯時會自動對 hsl 或 rgb 轉換動作，除非遇到`var()`這種原生變數套用才會保留不做異動。

```scss
$color1: hsl(210deg 100% 20%);
$color2: hsl(210deg 100% 20% / 0.5);
$color3: hsl(34, 35%, 92%);
$color4: hsl(210deg 100% 20% / 50%);
$color5: hsla(34, 35%, 92%, 0.2);

$color6: rgb(0 51 102); // #036
$color7: rgb(95%, 92.5%, 89.5%); // #f2ece4
$color8: rgb(0 51 102 / 50%); // rgba(0, 51, 102, 0.5)
$color9: rgba(95%, 92.5%, 89.5%, 0.2); // rgba(242, 236, 228, 0.2)

.color {
  color: $color1; //#003366;
  color: $color2; //rgba(0, 51, 102, 0.5);
  color: $color3; //#f2ece3;
  color: $color4; //rgba(0, 51, 102, 0.5);
  color: $color5; //rgba(242, 236, 227, 0.2);

  color: $color6; //#003366;
  color: $color7; //#f2ece4;
  color: $color8; //rgba(0, 51, 102, 0.5);
  color: $color9; //rgba(242, 236, 228, 0.2);
}

/**********complier css***************
.color {
  color: #003366;
  color: rgba(0, 51, 102, 0.5);
  color: #f2ece3;
  color: rgba(0, 51, 102, 0.5);
  color: rgba(242, 236, 227, 0.2);
  color: #003366;
  color: #f2ece4;
  color: rgba(0, 51, 102, 0.5);
  color: rgba(242, 236, 228, 0.2);
}
**************************************/

.var {
  --opacity: 0.5;
  color: hsl(210deg 100% 20% / var(--opacity));

  --color:red;
  background: rgba(var(--color), 0.2);
}

/*************complier css************
.var {
  --opacity: 0.5;
  --color:red;
  color: hsl(210deg 100% 20%/var(--opacity));
  background: rgba(var(--color), 0.2);
}
**************************************/
```

#### if()
作為三元運算子的函式使用。語法為`if($condition, $if-true, $if-false) `。

```scss
@debug if(true, 10px, 15px); // 10px
@debug if(false, 10px, 15px); // 15px

$var:null;
@debug if(variable-defined($var), $var, null); // null
```

> 內建函式`variable-defined()`可檢查變數是否被定義

### sass:color
內建模組 color 提供多元調整顏色的函式可供使用，注意部份的函式有提供全域函式的版本（免宣告@use 直接可使用）。

#### 指定色之調整

##### color.adjust
函式結構如下，可將指定色`$color`調整 RGB 三色 (-255~255)、色調 H、飽和 S、L 明亮、透明 A 之增減。

```scss
@use 'sass:color';
color.adjust(
  $color,
  $red: null, $green: null, $blue: null,
  $hue: null, $saturation: null, $lightness: null,
  $whiteness: null, $blackness: null,
  $alpha: null
)

//全域函式
adjust-color(...) //=> color 
```

使用方式舉例如下，需先宣告內建模組之定義才可使用。
```scss
@use 'sass:color';
@debug color.adjust(rgb(100 100 100), $red: 15); // #736464 == rgb(115 100 100)
@debug color.adjust(#ff7700, $red: -10, $blue: 10); // #f5770a == rgb(255-10, 119, 0+10)
@debug color.adjust(#998099, $lightness: -30%, $alpha: -0.4); // hsl(300deg 11% 55%) => hsl(300deg 11% 25% / 60%)
```

另有提供全域函式的版本`adjust-color()`，用法跟`color.adjust()`相同只差在不需宣告模組即可直接使用。
```scss
//免宣告模組也能使用，等價上面結果
@debug adjust-color(rgb(100 100 100), $red: 15);
@debug adjust-color(#ff7700, $red: -10, $blue: 10);
@debug adjust-color(#998099, $lightness: -30%, $alpha: -0.4);
```

其中由於常用性質部分，有單獨提供全域的內建函式：

**調整色調 Hue**
語法為`adjust-hue($color, $degrees)`單位為 deg 但也可省略不寫。
```scss
// #6b717f(Hue 222deg) becomes #796b7f(282deg)
@debug adjust-hue(#6b717f, 60deg);

// #d2e1dd(Hue 164deg) becomes #d6e1d2(104deg)
@debug adjust-hue(#d2e1dd, -60deg);

// #036(Hue 210deg) becomes #1a0066(255deg)
@debug adjust-hue(#036, 45);
```
>等價對應內建模組函式 `color.adjust($hue)`。

**調深明度 darken**
語法為`darken($color, $amount)`單位為 0% ~ 100% 。只能調低亮度不能反向。
```scss
@debug darken(#f00, 30%); // #600
```
>等價對應內建模組函式 `color.adjust($color, $lightness: -$amount)`。

**調高明度 lighten**
語法為`lighten($color, $amount)`單位為 0% ~ 100% 。只能調高亮度不能反向。
```scss
@debug lighten(#f00, 30%); // #f99
```
>等價對應內建模組函式 `color.adjust($color, $lightness: $amount)`。

**調低飽和度 desaturate**
語法為`desaturate($color, $amount)`單位為 0% ~ 100% 。只能單向調低飽和度不能反向。
```scss
// Saturation 35% becomes 85%.
@debug desaturate(#f2ece4, 50%); // #ebebeb
```
>等價對應內建模組函式 `color.adjust($color, $saturation: -$amount).`。

**調高不透明比例 opacify**
語法為`opacify($color, $amount)`或`fade-in($color, $amount)`其單位為 0 ~ 1 浮點數 。只能調高不透明度不能反向。
```scss
@debug opacify(#ff000099, 0.1); // rgba(255, 0, 0, 0.7)
```
>等價對應內建模組函式 `adjust($color, $alpha: $amount)`。

**調低不透明比例 transparentize**
語法為`transparentize($color, $amount)`或`fade-out($color, $amount`其單位為 0 ~ 1 浮點數 。只能調低不透明度不能反向。
```scss
@debug transparentize(#ff000099, 0.1); //  rgba(255, 0, 0, 0.5)
```
>等價對應內建模組函式 `adjust($color, $alpha: -$amount)`。

##### color.change
函式結構如下，與 adjust 不同的是直接指定單位覆蓋過去而不是加減多少。可將指定色`$color`調整 RGB 三色 (-255~255)、色調 H、飽和 S、L 明亮、透明 A 之修改。

```scss
@use 'sass:color';
color.change(
  $color,
  $red: null, $green: null, $blue: null,
  $hue: null, $saturation: null, $lightness: null,
  $whiteness: null, $blackness: null,
  $alpha: null
)

//全域函式
change-color(...) //=> color 
```

使用方式舉例如下，需先宣告內建模組之定義才可使用。

```scss
@use 'sass:color';

@debug color.change(#6b717f, $red: 100); // #64717f
@debug color.change(#d2e1dd, $red: 100, $blue: 50); // #64e132
@debug color.change(#998099, $lightness: 30%, $alpha: 0.5); // rgba(85, 68, 85, 0.5)
```

##### color.scale
函式結構如下，與 adjust 雷同而差別是調整單位參位為-100% ~ 100%調整，0%代表無變化。隨調整移動距離越遠變化值就越大。

```scss
@use 'sass:color';
color.scale(
  $color,
  $red: null, $green: null, $blue: null,
  $saturation: null, $lightness: null,
  $whiteness: null, $blackness: null,
  $alpha: null
);

//全域變數
scale-color(...) //=> color 
```

舉例方式如下，雙向正負參數之幅度越大變化越多。

```scss
@use 'sass:color';
$color:#00ff00;

@debug color.scale($color, $red: 15%); // ##26ff00
@debug color.scale($color, $lightness: -10%, $saturation: 10%); // #00e600
@debug color.scale($color, $alpha: -40%); // rgba(0, 255, 0, 0.6)
```

#### 指定色之獲取
如需取得顏色中的組成 (RGB 三色、色調、飽和、明亮、透明）單位值，提供以下方法

**透明度 alpha**
獲得該顏色的透明度值，另有提供 2 種全域函式。
```scss
@use 'sass:color';
color.alpha($color);

//全域函式
alpha($color);
opacity($color);
```

**RGB**
```scss
@use 'sass:color';
@debug color.red($color); //用於獲取$color 的紅色值。
@debug color.green($color); //用於獲取$color 的綠色值。
@debug color.blue($color); //用於獲取$color 的藍色值。

//全域函式
@debug red($color);
@debug green($color);
@debug blue($color);
```

**色調、飽和度、亮度、暗度、互補色、灰階色、反差色**
```scss
@use 'sass:color';
@debug color.hue($color); //用於獲取$color 的色調。
@debug color.saturation($color); //獲得$color 的飽和度。
@debug color.lightness($color); //獲得$color 的亮度。
@debug color.blackness($color); //獲得$color 的暗度。
@debug color.complement($color); //獲得$color 的互補色，等價色相+180deg
@debug color.grayscale($color); //獲得$color 的具有相同亮度的灰色，等價語法 color.change($color, $saturation: 0%)
@debug color.invert($color, $weight: 100%); // 獲得$color 的反差色 weight 的比例單位：0% 等價本色，%50 等價灰色，100% 等價互補色（色相+180deg)
@debug color.whiteness($color); //獲得 HWB 格式下的白度值。

//全域函式
@debug hue($color);
@debug saturation($color);
@debug lightness($color);
@debug blackness($color);
@debug complement($color);
@debug grayscale($color);
@debug invert($color);
// color.whiteness 不存在等價的全域函式
```

#### 其他應用

##### hwb 色碼
hwb 是特殊的色碼公式（色調、亮度、暗度）但不備大眾瀏覽器通用（僅 Safari 瀏覽器支援），詳情規則說明請查看 [W3school - Colors HWB](https://www.w3schools.com/colors/colors_hwb.asp) 說明。Sass 有提供了 hwb 的色碼函式輸入轉為標準色碼公式。透過內建模組`color.hwb()`使用。

```scss
@use 'sass:color';
color.hwb($hue $whiteness $blackness);
color.hwb($hue $whiteness $blackness / $alpha);
color.hwb($hue, $whiteness, $blackness, $alpha: 1);
```

##### mix 混色
語法為`color.mix($color1, $color2, $weight: 50%)`，能將兩個顏色混和，其中分配比例 100% 貼近`$color1`，0%貼近`$color2`。

```scss
@use 'sass:color';

$color1:#ff0000;
$color2:#0000ff;

@debug color.mix($color1, $color2, $weight: 50%);  // #800080

// 全域函式
@debug mix($color1, $color2, $weight: 100%); // #ff0000 
```

### sass:list
內建模組 list 能對 list type 的對象提供多種函式功能，同時如果是 map type 也能適用內建模組 list，畢竟 map 也算 list 的一種。不過還是提醒注意，已宣告的 list 是不可改的，函式的結果是將新的結果回傳給你，看是另外覆蓋原變數或其他打算。

#### append 插入至底
將資料合併至尾端做新增。語法為`list.append($list, $val, $separator: auto)`。範例如下：
```scss
@use 'sass:list';
@debug list.append(10px 20px, 30px); // 10px 20px 30px
@debug list.append((blue, red), green); // blue, red, green
@debug list.append(10px 20px, 30px 40px); // 10px 20px (30px 40px)
@debug list.append(10px, 20px, $separator: comma); // 10px, 20px
@debug list.append((blue, red), green, $separator: space); // blue red green
```
>另提供全域函式寫法為`append($list, $val, $separator: auto)`。（不需使用內建模組）

#### index 查詢索引值
將查詢資料內目標 value 之索引值為多少，最小為 1，不存在為 null。語法為`list.index($list, $value)`。範例如下：
```scss
@use 'sass:list';
@debug list.index(1px solid red, 1px); // 1
@debug list.index(1px solid red, solid); // 2
@debug list.index(1px solid red, dashed); // null
```
>另提供全域函式寫法為`index($list, $value)`

#### is-bracketed 判斷 [] 存在
將查詢資料之結構是否`[]`存在。語法為`list.is-bracketed($list)`。範例如下：
```scss
@use 'sass:list';
@debug list.is-bracketed(1px 2px 3px); // false
@debug list.is-bracketed([1px, 2px, 3px]); // true
```
>另提供全域函式寫法為`is-bracketed($list)`

#### jonn 合併
將多個資料進行合併，並可決定分隔符號 (comma、space、slash)，預設為 auto 與來源相同。以及是否 [] 之存在。語法為`list.join($list1, $list2, $separator: auto, $bracketed: auto)`。範例如下：
```scss
@use 'sass:list';
@debug list.join(10px 20px, 30px 40px); // 10px 20px 30px 40px
@debug list.join((blue, red), (#abc, #def)); // blue, red, #abc, #def
@debug list.join(10px, 20px); // 10px 20px
@debug list.join(10px, 20px, $separator: comma); // 10px, 20px
@debug list.join((blue, red), (#abc, #def), $separator: space); // blue red #abc #def
@debug list.join([10px], 20px); // [10px 20px]
@debug list.join(10px, 20px, $bracketed: true); // [10px 20px]
```
>`另提供全域函式寫法`為`join($list1, $list2, $separator: auto, $bracketed: auto)`

#### length 長度
計算資料長度。語法為`list.length($list)`。範例如下：
```scss
@use 'sass:list';
@debug list.length(10px); // 1
@debug list.length(10px 20px 30px); // 3
@debug list.length((width: 10px, height: 20px)); // 2
```
>另提供全域函式寫法為`length($list)`

#### separator 查詢分隔符
檢查資料使用何種分隔符號（回傳 comma、space、slash)。語法為`list.separator($list)`。範例如下：
```scss
@use 'sass:list';
@debug list.separator(1px 2px 3px); // space
@debug list.separator(1px, 2px, 3px); // comma
@debug list.separator('Helvetica'); // space
@debug list.separator(()); // space
```
>另提供全域函式寫法為`list-separator($list)`

#### nth 指定位置
查詢資料內指定位置之 value，指定位置初始為 1，負數從末端開始最小為-1。語法為`list.nth($list, $n)`。範例如下：
```scss
@use 'sass:list';
@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3
```
>另提供全域函式寫法為`nth($list, $n)`

#### set-nth 指定修改
查詢資料內指定位置之 value 並修改，指定位置初始為 1，負數從末端開始最小為-1。語法為`list.set-nth($list, $n, $value)`。範例如下：
```scss
@use 'sass:list';
@debug list.set-nth(10px 20px 30px, 1, 2em); // 2em 20px 30px
@debug list.set-nth(10px 20px 30px, -1, 8em); // 10px, 20px, 8em
@debug list.set-nth((Helvetica, Arial, sans-serif), 3, Roboto); // Helvetica, Arial, Roboto
```
>另提供全域函式寫法為`set-nth($list, $n, $value)`

#### list.slash 改為分隔線符號
將資料內分隔符號替換為 slash，但由於目前舊語法的`/`仍被當作除法。因此尚未開放此功能。語法為`list.slash($elements...)`。範例如下：
```scss
@use 'sass:list';
@debug list.slash(1px, 50px, 100px); // 10px / 50px / 100px
```

#### zip 壓縮合併
將多筆資料合併壓縮成類似二維 list 格式，數量匹配需一致才能合併。語法為`list.zip($lists...)`。範例如下：
```scss
@use 'sass:list';
@debug list.zip(10px 50px 100px, short mid long); // 10px short, 50px mid, 100px long
@debug list.zip(10px 50px 100px, short mid); // 10px short, 50px mid
```
>另提供全域函式寫法為`zip($lists...)`

### sass:map
映射格式的 list，每筆內容具備了 key 與 value。而 map 型態可以採用多維方式記錄更深層的資料結構。善用內建模組有效去操作 map 進行合併與讀取等複雜行為

#### get 獲取值
從 map 透過關鍵字 key 獲得 value，支援多維 map 的查找。語法為`map.get($map, $key, $keys...)`。

```scss
@use 'sass:map';
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

//一維
@debug map.get($font-weights, "medium"); // 500
@debug map.get($font-weights, "extra-bold"); // null

$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

//多維
@debug map.get($fonts, "Helvetica", "weights", "regular"); // 400
@debug map.get($fonts, "Helvetica", "colors"); // null
```
>另提供全域函式寫法為`map-get($map, $key, $keys...)`

#### set 修改值
從 map 透過關鍵字 key 找到 value 並修改，可透過多組 key（不含最後一組參數 key) 對多維 map 的 value 修改。語法為`map.set($map, $keys..., $key, $value)`。

```scss
@use 'sass:map';
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

//一維
@debug map.set($font-weights, "regular", 300);
// ("regular": 300, "medium": 500, "bold": 700)

$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

// 二維
@debug map.set($fonts, "Helvetica", "weights", "regular", 300);
// (
//   "Helvetica": (
//     "weights": (
//       "regular": 300,
//       "medium": 500,
//       "bold": 700
//     )
//   )
// )
```

#### keys 列出全關鍵字
可對一維 map 要求印出所有 key 內容以 list 方式回傳。語法為`map.keys($map)`。

```scss
@use 'sass:map';
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.keys($font-weights); // "regular", "medium", "bold"
```
>另提供全域函式寫法為`map-keys($map)`

#### values 列出全值
可對一維 map 要求印出所有 value 內容以 list 方式回傳。語法為`map.values($map)`。

```scss
@use 'sass:map';
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.values($font-weights); // 400, 500, 700
```
>另提供全域函式寫法為`map-values($map)`

#### has-key 確認存在
確認指定關鍵字是否存在於 map 內回傳布林值，支援多維 map 的查找。語法為`map.has-key($map, $key, $keys...)`。

```scss
@use 'sass:map';
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

//一維
@debug map.has-key($font-weights, "regular"); // true
@debug map.has-key($font-weights, "bolder"); // false

$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

//多維
@debug map.has-key($fonts, "Helvetica", "weights", "regular"); // true
@debug map.has-key($fonts, "Helvetica", "colors"); // false
```
>另提供全域函式寫法為`map-has-key($map, $key, $keys...)`

#### merge 合併
可對兩個 map 進行合併，若第一組參數 map 為多維 map 且提供關鍵 key，能指定該 map 哪層維度為出發處進行合併。語法為`map.merge($map1, $keys..., $map2)`。

```scss
@use 'sass:map';

$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

// 2 個一維進行合併
@debug map.merge($light-weights, $heavy-weights);
// ("lightest": 100, "light": 300, "medium": 500, "bold": 700)

$fonts: (
  "Helvetica": (
    "weights": (
      "lightest": 100,
      "light": 300
    )
  )
);
$heavy-weights: ("medium": 500, "bold": 700);

//指定多維之定位出發點進行合併
@debug map.merge($fonts, "Helvetica", "weights", $heavy-weights);
// (
//   "Helvetica": (
//     "weights": (
//       "lightest": 100,
//       "light": 300,
//       "medium": 500,
//       "bold": 700
//     )
//   )
// )
```
>另提供全域函式寫法為`map-merge($map1, $keys..., $map2)`

#### deep-merge 深度合併
與 merge 相同，差別是可以深度進行合併。每個維度 map 的都會進行合併。語法為 `map.deep-merge($map1, $map2)`。

```scss
@use 'sass:map';
$helvetica-light: (
  "weights": (
    "lightest": 100,
    "light": 300
  )
);
$helvetica-heavy: (
  "weights": (
    "medium": 500,
    "bold": 700
  )
);

@debug map.deep-merge($helvetica-light, $helvetica-heavy);
// (
//   "weights": (
//     "lightest": 100,
//     "light": 300,
//     "medium": 500,
//     "bold": 700
//   )
// )
@debug map.merge($helvetica-light, $helvetica-heavy);
// (
//   "weights": (
//     "medium: 500,
//     "bold": 700
//   )
// )
```

#### remove 移除
可指定一維 map 下的尋找 key 進行移除，一次可移除多組 key。語法為 `map.remove($map, $keys...)`。

```scss
@use 'sass:map';
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.remove($font-weights, "regular"); // ("medium": 500, "bold": 700)
@debug map.remove($font-weights, "regular", "bold"); // ("medium": 500)
@debug map.remove($font-weights, "bolder");
```
>另提供全域函式寫法為`map-remove($map, $keys...)`

#### deep-remove 深度移除
可指定多維 map 下的尋找 key 進行移除，需透過 keys（不含最後一組參數 key) 一步步映射到指定位置才行，一次只能移除一組 key。語法為 `map.deep-remove($map, $key, $keys...)`。

```scss
@use 'sass:map';

$font-weights: ("regular": 400, "medium": 500, "bold": 700);

// 一維
@debug map.deep-remove($font-weights, "regular"); 
// ("medium": 500, "bold": 700)

$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

// 多維
@debug map.deep-remove($fonts, "Helvetica", "weights", "regular");
// (
//   "Helvetica": (
//     "weights: (
//       "medium": 500,
//       "bold": 700
//     )
//   )
// )
```

### sass:math
提供大量數學相關功能函式使用。

#### 數學單位
以下為常用的數學函式使用。
```scss
@use 'sass:math';

//常數 e 的值
@debug math.$e; // 2.7182818285

//常數 π 的值
@debug math.$pi; // 3.1415926536

/***********************************************************/
//無條件進位
@debug math.ceil(4); // 4
@debug math.ceil(4.2); // 5
@debug math.ceil(4.9); // 5
// 另提供全域函式，語法為 ceil($number)

//無條件捨去
@debug math.floor(4); // 4
@debug math.floor(4.2); // 4
@debug math.floor(4.9); // 4
// 另提供全域函式，語法為 floor($number)

//四捨五入
@debug math.round(4); // 4
@debug math.round(4.2); // 4
@debug math.round(4.9); // 5
// 另提供全域函式，語法為 round($number)

/***********************************************************/

//取最大值
@debug math.max(1px, 4px); // 4px
$widths: 50px, 30px, 100px;
@debug math.max($widths...); // 100px
// 另提供全域函式，語法為 max($number...)

//取最小值
@debug math.min(1px, 4px); // 1px
$widths: 50px, 30px, 100px;
@debug math.min($widths...); // 30px
// 另提供全域函式，語法為 min($number...)

//極限修正：能將數字侷限到 min~max 並回傳。語法為 math.clamp($min, $number, $max)
@debug math.clamp(-1, 0, 1); // 0
@debug math.clamp(1px, -1px, 10px); // 1px
@debug math.clamp(-1in, 1cm, 10mm); // 10mm

/***********************************************************/

//絕對值：返回正數
@debug math.abs(10px); // 10px
@debug math.abs(-10px); // 10px
// 另提供全域函式，語法為 abs($number)

//單位相容性：例如 cm 是否可與 mm 相容
@debug math.compatible(2px, 1px); // true
@debug math.compatible(100px, 3em); // false
@debug math.compatible(10cm, 3mm); // true
// 另提供全域函式，語法為 comparable($number1, $number2)

//檢查單位為無
@debug math.is-unitless(100); // true
@debug math.is-unitless(100px); // false
// 另提供全域函式，語法為 unitless($number)

//獲取單位
@debug math.unit(100); // ""
@debug math.unit(100px); // "px"
@debug math.unit(5px * 10px); // "px*px"
@debug math.unit(math.div(5px, 1s)); // "px/s"
// 另提供全域函式，語法為 unit($number)

//除法：數字與單位都會進行移除相抵
@debug math.div(1, 2); // 0.5
@debug math.div(100px, 5px); // 20
@debug math.div(100px, 5); // 20px
@debug math.div(100px, 5s); // 20px/s

//轉換百分比：等價　$number * 100%
@debug math.percentage(0.2); // 20%
@debug math.percentage(math.div(100px, 50px)); // 200%
// 另提供全域函式，語法為 percentage($number)

//隨機數：介於 0 和 1 之間的隨機十進制數，若存在 limit 則提供 1 和 limit 之間的隨機整數
@debug math.random(); // 0.2821251858
@debug math.random(); // 0.6221325814
@debug math.random(10); // 4
@debug math.random(10000); // 5373
// 另提供全域函式，語法為 random($limit: null)
```

#### 數學公式
因低使用性，僅列表說明不範例說明（請自行查看 [官方文件](https://sass-lang.com/documentation/modules/math))。

| 語法                             | 功能                                  |
| -------------------------------- | ------------------------------------- |
| `math.hypot($number...)`         | 三角斜邊值 (求 a² + b² + c² 的平方根) |
| `math.log($number, $base: null)` | 對數                                  |
| `math.pow($base, $exponent)`     | 幂值                                  |
| `math.sqrt($number)`             | 平方根                                |
| `math.cos($number)`              | 三角函式 cos 值                       |
| `math.sin($number)`              | 三角函式 sin 值                       |
| `math.tan($number)`              | 三角函式 tan 值                       |
| `math.acos($number)`             | 三角函式 acos 值                      |
| `math.asin($number)`             | 三角函式 asin 值                      |
| `math.atan($number)`             | 三角函式 atan 值                      |
| `math.atan2($number)`            | 三角函式 atan2 值                     |

### sass:meta
做為 meta 元件的高深函式提供使用。

#### load-css
跟`@use/@mixin`機制差不多且提供 with 可配置，不需要@use 就能獲得區塊檔案。語法為`meta.load-css($url, $with: null)`

```scss dark-theme/_code.scss
$border-contrast: false !default;

code {
  background-color: #6b717f;
  color: #d2e1dd;
  @if $border-contrast {
    border-color: #dadbdf;
  }
}
```
```scss style.scss
@use "sass:meta";

body.dark {
  @include meta.load-css("dark-theme/code",
      $with: ("border-contrast": true));
}

/**********complier css********
body.dark code {
  background-color: #6b717f;
  color: #d2e1dd;
  border-color: #dadbdf;
}
*******************************/
```
> 與@use 載入模組的差別在於：@use 載入同對象之區塊檔案只能出現一次；meta.load-css() 沒有限制因此可以重複出現在代碼中。



#### calc-args 與 calc-name
回傳計算型的函式之參數或名稱。

```scss
@use 'sass:meta';

@debug meta.calc-args(calc(100px + 10%)); // ("100px + 10%")
@debug meta.calc-args(clamp(50px, var(--width), 1000px)); // 50px, var(--width), 1000px

@debug meta.calc-name(calc(100px + 10%)); // "calc"
@debug meta.calc-name(clamp(50px, var(--width), 1000px)); // "clamp"
```

#### call
由於 function 一旦轉為變數就無法執行它，故可透過 call 將此變數呼喚回 function 模式並執行它，也可以提供該 functionn 所需之參數。語法為 `meta.call($function, $args...)`。

```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

@function remove-where($list, $condition) {  //這裡的 $condition 為 function 型態的變數
  $new-list: ();
  $separator: list.separator($list);
  @each $element in $list {
    @if not meta.call($condition, $element) { //因為 $condition 為 function type，需要透過 call 來執行該 function
      $new-list: list.append($new-list, $element, $separator: $separator);
    }
  }
  @return $new-list;
}

$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;

content {
  @function contains-helvetica($string) {
    @return string.index($string, "Helvetica");
  }
  font-family: remove-where($fonts, meta.get-function("contains-helvetica")); //透過 meta.get-function() 將函式當作值變成一個參數
}
```
>另提供全域函式，語法為 `call($function, $args...)`


#### get-function
將函式結構轉為一個 function type 之變數。若存在 module 參數則會自動命名為該`@use`規則的命名方式。

```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

@function remove-where($list, $condition) {  //這裡的 $condition 為 function 型態的變數
  $new-list: ();
  $separator: list.separator($list);
  @each $element in $list {
    @if not meta.call($condition, $element) { //因為 $condition 為 function type，需要透過 call 來執行該 function
      $new-list: list.append($new-list, $element, $separator: $separator);
    }
  }
  @return $new-list;
}

$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;

content {
  @function contains-helvetica($string) {
    @return string.index($string, "Helvetica");
  }
  font-family: remove-where($fonts, meta.get-function("contains-helvetica")); //透過 meta.get-function() 將函式當作值變成一個參數
}
```
>另提供全域函式，語法為 `get-function($name, $css: false, $module: null)`

#### inspect
轉換為 string

```scss
@use "sass:meta";

@debug meta.inspect(10px 20px 30px); // 10px 20px 30px
@debug meta.inspect(("width": 200px)); // ("width": 200px)
@debug meta.inspect(null); // null
@debug meta.inspect("Helvetica"); // "Helvetica"
```
>另提供全域函式，語法為 `ginspect($value)`

#### keywords
能將持有變數的參數 list，轉化為字串的 keyword。

```scss
@use "sass:meta";

@mixin syntax-colors($args...) {
  @debug meta.keywords($args);
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $variable: #60b,
)

/************complier css**********
pre span.stx-string {
  color: #080;
}

pre span.stx-variable {
  color: #60b;
}
**********************************/
```
>另提供全域函式，語法為 `keywords($args)`

#### type-of($value)
檢查變數類型。

```scss
@debug meta.type-of(10px); // number
@debug meta.type-of(10px 20px 30px); // list
@debug meta.type-of(()); // list
```
>另提供全域函式，語法為 `type-of($value)`

#### 檢查性
檢查指定對象獲得結果之布林值。有以下歸類：

##### variable-exists
檢查目前領域下是否存在該變數

```scss
@debug meta.variable-exists("var1"); // false

$var1: value;
@debug meta.variable-exists("var1"); // true

h1 {
  // $var2 is local.
  $var2: value;
  @debug meta.variable-exists("var2"); // true
}
```
>另提供全域函式，語法為 `variable-exists($name)`

##### global-variable-exists
檢查指定名稱是否存在於全域變數。

```scss
@use "sass:meta";

@debug meta.global-variable-exists("var1"); // false

$var1: value;
@debug meta.global-variable-exists("var1"); // true

h1 {
  // $var2 is local.
  $var2: value;
  @debug meta.global-variable-exists("var2"); // false
}
```
>另提供全域函式，語法為 `global-variable-exists($name, $module: null)`

##### content-exists
寫在 mixin 內部使用，檢查該 mixin 是否存在之獲得來自外部的`@content`。

```scss
@use "sass:meta";

@mixin debug-content-exists {
  @debug meta.content-exists();
  @content;
}

@include debug-content-exists; // false
@include debug-content-exists { // true
  // Content!
}
```
>另提供全域函式，語法為 `content-exists()`

##### feature-exists
檢查 Sass 目前環境開放那些功能。檢查項目為以下內容為字串檢查：

- global-variable-shadowing: 
同名之區間變數存在時是否會隱匿全域變數。
- extend-selector-pseudoclass: 
`@extent`規則將影響嵌套內的偽類選擇器 (ex:not())。
- units-level3: 
支援 CSS3 原生變數。
- at-error: 
支援`@error`功能。
- custom-property: 
- 自訂屬性不支持任何表達式，除了使用在插值上。

```scss
@use "sass:meta";

@debug meta.feature-exists("at-error"); // true
@debug meta.feature-exists("unrecognized"); // false
```

##### mixin-exists
檢查指定 mixin 是否存在。

```scss
@use "sass:meta";

@debug meta.mixin-exists("shadow-none"); // false

@mixin shadow-none {
  box-shadow: none;
}

@debug meta.mixin-exists("shadow-none"); // true
```
>另提供全域函式，語法為 `mixin-exists($name, $module: null)`

##### function-exists
檢查函式是否存在或在指定模組內存在。語法為 `meta.function-exists($name, $module: null)`。

```scss
@use "sass:math";

@debug meta.function-exists("div", "math"); // true
@debug meta.function-exists("scale-color"); // true
@debug meta.function-exists("add"); // false

@function add($num1, $num2) {
  @return $num1 + $num2;
}
@debug meta.function-exists("add"); // true
```
>另提供全域函式，語法為 `function-exists($name)`

#### 模組抽取
對模組（區塊檔案）進行萃取回傳map。有以下歸類：

##### module-variables
返回指定模組內的變數名稱與變數值，並以 map 方式回傳。語法為`meta.module-variables($module)`。

```scss _variables.scss
$hopbush: #c69;
$midnight-blue: #036;
$wafer: #e1d7d2;
```

```scss style.scss
@use "sass:meta";
@use "variables";

@debug meta.module-variables("variables");
// (
//   "hopbush": #c69,
//   "midnight-blue": #036,
//   "wafer": #e1d7d2
// )
```

##### module-functions
返回指定模組內的函式名稱與變數值 (function type)，並以 map 方式回傳。語法為`meta.module-functions($module)`。

```scss _functions.scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}
```
```scss style.scss
@use "sass:map";
@use "sass:meta";
@use "functions";

@debug meta.module-functions("functions"); // ("pow": get-function("pow"))
@debug meta.call(map.get(meta.module-functions("functions"), "pow"), 3, 4); // 16
```

### sass:selector
選擇器之相關名稱字串的函式庫。

#### is-superselector
檢查兩者字串名稱(順訊為祖先與子孫)在選擇器規則上是否為超集合(子孫層級)。語法為`selector.is-superselector($super, $sub)`。
```scss
@use "sass:selector";

@debug selector.is-superselector("a", "a.disabled"); // true
@debug selector.is-superselector("a.disabled", "a"); // false
@debug selector.is-superselector("a", "sidebar a"); // true
@debug selector.is-superselector("sidebar a", "a"); // false
@debug selector.is-superselector("a", "a"); // true
```
>另提供全域函式，語法為 `is-superselector($super, $sub)`

#### append
將選擇器名稱插入後綴，可允許輸入list格式將形成獨立組合排列。語法為`selector.append($selectors...)`。

```scss
@use "sass:selector";

@debug selector.append("a", ".disabled"); // a.disabled
@debug selector.append(".accordion", "__copy"); // .accordion__copy
@debug selector.append(".accordion", "__copy, __image");
```
>另提供全域函式，語法為 `selector-append($selectors...)`

#### extend
等同`@extend`邏輯，將指定選擇器名稱的名稱A替換成名稱B。但會提供list包含原選擇器值與新選擇值。語法為`selector.extend($selector, $extendee, $extender)`。

```scss
@use "sass:selector";

@debug selector.extend("a.disabled", "a", ".link"); // a.disabled, .link.disabled
@debug selector.extend("a.disabled", "h1", "h2"); // a.disabled
@debug selector.extend(".guide .info", ".info", ".content nav.sidebar"); // .guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar
```
>另提供全域函式，語法為 `selector-extend($selector, $extendee, $extender)`

#### nest
多個選擇器進行合併嵌套，若遇到list會組合出各自list。語法為`selector.nest($selectors...)`。

```scss
@use "sass:selector";

@debug selector.nest("ul", "li"); // ul li
@debug selector.nest(".alert, .warning", "p"); // .alert p, .warning p
@debug selector.nest(".alert", "&:hover"); // .alert:hover
@debug selector.nest(".accordion", "&__copy"); // .accordion__copy
```
>另提供全域函式，語法為 `selector-nest($selectors...)`

#### parse
解析選擇器的值為何。語法為`selector.parse($selector)`。

```scss
@use "sass:selector";

@debug selector.parse(".main aside:hover, .sidebar p"); //.main aside:hover, .sidebar p
```
>另提供全域函式，語法為 `selector-parse($selector)`

#### replace
將指定選擇器名稱的名稱A替換成名稱B。語法為`selector.replace($selector, $original, $replacement)`。

```scss
@use "sass:selector";

@debug selector.replace("a.disabled", "a", ".link"); // .link.disabled
@debug selector.replace("a.disabled", "h1", "h2"); // a.disabled
@debug selector.replace(".guide .info", ".info", ".content nav.sidebar");
// .guide .content nav.sidebar, .content .guide nav.sidebar
```
>另提供全域函式，語法為 `selector-replace($selector, $original, $replacement)`

#### unify
回傳這兩個選擇器都能匹配的選擇器描述方式，無理則為null。語法為`selector.unify($selector1, $selector2)`。

```scss
@use "sass:selector";

@debug selector.unify("a", ".disabled"); // a.disabled
@debug selector.unify("a.disabled", "a.outgoing"); // a.disabled.outgoing
@debug selector.unify("a", "h1"); // null
@debug selector.unify(".warning a", "main a"); // .warning main a, main .warning a
```
>另提供全域函式，語法為 `selector-unify($selector1, $selector2)`

#### simple-selectors
簡化選擇器描述將定義範圍放大，也就是重組改成空白符號。語法為`selector.simple-selectors($selector)`。

```scss
@use "sass:selector";

@debug selector.simple-selectors("a.disabled"); // a, .disabled
@debug selector.simple-selectors("main.blog:after"); // main, .blog, :after
```
>另提供全域函式，語法為 `simple-selectors($selector)`

### sass:string
文字串的內建模組函式庫。容易解讀不分章節解釋。

```scss
@use "sass:string";

// 添加引號
@debug string.quote(Helvetica); // "Helvetica"
@debug string.quote("Helvetica"); // "Helvetica"
// 另提供全域函式，語法為 quote($string)

// 移除引號
@debug string.unquote("Helvetica"); // Helvetica
@debug string.unquote(".widget:hover"); // .widget:hover
// 另提供全域函式，語法為 unquote($string)

/**************************************************************/

// 索引：指定字串在原字串內的索引值，最小值為1
@debug string.index("Helvetica Neue", "Helvetica"); // 1
@debug string.index("Helvetica Neue", "Neue"); // 11
// 另提供全域函式，語法為 str-index($string, $substring)

// 插入：指定字串在原字串內的索引值進行插入
@debug string.insert("Roboto Bold", " Mono", 7); // "Roboto Mono Bold"
@debug string.insert("Roboto Bold", " Mono", -6); // "Roboto Mono Bold"
// 另提供全域函式，語法為 str-insert($string, $insert, $index)

// 長度：字串長度
@debug string.length("Helvetica Neue"); // 14
@debug string.length(bold); // 4
@debug string.length(""); // 0
// 另提供全域函式，語法為 str-length($string)

// 擷取：指定起始索引處之字段切片，可指定結束索引處。
@debug string.slice("Helvetica Neue", 11); // "Neue"
@debug string.slice("Helvetica Neue", 1, 3); // "Hel"
@debug string.slice("Helvetica Neue", 1, -6); // "Helvetica"
// 另提供全域函式，語法為 str-slice($string, $start-at, $end-at: -1)

/**************************************************************/

// 大寫
@debug string.to-upper-case("Bold"); // "BOLD"
@debug string.to-upper-case(sans-serif); // SANS-SERIF
// 另提供全域函式，語法為 to-upper-case($string)

// 小寫
@debug string.to-lower-case("Bold"); // "bold"
@debug string.to-lower-case(SANS-SERIF); // sans-serif
// 另提供全域函式，語法為 to-lower-case($string)

// 隨機：不帶引號
@debug string.unique-id(); // uabtrnzug
@debug string.unique-id(); // u6w1b1def
// 另提供全域函式，語法為 unique-id()
```

# 參考文獻
- [Sass: Syntactically Awesome Style Sheets](https://sass-lang.com/)
- [How to import SASS through npm ? - GeeksforGeeks](https://www.geeksforgeeks.org/how-to-import-sass-through-npm/)
- [vscode-live-sass-compiler/settings.md](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md)

