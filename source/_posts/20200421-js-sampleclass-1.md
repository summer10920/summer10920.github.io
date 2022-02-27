---
title: "[練習課程] JavaScript 實作（一）：全版面廣告與 Cookie 紀錄"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-21 12:14:22
---
![](https://i.imgur.com/D8v3RVP.png)
本篇介紹如何在一個網站能展現出全版面視窗廣告，同時而外的進階利用 cookie 去分析多久內不再出現廣告避免用戶嫌棄。在那之前你需要準備一張任一圖片（可參考蝦皮購物）

<!-- more -->

大致步驟如下：
1. 設計一個含有內容的 HTML 文件，內容不拘。
2. 找到適合的位置規劃大`<div>`，裡面有廣告圖片，並利用 CSS 功能使滿版並半透明背景
3. 同上，裡面還有一個按鈕，可以觸發 JS 事件關閉這個大`<div>`使其 display:none
4. 再來結合 cookie 功能，針對時效性使這個大 div+JS 不再出現
---

# 規劃有內容的 HTML
你可以挑選一個喜歡的 Youtube 影片當作我們的內容（或者任何的 HTML 內容都可）。直接使用的使用一個 div 去 iframe API 塞入 youtube，畫面隨意的有資料即可。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div class="main">
    <iframe frameborder="0" height="100%" width="100%" src="https://www.youtube.com/embed/VCrVvfLMQSs?autoplay=1"></iframe>
  </div>
</body>
</html>
```
```css
body {
  margin: 0;
}
/*內容區*/
.main{
  position: fixed;
  width: 100%;
  height: 100%
}
```

> 你可以透過網址參數對 Youtube 進行相關調整 https://developers.google.com/youtube/player_parameters
---

# 規劃 div 廣告區
最好是在 document 一開始就放入此 div，這樣網頁讀取先跑廣告，如果網頁資料多時還有緩衝效果。主要以下設計。
1. 廣告的圖片可以超連結到某地方去
2. 有個關閉的 X 按鈕（利用 font-icon 來完成），可以幫助我們關閉廣告
  > https://material.io/resources/icons/?search=close&icon=close&style=baseline
3. 如果點選圖片以外的地方也要能關閉廣告

```html
<div id="myFull" onclick="adclose()">
  <div id="myContent">
    <img src="https://www.nintendo.tw/switch/animal_crossing_new_horizons/assets/images/top/visual_logo__sp.png" onclick="adgoto()"/>
    <div id="adClose"><i class="material-icons">close</i></div>
  </div>
</div>
<div class="main">
  <iframe frameborder="0" height="100%" width="100%"
    src="https://www.youtube.com/embed/VCrVvfLMQSs?autoplay=1"></iframe>
</div>
```
```css
/*遮罩區*/
#myFull {
  background-color: rgba(35,35,35,0.9);
  width: 100vw;
  height: 100vh;
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
/*廣告區*/
#myContent {
  cursor: pointer;
  position:relative;
}

#myContent img {
  max-width: 40vw;
  max-height: 40vh;
}

#adClose {
  position: absolute;
  right:-1rem;
  top:-1rem;

  background: #eee;
  border-radius: 50%;
  border: 3px solid #000;
  line-height: 0;
}

#adClose:hover {
  background: #ccc;
}
```

# 廣告區的點擊事件
HTML 部分我們已經先寫好了 event 事件，所以對應到兩個 function 作業，分別是網址轉址以及 disaply 隱藏。

```javascript
function adclose() {
  document.getElementById("myFull").style.display = "none";
}
function adgoto() {
  window.open("https://www.nintendo.tw", "_blank");
}
```

目前為止，你已經可以成功控制廣告的關閉作業。此時有些設計師不喜歡在 HTML 太明顯在做什麼事件，你可以思考如何使 event 事件不要這麼明顯。

添加到 JS 內，同時已可以將 HTML 的 event 宣告都清除掉。
```javascript
// 這裡能替代不透過 HTML 去寫，而是直接用 JS 去指定 event 的動作要求。
document.getElementById("myFull").onclick = adclose; //以 JSDOM 方式去指定該物件的 onclick 響應為何
document.getElementById("myContent").getElementsByTagName("img")[0].onclick = adgoto; //以 JSDOM 方式去指定該物件的 onclick 響應為何
document.getElementById("myClose").onclick = adclose; //以 JSDOM 方式去指定該物件的 onclick 響應為何
```

# Cookie 評估 24H 不顯示
JS 也可以使用 cookie，但相對於 PHP 來說讀取方式較為麻煩（因為 JS 很早就有 COOKIE 的定義）。先理解 Cookie 的使用方式：

{% note danger %}
**新手陷阱：**
不可直接用檔案開啟方式執行 html 閱讀，要使用 WebServer 方式走 http 請求，來能被瀏覽器許可 cookie 使用。
{% endnote %}

```javascript
/*select*/
console.log(document.cookie); //可以看到目前有哪些

/*insert*/
document.cookie="watchedAd=no"; //寫入 cookie 某變數 watchAd=yes

/*update*/
document.cookie="watchedAd=yes"; //再一次覆蓋就好

/*delete*/
//指定 N 秒無效的時間 UTC，所以先利用 date()->變數 d->跑出一個無效時間，再轉 UTC 表示法

var dd = new Date();
lifeSec = 5; //N=5
dd.setTime(dd.getTime()+(lifeSec * 1000)); //d 取得 (get) 更新回存 (set) 到 d

//dd.toUTCString() <=> "Wed, 24 Jul 2019 09:14:41 GMT"
document.cookie="watchedAd=yes;expires="+dd.toUTCString(); 
```

由於 select 是一次全部參數都跑出來，你要確認某變數是否存在於 cookie 內，甚至想要取得值。會比較麻煩需要額外處理。你可以走以下方式：

1. 透過 PHP 來處理 cookie，在生成之前就已經提供 Cookie 給瀏覽器。
2. 透過仿間高手設計的 js 外掛（函式庫），只要簡單的使用就能有效控制 cookie。
3. 透過 JQ 來進行 cookie 控制
4. 自己動手寫吧，以下示範能堪用就好。

設計可找到 COOKIE 的函式，提供兩種方法則一即可：
```javascript
// 方法1
function findCook1(name) {
  var ckary = document.cookie.split("; "); //割除分開為array
  var getck = ckary.find(function (e) {
    return (name + "=" === e.substr(0, name.length + 1)); //比對每個開頭名字且下符號為等於，並且長度一致時，第一個就回傳設定為getck
  });

  if (getck != undefined) return getck.split("=")[1];
  // var value = getck.split("="); //將=拿掉分為陣列，第[1]格就是我們的值
  // return value[1];
  else return false;
}
// 方法2
function findCook2(name) {
  let ckary = document.cookie.split("; "); //根據關鍵字將字串割除分開為 array　，然後轉JSON
  let objCookie = new Object(); //產生空物件
  ckary.forEach(e => {
    let kv = e.split("=");
    objCookie[kv[0]] = kv[1];
  });
  if (name in objCookie) return objCookie[name]; //我們要回傳字串且不可使用 objCookie.name
  else return false;
}
```

最後，就能開始設計每次載入時，設計判斷是否已經有了 cookie，最對應的 document 顯示調整。
若要增加此 cookie，同時指定有效到今晚午夜前

```javascript
//開始指定 cookie，有同時有效時間為午夜前
var eatCook=findCook1("watchedAd");
if(!eatCook){//還沒有設定
  var end = new Date(); //先取得現在，再修改成午夜前的時間（以 UTC 時區+0 為值）
  end.setHours(23),end.setMinutes(59),end.setSeconds(59);
  document.cookie = "watchedAd=yes;expires=" + end.toUTCString();
}
else document.getElementById("adFull").remove();//移除該廣告 div
```
---
{% note default %}
**示範參考：**
- [View Full Code](https://github.com/summer10920/studies_TeachDemo_JS/tree/master/adCookie)
- [DEMO Page](https://summer10920.github.io/studies_TeachDemo_JS/adCookie/)
{% endnote %}