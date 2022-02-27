---
title: "[基礎課程] JavaScript 教學（二）：BOM 與 DOM"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-20 21:07:53
---
![](https://i.imgur.com/D8v3RVP.png)
本篇介紹 JS 十分重要的兩大模型介紹，如果你希望 JS 能控制並動態調整你的網頁內容。不外乎就是 BOM 與 DOM 模型。BOM 是瀏覽器物件模型，DOM 是文件物件模型，前者是對瀏覽器本身進行操作，而後者是對瀏覽器（可看成容器）內的內容進行操作。

<!-- more -->

透過下圖可理解整個層級觀念。
- BOM 最根部是指 window，也就是本身整個瀏覽器容器。
- DOM 之最根部的地方，就是 document，就是屬於 BOM 之內。DOM 往下可以延伸出各種 HTML 標籤，一個節點就是一個標籤，往下又可以再延伸出「文本」與「屬性」。

{% mermaid graph TD %}
subgraph BOM
Window --> document & history & location & navigator & screen
end
document ==> html
subgraph DOM
html --> head & body
head --> title & meta
body --> div & table & form & p
end
style BOM fill:#f9f,stroke:#333,stroke-width:4px
style DOM fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5, 5
{% endmermaid %}

此時 JS 可以由 DOM 去存取並改變 HTML 文件之架構、樣式和內容的方法，簡單來說 JS 可以透過 DOM 提供的方式來對 HTML 做存取與操作，以及同時用 BOM 做一些反應事件。BOM/DOM 的最大差別在於：

- BOM: JS 與瀏覽器溝通的窗口，不涉及網頁內容。
  語法範例 >>  `window.alert("hello world");`
- DOM: JS 用來控制網頁的節點與內容的標準。
  語法範例 >>  `window.document.write("hello world");`

---

# 常用的 BOM 操作
由於最上層一定是 window，所以是可以省略不寫 window。有些是<mark>屬性=物件{}</mark>有些是<mark>方法=函式 ()</mark>被歸入使用。請參考 MDN 說明 https://developer.mozilla.org/zh-CN/docs/Web/API/Window
- console()
  指令輸出
  ```javascript
  //請一行行輸入下列確認差異性
  console.log("helo world");
  console.info("same like log");
  console.error("it no work");
  console.warn("you have trobule");
  ary=['apple','banana','cup'];
  console.table(ary);
  console.table(history);
  console.clear();
  ```

- history()
  提供控制可遊覽紀錄的方式
  ```javascript
  history.back(); //回前頁
  history.forward(); //下一頁
  history.go(1); //用數字+-代表前後跳幾頁
  ```

- screen{}
  提供相關螢幕的數據，更多內容請詳 [MDN 說明網址](http://www.w3school.com.cn/js/js_window_screen.asp)
  ```javascript
  screen.width;
  screen.availWidth;
  ```

- location{}
  控制 URL 的方式，更多內容請詳 [MDN 說明網址](https://www.w3schools.com/jsref/obj_location.asp)
  
  ```javascript
  location.href; //取得目前 URL
  location.href="https://www.google.com"; //將目前 URL 指定為某 URL;
  location.assign("https://www.google.com"); //指定瀏覽到某 URL;
  ```

- open(),close()
  控制新視窗，更多內容請詳 [open - MDN 說明網址](https://www.w3schools.com/jsref/met_win_open.asp)、[close - MDN 說明網址](https://www.w3schools.com/jsref/met_win_close.asp)
  ```javascript
  open("https://www.w3schools.com"); //控制打開視窗
  
  var myzone=open("https://www.w3schools.com","","width=200,height=100"); //控制打開視窗
  myzone.close();
  ```

- alert(),prompt(),confirm()
  ```javascript
  alert("hello world"); //提示視窗

  var ans=confirm("question"); //提問，回傳布林值
  alert(`you select ${ans}`);

  var ans=prompt("question","default value"); //提問取得字串並回傳
  alert(`you report is ${ans}`);
  ```

- setTimeout(),clearTimeout()
  ```javascript
  end=5*1000;
  function delay(){
    console.log("game over");
  }
  setTimeout(delay,end); //延後執行
  
  // var myvar=setTimeout(delay,end);
  // clearTimeout(myvar);
  ```

- setInterval(),clearInterval()
  ```javascript
  i=0;
  function reply(){
    console.log(i);
    i++;
    if(i==5) clearInterval(time); //成真時取消 time 的倒數
  }
  var time=setInterval(reply,1000); //每 1 秒重複執行此處
  ```

## 課堂作業
建立空白網頁，使用 ifelse, alert, confirm, prompt，設計一個是非題之闖 5 關遊戲。每題都有提示要不要做，猜對繼續闖關，猜錯直接結束遊戲。主體結構如下：
```html
<body>
<script>
function gameplay() {
	1. prompt: 遊戲說明並取得 NAME=xxx，回饋訊息顯示；
	2. confirm: 詢問用戶 XXX 是否要進行遊戲，回饋訊息顯示；
		- TRUE:
			if(qus（問題內容，好訊息，壞訊息，T/F)) return;
			恭喜成功；
		- FALSE:
			不想玩就 881;
}
function qus（問題，好，壞，布林）{
	1. confirm: 顯示題目取得 TorF==布林
		- TRUE: 顯示好訊息
		- FALSE: 顯示壞訊息 return TRUE;
}
gameplay();
</script>
</body>
```
{% note default %}
**示範參考：**
1. 標準版本 - https://summer10920.github.io/studies_TeachDemo_JS/storyGame/ 
2. SweetAlert 版本 - https://summer10920.github.io/studies_TeachDemo_JS/storyGame_swal/

{% endnote %}

---
# 常用的 DOM 操作
由於最上層一定是 window，所以可以省略不寫 window。一般是從 document 開始寫，有些是<mark>屬性=物件{}</mark>有些是<mark>方法=函式 ()</mark>被歸入使用。請參考 MDN 說明 https://developer.mozilla.org/zh-CN/docs/Web/API/Document

使用 DOM 時，依據物件路徑一個個往內找。通常語法結過如下，

```javascript
var txt=document.getElementById("demo").innerHTML; //指定為 txt=物件。方法。子屬性
```

## document 物件
在 document 物件底下會存放一些子物件可以直接獲取 HTML 文件內的大群組元素可直接找到，或者下節部分透過 get 方式找到指定條件的範圍元素。

| document. 子物件 | 描述                                                            |
| ---------------- | --------------------------------------------------------------- |
| document.head    | head 元素，但唯獨屬性不可修改                                   |
| document.body    | body 元素，操作例如`document.body.style.backgroundColor="red";` |
| document.forms   | 文件內的全部表單元素之通用集合                                  |
| document.links   | 文件內的全部具備 href 之元素之通用集合                          |
| document.images  | 文件內的全部 img 元素之通用集合                                 |
| document.scripts | 文件內的全部 script 元素之通用集合                              |

>如通用集合內的元素持有 id 或 name 可更快指向找到，例如：
```html
<img src="https://fakeimg.pl/200x200" name="aa">
<img src="https://fakeimg.pl/200x200" id="bb">
<script>
  consonle.log(document.images.aa,document.images.bb);
</script>
```

## 節點存取
| document. 方法                 | 描述                                     |
| ------------------------------ | ---------------------------------------- |
| getElementById(*id*)           | 以 id 找，唯一值                         |
| getElementsByClassName(*name*) | 以 class 找（多筆），回傳 array          |
| getElementsByTagName(*name*)   | 以標籤找（多筆），回傳 array             |
| getElementsByName(*name*)      | 以表單屬性 name 去找（多筆），回傳 array |

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
```html cssTry.html
<html>
<body>
  <h1>my list</h1>
  <ul id="demo">
    <li class="list">apple</li>
    <li class="list">banana</li>
  </ul>
</body>
</html>
```
{% endnote %}

- 示範如何透過 ById 去讀取修改內容
```javascript
<script>
	var obj = document.getElementById("demo");
	alert(obj.innerHTML);
	obj.innerHTML = "<li>AAA</li><li>BBB</li>"; //抓 HTML 修改
	obj.textContent = "<li>AAA</li><li>BBB</li>"; //抓出文字，遇 HTML 自換符號
	//obj.innerText 同上效果，屬於舊 IE8 語法但 Firefox 不支援
</script>
```

- 示範如何透過 ByClass 去得到多組物件並讀取修改內容
```javascript
<script>
	var food=document.getElementsByClassName("list");
	console.log(food);
	alert(food[0].textContent);
	food[0].innerHTML="<b>AAA</b>";
</script>
```
- 示範如何透過標籤去得到多組物件並讀取修改內容
```javascript
<script>
  var food = document.getElementsByTagName("li");
  console.log(food);
  alert(food[1].textContent);
  food[1].innerHTML = "<b>BBB</b>";
</script>
```

## Event 事件
Event 的事件非常多，是指當偵測某物件的狀態成立時觸發執行{}某 JS。有分為滑鼠、鍵盤、觸碰裝置、遊覽器、元素等各種事件，通常會搭配自訂函式形成一個互動反應。以下只列舉幾個簡單的事件

{% note default %}
更多 Event 請參考 [W3Schools 說明網址](https://www.w3schools.com/jsref/dom_obj_event.asp)
{% endnote %}

**mouse event**

| document. 方法                         | 描述                       |
| -------------------------------------- | -------------------------- |
| onclick,dblclick,onmousedown,onmouseup | 點選，雙點，滑鼠按下，彈起 |
| oncontextmenu                          | 滑鼠右鍵                   |
| onmouseover,onmouseout                 | 滑鼠移入，移出             |
| onchange                               | 常用於表單，當內容有變化時 |
| onfocus                                | 獲得焦點                   |
| onblur                                 | 失去焦點                   |
| onsubmit                               | 表單提交                   |
| onreset                                | 表單重置                   |

> focus/blur有雷同的用法為focusin/focusout，兩者差異後者支援冒泡事件但瀏覽器並非都支援

**touch event**

| document. 方法 | 描述     |
| -------------- | -------- |
| ontouchcancel  | 觸碰取消 |
| ontouchend     | 觸碰離開 |
| ontouchmove    | 觸碰按壓 |
| ontouchstart   | 觸碰按下 |

**kerboard event**

| document. 方法 | 描述           |
| -------------- | -------------- |
| onkeyup        | 按鈕彈起       |
| onkeydown      | 按鈕按下       |
| onkeypress     | 按鈕按下並起來 |

**browser event**

| window. 方法 | 描述           |
| ------------ | -------------- |
| onload       | 元素載入後時   |
| onresize     | 視窗改變尺寸時 |

> 這裡的寫法可使用在 HTML 屬性或透過 JS 對元素物件綁定，後面會講到監聽事件之另一種方法

### 透過 HTML 屬性觸發

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
```html eventTry.html
<html>
<body>
  <input type="button" value="onclick demo" onclick="showalert('我是 onclick 效果')">
  <hr>
  <input type="button" value="onclick" onclick="whatIs(this)">
  <input type="button" value="onmousedown" onmousedown="whatIs(this)">
  <input type="button" value="onmouseup" onmouseup="whatIs(this)">
  <input type="button" value="onmouseover" onmouseover="whatIs(this)">
  <input type="button" value="onmouseout" onmouseout="whatIs(this)">
  <input value="onchange" onchange="whatIs(this)">
  <input value="onblur" onblur="whatIs(this)">
  <input value="onfocus" onfocus="whatIs(this)">

  <div id="fakeBtn"></div>
  <hr>
  <div>你的鍵盤號碼為：<span id="keycode"></span></div>
</body>
</html>
```
{% endnote %}

請跟著做，滑鼠點擊任何地方理解 JS 動作
```javascript
function showalert(msg) {
  alert(msg);
}
function whatIs(e) {
  console.log(e.value); // 得到 e 物件，取得屬性名為 value 之內容

  if (e.style.color == "red") e.style.color = null; //如果是紅色，取消這個色
  else e.style = "color:red;font-size:30px;";
  console.log(`你剛剛按下了${value}按鈕`);
}
/*
document.getElementById("fakeBtn").style = "background-color: aqua;box-shadow: 3px 3px 1px rgba(193, 193, 193, 0.5);cursor: pointer;display:inline;padding:5px";
document.getElementById("fakeBtn").innerHTML = "模擬按鈕";
document.getElementById("fakeBtn").onclick = function () { alert("onclick"); };
可以轉成變數來當物件，指向到任何屬性
*/
var fakebtn = document.getElementById("fakeBtn");
fakebtn.style = "background-color: aqua;box-shadow: 3px 3px 1px rgba(193, 193, 193, 0.5);cursor: pointer;display:inline;padding:5px";
fakebtn.innerHTML = "假按鈕";
fakebtn.onclick = function () {
  alert(fakebtn.style.backgroundColor); //大部分都這樣-變化大寫
};

/*event 事件 on 鍵盤*/
function getcode() {
  console.log(event.keyCode);
  document.getElementById("keycode").textContent = event.keyCode;
}
document.onkeydown = getcode;
```

### 透過 JS 監聽行為觸發
使用 addEventListener() 與 removeEventListener() 做可維護管理的事件用函式，直接指定事件與對象。

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
```html event_listener.html
<body>
  <input type="button" id="ock" value="try me">
  <input type="button" id="canel" value="取消 mouseover" onclick="clearover()">
</body>
```
{% endnote %}

```javascript
/*一開始 HTML#ock 沒有寫事件，之後透過 addEventListener（什麼動作，執行什麼函式）來添加*/
var mybtn=document.getElementById("ock");
mybtn.addEventListener("click",function(){  //這裡應該用 click 不該用 onclick
  alert("it's click");
});
mybtn.addEventListener("mouseover",myfun);
mybtn.addEventListener("mouseover", myfun2);
function myfun(){
  alert("it's mouseover");
}
function myfun2() {
    alert("you can do more function");
  }

function clearover(){
  document.getElementById("ock").removeEventListener("mouseover",myfun);
}
```

## 節點的屬性讀寫

| element. 方法                     | 描述                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------ |
| innerHTML                         | HTML Cdoe                                                                      |
| textContent                       | text string                                                                    |
| attribute.???<br>- name,value,... | 該節點的屬性 (ary), 除了可讀寫現有名稱或值                                     |
| setAttribute,removeAttribute      | 屬性設定，常用於增刪 class 或 id                                               |
| style.???                         | 該節點的行內樣式，每一個 (???) 樣式都算一個屬性，如果要移除需指定此屬性為 null |

## 節點調整
| document. 方法  | 描述       |
| --------------- | ---------- |
| createElement() | 建立節點   |
| removeChild()   | 删除子節點 |
| appendChild()   | 增加子節點 |
| replaceChild()  | 替換子節點 |
| write()         | 直接寫入   |

```html
<body>
  <p id="demo">按這裡，由 DOM 觸發 JS</p>
  <button onclick="add()">按這裡由 HTML 觸發 JS</button>
  <script>
    function add() {
      var btn = document.createElement("button");
      btn.textContent = "YA";
      document.body.appendChild(btn);
    };
    document.getElementById("demo").onclick = function () { add() };
  </script>
</body>
```

## 課堂練習
{% tabs classtry,1 %}
<!-- tab 說明 -->
1. 建立一個 div 預設值為 `width: 100px; height: 100px; background-color:red;`
2. 理解將 div 設計為正方形、圓形、三角形之 CSS 屬性方式，[參考這裡](https://www.cnblogs.com/jscode/archive/2012/10/19/2730905.html)。
3. 提供事件按鈕與輸入框，能對 div 做 CSS 變化
  - button: 正方形
  - button: 圓形
  - button: 三角形
  - input:text(#color code)>變化背景色
<!-- endtab -->
<!-- tab 解答-->
```html 解答
<body>
  <div id="myblock" style="width:100px;height:100px;background-color: red;"></div>
  <hr />
  <input type="button" value="正方形" onclick="trans('A')" />
  <input type="button" value="圓形" onclick="trans('B')" />
  <input type="button" value="三角形" onclick="trans('C')" />
  <p>Color Code: <input type="text" onchange="color(this.value)" /></p>

  <script>
    var zone = document.getElementById("myblock");
    var clr=zone.style.backgroundColor; //red
    function trans(re) {
      switch (re) {
        case "A":
          zone.style = "width:100px;height:100px;background-color:"+clr;
          break;
        case "B":
          zone.style = "width:100px;height:100px;background-color:"+clr+";border-radius: 50px;";
          break;
        case "C":
          zone.style = "width:0;height:0;border-left: 50px solid transparent;border-right: 50px solid transparent;border-bottom: 100px solid "+clr+";";
          break;
      }
    }
    function color(re){
      zone.style.backgroundColor=re; //目前的顏色換掉
      clr=re; //把所有的色變數更新一下
    }
  </script>
</body>
```
<!-- endtab -->
{% endtabs %}

## 課堂作業
設計 div 長寬隨意，每次開啟網頁時 BGcolor 隨機色（具提示），提供下列按鈕可立即更改顏色。
- 基本款
	- R 紐，跳出視窗提示輸入數字範圍 0~255，非範圍內重新再問
	- G 紐，跳出視窗提示輸入數字範圍 0~255，非範圍內重新再問
	- B 紐，跳出視窗提示輸入數字範圍 0~255，非範圍內重新再問

- 完成再挑戰
	- +紐，對 RGB 各色值+1，合理範圍內
	- -紐，對 RGB 各色值-1，合理範圍內
	- input:range 拖曳 bar 代表 (R 色） 0~255 立即有效果
	- input:range 拖曳 bar 代表 (G 色） 0~255 立即有效果
	- input:range 拖曳 bar 代表 (B 色） 0~255 立即有效果
	- ? 紐，對 RGB 重新再隨機色

示意圖如下：

![基本版](https://i.imgur.com/kMqEG8t.png) ![強化版](https://i.imgur.com/CN1gDcE.png)

{% note default %}
**示範參考：**
挑戰版本 - https://summer10920.github.io/studies_TeachDemo_JS/colorEditor/
{% endnote %}