---
title: "[期末課程] PHP 期末實作：商務網站"
categories:
  - 職訓教材
  - 範例實作網站
tag:
  - PHP 程式設計（假日班）
date: 2022-12-11 21:38:38
---

![](https://i.imgur.com/96NYgou.png)

本篇將利用 css 與 javascript 之前端課程專案網站作為對應的網頁資料系統，並出分為後台採用混和型開發與前台 api 分離型開發。在此，試著將網站所需資料透過 php 資料處理輸出至 html 網頁。

<!-- more -->

# 提前準備
正式開始教學之前，請先獲取本教學所需的初始素材。透過此素材作為商務網站練習之實作起始點。並透過 VSCode 與 Xampp 平台完成環境布署。

在這個素材內，前台採用提供其他班級課程之商務網站版型內容（主題：露營官網）並包含動態 js 設計與 api 對接準備，以及後台採用 [SB Admin](https://startbootstrap.com/template/sb-admin) 免費版型延伸修改。

## 素材下載
請前往下載加以使用，確保安裝置環境內容。本教材與前期 JavaScript 網頁設計（假日班）期末實作教材稍些取不同，請從新下載此份：

>等待修訂
  <!-- - [Source Project](https://github.com/summer10920/studies_TeachDemo_JS/tree/master/project_Camp/source) 基本 HTML/CSS/Bootstrap5.2 之商務網站素材。 -->

<!-- 此時檢查內容，包含了
- **db.json**
作為模擬後端給予的所有資源。
- **index.html**
主要網站，以一頁式方式呈現。
- **plugins 目錄**
所有相關的 css 與 js 檔案都收錄在此，不論現成套件或自開發檔案。
- **media 目錄**
所有相關的圖片收錄在此，此內容圖片取自 [snow peak JP](https://www.snowpeak.co.jp/) 未授權之商業網站，本站教學僅學術交流使用與示範代碼引用之用途並標示出處，若採用發布轉載自行負擔責任。 -->

## 資料庫設定
接著規劃資料庫與測試資料存取：

1. 至 MYSQL 新增 DB 名為 project_Camp 且編碼為 utf8mb4_unicode_ci。
2. 建立資料表 _loki_user 且欄位 id:INT（設定主鍵與自動流水號 A_I),user:TEXT,pwd:TEXT,active:INT。
3. 對該 table 建立預設 admin:1234

```sql command history
CREATE DATABASE `project_camp` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `project_camp`.`_loki_user` ( `id` INT NOT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `password` TEXT NOT NULL , `acitve` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
INSERT INTO `_loki_user` (`id`, `name`, `password`, `acitve`) VALUES (NULL, 'admin', '1234', '1');
```

## 資料庫 PHP 測試
網站目錄底下先新增 function.php 並規劃 PDO 連線與測試。

- 規劃 lokiSQL 物件，能夠包含 PDO 物件與設定。並規劃 select 功能。
- 規劃 checkUserSaveSession 函式，提供帳密如果存在於 SQL 則加入 SESSION 紀錄並回傳成功與否。同時如果已經有在 SESSION 內就不再驗證。
- 試著網頁執行`http://127.0.0.1/function.php`是否成功。代表 SQL 連線可正常操作。

```php function.php
<?php
session_save_path('tmp'); //修改 tmp 路徑
session_start(); //open session

// PDO Connect CRUD
class lokiSQL {
  private
    $db,
    $prefix_name = '_loki_';

  public function __construct() {
    $this->db = new PDO("mysql:host=127.0.0.1;dbname=project_camp;charset=utf8", "root", "", null);
  }

  public function select($tb, $wh) {  //提供資料表名稱跟條件，我能操作 SQL-Select 回傳
    return $this->db->query("SELECT * FROM " . $this->prefix_name . $tb . " WHERE " . $wh)->fetchAll();
  }
}

///////////// custom function
$sql = new lokiSQL();

function checkUserSaveSession($acc, $pwd) {
  global $sql;
  if (isset($_SESSION['admin'])) return true; //如果存在就直接回傳 ture，不用再驗證設定 SESSION

  $check = !!$sql->select('user', 'name="' . $acc . '" AND password="' . $pwd . '" AND active=1');
  if ($check) $_SESSION['admin'] = $acc;
  return $check;
}

var_dump(checkUserSaveSession('admin', '1234'));
```

## 後台版型模組化
從這裡開始隨著步驟對素材包內多個 template.html 進行逐步替換成為模組化網頁。以`file/table.html`為例，將內容進行抽取分離。使得可重複利用以及便於維護性，整理成以下 4 筆檔案：

- header.php:
範圍從`<!DOCTYPE html>` ~ `<div id="layoutSidenav_content">`，使其 head 標籤與 body 起頭包覆。
- main-orderList.php:
範圍為不含`<main></main>`內部元素。
- footer.php:
範圍為`<footer class="py-4 bg-light mt-auto">` ~ `</html>`。
- admin.php:
經上述整理抽取，最後透過 include 匯入。理應獲得不變的首頁，但原理已分割化。
```php admin.php
<?php include_once('template/header.php') ?>
<main>
  <?php include_once('template/main-orderList.php') ?>
</main>
<?php include_once('template/footer.php') ?>
```

{% note default %}
這裡僅示範簡易分割為止，如果需要可以思考 header.php 分離為 linkScript 與 navMenu，使模組更細部化。
{% endnote %}

# main-orderList 訂單列表
本篇正式教學訂單資料建置與呈現方式。

## 資料建立
前往 SQL 管理，建立 N 筆測試用資料。目前來說從前台得知傳過來的資料為

```json
userName: name,
userPhone: 1234,
userMail: 123@123123.123,
selectDate: ["2023-02-21","2023-02-22","2023-02-23"],
sellout: {"aArea":1,"bArea":2,"cArea":3,"dArea":4}
```

而後台所需生成的欄位為：

```html
<tr>
  <th>訂購人</th>
  <th>入住日</th>
  <th>購買帳位</th>
  <th>應收金額</th>
  <th>手機信箱</th>
  <th>訂購時間</th>
  <th>刪除操作</th>
</tr>
```

因此，建立對應的 sql table 名為 `_loki_order_list`：

```sql sql command
CREATE TABLE `project_camp`.`_loki_order_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `phone` TEXT NOT NULL,
  `mail` TEXT NOT NULL,
  `selectDate` TEXT NOT NULL,
  `sellout` TEXT NOT NULL,
  `price` INT NOT NULL,
  `createDate` DATETIME NOT NULL,
  'del' INT NOT NULL,
  PRIMARY KEY (`id`)
);
```

並建立假資料 2 筆，其中注意 selectDate 與 sellout 為陣列與 JSON 物件，因此轉型別為 string 存取較為適合。透過 PHP 的`serialize()`達到，建立轉換用的 obj2str.php 如下

```php obj2str.php
<?php
$ary = ["2023-02-21", "2023-02-22", "2023-02-23"];
$aryStr = serialize($ary);

$json = '{"aArea":1,"bArea":2,"cArea":3,"dArea":4}';
$obj = json_decode($json);
$objStr = serialize($obj);

echo '<b>array in sql:</b><br> ' . $aryStr; 
//a:3:{i:0;s:10:"2023-02-21";i:1;s:10:"2023-02-22";i:2;s:10:"2023-02-23";}
echo "<br>";
echo '<b>object in sql:</b><br> ' . $objStr; 
//O:8:"stdClass":4:{s:5:"aArea";i:1;s:5:"bArea";i:2;s:5:"cArea";i:3;s:5:"dArea";i:4;}

echo "<hr>";
echo 'array in php::';
print_r(unserialize(($aryStr)));
echo "<br>";
echo 'json in php::';
print_r(unserialize(($objStr)));
```

因此完成指令如下：

```sql sql command
INSERT INTO `_loki_order_list`
VALUES (
    NULL,
    '客戶 A',
    '0988123123',
    'aa@gmail.com',
    'a:3:{i:0;s:10:"2023-02-21";i:1;s:10:"2023-02-22";i:2;s:10:"2023-02-23";}',
    'O:8:"stdClass":4:{s:5:"aArea";i:1;s:5:"bArea";i:2;s:5:"cArea";i:3;s:5:"dArea";i:4;}',
    9999,
    NOW(),
    0
  );
INSERT INTO `_loki_order_list`
VALUES (
    NULL,
    '客戶 B',
    '0977456456',
    'bb@gmail.com',
    'a:3:{i:0;s:10:"2023-02-22";i:1;s:10:"2023-02-23";i:2;s:10:"2023-02-24";}',
    'O:8:"stdClass":4:{s:5:"aArea";i:2;s:5:"bArea";i:3;s:5:"cArea";i:4;s:5:"dArea";i:5;}',
    5555,
    NOW(),
    0
  );
```

## 資料讀取
這裡將對後台規劃資料列表顯示，透過 datatables 套件能快速規劃出具備功能性的表格。而避免過度依賴 HTML 與 JS，採用 php 來生成靜態 HTML 之資料網頁。

### 規劃 function.php 與 header.php
暫時性的先將稍早測試用的 checkUserSaveSession() 註解掉。這裡規劃新的 getOrderList() 使幫助我們能獲取來自 orderList 資料表的所有資料，where 條件為無（也就是 1)。

```php function.php
///////////// custom function
$sql = new lokiSQL();

// function checkUserSaveSession($acc, $pwd) {
//   global $sql;
//   if (isset($_SESSION['admin'])) return true; //如果存在就直接回傳 ture，不用再驗證設定 SESSION

//   $check = !!$sql->select('user', 'name="' . $acc . '" AND password="' . $pwd . '" AND active=1');
//   if ($check) $_SESSION['admin'] = $acc;
//   return $check;
// }

// var_dump(checkUserSaveSession('admin', '1234'));

function getOrderList() {
  global $sql;
  return $sql->select('order_list', 1);
}
```

然後我們希望任何網頁都能吃到 function.php 的函式，因此利用 header.php 剛好會是這些網頁的通用檔案，可加入到初始處。並利用 require_once 完成初始引用。

```php header.php
<?php require_once("./function.php"); ?>
// ...
```

現在可以隨意使用 function.php 內的任何函式，只要該網頁持有 head.php。

### 修改 main-orderList.php
再來回到後台的指定頁面，透過已存在的 HTML，我們希望能整理出`$htmlCode`規劃如下：

```php main-orderList.php
<?php 
$htmlCode = '';
?>
<div class="container-fluid px-4">
  <h1 class="mt-4">訂購資料</h1>
  <div class="card mb-4">
    <div class="card-body">
      <table id="orderTable">
        <thead>
          <tr>
            <th>訂購人</th>
            <th>入住日</th>
            <th>購買帳位</th>
            <th>應收金額</th>
            <th>手機信箱</th>
            <th>訂購時間</th>
            <th>刪除操作</th>
          </tr>
        </thead>
        <tbody>
          <?= $htmlCode ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

如此一來，步驟如下：

- 透過 getOrderList() 來獲得所有資料。這是來自 SQL 內的所有 DATA。需要跑 foreach 批次取出成為 tr>td*7
- 其中 selectDate 是 array 經過打包所以要反轉回 unserialize。如果是 array 可以透過 implode 幫助我們轉指定的 string `$selectDateStr`
- 其中 sellout 是 json 物件 (stdClass) 經過打包所以要反轉回 unserialize。雖然是 stdClass 也可以當作 array 跑 foreach 取出 key 與 value，再湊成指定的 string `selectPalletStr`。
- 同上，透過指定關鍵字 key 產生不同對應的 HTML Code。
- 最後將這些資料湊回 tr>td*7，包含了`$row['name']`, `$selectDateStr`, `selectPalletStr`, `$row['price']`, `$row['phone'].' | '.$row['mail']`, `$row['createDate']`, `$row['del']`

```php main-orderList.php
<?php
$rows = getOrderList();
$htmlCode = '';

foreach ($rows as $row) {
  $selectDateAry = unserialize($row['selectDate']);
  $selectDateStr =
    '<span class="badge bg-secondary me-1">' .
    implode('</span><span class="badge bg-secondary me-1">', $selectDateAry) .
    '</span>';

  $selectPalletObj = unserialize($row['sellout']);
  $selectPalletStr = '';
  foreach ($selectPalletObj as $key => $value) {
    switch ($key) {
      case 'aArea':
        $selectPalletStr .= '<span class="badge rounded-pill bg-danger me-1">A 區 x ' . $value . '</span>';
        break;
      case 'bArea':
        $selectPalletStr .= '<span class="badge rounded-pill bg-warning me-1">B 區 x ' . $value . '</span>';
        break;
      case 'cArea':
        $selectPalletStr .= '<span class="badge rounded-pill bg-success me-1">C 區 x ' . $value . '</span>';
        break;
      case 'dArea':
        $selectPalletStr .= '<span class="badge rounded-pill bg-info me-1">D 區 x ' . $value . '</span>';
        break;
    }
  }

  $htmlCode .= '<tr>
    <td>' . $row['name'] . '</td>
    <td>' . $selectDateStr . '</td>
    <td>' . $selectPalletStr . '</td>
    <td>' . $row['price'] . '</td>
    <td>' . $row['phone'] . ' | ' . $row['mail'] . '</td>
    <td>' . $row['createDate'] . '</td>
    <td>' . $row['del'] . '</td>
  </tr>';
}

?>

<div class="container-fluid px-4">
  <h1 class="mt-4">訂購資料</h1>
  <div class="card mb-4">
    <div class="card-body">
      <table id="orderTable">
        <thead>
          <tr>
            <th>訂購人</th>
            <th>入住日</th>
            <th>購買帳位</th>
            <th>應收金額</th>
            <th>手機信箱</th>
            <th>訂購時間</th>
            <th>刪除操作</th>
          </tr>
        </thead>
        <tbody>
          <?= $htmlCode ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

## 資料寫入
此時需要依賴前台的表單建立，也就是透過真實下訂之後轉給後端來執行資料庫寫入，讓後台可以看到單筆訂單追加。前台設計的位置為 index.html，同時透過 API 方式提交訂單給後端。

### 修改 plugins\lokiCalendar.js
API 位置原本為一個測試用的 fake 站點，修改調整回後端指定處。這裡合併利用 function.php 來完成（你應該另外建立一個專門與前台對接的 api.php，但由於範例只有一組 api 所以這裡簡約合併使用 function.php)。

```js plugins\lokiCalendar.js
// fetch('https://jsonplaceholder.typicode.com/posts', {
fetch('/function.php?do=newOrder', {
```

### 規劃 function.php
此時預覽一下 function.php，除了價格前端的前台提交不會傳遞過來（這也是保護真正的金額由後端自家伺服器來計算而不是由客戶來告知金額費用）。因此稍晚我們後端還需要透過資料庫去更新正確的金額。我們先完成訂單存入的行為。

```php function.php
// api todo
if (isset($_GET['to'])) {
  switch ($_GET['do']) {
    case 'newOrder':
      print_r($_POST);
      /*
      Array
      (
          [userName] => 213
          [userPhone] => 123123
          [userMail] => 123123@123
          [selectDate] => ["2023-02-21"]
          [sellout] => {"aArea":2,"bArea":0,"cArea":0,"dArea":0}
      )
      */

      break;

    default:
      break;
  }
}
```

循序根據以下規劃步驟思考與設計：
- 在原 switch case 領域下，參考 INSERT 指令重新整理 VALUE 所需的字串。其中 selectDate 與 sellout 需要經過壓縮。
- selectDate 壓縮方式較為簡單，將原本 string 轉為 array 再進行 serialize 壓縮。
- sellout 需先將前端無意義的 0 捨去，因此 string 轉為普通 array （帶 true)，再透過 filter 過濾才進行壓縮。
- 整理好 value 陣列，另外發給 saveOrder() 或乾脆寫在一起省去下一步驟。這裡要注意 sql 本身字串需要特殊 string 字元，因此需特別補上。
- 建立 saveOrder() 幫助我們將 sql 指令傳遞到 sql 物件導向。透過`$sql->insert()`與指定 table 名稱完成工作。
- 於 lokiSql 物件內，參考`public function select($tb, $wh)`設計規劃出`public function insert($tb, $sqlCode)`。
- insert() 會完成 sql 所有指令並透過 pdo 傳遞給 mysql。
- 最後要在 switch case 補上一個 json 輸出讓前端 JS 可捕獲到有回應成功。
- 最後測試一下前台提交訂單是否成功於 mysql 追加訂單成功，並來到後台觀看訂單列表變化。

```php function.php
class lokiSQL {
  private
    $db,
    $prefix_name = '_loki_';

  public function __construct() {
    $this->db = new PDO("mysql:host=127.0.0.1;dbname=project_camp;charset=utf8", "root", "", null);
  }

  public function select($tb, $wh) {
    return $this->db->query("SELECT * FROM " . $this->prefix_name . $tb . " WHERE " . $wh)->fetchAll();
  }

  public function insert($tb, $sqlCode) {  //提供資料表名稱跟 value 陣列，能操作 SQL-INSERT
    return $this->db->query('INSERT INTO ' . $this->prefix_name . $tb . ' VALUES (' . implode(',', $sqlCode) . ')');
  }
}

// ...

function saveOrder($sqlCode) {
  global $sql;
  return $sql->insert('order_list', $sqlCode)->queryString; //如果 SQL 指令成功，可以捕獲到這個 String
}

// api todo
if (isset($_GET['to'])) {
  switch ($_GET['do']) {
    case 'newOrder':

      // var_dump($_POST['sellout']);//注意這裡是字串 string(41) "{"aArea":2,"bArea":0,"cArea":0,"dArea":0}"
      // var_dump($_POST['selectDate']);//這裡也是字串

      // $selectDateAry = json_decode($_POST['selectDate']);
      $selectDateZip = serialize(json_decode($_POST['selectDate']));

      // $selloutAry = json_decode($_POST['sellout'], true);
      // $selloutIsSet = array_filter($selloutAry, function ($v) {
      //   return $v !== 0;
      // });
      $selloutZip = serialize(array_filter(json_decode($_POST['sellout'], true), function ($v) {
        return $v !== 0;
      }));

      $sqlCode = ['null', '\'' . $_POST['userName'] . '\'', '\'' . $_POST['userPhone'] . '\'', '\'' . $_POST['userMail'] . '\'', '\'' . $selectDateZip . '\'', '\'' . $selloutZip . '\'', 'NOW()', 999, 0];
      //最後提交到 sql 時需要 string 符號，因此這裡需要追加並利用跳脫字元。
      // print_r($sqlCode);

      // saveOrder($sqlCode);
      if (saveOrder($sqlCode)) {
        header("Content-Type: application/json");
        echo json_encode(['STATE' => 'DONE']); //最後要回應給前端一個 json 被捕獲。
        exit();
      } else echo 'SQL FAIL';
      break;

    default:
      break;
  }
}
```

目前為止，除了金額還沒有計算成功。等完成營位參數設計功能後，再回頭處理這部分的正確計算總值。

## 資料刪除
後台要能對每筆資料進行刪除，但這裡我們使用軟刪除，也就是不是真的刪除掉而是透過 del 值為 1，避免有任何需要查詢刪除紀錄時還能從資料庫內找到。（如果可以能對 sql 欄位多考慮刪除日期供未來查核，但這裡簡化不做此欄位）。

### 規劃 main-orderList.php 刪除按鈕
修改原本 del 欄位，產生一個超連結方式利用 GET 變數去要求刪除的行為。試著組成帶有 id 的刪除要求並導向至 function.php。

```php main-orderList.php
foreach ($rows as $row) {
  //...

  $getAry = [
    'do' => 'delOrder',
    'id' => $row['id']
  ];
  //這裡可以 string 慢慢湊，或者利用 http_build_query 將 array 轉為 get 參數

  $htmlCode .= '<tr>
    <td>' . $row['name'] . '</td>
    <td>' . $selectDateStr . '</td>
    <td>' . $selectPalletStr . '</td>
    <td>' . $row['price'] . '</td>
    <td>' . $row['phone'] . ' | ' . $row['mail'] . '</td>
    <td>' . $row['createDate'] . '</td>
    <td><a class="btn btn-danger btn-sm" href="function.php?' . http_build_query($getAry) . '">刪除</a></td>
    </tr>';
    //原本的 <td>'.$row['del'].'</td>換掉
}
```

### 規劃 function.php 刪除動作
到 function.php 規劃前面帶來的參數。這落於 switch case 內。利用 PDO 方式對 del 修改為 1。

- 規劃 switch case 內的 delOrder 動作，觸發執行 delOrder 並提供 id
- delOrder 函式對 PDO 的 update 操作，並指定好 table, SET, WHERE 等必要語句。
- update 這裡將語句湊出還原。
- 如果成立需重新導向回回原本的後台網頁位置
- 最後調整 select all 的條件，添加只限定 del 為 0 的資料。
- 驗證資料刪除是否成功。

```php function.php
<?php
session_save_path('tmp');
session_start();

class lokiSQL {
  //...

  public function update($tb, $set, $wh) {  //提供引數，能操作 SQL-UPDATE
    return $this->db->query('UPDATE ' . $this->prefix_name . $tb . ' SET ' . $set . ' WHERE ' . $wh);
    // UPDATE _loki_order_list SET del=1 WHERE id=5 參考
  }
}

///////////// custom function
$sql = new lokiSQL();
//...
function getOrderList() {
  global $sql;
  return $sql->select('order_list', 'del=0'); //調整條件，只顯示軟刪除未成立的資料
}
//...
function delOrder($id) {
  global $sql;
  return $sql->update('order_list', 'del=1', 'id=' . $id)->queryString;
  // UPDATE _loki_order_list SET del=1 WHERE id=5  參考
}

// api todo
if (isset($_GET['do'])) {
  switch ($_GET['do']) {
    //...

    case 'delOrder':
      if (delOrder($_GET['id'])) {
        header('Location:admin.php');
        exit();
      } else echo 'SQL FAIL';
      break;

    default:
      break;
  }
}
```

# main-pallet 營位參數
接下來為規劃可維護 pallet 的參數，從 file 目錄底下找到 main-pallet.html 並試著參考 admin 作法調整以下動作：

- 建立並放置目錄為於`template/main-pallet.php`
- 複製 admin.php 另建立根目錄底下的 pallet.php，並參考分割版型做法。
- 調整`template/header.php`內的選單 link，包含了 admin 與 pallet 的連結。

```html template/header.php
<div class="nav">
  <div class="sb-sidenav-menu-heading">訂房資訊</div>
  <a class="nav-link" href="admin.php">
    <i class="sb-nav-link-icon fas fa-tachometer-alt"></i>訂單資料</a>
  <a class="nav-link" href="#!">
    <i class="sb-nav-link-icon fas fa-tachometer-alt"></i>每日房況</a>
  <a class="nav-link" href="#!">
    <i class="sb-nav-link-icon fas fa-tachometer-alt"></i>國定假日</a>
  <a class="nav-link" href="pallet.php">
    <i class="sb-nav-link-icon fas fa-tachometer-alt"></i>營位參數設定</a>
  <!-- ... -->
</div>
```

```php pallet.php
<?php include_once('template/header.php') ?>
<main>
  <?php include_once('template/main-pallet.php') ?>
</main>
<?php include_once('template/footer.php') ?>
```

## 資料建立
前往 SQL 管理，建立 4 筆測試用資料。從前台 db.json 得知以下資訊

```json
{
  "count": 40,
  "aArea": {
    "total": 10,
    "normalPrice": 1000,
    "holidayPrice": 1500
  },
  "bArea": {
    "total": 10,
    "normalPrice": 1100,
    "holidayPrice": 1600
  },
  "cArea": {
    "total": 10,
    "normalPrice": 1200,
    "holidayPrice": 1700
  },
  "dArea": {
    "total": 10,
    "normalPrice": 2000,
    "holidayPrice": 2500
  }
}
```

對此建立資料表，以及建立資料參閱 db.json

```sql sql command
CREATE TABLE `project_camp`.`_loki_pallet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `total` INT NOT NULL,
  `normalPrice` INT NOT NULL,
  `holidayPrice` INT NOT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `_loki_pallet`
VALUES (
    NULL,
    'aArea',
    10,
    1000,
    1500
  );
INSERT INTO `_loki_pallet`
VALUES (
    NULL,
    'bArea',
    10,
    1000,
    1500
  );
INSERT INTO `_loki_pallet`
VALUES (
    NULL,
    'cArea',
    10,
    1000,
    1500
  );
INSERT INTO `_loki_pallet`
VALUES (
    NULL,
    'dArea',
    10,
    1000,
    1500
  );
```

## 資料讀取
讓後台指定頁面可以獲取這些資料存放於 form 表單內的預設 value。可參考 main-orderList.php 做法。

### 規劃 function.php
這裡規劃新的 getPallets() 使幫助我們能獲取來自 pallet 資料表的所有資料，where 條件為無（也就是 1)。

```php function.php
function getPallet(){
  global $sql;
  return $sql->select('pallet',1);
}
```

### 規劃 main-pallet.php
試著將資料庫整理出畫面所需的 HTML。

- 利用 getPallet() 取得所有資料，由於營位名稱跟資料庫不同，可以利用一個自訂陣列做轉換。
- 透過資料筆數與畫面 card 數量單位相同，迴圈控制了 4 次也對應 sql 共 4 筆。
- 注意 value 都能找到指定的資料。而 name 這裡用 [] 來存放。
- 我們還要偷藏一個 id 到表單內
- 規劃 form 表單採用 POST 並提交至指定 do=mdyPallet

```php main-pallet.php
<?php
$rows = getPallet();
$titleAry = [
  'aArea' => '河畔 × A 區',
  'bArea' => '山間 × B 區',
  'cArea' => '平原 × C 區',
  'dArea' => '車屋 × D 區',
];
$htmlCode = '';

foreach ($rows as $row) {
  $htmlCode .= '
  <div class="col">
    <div class="card mb-4">
      <div class="card-header">' . $titleAry[$row['name']] . '</div>
      <input type="hidden" name="id[]" value="' . $row['id'] . '">
      <div class="card-body">
        <div class="row row-cols-1 row-cols-sm-3 gy-2">
          <div class="col">
            <div class="form-floating">
              <input class="form-control" name="total[]" value="' . $row['total'] . '">
              <label>數量</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <input class="form-control" name="normalPrice[]" value="' . $row['normalPrice'] . '">
              <label>平日價格</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <input class="form-control" name="holidayPrice[]" value="' . $row['holidayPrice'] . '">
              <label>假日價格</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  ';
}
?>

<form class="container-fluid px-4" method="post" action="function.php?do=mdyPallet">
  <h1 class="mt-4">營位參數設定</h1>
  <div class="row row-cols-1 row-cols-sm-2">
    <?= $htmlCode ?>
  </div>
  <hr>
  <div class="text-center">
    <button class="btn btn-secondary" type="reset">復原</button>
    <button class="btn btn-primary" type="submit">修改</button>
  </div>
</form>
```

## 修改資料
也就一口氣將前者之大型表單做修改提交，其重點核心如何將二維陣列整理做成 N 筆批次修改 SQL 指令。

### 規劃 function.php
大概重點落於如何我們從迴圈抽分解 sql 指令，多利用 print_r 觀察 source array。最後如何確保指令成功要重新導向回後台頁面。

- 從 case 內部先試著理解 print_r($_POST) 資料，我們只拿 id 二階陣列跑回圈，再利用同 index 特性去跨 array 湊出單筆資料之結構。
- 參考 SQL 的 UPDATE 指令做重組 string，利用 array 之後轉 string，會比起臭長的 string 串接而輕鬆。
- 回圈內應該會強迫更新 4 次資料，規劃 updatePallet() 另外處理，同時需要將 id 跟 SET 指令傳遞過去。
- updatePallet 保持乾淨，只需向 PDO 做 update 並回傳結果。且 PDO 的 update 之前已設計過，我們可以重複利用
- 回到 case，既然會跑 4 次要確保沒有錯誤，可以自訂一個 boolean 為 true，只要有任何一次迴圈的 updatePallet 回傳捕獲失敗就改 false。離開迴圈後觀察此變數是否仍保持 true 就能代表 PDO 都順利，可以導向返回後台頁面。

```php
<?php
//...

///////////// custom function
$sql = new lokiSQL();
//...
function updatePallet($id, $set) {
  global $sql;
  return $sql->update('pallet', $set, 'id=' . $id)->queryString;
}

// api todo
if (isset($_GET['do'])) {
  switch ($_GET['do']) {
    //...

    case 'mdyPallet':
      // print_r($_POST);
      $flag = true;
      foreach ($_POST['id'] as $key => $value) {
        // "UPDATE _loki_pallet SET id=[value-1],name=[value-2],total=[value-3],normalPrice=[value-4],holidayPrice=[value-5] WHERE 1";
        $setAry = [
          'total=' . $_POST['total'][$key],
          'normalPrice=' . $_POST['normalPrice'][$key],
          'holidayPrice=' . $_POST['holidayPrice'][$key]
        ];

        $setStr = implode(', ', $setAry);
        if (!updatePallet($value, $setStr)) $flag = false;
      }

      if ($flag) {
        header('Location:pallet.php');
        exit();
      }
      break;
    default:
      break;
  }
}
```

## 前台資料
由於營位參數的資料於前台有使用到，因此我們需要將原本的 db.json 讓 php 來控制並計算出 json 如何提供。使前台的前端資料與我們資料庫對應相符合。雖然 php 可利用 `fopen()` 與 `fwrite()` 來編寫 db.json，但本教材為了容易上手直接以 php 讀取內容方式完成。有興趣同學可自行研究完成。

### 重製 db.json 為 db.json.php
將原本根目錄下的 db.json 複製為 db.json.php，並修改前台原本的`plugins\lokiCalendar.js`內之`db.json`檔案路徑更改為`db.json.php` 進行該檔案調整：

- 將原本的內容改成 string 方式用 php 的邏輯儲存起來，此時格式叫做 json string
- 將 json string 轉換解碼為純陣列使用。此時格式叫做 json array，這裡我們稍晚再做陣列整理保留
- 再者要提供在畫面內容上之前，記得宣告網頁格式 Content-Type 為 json。
- 此時 json string 透過 json 編碼 echo 出來，看看前端運作有無錯誤訊息。
- 此外我們也會需要跟 SQL 連線，所需要 function.php 這隻檔案做引用。

```php db.json.php
<?php
require_once("./function.php");

$dbJSONStr = '{
  "success": true,
  "nationalHoliday": [
    "2023-01-02",
    "2023-01-20",
    "2023-01-23",
    "2023-01-24",
    "2023-01-25",
    "2023-01-26",
    "2023-01-27",
    "2023-02-27",
    "2023-02-28",
    "2023-04-03",
    "2023-04-04",
    "2023-04-05",
    "2023-06-22",
    "2023-06-23",
    "2023-09-29",
    "2023-10-09",
    "2023-10-10",
    "2024-01-01"
  ],
  "pallet": {
    "count": 40,
    "aArea": {
      "total": 10,
      "normalPrice": 1000,
      "holidayPrice": 1500
    },
    "bArea": {
      "total": 10,
      "normalPrice": 1100,
      "holidayPrice": 1600
    },
    "cArea": {
      "total": 10,
      "normalPrice": 1200,
      "holidayPrice": 1700
    },
    "dArea": {
      "total": 10,
      "normalPrice": 2000,
      "holidayPrice": 2500
    }
  },
  "booked": [
    {
      "date": "2022-12-12",
      "sellout": {
        "aArea": 1,
        "bArea": 1,
        "cArea": 1,
        "dArea": 1
      }
    },
    {
      "date": "2022-12-13",
      "sellout": {
        "aArea": 2,
        "bArea": 2,
        "cArea": 10,
        "dArea": 2
      }
    },
    {
      "date": "2022-12-14",
      "sellout": {
        "aArea": 3,
        "bArea": 3,
        "cArea": 3,
        "dArea": 3
      }
    },
    {
      "date": "2022-12-25",
      "sellout": {
        "aArea": 10,
        "bArea": 10,
        "cArea": 10,
        "dArea": 10
      }
    },
    {
      "date": "2022-12-16",
      "sellout": {
        "aArea": 10,
        "bArea": 10,
        "cArea": 10,
        "dArea": 10
      }
    }
  ]
}';

$dbJSONAry = json_decode($dbJSONStr, true); //對 php 來說 json 是 string，轉成 array 才能用 php 做資料處理
header("Content-Type: application/json"); //將網頁的內容型別切成 json，讓瀏覽器知道這是 json 不是 string
echo json_encode($dbJSONAry); //將 php 的經修改的 array 以 json(string) 方式顯示。
```

目前為止若從瀏覽器上的 network 與 console 沒有錯誤且畫面正常運作。代表你已成功將靜態資料從固定檔案變成 php 編譯檔案。接下來要將此固定資料整理成動態資料。

- 初始空陣列為`$pallet`，利用 foreach 將每筆 row 塞入至指定處。
- 總計數量除了慢慢加，也可以利用 array_column 與 array_sum 方式算出，再存入`$pallet`指定處。
- 最後存入到已轉為 json array，最後更新輸出。
- 檢查前台是否如期已動態更新。

```php db.json.php

// pallet start
$rows = getPallet(); //取得
$pallet = []; //初始
foreach ($rows as $row) {
  $pallet += [$row['name'] => [
    'total' => $row['total'],
    'normalPrice' => $row['normalPrice'],
    'holidayPrice' => $row['holidayPrice'],
  ]];
}
$pallet += ['count' => array_sum(array_column($rows, 'total'))]; //計算 count 的 value

$dbJSONAry = json_decode($dbJSONStr, true); 
$dbJSONAry['pallet'] = $pallet; //更新指定的值

header("Content-Type: application/json"); //將網頁的內容型別切成 json，讓瀏覽器知道這是 json 不是 string
echo json_encode($dbJSONAry); //將 php 的經修改的 array 以 json(string) 方式顯示。
```

# main-holiday 國定假日
國定假日會影響房價的計算，也是業者需要的功能之一。需要一個新的資料表存放國定假日，為了好操作維護我們以 textarea 考量去設計而不是 N 個 input:date 慢慢點選。雖簡約但好維護。

與前面相同，從 file 目錄底下找到 main-holiday.html 調整以下動作：

- 建立並放置目錄為於 template/main-holiday.php
- 複製 holiday.php 另建立根目錄底下的 holiday.php，並參考分割版型做法。
- 調整 template/header.php 內的 holiday 選單 link。

```html template/header.php
<a class="nav-link" href="holiday.php">
  <i class="sb-nav-link-icon fas fa-tachometer-alt"></i>國定假日</a>
```
```php holiday.php
<?php include_once('template/header.php') ?>
<main>
  <?php include_once('template/main-holiday.php') ?>
</main>
<?php include_once('template/footer.php') ?>
```
```php main-holiday.php
<form class="container-fluid px-4">
  <h1 class="mt-4">國定假日</h1>
  <div class="row row-cols-1 row-cols-sm-2">
    <div class="col">
      <div class="card mb-4">
        <div class="card-header">2023</div>
        <div class="card-body">
          <div class="form-floating">
            <textarea style="min-height:20rem" class="form-control"></textarea>
            <label for="floatingTextarea">Comments</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <div class="text-center">
    <button class="btn btn-secondary" type="reset">復原</button>
    <button class="btn btn-primary" type="submit">修改</button>
  </div>
</form>
```

## 資料建立
前往 SQL 管理，建立今年 1 筆測試用資料。從前台 db.json 得知以下資訊：

```json db.json
[
  "2023-01-02",
  "2023-01-20",
  "2023-01-23",
  "2023-01-24",
  "2023-01-25",
  "2023-01-26",
  "2023-01-27",
  "2023-02-27",
  "2023-02-28",
  "2023-04-03",
  "2023-04-04",
  "2023-04-05",
  "2023-06-22",
  "2023-06-23",
  "2023-09-29",
  "2023-10-09",
  "2023-10-10",
  "2024-01-01"
]
```

到時候會是以 textarea 讓業者編譯此內容，我們需要以普通的字串來存入資料庫。然而 textarea 支援斷行，所以你可以從 phpmyadmin 去一個個斷行，或改以下指令方式新增。對此建立資料表，以及建立資料參閱 db.json：

```sql command history
CREATE TABLE `project_camp`.`_loki_holiday` ( `id` INT NOT NULL AUTO_INCREMENT , `year` TEXT NOT NULL , `date` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO `_loki_holiday` VALUES (NULL, '2023', '2023-01-02\r\n2023-01-20\r\n2023-01-23\r\n2023-01-24\r\n2023-01-25\r\n2023-01-26\r\n2023-01-27\r\n2023-02-27\r\n2023-02-28\r\n2023-04-03\r\n2023-04-04\r\n2023-04-05\r\n2023-06-22\r\n2023-06-23\r\n2023-09-29\r\n2023-10-09\r\n2023-10-10');
INSERT INTO `_loki_holiday` VALUES (NULL, '2024', '2024-01-01');
```

## 資料讀取
同樣，讓後台指定頁面可以獲取這些資料的需求。可參考 main-orderList.php 做法。

### function.php
這裡規劃新的 getHoliday() 使幫助我們能獲取來自 holiday 資料表的所有資料，where 條件為今年分以上。

- YEAR() 是 mySQL 函式需指定一時間單位，CURRENT_DATE() 也是 mySQL 函式能提供當前日期的時間單位。合併起來就是今年年。
- 同上，我們的條件是今年且而後皆要。應該屆時會跑出 1 年份的資料表。

```php function.php
function getHoliday() {
  global $sql;
  return $sql->select('holiday', 'year>=YEAR(CURRENT_DATE()) ORDER BY year');
}
```

### main-holiday.php
試著將資料庫整理出畫面所需的 HTML。調整一下 main-holiday.php 使得資料翻新至畫面上：
```php main-holiday.php
<?php
$rows = getHoliday();
$htmlCode = '';

foreach ($rows as $row) {
  $htmlCode .= '
  <div class="col">
    <div class="card mb-4">
      <div class="card-header">' . $row['year'] . '</div>
      <div class="card-body">
        <div class="form-floating">
          <textarea style="min-height:30rem" class="form-control">'.$row['date'].'</textarea>
          <label for="floatingTextarea">特殊假日</label>
        </div>
      </div>
    </div>
  </div>
';
}

?>
<form class="container-fluid px-4">
  <h1 class="mt-4">國定假日</h1>
  <div class="row row-cols-1 row-cols-sm-3">
    <?= $htmlCode ?>
  </div>
  <hr>
  <div class="text-center">
    <button class="btn btn-secondary" type="reset">復原</button>
    <button class="btn btn-primary" type="submit">修改</button>
  </div>
</form>
```

## 自動建立年份資料
目前只有一年份，後台畫面上不太需要讓業者去做手動新增年分。應該是固定今明後年三年份的資料。所以不如直接透過 sql 指令的進階組合，試著請 sql 端自行判斷若指定年份不存在則需要新增空的年份資料筆。缺點就是業者要偶爾登入這個網頁不然 php 不會生成這樣的 SQL 指令。

利用 INSERT SELECT 複合指令來幫助達成具判斷的新增做法，參考指令如下解說：

- INSERT INTO 指令，但插入的資料不是 VALUE()，而是 SELECT ...
- SELECT ... 是完整語句，我們想選中 2023+3 這個結果作為前者，而 WHERE 某資料結果不存在時才成功會到這裡的 SELECT 
- 此某資料結果不存在的語句則是 (SELECT * FROM)，這裡是最裡面的語句，是否有資料影響到前兩段。

```sql
INSERT INTO _loki_holiday (year) 
SELECT 
  YEAR(CURRENT_DATE())+3 WHERE NOT EXISTS (
    SELECT * FROM _loki_holiday WHERE year=YEAR(CURRENT_DATE())+3
  )
```
- 因為我們要今後 3 年份，所以跑 for 迴圈產生此 3 筆邏輯是最簡快的。
- 另外注意把$i 替換進去，使年份正常流水號 3 組。
- 然後這指令太複雜了不適合普通的公式化函式重複利用，因此再多做一個 function 名為 query 針對此特殊需求。

```php function.php
class lokiSQL {
  //...

  public function query($sqlCode) {  //提供資料表完整 SQL 語句語句，能操作 SQL
    return $this->db->query($sqlCode);
  }
}

//...

function getHoliday() {
  global $sql;

  // INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+3 WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year=YEAR(CURRENT_DATE())+3)
  for ($i = 0; $i < 3; $i++) {
    $checkYear = 'INSERT INTO _loki_holiday (year) SELECT YEAR(CURRENT_DATE())+' . $i . ' WHERE NOT EXISTS (SELECT * FROM _loki_holiday WHERE year=YEAR(CURRENT_DATE())+' . $i . ')';
    $sql->query($checkYear);
  }
  return $sql->select('holiday', 'year>=YEAR(CURRENT_DATE()) ORDER BY year');
}
```

## 修改資料
目前階段將進行後台的修改提交動作，與前面 pallet 設計大同小異，僅要注意的是前面是數字這裡是字串，因此需要特別增加跳脫字元`\`來追加`'`單引符號。而 textarea 本身的斷行會自處理不用管理。

- form 表單本身提交位置到 function.php?do=mdyHoliday
- 與前面 pallet 做法相同，以陣列方式命名 HTML 元素之 name 屬性。並 hidden id 值提交，後端處理時以 id 陣列跑出 index 再跨 date 陣列。
- 同樣這裡會跑 3 次 SQL，因此是否成功可以用 flag 機制判斷。最後若都順利將進行重新導向。

```php function.php
//...
function updateHoliday($id, $set) {
  global $sql;
  return $sql->update('holiday', $set, 'id=' . $id)->queryString;
}
// api todo
if (isset($_GET['do'])) {
  switch ($_GET['do']) {
    //...
    case 'mdyHoliday':
      // print_r($_POST);
      $flag = true;
      foreach ($_POST['id'] as $key => $value) {
        $setStr = 'date=\'' . $_POST['date'][$key] . '\'';
        if (!updateHoliday($value, $setStr)) $flag = false;
      }

      if ($flag) {
        header('Location:holiday.php');
        exit();
      }
      break;
    //...
  }
}
```

```php main-holiday.php
<?php
$rows = getHoliday();
$htmlCode = '';

foreach ($rows as $row) {
  $htmlCode .= '
  <div class="col">
    <div class="card mb-4">
      <div class="card-header">' . $row['year'] . '</div>
      <div class="card-body">
        <div class="form-floating">
          <input type="hidden" name="id[]" value="' . $row['id'] . '">
          <textarea name="date[]" style="min-height:30rem" class="form-control">' . $row['date'] . '</textarea>
          <label for="floatingTextarea">特殊假日</label>
        </div>
      </div>
    </div>
  </div>
';
}

?>
<form class="container-fluid px-4" method="post" action="function.php?do=mdyHoliday">
  <h1 class="mt-4">國定假日</h1>
  <div class="row row-cols-1 row-cols-sm-3">
    <?= $htmlCode ?>
  </div>
  <hr>
  <div class="text-center">
    <button class="btn btn-secondary" type="reset">復原</button>
    <button class="btn btn-primary" type="submit">修改</button>
  </div>
</form>
```

## 前台資料
回到 db.json.php 這裡，試圖能產生原本的所需的 holiday 陣列內容。特別要注意的是將 textarea 的文字轉陣列之前，需將特殊字元做判讀。可利用雙引號使 php 理解。並將此三年份的陣列合併顯示。

```php db.json.php
// pallet data
$rows = getPallet();
$pallet = [];
foreach ($rows as $row) {
  $pallet += [$row['name'] => [
    'total' => $row['total'],
    'normalPrice' => $row['normalPrice'],
    'holidayPrice' => $row['holidayPrice'],
  ]];
}
$pallet += ['count' => array_sum(array_column($rows, 'total'))];

//////////////////////////////////////// holiday data
$rows = getHoliday(); //取得
$nationalHoliday = [];
foreach ($rows as $row) $nationalHoliday = array_merge($nationalHoliday, explode("\r\n", $row['date']));
/* PHP 中的單引號表示“不解析此字符串”。它們被視為文字（不是換行符和回車符，而是實際的文字“\n\r”）。
* 使用雙引號意味著“解析這個字符串”，因此您的控製字符將被解析。
*/

//overwrite to json
$dbJSONAry = json_decode($dbJSONStr, true);

//each data overwrite
$dbJSONAry['pallet'] = $pallet; //更新指定的值
$dbJSONAry['nationalHoliday'] = $nationalHoliday; //更新指定的值

//show on page
header("Content-Type: application/json"); //將網頁的內容型別切成 json，讓瀏覽器知道這是 json 不是 string
echo json_encode($dbJSONAry); //將 php 的經修改的 array 以 json(string) 方式顯示。
```

## 計算價格
資料庫目前已具備了假日參數與營位價格參數，足以修正先前的訂單資料之中的價格統計。這裡需要回頭找到原先在新訂單生成時，針對實際價格進行統計列入資料庫儲存。

### 修改新訂單之處理
我們需要回到 function.php 之`switch case 'newOrder'`部分，重新整理於提交 sqlcode 之前的動作：

- 將 selectDate 與 sellout 的陣列準備好為 selectDateAry 與 selloutAry。
- selectDateAry 會存放訂單的日期，我們需要批次去檢查這些購買的日期是否為假日。
- 要判斷是否為假日，除了透過`date("D")`判斷是否為 SAT 或 SUN，也需要從資料庫 holiday 去比對。
- holiday 的資料為 string，需要透過 explode 轉換為陣列，而`\r\n`為斷行符號，利用雙引號使 PHP 理解為需解析含有意義的 string。
- selloutAry 是指定營位與數量，確認好假日或平日時，進行數字總和。
- 營位參數在資料庫內需取回，取回時可以整理成我們好對應找到的特殊陣列 palletAry。

```php
case 'newOrder':
  $selectDateAry = json_decode($_POST['selectDate']);
  $selectDateZip = serialize($selectDateAry);

  $selloutAry = array_filter(json_decode($_POST['sellout'], true), function ($v) {
    return $v !== 0;
  });
  $selloutZip = serialize($selloutAry);

  //計算價格
  /*
  Array
  (
      [userName] => 213
      [userPhone] => 123123
      [userMail] => 123123@123
      [selectDate] => ["2023-02-21"]
      [sellout] => {"aArea":2,"bArea":0,"cArea":0,"dArea":0}
  )
  */

  $sum = 0;
  $palletAry = [];
  // $rows = getPallet();
  foreach (getPallet() as $row) {
    $palletAry[$row['name']]['normalPrice'] = $row['normalPrice'];
    $palletAry[$row['name']]['holidayPrice'] = $row['holidayPrice'];
  }

  // $rows = getHoliday();
  $holidayAry = [];
  foreach (getHoliday() as $row) {
    $holidayAry = array_merge($holidayAry, explode("\r\n", $row['date']));
  }

  foreach ($selectDateAry as $value) {
    $day = date("D", strtotime($value));

    // if ($day == 'Sat' || $day == 'Sun' || in_array($value, $holidayAry)) {
    //   //is holiday!!
    // } else {
    //   //is normal day!!
    // }

    $keyword = $day == 'Sat' || $day == 'Sun' || in_array($value, $holidayAry) ? 'holidayPrice' : 'normalPrice';

    foreach ($selloutAry as $key => $value) {
      $sum += $palletAry[$key][$keyword] * $value;
    }
  }

  $sqlCode = ['null', '\'' . $_POST['userName'] . '\'', '\'' . $_POST['userPhone'] . '\'', '\'' . $_POST['userMail'] . '\'', '\'' . $selectDateZip . '\'', '\'' . $selloutZip . '\'', 'NOW()', $sum, 0];
  if (saveOrder($sqlCode)) {
    header("Content-Type: application/json");
    echo json_encode(['STATE' => 'DONE']); //最後要回應給前端一個json被捕獲。
    exit();
  } else echo 'SQL FAIL';
  break;
```