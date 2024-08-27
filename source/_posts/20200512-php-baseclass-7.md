---
title: "[基礎課程] PHP 表單處理"
categories:
  - 職訓教材
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-12 15:30:42
---
![](assets/images/96NYgou.png)

之前的章節練習都還是屬於輸出單元領域，也就是 PHP 主動提供訊息輸出給用戶，本章節將介紹如何請用戶輸入訊息給 PHP 使用，並試著將取得的訊息做適合的處理（依需求而設計）。請開始在 Web 目錄下新增檔案 **1_form.php**，為了簡化程式碼結構將不建置 HTML 基本結構。請開始做 PHP 各種練習並預覽網頁結果。

<!-- more -->

---

# $_GET vs $_POST

之前有介紹到 `$_GET` 這個變數是透明公開在網址上的變數。如果要從遊覽器取得這個變數，就要使用 `$_GET` 。相反的我們也可以透過 HTML 的 FROM 標籤去產生網頁上的 `$_GET` 。

練習前準備：請跟著打以下 FORM 標籤複習一些 form 的類型標籤，並嘗試設計些表單輸入欄位。（你可以試著利用 css 調整版面好看）
```html
<!--Form 表單基本結構-->
<style>
.full{
    width:100%
}
</style>
<div style="margin:50px auto;width:20%">
<h3 style="text-align:center"><hr>會員註冊<hr></h3>
<form >
    帳號：
    <input type="text" name="who" class="full">
    <br/><br/>
    密碼：
    <input type="password" name="pwd" class="full">
    <br/><br/>
    生日：
    <input type="date" name="birth" class="full">
    <br/><br/>
    國籍：
    <select name="country">
        <option value="tw" selected>台灣</option>
        <option value="jp">日本</option>
        <option value="hk">香港</option>
    </select>
    <br><br/>
    性別：
    <input type="radio" name="sex" value="man">男生
    <input type="radio" name="sex" value="woman">女生
    <br><br>
    專長：
    <input type="checkbox" name="skill[]" value="web">網頁開發
    <input type="checkbox" name="skill[]" value="art">平面設計
    <input type="checkbox" name="skill[]" value="rd">程式開發
    <br/><br/>
    簡介：<br/><textarea name="aboutme" cols="30" rows="10" class="full"></textarea>
    <br/><br/>
    <input type="reset" value="重置">
    <input type="submit" value="送出">
    <input type="button" value="純按鈕" onclick="console.log('Hello World')"> <!--通常被用在執行 JS 動作-->
    <br/><br/>
    隱藏：<input type="hidden" name="noshow" value="showit"><!--隱藏不顯示但存在-->
</form>
</div>
```
## Form By $_GET
接著隨意輸入些表單資料按下送出，可以看見網址有產生了一些 `$_GET` 變數，正是由用戶端所產生的資料，而變數名稱是根據你 from 的 name 所指定之變數名稱。

透過此練習理解 form 基本構造：
1. HTML 基本輸入單元透過<from>取得輸入數據，我們可以指定資料型態限定用戶的值。
2. form 會需要提交 submit 作業才算整個數據的送出。
3. form 的 action 能指定表單資料傳送到哪個頁面位置去，未指定時預設為本頁自己。
3. form 的 method 可以指定傳輸方式為 GET 或 POST，未設定時則預設為 GET。

## Form By $_POST
請試著指定 `Method` 指定為 `post` 。透過 <kbd>chorme>F12>network</kbd> 檢查傳送值。

```html
<form method="post">
```

從此得知，GET 與 POST 的差異在於 GET 可見於網址上，POST 則不會出現。換言之網頁自帶參數可以有 GET 跟 POST，可同時存在。

接下來，當你擁有了這些用戶提供的輸入訊息，您就能使用 PHP 做對應的回應處理。首先你需要知道、$_GET 跟、$_POST 是一個陣列型態變數（所以才能方便的傳遞很多名稱與內容）。所以開始設計之前，你可以試著 print_r() 出來，再來考量怎麼使用這些數據。
```php
//判斷國籍做簡單的問候
switch ($_POST['country']) {
	case 'tw':
		echo "您好！" . $_POST['who'];
		break;
	case 'jp':
		echo "空你鳩挖！" . $_POST['who'];
		break;
	case 'hk':
		echo "雷侯！" . $_POST['who'];
		break;
}
echo "<br>感謝您的註冊";
```
此時的設計並不很完善，問題有兩點
1. 如果還沒有 submit 之前，php 會找不到$_POST 這個變數而出現錯誤
2. 會員註冊跟註冊完成訊息應該彼此獨立不該同時顯示。

你有兩個做法可以改善這件事
1. 利用 if else 做不同的顯示判斷，使畫面做 2 取 1：
注意：如果大範圍的 HTML 顯示位於某 ifelse 邏輯內，可以用 `{}` 去概括起來顯示動作之 HTML 範圍。
  **做法 1: 用 if else 做輸出選擇**
  ```php
  <?php
  if (!empty($_POST)) {
    //php code
  }
  else{
  ?>
    <!--HTML CODE-->
  <?php
  }
  ?>
  ```
2. 善用 action 功能，導向 submit 後到另一個網頁去：
利用 action 來傳送到另一個網頁去。在此之前先將舊檔案改名為** 1_form_1.php**，並複製名為** 2_from_2.php**，利於保留原本的練習內容
  **做法 2: 用 action 做網頁指向**
  ```html
  <!--1_form_2.php-->
  <form method="post" action="1_submit_2.php"> 
  ...#code
  </form>
  ```
  ```php
  <?php
    //1_act_2.php
    switch ($_POST['country']) {
      case 'tw':
        echo "您好！" . $_POST['who'];
        break;
      case 'jp':
        echo "空你鳩挖！" . $_POST['who'];
        break;
      case 'hk':
        echo "雷侯！" . $_POST['who'];
        break;
    }
    echo "<br>感謝您的註冊";
  ?>
  ```

目前為止，你已經知道如何向用戶透過 form，提取資料並做適合的資料處理。之後會學到 MySQL 時你就能將取得的變數資料存放到 SQL 裡去。

---

# $_REQUEST
如果使用 `$_REQUEST` 能通用於 `$_GET` 或 `$_POST` ，在設計上可以快速偷懶。但如果同時 `$_GET` 跟 `$_POST` 同時使用時， `$_REQUEST` 會以 `$_POST` 為內容（不能同時兩個）。所以一般還是少用為妙，避免出現問題時找不到問題來源。

---

到目前為止，你應該學會如何透過 HTML.form 取得用戶資料，以及藉由 `$_GET` 或 `$_POST` 做資料上的處理。

- `$_GET` 屬於可見的變數，可以拿來當作資料關鍵動作或是普通的變數處理
- `$_POST` 屬於不可見的，可以適合嚴謹的帳密等不公開的變數處理。
- 兩者可以同時存在，譬如 `$_GET` 你拿來直接指定當網址變數， `$_POST` 拿來做表單處理

該做怎樣的畫面在不同的體驗設計上會有所差異，這是在規劃網頁動向時所要去思考要點。為了讓用戶有更好的資料表單互動，藉由本篇介紹你將開始學會幾個簡單的 JS 語法，之後的 JS 專門課程會學到更多細節的語法。

# 回家練習
根據以下步驟做個簡單的帳戶登入，指定帳密為 admin/1234 並試著做帳密驗證，如果不正常則跳出警示。

1. 首先建立`2_login.php`
2. 規劃兩個 input 做帳號與密碼，使用 action 到 2_check.php，做 post 驗證
3. 在 2_check.php 那裏做帳號密碼驗證，如果不符合 admin/1234，跳出相對應的用戶提示。
4. 用戶提示可以使用 JS alert，例如 `echo "<script>alert('text')</script>"`;
5. 如果帳密都成功，轉址導向到 google。

{% note info %}
**小技巧**：
- PHP 的轉址函數 → `header("location:#url");`
- JavaSript 的轉址方式 → `document.location.href="#url";`

額外的思考兩者的觸發時間為何，差別在於取得 HTML 文件之前後差異。
{% endnote %}

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/17d48d2e632974b2be2826b925d45b86)
{% endnote %}