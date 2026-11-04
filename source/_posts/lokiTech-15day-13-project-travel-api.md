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

切版做完之後，這一章把同一份洛奇旅行的行程與報名接到雲端。前台不設會員，訪客直接填表。只有後台使用 Firebase Authentication 的 email 與密碼。資料放在 Cloud Firestore。下面的路徑寫 `07-project-final`。人還在自己的 `06-project-init` 裡時，資料夾名稱換成那一份，檔案相對位置相同。

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

切版裡的登入、報名與後台儲存只改這次開啟的記憶體。重新整理之後，畫面回到 `src/data/` 的種子。這一章要換掉的是這一層讀寫。版面、色票與路由留在第 12 篇的結果。

{% mermaid graph LR %}
  seed["src/data 種子"] --> store["StoreProvider"]
  store --> pages["頁面"]
  session["sessionStorage"] --> gate["假的登入"]
{% endmermaid %}

前台不建立會員。訪客選好出發日就填姓名、email 與電話，報名寫進訂單。後台才登入，而且只用 email 與密碼。行程改從雲端讀。後台的新增與編輯行程這一章拿掉，清單只讀雲端上已經寫入的行程。剩餘名額要掃過所有訂單才算得出來，訂單稍後只准登入者讀，所以前台改顯示每團名額。

這一章結束時，頁面呼叫同一組服務函式。服務函式再呼叫 Firestore。管理員的身份由 Authentication 回報，後台畫面在確認有登入者之後才渲染訂單。

{% mermaid graph LR %}
  page["頁面"] --> api["api.js"]
  api --> fs["Cloud Firestore"]
  admin["管理員"] --> authn["Authentication"]
  authn --> gate["後台畫面"]
  gate --> api
{% endmermaid %}

**解析**

- 切版的 `sessionStorage` 鍵 `loki-travel-session` 這一章不再讀取。關掉分頁就消失的那組假帳號，換成 Authentication 自己保存的登入狀態。
- 行程文件用原本的 id，例如 `hualien-taroko`，詳情網址不用改。
- 訂單由 Firestore 編號。集合名稱是 `orders`。
- 色票與十二條既有路由維持不變。多出來的只有種子頁 `/seed`。

# 認識 Firebase

Firebase 是 Google 提供的後端服務，專案在瀏覽器裡用它的 JavaScript SDK 呼叫。這一章只用其中兩項：Cloud Firestore 存文件，Authentication 確認管理員是誰。先知道這兩項各自負責什麼，再建立專案、把設定交給 Vite。

## Firestore 與 Authentication

Firestore 是文件資料庫。資料分成集合與文件。集合是一疊文件，文件是一筆欄位。欄位可以是字串、數字、陣列或巢狀物件。這一章的行程集合叫 `tours`，一筆行程一份文件。訂單集合叫 `orders`，一筆報名一份文件。

{% mermaid graph LR %}
  tours["集合 tours"] --> doc["文件 hualien-taroko"]
  doc --> fields["欄位 title、price、departures"]
{% endmermaid %}

讀寫發生在瀏覽器。SDK 送出請求，畫面接著等結果。失敗時（沒有網路、規則拒絕）會丟出錯誤，頁面要自己顯示，不能假設種子還在記憶體裡。

Authentication 管的是「這個人是誰」。這一章只用 email 與密碼。它不負責這個人能不能讀某一筆訂單。能不能讀寫是 Firestore 安全規則的事，留到最後一節。規則生效之前，資料庫先放在測試模式，種子才寫得進去。

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

Authentication 的開關先不要開。管理員帳號留到登入那一節，避免同一項設定寫兩次。

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

export const missingFirebaseMessage = '尚未設定 Firebase。請依 .env.example 建立 .env.local，存檔後重新啟動開發伺服器。';

export const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app = firebaseReady ? (getApps()[0] ?? initializeApp(firebaseConfig)) : null;

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

種子函式走訪 `src/data/tours.js`。文件已經存在就略過，所以按鈕可以重複按，不會蓋掉主控台裡改過的欄位。回傳值是這次新寫入的筆數。

```js 07-project-final/src/api.js
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { tours } from './data/tours.js';
import { db, missingFirebaseMessage } from './firebase.js';

const database = () => {
  if (!db) throw new Error(missingFirebaseMessage);
  return db;
};

export const listTours = async () => {
  const snap = await getDocs(collection(database(), 'tours'));
  return snap.docs.map((item) => ({ id: item.id, ...item.data() })).sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));
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
  const ref = await addDoc(collection(database(), 'orders'), { ...input, status: 'pending', createdAt: serverTimestamp() });
  return { id: ref.id, status: 'pending', ...input };
};

export const listOrders = async () => {
  const snap = await getDocs(query(collection(database(), 'orders'), orderBy('createdAt', 'desc')));
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
};

export const updateOrderStatus = async (id, status) => {
  await updateDoc(doc(database(), 'orders', id), { status });
};
```

**解析**

- 回傳的物件帶上 `id`。畫面的 `key` 與網址用的是這個欄位，不是 Firestore 內部另存的一份。
- `getTour` 找不到文件時回傳 `null`，詳情頁把它畫成找不到頁面。
- `createOrder` 回傳的物件還不含伺服器時間戳。完成頁只用這份回傳，不立刻再讀一次訂單。
- `listOrders` 的 `orderBy('createdAt')` 是單一欄位排序，Firestore 會自動建索引。每筆訂單都要有 `createdAt`，缺了這個欄位的文件不會出現在結果裡。

{% note success %}
**換你試試：**
讓種子按鈕連已存在的行程也覆寫。
{% endnote %}

<details>
<summary>參考答案</summary>

拿掉存在就略過的那一行之後，每次按下都會用 `src/data/tours.js` 蓋掉雲端上的同名文件。

```diff 07-project-final/src/api.js
 // ...
     const ref = doc(base, 'tours', tour.id);
-    if ((await getDoc(ref)).exists()) continue;
     await setDoc(ref, tour);
 // ...
```

</details>

## 自訂 Hook

服務函式回傳 Promise。頁面要的是三件事：還在等、失敗了、最新一筆結果。`useAsync` 把這三件事留在 state。第二個參數是真正會變的值，例如行程 id。`load` 每次 render 都是新函式，不放進依賴，否則詳情頁會不停重抓。`reload` 只把 `tick` 加一，效果函式就再跑一次。

抓取開始時先清掉上一筆資料並進入讀取中。清理函式把 `active` 設成假，元件卸載後不再 `setState`。

`useTours`、`useTour`、`useOrders` 是這三個畫面專用的薄包裝。`LoadGate` 在讀取中或失敗時畫 `#content`，成功才把孩子交回去。跳到內容的連結仍然找得到這個 id。

```js 07-project-final/src/useAsync.js
import { useEffect, useState } from 'react';
import { getTour, listOrders, listTours } from './api.js';

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
      .then((value) => { if (active) setData(value); })
      .catch((err) => { if (active) setError(err); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [tick, ...deps]);

  return { data, error, loading, reload: () => setTick((n) => n + 1) };
}

export const useTours = () => useAsync(listTours, []);
export const useTour = (id) => useAsync(() => getTour(id), [id]);
export const useOrders = () => useAsync(listOrders, []);
```

```jsx 07-project-final/src/LoadGate.jsx
import Alert from '@mui/material/Alert';

const frame = 'mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24';

export default function LoadGate({ loading, error, children }) {
  if (loading) return <main id="content" className={frame}><p className="text-lg text-muted">讀取中…</p></main>;
  if (error) return <main id="content" className={frame}><Alert severity="error">{error.message}</Alert></main>;
  return children;
}
```

**解析**

- `loading` 一開始是 `true`。第一個畫面是「讀取中…」，不是空的行程列表。
- 失敗時 `data` 維持 `null`，`LoadGate` 顯示 `error.message`。沒填環境變數時，這句就是 `missingFirebaseMessage`。
- `useTour` 的依賴是 `[id]`。網址上的 id 變了才重抓那一筆。
- 每個頁面各自呼叫 Hook，各自讀一次。這一章先不把結果放進全站共用的快取。

# 接到畫面

服務函式與 Hook 就緒之後，把首頁、列表、詳情改成讀雲端，再用一頁把種子寫上去。報名表接著改為新增訂單。

## 行程讀取與種子

列表與首頁用 `useTours`。詳情用 `useTour`，讀取結束仍沒有文件才畫找不到頁面。讀取中不要先畫 404。出發日不再計算剩餘人數，連結直接到報名頁，不再繞去 `/login`。

### 步驟 1：三個頁面改讀雲端

`store.jsx` 先留著。報名與後台下一節才脫離它。

```diff 07-project-final/src/pages/HomePage.jsx
 import { useEffect } from 'react';
+import Alert from '@mui/material/Alert';
 import Typography from '@mui/material/Typography';
 // ...
 import TourCard from '../components/TourCard.jsx';
-import { useStore } from '../store.jsx';
+import LoadGate from '../LoadGate.jsx';
+import { useTours } from '../useAsync.js';

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

列表的 `useMemo` 必須留在提前返回之前。Hook 不能寫在 `if` 後面。集合還是空的時候，空狀態改提示去種子頁。篩選把已有的行程濾光時，仍維持原本的「沒有符合的條件」。

```diff 07-project-final/src/pages/ToursPage.jsx
 import TourFilters from '../components/TourFilters.jsx';
+import LoadGate from '../LoadGate.jsx';
 import { matchPrice } from '../format.js';
-import { useStore } from '../store.jsx';
+import { useTours } from '../useAsync.js';

 export default function ToursPage() {
-  const { tours } = useStore();
+  const { data, loading, error } = useTours();
+  const tours = data ?? [];
   const [params, setParams] = useSearchParams();
   useEffect(() => { document.title = '行程 · 洛奇旅行'; }, []);
 // ...
   }, [params, tours]);
+  if (loading || error) return <LoadGate loading={loading} error={error} />;

   return (
 // ...
-          <Alert severity="info">沒有符合的條件。</Alert>
+          <Alert severity="info">{tours.length ? '沒有符合的條件。' : '還沒有行程。請先打開 /seed 寫入種子。'}</Alert>
           <Typography id="empty-title" variant="h2" className="mt-3">沒有符合的行程</Typography>
-          <p className="mt-3 max-w-prose">換一個地區或天數，或清掉價格條件。</p>
+          <p className="mt-3 max-w-prose">{tours.length ? '換一個地區或天數，或清掉價格條件。' : '種子寫入後再回到這一頁。'}</p>
 // ...
```

```diff 07-project-final/src/pages/TourDetailPage.jsx
 import NotFoundPage from './NotFoundPage.jsx';
-import { ntd, seatsLeft } from '../format.js';
-import { useSession } from '../session.jsx';
-import { useStore } from '../store.jsx';
+import LoadGate from '../LoadGate.jsx';
+import { ntd } from '../format.js';
+import { useTour } from '../useAsync.js';

 export default function TourDetailPage() {
   const { id } = useParams();
-  const { tours, bookings } = useStore();
-  const { user } = useSession();
-  const tour = tours.find((item) => item.id === id);
-  const [departureId, setDepartureId] = useState(tour?.departures[0]?.id ?? '');
+  const { data: tour, loading, error } = useTour(id);
+  const [departureId, setDepartureId] = useState('');
   useEffect(() => { document.title = tour ? `${tour.title} · 洛奇旅行` : '找不到頁面 · 洛奇旅行'; }, [tour]);
   useEffect(() => { setDepartureId(tour?.departures[0]?.id ?? ''); }, [tour]);
+  if (loading || error) return <LoadGate loading={loading} error={error} />;
   if (!tour) return <NotFoundPage />;
 // ...
-  const next = `/booking?tourId=${tour.id}&departureId=${selected.id}`;
-  const bookTo = user ? next : `/login?next=${encodeURIComponent(next)}`;
+  const bookTo = `/booking?tourId=${tour.id}&departureId=${selected.id}`;
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

```jsx 07-project-final/src/components/DepartureList.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';

export default function DepartureList({ tour }) {
  return (
    <ul className="panel mt-4 max-w-3xl divide-y divide-line overflow-hidden px-5">
      {tour.departures.map((departure) => (
        <li key={departure.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">{departure.date}</p>
            <p className="text-muted">名額 {departure.capacity} 人</p>
          </div>
          <Button component={Link} to={`/booking?tourId=${tour.id}&departureId=${departure.id}`} variant="contained" className="w-full sm:w-auto">立即報名</Button>
        </li>
      ))}
    </ul>
  );
}
```

**解析**

- 首頁在讀取中整頁交給 `LoadGate`，輪播不會先用空陣列畫一幀。
- 集合是空的時，首頁與列表都指向 `/seed`。種子頁下一小節才掛上路由，這時點進去會落到找不到頁面，寫完下一步就通了。
- 詳情的 `bookTo` 不再看 session。未登入的訪客進得了報名頁。
- `seatsLeft` 還留在 `format.js`，前台不再呼叫。訂單不能公開讀，減完的人數也不會準。

### 步驟 2：種子頁

種子頁不放進頁首。網址是 `/seed`。按下之後呼叫 `seedTours`。測試模式底下，八筆行程會出現在主控台的 `tours` 集合。已經寫過再按，筆數是 0，畫面寫「沒有覆寫」。

規則換成最後一節的內容之後，這個按鈕會被拒絕。那是預期的：正式規則不允許瀏覽器寫行程。

```jsx 07-project-final/src/pages/SeedPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { seedTours } from '../api.js';
import { firebaseReady, missingFirebaseMessage } from '../firebase.js';

export default function SeedPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { document.title = '寫入行程種子 · 洛奇旅行'; }, []);

  const run = async () => {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const created = await seedTours();
      setMessage(created ? `已寫入 ${created} 筆行程。` : '行程都已存在，沒有覆寫。');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1">寫入行程種子</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">把專案裡的行程寫進 Firestore 的 tours。已經存在的文件會略過，可以重複按。</p>
      {firebaseReady ? null : <Alert className="mt-8" severity="warning">{missingFirebaseMessage}</Alert>}
      {message ? <Alert className="mt-8" severity="success">{message}</Alert> : null}
      {error ? <Alert className="mt-8" severity="error">{error}</Alert> : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="contained" disabled={!firebaseReady || busy} onClick={run}>{busy ? '寫入中…' : '寫入種子'}</Button>
        <Button component={Link} to="/tours" variant="outlined">看行程</Button>
      </div>
    </main>
  );
}
```

路由先加在現有的 `SessionProvider` 裡面。登入提供者下一節才換成 Authentication。

```diff 07-project-final/src/App.jsx
 import LoginPage from './pages/LoginPage.jsx';
+import SeedPage from './pages/SeedPage.jsx';
 import AdminLoginPage from './pages/AdminLoginPage.jsx';
 // ...
           <Route path="login" element={<LoginPage />} />
+          <Route path="seed" element={<SeedPage />} />
           <Route path="admin/login" element={<AdminLoginPage />} />
 // ...
```

寫入成功後打開 `/tours`。八筆行程應來自 Firestore，重新整理還在。主控台的 `tours` 集合也能看到相同的文件 id。

**解析**

- 種子頁在按下時才寫入，打開網址本身不會改資料。
- `firebaseReady` 為假時按鈕停用，並顯示同一句尚未設定。
- 文件 id 用行程 id，詳情路由 `/tours/hualien-taroko` 對得上雲端那一份。
- 這一頁能寫入，是因為資料庫仍在測試模式。它不是正式規則的一部分。

## 報名表寫入訂單

報名不再包 `MemberGate`。姓名與 email 改成可填。送出時呼叫 `createOrder`，成功後把回傳的那一筆放進路由的 `state`，導到完成頁。完成頁重新整理後，`state` 消失。訂單不能公開讀，所以這一頁不再向雲端要那一筆。

`/login` 與 `/me` 留著路由，內容改成說明。頁首的「登入」下一節才拿掉。刪掉已經沒有人 import 的 `src/components/MemberGate.jsx`。

```jsx 07-project-final/src/components/BookingForm.jsx
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createOrder } from '../api.js';
import { ntd } from '../format.js';
import FieldSelect from './FieldSelect.jsx';

export default function BookingForm({ tour, departure, onDone }) {
  const [people, setPeople] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const subtotal = tour.price * Number(people);
  const invalid = !name.trim() || !email.includes('@') || !phone.trim();

  const submit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (invalid) {
      setError('請填姓名、有效的 email 與電話');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const row = await createOrder({
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
    <form id="booking-form" noValidate className="panel grid gap-4 p-6 md:p-8" onSubmit={submit}>
      <Typography variant="h2">填寫資料</Typography>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="姓名" required value={name} error={submitted && !name.trim()} onChange={(event) => setName(event.target.value)} />
        <TextField label="Email" type="email" required value={email} error={submitted && !email.includes('@')} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <FieldSelect id="people" label="人數" value={people} onChange={setPeople} options={[1, 2, 3, 4, 5, 6, 7, 8].map((count) => ({ value: String(count), label: String(count) }))} />
      <TextField label="電話" type="tel" required placeholder="0912000111" value={phone} error={submitted && !phone.trim()} helperText=" " onChange={(event) => setPhone(event.target.value)} />
      {error ? <Alert severity="error">{error}</Alert> : null}
      <p>小計 <span className="font-serif text-2xl font-bold text-action">{ntd(subtotal)}</span></p>
      <p className="text-muted">小計會依人數更新。送出後我們用 email 確認。</p>
      <Button type="submit" variant="contained" disabled={busy}>{busy ? '送出中…' : '送出報名'}</Button>
    </form>
  );
}
```

```jsx 07-project-final/src/pages/BookingPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import Alert from '@mui/material/Alert';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import BookingForm from '../components/BookingForm.jsx';
import LoadGate from '../LoadGate.jsx';
import { ntd } from '../format.js';
import { useTours } from '../useAsync.js';

const steps = ['選出發日', '填寫資料', '送出確認'];

export default function BookingPage() {
  const { data, loading, error } = useTours();
  const tours = data ?? [];
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tour = tours.find((item) => item.id === (params.get('tourId') || 'hualien-taroko'));
  const departure = tour?.departures.find((item) => item.id === params.get('departureId')) || tour?.departures[0];
  useEffect(() => { document.title = '報名 · 洛奇旅行'; }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Stepper activeStep={1} alternativeLabel className="mb-10" sx={{ '& .MuiStepLabel-label': { fontSize: '1.125rem', fontWeight: 700, marginTop: '8px' } }}>
        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">不用登入。留下姓名、email 與電話，送出後會寫進訂單。</p>
      {!tour || !departure ? (
        <Alert className="mt-8" severity="warning">找不到這趟行程或出發日。<Link className="ml-2 underline" to="/tours">回行程</Link></Alert>
      ) : (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
          <BookingForm tour={tour} departure={departure} onDone={(row) => navigate('/booking/done', { state: row })} />
          <aside className="panel p-6 md:p-8 lg:sticky lg:top-24">
            <Typography variant="h2">這趟行程</Typography>
            <dl className="mt-5 grid gap-4 text-base">
              <div><dt className="text-muted">行程</dt><dd className="mt-1 text-lg font-medium">{tour.title}</dd></div>
              <div><dt className="text-muted">出發日</dt><dd className="mt-1 text-lg">{departure.date}</dd></div>
              <div><dt className="text-muted">天數</dt><dd className="mt-1 text-lg">{tour.days} 天</dd></div>
              <div>
                <dt className="text-muted">每人</dt>
                <dd className="mt-1 whitespace-nowrap font-serif text-3xl font-bold text-ink">{ntd(tour.price)}<span className="font-sans text-base font-normal text-muted"> / 人</span></dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </main>
  );
}
```

```jsx 07-project-final/src/pages/BookingDonePage.jsx
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { ntd, statusLabel } from '../format.js';

const steps = ['選出發日', '填寫資料', '送出確認'];

export default function BookingDonePage() {
  const { state } = useLocation();
  const row = state?.id ? state : null;
  useEffect(() => { document.title = '報名已送出 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Stepper activeStep={2} alternativeLabel className="mb-8">
        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>
      <Chip color="primary" label={statusLabel[row?.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">報名已送出</Typography>
      <Alert className="mt-4 max-w-prose" severity="success">我們會用 email 再跟你確認。訂單內容只有管理員讀得到，重新整理後這一頁不再從雲端把資料讀回來。</Alert>
      {row ? (
        <>
          <Typography variant="h2" className="mt-10">這筆內容</Typography>
          <dl className="panel mt-4 max-w-prose divide-y divide-line px-5">
            {[['行程', row.tourTitle], ['出發日', row.date], ['人數', row.people], ['姓名', row.name], ['電話', row.phone], ['小計', ntd(row.subtotal)], ['狀態', statusLabel[row.status] || row.status]].map(([label, value]) => (
              <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr]"><dt className="text-muted">{label}</dt><dd className={label === '小計' ? 'font-serif text-2xl font-bold text-action' : undefined}>{value}</dd></div>
            ))}
          </dl>
        </>
      ) : <p className="mt-8 max-w-prose text-lg text-muted">這一頁只保留剛送出的那一筆。請從行程重新報名。</p>}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button component={Link} to="/tours" variant="contained">回行程</Button>
        <Button component={Link} to="/" variant="outlined">回首頁</Button>
      </div>
    </main>
  );
}
```

```jsx 07-project-final/src/pages/LoginPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function LoginPage() {
  useEffect(() => { document.title = '報名不必登入 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1">報名不必登入</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">前台沒有會員。選好出發日後直接填表。管理員登入在頁尾。</p>
      <Button className="mt-8" component={Link} to="/tours" variant="contained">去看行程</Button>
    </main>
  );
}
```

```jsx 07-project-final/src/pages/MyBookingsPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MyBookingsPage() {
  useEffect(() => { document.title = '我的報名 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1">我的報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">這一章沒有會員，瀏覽器也不能讀訂單。確認信走 email，名單只出現在後台。</p>
      <Button className="mt-8" component={Link} to="/tours" variant="contained">去看行程</Button>
    </main>
  );
}
```

送出一筆之後，主控台的 `orders` 集合應多一份文件，`status` 是 `pending`。重新整理完成頁，明細消失，Firestore 裡的文件還在。`src/data/bookings.js` 不再被頁面 import。

**解析**

- `onDone` 用路由 state 把剛寫入的欄位帶過去。這份 state 只活在這一次導頁。雲端那一筆由管理員在訂單清單讀取。
- 表單的 `id="booking-form"` 維持契約。驗證在送出前做完，不合就不呼叫 `createOrder`。
- 測試模式允許未登入者新增訂單。正式規則仍會保留「任何人可新增」。
- `/me` 不再列出假資料。公開讀取訂單會把電話暴露給每一個訪客，下一節的規則會擋住。

# 管理員、規則與部署

前台已經能讀行程、能寫訂單。這一節把後台的假 session 換成 Authentication，清單改讀 `orders`，最後貼上安全規則，並沿用第 12 篇的靜態打包。

## 登入與受保護畫面

Authentication 只回答「現在有沒有登入者」。這一章不開放註冊，所以登入者就是你在主控台建立的那位管理員。規則用 `request.auth != null` 表示已登入，沒有另外的角色欄位。

畫面上的閘門是 `AdminGate`。它先等 `onAuthStateChanged` 回報，再決定要畫孩子還是登入提示。不等的話，重新整理的第一幀會把已登入的人當成訪客。

### 步驟 1：建立管理員帳號

在 Firebase 主控台打開 Authentication，登入方式啟用電子郵件／密碼。在使用者分頁手動新增一位使用者，email 與密碼自己留著，不要寫進專案。

應用程式沒有註冊表單。別人不能自己在網站上變成管理員。

### 步驟 2：AuthProvider

`auth.jsx` 訂閱登入狀態，並提供 `signIn` 與 `signOut`。沒有初始化時，`signIn` 拒絕並帶上同一句尚未設定。`ready` 在第一次回報之後才是真。沒有 Firebase 時不必等，直接視為已確認、使用者是 `null`。

```jsx 07-project-final/src/auth.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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

  const api = useMemo(() => ({
    user,
    ready,
    firebaseReady,
    signIn(email, password) {
      if (!auth) return Promise.reject(new Error(missingFirebaseMessage));
      return signInWithEmailAndPassword(auth, email, password);
    },
    signOut() {
      return auth ? signOut(auth) : Promise.resolve();
    },
  }), [user, ready]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

`App` 先在原有的 provider 外面包一層 `AuthProvider`。`StoreProvider` 還要留給行程管理頁，訂單那一節改完再拿掉。種子路由留著。

```diff 07-project-final/src/App.jsx
+import { AuthProvider } from './auth.jsx';
 import SiteLayout from './layouts/SiteLayout.jsx';
 // ...
 export default function App() {
   return (
+    <AuthProvider>
     <SessionProvider>
       <StoreProvider>
         <Routes>
 // ...
         </Routes>
       </StoreProvider>
     </SessionProvider>
+    </AuthProvider>
   );
 }
```

版面裡的成功提示原本來自 `store`。訂單狀態改由清單頁自己顯示錯誤，這個 Snackbar 拿掉。

```jsx 07-project-final/src/layouts/SiteLayout.jsx
import { Outlet } from 'react-router';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
```

頁首只在後台路徑顯示「後台登入」。已登入時顯示 email。前台不再放會員登入按鈕。

```diff 07-project-final/src/components/SiteHeader.jsx
-import { useSession } from '../session.jsx';
+import { useAuth } from '../auth.jsx';
 // ...
 export default function SiteHeader() {
-  const { user, signOut } = useSession();
+  const { user, signOut } = useAuth();
 // ...
-  const account = (
-    user ? (
-      <Button type="button" aria-haspopup="true" aria-expanded={Boolean(anchor)} onClick={(event) => setAnchor(event.currentTarget)} className="gap-2 text-ink">
-        <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{user.name.slice(0, 1)}</Avatar>
-        {user.name}
-      </Button>
-    ) : <Button component={Link} to={admin ? '/admin/login' : '/login'} onClick={close}>{admin ? '後台登入' : '登入'}</Button>
-  );
+  const label = user?.email ?? '';
+  const account = user ? (
+    <Button type="button" aria-haspopup="true" aria-expanded={Boolean(anchor)} onClick={(event) => setAnchor(event.currentTarget)} className="gap-2 text-ink">
+      <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{label.slice(0, 1).toUpperCase()}</Avatar>
+      {label}
+    </Button>
+  ) : admin ? <Button component={Link} to="/admin/login" onClick={close}>後台登入</Button> : null;
 // ...
           {user ? (
             <Button type="button" aria-haspopup="true" onClick={(event) => setAnchor(event.currentTarget)} className="justify-start gap-2 text-ink">
-              <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{user.name.slice(0, 1)}</Avatar>
-              {user.name}
+              <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">{label.slice(0, 1).toUpperCase()}</Avatar>
+              {label}
             </Button>
-          ) : <Button component={Link} to={admin ? '/admin/login' : '/login'} onClick={close}>{admin ? '後台登入' : '登入'}</Button>}
+          ) : admin ? <Button component={Link} to="/admin/login" onClick={close}>後台登入</Button> : null}
 // ...
```

### 步驟 3：登入表單與閘門

密碼錯誤時，Firebase 的代碼是 `auth/invalid-credential`。這一種改寫成中文。其他失敗仍顯示 `err.message`，尚未設定 Firebase 時就是那句固定文字。

```jsx 07-project-final/src/pages/AdminLoginPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../auth.jsx';

export default function AdminLoginPage() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { document.title = '後台登入 · 洛奇旅行'; }, []);
  useEffect(() => { if (user) navigate('/admin/bookings'); }, [user, navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate('/admin/bookings');
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' ? 'email 或密碼不對。請用主控台建立的那一組。' : err.message);
      setBusy(false);
    }
  };

  return (
    <main id="content" className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24">
      <Paper component="form" elevation={0} className="panel grid max-w-md gap-4 p-6 md:p-8" onSubmit={submit}>
        <Typography variant="h1">後台登入</Typography>
        <p className="text-lg leading-relaxed">使用 Firebase Authentication 的 email 與密碼。前台報名不需要登入。</p>
        <TextField label="Email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <TextField label="密碼" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Button type="submit" variant="contained" disabled={busy}>{busy ? '登入中…' : '登入'}</Button>
      </Paper>
    </main>
  );
}
```

```jsx 07-project-final/src/components/AdminGate.jsx
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useAuth } from '../auth.jsx';
import { missingFirebaseMessage } from '../firebase.js';

export default function AdminGate({ children }) {
  const { user, ready, firebaseReady } = useAuth();
  if (!firebaseReady) {
    return (
      <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
        <Alert severity="warning">{missingFirebaseMessage}</Alert>
      </main>
    );
  }
  if (!ready) return <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 text-lg text-muted sm:px-6 md:py-24">確認身份…</main>;
  if (user) return children;
  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Alert severity="warning">訂單只有管理員可以看。</Alert>
      <Button className="mt-6" component={Link} to="/admin/login" variant="contained">到後台登入</Button>
    </main>
  );
}
```

{% note success %}
**換你試試：**
登入失敗時一律顯示「登入失敗」，不要把 Firebase 的英文訊息直接給使用者。密碼錯誤那句中文留著。
{% endnote %}

<details>
<summary>參考答案</summary>

`auth/invalid-credential` 仍用中文。其餘失敗改成固定句子，尚未設定的說明也就不再從 `err.message` 漏出來。若要保留那句，得在 `catch` 裡先判斷 `err.message === missingFirebaseMessage`。

```diff 07-project-final/src/pages/AdminLoginPage.jsx
 // ...
     } catch (err) {
-      setError(err.code === 'auth/invalid-credential' ? 'email 或密碼不對。請用主控台建立的那一組。' : err.message);
+      setError(err.code === 'auth/invalid-credential' ? 'email 或密碼不對。請用主控台建立的那一組。' : '登入失敗');
       setBusy(false);
     }
 // ...
```

</details>

**解析**

- `signInWithEmailAndPassword` 成功後，`onAuthStateChanged` 會更新 `user`。表單另外 `navigate` 一次，已登入者重新打開登入頁也會被帶去清單。
- `AdminGate` 的三種畫面依序是：沒有設定、還在確認、沒有使用者。有使用者才渲染孩子。
- 閘門只擋畫面。沒有登入的人仍可從瀏覽器直接呼叫 SDK。下一節的規則才擋讀取。
- 頁首已經改接 `useAuth`。`session.jsx` 等訂單頁也離開 `store` 再一起刪。

## 訂單清單與狀態

後台行程頁改成只讀。清單頁用 `useOrders`，狀態下拉改呼叫 `updateOrderStatus`，成功後 `reload`。這兩個頁面與表格都換成下面的寫法之後，再拿掉記憶體 provider，並刪掉已經沒有人 import 的檔。

```jsx 07-project-final/src/pages/AdminToursPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AdminGate from '../components/AdminGate.jsx';
import AdminTabs from '../components/AdminTabs.jsx';
import LoadGate from '../LoadGate.jsx';
import { ntd } from '../format.js';
import { useTours } from '../useAsync.js';

function AdminToursBody() {
  const { data, loading, error } = useTours();
  const tours = data ?? [];
  useEffect(() => { document.title = '行程管理 · 洛奇旅行'; }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">行程管理</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">清單來自 Firestore。這一章只讀，不在後台新增或修改。還沒有資料時，先寫入種子。</p>
      <AdminTabs />
      <Button className="mt-4" component={Link} to="/seed" variant="outlined">寫入種子</Button>
      {tours.length ? (
        <>
          <TableContainer elevation={0} className="panel mt-8 hidden overflow-x-auto md:block">
            <Table>
              <TableHead>
                <TableRow>
                  {['標題', '地區', '主題', '天數', '價格'].map((label) => <TableCell key={label} className="px-4 py-3">{label}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {tours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell className="px-4 py-4">{tour.title}</TableCell>
                    <TableCell className="px-4 py-4">{tour.region}</TableCell>
                    <TableCell className="px-4 py-4">{tour.theme}</TableCell>
                    <TableCell className="px-4 py-4">{tour.days} 天</TableCell>
                    <TableCell className="px-4 py-4">{ntd(tour.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="mt-8 grid gap-4 md:hidden">
            {tours.map((tour) => (
              <Card key={tour.id} className="p-6">
                <h3 className="font-serif text-2xl font-semibold">{tour.title}</h3>
                <p className="mt-2 text-muted">{tour.region} · {tour.theme} · {tour.days} 天 · {ntd(tour.price)}</p>
              </Card>
            ))}
          </div>
        </>
      ) : <p className="mt-8 text-base text-muted">還沒有行程。</p>}
    </main>
  );
}

export default function AdminToursPage() {
  return <AdminGate><AdminToursBody /></AdminGate>;
}
```

表格不再自己碰 store。狀態變更由清單頁傳進來。

```diff 07-project-final/src/components/BookingTable.jsx
 import { ntd, statusLabel } from '../format.js';
-import { useStore } from '../store.jsx';
 import { tokens } from '../theme.js';
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

```diff 07-project-final/src/pages/AdminBookingsPage.jsx
 import { useEffect, useMemo, useState } from 'react';
+import Alert from '@mui/material/Alert';
 import MenuItem from '@mui/material/MenuItem';
 // ...
 import BookingTable from '../components/BookingTable.jsx';
+import LoadGate from '../LoadGate.jsx';
+import { updateOrderStatus } from '../api.js';
 import { statusLabel } from '../format.js';
-import { useStore } from '../store.jsx';
+import { useOrders } from '../useAsync.js';
 // ...
 function AdminBookingsBody() {
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
 // ...
   }, [bookings, status, query, sort]);
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
 // ...
```

頁面換成上面的寫法之後，`App` 拿掉記憶體那兩層。

```diff 07-project-final/src/App.jsx
-import { SessionProvider } from './session.jsx';
-import { StoreProvider } from './store.jsx';
 import { AuthProvider } from './auth.jsx';
 // ...
 export default function App() {
   return (
     <AuthProvider>
-    <SessionProvider>
-      <StoreProvider>
         <Routes>
 // ...
         </Routes>
-      </StoreProvider>
-    </SessionProvider>
     </AuthProvider>
   );
 }
```

接著刪掉這四個檔：

- `src/store.jsx`
- `src/session.jsx`
- `src/components/TourForm.jsx`
- `src/components/MemberGate.jsx`（報名那一節若已刪，這裡不用再刪）

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

`tours` 任何人可讀，任何人不可寫。種子必須在貼上之前寫完。`orders` 任何人可新增。讀取與更新要 `request.auth != null`。刪除不開放。

已登入就代表管理員，是因為網站沒有註冊。若以後加上註冊，這條規則會讓每一位註冊使用者讀到全部訂單，那時要改成自訂聲明或管理員清單，這一章不做。

```text 07-project-final/firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tours/{tourId} {
      allow read: if true;
      allow write: if false;
    }
    match /orders/{orderId} {
      allow create: if true;
      allow read, update: if request.auth != null;
      allow delete: if false;
    }
  }
}
```

Firestore 主控台打開規則分頁，用這份取代測試模式的內容，發布。發布後做三件事確認：

- 未登入時，行程列表仍看得到。
- 未登入時，報名仍送得出去。
- 未登入時，`/admin/bookings` 進不了清單。登出後，主控台以外的讀取會被拒絕。`/seed` 再按會失敗。

{% mermaid graph TD %}
  guest["未登入"] --> readTours["可讀 tours"]
  guest --> createOrder["可新增 orders"]
  guest --> deny["不可讀、不可改 orders"]
  signed["已登入"] --> readOrders["可讀、可改 orders"]
{% endmermaid %}

**解析**

- `allow write` 涵蓋建立、更新與刪除。行程用 `write: if false` 一次擋住。
- 訂單把 `create` 與 `read, update` 拆開。訪客只能新增，不能回頭讀自己剛寫的那筆。完成頁才改走路由 state。
- `request.auth` 是 Authentication 帶上來的身分。沒登入時是 `null`。
- 規則沒有檢查欄位形狀。表單負責少送空的姓名，規則負責誰可以碰到集合。

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

- 前台不設會員。訪客直接把報名寫進 `orders`。只有後台使用 email 與密碼。
- Firebase 的網頁設定放在 `.env.local`，以 `VITE_` 開頭。範例檔是 `.env.example`。金鑰不要 commit。
- `src/api.js` 集中 Firestore 讀寫。`useAsync` 把等待、失敗與結果留在頁面。
- `/seed` 在測試模式把 `src/data/tours.js` 寫進 `tours`。已存在的文件略過。
- `AdminGate` 等 Authentication 回報之後才畫訂單。閘門擋的是畫面。
- `firestore.rules` 讓行程公開可讀、不可寫，訂單公開可新增、僅登入者可讀可改。
- 打包沿用第 12 篇。連得上雲端的產物，要在有 `.env.local` 的電腦上建置。

# 專有名詞中英對照

## 從切版繼續

- 切版（layout）
- 開發伺服器（dev server）
- 種子資料（seed data）
- 記憶體狀態（in-memory state）
- 工作階段儲存（sessionStorage）

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
- 路由狀態（history state）

## 管理員、規則與部署

- 受保護畫面（protected view）
- 登入狀態監聽（onAuthStateChanged）
- 授權（authorization）
- 靜態部署（static hosting）
- 程式碼分割（code splitting）
