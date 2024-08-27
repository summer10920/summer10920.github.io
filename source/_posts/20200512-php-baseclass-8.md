---
title: "[基礎課程] PHP SESSION 與 COOKIE"
categories:
  - 職訓教材
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-12 15:49:42
---
![](assets/images/96NYgou.png)

本篇介紹 PHP 能跨網頁的共用變數，如果有一些變數希望能跨（同網站）網頁彼此共用，就能用 session 跟 cookie。請開始在 Web 目錄下新增檔案 **3_session_cookie.php**，為了簡化程式碼結構將不建置 HTML 基本結構。請開始做 PHP 各種練習並預覽網頁結果。

<!-- more -->

也許你聽過 cookie 或 session，這些是遊覽器上的用戶數據，常作為網站裡提供多個網頁共用存取，舉凡來說會員登入紀錄、購物車、購買清單、都是設計師偷偷藏個變數紀錄每個使用者的體驗資料。session 是存放在伺服器端的變數，cookie 是存放在用戶端遊覽器內。

# $_SESSION
屬於超全域變數，以檔案形式存放於伺服器 (php.ini->session.save_path=\xampp\tmp\)
且占用空間資源，通常是比較重要的數據不願意被用戶取得複製時，譬如帳號密碼、權限、購物車 ... 等等。注意以下要點：

1. `session_start()` : 啟用一個新的或開啟正在使用中的 session。
{% note info %}
**小技巧**：
每次授權會先確認用戶遊覽器所產生的 SESSION_ID，當做差異存取並只限自己使用，不要誤會用戶們的 SESSION 可以會談資料互通。
{% endnote %}
2. `$_SESSION['name']="value"`: 以陣列之變數概念新增一筆資料‧
3. `unset($_SESSION['test'];`: 以陣列之變數概念刪除一筆資料‧
4. `session_unset()` : 以 unset all 的概念刪除全部資料，但 session 這個文件仍保留在伺服器。
5. `session_destroy()` : 銷毀 session 並刪除了文件資料不被保留。
6. 生命期限內，沒有被使用的 session 會被伺服器自動銷毀清除，預設為 180 分鐘。


練習：試著編寫使用 session，同時用另一個 3_session_cookie_check.php 試著實現跨網頁的讀取。
```php 3_session_cookie.php
// 3_session_cookie.php
session_start();    //使用之前要先宣告開始
$_SESSION['name']="admin";
$_SESSION['pwd']="1234";
//print_r($_SESSION);
```
```php 3_session_cookie_check.php
// 3_session_cookie_check.php
session_start();
//session_unset(); 如果加上這行，所有資料會被刪除
//unset($_SESSION['name']); //如果用陣列概念去刪除，能指定資料刪除
// session_destroy(); //這行會將 tmp 資料夾內的 session 文件給殺掉，雖然變數會不在，但執行前時變數已經到記憶體去，並載給遊覽器使用。
echo "<h3>↓↓SESSION 資訊↓↓</h3>";
var_dump($_SESSION);
?>
```
因此，HTTP 屬於一個非連線性的作業，也就是當你下載一個 HTML 文件之後就結束了，而 `$_SESSION` 能幫助你存取一個可被記憶的變數存放在伺服器，幫助你下一次的 PHP 存取時能重複使用這個變數。

跟 method 這種 GET 或 POST 所不同的是，這裡採儲存到伺服器放著而不是表單傳遞，但技巧上都能滿足跨網頁的變數處理。

---

# $_COOKIE
跟 SESSION 有相同的功能，只差別於 cookie 被記錄在用戶端遊覽器上。cookie 有彈性自訂的生命週期指定，
PHP 使用 SetCookie() 來達到 cookie 設定。

1. 完整語法為 setcookie(name,value,expire,path,domain,secure)
2. 前者分別是名稱、值、時效 (Unix 時間標記，你可以用 time() 來做 now 的起始值）、路徑、指定網域、HTTPS 加密
3. cookie 協定上，遊覽器最多 300 組，同網域最多 20 組，每組不超過 4KB，但各家遊覽器不一定有遵循此上限。
4. expire 不指定時，當網頁被關閉就結束生命。

練習：繼續對 3_session_cookie.php 編輯
```php 3_session_cookie.php
setcookie("mycookie","1234",time()+5*3600*24);  //有效 1 天的寫法
setcookie("mycookie","1234",time()+0);  //設 0 秒時，等於立即清除
```
```php 3_session_cookie_check.php
setcookie("mycookie","456",time()+5*3600*24);  //有效 1 天的寫法
//setcookie("mycookie","1234",time()+0);  //設 0 秒時，等於立即清除
print_r($_COOKIE);
//cookie 無法強制刪除，除非用戶清除遊覽 cookie 或是等待時間到
```

目前為止你已經清楚 COOKIE 與 SESSION 差別。以及如何去有效利用在跨網頁的變數存取。根據你的習慣與喜好去做規劃即可。SESSION 跟 COOKIE 的進階技巧與控制管理很多，目前你只需要知道語法跟如何存取即可滿足跨頁應用。

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/1d2f851d4800d1cbcb17634685e7127e)
{% endnote %}