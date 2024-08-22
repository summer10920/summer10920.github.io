---
title: "[基礎課程] MySQL 基本觀念指令操作"
categories:
  - 職訓教材
  - PHP/MySQL
tag:
  - PHP 程式設計（假日班）
  - 前端網頁開發技術（職前班）
date: 2020-05-13 18:10:42
---
![](https://i.imgur.com/96NYgou.png)

本篇將獨立化的學習如何操作資料庫進行數據管理，隨後章節會透過 PHP 對資料庫進行讀取、新增、修改、刪除等四大操作技能。搭配免費的 PHP 伺服器語言，最好的免費資料庫語言為 MySQL，這個伺服器套件在 XAMPP 內就已提供。
<!-- more -->

請開始啟用 xampp 的 mysql 服務，並試著在網址上輸入 **http://127.0.0.1/phpmyadmin/** 登入進行 MySQL 語法練習與操作。

---

# 介紹 phpmyadmin 工具
MySQL Server 服務啟動之後，你可以開始對這個伺服器服務進行連線，除了 xampp 原生 bin 的 cmd 連線做純文字輸入，你也可以透過一些工具軟體做登入，只要指定到 MySQL 的 IP 位置與帳號密碼即可，預設為 3306 port。而 phpmyadmin 是一套眾所皆知的免費管理工具，採用網頁式進行介面操作，省去純文字指令的煩惱，xampp 也預設提供了 phpmyadmin 工具。

練習：跟著以下作業操作 phpmyadmin，同時一邊理解 MySQL 的架構

- 建立一個 SQL 為 php_study
- 建立一個 table 為 ch6_crud
- 資料欄位為 id,student,chi,mat 代表索引，學生名，國文分數，數學分數
- 嘗試新增幾筆資料，像是老王，77,88 等 3 筆，先理解 phpmyadmin 的介面操作。

| #   | 名稱       | 類型       | 編碼與排序         | 屬性     | 空值 (Null) | 預設值 | 備註 | 額外資訊       |
| --- | ---------- | ---------- | ------------------ | -------- | ----------- | ------ | ---- | -------------- |
| 1   | id（主鍵） | int(10)    |                    | UNSIGNED | 否          | 無     |      | AUTO_INCREMENT |
| 2   | student    | varchar(5) | utf8mb4_unicode_ci |          | 否          | 無     |      |                |
| 3   | chi        | int(3)     |                    |          | 否          | 無     |      |                |
| 4   | mat        | int(3)     |                    |          | 否          | 無     |      |                |

**此時，你應該要理解：**
1. 最大單位為 SQL 資料庫，資料庫會擁有權限審核，允許誰可授權操作（雷同一個 excel 檔）
2. SQL 資料庫內可以有多個 table 資料表，設計者習慣會把相關資訊存放到一個資料表內。（雷同 excel 的分頁表）
3. 資料表內由欄位所組成，每個欄位有他的資料型態定義。
4. 每次新增一筆資料（多項資訊）會放在指定資料表內，同時根據有多少欄位就該塞多少筆資訊。
5. 資料型態主要分數字、字串、時間類型為主 (**下列粗體為常用型態**，還有其他種類不列舉）

# MySQL 資料欄位與屬性

- **數值**：
任何包含正、負號的整數與小數；（另外還有位元數不舉例，用二進位來表示數字）。
  ex: 
  - 整數 {TINYINT、SMALLINT、MEDIUMINT、INT、BIGINT}
  - 小數 {FLOAT、DOUBLE、DECIMAL}

- **字串**：
包含一般文字字串（非二進位）；（另外還有編碼字串不舉例，用二進位存放影音資料，但通常我們會直接存放在空間內不會特地放到資料庫內）。
ex:
  - 變動文字串 {VARCHAR、TINYTEXT、TEXT、MEDIUMTEXT、LONGTEXT}

- **日期與時間**：
包含日期、時間與日期加時間。
ex:
  - DATE、TIME、DATETIME、YEAR

注意以下觀念：
1. 資料型態的同類型有不同形態，取決於規劃資料庫的效能策略有不同選擇。大部分的類型都有長度需要宣告。所以根據你的資料特性範圍給予適合的資料長度。
2. 每個資料表都應該要有 PRIMARY Key（主鍵，做編號且不重複（自動流水號），內容不可為 NULL，這能方便此資料能被搜尋到。
3. 資料表應該對常被搜尋的對象規劃 INDEX（索引），這能加快資料被查詢到的效率。但會增加變動負擔與儲存。
4. 如果你將數字的屬性選擇 UNSIGNED，代表沒有負數，可以將使用正數範圍拉長兩倍。
5. int(5)，代表 int 的儲存範圍可以到-2147483648~2,147,483,647，固定 4bit 單位存放，數字 5 代表位數符號 (ex:00001)，所以不要誤會數字等於儲存上限。
6. varchar(5)，代表字串只能塞 5 個字。

# 指令練習
雖然 phpmyadmin 可以直覺的用滑鼠快速操作指令，但之後要透過 php 對 mysql 下達指令時，也是需要用純文字命令溝通。所以請試著努力學會 CRUD 的基本 SQL 語法。

## 搜尋語法
select 對象欄位 from 資料表。
```sql
SELECT * FROM `ch6_crud`
SELECT student FROM ch6_crud
```

撈取對象：
- * 代表 ALL 全部欄位
- student 代表 該名欄位

\` 指為 SQL 欄位名稱可不填，注意不可以用'或"
'或"是指資料內容為文字串

搜尋夾帶條件
```sql
SELECT * FROM `ch6_crud` WHERE `cht`>=60
SELECT * FROM ch6_crud WHERE id=3
```

## 新增語法
有兩種格式寫法：
- **第一種，選擇想新增資料的欄位名稱及對應輸入的內容**
  insert into 資料表（欄位，欄位，...) value （內容，內容，...)
  ```sql
  INSERT INTO ch6_crud (student, chi, mat) VALUES ("阿咪",77,88)
  ```

- **第二種，不宣告欄位名稱時對應內容需全部提及，空值為 null**
  insert into 資料表 value 新增內容 
  ```sql
  INSERT INTO ch6_crud VALUES (null,"小梅",50,77)
  ```
  另外，如果要連續多筆新增到同一個資料表，可用逗號分別（多利用排版）
  ```sql
  INSERT INTO ch6_crud (student, chi, mat) VALUES 
  ("阿一",77,88),
  ("阿二",78,88),
  ("阿三",79,88),
  ("阿四",80,88),
  ("阿五",81,88)
  ```

## 修改語法
update 資料表 set 被修改的欄位名 = 被修改的內容 where 對象欄位 = 值
```sql
UPDATE ch6_crud SET mat=59 where id=2
```
{% note danger %}
**新手陷阱：**
修改通常會帶條件，不帶條件會全部都被修改要特別注意。
{% endnote %}

## 刪除語法
delete from 資料表 where 指定的欄位 = 指定的內容
```sql
DELETE FROM ch6_crud where id=10
SELECT * FROM `ch6_crud` WHERE `cht`>=60
```

{% note danger %}
**新手陷阱：**
刪除通常會帶條件，不帶條件會全部都被刪除要特別注意。
刪除前你可以把`DELETE FROM`換成`SELECT * FROM`做測試避免誤刪。
{% endnote %}

## WHERE 指定條件
where 為判斷對象、判斷方式、判斷內容等等（時間、字串需標記""或'')
判斷方式有 `>`、`<`、`>=`、`<=`、`<>`、`=`共 6 種，字串只可使用`=`、`<>`

```sql
SELECT * from ch6_crud where id>5;
SELECT * from ch6_crud where student="阿咪";
```

可以使用 AND 與 OR 做多筆條件

```sql
SELECT * from ch6_crud where student="阿咪" or student="阿一";
SELECT * from ch6_crud where chi>59 and mat>59;
```

## LIKE 模糊條件
like %對象%，而%代表不固定，組合略分三種模式

- %A => A 結尾的字串
- A% => A 開頭的字串
- %A% = > 字串含 A 的對象

```sql
SELECT * from ch6_crud where student LIKE "阿%"
```

## 時間格式  "Y-M-D HH:MM:SS"
資料庫的時間格式是固定的，如果網頁的顯示有所不同，則由資料撈出來可以用 SQL 函數轉化。

練習：
1. 新增資料表 ch6_weather，內容如下。
2. 新增幾筆天氣資料，內容如下。
```sql
CREATE TABLE `php_study`.`ch6_weather` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `feel` TEXT NOT NULL , `mydate` DATE NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
INSERT INTO `ch6_weather` (`id`, `feel`, `mydate`) VALUES (NULL, '晴天', '2019-05-15'), (NULL, '毛毛雨', '2019-05-16');
```
3. 接著透過 DATE_FORMAT 去調整顯示方式
```sql
SELECT DATE_FORMAT(mydate,"%W,%M-%e-%Y") FROM ch6_weather
```

## LIMIT 區間條件
限制只搜尋出 3 筆資料（依索引順序）
```sql
SELECT * FROM `ch6_crud` LIMIT 3
```
限制搜尋第 N 筆 (start 0) 資料的 3 筆資料（依索引順序）
```sql
SELECT * FROM `ch6_crud` LIMIT 2,3
```

## ORDER BY 與 GROUP BY
前者為純排序（預設 ASC)，後者為排序時同時群組化（資料不重複）

```sql
SELECT * FROM ch6_crud ORDER BY chi
```
加上 desc 則遞減
```sql
SELECT * FROM ch6_crud ORDER BY chi DESC
```
如果排序需要參考多組 (ex: 同分時，採學號遞減）
```sql
SELECT * FROM ch6_crud ORDER BY chi DESC, mat DESC
```
額外說明：GROUP 能自動跳過重複的內容，通常還會搭配 SUM() 之類的函數，目的是讓列表被整理過。譬如用法（非本篇範例）
```sql
SELECT Store, SUM(Sales) FROM Info GROUP BY Store;
```

## 自訂標題名稱 as
```sql
SELECT student as "學生", chi as "國文", mat as "數學", (chi+mat)/2 as "平均" FROM ch6_crud
```

# 自主練習
根據以下題目說明，試著寫出SQL語法為何：

ex1: 搜尋 [mat] 60 以上的 [student]
```sql
SELECT student from ch6_crud WHERE mat>59
```

ex2: 搜尋 [student] 中名字有阿的 [chi] 分數
```sql
SELECT student,chi from ch6_crud WHERE student LIKE "阿%"
```

ex3: 使用語法新增三個學生資料
| 學生名稱 | 數學 | 國文 |
| -------- | ---- | ---- |
| 蘋果     | 100  | 100  |
| 鳳梨     | 99   | 50   |
| 檸檬     | 50   | 43   |
```sql
INSERT into ch6_crud (student,chi,mat) VALUES ("蘋果",100,100), ("鳳梨",99,50), ("檸檬",50,43)
```

ex4: 呈上，數學成績不到 60 的人，數學自動+10 分
```sql
UPDATE ch6_crud SET mat=mat+10 where mat<60
```

ex5: 呈上，如果國文成績+10 分後會超過 100 分的同學資料刪除
```sql
DELETE FROM ch6_crud WHERE chi+10>100
or
DELETE FROM ch6_crud WHERE chi>90 （精簡提高效能）
```

ex6: 搜尋資料表並顯示國文成績最好的三個人 [同學名稱]
```sql
SELECT student FROM ch6_crud ORDER BY mat DESC LIMIT 3
```

ex7: 搜尋資料表並顯示數學成績第 6 名的 [同學名稱]
```sql
SELECT student FROM ch6_crud ORDER BY mat DESC LIMIT 5,1
```

ex8: 呈上，顯示平均成績最差的三個人，並另名為名字，國文，數學，平均之欄位名稱
```sql
SELECT student as "名字",chi as "國文",mat as "數學",(chi+mat)/2 as "平均" FROM ch6_crud ORDER BY 平均` LIMIT 3
```

---

# MySQL 跨 table 搜尋

## 回家作業
建立以下三組 table，自行評估適合的欄位資料型態（下小節繼續使用）

1. 建立 table 客戶資料 ch6_customer
| id  | acc(帳號) | pwd(密碼) | name(姓名) |
| --- | --------- | --------- | ---------- |
| 1   | user1     | pwd1      | mr.A       |
| 2   | user2     | pwd2      | mr.B       |
| 3   | user3     | pwd3      | mr.C       |
| 4   | user4     | pwd4      | mr.D       |

  ```sql
  CREATE TABLE ch6_customer (id int(10) AUTO_INCREMENT, acc text, pwd text, name text, PRIMARY KEY(id));
  -- crate table 客戶資料表 （索引欄 整數（長度 10), 客戶帳號 文字串，密碼 文字串，姓名 文字串，primary key（索引值）);

  INSERT INTO ch6_customer VALUES (null, "user1", "pwd1", "mr.A"), (null, "user2", "pwd2", "mr.B"), (null, "user3", "pwd3", "mr.C"), (null, "user4", "pwd4", "mr.D");
  -- insert into 資料表 values （空值，帳號，密碼，名稱）, （空值，帳號，密碼，名稱）, （空值，帳號，密碼，名稱）, （空值，帳號，密碼，名稱）;
  ```

2. 建立 table 訂單資料 ch6_order
| id  | product_sn(產品編號) | order_num(購買數量) | customer_sn(客戶編號) | order_time(訂購時間) |
| --- | -------------------- | ------------------- | --------------------- | -------------------- |
|     |                      |                     |                       |                      |

  ```sql
  CREATE TABLE ch6_order (id int(10) AUTO_INCREMENT, product_sn text, order_num int(10), customer_sn text, order_time DATETIME, PRIMARY KEY(id));
  -- crate table 訂單資料表 （索引攔 整數（長度 10), 產品編號 文字串，購買數量 整數（長度 10), 客戶編號 文字串，訂單時間 日時，primary key（索引值）);
  ```

3. 建立資料 ch6_product
| id  | product_name(產品名稱) | product_price(產品金額) | product_desc(產品介紹) |
| --- | ---------------------- | ----------------------- | ---------------------- |
| 1   | product1               | 100                     | it's 100 dollors       |
| 2   | product2               | 200                     | it's 200 dollors       |
| 3   | product3               | 300                     | it's 300 dollors       |
| 4   | product4               | 400                     | it's 400 dollors       |
| 5   | product5               | 500                     | it's 500 dollors       |

  ```sql
  CREATE TABLE ch6_product (id int(10) AUTO_INCREMENT, product_name text, product_price int(10), product_desc text, PRIMARY KEY(id));
  -- crate table 訂單資料表 （索引攔 整數（長度 10), 產品名 文字串，產品價格 浮點數（長度 10, 小數點 2), 產品介紹 文字串，primary key（索引值）);

  INSERT INTO ch6_product VALUES (null, "product1", "100", "it's 100 dollors"), (null, "product2", "200", "it's 200 dollors"), (null, "product3", "300", "it's 300 dollors"),(null, "product4", "400", "it's 400 dollors"), (null, "product5", "500", "it's 500 dollors");
  -- insert into 資料表 values （空值，產名，價格，描述）, （空值，產名，價格，描述）, （空值，產名，價格，描述）, （空值，產名，價格，描述）, （空值，產名，價格，描述）;
  ```

4. 如果你已完成以上作業，接著手動建立兩筆資料於 ch6_order 內。這裡要注意一下<mark>產品編號</mark>跟<mark>客戶編號</mark>必須是已存在於另兩個 table 內。所以指令為：
```sql
INSERT INTO ch6_order VALUES (null, 2, 10, 2, NOW()), (null, 4, 5, 4, NOW())
```
得到 ch5_order
| id  | product_sn | buy_num | customer_sn | order_time          |
| --- | ---------- | ------- | ----------- | ------------------- |
| 1   | 2          | 10      | 2           | 2019-06-21 01:57:27 |
| 2   | 4          | 5       | 4           | 2019-06-21 01:57:27 |

## 列出所有顯示 (t1,t2,t3 為臨時變數）
```sql
select * from ch6_customer as t1, ch6_product as t2, ch6_order as t3 where 1
-- 也可省略 as 為
-- select * from ch6_customer t1, ch6_product t2, ch6_order t3 where 1
-- 臨時變數是為了方便 where 指定
```

## 列出關聯顯示 (t1,t2,t3 為臨時變數）
前者結果下，會發現很多不存在的訂單組合，因此縮小範圍（利用外鍵與內鍵做比對）
```sql
select * from ch6_customer t1, ch6_product t2, ch6_order t3 
where t1.id = t3.customer_sn and t2.id = t3.product_sn
```

| id  | acc   | pwd  | name | id  | product_name | product_price | product_desc     | id  | product_sn | buy_num | customer_sn | order_time          |
| --- | ----- | ---- | ---- | --- | ------------ | ------------- | ---------------- | --- | ---------- | ------- | ----------- | ------------------- |
| 2   | user2 | pwd2 | mr.B | 2   | product2     | 200           | it's 200 dollors | 1   | 2          | 10      | 2           | 2019-06-21 01:57:27 |
| 4   | user4 | pwd4 | mr.D | 4   | product4     | 400           | it's 400 dollors | 2   | 4          | 5       | 4           | 2019-06-21 01:57:27 |

這樣就是有效的關聯組合（僅兩筆），這樣做屬於正規化處理，好處在於可以彈性不被綁定。譬如個人資料修改或訂單修改，兩者還能關聯起來顯示。資料量小又能彈性。