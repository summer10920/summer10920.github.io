---
title: '[學習之路] JS 前端框架 Angular - NgRx'
categories:
  - Zero Road
  - Angular
tag:
  - Angular
  - JavaScript
date: 2023-03-20 16:08:50
# hidden: true
---

![](assets/images/q0DRxPm.png)

NgRx 是一個強大，且功能完整的 Angular 狀態管理套件，在我們的應用程式越來越複雜的時候，它很適合用來管理一些資料狀態，並透過適度的抽象化以及加入一定的規範，降低整體程式的耦合性，打造出更好維護及管理的程式碼。

<!-- more -->

# 觀念
state 是指整個前端的資料狀態為何。過去我們跟後端進行存取資料會利用 service 去獲取，而元件會儲存資料到 service 內，這樣的整個資料流範圍就是一種前端的資料狀態，再利用 service 本身再跟後端進行 CRUD。因此每個小元件都會依賴自己的 service 或是別人的 service 去存取後端資料，這樣的 state 會隨著架構越大你的整個網站的資料狀態就會越複雜而難以維護。原因包含：

- state 會在整個 app 任何地方被進行更新。
- state 本身是隨時可變化的，如果只有幾處元件上想更改結果上的顯示，但會影響你需要覆蓋整個 state 為新的。
- 隨 httpRequest 事件而影響 state。

雖然這些資料流問題可使用更加明確的路線與可用方法來解決但會更於複雜。因此依賴 NgRx 可不強迫影響這些執行結果。NgRx 是 Angular 另外一塊模組，能幫助我們大型開發應用上更有效率的妥善管理整個 Application state 應用狀態的方式。

NgRx 本身是參考 React 框架的 Redux 而延伸來的。是一種額外的 state 管理應用 library。他的理念是透過大型集中 store 儲存你的 app，所有的元件與服務都能彼此交換資料但都需要從 store 來存取 state。它提供了一個 `@ngrx/store` 提供了一個「乘載狀態的容器」，幫助我們存放所有前面提到的全域狀態，並提供一致的方法來進行存取，也就是我們限制了存取的「位置」和「方式」藉此來達到一定程度的控管。

![](assets/images/3Gr4nsy.png)

圖中的 Component 與 Service 是 Angular 內的已知單元，其他 NgRx 的角色有：

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
- 讀取 State：從 Selector 指令來拿資料就好，指令直接寫在 Component 上
- 改變 State：從 Dispatch 指令來寫入資料，這會寫在 Action 檔案之上，透過事件去觸發 Action 檔案動作。

其他的實作邏輯都被包裝到 Reducer 和 Effects 裡面去了，因此在 Component 內的程式就會簡短到不可思議，單純看 Component 時，我們只需要知道它要拿什麼資料來顯示，以及他會做什麼事情就好，背後的細節完全不用管，因此在看 Component 程式時就會很容易快速地上手！只有在維護程式或改 bug 時在往後面的邏輯去追就好。

舉例來說如果你需要進行新增資料，你會透過 Actins 來進行 Dispatch 操作決定，透過監聽的方式去要求 Effects 去進行 http 請求（依賴 service) 進行資料上傳並獲得結果，再產生新 Action 後試圖開始更改 State， 回到 Reducer 並 在不修改 State 情況下準備作業前往 Store，Reducer 本身是一個 JS 函數，他能幫助我們獲得當前 state ，最後元件利用 Selector 來獲得新資料。

## 安裝與素材前置準備
NgRx 是在 Angular 應用程式中使用 RxJS 的「全域狀態」「管理工具」，因此你需要透過 npm 來安裝 NgRx，輸入指令：
```shell
npm install @ngrx/store
```

本篇的起始素材放置於 GitHub 底下提供使用，使用資料目錄 lokiNgRx 作為初始環境。下載請記得 npm install 初始化環境。

>[Github download](https://github.com/summer10920/angularTraining) at lokiNgRx-start Folder

素材重點為：
- 提供一個購物清單的 state 進行 CURD，規劃在 service 內。
```ts shopping-list/shopping-list.service.ts
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  //獲取食材清單
  getIngredients() {
    return this.ingredients.slice();
  }

  //獲取指定索引單一食材
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  //增加單一食材
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  //增加多筆食材
  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  //增加更新指定食材
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  //刪除更新指定食材
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
```

# 基礎 CURD
利用素材來進行新增、新增多筆、修改、刪除等系列 NgRx 操作：

## 規劃 Reducers
我們對 shopping-list 元件這裡規劃一個`shopping-list.reducer.ts`。本身僅為一個函式命名為 ShoppingListReducer ()：

- 該函式有兩個參數分別是 state 與 action，這兩個都來自於 NgRx 所提供的。state 為需要提供目前的 state 以及當下的 action 為何，讓 Reducer 去做下一個作業（存入 State)。
- 根據這兩個參數我們才能知道是哪個 Action 動作要進行 State 更新。
- 這裡只因素材參考一開始有規劃初始 state，這裡初始為一個常數 const initialState 成為我們一開始的 2 筆商品數並以 JS 物件方式包含資料。
- 利用參數可預設值的方式，使得第一個 reducer 就有預設 state（如果我們沒有指定 state 則初始為這兩個商品，否則就告知我現在的 state 值）。

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

export function ShoppingListReducer(state = initialState, action: Action) {
  //something....
}
```

現在你可能會有各種 Action 動作要進入到這個 Reducer，因此藉由傳入的 action 做一些判斷：
- 這個 action 參數的強型別來自於`@ngrx/store`可得知。因此透過 switch 來進行分析該 action 的 type 值做不同的路線做法。
- 我們參考 shopping-list/shopping-list.service.ts 需要一些 CRUD 行為，首先我們以新增一筆的 action 設計成 ADD_INGREDIENT 這個為第一組 action。
- action.type 本身為文字串，因此規劃 ADD_INGREDIENT：增加一筆食物材料之動作。洞做為 return 新 state 回去。新 state 的做法就是將舊 state 與新材料進行重組。
- 在 reducer 裡面我們不會去更改 state 值，只有 store 才能做修改 state，reducer 只是一個處理前置行為，因此要產生一個含有舊 state 資料的新組合。這裡使用解構方式完成。
- 我們會回傳一個指定組件，指定組件包含了舊 state 與待更新 state。待更新 state 利用覆蓋特性的舊在前新在後的物件進行重搆寫法。
- 新材料可能來自於 Action 內先暫時寫下來（不是正確答案）。

```ts shopping-list.reducer.ts
import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function ShoppingListReducer(state = initialState, action: Action) {
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

- 為了避免相同通用的字串在 action 與 reducer 產生錯字拼錯，建議將 Action 所使用的關鍵字串宣告成常數，使得 reducer 使用該常數名稱。
- 規劃函式名稱 AddIngredient 並繼承 angular 的 Action 核心，做為 ADD_INGREDIENT 增加食材的 action 動作。這樣才能設定屬性 type 提供給 reducer 的 switchCase 使用，且設定為 readonly 唯讀。
- 另外還要指定屬性為 payload ，payload 是傳送到將進行待更新 store 的資料，也就是為我們的食材，因此強型別同為 Ingredient。
- 現在我們的 Action 設計完成，裡面有兩個屬性分別為 Action.Type（要幹嘛用的），以及 Action.payload（待更新的 state)。

```ts store/shopping-list.action.ts
import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';
export const ADD_INGREDIENT = 'ADD_INGREDIENT'; //規劃常數

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;
}
```
```ts store/shopping-list.reducer.ts
import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { ADD_INGREDIENT } from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function ShoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:  //改成變數名稱
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
```

再回到 shopping-list.reducer.ts，由於 Action 內的東西我們都會用到，因此改`import * as ShoppingListAction from ...`來捕獲全部並另名化。
- 參數 action 的強型別修正更加具體，來自於我們自訂 Action 的 AddIngredient 類別。
- 回傳的部分如前面提到我們會回傳一個物件包含舊新 state，新 state 就來自於舊 state（舊食材）與 payload（新添加的食材）的重搆化。

```ts shopping-list.action.ts
// import { Action } from '@ngrx/store';
import * as ShoppingListsAction from './shopping-list.action';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function ShoppingListReducer(state = initialState, action: ShoppingListsAction.AddIngredient) {
  switch (action.type) {
    case ShoppingListsAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
  }
}
```
## 規劃 store
現在才開始要使用 store 規劃，來到 app.module.ts 增加一個 storeModule 並載入使用。

- 可要求甚麼地方限定可用此 Store，這裡用 forRoot 來指定（需 JS 物件）。自訂屬性名 shoppingListKey，而強型別為剛做的 reducer。
- 現在持有 shoppingListKey 就能要求找到執行 Reducer （對應 ShoppingListReducer)，並幫我們生成一個 store 範圍也就是 state 儲存空間。

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
import { ShoppingListReducer } from './shopping-list/store/shopping-list.reducer'; //重點

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ ShoppingListKey: ShoppingListReducer }), //重點
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule { }
```

現在我們已規劃出了 storeModule 並連結到我們的 Shopping-list-reducer 去。

## 讀取 state 使用 select
現在讓我們回到元件 shopping-list.component.ts 上，試著透過 select 來獲取一開始的初始值（兩筆食材）。

- 在該元件我們要去使用 store，透過初始私有屬性規劃 store 變數，而強型別指定於 Store(Angular 核心），同時整包 Store 底下的 ShoppingListKey 之值才是我們想拿的資料。因此透過回傳的強型別來要求吐回來的資料為 ShoppingListKey（值的強型別就是整包 JS 物件的食材陣列，便是 Store 初始資料下的食材陣列包之物件型別）。也呼應到我們在 app.module 上的 forRoot 之處，我們的 ShoppingListKey 與他的 Reducer。
- 可捨棄原本素材的 service 取法，在 OnInit 階段取消，以及 ngOnDestroy 也取消原本退訂閱。
- 在 OnInit 階段，我們一開始向 Store 來獲得資料。透過指令`store.select('ShoppingListKey')`來找到該值，這也代表會回傳食材陣列包之物件給我們。因此指定存放到我們元件下的 ingredients 本地變數。
- ingredients 本地變數是透過 Store 獲得，因此他會是一個 Observable 可觀察對象，我們也要去設定回傳強型別為食材陣列包之物件。

```ts shopping-list.component.ts
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;  //變成可觀察的對象
  //回傳的將會是我們整包 JS 物件底下的食材陣列
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{ ShoppingListKey: { ingredients: Ingredient[] } }> // 規劃初始屬性
    //回傳型別會是某指定 key 底下的整包 JS 物件，也就是食材陣列，同 reducer 那裏
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('ShoppingListKey'); //指定哪個 store 底下的 key 存回到本地屬性
    
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
```

再來到範本的部分，原本從服務獲得的陣列跑 ngFor，現在是本地變數是一個可觀察對象，因此利用 rxjs 的 pipe 之 async 進行非同步作業（觀察者）。然後資料陣列於結果物件底下的 ingredients，因此這裡兩個名稱剛好撞名（前者是本地變數後者是物件內的屬性名）。

```html shopping-list.component.html
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a
        class="list-group-item"
        style="cursor: pointer"
        *ngFor="let ingredient of (ingredients|async).ingredients; let i = index"
        (click)="onEditItem(i)"
      >
        {{ ingredient.name }} ({{ ingredient.amount }})
      </a>
    </ul>
  </div>
</div>
```

還要回到 shopping-list.reducer.ts，這裡的 switch case 沒設計完，如果沒有 default 則可能導致 Action 動作不完整某條件下會丟失 store。因此最差也要把 store 放回去。

```ts shopping-list.reducer.ts
// import { Action } from '@ngrx/store';
import * as ShoppingListsAction from './shopping-list.action';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};//整包物件底下的食材陣列

export function ShoppingListReducer(state = initialState, action: ShoppingListsAction.AddIngredient) {
  switch (action.type) {
    case ShoppingListsAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default: //沒有找到任何 action 則直接回傳原 state
      return state;
  }
}
```

現在，不討論素材的登入設計，請直接拜訪 http://localhost:4200/shopping-list 是否可看到元件透過 Store 而正常獲得初始資料進行畫面輸出。

## 新增 state 使用 Dispatch
考慮寫入資料的作業代碼位置，我們會在 shopping-edit.component.ts 這裡進行提交要求新增或修改資料。也就是我們要進行 Store 的 state 修改（捨去原素材的 Service)。

- 為了讓 Edit 元件能跟 Store 連結，這裡也要初始私有屬性規劃 Store 與前面一致。
- 對新增資料開刀，對素材原利用 service 添加資料的`this.slService.addIngredient(newIngredient);`捨去，改用 NgRx 來完成透過 store.dispatch() 來寫入。
- 元件不會直接對 store 寫入，而是透過 Action 來對 store 操作，因此 dispatch 裡面需要塞入一個 new Action 物件。這個物件來自於稍早的 Action。
- shopping-edit.component 要匯入 Action 檔案。
- Action 本身需要提供我們的新食材成為 payload 內容，對 Action 檔案調整該類別成為 constructor 屬性。

```ts shopping-list.action.ts
import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';
export const ADD_INGREDIENT = 'ADD_INGREDIENT'; //規劃常數

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  // payload: Ingredient;
  constructor(public payload: Ingredient) {
  } //改成初始屬性
}
```
```ts shopping-edit.component.ts
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListsAction from '../store/shopping-list.action'; //重點

@Component({//...
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ ShoppingListKey: { ingredients: Ingredient[] } }> // 規劃初始屬性
  ) { }

  ngOnInit() {//...
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListsAction.AddIngredient(newIngredient));
      //newIngredient 為我們新食材，提供給 AddIngredient() 成為 payload 內容
      //Reducer 會透過這個 Action 底下的 ADD_INGREDIENT 行為，幫忙我們將原 store 與 payload 資料合併進行寫入。
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {//..
  }

  onDelete() {//..
  }

  ngOnDestroy() {//..
  }

}
```

直接拜訪 http://localhost:4200/shopping-list 是否可進行新增素材操作，代表 AddIngredient 可透過 store 完成新增。

## 新增多筆 state 使用 Dispatch
目前有查詢新增 State 的設計了，這裡設計可多筆新增 state，因此我們要對 Action 規劃新動作，以及 Reducer 規劃該 Action 的動作。

- 來到 Action 規劃新增多筆用的常數與建構式。這裡我們會多筆新增因此食材為陣列型別。
- 來到 Reducer 的 SwitchCase 增加規劃處理。參考前例快速規劃一組處理。
- 這裡因為新增與多筆新增的 Action 型別不同無法使參數同樣使用。因此從 Action 規劃一個自訂 Type 為可能這兩種 action 為強型別。
- 多筆新增的 payload 為陣列（因為多筆），因此我們需要解構展開才能跟舊 store 進行重搆。

```ts shopping-list.action.ts
import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';
export const ADD_INGREDIENT = 'ADD_INGREDIENT'; //規劃單筆常數
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'; //規劃多筆修改常數

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action { //多筆修改用
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {
  } //改成初始屬性
}

export type ShoppingListsActions = AddIngredient | AddIngredients;
```
```ts shopping-list.reducer.ts
// import { Action } from '@ngrx/store';
import * as ShoppingListsAction from './shopping-list.action';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};//整包物件底下的食材陣列

// export function ShoppingListReducer(state = initialState, action: ShoppingListsAction.AddIngredient) {
export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListsAction.ShoppingListsActions
) { //強型別，因為每個 Action 各自型別不同，所以規劃一個自訂 Type 可能這兩者。
  switch (action.type) {
    case ShoppingListsAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListsAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default: //沒有找到任何 action 則直接回傳原 state
      return state;
  }
}
```

再來到我們有使用到多筆修改，這個頁面操作位於 RecipeService.addIngredientsToShoppingList 之處。他工作於能幫快速增加多筆：

- 對 RecipeService 的 constructor 規劃 store。
- 因為要寫入 store，初始工作規劃 dispatch 去驅動 action 底下的 AddIngredients

```ts recipe.service.ts
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListsAction from '../shopping-list/store/shopping-list.action'; //重點

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ ShoppingListKey: { ingredients: Ingredient[] } }> // 規劃初始屬性
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListsAction.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
```

試著在頁面 http://localhost:4200/recipes 規劃新項目並添加 2 筆食材，同時透過 Dropmenu 快速添加此項目，使得 dispatch 驅動幫我們把舊 state 與新 payload 合併回存到 store，現在回到 shopping-list 頁面應可成功看到新 state 的更新。

## 修改與刪除 state 使用 Dispatch
原素材的修改與刪除功能落於 ShoppingListService，也試著改成由 store 來完成。

- 回到 ShoppingListsActions 規劃，需要添加通用的常數、工作類別、與共用 Type。
- 修改工作裡的 payload 需要告知我們修改 ID 與內容。有兩筆這裡採物件方式包裝。
- 刪除工作裡的 payload 需要告知我們修改 ID。只有一筆則直接由 payload 擔任。

```ts shopping-list.action.ts
import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';
export const ADD_INGREDIENT = 'ADD_INGREDIENT'; //規劃單筆常數
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'; //規劃多筆修改常數
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'; //規劃修改
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'; //規劃刪除

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action { //多筆修改用
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {
  } //改成初始屬性
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: { index: number, ingredient: Ingredient }) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {
  }
}

export type ShoppingListsActions = AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient;
```

回到 reducer 這裡規畫修改與消除。
- 修改的 payload 可以獲得 index 與食材細節之物件，我們不能去修改 state，透過建立一些本地常數來做暫存並整理出不影響 state 改變的組合。試圖整理出與舊 state 不同的全新假 state。
- 刪除的 payload 為 index，也不能去修改舊 state，利用 filter 去產生不影響舊 state 的新陣列做為我們的全新假 state。

```ts shopping-list.reducer.ts
// import { Action } from '@ngrx/store';
import * as ShoppingListsAction from './shopping-list.action';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};//整包物件底下的食材陣列

// export function ShoppingListReducer(state = initialState, action: ShoppingListsAction.AddIngredient) {
export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListsAction.ShoppingListsActions
) { //強型別，因為每個 Action 各自型別不同，所以規劃一個自訂 Type 可能這兩者。
  switch (action.type) {
    case ShoppingListsAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListsAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListsAction.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index]; //從 state 找到原本修改前的食材
      const updatedIngredient = { //欲更新的食材資料細節，透過解構讓舊新覆蓋。
        ...ingredient,
        ...action.payload.ingredient
      };
      const updatedIngredients = [...state.ingredients]; //欲更新的食材陣列
      updatedIngredients[action.payload.index] = updatedIngredient; //欲更新的食材陣列找到該 index 覆蓋該食材細節

      return { //從舊 state 去覆蓋該食材陣列
        ...state,
        ingredients: updatedIngredients
      };
    case ShoppingListsAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((item, idx) => idx != action.payload)
        //直接使用 filter 產生少了此 index 的新陣列
      };
    default: //沒有找到任何 action 則直接回傳原 state
      return state;
  }
}
```

再來是到 shopping-edit.component 的地方，找到修改以及刪除之處。

```ts
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListsAction from '../store/shopping-list.action'; //重點

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ ShoppingListKey: { ingredients: Ingredient[] } }> // 規劃初始屬性
  ) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);

      this.store.dispatch(new ShoppingListsAction.UpdateIngredient({ //重點
        index: this.editedItemIndex,
        ingredient: newIngredient
      }
      ));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListsAction.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListsAction.DeleteIngredient(this.editedItemIndex)); //重點

    this.onClear();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
```

回到 shopping-list 畫面上，操作修改與刪除是否能成功對 store 存取。

# 多項內容的 state
在素材當中的 shopping-edit.component 部分，我們有一處是透過 Service 所提供的開始編輯 slService.startedEditing。如果也想把這個歸入 NgRx 操作，變成  State 內含不同資料要提供這 App 在不同的場合使用。現在試圖規劃多筆內容的 State 操作如何呈現。 state 內第一組資料是管理的是我們食材部分，另外還有一些資料將會是購物清單部分。

## 規劃 state 強型別
前面的例子 state 單純只有一個屬性資料，因此型別直接寫即可。現在需要規劃另外的屬性資料，因此回到一開始設計界面的 Reducer。

- 購物清單需要兩個屬性為食材與索引。而初始情況下沒有資料（編輯之前），因此直接設定為 null 與索引-1（因為是陣列所以不能為 0 以上）。

```ts shopping-list.reducer.ts
const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};//整包初始物件有食材陣列的 state 與購物清單的 state
```

由於在那些對 Store 存取的地方，Store 所標示回傳的 State 強型別已經變成有三個屬性了，所以要回到前面 Store 宣告回傳 state 之強型別重新修改。變成以下寫法但不建議，避免你之後 state 屬性越多就更複雜何況很多地方會宣告。

```ts 不建議的寫法
private store: Store<{ 
  ShoppingListKey: { 
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
  }
}> // 規劃初始屬性
```

因此我們需要將型別自訂起來，才能重複被使用在這些 Store 身上。在 Reducer 宣告 initialState 的地方做 interface type 設計。透過使自訂強型別，可套用在任何 State 所需宣告強型別之處。

```ts shopping-list.reducer.ts
export interface State {  //State 本身的型別
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

const initialState: State = {  //State 本身的初始資料，且可提供 State 為該強型別
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function ShoppingListReducer(
  state: State = initialState, //可提供 State 為該強型別
  action: ShoppingListsAction.ShoppingListsActions
) { //...
}
```

接下來你可能會想幫 Store 的寫法優化成：

```ts 不建議的寫法
private store: Store<{ ShoppingListKey: State }>
```

然而做這之前，已知一個 state 可以多個屬性給不同應用，其實 Store 內也可以多個 State 給不同的場合使用（利用 Key 來存取個別的 State)。因此也可以將 state 們設計出獨立介面，要求這些 State 的強型別為何。

```ts shopping-list.reducer.ts
export interface State {  //State 本身的型別
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

export interface AppState {  //全部的 State，利用 Key 來找
  ShoppingListKey: State;
}

const initialState: State = {  //State 本身的初始資料，且可提供 State 為該強型別
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};
```

現在可以將有使用到 Store 的地方，例如 shopping-list.component 部分將 AppState 載入使用（利用別名來編寫通常習慣為 From 開頭）。

```ts shopping-list.component.ts
import * as fromShoppingList from './store/shopping-list.reducer';

//...

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    // private store: Store<{ ShoppingListKey: { ingredients: Ingredient[] } }> // 規劃初始屬性
    private store: Store<fromShoppingList.AppState> // 重點
  ) { }
  //...
}
```

其他 Store 使用之處，包含 shopping-edit.component 與 recipe.service 亦同。

```ts shopping-list.component.ts
import * as fromShoppingList from '../store/shopping-list.reducer';
//...

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    // private store: Store<{ ShoppingListKey: { ingredients: Ingredient[] } }> // 規劃初始屬性
    private store: Store<fromShoppingList.AppState> // 重點
  ) { }
  //...
}
```
```ts recipe.service.ts
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  constructor(
    private slService: ShoppingListService,
    // private store: Store<{ ShoppingListKey: { ingredients: Ingredient[] } }> // 規劃初始屬性
    private store: Store<fromShoppingList.AppState> // 重點
  ) { }
```

之後隨著 State 的調整編寫增減，只要來到 Reducer 做調整即可，不用再四處找 Store 修改調整。

## 設計另一組 State
回歸需求要多一組 Action 來處理開始編輯，我們需要兩組分別為 START 與 STOP。來到我們集中 Action 之處設計，以及 reducer 要做的事。
- StartEdit 部分要知道是對哪筆食材編輯，因此需要提供 index 做為 payload。
- StopEdit 部分不用提供任何資訊，所以可不用規劃 constructor。
- 規劃 reducer 要做的事情，START_EDIT 部分透過 index 來湊出 editedIngredientIndex 與 editedIngredient 的值做新 State 回傳出去。
- 同上，STOP_EDIT 部分不需要從 payload 獲得什麼，直接讓 State 的 editedIngredientIndex 與 editedIngredient 恢復成初始值。

```ts shopping-list.action.ts
export const START_EDIT = 'START_EDIT'; //編輯開始
export const STOP_EDIT = 'STOP_EDIT'; //編輯停止

//...

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {
  }
}
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListsActions =
  AddIngredient |
  AddIngredients |
  UpdateIngredient |
  DeleteIngredient |
  StartEdit |
  StopEdit;
```
```ts shopping-list.reducer.ts
case ShoppingListsAction.START_EDIT:
  return {
    ...state,
    editedIngredientIndex: action.payload,
    editedIngredient: { ...state.ingredients[action.payload] }
  };
case ShoppingListsAction.STOP_EDIT:
  return {
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1
  };
```

再來是哪裡需要 Store 讀寫的相關操作之處：
- 位於 shopping-list.component 的 onEditItem，每當我們要進入編輯模式時來觸發 ShoppingListsAction.StartEdit。
-  shopping-edit.component.ts 的 onClear 與 ngOnDestroy，當清除或銷毀此元件就是停止編輯。
-  同上，一開始 onInit 初始階段時，我們透過觀察去評估 Store 內的 State 目前有沒有資料（索引-1)，有就是切換成編輯模式並將這兩個值打到畫面表單上。
- 另外還有要將這個 select 的觀察記住透過 this.subscription，之後當這個元件銷毀我們要取消關注這個將 state 打到畫面上的觀察。

```ts shopping-list.component.ts
import * as ShoppingListsAction from './store/shopping-list.action';
//...

export class ShoppingListComponent implements OnInit, OnDestroy {
  //...
  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListsAction.StartEdit(index));
}
```
```ts shopping-edit.component.ts
import * as ShoppingListsAction from './store/shopping-list.action';
//...

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    // private store: Store<{ ShoppingListKey: { ingredients: Ingredient[] } }> // 規劃初始屬性
    private store: Store<fromShoppingList.AppState> // 重點
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ShoppingListKey').subscribe(startData => { //重點
      if (startData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = startData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else this.editMode = false;
    });
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //     }
    //   );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);

      this.store.dispatch(new ShoppingListsAction.UpdateIngredient({
        index: this.editedItemIndex,
        ingredient: newIngredient
      }
      ));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListsAction.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListsAction.StopEdit());  //重點
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListsAction.DeleteIngredient(this.editedItemIndex));

    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  //重點
    this.store.dispatch(new ShoppingListsAction.StopEdit()); //重點
  }
}
```

現在畫面上的 shopping-list 如果欄位沒有值或透過 clear 操作則不能按 Add，一旦對表單欄位做添加操作時會開放 Add 按鈕，這是在 ngOnInit 階段上我們去觀察 state 變化。

https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466572#content