---
title: "[基礎課程] PHP 基礎觀念與環境建置"
categories:
  - Archived Courses
  - PHP/MySQL
tag:
  - 前端網頁開發技術（職前班）
  - PHP 程式設計（假日班）
date: 2020-05-08 19:06:35
---

![](assets/images/banner/php.png)

PHP 唯一種伺服器端的網頁程式，在網頁架設的角色扮演當中可以稱呼為後端的伺服器程式處理。透過網頁伺服器每次的用戶下載請求，由伺服器進行程式編譯進行一次性網頁檔案生成上傳，到客戶端已經是運算生成完畢的畫面資料。安全性而言能避免使用者對網頁做破壞性文件修改，許多重要的資訊處理都由後端完成。

本系列將從零開始的基礎學習，同時搭載一些基礎的程式邏輯，也會使用 MySQL 進行資料管理的學習過程。

<!-- more -->

# 開始安裝你的網路測試環境
由於 PHP 為伺服器程式語言，因此我們需要使用 XAMPP 架站工具包，這能幫助模擬一台支援 PHP 的 Web Server  ，另外還有編寫 Coding 工作的程式編輯器 Microsoft Visual Code。請自行研究下載架設環境需求。

## XAMPP
快速架站包，內容包含 Apache(PHP+HTTP Server)、MySQL(MariaDB)、FileZilla(FTP Server)
- XAMPP 下載
  - **安裝版** | xampp-win64-x.x.xx-x-VCxx-installer.exe：如果你要將 XAMPP 安裝至電腦，可以下載此版本並包含一些附屬程式，例如你要架設 FileZilla(FTP Server)、Mercury(Mail Server)... 等等。
  - **免安裝** | xampp-win64-x.x.xx-x-VCxx.zip：此免安裝版本保留了安裝版本該有的工具。
  - **免安裝** | xampp-portable-win64-x.x.xx-x-VCxx.zip：此免安裝版本為瘦身版，因為此版本移除，如：FileZilla 與 Mercury 等等的工具，所以 XAMPP 檔案體積也比較小。（推）
- 解壓縮必須在隨身碟的根目錄，否則所有的參數都要調整檔案路徑。

## 文字編輯器 
主要是針對程式碼直接撰寫，市面上選擇很多，目前 VS Code 的使用比例最高，套件資源豐富。
- VS Code 下載網址 https://code.visualstudio.com/
- 常用外掛套件
    - Auto Close Tag
    - Auto Rename Tag
    - Bracket Pair Colorizer
    - Highlight Matching Tag
    - indent-rainbow
    - Path Intellisense
    - PHP Intelephense
    - PHP IntelliSense
    - Prettier - Code formatter

- 環境設定 [齒輪]->[設定]
	- Auto Save 自動儲存：afterDelay
	- Tab Size 空格數 2
	- setting.json : 到最後一行添加以下參數編寫填入（注意結尾的逗號）

        ```json
        //for PHP IntelliSense, 讓 vscode 能看懂 php 幫你檢查錯誤或語法建議
        "php.validate.executablePath": "C:/xampp/php/php.exe",
        "php.executablePath": "C:/xampp/php/php.exe",
        "php.suggest.basic": false
        ```

- 可攜免安裝
	- 下載 windows zip 版本
	- 主目錄下建立 data 資料夾 [為主要的個人資料設定。每次打包以此遷移]
	- 將用戶數據目錄複製到`data`並重命名為`user-data`：
    	- `%APPDATA%\Code`
	- 將 extensions 目錄複製到`data`：
    	- `%USERPROFILE%\.vscode\extensions`

## 執行網頁伺服器
開始進行第一個網頁執行，從 HTML 開始到 PHP，並試著印出函式 phpinfo() 做練習
- 建立檔案 welcome.php 嘗試輸入 hello world，執行網頁 localhost 或 127.0.0.1。
```html index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    我是 Loki
</body>
</html>
```
- 在並嘗試輸入 h1, h2, h3, h4, h5, p, br, hr, table, 等常用 HTML 標籤
- 更名為 index.php 測試，效果為預設主頁，建立超連結標籤，表示如何導向連結。更多細節上 W3CSCHOOL 查看

---

# PHP: 基礎語法與變數
請開始在 Web 目錄下新增檔案 **1_FirstPage.php**，從`<body></body>`開始做各種練習並預覽網頁結果。

## HTML 與 PHP 關係
當用戶進行網站的讀取時，載入網頁之前會在伺服器端進行 php 的解讀運算處理，並轉換成指定的編譯後之內容 (HTML) 才送到用戶的遊覽器。所以用戶是看不到 PHP 任何原生代碼。文字組成的 HTML 藉由讓遊覽器進行網頁呈現。<mark>所以 PHP 是在伺服器的後端運算處理，最後將整個結果代碼 (HTML 文件）傳到前端的遊覽器進行解讀</mark>，呈現出用戶所看到的網頁畫面。

要執行 PHP 的網頁必需為 `*.php` 副檔名才會進行上述的分析過程。分析網頁代碼時只有碰到 PHP 宣告區`<?php ?>`，才會對該範圍內做 PHP 解讀處理。練習：試著照打做出一些文字顯示
```php 1_FirstPage.php
<body>
    <h3>HTML 與 PHP 的關係</h3>
    <P>這一行是由 HTML 產生</P>
    <?php
        echo "<p>這 A 行由 PHP 產生，包含 p 標籤</p>";
        echo "這行沒有 p 標籤";
        echo "<p>這 B 行由 PHP 產生，包含 p 標籤</p>";
    ?>
    <?= "<p>這是另一種的 PHP 產生，省略的引出 echo</p>" ?>
    <hr />
</body>
```
目前為止你已經知道 php 的宣告頭尾為`<?php ?>`或是`<?= ?>`，兩者有些不同應用場合。前者通常是一大段的 PHP 代碼要使用時，後者為簡單短暫的使用時。

## 註解方式
程式有註解語法可以讓程式忽略執行。常用於交叉測試（隱藏內容）或是說明提示。要注意在哪個程式內則用對應的註解語法
- php 的註解用法為`/* */`或是`//`兩種
- HTML 的註解用法為`<!-- -->`

練習：將前段練習上註解
```php
<body>
	<h3>HTML 與 PHP 的關係+註解</h3>
	<P>這一行是由 HTML 產生</P>
	<!--
		HTML 的註解
		可以單行或多行
	-->
	<?php
	echo "<p>這 A 行由 PHP 產生，包含 p 標籤</p>";    //echo 為輸出的意思
	echo "<p>這 B 行由 PHP 產生，包含 p 標籤</p>";    //這裡註解只能單行
	/*
		PHP 的註解
		可以單行或多行
		下面這行可以註解隱藏起來不運作
	*/
	// echo "<p>這 C 行由 PHP 產生，包含 p 標籤</p>";
	?>
	<?= "<p>這是另一種的 PHP 產生，省略的 echo 行為</p>" ?>
	<hr />
</body>
```
現在，你應該知道了如何在 php 檔案裡面看懂哪裡部分是 HTML 或是 PHP，以及知道註解能幫助你做提示說明或除錯

{% note success %}
**跟著做：**繼續對同個 **1_FirstPage.php** 練習，可利用`<hr/>`做分隔線
{% endnote %}

## PHP 的輸（印）出方式
程式與人的互動依賴輸入與輸出傳達訊息。在網頁上可以呈現資料稱為輸出。HTML 寫什麼就是輸出什麼。而 PHP 有運算判斷執行能力，只有當遇到輸出動作時才會顯示出來。
- echo: 語句型比較直接，通常後面直接字串或內容，且可以多個組合串接一起輸出。
- print(): 函式型比較正式簡潔，將變數放在 () 內並對該變數印出。但也可以模仿前者故意不用 ()。
- print_r() : 偏向檢查用的輸出，主要為對陣列的細節說明（這裡先不練習）。
- var_dump() : 偏向檢查用的輸出，主要為對變數的細節說明（不特別教，可自行研究試試）。

## 變數=字串＆數字
程式最基本的單位是變數。PHP 的變數都會用 <kbd>$</kbd> 做開頭+自訂名稱，變數名稱有大小寫之分。變數名稱可以是英文字母、數字、底線和十六進位所組成，但是第一個字元不能是以數字開頭。當你命名好一個變數名稱之後，你就可以對該變數塞入任何資料，或嘗試印出這個變數

### 變數為文字串
```php 1_FirstPage.php
<h3>變數的文字串</h3>
<?php
$what = "冷笑話";		//將文字存到變數去，用""標記起來，讓程式知道這是文字不是指令
$title = "<b>" . $what . ":</b> ";		//變數可以跟文字合併再一起，用。來穿接，也能再丟給一個變數
print($title);	//輸出方式 2

$who = "小明";
$where = "超商";
$why = "為什麼";
$when = "繳費";
$how = "坐著輪椅？";

print $why . $who . "去" . $where . $when . "後，" . $who . "出來卻要" . $how;	//輸出方式 3

?>
<hr />
```

### 變數是數學式
```php 1_FirstPage.php
<h3>變數的數字計算與印出</h3>
<?php
/*將數字計算結果到$a 儲存起來，最後把$a 資料印出 */

$a = 7 + 5;		//這裡把+抽換變成-*/試試
$a = 7 - 5;	//2
$a = 7 * 5;	//35
$a = 7 / 5;	//1.4
$a = 13 % 5;	//3, 餘數

echo $a;	//這裡的連續各 5 行計算都是同個變數$a，一直被重新覆蓋新的結果，所以 37 行只會執行最後一行

/*還有很多用法，譬如四捨五入，無條件進位捨去等等，有興趣可以去查*/
?>

<br>

<?php
/**數字型的變數也可以拿來計算 */

$b = 5;
$b = $b + $a;	//變數可以跟變數做數學計算，如果都是數字的話，這裡是 5+3

print($b);	//8
?>

<br>

<?php
/* 變數的自身變化*/
$c = 10;
$c = $c + 5; //對自己做數學，再重新記住自己為新內容，此時值為 15
$c = $c - 5; //此時值為 10, 跟$a 不同的邏輯。$c 一值有被翻新值，$a 則是一值被覆蓋新值
$c = $c * 5; //50
echo $c;

?>

<br>

<?php
/* 
不同的快速技巧與深奧邏輯。這裡需要認真聽課說明，筆記不方便說明
*/

$d = 5;
echo $d + 5; //10
echo ",";

echo $d += 5;	//10
echo ",";

echo $d += 1; //11
echo ",";

echo $d++; //11
echo ",";

echo $d;	//12
echo ",";

echo ++$d; //13
echo "<br>";
?>
<hr />
```

到這裡你應該知道以下技巧 (\$e 為隨便舉例之變數）
- `左邊=右邊`　等式運算處理方式從右到左，也就是右邊會等於左邊且不可逆
- `$e=$e+5;` 等於 `$e+=5;`
- `echo $d=$d+5;` 此時$d 有增加了 5 之變化
- `echo $d+5;` 只是 echo 有增加、$d+5 的結果，但此時、$d 沒有任何變化
- `echo $d."元";` 變數可以跟字串一起印出
- `echo ($d+=5)."元";` 有運算的變數要先 () 讓程式優先執行運算，再合併成文字輸出
- `$e+=1;` 等於 `$e++;` 或 `++$e;` 但依存取時間與執行時間會有不同結果

這裡的變數邏輯順序變化很多，程式初心者比較難以人類語言方式理解吸收，務必站在程式的角度思考邏輯順序，隨著之後慢慢的學習過程上，去加強你的程式邏輯概念。

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/daff1ebc7ae0390501811827cedad0ac)
{% endnote %}