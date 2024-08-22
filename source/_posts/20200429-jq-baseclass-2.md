---
title: "[基礎課程] jQuery 教學（二）：Ajax 技術"
categories:
  - 職訓教材
  - jQuery
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-29 17:22:05
---
![](https://i.imgur.com/NxJTq7q.png)
Ajax 是一種非同步的運行資料處理方式，我們都知道網頁瀏覽透過伺服器請求將網頁載到用戶端進行網頁文件讀取。如果還需要做資料處理或請求，則需要重新重整網頁，使得請求後端伺服器再新生成文件並傳送到用戶端進行文件讀取。
<!-- more -->

Ajax 簡單來說就是將這些動作包在一起，當你閱讀目前頁面時，透過 JavaScript 在背後呼叫執行 B 頁面但你未察覺到，而將 B 頁面的資訊取得之後，重新 DOM 控制改寫 A 頁面的內容。通常會使用 Ajax 的場合都是處於需要從某處 (Database or api) 進行資料請求 (get data) 或是資料處理 (pusb data)。

最經典的案例就是 Gmail 介面，網頁不用重新加載就能立即性的看見任何結果，該 HTML 會根據你任何操作直接抽換 DOM 給你，使得網頁就像活現的線上應用程式那樣使用。

---
# 語法說明
JavaScript 的 Ajax 相對來說比較複雜且完整參數指令（可自行查 MDN 網站了解），jQuery 的 Ajax 則大幅簡化程式且提供多種方法，只要輕鬆的指令 ava 就 cript 能控制。主分以下方法與用途：

| 語法                                           | 說明                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------- |
| $(selector).load(url)                          | 對 selector 進行載入 url 之 HTML 並替換內容                                     |
| $.get(url,data,callback)                       | 以 get 概念傳送 data 到 url 提供取得，並透過 callback 取得執行指令與 url 結果   |
| $.post(url,data,callback)                      | 同上，但是以 postt 概念傳送 data 到 url                                         |
| $.getJSON(url,data,success(data,status,xhr))   | 同 get 概念，可從 url 取得 JSON 格式 (API) 之資料，並提供相關 success 請求參數  |
| $.getScript(url,data,success(data,status,xhr)) | 同上，主要是取得JavaScript腳本來執行                                            |
| $.ajax(setting)                                | 完整的 Ajax 控制語法，setting 為多資料之物件結構陣列。前幾項都是簡化過的 Ajax() |

這裡基礎教學重點為、$.get() 與、$.post()，之後的 API 串接會再深入介紹。

## $.get() vs $.post()
你如果能理解一般表單進行資料提交或存取時，你可以選擇 get 或 post 方式，透過該超全域變數進行資料傳遞，在 Ajax 也是同樣原理提交變數到另一個網頁去，。基本語法結過如下（以 post 為例，get 不再重複解釋）

```javascript
$.post(url,data,callback,type);
//url 目標網址，將資料送給何者網頁
//data 為傳遞的變數透過 post/get 轉為超全域變數，能以 JSON 陣列塞入多筆資料
//callback 指定當回傳資料時執行函式，通常會在這裡進行 DOM 變化
//能指定回傳的型態 (HTML,XML,JSON...)，預設會自動判別
```

這是前者屬於簡化後的$.post 用法，同等於後者完整的$.Ajax 用法。
```javascript
$.ajax({
  type: 'POST',
  url: url,
  data: data,
  success: callback,//可以指定函式或匿名函式
  dataType: dataType //可省略不寫
});
```

---
# 題目練習
這裡我們將扮演一個前端角色，透過 Ajax 方式向後端申請畫面所需之數據，請後端提供已是 HTML 的內容代碼，讓前端取得並只需要 DOM 生成即可（或者是向後端取得數據陣列，由前端負責組成 HTML 代碼再完成 DOM 生成）。這裡的題目練習為資料庫內有動物資料表、透過 Ajax 方式直接進行 CURD 四步驟。

## 版型規劃與前置作業
由於需要一個後端程式 (PHP) 與資料庫 (MySQL) 並搭配 PDO 方式連接，如果你本身已會此兩項技能可自行參考本事前準備之相關環境，否則請於上課時採用老師的後端環境（由老師提供後端環境）。DOM 操作與 Ajax 部分我們依賴 jQuery 來快速套用。

### 後端準備
{% note primary %}
**後端準備：提供以下代碼給有能力自行架設之學員** 

1. MySQL 匯入：並另提供讀寫權限（範例為 test/test)，將得到資料庫/表為 jq_sample/ajax_animal。
```sql db.sql (MySQL)
-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.1.40-MariaDB
-- PHP 版本： 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `jq_sample`
--

CREATE DATABASE IF NOT EXISTS `jq_sample` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `jq_sample`;

--
-- 資料表結構 `ajax_animal`
--

CREATE TABLE `ajax_animal` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` int(11) NOT NULL,
  `info` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `ajax_animal`
--

INSERT INTO `ajax_animal` (`id`, `name`, `weight`, `info`, `date`) VALUES
(1, '藪貓', 9, '食肉目 貓科 藪貓屬', '2020-12-20 08:21:08'),
(2, '耳廓狐', 17, '食肉目 犬科 狐屬', '2020-12-19 15:57:56'),
(3, '河馬', 120, '鯨偶蹄目 河馬科 河馬屬', '2020-11-07 08:52:06'),
(4, '印度象', 1258, '長鼻目 象科 象屬', '2020-11-07 08:52:06'),
(5, '浣熊', 30, '食肉目 浣熊科 浣熊屬', '2020-11-07 09:13:58'),
(6, '斑馬', 53, '奇蹄目 馬科 馬屬', '2020-11-07 08:52:06'),
(7, '瞪羚', 32, '鯨偶蹄目 牛科 瞪羚屬', '2020-11-07 08:52:06'),
(8, '土狼', 32, '食肉目 鬣狗科 土狼屬', '2020-11-07 08:52:06'),
(9, '水獺', 32, '食肉目 鼬科 小爪水獺屬', '2020-11-07 08:52:06'),
(10, '美洲豹', 999999, '食肉目 貓科 豹屬', '2020-11-07 08:52:06'),
(11, '山貓', 999999999, '食肉目 貓科 虎貓屬', '2020-11-07 08:52:06'),
(12, '馬來貘', 80, '奇蹄目 貘科 貘屬', '2020-11-07 09:13:33'),
(13, '馬島獴', 17, '食肉目 食蟻狸科 馬島獴屬', '2020-11-07 08:52:06'),
(14, '花鹿', 120, '鯨偶蹄目 鹿科 花鹿屬', '2020-11-07 08:52:06'),
(15, '眼鏡王蛇', 1258, '有鱗目 眼鏡蛇科 眼鏡王蛇屬', '2020-11-07 08:52:06'),
(16, '食蟻獸', 40, '披毛目 食蟻獸科 小食蟻獸屬', '2020-11-07 09:13:58'),
(17, '孔雀', 532, '雞形目 雉科 孔雀屬', '2020-11-07 10:54:58'),
(18, '袋獾', 32, '袋鼬目 袋鼬科 袋獾屬', '2020-11-07 10:55:05'),
(19, '傘蜥蜴', 555, '有鱗目 飛蜥科 傘蜥蜴屬', '2020-11-07 10:55:26'),
(20, '朱䴉', 32, '鵜形目 䴉科 朱䴉屬', '2020-11-07 08:52:06'),
(21, '羊駝', 999999, '鯨偶蹄目 駱駝科 小羊駝屬', '2020-11-07 08:52:06'),
(22, '美洲紅䴉', 55, '鵜形目 䴉科 美洲䴉屬', '2020-11-07 09:22:04'),
(23, '美洲河狸', 55, '嚙齒目 河狸科 河狸屬', '2020-11-07 09:24:31'),
(24, '黑尾土撥鼠', 999999999, '嚙齒目 松鼠科 草原犬鼠屬', '2020-11-07 08:52:06'),
(25, '獅子', 55, '食肉目 貓科 豹屬', '2020-12-20 09:38:19'),
(26, '原牛', 120, '鯨偶蹄目 牛科 牛屬', '2020-12-20 09:39:03'),
(27, '阿拉伯大羚羊', 2223, '鯨偶蹄目 牛科 長角羚屬', '2020-12-20 09:40:53'),
(28, '日本黑熊', 222, '食肉目 熊科 熊屬', '2020-12-20 09:49:00'),
(29, '駝鹿', 22, '鯨偶蹄目 鹿科 駝鹿屬', '2020-12-20 09:50:23');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `ajax_animal`
--
ALTER TABLE `ajax_animal`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動增長 (AUTO_INCREMENT)
--

--
-- 使用資料表自動增長 (AUTO_INCREMENT) `ajax_animal`
--
ALTER TABLE `ajax_animal`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```
2. 建立 api.php：做為後端的簡易連結處理。
```php api.php (PHP)
<?php
$db = new PDO("mysql:host=127.0.0.1;dbname=jq_sample;charset=utf8", "test", "test");
date_default_timezone_set('asia/Taipei');
// 取得 PDO 物件，另外順便校正 PHP 時差

// 這裡用 switch 是因為還有其他 Ajax 提交，因此利用 GET 來做區分判斷處理。
switch ($_GET['do']) {
  case 'select':
    $sql = "SELECT * FROM ajax_animal limit " . $_POST['start'] . ",10";
    $rows = $db->query($sql)->fetchAll();
    // print_r($_POST);
    // print_r($rows);
    if($rows){
      foreach ($rows as $row) {
        echo '
          <tr>
            <td>' . $row['id'] . '</td>
            <td class="name">' . $row['name'] . '</td>
            <td>' . $row['weight'] . '</td>
            <td>' . $row['info'] . '</td>
            <td>' . $row['date'] . '</td>
            <td>
              <button class="mdy">修改</button>
              <button onclick="del(this)">刪除</button>
            </td>
          </tr>
        ';
      }
    }else echo 'fail';
    // SQL 內取得所有動物資料，由 foreach 規劃完整 tr>td，使前端單純 HTML 替換即可。
    break;
  case 'update':
    $sql = "UPDATE ajax_animal SET name='" . $_POST['name'] . "',weight='" . $_POST['weight'] . "',info='" . $_POST['info'] . "',date=NOW() WHERE id=" . $_POST['id'];
    $result = $db->query($sql);
    // 成功時，我們 HTML 生成所需要的更新日期之文字，透過 Ajax 回傳給前端
    if ($result) echo date("Y-m-d H:i:s");
    // if($result) echo "OK";
    break;
  case 'delete':
    $sql = "DELETE FROM ajax_animal WHERE id=" . $_POST['id'];
    $result = $db->query($sql);
    if ($result) echo "deleted";
    break;
  case 'insert':
    $sql = "INSERT INTO ajax_animal VALUES(null,'" . $_POST['name'] . "','" . $_POST['weight'] . "','" . $_POST['info'] . "',NOW())";
    $result = $db->query($sql);
    if ($result) echo "inserted";
    break;
}

?>
```

最後，由此代碼可知：
1. 取凡任何資料請求皆使用 POST 進行變數傳遞，
2. 同時變數之索引名稱分別為 id, name, weight, info，時間為自動抓取。
3. 後端採用網址 GET 參數判斷 select, insert, update, delete。
4. 使用 select 需傳送 start 值，方便撈取固定十筆數量。
{% endnote %}

### 前端準備
先設計簡單的 table 畫面，之後隨著 CRUD 的循序設計慢慢豐富此頁面設計。

```html index.html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>jqajax-animal</title>
  <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
</head>

<body>
  <table width="100%">
    <thead>
      <tr>
        <td>編號</td>
        <td>動物名</td>
        <td>重量</td>
        <td>簡介</td>
        <td>更新日期</td>
        <td>操作</td>
      </tr>
      <tr><td colspan="6"><hr></td></tr>
    </thead>
    <tbody>
  </table>
</body>
```

## SELECT 篇：Ajax 資料請求
1. 先確認後端這裡會提供完整的 HTML 代碼給我們，我們不需要自行規劃 HTML。因此前端大致語法如下：
```javascript
/* $.post 寫法 */
$.post("api.php?do=select", {start}, function (result) {
  $("tbody").html(result);
  $(".mdy").click(chginput);//因為是後來生成的 HTML，你必須重新使 DOM 路徑被認識（或者走 HTML 的 onclick 比較快）
});

/* $.Ajax 完整寫法 */
$.ajax({
  type: "POST",
  data: {start},
  url: "api.php?do=select",
  success: function (result){
    $("tbody").html(result);
    $(".mdy").click(chginput);
  }
});
```
2. 大致原理為，我們能將資料請求出來並將回傳的所有資訊直接替換 tbody 的 HTML 內容
3. 此外，因配合新生成的 DOM 還沒有事件偵測，所以重新指定點擊事件，將預告指定給 chginput 函式
4. 為了完整性練習，這裡先把第 1 步驟的 Ajax 使用 loading 包住，透過函式運行來達到載入效果。
5. 我們可以控制每次載入幾筆，所以另外可以設計一個按鈕去觸發 loading 就能十筆的載入更多。
```javascript
/*select*/
let start = 0;
function loading() {
  $.post("api.php?do=select", { start }, function (result) {
    if (result != "fail") {
      $("tbody").append(result);
      $(".mdy").click(chginput);//因為是後來生成的 HTML，你必須重新使 DOM 路徑被認識（或者走 HTML 的 onclick 比較快）
      start += 10;
    }
  });
}
loading();
```
6. 再來是規劃 table footer 區域，這裡放入 loading() 觸發紐，另可預先做好新增按鈕。
```html index.html
<tfoot>
  <tr>
    <td colspan="6" style="text-align: center;padding:10px">
      <button onclick="activeForm()">新增</button>
      <button onclick="loading()">加載</button>
    </td>
  </tr>
</tfoot>
```
7. 目前為止你已經能完成 Ajax 的資料請求 (select)，其整個流程為：
  - 使用者請求一個 HTML 文件到前端瀏覽器，該 HTML 只有乾淨的 table
  - 由 Ajax 請求資料到另一個 api.php 但網頁使用者並不知道此事。（可透過 Chrome 開發工具 Network 查詢）
  - 再不進行網頁重載情況下，Ajax 的結果會進行 DOM 替換。
  - 使用者取得了具備資料結構的內容。

## UPDATE 篇：Ajax 資料處理
我們先練習 UPDATE 部分，我們透過前一章節的練習繼續接著處理。如何透過 Ajax 幫我們進行資料提供給後端程式進行 SQL 更新。

1. 前一章節的練習，我們有預先指定每次點擊修改按鈕時會觸發 chginput 函式。
2. 此函式重點是將純文字轉變成 input 格式。將同個 tr 內，除了自己其他 td 都列為變數 item 代用
3. 利用 this 或 item 對象，找到 tr 位置，並直接整個 tr>td 替換掉。
4. td 替換透過 itiem.eq() 來進行 text 轉 input:value
5. 最後補上一個儲存按鈕，為了省去因新 DOM 需要重新綁定 click 事件，透過 onclick 直接寫好。
```javascript
/*update before DOM transform*/
function chginput() {
  let item = $(this).parent().siblings();
  item.parent().html(`
    <td><input type="hidden" name="id" value="${item.eq(0).text()}">${item.eq(0).text()}</td>
    <td><input type="text" name="name" value="${item.eq(1).text()}"></td>
    <td><input type="text" name="weight" value="${item.eq(2).text()}"></td>
    <td><input type="text" name="info" value="${item.eq(3).text()}"></td>
    <td>${item.eq(4).text()}</td>
    <td>
      <button onclick="chgtxt(this)">儲存</button>
    </td>
  `);
  //像這裡就直接指定 onclick，否則你必須要在宣告一次 click
  //HTML 的 onclick 不像 js event 事件能自身帶 this，所以要塞入 this 才能傳遞
}
```
6. 當使用者按下儲存時，我們需要提交 Ajax 出去給後端做 SQL 更新。
7. 這裡因為資料為多筆，所以需要以物件型態傳遞。但能支援 serialize() 打包函式。
 - serialize() 能幫你把多筆資料做成 GET 參數
 - 你可以試著 consol.log(data) 理解透過 serialize() 會得到什麼
 - 雖然是 URL 參數 (GET)，但 jQuery's Ajax 會聰明的幫你轉成物件參數
8. 接著透過 Ajax 成功的將資料交由後端處理，此時你應該等到回傳後確定更新成功才適合作畫面更新
9. 由於還有更新時間，我們希望後端能告訴我們 cdate 值
10. 畫面更新時，重新將目前 input.val 變回新值 text 並重新翻新 DOM 與 click 事件綁定
```javascript
/*update after DOM transform*/
function chgtxt(who) {
  const data = $(who).parents("tr").find("input").serialize();
  $.post("api.php?do=update", data, function (cdate) {
    let item = $(who).parent().siblings();
    const
      id = item.eq(0).text(),
      name = item.eq(1).children().val(),
      weight = item.eq(2).children().val(),
      info = item.eq(3).children().val();

    item.parent().html(`
      <td>${id}</td>
      <td>${name}</td>
      <td>${weight}</td>
      <td>${info}</td>
      <td>${cdate}</td>
      <td>
        <button class="mdy">修改</button>
        <button onclick="del(this)">刪除</button>
      </td>
    `);
    $(".mdy").click(chginput);//這裡新的 HTML 已經跟前面出現過的脫節，所以還要重新再綁一次
  });
}
```
11. 此時整個畫面操作試試，你已經能正常更新內容，即使畫面重整也不會出問題。

## DELETE 篇：Ajax 資料處理
這裡再多練習一次資料處理，透過 Ajax 我們可以完成委託後端來協助 SQL 資料移除。

1. 規劃刪除按鈕動作能導向到 del(this)，這裡直接使用 HTML 的 onclick 來處理省事。
2. 透過 this 位置，我們要找到同排第一個欄位內容 id。
3. data 部分使用 JSON，可以塞變數 `{Variables}`或 `{name:value}`，單一個資料傳遞不能直接使用變數。
4. 如果刪除成功後端會提供內容給前端，如果偵測到有內容回傳代表刪除成功，DOM 直接 remove() 就好

```javascript
    /*delete*/
    function del(who) {
      let id = $(who).parent().siblings().eq(0).text();
      // $.post("api.php?do=delete",{"id":id},function(result){ //DATA=JSON
      $.post("api.php?do=delete", { id }, function (result) {
        if (result) $(who).parent().parent().remove(); //有回傳才做事
      });
    }
```

## INSERT 篇：Ajax 資料提交
新增方式跟修改大同小異，主要差別於前端你該用怎樣的畫面呈現資料輸入。我們需要設計一個上層覆蓋的區域進行簡易欄位。

1. 提供新增表單的 HTML 代碼位置，找到任一處新增 div 並設定相關 CSS 屬性。先指定不顯示，之後透過 jQuery FadeIn 呈現
```html
<style>
  .insertzone {
    position: fixed;
    background: #333333AA;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 50%;
    color: white;
    font-weight: bolder;
    text-align: center;
  }
  .insertzone>form {
    width: 100%;
  }
</style>
<div class="insertzone" style="display: none;">
  <!-- 
    這裡不先寫好 HTML 是因為我們網頁不會重整，因此第二次進行新增時 HTML 子元素需要清掉
    因此直接由 JavaScript 來設計較適宜
  -->
</div>
```
2. 透過新增大按鈕觸發函式 `activeForm`，這裡會生成 HTML 進行淡入。
3. 如果使用者想取消，我們需要幫助淡出，但 form 可以不用特別清除，下次淡入前都會覆蓋該 HTML
```javascript
/*insert*/
function activeForm() {
  $(".insertzone").html(`
    <form action="">
    <h1>新增動物資料</h1>
    <hr>
    <p>動物：<input type="text" name="name"></p>
    <p>重量：<input type="text" name="weight"></p>
    <p>簡介：<input type="text" name="info"></p>
    <hr>
    <p>
      <!-- 注意 button 沒有 type 會形同 submit -->
      <button type="button" onclick="sendForm(this)">新增</button>
      <button type="button" onclick="closeAddform()">取消</button>
    </p>
  </form>
  `);
  $(".insertzone").fadeIn();
}
function closeAddform() {
  $(".insertzone").fadeOut();
}
```
4. 當使用者送出時，因為我們使用 Ajax 進行提交。所以能不使用 form 的 submit 功能（甚至你可以不用 form 了），使用 DOM 進行資料收集再改由 Ajax 發送。
5. 然而有使用分流加載的關係，所以這裡乾脆重新撈取資料。否則考量的狀況會分為目前是否再最後的加載而是否調整 DOM，需要更多機制去判斷。
```javascript
function sendForm(who) {
  const data = $(who).parents("form").find("input").serialize();
  $.post("api.php?do=insert", data, function (result) {
    //由於是分流載入而考慮情況較多。最快就是歸零重新載入初始 select
    $("tbody").empty();
    start = 0;
    loading();
    $(".insertzone").fadeOut();
  });
}
```

到目前為止你能清楚知道，Ajax 主要是取代了傳統表單遞交（需重新加載畫面）的處理。將一切資料再背後偷偷額外遞交執行，前端只需 DOM 重新變化調整就好，不需要重新加載網頁。好處是能讓網頁靈活且將效能歸入給使用者環境，也能減少伺服器負擔（只需處理局部資料做傳遞，省下 request 全 HTML 的流量與效能）。

{% note default %}
**以上完整代碼：** [view page code](https://gist.github.com/summer10920/94a9b3385ed7940b88ccc44e3b36a11e)
{% endnote %}

---

# 網乙練習
網頁設計乙級會出現經典常見的網站設計範例，這裡額外帶網頁設計乙級解析會用到的 Ajax 資料處理。其中 Q3T8 跟 Q4T5 雷同，我們僅練習一項即可。由於牽扯到資料庫存取，這裡需要額外建立練習用資料表。

## 題組三：T8 下拉選單對應
主要是針對有相對應的三組下拉選單，分別是電影場次->日期->時間 （含剩餘座位）。這裡練習項目稍作修改，不考慮電影上下檔日期情況下做以下微調

1. 開放日期選擇（含今日）之一周預約，以及場次時間
2. 場次開放 10~22，2 小時一場共 7 場，超過販售時間則不顯示

### 後端處理
如果你本身已會 PHP 技能可自行參考本事前準備之相關環境，否則請於上課時採用老師的後端環境（由老師提供後端環境）。原需要由後端程式去跟資料庫進行資料撈取行為，這裡簡化為已經取得並持有相關陣列數據，將不再示範如何連接資料庫。大致上 PHP 之初始資料陣列資料如下：

**電影名稱與 ID**

| id  | title      |
| --- | ---------- |
| 1   | 電影名稱 A |
| 2   | 電影名稱 B |
| 3   | 電影名稱 C |

**電影上映日狀況**

| id  | movie | date       |
| --- | ----- | ---------- |
| 1   | 1     | 2020-05-05 |
| 2   | 1     | 2020-05-06 |
| 3   | 2     | 2020-05-06 |
| 4   | 2     | 2020-05-07 |
| 5   | 3     | 2020-05-07 |
| 6   | 3     | 2020-05-08 |

**電影銷售狀況**

| id  | movieDay | time | sellout |
| --- | -------- | ---- | ------- |
| 1   | 1        | 2    | 2       |
| 2   | 1        | 2    | 2       |
| 3   | 1        | 3    | 2       |
| 4   | 1        | 4    | 2       |
| 5   | 2        | 1    | 2       |
| 6   | 2        | 3    | 2       |
| 7   | 2        | 3    | 2       |
| 8   | 3        | 1    | 2       |
| 9   | 3        | 2    | 2       |
| 10  | 3        | 3    | 2       |
| 11  | 4        | 1    | 2       |
| 12  | 4        | 2    | 2       |
| 13  | 4        | 3    | 2       |
| 14  | 5        | 1    | 2       |
| 15  | 5        | 2    | 2       |
| 16  | 5        | 3    | 2       |
| 17  | 6        | 1    | 2       |
| 18  | 6        | 2    | 2       |

而後端能提供三種請求方式：
- 根據 `?do=getmovie` 提供電影名稱與索引 ID 之數據，為 JSON 字串
- 根據 `?do=getdate&id=` 提供指定電影 id 之電影名稱上映日之數據，為 JSON 字串
- 根據 `?do=gettime&id=` 提供指定電影放送日 id 之場次之數據，為 JSON 字串

後端代碼如下：
```php api.php
<?php
$movieName = array(
  array("id" => 1, "movie" => "電影名稱 A"),
  array("id" => 2, "movie" => "電影名稱 B"),
  array("id" => 3, "movie" => "電影名稱 C"),
);
$movieDay = array(
  array("id" => 1, "movieName" => 1, "date" => "2020-05-05"),
  array("id" => 2, "movieName" => 1, "date" => "2020-05-06"),
  array("id" => 3, "movieName" => 2, "date" => "2020-05-06"),
  array("id" => 4, "movieName" => 2, "date" => "2020-05-07"),
  array("id" => 5, "movieName" => 3, "date" => "2020-05-07"),
  array("id" => 6, "movieName" => 3, "date" => "2020-05-08")
);
$movieOrder = array(
  array("id" => 1, "movieDay" => 1, "time" => 2, "sellout" => 2),
  array("id" => 2, "movieDay" => 1, "time" => 2, "sellout" => 2),
  array("id" => 3, "movieDay" => 1, "time" => 3, "sellout" => 2),
  array("id" => 4, "movieDay" => 1, "time" => 4, "sellout" => 2),
  array("id" => 5, "movieDay" => 2, "time" => 1, "sellout" => 2),
  array("id" => 6, "movieDay" => 2, "time" => 3, "sellout" => 2),
  array("id" => 7, "movieDay" => 2, "time" => 3, "sellout" => 2),
  array("id" => 8, "movieDay" => 3, "time" => 1, "sellout" => 2),
  array("id" => 9, "movieDay" => 3, "time" => 2, "sellout" => 2),
  array("id" => 10, "movieDay" => 3, "time" => 3, "sellout" => 2),
  array("id" => 11, "movieDay" => 4, "time" => 1, "sellout" => 2),
  array("id" => 12, "movieDay" => 4, "time" => 2, "sellout" => 2),
  array("id" => 13, "movieDay" => 4, "time" => 3, "sellout" => 2),
  array("id" => 14, "movieDay" => 5, "time" => 1, "sellout" => 2),
  array("id" => 15, "movieDay" => 5, "time" => 2, "sellout" => 2),
  array("id" => 16, "movieDay" => 5, "time" => 3, "sellout" => 2),
  array("id" => 17, "movieDay" => 6, "time" => 1, "sellout" => 2),
  array("id" => 18, "movieDay" => 6, "time" => 2, "sellout" => 2),
);

switch ($_GET['do']) {
  case 'getmovie':
    //這裡將提供 JSON 給前端，由前端來處理 DOM (JSON_UNESCAPED_UNICODE 能確保中文，非必要因 HTML 能正常顯示 unicode)
    echo json_encode($movieName, JSON_UNESCAPED_UNICODE);
    break;

  case 'getdate':
    $result = array();
    foreach ($movieDay as $row) if ($row['movieName'] == $_GET['id']) array_push($result, $row);
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
    break;

  case 'gettime':
    $result = array();
    foreach ($movieOrder as $row) if ($row['movieDay'] == $_GET['id']) array_push($result, $row);
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
    break;
}
```

### 前端設計
1. 先建立好版型，畫面提供三組 select 下拉選單
2. 設定電影與日期當 value 變化 (onchange) 時能執行指定函式，這樣每次用戶更改欄位都能觸發次選單的翻新。
```html q3t8.html
<form>
  電影：<select name="mm" id="sm" onchange="gd()"></select>
  日期：<select name="dd" id="sd" onchange="gt()"></select>
  場次：<select name="tt" id="st"></select>
  <input type="submit" value="確定">
</form>
```
3. 除了電影，其他選單先不提供 option，強迫用戶先選電影再做其他指定。
4. 電影資料來自後端提供，由於資料未處理，需於 JavaScript 進行 DOM 修改
```javascript
/* 資料初始化 */

// $.getJSON("api.php?do=getmovie",function(result){
//   console.log(typeof(result));
// });

$.get("api.php", { "do": "getmovie" }, function (result) {
  console.log(typeof (result)); //$.get 拿到的是字串而不是物件，所以還要轉檔一下，或者使用$.getJSON 方式取得
  result = JSON.parse(result);

  let content = "";
  for (const row of result) {
    content += `<option value="${row["id"]}">${row["movie"]}</option>`;
  }
  $("#sm").html(content);

  gd();//確保第一次自動 DOM 生成時，也能提供日期 option
});
```
5. 當電影變化時或觸發此函式時，能提供日期 option 項目。
6. 資料需要自行整理成 HTML 進行 DOM 修改。
```javascript
/*根據目前所選之電影，進行可販售日期*/
function gd() {
  let mv = $("#sm").val();
  $.get("api.php", { "do": "getdate", "id": mv }, function (result) {
    result = JSON.parse(result);

    let content = "";
    for (const row of result) content += `<option value="${row["id"]}">${row["date"]}</option>`;
    $("#sd").html(content);

    gt();
  });
}
```
7. 同樣觸發 gt 函式，向後端請求指定電影放送日之銷售狀況。
8. 資料為銷售狀況，由前端進行判斷處理計算出所有時段之已售數量為何。
9.  先設計一個資料陣列 time 做資料紀錄且初始化。後端指定的 1 \~ 7 場次，在前端代表 0 \~ 6 需特別注意。
10. 透過迴圈檢查訂單，將找到的各時段賣票數累加回我們紀錄。
11. 此外，不合理的時間場次需要忽略顯示，如果播放日為今天且時間場次已過期都要忽略顯示。
```javascript
/*根據目前所選之電影與販售日期，進行票數之計算*/
function gt() {
  let dv = $("#sd").val();
  $.get("api.php", { "do": "gettime", "id": dv }, function (result) {
    result = JSON.parse(result);

    /*由於後端給的資料為結果之全數據，所以我們要自己計算各場次之剩餘座位*/

    //各時段的總銷售數初始化 
    let time = [
      { txt: "10:00~12:00", ticketlast: 20 },
      { txt: "12:00~14:00", ticketlast: 20 },
      { txt: "14:00~16:00", ticketlast: 20 },
      { txt: "16:00~18:00", ticketlast: 20 },
      { txt: "18:00~20:00", ticketlast: 20 },
      { txt: "20:00~22:00", ticketlast: 20 },
      { txt: "22:00~24:00", ticketlast: 20 }
    ];

    for (const row of result) {
      time[row['time'] - 1].ticketlast -= row['sellout'];
    }

    let content = "";
    let count = 0;
    let nowTime = new Date();

    //10=>1, 11=>1, 12=>2, 13=>2, 14=>3, ~~> x=>y | y = (x/2) 無條件捨去 - 4
    let TimetoNun = Math.floor(nowTime.getHours() / 2) - 4;

    let selectDayA = new Date($("#sd option:selected").text()).toDateString();
    //toDateString() => Thu May 07 2020

    for (const row of time) {
      count++;
      if (count <= TimetoNun && selectDay == nowTime.toDateString()) continue;

      // like <option value="2">12:00~14:00 剩餘座位 5 </option>
      content += `<option value="${count}">${row.txt} 剩餘座位 ${row.ticketlast} </option>`;
    }
    $("#st").html(content);
  });
}
```
12. 完成後，請嘗試於前端點選今日場次結果，且調整幾筆持有今日的放映日測試。
13. 你可以規劃更完善，譬如直接按下送出（未選擇電影），要如何判斷無效輸入並取消表單。

## 題組四：T7 註冊帳號驗證
每次進行帳號註冊前，先透過 Ajax 進行現有帳號之檢查。如果可用此帳號則允許表單提交。

### 後端規劃
1. 需要先建立一些資料，方便我們練習時進行資料庫比對
2. 主要是提供前端做檢查是否帳號存在，並提供適合的畫面回應

| id  | acc   | pwd  |
| --- | ----- | ---- |
| 1   | admin | 1234 |
| 2   | loki  | 4321 |

```php api.php(php)
/*q4t7 start*/
$account=array(
  array("id" => 1, "acc" => "admin", "pwd" => "1234"),
  array("id" => 2, "acc" => "loki", "pwd" => "4321")
);
switch ($_GET['do']) {
  case 'checkuser':
    $flag = false;
    foreach ($account as $row) if ($row['acc'] == $_POST['acc']) {
      $flag = true;
      break;
    }
    if ($flag) echo "帳號重複";
    else echo "可使用此帳號";
    break;
}
```
### 前端設計

1. 版型規劃，新增 q4t7.html
2. 表單做 onsubmit 進行表單提交時執行函式，如果遇到 return false 會取消提交。
3. 帳號檢查按鈕，進行 Ajax 的驗證。
4. 另外針對 acc 欄位做 onchange 功能，設計一個 flag 做審核機關。
5. 只有 flag 變為 1 才允許表單通過，否則請做帳號驗證（避免偷渡）
```html
<h3>註冊帳號</h3>
<form method="get" onsubmit="return checkflag()">
  姓名：<input type="text" name="name" id=""><br>
  帳號：<input type="text" name="acc" onchange="flag=0"><input type="button" value="檢測帳號" onclick="check()"><br>
  密碼：<input type="text" name="pwd" id=""><br>
  <input type="submit" value="確認">
</form>
```
6. check 負責提交後端做帳號判斷，如果帳號可使用，將 flag 設為 1
7. checkflag 是負責表單提交的審查，如果 flag 是 0 則不允許提交
```javascript
var flag = 0; //0=未檢測，1=已檢測
function check() {
  let acc = $("input[name=acc]").val();
  $.post("api.php?do=checkuser", { acc }, function (re) {
    alert(re);
    flag = (re == "可使用此帳號") ? 1 : 0;
  });
}

function checkflag() {
  if (!flag) {
    alert("請先驗證帳號");
    return false;
  }
}
```

{% note default %}
**以上兩題之完整代碼：** [view full code](https://gist.github.com/summer10920/e70cd0ce7380fc9f89a92059feb8b46a)
{% endnote %}

# 總結

Ajax 屬於 JavaScript 的原領域內，能允許外部位置載入網頁（本課程不做介紹練習）。而 JQuery 的 Ajax 功能更完善便利，能快速適用任何動態資料進行 API 串接。同時透過本篇概念你能清楚知道 Ajax 能輕易串接到伺服器後端請求取得，同理來說 OpenData 也是相同的串接做法。