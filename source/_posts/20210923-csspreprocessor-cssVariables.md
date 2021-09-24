---
title: '[學習之路]CSS 運用技巧系列（一） - 原生變數'
categories:
  - Zero Road
  - Web Fronted
tag:
  - CSS 變數與預處理器
date: 2021-09-23 13:13:22
---

本系列陸續介紹預處理系列，包含 SASS/SCSS、LESS、Stylus。同時會先介紹 CSS3 提供的變數與應用方式。如果你曾看過 Bootstrap 的樣式表設計，很容易看到`var()`這樣的關鍵設計。使用變數的好處在於當你未來需要集中調整同樣的視覺（例如尺寸、色系等考量），透過變數修改就能完成同步調之改變。

<!-- more -->

# CSS Variables
CSS 自定義屬性，可稱呼為 CSS 變數，主要用於當相同的屬性之值採用變數名稱（舉例：`--lokiColor:red`) 來替代，css 變數也是一種屬性需要寫在某選擇器之下。而獲取此變數的方式透過 var() 函式獲得（例如`color:var(--lokiColor)`)。

## 基本用法
css 變數使用方式非常簡單。你需要幾個步驟就能完成：

- 使用選擇器來設定變數，注意此選擇器之下之元素才能獲得此變數。通常大多數的人會使用偽類 root，放在此`:root` 內的所有元素才都能吃到共用。
- 變數的屬性命名方式為`--`為前綴（命名大小寫有區分），值為任何文字皆可，可使用一個合法常態值或純數字，作為變數內容。
- 對指定元素採用之選擇器使用屬性與值時，其值處帶入此變數內容需透過`var()`來獲取。
- css 變數僅僅是帶入變數內容回歸原本 CSS 屬性值，其繼承性與優先權上與一般屬性有相同特性存在，也適用 Media Query 內。

```html
<style>
  :root {
    --first-color: blue;
    --second-color: yellow;
  }

  #one {
    background-color: var(--first-color);
    color: var(--second-color);
  }

  #two {
    background-color: var(--second-color);
    color: var(--first-color);
  }

  #container {
    --first-color: green;
  }

  #three {
    background-color: var(--first-color);
    /*優先權來自 container 的高*/
    color: var(--second-color);
  }
</style>

<p id="one">color is yellow | bg is blue</p>
<p id="two">color is blue | bg is yellow</p>
<div id="container">
  <p id="three">color is yellow | bg is green</p>
</div>
```

變數內容也能寫在另一組變數內之特殊用途。

```css
:root {
  --first-color: blue;
  --second-color: var(--first-color);  /*blue*/
}
```

## 預設值
css 自訂變數在`var()`獲取當下，第二參數為預設值。其作用當獲取變數來源不存在時將改用指定的常值帶入。

```html
<style>
  :root {
    /* --first-color: blue; */
    --second-color: yellow;
  }

  #one {
    background-color: var(--first-color, red);
    color: var(--second-color);
  }

  #two {
    background-color: var(--second-color);
    color: var(--first-color);
  }
</style>

<p id="one">color is yellow | bg is red beacause can't find Variables Source</p>
<p id="two">color is blue | bg is yellow</p>
```

## 無效值
無效值為當變數內容無法適用於帶入之屬性時，瀏覽器會自動根據以下規則處理：

1. 檢查繼承與優先權尋找第二適應之值。
2. 若找不到第二之指定值，將回歸瀏覽器預設隻外觀。
3. 注意這裡，`var()`預設值不會列入選擇。

```html
<style>
  :root {
    --first-color: 16px;
    --second-color: yellow;
  }

  #one {
    background-color: var(--first-color, red);
    color: var(--second-color);
  }
</style>

<p id="one">color is yellow | bg is transparent by Browser Default Color</p>
```

## JavaScript 操作
可透過 JavaScript 來獲取與賦予變數，且根據 MDN 說明有以下幾點根據不同考量有不同作法。事實上方式跟 CSS 一般屬性的獲取賦予方法都相同。

```js
// 獲取方式一，如果是直接行內樣式所寫入的來查找
element.style.getPropertyValue("--my-var");

// 獲取方式二，根據完成（已套樣式表）getComputedStyle 函式來查找
getComputedStyle(element).getPropertyValue("--my-var");

// 修改方式
element.style.setProperty("--my-var", jsVar + 4);
//修改不可能寫回到 style 樣式表（唯讀），因此只能從行內樣式來增加。
```

舉例寫在樣式表的狀況。

```html
  <style>
    :root {
      --first-color: blue;
      --second-color: yellow;
    }

    #one {
      background-color: var(--first-color, red);
      color: var(--second-color);
      font-size: 2rem;
    }
  </style>

  <p id="one">color is yellow | bg is transparent by Browser Default Color</p>

  <script>
    const
      myid = document.getElementById("one"),
      myroot = document.body;

    //因為變數寫在樣式表，因此得使用 getComputedStyle() 來查找
    const
      valid = getComputedStyle(myid).getPropertyValue('--first-color'),
      valroot = getComputedStyle(myroot).getPropertyValue('--first-color');
    console.log(valid, valroot); // blue  blue

    myid.style.setProperty('--second-color','red'); //對 p#one 添加屬性 style='--second-color:red'
    console.log(myid.style.getPropertyValue('--second-color')); //red
  </script>
  ```

  ## 進階練習

  # 參考文獻
  - [使用 CSS 自定义属性（变量） - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)