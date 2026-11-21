---
title: "[基礎課程] PHP 條件判斷邏輯"
categories:
  - Archived Courses
  - PHP/MySQL
tag:
  - 前端網頁開發技術（職前班）
  - PHP 程式設計（假日班）
date: 2020-05-11 23:50:51
---

![](assets/images/banner/php.png)

本篇開始透過介紹程式的基礎邏輯去學會相關 PHP 語法指令，請開始在 Web 目錄下新增檔案 **2_ifelse.php**，為了簡化程式碼結構將不再建置 HTML 基本結構。請開始做 PHP 各種練習並預覽網頁結果。
<!-- more -->

為了讓程式變得好玩，我們先介紹一個能夠產生隨機數的內建函式，之後才依序介紹各種神邏輯操作。

---

# Rand 函式
- rand() 是一個可以產生隨機數字的函式，可以透過指定一個數字範圍由系統隨機產生。
- 語法結構為`rand($min,$max)`，放入最小與最大範圍，可透過某變數儲存這個結果。
- 譬如`$num=rand(0,99);`代表$num 這個變數內容可能是 0~99 某個數字。

練習：試著產生 0\~100，沒有小數點
練習：試著產生 0\~10，有小數點位數 1 ex:7.5
練習：試著產生 0\~10，有小數點位數 3 ex:7.543
```php 2_ifelse.php
<?php
$myint = rand(0, 100);
echo "隨機 0~100 的整數 => " . $myint;
echo "<br>";
$myfloat = rand(0, 100) / 10;
echo "隨機 0~10 的浮點數 => " . $myfloat;
$myfloat = rand(0, 10000) / 1000;
echo "隨機 0~10 的浮點數 => " . $myfloat;
?>
```
如果正常無誤，你應該可以正常得到期望的隨機數字結果。

{% note warning %}
**科普知識：什麼是函式**
函式可解讀為 function，想像有個道具當丟一些東西進去時，會回傳處理過的結果。函式會有個 `function's name & ()` ，而 `()` 內可指派單或多個欄位並以 <kbd>,</kbd> 分隔開提供擺放指定對象，指定對象可以是變數或者資料，也可能是一段指令。php 有內建豐富的各種函式，也可以自己開發一個自訂函式。
{% endnote %}

---

# if else 判斷
除了基本變數，還有**條件式描述**也很基本，你可以對程式下達條件做不同對應的結果。if else 為所有程式語言當中最基本的程式邏輯。
- 語法範例為
```php
if（條件 A) {A 指令}	//當這裡條件是對的，執行這裡{}內的指令
else {C 指令}	//當前一個 if 是錯的，執行這裡{}內的指令
```
另外還有多重判斷
```php
if（條件 A) {A 指令}	//當這裡條件是對的，執行這裡{}內的指令
else if（條件 B) {B 指令}	//當前一個 if 是錯的 and 這裡條件是對的，執行這裡{}內的指令
else {C 指令}	//當前一個 if 是錯的，執行這裡{}內的指令
```

- else if 這行可出現 0 次或多次，取決你想要做幾次判斷動作。
- else if 也有人寫 elseif，兩者效果差不多但定義方式不同，請 Google 差別在哪

練習：跟著做學會基本的判斷
```php
<?php
$which=true;	//試著將 true 變成 false,0,1 分別看結果為何
if($which) {
	echo "這世界有好人";
}
else{
	echo "這世界不友善";
}
?>
```

---

# Boolean 布林值
運算邏輯時除了直接告知條件為 true 或 false，也可以透過一些邏輯事件來告知。常見的有比較型與存在型為基本，相反型與多條件型為進階。

## 比較式
- `$a==$b`  :等於
- `$a!=$b`  :不等於
- `$a>$b`  :大於
- `$a>=$b`  :大於且等於
- `$a<$b`  :小於

練習：跟著以下練習學會 rand+if else 的設計
```php
<?php
$rand = rand(0, 100);
if ($rand > 90) {
	echo "出現大於 90 的值=" . $rand;
} else if ($rand > 70) {
	echo "出現介於 70-90 的值=" . $rand;
} else if ($rand > 50) {
	echo "出現介於 50-70 的值=" . $rand;
} else if ($rand > 30) {
	echo "出現介於 30-50 的值=" . $rand;
} else {
	echo "小於 30 的值=" . $rand;
}
?>
```

**自我練習**
參考前例，使用 rand() 跟 if else 完成抽卡機率，顯示輸出文字"你抽到了 SSR 卡"、"你抽到了 SR 卡"、"你抽到了 R 卡"、"你抽到了 N 卡"，出現機率分別為 4%,10%,35%,51%

```php
<?php
$rand=rand(1,100);
if($rand<5) $card="SSR";
elseif ($rand<15) $card="SR";
elseif ($rand<50) $card="R";
else $card="N";
echo "你抽到了".$card."卡";
// echo "（隨機號碼為".$rand.")";
?>
```

## 存在式
簡單來說，isset() 檢查的是變數是否存不存在，而 empty() 檢查的是變數內的「值」是否為空。is_null() 有些人會少用，原因在改用比較式（變數==null) 同效果於此函式。

- `isset()`  :檢查變數是否有設置
- `empty()`  :檢查變數是否為空值
- `is_null()`  :檢查變數是否為 null


{% note warning %}
**科普知識：**[官方說明文件三者差異結果](https://php.net/manual/en/types.comparisons.php)
{% endnote %}

練習：跟著以下動作
```php
<?php
$a=123;
$b="";
$c=null;
if(isset($a)) echo "<p>當、$a=被指定了（狀態是 is set) => isset 成立</p>";
if(empty($b)) echo "<p>當、$b=空的字串 => empty 成立</p>";
if(is_null($c)) echo "<p>當、$c 為無 => is_null 成立</p>";
// 可以對這三行隨意更改$a.$b.$c 理解差異性
?>
```
練習：加強觀念
```php
<?php
$num=123;
$txt="456";
$untxt="";
$null=null;
$tryThis=$null; //試著抽換為$num,$txt,$untxt,$null,$abcd

if(isset($tryThis)) {
  echo "<p>".$tryThis." is set, the type is ";
  var_dump($tryThis);
  echo "</p>";
}
if(empty($tryThis)) {
  echo "<p>".$tryThis." is empty, the type is ";
  var_dump($tryThis);
  echo "</p>";
}
if(is_null($tryThis)){
  echo "<p>".$tryThis." is null, the dump is ";
  var_dump($tryThis);
  echo "</p>";
} 
?>
```

## 相反式
相反式是前兩者的顛倒法。將 True 跟 False 做顛倒黑白。使用！前綴並將內容 () 起來譬如。試著想想以下的真為假，假為真。
- `!($a==$b)`
- `!($a>$b)`
- `!($a>=$b)`
- `!($a<$b)`
- `!(empty($c))`
- `!(isset($c))`

通常是邏輯需要顛倒使用。就像中文舉例來說 <mark>我不認同你所說的話是正確的</mark> 之描述法。

## 多條件式
當條件有多筆需要判斷時，你可以組合前面所有的條件最後一起判斷這條件的真假成立。常見如下：

- （條件 A)**&&**（條件 B)：為 AND 所有條件，**所有條件皆為 true 時成立**。
- （條件 A)**||**（條件 B)：為 OR 任一條件，**任一條件為 true 時成立**。

練習：
```php
<?php
$height = 50;
$money = 100;
$face = 0; //1=true, 0=false

if (($height > 170) && ($money > 10000000) && ($face)) {
	echo "<p>100 分</p>";
} else {
	echo "<p>0~99 分</p>";
}
if (($height > 170) || ($money > 10000000) || ($face)) {
	echo " <p>60~99 分</p>";
} else echo "<p>0~60 分</p>";
?>
```

---

# 三元運算子
是一種 if else 的比較簡潔有力的一行表示法。你可以一次很快的表示出來。但無法做多層次的表達。語法為`（條件）? 成立時執行：否定時執行；`

練習：
```php
<?php
$game = rand(1, 100);
$ans = ($game > 50) ? "大" : "小";
echo "骰子為" . $game . " 判定為" . $ans;
?>
```

---

# switch case 路由判斷
跟 if else 觀念很像但不一樣的是，比較整潔清楚好閱讀。也是一行行的往下執行判斷。語法為：
```php
switch ($variable) {
	case 'value':
		# code...
		break;
	
	default:
		# code...
		break;
}
```
當$variable 變數的內容等於 case 內的 value 時。會執行該#code。如果遇到 break 會結束 switch 行為，否則會繼續往下一行 code 執行檢查。只有當 case 條件都不成立時則前往 default 執行該#code。

練習：
```php
<?php
$lang = "tw"; //試著抽換其他國家代碼
switch ($lang) {
	case "jp":
		echo "愛洗爹路唷";
		break;
	case "kr":
		echo "沙拉黑唷";
		break;
	case "tw":
		echo "我好喜歡你唷";
		break;
	default:
		echo "sorry, 你的語言我不會";
		break;
}
?>
```
**自我練習:**
請改成 if else 版本再做一次
```php
<?php
$lang= "kr";
if($lang=="jp") echo "愛洗爹路唷";
elseif ($lang=="kr") echo "沙拉黑唷";
elseif ($lang=="tw") echo "我好喜歡你唷";
else echo "sorry, 你的語言我不會";
?>
```
以上這兩種都能使用，但在不同的狀況會有優劣。
- 在編寫行數優點來說 if>switch，以閱讀性優點來說 switch>if
- ifelse 可以模擬出 switch，但反過來卻不行，由於 switch 只限定於判斷等於的處理。

---

# 總結

1. 本篇重點在邏輯判斷處理，除了 if else 還有 switch case 這兩種，不同的環境有不同考量。
2. 可以明白如果執行範圍多行可以 `{}` 包起來，如果只有一行有時候可以省略 `{}`
3. `()` 可以是為優先權高執行，也就是條件太多就包起來個別優先執行
4. 程式世界都是依賴 True/False 做思考，由布林值結果塞入邏輯描述，條件結果得出真真假假

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/0e6bf4b48a4cd4ea434c57fcc6ba0498)
{% endnote %}