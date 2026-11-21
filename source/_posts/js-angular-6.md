---
title: '[前端框架] Angular - 模組、部屬、獨立元件'
categories:
  - Misc Notes
  - Angular
tag:
  - Angular
  - JavaScript
date: 2023-03-14 11:02:45
---

![](assets/images/banner/angular.png)
本篇介紹 Angular 的模組設計，包含了如何將大型模組分解成多個模組，或者相同集合的模組定義為共享模組供給多個地方使用他。以及模組的加載方式透過 lazy Loading 分流效能值行。也簡單介紹如何將 Angular 執行部屬到任何遠端伺服器網站。最後章節會介紹較為新的功能的獨立元件設計，可能這是未來 Angular 改變的做法重點。

<!-- more -->

---

# Modules
模組（Modules）是 Angular 中的核心概念之一。它們是由 Angular 模組（Angular Module）負責定義、維護和載入。每個應用程序至少有一個模組，這個模組被稱為根模組（Root Module），其他模組可以被應用程序擴充和引用。

模組主要用於將應用程序拆分成可重用和可管理的部分，並定義應用程序的結構和功能。模組內可以包含元件 Components、服務 Services、指令 Directives、管道 custom Pipes 等等。通過將相關的元件和其他應用程序資源放在同一個模組中，可以更好地組織和管理代碼。

在 Angular 中，模組主要通過裝飾器來定義和配置。通過裝飾器，可以指定模組名稱、導入的模組、導出的元件和服務、提供的服務等等。一個簡單的模組定義如下：

```typescript app.module.ts
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert/alert.component';

@NgModule({
  declarations: [ // 聲明所有 components, directives, custom pipes 於 array 內
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [ //允許將其他的模組加入到此模組內，所以拆分 module 時很重要
    BrowserModule,
    FormsModule, // 舉例此內建的表單 module 能讓整個專案使用
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule // 路由用的模組，額外於下面代碼另解釋
  ],
  providers: [ // 定義所有的服務，若不想在此定義可以在該 service 內填寫`@Injectable({ providedIn: 'root' })`注入於整個專案 root
    ShoppingListService,
    RecipeService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent], //引導哪個元件對應 index.html 的<app-root>
  entryComponents:[ //動態元件使用元件
    AlertComponent,
  ]
})

@NgModule({
  declarations: [ AppComponent ], 
  imports: [ BrowserModule ], 
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

在這個例子中，@NgModule 裝飾器被用來定義一個模組 AppModule，並通過 declarations 屬性聲明了該模組包含一個名為 AppComponent 的元件。imports 屬性用來導入該模組需要的其他模組，這裡導入了 BrowserModule。bootstrap 屬性指定了模組的根元件，這裡是 AppComponent。

此外你也可以從 app-routing.module.ts 可以看到 @NgModule 裝飾器的編寫。app-routing 模組用來保存所有路由配置。你可以把路由寫在 app.module.ts 內，但因為代碼量太大才透過拆分方式另寫成 app-routing.module.ts，使得 app.module.ts 更精簡與維護。

```typescript src\app\app-routing.module.ts
import { AuthGuard } from './auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], 
  /**
    導入內建的 Router 模組，由 Angular 提供路由進行特殊方法，
    再將我們指定路由規則的 appRoutes 物件參數提供給路由模組成為新規則的 RouterModule
  **/
  exports: [RouterModule]
  /**
    最後需導出 Router 模組，才能在 App.module.ts 裡面導入使用
  **/
})
export class AppRoutingModule { }
```

## 環境建置準備
本篇的起始素材放置於 GitHub 底下提供使用，使用資料目錄 lokiModule 作為初始環境。下載請記得 npm install 初始化環境。

>[Github download](https://github.com/summer10920/angularTraining) at lokiModule-start Folder

這份素材跟隨上次素材作業 lokiHttp 為中繼存放點，若您已持有可繼續使用。

## 拆分 Feature 模組
如路由模組來說，你可以將路由餐屬直接寫在 appModule 內，也可以為了簡約將路由相關直接拆分一個模組，透過 import 匯回到 appModule。同樣可以將每個工作集合為一個 Feature Module 功能模組再匯回到 appModule，使得整個組織性更好維護。
### appModule 拆分至 RecipesModule
本篇將示範將 app.module.tss 內的與 recipes 相關的作業獨立出一個 feature module，放置於 recipes 底下：

- 透過手動或 CLI 指令`ng g m recipes`建立於 src\app\recipes\recipes.module.ts
- 將 aap.module.ts 內 declarations 所指定的 Recipes 相關元件搬移至 recipes.module.ts（包含 import 聲明）
- 將 recipes.module.ts 宣告於 app.module.ts 內的 import 使得 app.module.ts 能載入此 feature module。
- 我們也可以將 Recipes 元件寫在 exports，使得整個其他模組能使用。（本素材上沒有此需求，可寫可不寫）

```typescript src\app\app.module.ts
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// ...
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesModule } from './recipes/recipes.module'; // ※重點

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    // RecipeStartComponent,
    // RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule // ※重點
  ],
  providers: [
    ShoppingListService,
    RecipeService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
  ]
})
export class AppModule { }
```
```typescript src\app\recipes\recipes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
})
export class RecipesModule { }
```

其中，exports 屬性是 NgModule 設置，用於將 NgModule 中的元件、指令等導出，從而讓其他模組可以使用它們。如果某個模組中的元件或指令未導出，其他模組就無法直接使用它們。

在使用 exports 屬性時，需要注意以下幾點：

- 可以將 exports 設置為一個元件類型，也可以設置為一個陣列，其中包含多個元件類型。
- 如果 NgModule 中的某個元件或指令被其他模組引用，但未導出，就會報錯。
- 如果要使用某個 NgModule 中導出的元件或指令，可以將該 NgModule 導入到需要使用它們的模組中，並將它們添加到 imports 屬性中。
總之，exports 屬性是一個非常重要的屬性，可以讓我們輕鬆地共用元件、指令等功能，提高代碼的重用性和可維護性。

此時，發現網頁執行可以獲得錯誤資訊`'router-outlet' is not a known element:`。這是由於彼此 module 所 import 的模組都是獨立不共享的，即使 app module 有 import 了 AppRoutingModule，但在 RecipesModule 內因獨立作業因此並沒有繼承路由模組。因此 RecipesModule 集合的這些 Recipe 元件若需要使用 router 就會看不懂（舉例 RecipesComponent.html)。這現象僅限於 Module，唯獨 Service 可以共享使用。

為了解決此事，你需要在指定模組下這些元件若有使用內建模組也需 import 使用。

```typescript src\app\recipes\recipes.module.ts
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  //...
  imports: [
    CommonModule, //for ngif 相關 common
    RouterModule, // for route path 使用
    ReactiveFormsModule, // for formGroup 使用
  ],
  //...
}
```

### AppRoutingModule 拆分至 RecipesRouteModule
appRoutes 也可以將路由參數進行拆分，如之前介紹過的 Route path 參數可以直接寫在 appModule 透過 RouterModule.forRoot() 完成。我們也可以寫在 RecipesModule 透過 RouterModule.forChild() 來完成。但這裡也是為了簡潔（當時為是另寫 AppRoutingModule 再 import 給 AppModule )，這裡將規劃一個 RecipesRouteModule 提供 import 給 RecipesModule。

- 手動或 cli 指令建立`src\app\recipes\recipes-routing.module.ts`為 RecipesRoutingModule
- 將 AppRoutingModule 與 Recipe 有關的路由都搬移到 RecipesRoutingModule
- 參考兩者寫法，在 RecipesRoutingModule 內需要使用 RouterModule.forChild 並 exports 供其他模組使用。
- 於 RecipesModule 相同方式，import 此 RecipesRoutingModule

```typescript src\app\app-routing.module.ts
// ...
// import { AuthGuard } from './auth/auth-guard.service';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipesResolverService } from './recipes/recipes-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // {
  //   path: 'recipes',
  //   component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: '', component: RecipeStartComponent },
  //     { path: 'new', component: RecipeEditComponent },
  //     {
  //       path: ':id',
  //       component: RecipeDetailComponent,
  //       resolve: [RecipesResolverService]
  //     },
  //     {
  //       path: ':id/edit',
  //       component: RecipeEditComponent,
  //       resolve: [RecipesResolverService]
  //     }
  //   ]
  // },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
```typescript src\app\recipes\recipes-routing.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';

const recipesRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
]
  ;

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
```
```typescript src\app\recipes\recipes.module.ts
//...
import { RecipesRoutingModule } from './recipes-routing.module'; // ※重點

@NgModule({
  // ...
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    RecipesRoutingModule // ※重點
  ],
  //...
})
export class RecipesModule { }
```

> 如先前所說，目前的 Recipe 相關 Component 都被規畫到 RecipesModule 內，對於 AppComponent 或子元件並沒有出現使用 Recipe 相關元件，因此 RecipesModule 不需要將 Recipe 相關 Component 進行 export 提供 AppModule 使用。

### 練習規劃 ShoppingList Feature Module
試著也將 ShoppingList 獨立拆分為一個 shopping-list.module.ts

- 手動或 CLI 指令`ng g m shopping-list`規劃 src\app\shopping-list\shopping-list.module.ts
- 搬移 AppModules 內跟 shoppingList 有關的兩組元件至 ShoppingListModule
- 搬移 AppRoutingModule 內跟 shoppingList 有關的一組 path，由於很少可直接寫至 ShoppingListModule
- 同上，寫在 import 並使用 RouterModule.forChild() 方式填入
- ShoppingListModule 會用到表單模組
- 最後回到 AppModules，將此 ShoppingListModule 進行 import

```typescript src\app\shopping-list\shopping-list.module.ts
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'shopping-list', component: ShoppingListComponent },
    ])
  ]
})
export class ShoppingListModule { }
```
```typescript src\app\app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
```typescript src\app\app.module.ts
//...
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // ShoppingListComponent,
    // ShoppingEditComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule // ※重點
  ],
  providers: [
    ShoppingListService,
    RecipeService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
  ]
})
export class AppModule { }
```

## 共享模組 Shard Modules
SharedModule 是一個用來匯出多個模組、元件、指令和服務的模組。這樣可以減少程式碼的重複性、提升模組的可重用性和可維護性。一般來說，在一個大型專案中，會有許多模組需要被多個元件或模組共用。如果每個元件或模組都要單獨引入這些模組，不僅會增加程式碼的複雜度，也會降低可維護性。因此，可以建立一個 SharedModule 模組，將這些常用的模組匯出，然後在其他模組中引入 SharedModule 就可以直接使用這些模組，而不需要重複引入。

如果在兩個 featureModule 持有部分相同的元件指令管道甚至模組，為了維護最佳化可以將這些持有相同的集合新規劃一個 SharedModule 再匯回這兩個 featureModule。

>注意的是如果持有相同的是內建模組（舉例 CommonModule)，是可以不用特別放入 sharedModule，這不會使效能變佳。本範例僅示範破例這樣做。

目前有一些元件被聲明於 appModule 內，供應整個 app 可以使用。為了精簡化代碼，理應規畫於 sharedModule，並在指定的 featureModule 內進行匯入與聲明。

- 手動或指令`ng g m shared`增加 src\app\shared\shared.module.ts
- 將 AlertComponent, LoadingSpinnerComponent, DropdownDirective 聲明給 SharedModule，若需讓其他模組使用此 SharedModule 的元件指令模組管道就需要 export 出來。
- 同上，由於 Alert 是動態元件要聲明 entryComponents 於內。

```typescript src\app\shared\shared.module.ts
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule
  ],
  entryComponents: [
    AlertComponent,
  ]
})
export class SharedModule { }
```

此時，將 SharedModule 匯入給 RecipesModule 與 ShoppingListModule，如此一來這兩個 feature 就能使用該 SharedModule 內的指定元件指令管道模組。也能消除自己原先綁定的重複模組或元件

> 這裡的 CommonModule 是示範可以消除，這種內建模組其實可以不用做在 sharedModule

```typescript src\app\recipes\recipes.module.ts
// ...
// import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    // CommonModule,
    RouterModule, 
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule // ※重點
  ],
  exports: [
  ],
})
export class RecipesModule { }
```
```typescript
// ...
// import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    // CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'shopping-list', component: ShoppingListComponent },
    ]),
    SharedModule  // ※重點
  ]
})
export class ShoppingListModule { }
```

然而要注意的是，目前執行上出現錯誤 compiler.js:2420 Uncaught Error: Type DropdownDirective is part of the declarations of 2 modules。

Component 不像 Module 那樣可以多次被任何需要的 feature 進行重複性 import 使用，Component 只能一次性被 declarations 聲明。因此以 DropdownDirective 而言被宣告在 appModule 與 sharedModule 有錯。

- 相較 haredModule 去取消 appModule 出現的重複元件。
- 在 appModule 內進行 haredModule 的 import，如此一來 appModule 仍可以使用這些元件。

```typescript src\app\app.module.ts
// ...
// import { DropdownDirective } from './shared/dropdown.directive';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { AlertComponent } from './shared/alert/alert.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule  // ※重點
  ],
  providers: [
    ShoppingListService,
    RecipeService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   AlertComponent,
  // ]
})
export class AppModule { }
```

注意，由於模組中的服務是在根注入器中註冊的，因此在 SharedModule 中匯出的服務也會被其他模組共用。如果在某個模組中需要自己定義一個服務，建議不要將這個服務加入到 SharedModule 的 providers 中，而是在該模組自己的 providers 中定義。這樣可以避免服務被多個模組共用時產生的問題。

## 核心模組 Core Modules
CoreModule 是一個用來放置應用程式的共享模組。這個模組通常只會被 AppModule 引用一次，並且會在應用程式一開始就載入，主要負責提供應用程式級別的服務、設定及其他共享資源。以下是 CoreModule 可能會包含的內容：

- HTTP 服務：提供應用程式全域共用的 HTTP 服務，讓你可以輕鬆地透過 DI 注入服務到任何元件中。
- 路由設定：在 CoreModule 中設定應用程式的路由，並載入路由器相關的模組。
- 共用服務：如果有多個元件需要存取同一份資料，可以把資料儲存在共用服務中，並在 CoreModule 中提供這些服務。
- 錯誤處理器：定義全域的錯誤處理邏輯，例如在 HTTP 請求失敗時要顯示錯誤訊息。
- 日誌服務：提供全域的日誌記錄功能，例如透過 console.log 輸出日誌，或是把日誌寫入檔案中。
- 語言本地化：提供全域的多語系支援，例如在不同語言環境下顯示不同的文字。

CoreModule 可以讓你將應用程式的共享邏輯從其他模組中抽離出來，並在應用程式一開始就載入。這樣可以讓你的程式碼更乾淨、更易於維護，並且可以提高程式碼的重用性和可讀性。

### 建立 CoreModule
將 appModule 內的服務數定拆分為 coreModule，這部分僅限定有宣告寫在 appModule 的服務，不包含自身持有`@Injectable({ providedIn: 'root' })`的服務，後者的宣告方式不需要填寫於 appModule 的 providers，同理也不會整理到 coreModule 的 providers 裡。

- 手動或 CLI 指令`ng g m core`建立於 src\app\core\core.module.ts
- 將 AppModule 的 providers 搬移至 CoreModule

```typescript src\app\core\core.module.ts
import { NgModule } from '@angular/core';

import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
})
export class CoreModule { }
```
```typescript src\app\app.module.ts
// ...
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { RecipeService } from './recipes/recipe.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule
  ],
  // providers: [
  //   ShoppingListService,
  //   RecipeService, {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptorService,
  //     multi: true
  //   }
  // ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

## 重構練習：auth Feature Module
綜合以上觀念，再次嘗試將 appModule 內的 auth 元件與相關工作，拆分解為 authModule

- 手動或 CLI 指令建立 src\app\auth\auth.module.ts
- 將 AppModule 內 declarations 的 AuthComponent 部分搬移至 AuthModule
- 現在 AppModule 內只剩 AppComponent 與 HeaderComponent，這些都用不到 FormsModule 除了 AuthComponent，這也一併搬走
- 將 AppRoutingModule 關於 auth 的 path 也搬移至 AuthModule

```typescript src\app\auth\auth.module.ts
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'auth', component: AuthComponent }
    ]),
  ]
})
export class AuthModule { }
```
```typescript src\app\app.module.ts
// ...
// import { AuthComponent } from './auth/auth.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent,
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

此時執行時出現錯誤 'app-loading-spinner' is not a known element，由於 loading-spinner 元件被聲明於 sharedModule，為了取得此元件你需要讓 AuthModule 進行 SharedModule 的 import，才能認得此 loading 元件。

```typescript src\app\auth\auth.module.ts
imports: [
  CommonModule,
  FormsModule,
  RouterModule.forChild([
    { path: 'auth', component: AuthComponent }
  ]),
  SharedModule
]
```

## 延遲加載 lazy Loading 
是一種在需要時才加載某些功能模塊的技術，這樣可以大大減少應用程序的初始化時間和內存佔用。預設 angular 的開發情況採用 Eager loading 積極載入方式，當下拜訪'/'目錄時除了存取本該此頁面的模組元件等資源，也會將所其他子路由的模組元件等資源都加載。產生很多不必要的資源等待，我們可以透過通過路由機制來實現 lazy Loading。有拜訪指定路由時僅加載該路由頁面上所需的資源即可，具體步驟如下：

- 定義一個子路由，該子路由將要 lazy Loading 的模塊鏈接到該路由下。
- 在路由模塊中將該子路由定義為 lazy Loading 模式，即使用 loadChildren 屬性指向一個回調函式，在該函式中動態加載該模塊。

### 將 RecipesModule 接到指定路由下才存取
要使 lazy Loading 工作，該 Feature Module 必須自帶路由規則 Module。並且將該路由最上層的路徑設定為空，改由 AppRoutingModule 來指定路徑並追加設定 lazy Loading 參數。

```typescript src\app\recipes\recipes-routing.module.ts
{
  // path: 'recipes',
  path: '',
  component: RecipesComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    {
      path: ':id',
      component: RecipeDetailComponent,
      resolve: [RecipesResolverService]
    },
    {
      path: ':id/edit',
      component: RecipeEditComponent,
      resolve: [RecipesResolverService]
    }
  ]
},
```

回到 AppRoutingModule，我們重新加回 path: 'recipes' 部分，第二個屬性不再是 component 而是改為 loadChildren。一旦觸發此路由，要求 Angular 只需加載我們所指定的內容模塊 RecipesModule 且指定一個相對路徑，以及要求該路徑內容底下的指定#別名 (class Name 為 RecipesModule) 對象。

```typescript src\app\app-routing.module.ts
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }, //fore es2015
  // { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) } // for es2020+
];
```

> 如果你的 Angular 專案預設不是使用 es2015 作為 --module 的設定（可觀察 tsconfig.json) 或更高 es 版本導致語法錯誤，可改使用動態 import 方式做為替代語法。

目前而言已經將 RecipesModule 成功禁止一開始進行加載，只有當拜訪該 recipes 路徑才會讀取 RecipesModule。另外還有重要的問題在 AppModule 內我們有加載 RecipesModule 會導致找不到此模組。因此也需拔除

```typescript src\app\app.module.ts
// ...
// import { RecipesModule } from './recipes/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    // RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

> import 語句也需拔除，否則以 import 特性來說將會一起打包而不會解決下載之效能問題。

最後重新啟用 ng serve 檢查運作。

### 同理 lazy 規劃 AuthModule 與 ShoppingListModule
相同方式嘗試規劃 AuthModule 與 ShoppingListModule，如下：

```typescript src\app\shopping-list\shopping-list.module.ts
RouterModule.forChild([
  // { path: 'shopping-list', component: ShoppingListComponent },
  { path: '', component: ShoppingListComponent },
]),
```
```typescript src\app\auth\auth.module.ts
RouterModule.forChild([
  // { path: 'auth', component: AuthComponent }
  { path: '', component: AuthComponent }
]),
```
```typescript src\app\app-routing.module.ts
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }, //fore es2015
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }, //fore es2015
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }, //fore es2015
];
```
```typescript src\app\app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
// import { AuthModule } from './auth/auth.module';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    // RecipesModule,
    // ShoppingListModule,
    // AuthModule
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

### Preloading 預加載機制
預加載機制 (Preloading) 是指在瀏覽器空閒的時間，提前載入未來可能需要用到的模組，以提升應用程式的速度和效能。相較於延遲載入 (lazy loading)，預加載能讓使用者更快速地瀏覽網站，提供更好的使用體驗。在 Angular 中，可以使用 PreloadAllModules 或 PreloadingStrategy 來實現預加載機制。

#### PreloadAllModules
Angular 預設提供了 PreloadAllModules 策略，它會在應用程式載入完成後，自動下載所有被 lazy loaded 的模組。你可以在 app.module.ts 中加入以下程式碼啟用預設的 PreloadAllModules 策略：

```typescript src\app\app-routing.module.ts
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// ...

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

#### 自訂預加載策略
你也可以自訂預加載策略，以下是一個簡單的範例程式碼（未套入此素材做說明）。先規劃一組 service，要求傳遞 Route 參數進來，判斷 route 底下有無指定 data.preload 值，並回傳一個具可觀察的布林值或 null。

```typescript custom-preloading.strategy.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) return fn();
    else return of(null);
  }
}
```

將此規則寫入 appRoutingModule

```typescript src\app\app-routing.module.ts
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {CustomPreloadingStrategy} from './custom-preloading.strategy.ts';
// ...

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: CustomPreloadingStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

接著有要預加載的 lazy Feature Module 添加 data.preload 屬性

```typescript src\app\app-routing.module.ts
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }, //fore es2015
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }, //fore es2015
  { 
    path: 'auth', 
    loadChildren: './auth/auth.module#AuthModule', 
    data: { preload: true } }
];
```

## 模組與服務共用
Service 經集合 providers 宣告於不同模組內，會根據 providers 的層級是否於相同模組或整份 App 來形成共用。以下建立測試用的 Service 並列舉一些模組上組合呼喚。

- 手動或 CLI 指令`ng g s log-test --skip-tests`建立 src\app\log-test.service.ts
- 這個 Service 會根據兩個模組順序透過 ngOnInit 執行 print，確認兩者 Module 是否共享此 Service 用。

```typescript src\app\log-test.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogTestService {
  lastLog: string;
  printLog(message: string) {
    console.log('now:' + message);
    console.log('last:' + this.lastLog);
    this.lastLog = message;
  }
}
```

接下來以下情境請試著觀察拜訪 AppComponent & ShoppingListComponent 的 console 訊息。

### LogTestService :: providedIn: 'root'
目前 Service 編寫為`providedIn: 'root'`，因此不用修改 AppModule 添加 providers，理應全部 App 應用都應共享。

- 添加服務執行於 AppComponent 的 constructor 與 ngOnInit
- 添加服務執行於 ShoppingListComponent 的 constructor 與 ngOnInit

```typescript src\app\app.component.ts
export class AppComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    private LogTestService: LogTestService // ※重點
  ) { }

  ngOnInit(): void {
    this.AuthService.autoSignIn();
    this.LogTestService.printLog('AppComponent'); // ※重點
  }
```
```typescript src\app\shopping-list\shopping-list.component.ts
  constructor(
    private slService: ShoppingListService,
    private LogTestService: LogTestService // ※重點
  ) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.LogTestService.printLog('ShoppingListComponent'); // ※重點
  }
```

觀察畫面拜訪 AppComponent（首頁）與 ShoppingListComponent(shopping-list 頁面）可獲得以下訊息。既代表兩個不同元件共享同一個記憶體下之物件。

```powershell
now:AppComponent
last:undefined
# ...
now:ShoppingListComponent
last:AppComponent
```

### AppModule :: providers
- 取消 LogTestService 的 Injectable 
- 改由 AppModule 宣告 `providers: [LogTestService]`。

同樣觀察畫面拜訪有相同訊息，及代表 Service 編寫`providedIn: 'root'`與從 AppModule 編寫 providers 都為代表整份 App 應用都是同樣的共享此記憶體位置。

```powershell
now:AppComponent
last:undefined
# ...
now:ShoppingListComponent
last:AppComponent
```

### CoreModule :: providers
- 取消 AppModule 宣告 `providers: [LogTestService]`
- 改於 CoreModule 宣告 `providers: [LogTestService]`

同樣觀察畫面拜訪有相同訊息，由於 CoreModule 是由 AppModule 拆分出去的，原理相同。

```powershell
now:AppComponent
last:undefined
# ...
now:ShoppingListComponent
last:AppComponent
```

### AppModule :: providers & ShoppingListModule :: providers
- 取消 CoreModule 宣告 `providers: [LogTestService]` 
- 改於 AppModule 宣告 `providers: [LogTestService]`
- 改於 ShoppingListModule 宣告 `providers: [LogTestService]`

同樣觀察畫面拜訪有<mark>undefined</mark>訊息，由於 ShoppingListModule 是事後產生的 lazy 模組，因此加載時會像記憶統重新佈署物件位置，導致這兩個 Service 為不同實體。

```powershell
now:AppComponent
last:undefined
# ...
now:ShoppingListComponent
last:undefined
```

### SharedModule :: providers
SharedModule 同樣立即加載魚 AppModule 與 ShoppingListModule 所使用，嘗試以下作業：

- 取消 ShoppingListModule 宣告 `providers: [LogTestService]` 
- 取消 AppModule 宣告 `providers: [LogTestService]`
- 改於 SharedModule 宣告 `providers: [LogTestService]`

同樣觀察畫面拜訪有<mark>undefined</mark>訊息，由於 ShoppingListModule 是事後產生的 lazy 模組，因此當下才會加載 SharedModule，同樣會記憶統重新佈署物件位置，導致這兩個 Service 為不同實體。

```powershell
now:AppComponent
last:undefined
# ...
now:ShoppingListComponent
last:undefined
```

### 結論
不論如何因由於 lazy Loading 關係，事後加載執行的都會是另一個實體化記憶體位置。因此需要特別注意模組加載 Service 是否是延遲下的事後發生行為，最好的預設法則是將 Service 以 root 方式整份應用確保記憶體共用於相同記憶體實體位置。

# 部屬 Build
部署是指將應用程式或服務上線，讓使用者可以使用。在軟體開發中，部署通常包含將應用程式或服務的代碼、資源和設定從開發環境轉移到目標環境的過程。這可以是在內部部署到私有伺服器或雲端平台，或是在公共網際網路上提供服務。

部署通常涉及多個步驟，例如構建、測試、打包、上傳和設置。在部署過程中，必須注意安全性、可靠性和效率等因素，以確保應用程式或服務能夠正常運作並滿足使用者的需求。常見的部署方式包括手動部署和自動化部署，其中自動化部署通常使用持續集成/部署（CI/CD）工具來實現。

Angular 部屬可以使用不同的方法，這裡列舉幾種常見的方式：

- 使用 Angular CLI 部屬到 Web Server 上：Angular CLI 可以透過 ng build 命令來打包成瀏覽器可執行的檔案，然後將打包好的檔案上傳至 Web Server 上即可。通常會使用 --prod 參數來產生壓縮後的檔案。
- 使用容器化技術部屬：使用容器化技術，例如 Docker，可以讓部屬變得更為方便。可以將 Angular 應用程式打包成 Docker 映像檔，然後在任何支援 Docker 的環境中部屬應用程式。這樣可以讓部屬更為快速且可靠。
- 使用雲端服務部屬：現在有許多雲端服務提供商，例如 Amazon Web Services、Microsoft Azure、Google Cloud Platform 等，都提供了部屬 Angular 應用程式的方案。這些服務通常提供自動化的部屬流程，可以讓開發者更快速地部屬應用程式。

在部屬 Angular 應用程式時，還需要考慮安全性、效能等問題，例如使用 HTTPS、適當的快取設置等。

> 本章節沿用前列素材繼續使用

## 使用與確認 environment 環境配置
environment 是一個配置文件，用於在應用程式中存儲環境相關的屬性。在 src/environments 資料夾中，通常會有兩個配置文件：environment.ts 和 environment.prod.ts。在開發過程中，可以使用 environment.ts 文件定義環境屬性，例如 API 終點、是否啟用調試模式等等。在編譯時，可以使用 ng build 命令的 --configuration 參數來指定環境，例如：

```powershell
ng build --configuration=production
```

這會使用 environment.prod.ts 文件中的配置，以便在部署到生產環境時使用。在應用程式中可以使用 environment 對象來獲取環境相關的屬性，例如：

```typescript
import { environment } from '../environments/environment';

if (environment.production) {
  // 執行生產環境的代碼
} else {
  // 執行開發環境的代碼
}
```

當我們在使用 ng build 或 ng serve 等指令時，Angular 會自動根據目前執行的指令來載入對應的環境設定檔案。例如在開發環境中使用 ng serve 時會載入 environment.ts，而在生產環境中使用 ng build --prod 時會載入 environment.prod.ts。

舉例來說，先前 Firebase 提供的 API 金鑰原先都寫在 api 的 Query Params 之上，我們可以將此變數規劃到環境變數利於維護。為了之後部屬作業也寫到 environment.prod.ts，Angular CLI 會自動切換找到該檔案作為環境部署參數。

```typescript src\environments\environment.ts & src\environments\environment.prod.ts
export const environment = {
  production: false,
  firebaseAPIKey:'AIzaSyBD5oglUIsgkYiQlabvMw1Y8OGsGC_w6JA'
};
```
```typescript src\app\auth\auth.service.ts
import { environment } from './../../environments/environment'; // ※重點：指到開發用的檔案，若 build --prod 時 CLI 會自己切換來源
//...
export class AuthService {
  //...
  singUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBD5oglUIsgkYiQlabvMw1Y8OGsGC_w6JA',
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key'+environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.errorHandle),
      tap(response => this.AuthHandle(
        response.email,
        response.localId,
        response.idToken,
        +response.expiresIn
      ))
    );
  }

  singIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBD5oglUIsgkYiQlabvMw1Y8OGsGC_w6JA',
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.errorHandle),
      tap(response => this.AuthHandle(
        response.email,
        response.localId,
        response.idToken,
        +response.expiresIn
      ))
    );
  }
  //...
}
```

## build 部屬至靜態網站
Angular 應用程式可以通過運行 ng build 來進行部署的構建。在較舊的版本中，您需要運行 ng build --prod，但現在不再需要。自 Angular CLI 版本 8 開始，使用 ng build 指令就能產生 Production Build 的檔案，而不需要再加上--prod 參數了。這是因為在 Angular CLI 8 中，已經把預設的--prod 參數設定到了 ng build 指令裡面，所以不需要再另外指定。除非您正在使用較舊版本的 Angular，否則只需運行 ng build 即可。

要將整個網站打包，透過 CLI 指令 `ng build` 產生 dist 目錄。接著試著上傳到指定的網路站點，列舉一些免費可用的靜態網站，像是 Github 的 GitPage、Amazon 的 AWS、Firebase 的 [Hosting](https://firebase.google.com/docs/hosting?hl=zh-tw)。本教學將使用 Firebase 所提供的免費靜態網站空間作示範。

### 上傳至 Firebase
我們可以使用 Firebase 提供的 [CLI 工具](https://firebase.google.com/docs/cli?hl=zh-tw)，快速直接於 node.js 環境下透過指令將 Angular 產生的 dist 上傳到 Firebase 的免費空間。

- npm 安裝 `npm install -g firebase-tools`
- 輸入登入 `firebase login`，出現是否允許回報錯誤資訊可 n，將自動開啟瀏覽器確認 google 帳戶登入授權 firebase cli，登入完畢回到 nodejs 環境
- 執行初始化 `firebase init`，告知目前當下路徑為何以及詢問是否準備 ready，按下 Y

```nodejs
PS D:\Loki\Github\angularTraining\lokiModule> firebase init  

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  D:\Loki\Github\angularTraining\lokiModule

Before we get started, keep in mind:

  * You are initializing within an existing Firebase project directory

? Are you ready to proceed? (Y/n) 
```

- 選擇要進行 Hosting 部屬，按下空白繼續下一步

```nodejs
? Are you ready to proceed? Yes
? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 ( ) Realtime Database: Configure a security rules file for Realtime Database and (optionally) provision default instance
 ( ) Firestore: Configure security rules and indexes files for Firestore
 ( ) Functions: Configure a Cloud Functions directory and its files
>(*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ( ) Hosting: Set up GitHub Action deploys
 ( ) Storage: Configure a security rules file for Cloud Storage
 ( ) Emulators: Set up local emulators for Firebase products
(Move up and down to reveal more choices)
```

- 畫面會詢問對應遠端哪個專案目錄，我們可以共用之前為了 httpAPI 所產生的相同專案名稱 loki-Angular-Training
- 要將此專案底下哪個目錄推送至站點空間，輸入 `dist\ng-complete-guide-update`
- 詢問是否要設定 SPA，由於 Angular CLI 都已經打包好了，這部分不用處理按下 N
- 詢問是否鑰自動部屬與生成一分到 Github，簡化作業不需要可按下 N
- 該目錄底下以存在 404.html，是否要換成 firebase 的 404.html 風格，可按下 N 省略，下一步 index.html 亦同為 N

```nodejs
? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

i  Using project loki-angular-training (loki-Angular-Training)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? dist\ng-complete-guide-update
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
? File dist\ng-complete-guide-update/404.html already exists. Overwrite? No
i  Skipping write of dist\ng-complete-guide-update/404.html
? File dist\ng-complete-guide-update/index.html already exists. Overwrite? (y/N) n
```

- 輸入部屬指令 `firebase deploy`
- 畫面將產生遠端 URL，完成前往拜訪確認。

```nodejs
i  Writing configuration info to firebase.json...
i  Writing project information to .firebase...

+  Firebase initialization complete!
PS D:\Loki\Github\angularTraining\lokiModule> firebase deploy

=== Deploying to 'loki-angular-training'...

i  deploying hosting
i  hosting[loki-angular-training]: beginning deploy...
i  hosting[loki-angular-training]: found 26 files in dist\ng-complete-guide-update
+  hosting[loki-angular-training]: file upload complete
i  hosting[loki-angular-training]: finalizing version...
+  hosting[loki-angular-training]: version finalized
i  hosting[loki-angular-training]: releasing new version...
+  hosting[loki-angular-training]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/loki-angular-training/overview
Hosting URL: https://loki-angular-training.web.app
```

# 獨立元件 Standalone Components
Standalone components 是指 Angular 14+ 中可獨立存在的元件，即不需要被包含在任何模組或其他元件中，可以直接在其他地方使用。它們通常是一些通用的、簡單的、可重用的元件，例如按鈕、輸入框、彈出視窗等等。

  
與在模組中使用元件不同的是，除了需要@component 內設定為`standalone: true`之外，本身 standalone component 沒有被聲明在任何模組的 declarations 中。因此，為了在其他地方使用它，需要將其導入到該地方所在的模組中，並將其添加到該模組的 exports 中。

## 環境建置準備
本篇的起始素材放置於 GitHub 底下提供使用，使用資料目錄 lokiStandaloneComp 作為初始環境。下載請記得 npm install 初始化環境。

>[Github download](https://github.com/summer10920/angularTraining) at lokiStandaloneComp-start Folder

### 將 DetailsComponent 改為 Standalone
DetailsComponent 於素材包內，被 appModule 聲明所集合使用，因此於整份 App 應用下都能使用從此模組內獲得的元件資源。如果要將此元件形成一個獨立的資源。遵循以下設計：

- 對 DetailsComponent 的@Component 設定為 standalone: true （預設 false 可不寫），此時已成立一個獨立元件
- 由於是獨立元件不可被聲明於任何模組內，取消 AppModule 原本 declarations 處
- 若要仍保持整份 App 應用可以使用此獨立元件，就像 import 其他模組一樣看待，對 AppModule 進行 import 該 DetailsComponent
- 由於 DetailsComponent 是獨立的，因此該 DetailsComponent 無法使用來自 AppModule 所匯入的 SharedModule(HighlightDirective)
- 同上，為了讓這個獨立元件可以吃到 HighlightDirective（來自 SharedModule)，可以直接對該 DetailsComponent 做 import 此來自 SharedModule，使得這個獨立元件是透過自己獲得 Highlight 指令而不是 AppModule 那裏的 Highlight 指令（也拿不到）

```typescript src\app\welcome\details\details.component.ts
import { SharedModule } from './../../shared/shared.module';
import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/analytics.service';

@Component({
  standalone: true, // ※重點
  imports: [SharedModule], // ※重點
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) { }

  onClick() {
    this.analyticsService.registerClick();
  }
}
```
```typescript src\app\app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DetailsComponent } from './welcome/details/details.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  // declarations: [AppComponent, WelcomeComponent, DetailsComponent],
  declarations: [AppComponent, WelcomeComponent],  // ※重點
  imports: [BrowserModule, SharedModule, DetailsComponent],  // ※重點
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

>您現在可以在生產就緒的應用程序中使用獨立元件，而不是 NgModules。而且，正如本節中將展示的那樣，您也可以按需混合和匹配這些概念。但是，在所有情況下都應該使用獨立元件嗎？目前來看這可能是「不需要」。特別是對於大型、非常複雜的應用程序，原作法的 NgModules 可以減少需要編寫的樣板代碼（imports 等）。NgModules 也可以幫助結構化依賴注入、捆綁功能等。

## 也適用 Standalone Directive 獨立指令
指令也算是特別的元件，相同原理能將一個 Directive 形成一個獨立指令，素材包內 SharedModule 內只有一個 HighlightDirective 集合，我們可以用獨立指令放置於任何需要的位置。

- 將 HighlightDirective 的 @Directive 追加 `standalone: true`
- HighlightDirective 不可被聲明於任何模組，因此 SharedModule 考量內容只有 HighlightDirective，可抹除此檔案
- 任何使用 SharedModule 處 import 進行移除
- HighlightDirective 只出現於 DetailsComponent，此處 import 改為 HighlightDirective，若有其他處地方需要此獨立指令仿作 import

```typescript src\app\shared\highlight.directive.ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: true, //※重點
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = '#5f5aee';
    this.element.nativeElement.style.color = 'black';
    this.element.nativeElement.style.padding = '0.5rem';
  }
}
```
```typescript src\app\app.module.ts
// imports: [BrowserModule, SharedModule, DetailsComponent],
imports: [BrowserModule, DetailsComponent],
```
```typescript src\app\welcome\details\details.component.ts
@Component({
  standalone: true,
  // imports: [SharedModule],
  imports: [HighlightDirective],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
```

## 上層元件獨立化
探討若上層的 WelcomeComponent，是根據 AppModule 的 import 關係，使得內部渲染`<app-details></app-details>`可以得知取自哪個元件。若此時將 WelcomeComponent 也改為獨立元件，根據以下邏輯作業：

- 將 WelcomeComponent 的@Component 添設為 standalone: true
- 此時 AppModule 取消聲明改為 import 方式添入 WelcomeComponent
- 由於 WelcomeComponent 是獨立的不會去取得 AppModule 的 DetailsComponent，因此自己元件需自己取得 DetailsComponent 添設於 import
- 現在 AppModule 所 import 的 DetailsComponent 沒有人會使用到，可以移除。

```typescript src\app\welcome\welcome.component.ts
import { DetailsComponent } from './details/details.component';
import { Component } from '@angular/core';

@Component({
  standalone: true, //※重點
  imports: [DetailsComponent], //※重點，獨立元件不會取得自 AppModule 的 import
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent { }
```
```typescript src\app\app.module.ts
// ...
// import { DetailsComponent } from './welcome/details/details.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  // declarations: [AppComponent, WelcomeComponent],
  declarations: [AppComponent],
  // imports: [BrowserModule, DetailsComponent],
  imports: [BrowserModule, WelcomeComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

## AppComponent 獨立化
由於未來的開發趨勢，獨立元件將可能成為預設 true 設計方針，試著也對最上層的 AppComponent 進行獨立元件化。

- 將 AppComponent 的@Component 添設為 standalone: true
- 此時 AppModule 取消聲明改為 import 方式添入 AppComponent
- 由於 AppComponent 是獨立的不會去取得 AppModule 的 WelcomeComponent，因此自己元件需自己取得 WelcomeComponent 添設於 import
- 現在 AppModule 所 import 的 WelcomeComponent 沒有人會使用到，可以移除。
- AppModule 內的`bootstrap: [AppComponent]`因獨立化找不到此宣告，因此需要調整一下 bootstrap 方式
- 同上，來到 src\main.ts，不使用`platformBrowserDynamic().bootstrapModule(AppModule)`作為啟動，改用 bootstrapApplication 方式直接找到 AppComponent 來作為啟用元件。

platformBrowserDynamic().bootstrapModule(AppModule) 是啟動 Angular 應用程序的方法，它可以在瀏覽器中運行應用程序。在此方法中，platformBrowserDynamic 是一個函式，它會返回一個動態平臺，這個平臺提供了一些啟動和銷毀 Angular 應用程序所需的功能。這個方法還會調用 bootstrapModule 方法，將 AppModule 作為引數傳入，這將啟動整個 Angular 應用程序。AppModule 是 Angular 應用程序的根模塊，它描述了應用程序的各個部分、服務和其他功能。在啟動應用程序時，Angular 會使用 AppModule 創建應用程序的根注入器，並通過該注入器提供服務和其他功能。

簡而言之，platformBrowserDynamic().bootstrapModule(AppModule) 方法是在瀏覽器中啟動 Angular 應用程序的方法，它將 AppModule 作為根模塊，並創建應用程序的根注入器。

因此，使用獨立元件有一些變化。我們不再使用 @angular/platform-browser-dynamic 套件，而是將其重構為 @angular/platform-browser。這使我們可以使用一個名為 bootstrapApplication 的新函式，該函式需要一個 @Component，而不是 @NgModule。

```typescript src\app\app.component.ts
import { WelcomeComponent } from './welcome/welcome.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,  //※重點
  imports: [WelcomeComponent],  //※重點
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent { }
```
```typescript src\app\app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  // declarations: [AppComponent],
  // imports: [BrowserModule, WelcomeComponent],
  imports: [BrowserModule, AppComponent],
  providers: [],
  // bootstrap: [AppComponent],
})
export class AppModule { }
```
```typescript src\main.ts
// ...
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
bootstrapApplication(AppComponent);
```

## 服務與獨立元件
對於 Service 的應用範圍影響，這也適用於獨立元件使用不用調整。眾所皆知可透過於該服務內編寫 @Injectable({ providedIn: 'root' }) 達到（推薦）。也可改於 AppModule 或獨立元件內內透過添加`providers:[CustomService]`（但不太建議這樣做）。

舉例如下，調整 AnalyticsService 限定受於 DetailsComponent 獨立元件而使用產生物件。但注意的是，這些多個獨立元件之間的服務並非共享都是各自持有於不同記憶體。

```typescript src\app\shared\analytics.service.ts
// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
```
```typescript src\app\welcome\details\details.component.ts
@Component({
  standalone: true,
  imports: [HighlightDirective],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [AnalyticsService] // ※重點
})
```

另外，若你不想透過`@Injectable({ providedIn: 'root' })`方式宣告此份 Service 可供應整份應用進行共享，你可以直接寫在 bootstrapApplication 來執行預設啟動包含哪些服務。

```typescript src\main.ts
bootstrapApplication(AppComponent,{
  providers:[AnalyticsService]
});
```

## 路由與獨立元件
接下來我們將進一步討論獨立元件與路由機制的組合，因為在 Angular 的應用中會進行路由規劃。這裡切換另一個起始素材放置於 GitHub 底下提供使用，使用資料目錄 lokiStandaloneComp2 作為初始環境。下載請記得 npm install 初始化環境。

>[Github download](https://github.com/summer10920/angularTraining) at lokiStandaloneComp2-start Folder

在這份素材包當中，可以發現目前的 AppComponent 是獨立元件無法得知路由模組，因此需在 AppComponent 內將 RouterModule 進行 import。讓 AppComponent 能清楚知道 RouteModule 模組下的相關指令（例如 routerLink) 與元件（例如 router-outlet)。

```typescript src\app\app.component.ts
// ...
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  // imports: [WelcomeComponent],
  imports: [WelcomeComponent,RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
```

此時 AppComponent 可理解這些與路由相關的指令與元件，但仍不知道這些路由目標在哪。我們必須要在 bootstrapApplication 引導應用程序底下添加路由模組，雖然前面介紹這裡塞入的為 Service，但由於 Router.forRoot 這裡是一種服務工作。且還得依賴特殊內建函式 importProvidersFrom 做匯入。

```typescript
// ...
import { AppRoutingModule } from './app/app-routing.module';
import { enableProdMode, importProvidersFrom } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule)
  ],
});
```

importProvidersFrom 是 Angular 中的一個功能，它允許開發者在模組中使用匯入來自另一個模組的服務提供者，以便將依賴關係更清晰地管理並保持模組簡潔。這種方式也有助於重複使用和測試。在 Angular 中，服務提供者是一種將對象實例化並註冊在注入器中以供應用程序使用的機制。

目前的路由工作都能正常執行，包含了 Lazy Loading 作業。

## lazy Loading 與 獨立元件
接著探討獨立文件在路由模組上的做法。從 AppRoutingModule 觀察到下面代碼：

- WelcomeComponent 屬於獨立元件，以路由模組內的 routes 陣列指定一獨立元件是可執行的。
- AboutComponent 屬於一般元件，稍後會將它改為獨立元件並試著 lazy 於路由下才執行加載。
- dashboard 屬於一個延遲加載自帶路由規則子路由模組，透過 loadChildren 要求拜訪 dashboard 時才加載該子路由模組底下的兩組元件

```typescript src\app\app-routing.module.ts
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (mod) => mod.DashboardRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### 延遲加載獨立元件
獨立元件的特性可以不需要透過 loadChildren 子路由模組包裝進行延遲。我們可以用相同觀念做 loadComponent 直接延遲加載一個獨立元件。

- 將 AboutComponent 設計為獨立元件
- 將 loadChildren 轉換為 loadComponent 理念做延遲加載。

```typescript src\app\app-routing.module.ts
const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    // component: AboutComponent,
    loadComponent: () => 
      import('./about/about.component').then(mod => mod.AboutComponent),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (mod) => mod.DashboardRoutingModule
      ),
  },
];
```

檢查頁面 http://localhost:4200/about 是否有延遲效果。

### loadChildren 多個獨立元件
在 DashboardRoutingModule 我們定義路由要載入兩個一般元件，若這兩個元件也是獨立元件。我們可以直接讓 loadChildren 直接對路由 path 找到指定獨立元件，不需要透過 NgModule 的 RouterModule 方式去尋找獨立元件。

- 將 DashboardComponent 與 TodayComponent 修改為獨立元件，透過`standalone: true`參數
- 捨棄 DashboardModule 的集合，我們直接讓路由去找到此 DashboardComponent 獨立元件，且不會再匯入使用 DashboardRoutingModule
- 捨棄 DashboardRoutingModule 並另創建雷同的 dashboardRoutes 參數物件，該物件只提供 Routes 所需的兩組 path
- 回到 AppRoutingModule，對於延遲加載的路徑從 DashboardRoutingModule 改為 dashboardRoutes

```typescript src\app\dashboard\today\today.component.ts & src\app\dashboard\dashboard.component.ts
@Component({
  standalone: true,
  // ...
})
```
```typescript src\app\dashboard\dashboard.module.ts
// import { NgModule } from '@angular/core';

// import { DashboardComponent } from './dashboard.component';
// import { DashboardRoutingModule } from './dashboard-routing.module';

// @NgModule({
//   declarations: [DashboardComponent],
//   imports: [DashboardRoutingModule]
// })
// export class DashboardModule {}
```
```typescript src\app\dashboard\dashboard-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { DashboardComponent } from './dashboard.component';
// import { TodayComponent } from './today/today.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: DashboardComponent,
//   },
//   {
//     path: 'today',
//     component: TodayComponent
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class DashboardRoutingModule {}
```
```typescript src\app\dashboard\routes.ts
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TodayComponent } from './today/today.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'today',
    component: TodayComponent
  }
];
```
```typescript
const routes: Route[] = [
  // ...
  {
    path: 'dashboard',
    // loadChildren: () =>
    //   import('./dashboard/dashboard-routing.module').then(
    //     (mod) => mod.DashboardRoutingModule
    //   ),
    loadChildren: () =>
      import('./dashboard/routes').then(
        (mod) => mod.dashboardRoutes
      ),
  },
];
```

現在已清楚地了解獨立元件通常是如何工作以及如何將元件轉換為獨立元件。獨立元件內部使用時須添加到此 import 陣列中，也適用於指令或管道作為獨立，獨立元件可以擺脫 ngModule 的集合方式節省代碼量。您可以設計一些獨立元件，將獨立元件載入到 Module 中，或者在獨立元件中 import 模塊都是可行的。

不過，推薦的穩定方法是仍然使用 ngModule 來聲明這些一般元件。在未來簡化角應用程序可能將成為官方推薦的構建角形構件的方法。

# 參考文獻
- [Udemy Angular - The Complete Guide (2023 Edition)](https://www.udemy.com/course/the-complete-guide-to-angular-2/) SESSION 22, 23, 24
- [Angular - NgModules](https://angular.io/guide/ngmodules)
- [Angular - NgModule FAQ](https://angular.io/guide/ngmodule-faq)