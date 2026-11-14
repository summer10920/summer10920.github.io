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

這一篇從 HTML 文件的骨架開始，認識區塊與行內的盒子，以及用來標明頁面結構的語意標籤，再依用途學會常用元素：標題、段落、連結、文字、清單、圖片、表格與表單。最後的選讀補上 SEO 網站資訊與無障礙，讓頁面對搜尋引擎與輔助工具也讀得懂。

<!-- more -->

這門課每一篇都從 01 工具篇 fork 的練習專案裡的檔案開始。HTML 與 CSS 這個階段，練習站是左側選單加上 iframe 的頁面，點選單就換右邊的主題頁。這樣排只是方便你快速對照標籤，屬於暫時的課堂設計。正式網站不會這樣組頁。

{% note info %}
**為什麼正式網站不這樣做**
這套「選單換 iframe」只是為了上課方便對照，放到正式網站會在幾個地方吃虧：

- **搜尋引擎優化（SEO）**：搜尋引擎看的是「一個網址對應一份可索引的內容」。點選單時網址不會變，每個主題都沒有自己的網址，外站也沒辦法直接連到某一頁。iframe 裡的標題與主文，搜尋引擎常當成次要內容，甚至讀不完整。
- **響應式網頁設計（RWD）**：同一份版面要能適應手機、平板和桌機。左欄選單加上整頁 iframe，在手機上很容易變成外層一個捲軸、框裡又一個捲軸，選單和內容也很難一起重排。後面要學的媒體查詢、Flex 與 Grid，都是作用在同一份文件的盒子上。
- **無障礙與瀏覽體驗**：螢幕閱讀器等輔助工具要多進一層文件才讀得到內容，比同一頁的頁首與主文難理解。上一頁與書籤也對不到你以為的「子頁」，焦點、縮放和列印同樣常出問題。

正式網站會用語意標籤把整頁結構寫在同一份 HTML 裡；需要多頁時，每頁都是完整的文件，共用的版型之後再交給 CSS 或元件處理。iframe 適合用在嵌入地圖、影片、金流付款這類真正的外部內容，不要拿來當整站選單，專題與之後的正式頁也不要複製這套做法。
{% endnote %}

# 認識 HTML 文件

每一份網頁都是一份 HTML 文件，瀏覽器先讀文件的骨架，才知道這一頁用什麼規則解讀、用哪種語言、標題叫什麼，以及哪些內容要畫在畫面上。這一章依序看文件宣告與根元素、放資訊的 head，以及放內容的 body。在 VS Code 新增 HTML 檔，輸入 `!` 再按 <kbd>Tab</kbd>，就會展開這份骨架，01 工具篇介紹過 Emmet，這是它最常用的縮寫。

## 文件宣告與根元素

瀏覽器讀檔時，最先處理的是第一行的文件宣告，接著是包住整份文件的根元素。這兩者都不會畫在畫面上，卻決定瀏覽器如何解讀後面的所有內容。

**觀念**

- **文件宣告**：寫成 `<!DOCTYPE html>`，必須放在第一行。它要求瀏覽器用現行的 HTML 標準排版；少了它，瀏覽器會退回為了相容舊網頁的「怪異模式（quirks mode）」，排版結果會和預期不同。
- **根元素**：寫成 `<html>`，其他所有元素都包在它裡面。它的語言屬性標明整份文件的語言，繁體中文寫 `zh-Hant`。
- 語言屬性不會翻譯內容，它是給瀏覽器和輔助工具的提示：螢幕閱讀器依它選擇發音，瀏覽器依它判斷要不要提示翻譯，中文字形的挑選也會參考它。把中文頁面標成 `en`，螢幕閱讀器可能改用英文發音去念中文。
- 用 `!` 展開的骨架，語言預設是 `en`，標題預設是 Document，記得改成自己的。

```html 02-html/pages/01-shell.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>洛奇旅行</title>
  </head>
  <body>
    <!-- 第一行的文件宣告與 html 的語言，都不會畫在畫面上 -->
    <div>這一行才是畫面上的內容。</div>
  </body>
</html>
```

**解析**

- 打開頁面，畫面只有一句「這一行才是畫面上的內容。」文件宣告和語言都沒有對應的文字。
- 分頁標籤上的「洛奇旅行」來自 head 裡的標題，不是畫面上的那一句。
- 按 <kbd>F12</kbd> 切到 Elements，最上面能看到文件宣告與帶著語言的根元素，表示它們存在，只是不畫出來。
- 如果把語言改成 `en`，畫面上的中文和分頁標題都不會變，改變的只是瀏覽器與輔助工具拿到的提示。

## head：文件資訊

head 區放的是這份文件的資訊，給瀏覽器、分頁標籤和搜尋引擎讀，不會畫在頁面裡。最基本的三項是字元編碼、手機版面用的視窗設定，以及文件標題。

**觀念**

- **字元編碼**：寫成 `<meta charset="UTF-8" />`，告訴瀏覽器這份檔案用 UTF-8 解讀，中文才不會變成亂碼。它放在 head 的最前面，VS Code 預設存檔的編碼也是 UTF-8。
- **視窗設定**：名稱為 viewport 的 meta。沒有它，手機瀏覽器會先用一個比螢幕寬很多的虛擬寬度排版，再把整頁縮小；寫了寬度等於裝置寬度，才會依手機的實際寬度排版，之後的響應式版面才能運作。
- **文件標題**：寫在 title 裡的文字會出現在分頁標籤與書籤，搜尋結果也常拿它當標題。它跟畫面上的大標是兩件事，可以相關，不必逐字相同。

```html 02-html/pages/01b-shell-head.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <!-- 字元編碼：放在 head 最前面 -->
    <meta charset="UTF-8" />
    <!-- 視窗設定：依裝置寬度排版，initial-scale=1.0 表示不要預先縮放 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 分頁標籤上的文字，不會畫在頁面裡 -->
    <title>京都三日遊 · 行前</title>
  </head>
  <body>
    <div>這是 body 裡的文字，分頁標題不會出現在這裡。</div>
  </body>
</html>
```

**解析**

- 畫面只有 body 裡那一句，沒有編碼名稱，也沒有視窗設定的文字。
- 分頁標籤顯示「京都三日遊 · 行前」，這幾個字只存在於 head。
- 按 <kbd>F12</kbd> 展開 head，才看得到這三行標記，它們的作用發生在瀏覽器內部：解讀檔案、決定版面寬度、替分頁命名。
- 要讓手機實際測試視窗設定的效果，要等到 CSS 的響應式單元才看得出差別，這裡先認得它的位置與用途。

## body：頁面內容

body 區才是畫面上看得到的內容。文字、標題、圖片、表單，都寫在這裡；head 的資訊不會出現在畫面上，body 的內容也不會變成分頁標題。

**觀念**

- 想讓使用者看到的東西，都放進 body。
- body 裡可以寫 HTML 註解：寫成 `<!-- 說明 -->`，給寫程式的人看，瀏覽器會跳過，不會畫出來。
- 標題、段落等有語意的標籤會在後面的章節陸續教，這一節先用 div 放文字。div 是沒有語意的通用盒子，下一章會說明它怎麼佔位置。

```html 02-html/pages/01c-shell-body.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>body：頁面內容</title>
  </head>
  <body>
    <!-- HTML 註解：只在原始碼看得到，畫面上不會出現 -->
    <div>body 裡的文字會畫在畫面上。</div>
    <div>這是第二個 div，會從新的一行開始。</div>
  </body>
</html>
```

**解析**

- 畫面上由上到下是兩行文字，註解沒有畫出來。
- 第二行另起一行，因為 div 預設獨佔一行，下一章會說明。
- 分頁標籤顯示的是 head 裡的標題，不是這兩行的其中一行。

# 認識區塊盒

瀏覽器把每個元素畫成一顆盒子，後面的 CSS 也是在選這些盒子、調整它們的外觀與位置。這一章先看盒子預設怎麼佔位置：區塊、行內、行內區塊三種排法，再看語意標籤怎麼用名字說明每一塊是什麼。

## 區塊與行內

元素依預設的排法，分成區塊與行內兩大類，這一節只比較這兩類，行內區塊留到下一節。

**觀念**

- **區塊元素（block）**：獨佔一行，前後換行，寬度預設撐滿父層，寬度、高度與上下左右外距都有效。標題、段落、清單、表格、表單、頁首、主文等，預設都是區塊。
- **行內元素（inline）**：跟前後文字排在同一行，寬度與高度由內容決定，你設定的寬度與高度無效，上下外距也無效。用來在句子裡標出一小段文字。

盒子可以再裝盒子：外層的區塊決定這一塊佔多大，內層放更小的區塊或行內內容。沒有語意的通用盒子有兩顆：div 是區塊、span 是行內。兩者都沒有語意，有合適的語意標籤時，優先用語意標籤。

{% note info %}
行內元素裡不要放區塊元素，例如 span 裡放 div；段落 p 裡也不能放 div。瀏覽器遇到會自行調整結構，畫面常和你想的不同。
{% endnote %}

```html 02-html/pages/02-box.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>區塊與行內</title>
    <style>
      /* 只為了畫出每顆盒子的邊界，CSS 的寫法下一篇才教 */
      div,
      span {
        border: 1px solid;
      }
    </style>
  </head>
  <body>
    <div>區塊盒 A：自己佔一整行。</div>
    <div>區塊盒 B：不會黏在 A 的後面。</div>

    <div>
      句子裡的
      <span>行內盒</span>
      只包住自己的字，前後的文字繼續同一行。
    </div>
    <div>
      <span>行內盒一</span>
      <span>行內盒二</span>
      兩個行內盒並排在同一行。
    </div>

    <div>
      外層區塊盒：
      <div>內層區塊盒：裝在外層裡面，仍然自己佔一行。</div>
    </div>
  </body>
</html>
```

**解析**

- 每一塊都有一圈框線，那是 head 裡的樣式暫時畫的，只為了讓盒子的邊界看得見。
- 前兩個 div 的框線都拉滿整個寬度，各自佔一行，B 從新的一行開始。
- 第三個 div 的框線也拉滿，但裡面只有「行內盒」三個字被小框包住，小框和前後的句子連在同一行。
- 第四個 div 裡兩個 span 並排在同一行，中間只隔著一個空白。
- 最後的外層 div 裡先有一句話，下面還有一個內層 div，內層的框線畫在外層裡面，表示盒子可以再裝盒子。

## 行內區塊與置換元素

有些元素介於兩者之間：外表跟著文字排在同一行，內部卻能設定寬高。這一節看 inline-block 的排法，以及圖片、輸入欄這類內容由外部決定的元素。

**一覽**

- **inline-block**：跟前後文字排在同一行（像行內），寬度、高度與外距都有效（像區塊）。按鈕 `button` 與輸入欄 `input` 預設就是這種。
- **置換元素**：畫面內容由屬性或類型決定，而不是標籤中間的文字，例如圖片、影片、輸入欄。圖片預設是行內，但因為是置換元素，設定寬高有效。

要查任何一個元素實際的排法，按 <kbd>F12</kbd> 選到該元素，看 Computed 面板裡的 display。

**觀念**

元素的排法由 CSS 的 display 決定，標籤只提供預設值。demo 裡的 class 是替元素取的標記名，CSS 靠它選到指定的元素。這個 demo 用 `display: inline-block` 把行內的 span 改成行內區塊，和預設的 span 並排，看寬度與高度有沒有效；CSS 的寫法下一篇才教，這裡只看結果。

```html 02-html/pages/02b-inline-block.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>行內區塊</title>
    <style>
      /* 只為了畫出邊界並比較寬高有沒有效，CSS 的寫法下一篇才教 */
      div,
      span {
        border: 1px solid;
      }
      .size {
        width: 10rem;
        height: 3rem;
      }
      .as-inline-block {
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <div class="size">區塊盒：寬高有效，獨佔一行。</div>

    <div>
      <span class="size">行內盒：寬高無效</span>
      <span class="size as-inline-block">行內區塊盒一</span>
      <span class="size as-inline-block">行內區塊盒二</span>
    </div>
  </body>
</html>
```

**解析**

- 第一個 div 設了寬 10rem、高 3rem，框線不再撐滿整行，但仍獨佔一行，表示區塊的寬高有效。
- 第二個 div 裡，第一個 span 雖然也寫了同樣的寬高，仍然只有文字那麼大，行內元素不理會寬高。
- 後兩個 span 變成行內區塊，大小都是 10rem × 3rem，並且和前面的行內盒排在同一行。
- 視窗太窄時，最後一顆行內區塊盒會換到下一行，因為它們仍然像文字一樣排，放不下就折行。

## 語意標籤

語意標籤仍然是盒子，只是標籤名稱直接說明這一塊是什麼：頁首、選單、主文、側欄、頁尾。搜尋引擎比較容易理解頁面結構，輔助工具能用它們快速跳到某個區塊，之後改版也比較知道要動哪一塊。

**觀念**

選標籤的方式是先問「這一塊在頁面裡是什麼」，有合適的語意標籤就用它；全都不合適，才用 div 或 span 當通用盒子。下圖左右是同一種版面，左邊整頁都是沒有角色的 div，右邊每一塊都有自己的名字。

![左側整頁都是灰色 div 盒子；右側同樣版面改用 header、nav、main、section、aside、footer 上色區分](assets/images/html-boxes-semantic.png)

**一覽**

- **header**：頁首，放網站名稱、整頁導覽這類引導內容。放在 body 底下時，代表整頁的頁首。
- **nav**：主要的導覽連結區，例如整站選單。不是所有連結都要包 nav，只有主要導覽才需要。
- **main**：本頁的主要內容。一份文件只有一個可見的 main，不要放進頁首、頁尾或側欄裡。
- **section**：主文裡依主題分出來的一區，每個 section 通常有自己的標題。如果只是為了套樣式分一塊，就用 div。
- **article**：能獨立成篇的內容，單獨拿出去仍是完整的一篇，例如一篇文章、一則商品卡片。同一頁可以有多個。
- **aside**：和主文有關、但不是主文本身的補充，例如注意事項、側欄。
- **footer**：頁尾，放版權、聯絡方式。放在 article 或 section 裡時，代表那一塊自己的頁尾；header 也一樣。

這幾個標籤對應到輔助工具的「地標」：頁首、導覽、主要內容、補充、頁尾，使用者可以直接跳到某個區塊，不必一行一行往下聽。

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
          <p>道頓堀與黑門市場，傍晚安排一趟在地小吃。</p>
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

- 畫面由上到下是頁首的一行字與三個選單項目、一個大標、兩篇各有小標與一段介紹的內容、一段注意事項，最後是頁尾。用這個預設樣式看不出各標籤的差別，差別在結構。
- 按 <kbd>F12</kbd> 點 body，下面並列的是 header、main、footer。
- main 裡是兩個 section，各有自己的 h2；第一個 section 裡有兩個 article，各有自己的 h3。
- 兩篇行程各自成篇，所以用 article；「報名前先看」是補充，所以用 aside。
- 選單項目還不是連結，點了不會換頁，連結在後面的連結那一節。

{% mermaid graph LR %}
bodyNode["body"] --> headerNode["header"]
bodyNode --> mainNode["main"]
bodyNode --> footerNode["footer"]
headerNode --> navNode["nav"]
mainNode --> s1["section 本週小團"]
mainNode --> s2["section 報名前先看"]
s1 --> a1["article 京都三日"]
s1 --> a2["article 大阪美食"]
s2 --> asideNode["aside"]
{% endmermaid %}

# 認識常用元素

認完盒子之後，依用途看常用元素。元素由標籤組成：開始標籤與結束標籤把中間的內容包起來。開始標籤上可以寫屬性，格式是「名稱="值"」，用來給這顆元素額外的資訊，例如連結要去哪、圖片從哪裡來。

有些元素沒有結束標籤，也沒有中間的內容，功能幾乎全靠屬性，稱為空元素，例如換行、水平線、圖片、輸入欄。

{% blockquote MDN https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element %}
想確認某個標籤時，搜尋後到 MDN 看官方說明。
{% endblockquote %}

## 標題與段落

標題排出這一頁的層級，段落放正文。下面依序看標題的層級、段落怎麼分，最後是同一段裡的換行和主題之間的分隔線。

### 標題標籤

標題共有六層，從主標題往下是章、節，再往下是更細的小節。標題是用來表示結構，不是用來調字級。

**觀念**

- 一頁一個主標題，通行的做法是只用一個 `h1`，輔助工具和搜尋引擎都靠標題的層級理解頁面大綱。
- 層級要依序往下，不要為了字比較小而跳過中間一層；想要字變小，之後用 CSS 調整。
- 文件標題寫在 head，出現在分頁標籤；畫面上的大標才是 `h1`，兩者相關但不必逐字相同。

```html 02-html/pages/04-headings.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 分頁標籤上的文字；畫面上的大標是下面的 h1 -->
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

- 分頁標籤寫的是「京都三日遊 · 行前」，頁面最上面的大字是「京都三日遊」，兩者來自不同標籤。
- 「第一天」比大標小，「集合」到「工作人員手機」一級比一級小，每一級都接在上一級後面，沒有跳級。
- 「費用包含」回到第二層，和「第一天」並列，表示開始新的一章。

### 段落標籤

正文用段落，一段只放一個意思。段落裡的文字會依視窗寬度自己換行，不必在句子中間按 Enter 去斷行。

**觀念**

瀏覽器會在段與段之間留出空隙，所以不要用連續換行去排版。標題和段落是前後相接的兄弟元素，標題不能放進段落裡。

```html 02-html/pages/04b-paragraph.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>段落</title>
  </head>
  <body>
    <h1>京都三日遊</h1>
    <p>這一頁是行前說明。大標只用一個，下面依行程層級往下排。</p>
    <h2>費用包含</h2>
    <p>兩晚住宿、早餐、清水寺與伏見稻荷的導覽。</p>
    <p>機場到市區的交通請自己買票。視窗變窄時，這一段的文字會自己換行。</p>
  </body>
</html>
```

**解析**

- 大標下面先有一段說明，再進入「費用包含」。
- 「費用包含」下面有兩個段落，中間有空隙，因為每個 p 都是獨立的區塊。
- 把視窗拉窄，第二段的文字會在段落寬度內折行，段與段的空隙還在。

### 換行與分隔

同一段裡一定要斷行，或兩個主題要在內容上切開時，用這一節的兩個空元素。

**一覽**

- **br**：在段落中間換行，換行後仍屬同一段。適合換行本身就是內容的地方，例如地址、詩句；不要拿來撐出間距。
- **hr**：表示主題轉換的分隔線，預設畫成一條水平線。它代表內容的段落轉折，不是裝飾線，裝飾用 CSS。

```html 02-html/pages/04c-br-hr.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>換行與分隔</title>
  </head>
  <body>
    <h1>京都三日遊</h1>
    <h2>第一天：抵達與清水寺</h2>
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

- 第一個段落在畫面上變成兩行，第二行是換行後面那句。
- 在開發者工具裡，這兩行仍在同一個 p 裡，中間是換行。如果拆成兩個 p，中間就會多出段落空隙。
- 水平線在兩章之間，線上下是兩個不同的主題。

{% note warning %}
**過時的外觀標籤**
`center`、`font`、`marquee`（跑馬燈）這類只管外觀的標籤，現代標準已經淘汰，不要使用。置中、字體、捲動效果都交給 CSS。
{% endnote %}

## 連結

可點的文字用 a 元素，要去的地方寫在 href 屬性裡；沒有 href 的 a 只是佔位，不是真正可點的連結。這一節先看目的地有哪幾種、怎麼開啟，下一節再看路徑怎麼數。

### 目的地與開啟方式

連結中間的文字要看得出會去哪裡，不要只寫「點這裡」，螢幕閱讀器會把連結列成清單，只剩「點這裡」就無從分辨。

**一覽**

- 站內其他頁：href 寫檔案路徑，例如 `04-headings.html`。
- 同一頁的某個位置（錨點）：href 寫 `#` 加上目標元素的 id，目標元素要有同名的 id 屬性。
- 外站：href 寫完整網址，以 `https://` 開頭。
- 寄信：href 以 `mailto:` 開頭，接信箱位址。
- 打電話：href 以 `tel:` 開頭，接電話號碼，國碼格式如 `+886`。

**觀念**

沒有指定開啟方式時，連結在目前這個視窗裡換頁或捲動。要開新分頁，在 a 上加 `target="_blank"`。

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
    <p>下面五個連結的目的地各不相同，連結文字要讓人看得出會去哪裡。</p>
    <p><a href="04-headings.html">看行前標題那一頁</a></p>
    <p><a href="#gather">跳到本頁的集合說明</a></p>
    <p>
      <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a" target="_blank">
        開新分頁看 MDN 的連結說明
      </a>
    </p>
    <p><a href="mailto:hello@example.com">寫信給洛奇旅行</a></p>
    <p><a href="tel:+886212345678">打電話給客服 02-1234-5678</a></p>
    <section id="gather">
      <h2>京都車站中央口</h2>
      <p>領隊會在中央口的時鐘下方舉牌。請看牌子上的團名「京都三日」，不要跟到隔壁的購物團。</p>
      <p>建議提前二十分鐘到。車站裡有兩座時鐘，請認銀色、面對八條口的那一座。</p>
      <p>遲到超過十五分鐘，隊伍會先移動到月台。請改撥頁面上的客服電話，不要自己叫車去清水寺。</p>
      <p>回程同樣在這個出口解散。護照請放在隨身包，不要放進行李箱。</p>
      <p><a href="#top">回到頁首</a></p>
    </section>
  </body>
</html>
```

**解析**

- 頁面上方有五個連結。第一個指向同資料夾的檔案，沒有指定新分頁，所以在目前這個視窗換頁。
- 第二個只換位置不換檔：頁面捲到 id 為 gather 的那一區。頁面比視窗矮時，沒有東西可捲，看起來不會有動作；視窗夠小、內容夠長時才看得出來。
- 第三個因為 `target="_blank"`，會開新分頁，原來這一頁保持不動。
- 信箱那一個會交給電腦上設定好的郵件程式；電話那一個在手機上會進撥號畫面，桌機上多半沒有反應，這是裝置的差別，不是寫錯。
- 最下面的「回到頁首」指向 h1 的 id，點了捲回最上面。

{% note info %}
**開新分頁的 rel**
`target="_blank"` 的連結常看到寫成 `rel="noopener noreferrer"`。noopener 讓新分頁拿不到原頁的控制權，現行的瀏覽器遇到 `_blank` 已預設套用；noreferrer 另外讓目的地收不到你這一頁的網址。舊教學與別人的程式碼常有這個寫法，看到時知道它的用途即可。
{% endnote %}

### 絕對路徑與相對路徑

連結和圖片都要告訴瀏覽器檔案在哪裡，寫法有兩種：從固定的起點算，或從目前這份 HTML 所在的位置算。兩者的差別在於起點，兩種寫法的連結與圖片都通用。

**一覽**

- **絕對路徑**：不管目前檔案在哪，從固定起點算。外站就是完整的 https 網址；自己的站也能寫完整網址，但網域一改就得全部修改。
- **相對路徑**：從目前這份 HTML 所在的資料夾算。同一層只寫檔名，進子資料夾就在前面加資料夾名稱，`../` 表示回到上一層。

**觀念**

以斜線開頭的路徑是從網站根目錄算起，但直接開檔和透過伺服器開檔，根目錄的位置不同，同一個連結在兩種環境可能指到不同地方。所以站內的連結一律寫相對路徑，只有外站才寫絕對路徑。

{% note info %}
**為什麼入口常叫 index.html**
網頁伺服器收到「只要這個資料夾、網址沒寫檔名」的請求時，通常會回傳 `index.html`。所以一個資料夾的入口習慣用這個檔名。
{% endnote %}

```html 02-html/pages/05c-links-path.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>路徑怎麼數</title>
  </head>
  <body>
    <h1>路徑怎麼數</h1>
    <p>這份檔案放在 pages 資料夾，下面三個連結都從這個資料夾出發。</p>
    <!-- 同一層只寫檔名 -->
    <p><a href="04-headings.html">同一層：標題那一頁</a></p>
    <!-- ../ 回到上一層，再找 index.html -->
    <p><a href="../index.html">上一層：練習站首頁</a></p>
    <!-- 外站寫完整網址，不從目前資料夾數 -->
    <p>
      <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a">完整網址：MDN 的連結說明</a>
    </p>
  </body>
</html>
```

**解析**

- 第一個連結只寫檔名，瀏覽器就在 pages 資料夾裡找 04-headings.html。
- 第二個連結要先回到 pages 的上一層，才找得到 index.html。只寫檔名的話，瀏覽器會在 pages 裡找，那裡沒有這個檔案。
- 第三個連結不管目前在哪個資料夾，點下去直接前往 MDN。
- 三個連結都沒有指定開啟方式，所以都在目前這個分頁裡換頁。

## 文字

這一節看文字本身怎麼標記。每個文字標籤都有它的意思，選標籤是在說「這段字是什麼」，外觀則留給 CSS。依序是強調與修訂、選讀的外觀標籤、字元實體、程式碼顯示和引用，最後是選讀的縮寫、時間、聯絡與摺疊。

### 語意化強調標籤

同一個句子用 strong 標記，或只是把它變粗，畫面看起來可能一樣，但標籤說出了這段字的作用。程式與輔助工具靠標籤辨識意思，所以先選有意義的標籤。

**一覽**

- 強調：**strong** 表示內容重要、嚴重或緊急，預設粗體；**em** 表示語氣上的強調，換個字強調就會讓句子的意思改變，預設斜體。
- 標示：**mark** 標出此刻值得注意的字，例如搜尋結果裡的關鍵字，預設黃色底色。
- 修訂：**del** 表示被刪掉的內容，**ins** 表示後加入的內容，預設分別是刪除線與底線，通常成對出現，表示這段文字被改過。

**觀念**

選標籤看意思，不看外觀。不能看錯的句子用 strong，舊寫法改成新寫法用 del 與 ins。只想讓字變粗或變斜，就不該用這些標籤，而是用 CSS 調整。

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
    <p>這趟是<em>自由行</em>，集合時間請自己抓準。</p>
    <p>今日請認準集合點 <mark>京都車站中央口</mark>。</p>
    <p>原價 <del>2000</del> 元，早鳥現價 <ins>1600</ins> 元。</p>
  </body>
</html>
```

**解析**

- 護照那一句是粗體，自由行是斜體，集合點有黃色底色。
- 價格那一行，2000 有刪除線、1600 有底線，讀起來就是舊價換成新價。
- 按 F12 開啟開發者工具檢查這幾句，看到的是 strong、em、mark、del、ins 這些標籤名，粗體、斜體只是瀏覽器的預設樣式。

### 選讀：外觀效果標籤

b、i、u、s、small 在舊版 HTML 是調外觀的標籤，HTML5 起各自有了明確的意思，不再當作樣式工具；sub 與 sup 則是排版上的上下標。要純粹改變外觀請用 CSS，見 {% post_link lokiTech-15day-03-css %}。

**一覽**

- **b**：引起注意，但不加強重要性，例如摘要裡的關鍵字、評論裡的產品名。
- **i**：另一種聲音或語調，例如外文詞、專業術語、內心獨白。
- **u**：不靠文字說明的標註，例如中文的專名號（人名、地名底下的線）或標出錯字。預設的底線容易被誤認為連結，使用前要想過。
- **s**：內容已不正確或不再適用，只是劃掉。和 del 的差別是：del 表示文件被修改過，s 沒有這個意思。
- **small**：附帶說明或小字，例如免責聲明、價格備註。
- **sub** 與 **sup**：下標與上標，用在化學式、次方這類排版慣例。

```html 02-html/pages/06b-text-appearance.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>b、i、u、s、sub、sup、small</title>
  </head>
  <body>
    <h1>其他文字標籤</h1>
    <p>旅客評價提到最多的是 <b>早餐</b> 與 <b>交通</b>。</p>
    <p>日文用餐前會說 <i lang="ja">いただきます</i>，意思是開動了。</p>
    <p>中文的專名號會在地名底下畫線，例如 <u>京都</u>。</p>
    <p>優惠方案：<s>早鳥價至 7 月底</s>，目前已恢復原價。</p>
    <p>水的化學式是 H<sub>2</sub>O，房間面積約 30 m<sup>2</sup>。</p>
    <p><small>以上價格未含機場接送。</small></p>
  </body>
</html>
```

**解析**

- 兩個關鍵字是粗體，日文是斜體，京都有底線。這個底線不是連結，點了沒有反應。
- 早鳥價被劃掉，畫面上和 del 很像，但標籤表達的是「已不適用」，不是「這段被改過」。
- 化學式的 2 縮小並沉到基線下面，面積的 2 縮小並抬高；附註比正文小。
- b 和 strong 在畫面上都是粗體，意思不同：b 只是讓關鍵字醒目，strong 表示這段內容重要。

{% note info %}
**已被標準淘汰的外觀標籤**
big、font、center 這類純外觀的標籤已被標準淘汰，舊網頁還看得到，新寫的頁面不要使用，外觀一律交給 CSS。
{% endnote %}

### 符號實體化

HTML 用角括號辨認標籤，用和號辨認字元實體。字元實體是以和號開頭、分號結尾的代碼，瀏覽器會把它換成對應的符號，所以要在畫面上顯示這些符號時，就要改寫成實體。

**一覽**

- 常要改寫的三個符號：`&lt;` 是小於號，`&gt;` 是大於號，`&amp;` 是和號。
- `&nbsp;` 是不會被拆開換行的空白，常用在數字和單位之間。
- `&copy;` 是版權符號。

**觀念**

檔案使用 UTF-8 編碼時，版權符號和中文都可以直接輸入，不必寫成實體。必須寫成實體的是小於號與和號，否則瀏覽器會當成標籤或實體的開頭；大於號習慣一併改寫，不換行空白也沒有別種打法。空白不要拿來排版，版面的間距交給 CSS。完整的清單見 [MDN 的字元參考](https://developer.mozilla.org/en-US/docs/Glossary/Character_reference)。

```html 02-html/pages/06c-text-entity.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>字元實體</title>
  </head>
  <body>
    <h1>畫面上的符號</h1>
    <p>小於號寫成 &lt;，大於號寫成 &gt;。</p>
    <p>公司名寫成洛奇 &amp; 夥伴，畫面上會看到和號。</p>
    <p>要讓畫面印出 &amp;lt; 這四個字元，連和號也要寫成實體。</p>
    <p>手提行李以 7&nbsp;kg 為限，數字和單位不會被拆成兩行。</p>
    <p>&copy; 2026 洛奇旅行</p>
  </body>
</html>
```

**解析**

- 前兩行在畫面上出現小於號、大於號和和號，原始碼比畫面上的字更長。
- 第三行的原始碼是和號、amp、分號，再接 lt 與分號，所以畫面上看到的是 `&lt;` 這四個字元，不是小於號。
- 把視窗拉得很窄，「7 kg」仍會黏在一起，不會斷在 7 和 kg 之間。
- 最後一行出現版權符號。

### 程式碼顯示

程式碼、按鍵、程式印出的訊息和變數名稱，各有對應的標籤。顯示標籤本身時，要用前一節的字元實體寫小於號與大於號。

**一覽**

- **code**：行內的一小段程式碼，或標籤名稱。
- **pre**：預先格式化的區塊，保留空白與換行。多行程式碼通常用 pre 包住 code。
- **kbd**：使用者要按的鍵。組合鍵每個鍵各用一個 kbd，中間用加號連接。
- **samp**：程式或系統印出來的範例訊息。
- **var**：變數名稱，預設斜體。

```html 02-html/pages/06d-text-code.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>程式與按鍵</title>
  </head>
  <body>
    <h1>程式與按鍵</h1>
    <p>開發者工具按 <kbd>F12</kbd>，儲存檔案按 <kbd>Ctrl</kbd> + <kbd>S</kbd>。</p>
    <p>人數 <var>n</var> 乘以單價 <var>price</var> 就是總價。</p>
    <p>送出成功時，畫面出現 <samp>報名成功</samp>。</p>
    <p>行內的標籤要寫成文字：<code>&lt;div&gt;</code>。</p>
    <pre><code>&lt;p&gt;
  pre 會保留換行與縮排。
&lt;/p&gt;</code></pre>
  </body>
</html>
```

**解析**

- 按鍵、「報名成功」和行內標籤都用等寬字型，變數 n 與 price 則是斜體。
- 組合鍵 Ctrl 與 S 各是獨立的 kbd，中間的加號只是一般文字。
- 畫面上看到的是小於號、div、大於號這五個字元，而不是一個真正的區塊。
- 最後的 pre 區塊保留了三行的換行，第二行的縮排也在。

### 引用與引言

引用別人的話有兩個標籤，依長短選擇；被引用的作品或來源名稱則用 cite。

**一覽**

- **q**：行內的短引用，瀏覽器會依頁面語言自動加上引號，原始碼不必自己打引號。
- **blockquote**：獨立成塊的長引用，預設會縮排。
- **cite**：作品或來源的名稱，預設斜體。

**觀念**

q 和 blockquote 都能用 cite 屬性放來源的網址。網址是給機器讀的，畫面上看不到；cite 標籤包住的名稱才是給人讀的。blockquote 裡只放被引用的話，來源名稱寫在它的外面。

```html 02-html/pages/06e-text-quote.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>引用</title>
  </head>
  <body>
    <h1>引用</h1>
    <p>行前信寫過：<q cite="https://example.com/notice">行李不超過 7 公斤。</q></p>
    <blockquote cite="https://example.com/notice">
      <p>自由活動時請在約定時間回到集合點，不要單獨脫隊。</p>
    </blockquote>
    <p>出處：<cite>洛奇旅行行前須知</cite></p>
  </body>
</html>
```

**解析**

- 短引用的左右出現引號，這是瀏覽器加上的，原始碼裡沒有。
- 長引用整段向內縮排，下面另一行才是出處的名稱。
- 兩個網址都寫在屬性裡，畫面上不會多出網址。

### 選讀：縮寫、時間、聯絡、摺疊

縮寫、日期時間、聯絡資訊和可展開的內容，各有對應的標籤。這四個標籤用得不多，需要時再用即可。

**一覽**

- **abbr**：縮寫，全名寫在 title 屬性，滑鼠停上去才看得到。
- **time**：日期或時間，畫面上可以寫中文，機器讀的是 datetime 屬性。
- **address**：這個頁面或這篇文章的聯絡資訊，不是拿來標記任意一個地址。
- **details**：可摺疊的區塊，裡面的 summary 是標題，點了才展開其他內容。

```html 02-html/pages/06f-text-abbr.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>縮寫、時間、聯絡與摺疊</title>
  </head>
  <body>
    <h1>縮寫、時間與聯絡</h1>
    <p>
      <abbr title="HyperText Markup Language">HTML</abbr>
      是這一課的標記語言，交通用
      <abbr title="日本鐵路">JR</abbr>。
    </p>
    <p>
      出發日 <time datetime="2027-03-20">2027 年 3 月 20 日</time>，
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

- HTML 與 JR 有虛線底線，滑鼠停上去會顯示全名。
- 日期和時間在畫面上是中文寫法；屬性裡則是機器讀的格式，日期為年-月-日，時間為 24 小時制。中文不要寫進屬性。
- 聯絡資訊用換行分成三行，預設是斜體。
- 摺疊那一則一開始只看得到標題，點了標題才展開下面的內容。

## 清單

清單把相關的項目組成一組，瀏覽器和輔助工具才知道這些項目屬於同一份。不要用一行行文字加符號假裝清單。依項目之間有沒有先後，分成無序與有序兩種，再看巢狀清單，最後是選讀的描述清單。

**一覽**

- **ul**：無序清單，項目沒有先後，對調順序也不影響意思。
- **ol**：有序清單，項目有先後，例如步驟，瀏覽器自動編號。
- **li**：ul 與 ol 裡的每一個項目。
- **dl**：描述清單，名詞對上說明，沒有圓點也沒有編號。

### 無序清單

沒有先後的項目用無序清單。

**觀念**

項目一定要包在 li 裡，不能把文字直接放在清單上。瀏覽器預設在每一項前面加圓點，圓點屬於外觀，之後可以用 CSS 拿掉，清單的意義不變。網站的選單常用它，表示這一區是一串項目。

```html 02-html/pages/07-lists.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>無序清單</title>
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

- 三個項目前面各有一個圓點。
- 「藥品」和「護照」對調，意思不變，這就是適合用無序清單的判準。
- 在開發者工具裡，清單的直接子層是項目，文字在項目裡面。

### 有序清單

有先後的步驟用有序清單，瀏覽器會自動編號。

**觀念**

項目同樣包在 li 裡。編號由瀏覽器依順序產生，增減步驟時會自動重排，所以不要自己在文字前面打數字。預設從 1 開始，以下三個屬性可以改變編號。

- **start**：起始編號，例如 `start="3"` 從 3 開始數。
- **reversed**：倒數，編號從項目總數往下數到 1。
- **type**：編號樣式，可設 1、a、A、i、I；純外觀的調整一般交給 CSS。

```html 02-html/pages/07b-lists-ol.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>有序清單</title>
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

- 畫面上出現 1、2、3，原始碼裡沒有這些數字。上面三個屬性這一份沒有用到，預設就是從 1 往上數。
- 把前兩項對調，變成先過安檢再托運行李，步驟就錯了，所以這一份要用有序清單。

### 巢狀清單

清單裡的某一項還有子項目時，就在那一項裡再放一層清單。

**觀念**

內層清單要寫在外層某一個 li 之中，表示「這一項底下還有哪些」，和其他項目並排會變成不合法的結構。內層可以是無序，也可以是有序。

```html 02-html/pages/07c-lists-nested.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>巢狀清單</title>
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

- 外層三項是圓點，「充電器」底下縮進一層，只有「轉接頭」一項，預設符號會換成空心圓。
- 在開發者工具裡，內層清單位在「充電器」那個項目之中，不是外層清單的直接子層。

### 選讀：描述清單

名詞對上說明的資料，例如詞彙表，用描述清單。

**觀念**

dt 是名稱，dd 是說明，一個名稱可以對應多段說明。dt 與 dd 直接放在清單裡，中間不用再包一層 li。

```html 02-html/pages/07d-lists-dl.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>描述清單</title>
  </head>
  <body>
    <h1>名詞</h1>
    <dl>
      <dt>標籤</dt>
      <dd>用角括號包住的標記，例如 p 是段落。</dd>
      <dt>屬性</dt>
      <dd>寫在開始標籤裡的設定，例如連結的 href。</dd>
      <dd>寫法是名稱加等號，再加雙引號包住的值。</dd>
    </dl>
  </body>
</html>
```

**解析**

- 畫面上沒有圓點，也沒有編號；名稱各自獨立一行，說明向內縮進。
- 「屬性」底下有兩段說明，兩個 dd 都屬於同一個 dt。

## 多媒體

圖片、影片、音訊與嵌入的另一份文件，都靠標籤上的屬性指向外部檔案，標籤中間通常沒有可見的內容。圖片是網頁最常用的媒體，所以這一節把替代文字、尺寸與載入方式講清楚；影音與嵌入文件放在選讀。示範用的圖檔來自 [placehold.co](https://placehold.co/)（可指定尺寸與文字的占位圖），以及直接寫在 src 裡的內嵌 SVG 圖，都不必放進專案資料夾；占位圖需要網路，沒有網路時載不進來，替代文字就會顯示在原位。

### 圖片與替代文字

圖片是空元素，來源和替代文字都寫在標籤上。替代文字（alt）是圖片的文字版本：圖載不出來、讀者用螢幕閱讀器（把畫面唸出來的輔助軟體）或搜尋引擎讀頁面時，看到的就是它。

**觀念**

alt 屬性一定要寫，寫什麼則看這張圖在頁面裡扮演的角色：

- 傳達資訊的圖：寫出圖的內容，讀的人不必看圖也知道重點。不要寫「圖片」「照片」，也不要寫檔名。
- 純裝飾的圖：寫成 `alt=""`，屬性要在、值留空，輔助軟體就會略過它。整個省略 alt 則不同，閱讀器可能把檔名唸出來。
- 圖片當連結或按鈕：寫出點下去會去哪裡或做什麼，不是描述圖的外觀。
- 圖裡有文字：把那些文字寫進 alt。

把有資訊的圖寫成 `alt=""` 是常見的誤用，等於告訴讀者這裡什麼都沒有。

```html 02-html/pages/08-media.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>圖片與替代文字</title>
  </head>
  <body>
    <h1>圖片與替代文字</h1>
    <h2>資訊圖：alt 寫出畫面的內容</h2>
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23bde0fe'/%3E%3Ccircle cx='320' cy='60' r='28' fill='%23ffd166'/%3E%3Cpath d='M0 225 110 80 220 225z' fill='%23588157'/%3E%3Cpath d='M140 225 270 110 400 225z' fill='%233a5a40'/%3E%3C/svg%3E" width="400" height="225" alt="藍天下有太陽與兩座綠色的山" />
    <h2>裝飾圖：alt 留空</h2>
    <img src="https://placehold.co/400x20/ccc/ccc" width="400" height="20" alt="" />
    <h2>圖片當連結：alt 寫出去哪裡</h2>
    <a href="https://placehold.co/">
      <img src="https://placehold.co/160x48?text=placehold.co" width="160" height="48" alt="前往 placehold.co 首頁" />
    </a>
  </body>
</html>
```

**解析**

- 第一張是一幅簡單的風景插圖，alt 描述畫面內容；想看 alt 的樣子，可以把 src 改成不存在的網址，圖會載入失敗，原位顯示這段文字。
- 第二張是一條灰色細線，只是分隔用的裝飾，alt 留空，沒有任何文字會出現。
- 第三張是被連結包住的小圖，alt 寫的是「前往 placehold.co 首頁」，也就是這個連結的去向。
- 三張圖都寫了 width 與 height，原因在「圖片尺寸與延遲載入」一節。

### 圖片與說明

有些圖需要一行說明文字，搬到別的位置時也要一起走。figure 用來包住這種自成一體的內容，figcaption 放說明。

**觀念**

figure 不限於圖片，程式碼、引言、圖表都可以包。figcaption 是給所有人看的說明；alt 則是給看不到圖的人，兩者各有對象，不必逐字相同，也不要把同一句話寫兩次。

```html 02-html/pages/08b-media-figure.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>圖片與說明</title>
  </head>
  <body>
    <h1>圖片與說明</h1>
    <figure>
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23bde0fe'/%3E%3Ccircle cx='320' cy='60' r='28' fill='%23ffd166'/%3E%3Cpath d='M0 225 110 80 220 225z' fill='%23588157'/%3E%3Cpath d='M140 225 270 110 400 225z' fill='%233a5a40'/%3E%3C/svg%3E" width="640" height="360" alt="藍天下有太陽與兩座綠色的山" />
      <figcaption>圖 1：範例風景插圖，由程式碼直接繪製</figcaption>
    </figure>
    <p>圖與說明綁在同一個 figure，搬到別處時會一起走。</p>
  </body>
</html>
```

**解析**

- 畫面上圖片在上，下面緊跟著「圖 1」那一行說明，兩者在同一個區塊裡。
- 說明沒有重複 alt 的內容，說明講的是這張圖的來歷，alt 講的是畫面裡有什麼。
- 瀏覽器預設會給 figure 左右內縮，所以圖比一般段落稍微靠內；這是預設樣式，之後用 CSS 調整。

### 圖片尺寸與延遲載入

圖還沒載入時，瀏覽器不知道它有多大，載入完才把下面的內容往下推，畫面就會跳動。把圖檔的原始寬高寫在 width 與 height，瀏覽器就能先算好比例、預留位置。

**觀念**

width 與 height 寫的是圖檔本身的像素尺寸，只寫數字、不加單位。之後用 CSS 縮放圖片時，比例仍會依這兩個數字維持，所以不必為了縮放而省略它們。

另一個屬性 loading 控制何時載入：寫 `lazy` 表示圖離視窗還遠時先不載，捲近了才載；預設值 `eager` 是立刻載入。一進頁面就看得到的圖不要用 lazy，否則會讓最重要的圖變慢出現。

```html 02-html/pages/08c-media-size.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>圖片尺寸與延遲載入</title>
  </head>
  <body>
    <h1>圖片尺寸與延遲載入</h1>
    <img src="https://placehold.co/640x800?text=1" width="640" height="800" alt="第 1 張占位圖，寫著 1" />
    <img src="https://placehold.co/640x800?text=2" width="640" height="800" alt="第 2 張占位圖，寫著 2" loading="lazy" />
    <img src="https://placehold.co/640x800?text=3" width="640" height="800" alt="第 3 張占位圖，寫著 3" loading="lazy" />
    <img src="https://placehold.co/640x800?text=4" width="640" height="800" alt="第 4 張占位圖，寫著 4" loading="lazy" />
  </body>
</html>
```

**解析**

- 四張圖都有寬高，所以還沒載入時，每一張都已經佔好 640×800 的位置，捲動條的長度不會在載入途中改變。
- 第一張在視窗最上方，維持預設的立刻載入；後三張標了 lazy。
- 在 DevTools 的 Network 面板重新整理頁面，視窗不高時，後面的圖要往下捲到接近才出現請求；提前多遠載入由瀏覽器決定，視窗很高時也可能一次全載。
- 四張圖都是 640 像素寬，若視窗比 640 窄會出現橫向捲軸，因為還沒有 CSS 讓圖跟著縮小。

### 選讀：響應式圖片

同一張圖在小螢幕和高解析度螢幕上需要的檔案大小不同。響應式圖片讓瀏覽器從多個檔案裡挑最合適的一個，而不是所有人都下載最大的那張。

#### srcset 與 sizes

srcset 列出同一張圖的多個版本與各自的檔案寬度，後面加 `w`；sizes 告訴瀏覽器這張圖在版面上實際會顯示多寬。瀏覽器把顯示寬度乘上螢幕的像素密度，再從清單裡挑夠用的最小檔。src 是不支援時的備用來源。

```html 02-html/pages/08d-media-srcset.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>srcset 與 sizes</title>
  </head>
  <body>
    <h1>srcset 與 sizes</h1>
    <img
      src="https://placehold.co/400x225?text=400w"
      srcset="
        https://placehold.co/400x225?text=400w   400w,
        https://placehold.co/800x450?text=800w   800w,
        https://placehold.co/1200x675?text=1200w 1200w
      "
      sizes="800px"
      width="800"
      height="450"
      alt="三種寬度的占位圖，圖上的文字就是被選中的檔案寬度"
    />
  </body>
</html>
```

**解析**

- 圖上寫的文字就是被選中的版本。顯示寬度是 800，一般螢幕需要 800 像素，所以通常看到 800w。
- 像素密度為 2 的螢幕（如多數 Mac 筆電）需要 1600 像素，清單裡沒有那麼大的，就挑最大的 1200w。
- sizes 要寫成圖實際顯示的寬度。這份頁面沒有 CSS，所以顯示寬度就是 width 屬性的 800；版面有彈性時，常寫成跟視窗寬度有關的值，這屬於 CSS 之後的內容。

#### picture 與圖片格式

picture 包住多個 source 與一個 img。瀏覽器由上往下，挑第一個自己看得懂的 source；都不行才用 img。常見用途是提供較新、檔案較小的格式，例如 AVIF、WebP，舊瀏覽器則退回 PNG 或 JPEG。

```html 02-html/pages/08e-media-picture.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>picture 與圖片格式</title>
  </head>
  <body>
    <h1>picture 與圖片格式</h1>
    <picture>
      <source type="image/avif" srcset="https://placehold.co/600x338.avif?text=AVIF" />
      <source type="image/webp" srcset="https://placehold.co/600x338.webp?text=WebP" />
      <img src="https://placehold.co/600x338.png?text=PNG" width="600" height="338" alt="三種格式的占位圖，圖上的文字就是被選中的格式" />
    </picture>
  </body>
</html>
```

**解析**

- 目前的 Chrome 看得懂 AVIF，圖上會寫著 AVIF；不支援的瀏覽器會往下找，最後顯示 PNG。
- alt、width、height 都寫在 img 上，不論選到哪個 source，大小與替代文字都由這顆 img 決定。
- source 也能用 media 依視窗寬度換圖，但換的圖若比例不同，要搭配 CSS 才能正確縮放，這裡不示範。

### 選讀：影音元素

影片和音訊使用瀏覽器內建的播放器，要加上 controls 才會出現播放按鈕。真正的檔案寫在 source 子元素上，並註明格式。

**觀念**

影片用 video，聲音用 audio。source 的 type 告訴瀏覽器這是哪一種格式，瀏覽器挑第一個播得動的。標籤中間的文字是備用內容，只有瀏覽器不認得這些標籤時才會出現，現在的瀏覽器幾乎都看不到它。

{% note warning %}
**有聲音的影片不要自己播**
現代瀏覽器通常不允許帶聲音的自動播放，所以這一頁只加控制列，讓使用者自己按播放。
{% endnote %}

```html 02-html/pages/08f-media-video-audio.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>影片與音訊</title>
  </head>
  <body>
    <h1>影片與音訊</h1>
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

- 影片顯示第一格畫面與一條控制列，按了才播放。
- 音訊只有一條控制列，頁面一打開不會出聲。
- 檔案來源寫在 source，外層的 video 與 audio 本身沒有 src。
- 有聲影片要提供字幕，可用 track 子元素掛字幕檔；這是無障礙的一部分，這一課只點到。

### 選讀：嵌入元素

iframe 在這一頁裡再開一份文件：src 指向那份文件，title 說明這個框是什麼，width 與 height 決定框的大小。

**觀念**

早期用來切整頁的 frameset 已經淘汰，現在 iframe 只用來嵌入其他來源，例如地圖或影片播放器。title 在畫面上不會顯示，但輔助軟體會讀它。文件在同一資料夾時，src 只寫檔名，算法跟連結的相對路徑相同。

{% note danger %}
**很多網站拒絕被嵌進來**
對方可以設定不允許被放進 iframe，避免畫面被蓋一層假按鈕，所以搜尋引擎首頁、銀行登入頁嵌不進去是正常的。影片網站要用它們提供的嵌入網址；嵌入失敗時，改成一般連結讓人開新分頁。
{% endnote %}

```html 02-html/pages/08g-media-iframe.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>嵌入另一份文件</title>
  </head>
  <body>
    <h1>嵌入另一份文件</h1>
    <iframe title="語意版面預覽" src="03-layout.html" width="480" height="320"></iframe>
  </body>
</html>
```

**解析**

- 頁面上是一個 480×320 的框，裡面是另一份文件的內容，網址列仍停在這一頁。
- 框本身沒有標題文字；用 DevTools 點選這個框，屬性裡可以看到 title 的「語意版面預覽」。

## 表格

表格用來呈現有列有欄的資料，例如價目表、課表。它不是版面工具，不要拿來把網頁切成左右欄；排版交給之後學的 CSS。這一節先認識由列與儲存格組成的基本結構，再補上讓輔助軟體讀得懂的語意結構，最後看選讀的儲存格合併。

### 表格基本結構

一張表由 table 容器、每一橫排的列，以及列裡的儲存格組成。儲存格分兩種：標題格放欄名或列名，資料格放內容。

**觀念**

- table：整張表的容器。
- tr：一列。
- th：標題格，瀏覽器預設粗體置中。
- td：資料格。

每一列的儲存格數量要一致，少一格或多一格，那一列就會參差不齊。

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
      <tr>
        <th>時段</th>
        <th>景點</th>
      </tr>
      <tr>
        <td>上午</td>
        <td>大阪城</td>
      </tr>
      <tr>
        <td>下午</td>
        <td>道頓堀</td>
      </tr>
    </table>
  </body>
</html>
```

**解析**

- 畫面是三列兩欄的格子：第一列是粗體的欄名，下面兩列是上午與下午的資料。
- table 上的 border 屬性只為了讓格線看得見，不加的話資料還在，只是看不到線。

{% note info %}
表格的框線、寬度、對齊、背景色、儲存格內距與間距，過去都寫成標籤屬性，在 HTML5 已經過時；外觀改交給 CSS。border 只留 `border="1"` 是規格允許的寫法，用來在還沒有 CSS 時顯示格線。
{% endnote %}

### 表格語意結構

表格語意結構是用標籤標明每一塊的角色：表名、欄名區、資料區、表尾。畫面上幾乎只多一個表名，差別在輔助軟體，它靠標題格的範圍，把每個資料格配上對應的欄名與列名。

**一覽**

- caption：表名，必須是 table 的第一個子元素，預設顯示在表的上方。
- thead：欄名那一區。
- tbody：資料區。
- tfoot：合計或備註。寫在 tbody 後面，畫面仍顯示在表的底部。

**觀念**

th 要用 scope 標明它是誰的標題：

- `col`：這是整欄的欄名。
- `row`：這是整列的列名。

這樣輔助軟體讀到 1600 這類數字時，才知道它屬於哪個項目、哪個欄位。更複雜的表可以用 headers 屬性把資料格指回標題格的 id，一般的表有 scope 就夠了。

```html 02-html/pages/09b-table-semantic.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>價目表</title>
  </head>
  <body>
    <h1>價目表</h1>
    <table border="1">
      <caption>京都三日遊價目</caption>
      <thead>
        <tr>
          <th scope="col">項目</th>
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

- 表名「京都三日遊價目」在表的上方，第一列是四個欄名。
- 「成人」「兒童」「合計」是列名，同樣用標題格，所以會是粗體。
- 原始碼裡 tfoot 寫在 tbody 後面，畫面上合計也在表的最底下。
- 合計列的單價格留空，因為這一列沒有對應的單價，但儲存格仍要保留，欄數才對得齊。

### 選讀：儲存格合併

一格可以往右佔多欄，或往下佔多列。被佔掉的位置不要再寫儲存格，否則整列會多出一格。

**觀念**

- colspan：往右佔幾欄。
- rowspan：往下佔幾列。

合併只用在內容本來就橫跨或縱跨的地方，例如分組表頭，不是用來把表格排好看。一個標題格橫跨多欄時，scope 改寫成 `colgroup`，表示它是一整組欄的標題。

```html 02-html/pages/09c-table-span.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>儲存格合併</title>
  </head>
  <body>
    <h1>儲存格合併</h1>
    <table border="1">
      <caption>京都行程</caption>
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
          <!-- 第一天已經佔掉這一列的第一格 -->
          <td>下午</td>
          <td>清水寺山門</td>
        </tr>
        <tr>
          <th scope="row">第二天</th>
          <td colspan="2">自由活動（時段與地點合成一格）</td>
        </tr>
      </tbody>
    </table>
    <table border="1">
      <caption>團體報名</caption>
      <thead>
        <tr>
          <th scope="col" rowspan="2">團名</th>
          <th scope="colgroup" colspan="2">人數</th>
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

- 第一張表的「第一天」往下佔兩列，所以下午那一列只寫時段與地點，不再寫日名。
- 「第二天」那一列的資料格往右佔兩欄，時段與地點合成一格，所以這一列只有兩個儲存格。
- 第二張表的表頭有兩列：「團名」與「導遊」各佔兩列高，「人數」橫跨成人與兒童兩欄。
- 資料列因此仍是四格，對應團名、成人、兒童、導遊四個欄。

## 表單

表單用來收集使用者輸入的文字與選項，再送到指定的位置。這一節依序看表單容器、標籤、欄位共通屬性、輸入類型、選擇、多行文字、按鈕、分組，以及進度與計量。這一課的表單不會把資料存到伺服器，也不寫程式。

### 表單容器

form 是整份表單的容器，送出到哪裡、用什麼方式送，都寫在它身上。

**一覽**

- action：資料送去的網址；寫 `#` 表示留在這份文件。
- method：送出方式；`get` 把欄位接在網址後面，適合查詢；`post` 把資料放在請求本體，適合密碼與大量內容。
- enctype：資料的編碼；真的要上傳檔案時，要用 `post` 並設成 `multipart/form-data`。

**觀念**

欄位是否會被送出，看欄位有沒有 name：沒有 name 的欄位通常不會出現在送出的資料裡。送出的動作由送出鈕觸發，按鈕的種類在後面的小節說明。

```html 02-html/pages/10-form.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名表單</title>
  </head>
  <body>
    <h1>報名表單</h1>
    <p>送出後仍停在這一頁，網址後面會出現欄位名稱與內容。</p>
    <form action="#" method="get">
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

- 按下送出後，網址列仍在這一頁，後面多了 `name=` 與姓名；中文會被編碼，網址列可能顯示成一串 `%E7` 開頭的字。
- 這是 get 把欄位接在網址上，不是伺服器回了新的一頁。
- 網址裡的名稱來自欄位的 name 屬性；把它改掉，網址裡的名稱就跟著變。

### 表單標籤

每個看得到的欄位都要有標籤，標籤的文字不但說明這一欄要填什麼，點下去也會聚焦到那一欄，點選範圍更大。

**觀念**

標籤與欄位有兩種對法，一欄用一種即可：

- for 對上欄位的 id，標籤與欄位可以分開放。
- 把控制項包在 label 裡面，單選與複選常用這種。

空欄提示（placeholder，欄位為空時淡色顯示的文字）一填寫就消失，顏色也比較淡，不能代替標籤。

```html 02-html/pages/10b-form-label.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>表單標籤</title>
  </head>
  <body>
    <h1>表單標籤</h1>
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

- 點「姓名」兩個字，游標會進到旁邊的輸入欄，因為 for 與 id 都是 guest-name。
- 空欄時看得到「王小明」，一打字就消失，旁邊的「姓名」不會消失。
- 點「保險」兩個字，複選框會勾起，因為它被包在 label 裡面。

### 表單控制項通用屬性與驗證

各種欄位共通的屬性，決定這一欄送不送得出去、能不能被改，以及送出前瀏覽器會不會先檢查。

**一覽**

- name：送出時的欄位名；沒有它，這一欄通常不會送出。
- id：整份文件裡唯一，給 label 的 for 對準。
- value：預設值；在選項類欄位則是被選到時要送出的值。
- readonly：不能改，仍會送出。
- disabled：不能改，也不會送出。
- required：必填，空著送出時瀏覽器會擋下來並顯示提示。
- maxlength：最多幾個字，超過就打不進去。

**觀念**

瀏覽器內建的檢查只是方便使用者即時修正；使用者可以繞過它，所以真正的檢查仍要在接收資料的伺服器再做一次。另外，空著又沒有設必填的欄位，即使輸入類型會檢查格式，瀏覽器也不會擋。

```html 02-html/pages/10c-form-validation.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>欄位通用屬性</title>
  </head>
  <body>
    <h1>欄位通用屬性</h1>
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

- 姓名空著按送出，瀏覽器會擋下並提示要填寫；欄位最多只能輸入 20 個字。
- 團號看得到但不能改，送出後網址裡仍有 `code`。
- 已額滿梯次也看得到、不能改，而且網址裡不會有 `soldout`。
- 姓名擋下的是送出動作，後面兩欄不受影響。

### 基本輸入元素

看得到的單行欄位幾乎都用同一顆標籤，差別只在 type 屬性。type 決定畫面上出現哪種控制項，以及瀏覽器送出前要不要順便檢查格式。這一節把類型分成兩組：打字類與選擇器類。

**一覽**

- 打字類：
  - 信箱：檢查有沒有 @，手機會換成含 @ 的鍵盤。
  - 電話：不檢查格式，手機會換成數字鍵盤。
  - 數字：只收數字，可用 `min`、`max` 限制範圍。
  - 網址：要寫完整，含 `https://` 之類的開頭。
  - 密碼：輸入的字會被遮住。
  - 搜尋：外觀像一般文字框，Chrome 打字後會出現清除鈕。
- 選擇器類：
  - 日期、時間、本機日期時間：跳出對應的選擇器。
  - 月份、週：Chrome 有選擇器；桌面版的 Firefox 與 Safari 尚未支援，會退回一般文字框。
  - 範圍：一條滑桿，不能打字。
  - 顏色：點開是色彩選擇器，值是 `#rrggbb` 的格式。
  - 檔案：點開是選檔視窗。

**觀念**

驗證由瀏覽器在按下送出時做，不符的欄位會被擋下並顯示提示。這只是方便使用者的第一道檢查，不能當作安全防線，因為送出的資料之後仍要由伺服器再檢查一次。

第一個 demo 是打字類。每個欄位都有 label 對上 id；信箱與電話額外加了 `autocomplete`，值用標準名稱，讓瀏覽器知道該帶入哪一筆已存的資料。

```html 02-html/pages/10d-form-input-text.html
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
        <input id="guest-tel" name="tel" type="tel" autocomplete="tel" />
      </p>
      <p>
        <label for="guest-people">人數</label>
        <input id="guest-people" name="people" type="number" min="1" max="10" value="1" />
      </p>
      <p>
        <label for="guest-url">個人頁網址</label>
        <input id="guest-url" name="website" type="url" placeholder="https://" />
      </p>
      <p>
        <label for="guest-pw">查詢密碼</label>
        <input id="guest-pw" name="demoPassword" type="password" />
      </p>
      <p>
        <label for="guest-search">搜尋行程</label>
        <input id="guest-search" name="q" type="search" />
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 信箱欄填入沒有 @ 的字再按送出，瀏覽器會擋下並出現提示。
- 人數預設是 1，用上下鈕或方向鍵只會在 1 到 10 之間移動。
- 網址欄只填 `www.example.com` 也會被擋，必須帶 `https://`。
- 密碼欄輸入的字被遮住，但送出後網址列仍會看到明文，這就是正式登入不用 get 的原因。
- 全部符合時按送出，網址後面會接上各欄位的名稱與值。

第二個 demo 是選擇器類。月份和週在 Chrome 看得到選擇器，桌面版的 Firefox 與 Safari 只是文字框，所以正式專案要用的話要先確認使用者的瀏覽器。

```html 02-html/pages/10e-form-input-picker.html
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
        <label for="guest-date">出發日</label>
        <input id="guest-date" name="date" type="date" />
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
        <label for="guest-range">期待指數</label>
        <input id="guest-range" name="score" type="range" min="1" max="5" value="3" />
      </p>
      <p>
        <label for="guest-color">識別色</label>
        <input id="guest-color" name="color" type="color" value="#0f766e" />
      </p>
      <p>
        <label for="guest-file">護照影本</label>
        <input id="guest-file" name="file" type="file" accept=".png,.jpg,.pdf" />
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 出發日、集合時間、說明會、月份和週都是選擇器，不是普通打字框。
- 期待指數是一條滑桿，值在 1 到 5，預設落在 3。
- 識別色預設顯示 `#0f766e` 的深綠色；送出時網址上的值會是 `%230f766e`，因為 `#` 在網址裡有特殊意義，會被編碼。
- 護照影本可以選檔，`accept` 只是限制選檔視窗的副檔名。表單用 get 送出時，網址上只會帶檔名；要真的上傳檔案，表單得改成 post 並加上 `enctype="multipart/form-data"`，也需要伺服器接收。

{% note info %}
**哪些屬性配哪些類型**
`pattern`（用正規表示式檢查格式）適用於文字、搜尋、網址、電話、信箱、密碼；`multiple`（一次選多筆）只用於檔案與信箱；`min`、`max`、`step` 適用於數字、範圍與各種日期時間。屬性放在不支援的類型上，瀏覽器會直接忽略。
{% endnote %}

### 選擇元素

單選、複選、下拉選單和建議清單都是讓使用者從現成選項裡挑。單選同一組只能留一項，複選可以多項。

**觀念**

- 單選與複選：同一組的欄位共用一個 name，再用各自的 value 區分選了哪一項；預設勾選的那顆加上 `checked`。複選共用 name 時，勾了幾項，網址上就會出現幾筆同名欄位。
- 下拉選單：`select` 裡放多個 `option`，畫面顯示的文字和送出的 value 可以不同。沒指定 `selected` 時，預設選第一項。
- 分組：`optgroup` 把一部分 `option` 包起來，並用 label 屬性標出組名。
- 建議清單：`datalist` 提供候選字，欄位用 list 屬性對上它的 id。它仍是文字欄，清單以外的字也能送出。

```html 02-html/pages/10f-form-select.html
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

**解析**

- 兩顆單選名字相同，點其中一顆，另一顆自動取消；進頁面時預設勾著巴士。
- 加購三項同名，可以同時勾選，勾兩項送出後網址會出現兩筆 `extra`。
- 下拉先分成本島與離島兩組，送出的是選項的 value，例如選台北城市漫遊會送出 `tourId=1`。
- 城市欄可以直接打字，點進去會列出台北、花蓮、澎湖；打別的字也能送出。

### 文字區域

多行文字用 textarea。它不是 input，不能寫 `type`，預設文字要放在開始與結束標籤之間，不是 value 屬性。

**觀念**

rows 和 cols 只是給個大概的列數與字數寬度，實際外觀交給 CSS 調整。空欄提示用 `placeholder`，它只是淡色的示範字，不會被送出，也不能取代 label。

```html 02-html/pages/10g-form-textarea.html
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
        <label for="guest-remind">行前提醒</label>
        <textarea id="guest-remind" name="remind" rows="3" cols="30">請攜帶護照與零錢。</textarea>
      </p>
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 備註一開始是空的，淡色的「飲食禁忌、接送地」是提示，開始打字就消失；沒打字送出時，網址上的 `note` 是空的。
- 行前提醒一開始就有一句字，這是夾在標籤中間的預設內容；不改直接送出，它就是欄位的值。
- 點標籤，游標會跳進對應的文字區域。
- 在欄位裡按 Enter 是換行，不會送出表單。

### 按鈕元素

按鈕用 `button`，而且一定要寫 type。寫在表單裡又沒寫 type 的按鈕，預設就是送出鈕。

**一覽**

- `submit`：送出表單。
- `reset`：把所有欄位還原成頁面剛載入時的值。
- `button`：沒有內建動作，要等 JavaScript 為它綁事件才會做事（見 {% post_link lokiTech-15day-07-js-dom %}）。

送出鈕也可以寫成 `input type="submit"`，但它只能放純文字；`button` 的內容可以再放別的標籤，這一章統一用 `button`。

**觀念**

在文字欄按 Enter，瀏覽器會當作按了表單裡的第一顆送出鈕。所以只想留在這一頁、不要送出的按鈕，一定要寫成 `type="button"`，否則漏寫就會變成多一顆送出鈕。

```html 02-html/pages/10h-form-button.html
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
        <button type="button">儲存草稿</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 三顆按鈕裡，只有「送出報名」會把姓名接到網址上。
- 「重設」會把姓名欄清回空白，因為載入時沒有預設值。
- 「儲存草稿」按下去沒有任何反應，因為類型是 button，而這一章沒有 JavaScript。
- 在姓名欄按 Enter，效果和按「送出報名」一樣。

### 表單組織

相關欄位用 `fieldset` 圈成一組，`legend` 是這一組的標題，畫面上顯示在框線上。

**觀念**

- `legend` 要放在 `fieldset` 的第一個子元素。
- `fieldset` 可以再包 `fieldset`：外層包整份資料，內層包其中一組選項。
- 螢幕閱讀器讀到單選組裡的選項時，會先唸出組名，使用者才知道這幾顆是在選什麼，所以單選組很適合包成 `fieldset`。
- 在 `fieldset` 加上 `disabled`，整組欄位都會停用且不送出。

```html 02-html/pages/10i-form-fieldset.html
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
      <p>
        <button type="submit">送出報名</button>
      </p>
    </form>
  </body>
</html>
```

**解析**

- 姓名和交通被「報名資料」的框圍住，交通再被自己的小框圍住，框上的字是各自的 `legend`。
- 內層的 `fieldset` 寫在外層裡面，而不是並排在外層後面，所以交通屬於報名資料的一部分。
- 開發者工具的 Elements 裡，這兩個框是巢狀的結構。

### 選讀：progress 與 meter

`progress` 表示一件事完成了多少，`meter` 表示一個數值落在範圍內的哪個區間。兩者都不是輸入欄，不會被送出。

**觀念**

- `progress` 的 max 是滿額，value 是目前進度；省略 value 會變成「進行中、不知道多久」的動畫。
- `meter` 另外有 min、low、high、optimum，用來判斷目前的值算偏低、正常還是偏高，並依此改變顏色。
- 兩者都可以用 label 取名。標籤中間的文字是給不認得這顆標籤的舊環境讀的備用內容。

```html 02-html/pages/10j-form-progress.html
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
      <label for="seats">名額</label>
      <progress id="seats" max="100" value="70">70%</progress>
    </p>
    <p>
      <label for="heat">報名熱度</label>
      <meter id="heat" min="0" max="100" low="30" high="70" optimum="80" value="60">60</meter>
    </p>
  </body>
</html>
```

**解析**

- 名額那條填了七成，是一條走到 70% 的進度條。
- 報名熱度的值是 60，落在 low 30 與 high 70 之間；最佳值 80 在偏高的那一側，所以 Chrome 會以黃色表示「不是最佳也不算差」。
- 這兩顆都不是輸入欄，即使放進表單，也不會出現在送出的網址上。

# 選讀：SEO 與網站資訊

搜尋引擎和社群網站在畫出頁面之前，會先讀 head 裡的說明。搜尋引擎讀的是文件裡的文字和結構，不是螢幕截圖，這部分的概念見 {% post_link lokiTech-15day-01-tools %} 的「語意化標籤、無障礙設計與 SEO」。這一章可以整節跳過。

**觀念**

搜尋結果的摘要、分頁上的小圖示、貼到 LINE 或 Facebook 時跳出的預覽卡，都從 head 讀取，不會多畫成一段正文。

- **描述**：一兩句話，搜尋結果常摘來當摘要。堆關鍵字沒有幫助。
- **圖示**：分頁標籤旁邊的小圖，用一條連結指到圖的網址。
- **開放社交關係圖（Open Graph）**：預覽卡用的標題、描述、圖片和網址。圖片要寫對方抓得到的完整網址。
- **正規網址（canonical）**：同一篇若有多個網址，標出以哪一個為準。
- **爬蟲指令（robots）**：告訴搜尋引擎要不要收錄這頁、要不要沿著連結繼續抓。不寫時預設就是兩者都允許，所以這一行先認得長相即可。

```html 02-html/pages/12-seo.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>京都三日 · 洛奇旅行</title>
    <!-- 搜尋結果可能摘這一句當摘要，不會畫在頁面上 -->
    <meta name="description" content="京都三日小團：清水寺、伏見稻荷與嵐山，含兩晚住宿。" />
    <!-- 分頁標籤旁邊的小圖示 -->
    <link rel="icon" href="https://placehold.co/32x32/png" />
    <!-- 貼到 LINE 或 Facebook 時，預覽卡讀這四筆 -->
    <meta property="og:title" content="京都三日 · 洛奇旅行" />
    <meta property="og:description" content="清水寺、伏見稻荷與嵐山，週六早上台北車站集合。" />
    <meta property="og:image" content="https://picsum.photos/id/1016/1200/630" />
    <!-- example.com 只是示範網址，不是這門課的網站 -->
    <meta property="og:url" content="https://example.com/trips/kyoto" />
    <!-- 同一篇有多個網址時，告訴搜尋引擎以這一個為準 -->
    <link rel="canonical" href="https://example.com/trips/kyoto" />
    <!-- index：可以收進搜尋；follow：可以沿著頁內連結繼續抓 -->
    <meta name="robots" content="index, follow" />
  </head>
  <body>
    <h1>京都三日</h1>
    <p>清水寺、伏見稻荷與嵐山，含兩晚住宿。</p>
  </body>
</html>
```

**解析**

- 畫面只有標題與一段正文，其餘 meta 與 link 都沒有畫出來。
- 分頁標籤顯示文件標題，旁邊可能多一張小圖。
- 按 <kbd>F12</kbd>，在 Elements 裡展開 head，就能對到每一筆。
- 本機檔案貼到 LINE 或 Facebook 通常不會出現預覽卡，因為對方的伺服器抓不到你電腦裡的檔。

# 選讀：無障礙

無障礙（accessibility，常縮寫成 a11y）是讓不同身體條件、裝置和情境的人都用得了這一頁，例如只靠鍵盤操作、使用螢幕閱讀器，或暫時受傷。輔助工具讀的是文件樹和語意，不是畫面上的排版，所以課堂上先把標籤用對，比背補充屬性有用。這一章可以整節跳過，正式規範之後再查 [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)。

{% note info %}
**自己聽一次**
Chrome 按 <kbd>F12</kbd>，在 Elements 面板的側邊找 Accessibility 分頁，點選一個元素就能看它的 Name 和 Role。macOS 也可以開啟 VoiceOver（旁白）實際聽一次，不必當成作業。
{% endnote %}

## 語言與標題大綱

html 標籤的 lang 屬性告訴閱讀器該用哪種語言發音，標題則是這份文件的目錄。兩件事都寫在文件本身。

**觀念**

繁體中文寫 zh-Hant。標題的層級依這份文件的目錄來排：

- 一頁一個 h1，下面接 h2，不要為了字變小而跳級。
- 閱讀器可以用標題清單直接跳到某一節。
- 頁首的招牌不是這一頁的主題，不用標題標籤，主標題是這一頁在做的事。

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
      <p>護照效期要超過回國日六個月。</p>
      <h2>集合方式</h2>
      <p>京都車站中央口，領隊舉牌。</p>
    </main>
  </body>
</html>
```

**解析**

- 文件宣告是繁體中文。
- 畫面上先是招牌，再是大標，接著是「注意事項」與「集合方式」兩節。
- 招牌是段落，不會進標題清單。
- 兩節都是 h2，接在唯一的 h1 下面，彼此同級，中間沒有跳級。

## 圖片的替代文字

內容圖的替代文字要寫出畫面傳達的意思。寫「圖片」或檔名等於沒寫。

**觀念**

純裝飾、對理解內容沒有幫助的圖，才用空的替代文字，讓閱讀器略過。空字串和完全沒寫 alt 不一樣：沒寫時，有的閱讀器會改唸檔名。替代文字也要看圖的用途：同一張照片放在文章裡，和放在連結裡當按鈕，該寫的內容不一樣。

```html 02-html/pages/11b-a11y-alt.html
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
- 星號很小，替代文字是空的；閱讀器會讀封面那句，略過星號，並照常唸旁邊那句話。
- 若星號換成有內容的照片，空的替代文字就會讓看不到圖的人漏掉資訊，那時要改成寫出畫面。

## 表單標籤

輸入欄沒有標籤時，螢幕閱讀器只會唸「編輯文字」，使用者不知道要填什麼。標籤也讓點到文字就能聚焦到欄位，手機上更好點。

**觀念**

標籤與控制項有兩種關聯方式：標籤的 for 對上欄位的 id，或把控制項直接包進標籤裡。一組單選或核取要再用 fieldset 與 legend 給整組一個名字。

placeholder 是輸入後就消失的提示，色彩通常也偏淡，不能代替標籤。

name 則是另一件事：它決定送出時欄位以什麼名字帶走，id 只負責讓標籤對準，兩者都要寫。

```html 02-html/pages/11c-a11y-label.html
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
        <!-- label 的 for 對上 input 的 id；name 則是送出時的欄位名 -->
        <label for="guest-name">姓名</label>
        <input id="guest-name" name="name" type="text" placeholder="王小明" />
      </p>
      <fieldset>
        <legend>交通方式</legend>
        <!-- 把控制項包進 label，也能建立關聯 -->
        <label>
          <input type="radio" name="traffic" value="bus" />
          巴士
        </label>
        <label>
          <input type="radio" name="traffic" value="train" />
          電車
        </label>
      </fieldset>
    </form>
  </body>
</html>
```

**解析**

- 點「姓名」兩個字，游標會進到輸入欄，因為 for 與 id 的值相同。
- 輸入欄在空的時候才看得到「王小明」，開始打字就消失，所以它只是範例，不是欄位的名字。
- 「巴士」與「電車」的文字都包在 label 裡，點文字就會選取對應的單選。
- 兩個單選的 name 相同，同一時間只能選一個；legend 的「交通方式」是這一組的名字。

## 連結與按鈕

連結和按鈕外觀可以很像，但分工不同：連結帶使用者去別的網址，按鈕在本頁觸發動作。用對元素，鍵盤和閱讀器才會照預期運作。

**觀念**

要去別的頁面或位置，用有 href 的連結，文字寫出目的地，不寫「點這裡」。沒有 href 的連結不在 Tab 的停留順序裡，也不算連結。

在本頁送出、試算或開關，用按鈕。按鈕放在表單裡時，沒寫 type 就預設為送出，所以一律明確寫 type。用沒有語意的 div 假裝按鈕，Tab 走不進去、空白鍵也不會啟動它，要靠 JavaScript 補很多功能才勉強追上原生按鈕。

```html 02-html/pages/11d-a11y-button-link.html
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
        <!-- 在表單裡，每顆按鈕都要寫明 type -->
        <button type="submit">送出報名</button>
        <button type="button">試算人數</button>
      </p>
    </form>
    <!-- 去別的頁面：有 href 的連結，文字寫目的地 -->
    <p><a href="05-links.html">看集合方式</a></p>
  </body>
</html>
```

**解析**

- 在姓名欄打字後按「送出報名」，網址後面會接上姓名欄的 name 與輸入的值。
- 「試算人數」是 type 為 button 的按鈕，不會送出表單；它要做什麼，要等學了 JavaScript 才寫得出來。
- 「看集合方式」是連結，點下去會換到 05-links.html 那一頁，文字寫的是目的地。

## 資料表表頭

表格是為了呈現資料，不是為了排版。資料表加上表名與表頭後，閱讀器才能唸出一個數字屬於哪一列、哪一欄。

**觀念**

表名用 caption，放在 table 的第一個子元素。欄名放在 thead 裡的標題格，列名放在該列的第一格，兩者都用標題格，資料格則維持一般格，不要為了粗體把資料格換成標題格。

標題格用 scope 說明它管的方向：欄名寫 col，列名寫 row。把網頁切成左右欄這類排版工作，交給之後學的 CSS，不要用表格。

```html 02-html/pages/11e-a11y-table.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <table>
      <!-- caption 是表名 -->
      <caption>京都三日遊價目</caption>
      <thead>
        <tr>
          <!-- scope="col"：這格是整欄的標題 -->
          <th scope="col">身分</th>
          <th scope="col">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- scope="row"：這格是整列的標題 -->
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

**解析**

- 表格上方有表名「京都三日遊價目」。
- 「身分」與「單價」是欄名，「成人」與「兒童」是列名，1600 與 800 才是資料格。
- 閱讀器讀到 1600 時，可以一併唸出它屬於「成人」這一列與「單價」這一欄，不只是單獨一個數字。
- 瀏覽器預設不畫格線，標題格會粗體置中；外觀由之後的 CSS 決定，不影響語意。

## 鍵盤操作

許多人不用滑鼠，可能是視障、手部受傷，或只是滑鼠壞了。整頁只靠鍵盤就能操作，是無障礙最基本的檢查。

**觀念**

<kbd>Tab</kbd> 把焦點移到下一個可互動的元素，<kbd>Shift</kbd> + <kbd>Tab</kbd> 往回；連結用 <kbd>Enter</kbd> 啟動，按鈕用 <kbd>Enter</kbd> 或空白鍵。可互動的元素包含連結、按鈕、輸入欄與選單，純文字與圖片不會停下來。Safari 預設不把連結放進 Tab 的順序，要改按 <kbd>Option</kbd> + <kbd>Tab</kbd>。

停留順序預設照原始碼的順序，不是照畫面上的左右位置。之後用 CSS 調整排版時，要避免讓畫面順序與原始碼順序差太多，否則焦點會在畫面上跳來跳去。

```html 02-html/pages/11f-a11y-keyboard.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <h1>報名京都三日遊</h1>
    <!-- 只按 Tab，焦點會依下面的原始碼順序，走過欄位、按鈕與連結 -->
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
    <p>這一段是純文字，Tab 不會停在這裡。</p>
  </body>
</html>
```

**解析**

- 只按 Tab 時，焦點依序停在姓名欄、「送出報名」、「試算人數」、「看集合方式」連結。
- 最後一段純文字沒有被停下來，因為它不是可互動的元素。
- 這個順序就是它們在原始碼裡出現的順序。

{% note info %}
**對比與焦點外框屬於 CSS**
文字與背景的對比太低，弱視的人讀不到；WCAG 的 AA 等級要求一般大小文字至少 4.5:1。瀏覽器替焦點畫的外框是鍵盤使用者的位置指標，不要用 `outline: none` 直接拿掉，除非換上同樣清楚的樣式。
{% endnote %}

## ARIA

ARIA（Accessible Rich Internet Applications）是一組補在標籤上的屬性，替 HTML 本身說不清楚的元件補上名字、角色與狀態。

**觀念**

ARIA 的第一條規則是：能用原生 HTML 元素就用原生的，不要先加 ARIA。原生按鈕自帶角色、名字、鍵盤操作與焦點，ARIA 只改變輔助工具聽到的說法，不會替元素補上這些行為。

寫錯或與畫面文字不一致的 ARIA，比完全沒寫更糟。真正用得上的時機，是 HTML 沒有辦法表達的地方，demo 裡有兩個常見例子：

- aria-label：替沒有文字的元素（例如只有符號的按鈕）取名字。
- aria-current：標出導覽中目前所在的頁面。

```html 02-html/pages/11g-a11y-aria.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>報名京都三日遊</title>
  </head>
  <body>
    <!-- aria-label 替導覽取名；aria-current 標出目前所在的頁面 -->
    <nav aria-label="主選單">
      <a href="11g-a11y-aria.html" aria-current="page">報名</a>
      <a href="05-links.html">集合方式</a>
    </nav>
    <h1>報名京都三日遊</h1>
    <p>
      <!-- 有文字的按鈕：名字就是文字，不必再加 ARIA -->
      <button type="button">試算人數</button>
      <!-- 只有符號的按鈕：沒有可讀的文字，才用 aria-label 補名字 -->
      <button type="button" aria-label="關閉">×</button>
    </p>
  </body>
</html>
```

**解析**

- 「試算人數」有文字，名字就是文字、角色是按鈕，不需要任何 ARIA。
- 只有「×」的按鈕，閱讀器沒有可唸的文字，所以用 aria-label 讀成「關閉」。
- 導覽的 aria-label 替這一區取名為「主選單」，同一頁有多個導覽時用來區分；「報名」連結的 aria-current 讓閱讀器知道這是目前所在的頁面。
- 在 Chrome 開發者工具的 Accessibility 分頁點各元素，可以看到 Name 與 Role 的來源。

# 回家作業

這份作業只用必教內容，不需要 CSS 與 JavaScript。內容取自專案的行程詳情頁，請把下面的資料排成一頁結構正確的 HTML。課堂上不會批改，也不講解；每一題都附上完成後該看到的結果，可以自己對照。做完或卡住時，再看練習 repo 根目錄 `homework/02-html/` 裡的標準答案。

## 起始檔與資料

起始檔在練習專案的 `02-html/homework/02-homework.html`，只有文件骨架。

```html 02-html/homework/02-homework.html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>台北大稻埕與北投溫泉三日</title>
  </head>
  <body>
    <!-- 在這裡開始寫 -->
  </body>
</html>
```

這一頁介紹「台北大稻埕與北投溫泉三日」。

- 圖片網址：`https://images.unsplash.com/photo-1519320993082-43a535317ddc?auto=format&fit=crop&w=1600&q=80`
- 簡介：第一天沿迪化街走到大稻埕碼頭，第二天北投泡湯，下午不排景點。
- 特色：每團 8 人；迪化街只走路，不進購物站；兩晚都住北投，不換飯店。
- 行程表：第 1 天「大稻埕」，下午從迪化街走到大稻埕碼頭，晚上住北投；第 2 天「北投」，上午泡湯，下午不排景點；第 3 天「返程」，早餐後送到捷運站。
- 費用包含：2 晚住宿、當地車資與司機嚮導、行程表所列門票。費用不含：往返台北的交通、午餐與個人消費。
- 出發日：2026-12-04 與 2027-02-19，每團 8 人。

## 題目

### 題目一：頁面骨架

在 body 裡建立頁首、主要內容與頁尾。頁首放網站名稱「洛奇旅行」和三個連結「首頁」「行程」「報名」，連結放在導覽區塊裡。整頁只有一個 `h1`，其餘小標題用 `h2`。

完成後用瀏覽器打開，依序看到網站名稱、三個連結、主要內容與頁尾；標題階層沒有跳級。

### 題目二：行程簡介

在主要內容放 `h1`、圖片、簡介，以及「特色」與「費用」兩組清單。圖片要有替代文字，內容寫出這是哪個行程的照片。費用分成「包含」與「不包含」，各一份清單。

完成後頁面有一張圖，圖片載入失敗時會顯示替代文字；特色是三個項目，費用兩份清單各有項目。

### 題目三：行程表

用表格呈現三天的行程，欄位是「天數」「地點」「說明」。表格要有標題，表頭與表身分開，表頭儲存格要標明它是欄的表頭。

完成後表格有三列資料；用螢幕閱讀器或開發者工具的無障礙面板檢查，表頭欄位被標成 column header。

### 題目四：報名表單

做一個報名表單，欄位有姓名、Email、人數（1 到 8）、出發日（兩個日期擇一）與「同意條款」。每個欄位都要有標籤，必填的欄位要標示必填，送出按鈕要明確寫出類型。

完成後點標籤文字，游標會跳進對應的欄位；不填姓名直接送出，瀏覽器會擋下並提示；出發日的兩個選項只能選一個。

# 本篇重點回顧

選讀的有：「認識常用元素」裡的選讀：外觀效果標籤、選讀：縮寫、時間、聯絡、摺疊、選讀：描述清單、選讀：響應式圖片（含 srcset 與 sizes、picture 與圖片格式）、選讀：影音元素、選讀：嵌入元素、選讀：儲存格合併、選讀：progress 與 meter，以及整章選讀的「選讀：SEO 與網站資訊」與「選讀：無障礙」。

- 一份 HTML 文件由文件宣告、根元素、head 與 body 組成，head 放給瀏覽器讀的資訊，body 才是畫面上的內容。
- 區塊元素獨佔一行、行內元素跟著文字排，頁首、導覽、主文、頁尾等結構改用語意標籤標明，不要整頁都是 `div`。
- 標題依層級依序往下、正文用段落，一頁只放一個主標題。
- 連結的文字要看得出目的地，站內連結寫相對路徑，只有外站才寫絕對路徑。
- 文字標籤依意思選擇而不是依外觀，要在畫面上顯示標籤符號時，寫成字元實體。
- 清單依項目有沒有先後選無序或有序，圖片一定要寫替代文字並標明寬高。
- 表格只用來呈現資料，要寫上表名與表頭，並用標題格標明欄名與列名。
- 表單的每個欄位都要有對得上的標籤，按鈕要明確寫出 type，欄位要送出就要有 name。

上網查這篇的說法時，用括號裡的英文當關鍵字。

# 專有名詞中英對照

## 認識 HTML 文件

- 文件宣告（DOCTYPE）
- 根元素（root element）
- 怪異模式（quirks mode）
- 語言屬性（lang attribute）
- 螢幕閱讀器（screen reader）
- 輔助工具（assistive technology）
- 字元編碼（character encoding）
- 視窗設定（viewport）
- HTML 註解（HTML comment）

## 認識區塊盒

- 區塊元素（block element）
- 父層（parent element）
- 外距（margin）
- 行內元素（inline element）
- 行內區塊（inline-block）
- 置換元素（replaced element）
- 語意標籤（semantic tag）
- 地標（landmark）

## 認識常用元素

- 開始標籤（start tag）
- 結束標籤（end tag）
- 屬性（attribute）
- 空元素（void element）
- 開發者工具（DevTools）
- 錨點（anchor）
- 絕對路徑（absolute path）
- 相對路徑（relative path）
- 強調（emphasis）
- 上標與下標（superscript, subscript）
- 字元實體（character entity）
- 不換行空白（non-breaking space）
- 行內引用（inline quotation）
- 區塊引用（block quotation）
- 縮寫（abbreviation）
- 無序清單（unordered list）
- 有序清單（ordered list）
- 巢狀清單（nested list）
- 描述清單（description list）
- 占位圖（placeholder image）
- 替代文字（alt text）
- 延遲載入（lazy loading）
- 響應式圖片（responsive images）
- 像素密度（pixel density）
- 儲存格（cell）
- 標題格（header cell）
- 資料格（data cell）
- 欄名（column header）
- 列名（row header）
- 儲存格合併（cell merging）
- 表單（form）
- 空欄提示（placeholder）
- 表單控制項（form control）
- 驗證（validation）
- 正規表示式（regular expression）
- 單選（radio button）
- 複選（checkbox）
- 下拉選單（drop-down list）
- 建議清單（datalist）
- 欄位分組（fieldset）
- 進度條（progress bar）
- 計量（meter）

## 選讀：SEO 與網站資訊

- 搜尋引擎優化（SEO）
- 描述（description）
- 圖示（favicon）
- 開放社交關係圖（Open Graph）
- 正規網址（canonical URL）
- 爬蟲指令（robots）

## 選讀：無障礙

- 無障礙（accessibility, a11y）
- 旁白（VoiceOver）
- 標題大綱（heading outline）
- 焦點（focus）
- 停留順序（tab order）
- 對比（contrast）
- 焦點外框（focus outline）
- ARIA（Accessible Rich Internet Applications）
