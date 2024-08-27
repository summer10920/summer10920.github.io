---
title: "[練習課程] JavaScript 實作（三）：類比時鐘設計"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-22 00:55:05
---
![](assets/images/D8v3RVP.png)
本篇介紹四種寫法，難度不高，主要是如何指定指針之初始位置。以及透過何種方法使指針自動更改旋轉角度。
<!-- more -->

# CSSAnimation+雙 DIV 表示法

1. CSSAnimation 是拿來做為指針自轉的功能，速度要算好
2. 雙 DIV 是為了幫助外面 DIV 自我中心旋轉，使得指針可偏移角度

## HTML+CSS
```html
<div class="circle">
  <div class="zmin1"><div class="jmin1"></div></div>
  <div class="zhour1"><div class="jhour1"></div></div>
  <div class="zsec1"><div class="jsec1"></div></div>
  <h3>CSS Animation + 雙 DIV<br />表示法</h3>
  <p>父 div 做中心旋轉，子 div 定位在父內的偏斜位置上。導致視覺上的子 div 進行旋轉時，有中心偏移效果</p>
</div>
```
```css
body {
  margin: 0;
  background: #ccc;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 100vh;
  /* align-content: center; */
}
.circle {
  /*圓盤底*/
  width: 300px;
  height: 300px;
  background: white;
  border-radius: 300px;
  margin: 20px;
  padding: 20px;
  position: relative;
}
h3 {
  text-align: center;
  position: relative;
  z-index: 999;
}
.jhour1 {
  /*時針*/
  width: 10px;
  height: 30%;
  background: #00f;
  position: absolute;
  left: 50%;
  top: 25%;
  margin-left: -5px;
}
.jmin1 {
  /*分針*/
  width: 10px;
  height: 40%;
  background: #0f0;
  position: absolute;
  left: 50%;
  top: 15%;
  margin-left: -5px;
}
.jsec1 {
  /*秒針*/
  width: 4px;
  height: 50%;
  background: #f00;
  position: absolute;
  left: 50%;
  top: 5%;
  margin-left: -2px;
}
.zsec1 {
  width: 300px;
  height: 300px;
  position: absolute;
  animation: j_s 60s infinite linear;
}
.zmin1 {
  width: 300px;
  height: 300px;
  position: absolute;
  animation: j_m 3600s infinite linear;
}
.zhour1 {
  width: 300px;
  height: 300px;
  position: absolute;
  animation: j_h 43200s infinite linear;
}
```
## JS 部分
接著 JS 這裡則是負責將編寫 css 的 keyframes 的出發角度，因此不容易透過 DOM 去調整。這裡我們<mark>把 Script 標籤放在 head 內</mark>，利用 document.write 來達到 style 編寫。

```html
<script>
  /*
  * JS 時分秒每個時間位置先換算角度
  * 分秒的總位置共 60 個，每個位置變化角度 360°/60=6°
  * 時的總位置變化共 12*60	（每分鐘會移動，所以 24 大格內，每大格有 60 小格，但 12 小時就跑完一圈只需算 12 大格）
  * 時針位置"每 1 分"角度小變化 (360°/12)/60=0.5°
  * 分針位置"每 1 秒"角度小變化 (360°/12/5)/60=0.1°
  * 
  * 秒針位置"每 1 秒"角度變化 (360°)/60=6°
  * 
  * 舉例 23:59:59 秒：
  *   秒的位置=>59*6=354°
  *   分的位置=>59*6+59*0.1°
  *   時的位置=>(23*30)+(59*0.5)=719.5=360+359.5°
  */
  var time = new Date();
  var pos_s = time.getSeconds();
  var pos_m = time.getMinutes();
  var pos_h = time.getHours();
  var x = pos_s * 6;
  var y = pos_m * 6 + pos_s * 0.1; /*對 Y 來說還有一個角度是 60 秒滿足 6 度*/
  var z = pos_h * 30 + pos_m * 0.5; /*對 Z 來說還有一個角度是 60 分鐘滿足 30 度*/
  document.write(`
    <style>
      @keyframes j_s {
        from {transform: rotate(${x}deg);}
        to {transform: rotate(${360 + x}deg);}
      }
      @keyframes j_m {
        from {transform: rotate(${y}deg);}
        to {transform: rotate(${360 + y}deg);}
      }
      @keyframes j_h {
        from {transform: rotate(${z}deg);}
        to {transform: rotate(${360 + z}deg);}
      }
    </style>
  `);
</script>
```
---
# CSSAnimation+圖片堆疊表示法
1. CSSAnimation 跟前者相同（利用 JS 控制時間初始角度+animation 相符速度自轉）
2. 圖片堆疊主要是探討一個 div 規劃中心自轉，利用圖片的透背設計來彌補中心偏移的問題。

## HTML+CSS
```html
<div class="circle">
  <div class="jmin2"></div>
  <div class="jhour2"></div>
  <div class="jsec2"></div>
  <h3>CSS Animation + 圖片堆疊<br />表示法</h3>
  <p>透過圖片透明，使得旋轉中心不變但有色區域，有中心偏移效果</p>
</div>
```
```css
.jhour2 {
  /*時針*/
  width: 16px;
  height: 300px;
  background: url("hh.png");
  position: absolute;
  left: 50%;
  margin-left: -8px;
  animation: j_h 43200s infinite linear;
}
.jmin2 {
  /*分針*/
  width: 16px;
  height: 300px;
  background: url("mm.png");
  position: absolute;
  left: 50%;
  margin-left: -8px;
  animation: j_m 3600s infinite linear;
}
.jsec2 {
  /*秒針*/
  width: 16px;
  height: 300px;
  background: url("ss.png");
  position: absolute;
  left: 50%;
  margin-left: -8px;
  animation: j_s 60s infinite linear;
}
```

## JS 部分
相同運作原理，與前者共用即可

---
# CSSAnimation+中心偏移表示法
1. CSSAnimation 跟前者相同（利用 JS 控制時間初始角度+animation 相符速度自轉）
2. 利用 css 去重新定義 div 的旋轉中心偏移位置

## HTML+CSS
```html
<div id="cirtle">
  <div class="jmin1 omin3"></div>
  <div class="jhour1 ohour3"></div>
  <div class="jsec1 osec3"></div>
  <h3>CSSAnimation+中心偏移<br>表示法</h3>
  <p>補充屬性 transform-origin 真正讓旋轉的中心點偏移</p>
</div>
```

CSS 共用到第一招的 css 的指針，只是多補充一個中心定位。
```css
.ohour3 {
  animation: j_h 43200s infinite linear;
  transform-origin: 50% 82px;
}
.omin3 {
  animation: j_m 3600s infinite linear;
  transform-origin: 50% 116px;
}
.osec3 {
  animation: j_s 60s infinite linear;
  transform-origin: 50% 150px;
}
```

## JS 部分
相同運作原理，與前者共用即可。

---
# setInterval+中心偏移表示法
1. 利用 js 的重複延遲執行去重新指定指針位置。這裡是每秒更新，會造成有停留效果（如果你要移動連續，則間格時差要算小些）
2. 與前者共用即可。

## HTML+CSS
```html
<div id="cirtle">
  <div class="jmin1 omin4"></div>
  <div class="jhour1 ohour4"></div>
  <div class="jsec1 osec4"></div>
  <h3>setInterval+中心偏移<br>表示法</h3>
  <p>補充屬性 transform-origin，而不使用 kerfram 反而透過 setInterval 來執行</p>
</div>
```

CSS 與前者的 CSS 差不多，只差別於不再利用 CSS 動畫完成自轉。
```css
.ohour4 {
  transform-origin: 50% 82px;
}
.omin4 {
  transform-origin: 50% 116px;
}
.osec4 {
  transform-origin: 50% 150px;
}
```

## JS 部分
這裡就重新編輯每次的指針位置，放置在 body 內即可。初始時要先算一次位置（借用前者 JS 出現過的`pos_s`,`pos_s`,`pos_s`)，但之後需重新每秒取得新的`pos_s`,`pos_s`,`pos_s`再透過 DOM 去修改角度。

```javascript
/*初始先 ON 一遍 DOM*/
document.getElementsByClassName('osec4')[0].style.transform=`rotate(${x}deg)`;
document.getElementsByClassName('omin4')[0].style.transform=`rotate(${y}deg)`;
document.getElementsByClassName('ohour4')[0].style.transform=`rotate(${z}deg)`;

/*跑 reply*/
function overtime(){
  time = new Date();
  pos_s = time.getSeconds();
  pos_m = time.getMinutes();
  pos_h = time.getHours();
  x = pos_s * 6;
  y = pos_m * 6 + pos_s * 0.1; /*對 Y 來說還有一個角度是 60 秒滿足 6 度*/
  z = pos_h * 30 + pos_m * 0.5; /*對 Z 來說還有一個角度是 60 分鐘滿足 30 度*/
  document.getElementsByClassName('osec4')[0].style.transform=`rotate(${x}deg)`;
  document.getElementsByClassName('omin4')[0].style.transform=`rotate(${y}deg)`;
  document.getElementsByClassName('ohour4')[0].style.transform=`rotate(${z}deg)`;
}

var loop=setInterval(overtime,1000);

function ctl(who) {
  if(who.textContent=="STOP"){
    clearInterval(loop);
    who.textContent="PLAY";
  }
  else{
    loop=setInterval(overtime,1000);
    who.textContent="STOP";
  }
}
```
---
{% note default %}
**示範參考：** 
- [View Full Code](https://github.com/summer10920/studies_TeachDemo_JSJQ/tree/master/vanillaJS/analogClock)
- [DEMO Page](https://summer10920.github.io/studies_TeachDemo_JSJQ/vanillaJS/analogClock/)
{% endnote %}