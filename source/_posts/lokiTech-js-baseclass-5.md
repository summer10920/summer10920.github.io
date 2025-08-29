---
title: "[基礎課程] JavaScript 教學（五）：非同步、AJAX、本地儲存"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - 前端網頁開發技術（職前班）
  - JavaScript
  - 前端入門
date: 2025-08-05 17:27:33
---
![](assets/images/banner/js.png)

本篇將帶你了解為什麼需要非同步，以及如何用 Promise 與 async/await 優雅地撰寫非同步流程。接著我們用 Fetch 實作 AJAX 請求，並補充瀏覽器端儲存（Cookie、LocalStorage、SessionStorage）與 Session/Token 的觀念對比。

<!-- more -->

# 非同步程式設計基礎
瀏覽器在執行 JavaScript 時，僅有單一主執行緒，會按照程式碼的順序逐行執行，這種方式稱為「同步作業」。當遇到需要較長時間才能完成的任務時，若全部採用同步執行，會導致整個流程被阻塞，影響使用者體驗。為了解決這個問題，JavaScript 採用「非同步作業」：將耗時的任務交由瀏覽器或背景處理，等任務完成後再將結果放回事件佇列，等待主執行緒有空時再處理，讓網頁能持續回應其他操作。

所謂「非同步（Asynchronous）」就是讓瀏覽器在等待這些耗時任務（例如：網路請求、檔案讀取、計時器）完成的同時，主執行緒仍能繼續處理其他工作、維持畫面互動與回應；反之，「同步（Synchronous）」會讓執行緒被卡住，導致畫面凍結、操作停滯，造成不佳的使用者體驗。

```js blocking-vs-async.js
// 同步：刻意阻塞（busy wait）模擬「卡住」現象
function blockingSleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

console.log('同步開始');
blockingSleep(2000); // 主執行緒卡住 2 秒，期間畫面/互動都會停滯
console.log('同步結束');

// -----------------------------------------------

// 非同步：使用計時器，不阻塞主執行緒
console.log('非同步開始');
setTimeout(() => {
  console.log('2 秒後執行（非同步），期間不會卡住 UI/其他程式碼');
}, 2000);
console.log('非同步結束（先印出）');
```

上述範例用來說明「同步」與「非同步」的差異。`setTimeout` 是一種非同步（async）機制，當呼叫時，瀏覽器會將該任務登記起來，等到指定時間後再執行，而主程式流程則不會被阻塞，能繼續往下執行。

- 同步阻塞會造成後續程式碼與畫面更新延遲，影響使用者體驗。
- 非同步計時器（如 setTimeout）則能將耗時任務延後執行，讓主流程不中斷，提升網頁的流暢度與回應性。

## 事件迴圈（Event Loop）概念
事件迴圈（Event Loop）是 JavaScript 執行非同步任務的核心機制，負責監控主執行緒（呼叫堆疊）是否空閒，並依序將「待處理工作」從任務佇列安排進來執行。這些任務主要分為兩大類：

- **宏任務（Macro Task）**：如 setTimeout, setInterval, DOM Event Callback 等，屬於較大型、會影響主流程的任務。
- **微任務（Micro Task）**：如 Promise.then, queueMicrotask，通常用於更細緻、需優先處理的非同步流程。

{% note info %}
**小技巧：事件迴圈運作順序**
每次主執行緒（呼叫堆疊）清空後，事件迴圈會先檢查微任務佇列，將所有微任務依序執行完畢，才會處理下一個宏任務。這也是為什麼 Promise.then 會比 setTimeout 優先執行的原因。
{% endnote %}

{% mermaid graph TD %}
    A["呼叫堆疊<br/>Call Stack"] -->|清空時| B["事件迴圈<br/>Event Loop"]
    B --> D["微任務佇列<br/>Micro Task Queue"]
    D --> A
    B --> C["宏任務佇列<br/>Macro Task Queue"]
    C --> A
{% endmermaid %}

## 巢狀地獄（callback hell）

在實際的網頁開發中，我們經常需要串接多個 API 來完成一個完整的資料流程。例如：先取得使用者資訊，再用使用者 ID 去取得該使用者的相簿列表，最後用相簿 ID 去取得相片資料。每個 API 請求都需要等待伺服器回應，這個等待時間可能從幾毫秒到幾秒不等。

當資料需要不斷抽取至下一個 API 時，就會造成「一個等一個」的串接現象。早期開發者使用「回呼函式（callback）」來處理這種非同步流程，但隨著 API 串接層數增加，程式碼會形成深層的巢狀結構，這就是所謂的「巢狀地獄（callback hell）」。

{% note info %}
**模擬 API 串接現象**
在練習中，我們使用 `setTimeout` 來模擬真實 API 的等待時間。這讓我們可以在沒有實際後端服務的情況下，體驗非同步程式設計的各種情況。
{% endnote %}

```js callback-hell.js
// 模擬 API 函數：每個都需要約 2 秒等待時間，並可能發生錯誤
// -----------------------------------------------------------------------
function getUserAPI(id, callback, onError) {
  console.warn(`level 1: 開始取得使用者 ${id} 的資料。..`);
  setTimeout(() => {
    if (false) {
      // 模擬錯誤情況（目前不觸發）
      console.log(`level 1: 使用者 ${id} 資料取得失敗`);
      onError(new Error(`level 1: 找不到使用者 ID: ${id}`));
      return;
    }
    console.log(`level 1: 成功，返回使用者 ${id} 資料`);
    callback({ id: id, name: 'Loki', email: 'loki@example.com' });
  }, 2000);
}

function getProfileAPI(userId, callback, onError) {
  console.warn(`level 2: 開始取得使用者 ${userId} 的個人資料。..`);
  setTimeout(() => {
    // 模擬錯誤情況（目前不觸發）
    if (false) {
      console.log(`level 2: 使用者 ${userId} 個人資料取得失敗`);
      onError(new Error(`level 2: 個人資料載入失敗，使用者可能已停權`));
      return;
    }
    console.log(`level 2: 成功，返回使用者 ${userId} 個人資料`);
    callback({
      userId: userId,
      bio: '前端開發者',
      avatar: 'avatar.jpg',
      posts: 15
    });
  }, 2000);
}

function getPostsAPI(profileName, callback, onError) {
  console.warn(`level 3: 開始取得 ${profileName} 的文章列表。..`);
  setTimeout(() => {
    // 模擬錯誤情況（目前不觸發）
    if (false) {
      console.log(`level 3: ${profileName} 的文章列表取得失敗`);
      onError(new Error(`level 3: 文章列表載入失敗，伺服器忙碌中`));
      return;
    }
    console.log(`level 3: 成功，返回${profileName} 的文章列表`);
    callback([
      { id: 1, title: 'JavaScript 基礎', content: '...' },
      { id: 2, title: 'Promise 教學', content: '...' },
      { id: 3, title: 'async/await 實戰', content: '...' }
    ]);
  }, 2000);
}

// 巢狀回呼：每個 API 都需要等待前一個完成才能開始
// -----------------------------------------------------------------------
console.clear();
getUserAPI(1, function (user) {
  // ================level 1 start================
  // 等待使用者資料回來後，才能用 user.id 去取得個人資料

  console.log('level 1 Done: 取得使用者：', user.name);
  getProfileAPI(user.id, function (profile) {
    // ================level 2 start================
    // 等待個人資料回來後，才能用 profile 去取得文章

    console.log('level 2 Done: 取得個人資料：', profile.bio);
    getPostsAPI(profile.userId, function (posts) {
      // ================level 3 start================
      // 等待文章列表回來後，才能用 posts 去取得文章

      console.log('level 3 Done: 取得文章列表：', posts.length, '篇');
      // ================level 3 end================
    }, function (error) {
      console.error('❌ 取得文章失敗：', error.message);
      console.log('💡 建議：重新整理頁面或稍後再試');
    });
    // ================level 2 end================
  }, function (error) {
    console.error('❌ 取得個人資料失敗：', error.message);
    console.log('💡 建議：檢查使用者權限或聯絡管理員');
  });
  // ================level 1 end================
}, function (error) {
  console.error('❌ 取得使用者失敗：', error.message);
  console.log('💡 建議：確認使用者 ID 是否正確');
});
console.log('=== 主程式繼續執行（非阻塞）===');
```

{% note success %}
**跟著做：體驗巢狀地獄與錯誤處理**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. 主程式立即印出「主程式繼續執行」
2. 依序等待每個 API 完成（每個約 2 秒）
3. 總共需要約 6 秒才能完成整個流程
4. 程式碼向右縮排越來越深，難以閱讀

**測試錯誤處理**：將任一函數中的 `if (false)` 改為 `if (true)`，就能看到錯誤處理的執行流程。
{% endnote %}

這種寫法的問題：
- **可讀性差**：程式碼向右縮排越來越深，難以閱讀
- **錯誤處理分散**：每個回呼都需要單獨處理錯誤
- **維護困難**：新增或修改流程時容易出錯
- **除錯複雜**：當某個步驟出錯時，難以快速定位問題

## Promise

Promise 是 JavaScript 處理「非同步流程」的核心機制。它本質上是一個物件，代表「未來才會取得的結果」，狀態分為 pending（進行中）、fulfilled（已完成）、rejected（已失敗）。Promise 能將原本層層巢狀的回呼（callback hell）攤平成直覺的鏈式流程，並且將錯誤集中在 `.catch()` 處理，大幅提升程式碼的可讀性與維護性。

常見的 Promise 應用場景包括：計時器延遲、動畫控制、圖片載入、網路請求（如 AJAX、fetch、XHR）等所有需要等待結果的非同步任務。透過 Promise，非同步程式碼變得更容易撰寫、追蹤與除錯。

### Promise 狀態流程

Promise 有三個狀態，且狀態轉換是單向的：一旦從 pending 轉換到 fulfilled 或 rejected，就無法再改變。

{% mermaid graph TD %}
    A["new Promise()<br/>pending（進行中）"] --> B{執行結果}
    B -->|成功| C["fulfilled（已完成）<br/>resolve(value)"]
    B -->|失敗| D["rejected（已失敗）<br/>reject(error)"]
    C --> E[".then() 執行"]
    D --> F[".catch() 執行"]
    E --> G[".finally() 執行"]
    F --> G
    G --> H["Promise 結束"]
    
    style A fill:#e1f5fe
    style C fill:#c8e6c9
    style D fill:#ffcdd2
    style E fill:#fff3e0
    style F fill:#fff3e0
    style G fill:#f3e5f5
{% endmermaid %}

{% note info %}
**Promise 狀態說明**
- **pending**：初始狀態，Promise 正在執行中
- **fulfilled**：成功完成，會觸發 `.then()` 方法
- **rejected**：執行失敗，會觸發 `.catch()` 方法
- **不可逆**：一旦狀態改變，就無法再回到 pending 或改變狀態
{% endnote %}

### 基本用法
Promise 是 JavaScript 內建的「建構函式（Constructor）」物件。當你使用 `new Promise()` 建立一個 Promise 實例時，它會自帶三個常用方法：

- **then**：接收「成功」的結果，並可串接後續動作。每個 then 回傳的值會傳給下一個 then。
- **catch**：集中處理「失敗」或「錯誤」的情況。只要鏈式流程中有錯誤，會自動跳到最近的 catch。
- **finally**：無論成功或失敗，最後都會執行的收尾動作。

這三個方法讓我們能用「鏈式」方式描述非同步流程的每個步驟，讓程式碼結構清晰、錯誤處理集中，維護起來更容易。

{% note info %}
**小技巧：Promise 的三大方法**
- `then`、`catch`、`finally` 都是 Promise 物件的方法，可以依需求串接多個。
- 這種設計讓非同步流程像「流程圖」一樣直觀易懂。
{% endnote %}

```js promise-basic.js
// 建立 Promise（隨機成功或失敗）
function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1/3 機率失敗
      if (Math.random() < 0.33) {
        reject(new Error('隨機失敗！'));
      } else {
        resolve('等待成功');
      }
    }, ms);
  });
}

// 執行多次來體驗成功與失敗
console.log('=== Promise 基本用法測試 ===');
wait(500)
  .then((result) => {
    console.log('✅ 等待完成！', result);
    return 'OK';
  })
  .then((result) => {
    console.log('✅ 收到結果：', result);
  })
  .catch((err) => console.error('❌ 錯誤：', err.message))
  .finally(() => console.log(' 流程結束'));
```

{% note success %}
**跟著做：體驗 Promise 錯誤處理**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
- 約 2/3 機率成功：執行 `.then()` 鏈
- 約 1/3 機率失敗：跳過 `.then()`，執行 `.catch()`
- 無論成功失敗都會執行 `.finally()`

**多執行幾次**來體驗不同的結果！
{% endnote %}

### 快捷方法
介紹「Promise 的快捷方法」。這些方法能讓你更快速地建立已完成（fulfilled）或已失敗（rejected）的 Promise，並在實務上靈活應用於條件判斷、預設值處理、錯誤攔截等情境。這些技巧能讓你的非同步程式碼更簡潔、易讀，也更容易維護。

{% note info %}
**Promise.resolve() 與 Promise.reject()**
- `Promise.resolve(value)`：建立一個「已完成」的 Promise，狀態為 fulfilled
- `Promise.reject(error)`：建立一個「已失敗」的 Promise，狀態為 rejected
- 這是建立 Promise 的快捷方法，不需要寫 `new Promise()`
{% endnote %}

#### 對比 Promise 的建立
以下比較「快捷方法」與「基本用法」的差異。使用 `Promise.resolve()` 或 `Promise.reject()` **會直接跳過 pending 狀態**，不像 `new Promise(...)` 需要經過 resolve/reject 才改變狀態。這讓程式碼更簡潔，也更適合用於條件判斷或預設值處理。

```js promise-creation.js
// 快捷方法 1：使用 Promise.resolve()（推薦）
Promise.resolve('成功').then(console.log);

// 基本用法 1：使用 new Promise()（較冗長）
new Promise((resolve) => resolve('成功')).then(console.log);

// 快捷方法 2：建立失敗的 Promise
Promise.reject(new Error('失敗')).catch(console.error);

// 基本用法 2：new Promise() 建立失敗
new Promise((resolve, reject) => reject(new Error('失敗'))).catch(console.error);
```

#### 實際應用場景
在實務開發中，`Promise.resolve()` 與 `Promise.reject()` 不只是語法糖，更是提升非同步流程彈性與可讀性的利器。這兩個方法常用於「條件判斷」、「參數驗證」以及「統一錯誤處理」等場景，能讓程式碼更簡潔、易於維護。以下整理幾個常見應用情境，協助你靈活掌握這些快捷技巧。若遇到尚未學過的語法，可先略過本節，日後再回來複習。

```js promise-real-world.js
// 場景 1：條件式 API 呼叫
// ----------------------------------------------------------------
async function getUserData(userId) {
  // 檢查快取
  const cached = localStorage.getItem(`user_${userId}`);
  if (cached) {
    // 如果有快取，直接回傳 Promise.resolve()
    return Promise.resolve(JSON.parse(cached));
  }
  
  // 沒有快取才呼叫 API
  const response = await fetch(`/api/users/${userId}`);
  const userData = await response.json();
  localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
  return userData;
}

// 場景 2：參數驗證
// ----------------------------------------------------------------
function fetchUserPosts(userId) {
  // 參數驗證失敗，直接回傳 Promise.reject()
  if (!userId || userId <= 0) {
    return Promise.reject(new Error('無效的使用者 ID'));
  }
  
  // 參數正確才呼叫 API
  return fetch(`/api/users/${userId}/posts`);
}

// 場景 3：統一錯誤處理
// ----------------------------------------------------------------
async function safeApiCall(apiFunction, fallbackValue) {
  try {
    const result = await apiFunction();
    return Promise.resolve(result);
  } catch (error) {
    console.error('API 呼叫失敗，使用預設值：', error.message);
    return Promise.resolve(fallbackValue); // 回傳預設值而不是錯誤
  }
}

// 使用範例
safeApiCall(
  () => fetch('/api/data'),
  { message: '預設資料' }
).then(console.log);
```

{% note warning %}
**實際開發中的重要性**
- **快取機制**：有快取時直接回傳 `Promise.resolve(cachedData)`
- **參數驗證**：驗證失敗時回傳 `Promise.reject(new Error())`
- **錯誤恢復**：API 失敗時回傳 `Promise.resolve(defaultValue)`
- **條件式邏輯**：根據條件決定是否呼叫真實 API
{% endnote %}

### 鏈式與錯誤傳遞
Promise 的強大之處在於可以「鏈式呼叫」，每個 `.then()` 的回傳值會自動傳遞給下一個 `.then()`。更重要的是，錯誤會「冒泡」到最近的 `.catch()`，讓我們可以集中處理所有錯誤。

{% note info %}
**鏈式呼叫的關鍵觀念**
1. **資料傳遞**：每個 `.then()` 的回傳值會成為下一個 `.then()` 的參數
2. **錯誤冒泡**：任何步驟出錯，都會跳過後續 `.then()`，直接執行 `.catch()`
3. **錯誤恢復**：`.catch()` 可以回傳新值，讓鏈式呼叫繼續進行
4. **統一處理**：所有錯誤都在一個地方處理，不需要分散在各個回呼中
{% endnote %}

#### 鏈式呼叫：資料傳遞
```js promise-chain.js
// Promise.resolve() 是建立「已完成」Promise 的快捷方法
// 等同於：new Promise((resolve) => resolve(1))
Promise.resolve(1)
  .then((n) => {
    console.log('第一步：', n); // 1
    return n + 1; // 回傳 2
  })
  .then((n) => {
    console.log('第二步：', n); // 2
    return n * 3; // 回傳 6
  })
  .then((n) => {
    console.log('第三步：', n); // 6
    return `結果是 ${n}`; // 回傳字串
  })
  .then((result) => {
    console.log('最終：', result); // "結果是 6"
  });
```

#### 錯誤傳遞：集中處理
```js promise-error-chain.js
// 錯誤會跳過所有 .then()，直接到最近的 .catch()
Promise.resolve(1)
  .then((n) => {
    console.log('第一步：', n);
    return n + 1;
  })
  .then((n) => {
    console.log('第二步：', n);
    // 故意拋出錯誤
    throw new Error('第二步出錯了！');
  })
  .then((n) => {
    // 這一步不會執行，因為上一步出錯了
    console.log('第三步：', n);
    return n * 3;
  })
  .catch((error) => {
    // 錯誤會直接跳到這裡
    console.error('❌ 捕捉到錯誤：', error.message);
    return '錯誤恢復值'; // 可以回傳新值繼續鏈式呼叫
  })
  .then((result) => {
    // 如果 .catch() 有回傳值，會繼續執行
    console.log('✅ 錯誤處理後：', result);
  });
```

{% note success %}
**跟著做：體驗鏈式呼叫**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
- **成功案例**：資料依序傳遞，每個步驟都執行
- **錯誤案例**：錯誤跳過中間步驟，直接到 `.catch()` 處理
{% endnote %}

### 解決巢狀地獄
現在我們將前面的巢狀地獄範例改寫成 Promise 版本，你會看到程式碼變得更加清晰易讀：

```js promise-solution.js
// 將原本的 API 函數改寫為 Promise 版本
// -----------------------------------------------------------------------
function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    console.warn(`level 1: 開始取得使用者 ${id} 的資料。..`);
    setTimeout(() => {
      if (false) {
        // 模擬錯誤情況（目前不觸發）
        console.log(`level 1: 使用者 ${id} 資料取得失敗`);
        reject(new Error(`level 1: 找不到使用者 ID: ${id}`));
        return;
      }
      console.log(`level 1: 成功，返回使用者 ${id} 資料`);
      resolve({ id: id, name: 'Loki', email: 'loki@example.com' });
    }, 2000);
  });
}

function getProfilePromise(userId) {
  return new Promise((resolve, reject) => {
    console.warn(`level 2: 開始取得使用者 ${userId} 的個人資料。..`);
    setTimeout(() => {
      if (false) {
        // 模擬錯誤情況（目前不觸發）
        console.log(`level 2: 使用者 ${userId} 個人資料取得失敗`);
        reject(new Error(`level 2: 個人資料載入失敗，使用者可能已停權`));
        return;
      }
      console.log(`level 2: 成功，返回使用者 ${userId} 個人資料`);
      resolve({
        userId: userId,
        bio: '前端開發者',
        avatar: 'avatar.jpg',
        posts: 15
      });
    }, 2000);
  });
}

function getPostsPromise(profileName) {
  return new Promise((resolve, reject) => {
    console.warn(`level 3: 開始取得 ${profileName} 的文章列表。..`);
    setTimeout(() => {
      if (false) {
        // 模擬錯誤情況（目前不觸發）
        console.log(`level 3: ${profileName} 的文章列表取得失敗`);
        reject(new Error(`level 3: 文章列表載入失敗，伺服器忙碌中`));
        return;
      }
      console.log(`level 3: 成功，返回${profileName} 的文章列表`);
      resolve([
        { id: 1, title: 'JavaScript 基礎', content: '...' },
        { id: 2, title: 'Promise 教學', content: '...' },
        { id: 3, title: 'async/await 實戰', content: '...' }
      ]);
    }, 2000);
  });
}

// Promise 版本：攤平流程、集中錯誤處理
// -----------------------------------------------------------------------
console.clear();
console.log('=== 開始 Promise 解決方案 ===');

getUserPromise(1)
  .then((user) => {
    console.log('level 1 Done: 取得使用者：', user.name);
    return getProfilePromise(user.id);
  })
  .then((profile) => {
    console.log('level 2 Done: 取得個人資料：', profile.bio);
    return getPostsPromise(profile.userId);
  })
  .then((posts) => {
    console.log('level 3 Done: 取得文章列表：', posts.length, '篇');
    console.log('=== Promise 解決方案完成 ===');
  })
  .catch((error) => {
    // 集中錯誤處理：任何步驟出錯都會被這裡捕捉
    console.error('❌ 流程中斷：', error.message);
    if (error.message.includes('level 1')) {
      console.log('💡 建議：確認使用者 ID 是否正確');
    } else if (error.message.includes('level 2')) {
      console.log('💡 建議：檢查使用者權限或聯絡管理員');
    } else if (error.message.includes('level 3')) {
      console.log('💡 建議：重新整理頁面或稍後再試');
    }
  });

console.log('=== 主程式繼續執行（非阻塞）===');
```

{% note success %}
**跟著做：體驗 Promise 解決方案**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. 主程式立即印出「主程式繼續執行」
2. 依序等待每個 API 完成（每個約 2 秒）
3. 總共需要約 6 秒才能完成整個流程
4. **程式碼攤平**：不再有深層巢狀，易於閱讀
5. **錯誤處理集中**：所有錯誤都在 `.catch()` 中統一處理

**測試錯誤處理**：將任一函數中的 `if (false)` 改為 `if (true)`，就能看到集中錯誤處理的效果。
{% endnote %}

{% note info %}
**Promise vs 巢狀地獄的對比**
| 特性       | 巢狀地獄             | Promise              |
| ---------- | -------------------- | -------------------- |
| 可讀性     | ❌ 深層縮排，難以閱讀 | ✅ 鏈式呼叫，清晰易讀 |
| 錯誤處理   | ❌ 分散在各個回呼     | ✅ 集中在 `.catch()`  |
| 維護性     | ❌ 新增步驟困難       | ✅ 容易新增或修改步驟 |
| 除錯       | ❌ 難以追蹤錯誤來源   | ✅ 錯誤堆疊清晰       |
| 程式碼結構 | ❌ 向右延伸           | ✅ 向下延伸           |
{% endnote %}

### Promise 組合方法
在實際開發中，我們經常需要「同時」執行多個非同步任務，並在全部完成後再進行後續處理。這時就可以利用 Promise 的「組合方法」來達成併行（parallel）執行的效果。這讓你能更有效率地管理多個非同步任務，避免一個一個等待，提升整體效能。

{% note info %}
**組合方法的適用情境**
| 方法                 | 適用情境               | 特點                   |
| -------------------- | ---------------------- | ---------------------- |
| `Promise.all`        | 需要全部資料才能繼續   | 任何一個失敗就整體失敗 |
| `Promise.allSettled` | 需要知道每個任務的結果 | 不管成功失敗都會完成   |
| `Promise.race`       | 競速或超時處理         | 回傳最先完成的         |
| `Promise.any`        | 多個備援方案           | 任一成功就算成功       |
{% endnote %}

#### Promise.all
`Promise.all()` 會等待所有 Promise 都成功完成，如果任何一個失敗，整個 Promise.all 就會失敗。

```js promise-all.js
// 建立測試用的 Promise 函數
function createTask(name, delay, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${name} 失敗了`));
      } else {
        resolve(`${name} 成功`);
      }
    }, delay);
  });
}

// 全部成功的案例
console.log('=== Promise.all 全部成功 ===');
Promise.all([
  createTask('任務 A', 300),
  createTask('任務 B', 200),
  createTask('任務 C', 100)
])
.then((results) => {
  console.log('✅ 全部完成：', results);
  // 結果：['任務 A 成功', '任務 B 成功', '任務 C 成功']
})
.catch((error) => {
  console.error('❌ 有任務失敗：', error.message);
});

// 有任務失敗的案例
console.log('=== Promise.all 有任務失敗 ===');
Promise.all([
  createTask('任務 A', 300),
  createTask('任務 B', 200, true), // 故意失敗
  createTask('任務 C', 100)
])
.then((results) => {
  console.log('✅ 全部完成：', results);
})
.catch((error) => {
  console.error('❌ 有任務失敗：', error.message);
  // 結果：任務 B 失敗了
});
```

#### Promise.allSettled
`Promise.allSettled()` 會等待所有 Promise 都完成，不管成功或失敗，都會回傳每個 Promise 的狀態。

```js promise-allSettled.js
console.log('=== Promise.allSettled ===');
Promise.allSettled([
  createTask('任務 A', 300),
  createTask('任務 B', 200, true), // 故意失敗
  createTask('任務 C', 100)
])
.then((results) => {
  console.log('📊 所有任務狀態：', results);
  // 結果：
  // [
  //   { status: 'fulfilled', value: '任務 A 成功' },
  //   { status: 'rejected', reason: Error: 任務 B 失敗了 },
  //   { status: 'fulfilled', value: '任務 C 成功' }
  // ]
  
  // 統計成功和失敗的數量
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  console.log(`成功：${successful} 個，失敗：${failed} 個`);
});
```

#### Promise.race
`Promise.race()` 會回傳最先完成的 Promise，不管是成功還是失敗。

```js promise-race.js
console.log('=== Promise.race ===');
Promise.race([
  createTask('任務 A', 300),
  createTask('任務 B', 200),
  createTask('任務 C', 100)
])
.then((result) => {
  console.log('🏆 最先完成：', result);
  // 結果：任務 C 成功（因為只需要 100ms）
})
.catch((error) => {
  console.error('🏆 最先失敗：', error.message);
});

// 有失敗任務的案例
console.log('=== Promise.race 有失敗任務 ===');
Promise.race([
  createTask('任務 A', 300),
  createTask('任務 B', 150, true), // 故意失敗，且較快
  createTask('任務 C', 100)
])
.then((result) => {
  console.log('🏆 最先完成：', result);
})
.catch((error) => {
  console.error('🏆 最先失敗：', error.message);
  // 結果：任務 B 失敗了（因為 150ms 就失敗了）
});
```

#### Promise.any
`Promise.any()` 會等待第一個成功的 Promise，如果全部失敗才會失敗。

```js promise-any.js
console.log('=== Promise.any ===');
Promise.any([
  createTask('任務 A', 300),
  createTask('任務 B', 200, true), // 故意失敗
  createTask('任務 C', 100)
])
.then((result) => {
  console.log('✅ 第一個成功：', result);
  // 結果：任務 C 成功（第一個成功的）
})
.catch((error) => {
  console.error('❌ 全部失敗：', error.message);
});

// 全部失敗的案例
console.log('=== Promise.any 全部失敗 ===');
Promise.any([
  createTask('任務 A', 300, true), // 故意失敗
  createTask('任務 B', 200, true), // 故意失敗
  createTask('任務 C', 100, true)  // 故意失敗
])
.then((result) => {
  console.log('✅ 第一個成功：', result);
})
.catch((error) => {
  console.error('❌ 全部失敗：', error.message);
  // 結果：AggregateError: All promises were rejected
});
```

{% note success %}
**跟著做：體驗 Promise 組合方法**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
- **Promise.all**：全部成功才完成，任何一個失敗就整體失敗
- **Promise.allSettled**：等待全部完成，回傳每個任務的狀態
- **Promise.race**：回傳最先完成的任務（不管成功失敗）
- **Promise.any**：回傳第一個成功的任務，全部失敗才失敗
{% endnote %}

### 載入圖片的非同步操作
圖片載入是一個常見的非同步操作。傳統上我們會監聽 `onload` 和 `onerror` 事件，但這種寫法容易造成巢狀結構。利用 Promise，可以將圖片載入流程包裝成一個易於串接與錯誤處理的非同步任務，讓程式碼更簡潔、可讀性更高。

```js image-load-promise.js
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('圖片載入失敗'));
    img.src = src;
  });
}

loadImage('https://picsum.photos/200')
  .then((img) => console.log('圖片寬度：', img.width))
  .catch((err) => console.error(err.message));
```

## async/await

`async/await` 是 ES2017 新增的語法糖，讓你能用「幾乎像同步程式」的方式撰寫非同步流程，大幅提升程式碼的可讀性與維護性。它其實是 Promise 的進階寫法，讓非同步邏輯變得更直覺、易懂，閱讀起來就像一般的直線程式碼。

### 核心概念

async/await 的主要目的是**讓非同步程式碼看起來像同步程式碼**，隱藏了 Promise 的 `.then()` 和 `.catch()` 語法，讓程式碼更容易閱讀和理解。

- **async**：宣告一個非同步函式，該函式會自動將回傳值包裝成 Promise
- **await**：等待 Promise 完成，只能在 `async` 函式內使用
- **錯誤處理**：使用傳統的 `try/catch` 語法處理錯誤，不需要 `.catch()`

{% note warning %}
**為什麼需要 async？**
`async` 是為了使用 `await` 而存在的。`await` 只能在 `async` 函式內使用，這是 JavaScript 的語法規則。

```js
// ❌ 錯誤：在一般函式內使用 await
function wrongFunction() {
  const result = await somePromise(); // 語法錯誤！
}

// ✅ 正確：在 async 函式內使用 await
async function correctFunction() {
  const result = await somePromise(); // 語法正確
}
```
{% endnote %}

{% note info %}
**async 函式的特性**
除了讓你使用 `await` 之外，async 函式還有一個特性：會自動將回傳值包裝成 Promise。透過這個特性，讓 async 函式仍可以與 Promise 鏈式呼叫相容。

```js
// 一般函式
// ---------------------------------------------------------
function normalFunction() {
  return "Hello";
}
console.log(normalFunction()); // "Hello"

// async 函式
// ---------------------------------------------------------
async function asyncFunction() {
  return "Hello";
}
console.log(asyncFunction()); // Promise {<fulfilled>: "Hello"}
asyncFunction().then(console.log); // "Hello"
```

{% endnote %}

### 與 Promise 對比差異
在學習 JavaScript 的非同步處理時，`Promise` 和 `async/await` 是兩種常見的寫法。雖然它們本質上都基於 Promise，但語法和錯誤處理方式有所不同。本節將透過範例，對比這兩種寫法的差異，幫助你理解何時該選用哪一種方式。

```js comparison.js
// 基礎工具函數
// ---------------------------------------------------------
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchNumberAfter(ms, n) {
  return new Promise((resolve) => setTimeout(() => resolve(n), ms));
}

// Promise 版本：需要 .then() 和 .catch()
// ---------------------------------------------------------
function promiseVersion() {
  console.log('開始');
  wait(300)
    .then(() => {
      console.log('等待完成');
      return fetchNumberAfter(200, 10);
    })
    .then((a) => {
      return fetchNumberAfter(200, 5).then((b) => a + b);
    })
    .then((result) => {
      console.log('結果：', result);
    })
    .catch((err) => {
      console.error('錯誤：', err.message);
    });
}

// async/await 版本：看起來像同步程式碼
// ---------------------------------------------------------
async function asyncVersion() {
  try {
    console.log('開始');
    await wait(300);                    // 需要 async 才能使用 await
    console.log('等待完成');
    
    const a = await fetchNumberAfter(200, 10);  // 看起來像同步賦值
    const b = await fetchNumberAfter(200, 5);   // 看起來像同步賦值
    
    console.log('結果：', a + b);       // 直接使用結果
  } catch (err) {
    console.error('錯誤：', err.message);  // 傳統 try/catch
  }
}

// 執行比較
console.log('=== Promise 版本 ===');
promiseVersion();

console.log('=== async/await 版本 ===');
asyncVersion();
```

{% note success %}
**跟著做：體驗兩種寫法的差異**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
- **Promise 版本**：使用 `.then()` 鏈式呼叫，錯誤用 `.catch()` 處理
- **async/await 版本**：看起來像同步程式碼，錯誤用 `try/catch` 處理
- **結果相同**：兩種寫法最終都會得到相同的結果
{% endnote %}

### 與 Promise.all 的關係

`async/await` 和 `Promise.all` 解決的是不同的問題：

- **async/await**：讓串行（一個接一個）的非同步程式碼看起來像同步
- **Promise.all**：讓多個非同步任務併行（同時）執行

{% note info %}
**何時使用哪一種？**
- **使用 async/await**：當任務需要依序執行，後面的任務依賴前面的結果
- **使用 Promise.all**：當任務可以同時執行，不需要等待彼此
- **結合使用**：在 `async/await` 函式內使用 `Promise.all` 來併行執行獨立任務
{% endnote %}

```js async-vs-promise-all.js
// 基礎工具函數
// ---------------------------------------------------------
function wait(ms, label) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${label} 完成`);
      resolve(label);
    }, ms);
  });
}

// 串行執行：一個接一個（async/await 的強項）
// ---------------------------------------------------------
async function sequential() {
  console.log('=== 串行執行 ===');
  const start = Date.now();
  
  const result1 = await wait(300, '任務 A');
  const result2 = await wait(300, '任務 B');
  const result3 = await wait(300, '任務 C');
  
  console.log('串行完成，耗時：', Date.now() - start, 'ms');
  return [result1, result2, result3];
}

// 併行執行：同時執行（Promise.all 的強項）
// ---------------------------------------------------------
async function parallel() {
  console.log('=== 併行執行 ===');
  const start = Date.now();
  
  const [result1, result2, result3] = await Promise.all([
    wait(300, '任務 A'),
    wait(300, '任務 B'),
    wait(300, '任務 C')
  ]);
  
  console.log('併行完成，耗時：', Date.now() - start, 'ms');
  return [result1, result2, result3];
}

// 執行比較
sequential().then(() => parallel());
```

{% note warning %}
**重要觀念**
- `async/await` 是為了使用 `await` 而存在的語法要求
- `await` 只能在 `async` 函式內使用
- `await` 會暫停當前函式執行，等待 Promise 完成
- 使用 `await` 時，Promise 的 `.then()` 和 `.catch()` 被隱藏了
- 錯誤處理使用 `try/catch`，而不是 `.catch()`
- `Promise.all` 仍然在 `async/await` 中有重要作用
{% endnote %}

# AJAX 與 Fetch API
AJAX 與 Fetch API 是現代網頁開發中不可或缺的技術，讓前端能夠與伺服器進行資料交換，實現動態內容更新。這一章節將帶你認識 AJAX 的基本觀念，並學會用 Fetch API 進行非同步資料請求，打造互動性更高的網頁。

## 什麼是 AJAX？
**AJAX**（Asynchronous JavaScript and XML）是一種現代網頁開發技術，允許前端在**不重新載入整個頁面**的情況下，向伺服器發送請求並即時取得回應。這種方式大幅提升了網頁應用的互動性與流暢度，讓使用者操作更接近桌面應用程式。

透過 AJAX 取得的資料，配合 **DOM 操作**（如 `innerHTML`、`appendChild`、`removeChild` 等），可以只更新頁面的特定區塊（而非整頁重整），實現「單頁應用程式」（SPA, Single Page Application）的效果，帶來更快速、無縫的使用體驗。

{% note info %}
**AJAX 的核心概念**

- **非同步**：請求發送後不會阻塞頁面，使用者可以繼續操作
- **背景通訊**：在背景與伺服器進行資料交換
- **資料取得**：取得伺服器回應的資料（通常是 JSON 格式）
{% endnote %}

{% note info %}
**AJAX 的演進**
- **早期**：使用 XMLHttpRequest（XHR）物件
- **現代**：使用 Fetch API（基於 Promise）
- **未來**：可能會使用更現代的 API 如 Fetch with Streams
{% endnote %}

## JSON：資料交換的標準格式

在學習 Fetch API 之前，我們需要先了解 **JSON**（JavaScript Object Notation），因為它是現代 API 資料交換的標準格式。JSON 是一種輕量級的資料交換格式，易於人閱讀和編寫，也易於機器解析和生成。

{% note info %}
**為什麼 API 大多使用 JSON？**
- **輕量級**：比 XML 更簡潔，檔案大小更小
- **易於解析**：JavaScript 原生支援，解析速度快
- **跨平台**：所有程式語言都有 JSON 解析器
- **結構化**：支援巢狀物件和陣列，適合複雜資料
- **標準化**：RFC 7159 標準，確保相容性
{% endnote %}


### JSON 的基本概念

**JSON 是什麼？**
JSON 是一種基於 JavaScript 物件語法的資料格式，但它是純文字格式，不依賴於任何程式語言。這讓它成為不同系統間資料交換的理想選擇。

**JSON 的資料類型：**
- **字串**：`"Hello World"`
- **數字**：`42`、`3.14`
- **布林值**：`true`、`false`
- **null**：`null`
- **陣列**：`[1, 2, 3, "hello"]`
- **物件**：`{"name": "張三", "age": 25}`

### JSON 與 JavaScript 物件的轉換

在 JavaScript 中，我們經常需要在 JSON 字串和 JavaScript 物件之間進行轉換：

```js json-basics.js
// JavaScript 物件
// --------------------------------------------
const user = {
  name: '張三',
  age: 25,
  email: 'zhang@example.com',
  isActive: true,
  hobbies: ['閱讀', '游泳', '程式設計'],
  address: {
    city: '台北市',
    district: '信義區'
  }
};

// 將 JavaScript 物件轉為 JSON 字串
// --------------------------------------------
const jsonString = JSON.stringify(user);
console.log('JSON 字串：', jsonString);
// 輸出：{"name":"張三","age":25,"email":"zhang@example.com","isActive":true,"hobbies":["閱讀","游泳","程式設計"],"address":{"city":"台北市","district":"信義區"}}


// JSON 字串轉 JavaScript 物件
// --------------------------------------------
const parsedUser = JSON.parse(jsonString);
console.log('解析後的物件：', parsedUser);
console.log('使用者姓名：', parsedUser.name);
console.log('使用者年齡：', parsedUser.age);

// 格式化輸出（美化）
// --------------------------------------------
// 第二個參數（null）代表 replacer，這裡不做過濾；第三個參數（2）代表縮排空格數，讓輸出更易讀
const prettyJson = JSON.stringify(user, null, 2);
console.log('格式化的 JSON：');
console.log(prettyJson);
```

{% note success %}
**跟著做：體驗 JSON 轉換**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. **物件轉 JSON**：使用 `JSON.stringify()` 將物件轉為字串
2. **JSON 轉物件**：使用 `JSON.parse()` 將字串轉為物件
3. **格式化輸出**：使用 `JSON.stringify(obj, null, 2)` 產生美化的 JSON
{% endnote %}

### JSON 的常見錯誤和注意事項

```js json-common-errors.js
// 1. JSON 語法錯誤
try {
  // ❌ 錯誤：JSON 中的字串必須用雙引號
  const invalidJson1 = JSON.parse("{'name': '張三'}");
} catch (error) {
  console.error('JSON 語法錯誤 1：', error.message);
}

try {
  // ❌ 錯誤：JSON 不支援註解
  const invalidJson2 = JSON.parse('{"name": "張三" // 這是註解}');
} catch (error) {
  console.error('JSON 語法錯誤 2：', error.message);
}

try {
  // ❌ 錯誤：JSON 不支援尾隨逗號
  const invalidJson3 = JSON.parse('{"name": "張三", "age": 25,}');
} catch (error) {
  console.error('JSON 語法錯誤 3：', error.message);
}

// 2. 正確的 JSON 格式
const validJson = JSON.parse('{"name": "張三", "age": 25}');
console.log('正確的 JSON：', validJson);

// 3. 特殊字元處理
const specialChars = {
  message: '這是一個包含 "引號" 和 \n換行的訊息',
  path: 'C:\\Users\\Documents\\file.txt'
};

const escapedJson = JSON.stringify(specialChars);
console.log('特殊字元處理：', escapedJson);

// 4. 日期處理
const dataWithDate = {
  name: '張三',
  createdAt: new Date()
};

// ❌ 日期物件會被轉為字串
console.log('日期物件轉 JSON：', JSON.stringify(dataWithDate));

// ✅ 自訂日期格式
const customDateJson = JSON.stringify(dataWithDate, (key, value) => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
});
console.log('自訂日期格式：', customDateJson);
```

{% note warning %}
**JSON 的重要限制**
- **字串必須用雙引號**：`"hello"` ✅，`'hello'` ❌
- **不支援註解**：JSON 格式不允許註解
- **不支援尾隨逗號**：最後一個屬性後不能有逗號
- **不支援函數**：JSON 只能包含資料，不能包含函數
- **日期會轉為字串**：Date 物件會被轉為 ISO 字串格式
{% endnote %}



## Fetch API：現代的 AJAX 解決方案

`fetch()` 是現代瀏覽器提供的 API，用於發送 HTTP 請求。它回傳一個 Promise，讓你可以用 `.then()` 或 `async/await` 來處理回應。




### 練習工具

為了練習 AJAX 和 API 串接，我們將使用 **JSONPlaceholder**，這是一個免費的假資料 API 服務。

{% note primary %}
**JSONPlaceholder 練習環境**
- **網址**：`https://jsonplaceholder.typicode.com`
- **用途**：提供假資料來練習 API 串接
- **資源**：posts、comments、users、todos 等
- **特色**：支援 GET、POST、PUT、DELETE 等 HTTP 方法
- **免費**：不需要註冊或 API Key
{% endnote %}

### 基本語法
Fetch API 需要傳入目標網址（url）及相關選項（options），其回傳值為一個 Promise 物件，因此可透過 `.then()` 處理成功結果，或用 `.catch()` 捕捉錯誤，靈活管理非同步請求流程。

```js
fetch(url, options?)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

{% note info %}
**為什麼需兩次 then**
- **第一次**：`fetch()` 回傳的是 Response 物件，包含 HTTP 狀態、標頭等資訊，需要呼叫 `.json()` 來解析回應內容
- **第二次**：`.json()` 方法本身也是非同步的，回傳 Promise，所以需要再次 `.then()` 來取得解析後的資料

**流程說明**：網路請求 → Response 物件 → JSON 解析 → 實際資料
{% endnote %}

### JSON 解析的重要注意事項

當使用 Fetch API 取得資料時，大多數 API 都會回傳 JSON 格式的資料。了解如何正確處理 JSON 解析是使用 Fetch API 的關鍵。

```js fetch-json-handling.js
// 1. 基本的 JSON 解析
async function fetchUserData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    // 檢查回應狀態
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // 解析 JSON 資料
    const userData = await response.json();
    console.log('使用者資料：', userData);
    
    // 存取資料屬性
    console.log('使用者姓名：', userData.name);
    console.log('使用者信箱：', userData.email);
    
    return userData;
  } catch (error) {
    console.error('取得資料失敗：', error.message);
    throw error;
  }
}

// 2. 安全的 JSON 解析
async function safeJsonParse(response) {
  try {
    // 檢查 Content-Type 標頭
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // 如果不是 JSON，回傳文字
      return await response.text();
    }
  } catch (error) {
    console.error('JSON 解析失敗：', error.message);
    throw new Error('回應格式不正確');
  }
}

// 3. 處理不同類型的回應
async function handleDifferentResponses() {
  try {
    // JSON 回應
    const jsonResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const jsonData = await safeJsonParse(jsonResponse);
    console.log('JSON 資料：', jsonData);
    
    // 文字回應（模擬）
    const textResponse = await fetch('https://httpbin.org/plain');
    const textData = await safeJsonParse(textResponse);
    console.log('文字資料：', textData);
    
  } catch (error) {
    console.error('處理回應失敗：', error.message);
  }
}

// 4. 錯誤處理範例
async function fetchWithErrorHandling() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/999'); // 不存在的使用者
    
    if (!response.ok) {
      // 嘗試解析錯誤訊息（如果有的話）
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // 如果無法解析 JSON，使用預設錯誤訊息
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('請求失敗：', error.message);
    throw error;
  }
}

// 5. 批次處理多個 JSON 回應
async function fetchMultipleUsers() {
  try {
    const userIds = [1, 2, 3];
    const promises = userIds.map(id => 
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
    );
    
    const users = await Promise.all(promises);
    console.log('多個使用者資料：', users);
    
    // 處理每個使用者的資料
    users.forEach((user, index) => {
      console.log(`使用者 ${index + 1}: ${user.name} (${user.email})`);
    });
    
    return users;
  } catch (error) {
    console.error('批次請求失敗：', error.message);
    throw error;
  }
}

// 使用範例
fetchUserData();
handleDifferentResponses();
fetchWithErrorHandling();
fetchMultipleUsers();
```

{% note warning %}
**JSON 解析的常見陷阱**
- **檢查回應狀態**：在解析 JSON 前先檢查 `response.ok`
- **Content-Type 檢查**：確認回應確實是 JSON 格式
- **錯誤處理**：使用 try-catch 包裝 JSON 解析
- **非同步處理**：`response.json()` 回傳 Promise，需要使用 await
- **空回應處理**：某些 API 可能回傳空字串或 null
{% endnote %}

{% note info %}
**最佳實踐**
- **統一錯誤處理**：建立通用的 JSON 解析函數
- **類型檢查**：確認解析後的資料結構符合預期
- **預設值**：為可能為空的欄位提供預設值
- **驗證資料**：檢查必要欄位是否存在
{% endnote %}

你也可以利用 async/await 語法來更直覺地處理 fetch 非同步請求，讓程式碼更易讀且結構更清晰。

```js
async function fetchData() {
  try {
    const response = await fetch(url, options?);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

{% note info %}
**兩種寫法的選擇**
- **Promise.then**：適合簡單的單次請求
- **async/await**：適合複雜的邏輯和多個請求，可讀性更高
- **本課程後續範例**：將優先使用 async/await 寫法
{% endnote %}

#### options 參數說明

在進行 API 連線時，整個流程可分為兩大部分：

- **Request（請求）**：由前端發送給伺服器的資料與設定。這些設定主要透過 `options` 參數來自訂，包括：
  - `method`（HTTP 方法）：如 GET、POST、PUT、DELETE 等
  - `headers`（請求標頭）：設定資料格式、認證等資訊
  - `body`（請求內容）：傳送資料內容（通常用於 POST、PUT、PATCH）
  - 其他選項如 `mode`（跨域模式）、`credentials`（是否帶 cookies）、`cache`（快取策略）等，可依需求靈活調整
- **Response（回應）**：伺服器處理請求後回傳給前端的資料內容

`options` 參數用來細緻控制 Request（請求）的各種屬性，讓你能根據實際需求調整 API 請求的行為，以下是 options 詳細說明：

| 預設選項與可選值                                                | 範例                                            | 說明                                                |
| --------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| `method: 'GET'` <br>(GET, POST, PUT, DELETE, PATCH)             | method: 'POST'                                  | HTTP 方法                                           |
| `headers: {}` <br>（物件）                                      | headers: { 'Content-Type': 'application/json' } | 請求標頭物件（HTTP 標頭資訊），傳遞額外資訊給伺服器 |
| `body: undefined` <br>（字串）                                  | body: JSON.stringify(data)                      | 請求內容（POST、PUT、PATCH 時使用）                 |
| `mode: 'cors'` <br>(cors, no-cors, same-origin)                 | mode: 'cors'                                    | 請求模式（跨域處理），處理跨域請求問題              |
| `credentials: 'omit'` <br>(omit, same-origin, include)          | credentials: 'include'                          | 控制是否發送 cookies（影響認證）                    |
| `cache: 'default'` <br>(default, no-cache, reload, force-cache) | cache: 'reload'                                 | 控制瀏覽器快取策略（影響效能）                      |
| `redirect: 'follow'` <br>(follow, error, manual)                | redirect: 'follow'                              | 重導向處理                                          |
| `referrer: 'client'` <br>(no-referrer, client, origin)          | referrer: 'origin'                              | 來源頁面設定                                        |
| `signal: undefined` <br>(AbortController 實例）                 | signal: controller.signal                       | 中止控制器（請求取消功能）                          |

#### headers 物件
headers 用來設定 HTTP 請求標頭，常見的標頭包括：

**Content-Type（內容類型標頭）**
用來指定 HTTP 請求內容的資料格式，讓伺服器正確解析傳送過去的資料。這個標頭在 POST、PUT、PATCH 等需要傳送資料的請求中特別重要。

- `application/json`：表示傳送的是 JSON 格式資料，常用於 API 溝通。前端需搭配 `JSON.stringify()` 將物件轉為字串。
- `application/x-www-form-urlencoded`：表示資料以表單格式（key=value&key2=value2）傳送，常見於傳統 HTML 表單提交。
- `multipart/form-data`：用於檔案上傳，可以同時傳送文字與檔案內容。需搭配 `FormData` 物件使用，瀏覽器會自動處理邊界（boundary）設定。

{% note primary %}
**小技巧：Content-Type 設定時機**
- 若使用 `FormData` 物件，通常不需要手動設定 `Content-Type`，瀏覽器會自動補上正確的 multipart/form-data 格式（包含 boundary 參數）。
- 若傳送 JSON，務必設定 `Content-Type: application/json`，否則伺服器可能無法正確解析資料。
{% endnote %}

**Authorization（認證標頭）**
用於傳遞用戶身份驗證資訊給伺服器，確保 API 請求的安全性。常見用法如下：

- `Bearer <token>`：採用 Bearer Token（通常為 JWT，JSON Web Token），用於 OAuth2 或現代 API 認證。前端需將伺服器發給的 token 夾帶在此欄位，格式如 `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...`。
- `Basic <credentials>`：基本認證，將帳號密碼以 `帳號：密碼` 方式經 base64 編碼後傳送。例如：`Authorization: Basic dXNlcjpwYXNzd29yZA==`。此方式多用於內部系統或簡單驗證，安全性較低。

{% note warning %}
**注意事項**
- Bearer Token 請妥善保管，避免外洩，建議搭配 HTTPS 傳輸。
- Basic 認證不建議用於公開網路，除非有加密保護。
{% endnote %}

**Custom Headers（自訂標頭）**
是指除了標準 HTTP 標頭外，開發者可根據需求額外加入的欄位，通常以 `X-` 開頭，讓前後端能傳遞特殊資訊。這些標頭可用於追蹤、驗證、版本控制等多種情境。

- `X-Custom-Header`：自訂標頭（通常以 X- 開頭），可用來傳遞專案自定義的資訊，例如追蹤 ID、API 版本、特殊驗證碼等。伺服器端需自行解析這些欄位。
- `User-Agent`：瀏覽器或用戶端軟體的資訊，包含作業系統、瀏覽器名稱與版本等。伺服器可根據此資訊調整回應內容，或進行裝置相容性判斷。
- `Accept`：用來告訴伺服器前端可接受的回應格式（如 `application/json`、`text/html` 等），伺服器可依此決定回傳資料的格式，提升 API 彈性與相容性。

{% note info %}
**小技巧：自訂標頭應用情境**
- 可用於 API 版本控管（如 `X-API-Version: 2`）
- 傳遞追蹤資訊（如 `X-Request-ID` 方便日誌追蹤）
- 前端與後端協議特殊驗證機制
{% endnote %}

#### method 方法：GET 與 POST
HTTP 方法是與伺服器溝通的基本方式，不同的方法代表不同的操作意圖。在實際開發中，最常用的是 GET 和 POST 兩種方法。

**GET 請求：讀取資料**
GET 請求用於從伺服器取得資料，通常不會改變伺服器狀態。這是最常見的請求類型，用於查詢資料、取得頁面內容等。

{% note info %}
**GET 請求特點**
- **用途**：讀取資料，不改變伺服器狀態
- **資料傳遞**：透過 URL 參數傳遞
- **安全性**：資料會顯示在 URL 中，不適合傳送敏感資訊
- **快取**：可以被瀏覽器快取
- **長度限制**：URL 長度有限制
{% endnote %}

```js fetch-get.js
// 基本 GET 請求：取得單一資料
async function getTodo(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    
    // 檢查回應狀態
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // 解析 JSON 資料
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.error('取得資料失敗：', error.message);
    throw error;
  }
}

// 使用範例
getTodo(1)
  .then(todo => console.log('Todo:', todo))
  .catch(error => console.error('錯誤：', error));

// 帶參數的 GET 請求：查詢多筆資料
async function searchTodos(userId, completed) {
  try {
    const params = new URLSearchParams({
      userId: userId,
      completed: completed
    });
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.error('搜尋失敗：', error.message);
    throw error;
  }
}

// 搜尋特定使用者的已完成任務
searchTodos(1, true)
  .then(todos => console.log('已完成的任務：', todos))
  .catch(error => console.error('錯誤：', error));
```

**POST 請求：建立資料**
POST 請求用於向伺服器發送資料，通常會建立新的資源。這是用於提交表單、上傳檔案、建立新記錄等操作的主要方法。

{% note info %}
**POST 請求特點**
- **用途**：建立新資料，可能改變伺服器狀態
- **資料傳遞**：透過請求主體（body）傳遞
- **安全性**：資料不會顯示在 URL 中，較安全
- **快取**：通常不會被快取
- **長度限制**：沒有 URL 長度限制
{% endnote %}

```js fetch-post.js
// 基本 POST 請求：建立新資料
async function createPost(postData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const newPost = await response.json();
    return newPost;
  } catch (error) {
    console.error('建立資料失敗：', error.message);
    throw error;
  }
}

// 使用範例
const newPost = {
  title: '我的新文章',
  body: '這是文章內容',
  userId: 1
};

createPost(newPost)
  .then(post => console.log('新文章：', post))
  .catch(error => console.error('錯誤：', error));

// 表單資料 POST 請求
async function submitForm(formData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('表單提交失敗：', error.message);
    throw error;
  }
}

// 提交表單資料
const formData = {
  title: '表單標題',
  body: '表單內容',
  userId: 1
};

submitForm(formData)
  .then(result => console.log('表單提交成功：', result))
  .catch(error => console.error('錯誤：', error));
```

{% note success %}
**跟著做：體驗 GET 與 POST 請求**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. **GET 請求**：取得單一資料和查詢多筆資料
2. **POST 請求**：建立新資料和提交表單
3. **錯誤處理**：統一的錯誤處理方式
4. **參數傳遞**：URL 參數 vs 請求主體的差異

**實際應用場景**
- **GET**：取得文章列表、搜尋功能、取得使用者資料
- **POST**：發表文章、註冊帳號、上傳檔案、提交表單
{% endnote %}

{% note warning %}
**重要觀念**
- **GET vs POST**：GET 用於讀取，POST 用於建立
- **安全性**：敏感資料使用 POST，避免在 URL 中暴露
- **快取**：GET 請求可以被快取，POST 通常不會
- **冪等性**：GET 是冪等的（多次請求結果相同），POST 不是
{% endnote %}

#### 操作範例
在實際開發中，HTTP 標頭（headers）不僅用於基本的資料傳遞，還能靈活應用於多種場景，例如 API 版本管理、請求除錯追蹤、A/B 測試、使用者行為分析與安全驗證等。透過自訂標頭，前後端可以協議更多元的資訊，讓 API 互動更具彈性與可擴充性。

##### 常見的傳遞與接收
示範如何使用 fetch 搭配完整的 options 物件，向 JSONPlaceholder API 發送 POST 請求，並自訂 HTTP 標頭與傳送 JSON 格式資料

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',                    // 設定 HTTP 方法
  headers: {                         // 設定請求標頭
    'Content-Type': 'application/json',
    'X-Custom-Header': 'my-value'    // 自訂標頭
  },
  body: JSON.stringify({             // 設定請求內容
    title: '我的新文章',
    body: '這是文章內容',
    userId: 1
  }),
  // mode: 'cors',        // 預設就是 'cors'，可省略
  // credentials: 'omit', // 預設就是 'omit'，可省略
  cache: 'no-cache',      // 這個不是預設值，需明確設定
  // redirect: 'follow'   // 預設就是 'follow'，可省略
})
.then(response => {                  // Response 物件
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  return response.json();
})
.then(data => console.log('新建立的文章：', data));
```

**JSON 資料傳送**
最常見的 API 資料格式，用於傳送結構化的資料。
```js
// JSON 資料傳送範例
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Request-Type': 'json-data'
  },
  body: JSON.stringify({
    title: '我的文章標題',
    body: '這是文章的內容',
    userId: 1
  })
})
.then(response => response.json())
.then(data => {
  console.log('JSON 資料傳送成功：', data);
})
.catch(error => {
  console.error('JSON 資料傳送失敗：', error);
});
```

{% note info %}
**JSON 資料傳送要點**
- 使用 `Content-Type: application/json`
- 使用 `JSON.stringify()` 將物件轉為字串
- 適合傳送複雜的結構化資料
- 伺服器會自動解析 JSON 格式
{% endnote %}

**表單資料傳送**
傳統的 HTML 表單提交格式，用於簡單的鍵值對資料。
```js
// 表單資料傳送範例
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Request-Type': 'form-data'
  },
  body: 'title=表單標題&body=表單內容&userId=1'
})
.then(response => response.json())
.then(data => {
  console.log('表單資料傳送成功：', data);
})
.catch(error => {
  console.error('表單資料傳送失敗：', error);
});

// 動態建立表單資料
function createFormData(data) {
  const params = new URLSearchParams();
  for (const key in data) {
    params.append(key, data[key]);
  }
  return params.toString();
}

// 使用動態表單資料
const formData = createFormData({
  title: '動態標題',
  body: '動態內容',
  userId: 1
});

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Request-Type': 'dynamic-form'
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('動態表單資料傳送成功：', data);
});
```

{% note info %}
**表單資料傳送要點**
- 使用 `Content-Type: application/x-www-form-urlencoded`
- 資料格式為 `key1=value1&key2=value2`
- 適合簡單的鍵值對資料
- 可以使用 `URLSearchParams` 動態建立
{% endnote %}

**檔案上傳**
用於上傳檔案到伺服器，支援多種檔案類型。

```js
// 檔案上傳範例
function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', '檔案上傳測試');
  formData.append('description', '這是一個測試檔案');
  
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'X-Request-Type': 'file-upload',
      'X-File-Name': file.name,
      'X-File-Size': file.size
      // 注意：檔案上傳時不要設定 Content-Type，讓瀏覽器自動設定
    },
    body: formData
  });
}

// 模擬檔案上傳（實際使用時會從 input 元素取得檔案）
const mockFile = new File(['檔案內容'], 'test.txt', { type: 'text/plain' });

uploadFile(mockFile)
  .then(response => response.json())
  .then(data => {
    console.log('檔案上傳成功：', data);
  })
  .catch(error => {
    console.error('檔案上傳失敗：', error);
  });
```

{% note warning %}
**檔案上傳注意事項**
- 不要手動設定 `Content-Type`，讓瀏覽器自動設定
- 瀏覽器會自動加入 `boundary` 參數
- 使用 `FormData` 物件來包裝檔案和額外資料
- 可以加入自訂標頭來傳遞檔案相關資訊
{% endnote %}

**多部分資料傳送**
同時傳送文字資料和檔案，適合複雜的表單提交。

```js
// 多部分資料傳送範例
function uploadWithData(file, userData) {
  const formData = new FormData();
  
  // 加入檔案
  formData.append('avatar', file);
  
  // 加入文字資料
  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('bio', userData.bio);
  
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'X-Request-Type': 'multipart-data',
      'X-User-ID': userData.id
      // 不要設定 Content-Type，讓瀏覽器自動處理
    },
    body: formData
  });
}

// 使用範例
const mockFile = new File(['頭像圖片'], 'avatar.jpg', { type: 'image/jpeg' });
const userData = {
  id: 123,
  name: '張三',
  email: 'zhang@example.com',
  bio: '這是一個測試用戶'
};

uploadWithData(mockFile, userData)
  .then(response => response.json())
  .then(data => {
    console.log('多部分資料傳送成功：', data);
  })
  .catch(error => {
    console.error('多部分資料傳送失敗：', error);
  });
```

{% note success %}
**跟著做：體驗不同內容類型**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. **JSON 資料**：傳送結構化資料
2. **表單資料**：傳送簡單鍵值對
3. **檔案上傳**：上傳檔案到伺服器
4. **多部分資料**：同時傳送檔案和文字

**實際應用場景**
- **JSON**：API 資料交換、複雜物件傳送
- **表單資料**：簡單表單提交、URL 參數
- **檔案上傳**：圖片上傳、文件上傳
- **多部分資料**：用戶資料表單、產品資訊提交
{% endnote %}

##### 自訂標頭的請求（Custom Headers）
HTTP 標頭是前端與伺服器溝通的重要橋樑，除了標準的標頭外，我們還可以傳遞自訂標頭來實現特定的功能需求。自訂標頭讓前後端能夠傳遞額外的資訊，實現更靈活和強大的 API 互動。

**HTTP 標頭包含了兩大類：**
- **標準標頭**：如 `Content-Type`、`Authorization`、`User-Agent` 等
- **自訂標頭**：通常以 `X-` 開頭，如 `X-Custom-Header`、`X-API-Version` 等

**自訂標頭的常見用途：**
- **API 版本控制**：指定使用哪個版本的 API
- **請求追蹤**：為每個請求分配唯一 ID，便於除錯
- **特殊驗證**：傳遞額外的認證或驗證資訊
- **功能開關**：控制伺服器的特定功能
- **統計分析**：傳遞使用者行為或統計資訊

{% note info %}
**自訂標頭命名與注意事項**
- 建議以 `X-` 開頭（如 `X-API-Version`），並用連字號分隔單字
- 標頭名稱區分大小寫，避免使用特殊字元，保持簡潔
- 不要在標頭中傳遞敏感資訊，並避免標頭值過長
- 確認伺服器支援自訂標頭，部分標頭需 CORS 設定允許
{% endnote %}

**基本用法**
以下範例展示如何在 fetch 請求中加入自訂 HTTP 標頭（Custom Headers）。自訂標頭常用於 API 版本控管、請求追蹤、或傳遞專案特定資訊。只需在 headers 物件中加入自訂欄位（通常以 `X-` 開頭），即可讓前後端溝通更靈活。

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'custom-value',      // 自訂標頭
    'X-API-Version': '2',                   // API 版本控制
    'X-Request-ID': 'req-12345'             // 請求追蹤 ID
  },
  body: JSON.stringify({
    title: '測試文章',
    body: '這是測試內容',
    userId: 1
  })
})
.then(response => response.json())
.then(data => {
  console.log('請求成功：', data);
})
.catch(error => {
  console.error('請求失敗：', error);
});
```

**API 版本控制**
這個範例示範如何用自訂標頭 `X-API-Version` 來指定要呼叫的 API 版本，讓前端可以根據需求切換不同版本的 API。

```js
function createAPIClient(version = 'v1') {
  const baseURL = 'https://api.example.com';
  
  // 建立請求函數
  async function request(endpoint, options = {}) {
    const url = `${baseURL}/${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Version': version,             // API 版本
      'X-Client-Version': '1.0.0',          // 客戶端版本
      ...options.headers
    };
    
    return fetch(url, {
      ...options,
      headers
    });
  }
  
  // 回傳 API 物件
  return {
    version: version,
    request: request,
    
    // 取得使用者資料
    async getUsers() {
      const response = await request('users');
      return response.json();
    },
    
    // 取得文章資料
    async getPosts() {
      const response = await request('posts');
      return response.json();
    }
  };
}

// 建立不同版本的 API 客戶端
const apiV1 = createAPIClient('v1');
const apiV2 = createAPIClient('v2');

// 使用不同版本的 API
apiV1.getUsers().then(users => console.log('V1 格式：', users));
apiV2.getUsers().then(users => console.log('V2 格式：', users));
```

**請求追蹤與除錯**
這個範例示範如何在每一次發送 fetch 請求時，自動產生唯一的請求 ID，並將其加入自訂 HTTP 標頭，方便後端進行請求追蹤與除錯。

```js
function createRequestTracker() {
  let requestCount = 0;
  
  // 產生請求 ID
  function generateRequestId() {
    requestCount++;
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `req-${timestamp}-${requestCount}-${random}`;
  }
  
  // 追蹤請求函數
  async function trackedRequest(url, options = {}) {
    const requestId = generateRequestId();
    
    console.log(`開始請求 ${requestId}：${url}`);
    
    const headers = {
      'X-Request-ID': requestId,            // 請求追蹤 ID
      'X-Request-Timestamp': Date.now(),    // 請求時間戳
      'X-Client-IP': '192.168.1.1',         // 客戶端 IP（模擬）
      ...options.headers
    };
    
    const startTime = Date.now();
    
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log(`請求 ${requestId} 完成，耗時：${duration}ms`);
      
      return response;
    } catch (error) {
      console.error(`請求 ${requestId} 失敗：`, error);
      throw error;
    }
  }
  
  return {
    trackedRequest: trackedRequest,
    getRequestCount: () => requestCount
  };
}

// 建立追蹤器
const tracker = createRequestTracker();

// 使用追蹤功能
tracker.trackedRequest('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log('資料：', data));
```

**功能開關與實驗性功能**
示範如何用「功能開關」(Feature Toggle) 控制伺服器端的特定功能開啟或關閉，並將狀態透過自訂 HTTP 標頭傳遞給後端，方便進行 A/B 測試或實驗性功能管理。

```js
function createFeatureToggle() {
  const features = {
    newUI: true,
    betaFeatures: false,
    analytics: true
  };
  
  // 帶功能標頭的請求
  async function requestWithFeatures(url, options = {}) {
    const headers = {
      'X-Feature-NewUI': features.newUI ? 'enabled' : 'disabled',
      'X-Feature-Beta': features.betaFeatures ? 'enabled' : 'disabled',
      'X-Feature-Analytics': features.analytics ? 'enabled' : 'disabled',
      ...options.headers
    };
    
    return fetch(url, {
      ...options,
      headers
    });
  }
  
  // 動態切換功能
  function toggleFeature(featureName) {
    if (features.hasOwnProperty(featureName)) {
      features[featureName] = !features[featureName];
      console.log(`${featureName} 已切換為：${features[featureName]}`);
    }
  }
  
  // 取得功能狀態
  function getFeatureStatus(featureName) {
    return features[featureName] || false;
  }
  
  return {
    requestWithFeatures: requestWithFeatures,
    toggleFeature: toggleFeature,
    getFeatureStatus: getFeatureStatus
  };
}

// 建立功能開關
const featureToggle = createFeatureToggle();

// 使用功能開關發送請求
featureToggle.requestWithFeatures('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    console.log('使用功能開關的資料：', data);
  });

// 切換功能
featureToggle.toggleFeature('newUI');
console.log('新 UI 狀態：', featureToggle.getFeatureStatus('newUI'));
```

**統計分析與使用者行為追蹤**
示範如何透過自訂 HTTP 標頭，將使用者行為（如瀏覽頁面、點擊按鈕等）資訊傳遞到後端伺服器，達到統計分析與行為追蹤的目的。

```js
function createAnalyticsTracker() {
  const sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  const userAgent = navigator.userAgent;
  const screenResolution = `${screen.width}x${screen.height}`;
  
  // 追蹤事件函數
  async function trackEvent(eventName, eventData = {}) {
    const headers = {
      'X-Session-ID': sessionId,
      'X-User-Agent': userAgent,
      'X-Screen-Resolution': screenResolution,
      'X-Event-Name': eventName,
      'X-Event-Timestamp': Date.now(),
      'X-Referrer': document.referrer || 'direct',
      ...eventData
    };
    
    return fetch('https://api.example.com/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        event: eventName,
        data: eventData,
        timestamp: Date.now()
      })
    });
  }
  
  return {
    trackEvent: trackEvent,
    sessionId: sessionId
  };
}

// 建立統計追蹤器
const analytics = createAnalyticsTracker();

// 追蹤頁面瀏覽
analytics.trackEvent('page_view', {
  'X-Page-URL': window.location.href,
  'X-Page-Title': document.title
});

// 追蹤按鈕點擊
analytics.trackEvent('button_click', {
  'X-Button-ID': 'search-button',
  'X-Button-Text': '搜尋'
});

console.log('追蹤器已建立，Session ID：', analytics.sessionId);
```

**動態標頭管理**
這個範例展示如何建立一個「動態標頭管理系統」，可以靈活設定、移除或取得 HTTP 請求的自訂標頭，並透過統一的 request 方法發送帶有這些標頭的 fetch 請求，方便管理 API 請求時的標頭資訊。

```js
function createHeaderManager() {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Client-Type': 'web',
    'X-Client-Version': '1.0.0'
  };
  
  const dynamicHeaders = {};
  
  // 設定動態標頭
  function setDynamicHeader(name, value) {
    dynamicHeaders[name] = value;
  }
  
  // 移除動態標頭
  function removeDynamicHeader(name) {
    delete dynamicHeaders[name];
  }
  
  // 取得所有標頭
  function getAllHeaders() {
    return { ...defaultHeaders, ...dynamicHeaders };
  }
  
  // 建立請求
  async function request(url, options = {}) {
    const headers = {
      ...getAllHeaders(),
      ...options.headers
    };
    
    return fetch(url, {
      ...options,
      headers
    });
  }
  
  return {
    setDynamicHeader: setDynamicHeader,
    removeDynamicHeader: removeDynamicHeader,
    getAllHeaders: getAllHeaders,
    request: request
  };
}

// 建立動態標頭管理器
const headerManager = createHeaderManager();

// 設定動態標頭
headerManager.setDynamicHeader('X-User-ID', 'user123');
headerManager.setDynamicHeader('X-Session-Token', 'token456');

// 發送請求
headerManager.request('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => console.log('資料：', data));

// 動態更新標頭
setTimeout(() => {
  headerManager.setDynamicHeader('X-User-ID', 'user789');
  console.log('標頭已更新');
  console.log('目前所有標頭：', headerManager.getAllHeaders());
}, 2000);
```

##### 包含 cookies 的請求
在實際開發中，若需要讓 API 請求自動攜帶使用者的登入狀態、購物車資訊等 cookies，必須正確設定 fetch 的 `credentials` 參數。這通常用於「已登入的使用者取得個人資料」或「查詢購物車內容」等情境。請注意，cookies 具有網域限制，僅會傳送給設定它的網域，跨網域請求時需特別留意。

**前端（瀏覽器）如何包含 cookies：**
1. 當設定 `credentials: 'include'` 時，瀏覽器會自動將該網域的 cookies 加入 HTTP 請求標頭
2. 格式：`Cookie: name1=value1; name2=value2; name3=value3`
3. 瀏覽器會根據網域、路徑、過期時間等規則決定要傳送哪些 cookies

**如何在 Network 面板中查看 cookies：**
1. 開啟瀏覽器開發者工具（F12）
2. 切換到 Network 標籤
3. 執行上述程式碼
4. 在 Network 面板中找到對應的請求
5. 點擊請求，查看 Request Headers 區塊
6. 尋找 `Cookie` 欄位，會看到發送的 cookies 內容

{% note warning %}
**為什麼看不到 Cookie 標頭？**
- **網域限制**：cookies 只能傳送給設定它的網域
- **跨域請求**：向 `jsonplaceholder.typicode.com` 發送請求時，瀏覽器不會傳送當前網域的 cookies
- **實際應用**：在真實應用中，cookies 通常由伺服器設定，用於同域請求
{% endnote %}

```js
document.cookie = 'sessionId=abc123; path=/';
document.cookie = 'userId=456; path=/';
document.cookie = 'cart=item1,item2; path=/';

console.log('目前瀏覽器的 cookies：', document.cookie);
console.log('注意：這些 cookies 只會傳送給當前網域');

fetch('/api/test', {  // 向當前網域發送請求
  credentials: 'include'
})
.then(response => {
  console.log('向當前網域發送請求，cookies 會被包含');
  console.log('在 Network 面板中會看到 Cookie 標頭');
  return response.text();
})
.catch(error => {
  console.log('這個請求會失敗（因為沒有 /api/test 端點），但可以看到 cookies 被發送');
  console.log('錯誤：', error.message);
});
```

{% note info %}
**後端（伺服器）如何提取 cookies：**
```js
// 伺服器端（Node.js/Express 範例）
app.get('/api/users', (req, res) => {
  // 從 HTTP 標頭中提取 cookies
  const cookies = req.headers.cookie;
  console.log('收到的 cookies：', cookies);
  
  // 解析 cookies
  const sessionId = req.cookies.sessionId;  // 使用 cookie-parser 中間件
  const userId = req.cookies.userId;
  const cart = req.cookies.cart;
  
  console.log('使用者 ID：', userId);
  console.log('購物車：', cart);
  
  // 根據 cookies 回傳對應的資料
  res.json({ message: '已收到您的 cookies' });
});
```

**實際流程：**
1. 瀏覽器發送請求時自動包含 cookies
2. 伺服器從 `Cookie` 標頭中讀取 cookies
3. 伺服器根據 cookies 內容決定回傳什麼資料
{% endnote %}

##### 瀏覽器快取機制與控制
在網頁開發中，瀏覽器會自動快取 HTTP 請求的結果以提升效能。然而，當需要確保取得最新資料時，我們需要了解快取機制並學會控制它。

**快取機制的基本原理**

瀏覽器快取是由**伺服器回應的 HTTP 標頭**和**瀏覽器的快取策略**共同決定的：

**伺服器控制快取的 HTTP 標頭：**
- **Cache-Control**：最重要的快取控制標頭
  - `max-age=3600`：快取 1 小時
  - `no-cache`：每次都要驗證
  - `no-store`：完全不快取
- **Expires**：指定快取過期時間
- **ETag**：資源版本標識，用於驗證快取是否有效
- **Last-Modified**：資源最後修改時間

**瀏覽器快取決策流程：**
1. 檢查快取是否存在
2. 檢查快取是否過期（根據伺服器標頭）
3. 發送條件請求（如果需要驗證）
4. 根據伺服器回應決定是否使用快取

{% note info %}
**伺服器端設定範例**
```js
// Node.js/Express 範例
app.get('/api/data', (req, res) => {
  // 設定快取 1 小時
  res.set('Cache-Control', 'max-age=3600');
  res.set('ETag', 'abc123');
  res.json({ data: 'some data' });
});

app.get('/api/important-data', (req, res) => {
  // 每次都要驗證
  res.set('Cache-Control', 'no-cache');
  res.json({ data: 'important data' });
});
```
{% endnote %}

**fetch 的 cache 選項**

fetch 的 `cache` 參數讓前端可以覆蓋伺服器的快取設定，主動控制資料取得方式：

| 選項          | 行為                   | 適用場景                   |
| ------------- | ---------------------- | -------------------------- |
| `default`     | 遵循伺服器快取標頭     | 一般資料，平衡效能與即時性 |
| `no-cache`    | 每次驗證快取有效性     | 重要資料，確保正確性       |
| `reload`      | 強制重新載入，忽略快取 | 即時資料（股價、通知）     |
| `force-cache` | 強制使用快取           | 靜態資源（圖片、CSS）      |

**實際操作範例**

```js
// 1. 強制重新載入（確保最新資料）
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  cache: 'reload'  // 忽略快取，直接向伺服器請求
})
.then(response => {
  console.log('強制重新載入：確保取得最新資料');
  return response.json();
})
.then(data => {
  console.log('最新資料：', data);
});

// 2. 使用預設快取策略
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  cache: 'default'  // 遵循伺服器設定
})
.then(response => {
  console.log('使用預設快取：可能使用快取資料');
  console.log('Response Headers:', response.headers);
  return response.json();
})
.then(data => {
  console.log('資料：', data);
});

// 3. 觀察快取行為
console.log('=== 在 Network 面板中觀察 ===');
console.log('第一次請求：Status 200 （從伺服器取得）');
console.log('第二次請求：Status 200 (from cache) 或 Status 304 (Not Modified)');
```

{% note warning %}
**重要觀念**
- **伺服器主導**：快取行為主要由伺服器的 HTTP 標頭決定
- **前端覆蓋**：fetch 的 cache 選項可以覆蓋伺服器設定
- **實際觀察**：在 Network 面板中可以看到快取的實際行為
- **開發建議**：使用 `reload` 確保取得最新資料
- **生產建議**：謹慎使用，避免不必要的請求
{% endnote %}

##### 可取消的請求（AbortController）

在實際應用中，使用者可能會在請求完成前切換頁面、取消操作或開始新的請求。如果不及時取消正在進行的請求，可能會造成資源浪費、資料競爭或錯誤的 UI 更新。`AbortController` 提供了一個優雅的解決方案來取消 fetch 請求。

**AbortController 的核心概念**

- **AbortController**：用於建立可以取消的請求
- **AbortSignal**：傳遞給 fetch 的信號，用於監聽取消事件
- **abort(\)**：觸發取消事件的方法

**常見應用場景**
- **搜尋功能**：使用者快速輸入時，取消之前的搜尋請求
- **頁面切換**：離開頁面時取消未完成的請求
- **檔案上傳**：使用者取消上傳時停止請求
- **競速請求**：只保留最後一個請求，取消之前的

{% note info %}
**為什麼需要取消請求？**
1. **效能優化**：避免不必要的網路流量和伺服器負載
2. **資料一致性**：防止舊請求的結果覆蓋新請求的結果
3. **使用者體驗**：避免頁面切換後仍顯示舊資料
4. **資源管理**：及時釋放網路連接和記憶體資源
{% endnote %}

**基本用法**

```js
// 1. 建立 AbortController
const controller = new AbortController();

// 2. 將 signal 傳給 fetch
fetch('https://jsonplaceholder.typicode.com/posts', {
  signal: controller.signal  // 綁定中止控制器
})
.then(response => response.json())
.then(data => {
  console.log('請求完成：', data);
})
.catch(error => {
  if (error.name === 'AbortError') {
    console.log('請求被取消');
  } else {
    console.error('請求失敗：', error);
  }
});

// 3. 取消請求
controller.abort();  // 觸發取消事件
```

**實際應用：可取消的搜尋功能**

```js
// 模擬搜尋功能
let searchController = null;

function startSearch(keyword) {
  // 如果之前有搜尋進行中，先取消它
  if (searchController) {
    searchController.abort();
    console.log('取消之前的搜尋請求');
  }
  
  // 建立新的中止控制器
  searchController = new AbortController();
  
  console.log(`開始搜尋：${keyword}`);
  
  fetch(`https://jsonplaceholder.typicode.com/posts?q=${keyword}`, {
    signal: searchController.signal
  })
  .then(response => response.json())
  .then(data => {
    console.log(`搜尋結果：找到 ${data.length} 筆資料`);
    // 更新 UI 顯示搜尋結果
    updateSearchResults(data);
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('搜尋被取消');
      // 不更新 UI，因為這是被取消的請求
    } else {
      console.error('搜尋失敗：', error);
      // 顯示錯誤訊息
      showErrorMessage(error.message);
    }
  });
}

// 模擬 UI 更新函數
function updateSearchResults(data) {
  console.log('更新搜尋結果到 UI');
}

function showErrorMessage(message) {
  console.log('顯示錯誤訊息：', message);
}

// 模擬使用者操作
console.log('=== 搜尋功能測試 ===');
startSearch('hello');  // 第一次搜尋
setTimeout(() => startSearch('world'), 1000);  // 1 秒後開始新搜尋，會取消第一次
```

**進階用法：超時控制**

```js
// 結合 AbortController 和 setTimeout 實現超時控制
function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  
  // 設定超時
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  return fetch(url, { signal: controller.signal })
    .then(response => {
      clearTimeout(timeoutId);  // 清除超時
      return response.json();
    })
    .catch(error => {
      clearTimeout(timeoutId);  // 清除超時
      if (error.name === 'AbortError') {
        throw new Error('請求超時');
      }
      throw error;
    });
}

// 使用範例
fetchWithTimeout('https://jsonplaceholder.typicode.com/posts', 3000)
  .then(data => console.log('成功取得資料：', data))
  .catch(error => console.error('錯誤：', error.message));
```

**多個請求的統一管理**

```js
// 管理多個可取消的請求
class RequestManager {
  constructor() {
    this.controllers = new Map();
  }
  
  // 開始請求
  startRequest(requestId, url) {
    // 取消之前的相同請求
    this.cancelRequest(requestId);
    
    const controller = new AbortController();
    this.controllers.set(requestId, controller);
    
    return fetch(url, { signal: controller.signal })
      .then(response => response.json())
      .finally(() => {
        // 請求完成後清理
        this.controllers.delete(requestId);
      });
  }
  
  // 取消特定請求
  cancelRequest(requestId) {
    const controller = this.controllers.get(requestId);
    if (controller) {
      controller.abort();
      this.controllers.delete(requestId);
      console.log(`請求 ${requestId} 已取消`);
    }
  }
  
  // 取消所有請求
  cancelAll() {
    this.controllers.forEach((controller, requestId) => {
      controller.abort();
      console.log(`請求 ${requestId} 已取消`);
    });
    this.controllers.clear();
  }
}

// 使用範例
const requestManager = new RequestManager();

// 開始多個請求
requestManager.startRequest('search', 'https://jsonplaceholder.typicode.com/posts')
  .then(data => console.log('搜尋完成：', data));

requestManager.startRequest('user', 'https://jsonplaceholder.typicode.com/users/1')
  .then(data => console.log('使用者資料：', data));

// 取消特定請求
setTimeout(() => {
  requestManager.cancelRequest('search');
}, 1000);

// 取消所有請求
setTimeout(() => {
  requestManager.cancelAll();
}, 2000);
```

{% note success %}
**跟著做：體驗可取消請求**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. **基本用法**：如何建立和取消請求
2. **搜尋功能**：快速輸入時自動取消舊請求
3. **超時控制**：結合 AbortController 實現請求超時
4. **統一管理**：管理多個可取消的請求

**實際應用場景**
- **搜尋框**：使用者輸入時取消之前的搜尋
- **檔案上傳**：提供取消上傳按鈕
- **頁面切換**：離開頁面時取消未完成的請求
- **競速請求**：只保留最後一個請求的結果
{% endnote %}

{% note warning %}
**注意事項**
- **錯誤處理**：被取消的請求會拋出 `AbortError`，需要特別處理
- **資源清理**：記得清理 timeout 和 controller 引用
- **瀏覽器支援**：AbortController 在現代瀏覽器中支援良好
- **替代方案**：舊版瀏覽器可能需要使用 XMLHttpRequest 的 abort() 方法
{% endnote %}

## RESTful API 設計原則

**REST**（Representational State Transfer）是一種 API 設計風格，讓 API 更容易理解和使用。它是由 Roy Fielding 在 2000 年提出的博士論文中的概念，後來成為現代 Web API 設計的重要參考標準。

**為什麼要學 RESTful API？**

在實際開發中，我們經常需要設計 API 來讓前端和後端溝通。RESTful API 提供了一套標準化的設計方式，讓我們的 API 更容易理解、維護和擴展。

{% note info %}
**RESTful API 的實際用途**
- **統一標準**：讓團隊成員都能快速理解 API 的用途
- **提高效率**：標準化的設計讓開發速度更快
- **易於維護**：一致的設計模式讓程式碼更容易維護
- **便於擴展**：良好的設計讓系統更容易擴展新功能
{% endnote %}

### 傳統方式：僅使用 GET 和 POST

在 RESTful API 出現之前，過去 Web 開發主要依賴兩種 HTTP 方法：**GET**（拿取資料）和 **POST**（寫入資料）。這種方式會產生一些不容易理解的問題：

- **語義不明確、操作難以理解**：無法直接 URL 反映操作意圖，例如 `/updateUser`、`/deleteUser`，看不出是對哪筆資源進行 CRUD（新增、查詢、修改、刪除）動作。
- **HTTP 方法誤用**：所有寫入、更新、刪除等操作都用 POST，導致程式碼可讀性與維護性降低。
- **URL 與端點設計混亂**：同一類型 user 資源的 CRUD 操作需定義多個不同端點，缺乏一致性且難以記憶。
- **資料結構與回應格式不統一**：每個 API 回傳的資料格式、欄位名稱都可能不同，前後端整合時需針對每個端點額外處理。
- **維護困難、成本高**：每個操作都需獨立維護端點與程式碼，當需求變動時需同時修改多個地方。

{% tabs 傳統方式 API 文件 %}
<!-- tab GET 取得使用者資料 -->
**Request**
- **URL**: `/getUser?id=1`
- **Method**: `GET`
- **Parameters**: 
  - `id` (number, required) - 使用者 ID

**Request Body**
```json
// 無請求內容
```

**Response**
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org"
}
```
<!-- endtab -->

<!-- tab POST 建立新使用者 -->
**Request**
- **URL**: `/createUser`
- **Method**: `POST`
- **Parameters**: 無

**Request Body**
```json
{
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org"
}
```

**Response**
```json
{
  "success": true,
  "message": "使用者資料已新增",
}
```
<!-- endtab -->

<!-- tab POST 更新使用者 -->
**Request**
- **URL**: `/updateUser`
- **Method**: `POST`
- **Parameters**: 無

**Request Body**
```json
{
  "id": 1,
  "name": "Leanne Graham （已更新）",
  "username": "Bret",
  "email": "Sincere.updated@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org"
}
```

**Response**
```json
{
  "success": true,
  "message": "使用者資料已更新",
}
```
<!-- endtab -->

<!-- tab POST 刪除使用者 -->
**Request**
- **URL**: `/deleteUser`
- **Method**: `POST`
- **Parameters**: 無

**Request Body**
```json
{
  "id": 1
}
```

**Response**
```json
{
  "success": true,
  "message": "使用者資料已刪除",
}
```
<!-- endtab -->
{% endtabs %}

### RESTful API 的核心概念
RESTful API（表述性狀態轉移）設計風格，會根據不同操作目的，選用合適的 HTTP 方法（如 GET、POST、PUT、PATCH、DELETE）來清楚表達對資源的操作語意。這樣設計的好處是：看到 URL 和 HTTP 方法，就知道這個 API 要做什麼。

| HTTP 方法  | 用途     | 實際例子                                       |
| ---------- | -------- | ---------------------------------------------- |
| **GET**    | 讀取資料 | `GET /users` - 取得所有使用者列表              |
| **GET**    | 讀取資料 | `GET /users/1` - 取得使用者 id 為 1 的資料     |
| **POST**   | 建立資料 | `POST /users` - 建立新使用者                   |
| **PUT**    | 完整更新 | `PUT /users/1` - 更新使用者 id 為 1 的所有資料 |
| **PATCH**  | 部分更新 | `PATCH /users/1` - 只更新使用者局部資料        |
| **DELETE** | 刪除資料 | `DELETE /users/1` - 刪除使用者 id 為 1 的資料  |

- **語義清晰度**：RESTful 方式從 URL 就能看出操作意圖
- **HTTP 方法使用**：RESTful 方式正確使用各種 HTTP 方法
- **資料格式**：RESTful 方式使用 JSON，傳統方式使用表單資料
- **一致性**：RESTful 方式有統一的設計模式
- **可維護性**：RESTful 方式更容易理解和維護

RESTful API 設計中，**資料結構的一致性**是確保 API 易於理解和使用的重要原則。這意味著同一個資源在不同操作中應該保持相同的資料結構，讓前後端開發者能夠預測 API 的行為。

**資料結構一致性的核心觀念：**

```js
// 定義使用者資源的完整資料結構
interface UserResource {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
```

此時對應的 CRUD 方式則具備相同的拿取與寫入。

{% tabs Restful 方式 API 文件 %}
<!-- tab GET 取得使用者列表 -->
**Request**
- **URL**: `/users`
- **Method**: `GET`
- **Parameters**: 無

**Request Body**
```json
// 無請求內容
```

**Response**
```json
[
  {
    "id": 1,
    "name": "張三",
    "email": "zhang@example.com",
    "phone": "0912345678",
    "address": "台北市",
    "avatar": "avatar.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "name": "王小明",
    "email": "xiaoming@example.com",
    "phone": "0912-345-678",
    "address": "台北市",
    "avatar": "avatar2.jpg",
    "createdAt": "2025-01-02T00:00:00Z",
    "updatedAt": "2025-01-02T00:00:00Z"
  }
]
```
<!-- endtab -->
<!-- tab GET 取得使用者資料 -->
**Request**
- **URL**: `/users/1`
- **Method**: `GET`
- **Parameters**: 
  - `id` (number, required) - 使用者 ID

**Request Body**
```json
// 無請求內容
```

**Response**
```json
{
  "id": 1,
  "name": "張三",
  "email": "zhang@example.com",
  "phone": "0912345678",
  "address": "台北市",
  "avatar": "avatar.jpg",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```
<!-- endtab -->

<!-- tab POST 建立新使用者 -->
**Request**
- **URL**: `/users`
- **Method**: `POST`
- **Parameters**: 無

**Request Body**
```json
{
  "name": "張三",
  "email": "zhang@example.com",
  "phone": "0912345678",
  "address": "台北市",
  "avatar": "avatar.jpg",
  // 不需要提供 id, createdAt, updatedAt（由伺服器產生）
}
```

**Response**
```json
{
  "success": true,
  "message": "使用者資料已新增",
}
```
<!-- endtab -->

<!-- tab PUT 更新使用者 -->
**Request**
- **URL**: `/users`
- **Method**: `PUT`
- **Parameters**: 無

**Request Body**
```json
{
  "id": 1,
  "name": "張三",
  "email": "zhang@example.com",
  "phone": "0912345678",
  "address": "台北市",
  "avatar": "avatar.jpg",
  // 需要提供完整的資源結構（除了伺服器管理的欄位）
}
```

**Response**
```json
{
  "success": true,
  "message": "使用者資料已更新",
}
```

<!-- tab PATCH 局部更新使用者 -->
**Request**
- **URL**: `/users/1`
- **Method**: `PATCH`
- **Parameters**: 無

**Request Body**
```json
{
  "email": "zhang@example.com",
  "phone": "0912345678",
  // 其他欄位保持原值，不需要提供
}
```

**Response**
```json
{
  "success": true,
  "message": "使用者資料已更新",
}
```
<!-- endtab -->

<!-- tab DELETE 刪除使用者 -->
**Request**
- **URL**: `/users`
- **Method**: `DELETE`
- **Parameters**: 無

**Request Body**
```json
// 無請求內容
```

**Response**
```json
{
  "success": true,
  "message": "使用者資料已刪除",
}
```
<!-- endtab -->
{% endtabs %}

{% note info %}
**重要觀念**
- **GET** 回傳的資料結構 = **POST** 建立時需要的資料結構 = **PUT** 更新時需要的完整資料結構
- **PATCH** 只需要提供要更新的欄位，不需要完整結構
- **伺服器管理的欄位**（如 id、createdAt、updatedAt）通常不需要在請求中提供
- **資料結構一致性**讓 API 更容易理解和使用
{% endnote %}

### 以路徑區分資料類型與子分類
在設計 API 時，常透過不同的 URL 路徑來區分各種資料類型，並根據需求進行 CRUD（建立、讀取、更新、刪除）操作。例如 `/users` 代表使用者資料，`/posts` 代表文章資料。每個主要路徑下還可以細分子資源，例如 `/users/1/posts` 代表特定使用者的文章。這種結構有助於讓資料分類更清晰，並方便管理與擴充。

```js
// 以 RESTful API 路徑設計區分不同資料類型與子分類

// 使用者資料（Users）相關 API
GET    /users                // 取得所有使用者
GET    /users/:userId        // 取得特定使用者
POST   /users                // 新增使用者
PUT    /users/:userId        // 完整更新特定使用者
PATCH  /users/:userId        // 局部更新特定使用者
DELETE /users/:userId        // 刪除特定使用者

// 文章資料（Posts）相關 API
GET    /posts                // 取得所有文章
GET    /posts/:postId        // 取得特定文章
POST   /posts                // 新增文章
PUT    /posts/:postId        // 完整更新特定文章
PATCH  /posts/:postId        // 局部更新特定文章
DELETE /posts/:postId        // 刪除特定文章

// 子資源範例：取得特定使用者的所有文章
GET    /users/:userId/posts  // 取得指定使用者的所有文章

// 購物車資料（Cart）相關 API
GET    /cart                 // 取得目前購物車內容
POST   /cart/items           // 新增商品到購物車
PUT    /cart/items/:itemId   // 更新購物車中指定商品數量
DELETE /cart/items/:itemId   // 從購物車移除指定商品
```

### 實作 RESTful API 客戶端
以下範例使用 **JSONPlaceholder** 這個免費的假資料 API 服務，展示如何實作符合 RESTful 設計原則的 API 客戶端。

{% note primary %}
**JSONPlaceholder 練習環境**
- **網址**：`https://jsonplaceholder.typicode.com`
- **用途**：提供假資料來練習 API 串接
- **資源**：users、posts、comments、todos 等
- **特色**：支援 GET、POST、PUT、PATCH、DELETE 等 HTTP 方法
- **免費**：不需要註冊或 API Key
{% endnote %}

```js restful-api-client.js
// 建立 RESTful API 工具
function createUserAPI(baseURL = 'https://jsonplaceholder.typicode.com') {
  // 統一的錯誤處理函數
  //---------------------------------------------------
  function handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }
  
  // GET /users - 取得所有使用者資料
  //---------------------------------------------------
  async function getAllUsers() {
    const response = await fetch(`${baseURL}/users`);
    return handleResponse(response);
  }
  
  // GET /users/{id} - 取得特定 ID 的使用者資料
  //---------------------------------------------------
  async function getUser(id) {
    const response = await fetch(`${baseURL}/users/${id}`);
    return handleResponse(response);
  }
  
  // POST /users - 建立新使用者資料
  //---------------------------------------------------
  async function postUser(userData) {
    const response = await fetch(`${baseURL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  }
  
  // PUT /users/{id} - 完整更新使用者資料（需要提供完整資料結構）
  //---------------------------------------------------
  async function putUser(id, userData) {
    const response = await fetch(`${baseURL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  }
  
  // PATCH /users/{id} - 部分更新使用者資料（只需要更新的欄位）
  //---------------------------------------------------
  async function patchUser(id, userData) {
    const response = await fetch(`${baseURL}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  }
  
  // DELETE /users/{id} - 刪除特定 ID 的使用者資料
  //---------------------------------------------------
  async function deleteUser(id) {
    const response = await fetch(`${baseURL}/users/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  }
  
  // 回傳 API 物件
  return {
    getAllUsers,
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser,
  };
}

const userAPI = createUserAPI();
async function demonstrateCRUD(mode, userData = null) {
  // 如果需要使用者資料但沒有提供，則自動取得
  if (!userData && (mode === 'put' || mode === 'patch')) {
    userData = await userAPI.getUser(1);
  }

  try {
    switch (mode) {
      case 'getAll':
        // 讀取（Read）- 取得所有使用者資料
        //---------------------------------------------------
    const users = await userAPI.getAllUsers();
        console.log(`📋 找到 ${users.length} 個使用者`);
        break;
      case 'get':
        // 讀取（Read）- 取得特定使用者資料（ID 為 1）
        //---------------------------------------------------
    const user = await userAPI.getUser(1);
        console.log('👤 使用者資料：', user);
        break;
      case 'post':
        // 建立（Create）- 建立新使用者資料
        //---------------------------------------------------
    const newUser = {
          name: '李小明',
          email: 'li@example.com',
          username: 'liming',
        };
        const createdUser = await userAPI.postUser(newUser);
        console.log('✅ 新建立的使用者：', createdUser);
        break;
      case 'put':
        // 更新（Update）- 完整更新使用者資料
        //---------------------------------------------------
    const updatedData = {
          id: 1,
          name: '張三（完整更新）',
          username: userData.username,
          email: 'zhang.complete@example.com',
          address: userData.address,
          phone: userData.phone,
          website: userData.website,
          company: userData.company,
        };
        const updatedUser = await userAPI.putUser(1, updatedData);
        console.log('✅ 完整更新後：', updatedUser);
        break;
      case 'patch':
        // 部分更新（Patch）- 只更新特定欄位
        //---------------------------------------------------
    const patchData = {
          email: 'zhang.partial@example.com', // 只更新信箱
    };
    const patchedUser = await userAPI.patchUser(1, patchData);
        console.log('✅ 部分更新後：', patchedUser);
        break;
      case 'delete':
        // 刪除（Delete）- 刪除使用者資料
        //---------------------------------------------------
    await userAPI.deleteUser(1);
        console.log('🗑️ 使用者已刪除');
        break;
    }
  } catch (error) {
    console.error('❌ 操作失敗：', error.message);
  }
}

// 執行範例
demonstrateCRUD('getAll');
demonstrateCRUD('get');
demonstrateCRUD('post');
demonstrateCRUD('put');
demonstrateCRUD('patch');
demonstrateCRUD('delete');
```

{% note success %}
**跟著做：體驗 RESTful API**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
- **完整的 CRUD 操作**：讀取、建立、更新、刪除
- **HTTP 方法的語義**：每個方法都有明確的用途
- **統一的錯誤處理**：一致的錯誤處理方式
- **資料結構一致性**：API 回傳的資料結構保持一致
{% endnote %}


# Client 端儲存

在網頁開發中，我們經常需要在前端儲存一些資料，例如使用者的偏好設定、購物車內容、登入狀態等。瀏覽器提供了多種儲存機制，每種都有其特定的用途和限制。了解這些儲存方式的差異，能幫助我們選擇最適合的解決方案。

{% note info %}
**為什麼需要 Client 端儲存？**
- **提升使用者體驗**：記住使用者的偏好設定，避免重複輸入
- **減少伺服器負載**：將一些資料暫存在前端，減少不必要的網路請求
- **離線功能**：在沒有網路連線時仍能提供基本功能
- **狀態管理**：管理應用程式的狀態，如購物車、表單資料等
{% endnote %}

## 瀏覽器儲存機制概覽

瀏覽器提供了三種主要的儲存機制，每種都有不同的特性和適用場景：

| 儲存方式           | 容量限制 | 生命週期             | 自動傳送       | 主要用途             |
| ------------------ | -------- | -------------------- | -------------- | -------------------- |
| **Cookie**         | ~4KB     | 可設定過期時間       | 是（每次請求） | 會話識別、認證       |
| **localStorage**   | 5-10MB   | 永久（除非手動刪除） | 否             | 使用者偏好、應用設定 |
| **sessionStorage** | 5-10MB   | 分頁關閉即消失       | 否             | 暫存資料、表單狀態   |

{% mermaid graph TD %}
    A["瀏覽器儲存機制"] --> B["Cookie"]
    A --> C["Web Storage"]
    C --> D["localStorage"]
    C --> E["sessionStorage"]
    
    B --> F["會話識別<br/>認證資訊"]
    D --> G["使用者偏好<br/>應用設定"]
    E --> H["暫存資料<br/>表單狀態"]
    
    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#e8f5e8
    style D fill:#f3e5f5
    style E fill:#f3e5f5
{% endmermaid %}

## Cookie：最古老的儲存機制

Cookie 是最早的瀏覽器儲存機制，主要用於會話識別和認證。它的特點是會自動隨每個 HTTP 請求傳送到伺服器，這讓它特別適合儲存認證資訊。

### Cookie 的基本概念

**Cookie 是什麼？**
Cookie 是伺服器發送給瀏覽器的小型文字檔案，瀏覽器會將它儲存起來，並在每次向該伺服器發送請求時自動附帶。

**Cookie 的組成結構：**
```
name=value; expires=date; path=/; domain=example.com; secure; httponly
```

- **name=value**：Cookie 的名稱和值
- **expires**：過期時間
- **path**：Cookie 的作用路徑
- **domain**：Cookie 的作用網域
- **secure**：僅在 HTTPS 連線時傳送
- **httponly**：防止 JavaScript 存取（提高安全性）

### Cookie 的基本操作

```js cookie-basics.js
// 1. 設定 Cookie（簡單版本）
function setSimpleCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

// 2. 取得 Cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

// 3. 刪除 Cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// 使用範例
setSimpleCookie('theme', 'dark', 30);  // 設定主題偏好，30天後過期
console.log('目前主題：', getCookie('theme'));  // 讀取主題設定
deleteCookie('theme');  // 刪除主題設定
```

{% note success %}
**跟著做：體驗 Cookie 操作**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. **設定 Cookie**：`setSimpleCookie('theme', 'dark', 30)`
2. **讀取 Cookie**：`getCookie('theme')` 會回傳 'dark'
3. **刪除 Cookie**：`deleteCookie('theme')` 後再讀取會回傳 null

**在開發者工具中查看 Cookie**
1. 按 F12 開啟開發者工具
2. 切換到 Application（應用程式）標籤
3. 在左側找到 Cookies
4. 選擇你的網域，就能看到設定的 Cookie
{% endnote %}

### Cookie 的進階用法

```js cookie-advanced.js
// 進階 Cookie 設定函數
function setCookie(name, value, options = {}) {
  const {
    days = 7,
    path = '/',
    domain = '',
    secure = false,
    sameSite = 'Lax'
  } = options;
  
  // 計算過期時間
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  // 建立 Cookie 字串
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  cookieString += `; expires=${expires.toUTCString()}`;
  cookieString += `; path=${path}`;
  
  if (domain) {
    cookieString += `; domain=${domain}`;
  }
  
  if (secure) {
    cookieString += '; Secure';
  }
  
  cookieString += `; SameSite=${sameSite}`;
  
  document.cookie = cookieString;
}

// 使用範例
// 基本設定
setCookie('user_preference', 'dark_mode');

// 進階設定
setCookie('session_id', 'abc123', {
  days: 1,           // 1天後過期
  path: '/admin',    // 只在 /admin 路徑下有效
  secure: true,      // 僅在 HTTPS 下傳送
  sameSite: 'Strict' // 防止 CSRF 攻擊
});

// 讀取所有 Cookie
function getAllCookies() {
  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  });
  return cookies;
}

console.log('所有 Cookie：', getAllCookies());
```

{% note warning %}
**Cookie 的安全注意事項**
- **容量限制**：每個 Cookie 約 4KB，總容量有限
- **自動傳送**：每次請求都會自動傳送，可能造成不必要的網路流量
- **安全性**：敏感資訊不應存在 Cookie 中，容易被 XSS 攻擊竊取
- **HttpOnly**：重要的認證 Cookie 應由伺服器設定 HttpOnly 屬性
{% endnote %}

## Web Storage：現代瀏覽器儲存方案

Web Storage 是 HTML5 引入的現代儲存機制，包含 `localStorage` 和 `sessionStorage`。相比 Cookie，Web Storage 提供了更大的儲存空間和更簡潔的 API。


{% note info %}
**選擇儲存方式的建議**
- **使用 localStorage**：使用者偏好、應用設定、需要長期保存的資料
- **使用 sessionStorage**：表單狀態、購物車、暫存資料、分頁專用資料
- **使用 Cookie**：認證資訊、會話識別、需要自動傳送到伺服器的資料
{% endnote %}


### localStorage：持久化儲存

`localStorage` 用於儲存需要長期保存的資料，即使關閉瀏覽器分頁或重新啟動瀏覽器，資料仍然存在。

```js localStorage-basics.js
// localStorage 基本操作
// ----------------------------------------------------------------

// 1. 儲存資料
localStorage.setItem('username', '張三');
localStorage.setItem('theme', 'dark');
localStorage.setItem('user_preferences', JSON.stringify({
  language: 'zh-TW',
  notifications: true,
  autoSave: false
}));

// 2. 讀取資料
const username = localStorage.getItem('username');
const theme = localStorage.getItem('theme');
const preferences = JSON.parse(localStorage.getItem('user_preferences') || '{}');

console.log('使用者名稱：', username);
console.log('主題設定：', theme);
console.log('使用者偏好：', preferences);

// 3. 檢查資料是否存在
if (localStorage.getItem('username')) {
  console.log('使用者已登入');
} else {
  console.log('使用者未登入');
}

// 4. 刪除特定資料
localStorage.removeItem('theme');

// 5. 清空所有資料
// localStorage.clear();  // 小心使用！

// 6. 取得所有資料
function getAllLocalStorage() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value;
    }
  }
  return data;
}

console.log('所有 localStorage 資料：', getAllLocalStorage());
```

{% note success %}
**跟著做：體驗 localStorage**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. **資料儲存**：使用 `setItem()` 儲存各種類型的資料
2. **資料讀取**：使用 `getItem()` 讀取資料
3. **JSON 處理**：複雜物件需要 `JSON.stringify()` 和 `JSON.parse()`
4. **資料檢查**：檢查特定資料是否存在
5. **資料管理**：刪除和清空資料

**在開發者工具中查看 localStorage**
1. 按 F12 開啟開發者工具
2. 切換到 Application（應用程式）標籤
3. 在左側找到 Local Storage
4. 選擇你的網域，就能看到儲存的資料
{% endnote %}

### sessionStorage：分頁級別儲存

`sessionStorage` 的資料只在當前分頁有效，關閉分頁後資料就會消失。這讓它特別適合儲存暫存資料，如表單狀態、購物車內容等。

```js sessionStorage-basics.js
// sessionStorage 基本操作
// ----------------------------------------------------------------

// 1. 儲存分頁專用的資料
sessionStorage.setItem('current_step', '2');
sessionStorage.setItem('form_data', JSON.stringify({
  name: '李小明',
  email: 'li@example.com',
  phone: '0912345678'
}));

// 2. 讀取分頁資料
const currentStep = sessionStorage.getItem('current_step');
const formData = JSON.parse(sessionStorage.getItem('form_data') || '{}');

console.log('目前步驟：', currentStep);
console.log('表單資料：', formData);

// 3. 模擬多步驟表單
function saveFormStep(step, data) {
  sessionStorage.setItem('current_step', step.toString());
  sessionStorage.setItem('form_data', JSON.stringify(data));
  console.log(`步驟 ${step} 已儲存`);
}

function loadFormStep() {
  const step = sessionStorage.getItem('current_step') || '1';
  const data = JSON.parse(sessionStorage.getItem('form_data') || '{}');
  return { step: parseInt(step), data };
}

// 使用範例
saveFormStep(1, { name: '張三' });
saveFormStep(2, { name: '張三', email: 'zhang@example.com' });
saveFormStep(3, { name: '張三', email: 'zhang@example.com', phone: '0912345678' });

const { step, data } = loadFormStep();
console.log(`載入步驟 ${step}，資料：`, data);

// 4. 購物車範例
function addToCart(product) {
  const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  console.log('商品已加入購物車');
}

function getCart() {
  return JSON.parse(sessionStorage.getItem('cart') || '[]');
}

function clearCart() {
  sessionStorage.removeItem('cart');
  console.log('購物車已清空');
}

// 購物車操作
addToCart({ id: 1, name: 'iPhone', price: 30000 });
addToCart({ id: 2, name: 'MacBook', price: 50000 });
console.log('購物車內容：', getCart());
```


### 實際應用範例

#### 主題切換功能

```js theme-switcher.js
// 主題切換功能實作
// ----------------------------------------------------------------

class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.applyTheme();
  }
  
  // 切換主題
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
    console.log(`主題已切換為：${this.currentTheme}`);
  }
  
  // 設定主題
  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
    console.log(`主題已設定為：${this.currentTheme}`);
  }
  
  // 套用主題到頁面
  applyTheme() {
    document.body.className = `theme-${this.currentTheme}`;
    // 這裡可以加入更多主題相關的 CSS 類別
  }
  
  // 取得目前主題
  getCurrentTheme() {
    return this.currentTheme;
  }
}

// 使用範例
const themeManager = new ThemeManager();

// 切換主題
// themeManager.toggleTheme();

// 設定特定主題
// themeManager.setTheme('dark');

console.log('目前主題：', themeManager.getCurrentTheme());
```

#### 購物車功能

```js shopping-cart.js
// 購物車功能實作
// ----------------------------------------------------------------

class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
  }
  
  // 載入購物車資料
  loadCart() {
    const cartData = sessionStorage.getItem('shopping_cart');
    return cartData ? JSON.parse(cartData) : [];
  }
  
  // 儲存購物車資料
  saveCart() {
    sessionStorage.setItem('shopping_cart', JSON.stringify(this.items));
  }
  
  // 加入商品
  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    
    this.saveCart();
    console.log(`商品「${product.name}」已加入購物車`);
  }
  
  // 移除商品
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    console.log('商品已從購物車移除');
  }
  
  // 更新商品數量
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
      }
    }
  }
  
  // 取得購物車內容
  getItems() {
    return this.items;
  }
  
  // 計算總價
  getTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  
  // 清空購物車
  clear() {
    this.items = [];
    this.saveCart();
    console.log('購物車已清空');
  }
  
  // 取得商品數量
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
}

// 使用範例
const cart = new ShoppingCart();

// 加入商品
cart.addItem({ id: 1, name: 'iPhone 15', price: 35000 });
cart.addItem({ id: 2, name: 'AirPods Pro', price: 8000 });
cart.addItem({ id: 1, name: 'iPhone 15', price: 35000 }); // 數量會變成 2

console.log('購物車內容：', cart.getItems());
console.log('商品總數：', cart.getItemCount());
console.log('總價：', cart.getTotal());

// 更新數量
cart.updateQuantity(1, 3);
console.log('更新後總價：', cart.getTotal());
```

### 認證機制：Session vs Token

在網頁應用中，認證是確保使用者身份的重要機制。主要有兩種方式：Session 和 Token。

#### Session 認證機制

Session 認證是傳統的認證方式，伺服器會保存使用者的會話狀態。

```js session-auth.js
// Session 認證範例（前端部分）
// ----------------------------------------------------------------

// 模擬登入功能
async function login(username, password) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include' // 重要：包含 cookies
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('登入成功');
      
      // 儲存使用者資訊到 localStorage
      localStorage.setItem('user_info', JSON.stringify({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email
      }));
      
      return data;
    } else {
      throw new Error('登入失敗');
    }
  } catch (error) {
    console.error('登入錯誤：', error.message);
    throw error;
  }
}

// 檢查登入狀態
function checkLoginStatus() {
  const userInfo = localStorage.getItem('user_info');
  return userInfo ? JSON.parse(userInfo) : null;
}

// 登出功能
async function logout() {
  try {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
    
    // 清除前端儲存的資料
    localStorage.removeItem('user_info');
    console.log('登出成功');
  } catch (error) {
    console.error('登出錯誤：', error.message);
  }
}

// 使用範例
const currentUser = checkLoginStatus();
if (currentUser) {
  console.log('目前登入使用者：', currentUser.username);
} else {
  console.log('使用者未登入');
}
```

#### Token 認證機制

Token 認證是現代的認證方式，伺服器簽發包含使用者資訊的 token。

```js token-auth.js
// Token 認證範例（前端部分）
// ----------------------------------------------------------------

// 模擬登入功能
async function loginWithToken(username, password) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('登入成功');
      
      // 儲存 token 到 localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_info', JSON.stringify(data.user));
      
      return data;
    } else {
      throw new Error('登入失敗');
    }
  } catch (error) {
    console.error('登入錯誤：', error.message);
    throw error;
  }
}

// 取得認證標頭
function getAuthHeaders() {
  const token = localStorage.getItem('auth_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// 發送認證請求
async function authenticatedRequest(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers
  };
  
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  if (response.status === 401) {
    // Token 過期或無效
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    throw new Error('認證失敗，請重新登入');
  }
  
  return response;
}

// 登出功能
function logoutWithToken() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_info');
  console.log('登出成功');
}

// 使用範例
async function getUserProfile() {
  try {
    const response = await authenticatedRequest('/api/profile');
    const profile = await response.json();
    console.log('使用者資料：', profile);
    return profile;
  } catch (error) {
    console.error('取得資料失敗：', error.message);
  }
}
```

#### Session vs Token 對比

{% note info %}
**認證機制概述**
- **Session 認證**：傳統方式，伺服器保存會話狀態
- **Token 認證**：現代方式，伺服器簽發自包含 token
{% endnote %}

##### 特性對比表

| 特性／認證方式 | Session 認證                                                           | Token 認證                                                           |
| -------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **狀態管理**   | 有狀態（伺服器儲存）                                                   | 無狀態（伺服器不儲存）                                               |
| **安全性**     | 高（敏感資訊在伺服器）<br>• 安全性高                                   | 中等（Token 可能被竊取）<br>• 前端需妥善保存                         |
| **撤銷能力**   | 即時撤銷<br>• 可以即時撤銷（登出時清除伺服器端 session）               | 難以即時撤銷<br>• 撤銷困難                                           |
| **擴展性**     | 較差（需要 session 共享）<br>• 擴展困難                                | 良好（適合分散式系統）<br>• 分散式友好                               |
| **資料庫查詢** | 每次請求都查詢<br>• 每次查詢資料庫                                     | 可減少查詢<br>• 減少資料庫查詢                                       |
| **跨域支援**   | 有限                                                                   | 良好（支援多種客戶端和跨域請求）                                     |
| **記憶體使用** | 較高（伺服器需儲存 session）<br>• 記憶體使用量大                       | 較低                                                                 |
| **網路傳輸**   | 較小（僅 session ID）                                                  | 較大（完整 Token）<br>• Token 大小較大                               |
| **優點**       | • 即時撤銷<br>• 完全控制<br>• 安全性高<br>• 適合即時控制               | • 無狀態<br>• 分散式友好<br>• 減少資料庫查詢<br>• 跨域支援           |
| **缺點**       | • 需要伺服器儲存<br>• 擴展困難<br>• 每次查詢資料庫<br>• 記憶體使用量大 | • 撤銷困難<br>• Token 大小較大<br>• 前端需妥善保存<br>• 過期時間固定 |

##### 認證流程對比

| 步驟        | Session 認證流程                       | Token 認證流程                        |
| ----------- | -------------------------------------- | ------------------------------------- |
| **1. 登入** | 使用者登入 → 伺服器建立 session        | 使用者登入 → 伺服器簽發 JWT Token     |
| **2. 回傳** | 伺服器回傳 session ID → 儲存在 Cookie  | 伺服器回傳 Token → 前端儲存           |
| **3. 請求** | 後續請求 → 瀏覽器自動帶上 session ID   | 後續請求 → 前端在 Header 中帶上 Token |
| **4. 驗證** | 伺服器驗證 session ID → 確認使用者身份 | 伺服器驗證 Token → 確認使用者身份     |

##### 選擇建議

{% note success %}
**何時選擇 Session 認證？**
- 需要即時控制使用者狀態
- 安全性要求高的應用
- 單一伺服器架構
- 需要即時撤銷功能
{% endnote %}

{% note success %}
**何時選擇 Token 認證？**
- 分散式系統或微服務架構
- 需要跨域支援
- API 服務或第三方整合
- 需要減少伺服器負載
{% endnote %}


{% note warning %}
**安全注意事項**
- **敏感資訊**：不要在前端儲存密碼、信用卡號等敏感資訊
- **Token 安全**：JWT Token 應設定適當的過期時間
- **XSS 防護**：避免將敏感資訊存在 localStorage（容易被 XSS 攻擊竊取）
- **CSRF 防護**：使用 SameSite Cookie 或 CSRF Token 防止跨站請求偽造
- **HTTPS**：在生產環境中務必使用 HTTPS 保護資料傳輸
{% endnote %}

### 常見錯誤處理模式

在實際開發中，我們需要妥善處理儲存相關的錯誤，確保應用程式的穩定性。

```js storage-error-handling.js
// 儲存錯誤處理模式
// ----------------------------------------------------------------

// 1. 安全的儲存函數
function safeSetItem(key, value) {
  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error('儲存失敗：', error.message);
    
    // 嘗試清理空間
    if (error.name === 'QuotaExceededError') {
      console.log('儲存空間不足，嘗試清理舊資料...');
      cleanupOldData();
      
      // 再次嘗試儲存
      try {
        localStorage.setItem(key, serializedValue);
        return true;
      } catch (retryError) {
        console.error('清理後仍無法儲存：', retryError.message);
        return false;
      }
    }
    
    return false;
  }
}

// 2. 安全的讀取函數
function safeGetItem(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      return defaultValue;
    }
    
    // 嘗試解析 JSON
    try {
      return JSON.parse(value);
    } catch {
      // 如果不是 JSON，直接回傳字串
      return value;
    }
  } catch (error) {
    console.error('讀取失敗：', error.message);
    return defaultValue;
  }
}

// 3. 清理舊資料
function cleanupOldData() {
  const keysToKeep = ['user_preferences', 'auth_token']; // 重要資料
  const allKeys = Object.keys(localStorage);
  
  // 刪除不重要的舊資料
  allKeys.forEach(key => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('舊資料清理完成');
}

// 4. 儲存空間檢查
function checkStorageSpace() {
  try {
    const testKey = '__storage_test__';
    const testValue = 'x'.repeat(1024 * 1024); // 1MB 測試資料
    
    localStorage.setItem(testKey, testValue);
    localStorage.removeItem(testKey);
    
    console.log('儲存空間充足');
    return true;
  } catch (error) {
    console.warn('儲存空間不足：', error.message);
    return false;
  }
}

// 5. 使用範例
const userData = {
  id: 123,
  name: '張三',
  preferences: {
    theme: 'dark',
    language: 'zh-TW'
  }
};

// 安全儲存
if (safeSetItem('user_data', userData)) {
  console.log('使用者資料儲存成功');
} else {
  console.log('使用者資料儲存失敗');
}

// 安全讀取
const savedUserData = safeGetItem('user_data', {});
console.log('讀取的使用者資料：', savedUserData);

// 檢查儲存空間
checkStorageSpace();
```

{% note success %}
**跟著做：體驗錯誤處理**
將上述程式碼複製到瀏覽器開發者工具的 Console 中執行，你會看到：
1. **安全儲存**：使用 `safeSetItem()` 避免儲存錯誤
2. **安全讀取**：使用 `safeGetItem()` 避免讀取錯誤
3. **空間檢查**：使用 `checkStorageSpace()` 檢查可用空間
4. **自動清理**：當空間不足時自動清理舊資料

**實際應用建議**
- 總是使用安全的儲存函數
- 定期檢查儲存空間
- 實作資料清理機制
- 提供適當的錯誤訊息給使用者
{% endnote %}

# 延伸閱讀
- MDN：`Promise`、`async/await`、`fetch`、`AbortController`
- You-Dont-Need-jQuery：現代瀏覽器 API
- OWASP：前端安全與 Token 儲存建議
