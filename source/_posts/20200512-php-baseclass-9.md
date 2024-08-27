---
title: "[基礎課程] PHP FILES 檔案上傳"
categories:
  - 職訓教材
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-12 16:10:42
---
![](assets/images/96NYgou.png)

之前的表單處理都只是純數據化處理，如果你要對提供表單做檔案上傳，會發現無法直接用 GET 做承接。請開始在 Web 目錄下新增檔案 **4_file.php**，為了簡化程式碼結構將不建置 HTML 基本結構，請開始做 PHP 各種練習並預覽網頁結果。

<!-- more -->

# 檔案上傳處理
檔案包含很多資訊不單單只有字串，因此必須使用 POST 且同時需要使用 enctype 來做宣告。

練習：跟著以下作業
```php
<?php
print_r($_POST);
print_r($_FILES);//或使用 var_dump
?>
<form method="post" enctype="multipart/form-data">
<input type="file" name="mypic">
<input type="submit" value="上傳">
</form>
```

此時只要遇到 input.file 的檔案資料，會額外使用 `$_FILES` 來承接，不會列入 `$_POST` 內。你可以上傳之後透過 print_r() 或 var_dump() 去理解上傳圖片這件事情被誰接受處理了。`$_FILES` 會將你的檔案列入依 name 的命名寫到陣列，主要提供以下四組數據：
```php
echo $_FILES["mypic"]["name"]."<br/>";	//原檔案名稱
echo $_FILES["mypic"]["tmp_name"]."<br/>";//暫存路徑
echo $_FILES["mypic"]["size"]."<br/>";//檔案 byte, max 2mb，除非要改 php 上傳限制
echo $_FILES["mypic"]["type"]."<br/>";//檔案類型
```

接著試著透過 PHP 進行檔案複製，利用　`copy(form,to)`　函數，from 填寫暫存路徑，to 填寫你的網站空間。這裡需要確認號你的檔案名，你可以沿用舊的黨名。

**將檔案儲存到伺服器位置的方式為**
```php
 copy($_FILES\["mypic"\]\["tmp_name"\],"upload/".$_FILES\["mypic"\]\["name"\]); // copy(from,to)
```

**或者你另外用時間來命名新名稱**
```php
//上傳的檔名也可以更改掉，這裡用時間來當名字的前述
$newname=date("YmdHis")."_".$_FILES["mypic"]["name"];
copy($_FILES["mypic"]["tmp_name"],"upload/".$newname); // copy(from,to)
```

**如果要刪除檔案可以用 unlink（路徑對象）函數**
```php
unlink("upload/".$newname);
```

# 練習與作業：（需繳交）homework vCard 產生器
1. 建立資料夾為 PHP_vCard, 內含 `index.php`（表單）,`api.php`（驗證處理）,`preview.php`（預覽資訊）, 以及多個版型檔案`layout.css×N`
2. 設計`index.php`畫面為表單網頁，表單欄位可輸入
   - 姓名
   - 職稱
   - 聯絡電話
   - 電子信箱
   - 技能簡介
   - 人像照片
   - 下拉選單選擇版型
   - 按鈕有 [預覽]，能提交 form 資料到 api.php
3. 設計`api.php`，能將 form 表單的資料包含圖片路徑（記得存入空間）一起轉成 SESSION 或 COOKIE，接著導向到 preview.php。導向連結用`header('location:preview.php');`
4. 設計`preview.php`，主要是能自動依版型 (link 到 layout.css) 跟 session 資訊（或 cookie) 整合到 HTML，成為完整的 vCard 畫面。另外提供返回按鈕，設計為`<button onclick="window.history.go(-1)">回頁面</button>`
5. 發揮所學去規劃 HTML+CSS，或者去偷老師的 [示範網站](https://phpdemo.lokiwebs.com/ch6_hw/)。

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/d271a5797f3091a75f933f0d88ec6424)
{% endnote %}