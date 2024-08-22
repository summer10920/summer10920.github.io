---
title: '[學習之路] CSS 進階的原生變數'
categories:
  - Zero Road
  - Web Fronted
tag:
  - CSS
date: 2021-09-23 13:13:22
---
![](https://i.imgur.com/v8Pgkpa.png)
本系列主要重點想介紹CSS設計上你該有更好的處理方式來設計，包含你應該熟悉CSS所提供的原生變數、可預處理的Script編譯語言、可預後處理的擴展工具輔助。本第一篇將先會先介紹 CSS3 提供的變數與應用方式來說明。

<!-- more -->

如果你曾看過 `bootstrap.css` 的樣式表設計，很容易看到`var()`這樣的關鍵設計。使用變數的好處在於當你未來需要集中調整同樣的視覺（例如尺寸、色系等考量），透過變數修改就能完成同步調之改變。


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
    /*高優先權來自 container*/
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
無效值為當變數內容（單位不符合或錯誤字串）無法適用於屬性帶入時，瀏覽器會自動根據以下規則處理：

1. 檢查繼承與優先權尋找第二適應之值。
2. 若找不到第二之指定值，將回歸瀏覽器預設外觀。
3. 注意這裡，`var()`所指定預設值不會列入考量，因為整個 var 作廢不成立。

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

## 搭配 calc 用法
除了自訂變數能夠統一數值的套用，可以延伸更方便的去設計。假設元素自身持有變數`--i:5`，再搭配`calc()`之變數帶入就能獲得邏輯性的不同數值輸出。以下 2 組範例就是利用多個相同外觀元素搭配自身獨有的數字整合出不同的視覺角度與延遲動畫：

### 範例一
這裡示範一個 loading 動畫。

1. 先將空間上的小球 span 固定在 12 時針方向重疊。
2. 與先綁定各自參數 1~5，方便之後做計算使用。
```html demo1.html
<div class="win10 loading1">
  <span style="--i:1"></span>
  <span style="--i:2"></span>
  <span style="--i:3"></span>
  <span style="--i:4"></span>
  <span style="--i:5"></span>
</div>
```
```css style.css
.win10 {
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 50%;
}

.win10 span {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: lightseagreen;
  left: 45px;
  top: 5px;
  transform-origin: center 45px;
}
```
3. 其次，套入一個可旋轉的動畫使這些小球自轉一圈。
4. 透過動畫延遲，使用 calc 進行參數乘法，差異結果獲得 0.1s, 0.2s, 0.3s.... 等數值（負數是為了反序）
5. 另外也能對透明度做出 calc 結果差異 0.2,0.4,0.8....1
```css style.css
.loading1 span {
  animation: run 3s ease-in-out infinite;
  opacity: calc(var(--i) * 0.2);
  animation-delay: calc(var(--i) * -0.1s);
}

@keyframes run {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
```

### 範例二
接著上面的形狀做另一種示範。

1. 沿用`.win10>span`的外觀跟定位設計。
2. 小球新增數量至 12 組，參數為 0~11。
```html demo2.html
<div class="win10 loading2">
  <span style="--i:0"></span>
  <span style="--i:1"></span>
  <span style="--i:2"></span>
  <span style="--i:3"></span>
  <span style="--i:4"></span>
  <span style="--i:5"></span>
  <span style="--i:6"></span>
  <span style="--i:7"></span>
  <span style="--i:8"></span>
  <span style="--i:9"></span>
  <span style="--i:10"></span>
  <span style="--i:11"></span>
</div>
```
3. 接著改用另一組動畫，主要是控制透明度。
4. 透過變數計算數每個 span 的旋轉角度，也就是時鐘位置 0deg ~ 330 deg
5. 再搭配動畫延遲介於 0s ~ 1.1s
```css style.css
.loading2 span {
  animation: light 1.2s ease-in-out infinite;
  transform: rotate(calc(30deg * var(--i)));
  animation-delay: calc(var(--i)* 0.1s);
}

@keyframes light {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
```

### 實體效果
只要善用 calc 帶入特定數字就能算出獨立且邏輯性的數值。綁定相同的外觀且差異性。

{% codepen summer10920 ExXOLxa [html,css,result 250 %}

# 參考文獻
  - [使用 CSS 自定义属性（变量） - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)