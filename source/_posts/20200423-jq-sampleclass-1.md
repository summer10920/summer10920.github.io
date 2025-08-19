---
title: "[練習課程] jQuery 基礎實作（一）：網頁乙級相關範例"
categories:
  - 職訓教材
  - jQuery
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-23 15:14:46
---
![](assets/images/banner/jquery.png)

透過前篇的 JQuery 基本概念，你已經能開始看得懂 jQuery 在做什麼以及能做什麼，本篇會利用網頁設計乙級題目來進行撰寫練習，過程中你能碰到一些常見的商務網站的局部功能設計。另外請注意，這裡介紹的設計因追求實完整性程式偏向複雜，因此不適合應考解答所使用（時間成本）。
<!-- more -->

{% note danger %}
**題庫內容：**
資料由於來自解析之後端資料庫取得，這裡為了簡化並重視前端開發設計，皆已預設假設性以取得，並透過外部 JSON 檔案方式完成取得相關數據。這裡不再演示如何從資料庫取得資料。
{% endnote %}

{% note primary %}
**取得 JSON 方式：透過以下寫法你可以將 JSON 檔案匯入至你的 JavaScript 代碼內** 
```javascript data.json
//將資料以 JSON 格式編寫，並存檔為 *.json
{ "key" : "value" }
```
```html demo.html
<script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
<script>
  var myjson = null;
  $.getJSON("data.json", function (result) {
    myjson = result;
  });
</script>
```
{% endnote %}

{% note default %}
**取得相關考題資源：**
- 技能檢定「術科」參考資料 - https://techbank.wdasec.gov.tw/owInform/TestReferData.aspx
- 17300 - 網頁設計乙級 術科題目 https://techbank.wdasec.gov.tw/owInform/DLowFile/173002B10.pdf
- 17300 - 網頁設計乙級 素材檔 https://techbank.wdasec.gov.tw/owInform/DLowFile/173002B11.7z
{% endnote %}

---
# 題組一：卓越科技大學
我們開始會利用題庫出現的 JavaSript 來進行練習設計。且盡可能使用 jQuery 來編寫完成。

## T5: 動畫圖片輪播
1. 要多個 gif 進行畫面輪播
2. 已知透過 html5 標籤 embed 能進行類型播放，一次只能播放一筆媒體。
3. 需依賴 JavaSript 進行 3 秒替換一次 embed（需重新編寫 HTML，因暫存問題若只抽換 src 並無用）。

### 原問題素材
```html
<!--正中央-->
<script>
  var lin = new Array();
  var now = 0;
  if (lin.length > 1) {
    setInterval("ww()", 3000);
    now = 1;
  }
  function ww() {
    $("#mwww").html("<embed loop=true src='" + lin[now] + "' style='width:99%; height:100%;'></embed>")
    //$("#mwww").attr("src",lin[now])
    now++;
    if (now >= lin.length)
      now = 0;
  }
</script>
<div style="width:100%; padding:2px; height:290px;">
  <div id="mwww" loop="true" style="width:100%; height:100%;">
    <div style="width:99%; height:100%; position:relative;" class="cent">沒有資料</div>
  </div>
</div>
```

### 設計練習

1. 取得 data.json 資源，並於主頁中透過 ajax 取得。
```javascript data.json
{
  "q1t5": [
    "img/01C01.swf",
    "img/01C02.swf",
    "img/01C03.swf",
    "img/01C04.swf",
    "img/01C05.gif",
    "img/01C06.gif"
  ]
}
```
```javascript index.html
    $.getJSON("17300_data.json", function (result) {
      todo(result.q1t5);
    });
    function todo(myjson) { //解決非同步問題
      //將於 ajax 之後執行的代碼放置於此。..
    }
```
2. 建議 DOM 要先出來其次才跑 JS ，原素材顛倒可能會導致 DOM 初次失敗。
3. 簡化不必要的內容，像是#mwww 的 HTML 我們會換掉，所以內容拔掉 div 換成純文字就好。
```html index.html
<!--正中央-->
<div style="width:100%; padding:2px; height:290px;">
  <div id="mwww" loop="true" style="width:100%; height:100%;">
    沒有資料
  </div>
</div>
```
4. 如果有陣列長度超過 1 代表有多筆需要輪播
5. 將資料陣列存到 lin 並檢查有無內容，有內容才開始進行替換 HTML。
6. 試著優化程式更簡潔並易理解
```javascript index.html
$.getJSON("17300_data.json", function (result) {
  todo(result.q1t5);
});

function todo(myjson) { //解決非同步問題
  //將於 ajax 之後執行的代碼放置於此。..
  var lin = myjson;
  if (lin.length) {
    $("#mwww").html("<embed loop=true src='" + lin[0] + "' style='width:99%; height:100%;'></embed>")
  }
  if (lin.length > 1) {
    let now = 1;
    setInterval(() => {
      $("#mwww embed").attr("src", lin[now]);
      now = (now + 1) % lin.length;
    }, 3000);
  }
}
```

## T6: 校園映像
1. 題目沒有提供 HTML，需自行設計 HTML 框架，預設只有 3 張圖片顯示其他隱藏
2. 有上下按鈕能提供 event 進行切換圖片那些 show 那些 hide。

### 原問題素材
```html
<div style="width:89%; height:480px;" class="dbor">
  <span class="t botli">校園映象區</span>
  <script>
    var nowpage = 0, num = 0;
    function pp(x) {
      var s, t;
      if (x == 1 && nowpage - 1 >= 0) { nowpage--; }
      if (x == 2 && (nowpage + 1) * 3 <= num * 1 + 3) { nowpage++; }
      $(".im").hide()
      for (s = 0; s <= 2; s++) {
        t = s * 1 + nowpage * 1;
        $("#ssaa" + t).show()
      }
    }
    pp(1)
  </script>
</div>
```

### 設計練習
1. 這裡跟乙級解析做法不同，此時希望透過皆由前端的 DOM 來完整建構資料。
```javascript data.json
{
  //...
  "q1t6": [
    "img/01D01.jpg",
    "img/01D02.jpg",
    "img/01D03.jpg",
    "img/01D04.jpg",
    "img/01D05.jpg",
    "img/01D06.jpg",
    "img/01D07.jpg",
    "img/01D08.jpg",
    "img/01D09.jpg",
    "img/01D10.jpg"
  ]
}
```
2. 先將 HTML 版型設計出來，主要有多張圖片且 class 與 id 能被 JavaSript 所控制
3. 調整父容器為 `width:150px;text-align:center;`，高度懶得算的話可不用限定。
```html
<div style="width:150px;text-align: center;" class="dbor">
  <span class="t botli">校園映象區</span>
  <div>
    <img src="img/01E01.jpg" onclick="pp(1)">
    <div id="imglist">
      <!-- 大概 div 內長這樣 -->
      <!-- 
      <img class="im" id="ssaa0" src="img/01D01.jpg" width="150" height="103">
      <img class="im" id="ssaa1" src="img/01D02.jpg" width="150" height="103">
      <img class="im" id="ssaa2" src="img/01D03.jpg" width="150" height="103">
      <img class="im" id="ssaa3" src="img/01D04.jpg" width="150" height="103">
      <img class="im" id="ssaa4" src="img/01D05.jpg" width="150" height="103">
      <img class="im" id="ssaa5" src="img/01D06.jpg" width="150" height="103">
      -->
    </div>
    <img src="img/01E02.jpg" onclick="pp(2)">
  </div>
  <script>...</script>
</div>
```
4. 接著先透過 json 將資料以 DOM 方式寫入到指定的 DIV 位置
5. 額外的用變數記住預設 nowpage 為 0，num 為圖片總數。
6. 一開始先讓畫面顯示出來，我們固定全部隱藏，只顯示 id 號碼 0~2 即可。
7. 再來透過 pp 函式，在確認有效點擊使用特效滑入滑出做對應，要確認 id 號碼的變化。
8. 最後我們示範對 pp 按鈕做一下 CSS 的滑鼠補充。
```javascript index.html
var nowpage = 0, num = 0;
$.getJSON("17300_data.json", function (result) {
  todo(result.q1t6);
});
function todo(myjson) {

  // 資料 DOM 建構化
  for (let i = 0; i < myjson.length; i++) {
    $("#imglist").append(`<img class="im" id="ssaa${i}" src="${myjson[i]}" width="150" height="103">`);
  }

  // 初始化顯示隱藏
  $(".im").hide();
  for (let s = 0; s < 3; s++) $(`#ssaa${s}`).show();
  num = myjson.length;
}

function pp(x) {
  //向上時，N-1's show & N's hide
  if (x == 1 && nowpage > 0) {
    nowpage--;
    $(`#ssaa${nowpage}`).slideToggle("slow");
    $(`#ssaa${nowpage + 3}`).slideToggle("slow");
  }
  //向下時，N's hide & N+3's show
  if (x == 2 && nowpage < num - 3) {
    $(`#ssaa${nowpage}`).slideToggle("slow");
    $(`#ssaa${nowpage + 3}`).slideToggle("slow");
    nowpage++;
  }
}
//優化滑鼠效果
$("img[onclick^='pp']").css('cursor', 'pointer');
```
9. 如果要好看，可以先消除 img 的 4px 間距（透過 flex)
```html
...
<div style="display:flex;flex-direction:column;align-items:center;">
  <img src="img/01E01.jpg" onclick="pp(1)">
  <div id="imglist" style="display:flex;flex-direction:column;margin:5px 0">...</div>
  <img src="img/01E02.jpg" onclick="pp(2)">
</div>
...
```

## T11: 新增帳密
原解析沒有要求此功能設計，此功能適合拿來進行教材示範，如何在表單送出前進行資料驗證。此外額外的增加密碼長度需大於 8 之檢查。

### 設計練習
1. HTML 部分示範簡單 form 表單之送出設計，這裡使用 get 示意即可理解送出結果
```html
<form method="get">
  <p>新增管理者帳號</p>
  <p>帳號 ： <input name="acc" type="text"></p>
  <p>密碼 ： <input name="pwd" type="password"></p>
  <p>確認密碼 ： <input name="pwdcheck" type="password"><br><b style="color:red"></b></p>
  <p><input value="新增" type="submit"><input type="reset" value="重置"></p>
</form>
```
2. 偵測到 submit 事件時，做函式處理進行欄位內容判斷。
3. 如果 sumbit() 參數為 false 時，submit 攔截不成立。反之 ture 成立。
```javascript
$("form").submit(function() {
  let aa = $("input[name=pwd]"),
    bb = $("input[name=pwdcheck]");

  if (aa.val() != bb.val()) {
    bb.siblings('b').text('你的密碼不一致');
    return false;
  }
  if (aa.val().length < 8) {
    bb.siblings('b').text('密碼長度最少 8 個');
    return false;
  }
});
```
---
# 題組二：健康促進網
我們開始會利用題庫出現的 JavaSript 來進行練習設計。且盡可能使用 jQuery 來編寫完成。

## T12: 人氣文章內容預覽
1. 題目要求的浮現預覽之素材在題組一出現過可沿用
2. 本篇將藉由此素材重新設計優化作為練習

### 原問題素材
```html 01P03.htm
<div id="alt"
  style="position: absolute; width: 350px; min-height: 100px; word-break:break-all; text-align:justify;  background-color: rgb(255, 255, 204); top: 50px; left: 400px; z-index: 99; display: none; padding: 5px; border: 3px double rgb(255, 153, 0); background-position: initial initial; background-repeat: initial initial;">
</div>
<script>
  $(".sswww").hover(
    function () {
      $("#alt").html("" + $(this).children(".all").html() + "").css({ "top": $(this).offset().top - 50 })
      $("#alt").show()
    }
  )
  $(".sswww").mouseout(
    function () {
      $("#alt").hide()
    }
  )
</script>
```
### 設計練習
1. 資料提取進行資料物件化，並轉換為 JSON 格式提供 JavaSript 使用，需注意 JSON 沒有支援斷行，所以記得替換成`<br>`先：
```javascript 17300_data.json
"q2t11": {
    "缺乏運動已成為影響全球死亡率的第四大危險因子":"缺乏運動已成為影響全球死亡率的第四大危險因子-國人無規律運動之比率高達 72.2%<br>資料來源： 行政院衛生署國民健康局 <br>發佈日期： 2012 / 10 / 07<br>世界衛生組織指出運動不足已成全球第四大致死因素，每年有 6%的死亡率與運動不足有關，僅次於高血壓（13％）、菸品使用（9％）及高血糖（6％）之後，有超過 200 萬死亡人數可歸因於靜態生活。世界上約 60-85％的成人過著靜態生活，三分之二的兒童運動不足，未來都將影響健康並造成公共衛生問題。運動不足除了增加死亡率，還會使心血管疾病、糖尿病、肥胖的風險加倍，並增加大腸癌、高血壓、骨質疏鬆、脂質失調症（lipid disorders）、憂鬱、焦慮的風險。大約 21-25％乳癌及大腸癌、27%糖尿病與 30％的缺血性心臟病，係因運動不足所造成。許多國家運動不足的人口比率，也正不斷地增加，依據行政院體育委員會 2011 年運動城巿調查結果顯示，國人無規律運動習慣之比率高達 72.2%。<br>我國十大死因的危險因子皆與運動不足有關，運動的好處很多，可以預防慢性疾病，降低罹患癌症、跌倒的風險等。國家衛生研究院溫啟邦教授利用台灣一個大型的追蹤世代，分析各個不同運動量的健康效益。研究發現，與不運動的人相比，每天運動 15 分鐘（每週約 90 分鐘）是可以減少 14%總死亡、10%癌症死亡及 20%的心血管疾病死亡，延長 3 年壽命。這些好處不但適用於各個年齡層包括年青人、年老人，也適用於男性與女性，對有心血管疾病風險的人包括吸菸、肥胖者，也一樣有用。<br>國民健康局鼓勵民眾養成規律運動習慣，對於預防心血管疾病、糖尿病、高血脂以及高血壓等，都有顯著的效益，並可降低罹患癌症的風險，加速代謝脂肪，強化肌肉組織與功能，維持健康體重，提高腦內啡的釋放，降低情緒壓力。一般而言，成人只要每週運動累積達 150 分鐘、兒童每日運動累積 60 分鐘，就能有足夠的運動量，建議成人每天運動 30 分鐘，可分段累積運動量，效果與一次做完一樣。例如上下班（學）通勤時間與中午休息時間分段進行，每次 15 分鐘分 2 次或是每次 10 分鐘分 3 次完成，只要每天持之以恆，健康體能就會大大地提昇。<br>許多上班族時常抱怨沒時間或空間運動，國民健康局製作 15 分鐘「上班族健康操」，不受場地、服裝的限制，每天上、下午各跳 15 分鐘健康操，可消耗 100 大卡的熱量，持續 1 年，約可減少 4 公斤，不但消耗過多熱量，還能促進身體健康。國民健康局為幫助同仁達到規律運動，運用電腦提示系統，於每天上午 9 時 45 分及下午 3 時 45 分，電腦螢幕會自動跳出「上班族健康操」畫面，鼓勵同仁暫時放下手邊的工作，隨著音樂一起動一動。<br>對於沒有運動習的民眾，「健走」也是很好的入門運動，衛生署國民健康局自 91 年起推動「每日一萬步 健康有保固」，「健走」是既簡單又輕鬆的運動，不需特殊裝備，只要穿著輕便服裝、運動鞋，運用「抬頭挺胸縮小腹、雙手微握放腰部、自然擺動肩放鬆、邁開腳步向前行」健走小口訣，以 4 公里/小時的速度，日行萬步，只要 90 分鐘，步行約 6 公里，就可以消耗約 300 大卡，走向健康。<br>國民健康局並介紹運動生活化之小撇步，協助民眾落實生活化的運動。<br>1. 從日常生活中找出時間來活動，例如：步行買午、晚餐、水果、日用品；步行去用餐；蹓狗。<br>2. 外出或是上下班（學）不妨多多利用大眾運輸工具，讓自己提早出門提前一站下車，步行至目的地。<br>3. 可以走樓梯就不要坐電梯，如果一下子沒辦法走這麼多樓梯，步行走上幾層樓後再搭乘電梯，慢慢增加自己的運動量。<br>4. 多和家人到戶外活動，或騎腳踏車、打球等活動。<br>5. 假日可以自己動手整理家裡、擦擦地板，也可以增加運動量！或利用掃地、拖地時加大動作幅度，那也是很好的身體活動。<br>6. 在家裡、辦公室附近找方便的資源運動，包括公園、職場辦的課程、活動。<br>7. 減少看電視、打電玩等靜態生活的時間。<br>    民眾對運動如有疑問，可參考國民健康局肥胖防治網-「快樂動」(http://obesity.bhp.gov.tw)，亦可撥打免費市話健康體重管理電話諮詢服務，諮詢專線「0800-367-100（0800-瘦落去-要動動）」，也可利用國民健康局局網首頁或肥胖防治網問題諮詢專區的網路電話撥入功能，向客服人員諮詢關於運動、健康飲食及健康體重管理等相關疑問。",
    "菸害防治法規": "第二十三條　　違反第五條或第十條第一項規定者，處新臺幣一萬元以上五萬元以下罰鍰，並得按次連續處罰。<br>第二十四條　　製造或輸入違反第六條第一項、第二項或第七條第一項規定之菸品者，處新臺幣一百萬元以上五百萬元以下罰鍰，並令限期回收；屆期未回收者，按次連續處罰，違規之菸品沒入並銷毀之。<br>販賣違反第六條第一項、第二項或第七條第一項規定之菸品者，處新臺幣一萬元以上五萬元以下罰鍰。<br>第二十五條　　違反第八條第一項規定者，處新臺幣十萬元以上五十萬元以下罰鍰，並令限期申報；屆期未申報者，按次連續處罰。<br>規避、妨礙或拒絕中央主管機關依第八條第二項規定所為之取樣檢查（驗）者，處新臺幣十萬元以上五十萬元以下罰鍰。<br>第二十六條　　製造或輸入業者，違反第九條各款規定者，處新臺幣五百萬元以上二千五百萬元以下罰鍰，並按次連續處罰。<br>廣告業或傳播媒體業者違反第九條各款規定，製作菸品廣告或接受傳播或刊載者，處新臺幣二十萬元以上一百萬元以下罰鍰，並按次處罰。<br>違反第九條各款規定，除前二項另有規定者外，處新臺幣十萬元以上五十萬元以下罰鍰，並按次連續處罰。<br>第二十七條　　違反第十一條規定者，處新臺幣二千元以上一萬元以下罰鍰。<br>第二十八條　　違反第十二條第一項規定者，應令其接受戒菸教育；行為人未滿十八歲且未結婚者，並應令其父母或監護人使其到場。<br>無正當理由未依通知接受戒菸教育者，處新臺幣二千元以上一萬元以下罰鍰，並按次連續處罰；行為人未滿十八歲且未結婚者，處罰其父母或監護人。<br>第一項戒菸教育之實施辦法，由中央主管機關定之。<br>第二十九條　　違反第十三條規定者，處新臺幣一萬元以上五萬元以下罰鍰。<br>第三十條　　製造或輸入業者，違反第十四條規定者，處新臺幣一萬元以上五萬元以下罰鍰，並令限期回收；屆期未回收者，按次連續處罰。<br>販賣業者違反第十四條規定者，處新臺幣一千元以上三千元以下罰鍰。<br>第三十一條　　違反第十五條第一項或第十六條第一項規定者，處新臺幣二千元以上一萬元以下罰鍰。<br>違反第十五條第二項、第十六條第二項或第三項規定者，處新臺幣一萬元以上五萬元以下罰鍰，並令限期改正；屆期未改正者，得按次連續處罰。<br>第三十二條　　違反本法規定，經依第二十三條至前條規定處罰者，得併公告被處分人及其違法情形。<br>第三十三條　　本法所定罰則，除第二十五條規定由中央主管機關處罰外，由直轄市、縣（市）主管機關處罰之。<br>",
    "降低罹癌風險 建構健康生活型態":"癌症防治   三管齊下  Part 1 降低罹癌風險建構健康生活型態 <br>撰文：徐文媛　諮詢對象：衛生署國民健康局副局長趙坤郁 <br>致癌的因素很多，而且往往就存在於我們周遭環境及日常生活中。唯有正常飲食、適當運動、遠離致癌因子、養成健康行為與生活習慣，並改善生活環境品質，才能減少罹癌的危機。<br>形塑健康生活新價值觀<br>「健康生活型態」牽涉的範圍很廣，衛生署國民健康局副局長趙坤郁表示，做為國家癌症防治政策的一環，應優先選擇具實證研究基礎的指標，所以健康飲食、菸害防制、檳榔防制及建立運動習慣，都是目前積極推動的衛生政策。<br>生活型態需要長時間建立，所以要改變民眾健康生活型態，必須設定出各項目標策略和衡量指標，設法營造有助達成目標的軟、硬體環境，這些工作往往需要跨部門，甚至從民間社團、社區等基層的參與，才能讓議題逐漸發酵，達到社會價值的建立及風氣的改變。例如在健康飲食方面，至少需要健康局與食品衛生處（未來即將成立的食品藥物管理局）合作，除了宣導正確的飲食習慣，也要為民眾吃的健康把關，避免汙染等有害食物流入巿面。<br>在推廣動態生活，建立國人運動習慣上，透過訂定國人健康體能指標，調查全國及各縣巿的運動盛行率，並以每年提升 0.5%為目標，結合體育主管單位及 25 縣巿政府同步進行政策的倡議及執行。以最容易、最安全的健走運動為例，現在 11 月 11 日「健走日」已成為許多縣巿政府的重要活動；而去年健康局選擇竹北、屏東、新莊三個縣轄巿，調查健康體能自治性環境的策略指標及調查評估方法，也成為今年體委會要求各縣巿建置運動地圖時的重要參考。<br>建構健康生活型態是「預防勝於治療」的積極實現，不只能降低罹癌風險，也有助降低其他現代文明病的發生，長期來看是最具經濟效益的健康投資。趙坤郁強調，在全球化浪潮下，我們的飲食、嗜好。.. 等生活型態與西方國家愈來愈趨近，疾病型態也可能逐漸接近，必須及早提出因應措施。<br> <br>資料來源：行政院衛生署衛生報導 139 期<br>上稿日期：2010/1/20<br>",
    "長期憋尿 泌尿系統問題多":"資料來源：中央健康保險局雙月刊第 98 期<br>上稿日期：2012/08/10<br>文／游小雯<br>諮詢／郭育成（台北市立聯合醫院陽明院區泌尿科主任）<br>膀胱是中空、有彈性的肉囊， 約有 400c.c. 的容積，可暫存由腎臟製造、經輸尿管輸送下來的尿液。一般人排尿量每回約 200 到 350c.c.，每天至少要有 4 到 8 次排尿次數才算正常；如果膀胱已存有近 400c.c 的尿液卻未排出，就會有尿很急、膀胱很脹的感覺，所謂的「憋尿」，就是讓膀胱經常撐在「脹滿」的狀態，沒有適時地清空排尿。「就像水溝的水沒有在流動一樣！」台北市立聯合醫院陽明院區泌尿科郭育成主任表示，把尿憋在膀胱中，就像是沒有流動的髒水，很容易滋生細菌及沉澱物，長期下來，不僅泌尿道易受感染、影響膀胱收縮力，甚至會造成腎臟永久傷害，不僅無法完全修復，還要終身小心照護。<br>憋尿會憋出哪些毛病呢？<br>「憋尿、排尿」這個看似簡單的動作，對身體健康卻有極大的影響，以下 4 項就是一般人最常憋出問題的病症：<br>1、尿道感染：<br>憋尿時，長時間無尿液經過尿道，無法將尿道開口的細菌沖走，大量細菌在尿道聚集，很容易引起發炎，尤其尿流不通暢的人（如前列腺肥大、障礙性排尿或結石），尿道感染的發生率，會比正常人高出許多。<br>2、膀胱發炎：<br>憋尿使膀胱長期脹大，膀胱壁血管受到壓迫，膀胱黏膜就會缺血，只要身體抵抗力差時，細菌趁虛而入即造成「急性膀胱炎」。膀胱炎發生時，膀胱壁變得較敏感，儘管積存的尿液不多，也會急著想上廁所，但一次卻只能尿出一點點；而大部份的膀胱炎，尿道粘膜通常也處於發炎狀態，所以會出現「燒灼感」，此外通常還會有「血尿」的情況發生。比較嚴重的膀胱炎甚至會發燒、併發腎臟炎等症狀。<br>3、前列腺炎與副睪丸炎：<br>男性若水份攝取不夠或憋尿使排尿次數過少，細菌就有機會透過尿道引發感染；嚴重的話，尿液甚至會經由輸精管倒流至前列腺或副睪丸，而引發前列腺炎或副睪丸炎，最嚴重可導致不孕，增加更多棘手的併發症。<br>4、膀胱損傷：<br>長期憋尿會使膀胱過度脹扯、壁肌肉層變薄，如果出現纖維化的情形會影響彈性，導致膀胱收縮力因此變差，而有疼痛、頻尿或尿不乾淨等後遺症；如果神經受損嚴重，膀胱括約肌無力，甚至會造成尿不出來的後果。平日勤保健，別讓憋尿造成終身遺憾許多上班族與公司主管，一忙或開會經常就是好幾個小時，為了不影響進度，常忘了上廁所，即使有尿意也盡量憋著，憋尿不只是造成泌尿系統發炎，尿液回流到腎臟也會造成腎積水引發尿毒症等併發症，最後很可能靠洗腎度日了！<br>平日盡量力行以下 4 項原則：<br>1、多喝水、不憋尿。<br>2、注意個人衛生：如多淋浴少盆浴、女生在如廁後記得由前往後擦、性行為前後（不論男女）應注意會陰部、肛門口及尿道口的清潔工作。<br>3、正常的飲食習慣及充分的休息與睡眠，以增加抵抗力及免疫力。<br>4、多注意及控制易引發膀胱炎的疾病：如糖尿病、尿路結石、攝護腺肥大等。<br>如果民眾發現自己解尿不舒服時，一定要在第一時間就診，讓醫師採用檢體對症下藥，只要沒有其他的特殊問題併存，同時能接受完整療程的抗生素治療，通常一星期左右即可痊癒。不過服藥的時間及用量絕對要遵照醫師囑咐，如果自行隨意停藥或不按時服用，很可能會造成殘存的細菌出現抗藥性，非但原本的症狀無法痊癒，還可能帶來慢性泌尿道發炎、尿路結石、腎臟功能受損等併發症，千萬要特別注意。"
  }
```
2. HTML 版型規劃，符合 JavaSript 的 DOM 設計。
```html
<table border="1">
  <tr>
    <td width="30%">標題</td>
    <td width="70%">內容</td>
  </tr>
</table>
<div id="alt" style="
  position: absolute; 
  width: 700px; 
  min-height: 100px; 
  word-break:break-all; 
  text-align:justify; 
  background-color: rgb(255, 255, 204); 
  top: 50px; 
  left: 400px; 
  z-index: 99; 
  display: none; 
  padding: 5px; 
  border: 3px double rgb(255, 153, 0); 
  background-position: initial initial; 
  background-repeat: initial initial;
">
</div>
```
3. 將 json 分解 for in 作業，透過 DOM 塞回 table
```javascript
$.getJSON("17300_data.json", function (result) {
  todo(result.q2t11);
});
function todo(myjson) {
  for (var key in myjson) {
    $('table').append(`
      <tr>
        <td>${key}</td>
        <td class="sswww">
          ${myjson[key].substr(0, 20)}...<span class="all" style="display:none">${myjson[key]}</span>
        </td>
      </tr>
    `);
  }
}
```
4. event 事件處理，由於 DOM 是事後生成，所以宣告在 todo 內等待 DOM 生成完畢。
5. hover 內的 this 也就是指 `$(".sswww")` 本身物件
6. 試著優化程式碼
```javascript
function todo(myjson) {
  ...
  $(".sswww").hover(function () {
    $("#alt").html(
      $(this).children(".all").html()
    ).css({
      "top": $(this).offset().top + 20,
      "left": $(this).offset().left - 100
    });
    $("#alt").show();
  })
  $(".sswww").mouseout(function () {
    $("#alt").hide();
  })
}
```
---
# 題組三：ABC 影城
## T4: 海報導覽
1. 提供縮圖導覽控制，單畫面 4 張縮並額外切換其他縮圖
2. 能控制三種特效，淡入出、縮放、左移
3. 圖片會自動重複循環播放，循環包含圖片與名稱。

### 原問題素材
原考題並未提供任何 HTML/JS，同時考試講求時間速度因此設計因此很陽春。為了學員的作品展示，這裡使用 jQuery 第三方套件 **[slick](http://kenwheeler.github.io/slick/)** 做 `.control` 的導覽縮圖用，再額外透過編寫完成自動播放主題區域。

### 設計練習
1. 版型規劃 HTML，先模擬任一圖片與文字。
```html
<head>
  <link rel="stylesheet" type="text/css" href="q3t4.css" />
</head>
<body>
  <div id="main">
    <h1>預告片介紹</h1>
    <div id="box">
      <div id="ani_zone">
        <img src="img/03A05.jpg">
        <p>123</p>
      </div>
    </div>
    <div class="control"></div>
  </div>
</body>
```
2. CSS 設計重點：可以不必先全部做，等到你進行轉場調整時再回頭到這裡慢慢調整參數。
```css
body {
  background: #335582;
  color: #fff;
  margin: 0px;
}
#main {
  margin: 0 auto;
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.control {
  width: 400px;
  margin: 10px 30px;
}
.control img {
  width: 90px;
  padding: 0 5px;
  cursor: pointer;
}
#box {
  flex: 0 0 414px;
  width: 100%;
  overflow: hidden;
}
#ani_zone {
  position: relative;
  transform: scale(1);
  transition: transform 0.5s;
}
#ani_zone.scale{
  transform: scale(0);
}
```
   - 透過 flex 將 main 做垂直排列置中並適當的空間分配
   - box 放送區含主圖與文字 & control 控制區含縮圖。放送區占用基本空間使固定。
   - 為了進行消失動畫順利，使用雙 DIV `.box>.ani_zone`；縮放需要 transition 與 transform、平移需要 overflow 與 position
3. 模擬資料庫已取出準備。這裡用 JSON 格式物件觀念。
```javascript 17300_data.json
{
  "q3t4": {
    "effect": 4,
    "img": {
      "03A01": "img/03A01.jpg",
      "03A02": "img/03A02.jpg",
      "03A03": "img/03A03.jpg",
      "03A04": "img/03A04.jpg",
      "03A05": "img/03A05.jpg",
      "03A06": "img/03A06.jpg"
    }
  }
}
```
4. 先把縮圖資料塞 DOM 到 `.control`，也把初始化首筆圖文進行置入 `.ani_zone`。
5. 利用全域宣告方便各 function 能直接共用。
```javascript
//全域變數宣告區
let effect = 0, myjson = new Object();

$.getJSON("17300_data.json", function (result) {
  effect = result.q3t4.effect;
  myjson = result.q3t4.img;
  todo();
});
function todo() {
  // 資料 DOM 建構化
  for (const key in myjson) {
    $('.control').append(`<div><img src="${myjson[key]}" alt="${key}" class="min-img"></div>`);
  }

  // 初始化顯示
  $('#ani_zone').find('img').attr('src', myjson[Object.keys(myjson)[0]]);
  $('#ani_zone').find('p').html(Object.keys(myjson)[0]);
}
```
{% note warning %}
由於資料為物件，並持有 key 跟 value 但沒有 index 索引，所以可以透過 `Object.key(json)` 將物件的 key 抽取出來形成 key 陣列並自帶索引，這樣就能等同於有 key 能也有 index。
{% endnote %}

6. 此時你的畫面應該有 6 張圖片，接著利用 jQuery 外掛 **[slick](http://kenwheeler.github.io/slick/)** 來進行 control 區域的速成使用。將 **[slick](http://kenwheeler.github.io/slick/)** 下載並解壓縮到`slick`位置（這裡避免 CDN 原因係此外掛還包含不少零件）。
```html
<head>
  <meta charset="UTF-8">
  <!-- 注意 Head 的宣告順序 -->
  <link rel="stylesheet" type="text/css" href="slick/slick.css" />
  <link rel="stylesheet" type="text/css" href="slick/slick-theme.css" />
  <link rel="stylesheet" type="text/css" href="q3t4.css" />
  <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
  <script src="slick/slick.min.js"></script>
</head>
```
7. 開始使用 **slick** 外掛，考量同步需要將這段放在 todo() 內。
```javascript
//使用 slick 外掛進行 control 區域美化
$(document).ready(function () {
  $('.control').slick({
    infinite: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 4
  });
});
```
8. 目前已得到 `.control` 以及不會動的主圖播放區。我們先把滑鼠事件規劃進去，再由 `swap()` 來負責主圖變換。
```javascript
//滑鼠事件，點選縮圖可以取得 key，提交給 swap(key) 再從 jsn_data 依據 key 取出圖徑
$('.min-img').click(function () {
  let key = $(this).attr('alt');
  swap(key);
});
```
9. swap() 主要是負責抽換主圖，題目有要求不同的特效（由後台控制，我們用 JavaSript 的數字變數代替要和效果）。
10. 轉場都依賴 jQuery 的動畫過渡使用。有以下設計
  - **淡入淡出**
    這裡只需要透過 fade 就能完成，淡出→調整內容→再淡入回來
  - **縮放**
    這裡透過 `transform: scale(0)` 完成，由於 jQuery animate 不支援，所以需要透過 addClass() 以及 CSS 的 transition 來完成。
  - **左移 animate**
    透過 CSS 過渡（上層為 overflow:hidden)，左移出去→替換內容→順移右側→左移進來。
11. 試著一邊撰寫 effect 一邊調整 CSS 與效果。
```javascript
// 替換圖片
function swap(key) {
  switch (effect) {
    case 1:
      $('#ani_zone').fadeToggle(function () {
        $(this).find('img').attr('src', myjson[key]);
        $(this).find('p').html(key);
        $(this).fadeToggle();
      });
      break;
    case 2: //此效果不太適合縮放用，所以改用 case 3 搭配 animate
      $('#ani_zone').slideToggle(function () {
        $(this).find('img').attr('src', myjson[key]);
        $(this).find('p').html(key);
        $(this).slideToggle();
      });
      break;
    case 3:
      // animate 不支援使用 transform: "scale(0)"，改為增添 class name 並持有轉場動畫，並挽 0.5 秒回歸
      $('#ani_zone').toggleClass("scale");
      setTimeout(() => {
        $('#ani_zone').find('img').attr('src', myjson[key]);
        $('#ani_zone').find('p').html(key);
        $('#ani_zone').toggleClass("scale");
      }, 500);
      break;
    case 4:
      $('#ani_zone').animate({
        left: "-100%"
      }, function () {
        $(this).find('img').attr('src', myjson[key]);
        $(this).find('p').html(key);
        $(this).css("left", "100%");
        $(this).animate({
          left: "0"
        });
      });
      break;
  }
}
```
12. 此時接著完成最後的自動播放，這裡用 setInterVal 外還需要隨時可暫停 (clearInterVal) 的變數控制規劃。
13. 除了一開始是從 0 開始播放，還要根據目前被點選哪張 (key) 則由那張暫停自動並重新開始。
14. autoplay(key) 會根據你提供的 key 名稱找到 index 值為輪播起始值，進行不斷 +1 循環撥放。
```javascript
// 自動播放
function autoplay(key) {
  let nowat = Object.keys(myjson).indexOf(key); //將 myjson 轉暫時陣列並接著用 indexOf 函式找到索引值
  pause = setInterval(() => {
    nowat = (nowat + 1) % Object.keys(myjson).length;
    swap(Object.keys(myjson)[nowat]);
  }, 2000);
}
```
15. 最後在 todo() 內最後執行一次 autoplay()，並從索引為 0 的 key 進行觸發。
```javascript
function todo(){
  ...
  autoplay(Object.keys(myjson)[0]);
}
```
16. 目前會自動從第 0 張開始播放。如果使用者透過滑鼠事件去點選，我們應該當下停止原本的輪播，除了原滑鼠事件替換主圖外，我們要重新讓 autoplay(key) 再生效恢復執行。
17. 修改滑鼠事件
```javascript
//滑鼠事件，點選縮圖可以取得 key，提交給 swap(key) 再從 jsn_data 依據 key 取出圖徑
$('.min-img').click(function () {
  let key = $(this).attr('alt');
  swap(key);

  clearInterval(pause);
  autoplay(key);
});
```

## T5: 調整表格順序
- 主要是針對兩筆 tr 標籤進行替換，同時注意第一筆與最後筆不允許再替換（做判斷）。
- 本練習只研討調整之程序與欄位資料更換，不包含完整的題目需求之資料處理（顯示、刪除）。

### 原問題素材
原考題並未提供任何 HTML/JS，且本應對應後端資料進行生成，本題目只單純探討作業處理透過前端 DOM 形成，且部分技巧不適合用於乙級考試（不符合時間成本）。

### 設計練習
1. 版型規劃 HTML，先模擬一段 tr 並註解化。
```html
<h3>預告片清單</h3>
<form action="jq_q3t5_from.php" method="post" style="text-align: center;">
  <table border="1" style="margin:0 auto">
    <thead>
      <tr>
        <th>預告片海報</th>
        <th>預告片片名</th>
        <th>播放順序</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <!-- 
      <tr>
        <td><img width="100" src="img/03A01.jpg"></td>
        <td>03A01</td>
        <td>
          <input type="hidden" name="odr[03A01]" value="1">
          <input type="button" class="up" value="上移">
          <input type="button" class="down" value="下移">
        </td>
        <td>
          <input type="checkbox">顯示
          <input type="checkbox">刪除
        </td>
      </tr>
    -->
    </tbody>
  </table>
  <div class="ct"><input type="submit" value="編輯"></div>
</form>
```
2. 模擬資料庫已取出準備。這裡用 JSON 格式物件觀念。
```javascript
{
  "q3t5": [
    {"img": "img/03A01.jpg","text": "03A01","odr": 1},
    {"img": "img/03A02.jpg","text": "03A02","odr": 2},
    {"img": "img/03A03.jpg","text": "03A03","odr": 3},
    {"img": "img/03A04.jpg","text": "03A04","odr": 4},
    {"img": "img/03A05.jpg","text": "03A05","odr": 5},
    {"img": "img/03A06.jpg","text": "03A06","odr": 6}
  ]
}
```
3. 先把資料塞入 DOM 到 tbody 內，考量陣列結構使用 for-of 迴圈完成。
```javascript
$.getJSON("17300_data.json", function (result) {
  todo(result.q3t5); //get array
});
function todo(myjson) {
  // 資料 DOM 建構化
  for (const value of myjson) {
    $('tbody').append(`
      <tr>
        <td><img width="100" src="${value.img}"></td>
        <td>${value.text}</td>
        <td>
          <input type="hidden" name="odr[${value.text}]" value="${value.odr}">
          <input type="button" class="up" value="上移">
          <input type="button" class="down" value="下移">
        </td>
        <td>
          <input type="checkbox">顯示
          <input type="checkbox">刪除
        </td>
      </tr>
    `);
  }
}
```
4. 順序交換透過按鈕事件進行，可以分為 class 叫做 up 與 down 之按鈕，編寫按鈕事件
5. 交換對象可以分為 nodeSelf 與 nodeTarget 兩組，而 nodeTarget 可能是前面或後面
6. 透過偵測 className 能得知是向前面或向後面
7. 找到兩者 node 內的順序值做修改（為了傳表單給後端做處理）
8. 接著透過 insert 方式將 nodeSelf 插入到 NodeTarget 的相對位置
9. 判斷 nodeTarget 之 length 值能代表是否存在
10. 最後記得 DOM 是事後生成的，所以得放在 todo() 內宣告按鈕事件
```javascript
//按鈕事件處理
$("input:button").click(function () {
  let nodeSelf = $(this).parents("tr");
  let nodeTarget = null;
  switch (this.className) {
    case "up":
      nodeTarget = $(this).parents("tr").prev(); //前面的
      if (nodeTarget.length) {
        nodeSelf.find("input:hidden").val((i, d) => { return --d });
        nodeTarget.find("input:hidden").val((i, d) => { return ++d; });
        nodeSelf.insertBefore(nodeTarget);
      }
      break;
    case "down":
      nodeTarget = $(this).parents("tr").next(); //後面的
      if (nodeTarget.length) {
        nodeSelf.find("input:hidden").val((i, d) => { return ++d });
        nodeTarget.find("input:hidden").val((i, d) => { return --d; });
        nodeSelf.insertAfter(nodeTarget);
      }
      break;
  }
});
```
11. 試著提交 from 檢查 POST 的順序值是否正確。
```php
<?php
print_r($_POST);
?>
```

## T8: 限制 checkbox 上限
1. 這裡 jQuery 重點為當 checkbox 偵測到被勾選四組變不再提供勾選
2. 排版部份為了追求精緻化，這裡採用考題示意圖之作法，但不建議為應考做法使用（時間成本）。
3. 本練習只研討勾選之設計，不包含表單送出等資料處理。

### 設計練習
1. 版型規劃 HTML，根據題目先模擬 20 組圖片與文字。並試著使用 flexbox 完成版面規劃
2. 圖片的長度單位需要反覆調整找到適合的分配 5*4 空間
```css
.box {
  background: url("img/03D04.png");
  width: 540px;
  height: 370px;
  box-sizing: border-box;
  padding: 19px 112px 11px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.box>label {
  flex: 0 0 20%;
  height: 85px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

label>input[type="checkbox"] {
  align-self: flex-end;
}
```
```html
<form action="api.php?do=order" method="post">
  <div class="box">
    <!-- 
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="1"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="2"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="3"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="4"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="5"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="6"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="7"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="8"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="9"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="10"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="11"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="12"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="13"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="14"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="15"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="16"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="17"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="18"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="19"></label>
    <label style="background: url(img/03D02.png) no-repeat center;">A 排 1 號<input type="checkbox" name="buyseat[]" value="20"></label>
    -->
  </div>
  <hr>
  <input type="hidden" name="title" value="">
  <input type="hidden" name="date" value="">
  <input type="hidden" name="time" value="">
  您選擇的電影是：<span id="mm"></span><br>
  您選擇的時刻是：<span id="tt"></span><br>
  您勾選了<span id="nn">0</span>張票，最多可購買 4 張票<br>
  <input type="submit" value="確定">
</form>
```
3. 模擬資料庫已取出準備。這裡用 JSON 格式物件觀念。包含已售座位之資訊
```javascript 17300_data.json
{
  "q3t8": {
    "movie": {
      "title": "獅子王",
      "date": "2020-04-29",
      "time": "14:00~16:00"
    },
    "sellout": [
      1,2,3,5,6,18
    ]
  }
}
```
4. 初始化座位畫面。透過前端 DOM 完成圖片擺入，同時偵測是否為已售座位
5. 初始化相關售票資訊
```javascript
$.getJSON("17300_data.json", function (result) {
  todo(result.q3t8); //get array
});
function todo(myjson) {
  // 資料 DOM 建構化
  let abcd = ['A', 'B', 'C', 'D'];
  for (let i = 1; i < 21; i++) {
    let setRow = Math.floor((i - 1) / 5), setCol = (i - 1) % 5 + 1;
    // console.log(setRow,setCol);
    if (myjson.sellout.includes(i)) {
      $(".box").append(`
        <label style="background: url(img/03D03.png) no-repeat center;">${abcd[setRow]}排${setCol}號</label>
      `);
    }
    else {
      $(".box").append(`
        <label style="background: url(img/03D02.png) no-repeat center;">${abcd[setRow]}排${setCol}號<input type="checkbox" name="buyseat[]" value="${i}"></label>
      `);
    }
  }
  
  //電影資訊初始化
  $("#mm").text(myjson.movie.title);
  $("#tt").text(myjson.movie.date + " " + myjson.movie.time);
  $("input[name='title']").val(myjson.movie.title);
  $("input[name='date']").val(myjson.movie.date);
  $("input[name='time']").val(myjson.movie.time);
}
```
{% note warning %}
`includes(value)`能判斷是否存在於陣列內並回傳 true/false
{% endnote %}
6. 此時檢查畫面，是否有已售座位跟可勾選座位。
7. 接著規劃點擊事件，使每次點選 (click) 座位時，判斷數字是否為 4。如果成立則將此次勾選直接取消。
```javascript
//點擊事件
let num = 0;
$("input:checkbox").click(function () {
  if (this.checked) num < 4 ? num++ : this.checked = false;
  else num--;
  $("#nn").text(num);
});
```
8. 由於這裡的練習題是前端輸出，若應考時請改由後端來生成畫面比較快捷，submit 後 go.back 可考慮增加另計算已勾選之數量功能。

---
# 題組四：精品電子商務
## T4: 商品分類
1. 設計左側分類選單，列表出各商品的主選單與子選單。
2. 子選單預設為不顯示，滑鼠移過該主選單時，該子選單會顯示。
3. 為了視覺美感這裡使用 slide 收合，考試建議 Toggle 即可。
4. 這裡不提供超連結對象

### 設計練習
1. 版型規劃 HTML，根據題目先模擬選單連結，並指定 id & class 以利於之後的控制。
```css
a {
  display: block;
  padding: 20px 5px 20px 5px;
  text-decoration: none;
  background: #F4C591;
  margin: 10px auto 10px auto;
  color: #65350A;
  width: 200px;
  text-align: center;
}

.son {
  background: rgb(252, 226, 196);
}
```
```html
<div class="menu">
  <!--
    <a href="#">全部商品</a>
    <a href="#" id="fa1" class="fa">流行皮件 (3)</a>
    <a href="#" class="fa1 son">男用皮件 (3)</a>
    <a href="#" class="fa1 son">女用皮件 (0)</a>
    
    <a href="#" id="fa2" class="fa">流行鞋區 (2)</a>
    <a href="#" class="fa2 son">少女鞋區 (1)</a>
    <a href="#" class="fa2 son">紳士流行鞋區 (1)</a>
    
    <a href="#" id="fa3" class="fa">流行飾品 (1)</a>
    <a href="#" class="fa3 son">流行飾品 (0)</a>
    <a href="#" class="fa3 son">時尚珠寶 (1))</a>

    <a href="#" id="fa4" class="fa">背包 (2)</a>
    <a href="#" class="fa4 son">背包 (2)</a>
  -->
</div>
```
2. 模擬資料庫已取出準備。這裡用 JSON 格式物件觀念。包含商品數量之資訊
```javascript 17300_data.json
{
  "q4t4": [
    {
      "title": "流行皮件",
      "id": 1,
      "sub": [
        {
          "title": "男用皮件",
          "id": 5,
          "count": 3
        },
        {
          "title": "女用皮件",
          "id": 6,
          "count": 0
        }
      ]
    },
    {
      "title": "流行鞋區",
      "id": 2,
      "sub": [
        {
          "title": "少女鞋區",
          "id": 7,
          "count": 1
        },
        {
          "title": "紳士流行鞋區",
          "id": 8,
          "count": 1
        }
      ]
    },
    {
      "title": "流行飾品",
      "id": 3,
      "sub": [
        {
          "title": "流行飾品",
          "id": 9,
          "count": 0
        },
        {
          "title": "時尚珠寶",
          "id": 10,
          "count": 1
        }
      ]
    },
    {
      "title": "背包",
      "id": 4,
      "sub": [
        {
          "title": "背包",
          "id": 11,
          "count": 2
        }
      ]
    }
  ]
}
```
3. 初始化畫面。透過前端 DOM 完成。多注意 JSON 層級問題。
4. 一邊讀取一邊計算數量，最後別忘了開頭的全部商品項目。
```javascript
$.getJSON("17300_data.json", function (result) {
  todo(result.q4t4); //get array
});
function todo(myjson) {
  // 資料 DOM 建構化
  let total = 0;
  for (const fa of myjson) {
    let faNum = 0, print = "";
    for (const son of fa.sub) {
      print += `<a href="#" class="fa${fa.id} son">${son.title} (${son.count})</a>`;
      faNum += son.count;
    }
    $(".menu").append(`<a href="#" id="fa${fa.id}" class="fa">${fa.title} (${faNum})</a>` + print);
    total += faNum;
  }
  $(".menu").prepend(`<a href="#">全部商品 (${total})</a>`);
}
```
5. jQuery 規劃進行遮蔽或顯示，顯示使用 slide 作法，
6. 利用名稱 id=class 作為關係對應進行誰該顯示誰該隱藏，放入到 todo() 內
```javascript
//滑鼠事件顯藏
$(".son").hide();
$(".fa").mouseover(function() {
  aa = $(this).attr('id');
  $(".son").not("."+aa).slideUp('fast');
  $("." + aa).slideDown('fast');
});
```

## T10: 登入驗證
- 登入帳密之前需要先驗證數學，這裡利用 jQuery 進行驗證，在 from 提交出去前先攔截。

### 設計練習
1. 驗證碼這裡透過 JavaScript 生成，但事實上這安全是不太好的。
2. 規劃 HTML，主要是 onsubmit 這裡要注意碰到"return false"才會取消 from 送出。
```html
<form action="" method="post" onsubmit="return check(this)">
  帳號：<input type="text" name="acc" id=""><br>
  密碼：<input type="text" name="pwd" id=""><br>
  驗證碼：<span class="qus"></span> = <input type="text" name="ans" id="">
  <input type="submit" value="登入">
</form>

<script>
  let a = Math.floor(Math.random() * 100), b = Math.floor(Math.random() * 100);
  $(".qus").text(`${a}+${b}`);
</script>
```
3. JavaSript 函式部分就很簡單，如果你已經很熟悉 jQuery
```javascript
function check(who) {
  let ans = $(who).children("input[name=ans]").val();
  if (a + b != ans) {
    alert("數學很差唷！驗證碼錯誤");
    return false;
  }
  else return true;
}
```
---
# 總結

目前為止，透過以上練習你已經可以理解 jQuery 與 JavaSript 的差異與優勢。jQuery 只是幫助你簡化了 JavaSript 的冗長程式碼能更方便的操作 DOM 與處理。其實還有一些乙級解析練習 jQuery 對象跳過，這裡沒有特別提到（主要 AJAX 的資料處理）。AJAX 需要搭配後端例如 PHP/SQL 進行練習，將是我們下一個章節學習重點。

{% note default %}
**以上全題完整代碼：** [view page code](https://gist.github.com/summer10920/b671999594d3fefdd2ee9fe94baba01b)
{% endnote %}