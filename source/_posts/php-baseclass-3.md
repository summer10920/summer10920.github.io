---
title: "[基礎課程] PHP 匯入與加載"
categories:
  - Archived Courses
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-12 01:35:51
---
![](assets/images/banner/php.png)

PHP 能將程式碼分成多個 `*.php` 格式檔案透過匯入或加載的方式進行代碼整合，能適用在分工作業或特殊應用。請開始在 Web 目錄下新增檔案 **3_content.php**，為了簡化程式碼結構將不建置 HTML 基本結構。請開始做 PHP 各種練習並預覽網頁結果。

<!-- more -->

{% note primary %}
**素材準備：準備資料以方便下階段的教學練習** 
- 參考複製維基百科的電影資料，並設計一個電影資訊畫面。用 php 變數儲存以下項目：
  - `$name` //電影名稱
  - `$info` //簡介
  - `$image` //圖片名稱
  - `$userlist` //演員名單，多筆用`<li></li>`包住並列表
- 設計一個簡單的 HTML+TAG，有上面四項的顯示
- 然後變數帶到 HTML 內抽換使用<?= ?>。並嘗試用一些 style 去調整美化
```php 3_content.php
<?php
  $name="復仇者聯盟";
  $info="《<b>復仇者聯盟</b>》（英文：The Avengers）係一部 2012 年嘅美國電影，由 John Moore 執導兼編劇，Robert Downey Jr.、Chris Evans、Mark Ruffalo、Chris Hemsworth、Scarlett Johansson、Jeremy Renner、Tom Hiddleston、Clark Gregg、Cobie Smulders、Stellan Skarsgård、Samuel L. Jackson 主演。";
  $userlist="
    <li>鋼鐵人</li>
    <li>蜘蛛人</li>
    <li>美國隊長</li>
    <li>蟻人</li>
    <li>雷神索爾</li>
    <li>黑寡婦</li>
    <li>綠巨人浩克</li>
  ";
  $image="img.jpg";
?>

<img src="<?=$image?>" style="float:right;margin:10px;border:20px solid #cc0">
<h1 style="padding-top:30px"><?=$name?></h1>
<hr>
<p><?=$info?></p>
<h1 style="padding-top:30px">演員表</h1>
<hr>
<ul><?=$userlist?></ul>
```
{% endnote %}

---
# 匯入檔案的用途技巧
匯入檔案的意思是，你有一個 A.php 跟 B.php，在 A 的#code 裡面某處塞了一個指定函式帶入 B，這時候整個讀取效果等於 A 的#code 裡面有 B 的#code。這是很常見的做法且有不同的考量或優勢，簡單舉幾個例子：

- 分工作業上可以把一個完整 php，分開變成 A.php+B.php+C.php，進行團隊分工設計，最後再匯入合併顯示。
- 相同的 A.php 頁首頁尾風格，不一樣主題元件的 B.php 跟 C.php，設計更快風格也易修改。
- 隱藏不想被知道的 B.php 路徑名稱。透過匯入讓被知道的永遠只有 A.php
- 將元件函式庫模組放在 B.php，需要才匯入，管理起來像積木一樣彈性。

---
# include 和 include_once
- PHP 執行每行過程中讀到 include 的檔案時才將它讀進來。這種方式，可以把程式執行時的流程簡單化。
- include_once 會先檢查此引入檔案的內容是不是在之前就已經引入過了；如果是的話，便不會再次重複引入同樣的內容。可避免相同變數被異動發生非預期結果。

---
# require 和 require_once
跟 include 有相同的過程，但執行的觸發時機不同，PHP 執行前就會先讀入 require 檔案，使它變成 PHP 程式網頁的一部份。常用函式可寫成一個函式庫檔案，然後用這個方法將它引入網頁中。

---
# include vs require
- 如果你需要運算後的判斷是否匯入，用 include（因為 require 的觸發時機早已結束）
- 引不到 require 檔案會出現錯誤息，同時整個 php 程式會停止執行並失敗的中斷。
- 引不到 include 檔案會出現錯誤息，同時整個 php 程式會跳過繼續往後執行帶警告。
- require 適合用來引入靜態的內容（如不會變的文字或定義好的函式庫）
- include 則適合用來引入動態的程式碼（程式內容會依其他程式碼而變動）

練習：將原本的 3_content.php 進行挖空。上面 PHP 變數部分另存新增為 3_movie1.php，下面顯示部分另存為 3_layout.php。在這裡你會有 content,movie1,layout 三個檔案。而 content.php 用 include 帶回 movie1 跟 layout
```php
/****3_content.php****/
<?php include('3_movie1.php');?>
<?php include('3_layout.php');?>
```
此時重新整理 3_content.php，會發現跟修改前一樣，而其實這是組裝出來的網頁。

---
# 網址上的可見變數
網址上面常常看到後面有？加一堆東西。其實是一種可見的變數，語法為？變數=值。舉例來說　`https://www.youtube.com/watch?v=cwvfYL1Sgl8`，變數名稱為 v，內容是 cwvfYL1Sgl8。如果要多個變數用&進行串聯。而 php 要取得這個變數的語法為`$_GET['變數']`

練習：
1. 建立 3_main.php。設計以下內容
```php
<?php
echo "如果".$_GET['a'].", 那".$_GET['b']."... 因為除了你還是你";
?>
```
2. 此時遊覽網頁`3_main.php?a=我是九&b=你是三`看看效果如何

思考練習：
1. 複製 3_movie1.php 另存為 3_movie2.php，修改一下內容為第二部電影資訊。
2. 3_main.php 的舊練習請註解化不要執行，重新進行題目設計
3. 題目需求為執行 3_main.php 時
  - 畫面設計兩者超連結導向，分別網址為 `3_main.php?list=A` 與 `3_main.php?list=B`
  - 如果照著提示做，網頁 A 將呈現 3_movie1.php 的內容，網頁 B 呈現出 3_movie2.php 的內容
  - 但 A 跟 B 版型都一樣，只有資料不一樣。
4. 提示：你會用到 if else, include, !empty。
```php
<?php
/****3_main.php****/
// echo $_GET['a'].",".$_GET['b']."除了你還是你";

if(!empty($_GET['list'])){
  if($_GET['list']=='A') include('3_movie1.php');
  if($_GET['list']=='B') include('3_movie2.php');
  include('3_layout.php');
}
else{
  echo '
    <a herf="3_main.php?list=A">電影介紹 A</a>
    <a herf="3_main.php?list=B">電影介紹 B</a>
  ';
}
?>
```

---

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/f03511e55f4bf0b97ee1dc6b3bf6d77a)
{% endnote %}