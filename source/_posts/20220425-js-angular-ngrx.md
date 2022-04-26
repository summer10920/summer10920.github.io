---
title: '[學習之路] JS 前端框架 Angular - NgRx'
categories:
  - Zero Road
  - Web Fronted
tag:
  - Angular
  - JavaScript
date: 2022-04-25 20:08:50
hidden: true
---

![](https://i.imgur.com/q0DRxPm.png)

NgRx 是一個強大，且功能完整的 Angular 狀態管理套件，在我們的應用程式越來越複雜的時候，它很適合用來管理一些資料狀態，並透過適度的抽象化以及加入一定的規範，降低整體程式的耦合性，打造出更好維護及管理的程式碼。

<!-- more -->

# 觀念
過去我們跟後端進行存取資料會利用 service 去獲取，而元件會儲存資料到 service 內，這樣的整個資料流範圍就是一種前端的資料狀態，再利用 service 本身再跟後端進行 CRUD。因此每個小元件都會依賴自己的 service 或是別人的 service 去存取後端資料，這樣的 state 會隨著架構越大你的整個網站的資料狀態就會越複雜而難以維護。原因包含：

- state 會在整個 app 任何地方被進行更新。
- state 本身是隨時可變化的，舉例你只有幾處想更改他，但會影響你需要覆蓋整個 state 為新的。
- 隨 httpRequest 事件而影響 state。

雖然這些資料流問題可使用更加明確的路線與可用方法來解決但會更於複雜。因此依賴 NgRx 可不強迫影響這些執行結果。NgRx 是 Angular 另外一塊模組，能幫助我們大型開發應用上更有效率的妥善管理整個 Application state 應用狀態的方式。

NgRx 本身是參考 React 框架的 Redux 而延伸來的。是一種額外的 state 管理應用 library。他的理念是透過大型集中 store 儲存你的 app，所有的元件與服務都能彼此交換資料但都需要從 store 來存取 state。它提供了一個 `@ngrx/store` 提供了一個「乘載狀態的容器」，幫助我們存放所有前面提到的全域狀態，並提供一致的方法來進行存取，也就是我們限制了存取的「位置」和「方式」藉此來達到一定程度的控管。

![](https://i.imgur.com/3Gr4nsy.png)

圖中的 Component 與 Service 是 Angular 內的單元，其他 NgRx 的角色有：

- Store：用來存放所有 State 的地方
- Selector：從 Store 取得實際上想要的資料
- Action：定義會改變 Store 的行為，但不實際改變 Store 內容
- Reducer：實際上改變 Store 內容的程式
- Effects：本身不在 `@ngrx/store` 套件內，而是被單獨到 `@ngrx/effects` 套件；用來管理 Side Effect 的行為

針對 State 的處理就會變成：
- 當 Component 要取得 State 資料是，並不是直接從 Store 拿資料，而是透過寫好的 Selector 拿資料
- 當 Component 要改變 State 資料時，並不是直接修改 Store，而是分配（Dispatch) 一個 Action，並由 Reducer 根據這個 Action 的內容來改變 State
- 有 Side Effect 的行為時，則是透過 Effects 這個角色，根據分配過來的 Action 決定如何處理，處理完成後再分配另外一個 Action，讓 Reducer 來改變 State

我們在撰寫程式的過程，就會開始把所有 State、行為和邏輯拆到這些角色中，之後在 Component 內就會變得很單純
- 讀取 State：從 Selector 拿資料就好
- 改變 State：分配 Action 就好

其他的實作邏輯都被包裝到 Reducer 和 Effects 裡面去了，因此在 Component 內的程式就會簡短到不可思議，單純看 Component 時，我們只需要知道它要拿什麼資料來顯示，以及他會做什麼事情就好，背後的細節完全不用管，因此在看 Component 程式時就會很容易快速地上手！只有在維護程式或改 bug 時在往後面的邏輯去追就好。

舉例來說如果你需要進行新增資料，你會透過 Actins 來進行 Dispatch 操作決定，透過監聽的方式去要求 Effects 去進行 http 請求（依賴 service) 進行資料上傳並獲得結果，再產生新 Action 後試圖開始更改 State， 回到 Reducer 並 在不修改 State 情況下準備作業前往 Store，Reducer 本身是一個 JS 函數，他能幫助我們獲得當前 state ，最後元件利用 Selector 來獲得新資料。

## 安裝與素材前置準備
NgRx 是在 Angular 應用程式中使用 RxJS 的「全域狀態」「管理工具」，因此你需要透過 npm 來安裝 NgRx，輸入指令：
```shell
npm install @ngrx/store
```

本篇的起始素材放置於 GitHub 底下提供使用，使用資料目錄 lokiNgRx 作為初始環境。下載請記得 npm install 初始化環境。

>[Github download](https://github.com/summer10920/angularTraining) at lokiNgRx-start Folder

素材內可看到
- 有三個元件，app 根元件、新增用戶元件、用戶紀錄元件。
- 且用戶紀錄元件能按鈕控制切換狀態輸出到 console.log 並被儲存起來（字串插植），也許這可以做為服務做為代碼集中。
- app 元件將整個東西整合在一起。對 new-account 元件進行`@Output`自訂事件綁定，對 account 元件進行`@input/@Output`屬性與自訂事件綁定。
- 由 app 元件提供 account[] 陣列資料，提供迴圈重複 account 元件使用
- account 透過按鈕觸發更改狀態並透過自訂事件通知 app 元件做資料更改。
- new-account 透過按鈕觸發除了 console.log 資訊也透過自訂事件通知 app 元件做資料新增。

## 規劃 Reducers
我們對 shopping-list 元件這裡規劃一個`shopping-list.reducer.ts`。同時直接宣告 function 為 reducer 

- 該函式有兩個參數分別是 state 與 action，這兩個都來自於 NgRx 所提供的。state 為需要提供目前的 state 以及當下的 action 為何，讓 Reducer 去做下一個作業（存入 State)。
- 根據這兩個參數我們能知道是哪個 Action 動作要進行 State 更新。
- 規劃一個常數為我們的初始 state，這裡初始為 2 筆商品數並以 JS 物件方式包含資料。
- 利用參數可預設值的方式，使得第一個 reducer 就有預設 state（如果我們沒有指定 state)。

>有指令可快速生成，但需要依賴並先安裝`npm install @ngrx/schematics`才能使用 [這些 CLI 指令](https://ngrx.io/guide/schematics/install)。本篇不使用 CLI 完成生成。

```ts shopping-list.reducer.ts
import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model'; //實體化物件

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  //something....
}
```

接著我們需要透過 action 做一些判斷，這個 action 的型別來自於`@ngrx/store`得知。並透過 switch 來進行分析該 action 的 type 值做不同的路線做法：
- ADD_INGREDIENT：增加一筆食物材料。我們需要回傳新 state 回去。新 state 的做法就是將舊 state 與新材料進行重組。
- 在 reducer 裡面我們不會去更改 state 值，而是重新產生一個含有舊 state 資料的組合。這裡使用解構方式完成。
- 我們會回傳兩個東西，分別是舊 state 與新 state。新材料可能來自於 Action 內先暫時寫下來（不是正確答案）。

```ts shopping-list.reducer.ts
import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
```

## 規劃 Actions
現在回到 Actions 的建立，同樣位置增加`shopping-list.action.ts`。並協助把 reducer 整理一起改到 store 子目錄下。

- 將 Action 的固定字串宣告成常數，移回到 action 文件內規畫分清楚些，集中於字串的來源與通用。
- 規劃 AddIngredient 方法為增加材料的 action。設定一屬性為 readonly 唯讀 type 為 ADD_INGREDIENT。
- 設定另屬性為 payload 為我們的成分變數，並指定型別為 Ingredient。

```ts shopping-list.action.ts
import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';
export const ADD_INGREDIENT = 'ADD_INGREDIENT'; //規劃常數

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;
}
```
```ts shopping-list.reducer.ts
import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { ADD_INGREDIENT } from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:  //改成變數名稱
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
```

再回到 shopping-list.reducer.ts，由於 Action 內的東西我們都會用到，因此改`import * as from ...`來完成。
- 參數 action 的型別更正為我們的 add 動作。
- 回傳的新 state，組合為原本的 ingredients 與 action.payload 型別（來自於 Ingredient)。

```ts shopping-list.action.ts
// import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListAction.AddIngredient) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
  }
}
```
## 規劃 store
現在才開始要使用 store 規劃，來到 app.module.ts 增加一個 store 模組並載入使用。

- 可限制甚麼地方使用到 Store，這裡用 forRoot 來指定到我們的取名 shoppingList 成為關鍵 key 且型別為哪個 reducer。
- 當NgRx進行app加載時會幫我們的reducer規劃store供使用state。

```ts app.module.ts
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store'; //重點
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer'; //重點

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ ShoppingListKey: shoppingListReducer }), //重點
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule { }
```

現在我們在app模組內註冊了store模組並連結到我們的shopping-list reducer。