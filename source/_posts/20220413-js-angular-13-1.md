---
title: "[獨自升級] Angular v13.2 框架入門 - 介紹與環境設定"
categories:
  - Misc Notes
  - Angular
tag:
  - Angular v13.2
  - JavaScript
  - TypeScript
date: 2022-04-13 21:18:06
---

![](assets/images/banner/angular.png)

Angular 是由 Google 主導開發的現代化前端框架，採用 TypeScript 作為主要開發語言。本篇教學以 **Angular v13.2** 為範例，將介紹 Angular 的基本概念、環境設定，以及元件化開發的核心觀念，適合初學者入門學習。

<!-- more -->

Angular 通常是指 Angular 2+ 以上的版本（與早期的 Angular 1 版本完全不同，第一代稱為 AngularJS），於 2016 年重新改寫。與 React 相同都採用元件 Component-based 觀念導向設計，不同於 VueJS 的 MVVM 架構，Angular 將所有功能整合在 Component 零件內。

Angular 具有強烈的向後相容性，隨著 TypeScript 市場需求度越來越高，學習 Angular 是很好的選擇。建議直接學習最新版本，避免版本升級帶來的維護問題。

# 開發環境設定

開始學習 Angular 前，需要先建置合適的開發環境。以下介紹幾種不同的環境選擇。

## 線上開發環境

{% note success %}
**跟著做：線上快速開始**
對於初學者，建議先使用線上開發環境 [StackBlitz](https://stackblitz.com/) 進行學習，無需本地安裝就可以直接体驗 Angular 開發。
{% endnote %}

StackBlitz 提供完整的 Angular 範本，支援即時編譯與預覽，非常適合練習和小型專案開發。

## Angular CLI 本地開發環境

Angular CLI 是 Angular 官方提供的命令列工具，可以快速建立專案、產生元件、執行測試和部署應用程式。

{% note primary %}
**系統環境需求：**
- Node.js 14.x 或更高版本
- npm 6.x 或更高版本
- 建議使用最新版本以支援最新 Angular
{% endnote %}

在安裝 Angular CLI 前，建議先更新 npm：

```bash 更新 npm
npm install -g npm
```

安裝 Angular CLI 最新版本：

```bash 安裝 Angular CLI
npm install -g @angular/cli
```

{% note info %}
**小技巧：確認安裝版本**
安裝完成後，可以使用以下指令確認 CLI 版本：
```bash
ng version
```
{% endnote %}

{% note warning %}
**Angular CLI 版本更新**
如果需要更新 Angular CLI 版本，建議先移除舊版本再重新安裝，並注意 Node.js 版本相容性：
```bash
npm uninstall -g angular-cli @angular/cli 
npm cache verify 
npm install -g @angular/cli 
```
{% endnote %}

### 建立 Angular v13.2 專案

使用 Angular CLI 可以快速建立一個完整的 Angular v13.2 專案。過程中會問幾個問題，初學者可以先選擇預設設定。

{% note primary %}
**範例專案名稱：**
這裡以 `myAngularApp` 作為範例專案名稱，你可以改成自己喜歡的名稱。
{% endnote %}

```bash 建立 Angular v13.2 專案
ng new myAngularApp
```

{% note info %}
**關於嚴格模式**
Angular v13.2 預設啟用嚴格模式，提供更好的 TypeScript 類型檢查。如果初學者覺得困難，可以使用 `--no-strict` 參數關閉。

更多資訊：[嚴格模式指南](https://angular.tw/guide/strict-mode)
{% endnote %}

### 啟動開發伺服器

進入專案目錄並啟動開發伺服器：

```bash 啟動開發伺服器
cd myAngularApp
ng serve --open
```

{% note success %}
**成功啟動！**
指令成功執行後，會自動開啟瀏覽器並導向 http://localhost:4200/，你會看到 Angular 的歡迎畫面。

`--open` 參數可以簡寫為 `-o`
{% endnote %}

{% note info %}
**小技巧：自定義埠口**
如果 4200 埠口已被佔用，可以指定其他埠口：
```bash
ng serve --port 4201
```
{% endnote %}

Angular 具備熱重載（Hot Reload）功能，一旦檔案有變動，會自動重新編譯並更新瀏覽器內容。

### 專案打包與部署

當需要將 Angular 應用部署到生產環境時，可以使用以下指令進行打包：

```bash 打包生產版本
ng build
```

{% note info %}
**打包說明**
Angular 會在 `dist/` 目錄中生成最佳化的靜態檔案，適合部署到任何静態網站托管服務。
{% endnote %}

# 專案結構分析

了解專案結構是學習 Angular 的第一步。本節將帶你認識主要檔案和目錄的作用。

{% note success %}
**參考資源：**
Angular 官方提供的[英雄之旅教學](https://angular.tw/tutorial)是很好的入門教學，建議學習完本篇後進一步練習。
{% endnote %}

## 專案目錄結構詳解

了解 Angular 專案的目錄結構將有助於日後的開發工作。主要的開發檔案都放在 `src/` 目錄中。

### 主要入口檔案：index.html

`src/index.html` 是整個 Angular 應用的入口檔案。在 `<body>` 標籤中可以看到 `<app-root></app-root>` 元素，這是 Angular 的根元件，所有其他元件都會在這裡進行渲染。

```html src/index.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyAngularApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>  <!-- Angular 根元件 -->
</body>
</html>
```

### 應用核心目錄：src/app

`src/app/` 目錄包含了 Angular 應用的核心檔案，包含根元件和其他自定義元件。

{% mermaid graph LR %}
    A["根元件<br/>app.component"] --> B["子元件 1<br/>component"]
    A --> C["子元件 2<br/>component"]
    A --> D["子元件 3<br/>component"]
    B --> E["孫元件<br/>component"]
{% endmermaid %}

{% note primary %}
**根元件檔案說明：**
- `app.component.ts` - 元件的主要邏輯，使用 TypeScript 編寫
- `app.component.html` - 元件的模板，定義 HTML 結構
- `app.component.css` - 元件的樣式表，僅對目前元件有效
- `app.component.spec.ts` - 元件的單元測試檔案
- `app.module.ts` - 應用的根模組，定義依賴和配置
{% endnote %}

{% note info %}
**關於測試檔案**
`*.spec.ts` 檔案用於單元測試。初學者可以先忽略，但在真實專案中建議保留以確保程式品質。
{% endnote %}

在 `app.component.ts` 中，可以看到根元件的基本結構：

```typescript app.component.ts
export class AppComponent {
  title = 'myAngularApp';
}
```

{% note info %}
**TypeScript 類別說明**
這個 `AppComponent` 類別是 Angular 元件的主要邏輯，`title` 是一個屬性，可以在模板中使用。
{% endnote %}

### 第一個資料繫定範例

讓我們修改 `app.component.html`，只保留以下內容來看看資料繫定的效果：

```html app.component.html
<h1>{{ title }}</h1>
```

你會在瀏覽器中看到顯示「myAngularApp」，這就是最基本的資料繫定。

### 雙向資料繫定介紹

這就是所謂的**資料繫定**（Data Binding），是 Angular 的核心功能之一。接下來讓我們嘗試更進階的**雙向資料繫定**（Two-way Data Binding）：

```html app.component.html
<input type="text" [(ngModel)]="title">
<h1>{{ title }}</h1>
```

{% note warning %}
**模組導入問題**
直接使用上面的程式碼會出現錯誤，因為 `ngModel` 需要導入 `FormsModule`。
{% endnote %}

錯誤訊息會顯示：
```
Can't bind to 'ngModel' since it isn't a known property of 'input'.
```

這是因為 Angular v13.2 採用模組化設計，`ngModel` 指令包含在 `FormsModule` 中，需要手動導入。

{% note success %}
**解決方法：導入 FormsModule**
在 `app.module.ts` 中導入 `FormsModule`：
{% endnote %}

```typescript app.module.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // 導入 FormsModule
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule  // 在 imports 陣列中添加 FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

{% note info %}
**模組系統說明**
- `import` 語句是 TypeScript 的模組導入語法
- `@NgModule` 裝飾器告訴 Angular 哪些模組和元件可以使用
- Angular 的模組化設計可以有效減少最終打包大小
{% endnote %}

# 學習路徑規劃

完成基本環境設定後，接下來將帶你學習 Angular 的核心概念。以下是建議的學習順序：

{% mermaid graph TD %}
    A["基本知識<br/>元件與資料繫定"] --> B["Angular 指令<br/>ngIf, ngFor, ngClass"]
    B --> C["服務與依賴注入<br/>Services & DI"]
    C --> D["路由系統<br/>Router"]
    D --> E["表單處理<br/>Template & Reactive Forms"]
    E --> F["HTTP 通訊<br/>HttpClient"]
    F --> G["進階主題<br/>RxJS, 優化, 部署"]
{% endmermaid %}

{% note primary %}
**Angular 核心學習主題：**

1. **基本知識** - 元件架構、資料繫定原理
2. **元件開發** - 元件生命週期、元件間通訊
3. **Angular 指令** - 結構指令、屬性指令的使用
4. **服務與依賴注入** - 狀態管理、元件間資料共享
5. **路由系統** - 單頁應用導航、路由守衛
6. **RxJS 觀察者模式** - 非同步資料處理
7. **表單處理** - 範本驅動與反應式表單
8. **管道系統** - 資料轉換與格式化
9. **HTTP 通訊** - RESTful API 整合
10. **身分驗證** - JWT Token 處理
11. **效能優化** - 延遲載入、變更檢測策略
12. **專案部署** - 生產環境打包與發布
{% endnote %}

# 核心概念

Angular 是一個用於建立單頁應用程式（SPA）的框架。它基於元件化架構，所有的功能都圍繞著元件進行組織和開發。

{% note info %}
**單頁應用程式（SPA）概念**
Angular 將整個應用建構在單一 HTML 文件（index.html）之上，透過 JavaScript 動態更新頁面內容，而不需要重新載入整個頁面。
{% endnote %}

## Angular 元件系統
元件是 Angular 的核心建構單位，每個元件都包含了邏輯、模板和樣式。讓我們從根元件開始了解元件的結構。

### 根元件結構分析

Angular 元件由 `@Component` 裝飾器定義，它包含了元件的所有配置資訊。讓我們詳細分析根元件 `app.component.ts`：

```ts app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lokiFirst';
}
```

> 這是根元件由 cli 提供，之後會再介紹如何建立自己的元件。而最外層的`main.ts`是網頁觸發 angular 的第一個腳本

## 第一個 Component
從 CLI 幫我們做的事情已知道會放入一個 app-root 元件到 index.html 上，而我們看到的就是這個元件下想呈現出來的 DOM 畫面。當然你可以改用自己建立的元件來替換或插入到 index.html 內。或多個元件來組合出整個應用 app，由根元件來扮演最上層的元件進行多層嵌套元件來使用。只要知道每個元件都有自己的專屬的 html 與 css，好處在於在複雜的應用 app 內可以重複使用這些相同內容的元件，使得開發的作業上更簡單些。

根元件盡可能保留下來，因為 app.modules.ts 已經都寫好指定一個元件作為根元件，除非你想手動去修改這些 CLI 已寫好的模組內容。

這裡我們嘗試自行添加一個元件並試著讓它顯示於根元件底下

### 建立 Component
想建立一個元件放置於根元件下面，我們會習慣用目錄的方式代表一個元建。你可以手動去建立 folder 與手動產生對應的 ts,html,css 檔案（注意檔名要對應清楚）。或者透過指令`ng n g ...`來建立新的元件。

```shell
 完整指令
ng generate component myserver

 簡化指令
ng g c myserver

 搭配不想產生測試用的*.spec.ts
ng g c myserver --skip-tests
```

{% note info %}
**小技巧：關閉產生 spec.ts 的方式**
如果想直接關閉這個功能，可在單一專案目錄下對 angular.json 添加參數

```json angular.json
{ 
  "projects": {
    "{PROJECT_NAME}": {
      "schematics": {
        "@schematics/angular:component": {
          "skipTests": true
        }
      }
    }
  }
}
```
如果所有的專案則是在外層添加
```json angular.json
{ 
  "schematics": {
    "@schematics/angular:component": {
      "skipTests": true
    }
  }
}
```
或者透過指令完成要求，等價自動幫你做上面那段代碼的事情。
```shell
 所有專案都不要 test 檔案
ng config schematics.@schematics/angular:component.skipTests true
```
{% endnote%}

這裡我們透過指令完成後，會產生對應的目錄以及相關檔案，而觀察 app.module.ts 也發現 ServerComponent 也幫你寫好了（元件都會自動以大寫來表示這是一個元件對象）。觀察 NgModule 提供了四種屬性，分別是 declarations 聲明、imports 導入、providers 提供者、bootstrap 引導程序（這裡不是指 CSS 框架那個）。引導程序這裡，會告知 Angular 會使用哪個元件，也就是一開始 CLI 提供的根元件。近而產生整個 index.html 所需要的內容。所以你應該將各種元件進行嵌套到這個根元件內。因此引導程序這裡不太需要去動到他。而是將新元件被寫在 declarations 聲明處（檔案來源也記得要寫上，就是 import ... from ... 部分，屆時透過打包工具時才能找到這個檔案處做整合）。

```ts
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
imports 導入這裡，通常是載入一些內建的模組，譬如這裡用到了瀏覽器與表單的模組，Angular 會將很多功能打散成模組提供使用，為了效能你需要自行指定需要的模塊來導入使用，未來會在介紹更多有哪些好用的模組。

### 使用 Component
讓我們回到 appComponent 的 html 部分，我們可以學 index.html 那樣將指定的標籤元素插入到這裡的 html 內。現在在 server 元件這裡的 html 已經有一些 html 代碼（你可以改只是測試用），同時從 ts 的檔案知道 CLI 幫我們在選擇器上取名為 app-server。接下來只要在根元件的 html 插入以下代碼就能形成嵌套的元件輸出使用。

```html app.component.html
<input type="text" [(ngModel)]="title">
<h1>{{title}}</h1>
<button class="btn btn-primary">123</button>
<hr>
<app-server></app-server>
```
現在你應該會看到一個 p 段落在畫面上，而這個 p 段落來自於我們稍早建立的 server 元件。

#### 重複使用 Component
Component 可以重複地被使用在另一個元件內，這裡我們再產生一次新的 Component 取名為 servers。同時我們把單筆 server 的標籤元素寫在 servers 的 html 內。

```html servers.component.html
<app-server></app-server>
```

然後再回到根元件的 html 改成吃這個 servers 的元件
```html app.component.html
<input type="text" [(ngModel)]="title">
<h1>{{title}}</h1>
<button class="btn btn-primary">123</button>
<hr>
<app-servers></app-servers>
```
現在你應該會看到三個 p 段落在畫面上，而這個 p 段落來自於我們 servers 元件，而 servers 元件內重複了 server 元件。

#### templateUrl vs template
我們回到 servers 的 ts 來討論，在上面可以看到 templateUrl 代表 template 範本來自於外部連結，透過這個外部文件獲得了我們的 html 代碼。如果你的需求很低是不需要透過該元件的 html 來告知 template 範本的內容，而可以使用 template 以 string 的方式來指定內容。這是觀念上的技巧。

```ts servers.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // templateUrl: './servers.component.html',
  template:`
    <p>hello world</p>
    <app-server></app-server>
  `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}
```

#### styleUrl vs styles
在 app 元件 (app-root) 上我們編寫了 h1 這個元素，若想兌換顏色可以到 app.component.css 編寫`h1{color:blue}`屬性測試看看。同樣原理我們可以改用內部方式來指定但是型別為陣列指定 string。

```ts app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
    h1{
      color:blue;
    }
  `]
})
export class AppComponent {
  title = 'lokiFirst';
}
``` 

> 如果我們把 servers 元件的 template 內的 p 段落換成 h1，你會發現 app 元件的 style 只對 app 元件有效而對 servers 元件無感。之後再討論

#### selector
在@Component 內還有一個屬性為 selector，這裡的寫法其實跟 CSS 選擇器是一樣的，原範例中是這樣`selector: 'app-servers'`（這裡我們討論 TypeScript 語法，所以只討論 string 內容），這裡直接寫一個標籤名稱，則表示在 html 那裏的寫法是以元素來寫`<app-servers></app-servers>`。這我們已經清楚

如果用 CSS 選擇的觀念，我們抽換成`.app-servers`的方式來編寫，這代表這個元件內容要選擇到持有這個 class 名稱的元素上。

```ts servers.component.ts
@Component({
  // ...
  selector: '.app-servers',
  // ...
})
```
回到有使用這個元件的 html 上面在 app 那，我們要修改成有一個 div 他持有這個 class 名稱
```html app.component.html
<input type="text" [(ngModel)]="title">
<h1>{{title}}</h1>
<button class="btn btn-primary">123</button>
<hr>
<!-- 選到這個 DIV2 的 content -->
<div class="app-servers">
  <!-- 這裡會塞入來自 servers 元件內容 -->
</div>
```

相反的我們也可以用元素屬性來找到元素對象，在 css 觀念使用`[attr]`來指定選擇器。

```ts servers.component.ts
@Component({
  // ...
  selector: '[app-servers]',
  // ...
})
```
回到有使用這個元件的 html 上面在 app 那修改成持有這個屬性名稱
```html app.component.html
<input type="text" [(ngModel)]="title">
<h1>{{title}}</h1>
<button class="btn btn-primary">123</button>
<hr>
<!-- 選到這個 DIV2 的 content -->
<div app-servers>
  <!-- 這裡會塞入來自 servers 元件內容 -->
</div>
```

>angular 不支援#id 的方式來指定，或是偽類例如 hover。通常這裡大概就這幾種方法來 selector。但絕大部分來說都只用最單純的元素選擇來操作。

# Data Binding 資料綁定
資料綁定指的是一種通訊觀念，我們的程式邏輯與資料都寫在 TypeScript 裡面，而用戶是透過 template(HTML) 來獲得畫面，事後透過資料綁定進行輸出資料到畫面上。如先前出現的`{{title}}`，就是將我們從伺服器獲取且計算後所得到的 Data 要對用戶進行顯示。而由於一開始用戶只看到 template 以傳統靜態觀念來說已經結束通信了。資料綁定就是透過另一個通信來替換 html 上的內容。

輸出 Data 到用戶的畫面上你可以選擇透過字串插植方式，也就是透過 `{{ }}` 的語法達到。另一種屬性綁定，透過元素的屬性名稱或某表達式達到，例如`[property=data]。

相反的方向，如果想要住戶將 Template 上的 data 傳給 TypeScript，可以透過事件的綁定來執行動作。或者兩種方向的同時雙向通信稱呼為雙向綁定 two-way binding。

## String Interpolation 字串插值
這裡測試一下前面出現過的字串插值方式，值得注意畢竟是插值，因此我們也可以一個固定字串來插入到 template 內。

```ts server.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverId: number = 999;
  serverState: string = "offline";
}
//這裡為了簡化代碼，有刪除掉預設提供的 OnInit 部分，但不影響練習
```
```html server.component.html
<p>{{'Server'}} 's id = {{serverId}} and state = {{serverState}}</p>
```
同前面環境，這個 server 元件被 servers 元件所使用沒有異動，此時檢查畫面上可看到，如我們期望那樣成功插入 TypeScript 的資料到畫面裡面。

```txt
Server 's id = 999 and state = offline
```

或者也可以插值一個 class method 來獲得一個結果，畢竟最終結果都是字串且可行的。

```ts server.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverId: number = 999;
  serverState: string = "offline";

  getServerState() {
    return this.serverState;
  }
}
```
```html server.component.html
<p>{{'Server'}} 's id = {{serverId}} and state = {{getServerState()}}</p>
```

## Property Binding 屬性綁定

前面介紹的字串插植邏輯很簡單，就是想插入一個字串到 template 上面去，而這裡的屬性綁定是根據一個表達式結果決定是否要對元素屬性來做添加與否。舉例來說我們回到 servers 元件，添加一個按鈕平常所鎖住不給按的。但一經過 TypeScript 一段操作後我們會開放這個按鈕可以按，也就是我們需要透過資料通信到 template 來要求某條件成立下移除 disabled 屬性。

```html servers.component.html
<button type="button" disabled>Add Server</button>
<hr>
<app-server></app-server>
```

來到 server 的 ts 部分，先宣告一個屬性為 boolean。同時利用 constructor 建構函式他會當元件 (class) 被建立並初始化時被執行。

```ts servers.component.ts
import { Component } from '@angular/core';

@Component({
  selector: '[app-servers]',
  templateUrl: './servers.component.html',
  // template:`
  //   <h1>hello world</h1>
  //   <app-server></app-server>
  // `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = false;
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }
}
//為了簡化，這裡有先移除 cli 預設給的 onInit 相關代碼
```

接著回到我們的 template， 若要移除 disable 屬性，需想辦法獲得一個屬性寫法為`[disable]=false`。額外的我們把這個結果輸出在下方 p 段落做判斷。
```html servers.component.html
<!-- <button type="button" disabled>Add Server</button> -->
<button
  type="button"
  [disabled]="!allowNewServer"
>Add Server</button>
<p>{{!allowNewServer}}</p>
<hr>
<app-server></app-server>
```

> 隨著屬性操作複雜化，你應該對屬性換行並排版

## 字串插值與屬性綁定
兩個的作法有不同的考量，以字串插值而言過程結果我們會獲得一個字串。如果你做為 innerText 的插入，其實 innerText 也是一個屬性能透過綁定來完成，以下不同寫法同樣結果。

```html servers.component.html
<!-- <p>{{!allowNewServer}}</p> -->
<p [innerText]="!allowNewServer"></p>
```

因此如果你只是想簡單插入一些字串就用字串插值就可以。而指令類型或是元件通常會使用屬性綁定，觀念上你不應該在屬性綁定的等號右側使用`{{}}`來插入字串，而是透過表達式來處理這個屬性結果的值為何。這個例子來說屬性綁定要的是一個 Boolean 值而不是字串。

## Event Binding 事件綁定
接下來我們可以透過一個事件來觸發通信，透過元件的 method 來修改原屬性的值。這裡為了看出效果我們做一個字串插值來呈現資料有取得且變動。同樣使用 servers 元件來增加一個屬性與方法。

```ts servers.component.ts
export class ServersComponent {
  allowNewServer = false;
  serverCreatingState='No Server Create!!';
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }
  onCreateServer(){
    this.serverCreatingState='Now Server Created!!';
  }
}
```

現在只要想辦法讓用戶去觸發這個 onCreateServer() 就能改變屬性資料。在 servers 的 html 部分我們需要指定一個 click 事件，在 Angular 內只需要透過屬性`(click)=*`就能代表一個點擊事件。同時為了方便判斷我們在下方進行字串插值顯示這個資料方便觀察。

```html servers.component.html
<button
  type="button"
  [disabled]="!allowNewServer"
  (click)="onCreateServer()"
>Add Server</button>

<p>{{serverCreatingState}}</p>
```

現在試著點選看看，就能看到用戶能透過 click 來操作 onCreateServer() 並成功去修改到元件的屬性值了。這是一個很簡單的事件綁定示範。

> 上面最後這樣也算是一個雙向綁定（用戶與 TypeScript 能雙向通信）。其實應該說被分為兩個動作一去一回，後續會介紹到透過 ngModal 來成為更快的雙向綁定。

### 透過 Event Object 傳遞與使用
使用事件綁定時，你可以嘗試從用戶那裏將整個觸發當下的事件物件，透過參數來傳遞給 TypeScript 去處理做監聽行為。要使用這個方式使用`$event`保留字變數來傳遞。每次的輸入都能傳遞一些數據給 TypeScript。而參數的強型別先暫時使用 Any 即可（實際上型別為 Event 型別）。

```html servers.component.html
<label>Server Name</label>
<input type="text"
(input)="onUpdateServerName($event)">
<hr>
<!-- ... -->
```
```ts servers.component.ts
export class ServersComponent {
  allowNewServer = false;
  serverCreatingState='No Server Create!!';
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }
  onCreateServer(){
    this.serverCreatingState='Now Server Created!!';
  }
  onUpdateServerName(event:any){
    console.log(event); //可獲得 event 的 Object
  }
}
```

此時試著打一些字在該 input 位置，從 console 能發現每次的 input 動作都能已成功獲得 event 物件，更實用的做法還能從 Target 這位置找到 input 的 value 值。因此我們調整一下代碼同時設定該型別為 Event。

```ts servers.component.ts
export class ServersComponent {
  allowNewServer = false;
  serverCreatingState = 'No Server Create!!';
  serverName = ''; //添加一個初始屬性為空字串
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }
  onCreateServer() {
    this.serverCreatingState = 'Now Server Created!!';
  }
  onUpdateServerName(event: Event) {
    console.log(event.target.value); //報錯，因為 Event 這個型別沒有 event.target 這樣的位置
  }
}
```
TypeScript 沒辦法知道這個型別下的有這樣的 event.target 位置，因此我們要改讓 TypeScript 知道這是一個 HTML 的 input 元素。在 event 前綴增加一個顯式轉換。讓 TypeScript 知道 event 是一個 HTML 的 input 元素會持有這樣的位置。

```ts servers.component.ts
onUpdateServerName(event: Event) {
  console.log((<HTMLInputElement>event.target).value); //將 event.target 轉為一個 HTML Input Element 型別
}
```

現在可以正常抓到這個 input 的 value 了。你可以在用戶上透過字串插值來抓到這個 value。

```html servers.component.html
<label>Server Name</label>
<input
  type="text"
  (input)="onUpdateServerName($event)"
>
<p>{{serverName}}</p>
```
```ts servers.component.ts
onUpdateServerName(event: Event) {
  // console.log((<HTMLInputElement>event.target).value); //報錯，因為 Event 這個型別沒有 event.target 這樣的位置
  this.serverName = (<HTMLInputElement>event.target).value;
```

> 記得在對 form 類型元素進行綁定時，需對`app.module.ts`進行 FormsModule 的 imports，這裡很順利是一開始我們就曾做過這件事。

## two-way Binding 雙向綁定
前面的動作都是輸入與輸出兩個方向來達到綁定。這裡介紹更簡單的雙向綁定，透過 ngModal 來實現。為了實現差異性，保留前例的 input&click 事件與字串插值，這裡創造一個 input 指定屬性為 ngModal 來做綁定（具備雙向功能）。

ngModal 的寫法外層包覆方式，分別代表了屬性綁定`[]`與事件綁定`()`之不同語法。語法組合能夠形成雙向的通信。

```html servers.component.html
<input
  type="text"
  (input)="onUpdateServerName($event)"
>
<input
  type="text"
  [(ngModel)]="serverName"
>
<p>{{serverName}}</p>
```

試著對這兩個 input 交替輸入一些字可以發現一下特性：

- ngModel 不需要透過元件的 Method 來操作屬性值變化，直接就能對元件屬性存取。
- ngModal 可以真正雙向的對一個元素動態呈現目前的資料為何。而 event binding 是單向的，因此若資料異動時 input 本身不會有反應。

## 小節練習
設計一個元件屬性 username 可被綁定做一些用途。
- input 輸入時下方 p 能即時出現輸入的文字 (two-way)
- RESET 按鈕只有當有輸入時可開放使用 (event)
- 按下 RESET 時會清空屬性文字 (Method)

{% iframe https://stackblitz.com/edit/angular-ivy-9kpcib 100% 500 %}

# Directive 指令
將類別標記為 Angular 指令的裝飾器。你可以定義自己的指令，以將自訂行為附加到 DOM 中的元素。元件就是 DOM 的一種指令，當我們將元件的 selector 放在 html 內的某處時，即指示 Angular 添加元件 template 範本內容到我們 selector 地方並由 TypeScript 去進行邏輯處理。

也有沒有 template 的指令，舉例來說 appTurnGreen 是一種可自定義的指令，通常會添加到有屬性的 selector 上。例如：

```html *.component.html
<p appTurnGreen>Receives a green background!</p>
```

指令的可以像元件的 selector 寫法那樣進行配置，或採用 CSS 的選擇器或元素名稱。要使用這個指令就是像這樣編寫 selector

```ts *.component.ts
@Directive({
  selector:'[appTurnGreen]'
})
export class TurnGreenDirective{
  //...
}
```

之後會介紹如何自定義指令，我們先介紹一些常用的內建指令。

## ngIf 判斷
就像 if 語句那樣，我們可以要求某條件下對 DOM 進行指令要求，使用 ngIf 必須前墜添加`*`號這是必需的，因為 ngIf 是一種結構指令，它會改變我們的 DOM 結構。舉例前面的小節練習，我們希望只有當有值才顯示 p，捨棄原本的三元字串做法。

```html app.component.html
<!-- <p>You input value is {{username===''?'null':username}}.</p> -->
<p *ngIf="username!==''">You input value is {{username}}.</p>
```

另一種作法是透過元件屬性 Boolean 來控制這個指令。

```html app.component.html
<label>UserName</label>
<input
  type="text"
  [(ngModel)]="username"
>
<button
  [disabled]="username===''"
  (click)="onReset()"
>RESET</button>
<!-- <p>You input value is {{username===''?'null':username}}.</p> -->
<!-- <p *ngIf="username!==''">You input value is {{username}}.</p> -->
<p *ngIf="username!==''">You input value is {{username}}.</p>
```

```ts app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';
  showText = false;

  onReset() {
    this.showText = true;
    this.username = '';
  }
}
```

### 使用 else 增強 ngIf
ngIf 可以搭配 else 來操作，原本的 if 僅判斷要不要輸出這個 DOM，添加 else 可以要求改換另一組 DOM 來輸出。這裡會用到 ng-template 將我們的自訂 template 範本。注意的是自訂 template 範本需要有名字 (`#`前綴）且指定給 else 知道要用哪個 template 範本。

- else 是寫在 ngIf 裡面的值，也就是雙引號的內容
- ng-template 可以寫在其他行數位置，只要有名稱就能找到
- 

```html app.component.html
<!-- <p *ngIf="username!==''">You input value is {{username}}.</p> -->
<p *ngIf="username!=='';else noMessage">You input value is {{username}}.</p>

<ng-template #noMessage>
  <h5 style="color:red">You never input something there!!</h5>
</ng-template>
```

## ngStyle 樣式
ngStyle 是一種屬性指令，本身就是拿來代表 HTML 屬性的樣式表。因此使用 ngStyle 必需要對指定元素使用屬性綁定`[]`方式來運作。回到一開始的 lokiFirst 專案做練習。為了差異化 server 的 p 段落不同文字結果，我們透過建構函式內的 random 來做隨機產生。

```ts server.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverId: number = 999;
  serverState: string = "offline";

  constructor() {
    this.serverState = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerState() {
    return this.serverState;
  }
}
```

接著將 ngStyle 綁定給我們目標元素對象。這裡先指定一個固定紅色背景。觀看效果

```html server.component.html
<p [ngStyle]="{background: 'red'}">
  {{'Server'}} 's id = {{serverId}} and state = {{getServerState()}}
</p>
```

透過元件的 serverState 屬性值為何，我們可以搭配三元來做不同的輸出結果。

```html server.component.html
<p [ngStyle]="{
  background:serverState==='online'?'green':'red'
}">
  {{'Server'}} 's id = {{serverId}} and state = {{getServerState()}}
</p>
```

或者獨立出一個 method 為 getColor 來負責 return 獲得指定色。

```html server.component.html
<p [ngStyle]="{
  background:getColor()
}">
  {{'Server'}} 's id = {{serverId}} and state = {{getServerState()}}
</p>
```

```ts server.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverId: number = 999;
  serverState: string = "offline";

  constructor() {
    this.serverState = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerState() {
    return this.serverState;
  }
  getColor() {
    return this.serverState === 'online' ? 'green' : 'red'
  }
}
```

## ngClass CSS 類別
如果 ngStyle 等價於控制指令添加 style，那 ngClass 則是代表控制指令添加 class name，透過此指令可進行增加或刪除 class name。首先我們先針對 server 元件建立一個樣式表，為了簡化代碼直接寫在`@Component`的 styles 陣列內。

```ts server.component.ts
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  // styleUrls: ['./server.component.css']
  styles: [`
    .online{
      color:white
    }
  `]
})
```

接著來到版型這裡對 p 元素添加綁定屬性 ngClass，透過元件的 serverState 屬性判定是否添加這個 class 名稱。可發現我們的 online 部分符合條件時，字呈現白色。

```html server.component.html
<p
  [ngStyle]="{background:getColor()}"
  [ngClass]="{online:serverState==='online'}"
>
  {{'Server'}} 's id = {{serverId}} and state = {{getServerState()}}
</p>
```

## ngFor 迴圈
等同於迴圈，我們可以直接透過指令來控制 DOM 執行重複的元素輸出。我們試著將 servers 原本手動靜態三組輸出改成迴圈來作業。首先需要一個初始屬性 serverList 陣列放了這三筆資料名稱，接著到 html 部分使用 `*ngFor` 指令綁定給 app-server 這個元素。因為 ngFor 式結構指令改變了 DOM 所以會有`*`前綴。

```ts servers.component.ts
export class ServersComponent {
  allowNewServer = false;
  serverCreatingState = 'No Server Create!!';
  serverName = '';
  serverList = ['test1', 'test2', 'test3']; //一開始有三組

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }
  onCreateServer() {
    this.serverCreatingState = 'Now Server Created!!';
  }
  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
```
```html servers.component.html
<!-- ... -->
<app-server *ngFor="let item of serverList"></app-server>
```
for/of 的觀念同 JavaScript 一樣使用而目前我們不會拿 item 做些什麼工作。現在你的 server 元件透過元素進行迴圈而產出的。為了可以讓使用者能增加列表，我們把按鈕綁定事件允許添加到 serverList 內，對 onCreateServer() 再調整一下：
```ts servers.component.ts
//...
onCreateServer() {
  this.serverCreatingState = 'Now Server Created!!';
  this.serverList.push(this.serverName);
}
//...
```

## 小節練習
- 建立切換按鈕，使用 event click 來控制一些事情。
- 建立段落來顯示文字為 secret password = tuna，透過 ngIf 來判斷只有在按鈕次數基數當下才會出現
- 每按幾次按鈕會出現幾次帶數字的段落 p，使用 ngFor 來執行。起始數字 1 開始
- 使用 ngStyle，當數字 5 開始的段落 p 會有背景。
- 使用 ngClass，當數字 5 開始的段落 p 會有白字。

{% iframe https://stackblitz.com/edit/angular-ivy-klcrmu 100% 500 %}

### 透過 ngFor 獲得 index 值
利用作業內容繼續討論，ngFor 本身執行來源的是陣列，如果想抽出陣列的 index 值是可以用分號來操作。為了好看我們改顯示文字為時間，而 new Date 是內建 js 物件不需要宣告來源就能使用。

```html app.component.html
<button (click)="onToggleButton()">BUTTON</button>
<p *ngIf="showOn">secret password = tuna</p>
<p
  *ngFor="let item of logs;let i=index"
  [ngStyle]="{background: i>=4?'green':'transparent'}"
  [ngClass]="{addWhite: i>=4}"
>{{item}}</p>
```
```ts app.component.ts
//...
onToggleButton() {
  this.showOn = !this.showOn;
  // this.logs.push(this.logs.length + 1);
  this.logs.push(new Date());
}
```

透過 index 值拿來提供 ngColor 與 ngStyle 進行處理。

# 參考文獻
- [Udemy Angular - The Complete Guide (2022 Edition)](https://www.udemy.com/course/the-complete-guide-to-angular-2/) SESSION 1, 2