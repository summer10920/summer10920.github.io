---
title: "[實作課程] PHP 與 MySQL 資料處理實作"
categories:
  - Archived Courses
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-13 19:49:42
---
![](assets/images/96NYgou.png)

接下來開始設計一個資料管理網頁，分為三種寫法介紹。請開始在 Web 目錄下新增一個資料夾為 `animal` 。為了簡化程式碼結構將不建置 HTML 基本結構。請開始做 PHP 各種練習並預覽網頁結果。
<!-- more -->

---
# Ver1 - 各單元操作

## 規劃首頁與選單功能
為了使網頁有 layout 切換效果，這裡我們先從設計選單按鈕開始，要讓每個選單按鈕都有 GET 參數的送出到 index.php，使得 layout 因此有不同的結果。

### 新增選單連結

{% note success %}
先學會知道有哪些方式能夠產生 GET 的連結
1. 如果是 `a:link`，直接網址用 `?var=value` 即可
```
<a href="?page=test">測試連結</a>
```
2. 如果是 button+from，指定 name 跟 value 即可。button 預設自帶 submit 效果，故可省略 type。
```
<form>
    <button type="submit" name="page" value="test">測試按鈕</button>
    <button name="page" value="test">測試按鈕</button>
</form>
```
3. 如果是 button+onclick 由 JavaScript 觸發。但無法放在 form 內使用，因為按下去會先觸發 submit 無法觸發 onclick。
```
<button onclick="document.location.href='?page=test'">測試按鈕</button> 
```
{% endnote %}

採用第二點先設計回首頁，顯示。新增。修改。刪除這些選單按鈕。
```html index.php
<button onclick="document.location.href='./'">回首頁</button> 
<form method="GET">
    <p>
        <button name="page" value="show_all">顯示 (1)</button>
        <button name="page" value="add_animal">新增 (1)</button>
        <button name="page" value="mdy_animal">修改 (1)</button>
        <button name="page" value="del_animal">刪除 (1)</button>
    </p>
</form>
<hr />
<h1>這裡是主畫面內容</h1>
```

### 觸發不同的 layout
我們需要根據 GET 的內容做個判斷，才能控制要 include 哪個網頁當作我們的內容區。頁首進行以下輸入：

```php index.php
<?php
if (!empty($_GET['page'])) $body = $_GET['page'];
else $body = 'main';

//如果不想讓人知道 php 的檔案名稱，就多一個判斷來做文字對應
switch ($body) {
  case 'main':
    $myurl = "main.php";
    break;
  case 'show_all':
    $myurl = "1_list.php";
    break;
  case 'add_animal':
    $myurl = "1_add.php";
    break;
  case 'mdy_animal':
    $myurl = "1_mdy.php";
    break;
  case 'del_animal':
    $myurl = "1_del.php";
    break;
}
?>
```

接著下半部的`<h1>這裡是主畫面內容</h1>`抽取出來當作 `main.php`，原位置替換成變數。
```php index.php
<?php
include($myurl);
?>
```
此時測試所有按鈕，都能正常的 include 切換內容區。

## 查詢功能 1_list.php 
正式開始做 SQL 連線，進行 read 功能之前我們需要先宣告 PDO，同時這個宣告必須所有頁面都能讀到。因此放在 index.php 之頁首，這樣每次重新載入 index 時都能使用 PDO

```php index.php
<?php
$db = new PDO("mysql:host=127.0.0.1;dbname=php_study;charset=utf8", "root", "");
if (!empty($_GET['page'])) ...
...
?>
```
現在我們要進行撈取所有動物資料到 1_list.php 這個畫面，請先建立 1_list.php。

### 規劃 HTML
我們利用 table 做一個 HTML 版面，並塞假資料

```php 1_list.php
<table width=100%>
  <tr>
    <td>編號</td>
    <td>動物名</td>
    <td>重量</td>
    <td>簡介</td>
    <td>更新日期</td>
  </tr>
  <tr>
    <td>0</td>
    <td>背包</td>
    <td>38</td>
    <td>是個人類</td>
    <td>2019-06-18</td>
  </tr>
</table>
```

### 插入 PHP 與 PDO 結果
接下來透過 PDO 取得資料，並利用 foreach() 塞入到 html 內
```php 1_list.php
<?php
$sql="SELECT * FROm ch8_animal";
$row=$db->query($sql)->fetchAll();
?>
<table width=100%>
  <tr>
    <td>編號</td>
    <td>動物名</td>
    <td>重量</td>
    <td>簡介</td>
    <td>更新日期</td>
  </tr>
<?php
foreach($row as $data){
?>
  <tr>
    <td><?=$data['id']?></td>
    <td><?=$data['name']?></td>
    <td><?=$data['weight']?></td>
    <td><?=$data['info']?></td>
    <td><?=$data['date']?></td>
  </tr>
<?php
}
?>
</table>
```
此時畫面上能完整呈現所有資料，透過 table 一行一列。

## 新增功能 1_add.php
建立 1_add.php，我們要兩個版面動作；初始提供 from 表單，能夠讓使用者輸入新資料並 submit 給同畫面，接著使資料進行 PDO 處理，完成後接著協助轉向到列表畫面去。

### 規劃 FROM.HTML
使用 DIV 跟 CSS 做個好看的至中畫面。為了不影響 GET 這裡用 POST，submit 提交給自己

```html 1_add.php
<div style="width:50%;margin:0 auto;background-color:#eee;text-align:center;padding:2% 5%">
    <h1>新增動物資料 ver1</h1>
    <form method="post">
        <h3>動物名<br><input type="text" name="name" style="width:50%"></h3>
        <h3>重量 <br><input type="number" name="weight" style="width:50%"></h3>
        <h3>介紹 <br>
            <textarea name="info" rows="10" style="width:50%"></textarea>
        </h3>
        <input type="submit" value="新增">
        <input type="reset" value="重置">
    </form>
</div>
```

### 連接 SQL 進行新增後轉址
這裡要進行 PDO 新增，為了不影響前一個畫面動線，記得要下判斷
```php 1_add.php
<?php
// print_r($_POST);
if(!empty($_POST)){
  $sql = "INSERT INTO ch8_animal VALUES(NULL,'".$_POST['name']."',".$_POST['weight'].",'".$_POST['info']."',NOW())"; //step1 先做好 SQL 語言
  $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
  header("location:?page=show_all"); //最後我們轉回去一個適合的網頁位置
}
?>
```
這裡就不需要考慮 else 了，在呈現 HTML 之前就會被轉走畫面。

## 修改功能 1_mdy.php
這裡的修改功能先暫時很陽春，請當作 PDO 的練習，後續會另外講較符合設計的修改之應用。因為是一個按鈕，你可以拿新增的 php 來改，這裡我們多一個欄位讓使用者自行指定 id 做修改。

```php 1_mdy.php
<?php
// print_r($_POST);
if (!empty($_POST)) {
  //$sql = "INSERT INTO ch8_animal VALUES(NULL,'".$_POST['name']."',".$_POST['weight'].",'".$_POST['info']."',NOW())"; //step1 先做好 SQL 語言
  $sql = "UPDATE ch8_animal SET name='" . $_POST['name'] . "', weight=" . $_POST['weight'] . ", info='" . $_POST['info'] . "', date=NOW() WHERE id=" . $_POST['id'];
  $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
  header("location:?page=show_all");
}
?>

<div style="width:50%;margin:0 auto;background-color:#eee;text-align:center;padding:2% 5%">
  <h1>修改動物資料 ver1</h1>
  <form method="post">
    <h3>編號<br><input type="number" name="id" style="width:50%"></h3>
    <h3>動物名<br><input type="text" name="name" style="width:50%"></h3>
    <h3>重量 <br><input type="number" name="weight" style="width:50%"></h3>
    <h3>介紹 <br>
      <textarea name="info" rows="10" style="width:50%"></textarea>
    </h3>
    <input type="submit" value="修改">
    <input type="reset" value="重置">
  </form>
</div>
```

## 刪除功能 1_del.php
這裡一樣做一個基本的刪除功能，讓使用者自己輸入編號。我們可以拿修改的版型來調整。

```php 1_del.php
<?php
// print_r($_POST);
if(!empty($_POST)){
  //$sql = "INSERT INTO ch8_animal VALUES(NULL,'".$_POST['name']."',".$_POST['weight'].",'".$_POST['info']."',NOW())"; //step1 先做好 SQL 語言
  //$sql = "UPDATE ch8_animal SET name='".$_POST['name']."', weight=".$_POST['weight'].", info='".$_POST['info']."' WHERE id=".$_POST['id'];
  $sql="DELETE FROM `ch8_animal` WHERE id=".$_POST['id'];
  $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
  header("location:?page=show_all"); 
}
?>

<div style="width:50%;margin:0 auto;background-color:#eee;text-align:center;padding:2% 5%">
    <h1>刪除動物資料 ver1</h1>
    <form method="post">
        <h3>編號<br><input type="number" name="id" style="width:50%"></h3>
        <input type="submit" value="刪除">
        <input type="reset" value="重置">
    </form>
</div>
```

目前為止，最基本的 CRUD 透過 PHP 實現已經做完了。也就是 HTML 的 FROM 負責讓用戶進行操作。並使用 PHP 來進行 PDO 連線處理，最後導向到適合的頁面去。我們試著做更好的 CRUD 之 UX 規劃。

---

# Ver2 - CRUD 同操作
這裡主要是讓修改刪除這個按鈕自動帶 ID，使得動向作業較方便些。

## 規劃主選單 index.php 的選單按鈕
我們先回到 index.php 先做好這個頁面的導引按鈕。

```php index.php
<?php
...
switch ($body) {
    ...
  case 'crud_animal': //這裡新規劃
    $myurl = "2_list.php";
    break;
}
?>
<button onclick="document.location.href='./'">回首頁</button>
<form method="GET">
  ...
</form>
<p><button onclick="document.location.href='?page=crud_animal'">CRUD(2)</button></p> <!--這裡心規劃-->
<hr />
<?php
include($myurl);
?>
```

## 顯示操作
這裡我們先複製 1_list.php 來修改，讓欄位多了修改按鈕跟刪除按鈕，我們利用 GET 來傳遞 id。另外在表格開始之處做一個新增提交表單。

### 添加修改&刪除按鈕
各自帶 GET 的 `?mdy=id` ，記得還是要保留本頁 GET 的 `?page=crud_animal`。

```php 2_main.php
<?php
$sql = "SELECT * FROm ch8_animal";
$row = $db->query($sql)->fetchAll();
?>
<table width=100%>
  <tr>
    ...
    <td>更新日期</td>
    <td>操作</td>
  </tr>
  <?php
  foreach ($row as $data) {
    ?>
    <tr>
      ...
      <td><?= $data['date'] ?></td>
      <td>
        <button onclick="location.href='?page=crud_animal&mdy=<?= $data['id'] ?>'">修改</button>
        <button onclick="location.href='?page=crud_animal&del=<?= $data['id'] ?>'">刪除</button>
      </td>
    </tr>
  <?php
}
?>
</table>
```

### 新增按鈕的介面
我們把新增的資料整合到表格的前面，並適時的讓版面整齊。

```php 2_main.php
<table width=100%>
  <tr>
    ...
  </tr>
  <!--start-->
  <tr><td colspan=6><hr></td></tr>
  <form method="post">
  <tr>
    <td>#</td>
    <td><input type="text" name="name"></td>
    <td><input type="number" name="weight"></td>
    <td><input type="text" name="info" style="width:100%"></td>
    <td><?=date("Y-m-d H:i:s")?></td>
    <td>
      <input type="submit" value="新增">
      <input type="reset" value="重置">
    </td>
  </tr>
  </form>
  <tr><td colspan=6><hr></td></tr>
  <!--end-->
  <?php
  foreach ($row as $data) {
    ?>
    <tr>
      ...
    </tr>
  <?php
}
?>
</table>
```

## 新增操作
我們必須要在同畫面上，每次載入檢查是否有新增資料。這裡會變成查詢之前的動作，先新增資料才查詢所有資料。

```php 2_main.php
<?php
if(!empty($_POST)){//如果需要新增資料
  $sql = "INSERT INTO ch8_animal VALUES(NULL,'".$_POST['name']."',".$_POST['weight'].",'".$_POST['info']."',NOW())"; //step1 先做好 SQL 語言
  $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
  header("location:?page=crud_animal");//如果你擔心 F5 會一直刷新增，可以轉址把 POST 洗空
}

$sql = "SELECT * FROm ch8_animal"; //帶出所有資料
$row = $db->query($sql)->fetchAll();
?>
...
```

這裡`unset($_POST)`不能真正預防重複值，雖然資料可以被殺掉但表單資訊還被 browser 記住，下次重整`$_POST`又被賦予值。

測試一下新增功能是否正常可用。

## 修改操作
修改的部分還是會希望有一個 layout 可以讓我們修改內容。所以我們需要做一個版面切換器，你可以用之前學的 include 來解決，這裡用 switch 來解決。

### case 'list' 部分
目前為止的都是 `2_main.php` ，我們定義為 case 'list' 的畫面用 include 載入，而只有當抓到 `$_GET[mdy]` 時，才顯示 case 'mdy' 的畫面。

```php 2_list.php
/*
if(!empty($_GET['mdy'])) $layout="mdy";
else $layout="list"; 可成為三元運算子
*/
$layout=(!empty($_GET['mdy']))?"mdy":"list";
switch ($layout) {
  case 'list':
    include_once('2_main.php');
    break;
  case 'mdy':
    include_once('2_mdy.php');
    break;
}
```

### case 'mdy' 部分
接著是抓到 get['mdy'] 的畫面，這裡我們練習透過 id 取得舊資料，並幫忙塞到預設值 value=。

```php 2_mdy.php
<?php
$sql = "SELECT * FROm ch8_animal WHERE id=" . $_GET['mdy']; //帶出指定之資料
$row = $db->query($sql)->fetch();
?>

<div style="width:50%;margin:0 auto;background-color:#eee;text-align:center;padding:2% 5%">
  <h1>修改動物資料 ver2</h1>
  <form method="post">
    <h3>編號<?= $row['id'] ?></h3>
    <h3>動物名<br><input type="text" name="name" style="width:50%" value="<?= $row['name'] ?>"></h3>
    <h3>重量 <br><input type="number" name="weight" style="width:50%" value="<?= $row['weight'] ?>"></h3>
    <h3>介紹 <br>
      <textarea name="info" rows="10" style="width:50%"><?= $row['info'] ?></textarea>
    </h3>
    <input type="submit" value="修改">
    <input type="reset" value="重置">
  </form>
</div>
```
目前為止去測試按下修改是否可正常運作。此時 form 指定給自己，所以 URL 會有相同的 GET（跑到有修改的畫面），因此我們要先做一個寫入的判別完成之後轉址回列表去。

```php 2_mdy.php
<?php
if (!empty($_POST)) { //如果取得 POST，進行修改上傳
  echo $sql = "UPDATE ch8_animal SET name='" . $_POST['name'] . "', weight=" . $_POST['weight'] . ", info='" . $_POST['info'] . "', date=NOW() WHERE id=" . $_GET['mdy'];
  $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
  header("location:?page=crud_animal"); //更新完轉走
}
$sql = "SELECT * FROm ch8_animal WHERE id=" . $_GET['mdy']; //帶出指定之資料，為了塞預設值
$row = $db->query($sql)->fetch();
?>
```
測試修改功能是否順利

## 刪除操作
接來是做刪除動作，這裡比較簡單的是，只要讓 PHP 執行程式刪除要求就好。因為是導向到同畫面，在上面做一個有抓到刪除的 GET

```php 2_main.php
<?php
if (!empty($_POST)) { //如果需要新增資料，隨便抓一個欄位對象當驗證
  #do create sql
}

if(!empty($_GET['del'])){ //這裡因為 GET 不只一個變數，所以我們指到陣列裡面的變數
  $sql="DELETE FROM `ch8_animal` WHERE id=".$_GET['del'];
  $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
  header("location:?page=crud_animal"); //把 GET['del'] 洗掉
}

#do read sql
?>
```
測試刪除功能是否順利

---

# Ver3 - CRUD 分頁化
這裡我們再練習更進階的 CRUD。主要是讓畫面可以一口氣更新所有欄位，但為了分批並減少資料異動量，還要做一個分頁表。

## 規劃主選單 index.php 的選單按鈕
我們先回到 index.php 先做好這個頁面的導引按鈕。

```php index.php
<?php
...
//如果不想讓人知道 php 的檔案名稱，就多一個判斷來做文字對應
switch ($body) {
  ...
  case 'crud_page':
    $myurl = "3_list.php";
    break;
}
?>
...
<p><button onclick="document.location.href='?page=crud_page'">CRUD(3)</button></p>
<hr />
<?php
include($myurl);
?>
```
這樣選單區就多了本篇的功能網頁

## 顯示&修改操作
我們先把 list 設計好，從 2_main.php 複製拿來修改。設計要點：

### 新增刪除不異動
1. 新增跟刪除功能跟 Ver2 - CRUD 一樣不變，記得轉址要調整一下。
2. 將修改按鈕拿掉，只留下刪除按鈕。

```php 3_list.php
<?php
if (!empty($_POST)) { //如果需要新增資料，隨便抓一個欄位對象當驗證
  ...
  header("location:?page=crud_page");
}

if (!empty($_GET['del'])) { //這裡因為 GET 不只一個變數，所以我們指到陣列裡面的變數
  ...
  header("location:?page=crud_page");
}
...
?>
<table width=100%>
  <tr>
  ...
  </tr>
  <!--start-->
  ...
  <!--end-->
  <?php
  foreach ($row as $data) {
    ?>
    <tr>
      ...
      <td>
        <button onclick="location.href='?page=crud_page&del=<?= $data['id'] ?>'">X</button>
      </td>
    </tr>
  <?php
}
?>
</table>
```
以上為有異動的地方（調整新增刪除），並請試著新增刪除看看功能是否正常。

### 修改直接於 form 內
修改這裡要點很多，注意
1. 一個大 form.post 去包所有的欄位，每個欄位都是 Input，並帶預設值（原資料），所以會有一個全部更新的按鈕
2. input 的 name 可以用陣列來規劃，我們同時指定陣列索引剛好等於 id，這樣每個陣列資料都有他的資料 id 是誰。
3. 因為考量更新時間，我們要多一個判斷做有變化才更新。所以用 hidden 去藏舊資料。
4. 因為用 POST，所以新增那裏的判斷要指定對，我們可以根據 name 來判斷是不是陣列就能知道是從新增來的還是從修改來的

```php 3_list.php
<?php
if (!empty($_POST)&&!is_array($_POST['name'])) { //這是新增來的
  $sql = "INSERT INTO ch8_animal VALUES(NULL,'" . $_POST['name'] . "'," . $_POST['weight'] . ",'" . $_POST['info'] . "',NOW())"; //step1 先做好 SQL 語言
  $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
  header("location:?page=crud_page");
}
if (!empty($_POST)&&is_array($_POST['name'])) { //這是從集體修改來的
  print_r($_POST);
}

if(!empty($_GET['del'])){ //這裡因為 GET 不只一個變數，所以我們指到陣列裡面的變數
  $sql="DELETE FROM `ch8_animal` WHERE id=".$_GET['del'];
  $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
  header("location:?page=crud_page");
}

$sql = "SELECT * FROm ch8_animal"; //帶出所有資料
$row = $db->query($sql)->fetchAll();
?>
<table width=100%>
  <tr>
    <td>編號</td>
    <td>動物名</td>
    <td>重量</td>
    <td>簡介</td>
    <td>更新日期</td>
    <td align=center>操作</td>
  </tr>
  <!--start-->
  <tr>
    <td colspan=6>
      <hr>
    </td>
  </tr>
  <form method="post">
    <tr>
      <td>#</td>
      <td width=10%><input type="text" name="name"></td>
      <td width=10%><input type="number" name="weight"></td>
      <td width=60%><input type="text" name="info" style="width:100%"></td>
      <td width=10%><?= date("Y-m-d H:i:s") ?></td>
      <td align=center>
        <input type="submit" value="新增">
        <input type="reset" value="重置">
      </td>
    </tr>
  </form>
  <tr>
    <td colspan=6>
      <hr>
    </td>
  </tr>
  <!--end-->
  <form method="post">
  <?php
  foreach ($row as $data) {
    ?>
    <tr>
      <td>
        <?= $data['id'] ?>
      </td>
      <td>
        <input type="text" name="name[<?=$data['id']?>]" value="<?= $data['name'] ?>">
        <input type="hidden" name="old_name[<?=$data['id']?>]" value="<?= $data['name'] ?>">
      </td>
      <td>
        <input type="number" name="weight[<?=$data['id']?>]" value="<?= $data['weight'] ?>">
        <input type="hidden" name="old_weight[<?=$data['id']?>]" value="<?= $data['weight'] ?>">
      </td>
      <td>
        <input type="text" name="info[<?=$data['id']?>]" style="width:100%" value="<?= $data['info'] ?>">
        <input type="hidden" name="old_info[<?=$data['id']?>]" style="width:100%" value="<?= $data['info'] ?>">
      </td>
      <td><?= $data['date'] ?></td>
      <td align=center>
        <button onclick="location.href='?page=crud_page&del=<?= $data['id'] ?>'">X</button>
      </td>
    </tr>
  <?php
}
?>
  <tr>
    <td colspan=6 align=center><input type="submit" value="全部更新"></td>
  </tr>
  </form>
</table>
```
試著新增修改刪除查看都是否正常，除了修改時目前還只是 print_r()。你會發現刪除按鈕是失敗的，這是因為 button 在 form 範圍內也有 submit 屬性，所以不能使用 buttton 標籤。調整

```html
<button onclick="location.href='?page=crud_page&del=<?= $data['id'] ?>'">X</button>
```
為
```html
<input type="button" value="x" onclick="location.href='?page=crud_page&del=<?= $data['id'] ?>'">
```

### 修改之提交
因為我們希望資料有異動才做更新，順便修改 date。所以透過 old 來做比較，把 SQL 語法做適合的判斷描述。

```php
if (!empty($_POST)&&is_array($_POST['name'])) { //這是從集體修改來的
  // print_r($_POST);
  foreach ($_POST['name'] as $key => $value) { //目的是為了取得 id
    $chg="";
    if($_POST['name'][$key]!=$_POST['old_name'][$key]) $chg.="name='".$_POST['name'][$key]."',"; //如果有變化就加入 chg 行列
    if($_POST['weight'][$key]!=$_POST['old_weight'][$key]) $chg.="weight=".$_POST['weight'][$key].","; //如果有變化就加入 chg 行列
    if($_POST['info'][$key]!=$_POST['old_info'][$key]) $chg.="info='".$_POST['info'][$key]."',"; //如果有變化就加入 chg 行列
    if(!empty($chg)) { //如果 chg 不是空的，執行更新語法順便調整 date
      $sql="UPDATE `ch8_animal` SET ".$chg."date=NOW() WHERE id=".$key.";"; 
      $db->query($sql);   //執行語法，透過 PDO 物件導向到 query
    }
  }
  header("location:?page=crud_page");
}
```

## 設計分頁與導覽
了避免資料量太大，我們可以設計分頁按鈕。這裡用 5 筆資料做 1 頁為示範。分頁導覽的設計需要。

### 用 GET 來控制 limit
為了分頁，我們需要撈資料時利用 limit 來達到每次 5 筆，從 0,4,9,... 開始。所以要計算這個起始 begin 從何開始。

```php 3_list.php
//算出 limit begin
$nowpage=(empty($_GET['np']))?1:$_GET['np'];//需要知道目前是第幾頁
$begin=($nowpage-1)*5; // limit 0 -> page1 , limit 5 ->page2

//read by limit
$sql="SELECT * FROM ch8_animal LIMIT ".$begin.",5";
$row=$db->query($sql)->fetchAll();
```
完成之後檢查是否如期運作，並嘗試網址添加`?page=crud_page&np=2`是否如期望所現。

### 分頁導覽
我們需要設計導覽超連結，每個按鈕會幫忙導向到`?page=crud_page&pg=???`。這裡要讓他自動產生。所以開始規劃

1. 有 N 筆資料，這些資料該用 (ceil(N/5)) 頁碼來呈現。
```php 3_list.php
//算出 page navbar how many
$sql = "SELECT COUNT(*) FROM ch8_animal"; //會取得資料有幾筆
$row = $db->query($sql)->fetch();
$total=$row[0]; //算出一共有幾筆資料
/*//如果是用下列方式，也能算出總數但效能差
$sql="SELECT * FROM ch8_animal";
$row=$db->query($sql)->fetchAll();
$total=count($row);
*/
$many=ceil($total/5); //算出這些資料需要用幾頁來呈現
```
2. 除了數字連結，前後還要有箭頭連結。用陣列去設計文字 word 與超連結 key
```php 3_list.php
//做出 NavBar array
$pageNav["<"]=($nowpage==1)?1:$nowpage-1;
for($i=1;$i<=$many;$i++) $pageNav[$i]=$i; //做一個導覽陣列
$pageNav[">"]=($nowpage==$many)?$many:$nowpage+1;
```
這裡要注意 2 這步驟必須要在 1 之前，因為都是用$row 存結果，會導致資料被洗掉。

3. 找到適合的 HTML 位置，把陣列做成 HTML 分頁導覽並夾帶超連結
```php 3_list.php
<tr>
  <td colspan=6 align=center>
    <p><?php
        foreach ($pageNav as $key => $value) echo ' <a href="?page=crud_page&np=' . $value . '">' . $key . '</a> ';
        ?></p>
    <input type="submit" value="全部更新">
  </td>
</tr>
```
4. 大致完成。如果你要讓`全部更新`按下去可以同畫面不要洗回第一頁。要修改
```php
header("location:?page=crud_page&np=".$_GET['np']);
```

---

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/bfae831ea8371a32c84ef1c16cf538c6)
{% endnote %}