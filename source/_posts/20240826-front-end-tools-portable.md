---
title: '[行動工具] VSCode 的 Portable 免安裝開發環境 - 包含 Git、NVS 整合'
categories:
  - Zero Road
  - Web Fronted
tag:
  - Git/GitHub
  - NodeJS
  - VSCode
date: 2024-08-26 23:33:50
# hidden: true
---

![](/assets/images/2024-08-28-00-51-14.png)

因工作上場地不同，需要有多台電腦之間使用 VSCode 開發工具並進行遠端分支 Git 操作。之前在這篇 {% post_link article-nodejs %} 曾經簡單提到如何規劃一個 USB，但因為時間過久以及有些做法已經更新，所以這次整理新做法並獨立一篇記錄下來。如果有需要可以參考使用。

<!-- more -->
---

# 需求

怎樣的情況下會需要這樣的行動工具？大致上有以下幾種情況：

- 在陌生的電腦環境上，需要一個立即能使用的 VSCode 能進行編輯代碼，以及具備了 NodeJS 的環境，同時具備了 GIT 的環境。
- 既使這台電腦沒有安裝過 VSCode、NodeJS、GIT，也能立即使用，因為這些工具都已經安裝在你自己的 USB 上。
- 當你不信任這台陌生的電腦時，能使用自己帳戶登入的 VSCode、Git、NodeJS 環境相對安全些，熟悉的套件與遠端分支權限都是自己的，使用完畢也不用登出清除個人資料。
- 而本人最痛點的是，如果這台陌生電腦是公用的，或者這台陌生電腦是某個同事電腦，已經安裝且登入過 VSCode、Git、NodeJS 環境，你不願意使用他的帳戶與設定，也不願意把他的帳戶資料登出清除改成你的帳戶與設定。

如果你跟我一樣會需要一個可攜式的開發工具環境，或者口袋放一個 USB 隨身碟，隨時可在任何電腦上立即開發工作，可以往下繼續瀏覽如何建立。

> 以下都是以 Windows 電腦為需求說明

# 規劃步驟
大致上會做的步驟動作有以下要點：

- 使用 1 ~ 2 支 USB 隨身碟，可以是普通爛的 USB 3.0 隨身碟，也可以是貴的固態硬碟那種 M2 或 SSD。
- 指定隨身碟的磁碟代號，讓這些路徑固定不會跑掉。
- 從官方網站下載指定的軟體 portable 版本，並初始一些設定放入隨身碟。
- 編寫終端機腳本，讓這些軟體可以透過終端機指令啟動電腦環境。
- 規劃 git push 的伺服器設定，如果有需要避開陌生電腦的已存在的 git 授權設定。

## 隨身儲存裝置
首先需要 USB 隨身碟一至兩個，需要考量這個隨身碟是否能承受大量的寫入讀取動作。尤其是當 Node.js 環境與 VSCode 掛載時會影響到讀取次數。因此你可以選擇外接硬碟那種像是 M2 這種類型比較能像一般電腦硬碟承受讀寫次數，然而讀取速度就看電腦的接口裝置（可能是 USB3 或 TypeC，但這不太能去考量借用電腦的硬體規格，因此不用去考慮速度問題）。我自己是使用找到兩支少用的普通 USB 3.0 隨身碟，比較好的拿來當軟體（槽）使用，較差的當作專案儲存（槽）用。

實際使用上的觀念保持，定時備份遠端分支跟隨身碟的便利臨時性質用途。適時隨時透過 git 儲存庫上傳專案到遠端分支確保專案資料不要因為壞了而遺失，而軟體槽壞了也沒關係，重新做一支就好。如果在個人電腦上工作，隨身碟就少用吧。

### 指定磁碟代號
插入兩支 USB 隨身碟到電腦上，第一次會被電腦自動分配磁碟代號，此需要開啟磁碟管理，指定好這兩支隨身碟的英文代號並固定它永久不變，最好字母越後面越好，因為每台臨時電腦的硬碟數不同，可能`D:`,`E:`,`F:`,`G:`都已存在，所以字母越後面越不容易被佔用。我自己用`L:`跟`K:`，幾乎沒有電腦會有這麼多磁碟占用到這兩個。然後注意的是，每次到新陌生電腦時，都要重新設定一次同樣的磁碟代號。避免忘記，我會用`磁碟空間命名`方式提醒我應該設定"用途"跟"代號"。

![](assets/images/2024-08-27-20-52-38.png)

### 建立指定目錄
以我的軟體槽來說，建立一個跟這些有關的目錄，之後所有的 portable 所需要的東西都放入這裡。舉例主題是 VSCode，所以建立`K:\VSCode-Portable-Tools`

## 下載官方 Portable 版本
接著來去下載必要的軟體 Portable 版本，我們需要下載 VSCode、Node.JS、Git 這三樣東西。

### 安裝 VSCode
VSCode 來說，有必要可以看一下進入 [免安裝說明](https://code.visualstudio.com/docs/editor/portable)，大致上提到的是 VSCode 免安裝不支援直接軟體升級，如果更新版本就要重新下載新版的 Portable 版本號，然後示範如何無痛手動把設定檔案從舊版本 portable 搬移到新版 portable。

雖然說明文件沒提到，但你其實也可以依賴 VSCode 內建的 Settings Sync 機制，直接在新 VSCode 登入 VSCode 帳號無痛下載所有設定。

來到 [下載頁面](https://code.visualstudio.com/Download)，畫面上選擇 Windows 區域的 `.zip` x64 項目，直接下載壓縮包。然後解壓縮到我們指定的隨身碟位置，例如為`K:\VSCode-Portable-Tools\VSCode-win32-x64-1.84.2\`。

試著執行 VSCode 目錄下的 `code.exe`，如果成功會看到 VSCode 啟動。嘗試登入 VSCode 帳號使用 Setting Sync 功能，讓自己的環境回到熟悉一切的作業環境。

未來只要使用隨身碟，透過這個`code.exe`就能使用，當然你對`code.exe`右鍵新增桌面捷徑，把這個捷徑移動到隨身碟根目錄下。透過捷徑點擊就不用每次都跑到 portable 目錄下執行 exe。

### 安裝 NodeJS
接著我們要安裝 NodeJS 環境，通常我們會使用 [nvm](https://github.com/nvm-sh/nvm) 作為多版本 nodeJS 管理工具。不過我個人習慣使用 [nvs](https://github.com/jasongin/nvs) 來作為工具，主因是 nvm 主站上沒有支援 Windows，所以當時找的 nvs 一直用到現在也很穩定。

來到指定的 [release 下載處](https://github.com/jasongin/nvs/releases)，選擇較新的 `Source code(zip)`。解壓縮到`K:\VSCode-Portable-Tools\nvs-1.7.1`。

現在還沒有設定好，我們稍晚示範如何在 VSCode 環境下去使用 NVS。

### 安裝 Git
最後來到 GIT 的 [指定下載處](https://git-scm.com/download/win)，這裡要選擇的是 64-bit Git for Windows Portable. 也是先自解壓縮到搬移到我們指定目錄`K:\VSCode-Portable-Tools\PortableGit`。

也是還沒設定好，我們稍晚示範如何在 VSCode 環境下去使用 Git。

## 部屬 VSCode 初始 terminal 環境
如果你曾安裝過 git 跟 nvs 的獨立安裝程式，這些獨立程式會在安裝過程上幫助你在 windows 內部屬本機的 PATH 變數，讓這台電腦的 terminal 可以執行 git 指令跟 nvs 指令。然而我們現在要改用 VSCode portable 版本，自然就沒有獨立程式所包含的 PATH 設定，所以需要讓 Portable VSCode 能夠去使用我們的 Portable Git 與 NVS。

### 指定 PATH
為了讓 VSCode 去使用 Portable 的 GIT 與 NVS，我們需要設定 settings.json 去要求 VSCode 的 terminal 要去掛載 PATH。要注意的是在 settings.json 在 Sync 的作用下會同步到所有電腦內的 VSCode，因此在正常系統 install 安裝版本的電腦下，這些設定會導致找不到隨身碟而失敗。因此每次使用 portable 與 install 要自己手動去註解。如果沒有使用 sync 的問題，那這份 settings.json 差異只需要在 portable vscode 下編寫就好。

輸入指令或 F1 開啟設定，搜尋`>Open User Settings`，可以在最後一行或是特定的行樹內插入以下代碼：

```json K:\VSCode-Portable-Tools\VSCode-win32-x64-1.84.2\data\user-data\User\settings.json
{
  //...
  /********************************* portable 專屬設定 start ***********************************/
  "terminal.integrated.env.windows": {
  "GIT_PATH": "K:/VSCode-Portable-Tools/PortableGit/bin",
  "NVS_PATH": "K:/VSCode-Portable-Tools/nvs-1.7.1",
  "PATH": "K:/VSCode-Portable-Tools/PortableGit/bin;K:/VSCode-Portable-Tools/PortableGit/usr/bin;K:/VSCode-Portable-Tools/nvs-1.7.1;%PATH%"
  },
  /********************************* portable 專屬設定 end *************************************/
}
```

大致上為要求把 git（包含 git user 才能存放 git 登入身分） 跟 nvs 的 path 路徑都指定給 VSCode，讓 VSCode 啟動時，是使用這些 PATH 來部屬。這樣整個 VSCode 包含提供的原始碼控制以及終端機功能都能使用你指定的 PATH 設定。

另外也讓 vscode 去知道 git path 的位置在哪，這裡 git.path 可以用優先順序，先找 K: 否則再找 C：底下的安裝位置。其他 git 參數可參考。

```json K:\VSCode-Portable-Tools\VSCode-win32-x64-1.84.2\data\user-data\User\settings.json
{
  //...
  "git.autofetch": true,
  "git.inputValidationLength": 200,
  "git.inputValidationSubjectLength": 200,
  "git.path": [
    "K:\\VSCode-Portable-Tools\\PortableGit\\bin\\git.exe",
    "C:\\Users\\Loki\\AppData\\Roaming\\Code\\User\\lokiTools\\Git\\bin\\git.exe"
  ],
}
```

此時你可以試著開啟 VSCode 並在終端機功能的操作下是否可以正常使用 git 指令與 nvs 指令。但可以注意到當輸入`git config --global --list` 仍然還是電腦端已安裝 git 的 .gitconfig 為預設。為了避免我們也是需要手動建立一個。你可以直接複製你電腦端的`.gitconfig` 一份到 `K:\VSCode-Portable-Tools\PortableGit\.gitconfig`。只是注意如果有設定 core.editor 記得改回 portableVSCode 位置。

```git K:\VSCode-Portable-Tools\PortableGit\.gitconfig
[core]
	editor = "K:/VSCode-Portable-Tools/VSCode-win32-x64-1.84.2/bin/code" --wait
[user]
	name = Loki Jiang
	email = summer10920@gmail.com
[credential]
	credentialStore = wincredman
	helper = store
[safe]
	directory = L:/studiesAdvanced
	directory = L:/hexoBlog
[credential "helperselector"]
	selected = manager
```

然後再回到剛剛 settings.json 也把 git 的 global config 也綁到 portable VScode 內。變成

```json K:\VSCode-Portable-Tools\VSCode-win32-x64-1.84.2\data\user-data\User\settings.json
{
  //...
  /********************************* portable 專屬設定 start ***********************************/
  "terminal.integrated.env.windows": {
  "GIT_CONFIG_GLOBAL": "K:/VSCode-Portable-Tools/PortableGit/.gitconfig",
  "GIT_PATH": "K:/VSCode-Portable-Tools/PortableGit/bin",
  "NVS_PATH": "K:/VSCode-Portable-Tools/nvs-1.7.1",
  "PATH": "K:/VSCode-Portable-Tools/PortableGit/bin;K:/VSCode-Portable-Tools/PortableGit/usr/bin;K:/VSCode-Portable-Tools/nvs-1.7.1;%PATH%"
  },
  /********************************* portable 專屬設定 end *************************************/
}
```

現在試著執行 `git config --global --list` 看看是不是你的 portable 版本的`.gitconfig`。也可以試試 `git config --global --list` 能否透過 portable VSCode 開啟修改。

### Portable 的 Settings.json 部分不同步
如剛剛提到的，這裡的`terminal.integrated.env.windows`屬性，為我們希望作用在 Portable VSCode 上，如果正式 install VSCode 就不想使用到 Portable 的 PATH 設定。剛提到你需要手動的去註解在 install VSCode 上（比較麻煩便是）

除此之外，其實你也可以使用 VSCode 的`settingsSync.ignoredSettings`來指定排除的同步。

`settingsSync.ignoredSettings`的設定可以允許你不同電腦上的 VSCode 的 settings.json 內有哪些**屬性值**不進行替換。注意這裏特別提到**屬性值**，是因為 VSCode 的設計是，他仍然會對整個 settings.json 的 JSON 文件做版本控制。如果 A 電腦的`GIT_CONFIG_GLOBAL`屬性有寫，而 B 沒有存在`GIT_CONFIG_GLOBAL`屬性，那 Sync 動作還是會把這個視為版本更新，把兩邊同步了。早期我一直以為這是有 BUG 的設計。後來才知道，VSCode 會根據版控管理邏輯去同步兩邊的屬性變多還是少。然後再根據`settingsSync.ignoredSettings`的要求，對於指定的**屬性值**是否替換。

所以為了避免發生屬性消失，你必須對 A 環境的 portable VSCode 的 settings.json 指定這些**屬性值**為`K:\*`，然後 B 環境 install VSCode 保持使用原預設位置的**屬性值**（可使用電腦 PATH 參數）。

這樣兩邊都有屬性，只是不會被 sync 進行**屬性值**異動。參考以下設定再次調整 settings.json。（這裡我多了 php.executablePath 也做忽略，額外參考）

```json Portable VSCode's settings.json
{
  //...
  "settingsSync.ignoredSettings": [
    "php.executablePath",
    "terminal.integrated.env.windows"
  ], // settings.json 屬性忽略同步
  /********************************* portable 專屬設定 ***********************************/
  // for PHP IntelliSense, 讓 vscode 能看懂 php 幫你檢查錯誤或語法建議
  "php.executablePath": "K:/xampp/php/php.exe",
  "php.validate.executablePath": "K:/xampp/php/php.exe",
  // for Portable 裝置下的 PATH 綁定
  "terminal.integrated.env.windows": {
    "GIT_CONFIG_GLOBAL": "K:/VSCode-Portable-Tools/PortableGit/.gitconfig",
    "GIT_PATH": "K:/VSCode-Portable-Tools/PortableGit/bin",
    "NVS_PATH": "K:/VSCode-Portable-Tools/nvs-1.7.1",
    "PATH": "K:/VSCode-Portable-Tools/PortableGit/bin;K:/VSCode-Portable-Tools/nvs-1.7.1;%PATH%"
  },
}
```

```json Install VSCode's settings.json
{
  //...
  "settingsSync.ignoredSettings": [
    "php.executablePath",
    "terminal.integrated.env.windows"
  ], // settings.json 屬性忽略同步
  /********************************* portable 專屬設定 ***********************************/
  // for PHP IntelliSense, 讓 vscode 能看懂 php 幫你檢查錯誤或語法建議
  "php.executablePath": "${env:PHP_EXECUTABLE_PATH}",
  "php.validate.executablePath": "${env:PHP_VALIDATE_EXECUTABLE_PATH}",
  // for Portable 裝置下的 PATH 綁定
  "terminal.integrated.env.windows": {
    "GIT_CONFIG_GLOBAL": "${env:GIT_CONFIG_GLOBAL}",
    "GIT_PATH": "${env:GIT_PATH}",
    "NVS_PATH": "${env:NVS_PATH}",
    "PATH": "${env:PATH}"
  },
}
```

>注意，兩邊的屬性都要對應出現，ignoredSettings 只針對 values 忽略同步而已。

### 使用自訂終端機 profiles 來檢查
不清楚是否掛載成功指定到 portable git 與 nvs。我們可以編寫一個環境資訊的自訂 profiles，這個自訂只有初始顯示用途才開始使用正常的 PowerShell。每當在 VSCode 內的終端機功能畫面下，使用這個 terminal profile 時先顯示我們想知道的工具資訊。

參考以下的 profiles 設定：

```json K:\VSCode-Portable-Tools\VSCode-win32-x64-1.84.2\data\user-data\User\settings.json
{
  //...
  "terminal.integrated.defaultProfile.windows": "PowerShell", // 預設的 terminal 配置
  "terminal.integrated.profiles.windows": { // terminal 配置清單
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    //...
    "Loki PATH Check": { //check path info
      "source": "PowerShell",
      "icon": "terminal-powershell",
      "args": [
        "-NoExit",
        "-File",
        "K:\\VSCode-Portable-Tools\\path-check.ps1"
      ],
    },
  },
//...
}
```

一旦透過選擇了`Loki PATH Check`，就會執行`K:\\VSCode-Portable-Tools\\path-check.ps1`這個腳本，稍晚我們要編寫這個腳本，幫助我們在 terminal 畫面上顯示資訊。

現在在 VSCode 的視窗上可以看到`Loki PATH Check`的終端機選單，稍晚選擇它就可以開始使用我們指定的腳本顯示資訊並正常使用 powershell。

![](/assets/images/2024-08-29-10-41-11.png)

#### 環境資訊的 ps1 腳本
接著寫一個 powershell 的前置作業腳本，讓我們的終端機啟用時會先執行這個腳本，這個腳本需要幫助我們去檢查目前能使用的 PATH 資訊有哪些。我們要檢查的是現在的 GIT 跟 NVS 是哪裡來的。並將版本也顯示出來。為了方便些我還多寫了 node 與 npm 資訊檢查，如果你的 NVS 有成功設定 default，他會一併被捕獲。

建立一個指定的檔案為 `K:\VSCode-Portable-Tools\path-check.ps1`，注意編碼格式為 UTF-8 With BOM 不然中文會亂碼。

腳本的內容主要為：

- Get-CommandInfo 為負責查找指定名稱的 path 路徑與版本。
- Write-Item 顯示指定名稱的 path 路徑與版本。
- 透過指定的名稱迴圈，去批次查找與顯示。

```ps1 K:\VSCode-Portable-Tools\path-check.ps1
$OutputEncoding = [System.Text.Encoding]::UTF8

function Get-CommandInfo {
    param (
        [string]$commandName
    )
    $command = Get-Command $commandName -ErrorAction SilentlyContinue
    $path = if ($command) { $command.Source } else { "未找到" }
    $version = if ($command) { (& $commandName --version 2>&1) -replace '\s+', ' ' } else { "未安裝" }
    return @{ Path = $path; Version = $version }
}

function Write-Item {
    param (
        [string]$itemName,
        [hashtable]$commandInfo
    )
    Write-Host ($itemName) -ForegroundColor Cyan -NoNewline
    Write-Host ("`t" * 2 + "| ") -NoNewline
    Write-Host $commandInfo.Path -ForegroundColor Green -NoNewline
    Write-Host ("`t" * 1) -NoNewline
    Write-Host $commandInfo.Version -ForegroundColor Yellow
}

# Header
Write-Host "環境資訊" -ForegroundColor Cyan -NoNewline
Write-Host ("" + "`t" * 1 + "| ") -NoNewline
Write-Host "使用路徑" -ForegroundColor Green -NoNewline
Write-Host " vs " -NoNewline
Write-Host "版本" -ForegroundColor Yellow
Write-Host ("------" + "`t" * 2 + "| ------") -ForegroundColor White

# Items
$commands = @("Git", "NVS", "npm", "node")
foreach ($command in $commands) {
    Write-Item $command (Get-CommandInfo $command.ToLower())
}

```

#### 允許執行腳本
試著點選`Loki PATH Check`的終端機選單，看看是否能正常執行。應該會發生拒絕執行腳本的錯誤，這是因為 Windows 10 預設的 PowerShell 執行原則是 Restricted，所以不允許執行未簽署的腳本。要解決這個問題讓這台電腦可以執行我們剛寫的腳本，要試著打開。

PowerShell 有 4 種執行原則：
- Restricted：所有 PowerShell Script 皆無法執行 （為 Windows 系統預設）。
- AllSigned：所有 PowerShell Script 都要經過受信任的發行者簽屬過後才可執行。
- RemoteSigned：針對從異地下載下來的 PowerShell Script 需要經過受信任的發行者簽屬過後才可執行，本機的 PowerShell Script 可直接執行。
- Unrestricted：無限制，所有 PowerShell Script 皆可執行。

直接使用 windows 的 PowerShell ISE 右鍵以系統管理員執行開啟。輸入指令
- `get-executionpolicy` 看看目前的執行原則是什麼。這時候應該會看到 Restricted（因系統預設為這個）。
- `set-executionpolicy remotesigned` 執行更改為 remotesigned，在執行時會跳出警告視窗通知你要是否要改變，按下"是"。

現在試著點選`Loki Portable`的終端機選單，看看是否能正常執行。

![](/assets/images/2024-08-29-10-51-12.png)

也可以試著去操作 VSCode 的原始碼控制功能，看看是否正常使用。

# 參考文獻
- ChatGPT