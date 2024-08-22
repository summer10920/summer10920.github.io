---
title: "[練習課程] jQuery 基礎實作（二）：OpenData API 串接"
categories:
  - 職訓教材
  - jQuery
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-05-08 00:46:34
---
![](https://i.imgur.com/NxJTq7q.png)

在之前的 Ajax 相關練習當中，不論是讀取 JSON 文件或是向後端伺服器請求，我們都是內部進行相對連結且安全。然而常常聽到 API 串接的技術，是指透過外部網路連結到別人站台的 JSON 文件（或其他格式），透過 Ajax 方式載入數據到你的網頁設計形成活絡的動態資訊網頁，也就是數據別人都定期更新幫你準備好了，你儘管去拿。

<!-- more -->
# 前端 AJAX 跨域做資料回應並不合法
然而在瀏覽器規範裡不允許前端技術的 JavaScript 能連接到非相同網域的 Ajax 資料請求（安全性問題），因此在使用跨網域的 API 就延伸了無法取得之窘境。目前使用外部 API 有三種解決方式：

1. 使用後端伺服器 PHP 語言的 crul 進行遠端 API 串接（或其他後端伺服器），再讓同網域的前端 JavaScript 進行 Ajax 取得
2. 遠端 API 端採用 JSONP 格式，透過請求夾帶遠端所指定之參數（或代號），再透過`<script src="xxx&callback=yyy"></script>`方式偷渡資料帶回前端，使得一開始 JavaScript 就擁有此物件變數而不是由 JavaScript 作跨網域資料請求
3. 遠端 API 伺服器使用 W3C 所指定之 CORS 格式，使得此 API 本身受允許被共享資源（遊覽器需支援 CORS)

因此，通常如果你嘗試進行跨網域 API 串接失敗時做以下確認：
- 檢查語法是否有錯，替換曾成功之 URL 是否有正常取得資料 JSON
- 可能對方 API 並沒有設定 CROS 開放，檢查對方 API 是否採用 JSONP 做開放連接
- 如果是 JSONP 格式就參考對方文件要求，配合所需要的參數做`<script url>`。對方會用 js 夾帶 callback 方式回傳包好你需要的資源。使用教學請自行參閱網路文章
- 如果都沒有代表對方很懶沒特別處理，當你無法要求遠程後端 API 做開放跨域設定時，就使用後端對後端做 API 串接（不會受遊覽器阻擋），透過自己的後端讓前端盡情 Ajax（同網域）。

---

{% note primary %}
**素材準備：使用中央氣象局提供的天氣 API 做為練習環境** 
我們將開始教學 OpenData 串接，在那之前請先到 [氣象開放資料平臺](https://opendata.cwb.gov.tw/index) 註冊帳號。接下來會利用 2 種範例作為天氣練習使用。

該平台提供透過 URL 下載檔案以及 RESTful API，簡單來說屬於前端 JS 可以直接存取的 API。唯獨需要有效會員之授權碼，避免流量異常被停權請不要輕易提供他人共用。
{% endnote %}

# 範例：氣象開放資料平臺 + Table

我們採用以下服務 api 為練習
**一般天氣預報-今明 36 小時天氣預報**：https://opendata.cwb.gov.tw/dataset/statisticDays/F-C0032-001

## 透過 postman 做 api 解讀
[Postman](https://www.getpostman.com/downloads/) 為第三方軟體，是一個可以模擬 HTTP Request 的工具，其中包含常見的 HTTP 的請求方式，例如： GET 、POST、PUT、DELETE，而它的主要功能就是能夠快速的測試你的 API 是否能夠正常的請求資料，並得到正確的請求結果。

這裡僅簡單使用，完整應用方式請參考 [網路教學](https://ithelp.ithome.com.tw/articles/10201503)。確認你的 api 能正常讀取資源後，便可以開始規劃前端 Ajax，這裡使用 jQuery 來應用運作。

## 編寫 Ajax 取得 JSON 數據
1. 這裡示範完整的寫法，你至少需提供目標位置、請求方式、資料類型、callback 行為。
2. 建立 weather_table.html，引用 jQuery 後，先在空白底處執行 script
```javascript
var data;
$.ajax({
  /*本代碼已拔除授權代碼將無效化，請使用自身帳號授權碼*/
  url: "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-____&downloadType=WEB&format=JSON",
  method: "GET",
  dataType: "json",
  success: function (re) {
    // console.log(re); //先測試拿到了什麼
    // data=re;  //透過 chrome.f12.console 輸入 data 確認內容
    data=re.cwbopendata.dataset.location; //簡化擷取的節點
  }
})
```

3. 而較新的 jQuery 版本有支援 getJSON 之便利方式，你可以改用以下寫法：
4. getJSON 只要 URL 即可，同時可增加 done 成功與 fail 失敗分別執行不同動作增加應用姓。
```javascript
/*本代碼已拔除授權代碼將無效化，請使用自身帳號授權碼*/
$.getJSON('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-____&downloadType=WEB&format=JSON')
  .done(function(re){
    data=re.cwbopendata.dataset.location;
  })
  .fail(function(w){
    alert("faill openapi,"+w)
  });
```
5. 以上為使用 Ajax 編寫的最低完整限度，當然此範例你可以使用 `$.get` 來使用，但回傳資料只是一坨 JSON 字串，你還要手動轉成 JSON 物件。
```javascript
$.get('https://apiservice.mol.gov.tw/OdService/download/A17010000J-000103-EvF',function(e){
  console.log(e);
  console.log(JSON.parse(e));
});
```
6. 接下來就是等待 Ajax 的 callback 做後續動作，如果網頁只有一個 Ajax 就放在該 callback 內
7. 反之如果你需要等待兩個以上 Ajax，你應該利用$.when().then() 來滿足等待事件
```javascript
$.when(
  $.getJSON(url_1).done(function (re) {
    data1 = re;
  }),
  $.getJSON(url_2).done(function (re) {
    data2 = re;
  }))
  .then(function () {
    console.log(data1,data2);
  });
```

## 規劃 TABLE 版型並塞入值
1. 我們利用 table 來作為資料顯示
```html weather_table.html
<h1>36H 天氣預報</h1>
<table id="dt" class="display compact hover">
  <thead>
    <tr>
        <th>編號</th>
        <th>地區</th>
        <th>時間 1</th>
        <th>時間 2</th>
        <th>時間 3</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
```
2. 接著透過 JS 開始做 DOM 塞入，我們在 `.done()` 這裡補完後續動作。
3. 這裡會取得 `<td>` 三組資料，且分別含有天況、圖示、低溫、高溫。
```javascript
.done(function (re) {
  data = re.cwbopendata.dataset.location;

  for (let i = 0; i < data.length; i++) {
    row = data[i];
    print += `
  <tr>
    <td>${i + 1}</td>
    <td>${row.locationName}</td>
    <td>${row.weatherElement[0].time[0].parameter.parameterName} <img src="img/night/${row.weatherElement[0].time[0].parameter.parameterValue}.svg"> | 
    溫度 ${row.weatherElement[2].time[0].parameter.parameterName} ~ ${row.weatherElement[1].time[0].parameter.parameterName} ℃</td>
    <td>${row.weatherElement[0].time[1].parameter.parameterName} <img src="img/day/${row.weatherElement[0].time[1].parameter.parameterValue}.svg"> | 
    溫度 ${row.weatherElement[2].time[1].parameter.parameterName} ~ ${row.weatherElement[1].time[1].parameter.parameterName} ℃</td>
    <td>${row.weatherElement[0].time[2].parameter.parameterName} <img src="img/night/${row.weatherElement[0].time[2].parameter.parameterValue}.svg"> | 
    溫度 ${row.weatherElement[2].time[2].parameter.parameterName} ~ ${row.weatherElement[1].time[2].parameter.parameterName} ℃</td>
  </tr>
  `;
  }
  $('tbody').html(print);
})
```
4. 如果希望時間 ISO 轉成我們能控制的 JS 時間，可以這樣規劃
```javascript
var hourtext = new Array();
hourtext[0] = "凌晨";
hourtext[6] = "白天";
hourtext[12] = "下午";
hourtext[18] = "晚上";

date1 = new Date(data[0].weatherElement[0].time[0].startTime); //轉 date format
date2 = new Date(data[0].weatherElement[0].time[1].startTime); //轉 date format
date3 = new Date(data[0].weatherElement[0].time[2].startTime); //轉 date format

$('#dt>thead').find('th').eq(2).text(`${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()} ${hourtext[date1.getHours()]}`);
$('#dt>thead').find('th').eq(3).text(`${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()} ${hourtext[date2.getHours()]}`);
$('#dt>thead').find('th').eq(4).text(`${date3.getFullYear()}-${date3.getMonth() + 1}-${date3.getDate()} ${hourtext[date3.getHours()]}`);
```

## DataTables.JS 套件
本範例將接著使用美化表格的視覺套件做練習。這裡會示範 UI 套用原 DataTables 與 Bootstrap 兩種效果與簡單應用，更多參數設定請自行參考官方文件。

{% note primary %}
**素材準備：使用 DataTable.js 套件** 
[DataTable.js](https://datatables.net/) 是一個視覺優化的 JS 套件，能將標準 HTML's Table 代碼進行視覺與功能優化。你可以輕易地動態進行表格操作。提供各種參數，支援各種不同 UI Framework 環境使用 (Boostrap、Jquery UI)，並對應不同的 JS 環境。
{% endnote %}

### Base Style
1. 透過左側連結　`Downolad`　進行下載前的選項設定
2. step1：選擇 UI 框架為 `DataTables`，這裡我們只用最基本的 CSS 樣式
3. step2：選擇套件包為 `DataTables`，這裡我們需要使用該 JS 外掛工具即可，而 jQuery 我們已經有了就不需要麻煩了
4. Extensions 主要是提供一些進階功能（整合其他 JS 外掛），這裡我們不討論不選取
5. step3：選擇提供方式採 CDN，直接連線選擇 我們的基本 DataTables
6. 得到 CDN 後，放置到你的 head 內並排序一下你的 jQuery 位置
```html
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js"></script>

  <style>
    img {
      height: 1em;
    }
  </style>
</head>
```

7. 接著設定並觸發 DTS，給予 table 標籤 ID，如果需要和效果就用指定 class 編入（依官網 Example 說明）
```html
<table id="dt" class="display compact hover">
```
8. 在 JS 內透過 jQuery 去觸發 DTS 效果，建議在 JS 最後執行，也就是 DOM 沒有需再異動後
```javascript
$('#dt').DataTable({}); //啟用 datatable 套件
```
9. 畫面效果如下
![](https://i.imgur.com/2GU7pux.png)

### Bootstrap Style
1. 透過左側或主選單連結 `Downolad` 進行下載前的選項設定
2. step1：選擇 UI 外觀框架 Bootstrap，這裡我們引用 BS 的 CSS 樣式
3. step2：選擇 DataTables+Bootstrap，我們還沒有 BS，這裡幫忙提供給我們工具包
4. Extensions 主要是提供一些進階功能（整合其他 JS 外掛），這裡我們不討論不選取
5. step3：選擇 CDN 並拿掉 Concatenate 項目（不要合併），可以清楚看到除了 DTS 還有 BS 也都有了
6. 從下面代碼可以看到兩者差異
```html
<head>
  <meta charset="UTF-8">
  <!--DTS base_Style -->
  <!-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.css" />  -->
  
  <!--DTS BS_Style -->
  <link rel="stylesheet" type="text/css"
    href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css" />

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <!--DTS base_JS -->
  <!-- <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js"></script>   -->
  
  <!--DTS BS_JS -->
  <script type="text/javascript"
    src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js"></script>

  <style>
    img {
      height: 1em;
    }
  </style>
</head>
```
7. 再來就是將你的 table 根據 BS 的設定做效果調整，舉例
```html
<table id="dt" class="display compact table table-hover table-striped table-dark">
```
8. 效果如下
![](https://i.imgur.com/toRnzuR.png)

---

# 範例：氣象開放資料平臺 + Chart

同個氣象開放資料平台我們換一個範例，找一個資料較多的 API。我們採用以下服務 api 為練習 
**鄉鎮天氣預報-台灣未來 1 週天氣預報**：https://opendata.cwb.gov.tw/dataset/statisticDays/F-D0047-091

## 編寫 Ajax 取得 JSON 數據
建立 weather_chart.html，引用 jQuery 後，先在空白底處執行 script。我們先請求 OpenData 並試著 console.log 出來看看

```javascript
/*本代碼已拔除授權代碼將無效化，請使用自身帳號授權碼*/
$.getJSON('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=CWB-____&downloadType=WEB&format=JSON')
  .done(function (re) { //成功時執行以下區段
    console.log(re); //先檢查資料物件
  })
  .fail(function (w) { //失敗訊息
    alert("get this api fail so said!");
  });
```
這裡我們將會設計為：
1. 抽取出北部地區四個城市分別為：台北、新北、基隆、桃園
2. 設計圖形化曲線圖，api 給的時間項目為我們的 x 軸
3. 該時間的平均溫度為我們的 y 軸

## ChartJS 套件
本範例將接著使用能將數據做成統計表的視覺套件做練習，只需要指定好所需物件陣列指定就能快速拉出圖表。本篇只介紹一種圖表方式其餘起自行參考官方文件。

{% note primary %}
**素材準備：使用 DataTable.js 套件** 
[Chart.js](https://www.chartjs.org/) 是一個專門處理圖表化資料的 JS 外掛，他主要是依賴 canvas 作為繪圖技巧，並提供多種不同的統計圖樣式與形式提供使用。
{% endnote %}

### 學習官網的 bar 範例
1. 透過左側連結 `Installation` 進行取得（這裡演示 CDN 取法）
2. 轉到 CDN 網址，取得 css 跟 js 兩者即可。放置到你的 head 內並排序一下你的 jQuery 位置
```html
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
</head>
```
3. 接著設定並觸發，參考範例說明在指定處規畫你的 HTML 版面添加具備 ID 的 canvas 元素。
```html
<body>
  <h1>北部地區一周天氣溫度</h1>
  <div style="width:90%">
    <canvas id="myChart" width="800" height="400"></canvas>
  </div>
</body>
```
4. 複製範例上的簡單資料圖表，使用 JavaScript 編寫
```javascript
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'bar', //圖表類型
  data: {  //圖表資料
    //x 軸之欄位名稱
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    
    //資料線細節，結構為 datasets:[{...},{...}] 如果有多筆
    datasets: [{
      //資料線標題名稱
      label: '# of Votes',
      //值
      data: [12, 19, 3, 5, 2, 3],
      //多顏色對應不同 x 欄位
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      //同上
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          //是否 y 軸要從 0 開始，如果不要則整段 option 其實可不寫
          beginAtZero: true
        }
      }]
    }
  }
});
```
5. 畫面效果如下
![](https://i.imgur.com/S6QpKcB.png)

### 整合 API 資料並規劃 chartjs
請自行完成動作到已透過 Ajax 取得數據完畢，而以下程式碼都在`.done(function(re){})`內執行

1. 簡化我們的資料，使找到四個城市資料快些（少打些字）
```javascript
/*簡化擷取的節點*/
let kl = re.cwbopendata.dataset.locations.location[13]; //基隆
let tp = re.cwbopendata.dataset.locations.location[16]; //台北
let nt = re.cwbopendata.dataset.locations.location[18]; //新北
let tu = re.cwbopendata.dataset.locations.location[21]; //桃園
// console.log(kl);
```
2. 整理一些新陣列變數，分別為存有 x 軸之內容，以及各城市的溫度之內容。
```javascript
/*變數初始化*/
let date_line = new Array();
let k = new Array(), t = new Array(), n = new Array(), u = new Array();

for (let i = 0; i < kl.weatherElement[1].time.length; i++) {
  /*write 時間軸*/
  date_line[i] = kl.weatherElement[1].time[i].startTime.substr(0, kl.weatherElement[1].time[i].startTime.length - 12);

  /*write 溫度資料*/
  k.push(kl.weatherElement[1].time[i].elementValue.value);
  t.push(tp.weatherElement[1].time[i].elementValue.value);
  n.push(nt.weatherElement[1].time[i].elementValue.value);
  u.push(tu.weatherElement[1].time[i].elementValue.value);
}
```
3. 引用 chart.js 的參數設定
```javascript
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: date_line,
    datasets: [{
      //keelung
      label: kl.locationName,
      data: k,
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }, {
      //taipei
      label: tp.locationName,
      data: t,
      backgroundColor: 'rgba(54, 162, 235, 0.1)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }, {
      //newtaipei
      label: nt.locationName,
      data: n,
      backgroundColor: 'rgba(255, 206, 86, 0.1)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }, {
      //taouang
      label: tu.locationName,
      data: u,
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      borderColor: 'rgba(75, 192, 192, 1)',
    }]
  }
});
```
4. 畫面如下
![](https://i.imgur.com/FcKv9uw.png)

---

# 範例：新北市政府資料開放平台 (CROS 禁止連線）
該平台為新北市政府的開放資料平台，而這些 OpenData 並不允許前端共享連接使用，這裡將示範如何改由後端伺服器 php 語言取得後再進行轉交給同網域之 JS。

我們採用以下服務 api 為練習
**新北市公共自行車租賃系統 (YouBike)**：http://data.ntpc.gov.tw/od/detail?oid=71CD1490-A2DF-4198-BEF1-318479775E8A

## 透過 Ajax 取得 api 失敗時
1. 先用 postman 確認是否可測試 api 正常運作。
2. 這裡示範 getJSON 用法取得，建立檔案 ntpc_curl.html
```javascript
$.getJSON('http://data.ntpc.gov.tw/od/data/api/54DDDC93-589C-4858-9C95-18B2046CC1FC?$format=json')
  .done(function (re) {
    console.log(re);
  })
  .fail(function (w) {
    alert("faill openapi")
    console.log(w);
  });
```
此時能確認不允許前端 JS 直接共享請求，我們改用 php 來完成 api 串接，建立 ntpc_curl_api.php

## 透過 php 的 curl 取得 api
1. 使用 curl 來達到 api 連接，參數說明如註解
```php
<?php
// 初始化 CURL
$curl = curl_init();

// 識別發出請求的軟體類型或版本號、該軟體使用的作業系統、還有軟體開發者的字詞串。
// 參考 https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers/User-Agent
curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36");

//要驗證伺服器 SSL 憑證，當拜訪 https 網站時，若未做任何 SSL 相關設定，會出現錯誤。
// 設為 false 為可以接受任何伺服器憑證。
// 參考 https://www.plurk.com/p/e797gs
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

// 將 curl_exec() 獲取結果以文字串方式返回，而不是直接印出。
// 如果你只是要轉給前端可以不寫此行（預設 false)，剛好省下最後的 echo 動作
// 反之為 true 可事後要做 echo 給前端（用 Ajax 來取）或透過 php 輸出 HTML
// curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

// 設定 URL 位置
curl_setopt($curl, CURLOPT_URL, "http://data.ntpc.gov.tw/od/data/api/54DDDC93-589C-4858-9C95-18B2046CC1FC?\$format=json");

// 執行 curl
$result = curl_exec($curl);

// 關閉 curl
curl_close($curl);

// echo $result;
?>
```
2. 回到 ntpc_curl.html，改連結到同網域的後端取得。
```javascript
$.getJSON('ntpc_curl_api.php').done(function (re) { //自己做一個後端，再去跟同網域的後端取得
  console.log(re);
}).fail(function (w) {
  alert("faill openapi")
  console.log(w);
});
```
3. 此時可以正常顯示，整體過程就是：遠端 api => <mark>by_crul</mark> => php =><mark>by Ajax</mark> => js

{% note default %}
**以上三題之完整代碼：** [view full code](https://gist.github.com/summer10920/e70cd0ce7380fc9f89a92059feb8b46a)
{% endnote %}