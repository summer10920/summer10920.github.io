---
title: "結業專案：洛奇旅行（二）功能化"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
date: 2026-08-30 10:12:00
---

![](assets/images/banner/react.png)

切版做完之後，這一章把同一份洛奇旅行的行程與報名接到雲端。前台用 Google 登入報名，並查詢自己的訂單。後台使用 Firebase Authentication 的 email 與密碼。資料放在 Cloud Firestore。下面的路徑寫 `07-project-final`。人還在自己的 `06-project-init` 裡時，資料夾名稱換成那一份，檔案相對位置相同。

<!-- more -->

# 從切版繼續

這一章沿用第 12 篇結束時的畫面、路由與色票。先選定一份專案並啟動，再看清楚哪些讀寫仍停在這次開啟的記憶體裡。後面才一次換一層。

## 複製並啟動

兩種起點改的是同一套檔案。已經裝過 Node.js 24 與 pnpm 的人直接做下面兩步。剛重灌的電腦先照 {% post_link lokiTech-15day-04-tailwind %} 把 Node 24 與 pnpm 裝好。

### 步驟 1：選定專案

跟著 {% post_link lokiTech-15day-12-project-travel %} 做完的人，`06-project-init` 已經與 `05-project-prototype` 相同。留在那個資料夾，跳到下一步。

還沒做完、或想直接拿切版完成品的人，在 `studiesAdvanced` 倉庫根目錄把 `05-project-prototype` 複製成 `07-project-final`。目的資料夾還不存在時才複製。`05-project-prototype` 留著對切版，後面的修改寫在複本。

macOS（終端機在倉庫根目錄）：

```bash
cp -R 05-project-prototype 07-project-final
```

Windows（PowerShell，同樣在倉庫根目錄）：

```powershell
Copy-Item -Recurse 05-project-prototype 07-project-final
```

{% note info %}
**資料夾已經在**
目的資料夾已經存在時跳過複製，直接做下一步。macOS 的 `cp -R` 會把來源嵌進既有資料夾。已做完第 12 篇的人直接用 `06-project-init`。
{% endnote %}

### 步驟 2：安裝並啟動

`node_modules` 與 `dist` 是這一台電腦裝出來、建出來的結果。複製之後先刪掉，再安裝，然後啟動。人已經在自己的 `06-project-init` 裡、依賴也裝過時，直接執行 `pnpm dev`。

macOS（以複本為例；沿用第 12 篇的人把路徑換成 `06-project-init`）：

```bash
rm -rf 07-project-final/node_modules 07-project-final/dist
cd 07-project-final
pnpm install
pnpm dev
```

Windows（PowerShell）：

```powershell
Remove-Item -Recurse -Force 07-project-final\node_modules, 07-project-final\dist -ErrorAction SilentlyContinue
cd 07-project-final
pnpm install
pnpm dev
```

終端機會印出本機網址。瀏覽器打開之後，畫面應與切版完成品相同。

**解析**

- `05-project-prototype` 與做完第 12 篇的 `06-project-init` 是同一份切版，差別只在資料夾從哪裡來。
- `pnpm install` 依 `package.json` 與鎖定檔裝依賴。`pnpm dev` 啟動 Vite 開發伺服器。
- 色票、路由表與契約 id（`site-header`、`nav-toggle`、`tour-list`、`booking-form`）維持不變，後面的功能加在這些頁面之上。

## 記憶體狀態與本章範圍

切版裡的登入、報名與後台儲存只改這次開啟的記憶體。重新整理之後，畫面回到各功能 `mock.data.js` 的種子。這一章要換掉的是這一層讀寫。版面、色票與路由留在第 12 篇的結果。

{% mermaid graph LR %}
  seed["features/tours/mock.data.js"] --> store["StoreProvider"]
  store --> pages["頁面"]
{% endmermaid %}

前台用 Google 登入。報名寫進訂單，文件帶上 `uid`。我的報名只查這個 `uid`。後台用 email 與密碼登入。行程改從雲端讀。後台的新增與編輯行程這一章拿掉，清單只讀雲端上已經寫入的行程。剩餘名額要掃過所有訂單才算得出來，旅客不能讀別人的訂單，所以前台改顯示每團名額。

這一章結束時，頁面呼叫同一組服務函式。服務函式再呼叫 Firestore。同一套 `AuthProvider` 用 `onAuthStateChanged` 服務前台與後台。後台畫面在確認登入方式是密碼之後才渲染訂單。

{% mermaid graph LR %}
  page["頁面"] --> api["api.js"]
  api --> fs["Cloud Firestore"]
  google["前台 Google"] --> authn["Authentication"]
  admin["後台 email／密碼"] --> authn
  authn --> gate["畫面閘門"]
  gate --> api
{% endmermaid %}

**解析**

- 切版的登入對話框沒有接 Authentication。這一章前台改為 `signInWithPopup`，後台改為 `signInWithEmailAndPassword`。
- 行程文件用原本的 id，例如 `hualien-taroko`，詳情網址不用改。
- 訂單由 Firestore 編號。集合名稱是 `orders`。每筆帶登入者的 `uid`。
- 色票與十二條既有路由維持不變。多出來的只有種子頁 `/seed`。

# 認識 Firebase

Firebase 是 Google 提供的後端服務，專案在瀏覽器裡用它的 JavaScript SDK 呼叫。這一章只用其中兩項：Cloud Firestore 存文件，Authentication 同時用於前台 Google 登入與後台 email／密碼。先知道這兩項各自負責什麼，再建立專案、把設定交給 Vite。

## Firestore 與 Authentication

Firestore 是文件資料庫。資料分成集合與文件。集合是一疊文件，文件是一筆欄位。欄位可以是字串、數字、陣列或巢狀物件。這一章的行程集合叫 `tours`，一筆行程一份文件。訂單集合叫 `orders`，一筆報名一份文件。

{% mermaid graph LR %}
  tours["集合 tours"] --> doc["文件 hualien-taroko"]
  doc --> fields["欄位 title、price、departures"]
{% endmermaid %}

讀寫發生在瀏覽器。SDK 送出請求，畫面接著等結果。失敗時（沒有網路、規則拒絕）會丟出錯誤，頁面要自己顯示，不能假設種子還在記憶體裡。

Authentication 管的是「這個人是誰」。前台用 Google 登入，後台用 email 與密碼。它不負責這個人能不能讀某一筆訂單。能不能讀寫是 Firestore 安全規則的事，留到最後一節。規則用 token 裡的 `sign_in_provider` 分辨這兩種登入。規則生效之前，資料庫先放在測試模式，種子才寫得進去。

Spark 方案的「Other Authentication services」包含 email／密碼與 Google 這類登入，這兩項在免費用量內，不必另外付費購買 Google 登入，也不必綁付款方式。不要啟用電話驗證：簡訊按則計費，而且 Spark 不能用。不要升級 Firebase Authentication with Identity Platform。升級後計費方式不同：Spark 改為每日活躍使用者上限，Blaze 超過免費用量才計費。這一章不用多重要素驗證、SAML、blocking functions。

{% note info %}
**金鑰會出現在前端**
網頁應用程式的設定會被打包進 JavaScript。任何人打開網站都能看到。真正擋住讀寫的是安全規則。設定出現在前端是預期的。
{% endnote %}

**解析**

- 集合裡可以沒有文件。第一次讀 `tours` 會得到空陣列，不是例外。
- 文件 id 可以自己指定，也可以讓 Firestore 產生。行程用前者，訂單用後者。
- Authentication 的登入狀態由 SDK 記在這台瀏覽器。重新整理後，`onAuthStateChanged` 會再回報一次。
- 測試模式約 30 天內允許所有讀寫。它不是這一章的正式規則。

## 建立專案與初始化

設定只寫在這三個地方：Firebase 主控台的專案、本機的 `.env.local`、`src/firebase.js`。後面的服務函式只向 `firebase.js` 拿 `db` 與 `auth`，不再抄金鑰。

### 步驟 1：建立 Firebase 專案

打開 [Firebase 主控台](https://console.firebase.google.com/)，新增專案。建立時關閉 Google Analytics，這一章用不到。

專案建好後，進入 Firestore Database，建立資料庫。地點建立後不能改，選離自己近的，例如 `asia-east1`。模式先選測試模式，讓後面的種子頁寫得進去。正式規則在最後一節才貼上，這裡先不要自訂規則。

Authentication 的登入方式先不要開。Google 留到前台登入那一節，電子郵件／密碼留到後台登入那一節，避免同一項設定寫兩次。主控台若出現升級 Identity Platform 的按鈕，不要按。

### 步驟 2：註冊網頁應用程式

在專案設定裡新增網頁應用程式。不要勾選 Firebase Hosting。註冊完成後，主控台給一份設定物件。先留在主控台，下一步才抄進本機。

### 步驟 3：環境變數

Vite 只把以 `VITE_` 開頭的變數放進瀏覽器端的 `import.meta.env`。沒有這個前綴的變數，元件讀不到。範例檔進版控，值留空。真正的金鑰寫在 `.env.local`，這個檔名已經被 `*.local` 忽略。再補上 `.env` 與 `.env.*`，避免有人把金鑰寫進別的檔名後 commit。`!.env.example` 必須放在 `.env.*` 後面，範例檔才不會被一起忽略。

```diff 07-project-final/.gitignore
 *.local
+.env
+.env.*
+!.env.example
 .DS_Store
```

```text 07-project-final/.env.example
# 對照 Firebase 主控台「網頁應用程式」設定物件的同名字段。值留空，真正的金鑰只寫在 .env.local。
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

複製範例再填值。主控台的 `apiKey` 填進 `VITE_FIREBASE_API_KEY`，其餘欄位同樣加上 `VITE_FIREBASE_` 前綴，駝峰改成大寫底線。

```bash
cp .env.example .env.local
```

改完 `.env.local` 要停掉開發伺服器再執行 `pnpm dev`。Vite 在啟動時讀環境變數，存檔不會熱更新這一份。

{% note info %}
**還沒有金鑰也能打包**
`.env.local` 留空時，後面的頁面會顯示尚未設定。`pnpm build` 不會因為缺少金鑰失敗。要讓打包後的網站真的連上 Firebase，得在有填好 `.env.local` 的電腦上建置。
{% endnote %}

### 步驟 4：安裝 SDK 並初始化

在專案資料夾安裝 Firebase。pnpm 12 預設不執行依賴的安裝腳本，除非在 `pnpm-workspace.yaml` 明確允許。`@firebase/util` 與 `protobufjs` 的 postinstall 是套件自己的準備步驟，允許之後 `pnpm install` 才會以成功結束。

```bash
pnpm add firebase
```

```diff 07-project-final/pnpm-workspace.yaml
 minimumReleaseAgeExclude:
   - '@vitejs/plugin-react@6.2.1'
+allowBuilds:
+  '@firebase/util': true
+  protobufjs: true
```

初始化集中在一個檔。沒有 `apiKey` 或 `projectId` 時不呼叫 `initializeApp`，開發伺服器不會在啟動當下因空設定崩潰。熱更新會再執行這個檔，已經建立過的 App 就沿用。

```js 07-project-final/src/firebase.js
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const missingFirebaseMessage =
  '尚未設定 Firebase。請依 .env.example 建立 .env.local，存檔後重新啟動開發伺服器。';

export const firebaseReady = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

const app = firebaseReady
  ? (getApps()[0] ?? initializeApp(firebaseConfig))
  : null;

export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
```

**解析**

- `firebaseReady` 為假時，`db` 與 `auth` 都是 `null`。頁面讀取時才丟出 `missingFirebaseMessage`，這句話只宣告在這個檔。
- `getFirestore` 與 `getAuth` 拿到的是同一份 App 上的兩項服務。
- 環境變數在建置時被寫進產物。沒有填值的建置，連線用的字串是空的。

# 讀寫介面

頁面不要直接呼叫 Firestore。先把讀寫收成服務函式，再讓 Hook 撐住等待與失敗。頁面只看這兩個結果。

## 服務函式

`src/api.js` 是這一章唯一會 import Firestore 方法的檔。`database` 在每次讀寫時檢查 `db`。沒有初始化就丟出上面那句錯誤，呼叫端用 `catch` 接。

`getDocs` 讀整個集合，`getDoc` 讀一份文件。`setDoc` 寫到指定 id，行程用這個，id 就是切版裡的 `tour.id`。`addDoc` 讓 Firestore 產生 id，訂單用這個。`updateDoc` 只改帶上去的欄位。`serverTimestamp` 由伺服器填寫入時間，清單依它由新到舊。

種子函式走訪 `src/features/tours/mock.data.js`。文件已經存在就略過，所以按鈕可以重複按，不會蓋掉主控台裡改過的欄位。回傳值是這次新寫入的筆數。

```js 07-project-final/src/api.js
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { tours } from './features/tours/mock.data.js';
import { db, missingFirebaseMessage } from './firebase.js';

const database = () => {
  if (!db) throw new Error(missingFirebaseMessage);
  return db;
};

export const listTours = async () => {
  const snap = await getDocs(collection(database(), 'tours'));
  return snap.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));
};

export const getTour = async (id) => {
  const snap = await getDoc(doc(database(), 'tours', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const seedTours = async () => {
  const base = database();
  let created = 0;
  for (const tour of tours) {
    const ref = doc(base, 'tours', tour.id);
    if ((await getDoc(ref)).exists()) continue;
    await setDoc(ref, tour);
    created += 1;
  }
  return created;
};

export const createOrder = async (input) => {
  const ref = await addDoc(collection(database(), 'orders'), {
    ...input,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, status: 'pending', ...input };
};

export const listOrders = async () => {
  const snap = await getDocs(
    query(collection(database(), 'orders'), orderBy('createdAt', 'desc')),
  );
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
};

export const listMyOrders = async (uid) => {
  const snap = await getDocs(
    query(collection(database(), 'orders'), where('uid', '==', uid)),
  );
  return snap.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
};

export const updateOrderStatus = async (id, status) => {
  await updateDoc(doc(database(), 'orders', id), { status });
};
```

**解析**

- 回傳的物件帶上 `id`。畫面的 `key` 與網址用的是這個欄位，不是 Firestore 內部另存的一份。
- `getTour` 找不到文件時回傳 `null`，詳情頁把它畫成找不到頁面。
- `createOrder` 把呼叫端傳來的欄位原樣寫入，其中包含 `uid`。回傳的物件還不含伺服器時間戳。完成頁只用這份回傳。
- `listOrders` 的 `orderBy('createdAt')` 是單一欄位排序，Firestore 會自動建索引。每筆訂單都要有 `createdAt`，缺了這個欄位的文件不會出現在結果裡。管理員清單用這個函式。
- `listMyOrders` 只下 `uid` 條件。`where` 再加 `orderBy` 會要複合索引，所以新到舊的排序放在瀏覽器。

## 自訂 Hook

服務函式回傳 Promise。頁面要的是三件事：還在等、失敗了、最新一筆結果。`useAsync` 把這三件事留在 state。第二個參數是真正會變的值，例如行程 id。`load` 每次 render 都是新函式，不放進依賴，否則詳情頁會不停重抓。`reload` 只把 `tick` 加一，效果函式就再跑一次。

抓取開始時先清掉上一筆資料並進入讀取中。清理函式把 `active` 設成假，元件卸載後不再 `setState`。

`useTours`、`useTour`、`useOrders`、`useMyOrders` 是這幾個畫面專用的薄包裝。`LoadGate` 在讀取中或失敗時畫 `#content`，成功才把孩子交回去。跳到內容的連結仍然找得到這個 id。

```js 07-project-final/src/useAsync.js
import { useEffect, useState } from 'react';
import { getTour, listMyOrders, listOrders, listTours } from './api.js';

export function useAsync(load, deps) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let active = true;
    // load 每次 render 都是新函式，不放進依賴；真正會變的是 deps 與 tick。
    setLoading(true);
    setError(null);
    setData(null);
    load()
      .then((value) => {
        if (active) setData(value);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [tick, ...deps]);

  return { data, error, loading, reload: () => setTick((n) => n + 1) };
}

export const useTours = () => useAsync(listTours, []);
export const useTour = (id) => useAsync(() => getTour(id), [id]);
export const useOrders = () => useAsync(listOrders, []);
export const useMyOrders = (uid) => useAsync(() => listMyOrders(uid), [uid]);
```

```jsx 07-project-final/src/LoadGate.jsx
import Alert from '@mui/material/Alert';

const frame = 'mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24';

export default function LoadGate({ loading, error, children }) {
  if (loading)
    return (
      <main id="content" className={frame}>
        <p className="text-lg text-muted">讀取中…</p>
      </main>
    );
  if (error)
    return (
      <main id="content" className={frame}>
        <Alert severity="error">{error.message}</Alert>
      </main>
    );
  return children;
}
```

**解析**

- `loading` 一開始是 `true`。第一個畫面是「讀取中…」，不是空的行程列表。
- 失敗時 `data` 維持 `null`，`LoadGate` 顯示 `error.message`。沒填環境變數時，這句就是 `missingFirebaseMessage`。
- `useTour` 的依賴是 `[id]`。網址上的 id 變了才重抓那一筆。
- `useMyOrders` 的依賴是 `[uid]`。登入者換了才重抓自己的訂單。
- 每個頁面各自呼叫 Hook，各自讀一次。這一章先不把結果放進全站共用的快取。

# 接到畫面

服務函式與 Hook 就緒之後，把首頁、列表、詳情改成讀雲端，再用一頁把種子寫上去。接著接上 Google 登入，報名表再改為新增帶 `uid` 的訂單。

## 行程讀取與種子

列表與首頁用 `useTours`。詳情用 `useTour`，讀取結束仍沒有文件才畫找不到頁面。讀取中不要先畫 404。出發日不再計算剩餘人數。報名連結維持 `/booking?tourId=...&departureId=...`。

### 步驟 1：三個頁面改讀雲端

`store.jsx` 先留著。報名與後台下一節才脫離它。

```diff 07-project-final/src/features/home/HomePage.jsx
 import { useEffect } from 'react';
+import Alert from '@mui/material/Alert';
 import Typography from '@mui/material/Typography';
 // ...
 import TourCard from '../tours/components/TourCard.jsx';
-import { useStore } from '../../store.jsx';
+import LoadGate from '../../LoadGate.jsx';
+import { useTours } from '../../useAsync.js';

 export default function HomePage() {
-  const { tours } = useStore();
+  const { data, loading, error } = useTours();
+  const tours = data ?? [];
   const featured = tours.filter((tour) => tour.featured);
   useEffect(() => { document.title = '洛奇旅行'; }, []);
+  if (loading || error) return <LoadGate loading={loading} error={error} />;

   return (
     <main id="content">
+      {tours.length ? null : <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6"><Alert severity="info">還沒有行程。請先打開 /seed 寫入種子。</Alert></div>}
       <HeroSlider slides={featured.length ? featured : tours.slice(0, 4)} />
 // ...
```

篩選與排序仍在 render 時直接計算。`useTours` 與 `useEffect` 這些 Hook 要留在提前返回之前，不能寫在 `if` 後面。集合還是空的時候，空狀態的說明改提示去種子頁。篩選把已有的行程濾光時，說明仍請對方換地區、天數或價格條件。

```diff 07-project-final/src/features/tours/ToursPage.jsx
 import TourFilters from './components/TourFilters.jsx';
+import LoadGate from '../../LoadGate.jsx';
 import { matchPrice } from '../../format.js';
-import { useStore } from '../../store.jsx';
+import { useTours } from '../../useAsync.js';

 export default function ToursPage() {
-  const { tours } = useStore();
+  const { data, loading, error } = useTours();
+  const tours = data ?? [];
   const [params, setParams] = useSearchParams();
   useEffect(() => { document.title = '行程 · 洛奇旅行'; }, []);
 // ...
   const visible = [...list].sort(rank[sort] || rank['price-asc']);
+  if (loading || error) return <LoadGate loading={loading} error={error} />;

   return (
 // ...
           <Typography id="empty-title" variant="h2">沒有符合的行程</Typography>
-          <p className="mt-3 max-w-prose">換一個地區或天數，或清掉價格條件。</p>
+          <p className="mt-3 max-w-prose">{tours.length ? '換一個地區或天數，或清掉價格條件。' : '還沒有行程。請先打開 /seed 寫入種子。'}</p>
 // ...
```

```diff 07-project-final/src/features/tours/TourDetailPage.jsx
 import NotFoundPage from '../../pages/NotFoundPage.jsx';
-import { ntd, seatsLeft } from '../../format.js';
-import { useStore } from '../../store.jsx';
+import LoadGate from '../../LoadGate.jsx';
+import { ntd } from '../../format.js';
+import { useTour } from '../../useAsync.js';

 export default function TourDetailPage() {
   const { id } = useParams();
-  const { tours, bookings } = useStore();
-  const tour = tours.find((item) => item.id === id);
-  const [departureId, setDepartureId] = useState(tour?.departures[0]?.id ?? '');
+  const { data: tour, loading, error } = useTour(id);
+  const [departureId, setDepartureId] = useState(tour?.departures[0]?.id ?? '');
   useEffect(() => { document.title = tour ? `${tour.title} · 洛奇旅行` : '找不到頁面 · 洛奇旅行'; }, [tour]);
+  if (loading || error) return <LoadGate loading={loading} error={error} />;
   if (!tour) return <NotFoundPage />;
 // ...
-            <p className="mt-3 text-base text-muted">最近一梯 {tour.departures[0].date} 尚餘 {seatsLeft(bookings, tour.id, tour.departures[0])} 人。</p>
-            <DepartureList tour={tour} bookings={bookings} />
+            <p className="mt-3 text-base text-muted">最近一梯 {tour.departures[0].date}，每團 {tour.departures[0].capacity} 人。名額不在前台計算。</p>
+            <DepartureList tour={tour} />
 // ...
-                  <span className="text-base text-muted">剩餘 {seatsLeft(bookings, tour.id, departure)} 人</span>
+                  <span className="text-base text-muted">名額 {departure.capacity} 人</span>
 // ...
```

手機上的出發日列表改成只收行程，按鈕直接前往報名。

```jsx 07-project-final/src/features/tours/components/DepartureList.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';

export default function DepartureList({ tour }) {
  return (
    <ul className="rounded-card bg-white shadow-card mt-4 max-w-3xl divide-y divide-line overflow-hidden px-5">
      {tour.departures.map((departure) => (
        <li
          key={departure.id}
          className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-medium">{departure.date}</p>
            <p className="text-muted">名額 {departure.capacity} 人</p>
          </div>
          <Button
            component={Link}
            to={`/booking?tourId=${tour.id}&departureId=${departure.id}`}
            variant="contained"
            className="w-full sm:w-auto"
          >
            立即報名
          </Button>
        </li>
      ))}
    </ul>
  );
}
```

**解析**

- 首頁在讀取中整頁交給 `LoadGate`，輪播不會先用空陣列畫一幀。
- 集合是空的時，首頁與列表都指向 `/seed`。種子頁下一小節才掛上路由，這時點進去會落到找不到頁面，寫完下一步就通了。
- 詳情的 `bookTo` 維持 `/booking?tourId=` 與 `departureId=`。這一節拿掉剩餘人數。閘門放在報名頁。
- `seatsLeft` 還留在 `format.js`，前台不再呼叫。旅客不能讀全部訂單，所以不在前台用訂單減出名額。

### 步驟 2：種子頁

種子頁不放進頁首。網址是 `/seed`。按下之後呼叫 `seedTours`。測試模式底下，八筆行程會出現在主控台的 `tours` 集合。已經寫過再按，筆數是 0，畫面寫「沒有覆寫」。

規則換成最後一節的內容之後，這個按鈕會被拒絕。那是預期的：正式規則不允許瀏覽器寫行程。

```jsx 07-project-final/src/features/admin/SeedPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { seedTours } from '../../api.js';
import { firebaseReady, missingFirebaseMessage } from '../../firebase.js';

export default function SeedPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    document.title = '寫入行程種子 · 洛奇旅行';
  }, []);

  const run = async () => {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const created = await seedTours();
      setMessage(
        created ? `已寫入 ${created} 筆行程。` : '行程都已存在，沒有覆寫。',
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <Typography variant="h1">寫入行程種子</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        把專案裡的行程寫進 Firestore 的
        tours。已經存在的文件會略過，可以重複按。
      </p>
      {firebaseReady ? null : (
        <Alert className="mt-8" severity="warning">
          {missingFirebaseMessage}
        </Alert>
      )}
      {message ? (
        <Alert className="mt-8" severity="success">
          {message}
        </Alert>
      ) : null}
      {error ? (
        <Alert className="mt-8" severity="error">
          {error}
        </Alert>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="contained"
          disabled={!firebaseReady || busy}
          onClick={run}
        >
          {busy ? '寫入中…' : '寫入種子'}
        </Button>
        <Button component={Link} to="/tours" variant="outlined">
          看行程
        </Button>
      </div>
    </main>
  );
}
```

路由加在現有的 `App` 裡。Google 登入下一節才包上 `AuthProvider`。

```diff 07-project-final/src/App.jsx
 import LoginPage from './features/auth/LoginPage.jsx';
+import SeedPage from './features/admin/SeedPage.jsx';
 import AdminLoginPage from './features/admin/AdminLoginPage.jsx';
 // ...
       { path: 'login', element: <LoginPage /> },
+      { path: 'seed', element: <SeedPage /> },
       { path: 'admin/login', element: <AdminLoginPage /> },
 // ...
```

寫入成功後打開 `/tours`。八筆行程應來自 Firestore，重新整理還在。主控台的 `tours` 集合也能看到相同的文件 id。

**解析**

- 種子頁在按下時才寫入，打開網址本身不會改資料。
- `firebaseReady` 為假時按鈕停用，並顯示同一句尚未設定。
- 文件 id 用行程 id，詳情路由 `/tours/hualien-taroko` 對得上雲端那一份。
- 這一頁能寫入，是因為資料庫仍在測試模式。它不是正式規則的一部分。

## 前台 Google 登入

切版的 `/login` 已是 Google 對話框，按鈕還沒有呼叫 SDK。這一節啟用 Google 登入方式，建立 `auth.jsx`，用 [Sign in with Google on Web](https://firebase.google.com/docs/auth/web/google-signin) 的 `GoogleAuthProvider` 與 `signInWithPopup` 接上那個按鈕。頁首未登入仍顯示「登入」。

### 步驟 1：啟用 Google

Firebase 主控台打開 Authentication，進入登入方式。

- 啟用「Google」。支援電子郵件填這個專案要收信的 email。
- 不要啟用「電話」。
- 不要按升級 Firebase Authentication with Identity Platform。
- 「電子郵件／密碼」這一節先不要開，後台那一節再啟用。

授權網域預設包含 `localhost`。本機開發伺服器的彈出視窗用得到。之後若把靜態網站放到自訂網域，再把那個網域加進授權網域。

### 步驟 2：AuthProvider

`auth.jsx` 訂閱登入狀態，並提供 `signInWithGoogle` 與 `signOut`。`provider` 讀 `user.providerData[0].providerId`。這一章每個帳號只用一種登入方式，這個值與 token 的 `firebase.sign_in_provider` 相同：Google 是 `google.com`，密碼是 `password`。沒有初始化時，`signInWithGoogle` 拒絕並帶上同一句尚未設定。`ready` 在第一次回報之後才是真。沒有 Firebase 時不必等，直接視為已確認、使用者是 `null`。

`signIn(email, password)` 留到後台那一節再補。

```jsx 07-project-final/src/auth.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, firebaseReady, missingFirebaseMessage } from './firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!firebaseReady);

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (next) => {
      setUser(next);
      setReady(true);
    });
  }, []);

  const api = useMemo(
    () => ({
      user,
      provider: user?.providerData?.[0]?.providerId ?? null,
      ready,
      firebaseReady,
      signInWithGoogle() {
        if (!auth) return Promise.reject(new Error(missingFirebaseMessage));
        return signInWithPopup(auth, new GoogleAuthProvider());
      },
      signOut() {
        return auth ? signOut(auth) : Promise.resolve();
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

`App` 在原有的 `StoreProvider` 外面包一層。種子路由留著。`StoreProvider` 還要留給行程管理頁，訂單清單那一節改完再拿掉。

```diff 07-project-final/src/App.jsx
+import { AuthProvider } from './auth.jsx';
 import { StoreProvider } from './store.jsx';
 // ...
 export default function App() {
   return (
+    <AuthProvider>
       <StoreProvider>
         <RouterProvider router={router} />
       </StoreProvider>
+    </AuthProvider>
   );
 }
```

### 步驟 3：對話框與頁首

`next` 來自查詢字串。只接受以 `/` 開頭、且不是 `//` 的站內路徑。登入成功後前往這個路徑，沒有或不合法就去 `/`。已經有登入者時，打開這一頁也直接過去。

```jsx 07-project-final/src/features/auth/LoginPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../../auth.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next');
  const back = next?.startsWith('/') && !next.startsWith('//') ? next : '/';
  const { user, ready, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    document.title = '用 Google 帳號繼續 · 洛奇旅行';
  }, []);
  useEffect(() => {
    if (ready && user) navigate(back, { replace: true });
  }, [ready, user, back, navigate]);

  const submit = async () => {
    setBusy(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate(back, { replace: true });
    } catch (err) {
      const closed =
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request';
      setError(
        closed
          ? '已關閉登入視窗。'
          : err.code === 'auth/popup-blocked'
            ? '瀏覽器擋住了登入視窗。'
            : err.message,
      );
      setBusy(false);
    }
  };

  return (
    <main id="content" className="flex-1">
      <Dialog
        open
        onClose={() => navigate('/')}
        fullWidth
        maxWidth="xs"
        aria-labelledby="login-title"
      >
        <DialogTitle
          id="login-title"
          className="font-serif text-4xl leading-tight"
        >
          用 Google 帳號繼續
        </DialogTitle>
        <DialogContent>
          <p>
            報名和我的報名會使用 Google 的姓名與 email。我們不另外設定密碼。
          </p>
          {error ? (
            <Alert className="mt-4" severity="error">
              {error}
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions className="flex flex-col items-stretch gap-3 px-6 pb-6">
          <Button
            type="button"
            variant="contained"
            disabled={busy}
            onClick={submit}
          >
            {busy ? '登入中…' : '用 Google 帳號繼續'}
          </Button>
          <Button type="button" onClick={() => navigate('/')}>
            返回首頁
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
```

頁首：前台未登入顯示「登入」，連到 `/login`。已登入顯示 `displayName`，沒有名稱就顯示 email。選單裡「我的報名」連到 `/me`，另一項是登出。後台路徑只有 `provider === 'password'` 才把這個人畫成已登入，否則仍是「後台登入」。

```diff 07-project-final/src/layout/components/SiteHeader.jsx
 import { useState } from 'react';
-import { Link, NavLink, useLocation } from 'react-router';
+import { Link, NavLink, useLocation, useNavigate } from 'react-router';
 import AppBar from '@mui/material/AppBar';
+import Avatar from '@mui/material/Avatar';
 import Button from '@mui/material/Button';
 import Drawer from '@mui/material/Drawer';
+import Menu from '@mui/material/Menu';
+import MenuItem from '@mui/material/MenuItem';
 import SiteNav from './SiteNav.jsx';
 import Icon from '../../_shared/Icon.jsx';
+import { useAuth } from '../../auth.jsx';
 // ...
 export default function SiteHeader() {
+  const { user, provider, ready, signOut } = useAuth();
+  const navigate = useNavigate();
   const { pathname } = useLocation();
   const admin = pathname.startsWith('/admin');
   const [open, setOpen] = useState(false);
-  const close = () => setOpen(false);
-  const account = <Button component={Link} to={admin ? '/admin/login' : '/login'} onClick={close}>{admin ? '後台登入' : '登入'}</Button>;
+  const [anchor, setAnchor] = useState(null);
+  const close = () => { setOpen(false); setAnchor(null); };
+  const logout = () => { signOut(); close(); navigate('/'); };
+  const session = admin ? provider === 'password' : Boolean(user);
+  const label = user?.displayName || user?.email || '';
+  const account = (extra = '') => (!ready ? null : session ? (
+    <Button type="button" aria-expanded={Boolean(anchor)} onClick={(event) => setAnchor(event.currentTarget)} className={`gap-2 text-ink ${extra}`}>
+      <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{label.slice(0, 1).toUpperCase()}</Avatar>
+      {label}
+    </Button>
+  ) : <Button component={Link} to={admin ? '/admin/login' : '/login'} onClick={close}>{admin ? '後台登入' : '登入'}</Button>);
 // ...
           {links('site-nav')}
-          {account}
+          {account()}
         </div>
       </div>
+      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
+        {admin ? null : <MenuItem component={Link} to="/me" onClick={close}>我的報名</MenuItem>}
+        <MenuItem onClick={logout}>登出</MenuItem>
+      </Menu>
       <Drawer anchor="right" open={open} onClose={close}>
         <div id="site-drawer" className="flex flex-col gap-2 p-4">
           {links(undefined)}
-          {account}
+          {account('justify-start')}
         </div>
       </Drawer>
 // ...
```

按下「用 Google 帳號繼續」會跳出 Google 視窗。完成後頁首出現名稱或 email，選單可以到 `/me`。

**解析**

- `signInWithPopup` 使用 Firebase Authentication SDK。這一章不自幹 OAuth，也不換另一套登入介面。
- `onAuthStateChanged` 在重新整理後再回報一次。`ready` 還是假的時候，頁首先不要把人當成未登入。
- `provider` 這一節先讀得出來。後台閘門下一節才拿 `password` 來擋畫面。
- 前台的「登入」留著。未登入連到 `/login`，已登入才換成名稱與登出。

## 報名表寫入訂單

未登入打開 `/booking` 或 `/me`，`MemberGate` 導向 `/login?next=...`。`next` 是原本要去的網址，含查詢字串。姓名與 email 來自 `user.displayName`、`user.email`，欄位唯讀。電話手填。送出時 `createOrder` 帶 `uid: user.uid`。成功後把回傳放進路由 `state`，導到完成頁。完成頁重新整理後 `state` 消失，這一筆改到「我的報名」再讀。

```jsx 07-project-final/src/features/booking/components/MemberGate.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../../auth.jsx';
import { missingFirebaseMessage } from '../../../firebase.js';

export default function MemberGate({ children }) {
  const { user, ready, firebaseReady } = useAuth();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebaseReady && ready && !user)
      navigate(`/login?next=${encodeURIComponent(`${pathname}${search}`)}`, {
        replace: true,
      });
  }, [firebaseReady, ready, user, pathname, search, navigate]);

  if (!firebaseReady) {
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
      >
        <Alert severity="warning">{missingFirebaseMessage}</Alert>
      </main>
    );
  }
  if (!ready || !user)
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 text-lg text-muted sm:px-6 md:py-24"
      >
        確認身份…
      </main>
    );
  return children;
}
```

```jsx 07-project-final/src/features/booking/components/BookingForm.jsx
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createOrder } from '../../../api.js';
import { useAuth } from '../../../auth.jsx';
import { ntd } from '../../../format.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

export default function BookingForm({ tour, departure, onDone }) {
  const { user } = useAuth();
  const [people, setPeople] = useState('2');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const name = user?.displayName || '';
  const email = user?.email || '';
  const subtotal = tour.price * Number(people);
  const invalid = !name.trim() || !email.includes('@') || !phone.trim();

  const submit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (invalid) {
      setError(
        name.trim() && email.includes('@')
          ? '請填電話'
          : '請確認 Google 帳號帶有姓名與 email，並填電話',
      );
      return;
    }
    setBusy(true);
    setError('');
    try {
      const row = await createOrder({
        uid: user.uid,
        tourId: tour.id,
        tourTitle: tour.title,
        departureId: departure.id,
        date: departure.date,
        people: Number(people),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subtotal,
      });
      onDone(row);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form
      id="booking-form"
      noValidate
      className="rounded-card bg-white shadow-card grid gap-4 p-6 md:p-8"
      onSubmit={submit}
    >
      <Typography variant="h2">填寫資料</Typography>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="姓名"
          value={name}
          slotProps={{ input: { readOnly: true } }}
          error={submitted && !name.trim()}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          slotProps={{ input: { readOnly: true } }}
          error={submitted && !email.includes('@')}
        />
      </div>
      <FieldSelect
        id="people"
        label="人數"
        value={people}
        onChange={setPeople}
        options={[1, 2, 3, 4, 5, 6, 7, 8].map((count) => ({
          value: String(count),
          label: String(count),
        }))}
      />
      <TextField
        label="電話"
        type="tel"
        required
        placeholder="0912000111"
        value={phone}
        error={submitted && !phone.trim()}
        helperText=" "
        onChange={(event) => setPhone(event.target.value)}
      />
      {error ? <Alert severity="error">{error}</Alert> : null}
      <p>
        小計{' '}
        <span className="font-serif text-2xl font-bold text-action">
          {ntd(subtotal)}
        </span>
      </p>
      <p className="text-muted">小計會依人數更新。送出後我們用 email 確認。</p>
      <Button type="submit" variant="contained" disabled={busy}>
        {busy ? '送出中…' : '送出報名'}
      </Button>
    </form>
  );
}
```

```jsx 07-project-final/src/features/booking/BookingPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import BookingForm from './components/BookingForm.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import MemberGate from './components/MemberGate.jsx';
import LoadGate from '../../LoadGate.jsx';
import { useTours } from '../../useAsync.js';

function BookingBody() {
  const { data, loading, error } = useTours();
  const tours = data ?? [];
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tour = tours.find(
    (item) => item.id === (params.get('tourId') || 'hualien-taroko'),
  );
  const departure =
    tour?.departures.find((item) => item.id === params.get('departureId')) ||
    tour?.departures[0];
  useEffect(() => {
    document.title = '報名 · 洛奇旅行';
  }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <BookingSteps activeStep={1} />
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        姓名與 email 來自 Google 帳號。請留下電話，送出後會寫進訂單。
      </p>
      {!tour || !departure ? (
        <Alert className="mt-8" severity="warning">
          找不到這趟行程或出發日。
          <Link className="ml-2 underline" to="/tours">
            回行程
          </Link>
        </Alert>
      ) : (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
          <BookingForm
            tour={tour}
            departure={departure}
            onDone={(row) => navigate('/booking/done', { state: row })}
          />
          <BookingSummary tour={tour} departure={departure} />
        </div>
      )}
    </main>
  );
}

export default function BookingPage() {
  return (
    <MemberGate>
      <BookingBody />
    </MemberGate>
  );
}
```

```jsx 07-project-final/src/features/booking/BookingDonePage.jsx
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import BookingReceipt from './components/BookingReceipt.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import { statusLabel } from '../../format.js';

export default function BookingDonePage() {
  const { state } = useLocation();
  const row = state?.id ? state : null;
  useEffect(() => {
    document.title = '報名已送出 · 洛奇旅行';
  }, []);

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <BookingSteps activeStep={2} />
      <Chip color="primary" label={statusLabel[row?.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">
        報名已送出
      </Typography>
      <Alert className="mt-4 max-w-prose" severity="success">
        我們會用 email
        再跟你確認。到「我的報名」可以查看這一筆。重新整理後，這一頁不再帶著剛送出的明細。
      </Alert>
      {row ? (
        <BookingReceipt row={row} />
      ) : (
        <p className="mt-8 max-w-prose text-lg text-muted">
          這一頁只保留剛送出的那一筆。請到我的報名查看，或從行程重新報名。
        </p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button component={Link} to="/me" variant="contained">
          看我的報名
        </Button>
        <Button component={Link} to="/tours" variant="outlined">
          回行程
        </Button>
      </div>
    </main>
  );
}
```

單筆列沿用 `MyBookingRow`。Firestore 那筆的標題欄是 `tourTitle`，傳給 `title`。

```jsx 07-project-final/src/features/booking/MyBookingsPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MemberGate from './components/MemberGate.jsx';
import MyBookingRow from './components/MyBookingRow.jsx';
import LoadGate from '../../LoadGate.jsx';
import { useAuth } from '../../auth.jsx';
import { useMyOrders } from '../../useAsync.js';

function MyBookingsBody() {
  const { user } = useAuth();
  const { data, loading, error } = useMyOrders(user.uid);
  const rows = data ?? [];
  useEffect(() => {
    document.title = '我的報名 · 洛奇旅行';
  }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <Typography variant="h1">我的報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        這裡列出這個 Google 帳號的訂單。如需改期或取消，請來信或來電。
      </p>
      {rows.length ? (
        <>
          <Typography variant="h2" className="mt-10">
            你的報名
          </Typography>
          <div className="rounded-card bg-white shadow-card mt-6 max-w-3xl divide-y divide-line px-5">
            {rows.map((item) => (
              <MyBookingRow
                key={item.id}
                status={item.status}
                title={item.tourTitle}
                date={item.date}
                people={item.people}
                phone={item.phone}
                subtotal={item.subtotal}
              />
            ))}
          </div>
        </>
      ) : (
        <section className="mt-10 max-w-3xl">
          <Typography id="empty-title" variant="h2">
            還沒有報名
          </Typography>
          <p className="mt-3 max-w-prose">選一個行程，挑一個出發日。</p>
          <Button
            className="mt-6"
            component={Link}
            to="/tours"
            variant="contained"
          >
            去看行程
          </Button>
        </section>
      )}
    </main>
  );
}

export default function MyBookingsPage() {
  return (
    <MemberGate>
      <MyBookingsBody />
    </MemberGate>
  );
}
```

送出一筆之後，主控台的 `orders` 集合應多一份文件，`status` 是 `pending`，`uid` 是目前這個 Google 帳號。重新整理完成頁，明細消失。打開 `/me` 仍看得到這一筆。`src/features/booking/mock.data.js` 不再被頁面 import。

**解析**

- `MemberGate` 等 `ready`。沒有使用者就帶著目前網址去 `/login`。報名連結維持 `/booking?tourId=...&departureId=...`，閘門在報名頁。
- `onDone` 用路由 state 把剛寫入的欄位帶過去。這份 state 只活在這一次導頁。自己的訂單由 `listMyOrders` 再讀。
- 表單的 `id="booking-form"` 維持契約。姓名與 email 不開放手改。電話仍手填。
- `useMyOrders(user.uid)` 寫在閘門裡面。沒有通過閘門就不會拿 `uid` 去查訂單。
- 單筆列沿用 `MyBookingRow`。訂單的標題欄是 `tourTitle`，傳給 `title`。每一筆用 `item.id` 當 `key`。


# 管理員、規則與部署

前台已經能讀行程、能以 Google 帳號寫自己的訂單。這一節補上 email／密碼登入，清單改讀 `orders`，最後貼上安全規則，並沿用第 12 篇的靜態打包。

## 登入與受保護畫面

`request.auth != null` 現在只代表有人登入。Google 登入的旅客也會得到這個值，不能拿它放行全部訂單。規則改看 token 內建欄位 `request.auth.token.firebase.sign_in_provider`。旅客是 `google.com`。管理員是主控台手動新增的 email／密碼帳號，值是 `password`。

畫面上的 `AdminGate` 先等 `ready`。未登入顯示後台登入提示。已登入但 `provider` 不是 `password` 時不能進後台。只判斷 `user` 有沒有值會放行進來的 Google 帳號。

網站上不要做 email 註冊表單。自行註冊的密碼帳號會得到 `sign_in_provider == 'password'`，規則會把它當成管理員。

### 步驟 1：建立管理員帳號

在 Firebase 主控台打開 Authentication 的登入方式，啟用「電子郵件／密碼」。不要啟用「電話」。不要按升級 Identity Platform。在使用者分頁手動新增一位使用者，email 與密碼自己留著，不要寫進專案。

應用程式沒有註冊表單。別人不能自己在網站上變成管理員。

### 步驟 2：補上密碼登入

前台那一節的 `auth.jsx` 已有 `onAuthStateChanged`、`signInWithGoogle` 與 `signOut`。這裡只補 `signIn`。

```diff 07-project-final/src/auth.jsx
-import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
+import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
 // ...
     signInWithGoogle() {
       if (!auth) return Promise.reject(new Error(missingFirebaseMessage));
       return signInWithPopup(auth, new GoogleAuthProvider());
     },
+    signIn(email, password) {
+      if (!auth) return Promise.reject(new Error(missingFirebaseMessage));
+      return signInWithEmailAndPassword(auth, email, password);
+    },
     signOut() {
       return auth ? signOut(auth) : Promise.resolve();
     },
```

版面裡的成功提示原本來自 `store`。訂單狀態改由清單頁自己顯示錯誤，這個 Snackbar 拿掉，`ScrollRestoration` 留在頁尾後面。

```jsx 07-project-final/src/layout/SiteLayout.jsx
import { Outlet, ScrollRestoration } from 'react-router';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
```

頁首已在前台登入那一節接上 `useAuth`。前台未登入仍是「登入」。後台路徑只有 `password` 才顯示帳號。

### 步驟 3：登入表單與閘門

密碼錯誤時，Firebase 的代碼是 `auth/invalid-credential`。這一種改寫成中文。其他失敗仍顯示 `err.message`，尚未設定 Firebase 時就是那句固定文字。已經以密碼登入的人打開這一頁，直接去報名清單。Google 登入者留在這一頁，不會被當成管理員送進去。

```jsx 07-project-final/src/features/admin/AdminLoginPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../auth.jsx';

export default function AdminLoginPage() {
  const { signIn, provider } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    document.title = '後台登入 · 洛奇旅行';
  }, []);
  useEffect(() => {
    if (provider === 'password') navigate('/admin/bookings');
  }, [provider, navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate('/admin/bookings');
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential'
          ? 'email 或密碼不對。請用主控台建立的那一組。'
          : err.message,
      );
      setBusy(false);
    }
  };

  return (
    <main
      id="content"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24"
    >
      <Paper
        component="form"
        elevation={0}
        className="rounded-card bg-white shadow-card grid max-w-md gap-4 p-6 md:p-8"
        onSubmit={submit}
      >
        <Typography variant="h1">後台登入</Typography>
        <p className="text-lg leading-relaxed">
          使用主控台建立的 email 與密碼。網站上沒有註冊表單。
        </p>
        <TextField
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          label="密碼"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Button type="submit" variant="contained" disabled={busy}>
          {busy ? '登入中…' : '登入'}
        </Button>
      </Paper>
    </main>
  );
}
```

```jsx 07-project-final/src/features/admin/components/AdminGate.jsx
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useAuth } from '../../../auth.jsx';
import { missingFirebaseMessage } from '../../../firebase.js';

export default function AdminGate({ children }) {
  const { user, provider, ready, firebaseReady } = useAuth();
  if (!firebaseReady) {
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
      >
        <Alert severity="warning">{missingFirebaseMessage}</Alert>
      </main>
    );
  }
  if (!ready)
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 text-lg text-muted sm:px-6 md:py-24"
      >
        確認身份…
      </main>
    );
  if (!user) {
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
      >
        <Alert severity="warning">
          請用主控台建立的 email 與密碼登入後台。
        </Alert>
        <Button
          className="mt-6"
          component={Link}
          to="/admin/login"
          variant="contained"
        >
          到後台登入
        </Button>
      </main>
    );
  }
  if (provider !== 'password') {
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
      >
        <Alert severity="warning">
          這個帳號不能進入後台。請改用主控台建立的 email 與密碼。
        </Alert>
        <Button
          className="mt-6"
          component={Link}
          to="/admin/login"
          variant="contained"
        >
          到後台登入
        </Button>
      </main>
    );
  }
  return children;
}
```

**解析**

- `signInWithEmailAndPassword` 成功後，`onAuthStateChanged` 會更新 `user`，`provider` 變成 `password`。表單另外 `navigate` 一次。
- `AdminGate` 先看有沒有設定、再等 `ready`。沒有使用者時請去後台登入。有使用者但不是 `password` 時停在說明，不渲染孩子。
- 閘門只擋畫面。沒有通過的人仍可從瀏覽器直接呼叫 SDK。安全規則那一節才擋讀取。
- 頁首已經接上 `useAuth`。訂單頁離開 `store` 之後，再刪 `store.jsx`。

## 訂單清單與狀態

後台行程頁改成只讀。清單改讀 `useTours`，表格沿用 `TourTable`，拿掉操作欄與編輯。還沒有資料時顯示「還沒有行程」，並提供寫入種子的按鈕。清單頁用 `useOrders`，狀態下拉改呼叫 `updateOrderStatus`，成功後 `reload`。這兩個頁面與表格都換成下面的寫法之後，再拿掉記憶體 provider，並刪掉已經沒有人 import 的檔。

表格不再提供編輯。`TourTable` 只接收 `tours`。

```diff 07-project-final/src/features/admin/components/TourTable.jsx
-import Button from '@mui/material/Button';
 import Card from '@mui/material/Card';
 // ...
 import { ntd } from '../../../format.js';

-export default function TourTable({ tours, onEdit }) {
+export default function TourTable({ tours }) {
 // ...
-              {['標題', '地區', '主題', '天數', '價格', '操作'].map((label) => (
+              {['標題', '地區', '主題', '天數', '價格'].map((label) => (
 // ...
                 <TableCell className="px-4 py-4">{ntd(tour.price)}</TableCell>
-                <TableCell className="px-4 py-4">
-                  <Button onClick={() => onEdit(tour)}>編輯</Button>
-                </TableCell>
               </TableRow>
 // ...
             <p className="mt-2 text-muted">
               {tour.region} · {tour.theme} · {tour.days} 天 · {ntd(tour.price)}
             </p>
-            <Button className="mt-3" onClick={() => onEdit(tour)}>
-              編輯
-            </Button>
           </Card>
 // ...
```

```jsx 07-project-final/src/features/admin/AdminToursPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminGate from './components/AdminGate.jsx';
import AdminTabs from './components/AdminTabs.jsx';
import TourTable from './components/TourTable.jsx';
import LoadGate from '../../LoadGate.jsx';
import { useTours } from '../../useAsync.js';

function AdminToursBody() {
  const { data, loading, error } = useTours();
  const tours = data ?? [];
  useEffect(() => {
    document.title = '行程管理 · 洛奇旅行';
  }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        行程管理
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        清單來自
        Firestore。這一章只讀，不在後台新增或修改。還沒有資料時，先寫入種子。
      </p>
      <AdminTabs />
      <Button className="mt-4" component={Link} to="/seed" variant="outlined">
        寫入種子
      </Button>
      {tours.length ? (
        <TourTable tours={tours} />
      ) : (
        <p className="mt-8 text-base text-muted">還沒有行程。</p>
      )}
    </main>
  );
}

export default function AdminToursPage() {
  return (
    <AdminGate>
      <AdminToursBody />
    </AdminGate>
  );
}
```

表格不再自己碰 store。狀態變更由清單頁傳進來。

```diff 07-project-final/src/features/admin/components/BookingTable.jsx
 import { ntd, statusLabel } from '../../../format.js';
-import { useStore } from '../../../store.jsx';
 import { tokens } from '../../../theme.js';
 // ...
-function StatusSelect({ booking }) {
-  const { setBookingStatus } = useStore();
+function StatusSelect({ booking, onStatus }) {
   const tone = statusTone[booking.status] || statusTone.pending;
 // ...
-      onChange={(event) => setBookingStatus(booking.id, event.target.value)}
+      onChange={(event) => onStatus(booking.id, event.target.value)}
 // ...
-export default function BookingTable({ bookings }) {
+export default function BookingTable({ bookings, onStatus }) {
 // ...
-                <TableCell className="px-4 py-4"><StatusSelect booking={booking} /></TableCell>
+                <TableCell className="px-4 py-4"><StatusSelect booking={booking} onStatus={onStatus} /></TableCell>
 // ...
-            <div className="mt-3"><StatusSelect booking={booking} /></div>
+            <div className="mt-3"><StatusSelect booking={booking} onStatus={onStatus} /></div>
 // ...
```

```diff 07-project-final/src/features/admin/AdminBookingsPage.jsx
 import { useEffect, useState } from 'react';
+import Alert from '@mui/material/Alert';
 import MenuItem from '@mui/material/MenuItem';
 // ...
 import Typography from '@mui/material/Typography';
+import AdminGate from './components/AdminGate.jsx';
 import AdminTabs from './components/AdminTabs.jsx';
 import BookingTable from './components/BookingTable.jsx';
+import LoadGate from '../../LoadGate.jsx';
+import { updateOrderStatus } from '../../api.js';
 import { statusLabel } from '../../format.js';
-import { useStore } from '../../store.jsx';
+import { useOrders } from '../../useAsync.js';
 // ...
-export default function AdminBookingsPage() {
+function AdminBookingsBody() {
-  const { bookings } = useStore();
+  const { data, loading, error, reload } = useOrders();
+  const bookings = data ?? [];
   const [status, setStatus] = useState('all');
   const [query, setQuery] = useState('');
   const [sort, setSort] = useState('date-desc');
+  const [notice, setNotice] = useState('');
   useEffect(() => { document.title = '報名清單 · 洛奇旅行'; }, []);
 // ...
-      .filter((booking) => !keyword || booking.name.includes(keyword))
+      .filter((booking) => !keyword || booking.name?.includes(keyword))
       .sort((a, b) => (sort === 'date-asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
+
+  const changeStatus = async (id, next) => {
+    setNotice('');
+    try {
+      await updateOrderStatus(id, next);
+      reload();
+    } catch (err) {
+      setNotice(err.message);
+    }
+  };
+
+  if (loading || error) return <LoadGate loading={loading} error={error} />;

   return (
 // ...
-      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">查看所有報名，並把狀態改為待確認、已確認或已取消。</p>
+      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">查看所有訂單，並把狀態改為待確認、已確認或已取消。</p>
       <AdminTabs />
+      {notice ? <Alert className="mt-6" severity="error">{notice}</Alert> : null}
 // ...
-      {shown.length ? <BookingTable bookings={shown} /> : <p className="mt-8 text-base text-muted">沒有符合的報名。</p>}
+      {shown.length ? <BookingTable bookings={shown} onStatus={changeStatus} /> : <p className="mt-8 text-base text-muted">沒有符合的報名。</p>}
     </main>
   );
 }
+
+export default function AdminBookingsPage() {
+  return <AdminGate><AdminBookingsBody /></AdminGate>;
+}
```

頁面換成上面的寫法之後，`App` 拿掉記憶體那一層。

```diff 07-project-final/src/App.jsx
-import { StoreProvider } from './store.jsx';
 import { AuthProvider } from './auth.jsx';
 // ...
 export default function App() {
   return (
     <AuthProvider>
-      <StoreProvider>
         <RouterProvider router={router} />
-      </StoreProvider>
     </AuthProvider>
   );
 }
```

接著刪掉這兩個檔：

- `src/store.jsx`
- `src/features/admin/components/TourForm.jsx`

未登入時打開 `/admin/bookings`，應停在閘門，不應出現訂單。登入後看得到剛才那一筆。把狀態改成已確認，重新整理後仍是已確認。主控台裡同一份文件的 `status` 一起變。

{% mermaid graph LR %}
  form["登入表單"] --> authn["Authentication"]
  authn --> gate["AdminGate"]
  gate --> list["listOrders"]
  list --> fs["orders"]
  select["狀態下拉"] --> update["updateOrderStatus"]
  update --> fs
{% endmermaid %}

**解析**

- `AdminBookingsBody` 寫在 `AdminGate` 裡面。沒有通過閘門就不會呼叫 `listOrders`。
- `reload` 會再進入讀取中。清單會閃一下，換來的是雲端上的新狀態。
- 行程頁的「寫入種子」只是連到 `/seed`。規則收緊之後，那個按鈕會失敗，清單仍可讀。
- 篩選與排序仍在瀏覽器做。Firestore 這一章只負責把訂單整份拿回來。

## 安全規則與靜態部署

規則是伺服器上的判斷，跟 React 的閘門各寫一次。閘門決定畫不畫。規則決定 SDK 的請求過不過。這一節的規則全文只放在 `firestore.rules`，主控台貼上同一份，不要在別處再寫一套。

### 步驟 1：貼上規則

`tours` 任何人可讀，任何人不可寫。種子必須在貼上之前寫完。`orders` 的新增要已登入，而且新文件的 `uid` 等於 `request.auth.uid`，`status` 是 `pending`，姓名、email、電話是字串，人數是 1 到 8 的整數。讀取限文件主人或密碼登入的管理員。更新只限管理員。刪除不開放。

```text 07-project-final/firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }
    function isAdmin() {
      return signedIn() && request.auth.token.firebase.sign_in_provider == 'password';
    }
    function isOwner() {
      return signedIn() && resource.data.uid == request.auth.uid;
    }

    match /tours/{tourId} {
      allow read: if true;
      allow write: if false;
    }
    match /orders/{orderId} {
      allow create: if signedIn()
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.status == 'pending'
        && request.resource.data.name is string
        && request.resource.data.email is string
        && request.resource.data.phone is string
        && request.resource.data.people is int
        && request.resource.data.people >= 1
        && request.resource.data.people <= 8;
      allow read: if isOwner() || isAdmin();
      allow update: if isAdmin();
      allow delete: if false;
    }
  }
}
```

Firestore 主控台打開規則分頁，用這份取代測試模式的內容，發布。發布後做這些事確認：

- 未登入時，行程列表仍看得到。
- 未登入時，`/booking` 會到 `/login?next=...`。Google 登入後送出的訂單帶有自己的 `uid`。
- Google 登入者打不開 `/admin/bookings` 的清單。email／密碼登入後看得到全部訂單，也能改狀態。
- `/me` 只列出自己的 `uid`。`/seed` 再按會失敗。

{% mermaid graph TD %}
  guest["未登入"] --> readTours["可讀 tours"]
  guest --> deny["不可新增、不可讀 orders"]
  google["google.com"] --> own["可新增自己的 uid，可讀自己的訂單"]
  google --> denyAdmin["不可讀全部、不可改狀態"]
  password["password"] --> all["可讀全部訂單，可改狀態"]
{% endmermaid %}

**解析**

- `allow write` 涵蓋建立、更新與刪除。行程用 `write: if false` 一次擋住。
- `isOwner` 比對文件上的 `uid` 與 `request.auth.uid`。`isAdmin` 再要求 `sign_in_provider == 'password'`。
- `request.auth` 是 Authentication 帶上來的身分。沒登入時是 `null`。Google 登入時它不是 `null`，所以不能再用「有登入」代表管理員。
- 新增時多檢查 `status`、姓名、email、電話與人數。表單仍先擋空的電話。規則擋的是直接呼叫 SDK 的請求。

### 步驟 2：打包

打包指令仍是第 12 篇那一條：`vite build` 之後把 `index.html` 複製成 `404.html`。網站掛在網域根目錄時，路由維持預設。

Firebase 的程式會打成單獨一包，體積超過 Vite 預設的 500 kB 警告線。`chunkSizeWarningLimit` 只把警告門檻調到 600，不改變檔案內容。金鑰在建置當下寫進這包。要發布能連線的版本，就在填好 `.env.local` 的電腦上執行 `pnpm build`。

這一章不上 Firebase Hosting。靜態檔仍照第 12 篇放到 GitHub Pages。發布前確認 `.env.local` 沒有被 commit。

```diff 07-project-final/vite.config.js
   build: {
+    chunkSizeWarningLimit: 600,
     rollupOptions: {
       output: {
         manualChunks(id) {
           if (!id.includes('node_modules')) return undefined;
           if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
+          if (id.includes('firebase')) return 'firebase';
           if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) return 'react';
           return undefined;
         },
 // ...
```

```bash
pnpm build
```

**解析**

- `manualChunks` 只拆檔。畫面與規則都不會因為拆檔改變。
- 警告門檻設在 `vite.config.js` 這一處。Firebase 那包大約 570 kB。
- `dist/` 已在 `.gitignore`。要更新線上網站時，用建置結果覆蓋 Pages，不要把 `node_modules` 推進去。
- 空的環境變數也能建置成功。那種產物打開後，行程頁會顯示尚未設定。

# 本篇重點回顧

- 前台用 `signInWithPopup` 做 Google 登入。訂單寫入 `uid`。`/me` 用 `where('uid', '==', user.uid)` 讀自己的訂單。
- 後台用 `signInWithEmailAndPassword`。管理員帳號在主控台手動新增。網站沒有 email 註冊表單。
- 主控台啟用「Google」與「電子郵件／密碼」。不要啟用電話。不要升級 Identity Platform。
- Firebase 的網頁設定放在 `.env.local`，以 `VITE_` 開頭。範例檔是 `.env.example`。金鑰不要 commit。
- `src/api.js` 集中 Firestore 讀寫。`useAsync` 把等待、失敗與結果留在頁面。
- `/seed` 在測試模式把 `src/features/tours/mock.data.js` 寫進 `tours`。已存在的文件略過。
- `MemberGate` 把未登入者帶到 `/login?next=...`。`AdminGate` 等 `ready`，並且只放行 `password`。閘門擋的是畫面。
- `firestore.rules` 讓行程公開可讀、不可寫。訂單的讀取限主人或密碼登入者，更新只限密碼登入者。
- 打包沿用第 12 篇。連得上雲端的產物，要在有 `.env.local` 的電腦上建置。

# 專有名詞中英對照

## 從切版繼續

- 切版（layout）
- 開發伺服器（dev server）
- 種子資料（seed data）
- 記憶體狀態（in-memory state）

## 認識 Firebase

- Firebase
- 雲端文件資料庫（Cloud Firestore）
- 集合（collection）
- 文件（document）
- 欄位（field）
- 身份驗證（Firebase Authentication）
- 安全規則（security rules）
- 測試模式（test mode）
- 環境變數（environment variable）
- 網頁應用程式（web app）

## 讀寫介面

- 資料層（data layer）
- 服務函式（service function）
- 承諾（Promise）
- 鉤子（Hook）
- 副作用（effect）

## 接到畫面

- 查詢快照（query snapshot）
- 文件識別碼（document id）
- 使用者識別碼（uid）
- 彈出視窗登入（signInWithPopup）
- Google 登入（Google sign-in）
- 路由狀態（history state）
- 登入閘門（MemberGate）

## 管理員、規則與部署

- 受保護畫面（protected view）
- 登入狀態監聽（onAuthStateChanged）
- 登入提供者（sign_in_provider）
- 密碼登入（password）
- 授權（authorization）
- 靜態部署（static hosting）
- 程式碼分割（code splitting）
