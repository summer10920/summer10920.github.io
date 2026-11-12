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

**解析**

- `pnpm install` 依 `package.json` 與鎖定檔裝依賴。`pnpm dev` 啟動 Vite 開發伺服器。
- `05-project-prototype` 與做完第 12 篇的 `06-project-init` 是同一份切版，差別只在資料夾從哪裡來。

Windows（PowerShell）：

```powershell
Remove-Item -Recurse -Force 07-project-final\node_modules, 07-project-final\dist -ErrorAction SilentlyContinue
cd 07-project-final
pnpm install
pnpm dev
```

**解析**

- 步驟與 macOS 相同，只是刪資料夾與換路徑的寫法改成 PowerShell。

終端機會印出本機網址。瀏覽器打開之後，畫面應與切版完成品相同。

**解析**

- 色票、路由表與契約 id（`site-header`、`nav-toggle`、`tour-list`、`booking-form`）維持不變，後面的功能加在這些頁面之上。

## 記憶體狀態與本章範圍

切版裡的登入、報名與後台儲存只改這次開啟的記憶體。重新整理之後，畫面回到各功能 `mock.data.js` 的種子。這一章要換掉的是這一層讀寫。版面、色票與路由留在第 12 篇的結果。

{% mermaid graph LR %}
  seed["mock.data.js"] --> mem["store.js 記憶體陣列"]
  mem --> loader["loader / action"]
  loader --> pages["頁面"]
{% endmermaid %}

前台用 Google 登入。報名寫進訂單，文件帶上 `uid`。我的報名只查這個 `uid`。後台用 email 與密碼登入。行程改從雲端讀寫，新增、修改與刪除都寫進 Firestore。剩餘名額要掃過所有訂單才算得出來，旅客不能讀別人的訂單，所以前台改顯示每團名額。訂單不提供實體刪除，把狀態改為已取消就是軟刪。

這一章結束時，頁面的 `loader` 與 `action` 呼叫同一組服務函式，服務函式再呼叫 Firestore。登入狀態由根路由的 `loader` 讀取。未登入要進報名或後台時，`loader` 重新導向登入頁。密碼以外的帳號打開後台時，頁面顯示說明與按鈕，不把人趕去別的網址。

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
- Authentication 的登入狀態由 SDK 記在這台瀏覽器。`loader` 會先等 `auth.authStateReady()`，再讀 `currentUser`。
- 測試模式約 30 天內允許所有讀寫。它不是這一章的正式規則。

## 建立專案與初始化

設定只寫在這三個地方：Firebase 主控台的專案、本機的 `.env.local`、`src/firebase.js`。後面的服務函式只向 `firebase.js` 拿 `db` 與 `auth`，不再抄金鑰。

### 步驟 1：建立 Firebase 專案

打開 [Firebase 主控台](https://console.firebase.google.com/)，新增專案。建立時關閉 Google Analytics，這一章用不到。

專案建好後，進入 Firestore Database，建立資料庫。地點建立後不能改，選離自己近的，例如 `asia-east1`。模式先選測試模式，讓後面的種子頁寫得進去。正式規則在最後一節才貼上，這裡先不要自訂規則。

Authentication 的登入方式先不要開。Google 留到前台登入那一節，電子郵件／密碼留到後台登入那一節，避免同一項設定寫兩次。主控台若出現升級 Identity Platform 的按鈕，不要按。

### 步驟 2：註冊網頁應用程式

在專案設定裡新增網頁應用程式。這裡先不必勾選 Firebase Hosting，設定寫在本章最後的 `firebase.json`。註冊完成後，主控台給一份設定物件。先留在主控台，下一步才抄進本機。

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

先安裝套件。

```bash
pnpm add firebase
```

**解析**

- 在專案資料夾執行，把 Firebase SDK 加進依賴。

裝完之後，`package.json` 會多出這項依賴。

```diff 07-project-final/package.json
     "@mui/material": "^9.5.0",
+    "firebase": "^13.2.0",
     "react": "^19.3.1",
 // ...
```

**解析**

- 版本範圍與完成品相同。

pnpm 12 要允許套件的 postinstall，安裝才會成功結束。

```diff 07-project-final/pnpm-workspace.yaml
 minimumReleaseAgeExclude:
   - '@vitejs/plugin-react@6.2.1'
+allowBuilds:
+  '@firebase/util': true
+  protobufjs: true
```

**解析**

- `pnpm-workspace.yaml` 明確允許 `@firebase/util` 與 `protobufjs` 的安裝腳本。

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

頁面不要直接呼叫 Firestore。讀寫收成 `src/api.js` 的服務函式。路由的 `loader` 呼叫這些函式，頁面用 `useLoaderData` 接結果。非預期的失敗交給 `errorElement`。讀取中由版型的 `useNavigation` 顯示。

## 服務函式

`src/api.js` 是這一章唯一會 import Firestore 方法的檔。`database` 在每次讀寫時檢查 `db`。沒有初始化就丟出上面那句錯誤，呼叫端用 `catch` 接。

`getDocs` 讀整個集合，`getDoc` 讀一份文件。`setDoc` 寫到指定 id，行程用這個，id 就是切版裡的 `tour.id`。`addDoc` 讓 Firestore 產生 id，訂單用這個。`updateDoc` 只改帶上去的欄位。`serverTimestamp` 由伺服器填寫入時間，清單依它由新到舊。

種子函式走訪 `src/features/tours/mock.data.js`。文件已經存在就略過，所以按鈕可以重複按，不會蓋掉主控台裡改過的欄位。回傳值是這次新寫入的筆數。主題選項仍寫在程式裡的同一份清單，行程文件只存 `theme` 字串，不必另做主題資料表。

```js 07-project-final/src/api.js
import {
  addDoc,
  collection,
  deleteDoc,
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

export const saveTour = async (editingId, tour) => {
  const base = database();
  if (editingId) {
    await setDoc(doc(base, 'tours', editingId), tour);
  } else {
    await addDoc(collection(base, 'tours'), tour);
  }
};

export const deleteTour = async (id) => {
  await deleteDoc(doc(database(), 'tours', id));
};

export const getOrder = async (id) => {
  const snap = await getDoc(doc(database(), 'orders', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
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
- `getOrder` 寫法相同，讀的是 `orders` 集合。文件不存在時回傳 `null`。規則不允許讀時，`getDoc` 會失敗，完成頁同樣畫成找不到頁。`id` 是 `addDoc` 產生的文件編號，能不能讀由規則把關：主人或管理員才讀得到。
- `createOrder` 把呼叫端傳來的欄位原樣寫入，其中包含 `uid`。回傳的物件帶上 `addDoc` 產生的 `id`，還不含伺服器時間戳。完成頁用這個 id 再呼叫 `getOrder` 讀一次。
- `listOrders` 的 `orderBy('createdAt')` 是單一欄位排序，Firestore 會自動建索引。每筆訂單都要有 `createdAt`，缺了這個欄位的文件不會出現在結果裡。管理員清單用這個函式。
- `listMyOrders` 只下 `uid` 條件。`where` 再加 `orderBy` 會要複合索引，所以新到舊的排序放在瀏覽器。

## 路由上的讀取

切版的 `loader` 已經會呼叫 `store.js`。這一章把那些呼叫換成 `api.js`，並刪掉記憶體模組。等待中的畫面放在 `SiteLayout`：`useNavigation().state === 'loading'` 時，在 `Outlet` 上面顯示「讀取中」。`loader` 丟出的錯誤仍進到沒有 `path` 的那層 `errorElement`。

沒有填 Firebase 時，讀取函式回傳 `{ firebaseReady: false }`，頁面渲染 `AccessNotice` 的 `MissingFirebase`，裡面是 `missingFirebaseMessage`。這不是例外，所以不會進到錯誤頁。

先刪掉記憶體模組。

```bash
rm src/store.js
```

**解析**

- `store.js` 刪掉之後，行程與訂單只來自 Firestore。重新整理不會再回到記憶體種子。

沒有設定或沒有權限時，用這兩個畫面說明狀況。

```jsx 07-project-final/src/AccessNotice.jsx
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { missingFirebaseMessage } from './firebase.js';

const frame = 'mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24';

export function MissingFirebase() {
  return (
    <main className={frame}>
      <Alert severity="warning">{missingFirebaseMessage}</Alert>
    </main>
  );
}

export function AdminDenied() {
  return (
    <main className={frame}>
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
```

**解析**

- `MissingFirebase` 與 `AdminDenied` 都畫在 `main` 裡，版型的頁首與頁尾還在。

再讓版型在換頁讀取時顯示「讀取中」。

```jsx 07-project-final/src/layout/SiteLayout.jsx
import { Outlet, ScrollRestoration, useNavigation } from 'react-router';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';

export default function SiteLayout() {
  const navigation = useNavigation();
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        {navigation.state === 'loading' ? (
          <p className="mx-auto w-full max-w-6xl px-4 pt-4 text-sm text-muted sm:px-6">
            讀取中
          </p>
        ) : null}
        <Outlet />
      </div>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
```

**解析**

- `SiteLayout` 在 `loading` 時多一行「讀取中」。送出表單時的 `submitting` 不在這裡顯示，按鈕自己看 `useNavigation`。

# 接到畫面

服務函式接上之後，首頁、行程列表與詳情改由 `loader` 呼叫 `listTours` 或 `getTour`。種子頁把 `mock.data.js` 寫進 `tours`，而且要先通過管理員檢查。報名與我的報名改走訂單文件，並帶上登入者的 `uid`。

## 行程讀取與種子

首頁、列表與詳情的 `loader` 先看 `firebaseReady`。還沒設定就回傳空清單或 `null`，頁面改畫 `MissingFirebase`。詳情找不到文件時 `throw data('找不到頁面', { status: 404 })`，由 `RouteErrorPage` 畫找不到頁。種子頁的 `loader` 使用 `requireAdmin`。不是密碼登入時回傳 `denied: true`，頁面顯示警告與前往後台登入的按鈕。

先改首頁的 `loader` 與畫面。

```jsx 07-project-final/src/features/home/HomePage.jsx
import { useLoaderData } from 'react-router';
import Alert from '@mui/material/Alert';
import FeaturedTours from './components/FeaturedTours.jsx';
import HeroSearch from './components/HeroSearch.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import IntroBanner from './components/IntroBanner.jsx';
import ReasonSection from './components/ReasonSection.jsx';
import ReviewSection from './components/ReviewSection.jsx';
import ThemeSection from './components/ThemeSection.jsx';
import { listTours } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { firebaseReady } from '../../firebase.js';

export const loader = async () => {
  if (!firebaseReady) return { firebaseReady: false, tours: [] };
  return { firebaseReady: true, tours: await listTours() };
};

export default function HomePage() {
  const { firebaseReady: ready, tours } = useLoaderData();
  const featured = tours.filter((tour) => tour.featured);
  if (!ready) return <MissingFirebase />;

  return (
    <main>
      <title>洛奇旅行</title>
      {tours.length ? null : (
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6">
          <Alert severity="info">還沒有行程。請先打開 /seed 寫入種子。</Alert>
        </div>
      )}
      <HeroSlider slides={featured.length ? featured : tours.slice(0, 4)} />
      <HeroSearch />
      <IntroBanner />
      <FeaturedTours tours={featured} />
      <ThemeSection />
      <ReasonSection />
      <ReviewSection />
    </main>
  );
}
```

**解析**

- 資料改由 `listTours()` 讀取。還沒設定時畫 `MissingFirebase`。
- 首頁在沒有行程時顯示「還沒有行程。請先打開 /seed 寫入種子。」輪播仍用精選，沒有精選就拿前四筆。

列表頁同樣改走 `listTours()`。

```jsx 07-project-final/src/features/tours/ToursPage.jsx
import { useLoaderData, useSearchParams } from 'react-router';
import Typography from '@mui/material/Typography';
import TourCard from './components/TourCard.jsx';
import TourEmpty from './components/TourEmpty.jsx';
import TourFilters from './components/TourFilters.jsx';
import { listTours } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { firebaseReady } from '../../firebase.js';
import { matchPrice } from '../../format.js';

export const loader = async () => {
  if (!firebaseReady) return { firebaseReady: false, tours: [] };
  return { firebaseReady: true, tours: await listTours() };
};

export default function ToursPage() {
  const { firebaseReady: ready, tours } = useLoaderData();
  const [params, setParams] = useSearchParams();

  const region = params.get('region') ?? '';
  const days = params.get('days') ?? '';
  const price = params.get('price') ?? '';
  const theme = params.get('theme') ?? '';
  const sort = params.get('sort') || 'price-asc';
  const list = tours.filter(
    (tour) =>
      (!region || tour.region === region) &&
      (!days || String(tour.days) === days) &&
      (!theme || tour.theme === theme) &&
      matchPrice(tour.price, price),
  );
  const rank = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'days-asc': (a, b) => a.days - b.days || a.price - b.price,
  };
  const visible = [...list].sort(rank[sort] || rank['price-asc']);
  if (!ready) return <MissingFirebase />;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>行程 · 洛奇旅行</title>
      <Typography variant="h1">行程</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        依地區、天數與預算挑選。價格為每人，以新台幣計。
      </p>
      <TourFilters />
      <div id="tour-list">
        {visible.length ? (
          <>
            <Typography variant="h2" className="mt-10">
              {visible.length} 筆行程
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((tour) => (
                <TourCard key={tour.id} tour={tour} showTheme />
              ))}
            </div>
          </>
        ) : (
          <TourEmpty
            onClear={() => setParams(new URLSearchParams())}
            message={
              tours.length
                ? '換一個地區或天數，或清掉價格條件。'
                : '還沒有行程。請先打開 /seed 寫入種子。'
            }
          />
        )}
      </div>
    </main>
  );
}
```

**解析**

- 列表的篩選仍讀查詢字串。資料來源從 `getTours()` 改成 `listTours()`。還沒設定時畫 `MissingFirebase`。

詳情頁的 `loader` 改呼叫 `getTour`。

```jsx 07-project-final/src/features/tours/TourDetailPage.jsx
import { useState } from 'react';
import { data, useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingCard from './components/BookingCard.jsx';
import FareBox from './components/FareBox.jsx';
import Gallery from './components/Gallery.jsx';
import Itinerary from './components/Itinerary.jsx';
import MobileBookingBar from './components/MobileBookingBar.jsx';
import MobileDepartures from './components/MobileDepartures.jsx';
import TourHeader from './components/TourHeader.jsx';
import TourHighlights from './components/TourHighlights.jsx';
import { getTour } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { firebaseReady } from '../../firebase.js';

export const loader = async ({ params }) => {
  if (!firebaseReady) return { firebaseReady: false, tour: null };
  const tour = await getTour(params.id);
  if (!tour) throw data('找不到頁面', { status: 404 });
  return { firebaseReady: true, tour };
};

export default function TourDetailPage() {
  const { firebaseReady: ready, tour } = useLoaderData();
  const [departureId, setDepartureId] = useState(tour?.departures[0]?.id ?? '');
  if (!ready) return <MissingFirebase />;

  const selected =
    tour.departures.find((item) => item.id === departureId) ??
    tour.departures[0];
  const bookTo = `/booking?tourId=${tour.id}&departureId=${selected.id}`;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 pb-28 sm:px-6 md:py-24 lg:pb-24">
      <title>{`${tour.title} · 洛奇旅行`}</title>
      <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(20rem,24rem)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <TourHeader tour={tour} />
          <Gallery images={tour.images} title={tour.title} />
          <TourHighlights intro={tour.intro} highlights={tour.highlights} />
          <Itinerary days={tour.itinerary} />
          <FareBox includes={tour.includes} excludes={tour.excludes} />
          <MobileDepartures tour={tour} />
          <Typography variant="h2" className="mt-14">
            取消與退款
          </Typography>
          <p className="mt-3 text-base leading-relaxed text-muted">
            出團前以 email
            確認。未成行全額退回。成行後若要改期，請來信或來電，由我們為你調整。常見問題也寫在關於頁。
          </p>
        </div>
        <BookingCard
          tour={tour}
          selected={selected}
          onSelect={setDepartureId}
          bookTo={bookTo}
        />
      </div>
      <MobileBookingBar price={tour.price} bookTo={bookTo} />
    </main>
  );
}
```

**解析**

- 詳情的 `loader` 只回傳這一筆行程。對不到 id 時丟 404，元件裡不再判斷空行程。還沒設定時畫 `MissingFirebase`。

種子頁把 `mock.data.js` 寫進 `tours`，而且要先通過管理員檢查。

```jsx 07-project-final/src/features/admin/SeedPage.jsx
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { seedTours } from '../../api.js';
import { AdminDenied, MissingFirebase } from '../../AccessNotice.jsx';
import { requireAdmin } from '../../auth.js';
import { missingFirebaseMessage } from '../../firebase.js';

export const loader = async ({ request }) => {
  const gate = await requireAdmin(request);
  return { firebaseReady: gate.firebaseReady, denied: Boolean(gate.denied) };
};

export const action = async ({ request }) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady) return { error: missingFirebaseMessage };
  if (gate.denied) return { error: '請先用後台帳號登入。' };
  try {
    return { created: await seedTours() };
  } catch (err) {
    return { error: err.message };
  }
};

export default function SeedPage() {
  const { firebaseReady: ready, denied } = useLoaderData();
  const result = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting';
  if (!ready) return <MissingFirebase />;
  if (denied) return <AdminDenied />;
  const message =
    result?.created == null
      ? ''
      : result.created
        ? `已寫入 ${result.created} 筆行程。`
        : '行程都已存在，沒有覆寫。';

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>寫入行程種子 · 洛奇旅行</title>
      <Typography variant="h1">寫入行程種子</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        把專案裡的行程寫進 Firestore 的
        tours。已經存在的文件會略過，可以重複按。規則允許管理員寫入後才能按，請先用後台帳號登入。
      </p>
      {message ? (
        <Alert className="mt-8" severity="success">
          {message}
        </Alert>
      ) : null}
      {result?.error ? (
        <Alert className="mt-8" severity="error">
          {result.error}
        </Alert>
      ) : null}
      <Form method="post" className="mt-8 flex flex-wrap gap-3">
        <Button type="submit" variant="contained" disabled={busy}>
          {busy ? '寫入中…' : '寫入種子'}
        </Button>
        <Button component={Link} to="/tours" variant="outlined">
          看行程
        </Button>
      </Form>
    </main>
  );
}
```

**解析**

- `/seed` 的 `action` 呼叫 `seedTours`。已存在的文件略過。未登入會被 `requireAdmin` 帶到 `/login?next=...`。
- Google 帳號進得了種子網址，但 `denied` 為真，畫面停在說明，不會呼叫寫入。

詳情頁的名額不再掃訂單。梯次、報名卡與手機出發日改顯示每團名額。

出發日列表改顯示每團名額。

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

- 不再呼叫 `seatsLeft` 去掃訂單。畫面上的名額改讀梯次自己的 `capacity`。

報名卡同樣改顯示每團名額。

```jsx 07-project-final/src/features/tours/components/BookingCard.jsx
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import { ntd } from '../../../format.js';

export default function BookingCard({ tour, selected, onSelect, bookTo }) {
  return (
    <aside className="rounded-card bg-white shadow-card sticky top-24 mt-12 hidden self-start p-8 lg:mt-0 lg:block">
      <p className="flex items-baseline gap-1.5 whitespace-nowrap font-serif text-4xl">
        <span className="inline-block rounded-full bg-accent text-ink font-bold leading-[1.15] py-[0.12em] px-[0.55em]">
          {ntd(tour.price)}
        </span>
        <span className="font-sans text-base font-normal text-muted">/ 人</span>
      </p>
      {tour.id === 'kyoto-nara' ? (
        <p className="mt-3 text-base text-muted">不含國際機票</p>
      ) : null}
      <dl className="mt-6 grid gap-3 text-base">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">天數</dt>
          <dd>{tour.days} 天</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">團體上限</dt>
          <dd>{tour.departures[0]?.capacity ?? 8} 人</dd>
        </div>
      </dl>
      <div className="mt-6 grid gap-3">
        {tour.departures.map((departure) => {
          const on = departure.id === selected.id;
          return (
            <button
              key={departure.id}
              type="button"
              onClick={() => onSelect(departure.id)}
              className={`rounded-card border px-4 py-3 text-left ${on ? 'border-action bg-mist' : 'border-line bg-white'}`}
            >
              <span className="block font-medium">{departure.date}</span>
              <span className="text-base text-muted">
                名額 {departure.capacity} 人
              </span>
            </button>
          );
        })}
      </div>
      <Button
        component={Link}
        to={bookTo}
        variant="contained"
        className="mt-8 w-full"
      >
        立即報名
      </Button>
    </aside>
  );
}
```

**解析**

- 名額來源與出發日列表相同，改讀該梯的 `capacity`。

手機出發日一併對齊。

```jsx 07-project-final/src/features/tours/components/MobileDepartures.jsx
import Typography from '@mui/material/Typography';
import DepartureList from './DepartureList.jsx';

export default function MobileDepartures({ tour }) {
  return (
    <div className="mt-14 lg:hidden">
      <Typography variant="h2">出發日</Typography>
      <p className="mt-3 text-base text-muted">
        最近一梯 {tour.departures[0].date}，每團 {tour.departures[0].capacity}{' '}
        人。名額不在前台計算。
      </p>
      <DepartureList tour={tour} />
    </div>
  );
}
```

**解析**

- 窄螢幕的出發日也改顯示每團名額，不再掃訂單。

## 登入、頁首與報名

根路由的 `id` 是 `root`，`loader` 是 `auth.js` 的 `rootLoader`。它等待 `auth.authStateReady()`，回傳目前的使用者快照。頁首用 `useRouteLoaderData('root')` 讀這份結果。登出是對 `/logout` 的 `fetcher` POST，`action` 呼叫 `signOut` 再 `redirect('/')`。

`requireUser` 在沒有使用者時丟出 `redirect` 到 `/login?next=...`。`safeNext` 只接受以單斜線開頭、且不是 `//` 的路徑。登入頁的 `action` 呼叫 `signInWithPopup`，成功後 `redirect` 到 `next`。頁面沒有在 effect 裡 `navigate`。

報名頁的 `loader` 同樣先 `requireUser`。表單改為唯讀的姓名與 email，電話仍手填。`action` 呼叫 `createOrder`，帶上 `uid`，再 `redirect` 到 `/booking/${id}`。

先寫驗證相關的服務函式。

```js 07-project-final/src/auth.js
import { redirect } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth, firebaseReady } from './firebase.js';

const snapshot = (user) =>
  user
    ? {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        provider: user.providerData?.[0]?.providerId ?? null,
      }
    : null;

export const session = async () => {
  if (!firebaseReady || !auth) return { firebaseReady: false, user: null };
  await auth.authStateReady();
  return { firebaseReady: true, user: snapshot(auth.currentUser) };
};

export const requireUser = async (request) => {
  const current = await session();
  if (!current.firebaseReady) return current;
  if (!current.user) {
    const url = new URL(request.url);
    throw redirect(
      `/login?next=${encodeURIComponent(`${url.pathname}${url.search}`)}`,
    );
  }
  return current;
};

export const requireAdmin = async (request) => {
  const current = await requireUser(request);
  if (!current.firebaseReady) return { ...current, denied: false };
  if (current.user.provider !== 'password') return { ...current, denied: true };
  return { ...current, denied: false };
};

export const safeNext = (value) =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/';

export const rootLoader = () => session();

export const logoutLoader = () => redirect('/');

export const logoutAction = async () => {
  if (auth) await signOut(auth);
  return redirect('/');
};
```

**解析**

- `session` 在沒有初始化時回傳 `firebaseReady: false` 與 `user: null`。有初始化才等 auth 狀態。
- `requireUser` 未登入時丟出 `redirect('/login?next=...')`。`requireAdmin` 先經過 `requireUser`，再檢查 `provider === 'password'`。
- `safeNext` 只接受以單斜線開頭、且不是 `//` 的路徑。`rootLoader` 回傳目前的使用者快照。登出的 `action` 呼叫 `signOut` 再 `redirect('/')`。

根路由補上 `id: 'root'`、`rootLoader`，並加上 `/logout`。

```jsx 07-project-final/src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router';
import { logoutAction, logoutLoader, rootLoader } from './auth.js';
import SiteLayout from './layout/SiteLayout.jsx';
import HomePage, { loader as homeLoader } from './features/home/HomePage.jsx';
import ToursPage, {
  loader as toursLoader,
} from './features/tours/ToursPage.jsx';
import TourDetailPage, {
  loader as tourLoader,
} from './features/tours/TourDetailPage.jsx';
import BookingPage, {
  action as bookingAction,
  loader as bookingLoader,
} from './features/booking/BookingPage.jsx';
import BookingResultPage, {
  loader as bookingResultLoader,
} from './features/booking/BookingResultPage.jsx';
import MyBookingsPage, {
  loader as myBookingsLoader,
} from './features/booking/MyBookingsPage.jsx';
import AboutPage from './features/about/AboutPage.jsx';
import LoginPage, {
  action as loginAction,
  loader as loginLoader,
} from './features/auth/LoginPage.jsx';
import SeedPage, {
  action as seedAction,
  loader as seedLoader,
} from './features/admin/SeedPage.jsx';
import AdminLoginPage, {
  action as adminLoginAction,
  loader as adminLoginLoader,
} from './features/admin/AdminLoginPage.jsx';
import AdminToursPage, {
  action as adminToursAction,
  loader as adminToursLoader,
} from './features/admin/AdminToursPage.jsx';
import AdminBookingsPage, {
  action as adminBookingsAction,
  loader as adminBookingsLoader,
} from './features/admin/AdminBookingsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RouteErrorPage from './pages/RouteErrorPage.jsx';

const router = createBrowserRouter([
  {
    id: 'root',
    loader: rootLoader,
    Component: SiteLayout,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, loader: homeLoader, Component: HomePage },
          { path: 'tours', loader: toursLoader, Component: ToursPage },
          { path: 'tours/:id', loader: tourLoader, Component: TourDetailPage },
          {
            path: 'booking',
            loader: bookingLoader,
            action: bookingAction,
            Component: BookingPage,
          },
          {
            path: 'booking/:id',
            loader: bookingResultLoader,
            Component: BookingResultPage,
          },
          { path: 'me', loader: myBookingsLoader, Component: MyBookingsPage },
          { path: 'about', Component: AboutPage },
          {
            path: 'login',
            loader: loginLoader,
            action: loginAction,
            Component: LoginPage,
          },
          {
            path: 'seed',
            loader: seedLoader,
            action: seedAction,
            Component: SeedPage,
          },
          {
            path: 'admin/login',
            loader: adminLoginLoader,
            action: adminLoginAction,
            Component: AdminLoginPage,
          },
          {
            path: 'admin',
            loader: adminToursLoader,
            action: adminToursAction,
            Component: AdminToursPage,
          },
          {
            path: 'admin/bookings',
            loader: adminBookingsLoader,
            action: adminBookingsAction,
            Component: AdminBookingsPage,
          },
          { path: 'logout', loader: logoutLoader, action: logoutAction },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**解析**

- 頁首稍後用 `useRouteLoaderData('root')` 讀這份結果。`/logout` 的 `loader` 把直接打開這個網址的人送回首頁，`action` 才真正登出。

頁首改讀根路由的使用者，並加上登出。後台選單仍沿用第 12 篇那份 `SiteHeader` 的切換：`pathname.startsWith('/admin')` 決定站名與導覽。

```jsx 07-project-final/src/layout/components/SiteHeader.jsx
import { useState } from 'react';
import {
  Link,
  NavLink,
  useFetcher,
  useLocation,
  useRouteLoaderData,
} from 'react-router';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SiteNav from './SiteNav.jsx';
import Icon from '../../_shared/Icon.jsx';

const item = ({ isActive }) =>
  `inline-flex min-h-11 items-center rounded-full px-3 font-bold ${isActive ? 'bg-action text-white' : 'text-ink hover:bg-mist'}`;

export default function SiteHeader() {
  const { user } = useRouteLoaderData('root');
  const fetcher = useFetcher();
  const { pathname } = useLocation();
  const admin = pathname.startsWith('/admin');
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const close = () => {
    setOpen(false);
    setAnchor(null);
  };
  const logout = () => {
    close();
    fetcher.submit({ intent: 'logout' }, { method: 'post', action: '/logout' });
  };
  const session = admin ? user?.provider === 'password' : Boolean(user);
  const label = user?.displayName || user?.email || '';

  const account = (extra = '') =>
    session ? (
      <Button
        type="button"
        aria-expanded={Boolean(anchor)}
        onClick={(event) => setAnchor(event.currentTarget)}
        className={`gap-2 text-ink ${extra}`}
      >
        <Avatar className="h-8 w-8 bg-action text-base font-bold text-white">
          {label.slice(0, 1).toUpperCase()}
        </Avatar>
        {label}
      </Button>
    ) : (
      <Button
        component={Link}
        to={admin ? '/admin/login' : '/login'}
        onClick={close}
      >
        {admin ? '後台登入' : '登入'}
      </Button>
    );

  const links = (id) =>
    admin ? (
      <nav id={id} className="flex flex-col gap-1 md:flex-row md:items-center">
        <NavLink to="/admin" end className={item} onClick={close}>
          行程管理
        </NavLink>
        <NavLink to="/admin/bookings" className={item} onClick={close}>
          報名清單
        </NavLink>
      </nav>
    ) : (
      <SiteNav onNavigate={close} id={id} />
    );

  return (
    <AppBar id="site-header" position="sticky" component="header">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link
          to={admin ? '/admin' : '/'}
          className="font-serif text-2xl font-semibold text-ink"
        >
          {admin ? '洛奇旅行 · 後台' : '洛奇旅行'}
        </Link>
        <Button
          id="nav-toggle"
          className="md:hidden"
          variant="outlined"
          startIcon={<Icon name="menu" />}
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
        >
          選單
        </Button>
        <div className="hidden items-center gap-1 md:flex">
          {links('site-nav')}
          {account()}
        </div>
      </div>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        {admin ? null : (
          <MenuItem component={Link} to="/me" onClick={close}>
            我的報名
          </MenuItem>
        )}
        <MenuItem onClick={logout}>登出</MenuItem>
      </Menu>
      <Drawer anchor="right" open={open} onClose={close}>
        <div id="site-drawer" className="flex flex-col gap-2 p-4">
          {links(undefined)}
          {account('justify-start')}
        </div>
      </Drawer>
    </AppBar>
  );
}
```

**解析**

- 頁首在前台看有沒有 `user`，在 `/admin` 底下還要求 `provider === 'password'`。未登入時的按鈕仍依路徑顯示「登入」或「後台登入」。
- 登出是對 `/logout` 的 `fetcher` POST，不先換頁；網址留在原處，直到 `redirect` 把人送回首頁。

前台登入頁的按鈕改成這條路由的 `Form`。

```jsx 07-project-final/src/features/auth/LoginPage.jsx
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { safeNext, session } from '../../auth.js';
import { auth, missingFirebaseMessage } from '../../firebase.js';

export const loader = async ({ request }) => {
  const current = await session();
  if (!current.firebaseReady) return current;
  if (current.user) {
    const next = new URL(request.url).searchParams.get('next');
    throw redirect(safeNext(next));
  }
  return current;
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const next = safeNext(String(form.get('next') ?? ''));
  if (!auth) return { error: missingFirebaseMessage };
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    return redirect(next);
  } catch (err) {
    const closed =
      err.code === 'auth/popup-closed-by-user' ||
      err.code === 'auth/cancelled-popup-request';
    return {
      error: closed
        ? '已關閉登入視窗。'
        : err.code === 'auth/popup-blocked'
          ? '瀏覽器擋住了登入視窗。'
          : err.message,
    };
  }
};

export default function LoginPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const [params] = useSearchParams();
  const back = safeNext(params.get('next'));
  const submitting =
    navigation.state === 'submitting' &&
    new URL(navigation.formAction, 'http://localhost').pathname === '/login';

  return (
    <main className="flex-1">
      <title>用 Google 帳號繼續 · 洛奇旅行</title>
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
          {actionData?.error ? (
            <Alert className="mt-4" severity="error">
              {actionData.error}
            </Alert>
          ) : null}
        </DialogContent>
        <Form method="post">
          <input type="hidden" name="next" value={back} />
          <DialogActions className="flex flex-col items-stretch gap-3 px-6 pb-6">
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? '登入中…' : '用 Google 帳號繼續'}
            </Button>
            <Button type="button" onClick={() => navigate('/')}>
              返回首頁
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </main>
  );
}
```

**解析**

- Google 視窗由 `signInWithPopup` 打開。取消或失敗時 `action` 回傳錯誤，`useActionData` 顯示在對話框裡。成功後 `redirect` 到 `next`。頁面沒有在 effect 裡 `navigate`。

報名頁的 `loader` 先 `requireUser`。

```jsx 07-project-final/src/features/booking/BookingPage.jsx
import { data, redirect, useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingForm from './components/BookingForm.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import { createOrder, getTour } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { requireUser } from '../../auth.js';
import { missingFirebaseMessage } from '../../firebase.js';

export const loader = async ({ request }) => {
  const gate = await requireUser(request);
  if (!gate.firebaseReady)
    return { firebaseReady: false, tour: null, departure: null, user: null };
  const url = new URL(request.url);
  const tour = await getTour(
    url.searchParams.get('tourId') || 'hualien-taroko',
  );
  const departure =
    tour?.departures?.find(
      (item) => item.id === url.searchParams.get('departureId'),
    ) || tour?.departures?.[0];
  if (!tour || !departure) throw data('找不到頁面', { status: 404 });
  return { firebaseReady: true, tour, departure, user: gate.user };
};

export const action = async ({ request }) => {
  const gate = await requireUser(request);
  if (!gate.firebaseReady) return { error: missingFirebaseMessage };
  const form = await request.formData();
  const phone = String(form.get('phone') ?? '').trim();
  const name = gate.user.displayName || '';
  const email = gate.user.email || '';
  if (!name.trim() || !email.includes('@') || !phone)
    return {
      error:
        name.trim() && email.includes('@')
          ? '請填電話'
          : '請確認 Google 帳號帶有姓名與 email，並填電話',
    };
  const row = await createOrder({
    uid: gate.user.uid,
    tourId: String(form.get('tourId')),
    tourTitle: String(form.get('tourTitle')),
    departureId: String(form.get('departureId')),
    date: String(form.get('date')),
    people: Number(form.get('people')),
    name: name.trim(),
    email: email.trim(),
    phone,
    subtotal: Number(form.get('subtotal')),
  });
  return redirect(`/booking/${row.id}`);
};

export default function BookingPage() {
  const { firebaseReady: ready, tour, departure, user } = useLoaderData();
  if (!ready) return <MissingFirebase />;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名 · 洛奇旅行</title>
      <BookingSteps activeStep={1} />
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        姓名與 email 來自 Google 帳號。請留下電話，送出後會寫進訂單。
      </p>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
        <BookingForm tour={tour} departure={departure} user={user} />
        <BookingSummary tour={tour} departure={departure} />
      </div>
    </main>
  );
}
```

**解析**

- 未登入會被帶到 `/login?next=...`。`action` 呼叫 `createOrder`，帶上 `uid`，再 `redirect` 到 `/booking/${id}`。

報名表的姓名與 email 改成唯讀。

```jsx 07-project-final/src/features/booking/components/BookingForm.jsx
import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

export default function BookingForm({ tour, departure, user }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [people, setPeople] = useState('2');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const name = user?.displayName || '';
  const email = user?.email || '';
  const subtotal = tour.price * Number(people);
  const error = actionData?.error ?? '';
  const submitting =
    navigation.state === 'submitting' &&
    new URL(navigation.formAction, 'http://localhost').pathname === '/booking';

  return (
    <Form
      id="booking-form"
      method="post"
      replace
      noValidate
      className="rounded-card bg-white shadow-card grid gap-4 p-6 md:p-8"
      onSubmit={() => setSubmitted(true)}
    >
      <Typography variant="h2">填寫資料</Typography>
      <input type="hidden" name="tourId" value={tour.id} />
      <input type="hidden" name="tourTitle" value={tour.title} />
      <input type="hidden" name="departureId" value={departure.id} />
      <input type="hidden" name="date" value={departure.date} />
      <input type="hidden" name="people" value={people} />
      <input type="hidden" name="subtotal" value={subtotal} />
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
        name="phone"
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
      <Button type="submit" variant="contained" disabled={submitting}>
        {submitting ? '送出中…' : '送出報名'}
      </Button>
    </Form>
  );
}
```

**解析**

- 這兩個欄位來自 `loader` 的使用者。電話仍手填；空著時 `action` 回傳「請填電話，此欄必填」。

完成頁改讀 Firestore 的訂單。

```jsx 07-project-final/src/features/booking/BookingResultPage.jsx
import { data, Link, useLoaderData } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import BookingReceipt from './components/BookingReceipt.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import { getOrder } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { requireUser } from '../../auth.js';
import { statusLabel } from '../../format.js';

export const loader = async ({ request, params }) => {
  const gate = await requireUser(request);
  if (!gate.firebaseReady) return { firebaseReady: false, row: null };
  const row = await getOrder(params.id).catch(() => null);
  if (!row || row.uid !== gate.user.uid)
    throw data('找不到頁面', { status: 404 });
  return { firebaseReady: true, row };
};

export default function BookingResultPage() {
  const { firebaseReady: ready, row } = useLoaderData();
  if (!ready) return <MissingFirebase />;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名已送出 · 洛奇旅行</title>
      <BookingSteps activeStep={2} />
      <Chip color="primary" label={statusLabel[row.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">
        報名已送出
      </Typography>
      <Alert className="mt-4 max-w-prose" severity="success">
        我們會用 email 再跟你確認。到「我的報名」可以查看這一筆。
      </Alert>
      <BookingReceipt row={row} />
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

**解析**

- `loader` 用 `getOrder`。文件不存在就丟 404，由 `RouteErrorPage` 畫找不到頁。

明細跟著改讀這一筆訂單。

```jsx 07-project-final/src/features/booking/components/BookingReceipt.jsx
import Typography from '@mui/material/Typography';
import { ntd, statusLabel } from '../../../format.js';

export default function BookingReceipt({ row }) {
  return (
    <>
      <Typography variant="h2" className="mt-10">
        這筆內容
      </Typography>
      <dl className="rounded-card bg-white shadow-card mt-4 max-w-prose divide-y divide-line px-5">
        {[
          ['行程', row.tourTitle],
          ['出發日', row.date],
          ['人數', row.people],
          ['姓名', row.name],
          ['電話', row.phone],
          ['小計', ntd(row.subtotal)],
          ['狀態', statusLabel[row.status] || row.status],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr]">
            <dt className="text-muted">{label}</dt>
            <dd
              className={
                label === '小計'
                  ? 'font-serif text-2xl font-bold text-action'
                  : undefined
              }
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
```

**解析**

- 欄位仍是行程、出發日、聯絡人與金額，來源改成 `loader` 拿到的訂單文件。

我的報名改列這位使用者的訂單。

```jsx 07-project-final/src/features/booking/MyBookingsPage.jsx
import { Link, useLoaderData } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MyBookingRow from './components/MyBookingRow.jsx';
import { listMyOrders } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { requireUser } from '../../auth.js';

export const loader = async ({ request }) => {
  const gate = await requireUser(request);
  if (!gate.firebaseReady) return { firebaseReady: false, rows: [] };
  return {
    firebaseReady: true,
    rows: await listMyOrders(gate.user.uid),
  };
};

export default function MyBookingsPage() {
  const { firebaseReady: ready, rows } = useLoaderData();
  if (!ready) return <MissingFirebase />;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>我的報名 · 洛奇旅行</title>
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
```

**解析**

- `loader` 先 `requireUser`，再呼叫 `listMyOrders(uid)`，不再讀 `mySamples`。

報名種子補上 `uid`，對應 Firestore 訂單的欄位。`mySamples` 仍留在檔裡，但我的報名已改讀 `listMyOrders`，不再 import 它。

```js 07-project-final/src/features/booking/mock.data.js
/** 後台清單。姓名與「我的報名」範例不一致，兩頁各自照靜態模板。 */
export const bookings = [
  {
    id: 'b1',
    tourId: 'hualien-taroko',
    tourTitle: '花蓮太魯閣與七星潭四日',
    departureId: '2026-12-18',
    date: '2026-12-18',
    people: 2,
    name: '林可',
    email: 'lin@example.com',
    phone: '0912000111',
    subtotal: 53600,
    uid: 'demo-lin',
    status: 'pending',
  },
  {
    id: 'b2',
    tourId: 'kyoto-nara',
    tourTitle: '京都嵐山、伏見與奈良五日',
    departureId: '2027-04-06',
    date: '2027-04-06',
    people: 1,
    name: '陳予安',
    email: 'chen@example.com',
    phone: '0912000222',
    subtotal: 52800,
    uid: 'demo-chen',
    status: 'confirmed',
  },
  {
    id: 'b3',
    tourId: 'tainan-anping',
    tourTitle: '台南府城與安平兩日',
    departureId: '2026-11-28',
    date: '2026-11-28',
    people: 3,
    name: '周以寧',
    email: 'chou@example.com',
    phone: '0912000333',
    subtotal: 26400,
    uid: 'demo-chou',
    status: 'cancelled',
  },
  {
    id: 'b4',
    tourId: 'taipei-beitou',
    tourTitle: '台北大稻埕與北投溫泉三日',
    departureId: '2026-12-04',
    date: '2026-12-04',
    people: 2,
    name: '何品',
    email: 'ho@example.com',
    phone: '0912000444',
    subtotal: 37200,
    uid: 'demo-ho',
    status: 'confirmed',
  },
];

/** 我的報名頁照模板：四筆都掛在林可底下，不匯入後台種子。 */
export const mySamples = [
  {
    status: 'pending',
    title: '花蓮太魯閣與七星潭四日',
    date: '2026-12-18',
    people: 2,
    phone: '0912000111',
    subtotal: 53600,
  },
  {
    status: 'confirmed',
    title: '京都嵐山、伏見與奈良五日',
    date: '2027-04-06',
    people: 1,
    phone: '0912000222',
    subtotal: 52800,
  },
  {
    status: 'cancelled',
    title: '台南府城與安平兩日',
    date: '2026-11-28',
    people: 3,
    phone: '0912000333',
    subtotal: 26400,
  },
  {
    status: 'confirmed',
    title: '台北大稻埕與北投溫泉三日',
    date: '2026-12-04',
    people: 2,
    phone: '0912000444',
    subtotal: 37200,
  },
];
```

**解析**

- 後台那四筆種子補上 `uid`。`mySamples` 還在同一份檔裡，但我的報名不會再 import 它。

# 管理員、規則與部署

前台已經能讀行程、能以 Google 帳號寫自己的訂單。這一節補上 email／密碼登入，後台清單改讀 Firestore，最後貼上安全規則，並把網站部署到 Firebase Hosting。

## 登入與受保護畫面

後台登入頁的 `action` 呼叫 `signInWithEmailAndPassword`，成功後 `redirect('/admin')`。行程管理與報名清單的 `loader` 都呼叫 `requireAdmin`。沒有設定 Firebase 時頁面畫 `MissingFirebase`。已登入但不是密碼時畫 `AdminDenied`，並留一顆到 `/admin/login` 的按鈕。

行程的新增、修改與刪除仍是列表上的對話框。`useFetcher` 把表單送到這一條路由的 `action`，網址留在 `/admin`。`saveTour` 與 `deleteTour` 寫進 `tours`。

先接後台登入頁。

```jsx 07-project-final/src/features/admin/AdminLoginPage.jsx
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { session } from '../../auth.js';
import { auth, missingFirebaseMessage } from '../../firebase.js';

export const loader = async () => {
  const current = await session();
  if (current.user?.provider === 'password') throw redirect('/admin/bookings');
  return current;
};

export const action = async ({ request }) => {
  const form = await request.formData();
  if (!auth) return { error: missingFirebaseMessage };
  try {
    await signInWithEmailAndPassword(
      auth,
      String(form.get('email') ?? '').trim(),
      String(form.get('password') ?? ''),
    );
    return redirect('/admin/bookings');
  } catch (err) {
    return {
      error:
        err.code === 'auth/invalid-credential'
          ? 'email 或密碼不對。請用主控台建立的那一組。'
          : err.message,
    };
  }
};

export default function AdminLoginPage() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const submitting =
    navigation.state === 'submitting' &&
    new URL(navigation.formAction, 'http://localhost').pathname ===
      '/admin/login';

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24">
      <title>後台登入 · 洛奇旅行</title>
      <Paper
        elevation={0}
        className="rounded-card bg-white shadow-card max-w-md p-6 md:p-8"
      >
        <Form method="post" className="grid gap-4">
          <Typography variant="h1">後台登入</Typography>
          <p className="text-lg leading-relaxed">
            使用主控台建立的 email 與密碼。網站上沒有註冊表單。
          </p>
          <TextField
            name="email"
            label="Email"
            type="email"
            autoComplete="username"
            required
          />
          <TextField
            name="password"
            label="密碼"
            type="password"
            autoComplete="current-password"
            required
          />
          {actionData?.error ? (
            <Alert severity="error">{actionData.error}</Alert>
          ) : null}
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? '登入中…' : '登入'}
          </Button>
        </Form>
      </Paper>
    </main>
  );
}
```

**解析**

- 登入表單沒有 effect。錯誤訊息來自 `useActionData`，送出中用 `useNavigation` 停用按鈕。成功後 `redirect('/admin')`。

行程管理的 `loader` 改呼叫 `requireAdmin`，寫入改走 Firestore。

```jsx 07-project-final/src/features/admin/AdminToursPage.jsx
import { useState } from 'react';
import { Link, useFetcher, useLoaderData } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteTourDialog from './components/DeleteTourDialog.jsx';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import NoticeSnackbar from '../../_shared/NoticeSnackbar.jsx';
import { tourFromDraft } from './components/tourDraft.js';
import { deleteTour, listTours, saveTour } from '../../api.js';
import { AdminDenied, MissingFirebase } from '../../AccessNotice.jsx';
import { requireAdmin } from '../../auth.js';
import { missingFirebaseMessage } from '../../firebase.js';

const gateOr = async (request) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady) return { error: missingFirebaseMessage };
  if (gate.denied) return { error: '這個帳號不能進入後台。' };
  return null;
};

export const loader = async ({ request }) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady || gate.denied)
    return {
      firebaseReady: gate.firebaseReady,
      denied: Boolean(gate.denied),
      tours: [],
    };
  return {
    firebaseReady: true,
    denied: false,
    tours: await listTours(),
  };
};

export const action = async ({ request }) => {
  const blocked = await gateOr(request);
  if (blocked) return blocked;
  const form = await request.formData();
  if (form.get('intent') === 'delete') {
    await deleteTour(String(form.get('id')));
    return { notice: '已刪除這筆行程' };
  }
  const editingId = String(form.get('editingId') ?? '');
  const { error, tour } = tourFromDraft(JSON.parse(String(form.get('draft'))));
  if (error) return { error };
  await saveTour(editingId, tour);
  return { notice: '已儲存這筆行程', saved: true };
};

export default function AdminToursPage() {
  const { firebaseReady: ready, denied, tours } = useLoaderData();
  const remove = useFetcher();
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(null);
  const [deletingTour, setDeletingTour] = useState(null);
  const [notice, setNotice] = useState('');
  const [seenRemove, setSeenRemove] = useState(null);
  if (
    remove.state === 'idle' &&
    remove.data?.notice &&
    remove.data !== seenRemove
  ) {
    setSeenRemove(remove.data);
    setDeletingTour(null);
    setNotice(remove.data.notice);
  }
  if (!ready) return <MissingFirebase />;
  if (denied) return <AdminDenied />;

  const close = () => setOpen(false);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>行程管理 · 洛奇旅行</title>
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        行程管理
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        新增、修改或下架行程。清單來自
        Firestore。還沒有資料時，先寫入種子。兩頁用頁首切換。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="outlined"
          onClick={() => {
            setTour(null);
            setOpen(true);
          }}
        >
          新增行程
        </Button>
        <Button component={Link} to="/seed" variant="outlined">
          寫入種子
        </Button>
      </div>
      {tours.length ? (
        <TourTable
          tours={tours}
          onEdit={(item) => {
            setTour(item);
            setOpen(true);
          }}
          onDelete={setDeletingTour}
        />
      ) : (
        <p className="mt-8 text-base text-muted">還沒有行程。</p>
      )}
      <TourForm
        key={open ? (tour?.id ?? 'create') : 'closed'}
        open={open}
        tour={tour}
        onClose={close}
        onNotice={setNotice}
      />
      <DeleteTourDialog
        tour={deletingTour}
        busy={remove.state !== 'idle'}
        onClose={() => setDeletingTour(null)}
        onConfirm={() =>
          remove.submit(
            { intent: 'delete', id: deletingTour.id },
            { method: 'post' },
          )
        }
      />
      <NoticeSnackbar notice={notice} onClose={() => setNotice('')} />
    </main>
  );
}
```

**解析**

- `requireAdmin` 先經過 `requireUser`。未登入的人會離開這個網址；登入方式不對的人留在原頁，看到警告。
- 刪除用 `fetcher.submit`，帶 `intent: 'delete'`。儲存由 `TourForm` 裡的 `fetcher` 送出草稿。成功後 `loader` 再讀清單，提示仍由頁面的 `notice` 交給 `NoticeSnackbar`。

## 訂單清單與狀態

報名清單的 `loader` 呼叫 `listOrders`。改狀態的 `action` 呼叫 `updateOrderStatus`。對話框用 `useFetcher` 留在 `/admin/bookings`。訂單沒有實體刪除，狀態改成已取消就從作業流程拿掉，文件還在。

```jsx 07-project-final/src/features/admin/AdminBookingsPage.jsx
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingFilters from './components/BookingFilters.jsx';
import BookingTable from './components/BookingTable.jsx';
import BookingForm from './components/BookingForm.jsx';
import NoticeSnackbar from '../../_shared/NoticeSnackbar.jsx';
import { listOrders, updateOrderStatus } from '../../api.js';
import { AdminDenied, MissingFirebase } from '../../AccessNotice.jsx';
import { requireAdmin } from '../../auth.js';
import { missingFirebaseMessage } from '../../firebase.js';

export const loader = async ({ request }) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady || gate.denied)
    return {
      firebaseReady: gate.firebaseReady,
      denied: Boolean(gate.denied),
      bookings: [],
    };
  return {
    firebaseReady: true,
    denied: false,
    bookings: await listOrders(),
  };
};

export const action = async ({ request }) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady) return { error: missingFirebaseMessage };
  if (gate.denied) return { error: '這個帳號不能進入後台。' };
  const form = await request.formData();
  try {
    await updateOrderStatus(String(form.get('id')), String(form.get('status')));
    return { notice: '已更新報名狀態' };
  } catch (err) {
    return { error: err.message };
  }
};

export default function AdminBookingsPage() {
  const { firebaseReady: ready, denied, bookings } = useLoaderData();
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('date-desc');
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(null);
  const [notice, setNotice] = useState('');
  if (!ready) return <MissingFirebase />;
  if (denied) return <AdminDenied />;

  const keyword = query.trim();
  const shown = bookings
    .filter((item) => status === 'all' || item.status === status)
    .filter((item) => !keyword || item.name?.includes(keyword))
    .sort((a, b) =>
      sort === 'date-asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date),
    );

  const close = () => setOpen(false);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名清單 · 洛奇旅行</title>
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        報名清單
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        查看所有訂單，點一筆看明細並改狀態。兩頁用頁首切換。
      </p>
      <BookingFilters
        status={status}
        query={query}
        sort={sort}
        onStatusChange={setStatus}
        onQueryChange={setQuery}
        onSortChange={setSort}
      />
      {shown.length ? (
        <BookingTable
          bookings={shown}
          onView={(item) => {
            setBooking(item);
            setOpen(true);
          }}
        />
      ) : (
        <p className="mt-8 text-base text-muted">沒有符合的報名。</p>
      )}
      <BookingForm
        key={open ? booking.id : 'closed'}
        open={open}
        booking={booking}
        onClose={close}
        onNotice={setNotice}
      />
      <NoticeSnackbar notice={notice} onClose={() => setNotice('')} />
    </main>
  );
}
```

**解析**

- 篩選、搜尋與排序仍在瀏覽器裡做，對的是 `loader` 已經拿回來的陣列。
- 狀態送出後 `loader` 重跑，列表換成雲端上的新狀態。提示文字留在頁面的 `notice`。
- 這一頁同樣先看 `firebaseReady` 與 `denied`，沒有通過就不會呼叫 `listOrders`。

## 安全規則與 Firebase Hosting

規則是伺服器上的判斷，跟 React 的閘門各寫一次。閘門決定畫不畫。規則決定 SDK 的請求過不過。這一節的規則全文只放在 `firestore.rules`，主控台貼上同一份，不要在別處再寫一套。

### 步驟 1：貼上規則

`tours` 任何人可讀，管理員可寫。種子與後台表單都走這條規則，所以要先用後台帳號登入再寫入。`orders` 的新增要已登入，而且新文件的 `uid` 等於 `request.auth.uid`，`status` 是 `pending`，姓名、email、電話是字串，人數是 1 到 8 的整數。讀取限文件主人或密碼登入的管理員。更新只限管理員。刪除不開放；把狀態改為已取消就是訂單的軟刪。

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
      allow write: if isAdmin();
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
- Google 登入者打不開 `/admin` 的表單，也打不開 `/admin/bookings` 的清單。email／密碼登入後可以新增、修改、刪除行程，也看得到全部訂單並能改狀態。
- `/me` 只列出自己的 `uid`。未登入或 Google 登入時，`/seed` 會失敗；後台帳號登入後可以寫入種子。

{% mermaid graph TD %}
  guest["未登入"] --> readTours["可讀 tours"]
  guest --> deny["不可寫 tours、不可讀 orders"]
  google["google.com"] --> own["可新增自己的 uid，可讀自己的訂單"]
  google --> denyAdmin["不可寫 tours、不可讀全部、不可改狀態"]
  password["password"] --> writeTours["可寫 tours"]
  password --> all["可讀全部訂單，可改狀態"]
{% endmermaid %}

**解析**

- `allow write` 涵蓋建立、更新與刪除。行程公開可讀，寫入限 `isAdmin()`。訂單的 `delete` 仍是 `false`，因為訂單是帳務紀錄，改為已取消即軟刪。
- `isOwner` 比對文件上的 `uid` 與 `request.auth.uid`。`isAdmin` 再要求 `sign_in_provider == 'password'`。
- `request.auth` 是 Authentication 帶上來的身分。沒登入時是 `null`。Google 登入時它不是 `null`，所以不能再用「有登入」代表管理員。
- 新增時多檢查 `status`、姓名、email、電話與人數。表單仍先擋空的電話。規則擋的是直接呼叫 SDK 的請求。

### 步驟 2：部署到 Firebase Hosting

第 12 篇用 Live Server 打開 `dist/` 時，內頁重新整理會拿到伺服器自己的 404，因為磁碟上沒有 `/tours` 這種實體路徑。React 網站只有 `index.html` 一張進入點，內頁的網址是前端路由。Firebase Hosting 用轉送把任意路徑都交給 `index.html`，由前端路由接著畫，這就是 SPA 要的設定。

在專案根目錄加上 `firebase.json`。`public` 指向打包後的 `dist`。`rewrites` 把所有路徑轉到 `/index.html`。

```json 07-project-final/firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**解析**

- `public` 是 Hosting 對外提供的目錄，必須是 `pnpm build` 產出的 `dist/`，不是 `src/`。
- `rewrites` 的 `source` 是 `**`，`destination` 是 `/index.html`。無論是 `/tours` 還是 `/booking/某段 id`，Hosting 都回這張進入點，不會先回 404。
- 忽略清單把設定檔、隱藏檔與 `node_modules` 排除在上傳之外。`.env.local` 本來就不會進 `dist/`，發布前仍要確認它沒有被 commit。

第 12 篇打包後的 JS 超過 500 kB，終端機會出現體積警告。這一節把 React、MUI 與 Firebase 拆成獨立檔，畫面不變。Firebase 那包大約 570 kB，`chunkSizeWarningLimit` 只把警告門檻調到 600，不改變檔案內容。金鑰在建置當下寫進這包。要發布能連線的版本，就在填好 `.env.local` 的電腦上執行 `pnpm build`。

```diff 07-project-final/vite.config.js
 export default defineConfig({
   plugins: [
     react(),
     babel({ presets: [reactCompilerPreset()] }),
     tailwindcss(),
   ],
   server: { host: 'localhost' },
   preview: { host: 'localhost' },
+  build: {
+    chunkSizeWarningLimit: 600,
+    rolldownOptions: {
+      output: {
+        codeSplitting: {
+          groups: [
+            {
+              test: /node_modules\/(?:react-dom|react-router|\/react\/)/,
+              name: 'react',
+            },
+            {
+              test: /node_modules\/(?:@mui|@emotion)/,
+              name: 'mui',
+            },
+            {
+              test: /node_modules\/firebase/,
+              name: 'firebase',
+            },
+          ],
+        },
+      },
+    },
+  },
 });
```

**解析**

- `rolldownOptions` 的 `codeSplitting` groups 只拆檔。畫面與規則都不會因為拆檔改變。React、MUI、Firebase 會變成 `dist/assets/` 裡分開的 JS。
- 警告門檻設在 `vite.config.js` 這一處。Firebase 那包大約 570 kB，所以門檻調到 600。

設定改好之後，再打包一次。

```bash
pnpm build
```

**解析**

- 要發布能連線的版本，就在填好 `.env.local` 的電腦上執行 `pnpm build`。空的環境變數也能建置成功，那種產物打開後，行程頁會顯示尚未設定。

終端機會印出類似下面的內容。檔名後面的雜湊會隨內容改變。

```
vite v8.3.5 building client environment for production...
transforming...
✓ 753 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                             1.28 kB │ gzip:   0.59 kB
dist/assets/index-DN8BqvV-.css             26.99 kB │ gzip:   5.87 kB
dist/assets/rolldown-runtime-WkwZ5CU-.js    0.59 kB │ gzip:   0.36 kB
dist/assets/index-tv_4qAQo.js              67.89 kB │ gzip:  19.56 kB
dist/assets/react-DvrgipTh.js             304.79 kB │ gzip:  96.20 kB
dist/assets/mui-HmigsoZj.js               314.62 kB │ gzip:  95.16 kB
dist/assets/firebase-D9Cpe2Kg.js          569.15 kB │ gzip: 170.61 kB

✓ built in 521ms
```

**解析**

- React、MUI、Firebase 會變成 `dist/assets/` 裡分開的 JS。檔名後面的雜湊會隨內容改變。

若專案根目錄還沒有 `.firebaserc`，先用 Firebase CLI 對到這個專案，再部署：

```bash
firebase deploy
```

**解析**

- `dist/` 已在 `.gitignore`。要更新線上網站時，先 `pnpm build` 再 `firebase deploy`，不要把 `node_modules` 推進去。
- 授權網域預設包含 `localhost`。發布後若使用 Firebase 給的網域或自訂網域，再把那個網域加進 Authentication 的授權網域。

# 本篇重點回顧

- 前台用 `signInWithPopup` 做 Google 登入。訂單寫入 `uid`。`/me` 用 `where('uid', '==', user.uid)` 讀自己的訂單。
- 後台用 `signInWithEmailAndPassword`。管理員帳號在主控台手動新增。網站沒有 email 註冊表單。
- 主控台啟用「Google」與「電子郵件／密碼」。不要啟用電話。不要升級 Identity Platform。
- Firebase 的網頁設定放在 `.env.local`，以 `VITE_` 開頭。範例檔是 `.env.example`。金鑰不要 commit。
- `src/api.js` 集中 Firestore 讀寫。頁面用 `loader` 與 `useLoaderData` 接結果，非預期錯誤進 `errorElement`。讀取中由 `useNavigation` 顯示在版型裡。
- `/seed` 把 `mock.data.js` 寫進 `tours`，`loader` 要求管理員。已存在的文件略過。Google 帳號只看到說明，不會寫入。
- 未登入進報名或後台時，`loader` 重新導向 `/login?next=...`。密碼以外的帳號留在後台頁，看到警告與按鈕。登出是對 `/logout` 的 POST。
- `firestore.rules` 讓行程公開可讀、管理員可寫。訂單的讀取限主人或密碼登入者，更新只限密碼登入者，刪除不開放；改為已取消即軟刪。
- 完成頁依網址上的訂單 id 呼叫 `getOrder`。讀不到或沒有權限就渲染 `NotFoundPage`。
- 部署使用 Firebase Hosting：`firebase.json` 的 `public` 是 `dist`，`rewrites` 把所有路徑轉到 `/index.html`，內頁重新整理才不會先拿到主機的 404。`rolldownOptions` 的 `codeSplitting` groups 把 React、MUI 與 Firebase 拆檔。連得上雲端的產物，要在有 `.env.local` 的電腦上建置。

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
- 換頁前讀取（loader）
- useLoaderData
- 表單送出（action）
- 導覽狀態（useNavigation）

## 接到畫面

- 查詢快照（query snapshot）
- 文件識別碼（document id）
- 使用者識別碼（uid）
- 彈出視窗登入（signInWithPopup）
- Google 登入（Google sign-in）
- 登入重新導向（redirect to login）
- 根路由資料（useRouteLoaderData）

## 管理員、規則與部署

- 受保護畫面（protected view）
- 工作階段（session）
- 登入提供者（sign_in_provider）
- 密碼登入（password）
- 授權（authorization）
- 軟刪除（soft delete）
- Firebase Hosting
- 轉送（rewrite）
- 程式碼分割（code splitting）
