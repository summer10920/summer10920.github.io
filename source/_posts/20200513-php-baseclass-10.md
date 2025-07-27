---
title: "[基礎課程] PHP 與 MySQL 連接"
categories:
  - Archived Courses
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-13 19:10:42
---
![](assets/images/96NYgou.png)

PHP 與 MySQL 的連線方式，傳統方式為透過 mysql_content() 進行連線請求（經年代久用因此資源很多，請自行透過書籍或網路來學習）。本篇採用較新熱門的 PDO 連線方式進行教學說明。請開始在 Web 目錄下新增檔案 **1_pdo.php**，為了簡化程式碼結構將不建置 HTML 基本結構。請開始做 PHP 各種練習並預覽網頁結果。
<!-- more -->

---

# PDO 連線方式
PDO 是使用物件導向的方式進行使用，好處是 PDO 除了 MySQL 也支援其他資料庫類型，如果今天專案的資料庫變成其他品牌了，PDO 只要調整宣告的代碼即可異動範圍較小。我們將開始學習如何用 php 對 sql 進行控制：

練習：跟著以下作業
```php
<?php
$dblink = new PDO("mysql:host=127.0.0.1;dbname=php_study;charset=utf8", "root", "");
?>
```

1. 使用 PDO 必須先新宣告成一個變數（名稱自訂），需完整提供 SQL 資訊，包含 =="SQL 類型類型：host=位置；dbname=資料庫名稱；charset=編碼","帳號","密碼"==
2. 之後每次要透過 PDO 進行 SQL 操作，你都能用$dblink 來進行執行 PDO 函數。

## 執行指令 query()
PDO 因為是物件導向，你要利用`->`做一個導向執行。下列為透過 PHP 去執行新增資料表的動作。

```php
$sqlcode = "
    CREATE TABLE php_study.ch8_animal (
        id INT UNSIGNED AUTO_INCREMENT,
        name TEXT,
        weight INT,
        info TEXT,
        date DATETIME,
        PRIMARY KEY (id)
    );
";

$result = $dblink->query($sqlcode);
```
1. 我們先將 SQL 語法當作字串放到變數
2. 再來執行 PDO 物件並導向到裡面的 query() 函數。讓 PDO 進行 SQL 連接並且執行 query()。
3. 每次 PDO 連線結束後會 return 資料給我們，我們可以用個變數（名稱自訂）存起來。

## 檢查錯誤訊息 errorInfo()
如果你的 PDO 異常發生問題，PDO 會自動儲存錯誤訊息。你需要透過沒有如期的得到你要的結果，你需要 errorInfo() 函數。下列為檢查錯誤的示範

```php
$result = $dblink->query($sqlcode);
if(!$result) print_r($dblink->errorInfo());
```
如果回傳是空的，陣列印出$dblink->errorInfo() 這個結果

---

# PDO 操作 CRUD 示範

## INSERT、UPDATE、DELETE

練習：跟著做以下指令，每寫完一行執行看看並觀看 MySQL 變化，接著註解再執行下行避免干擾
```php
//$result = $dblink->query("INSERT INTO ch8_animal VALUES (null,'熊貓',125,'黑白色的熊',NOW())"); //新增
//$result = $dblink->query("UPDATE ch8_animal SET weight=185 WHERE name='熊貓'");   //修改
$result = $dblink->query("DELETE FROM ch8_animal WHERE id=1"); //刪除
if(!$result) print_r($dblink->errorInfo());// 找錯誤問題的方法
```
此時你已經能理解如何新增修改刪除透過 PDO 處理了。

## SELECT
接下來，請先塞個大概四筆動物資料。我們示範如何查詢，並將資料列印到網頁上。（你可以用 PHP 或是 phpmyadmin 完成。

```php
$sql = "
	INSERT INTO ch8_animal VALUES
		(null,'藪貓',52,'夜行性動物，喜歡狩獵遊戲，口頭禪是好厲害唷',NOW()),
		(null,'河馬',155,'個性不算溫和，咬合力很強唷',NOW()),
		(null,'浣熊',123,'由於會偷人類人物，所以常常被說是個小偷',NOW()),
		(null,'耳廓狐',33,'擅長透過挖洞來尋找潛藏在地底下的獵物',NOW())
	;
";
$result = $dblink->query($sql);
```

接下來有兩種做法分別是 fetch 跟 fetchAll，差別在於一個抓跟全部抓：

1. **fetch**：通常你並不知道資料結果會有幾筆，所以你需要用 while 的方式去做。
```php
//select by fetch
$result = $dblink->query("SELECT * FROM ch8_animal WHERE 1");
if (!$result) print_r($dblink->errorInfo()); // 找錯誤問題的方法

while ($row = $result->fetch()) {
	print_r($row);
}
```
while 這裡做判斷如果$row 有東西時，也就是$result->fetch() 會倒出一筆並塞值給$row。所以接著被 print_r 出來。一筆資料會有多項欄位，所以是陣列結構。
2. **fetchAll**：會一次全部回傳（用陣列包住回傳），所以這裡會到二維陣列去解讀。
```php
//select
$result = $dblink->query("SELECT * FROM ch8_animal WHERE 1");
if (!$result) print_r($dblink->errorInfo()); // 找錯誤問題的方法

// by fetchAll
$row = $result->fetchAll();
print_r($row);
```
   - fetchAll 取得的會是二位陣列，跟 fetch 取得的不同。
   - fetchAll 透過一次全吐出來，優點是快直接處理資料，缺點是你暫存會隨資料多而吃重。
   - 要注意不管是 fetch 或 fetchAll，被讀取出來後就會被清掉。
   - fetchAll() 可以直接物件去直接串，一行寫完
```php
$result = $dblink->query("SELECT * FROM ch5_animal WHERE 1")->fetchAll();
print_r($result);
```

---

# SQL 注入攻擊
SQL 注入 (SQL injection)，也稱 SQL 隱碼或 SQL 注碼，為駭客利用超全域變數的表單提交時，透過變數欄位進行 SQL 語言變化導致，使得在伺服器端進行不預期的 SQL 資料指令。

## 攻擊範例 - 帳號登入
舉例而言在帳號登入畫面上試著輸入

1. 伺服器之帳密檢查方式，如下
```php
function select($tb, $wh){ //只要告知我資料表名稱與條件，我就能回傳 select 的結果（二維陣列）
  global $db;
  return $db->query("select * from " . $tb . " where " . $wh)->fetchAll();
}

$re=select("t10_admin","acc='".$_POST['acc']."' and pwd='".$_POST['pwd']."'");

if($re){//有找到此帳號密碼
  $_SESSION['admin']=$_POST['acc'];
  plo("admin.php");
}
else echo "<script>alert('帳號或密碼錯誤');".jlo("login.php")."</script>";
```
2. 此時輸入提交驗證
帳號：`admin`
密碼：`9487' OR 1=1;/*`
3. 將導致 SQL 語法形成
```php
select * from t10_admin where acc='admin' and pwd='9487' OR 1=1 ;/*;
```
4. 進而獲得登入之許可

另外或是當駭客或工程師在已知你的資料結構時，也能夾帶 SQL

帳號：`admin`
密碼：`9487' ; DROP TABLE ttttt;/*`

## 防範方式 1 - 替換符號

最大的問題是透過<kbd>'</kbd>或<kbd>"</kbd>開頭所影響，透過 `preg_replace()` 將變數內（含陣列）任何出現的單雙引號都強迫拿掉。
```php
$_POST = preg_replace("/[\'\"]+/", '', $_POST);
$re=select("t10_admin","acc='".$_POST['acc']."' and pwd='".$_POST['pwd']."'");
```

相對來說每次跑 SQL 之前都需要替換檢查過。

## 防範方式 2 - PDO 的 prepare
透過 prepare 的方式，對 SQL 進行準備告知我有這行指令要執行。
execute() 等於執行，與 query() 不同的是 execute 都會伴隨 prepare（預告）來使用

**解說範例如下**
1. 將原本的 sql 指令分解為那些不先寫好，使用<kbd>?</kbd>來代替。
2. <kbd>?</kbd>這些真正的內容，用一維陣列即可，順序根據<kbd>?</kbd>出現順序為準。
. 由於我們是透過自訂函式代替 SELECT，所以步驟 2 也是要提交 FUNCTION
```php
//for SQL Injection
$data=array($_POST['acc'],$_POST['pwd']);
$re = selectV2("t10_admin", "acc=? and pwd=?",$data);

  if($re){//有找到此帳號密碼
    $_SESSION['admin']=$_POST['acc'];
    plo("admin.php");
  }
  else echo "<script>alert('帳號或密碼錯誤');".jlo("login.php")."</script>";
```
4. 關於自訂函式，prepare 預告後還要用個變數將物件存著。
5. <kbd>?</kbd> 將你的 <kbd>?</kbd> 轉換陣列丟給 `execute()` 做替換執行。
6. 最後做 fetchAll 作業（無法簡化為 1 行寫完）並回傳結果
```php
//selet SQL v2 for SQL injection
function selectV2($tb, $wh, $toswap){
  global $db;
  $beload=$db->prepare("select * from ".$tb." where ".$wh);
  $beload->execute($toswap);
  return $beload->fetchAll();
}
```
7. 透過 prepare 由於 sql 代碼會並固定住，駭客就無法將原語意誘騙為不同的內容。

嚴格上 PDO 的方式會比較好一些，SQL 不會受到任何暴力的 SQL 注入類型所干擾。而 resplace 只是將符號替換，有可能部分資料輸入就剛好需此符號。

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/ea13f8d10c357e7a7f0ec0bcb56aec0c)
{% endnote %}