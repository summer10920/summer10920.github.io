---
title: "[基礎課程] CSS 教學（一）：觀念與選擇器"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
date: 2020-03-06 15:55:32
---

![](assets/images/lElmG8a.png)

這是一份專為 CSS 初學者設計的基礎教材，將帶你從零開始認識 CSS 的核心概念。CSS 是控制網頁視覺外觀的關鍵技術，學會它就等於掌握了讓網頁變得美觀的能力。本系列教材共分為五個章節，無論你是完全沒接觸過 CSS 的新手，還是想複習基礎觀念的學習者，都能在這裡找到實用的內容。

在這第一篇教學中，我們將專注於學習 CSS 最基本的 `color` 屬性，並透過它來深入理解各種選擇器的使用方式。透過大量的顏色範例，你將能夠具體看到每種選擇器如何影響網頁元素，建立起對 CSS 運作機制的扎實理解。

<!-- more -->

# CSS 基礎觀念

## 什麼是 CSS？
CSS（Cascading Style Sheets，層疊樣式表）是一種專門用來描述網頁外觀的語言。如果把 HTML 比作房子的結構骨架，那麼 CSS 就是負責裝潢和美化的工具。CSS 能夠控制網頁中每個元素的顏色、字體、大小、位置等視覺效果。

當瀏覽器載入網頁時，它會先解析 HTML 結構，然後根據 CSS 的規則來決定每個元素應該如何呈現。這個過程就像是瀏覽器在按照 CSS 的「設計圖」來為 HTML 元素穿上漂亮的外衣。

## CSS 的工作原理
CSS 的運作方式可以簡化為三個步驟：
1. **選擇目標**：透過選擇器（selector）指定要修改的 HTML 元素
2. **設定樣式**：定義這些元素應該呈現的外觀
3. **套用效果**：瀏覽器根據這些設定來渲染網頁

舉個簡單的例子：
```css
h1 {
  color: red;
}
```
這段 CSS 的意思是：「找到所有的 `h1` 標題元素，將它們的文字顏色設定為紅色。」

{% note success %}
**實際體驗 CSS 的效果**
開啟 Chrome 瀏覽器，隨便訪問一個網站，按下 <kbd>F12</kbd> 開啟開發者工具。點選 <kbd>Elements</kbd> 分頁，然後點選任意一個 HTML 元素，右側的 <kbd>Styles</kbd> 面板就會顯示該元素的 CSS 樣式設定。你可以在這裡即時修改 CSS 屬性，立即看到網頁的變化！
{% endnote %}

## CSS 語法結構

CSS 的語法結構非常簡潔且有邏輯性，主要由選擇器、屬性和值組成：

```css
選擇器 {
  屬性名稱：屬性值；
}
```

讓我們分析一個具體的例子：
```css
p {
  color: blue;
  color: #0066cc;
}
```

**語法說明：**
- `p` 是選擇器，代表要選擇所有的段落元素
- `{}` 大括號包含所有的樣式設定
- `color` 是屬性名稱，指定要修改的樣式類型
- `blue` 和 `#0066cc` 是屬性值，定義具體的顏色
- `;` 分號用來分隔不同的屬性設定

{% note primary %}
**學習素材準備**
建立一個 HTML 檔案來跟著練習，這樣你就能立即看到每個 CSS 效果：

```html practice.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Color 練習</title>
  <style>
    /* 在這裡寫入你的 CSS 練習代碼 */
  </style>
</head>
<body>
  <h1>主標題</h1>
  <h2>次標題</h2>
  <p>這是第一個段落，用來測試 CSS 的 color 屬性。</p>
  <p>這是第二個段落，我們會用它來學習不同的選擇器。</p>
  <div>這是一個 div 區塊元素。</div>
  <span>這是一個 span 行內元素。</span>
</body>
</html>
```
{% endnote %}

## 第一個 CSS 練習

現在讓我們寫下第一個 CSS 規則，體驗改變文字顏色的效果：

**練習 1：簡單的顏色設定**
```css
h1 {
  color: red;
}
```
將這段 CSS 加入到上面 HTML 的 `<style>` 標籤中，你會看到主標題變成紅色。

**練習 2：多個元素的顏色設定**
```css
h1 {
  color: red;
}

p {
  color: blue;
}

div {
  color: green;
}
```
這次你會看到標題是紅色，段落是藍色，div 是綠色。

**練習 3：同時選擇多個元素**
```css
h1, h2, p {
  color: purple;
}
```
這個寫法可以讓標題和段落都變成紫色。

# CSS 撰寫位置

CSS 可以寫在四個不同的地方，每個位置都有其特定的使用時機和優缺點。理解這些差異對於組織和維護 CSS 代碼非常重要。

## 行內樣式（Inline Style）

行內樣式是直接寫在 HTML 元素的 `style` 屬性中的 CSS，它具有最高的優先權：

```html
<h1 style="color: red;">這是紅色的標題</h1>
<p style="color: blue;">這是藍色的段落</p>
<div style="color: green;">這是綠色的區塊</div>
```

**優點：**
- 優先權最高，一定會被套用
- 可以快速測試單個元素的樣式
- 不需要額外的 CSS 檔案

**缺點：**
- 無法重複使用，每個元素都要單獨設定
- 讓 HTML 代碼變得混亂
- 很難維護和管理
- 無法使用選擇器的進階功能

**使用時機：**
- 快速測試樣式效果
- 特殊情況下需要覆蓋其他樣式
- 動態產生的內容（如 JavaScript 動態設定）

## 頁面內嵌樣式（Internal Style）

內嵌樣式是寫在 HTML 文件 `<head>` 區域中的 `<style>` 標籤內：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>內嵌樣式示範</title>
  <style>
    h1 {
      color: darkred;
    }
    
    p {
      color: navy;
    }
    
    .highlight {
      color: orange;
    }
    
    #special {
      color: purple;
    }
  </style>
</head>
<body>
  <h1>主標題</h1>
  <p>普通段落</p>
  <p class="highlight">特殊段落</p>
  <p id="special">獨特段落</p>
</body>
</html>
```

**優點：**
- 可以使用所有 CSS 功能（選擇器、偽類等）
- 整個頁面的樣式集中管理
- 載入速度快（不需要額外的 HTTP 請求）

**缺點：**
- 只能用於單一頁面
- 當頁面很多時，每個頁面都需要複製相同的樣式
- HTML 檔案會變得較大

**使用時機：**
- 單頁面應用或獨立頁面
- 該頁面有特殊的樣式需求
- 快速原型開發

## 外部樣式表（External Style）

外部樣式表是將 CSS 寫在獨立的 `.css` 檔案中，然後在 HTML 中引用：

**步驟 1：建立 CSS 檔案**
```css style.css
/* 這是外部樣式表檔案 */
h1 {
  color: crimson;
}

h2 {
  color: darkblue;
}

p {
  color: darkgreen;
}

/* 可以寫註解來說明樣式的用途 */
.important {
  color: red;
}

.warning {
  color: orange;
}

.success {
  color: green;
}
```

**步驟 2：在 HTML 中引用**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>外部樣式表示範</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>主標題</h1>
  <h2>次標題</h2>
  <p>普通段落</p>
  <p class="important">重要訊息</p>
  <p class="warning">警告訊息</p>
  <p class="success">成功訊息</p>
</body>
</html>
```

**優點：**
- 可以在多個頁面中重複使用
- HTML 和 CSS 分離，代碼更整潔
- 易於維護和更新
- 瀏覽器會快取 CSS 檔案，提高載入效率
- 團隊協作更容易

**缺點：**
- 需要額外的 HTTP 請求
- 首次載入時間稍長

**使用時機：**
- 多頁面網站
- 需要統一視覺風格的專案
- 團隊開發
- 正式的網站專案

## 匯入樣式（Import Style）

匯入樣式是在 CSS 檔案中引入其他 CSS 檔案的方式：

```css main.css
/* 匯入其他 CSS 檔案 */
@import url("colors.css");
@import url("typography.css");
@import url("layout.css");

/* 本檔案的 CSS 規則 */
body {
  color: #333;
}
```

```css colors.css
/* 專門定義顏色的 CSS 檔案 */
.red-text {
  color: red;
}

.blue-text {
  color: blue;
}

.green-text {
  color: green;
}
```

**優點：**
- 可以將 CSS 分模組管理
- 便於組織大型專案的樣式
- 可以建立樣式庫供多個專案使用

**缺點：**
- 會增加 HTTP 請求數量
- 載入順序可能影響樣式效果
- 現代開發中較少使用

{% note warning %}
**@import 使用注意事項**
- `@import` 必須寫在 CSS 檔案的最前面
- 現代前端開發通常使用建構工具（如 Webpack）來處理 CSS 模組化
- 如果不是特殊需求，建議使用 `<link>` 標籤引入 CSS
{% endnote %}

**使用時機：**
- 需要模組化管理 CSS
- 建立可重複使用的樣式庫
- 特殊的專案架構需求



# Color 屬性詳解

`color` 屬性是 CSS 中最基本也是最重要的屬性之一，它用來設定文字的顏色。了解 color 屬性的各種表示方法，對於後續學習其他 CSS 屬性有很大的幫助。

## 顏色表示方法

### 1. 顏色名稱（Color Names）
CSS 預定義了 147 種顏色名稱，這些是最直觀的顏色表示方法：

```css
/* 基本顏色 */
.red { color: red; }
.blue { color: blue; }
.green { color: green; }
.yellow { color: yellow; }
.purple { color: purple; }
.orange { color: orange; }
.pink { color: pink; }
.brown { color: brown; }

/* 深色系 */
.darkred { color: darkred; }
.darkblue { color: darkblue; }
.darkgreen { color: darkgreen; }
.darkorange { color: darkorange; }

/* 淺色系 */
.lightcoral { color: lightcoral; }
.lightblue { color: lightblue; }
.lightgreen { color: lightgreen; }
.lightyellow { color: lightyellow; }

/* 特殊顏色 */
.black { color: black; }
.white { color: white; }
.gray { color: gray; }
.silver { color: silver; }
.transparent { color: transparent; }
```

### 2. HEX 色碼（Hexadecimal Colors）
使用 16 進位數字表示顏色，是網頁設計中最常用的方式：

```css
/* 基本 HEX 色碼 */
.hex-red { color: #ff0000; }
.hex-green { color: #00ff00; }
.hex-blue { color: #0000ff; }

/* 簡寫形式（當兩位數字相同時） */
.hex-red-short { color: #f00; }     /* 等同於 #ff0000 */
.hex-green-short { color: #0f0; }   /* 等同於 #00ff00 */
.hex-blue-short { color: #00f; }    /* 等同於 #0000ff */

/* 常用的網頁顏色 */
.hex-white { color: #ffffff; }      /* 純白 */
.hex-black { color: #000000; }      /* 純黑 */
.hex-gray { color: #808080; }       /* 中灰 */
.hex-navy { color: #000080; }       /* 海軍藍 */
.hex-crimson { color: #dc143c; }    /* 深紅 */
```

### 3. RGB 顏色（RGB Colors）
使用紅 (Red)、綠 (Green)、藍 (Blue) 三原色的數值來表示顏色：

```css
/* 基本 RGB 顏色 */
.rgb-red { color: rgb(255, 0, 0); }     /* 純紅 */
.rgb-green { color: rgb(0, 255, 0); }   /* 純綠 */
.rgb-blue { color: rgb(0, 0, 255); }    /* 純藍 */

/* 混合顏色 */
.rgb-purple { color: rgb(128, 0, 128); }    /* 紫色 */
.rgb-orange { color: rgb(255, 165, 0); }    /* 橘色 */
.rgb-pink { color: rgb(255, 192, 203); }    /* 粉紅 */

/* 灰階顏色 */
.rgb-white { color: rgb(255, 255, 255); }   /* 白色 */
.rgb-black { color: rgb(0, 0, 0); }         /* 黑色 */
.rgb-gray { color: rgb(128, 128, 128); }    /* 中灰 */
.rgb-light-gray { color: rgb(211, 211, 211); }  /* 淺灰 */
.rgb-dark-gray { color: rgb(64, 64, 64); }  /* 深灰 */
```

### 4. RGBA 顏色（RGB with Alpha）
在 RGB 基礎上增加透明度控制：

```css
/* 半透明效果 */
.rgba-red { color: rgba(255, 0, 0, 0.5); }     /* 50% 透明的紅色 */
.rgba-blue { color: rgba(0, 0, 255, 0.7); }    /* 70% 透明的藍色 */
.rgba-green { color: rgba(0, 255, 0, 0.3); }   /* 30% 透明的綠色 */

/* 不同透明度的同一顏色 */
.rgba-black-10 { color: rgba(0, 0, 0, 0.1); }  /* 10% 透明 */
.rgba-black-25 { color: rgba(0, 0, 0, 0.25); } /* 25% 透明 */
.rgba-black-50 { color: rgba(0, 0, 0, 0.5); }  /* 50% 透明 */
.rgba-black-75 { color: rgba(0, 0, 0, 0.75); } /* 75% 透明 */
.rgba-black-90 { color: rgba(0, 0, 0, 0.9); }  /* 90% 透明 */
```

### 5. HSL 顏色（Hue, Saturation, Lightness）
使用色相、飽和度、亮度來表示顏色：

```css
/* 基本 HSL 顏色 */
.hsl-red { color: hsl(0, 100%, 50%); }      /* 純紅 */
.hsl-green { color: hsl(120, 100%, 50%); }  /* 純綠 */
.hsl-blue { color: hsl(240, 100%, 50%); }   /* 純藍 */

/* 不同飽和度的紅色 */
.hsl-red-100 { color: hsl(0, 100%, 50%); }  /* 100% 飽和度 */
.hsl-red-75 { color: hsl(0, 75%, 50%); }    /* 75% 飽和度 */
.hsl-red-50 { color: hsl(0, 50%, 50%); }    /* 50% 飽和度 */
.hsl-red-25 { color: hsl(0, 25%, 50%); }    /* 25% 飽和度 */

/* 不同亮度的藍色 */
.hsl-blue-90 { color: hsl(240, 100%, 90%); }  /* 90% 亮度 */
.hsl-blue-70 { color: hsl(240, 100%, 70%); }  /* 70% 亮度 */
.hsl-blue-50 { color: hsl(240, 100%, 50%); }  /* 50% 亮度 */
.hsl-blue-30 { color: hsl(240, 100%, 30%); }  /* 30% 亮度 */
```

### 6. HSLA 顏色（HSL with Alpha）
在 HSL 基礎上增加透明度控制：

```css
/* 半透明的 HSL 顏色 */
.hsla-red { color: hsla(0, 100%, 50%, 0.6); }
.hsla-green { color: hsla(120, 100%, 50%, 0.4); }
.hsla-blue { color: hsla(240, 100%, 50%, 0.8); }
```

## 顏色選擇的實用建議

### 1. 可讀性考量
```css
/* 良好的對比度 */
.good-contrast { color: #333333; }      /* 深灰文字 */
.high-contrast { color: #000000; }      /* 黑色文字 */

/* 避免對比度過低 */
.poor-contrast { color: #cccccc; }      /* 淺灰文字（在白背景上不易閱讀） */
```

### 2. 語義化顏色
```css
/* 狀態顏色 */
.success { color: #28a745; }    /* 成功 - 綠色 */
.warning { color: #ffc107; }    /* 警告 - 黃色 */
.error { color: #dc3545; }      /* 錯誤 - 紅色 */
.info { color: #17a2b8; }       /* 資訊 - 藍色 */

/* 重要性顏色 */
.primary { color: #007bff; }    /* 主要 */
.secondary { color: #6c757d; }  /* 次要 */
.muted { color: #6c757d; }      /* 淡化 */
```

### 3. 品牌色彩
```css
/* 常見品牌色彩參考 */
.facebook-blue { color: #1877f2; }
.twitter-blue { color: #1da1f2; }
.instagram-pink { color: #e4405f; }
.youtube-red { color: #ff0000; }
.google-red { color: #ea4335; }
.google-blue { color: #4285f4; }
```

## 實際練習範例

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>Color 屬性完整練習</title>
  <style>
    /* 使用顏色名稱 */
    .name-red { color: red; }
    .name-blue { color: blue; }
    .name-green { color: green; }
    
    /* 使用 HEX 色碼 */
    .hex-crimson { color: #dc143c; }
    .hex-navy { color: #000080; }
    .hex-forest { color: #228b22; }
    
    /* 使用 RGB */
    .rgb-orange { color: rgb(255, 165, 0); }
    .rgb-purple { color: rgb(128, 0, 128); }
    .rgb-teal { color: rgb(0, 128, 128); }
    
    /* 使用 RGBA */
    .rgba-semi { color: rgba(255, 0, 0, 0.5); }
    .rgba-light { color: rgba(0, 0, 0, 0.3); }
    
    /* 使用 HSL */
    .hsl-bright { color: hsl(60, 100%, 50%); }
    .hsl-pastel { color: hsl(300, 50%, 70%); }
  </style>
</head>
<body>
  <h1>CSS Color 屬性練習</h1>
  
  <h2>顏色名稱</h2>
  <p class="name-red">紅色文字</p>
  <p class="name-blue">藍色文字</p>
  <p class="name-green">綠色文字</p>
  
  <h2>HEX 色碼</h2>
  <p class="hex-crimson">深紅色文字</p>
  <p class="hex-navy">海軍藍文字</p>
  <p class="hex-forest">森林綠文字</p>
  
  <h2>RGB 顏色</h2>
  <p class="rgb-orange">橘色文字</p>
  <p class="rgb-purple">紫色文字</p>
  <p class="rgb-teal">青色文字</p>
  
  <h2>RGBA 顏色</h2>
  <p class="rgba-semi">半透明紅色文字</p>
  <p class="rgba-light">淺透明黑色文字</p>
  
  <h2>HSL 顏色</h2>
  <p class="hsl-bright">明亮黃色文字</p>
  <p class="hsl-pastel">柔和紫色文字</p>
</body>
</html>
```

透過這些範例，你可以清楚地看到不同顏色表示方法的效果，並理解如何在實際專案中選擇適合的顏色表示方式。

# CSS 選擇器完全指南

選擇器是 CSS 的核心概念，它決定了你的樣式規則會套用到哪些 HTML 元素上。理解選擇器的運作方式，就等於掌握了 CSS 的靈魂。在這個章節中，我們將透過大量的 color 屬性範例，讓你徹底理解每種選擇器的特性和使用方法。

## 基本選擇器

### 1. 元素選擇器（Type Selector）

元素選擇器是最基本的選擇器，直接使用 HTML 標籤名稱來選擇元素。它會選中頁面上所有該類型的元素，影響範圍最大，但優先權最低。

```css
/* 選擇所有的標題元素 */
h1 { color: darkblue; }
h2 { color: mediumblue; }
h3 { color: royalblue; }
h4 { color: cornflowerblue; }
h5 { color: lightblue; }
h6 { color: lightsteelblue; }

/* 選擇所有的段落 */
p { color: #333333; }

/* 選擇所有的區塊元素 */
div { color: #666666; }

/* 選擇所有的行內元素 */
span { color: #999999; }

/* 選擇所有的清單項目 */
li { color: darkgreen; }

/* 選擇所有的連結 */
a { color: #0066cc; }
```

**實際應用範例：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>元素選擇器示範</title>
  <style>
    /* 設定全站的基本文字顏色 */
    body { color: #333; }
    
    /* 所有標題都使用深藍色 */
    h1, h2, h3, h4, h5, h6 { color: #1a365d; }
    
    /* 所有段落使用稍淺的顏色 */
    p { color: #4a5568; }
    
    /* 所有連結使用品牌色 */
    a { color: #3182ce; }
    
    /* 所有清單項目使用綠色 */
    ul, ol { color: #2d7d32; }
  </style>
</head>
<body>
  <h1>這是 H1 標題</h1>
  <h2>這是 H2 標題</h2>
  <p>這是一個段落，會套用段落的顏色設定。</p>
  <a href="#">這是一個連結</a>
  <ul>
    <li>清單項目 1</li>
    <li>清單項目 2</li>
  </ul>
</body>
</html>
```

**元素選擇器的特點：**
- 優先權最低，容易被其他選擇器覆蓋
- 適合設定全站的基本樣式
- 影響範圍最大，會套用到所有該類型的元素

### 2. Class 選擇器（Class Selector）

Class 選擇器使用 `.` 符號加上 class 名稱來選擇元素。它是最常用的選擇器，具有良好的重複使用性和適中的優先權。

```css
/* 基本 class 選擇器 */
.highlight { color: #ff6b6b; }
.muted { color: #999999; }
.important { color: #e74c3c; }
.secondary { color: #6c757d; }

/* 語義化的 class 命名 */
.success { color: #28a745; }
.warning { color: #ffc107; }
.error { color: #dc3545; }
.info { color: #17a2b8; }

/* 功能性的 class 命名 */
.text-primary { color: #007bff; }
.text-secondary { color: #6c757d; }
.text-success { color: #28a745; }
.text-danger { color: #dc3545; }
.text-warning { color: #ffc107; }
.text-info { color: #17a2b8; }
.text-light { color: #f8f9fa; }
.text-dark { color: #343a40; }
.text-muted { color: #6c757d; }

/* 狀態相關的 class */
.active { color: #007bff; }
.disabled { color: #6c757d; }
.selected { color: #28a745; }
.hover-effect { color: #6f42c1; }
```

**多個 class 的使用：**
```html
<style>
  .base-text { color: #333; }
  .large { font-size: 18px; }
  .bold { font-weight: bold; }
  .red { color: red; }
  .blue { color: blue; }
  .green { color: green; }
</style>

<p class="base-text">基本文字</p>
<p class="base-text large">大一點的文字</p>
<p class="base-text bold red">粗體紅色文字</p>
<p class="base-text large bold blue">大又粗的藍色文字</p>
<p class="green bold">綠色粗體文字</p>
```

**Class 選擇器的實際應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>Class 選擇器示範</title>
  <style>
    /* 訊息卡片的不同狀態 */
    .message { color: #333; }
    .message.success { color: #155724; }
    .message.warning { color: #856404; }
    .message.error { color: #721c24; }
    .message.info { color: #0c5460; }
    
    /* 按鈕的不同類型 */
    .btn { color: #fff; }
    .btn.primary { color: #007bff; }
    .btn.secondary { color: #6c757d; }
    .btn.success { color: #28a745; }
    .btn.danger { color: #dc3545; }
    
    /* 文字大小的變化 */
    .text-sm { color: #666; }
    .text-md { color: #333; }
    .text-lg { color: #000; }
    
    /* 特殊效果 */
    .gradient-text { color: #667eea; }
    .shadow-text { color: #2d3748; }
    .accent-text { color: #9f7aea; }
  </style>
</head>
<body>
  <h1>Class 選擇器應用示範</h1>
  
  <div class="message success">成功訊息</div>
  <div class="message warning">警告訊息</div>
  <div class="message error">錯誤訊息</div>
  <div class="message info">資訊訊息</div>
  
  <button class="btn primary">主要按鈕</button>
  <button class="btn secondary">次要按鈕</button>
  <button class="btn success">成功按鈕</button>
  <button class="btn danger">危險按鈕</button>
  
  <p class="text-sm">小號文字</p>
  <p class="text-md">中號文字</p>
  <p class="text-lg">大號文字</p>
  
  <p class="gradient-text">漸層色文字</p>
  <p class="shadow-text">陰影色文字</p>
  <p class="accent-text">強調色文字</p>
</body>
</html>
```

### 3. ID 選擇器（ID Selector）

ID 選擇器使用 `#` 符號加上 ID 名稱來選擇元素。由於 ID 在頁面中應該是唯一的，所以 ID 選擇器通常用於選擇特定的元素，具有很高的優先權。

```css
/* 頁面區塊的 ID 選擇器 */
#header { color: #2c3e50; }
#navigation { color: #34495e; }
#main-content { color: #2c3e50; }
#sidebar { color: #7f8c8d; }
#footer { color: #95a5a6; }

/* 特殊元素的 ID 選擇器 */
#logo { color: #e74c3c; }
#search-box { color: #3498db; }
#user-menu { color: #9b59b6; }
#shopping-cart { color: #e67e22; }

/* 動態內容的 ID 選擇器 */
#notification { color: #f39c12; }
#loading-message { color: #1abc9c; }
#error-display { color: #e74c3c; }
#success-message { color: #27ae60; }
```

**ID 選擇器的實際應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>ID 選擇器示範</title>
  <style>
    /* 網站架構的主要區域 */
    #site-header { color: #2c3e50; }
    #main-navigation { color: #34495e; }
    #content-area { color: #2c3e50; }
    #sidebar-area { color: #7f8c8d; }
    #site-footer { color: #95a5a6; }
    
    /* 特殊功能區域 */
    #search-form { color: #3498db; }
    #user-profile { color: #9b59b6; }
    #shopping-cart { color: #e67e22; }
    
    /* 動態狀態顯示 */
    #loading-spinner { color: #1abc9c; }
    #error-message { color: #e74c3c; }
    #success-alert { color: #27ae60; }
    #warning-notice { color: #f39c12; }
  </style>
</head>
<body>
  <header id="site-header">
    <h1>網站標題</h1>
  </header>
  
  <nav id="main-navigation">
    <ul>
      <li><a href="#">首頁</a></li>
      <li><a href="#">關於我們</a></li>
      <li><a href="#">聯絡我們</a></li>
    </ul>
  </nav>
  
  <main id="content-area">
    <h2>主要內容區域</h2>
    <p>這裡是頁面的主要內容。</p>
  </main>
  
  <aside id="sidebar-area">
    <h3>側邊欄</h3>
    <p>這裡是側邊欄內容。</p>
  </aside>
  
  <footer id="site-footer">
    <p>版權所有 © 2024</p>
  </footer>
  
  <!-- 動態狀態元素 -->
  <div id="loading-spinner">載入中。..</div>
  <div id="error-message">發生錯誤！</div>
  <div id="success-alert">操作成功！</div>
  <div id="warning-notice">注意事項</div>
</body>
</html>
```

## 優先權順序

當同一個元素被多個位置的 CSS 設定時，優先權順序如下（由高到低）：

1. **行內樣式** - 最高優先權
2. **ID 選擇器** - 高優先權
3. **Class 選擇器** - 中等優先權
4. **元素選擇器** - 低優先權
5. **瀏覽器預設樣式** - 最低優先權

當同一個元素被多個選擇器指定時，瀏覽器會根據優先權來決定最終的樣式：

```html
<style>
  /* 元素選擇器 - 優先權最低 */
  p { color: blue; }
  
  /* Class 選擇器 - 中等優先權 */
  .important { color: red; }
  
  /* ID 選擇器 - 高優先權 */
  #special { color: green; }
  
  /* 行內樣式 - 最高優先權 */
  /* style="color: purple;" */
</style>

<p>普通段落 - 藍色</p>
<p class="important">重要段落 - 紅色</p>
<p id="special">特殊段落 - 綠色</p>
<p id="special" class="important">同時有 ID 和 Class - 綠色（ID 優先）</p>
<p id="special" class="important" style="color: purple;">行內樣式 - 紫色（行內樣式優先）</p>
```

## 組合選擇器

### 1. 後代選擇器（Descendant Selector）

後代選擇器使用空格分隔多個選擇器，選擇某個元素內部的所有指定後代元素（包括直接子元素和更深層的子元素）。

```css
/* 基本後代選擇器 */
div p { color: #e74c3c; }           /* div 內的所有 p 元素 */
nav a { color: #3498db; }           /* nav 內的所有 a 元素 */
header h1 { color: #2c3e50; }       /* header 內的所有 h1 元素 */

/* 多層後代選擇器 */
main article p { color: #34495e; }  /* main 內 article 內的所有 p 元素 */
nav ul li { color: #9b59b6; }       /* nav 內 ul 內的所有 li 元素 */
footer div p { color: #95a5a6; }    /* footer 內 div 內的所有 p 元素 */

/* Class 與後代選擇器結合 */
.content p { color: #2c3e50; }      /* class="content" 元素內的所有 p */
.sidebar a { color: #e67e22; }      /* class="sidebar" 元素內的所有 a */
.header .logo { color: #e74c3c; }   /* class="header" 內 class="logo" 的元素 */

/* ID 與後代選擇器結合 */
#main-content p { color: #34495e; } /* id="main-content" 內的所有 p */
#navigation a { color: #3498db; }   /* id="navigation" 內的所有 a */
#footer .copyright { color: #7f8c8d; } /* id="footer" 內 class="copyright" 的元素 */
```

**後代選擇器的實際應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>後代選擇器示範</title>
  <style>
    /* 導航區域的連結 */
    nav a { color: #3498db; }
    nav ul li { color: #2c3e50; }
    
    /* 主要內容區域 */
    main p { color: #34495e; }
    main h2 { color: #2c3e50; }
    main article p { color: #2c3e50; }
    
    /* 側邊欄區域 */
    aside p { color: #7f8c8d; }
    aside .widget-title { color: #9b59b6; }
    
    /* 頁尾區域 */
    footer p { color: #95a5a6; }
    footer .social-links a { color: #e74c3c; }
    
    /* 卡片內容 */
    .card p { color: #2c3e50; }
    .card .title { color: #e74c3c; }
    .card .meta { color: #7f8c8d; }
    
    /* 表單內容 */
    form label { color: #34495e; }
    form input { color: #2c3e50; }
    form .help-text { color: #7f8c8d; }
  </style>
</head>
<body>
  <nav>
    <ul>
      <li><a href="#">首頁</a></li>
      <li><a href="#">關於我們</a></li>
      <li><a href="#">聯絡我們</a></li>
    </ul>
  </nav>
  
  <main>
    <h2>主要內容</h2>
    <p>這是主要內容區域的段落。</p>
    
    <article>
      <p>這是文章內的段落。</p>
    </article>
    
    <div class="card">
      <h3 class="title">卡片標題</h3>
      <p>卡片內容段落。</p>
      <div class="meta">發布時間：2024-01-01</div>
    </div>
  </main>
  
  <aside>
    <h3 class="widget-title">側邊欄標題</h3>
    <p>側邊欄段落內容。</p>
  </aside>
  
  <footer>
    <p>版權資訊</p>
    <div class="social-links">
      <a href="#">Facebook</a>
      <a href="#">Twitter</a>
    </div>
  </footer>
</body>
</html>
```

### 2. 子元素選擇器（Child Selector）

子元素選擇器使用 `>` 符號，只選擇直接子元素，不包括更深層的後代元素。

```css
/* 基本子元素選擇器 */
div > p { color: #e74c3c; }         /* div 的直接子元素 p */
nav > ul { color: #3498db; }        /* nav 的直接子元素 ul */
header > h1 { color: #2c3e50; }     /* header 的直接子元素 h1 */

/* 多層子元素選擇器 */
main > article > p { color: #34495e; } /* main 的直接子元素 article 的直接子元素 p */
nav > ul > li { color: #9b59b6; }    /* nav 的直接子元素 ul 的直接子元素 li */

/* Class 與子元素選擇器結合 */
.content > p { color: #2c3e50; }    /* class="content" 的直接子元素 p */
.sidebar > .widget { color: #e67e22; } /* class="sidebar" 的直接子元素 class="widget" */

/* ID 與子元素選擇器結合 */
#main-content > p { color: #34495e; } /* id="main-content" 的直接子元素 p */
#navigation > ul { color: #3498db; } /* id="navigation" 的直接子元素 ul */
```

**子元素選擇器 vs 後代選擇器的比較：**
```html
<style>
  /* 後代選擇器 - 選擇所有後代 */
  .ancestor p { color: red; }
  
  /* 子元素選擇器 - 只選擇直接子元素 */
  .parent > p { color: blue; }
</style>

<div class="ancestor parent">
  <p>直接子元素 - 藍色（被子元素選擇器選中）</p>
  <div>
    <p>孫子元素 - 紅色（只被後代選擇器選中）</p>
    <div>
      <p>曾孫子元素 - 紅色（只被後代選擇器選中）</p>
    </div>
  </div>
</div>
```

### 3. 相鄰兄弟選擇器（Adjacent Sibling Selector）

相鄰兄弟選擇器使用 `+` 符號，選擇緊接在指定元素後面的第一個兄弟元素。

```css
/* 基本相鄰兄弟選擇器 */
h1 + p { color: #e74c3c; }          /* 緊接在 h1 後面的第一個 p 元素 */
h2 + p { color: #3498db; }          /* 緊接在 h2 後面的第一個 p 元素 */
img + p { color: #2c3e50; }         /* 緊接在 img 後面的第一個 p 元素 */

/* Class 與相鄰兄弟選擇器結合 */
.intro + p { color: #34495e; }      /* 緊接在 class="intro" 後面的第一個 p 元素 */
.highlight + .content { color: #9b59b6; } /* 緊接在 class="highlight" 後面的 class="content" 元素 */

/* ID 與相鄰兄弟選擇器結合 */
#title + p { color: #e67e22; }      /* 緊接在 id="title" 後面的第一個 p 元素 */
```

**相鄰兄弟選擇器的實際應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>相鄰兄弟選擇器示範</title>
  <style>
    /* 標題後的第一個段落特殊樣式 */
    h1 + p { color: #e74c3c; }
    h2 + p { color: #3498db; }
    h3 + p { color: #2c3e50; }
    
    /* 圖片後的說明文字 */
    img + p { color: #7f8c8d; }
    
    /* 引用文字後的段落 */
    blockquote + p { color: #9b59b6; }
    
    /* 表單標籤後的輸入框 */
    label + input { color: #34495e; }
    
    /* 特殊 class 後的元素 */
    .intro + .content { color: #27ae60; }
    .warning + .action { color: #e74c3c; }
  </style>
</head>
<body>
  <h1>主標題</h1>
  <p>這是緊接在 h1 後面的段落 - 紅色</p>
  <p>這是第二個段落 - 正常顏色</p>
  
  <h2>次標題</h2>
  <p>這是緊接在 h2 後面的段落 - 藍色</p>
  <p>這是第二個段落 - 正常顏色</p>
  
  <img src="image.jpg" alt="圖片">
  <p>這是圖片的說明文字 - 灰色</p>
  
  <blockquote>
    這是一段引用文字
  </blockquote>
  <p>這是引用後的段落 - 紫色</p>
  
  <div class="intro">介紹區塊</div>
  <div class="content">緊接的內容區塊 - 綠色</div>
  
  <div class="warning">警告訊息</div>
  <div class="action">緊接的操作按鈕 - 紅色</div>
</body>
</html>
```

### 4. 通用兄弟選擇器（General Sibling Selector）

通用兄弟選擇器使用 `~` 符號，選擇在指定元素後面的所有兄弟元素。

```css
/* 基本通用兄弟選擇器 */
h1 ~ p { color: #e74c3c; }          /* h1 後面的所有 p 兄弟元素 */
h2 ~ p { color: #3498db; }          /* h2 後面的所有 p 兄弟元素 */
.intro ~ p { color: #2c3e50; }      /* class="intro" 後面的所有 p 兄弟元素 */

/* 複雜的通用兄弟選擇器 */
.section-title ~ .content { color: #34495e; } /* class="section-title" 後面的所有 class="content" 兄弟元素 */
#main-heading ~ article { color: #9b59b6; }   /* id="main-heading" 後面的所有 article 兄弟元素 */
```

**通用兄弟選擇器的實際應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>通用兄弟選擇器示範</title>
  <style>
    /* 標題後的所有段落 */
    h1 ~ p { color: #e74c3c; }
    h2 ~ p { color: #3498db; }
    
    /* 特殊 class 後的所有段落 */
    .intro ~ p { color: #2c3e50; }
    
    /* 章節標題後的所有內容 */
    .section-title ~ .content { color: #34495e; }
    .section-title ~ .sidebar { color: #7f8c8d; }
    
    /* 警告訊息後的所有相關元素 */
    .warning ~ .related { color: #e67e22; }
  </style>
</head>
<body>
  <h1>主標題</h1>
  <p>第一個段落 - 紅色</p>
  <p>第二個段落 - 紅色</p>
  <div>中間的 div</div>
  <p>第三個段落 - 紅色</p>
  
  <h2>次標題</h2>
  <p>h2 後的第一個段落 - 藍色</p>
  <p>h2 後的第二個段落 - 藍色</p>
  
  <div class="intro">介紹區塊</div>
  <p>intro 後的第一個段落 - 深藍色</p>
  <p>intro 後的第二個段落 - 深藍色</p>
  
  <div class="section-title">章節標題</div>
  <div class="content">內容區塊 - 深灰色</div>
  <div class="sidebar">側邊欄 - 灰色</div>
  <div class="content">另一個內容區塊 - 深灰色</div>
</body>
</html>
```

## 屬性選擇器

屬性選擇器允許你根據元素的屬性來選擇元素，這是非常強大的功能，特別適合處理表單元素和具有特殊屬性的元素。

### 1. 基本屬性選擇器

```css
/* 選擇具有指定屬性的元素 */
[title] { color: #3498db; }         /* 所有具有 title 屬性的元素 */
[href] { color: #e74c3c; }          /* 所有具有 href 屬性的元素 */
[alt] { color: #2c3e50; }           /* 所有具有 alt 屬性的元素 */
[data-role] { color: #9b59b6; }     /* 所有具有 data-role 屬性的元素 */

/* 選擇具有特定屬性值的元素 */
[type="text"] { color: #34495e; }   /* type 屬性值為 "text" 的元素 */
[type="email"] { color: #3498db; }  /* type 屬性值為 "email" 的元素 */
[type="password"] { color: #e74c3c; } /* type 屬性值為 "password" 的元素 */
[class="highlight"] { color: #f39c12; } /* class 屬性值為 "highlight" 的元素 */
```

### 2. 進階屬性選擇器

```css
/* 屬性值開頭匹配 */
[href^="http://"] { color: #e74c3c; }     /* href 以 "http://" 開頭 */
[href^="https://"] { color: #27ae60; }    /* href 以 "https://" 開頭 */
[href^="mailto:"] { color: #3498db; }     /* href 以 "mailto:" 開頭 */
[href^="tel:"] { color: #9b59b6; }        /* href 以 "tel:" 開頭 */

/* 屬性值結尾匹配 */
[href$=".pdf"] { color: #e74c3c; }        /* href 以 ".pdf" 結尾 */
[href$=".doc"] { color: #3498db; }        /* href 以 ".doc" 結尾 */
[href$=".jpg"] { color: #27ae60; }        /* href 以 ".jpg" 結尾 */
[src$=".png"] { color: #f39c12; }         /* src 以 ".png" 結尾 */

/* 屬性值包含匹配 */
[href*="google"] { color: #4285f4; }      /* href 包含 "google" */
[href*="facebook"] { color: #1877f2; }    /* href 包含 "facebook" */
[href*="twitter"] { color: #1da1f2; }     /* href 包含 "twitter" */
[class*="btn"] { color: #6c757d; }        /* class 包含 "btn" */

/* 屬性值單詞匹配 */
[class~="primary"] { color: #007bff; }    /* class 包含 "primary" 單詞 */
[class~="secondary"] { color: #6c757d; }  /* class 包含 "secondary" 單詞 */
[data-tags~="featured"] { color: #28a745; } /* data-tags 包含 "featured" 單詞 */
```

**屬性選擇器的實際應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>屬性選擇器示範</title>
  <style>
    /* 表單元素的屬性選擇器 */
    input[type="text"] { color: #2c3e50; }
    input[type="email"] { color: #3498db; }
    input[type="password"] { color: #e74c3c; }
    input[type="tel"] { color: #9b59b6; }
    input[required] { color: #e67e22; }
    input[disabled] { color: #95a5a6; }
    
    /* 連結的屬性選擇器 */
    a[href^="http://"] { color: #e74c3c; }
    a[href^="https://"] { color: #27ae60; }
    a[href^="mailto:"] { color: #3498db; }
    a[href^="tel:"] { color: #9b59b6; }
    a[href$=".pdf"] { color: #e74c3c; }
    a[href$=".doc"] { color: #3498db; }
    
    /* 特殊屬性的選擇器 */
    [title] { color: #f39c12; }
    [data-role="button"] { color: #6c757d; }
    [data-status="active"] { color: #28a745; }
    [data-status="inactive"] { color: #dc3545; }
    
    /* 語言屬性選擇器 */
    [lang="en"] { color: #3498db; }
    [lang="zh-TW"] { color: #e74c3c; }
    [lang="ja"] { color: #9b59b6; }
  </style>
</head>
<body>
  <h1>屬性選擇器示範</h1>
  
  <form>
    <label>文字輸入：</label>
    <input type="text" placeholder="請輸入文字">
    
    <label>電子郵件：</label>
    <input type="email" placeholder="請輸入信箱">
    
    <label>密碼：</label>
    <input type="password" placeholder="請輸入密碼">
    
    <label>必填欄位：</label>
    <input type="text" required placeholder="必填">
    
    <label>停用欄位：</label>
    <input type="text" disabled placeholder="已停用">
  </form>
  
  <h2>連結示範</h2>
  <a href="http://example.com">HTTP 連結</a>
  <a href="https://example.com">HTTPS 連結</a>
  <a href="mailto:test@example.com">電子郵件連結</a>
  <a href="tel:+886-2-1234-5678">電話連結</a>
  <a href="document.pdf">PDF 檔案</a>
  <a href="document.doc">Word 檔案</a>
  
  <h2>特殊屬性示範</h2>
  <p title="這是提示文字">有 title 屬性的段落</p>
  <button data-role="button">按鈕元素</button>
  <div data-status="active">啟用狀態</div>
  <div data-status="inactive">停用狀態</div>
  
  <h2>語言屬性示範</h2>
  <p lang="en">English text</p>
  <p lang="zh-TW">繁體中文文字</p>
  <p lang="ja">日本語のテキスト</p>
</body>
</html>
```

透過這些屬性選擇器，你可以非常精確地選擇符合特定條件的元素，這在處理表單、連結和具有特殊屬性的元素時特別有用。

## 偽類別選擇器（Pseudo-class Selectors）

偽類別選擇器用來選擇元素的特殊狀態或位置，它們以單個冒號 `:` 開頭。偽類別讓你能夠根據元素的狀態、位置或用戶互動來套用不同的樣式。

### 1. 連結偽類別

連結偽類別是最常用的偽類別，用來控制不同狀態下連結的外觀：

```css
/* 連結的四種狀態 */
a:link { color: #3498db; }       /* 未被訪問的連結 */
a:visited { color: #9b59b6; }    /* 已被訪問的連結 */
a:hover { color: #e74c3c; }      /* 滑鼠懸停時的連結 */
a:active { color: #e67e22; }     /* 被點擊瞬間的連結 */

/* 組合使用，創造更豐富的效果 */
a:link:hover { color: #2980b9; }     /* 未訪問連結的懸停狀態 */
a:visited:hover { color: #8e44ad; }  /* 已訪問連結的懸停狀態 */

/* 特定 class 的連結狀態 */
.btn:link { color: #fff; }
.btn:hover { color: #f8f9fa; }
.btn:active { color: #e9ecef; }

/* 特定區域的連結狀態 */
nav a:link { color: #2c3e50; }
nav a:hover { color: #3498db; }
nav a:active { color: #e74c3c; }

footer a:link { color: #7f8c8d; }
footer a:hover { color: #2c3e50; }
```

{% note danger %}
**連結偽類別的順序很重要！**
連結偽類別必須按照 `:link`、`:visited`、`:hover`、`:active` 的順序撰寫，否則某些狀態可能會被其他狀態覆蓋。記住口訣：**L**o**V**e **H**A**te**（愛恨）。
{% endnote %}

### 2. 結構偽類別

結構偽類別用來選擇元素在文件結構中的特定位置：

```css
/* 第一個和最後一個子元素 */
p:first-child { color: #e74c3c; }    /* 第一個子元素 */
p:last-child { color: #3498db; }     /* 最後一個子元素 */

/* 第一個和最後一個同類型元素 */
p:first-of-type { color: #27ae60; }  /* 第一個 p 元素 */
p:last-of-type { color: #f39c12; }   /* 最後一個 p 元素 */

/* 第 n 個子元素 */
li:nth-child(1) { color: #e74c3c; }  /* 第 1 個子元素 */
li:nth-child(2) { color: #3498db; }  /* 第 2 個子元素 */
li:nth-child(3) { color: #27ae60; }  /* 第 3 個子元素 */

/* 奇數和偶數元素 */
tr:nth-child(odd) { color: #2c3e50; }   /* 奇數行 */
tr:nth-child(even) { color: #34495e; }  /* 偶數行 */

/* 數學表達式 */
li:nth-child(3n+1) { color: #e74c3c; }  /* 第 1, 4, 7, 10... 個元素 */
li:nth-child(3n+2) { color: #3498db; }  /* 第 2, 5, 8, 11... 個元素 */
li:nth-child(3n) { color: #27ae60; }    /* 第 3, 6, 9, 12... 個元素 */

/* 從後面開始計算 */
li:nth-last-child(1) { color: #e67e22; }  /* 倒數第 1 個 */
li:nth-last-child(2) { color: #9b59b6; }  /* 倒數第 2 個 */

/* 同類型元素的位置 */
p:nth-of-type(1) { color: #e74c3c; }    /* 第 1 個 p 元素 */
p:nth-of-type(2) { color: #3498db; }    /* 第 2 個 p 元素 */
p:nth-of-type(odd) { color: #27ae60; }  /* 奇數位置的 p 元素 */
p:nth-of-type(even) { color: #f39c12; } /* 偶數位置的 p 元素 */
```

**結構偽類別的實際應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>結構偽類別示範</title>
  <style>
    /* 清單項目的顏色循環 */
    li:nth-child(4n+1) { color: #e74c3c; }  /* 紅色 */
    li:nth-child(4n+2) { color: #3498db; }  /* 藍色 */
    li:nth-child(4n+3) { color: #27ae60; }  /* 綠色 */
    li:nth-child(4n) { color: #f39c12; }    /* 橘色 */
    
    /* 表格行的交替顏色 */
    tr:nth-child(odd) { color: #2c3e50; }
    tr:nth-child(even) { color: #34495e; }
    
    /* 段落的特殊樣式 */
    p:first-child { color: #e74c3c; }
    p:last-child { color: #3498db; }
    p:nth-child(2) { color: #27ae60; }
    
    /* 文章內容的樣式 */
    article p:first-of-type { color: #8e44ad; }
    article p:last-of-type { color: #e67e22; }
    
    /* 導航選單的樣式 */
    nav ul li:first-child { color: #2c3e50; }
    nav ul li:last-child { color: #9b59b6; }
  </style>
</head>
<body>
  <h1>結構偽類別示範</h1>
  
  <h2>彩色清單</h2>
  <ul>
    <li>項目 1 - 紅色</li>
    <li>項目 2 - 藍色</li>
    <li>項目 3 - 綠色</li>
    <li>項目 4 - 橘色</li>
    <li>項目 5 - 紅色</li>
    <li>項目 6 - 藍色</li>
    <li>項目 7 - 綠色</li>
    <li>項目 8 - 橘色</li>
  </ul>
  
  <h2>段落示範</h2>
  <p>第一個段落 - 紅色</p>
  <p>第二個段落 - 綠色</p>
  <p>第三個段落 - 正常色</p>
  <p>最後一個段落 - 藍色</p>
  
  <h2>表格示範</h2>
  <table>
    <tr><td>第一行</td></tr>
    <tr><td>第二行</td></tr>
    <tr><td>第三行</td></tr>
    <tr><td>第四行</td></tr>
  </table>
  
  <article>
    <h2>文章標題</h2>
    <p>文章的第一個段落 - 紫色</p>
    <p>文章的中間段落 - 正常色</p>
    <p>文章的最後段落 - 橘色</p>
  </article>
</body>
</html>
```

### 3. 表單偽類別

表單偽類別用來選擇表單元素的不同狀態：

```css
/* 表單元素的狀態 */
input:focus { color: #3498db; }      /* 獲得焦點時 */
input:hover { color: #2c3e50; }      /* 滑鼠懸停時 */
input:active { color: #e74c3c; }     /* 被點擊時 */

/* 表單驗證狀態 */
input:valid { color: #27ae60; }      /* 輸入有效時 */
input:invalid { color: #e74c3c; }    /* 輸入無效時 */
input:required { color: #e67e22; }   /* 必填欄位 */
input:optional { color: #7f8c8d; }   /* 選填欄位 */

/* 表單元素的狀態 */
input:enabled { color: #2c3e50; }    /* 可用狀態 */
input:disabled { color: #95a5a6; }   /* 停用狀態 */
input:checked { color: #27ae60; }    /* 選中狀態（checkbox, radio） */

/* 進階表單偽類別 */
input:in-range { color: #27ae60; }     /* 數值在範圍內 */
input:out-of-range { color: #e74c3c; } /* 數值超出範圍 */
input:read-only { color: #7f8c8d; }    /* 只讀狀態 */
input:read-write { color: #2c3e50; }   /* 可讀寫狀態 */
input:placeholder-shown { color: #95a5a6; } /* 顯示佔位符時 */
input:blank { color: #bdc3c7; }        /* 空白狀態 */
input:user-invalid { color: #e74c3c; } /* 用戶互動後無效 */

/* 組合使用 */
input:focus:valid { color: #27ae60; }    /* 焦點且有效 */
input:focus:invalid { color: #e74c3c; }  /* 焦點且無效 */
input:hover:enabled { color: #2c3e50; }  /* 懸停且可用 */
input:required:invalid { color: #c0392b; } /* 必填且無效 */
input:optional:valid { color: #229954; }   /* 選填且有效 */
```

**進階表單偽類別應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>進階表單偽類別示範</title>
  <style>
    /* 基本表單樣式 */
    input, textarea, select { 
      color: #2c3e50; 
      padding: 8px;
      margin: 5px;
      border: 1px solid #ddd;
    }
    
    /* 焦點狀態 */
    input:focus, textarea:focus, select:focus { 
      color: #3498db;
      border-color: #3498db;
      outline: none;
    }
    
    /* 驗證狀態 */
    input:valid { 
      color: #27ae60;
      border-color: #27ae60;
    }
    
    input:invalid { 
      color: #e74c3c;
      border-color: #e74c3c;
    }
    
    /* 必填欄位 */
    input:required { 
      border-left: 4px solid #e67e22;
    }
    
    /* 選填欄位 */
    input:optional { 
      border-left: 4px solid #95a5a6;
    }
    
    /* 數值範圍 */
    input[type="number"]:in-range { 
      color: #27ae60;
    }
    
    input[type="number"]:out-of-range { 
      color: #e74c3c;
      background-color: #fadbd8;
    }
    
    /* 只讀狀態 */
    input:read-only { 
      color: #7f8c8d;
      background-color: #f8f9fa;
    }
    
    /* 佔位符顯示狀態 */
    input:placeholder-shown { 
      color: #95a5a6;
      font-style: italic;
    }
    
    /* 選中狀態 */
    input[type="checkbox"]:checked + label { 
      color: #27ae60;
      font-weight: bold;
    }
    
    input[type="radio"]:checked + label { 
      color: #3498db;
      font-weight: bold;
    }
    
    /* 停用狀態 */
    input:disabled { 
      color: #95a5a6;
      background-color: #ecf0f1;
    }
    
    /* 用戶互動後的驗證 */
    input:user-invalid { 
      color: #e74c3c;
      border-color: #e74c3c;
      background-color: #fadbd8;
    }
    
    /* 組合狀態 */
    input:focus:valid { 
      color: #27ae60;
      border-color: #27ae60;
      box-shadow: 0 0 5px rgba(39, 174, 96, 0.3);
    }
    
    input:focus:invalid { 
      color: #e74c3c;
      border-color: #e74c3c;
      box-shadow: 0 0 5px rgba(231, 76, 60, 0.3);
    }
  </style>
</head>
<body>
  <h1>進階表單偽類別示範</h1>
  
  <form>
    <div>
      <label>必填文字欄位：</label>
      <input type="text" required placeholder="請輸入內容">
    </div>
    
    <div>
      <label>選填信箱欄位：</label>
      <input type="email" placeholder="請輸入信箱">
    </div>
    
    <div>
      <label>數值範圍（1-100）：</label>
      <input type="number" min="1" max="100" placeholder="請輸入數值">
    </div>
    
    <div>
      <label>只讀欄位：</label>
      <input type="text" readonly value="這是只讀內容">
    </div>
    
    <div>
      <label>停用欄位：</label>
      <input type="text" disabled value="這是停用內容">
    </div>
    
    <div>
      <input type="checkbox" id="agree">
      <label for="agree">我同意條款</label>
    </div>
    
    <div>
      <input type="radio" id="option1" name="choice" value="1">
      <label for="option1">選項一</label>
      
      <input type="radio" id="option2" name="choice" value="2">
      <label for="option2">選項二</label>
    </div>
    
    <div>
      <label>密碼：</label>
      <input type="password" required minlength="6" placeholder="至少 6 位數">
    </div>
    
    <div>
      <label>文字區域：</label>
      <textarea required placeholder="請輸入內容"></textarea>
    </div>
  </form>
</body>
</html>
```

### 4. 進階結構偽類別

現代 CSS 提供了更強大的結構偽類別：

```css
/* :is() 偽類別 - 選擇器清單 */
:is(h1, h2, h3, h4, h5, h6) { color: #2c3e50; }
:is(.primary, .secondary) { color: #3498db; }
:is(#main, #sidebar) p { color: #34495e; }

/* :where() 偽類別 - 零特異性選擇器 */
:where(h1, h2, h3) { color: #7f8c8d; }
:where(.btn, .button) { color: #fff; }
:where(#nav, #menu) a { color: #3498db; }

/* :has() 偽類別 - 父元素選擇器 */
div:has(p) { color: #e74c3c; }           /* 包含 p 的 div */
article:has(h2) { color: #3498db; }       /* 包含 h2 的 article */
form:has(input:invalid) { color: #e74c3c; } /* 包含無效輸入的表單 */
.card:has(.badge) { color: #f39c12; }    /* 包含 .badge 的 .card */

/* :has() 的進階用法 */
li:has(a[href^="https"]) { color: #27ae60; }    /* 包含 HTTPS 連結的 li */
.container:has(.error) { color: #e74c3c; }      /* 包含錯誤的容器 */
section:has(h2 + p) { color: #9b59b6; }         /* 包含 h2 後接 p 的 section */
.form:has(input:required:invalid) { color: #c0392b; } /* 包含必填無效輸入的表單 */

/* :focus-within 偽類別 */
form:focus-within { color: #3498db; }     /* 內部有焦點元素的表單 */
.card:focus-within { color: #2c3e50; }    /* 內部有焦點元素的卡片 */
nav:focus-within { color: #e74c3c; }      /* 內部有焦點元素的導航 */

/* :focus-visible 偽類別 */
button:focus-visible { color: #3498db; }  /* 鍵盤焦點可見時 */
input:focus-visible { color: #2c3e50; }   /* 鍵盤焦點可見時 */
a:focus-visible { color: #e74c3c; }       /* 鍵盤焦點可見時 */

/* :target 偽類別 */
:target { color: #e74c3c; }               /* 被錨點連結指向的元素 */
section:target { color: #3498db; }        /* 被指向的 section */
#section1:target { color: #27ae60; }      /* 被指向的特定 section */
```

**進階結構偽類別應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>進階結構偽類別示範</title>
  <style>
    /* :is() 偽類別應用 */
    :is(h1, h2, h3, h4, h5, h6) { 
      color: #2c3e50;
      margin: 10px 0;
    }
    
    :is(.primary, .secondary, .tertiary) { 
      color: #3498db;
      font-weight: bold;
    }
    
    /* :where() 偽類別應用 */
    :where(.btn, .button, .link) { 
      color: #fff;
      padding: 8px 16px;
      text-decoration: none;
      display: inline-block;
    }
    
    /* :has() 偽類別應用 */
    .card:has(.badge) { 
      color: #f39c12;
      border: 2px solid #f39c12;
    }
    
    .card:has(.error) { 
      color: #e74c3c;
      border-color: #e74c3c;
    }
    
    .card:has(.success) { 
      color: #27ae60;
      border-color: #27ae60;
    }
    
    article:has(h2) { 
      color: #3498db;
      border-left: 4px solid #3498db;
      padding-left: 16px;
    }
    
    li:has(a[href^="https"]) { 
      color: #27ae60;
    }
    
    li:has(a[href^="mailto"]) { 
      color: #e74c3c;
    }
    
    /* :focus-within 偽類別應用 */
    form:focus-within { 
      color: #3498db;
      background-color: #f8f9fa;
      border-radius: 4px;
      padding: 8px;
    }
    
    .card:focus-within { 
      color: #2c3e50;
      box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
    }
    
    /* :focus-visible 偽類別應用 */
    button:focus-visible { 
      color: #fff;
      background-color: #3498db;
      outline: 2px solid #2980b9;
    }
    
    input:focus-visible { 
      color: #2c3e50;
      border-color: #3498db;
      outline: none;
      box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    }
    
    /* :target 偽類別應用 */
    section:target { 
      color: #e74c3c;
      background-color: #fadbd8;
      padding: 16px;
      border-radius: 4px;
    }
    
    /* 複雜的組合應用 */
    .container:has(.form:focus-within) { 
      color: #3498db;
      background-color: #ebf3fd;
    }
    
    .notification:has(.error):target { 
      color: #e74c3c;
      background-color: #fadbd8;
      animation: shake 0.5s;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  </style>
</head>
<body>
  <h1>進階結構偽類別示範</h1>
  
  <nav>
    <a href="#section1">前往第一區塊</a>
    <a href="#section2">前往第二區塊</a>
    <a href="#section3">前往第三區塊</a>
  </nav>
  
  <section id="section1">
    <h2>第一區塊</h2>
    <p>這是第一個區塊的內容。</p>
    
    <div class="card">
      <div class="badge">重要</div>
      <p>這個卡片包含 badge。</p>
    </div>
    
    <div class="card">
      <div class="error">錯誤訊息</div>
      <p>這個卡片包含錯誤。</p>
    </div>
  </section>
  
  <section id="section2">
    <h2>第二區塊</h2>
    <p>這是第二個區塊的內容。</p>
    
    <article>
      <h2>文章標題</h2>
      <p>這是文章內容。</p>
    </article>
    
    <ul>
      <li><a href="https://example.com">HTTPS 連結</a></li>
      <li><a href="mailto:test@example.com">電子郵件連結</a></li>
      <li><a href="http://example.com">HTTP 連結</a></li>
    </ul>
  </section>
  
  <section id="section3">
    <h2>第三區塊</h2>
    <p>這是第三個區塊的內容。</p>
    
    <div class="container">
      <form class="form">
        <input type="text" placeholder="請輸入文字">
        <button type="submit">送出</button>
      </form>
    </div>
    
    <div class="card">
      <button>可聚焦的按鈕</button>
      <input type="text" placeholder="可聚焦的輸入框">
    </div>
  </section>
  
  <div class="notification" id="notification">
    <div class="error">通知錯誤</div>
    <p>這是一個通知區塊。</p>
  </div>
</body>
</html>
```

### 5. 否定偽類別

否定偽類別 `:not()` 用來選擇不符合指定條件的元素：

```css
/* 基本否定選擇器 */
p:not(.special) { color: #2c3e50; }     /* 不是 .special 的 p 元素 */
div:not(#main) { color: #34495e; }      /* 不是 #main 的 div 元素 */
li:not(:first-child) { color: #7f8c8d; } /* 不是第一個子元素的 li */

/* 複雜的否定選擇器 */
input:not([type="submit"]) { color: #3498db; }  /* 不是 submit 類型的 input */
a:not([href^="http"]) { color: #e74c3c; }       /* 不是以 http 開頭的連結 */
p:not(.intro):not(.summary) { color: #2c3e50; } /* 不是 .intro 也不是 .summary 的 p */

/* 實用的否定選擇器 */
li:not(:last-child) { color: #34495e; }    /* 除了最後一個的所有 li */
p:not(:empty) { color: #2c3e50; }          /* 不是空的 p 元素 */
input:not(:disabled) { color: #2c3e50; }   /* 不是停用的 input */

/* 進階否定應用 */
button:not(.primary):not(.secondary) { color: #6c757d; }  /* 不是主要或次要按鈕 */
.card:not(.featured):not(.promoted) { color: #2c3e50; }   /* 不是特色或推薦卡片 */
input:not(:focus):not(:hover) { color: #495057; }        /* 不是焦點也不是懸停的輸入框 */
```

## 偽元素選擇器（Pseudo-element Selectors）

偽元素選擇器用來選擇元素的特定部分，它們以雙冒號 `::` 開頭。偽元素可以讓你為元素的特定部分（如第一個字母、第一行）或者在元素前後插入內容。

### 1. ::before 和 ::after 偽元素

這是最常用的偽元素，可以在元素的前面或後面插入內容：

```css
/* 基本的 before 和 after */
p::before { 
  content: "→ ";
  color: #e74c3c;
}

p::after { 
  content: " ←";
  color: #3498db;
}

/* 使用 content 屬性顯示元素屬性 */
a::after { 
  content: " (" attr(href) ")";
  color: #7f8c8d;
}

/* 為不同類型的連結添加圖標 */
a[href^="http://"]::before { 
  content: "🔗 ";
  color: #e74c3c;
}

a[href^="https://"]::before { 
  content: "🔒 ";
  color: #27ae60;
}

a[href^="mailto:"]::before { 
  content: "📧 ";
  color: #3498db;
}

a[href^="tel:"]::before { 
  content: "📞 ";
  color: #9b59b6;
}

/* 為不同狀態添加提示 */
.success::before { 
  content: "✓ ";
  color: #27ae60;
}

.warning::before { 
  content: "⚠ ";
  color: #f39c12;
}

.error::before { 
  content: "✗ ";
  color: #e74c3c;
}

.info::before { 
  content: "ℹ ";
  color: #3498db;
}

/* 計數器的使用 */
ol.custom-counter { counter-reset: item; }
ol.custom-counter li::before { 
  content: counter(item) ". ";
  counter-increment: item;
  color: #e74c3c;
}

/* CSS 計數器與進階應用 */

/* 多層次計數器 */
.chapter-list { 
  counter-reset: chapter; 
}

.chapter-list .chapter::before { 
  content: "第 " counter(chapter) " 章：";
  counter-increment: chapter;
  color: #2c3e50;
  font-weight: bold;
}

.chapter-list .section { 
  counter-reset: section; 
}

.chapter-list .section::before { 
  content: counter(chapter) "." counter(section) " ";
  counter-increment: section;
  color: #3498db;
  font-weight: bold;
}

/* 不同計數器樣式 */
.roman-list { 
  counter-reset: roman-item; 
}

.roman-list li::before { 
  content: counter(roman-item, upper-roman) ". ";
  counter-increment: roman-item;
  color: #9b59b6;
}

.alpha-list { 
  counter-reset: alpha-item; 
}

.alpha-list li::before { 
  content: counter(alpha-item, lower-alpha) ") ";
  counter-increment: alpha-item;
  color: #e67e22;
}

/* 複雜的計數器應用 */
.document { 
  counter-reset: heading1 heading2 heading3; 
}

.document h1::before { 
  content: counter(heading1) ". ";
  counter-increment: heading1;
  counter-reset: heading2 heading3;
  color: #2c3e50;
}

.document h2::before { 
  content: counter(heading1) "." counter(heading2) ". ";
  counter-increment: heading2;
  counter-reset: heading3;
  color: #3498db;
}

.document h3::before { 
  content: counter(heading1) "." counter(heading2) "." counter(heading3) ". ";
  counter-increment: heading3;
  color: #e74c3c;
}

/* 工具提示效果 */
.tooltip::after { 
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2c3e50;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.8em;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  z-index: 1000;
}

.tooltip::before { 
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #2c3e50;
  margin-bottom: -6px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.tooltip:hover::after,
.tooltip:hover::before { 
  opacity: 1;
  visibility: visible;
}

/* 進度條效果 */
.progress-bar::before { 
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--progress, 0%);
  background-color: #27ae60;
  transition: width 0.3s ease;
  z-index: -1;
}

.progress-bar::after { 
  content: attr(data-progress) "%";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 0.9em;
  z-index: 1;
}
```

### 2. ::first-letter 和 ::first-line 偽元素

用來選擇元素的第一個字母和第一行：

```css
/* 第一個字母的特殊樣式 */
p::first-letter { 
  color: #e74c3c;
  font-size: 2em;
  font-weight: bold;
}

/* 文章首段的第一個字母 */
article p:first-child::first-letter { 
  color: #8e44ad;
  font-size: 3em;
}

/* 第一行的特殊樣式 */
p::first-line { 
  color: #2c3e50;
  font-weight: bold;
}

/* 不同類型內容的第一行 */
.intro::first-line { 
  color: #3498db;
}

.quote::first-line { 
  color: #9b59b6;
}

/* 組合使用 */
blockquote::first-line { 
  color: #e67e22;
}

blockquote::first-letter { 
  color: #e74c3c;
  font-size: 1.5em;
}
```

### 3. ::selection 偽元素

用來控制用戶選擇文字時的樣式：

```css
/* 全局選擇樣式 */
::selection { 
  color: #fff;
  background-color: #3498db;
}

/* 特定元素的選擇樣式 */
p::selection { 
  color: #fff;
  background-color: #e74c3c;
}

h1::selection { 
  color: #fff;
  background-color: #2c3e50;
}

/* 不同區域的選擇樣式 */
.content::selection { 
  color: #fff;
  background-color: #27ae60;
}

.sidebar::selection { 
  color: #fff;
  background-color: #f39c12;
}
```

**偽元素的實際應用：**
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>偽元素示範</title>
  <style>
    /* 段落的裝飾 */
    p::before { 
      content: "❯ ";
      color: #e74c3c;
    }
    
    /* 連結的圖標 */
    a[href^="http://"]::before { 
      content: "🔗 ";
      color: #e74c3c;
    }
    
    a[href^="https://"]::before { 
      content: "🔒 ";
      color: #27ae60;
    }
    
    a[href^="mailto:"]::before { 
      content: "📧 ";
      color: #3498db;
    }
    
    /* 狀態訊息 */
    .success::before { 
      content: "✓ ";
      color: #27ae60;
    }
    
    .warning::before { 
      content: "⚠ ";
      color: #f39c12;
    }
    
    .error::before { 
      content: "✗ ";
      color: #e74c3c;
    }
    
    /* 第一個字母特殊樣式 */
    .drop-cap::first-letter { 
      color: #8e44ad;
      font-size: 3em;
      font-weight: bold;
      float: left;
      margin-right: 5px;
    }
    
    /* 第一行特殊樣式 */
    .intro::first-line { 
      color: #2c3e50;
      font-weight: bold;
    }
    
    /* 選擇文字的樣式 */
    .special::selection { 
      color: #fff;
      background-color: #e74c3c;
    }
    
    /* 引用的樣式 */
    blockquote::before { 
      content: """;
      color: #95a5a6;
      font-size: 2em;
    }
    
    blockquote::after { 
      content: """;
      color: #95a5a6;
      font-size: 2em;
    }
    
    /* 自訂清單計數器 */
    ol.custom { counter-reset: item; }
    ol.custom li::before { 
      content: counter(item) ". ";
      counter-increment: item;
      color: #e74c3c;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>偽元素示範</h1>
  
  <h2>段落裝飾</h2>
  <p>這是一個帶有前綴圖標的段落。</p>
  <p>這是另一個帶有前綴圖標的段落。</p>
  
  <h2>連結圖標</h2>
  <a href="http://example.com">HTTP 連結</a><br>
  <a href="https://example.com">HTTPS 連結</a><br>
  <a href="mailto:test@example.com">電子郵件</a><br>
  
  <h2>狀態訊息</h2>
  <div class="success">操作成功！</div>
  <div class="warning">注意事項</div>
  <div class="error">發生錯誤！</div>
  
  <h2>特殊文字效果</h2>
  <p class="drop-cap">這是一個首字放大的段落。第一個字母會特別大且有特殊顏色。</p>
  
  <p class="intro">這是一個介紹段落，第一行會有特殊的樣式。這裡有更多的文字內容來展示第一行的效果。</p>
  
  <p class="special">選擇這段文字看看效果！這段文字有特殊的選擇樣式。</p>
  
  <h2>引用區塊</h2>
  <blockquote>
    這是一段引用文字，前後會有引號裝飾。
  </blockquote>
  
  <h2>自訂清單</h2>
  <ol class="custom">
    <li>第一個項目</li>
    <li>第二個項目</li>
    <li>第三個項目</li>
  </ol>
</body>
</html>
```

{% note warning %}
**偽元素使用注意事項**
- 偽元素建議使用雙冒號 `::` 來區分偽類別的單冒號 `:`
- `::before` 和 `::after` 必須設定 `content` 屬性才會顯示，即使是空值也要寫 `content: "";`
- 置換元素（如 `img`、`input`、`iframe`）不支援 `::before` 和 `::after`
- 偽元素在 DOM 中並不存在，只是視覺效果
{% endnote %}

# CSS 繼承與優先權深度解析

理解 CSS 的繼承機制和優先權規則是掌握 CSS 的關鍵。這些概念決定了當多個樣式規則同時作用於一個元素時，哪個規則會最終生效。

## CSS 繼承機制

CSS 繼承是指子元素自動獲得父元素某些樣式屬性的機制。這個機制讓我們可以在父元素設定樣式，然後讓所有子元素自動繼承這些樣式。

### 可繼承的屬性

以下是 `color` 屬性的繼承特性：

```css
/* color 屬性會被繼承 */
.parent { color: #e74c3c; }

/* 子元素會自動繼承父元素的 color */
.parent p { /* 不需要設定 color，會自動繼承 */ }
.parent span { /* 不需要設定 color，會自動繼承 */ }
.parent div { /* 不需要設定 color，會自動繼承 */ }
```

**繼承的實際範例：**
```html
<style>
  .article { color: #2c3e50; }
  .highlight { color: #e74c3c; }
  .muted { color: #7f8c8d; }
</style>

<article class="article">
  <h1>文章標題</h1>  <!-- 繼承 #2c3e50 -->
  <p>這是文章內容。</p>  <!-- 繼承 #2c3e50 -->
  <p class="highlight">這是重要內容。</p>  <!-- 使用 #e74c3c，不繼承 -->
  <div>
    <p>這是嵌套的段落。</p>  <!-- 繼承 #2c3e50 -->
    <span class="muted">這是註解文字。</span>  <!-- 使用 #7f8c8d，不繼承 -->
  </div>
</article>
```

### 控制繼承的關鍵字

CSS 提供了幾個特殊的關鍵字來控制繼承行為：

```css
/* inherit：明確繼承父元素的值 */
.child { color: inherit; }

/* initial：使用屬性的初始值 */
.reset { color: initial; }

/* unset：如果可繼承則繼承，否則使用初始值 */
.auto { color: unset; }

/* revert：恢復到瀏覽器預設樣式 */
.default { color: revert; }
```

#### 1. inherit - 明確繼承

`inherit` 關鍵字強制元素繼承父元素的屬性值，即使該屬性通常不會被繼承：

```css
/* 基本繼承範例 */
.parent { 
  color: #e74c3c; 
  border: 2px solid #3498db;
}

.child { 
  color: inherit;        /* 繼承父元素的 color */
  border: inherit;       /* 繼承父元素的 border（通常不會繼承） */
}

/* 實際應用場景 */
.button-group { 
  color: #2c3e50; 
}

.button-group .btn { 
  color: inherit;        /* 按鈕繼承按鈕群組的顏色 */
}

.button-group .btn:hover { 
  color: #3498db;        /* 懸停時改變顏色 */
}

/* 複雜的繼承情況 */
.theme-dark { 
  color: #ecf0f1; 
}

.theme-dark .content { 
  color: inherit;        /* 內容繼承主題色 */
}

.theme-dark .content .highlight { 
  color: #e74c3c;        /* 高亮文字使用特定顏色 */
}

.theme-dark .content .highlight.subtle { 
  color: inherit;        /* 微妙的高亮繼承內容色 */
}
```

#### 2. initial - 屬性初始值

`initial` 關鍵字將屬性設定為其初始值（瀏覽器預設值）：

```css
/* color 屬性的初始值示範 */
.parent { 
  color: #e74c3c; 
}

.child { 
  color: initial;        /* 使用 color 的初始值（通常是黑色） */
}

/* 實際應用場景 */
.custom-theme { 
  color: #8e44ad; 
}

.custom-theme .reset-text { 
  color: initial;        /* 重置為瀏覽器預設色 */
}

/* 重置所有繼承的樣式 */
.reset-all { 
  color: initial;
  font-size: initial;
  font-weight: initial;
  line-height: initial;
}

/* 與其他值的比較 */
.comparison-demo { 
  color: #e74c3c; 
}

.comparison-demo .inherit-example { 
  color: inherit;        /* 紅色（#e74c3c） */
}

.comparison-demo .initial-example { 
  color: initial;        /* 黑色（瀏覽器預設） */
}
```

#### 3. unset - 智慧重置

`unset` 關鍵字是 `inherit` 和 `initial` 的智慧結合：
- 如果屬性自然繼承，則表現為 `inherit`
- 如果屬性不自然繼承，則表現為 `initial`

```css
/* unset 的智慧行為 */
.parent { 
  color: #e74c3c;        /* 可繼承屬性 */
  border: 2px solid #3498db;  /* 不可繼承屬性 */
}

.child { 
  color: unset;          /* 等同於 inherit，繼承 #e74c3c */
  border: unset;         /* 等同於 initial，重置為預設值 */
}

/* 實際應用場景 */
.component { 
  color: #2c3e50;
  background-color: #ecf0f1;
  border: 1px solid #bdc3c7;
  padding: 16px;
}

.component .reset-element { 
  color: unset;          /* 繼承 #2c3e50 */
  background-color: unset;  /* 重置為透明 */
  border: unset;         /* 重置為無邊框 */
  padding: unset;        /* 重置為 0 */
}

/* 大量重置的應用 */
.reset-inherited { 
  all: unset;            /* 重置所有屬性 */
  color: #333;           /* 重新設定需要的屬性 */
}
```

#### 4. revert - 回歸瀏覽器預設

`revert` 關鍵字將屬性恢復到瀏覽器的預設樣式表值：

```css
/* revert 的應用 */
.custom-link { 
  color: #e74c3c;
  text-decoration: none;
}

.custom-link.revert-style { 
  color: revert;         /* 恢復到瀏覽器預設的藍色 */
  text-decoration: revert;  /* 恢復到瀏覽器預設的下劃線 */
}

/* 實際應用場景 */
.custom-button { 
  color: #fff;
  background-color: #3498db;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
}

.custom-button.native-style { 
  all: revert;           /* 恢復到瀏覽器預設按鈕樣式 */
}
```

#### 5. 繼承關鍵字的綜合比較

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>繼承關鍵字深度解析</title>
  <style>
    /* 基本設定 */
    .parent { 
      color: #e74c3c;
      font-size: 20px;
      font-weight: bold;
      border: 2px solid #3498db;
      background-color: #f8f9fa;
      padding: 20px;
    }
    
    /* 各種繼承關鍵字的效果 */
    .inherit-demo { 
      color: inherit;      /* 繼承父元素的紅色 */
      font-size: inherit;  /* 繼承父元素的 20px */
      border: inherit;     /* 繼承父元素的邊框（通常不繼承） */
    }
    
    .initial-demo { 
      color: initial;      /* 使用瀏覽器預設色（黑色） */
      font-size: initial;  /* 使用瀏覽器預設大小 */
      font-weight: initial; /* 使用瀏覽器預設粗細 */
    }
    
    .unset-demo { 
      color: unset;        /* 繼承父元素的紅色 */
      font-size: unset;    /* 繼承父元素的 20px */
      border: unset;       /* 重置為預設值（無邊框） */
      background-color: unset; /* 重置為透明 */
    }
    
    .revert-demo { 
      color: revert;       /* 恢復到瀏覽器預設 */
      font-size: revert;   /* 恢復到瀏覽器預設 */
      font-weight: revert; /* 恢復到瀏覽器預設 */
    }
    
    /* 實際應用場景 */
    .theme-container { 
      color: #2c3e50;
      font-size: 18px;
      line-height: 1.6;
    }
    
    .theme-container .text-inherit { 
      color: inherit;      /* 繼承主題色 */
    }
    
    .theme-container .text-reset { 
      color: initial;      /* 重置為瀏覽器預設 */
    }
    
    .theme-container .text-smart { 
      color: unset;        /* 智慧繼承 */
    }
    
    .theme-container .text-revert { 
      color: revert;       /* 恢復瀏覽器預設 */
    }
    
    /* 複雜的巢狀繼承 */
    .level-1 { 
      color: #e74c3c; 
    }
    
    .level-1 .level-2 { 
      color: #3498db; 
    }
    
    .level-1 .level-2 .level-3 { 
      color: inherit;      /* 繼承 level-2 的藍色 */
    }
    
    .level-1 .level-2 .level-3.reset { 
      color: initial;      /* 重置為瀏覽器預設 */
    }
    
    .level-1 .level-2 .level-3.smart { 
      color: unset;        /* 智慧繼承 level-2 的藍色 */
    }
    
    /* 動態繼承示範 */
    .dynamic-theme { 
      color: var(--theme-color, #333);
    }
    
    .dynamic-theme .inherit-theme { 
      color: inherit;      /* 繼承動態主題色 */
    }
    
    .dynamic-theme .reset-theme { 
      color: initial;      /* 重置，不受主題影響 */
    }
    
    .dynamic-theme.dark { 
      --theme-color: #ecf0f1;
    }
    
    .dynamic-theme.blue { 
      --theme-color: #3498db;
    }
  </style>
</head>
<body>
  <h1>繼承關鍵字深度解析</h1>
  
  <div class="parent">
    <h2>父元素（紅色、20px、粗體、藍色邊框）</h2>
    
    <div class="inherit-demo">
      <h3>inherit 示範</h3>
      <p>這段文字使用 inherit 關鍵字。</p>
    </div>
    
    <div class="initial-demo">
      <h3>initial 示範</h3>
      <p>這段文字使用 initial 關鍵字。</p>
    </div>
    
    <div class="unset-demo">
      <h3>unset 示範</h3>
      <p>這段文字使用 unset 關鍵字。</p>
    </div>
    
    <div class="revert-demo">
      <h3>revert 示範</h3>
      <p>這段文字使用 revert 關鍵字。</p>
    </div>
  </div>
  
  <div class="theme-container">
    <h2>主題容器（深藍色）</h2>
    
    <p class="text-inherit">這段文字使用 inherit。</p>
    <p class="text-reset">這段文字使用 initial。</p>
    <p class="text-smart">這段文字使用 unset。</p>
    <p class="text-revert">這段文字使用 revert。</p>
  </div>
  
  <div class="level-1">
    <h2>第一層（紅色）</h2>
    <div class="level-2">
      <h3>第二層（藍色）</h3>
      <div class="level-3">
        <p>第三層 - inherit</p>
      </div>
      <div class="level-3 reset">
        <p>第三層 - initial</p>
      </div>
      <div class="level-3 smart">
        <p>第三層 - unset</p>
      </div>
    </div>
  </div>
  
  <div class="dynamic-theme">
    <h2>動態主題（預設）</h2>
    <p class="inherit-theme">繼承主題色</p>
    <p class="reset-theme">重置為預設色</p>
  </div>
  
  <div class="dynamic-theme dark">
    <h2>動態主題（深色）</h2>
    <p class="inherit-theme">繼承主題色</p>
    <p class="reset-theme">重置為預設色</p>
  </div>
  
  <div class="dynamic-theme blue">
    <h2>動態主題（藍色）</h2>
    <p class="inherit-theme">繼承主題色</p>
    <p class="reset-theme">重置為預設色</p>
  </div>
</body>
</html>
```

**繼承控制的實際應用：**
```html
<style>
  .container { color: #3498db; }
  .special { color: #e74c3c; }
  .inherit-color { color: inherit; }
  .reset-color { color: initial; }
  .auto-color { color: unset; }
</style>

<div class="container">
  <p class="special">這是特殊顏色的段落</p>
  <p class="inherit-color">這個段落明確繼承容器的顏色</p>
  <p class="reset-color">這個段落使用初始顏色</p>
  <p class="auto-color">這個段落使用 unset 值</p>
</div>
```

{% note success %}
**繼承關鍵字的使用時機**

1. **inherit**：需要強制繼承通常不會繼承的屬性時
2. **initial**：需要重置為瀏覽器預設值時
3. **unset**：需要智慧重置，讓屬性回歸自然行為時
4. **revert**：需要恢復瀏覽器預設樣式表的值時

在實際開發中，`unset` 是最常用的，因為它能智慧地處理繼承和重置的邏輯。
{% endnote %}

{% note warning %}
**瀏覽器兼容性注意事項**
- `inherit`、`initial`、`unset` 在現代瀏覽器中都有良好支援
- `revert` 是較新的特性，在較舊的瀏覽器中可能不支援
- 使用前建議檢查目標瀏覽器的兼容性
{% endnote %}

## CSS 優先權計算

當多個 CSS 規則套用到同一個元素時，瀏覽器需要決定哪個規則的優先權較高。CSS 優先權的計算遵循特定的規則。

### 優先權的計算方式

CSS 優先權可以用四個數字來表示：(a, b, c, d)

- **a**：行內樣式（1000）
- **b**：ID 選擇器（100）
- **c**：Class 選擇器、屬性選擇器、偽類別（10）
- **d**：元素選擇器、偽元素（1）

```css
/* 優先權計算範例 */
p { color: black; }                    /* (0, 0, 0, 1) = 1 */
.text { color: blue; }                 /* (0, 0, 1, 0) = 10 */
#main p { color: red; }                /* (0, 1, 0, 1) = 101 */
div.content p { color: green; }        /* (0, 0, 1, 2) = 12 */
#main .content p { color: purple; }    /* (0, 1, 1, 1) = 111 */
```

### 複雜的優先權範例

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>CSS 優先權示範</title>
  <style>
    /* 各種選擇器的優先權比較 */
    
    /* 優先權：1 */
    p { color: #95a5a6; }
    
    /* 優先權：10 */
    .text { color: #3498db; }
    
    /* 優先權：11 */
    p.text { color: #e74c3c; }
    
    /* 優先權：100 */
    #content { color: #2c3e50; }
    
    /* 優先權：101 */
    #content p { color: #27ae60; }
    
    /* 優先權：110 */
    #content .text { color: #f39c12; }
    
    /* 優先權：111 */
    #content p.text { color: #9b59b6; }
    
    /* 優先權：210 */
    #main #content .text { color: #e67e22; }
    
    /* 複雜的組合選擇器 */
    /* 優先權：21 */
    div div p { color: #1abc9c; }
    
    /* 優先權：31 */
    .container .content p { color: #34495e; }
    
    /* 優先權：112 */
    #main .content p.highlight { color: #8e44ad; }
    
    /* 偽類別的優先權 */
    /* 優先權：11 */
    a:hover { color: #e74c3c; }
    
    /* 優先權：20 */
    .menu a:hover { color: #3498db; }
    
    /* 優先權：110 */
    #nav a:hover { color: #27ae60; }
    
    /* 屬性選擇器的優先權 */
    /* 優先權：10 */
    [type="text"] { color: #f39c12; }
    
    /* 優先權：11 */
    input[type="text"] { color: #9b59b6; }
    
    /* 優先權：20 */
    .form [type="text"] { color: #e67e22; }
    
    /* 優先權：110 */
    #form input[type="text"] { color: #1abc9c; }
  </style>
</head>
<body>
  <div id="main">
    <div id="content" class="container">
      <p>這個段落的顏色是什麼？</p>
      <p class="text">這個有 class 的段落是什麼顏色？</p>
      <p class="text highlight">這個有多個 class 的段落呢？</p>
      
      <div class="content">
        <p>嵌套在 .content 中的段落</p>
        <p class="text">嵌套在 .content 中且有 class 的段落</p>
      </div>
    </div>
  </div>
  
  <nav id="nav" class="menu">
    <a href="#">導航連結</a>
    <a href="#" class="active">啟用的連結</a>
  </nav>
  
  <form id="form" class="form">
    <input type="text" placeholder="文字輸入框">
    <input type="email" placeholder="電子郵件輸入框">
  </form>
</body>
</html>
```

### !important 的使用

`!important` 宣告可以覆蓋優先權計算，但應該謹慎使用：

```css
/* 正常的優先權 */
p { color: blue; }              /* 優先權：1 */
.text { color: red; }           /* 優先權：10 */
#main p { color: green; }       /* 優先權：101 */

/* 使用 !important */
p { color: purple !important; } /* 會覆蓋上面所有規則 */

/* 只有更高優先權的 !important 才能覆蓋 */
#main p { color: orange !important; } /* 這個會覆蓋上面的 purple */
```

{% note danger %}
**謹慎使用 !important**
- `!important` 會破壞 CSS 的自然優先權順序
- 讓維護變得困難
- 只在必要時使用（如覆蓋第三方套件的樣式）
- 如果要覆蓋 `!important`，只能使用更高優先權的 `!important`
{% endnote %}

## 繼承與優先權的互動

繼承和優先權的互動是 CSS 中最複雜的部分之一：

```html
<style>
  .parent { color: #e74c3c; }
  .child { color: inherit; }
  div .child { color: #3498db; }
</style>

<div class="parent" style="color: #27ae60;">
  <p class="child">這段文字是什麼顏色？</p>
</div>
```

**分析過程：**
1. `.child` 設定為 `inherit`，會繼承父元素的顏色
2. `div .child` 的優先權（11）高於 `.child`（10）
3. 但 `inherit` 會去查看父元素的顏色設定
4. 父元素有行內樣式 `color: #27ae60`
5. 所以 `inherit` 的值是 `#27ae60`
6. 最終 `div .child` 的 `color: #3498db` 會覆蓋 `inherit` 的值
7. 結果顯示藍色（#3498db）

# CSS 命名管理技巧
CSS 命名管理是前端開發中的重要技能，好的命名規範能讓代碼更易讀、易維護，並減少命名衝突。雖然命名方式本身不會直接影響 CSS 優先權，但良好的命名規範能讓我們更容易控制樣式的套用和維護。

## 1. 組織良好的 CSS 結構

```css
/* 基礎樣式 - 建立統一的基礎 */
body { color: #333; }
p { color: #555; }
a { color: #007bff; }

/* 組件樣式 - 可重複使用的組件 */
.btn { color: #fff; }
.card { color: #333; }
.nav { color: #666; }

/* 狀態樣式 - 表示不同狀態 */
.btn:hover { color: #f8f9fa; }
.card.active { color: #000; }
.nav.open { color: #333; }

/* 工具類 - 單一功能的輔助類 */
.text-primary { color: #007bff !important; }
.text-success { color: #28a745 !important; }
.text-danger { color: #dc3545 !important; }
```

## 2. CSS 方法論簡介

```css
/* BEM 方法論範例 */
.menu { color: #333; }
.menu__item { color: #666; }
.menu__item--active { color: #007bff; }
.menu__item--disabled { color: #ccc; }

/* 組件化思維 */
.component { color: #333; }
.component-header { color: #000; }
.component-body { color: #666; }
.component-footer { color: #999; }
```

{% note info %}
**CSS 命名管理的最佳實踐**
1. 使用語義化的類名
2. 保持命名一致性
3. 避免過於複雜的嵌套
4. 使用統一的命名規範
5. 建立可重複使用的組件
6. 適當使用 CSS 方法論來組織代碼
{% endnote %}

透過良好的命名管理技巧，你可以建立更結構化、更易維護的 CSS 代碼。這些技巧對於大型專案和團隊開發特別重要，能夠大幅提升開發效率和代碼品質。

## 3. BEM 方法論詳解

BEM（Block Element Modifier）是一種廣泛使用的 CSS 類名命名規範，它能幫助我們建立可維護、可重用且具有清晰結構的 CSS 代碼。

### BEM 的核心概念

**Block（區塊）**：獨立的組件，可以在任何地方重複使用
**Element（元素）**：區塊的組成部分，與區塊緊密相關
**Modifier（修飾符）**：區塊或元素的不同狀態、版本或變化

### BEM 命名規則

```css
/* 基本語法 */
.block { }              /* 區塊 */
.block__element { }     /* 元素：block + __ + element */
.block--modifier { }    /* 區塊修飾符：block + -- + modifier */
.block__element--modifier { } /* 元素修飾符：block__element + -- + modifier */
```

### 實際應用範例

**1. 導航選單組件**

```css
/* 區塊：導航選單 */
.nav { 
  color: #333;
  background-color: #f8f9fa;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* 元素：選單項目 */
.nav__item { 
  color: #666;
  display: inline-block;
  padding: 12px 16px;
  text-decoration: none;
  transition: color 0.3s ease;
}

/* 元素：選單連結 */
.nav__link { 
  color: inherit;
  text-decoration: none;
}

/* 修飾符：啟用狀態的選單項目 */
.nav__item--active { 
  color: #007bff;
  background-color: #e3f2fd;
  font-weight: bold;
}

/* 修飾符：停用狀態的選單項目 */
.nav__item--disabled { 
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

/* 修飾符：垂直導航 */
.nav--vertical .nav__item { 
  color: #333;
  display: block;
  border-bottom: 1px solid #eee;
}

/* 修飾符：深色主題導航 */
.nav--dark { 
  color: #fff;
  background-color: #343a40;
}

.nav--dark .nav__item { 
  color: #adb5bd;
}

.nav--dark .nav__item--active { 
  color: #fff;
  background-color: #495057;
}
```

**2. 卡片組件**

```css
/* 區塊：卡片 */
.card { 
  color: #333;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 元素：卡片標題 */
.card__header { 
  color: #2c3e50;
  padding: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  font-weight: bold;
}

/* 元素：卡片內容 */
.card__body { 
  color: #666;
  padding: 16px;
  line-height: 1.6;
}

/* 元素：卡片標題 */
.card__title { 
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-size: 1.25em;
  font-weight: bold;
}

/* 元素：卡片文字 */
.card__text { 
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

/* 元素：卡片頁尾 */
.card__footer { 
  color: #6c757d;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  font-size: 0.9em;
}

/* 修飾符：特色卡片 */
.card--featured { 
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0,123,255,0.2);
}

.card--featured .card__header { 
  color: #fff;
  background-color: #007bff;
  border-bottom-color: #0056b3;
}

/* 修飾符：警告卡片 */
.card--warning { 
  border-color: #ffc107;
  background-color: #fff8e1;
}

.card--warning .card__header { 
  color: #856404;
  background-color: #fff3cd;
  border-bottom-color: #ffeaa7;
}

.card--warning .card__text { 
  color: #856404;
}

/* 修飾符：小尺寸卡片 */
.card--small .card__header,
.card--small .card__body,
.card--small .card__footer { 
  padding: 8px 12px;
}

.card--small .card__title { 
  font-size: 1em;
}

.card--small .card__text { 
  font-size: 0.9em;
}

/* 修飾符：無邊框卡片 */
.card--borderless { 
  border: none;
  box-shadow: none;
}

.card--borderless .card__header,
.card--borderless .card__footer { 
  background-color: transparent;
  border: none;
}
```

**3. 按鈕組件**

```css
/* 區塊：按鈕 */
.btn { 
  color: #fff;
  background-color: #6c757d;
  border: 1px solid #6c757d;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  transition: all 0.3s ease;
}

/* 元素：按鈕圖標 */
.btn__icon { 
  color: inherit;
  margin-right: 8px;
  font-size: 0.9em;
}

/* 元素：按鈕文字 */
.btn__text { 
  color: inherit;
}

/* 修飾符：主要按鈕 */
.btn--primary { 
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn--primary:hover { 
  color: #fff;
  background-color: #0056b3;
  border-color: #004085;
}

/* 修飾符：成功按鈕 */
.btn--success { 
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn--success:hover { 
  color: #fff;
  background-color: #1e7e34;
  border-color: #1c7430;
}

/* 修飾符：危險按鈕 */
.btn--danger { 
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn--danger:hover { 
  color: #fff;
  background-color: #bd2130;
  border-color: #b21f2d;
}

/* 修飾符：大尺寸按鈕 */
.btn--large { 
  padding: 12px 24px;
  font-size: 1.1em;
}

.btn--large .btn__icon { 
  margin-right: 10px;
  font-size: 1em;
}

/* 修飾符：小尺寸按鈕 */
.btn--small { 
  padding: 4px 8px;
  font-size: 0.9em;
}

.btn--small .btn__icon { 
  margin-right: 4px;
  font-size: 0.8em;
}

/* 修飾符：圓形按鈕 */
.btn--rounded { 
  border-radius: 50px;
}

/* 修飾符：停用按鈕 */
.btn--disabled { 
  color: #6c757d;
  background-color: #e9ecef;
  border-color: #e9ecef;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn--disabled:hover { 
  color: #6c757d;
  background-color: #e9ecef;
  border-color: #e9ecef;
}
```

### BEM 實際應用範例

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>BEM 方法論示範</title>
  <style>
    /* BEM 組件樣式已在上面定義 */
  </style>
</head>
<body>
  <!-- 導航選單組件 -->
  <nav class="nav nav--horizontal">
    <a href="#" class="nav__item nav__item--active">
      <span class="nav__link">首頁</span>
    </a>
    <a href="#" class="nav__item">
      <span class="nav__link">關於我們</span>
    </a>
    <a href="#" class="nav__item">
      <span class="nav__link">服務項目</span>
    </a>
    <a href="#" class="nav__item nav__item--disabled">
      <span class="nav__link">聯絡我們</span>
    </a>
  </nav>

  <!-- 卡片組件 -->
  <div class="card card--featured">
    <div class="card__header">
      <h3 class="card__title">特色文章</h3>
    </div>
    <div class="card__body">
      <p class="card__text">這是一篇特色文章的內容摘要。</p>
      <button class="btn btn--primary">
        <span class="btn__icon">📖</span>
        <span class="btn__text">閱讀更多</span>
      </button>
    </div>
    <div class="card__footer">
      發布時間：2024-01-01
    </div>
  </div>

  <!-- 警告卡片 -->
  <div class="card card--warning card--small">
    <div class="card__header">
      <h4 class="card__title">重要提醒</h4>
    </div>
    <div class="card__body">
      <p class="card__text">請注意系統維護時間。</p>
    </div>
  </div>

  <!-- 按鈕群組 -->
  <div class="btn-group">
    <button class="btn btn--primary btn--large">
      <span class="btn__icon">💾</span>
      <span class="btn__text">儲存</span>
    </button>
    <button class="btn btn--success">
      <span class="btn__icon">✓</span>
      <span class="btn__text">確認</span>
    </button>
    <button class="btn btn--danger btn--small">
      <span class="btn__icon">🗑️</span>
      <span class="btn__text">刪除</span>
    </button>
    <button class="btn btn--disabled">
      <span class="btn__text">停用按鈕</span>
    </button>
  </div>
</body>
</html>
```

### BEM 的優點

1. **可預測性**：類名清楚表達了元素的用途和關係
2. **可重用性**：組件可以在不同地方重複使用而不會衝突
3. **可維護性**：修改樣式時不會意外影響其他元素
4. **低優先權**：大多數選擇器都是單一類名，優先權較低且一致
5. **團隊協作**：提供了統一的命名規範

### BEM 的最佳實踐

```css
/* ✅ 好的 BEM 範例 */
.search-form { color: #333; }
.search-form__input { color: #666; }
.search-form__button { color: #fff; }
.search-form__button--disabled { color: #ccc; }
.search-form--compact .search-form__input { color: #555; }

/* ❌ 避免的寫法 */
.search-form .input { color: #666; }  /* 不要嵌套 */
.search-form__input__label { color: #333; }  /* 避免多層元素 */
.searchFormButton--disabled { color: #ccc; }  /* 保持命名一致性 */
```

### BEM 命名技巧

1. **使用語義化的名稱**：`header`、`content`、`sidebar` 而非 `top`、`middle`、`left`
2. **保持一致性**：統一使用連字符或底線
3. **避免過深的嵌套**：最多 `block__element` 兩層
4. **修飾符要明確**：`--active`、`--disabled`、`--large` 等狀態清晰
5. **區塊名稱要唯一**：避免與其他組件衝突

{% note success %}
**BEM 方法論的核心原則**
1. **Block**：獨立的功能組件
2. **Element**：組件的組成部分
3. **Modifier**：組件的狀態或變化
4. **一致性**：統一的命名規範
5. **可重用性**：組件可以在任何地方使用
6. **可維護性**：修改不會產生副作用
{% endnote %}

透過使用 BEM 方法論，你可以建立更結構化、更易維護的 CSS 代碼，特別適合大型專案和團隊開發。