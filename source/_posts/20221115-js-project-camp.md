---
title: "[期末課程] JavaScript 期末實作：商務網站"
categories:
  - 職訓教材
  - 範例實作網站
tag:
  - JavaScript 程式設計（假日班）
date: 2022-11-15 23:03:07
---

![](assets/images/banner/js.png)
本篇將整合過去基本課程 JavaScript 相關知識進行經驗整合，並接續上期課程 RWD 響應式網頁設計（假日班）期末實作。我們將開發一些商務動態元件模組，你將會接觸到訂房功能模組設計，動態載入效果以及一些小功能。

<!-- more -->

# 提前準備
正式開始教學之前，請先獲取本教學所需的初始素材。該素材已提供具備靜態的商務網站版型內容（主題：露營官網），透過此素材作為商務網站練習之實作起始點。並透過 VSCode 與 Live Server 套件完成布署。

## 素材下載
本教材的範例程式碼已放在 GitHub 專案中，建議直接使用 Git `clone` 下來，以便之後同步更新。

```bash
git clone https://github.com/summer10920/studies_TeachDemo_JS.git
cd studies_TeachDemo_JS/project_Camp/source
```

如果你暫時不想用 Git，也可以改用瀏覽器前往 GitHub 專案頁面下載壓縮檔：
- [Source Project](https://github.com/summer10920/studies_TeachDemo_JS/tree/master/project_Camp/source) 基本 HTML/CSS/Bootstrap5.2 之商務網站素材。

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

```js lokiCalendar.js
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
列印之前，要將左側`<ul class="leftDayList">`與右側`<ul class="rightDayList">`的各自 li 元素產生出來。而生成這些列表需要思考一些發想：

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

```js lokiCalendar.js
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

```js lokiCalendar.js
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

```js lokiCalendar.js
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

```js lokiCalendar.js
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

```js lokiCalendar.js
//dayjs init
dayjs.locale('zh-tw');
dayjs.extend(window.dayjs_plugin_localeData);

//全域變數宣告區
//...
```

- 此時嘗試在畫面 console 介面輸入`dayjs.months()`是否如願拿到中文月份的字串陣列。
- 現在可以產生類似 <mark>一月 2022</mark> 的標題，產生的時機適合列於 return obj 之前。
- 然而再由 listPrint 將畫面標題替換掉。

```js lokiCalendar.js
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
```js lokiCalendar.js
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

```js lokiCalendar.js
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

```js lokiCalendar.js
listMaker = (obj) => {
// ...
    for (let i = 1; i <= totalDay; i++) {
      let classStr = 'JsCal';

      if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
      else {
        const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD');// 將該天轉為指定的日期字串
        if ((i + firstDay) % 7 < 2 || nationalHoliday.includes(dateStr)) classStr += ' holiday'; //是否周末假日或國定日
      }
      obj.listBox += `<li class="${classStr}">${i}</li>`;
    }
// ...
},
```

此時若無法確認功能是否正常，可以暫時將參考日的 theDay 改成有國定假日的月份驗證。例如：

```js lokiCalendar.js
const calendarService = () => {
  let
    // theDay = dayjs();
    theDay = dayjs('2023-01-01');
  // ...
}
```

##### 滿帳
如果該天的銷售加總情況總數剛好符合整個營區的可售總數，代表當日已經滿位無法接受預訂。需要增加 class 為 fullDay 效果。

- 透過 fetch 以及全域變數 pallet.count 能得知整個營位數量上限。
- 將每次 li 的日期（共用前面出現的 dateStr)，去尋找 booked 之每筆小物件的指定位置 date 是否存在相同，有則嘗試將該小物件的 sellout 加總起來是否符合 pallet.count 上限。
- booked 是個陣列，批示檢查每個 value 底下的 date，使用 [`array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 方式探詢。有找到就利用這個 value 處理計算，沒有會是 undefined 視同 false。
- 如果有找到，對這個特定物件只抽取底下 sellout 物件的所有 value 轉為陣列。使用`Object.values()`。
- 獲得存數字的陣列，利用 [`Array.reduce()`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 能幫助每次抽取 item 與上次 return 的值做處理（需指定 init 參數當作前次 return)，適合累加這樣的做法。
- 將累加的值與總值相比，就能知道是否滿帳了。

```js lokiCalendar.js
listMaker = (obj) => {
// ...
  for (let i = 1; i <= totalDay; i++) {
    let classStr = 'JsCal';

    if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
    else {
      const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD');
      if ((i + firstDay) % 7 < 2 || nationalHoliday.includes(dateStr)) classStr += ' holiday'; //假日

      const checkDay = booked.find(item => item.date == dateStr); // 尋找該日是否存在於 booked 陣列內之各 object.date，有回傳該指定 object
      if (checkDay && !(pallet.count - Object.values(checkDay.sellout).reduce((preVal, num) => preVal + num, 0))) //總數與指定 object.sellout 之 value 總和相等媽
        classStr += ' fullDay'; //滿帳

    }
    obj.listBox += `<li class="${classStr}">${i}</li>`;
  }
// ...
}
```

### 操作事件
這裡開始能對月曆進行動態操作行為，包含了選擇日期以及更改月曆兩項重點：先完成可更改日曆之部分，會利用到閉包特性。

#### 更改月曆
目前已知，整個日曆的計算會透過`listPrint()`來帶動兩次`listMaker(obj)`與輸出畫面。而參考日的區間變數`theDay`能演算出`obj.thisDate`的兩組每日號（本月與下月）。

隨著開始要加減月份的動作要求，要進行日曆的增減一個月（透過`dayjs().add(1, 'month')`方式），除非也把`let theDay = dayjs()`移出成為全域變數來操作，才有辦法從外部去異動 theDay 的變化。使得整個 listMarker 可以重新算出所有日子。

如果希望區間變數不搬移出來，同時又能從外部去控制該變數增減月份，可以利用 [閉包觀念](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures) 去操作。

##### 閉包 print
閉包簡單來說，可以只將內部的 fn 執行指令傳送出來，再透過物件導向呼喚該內部小函式執行存取自己內部的變數。這樣就能保持區間內相同的記憶體位置變數存取。

- 取消原本 calendarService 最後的`listPrint()`，我們不會再透過`calendarService()`來間接觸這裡。
- calendarService 本身要能 return 回傳一物件`{}`，物件包含含有關鍵字屬性以及執行內部小函式的方法。任何區間外的位置都能透過這個回傳方式來呼喚區間內的行為方法。
- 在 init 處，調整為將 calendarService 當成一個執行後所回傳的物件存起來並為全域變數。

```js lokiCalendar.js
//dayjs init
//...

//全域變數宣告區
let
  fetchPath = 'db.json',
  nationalHoliday = [],
  booked = [],
  pallet = {},
  calendarCtrl = null ////////////////////////////初始日曆物件
  ;

//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    ({ nationalHoliday, booked, pallet } = json);

    calendarCtrl = calendarService(); //////////////calendarService 提供一個函式物件
    calendarCtrl.print(); //////////////////////////改從這裡去執行 print
  });
}

//執行
init();

//Service
const calendarService = () => {
  //...

  const
  //...
    listMaker = (obj) => {
    //...
    },
    listPrint = () => {
    //...
    };

  //捨棄立即觸發執行，讓整個函式成為一個只有多個代碼指令的結構。
  // listPrint();
  return {
    print: () => listPrint() //////////////////////print 代表了 listPrint()
  }
}
```

現在已經不是從 calendarService 來進行 listPrint 而是從 init 這裡透過 calendarCtrl.print() 來操作 calendarCtrl 內部的 listPrint。

##### 增設 add 與 sub
現在我們可以從 init 去綁定按鈕去執行 calendarCtrl 做一些事情，外部只需如何透過 calendarCtrl 來操弄 calendarService 物件，不需要也無法清楚函式物件內部狀況。

- calendarService 多回傳 2 個方法 add 與 sub，都能操作調整 theDay （透過新函式`changeMonth(count)`完成此動作）與重新輸出 listPrint。
- changeMonth 會將 thdDay 重新變換並回存，前面已用過 add，故透過 add(number,Shorthand) 來增減 1 個月單位。
- changeMonth 還要更改 objL 與 objR 的乾淨狀態，後面的 listPrint 塞入才能從清空狀態下累加。因此要調整 const 回 let。
- DOM 綁定 calendarCtrl.add() 或 sub()，而超連結原本預設行為可以取消。

```js lokiCalendar.js
//dayjs init
//...

//全域變數宣告區
//...

//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    ({ nationalHoliday, booked, pallet } = json);

    calendarCtrl = calendarService();
    calendarCtrl.print();

    document.querySelector('a[href="#nextCtrl"]').onclick = (event) => { //綁定 event
      event.preventDefault();
      calendarCtrl.add();
    }
    document.querySelector('a[href="#prevCtrl"]').onclick = (event) => { //綁定 event
      event.preventDefault();
      calendarCtrl.sub();
    }
  });
}

//執行
init();

//Service
const calendarService = () => {
  let
    theDay = dayjs(),
    today = dayjs(),
    objL = {    //改成 let
      listBox: '',
      title: '',
      thisDate: theDay,
    },
    objR = {    //同理
      listBox: '',
      title: '',
      thisDate: theDay.add(1, 'M'),
    };

  const
    changeMonth = (count) => {
      theDay = theDay.add(count, 'M'); // 增加 1 個月，手冊上寫可使用 shortCode
      objL = {  //obj 回到乾淨狀態下，使得 listMaker 可以重新賦予
        listBox: '',
        title: '',
        thisDate: theDay,
      };
      objR = {  //同理
        listBox: '',
        title: '',
        thisDate: theDay.add(1, 'month'),
      };
    },
    listMaker = (obj) => {
      //..
    },
    listPrint = () => {
      //...
    };

  return {
    print: () => listPrint(),
    add: () => { //如果 add，就是要求增加一個月，使得 theDay 可以 + 1。再進行 listPrint
      changeMonth(1);
      listPrint();
    },
    sub: () => {
      changeMonth(-1); //同理
      listPrint();
    },
  }
}
```

#### 選擇日期
首先需確認使用邏輯，除了過期日子都能給予選擇，包含滿帳也是可以選擇的（可選擇退房日）。在 listMaker 對可以互動的日子添加 class`.selectDay`。

- 根據非過期的條件範圍下，else 處賦予`.selectDay` class 獲得外觀 pointer。

```js lokiCalendar.js
listMaker = obj => {
  //...
  for (let i = 1; i <= totalDay; i++) {
    let classStr = 'JsCal';

    if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay'; //過期
    else {
      //...
      classStr += ' selectDay'; //////////////給予可選擇的互動視覺
    }
    obj.listBox += `<li class="${classStr}">${i}</li>`;
  }
  //...
},
```

##### 綁定選擇
對於每次進行 print 後這些新 li 元素都要重新宣告 click 事件，便於進行選擇日期動作處理。

- printList 後期，設定所有持有 Class selectDay 的 li 之 click 事件。
- click 觸發內部的 chooseList()，或者也可以從全域變數`calendarCtrl.choose()`來操作，後者建議原因能操作的一致姓。
- 追加 return 的轉派`chooseList(item)`
- 編列 chooseList 與測試。

```js lokiCalendar.js
//Service
const calendarService = () => {
  //...

  const
    changeMonth = count => {
      //...
    },
    listMaker = obj => {
      //...
    },
    listPrint = () => {
      //...

      document.querySelectorAll('.selectDay').forEach((item) => { //賦予 selectDay 可點擊
        item.onclick = () => calendarCtrl.choose(item); // 每次點選將執行給該函式並傳送 item 自己
      })
    },
    chooseList = item => { //最後回到這裡，測試 event 事件是否成功
      console.log(item);
    };

  return {
    print: () => listPrint(),
    add: () => {
      changeMonth(1);
      listPrint();
    },
    sub: () => {
      changeMonth(-1);
      listPrint();
    },
    choose: item => chooseList(item) //轉派
  }
}
```

##### Head 與 Foot 選取
日曆上能進行兩次點擊分別為從何點起與從何結束。為了方便日期計算，所有的日子都需要標記提供 [dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 方式給予日期字串。

- 修改原本 ListBox 的生成方式。添加該日的日期字串。

```js lokiCalendar.js
listMaker = obj => {
  //...

  for (let i = 1; i <= totalDay; i++) {
    let classStr = 'JsCal';
    const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD'); //搬移時機，使得 listBox 可以使用

    if (obj.thisDate.date(i).isSameOrBefore(today)) classStr += ' delDay';
    else {
      // const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD'); //搬移
      if ((i + firstDay) % 7 < 2 || nationalHoliday.includes(dateStr)) classStr += ' holiday';

      const checkDay = booked.find(item => item.date == dateStr);
      if (checkDay && !(pallet.count - Object.values(checkDay.sellout).reduce((preVal, num) => preVal + num, 0)))
        classStr += ' fullDay';

      classStr += ' selectDay';
    }
    // obj.listBox += `<li class="${classStr}">${i}</li>`;
    obj.listBox += `<li class="${classStr}" data-date="${dateStr}">${i}</li>`; //追加 DateStr 至元素
  }

  obj.title = `${dayjs.months()[obj.thisDate.month()]} ${obj.thisDate.year()}`;
  return obj;
},
```

接著邏輯思考應用性，每當點選第一次 Class 需賦予 selectHead，第二次為 class 賦予 selectFoot，且可以支援先選截止日再選起始日或重新再選擇。因此考慮兩次點擊的組合性。

主函式使用一個陣列長度 2，來做為判斷 chooseLists 內部受點選狀況：

1. `[null,null]`，代表第一次點選，作業為`[1st,null]`。
2. `[1st,null]`，代表第二次點選，作業為`[1st,2nd]`。
3. 同上，如果 2nd 日期比 1st 還早，代表使用者故意點反，要對調成`[2nd,1st]`。
4. `[!null,!null]`，代表第二次點選，作業為`[round2's 1st,null]`。

整理好以上邏輯，開始設計以下動作：

- 宣告`chooseDays = [null,null]`初始化。
- 根據前列 4 種考量，做行為前判斷與行為後動作。
- 需判斷日子是否早於指定日，使用前面出現過的 isSameOrBefore，利用 dataset 轉為時間物件。

```js lokiCalendar.js
const
  chooseDays = [null, null], // 初始已選陣列
  //...

  chooseList = item => {
    // console.log(item);
    if (!chooseDays[0] && !chooseDays[1]) { //[null,null] => first click
      chooseDays[0] = item; //存入
      chooseDays[0].classList.add('selectHead');
    } else if (chooseDays[0] && !chooseDays[1]) {  //[item,null]=> second click
      chooseDays[1] = item; //先存入

      const foot2head = dayjs(item.dataset.date).isSameOrBefore(dayjs(chooseDays[0].dataset.date)); //目前 item 是否早於先前點的日子，
      if (foot2head) { //成立代表先 foot-> 才 head =>需對調
        chooseDays[0].classList.replace('selectHead', 'selectFoot');
        chooseDays[1].classList.add('selectHead');
        [chooseDays[0], chooseDays[1]] = [chooseDays[1], chooseDays[0]];//利用 ES6 解構進行 swap
      } else chooseDays[1].classList.add('selectFoot');
    } else { //[item,item] => third click

      chooseDays[0].classList.remove('selectHead');
      chooseDays[1].classList.remove('selectFoot');
      chooseDays[1] = null;

      //這裡的前三行的邏輯可以考慮跟前面 [null,null] 合併為前置判斷處理
      chooseDays[0] = item;
      chooseDays[0].classList.add('selectHead');
    }
  };
```

檢查畫面操作 click 多次是否正常顯示 selectHead 與 selectFoot 外觀。

##### Connect 選取
當成立了`[head,foot]`的陣列時，對畫面上所有的 li 快速檢查，若日期介於 head 與 foot 之間，class 要給予 selectConnect 的效果。

- 位於`chooseDays[0] && !chooseDays[1]`的範圍下，處理 DOM 選擇。
- 使用 querySelectAll 方式將所有的。selectDay 選取起來做批次判斷。
- 利用擴充插件 [isBetween](https://day.js.org/docs/en/plugin/is-between#docsNav) 協助判斷，記得宣告 cdn 與擴展 extend
- 符合條件的賦予 class 增列 selectConnect。
- 若 round 2 之後，也要消除這些 selectConnect。

```html index.html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/isBetween.js"></script>
```

```js lokiCalendar.js
dayjs.extend(dayjs_plugin_isBetween); //宣告

//...
const calendarService = () => {
  //...

  } else if (chooseDays[0] && !chooseDays[1]) {
    chooseDays[1] = item;

    const foot2head = dayjs(item.dataset.date).isSameOrBefore(dayjs(chooseDays[0].dataset.date));
    if (foot2head) {
      chooseDays[0].classList.replace('selectHead', 'selectFoot');
      chooseDays[1].classList.add('selectHead');
      [chooseDays[0], chooseDays[1]] = [chooseDays[1], chooseDays[0]];
    } else chooseDays[1].classList.add('selectFoot');

    //add selectConnect between head and foot
    document.querySelectorAll('li.selectDay').forEach(item => {
      if (dayjs(item.dataset.date).isBetween(chooseDays[0].dataset.date, chooseDays[1].dataset.date))
        item.classList.add('selectConnect');
    });
  } else { //[item,item] => third click
      document.querySelectorAll('li.selectConnect').forEach(
        item => item.classList.remove('selectConnect')
      );
  //...
  }
  
  //...
}
```

檢查畫面是否 selectHead 與 selectFoot 之間的日子是否具備 selectConnect。

##### 排除連續點擊 selectHead
最後還有一個小 bug，若連續點選 2 次 selectHead 則不要進行 chooseList 動作。這行為只會發生在 selectHead 已持有的狀態下，selectFoot 不會出現 2 次。我們可以在`calendarCtrl.choose(item)`列入判斷。此作用僅限於還沒有 selectFoot 情況下。

```js lokiCalendar.js
return {
  print: () => listPrint(),
  add: () => {
    changeMonth(1);
    listPrint();
  },
  sub: () => {
    changeMonth(-1);
    listPrint();
  },
  choose: item => {
    if (item.classList.contains('selectHead') && !chooseDays[1]) return;//如果點選的位置還是 selectHead 而且還沒有選擇到 selectFoot，就離開函式
    chooseList(item); //轉提供
  }
}
```

目前為止，萬年曆的功能開發到一段落。接下來要對 table 進行處理。在已選擇完 selectHead 與 selectFoot 結束時，需新規劃處理 tableMaker 作業。

```js lokiCalendar.js
chooseList = item => {
  if (!chooseDays[0] && !chooseDays[1]) { //[null,null] => first click
    //...
  } else if (chooseDays[0] && !chooseDays[1]) {  //[item,null]=> second click
    //...

    tableMaker();  //於選完 selectHead 與 selectFoot 後，觸發此動作

  } else { //[item,item] => third click
    //...
  }
},
tableMaker = () => {
  console.log(chooseDays); //測試
};
```

## table 列表
接著要將受選擇的 check-in 與 check-out 資料與可銷售的營位數做組合提供表格正確資訊與數量選單。首先要將表格所需的所有資料成為一個重要表單物件，任何對表格刷新都能從此表單物件存取或修改。該物件需要規劃到全域變數，方便多處使用，要整理的資料如下：

```js lokiCalendar.js
//全域變數宣告區
let
  fetchPath = 'db.json',
  nationalHoliday = [],
  booked = [],
  pallet = {},
  calendarCtrl = null,
  tableData = { //初始的表格資料
    totalPrice: 0, // 總價
    normalCount: 0, // 平日入住數
    holidayCount: 0, // 平日入住數
    pallet: { //營位資料 => 標題名稱、可賣數量、預約日金、小計、訂購數
      aArea: { title: '河畔 × A 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      bArea: { title: '山間 × B 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      cArea: { title: '平原 × C 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 },
      dArea: { title: '車屋 × D 區', sellCount: 0, sellInfo: '<div></div>', sumPrice: 0, orderCount: 0 }
    }
  };
```

### 初始表格輸出
目前畫面上的表格為假資料，任何要對表格進行生成的作業，都透過 tablePrint 來進行輸出。由於 table 上沒有特別標示 id 與獨特 class 做為 DOM 選擇，這裡利用 select option 元素的 name 屬性來做對象遍歷。

- 建立 tablePrint 函式，並搜索網頁上 form select 的所有 item 做遍歷。
- 遍歷到指定的位置替換 HTML 文字之動作設計。
- 設計 return，能使用 tableRefresh 來提供作業。

```js lokiCalendar.js
//Service
const calendarService = () => {
  let
    theDay = dayjs(),
    today = dayjs(),
    objL = {    //改成 let
      listBox: '',
      title: '',
      thisDate: theDay,
    },
    objR = {    //同理
      listBox: '',
      title: '',
      thisDate: theDay.add(1, 'M'),
    };

  const
    //...
    listMaker = obj => {
      //...
    },
    listPrint = () => {
      //...
    },
    chooseList = item => {
      //...
    },
    tableMaker = () => {
      //...
    },
    tablePrint = () => {
      document.querySelectorAll('form select').forEach(node => {
        const palletName = node.name; //ex: aArea

        //td>select>option 可賣數量
        const count = tableData.pallet[palletName].sellCount; //option 數量
        let optionStr = '';
        for (let i = 0; i <= count; i++) optionStr += `<option value="${i}">${i}</option>`;
        node.innerHTML = optionStr;
        node.disabled = !count; //如果為 0，禁用此

        //td>div 預約日金 
        const palletInfo = node.parentElement.previousElementSibling; //select=>上層=>前一格=td
        palletInfo.innerHTML = count == 0 ? '' : tableData.pallet[palletName].sellInfo; // 如果是 0，div 也可不要輸出了

        //td>label>剩餘 span 組 
        palletInfo.previousElementSibling.children.item(1).children.item(0).textContent = count;
      });

      //h3 文字
      document.querySelector('form>h3').textContent = `$0 / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日`;
    };

  return {
    //...
    tableRefresh: () => tablePrint() //轉提供
  }
}
```

然後綁定當 init 作業時，隨 fetch 完成後再利用`calendarCtrl.tableRefresh();`來使表格資料更新。

```js lokiCalendar.js
//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    ({ nationalHoliday, booked, pallet } = json);

    calendarCtrl = calendarService(); //calendarService 提供一個函式物件

    //...

    calendarCtrl.tableRefresh();
  });
}
```

此時檢查畫面是否已更新為不可選取的表格狀態。

### 計算表格輸出
回到前面未完成的 tableMaker。當我們完成萬年曆上的日期選擇時，需要重新計算目前選擇的日期範圍重新修訂 tableData 資料，接著再呼喚 tablePrint 表格修正輸出。由於會進行多次修正，最好是先將目前空表格的資料記錄起來成為初始狀態資料。隨著下一次要進行重新修動，從初始狀態資料開始建置會比較方便，否則需要先清除上次舊資料才能塞入新資料頗為麻煩。

在 calendarService 規劃一區間變數 defaultTableData，需將 TableData 複製指定給此變數，由於物件本身有 [淺層拷貝 Shallow copy](https://developer.mozilla.org/zh-CN/docs/Glossary/Shallow_copy) 的特性，這是由於物件最後的參考記憶體位置會是相同。所以一般的指定語句無法異部資料複製。若要做到 [深層拷貝 Deep Copy](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)，做法就是透過 JSON.stringify() 將轉為純字串，再轉回 JSON.parse() 成立全新的物件與記憶體空間位置。

```js lokiCalendar.js
//Service
const calendarService = () => {
  let
    //...

  const
    chooseDays = [null, null],
    defaultTableDataStr = JSON.stringify(tableData), //深層複製，純資料可行。

  //...
}
```
之後若要還原 tableData，只要將此字串轉為物件型別即可。回到 tableMaker 開始改寫 tableData：

- 將 defaultTableDataStr 轉回 object 給全域變數 tableData。每次這裡都會清歸使復位作業簡化。
- 一開始可售是 0，重新計算可售數，從 pallet 取回總數給各營位。後續經檢查已售數再相減得出正確可售數。
- 尋找萬年曆上的選擇日，包含了第一天與連續日（不含離開日），針對這幾天取出 dataset 的日期字串做處理檢查。
- 任何一天都要檢查 4 組營位類型的 booked 日子是否重疊，有就要確認已賣幾位，算出可售幾位。
- 同上，畫面只需要這幾天的最低值，也就是若連續 3 日的可售狀況為 3,2,1，那能賣給客人的只有 1。整合此邏輯使用 Math.min 來計算此值。
- 如果可售數不是 0，那才要顯示價格文字與小計價格
- 最後也要算出 title 要顯示的平假日統計數
- 完成計算同呼叫 tablePrint() 完成表格更新輸出動作。

```js lokiCalendar.js
tableMaker = () => {
  tableData = JSON.parse(defaultTableDataStr); //將字串轉為物件存入，此時物件會整個翻新包含記憶體位置也會與先前的不同
  for (const key in tableData.pallet) //取得 key=[a ~ d]Area
    tableData.pallet[key].sellCount = pallet[key].total; //將數量改回原總數，隨減去已賣數，剩餘就是可售數

  document.querySelectorAll('li.selectHead, li.selectConnect').forEach(node => { //尋找欲入住當晚的日子，不含離營日

    for (const key in tableData.pallet) { //每一個入住日都要檢查該日期是否出現在後端給的 booked 內

      const hasOrder = booked.find(item => item.date == node.dataset.date);
      if (hasOrder)
        //N 天只要找最低可售數就好，因此原總數減去 booked 的某日已售，就是 sellCount 剩餘數，而與目前剩餘數取小再回存 sellCount。
        tableData.pallet[key].sellCount = Math.min(tableData.pallet[key].sellCount, pallet[key].total - hasOrder.sellout[key]);

      //如果可售數不是 0，我們才有要顯示更多細節可以賣。只要沒房就不需要賣給客人了（顯示販售資訊）。
      if (tableData.pallet[key].sellCount) { //該日該營位若可售

        // 確認當日哪種日子價格，小計到 tableData，並塞入販售價格資訊。
        const dayPrice = pallet[key][node.classList.contains('holiday') ? 'holidayPrice' : 'normalPrice'];
        tableData.pallet[key].sumPrice += Number(dayPrice);
        tableData.pallet[key].sellInfo += `<div>${node.dataset.date}(${dayPrice})</div>`;
      }
    }

  tableData[node.classList.contains('holiday') ? 'holidayCount' : 'normalCount']++; //更新平假日統計數
  });
  tablePrint();
},
```

### 帳數選擇與變更總價
目前為止可以根據日子的選擇給予正確的數量與販售資訊，接著讓客戶選擇所需要的帳數進行價格統計。

- init 的 fetch 結束前，設定 form 內所有的 select 元素一個 change 事件，只要有任何的 value 變化就進行價格總計。
- 計算方式為，先將 tableData 總價格歸 0 重新計算。找到所有的 select 當下 value 與 tableData 的小計相乘疊加回總價格去。
- 最後記得輸出到畫面上。

```js lokiCalendar.js
//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    ({ nationalHoliday, booked, pallet } = json);

    //...

    const allSelect = document.querySelectorAll('form select'); //找到所有 select
    allSelect.forEach(node => { //跑批次
      node.onchange = function () { //設定 event，只要發生 change 就做以下事情
        tableData.totalPrice = 0; //總價歸 0 重新計算
        allSelect.forEach(item => { //對所有的 select value 與小計相乘疊加回總價去
          tableData.totalPrice += tableData.pallet[item.name].sumPrice * item.value
          tableData.pallet[item.name].orderCount = Number(item.value);//同時記住買了幾個營位數
        }
        );

        // 跑完迴圈後，將總價輸出到畫面上
        document.querySelector('form>h3').textContent = `$${tableData.totalPrice} / ${tableData.normalCount}晚平日，${tableData.holidayCount}晚假日`;
      }
    });

  });
}
```

## 提交訂單
來到預約功能最後環節，將目前已選擇的日期與指定帳數進行表單提交，不採用 HTML FORM 方式來傳遞表單，而是改用 fetch 方式進行發送訂單。而訂單的填寫資訊介面將另外使用 Bootstrap 的 offCanvas 完成。

### offCanvas
元素才已提供以下 section，我們需要透過 Bootstrap 來呼喚此 [offCanvas](https://getbootstrap.com/docs/5.2/components/offcanvas/) 作用顯示出來。我們希望按下按鈕可以呼叫 canvas，但又需要做一些 DOM 修改，最好的方式自訂手動的 [JS 操作](https://getbootstrap.com/docs/5.2/components/offcanvas/#via-javascript) 此 offCanvas 時機。從官方文件上對於 offCanvas 的用法為透過`new bootstrap.Offcanvas('node')`來執行 show 的方法。

```html index.html
<section
  class="offcanvas offcanvas-start"
  data-bs-backdrop="static"
>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">訂位確認</h5>
    <button
      class="btn-close"
      data-bs-dismiss="offcanvas"
    ></button>
  </div>
  <form
    id="orderForm"
    class="offcanvas-body  needs-validation"
    novalidate
  >
    <div class="card mb-3">
      <ol class="list-group list-group-flush list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">河畔 × A 區 </div>
            <div>
              <div>2022-12-06(1000)</div>
              <div>2022-12-07(1000)</div>
            </div>
          </div>
          <span class="badge bg-warning rounded-pill">x <span class="fs-6">2</span>帳</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">山間 × B 區 </div>
            <div>
              <div>2022-12-06(1000)</div>
              <div>2022-12-07(1000)</div>
            </div>
          </div>
          <span class="badge bg-warning rounded-pill">x <span class="fs-6">2</span>帳</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">平原 × C 區 </div>
            <div>
              <div>2022-12-06(1000)</div>
              <div>2022-12-07(1000)</div>
            </div>
          </div>
          <span class="badge bg-warning rounded-pill">x <span class="fs-6">2</span>帳</span>
        </li>
      </ol>
      <h5 class="card-header"> $12000 / 0 晚平日，2 晚假日
      </h5>
      <div class="card-body">
        <div class="mb-3">
          <label
            for="lokiUser"
            class="form-label"
          >訪客姓名</label>
          <input
            type="text"
            class="form-control form-control-sm"
            name="userName"
            id="lokiUser"
            required
          >
        </div>
        <div class="mb-3">
          <label
            for="lokiPhone"
            class="form-label"
          >聯絡手機</label>
          <input
            type="phone"
            class="form-control form-control-sm"
            id="lokiPhone"
            name="userPhone"
            required
          >
        </div>
        <div class="mb-3">
          <label
            for="lokiMail"
            class="form-label"
          >Email 電子信箱</label>
          <input
            type="email"
            class="form-control form-control-sm"
            id="lokiMail"
            name="userMail"
            required
          >
        </div>
      </div>
    </div>
    <div class="text-center">
      <button
        type="submit"
        class="btn btn-dark w-100"
      >提交訂單</button>
      <small>此預約系統僅預約功能，並不會對您進行收費</small>
    </div>
  </form>
</section>
```

測試預覽用法為在 console 測試指令：

```js console
const lokiCanvas = new bootstrap.Offcanvas(document.querySelector('.offcanvas'));
lokiCanvas.open();
```

### 預約按鈕與畫面
從前一步驟的測試預覽假畫面得知，每次的動作除了表單欄位不用整理，另需要重新動態整理 list 到 offcanvas 畫面上。由上至下需要產生之重點為：

```html list Group in Card
<li class="list-group-item d-flex justify-content-between align-items-start">
  <div class="ms-2 me-auto">
    <!-- 取自 tableData.pallet.aArea.title -->
    <div class="fw-bold">河畔 × A 區 </div>
    <!-- 取自 tableData.pallet.aArea.sellInfo -->
    <div>
      <div>2022-12-06(1000)</div>
      <div>2022-12-07(1000)</div>
    </div>
  </div>
  <!-- 取自 tableData.pallet.aArea.orderCount -->
  <span class="badge bg-warning rounded-pill">x <span class="fs-6">2</span>帳</span>
</li>
```

```html card header in Card
<!-- 取自右側畫面上的標題 -->
<h5 class="card-header"> $12000 / 0 晚平日，2 晚假日 </h5>
```

整合以上的要點，開始規劃經過所有流程：

- 當按下 form#selectPallet 的 button 時，需先整理 canvas 的 html 與輸出
- 適配相關文字位置，取自 tableData 與 Table 標題。li 的生成條件根據當購買數為 0 就不必輸出。
- 另外如果畫面上沒有任何 li 就代表沒有勾選位數，就鎖定確認表單之按鈕不給提交。

```js lokiCalendar.js
//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    //..

    const offcanvas = new bootstrap.Offcanvas(document.querySelector('.offcanvas'));
    document.querySelector('#selectPallet button').onclick = () => {
      liStr = '';
      for (const key in tableData.pallet) {
        console.log(key);
        if (tableData.pallet[key].orderCount == 0) continue;
        liStr += `
          <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">${tableData.pallet[key].title} </div>
                <div>
                  ${tableData.pallet[key].sellInfo}
                </div>
              </div>
              <span class="badge bg-warning rounded-pill">x <span class="fs-6">${tableData.pallet[key].orderCount}</span> 帳</span>
          </li>
        `;
      }

      document.querySelector('.offcanvas ol').innerHTML = liStr;
      document.querySelector('.offcanvas .card-header').textContent = document.querySelector('form>h3').textContent;
      document.querySelector('.offcanvas button[type="submit"]').disabled = !liStr;
      offcanvas.show();
    }
  });
}
```

檢查畫面操作是否如期結果。

### 送出處理
最後部分，將表單資料提交至後端伺服器。在正式提交之前需先確認後端所需要的資料格式標準為何，前端只需將客戶資訊、購買日期、以及數量即可。其餘皆可由後端自行組合資料。假設如下：

```json
{
  "userName":"loki",
  "userPhone":"0988112233",
  "userMail":"loki@gmail.com",
  "selectDate":["2022-12-07","2022-12-08"],
  "sellout":{"aArea":0,"bArea":0,"cArea":4,"dArea":0},
}
```

我們需將前面的 offCanvas 的資訊再重新整理：

- 透過 dom 指令，找到此 form 的 submit 事件。這裡使用 document.form 快速找到 id 為 orderForm 的提交。
- 避免 HTML 自動移轉且我們不想使用 submit 來直接轉移網頁，而是需要先整理資料以及透過 fetch 處理提交。
- 想快速取出 form 所有的資料，可透過`new Form(node)`來快速獲得表單資料物件 sendData。
- tableData 沒有購買日期資料，從萬年曆上提取出來，透過 map 成陣列轉為，再試圖插入到表單物件 sendData。
- 同上，注意伺服器沒有 js object 觀念，提交需先將物件陣列轉為字串。
- 接著四個營位的購買數也提交出來，透過 Object.key 整理出四個關鍵字再去搜索存回暫存物件 sellout。
- 同前面步驟，也需要轉為字串列入待提交的 senData。
- 最後檢查 formData 物件，與普通物件用法不同，可透過 [formData.entries()](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries) 方式確認該表單物件的資料內容物。

```js lokiCalendar.js
//初次執行項目
const init = () => {
  fetch(fetchPath).then(response => response.json()).then(json => {
    //...

    document.forms.orderForm.onsubmit = function (event) {
      event.preventDefault();

      const sendData = new FormData(this);

      const selectDateAry = [...document.querySelectorAll('li.selectHead, li.selectConnect')].map(e => e.dataset.date);
      sendData.append('selectDate', JSON.stringify(selectDateAry));

      const sellout = {};
      Object.keys(tableData.pallet).forEach(key => sellout[key] = tableData.pallet[key].orderCount);
      sendData.append('sellout', JSON.stringify(sellout));

      for (var pair of sendData.entries())
        console.log(pair[0] + ', ' + pair[1]);
      
    };
  });
}
```

### 驗證與 fetch 提交
要快速確認該表單物件是否有效，可透過該表單元素的 [checkValidity()](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLSelectElement/checkValidity) 確認是否為合格驗證。

- 當不合格時，搭配 Bootstrap 的 [驗證](https://getbootstrap.com/docs/5.2/forms/validation/) 功能，當不合格時找到此 form 元素 class 添加 was-validated 就能快速得到錯誤提示。
- 反之合格時，利用 fetch 的 POST（最低限度即可）提交至測試用的 [fake API](https://jsonplaceholder.typicode.com/) （目前沒有後端可以傳送），檢查 network 是否已成功提交給伺服器。
- 若後端有回應資料，則顯示 alert 成功，並嘗試導向網頁回到主站。

```js lokiCalendar.js
document.forms.orderForm.onsubmit = function (event) {
  event.preventDefault();

    //...

  // for (var pair of sendData.entries())
  //   console.log(pair[0] + ', ' + pair[1]);

  if (!this.checkValidity()) this.classList.add('was-validated');
  else {
    // fetch post
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: sendData,
      // headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => res.json()).then((data) => {
        if (data) {
          alert('感謝您的預約！期待見面');
          // document.location.href = '/'; //測試階段可以先隱匿起來
        }
      })
  }
};
```

# 燈箱功能
本單元將設計動態的燈箱設計，改良#lokiPark 能提供放大圖片之作用。在此之前提供以下 html 與 css 套用，僅著重於 js 設計解說：

## 前置作業
需準備能展滿全畫面的黑底燈箱區。於 index.html 尾處多增加一 section#lokiLightBox，以及獨立一筆新 lokiLightBox.css 並宣告於頁首。而我們需要透過 js 來完成動作觸發，可先完成 js 檔案的建檔前置，同建立新 lokiLightBox.js 至

```css lokiLightBox.css
#lokiLightBox {
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#lokiLightBox .backdrop {
  position: absolute;
  background: hsla(0, 0%, 0%, 0.75);
  backdrop-filter: blur(5px);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

#lokiLightBox .mainZone img {
  max-width: 85%;
  max-height: 70%;
}

#lokiLightBox .control {
  position: absolute;
  bottom: 40px;
}

#lokiLightBox .control img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid white;
  cursor: pointer;
  margin-top: 5px;
}
```
```html index.html
<head>
<!-- ... -->
<link
    rel="stylesheet"
    href="plugins/lokiLightBox.css"
  >
</head>
<body>
<!-- ... -->
<section
  id="lokiLightBox"
  style="display: flex;"
>
  <div class="mainZone">
    <img
      src="media/imgs/park01.jpg"
      class="img-fluid"
    >
    <p>Lorem ipsum dolor sit amet.</p>
  </div>
  <div class="control">
    <img src="media/imgs/park01.jpg">
  </div>
  <div class="backdrop"></div>
  </section>
  <!-- ... -->
  <script src="plugins/custom.js"></script>
  <script src="plugins/lokiCalendar.js"></script>
  <script src="plugins/lokiLightBox.js"></script>
```

此時能看見畫面已有部分假資料且呈現於畫面上。

## 縮圖生成
不再去異動靜態網頁的圖片路徑情況下，透過 JavaScript 來尋找指定 section 所有圖片與文字。以搜尋。col 為目標，透過該。col 元素底下的 img 與 h5 進行捕獲。

- 類似 jQuery 的 find 功能，我們可以對。col 進行二次搜索，最大差別僅在於 document 變成指定 node 對象。
- 由於不是搬移而是複製該節點底下的 img，我們使用 cloneNode() 來生成新複製的元素。
- 嘗試列印驗證

```js lokiLightBox.js
const init = () => {
  document.querySelectorAll('#lokiPark .col').forEach(item => {
    const minImg = item.querySelector('img').cloneNode();
    console.log(minImg);
  });
}

init();
```

出來會發現 init 因 const 無法宣告成功，這是因為同一份網頁上在其他 js 已經占用，因此我們不應該直接以全域變數來規劃 init 函式變數，可以改以 [創造函式並立即執行](https://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function) 他，這樣 init 只活在這個區間範圍內不受其他全域變數所影響，這是一個良好的保護與執行機制。同樣也無法以全域變數的觀念從 console 去調用此變數。

你可以使用以下幾種方式去執行該函式且不會被 JavaScript 當作無效指令而僅是一個表達式（改箭頭函式亦可）：

```js
// method1
!function (){
  // #code
}()

// method2
(function () {
  // #code
})();
```

因此改成以下寫法即可使兩個 init 變數不衝突，當然前例的 lokiCalendar.js 也該這樣做。

```js lokiLightBox.js
!function () {
  const init = () => {
    document.querySelectorAll('#lokiPark .col').forEach(item => {
      const minImg = item.querySelector('img').cloneNode();
      console.log(minImg);
    });
  }
  init();
}();
```

再來是將嘗試將文字以塞入到這些新 img 元素方便之後存取。並規劃插入適合位置

- 原 item 位置下層的標題 h5 文字，採 dataset 方式存入
- 找到縮圖 list 目標位置位於#lokiLightBox 底下的。control，由於。mainZone 之後也會需要存取到，因此建議找到上層即可，在二次搜索到此兩處，可先寫好。
- 靜態假資料可以手動移除註解。

```js lokiLightBox.js
!function () {
  const init = () => {
    const lightBox = document.querySelector('#lokiLightBox');
    const targetCtrl = lightBox.querySelector('.control');
    const targetMain = lightBox.querySelector('.mainZone');

    document.querySelectorAll('#lokiPark .col').forEach(item => {
      const minImg = item.querySelector('img').cloneNode();
      // console.log(minImg);
      minImg.dataset.str = item.querySelector('h5').textContent;

      targetCtrl.append(minImg);
    });
  }
  init();
}();
```

## 燈箱開關
控制燈箱開啟的時機為點選任何主畫面的示意圖以及黑色部分的背景。

- 剛好 foreach 的 item(col) 為這些示意圖，設定 event click 代表 lightBox 開啟。
- 同上，控制整個 style 的字串（多筆 css 屬性）可使用 cssText 來指定。
- 關閉與 foreach 無關，在外面設定點擊黑色部分為 lightBox 關閉。
- 最後將 html 的 lightBox 設定 style 為 display:none。

```js lokiLightBox.js
!function () {
  const init = () => {
    const lightBox = document.querySelector('#lokiLightBox');
    const targetCtrl = lightBox.querySelector('.control');
    const targetMain = lightBox.querySelector('.mainZone');

    document.querySelectorAll('#lokiPark .col').forEach(item => {
      const minImg = item.querySelector('img').cloneNode();
      // console.log(minImg);
      minImg.dataset.str = item.querySelector('h5').textContent;

      targetCtrl.append(minImg);

      item.onclick = function () { //每個示意圖都能控制燈箱顯示
        lightBox.style.cssText = 'display:flex';
      }
    });

    lightBox.querySelector('.backdrop').onclick = function () { //黑色部分為關閉
      lightBox.style.cssText = 'display:none';
    }
  }
  init();
}();
```
```html index.html
<section
    id="lokiLightBox"
    style="display: none;"
  >
  <!-- ... -->
</section>
```

## 縮圖動作替換主圖
接著改作小圖可以控制 mainZone 的替換。我們可以 minImg 在塞入 targetCtrl 之前就設定好 event。

- 設定 minImg 擁有 click 事件，每當這個 minImg 被點選時，會將自己的 img.src 與 dataset.str 指定給目標 img 或 p。
- 同上，這裡偷懶直接從 children[] 來找到。

```js lokiLightBox.js
!function () {
  const init = () => {
    const lightBox = document.querySelector('#lokiLightBox');
    const targetCtrl = lightBox.querySelector('.control');
    const targetMain = lightBox.querySelector('.mainZone');

    document.querySelectorAll('#lokiPark .col').forEach(item => {
      const minImg = item.querySelector('img').cloneNode();
      minImg.dataset.str = item.querySelector('h5').textContent;

      minImg.onclick = function () {
        targetMain.children[0].src = this.src;
        targetMain.children[1].textContent = this.dataset.str;
      }
      //應早於插入之前但其實可順序錯，這不影響記憶體位置

      targetCtrl.append(minImg);

      item.onclick = function () {
        lightBox.style.cssText = 'display:flex';
      }
    });

    lightBox.querySelector('.backdrop').onclick = function () {
      lightBox.style.cssText = 'display:none';
    }
  }
  init();
}();
```

此時任何縮圖點選都能正常換圖。而主畫面上的示意圖也要能控制換圖，此行為等價於 javaScript 模擬行為點了該縮圖。不妨指定只要下達：

- 該 item 被點選，則模擬該 item 的 minImg 被執行 click()。
- 完成上續，然後才開啟燈箱。

```js lokiLightBox.js
!function () {
  const init = () => {
    const lightBox = document.querySelector('#lokiLightBox');
    const targetCtrl = lightBox.querySelector('.control');
    const targetMain = lightBox.querySelector('.mainZone');

    document.querySelectorAll('#lokiPark .col').forEach(item => {
      const minImg = item.querySelector('img').cloneNode();
      minImg.dataset.str = item.querySelector('h5').textContent;

      minImg.onclick = function () {
        targetMain.children[0].src = this.src;
        targetMain.children[1].textContent = this.dataset.str;
      }

      targetCtrl.append(minImg);

      item.onclick = function () {
        lightBox.style.cssText = 'display:flex';
        minImg.click();//////////////A 示意圖 click 時 => 做 A min 圖 click() 行為
      }
    });

    lightBox.querySelector('.backdrop').onclick = function () {
      lightBox.style.cssText = 'display:none';
    }
  }
  init();
}();
```

最後有必要的對這些 col 增加滑鼠外觀

```css lokiLightBox.css
#lokiPark .col{
  cursor: pointer;
}
```

# 選單初始透明
一開始載入的網頁首頂處，產生可透明的選單背景。唯獨手機模式與離開頂處一定距離後才呈現背景色。先自訂 css 屬性 class 獲得 init 時可以透明化背景。同時為了增強顏色差異，將原 dark 背景改成 secondary。

```html index.html
<body
  data-bs-spy="scroll"
  data-bs-target="#lokiMenu"
>
  <nav class="navbar navbar-expand-lg text-bg-secondary navbar-dark position-fixed top-0 w-100">
    <!-- ... -->
  </nav>
  <!-- ... -->
</body>
```
```css style.css
nav.navbar {
  transition: background-color 1s;
}

nav.navbar.init {
  background-color: #0003 !important;
}
```

## 實作設計
透背只限定於桌機模式下，根據以下思考動作進行設計，並代碼簡短故寫在 custom.js 內：

- 找到指定處 nav.navbar 判斷該元素底下的 button 的 ComputedStyle（已渲染的效果，非行內 style) 之 display 是否為 none 就能確認是否為桌機。
- 要獲取某元素的 ComputedStyle 需透過 [`window.getComputedStyle(element)`](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/getComputedStyle) 來取得完整資訊物件，並透過 prototype 的 getPropertyValue 提取指定屬性之值。
- 只有大畫面或是離開頂部的 Y 軸位置，我們不要透明 (class 移除 init)，反之需要。
- 每次滾動網頁都要確認上面的動作，如有必要更改網頁尺寸時也要確認。

```js custom.js
onload = () => {
  var grid = document.querySelector('#lokiPark article.row');
  new Masonry(grid, { percentPosition: 'true' });

  //menu background effect
  const menuEffect = () => {
    const headerMenu = document.querySelector('nav.navbar');
    let desktopMode = getComputedStyle(headerMenu.querySelector('button')).getPropertyValue('display');

    if (scrollY > 500 || desktopMode != 'none') headerMenu.classList.remove('init');
    else headerMenu.classList.add('init');
  }

  onresize = () => {
    menuEffect();
  }
  onscroll = () => {
    menuEffect();
  }
}
```

# aos 滾動特效
本節介紹視覺 [套件 aos](https://michalsnik.github.io/aos/)，屬於一套 scroll animate 的載入特效。不影響 lazy loading 缺點仍可正常 SEO，能幫助用戶對於畫面體驗增加停留觀看的小技巧。

## 安裝與設定
從 github 的 readme 得知，安裝需要 css 與 js，於網頁最後地方進行 init 初始化。將以下代碼插入至 head 內。

```html index.html
<head>
  <!-- ... -->

<!-- aos -->
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
</head>
```

雖說 init 需要執行頁尾 body，我們可以放在 custom 內，畢竟我們已確保 DOM 會先生成完畢才執行 custom。

```js custom.js
onload = () => {
  // ...

  AOS.init();
}
```

最後在喜歡的指定元素處增添 dataset 屬性，例如`data-aos="fade-in"`。這裡使用 lokiPallet 示範：

>注意 aos 本身是依賴 css 的 transform 來動畫，因此注意原本元素是否已有自訂的 transform，像這裡的 col 本身有`transform: translateY(-50%);`的設定會干擾，因此設定放於內部的 card 上面。

```html
<section
  id="lokiPallet"
  class="container pt-5"
>
  <div class="row row-cols-4 g-0">
    <!--here--><img
      class="col img-fluid"
      src="media/imgs/palletHeader01.jpg"
      data-aos="flip-up"
    >
    <!--here--><img
      class="col img-fluid"
      src="media/imgs/palletHeader02.jpg"
      data-aos="flip-down"
      data-aos-delay="500"
    >
    <!--here--><img
      class="col img-fluid"
      src="media/imgs/palletHeader03.jpg"
      data-aos="flip-left"
      data-aos-delay="300"
    >
    <!--here--><img
      class="col img-fluid"
      src="media/imgs/palletHeader04.jpg"
      data-aos="flip-right"
      data-aos-delay="900"
    >
  </div>
  <header class="h2 my-5 border-start border-5 border-secondary ps-3">營位介紹</header>
  <article class="row row-cols-1 row-cols-md-2 flex-row-reverse g-4 gx-md-4 gy-md-0 overflow-hidden">
    <div class="col">
      <!--here--><div
        class="card text-bg-dark overflow-hidden border-0 shadow"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <img
          src="media/imgs/pallet01.jpeg"
          class="card-img"
        >
        <div
          class="card-img-overlay text-center bg-opacity-50 bg-dark d-flex flex-column justify-content-center align-items-center"
        >
          <h3 class="card-title text-warning fw-bolder">河畔 × A 區</h3>
          <ul class="list-unstyled">
            <li>每帳空間 4X8 公尺，獨立水槽與供電，共 20 帳</li>
            <li>帳邊可停車！每帳限 1 台車，超過酌收至指定停車場費用 $100/車</li>
            <li>每帳限四人，超出費用（五歲以上）酌收人頭費 $300</li>
          </ul>
          <h5 class="card-text">
            <label class="badge rounded-pill text-bg-light">一宿 / $1000</label>
            <label class="badge rounded-pill text-bg-dark">國定假日 / $1500</label>
          </h5>
        </div>
      </div>
    </div>
    <div class="col">
      <!--here--><div
        class="card text-bg-dark overflow-hidden border-0 shadow"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <img
          src="media/imgs/pallet02.jpg"
          class="card-img"
        >
        <div
          class="card-img-overlay text-center bg-opacity-50 bg-dark d-flex flex-column justify-content-center align-items-center"
        >
          <h3 class="card-title text-warning fw-bolder">山間 × B 區</h3>
          <ul class="list-unstyled">
            <li>每帳空間 4X8 公尺，獨立水槽與供電，共 12 帳</li>
            <li>帳邊可停車！每帳限 1 台車，超過酌收至指定停車場費用 $100/車</li>
            <li>每帳限四人，超出費用（五歲以上）酌收人頭費 $300</li>
          </ul>
          <h5 class="card-text">
            <label class="badge rounded-pill text-bg-light">一宿 / $1100</label>
            <label class="badge rounded-pill text-bg-dark">國定假日 / $1600</label>
          </h5>
        </div>
      </div>
    </div>
    <div class="col">
      <!--here--><div
        class="card text-bg-dark overflow-hidden border-0 shadow"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <img
          src="media/imgs/pallet03.jpg"
          class="card-img"
        >
        <div class="card-img-overlay text-center bg-opacity-50 bg-dark d-flex flex-column justify-content-center">
          <h3 class="card-title text-warning fw-bolder">平原 × C 區</h3>
          <ul class="list-unstyled">
            <li>每帳空間 4X8 公尺，獨立水槽與供電，共 12 帳</li>
            <li>帳邊不可停車！需停靠專用停車場，超過 1 車需酌收至指定停車場費用 $100/車</li>
            <li>每帳限四人，超出費用（五歲以上）酌收人頭費 $300</li>
          </ul>
          <h5 class="card-text">
            <label class="badge rounded-pill text-bg-light">一宿 / $1200</label>
            <label class="badge rounded-pill text-bg-dark">國定假日 / $1700</label>
          </h5>
        </div>
      </div>
    </div>
    <div class="col">
      <!--here--><div
        class="card text-bg-dark overflow-hidden border-0 shadow"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <img
          src="media/imgs/pallet04.jpg"
          class="card-img"
        >
        <div class="card-img-overlay text-center bg-opacity-50 bg-dark d-flex flex-column justify-content-center">
          <h3 class="card-title text-warning fw-bolder">車屋 × D 區</h3>
          <ul class="list-unstyled">
            <li>免搭帳輕鬆入帳，雙人獨立筒床與獨立衛浴水電，共 14 帳</li>
            <li>屋旁不可停車！需停靠專用停車場，超過 1 車需酌收至指定停車場費用 $100/車</li>
            <li>每屋上限三人，超出費用（五歲以上）酌收人頭費 $300</li>
          </ul>
          <h5 class="card-text">
            <label class="badge rounded-pill text-bg-light">一宿 / $2000</label>
            <label class="badge rounded-pill text-bg-dark">國定假日 / $2500</label>
          </h5>
        </div>
      </div>
    </div>
  </article>
</section>
```

# cookie 使用同意
根據歐盟《一般資料保護規範》(GDPR)，歐洲地區的顧客造訪您的網站時，您必須獲得他們的同意聲明才可收集他們的資料。因此越來越多網站配合趨勢都會特別增加 cookie 使用的詢問。若有使用 google analytics 等資料行為捕獲等動作，是應該增加此同意。

## 增添 html 與 css
於網頁最後處增添以下內容，並於 style.css 增加應有畫面：

```html index.html
<div id="lokiCookie">
  <h4>Cookie 之使用</h4>
  <p>為提供您更完善之個人化與即時服務，本網站運用 Cookies 技術，記錄、存取及蒐集您的瀏覽使用資訊，若您欲停用 Cookies 技術支援者，請自行操作瀏覽器設定加以排除，但有可能無法使用本網站之部分服務。</p>
  <button class="btn btn-outline-light float-end">我了解</button>
</div>
```
```css style.css
/****************Cookie Agree*****/
#lokiCookie {
  padding: 30px 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1b2a4dc7;
  z-index: 99999;

  /* display:none; */
  /* 若畫面成功則增加以上規則 */
}
```

## 增添 js 行為
參考舊文章說明 [Cookie 評估 24H 不顯示](https://summer10920.github.io/2020/04-21/js-sampleclass-1/#Cookie-%E8%A9%95%E4%BC%B0-24H-%E4%B8%8D%E9%A1%AF%E7%A4%BA)，cookie 的解說不再特別說明。於 custom.js 內部多增加以下動作：

- 將 cookie 取出轉為陣列。從陣列中去判斷是否存在指定的我方 cookie 字串
- 若不存在指定的字串，則顯示 cookie 資訊。
- 若用戶按下按鈕，則指定壽命為 180 天。
- 反之完成同意或已存在 cookie 接刪除此元素（亦可 display 為 none)。

```js
const
  itemStr = `cookieUsed=agree`,
  cookieNode = document.querySelector('#lokiCookie'),
  cookieAry = document.cookie.split('; ');

if (!cookieAry.includes(itemStr)) {
  cookieNode.style.display = 'block';

  cookieNode.querySelector('.btn').onclick = function () {
    document.cookie = `${itemStr}; max-age=${60 * 60 * 24 * 180}`;
    cookieNode.remove();
  }
}
else cookieNode.remove();
```

# 結尾
以上完整範例代碼，請詳閱 [Github](https://github.com/summer10920/studies_TeachDemo_JS/tree/master/project_Camp/final)。