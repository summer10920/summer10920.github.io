---
title: '[框架課程] React 19 教學（六）- API 串接與 CRUD 操作'
categories:
  - 職訓課程
  - ReactJS
tag:
  - JavaScript 程式設計（假日班）
date: 2025-11-14 13:16:22
hidden: false
---

![](assets/images/banner/react.png)

在現代 Web 開發中，前端應用通常需要與後端伺服器進行資料交換。RESTful API 是現今最常見的 API 設計風格，透過標準的 HTTP 方法（GET、POST、PUT、DELETE）來執行 CRUD（Create、Read、Update、Delete）操作。本章將學習如何使用 React 19 搭配原生 `fetch` API 來串接後端 API，實作完整的資料管理功能。

<!-- more -->

{% note info %}
**本教學使用版本：**
- React 19+
- React Router 7.9.4+
- Vite 6.0+
- Node.js 20+ LTS
- Express.js 4.18+
- SQLite3
{% endnote %}

本章將建立一個「動物園資料管理系統」，包含後端 API 伺服器（Node.js + Express + SQLite）和前端 React 應用，完整實作動物的新增、查詢、更新、刪除功能。

# RESTful API 與 fetch API 基礎

## RESTful API 概念

**REST（Representational State Transfer）** 是一種 API 設計風格，透過標準的 HTTP 方法來操作資源：

| HTTP 方法  | 用途           | 說明                       |
| ---------- | -------------- | -------------------------- |
| **GET**    | Read（讀取）   | 取得資源，不改變伺服器狀態 |
| **POST**   | Create（新增） | 建立新資源                 |
| **PUT**    | Update（更新） | 完整更新資源               |
| **DELETE** | Delete（刪除） | 刪除資源                   |

**RESTful API 的設計原則：**
- 使用名詞表示資源（如 `/api/animals`）
- 使用 HTTP 方法表示操作（GET、POST、PUT、DELETE）
- 使用 HTTP 狀態碼表示結果（200 成功、404 找不到、500 錯誤）
- 使用 JSON 格式傳遞資料

## fetch API 簡介

`fetch` 是瀏覽器原生的 API，不需要安裝任何套件即可使用。它基於 Promise，提供簡潔的語法來發送 HTTP 請求。

**基本語法：**
```javascript
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('錯誤:', error));
```

**使用 async/await：**
```javascript
async function fetchData() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('錯誤:', error);
  }
}
```

## 前後端分離架構

在現代 Web 開發中，前端和後端通常分離開發：

{% mermaid graph LR %}
    A["React 前端<br/>（Port 5173）"]
    B["Express 後端<br/>（Port 3000）"]
    C["SQLite 資料庫<br/>（檔案）"]
    
    A -->|"HTTP 請求<br/>fetch API"| B
    B -->|"SQL 查詢"| C
    C -->|"資料"| B
    B -->|"JSON 回應"| A
    
    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#e8f5e9
{% endmermaid %}

**優勢：**
- 前後端可以獨立開發和部署
- 後端 API 可以被多個前端應用使用（Web、Mobile、Desktop）
- 技術棧可以自由選擇
- 團隊可以分工合作

# 後端實作：Node.js + Express + SQLite

在開始實作前端 API 串接之前，我們需要先建立一個後端伺服器來提供資料。後端伺服器的主要功能是：
- **接收前端發送的 HTTP 請求**（如取得動物列表、新增動物等）
- **與資料庫互動**（儲存、讀取、更新、刪除資料）
- **回傳 JSON 格式的資料**給前端

我們將使用 **Node.js**（JavaScript 的執行環境，讓我們可以在伺服器端執行 JavaScript）、**Express**（簡化 HTTP 伺服器開發的框架）和 **SQLite**（輕量級的檔案型資料庫）來建立後端。

{% note info %}
**為什麼需要後端？**
- 前端應用（React）運行在瀏覽器中，無法直接存取資料庫
- 後端伺服器作為「中間層」，負責處理資料邏輯、驗證、安全性等
- 前端透過 HTTP 請求與後端溝通，後端再與資料庫互動
{% endnote %}

## 專案初始化

### 建立專案資料夾

首先，我們需要在專案根目錄建立一個 `backend` 資料夾，用來存放所有後端相關的程式碼。這樣可以清楚區分前端和後端的檔案。

```bash
mkdir backend
cd backend
```

### 初始化 Node.js 專案

`npm init -y` 指令會自動建立一個 `package.json` 檔案，這個檔案用來記錄專案的資訊（名稱、版本等）和依賴的套件。`-y` 參數表示使用預設值，不需要手動回答問題。

```bash
npm init -y
```

### 安裝必要套件

接下來，我們需要安裝三個主要的套件：

- **express**：Node.js 的 Web 框架，簡化 HTTP 伺服器的建立和路由處理
- **sqlite3**：SQLite 資料庫的 Node.js 驅動程式，讓我們可以用 JavaScript 操作 SQLite 資料庫
- **cors**：處理跨域請求（CORS）的中間件，讓前端可以從不同網域（如 `localhost:5173`）存取後端 API（`localhost:3000`）

```bash
npm install express sqlite3 cors
```

### 安裝開發工具

**nodemon** 是一個開發工具，它會監聽檔案變更，當我們修改程式碼時自動重新啟動伺服器，讓我們在開發時不需要手動重啟。`--save-dev` 表示這是開發時才需要的套件，不會在正式環境中使用。

```bash
npm install --save-dev nodemon
```

### package.json 設定說明

`package.json` 是 Node.js 專案的核心設定檔，記錄了專案的基本資訊和執行腳本：

```json package.json
{
  "name": "zoo-api-backend",
  "version": "1.0.0",
  "type": "module",  // 使用 ES6 模組語法（import/export）
  "scripts": {
    "start": "node server.js",      // 正式環境啟動指令
    "dev": "nodemon server.js"      // 開發環境啟動指令（自動重啟）
  },
  "dependencies": {
    "express": "^4.18.2",    // 正式環境需要的套件
    "sqlite3": "^5.1.6",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"      // 開發環境才需要的套件
  }
}
```

**重要設定說明：**
- `"type": "module"`：讓專案可以使用 ES6 的 `import/export` 語法，而不是舊的 `require/module.exports`
- `"scripts"`：定義快捷指令，執行 `npm run dev` 等同於執行 `nodemon server.js`

## 資料庫設計與初始化

### 什麼是 SQLite？

**SQLite** 是一款輕量級的檔案型關聯式資料庫（Relational Database），與 NoSQL 不同，它支援標準 SQL 語法。SQLite 不需要安裝獨立的伺服器程式，所有資料皆儲存在單一檔案（例如 `zoo.db`）中。這種設計讓 SQLite 非常適合用於小型專案、原型快速開發，以及程式開發與練習教學場景。

**SQLite 的優點：**
- 不需要額外安裝資料庫伺服器
- 資料庫就是一個檔案，容易備份和移動
- 設定簡單，適合初學者
- 效能足夠應付中小型應用

### 資料庫連線設定

我們建立一個 `database.js` 檔案來處理所有資料庫相關的操作。這個檔案的主要目的是：
1. **建立資料庫連線**：連接到 SQLite 資料庫檔案
2. **初始化資料表**：如果資料表不存在，就建立它
3. **插入初始資料**：如果資料表是空的，就插入一些範例資料
4. **提供資料庫操作函式**：讓其他檔案可以方便地操作資料庫

```javascript backend/database.js
// 引入 SQLite3 模組，用來操作 SQLite 資料庫
import sqlite3 from 'sqlite3';
// 引入 util 模組的 promisify 函式，將 callback 風格的函式轉換為 Promise
import { promisify } from 'util';

// 開啟資料庫連線
// './zoo.db' 是資料庫檔案的路徑，如果檔案不存在，SQLite 會自動建立
// 第二個參數是 callback 函式，在連線成功或失敗時執行
const db = new sqlite3.Database('./zoo.db', (err) => {
  if (err) {
    console.error('無法開啟資料庫:', err.message);
  } else {
    console.log('已連接到 SQLite 資料庫');
  }
});

// 將 callback 風格的函式轉換為 Promise
// sqlite3 原本使用 callback 風格（如 db.run(sql, callback)），但我們想使用 async/await
// promisify 可以將這些函式轉換成回傳 Promise 的版本
const dbRun = promisify(db.run.bind(db));   // 執行 INSERT、UPDATE、DELETE
const dbGet = promisify(db.get.bind(db));   // 取得單一筆資料
const dbAll = promisify(db.all.bind(db));   // 取得多筆資料

// 初始化資料表
// 這個函式會在應用程式啟動時執行，確保資料表存在且有初始資料
async function initDatabase() {
  try {
    // 建立動物資料表
    // CREATE TABLE IF NOT EXISTS 表示「如果資料表不存在才建立」
    // 這樣即使重複執行也不會出錯
    await dbRun(`
      CREATE TABLE IF NOT EXISTS animals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  // 主鍵，自動遞增
        name TEXT NOT NULL,                    // 動物名稱，必填
        weight REAL,                           // 體重，浮點數
        description TEXT,                      // 描述，文字
        updatedAt TEXT NOT NULL                // 更新時間，必填
      )
    `);

    // 檢查是否已有資料
    // COUNT(*) 會計算資料表的總筆數
    const count = await dbGet('SELECT COUNT(*) as count FROM animals');
    
    // 如果沒有資料，插入初始資料
    // 這樣第一次啟動時就會有範例資料可以測試
    if (count.count === 0) {
      const now = new Date().toISOString();  // 取得目前的時間（ISO 格式）
      const initialData = [
        ['獅子', 200.5, '草原之王，擁有強壯的體魄和威嚴的外表', now],
        ['大象', 5000.0, '陸地上最大的哺乳動物，擁有長長的鼻子', now],
        ['長頸鹿', 1200.0, '世界上最高的陸生動物，脖子可達 6 公尺', now],
        ['企鵝', 30.0, '不會飛的鳥類，擅長游泳和潛水', now],
        ['熊貓', 150.0, '黑白相間的可愛動物，以竹子為主食', now]
      ];

      // 使用迴圈逐一插入資料
      // ? 是參數化查詢的佔位符，可以防止 SQL 注入攻擊
      for (const [name, weight, description, updatedAt] of initialData) {
        await dbRun(
          'INSERT INTO animals (name, weight, description, updatedAt) VALUES (?, ?, ?, ?)',
          [name, weight, description, updatedAt]
        );
      }
      console.log('已插入初始資料');
    }
  } catch (error) {
    console.error('初始化資料庫失敗:', error);
  }
}

// 執行初始化
// 當這個檔案被載入時，就會執行 initDatabase 函式
initDatabase();

// 匯出資料庫連線和操作函式，讓其他檔案可以使用
export { db, dbRun, dbGet, dbAll };
```

{% note info %}
**資料表欄位說明：**
- `id`：主鍵（Primary Key），每筆資料的唯一識別碼，會自動遞增
- `name`：動物名稱，使用 `TEXT` 型別，`NOT NULL` 表示必填
- `weight`：體重，使用 `REAL` 型別（浮點數），可選
- `description`：描述，使用 `TEXT` 型別，可選
- `updatedAt`：更新時間，記錄資料最後修改的時間，使用 ISO 格式字串儲存

**為什麼使用參數化查詢（? 佔位符）？**
- 防止 SQL 注入攻擊：如果直接拼接字串，惡意使用者可能輸入特殊字元來破壞 SQL 語法
- 自動處理特殊字元：SQLite 會自動處理引號、換行等特殊字元
- 提升效能：SQLite 可以快取編譯後的 SQL 語句
{% endnote %}

## Express 伺服器設定

### 什麼是 Express？

**Express** 是 Node.js 最流行的 Web 框架，它簡化了 HTTP 伺服器的建立過程。如果沒有 Express，我們需要手動處理 HTTP 請求的解析、路由分配等複雜工作。Express 提供了：
- **路由系統**：根據 URL 路徑和方法（GET、POST 等）來處理不同的請求
- **中間件（Middleware）**：在請求處理前後執行的函式，如解析 JSON、處理 CORS 等
- **簡潔的 API**：讓我們可以用幾行程式碼就建立一個功能完整的伺服器

### 建立伺服器主檔案

`server.js` 是後端應用程式的入口檔案，它負責：
1. **建立 Express 應用程式實例**
2. **設定中間件**：處理跨域、解析 JSON 等
3. **設定路由**：將不同的 URL 路徑對應到不同的處理函式
4. **啟動伺服器**：監聽指定的連接埠，等待前端發送請求

```javascript backend/server.js
// 引入 Express 框架
import express from 'express';
// 引入 CORS 中間件，處理跨域請求
import cors from 'cors';
// 引入資料庫連線（雖然這裡只用到 db，但需要確保資料庫已初始化）
import { db } from './database.js';
// 引入動物相關的路由處理
import animalRoutes from './routes/animals.js';

// 建立 Express 應用程式實例
// app 物件代表我們的 Web 應用程式
const app = express();
// 設定伺服器監聽的連接埠
const PORT = 3000;

// 中間件設定
// 中間件會在每個請求到達路由處理函式之前執行
// 它們按照 app.use() 的順序依次執行

// CORS 中間件：允許跨域請求
// 因為前端運行在 localhost:5173，後端在 localhost:3000，屬於不同網域
// 瀏覽器的同源政策會阻擋這種跨域請求，CORS 中間件可以解決這個問題
app.use(cors());

// JSON 解析中間件：將請求體中的 JSON 字串轉換為 JavaScript 物件
// 當前端發送 POST 或 PUT 請求時，資料會放在請求體（body）中
// 這個中間件會自動解析 JSON 格式的請求體，讓我們可以用 req.body 存取
app.use(express.json());

// 路由設定
// app.use() 可以掛載一個路由模組到特定的路徑前綴
// 所有以 /api/animals 開頭的請求，都會交給 animalRoutes 處理
// 例如：GET /api/animals 會由 animalRoutes 中的 router.get('/') 處理
app.use('/api/animals', animalRoutes);

// 根路由：測試伺服器是否正常運行
// 當有人訪問 http://localhost:3000/ 時，會執行這個函式
// req（request）代表客戶端的請求，res（response）代表伺服器的回應
app.get('/', (req, res) => {
  // res.json() 會將物件轉換為 JSON 格式並回傳給客戶端
  res.json({ message: '動物園 API 伺服器運行中' });
});

// 啟動伺服器
// app.listen() 會讓伺服器開始監聽指定連接埠的請求
// 當伺服器成功啟動時，會執行 callback 函式
app.listen(PORT, () => {
  console.log(`伺服器運行在 http://localhost:${PORT}`);
});

// 優雅關閉
// 當使用者按下 Ctrl+C 終止程式時，會觸發 SIGINT 事件
// 我們在這裡關閉資料庫連線，確保資料不會遺失
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('關閉資料庫連線時發生錯誤:', err.message);
    } else {
      console.log('資料庫連線已關閉');
    }
    // 正常結束程式
    process.exit(0);
  });
});
```

{% note info %}
**中間件（Middleware）是什麼？**
中間件是 Express 的核心概念，它是一個函式，會在請求到達路由處理函式之前（或之後）執行。中間件可以：
- 修改請求或回應物件
- 結束請求-回應循環（如驗證失敗時直接回傳錯誤）
- 呼叫下一個中間件（使用 `next()` 函式）

**常見的中間件用途：**
- 解析請求體（JSON、表單資料等）
- 驗證使用者身份
- 記錄請求日誌
- 處理錯誤
- 設定 CORS 標頭
{% endnote %}

## RESTful API 路由實作

### 什麼是路由（Route）？

**路由**是將特定的 URL 路徑和 HTTP 方法（GET、POST 等）對應到處理函式的機制。例如：
- `GET /api/animals` → 取得所有動物
- `POST /api/animals` → 新增動物
- `PUT /api/animals/1` → 更新 ID 為 1 的動物
- `DELETE /api/animals/1` → 刪除 ID 為 1 的動物

我們將所有動物相關的路由放在 `routes/animals.js` 檔案中，這樣可以讓程式碼更有組織，也方便維護。

### 建立路由模組

我們使用 `express.Router()` 建立一個路由模組，然後將不同的 HTTP 方法對應到不同的處理函式。每個處理函式都會：
1. **接收請求**：從 `req` 物件取得前端傳來的資料
2. **處理資料**：與資料庫互動（查詢、新增、更新、刪除）
3. **回傳回應**：透過 `res` 物件回傳 JSON 格式的資料給前端

```javascript backend/routes/animals.js
// 引入 Express 框架
import express from 'express';
// 引入資料庫操作函式
import { dbRun, dbGet, dbAll } from '../database.js';

// 建立路由物件
// Router 是 Express 提供的路由模組，讓我們可以將路由組織成獨立的模組
const router = express.Router();

// GET /api/animals - 取得所有動物
// 這是「讀取」操作，不會改變資料庫的內容
router.get('/', async (req, res) => {
  try {
    // 從資料庫取得所有動物資料
    // ORDER BY id DESC 表示按照 ID 降序排列（最新的在前面）
    const animals = await dbAll('SELECT * FROM animals ORDER BY id DESC');
    
    // 將資料轉換為 JSON 格式並回傳給前端
    // res.json() 會自動設定 Content-Type 為 application/json
    res.json(animals);
  } catch (error) {
    // 如果發生錯誤，回傳 500 狀態碼和錯誤訊息
    // 500 表示伺服器內部錯誤
    res.status(500).json({ error: error.message });
  }
});

// GET /api/animals/:id - 取得單一動物
// :id 是路由參數，代表動物的 ID
// 例如：GET /api/animals/1 會將 1 作為 req.params.id
router.get('/:id', async (req, res) => {
  try {
    // 從 URL 參數中取得動物 ID
    // req.params.id 會取得 URL 中 :id 的值
    const animal = await dbGet('SELECT * FROM animals WHERE id = ?', [req.params.id]);
    
    if (animal) {
      // 如果找到動物，回傳動物資料
      res.json(animal);
    } else {
      // 如果找不到動物，回傳 404 狀態碼
      // 404 表示「找不到資源」
      res.status(404).json({ error: '找不到該動物' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/animals - 新增動物
// 這是「建立」操作，會在資料庫中新增一筆資料
router.post('/', async (req, res) => {
  try {
    // 從請求體中取得前端傳來的資料
    // express.json() 中間件已經將 JSON 字串轉換為 JavaScript 物件
    const { name, weight, description } = req.body;
    
    // 基本驗證：檢查必填欄位
    // 如果名稱是空的或只有空白，回傳 400 錯誤
    // 400 表示「客戶端請求錯誤」（如缺少必要資料）
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: '動物名稱不能為空' });
    }

    // 取得目前的時間，作為更新時間
    const updatedAt = new Date().toISOString();
    
    // 執行 INSERT 語句，新增動物到資料庫
    // result.lastID 會包含剛新增的資料的 ID
    const result = await dbRun(
      'INSERT INTO animals (name, weight, description, updatedAt) VALUES (?, ?, ?, ?)',
      [name.trim(), weight || null, description || null, updatedAt]
    );
    
    // 取得剛新增的動物資料（包含自動產生的 ID）
    const newAnimal = await dbGet('SELECT * FROM animals WHERE id = ?', [result.lastID]);
    
    // 回傳 201 狀態碼和新增的動物資料
    // 201 表示「資源已成功建立」
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/animals/:id - 更新動物
// 這是「更新」操作，會修改資料庫中現有的資料
router.put('/:id', async (req, res) => {
  try {
    // 從請求體中取得要更新的資料
    const { name, weight, description } = req.body;
    
    // 先檢查動物是否存在
    // 如果不存在，就不需要執行更新操作
    const existing = await dbGet('SELECT * FROM animals WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: '找不到該動物' });
    }

    // 基本驗證
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: '動物名稱不能為空' });
    }

    // 更新更新時間
    const updatedAt = new Date().toISOString();
    
    // 執行 UPDATE 語句，更新動物資料
    await dbRun(
      'UPDATE animals SET name = ?, weight = ?, description = ?, updatedAt = ? WHERE id = ?',
      [name.trim(), weight || null, description || null, updatedAt, req.params.id]
    );
    
    // 取得更新後的動物資料
    const updatedAnimal = await dbGet('SELECT * FROM animals WHERE id = ?', [req.params.id]);
    
    // 回傳更新後的動物資料
    // 200 是預設狀態碼，表示「成功」
    res.json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/animals/:id - 刪除動物
// 這是「刪除」操作，會從資料庫中移除資料
router.delete('/:id', async (req, res) => {
  try {
    // 先檢查動物是否存在
    const existing = await dbGet('SELECT * FROM animals WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: '找不到該動物' });
    }

    // 執行 DELETE 語句，刪除動物
    await dbRun('DELETE FROM animals WHERE id = ?', [req.params.id]);
    
    // 回傳成功訊息和刪除的動物 ID
    res.json({ message: '動物已刪除', id: parseInt(req.params.id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 匯出路由模組，讓 server.js 可以使用
export default router;
```

{% note info %}
**HTTP 狀態碼說明：**
- **200 OK**：請求成功（預設狀態碼）
- **201 Created**：資源已成功建立（通常用於 POST 請求）
- **400 Bad Request**：客戶端請求錯誤（如缺少必要資料、格式錯誤）
- **404 Not Found**：找不到請求的資源
- **500 Internal Server Error**：伺服器內部錯誤（如資料庫連線失敗）

**為什麼要檢查資源是否存在？**
在更新和刪除操作前，我們會先檢查資源是否存在。這樣可以：
- 提供更明確的錯誤訊息（404 而不是 500）
- 避免執行不必要的資料庫操作
- 提升 API 的使用者體驗
{% endnote %}

## 啟動後端伺服器

### 啟動開發伺服器

完成所有檔案後，我們就可以啟動後端伺服器了。在 `backend` 目錄執行：

```bash
npm run dev
```

這個指令會執行 `package.json` 中定義的 `dev` 腳本，也就是 `nodemon server.js`。`nodemon` 會：
1. 啟動伺服器
2. 監聽檔案變更
3. 當你修改程式碼時，自動重新啟動伺服器

**啟動成功的標誌：**
- 終端機顯示「已連接到 SQLite 資料庫」
- 終端機顯示「伺服器運行在 `http://localhost:3000`」
- 終端機顯示「已插入初始資料」（第一次啟動時）

### 測試 API

伺服器啟動後，你可以透過以下方式測試 API：

**1. 使用瀏覽器測試 GET 請求：**
- 打開瀏覽器，訪問 `http://localhost:3000/` 會看到伺服器運行訊息
- 訪問 `http://localhost:3000/api/animals` 會看到所有動物的 JSON 資料

**2. 使用 Postman 或 curl 測試其他請求：**
- **POST**：新增動物（需要在請求體中提供 JSON 資料）
- **PUT**：更新動物（需要在 URL 中指定 ID，並在請求體中提供資料）
- **DELETE**：刪除動物（需要在 URL 中指定 ID）

{% note success %}
**後端專案結構：**
```
backend/
├── server.js          # Express 伺服器主檔案（入口點）
├── database.js        # SQLite 資料庫設定與初始化
├── routes/
│   └── animals.js     # 動物 API 路由（處理所有 /api/animals 的請求）
├── package.json       # 專案設定檔（記錄套件和腳本）
└── zoo.db            # SQLite 資料庫檔案（自動產生，不需要手動建立）
```

**測試 API 的步驟：**
1. 確保後端伺服器正在運行（`npm run dev`）
2. 使用瀏覽器訪問 `http://localhost:3000/api/animals` 查看所有動物
3. 使用 Postman 或 curl 測試 POST、PUT、DELETE 請求
4. 檢查終端機的日誌，確認請求是否成功處理
{% endnote %}

# 前端實作：React 19 + fetch API

## 專案結構規劃

在前端專案中建立 API 串接相關的檔案結構：

```
src/
├── pages/
│   └── lesson04/          # 第四章：API 串接
│       ├── index.jsx      # Lesson04 主頁面
│       ├── index.css
│       └── pages/
│           └── ZooExample/
│               ├── index.jsx              # 動物園管理主元件
│               ├── components/
│               │   ├── AnimalList.jsx     # 動物列表元件
│               │   ├── AnimalForm.jsx     # 動物表單元件（新增/編輯）
│               │   └── AnimalCard.jsx     # 動物卡片元件
│               ├── services/
│               │   └── api.js             # API 服務層（fetch 封裝）
│               └── styles.module.css      # CSS Modules 樣式
```

## API 服務層：fetch 封裝

建立 API 服務層，封裝所有 fetch 請求：

```javascript src/pages/lesson04/pages/ZooExample/services/api.js
const API_BASE_URL = 'http://localhost:3000/api';

// 通用 fetch 請求函式
async function request(url, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // 檢查回應狀態
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `HTTP 錯誤! 狀態: ${response.status}`);
    }

    // 解析 JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // 處理網路錯誤或其他錯誤
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('無法連接到伺服器，請確認後端服務是否運行');
    }
    throw error;
  }
}

// GET 請求：取得所有動物
export async function getAnimals() {
  return request('/animals');
}

// GET 請求：取得單一動物
export async function getAnimal(id) {
  return request(`/animals/${id}`);
}

// POST 請求：新增動物
export async function createAnimal(animalData) {
  return request('/animals', {
    method: 'POST',
    body: JSON.stringify(animalData),
  });
}

// PUT 請求：更新動物
export async function updateAnimal(id, animalData) {
  return request(`/animals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(animalData),
  });
}

// DELETE 請求：刪除動物
export async function deleteAnimal(id) {
  return request(`/animals/${id}`, {
    method: 'DELETE',
  });
}
```

## fetch API 詳細說明

### GET 請求

GET 請求用於取得資料，不需要傳遞請求體：

```javascript
// 基本 GET 請求
const response = await fetch('http://localhost:3000/api/animals');
const data = await response.json();
```

### POST 請求

POST 請求用於新增資料，需要傳遞 JSON 格式的請求體：

```javascript
const response = await fetch('http://localhost:3000/api/animals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '老虎',
    weight: 250.0,
    description: '大型貓科動物，擁有美麗的條紋'
  })
});
const data = await response.json();
```

### PUT 請求

PUT 請求用於更新資料，語法與 POST 類似：

```javascript
const response = await fetch('http://localhost:3000/api/animals/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '獅子（已更新）',
    weight: 220.0,
    description: '更新後的描述'
  })
});
const data = await response.json();
```

### DELETE 請求

DELETE 請求用於刪除資料，不需要傳遞請求體：

```javascript
const response = await fetch('http://localhost:3000/api/animals/1', {
  method: 'DELETE'
});
const data = await response.json();
```

### 錯誤處理

fetch API 不會自動處理 HTTP 錯誤狀態碼（如 404、500），需要手動檢查：

```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    // 檢查 HTTP 狀態碼
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `HTTP 錯誤! 狀態: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // 處理網路錯誤（如伺服器未啟動）
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('無法連接到伺服器');
    }
    throw error;
  }
}
```

## 主元件：動物園管理系統

建立主元件，整合所有 CRUD 功能：

```jsx src/pages/lesson04/pages/ZooExample/index.jsx
import { useState, useEffect } from 'react';
import AnimalList from './components/AnimalList';
import AnimalForm from './components/AnimalForm';
import * as api from './services/api';
import styles from './styles.module.css';

export default function ZooExample() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingAnimal, setEditingAnimal] = useState(null);

  // 載入動物列表
  const loadAnimals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAnimals();
      setAnimals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 元件載入時取得資料
  useEffect(() => {
    loadAnimals();
  }, []);

  // 新增動物
  const handleCreate = async (animalData) => {
    setLoading(true);
    setError(null);
    try {
      const newAnimal = await api.createAnimal(animalData);
      setAnimals([newAnimal, ...animals]);
      return true; // 成功
    } catch (err) {
      setError(err.message);
      return false; // 失敗
    } finally {
      setLoading(false);
    }
  };

  // 更新動物
  const handleUpdate = async (id, animalData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedAnimal = await api.updateAnimal(id, animalData);
      setAnimals(animals.map(animal => 
        animal.id === id ? updatedAnimal : animal
      ));
      setEditingAnimal(null);
      return true; // 成功
    } catch (err) {
      setError(err.message);
      return false; // 失敗
    } finally {
      setLoading(false);
    }
  };

  // 刪除動物
  const handleDelete = async (id) => {
    if (!window.confirm('確定要刪除這隻動物嗎？')) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await api.deleteAnimal(id);
      setAnimals(animals.filter(animal => animal.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 開始編輯
  const handleEdit = (animal) => {
    setEditingAnimal(animal);
  };

  // 取消編輯
  const handleCancelEdit = () => {
    setEditingAnimal(null);
  };

  return (
    <div className={styles.zooExample}>
      <h1>🦁 動物園資料管理系統</h1>

      {/* 錯誤訊息 */}
      {error && (
        <div className={styles.errorMessage}>
          <strong>錯誤：</strong>{error}
        </div>
      )}

      {/* 表單區域 */}
      <div className={styles.formSection}>
        <h2>{editingAnimal ? '編輯動物' : '新增動物'}</h2>
        <AnimalForm
          animal={editingAnimal}
          onSubmit={editingAnimal ? 
            (data) => handleUpdate(editingAnimal.id, data) : 
            handleCreate
          }
          onCancel={editingAnimal ? handleCancelEdit : null}
          loading={loading}
        />
      </div>

      {/* 動物列表 */}
      <div className={styles.listSection}>
        <h2>動物列表</h2>
        {loading && !animals.length ? (
          <div className={styles.loading}>載入中...</div>
        ) : (
          <AnimalList
            animals={animals}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
```

## 動物列表元件

```jsx src/pages/lesson04/pages/ZooExample/components/AnimalList.jsx
import AnimalCard from './AnimalCard';
import styles from '../styles.module.css';

export default function AnimalList({ animals, onEdit, onDelete, loading }) {
  if (animals.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>目前沒有任何動物資料</p>
        <p>請使用上方表單新增動物</p>
      </div>
    );
  }

  return (
    <div className={styles.animalList}>
      {animals.map(animal => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          onEdit={onEdit}
          onDelete={onDelete}
          disabled={loading}
        />
      ))}
    </div>
  );
}
```

## 動物卡片元件

```jsx src/pages/lesson04/pages/ZooExample/components/AnimalCard.jsx
import styles from '../styles.module.css';

export default function AnimalCard({ animal, onEdit, onDelete, disabled }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-TW');
  };

  return (
    <div className={styles.animalCard}>
      <div className={styles.cardHeader}>
        <h3>{animal.name}</h3>
        <div className={styles.cardActions}>
          <button
            onClick={() => onEdit(animal)}
            disabled={disabled}
            className={styles.editBtn}
          >
            編輯
          </button>
          <button
            onClick={() => onDelete(animal.id)}
            disabled={disabled}
            className={styles.deleteBtn}
          >
            刪除
          </button>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        {animal.weight && (
          <p className={styles.weight}>
            <strong>體重：</strong>{animal.weight} 公斤
          </p>
        )}
        {animal.description && (
          <p className={styles.description}>{animal.description}</p>
        )}
        <p className={styles.updatedAt}>
          更新時間：{formatDate(animal.updatedAt)}
        </p>
      </div>
    </div>
  );
}
```

## 動物表單元件

```jsx src/pages/lesson04/pages/ZooExample/components/AnimalForm.jsx
import { useState, useEffect } from 'react';
import styles from '../styles.module.css';

export default function AnimalForm({ animal, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    description: ''
  });

  // 如果是編輯模式，載入動物資料
  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name || '',
        weight: animal.weight || '',
        description: animal.description || ''
      });
    } else {
      // 新增模式，重置表單
      setFormData({
        name: '',
        weight: '',
        description: ''
      });
    }
  }, [animal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 基本驗證
    if (!formData.name.trim()) {
      alert('請輸入動物名稱');
      return;
    }

    // 轉換資料格式
    const submitData = {
      name: formData.name.trim(),
      weight: formData.weight ? parseFloat(formData.weight) : null,
      description: formData.description.trim() || null
    };

    const success = await onSubmit(submitData);
    if (success) {
      // 成功後重置表單（僅新增模式）
      if (!animal) {
        setFormData({
          name: '',
          weight: '',
          description: ''
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.animalForm}>
      <div className={styles.formGroup}>
        <label htmlFor="name">動物名稱 *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="例如：獅子"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="weight">體重（公斤）</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          disabled={loading}
          placeholder="例如：200.5"
          step="0.1"
          min="0"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">描述</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          placeholder="輸入動物的描述..."
          rows="4"
        />
      </div>

      <div className={styles.formActions}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? '處理中...' : (animal ? '更新' : '新增')}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={styles.cancelBtn}
          >
            取消
          </button>
        )}
      </div>
    </form>
  );
}
```

## 樣式檔案

```css src/pages/lesson04/pages/ZooExample/styles.module.css
.zooExample {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.zooExample h1 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.errorMessage {
  background: #fee;
  border: 2px solid #fcc;
  color: #c33;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.formSection {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.formSection h2 {
  margin-top: 0;
  color: #495057;
}

.animalForm {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.formGroup label {
  font-weight: 600;
  color: #495057;
}

.formGroup input,
.formGroup textarea {
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.formGroup input:focus,
.formGroup textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.formGroup input:disabled,
.formGroup textarea:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.formActions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.submitBtn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.submitBtn:hover:not(:disabled) {
  background: #218838;
}

.submitBtn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.cancelBtn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.cancelBtn:hover:not(:disabled) {
  background: #5a6268;
}

.listSection {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.listSection h2 {
  margin-top: 0;
  color: #495057;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.emptyState {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.emptyState p {
  margin: 0.5rem 0;
}

.animalList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.animalCard {
  border: 2px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.animalCard:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.cardHeader h3 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.cardActions {
  display: flex;
  gap: 0.5rem;
}

.editBtn,
.deleteBtn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.editBtn {
  background: #3b82f6;
  color: white;
}

.editBtn:hover:not(:disabled) {
  background: #2563eb;
}

.deleteBtn {
  background: #dc3545;
  color: white;
}

.deleteBtn:hover:not(:disabled) {
  background: #c82333;
}

.editBtn:disabled,
.deleteBtn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.cardBody {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.weight {
  color: #495057;
  font-size: 1.1rem;
}

.description {
  color: #6c757d;
  line-height: 1.6;
}

.updatedAt {
  color: #adb5bd;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e9ecef;
}
```

## 路由設定

更新 `App.jsx` 添加 Lesson04 路由：

```jsx src/App.jsx
import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout';
import Lesson01 from './pages/lesson01';
import Lesson02 from './pages/lesson02';
import Lesson03 from './pages/lesson03';
import Lesson04 from './pages/lesson04'; // 新增

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/lesson01" replace />} />
        <Route path="lesson01" element={<Lesson01 />} />
        <Route path="lesson02/*" element={<Lesson02 />} />
        <Route path="lesson03/*" element={<Lesson03 />} />
        <Route path="lesson04/*" element={<Lesson04 />} /> {/* 新增 */}
      </Route>
    </Routes>
  );
}
```

建立 Lesson04 主頁面：

```jsx src/pages/lesson04/index.jsx
import { Routes, Route, Navigate, Link } from 'react-router';
import ZooExample from './pages/ZooExample';
import './index.css';

export default function Lesson04() {
  return (
    <div className="lesson04-container">
      <nav className="lesson04-nav">
        <h2>📚 API 串接與 CRUD 操作</h2>
        <div className="nav-links">
          <Link to="zoo" className="nav-link">🦁 動物園管理系統</Link>
        </div>
      </nav>

      <div className="lesson04-content">
        <Routes>
          <Route index element={<Navigate to="zoo" replace />} />
          <Route path="zoo" element={<ZooExample />} />
        </Routes>
      </div>
    </div>
  );
}
```

# 進階主題

## 使用 useReducer 管理複雜狀態

當 API 操作變得更複雜時，可以使用 `useReducer` 來管理狀態：

```jsx example-usereducer-api.jsx
import { useReducer } from 'react';
import * as api from './services/api';

// 定義狀態類型
const initialState = {
  animals: [],
  loading: false,
  error: null,
  editingAnimal: null
};

// Reducer 函式
function apiReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, animals: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false, animals: [action.payload, ...state.animals] };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        animals: state.animals.map(animal =>
          animal.id === action.payload.id ? action.payload : animal
        ),
        editingAnimal: null
      };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        animals: state.animals.filter(animal => animal.id !== action.payload)
      };
    case 'SET_EDITING':
      return { ...state, editingAnimal: action.payload };
    case 'CANCEL_EDIT':
      return { ...state, editingAnimal: null };
    default:
      return state;
  }
}

export default function ZooExampleWithReducer() {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  const loadAnimals = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.getAnimals();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const handleCreate = async (animalData) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const newAnimal = await api.createAnimal(animalData);
      dispatch({ type: 'CREATE_SUCCESS', payload: newAnimal });
      return true;
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
      return false;
    }
  };

  // ... 其他操作類似
}
```

## 樂觀更新（Optimistic Update）

在等待伺服器回應時，先更新 UI，提升使用者體驗：

```jsx example-optimistic-update.jsx
const handleUpdate = async (id, animalData) => {
  // 先更新本地狀態（樂觀更新）
  const originalAnimal = animals.find(a => a.id === id);
  setAnimals(animals.map(animal =>
    animal.id === id ? { ...animal, ...animalData } : animal
  ));

  try {
    // 發送請求到伺服器
    const updatedAnimal = await api.updateAnimal(id, animalData);
    // 用伺服器回應更新狀態（確保資料一致性）
    setAnimals(animals.map(animal =>
      animal.id === id ? updatedAnimal : animal
    ));
  } catch (error) {
    // 如果失敗，恢復原始狀態
    setAnimals(animals.map(animal =>
      animal.id === id ? originalAnimal : animal
    ));
    setError(error.message);
  }
};
```

## 防抖搜尋功能

實作搜尋功能時，可以使用防抖來減少 API 請求次數：

```jsx example-debounce-search.jsx
import { useState, useEffect, useRef } from 'react';

export default function AnimalSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    // 清除之前的計時器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 設定新的計時器（500ms 後執行搜尋）
    timeoutRef.current = setTimeout(() => {
      if (searchTerm.trim()) {
        onSearch(searchTerm.trim());
      } else {
        onSearch(''); // 空字串表示載入所有資料
      }
    }, 500);

    // 清理函式
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, onSearch]);

  return (
    <input
      type="text"
      placeholder="搜尋動物..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

# 總結

## 本章學習重點

本章學習了如何使用 React 19 搭配原生 `fetch` API 來串接後端 RESTful API，實作完整的 CRUD 功能。

**RESTful API 概念**：透過標準的 HTTP 方法（GET、POST、PUT、DELETE）來操作資源，使用名詞表示資源路徑，使用 JSON 格式傳遞資料。

**fetch API 使用**：原生 JavaScript API，不需要安裝第三方套件。使用 `fetch(url, options)` 發送請求，透過 `response.json()` 解析回應，使用 `async/await` 處理非同步操作。

**後端實作**：使用 Node.js + Express + SQLite 建立 RESTful API 伺服器。SQLite 是檔案型資料庫，零配置即可使用，適合教學和小型專案。

**錯誤處理**：檢查 HTTP 狀態碼（`response.ok`），處理網路錯誤和伺服器錯誤，提供友善的錯誤訊息給使用者。

**狀態管理**：使用 `useState` 管理 loading、error、data 狀態，或使用 `useReducer` 管理複雜的 API 狀態。

**前後端整合**：完整的資料流動從前端表單 → fetch 請求 → 後端 API → 資料庫 → 回應 → 前端更新 UI。

## 最佳實踐建議

### API 服務層封裝

將所有 API 請求封裝在獨立的服務層，方便維護和重用：

```javascript
// ✅ 好的做法：集中管理 API 請求
export async function getAnimals() {
  return request('/animals');
}

// ❌ 不好的做法：在元件中直接使用 fetch
const response = await fetch('http://localhost:3000/api/animals');
```

### 錯誤處理

始終處理可能的錯誤情況：

```javascript
// ✅ 好的做法：完整的錯誤處理
try {
  const data = await api.getAnimals();
  setAnimals(data);
} catch (error) {
  setError(error.message);
  console.error('載入失敗:', error);
}

// ❌ 不好的做法：沒有錯誤處理
const data = await api.getAnimals();
setAnimals(data);
```

### 載入狀態

提供載入狀態回饋，提升使用者體驗：

```javascript
// ✅ 好的做法：顯示載入狀態
{loading ? (
  <div>載入中...</div>
) : (
  <AnimalList animals={animals} />
)}
```

### 資料驗證

在前端和後端都進行資料驗證：

```javascript
// 前端驗證
if (!formData.name.trim()) {
  alert('請輸入動物名稱');
  return;
}

// 後端驗證
if (!name || name.trim() === '') {
  return res.status(400).json({ error: '動物名稱不能為空' });
}
```

## 常見問題與解決方案

### CORS 錯誤

**問題：** 瀏覽器顯示 CORS 錯誤，無法存取 API。

**解決方案：** 在後端使用 `cors` 中間件：

```javascript
import cors from 'cors';
app.use(cors());
```

### 網路連線錯誤

**問題：** 無法連接到伺服器。

**解決方案：** 檢查後端伺服器是否運行，確認 API 基礎 URL 是否正確。

### 資料格式錯誤

**問題：** 伺服器回應格式不符合預期。

**解決方案：** 檢查 API 回應格式，使用 `response.json()` 正確解析 JSON。

## 下一步學習方向

完成本章後，建議繼續學習以下主題：

**進階 API 處理**：學習 TanStack Query（React Query）進行資料獲取、快取和同步，或使用 SWR 作為輕量的資料獲取 Hook。

**表單處理**：學習 React Hook Form 進行複雜表單驗證，或使用 Formik 進行表單狀態管理。

**狀態管理進階**：將 API 狀態整合到 Context + useReducer 架構中，實現全域狀態管理。

**後端進階**：學習使用 MongoDB 或 PostgreSQL 作為資料庫，實作身份驗證和授權機制，學習 GraphQL API 設計。

# 參考文獻

- [MDN - Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API)
- [Express.js 官方文件](https://expressjs.com/)
- [SQLite 官方文件](https://www.sqlite.org/docs.html)
- [RESTful API 設計指南](https://restfulapi.net/)
- [React 官方文件 - useEffect](https://react.dev/reference/react/useEffect)
