---
title: "[期末課程] JavaScript 期末實作：商務網站"
categories:
  - 職訓教材
  - 範例實作網站
tag:
  - JavaScript 程式設計（假日班）
date: 2022-11-15 23:03:07
---

![](https://i.imgur.com/D8v3RVP.png)
本篇將整合過去基本課程 JavaScript 相關知識進行經驗整合，並接續上期課程 RWD 響應式網頁設計（假日班）期末實作。我們將開發一些商務動態元件模組，你將會接觸到訂房功能模組設計，動態載入效果以及一些小功能。

<!-- more -->

# 提前準備
正式開始教學之前，請先獲取本教學所需的初始素材。該素材已提供具備靜態的商務網站版型內容（主題：露營官網），透過此素材作為商務網站練習之實作起始點。並透過 VSCode 與 Live Server 套件完成布署。

## 素材下載
請前往下載加以使用，確保安裝置環境內容。本教材與前期 RWD 響應式網頁設計（假日班）期末實作教材稍些取不同，請從新下載此份：
  - [Source Project](https://github.com/summer10920/studies_TeachDemo_JS/releases) 基本 HTML/CSS/Bootstrap5.2 之商務網站素材。

此時檢查內容，包含了
- **db.json**
作為模擬後端給予的所有資源。
- **index.html**
主要網站，以一頁式方式呈現。
- **plugins 目錄**
所有相關的 css 與 js 檔案都收錄在此，不論現成套件或自開發檔案。
- **media 目錄**
所有相關的圖片收錄在此，此內容圖片取自 [snow peak JP](https://www.snowpeak.co.jp/) 未授權之商業網站，本站教學僅學術交流使用與示範代碼引用之用途並標示出處，若採用發布轉載自行負擔責任。

## 資料串接
本教材不包含後端的資源請求，已將相關所需的資料以 db.json 方式另存。練習時請自行調整字串為近期之日期。並透過 [ES6 Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch) 方式取回。Fetch 的簡單介紹使用方式：

- fetch 吃兩個參數，第一個必填參數為 api 的目標路徑，第二個是選填為相關參數 json（可指定像是 Header, Body, method... 等）
- 透過非同步處理並等待回傳使用 then。
- 第一次 then 回來的 response 會是一個 promise 物件，需要另透過 json() 方法來獲取等待結果。
- 第二次 then 為該 promise 給我們的資料，此時才能獲得資料。

```js
const fetchPath = 'db.json';
fetch(fetchPath, { method: 'GET' })
    .then(response => 
      response.json()
    )
    .then(json => 
      console.log(json);
    );
```

> 這裡只解釋 Fetch 大致簡易用法，之後會正式用到。若需要完整理解 Fetch 其他細部功能請自行參閱 MDN。

# 訂房系統
訂房相關的開發我們額外獨立使用 css 與 js 確保檔案分離好維護管理。目前 css 已經宣告於 head 內。而 js 請協助規劃空白 js，為了簡化設計複雜性，js 代碼直接放置 body 結尾之前，確保 DOM 獲取正常。

```html index.html
</head>
  <!-- .... -->
  <link
    rel="stylesheet"
    href="plugins/style.css"
  >
  <link
    rel="stylesheet"
    href="plugins/lokiCalendar.css"
  >
</head>
<body>
  <!-- ... -->
  <script src="plugins/custom.js"></script>
  <script src="plugins/lokiCalendar.js"></script>
</body>
```

預告一下，大致整份 lokiCalendar.js 會分為幾個區域：

- **declaration**
任何的初始變數與套件宣告都放置於此，避免複雜化都以全域變數來設計。若您想挑戰更高可以採用`(function(){})()`這樣的區間變數執行來包覆整份 js，做隱密保護。
- **init**
透過 init 函式放入任何第一次執行的工作，包含我們 fetch 第一次被執行放在這裡。最後記得觸發一次 init()。
- **service**
與初始化不同，另獨立初整個主功能服務，同時利用封包特性將該服務所有的方法都整理一起。也就是我們主功能都在這。

## 萬年曆
第一步我們先完成萬年曆的設計，根據目前的當下日期作為萬年曆設計。

### 獲取 api 資源
向 API 獲取 (db.json) 來得知那些日子屬於國定假日做特別標示。我們需要先宣告全域變數初始空陣列，之後 fetch 來覆蓋陣列值。

- 宣告存放 api 路徑與國定假日陣列。
- 透過 init 來觸發第一次執行。
- 使用 fetch 來獲取 json 資料。並測試 console 是否成功。
- 除了 nationalHoliday 要回存，booked 與 pallet 也順便回存。因此回頭宣告這兩個型別（注意 array or object)。
- 除了執行對這 3 筆變數之值個別指定回存，這裡也可利用 [JS 解構賦值](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 的運算式之方式`{}={}`快速取得三組變數，而外面多包`()`是因為 [無宣告指派](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E7%84%A1%E5%AE%A3%E5%91%8A%E6%8C%87%E6%B4%BE) 寫法，當針對物件進行解構而該句沒有進行宣告時，指派式外必須加上括號。
- 當全域變數設計完畢後，規劃新執行名為 `calendarService()` 的服務。

```js lokiCalendar.js
//全域變數宣告區
let
  fetchPath = 'db.json',
  nationalHoliday = [],  //國定假日
  booked = [],  //已預約狀況
  pallet = {}   //營位資訊
  ;

//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    // console.log(json);  //檢查成功
    ({ nationalHoliday, booked, pallet } = json);

    calendarService();
  });
}

//執行
init();

//Service
const calendarService = () => {
  console.log(nationalHoliday); //測試獲取與執行
}
```

### 生成 li 列表
列印之前，要將左側`<ul class="leftDayList">`與右側`<ul class="rightDayList">的各自 li 元素產生出來。而生成這些列表需要思考一些發想：

- 兩個日曆的第一天是幾年幾月，以及個別 1 號是禮拜幾開始排列。需要透過時間物件來查詢這些資訊。
- 預設載入時，會是以目前的年月來當作左側日曆。
- 透過規劃一個 function 來自動完成這些事情。

#### 安裝使用 day.js
為了更快去使用 Date 物件，利用第三方來便利計算日期數據。[day.js](https://day.js.org/en/) 是經已停止服務的熱門 [moment.js](https://momentjs.com/) 推薦之一。他具備最小檔案與容易上手的替代套件之一。安裝採用 [Brower 方式](https://day.js.org/docs/en/installation/browser) 並以 CDN 來講解。

- 將指定 CDN 放入至 index.html 的 head 宣告內。
- 之後會隨著需求性增加，陸續加入 plugin 到同上位置之下。（畢竟檔案小也是因為基礎應用）
- 嘗試在規劃一個 today 變數受指定為`dayjs()`，console 輸出應該能獲得具備各種時間單位的 object 代表 dayjs 使用正常。

```html index.html
<head>
  <!-- masonry -->
  <!-- ... -->
  <!-- day.js -->
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  <!-- ... -->
  <!-- custom -->
  <!-- ... -->
</head>
```
```js lokiCalendar.js
//Service
const calendarService = () => {
  const
    today = dayjs(),

    listMaker = () => {
      console.log(today);
    };

  //執行
  listMaker();
}
```

#### 日曆資料物件
左右兩個日曆各自所需要的 li、標題、哪個月，都使用物件來初始化。若要讀取修改就跟這些物件來傳入傳出。

- 宣告一開始預設的 listBox,title,thisDate 來對應上列的資料變數名稱。以及這些都是事後可被多次修改存取的固定變數。
- 多一個可重寫的 theDay 作為時間參考，如果 theDay 被指定成 3 月，那麼左日曆會是 3 月，右日曆會是 4 月。第一次我們會抓今天當作 theDay 值。
- 參閱 [dayjs().add()](https://day.js.org/docs/en/manipulate/add) 手冊，能夠指定某時間物件做增加（若參數為負數也視同減去）。
- theDay 必須要是 let 宣告，隨著後續的改變日期我們會調整這個時間參考。

```js
const calendarService = () => {
  let
    theDay = dayjs();

  const
    today = dayjs(),
    objL = {
      listBox: '',
      title: '',
      thisDate: theDay,
    },
    objR = {
      listBox: '',
      title: '',
      thisDate: theDay.add(1, 'month'),
    },

    listMaker = () => {
      console.log(objL, objR);
    };

  //執行
  listMaker();
}
```

#### listMaker 設計
該 FN 是協助我們產生畫面所需要的 HTML 資料，由於資料分為兩次對應 objL 或 objR 來處理，幫助我們將資料做修改存入。

- 調整觸發 console.log 位置到新函式 listPrint。
- 執行 listMaker 前，需要將 obj 傳入，請 listMaker 幫我們規劃新的資料回存，也可以回傳給我們。
- 執行 listMaker 後，嘗試看看變換結果。

```js
const calendarService = () => {
  let
    theDay = dayjs();

  const
    today = dayjs(),
    objL = {
      listBox: '',
      title: '',
      thisDate: theDay,
    },
    objR = {
      listBox: '',
      title: '',
      thisDate: theDay.add(1, 'month'),
    },

    listMaker = (obj) => {
      obj.title = 'lokiTest';
      return obj;
    },

    listPrint = () => {
      const tmp = listMaker(objL).title;  //回傳的 obj 直接再拿取 title
      console.log(tmp, objL.title); //直接拿共用變數也是可以，一樣的記憶體位置
    };

  //執行
  listPrint();
}
```

##### 算日子與生成
從傳入的 obj 我們要將 thisDate 還原成日曆。透過 thisDate 去算出一個日曆需要的以下資料：

- **firstDay 第一天是星期幾**
透過 [`.date(1)`](https://day.js.org/docs/en/get-set/date) 可以把物件變為 1 號，再接著用 [`.day()`](https://day.js.org/docs/en/get-set/day) 查詢周幾。dayjs 特性可以連續作業。
- **totalDay 這個月有幾天**
透過 [`.daysInMonth()`](https://day.js.org/docs/zh-CN/display/days-in-month) 就能快速得到。
- **1 號之前的空白日子`<li class="JsCal"></li>`有幾個並寫入 listBox**
由於初格是周一，因此如果 firstDay => 空格數，那麼 1 => 0 、6 => 5 、0 （等價 7) => 6。思考轉換邏輯跑迴圈，這些可以先塞入 listBox。
- **1 號開始的存在日子`<li class="JsCal"></li>`有幾個並寫入 listBox**
第一次規劃保留 className 的彈性，之後會再複雜去判斷追加 class。

```js
const calendarService = () => {
  // ...
    listMaker = (obj) => {
      const
        firstDay = obj.thisDate.date(1).day(),
        totalDay = obj.thisDate.daysInMonth();

      // 0 可以當 false
      for (let i = 1; i < (firstDay || 7); i++) {
        obj.listBox += `<li class="JsCal"></li>`;
      }

      for (let i = 1; i <= totalDay; i++) {
        let classStr = 'JsCal';
        obj.listBox += `<li class="${classStr}">${i}</li>`;
      }

      return obj;
    },

    listPrint = () => {
      console.log(listMaker(objL)); //測試輸出
    };

  //執行
  listPrint();
}
```

再將這些已產生的最簡易的 li 清單嘗試對應到年曆上。隨著成功後再慢慢添加其他外觀考量的 li 類型。調整 listPrint：
- 綁定`listMaker(objL)`的結果之 listBox 傳回到`.leftDayList`畫面上
- 綁定`listMaker(objLR)`的結果之 listBox 傳回到`.rightDayList`畫面上

```js
listPrint = () => {
  // console.log(listMaker(objL));
  document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
  document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;
};
```

##### 自翻譯的標題
再來也讓標題文字正確，預計要呈現的方式為月份中文國字與西元年數字。左右年曆的 day 物件就位於`obj{L,R}.thisDate`對其利用：
- 透過 [`month()`](https://day.js.org/docs/en/get-set/month) 獲取月份值
- 以及 [`year()`](https://day.js.org/docs/en/get-set/year) 獲取西元值

接著要把 month() 之索引值變成文字。除了手動去建立索引轉月份文字的陣列，dayJS 也提供了國家地區翻譯。也就是可以省下自建中文對應的文字陣列作業。從 [i18n](https://day.js.org/docs/en/i18n/i18n) 得知支援了 zh-TW，這裡採用 [cdn](https://day.js.org/docs/en/i18n/loading-into-browser) 方式設定給 dayjs

此外，若要獲取中文字串的 [月份清單](https://day.js.org/docs/en/i18n/listing-months-weekdays)，還需要透過 LocaleData Plugin 來擴展功能載入。由於 DayJS 預設只有核心功能，因此參考如何使用 [瀏覽器 cdn 載入插件](https://day.js.org/docs/en/plugin/loading-into-browser)。根據關鍵字為 LocaleData 做替換。

在原 html head 位置的 dayjs 下方使用 cdn 多掛載繁體語言包以及 locale 插件，因此 cdn 調整如下：

```html
<!-- day.js -->
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/locale/zh-tw.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/localeData.js"></script>
```

以及到 js 內第一行插入代碼，確保地區已切換以及插件已開啟供給整份 js 使用。注意 [瀏覽器初始化插件](https://day.js.org/docs/en/plugin/loading-into-browser) 的方式稍微不同。被藏在 window 大物件底下。（當然 window 可以偷懶不寫）：

```js
//dayjs init
dayjs.locale('zh-tw');
dayjs.extend(window.dayjs_plugin_localeData);

//全域變數宣告區
//...
```

- 此時嘗試在畫面 console 介面輸入`dayjs.months()`是否如願拿到中文月份的字串陣列。
- 現在可以產生類似 <mark>一月 2022</mark> 的標題，產生的時機適合列於 return obj 之前。
- 然而再由 listPrint 將畫面標題替換掉。

```js
//...
listMaker = (obj) => {
  const
    firstDay = obj.thisDate.date(1).day(),
    totalDay = obj.thisDate.daysInMonth();

  for (let i = 1; i < (firstDay || 7); i++) {
    obj.listBox += `<li class="JsCal"></li>`;
  }

  for (let i = 1; i <= totalDay; i++) {
    let classStr = 'JsCal';
    obj.listBox += `<li class="${classStr}">${i}</li>`;
  }

  //將 months 值丟入 dayjs.months() 陣列換取中文字，以及獲取 year 值。回存到 obj 的標題屬性
  obj.title = `${dayjs.months()[obj.thisDate.month()]} ${obj.thisDate.year()}`;
  return obj;
},
listPrint = () => {
  document.querySelector('.leftDayList').innerHTML = listMaker(objL).listBox;
  document.querySelector('.rightDayList').innerHTML = listMaker(objR).listBox;
  
  //替換文字
  document.querySelector('.leftBar>h4').textContent = objL.title;
  document.querySelector('.rightBar>h4').textContent = objR.title;
};
//...
```

> 想知道 zh-TW 有哪些中文轉換，可參考 [官方 Github](https://github.com/iamkun/dayjs/blob/dev/src/locale/zh-tw.js)。

#### 特定日子狀態
接著再根據判斷以下幾種組合對應 class：

##### 過期
如果早於今天的 li（包含當天不給預約），只需提供。delDay 即可，不需要考慮其他 class 增添。判斷方式為：

- 從日曆的時間物件調整 date(i) 是否早於 today。
- 利用插件 [IsSameOrBefore](https://day.js.org/docs/en/plugin/is-same-or-before) 來快速取得布林值。需先宣告插件
- 檢查畫面是否舊日子畫線。

```html index.html
<head>
  <!-- ... -->
  <!-- day.js -->
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/locale/zh-tw.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/localeData.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/isSameOrBefore.js"></script>
  <!-- ... -->
</head>
```
```js
//dayjs init
dayjs.locale('zh-tw');
dayjs.extend(dayjs_plugin_localeData);
dayjs.extend(dayjs_plugin_isSameOrBefore); //宣告

// ...
listMaker = (obj) => {
// ...
    for (let i = 1; i <= totalDay; i++) {
      let classStr = 'JsCal';

      if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
      obj.listBox += `<li class="${classStr}">${i}</li>`;
    }
// ...
},
// ...
```

##### 周末假日
週六週日需要標示`.holiday`。判斷方式為：

- 1 號日為假設為周日 0。那麼 i=1,7 時成立紅色字，每 7 天同輪迴
- 1 號日為假設為周一 1。那麼 i=6,7 時成立紅色字，每 7 天同輪迴
- 1 號日為假設為周六 6。那麼 i=1,2 時成立紅色字，每 7 天同輪迴
- 1 號日為假設為周 x。那麼當 (x+i) 範圍為 1,7,8... 都會是紅字
- 1 號日為假設為周 x。那麼當 (x+i)/7 餘數為 0,1... 都會是紅字
- 如此推演出`(i + firstDay) % 7 < 2`

將此判斷塞入，非過期的判斷邏輯下。

```js
listMaker = (obj) => {
// ...
    for (let i = 1; i <= totalDay; i++) {
      let classStr = 'JsCal';

      if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
      else {
        if ((i + firstDay) % 7 < 2) classStr += ' holiday'; // 一般假日
      }
      obj.listBox += `<li class="${classStr}">${i}</li>`;
    }
// ...
},
```

##### 國定假日
接著處理國定假日的紅色標記，需要由 db.json 提供的陣列做為判斷。使用 Array.prototype.includes 判別指定 value 是否存在。

- 原先已先規劃初始變數為`nationalHoliday = []`
- fetch 回來的資料已透過解構回存到 nationalHoliday
- 利用該月曆的 thisDate 物件，提問指定日 dat(i) 之時間物件。接著利用 [format 轉為字串](https://day.js.org/docs/en/display/format) YYYY-MM-DD 使得與 nationalHoliday 格式一致
- 最後使用 nationalHoliday 是否 includes 目前回圈內的日期。整合周末假日一起判斷。

```js
listMaker = (obj) => {
// ...
    for (let i = 1; i <= totalDay; i++) {
      let classStr = 'JsCal';

      if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
      else {
        if ((i + firstDay) % 7 < 2 || nationalHoliday.includes(dateStr)) classStr += ' holiday'; //是否周末假日或國定日
      }
      obj.listBox += `<li class="${classStr}">${i}</li>`;
    }
// ...
},
```

此時若無法確認功能是否正常，可以暫時將參考日的 theDay 改成有國定假日的月份驗證。例如：

```js
const calendarService = () => {
  let
    // theDay = dayjs();
    theDay = dayjs('2023-01-01');
  // ...
}
```

##### 滿帳
如果該天的銷售加總情況總數剛好符合整個營區的可售總數，代表當日已經滿位無法接受預訂。需要增加 class 為 fullDay 效果。

- 