---
title: "[基礎課程] PHP 常用函式與自訂函式"
categories:
  - 職訓教材
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-12 14:30:42
---
![](https://i.imgur.com/96NYgou.png)

php 本身的函數非常多，譬如之前所用的`rand()`就是其中一種。同時常有重複的函數功能，譬如`mt_rand()`跟`rand()`。你不需要特別去背函式庫，只需要用到時就去查，慢慢常用的就會記住。請開始在 Web 目錄下新增檔案 **2_array.php**，為了簡化程式碼結構將不建置 HTML 基本結構。請開始做 PHP 各種練習並預覽網頁結果。

<!-- more -->

---

# 常用的函數（式）

## phpinfo()
可以拿來查看 PHP 環境檢查上的確認。也是屬於比較私密的資料，不要放上網址讓知道你伺服器環境的弱點而被攻擊。
```php
<?php
phpinfo();
?>
```

## rand(min,max)
會產生 min~max 之間的隨機整數，這裡不帶範例。

## array()
可以用 array() 函式快速建立一個陣列組合，多值用<kbd>,</kbd>分開。記得要用變數儲存。你也可以指定 '索引'=>'內容'
```php
//array() 可以快速指定完整的陣列，記得用變數儲存
$ary1=array("加菲貓","凱蒂貓","湯姆貓");
$ary2=array(5=>"加菲貓","jp"=>"凱蒂貓","湯姆貓");
print_r($ary2);
print("<hr>");

/*
array 相關的函數很多，這裡不一一列舉，你可以參考這裡：
http://www.w3school.com.cn/php/php_ref_array.asp
如果有用到再個別介紹
*/
```

## unset()
殺掉變數，可以殺掉一個完整變數，或是殺掉陣列內的某一格或整個陣列變數。你可以拿來跟指定 `變數=null` 做差異比較。
```php
//unset() 可以殺掉變數
$var = 'hello world';
unset($var);
var_dump($var);
print("<hr>");

unset($ary2[5]); //根據前例子，殺掉加菲貓
var_dump($ary2); 

//相對於變數等於 null 時，則是變數沒有內容，但變數存在
$var = 'hello world';
$var=null;
var_dump($var);
print("<hr>");
```

## date(format)
產生系統時間（以 php.ini 宣告的時區為主，預設 GMT+0)，format 要填寫指定所需格式。參考網址 [link>>時間格式](https://www.php.net/manual/en/function.date.php)
```php
/*系統時間與日期*/
$now=date("Y-m-d H:i:s");	
echo "現在系統時間為 ".$now."<br>";
```

如果此時要事後調整時區，比較直覺的作法是將時間往後推。透過 hour+7 的寫法。
```php
/*系統時間與日期*/
$now=date("Y-m-d H:i:s");	
echo "現在系統時間為 ".$now."<br>";

//date() 可以根據想要的 format（前面）去顯示，同時也能做增加減少（後面）但必須先把文字轉成時間語
$timelang=strtotime("+6 hours"); //你可以試著 echo 這裡會得到一堆數字
$tw=date("Y-m-d H:i:s",$timelang);	//台灣時間
echo "現在台灣時間為 ".$tw."<br>";
```
strtotime() 能將字串指令變成時間代碼。提供時間與時間的數學加減計算。

## date_default_timezone_set()
直接告知網頁是以時區以哪個為主，這屬於比較正式的時區宣告。不是透過上面比較治標不治本的方法用調數字去補足。

```php
date_default_timezone_set('Asia/Taipei');
echo "現在系統時間為 ".date("Y-m-d H:i:s");	//台灣時間
```

## ceil() && floor() && round()
無條件進位 && 無條件捨去 && 四捨五入，用在計算時使用
```php
echo "10÷3=??<br>";
echo "ceil: ".ceil(10/3)."<br>";
echo "floor: ".floor(10/3)."<br>";
echo "round: ".round(10/3)."<br>";
```

## substr() && mb_substr()
擷取字串，能將一個文字串做擷取某部分出來。後者是針對中文的支援。
```php
// substr 擷取字串
echo substr("abcdefg",2,3)."<br>";
echo mb_substr("不要打架要打去練舞室打",4,6);
```

## str_replace()
抽取某字串進行字串替換，不特別帶練習

## addslashes()
自動增加反斜線在特殊符號'"/之前綴，不特別帶練習

## md5()
md5 加密，可以單向字串加密但無法反向解密，通常是對帳密認證之類做存取後兩者比對。

## chr()
查詢 ASCII 碼的字串值。通常用在程式連續產字的時候方便性。

```php
//chr 轉為 ascii code=> 0-9, a-z,A-Z = 48-57, 97-122, 65-90
echo chr(97); //a
```

練習：產生一組隨機密碼，由 0-9, a-z,A-Z 組成，密碼長度 8~12
提示：你會需要用到 rand,for,ifelse,chr

解答：
```php
$num=rand(8,16);
for($i=0;$i<$num;$i++){
	$word=rand(0,61);
	if($word>35)		echo chr($word+29);
	elseif($word>10)	echo chr($word+87);
	else 				echo $word;
}
```

---

# 自訂的函式
你可以自訂一個函式，透過丟入返回完成任務達到獨立事件處理。

練習：跟著做，說話小程式
```php
/*custom function*/
function say($who,$num){ 
	echo $ai_say="hello ".$who."! ";
	if($num>60) return "You are Great";
}
$name="Mark";
echo $msg=say($name,30);
// echo $ai_say; //error_sample
```

透過這個小範例有不少地方要注意：
1. 可以傳入變數，讓函式方便接著處理。
2. function 的世界是獨立的，只能透過 () 或 return 傳遞資料，除了特別能力的變數。
3. 程式由右到左，所以你要能理解 echo 的執行觸發順序。
4. return 可以不寫，如果你不需要回傳。
5. 有 return 情況下，外面程式也可以不理會。

自我練習：拿前面的密碼產生練習。
主程式提供彈性的數量值給副程式。由副程式產生對應數量的密碼給主。然後主程式把資料顯示出來。

解答：
```php
function pwd($many)
{
	for ($run = 1; $run <= $many; $run++) {
		$num = rand(8, 16);
		$code = "";
		for ($i = 0; $i < $num; $i++) {
			$word = rand(0, 61);
			if ($word > 35)	$code .= chr($word + 29);
			elseif ($word > 10)	$code .= chr($word + 87);
			else $code .= $word;
		}
		$ary[] = $code;
	}
	return $ary;
}

$num = 5;
$result = pwd($num);
foreach ($result as $msg) {
	echo $msg . "<br>";
}
?>
```

# 回家作業 1
隨機 1~100 顆星星填滿你的畫面，每個星星的顏色大小隨機不同。
用到 php=rand+for 與 HTML=DIV+styl
 
高手挑戰
背景黑色，星星顏色偏向淺色系。讓星星透過 css animate 旋轉且速度不同。

# 回家作業 2
大樂透電腦選號 1 ~ 49，每次產生 5 ~ 10 組樂透號組，每組６個號碼不重複
用到 array(),array_values(),sort(),for(),rand(),foreach();

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/ce630e2dd7fc44c369aef712e5a60b53)
{% endnote %}