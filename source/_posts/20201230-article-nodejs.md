---
title: "[學習之路] Node.js 入門教學"
categories:
  - Zero Road
  - Web Fronted
tag:
  - JavaScript
  - NodeJS
date: 2020-12-30 12:47:03
---

Node.js 是能夠在伺服器上面運行 JavaScript 的應用平台環境，透過 Node.js 提供的函式庫與執行環境能完成伺服器端服務，提供各種網路應用。本篇資源版本與環境如下：

- 主題教材：
  - [Node.js 官方網站](https://nodejs.org/zh-tw/) 版本 v14.15.3
  - [NVM](https://github.com/nvm-sh/nvm) 版本 v0.37.2
  - [NVM-windows](https://github.com/nvm-sh/nvm) 版本 v1.1.7
- IDE 編譯器：VScode v1.52.1
- 作業系統：Windows 10 NT

<!-- more -->

# 認識
- Node.js 透過安裝到指定伺服器主機內，使用 JavaScrpt 進行語法撰寫。常用於即時與推播等網路應用，像是 WebServer、聊天機器人、資料存取服務等網路應用。
- 早期是採用 C 與 Lua 程式語言開發但並不順利，直到 Google V8 JavaScript 引擎出現才成功，透過該引擎執行 JavaScript 代碼。
- Node.js 本身是單執行緒，因此採用 Non-blocking I/O 與非同步事件來規劃程式運作，這能讓大量使用者連線情況下不會因為等待 IO 等待回應而占用執行緒。
- Node.js 提供多個模組的 API 函式庫，包含一些非同步的 IO 檔案存取、Socket、HTTP 等函式庫，所以 Node.js 自己就能創造 Web 伺服器，不需依賴 IIS 或 Apache 伺服器。
- 用戶端的 JS 全域物件為 window 物件，Node.js 的 JS 全域物件為 Global 物件。
- Node.js 能在全域下使用 console 物件 與 setTimeout/setInterval 函式，用法都跟一般的 JS 相同。

# 安裝
Node.js 作為伺服器應用平台，你需要提供一台主機作為伺服器運作。本教學使用 Windows 為伺服器環境，並提供三種安裝 Node.js 方式教學：

## 官網下載
前往官網提供穩定版 (LTS) 與最新版 (Current) 可選擇，選擇穩定版即可。安裝方式大多簡單快速通過即可，有幾個過程項目需注意：
- 目前版本預設情況下會自動幫你安裝 npm 管理與設定 PATH 所需路徑。所以不用擔心需要額外安裝或設定什麼
- 會提供一個 Automaticy install 的選項自動安裝工具請打勾，這能幫助你未來遇到一些 npm 模組可提供修改時呼叫 Python 與 VScode 來連動修改。若未安裝時未來會出現錯誤訊息 (ex:gyp ERR! find Python)。若有打勾將會主程式安裝完畢後呼叫 cmd 進行此項目工具安裝。

安裝完畢後執行 cmd 或 powershell，輸入 `node -v` 或 `npm -v` 能得到版本資訊代表安裝成功。

## NVM 工具
全名為 [Node Version Manager](https://github.com/nvm-sh/nvm)，為 Caswell 作者開發出來的強大管理工具，主要是由於工作上處理專案時需要不同的 Node 版本來執行（因有些 npm 模組有版本相容性問題）。大多數的開發者都會選擇 NVM 來作為 node 安裝來源。

根據手冊說明安裝十分簡單，開啟 cmd 輸入以下指令（擇一）即可，但實際上僅適用於 Mac / Linux 應用
```cmd
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
我們環境是 windows 無法使用，所以需要找支援 windows 的另一家 NVM 工具，這裡提供 [nvs](https://github.com/jasongin/nvs/releases) 來使用。（另外常用的還有 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 選擇） 讓我們下載 nvm-setup.zip 使用。

安裝過程也十分簡單沒什麼選項，之後開啟 cmd 或 powershell 輸入 `nvs` 能列出版本選擇初次安裝。之後再次輸入 `nvs` 能選擇使用 node 版本或另外安裝。指令簡單明瞭。

```cmd
C:\Users\Loki> nvs
Downloading [###########################################################################################] 100%
Extracting  [###########################################################################################] 100%
PATH += $env:LOCALAPPDATA\nvs\node\14.15.3\x64
C:\Users\Loki> node -v
v14.15.3
C:\Users\Loki> npm -v
6.14.9
```

如此一來你就獲得 node 與 npm 的安裝，如果工作需要可多安裝幾個版本。需要切換 node 版本時再透過指令 `nvs` 做畫面選擇即可。注意每個 node 版本都是獨立的 npm 套件不共用。

## USB 免安裝
因為工作需要不同電腦上執行，因此我習慣用 USB 作免安裝環境。因此 VScode、GIT、Nodejs 都能使用免安裝。同時依賴 VSCode 的同步功能自動把 GIT 跟 Nodejs 相關檔案都一起同步化。這裡將會順便說明 GIT 如何加入到免安裝：

### VSCode 的免安裝
使用安裝不特別說明，本站舊文或網路上曾提到可自行參考。另外根據官方 Portable 的資料保留方式，之後也會把 Git 與 Node 的檔案都放入到 `(VSCode folder)\data\user-data` 內，這樣方便 VSCode 進行 Setting Sync 時一同備份保留。

### GIT 的免安裝
到 GIT 網站 [下載頁面](https://git-scm.com/download/win)，點選對應的 windows 作業系統在觸發下載（自動下載請直接取消）的頁面上找到 64-bit Git for Windows Portable。下載解壓到 USB 位置的 VSCode 路徑 `(VSCode folder)\data\user-data\User\Lokitools\Git`。

### Node 的免安裝 （兩種方式）
- 方法一：官方的 Node
到 Nodejs 網站 [下載頁面](https://nodejs.org/en/download/)，點選對應的 windows 找到 Windows Binary (.zip) 連結，下載解壓到 USB 位置的 VSCode 路徑 `(VSCode folder)\data\user-data\User\lokiTools\node`
- 方法二：NVS 管理器 （本篇使用方式為此）
到 NVS 的 release 處 [下載頁面](https://github.com/jasongin/nvs/releases/tag/v1.6.0)，點選 Source Code 版本連結，下載解壓到 USB 位置的 VSCode 路徑 `(VSCode folder)\data\user-data\User\lokiTools\nvs`

#### 移植舊 npm 模組
如果已經有 Node 有相關 npm 模組，記得搬移進去到你的 `node\node_modules` 內，node 根目錄的一些模組主程式也要（舉例 hexo,hexo.cmd,hexo.ps1 也對應到新位置根目錄）。

### 讓 VScode 終端機自動執行 GIT 與 Node
大致有三個重點要處理：
- 讓 VSCode 接管你的 GIT 執行程式。
- 讓 VSCode 終端機是使用 windows cmd 為執行環境。
- 讓 node,npm,git 的 windows PATH 路徑於每次操作終端機之前寫入到該電腦的 PATH 環境內，使不同電腦上都能正常運作。

開始設計步驟如下：
1. 目前所有已持有的檔案都在 `(VSCode folder)\data\user-data\User\lokiTools\` 內，裡面有 Git,node（或 nvs) 資料夾。
2. 在該資料夾底下建立 `autoRunOnVSCode.bat` 批次檔案，讓 VSCode 在使用終端機時自動跑這個前置作業。
3. 批次檔案主要處理宣告 PATH(Git 與 node 路徑）寫入到目前電腦的 PATH 環境內，以及顯示相關版本資訊。
4. 這裡提供兩種版本，分別對應前面方法一（官方 node) 與方法二 (nvs) 的寫法，擇一即可。
```shell autoRunOnVSCode.bat by Nodejs
@echo off
:::::::::::::::::::::::::::::::::::::::::: Put into Windows PATH
:: GIT
set gitdir=%~dp0\Git\cmd

:: Method 1 : node PATH
set nodedir=%~dp0\node
set path=%PATH%;%gitdir%;%nodedir%
:::::::::::::::::::::::::::::::::::::::::: Print Message

:: Figure out versions for Git, Node.Js, and NPM. This first one breaks apart the Git version to make it look nicer.
for /f "tokens=3-6 delims=. " %%a in ('git --version') do (set gitver1=%%a&set gitver2=%%b&set gitver3=%%c)
echo Git Version = v%gitver1%.%gitver2%.%gitver3%
for /f "tokens=1" %%v in ('node -v') do set nodever=%%v
echo Node Version = %nodever%
for /f "tokens=1" %%n in ('npm -v') do set npmver=%%n
echo NPM Version = v%npmver%
```
```shell autoRunOnVSCode.bat by nvs
@echo off
:::::::::::::::::::::::::::::::::::::::::: Put into Windows PATH
:: GIT
set gitdir=%~dp0\Git\cmd

:: method 2 : nvs (node version switcher) PATH
set nvsdir=%~dp0\nvs
set path=%PATH%;%gitdir%;%nvsdir%
call %~dp0\nvs\nvs.cmd

:::::::::::::::::::::::::::::::::::::::::: Print Message
echo -------------------------
for /f "tokens=1" %%n in ('nvs -v') do set nvsver=%%n
echo NVS Version = v%nvsver%
echo -------------------------

:: Figure out versions for Git, Node.Js, and NPM. This first one breaks apart the Git version to make it look nicer.
for /f "tokens=3-6 delims=. " %%a in ('git --version') do (set gitver1=%%a&set gitver2=%%b&set gitver3=%%c)
echo Git Version = v%gitver1%.%gitver2%.%gitver3%
for /f "tokens=1" %%v in ('node -v') do set nodever=%%v
echo Node Version = %nodever%
for /f "tokens=1" %%n in ('npm -v') do set npmver=%%n
echo NPM Version = v%npmver%
```

5. 最後是設定 VSCode 的 `settings.json`，路徑設定走絕對路徑（舉例這裡 USB 固定為 K 槽），其三個重點：
   - 設定 git 的執行擋在我們免安裝隨身碟之處
   - 設定終端機採用 windows 內建的 cmd 命令字元
   - 讓每次使用 VSCode 的終端機時會自動執行這個 `autoRunOnVSCode.bat` 批次檔
```json settings.json
//for cmd and git path
"editor.renameOnType": true,
"git.autofetch": true,
"git.path": "K:\\VSCODE\\data\\user-data\\User\\lokiTools\\Git\\bin\\git.exe",
"terminal.integrated.shell.linux": "",
"terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
"terminal.integrated.shellArgs.windows": [
  "/K",
  "K:\\VSCODE\\data\\user-data\\User\\lokiTools\\autoRunOnVSCode.bat"
],
  ```
6. 目前為止已可成功使用免安裝隨身碟，只要保持 USB 磁碟機為固定代號就能使用。
![初次執行選擇](https://i.imgur.com/vPPrZA3.png)
![環境自動完成](https://i.imgur.com/1avqpDq.png)

# 入門操作
Node 操作原理是透過終端機指令 `node *.js` 去解讀 JS 語法。如果有 console 時會直接由 node 回應給終端機輸出。假設有個檔案為：

```javascript helloworld.js
console.log("Hello World");
```

透過 node 去執行這個檔案你會在終端機得到一個訊息。

```shell
L:\nodeTest>node helloworld.js
Hello World

L:\nodeTest>
```

或者採用進入 node REPL 命令模式，在關鍵字 `node` 送出後，就能直接在終端機上輸入 node 指令：
```shell
L:\nodeTest>node
Welcome to Node.js v14.15.3.
Type ".help" for more information.
> console.log("hello world")
hello world
undefined
>
```

在 REPL 模式內妳可以使用以下快速鍵：
- ctrl + c：退出當前終端。
- ctrl + c：單擊兩次-退出 Node REPL。
- ctrl + d：退出節點 REPL。
- 上下鍵：查看輸入的歷史命令
- tab 鍵：列出當前命令
- .help：列出使用命令
- .break：退出多行表達式
- .clear：退出多行表達式
- .save filename：保存當前的 Node REPL 模式到指定檔案
- .load filename：加載當前節點 REPL 模式的檔案內容。

## process 物件
內建的 [process 物件](http://nodejs.cn/api/process.html) 能代表目前正執行代碼之流程運作，你可以控制當下 process 之事件、屬性、方法。可使用的資源多可參考官方手冊做了解，這裡舉例兩個操作：

### exit 中斷操作
當代碼遇到 `process.exit()` 代表當前執行碼結束。或使用 event 事件遇到 exit 行程結束時觸發指定動作。
```javascript
console.log(1);
process.on('exit',()=>{ //當 process 遇到發生 exit 事件時做以下執行
  console.log('done');
})
console.log(2);

process.exit(); //直接 exit 結束
console.log(3); //不會被執行到
// print: 1 2 done
```
### nextTick 指定下次執行
由於 Node.js 採用事件迴圈方式來消化代碼，使得非同步與非阻擋式 I/O 能順利後續處理。你也能指定將 callback 內容安排至下一次事件迴圈時第一個執行處。

```javascript
console.log(1);
process.nextTick(()=>{
  console.log("next");//此 callback 作業是下一次事件迴圈時觸發。
});
console.log(2);
```

## 全域變數
執行 Node 應用時，能透過 `__filename` 與 `__dirname` 全域變數來取得該應用程式所在之檔案名稱或目錄，對於需要找到相對路徑處理上有很大的幫助。

```javascript index.js
console.log(`
  dirname 應用目錄 ${__dirname}
  filename 檔案路徑 ${__filename}
`);
```
```shell
L:\nodeDemo>node .

  dirname 應用目錄 L:\nodeDemo
  filename 檔案路徑 L:\nodeDemo\index.js
```

# Moudles 模組
在設計 Node 應用時，由於是函式庫觀念，所有的可用函式都是使用模組系統觀念來運用，透過 require 以及 exports 方式提供檔案和模組之間的溝通。大致上可以分為三種類型：

1. Third Party Modules （第三方模組）
2. Local Modules （自建模組）
3. Core Modules （原生模組）

## Third Party Modules （第三方模組）
第三方模組代表是別人寫好的自建模組（稍晚提到），直接將檔案放入本地端目錄下以相對路徑 requare 使用即可。或者也可透過網路使用 npm 取得別人上傳的模組。全名為 Node Package Manager 的 npm 是 Node.js 額外套件管理系統，安裝 node 主程式時就已安裝好。透過 npm 能夠輕易安裝各家套件模組。想知道有那些第三方模組可使用可以到網站 [npm | build amazing things](https://www.npmjs.com/) 找到，或者透過終端機指令 `npm search <MOUDLE_NAME>` 進行搜尋。同樣的你也可以將自建模組放到 npm 上面去提供別人下載使用。

```shell 舉例 npm 搜尋 Bootstrap 套件
:::::::::::::::: 搜尋可用的安裝模組
L:\nodeTest>npm search bootstrap
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
bootstrap                 | The most popular…    | =xhmikosr =mdo… | 2020-10-13 | 4.5.3    | css sass mobile-first responsive front-end framework web
less                      | Leaner CSS           | =matthew-dean…  | 2020-12-18 | 4.0.0    | compile less css nesting css variable css gradients css gradients css3 less compiler less css less mixins less less.js lesscss mixins nestedbootstrap-vue             | With more than 85…   | =jackmu95 =pi0… | 2021-01-01 | 2.21.2   | Bootstrap Bootstrap v4 Bootstrap for Vue Vue Vue.js Vue v2 SSR Web Components Directives Icons Bootstrap Icons ARIA Accessibility a11y Poppe@ng-bootstrap/ng-bootstra | Angular powered…     | =pkozlowski_os… | 2020-11-06 | 8.0.0    | angular bootstrap components accordion alert buttons carousel collapse datepicker dropdown modal pagination popover progressbar rating tablep                         |                      |                 |            |          |
react-bootstrap           | Bootstrap 4…         | =monastic.panic… | 2020-10-21 | 1.4.0    | react ecosystem-react react-component bootstrap
ngx-bootstrap             | Native Angular…      | =valorkin       | 2020-11-06 | 6.2.0    | angular bootstap ng ng2 angular2 twitter-bootstrap
reactstrap                | React Bootstrap 4…   | =eddywashere…   | 2020-12-29 | 8.8.1    | reactstrap bootstrap react component components react-component ui
bootstrap-slider          | Slider view…         | =rovolutionary… | 2020-06-04 | 11.0.2   | slider bootstrap twitter slide
angular-ui-bootstrap      | Native AngularJS…    | =icfantv…       | 2017-10-14 | 2.5.6    | angularjs angular bootstrap ui
bootstrap-select          | The jQuery plugin…   | =caseyjhol      | 2020-06-26 | 1.13.18  | javascript jquery form bootstrap dropdown select replacement
font-awesome              | The iconic font and… | =juliankrispel  | 2016-10-24 | 4.7.0    | font awesome fontawesome icon font bootstrap
@coreui/vue               | CoreUI Vue…          | =coreui         | 2020-12-17 | 3.2.7    | coreui vue vue-component vue-library bootstrap framework responsive layout component components
bootstrap-loader          | Boostrap for Webpack | =alex.fedoseev… | 2019-04-27 | 3.0.4    | bootstrap twitter
@fortawesome/fontawesome- | The iconic font,…    | =devoto13…      | 2020-10-05 | 1.2.32   | font awesome fontawesome icon svg bootstrap
svg-core                  |                      |                 |            |          |
@fortawesome/free-solid-s | The iconic font,…    | =devoto13…      | 2020-10-05 | 5.15.1   | font awesome fontawesome icon svg bootstrap
vg-icons                  |                      |                 |            |          |
bootstrap-sass            | bootstrap-sass is a… | =bootstrap-adm… | 2019-02-13 | 3.4.1    | bootstrap sass css eyeglass-module
pwstrength-bootstrap      | jQuery plugin for…   | =ablanco        | 2020-05-28 | 3.0.9    | bootstrap password strength meter jquery-plugin ecosystem:jquery
bootstrap-switch          | Turn checkboxes and… | =lostcrew       | 2019-04-13 | 3.4.0    | bootstrap switch javascript js
bootstrap-input-spinner   | A Bootstrap 4 /…     | =shaack         | 2020-10-25 | 1.16.8   | Bootstrap 4 Bootstrap jQuery Widget Html Input UI
@coreui/coreui            | HTML, CSS, and…      | =coreui         | 2020-11-23 | 3.4.0    | bootstrap css dashboard framework front-end responsive sass ui kit webapp
```

### 全域安裝 vs 區域安裝
使用 npm 安裝第三方模組可分為全域或區域兩種安裝位置且會有不同的應用考量。全域會影響整個 node.js 的所有專案應用。區域即只會影響該專案目錄應用。

#### Global Install 全域安裝
- 語法為 `npm install <Module Name> -g`，安裝位置會在/user/local（或 Node 安裝目錄）的 node_modules 目錄下
- 安裝位置在哪可透過指令 `npm root -g` 查詢（可由 `npm config set ''` 來修改位置）：
```shell
::::::::: 全域安裝路徑 ::::::
L:\nodeTest>npm root -g
K:\VSCODE\data\user-data\User\lokiTools\nvs\node\14.15.3\x64\node_modules

:::::::::Node 參數清單 ::::::
L:\nodeTest>npm config ls
; cli configs
metrics-registry = "https://registry.npmjs.org/"
scope = ""
user-agent = "npm/6.14.9 node/v14.15.3 win32 x64"

; node bin location = K:\VSCODE\data\user-data\User\lokiTools\nvs\node\14.15.3\x64\node.exe
; cwd = L:\nodeTest
; HOME = C:\Users\Loki-Home
; "npm config ls -l" to show all defaults.

::::::::: 安裝目錄路徑：::::::
L:\nodeTest>npm config get prefix
K:\VSCODE\data\user-data\User\lokiTools\nvs\node\14.15.3\x64
```
- 一旦選擇全域方式安裝，該模組將被全域所能使用。也就是可以直接在命令列上使用模組。
- 一個模組就能被所有專案的 node 所使用避免過多的版本差異，但對個別專案的版本依賴有困難。

舉例來說 npm 就是一個全域型的原件模組，可透過 list（或 ls) 指令確認（透過-g 為指定 global 全域）：
```shell
L:\nodeDemo>npm list -g npm
K:\VSCODE\data\user-data\User\lokiTools\nvs\node\14.15.3\x64
`-- npm@6.14.9 
```

#### Local Install 區域安裝
- 語法為 `npm install <Module/Package Name>`，安裝到在目前終端機位置的 `node_modules` 目錄下
- 如果需要使用該模組時必須使用 `require(<Moudle Name>)` 才能載入使用
- 只有該專案目錄內才能找到該模組，其他目錄下無法找到。因此可避免不同專案內的版本衝突 (A 案需 ver1，B 案需 ver3)

舉例來說：我們先在目錄 nodeTest 下安裝 express，nodeTest 會多一個 node_moudles 資料夾且可查詢，接著到另一個專案目錄 nodeDemo 做查詢結果。
```shell
::: 本地安裝模組 express
L:\nodeTest>npm install express

::: 這裡報錯誤是因為我們還沒使用正確步驟生成 package.json 導致，之後會重新說明正式做法
npm WARN saveError ENOENT: no such file or directory, open 'L:\nodeTest\package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'L:\nodeTest\package.json'
npm WARN nodeTest No description
npm WARN nodeTest No repository field.
npm WARN nodeTest No README data
npm WARN nodeTest No license field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 50 packages in 21.263s
found 0 vulnerabilities

::: 可找到模組
L:\nodeTest>npm list express
L:\nodeTest
`-- express@4.17.1

::: 其他目錄下找不到該模組
L:\nodeTest>cd /nodeDemo
L:\nodeDemo>npm list express
L:\nodeDemo
`-- (empty)
```

### npm 其他指令
你可以使用 npm 進行一些常用操作：
- npm search \<NAME>
已知的模組名稱進行搜尋檢查可用安裝與版本資訊
- npm install|update|uninstall \<NAME>
對已安裝過後的模組進行版本安裝、升級、移除。
- npm help
查找 npm 相關指令
- npm cache clear
清除 npm 本地暫存
- npm publish|unpublish \<package>@\<version>
將目前專案目錄發佈到 npm 套件管理系統給 Nodejs 社群使用，也能取消指定的某版本

```shell
:::::::::::::::: 更新已安裝的模組
L:\nodeTest>npm update express
:: 全域模組的升級方式：: L:\nodeTest>npm update express -g

:::::::::::::::: 移除已安裝的模組
L:\nodeTest>npm uninstall express
npm WARN saveError ENOENT: no such file or directory, open 'L:\nodeTest\package.json'
npm WARN enoent ENOENT: no such file or directory, open 'L:\nodeTest\package.json'
npm WARN nodeTest No description
npm WARN nodeTest No repository field.
npm WARN nodeTest No README data
npm WARN nodeTest No license field.

removed 1 package and audited 73 packages in 1.39s
found 0 vulnerabilities
```

## Local Modules（自建模組）
自建模組就是自己寫一個模組提供給自己應用。模組單位為一個 js 檔案，跟 node 應用一樣都是 js 檔，但應用是透過指令 `node app.js` 來執行，模組是在應用內宣告 `request ('mod.js')` 來載入，應用與模組兩種用法不同。自建模組也能打包成 npm 且分享至 npm 平台去。

### 手動的自建模組
進行自建模組編寫時，最後需使用 export 方式傳出去。屆時任何應用進行 request 載入時才能正常接洽使用回傳內容。export 本身是一個變數，它屬於整個 module 模型下的原生練物件。因此只要將想回傳的東西指定給 export（可以是字串或文字）即可。

#### 產生 resport 回傳
跟隨範例，設計一個模組在專案目錄下建立 mod.js 進行設計。注意需要將資料回傳給應用時需指定 exports 來回應。

##### 方法一：將 exports 當作物件，指定三種名稱函式
```javascript mod.js
exports.en = function (userName) {
  console.log('Hello! ' + userName);
};
exports.tw = function (userName) {
  console.log('你好！' + userName);
};
exports.hk = function (userName) {
  console.log('雷侯！' + userName);
};
```
##### 方法二：將完整的物件指定給 export
```javascript mod.js 
const hello = {
  en: function (userName) {
    console.log('Hello! ' + userName);
  },
  tw: function (userName) {
    console.log('你好！' + userName);
  },
  hk: function (userName) {
    console.log('雷侯！' + userName);
  }
};
module.exports = hello;  
/********************
exports = hello;       也能直接寫成這樣省略 module 字樣
********************/

/****另一種簡化後的寫法
module.exports = {
  en: function (userName) {
    console.log('Hello! ' + userName);
  },
  tw: function (userName) {
    console.log('你好！' + userName);
  },
  hk: function (userName) {
    console.log('雷侯！' + userName);
  }
};
****/
```
#### 發出 request 取得結果
接著建立 test.js 檔案編寫 Node 應用，注意檔案路徑上的差異。我們透過 request 來請求載入結果存成變數，這個 MyMod 將是一個物件資料。就能直接指定物件屬性來取得函式結果。
```javascript test.js 
/*
  自訂模組的 requare 時需指定相對路徑，而原生或 npm 包裝的模組不需要
  .js 副檔名可省略，將會自動去尋找屬於 js 副檔名之檔名

  const myMod = require('./mod.js');
*/
const myMod = require('./mod');
myMod.tw("Loki");
```

#### 執行應用程式
透過終端機執行 node 應用執行 test.js 程式，得到以下結果。
```shell
L:\nodeDemo>node test.js
你好！Loki
```

### npm 的自建模組
可使用 npm 元件方式新建立模組。在 npm 話題內所有的模組都是 package 安裝包觀念，因此每一個模組內都會有 package.json 檔案提供這個安裝包的詳細資訊。
- 透過 `npm init` 方式初始化 package（將要求你輸入一些基本資料）。
- 一個 package 可以跟別人的 package 形成依賴關係使用。如果你安裝了 Package A 時，可能這個 A 會自動幫你下載其他指定的 Package BCDE... 利於本體 A 的正常運行。
- 所有的 npm 模組都有自己的 package.json 提供相關資訊參數，所以自己的 node 自訂模組也會有 package.json。
- modules 是指一個功能程式之模組（不需 package.json)；package 是指一個具備 package.json 的完整安裝包，內容會包含多個 modules 或其他相依關係的 packages。

#### 立相依關係的應用
以下步驟為透過一個乾淨新專案為設計起點：
1. 先建立一個 test.js 等待（被 init 被偵測）
2. 透過 init 來建立 package 並手動設定 package 基本資料。過程中你可以直接 Enter 用 npm 預判的預設值來自動填入。

```shell
L:\nodeDemo>npm ls
L:\nodeDemo
-- (empty)

L:\nodeDemo>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (nodedemo)
version: (1.0.0)
description: my first package
entry point: (test.js)
test command:
git repository:
keywords:
author: LokiJiang
license: (ISC)
About to write to L:\nodeDemo\package.json:

{
  "name": "nodedemo",
  "version": "1.0.0",
  "description": "my first package",
  "main": "test.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "LokiJiang",
  "license": "ISC"
}

Is this OK? (yes) yes
```

接著安裝 npm express 到這個本地安裝目錄內，並添加 `--save` 儲存在相依關係清單。

```shell
L:\nodeDemo>npm install express --save
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN nodedemo@1.0.0 No repository field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 50 packages in 24.244s
found 0 vulnerabilities
```

此時你可以回到根目錄的 package.json 內查看 dependencies 部分，會寫到這個模組需要依賴 express 套件。未來如果別人從 npm 安裝你這個模組時，會自動安裝 express 使你的自訂模組正常運行。你也可以試著從 `/node_moudles/express/package.json` 查看 dependencies 資訊，代表這個模組也依賴很多別人的套件。也就是為何你只安裝 express 卻在 `/node_moudles/` 被強迫載入一堆你不認識的模組套件。回話題到 test.js 設定 express 的調用：

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

回到終端機執行你的 test.js

```shell
L:\nodeDemo>node test.js
Example app listening at http://localhost:3000
```

![Image](https://i.imgur.com/ICEs9yo.png)

#### 分享模組至 npm
你可以將自建的 npm 模組分享至 npm 開源平台（需 [註冊帳號](https://www.npmjs.com/))，如需打造私用領域需額外 pro 付費。要發布 package 至 npm 開源平台時有以下主要指令：

- npm whoami
若已登入帳號，能看到帳戶資訊
- npm login
登入帳號
- npm publish
將目前路徑下的 package 上傳至 npm，並根據 package.json 基本資料自動提供名稱與版本資訊。如需版本更新需手動調整 package.json 的版本號並再次覆蓋的送出本指令。
- npm install \<Package_Name>
將開源平台上的 Package 進行下載安裝

## Core Modules （原生模組）
由 Node 提供原生的內建模組，提供直接使用於應用 APP 的操作。大致可分為以下常用重要的原生模組。

### fs 檔案系統
[fs](http://nodejs.cn/api/fs.html) 檔案系統可用功能十分廣泛，除了能對檔案進行調整讀取也能對目錄進行控制。使用前同樣需要透過 require 來載入該模組。

#### 檔案資訊
透過 `fs.stat()` 方式獲得檔案情報，需要從 callback 的參數來獲得。不建議於進行檔案讀寫時額外用此方法確認之失敗手續，你應該直接用那些讀寫方法且若 err 則直接處理失敗手續。

```javascript index.js
const fs = require('fs');
fs.stat('text.txt',function(err,stats){ //若檔案有誤，將產生 err 之錯誤物件

  //回傳皆為布林值
  console.log("檔案："+stats.isFile());
  console.log("目錄："+stats.isDirectory());
  console.log("區塊類型："+stats.isBlockDevice());
  console.log("字元類型："+stats.isCharacterDevice());
  console.log("符號連接："+stats.isSymbolicLink());
  console.log("網頁 Socket:"+stats.isSocket());
});
```

#### 檔案讀取
檔案 I/O 存取操作的相關類別、方法、事件。讀取檔案的行為本身又可以分為同步 `fs.readFileSync(path[, options])` 與非同步 `fs.readFile(path[, options], callback)`：

```javascript 非同步
/**********file:test.txt 
hello
**************************/

const fs = require('fs');
fs.readFile('test.txt', function (err, data) {
  if (err) throw err; //如果失敗就離開並回傳至失敗事件
  console.log(data.toString());
});
console.log("world");
```
```shell 非同步執行結果
L:\nodeDemo>node test.js
world
hello
```
```javascript 同步
/**********file:test.txt 
hello
**************************/

const fs = require('fs');
const data = fs.readFileSync('test.txt');
console.log(data.toString());
console.log("world");
```
```shell 非同步執行結果
L:\nodeDemo>node test.js
hello
world
```

#### 寫入檔案
寫入檔案方式為 `fs.writeFile(file, data[, options], callback)`，指定路徑若檔案不存在則新增，反之為覆蓋。

```javascript
const fs = require('fs');
fs.writeFile('hero.txt','Loki',(err)=>{  //[, options] 預設為 UTF8 可省略
  if(err) throw err;
  console.log("done");
});
```

對已存在（不覆蓋）的檔案進行插入文字方式為 `fs.appendFile(path, data[, options], callback)`

```javascript
const fs = require('fs');
fs.appendFile('hero.txt','_Jiang',(err)=>{  //[, options] 預設為 UTF8 可省略
  if(err) throw err;
  console.log("done");
});

/********hero.txt
  * Loki_Jiang
 ************* */
```

#### 刪除檔案與更名
刪除檔案的方式為 `fs.unlink(path, callback)`，修改檔案名稱的方式為 `fs.rename(oldPath, newPath, callback)`

```javascript
// const fs = require('fs'); 
// fsrequire('fs').unlink('hero.txt', () => {.... same as ↓
require('fs').unlink('hero.txt', () => {
  console.log('done');
});
```

###　開啟關閉的讀取修改
這裡跟前面不太一樣的是先透過開啟檔案方式 `fs.open(path[, flags[, mode]], callback)` 將資源列入暫存再進行讀取寫入。相對來說資源效率比前面的使用還好。開啟檔案方式需使用 [標記 flag](http://nodejs.cn/api/fs.html#fs_file_system_flags) 來代表何種開啟方式，flag 公式如下：

- 'r': 打開檔案用於讀取。如果檔案不存在則異常。
- 'r+': 打開檔案用於讀取和寫入。如果檔案不存在則異常。
- 'rs+': 打開檔案用於讀取和寫入（同步模式）。IO 操作將繞過本地系統的檔案緩存。

- 'w': 打開檔案用於寫入。如果檔案不存在則創建，如果檔案存在則截斷。
- 'wx': 類似於 'w'，但如果路徑存在則失敗。
- 'w+': 打開檔案用於讀取和寫入。如果檔案不存在則創建，如果檔案存在則截斷。
- 'wx+': 類似於 'w+'，但如果路徑存在則失敗。

- 'a': 打開檔案用於追加。如果檔案不存在則創建。
- 'ax': 類似於 'a'，但如果路徑已存在則失敗。
- 'a+': 打開檔案用於讀取和追加。如果檔案不存在則創建。
- 'ax+': 類似於 'a+'，但如果路徑存在，則失敗。

- 'as': 打開檔案用於追加（同步模式）。如果檔案不存在則創建。
- 'as+': 打開檔案用於讀取和追加（同步模式）。如果檔案不存在則創建。

為了連續性作業示範，開啟檔案後我們將內容讀取動作 fs.read(fd, buffer, offset, length, position, callback)，並最後將檔案關閉 fs.close(fd, callback)。

```javascript test.js
const fs = require('fs');
fs.open('test.txt', 'r', function (err, fd) {
  if (err) return console.error(err);

  fs.read(fd, function (err, bytesRead, buffer) {
    //fd 為此 fs.open 所產生的工作編號 (number)，利於指定上的操作行為。
    if (err) throw err;

    if (bytesRead > 0) {
      console.log(bytesRead + " 字元被讀取");
      console.log(buffer.slice(0, bytesRead).toString());
    }

    fs.close(fd, function (err) {
      if (err) throw err;
    });
  });
});
```
```shell cmd
L:\nodeDemo>node test.js
5 字元被讀取
hello
```

### events 事件
[events](http://nodejs.cn/api/events.html) 為提供事件監聽與處理的方法，在 Node.js 的一些物件（透過 Emitter 觸發器）來觸發指定事件 (Listener) 進行呼叫函式。

```javascript index.js
const EventEmitter = require('events');
const lokiEvent=new EventEmitter(); // 新事件

lokiEvent.on('todo',function(){ // 該事件的 todo 發生時，做指定事情
  console.log("hello world");
})
lokiEvent.emit('todo'); // 觸發 lokiEvent 事件的 todo （觸發器名稱）

//print hello world
```

### buffer 緩衝區
[Buffer](http://nodejs.cn/api/buffer.html) 為處理二進位資料時的物件，要求作業系統之記憶體空間配額。當使用 fs 檔案讀取時會用到存放處理，Buffer 在全域下不需要使用 require 就能使用。

```javascript index.js
const bf = Buffer.from('Loki', 'utf8');

console.log(bf); //<Buffer 4c 6f 6b 69>
console.log(bf.toString()); //Loki
console.log(bf.toString('hex')); //4c6f6b69
console.log(bf.toString('base64')); // hello
```

### path 路徑
[path](http://nodejs.cn/api/path.html) 主要是在進行 fs 檔案目錄之操作讀取寫入時，會遇到的字串轉換處理。

```javascript index.js
const path = require('path');

/* normalize 協助拔除 `.`, `..`, `\\`，以及修正如 windows 作業系統的路徑表示符號 */
console.log(path.normalize('C:////temp\\\\/\\/\\/foo/bar'));
//print C:\temp\foo\bar

/* join 能將指定字串進行合併 */
console.log(path.join(__dirname,'index.html'));
//print L:\nodeDemo\index.html

/* 
basename 取出字串之檔名
extname 取出字串之附檔名
dirname 取出字串之目錄路徑
*/

console.log(__filename);
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.dirname(__filename));
//print L:\nodeDemo\index.js
//print index.js
//print .js
//print L:\nodeDemo
```

### 其他原生模組
以下是部分常見模組，還有很多模組無法一一列出。下一節將重要的網路應用相關模組（包含原生與第三方）額外獨立介紹。

- os：控制作業系統或獲得相關資訊的方法。
- url：提供解析 URL 之方法。
- querystring：用來解析從用戶端傳回 querystring 字串之方法。
- util：提供開發者使用的實用函式。

# 網路應用
本章節目標將常用之網路應用開發所需模組與設計技巧。

## net 通訊服務
TCP 是 HTTP 通訊的基礎協定，作為 Server 與 Client 的封包傳送，用於一些底層上的資料確認通信使用。這不是網頁媒體使用，而只是一種資訊封包傳送技術。使用方式為透過 [net](http://nodejs.cn/api/net.html#net_net) 模組來進行架設 TCP 伺服器。我們需要設計兩個應用程式分別為 server.js 與 client.js，TCP 伺服器保持監聽模式等待 Client 進行連線進一步取得 Client 資料，並回應資料還給 Client。

```javascript server.js
const net = require('net');
const server = net.createServer(function (myConnect) {

  //顯示連線資訊
  console.log(`正在與 ${myConnect.remoteAddress}:${myConnect.remotePort} 建立連線`);

  //接收 Client Data 事件之處理
  myConnect.on('data', function (data) {
    console.log(`來自 ${myConnect.remoteAddress} 的 client 資料為 '${data}'`);

    //寫入資料至 Client 端
    const serverData=`hi! Client`;
    myConnect.write(serverData);
    console.log(`發送給 Client:${serverData}`)
  });

  //監聽 Client Close 事件之處理
  myConnect.on('close', function (had_error) {
    if (had_error) console.log('連線錯誤');
    else console.log('Client 連線已關閉，伺服器持續運作中。..');
  });
});

//啟用 Server 服務
const host = '192.168.1.105';
const port = 3999;
server.listen(port, host, function () {
  console.log(`伺服器服務中。...${host}:${port}`);
});
```
```javascript client.js
const net = require('net');
const client = new net.Socket(); //建立 Socket

//連線至 Server
const host = '192.168.1.105';
const port = 3999;
client.connect(port, host, function () {
  console.log(`連線至 Server ${host}:${port}`);

  //提供 client 資料傳送
  const clientData='hi! Server';
  client.write(clientData);
  console.log(`發送給 Server：${clientData}`)
});

//監聽 Server Data 事件之處理
client.on('data', function (data) {
  console.log(`Server 回應：${data}`);

  //請求關閉 Server 之連線
  console.log(`即將關閉伺服器連線。..`);
  client.destroy();
});

//接收 Server Close 事件之處理
client.on('close', function (had_error) {
  if (had_error) console.log('連線錯誤');
  else console.log('Server 連線已關閉');
});
```

接著透過不同 node 環境分別扮演 Server 與 Clinet 來測試連線。
![Image](https://i.imgur.com/omVygPq.png)

## http 網頁服務
HTTP 架構於前者 TCP 之上層協定，能作為 Web Server 與瀏覽器之間的資料傳送。我們能使用 [http](http://nodejs.cn/api/http.html) 模組來建立 Web Server 的相關類別、方法、事件（也是 NodeJS 的官方手冊初登場的新手教材教學），用於處理瀏覽器所發出的 HTTP 請求。

### 回應內容
當瀏覽器對伺服器進行 HTTP 請求時獲得文字回應方式：

1. 指定資料夾並建立 js 檔案，準備以下內容：
```javascript webServerTXT.js
const http = require('http');  //宣告原生模組 http

//建立伺服器且提供網頁狀態、HEAD 資訊、網頁內容
const server = http.createServer((request, response) => {

  // response.statusCode = 200;
  // response.setHeader('Content-Type', 'text/plain');  //設定 response HEAD
  // response.write('Hello World')  //設定網頁內容
  // response.end(); // response 送出
  // same as ↓

  response.writeHead(200,{'Content-Type':'text/plain'});　//response.setHeader() 適合循序參數調整且最後將由 writeHead() 進行嘗試合併，writeHeader() 內容優先為主
  response.end('Hello World');
});

//對伺服器進行開機並於完成作業後顯示文字至終端機
const hostname = '127.0.0.1', port = 3000; //設定 Web 主機與通訊埠
server.listen(port, hostname, () => {
  console.log(`
  Server running at http://${hostname}:${port}/
  Close Server press 'Ctrl+C' to exit
  `);
});
```
2. 接著終端機輸入指令。透過提示的指令開啟瀏覽器至指定 URL 網頁得到提示與伺服器運作之真實網頁。
```shell cmd
L:\nodeTest>node webServerTXT.js

  Server running at http://127.0.0.1:3000/
  Close Server Use Key 'Ctrl+C'
```

我們也可以直接回應一個網頁格式的內容，這裡我們寫得更簡速些，另注意 HEAD 資訊改為 `text/html`。

```javascript webServerHTML.js
require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test HTML</title>
    </head>
    
    <body>
      <h1>Hellor World</h1>
    </body>
    
    </html>
  `);
  res.end();
}).listen(3000, () => {
  console.log(' Server running at http://127.0.0.1:3000/');
});
```
```shell cmd
L:\nodeDemo>node webServerHTML
 Server running at http://127.0.0.1:3000/
```

也能傳送 JSON 資料給請求端，注意 HEAD 宣告改為 `application/json`。

```javascript webServerJSON.js
const http = require('http');
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' }); //設定 response HEAD
  response.write(JSON.stringify({ dog: "wow", cat: "kiki" }));
  response.end();
});
server.listen(3000, () => {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
```

關於 request 用途， `http.createServer` 所產生的 callback 之中，除了能指定 response 內容作為我們的目標網頁，request 也能提供非常多有用的 [IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 來源資訊。譬如我們可以取得請求方的資料如 URL、HEAD、DATA

```javascript test.js
const http = require('http');  //宣告原生模組 http
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); //設定 response HEAD
  for (const key in request) console.log(key);
  response.end();
});

server.listen(3000, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
// $ node test.js , will read all request's pototype
```

### 回應檔案
前面來說都是透過 JavaScript 來會應指定的文字，我們可以搭配 fs 模組取得內容進行回應。以下寫法為直接找到指定目錄，同時可以直接根據 URL 檔案名稱找到該目錄下的相同檔名，這裡多餘地利用 `require('path').basename(req.url)` 來過濾多餘路徑僅判斷檔名就好（不論 URL 的分類路徑）。以下前置先建立目錄 public 與 HTML 檔案 `index.html`, `a.html`, `b.html`, `page404.html`。

```javascript webServerHTML.js
const http = require('http');
const fs = require('fs');

const server = http.createServer(function (request, response) {
  const pageDir = __dirname + '/public/';
  const filePath = pageDir + (require('path').basename(request.url) || 'index.html');
  const page404 = pageDir + 'page404.html';

  fs.readFile(filePath, function (err, content) {
    if (!err) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content);
    } else {
      console.log(err);
      fs.readFile(page404, function (err, content404) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(content404);
      });
    }
  });
});
server.listen(3333, '127.0.0.1', function () {
  console.log(`Server running!!
  try http://127.0.0.1:3333/a.html
  try http://127.0.0.1:3333/b.html
  try http://127.0.0.1:3333/aaaaa/a.html
  try http://127.0.0.1:3333/c.html show '404 ERROR'
  `);
});
```

> 原生 HTTP 模組並不是很彈性，大部分的人都會推薦使用 npm 元件 express 作為網頁伺服器服務首選。

### 路由處理
路由是指透過 URL 請求路徑來判斷執行的檔案讀取，呈現一種靜態檔案與動態網頁內容的變化。舉例來說，可以根據請求的網址內容做不同的網址名稱（不需要副檔名）來找到指定的路徑檔案，以下前置與上節相同都有 public 目錄與數個檔案。：
```javascript webRouter.js
const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  const pageDir = __dirname + '/public/';
  const result = function () { //進行路由轉換：將動態 URL 算出靜態檔案位置
    switch (request.url) {
      case '/apple':
        return {
          code: 200,
          filePath: pageDir + 'a.html'
        };
      case '/banana':
        return {
          code: 200,
          filePath: pageDir + 'b.html'
        };
      default:
        return {
          code: 404,
          filePath: pageDir + 'page404.html'
        };
    }
  }();　//直接執行獲得物件資料

  fs.readFile(result.filePath, function (err, content) {
    response.writeHead(result.code, { 'Content-Type': 'text/html' }); //設定 response HEAD
    if (!err) response.end(content);
    else response.end(pageDir + 'page404.html'); //如果檔案讀取失敗直接顯示 404 檔案
  });

}).listen(3333, "127.0.0.1", () => {
  console.log(`Server running!!
    try http://127.0.0.1:3333/apple show 'word A'
    try http://127.0.0.1:3333/banana show 'word B'
    try http://127.0.0.1:3333/cat show '404 ERROR'
    `);
});
```

### 表單提交
我們延續路由機制進行設計，提供三種路由可能分別是表單、結果、不存在。表單部分進行設計一個 URL 路由指向到靜態檔案 form 並採用 POST 方式傳送，並提交後導向到結果部分，其路由指定之路徑名稱 url。如果是其他非指定的路由或非 POST 方式都導向到 404 頁面去。先規劃 `form.html` 並放入指定目錄 plubic 內。

```html form.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <form action="/url" method="post">
    your name: <input type="text" name="name"><br>
    password: <input type="password" name="pwd"><br>
    <input type="submit" value="send">
  </form>
</body>

</html>
```

接著設計 node 應用，這裡多引用 `require('querystring')` 能幫助我們將表單資料（為二進位資料，需進行 toString 才能變成文字串資料）轉換成 JSON 格式。

```javascript webRouterForm
const http = require('http');
const fs = require('fs');
const qs = require('querystring');

http.createServer((request, response) => {
  const pageDir = __dirname + '/public/';
  const result = function () { //進行路由轉換：將動態 URL 算出靜態檔案位置
    switch (request.url) {
      case '/form':
        return {
          code: 200,
          filePath: pageDir + 'form.html'
        };
      case '/url':
        return {
          code: 200,
          filePath: '' //為了表單處理，這裡不提供靜態檔案路徑
        };
      default:
        return {
          code: 404,
          filePath: pageDir + 'page404.html'
        };
    }
  }();　//直接執行獲得物件資料

  if (result.filePath != '') { //代表為靜態檔案需求
    fs.readFile(result.filePath, function (err, content) {
      response.writeHead(result.code, { 'Content-Type': 'text/html' }); //設定 response HEAD
      if (!err) response.end(content);
      else response.end(pageDir + 'page404.html'); //如果檔案讀取失敗直接顯示 404 檔案
    });
  } else { //代表做表單處理
    if (request.method == 'POST') {
      let body = null;
      request.on('data', function (content) { //data 事件，將資料 content 進行處理
        body = qs.parse(content.toString()); //content 本身是二進位，因此需要先轉成字串。接著透過 qs.parse() 能幫 name1=value1&name2=value2 轉換成 {name1:value1,name:value2}
      });
      request.on('end', function () { //end 事件，請求完畢後進行回應畫面之生成
        response.writeHead(result.code, { 'Content-Type': 'text/html' });
        response.write(`
          <!DOCTYPE html>
          <head>
            <meta charset="UTF-8">
            <title>Test HTML</title>
          </head>
          <body>
            <h1>Hi ${body.name}! Nice to meet you.</h1>
            <h2>Your Password is ${body.pwd}</h2>
          </body>
          </html>
        `);
        response.end();
      });
    } else response.end(pageDir + 'page404.html'); //如果不是 POST 方式傳送則顯示 404
  }
}).listen(3333, "127.0.0.1", () => {
  console.log(`Server running!!
    try http://127.0.0.1:3333/form/ and Submit
  `);
});
```

## Express.js
Express 是一個知名常用的網路應用程式開發框架，提供開發者更快有效建立 Web 應用程式且支援 MVC 架構。提供應用程式與 Web 之間完整的路由與中介軟體。

### 初次安裝
跟隨 [Express 官方手冊教學](https://expressjs.com/zh-tw/starter/installing.html)，我們試著從 npm 方式創造一個應用程式。
1. 於既定目錄下執行 npm init 初始化並填寫基本資訊，利用 init 來協助建立 package.json，過程中的參數事項可自行評估填寫或略過。
2. 將 express 相依安裝到專案目錄。另外可添加 `--save` 參數進行安裝，這能幫我們自動安裝相依關係清單中的模組。

```javascript
L:\nodeDemo>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (nodedemo)
version: (1.0.0)
description: my first express app
entry point: (index.js)
test command:
git repository:
keywords: study
author: Loki Jiang
license: (ISC)
About to write to L:\nodeDemo\package.json:

{
  "name": "nodedemo",
  "version": "1.0.0",
  "description": "my first express app",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "study"
  ],
  "author": "Loki Jiang",
  "license": "ISC"
}

Is this OK? (yes)

L:\nodeDemo>npm install express --save
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN nodedemo@1.0.0 No repository field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 50 packages in 24.638s
found 0 vulnerabilities

L:\nodeDemo>
```

### 初始運作與掛載靜態目錄
這裡試著用 express 產生一個可服務的 Node Web 運作，而 express 提供內建的中介軟體函式 `express.static` 來設定靜態路由，這能方便你掛載一些媒體檔案或網頁目錄。

1. 規劃練習檔案路徑為 `/formDir/post.html`, `/formDir/delete.html`, `/public/index.html`，內容隨意輸入能判別即可。
2. 規劃以下 index.js 檔案，並於終端機輸入 `node .` 或 `node ./` 即可執行嘗試並指定 URL 測試。這裡不用檔名是因為 index.js 命名技巧關係。

```javascript index.js
const express = require('express');
const app = express();

/* 設定靜態目錄
多個目錄掛載可多筆設定
亦可產生虛擬的目錄位置
*/
app.use(express.static('public')); //掛載靜態目錄 public 為 路由根目錄
app.use('/form', express.static('formDir')); //掛載靜態目錄 formDir 為路由另名目錄 form

const server = app.listen(3000, function () {
  console.log(`try URL
    http://127.0.0.1:3000/ (it's in plubic/index.html)
    http://127.0.0.1:3000/form/post.html (it's in formDir/post.html)
    http://127.0.0.1:3000/form/delete.html (it's in formDir/delete.html)
  `);
});

```

### 何謂 MVC
MVC 是一個設計上的物件導向模式之架構，並不是一個技術規範。將系統架構分類出 Model 資料模型、View 使用介面、Controller 控制邏輯三大核心元件。能很常的在一些 Web Applications 應用上被看到廣泛使用。

{% note danger %}
**Web 開發之類型**
- web Application
在 Web 開發領域內我們稱呼為 Web 應用，藉由使用者的 HTTP 請求內容，透過相關邏輯處理，在伺服器端生成使用者所需的資料畫面形成互動。像是常逛的網站都是這類型 Web 開發，譬如購物網站、網路銀行、拍賣、會員商務網站等。
- web Services
在 Web 開發領域內還有另一種稱呼為 Web 服務類型，透過 SOAP 協定或 RESTful API 方式進行資料交換，其實 Web 服務也是一種 Web 應用，只差在通常不是對直接對消費者的應用互動。像是 Google API、Ficker API、OpenData 等。
{% endnote %}

在開發 Web 應用時，傳統方式是從輸入、處理、輸出的步驟來完成互動設計。而 MVC 則是反將這些步驟拆解成三種元件，每當使用者使用瀏覽器提出 HTTP 請求時，由 Controller 收到請求進行執行動作，也就是控制 Model 與 View 的變化，而 Model 元件會負責將資料準備好使得 View 能順利生成 HTTP 回應。如圖所示：

![MVC 圖示說明](https://upload.wikimedia.org/wikipedia/commons/5/53/Router-MVC-DB.svg)

- Model 資料模型
主要負責 Web 應用的資料存取與處理規則，也就是存取至資料庫、fs 檔案、XML 等相關資料。
- View 使用介面
展示邏輯的物件，也就是建立使用者的瀏覽執行資訊，而 HTTP 回應的資訊通常是 HTML 網頁。View 元件會透過 Mode 元件來取得資料並將資料轉換成給使用者的畫面資訊。
- Controller 控制邏輯
整個 Web 應用的中心處，負責跟 view 跟 Model 元件之間的協調與控制執行，例如在獲得使用者的 HTTP 請求處理就屬於 Controller 控制器範圍內，根據所需操作去控制 Model 來存取資料，然後送至 View 進行畫面所需的 HTML 網頁。

### 應用程式產生器
Express 提供一個需安裝的 [產生器](https://expressjs.com/zh-tw/starter/generator.html) 能協助幫忙快速建立應用程式所需要的基本框架結構，透過該步驟協助能快速建立一個 Web 應用開發。

{% note default %}
使用產生器來建立應用程式結構，只是多種用來建立 Express 應用程式結構的其中一種方式。您有權使用這種結構，或是加以修改盡量符合您的需求。
{% endnote %}

#### 安裝
透過指令 `express-generator -g`進行全域安裝（必要）。Express Generator 與前面介紹的 Express 不同的是，Express 可透過區域安裝方式再自行 require 載入使用，而 Express Generator 是直接全域安裝並透過指令輸入`express <APP_NAME>`即可產生具備 MVC 架構的 APP 初始環境。因此選擇 Express Generator 來初始化應用即可，不用預先安裝 Express 到區域或全域上。

```shell
L:\nodeDemo>npm install express-generator -g
npm WARN deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)        
K:\VSCODE\data\user-data\User\lokiTools\nvs\node\14.15.3\x64\express -> K:\VSCODE\data\user-data\User\lokiTools\nvs\node\14.15.3\x64\node_modules\express-generator\bin\express-cli.js   
+ express-generator@4.16.1
added 10 packages from 13 contributors in 2.255s
```

#### 初始化應用
由於現在已經有全域指令 express 能使用，直接在目前工作目錄上建立一個名為 lokiApp 的 Express 應用程式：
```shell
L:\nodeDemo>express lokiApp

  warning: the default view engine will not be jade in future releases
  warning: use `--view=jade' or `--help' for additional options

   create : lokiApp\
   create : lokiApp\public\
   create : lokiApp\public\javascripts\
   create : lokiApp\public\images\
   create : lokiApp\public\stylesheets\
   create : lokiApp\public\stylesheets\style.css
   create : lokiApp\routes\
   create : lokiApp\routes\index.js
   create : lokiApp\routes\users.js
   create : lokiApp\views\
   create : lokiApp\views\error.jade
   create : lokiApp\views\index.jade
   create : lokiApp\views\layout.jade
   create : lokiApp\app.js
   create : lokiApp\package.json
   create : lokiApp\bin\
   create : lokiApp\bin\www

   change directory:
     > cd lokiApp

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=lokiapp:* & npm start
```
到現在你已經獲得一個應用程式目錄同時該目錄持有完整的 MVC 架構。接著根據提示我們需要轉到應用程式的目錄下，將所需要的相依模組安裝起來（將會自動生成 node_moudle 目錄與相關檔案）。
```shell
L:\nodeDemo>cd lokiApp

L:\nodeDemo\lokiApp>npm install
npm WARN deprecated jade@1.11.0: Jade has been renamed to pug, please install the latest version of pug instead of jade
npm WARN deprecated constantinople@3.0.2: Please update to at least constantinople 3.1.1
npm WARN deprecated transformers@2.1.0: Deprecated, use jstransformer
npm notice created a lockfile as package-lock.json. You should commit this file.
added 100 packages from 139 contributors and audited 101 packages in 75.152s
found 4 vulnerabilities (3 low, 1 critical)
  run `npm audit fix` to fix them, or `npm audit` for details
```
最後，你可以試著執行 Web 服務起來。
```shell
L:\nodeDemo\lokiApp>SET DEBUG=lokiapp:* & npm start

> lokiapp@0.0.0 start L:\nodeDemo\lokiApp
> node ./bin/www

  lokiapp:server Listening on port 3000 +0ms
GET / 200 523.280 ms - 170
GET /stylesheets/style.css 200 4.047 ms - 111
GET /favicon.ico 404 12.350 ms - 1012
```
![Image](https://i.imgur.com/jN6BO0j.png)

#### 結構說明

現有資料上上可以分為三個重要目錄：
- public：放置靜態 HTML5、CSS、JS 檔案。路由已經設定好，任何放入此目錄下的檔案都能直接對應網址上使用。譬如 `plubic/test.html`　的 URL 位置為 `http://127.0.0.1:3000/test.html`。
![Image](https://i.imgur.com/JsnCLNK.png)
- routes：路由模組
- views：MVC 的 View 目錄，由於是 Jade 樣板引擎所以副檔名皆為 `.jade`，預設會提供 error.jade, index.jade, layout.jade 三個樣板檔案
 
以及兩個重要檔案：
- app.js：用於 Express.js 運作 Web 的核心檔案。主要是將 Expres 相關環境連結搞定。以下附上註解部分說明。
```javascript app.js
var createError = require('http-errors');
var express = require('express'); //載入 Expres 模組
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//載入路由目錄下的 index.js 與 users.js，作為新增路由使用
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();//透過 app 拿來控制 Express 進行 set 與 use 相關設定。

// view engine setup
//設定 VIEW 樣板位置與引擎格式
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//透過 use 來開啟網站功能，像是網站記錄、欄位資料分析等。
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //指定靜態目錄位置為 public

//套用路由到 Express 網站的應用程式內
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
//處理 404 沒有找到的錯誤
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
//進行相關錯誤的處理過程
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//最後使用 export 方式匯出整個 Express 物件的變數 app
module.exports = app;
```
- package.json：相關定義檔案，包含版本號、資訊相依模組內容等。
- bin/www：建立 Web 服務的核心檔案，而預設埠 3000 也是在此設定。
```javascript bin/www
var port = normalizePort(process.env.PORT || '3000'); //預設 port 號
app.set('port', port);
```

#### 手動添加路由與 View 網頁
這裡我們將示範如何手動添加路由與 Jade 樣板引擎的 MVC 規劃的 View 頁面。首先需要對 `app.js` 進行載入路由與新增路由。
```javascript app.js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customRouter=require('./routes/custom'); //custom Route require

//...

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/custom', customRouter); // custom Route add
```
接著設計我們的 `routes/custom.js` 檔案（可以拿 index.js 來改）。
```javascript custom.js
var express = require('express');
var router = express.Router();

/* GET custom page. */

/*
透過 router.get() 的 GET 方法取得網頁
而 res.render() 能產生 response 生成網頁
- 由於是 Jade 引擎所以第一個參數需指定樣板檔案名稱（也就是檔案為 views/lokiJade)
- 第二個參數為該 response 之參數物件，這裡示範提供網頁標題
*/
router.get('/', function(req, res, next) {
  res.render('lokiJade', { title: 'My Custom Test' });
});

//最後進行 Export 匯出
module.exports = router;
```
再來到 MVC 結構的 views 目錄新增 Jade 樣板。這裡我們要對應正確名稱 `lokiJade.jade`
```jade
extends layout

block content
  h1= title
  p Welcome to #{title}
  div 這是用 JADE 語法寫出來的樣板網頁唷
```
JADE 可以分為兩大區域：
- `extend layout`：能幫忙擴展同目錄下 layout.jade 檔案。譬如 layout.jade 的內容就是常用的 html 宣告。
```jade layout.jade
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
```
- `block content`：為區塊替換，也就是 `layout.jade`與 `lokiJade.jade` 的 block content 形成內容。

Jade 語法簡介：
1. `=var` 符號為完整指定參數之內容，也就是可指定上一步驟的 response 參數物件。如果是在某字串內替換則使用`#{var}`方式來替換。
2. HTML 標籤指名稱沒有`<>`，如需指定 attr 屬性寫法為`(key1=val1,key2=val2)`，例如 `a(style="color:red;font-size:2rem",href="/index")`。
3. 指定 id 方式為 `div#id`，指定 class 方式為 `div.class` 即可，如此直白。

#### 檢查畫面結果

最後，我們可試著重新執行一次 <kbd>Ctrl+C</kbd>，這次可嘗試不添加 SET DEBUG 直接輸入指令。並測試網址畫面 `http://127.0.0.1:3000/custom` 是否成功。
```shell cmd
L:\nodeDemo\lokiApp>npm start
> lokiapp@0.0.0 start L:\nodeDemo\lokiApp
> node ./bin/www
```

當用戶瀏覽該網址時，Node.js 端的 Console 會看見相關 GET 動作，包含我們的路由目錄以及 CSS 樣式表。

```shell
GET /custom 304 184.458 ms - -
GET /stylesheets/style.css 304 1.382 ms - -
```

### 與 MySQL 連線
Express 扮演伺服器角色時，我們能跟各種 [資料庫](https://expressjs.com/zh-tw/guide/database-integration.html#mysql) 進行連線整合。舉例來說，在伺服器端安裝 MySQL 服務（這裡採 WINDOWS XAMPP 做簡單示範）並嘗試安裝模組進行連結。

事前準備 SQL，將以下 SQL 建立準備完畢，將獲得資料庫名為 node_sample 並持有 animal 資料表：
```sql db.sql
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `node_sample` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `node_sample`;

CREATE TABLE `animal` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` int(11) NOT NULL,
  `info` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `animal` (`id`, `name`, `weight`, `info`, `date`) VALUES
(1, '藪貓', 9, '食肉目 貓科 藪貓屬', '2020-12-20 08:21:08'),
(2, '耳廓狐', 17, '食肉目 犬科 狐屬', '2020-12-19 15:57:56'),
(3, '河馬', 120, '鯨偶蹄目 河馬科 河馬屬', '2020-11-07 08:52:06'),
(4, '印度象', 1258, '長鼻目 象科 象屬', '2020-11-07 08:52:06'),
(5, '浣熊', 30, '食肉目 浣熊科 浣熊屬', '2020-11-07 09:13:58'),
(6, '斑馬', 53, '奇蹄目 馬科 馬屬', '2020-11-07 08:52:06'),
(7, '瞪羚', 32, '鯨偶蹄目 牛科 瞪羚屬', '2020-11-07 08:52:06'),
(8, '土狼', 32, '食肉目 鬣狗科 土狼屬', '2020-11-07 08:52:06'),
(9, '水獺', 32, '食肉目 鼬科 小爪水獺屬', '2020-11-07 08:52:06'),
(10, '美洲豹', 999999, '食肉目 貓科 豹屬', '2020-11-07 08:52:06'),
(11, '山貓', 999999999, '食肉目 貓科 虎貓屬', '2020-11-07 08:52:06'),
(12, '馬來貘', 80, '奇蹄目 貘科 貘屬', '2020-11-07 09:13:33'),
(13, '馬島獴', 17, '食肉目 食蟻狸科 馬島獴屬', '2020-11-07 08:52:06'),
(14, '花鹿', 120, '鯨偶蹄目 鹿科 花鹿屬', '2020-11-07 08:52:06'),
(15, '眼鏡王蛇', 1258, '有鱗目 眼鏡蛇科 眼鏡王蛇屬', '2020-11-07 08:52:06'),
(16, '食蟻獸', 40, '披毛目 食蟻獸科 小食蟻獸屬', '2020-11-07 09:13:58'),
(17, '孔雀', 532, '雞形目 雉科 孔雀屬', '2020-11-07 10:54:58'),
(18, '袋獾', 32, '袋鼬目 袋鼬科 袋獾屬', '2020-11-07 10:55:05'),
(19, '傘蜥蜴', 555, '有鱗目 飛蜥科 傘蜥蜴屬', '2020-11-07 10:55:26'),
(20, '朱䴉', 32, '鵜形目 䴉科 朱䴉屬', '2020-11-07 08:52:06'),
(21, '羊駝', 999999, '鯨偶蹄目 駱駝科 小羊駝屬', '2020-11-07 08:52:06'),
(22, '美洲紅䴉', 55, '鵜形目 䴉科 美洲䴉屬', '2020-11-07 09:22:04'),
(23, '美洲河狸', 55, '嚙齒目 河狸科 河狸屬', '2020-11-07 09:24:31'),
(24, '黑尾土撥鼠', 999999999, '嚙齒目 松鼠科 草原犬鼠屬', '2020-11-07 08:52:06'),
(25, '獅子', 55, '食肉目 貓科 豹屬', '2020-12-20 09:38:19'),
(26, '原牛', 120, '鯨偶蹄目 牛科 牛屬', '2020-12-20 09:39:03'),
(27, '阿拉伯大羚羊', 2223, '鯨偶蹄目 牛科 長角羚屬', '2020-12-20 09:40:53'),
(28, '日本黑熊', 222, '食肉目 熊科 熊屬', '2020-12-20 09:49:00'),
(29, '駝鹿', 22, '鯨偶蹄目 鹿科 駝鹿屬', '2020-12-20 09:50:23');

ALTER TABLE `animal`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `animal`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;
```

接著為了與 MySQL 連結我們需要安裝 mysql 模組，進行全域安裝後嘗試簡單使用 test.js 來進行測試。

```javascript test.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_sample'
});
connection.connect();
connection.query('SELECT * FROM animal', function (err, rows, fields) {
  if (err) {
    console.log("sql content fail!!");
    throw err
  };
  console.log('The data is: ', rows);
});
connection.end();
```
接著指定路徑到檔案位置，直接透過 node 來執行該 js 應用程式（不是 Express 應用）。
```shell cmd
L:\nodeDemo>node test.js
The data is:  [
  RowDataPacket {
    id: 1,
    name: '藪貓',
    weight: 9,
    info: '食肉目 貓科 藪貓屬',
    date: 2020-12-20T00:21:08.000Z
  },
  RowDataPacket {
    id: 2,
    name: '耳廓狐',
    weight: 17,
    info: '食肉目 犬科 狐屬',
    date: 2020-12-19T07:57:56.000Z
  }
  //...（略）
]
```
#### Express 內使用 SELECT
沿用之前的 lokiApp 應用，我們將規劃一個路由作為顯示資料庫 SELECT 結果，並透過 jade 進行模板輸出。同樣的在那之前 mysql 模組已全域安裝完成。步驟修改處相同流程，先至 app.js 進行添加路由位置，未來只要網址輸入 `/animal` 則將指向到 `/routes/animal` 執行內容。
```javascript app.js
var animalRouter=require('./routes/animal'); /////////////////////////////custom SQL SELECT

//...

app.use('/animal', animalRouter); // custom Route add
```

接著到 routes 目錄新增 animal.js 進行應用程式編寫，每當有人到達指定 URL 請求時進行以下作業：

```javascript animal.js
var express = require('express');
var router = express.Router();
var content = require('./dbContent'); //將 DB 連結資訊以另外的地方編寫，再匯入回傳作為變數 content 之內容，此檔案位置為相同目錄下

router.get('/', function (req, res) {

  //執行 SQL 指令
  content.query('SELET * FROM animal', function (err, rows, fields) {
    if (!err) { //成功 F
      console.log(rows);
      // res.render('lokiJade', { title: 'My Custom Test' });
      res.render('aninalJade', { items: rows }); //將資料以 items 變數方式傳送給 JADE
    } else throw err; //失敗
  });
});

//最後進行 Export 匯出
module.exports = router;
```
```javascript dbContent.js
const mysql = require('mysql');
module.export = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_sample'
});
```
由於 response 的 render 作業會去取得 `animalJade.jade`樣板並持有變數 items。因此開始規劃網頁畫面結果：
```jade animalJade.jade
extends layout

block content
  table(border='1',style='width:100%')
    thead
      tr
        th ID
        th 名稱
        th 重量
        th 簡介
        th 修改日期
    tbody
      each item in items
        tr
          td=item.id
          td=item.name
          td=item.weight
          td=item.info
          td=item.date
```
此時嘗試網址 `http://127.0.0.1:3000/animal` 查看網頁結果。
![Image](https://i.imgur.com/7bqBjkB.png)


# 參考文獻

- [指南 | Node.js](https://nodejs.org/zh-cn/docs/guides/)
- [npm Docs](https://docs.npmjs.com/)
- [Node.js 中文网](http://nodejs.cn/api/)
- [Express - Node.js Web 應用程式架構](https://expressjs.com/zh-tw/)