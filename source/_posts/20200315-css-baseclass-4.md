---
title: "[基礎課程] CSS 教學（四）：現代布局技術 - Float、FlexBox、Grid"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - CSS 布局
  - FlexBox
  - CSS Grid
date: 2020-03-15 14:23:57
---

![](assets/images/lElmG8a.png)

本篇將深入探討現代 CSS 布局技術，從傳統的 Float 開始，重點介紹目前主流的 FlexBox 和 CSS Grid 技術。您將學會如何選擇適合的布局方法，掌握一維和二維布局的核心概念，並能夠設計出現代化的響應式網頁布局。

<!-- more -->

{% note warning %}
**重要提醒**
本文將說明 Float 的基本概念，但在現代網頁開發中，**強烈建議使用 FlexBox 和 Grid 進行布局設計**。Float 主要用於文繞圖效果，而非頁面布局。
{% endnote %}

# 浮動 Float - 傳統技術

Float 最初是為了實現文繞圖效果而設計的 CSS 屬性。雖然過去常用於布局，但現在主要用途僅限於文繞圖。

## 核心特性

Float 會讓元素產生浮動行為，脫離正常的文件流，並緊貼到指定的方向。

1. 浮動元素會變成 block 性質
2. 其他元素會環繞浮動元素（文繞圖效果）
3. 父容器可能會失去高度（高度塌陷）

```html index.html
  <style>
    .container {
    width: 400px;
    margin: 0 auto;
    border: 2px solid #333;
    padding: 20px;
  }

  .float-image {
      float: right;
    margin: 0 0 10px 10px;
    border-radius: 8px;
  }

  .text-content {
    text-align: justify;
    line-height: 1.6;
    }
  </style>

  <div class="container">
  <h2>文繞圖範例</h2>
  <img src="https://picsum.photos/150/150/?random=1" alt="示例圖片" class="float-image">
  <div class="text-content">
    <p>這是一段示例文字，用來展示文繞圖的效果。當圖片設定為 float: right 時，文字會自動環繞在圖片周圍，形成美觀的排版效果。</p>
    <p>這種技術在文章排版、部落格文章或新聞網站中非常常見，能夠有效利用空間並提升視覺效果。</p>
  </div>
```

## 高度塌陷問題與解決方案

當所有子元素都浮動時，父容器會失去高度。

{% note primary %}
**素材準備：觀察高度塌陷現象**
以下範例展示了高度塌陷問題及其解決方案。
{% endnote %}

```html float-collapse.html
<style>
  .container {
    width: 600px;
    margin: 20px auto;
    border: 3px solid #e74c3c;
    background: #f8f9fa;
  }

  .float-item {
    float: left;
    width: 180px;
    height: 120px;
    margin: 10px;
    background: #3498db;
    color: white;
    text-align: center;
    line-height: 120px;
    border-radius: 8px;
  }

  /* 解決方案：使用 clearfix */
  .clearfix::after {
    content: "";
    display: table;
    clear: both;
  }
</style>

<!-- 問題：高度塌陷 -->
<div class="container">
  <div class="float-item">項目 1</div>
  <div class="float-item">項目 2</div>
  <div class="float-item">項目 3</div>
</div>

<!-- 解決方案：使用 clearfix -->
<div class="container clearfix">
  <div class="float-item">項目 1</div>
  <div class="float-item">項目 2</div>
  <div class="float-item">項目 3</div>
</div>
```

{% note danger %}
**Float 布局的問題**
- 高度塌陷需要額外處理
- 響應式設計困難
- 代碼複雜且難以維護
- **現代開發不建議用於布局**
{% endnote %}

## 舊技術 - 使用 float 排版
這是早期使用 float 技術完成 1024x768 的版面 container 切版的範例，他沒有良好的響應式功能，包含以下四個區塊 header、left、right、footer。

{% tabs float,1 %}
<!-- tab 代碼-->
```css
.container{
  font-family: "Microsoft JhengHei";
  width: 1024px;
  height: 768px;
  border: 1px solid #000;
  color: white;
  font-size: 3rem;
  text-align: center;
}

.header {
  width: 1024px;
  height: 100px;
  background: #000;
  /* line-height: 100px; */
}
.left {
  width: 200px;
  height: 568px;
  background: #aaa;
  float: left;
  /* line-height: 568px; */
}
.right {
  width: 824px;
  height: 568px;
  background: #777;
  float: right;
  /* line-height: 568px; */
}
.footer {
  width: 1024px;
  height: 100px;
  background: #000;
  clear: both;
  /* line-height: 100px; */
}
```
```html
<div class="container">
  <div class="header">Header</div>
  <div class="left">Left</div>
  <div class="right">Right</div>
  <div class="footer">Footer</div>
</div>
```
<!-- endtab -->
<!-- tab 預覽-->
{% jsfiddle summer10920/dj67rhsm result dark 100% 1024 %}
<!-- endtab -->
{% endtabs %}

# 彈性盒子 FlexBox

FlexBox（彈性盒子）是 CSS3 推出的革命性布局技術，專門用於一維布局（水平或垂直方向）。它不僅能輕鬆解決傳統布局的痛點，更帶來了全新的思維模式和強大的彈性特性。

## 為什麼要使用 FlexBox？
在深入學習 FlexBox 之前，讓我們先了解它為什麼如此重要。FlexBox 的出現徹底改變了 CSS 布局的遊戲規則，解決了多年來困擾開發者的布局難題。

### 傳統布局的痛點
在 FlexBox 出現之前，CSS 布局存在許多挑戰：

1. **垂直居中困難**：需要複雜的技巧才能實現簡單的垂直居中
2. **等高布局複雜**：實現等高欄位需要許多 hack 技巧
3. **空間分配不靈活**：無法簡單地讓元素自動分配剩餘空間
4. **響應式設計困難**：需要大量的媒體查詢和複雜的計算

### FlexBox 的革命性優勢

{% note info %}
**FlexBox 的核心價值**
- **彈性**：項目可以自動伸縮以適應容器大小
- **對齊**：提供強大的對齊控制能力
- **順序**：可以改變項目的顯示順序而不修改 HTML
- **響應式**：天生適合響應式設計
{% endnote %}

```html flexbox-advantage.html
<style>
  .traditional-layout {
    width: 100%;
    background: #f8f9fa;
    padding: 20px;
    margin-bottom: 20px;
  }

  .traditional-layout .item {
    float: left;
    width: 33.333%;
    box-sizing: border-box;
    padding: 10px;
    background: #dc3545;
    color: white;
    text-align: center;
  }

  .traditional-layout::after {
    content: "";
    display: table;
    clear: both;
  }

  .flex-layout {
    display: flex;
    gap: 20px;
    background: #f8f9fa;
    padding: 20px;
  }

  .flex-layout .item {
    flex: 1;
    padding: 10px;
    background: #28a745;
    color: white;
    text-align: center;
  }
</style>

<!-- 傳統布局 -->
<div class="traditional-layout">
  <div class="item">項目 1</div>
  <div class="item">項目 2</div>
  <div class="item">項目 3</div>
  </div>

<!-- FlexBox 布局 -->
<div class="flex-layout">
  <div class="item">項目 1</div>
  <div class="item">項目 2</div>
  <div class="item">項目 3</div>
  </div>
```

## 盒子模型的變化與核心概念
當我們設定 `display: flex` 時，不僅改變了容器的行為，更重要的是對所有子元素產生了根本性的影響。理解這些變化是掌握 FlexBox 的關鍵基礎。

### FlexBox 對子元素的影響
當容器設定 `display: flex` 時，所有直接子元素都會發生根本性的變化：

{% note warning %}
**重要變化**
1. **行內元素自動變成塊級行為**：`span`、`a` 等行內元素會具有類似 `block` 的特性
2. **可設定寬高**：原本不能設定寬高的行內元素現在可以設定
3. **垂直對齊改變**：`vertical-align` 屬性失效，改用 `align-items` 和 `align-self`
4. **浮動失效**：`float` 和 `clear` 屬性對 flex 項目無效
5. **絕對定位影響**：`position: absolute` 會讓元素脫離 flex 流
{% endnote %}

```html box-model-change.html
<style>
  .demo-container {
    margin: 20px 0;
    padding: 20px;
    border: 2px solid #dee2e6;
  }

  .normal-container {
    background: #f8f9fa;
  }

  .flex-container {
    display: flex;
    gap: 10px;
    background: #e9ecef;
  }

  .inline-item {
    background: #007bff;
    color: white;
    padding: 10px;
    margin: 5px;
    border-radius: 4px;
  }

  .flex-container .inline-item {
    /* 在 flex 容器中，這些行內元素現在可以設定寬高 */
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<h4>一般容器中的行內元素</h4>
<div class="demo-container normal-container">
  <span class="inline-item">Span 1</span>
  <a href="#" class="inline-item">Link 2</a>
  <em class="inline-item">Em 3</em>
  </div>

<h4>Flex 容器中的行內元素</h4>
<div class="demo-container flex-container">
  <span class="inline-item">Span 1</span>
  <a href="#" class="inline-item">Link 2</a>
  <em class="inline-item">Em 3</em>
</div>
```

### 主軸與交叉軸的深入理解

FlexBox 的核心在於「軸」的概念，這決定了所有布局行為。理解軸的運作方式是掌握 FlexBox 的關鍵。

![Image](https://i.imgur.com/ZifNSdl.png)

{% note info %}
**軸的基本概念**
- **主軸（Main Axis）**：Flex 項目的主要排列方向
- **交叉軸（Cross Axis）**：與主軸垂直的方向  
- **主軸起點（Main Start）**：主軸的開始位置
- **主軸終點（Main End）**：主軸的結束位置
- **交叉軸起點（Cross Start）**：交叉軸的開始位置
- **交叉軸終點（Cross End）**：交叉軸的結束位置
{% endnote %}

```html axis-concept.html
<style>
  .axis-demo {
    display: flex;
    height: 200px;
    background: #f8f9fa;
    margin: 20px 0;
    border: 2px solid #007bff;
    position: relative;
  }

  .axis-demo::before {
    content: attr(data-direction);
    position: absolute;
    top: -30px;
    left: 0;
    font-weight: bold;
    color: #007bff;
  }

  .axis-item {
    background: #28a745;
    color: white;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
    min-width: 80px;
  }

  .row-demo {
    flex-direction: row;
  }

  .column-demo {
    flex-direction: column;
  }

  .row-reverse-demo {
    flex-direction: row-reverse;
  }

  .column-reverse-demo {
    flex-direction: column-reverse;
  }
</style>

<div class="axis-demo row-demo" data-direction="flex-direction: row（預設）">
  <div class="axis-item">1</div>
  <div class="axis-item">2</div>
  <div class="axis-item">3</div>
</div>

<div class="axis-demo column-demo" data-direction="flex-direction: column">
  <div class="axis-item">1</div>
  <div class="axis-item">2</div>
  <div class="axis-item">3</div>
</div>

<div class="axis-demo row-reverse-demo" data-direction="flex-direction: row-reverse">
  <div class="axis-item">1</div>
  <div class="axis-item">2</div>
  <div class="axis-item">3</div>
</div>

<div class="axis-demo column-reverse-demo" data-direction="flex-direction: column-reverse">
  <div class="axis-item">1</div>
  <div class="axis-item">2</div>
  <div class="axis-item">3</div>
</div>
```

## 父容器屬性完整指南

FlexBox 的父容器提供了 8 個核心屬性，每個都有其特定的用途和效果。掌握這些屬性是運用 FlexBox 的關鍵所在。

### 1. display 屬性

設定元素為 flex 容器，啟用 FlexBox 布局系統。

{% note primary %}
**預設值：block、inline 等**
元素預設不是 flex 容器，需要明確設定 `display: flex` 或 `display: inline-flex` 才能啟用 FlexBox。
{% endnote %}

```css
/* 設定 Flex 容器 */
.container {
  display: flex;        /* 塊級 flex 容器 */
  display: inline-flex; /* 行內 flex 容器 */
}
```

### 2. flex-direction 屬性

控制主軸的方向，決定 flex 項目的排列方向：

{% note primary %}
**預設值：row**
項目預設在水平方向從左到右排列。
{% endnote %}

```html flex-direction-demo.html
<style>
  .direction-container {
    display: flex;
    height: 150px;
    background: #e9ecef;
    margin: 15px 0;
    border: 2px solid #495057;
    padding: 10px;
  }

  .direction-item {
    background: #007bff;
    color: white;
    padding: 15px;
    margin: 5px;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
  }

  .row { flex-direction: row; }
  .row-reverse { flex-direction: row-reverse; }
  .column { flex-direction: column; }
  .column-reverse { flex-direction: column-reverse; }
</style>

<h4>flex-direction: row（預設）</h4>
<div class="direction-container row">
  <div class="direction-item">1</div>
  <div class="direction-item">2</div>
  <div class="direction-item">3</div>
</div>

<h4>flex-direction: row-reverse</h4>
<div class="direction-container row-reverse">
  <div class="direction-item">1</div>
  <div class="direction-item">2</div>
  <div class="direction-item">3</div>
</div>

<h4>flex-direction: column</h4>
<div class="direction-container column">
  <div class="direction-item">1</div>
  <div class="direction-item">2</div>
  <div class="direction-item">3</div>
</div>

<h4>flex-direction: column-reverse</h4>
<div class="direction-container column-reverse">
  <div class="direction-item">1</div>
  <div class="direction-item">2</div>
  <div class="direction-item">3</div>
</div>
```

### 3. flex-wrap 屬性

控制 flex 項目是否換行：

{% note primary %}
**預設值：nowrap**
項目預設不換行，會在一行內壓縮以適應容器寬度。
{% endnote %}

```html flex-wrap-demo.html
<style>
  .wrap-container {
    display: flex;
    width: 400px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    padding: 10px;
    margin: 15px 0;
  }

  .wrap-item {
    background: #28a745;
    color: white;
    padding: 15px;
    margin: 5px;
    border-radius: 4px;
    text-align: center;
    width: 120px;
  }

  .nowrap { flex-wrap: nowrap; }
  .wrap { flex-wrap: wrap; }
  .wrap-reverse { flex-wrap: wrap-reverse; }
</style>

<h4>flex-wrap: nowrap（預設）</h4>
<div class="wrap-container nowrap">
  <div class="wrap-item">項目 1</div>
  <div class="wrap-item">項目 2</div>
  <div class="wrap-item">項目 3</div>
  <div class="wrap-item">項目 4</div>
</div>

<h4>flex-wrap: wrap</h4>
<div class="wrap-container wrap">
  <div class="wrap-item">項目 1</div>
  <div class="wrap-item">項目 2</div>
  <div class="wrap-item">項目 3</div>
  <div class="wrap-item">項目 4</div>
</div>

<h4>flex-wrap: wrap-reverse</h4>
<div class="wrap-container wrap-reverse">
  <div class="wrap-item">項目 1</div>
  <div class="wrap-item">項目 2</div>
  <div class="wrap-item">項目 3</div>
  <div class="wrap-item">項目 4</div>
</div>
```

### 4. flex-flow 屬性

`flex-flow` 是 `flex-direction` 和 `flex-wrap` 的簡寫：

{% note primary %}
**預設值：row nowrap**
等同於 `flex-direction: row` 和 `flex-wrap: nowrap`。
{% endnote %}

```css
.container {
  flex-flow: row wrap;           /* 等同於 flex-direction: row; flex-wrap: wrap; */
  flex-flow: column nowrap;      /* 等同於 flex-direction: column; flex-wrap: nowrap; */
  flex-flow: row-reverse wrap;   /* 等同於 flex-direction: row-reverse; flex-wrap: wrap; */
}
```

### 5. justify-content 屬性

控制項目在主軸上的對齊方式：

{% note primary %}
**預設值：flex-start**
項目預設對齊到主軸的起始位置（通常是左邊）。
{% endnote %}

```html justify-content-demo.html
<style>
  .justify-container {
    display: flex;
    height: 100px;
    background: #e3f2fd;
    margin: 15px 0;
    border: 2px solid #2196f3;
    padding: 10px;
  }

  .justify-item {
    background: #2196f3;
    color: white;
    padding: 15px;
    margin: 5px;
    border-radius: 4px;
    text-align: center;
    width: 80px;
  }

  .flex-start { justify-content: flex-start; }
  .flex-end { justify-content: flex-end; }
  .center { justify-content: center; }
  .space-between { justify-content: space-between; }
  .space-around { justify-content: space-around; }
  .space-evenly { justify-content: space-evenly; }
</style>

<h4>justify-content: flex-start（預設）</h4>
<div class="justify-container flex-start">
  <div class="justify-item">A</div>
  <div class="justify-item">B</div>
  <div class="justify-item">C</div>
</div>

<h4>justify-content: flex-end</h4>
<div class="justify-container flex-end">
  <div class="justify-item">A</div>
  <div class="justify-item">B</div>
  <div class="justify-item">C</div>
</div>

<h4>justify-content: center</h4>
<div class="justify-container center">
  <div class="justify-item">A</div>
  <div class="justify-item">B</div>
  <div class="justify-item">C</div>
</div>

<h4>justify-content: space-between</h4>
<div class="justify-container space-between">
  <div class="justify-item">A</div>
  <div class="justify-item">B</div>
  <div class="justify-item">C</div>
</div>

<h4>justify-content: space-around</h4>
<div class="justify-container space-around">
  <div class="justify-item">A</div>
  <div class="justify-item">B</div>
  <div class="justify-item">C</div>
</div>

<h4>justify-content: space-evenly</h4>
<div class="justify-container space-evenly">
  <div class="justify-item">A</div>
  <div class="justify-item">B</div>
  <div class="justify-item">C</div>
</div>
```

### 6. align-items 屬性

控制項目在交叉軸上的對齊方式：

{% note primary %}
**預設值：stretch**
項目預設會拉伸以填滿交叉軸方向的空間。
{% endnote %}

```html align-items-demo.html
<style>
  .align-items-container {
    display: flex;
    height: 150px;
    background: #f3e5f5;
    margin: 15px 0;
    border: 2px solid #9c27b0;
    padding: 10px;
  }

  .align-items-item {
    background: #9c27b0;
    color: white;
    padding: 15px;
    margin: 5px;
    border-radius: 4px;
    text-align: center;
    width: 80px;
  }

  .align-items-item:nth-child(2) {
    height: 80px;
  }

  .align-items-item:nth-child(3) {
    height: 120px;
  }

  .stretch { align-items: stretch; }
  .flex-start { align-items: flex-start; }
  .flex-end { align-items: flex-end; }
  .center { align-items: center; }
  .baseline { align-items: baseline; }
</style>

<h4>align-items: stretch（預設）</h4>
<div class="align-items-container stretch">
  <div class="align-items-item">A</div>
  <div class="align-items-item">B</div>
  <div class="align-items-item">C</div>
</div>

<h4>align-items: flex-start</h4>
<div class="align-items-container flex-start">
  <div class="align-items-item">A</div>
  <div class="align-items-item">B</div>
  <div class="align-items-item">C</div>
</div>

<h4>align-items: flex-end</h4>
<div class="align-items-container flex-end">
  <div class="align-items-item">A</div>
  <div class="align-items-item">B</div>
  <div class="align-items-item">C</div>
</div>

<h4>align-items: center</h4>
<div class="align-items-container center">
  <div class="align-items-item">A</div>
  <div class="align-items-item">B</div>
  <div class="align-items-item">C</div>
</div>

<h4>align-items: baseline</h4>
<div class="align-items-container baseline">
  <div class="align-items-item">A</div>
  <div class="align-items-item">B</div>
  <div class="align-items-item">C</div>
</div>
```

### 7. align-content 屬性

控制多行項目在交叉軸上的對齊方式（只在多行時有效）：

{% note primary %}
**預設值：stretch**
多行項目預設會拉伸以填滿交叉軸方向的空間。
{% endnote %}

```html align-content-demo.html
<style>
  .align-content-container {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    height: 200px;
    background: #e8f5e8;
    margin: 15px 0;
    border: 2px solid #4caf50;
    padding: 10px;
  }

  .align-content-item {
    background: #4caf50;
    color: white;
    padding: 15px;
    margin: 5px;
    border-radius: 4px;
    text-align: center;
    width: 80px;
  }

  .stretch { align-content: stretch; }
  .flex-start { align-content: flex-start; }
  .flex-end { align-content: flex-end; }
  .center { align-content: center; }
  .space-between { align-content: space-between; }
  .space-around { align-content: space-around; }
</style>

<h4>align-content: stretch（預設）</h4>
<div class="align-content-container stretch">
  <div class="align-content-item">1</div>
  <div class="align-content-item">2</div>
  <div class="align-content-item">3</div>
  <div class="align-content-item">4</div>
  <div class="align-content-item">5</div>
</div>

<h4>align-content: flex-start</h4>
<div class="align-content-container flex-start">
  <div class="align-content-item">1</div>
  <div class="align-content-item">2</div>
  <div class="align-content-item">3</div>
  <div class="align-content-item">4</div>
  <div class="align-content-item">5</div>
</div>

<h4>align-content: center</h4>
<div class="align-content-container center">
  <div class="align-content-item">1</div>
  <div class="align-content-item">2</div>
  <div class="align-content-item">3</div>
  <div class="align-content-item">4</div>
  <div class="align-content-item">5</div>
</div>

<h4>align-content: space-between</h4>
<div class="align-content-container space-between">
  <div class="align-content-item">1</div>
  <div class="align-content-item">2</div>
  <div class="align-content-item">3</div>
  <div class="align-content-item">4</div>
  <div class="align-content-item">5</div>
</div>
```

### 8. gap 屬性

控制項目之間的間距：

{% note primary %}
**預設值：0**
項目之間預設沒有間距。
{% endnote %}

```html gap-demo.html
<style>
  .gap-container {
    display: flex;
    flex-wrap: wrap;
    background: #fff3e0;
    margin: 15px 0;
    border: 2px solid #ff9800;
    padding: 10px;
  }

  .gap-item {
    background: #ff9800;
    color: white;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    width: 80px;
  }

  .gap-10 { gap: 10px; }
  .gap-20 { gap: 20px; }
  .gap-row-col { gap: 10px 20px; } /* row-gap column-gap */
</style>

<h4>gap: 10px</h4>
<div class="gap-container gap-10">
  <div class="gap-item">1</div>
  <div class="gap-item">2</div>
  <div class="gap-item">3</div>
  <div class="gap-item">4</div>
</div>

<h4>gap: 20px</h4>
<div class="gap-container gap-20">
  <div class="gap-item">1</div>
  <div class="gap-item">2</div>
  <div class="gap-item">3</div>
  <div class="gap-item">4</div>
</div>

<h4>gap: 10px 20px（行間距 列間距）</h4>
<div class="gap-container gap-row-col">
  <div class="gap-item">1</div>
  <div class="gap-item">2</div>
  <div class="gap-item">3</div>
  <div class="gap-item">4</div>
  <div class="gap-item">5</div>
  <div class="gap-item">6</div>
</div>
```

## 子元素屬性完整指南
掌握了父容器的 8 個屬性後，我們需要了解子元素（flex 項目）的屬性。這 6 個屬性讓我們能夠精確控制每個項目的行為，實現更靈活的布局效果。

### flex-basis 屬性

`flex-basis` 是 flex 項目的基礎尺寸，決定了項目在主軸方向上的初始大小。理解它與 `width` 和 `height` 的關係是掌握 FlexBox 的關鍵。

{% note primary %}
**預設值：auto**
當 `flex-basis` 為 `auto` 時，會檢查項目是否有明確的 `width` 或 `height`，如果有就使用該值，沒有則根據內容自動調整。
{% endnote %}

#### 與 width/height 的優先考量

```html flex-basis-priority.html
<style>
  .basis-priority-demo {
    display: flex;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    padding: 20px;
    margin: 20px 0;
    gap: 10px;
  }

  .basis-item {
    background: #007bff;
    color: white;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
  }

  .item-width-only {
    width: 150px;
  }

  .item-basis-only {
    flex-basis: 200px;
  }

  .item-both {
    width: 100px;
    flex-basis: 250px; /* flex-basis 優先級更高 */
  }
</style>

<div class="basis-priority-demo">
  <div class="basis-item item-width-only">寬度 150px</div>
  <div class="basis-item item-basis-only">flex-basis 200px</div>
  <div class="basis-item item-both">寬度 100px<br>flex-basis 250px</div>
</div>
```

{% note info %}
**flex-basis 的優先級法則**
1. **有 flex-basis 時**：flex-basis 優先於 width/height
2. **flex-basis 為 auto**：使用 width/height 的值
3. **都沒有時**：根據內容自動調整
4. **主軸方向**：水平時影響寬度，垂直時影響高度
{% endnote %}

#### flex-basis 的各種值

```html flex-basis-values.html
<style>
  .basis-values-demo {
    display: flex;
    background: #e9ecef;
    border: 2px solid #495057;
    padding: 20px;
    margin: 20px 0;
    gap: 10px;
  }

  .basis-values-item {
    background: #6c757d;
    color: white;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
  }

  .basis-auto {
    flex-basis: auto;
    width: 120px;
  }

  .basis-0 {
    flex-basis: 0;
    width: 120px;
  }

  .basis-content {
    flex-basis: content;
  }

  .basis-fixed {
    flex-basis: 200px;
  }

  .basis-percent {
    flex-basis: 30%;
  }
</style>

<div class="basis-values-demo">
  <div class="basis-values-item basis-auto">auto<br>（使用 width）</div>
  <div class="basis-values-item basis-0">0<br>（忽略 width）</div>
  <div class="basis-values-item basis-content">content<br>（內容決定）</div>
  <div class="basis-values-item basis-fixed">200px<br>（固定大小）</div>
  <div class="basis-values-item basis-percent">30%<br>（百分比）</div>
</div>
```

### flex-grow 屬性

`flex-grow` 控制項目如何分配**剩餘空間**。只有當容器有多餘空間時，這個屬性才會生效。

{% note primary %}
**預設值：0**
預設情況下，項目不會伸長來填滿剩餘空間，保持其原有尺寸。
{% endnote %}

#### 剩餘空間的分配邏輯

```html flex-grow-logic.html
<style>
  .grow-logic-demo {
    display: flex;
    width: 600px;
    background: #e3f2fd;
    border: 2px solid #2196f3;
    padding: 20px;
    margin: 20px 0;
    gap: 10px;
  }

  .grow-logic-item {
    background: #2196f3;
    color: white;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    flex-basis: 100px; /* 基礎尺寸都是 100px */
  }

  .grow-0 { flex-grow: 0; background: #f44336; }
  .grow-1 { flex-grow: 1; background: #4caf50; }
  .grow-2 { flex-grow: 2; background: #ff9800; }
  .grow-3 { flex-grow: 3; background: #9c27b0; }
</style>

<div class="grow-logic-demo">
  <div class="grow-logic-item grow-0">flex-grow: 0</div>
  <div class="grow-logic-item grow-1">flex-grow: 1</div>
  <div class="grow-logic-item grow-2">flex-grow: 2</div>
  <div class="grow-logic-item grow-3">flex-grow: 3</div>
</div>
```

#### 比例分配的計算方式

```html grow-calculation.html
<style>
  .calculation-demo {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .demo-container {
    display: flex;
    width: 500px;
    background: #ffffff;
    border: 3px solid #007bff;
    padding: 10px;
    margin: 15px auto;
    gap: 10px;
  }

  .demo-item {
    background: #28a745;
    color: white;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    flex-basis: 80px;
    transition: all 0.3s ease;
  }

  .demo-1 .demo-item:nth-child(1) { flex-grow: 1; }
  .demo-1 .demo-item:nth-child(2) { flex-grow: 2; }
  .demo-1 .demo-item:nth-child(3) { flex-grow: 3; }

  .demo-2 .demo-item:nth-child(1) { flex-grow: 2; }
  .demo-2 .demo-item:nth-child(2) { flex-grow: 2; }
  .demo-2 .demo-item:nth-child(3) { flex-grow: 2; }

  .demo-item:nth-child(1) { background: #dc3545; }
  .demo-item:nth-child(2) { background: #ffc107; color: #212529; }
  .demo-item:nth-child(3) { background: #17a2b8; }

  .calculation-note {
    background: #e7f3ff;
    padding: 15px;
    border-radius: 6px;
    margin: 10px 0;
    font-size: 0.9rem;
  }
</style>

<div class="calculation-demo">
  <h5>計算範例：容器寬度 500px，每個項目 flex-basis: 80px</h5>
  
  <div class="calculation-note">
    <strong>剩餘空間 = 500px - (3 × 80px) - 間距 = 340px</strong>
  </div>

  <div class="demo-container demo-1">
    <div class="demo-item">1</div>
    <div class="demo-item">2</div>
    <div class="demo-item">3</div>
  </div>
  
  <div class="calculation-note">
    <strong>flex-grow 比例 1:2:3</strong><br>
    • 總比例 = 1 + 2 + 3 = 6<br>
    • 項目 1 額外獲得：340px × (1/6) = 56.67px<br>
    • 項目 2 額外獲得：340px × (2/6) = 113.33px<br>
    • 項目 3 額外獲得：340px × (3/6) = 170px
  </div>

  <div class="demo-container demo-2">
    <div class="demo-item">2</div>
  </div>
  
  <div class="calculation-note">
    <strong>flex-grow 比例 2:2:2（平均分配）</strong><br>
    • 總比例 = 2 + 2 + 2 = 6<br>
    • 每個項目額外獲得：340px × (2/6) = 113.33px
  </div>
</div>
```

### flex-shrink 屬性

`flex-shrink` 控制項目如何收縮以適應**空間不足**的情況。當容器空間不足時，這個屬性決定哪些項目收縮更多。

{% note primary %}
**預設值：1**
預設情況下，所有項目都會等比例收縮以適應容器空間。設為 0 則不收縮。
{% endnote %}

#### 收縮空間的分配邏輯

```html flex-shrink-logic.html
<style>
  .shrink-logic-demo {
    display: flex;
    width: 300px; /* 故意設置較小的寬度 */
    background: #ffebee;
    border: 2px solid #f44336;
    padding: 20px;
    margin: 20px 0;
    gap: 10px;
  }

  .shrink-logic-item {
    background: #f44336;
    color: white;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    flex-basis: 150px; /* 基礎尺寸大於容器，會發生收縮 */
  }

  .shrink-0 { flex-shrink: 0; background: #4caf50; }
  .shrink-1 { flex-shrink: 1; background: #ff9800; }
  .shrink-2 { flex-shrink: 2; background: #9c27b0; }
</style>

<div class="shrink-logic-demo">
  <div class="shrink-logic-item shrink-0">不收縮</div>
  <div class="shrink-logic-item shrink-1">收縮 1</div>
  <div class="shrink-logic-item shrink-2">收縮 2</div>
</div>
```

#### 收縮比例的計算方式

```html shrink-calculation.html
<style>
  .shrink-calculation-demo {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .shrink-demo-container {
    display: flex;
    width: 400px;
    background: #ffffff;
    border: 3px solid #dc3545;
    padding: 10px;
    margin: 15px auto;
    gap: 10px;
  }

  .shrink-demo-item {
    background: #dc3545;
    color: white;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    flex-basis: 200px; /* 總共 600px，但容器只有 400px */
    transition: all 0.3s ease;
  }

  .shrink-demo-1 .shrink-demo-item:nth-child(1) { flex-shrink: 1; }
  .shrink-demo-1 .shrink-demo-item:nth-child(2) { flex-shrink: 2; }
  .shrink-demo-1 .shrink-demo-item:nth-child(3) { flex-shrink: 3; }

  .shrink-demo-item:nth-child(1) { background: #dc3545; }
  .shrink-demo-item:nth-child(2) { background: #ffc107; color: #212529; }
  .shrink-demo-item:nth-child(3) { background: #17a2b8; }

  .shrink-note {
    background: #fff5f5;
    padding: 15px;
    border-radius: 6px;
    margin: 10px 0;
    font-size: 0.9rem;
    border: 1px solid #fed7d7;
  }
</style>

<div class="shrink-calculation-demo">
  <h5>收縮計算範例：容器寬度 400px，每個項目 flex-basis: 200px</h5>
  
  <div class="shrink-note">
    <strong>需要收縮的空間 = (3 × 200px) - 400px = 200px</strong>
  </div>

  <div class="shrink-demo-container shrink-demo-1">
    <div class="shrink-demo-item">1</div>
    <div class="shrink-demo-item">2</div>
    <div class="shrink-demo-item">3</div>
  </div>
  
  <div class="shrink-note">
    <strong>flex-shrink 比例 1:2:3</strong><br>
    • 總比例 = 1 + 2 + 3 = 6<br>
    • 項目 1 收縮：200px × (1/6) = 33.33px → 最終寬度 166.67px<br>
    • 項目 2 收縮：200px × (2/6) = 66.67px → 最終寬度 133.33px<br>
    • 項目 3 收縮：200px × (3/6) = 100px → 最終寬度 100px
  </div>
</div>
```

### flex 屬性

`flex` 屬性是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的簡寫，提供了快速設置的方式。

{% note primary %}
**預設值：0 1 auto**
等同於 `flex: initial`，表示項目不伸長、可收縮、基礎尺寸為 auto。
{% endnote %}

#### 常用的 flex 值

```html flex-shorthand.html
<style>
  .flex-demo {
    display: flex;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    padding: 20px;
    margin: 20px 0;
    gap: 10px;
  }

  .flex-item {
    background: #007bff;
    color: white;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    min-height: 50px;
  }

  .flex-1 { flex: 1; } /* flex: 1 1 0 */
  .flex-auto { flex: auto; } /* flex: 1 1 auto */
  .flex-none { flex: none; } /* flex: 0 0 auto */
  .flex-0 { flex: 0; } /* flex: 0 1 0 */
  .flex-custom { flex: 2 1 200px; } /* 自定義值 */
</style>

<div class="flex-demo">
  <div class="flex-item flex-1">flex: 1</div>
  <div class="flex-item flex-auto">flex: auto</div>
  <div class="flex-item flex-none">flex: none</div>
</div>

<div class="flex-demo">
  <div class="flex-item flex-0">flex: 0</div>
  <div class="flex-item flex-custom">flex: 2 1 200px</div>
  <div class="flex-item flex-1">flex: 1</div>
</div>
```

{% note info %}
**flex 簡寫值說明**
- `flex: 1` = `flex: 1 1 0`：平均分配空間，忽略內容大小
- `flex: auto` = `flex: 1 1 auto`：平均分配空間，考慮內容大小
- `flex: none` = `flex: 0 0 auto`：不伸縮，保持內容大小
- `flex: 0` = `flex: 0 1 0`：不伸長但可收縮
- `flex: initial` = `flex: 0 1 auto`：預設值
{% endnote %}

### order 屬性

控制 flex 項目的排列順序，數值越小越靠前：

{% note primary %}
**預設值：0**
所有項目的預設 order 值都是 0，按照 HTML 源碼順序排列。
{% endnote %}

```html order-demo.html
<style>
  .order-container {
    display: flex;
    background: #e1f5fe;
    margin: 15px 0;
    border: 2px solid #0288d1;
    padding: 10px;
  }

  .order-item {
    background: #0288d1;
    color: white;
    padding: 20px;
    margin: 5px;
    border-radius: 4px;
    text-align: center;
    width: 80px;
  }

  .order-1 { order: 1; }
  .order-2 { order: 2; }
  .order-3 { order: 3; }
  .order-minus-1 { order: -1; }
</style>

<h4>預設順序（HTML 順序）</h4>
<div class="order-container">
  <div class="order-item">第一個</div>
  <div class="order-item">第二個</div>
  <div class="order-item">第三個</div>
</div>

<h4>使用 order 改變順序</h4>
<div class="order-container">
  <div class="order-item order-3">order: 3</div>
  <div class="order-item order-1">order: 1</div>
  <div class="order-item order-2">order: 2</div>
</div>

<h4>負數 order 值</h4>
<div class="order-container">
  <div class="order-item">預設 (0)</div>
  <div class="order-item order-minus-1">order: -1</div>
  <div class="order-item">預設 (0)</div>
</div>
```

### align-self 屬性

覆寫父容器的 `align-items` 設定，單獨控制某個項目的交叉軸對齊：

{% note primary %}
**預設值：auto**
繼承父容器的 `align-items` 設定。如果父容器沒有設定，則使用 `stretch`。
{% endnote %}

```html align-self-demo.html
<style>
  .align-self-container {
    display: flex;
    align-items: center;
    height: 150px;
    background: #f3e5f5;
    margin: 15px 0;
    border: 2px solid #9c27b0;
    padding: 10px;
  }

  .align-self-item {
    background: #9c27b0;
    color: white;
    padding: 15px;
    margin: 5px;
    border-radius: 4px;
    text-align: center;
    width: 80px;
  }

  .align-self-stretch { align-self: stretch; }
  .align-self-start { align-self: flex-start; }
  .align-self-end { align-self: flex-end; }
  .align-self-center { align-self: center; }
  .align-self-baseline { align-self: baseline; }
</style>

<h4>父容器 align-items: center，子項目使用不同的 align-self</h4>
<div class="align-self-container">
  <div class="align-self-item">預設</div>
  <div class="align-self-item align-self-start">flex-start</div>
  <div class="align-self-item align-self-end">flex-end</div>
  <div class="align-self-item align-self-stretch">stretch</div>
  <div class="align-self-item align-self-baseline">baseline</div>
</div>
```

{% note success %}
**子元素屬性學習重點**
1. **flex-basis**：設定基礎尺寸，優先級高於 width/height
2. **flex-grow**：分配剩餘空間，按比例計算
3. **flex-shrink**：收縮空間，按比例計算
4. **flex 簡寫**：快速設置常用組合
5. **order**：改變視覺順序而不修改 HTML
6. **align-self**：單獨控制項目的交叉軸對齊
{% endnote %}

## FlexBox 實際應用案例
在學習完 FlexBox 的基本語法與屬性後，實際應用才是鞏固觀念的最佳方式。以下將透過多個常見的實務案例，帶你一步步了解如何運用 FlexBox 解決日常網頁排版的各種需求，從基礎到進階，讓你能靈活掌握彈性盒子的強大威力。

### 基礎應用案例
以下是 FlexBox 在實際專案中的常見應用，從基礎到進階逐步展示：

#### 案例一：完美居中的登入表單

傳統的垂直居中一直是 CSS 的難題，但 FlexBox 讓這變得極其簡單：

```html perfect-center-login.html
<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }

  .login-form {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
  }

  .login-title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
    font-size: 1.8rem;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    margin-bottom: 5px;
    color: #555;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e8ed;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  .form-input:focus {
    outline: none;
    border-color: #667eea;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    margin-top: 25px;
  }

  .btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-primary {
    background: #667eea;
    color: white;
  }

  .btn-primary:hover {
    background: #5a67d8;
  }

  .btn-secondary {
    background: #e2e8f0;
    color: #4a5568;
  }

  .btn-secondary:hover {
    background: #cbd5e0;
  }
</style>

<div class="login-container">
  <form class="login-form">
    <h2 class="login-title">會員登入</h2>
    
    <div class="form-group">
      <label class="form-label">電子郵件</label>
      <input type="email" class="form-input" placeholder="請輸入您的電子郵件">
    </div>
    
    <div class="form-group">
      <label class="form-label">密碼</label>
      <input type="password" class="form-input" placeholder="請輸入您的密碼">
    </div>
    
    <div class="form-actions">
      <button type="button" class="btn btn-secondary">取消</button>
      <button type="submit" class="btn btn-primary">登入</button>
    </div>
  </form>
</div>
```

{% note success %}
**FlexBox 的優勢展現**
- 只需要 3 行 CSS 就能完美居中
- 無需複雜的計算和定位
- 自動適應內容大小
- 完美的響應式行為
{% endnote %}

#### 案例二：彈性導航選單

FlexBox 讓導航選單的製作變得極其簡單和彈性：

```html flexible-navigation.html
<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2c3e50;
    color: white;
    padding: 15px 30px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3498db;
  }

  .nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;
    margin: 0;
    padding: 0;
  }

  .nav-menu a {
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background 0.3s;
  }

  .nav-menu a:hover {
    background: rgba(52, 152, 219, 0.2);
    color: #3498db;
  }

  .nav-actions {
    display: flex;
    gap: 15px;
  }

  .nav-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s;
  }

  .nav-btn-primary {
    background: #3498db;
    color: white;
  }

  .nav-btn-secondary {
    background: transparent;
    color: white;
    border: 1px solid white;
  }

  .nav-btn:hover {
    opacity: 0.8;
  }

  /* 響應式設計 */
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      gap: 15px;
    }
    
    .nav-menu {
      gap: 15px;
    }
    
    .nav-actions {
      order: -1;
    }
  }
</style>

<nav class="navbar">
  <div class="nav-brand">MyWebsite</div>
  
  <ul class="nav-menu">
    <li><a href="#">首頁</a></li>
    <li><a href="#">關於我們</a></li>
    <li><a href="#">服務項目</a></li>
    <li><a href="#">聯絡我們</a></li>
  </ul>
  
  <div class="nav-actions">
    <button class="nav-btn nav-btn-outline">登入</button>
    <button class="nav-btn nav-btn-primary">註冊</button>
  </div>
</nav>
```

{% note info %}
**彈性導航的優勢**
- 自動分配空間，左中右完美對齊
- 響應式設計只需幾行媒體查詢
- 項目可以靈活調整順序
- 間距統一且易於調整
{% endnote %}

#### 案例三：自適應卡片布局

FlexBox 讓卡片布局變得極其靈活，自動適應不同內容長度：

```html adaptive-cards.html
<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
  }

  .card {
    flex: 1 1 300px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }

  .card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    text-align: center;
  }

  .card-title {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
  }

  .card-subtitle {
    margin: 5px 0 0 0;
    opacity: 0.9;
    font-size: 0.9rem;
  }

  .card-body {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .card-text {
    color: #6c757d;
    line-height: 1.6;
    margin-bottom: 15px;
    flex-grow: 1;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid #e9ecef;
  }

  .card-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e74c3c;
  }

  .card-btn {
    padding: 10px 20px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .card-btn:hover {
    background: #218838;
  }

  /* 特殊卡片 */
  .card.featured {
    flex-basis: 100%;
    flex-direction: row;
    max-width: none;
  }

  .card.featured .card-header {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card.featured .card-body {
    flex: 1;
  }

  /* 響應式調整 */
  @media (max-width: 768px) {
    .card.featured {
      flex-direction: column;
    }
    
    .card.featured .card-header {
      flex: none;
    }
  }
</style>

<div class="card-container">
  <div class="card featured">
    <div class="card-header">
      <h3 class="card-title">特色服務</h3>
      <p class="card-subtitle">限時優惠</p>
    </div>
    <div class="card-body">
      <p class="card-text">
        這是我們的特色服務，提供完整的解決方案。具有豐富的功能和優秀的性能表現，能夠滿足您的各種需求。
      </p>
      <div class="card-footer">
        <div class="card-price">$199</div>
        <button class="card-btn">立即購買</button>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3 class="card-title">基礎方案</h3>
      <p class="card-subtitle">適合個人</p>
    </div>
    <div class="card-body">
      <p class="card-text">
        最適合個人使用的基礎方案，包含所有必要的功能。
      </p>
      <div class="card-footer">
        <div class="card-price">$99</div>
        <button class="card-btn">選擇方案</button>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3 class="card-title">專業方案</h3>
      <p class="card-subtitle">適合企業</p>
    </div>
    <div class="card-body">
      <p class="card-text">
        專為企業設計的專業方案，提供更多高級功能和技術支持，幫助您的業務快速成長。
      </p>
      <div class="card-footer">
        <div class="card-price">$299</div>
        <button class="card-btn">選擇方案</button>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3 class="card-title">高級方案</h3>
      <p class="card-subtitle">全功能</p>
    </div>
    <div class="card-body">
      <p class="card-text">
        包含所有功能的高級方案。
      </p>
      <div class="card-footer">
        <div class="card-price">$499</div>
        <button class="card-btn">選擇方案</button>
      </div>
    </div>
  </div>
</div>
```

{% note success %}
**自適應卡片的彈性特色**
- 自動調整寬度，最小 300px
- 內容長度不同也能保持對齊
- 特色卡片可以跨越整行
- 響應式設計自動適配
{% endnote %}

### 實用技巧展示

#### 技巧一：等高布局

過去需要複雜技巧的等高布局，現在輕鬆實現：

```html equal-height-layout.html
<style>
  .equal-height-container {
    display: flex;
    gap: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .equal-height-item {
    flex: 1;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
  }

  .item-header {
    background: #3498db;
    color: white;
    padding: 15px;
    margin: -20px -20px 20px -20px;
    border-radius: 8px 8px 0 0;
    text-align: center;
  }

  .item-content {
    flex-grow: 1;
    color: #6c757d;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .item-footer {
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid #e9ecef;
    text-align: center;
  }

  .item-btn {
    padding: 10px 20px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .item-btn:hover {
    background: #218838;
  }
</style>

<div class="equal-height-container">
  <div class="equal-height-item">
    <div class="item-header">
      <h4>短內容</h4>
    </div>
    <div class="item-content">
      這是一個較短的內容。
    </div>
    <div class="item-footer">
      <button class="item-btn">查看更多</button>
    </div>
  </div>

  <div class="equal-height-item">
    <div class="item-header">
      <h4>中等內容</h4>
    </div>
    <div class="item-content">
      這是一個中等長度的內容，比第一個稍微長一些，但不會太長。
    </div>
    <div class="item-footer">
      <button class="item-btn">查看更多</button>
    </div>
  </div>

  <div class="equal-height-item">
    <div class="item-header">
      <h4>長內容</h4>
    </div>
    <div class="item-content">
      這是一個較長的內容，包含了更多的文字和說明。FlexBox 會自動讓所有項目保持相同的高度，不管內容長短如何。這種等高布局在過去需要複雜的 JavaScript 或 CSS 技巧才能實現。
    </div>
    <div class="item-footer">
      <button class="item-btn">查看更多</button>
    </div>
  </div>
</div>
```

#### 技巧二：彈性的聖杯布局

```html flexible-holy-grail.html
<style>
  .page-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .page-header {
    background: #2c3e50;
    color: white;
    padding: 20px;
    text-align: center;
  }

  .page-main {
    display: flex;
    flex: 1;
    gap: 20px;
    padding: 20px;
    background: #ecf0f1;
  }

  .page-sidebar {
    flex: 0 0 200px;
    background: #34495e;
    color: white;
    padding: 20px;
    border-radius: 8px;
  }

  .page-content {
    flex: 1;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .page-ads {
    flex: 0 0 150px;
    background: #f39c12;
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }

  .page-footer {
    background: #2c3e50;
    color: white;
    padding: 20px;
    text-align: center;
  }

  /* 響應式設計 */
  @media (max-width: 768px) {
    .page-main {
      flex-direction: column;
    }
    
    .page-sidebar,
    .page-ads {
      flex: none;
      order: 2;
    }
    
    .page-content {
      order: 1;
    }
  }
</style>

<div class="page-layout">
  <header class="page-header">
    <h1>FlexBox 聖杯布局</h1>
  </header>

  <main class="page-main">
    <aside class="page-sidebar">
      <h3>側邊欄</h3>
      <p>固定寬度 200px</p>
    </aside>

    <section class="page-content">
      <h2>主要內容</h2>
      <p>這是主要內容區域，會自動佔滿剩餘空間。FlexBox 讓聖杯布局變得極其簡單，不需要複雜的 float 或 positioning 技巧。</p>
      <p>無論側邊欄內容多少，主要內容都會自動調整寬度。</p>
    </section>

    <aside class="page-ads">
      <h4>廣告區</h4>
      <p>固定寬度 150px</p>
    </aside>
  </main>

  <footer class="page-footer">
    <p>© 2024 FlexBox 示例</p>
  </footer>
</div>
```

#### 技巧三：完美的按鈕組

```html perfect-button-group.html
<style>
  .button-groups {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
  }

  .button-group {
    display: flex;
    gap: 10px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .button-group h4 {
    margin: 0 0 15px 0;
    color: #2c3e50;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
  }

  .btn-primary {
    background: #3498db;
    color: white;
  }

  .btn-success {
    background: #27ae60;
    color: white;
  }

  .btn-danger {
    background: #e74c3c;
    color: white;
  }

  .btn-secondary {
    background: #95a5a6;
    color: white;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  /* 等寬按鈕 */
  .equal-width .btn {
    flex: 1;
  }

  /* 居中按鈕組 */
  .centered {
    justify-content: center;
  }

  /* 兩端對齊 */
  .space-between {
    justify-content: space-between;
  }

  /* 右對齊 */
  .right-aligned {
    justify-content: flex-end;
  }

  /* 響應式按鈕組 */
  @media (max-width: 768px) {
    .responsive {
      flex-direction: column;
    }
    
    .responsive .btn {
      width: 100%;
    }
  }
</style>

<div class="button-groups">
  <div class="button-group">
    <h4>基本按鈕組</h4>
    <button class="btn btn-primary">主要</button>
    <button class="btn btn-success">成功</button>
    <button class="btn btn-danger">危險</button>
    <button class="btn btn-secondary">次要</button>
  </div>

  <div class="button-group equal-width">
    <h4>等寬按鈕組</h4>
    <button class="btn btn-primary">確認</button>
    <button class="btn btn-secondary">取消</button>
  </div>

  <div class="button-group centered">
    <h4>居中按鈕組</h4>
    <button class="btn btn-primary">上一步</button>
    <button class="btn btn-success">下一步</button>
  </div>

  <div class="button-group space-between">
    <h4>兩端對齊</h4>
    <button class="btn btn-secondary">返回</button>
    <button class="btn btn-primary">完成</button>
  </div>

  <div class="button-group right-aligned">
    <h4>右對齊</h4>
    <button class="btn btn-secondary">取消</button>
    <button class="btn btn-primary">儲存</button>
  </div>

  <div class="button-group responsive">
    <h4>響應式按鈕組</h4>
    <button class="btn btn-primary">選項一</button>
    <button class="btn btn-success">選項二</button>
    <button class="btn btn-danger">選項三</button>
  </div>
</div>
```


### FlexBox 的核心價值

{% note success %}
**FlexBox 解決的傳統難題**
1. **垂直居中**：從複雜變成 3 行代碼
2. **等高布局**：自動實現，無需 JavaScript
3. **彈性分配**：空間自動分配，響應式天然
4. **對齊控制**：強大的對齊系統，精確控制
5. **順序調整**：視覺順序與 HTML 順序分離
{% endnote %}

{% note info %}
**FlexBox 的學習重點**
- 理解主軸和交叉軸的概念
- 掌握父容器和子元素的屬性
- 學會運用彈性特性解決實際問題
- 結合響應式設計創造更好的用戶體驗
{% endnote %}

透過這些實際案例，我們可以清楚看到 FlexBox 在現代網頁開發中的重要地位。它不僅簡化了複雜的布局需求，更提供了前所未有的彈性和控制能力。


## 學習資源推薦
以下整理幾個優質的線上互動練習網站，抓準 flex 技巧，做一下最後練習。

{% blockquote FLEXBOX FROGGY https://flexboxfroggy.com/#zh-tw %}
透過遊戲方式共 24 關卡，學習 CSS 的 flex box 技巧，全球著名的練習遊戲。
{% endblockquote %}

{% blockquote Flexbox Defense http://www.flexboxdefense.com/ %}
透過遊戲方式共 12 關卡，學習 CSS 的 flex box 技巧，幫助思考並加強 CSS 排版上的各種雜症。
{% endblockquote %}

{% blockquote Flex Priate https://hexschool.github.io/flexbox-pirate/ %}
透過遊戲方式共兩總模式分別為 20 與 30 關卡，來自六角學院出處。
{% endblockquote %}


# 網格布局 CSS Grid

CSS Grid 是現代網頁設計中最強大的二維布局系統，它徹底改變了我們思考和實現複雜布局的方式。與 FlexBox 專注於一維布局不同，Grid 可以同時控制行和列，讓我們能夠創建真正的二維布局。

## CSS Grid 核心概念圖解

首先，我們透過圖片來理解 CSS Grid 的核心概念：

![](/assets/images/2025-07-10-23-35-00.png)

### 四個重要名詞解釋

{% note info %}
**Grid 的四個核心概念**
- **Grid Lines（格線）**：構成網格的水平和垂直線，是整個網格系統的基礎
- **Grid Tracks（軌道）**：相鄰兩條格線之間的空間，可以是行軌道或列軌道
- **Grid Areas（區域）**：由四條格線圍成的矩形空間，可以包含一個或多個格子
- **Grid Cells（格子）**：最小的網格單位，由相鄰的行線和列線圍成
{% endnote %}

### 基礎概念理解

```html grid-concept-demo.html
<style>
  .concept-demo {
    display: grid;
    grid-template-columns: 100px 150px 100px;
    grid-template-rows: 80px 100px 80px;
    gap: 10px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    position: relative;
  }

  .concept-item {
    background: rgba(52, 152, 219, 0.3);
    border: 2px solid #3498db;
    color: #2c3e50;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .concept-explanation {
    margin: 20px 0;
    padding: 15px;
    background: #e8f4f8;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }
</style>

<div class="concept-demo">
  <div class="concept-item">格子 1</div>
  <div class="concept-item">格子 2</div>
  <div class="concept-item">格子 3</div>
  <div class="concept-item">格子 4</div>
  <div class="concept-item">格子 5</div>
  <div class="concept-item">格子 6</div>
  <div class="concept-item">格子 7</div>
  <div class="concept-item">格子 8</div>
  <div class="concept-item">格子 9</div>
</div>

<div class="concept-explanation">
  <strong>觀察重點：</strong><br>
  • 這個網格有 4 條垂直格線（列線）和 4 條水平格線（行線）<br>
  • 共有 3 個列軌道和 3 個行軌道<br>
  • 總共 9 個格子<br>
  • 每個格子都是一個獨立的區域
</div>
```

{% note primary %}
**實際操作：使用 DevTools 觀察 Grid**
1. 在上方範例的網格容器上按 <kbd>F12</kbd> 打開開發者工具
2. 在 Elements 面板中找到任一 `.concept-item` 元素
3. 在 HTML 標籤旁邊會看到一個 `grid` 標籤
4. 點擊 `grid` 標籤，頁面上會顯示格線的視覺化效果
5. 在 Styles 面板中可以看到 Grid 相關的屬性
{% endnote %}

## 父容器屬性
在進入 CSS Grid 的父容器屬性詳細說明之前，讓我們先釐清「父容器」在 Grid 布局中的角色。Grid 的強大之處在於它能夠讓父容器（Grid Container）直接控制子元素（Grid Items）的排列方式，無論是行還是列，都能精確掌控。只要將 display 設為 `grid` 或 `inline-grid`，父容器就會啟動 Grid 模式，子元素自動成為網格項目，這是所有 Grid 屬性的基礎。

{% note info %}
**小技巧：父容器與子元素的關係**
只要父元素設定了 `display: grid;`，其所有直接子元素都會自動成為 Grid 項目，無需額外標記 class 或 id。
{% endnote %}

### display 屬性

啟用 Grid 布局的基礎屬性：

```css
.container {
  display: grid;        /* 塊級 Grid 容器 */
  display: inline-grid; /* 行內 Grid 容器 */
}
```

### grid-template-columns 和 grid-template-rows

在設計 CSS Grid 布局時，首先要決定網格需要幾個「格子」（Grid Cell），這會影響你要設定多少「列」（columns）和「行」（rows）。利用下方的語法，我們可以清楚地定義網格的列與行軌道，靈活打造出所需的版面結構。

#### 基本單位介紹

CSS Grid 提供了多種單位來定義軌道尺寸，每種都有其特定的用途：

{% note info %}
**Grid 可用單位說明**

在 CSS Grid 中，您可以透過 `grid-template-columns` 或 `grid-template-rows` 屬性，搭配多種單位來指定每一行或每一列的寬度與高度。常見單位如下：

- `px`：像素，絕對固定長度，適合需要精確尺寸時使用。
- `%`：百分比，依據父容器的尺寸自動調整，適合響應式設計。
- `fr`：Fraction（比例單位），代表可用空間的分配份數，是 Grid 專屬的彈性單位。
- `auto`：自動根據內容大小調整。
- `em`、`rem`：相對於字體大小的單位，適合字型或間距的彈性設計。
- `min-content`、`max-content`、`minmax()`：根據內容最小/最大尺寸自動調整，或設定範圍。
{% endnote %}

```html basic-units-demo.html
<style>
  .units-demo {
    display: grid;
    gap: 15px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .units-item {
    background: #007bff;
    color: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
  }

  /* 固定尺寸 */
  .fixed-size {
    grid-template-columns: 100px 200px 150px;
    grid-template-rows: 80px 120px;
  }

  /* 彈性尺寸 */
  .flexible-size {
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 100px 200px;
  }

  /* 混合尺寸 */
  .mixed-size {
    grid-template-columns: 150px 1fr 100px;
    grid-template-rows: auto 150px;
  }

  /* 百分比尺寸 */
  .percentage-size {
    grid-template-columns: 25% 50% 25%;
    grid-template-rows: 30% 70%;
  }

  /* 內容自適應尺寸 */
  .content-size {
    grid-template-columns: min-content max-content minmax(200px, 1fr);
    grid-template-rows: 80px 120px;
  }

  /* minmax 函數 */
  .minmax-size {
    grid-template-columns: minmax(100px, 200px) minmax(150px, 1fr) minmax(80px, 120px);
    grid-template-rows: minmax(60px, auto) minmax(80px, 120px);
  }
</style>

<h4>固定尺寸：100px 200px 150px</h4>
<div class="units-demo fixed-size">
  <div class="units-item">100px</div>
  <div class="units-item">200px</div>
  <div class="units-item">150px</div>
  <div class="units-item">項目 4</div>
  <div class="units-item">項目 5</div>
  <div class="units-item">項目 6</div>
</div>

<h4>彈性尺寸：1fr 2fr 1fr</h4>
<div class="units-demo flexible-size">
  <div class="units-item">1fr</div>
  <div class="units-item">2fr （更寬）</div>
  <div class="units-item">1fr</div>
  <div class="units-item">項目 4</div>
  <div class="units-item">項目 5</div>
  <div class="units-item">項目 6</div>
</div>

<h4>混合尺寸：150px 1fr 100px</h4>
<div class="units-demo mixed-size">
  <div class="units-item">150px</div>
  <div class="units-item">1fr （彈性）</div>
  <div class="units-item">100px</div>
  <div class="units-item">auto 高度</div>
  <div class="units-item">會根據內容調整</div>
  <div class="units-item">150px 固定</div>
</div>

<h4>百分比尺寸：25% 50% 25%</h4>
<div class="units-demo percentage-size">
  <div class="units-item">25%</div>
  <div class="units-item">50%</div>
  <div class="units-item">25%</div>
  <div class="units-item">30% 高</div>
  <div class="units-item">70% 高</div>
  <div class="units-item">項目 6</div>
</div>

<h4>內容自適應：min-content max-content minmax(200px, 1fr)</h4>
<div class="units-demo content-size">
  <div class="units-item">短文字</div>
  <div class="units-item">這是一個很長的文字內容，用來測試 max-content 的效果</div>
  <div class="units-item">彈性範圍</div>
  <div class="units-item">項目 4</div>
  <div class="units-item">項目 5</div>
  <div class="units-item">項目 6</div>
</div>

<h4>minmax 函數：minmax(100px, 200px) minmax(150px, 1fr) minmax(80px, 120px)</h4>
<div class="units-demo minmax-size">
  <div class="units-item">最小 100px<br>最大 200px</div>
  <div class="units-item">最小 150px<br>彈性最大</div>
  <div class="units-item">最小 80px<br>最大 120px</div>
  <div class="units-item">自動高度</div>
  <div class="units-item">項目 5</div>
  <div class="units-item">項目 6</div>
</div>
```

{% note success %}
**基本單位使用建議**
- **固定布局**：使用 `px` 確保精確尺寸
- **響應式設計**：使用 `%` 和 `fr` 實現彈性布局
- **內容自適應**：使用 `auto`、`min-content`、`max-content` 讓內容決定尺寸
- **範圍控制**：使用 `minmax()` 設定最小和最大尺寸
- **混合策略**：結合不同單位創造最佳效果
{% endnote %}

{% note info %}
**內容自適應單位的詳細說明**

- **min-content**：使用內容的最小可能尺寸（通常是單個單詞的寬度）
- **max-content**：使用內容的最大可能尺寸（通常是完整內容的寬度）
- **minmax(min, max\)**：設定最小值和最大值，讓軌道在這個範圍內彈性調整
- **auto**：根據內容自動調整，類似於傳統的塊級元素行為
{% endnote %}

#### repeat() 函數用法

`repeat()` 函數是 CSS Grid 的強大工具，可以快速重複指定的軌道定義，大幅簡化程式碼：

{% note info %}
**repeat() 函數語法**
```css
repeat（重複次數，軌道定義）
```

**常用模式：**
- `repeat(3, 1fr)`：重複 3 次，每次 1fr
- `repeat(auto-fit, minmax(200px, 1fr))`：自動填充，最小 200px
- `repeat(auto-fill, 150px)`：自動填充，固定 150px
{% endnote %}

```html repeat-function-demo.html
<style>
  .repeat-demo {
    display: grid;
    gap: 15px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .repeat-item {
    background: #28a745;
    color: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
  }

  /* 基本重複 */
  .basic-repeat {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 100px);
  }

  /* 混合重複 */
  .mixed-repeat {
    grid-template-columns: 200px repeat(3, 1fr) 150px;
    grid-template-rows: repeat(3, 80px);
  }

  /* 自動填充 */
  .auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: repeat(2, 100px);
  }

  /* 自動填充固定尺寸 */
  .auto-fill {
    grid-template-columns: repeat(auto-fill, 150px);
    grid-template-rows: repeat(2, 80px);
  }

  /* 複雜重複模式 */
  .complex-repeat {
    grid-template-columns: repeat(2, 1fr 2fr);
    grid-template-rows: repeat(3, 60px);
  }
</style>

<h4>基本重複：repeat(4, 1fr)</h4>
<div class="repeat-demo basic-repeat">
  <div class="repeat-item">1</div>
  <div class="repeat-item">2</div>
  <div class="repeat-item">3</div>
  <div class="repeat-item">4</div>
  <div class="repeat-item">5</div>
  <div class="repeat-item">6</div>
  <div class="repeat-item">7</div>
  <div class="repeat-item">8</div>
</div>

<h4>混合重複：200px repeat(3, 1fr) 150px</h4>
<div class="repeat-demo mixed-repeat">
  <div class="repeat-item">200px</div>
  <div class="repeat-item">1fr</div>
  <div class="repeat-item">150px</div>
  <div class="repeat-item">項目 6</div>
  <div class="repeat-item">項目 7</div>
  <div class="repeat-item">項目 8</div>
  <div class="repeat-item">項目 9</div>
</div>

<h4>自動填充：repeat(auto-fit, minmax(200px, 1fr))</h4>
<div class="repeat-demo auto-fit">
  <div class="repeat-item">自動適應</div>
  <div class="repeat-item">最小 200px</div>
  <div class="repeat-item">彈性分配</div>
  <div class="repeat-item">響應式</div>
  <div class="repeat-item">項目 5</div>
  <div class="repeat-item">項目 6</div>
</div>

<h4>自動填充固定：repeat(auto-fill, 150px)</h4>
<div class="repeat-demo auto-fill">
  <div class="repeat-item">固定 150px</div>
  <div class="repeat-item">自動填充</div>
  <div class="repeat-item">項目 3</div>
  <div class="repeat-item">項目 4</div>
  <div class="repeat-item">項目 5</div>
  <div class="repeat-item">項目 6</div>
</div>

<h4>複雜重複：repeat(2, 1fr 2fr)</h4>
<div class="repeat-demo complex-repeat">
  <div class="repeat-item">1fr</div>
  <div class="repeat-item">2fr</div>
  <div class="repeat-item">1fr</div>
  <div class="repeat-item">2fr</div>
  <div class="repeat-item">項目 5</div>
  <div class="repeat-item">項目 6</div>
</div>
```

{% note success %}
**repeat() 函數的優勢**
1. **程式碼簡潔**：避免重複寫相同的值
2. **維護性高**：修改重複次數只需改一個數字
3. **響應式友好**：auto-fit 和 auto-fill 實現自動適應
4. **靈活性強**：可以混合使用固定值和重複模式
{% endnote %}

#### auto-fit 與 auto-fill 詳細對比

這兩個關鍵字在 `repeat()` 函數中的行為差異是 CSS Grid 的重要概念，理解它們的差異對於創建響應式布局至關重要：

{% note info %}
**核心差異說明**
- **auto-fit**：會「收縮」空的軌道，讓現有內容填滿可用空間
- **auto-fill**：會「保持」所有可能的軌道，即使沒有內容填充
- 這個差異在內容數量少於可用軌道時最明顯
{% endnote %}

##### 兩者差異對比
讓我們透過具體的應用場景來理解兩者的差異：

```html practical-comparison.html
<style>
  .practical-demo {
    margin: 30px 0;
  }

  .scenario {
    background: #f8f9fa;
    border: 2px solid #6c757d;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  }

  .scenario h4 {
    color: #2c3e50;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #3498db;
  }

  .card-grid {
    display: grid;
    gap: 15px;
    padding: 15px;
    background: white;
    border-radius: 6px;
    min-height: 150px;
  }

  .auto-fit-cards {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .auto-fill-cards {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
  }

  .use-case {
    background: #e8f5e8;
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    border-left: 4px solid #28a745;
  }

  .avoid-case {
    background: #fff5f5;
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    border-left: 4px solid #dc3545;
  }
</style>

<div class="practical-demo">
  <h3>實際應用場景對比</h3>

  <div class="scenario">
    <h4>📱 響應式卡片布局</h4>
    <div class="card-grid auto-fit-cards">
      <div class="card">產品卡片 1</div>
      <div class="card">產品卡片 2</div>
      <div class="card">產品卡片 3</div>
    </div>
    <div class="use-case">
      <strong>✅ 使用 auto-fit 的優勢：</strong><br>
      • 卡片會自動填滿可用空間<br>
      • 在大螢幕上卡片會變寬<br>
      • 在小螢幕上會自動換行<br>
      • 視覺效果更自然
    </div>
  </div>

  <div class="scenario">
    <h4>🎨 圖片畫廊布局</h4>
    <div class="card-grid auto-fill-cards">
      <div class="card">圖片 1</div>
      <div class="card">圖片 2</div>
      <div class="card">圖片 3</div>
    </div>
    <div class="use-case">
      <strong>✅ 使用 auto-fill 的優勢：</strong><br>
      • 保持固定的圖片尺寸<br>
      • 為未來添加的圖片預留空間<br>
      • 適合動態載入內容<br>
      • 布局更穩定
    </div>
  </div>

  <div class="scenario">
    <h4>💡 選擇建議</h4>
    <div class="use-case">
      <strong>使用 auto-fit 當：</strong><br>
      • 內容數量相對固定<br>
      • 希望內容填滿可用空間<br>
      • 需要響應式的視覺效果<br>
      • 大多數響應式設計場景
    </div>
    <div class="avoid-case">
      <strong>使用 auto-fill 當：</strong><br>
      • 內容數量會動態變化<br>
      • 需要保持固定的項目尺寸<br>
      • 為未來內容預留空間<br>
      • 需要更穩定的布局
    </div>
  </div>
</div>
```

{% note success %}
**記憶技巧**
- **auto-fit** = "適應內容" → 軌道會收縮適應現有內容
- **auto-fill** = "填充空間" → 軌道會保持填充所有可能空間
- 在大多數的情況下，**auto-fit** 是更好的選擇
- 當您只設定 grid-template-columns 而不設定 grid-template-rows 時，Grid 會自動創建行軌道來容納剩餘 cell
{% endnote %}

##### auto-fit 常用方式

`auto-fit` 和 `auto-fill` 必須搭配 `minmax()`，但最大值可以使用不同的單位：

```html different-combinations.html
<style>
  .combination-demo {
    margin: 30px 0;
  }

  .combination-section {
    background: #f8f9fa;
    border: 2px solid #6c757d;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  }

  .combination-title {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #3498db;
  }

  .combination-grid {
    display: grid;
    gap: 10px;
    padding: 15px;
    background: white;
    border-radius: 6px;
    min-height: 120px;
  }

  .combination-item {
    background: #007bff;
    color: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fr-combination {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .px-combination {
    grid-template-columns: repeat(auto-fit, minmax(150px, 300px));
  }

  .percent-combination {
    grid-template-columns: repeat(auto-fit, minmax(300px, 50%));
  }

  .auto-combination {
    grid-template-columns: repeat(auto-fit, minmax(100px, auto));
  }

  .code-example {
    background: #f1f3f4;
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }

  .advantage-box {
    background: #e8f5e8;
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    border-left: 4px solid #28a745;
  }

  .disadvantage-box {
    background: #fff5f5;
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    border-left: 4px solid #dc3545;
  }
</style>

<div class="combination-demo">
  <h3>不同搭配方式的對比</h3>

  <div class="combination-section">
    <div class="combination-title">1. minmax(150px, 1fr) - 最常用</div>
    <div class="combination-grid fr-combination">
      <div class="combination-item">項目 1</div>
      <div class="combination-item">項目 2</div>
      <div class="combination-item">項目 3</div>
    </div>
    <div class="code-example">
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    </div>
    <div class="advantage-box">
      <strong>✅ 優勢：</strong><br>
      • 完全響應式，填滿可用空間<br>
      • 在大螢幕上會自動變寬<br>
      • 在小螢幕上會自動換行<br>
      • 最適合現代響應式設計
    </div>
  </div>

  <div class="combination-section">
    <div class="combination-title">2. minmax(150px, 300px) - 固定最大寬度</div>
    <div class="combination-grid px-combination">
      <div class="combination-item">項目 1</div>
      <div class="combination-item">項目 2</div>
      <div class="combination-item">項目 3</div>
    </div>
    <div class="code-example">
      grid-template-columns: repeat(auto-fit, minmax(150px, 300px));
    </div>
    <div class="advantage-box">
      <strong>✅ 優勢：</strong><br>
      • 控制最大寬度，避免過寬<br>
      • 適合需要限制尺寸的設計<br>
      • 保持一致的視覺效果
    </div>
    <div class="disadvantage-box">
      <strong>❌ 限制：</strong><br>
      • 在大螢幕上可能會有空白空間<br>
      • 不如 fr 單位那麼彈性
    </div>
  </div>

  <div class="combination-section">
    <div class="combination-title">3. minmax(300px, 50%) - 百分比範圍</div>
    <div class="combination-grid percent-combination">
      <div class="combination-item">項目 1</div>
      <div class="combination-item">項目 2</div>
      <div class="combination-item">項目 3</div>
    </div>
    <div class="code-example">
      grid-template-columns: repeat(auto-fit, minmax(300px, 50%));
    </div>
    <div class="advantage-box">
      <strong>✅ 優勢：</strong><br>
      • 相對於容器尺寸調整<br>
      • 適合需要特定比例的設計<br>
      • 響應式但有限制
    </div>
  </div>

  <div class="combination-section">
    <div class="combination-title">4. minmax(100px, auto) - 內容自適應</div>
    <div class="combination-grid auto-combination">
      <div class="combination-item">短文字</div>
      <div class="combination-item">這是一個很長的文字內容，用來測試 auto 的效果</div>
      <div class="combination-item">項目 3</div>
    </div>
    <div class="code-example">
      grid-template-columns: repeat(auto-fit, minmax(100px, auto));
    </div>
    <div class="advantage-box">
      <strong>✅ 優勢：</strong><br>
      • 根據內容自動調整寬度<br>
      • 適合文字內容長度不一的場景<br>
      • 避免文字被截斷
    </div>
  </div>
</div>
```

{% note info %}
**選擇建議**

1. **minmax(150px, 1fr)** - 最推薦
   - 適用於大多數響應式設計
   - 完全填滿可用空間
   - 現代網頁設計的標準做法

2. **minmax(150px, 300px)** - 需要控制最大寬度時
   - 適合卡片、圖片畫廊
   - 避免內容過寬影響閱讀

3. **minmax(20%, 50%)** - 需要特定比例時
   - 適合需要保持特定比例的設計
   - 相對於容器尺寸調整

4. **minmax(100px, auto)** - 內容長度不一時
   - 適合文字內容
   - 讓內容決定最佳寬度
{% endnote %}

{% note success %}
**記憶要點**
- **必須使用 minmax(\)**：auto-fit/auto-fill 需要最小值和最大值
- **fr 最常用**：提供最大的彈性和響應式效果
- **根據需求選擇**：不同的最大值單位適合不同的設計需求
{% endnote %}

### gap 屬性

控制網格項目之間的間距：

```html gap-demo.html
<style>
  .gap-demo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .gap-item {
    background: #28a745;
    color: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
  }

  .gap-0 { gap: 0; }
  .gap-10 { gap: 10px; }
  .gap-20 { gap: 20px; }
  .gap-custom { gap: 10px 30px; } /* 行間距 列間距 */
</style>

<h4>gap: 0</h4>
<div class="gap-demo gap-0">
  <div class="gap-item">1</div>
  <div class="gap-item">2</div>
  <div class="gap-item">3</div>
  <div class="gap-item">4</div>
  <div class="gap-item">5</div>
  <div class="gap-item">6</div>
</div>

<h4>gap: 10px</h4>
<div class="gap-demo gap-10">
  <div class="gap-item">1</div>
  <div class="gap-item">2</div>
  <div class="gap-item">3</div>
  <div class="gap-item">4</div>
  <div class="gap-item">5</div>
  <div class="gap-item">6</div>
</div>

<h4>gap: 20px</h4>
<div class="gap-demo gap-20">
  <div class="gap-item">1</div>
  <div class="gap-item">2</div>
  <div class="gap-item">3</div>
  <div class="gap-item">4</div>
  <div class="gap-item">5</div>
  <div class="gap-item">6</div>
</div>

<h4>gap: 10px 30px（行間距 列間距）</h4>
<div class="gap-demo gap-custom">
  <div class="gap-item">1</div>
  <div class="gap-item">2</div>
  <div class="gap-item">3</div>
  <div class="gap-item">4</div>
  <div class="gap-item">5</div>
  <div class="gap-item">6</div>
</div>
```

### grid-template-areas 屬性

使用語義化的區域名稱（area name）可以讓 CSS Grid 佈局更直觀易懂。只需在父容器設定 `grid-template-areas` 屬性，利用雙引號分行（每行代表一列，行內以空格分隔各欄），即可規劃每個區塊的排列方式。接著，為每個子元素指定對應的 `grid-area` 名稱，瀏覽器就會自動將元素放置到指定的網格區域，讓版面結構一目了然、維護更方便。

```html areas-demo.html
<style>
  .areas-demo {
    display: grid;
    grid-template-areas:
      "header header header"
      "sidebar main ads"
      "footer footer footer";
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: 80px 1fr 60px;
    gap: 15px;
    height: 400px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #343a40;
  }

  .area-item {
    padding: 20px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .area-header {
    grid-area: header;
    background: #007bff;
  }

  .area-sidebar {
    grid-area: sidebar;
    background: #6c757d;
  }

  .area-main {
    grid-area: main;
    background: #28a745;
  }

  .area-ads {
    grid-area: ads;
    background: #ffc107;
    color: #212529;
  }

  .area-footer {
    grid-area: footer;
    background: #dc3545;
  }
</style>

<div class="areas-demo">
  <div class="area-item area-header">Header</div>
  <div class="area-item area-sidebar">Sidebar</div>
  <div class="area-item area-main">Main Content</div>
  <div class="area-item area-ads">Ads</div>
  <div class="area-item area-footer">Footer</div>
</div>
```

{% note info %}
**grid-template-areas 的優勢**
- 程式碼具有視覺化效果，容易理解
- 便於修改和維護
- 搭配 media query 來實現響應式設計時，可以重新排列區域
- 提升程式碼的可讀性
{% endnote %}

### grid-template 簡寫屬性

`grid-template` 是 `grid-template-rows`、`grid-template-columns` 和 `grid-template-areas` 的簡寫屬性，可以同時定義行、列和區域：

```html grid-template-shorthand.html
<style>
  .shorthand-demo {
    display: grid;
    gap: 15px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .shorthand-item {
    background: #28a745;
    color: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
  }

  /* 基本簡寫：行 / 列 */
  .basic-shorthand {
    grid-template: 100px 200px / 1fr 2fr 1fr;
  }

  /* 包含區域的簡寫 */
  .area-shorthand {
    grid-template: 
      "header header header" 80px
      "sidebar main ads" 1fr
      "footer footer footer" 60px
      / 200px 1fr 150px;
  }

  /* 使用 repeat 的簡寫 */
  .repeat-shorthand {
    grid-template: repeat(3, 100px) / repeat(4, 1fr);
  }

  /* 混合使用 */
  .mixed-shorthand {
    grid-template: 
      "a a b" 80px
      "c d e" 120px
      / 1fr 2fr 1fr;
  }

  .area-a { grid-area: a; background: #dc3545; }
  .area-b { grid-area: b; background: #ffc107; color: #212529; }
  .area-c { grid-area: c; background: #17a2b8; }
  .area-d { grid-area: d; background: #6f42c1; }
  .area-e { grid-area: e; background: #e83e8c; }
</style>

<h4>基本簡寫：grid-template: 100px 200px / 1fr 2fr 1fr</h4>
<div class="shorthand-demo basic-shorthand">
  <div class="shorthand-item">1fr</div>
  <div class="shorthand-item">2fr</div>
  <div class="shorthand-item">1fr</div>
  <div class="shorthand-item">100px 高</div>
  <div class="shorthand-item">200px 高</div>
  <div class="shorthand-item">項目 6</div>
</div>

<h4>包含區域的簡寫</h4>
<div class="shorthand-demo area-shorthand">
  <div class="shorthand-item area-a">Header</div>
  <div class="shorthand-item area-b">Sidebar</div>
  <div class="shorthand-item area-c">Main</div>
  <div class="shorthand-item area-d">Ads</div>
  <div class="shorthand-item area-e">Footer</div>
</div>

<h4>使用 repeat 的簡寫：grid-template: repeat(3, 100px) / repeat(4, 1fr)</h4>
<div class="shorthand-demo repeat-shorthand">
  <div class="shorthand-item">1</div>
  <div class="shorthand-item">2</div>
  <div class="shorthand-item">3</div>
  <div class="shorthand-item">4</div>
  <div class="shorthand-item">5</div>
  <div class="shorthand-item">6</div>
  <div class="shorthand-item">7</div>
  <div class="shorthand-item">8</div>
</div>

<h4>混合使用：grid-template: "a a b" 80px "c d e" 120px / 1fr 2fr 1fr</h4>
<div class="shorthand-demo mixed-shorthand">
  <div class="shorthand-item area-a">區域 A</div>
  <div class="shorthand-item area-b">區域 B</div>
  <div class="shorthand-item area-c">區域 C</div>
  <div class="shorthand-item area-d">區域 D</div>
  <div class="shorthand-item area-e">區域 E</div>
</div>
```

{% note info %}
**grid-template 簡寫語法說明**
- **基本格式**：`grid-template: 行定義 / 列定義`
- **包含區域**：`grid-template: "區域名稱" 行高 / 列寬`
- **多行區域**：每行區域定義後跟行高，最後用 `/` 分隔列定義
- **優勢**：程式碼更簡潔，區域定義更直觀
- **注意**：使用簡寫時，`grid-template-areas`、`grid-template-rows`、`grid-template-columns` 會被重置
{% endnote %}

#### 簡寫與完整屬性的對比

```html shorthand-comparison.html
<style>
  .comparison-demo {
    display: grid;
    gap: 15px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .comparison-item {
    background: #007bff;
    color: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
  }

  /* 完整屬性寫法 */
  .full-properties {
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-rows: 80px 1fr 60px;
    grid-template-columns: 200px 1fr;
  }

  /* 簡寫屬性寫法 */
  .shorthand-properties {
    grid-template: 
      "header header" 80px
      "sidebar main" 1fr
      "footer footer" 60px
      / 200px 1fr;
  }

  .area-header { grid-area: header; background: #dc3545; }
  .area-sidebar { grid-area: sidebar; background: #28a745; }
  .area-main { grid-area: main; background: #ffc107; color: #212529; }
  .area-footer { grid-area: footer; background: #6f42c1; }
</style>

<h4>完整屬性寫法</h4>
<div class="comparison-demo full-properties">
  <div class="comparison-item area-header">Header</div>
  <div class="comparison-item area-sidebar">Sidebar</div>
  <div class="comparison-item area-main">Main</div>
  <div class="comparison-item area-footer">Footer</div>
</div>

<h4>簡寫屬性寫法</h4>
<div class="comparison-demo shorthand-properties">
  <div class="comparison-item area-header">Header</div>
  <div class="comparison-item area-sidebar">Sidebar</div>
  <div class="comparison-item area-main">Main</div>
  <div class="comparison-item area-footer">Footer</div>
</div>
```

{% note success %}
**簡寫屬性的使用建議**
1. **簡單布局**：使用基本簡寫 `grid-template: 行 / 列`
2. **複雜區域**：使用區域簡寫，程式碼更清晰
3. **重複模式**：結合 `repeat()` 函數使用
4. **維護性**：簡寫屬性讓程式碼更緊湊，但要注意可讀性
{% endnote %}

### 空間分布與對齊方式

在 CSS Grid 中，對齊方式主要分為兩大類：**內容對齊（Content Alignment）** 與 **項目對齊（Item Alignment）**，分別對應到四個屬性：

- `justify-content`：控制整個網格內容在水平方向上的分布
- `align-content`：控制整個網格內容在垂直方向上的分布
- `justify-items`：控制每個格子（cell）內部項目在水平方向上的對齊
- `align-items`：控制每個格子（cell）內部項目在垂直方向上的對齊

當父容器（Grid 容器）有固定的寬高，且格線尺寸（行與列）也都是固定值（如 `px`），這時候容器內部就會產生剩餘空間。你可以透過上述四個屬性，靈活調整整體網格內容與每個格子內部項目的對齊方式，讓版面更符合設計需求。

下圖展示了這四種對齊屬性在不同設定下的排列效果：

![](/assets/images/2025-07-15-23-05-08.png)


#### justify-content 和 align-content

與 FlexBox（彈性盒模型）相同，CSS Grid 也提供了精確控制父容器內所有子項目整體對齊方式的屬性，可用來調整整個網格在容器中的水平與垂直排列效果。

{% note info %}
**justify-content 與 align-content 可用的值：**
- `start`：靠容器起始邊對齊（左或上）
- `end`：靠容器結束邊對齊（右或下）
- `center`：置中對齊
- `stretch`：預設值，若有多餘空間則分散填滿（但不會拉伸 grid item 的尺寸，只會分配空白區域）
- `space-between`：首尾貼齊，項目間平均分配間距
- `space-around`：每個項目兩側間距相等
- `space-evenly`：所有間距（含首尾）完全平均
{% endnote %}

{% note warning %}
**注意事項：**
在 CSS Grid 中，`stretch` 並不會拉伸 grid item 的寬度或高度，只會讓整個 grid content 填滿容器的剩餘空間。若 grid 的尺寸已被內容撐滿，則 `stretch` 不會有明顯效果。
{% endnote %}

這些值讓你能靈活調整整個 grid 內容在父容器中的排列方式，類似於 FlexBox 的對齊屬性。

{% note success %}
**跟著做：**
讓我們透過實際範例來了解 justify-content 和 align-content 的效果。
{% endnote %}

```html content-alignment.html
<style>
  .content-demo {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 80px);
    gap: 10px;
    width: 400px;
    height: 250px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .content-item {
    background: #007bff;
    color: white;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
  }

  /* 水平對齊設定 */
  .justify-start { justify-content: start; }
  .justify-center { justify-content: center; }
  .justify-end { justify-content: end; }
  .justify-space-around { justify-content: space-around; }
  .justify-space-between { justify-content: space-between; }
  .justify-space-evenly { justify-content: space-evenly; }

  /* 垂直對齊設定 */
  .align-start { align-content: start; }
  .align-center { align-content: center; }
  .align-end { align-content: end; }
</style>

<!-- 水平置中對齊範例 -->
<h4>justify-content: center</h4>
<div class="content-demo justify-center">
  <div class="content-item">1</div>
  <div class="content-item">2</div>
  <div class="content-item">3</div>
  <div class="content-item">4</div>
  <div class="content-item">5</div>
  <div class="content-item">6</div>
</div>

<!-- 垂直置中對齊範例 -->
<h4>align-content: center</h4>
<div class="content-demo align-center">
  <div class="content-item">1</div>
  <div class="content-item">2</div>
  <div class="content-item">3</div>
  <div class="content-item">4</div>
  <div class="content-item">5</div>
  <div class="content-item">6</div>
</div>

<!-- 水平垂直都置中對齊範例 -->
<h4>justify-content: center + align-content: center</h4>
<div class="content-demo justify-center align-center">
  <div class="content-item">1</div>
  <div class="content-item">2</div>
  <div class="content-item">3</div>
  <div class="content-item">4</div>
  <div class="content-item">5</div>
  <div class="content-item">6</div>
</div>
```

#### justify-items 和 align-items

當父容器完成格線（grid）定義後，每個子項目會自動被分配到對應的 cell（格子）空間。預設情況下，若子項目未設定寬高，內容會自動以 `stretch` 模式填滿 cell 的寬度與高度；若有指定寬高，則以內容尺寸為主。透過設定 cell 內的對齊屬性，可以靈活調整子項目在格子中的擺放位置，讓版面更具彈性與美觀。

{% note info %}
**justify-items 與 align-items 差異與用途說明：**

- 這兩個屬性用來「設定每個網格項目（grid item）在自己格子（cell）內的對齊方式」
- `justify-items`：控制水平方向（格子內左右對齊）
- `align-items`：控制垂直方向（格子內上下對齊）

**常見值：**
- `start`：靠起點對齊
- `center`：置中對齊
- `end`：靠終點對齊
- `stretch`：拉伸填滿（預設值）

**小技巧：**
- 若未設定寬高，預設為 `stretch`，會自動填滿格子空間
- 若有設定寬高，建議搭配 `center` 或 `start`，讓版面更美觀
{% endnote %}

{% note success %}
**跟著做：**
讓我們透過實際範例來了解 justify-items 和 align-items 的效果。
{% endnote %}

控制網格項目在各自格子內的對齊方式如下：

```html items-alignment.html
<style>
  .items-demo {
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .items-item {
    background: #17a2b8;
    color: white;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    width: 80px;
    height: 50px;
  }

  /* 水平對齊設定 */
  .justify-items-start { justify-items: start; }
  .justify-items-center { justify-items: center; }
  .justify-items-end { justify-items: end; }
  .justify-items-stretch { justify-items: stretch; }

  /* 垂直對齊設定 */
  .align-items-start { align-items: start; }
  .align-items-center { align-items: center; }
  .align-items-end { align-items: end; }
  .align-items-stretch { align-items: stretch; }

  /* 拉伸模式用的項目 */
  .stretch-item {
    width: auto;
    height: auto;
  }
</style>

<!-- 水平置中對齊範例 -->
<h4>justify-items: center</h4>
<div class="items-demo justify-items-center">
  <div class="items-item">1</div>
  <div class="items-item">2</div>
  <div class="items-item">3</div>
  <div class="items-item">4</div>
  <div class="items-item">5</div>
  <div class="items-item">6</div>
</div>

<!-- 垂直置中對齊範例 -->
<h4>align-items: center</h4>
<div class="items-demo align-items-center">
  <div class="items-item">1</div>
  <div class="items-item">2</div>
  <div class="items-item">3</div>
  <div class="items-item">4</div>
  <div class="items-item">5</div>
  <div class="items-item">6</div>
</div>

<!-- 拉伸填滿範例 -->
<h4>justify-items: stretch</h4>
<div class="items-demo justify-items-stretch">
  <div class="items-item stretch-item">1</div>
  <div class="items-item stretch-item">2</div>
  <div class="items-item stretch-item">3</div>
  <div class="items-item stretch-item">4</div>
  <div class="items-item stretch-item">5</div>
  <div class="items-item stretch-item">6</div>
</div>
```

## 子元素屬性
本節將帶你深入了解 CSS Grid 子元素（Grid Item）的定位與對齊技巧。掌握這些屬性，你將能靈活控制每個區塊在網格中的位置與排列方式，實現更精細的二維布局。建議先理解父容器的網格結構，再逐步練習子元素的各種定位方法，從基礎到進階，循序漸進。

### grid-column 和 grid-row
在 CSS Grid 中，可以利用「格線編號」來精確控制每個子元素（Grid Item）的位置。這種方式讓你能夠指定元素從哪一條格線開始、到哪一條格線結束，靈活實現跨欄、跨列等多樣化的版面配置。

#### 格線編號定位
{% note info %}
**格線編號定位原理**
- 必須先在父容器（Grid Container）定義好行數與列數，瀏覽器會自動產生格線（Grid Line）。
- 子元素可透過 `grid-column` 和 `grid-row` 屬性，指定「從第幾條格線開始，到第幾條格線結束」。
- 格線編號從左到右、從上到下都是從 `1` 開始。
- 也可以用負數，`-1` 代表最右邊（或最下方）那條格線，`-2` 代表倒數第二條，以此類推。
- 這種方式讓你能夠彈性控制元素的跨欄、跨列範圍。
- 正向（如 `1 / 3`）與反向（如 `3 / 1` 或 `-1 / 1`）格線編號在 CSS Grid 都是合法的，代表從不同方向跨格線。Grid 會自動計算範圍，讓你靈活控制排列方向。
{% endnote %}

```html line-positioning.html
<style>
  .line-demo {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .line-item {
    background: #007bff;
    color: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-1 {
    grid-column: 1 / 3;  /* 從第 1 條到第 3 條垂直線 */
    grid-row: 1 / 2;     /* 從第 1 條到第 2 條水平線 */
    background: #dc3545;
  }

  .item-2 {
    grid-column: 3 / 5;  /* 從第 3 條到第 5 條垂直線 */
    grid-row: 1 / 3;     /* 從第 1 條到第 3 條水平線 */
    background: #28a745;
  }

  .item-3 {
    grid-column: 1 / -1; /* 從第 1 條到最後一條垂直線 */
    grid-row: 3 / 4;     /* 第 3 行 */
    background: #ffc107;
    color: #212529;
  }

  .item-reverse {
    grid-column: 3 / 1;  /* 反向，從第 3 條到第 1 條格線 */
    grid-row: 2 / 3;
    background: #ff6666;
  }

  .item-full-reverse {
    grid-column: -1 / 1; /* 反向，從最右到最左 */
    grid-row: 1 / 2;
    background: #66b3ff;
  }
</style>

<div class="line-demo">
  <div class="line-item item-1">正向<br>grid-column: 1 / 3</div>
  <div class="line-item item-2">正向<br>grid-column: 3 / 5<br>grid-row: 1 / 3</div>
  <div class="line-item item-3">橫跨整行<br>grid-column: 1 / -1</div>
  <div class="line-item item-reverse">反向<br>grid-column: 3 / 1</div>
  <div class="line-item item-full-reverse">全行反向<br>grid-column: -1 / 1</div>
  <div class="line-item">普通項目</div>
</div>
```

{% note info %}
當多個 grid item 被放在同一格時，預設會依照 HTML 結構的順序，**後面的元素會蓋在前面的元素上**。  
如果需要自訂圖層順序，可以對特定 item 設定 `position: relative` 並搭配 `z-index`，數值越大層級越高。

```css
.item-3 {
  grid-column: 1 / -1;
  grid-row: 3 / 4;
  background: #ffc107;
  color: #212529;
  position: relative;
  z-index: 10; /* 這樣就會永遠在最上層 */
}
```

{% endnote %}

#### 使用 span 關鍵字
- `span` 關鍵字可用於 `grid-column` 或 `grid-row`，讓你直接指定元素要「跨越幾條格線」。
- 語法如：`grid-column: span 2;` 表示這個元素會橫跨 2 欄（從當前格線起算）。這種寫法不需明確指定結束格線編號，適合動態或不確定結束位置的情境。
- `span` 讓版面配置更具彈性，尤其在自動排版或內容數量不固定時特別實用。
- 也可以指定從哪個格線開始橫跨多行，例如：`grid-row: 2 / span 3;` 代表這個元素會從第 2 條格線開始，往下跨 3 行。
- `span` 關鍵字也可以用反向寫法，例如 `grid-column: span 2 / 4;`，代表「從第 4 條格線往左跨 2 欄」。Grid 會自動判斷方向並計算範圍，讓你靈活控制元素的排列方式。

```html span-positioning.html
<style>
  .span-demo {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 80px);
    gap: 10px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .span-item {
    background: #6f42c1;
    color: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .span-1 {
    grid-column: span 2;  /* 跨越 2 列 */
    background: #e83e8c;
  }

  .span-2 {
    grid-row: span 2;     /* 跨越 2 行 */
    background: #20c997;
  }

  .span-3 {
    grid-column: 2 / span 3;  /* 從第 2 條格線開始，往右跨 3 欄 */
    grid-row: span 2;     /* 跨越 2 行 */
    background: #fd7e14;
  }

  .span-reverse {
    grid-column: 4 / span 2; /* 反向，從第 4 條格線往左跨 2 欄 */
    background: #ffb366;
  }
</style>

<div class="span-demo">
  <div class="span-item span-1">span 2 列</div>
  <div class="span-item span-2">span 2 行</div>
  <div class="span-item">普通</div>
  <div class="span-item span-3">span 3 列 2 行</div>
  <div class="span-item span-reverse">反向<br>grid-column: 4 / span 2</div>
  <div class="span-item">普通</div>
</div>
```

#### 特定預設值情況
`grid-column: span 2;` 和 `grid-column: auto / span 2;` 是等價的，兩者都表示「從自動分配的位置開始，橫跨 2 欄」。  
`auto` 代表「自動由瀏覽器決定起始格線」，通常會接在前一個 item 的右邊（或下方），自動排到下一個可用位置。

```css
/* 這兩種寫法效果完全一樣 */
.item-a {
  grid-column: span 2;
}
.item-b {
  grid-column: auto / span 2;
}
```

`grid-row: 2;`、`grid-row: 2 / 3;` 和 `grid-row: 2 / span 1;` 都是等價的，表示「從第 2 條格線開始，只佔 1 行」。  
`span 1` 就是「跨 1 格」，和預設行為一致。

```css
/* 這三種寫法效果完全一樣，都是只佔一格 */
.item-a {
  grid-row: 2;
}
.item-b {
  grid-row: 2 / 3;
}
.item-c {
  grid-row: 2 / span 1;
}
```

#### 原為簡寫屬性
`grid-column` 和 `grid-row` 都是簡寫屬性，可以同時設定「start 起始格線」和「end 結束格線」。理解這一點，能幫助你更靈活地控制元素在網格中的位置，也能更快看懂他人寫的 Grid 代碼。這種簡寫方式讓語法更精簡，也更容易閱讀與維護。建議在實務上多加練習，熟悉這兩種寫法的轉換。

以下範例展示簡寫與完整寫法的等價關係：

```css
/* 簡寫語法範例 A */
.item {
  grid-column: 2 / 4;   /* 從第 2 條格線到第 4 條格線 */
  grid-row: 1 / 3;      /* 從第 1 條格線到第 3 條格線 */
}

/* 完整語法範例 A */
.item {
  grid-column-start: 2; /* 起始於第 2 條格線 */
  grid-column-end: 4;   /* 結束於第 4 條格線 */
  grid-row-start: 1;    /* 起始於第 1 條格線 */
  grid-row-end: 3;      /* 結束於第 3 條格線 */
}

/* 簡寫語法範例 B */
.item {
  grid-column: span 2;  /* 跨越 2 列 */
}

/* 完整語法範例 B */
.item {
  grid-column-start: auto;    /* 自動起始 */
  grid-column-end: span 2;    /* 結束時跨越 2 列 */
}

/* grid-row 也可用簡寫與完整寫法 */
.item {
  grid-row: 2 / span 3;       /* 從第 2 條格線起，跨越 3 行 */
}

.item {
  grid-row-start: 2;          /* 起始於第 2 條格線 */
  grid-row-end: span 3;       /* 結束時跨越 3 行 */
}

```
{% note info %}
`span` 關鍵字可以讓你用更直覺的方式指定元素要跨越幾條格線。無論是 `grid-column` 或 `grid-row`，都能用 `span` 來簡化語法，對應的完整寫法則是將 `grid-column-end` 或 `grid-row-end` 設為 `span N`。
{% endnote %}

### grid-area
稍早示範過，這是可以搭配父屬性的`grid-template-areas`使用區域名稱定位。

```html grid-area-demo.html
<style>
  .area-positioning {
    display: grid;
    grid-template-areas:
      "header header nav"
      "sidebar main main"
      "sidebar footer footer";
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: 80px 1fr 60px;
    gap: 15px;
    height: 300px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #343a40;
    margin: 20px 0;
  }

  .area-positioned {
    padding: 15px;
    border-radius: 6px;
    color: white;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .positioned-header {
    grid-area: header;
    background: #007bff;
  }

  .positioned-nav {
    grid-area: nav;
    background: #6c757d;
  }

  .positioned-sidebar {
    grid-area: sidebar;
    background: #28a745;
  }

  .positioned-main {
    grid-area: main;
    background: #dc3545;
  }

  .positioned-footer {
    grid-area: footer;
    background: #ffc107;
    color: #212529;
  }
</style>

<div class="area-positioning">
  <div class="area-positioned positioned-header">Header</div>
  <div class="area-positioned positioned-nav">Nav</div>
  <div class="area-positioned positioned-sidebar">Sidebar</div>
  <div class="area-positioned positioned-main">Main</div>
  <div class="area-positioned positioned-footer">Footer</div>
</div>
```

除此之外你也可以作為四個格線值的簡寫，這四個值的順序分別代表不同的起始與結束之格線位置。

```css
/* 四個參數：row-start / column-start / row-end / column-end */
.item {
  grid-area: 2 / 2 / 4 / 4;
  /* 從第2行格線、第2列格線開始，到第4行格線、第4列格線結束 */
}
```

{% note info %}
**grid-area 參數數量與預設行為說明**
- 只寫一個值，代表「區域名稱」，用於 grid-template-areas 對應
- 兩個值，等同於只設起始 `grid-row-start / grid-column-start`，結束格線預設 auto（只佔一格）。
- 三個值，等同於 `grid-row-start / grid-column-start / grid-row-end`，column-end 預設為 auto。
- 四個值，分別對應四個格線，完全自訂範圍。

```css
.item1 { grid-area: main; }           /* 區域名稱 */
.item2 { grid-area: 2 / 3; }          /* 從第2行、第3列開始，只佔一格 */
.item3 { grid-area: 2 / 3 / 4; }      /* 從第2行、第3列開始，到第4行結束，column-end為auto */
.item4 { grid-area: 2 / 3 / 4 / 5; }  /* 完整四參數 */
```
{% endnote %}


### justify-self 和 align-self
與 FlexBox（彈性盒模型）相同觀念，可擺脫父屬性的 justify-items 和 align-items，以自身要求來調整對其方式。控制單個網格項目的對齊方式：

```html self-alignment.html
<style>
  .self-demo {
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #6c757d;
    margin: 20px 0;
  }

  .self-item {
    background: #17a2b8;
    color: white;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    width: 80px;
    height: 50px;
  }

  .self-start {
    justify-self: start;
    align-self: start;
    background: #dc3545;
  }

  .self-center {
    justify-self: center;
    align-self: center;
    background: #28a745;
  }

  .self-end {
    justify-self: end;
    align-self: end;
    background: #ffc107;
    color: #212529;
  }

  .self-stretch {
    justify-self: stretch;
    align-self: stretch;
    background: #6f42c1;
    width: auto;
    height: auto;
  }
</style>

<div class="self-demo">
  <div class="self-item self-start">start</div>
  <div class="self-item self-center">center</div>
  <div class="self-item self-end">end</div>
  <div class="self-item">預設</div>
  <div class="self-item self-stretch">stretch</div>
  <div class="self-item">預設</div>
</div>
```

## 實戰練習

### 範例一

{% note success %}
**跟著做：建立一個完整的網頁布局**
使用 CSS Grid 建立一個包含頭部、側邊欄、主要內容和頁尾的完整布局。
{% endnote %}

```html complete-layout.html
<style>
  .page-layout {
    display: grid;
    grid-template-areas:
      "header header header"
      "sidebar main ads"
      "footer footer footer";
    grid-template-columns: 250px 1fr 200px;
    grid-template-rows: 80px 1fr 60px;
    gap: 20px;
    min-height: 100vh;
    padding: 20px;
    background: #f8f9fa;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .layout-header {
    grid-area: header;
    background: #2c3e50;
    color: white;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .layout-sidebar {
    grid-area: sidebar;
    background: #34495e;
    color: white;
    padding: 20px;
    border-radius: 8px;
  }

  .layout-main {
    grid-area: main;
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .layout-ads {
    grid-area: ads;
    background: #e74c3c;
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }

  .layout-footer {
    grid-area: footer;
    background: #95a5a6;
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }

  .nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }

  .nav-links a:hover {
    color: #3498db;
  }

  .sidebar-menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .sidebar-menu li {
    margin-bottom: 10px;
    padding: 10px;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .sidebar-menu li:hover {
    background: rgba(255,255,255,0.2);
  }

  /* 響應式設計 */
  @media (max-width: 768px) {
    .page-layout {
      grid-template-areas:
        "header"
        "main"
        "sidebar"
        "ads"
        "footer";
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto auto;
    }
  }
</style>

<div class="page-layout">
  <header class="layout-header">
    <h1>我的網站</h1>
    <nav>
      <ul class="nav-links">
        <li><a href="#">首頁</a></li>
        <li><a href="#">關於</a></li>
        <li><a href="#">服務</a></li>
        <li><a href="#">聯絡</a></li>
      </ul>
    </nav>
  </header>

  <aside class="layout-sidebar">
    <h3>選單</h3>
    <ul class="sidebar-menu">
      <li>網頁設計</li>
      <li>前端開發</li>
      <li>後端開發</li>
      <li>資料庫</li>
      <li>雲端服務</li>
    </ul>
  </aside>

  <main class="layout-main">
    <h2>CSS Grid 布局完成！</h2>
    <p>這是一個使用 CSS Grid 建立的完整網頁布局，包含了：</p>
    <ul>
      <li>語義化的區域名稱定義</li>
      <li>響應式設計支援</li>
      <li>清晰的結構分離</li>
      <li>易於維護和修改</li>
    </ul>
    <p>透過 <code>grid-template-areas</code> 屬性，我們可以用直觀的方式定義布局，程式碼的可讀性大大提升。</p>
  </main>

  <aside class="layout-ads">
    <h4>廣告區域</h4>
    <p>這裡可以放置<br>廣告內容</p>
  </aside>

  <footer class="layout-footer">
    <p>&copy; 2024 CSS Grid 教學示例</p>
  </footer>
</div>
```

### 範例二

{% note success %}
**跟著做：建立現代響應式布局**
請使用 Grid 和 FlexBox 建立一個包含以下元素的頁面：
1. 頭部導航（使用 FlexBox）
2. 主要內容區域（使用 Grid）
3. 卡片列表（使用 FlexBox）
4. 頁尾（使用 FlexBox）
{% endnote %}

```html final-practice.html
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
  }

  .container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  /* 頭部導航 - FlexBox */
  .header {
    background: #2c3e50;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }

  .nav-links a:hover {
    color: #3498db;
  }

  /* 主要內容 - Grid */
  .main {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    padding: 2rem;
    background: #f8f9fa;
  }

  .sidebar {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    height: fit-content;
  }

  .content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  /* 卡片列表 - FlexBox */
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .card {
    flex: 1 1 300px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 1.5rem;
  }

  /* 頁尾 - FlexBox */
  .footer {
    background: #34495e;
    color: white;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 響應式設計 */
  @media (max-width: 768px) {
    .main {
      grid-template-columns: 1fr;
    }
    
    .header {
      flex-direction: column;
      gap: 1rem;
    }
    
    .nav-links {
      gap: 1rem;
    }
  }
</style>

<div class="container">
  <header class="header">
    <h1>現代布局示例</h1>
    <nav>
      <ul class="nav-links">
        <li><a href="#">首頁</a></li>
        <li><a href="#">產品</a></li>
        <li><a href="#">服務</a></li>
        <li><a href="#">聯絡</a></li>
      </ul>
    </nav>
  </header>

  <main class="main">
    <aside class="sidebar">
      <h3>分類</h3>
      <ul>
        <li>網頁設計</li>
        <li>前端開發</li>
        <li>使用者體驗</li>
        <li>程式開發</li>
      </ul>
    </aside>

    <section class="content">
      <h2>精選內容</h2>
      <p>這裡展示了現代 CSS 布局技術的強大功能，結合 Grid 和 FlexBox 創造出靈活且響應式的設計。</p>
      
      <div class="card-grid">
        <div class="card">
          <img src="https://picsum.photos/400/200/?random=1" alt="項目 1">
          <div class="card-content">
            <h3>CSS Grid 教學</h3>
            <p>學習如何使用 CSS Grid 建立複雜的二維布局。</p>
          </div>
        </div>
        
        <div class="card">
          <img src="https://picsum.photos/400/200/?random=2" alt="項目 2">
          <div class="card-content">
            <h3>FlexBox 完整指南</h3>
            <p>掌握 FlexBox 的所有屬性和應用技巧。</p>
          </div>
        </div>
        
        <div class="card">
          <img src="https://picsum.photos/400/200/?random=3" alt="項目 3">
          <div class="card-content">
            <h3>響應式設計</h3>
            <p>建立適應各種裝置的現代網頁設計。</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>&copy; 2024 現代布局教學。使用 Grid 和 FlexBox 技術。</p>
  </footer>
</div>
```



## 學習重點總結

{% note info %}
**CSS Grid 學習要點**
1. **理解基本概念**：格線、軌道、區域、格子
2. **掌握父容器屬性**：定義網格結構和對齊方式
3. **熟練子元素定位**：使用格線編號、span 或區域名稱
4. **善用 DevTools**：視覺化觀察網格結構
5. **響應式設計**：結合媒體查詢重新定義布局
{% endnote %}

透過這個重新組織的 CSS Grid 教學，您現在應該能夠：
- 理解 Grid 的核心概念和專有名詞
- 使用 DevTools 觀察和除錯 Grid 布局
- 掌握父容器的各種屬性設定
- 靈活運用子元素的定位方式
- 建立完整的二維布局系統

CSS Grid 是現代網頁開發的重要工具，掌握它將讓您的布局能力大幅提升！

## 學習資源推薦
以下整理幾個優質的線上互動練習網站，幫助你輕鬆學習並實作 CSS 布局技巧。

{% blockquote CSS Grid Garden https://cssgridgarden.com/#zh-tw %}
透過遊戲方式學習 CSS Grid 布局技巧，共 28 個關卡。
{% endblockquote %}

{% blockquote Grid Attack https://codingfantasy.com/games/css-grid-attack %}
透過遊戲方式學習 CSS Grid 布局技巧，共 80 個關卡。
{% endblockquote %}




# 布局技巧與選擇策略
選擇正確的布局技術是成功的關鍵。了解何時使用 FlexBox 和何時使用 Grid 是現代前端開發的重要技能。

## 一維布局 - 使用 FlexBox
當內容主要在一個方向上排列時使用：

```html one-dimension.html
  <style>
  /* 導航列 */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #343a40;
    color: white;
  }

  .nav-links {
      display: flex;
    list-style: none;
    gap: 20px;
  }

  /* 按鈕組 */
  .button-group {
    display: flex;
    gap: 10px;
    margin: 20px 0;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-primary { background: #007bff; color: white; }
  .btn-secondary { background: #6c757d; color: white; }
</style>

<nav class="navbar">
  <div class="brand">我的網站</div>
  <ul class="nav-links">
    <li><a href="#">首頁</a></li>
    <li><a href="#">關於</a></li>
    <li><a href="#">服務</a></li>
    <li><a href="#">聯絡</a></li>
  </ul>
</nav>

<div class="button-group">
  <button class="btn btn-primary">主要按鈕</button>
  <button class="btn btn-secondary">次要按鈕</button>
</div>
```

## 二維布局 - 使用 CSS Grid
當需要同時控制行和列時使用：

```html two-dimension.html
<style>
  .dashboard {
    display: grid;
    grid-template-areas:
      "header header header"
      "sidebar main ads"
      "footer footer footer";
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: 60px 1fr 40px;
    gap: 10px;
    height: 100vh;
    background: #f8f9fa;
  }

  .dashboard-header {
    grid-area: header;
    background: #007bff;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .dashboard-sidebar {
    grid-area: sidebar;
    background: #343a40;
    color: white;
    padding: 20px;
  }

  .dashboard-main {
    grid-area: main;
    background: white;
    padding: 20px;
    border-radius: 8px;
  }

  .dashboard-ads {
    grid-area: ads;
    background: #ffc107;
    padding: 10px;
    text-align: center;
  }

  .dashboard-footer {
    grid-area: footer;
    background: #6c757d;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    }
  </style>

<div class="dashboard">
  <div class="dashboard-header">控制台標題</div>
  <div class="dashboard-sidebar">側邊選單</div>
  <div class="dashboard-main">主要內容</div>
  <div class="dashboard-ads">廣告區</div>
  <div class="dashboard-footer">版權資訊</div>
  </div>
```

## 混合布局策略

在實際專案中，通常會結合使用 FlexBox 和 Grid：

```html hybrid-layout.html
<style>
  .page-layout {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  .page-header {
    background: #2c3e50;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .page-main {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 20px;
    padding: 20px;
  }

  .page-sidebar {
    background: #ecf0f1;
    padding: 20px;
    border-radius: 8px;
  }

  .page-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
  }

  .page-footer {
    background: #34495e;
    color: white;
    padding: 20px;
    text-align: center;
  }

  /* 文章列表使用 FlexBox */
  .article-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .article-item {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
  }
</style>

<div class="page-layout">
  <header class="page-header">
    <h1>我的部落格</h1>
    <nav>
      <a href="#">首頁</a>
      <a href="#">文章</a>
      <a href="#">關於</a>
    </nav>
  </header>

  <main class="page-main">
    <aside class="page-sidebar">
      <h3>分類</h3>
      <ul>
        <li>技術文章</li>
        <li>生活分享</li>
        <li>學習筆記</li>
      </ul>
    </aside>

    <section class="page-content">
      <div class="article-list">
        <article class="article-item">
          <img src="https://picsum.photos/100/100/?random=1" alt="文章圖片">
          <div>
            <h3>文章標題</h3>
            <p>文章摘要內容。..</p>
          </div>
        </article>
        <article class="article-item">
          <img src="https://picsum.photos/100/100/?random=2" alt="文章圖片">
          <div>
            <h3>另一篇文章</h3>
            <p>文章摘要內容。..</p>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer class="page-footer">
    <p>&copy; 2024 我的部落格。版權所有。</p>
  </footer>
</div>
```


# 總結

現代 CSS 布局技術為我們提供了強大且靈活的工具：

- **Float**：僅用於文繞圖效果
- **FlexBox**：專精於一維布局
- **CSS Grid**：專精於二維布局
- **混合使用**：在實際專案中結合使用


## 選擇策略總結
掌握這些技術，您就能建立出現代化、響應式且易於維護的網頁布局。記住，選擇合適的工具來解決特定的布局問題，這是成為優秀前端開發者的關鍵技能。

{% tabs layout-choice,1 %}
<!-- tab 使用 Float -->
- ✅ 文繞圖效果
- ❌ 複雜布局（已被淘汰）
- ❌ 響應式設計
<!-- endtab -->

<!-- tab 使用 FlexBox -->
- ✅ 一維布局（行或列）
- ✅ 導航選單
- ✅ 按鈕組和表單
- ✅ 卡片布局
- ✅ 垂直/水平置中
<!-- endtab -->

<!-- tab 使用 CSS Grid -->
- ✅ 二維布局（行和列）
- ✅ 整體頁面結構
- ✅ 複雜的響應式設計
- ✅ 圖片畫廊
- ✅ 儀表板布局
<!-- endtab -->
{% endtabs %}




## 技術選擇決策樹

選擇正確的布局技術是成功的關鍵。以下是一個實用的決策指南：

```html decision-tree.html
<style>
  .decision-tree {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    margin: 20px 0;
  }

  .decision-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }

  .decision-card h4 {
    margin-top: 0;
    color: #2c3e50;
  }

  .float-card {
    border-top: 4px solid #e74c3c;
  }

  .flex-card {
    border-top: 4px solid #3498db;
  }

  .grid-card {
    border-top: 4px solid #27ae60;
  }

  .use-case {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    font-size: 0.9rem;
  }

  .avoid-case {
    background: #fff5f5;
    border: 1px solid #fed7d7;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    font-size: 0.9rem;
    color: #c53030;
  }

  @media (max-width: 768px) {
    .decision-tree {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="decision-tree">
  <div class="decision-card float-card">
    <h4>🌊 Float</h4>
    <div class="use-case">
      <strong>✅ 適合：</strong><br>
      文繞圖效果<br>
      簡單的圖片對齊
    </div>
    <div class="avoid-case">
      <strong>❌ 避免：</strong><br>
      複雜布局<br>
      響應式設計<br>
      垂直對齊
    </div>
  </div>

  <div class="decision-card flex-card">
    <h4>📏 FlexBox</h4>
    <div class="use-case">
      <strong>✅ 適合：</strong><br>
      一維布局<br>
      導航選單<br>
      按鈕組<br>
      卡片排列<br>
      垂直/水平居中
    </div>
    <div class="avoid-case">
      <strong>❌ 避免：</strong><br>
      複雜二維布局<br>
      精確網格定位
    </div>
  </div>

  <div class="decision-card grid-card">
    <h4>📐 CSS Grid</h4>
    <div class="use-case">
      <strong>✅ 適合：</strong><br>
      二維布局<br>
      整體頁面結構<br>
      複雜響應式設計<br>
      圖片畫廊<br>
      雜誌式布局
    </div>
    <div class="avoid-case">
      <strong>❌ 避免：</strong><br>
      簡單的一維排列<br>
      舊瀏覽器兼容
    </div>
  </div>
</div>
```

## 實際場景分析

透過具體的場景分析，我們可以更好地理解何時使用哪種布局技術。以下是三個常見的實際應用場景：

### 場景一：響應式導航選單

```html responsive-nav-analysis.html
<style>
  .nav-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin: 20px 0;
  }

  .nav-example {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border: 2px solid #dee2e6;
  }

  .nav-example h5 {
    margin-top: 0;
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    color: white;
  }

  .flex-nav-title {
    background: #3498db;
  }

  .grid-nav-title {
    background: #27ae60;
  }

  .nav-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2c3e50;
    padding: 15px;
    border-radius: 4px;
  }

  .nav-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    background: #2c3e50;
    padding: 15px;
    border-radius: 4px;
  }

  .nav-brand {
    color: white;
    font-weight: bold;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 20px;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 3px;
    transition: background 0.3s;
  }

  .nav-links a:hover {
    background: rgba(255,255,255,0.1);
  }

  .nav-actions {
    display: flex;
    gap: 10px;
  }

  .nav-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .nav-btn-primary {
    background: #3498db;
    color: white;
  }

  .nav-grid .nav-links {
    justify-self: center;
  }

  @media (max-width: 768px) {
    .nav-comparison {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="nav-comparison">
  <div class="nav-example">
    <h5 class="flex-nav-title">FlexBox 方案</h5>
    <nav class="nav-flex">
      <div class="nav-brand">品牌</div>
      <ul class="nav-links">
        <li><a href="#">首頁</a></li>
        <li><a href="#">產品</a></li>
        <li><a href="#">服務</a></li>
      </ul>
      <div class="nav-actions">
        <button class="nav-btn nav-btn-primary">登入</button>
      </div>
    </nav>
    <p><strong>適合原因：</strong>一維排列，需要彈性分配空間</p>
  </div>

  <div class="nav-example">
    <h5 class="grid-nav-title">Grid 方案</h5>
    <nav class="nav-grid">
      <div class="nav-brand">品牌</div>
      <ul class="nav-links">
        <li><a href="#">首頁</a></li>
        <li><a href="#">產品</a></li>
        <li><a href="#">服務</a></li>
      </ul>
      <div class="nav-actions">
        <button class="nav-btn nav-btn-primary">登入</button>
      </div>
    </nav>
    <p><strong>適合原因：</strong>精確控制三個區域的定位</p>
  </div>
</div>
```

### 場景二：產品卡片網格

```html product-grid-analysis.html
<style>
  .product-comparison {
    margin: 20px 0;
  }

  .product-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    background: #e3f2fd;
    border-radius: 8px;
    margin: 20px 0;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    background: #f3e5f5;
    border-radius: 8px;
    margin: 20px 0;
  }

  .product-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }

  .product-flex .product-card {
    flex: 1 1 250px;
    border-left: 4px solid #2196f3;
  }

  .product-grid .product-card {
    border-left: 4px solid #9c27b0;
  }

  .product-card h6 {
    margin: 0 0 10px 0;
    color: #2c3e50;
  }

  .product-card p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .analysis-box {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin: 10px 0;
  }
</style>

<div class="product-comparison">
  <h4>🛍️ 產品卡片布局比較</h4>
  
  <div class="analysis-box">
    <strong>FlexBox 方案：</strong>
    <div class="product-flex">
      <div class="product-card">
        <h6>產品 A</h6>
        <p>彈性寬度，最小 250px</p>
      </div>
      <div class="product-card">
        <h6>產品 B</h6>
        <p>自動分配剩餘空間</p>
      </div>
      <div class="product-card">
        <h6>產品 C</h6>
        <p>適合數量不固定的情況</p>
      </div>
    </div>
    <p><strong>優勢：</strong>彈性分配空間，適合動態內容</p>
  </div>

  <div class="analysis-box">
    <strong>Grid 方案：</strong>
    <div class="product-grid">
      <div class="product-card">
        <h6>產品 A</h6>
        <p>自動填充列數</p>
      </div>
      <div class="product-card">
        <h6>產品 B</h6>
        <p>整齊的網格對齊</p>
      </div>
      <div class="product-card">
        <h6>產品 C</h6>
        <p>更精確的控制</p>
      </div>
    </div>
    <p><strong>優勢：</strong>完美的網格對齊，更好的空間利用</p>
  </div>
</div>
```

### 場景三：複合布局策略

```html hybrid-strategy.html
<style>
  .hybrid-demo {
    display: grid;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    min-height: 400px;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
  }

  .hybrid-header {
    grid-area: header;
    background: #2c3e50;
    color: white;
    padding: 15px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hybrid-sidebar {
    grid-area: sidebar;
    background: #34495e;
    color: white;
    padding: 15px;
    border-radius: 6px;
  }

  .hybrid-main {
    grid-area: main;
    background: white;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .hybrid-footer {
    grid-area: footer;
    background: #95a5a6;
    color: white;
    padding: 15px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 15px;
  }

  .content-card {
    flex: 1 1 200px;
    background: #ecf0f1;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    min-height: 100px;
  }

  .strategy-note {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    padding: 15px;
    border-radius: 6px;
    margin: 20px 0;
    color: #856404;
  }

  @media (max-width: 768px) {
    .hybrid-demo {
      grid-template-areas:
        "header"
        "main"
        "sidebar"
        "footer";
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="hybrid-demo">
  <header class="hybrid-header">
    <h5 style="margin: 0;">混合布局示例</h5>
    <nav style="display: flex; gap: 15px;">
      <a href="#" style="color: white;">首頁</a>
      <a href="#" style="color: white;">關於</a>
    </nav>
  </header>

  <aside class="hybrid-sidebar">
    <h6>側邊欄</h6>
    <p style="font-size: 0.9rem; margin: 0;">使用 Grid 精確定位</p>
  </aside>

  <main class="hybrid-main">
    <h4>主要內容</h4>
    <p>外層使用 Grid 控制整體布局，內層使用 FlexBox 控制卡片排列</p>
    <div class="content-cards">
      <div class="content-card">卡片 1</div>
      <div class="content-card">卡片 2</div>
      <div class="content-card">卡片 3</div>
  </div>
  </main>

  <footer class="hybrid-footer">
    <p style="margin: 0;">頁尾使用 FlexBox 居中</p>
  </footer>
</div>

<div class="strategy-note">
  <strong>💡 混合策略的優勢：</strong><br>
  • 外層 Grid：控制整體頁面結構<br>
  • 內層 FlexBox：處理組件內的元素排列<br>
  • 充分發揮兩種技術的優勢
</div>
```

## 性能與兼容性考量

```html browser-support.html
<style>
  .support-table {
    display: grid;
    grid-template-columns: auto repeat(4, 1fr);
    gap: 1px;
    background: #dee2e6;
    border-radius: 8px;
    overflow: hidden;
    margin: 20px 0;
  }

  .support-header {
    background: #495057;
    color: white;
    padding: 15px;
    text-align: center;
    font-weight: bold;
  }

  .support-cell {
    background: white;
    padding: 15px;
    text-align: center;
  }

  .support-good {
    background: #d4edda;
    color: #155724;
  }

  .support-partial {
    background: #fff3cd;
    color: #856404;
  }

  .support-poor {
    background: #f8d7da;
    color: #721c24;
  }

  .performance-tips {
    background: #e7f3ff;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #007bff;
    margin: 20px 0;
  }
</style>

<div class="support-table">
  <div class="support-header">技術</div>
  <div class="support-header">Chrome</div>
  <div class="support-header">Firefox</div>
  <div class="support-header">Safari</div>
  <div class="support-header">IE/Edge</div>

  <div class="support-cell"><strong>Float</strong></div>
  <div class="support-cell support-good">✅ 全支持</div>

  <div class="support-cell"><strong>FlexBox</strong></div>
  <div class="support-cell support-good">✅ 29+</div>
  <div class="support-cell support-good">✅ 28+</div>
  <div class="support-cell support-good">✅ 9+</div>
  <div class="support-cell support-partial">⚠️ IE11</div>

  <div class="support-cell"><strong>Grid</strong></div>
  <div class="support-cell support-good">✅ 57+</div>
  <div class="support-cell support-good">✅ 52+</div>
  <div class="support-cell support-good">✅ 10.1+</div>
  <div class="support-cell support-partial">⚠️ IE11</div>
</div>

<div class="performance-tips">
  <h4>🚀 性能優化建議</h4>
  <ul>
    <li><strong>避免深層嵌套</strong>：過多的 Grid 或 Flex 容器會影響性能</li>
    <li><strong>合理使用 gap</strong>：相比 margin，gap 屬性更高效</li>
    <li><strong>善用 CSS 硬件加速</strong>：transform 和 opacity 動畫性能更好</li>
    <li><strong>測試實際設備</strong>：不同設備的性能差異很大</li>
  </ul>
</div>
```

## 實戰決策流程

```html decision-flowchart.html
<style>
  .flowchart {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    margin: 20px 0;
  }

  .flow-step {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 20px;
    align-items: center;
    background: white;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .flow-question {
    background: #e3f2fd;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    color: #1565c0;
  }

  .flow-answer {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .flow-option {
    padding: 10px;
    border-radius: 4px;
    border: 2px solid #dee2e6;
    cursor: pointer;
    transition: all 0.3s;
  }

  .flow-option:hover {
    border-color: #007bff;
    background: #f8f9fa;
  }

  .flow-option.float {
    border-color: #e74c3c;
  }

  .flow-option.flex {
    border-color: #3498db;
  }

  .flow-option.grid {
    border-color: #27ae60;
  }

  .final-recommendation {
    background: #d4edda;
    border: 2px solid #c3e6cb;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    text-align: center;
  }
</style>

<div class="flowchart">
  <div class="flow-step">
    <div class="flow-question">需要文繞圖效果？</div>
    <div class="flow-answer">
      <div class="flow-option float">
        <strong>是</strong> → 使用 Float<br>
        <small>Float 專門用於文繞圖</small>
      </div>
      <div class="flow-option">
        <strong>否</strong> → 繼續下一步
      </div>
    </div>
  </div>

  <div class="flow-step">
    <div class="flow-question">需要二維布局控制？</div>
    <div class="flow-answer">
      <div class="flow-option grid">
        <strong>是</strong> → 使用 CSS Grid<br>
        <small>同時控制行和列</small>
      </div>
      <div class="flow-option">
        <strong>否</strong> → 繼續下一步
      </div>
    </div>
  </div>

  <div class="flow-step">
    <div class="flow-question">需要彈性空間分配？</div>
    <div class="flow-answer">
      <div class="flow-option flex">
        <strong>是</strong> → 使用 FlexBox<br>
        <small>一維彈性布局</small>
      </div>
      <div class="flow-option">
        <strong>否</strong> → 考慮傳統方法
      </div>
    </div>
  </div>
</div>

<div class="final-recommendation">
  <h4>🎯 最終建議</h4>
  <p>在現代網頁開發中，<strong>80%</strong> 的情況下會使用 <strong>FlexBox</strong> 和 <strong>Grid</strong> 的組合。<br>
  Float 僅保留用於文繞圖等特殊效果。</p>
</div>
```

{% note success %}
**布局技術選擇的黃金法則**
1. **Float**：只用於文繞圖，避免用於布局
2. **FlexBox**：一維布局的首選，特別適合組件內部
3. **Grid**：二維布局的王者，適合整體頁面結構
4. **組合使用**：發揮各自優勢，創造完美布局
5. **響應式優先**：選擇天然支持響應式的技術
{% endnote %}

