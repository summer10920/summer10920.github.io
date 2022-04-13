---
title: '[學習之路] JS 前端框架 React - 基礎學習'
categories:
  - Zero Road
  - Web Fronted
tag:
  - Untagged
date: 2022-03-27 14:13:51
hidden: true
---

![](https://i.imgur.com/KgMI01E.png)
本篇介紹 Sass 這套預處理器，他能將大型專案上編寫 CSS 不易維護的問題進行改善。使用 Sass 的 Script 語言來進行 CSS 開發，再透過編譯 complier 後轉為瀏覽器可閱讀的 CSS。

<!-- more -->

LINE Developers
1. 到 [LINE Developers](https://developers.line.biz/zh-hant/) 註冊帳號。
2. 建立一個 Providers，這代表你的提供項目。可以代表個人、公司、組織。
3. 到該 Providers 內建立一個 Channel 並選擇 Message API，這代表某個 SDK 操作方法。
4. 使用這個 Message API 內建立獲得 Channel secret 與 Channel access token，到時候提供給 BOT Server 端使用。

Node.js 本地端
1. 建立專案初始化 `npm init`
2. 安裝 [官方提供](https://developers.line.biz/zh-hant/docs/messaging-api/building-sample-bot-with-heroku/) 的 NodeJS 版本之 [BOT 範例](https://github.com/line/line-bot-sdk-nodejs)，安裝方式以 npm 套件來執行 `npm install @line/bot-sdk --save`
3. 透過套件 express 來規劃 NodeJS 的網路伺服器，安裝方式以 npm 套件來執行`npm install express --save`
4. 從 LINE 的 github 上找到 example/echo-bot/index.js 之範例做複製到本地 index.js 檔案同樣在根目錄上。
5. 從 index.js 之中發現 process.env 這個關鍵字，這是一種可以將密碼以。env 文件方式存放，避免 github 上面被人看見。因此需要：
   - 安裝`npm install dotenv --save`
   - 手動建立`.env`檔案，編寫兩組 secret 與 token
    ```txt .env
    CHANNEL_ACCESS_TOKEN="較長的那個代碼…"
    CHANNEL_SECRET="較短的那個代碼…"
    ```
   - 從官方寫法需使用 ES6 方式來載入，到 package.json 添加`"type":"module"`參數。並配合調整原本 LINE 建議的寫法改為 ES6 的 import 方式。
    ```js index.js
    'use strict';AQ
    import 'dotenv/config';
    import line from '@line/bot-sdk';
    import express from 'express';
    // const line = require('@line/bot-sdk');
    // const express = require('express');
    ```
6. 執行方式使用指令`node .`，因此到 package.json 添加以下參數。完成後嘗試 nodeJS 執行該指令，並嘗試從 localhost:3000 查看是否出現 Cannot GET / 資訊。
```json
{
  //...
  "scripts": {
    //...
    "start": "node ."
  },
  //...
}
```

測試本地端 BOT 透過 [ngrok](https://ngrok.com/) 來幫助我們將 BOT Server 變成 https 的外部網址。才能用 LINE 去試試看 BOT。
1. 在 localhost:3000 運作的情況下開始以下動作，也就是先啟用 server 再利用 ngrok 來做外內網址轉換。
2. 到網站註冊免費會員，獲得 token。
   - （不推薦）配合步驟下載應用程式解壓縮並安裝。再透過 cmd 去執行 exe 並附上指令去操作 norok 指令
   - （推薦）或者快速的測試用如下。透過`npx ngrok`指令去安裝別人整理過的套件 ngrok。會提供一個測試用的外部 HTTPS 網址。
3. 利用 npx 不汙染全域的特性，透過指令`npx ngrok authtoken 你的 TOKEN 金鑰`來幫助寫入到本機電腦內的 ngrok.yml
4. 再透過指令`npx ngrok http 3000`來啟用網址轉換功能。並記下提供的外部網址。
5. 測試該外部網址，是否出現 Cannot GET / 資訊。
6. 到 [LINE Developers](https://developers.line.biz/zh-hant/) 將 Webhook 網址更改為此網址並根據範例的寫法要尾部添加`/callback`網址，並開啟使用。
