---
title: "[基礎課程] CSS 教學（二）：屬性值 - 基本篇"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - RWD 響應式網頁設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - CSS3
  - 前端入門
date: 2025-07-03 01:27:51
---

![](assets/images/banner/css.png)

在學會了 CSS 的基本語法和選擇器之後，現在我們要深入學習各種 CSS 屬性值的使用方法。這篇文章將帶你認識最常用且基礎的 CSS 屬性，包括字型設定、文字樣式、背景效果等等。

<!-- more -->

# CSS 屬性值：基本篇

CSS 的核心概念就是透過各種屬性值來告訴瀏覽器如何渲染網頁元素的外觀。一個完整的網頁元素通常會同時套用多種屬性，這些屬性相互搭配，最終呈現出我們想要的視覺效果。

在這個章節中，我們將學習一些最常用且基礎的 CSS 屬性。掌握這些屬性是學習 CSS 的重要基石，它們在幾乎所有的網頁設計中都會用到。

{% note info %}
**學習小技巧**
許多 CSS 屬性都支援「組合寫法」（簡寫語法），可以將多個相關屬性合併成一行。這不僅能減少代碼量，也是專業 CSS 開發者的常用技巧。
{% endnote %}

{% blockquote CSS's keyword index https://developer.mozilla.org/zh-TW/docs/Web/CSS/Reference#Keyword_index %}
完整的 CSS 屬性清單請參考 MDN 官方手冊，這是最權威的 CSS 參考資料。
{% endblockquote %}

## 字型 - Font

字型設定是網頁設計中最基礎也是最重要的部分之一。良好的字型選擇不僅影響網頁的可讀性，也大幅影響使用者的閱讀體驗。在這個段落中，我們將學習如何控制文字的字型家族、大小、粗細等各種屬性。

{% note primary %}
**學習策略建議**
建議先在 `body` 元素上設定全站的基本字型樣式，這樣可以確保整個網站有統一的視覺風格。之後如果需要特殊效果，再針對特定元素進行個別設定。
{% endnote %}

### 基礎字型屬性

以下是五種最常用的字型相關屬性：

```css style.css
body {
  /* 設定字型家族 */
  font-family: "Microsoft JhengHei", Arial, sans-serif;
  
  /* 設定字體大小 - 可使用 px、em、rem 等單位 */
  font-size: 20px;
  
  /* 設定斜體效果 */
  font-style: italic;
  
  /* 設定字體粗細 */
  font-weight: bold;
  
  /* 設定字體變體 - 小型大寫字母效果 */
  font-variant: small-caps;
}
```

### font-family 字型設定與來源

`font-family` 是字型設定中最重要的屬性，它決定了文字使用什麼字型來顯示。了解不同字型來源的特性，對於建立穩定可靠的網頁設計非常重要。

{% note info %}
**字型選擇技巧**
可以設定多個字型作為備選方案（使用逗號分隔），瀏覽器會依序嘗試載入。這種「字型堆疊」（font stack）的概念確保了即使某個字型無法載入，也有備選方案可用。
{% endnote %}

#### 字型設定規則說明

```css
/* 字型設定範例 */
.text-example {
  /* 優先使用微軟正黑體，如果沒有則使用 Arial，最後使用系統預設的無襯線字型 */
  font-family: "Microsoft JhengHei", Arial, sans-serif;
}
```

**字型設定要點：**
- 多個字型名稱用逗號分隔
- 包含空格的字型名稱需要用引號包圍
- 建議最後加上通用字型（如 `sans-serif`）作為最終備選

{% note warning %}
**字型命名注意事項**
- 中文字型名稱建議使用英文名稱（如 "Microsoft JhengHei"）以確保跨平台相容性
- 避免使用過於特殊的字型，因為使用者的電腦可能沒有安裝
{% endnote %}

#### 字型來源分類

網頁字型的來源可以分為四大類，各有其優缺點和適用場景：

##### 系統通用字型

這些是各個作業系統都支援的基本字型分類：

```css
/* 通用字型分類 */
.serif-text { font-family: serif; }           /* 襯線體 */
.sans-serif-text { font-family: sans-serif; } /* 無襯線體 */
.monospace-text { font-family: monospace; }   /* 等寬字型 */
.cursive-text { font-family: cursive; }       /* 手寫體 */
.fantasy-text { font-family: fantasy; }       /* 裝飾字型 */
```

**優點：** 保證相容性，載入速度快  
**缺點：** 中文支援有限，視覺效果基本

{% blockquote 維基百科-襯線體 https://zh.wikipedia.org/wiki/%E8%A1%AC%E7%BA%BF%E4%BD%93 %}
襯線體指的是在字母筆畫的開始及結束部位有額外裝飾的字型，在中文環境中類似明體字。這些裝飾有助於文字的可讀性，特別是在印刷媒體上。
{% endblockquote %}

##### 系統指定字型

使用作業系統內建的特定字型：

```css
/* 常見系統字型 */
.windows-font { font-family: "Microsoft JhengHei", "微軟正黑體"; }  /* Windows */
.mac-font { font-family: "PingFang TC", "蘋方-繁"; }             /* macOS */
.android-font { font-family: "Noto Sans TC", "思源黑體"; }        /* Android */
```

**優點：** 具有平台特色，載入速度快  
**缺點：** 跨平台一致性差，需要多重備選方案

##### 外部字型檔案

提供自訂 TTF/OTF 字型檔案：

```css
/* 自訂字型載入 */
@font-face {
  font-family: "CustomFont";
  src: url("fonts/custom-font.woff2") format("woff2"),
       url("fonts/custom-font.woff") format("woff"),
       url("fonts/custom-font.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

/* 使用自訂字型 */
.custom-text {
  font-family: "CustomFont", "Microsoft JhengHei", sans-serif;
}
```

**優點：** 完全客製化，獨特的視覺效果  
**缺點：** 檔案大小問題、載入時間長、可能的授權問題

{% note danger %}
**字型授權重要提醒**
使用自訂字型時務必注意著作權問題！商業字型通常需要購買授權才能在網站上使用。建議優先使用開源字型或確認已取得合法授權。
{% endnote %}

##### 線上字型服務（推薦）

使用 CDN 字型服務，如 Google Fonts：

```html index.html
<!-- HTML 中載入 Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
```

```css style.css
/* 或在 CSS 中載入 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');

/* 使用線上字型 */
body {
  font-family: 'Noto Sans TC', "Microsoft JhengHei", sans-serif;
}
```

**優點：** 高品質字型、免費使用、CDN 快速載入、持續更新  
**缺點：** 需要網路連線

{% blockquote Noto Sans TC https://fonts.google.com/specimen/Noto+Sans+TC %}
推薦使用 Google Fonts 的思源黑體繁體中文版本（Noto Sans TC），這是一套完全免費且高品質的中文字型。
{% endblockquote %}

{% note success %}
**實務建議：線上字型最佳實踐**
1. 選擇 `<link>` 方式載入（比 `@import` 效能更好）
2. 使用 `font-display: swap` 改善載入體驗
3. 只載入需要的字重，避免載入整個字型家族
4. 設定合適的 fallback 字型
{% endnote %}

### font-size 單位詳解

字體大小的單位選擇會直接影響網頁的可讀性和響應式設計效果。不同的單位有不同的特性和適用場景：

#### 絕對單位

```css
/* 絕對單位範例 */
.absolute-units {
  font-size: 16px;    /* 像素 - 最常用 */
  font-size: 12pt;    /* 點 - 印刷單位 */
  font-size: 1pc;     /* 皮卡 - 很少使用 */
}
```

#### 相對單位

```css
/* 相對單位範例 */
.relative-units {
  font-size: 1em;     /* 相對於父元素 */
  font-size: 1.2rem;  /* 相對於根元素 */
  font-size: 120%;    /* 百分比 */
}
```

#### 單位比較實例

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>字體單位比較</title>
  <style>
    html { font-size: 16px; } /* 根元素設定 */
    
    .container { 
      font-size: 20px; 
      border: 2px solid #ddd;
      padding: 16px;
      margin: 16px 0;
    }
    
    .px-demo { font-size: 18px; }           /* 絕對 18px */
    .em-demo { font-size: 1.2em; }          /* 20px × 1.2 = 24px */
    .rem-demo { font-size: 1.5rem; }        /* 16px × 1.5 = 24px */
    .percent-demo { font-size: 110%; }      /* 20px × 110% = 22px */
  </style>
</head>
<body>
  <div class="container">
    父容器字體：20px
    <div class="px-demo">px 範例：18px（絕對大小）</div>
    <div class="em-demo">em 範例：1.2em（相對父容器 = 24px）</div>
    <div class="rem-demo">rem 範例：1.5rem（相對根元素 = 24px）</div>
    <div class="percent-demo">% 範例：110%（相對父容器 = 22px）</div>
  </div>
</body>
</html>
```

{% note info %}
**單位選擇建議**
- **px**：精確控制，適合邊框、陰影等
- **rem**：響應式設計首選，相對於根元素
- **em**：相對排版，適合按鈕、組件內部
- **\%**：比例縮放，適合特殊場景
{% endnote %}

#### em 與 rem 的巢狀效應

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>em vs rem 巢狀比較</title>
  <style>
    html { font-size: 16px; }
    
    .em-container div { font-size: 1.2em; }
    .rem-container div { font-size: 1.2rem; }
    
    .debug {
      border: 1px solid #ccc;
      padding: 8px;
      margin: 4px 0;
    }
  </style>
</head>
<body>
  <h2>em 範例（會累積放大）</h2>
  <div class="em-container debug">
    Level 1 (1.2em = 19.2px)
    <div class="debug">
      Level 2 (1.2em = 23.04px)
      <div class="debug">
        Level 3 (1.2em = 27.65px)
      </div>
    </div>
  </div>
  
  <h2>rem 範例（始終相對根元素）</h2>
  <div class="rem-container debug">
    Level 1 (1.2rem = 19.2px)
    <div class="debug">
      Level 2 (1.2rem = 19.2px)
      <div class="debug">
        Level 3 (1.2rem = 19.2px)
      </div>
    </div>
  </div>
</body>
</html>
```

{% tabs fontUnits,1 %}
<!-- tab em 範例 -->
```html
<div style="font-size: 20px;">
  父容器 20px
  <div style="font-size: 1.5em;">
    子容器 1.5em = 30px
    <div style="font-size: 1.2em;">
      孫容器 1.2em = 36px (30px × 1.2)
    </div>
  </div>
</div>
```
<!-- endtab -->
<!-- tab rem 範例 -->
```html
<div style="font-size: 20px;">
  父容器 20px
  <div style="font-size: 1.5rem;">
    子容器 1.5rem = 24px (16px × 1.5)
    <div style="font-size: 1.2rem;">
      孫容器 1.2rem = 19.2px (16px × 1.2)
    </div>
  </div>
</div>
```
<!-- endtab -->
{% endtabs %}

### 字重與樣式控制

除了字型和大小，字體的粗細和樣式也是重要的視覺元素：

```css
/* 字重控制 */
.font-weights {
  font-weight: 100;     /* 極細 */
  font-weight: 300;     /* 細 */
  font-weight: 400;     /* 正常（等同 normal） */
  font-weight: 500;     /* 中等 */
  font-weight: 700;     /* 粗體（等同 bold） */
  font-weight: 900;     /* 極粗 */
  
  /* 關鍵字寫法 */
  font-weight: normal;  /* 400 */
  font-weight: bold;    /* 700 */
  font-weight: lighter; /* 比父元素更細 */
  font-weight: bolder;  /* 比父元素更粗 */
}

/* 字體樣式 */
.font-styles {
  font-style: normal;   /* 正常 */
  font-style: italic;   /* 斜體 */
  font-style: oblique;  /* 傾斜（人工斜體） */
}

/* 字體變體 */
.font-variants {
  font-variant: normal;     /* 正常 */
  font-variant: small-caps; /* 小型大寫 */
}
```

### Font 綜合簡寫

CSS 提供了 `font` 簡寫屬性，可以同時設定多個字型相關的屬性：

```css
/* font 簡寫語法 */
/* font: [font-style] [font-variant] [font-weight] font-size[/line-height] font-family */

.font-shorthand-examples {
  /* 基本寫法 */
  font: 16px Arial;
  
  /* 完整寫法 */
  font: italic small-caps bold 18px/1.5 "Microsoft JhengHei", sans-serif;
  
  /* 常用寫法 */
  font: bold 20px/1.4 "Noto Sans TC", sans-serif;
  
  /* 系統字型關鍵字 */
  font: menu;      /* 選單字型 */
  font: caption;   /* 說明文字字型 */
  font: icon;      /* 圖示標籤字型 */
}
```

{% note warning %}
**font 簡寫注意事項**
- `font-size` 和 `font-family` 是必需的
- 如果包含 `line-height`，必須用斜線分隔（如 `16px/1.5`）
- 使用簡寫會重置所有字型相關屬性
- 屬性順序很重要，不能隨意調換
{% endnote %}

## 文字 - Text

文字不僅僅是內容的載體，更是影響使用者閱讀體驗的重要元素。CSS 提供了豐富的文字控制屬性，讓我們能夠精確地調整文字的呈現效果，就像在 Word 中編輯文件一樣。

{% note primary %}
**文字設計原則**
良好的文字設計應該注重可讀性、一致性和美觀性。合適的行高、字間距和對齊方式能大幅提升使用者的閱讀體驗。
{% endnote %}

### 段落樣式基礎

文字段落的基本樣式控制包括對齊、裝飾、縮排等多個面向：

```css style.css
.text-styles {
  /* 文字對齊 - 只對行內元素有效 */
  text-align: left;      /* 左對齊（預設） */
  text-align: right;     /* 右對齊 */
  text-align: center;    /* 置中對齊 */
  text-align: justify;   /* 兩端對齊 */
  
  /* 文字裝飾線 */
  text-decoration: none;        /* 無裝飾 */
  text-decoration: underline;   /* 底線 */
  text-decoration: overline;    /* 上線 */
  text-decoration: line-through; /* 刪除線 */
  
  /* 首行縮排 */
  text-indent: 2em;      /* 縮排 2 個字元寬度 */
  text-indent: 32px;     /* 縮排 32 像素 */
  
  /* 英文大小寫轉換 */
  text-transform: none;        /* 不轉換 */
  text-transform: capitalize;  /* 單字首字母大寫 */
  text-transform: uppercase;   /* 全部大寫 */
  text-transform: lowercase;   /* 全部小寫 */
}
```

#### 文字陰影效果

文字陰影可以增加文字的立體感和視覺層次：

```css
.text-shadow-examples {
  /* 基本陰影：水平偏移 垂直偏移 模糊半徑 顏色 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  /* 多重陰影 */
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    -2px -2px 4px rgba(255, 255, 255, 0.3);
  
  /* 發光效果 */
  text-shadow: 0 0 10px #00ffff;
  
  /* 立體效果 */
  text-shadow: 
    1px 1px 0 #ccc,
    2px 2px 0 #999,
    3px 3px 0 #666;
}
```

{% note info %}
**文字陰影設計技巧**
- 適度的陰影能增強可讀性，特別是在圖片背景上
- 避免過度的陰影效果，會影響閱讀體驗
- 淺色文字搭配深色陰影，深色文字搭配淺色陰影
{% endnote %}

#### text-align 的作用範圍

需要特別注意 `text-align` 的作用機制：

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>text-align 作用範圍示範</title>
  <style>
    .container {
      width: 300px;
      border: 2px solid #ddd;
      padding: 16px;
      margin: 16px 0;
    }
    
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    
    .inline-element {
      background-color: yellow;
      padding: 4px 8px;
    }
    
    .block-element {
      background-color: lightblue;
      padding: 8px;
      width: 150px;
    }
  </style>
</head>
<body>
  <div class="container text-center">
    <p>這個段落會置中對齊</p>
    <span class="inline-element">這個 span 也會置中</span>
    <div class="block-element">這個 div 不會置中（因為是 block 元素）</div>
  </div>
</body>
</html>
```

{% note danger %}
**常見錯誤：text-align 的限制**
`text-align` 只能控制**行內元素**和**行內內容**的對齊，無法直接讓 block 元素本身置中。要讓 block 元素置中，需要使用 `margin: auto` 或其他佈局方法。
{% endnote %}

### 字元間距控制

精確的間距控制能讓文字排版更加精緻：

```css
.spacing-control {
  /* 字元間距（包括中文字之間的間距） */
  letter-spacing: 0.1em;    /* 正值增加間距 */
  letter-spacing: -0.05em;  /* 負值減少間距 */
  
  /* 單字間距（只影響英文單字間的空格） */
  word-spacing: 0.2em;      /* 增加英文單字間距 */
  word-spacing: -0.1em;     /* 減少英文單字間距 */
  
  /* 行高設定 */
  line-height: 1.6;         /* 倍數（推薦） */
  line-height: 24px;        /* 絕對值 */
  line-height: 150%;        /* 百分比 */
}
```

#### 實際應用範例

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>間距控制示範</title>
  <style>
    .demo-container {
      border: 1px solid #ddd;
      padding: 16px;
      margin: 16px 0;
    }
    
    .normal-spacing { 
      /* 預設間距 */ 
    }
    
    .tight-spacing {
      letter-spacing: -0.02em;
      word-spacing: -0.1em;
      line-height: 1.3;
    }
    
    .loose-spacing {
      letter-spacing: 0.1em;
      word-spacing: 0.3em;
      line-height: 1.8;
    }
    
    .artistic-spacing {
      letter-spacing: 0.3em;
      text-transform: uppercase;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="demo-container normal-spacing">
    <h3>正常間距</h3>
    <p>This is a paragraph with normal spacing. 這是一個具有正常間距的段落。</p>
  </div>
  
  <div class="demo-container tight-spacing">
    <h3>緊密間距</h3>
    <p>This is a paragraph with tight spacing. 這是一個具有緊密間距的段落。</p>
  </div>
  
  <div class="demo-container loose-spacing">
    <h3>寬鬆間距</h3>
    <p>This is a paragraph with loose spacing. 這是一個具有寬鬆間距的段落。</p>
  </div>
  
  <div class="demo-container artistic-spacing">
    <h3>藝術效果</h3>
    <p>Design Typography</p>
  </div>
</body>
</html>
```

### 文字溢出處理

當文字內容超出容器寬度時，我們需要適當的處理機制：

#### 單行文字省略

```css
.single-line-ellipsis {
  width: 200px;              /* 必須設定寬度 */
  white-space: nowrap;       /* 強制不換行 */
  overflow: hidden;          /* 隱藏溢出內容 */
  text-overflow: ellipsis;   /* 顯示省略號 */
}
```

#### 多行文字省略

```css
.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;     /* 顯示行數 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

{% note warning %}
**瀏覽器相容性提醒**
多行文字省略使用了 `-webkit-` 前綴，主要支援 WebKit 核心的瀏覽器。對於需要更好相容性的專案，可能需要 JavaScript 輔助或其他解決方案。
{% endnote %}

#### 完整的溢出處理範例

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>文字溢出處理示範</title>
  <style>
    .demo-box {
      width: 250px;
      border: 2px solid #ddd;
      padding: 16px;
      margin: 16px 0;
      background-color: #f9f9f9;
    }
    
    .single-line {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .multi-line-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .multi-line-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div class="demo-box">
    <h3>原始文字</h3>
    <p>這是一段很長的文字內容，用來測試文字溢出處理的效果。在實際的網頁設計中，我們經常需要處理文字超出容器寬度的情況。</p>
  </div>
  
  <div class="demo-box">
    <h3>單行省略</h3>
    <p class="single-line">這是一段很長的文字內容，用來測試文字溢出處理的效果。在實際的網頁設計中，我們經常需要處理文字超出容器寬度的情況。</p>
  </div>
  
  <div class="demo-box">
    <h3>兩行省略</h3>
    <p class="multi-line-2">這是一段很長的文字內容，用來測試文字溢出處理的效果。在實際的網頁設計中，我們經常需要處理文字超出容器寬度的情況。</p>
  </div>
  
  <div class="demo-box">
    <h3>三行省略</h3>
    <p class="multi-line-3">這是一段很長的文字內容，用來測試文字溢出處理的效果。在實際的網頁設計中，我們經常需要處理文字超出容器寬度的情況。</p>
  </div>
</body>
</html>
```

### 文字換行控制

在處理長單字、URL 或中英文混合內容時，換行控制變得非常重要：

#### 換行相關屬性

```css
.word-break-examples {
  /* word-break：決定單字如何斷行 */
  word-break: normal;      /* 預設值，依照語言規則 */
  word-break: break-all;   /* 允許在任意字元間斷行 */
  word-break: keep-all;    /* 不允許中文/日文/韓文斷行 */
  word-break: break-word;  /* 同 overflow-wrap: break-word */
  
  /* overflow-wrap：長單字溢出時的處理 */
  overflow-wrap: normal;     /* 預設值 */
  overflow-wrap: break-word; /* 長單字會斷行 */
  
  /* white-space：空白字元的處理 */
  white-space: normal;    /* 預設值，合併空白 */
  white-space: nowrap;    /* 不換行 */
  white-space: pre;       /* 保留所有空白和換行 */
  white-space: pre-wrap;  /* 保留空白，但允許換行 */
  white-space: pre-line;  /* 合併空白，保留換行 */
}
```

{% jsfiddle summer10920/boexum6L result,html,css dark 100% 1000 %}

#### 換行處理實例

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>文字換行控制示範</title>
  <style>
    .demo-container {
      width: 200px;
      border: 2px solid #ddd;
      padding: 12px;
      margin: 12px;
      display: inline-block;
      vertical-align: top;
    }
    
    .normal { word-break: normal; }
    .break-all { word-break: break-all; }
    .keep-all { word-break: keep-all; }
    .overflow-break { overflow-wrap: break-word; }
    .no-wrap { white-space: nowrap; }
  </style>
</head>
<body>
  <div class="demo-container normal">
    <h4>word-break: normal</h4>
    <p>這是一個 very-very-very-long-english-word 測試換行效果的段落。</p>
  </div>
  
  <div class="demo-container break-all">
    <h4>word-break: break-all</h4>
    <p>這是一個 very-very-very-long-english-word 測試換行效果的段落。</p>
  </div>
  
  <div class="demo-container keep-all">
    <h4>word-break: keep-all</h4>
    <p>這是一個 very-very-very-long-english-word 測試換行效果的段落。</p>
  </div>
  
  <div class="demo-container overflow-break">
    <h4>overflow-wrap: break-word</h4>
    <p>這是一個 very-very-very-long-english-word 測試換行效果的段落。</p>
  </div>
  
  <div class="demo-container no-wrap">
    <h4>white-space: nowrap</h4>
    <p>這是一個 very-very-very-long-english-word 測試換行效果的段落。</p>
  </div>
</body>
</html>
```

{% tabs wordBreakDemo,1 %}
<!-- tab 正常換行 -->
```css
.normal-text {
  width: 200px;
  word-break: normal;
}
```
適用於一般情況，依照語言規則換行。
<!-- endtab -->
<!-- tab 強制斷詞 -->
```css
.break-all-text {
  width: 200px;
  word-break: break-all;
}
```
適用於需要嚴格控制寬度的情況，如表格。
<!-- endtab -->
<!-- tab 保持完整 -->
```css
.keep-all-text {
  width: 200px;
  word-break: keep-all;
}
```
適用於中文排版，保持詞語完整性。
<!-- endtab -->
{% endtabs %}

{% note info %}
**換行控制選擇指南**
- **一般內容**：使用 `word-break: normal` 和 `overflow-wrap: break-word`
- **中文內容**：考慮使用 `word-break: keep-all` 保持詞語完整
- **程式碼或 URL**：使用 `word-break: break-all` 或 `overflow-wrap: break-word`
- **不允許換行**：使用 `white-space: nowrap`
{% endnote %}

### line-height 深度解析

行高是影響文字可讀性的關鍵因素，正確的行高設定能大幅提升閱讀體驗：

#### line-height 的計算原理

```css
.line-height-examples {
  /* 不同的 line-height 設定方式 */
  line-height: normal;    /* 瀏覽器預設值，通常是 1.2 */
  line-height: 1.5;       /* 無單位數字（推薦） */
  line-height: 1.5em;     /* em 單位 */
  line-height: 150%;      /* 百分比 */
  line-height: 24px;      /* 絕對值 */
}
```

#### line-height 繼承差異

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>line-height 繼承示範</title>
  <style>
    .parent-number { 
      font-size: 16px; 
      line-height: 1.5; /* 繼承倍數 */
    }
    
    .parent-em { 
      font-size: 16px; 
      line-height: 1.5em; /* 繼承計算值 24px */
    }
    
    .child { 
      font-size: 20px; 
    }
    
    .demo-box {
      border: 1px solid #ddd;
      padding: 12px;
      margin: 12px 0;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="demo-box parent-number">
    <h3>父元素：line-height: 1.5</h3>
    <div class="child">
      <p>子元素字體 20px，繼承倍數 1.5，行高 = 20px × 1.5 = 30px</p>
    </div>
  </div>
  
  <div class="demo-box parent-em">
    <h3>父元素：line-height: 1.5em</h3>
    <div class="child">
      <p>子元素字體 20px，繼承固定值 24px，行高 = 24px</p>
    </div>
  </div>
</body>
</html>
```

{% note info %}
**line-height 最佳實踐**
- 使用無單位數字（如 `1.5`）便於繼承和維護
- 一般文章內容建議使用 1.4-1.6 之間的值
- 標題可以使用較小的值（1.1-1.3）
- 避免使用小於 1.2 的值，會影響可讀性
{% endnote %}

#### line-height 的垂直置中技巧

```css
/* 利用 line-height 實現垂直置中 */
.vertical-center-text {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
}

/* 適用於按鈕等單行文字元素 */
.btn {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  text-align: center;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
```

### vertical-align 詳解

`vertical-align` 是一個經常被誤解的屬性，它只對行內元素和表格單元格有效：

```css
.vertical-align-examples {
  /* 關鍵字值 */
  vertical-align: baseline;    /* 預設值，基線對齊 */
  vertical-align: top;         /* 頂部對齊 */
  vertical-align: middle;      /* 中間對齊 */
  vertical-align: bottom;      /* 底部對齊 */
  vertical-align: text-top;    /* 文字頂部對齊 */
  vertical-align: text-bottom; /* 文字底部對齊 */
  vertical-align: sub;         /* 下標 */
  vertical-align: super;       /* 上標 */
  
  /* 數值 */
  vertical-align: 10px;        /* 向上偏移 10px */
  vertical-align: -5px;        /* 向下偏移 5px */
  vertical-align: 0.3em;       /* 相對偏移 */
  
  /* 百分比（相對於 line-height） */
  vertical-align: 50%;         /* 向上偏移行高的 50% */
}
```

#### vertical-align 實際應用

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>vertical-align 示範</title>
  <style>
    .demo-line {
      line-height: 60px;
      border: 1px solid #ddd;
      margin: 16px 0;
      padding: 0 16px;
      background: linear-gradient(#f0f0f0 50%, #e0e0e0 50%);
    }
    
    .img-demo {
      width: 40px;
      height: 40px;
      background-color: #007bff;
      display: inline-block;
    }
    
    .top { vertical-align: top; }
    .middle { vertical-align: middle; }
    .bottom { vertical-align: bottom; }
    .baseline { vertical-align: baseline; }
    .text-top { vertical-align: text-top; }
    .text-bottom { vertical-align: text-bottom; }
  </style>
</head>
<body>
  <div class="demo-line">
    文字基線
    <span class="img-demo baseline"></span> baseline
    <span class="img-demo top"></span> top
    <span class="img-demo middle"></span> middle
    <span class="img-demo bottom"></span> bottom
  </div>
  
  <div class="demo-line">
    文字基線
    <span class="img-demo text-top"></span> text-top
    <span class="img-demo text-bottom"></span> text-bottom
  </div>
  
  <div class="demo-line">
    E = mc<span style="vertical-align: super; font-size: 0.8em;">2</span>
    H<span style="vertical-align: sub; font-size: 0.8em;">2</span>O
  </div>
</body>
</html>
```

{% note warning %}
**vertical-align 常見誤解**
`vertical-align` 不能用於 block 元素的垂直置中！它只對行內元素、行內區塊元素和表格單元格有效。要讓 block 元素垂直置中，需要使用 Flexbox、Grid 或其他佈局方法。
{% endnote %}

{% note success %}
**實用技巧：圖文對齊**
當圖片和文字並排時，使用 `vertical-align: middle` 可以讓圖片與文字垂直置中對齊：

```css
.icon {
  vertical-align: middle;
  margin-right: 8px;
}
```
{% endnote %}

## 連結 - Link

連結的樣式設計直接影響使用者的互動體驗。CSS 提供了完整的偽類別來控制連結在不同狀態下的外觀：

### 連結狀態控制

```css
/* 連結的四種基本狀態（順序很重要！） */
a:link {
  color: #007bff;           /* 未訪問的連結 */
  text-decoration: none;
}

a:visited {
  color: #6f42c1;           /* 已訪問的連結 */
}

a:hover {
  color: #0056b3;           /* 滑鼠懸停時 */
  text-decoration: underline;
  transition: color 0.3s ease;
}

a:active {
  color: #003d82;           /* 點擊瞬間 */
}
```

{% note danger %}
**連結偽類別順序規則**
連結偽類別必須按照 **L**o**V**e **HA**te 的順序撰寫：
1. `:link` - 未訪問連結
2. `:visited` - 已訪問連結  
3. `:hover` - 懸停狀態
4. `:active` - 啟用狀態

如果順序錯誤，某些狀態可能會被其他狀態覆蓋而失效！
{% endnote %}

### 現代連結設計

```css
/* 現代連結樣式設計 */
.modern-link {
  color: #007bff;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}

/* 下滑線動畫效果 */
.modern-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.modern-link:hover::after {
  width: 100%;
}

.modern-link:hover {
  color: #0056b3;
}
```

### 不同類型連結的樣式

```css
/* 主要連結 */
.link-primary {
  color: #007bff;
  font-weight: 500;
}

.link-primary:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* 次要連結 */
.link-secondary {
  color: #6c757d;
  font-size: 0.9em;
}

.link-secondary:hover {
  color: #495057;
}

/* 危險操作連結 */
.link-danger {
  color: #dc3545;
}

.link-danger:hover {
  color: #a71e2a;
}

/* 外部連結 */
.link-external::after {
  content: " ↗";
  font-size: 0.8em;
  opacity: 0.7;
}

/* 下載連結 */
.link-download::before {
  content: "⬇ ";
  opacity: 0.7;
}
```

### 完整連結樣式範例

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>連結樣式完整示範</title>
  <style>
    body {
      font-family: "Microsoft JhengHei", sans-serif;
      line-height: 1.6;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    /* 基本連結樣式 */
    a {
      color: #007bff;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    a:visited { color: #6f42c1; }
    a:hover { 
      color: #0056b3; 
      text-decoration: underline;
    }
    a:active { color: #003d82; }
    
    /* 特殊連結類型 */
    .link-button {
      display: inline-block;
      padding: 8px 16px;
      background-color: #007bff;
      color: white !important;
      border-radius: 4px;
      text-decoration: none;
    }
    
    .link-button:hover {
      background-color: #0056b3;
      text-decoration: none;
    }
    
    .link-subtle {
      color: #6c757d;
      border-bottom: 1px dotted #6c757d;
    }
    
    .link-subtle:hover {
      color: #495057;
      border-bottom-style: solid;
      text-decoration: none;
    }
    
    .link-animated {
      position: relative;
      overflow: hidden;
    }
    
    .link-animated::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s;
    }
    
    .link-animated:hover::before {
      left: 100%;
    }
  </style>
</head>
<body>
  <h1>各種連結樣式示範</h1>
  
  <h2>基本連結</h2>
  <p>這是一個 <a href="#">普通連結</a>，具有基本的懸停效果。</p>
  <p>這是一個 <a href="#" class="link-subtle">低調連結</a>，使用虛線邊框。</p>
  
  <h2>按鈕樣式連結</h2>
  <p>
    <a href="#" class="link-button">主要按鈕</a>
    <a href="#" class="link-button" style="background-color: #28a745;">成功按鈕</a>
    <a href="#" class="link-button" style="background-color: #dc3545;">危險按鈕</a>
  </p>
  
  <h2>動畫效果連結</h2>
  <p>這是一個 <a href="#" class="link-animated">具有光澤動畫的連結</a>。</p>
  
  <h2>不同狀態展示</h2>
  <ul>
    <li><a href="javascript:void(0)">未訪問連結</a></li>
    <li><a href="#visited">已訪問連結</a></li>
    <li>連結在懸停時會改變顏色</li>
    <li>連結在點擊時會有短暫的激活狀態</li>
  </ul>
</body>
</html>
```

{% tabs linkStyles,1 %}
<!-- tab 基本樣式 -->
```css
a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}
```
適用於大多數網站的基本連結樣式。
<!-- endtab -->
<!-- tab 按鈕樣式 -->
```css
.link-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.link-btn:hover {
  background-color: #0056b3;
}
```
讓連結看起來像按鈕，適合重要的行動呼籲。
<!-- endtab -->
<!-- tab 下劃線動畫 -->
```css
.link-underline {
  position: relative;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s;
}

.link-underline:hover::after {
  width: 100%;
}
```
現代化的下劃線動畫效果。
<!-- endtab -->
{% endtabs %}

## 小節練習 - Font

現在讓我們實際運用前面學到的字型知識！我們將基於之前 HTML 文章的總結練習，純粹使用 CSS 來美化網頁。

{% note success %}
**實作目標**
透過這個練習，你將學會如何：
1. 統一網站的字型風格
2. 設計不同層級的標題樣式
3. 建立美觀的連結效果
4. 控制段落的排版細節
5. 使用 CSS 取代 HTML 的排版屬性
{% endnote %}

### 練習要求

基於之前 HTML 文章的總結練習，在不修改 HTML 結構的條件下，僅使用 CSS 完成以下任務：

{% note primary %}
**任務清單**
1. 將所有字體改成「微軟正黑體」
2. 設定標題 h1 的字型大小為 40px，且不是斜體（不刪除 em 情況下）
3. 設定標題 h2 的顏色（隨意選擇）
4. 設定 a 連結的四種狀態樣式（未訪問、已訪問、懸停、點擊）
5. 設定 p 段落的行高 1.5 倍，並且設定段落的縮排為 2rem
6. 設定每個 p 段落的第一個字變大且為粗體
7. 將「技術觀念」四字設定成紅色
8. 將座位表的 center 外層標籤拿掉，使用 CSS 實現置中
9. 將表格裡面所有的 align="center" 拿掉，使用 CSS 代替
10. 嘗試將整個表格也置中於畫面
{% endnote %}

### 範例解答

{% tabs fontExercise,1 %}
<!-- tab 題目預覽 -->
{% jsfiddle summer10920/ex1c3bsd result dark 100% 500 %}
<!-- endtab -->
<!-- tab HTML 結構 -->
```html TryCSS_cls2_font.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>我的第一個網頁</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 id="top"><em>網頁前端技術</em></h1>
  <p>
    這是我在職訓期間所要學習的前端技術，每項技術都有它負責的工作，學習網頁最重要的是<strong>技術觀念</strong>，不需要去背記全部的標籤、屬性、值，常使用自然會記起，
    遇到不懂或是忘記的標籤，使用網路資源 Google 或前往
    <a href="http://www.runoob.com/" target="_blank">菜鳥教程</a>
    查詢，一定要自己去嘗試，才能產生自己的想法。
  </p>
  <ul>
    <li><a href="#html">HTML</a></li>
    <li><a href="#css">CSS</a></li>
    <li><a href="#js">Javascript</a></li>
    <li><a href="#jq">JQuery</a></li>
    <li><a href="#bs">Bootstrap</a></li>
  </ul>

  <hr>

  <img src="https://imgur.com/VCHx7bt.png" width="150" alt="html" title="html" id="html">
  <h2>HTML-負責架構、內容</h2>
  <p>
    超文本標記語言（英語：HyperText Markup Language，簡稱：HTML）是一種用於建立網頁的標準標記語言。HTML 是一種基礎技術，常與 CSS、JavaScript 一起被眾多網站用於設計賞心悅目的網頁、網頁應用程式以及行動應用程式的使用者介面。
  </p>
  
  <!-- 其他內容略。.. -->
  
  <div class="center">
    <h2>座位表</h2>
    <table width="800px" border="1px">
      <tr>
        <td colspan="4">
          <table border="1">
            <tr>
              <td>老師的位置</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>4 號</td>
        <td>3 號</td>
        <td>2 號</td>
        <td>1 號</td>
      </tr>
      <!-- 其他行略。.. -->
    </table>
  </div>
</body>
</html>
```
<!-- endtab -->
<!-- tab CSS 解答 -->
```css style.css
/* 1. 統一字型 */
body {
  font-family: "Microsoft JhengHei", Arial, sans-serif;
}

/* 2. h1 標題樣式 */
h1 {
  font-size: 40px;
}

/* 取消 em 的斜體效果 */
h1 em {
  font-style: normal;
}

/* 3. h2 標題顏色 */
h2 {
  color: #007bff;
}

/* 4. 連結狀態樣式 */
a:link {
  color: #ff6b35;
  text-decoration: none;
}

a:visited {
  color: #6c757d;
}

a:hover {
  color: #343a40;
  text-decoration: underline;
}

a:active {
  color: #007bff;
}

/* 5. 段落樣式 */
p {
  line-height: 1.5;
  text-indent: 2rem;
}

/* 6. 段落首字特效 */
p:first-letter {
  font-size: 1.5em;
  font-weight: bold;
  color: #007bff;
}

/* 7. 特定文字顏色 */
strong {
  color: #dc3545;
}

/* 8. 表格置中 */
.center {
  text-align: center;
}

/* 9. 表格樣式 */
table {
  border-collapse: collapse;
  margin: 0 auto; /* 10. 表格本身置中 */
}

td {
  text-align: center;
  padding: 8px;
}

/* 額外的美化 */
hr {
  border: none;
  height: 2px;
  background: linear-gradient(to right, transparent, #ddd, transparent);
  margin: 2rem 0;
}

img {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
}

li {
  display: inline-block;
  margin-right: 1rem;
}

li a {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

li a:hover {
  background-color: #e9ecef;
}
```
<!-- endtab -->
{% endtabs %}

### 練習重點解析

{% note info %}
**解題技巧分析**

1. **字型繼承**：在 `body` 設定字型，所有子元素都會繼承
2. **特異性運用**：使用 `h1 em` 選擇器覆蓋 `em` 的預設斜體
3. **偽類別順序**：連結偽類別必須依照 LoVe HAte 順序
4. **偽元素應用**：`:first-letter` 能針對首字設定特殊樣式
5. **表格置中**：結合 `text-align: center` 和 `margin: auto` 實現完全置中
{% endnote %}

---

## 背景 - Background

背景設定是網頁視覺設計的重要元素，能夠為頁面增添豐富的視覺層次。CSS 提供了完整的背景控制屬性，從簡單的純色背景到複雜的多層背景效果都能實現。

{% note primary %}
**學習準備**
為了更好地學習背景屬性，建議先準備一個具有寬高的容器元素：
```html
<div class="bg-demo" style="width:800px; height:600px;"></div>
```
{% endnote %}

### 基礎背景屬性

背景設定包含顏色、圖片、重複、位置、大小等多個面向：

```css
.background-basics {
  /* 背景顏色 */
  background-color: #f0f8ff;
  
  /* 背景圖片 */
  background-image: url("https://picsum.photos/200/300");
  
  /* 背景重複方式 */
  background-repeat: no-repeat;    /* 不重複 */
  background-repeat: repeat;       /* 重複（預設） */
  background-repeat: repeat-x;     /* 水平重複 */
  background-repeat: repeat-y;     /* 垂直重複 */
  background-repeat: space;        /* 等間距重複 */
  background-repeat: round;        /* 縮放適配重複 */
  background-repeat: space repeat; /*雙值語法 水平 horizontal | 垂直 vertical */
  
  /* 背景位置 */
  background-position: center;              /* 置中 */
  background-position: top left;            /* 左上角 */
  background-position: 50% 50%;            /* 百分比定位 */
  background-position: 100px 200px;        /* 像素定位 */
  
  /* 背景尺寸 */
  background-size: auto;           /* 原始大小 */
  background-size: cover;          /* 覆蓋整個容器 */
  background-size: contain;        /* 完整顯示圖片 */
  background-size: 100% 100%;      /* 拉伸填滿 */
  background-size: 300px 200px;    /* 指定尺寸 */
}
```

### 背景重複模式詳解

不同的重複模式適用於不同的設計需求：

{% tabs backgroundRepeat,1 %}
<!-- tab repeat -->
```css
.bg-repeat {
  background-image: url("https://picsum.photos/100/100");
  background-repeat: repeat;
}
```
適用於需要填滿整個背景的紋理或圖案。
<!-- endtab -->
<!-- tab no-repeat -->
```css
.bg-no-repeat {
  background-image: url("https://picsum.photos/200/300");
  background-repeat: no-repeat;
  background-position: center;
}
```
適用於裝飾性圖片或需要精確控制位置的背景。
<!-- endtab -->
<!-- tab space -->
```css
.bg-space {
  background-image: url("https://picsum.photos/100/100");
  background-repeat: space;
}
```
圖片間有間隔，適用於需要整齊排列的背景圖案。
<!-- endtab -->
<!-- tab round -->
```css
.bg-round {
  background-image: url("https://picsum.photos/100/100");
  background-repeat: round;
}
```
圖片會縮放以完整填滿容器，適用於彈性設計。
<!-- endtab -->
{% endtabs %}

### 背景尺寸控制

`background-size` 是控制背景圖片顯示效果的關鍵屬性：

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>背景尺寸示範</title>
  <style>
    .size-demo {
      width: 300px;
      height: 200px;
      border: 2px solid #ddd;
      margin: 16px;
      display: inline-block;
      background-image: url("https://picsum.photos/400/300");
      background-repeat: no-repeat;
      background-position: center;
    }
    
    .size-auto { background-size: auto; }
    .size-cover { background-size: cover; }
    .size-contain { background-size: contain; }
    .size-100 { background-size: 100% 100%; }
    .size-custom { background-size: 150px 100px; }
  </style>
</head>
<body>
  <div class="size-demo size-auto">
    <p>auto</p>
  </div>
  <div class="size-demo size-cover">
    <p>cover</p>
  </div>
  <div class="size-demo size-contain">
    <p>contain</p>
  </div>
  <div class="size-demo size-100">
    <p>100% 100%</p>
  </div>
  <div class="size-demo size-custom">
    <p>150px 100px</p>
  </div>
</body>
</html>
```

{% note info %}
**背景尺寸選擇指南**
- **auto**：保持原始尺寸，適合裝飾性小圖
- **cover**：填滿容器，適合全版背景圖
- **contain**：完整顯示圖片，適合重要的視覺內容
- **100% 100%**：拉伸填滿，可能造成圖片變形
- **具體數值**：精確控制，適合需要固定尺寸的設計
{% endnote %}

### 背景裁剪與起始位置

CSS3 提供了更精確的背景控制機制：

#### background-clip（背景裁剪）

```css
.background-clip-demo {
  border: 20px dashed #ff0000;
  padding: 20px;
  background: url("https://picsum.photos/400/300") #f0f0f0;
  background-size: cover;
  
  /* 背景裁剪區域 */
  background-clip: border-box;     /* 預設值，包含邊框 */
  background-clip: padding-box;    /* 不包含邊框 */
  background-clip: content-box;    /* 只有內容區域 */
  background-clip: text;           /* 文字形狀（需要透明文字） */
}
```

#### background-origin（背景起始位置）

```css
.background-origin-demo {
  border: 20px solid #ff0000;
  padding: 20px;
  background: url("https://picsum.photos/100/100") no-repeat;
  
  /* 背景起始位置 */
  background-origin: padding-box;  /* 預設值，從 padding 開始 */
  background-origin: border-box;   /* 從邊框開始 */
  background-origin: content-box;  /* 從內容區域開始 */
}
```

### 背景附著效果

`background-attachment` 控制背景圖片的滾動行為：

```css
.background-attachment-demo {
  height: 400px;
  background-image: url("https://picsum.photos/800/600");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* 背景附著模式 */
  background-attachment: scroll;   /* 預設值，隨內容滾動 */
  background-attachment: fixed;    /* 固定在視窗，不隨滾動 */
  background-attachment: local;    /* 隨內容滾動 */
}
```

#### 視差滾動效果

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>背景固定效果</title>
  <style>
    body {
      margin: 0;
      height: 200vh; /* 讓頁面可以滾動 */
    }
    
    .parallax-section {
      height: 100vh;
      background-image: url("https://picsum.photos/1920/1080");
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .parallax-content {
      background-color: rgba(255, 255, 255, 0.9);
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
    }
    
    .normal-section {
      height: 100vh;
      padding: 2rem;
      background-color: #f8f9fa;
    }
  </style>
</head>
<body>
  <div class="parallax-section">
    <div class="parallax-content">
      <h1>視差滾動效果</h1>
      <p>這個背景圖片會固定在視窗中</p>
    </div>
  </div>
  <div class="normal-section">
    <h2>一般內容區域</h2>
    <p>滾動頁面來觀察背景固定效果</p>
  </div>
</body>
</html>
```

### 背景簡寫語法

`background` 屬性可以同時設定多個背景相關的屬性：

```css
.background-shorthand {
  /* 完整語法：background: color image repeat attachment position/size origin clip */
  background: #f0f0f0 url("image.jpg") no-repeat fixed center/cover content-box border-box;
  
  /* 常用簡寫 */
  background: url("image.jpg") no-repeat center/cover;
  background: #333 url("pattern.png") repeat-x top;
  background: linear-gradient(45deg, #ff0, #f00);
}
```

{% note warning %}
**背景簡寫注意事項**
- `background-size` 必須緊接在 `background-position` 後面，用斜線分隔
- 如果同時設定 `background-origin` 和 `background-clip`，第一個值給 origin，第二個給 clip
- 使用簡寫會重置所有背景相關屬性，包括沒有指定的屬性
{% endnote %}

### 多層背景效果

CSS3 支援多層背景的疊加效果：

```css
.multi-background {
  background: 
    url("overlay.png") repeat,
    url("texture.jpg") no-repeat center/cover,
    linear-gradient(45deg, rgba(255,0,0,0.3), rgba(0,0,255,0.3)),
    #f0f0f0;
  
  /* 也可以分別設定每層的屬性 */
  background-image: 
    url("top-layer.png"),
    url("middle-layer.jpg"),
    url("bottom-layer.png");
  
  background-position: 
    top left,
    center,
    bottom right;
  
  background-repeat: 
    repeat-x,
    no-repeat,
    repeat-y;
}
```

### 背景漸層效果

CSS 漸層是一種特殊的背景圖片，可以創造豐富的視覺效果：

{% blockquote CSS Gradient https://cssgradient.io/ %}
可透過網路上的免費產生器去快速調整想要的漸層（但功能很基本）
{% endblockquote %}

#### 線性漸層（Linear Gradient）

```css
.linear-gradients {
  /* 基本線性漸層 */
  background: linear-gradient(to right, #ff0, #f00);
  
  /* 指定角度 */
  background: linear-gradient(45deg, #ff0, #f00);
  
  /* 多色漸層 */
  background: linear-gradient(to right, #ff0, #0f0, #00f);
  
  /* 指定顏色位置 */
  background: linear-gradient(to right, #ff0 0%, #f00 50%, #00f 100%);
  
  /* 硬邊漸層 */
  background: linear-gradient(to right, #ff0 50%, #f00 50%);
}
```

#### 放射漸層（Radial Gradient）

```css
.radial-gradients {
  /* 基本放射漸層 */
  background: radial-gradient(circle, #ff0, #f00);
  
  /* 指定形狀和大小 */
  background: radial-gradient(ellipse 200px 100px, #ff0, #f00);
  
  /* 指定中心位置 */
  background: radial-gradient(circle at top left, #ff0, #f00);
  
  /* 指定漸層範圍 */
  background: radial-gradient(circle closest-side, #ff0, #f00);
}
```

#### 實用漸層範例

```html index.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>CSS 漸層效果展示</title>
  <style>
    .gradient-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 16px;
    }
    
    .gradient-item {
      height: 200px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
    
    .gradient-1 {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .gradient-2 {
      background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%);
    }
    
    .gradient-3 {
      background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
    }
    
    .gradient-4 {
      background: radial-gradient(circle at center, #ff9a9e 0%, #fecfef 100%);
    }
    
    .gradient-5 {
      background: conic-gradient(from 180deg, #ff0, #f0f, #00f, #0ff, #0f0, #ff0);
    }
    
    .gradient-6 {
      background: 
        linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%),
        linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  </style>
</head>
<body>
  <div class="gradient-grid">
    <div class="gradient-item gradient-1">線性漸層</div>
    <div class="gradient-item gradient-2">柔和漸層</div>
    <div class="gradient-item gradient-3">暖色漸層</div>
    <div class="gradient-item gradient-4">放射漸層</div>
    <div class="gradient-item gradient-5">圓錐漸層</div>
    <div class="gradient-item gradient-6">多層漸層</div>
  </div>
</body>
</html>
```

### 漸層文字效果

結合 `background-clip: text` 可以創造漸層文字效果：

```css
.gradient-text {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* 備用方案 */
}
```

{% note info %}
**漸層設計技巧**
- 使用相近的顏色可以創造自然的漸層效果
- 加入透明度可以創造更豐富的視覺層次
- 結合多個漸層可以創造複雜的視覺效果
- 使用在線工具如 [CSS Gradient](https://cssgradient.io/) 可以快速生成漸層代碼
{% endnote %}

### 背景最佳實踐

1. **效能考量**：避免使用過大的背景圖片
2. **響應式設計**：使用 `background-size: cover` 確保圖片適應不同螢幕
3. **可讀性**：確保背景不會影響文字的可讀性
4. **備用方案**：為背景圖片設定適當的背景顏色作為備用

```css
.best-practice-bg {
  background: 
    url("hero-image.jpg") no-repeat center/cover,
    #333; /* 備用顏色 */
  
  /* 確保文字可讀性 */
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}
```

## 小節練習 - Background
現在來實際練習背景相關的屬性！這個練習將幫助你熟悉各種背景效果的運用。

### 練習目標

使用提供的 HTML 結構，透過 CSS 創造出指定的背景效果：

{% tabs backgroundExercise,1 %}
<!-- tab 練習素材 -->
```html TryCSS_cls2_background.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>背景練習</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <table>
    <tr>
      <td class="a"></td>
      <td class="b"></td>
      <td class="c"></td>
    </tr>
    <tr>
      <td class="d"></td>
      <td class="e"></td>
      <td class="f"></td>
    </tr>
    <tr>
      <td class="g"></td>
      <td class="h"></td>
      <td class="i"></td>
    </tr>
  </table>
</body>
</html>
```

```css style.css
/* 基礎樣式 */
body {
  text-align: center;
  font-family: "Microsoft JhengHei", sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

table {
  margin: 1rem auto;
  border-collapse: separate;
  border-spacing: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

table td {
  width: 200px;
  height: 200px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

/* 在這裡完成各個格子的背景效果 */
```
<!-- endtab -->
<!-- tab 目標效果 -->
{% jsfiddle summer10920/2x965cyq result dark 100% 750 %}
<!-- endtab -->
<!-- tab 參考解答 -->
```css style.css
/* 基礎樣式 */
body {
  text-align: center;
  font-family: "Microsoft JhengHei", sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

table {
  margin: 1rem auto;
  border-collapse: separate;
  border-spacing: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

table td {
  width: 200px;
  height: 200px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

/* 各格子的背景效果 */
.a {
  background-color: #ff6b6b;
}

.b {
  background: url("https://picsum.photos/300/300?random=1") center/cover no-repeat;
}

.c {
  background: url("https://picsum.photos/80/80?random=2") repeat-x;
}

.d {
  background: url("https://picsum.photos/80/80?random=3") repeat-y;
}

.e {
  background: url("https://picsum.photos/100/100?random=4") no-repeat center;
}

.f {
  background: url("https://picsum.photos/100/100?random=5") no-repeat center #fff3cd;
}

.g {
  background: 
    url("https://picsum.photos/200/60?random=6") no-repeat top,
    url("https://picsum.photos/200/80?random=7") no-repeat center,
    url("https://picsum.photos/200/60?random=8") no-repeat bottom;
}

.h {
  background: linear-gradient(to right, #667eea, #764ba2);
}

.i {
  background: radial-gradient(circle, #ff9a9e, #fecfef);
}

/* 添加懸停效果 */
table td:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
  border-color: #007bff;
}

/* 為漸層格子添加文字說明 */
.h::after {
  content: "Linear";
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.i::after {
  content: "Radial";
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}
```
<!-- endtab -->
{% endtabs %}

### 練習要點解析

{% note success %}
**背景效果說明**
- **A 格**：純色背景，展示基本的 `background-color`
- **B 格**：圖片背景，使用 `cover` 填滿整個區域
- **C 格**：水平重複背景，適合做邊框或裝飾
- **D 格**：垂直重複背景，常用於側邊欄設計
- **E 格**：單一置中圖片，常用於圖標或 logo
- **F 格**：圖片搭配背景色，增加視覺豐富度
- **G 格**：多層背景效果，創造複雜的視覺層次
- **H 格**：線性漸層，現代化的背景效果
- **I 格**：放射漸層，創造焦點效果
{% endnote %}

## 清單 - List

HTML 清單是網頁中常見的元素，用於展示有序或無序的資料。主要有三種類型：
- **ul**：無序清單，預設使用「●」符號
- **ol**：有序清單，預設使用阿拉伯數字，可使用 HTML 屬性 `start` 控制起始編號
- **dl**：描述清單，較少使用，適合術語定義

{% note primary %}
**學習重點：清單的基本結構**
清單元素由容器（ul/ol/dl）和項目（li/dt/dd）組成，CSS 樣式主要應用在這些元素上。
{% endnote %}

### 清單符號樣式控制
清單符號是清單元素的重要視覺特徵，透過 CSS 可以靈活控制符號的樣式和位置。掌握這些技巧可以讓清單更符合設計需求，也能創造出獨特的視覺效果。

#### 基本符號類型
`list-style-type` 屬性可以改變清單項目的符號樣式：

{% tabs listTypes,1 %}
<!-- tab 符號對照表 -->
| **list-style-type**  | **定義**     | **適用情境**   |
| -------------------- | ------------ | -------------- |
| none                 | 不顯示符號   | 自訂導航選單   |
| disc                 | 實心圓形     | 一般無序清單   |
| circle               | 空心圓形     | 次級清單項目   |
| square               | 實心正方形   | 重點強調項目   |
| decimal              | 阿拉伯數字   | 步驟說明       |
| decimal-leading-zero | 補零數字     | 編號格式化     |
| lower-alpha          | 小寫英文字母 | 子項目編號     |
| upper-alpha          | 大寫英文字母 | 正式文件編號   |
| lower-roman          | 小寫羅馬數字 | 古典風格編號   |
| upper-roman          | 大寫羅馬數字 | 章節編號       |
| armenian             | 亞美尼亞數字 | 特殊需求       |
| lower-greek          | 希臘字母     | 數學或科學文件 |
<!-- endtab -->
<!-- tab 範例程式碼 -->
```html index.html
<!DOCTYPE html>
<html>
<head>
<style>
  .demo-list {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .none-style { list-style-type: none; }
  .disc-style { list-style-type: disc; }
  .circle-style { list-style-type: circle; }
  .square-style { list-style-type: square; }
  .decimal-style { list-style-type: decimal; }
  .alpha-style { list-style-type: lower-alpha; }
  .roman-style { list-style-type: lower-roman; }
</style>
</head>
<body>
  <div class="demo-list">
    <h4>不同符號樣式示範</h4>
    <ul class="disc-style">
      <li>預設實心圓點</li>
      <li>適合一般清單</li>
    </ul>
    
    <ul class="square-style">
      <li>正方形符號</li>
      <li>較為正式的感覺</li>
    </ul>
    
    <ol class="decimal-style">
      <li>數字編號</li>
      <li>步驟說明最常用</li>
    </ol>
    
    <ol class="alpha-style">
      <li>英文字母編號</li>
      <li>適合分類項目</li>
    </ol>
  </div>
</body>
</html>
```
<!-- endtab -->
{% endtabs %}

#### 進階符號控制
除了基本符號外，CSS 還提供更多控制選項：

```css
ul {
    /* 符號類型 */
    list-style-type: square;
    
    /* 符號位置：inside（內部） 或 outside（外部） */
    list-style-position: outside;
    
    /* 自訂圖示 */
    list-style-image: url('images/custom-bullet.png');
    
    /* 縮寫語法：type position image */
    list-style: square outside url('images/bullet.gif');
}

li {
    /* 透過 border 可以觀察符號位置 */
    border: 1px solid #ccc;
    margin-bottom: 5px;
    padding: 10px;
}
```

{% note info %}
**小技巧：自訂圖示符號**
使用 `list-style-image` 時，建議圖片尺寸不要超過 16x16 像素，否則可能影響行高和對齊。
{% endnote %}

### 收入應用範例
在本章節，我們將整理一些經典且實用的清單應用範例，幫助你靈活運用 CSS 打造各種不同風格的清單設計。這些範例涵蓋了從基礎到進階的技巧，適合初學者實作與練習。


#### 清單巢狀結構與樣式
在網頁設計中，巢狀清單（Nested List）是結構化資訊與多層次分類的常見工具。透過 CSS，我們可以靈活調整巢狀清單的符號樣式與縮排，讓內容層次更加清晰易讀。


```html
<style>
  .nested-list {
    line-height: 1.6;
  }
  
  .nested-list > li {
    margin-bottom: 8px;
  }
  
  .nested-list ul {
    margin-top: 8px;
    list-style-type: circle;
  }
  
  .nested-list ul ul {
    list-style-type: square;
  }
</style>

<ul class="nested-list">
  <li>前端技術
    <ul>
      <li>HTML
        <ul>
          <li>語意化標籤</li>
          <li>表單設計</li>
        </ul>
      </li>
      <li>CSS
        <ul>
          <li>選擇器</li>
          <li>佈局技巧</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>後端技術
    <ul>
      <li>Node.js</li>
      <li>PHP</li>
    </ul>
  </li>
</ul>
```

#### 清單製作導航選單

製作水平導航選單是清單的常見應用，需要掌握以下技巧：

{% note success %}
**實作要點：清單導航選單**
1. 清除預設的 `margin` 和 `padding`
2. 將 `li` 設為 `inline-block` 實現水平排列
3. 將 `a` 設為 `block` 或 `inline-block` 確保點擊區域
4. 使用 `text-align: center` 可讓整個選單置中
{% endnote %}

#### 基本水平選單
```html
<style>
  /* 重置樣式 */
  body, ul {
    margin: 0;
    padding: 0;
  }
  
  .main-nav {
    background: linear-gradient(45deg, #667eea, #764ba2);
    text-align: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .main-nav li {
    display: inline-block;
    position: relative;
  }
  
  .main-nav a {
    display: block;
    padding: 15px 25px;
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .main-nav a:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  .main-nav a:active {
    transform: translateY(0);
  }
</style>

<ul class="main-nav">
  <li><a href="#">首頁</a></li>
  <li><a href="#">關於我們</a></li>
  <li><a href="#">服務項目</a></li>
  <li><a href="#">作品集</a></li>
  <li><a href="#">聯絡我們</a></li>
</ul>
```

#### 下拉式選單
```html
<style>
  .dropdown-nav {
    background: #2c3e50;
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  
  .dropdown-nav li {
    display: inline-block;
    position: relative;
  }
  
  .dropdown-nav a {
    display: block;
    padding: 15px 20px;
    color: white;
    text-decoration: none;
    transition: background 0.3s;
  }
  
  .dropdown-nav a:hover {
    background: #34495e;
  }
  
  /* 子選單樣式 */
  .dropdown-nav ul {
    position: absolute;
    top: 100%;
    left: 0;
    background: #34495e;
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  }
  
  .dropdown-nav li:hover ul {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .dropdown-nav ul li {
    display: block;
    width: 100%;
  }
  
  .dropdown-nav ul a {
    padding: 12px 20px;
    border-bottom: 1px solid #2c3e50;
  }
  
  .dropdown-nav ul a:hover {
    background: #2c3e50;
    padding-left: 30px;
  }
</style>

<ul class="dropdown-nav">
  <li><a href="#">首頁</a></li>
  <li>
    <a href="#">產品</a>
    <ul>
      <li><a href="#">網頁設計</a></li>
      <li><a href="#">APP 開發</a></li>
      <li><a href="#">系統開發</a></li>
    </ul>
  </li>
  <li>
    <a href="#">服務</a>
    <ul>
      <li><a href="#">技術諮詢</a></li>
      <li><a href="#">維護服務</a></li>
      <li><a href="#">教育訓練</a></li>
    </ul>
  </li>
  <li><a href="#">聯絡</a></li>
</ul>
```

{% note info %}
眼尖的你發現了嗎？
仔細觀察上面的 .dropdown-nav 範例，你會發現選單項目之間有約 4px 的間隙。這是因為我們使用了 display: inline-block 來排列選單項目，而 HTML 標籤之間的換行符號被瀏覽器當作文字節點處理，產生了這個間隙。
這個問題在下一篇 CSS 教學中會詳細介紹解決方案，包括：
為什麼會出現這個間隙
四種不同的解決方法
每種方法的優缺點比較
現代化的最佳實踐
現在先記住這個現象，下一篇我們會深入探討！
{% endnote %}


#### 步驟指示器
```html
<style>
  .step-list {
    list-style: none;
    padding: 0;
    margin: 0;
    counter-reset: step-counter;
  }
  
  .step-list li {
    counter-increment: step-counter;
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #007bff;
    position: relative;
  }
  
  .step-list li::before {
    content: counter(step-counter);
    position: absolute;
    left: -15px;
    top: 20px;
    background: #007bff;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
  }
  
  .step-title {
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .step-description {
    color: #666;
    line-height: 1.6;
  }
</style>

<ol class="step-list">
  <li>
    <div class="step-title">規劃與設計</div>
    <div class="step-description">分析需求，制定設計方案，確定技術架構和視覺風格。</div>
  </li>
  <li>
    <div class="step-title">開發實作</div>
    <div class="step-description">根據設計稿進行前端和後端開發，實現所有功能需求。</div>
  </li>
  <li>
    <div class="step-title">測試與優化</div>
    <div class="step-description">進行全面測試，修復問題，優化效能和使用者體驗。</div>
  </li>
  <li>
    <div class="step-title">部署與維護</div>
    <div class="step-description">正式上線部署，提供後續維護和技術支援服務。</div>
  </li>
</ol>
```

#### 特色清單
```html
<style>
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .feature-list li {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .feature-list li:hover {
    transform: translateY(-5px);
  }
  
  .feature-icon {
    font-size: 48px;
    margin-bottom: 15px;
    display: block;
  }
  
  .feature-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .feature-description {
    font-size: 14px;
    line-height: 1.5;
    opacity: 0.9;
  }
</style>

<ul class="feature-list">
  <li>
    <span class="feature-icon">🚀</span>
    <div class="feature-title">高效能</div>
    <div class="feature-description">採用最新技術，確保網站載入速度和執行效率</div>
  </li>
  <li>
    <span class="feature-icon">📱</span>
    <div class="feature-title">響應式設計</div>
    <div class="feature-description">完美適配各種裝置，提供一致的使用體驗</div>
  </li>
  <li>
    <span class="feature-icon">🔒</span>
    <div class="feature-title">安全可靠</div>
    <div class="feature-description">採用業界標準的安全措施，保護使用者資料</div>
  </li>
  <li>
    <span class="feature-icon">🎨</span>
    <div class="feature-title">美觀設計</div>
    <div class="feature-description">專業的視覺設計，提升品牌形象和使用者體驗</div>
  </li>
</ul>
```

## 表格 - Table

HTML 表格是展示結構化資料的重要元素。在 HTML5 中，表格的外觀控制完全由 CSS 負責，提供了更大的設計靈活性。

{% note info %}
**HTML5 變化：表格屬性**
HTML5 移除了 `table` 元素的大多數外觀屬性（如 `align`、`bgcolor`、`border`、`cellpadding`、`cellspacing` 等），改用 CSS 來控制所有樣式。
{% endnote %}

### 表格基礎樣式
表格是展示結構化資料的重要元素，透過 CSS 可以讓表格呈現出專業且易讀的外觀。從基本的邊框樣式到複雜的響應式設計，表格的樣式控制涵蓋了多個面向。

#### 基本表格結構
{% note primary %}
**素材準備：表格基礎 HTML**
```html table-demo.html
<table>
  <thead>
    <tr>
      <th>姓名</th>
      <th>部門</th>
      <th>職位</th>
      <th>薪資</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>張小明</td>
      <td>技術部</td>
      <td>前端工程師</td>
      <td>60,000</td>
    </tr>
    <tr>
      <td>李美華</td>
      <td>設計部</td>
      <td>UI/UX 設計師</td>
      <td>55,000</td>
    </tr>
    <tr>
      <td>王大力</td>
      <td>技術部</td>
      <td>後端工程師</td>
      <td>65,000</td>
    </tr>
  </tbody>
</table>
```
{% endnote %}

#### 核心表格屬性
```css
table {
  /* 文字對齊 */
  text-align: center;
  
  /* 邊框間距（分離模式） */
  border-spacing: 10px;
  
  /* 空欄位處理 */
  empty-cells: show; /* show | hide */
  
  /* 邊框合併（重要） */
  border-collapse: collapse; /* separate | collapse */
  
  /* 表格寬度 */
  width: 100%;
  
  /* 外陰影 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

th, td {
  /* 邊框 */
  border: 1px solid #ddd;
  
  /* 內距 */
  padding: 12px 15px;
  
  /* 文字對齊 */
  text-align: left;
}

th {
  /* 表頭樣式 */
  background-color: #f8f9fa;
  font-weight: bold;
  color: #333;
}
```

{% note warning %}
**重要概念：border-collapse**
- `separate`：邊框分離，可使用 `border-spacing` 控制間距
- `collapse`：邊框合併，忽略 `border-spacing` 和 `empty-cells`
**建議使用 `collapse` 以獲得更緊湊的外觀**
{% endnote %}

### 現代表格設計

現代網頁設計中，表格不僅是資料展示的工具，更是視覺設計的重要元素。透過 CSS 的強大功能，我們可以創造出既美觀又實用的表格設計。

{% note info %}
**現代表格設計原則**
- 清晰的視覺層次：使用顏色和間距區分不同區域
- 響應式設計：確保在不同裝置上都能正常顯示
- 互動效果：加入懸停效果提升使用者體驗
- 可讀性優先：確保資料容易閱讀和理解
{% endnote %}

#### 基本樣式表格
```html
<style>
  .basic-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Arial', sans-serif;
    margin: 20px 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .basic-table th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;
    text-align: left;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .basic-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
  }
  
  .basic-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .basic-table tr:hover {
    background-color: #e3f2fd;
    transform: scale(1.02);
    transition: all 0.3s ease;
  }
</style>

<table class="basic-table">
  <thead>
    <tr>
      <th>產品名稱</th>
      <th>類別</th>
      <th>價格</th>
      <th>庫存</th>
      <th>狀態</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MacBook Pro</td>
      <td>筆記型電腦</td>
      <td>$59,900</td>
      <td>25</td>
      <td><span class="status-badge available">現貨</span></td>
    </tr>
    <tr>
      <td>iPad Air</td>
      <td>平板電腦</td>
      <td>$18,900</td>
      <td>15</td>
      <td><span class="status-badge available">現貨</span></td>
    </tr>
    <tr>
      <td>iPhone 14</td>
      <td>智慧型手機</td>
      <td>$27,900</td>
      <td>0</td>
      <td><span class="status-badge out-of-stock">缺貨</span></td>
    </tr>
  </tbody>
</table>
```

#### 響應式表格
```html
<style>
  .responsive-table-container {
    overflow-x: auto;
    margin: 20px 0;
  }
  
  .responsive-table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .responsive-table th {
    background: #2c3e50;
    color: white;
    padding: 15px;
    text-align: left;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .responsive-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
  }
  
  .responsive-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .responsive-table tr:hover {
    background-color: #e3f2fd;
  }
  
  @media (max-width: 768px) {
    .responsive-table-container {
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    .responsive-table th:first-child,
    .responsive-table td:first-child {
      position: sticky;
      left: 0;
      background: white;
      z-index: 9;
    }
    
    .responsive-table th:first-child {
      background: #2c3e50;
      z-index: 11;
    }
  }
</style>

<div class="responsive-table-container">
  <table class="responsive-table">
    <thead>
      <tr>
        <th>員工姓名</th>
        <th>部門</th>
        <th>職位</th>
        <th>入職日期</th>
        <th>薪資</th>
        <th>績效</th>
        <th>狀態</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>張志明</td>
        <td>技術部</td>
        <td>資深前端工程師</td>
        <td>2020-03-15</td>
        <td>70,000</td>
        <td>A+</td>
        <td>在職</td>
      </tr>
      <tr>
        <td>李美玲</td>
        <td>設計部</td>
        <td>資深 UI/UX 設計師</td>
        <td>2019-08-20</td>
        <td>65,000</td>
        <td>A</td>
        <td>在職</td>
      </tr>
      <tr>
        <td>王大明</td>
        <td>技術部</td>
        <td>後端工程師</td>
        <td>2021-01-10</td>
        <td>60,000</td>
        <td>B+</td>
        <td>在職</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### 固定表頭
```css
.fixed-header-table {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
}

.fixed-header-table table {
  width: 100%;
  border-collapse: collapse;
}

.fixed-header-table th {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
  border-bottom: 2px solid #ddd;
}
```


{% note info %}
**小技巧：表格效能優化**
使用 `table-layout: fixed` 可以加速表格渲染：
```css
table {
  table-layout: fixed;
  width: 100%;
}
```
前提是必須設定表格總寬度，適用於欄位寬度固定的情況。
{% endnote %}


# CSS 原生變數 (Custom Properties)

CSS 原生變數（正式名稱為 Custom Properties）是現代 CSS 的強大功能，讓我們能夠在樣式表中定義和重複使用變數。這項技術大幅提升了 CSS 的可維護性和靈活性，是現代網頁開發不可或缺的工具。

{% note primary %}
**學習重點**
- 理解 CSS 原生變數的概念和語法
- 掌握變數的作用域和繼承機制
- 學會在實際專案中應用變數
- 了解變數與 JavaScript 的互動方式
- 掌握變數的最佳實踐和命名規範
{% endnote %}

## 基本概念與語法

CSS 原生變數使用 `--` 前綴來定義，並透過 `var()` 函式來使用。這個功能讓我們能夠將重複使用的值抽取成變數，提升程式碼的可讀性和維護性。

### 定義與使用變數

```css
/* 定義變數 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-large: 1.25rem;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}

/* 使用變數 */
.button {
  background-color: var(--primary-color);
  font-size: var(--font-size-large);
  border-radius: var(--border-radius);
  padding: var(--spacing-unit);
}

.card {
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 1.5);
}
```

### 語法規則

{% note info %}
**重要語法規則**
- **定義**：`--變數名稱: 值;`
- **使用**：`var(--變數名稱)`
- **備用值**：`var(--變數名稱, 備用值)`
- **變數名稱**：區分大小寫，可包含字母、數字、連字符、底線
- **作用域**：遵循 CSS 的層疊和繼承規則
{% endnote %}

```css
/* 變數命名範例 */
:root {
  --main-color: #333;          /* ✅ 推薦：語義化命名 */
  --font-size-h1: 2rem;        /* ✅ 推薦：描述性命名 */
  --z-index-modal: 1000;       /* ✅ 推薦：功能性命名 */
  
  --color1: red;               /* ❌ 避免：無意義命名 */
  --big: 20px;                 /* ❌ 避免：模糊命名 */
}

/* 使用備用值 */
.element {
  color: var(--text-color, #333);           /* 如果變數未定義，使用 #333 */
  font-size: var(--custom-size, 1rem);      /* 如果變數未定義，使用 1rem */
}
```

## 作用域與繼承

CSS 變數具有作用域特性，可以在不同層級定義，並遵循 CSS 的層疊和繼承規則。

### 全域變數與局部變數

```css
/* 全域變數：定義在 :root 中 */
:root {
  --global-primary: #007bff;
  --global-secondary: #6c757d;
  --global-spacing: 1rem;
}

/* 局部變數：定義在特定選擇器中 */
.dark-theme {
  --primary-color: #0d6efd;
  --background-color: #212529;
  --text-color: #ffffff;
}

.light-theme {
  --primary-color: #0066cc;
  --background-color: #ffffff;
  --text-color: #333333;
}

/* 使用變數 */
.theme-container {
  background-color: var(--background-color);
  color: var(--text-color);
}

.button {
  background-color: var(--primary-color);
  padding: var(--global-spacing);
}
```

### 變數的繼承機制

```html index.html
<div class="parent">
  <div class="child">
    <div class="grandchild">內容</div>
  </div>
</div>
```

```css style.css
/* 變數會沿著 DOM 樹繼承 */
.parent {
  --text-size: 16px;
  --text-color: #333;
}

.child {
  --text-color: #666;  /* 覆蓋父層的變數 */
  font-size: var(--text-size);    /* 繼承父層的 --text-size */
  color: var(--text-color);       /* 使用自己定義的 --text-color */
}

.grandchild {
  /* 繼承 .child 的所有變數 */
  font-size: var(--text-size);    /* 16px */
  color: var(--text-color);       /* #666 */
}
```

## 實際應用場景

### 主題切換系統

CSS 變數最常見的應用是建立主題切換系統，透過改變根級變數來實現整站的主題變換。

```html theme-demo.html
<div class="theme-switcher">
  <button onclick="setTheme('light')">淺色主題</button>
  <button onclick="setTheme('dark')">深色主題</button>
  <button onclick="setTheme('blue')">藍色主題</button>
</div>

<div class="demo-content">
  <div class="card">
    <h3>主題展示卡片</h3>
    <p>這個卡片會根據選擇的主題改變外觀。</p>
    <button class="btn">按鈕範例</button>
  </div>
</div>
```

```css theme-styles.css
/* 基礎變數定義 */
:root {
  /* 淺色主題（預設） */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --accent-color: #007bff;
  --border-color: #dee2e6;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 深色主題 */
[data-theme="dark"] {
  --bg-primary: #212529;
  --bg-secondary: #343a40;
  --text-primary: #ffffff;
  --text-secondary: #adb5bd;
  --accent-color: #0d6efd;
  --border-color: #495057;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 藍色主題 */
[data-theme="blue"] {
  --bg-primary: #e3f2fd;
  --bg-secondary: #bbdefb;
  --text-primary: #0d47a1;
  --text-secondary: #1565c0;
  --accent-color: #2196f3;
  --border-color: #90caf9;
  --shadow: 0 2px 4px rgba(33, 150, 243, 0.2);
}

/* 應用變數的樣式 */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 400px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.card h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.btn {
  background-color: var(--accent-color);
  color: var(--bg-primary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  filter: brightness(0.9);
  transform: translateY(-1px);
}

/* 主題切換按鈕 */
.theme-switcher {
  text-align: center;
  padding: 2rem;
}

.theme-switcher button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-switcher button:hover {
  background-color: var(--accent-color);
  color: var(--bg-primary);
}
```

```js script.js
// 主題切換功能
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('preferred-theme', theme);
}

// 載入儲存的主題
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('preferred-theme') || 'light';
  setTheme(savedTheme);
});
```

### 響應式變數系統

使用 CSS 變數可以輕鬆建立響應式的設計系統：

```css
/* 響應式間距系統 */
:root {
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
}

/* 平板以上調整變數 */
@media (min-width: 768px) {
  :root {
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    
    --font-size-base: 1.125rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 1.875rem;
  }
}

/* 桌機調整變數 */
@media (min-width: 1024px) {
  :root {
    --spacing-lg: 2.5rem;
    --spacing-xl: 4rem;
    
    --font-size-2xl: 2rem;
  }
}

/* 使用響應式變數 */
.container {
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
}

.section-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-lg);
}
```

### 元件化設計系統

```css
/* 按鈕元件變數系統 */
:root {
  /* 按鈕尺寸 */
  --btn-padding-sm: 0.25rem 0.5rem;
  --btn-padding-md: 0.5rem 1rem;
  --btn-padding-lg: 0.75rem 1.5rem;
  
  --btn-font-size-sm: 0.875rem;
  --btn-font-size-md: 1rem;
  --btn-font-size-lg: 1.125rem;
  
  /* 按鈕顏色 */
  --btn-primary-bg: #007bff;
  --btn-primary-text: #ffffff;
  --btn-secondary-bg: #6c757d;
  --btn-secondary-text: #ffffff;
  --btn-success-bg: #28a745;
  --btn-success-text: #ffffff;
  --btn-danger-bg: #dc3545;
  --btn-danger-text: #ffffff;
  
  /* 按鈕狀態 */
  --btn-hover-transform: translateY(-1px);
  --btn-hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  --btn-transition: all 0.3s ease;
}

/* 基礎按鈕樣式 */
.btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  transition: var(--btn-transition);
  font-family: inherit;
}

.btn:hover {
  transform: var(--btn-hover-transform);
  box-shadow: var(--btn-hover-shadow);
}

/* 按鈕尺寸 */
.btn-sm {
  padding: var(--btn-padding-sm);
  font-size: var(--btn-font-size-sm);
}

.btn-md {
  padding: var(--btn-padding-md);
  font-size: var(--btn-font-size-md);
}

.btn-lg {
  padding: var(--btn-padding-lg);
  font-size: var(--btn-font-size-lg);
}

/* 按鈕顏色 */
.btn-primary {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.btn-secondary {
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
}

.btn-success {
  background-color: var(--btn-success-bg);
  color: var(--btn-success-text);
}

.btn-danger {
  background-color: var(--btn-danger-bg);
  color: var(--btn-danger-text);
}
```

## 與 JavaScript 的互動

CSS 變數可以透過 JavaScript 動態修改，這讓我們能夠建立更互動的使用者體驗。

### 動態修改變數

```html dynamic-demo.html
<div class="interactive-demo">
  <h3>動態顏色調整</h3>
  
  <div class="controls">
    <label>
      主要顏色：
      <input type="color" id="primaryColor" value="#007bff">
    </label>
    
    <label>
      字體大小：
      <input type="range" id="fontSize" min="12" max="24" value="16">
      <span id="fontSizeValue">16px</span>
    </label>
    
    <label>
      圓角大小：
      <input type="range" id="borderRadius" min="0" max="20" value="8">
      <span id="borderRadiusValue">8px</span>
    </label>
  </div>
  
  <div class="demo-box">
    <p>這個區塊會即時反映上方的設定變化</p>
    <button class="demo-btn">互動按鈕</button>
  </div>
</div>
```

```css dynamic-styles.css
.interactive-demo {
  --demo-primary: #007bff;
  --demo-font-size: 16px;
  --demo-border-radius: 8px;
  
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: var(--demo-border-radius);
}

.controls {
  margin-bottom: 2rem;
}

.controls label {
  display: block;
  margin-bottom: 1rem;
  font-size: var(--demo-font-size);
}

.controls input {
  margin-left: 0.5rem;
}

.demo-box {
  background-color: var(--demo-primary);
  color: white;
  padding: var(--demo-font-size);
  border-radius: var(--demo-border-radius);
  text-align: center;
}

.demo-box p {
  font-size: var(--demo-font-size);
  margin-bottom: 1rem;
}

.demo-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: calc(var(--demo-font-size) * 0.5) var(--demo-font-size);
  border-radius: var(--demo-border-radius);
  font-size: var(--demo-font-size);
  cursor: pointer;
  transition: all 0.3s ease;
}

.demo-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
```

```js dynamic-script.js
// 取得控制元素
const primaryColorInput = document.getElementById('primaryColor');
const fontSizeInput = document.getElementById('fontSize');
const borderRadiusInput = document.getElementById('borderRadius');
const fontSizeValue = document.getElementById('fontSizeValue');
const borderRadiusValue = document.getElementById('borderRadiusValue');

// 取得根元素
const root = document.documentElement;

// 主要顏色變更
primaryColorInput.addEventListener('input', function(e) {
  root.style.setProperty('--demo-primary', e.target.value);
});

// 字體大小變更
fontSizeInput.addEventListener('input', function(e) {
  const value = e.target.value + 'px';
  root.style.setProperty('--demo-font-size', value);
  fontSizeValue.textContent = value;
});

// 圓角大小變更
borderRadiusInput.addEventListener('input', function(e) {
  const value = e.target.value + 'px';
  root.style.setProperty('--demo-border-radius', value);
  borderRadiusValue.textContent = value;
});

// 讀取 CSS 變數值
function getCSSVariable(name) {
  return getComputedStyle(root).getPropertyValue(name);
}

// 範例：取得目前的主要顏色
console.log('目前主要顏色:', getCSSVariable('--demo-primary'));
```

## 進階技巧與最佳實踐

### 變數計算與組合

```css
/* 使用 calc() 計算變數 */
:root {
  --base-size: 1rem;
  --scale-ratio: 1.25;
  
  --size-xs: calc(var(--base-size) / var(--scale-ratio));
  --size-sm: var(--base-size);
  --size-md: calc(var(--base-size) * var(--scale-ratio));
  --size-lg: calc(var(--base-size) * var(--scale-ratio) * var(--scale-ratio));
  --size-xl: calc(var(--base-size) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));
}

/* 顏色變數組合 */
:root {
  --primary-hue: 210;
  --primary-saturation: 100%;
  
  --primary-50: hsl(var(--primary-hue), var(--primary-saturation), 95%);
  --primary-100: hsl(var(--primary-hue), var(--primary-saturation), 90%);
  --primary-500: hsl(var(--primary-hue), var(--primary-saturation), 50%);
  --primary-900: hsl(var(--primary-hue), var(--primary-saturation), 10%);
}

/* 間距系統 */
:root {
  --spacing-unit: 0.25rem;
  
  --space-1: var(--spacing-unit);
  --space-2: calc(var(--spacing-unit) * 2);
  --space-3: calc(var(--spacing-unit) * 3);
  --space-4: calc(var(--spacing-unit) * 4);
  --space-6: calc(var(--spacing-unit) * 6);
  --space-8: calc(var(--spacing-unit) * 8);
}
```

### 組織與命名規範

{% tabs variable-organization,1 %}
<!-- tab 命名規範 -->
**CSS 變數命名最佳實踐**

```css
/* ✅ 推薦的命名方式 */
:root {
  /* 語義化命名 */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  
  /* 功能性命名 */
  --font-size-heading: 2rem;
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
  
  /* 組件命名 */
  --button-padding: 0.5rem 1rem;
  --button-border-radius: 4px;
  --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  /* 系統級命名 */
  --z-index-modal: 1000;
  --z-index-tooltip: 1010;
  --transition-default: all 0.3s ease;
}

/* ❌ 避免的命名方式 */
:root {
  --blue: #007bff;        /* 太具體，不語義化 */
  --big: 2rem;           /* 模糊不清 */
  --x: 10px;             /* 完全無意義 */
  --color1: red;         /* 數字編號 */
}
```
<!-- endtab -->

<!-- tab 檔案組織 -->
**CSS 變數檔案組織結構**

```css
/* variables.css - 主變數檔案 */

/* ==========================================================================
   系統級變數
   ========================================================================== */

:root {
  /* 顏色系統 */
  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-500: #6b7280;
  --color-gray-900: #111827;
  
  /* 間距系統 */
  --space-px: 1px;
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  
  /* 字體系統 */
  --font-family-sans: ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: ui-monospace, monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* 陰影系統 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* 轉場效果 */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}

/* ==========================================================================
   語義化變數
   ========================================================================== */

:root {
  /* 主要顏色 */
  --color-primary: var(--color-blue-600);
  --color-secondary: var(--color-gray-600);
  --color-success: var(--color-green-600);
  --color-warning: var(--color-yellow-600);
  --color-danger: var(--color-red-600);
  
  /* 文字顏色 */
  --text-primary: var(--color-gray-900);
  --text-secondary: var(--color-gray-600);
  --text-muted: var(--color-gray-500);
  
  /* 背景顏色 */
  --bg-primary: var(--color-white);
  --bg-secondary: var(--color-gray-50);
  --bg-accent: var(--color-gray-100);
}

/* ==========================================================================
   組件變數
   ========================================================================== */

:root {
  /* 按鈕 */
  --btn-padding-sm: var(--space-1) var(--space-2);
  --btn-padding-md: var(--space-2) var(--space-4);
  --btn-padding-lg: var(--space-3) var(--space-6);
  --btn-border-radius: 0.375rem;
  
  /* 卡片 */
  --card-padding: var(--space-6);
  --card-border-radius: 0.5rem;
  --card-shadow: var(--shadow-md);
  
  /* 表單 */
  --input-padding: var(--space-2) var(--space-3);
  --input-border: 1px solid var(--color-gray-300);
  --input-border-radius: 0.375rem;
}
```
<!-- endtab -->

<!-- tab 主題管理 -->
**進階主題管理系統**

```css
/* themes.css - 主題管理檔案 */

/* 基礎主題變數 */
:root {
  --theme-transition: all 0.3s ease;
}

/* 淺色主題 */
:root,
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
  
  --border-primary: #dee2e6;
  --border-secondary: #e9ecef;
  
  --shadow-color: rgba(0, 0, 0, 0.1);
}

/* 深色主題 */
[data-theme="dark"] {
  --bg-primary: #212529;
  --bg-secondary: #343a40;
  --bg-tertiary: #495057;
  
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --text-muted: #6c757d;
  
  --border-primary: #495057;
  --border-secondary: #343a40;
  
  --shadow-color: rgba(0, 0, 0, 0.3);
}

/* 自動主題（跟隨系統） */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg-primary: #212529;
    --bg-secondary: #343a40;
    --bg-tertiary: #495057;
    
    --text-primary: #f8f9fa;
    --text-secondary: #adb5bd;
    --text-muted: #6c757d;
    
    --border-primary: #495057;
    --border-secondary: #343a40;
    
    --shadow-color: rgba(0, 0, 0, 0.3);
  }
}

/* 應用主題變數 */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--theme-transition);
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  box-shadow: 0 2px 4px var(--shadow-color);
}
```
<!-- endtab -->
{% endtabs %}

## 瀏覽器支援與注意事項

{% note warning %}
**瀏覽器支援狀況**
CSS 原生變數在現代瀏覽器中得到良好支援：
- **Chrome 49+** ✅
- **Firefox 31+** ✅  
- **Safari 9.1+** ✅
- **Edge 16+** ✅
- **IE** ❌ 不支援

對於需要支援舊版瀏覽器的專案，可以考慮使用 PostCSS 等工具進行轉換。
{% endnote %}

### 漸進增強策略

```css
/* 提供備用值給不支援的瀏覽器 */
.button {
  background-color: #007bff;                    /* 備用值 */
  background-color: var(--primary-color);      /* 現代瀏覽器 */
  
  padding: 0.5rem 1rem;                        /* 備用值 */
  padding: var(--button-padding);              /* 現代瀏覽器 */
}

/* 使用 @supports 檢測支援 */
@supports (--css: variables) {
  .enhanced-component {
    /* 只有支援 CSS 變數的瀏覽器才會套用 */
    background-color: var(--dynamic-color);
  }
}

/* 使用 CSS.supports() 在 JavaScript 中檢測 */
if (CSS.supports('--css', 'variables')) {
  // 瀏覽器支援 CSS 變數
  document.documentElement.style.setProperty('--dynamic-color', '#ff0000');
} else {
  // 使用備用方案
  document.body.style.backgroundColor = '#ff0000';
}
```

## 效能與最佳實踐

{% note success %}
**CSS 變數最佳實踐**

**效能優化**
- 將常用變數定義在 `:root` 中，減少查找時間
- 避免過度嵌套變數定義
- 合理使用變數，不要為了使用而使用

**維護性提升**
- 建立一致的命名規範
- 將變數組織到專門的檔案中
- 為變數添加註解說明用途
- 定期檢視和清理未使用的變數

**團隊協作**
- 建立變數使用指南
- 統一團隊內的變數命名規則
- 使用設計系統來定義變數值
- 提供變數使用範例和文件
{% endnote %}

透過學習 CSS 原生變數，你已經掌握了現代 CSS 開發的重要技術。這項功能不僅能提升程式碼的可維護性，還能讓你建立更靈活、更易於管理的樣式系統。在實際專案中，建議從小範圍開始應用，逐漸建立起完整的變數系統。