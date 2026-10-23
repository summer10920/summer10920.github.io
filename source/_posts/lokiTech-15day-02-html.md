---
title: "HTML 基本教學：文件結構與常用標籤"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:01:00
---

![HTML5](assets/images/banner/html5.png)

HTML 用元素描述結構與內容：它不算數、不處理點擊邏輯，也不決定顏色與間距。瀏覽器讀到標籤，就把每一塊畫成盒子，再依標籤的名字決定這塊是標題、段落、連結還是表單欄位。

<!-- more -->

這門課每一篇都從第 01 天 fork 的練習專案裡的檔案開始。HTML 與 CSS 這個階段，練習站是左側選單加上 iframe 的頁面，點選單就換右邊的主題頁。這樣排只是方便你快速對照標籤，屬於暫時的課堂設計。正式網站不會這樣組頁。

{% note info %}
**為什麼正式網站不這樣做**
這套「選單換 iframe」只是為了上課方便對照，放到正式網站會在幾個地方吃虧：

- **搜尋引擎優化（SEO）**：搜尋引擎看的是「一個網址對應一份可索引的內容」。點選單時網址不會變，每個主題都沒有自己的網址，外站也沒辦法直接連到某一頁。iframe 裡的標題與主文，搜尋引擎常當成次要內容，甚至讀不完整。
- **響應式網頁設計（RWD）**：同一份版面要能適應手機、平板和桌機。左欄選單加上整頁 iframe，在手機上很容易變成外層一個捲軸、框裡又一個捲軸，選單和內容也很難一起重排。後面要學的媒體查詢、Flex 與 Grid，都是作用在同一份文件的盒子上。
- **無障礙與瀏覽體驗**：螢幕閱讀器等輔助工具要多進一層文件才讀得到內容，比同一頁的頁首與主文難理解。上一頁與書籤也對不到你以為的「子頁」，焦點、縮放和列印同樣常出問題。

正式網站會用語意標籤把整頁結構寫在同一份 HTML 裡；需要多頁時，每頁都是完整的文件，共用的版型之後再交給 CSS 或元件處理。iframe 適合用在嵌入地圖、影片、金流付款這類真正的外部內容，不要拿來當整站選單，專題與之後的正式頁也不要複製這套做法。
{% endnote %}

# 認識 HTML 文件

每一份網頁都是一份 HTML 文件：瀏覽器先讀骨架，才知道分頁標題、中文編碼，以及畫面要畫出哪些字。練習頁是 `pages/01-shell.html`。在 VS Code 新增 HTML 檔，輸入 `!` 再按 <kbd>Tab</kbd>，會展開這份骨架，第 01 天的 Emmet 已經用過這個縮寫。

## 文件宣告與 html

瀏覽器讀檔時最先看的是文件類型，以及包住整頁的根元素上的語言；這兩行不會變成畫面上的句子。你改的是提示，所以畫面裡的中文不會因此被翻譯成別的語言。

**觀念**

文件類型宣告放在第一行，瀏覽器就用現在的標準模式來排這一頁。根元素包住後面整份文件，語言代碼寫 `zh-Hant`，表示繁體中文。用驚嘆號展開的新檔，語言常常是 en、標題常常是 Document，改成跟練習頁一樣即可。

```html 02-html/pages/01-shell.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>洛奇旅行</title>
  </head>
  <body>
    <!-- 文件宣告與 html 的語言不會出現在這句話裡 -->
    <div>洛奇旅行的練習頁。這一行才出現在畫面裡。</div>
  </body>
</html>
```

**解析**

- 打開練習頁，畫面只有一句「洛奇旅行的練習頁。這一行才出現在畫面裡。」分頁標籤上另有「洛奇旅行」，那幾個字不在這句裡面。
- 文件第一行和語言代碼在畫面上沒有對應的句子，按 <kbd>F12</kbd> 展開最外層才看得到。

```html
<!DOCTYPE html>       <!-- 文件類型：用標準模式讀這份文件 -->
<html lang="zh-Hant"> <!-- 根元素，語言是繁體中文 -->
```

{% note success %}
**換你試試：**
把根元素的語言改成 `en`，存檔後重新整理。看畫面那一句中文還在不在，再看分頁標籤有沒有被翻譯。看完把語言改回 `zh-Hant`。
{% endnote %}

<details>
<summary>參考答案</summary>

語言改成 en 之後，畫面仍是原來那句中文，分頁標籤也還是「洛奇旅行」。語言代碼只告訴瀏覽器這份文件用哪一種語言來讀，不會當場翻譯。看完請改回 zh-Hant，後面的練習沿用繁體中文。

```html 02-html/pages/01-shell.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>洛奇旅行</title>
  </head>
  <body>
    <!-- lang 改成 en，這句中文仍會留在畫面上 -->
    <div>洛奇旅行的練習頁。這一行才出現在畫面裡。</div>
  </body>
</html>
```

</details>

## head：給瀏覽器看的資訊

head 這一區給瀏覽器、分頁標籤和搜尋引擎讀，字不會出現在頁面正文。你會先碰到字元編碼、手機用的寬度，以及分頁標籤上的標題。三項都放在這一區，用 <kbd>F12</kbd> 才看得到標記。

**觀念**

- 字元編碼寫 UTF-8，中文才不會變成亂碼。
- viewport 告訴手機依裝置寬度排版，不要把桌機整頁縮小硬塞進螢幕。
- title 的文字出現在分頁標籤。搜尋結果也常拿它當那一列的標題。
- 這三項都在 head。頁面正文裡看不到它們。

```html 02-html/pages/01-shell.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <!-- 中文用的字元編碼 -->
    <meta charset="UTF-8" />
    <!-- 手機依裝置寬度排，initial-scale=1 表示不要先被縮小 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 這幾個字出現在分頁標籤，不會畫在 body 裡 -->
    <title>洛奇旅行</title>
  </head>
  <body>
    <div>洛奇旅行的練習頁。這一行才出現在畫面裡。</div>
  </body>
</html>
```

**解析**

- 畫面還是那一句練習頁的話，沒有多出編碼名稱，也沒有多出手機寬度的設定。
- 分頁標籤顯示「洛奇旅行」。
- 按 <kbd>F12</kbd> 展開 head，才看得到那三行。
- 它們都沒有被畫在句子旁邊。

```html
<meta charset="UTF-8" />   <!-- 字元編碼 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>洛奇旅行</title>     <!-- 只出現在分頁標籤 -->
```

{% note success %}
**換你試試：**
把 title 改成「京都三日」，存檔後看分頁標籤。畫面那一句維持「洛奇旅行的練習頁」，不要為了改標籤去改 body 裡的字。
{% endnote %}

<details>
<summary>參考答案</summary>

分頁標籤變成「京都三日」，畫面仍是原來那一句練習頁的話。標題寫在 head，所以只換標籤上的字，正文要另外改。

```html 02-html/pages/01-shell.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日</title>
  </head>
  <body>
    <div>洛奇旅行的練習頁。這一行才出現在畫面裡。</div>
  </body>
</html>
```

</details>

## body：畫面上看到的內容

body 裡的內容才會畫在畫面上。這一章還沒有標題和段落，先用純文字或一顆 div 放看得到的字；head 裡的標題改了，畫面這一段也不會跟著變。

**觀念**

純文字直接寫在 body 裡就會顯示；用 div 包住時，這一句自己佔一行，但它只是一顆還沒有角色的盒子，下一章再談怎麼佔位置。標題和段落標籤下一章之後才用。

```html 02-html/pages/01-shell.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>洛奇旅行</title>
  </head>
  <body>
    <!-- 從這裡開始才是畫面上看得到的內容 -->
    <div>洛奇旅行的練習頁。這一行才出現在畫面裡。</div>
    <div>分頁標籤上的字不會自動出現在這裡。</div>
  </body>
</html>
```

**解析**

- 畫面上變成兩行，第二行從新的一行開始。
- 分頁標籤仍是「洛奇旅行」，不會變成這兩句的其中一句。
- head 那一區在畫面上仍然沒有自己的段落。

```html
<body>
  <!-- 只有包在 body 裡的內容會畫出來 -->
  <div>這一行出現在畫面上。</div>
</body>
```

{% note success %}
**換你試試：**
在這兩行下面再加一個 div，寫「當日穿的衣服不托運。」它應該出現在畫面最下面。不要把這句寫進 title。
{% endnote %}

<details>
<summary>參考答案</summary>

第三句用 div 包住，所以自己佔一行，接在前兩行下面。分頁標籤仍是「洛奇旅行」，這句話只出現在畫面上。

```html 02-html/pages/01-shell.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>洛奇旅行</title>
  </head>
  <body>
    <div>洛奇旅行的練習頁。這一行才出現在畫面裡。</div>
    <div>分頁標籤上的字不會自動出現在這裡。</div>
    <div>當日穿的衣服不托運。</div>
  </body>
</html>
```

</details>

# 認識區塊盒

瀏覽器把每個元素畫成一顆盒子。這一章先看盒子怎麼佔位置，再看有名字的語意標籤怎麼把同一種版面說清楚。後面的 CSS 也是選這些盒子，所以先把邊界看準。

## 區塊與行內

盒子可以再裝盒子：外層決定這一區佔畫面哪一塊，內層才放內容。這一節看兩種預設排法，一種跟文字走，一種自己佔一行；框線只為了讓邊界露出來。

**觀念**

元素依預設怎麼排，大致分成兩類。

- **區塊元素（block）**：獨佔一行，前後會換行，預設盡量撐滿父層的寬度。可以設寬度與高度，上下左右的外距都算得準。標題、段落、清單、表格、表單，以及下一節的頁首、主文，預設都是這一類。
- **行內元素（inline）**：跟前後文字排在同一行，寬度跟著內容走。高度多半跟文字一起走，上下外距常常不如預期，左右外距則比較明顯。用來在句子裡包一小段字。

這兩顆沒有名字的盒子只負責包一層：要獨佔一行用區塊盒，要跟文字排在同一行用行內盒。頁首和主文請用下一節的語意標籤，不要整頁堆沒有名字的盒子。

圖片和輸入欄是**置換元素**：畫面上看到的不是標籤中間的字，而是來源或類型決定的內容。它們不會自己獨佔一行，但也不要當成普通的行內字。按 <kbd>F12</kbd> 選到該元素，看 **Computed → display** 即可。

```html 02-html/pages/02-box.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行李怎麼分箱</title>
  </head>
  <body>
    <!-- style="border: 1px solid" 只是暫時畫出框線，看清楚盒子邊界；CSS 在 03 才會教 -->
    <div style="border: 1px solid">行李怎麼分箱</div>

    <!-- div 是區塊盒：自己佔一行，寬度撐滿 -->
    <div style="border: 1px solid">
      護照請放在
      <!-- span 是行內盒：跟前後文字待在同一行，只包住這三個字 -->
      <span style="border: 1px solid">隨身包</span>
      ，不要放進行李箱。
    </div>
    <div style="border: 1px solid">
      兩樣都要帶：
      <span style="border: 1px solid">充電器</span>
      <span style="border: 1px solid">轉接頭</span>
      ，它們會緊挨著排在同一行。
    </div>

    <!-- 盒子可以再裝盒子：外層 div 是托運箱，內層 div 是箱子裡的隔層 -->
    <div style="border: 1px solid">
      這一箱是托運行李。
      <div style="border: 1px solid">箱子裡再隔一層，放易碎的茶葉罐。</div>
    </div>
    <div style="border: 1px solid">另一箱手提行李，一定從新的一行開始。</div>
  </body>
</html>
```

**解析**

- 畫面上每一塊都有一圈框線，那是 `style` 暫時畫的，只為了看出盒子的邊界。
- 最上面的「行李怎麼分箱」是一個 div，框線拉滿整個寬度，自己佔一行。
- 接著兩個 div 各自佔一行。
- 第一個裡只有「隨身包」三個字被小框包住，小框和前後的句子連在同一行，這就是 span。
- 第二個裡的「充電器」和「轉接頭」各有一個小框，兩個 span 並排在同一行，中間只隔一個空白。
- 最後是托運箱：外層 div 裡先有一句話，下面還有一個更小的框寫著茶葉罐，表示盒子裡可以再放盒子。
- 手提行李那個 div 不會黏在托運箱後面，而是從新的一行開始。

```html
<div>自己佔一行</div>                  <!-- div：區塊盒 -->
<div>句子裡的 <span>一小段字</span></div> <!-- span：行內盒，留在同一行 -->
```

{% note success %}
**換你試試：**
在「轉接頭」那一段後面加一段：液體以「100 毫升」為限，超過要托運。只給「100 毫升」加框。再在手提行李那一塊下面加一顆新的區塊盒，寫「當日穿的衣服不托運。」
{% endnote %}

<details>
<summary>參考答案</summary>

「100 毫升」用 span 包住，才會留在「液體以……為限」這句中間；整句外面用 div，讓它自己佔一行。「當日穿的衣服不托運。」也用 div，才會從手提行李的下一行開始，不會黏到上一句的尾巴。

```html 02-html/pages/02-box.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行李怎麼分箱</title>
  </head>
  <body>
    <div style="border: 1px solid">行李怎麼分箱</div>

    <div style="border: 1px solid">
      護照請放在
      <span style="border: 1px solid">隨身包</span>
      ，不要放進行李箱。
    </div>
    <div style="border: 1px solid">
      兩樣都要帶：
      <span style="border: 1px solid">充電器</span>
      <span style="border: 1px solid">轉接頭</span>
      ，它們會緊挨著排在同一行。
    </div>
    <div style="border: 1px solid">
      液體以
      <span style="border: 1px solid">100 毫升</span>
      為限，超過要托運。
    </div>

    <div style="border: 1px solid">
      這一箱是托運行李。
      <div style="border: 1px solid">箱子裡再隔一層，放易碎的茶葉罐。</div>
    </div>
    <div style="border: 1px solid">另一箱手提行李，一定從新的一行開始。</div>
    <div style="border: 1px solid">當日穿的衣服不托運。</div>
  </body>
</html>
```

</details>

## 語意標籤

HTML5 的語意標籤仍然是盒子，只是標籤名直接說明這一區是什麼，搜尋引擎比較好懂、輔助工具比較好讀，之後改版也比較知道要動哪一塊。這一頁選單裡先放文字項目，可點的連結在後面的連結那一節。

**觀念**

左右可以排成同一種版面。差在一邊全是沒有角色的盒子，另一邊每塊都有名字。

![左側整頁都是灰色 div 盒子；右側同樣版面改用 header、nav、main、section、aside、footer 上色區分](assets/images/html-boxes-semantic.png)

- **header**：頁首。招牌、網站名稱、整頁選單通常放這裡。
- **nav**：導覽這一區。它告訴瀏覽器「這裡是選單」。
- **main**：本頁主內容。一份文件通常只有一個。
- **section**：有標題的主題區塊，用來把主文分成幾段主題。
- **article**：可以獨立成篇的內容。抽出去仍看得出是一篇完整的內容。同一頁可以有多篇。
- **aside**：側欄補充，例如注意事項，不是這篇主文本身。
- **footer**：頁尾。版權、聯絡通常放這裡。

頁首和頁尾也可以出現在某一篇 `article` 裡面，表示這篇文章自己的頁首與頁尾。這一頁先認得 `body` 底下那一層。

```html 02-html/pages/03-layout.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>洛奇旅行</title>
  </head>
  <body>
    <header>
      <p>洛奇旅行 · 小團報名</p>
      <nav>
        <p>這一區是導覽。</p>
        <ul>
          <li>首頁</li>
          <li>行程</li>
          <li>報名</li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>本週可以報名的小團</h1>
      <section>
        <h2>本週小團</h2>
        <article>
          <h3>京都三日</h3>
          <p>清水寺、伏見稻荷與嵐山。含兩晚住宿，週六早上台北車站集合。</p>
        </article>
        <article>
          <h3>大阪美食</h3>
          <p>道頓堀與黑門市場，傍晚安排一趟在地小吃。同一頁可以有多篇行程。</p>
        </article>
      </section>
      <section>
        <h2>報名前先看</h2>
        <aside>
          <p>護照效期要超過回國日六個月。集合時間請看行前信，不要自己改集合點。</p>
        </aside>
      </section>
    </main>
    <footer>
      <p>© 2026 洛奇旅行 · hello@example.com · 教材用</p>
    </footer>
  </body>
</html>
```

**解析**

- 畫面由上到下是頁首、三個文字項目、一個大標、兩篇各自有小標和一段介紹的內容、一段側欄，最後是頁尾。
- 側欄不夾在那兩篇裡面。
- 按 <kbd>F12</kbd> 點 `body`，下面並列的是頁首、主文、頁尾。
- 主文裡是兩個主題區。
- 第一個主題區裡是兩篇 `article`。
- 選單的項目還不是連結，點了不會換頁。

{% mermaid graph TD %}
bodyNode["body"] --> headerNode["header"]
bodyNode --> mainNode["main"]
bodyNode --> footerNode["footer"]
headerNode --> navNode["nav"]
mainNode --> s1["section 本週小團"]
mainNode --> s2["section 報名前先看"]
s1 --> a1["article 京都"]
s1 --> a2["article 大阪"]
s2 --> asideNode["aside"]
{% endmermaid %}

{% note success %}
**換你試試：**
在現有兩篇後面再加一篇，小標寫「台南古蹟半日」，寫明含午餐、不含交通。頁尾再補一句「客服週一公休」。新的一篇要跟前兩篇同一層。
{% endnote %}

<details>
<summary>參考答案</summary>

第三篇仍放在第一個主題區裡，跟前兩篇一樣可以獨立閱讀，所以用 `article`。公休是整頁的資訊，寫在頁尾，不放進其中一篇。

```html 02-html/pages/03-layout.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>洛奇旅行</title>
  </head>
  <body>
    <header>
      <p>洛奇旅行 · 小團報名</p>
      <nav>
        <p>這一區是導覽。</p>
        <ul>
          <li>首頁</li>
          <li>行程</li>
          <li>報名</li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>本週可以報名的小團</h1>
      <section>
        <h2>本週小團</h2>
        <article>
          <h3>京都三日</h3>
          <p>清水寺、伏見稻荷與嵐山。含兩晚住宿，週六早上台北車站集合。</p>
        </article>
        <article>
          <h3>大阪美食</h3>
          <p>道頓堀與黑門市場，傍晚安排一趟在地小吃。同一頁可以有多篇行程。</p>
        </article>
        <article>
          <h3>台南古蹟半日</h3>
          <p>含午餐、不含交通。赤崁樓與孔廟，下午在國華街解散。</p>
        </article>
      </section>
      <section>
        <h2>報名前先看</h2>
        <aside>
          <p>護照效期要超過回國日六個月。集合時間請看行前信，不要自己改集合點。</p>
        </aside>
      </section>
    </main>
    <footer>
      <p>© 2026 洛奇旅行 · hello@example.com · 教材用</p>
      <p>客服週一公休。</p>
    </footer>
  </body>
</html>
```

</details>

# 認識常用元素

認完盒子之後，依類型看常用元素。元素由標籤組成：開始標籤與結束標籤把中間的文字包起來，這段文字就是畫面上的內容。開始標籤上的屬性寫成「名字="值"」，用來給這顆元素一項功能，例如連結要去哪、圖片從哪裡來。

沒有結束標籤的空元素沒有中間那段文字，功能幾乎全靠屬性。換行、圖片、輸入欄都是這種。

{% blockquote MDN https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element %}
想確認某個標籤時，搜尋後到 MDN 看官方說明。
{% endblockquote %}

## 標題與段落

標題排出這一頁的層級，段落承載正文。練習頁仍是 `pages/04-headings.html`，下面依知識點拆開看：先排六層標題，再談段落怎麼分段，最後才是同一段裡的換行和主題之間的分隔線。可點的連結在下一節。

### 標題標籤（h1～h6）

標題共六層，從主標題往下是章、節、再更細的一層。這一節只看層級本身：字變小是瀏覽器的預設，不是你跳級的理由。

**觀念**

主標題建議只用一個，因為瀏覽器會依層級調整字級、粗細和行距，輔助工具也用這棵樹做目錄。想讓字變小就之後用 CSS，不要為了外觀跳過中間那一層。

分頁標題寫在文件開頭，出現在分頁與書籤，不會畫在頁面正文上；畫面上的大標才是主標題。兩者可以相關，不必逐字相同。

```html 02-html/pages/04-headings.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 分頁上的字。正文的大標是下面的 h1 -->
    <title>京都三日遊 · 行前</title>
  </head>
  <body>
    <h1>京都三日遊</h1>
    <h2>第一天：抵達與清水寺</h2>
    <h3>集合</h3>
    <h4>雨天</h4>
    <h5>備用集合點</h5>
    <h6>工作人員手機</h6>
    <h2>費用包含</h2>
  </body>
</html>
```

**解析**

- 分頁標籤寫的是「京都三日遊 · 行前」，頁面最上面的大字則是「京都三日遊」。
- 兩者不是同一顆標籤。
- 「第一天」比大標小。
- 「集合」「雨天」「備用集合點」「工作人員手機」一級比一級小，而且每一級都接在上一級後面，沒有從章標題直接跳到最細的那層。
- 「費用包含」回到章標題那一級，跟「第一天」並列。

```html
<!-- title 在 head；畫面上的大標是 h1 -->
<!-- h3 到 h6 依序接在「第一天」下面，不要跳級 -->
```

{% note success %}
**換你試試：**
在「費用包含」下面加一層小節「不含項目」。這一層要接在該章標題的下一級，不要跳到更細的標題。
{% endnote %}

<details>
<summary>參考答案</summary>

「費用包含」已經是章標題，它的下一級才是小節。跳到更細的標題，目錄會少掉中間那一層，字也會突然變得很小。

```html 02-html/pages/04-headings.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日遊 · 行前</title>
  </head>
  <body>
    <h1>京都三日遊</h1>
    <h2>第一天：抵達與清水寺</h2>
    <h3>集合</h3>
    <h4>雨天</h4>
    <h5>備用集合點</h5>
    <h6>工作人員手機</h6>
    <h2>費用包含</h2>
    <h3>不含項目</h3>
  </body>
</html>
```

</details>

### 段落標籤（p）

正文用段落，把網頁當成一份文件，一段只放一個意思。視窗變窄時，段落裡的文字會自己換行，不必你先替它斷行。

**觀念**

瀏覽器會在段與段之間留空隙，所以不要用一堆換行去排出看起來整齊的行，那是文字軟體的排法。段落裡面也不要再放標題，否則層級會亂掉；標題和段落是前後相接的兄弟。

```html 02-html/pages/04-headings.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日遊 · 行前</title>
  </head>
  <body>
    <h1>京都三日遊</h1>
    <p>這一頁是行前說明。大標只用一個，下面依行程層級往下排。</p>
    <h2>費用包含</h2>
    <p>兩晚住宿、早餐、清水寺與伏見稻荷的導覽。</p>
    <p>機場到市區的交通請自己買票。視窗變窄時，這一段會自己換行。</p>
  </body>
</html>
```

**解析**

- 大標下面先空出一段說明，再進入「費用包含」。
- 這個章標題底下有兩段，中間有空隙，不是同一段被你按斷的兩行。
- 把視窗拉窄，第二段的句子會在段落寬度裡折行，段與段的空隙還在。

```html
<!-- 一段一個 p；換行是瀏覽器依寬度折的 -->
<!-- h2 與前後的 p 同層，不要把標題塞進段落 -->
```

{% note success %}
**換你試試：**
在兩段費用說明後面再加一段：「不含機票、午餐、個人購物。」仍是這個章標題底下的正文，不要為了它多加一層標題。
{% endnote %}

<details>
<summary>參考答案</summary>

這句是費用說明的下一段，所以再寫一個段落即可。小節標題留到上一節的練習，這一題只確認「一件事一段」。

```html 02-html/pages/04-headings.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日遊 · 行前</title>
  </head>
  <body>
    <h1>京都三日遊</h1>
    <p>這一頁是行前說明。大標只用一個，下面依行程層級往下排。</p>
    <h2>費用包含</h2>
    <p>兩晚住宿、早餐、清水寺與伏見稻荷的導覽。</p>
    <p>機場到市區的交通請自己買票。視窗變窄時，這一段會自己換行。</p>
    <p>不含機票、午餐、個人購物。</p>
  </body>
</html>
```

</details>

### 換行與分隔

同一段裡必須斷行，或兩個主題要在視覺上切開時，才用這一節的兩顆空元素。它們沒有結束標籤，也沒有中間那段文字。

**觀念**

- **br**：換行之後仍屬同一段。開發者工具裡，兩行還在同一個段落。
- **hr**：一條水平線，用來隔開主題。線本身不是一段文字，也不要拿它假裝分段。

{% note warning %}
**不要用 marquee**
跑馬燈曾被瀏覽器支援，但現代網頁視為過時。要捲動效果，之後用 CSS。
{% endnote %}

```html 02-html/pages/04-headings.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日遊 · 行前</title>
  </head>
  <body>
    <h1>京都三日遊</h1>
    <h2>第一天：抵達與清水寺</h2>
    <h3>集合</h3>
    <p>
      京都車站中央口，下午兩點，領隊舉「洛奇旅行」牌子。
      <br />
      雨天改在京都車站中央口室內集合。
    </p>
    <hr />
    <h2>費用包含</h2>
    <p>兩晚住宿、早餐、清水寺與伏見稻荷的導覽。</p>
  </body>
</html>
```

**解析**

- 有換行的那一段在畫面上變成兩行，第二行是換行後面的那句。
- 在開發者工具裡，這兩行仍在同一個段落裡，中間是換行。
- 水平線下面才是另一個章。
- 線的前後是兩個主題。

```html
<!-- br 在 p 裡面，斷的是同一段 -->
<!-- hr 與前後的 h2 同層，用來隔開主題 -->
```

{% note success %}
**換你試試：**
在雨天那一行後面再斷一次，下一行寫「遲到請先打電話，不要自己先走。」這一行仍要留在同一個段落裡。
{% endnote %}

<details>
<summary>參考答案</summary>

多一次換行，三段文字還是同一個段落的內容。若改成三個段落，段與段之間會多出空隙，就不是同一段了。

```html 02-html/pages/04-headings.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日遊 · 行前</title>
  </head>
  <body>
    <h1>京都三日遊</h1>
    <h2>第一天：抵達與清水寺</h2>
    <h3>集合</h3>
    <p>
      京都車站中央口，下午兩點，領隊舉「洛奇旅行」牌子。
      <br />
      雨天改在京都車站中央口室內集合。
      <br />
      遲到請先打電話，不要自己先走。
    </p>
    <hr />
    <h2>費用包含</h2>
    <p>兩晚住宿、早餐、清水寺與伏見稻荷的導覽。</p>
  </body>
</html>
```

</details>

## 連結

可點的文字用連結元素，要去的地方寫在屬性裡；沒有這個屬性，畫面上即使有底線，也不是真正的連結。練習頁是 `pages/05-links.html`，先看目的地有哪幾種、開在哪裡，再看路徑從哪裡數。

### 目的地與開啟方式

連結中間的文字要看得出目的地，不要只寫「點這裡」。這一節把站內頁、頁內錨點、外站、信箱和電話放在同一頁。

**觀念**

目的地可以是另一份檔案、同一個頁面上的錨點、信箱或電話。同一頁的某一段用井字號加上對方的 id，這個名字寫在要停住的那個元素上；信箱在位址前面加 `mailto:`，電話加 `tel:`。

沒寫開啟方式時，連結在目前這份文件裡換頁或捲動。要開新分頁就寫 `_blank`；外連若要開新分頁，再加上 `rel="noreferrer"`。

課堂選單能換右邊那一欄，是因為連結的開啟方式寫成某個 iframe 的 name。這一頁的練習連結不指定開在哪裡，所以會在這一欄裡面行動。

```html 02-html/pages/05-links.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>集合地點與相關連結</title>
  </head>
  <body>
    <h1 id="top">集合地點與相關連結</h1>
    <p>下面幾顆連結分別去站內頁、本頁下半、外站、信箱和電話。文字本身要看得出目的地。</p>
    <p><a href="04-headings.html">看行前標題那一頁</a></p>
    <p><a href="#gather">跳到本頁的集合說明</a></p>
    <p>
      <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a" target="_blank" rel="noreferrer">
        開新分頁看 MDN 的連結說明
      </a>
    </p>
    <p><a href="mailto:hello@example.com">寫信給洛奇旅行</a></p>
    <p><a href="tel:+886212345678">打電話給客服 02-1234-5678</a></p>
    <section id="gather">
      <h2>京都車站中央口</h2>
      <p>領隊會在中央口的時鐘下方舉牌。請看牌子上的團名「京都三日」，不要跟隔壁的購物團。</p>
      <p>建議提前二十分鐘到。車站裡有兩座時鐘，請認銀色、面對八條口的那一座。</p>
      <p>遲到超過十五分鐘，隊伍會先移動到月台。請改撥頁面上的客服電話，不要自己叫車去清水寺。</p>
      <p>回程同樣在這個出口解散。護照請放在隨身包，這一點跟行李那一頁的分法相同。</p>
    </section>
  </body>
</html>
```

**解析**

- 頁首有五顆連結。
- 指向同一資料夾裡的檔案、而且沒有指定新分頁的那顆，會在目前這份文件裡換頁。
- 井字號那顆不會換檔，畫面捲到對應 id 的標題。
- 那一區寫了四段，頁面比視窗高，捲動才看得出來。
- MDN 那一顆會開新分頁。
- 信箱那一顆會交給電腦上的郵件程式。
- 電話那一顆在手機上會進撥號畫面，在桌機上多半沒有反應，這是裝置的差別，標籤本身沒有寫錯。

```html
<!-- href="#gather" 對上 id="gather" -->
<!-- target="_blank" 開新分頁；rel="noreferrer" 不把目前網址帶給對方 -->
```

{% note success %}
**換你試試：**
在五顆連結上面加一顆「回到頁首」，連到這頁大標的 id。外連那顆保持開新分頁。
{% endnote %}

<details>
<summary>參考答案</summary>

回到頁首用的是這頁已經寫在大標上的 id，井字號後面的名字要完全相同。外連原本就有新分頁，這一題不用拿掉。

```html 02-html/pages/05-links.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>集合地點與相關連結</title>
  </head>
  <body>
    <h1 id="top">集合地點與相關連結</h1>
    <p>下面幾顆連結分別去站內頁、本頁下半、外站、信箱和電話。文字本身要看得出目的地。</p>
    <p><a href="#top">回到頁首</a></p>
    <p><a href="04-headings.html">看行前標題那一頁</a></p>
    <p><a href="#gather">跳到本頁的集合說明</a></p>
    <p>
      <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a" target="_blank" rel="noreferrer">
        開新分頁看 MDN 的連結說明
      </a>
    </p>
    <p><a href="mailto:hello@example.com">寫信給洛奇旅行</a></p>
    <p><a href="tel:+886212345678">打電話給客服 02-1234-5678</a></p>
    <section id="gather">
      <h2>京都車站中央口</h2>
      <p>領隊會在中央口的時鐘下方舉牌。請看牌子上的團名「京都三日」，不要跟隔壁的購物團。</p>
      <p>建議提前二十分鐘到。車站裡有兩座時鐘，請認銀色、面對八條口的那一座。</p>
      <p>遲到超過十五分鐘，隊伍會先移動到月台。請改撥頁面上的客服電話，不要自己叫車去清水寺。</p>
      <p>回程同樣在這個出口解散。護照請放在隨身包，這一點跟行李那一頁的分法相同。</p>
    </section>
  </body>
</html>
```

</details>

### 絕對路徑與相對路徑

路徑有兩種算法：站內檔從目前這份 HTML 所在的資料夾數，外站則寫完整網址。圖片和連結用的是同一套算法。

**觀念**

- **絕對路徑**：從某個固定起點算。外站就是完整的 https 網址。自己的站也可以寫完整網址，但網域一改就要全部改。
- **相對路徑**：從目前檔案的位置算。同一層只寫檔名。進子資料夾就在前面加資料夾名稱。`../` 是回到上一層。

以斜線開頭的路徑從網站根目錄算，但本機直接開檔和透過伺服器開檔，起點可能不同，所以課堂的站內連結用相對路徑。

{% note info %}
**為什麼入口常叫 index.html**
網頁伺服器收到「只要這個資料夾、網址沒寫檔名」的請求時，通常會回傳 `index.html`。所以一個資料夾的入口習慣用這個檔名。
{% endnote %}

```html 02-html/pages/05-links.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>路徑怎麼數</title>
  </head>
  <body>
    <h1>路徑怎麼數</h1>
    <p>練習頁放在 pages 資料夾。下面兩顆都從這份檔案的位置出發。</p>
    <!-- 同一層只寫檔名 -->
    <p><a href="04-headings.html">同一層：行前標題</a></p>
    <!-- 外站用完整網址，不從目前資料夾數 -->
    <p>
      <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a">完整網址：MDN 的連結說明</a>
    </p>
  </body>
</html>
```

**解析**

- 只寫檔名的那一顆，瀏覽器就在目前資料夾裡找。
- 寫完整網址的那一顆不看你現在在哪個資料夾，直接去 MDN。
- 兩顆都沒有指定新分頁，所以會在目前這份文件裡換頁。

```html
<!-- 04-headings.html 從目前資料夾找檔 -->
<!-- https:// 開頭不從目前資料夾數 -->
<!-- ../index.html 才是回到上一層 -->
```

{% note success %}
**換你試試：**
在兩顆連結上面加一顆「回練習站首頁」，連到上一層的 `index.html`。練習頁都在 pages 裡，首頁在它們的上一層。
{% endnote %}

<details>
<summary>參考答案</summary>

先回到上一層，再寫首頁檔名。只寫 `index.html` 會在 pages 裡找，那裡沒有這份檔。

```html 02-html/pages/05-links.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>路徑怎麼數</title>
  </head>
  <body>
    <h1>路徑怎麼數</h1>
    <p>練習頁放在 pages 資料夾。下面兩顆都從這份檔案的位置出發。</p>
    <p><a href="../index.html">回練習站首頁</a></p>
    <p><a href="04-headings.html">同一層：行前標題</a></p>
    <p>
      <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a">完整網址：MDN 的連結說明</a>
    </p>
  </body>
</html>
```

</details>

## 文字

這一頁看「字本身」怎麼標：有的標籤除了改變樣子，還帶有意義，有的只改外觀。練習頁是 `pages/06-text.html`。原則是先選意義，外觀之後交給 CSS；要在畫面上出現小於號這類符號時，放在最後一節。

### 語意化強調標籤

重要性、語氣和改稿用有意義的標籤。畫面可能跟純外觀的粗體、斜體很像，開發者工具裡要看的是標籤名。

**觀念**

- **strong**：這段很重要，通常是粗體。
- **em**：語氣強調，通常是斜體。
- **mark**：畫重點，通常有底色。
- **ins**：後加進去的內容，通常有底線。
- **del**：刪掉的內容，通常有刪除線。刪除配插入，是在說這段被改過。

{% note warning %}
**先選有意義的那一組**

- 不能看錯的句子，用表示重要的標籤。
- 一段文字從舊的寫法改成新的寫法，用刪除與插入。
- 只是劃掉一個狀態、沒有改稿的意思，才用下一節的刪除線外觀。

{% endnote %}

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>京都三日遊 · 行前須知</h1>
    <p><strong>護照請放隨身包，不要托運。</strong>這句是重要事項，不是為了變粗。</p>
    <p>這趟是<em>自由行</em>，集合時間請自己抓準。斜體在這裡表示語氣。</p>
    <p>今日請認準集合點 <mark>京都車站中央口</mark>。</p>
    <p>原價 <del>2000</del> 元，早鳥現價 <ins>1600</ins> 元。</p>
  </body>
</html>
```

**解析**

- 第一句護照是粗體，自由行是斜體，集合點有底色。
- 價格那一行，2000 有刪除線，1600 有底線，表示舊價換成新價。
- 按 <kbd>F12</kbd> 點這四句，標籤名分別是重要性、語氣、畫重點，以及刪除和插入。

```html
<!-- strong 是重要；em 是語氣；mark 是畫重點 -->
<!-- del 與 ins 成對，表示這段被改過 -->
```

{% note success %}
**換你試試：**
在價格那一行後面加一句：「集合時間由下午三點改為下午兩點。」舊時間用刪除，新時間用插入。
{% endnote %}

<details>
<summary>參考答案</summary>

這是改稿，不是只劃掉一個狀態。舊時間包在刪除裡，新時間包在插入裡，閱讀器才知道句子被改過。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>京都三日遊 · 行前須知</h1>
    <p><strong>護照請放隨身包，不要托運。</strong>這句是重要事項，不是為了變粗。</p>
    <p>這趟是<em>自由行</em>，集合時間請自己抓準。斜體在這裡表示語氣。</p>
    <p>今日請認準集合點 <mark>京都車站中央口</mark>。</p>
    <p>原價 <del>2000</del> 元，早鳥現價 <ins>1600</ins> 元。</p>
    <p>集合時間由 <del>下午三點</del> 改為 <ins>下午兩點</ins>。</p>
  </body>
</html>
```

</details>

### 外觀效果標籤

只改樣子、不表示重要性時，用這一組。需要「不能看錯」或「這段被改過」時，回到上一節。

**觀念**

- **b**：粗體。一段文字只是要醒目、並不表示重要時才用。
- **i**：斜體，常拿來標外文的樣子。
- **u**：底線。看起來很像連結，少用。
- **s**：只是劃掉，沒有「這一段被改過」的意思。
- **small**：附註小字，例如一行補充說明。
- **sub** 與 **sup**：下標與上標。`big` 已從 HTML5 移除，不要再用。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>外觀與附註</h1>
    <p>飯店叫 <b>洛奇旅舍</b>，只是讓名字醒目。</p>
    <p>晚餐訂在 <i>一蘭</i>，斜體只表示這是外文店名。</p>
    <p><u>這一行有底線，但點了不會去任何地方。</u></p>
    <p>加購名額 <s>已額滿</s>，這裡只是劃掉，沒有說文件改過。</p>
    <p>水的化學式是 H<sub>2</sub>O。集合樓層是 2<sup>F</sup>。</p>
    <p><small>以上價格未含機場接送。</small></p>
  </body>
</html>
```

**解析**

- 第一句的名字是粗體，外文是斜體，但標籤和上一節的重要性、語氣不同。
- 有底線的那一句點了沒有反應。
- 被劃掉的那句有刪除線，標籤卻不是表示刪改的那一組。
- 化學式的 2 沉到基線下面，樓層的 F 抬高。
- 附註比正文小。

```html
<!-- b、i、u、s 只改樣子 -->
<!-- sub 下標、sup 上標、small 附註 -->
```

{% note success %}
**換你試試：**
把「洛奇旅舍」改成表示重要的標籤。底線那一句維持原樣，它不是連結。
{% endnote %}

<details>
<summary>參考答案</summary>

不能看錯的資訊用表示重要的標籤。只變粗的那顆留給純外觀。這一題改的是標籤，畫面上仍是粗體。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>外觀與附註</h1>
    <p>飯店叫 <strong>洛奇旅舍</strong>，行前信裡這個名字不能看錯。</p>
    <p>晚餐訂在 <i>一蘭</i>，斜體只表示這是外文店名。</p>
    <p><u>這一行有底線，但點了不會去任何地方。</u></p>
    <p>加購名額 <s>已額滿</s>，這裡只是劃掉，沒有說文件改過。</p>
    <p>水的化學式是 H<sub>2</sub>O。集合樓層是 2<sup>F</sup>。</p>
    <p><small>以上價格未含機場接送。</small></p>
  </body>
</html>
```

</details>

### 程式碼顯示

程式、按鍵和終端機印出的字，各有對應寫法。要在畫面上看到標籤符號本身時，小於號還得改寫，那一步在字元實體那一節。

**觀念**

- **code**：行內一小段。
- **pre**：保留空格和換行。常包住 code。
- **kbd**：按鍵。
- **samp**：程式印出來的字。
- **var**：變數名。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>程式與按鍵</h1>
    <p>開發者工具按 <kbd>F12</kbd>。人數 <var>n</var>、單價 <var>price</var>。</p>
    <p>送出成功時，畫面出現 <samp>報名成功</samp>。</p>
    <p>行內標籤要寫成文字：<code>&lt;div&gt;</code>。</p>
    <pre><code>&lt;p&gt;小於號要寫成實體才會當文字。&lt;/p&gt;</code></pre>
  </body>
</html>
```

**解析**

- 按鍵、變數和「報名成功」在畫面上都像程式字，樹狀結構裡的標籤名不同。
- 你會看到 div 這幾個字被角括號包住，而不是一個真的區塊。
- 預格式那一塊保留了換行，裡面的段落標籤也是文字。

```html
<!-- kbd 是按鍵，var 是變數名，samp 是輸出 -->
<!-- 畫面上的角括號來自實體，不是一顆新標籤 -->
```

{% note success %}
**換你試試：**
在按鍵那一句後面補上儲存常用的組合：Ctrl 和 S 各是一顆按鍵。不要把兩個鍵寫進同一顆裡。
{% endnote %}

<details>
<summary>參考答案</summary>

組合鍵是兩顆按鍵前後相接。寫成同一顆，閱讀器會把它唸成一個鍵名。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>程式與按鍵</h1>
    <p>開發者工具按 <kbd>F12</kbd>。儲存常用 <kbd>Ctrl</kbd>+<kbd>S</kbd>。人數 <var>n</var>、單價 <var>price</var>。</p>
    <p>送出成功時，畫面出現 <samp>報名成功</samp>。</p>
    <p>行內標籤要寫成文字：<code>&lt;div&gt;</code>。</p>
    <pre><code>&lt;p&gt;小於號要寫成實體才會當文字。&lt;/p&gt;</code></pre>
  </body>
</html>
```

</details>

### 引用與引言

別人的句子用引用，來源的名稱用另一顆標籤。短句留在段落裡，長段獨立成塊。

**觀念**

短句用 `q`，瀏覽器通常會自動加引號。出處網址可以寫在 cite 屬性裡，畫面上不一定看得到。

較長的引文用 `blockquote`，作品或來源的名稱則用 `cite`，通常是斜體。名稱和網址不是同一件事：網址給機器，名稱給人讀。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>引用</h1>
    <p>行前信寫過：<q cite="https://example.com/notice">行李不超過 7 公斤。</q></p>
    <blockquote>
      <p>自由活動時請在約定時間回到集合點，不要單獨脫隊。</p>
      <footer>出處 <cite>洛奇旅行行前須知</cite></footer>
    </blockquote>
  </body>
</html>
```

**解析**

- 短引用左右有引號，引號是瀏覽器加上的，原始碼裡沒有打引號。
- 長引用整段縮排，下面有來源名稱，那個名稱是斜體。
- 出處網址寫在短引用的屬性裡，畫面上不會多出一行網址。

```html
<!-- q 是短句；blockquote 是長段 -->
<!-- cite 元素是來源名稱；q 的 cite 屬性是網址 -->
```

{% note success %}
**換你試試：**
再加一句短引用：「護照效期要超過六個月。」出處網址沿用上面那一則。長引用維持不變。
{% endnote %}

<details>
<summary>參考答案</summary>

仍是一句話，所以用短引用，並把網址放在屬性裡。不要為了這一句再包一層長引用。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>引用</h1>
    <p>行前信寫過：<q cite="https://example.com/notice">行李不超過 7 公斤。</q></p>
    <p>同一則也寫過：<q cite="https://example.com/notice">護照效期要超過六個月。</q></p>
    <blockquote>
      <p>自由活動時請在約定時間回到集合點，不要單獨脫隊。</p>
      <footer>出處 <cite>洛奇旅行行前須知</cite></footer>
    </blockquote>
  </body>
</html>
```

</details>

### 縮寫、時間、聯絡、摺疊

縮寫、日期、聯絡和常見問答各有一個場合。摺疊不用先寫程式，點標題才展開。

**觀念**

- **abbr**：縮寫，全名寫在 title，滑鼠停上看得到。
- **time**：畫面上可以寫中文日期，機器讀的是 datetime。
- **address**：聯絡資訊。不是拿來把任何一句話變成斜體。
- **details**：點 summary 才展開。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>縮寫、時間與聯絡</h1>
    <p>
      <abbr title="HyperText Markup Language">HTML</abbr>
      是這一課的標記語言。交通用
      <abbr title="日本鐵路">JR</abbr>。
    </p>
    <p>
      出發日 <time datetime="2026-08-30">2026 年 8 月 30 日</time>，
      集合 <time datetime="14:00">下午 2:00</time>。
    </p>
    <address>
      洛奇旅行<br />
      台北市範例路 1 號<br />
      信箱 hello@example.com
    </address>
    <details>
      <summary>小費要給嗎？</summary>
      <p>本行程不含強制小費。若想給導遊或司機，採自願。</p>
    </details>

  </body>
</html>
```

**解析**

- HTML 與 JR 滑鼠停上會看到全名。
- 日期看起來是中文，屬性裡是機器讀的格式。
- 集合時間同理，畫面上是「下午 2:00」，屬性是 24 小時制。
- 地址是斜體的三行。
- 點「小費要給嗎？」才展開下面那段，沒點之前那段不佔版面。

```html
<!-- abbr 的 title 是全名；time 的 datetime 給機器讀 -->
<!-- address 是聯絡；details 包住 summary 與答案 -->
```

{% note success %}
**換你試試：**
再標一個回國日：畫面上寫「2026 年 9 月 2 日」，機器讀的日期是 2026-09-02。摺疊那一則不用改。
{% endnote %}

<details>
<summary>參考答案</summary>

畫面上的中文給人讀，屬性給機器讀，兩邊都要寫。格式用年-月-日，不要把中文寫進屬性。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>縮寫、時間與聯絡</h1>
    <p>
      <abbr title="HyperText Markup Language">HTML</abbr>
      是這一課的標記語言。交通用
      <abbr title="日本鐵路">JR</abbr>。
    </p>
    <p>
      出發日 <time datetime="2026-08-30">2026 年 8 月 30 日</time>，
      集合 <time datetime="14:00">下午 2:00</time>，
      回國日 <time datetime="2026-09-02">2026 年 9 月 2 日</time>。
    </p>
    <address>
      洛奇旅行<br />
      台北市範例路 1 號<br />
      信箱 hello@example.com
    </address>
    <details>
      <summary>小費要給嗎？</summary>
      <p>本行程不含強制小費。若想給導遊或司機，採自願。</p>
    </details>

  </body>
</html>
```

</details>

### 符號（字元）實體化

HTML 用小於號與大於號辨認標籤，用和號辨認實體，所以這些字要顯示在畫面上時，改寫成實體。名稱寫法與數字代號都可以。

**觀念**

- 小於：`&lt;`
- 大於：`&gt;`
- 和號：`&amp;`
- 雙引號：`&quot;`
- 不換行空白：`&nbsp;`
- 版權符號：`&copy;`

在講義或程式碼裡若要讓人看見「實體本身怎麼寫」，連開頭的和號也要再寫成實體。完整對照見 [MDN 的字元參考](https://developer.mozilla.org/en-US/docs/Glossary/Character_reference)。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>畫面上的符號</h1>
    <p>小於號寫成 &lt; ，大於號寫成 &gt; 。</p>
    <p>公司名寫成洛奇 &amp; 夥伴，畫面上會看到和號。</p>
    <p>手提行李以 7&nbsp;kg 為限，數字和單位中間這個空白不會被拆開。</p>
    <p>&copy; 2026 洛奇旅行</p>
  </body>
</html>
```

**解析**

- 畫面上有小於、大於、和號、一組不會被拆開的「7 kg」，以及版權符號。
- 和號那一行的原始碼比畫面上的字更長，因為和號不能直接打。
- 把視窗拉得很窄，「7 kg」仍會黏在一起換行。

```html
<!-- 畫面上的 < 來自 &lt; ，不是一顆新標籤 -->
<!-- &nbsp; 是不會被拆開的空白 -->
```

{% note success %}
**換你試試：**
加一行，讓畫面出現 img 這顆標籤的五個字元（含兩個角括號），瀏覽器不要真的去載圖片。
{% endnote %}

<details>
<summary>參考答案</summary>

直接打角括號會被當成圖片元素，畫面不會出現這五個字。小於號改成實體，瀏覽器才把它當文字。

```html 02-html/pages/06-text.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行前須知</title>
  </head>
  <body>
    <h1>畫面上的符號</h1>
    <p>小於號寫成 &lt; ，大於號寫成 &gt; 。</p>
    <p>公司名寫成洛奇 &amp; 夥伴，畫面上會看到和號。</p>
    <p>手提行李以 7&nbsp;kg 為限，數字和單位中間這個空白不會被拆開。</p>
    <p>&copy; 2026 洛奇旅行</p>
    <p>圖片標籤要當文字時寫成 &lt;img&gt;。</p>
  </body>
</html>
```

</details>

## 清單

相關項目要用語意清單，不要在一段一段文字前面加符號假裝。練習頁是 `pages/07-lists.html`：沒有先後用一種，有步驟用一種，某一項裡面還可以再放一層，名詞對說明再用一種。

### 無序清單（ul）

沒有先後的項目用無序清單。順序對調也不影響意思。

**觀念**

瀏覽器通常在每一項前面加圓點，而項目必須包在 `li` 裡，不能把文字直接丟在清單上。選單也常用它，那是在說「這一區是一串項目」，跟項目裡有沒有連結是兩件事。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出發前清單</title>
  </head>
  <body>
    <h1>出發前清單</h1>
    <h2>要帶的東西</h2>
    <ul>
      <li>護照與影本</li>
      <li>充電器</li>
      <li>藥品</li>
    </ul>
  </body>
</html>
```

**解析**

- 三項前面是圓點。
- 把「藥品」和「護照」對調，意思還在：這是要帶的東西，不是步驟。
- 開發者工具裡，清單的孩子是項目，項目裡面才是文字。

```html
<!-- ul 沒有順序；每一項是 li -->
```

{% note success %}
**換你試試：**
在三項後面加「雨衣」。它跟護照一樣沒有先後，所以留在同一層，不要另開一段文字假裝清單。
{% endnote %}

<details>
<summary>參考答案</summary>

雨衣是同一份行李的一項，加一顆項目即可。用段落加圓點字元，輔助工具不會把它算進這份清單。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出發前清單</title>
  </head>
  <body>
    <h1>出發前清單</h1>
    <h2>要帶的東西</h2>
    <ul>
      <li>護照與影本</li>
      <li>充電器</li>
      <li>藥品</li>
      <li>雨衣</li>
    </ul>
  </body>
</html>
```

</details>

### 有序清單（ol）

有先後的步驟用有序清單。瀏覽器會編號。

**觀念**

項目同樣包在 `li` 裡。可以從指定的數字開始，也可以改成字母或羅馬數字；這一頁先用預設的數字，從 1 開始。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出發前清單</title>
  </head>
  <body>
    <h1>出發前清單</h1>
    <h2>出境順序</h2>
    <ol>
      <li>報到櫃台托運行李</li>
      <li>過安檢與證照查驗</li>
      <li>到登機門，保留十五分鐘緩衝</li>
    </ol>
  </body>
</html>
```

**解析**

- 畫面上是 1、2、3。
- 報到在安檢前面，這份清單有先後。
- 對調前兩項，步驟就錯了，所以不用圓點那一種。

```html
<!-- ol 會編號；順序就是步驟 -->
```

{% note success %}
**換你試試：**
在最後再加一步「上飛機」。編號要接著 3 往下，不要自己打「4.」。
{% endnote %}

<details>
<summary>參考答案</summary>

再加一顆項目，瀏覽器會編成 4。自己在文字前面打號碼，之後插入步驟時號碼不會跟著改。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出發前清單</title>
  </head>
  <body>
    <h1>出發前清單</h1>
    <h2>出境順序</h2>
    <ol>
      <li>報到櫃台托運行李</li>
      <li>過安檢與證照查驗</li>
      <li>到登機門，保留十五分鐘緩衝</li>
      <li>上飛機</li>
    </ol>
  </body>
</html>
```

</details>

### 巢狀清單

清單裡還可以再放清單。內層要放在某一項裡面，不能跟項目並排當兄弟。

**觀念**

內層可以是無序，也可以是有序。它描述的是「這一項裡面還有哪些」，所以寫在那個 `li` 之中；放在清單外面，或跟其他項目並排，縮排和從屬都會錯。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出發前清單</title>
  </head>
  <body>
    <h1>出發前清單</h1>
    <h2>要帶的東西</h2>
    <ul>
      <li>護照與影本</li>
      <li>
        充電器
        <ul>
          <li>轉接頭（日本是兩腳扁插）</li>
        </ul>
      </li>
      <li>藥品</li>
    </ul>
  </body>
</html>
```

**解析**

- 外層三項仍是圓點。
- 充電器下面縮進一層，只有「轉接頭」這一項，符號通常會換成另一種。
- 這一層在開發者工具裡位於充電器那個項目之中，不是清單的直接孩子。

```html
<!-- 內層 ul 放在「充電器」那個 li 裡 -->
```

{% note success %}
**換你試試：**
在「藥品」裡面加一層有順序的清單：防曬、腸胃藥、OK 繃。這一層要編號，而且要包在「藥品」那一項裡面。
{% endnote %}

<details>
<summary>參考答案</summary>

吃藥的順序有先後時用有序清單。它必須放在「藥品」那個項目裡；若跟三個圓點項目並排，瀏覽器無法把這層算進藥品底下，縮排也會錯。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出發前清單</title>
  </head>
  <body>
    <h1>出發前清單</h1>
    <h2>要帶的東西</h2>
    <ul>
      <li>護照與影本</li>
      <li>
        充電器
        <ul>
          <li>轉接頭（日本是兩腳扁插）</li>
        </ul>
      </li>
      <li>
        藥品
        <ol>
          <li>防曬</li>
          <li>腸胃藥</li>
          <li>OK 繃</li>
        </ol>
      </li>
    </ul>
  </body>
</html>
```

</details>

### 描述清單（dl）

名詞對說明用描述清單。它不是圓點，也不是編號。

**觀念**

`dt` 是名稱，`dd` 是說明，一個名稱可以對多段說明。兩者都是清單的孩子，中間不要再包一層項目。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出發前清單</title>
  </head>
  <body>
    <h1>出發前清單</h1>
    <h2>名詞</h2>
    <dl>
      <dt>alt</dt>
      <dd>圖片沒有出現時，畫面上改顯示這句；輔助工具也讀它。</dd>
      <dt>name</dt>
      <dd>表單送出時的欄位名。沒有它，這一欄通常不會被送出去。</dd>
    </dl>
  </body>
</html>
```

**解析**

- 兩個名稱各對一段說明。
- 名稱在左或在上，說明縮進去。
- 畫面上沒有圓點，也沒有 1、2、3。

```html
<!-- dl 的孩子是 dt 與 dd，不是 li -->
```

{% note success %}
**換你試試：**
再加一組：名稱是 href，說明寫「連結要去的地方。沒有它，畫面上即使有底線也不是連結。」
{% endnote %}

<details>
<summary>參考答案</summary>

一組是一個名稱加一段說明，跟前兩組同一層。不要把這組寫成圓點項目。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出發前清單</title>
  </head>
  <body>
    <h1>出發前清單</h1>
    <h2>名詞</h2>
    <dl>
      <dt>alt</dt>
      <dd>圖片沒有出現時，畫面上改顯示這句；輔助工具也讀它。</dd>
      <dt>name</dt>
      <dd>表單送出時的欄位名。沒有它，這一欄通常不會被送出去。</dd>
      <dt>href</dt>
      <dd>連結要去的地方。沒有它，畫面上即使有底線也不是連結。</dd>
    </dl>
  </body>
</html>
```

</details>

## 多媒體

圖片、影片、音訊和嵌入的另一份文件，畫面上看到的多半不是標籤中間的文字。沒有網路時，圖或影片可能載不進來，<kbd>F12</kbd> 仍看得到來源。練習頁是 `pages/08-media.html`。圖檔用 [picsum.photos](https://picsum.photos/) 與 [placehold.co](https://placehold.co/)，不要把圖放進倉庫。

### 圖片元素（img）

圖片是空元素，來源和替代文字都寫在標籤上。圖沒有出來，或讀者看不到圖時，替代文字就是這張圖的意思。

**觀念**

寬和高先佔好位置，載入時版面比較不會亂跳；裝飾用的圖才把替代文字留空。

圖和說明要綁在一起時，用 `figure` 包住圖片，`figcaption` 寫說明。說明是給看得到圖的人讀的，替代文字則是圖本身的意思，兩句可以相關，不必逐字相同。

```html 02-html/pages/08-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都素材</title>
  </head>
  <body>
    <h1>京都素材</h1>
    <figure>
      <img
        src="https://picsum.photos/id/1015/800/450"
        width="800"
        height="450"
        alt="河谷與遠山，當作清水寺周邊的封面示意"
      />
      <figcaption>封面與這句說明綁在一起。正式行程會換成清水寺的照片。</figcaption>
    </figure>
    <p>
      <img src="https://placehold.co/320x180?text=map" width="320" height="180" alt="京都車站到清水寺的路線示意，色塊占位" />
    </p>
  </body>
</html>
```

**解析**

- 大標下面是一張橫幅圖，圖下有一行說明，說明跟圖在同一個 figure 裡。
- 再來是一張較小的色塊，替代文字寫的是路線示意，不是檔名。
- 把網路關掉再重新整理，橫幅的位置仍佔著寬高，替代文字會出現在那個位置。

```html
<!-- alt 描述畫面；figcaption 是給看得到圖的人讀的說明 -->
<!-- width 與 height 先佔好位置 -->
```

{% note success %}
**換你試試：**
在路線示意下面再加一組圖與說明：圖片用一張占位圖，替代文字寫「伏見稻荷的千本鳥居」，說明寫「第二天上午」。寬和高都寫上。
{% endnote %}

<details>
<summary>參考答案</summary>

圖和說明要一起搬走時用 figure。替代文字寫的是畫面裡有什麼，不是「圖片」兩個字。先寫寬高，這張圖還沒載入時，下面的內容不會突然被擠下去。

```html 02-html/pages/08-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都素材</title>
  </head>
  <body>
    <h1>京都素材</h1>
    <figure>
      <img
        src="https://picsum.photos/id/1015/800/450"
        width="800"
        height="450"
        alt="河谷與遠山，當作清水寺周邊的封面示意"
      />
      <figcaption>封面與這句說明綁在一起。正式行程會換成清水寺的照片。</figcaption>
    </figure>
    <p>
      <img src="https://placehold.co/320x180?text=map" width="320" height="180" alt="京都車站到清水寺的路線示意，色塊占位" />
    </p>
    <figure>
      <img src="https://picsum.photos/id/1016/800/450" width="800" height="450" alt="伏見稻荷的千本鳥居" />
      <figcaption>第二天上午</figcaption>
    </figure>
  </body>
</html>
```

</details>

### 影音元素

影片和音訊是瀏覽器自己的播放器，加上控制列才會出現播放按鈕。真正的檔案放在子元素上，並註明格式。

**觀念**

影片用 video，聲音用 audio，檔案寫在 `source` 上，type 告訴瀏覽器這是哪一種格式。標籤中間的文字只有在瀏覽器不支援時才看得到；看得到播放器時，那句不會出現。

{% note warning %}
**有聲音的影片不要自己播**
現代瀏覽器通常不允許帶聲音的自動播放，所以這一頁只加控制列，讓你自己按。
{% endnote %}

```html 02-html/pages/08-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都素材</title>
  </head>
  <body>
    <h1>京都素材</h1>
    <video controls width="320">
      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
      這個瀏覽器不支援影片播放。
    </video>
    <p>
      <audio controls>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
        這個瀏覽器不支援音訊播放。
      </audio>
    </p>
  </body>
</html>
```

**解析**

- 影片有一條控制列，要按了才播。
- 音訊也有自己的控制列，頁面一打開不會出聲。
- 兩者都寫了不支援時才看得到的那句話。
- 來源在子元素上，不在外面那顆的 src。

```html
<!-- controls 讓你自己按 -->
<!-- source 放檔案與格式；中間的文字是不支援時的退路 -->
```

{% note success %}
**換你試試：**
在音訊前面加一句「按播放才會出聲。」這句是給人看的說明，不要寫進音訊標籤中間。
{% endnote %}

<details>
<summary>參考答案</summary>

標籤中間那句只在播不了的時候出現。平常看得到的說明要放在播放器外面，用段落即可。

```html 02-html/pages/08-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都素材</title>
  </head>
  <body>
    <h1>京都素材</h1>
    <video controls width="320">
      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
      這個瀏覽器不支援影片播放。
    </video>
    <p>按播放才會出聲。</p>
    <p>
      <audio controls>
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
        這個瀏覽器不支援音訊播放。
      </audio>
    </p>
  </body>
</html>
```

</details>

### 嵌入元素（iframe）

iframe 在這一頁裡再開一份文件：來源指向那份文件，標題說明這個框是什麼，寬高決定框的大小。

**觀念**

早期用來切整頁的 frameset 已經淘汰。框的 title 在畫面上不一定顯示，但輔助工具會讀它；這份文件若在同一資料夾，來源只寫檔名，算法跟連結的相對路徑相同。

{% note danger %}
**很多網站拒絕被嵌進來**
對方可以設定不允許被放進 iframe，用來避免畫面被蓋一層假按鈕，所以搜尋引擎首頁、銀行登入頁嵌不進去是正常的。影片網站要用它們提供的嵌入網址；失敗時改成一般連結，讓人開新分頁。
{% endnote %}

```html 02-html/pages/08-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都素材</title>
  </head>
  <body>
    <h1>京都素材</h1>
    <iframe title="語意版面預覽" src="03-layout.html" width="480" height="320"></iframe>
  </body>
</html>
```

**解析**

- 頁面上是一個框，裡面嵌著另一份文件的頁首、主文和頁尾，網址列仍停在這一頁。
- 框本身看不出標題文字，用開發者工具點到這個框，屬性裡有「語意版面預覽」。

```html
<!-- src 指向同一資料夾的 03-layout.html -->
<!-- title 說明這個框是什麼 -->
```

{% note success %}
**換你試試：**
在框下面加一顆一般連結，連到同一份語意頁，文字寫「開新分頁看語意版面」，並開新分頁。框嵌不進來時，還有這條路。
{% endnote %}

<details>
<summary>參考答案</summary>

退路是連結，不是再嵌一個框。開新分頁沿用連結那一節的寫法，並加上不把目前網址帶過去的 rel。

```html 02-html/pages/08-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都素材</title>
  </head>
  <body>
    <h1>京都素材</h1>
    <iframe title="語意版面預覽" src="03-layout.html" width="480" height="320"></iframe>
    <p>
      <a href="03-layout.html" target="_blank" rel="noreferrer">開新分頁看語意版面</a>
    </p>
  </body>
</html>
```

</details>

## 表格

資料用列和欄排，練習頁是 `pages/09-table.html`。表是一組資料，不是拿來把網頁切成左右兩欄的版面工具。框線用舊屬性讓格線先看得見；外觀屬性很薄，所以併進基本結構，輔助工具讀表頭的方式則併進語意結構。

### 表格的基本結構與外觀屬性

一張表先有容器、列，以及列裡面的儲存格。標題格用來當欄名或列名，資料格放內容。

**觀念**

整張表是一個容器，每一列是一橫排，一列裡從左到右是標題格或資料格。沒有表頭分區也能先畫出格子，語意完整時再補下一節的分區。

框線、儲存格內距、儲存格間距、寬度、對齊、背景色這類寫在標籤上的外觀，在 HTML5 多半已過時。這一頁只留 `border="1"`，為了讓格線看得見；編輯器若對對齊、背景色、內距、間距這類舊屬性畫紅線，是因為外觀該交給 CSS，瀏覽器為了舊頁可能還接受。

```html 02-html/pages/09-table.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出團資料</title>
  </head>
  <body>
    <h1>出團資料</h1>
    <table border="1">
      <caption>大阪一日遊</caption>
      <thead>
        <tr>
          <th scope="col">時段</th>
          <th scope="col">景點</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>上午</td>
          <td>大阪城</td>
        </tr>
        <tr>
          <td>下午</td>
          <td>道頓堀</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

**解析**

- 表名在格子上方。
- 第一列是欄名，通常是粗體。
- 下面兩列是資料，格線看得到。
- 拿掉框線之後，資料還在，只是線不見了。

```html
<!-- tr 是一列；th 是欄名，td 是資料 -->
<!-- border="1" 只為了看見格線 -->
```

{% note success %}
**換你試試：**
在資料區加一列：晚上、心齋橋。欄數要跟上面兩列一樣，不要多一格。
{% endnote %}

<details>
<summary>參考答案</summary>

一列兩個資料格，對上現有的兩個欄。多寫一格，這一列會凸出去。

```html 02-html/pages/09-table.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出團資料</title>
  </head>
  <body>
    <h1>出團資料</h1>
    <table border="1">
      <caption>大阪一日遊</caption>
      <thead>
        <tr>
          <th scope="col">時段</th>
          <th scope="col">景點</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>上午</td>
          <td>大阪城</td>
        </tr>
        <tr>
          <td>下午</td>
          <td>道頓堀</td>
        </tr>
        <tr>
          <td>晚上</td>
          <td>心齋橋</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

</details>

### 儲存格合併

一格可以往右多佔幾欄，或往下多佔幾列。被合併掉的位置不要再寫一顆空的儲存格。

**觀念**

- **colspan**：往右佔幾欄。
- **rowspan**：往下佔幾列。

直向合併之後，下一列要少一格；橫向合併之後，同一列也要少一格。能不加就不要加，因為合併是為了「這一格本來就橫跨」，不是為了把表拼好看。

```html 02-html/pages/09-table.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出團資料</title>
  </head>
  <body>
    <h1>出團資料</h1>
    <table border="1">
      <caption>京都行程（含合併）</caption>
      <thead>
        <tr>
          <th scope="col">日</th>
          <th scope="col">時段</th>
          <th scope="col">地點</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowspan="2">第一天</th>
          <td>上午</td>
          <td>京都車站中央口</td>
        </tr>
        <tr>
          <!-- 第一天已經用 rowspan 佔掉這一列的第一格 -->
          <td>下午</td>
          <td>清水寺山門</td>
        </tr>
        <tr>
          <th scope="row">花蓮山海</th>
          <td colspan="2">三日套裝（天數與售價合併成一格）</td>
        </tr>
      </tbody>
    </table>
    <table border="1">
      <caption>團體報名</caption>
      <thead>
        <tr>
          <th scope="col" rowspan="2">團名</th>
          <th scope="col" colspan="2">人數</th>
          <th scope="col" rowspan="2">導遊</th>
        </tr>
        <tr>
          <th scope="col">成人</th>
          <th scope="col">兒童</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">京都三日</th>
          <td>2</td>
          <td>1</td>
          <td>林導遊</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

**解析**

- 第一張表的「第一天」直向佔了兩列，所以下午那一列只有時段和地點，沒有再寫一次「第一天」。
- 最後一列的「三日套裝」橫向佔了兩欄，時段和地點合成一格。
- 第二張表的表頭有兩列。
- 「團名」和「導遊」各佔兩列高，「人數」橫跨成人與兒童兩欄。
- 資料列因此是四格：團名、成人人數、兒童人數、導遊。

```html
<!-- rowspan="2" 的下一列要少一格 -->
<!-- colspan="2" 的同一列要少一格 -->
```

{% note success %}
**換你試試：**
在有直向合併的那張表裡，比照「第一天」再加「第二天」：上午伏見稻荷、下午嵐山。第二天也要直向佔兩列，下午那一列不要再寫一次日名。
{% endnote %}

<details>
<summary>參考答案</summary>

第二天的寫法跟第一天相同：日名那一格往下佔兩列，下一列只剩時段和地點。花蓮那一列維持橫向合併，不要插進第二天的兩列中間。

```html 02-html/pages/09-table.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出團資料</title>
  </head>
  <body>
    <h1>出團資料</h1>
    <table border="1">
      <caption>京都行程（含合併）</caption>
      <thead>
        <tr>
          <th scope="col">日</th>
          <th scope="col">時段</th>
          <th scope="col">地點</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowspan="2">第一天</th>
          <td>上午</td>
          <td>京都車站中央口</td>
        </tr>
        <tr>
          <td>下午</td>
          <td>清水寺山門</td>
        </tr>
        <tr>
          <th scope="row" rowspan="2">第二天</th>
          <td>上午</td>
          <td>伏見稻荷</td>
        </tr>
        <tr>
          <td>下午</td>
          <td>嵐山</td>
        </tr>
        <tr>
          <th scope="row">花蓮山海</th>
          <td colspan="2">三日套裝（天數與售價合併成一格）</td>
        </tr>
      </tbody>
    </table>
    <table border="1">
      <caption>團體報名</caption>
      <thead>
        <tr>
          <th scope="col" rowspan="2">團名</th>
          <th scope="col" colspan="2">人數</th>
          <th scope="col" rowspan="2">導遊</th>
        </tr>
        <tr>
          <th scope="col">成人</th>
          <th scope="col">兒童</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">京都三日</th>
          <td>2</td>
          <td>1</td>
          <td>林導遊</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

</details>

### 語意化表格結構與輔助工具

表名、欄名區、資料區和表尾讓這張表可以被正確地讀。畫面上看幾乎只是多了一列合計；輔助工具靠表頭的範圍把標題和資料格配在一起。

**觀念**

- **caption**：表名，要寫成 table 的第一個子元素。預設出現在表的上方。要放下面用 CSS，不是把標籤搬到表尾。
- **thead**：欄名那一區。**tbody**：資料。**tfoot**：合計或備註。合計寫在資料後面，畫面仍在表的底部。
- **scope**：寫在標題格上。`col` 是欄名，`row` 是列名。畫面幾乎沒差。更複雜的表可以用 headers 把資料格指回表頭的 id，這一課先把欄名和列名分清楚。

```html 02-html/pages/09-table.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出團資料</title>
  </head>
  <body>
    <h1>出團資料</h1>
    <table border="1">
      <caption>京都三日遊價目</caption>
      <thead>
        <tr>
          <th scope="col">行程</th>
          <th scope="col">人數</th>
          <th scope="col">單價</th>
          <th scope="col">小計</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">成人</th>
          <td>2</td>
          <td>1600</td>
          <td>3200</td>
        </tr>
        <tr>
          <th scope="row">兒童</th>
          <td>1</td>
          <td>800</td>
          <td>800</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">合計</th>
          <td>3</td>
          <td></td>
          <td>4000</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>
```

**解析**

- 表名在上方。
- 欄名和列名都是標題格，不是普通資料格。
- 合計出現在表的底部。
- 原始碼裡合計放在資料列後面。
- 合計列有一格是空的，因為這一列沒有對應的單價。

```html
<!-- caption 是 table 的第一個子元素 -->
<!-- tfoot 寫在 tbody 後面，畫面在表底 -->
<!-- scope="col" 是欄名，scope="row" 是列名 -->
```

{% note success %}
**換你試試：**
在資料區加一列「單人房差」：人數 2、單價 600、小計 1200。合計改成人數 5、金額 5200。列名仍用標題格，並標明這是列名。
{% endnote %}

<details>
<summary>參考答案</summary>

單人房差是一筆資料，放在資料區，跟成人、兒童同一層。合計不是新增的一筆資料，所以仍留在表尾，只改人數和金額。列名用標題格並標明範圍，輔助工具才知道 1200 屬於單人房差。

```html 02-html/pages/09-table.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>出團資料</title>
  </head>
  <body>
    <h1>出團資料</h1>
    <table border="1">
      <caption>京都三日遊價目</caption>
      <thead>
        <tr>
          <th scope="col">行程</th>
          <th scope="col">人數</th>
          <th scope="col">單價</th>
          <th scope="col">小計</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">成人</th>
          <td>2</td>
          <td>1600</td>
          <td>3200</td>
        </tr>
        <tr>
          <th scope="row">兒童</th>
          <td>1</td>
          <td>800</td>
          <td>800</td>
        </tr>
        <tr>
          <th scope="row">單人房差</th>
          <td>2</td>
          <td>600</td>
          <td>1200</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">合計</th>
          <td>5</td>
          <td></td>
          <td>5200</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>
```

</details>

## 表單

表單用來收集文字和選項，再送到某個位置。練習頁是 `pages/10-form.html`，整頁是一份表單，下面依知識點拆開：容器、標籤、共通屬性、輸入類型、選擇、多行、按鈕、分組，以及進度與計量。這一頁的送出不會把檔案存到伺服器，也不要寫程式。

### 表單容器（form）

`form` 是容器。送到哪裡、用哪一種方法，都寫在這顆標籤上。

**觀念**

送出之後資料要去哪、怎麼帶，分開看：

- 這一頁的 action 用井字號，送出後仍停在這份文件。
- `method="get"` 會把欄位接在網址後面，適合查詢。
- 密碼和大量內容改用 post，資料放在請求本體。
- 有檔案要真的上傳時，再改成 post，並把編碼設成 `multipart/form-data`。
- 表單也可以指定結果開在哪個框，這一頁的結果留在同一份文件。

沒有 name 的欄位，通常不會出現在網址上。隱藏欄位畫面上沒有格子，送出時仍會帶一筆。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <p>送出後仍停在這一頁，網址後面會出現欄位名稱與內容。</p>
    <form id="booking-form" action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" value="王小明" />
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 按送出之後，網址列還在這一頁，後面多了 `name` 和王小明。
- 這是 get 把欄位接上 query，不是伺服器回了一頁新的。
- 表單的 id 是 booking-form，這一頁還沒有別的程式去找它。

```html
<!-- action="#" 停在這份文件；method="get" 把欄位接到網址 -->
```

{% note success %}
**換你試試：**
在送出鈕前面加一顆隱藏欄位，名稱是 source，值是 class。畫面上不要多出一個格子，送出後網址裡要看得到這筆。
{% endnote %}

<details>
<summary>參考答案</summary>

隱藏欄位仍要有名稱和值，只是類型設成 hidden。沒有名稱的話，送出時這筆不會出現。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <p>送出後仍停在這一頁，網址後面會出現欄位名稱與內容。</p>
    <form id="booking-form" action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" value="王小明" />
      </p>
      <input type="hidden" name="source" value="class" />
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

</details>

### 表單標籤與關聯（label）

每個看得到的欄位都要有標籤。點文字就該聚焦到那一欄。

**觀念**

標籤和欄位有兩種對法，不要對同一欄各寫一套互相矛盾的名字。

- 一種是 for 對上欄位的 id。
- 另一種是把控制項包在標籤裡面，單選和複選常用這種。

空欄提示只在還沒填的時候出現，填了就消失，不能拿來代替標籤。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" placeholder="王小明" />
      </p>
      <p>
        <label>
          <input type="checkbox" name="extra" value="insurance" />
          保險
        </label>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 點「姓名」兩個字，游標會進到旁邊的輸入欄，因為 for 和 id 都是 guest-name。
- 空欄時才看得到「王小明」，一打字提示就消失，旁邊的「姓名」還在。
- 點「保險」兩個字，複選框會勾起，因為控制項包在標籤裡面。

```html
<!-- for 對上 id -->
<!-- 包在 label 裡的控制項，點文字也會作用到它 -->
```

{% note success %}
**換你試試：**
加上「信箱」。標籤點下去要聚焦到這一欄，用 for 對 id，不要只靠空欄提示。
{% endnote %}

<details>
<summary>參考答案</summary>

信箱是獨立欄位，所以有自己的 id。標籤的 for 要跟它完全相同。placeholder 可以不寫。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" placeholder="王小明" />
      </p>
      <p>
        <label for="guest-email">信箱</label>
        <input id="guest-email" name="email" type="email" />
      </p>
      <p>
        <label>
          <input type="checkbox" name="extra" value="insurance" />
          保險
        </label>
      </p>
    </form>
  </body>
</html>
```

</details>

### 表單控制項通用屬性與驗證

欄位共通的屬性決定「送不送得出去」和「能不能改」。格式檢查有一部分跟輸入類型走，這一節先看每種欄位都會用到的那幾個。

**觀念**

- **name**：送出時的欄位名。沒有它，這一欄通常不會出現在網址上。
- **id**：這份文件裡唯一，給標籤的 for 對準。
- **value**：預設值，或選項被選到時要送出的值。
- **readonly**：不能改，仍會送出。**disabled**：不能改，也不會送出。
- **required**：必填。**maxlength**：最多幾個字。

信箱、網址這類類型也會順便檢查格式，空著又沒有設必填時，瀏覽器不會擋。姓名沒填就送出，必填會擋下來。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" required maxlength="20" />
      </p>
      <p>
        <label for="tour-code">團號</label>
        <input id="tour-code" name="code" type="text" value="KYOTO-0830" readonly />
      </p>
      <p>
        <label for="sold-out">已額滿梯次</label>
        <input id="sold-out" name="soldout" type="text" value="8/16 梯" disabled />
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 姓名空著按送出，瀏覽器會擋住，而且這一欄最多 20 個字。
- 團號看得到但不能改，送出後網址裡仍有 code。
- 已額滿梯次也看得到，而且網址裡不會有 soldout。

```html
<!-- required 擋空值；maxlength 限制字數 -->
<!-- readonly 會送出；disabled 不會送出 -->
```

{% note success %}
**換你試試：**
加上「緊急聯絡人」，必填，標籤點下去要聚焦到這一欄。名稱用 emergency。
{% endnote %}

<details>
<summary>參考答案</summary>

緊急聯絡人是獨立欄位，所以有自己的 id 和 name。必填寫在欄位上，不是寫在標籤上。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" required maxlength="20" />
      </p>
      <p>
        <label for="emergency-name">緊急聯絡人</label>
        <input id="emergency-name" name="emergency" type="text" required />
      </p>
      <p>
        <label for="tour-code">團號</label>
        <input id="tour-code" name="code" type="text" value="KYOTO-0830" readonly />
      </p>
      <p>
        <label for="sold-out">已額滿梯次</label>
        <input id="sold-out" name="soldout" type="text" value="8/16 梯" disabled />
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

</details>

### 基本輸入元素（input）

看得到的單行欄位幾乎都是同一顆標籤，差別在 type。類型決定畫面上的控制項，以及瀏覽器要不要順便檢查格式。

**觀念**

文字、信箱、電話、人數、日期和檔案是表單裡常見的類型。其餘類型各自改的是欄位的行為：

- 密碼會遮住字。
- 網址會檢查寫法。
- 搜尋多半帶清除鈕。
- 範圍是滑桿。
- 時間、本機日期時間、月份、週和顏色會換成對應的選擇器；月份和週在各瀏覽器的樣子可能不同，對得到標籤即可。

檔案欄可以加上 accept，用來限制副檔名。下面兩個這一頁的範例沒有用到；要真的上傳，還得回到容器那一節把方法改成 post。

- pattern 用正規表示式檢查。
- multiple 讓人一次選多個檔。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-email">信箱</label>
        <input id="guest-email" name="email" type="email" autocomplete="email" />
      </p>
      <p>
        <label for="guest-tel">電話</label>
        <input id="guest-tel" name="tel" type="tel" />
      </p>
      <p>
        <label for="guest-people">人數</label>
        <input id="guest-people" name="people" type="number" min="1" max="10" value="1" />
      </p>
      <p>
        <label for="guest-date">出發日</label>
        <input id="guest-date" name="date" type="date" />
      </p>
      <p>
        <label for="guest-file">護照影本</label>
        <input id="guest-file" name="file" type="file" accept=".png,.jpg,.pdf" />
      </p>
      <p>
        <label for="guest-pw">查詢密碼</label>
        <input id="guest-pw" name="demoPassword" type="password" />
      </p>
      <p>
        <label for="guest-url">個人頁網址</label>
        <input id="guest-url" name="website" type="url" placeholder="https://" />
      </p>
      <p>
        <label for="guest-search">搜尋行程</label>
        <input id="guest-search" name="q" type="search" />
      </p>
      <p>
        <label for="guest-range">期待指數</label>
        <input id="guest-range" name="score" type="range" min="1" max="5" value="3" />
      </p>
      <p>
        <label for="guest-time">集合時間</label>
        <input id="guest-time" name="time" type="time" />
      </p>
      <p>
        <label for="guest-dt">說明會</label>
        <input id="guest-dt" name="datetime" type="datetime-local" />
      </p>
      <p>
        <label for="guest-month">出發月份</label>
        <input id="guest-month" name="month" type="month" />
      </p>
      <p>
        <label for="guest-week">出發週</label>
        <input id="guest-week" name="week" type="week" />
      </p>
    </form>
  </body>
</html>
```

**解析**

- 信箱若填成沒有 @ 的字就送出，瀏覽器會擋。
- 人數只能在 1 到 10，預設是 1。
- 出發日、集合時間、說明會、月份和週都是選擇器，不是普通打字框。
- 護照影本可以選檔，這一頁不會真的上傳。
- 密碼會遮住。
- 期待指數是一條滑桿，沒有打字的格子。

```html
<!-- 同一顆 input，type 決定控制項 -->
<!-- file 這一頁只選檔，不負責上傳 -->
```

{% note success %}
**換你試試：**
加上「識別色」，類型是 color，預設值用 `#0f766e`。標籤要對得上 id，名稱用 color。
{% endnote %}

<details>
<summary>參考答案</summary>

顏色也是輸入欄，只是類型換成 color。預設值寫在 value，畫面上會先顯示那一個顏色。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-email">信箱</label>
        <input id="guest-email" name="email" type="email" autocomplete="email" />
      </p>
      <p>
        <label for="guest-tel">電話</label>
        <input id="guest-tel" name="tel" type="tel" />
      </p>
      <p>
        <label for="guest-people">人數</label>
        <input id="guest-people" name="people" type="number" min="1" max="10" value="1" />
      </p>
      <p>
        <label for="guest-date">出發日</label>
        <input id="guest-date" name="date" type="date" />
      </p>
      <p>
        <label for="guest-file">護照影本</label>
        <input id="guest-file" name="file" type="file" accept=".png,.jpg,.pdf" />
      </p>
      <p>
        <label for="guest-pw">查詢密碼</label>
        <input id="guest-pw" name="demoPassword" type="password" />
      </p>
      <p>
        <label for="guest-url">個人頁網址</label>
        <input id="guest-url" name="website" type="url" placeholder="https://" />
      </p>
      <p>
        <label for="guest-search">搜尋行程</label>
        <input id="guest-search" name="q" type="search" />
      </p>
      <p>
        <label for="guest-range">期待指數</label>
        <input id="guest-range" name="score" type="range" min="1" max="5" value="3" />
      </p>
      <p>
        <label for="guest-time">集合時間</label>
        <input id="guest-time" name="time" type="time" />
      </p>
      <p>
        <label for="guest-dt">說明會</label>
        <input id="guest-dt" name="datetime" type="datetime-local" />
      </p>
      <p>
        <label for="guest-month">出發月份</label>
        <input id="guest-month" name="month" type="month" />
      </p>
      <p>
        <label for="guest-week">出發週</label>
        <input id="guest-week" name="week" type="week" />
      </p>
      <p>
        <label for="guest-color">識別色</label>
        <input id="guest-color" name="color" type="color" value="#0f766e" />
      </p>
    </form>
  </body>
</html>
```

</details>

### 選擇元素

單選、複選、下拉和建議清單都是「從現成選項裡挑」。單選同一組只能留一項，複選可以多項。

**觀念**

同一組單選必須共用一個 name，再用 value 區分要送出哪一項，預設那一顆加上 checked。複選可以多選；共用名字時，網址上可能出現多筆同名欄位。

下拉選單用 select，每個選項是 option，畫面上的文字和送出的值可以不同。分組寫在選項外面，標籤名是 optgroup。

建議清單仍是可以打字的欄位，欄位用 list 對上 `datalist` 的 id，清單裡沒有的字也可以送出。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label><input type="radio" name="traffic" value="bus" checked /> 巴士</label>
        <label><input type="radio" name="traffic" value="train" /> 火車</label>
      </p>
      <p>
        <label><input type="checkbox" name="extra" value="insurance" /> 保險</label>
        <label><input type="checkbox" name="extra" value="meal" /> 餐食</label>
      </p>
      <p>
        <label for="tour-select">行程</label>
        <select id="tour-select" name="tourId">
          <optgroup label="本島">
            <option value="1">台北城市漫遊</option>
            <option value="2">花蓮山海三日</option>
          </optgroup>
          <optgroup label="離島">
            <option value="3">澎湖跳島</option>
          </optgroup>
        </select>
      </p>
      <p>
        <label for="city-input">想去的城市</label>
        <input id="city-input" name="city" type="text" list="city-list" />
        <datalist id="city-list">
          <option value="台北"></option>
          <option value="花蓮"></option>
          <option value="澎湖"></option>
        </datalist>
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 兩顆單選只能留一顆，因為名字相同。
- 預設勾著第一顆。
- 可以複選的那組能同時勾兩顆。
- 下拉先分成兩組，送出的是選項的值，不一定是畫面上的文字。
- 文字欄可以打字，點下去會列出選項。
- 沒出現在清單裡的字也能送出。

```html
<!-- radio 共用 name 就只能留一項 -->
<!-- select 送出的是 option 的 value -->
<!-- list 對上 datalist 的 id -->
```

{% note success %}
**換你試試：**
在加購裡加一顆「素食」，跟保險、餐食同一組名字，送出值用 veg。
{% endnote %}

<details>
<summary>參考答案</summary>

素食跟保險是同一組加購，name 必須相同，值才用來區分是哪一項。名字若寫成別的，它可以跟餐食同時存在，但也會變成另一組欄位。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label><input type="radio" name="traffic" value="bus" checked /> 巴士</label>
        <label><input type="radio" name="traffic" value="train" /> 火車</label>
      </p>
      <p>
        <label><input type="checkbox" name="extra" value="insurance" /> 保險</label>
        <label><input type="checkbox" name="extra" value="meal" /> 餐食</label>
        <label><input type="checkbox" name="extra" value="veg" /> 素食</label>
      </p>
      <p>
        <label for="tour-select">行程</label>
        <select id="tour-select" name="tourId">
          <optgroup label="本島">
            <option value="1">台北城市漫遊</option>
            <option value="2">花蓮山海三日</option>
          </optgroup>
          <optgroup label="離島">
            <option value="3">澎湖跳島</option>
          </optgroup>
        </select>
      </p>
      <p>
        <label for="city-input">想去的城市</label>
        <input id="city-input" name="city" type="text" list="city-list" />
        <datalist id="city-list">
          <option value="台北"></option>
          <option value="花蓮"></option>
          <option value="澎湖"></option>
        </datalist>
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

</details>

### 文字區域（textarea）

多行文字用 textarea。預設文字寫在開始與結束標籤之間，不是寫在 value 屬性。

**觀念**

rows 和 cols 先給一個大概的高寬，之後外觀交給 CSS。空欄提示同樣不能代替標籤，名稱還是要有，送出時才會出現在網址上。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-note">備註</label>
        <textarea id="guest-note" name="note" rows="3" cols="30"></textarea>
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 備註是一塊可以換行的空白，比單行輸入欄高。
- 標籤點下去會聚焦到這塊。
- 送出後，網址裡的 note 就是你打的那幾行。

```html
<!-- 預設文字放在標籤中間，不放在 value -->
```

{% note success %}
**換你試試：**
加上空欄提示「飲食禁忌、接送地」。提示不是預設送出的內容，沒打字就送出時，這一欄應是空的。
{% endnote %}

<details>
<summary>參考答案</summary>

提示用 placeholder。若把那句話寫在標籤中間，它會變成預設內容，沒改就會被送出去。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-note">備註</label>
        <textarea id="guest-note" name="note" rows="3" cols="30" placeholder="飲食禁忌、接送地"></textarea>
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

</details>

### 按鈕元素

按鈕用 button，而且一定要寫類型。寫在表單裡又沒寫類型的按鈕，預設就是送出。

**觀念**

- **submit**：送出。
- **reset**：重設可改的欄位。
- **button**：留在這一頁，不送出。

送出鈕也可以寫成輸入欄，這一頁用按鈕元素。

{% note info %}
**按 Enter 也會送出**
文字欄按 Enter，通常會觸發這份表單的送出鈕，所以留在這一頁、不送出的那顆，要把類型寫成 button。
{% endnote %}

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" />
      </p>
      <p>
        <button type="submit">送出報名</button>
        <button type="reset">重設</button>
        <button type="button">試算人數（不送出）</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 三顆按鈕裡，只有「送出報名」會把姓名接到網址上。
- 「重設」會清掉可改的欄。
- 「試算人數」沒有反應，因為它的類型不是送出。
- 在姓名欄按 Enter，效果跟按送出一樣。

```html
<!-- 沒寫 type 的 button，在 form 裡會變成送出 -->
```

{% note success %}
**換你試試：**
再加一顆「儲存草稿」。它要留在這一頁，不能變成第二顆送出鈕。
{% endnote %}

<details>
<summary>參考答案</summary>

類型寫成 button。漏寫類型時，它在表單裡會跟「送出報名」做同一件事。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" />
      </p>
      <p>
        <button type="submit">送出報名</button>
        <button type="reset">重設</button>
        <button type="button">試算人數（不送出）</button>
        <button type="button">儲存草稿</button>
      </p>
    </form>
  </body>
</html>
```

</details>

### 表單組織（fieldset、legend）

相關欄位用 fieldset 圈成一組，legend 是這一組的標題。標題會出現在框線上。

**觀念**

組可以再包組：外層包整組欄位，內層再包其中一組選項。legend 不是普通段落，它屬於這一組。禁用可以寫在 fieldset 上，整組都不能改、也不會送出；這一頁先不要禁用整組。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form id="booking-form" action="#" method="get">
      <fieldset>
        <legend>報名資料</legend>
        <p>
          <label for="guest-name">姓名</label>
          <input id="guest-name" name="name" type="text" />
        </p>
      </fieldset>
    </form>
  </body>
</html>
```

**解析**

- 姓名被一個框圍住。
- 框上方的文字屬於這一組，不是頁面上的章標題。
- 開發者工具裡它在這個框裡面。

```html
<!-- legend 是 fieldset 的第一個孩子 -->
```

{% note success %}
**換你試試：**
在姓名下面再圈一組「交通」，裡面放巴士和火車兩顆單選，名字都用 traffic，巴士預設勾選。內層的框要在「報名資料」裡面。
{% endnote %}

<details>
<summary>參考答案</summary>

交通是報名資料裡的一組，所以內層 fieldset 放在外層裡面，不要跟外層並排到表單底下。兩顆單選共用名字，才是同一組。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form id="booking-form" action="#" method="get">
      <fieldset>
        <legend>報名資料</legend>
        <p>
          <label for="guest-name">姓名</label>
          <input id="guest-name" name="name" type="text" />
        </p>
        <fieldset>
          <legend>交通</legend>
          <label><input type="radio" name="traffic" value="bus" checked /> 巴士</label>
          <label><input type="radio" name="traffic" value="train" /> 火車</label>
        </fieldset>
      </fieldset>
    </form>
  </body>
</html>
```

</details>

### progress 與 meter

進度條表示完成了多少，計量則用另一顆標籤，可標出偏低、偏高和理想值。兩者都不是輸入欄。

**觀念**

兩顆標籤看的刻度不一樣：

- `progress` 的 max 是滿額，value 是目前。
- `meter` 另外有 min、low、high、optimum。

標籤中間可以放一段備用文字，給不認得這顆標籤的環境讀；送出時它們通常不會當欄位送走，因為沒有 name。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>名額 <progress max="100" value="40">40%</progress></p>
      <p>
        報名熱度
        <meter min="0" max="100" low="30" high="70" optimum="80" value="60">60</meter>
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 第一條是進度，大約走到四成。
- 另一條是計量，數值 60 落在偏低與偏高之間。
- 按送出，網址上不會多出這兩項，因為它們不是帶名稱的欄位。

```html
<!-- progress 是完成多少；meter 是落在哪個區間 -->
<!-- 兩者都不是輸入欄 -->
```

{% note success %}
**換你試試：**
把名額改成 70，備用文字也改成 70%。熱度那一條先不要動。
{% endnote %}

<details>
<summary>參考答案</summary>

value 和中間的文字一起改。只改其中一邊，不認得進度條的環境會唸到舊的百分比。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>名額 <progress max="100" value="70">70%</progress></p>
      <p>
        報名熱度
        <meter min="0" max="100" low="30" high="70" optimum="80" value="60">60</meter>
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

</details>

# 選讀：SEO 與網站資訊

搜尋引擎和社群網站在畫出頁面之前，會先讀 head 裡的短說明。概念回到第 01 天 {% post_link lokiTech-15day-01-tools %} 的「語意化標籤、無障礙設計與 SEO」：搜尋引擎讀的是文件裡的文字和結構，不是螢幕截圖。這一章可以整節跳過，練習頁是 `pages/12-seo.html`。

**觀念**

人看正文裡的那一行文字。搜尋結果的摘要、分頁上的小圖示、貼到 LINE 或 Facebook 時跳出的預覽卡，都從文件開頭那一區讀走，不會多畫成一段正文。

- **描述**：一兩句話，搜尋結果常摘來當摘要。把它寫成關鍵字堆疊沒有幫助。
- **圖示**：分頁標籤旁邊的小圖，用一條連結指到圖的網址。
- **開放社交關係圖（Open Graph）**：預覽卡用的標題、描述、圖片和這一頁的網址。圖片要寫對方抓得到的完整網址。
- **正規網址（canonical）**：同一篇若有多個網址，標出以哪一個為準。
- **爬蟲（robots）**：要不要把這頁收進搜尋、要不要沿著頁上的連結繼續抓。練習站沒有公開，寫了也不會改變排名，先認得這一行長什麼樣子。

```html 02-html/pages/12-seo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日 · 洛奇旅行</title>
    <!-- 搜尋結果可能摘這一句當摘要，不會畫在頁面上 -->
    <meta
      name="description"
      content="京都三日小團：清水寺、伏見稻荷與嵐山，含兩晚住宿。"
    />
    <!-- 分頁標籤旁邊的小圖示 -->
    <link rel="icon" href="https://placehold.co/32x32/png" />
    <!-- 貼到 LINE 或 Facebook 時，預覽卡讀這四筆 -->
    <meta property="og:title" content="京都三日 · 洛奇旅行" />
    <meta
      property="og:description"
      content="清水寺、伏見稻荷與嵐山，週六早上台北車站集合。"
    />
    <meta property="og:image" content="https://picsum.photos/id/1016/1200/630" />
    <!-- example.com 只是示範網址，不是這門課的網站 -->
    <meta property="og:url" content="https://example.com/trips/kyoto" />
    <!-- 同一篇有多個網址時，告訴搜尋引擎以這一個為準 -->
    <link rel="canonical" href="https://example.com/trips/kyoto" />
    <!-- index：可以收進搜尋；follow：可以沿著頁內連結繼續抓 -->
    <meta name="robots" content="index, follow" />
  </head>
  <body>
    <div>京都三日：清水寺、伏見稻荷與嵐山。含兩晚住宿。</div>
  </body>
</html>
```

**解析**

- 畫面只有正文那一行。
- 分頁標籤顯示文件標題，旁邊可能多一張小圖。
- 圖若暫時載不到，標記仍在文件開頭。
- 描述、預覽卡那四筆、正規網址和爬蟲規則都沒有變成正文裡的第二段。
- 按 <kbd>F12</kbd>，在 Elements 裡點開文件開頭，才對得到每一筆。
- 本機檔案貼到 LINE 或 Facebook，通常不會立刻出現預覽卡，因為對方的伺服器抓不到你電腦裡的檔。
- 課堂先確認 head 裡這幾行都在。

```html
<!-- description：搜尋摘要；icon：分頁上的小圖 -->
<!-- og:title、og:description、og:image、og:url：分享時的預覽卡 -->
<!-- canonical：以哪個網址為準；robots：收不收錄、跟不跟連結 -->
```

{% note success %}
**換你試試：**
描述改成「每週六出發，名額 12 人。」預覽卡標題改成「本週京都小團」，圖片改成 picsum 的 1015。存檔後按 <kbd>F12</kbd> 展開 head，核對這三筆。畫面上那一行留著。
{% endnote %}

<details>
<summary>參考答案</summary>

描述和預覽卡標題換了新句子，預覽圖改指到 1015。這三筆仍在 head，所以畫面還是原來那一行。正規網址和爬蟲那兩行維持示範用的寫法。

```html 02-html/pages/12-seo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日 · 洛奇旅行</title>
    <meta name="description" content="每週六出發，名額 12 人。" />
    <link rel="icon" href="https://placehold.co/32x32/png" />
    <meta property="og:title" content="本週京都小團" />
    <meta
      property="og:description"
      content="清水寺、伏見稻荷與嵐山，週六早上台北車站集合。"
    />
    <meta property="og:image" content="https://picsum.photos/id/1015/1200/630" />
    <meta property="og:url" content="https://example.com/trips/kyoto" />
    <link rel="canonical" href="https://example.com/trips/kyoto" />
    <meta name="robots" content="index, follow" />
  </head>
  <body>
    <div>京都三日：清水寺、伏見稻荷與嵐山。含兩晚住宿。</div>
  </body>
</html>
```

</details>

# 選讀：無障礙

無障礙（accessibility，常縮寫成 a11y）是讓不同身體條件、裝置和情境都還用得了這一頁，只靠鍵盤、暫時受傷或滑鼠壞掉都算在裡面。這一章可以整節跳過；正式規範之後再查 [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)。課堂上先把標籤用對，比先背補充屬性有用。

輔助工具讀的是文件樹和語意，不是你眼睛看到的排版。全是沒有名字的盒子時，它只能唸成一串區塊。練習頁仍是 `pages/11-a11y.html`，下面依檢查點拆開。

{% note info %}
**自己聽一次**
Chrome 按 <kbd>F12</kbd>，在 Elements 旁或按 <kbd>Esc</kbd> 打開的抽屜裡找 Accessibility。點一個元素，看 Name 和 Role。macOS 也可以開旁白聽一次，今天不必當成作業。
{% endnote %}

## 選讀：語言與標題大綱

`html` 的 lang 決定閱讀器怎麼發音，標題則是這份文件的目錄。兩件事都寫在文件本身，不靠後來補上的屬性。

**觀念**

繁體中文寫 zh-Hant。標題則照這份文件的目錄來排：

- 一頁一個主標題，下面接章標題，不要為了字變小跳級。
- 閱讀器可以用標題清單跳到某一節。
- 頁首的招牌不是主標題，主標題是這一頁在做的事。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <header>
      <p>洛奇旅行</p>
    </header>
    <main>
      <h1>報名京都三日遊</h1>
      <h2>注意事項</h2>
      <p>護照效期要超過回國日六個月。閱讀器可以用標題清單跳到這一節。</p>
    </main>
  </body>
</html>
```

**解析**

- 文件宣告是繁體中文。
- 畫面上先是招牌，再來是大標和「注意事項」。
- 招牌是段落，不進標題清單。
- 注意事項是章標題，接在唯一的主標題下面，中間沒有跳級。

```html
<!-- lang 在 html 上 -->
<!-- 一頁一個 h1，h2 接在它下面 -->
```

{% note success %}
**換你試試：**
在注意事項下面加一節「集合方式」，層級跟注意事項相同。不要為了字比較小改用更細的標題。
{% endnote %}

<details>
<summary>參考答案</summary>

兩節都是主標題底下的章，所以都用同一級。改成更細的標題，目錄會少掉這一層。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <header>
      <p>洛奇旅行</p>
    </header>
    <main>
      <h1>報名京都三日遊</h1>
      <h2>注意事項</h2>
      <p>護照效期要超過回國日六個月。閱讀器可以用標題清單跳到這一節。</p>
      <h2>集合方式</h2>
      <p>京都車站中央口，領隊舉牌。</p>
    </main>
  </body>
</html>
```

</details>

## 選讀：圖片的替代文字

內容圖的替代文字要寫出畫面裡的意思。寫「圖片」或檔名等於沒寫。

**觀念**

商標和純裝飾才用空的替代文字，告訴閱讀器略過。空字串和沒寫這個屬性不一樣：沒寫時，有的工具會改唸檔名。說明文字若已經在旁邊的段落裡，而且圖又只是重複那個意思，才考慮留空。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <img src="https://picsum.photos/id/1016/640/360" width="640" height="360" alt="清水寺本堂與參道上的人" />
    <p>
      <img src="https://placehold.co/24x24?text=*" width="24" height="24" alt="" />
      這顆星只是裝飾，替代文字留空。
    </p>
  </body>
</html>
```

**解析**

- 封面圖的替代文字描述的是畫面，不是檔名。
- 星號很小，替代文字是空的。
- 閱讀器會讀封面那句，略過這張星，旁邊的句子仍會被讀到。

```html
<!-- 內容圖寫畫面；裝飾圖 alt 是空字串 -->
```

{% note success %}
**換你試試：**
把裝飾用的星號改成一張內容圖，替代文字寫「伏見稻荷的千本鳥居」。寬和高維持 640 與 360，來源改成另一張占位圖即可。
{% endnote %}

<details>
<summary>參考答案</summary>

星號一旦改成有內容的照片，空的替代文字會讓看不到圖的人失去這張圖的意思，所以要寫出畫面。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <img src="https://picsum.photos/id/1016/640/360" width="640" height="360" alt="清水寺本堂與參道上的人" />
    <p>
      <img src="https://picsum.photos/id/1036/640/360" width="640" height="360" alt="伏見稻荷的千本鳥居" />
    </p>
  </body>
</html>
```

</details>

## 選讀：表單欄位要有名字

沒有標籤的輸入欄，閱讀器可能只唸「編輯文字」。點欄位名稱也該聚焦到那一欄。

**觀念**

標籤用 for 對上 id，或把控制項包在標籤裡。空欄提示填了就消失，不能代替標籤。欄位還要有 name，送出時才帶得走；id 則是給標籤對準，所以兩件事都要有。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" placeholder="王小明" />
      </p>
      <p>
        <label>
          <input type="radio" name="traffic" value="bus" />
          巴士
        </label>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 點「姓名」兩個字，游標會進到同一個輸入欄。
- 空欄時才看得到「王小明」。
- 點「巴士」，單選會選取。
- 兩種關聯都讓欄位有看得到的名字。

```html
<!-- placeholder 不能代替 label -->
<!-- 單選把控制項包進 label -->
```

{% note success %}
**換你試試：**
加上「電話」，for 對上 id，名稱用 tel，類型用 tel。不要只寫 placeholder。
{% endnote %}

<details>
<summary>參考答案</summary>

電話跟姓名一樣是獨立欄位。標籤的文字就是閱讀器要唸的名字。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" placeholder="王小明" />
      </p>
      <p>
        <label for="guest-tel">電話</label>
        <input id="guest-tel" name="tel" type="tel" />
      </p>
      <p>
        <label>
          <input type="radio" name="traffic" value="bus" />
          巴士
        </label>
      </p>
    </form>
  </body>
</html>
```

</details>

## 選讀：連結去別處，按鈕在本頁做事

去別的網址用有 href 的連結，文字寫目的地。在本頁送出、試算、開關，用按鈕。

**觀念**

用一個方塊假裝按鈕，鍵盤的 <kbd>Tab</kbd> 預設走不進去；連結沒有 href，也不在預設的停留順序裡。按鈕一定要寫類型，才不會在表單裡變成送出。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <button type="submit">送出報名</button>
        <button type="button">試算人數</button>
      </p>
    </form>
    <p><a href="05-links.html">看集合方式</a></p>
  </body>
</html>
```

**解析**

- 「送出報名」會把欄位接到網址上。
- 「試算人數」不會。
- 「看集合方式」會換成連結那一頁，文字寫的是目的地，不是「點這裡」。

```html
<!-- 去別頁用 a；本頁試算用 button type="button" -->
```

{% note success %}
**換你試試：**
再加一顆「儲存草稿」，留在這一頁、不會送出表單。不要做成沒有類型的按鈕，也不要做成方塊。
{% endnote %}

<details>
<summary>參考答案</summary>

儲存草稿是本頁動作，用按鈕並寫明類型。若做成沒有 type 的按鈕放在表單裡，它會變成第二顆送出鈕。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <button type="submit">送出報名</button>
        <button type="button">試算人數</button>
        <button type="button">儲存草稿</button>
      </p>
    </form>
    <p><a href="05-links.html">看集合方式</a></p>
  </body>
</html>
```

</details>

## 選讀：資料表要有表頭

資料表要有表名和表頭，標題格用範圍對上欄或列。拿表格把網頁切成左右欄時，閱讀器會把它唸成一份資料表。

**觀念**

表名用 caption。欄名放在 thead，列名放在該列的第一格並寫上 scope，資料格不要冒充標題格。課堂入口那頁用表格切左右欄，只是暫時的選單框架，正式頁不要複製。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <table border="1">
      <caption>京都三日遊價目</caption>
      <thead>
        <tr>
          <th scope="col">行程</th>
          <th scope="col">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">成人</th>
          <td>1600</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

**解析**

- 價目表有表名。
- 欄名與列名都是標題格，數字是資料格。
- 閱讀器可以把這個數字配上同一列的列名和同一欄的欄名，而不是只唸一個數字。

```html
<!-- caption 說明這張表；scope 分欄名與列名 -->
```

{% note success %}
**換你試試：**
加一列「兒童」，單價 800。列名用標題格，並標明這是列名。
{% endnote %}

<details>
<summary>參考答案</summary>

兒童跟成人同一層，都是列名。單價仍是資料格，不要兩個都用標題格。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <table border="1">
      <caption>京都三日遊價目</caption>
      <thead>
        <tr>
          <th scope="col">行程</th>
          <th scope="col">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">成人</th>
          <td>1600</td>
        </tr>
        <tr>
          <th scope="row">兒童</th>
          <td>800</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

</details>

## 選讀：鍵盤走得過整頁

許多人不用滑鼠，所以連結和按鈕可以用 <kbd>Tab</kbd> 移動，再用 <kbd>Enter</kbd> 啟動，按鈕也常用空白鍵。

**觀念**

停留順序預設跟原始碼順序相同，不是跟畫面從左到右的視覺順序。

淺灰字配白底看起來淡，弱視時讀不到；對比是 CSS 的工作，這一頁只用兩句話讓你先看見差別。星號圖和純文字不會停下來，因為它們不是控制項。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" />
      </p>
      <p>
        <button type="submit">送出報名</button>
        <button type="button">試算人數</button>
      </p>
    </form>
    <p><a href="05-links.html">看集合方式</a></p>
    <p style="color: #ccc; background: #fff">這行淺灰字在白底上很難讀。</p>
    <p style="color: #111; background: #fff">這行深色字在白底上分得開。</p>
  </body>
</html>
```

**解析**

- 只按 Tab 時，焦點會依序進入姓名、送出、試算、集合方式的連結。
- 兩句對比文字不會停下來。
- 淺灰那句貼在白底上幾乎看不見，深色那句讀得清楚。
- 內容一樣，差在對比。

```html
<!-- Tab 只停在欄位、按鈕、連結 -->
<!-- 對比是 CSS，這一頁先看見差別 -->
```

{% note success %}
**換你試試：**
在試算後面加一顆「儲存草稿」，類型同樣留在本頁。再只按 Tab 走一輪，確認它排在試算和「看集合方式」之間。
{% endnote %}

<details>
<summary>參考答案</summary>

原始碼裡它寫在試算後面、連結前面，Tab 的順序就跟著這個位置。不要用絕對定位把它搬到畫面別處卻留在原始碼最後面，順序會對不上眼睛看到的位置。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" />
      </p>
      <p>
        <button type="submit">送出報名</button>
        <button type="button">試算人數</button>
        <button type="button">儲存草稿</button>
      </p>
    </form>
    <p><a href="05-links.html">看集合方式</a></p>
    <p style="color: #ccc; background: #fff">這行淺灰字在白底上很難讀。</p>
    <p style="color: #111; background: #fff">這行深色字在白底上分得開。</p>
  </body>
</html>
```

</details>

## 選讀：ARIA 是補充元素說明，不是必要動作

ARIA 用來幫 HTML 本身說不清楚的複雜元件補語意，例如對話框。能用按鈕、導覽、標籤說清楚時，不要先加。

**觀念**

亂加，或跟看得到的文字不一致，閱讀器會更亂，所以第一優先是選對元素。這一頁的試算已經是按鈕，不需要再補一個名字。

{% note info %}
**ARIA 是補充，不是起手式**
先把標籤用對，補充屬性留到元件本身沒有對應的 HTML 時再查。
{% endnote %}

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <p>
      <button type="button">試算人數</button>
    </p>
  </body>
</html>
```

**解析**

- 這顆按鈕的名字就是「試算人數」，角色是按鈕。
- 開發者工具的 Accessibility 面板裡，Name 來自按鈕文字，Role 是 button。
- 沒有額外的 aria-label。

```html
<!-- 看得到的文字就是名字，不必再寫一套 -->
```

{% note success %}
**換你試試：**
不要把試算改成 div 再補 aria-label。維持按鈕，並確認類型是 button，放進表單也不會送出。
{% endnote %}

<details>
<summary>參考答案</summary>

方塊即使補了名字，也不在預設的 Tab 順序裡，空白鍵也不會啟動它。按鈕本身就有角色和名字。

```html 02-html/pages/11-a11y.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <form action="#" method="get">
      <p>
        <button type="button">試算人數</button>
      </p>
    </form>
  </body>
</html>
```

</details>

# 本篇重點回顧

下面只收這篇做過的事。兩章選讀可以整節跳過。

- head 給瀏覽器讀（字元集、手機寬度、分頁標題），body 才是畫面上的內容。
- 區塊盒獨佔一行，行內盒跟文字排；頁首到頁尾改用語意標籤。
- 標題依序往下，正文用段落；連結寫目的地，站內從目前檔案數相對路徑。
- 重要與語氣用有意義的標籤；畫面上要出現標籤符號時，寫成字元實體。
- 清單依有沒有順序來選；圖片要有替代文字，影片和音訊加上控制列。
- 表格寫上表名與表頭；表單每個欄位要有對得上的標籤。
- 課堂的選單加 iframe 只為了對照多頁；正式網站一頁一份文件。

上網查這篇的說法時，用括號裡的英文當關鍵字。

# 專有名詞中英對照

## 認識 HTML 文件

- 標籤（tag）
- 元素（element）
- 表單（form）
- 搜尋引擎優化（search engine optimization）
- 響應式網頁設計（responsive web design）
- 媒體查詢（media query）
- 螢幕閱讀器（screen reader）
- 輔助工具（assistive technology）
- 焦點（focus）
- 語意標籤（semantic element）
- 根元素（root element）
- 文件類型宣告（document type declaration）
- 標準模式（standards mode）
- 語言代碼（language code）
- 字元編碼（character encoding）
- 角色（role）
- 字元集（character set）

## 認識區塊盒

- 區塊盒（block box）
- 區塊元素（block-level element）
- 父層（parent element）
- 外距（margin）
- 行內元素（inline element）
- 行內盒（inline box）
- 置換元素（replaced element）

## 認識常用元素

- 開始標籤（start tag）
- 結束標籤（end tag）
- 屬性（attribute）
- 空元素（void element）
- 開發者工具（DevTools）
- 錨點（fragment）
- 絕對路徑（absolute path）
- 相對路徑（relative path）
- 字元實體（character reference）
- 不換行空白（non-breaking space）
- 無序清單（unordered list）
- 有序清單（ordered list）
- 巢狀清單（nested list）
- 描述清單（description list）
- 替代文字（alternative text）
- 占位圖（placeholder image）
- 表頭（table header）
- 儲存格（table cell）
- 標題格（header cell）
- 欄名（column header）
- 列名（row header）
- 資料格（data cell）
- 儲存格合併（cell spanning）
- 計量（meter）
- 單選（radio button）
- 空欄提示（placeholder）
- 複選框（checkbox）
- 表單控制項（form control）
- 驗證（form validation）
- 正規表示式（regular expression）
- 建議清單（datalist）
- 下拉選單（drop-down list）
- 進度條（progress bar）

## 選讀：SEO 與網站資訊、選讀：無障礙

- 圖示（favicon）
- 開放社交關係圖（Open Graph）
- 正規網址（canonical URL）
- 爬蟲（crawler）
- 旁白（VoiceOver）
- 對比（contrast）
