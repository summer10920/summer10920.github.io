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
- index.php:
經上述整理抽取，最後透過 include 匯入。理應獲得不變的首頁，但原理已分割化。
```php index.php
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
- 訂購人
- 入住日
- 購買帳位
- 應收金額
- 手機信箱
- 訂購日期

### table _loki_orderList

因此，建立對應的 sql table 名為 `_loki_orderList`：

```sql sql command
CREATE TABLE `project_camp`.`_loki_orderList` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
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
INSERT INTO `_loki_orderList`
VALUES (
    NULL,
    '客戶 A',
    'aa@gmail.com',
    'a:3:{i:0;s:10:"2023-02-21";i:1;s:10:"2023-02-22";i:2;s:10:"2023-02-23";}',
    'O:8:"stdClass":4:{s:5:"aArea";i:1;s:5:"bArea";i:2;s:5:"cArea";i:3;s:5:"dArea";i:4;}',
    9999,
    NOW(),
    0
  );
INSERT INTO `_loki_orderList`
VALUES (
    NULL,
    '客戶 B',
    'bb@gmail.com',
    'a:3:{i:0;s:10:"2023-02-22";i:1;s:10:"2023-02-23";i:2;s:10:"2023-02-24";}',
    'O:8:"stdClass":4:{s:5:"aArea";i:2;s:5:"bArea";i:3;s:5:"cArea";i:4;s:5:"dArea";i:5;}',
    9999,
    NOW(),
    0
  );
```


## 存取資料


# undo


### table _loki_pallet
後台的訂單列表有關聯到價格，因此提前需先設定好該資料表提供查詢，從前台 db.json 得知以下資訊

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
    40,
    1000,
    1500
  );
INSERT INTO `_loki_pallet`
VALUES (
    NULL,
    'bArea',
    40,
    1000,
    1500
  );
INSERT INTO `_loki_pallet`
VALUES (
    NULL,
    'cArea',
    40,
    1000,
    1500
  );
INSERT INTO `_loki_pallet`
VALUES (
    NULL,
    'dArea',
    40,
    1000,
    1500
  );
```

### table _loki_holiday
此外，也影響到特殊國定假日價格計算，我們亦需要先準備好資料表存放一些國定假日。

```sql

```