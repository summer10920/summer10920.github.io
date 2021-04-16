---
title: "[練習課程] JavaScript 實作（四）：打地鼠遊戲"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-22 01:32:41
---

JS 的互動範例，主要能學習到 settimeout, event, dom 的控制與視覺互動。包含了鍵盤事件的調整與控制。遊戲設計如下：
<!-- more -->

1. 按下遊戲開始，會開始規劃 60 秒鐘期限，每次分數歸 0 開始計時計分。
2. 共有 100 次機會事件，隨機的對九宮格進行 yellow->red 事件狀態。
3. 每次 red 事件狀態會停留隨機 1~3 秒，若超過停留秒數會自動回到 yellow 狀態
4. 當用戶進行點選 red 事件，則代表得分，會變化為 green 事件。
5. green 事件停留 1 秒後，回到 yellow 狀態。
6. 遊戲結束後，可繼續遊戲，回到步驟 1 全新的計分計時。

注意：遊戲設計過程中需符合合理流程與排除操作問題性。

# 規劃版面與樣式表
先利用 div 規劃出 9 宮格的樣式，固定一行有三張圖片。並試著調整好畫面距離，同時利用 class=cell 作為所有圖片的 css 調整，之後能以 JS DOM 去找到這些圖片 (getelementsbyclassname)。然而 title 這裡我們作為圖片說明，以及之後的 DOM 解讀狀態使用。

同時準備三張圖片相同寬長為 100px。有三個事件為等待 (Yellow)，出現 (red)，得分 (green)。

## HTML+CSS
```html
<div class="content">
  <!-- (div.row>img:s*3)*3+div.control>(div.msg>span#time+btn+span#combo)+hr+b+p+hr -->
  <div class="row">
    <img src="yellow.png" class="cell" title="yellow"/>
  </div>
  <div class="row">
    <img src="yellow.png" class="cell" title="yellow"/>
  </div>
  <div class="row">
    <img src="yellow.png" class="cell" title="yellow"/>
  </div>
  <div class="control">
    <div class="msg">
      <span id="time">剩餘時間：0s</span>
      <button>遊戲開始</button>
      <span id="combo">成績分數：0</span>
    </div>
    <hr />
    <b>遊戲說明</b>
    <p>打地鼠遊戲，請點擊紅色圖片獲得分數（滿分 100)</p>
    <hr />
  </div>
</div>
```
```css
body{
  margin:0;
  display: flex;
  justify-content: center;
  height:100vh;
  text-align: center;
}
.content{
  display:flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.cell{
  background: yellow;
  border:5px solid #6bd1eb;
  cursor: pointer;
  width:100px;
  height:100px;
}
.control{
  max-width:350px;
}
.msg{
  margin:5px auto;
  display: flex;
  justify-content: space-around;
  line-height: 2rem;
}
button,span{
  width:33%;
}
```

到目前為止你應該能得到以下的版面。
![](https://i.imgur.com/7o5GPAm.png)

---

# 程式規劃之 JS 部分
這裡相對於比較複雜，根據遊戲規則需要拆成多筆處理來判斷。利用 function 分工合作處理。

## 初始宣告
有一些變數我們我們先宣告出來準備好可跨全域，利於所有 function 都能接受使用。包含以下：

1. 按鈕 btn: （偵測/禁止/開放）遊戲開始之點擊
2. 倒數 time: 畫面上的剩餘時間文字
3. 分數 combo: 畫面上的目前分數
4. 旗幟 flag: 解讀目前是遊戲中/未開始
5. 秒數 sec: 遊戲剩餘時間
6. 得分 count: 遊戲累積分數
7. 等待之事件 wait: 陣列型態，收錄 100 筆事件的等待物件
8. 9 格之物件 thedog: 陣列型態，收錄 9 格 DOM 的 HTML 物件

此外除了宣告變數，畫面載入時先給予允許 btn 使用 click。

```javascript
//初始化
var btn=document.getElementsByTagName("button")[0]; //button
var time=document.getElementById("time"); //找到時間
var combo=document.getElementById("combo"); //找到分數
var animal=document.getElementsByClassName("cell");
var flag=0; //判別遊戲狀況 停止 0 遊戲中 1
var sec=0,count=0;
var beYellow=new Array(); //到時候會存放所有 red 事件的轉黃定時器，陣列有 100 個位置
btn.addEventListener("click",gamestart); //規劃點選動作
```

## gamestart 遊戲開始
每次遊戲開始要做以下動作：
1. 先把 flag 打開、分數歸 0、倒數為 60s，並將 DOM 對象的畫面文字修改好。
2. 把 btn 的 click 關閉，避免遊戲重複執行。
3. 規劃倒數器，每 1 秒更新並減少畫面上的 sec。
    - 如果倒數為 0: 此時關閉倒數器，並開放 click 點選，flag 關閉（非遊戲中狀態）
4. 創造出 100 次得分機會。
    - 做好時間軸上的分配，透過隨機方式分散到 0~60 秒（透過延遲觸發）
    - 隨機的指定要到那些位置去，共有 9 格。使用 0~8 數字代表。
    - 每次的得分機會曝光多久，隨機 1~3 秒
    - 觸發時機到達時，去執行另一個函式 showit() 做紅燈事件。

```javascript
function gamestart(){ //遊戲開始
  sec=60,count=0,flag=1;
  time.textContent=`剩餘時間：${sec}`;
  combo.textContent=`成績分數：${count}`;
  btn.removeEventListener("click",gamestart); //關閉 btn，不要再讓人去按他觸發多餘的 gamestart()

  let start=setInterval(()=>{ //控制倒數以及遊戲區間的隔離（按鈕）
    if(sec==0){
      clearInterval(start);
      flag=0;
      btn.addEventListener("click",gamestart);//開啟 btn
    }
    else{
      sec--;
      time.textContent=`剩餘時間：${sec}`;
    }
  },1000);
  
  for(let i=0;i<100;i++){//產生 100 組紅色事件 
    let ontime=Math.floor(Math.random()*57000); //隨機 0~56999 ms
    let which=Math.floor(Math.random()*9);  //隨機 0~8 處
    let delay=Math.floor(Math.random()*3)+2; //隨機 2~4 秒

    setTimeout(function(){
      showit(which,delay,i);
    },ontime);
  }
}
```
這裡設計時間軸範圍 0~57 秒，是為了消耗剩餘機會，避免時間到了還有得分機會發生。

## 觸發紅燈事件
要做紅燈 (red) 需要先檢查，是否指定的位置屬於黃燈狀態 (yellow)，如果不屬於黃燈勢必代表有事件正在運作，我們要思考如何處理手上的孤兒，盡可能的找到合適的位置發生出來（否則無法 60 秒內消耗 100 次機會）。

showit() 需要三個來源變數，分別是：siWhich（哪個位置）,siDelay（曝光時間）,siId（事件編號）。做以下動作：

1. 如果目標位置 who 已經有事件再發生，想辦法塞到別處並晚 0.5 秒處理（遲一下避免迴圈無限可能）
2. 如果目標位置沒有事件，那就進行以下行為
    - 更改 DOM 之事件狀態 (title), 圖片 (src), 機會編號 (alt), 色塊 (BGcolor)
    - 將曝光延遲規畫下去，並利用 wait 陣列紀錄此物件。利於之後需要取消此延遲
    - 曝光後當事件未被得分，調整所有狀態回到 state 模式。

```javascript
function showit(siWhich,siDelay,siId){ //在指定的 siWhitch 位置變成 red 事件
  if(animal[siWhich].title!="yellow"){ //你不是等待 (yellow) 狀態，就不要塞紅色
    // let next=(siWhich==8)?0:siWhich+1; //寫法 1
    // let next=(siWhich+1)%9; //寫法 2
    let next=Math.floor(Math.random()*9);  //隨機 0~8 處

    setTimeout(function(){
      showit(next,siDelay,siId);
    },100);
  }
  else{ //確定該位置是黃色，可以進行紅色事件
    animal[siWhich].src="red.png";
    animal[siWhich].style.background="red";
    animal[siWhich].title="red";
    animal[siWhich].alt=siId;

    beYellow[siId]=setTimeout(() => { //red 多久之後自己變回 yellow
      animal[siWhich].src="yellow.png";
      animal[siWhich].style.background=null;
      animal[siWhich].title="yellow";
      animal[siWhich].alt=null;
    }, siDelay*1000);
  }
}
```
這裡需要透過 beYellow{}去管理延遲事件，是因為在一些場合下會破壞事件的發生和理性。譬如來說：當發生 red 時，延遲 3 秒後改為 yellow，若此時 3 秒內發生 green,yellow,red。此時 red 的曝光時間會不正常。所以我們需要管理某些情況下，要能取消此延遲之變化。

接下來當畫面已經有了`yellow→red` & `red→yellow`事件，我們要開始規劃`red→green` & `green→yellow`事件。不過在這之前，我們需要確認如何取得鍵盤事件

## 鍵盤事件
利用 dom.onkeydown 去跑一個 function 判斷此 event.keycode 為多少。並轉換為針對對象 0~8 之位置事件行為，同時每次要檢查是否屬於遊戲中，才允許去觸發鍵盤事件對應函式。

```javascript
document.onkeydown=keyboard;//每次的鍵盤動作都會送到 keyboard 函式
function keyboard(){
  if(flag){
    switch (event.keyCode) {
      case 103: getcount(0);break;
      case 104: getcount(1);break;
      case 105: getcount(2);break;
      case 100: getcount(3);break;
      case 101: getcount(4);break;
      case 102: getcount(5);break;
      case 97: getcount(6);break;
      case 98: getcount(7);break;
      case 99: getcount(8);break;
    }
  }
}
```

## getcombo 位置事件
進入 getcombo 時需要以下處理：
1. 檢查目標對象是否為 red 狀態（排除亂按導致畫面錯亂），若是 red 才能做更改為 green。
2. 此外也要記得做加分動作。
3. 必須去取消這個 red 狀態當時的延遲 yellow 事件，使得過程狀態完整。舉例來說：
    正確過程　red→green→yellow(by getcombo)->finished
    錯誤過程　red→green→yellow(by beYellow's FN)→red(new event)→...

```javascript
function getcount(who) { // 計分且將紅色變綠色  who=0~8
  if(animal[who].title=="red"){ //確定是遊戲中的紅色事件
    animal[who].src="green.png";
    animal[who].style.background="green";
    animal[who].title="green";

    /*加分*/
    count++;
    combo.textContent=`成績分數：${count}`;

    id=animal[who].alt; //id 1~100
    clearTimeout(beYellow[id]); //清除原先路線的轉黃定時器
    animal[who].alt=null;

    setTimeout(() => { //green 1 秒之後自己變回 yellow
      animal[who].src="yellow.png";
      animal[who].style.background=null;
      animal[who].title="yellow";
    }, 1000);
  }
}
```

恭喜你已完成打地鼠遊戲，此時請思考如何添加滑鼠事件，使得手機螢幕點擊（滑鼠）也能適用。

---
# 手機（滑鼠）模式
透過網路資源取得以下 meta 宣告，這能確保你在手機上連擊兩下禁止畫面放大作業

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

再來調整HTML，直接加入onclick到每個圖片，此時我們很清楚getcode對象是誰
```html
<div class="row">
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(0)"/>
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(1)"/>
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(2)"/>
</div>
<div class="row">
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(3)"/>
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(4)"/>
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(5)"/>
</div>
<div class="row">
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(6)"/>
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(7)"/>
  <img src="yellow.png" class="cell" title="yellow" onclick="getcount(8)"/>
</div>
```

接著由於滑鼠事件直接到 getcombo 處理了，flag 這個部分我們要調整一下檢查關卡往後一步到 getcombo 去處理。

修改 keyboard(){}，拿掉 flag 檢查，往後一部統一由 getcombo 做檢查，改為
```javascript
function keyboard() {//鍵盤動作轉為 who 對象編號
  switch (event.keyCode) {
    case 97:
      getcombo(6);break;
    case 98:
      getcombo(7);break;
    case 99:
      getcombo(8);break;
    case 100:
      getcombo(3);break;
    case 101:
      getcombo(4);break;
    case 102:
      getcombo(5);break;
    case 103:
      getcombo(0);break;
    case 104:
      getcombo(1);break;
    case 105:
      getcombo(2);break;
  }
}
```

修改 getcombo 增加 flag 的判斷，可以跟原判斷合併執行
```javascript
function getcount(who) { // 計分且將紅色變綠色  who=0~8
  if(animal[who].title=="red"&&flag==1){ //確定是遊戲中的紅色事件
    animal[who].src="green.png";
    animal[who].style.background="green";
    animal[who].title="green";

    /*加分*/
    count++;
    combo.textContent=`成績分數：${count}`;

    id=animal[who].alt;
    clearTimeout(beYellow[id]); //清除原先路線的轉黃定時器
    animal[who].alt=null;

    setTimeout(() => { //green 1 秒之後自己變回 yellow
      animal[who].src="yellow.png";
      animal[who].style.background=null;
      animal[who].title="yellow";
    }, 1000);
  }
}
```

{% note default %}
**示範參考：** 
- [View Full Code](https://github.com/summer10920/skillStudies_JS_WebDemo/tree/master/whackMole)
- [DEMO Page](https://summer10920.github.io/skillStudies_JS_WebDemo/whackMole/)
{% endnote %}