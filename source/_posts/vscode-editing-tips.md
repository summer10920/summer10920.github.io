---
title: "VSCode / Cursor：快捷鍵、Emmet 與 Git 操作"
categories:
  - 工具與其他
  - 開發工具
tag:
  - VSCode
  - Cursor
  - HTML
  - CSS
date: 2026-11-28 14:00:00
updated: 2026-11-28 14:00:00
hidden: false
---

![](/assets/images/banner/vscode-cursor.png)

編輯器用得順不順，差在手有沒有離開鍵盤。這篇整理 VSCode 與 Cursor 共通的快捷鍵、Emmet 縮寫語法，以及編輯器內的 Git 圖形操作，只留現在每天會用到的部分。閱讀順序是快捷鍵、Emmet、Git，最後附專有名詞。

<!-- more -->

{% note info %}
**這篇取代 2020 年的舊文**
舊文〈VSCode 2020 年版：技巧大補帖〉的快捷鍵、Emmet、Git 內容已併入本文並依現況精簡；套件與設定請看 {% post_link vscode-cursor-settings %} 與 {% post_link vscode-extension %}。
{% endnote %}

# 快捷鍵

VSCode 與 Cursor 的快捷鍵完全相同。下面寫的是 Windows／Linux 的按法；Mac 多半是把 <kbd>Ctrl</kbd> 換成 <kbd>Cmd</kbd>、<kbd>Alt</kbd> 換成 <kbd>Option</kbd>，鍵位不一樣的另外標註。要查全部對應，可以按 <kbd>Ctrl/Cmd</kbd>+<kbd>K</kbd> <kbd>Ctrl/Cmd</kbd>+<kbd>S</kbd> 開啟鍵盤快速鍵頁，搜尋功能名稱。

## 通用與檔案

- <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（或 <kbd>F1</kbd>）：命令面板，所有功能都能在這裡用名稱找到，例如 `Sort Lines Ascending`
- <kbd>Ctrl/Cmd</kbd>+<kbd>P</kbd>：用檔名關鍵字快速開啟檔案，比在檔案總管裡慢慢找快得多
- <kbd>Ctrl/Cmd</kbd>+<kbd>,</kbd>：開啟設定
- <kbd>Ctrl/Cmd</kbd>+<kbd>S</kbd>：存檔；<kbd>Ctrl/Cmd</kbd>+<kbd>K</kbd> <kbd>S</kbd> 全部存檔
- <kbd>Ctrl/Cmd</kbd>+<kbd>W</kbd>：關閉目前分頁；<kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> 重新開啟剛關掉的分頁
- <kbd>Ctrl</kbd>+<kbd>Tab</kbd>：在最近開過的分頁間切換（Mac 也是 <kbd>Ctrl</kbd>）

## 基本編輯

- <kbd>Alt</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd>：整行上下移動（Mac：<kbd>Option</kbd>）

![整行上下移動](/assets/images/WDY6I7B.gif)

- <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd>：整行複製到上方或下方

![整行複製](/assets/images/XrEIzNy.gif)

- <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd>：刪除整行
- <kbd>Ctrl/Cmd</kbd>+<kbd>Enter</kbd> / <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>Enter</kbd>：在下方、上方插入空行，游標不必在行尾
- <kbd>Ctrl/Cmd</kbd>+<kbd>/</kbd>：切換單行註解；<kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>A</kbd>（Mac：<kbd>Shift</kbd>+<kbd>Option</kbd>+<kbd>A</kbd>）切換區塊註解
- <kbd>Ctrl/Cmd</kbd>+<kbd>]</kbd> / <kbd>[</kbd>：增加、減少縮排
- 折疊程式碼：Windows 是 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>[</kbd> / <kbd>]</kbd>，Mac 是 <kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>[</kbd> / <kbd>]</kbd>
- <kbd>Alt</kbd>+<kbd>Z</kbd>：切換自動換行（只影響顯示，不改檔案）
- 游標未選取文字時，<kbd>Ctrl/Cmd</kbd>+<kbd>X</kbd>、<kbd>Ctrl/Cmd</kbd>+<kbd>C</kbd> 會剪下、複製整行

## 搜尋與替換

- <kbd>Ctrl/Cmd</kbd>+<kbd>F</kbd>：在目前檔案搜尋；替換在 Windows 是 <kbd>Ctrl</kbd>+<kbd>H</kbd>，Mac 是 <kbd>Option</kbd>+<kbd>Cmd</kbd>+<kbd>F</kbd>
- <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>：在整個專案搜尋；<kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd> 整個專案替換
- 搜尋框開啟時，<kbd>Alt</kbd>+<kbd>C</kbd> / <kbd>R</kbd> / <kbd>W</kbd> 切換大小寫、正規表示式、完整單字（Mac：<kbd>Cmd</kbd>+<kbd>Option</kbd>+ 同一字母）
- <kbd>Alt</kbd>+<kbd>Enter</kbd>：在搜尋結果中，把所有符合項目一次選取成多個游標

## 選取與多游標

多游標是編輯器裡最划算的技巧：同時改好幾個地方，不必逐一複製貼上。

- <kbd>Ctrl/Cmd</kbd>+<kbd>D</kbd>：選取游標所在的字，再按一次就加選下一個相同的字。選過頭了，用 <kbd>Ctrl/Cmd</kbd>+<kbd>U</kbd> 退回上一步

![逐一加選相同的字](/assets/images/siAPKSl.gif)

- <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>：一次選取檔案內所有相同的字

![一次選取所有相同的字](/assets/images/anKpJcC.gif)

- <kbd>Alt</kbd>+<kbd>Click</kbd>：在點擊的位置多加一個游標（Mac：<kbd>Option</kbd>+<kbd>Click</kbd>）
- <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd>：在上一行、下一行的相同位置加游標（Mac：<kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd>）

![上下加游標](/assets/images/zKibzO9.gif)

- <kbd>Shift</kbd>+<kbd>Alt</kbd>+拖曳滑鼠：用方框選取一整欄（Mac：<kbd>Shift</kbd>+<kbd>Option</kbd>）

![方框選取](/assets/images/hEwYPjF.gif)

- <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>→</kbd> / <kbd>←</kbd>：依語法層級逐步擴大、縮小選取範圍（Mac：<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Cmd</kbd>+<kbd>→</kbd> / <kbd>←</kbd>）

![智慧擴大選取](/assets/images/odAtul6.gif)

- <kbd>Ctrl/Cmd</kbd>+<kbd>L</kbd>：選取整行；<kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd>（Mac：<kbd>Shift</kbd>+<kbd>Option</kbd>+<kbd>I</kbd>）在選取範圍的每一行行尾加游標

## 導覽與程式碼理解

- <kbd>Ctrl</kbd>+<kbd>G</kbd>：跳到指定行號（Mac 也是 <kbd>Ctrl</kbd>）
- <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd>：跳到目前檔案內的函式或變數；搜尋框輸入 <kbd>:</kbd> 可依類型分組。檔案總管的「大綱」也有同樣功能

![跳到檔案內的符號](/assets/images/QvJ9vk2.gif)

- <kbd>Ctrl/Cmd</kbd>+<kbd>T</kbd>：跳到整個專案內的符號

![跳到專案內的符號](/assets/images/vgzZkBd.png)

- <kbd>F12</kbd>：移至定義；游標放在已使用的函式或變數上按，就會跳到它宣告的地方

![移至定義](/assets/images/K7pJDZ1.gif)

- <kbd>Alt</kbd>+<kbd>F12</kbd>：不離開目前位置，用小視窗查看定義（Mac：<kbd>Option</kbd>+<kbd>F12</kbd>）

![查看定義](/assets/images/7Zy45tj.gif)

- <kbd>Shift</kbd>+<kbd>F12</kbd>：列出所有用到它的地方，宣告與使用都在內

![尋找所有參考](/assets/images/Glish29.gif)

- <kbd>F2</kbd>：重新命名符號，同步修改所有引用
- <kbd>Alt</kbd>+<kbd>←</kbd> / <kbd>→</kbd>：游標位置的上一步、下一步，跳轉之後用來回到原處（Mac：<kbd>Ctrl</kbd>+<kbd>-</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>-</kbd>）
- <kbd>F8</kbd> / <kbd>Shift</kbd>+<kbd>F8</kbd>：跳到下一個、上一個錯誤或警告
- <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>&#92;</kbd>：跳到對應的括號
- <kbd>Ctrl</kbd>+<kbd>Space</kbd>：手動叫出智慧輸入建議

![智慧輸入建議](/assets/images/Vc5juNu.gif)

- 選取範圍後在命令面板輸入 `Transform to`，可以轉換大小寫、駝峰、底線命名等

![轉換大小寫](/assets/images/wHUHLAk.png)

## 格式化

- <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd>：格式化整份文件（Mac：<kbd>Shift</kbd>+<kbd>Option</kbd>+<kbd>F</kbd>）
- <kbd>Ctrl/Cmd</kbd>+<kbd>K</kbd> <kbd>Ctrl/Cmd</kbd>+<kbd>F</kbd>：只格式化選取範圍

![格式化選取範圍](/assets/images/wJXtS3j.gif)

用哪個格式化器由 `editor.defaultFormatter` 決定，設定方式見 {% post_link vscode-cursor-settings %}。

## 視窗與面板

- <kbd>Ctrl/Cmd</kbd>+<kbd>&#92;</kbd>：分割編輯視窗並排；<kbd>Ctrl/Cmd</kbd>+<kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> 切換到第幾個分割
- <kbd>Ctrl/Cmd</kbd>+<kbd>B</kbd>：顯示或隱藏側邊欄
- <kbd>Ctrl</kbd>+<kbd>&#96;</kbd>：開關整合終端機（Mac 也是 <kbd>Ctrl</kbd>）；<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>&#96;</kbd> 新增一個終端機
- <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> 檔案總管、<kbd>X</kbd> 擴充套件、<kbd>D</kbd> 偵錯、<kbd>M</kbd> 問題面板；Git 是 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd>（Mac 也是 <kbd>Ctrl</kbd>）
- <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd>：Markdown 預覽；<kbd>Ctrl/Cmd</kbd>+<kbd>K</kbd> <kbd>V</kbd> 在旁邊開預覽
- <kbd>Ctrl/Cmd</kbd>+<kbd>K</kbd> <kbd>Z</kbd>：禪模式，隱藏所有面板只留編輯區，連按兩次 <kbd>Esc</kbd> 離開
- <kbd>Ctrl/Cmd</kbd>+<kbd>=</kbd> / <kbd>-</kbd>：放大、縮小介面

## 偵錯

- <kbd>F9</kbd>：切換中斷點；<kbd>F5</kbd> 開始或繼續偵錯；<kbd>Shift</kbd>+<kbd>F5</kbd> 停止
- <kbd>F10</kbd> 單步跳過；<kbd>F11</kbd> 單步進入；<kbd>Shift</kbd>+<kbd>F11</kbd> 單步跳出

Mac 的筆電鍵盤上，功能鍵預設可能要搭配 <kbd>Fn</kbd> 才會當成 <kbd>F1</kbd>～<kbd>F12</kbd> 使用。

## AI 輔助編輯

AI 功能的預設快捷鍵會隨版本調整，以下是常見預設，實際請在鍵盤快速鍵頁搜尋 `Copilot` 或 `Cursor` 確認：

- 接受 AI 行內補全建議：<kbd>Tab</kbd>，兩款編輯器相同
- VSCode（GitHub Copilot）：<kbd>Ctrl/Cmd</kbd>+<kbd>I</kbd> 在游標處開啟行內對話，要求 AI 改寫選取的程式碼
- Cursor：<kbd>Ctrl/Cmd</kbd>+<kbd>K</kbd> 行內編輯，<kbd>Ctrl/Cmd</kbd>+<kbd>L</kbd> 開啟 Chat 對話

# Emmet 縮寫語法

Emmet 是內建的縮寫展開工具：輸入一小段縮寫，按 <kbd>Tab</kbd> 或 <kbd>Enter</kbd> 接受建議，就展開成完整的 HTML 或 CSS。語法借用 CSS 選擇器的觀念，所以學過選擇器就很好記。本章先講怎麼組出結構，再講屬性與內容，最後是假文、HTML 與 CSS 專用的縮寫，以及在 JSX 與 Tailwind 專案的注意事項。

## 結構：標籤、子代、兄弟、重複

- 標籤名稱直接展開：`div` 得到 `<div></div>`，`span` 得到 `<span></span>`
- `>` 表示子代，可以連續串接：

```html
<!-- nav>ul>li -->
<nav>
  <ul>
    <li></li>
  </ul>
</nav>
```

- `+` 表示相鄰的兄弟：

```html
<!-- div+p+bq -->
<div></div>
<p></p>
<blockquote></blockquote>
```

- `^` 表示回到上一層。縮寫是一路連續寫下去的，需要回到上層再接另一個元素時用它，連續的 `^^` 會連續往上退：

```html
<!-- div+div>p>span+em^bq -->
<div></div>
<div>
  <p><span></span><em></em></p>
  <blockquote></blockquote>
</div>

<!-- div+div>p>span+em^^bq -->
<div></div>
<div>
  <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

- `*` 表示重複：

```html
<!-- ul>li*3 -->
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

- `()` 表示群組，確保括號內先成為一個整體，適合組出多個並列的子結構：

```html
<!-- div>(header>ul>li*2>a)+footer>p -->
<div>
  <header>
    <ul>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
    </ul>
  </header>
  <footer>
    <p></p>
  </footer>
</div>
```

## 屬性與內容

- `#` 與 `.`：寫入 id 與 class，同一元素可以串接多個 class，沒寫標籤名稱時預設是 `div`：

```html
<!-- form#search.wide -->
<form id="search" class="wide"></form>

<!-- p.class1.class2 -->
<p class="class1 class2"></p>

<!-- .container -->
<div class="container"></div>
```

- `[]`：寫入任意屬性，多個屬性用空格分開，值有空格時加引號：

```html
<!-- td[title="Hello world" colspan=3] -->
<td title="Hello world" colspan="3"></td>
```

- `$`：項目編號，每個 `$` 代表一位數；`@-` 反向，`@3` 從 3 開始：

```html
<!-- ul>li.item$*3 -->
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
</ul>

<!-- ul>li.item$$$*2 -->
<ul>
  <li class="item001"></li>
  <li class="item002"></li>
</ul>

<!-- ul>li.item$@-*3 -->
<ul>
  <li class="item3"></li>
  <li class="item2"></li>
  <li class="item1"></li>
</ul>

<!-- ul>li.item$@3*3 -->
<ul>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
```

- `{}`：元素內的文字，也能搭配 `$`。大括號緊貼元素，文字屬於該元素；寫在 `>` 之後，則文字進入子代，後面接的內容就在子代裡面：

```html
<!-- a{Click me} -->
<a href="">Click me</a>

<!-- ul>li{item$}*3 -->
<ul>
  <li>item1</li>
  <li>item2</li>
  <li>item3</li>
</ul>

<!-- p>{Click }+a{here}+{ to continue} -->
<p>
  Click <a href="">here</a> to continue
</p>
```

- 隱式標籤：省略標籤名稱時，Emmet 依父元素猜測該用什麼：

```html
<!-- ul>.item -->
<ul>
  <li class="item"></li>
</ul>

<!-- table>.row>.col -->
<table>
  <tr class="row">
    <td class="col"></td>
  </tr>
</table>

<!-- em>.note -->
<em><span class="note"></span></em>
```

## 假文

- `lorem` 產生約 30 個字的英文假文，`lorem10` 產生 10 個字，也能接在結構後面，例如 `ul>li*3>lorem5`
- 內建的 Emmet 只有英文（拉丁文）假文。需要繁體中文版面測試時，安裝 Chinese Lorem（見 {% post_link vscode-extension %}），輸入 `ctlorem` 或 `ctlorem120` 按 <kbd>Tab</kbd>

## HTML 縮寫

HTML 除了結構語法，還有一批固定的縮寫，輸入 `標籤:類型` 的形式，編輯器會列出候選。不需要背，記得「標籤加冒號」就能從提示找到：

- `!`：HTML5 基本結構，包含 `<!DOCTYPE html>`、`<html lang>`、`<meta charset>`、viewport 與 `<title>`
- `link:css`：外部樣式表連結；`script:src` 是外部腳本；`meta:vp` 是 viewport 的 `<meta>`
- `a:link`、`a:blank`（新分頁開啟，含 `rel="noopener noreferrer"`）、`a:mail`、`a:tel`：各種連結
- `img` 自動帶出 `src` 與 `alt`；`input:email`、`input:number`、`input:c`（checkbox）等依類型產生欄位
- 縮短標籤名稱：`bq` 是 blockquote、`fig` 與 `figc` 是 figure 與 figcaption、`btn` 是 button、`sect` 是 section、`art` 是 article、`hdr` 是 header、`ftr` 是 footer、`mn` 是 main

完整清單在 Emmet 官方的 [HTML 縮寫表](https://github.com/emmetio/emmet/blob/master/snippets/html.json)，需要時查就好。

## CSS 縮寫

CSS 縮寫是「屬性縮寫＋值」，值省略冒號也能被判斷：

```css
/* m10 */
margin: 10px;

/* m-5 */
margin: -5px;

/* p5-10 */
padding: 5px 10px;

/* m1.5 */
margin: 1.5em;

/* m2rem */
margin: 2rem;

/* w100p */
width: 100%;

/* c#3 */
color: #333;

/* m30p! */
margin: 30% !important;
```

- 整數預設單位是 `px`，小數預設是 `em`；後綴可指定其他單位，`p` 代表 `%`、`e` 代表 `em`、`x` 代表 `ex`
- 複合屬性的多個值用 `-` 分開，負值也用 `-` 表示；已經帶單位後綴時，值之間就不用 `-`
- 末尾的 `!` 加上 `!important`
- 縮寫太多記不住時，用模糊搜尋：寫印象中的片段（例如 `ovh`、`ov:h`）即可帶出 `overflow: hidden`
- 屬性縮寫對照在 Emmet 官方的 [Cheat Sheet](https://docs.emmet.io/cheat-sheet/)

{% note warning %}
**舊式的廠商前綴寫法**
以前可以在縮寫前加 `-` 一次展開 `-webkit-`、`-moz-` 等前綴版本。現在主流做法是由建置工具（如 PostCSS 的 Autoprefixer）自動補前綴，不需要手寫，所以這個功能幾乎用不到。
{% endnote %}

## 在 JSX、Angular 與 Tailwind 專案使用

- JSX（`.jsx`、`.tsx`）：Emmet 預設也能用，輸入 `.box` 會展開成 `<div className="box"></div>`，自動使用 `className`
- Angular 模板與 Vue 等 `.html` 檔：照一般 HTML 使用
- Tailwind 專案：`div.flex.gap-4.p-4` 可以展開成多個 class。但含有 `[ ]` 或 `/` 的 class（例如 `w-[200px]`、`w-1/2`）在縮寫裡會被當成 Emmet 語法，這類 class 展開後再手動補上

# 編輯器內的 Git 操作

Git 的核心操作仍建議在終端機用指令完成，編輯器的原始檔控制面板負責「看差異、挑選要提交的內容」這類用滑鼠比較直覺的事。本章只列面板內常用的幾項。

- 變更與差異：開啟原始檔控制面板（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd>），點選檔案可用顏色對照與上次提交的差異。命令面板執行 `Toggle Inline View`，可以在並排與上下合併兩種比對顯示間切換
- 暫存與取消暫存：檔案旁的 `+` 加入暫存，`-` 退出暫存，也可以只暫存選取的幾行
- 切換分支：左下角的分支名稱可以切換分支，也能建立新分支
- 復原上一次提交：面板的「更多動作」選單有「Undo Last Commit」，作用等於 `git reset --soft HEAD~`，變更會回到暫存區
- 行號旁的色條：編輯受 Git 追蹤的檔案時，新增、修改、刪除的行會在行號旁以不同顏色標示，點擊可直接看差異並還原該處

想看每一行是誰改的、檔案歷史與分支比較，可以安裝 GitLens，套件說明見 {% post_link vscode-extension %}。

# 專有名詞中英對照

## 快捷鍵

- 命令面板（Command Palette）
- 多游標（Multi-cursor）
- 方框選取（Column Selection）
- 移至定義（Go to Definition）
- 查看定義（Peek Definition）
- 重新命名符號（Rename Symbol）
- 智慧輸入建議（IntelliSense）
- 禪模式（Zen Mode）
- 中斷點（Breakpoint）

## Emmet 縮寫語法

- 縮寫展開（Abbreviation Expansion）
- 子代（Child）
- 兄弟（Sibling）
- 群組（Grouping）
- 隱式標籤（Implicit Tag）
- 假文（Lorem Ipsum）
- 廠商前綴（Vendor Prefix）

## 編輯器內的 Git 操作

- 原始檔控制（Source Control）
- 暫存（Stage）
- 提交（Commit）
- 差異比對（Diff）
