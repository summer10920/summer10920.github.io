---
title: "[學習之路] Ajax 的相關領域技術與應用"
categories:
  - Zero Road
  - Web Fronted
tag:
  - JavaScript
  - jQuery
  - axios
date: 2020-12-14 17:40:15
---

Ajax 是「Asynchronous JavaScript and XML」（非同步的 JavaScript 與 XML 技術）的縮寫。我們知道靜態網頁都是一次性同步 (Synchronous HTTP Requests) 的請求與加載，每次要更新一個小部分都需要重新載入網頁。而透過 Ajax 能將網頁像電腦應用程式，不需要重新加載網頁情況下就能透過瀏覽器偷偷跟伺服器取得資料，並透過 DOM 技術更新一小部分的畫面。伺服器對 Ajax 資料請求回應通常是以三種資料格式其中之一（HTML、XML、JSON）

<!-- more -->

Ajax 使用非同步 (Asynchronous HTTP Requests) 方式，讓瀏覽器跟伺服器互相傳遞資料（可能是 string, html code, xml, json 格式），緊接著需畫面翻新時，直接透過 DOM 完成畫面調整。因此 Ajax 是指多種技術來接力完成行為：
- HTML/CSS: 先提供瀏覽器畫面讓使用者進行操作觸發
- XML/JSON/String/HTML: 伺服器採非同步方式將資料傳給瀏覽器之 JavaScript
- DOM: 瀏覽器將 HTML 進行新增修改刪除行為
- Asynchronous HTTP Requests: JavaScript 使用 HTTPRequest 物件 建立非同步的 HTTP 請求。

同步與非同步的網頁請求最大差異是：
- 同步 HTTP 請求會等待回應至整個網頁回來，因此網頁回應的時間內用戶不能做任何事情。每一次的網頁操作都是送出、等待、取得、顯示，才能做下一次操作。
- 非同步 HTTP 請求除了第一次的 HTTP/CSS 加載完成後，之後的每次操作透過 JavaScript 建立的 Aja 引擎來提出非同步請求，因此每次 Ajax 的動作都是獨立且非同步（對伺服器來說兩者不一致）且需要透過 DOM 來補足內容差異性。網頁可持續其他作業不需要等待網頁回應而受中斷。

# 四種 Ajax 技術方式

## JavaScript 的 Ajax
JS 的 Ajax 應用需要透過標準物件 `XMLHttpRequest()` 來完成初始化。主要提供 GET 跟 POST 方法來取得或送出資訊。宣告完成後你隨時可以透過屬性 readyState 來檢查目前處理進度（提供代碼 0~4)。順序作業如下：

### 介紹 XMLHttpRequest
雖然 XMLHttpRequest 這個物件的命名包含了 XML 與 HTTP 等字眼，但實際上 XMLHttpRequest 可用來接收任何類型的資料，不限於 XML 類型而已。正式運作 Ajax 你需要先用變數完成函式建構。

- XMLHttpRequest()：
建構式用來初始化一個 XMLHttpRequest 物件。必須在其他屬性或方法之前先宣告。
- readyState：
能知道目前的 HTTP 請求狀態
| value | state            | Description                                        |
| ----- | ---------------- | -------------------------------------------------- |
| 0     | UNSENT           | 客戶端已被建立，但 open() 方法尚未被呼叫。         |
| 1     | OPEND            | open() 方法已被呼叫。                              |
| 2     | HEADERS_RECEIVED | send() 方法已被呼叫，而且可取得 header 與狀態。    |
| 3     | LOADING          | 回應資料下載中，此時 responseText 會擁有部分資料。 |
| 4     | DONE             | 完成下載操作。                                     |
- responseText：
回傳一個 DOMString，其內容為請求之回應的文字內容。如請求失敗或尚未發送，則為 null。
- responseXML：
回傳一個 Document，其內容為請求之回應內容所解析成的文件物件。如請求失敗或尚未發送，又或是無法解析成 XML、HTML，則為 null。
- status：
回傳一個無符號短整數（unsigned short）表示已發送請求之回應的狀態。通常是 200 或 404 資訊。
- statusText：
回傳一個 DOMString 表示 HTTP 伺服器回應之字串。和 XMLHTTPRequest.status 不同的是，XMLHttpRequest.statusText 包含了回應的整個文字訊息（如 "200 OK"）。
- onreadystatechange()：
一個 EventHandler（事件處理器）函式，會於 readyState 屬性之狀態改變時被呼叫。
- abort()：
中止已發出的請求。會將 readyState 重置歸 0。
- getAllResponseHeaders()：
回傳所有的回應標頭（response headers），為一以斷行字元（CRLF）分行的字串，如未接收到回應（readystate!=4) 則為 null。
- getResponseHeader()：
回傳指定標頭文字之字串，假如回應尚未被接收或是標頭不存在於回應中則為 null。例如指定 getResponseHeader("Content-Type") 則可能回傳 application/json; charset=UTF-8 或 text/plain; charset=UTF-8 等資訊。
- setRequestHeader()：
設定 HTTP 請求標頭（request header）值。必須於 open() 之後、在 send() 之前。
- open()：
初始化一個請求。此方法用於 JavaScript 中；若要在 native code 中初始化請求，請以 openRequest() 作為替代。
```javascript
open(
    DOMString method,  //GET or POST
    DOMString url, //target URL
    optional boolean async, // true(default is async) or false(sync)
    optional DOMString user, //驗證用使用者名稱
    optional DOMString password //
);
```
- send()：
發送請求。如果為非同步請求（預設值），此方法將在發出請求後便立即回傳（return）。

### 完整作業順序說明
1. 宣告 XMLHttpRequest
```javascript
let jsAjax = new XMLHttpRequest(); // 宣告 HTTP 請求之標準物件
console.log(jsAjax.readyState); // 0 => 已經產生一個 XMLHttpRequest，但是還沒連結要撈的資料
```
2. 指定位置與送出
  - GET 方式：通常用於直接拿資料（不送資料），如真有必要直接寫在 URL 編碼上來提供。
```javascript GET
jsAjax.open("GET", "test.json", true); //設定方法與傳送位置，布林值預設為 true（非同步），可指定 true 來執行同步作業。
console.log(jsAjax.readyState); // 1 => 用了 open，但是還沒傳資料
jsAjax.send(); //傳送資料，沒有要送可以 null 不輸入
```
  - POST 方式（以 Form-Data 傳送）：與傳統表單一樣，需要特別宣告 `setRequestHeader` 方式。
```javascript POST
/*********POST 方式：如果你要傳 Form 資料給後端，資料格式如同 URL***********/
jsAjax.open("POST", "test.php"); //設定方法與傳送位置，布林值預設為 true（非同步）

jsAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); //告知採用 Form-Data 為 POST 內容
jsAjax.send("form=data&number=1"); //URL 編碼方式塞入資料
```
```php test.php
echo $_SERVER["REQUEST_METHOD"]; //POST
print_r($_POST); 
/*
  Array(
    [form] => data
    [number] => 1
  )
*/

//XMLHttpRequest 傳來的 POST 內容是 Form-Data
$data = file_get_contents('php://input',1);
echo $data; // form=data&number=1
```
  - POST 方式（以 Request Payload 傳送）：使用 JSON 方式傳送而不是傳統的 Form 表單內容。
```javascript POST
/*********POST 方式：如果你要傳 JSON 或文串給後端，後端需要以 Request Payload 方式處理***********/
jsAjax.open("POST", "test.php"); //設定方法與傳送位置，布林值預設為 true（非同步）

jsAjax.setRequestHeader('Content-type', 'application/json'); //預設值可不寫
jsAjax.send(JSON.stringify({ form: 'data', number: 1 })); //不要直接丟 JSON 給後端會看不懂，需轉成 string。

/***************************************也可傳送字串類型包含 HTML
jsAjax.send(document);
jsAjax.send('string');
*********************************************/
console.log(jsAjax.readyState); // 1 => 同上參數原因：需要一些時間所以無法立刻用 readyState 看出變化
```
```php PHP（後端）
echo $_SERVER["REQUEST_METHOD"]; //POST

//XMLHttpRequest 傳來的 POST 內容是 Request Payload
$data = file_get_contents('php://input',1);
echo $data; // {"form":"data","number":1}

print_r(json_decode($data));
/*
  stdClass Object(
    [form] => data
    [number] => 1
  )
*/
```
3. 取得資料來自 responseText
這裡可以分成兩種做法，分別是可透過事件 onreadystatechange（狀態變化時觸發）或 onload（作業結束）來完成回應之後續作業。
   - onreadystatechange
```javascript Method1:onreadystatechange
jsAjax.onreadystatechange = () => { //一個 EventHandler（事件處理器）函式，會於 readyState 屬性之狀態改變時被呼叫。
  console.log(jsAjax.readyState); // 2 （偵測到用 send) -> 3 （資料 loading 中） -> 4 （你撈到資料了，數據已經接收到）

  if (jsAjax.readyState == 4) {  //資料已收到
    if (jsAjax.status == 200) {  // HTTP 狀態碼：200 =>資料正確回傳，404 => 資料讀取錯誤

      const dataType = jsAjax.getResponseHeader("Content-Type");   // 取得回應的資料類型 (String)
      console.log(dataType);
      /* 
        application/json; charset=UTF-8 => JSON
        text/html; charset=UTF-8 => HTML or TEXT
      */
      if (dataType.indexOf("json") == 0) console.log(JSON.parse(jsAjax.responseText)); //如果是 JSON 格式先轉換再輸出
      if (dataType.indexOf("text") == 0) console.log(jsAjax.responseText); //如果是 TEXT 不處理直接輸出
    } else console.log("資料錯誤");
  }
}
```
   - onload
```javascript
jsAjax.onload = () => {
  console.log(jsAjax.status, jsAjax.readyState, "method2");   // 200 4 "method2"
  /******do something********/
}
```

## jQuery 的 Ajax
jQuery 是第三方的 JavaScript 函式庫，裡面提供了 Ajax 的完整寫法與多種快速應用。

### 介紹 $.ajax
jQuery 的 ajax() 是以 jQuery 自己的 Ajax 技術核心來使用，相對來說對於 jQuery 其他的 Ajax 語法比較複雜但比起原生 JavaScript 來說仍然設定上比較快。主體為$.ajax()，其參數設定都是直接用 JSON 格式來設定屬性方法（除了 URL 與 TYPE，其他都非必要）：

- $.ajax([settings])
核心物件，所有行為事件與回應都已參數傳遞進行指定。
- type：
HTTP 請求的方式 GET 或 POST。預設為 GET 可省略不寫
- dataType:
取回的資料該用甚麼型態來讀取。輸入 xml, json, script, text, html 為選項值。可不指定由 jQuery 自動判斷。
- url：
目標的 URL 網址。
- data:
傳送給伺服器端的資料，通常以 JSON 方式傳送。
- scucess：
請求成功時所需執行的函式，且會結果以傳遞變數回傳。
- error：
請求失敗時所需執行的函式，並將整個請求之 XHR(XMLHttpRequest) 物件透過傳遞變數給你。
- complete：
完成事件後（不論成功或失敗）時所需執行的函式，並將整個請求之 XHR 物件透過傳遞變數給你。
beforeSend：
請求之前時所需執行的函式，也就是 Ajax 對 HTTP 請求之前的階段，並將整個請求之 XHR 物件透過傳遞變數給你。

```javascript
$.ajax({
  type: "GET",
  url: "test.php",
  dataType:"text",
  data: {
    form: "data",
    number: 1
  },
  success: (result) => {
    console.log("success:", result);
    /*GETArray(
        [form] => data
        [number] => 1
    )*/
  },
  error: (result) => {
    console.log("error:", result); //模擬失敗時，可看到 result.status:404
  },
  complete: (result) => {
    console.log("complete:", result); //顯示傳遞物件，可看到 result.Stateready:4
  },
  beforeSend: (result) => {
    console.log("beforeSend:", result); //顯示傳遞物件，可看到 result.Stateready:0
  }
});
```
```php test.php
echo $_SERVER["REQUEST_METHOD"]; //GET
print_r($_GET);
```

### 介紹其他寫法
- jQuery.getJSON(url,data,success(data,status,xhr))
快速取得 JSON，必要為 url 與 success 函式而其他看需求，同時支援 JSONP 的用途。scucces 分別能提供三種傳遞變數，分別是取回資料、請求狀態、整個 XML(XMLHttpRequest) 之物件
```javascript
$.getJSON("test.json", { form: "data", number: 1 }, (result) => {
  console.log("success:", result);
});
/***************************************same as
$.ajax({
  type: "GET",
  url: "test.json",
  dataType:"json",
  data: {
    form: "data",
    number: 1
  },
  success: (result) => {
    console.log("success:", result);
  }});
  ********************************************/
```
- $.get(url,data,success(response,status,xhr),dataType)
同以下寫法：
```javascript
$.ajax({
  url: url,
  data: data,
  success: success(response,status,xhr),
  dataType: dataType
});
```
- $.post(url,data,success(response,status,xhr),dataType)
同以下寫法：
```javascript
$.ajax({
  type:'POST',
  url: url,
  data: data,
  success: success(response,status,xhr),
  dataType: dataType
});
```
- $.getScript(url,success(response,status,xhr))
能獲取來自另一個地方的腳本，通常讀取當下瀏覽器就會運行了所以不用指定 datatype，與`<script src>`不同的是你可以決定何時加載。同等以下寫法：
```javascript
$.ajax({
  type:'GET',
  url: url,
  success: success(response,status,xhr),
});
```
簡單範例如下：
```javascript
$.getScript("test.js",(re)=>{
  console.log("done",re);
});
/* 
this is form test.js
done console.log("this is form test.js");
*/
```
```javascript test.js
console.log("this is form test.js");
```
- $(selector).load(url)
對 selector 進行 url 位置請求，並將取回之 HTML 替換其內容，範例如下：
```html
<ul></ul>
<script>
  $("ul").load("list.html");
</script>
<!--
<ul>
  <li>001</li>
  <li>002</li>
  <li>003</li>
  <li>004</li>
  <li>005</li>
</ul>
-->
```
```html list.html
<li>001</li>
<li>002</li>
<li>003</li>
<li>004</li>
<li>005</li>
```

### jqXHR 與 Deferred 遞延物件
自 jQuery 版本 1.5 開始，所有的 Ajax 應用都會回傳 XMLHTTPRequest 物件的集合，並使用 Promise 建構函式完成窗口回應。你可以從 jqXML 物件找到 done（成功後執行）、fail（失敗後執行）、always（完成後執行，不論成功或失敗）。

另外 jQuery 還透過。Deferred() 方式串起可連接的導向鍊程序物件函式。可另添加 done()、fail()、always() 到你的 JQ Ajax 語法後面，包含所有的簡寫 Ajax 應用。

- done()、fail()、always()
提供成功結果、失敗結果、完成結果之回傳執行，舉例來說：
```javascript
$.ajax({
  type: "GET",
  url: "test.php",
  dataType: "text",
  data: {
    form: "data",
    number: 1
  }
}).done((result) => {
  console.log("done:", result);
  /*done: GETArray(
    [form] => data
    [number] => 1
  )*/
}).fail((result) => {
  console.log("fail:", result); //失敗時，可看到 XHR 物件且 result.status:404
}).always((result) => {
  console.log("always:", result); //成功時，可看到回傳內容；失敗時顯示 XHR 物件，可看到 result.Stateready:4
});
/********************* same as
$.ajax({
  type: "GET",
  url: "test.php",
  dataType: "string",
  data: {
    form: "data",
    number: 1
  },
  success: (result) => {
    console.log("success:", result);
  },
  error: (result) => {
    console.log("error:", result);
  },
  complete: (result) => {
    console.log("complete:", result);
  },
  beforeSend: (result) => {
    console.log("beforeSend:", result);
  }
});
*/
```
```php test.php
echo $_SERVER["REQUEST_METHOD"]; //GET
print_r($_GET);
```
- then(doneCallbacks,failCallbacks)
then 也是 Promise 下的產物，能提供同步延遲後的成功與失敗行為，簡單來說可以一筆取代 done() 與 fail() 的兩筆宣告。
```javascript
$.ajax({
  type: "GET",
  url: "test.php",
  dataType: "text",
  data: {
    form: "data",
    number: 1
  }
}).then(
  (result) => {   //same as done()
    console.log("then-done:", result);
  },
  (result) => {  // same as fail()
    console.log("fail:", result);
  });
```
- when(Ajax,Ajax)
提供解決多個非同步問題下的回呼執行處理，隨著多個 Deferred 物件提供給 when() 執行，由 when 來收集這些返回的集合體再從 when 本身的 Deferred 物件來執行本身 then 或其他方法 (done,fail,always) 來執行所有結果。
1. 如果 when() 的參數安插一個 Ajax 語法會回傳內容、狀態、XHR 物件，你可以接上 then() 來執行。
```javascript
$.when(
  $.ajax({
    url: "text1.txt"   // string "HELLO" in File
  })
).then((data, textState, xhr) => {
  console.log(data, textState, xhr);//HELLO scucess XHR Object
});
```
2. 如果 when() 的參數安插多個 Ajax 語法會回傳內容、狀態、XHR 物件，你可以接上 then() 來執行。
```javascript
$.when(
  $.ajax({
    url: "text1.txt"
  }),
  $.ajax({
    url: "text2.txt"
  })
).then(
  (re1, re2) => { //done
    console.log(re1, re2); // 能獲得兩組偽陣列格式 [responseText,state,XHR Object]
    console.log(re1[0] + " " + re2[0]); //HELLO WORLD
  },
  (re1, re2) => { //
    console.log(re1); // XHR Object
    console.log(re2); // error
  });
```
```txt hext1.text
HELLO
```
```txt hext2.text
WORLD
```
3. 如果 when() 的參數沒有指定，也會進行 Promise 處理返回，由於沒有請求只會 return 乾淨的 XHR 物件。如參數不是 Ajax 指令 (Deferred)，則會直接 Callback 還你，相信你不會做這無聊的事。
```javascript
$.when("AAA").then((e)=>{
  console.log(e);//AAA
});
```

## JavaScript 的 fetch API
從 ES6 開始提供了 fetch 如此方便的跨網路資源介面，主要是 XMLHttpRequest 舊技術的替代方案。同時越來越多人捨去 jQuery Ajax 技術直接使用原 JavaScript 來處理一切包含 Ajax 應用。提供 URL 位置給 fetch 接著透過 Promise 建構式來獲取 Response（不論成功或失敗都會取得回應），如果需要提供設定直接使用第二筆參數 init 物件（使用 Request 建構式）來調整。結論來說 fetch 只是一個官方設計過後的 API，且透過 Promise 與 Request 物件來達到 Ajax 應用（也可自行用 Promise 與 Request 物件 DIY 一個 Ajax 之 API，但何必這麼累）。

### 初次使用 Fetch （取得 JSON)
試著看看以下簡單範例步驟：

1. 使用 fetch 並指定 url 位址，如果需要可以對第二參數（稱呼 init 物件）使用 JSON 格式編寫（這裡故意寫 GET ，預設 GET 可不寫）。
2. 當透過 then() 來後續處理，fetch 最後回傳一個 Response 物件給你 (HTTP 回應資訊），這不是真正的內容結果。
3. 要找到真正的內容，必需從 Response 裡面的 Body 物件（為 Body mixin 也是 Promise 與 Request 的物件 API，為申明內容該以甚麼方式處理輸出），使用 Body 的 json() 或 text() 來處理內容回傳。
4. 直接使用 Response.json() 方法讓我們透過 Body API 來回應出 JSON 字串，因此我們要再用一次 then() 來後續處理結果。
5. 在那之前先 return response.json() 出來給下一個 then()。
6. 第二個 then 將接受到 JSON 資料，才算真正取得內容。

```javascript
fetch('test.json', {
  method: 'GET'
}).then((response) => {
  console.log(response);//得到 response 物件，而不是回傳內容
  return response.json();
}).then((json) => {
  console.log(json)
}).catch((error) => {
  console.log('Error:', error)
});

/**********善用箭頭函式特性與簡略 GET 你可以簡寫成這樣

fetch('test.json')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch( error => console.log('Error:', error) );

  **************************************/
```

### Fetch 可用設定
使用 Fetch 時可提供第二筆參數，這裡被稱呼為 init 物件且以 JSON 格式進行編寫提供 Request 使用（你可以在 MDN 找到 Request 的說明手冊），提供參數如下 (*代表預設值）：

- method:
使用方法，如 *GET, POST, PUT, DELETE
- headers:
表頭類型可以是 Headers 物件或 ByteString 值。舉例寫法：
```javascript
headers: {
  'user-agent': 'Mozilla/4.0 MDN Example',
  'content-type': 'application/json'
}
//////or
headers: new Headers({
  'Content-Type': 'application/json'
})
```
- body:
BODY 指定的資料可以是 Blob, BufferSource, FormData, URLSearchParams, USVString。不允許對 GET 或 HEAD 方法使用。
- mode:
模式採用 cors（跨網）, no-cors（非跨網）, *same-origin（同源政策，限定同網域下）。
- credentials:
request 認證應用，表示用戶代理在跨網請求下能否發送 Cookie，可以是 *omit（不發送 Cookie), same-origin（同網域下才使用）, include（可發送 Cookie)。
- cache:
 請求的暫存模式，可以是 *default, no-store, reload, no-cache, force-cache, only-if-cached。
- redirect:
處理重新導向方式，可以是 *follow（自動重定向）, error（如果產生重定向將自動終止並且拋出一個錯誤）, manual（手動處理重定向）。
- referrer:
參照位址來源，表示從哪裡到目前的網頁。可以是 no-referrer, *client, URL。
- referrerPolicy:
指定 HTTP 表頭 referer 值。可以是 no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, unsafe-url。
- integrity:
资源完整性 (SRI) 的值，例如 `integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"`，也很常在 CDN 引用時看到。

### 使用範例
- POST Request：(by FormData)
```javascript
let data = new FormData(); // 需使用 FormData 建構式來做資料，由 body 去偵測採用 FormData 傳送
  data.append("form","data");
  data.append("number",1);

/*******反之有個情況整個 FORM 表單要提交，可以直接指定整個節點一起為 Data 送過去，FormData 建構式會聰明算進去
let data = new FormData(document.getElementById('myform'));
*******************************/ 

fetch("test.php", {
  method: "POST",
  body: data
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error));

  /********console.log********
  POSTArray(
    [form] => data
    [number] => 1
  )**************************/
```
```php test.php
echo $_SERVER["REQUEST_METHOD"]; //GET
print_r($_POST);
```
- POST Request：(by Request Payload)
```javascript
fetch("test.php", {
  method: "POST",
  body: JSON.stringify({ //須 JSON 物件轉成字串，後端才能判讀
    form: "data",
    number: 1
  })
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error));

/********console.log********
POSTRequest Payload:{"form":"data","number":1}
)**************************/
```
```php test.php
echo $_SERVER["REQUEST_METHOD"]; //GET

//XMLHttpRequest 傳來的 POST 內容是 Request Payload
$data = file_get_contents('php://input',1);
echo "Request Payload:".$data; // {"form":"data","number":1}
```
- 確認成功與失敗
遇到 CORS 或 server 設定錯誤導致 network error 時，promise 會 reject 並附上 TypeError 的回應，但在權限或類似問題導致 404 的常見狀況下，卻不會導致 network error。因此是否成功的正確方式，應包含檢查 promise resolved, 以及檢查 Response.ok 的屬性是否為 true。
```javascript
fetch('404.json') //此 URL 故意不存在情況下
  .then(response => {
    console.log(response);
    if(response.ok) return response.json();
    throw new Error(response.status); //建立 error 物件提供給 catch() 取得，並中斷後續所有動作
    console.log("這行不會被執行到");
  })
  .then(json => console.log(json))
  .catch(error => console.log("發生錯誤代碼為"+error.message));//取出 error 物件的資訊顯示出來
```
- 多筆 Request 同時進行 Fetch
可透過 Promise.all() 方進行等待作業，最後一起 then() 完成動作。
```javascript
Promise.all([
  fetch("textr1.txt").then(re => re.text()), // 'HELLO' string in file
  fetch("text2.txt").then(re => re.text()) // 'WORLD' string in file
]).then(([r1, r2]) => {
  console.log(r1, r2); //HELLO WORLD
});
```
### 停止取得
近期瀏覽器可以使用 AbortController API 來完成停止需求，等同於 xhr.abort() 行為或 xhr.onabort() 事件。

```javascript
const controller = new AbortController();
fetch('test.json', {
  signal: controller.signal
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log(error)); //DOMException: The user aborted a request.

controller.abort(); //這裡馬上取消請求，導致 catch 產生 error 資訊
```

## axios 框架的 Ajax
fetch 尚未普及的年代的產物（目前也是很多人使用且為了脫離 jQuery 習慣，你也會在 vue 上面看到 axios 的蹤跡），類似 jQuery 需要額外套入的框架包。使用方式與 fetch 差不多，Axios 也依賴 JavaScript 的 promise 來完成 Ajax 應用。

你需要先安裝匯入 axios 使用，這裡採用 cdn 來處理。
```html axios cdn
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js"></script>
```

### 初次使用 Axios API（取得 JSON)
類似 jQuery 的 Ajax 方法與 fetch 的 promiise，其語法為 axios(config)。除了完整寫法 axios API，也有其他簡寫方式，完整寫法如下：

```javascript
axios({
  method: 'get',
  url: 'test.json'
})
  .then(response => {
    console.log(response);//整個回應物件在此
    console.log(response.data);//內容在此
  })
  .catch(error => console.log(error));
```

### axios API 的 config 可用設定
使用 axiosAPI 完整寫法，必需提供 config 物件內容，除了 URL 是必要的其他參數都可以因需求加入（未特別標示則為 string 值），使用參數非常的多可以分為幾大類：

#### 一般參數
- url:
目標的 URL 網址，必填。
- method:
HTTP 請求的方式 GET 或 POST。預設為 GET 可省略不寫
- headers:
表頭類型可以是 Headers 物件或 ByteString 值。舉例寫法：
```javascript
headers: {
  'user-agent': 'Mozilla/4.0 MDN Example',
  'content-type': 'application/json'
}
//////or
headers: new Headers({
  'Content-Type': 'application/json'
})
```
- baseURL:
目標的網域名稱，會自動添加在 url 前面。如果 url 已經是絕對路徑可省略。
- data:object
傳送的資料，只適合 PUT, POST, PATCH 類型使用。
- params:object
轉換資料為 URL 參數，適合 GET 變數的傳遞或類型使用。若你直接 URL 上寫好可省略。
- maxContentLength:number
限制內容傳送上限
- timeout:number
請求時間超過時間（毫秒）時，將終止此請求。
- responseType:
回傳的資料格式為何，可以是 arraybuffer, document, json'（預設）, text, stream, blob
- responseEncoding:
回應的資料其編碼模式為何，預設為 utf8

#### promise 前後處理
- onUploadProgress:(function), onDownloadProgress:(function)
在上下傳時可執行的函式，並可提供 ProgressEvent 物件作為傳遞參數
```javascript
onUploadProgress: function (progressEvt) { console.log(progressEvt) },
onDownloadProgress: function (progressEvt) { console.log(progressEvt) }
```
- adapter:function()
不使用預設的 promise 處理，使用自定義的 promise 之函式作業
- transformRequest:[function(data){return}], transformResponse:[function(data){return}]
  - Request 前的資料可以先處理，你可以提交之前對 data 做調整。此功能只對 PUT, POST, PATCH 有效。
  - Response 前的資料可以先做處理。你可以提交之前對 data 做調整。此功能只對 PUT, POST, PATCH 有效。
```javascript
axios({
  method: 'post',
  url: 'test.php',
  transformRequest: [data => {
    //這裡額外先將 JSON 物件轉成 FormData，使後端取得的會是 FormData 而不是透過 Request Payload 來拿
    formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    return formData;
  }],
  transformResponse: [data => JSON.parse(data)],
  //我們原取得的內容是 string，先轉成 JSON 才會往 then(),catch() 整合 Response
  data: {
    form: 'data',
    number: 1
  }
})
  .then(response => console.log(response.data)) //取出來已經是 JSON 不用再處理
  .catch(error => console.log(error));
```
```php test.php
echo json_encode($_POST);
```

#### 網域驗證代理
- withCredentials:boolean
判斷是否為跨域存取 (CROS)，預設為 false
- auth:object
設定 Authorization 表頭資料，提供驗證使用。
- xsrfCookieName
用於 xsrf token 值的 cookie 名稱
- xsrfHeaderName
532xsrf token 值的 header 名稱
- validateStatus:function(status){return boolean}
判斷請求的網址狀態值為多少才會執行 Promise 的 reject 作業。預設操作為 `return 200 <= status && status < 300;`
- proxy:object
定義代理伺服器，其中參數 auth 為 proxy 驗證帳密。
```javascript
proxy: {
  host: '127.0.0.1',
  port: 9000,
  auth: {
    username: 'mikeymike',
    password: 'rapunz3l'
  }
}
```
- cancelToken
用於清除 Token 的請求

#### Node.js
- maxRedirects:number
定義 node.js 需遵守的重定向 follow 次數
- httpAgent, httpsAgent
定義 node.js 執行 http 或 https 時的自訂代理配置

### 介紹所有 axios 速寫法
- axios.get(url, config)
```javascript
axios.get("test.php", {
  params: {
    form: 'data',
    number: 1
  }
})
  .then(response => console.log(response.data)) //取出來已經是 JSON（預設）不用再處理
  .catch(error => console.log(error));
```
```php test.php
echo json_encode($_GET);
```
- axios.post(url, data, config)
沒有特別處理時，傳的內容會是 Payload
```javascript Request Payload
axios.post("test.php", {
  form: 'data',
  number: 1
})
  .then(response => console.log(response.data)) //取出來已經是 JSON（預設）不用再處理
  .catch(error => console.log(error));

  //console: {form: "data", number: "1"}
```
```php test.php
//傳來的 POST 內容是 Request Payload
$data = file_get_contents('php://input', 1);
echo $data; //{"form":"data","number":1}
```
如果要用 FormData 傳過來，就不要用 json 格式，而是用 formData 來建構物件。
```javascript
let bodyFormData = new FormData();
bodyFormData.append("form", "data");
bodyFormData.append("number", 1);

axios.post("test.php", bodyFormData)
  .then(response => console.log(response.data)) //取出來已經是 JSON 不用再處理
  .catch(error => console.log(error));
```
```php formData
echo json_encode($_POST);
```
- axios.all()
多筆 Request 同時進行，並藉由 axios.spread() 取出所有的 response。
```javascript
axios.all([
  axios.get("text1.txt"), //string HELLO in file
  axios.get("text2.txt") //string WORLD in file
]).then(
  axios.spread(
    (response1, response2) => {
      console.log(response1.data, response2.data); //HELLO WORLD
    }
  )
).catch(error => console.log(error));
```

這裡還有其他的方式不再示範：
- axios(config)：完整的寫法已示範過
- axios.request(config)：與上相同功能
- axios.head(url, config)：功能與 GET 相同但無 response body，也就是單向傳出不拿東西回來。
- axios.delete(url, config)：DELETE 請求類型
- axios.put(url, data, config)：PUT 請求類型
- axios.patch(url, data, config)：PATCH 請求類型
- axios.options(url, config) // 檢查用，預先發送的請求是否安全。確認該地址採用的協定、要求的表頭等資訊。
- axios.create(config) //自定義設定 axios

```javascript
axios.get("test.json").then(response => {
  console.log(response); //整個回應物件在此
  console.log(response.data); //內容在此
}).catch(err => console.log(err));
```

## 認識 Promise
promise 從 ES6 的新語法，主要是解決程式執行順序上發生不同步的問題。也就是程式繼續往下跑不會等待某行的結果，這是為了工作效率而預定作業方式。例如可由 settimeout 來實現此問題：
```javascript
let str = "AA";
setTimeout(() => {
  str = "BB";
}, 1000);
console.log(str); //發生非同步執行緒問題，此程式不會等上面的程式跑完。
```

因此許多 Ajax 應用方式因為需要從別處拿資料回來才能繼續執行，就可以選擇是否要求 async（非同步）為關閉。舉例 juqery 的舊方式 (1.5 版本開始也已改 promise 方法，像是 then 應用）：
```javascript
let data=null;
$.ajax({
  url:"test.json",
  async:false,
  success:re=>data=re
})
console.log(data); //這行會等上面的程式跑完才會執行
```
這只是 jQuery Ajax 的非同步示範，如果以一般程式來聊要如何實現？因此 Promise 建構式就是來解決有需要做處理等待的程式代碼。導致現在很多 AjaxAPI 或框架幾乎都是靠 Promise 來處理同步等待的需求。

### Promise 基本原型
Promise 直白點就是對你許下承諾（相信我，我一定會把佐助帶回來的？!）不論這個結果成功還是失敗。以下是 Promise 工作週期說明：
![Promise 工作週期](https://i.imgur.com/P8z88FS.jpg)

大致上 Promise 有三個階段：
- 擱置（pending）：初始狀態。
- 實現（fulfilled）：表示操作成功地完成。透過。then(onFullfillment) 來處理資料並回傳後，回到 pending 狀態。
- 拒絕（rejected）：表示操作失敗了。透過。then(onRejection) 做失敗的應對並回傳，回到 pending 狀態。

使用 Promise 建構式時，需要提供 resolve 與 reject 兩個函式參數，分別在 fulfill 及 reject 階段作為 resolve 與 reject 函式的傳遞 status，使得。then() 與。catch() 能收到資料做後續作業。語法結構如下：

```javascript
const myPromise = new Promise((resolve, reject) => {
  resolve(status); // 成功時
  reject(status); // 失敗時
})
  .then(data => console.log(data)) // on fulfillment（已實現時）
  .catch(data => console.log(data));  // on rejection（已拒絕時）
```

舉個例子：我們需要等到 Promise 工作完成後，根據某條件下成功或失敗決定要往 then 還是 catch 做之後的處理。整體作業是同步的，then 跟 catch 一定會等 Promise 作業結束才會觸發。

```javascript
const mytime = new Promise((resolve, reject) => {
  const rand = Math.random();
  (rand > 0.5) ? resolve("BIG") : reject("SMALL");
})
  .then(data => console.log(data))  //BIG
  .catch(error => console.log(error)); //SMAIL
```

回到工作階段說明圖，then() 透過 return 繼續緊接 then() 或 catch()，繼續往下一個階段但已經跟 Promise 無關，只是單純的往後面跑。下面範例不加入失敗考量，直接都是成功的連續 then 執行。

```javascript
const sayABC = new Promise((resolve, reject) => {
  console.log("A");  //A
  setTimeout(() => resolve("B"), 1000);  //1 秒後將 B 傳送到成功事件
})
  .then(data => { //成功事件運作顯示 B。並且 return C 離開 then()
    console.log(data); //AB 這兩個字是透過 Promise 來控制執行緒之同步順序，所以 B 會等 A 跑出來
    return "C";
  })
  .then(data => { //這裡的 then() 突然可接收到 C，1 秒後印出 C
    setTimeout(() => console.log(data), 1000);
    console.log("D"); // 跟上面這行已經非同步處理緒，所以 D 比 C 早出來。
  });

  // console is A B D C
```

由於 then 可以 return，因此我們可以把一個 promise.then() 塞到另一個 promise 內形成連鎖的請求同步。
```javascript
const say123 = new Promise((res, rej) => {
  console.log(1); //這裡跑一，建構 Promise 當下有 run
  setTimeout(() => res(2), 3000); // 3 秒後會送數字 2 給 say123.then()
})

new Promise((resolve, reject) => {
  console.log("A"); //這裡跑二，建構 Promise 當下有 run
  setTimeout(() => resolve("B"), 1000); // 1 秒後送文字 B 給 sayABC.then()
})
  .then(data => { //第 1 秒後這裡開始作業
    console.log(data);//這裡跑三
    return say123.then(data => data);//say123 在第 3 秒後這裡開始作業回傳數字 3 到外面，3 又被 say.then() 傳出去
  })
  .then(data => { //say.then().then() 吃到 3，且整體時間第 3+1 秒才輸出
    setTimeout(() => console.log(data), 1000);
  });

//console is 1 A B 2
```

如果是想印出 AB12，你應該在 AB 的 then() 才去建構出顯示 12 的 Promise。形成完整的同步處理並善用 then(return) 應用。

```javascript
new Promise((resolve, reject) => {
  console.log("A"); //A at time 0
  setTimeout(() => resolve("B"), 1000);
})
  .then(data => {
    console.log(data);//B at time 1
    return new Promise((res, rej) => {
      console.log(1);//1 at time 1
      setTimeout(() => res(2), 3000); // at time 1+3 to run
    }).then(data => data); // same as sayABC.then(return (return 2));
  })
  .then(data => {
    setTimeout(() => console.log(data), 1000); //2 at time 1+3+1 run
  });

//console is A B 1 2
```

### Promise 多項目方法
- Promise.all()
提供需要多個 promise 一起運作，同時最後一起跑到 then() 作業。提供參數為陣列寫法（可以是 Promise 物件也可以是一般變數內容。返回的資料也是陣列結構。
```javascript
Promise.all([
  new Promise(resolve=>setTimeout(resolve("A"),1000)),
  new Promise(resolve=>setTimeout(resolve("B"),1000)),
  new Promise(resolve=>setTimeout(resolve(1),1000)),
  2
]).then(data=>console.log(data)); //(4) ["A", "B", 1, 2]
```
注意的是如果只要有 Promise 是 reject 狀態，會導致 promise.all().then() 不會運作。
```javascript
Promise.all([
  new Promise(resolve => setTimeout(resolve("A"), 1000)),
  new Promise(resolve => setTimeout(resolve("B"), 1000)),
  new Promise((resolve, reject) => setTimeout(reject("fail"), 1000)),
  2
]).then(data => console.log(data)) //this not work
  .catch(err => console.log(err)); // console is fail
```
- Promise.allSettled()
Promise.all() 的完整版，回傳的不會是內容而是整個 reponse 資訊，這樣不會因為某個 promise 失敗而導致停擺。你可以自行去取得各自的內容與應對。
```javascript
Promise.allSettled([
  new Promise(resolve => setTimeout(resolve("A"), 1000)),
  new Promise(resolve => setTimeout(resolve("B"), 1000)),
  new Promise((resolve, reject) => setTimeout(reject("fail"), 1000)),
  2
]).then(data => console.log(data)) //
/*
  (4) [{…}, {…}, {…}, {…}]
  0: {status: "fulfilled", value: "A"}
  1: {status: "fulfilled", value: "B"}
  2: {status: "rejected", reason: "fail"}
  3: {status: "fulfilled", value: 2}
  length: 4
*/
```
- Promise.race()
與 Promise.all 雷同，但只會取得第一個最快成功的 promise 就結束，但要注意只要一個失敗就會整個停擺。
```javascript
Promise.race([
  new Promise(resolve => setTimeout(resolve, 3000, "A")),
  new Promise(resolve => setTimeout(resolve, 1000, "B")),
]).then(data => console.log(data)) // "B"
```

### async 與 awit 
一種讓 promise 更好寫的方法。主要重點是兩個關鍵字宣告，async 放在某個函式前面代表這個函式等於 promise 且 return 出來的必定是成功的 resolved。
```javascript
async function fn(){
  return "A";
}
fn().then(console.log); //A，我懶得寫傳遞變數了。不然你可以寫 data=>console.log(data)

/******************************same as
async function fn(){
  return Promise.resolve(1);
}
fn().then(console.log);
**************************************/
```

另外的關鍵字 await，他必須是放在 async 裡面。主要是當 async 函式內的 promise 執行 resolve 才會觸發。也就拿來替代 then() 的寫法。
```javascript
async function fn() {
  let mypro = new Promise(resolve => setTimeout(resolve, 1000, "A"));
  let ans = await mypro; //這裡發生同步，會等待 promise 完成 resolve
  console.log(ans);
}
fn();
/****************************************************************same as
const fn = async () => {
  let ans = await new Promise(resolve => setTimeout(resolve, 1000, "A"));
  console.log(ans);
};
fn();
************************************************************************/
```

然而 async 內要發生 reject 事件指定 throw 即可。他會將資料傳給 catch 內。且會中斷整個函式執行。
```javascript
const fn = async () => {
  throw "error";  //same reject
  return "A"; //same resolve
};
fn().then(console.log).catch(console.log); //error

/****************************************************************same as
const fn = async () => {
  await Promise.reject("error");
  Promise.resolve("A");
};
fn().then(console.log).catch(console.log); //error
************************************************************************/
```

舉例來說，使用 fetch() 函式本身會有自己 reject 事件，因此我們可以用 try-catch 來做一個語法表示。
```javascript
const fn = async () => {
  try {
    let response = await fetch('error.json');
    console.log(response);//獲得一個完整 response 物件
    let user = await response.json(); //取得失敗
  } catch (err) {
    console.log(err); // SyntaxError: Unexpected token < in JSON at position 0
  }
}
fn();
```
如果不使用 try-catch 來做外框，那麼 catch 是落在 fn 本體身上。
```javascript
const fn = async () => {
  let response = await fetch('error.json');
  console.log(response);//獲得一個完整 response 物件
  let user = await response.json(); //取得失敗
}
fn().catch((err)=>{
  console.log(err); // SyntaxError: Unexpected token < in JSON at position 0
});
```

總結來說：
1. 使用 async/await 時，就不太會去使用 then()
2. 常態性使用 try-catch，撰寫上的流程會比較直白些。
3. await 必需要在 async 內，才能有作用。
4. 要等待某一個結果請使用 await 放在函式或建構式前面，程式會等他完成才往下跑。
5. 前綴有 async 的函式能代表他將會回傳 promise 物件需要等待。
6. async/await 可以取代 promise.then/catch，但事實上他也是 promise 的語法。

# API 串接
應用程式介面（Application Programming Interface）簡稱為 API 是個通俗的名稱，拿來解釋不同的軟體之間的溝通橋樑。透過請求 Request 與 Response 回應來完成資料的交換指令。在網頁上主要是前端與伺服器的溝通方式。透過 API 的指定網址與 Request 之 HTML 協定來進行溝通。

全名 Hypertext Transfer Protocol（超文本傳輸協定），每次進行網頁發送 request 請求時，伺服器端會檢查網址存在後，回發送 response 給你。這就是 HTTP 協定。如果網址不存在則會發送 404 的錯誤畫面給你（或其他因素提供對應的 HTTP response code 狀態碼）。

狀態碼大致可以分為五大類：
- 資訊回應 (Informational responses, 100–199),
- 成功回應 (Successful responses, 200–299),
- 重定向 (Redirects, 300–399),
- 用戶端錯誤 (Client errors, 400–499),
- 伺服器端錯誤 (Server errors, 500–599).
> 更多細節請查看 [RFC 7231](https://tools.ietf.org/html/rfc7231) 規範

例如用 PHP 來宣告本頁的 response statue code 為 404，即使有畫面資料，透過 Ajax 抓取會得到 404 結果：
```php
echo $_SERVER["REQUEST_METHOD"];
http_response_code(404);
```

然而要進行請求時，根據 HTML 協定的 method 歸類可以分為 GET（查詢） / POST（新增） / PUT（修改） / DELETE（刪除）為主，也就是對應了 CRUD 行為請求之觀念。在沒有聊到 RESTful 觀念之前，API 串接方式沒有一定方式，主要是看伺服器要如何接手你的 request（包含判別 GET/POST/PUT/DELETE）來進行怎樣的動作自己規定。

## RESTful
真正的名字應該稱呼為 REST(Representational State Transfer) 表現層狀態轉換。是一種風格做法而不是一個標準。而 RESTful 只是一個形容詞（就像 beautiy->beautiful)，只要符合這種做法都可以稱呼這個 API 有遵循 REST 機制做法，是屬於 Restful API 的設計。

符合 REST 設計風格的 Web API 稱為 RESTful API。它從以下三個方面資源進行定義：

- 直觀簡短的資源 URI 位址，例如：`http://demo.com/api`。
- 傳輸的資源：Web 服務接受與返回的網際網路媒體類型，比如：JSON, XML, YAML 等。
- 對資源的操作：Web 服務在該資源上所支援的一系列請求方法（例如：POST, GET, PUT, DELETE...）共 8 種。

與傳統 API 來比較，可能普通 API 的請求 URI 位置舉例如下：
- 取得：`http://demo.com/api/get/` 
- 新增：`http://demo.com/api/post/` 
- 更新：`http://demo.com/api/update/3` 
- 刪除：`http://demo.com/api/delete/3` 

至於 RESTful API 的規則舉例如下：
- 取得：`http://demo.com/api/` + HTTP Method GET
- 新增：`http://demo.com/api/` + HTTP Method POST
- 更新：`http://demo.com/api/3` + HTTP Method PUT
- 刪除：`http://demo.com/api/3` + HTTP Method DELETE

也就是 URI 只有一個，有任何 Verbs 資源動作都寫在 Method 裡面。而 URI 這裡指的是（Uniform Resource Identifier）統一資源識別符號，也就是某檔案路徑下的資源所在之請求位置。另外說明 URL 為 Uniform Resource Locatin 指的是一個檔案路徑。所以 URL 的後面多一個動作行為就能拿來視為 URI。規劃極簡的 URI 也是 REST 要求的重點之一，這需要透過路由或 apache 的 htaccess 重寫規則來轉換。

規則可以在細分一點，舉例為文章清單應用：

- `GET http://demo.com/page/` 瀏覽全部文章
- `GET http://demo.com/page/1` 瀏覽單筆文章且 ID 為 1
- `POST http://demo.com/page/` 新增一筆文章
- `PATCH http://demo.com/page/1` 修改單筆文章且 ID 為 1
- `PUT http://demo.com/page/1` 修改單筆文章且 ID 為 1，若尚未建立則為新增
- `DELETE http://demo.com/page/` 刪除單筆文章 ID 為 1

RESTful 不是一定的規定，可以混搭自己需要的路由操作目標。譬如可以`DELETE http://demo.com/page/login`做登入驗證請求。RESTful 只是將 CRUD 的方式做一下習慣建議。在 Ajax 應用當中都有提供所有有 Method 方式，而後端需要判別時可透過偵測 requst method 方式為何，部分處理若不會有回應內容時，可 response 下達 ststus code（例如 202 為 no content)。舉例 PHP 來說：

```php php
//PHP 能直接對$_GET 與$_POST 做存取，其他則需要透過 request method 查找
switch ($_SERVER["REQUEST_METHOD"]) {
  case 'GET':
    # code...
    break;
  case 'POST':
    # code...
    break;
  case 'PUT':
    $_PUT = json_decode(file_get_contents('php://input'), true);
    print_r($_PUT);
    //如果 PUT 已新增資源，則提供代碼 201 (Created) 通知用戶代理
    //如果修改了現有資源，則應發送 200 (OK) 或 204 (No Content）以指示請求已成功完成。
    break;
  case 'DELETE':
    $_DELETE = json_decode(file_get_contents('php://input'), true);
    print_r($_DELETE);
    http_response_code(202); //no content
    // 需 resopnse 內容回去則提供 200
    // 處理中已加入排程提供 202 (Accepted)
    // 沒有 response 內容回去則為 204
    break;
}
```
## OpenData API
國內提供非常多元的免費 API 串接，也就是 OpenData 讓你直接用。大也不是啥都能順利套用以及保持更新。所以在找到任何 API 來源時推薦先驗證測試使用。以下推三種方法來做 API 測試：

### 測試方式
- Postman REST Client
算是很多人使用的方式，[免費下載](https://www.postman.com/product/rest-client/) 提供使用，網路資源很多不多介紹。
- VSCode Plugin-REST Client
[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 直接在 VSCode 就能測試，你需要先建立一個`檔名。http`並貼上 Request 之 URL 會自動生成提示 Send Request 之字眼按下送出即可。會產生 Response 資訊與內容方便文字複製。若需其他 REST Method 可在網址前綴補上關鍵字如下：
```http demo.http
GET https://tw.rter.info/capi.php
```

### CORS 問題與解決
在使用 API 進行溝通時尤其對外部 OpenData API 請求時，有機會發生錯誤訊息。

> has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

這是用戶的瀏覽器在執行時根據 W3C 規範而阻止你做了這樣的事情，當 JS 指令需要跟某伺服器請求時，根據同源政策 (Same Origin Policy) 下只有同 domain 的資源才可相互存取防範駭客攻擊。如果是自家後端的伺服器要開放允許很簡單，舉例 PHP 來說只需要設定以下開頭宣告即可：

```php apiService.php
header('Access-Control-Allow-Origin:*');
```

### 伺服器開放 CORS
因此當你碰到 API 請求失敗時，很大因素是對方工程師沒有特別開放給任何人連線。除非你有能力要求對方全面開放或額外開放指定你的網頁 Domain 能請求：

```php apiService.php
<?php

// 僅授權讓 demo.com 網域來存取資源
if ($_SERVER['HTTP_ORIGIN'] == "http://demo.com") {
  header('Access-Control-Allow-Origin: http://demo.com');
  header('Content-type: application/json');
  readfile('data.json');
} else {
  header('Content-Type: text/html');
  echo "<p>本 API 僅授權 <b>'http://demo.com'</b> 使用，其他拜訪來源將禁止存取</p>";
}
?>
```

### 透過 PHP 存取
同上話題，你應該沒有那能力去要求提供 OpenData 服務商開放，所以大部分的人都會用爬蟲方式來取得。可幸的是只有 JS 的 Ajax 會被阻擋，反而 PHP, python,Node.js 這些後端程式都可以正常存取別人的 API(Postman 也是）。簡單來說就是爬蟲方法，以下舉例 PHP 兩種 API 存取方式。

- file_get_contents
 適合存取資料量少且更新不頻繁的對象，整體上效能低資源吃重。但相對語法上簡單就能完成。
```php file_get_content
$content = file_get_contents('https://tw.rter.info/capi.php');
$data1 = json_decode($content);
print_r($data1);
```
- curl
因有提供暫存功能，適合資料量大且整體運作效能高，更包含多種參數可特別使用。如果允許請盡量使用 CURL 方式存取。
```php curl
function load_contents($url)
{
  $ch = curl_init(); // 初始化 CURL
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //回傳移除，預設 false: 自動輸出至畫面。true 則不輸出（可繼續編輯處理變數）
  curl_setopt($ch, CURLOPT_URL, $url); //目標網址

  /****************************************************************非必要的設定
  curl_setopt($ch, CURLOPT_HEADER, false); // 是否需取得 HEAD 資訊
  預設 TRUE 驗證伺服器憑證，拜訪 https 若未做任何 SSL 設定會出錯。
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

  發出端的用戶代理，提供軟體類型、版本號、作業系統、開發者資訊。參考 https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers/User-Agent
  curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36");
   *******************************************************************/

  $data = curl_exec($ch); // 執行 curl
  curl_close($ch); // 關閉 curl
  return $data;
}
$content = load_contents('https://tw.rter.info/capi.php');
$data2 = json_decode($content);
print_r($data2);
```

若你有能力自行建立伺服器當作跳板，用自家的後端去存取別人伺服器的資料回來，再讓同網域下（或特別開放）的前端 JS 向此處存取。

- 透過第三方線上跳板 cors-anywhere 
若沒有能力自己架設伺服器，[cors-anywhere](https://github.com/Rob--W/cors-anywhere) 提供專門解決 CORS 的免費伺服器跳板，根據使用方式說明只需設定以下代碼即可。

```javascript
const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
const url = 'https://tw.rter.info/capi.php'; // origin api url
fetch(`${cors}${url}`)
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log('Error:', error));
```

### 免費 OpenData 平台
- [全球即時匯率 API](https://tw.rter.info/howto_currencyapi.php) CORS
- [氣象開放資料平臺](https://opendata.cwb.gov.tw/index)
- [政府資料開放平臺](https://data.gov.tw/)
- [公共運輸整合資訊流通服務平台](https://ptx.transportdata.tw/PTX/)

# 參考文獻
[Fetch API - Web APIs | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)
[WorkerOrGlobalScope.fetch() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
[使用 Fetch - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
[跨來源資源共用（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
[Request - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)
[使用说明 · Axios 中文说明 · 看云](https://www.kancloud.cn/liweiliang/axios/1328148)
[axios  基本使用 & Config - iT 邦幫忙：: 一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10212120)
[從 Promise 開始的 JavaScript 異步生活](http://promise.eddychang.me/docs/contents/ch3_promise_a_plus/)
[stackoverflow- chaining multiple XHR calls ](https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr)
[Promise，async/await](https://zh.javascript.info/async)
[MDN-Promise](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[XMLHttpRequest vs the Fetch API for Ajax - SitePoint](https://www.sitepoint.com/xmlhttprequest-vs-the-fetch-api-whats-best-for-ajax-in-2019/)