---
title: "[基礎課程] jQuery 教學（一）：基礎觀念"
categories:
  - 職訓教材
  - jQuery
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-23 02:16:09
---
![](assets/images/banner/jquery.png)

JQuery 主要是主打 write less,do more 為精神，也就是幫助你減少 JavaScript 的撰寫程式，更容易做更多的處理。
<!-- more -->

JQuery 是一個由原生 JavaScript 所開發出來的開源函式庫，主要是有三大項功能受到好評而列入主流。包含：
1. 被簡化的 DOM 控制：比起原生 JavaScript 你能更輕鬆的對 DOM 進行監管
2. 過度的轉場效果：能容易去控制 CSS 以及配合兩者之間的過渡，也有自己的 animate 功能
3. AJAX 使用：能直接額外背後連線網頁並將資料取回，再透過 DOM 寫入，達到免重整畫面就能取得。


# 安裝
你可以使用 CDN 或是直接安裝到網站內，透過取得 jquery.min.js（壓縮過）。要注意 jQuery 最好是一開始就被載入，如果你有使用其他人的 JavaScript 外掛，可能這些外掛也引用到 JQ，如果有必要必須安排 jQuery 放在這些會受影響的 JavaScript 外掛之前。通常都會擺放到 head 這裡，也有人會放在 body 裡面，只要確認你所使用的 jQuery 代碼是在 JQuery.js 宣告之後出現即可。

{% note default %}
可自行評估是使用 CDN 或下載於本機端 
- [jQuery's CDN 位置](https://code.jquery.com/)
- [jQuery 下載處](https://jquery.com/download/)
{% endnote %}

```html
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous">
</script>

<!--或直接下載下來放到你相同位置，像是 JavaScript 資料夾內。這樣確保無網路下也能運作-->
<script src="js/jquery-3.4.1.min.js"></script>
```

# 語法說明
使用 jQuery 的`$()`為基礎並會變成 jQuery 的元件（物件型態），透過此 jQuery 元件進行相關程式指令。若要接續其他動作則以物件指向來進行行為規劃，舉例來說：

```js
//語法為 $（對象）. 行為（參數/任務）
$('li.list').addClass('color');
```
1. 此為找到 DOM 中的 li 標籤同時有 class name 為 list 的對象
2. 對此對象進行增加 class name 為 color

> 也可使用`jQuery()` 來代表 `$()` 之寫法，如果無法使用該符號情況下（跟某套件衝突）。

JQ 可接續其他對象或動作並能連續指定多種，譬如
```js
$('li.list').next().css('background-color','red').addClass('color');
```
1. 此為<mark>先</mark>找到 DOM 中的 li 標籤同時有 class name 為 list，<mark>接著</mark>下一個標籤為對象
2. 對此對象進行增加 CSS 樣式（背景色：red)
3. 對此對象進行增加 class name 為 color

如果需要，你也可以把 $() 存入變數，基本上只是將 jQuery 物件位置存為變數等待被拿來指向用。

```js
var li=$('li.list');
li.addClass('color');
```

jQuery 開頭都是 `$()` 函式進行元件套用，事實上同等於 `jQuery()` 寫法，如果當你使用一些 JavaScript 外掛也剛好有 `$()` 會衝突時，你可以改寫完整語法 `jQuery()`。接下來是大量瘋狂的語法解釋與說明

## selector 選取

{% note success %}
**跟著做：**
先建立檔案 jqdom.html 規劃以下內容再進行各種練習。請試著開啟 Chrome.F12.Console 試著操作對象，理解找到的對象為何。譬如：
- 你可以輸入`$('*')`，並看看得到什麼對象。
- 再試著輸入`$('html').text()`能得到什麼結果。
{% endnote %}

```html
<head>
  <style>
    .hot {
      color: red;
    }
  </style>
  <script 
    src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js">
  </script>
</head>
<body>
  <div id="page">
    <h1 id="header">MyjQueryDemo List</h1>
    <h2>我的代辦事項</h2>
    <ul>
      <li id="one" class="hot"><b>買</b> 晚餐</li>
      <li id="two" class="hot">練程式</li>
      <li id="three" class="hot">打電動</li>
      <li id="four">記得去洗澡</li>
    </ul>
  </div>
  <script>
    //start yourjQuerydemo By Here
  </script>
</body>
```

JQ 的 DOM 存取方式是透過 selector 來達到索引目標，會先轉換為 jQuery 之元件來取得後續行為。選取元件的方式範圍廣泛，主要概念採用了同於 CSS 的層級觀念。
```js
$(selector)  //基本的選擇器寫法
```
selector 為文字串格式，舉例方式如下：
- selector 可以是全部 (\*),tagName,id,class...
- 也能多選 selector，像是#one,#two 這樣同時多種不同對象合併選取
- 也能將外部的自身物件用 this 指定
| 直接 selector（選取）                     | 直接寫即可，注意要文字串引號                      |
| ----------------------------------------- | ------------------------------------------------- |
| $("*")                                    | 所有的 HTML 都列入選取                            |
| $("p")                                    | 找到 element 為 p 標籤之選取                      |
| $("#header")                              | 找到 id 為"header"之選取                          |
| $(".hot")                                 | 找到 class 為"myclass"之選取                      |
| $("#one,#two") <br> $("#one").add("#two") | 多選 (or) 對象，譬如找#one 或#two，使一起共同選擇 |
| $(this)                                   | 同 JavaScript 觀念，傳入前一個外部元件的本體      |
- 能用 CSS 的選擇器為觀念，使用節點層級做選取，彈性容易取得
| 選取的層級觀念 | 擁有層級觀念，透過遍歷去找到相對位置 |
| -------------- | ------------------------------------ |
| $("h1#header") | 找到該 h1 且 id=header               |
| $("ul li")     | 找到該 ul 位置之子孫層級的標籤 li    |
| $("ul>li")     | 找到該 ul 位置之子層級的標籤 li      |
- 多筆結果下，能進行不同過濾篩選條件
| 篩選條件                                   | 透過條件篩選對象，寫法兩種因人而應   |
| ------------------------------------------ | ------------------------------------ |
| $("li:not(.hot)") <br> $("li").not(".hot") | 找到 li 標籤對象且該標籤不能有`.hot` |
| $("li:first") <br> $("li").first()         | 找到 li 標籤對象之第一筆             |
| $("li:last") <br> $("li").last()           | 找到 li 標籤對象之最後筆             |
| $("li:even")                               | 找到 li 標籤對象之偶數筆             |
| $("li:odd")                                | 找到 li 標籤對象之奇數筆             |
| $("li:eq(n)") <br> $("li").eq(n)           | 找到 li 標籤對象之第 n 筆，初值=0    |
| $("li:contains('打')")                     | 找到 li 標籤內含文字"打"之選取       |
| $("ul:has(li)") <br> $("ul").has("li")     | 找到 ul 標籤且持有 li 之選取（取 ul) |
| $("li").each(function(){})                 | 多結果下能批次執行 each() 內的指令   |
- 能根據 tag 裡面的屬性 (attr) 做選取，透過多種比較式去檢查布林條件
| 篩選依屬性                               | 屬性以 [] 來指定，值最好加引號      |
| ---------------------------------------- | ----------------------------------- |
| $("input[type=button]")                  | 找到 input 標籤且 type 為 button    |
| $("input[type!=button]")                 | 找到 input 標籤且 type 不是 button  |
| $("input[value^=aa]")                    | 找到 input 標籤且 value 開頭為 aa   |
| $("input[value\$=aa]")                   | 找到 input 標籤且 value 結尾為 aa   |
| $("input[value*=aa]")                    | 找到 input 標籤且 value 中間為 aa   |
| $("input[value\|=aa]")                   | 找到 input 標籤且 value 開頭為`aa-` |
| $("input[type=button][value="is loki"]") | 找到符合多筆屬性值                  |
- tagName 是 input 相關的互動表單型，能透過：type 去找到，也包含 checked 或 selectd 性質
| 選擇為表單類型 | from 之類的都用：開頭表示 |
| -------------- | ------------------------- |
| $(":input")    | 所有輸入項目都中          |
| $(":text")     | 所有 input:text 都中      |
| $(":checked")  | 所有被勾選 checked 的都中 |

## Method 操作方法
當你熟悉的 selector 後，就能開始要進行何種作業，採用物件連結方式進行處理：

- 最基本常見的方法便是取得內容或修改。你可以抽換文字或 HTML，也能一同更換自己 HTML(tag)。
| 內容存取             |                                                        |
| -------------------- | ------------------------------------------------------ |
| .html("HTML")        | 同 JavaScript .innerHTML()                             |
| .text("String")      | 同 JavaScript .textContext()                           |
| .replaceWith("HTML") | 替換 HTML 連同自己該層                                 |
| .wrap("HTML")        | 增加父層包住自己                                       |
| .wrapAll("HTM")      | 同上，若同層有多個相同對象當作同群組增加父層包住此群組 |
- 另個常見方法會在兄弟層級上進行增減（譬如表格或列表的追加刪除）
| 相對位置做插入   |                   |
| ---------------- | ----------------- |
| .before("HTML")  | 同層之上增加 HTML |
| .after("HTML")   | 同層之下增加 HTML |
| .append("HTML")  | 內部之底增加 HTML |
| .prepend("HTML") | 內部之初增加 HTML |
- selector 能夠被複製移除或清空
- 也能接著繼續增加 add() 另一個 selector，便於之後 method 一同執行。
| 節點處理  |                                                          |
| --------- | -------------------------------------------------------- |
| .clone()  | 複製該 select 的節點內容                                 |
| .remove() | 把該 select 移除，會 return 目前 HTML                    |
| .detach() | 同上，但 return 會額外保留相關依據行為（適合有還原需求） |
| .empty()  | 把自己子內容清空                                         |
- 對 selector 的屬性操作，可輕鬆對 attr,style,class,id,value 做任何的存取調整。
- 其中 css 部分除了參數處理，也能用 json 包住做多筆 CSS 指定
| 屬性處理                                                                             |                                                                                |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| .attr("width") <br>.attr("width","100")                                              | 取得屬性 width 值 <br> 設定屬性 width=100                                      |
| .removeAttr("style")                                                                 | 移除屬性 style                                                                 |
| .addClass("hot")                                                                     | 增加 class=hot                                                                 |
| .removeClass("hot")                                                                  | 移除 class=hot                                                                 |
| .hasClass("hot")                                                                     | 檢查是否持有 class 為 hot                                                      |
| .toggleClass("hot")                                                                  | 增加或移除 class=hot                                                           |
| .css("color") <br> .css("color","red") <br> .css({"color":"red","font-size":"14px"}) | 取得 css 之 color 值<br>設定 CSS 之 color=red<br> 設定多筆 CSS（以 JSON 方式） |
| .val() <br> .val("loki")                                                             | 取得屬性 value 值<br>設定 value=loki                                           |
- 當你確認某 selector，還能繼續指定其他相對位置，不論上下或同層級。
- 也能透過 (selector) 做精準的過濾條件
| 遍歷 selector       |                                       |
| ------------------- | ------------------------------------- |
| .parent("#myid")    | 父層級且 id=myid 之目標               |
| .parents()          | 同上，延伸到所有祖先                  |
| .children(".mycls") | 子層級 (1 階）內之 class=mycls 之目標 |
| .find("li")         | 子孫層級 (N 階）內有 li 之目標        |
| .next()             | 該位置之同層級，找下一個標籤          |
| .prev()             | 該位置之同層級，找前一個標籤          |
| .siblings(selector) | 該位置之同層級，找到指定標籤          |
- 這裡包含了尺寸、定位點、載入與完成、event 事件等各種跟 Browser 有關的方法
- event 事件與 JavaScript 差異不大，差別於簡化了編寫上的速度
| BOM 相關                                                           |                                                                                                                                 |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| .width() 與 .height()                                              | 同 CSS 設定或取得 width 與 height 尺寸                                                                                          |
| .offset()                                                          | 回傳物件（絕對座標）包含。top 與。left                                                                                          |
| .position()                                                        | 回傳物件（相對座標）包含。top 與。left                                                                                          |
| .scrollLeft()                                                      | X 軸滾輪 bar 之位置或指定                                                                                                       |
| .scrollTop()                                                       | Y 軸滾輪 bar 之位置或指定                                                                                                       |
| .ready(function(){})                                               | DOM 載入完畢後執行 fucntion。<br>寫法為`$(document).reday(function(){})`，其實還提供另一種簡寫為 `$(function(){})`              |
| $(windows).load(function(){})<br>$(window).on('load',function(){}) | 網頁載入完畢後執行 fucntion                                                                                                     |
| .on("click",function(){})                                          | 添加 event 事件，參數分別為類型與執行 function。也可綁兩種事件做同件事，譬如<br> `on("focus blur",()=>{console.log("event")});` |
| .off("click",function(){})                                         | 關閉 event 事件，同上                                                                                                           |
| .click or .submit() or .hover() 等等                               | 與前者相同，屬於另一種簡略寫法                                                                                                  |

## CSS 與特效
JQ 的特效主要是協助快速控制 CSS，包含控制了你的 display 做顯示或隱藏，或是淡入淡出 opacity 變化等等。另外還有所謂的 animate，幫你做 keyframe 上的 from 到 to 的過渡效果。

| 特效運作                                                                                   |                                                                                               |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| .show() <br> .hide() <br> .Toggle()                                                        | 同等顯示，CSS 不符合 display:none <br>  同等隱藏，CSS 符合 display:none <br> 前兩者之互斥交換 |
| .fadeIn(speed) <br> .fadeOut(speed) <br> .fadeToggle(speed) <br> .fadeTo(speed,opacity)    | 淡入淡出效果，等於 CSS 變化速度+透明度值                                                      |
| .slideDown(speed,callback) <br> .slideUp(speed,callback) <br> .slideToggle(speed,callback) | 滑入滑出效果，等於 CSS 變化速度+高度值                                                        |
| .delay(speed)                                                                              | 延遲特效觸發時間                                                                              |
| .stop()                                                                                    | 停止此 selector 正發生的特效                                                                  |
| .animate(css,speed)                                                                        | 以 frame 方式去產生 CSS 變化，支援 JSON（多筆 CSS)                                            |