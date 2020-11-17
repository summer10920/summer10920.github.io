---
title: "[練習教材] 使用純 HTML/CSS 完成網頁丙級題組一"
categories:
  - 職訓教材
  - HTML/CSS
tag:
  - 前端網頁開發技術（職前班）
date: 2020-11-06 19:40:23
---

本篇為提供 HTML/CSS 的 Code 敲打練習使用（採用 VSCode 進行編譯），練習採用國內技術技能檢定中心之網頁設計丙級術科項目之題組一 (17300-104301) 且修訂版本為 109/08/21，實際內容可能不符合實際術科考照電腦環境使用（考場公告僅提供 Dreamweaver 並未表明提供 VSCode 文字編譯軟體）。

<!-- more -->

# 關於本練習
本教學主要是針對學生進行作業練習，且根據內容皆以目標時間兩小時內完成為解析目標。同時替換題目的 table 設計更改為 flexbox 設計，除了符合現在主流技術且加深初學者作為入門的練習經驗學習。事前準備有以下要點說明：

1. **取得術科題目與素材**：
可從技檢中心下載題目 pdf 與網站素材包，此資源將跟實際考試之內容一致。網站素材包內含指定題目所需之媒體影音圖片、文字。
   > 網頁乙級術科試題下載：請連結至 → [[技能檢定中心]](https://techbank.wdasec.gov.tw/owInform/TestReferData.aspx) 取得題目與素材包
2. **作業時間說明**：
參考技術士考試同等作業時間，本練習適合二小時內完成。此時間包含架設 Web 伺服器架設與環境測試（本練習將不示範操作）。
3. **環境開發工具**：
本練習不符合網頁設計丙級提供應考人使用之開發工具（請詳閱術科題目說明），本解析採用 VSCode 與外掛工具 Live Server 為自主開發練習工具。

- 完成網站範例：
  - [01-國立科技高中─校園社團介紹網](https://summer10920.github.io/Loki_PQ_WebFrontend_Exam/)

---

# No.2 設計首頁
這裡主要是說明各別檔案名稱與用途，可先建立 `index.html`, `main.html`, `guitar_history.html`, `guitar_event.html`, `guitar_learning.html` 等五個檔案即可。接著本節實作只需設計 index.html 的版型設計。

![](https://i.imgur.com/5JsWP3b.png)

index.html 為主要畫面，參考尺寸需求為設計。並使用區域 `<main>` 作為之後的 iframe 互動區。

![](https://i.imgur.com/VAwmXLX.png)

- 記得設定網頁標題為「國立科技高中─校園社團介紹網」
- 採用 flexbox 來設計版面切割，先處理大版面分割，次區域分割下一步驟處理
- 可先添加測試文字為 content 檢測
- 空間分配題目要求可供參考（示意尺寸有邏輯錯誤姓），aside 分配 215px，section 吃剩餘空間，子元素有指定為 770px 事後將多餘空間給 section 之子元素 做 padding。
```html index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>國立科技高中─校園社團介紹網</title>
  <link rel="stylesheet" href="style.css">
</head>

<!-- body.main>header.top{top}+aside>nav.menu{menu}+footer.update{update}^section>header.marquee{marquee}+main.content{content}^footer.footer{footer} -->
<body class="main">
  <header class="top">top</header>
  <aside>
    <nav class="menu">menu</nav>
    <footer class="update">update</footer>
  </aside>
  <section>
    <header class="marquee">marquee</header>
    <main class="content">content</main>
  </section>
  <footer class="footer">footer</footer>
</body>

</html>
```
```css style.css
* {
  box-sizing: border-box;
  overflow: auto;
}

body.main {
  width: 1024px;
  padding: 0 11px;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}

body > * {
  border: solid 1px #7777;
}

header.top {
  flex-basis: 1000px;
  height: 65px;
}

footer.footer {
  flex-basis: 1000px;
  height: 20px;
}

aside {
  flex-basis: calc(215px);
  height: calc(768px - 65px - 20px);
  display: flex;
}

section {
  flex-basis: calc(1000px - 215px);
  display: flex;
}
```
- 接著設計 `<aside>` 與 `<section>` 這兩個次 flexbox 切割
- 調整部分的 CSS 體驗
```css style.css
body > *:not(aside):not(section),
aside > *,
section > * {
  border: solid 1px #7777;
}

aside {
  flex-basis: calc(1000px - 770px);
  height: calc(768px - 65px - 20px);
  display: flex;
  flex-flow: column nowrap;
}
aside > nav.menu {
  flex-basis: calc(100% - 25px);
}
aside > footer.update {
  flex-basis: 25px;
}

section {
  flex-basis: calc(1000px - 215px);
  display: flex;
  flex-flow: column nowrap;
}
section > header.marquee {
  flex-basis: 29px;
  padding:0 calc((100% - 770px - 2px) / 2);
}
section > main.content {
  flex-basis: calc(100% - 29px);
  padding:calc((100% - 770px - 2px) / 2);
}
```

![結果畫面](https://i.imgur.com/BOkoYxu.png)

# No.3 網站標題區
本篇需要合成圖片（不做示範），請透過 PS 進行合成作業產生檔名 `logo.png` 解析度 994*60 並放入 top 區

![Image](https://i.imgur.com/qClGyQ8.png)

- 使用 a 包住 img 產生連結功能。而圖片與 header 的尺寸不符合。建議將 a 轉 `display:block`，使 header 範圍內都能 link 連動。
```html index.html
<header class="top">
  <a href="index.html">
    <img src="logo.png" alt="國立科技高中校園社團介紹網" srcset="">
  </a>
</header>
```
```css style.css
header.top>a{
  display: block;
}
```

# No.4 跑馬燈廣告區
尺寸 770*29（前面已處理完畢），只需添加 marquee 元素標籤並調整 CSS 即可

![Image](https://i.imgur.com/zaCbAMh.png)

- 將原 header 標籤改為 marquee
- 除了原 CSS 屬性要求，添加 line-height 調整外觀
- 標楷體其實整個畫面都要求，可以改由 * 來指定

```html index.html
<section>
  <header class="marquee">
    <marquee>歡迎光臨校園社團介紹網，參觀後請支持社團活動並熱烈參與</marquee>
  </header>
  <main class="content">content</main>
</section>
```
```css style.css
* {
  box-sizing: border-box;
  overflow: hidden;
  font-family: "標楷體";
}

section > header.marquee {
  flex-basis: 29px;
  padding:0 calc((100% - 770px - 2px) / 2);

  font-size: 24px;
  color:#0000ff;
  line-height: 29px;
}
```

# No.5 選單區
設計 nav 區域，根據題目要求完成超連結。

![Image](https://i.imgur.com/BLXSUWm.png)

- 超連結導向到指定的 iframe 位置，屆時由 iframe 驅動畫面變化
- 使用偽類 hover 進行背景替換

```html index.html
<aside>
  <nav class="menu">
    <header>社團介紹</header>
    <a href="guitar_history.html" target="imain">吉他社</a>
    <a href="#">棒球社</a>
    <a href="#">羽球社</a>
    <a href="#">足球社</a>
    <a href="#">童軍社</a>
    <a href="#">熱舞社</a>
  </nav>
  <footer class="update">update</footer>
</aside>
```
```css style.css
nav.menu > header {
  font-weight: 500;
  font-size: 24px;
  text-decoration: underline;
  color:#f0f;
  margin: 20px 0;
}
nav.menu>a{
  display: inline-block;
  background: url('menu1.png') no-repeat;
  width: 200px;
  height:35px;
  line-height: 35px;
  color:#000;
  font-size: 16px;
}
nav.menu>a:hover{
  background: url('menu2.png');
}
```

# No.6 日期更新區
簡單的調整字體大小即可

![Image](https://i.imgur.com/HcOQgGP.png)

```html index.html
<footer class="update">最近更新日期：2020/11/13</footer>
```
```css style.css
.update{
  font-size: 16px;
}
```

# No.7 網頁內容區
這裡將開始設計主要內容同時規劃主頁面 main.html

![Image](https://i.imgur.com/TVdFmoZ.png)
![Image](https://i.imgur.com/wLBnFbO.png)

- 調整 index.html 內的 content 區，使用 iframe 做設計。因此 main.html 透過嵌入式做整合。
- 注意 iframe 需要跟前面的選單區 target 做同名
- main.html 屬於外部網頁因此 CSS 不共用，我們採用頁首樣式做該頁面之 CSS 規劃
```html index.html
<main class="content">
  <iframe src="main.html" frameborder="0" name="imain"></iframe>
</main>
```
```css style.css
.content>iframe{
  width:100%;
  height:100%;
}
```
```html main.html
<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      body {
        margin: 0;
        background: url('0101.jpg');
        text-align: center;
        font-family: '標楷體';
        font-size: 24px;
        color: #00f;
        font-weight: bold;
        font-style: italic;
      }
    </style>
  </head>

  <body>
    <img src="0104.jpg" alt="科技高中校長">
    <p>
      <br>
      嗨！歡迎加入國立科技高中。<br>
      參加社團不僅可以豐富自己的人生、寬闊自己的視野，<br>
      也能砥礪技能、磨練人際、培養第二專長。<br>
      選擇一項您喜歡的社團，積極的參與和投入，<br>
      您會獲得一陣陣的驚喜！
    </p>
  </body>

  </html>
```

# No.8 吉他社社史
同 main.html 的連動方式做設計，同樣的 CSS 設計放於頁首樣式。本檔案完成後將共同複製給 No.9 與 No.10 使用。
- 原有的超連結選單採用 flex 設計替代 table 題目需求。
- 文字檔匯入貼上後，可選取範圍後按下 <kbd>Shift+Alt+I</kbd> 於所有行內尾落多重選取（添加 br 標籤）
- 

![Image](https://i.imgur.com/PgtsUif.png)
![Image](https://i.imgur.com/WUGMAIS.png)

```html guitar_history.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      margin: 0;
      background: url('0101.jpg');
      font-family: '標楷體';
    }

    header {
      font-size: 18px;
      color: #f00;
      text-align: center;
    }

    nav {
      display: flex;
      justify-content: space-around;
    }
    p{
      color:#f00;
    }
  </style>
</head>

<body>
  <header>吉他社社史</header>
  <nav>
    <a href="index.html" target="_top">回社團介紹首頁</a>
    <a href="guitar_event.html" target="imain">吉他社近期活動公告</a>
    <a href="guitar_learning.html" target="imain">吉他社教學內容</a>
  </nav>
  <p>
    吉他社社史：<br>
    本社成立於 76 年 7 月 15 日，迄今五年有餘，<br>
    初為一群愛好吉他的同學的聚會，後由王小明提議成立吉他社，<br>
    起初成立時，也遭遇些許困難，但在眾多愛好吉他的同學共同努力下，<br>
    終於成立吉他社，提供吉他愛好者一個相互交流的園地，<br>
    王小明並被推舉為第一屆社長。<br>
    五年多來參加多次全國性比賽，履有佳績，並與其他學校的吉他社皆有密切交流，<br>
    在校內外不定時舉行吉他音樂會，皆有不錯的評價。<br>
    未來，在吉他教學上，將朝多元化教學模式發展，並建立吉他社網站，<br>
    提供更多吉他的教學，讓對吉他有興趣的朋友們，有一個更好的學習園地。<br>
    <br>
    社長資料：<br>
    姓名：王小明<br>
    出生年月日：民國 73 年 10 月 8 日生<br>
    身高：172 公分<br>
    體重：60 公斤<br>
    星座：天秤座<br>
    興趣：詩詞，音樂（特別是吉他）<br>
    經歷：多次參予吉他演奏比賽（民歌比賽）多獲好評<br>
    <br>
    指導老師資料：<br>
    姓名：陳小英<br>
    出生年月日：民國 57 年 10 月 22 日<br>
    身高：168 公分<br>
    體重：50 公斤<br>
    星座：天秤座<br>
    興趣：古典吉他<br>
    經歷：民歌餐廳駐唱歌手 7 年、詞曲創作、吉他教學 5 年。<br>
  </p>
</body>

</html>
```

# No.9 吉他社近期活動公告
從 No.8 複製貼來使用命名為 `guitar_event.html`，根據題目要求塞入指定文字並設定相關錨點連結。
- 注意這裡都使用頁首樣式來設計（試不依賴 style 行內樣式來設計）
- 內容區我們使用 section 標籤，方便 CSS 屬性的指定，並搭配 flex-basis 比例替代表格之 5*2 需求。
- 最後一段需注意高度方便 TOP 效果明顯。

![Image](https://i.imgur.com/LfF53qk.png)
![Image](https://i.imgur.com/w3sJ636.png)

```html guitar_event.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      margin: 0;
      background: url('0101.jpg');
      font-family: '標楷體';
    }

    header {
      font-size: 18px;
      color: #f00;
      text-align: center;
    }

    nav {
      display: flex;
      justify-content: space-around;
    }

    nav.goto {
      margin-top: 1rem;
    }

    section {
      display: flex;
      flex-wrap: wrap;
      font-size: 16px;
    }

    section>p {
      flex-basis: 100%;
      color: #800000;
    }

    section>div {
      flex-basis: 80%;
    }

    section>a {
      flex-basis: 20%;
    }

    section>div:nth-of-type(1) {
      color: #0000ff;
    }

    section>div:nth-of-type(2) {
      color: #ff0000;
    }

    section>div:nth-of-type(3) {
      color: #00ff00;
    }

    section>div:nth-of-type(4) {
      color: #000000;
      min-height: 100vh;
    }
  </style>
</head>

<body>
  <header>吉他社近期活動公告</header>
  <nav>
    <a href="index.html" target="_top">回社團介紹首頁</a>
    <a href="guitar_history.html" target="imain">吉他社社史</a>
    <a href="guitar_learning.html" target="imain">吉他社教學內容</a>
  </nav>
  <nav class="goto">
    <!-- a[href=event$]*4 -->
    <a href="#event1">九月十六日</a>
    <a href="#event2">十月三十一日</a>
    <a href="#event3">十二月二十五日</a>
    <a href="#event4">元月一日</a>
  </nav>
  <section>
    <p>近期活動</p>
    <div id="event1">
      日期：九月十六日<br>
      活動主題：社員大會<br>
      地點：吉他社教室<br>
      主持人：王小明<br>
      活動內容：<br>
      1. 入社歡迎茶會<br>
      2. 指導老師致詞<br>
      3. 社長致詞<br>
      4. 社規介紹以及教學內容之簡介<br>
    </div>
    <a href="#">TOP</a>
    <div id="event2">
      日期：十月三十一日<br>
      活動主題：校內吉他表演<br>
      地點：學校大禮堂<br>
      領隊：王小明社長<br>
      表演內容：以吉他演奏演唱民歌，曲目如下<br>
      1. 海浬來的沙<br>
      2. 微風往事<br>
      3. 七月涼山<br>
      4. 明天會更好（大合唱）<br>
    </div>
    <a href="#">TOP</a>
    <div id="event3">
      日期：十二月二十五日<br>
      活動主題：校內吉他比賽<br>
      地點：學校大禮堂<br>
      主辦單位：教務處<br>
      吉他比賽規則：<br>
      1. 凡我玉山高中之學生<br>
      2. 參賽內容可為民歌演唱以及任何純吉他演奏方式如：古典吉他、爵士吉他演奏<br>
      3. 參賽者必須自備樂器<br>
    </div>
    <a href="#">TOP</a>
    <div id="event4">
      日期：元月一日<br>
      活動主題：全國吉他（高中組）演奏比賽<br>
      地點：台北市社教館<br>
      主辦單位：教育部<br>
      比賽規則：<br>
      1. 由學校推舉優秀同學參予<br>
      2. 除推舉參加外，其餘有興趣參賽的同學，請自行報名參加<br>
      3. 參賽規則請參考比賽細則<br>
    </div>
    <a href="#">TOP</a>
  </section>
</body>

</html>
```

# No.10 吉他社教學內容
從 No.8 複製貼來使用命名為 `guitar_learning.html`，根據題目要求塞入指定文字並設定按鈕外觀。
- 內容區我們使用 section 標籤，方便設定為 flexbox。
- 將 section>div 設計成按鈕外觀。

![Image](https://i.imgur.com/F7kL2We.png)

```html guitar_learning.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      margin: 0;
      background: url('0101.jpg');
      font-family: '標楷體';
    }

    header {
      font-size: 18px;
      color: #f00;
      text-align: center;
    }

    nav {
      display: flex;
      justify-content: space-around;
    }

    section{
      display: flex;
      flex-direction: column;
      height:calc(100vh - 22px - 19px);
      width: 200px;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
    }
    section>div{
      padding:15px 20px;
      background: yellow;
      width: 100%;
      text-align: center;
      cursor: pointer;
      border-radius: 10px;
    }
    section>div:hover{
      background: chocolate;
    }
  </style>
</head>

<body>
  <header>吉他社社史</header>
  <nav>
    <a href="index.html" target="_top">回社團介紹首頁</a>
    <a href="guitar_history.html" target="imain">吉他社社史」</a>
    <a href="guitar_event.html" target="imain">吉他社近期活動公告</a>
  </nav>
  <section>
    <div>基礎樂理</div>
    <div>常用之吉他技巧</div>
    <div>音程介紹以及音程表內容</div>
    <div>節奏型態</div>
    <div>和絃及級數和絃</div>
    <div>和絃公式</div>
    <div>轉位複合</div>
    <div>調音法</div>
    <div>吉他的保養</div>
    <div>如何轉調</div>
  </section>
</body>

</html>
```

# No.11 頁尾版權區
這裡簡單的將指定文字塞入，添加幾個 CSS 屬性即可。

![Image](https://i.imgur.com/ueB28Uo.png)

```html index.html
<footer class="footer">網頁設計及維護：00 江佰瑾</footer>
```
```css style.css
footer.footer {
  flex-basis: 1000px;
  height: 20px;
  color:#000;
  font-size: 16px;
}
```