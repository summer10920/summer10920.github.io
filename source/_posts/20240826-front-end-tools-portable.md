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
hidden: true
---

![](/assets/images/2024-08-28-00-51-14.png)

因工作上場地不同，需要有多台電腦之間使用 VSCode 開發工具並進行遠端分支 Git 操作。之前曾經簡單寫過 [這篇](http://localhost:4000/2020/12-30/article-nodejs/?highlight=%E5%85%8D%E5%AE%89%E8%A3%9D#Node-%E7%9A%84%E5%85%8D%E5%AE%89%E8%A3%9D-%EF%BC%88%E5%85%A9%E7%A8%AE%E6%96%B9%E5%BC%8F%EF%BC%89) 提到如何規劃一個 USB，但因為時間過久以及有些做法已經更新，所以這次重新重新整理並獨立一篇記錄下來。如果有需要可以參考使用。

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
- 規劃 git push 的伺服器設定，如果有需要避開陌生電腦的已存在的 gitg 授權設定。

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

## 部屬環境
如果你曾安裝過 git 跟 nvs 的獨立安裝程式，這些獨立程式會在安裝過程上幫助你在 windows 內部屬本機的 PATH 變數，讓這台電腦的 terminal 可以執行 git 指令跟 nvs 指令。然而我們現在要改用 portable 版本，自然就沒有獨立程式所包含的 PATH 設定，所以需要自己寫一個腳本來設定讓 terminal 認識 git 指令跟 nvs 指令。

另外，對於 VSCode 的整合性，會使用 VSCode 提供的終端機操作，而不是 windows 的 cmd 或 powershell 來執行。因此，我們會在 VSCode 的 settings.json 內規劃終端機的自訂選單。

### 增加終端機選單
輸入指令或 F1 開啟設定，搜尋`>Open User Settings`，找到指定處`terminal.integrated.profiles.windows`裡面，增加一個自訂命名的`Loki Portable`的終端機選單。這裡能讓你選擇使用哪一個終端機來執行終端機指令。由於我們寫在 User 的 Settings.json，所以這裡的設定套用到 VSCode 的整個 User 設定，因此個人電腦上同帳戶的 VSCode 也會吃到此設定（透過 Sync 功能），這是比較方便的方法，之後只要帳號登入就能使用。

一旦透過選擇了`Loki Portable`，就會執行`K:\VSCode-Portable-Tools\setup_portable-path.ps1`這個腳本，這個腳本會設定好 PATH 變數，讓你可以在 terminal 裡面直接使用 git 指令跟 nvs 指令。

```json settings.json
{
  //...
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    //...
    "Loki Portable": {
      "source": "PowerShell",
      "icon": "terminal-powershell",
      "args": [
        "-NoExit",
        "-File",
        "K:\\VSCode-Portable-Tools\\setup_portable-path.ps1"
      ]
    }
  },
//...
}
```

現在在 VSCode 的視窗上可以看到`Loki Portable`的終端機選單，選擇它就可以開始使用我們指定部屬的 portable 環境所需要的前置設定。

![](/assets/images/2024-08-27-23-51-00.png)

### 編寫腳本
我們要寫一個根據 powershell 的腳本，讓我們的終端機啟用時會先執行這個腳本，這個腳本需要幫助我們去設定好 PATH 變數，使得 VSCode 內的終端機可以直接使用 git 指令跟 nvs 指令。建立一個指定的檔案為 `K:\VSCode-Portable-Tools\setup_portable-path.ps1`，注意編碼格式為 UTF-8(BOM) 不然中文會亂碼。

setup_portable-path.ps1 腳本的內容主要為：

- 首先指定一個我們隨身碟的主要位置，也就是稍早指定的`K:\VSCode-Portable-Tools`，然後也需要路徑指出 git 跟 nvs 的所在位置。
- 由於這個腳本會跟著我們 VSCode Use 設定上的 terminal menu (Loki portable) 所執行，它可能在個人正式電腦上執行（已經有 nvs 跟 git)，跟陌生電腦上插著隨身碟，因此會判斷如果隨身碟路徑存在，則使用隨身碟的 nvs 跟 git，反之繼續使用這台電腦的 nvs 跟 git。這樣就不影響我們正式電腦跟陌生電腦 portable 上的使用差異了。
- 腳本會指定好 PATH 環境變量，使得 VSCode 終端機可以直接使用 git 指令跟 nvs 指令。
- 我還寫了輸出環境資訊，讓我們知道目前設定好的環境變量是什麼。
- 最後，腳本會定義一個 `leave` 函數，讓我們可以透過輸入 `leave` 指令來解除環境變量並退出 PowerShell。這樣隨身碟才能完整關閉與退出裝置。

```ps1 K:\VSCode-Portable-Tools\setup_portable-path.ps1
$OutputEncoding = [System.Text.Encoding]::UTF8

# 宣告基本路徑變數
$portablePath = "K:/VSCode-Portable-Tools"

# 宣告軟體路徑變數
$gitPortablePath = "$portablePath/PortableGit/bin"
$gitWindowsPath = (& where git -ErrorAction SilentlyContinue) | Select-Object -First 1 | Split-Path
$nvsPortablePath = "$portablePath/nvs-1.7.1"
$nvsWindowsPath = (& where nvs -ErrorAction SilentlyContinue) | Select-Object -First 1 | Split-Path
$sshConfigPath = "$portablePath/ssh/config"

# 設置 Git 路徑
if (Test-Path "$gitPortablePath/git.exe") { 
    $env:GIT_PATH = $gitPortablePath 
} elseif ($gitWindowsPath) { 
    $env:GIT_PATH = [System.IO.Path]::GetDirectoryName($gitWindowsPath) 
} else { 
    throw "未安裝 Git 或未能找到 Git 路徑" 
}

# 設置 NVS 路徑
if (Test-Path "$nvsPortablePath/nvs.cmd") { 
    $env:NVS_PATH = $nvsPortablePath 
} elseif ($nvsWindowsPath) { 
    $env:NVS_PATH = [System.IO.Path]::GetDirectoryName($nvsWindowsPath) 
} else { 
    throw "未安裝 NVS 或未能找到 NVS 路徑" 
}

# 更新 PATH 環境變量
$env:PATH = "$env:GIT_PATH;$env:NVS_PATH;$env:PATH"

# 輸出環境資訊
Write-Host "環境資訊：" -ForegroundColor Cyan

# 獲取 Git 路徑和版本
$gitPath = if ($env:GIT_PATH) { $env:GIT_PATH } else { "未找到" }
$gitVersion = (& git --version 2>&1) -replace '\s+', ' '

# 獲取 NVS 路徑和版本
$nvsPath = if ($env:NVS_PATH) { $env:NVS_PATH } else { "未找到" }
$nvsVersion = (& nvs --version 2>&1) -replace '\s+', ' '

# 獲取 SSH 版本
$sshVersion = (& ssh -V 2>&1) -replace '\s+', ' '

# 打印表格
Write-Host ("| 項目" + "`t" * 2 + "| 路徑" + "`t" * 6 + "| 版本 " + "`t" * 6 + "|") -ForegroundColor White
Write-Host ("| ------" + "`t" * 1 + "| ------" + "`t" * 5 + "| ------ " + "`t" * 5 + "|") -ForegroundColor White
Write-Host ("| Git 路徑" + "`t" * 1 + "| $gitPath" + "`t" * 1 + "| $gitVersion " + "`t" * 3 + "|") -ForegroundColor White
Write-Host ("| NVS 路徑" + "`t" * 1 + "| $nvsPath" + "`t" * 2 + "| $nvsVersion " + "`t" * 5 + "|") -ForegroundColor White

# 定義清理並退出的函數
function leave {
    Remove-Item env:GIT_PATH -ErrorAction SilentlyContinue
    Remove-Item env:NVS_PATH -ErrorAction SilentlyContinue
    Write-Host "環境變數已解除，正常卸載此外部儲存裝置" -ForegroundColor Yellow
    Start-Sleep -Seconds 2  # 暫停 2 秒以顯示信息
    exit
}

# 保持 PowerShell 打開，並提示用戶使用 leave 來退出
Write-Host "`n 輸入 '" -NoNewline
Write-Host "leave" -ForegroundColor Green -NoNewline
Write-Host "' 來解除環境變數並退出 PowerShell。"
```

### 允許執行腳本
試著點選`Loki Portable`的終端機選單，看看是否能正常執行。應該會發生拒絕執行腳本的錯誤，這是因為 Windows 10 預設的 PowerShell 執行原則是 Restricted，所以不允許執行未簽署的腳本。要解決這個問題讓這台電腦可以執行我們剛寫的腳本，要試著打開。

PowerShell 有 4 種執行原則：
- Restricted：所有 PowerShell Script 皆無法執行。(Windows 系統預設）
- AllSigned：所有 PowerShell Script 都要經過受信任的發行者簽屬過後才可執行。
- RemoteSigned：針對從異地下載下來的 PowerShell Script 需要經過受信任的發行者簽屬過後才可執行，本機的 PowerShell Script 可直接執行。
- Unrestricted：無限制，所有 PowerShell Script 皆可執行。

直接使用 windows 的 PowerShell ISE 右鍵以系統管理員執行開啟。輸入指令
- `get-executionpolicy` 看看目前的執行原則是什麼。這時候應該會看到 Restricted（因系統預設為這個）。
- `set-executionpolicy remotesigned` 執行更改為 remotesigned，在執行時會跳出警告視窗通知你要是否要改變，按下"是"。

現在試著點選`Loki Portable`的終端機選單，看看是否能正常執行。

## Git push 權限
以推送到 github 的情況舉例，當在電腦上第一次設定了遠端分支並嘗試 push 時，會遇到需要輸入帳號密碼的狀況，這是因為 Git 在嘗試連接到遠端伺服器時，需要驗證你的身份。，未來 push 就不需要再次輸入。這個驗證資訊紀錄被存放在本機的 `~/.git-credentials` 文件中是固定的，因此陌生電腦上會留下這個驗證資訊。

如果陌生電腦沒有用過 VSCode 跟 Git，比較沒有什麼問題。因為這台電腦經過你初次 push 且登入後，就已經記住你的 github 身分驗證資訊，所以之後不會再跳出來認證身分錯誤或失敗，所以目前為止應該已經可以正常使用 Portable 來操作 VSCode 與 Git push。

我要說的是，如果這台陌生電腦是另一個人常使用 VSCode 的環境，代表的是這台電腦已經記住那個人的 github 身分資訊。因此即使用你的 portable git 去 push 時，會看到一個錯誤訊息，指出遠端伺服器拒絕連接。這是因為你自己的遠端 Git 儲存庫不允許那個人的 github 身分做上傳，所以拒絕了當下的 push 請求。

我們能 portable 的是把程式安裝在隨身碟，至於 git 把認證資訊寫死在這台電腦位置內，這個問題我們就沒辦法控制了。導致這台電腦的 git 遠端操作都是這台電腦下的別人身分且自動嘗試登入，不會使用或詢問你的帳戶重新認證。GIT 本身就沒有考慮到一台電腦有兩個帳戶需要切換身分別的狀況。

為了解決這個問題，需要一些技巧嘗試避開這個問題。

### 設定 SSH 認證
為了解決這個問題，我們可以使用 SSH 金鑰來進行身份驗證，而不是使用帳號密碼。以下是設定 SSH 認證的步驟：

1. 在隨身碟中生成 SSH 金鑰對：
   打開 PowerShell, 執行以下命令：
   ```powershell
   ssh-keygen -t rsa -b 4096 -C "你的郵箱" -f "K:/VSCode-Portable-Tools/ssh/id_rsa"
   ```
   過程會詢問 passphrase 提示詞可以 enter 跳過，這會在指定路徑生成一對金鑰檔案：id_rsa（私鑰）和 id_rsa.pub（公鑰）。

2. 將公鑰添加到你的 GitHub 帳戶：
   - 複製 id_rsa.pub 檔案的內容（使用 VSCode 開啟，整個代碼都要複製）
   - 登入 GitHub, 進入 Settings > SSH and GPG keys
   - 點擊 "New SSH key", 貼上公鑰內容並保存

3. 在隨身碟中創建 SSH 配置檔案：
   在 "K:/VSCode-Portable-Tools/ssh/" 目錄下創建名為 "config" 的檔案，內容如下：
   ```
   Host github.com
       HostName github.com
       User git
       IdentityFile K:/VSCode-Portable-Tools/ssh/id_rsa
       IdentitiesOnly yes
   ```

4. 修改 Git 配置以多增加使用 SSH:
   在你的專案目錄中，執行：
   ```
   git remote set-url origin-ssh git@github.com: 你的用戶名/你的倉庫名。git
   ```

### 重寫可認出 SSH 的環境腳本
我們要重新追加剛剛的 ps1 腳本，讓他可以在我們指定的終端機環境認出 SSH 的設定。

```ps1 K:\VSCode-Portable-Tools\setup_portable-path.ps1
$OutputEncoding = [System.Text.Encoding]::UTF8

# 宣告基本路徑變數
$portablePath = "K:/VSCode-Portable-Tools"

# 宣告軟體路徑變數
$gitPortablePath = "$portablePath/PortableGit/bin"
$gitWindowsPath = (& where git -ErrorAction SilentlyContinue) | Select-Object -First 1 | Split-Path
$nvsPortablePath = "$portablePath/nvs-1.7.1"
$nvsWindowsPath = (& where nvs -ErrorAction SilentlyContinue) | Select-Object -First 1 | Split-Path
$sshConfigPath = "$portablePath/ssh/config"

# 設置 Git 路徑
if (Test-Path "$gitPortablePath/git.exe") { 
    $env:GIT_PATH = $gitPortablePath 
} elseif ($gitWindowsPath) { 
    $env:GIT_PATH = [System.IO.Path]::GetDirectoryName($gitWindowsPath) 
} else { 
    throw "未安裝 Git 或未能找到 Git 路徑" 
}

# 設置 NVS 路徑
if (Test-Path "$nvsPortablePath/nvs.cmd") { 
    $env:NVS_PATH = $nvsPortablePath 
} elseif ($nvsWindowsPath) { 
    $env:NVS_PATH = [System.IO.Path]::GetDirectoryName($nvsWindowsPath) 
} else { 
    throw "未安裝 NVS 或未能找到 NVS 路徑" 
}

# 更新 PATH 環境變量
$env:PATH = "$env:GIT_PATH;$env:NVS_PATH;$env:PATH"

# 更新 SSH 配置
if (Test-Path $sshConfigPath) {
    $env:GIT_SSH_COMMAND = "ssh -F $sshConfigPath"
    $sshConfigSet = $true
} else {
    $sshConfigSet = $false
    Write-Host "SSH 配置文件未找到：$sshConfigPath" -ForegroundColor Red
}

# 輸出環境資訊
Write-Host "環境資訊：" -ForegroundColor Cyan

# 獲取 Git 路徑和版本
$gitPath = if ($env:GIT_PATH) { $env:GIT_PATH } else { "未找到" }
$gitVersion = (& git --version 2>&1) -replace '\s+', ' '

# 獲取 NVS 路徑和版本
$nvsPath = if ($env:NVS_PATH) { $env:NVS_PATH } else { "未找到" }
$nvsVersion = (& nvs --version 2>&1) -replace '\s+', ' '

# 獲取 SSH 版本
$sshVersion = (& ssh -V 2>&1) -replace '\s+', ' '

# 打印表格
Write-Host ("| 項目" + "`t" * 2 + "| 路徑" + "`t" * 6 + "| 版本 " + "`t" * 6 + "|") -ForegroundColor White
Write-Host ("| ------" + "`t" * 1 + "| ------" + "`t" * 5 + "| ------ " + "`t" * 5 + "|") -ForegroundColor White
Write-Host ("| Git 路徑" + "`t" * 1 + "| $gitPath" + "`t" * 1 + "| $gitVersion " + "`t" * 3 + "|") -ForegroundColor White
Write-Host ("| NVS 路徑" + "`t" * 1 + "| $nvsPath" + "`t" * 2 + "| $nvsVersion " + "`t" * 5 + "|") -ForegroundColor White
Write-Host ("| SSH 配置" + "`t" * 1 + "| $sshConfigPath" + "`t" * 2 + "| $sshVersion " + "`t" * 1 + "|") -ForegroundColor White

# 定義清理並退出的函數
function leave {
    Remove-Item env:GIT_PATH -ErrorAction SilentlyContinue
    Remove-Item env:NVS_PATH -ErrorAction SilentlyContinue
    Remove-Item env:GIT_SSH_COMMAND -ErrorAction SilentlyContinue
    Write-Host "環境變數已解除，正常卸載此外部儲存裝置" -ForegroundColor Yellow
    Start-Sleep -Seconds 2  # 暫停 2 秒以顯示信息
    exit
}

# 保持 PowerShell 打開，並提示用戶使用 leave 來退出
Write-Host "`n 輸入 '" -NoNewline
Write-Host "leave" -ForegroundColor Green -NoNewline
Write-Host "' 來解除環境變數並退出 PowerShell。"
```

這樣設置後，Git 將使用你的 SSH 金鑰進行身份驗證，而不是使用系統存儲的憑證。每次在新的電腦上使用時，只需確保 SSH 配置檔案和金鑰檔案在正確的 portable 位置即可。同時你可以保留 https 方式的遠端 git 設定，讓你可以在自己電腦上都能採用 https 正常 push（不需要 ssh key)，只有當你在陌生電腦上使用 portable git 時又剛好遇到卡在別人身分無法透過 https 進行 git push 時，才需要使用 SSH 金鑰進行身份驗證來 git push。繞過了 https 會吃憑證的問題。


# 參考文獻
- ChatGPT