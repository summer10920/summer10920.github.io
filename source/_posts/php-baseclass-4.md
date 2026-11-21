---
title: "[基礎課程] PHP 重複執行迴圈"
categories:
  - Archived Courses
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-12 08:35:51
---
![](assets/images/banner/php.png)

本篇學習重點為迴圈執行（不含陣列批次處理之語法），主要是透過邏輯判斷是否需要重新執行一段指令碼，能協助連續且重複性的反覆作業。請開始在 Web 目錄下新增檔案 **1_loop.php**，為了簡化程式碼結構將不建置 HTML 基本結構。請開始做 PHP 各種練習並預覽網頁結果。

<!-- more -->

---

# for 迴圈處理
迴圈是只重複的執行一樣的動作，除非達到指定條件才會結束迴圈動作。for() 常見結構為：

```php
for($i=start;$i<max;$i++){
  #code
}
```

for 的`()` 內主要有三個宣告動作分別用<kbd>;</kbd>分開，分別為：
- 初次動作：第一次執行的宣告動作，之後重複迴圈時忽略此項
- 進入條件：每次進來時的條件檢查，當成立時才會執行 `{ }` 內的 ` #code `
- 離開動作：`{ #code }` 執行結束後，會執行這個動作

## 基本練習
練習：跟著以下行為猜測預期結果
```php
<?php
  for($i=0;$i<10;$i++) {
    echo $i;
  }
?>
```
理解動作：
1. 當成是碰到 for() 時，先設定$i 為 0
2. 接著 0<10 成立，執行 輸出 0，接著$i 做+1 動作
4. 接著回到 for（），條件 1<10 成立，執行輸出 1，接著$i 做+1 動作
5. 接著輸出 2,3,4,5,6,7,8,9
6. 重複直到 10<10 不成立，for 行為結束。

思考練習，試著印出以下畫面：
1
4
7
10

解答：
```php
<?php
  for($j=1;$j<=10;$j+=3)  echo $j.'<br/>';
?>
```

到這裡你應該能理解 for 裡面三個宣告的定義與執行時機。

思考練習：
產生★*51 橫向排列顏色漸變，第一個★色碼 rgb(0,0,255)，最後個★色碼 rgb(255,0,0)

解答：
```php
for($k=0;$k<256;$k+=5)
  echo "<span style='color:rgb(".$k.",0,".(255-$k).")'>★</span>";
```

## 雙 for 迴圈
如果 for(A) 迴圈裡面又有 for(B)，這種技巧下可以滿足 2 組以上不同的固定變化處理。double for 的邏輯深度到了二維去。思緒要跟著程式一起跑，才能幫助你解開並進入情境。

思考練習：
產生 99 乘法表，排版整齊，前二個方式請挑一個做或挑戰兩個，都挑戰完請挑戰第三個
1. 用行內+換行標籤。
2. 用表格標籤
3. 整合前面練習，利用 style 讓整個乘法表有漸層。

解答 1: 只靠 span+br 橫向排列
```php
<?php
for($m=1;$m<10;$m++){
  for($n=1;$n<10;$n++) {
    echo "<span style='display:inline-block;width:70px'>".$n."X".$m."=".($n*$m)."</span>";
  }
echo "<br/>";
}
?>
```

解答 2: 利用 table 做縱向排列
```php
<table border='1'><tr>
<?php
  for($m=1;$m<10;$m++){
    echo "<td width='75'>";
    for($n=1;$n<10;$n++) 
      echo $m."*".$n."=".($m*$n)."<br/>";
    echo "</td>";
  }
?>
</tr></table>
```

解答 3: 整合之前的漸層色練習
```php
<?php
  $clr=0;
  for($m=1;$m<10;$m++){
    for($n=1;$n<10;$n++) {
      echo "<span style='display:inline-block;width:70px;color:rgb(".$clr.",0,".(255-$clr).")'>".$n."X".$m."=".($n*$m)."</span>";
      $clr+=5;
    }
    echo "<br/>";
    }
?>
```

---

# while() 條件迴圈
while() 也是迴圈的一種，結構較簡單。跟前者差異在於 while() 只有一個條件判斷是否要執行該段#code。

練習：模仿 for 的動作
```php
<?php
$i = 0;
while ($i < 10) {
  echo $i;
  $i++;
}
?>
```

---

# do while() 條件迴圈
do while 是 while 的變形版本，比較常見於檢查下，譬如 do 裡面要求使用者收入某資料，透過 while 去判定是否重新做一遍才離開迴圈。

```php
<?php
$count = 5;
do {
  echo $count;
  $count--;
} while ($count!=0);
?>
```

---

# for vs while vs do{} while() 三者比較
迴圈的方式大致上以這三種為主，每個的效果跟邏輯差不多都是碰到條件再決定是否要執行重複範圍。你可以用以下的觀念去思考
1. for 一行就清楚表示遊戲規則，思緒上會比較清晰，適合簡單的迴圈控制變數增加減少行為。
2. while 只有條件，適合自訂遊戲規則，做比較彈性，只要你有能力控制迴圈結束都可以用。
3. do while 跟 while 一樣適合自訂遊戲規則，只差別於第一次進入檢查條件，更貼近 for 的效果

---

# 回家作業 A
練習作業：產生以下預覽（對稱的堆星塔）
<div style="text-align:center;width:150px">
<div>★</div>
<div>★★★</div>
<div>★★★★★</div>
<div>★★★★★★★</div>
<div>★★★★★★★★★</div>
</div>
解答：
```php
<div style="text-align:center;width:200px">
<?php
for($i=1;$i<10;$i+=2){ //$i=1,3,5,7,9 pre-for
  for($j=1;$j<=$i;$j++){
    echo "★";
  }
  echo "<br/>";
}
?>
</div>
```

---

# 回家作業 B
練習作業：完成作業 A 的學員，使用 rand 機率分別為 10%(red).20%(yellow).30%(pink).40%(white) 將星星換色 (style)，整個背景為黑色。

解答：
```php
<div style="text-align:center;width:200px;background-color:black;">
  <?php
  for ($i = 1; $i < 10; $i += 2) { //$i=1,3,5,7,9 pre-for
    for ($j = 1; $j <= $i; $j++) {
      $clr=rand(1,100);
      if($clr<11) echo "<span style='color:red'>★</span>";
      elseif($clr<31) echo "<span style='color:yellow'>★</span>";
      elseif($clr<61) echo "<span style='color:pink'>★</span>";
      else echo "<span style='color:white;background-color:black'>★</span>";
    }
    echo "<br/>";
  };
  ?>
</div>
```

{% note default %}
**以上課題之完整代碼：** [view full code](https://gist.github.com/summer10920/4b1ff0d75ab8749824070f9ffeb56d67)
{% endnote %}