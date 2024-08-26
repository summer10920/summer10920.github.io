---
title: '[行動工具] 前端開發環境 - VSCode、Git、NVS 可攜式 Portable USB 部屬方法'
categories:
  - Zero Road
  - Web Fronted
tag:
  - Git/GitHub
  - NodeJS
  - VSCode
date: 2024-08-26 23:33:50
hidden: true
---

![Image](https://i.imgur.com/S0k5roB.png)

因工作上場地不同，需要有多台電腦之間使用 VSCode 開發工具並進行遠端分支 Git 操作。之前曾經簡單寫過 [這篇](http://localhost:4000/2020/12-30/article-nodejs/?highlight=%E5%85%8D%E5%AE%89%E8%A3%9D#Node-%E7%9A%84%E5%85%8D%E5%AE%89%E8%A3%9D-%EF%BC%88%E5%85%A9%E7%A8%AE%E6%96%B9%E5%BC%8F%EF%BC%89) 提到如何規劃一個 USB，但因為時間過久以及有些做法已經更新，所以這次重新重新整理並獨立一篇記錄下來。如果有需要可以參考使用。

<!-- more -->
---

怎樣的情況下會需要這樣的行動工具？大致上有以下幾種情況：

- 在陌生的電腦環境上，需要一個立即能使用的 VSCode 能進行編輯代碼，以及具備了 NodeJS 的環境，同時具備了 GIT 的環境。
- 既使這台電腦沒有安裝過 VSCode、NodeJS、GIT，也能立即使用，因為這些工具都已經安裝在你自己的 USB 上。
- 當你不信任這台陌生的電腦時，能使用自己帳戶登入的 VSCode、Git、NodeJS 環境相對安全些，熟悉的套件與遠端分支權限都是自己的，使用完畢也不用登出清除個人資料。
- 而本人最痛點的是，如果這台陌生電腦是公用的，或者這台陌生電腦是某個同事電腦，已經安裝且登入過 VSCode、Git、NodeJS 環境，你不願意使用他的帳戶與設定，也不願意把他的帳戶資料登出清除改成你的帳戶與設定。

如果你跟我一樣會需要一個可攜式的開發工具環境，或者口袋放一個 USB 隨身碟，隨時可在任何電腦上立即開發工作，可以往下繼續瀏覽如何建立。