---
title: "[學習之路] TypeScript 的基礎知識"
categories:
  - Zero Road
  - Web Fronted
tag:
  - TypeScript
date: 2021-08-25 13:31:03
# hidden: true
---
![](https://i.imgur.com/VL6vpbF.png)
微軟所提供的一種程式語言，主要是解決 JavaScript 的一些設計問題所存在，可以當做它是一種 JS 預處理前的程式階段並透過編譯 complier 後轉為 JavaScript。TS 的語法更嚴謹規範能改善解決編寫 JS 因太過自由而遇到的問題。
<!-- more -->

TypeScript 的存在來自於 JavaScript 的問題性改善：

1. 自由的型態 type
由於 JavaScript 採用動態型態方式特別自由不受限制，容易發生預期以外之型態結果；TypeScript 採用靜態型別模式，在使用變數時就必需指定型別做為指定。

2. 變數領域規劃
JavaScript 的變數只能作為全域變數或區間變數使用，無法在某物件或類別 class 內使用。

3. 物件導向邏輯不同
JavaScript 的物件導向觀念採用獨特的原生鍊 Prototype Based 類型並非屬於程式領域中正規的 Class Based 之觀念。因此很多程式設計者無法套用原本已熟悉的物件導向觀念做功能使用；TypeScript 則可使用 Class Based 觀念並加以使用，像是 classs 繼承與介面等正規物件導向功能，更適合大型專案開發所用。

# 安裝
可從 [官方網站](https://www.typescriptlang.org/zh/) 深入了解並下載，這裡使用 npm 來獲得安裝

```npm npm
npm install typescript -g
```
>這裡需參數 g 來安裝到主機上而不是專案目錄下

## 測試
試著在專案內新增一筆檔案 `test.ts`，跟著輸入以下代碼。完成後透過終端機指令 `tsc test.tsc` 會進行編譯成 `test.js` 能觀察出以下編譯前後的差別

{% tabs tsvsjs %} 名字为tab，默认在第1个选项卡，如果是-1则隐藏
<!-- tab test.ts <br>(TypeScript Code)-->
```ts test.ts
class loki {
  constructor(public title: string, public msg: string) { }
  print() {
    return `
      <h1>${this.title}</h1>
      <p>${this.msg}</p>`;
  }
};
const msg: loki = new loki("TITLE", "MESSAGE");
document.write(msg.print());
```
<!-- endtab -->
<!-- tab test.js <br>(TypeScript to JavaScript)-->
```js test.js
var loki = /** @class */ (function () {
    function loki(title, msg) {
        this.title = title;
        this.msg = msg;
    }
    loki.prototype.print = function () {
        return "\n      <h1>" + this.title + "</h1>\n      <p>" + this.msg + "</p>";
    };
    return loki;
}());
;
var msg = new loki("TITLE", "MESSAGE");
document.write(msg.print());
```
<!-- endtab -->
<!--tab testbyES6.js<br>(改用ES6觀念的寫法)-->
```js testbyES6.js
class loki {
  constructor(title, msg) {
    this.title = title;
    this.msg = msg;
  }
  print() {
    return `
      <h1>${this.title}</h1>
      <p>${this.msg}</p>`;
  }
};
const msg = new loki("TITLE", "MESSAGE");
document.write(msg.print());
```
<!-- endtab -->
{% endtabs %}

從上列可知道以下觀念(觀察TypeScript與JavaScriptES6)：
- 編寫class的程式觀念上，使用TypeScript更直覺操作。畢竟JS的寫法不是標準的class而是函式
- TypeScript主要是協助開發者完成代碼後轉換成JavaScript能理解的寫法
- TypeScript對於變數的型態宣告有強迫性，這是為了幫助開發者風險降低
- TypeScript的主要用途是讓開發者寫得更簡短與穩定，不是為了取代JavsScript標準

{% note info %}
**VSCode內建TypeScript**：
使用VScode的開發者，可以不使用tsc來直接執行編譯。設定如下：
{% endnote %}

> 