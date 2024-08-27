---
title: "[學習之路] VSCode 的技巧大補帖"
categories:
  - Zero Road
  - Tools
tag:
  - VSCode
date: 2020-10-23 16:02:24
---

VSCode 為 Microsoft 所提供的免費編譯器軟體，是近幾年市佔率蠻高的選擇。因此認真研究寫了一篇使用 VSCode 所需要會的技巧。而這些資訊大部分從官方文件就能找到，只有擴充模組就看行圈內的流行性話題了。

<!-- more -->

# 快捷鍵篇
VSCODE 提供強大的快捷鍵使用，詳細資訊收錄在官方手冊或者可透過 VSCODE 軟體的 [說明->鍵盤快速鍵參考](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf) 取得線上說明。本節將全體翻譯並提取部分實用做細部說明。

## General 一般指令
- <kbd>Ctrl+Shift+P</kbd> <kbd>F1</kbd> 命令選擇區
- <kbd>Ctrl+P</kbd> <kbd>Ctrl+E</kbd> 快速檔案開啟
比起透過工作區慢慢找檔案，該指令可找到最近開啟的，也能用輸入檔名之關鍵字找到工作區內的檔案。
- <kbd>Ctrl+Shift+N</kbd> 開啟新的 VSCODE
- <kbd>Ctrl+Shift+W</kbd> 關閉目前的 VSCODE
- <kbd>Ctrl+,</kbd> 用戶設定
- <kbd>Ctrl+K Ctrl+S</kbd> 鍵盤快速鍵

## Basic editing 基本編輯
- <kbd>Ctrl+X</kbd> 剪下該行（未選取可）
- <kbd>Ctrl+C</kbd> 複製該行 （未選取可）
- <kbd>Alt+ ↑ / ↓</kbd> 移動該行至上下處
快速將目前位置進行整行移動於上或下方指定處。
![move_line](https://i.imgur.com/WDY6I7B.gif)
- <kbd>Shift+Alt + ↓ / ↑</kbd> 複製該行至上下處
快速將目前位置進行整行複製並貼於上或下方指定處。
![copy_line_down](https://i.imgur.com/XrEIzNy.gif)
- <kbd>Ctrl+Shift+K</kbd> 刪除該行並清除該行數
- <kbd>Ctrl+Enter</kbd> 插入空行於下方
- <kbd>Ctrl+Shift+Enter</kbd> 插入空行於上方
- <kbd>Ctrl+Shift+\</kbd> 跳至對應的區段符號處，例如`(), {}, []`
- <kbd>Home / End</kbd> 前往該行首或行尾處
- <kbd>Ctrl+Home / Ctrl+End</kbd> 前往編譯檔之頁首或頁尾
- <kbd>Ctrl+↑ / ↓</kbd> 朝上下滾動單行
- <kbd>Alt+PgUp / PgDn</kbd> 朝上下滾動單頁
- <kbd>Ctrl+K Ctrl+0</kbd> 收合所有程式碼
- <kbd>Ctrl+K Ctrl+J</kbd> 展開所有程式碼
- <kbd>Ctrl+K Ctrl+C</kbd> 轉為單行註解
- <kbd>Ctrl+K Ctrl+U</kbd> 解除單行註解
- <kbd>Ctrl+/</kbd> 切換單行註解
- <kbd>Shift+Alt+A</kbd> 切換區域註解
- <kbd>Alt+Z</kbd> 切換自動換行

## Navigation 導覽
- <kbd>Ctrl+T</kbd> 前往工作區內的符號
透過指令找到工作區內的變數或符號。
![go_to_symbol_in_workspace](https://i.imgur.com/vgzZkBd.png)
- <kbd>Ctrl+G</kbd> 前往行數
- <kbd>Ctrl+Shift+O</kbd> 前往編譯檔內的符號
透過指令找到某個變數或符號，能更快的前往符號位置。可於搜尋列內添加符號 <kbd>:</kbd> 做分組過濾。而視窗的檔案總管工具 [大綱] 也有相同功用。
![find_by_symbol](https://i.imgur.com/QvJ9vk2.gif)
- <kbd>Ctrl+Shift+M</kbd> 開啟問題視窗
- <kbd>F8</kbd> 跳至下一個錯誤或警告之代碼處
- <kbd>Shift+F8</kbd> 轉到上一個錯誤或警告之代碼處
- <kbd>Ctrl+Shift+Tab</kbd> 反向快切編譯歷史紀錄
- <kbd>Alt+ ← / →</kbd> 編譯歷史紀錄轉換
- <kbd>Ctrl+M</kbd> 切換 TAB 鍵應用

## Search and replace 搜尋替換
- <kbd>Ctrl+F</kbd> 搜尋
- <kbd>Ctrl+H</kbd> 替代
- <kbd>F3 / Shift+F3</kbd> 搜尋下一個或上一個符合項目
- <kbd>Alt+Enter</kbd> 在搜尋模式下將匹配的對象全部列入選取
- <kbd>Ctrl+D</kbd> 相同選取
將已選取特定段落做匹配代碼，往後搜尋若相同則賦予選取游標。若不小選多選取了，則可透過 <kbd>ctrl + U</kbd> 將游標動作返回上一步驟。
![add_cursor_current_selection_one_by_one](https://i.imgur.com/siAPKSl.gif)
- <kbd>Ctrl+K Ctrl+D</kbd> 將目前選擇調整為下一個匹配選取
- <kbd>Alt+C / R / </kbd> 切換大小寫/正則表達式/完整單詞

## Multi-cursor and selection 多重選取
- <kbd>Alt+Click</kbd> 加入選取
將滑鼠 click 指向之處，列入游標選取對象。
- <kbd>Ctrl+U</kbd> 復原上一次游標選取
- <kbd>Shift+Alt+I</kbd> 於圈選範圍下之各行末處添加游標
- <kbd>Ctrl+L</kbd> 選取當前行
- <kbd>Ctrl+Shift+L</kbd> <kbd>Ctrl+F2</kbd> 相同皆為全部選取
若整個檔案都想選取起來（瘋狂 ctrl+d? 別這樣），一樣先選中一組匹配段落後進行快速鍵，能將全部相同代碼都進行游標選取。
![add_cursor_current_selection](https://i.imgur.com/anKpJcC.gif)
- <kbd>Shift+Alt+ → / ←</kbd> 延伸智慧選取
停留於某局部代碼處，快速鍵可延伸至外部層級範圍代碼進行擴大選取，隨著連續按下次數越多，圈選的範圍越大直到全部。超過時可退回範圍選取透過 <kbd>shift + alt + ←</kbd> 退回。
![expandselection](https://i.imgur.com/odAtul6.gif)
- <kbd>Shift+Alt + (drag mouse)</kbd> 列框選取 - 滑鼠拖曳
壓住滑鼠進行拖曳對角線之區域選取，能產生類似方框範圍列向選取之效果。
![column-select](https://i.imgur.com/hEwYPjF.gif)
- <kbd>Ctrl+Shift+Alt + (arrow key)</kbd>  列框選取 - 方向範圍或游標處
以目前游標位置向下行之相同處，列入游標選取對象。反向 <kbd>↑</kbd> 亦可。
![multicursor](https://i.imgur.com/zKibzO9.gif)
- <kbd>Ctrl+Shift+Alt + PgUp/PgDn</kbd> 列框選取 - 分頁範圍
同上，範圍擴大為分頁單位

## Rich languages editing 語意編輯
- <kbd>Shift+Alt+F</kbd> 格式化文件
- <kbd>Ctrl+K Ctrl+F</kbd> 格式化選擇範圍
指定範圍內做排版格式化
![code_formatting](https://i.imgur.com/wJXtS3j.gif)
- <kbd>F12</kbd> 移至定義
游標放置於某已應用之 fn 或變數名稱上，透過 F12 或右鍵選擇 `移至定義` 能直接跳轉到該該定義宣告方便理解作用為何。
如果動作結束後想回到原本行位置可以透過 <kbd>alt + ←</kbd>回到上次游標。
![goto_definition](https://i.imgur.com/K7pJDZ1.gif)
- <kbd>Alt+F12</kbd> 查核定義
小視窗的呈現該對象之宣告定義為何。
![peek](https://i.imgur.com/7Zy45tj.gif)
- <kbd>Ctrl+K F12</kbd> 開啟參考
- <kbd>Shift+F12</kbd> 前往參考
小視窗的呈現所有編譯檔內的所有出現的 fn 或變數處，包含宣告與應用。
![find_all_references](https://i.imgur.com/Glish29.gif)
- <kbd>F2</kbd> 重新命名符號
- <kbd>Ctrl+K Ctrl+X</kbd> 刪除多餘的空白結尾
![trim_whitespace](https://i.imgur.com/nFmgots.gif)
- <kbd>Ctrl+K M</kbd> 切換檔案語言

## Editor management 編輯視窗管理
- <kbd>Ctrl+F4</kbd> <kbd>Ctrl+W</kbd> 關閉編譯視窗
- <kbd>Ctrl+K F</kbd> 關閉工作區
- <kbd>Ctrl+\</kbd> 分割編輯視窗
將目前編輯畫面分割視窗做並排，對終端機視窗也通用。
- <kbd>Ctrl+ 1 / 2 / 3</kbd> 依編譯視窗順序列切換
快切對應數字編號順序的編輯視窗切換。
- <kbd>Ctrl+Shift+PgUp / PgDn</kbd> 移動編輯視窗順序

## File management 檔案管理
- <kbd>Ctrl+N</kbd> 建立新檔
- <kbd>Ctrl+O</kbd> 開啟舊檔
- <kbd>Ctrl+S</kbd> 存檔
- <kbd>Ctrl+Shift+S</kbd> 另存
- <kbd>Ctrl+K S</kbd> 全部存檔
- <kbd>Ctrl+F4</kbd> 關閉
- <kbd>Ctrl+K Ctrl+W</kbd> 全部關閉
- <kbd>Ctrl+Shift+T</kbd> 重新開啟上次關閉之編譯
- <kbd>Ctrl+Tab</kbd> 跳至下一個編譯
隨著編輯視窗多重開啟，透過指令可快速來回切換這些視窗紀錄，並可利用 <kbd>alt + ←</kbd> 或 <kbd>alt + →</kbd>來回切換紀錄歷史步驟。
- <kbd>Ctrl+Shift+Tab</kbd> 跳至前一個編譯
- <kbd>Ctrl+K P</kbd> 複製當前的檔案實體路徑
- <kbd>Ctrl+K R</kbd> 檔案總管方式開啟檔案位置
- <kbd>Ctrl+K O</kbd> 另啟動 VSCODE 對檔案編譯
 
## Display 檢視項目
- <kbd>F11 全畫面
- <kbd>Ctrl+ = / -</kbd> 調整預覽比例
- <kbd>Ctrl+Shift+E</kbd> 切換檔案總管之焦點
- <kbd>Ctrl+Shift+F</kbd> 呼叫搜尋
- <kbd>Ctrl+Shift+G</kbd> 呼叫 GIT
- <kbd>Ctrl+Shift+D</kbd> 呼叫偵錯
- <kbd>Ctrl+Shift+X</kbd> 呼叫延伸模組
- <kbd>Ctrl+Shift+H</kbd> 呼叫替代
- <kbd>Ctrl+Shift+J</kbd> 切換搜尋進階模式
- <kbd>Ctrl+Shift+U</kbd> 呼叫輸出面板
- <kbd>Ctrl+Shift+V</kbd> 開啟 MarkDown 預覽
- <kbd>Ctrl+K V</kbd> 開啟 MarkDown 預覽於另側
- <kbd>Ctrl+K Z</kbd> 開啟禪宗模式
想要單純乾淨的畫面，可以使用快捷鍵調整畫面，如需退出只須連續 <kbd>ESC</kbd> 兩次即可。如需要檔案總管可使用 <kbd>ctrl + shift + E</kbd>事後滑鼠拖曳退出。
## Debug 
- <kbd>F9</kbd> 切換標記紅點
- <kbd>F5</kbd> 開始/繼續偵錯
- <kbd>Shift+F5</kbd> 停止偵錯
- <kbd>F11 / Shift+F11</kbd> Step into/out
- <kbd>F10</kbd> Step over
- <kbd>Ctrl+K Ctrl+I</kbd> Show hover

## Integrated terminal 終端機
- <kbd>Ctrl+`</kbd> 開啟終端機
- <kbd>Ctrl+Shift+`</kbd> 新增終端機
- <kbd>Ctrl+C</kbd> 複製
- <kbd>Ctrl+V</kbd> 貼上
- <kbd>Ctrl+↑ / ↓</kbd> 向上下滾動
- <kbd>Shift+PgUp / PgDn</kbd> 向上下滾動單頁
- <kbd>Ctrl+Home / End</kbd> 滾動至頂端尾端

## 其他
- <kbd>ctrl on</kbd> 簡易查詢
停留在某函式或變數時，按下 ctrl 能簡易查詢說明。
- 指令：切換大小寫
命令輸入 `>transform`，能將所選取的英文大小寫或字首切換。
![Image](https://i.imgur.com/wHUHLAk.png)
- <kbd>ctrl + I</kbd> 觸發智能輸入建議
![intellisense](https://i.imgur.com/Vc5juNu.gif)

# Emmet 篇
VSCODE 內建支援 Emmet 的縮寫語法，對於 HTML/CSS 能提高編寫速度，類似 CSS 選擇器的觀念作為符號應用。當你輸入一段指定縮寫符號後，透過 tab 就能轉成對應之 HTML/CSS 樹狀元素。

## 語法
- <kbd>element</kbd> 元素
直接輸入標籤名稱能得到完整元素結構。
```html
<!-- div -->
<div></div>
<!-- span -->
<span></span>
```
- <kbd>></kbd> 子代
與 CSS 選擇器相同觀念，指定元素關係為父子且可連續編列。
```html
<!-- nav>ul>li -->
<nav>
  <ul>
    <li></li>
  </ul>
</nav>
```
- <kbd>+</kbd> 兄弟
相鄰同層之編列，連續指定同層元素使用。
```html
<!-- div+p+bq -->
<div></div>
<p></p>
<blockquote></blockquote>
```
- <kbd>^</kbd> 上升父層
由於縮寫採連續性編寫，可能你需要返回上層繼續另一個編寫，此符號能讓你更彈性退回上層繼續編列。
```html
<!-- div+div>p>span+em -->
<div></div>
<div>
  <p><span></span><em></em></p>
</div>
<!--
  此時如果想對於 p 位置增加兄弟元素 bq，可以添加 `^` 退回 `>` 上層 p 位置繼續編譯。
  div+div>p>span+em^bq
-->
<div></div>
<div>
  <p><span></span><em></em></p>
  <blockquote></blockquote>
</div>
<!--
  連續的 `^` 能連續退回相對上層位置
  div+div>p>span+em^^bq
-->
<div></div>
<div>
  <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```
- <kbd>*</kbd> 乘法
重複的元素輸出，可透過乘法觀念進行實現
```html
<!-- ul>li*5 -->
<ul>
  <li></li>
</ul>
```
- <kbd>()</kbd> 群組化
將語法群組化能確保該段語法的優先執行，適合產生子樹狀結構規劃。
```html
<!-- div>(header>ul>li*2>a)+footer>p -->
<div>
  <header>
    <ul>
      <li><a href=""></a></li>
    </ul>
  </header>
  <footer>
    <p></p>
  </footer>
</div>
<!-- (div>dl>(dt+dd)*3)+footer>p -->
<div>
  <dl>
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
  </dl>
</div>
<footer>
  <p></p>
</footer>
```
- <kbd># / .</kbd> ID 與 Class
與 CSS 選擇器觀念相同，你可以標籤名稱綁定 id 或 class 到輸出元素，如需多 class 於同一元素亦可輕易完成。
```html
<!-- #header -->
<div id="header"></div>
<!-- .title -->
<div class="title"></div>
<!-- form#search.wide -->
<form id="search" class="wide"></form>
<!-- p.class1.class2.class3 -->
<p class="class1 class2 class3"></p>
<!-- div#header+div.page+div#footer.class1.class2.class3 -->
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```
- <kbd>[attr1=* attr2=*]</kbd> 寫入屬性
若需指定元素屬性（包含自訂），可以與 CSS 選擇觀念一致進行添加綁定。
```html
<!-- p[title="Hello world"] -->
<p title="Hello world"></p>
<!-- td[title="Hello world!" colspan=3] -->
<td title="Hello world!" colspan="3"></td>
<!-- td[rowspan=2 colspan=3 title] -->
<td rowspan="2" colspan="3" title=""></td>
<!-- [a='value1' b="value2"] -->
<div a="value1" b="value2"></div>
```
- <kbd>$</kbd> 項目編號
作為流水號作為文字編碼，每一個$代表 10 進位單元。額外添加 `@` 可控制降序或起始值。
```html
<!-- ul>li.item$*5 -->
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
<!-- ul>li.item$$$*5 -->
<ul>
  <li class="item001"></li>
  <li class="item002"></li>
  <li class="item003"></li>
  <li class="item004"></li>
  <li class="item005"></li>
</ul>
<!-- ul>li.item$@-*5 -->
<ul>
  <li class="item5"></li>
  <li class="item4"></li>
  <li class="item3"></li>
  <li class="item2"></li>
  <li class="item1"></li>
</ul>
<!-- ul>li.item$@3*5 -->
<ul>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
  <li class="item6"></li>
  <li class="item7"></li>
</ul>
<!-- ul>li.item$@-3*5 -->
<ul>
  <li class="item7"></li>
  <li class="item6"></li>
  <li class="item5"></li>
  <li class="item4"></li>
  <li class="item3"></li>
</ul>
```
- <kbd>{}</kbd> 文字串
能預先塞入元素內容文字。亦能整合 `$` 流水號使用。使用時注意擺放所謂的內容位置因不同有所差異。
```html
<!-- a{Click me} -->
<a href="">Click me</a>
<!-- ul>li{item$}*5 -->
<ul>
  <li>item1</li>
  <li>item2</li>
  <li>item3</li>
  <li>item4</li>
  <li>item5</li>
</ul>
<!-- 
  注意{}的位置如果是緊貼於元素代表為該元素之內容
  a{click}+b{here}
-->
<a href="">click</a>
<b>here</b>
<!--
  若{}的位置指定給子代，代表已歸入子代的內容範圍。雖然以內容值來探討相同結果，但後續之編寫已經入子代範圍。
  a>{click}+b{here}
-->
<a href="">
  click<b>here</b>
</a>
<!-- p{Click }+a{here}+{ to continue} -->
<p>Click </p>
<a href="">here</a> to continue
<!-- p>{Click }+a{here}+{ to continue} -->
<p>
  Click <a href="">here</a> to continue
</p>
```
- 隱式標籤
emmet 能預測列入編寫元素邏輯可能為 inline 或是 block 情況下，你能省略標籤名稱的輸入。
```html
<!-- .container -->
<div class="container"></div>
<!-- .wrap>.content -->
<div class="wrap">
  <div class="content"></div>
</div>
<!-- em>.class -->
<em><span class="class"></span></em>
<!-- ul>.class -->
<ul>
  <li class="class"></li>
</ul>
<!-- table>.row>.col -->
<table>
  <tr class="row">
    <td class="col"></td>
  </tr>
</table>
```
- Lorem 偽文本
可透過 Lorem 縮語產生約 30 單字的假文字串做為開發外觀測試，添加數字能控制單字數，也能輕易整合至其他縮語法，但必須是落於 `>` 之後不可放入{}使用，若搭配 ID 或 class 將被當作隱式標籤運作。
```html
<!-- lorem -->
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
<!-- lorem5 -->
Lorem ipsum dolor sit amet.
<!-- p*2>lorem -->
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quasi, corporis aut voluptate voluptatibus repudiandae odit odio quod veniam cupiditate, perferendis quisquam in. Quam, maiores fugit ducimus beatae veritatis vero.</p>
<p>Eaque delectus deserunt quod, itaque quos sapiente similique suscipit, atque tenetur corporis temporibus, sunt ea praesentium beatae impedit. Deleniti, error odit possimus rem at eos exercitationem sed hic labore fugit.</p>
<!-- ul.list>lorem10.item*2 -->
<ul class="list">
  <li class="item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, possimus!</li>
  <li class="item">Facere, accusantium asperiores? Ex, officiis. Odit nulla praesentium amet facere.</li>
</ul>
```

## HTML 轉換
emmet 除了提供縮寫語法，另外提供了 HTML 代碼轉換公式表收錄在 [snippets/html.json](https://github.com/emmetio/emmet/blob/master/snippets/html.json) 內，

舉幾個例來說，你可以輸入 `!` 就能獲得 HTML5 的基本宣告結構，或輸入 `link:css` 快速宣告一個 CSS 外部樣式表元素。你不需要熟背太多只需記得輸入 `tag` 搭配 `:` ，屆時 VSCODE 會適時地提示您有哪些 emmet 的 HTML 轉換。以下為 emmet 完整轉換公式表：
```json snippets/html.json
{
  "a": "a[href]",
  "a:blank": "a[href='http://${0}' target='_blank' rel='noopener noreferrer']",
  "a:link": "a[href='http://${0}']",
  "a:mail": "a[href='mailto:${0}']",
  "a:tel": "a[href='tel:+${0}']",
  "abbr": "abbr[title]",
  "acr|acronym": "acronym[title]",
  "base": "base[href]/",
  "basefont": "basefont/",
  "br": "br/",
  "frame": "frame/",
  "hr": "hr/",
  "bdo": "bdo[dir]",
  "bdo:r": "bdo[dir=rtl]",
  "bdo:l": "bdo[dir=ltr]",
  "col": "col/",
  "link": "link[rel=stylesheet href]/",
  "link:css": "link[href='${1:style}.css']",
  "link:print": "link[href='${1:print}.css' media=print]",
  "link:favicon": "link[rel='shortcut icon' type=image/x-icon href='${1:favicon.ico}']",
  "link:mf|link:manifest": "link[rel='manifest' href='${1:manifest.json}']",
  "link:touch": "link[rel=apple-touch-icon href='${1:favicon.png}']",
  "link:rss": "link[rel=alternate type=application/rss+xml title=RSS href='${1:rss.xml}']",
  "link:atom": "link[rel=alternate type=application/atom+xml title=Atom href='${1:atom.xml}']",
  "link:im|link:import": "link[rel=import href='${1:component}.html']",
  "meta": "meta/",
  "meta:utf": "meta[http-equiv=Content-Type content='text/html;charset=UTF-8']",
  "meta:vp": "meta[name=viewport content='width=${1:device-width}, initial-scale=${2:1.0}']",
  "meta:compat": "meta[http-equiv=X-UA-Compatible content='${1:IE=7}']",
  "meta:edge": "meta:compat[content='${1:ie=edge}']",
  "meta:redirect": "meta[http-equiv=refresh content='0; url=${1:http://example.com}']",
  "meta:kw": "meta[name=keywords content]",
  "meta:desc": "meta[name=description content]",
  "style": "style",
  "script": "script",
  "script:src": "script[src]",
  "img": "img[src alt]/",
  "img:s|img:srcset": "img[srcset src alt]",
  "img:z|img:sizes": "img[sizes srcset src alt]",
  "picture": "picture",
  "src|source": "source/",
  "src:sc|source:src": "source[src type]",
  "src:s|source:srcset": "source[srcset]",
  "src:t|source:type": "source[srcset type='${1:image/}']",
  "src:z|source:sizes": "source[sizes srcset]",
  "src:m|source:media": "source[media='(${1:min-width: })' srcset]",
  "src:mt|source:media:type": "source:media[type='${2:image/}']",
  "src:mz|source:media:sizes": "source:media[sizes srcset]",
  "src:zt|source:sizes:type": "source[sizes srcset type='${1:image/}']",
  "iframe": "iframe[src frameborder=0]",
  "embed": "embed[src type]/",
  "object": "object[data type]",
  "param": "param[name value]/",
  "map": "map[name]",
  "area": "area[shape coords href alt]/",
  "area:d": "area[shape=default]",
  "area:c": "area[shape=circle]",
  "area:r": "area[shape=rect]",
  "area:p": "area[shape=poly]",
  "form": "form[action]",
  "form:get": "form[method=get]",
  "form:post": "form[method=post]",
  "label": "label[for]",
  "input": "input[type=${1:text}]/",
  "inp": "input[name=${1} id=${1}]",
  "input:h|input:hidden": "input[type=hidden name]",
  "input:t|input:text": "inp[type=text]",
  "input:search": "inp[type=search]",
  "input:email": "inp[type=email]",
  "input:url": "inp[type=url]",
  "input:p|input:password": "inp[type=password]",
  "input:datetime": "inp[type=datetime]",
  "input:date": "inp[type=date]",
  "input:datetime-local": "inp[type=datetime-local]",
  "input:month": "inp[type=month]",
  "input:week": "inp[type=week]",
  "input:time": "inp[type=time]",
  "input:tel": "inp[type=tel]",
  "input:number": "inp[type=number]",
  "input:color": "inp[type=color]",
  "input:c|input:checkbox": "inp[type=checkbox]",
  "input:r|input:radio": "inp[type=radio]",
  "input:range": "inp[type=range]",
  "input:f|input:file": "inp[type=file]",
  "input:s|input:submit": "input[type=submit value]",
  "input:i|input:image": "input[type=image src alt]",
  "input:b|input:button": "input[type=button value]",
  "input:reset": "input:button[type=reset]",
  "isindex": "isindex/",
  "select": "select[name=${1} id=${1}]",
  "select:d|select:disabled": "select[disabled.]",
  "opt|option": "option[value]",
  "textarea": "textarea[name=${1} id=${1} cols=${2:30} rows=${3:10}]",
  "marquee": "marquee[behavior direction]",
  "menu:c|menu:context": "menu[type=context]",
  "menu:t|menu:toolbar": "menu[type=toolbar]",
  "video": "video[src]",
  "audio": "audio[src]",
  "html:xml": "html[xmlns=http://www.w3.org/1999/xhtml]",
  "keygen": "keygen/",
  "command": "command/",
  "btn:s|button:s|button:submit": "button[type=submit]",
  "btn:r|button:r|button:reset": "button[type=reset]",
  "btn:d|button:d|button:disabled": "button[disabled.]",
  "fst:d|fset:d|fieldset:d|fieldset:disabled": "fieldset[disabled.]",
  "bq": "blockquote",
  "fig": "figure",
  "figc": "figcaption",
  "pic": "picture",
  "ifr": "iframe",
  "emb": "embed",
  "obj": "object",
  "cap": "caption",
  "colg": "colgroup",
  "fst": "fieldset",
  "btn": "button",
  "optg": "optgroup",
  "tarea": "textarea",
  "leg": "legend",
  "sect": "section",
  "art": "article",
  "hdr": "header",
  "ftr": "footer",
  "adr": "address",
  "dlg": "dialog",
  "str": "strong",
  "prog": "progress",
  "mn": "main",
  "tem": "template",
  "fset": "fieldset",
  "datag": "datagrid",
  "datal": "datalist",
  "kg": "keygen",
  "out": "output",
  "det": "details",
  "sum": "summary",
  "cmd": "command",
  "ri:d|ri:dpr": "img:s",
  "ri:v|ri:viewport": "img:z",
  "ri:a|ri:art": "pic>src:m+img",
  "ri:t|ri:type": "pic>src:t+img",
  "!!!": "{<!DOCTYPE html>}",
  "doc": "html[lang=${lang}]>(head>meta[charset=${charset}]+meta:vp+title{${1:Document}})+body",
  "!|html:5": "!!!+doc",
  "c": "{<!-- ${0} -->}",
  "cc:ie": "{<!--[if IE]>${0}<![endif]-->}",
  "cc:noie": "{<!--[if !IE]><!-->${0}<!--<![endif]-->}"
}
```

## CSS 轉換
CSS 也有代碼轉換公式表，主要是將你的 CSS 屬性與值進行簡化到僅幾個字母代表與數字之組合。因此 CSS 屬性有多少，簡寫公式就會跟著有多少，相對來說背則會有一定的輔助運作與機制需先以了解。

- 除了屬性也可填值
以範例來說明，可輸入 `m` 來轉換成 `margin:;` ，如果到此為止就太浪費了，你應該還會設定單位，不妨直接輸入一個 `m:10` 則會提供一個 `margin:10px` 的完整屬性值。
```css
*{
  /* m */
  margin: ;
  /* m:10 */
  margin: 10px;
}
```
使用 `:` 符號來表示屬性與值兩者，可以直接省略該符號 (emmet 會自行判斷）。若是複合屬性填寫多值時請使用 `-` 分開，如果值為負數也用 `-` 來表示（兩者各自表述不衝突）。
```css
*{
  /* m10 */
  margin: 10px;
  /* m-5 */
  margin: -5px;
  /* p5-10 */
  padding: 5px 10px;
  /* m-5-10 */
  margin: -5px 10px;
  /* m-5--10 */
  margin: -5px -10px;
}
```
- 單位轉換
當你需要輸入數字作為單位（當為整數則預設 px，若為浮點數則會預判 em)，後綴添加單位可輕易切換到其他單位，或者使用已定義之單位代號。如果複合屬性有使用後綴單位就不要用 `-` 作為多值分開避免被當作負值使用。
```css
*{
  /* m10 */
  margin: 10px;
  /* m1.5 */
  margin: 1.5em;
  /* m1.8em-2rem */
  margin: 1.8em -2rem;
  /* m5vw10vw */
  margin: 5vw 10vw;
  /* m1.8em */
  margin: 1.8em;
  /* m2rem */
  margin: 2rem;

  /*已定義之單位代號*/
  /* p5p */
  padding: 5%;
  /* p5e */
  padding: 5em;
  /* p5x */
  padding: 5ex;
  /* p10p30-5e */
  padding: 10% 30px 5em;
}
```
- 顏色碼
只對 16 進位代碼有效，偵測前綴符號 `#` 之值為顏色，若規則為不足 6 位元的參數為重複套入，若為 3 位元則為安全色碼。另外注意 vscode 的 emmet 色碼並沒有很完善於屬性值合併縮寫，也就是筆者不建議依賴此功能。
```css
*{
  /* c#3 */
  color: #333333;
  /* bg#f0 */
  background: #f0f0f0;
  /* bdc#123 */
  border-color: #112233;
}
```
- 強制性 !
符號 `!` 代表為 `!important` 加入至值的縮寫
```css
*{
  /* m30p! */
  margin: 30% !important;
}
```
- 相容瀏覽器
多數前端設計師為了滿足不同的瀏覽器都能正常發揮 CSS，通常會痛苦將屬性寫成不同瀏覽器能理解的多筆屬性編寫。你可以在屬性前綴開頭使用 `-` 要求此屬性要跨相容的多屬性寫法，emmet 會根據公式內的屬性定義自動帶出有哪些相容之編寫語。
```css
*{
  /* -bdrs */
  -webkit-border-radius: ;
  -moz-border-radius: ;
  border-radius: ;
  /* -trf */
  -webkit-transform: ;
  -moz-transform: ;
  -ms-transform: ;
  -o-transform: ;
  transform: ;
}
```
- 模糊關鍵與公式表
介紹公式表之前，emmet 對於 CSS 屬性值的縮寫非常的多不容易全部記住，因此為了讓編寫更有效率提供了模糊搜索方式。你只需要簡單的填寫印象中的縮寫，會自動嘗試提供關鍵單詞的可能清單供給選擇，即便不是正式公式縮寫也能試著靠印象帶出。
```css
*{
  /* ov:h */
  overflow: hidden;
  /* ovh */
  overflow: hidden;
  /* oh */
  overflow: hidden;
}
```
公式表可以從官方的 [Cheat Sheet](https://docs.emmet.io/cheat-sheet/) 了解，以下為 [emmet/snippets/css.json](https://github.com/emmetio/emmet/blob/master/snippets/css.json) 所抽取出來的轉換公式。
```json
{
  "@f": "@font-face {\n\tfont-family: ${1};\n\tsrc: url(${1});\n}",
  "@ff": "@font-face {\n\tfont-family: '${1:FontName}';\n\tsrc: url('${2:FileName}.eot');\n\tsrc: url('${2:FileName}.eot?#iefix') format('embedded-opentype'),\n\t\t url('${2:FileName}.woff') format('woff'),\n\t\t url('${2:FileName}.ttf') format('truetype'),\n\t\t url('${2:FileName}.svg#${1:FontName}') format('svg');\n\tfont-style: ${3:normal};\n\tfont-weight: ${4:normal};\n}",
  "@i|@import": "@import url(${0});",
  "@kf": "@keyframes ${1:identifier} {\n\t${2}\n}",
  "@m|@media": "@media ${1:screen} {\n\t${0}\n}",
  "ac": "align-content:start|end|flex-start|flex-end|center|space-between|space-around|stretch|space-evenly",
  "ai": "align-items:start|end|flex-start|flex-end|center|baseline|stretch",
  "anim": "animation:${1:name} ${2:duration} ${3:timing-function} ${4:delay} ${5:iteration-count} ${6:direction} ${7:fill-mode}",
  "animdel": "animation-delay:time",
  "animdir": "animation-direction:normal|reverse|alternate|alternate-reverse",
  "animdur": "animation-duration:${1:0}s",
  "animfm": "animation-fill-mode:both|forwards|backwards",
  "animic": "animation-iteration-count:1|infinite",
  "animn": "animation-name",
  "animps": "animation-play-state:running|paused",
  "animtf": "animation-timing-function:linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(${1:0.1}, ${2:0.7}, ${3:1.0}, ${3:0.1})",
  "ap": "appearance:none",
  "as": "align-self:start|end|auto|flex-start|flex-end|center|baseline|stretch",
  "b": "bottom",
  "bd": "border:${1:1px} ${2:solid} ${3:#000}",
  "bdb": "border-bottom:${1:1px} ${2:solid} ${3:#000}",
  "bdbc": "border-bottom-color:${1:#000}",
  "bdbi": "border-bottom-image:url(${0})",
  "bdbk": "border-break:close",
  "bdbli": "border-bottom-left-image:url(${0})|continue",
  "bdblrs": "border-bottom-left-radius",
  "bdbri": "border-bottom-right-image:url(${0})|continue",
  "bdbrrs": "border-bottom-right-radius",
  "bdbs": "border-bottom-style",
  "bdbw": "border-bottom-width",
  "bdc": "border-color:${1:#000}",
  "bdci": "border-corner-image:url(${0})|continue",
  "bdcl": "border-collapse:collapse|separate",
  "bdf": "border-fit:repeat|clip|scale|stretch|overwrite|overflow|space",
  "bdi": "border-image:url(${0})",
  "bdl": "border-left:${1:1px} ${2:solid} ${3:#000}",
  "bdlc": "border-left-color:${1:#000}",
  "bdlen": "border-length",
  "bdli": "border-left-image:url(${0})",
  "bdls": "border-left-style",
  "bdlw": "border-left-width",
  "bdr": "border-right:${1:1px} ${2:solid} ${3:#000}",
  "bdrc": "border-right-color:${1:#000}",
  "bdri": "border-right-image:url(${0})",
  "bdrs": "border-radius",
  "bdrst": "border-right-style",
  "bdrw": "border-right-width",
  "bds": "border-style:none|hidden|dotted|dashed|solid|double|dot-dash|dot-dot-dash|wave|groove|ridge|inset|outset",
  "bdsp": "border-spacing",
  "bdt": "border-top:${1:1px} ${2:solid} ${3:#000}",
  "bdtc": "border-top-color:${1:#000}",
  "bdti": "border-top-image:url(${0})",
  "bdtli": "border-top-left-image:url(${0})|continue",
  "bdtlrs": "border-top-left-radius",
  "bdtri": "border-top-right-image:url(${0})|continue",
  "bdtrrs": "border-top-right-radius",
  "bdts": "border-top-style",
  "bdtw": "border-top-width",
  "bdw": "border-width",
  "bfv": "backface-visibility:hidden|visible",
  "bg": "background:${1:#000}",
  "bga": "background-attachment:fixed|scroll",
  "bgbk": "background-break:bounding-box|each-box|continuous",
  "bgc": "background-color:#${1:fff}",
  "bgcp": "background-clip:padding-box|border-box|content-box|no-clip",
  "bgi": "background-image:url(${0})",
  "bgo": "background-origin:padding-box|border-box|content-box",
  "bgp": "background-position:${1:0} ${2:0}",
  "bgpx": "background-position-x",
  "bgpy": "background-position-y",
  "bgr": "background-repeat:no-repeat|repeat-x|repeat-y|space|round",
  "bgsz": "background-size:contain|cover",
  "bxsh": "box-shadow:${1:inset }${2:hoff} ${3:voff} ${4:blur} ${5:#000}|none",
  "bxsz": "box-sizing:border-box|content-box|border-box",
  "c": "color:${1:#000}",
  "cl": "clear:both|left|right|none",
  "cm": "/* ${0} */",
  "cnt": "content:'${0}'|normal|open-quote|no-open-quote|close-quote|no-close-quote|attr(${0})|counter(${0})|counters(${0})",
  "coi": "counter-increment",
  "colm": "columns",
  "colmc": "column-count",
  "colmf": "column-fill",
  "colmg": "column-gap",
  "colmr": "column-rule",
  "colmrc": "column-rule-color",
  "colmrs": "column-rule-style",
  "colmrw": "column-rule-width",
  "colms": "column-span",
  "colmw": "column-width",
  "cor": "counter-reset",
  "cp": "clip:auto|rect(${1:top} ${2:right} ${3:bottom} ${4:left})",
  "cps": "caption-side:top|bottom",
  "cur": "cursor:pointer|auto|default|crosshair|hand|help|move|pointer|text",
  "d": "display:block|none|flex|inline-flex|inline|inline-block|grid|inline-grid|subgrid|list-item|run-in|compact|table|inline-table|table-caption|table-column|table-column-group|table-header-group|table-footer-group|table-row|table-row-group|table-cell|ruby|ruby-base|ruby-base-group|ruby-text|ruby-text-group",
  "ec": "empty-cells:show|hide",
  "f": "font:${1:1em} ${2:sans-serif}",
  "fd": "font-display:auto|block|swap|fallback|optional",
  "fef": "font-effect:none|engrave|emboss|outline",
  "fem": "font-emphasize",
  "femp": "font-emphasize-position:before|after",
  "fems": "font-emphasize-style:none|accent|dot|circle|disc",
  "ff": "font-family:serif|sans-serif|cursive|fantasy|monospace",
  "fft": "font-family:\"Times New Roman\", Times, Baskerville, Georgia, serif",
  "ffa": "font-family:Arial, \"Helvetica Neue\", Helvetica, sans-serif",
  "ffv": "font-family:Verdana, Geneva, sans-serif",
  "fl": "float:left|right|none",
  "fs": "font-style:italic|normal|oblique",
  "fsm": "font-smoothing:antialiased|subpixel-antialiased|none",
  "fst": "font-stretch:normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
  "fv": "font-variant:normal|small-caps",
  "fvs": "font-variation-settings:normal|inherit|initial|unset",
  "fw": "font-weight:normal|bold|bolder|lighter",
  "fx": "flex",
  "fxb": "flex-basis:fill|max-content|min-content|fit-content|content",
  "fxd": "flex-direction:row|row-reverse|column|column-reverse",
  "fxf": "flex-flow",
  "fxg": "flex-grow",
  "fxsh": "flex-shrink",
  "fxw": "flex-wrap:nowrap|wrap|wrap-reverse",
  "fsz": "font-size",
  "fsza": "font-size-adjust",
  "gtc": "grid-template-columns:repeat()|minmax()",
  "gtr": "grid-template-rows:repeat()|minmax()",
  "gta": "grid-template-areas",
  "gt": "grid-template",
  "gg": "grid-gap",
  "gcg": "grid-column-gap",
  "grg": "grid-row-gap",
  "gac": "grid-auto-columns:auto|minmax()",
  "gar": "grid-auto-rows:auto|minmax()",
  "gaf": "grid-auto-flow:row|column|dense|inherit|initial|unset",
  "gd": "grid",
  "gc": "grid-column",
  "gcs": "grid-column-start",
  "gce": "grid-column-end",
  "gr": "grid-row",
  "grs": "grid-row-start",
  "gre": "grid-row-end",
  "ga": "grid-area",
  "h": "height",
  "jc": "justify-content:start|end|stretch|flex-start|flex-end|center|space-between|space-around|space-evenly",
  "ji": "justify-items:start|end|center|stretch",
  "js": "justify-self:start|end|center|stretch",
  "l": "left",
  "lg": "background-image:linear-gradient(${1})",
  "lh": "line-height",
  "lis": "list-style",
  "lisi": "list-style-image",
  "lisp": "list-style-position:inside|outside",
  "list": "list-style-type:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman",
  "lts": "letter-spacing:normal",
  "m": "margin",
  "mah": "max-height",
  "mar": "max-resolution",
  "maw": "max-width",
  "mb": "margin-bottom",
  "mih": "min-height",
  "mir": "min-resolution",
  "miw": "min-width",
  "ml": "margin-left",
  "mr": "margin-right",
  "mt": "margin-top",
  "ol": "outline",
  "olc": "outline-color:${1:#000}|invert",
  "olo": "outline-offset",
  "ols": "outline-style:none|dotted|dashed|solid|double|groove|ridge|inset|outset",
  "olw": "outline-width|thin|medium|thick",
  "op": "opacity",
  "ord": "order",
  "ori": "orientation:landscape|portrait",
  "orp": "orphans",
  "ov": "overflow:hidden|visible|hidden|scroll|auto",
  "ovs": "overflow-style:scrollbar|auto|scrollbar|panner|move|marquee",
  "ovx": "overflow-x:hidden|visible|hidden|scroll|auto",
  "ovy": "overflow-y:hidden|visible|hidden|scroll|auto",
  "p": "padding",
  "pb": "padding-bottom",
  "pgba": "page-break-after:auto|always|left|right",
  "pgbb": "page-break-before:auto|always|left|right",
  "pgbi": "page-break-inside:auto|avoid",
  "pl": "padding-left",
  "pos": "position:relative|absolute|relative|fixed|static",
  "pr": "padding-right",
  "pt": "padding-top",
  "q": "quotes",
  "qen": "quotes:'\\201C' '\\201D' '\\2018' '\\2019'",
  "qru": "quotes:'\\00AB' '\\00BB' '\\201E' '\\201C'",
  "r": "right",
  "rsz": "resize:none|both|horizontal|vertical",
  "t": "top",
  "ta": "text-align:left|center|right|justify",
  "tal": "text-align-last:left|center|right",
  "tbl": "table-layout:fixed",
  "td": "text-decoration:none|underline|overline|line-through",
  "te": "text-emphasis:none|accent|dot|circle|disc|before|after",
  "th": "text-height:auto|font-size|text-size|max-size",
  "ti": "text-indent",
  "tj": "text-justify:auto|inter-word|inter-ideograph|inter-cluster|distribute|kashida|tibetan",
  "to": "text-outline:${1:0} ${2:0} ${3:#000}",
  "tov": "text-overflow:ellipsis|clip",
  "tr": "text-replace",
  "trf": "transform:${1}|skewX(${1:angle})|skewY(${1:angle})|scale(${1:x}, ${2:y})|scaleX(${1:x})|scaleY(${1:y})|scaleZ(${1:z})|scale3d(${1:x}, ${2:y}, ${3:z})|rotate(${1:angle})|rotateX(${1:angle})|rotateY(${1:angle})|rotateZ(${1:angle})|translate(${1:x}, ${2:y})|translateX(${1:x})|translateY(${1:y})|translateZ(${1:z})|translate3d(${1:tx}, ${2:ty}, ${3:tz})",
  "trfo": "transform-origin",
  "trfs": "transform-style:preserve-3d",
  "trs": "transition:${1:prop} ${2:time}",
  "trsde": "transition-delay:${1:time}",
  "trsdu": "transition-duration:${1:time}",
  "trsp": "transition-property:${1:prop}",
  "trstf": "transition-timing-function:${1:fn}",
  "tsh": "text-shadow:${1:hoff} ${2:voff} ${3:blur} ${4:#000}",
  "tt": "text-transform:uppercase|lowercase|capitalize|none",
  "tw": "text-wrap:none|normal|unrestricted|suppress",
  "us": "user-select:none",
  "v": "visibility:hidden|visible|collapse",
  "va": "vertical-align:top|super|text-top|middle|baseline|bottom|text-bottom|sub",
  "w": "width",
  "whs": "white-space:nowrap|pre|pre-wrap|pre-line|normal",
  "whsc": "white-space-collapse:normal|keep-all|loose|break-strict|break-all",
  "wid": "widows",
  "wm": "writing-mode:lr-tb|lr-tb|lr-bt|rl-tb|rl-bt|tb-rl|tb-lr|bt-lr|bt-rl",
  "wob": "word-break:normal|keep-all|break-all",
  "wos": "word-spacing",
  "wow": "word-wrap:none|unrestricted|suppress|break-word|normal",
  "z": "z-index",
  "zom": "zoom:1"
}
```

# GIT 篇
操作 GIT 本身建議還是以 command 指令方式下達，VSCode 有終端機能輸入指令，而部分視窗化操作 VSCode 能協助你透過一些滑鼠點擊來完成。

- 指令：切換工作樹狀+-呈現
僅用於 git 比較時，工作樹狀編譯下可命令輸入 `>toggle inline view` 切換內嵌檢視方式。
- Changs 變更：
查詢檔案與快照的差異性 diff，透過顏色差異做檢視。
![msee-changes](https://i.imgur.com/Eaeb9s7.gif)
- Checkout Branch 切換分支
提供分支切換功能，也提供建立分支等作業。
![mswitch-branch](https://i.imgur.com/7Jzl0v1.gif)
- Stage Change 列入暫存
可透過 `+` 符號將修改的文件加入 Stage 內，可透過 `-` 退出暫存。
![mstage-unstage](https://i.imgur.com/OxXz1YG.gif)
- Undo last commit 取消上次提交
等於 `git reset HEAD~` 指令，還原到上一個提交狀態。
![mundo-last-commit](https://i.imgur.com/6RtzpjS.gif)
- Gutter indicators 間格提示
對工作區內的檔案進行編譯時（不是 GIT 視窗內的變更檢視），若此檔案有被 git 所觀察會額外提供一個小間格為變異上提示。
![mgutter_icons](https://i.imgur.com/Ls4Ewhp.gif)

# 擴充工具 （陸續更新）
除了直覺快速的介面操作、便利的專案與檔案管理，還有那些海量的擴充模組使用。套件不是一定需要的，每個人都有習慣的環境套件，找到符合自己的套件才是真正屬於自己的環境，以下是我推薦網頁設計師的模組應用。
![](assets/images/okdBYKh.png)

## 視覺外觀
屬於高亮提示或排版自動美化部分，方便在編輯程式碼時減少錯誤的宣告起始頭尾，也利於觀看程式碼能快速看出主體結構。

- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
幫你的{}大括弧上色，會自動對應不同顏色，幫助你輕鬆看準程式區段範圍。
- [Comment Translate](https://marketplace.visualstudio.com/items?itemName=intellsmi.comment-translate)
滑鼠停留在變數、函數或註解能自動 Google 翻譯（可繁體），易用於原作者之註解說明。
- [filesize](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize)
增加資訊於左下角對於檔案空間為多少的輕資訊。
- [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
當游標停留在某一個區段或是標籤上，能高亮提示該屬於那些區段範圍或對應的頭尾標籤位置。
- [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
協助你排版 (TAB) 的空格填塞淡色背景，能幫助你觀看對齊更方便。
- [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)
可簡單輕巧提示該圖片預覽並縮圖於行數左側。
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
對 HTML/CSS/JS 支援自動化 format 排版效果，提升美觀性容易維護。
- [SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer)
我們都知道內建支援圖片預覽但不支援 svg 格式，此套件可以補強此需求。
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
幫助 JS 跟 CSS 有更高亮的視覺輔助效果

## 系統輔助
一些偏向是偷吃步或省力的自動化修正全都在這裡，主要是加快你打 coding 速度，有些固定動作就由套件幫你完成。

- [Chinese Lorem](https://marketplace.visualstudio.com/items?itemName=KevinYang.ctlorem)
vscode 預設的快速假文為輸入 lorem，這個是中文版的只要輸入 ctlorem 即可且用法相同。
- [PrintCode](https://marketplace.visualstudio.com/items?itemName=nobuhito.printcode)
將目前的編譯內容進行列印輸出。透過 <kbd>F1</kbd> 輸入 `>printcode` 觸發。
- [Browser Preview](https://marketplace.visualstudio.com/items?itemName=auchenberg.vscode-browser-preview)
直接讓 VSCODE 扮演簡易瀏覽器，通常適合懶得另外開遊覽器的人，但十分簡易便是了。
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
針對指定的檔案與目錄產生簡易型 Web 伺服器並占用 port:5500，但不支援 PHP。
- ~~[Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
透過 github 的 gist 服務，能將多個 VSCODE 環境參數與套件模組進行上下傳同步，需要指定好 github 帳戶 ID 以及快捷鍵操作上下傳更新。~~
> 早期都靠此第三方工具，但現在 VSCode 已自己內建提供同步就不需要此擴充了，且更容易復原且自動化，可參考 [VSCODE 官方手冊](https://code.visualstudio.com/docs/editor/settings-sync)

## 程式語言
收錄網頁開發的程式語言為主，使用某宣告或函式能方便提示語法說明，不必背誦太多語法也能輕鬆找到指定宣告語言。

### HTML
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
自動幫你的標籤填上結尾標籤，支援 HTML/PHP/JS/VUE…等等，方便加快 coding 速度。
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
當你修改了某標籤，會自動幫你的結尾標籤也一起修改調整。
- [AutoFileName](https://marketplace.visualstudio.com/items?itemName=JerryHong.autofilename)
自動化的檔案名稱連結偵測，提供可用的連結提供選項使用。
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
自動化的智能連結偵測，提供可用的外部連結提供檔案路徑選項，僅限於 HTML 格式下作用。
- [Fake Image Snippet Collection](https://marketplace.visualstudio.com/items?itemName=yoyoys.fake-img-snippet-collection)
可以快速提供線上範例圖片可指定長寬，適用 img/css/md 用途，只要輸入 picsum 即可。
- [Encode Decode](https://marketplace.visualstudio.com/items?itemName=mitchdenny.ecdc)
編譯轉換，支援的語法非常多，比較常用的就是將網頁特別符號轉換成 HTML Encode。啟用方式為呼叫命令欄位 <kbd>F1</kbd> 輸入 `>Convert Selection` 進行工作。
- [HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint)
提供 HTML 的問題檢查，出現在問題視窗內，適合新手作為輔助調整。
- [PicGo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo)
可快速將圖片上傳到指定免圖空間（需設定）並轉換成 MD 圖片語法，透過快速鍵 <kbd>ctrl+alt+u/e/o</kbd>進行觸發。
- [vscode-imgur](https://marketplace.visualstudio.com/items?itemName=MaxfieldWalker.vscode-imgur)
快速將剪貼簿的內容圖片上傳至 imgur（可指定到個人帳戶），較簡單就能使用透過 <kbd>ctrl+alt+v</kbd> 觸發。

### CSS/Bootstrap/SASS
- ~~*[IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
會自動搜索你 CSS 樣式表，當你輸入 class=""時，輸入時提示你可用存在的 Class 名*~~
- [SCSS Everywhere](https://marketplace.visualstudio.com/items?itemName=gencer.html-slim-scss-css-class-completion)
與前面套件所不同作者之優化設計，比前一個更強大優良的版本且支援更多程式語言。
- [Bootstrap 4, Font awesome 4, Font Awesome 5 Free & Pro snippets](https://marketplace.visualstudio.com/items?itemName=thekalinga.bootstrap4-vscode)
BS 新手推薦，直接輸入關鍵字 fa5（或 fa4) 馬上給你 BS 語法全世界，超好用。
- [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)
使其支援 SASS 自動排版與自動化完成，以及擁有高亮度顯示效果。
- [language-stylus](https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus)
提供 CSS 預處理器 stylus 的高亮與代碼提示工具。
- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)
提供 CSS 預處理器 Sass/Scss 的即時編譯結果之即時 Web Server，預設產生通訊埠為 4520。

### JS/JQ/VUE
- [vscode-fileheader](https://marketplace.visualstudio.com/items?itemName=mikey.vscode-fileheader)
快速鍵 ctrl+ali+i 可產生於頁首/**/之作者註解，也能自訂化。
- [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
JS 相關常用語法的簡碼工具，縮短編譯 JS 的生產時間。
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
使其支援 Vue 自動排版與自動化完成，以及擁有高亮度顯示效果。

### Markdown
- [docs-markdown](https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-markdown)
透過 ALT+M 或是`F1`輸入`>docs`就能快速生成 MarkDown 標籤，MarkDown 初學者推薦。
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one#keyboard-shortcuts)
提供一些常用的快速鍵，方便 Markdown 編寫上手，以及支援預覽效果。
- [Pangu-Markdown](https://marketplace.visualstudio.com/items?itemName=xlthu.Pangu-Markdown)
編寫 MD 文件時能協助格式化，尤其在中英文穿插時表現非常良好，透過右鍵選擇 `Pangu Format` 觸發。

### PHP/SQL
- [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)
自動化的 PHP 代碼偵測，提供可用的函式或格式化整理等選項使用，僅限於 PHP 格式下作用。
> **建議關閉 VSCODE 內建的代碼**  
> 到擴展畫面 -> 搜尋輸入@builtin php -> 停用 PHP Language Features.
- [PHP IntelliSense](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense)
使 vscode 能支援 php 偵測錯誤與建議函式使用，需要額外設定 setting.json 指定該 php7 位置
```json setting.json
//for PHP IntelliSense, 讓 vscode 能看懂 php 幫你檢查錯誤或語法建議
"php.validate.executablePath": "C:/xampp/php/php.exe",
"php.executablePath": "C:/xampp/php/php.exe",
"php.suggest.basic": false,
```
> 此套件不含 format 功能，需額外安裝 [`php cs fixer`](https://marketplace.visualstudio.com/items?itemName=junstyle.php-cs-fixer)
- [jQuery Code Snippets](https://marketplace.visualstudio.com/items?itemName=donjayamanne.jquerysnippets)
JQ 新手推薦，直接輸入關鍵字 jq 馬上給你 jquery 語法全世界，超好用
- [MySQL](https://marketplace.visualstudio.com/items?itemName=formulahendry.vscode-mysql)
能直接對 SQL 伺服器連線進行 Command 處理執行操作，但無法勝過 phpmyadmin。

### GIT
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
彌補 VSCODE 的 GIT 圖形化工具，對於分支的發展有很大的幫助。在 GIT 功能上多了一個 icon 進行啟用即可呼叫視窗使用。
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
GitHub 的延伸工具。通過此擴展，您可以查看和管理 GitHub 拉取請求和問題。

# 參考文獻
- [Visual Studio Code Tips and Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [microsoft/vscode-docs/docs/getstarted/tips-and-tricks.md](https://github.com/microsoft/vscode-docs/blob/master/docs/getstarted/tips-and-tricks.md)
- [microsoft/vscode-docs/docs/editor/codebasics.md](https://github.com/microsoft/vscode-docs/blob/master/docs/editor/codebasics.md#multicursor-modifier)
- [Emmet Documentation](https://docs.emmet.io/)