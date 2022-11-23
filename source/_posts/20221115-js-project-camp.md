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
        const dateStr = obj.thisDate.date(i).format('YYYY-MM-DD');// 將該天轉為指定的日期字串
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

- 透過 fetch 以及全域變數 pallet.count 能得知整個營位數量上限。
- 將每次 li 的日期（共用前面出現的 dateStr)，去尋找 booked 之每筆小物件的指定位置 date 是否存在相同，有則嘗試將該小物件的 sellout 加總起來是否符合 pallet.count 上限。
- booked 是個陣列，批示檢查每個 value 底下的 date，使用 [`array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 方式探詢。有找到就利用這個 value 處理計算，沒有會是 undefined 視同 false。
- 如果有找到，對這個特定物件只抽取底下 sellout 物件的所有 value 轉為陣列。使用`Object.values()`。
- 獲得存數字的陣列，利用 [`Array.reduce()`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 能幫助每次抽取 item 與上次 return 的值做處理（需指定 init 參數當作前次 return)，適合累加這樣的做法。
- 將累加的值與總值相比，就能知道是否滿帳了。

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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