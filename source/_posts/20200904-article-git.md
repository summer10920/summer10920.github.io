---
title: "[學習之路] Git 與 GitHub 版本管理工具"
categories:
  - Zero Road
  - Tools
tag:
  - Git & GitHub
  - VSCode
date: 2020-09-04 01:34:46
---

什麼是 GIT? 是一種將開發代碼過程的工作變得輕鬆的版本控制工具，藉由不斷生成快照的方式將過程記錄歷史起來。每當需要在不同的階段進行調整時能，有效的跳躍時間點進行修改與合併。另外當你屬於多人團隊進行開發專案時，能協助你溝通整合批次的加入代碼使作業更妥善運作。另外也包含了參與開源專案的共享與請求作業。

>本篇適合沒有 GIT 基礎觀念的對象，同時一律採用 VSCode 環境的角度來學習操作 GIT。本篇介紹過程中，初期依賴 VSCode 的終端機功能來進行 GIT 指令練習與處理。後期透過 VSCode 進行圖形化操作使用。

<!-- more -->

---

# 基本操作
本篇採用以下作業環境進行解說，請先安裝妥善好以下環境：

- Windows 工作環境
- VSCode 版本 v1.48.2 ，安裝來源為 https://code.visualstudio.com/Download
- GIT Graph 分支圖形化工具【VSCode 套件】，安裝來源為 https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph
- Git 版本 v2.28.0 ，安裝來源為 https://git-scm.com/download/win (GIT 安裝注意要選擇 Use Visual Studio Code as Git's default editor)
- 記得註冊一個 GitHub 帳戶，平台為 https://github.com/

如果你已經安裝好以上環境，可以透過 VSCode 的終端機介面輸指令入`git` 查看相關資訊並獲得大量的重要指令。

```shell cmd
> L:\>git
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command[<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone             Clone a repository into a new directory
   init              Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add               Add file contents to the index
   mv                Move or rename a file, a directory, or a symlink
   restore           Restore working tree files
   rm                Remove files from the working tree and from the index
   sparse-checkout   Initialize and modify the sparse-checkout

examine the history and state (see also: git help revisions)
   bisect            Use binary search to find the commit that introduced a bug
   diff              Show changes between commits, commit and working tree, etc
   grep              Print lines matching a pattern
   log               Show commit logs
   show              Show various types of objects
   status            Show the working tree status

grow, mark and tweak your common history
   branch            List, create, or delete branches
   commit            Record changes to the repository
   merge             Join two or more development histories together
   rebase            Reapply commits on top of another base tip
   reset             Reset current HEAD to the specified state
   switch            Switch branches
   tag               Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch             Download objects and refs from another repository
   pull              Fetch from and integrate with another repository or a local branch
   push              Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
See 'git help git' for an overview of the system.
```
到這裡不用慌亂，之後會慢慢的接觸到這些指令並一邊說明，同時我們都盡量在 VSCode 上操作一切。

## 設定作者資訊
接著我們要對 GIT 提供重要的兩筆 config 設定（主要指令為`git config`)，分別是你的名字與信箱。這能對之後使用儲存庫時能表明作者是誰。從官網的簡單說明上提到，可透過以下指令進行設定：

```shell cmd
> L:\>git config --global user.name "<你的名字>"
> L:\>git config --global user.email "<你的信箱>"

# --global 是寫在 Windows 路徑為 C:\Users\<user name>\.gitconfig 裡面
```

目前任何參數僅限於設定在全域 (global) 區域，也就是這台電腦上。每次操作 ropo 時系統會自動去尋找 config 在哪裡並有優先權，可能在 repository、global、或 system 內，如果是用免安裝版本我反而會寫在 --systme 內

```shell cmd
> L:\>git config --system user.name "<你的名字>"
> L:\>git config --system user.email "<你的信箱>"

# --system 是寫在 Windows 路徑為 <Git 安裝位置>\etc\gitconfig 裡面
```

## 生成 repo
如前面所說，GIT 能夠幫助你把整個工作專案打包成一個快照並儲存起來。我們需要在你的專案資料夾內先建立一個 repository（簡稱 repo) 儲存庫，讓 GIT 來保管你的專案。從前面 GIT 的回饋資訊得知，要開始規劃工作目錄（你的工作專案）建立 repo 的方式，可以是來自 clone（透過複製來建立，來自別處已存在的 repo）或 init 方式本地端全新建立。

### 新建 init
1. 建立資料夾 `git_study`
2. 透過終端機轉到此目錄
3. 輸入指令`git init`, 這能幫助你建立隱藏資料夾`.git`
```shell cmd
> L:\>cd git_study
> L:\git_study>git init
Initialized empty Git repository in > L:/git_study/.git/
```
{% note info %}
**VSCode 視窗化操作**：
可透過 <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>p</kbd> 輸入 `>git init repo` 來指定資料夾，VSCode 會幫你建立存放庫（儲存庫 repo) 環境。輸入文字過程中可以破碎單字或中文拼成，VSCode 會自動提示可能之對應結果。
{% endnote %}

### 複製 clone
你可以選擇從一個 URL 進行 clone，也能從一個已存在的 repo 進行 clone。

#### 從 github 進行 clone
我們從 Github 個人帳戶先新增一個練習用的 repo，首先從你的 github 帳戶生出一個練習用的 repo，根據以下簡約說明步驟完成：

1. 右上角人像旁的 `+` 點選 new repository
2. Repository name 這裡輸入 git_study_onGitHub
3. 其他參數跳過，選擇下方的 Create repository 完成新增
4. 取得畫面上寫到的 url 像是 `https://github.com/<user name>/git_study_onGitHub.git `，同時也提示你如何使用 git 指令連線 (remote)，這裡我們先學複製方式不先學連線方式
5. 透過畫面上的小提示 We recommend every repository include a `README`...，試著點選 README 寫點東西並完成 Commit new file
6. 至少目前 Github 上的這個 repo 內含有一個檔案為 README
<!-- ![Image](https://i.imgur.com/YOrCHcX.png) -->
![Image](https://i.imgur.com/r2wxR6k.png)
7. 接著開始回到 VSCode 的終端機開始複製。
```shell cmd
> L:\git_study>cd /
> L:\>git clone https://github.com/summer10920/git_study_onGitHub.git

Cloning into 'git_study_onGitHub'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 654 bytes | 3.00 KiB/s, done.
```
{% note info %}
**VSCode 視窗化操作**：
可透過 <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>p</kbd> 輸入 `>git clone` 達到相同指令結果。
{% endnote %}

目前你已成功從另一複製 repo 放到你的磁碟機內。來源 repo 內的任何檔案都會複製下來。也同時擁有 git 的儲存庫。

#### 從本地 repo 進行 clone
也可以從某個已存在的 repo 進行複製成新的，同時建議另外命名為新的 repo 名稱 (URL 也適用重新命名）。
```
# git clone <來源之相對路徑<新名稱>
> L:\>git clone git_study git_copy

Cloning into 'git_copy'...
warning: You appear to have cloned an empty repository.
done.
```
目前手上磁碟機下有三個 repo 目錄且每資料夾內下都有自己的 `.git`，此隱藏資料夾作為 git 快照應用與歷史資訊。

{% note warning %}
**科普知識：**
- init 適合用乾淨的建立，從本地端開始
- clone 代表另存新檔的方式建立，可從遠端或另一個本地端的 repo 進行複製
- remote 是指定掛載遠端上游分支來源，提供異地 repo 做相關同步儲存與共享使用，之後會再介紹 remote 觀念
{% endnote %}

## 暫存與提交 staged & commit
當你準備好一切的 git 作為版本管理工具（已完成 repo 建立），你可以開始提交你的專案代碼給 git 作為 commit。

### 三態變化
想要使用 GIT 前需要先知道有三種型態，你將很常在這三種區域型態內將你的代碼轉移，分別是工作目錄 (Working Directory)、暫存區 (Staging Area)、Git 儲存庫 (Repository)。從官網的文件說明上取得以下圖片說明：

![Image](https://git-scm.com/book/en/v2/images/areas.png)

注意以下觀念說明：

1. Working Directory：工作目錄就是你平時編寫程式的目錄專案，所有的檔案在這裡進行新增修改刪除都會被 git 所觀察但不做任何快照或歷史追蹤。
2. Staging Area：只有當你把指定的檔案加入到暫存區進行追蹤，代表這些檔案你是希望被快照記錄起來的，這只是一個前置的等待整合作業（設定檔案的追蹤索引）。
3. Repository：正式進行提交到儲存庫時，git 將會幫你建立快照與歷史紀錄，同時幫你偵測是否未來有所變化。
4. Modified：當檔案被整合到某個 commit 快照內，將會保持監控。如果你對這個檔案進行修改刪除時，檔案會被警告已變動，並要求你這個檔案重新的進行提交產生另一個新的快照。

換個角度來說，每個檔案都有以下的變化（未追蹤 - 未修改 - 已修改 - 列入暫存），可利用 `git status` 觀察到：
![Image](https://i.imgur.com/MYipxrR.png)

### 示範操作 - 加入暫存與提交
開始之前，我們已經準備好了 repo，接著新增一些檔案並使用 GIT 的快照功能來監控檔案。

1. 我們在 git_study 內新增兩個檔案，分別是 demo1.html 與 demo2.html，並試著寫下一些內容：
```html demo1.html
<body>
  <h1>Hello World by demo1</h1>
</body>
```
```html demo2.html
<body>
  <h1>Hello World by demo2</h1>
</body>
```
2. 此時你可以透過指令 `git status` 檢查目前的狀況：
```shell cmd
> L:\>cd git_study
> L:\git_study>git status

On branch master
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        demo1.html
        demo2.html
nothing added to commit but untracked files present (use "git add" to track)

# 畫面上告知你還沒有進行任何 commit 提交（無快照）
# 同時發現有兩個檔案尚未追蹤（紅字標示），提示你應該用 git add 來加入提交，方便之後的追蹤
```
3. 使用 `git add <file>` 來一筆筆加入暫存區，或者使用 `get add .` 作全部目錄內的檔案都提交（可能害到你提交出的非你所需的檔案或無用檔案）
```shell cmd
> L:\git_study>git add demo1.html
> L:\git_study>git status

On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   demo1.html

# 這裡會表示綠字，代表已加入提交區準備被追蹤

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        demo2.html

# 這裡的紅字代表還沒加入暫存區
```
4. 不管它的我們先提交出去，使用 `git commit -m <簡要資訊>` 進行快速提交，並隨後檢查一次 status
```shell cmd
> L:\git_study>git commit -m "第一次的提交練習"

[master (root-commit) 59a2dc4] 第一次的提交練習
 1 file changed, 11 insertions(+)
 create mode 100644 demo1.html

> L:\git_study>git status

On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        demo2.html

nothing added to commit but untracked files present (use "git add" to track)

# 有一個 demo1.html 檔案已經建立加入快照
# 而 demo2.html 還是沒有被加入快照但也不會怎樣，只是當透過 status 指令能清楚看到目錄內的檔案狀況
```
5. 此時可以透過 `git log` 來查看詳細的提交紀錄
```shell cmd
> L:\git_study>git log

commit 59a2dc41b127fc84226b77f80004c29f39a1dada (HEAD -master)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Mon Sep 14 23:09:57 2020 +0800

    第一次的提交練習

# 此時你能看到一些情報，包含作者與日期、快照編碼 (59a2dc....)、提交資訊。另外還有個 HEAD 是目前指向到 master 這個位置（稍晚解釋）
```
6. 現在我們也把另一個檔案 demo2.html 加入暫存並提交，觀察快照編碼變化。此時我們改另一方式使用 `git commit` 指令就好（沒有夾帶簡要資訊）
```shell cmd
> L:\git_study>git add demo2.html
> L:\git_study>git commit

hint: Waiting for your editor to close the file...
```
7. 你會發現 VSCODE 會彈跳一個可讓你完整編寫 `.git\COMMIT_EDITMSG` 之動作，也就是提交完整資訊。編輯完成直接關閉即可
```shell COMMIT_EDITMSG
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch master
# Changes to be committed:
#	new file:   demo2.html
#

這是第二次的 commit 提交
並使用完整的提交資訊編寫
```
8. 此時 commit 指令會繼續作業為完成，順便我們檢查一下 status 與 log
```shell cmd
> L:\git_study>git status
On branch master
nothing to commit, working tree clean

> L:\git_study>git log
commit 1b1cc5b62768cd1d1fdc52546a11d5bd37db84b3 (HEAD -master)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Mon Sep 14 23:42:54 2020 +0800

    這是第二次的 commit 提交
    並使用完整的提交資訊編寫

commit 59a2dc41b127fc84226b77f80004c29f39a1dada
Author: Loki Jiang <summer10920@gmail.com>
Date:   Mon Sep 14 23:09:57 2020 +0800

    第一次的提交練習

# status 的狀態處於沒事，也沒有什麼檔案困擾著是否未加入暫存或提交的提示資訊。
# log 這裡很清楚又多了一個新快照編碼 (1b1cc5....)，又告知你目前 HEAD 跑到這裡且指著 master
```
9. 接著我們試著修改 demo1.html 做一些變化
```html demo1.html
<body>
  <h1>Hello World by demo1</h1>
  <p>我們新增了一行文字在這裡</p>
</body>
```
10. 然後觀察一下狀態 status
```shell cmd
> L:\git_study>git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   demo1.html

no changes added to commit (use "git add" and/or "git commit -a")

# 這裡告知我們這個 demo1.html 檔案已經被修改
# 你可以選擇 add 指定檔案到暫存區並試著提交它
# 或者可以選擇 restore 還原指定檔案，他會從快照區還原到你的工作目錄，使得檔案不曾被修改過
```
11. 試著還原 restore demo1.html，會發現剛剛的檔案之修改被還原了，還原的快照點來源，是根據 HEAD 目前指向的快照為主。
```shell cmd
> L:\git_study>git restore demo1.html
> L:\git_study>git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   demo1.html

no changes added to commit (use "git add" and/or "git commit -a")
```
12. 我們重新再做一次步驟 9，這次要再提交一次並觀察狀況與紀錄
```shell cmd
> L:\git_study>git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   demo1.html

no changes added to commit (use "git add" and/or "git commit -a")

> L:\git_study>git add .
> L:\git_study>git status

On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   demo1.html

> L:\git_study>git commit -m 我增加了一行文字

[master a46dd15] 我增加了一行文字
 1 file changed, 1 insertion(+)

> L:\git_study>git status

On branch master
nothing to commit, working tree clean

> L:\git_study>git log

commit a46dd157b09221fadff4ede08a7dad43475ab54d (HEAD -master)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Tue Sep 15 00:57:35 2020 +0800

    我增加了一行文字

commit 1b1cc5b62768cd1d1fdc52546a11d5bd37db84b3
Author: Loki Jiang <summer10920@gmail.com>
Date:   Mon Sep 14 23:42:54 2020 +0800

    這是第二次的 commit 提交
    並使用完整的提交資訊編寫

commit 59a2dc41b127fc84226b77f80004c29f39a1dada
Author: Loki Jiang <summer10920@gmail.com>
Date:   Mon Sep 14 23:09:57 2020 +0800

    第一次的提交練習

# 此時又推進到新的快照（編碼為 a46dd1....)
```

目前為止大致過程的玩法是：
- 每次的新增修改刪除檔案，都會自動歸入 <mark>Working Directory 工作區</mark> 。
- 要進行 <mark>commit 提交</mark> 之前，你必需要透過 add 指令（手動審核你的檔案）先加入到 <mark>Staging Area 暫存區</mark> 。
- 提交時都需要提供簡單說明，這樣這一次的提交會變成一個快照點記錄起來。
- 隨時可確認目前三態可以使用 status 指令，確認快照紀錄可使用 log 指令。

### 示範操作 - 進退暫存區
接著我們繼續練習提交後的修改作業，這裡會將已追蹤的檔案狀態從未修改→已修改→入暫存→取消暫存（已修改）：

1. 現在修改 demo2.html，試著修改於舊的代碼與新的代碼，status 狀態如果你發現被修改，可以透過 `git diff` 調閱出修改前後的差異為何：
```html demo2.html
<body>
  <h1>這裡的字被修改了</h1>
  <p>這是另一個新增內容的測試</p>
</body>
```
```shell cmd
> L:\git_study>git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   demo2.html

no changes added to commit (use "git add" and/or "git commit -a")

> L:\git_study>git diff

diff --git a/demo2.html b/demo2.html
index dd5128a..d008a86 100644
--- a/demo2.html
+++ b/demo2.html
@@ -6,6 +6,7 @@
   <title>Document</title>
 </head>
 <body>
-  <h1>Hello World by demo2</h1>
+  <h1>這裡的字被修改了</h1>
+  <p>這是另一個新增內容的測試</p>
 </body>
 </html>
\ No newline at end of file

# 紅字是被改掉的，用 - 符號來表示
# 綠字是新的內容，用 + 符號來表示
```
2. 下一步是提交到暫存區，如果你突然反悔想把檔案取消暫存，如畫面提示輸入 `git restore --staged <files>`
```shell cmd
> L:\git_study>git add .
> L:\git_study>git status

On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   demo2.html

# 這裡會是綠字的 modified，代表已在暫存區

> L:\git_study>git restore --staged demo2.html
> L:\git_study>git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   demo2.html

no changes added to commit (use "git add" and/or "git commit -a")

# 這裡會是紅字的 modified，代表還沒加入暫存區
```

## 小劇場練習

### 修正上次的 commit
當某次 commit 出去後，忘記某檔案也要 add 出去，你可以利用這次的 commit 來覆蓋 commit 上次的內容，保持同個快照動作：

```shell cmd
> L:\git_study>git commit -m "失誤的提交"
> L:\git_study>git log -2
> L:\git_study>git add demo3.html
> L:\git_study>git commit --amend -m "修正的提交"
> L:\git_study>git log -2

# 初次提交出去後，檢查最後兩個快照描述
# 此時將修正的檔案加入，並透過指令 amend 進行上次的提交修正
# 檢查最後兩個快照，發現一開始的提交被覆蓋了
```

### 後悔檔案 add 列入暫存
譬如你進行 `git add *` 將所有檔案加入暫存，事實上某個檔案（可能是 tmp 檔案）是不需要加入做提交準備，你可以根據官網說明用 reset 來到。這會清除 HEAD 對該檔案的暫存狀態回歸到原本，也就是甚麼都沒發生過（回歸到工作目錄階段去）。

```shell cmd
> L:\git_study>git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   demo1.html
        modified:   demo3.html
no changes added to commit (use "git add" and/or "git commit -a")
# 目前有兩個檔案有異動為紅色提示，要求你加入暫存

> L:\git_study>git add *
> L:\git_study>git status

On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   demo1.html
        modified:   demo3.html
# 透過全部提交加入暫存，但後悔不想提交 demo3.html

> L:\git_study>git reset HEAD demo3.html

Unstaged changes after reset:
M       demo3.html
# 透過指令將檔案退回暫存回到未提交狀態

> L:\git_study>git status

On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   demo1.html
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   demo3.html
# 現在 demo3.html 處於已修改但未暫存狀態
```

{% note danger %}
**移除暫存回工作目錄的方式 restore 跟 reset HEAD 差別？**
前者 restore 是比較新的方式，只單純對工作目錄、暫存、快照之間的切換做還原。後者是透過 HEAD 來進行還原階段（舊方式），對於 reset HEAD 來說可以操作修改到 repo 內的分支結構，所以操作不當將導致影響很大。
建議 restore 來做工作目錄各種還原會更安全些，在部分教學跟官方文件有提及到 reset 來進行 unstage 作業，但實際操作新版 GIT 你會發現提示都是改寫為 restore 為正確做法。
[詳 stackoverflow 討論](https://stackoverflow.com/questions/58003030/what-is-the-git-restore-command-and-what-is-the-difference-between-git-restor)
{% endnote %}

### 改壞的檔案想從原快照還原
當你對某個修改（未暫存）檔案想要復原到原先的快照來源，你可以透過官方教學的指令 checkout 來完成。首先練習時先準備好一個提交之快照，接著隨便打些字並檢查 status，接著我們將工作目錄下的指定檔案還原到修改前的狀態（來自快照內的版本）。

```shell cmd
> L:\git_study>git status

On branch master
nothing to commit, working tree clean

> L:\git_study>git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   demo2.html
no changes added to commit (use "git add" and/or "git commit -a")

> L:\git_study>git checkout -- demo2.html
```

{% note danger %}
**復原工作目錄的方式 restore 跟 checkout 差別？**
跟上一個話題相同，前者 restore 是比較新的方式，只單純對工作目錄、暫存、快照之間的切換做還原。同時新的 git 也是提示你用 restore 來處理。後者的 checkout 主要還是操作分支的切換合併，而 `--` 參數則是使得 checkout 忽略分支異動，如果單純的檔案還原建議不要使用 checkout（雖然官方教學上還是舊的 checkout 寫法）。
{% endnote %}

# 分支 branch
分支是一種可以對一個 repo 進行多組追蹤歷史紀錄，通常是在一個專案內有不同的功能測試時建立。預設情況下我們只會有初始的 master 這個分支，如果你想要做一些開發測試，可以透過建立新分支來大膽開發，即使失敗了也不會影響到 master 分支上的正常版本快照。

> 本篇開始會利用示意圖方式來說明快照與分支的故事時間軸，部分細節不再演示（譬如修改檔案並提交暫存。.. 等行為），主要都是討論提交後的快照演化：

## master 分支
第一次產生 repo 時，GIT 會幫忙預設一個分支取名為 master，也就是我們的主軸故事發展，隨著你不斷的 commit 增加，你的 master 故事則越來越長：

```shell cmd
> git commit -m "1st"
> git commit -m "2nd"
> git commit -m "3rd"
```
![Image](https://i.imgur.com/wXBL3zI.png)
> 可以看到當隨著 commit 提交都會產生一組快照，同時你的 master 分支會一直往下一個快照成長。master 目前的故事已經演到位置 SHA-1 編碼為 6847 之位置。

## HEAD 目前位置
HEAD 代表的是你目前的位置，也就是你的每次提交都會從這個地方開始作業，下一次的提交產生快照當下 HEAD 也會跟著推移到下一處。想知道 HEAD 在哪裡，可以用 log 或 show 來查看 HEAD 在哪個 commit 上面。

## branch 分支切換
試著從目前的 master 開始新的分支（取名為 dev)，使用指令 `git branch <name>`來完成。

```shell cmd
> git branch dev
```
![Image](https://i.imgur.com/GlG7IqY.png)
> 而一開始還會在同一個快照上，是因為現在的工作環境都還是一樣的。包含你的 HEAD 也還在這個快照上。

試著開始轉向開發 dev 這條分支線：
1. 現在我們的 HEAD 還在 master 上面，我們需要先將 HEAD 改到 dev 分支去，使用指令 checkout 切換分支
2. 目前 HEAD 跑到 dev 去了，也就是接下來的提交都是在 dev 分支上進行歷史發展
3. 試著 commit 幾次，觀察圖片上的變化。
```shell cmd
> git checkout dev
> git commit -m "dev1"
> git commit -m "dev2"
```
![Image](https://i.imgur.com/TrtRv5Z.png)
> 現在你的 HEAD 隨著 dev 分支發展跟著移動，dev 這條故事另外進行下去。master 還停留在原本的時間快照上。

試著回到 master 做主線上的分支：
1. 開發做到一半，你可以回到 master 主線繼續他的故事軸，透過指令 checkout 切換分支
2. 此時 HEAD 已經改到 master 去，也就是接下來的 commit 都是從 master 這裡開始發展
3. 試著 commit 幾次，觀察圖片上的變化。
```shell cmd
> git checkout master
> git commit -m "main4"
> git commit -m "main5"
> git commit -m "main6"
```
![Image](https://i.imgur.com/eH7pafp.png)
> HEAD 是跟隨著 master 移動，同時整個故事變成平行時空有不同的發展歷史。

## 分支合併
如果你正維護兩個分支且可能都會兩邊編譯推進時，你勢必需要將這些分支歷史最終回歸到同樣的檔案歷史發展，這裡透過一些狀況劇來解釋一些分支操作，包含了如何合併與快進。

### 進行快進合併
這裡將根據劇情方式進行環境練習，劇情來自官方文件說明並改編，主要是如何對這些分支進行建立、發展、整合（合併）、快進等應用。

1. 假設公司有個專案目前已經發展一定的程度，在 master 上已經有一些提交
```shell cmd
> git tag v1.0
> git commit -m "release v1.0"
> git tag v1.1
> git commit -m "release v1.1"
> git tag v1.2
```
![Image](https://i.imgur.com/e2uLlFK.png)
2. 你從客戶那裏收集到一些意見與修正，規劃為 #issues53 進行開發與調效。因此需要建立分支 (iss53) 並將 HEAD 切換到這裡，你可以使用指令 `git checkout -b iss53` ，這代表兩個連續指令 `git branch iss53` 與 `git checkout iss53`。
3. 接著你編寫了一些，不久之後客戶需要請你對 v1.2(master) 急迫修改，因此你需要先讓工作區域的檔案做提交（沒有修改卻未提交的問題），否則切換分支會被拒絕。
```shell cmd
> git checkout -b iss53
> git commit -m "修正 RWD 表格顯示方式"
```
![Image](https://i.imgur.com/eJUQaMX.png)
4. 把手上的 iss53 整理好之後，切回到 master 去處理急迫性問題。為了避免異動到 v1.2，你另外創立了 hotfix 分支，準備在這個新分支上解決問題之後才回存到 master 並公開緊急修復版本。
```shell cmd
> git checkout master
> git checkout -b hotfix
```
![Image](https://i.imgur.com/7CvcL6n.png)
5. 你花了一些時間對這個分支下的工作目錄檔案進行修正搞定一切，並且提交出去並標記 tag 為 v1.2-fixed
```shell cmd
> git commit -m "hotfixed"
> git tag v1.2-fixed
```
![Image](https://i.imgur.com/vP1ah3L.png)
6. 現在切回 master 這個分支，目前的時間點是舊的且由於 master 是對外的，因此試著將 hotfix 這個分支合併，且把 master 變成 v1.2-fixed 版本。合併時 git 會提示已進行 fast-forward 合併作業
```shell cmd
> git checkout master
> git merge hotfix
```
![Image](https://i.imgur.com/WnOzlUr.png)
7. 現在原本修正的內容 master 也持有了，任務正式結束。而 hotfix 這個分支可以不要了，我們可以把這個分支給刪除（實際上只是把分支名稱移除，而所有快照都不會受影響）。
8. 你可以回到 iss53 這個分支繼續你的開發維護工作了。
```shell cmd
> git branch -d hotfix
> git checkout iss53
```
![Image](https://i.imgur.com/HbBhv6G.png)

### 差異的三方合併
接續上個話題目前為止，你的 iss53 並還沒有剛剛的 fixed 內容也就是產生了平行時空。你可以有兩種做法：
- 立即把 master 的故事整合進來，在 HEAD->iss53 情況下使用指令 `git merge master` 。
- 等待 iss53 工作結束，在 HEAD->master 情況下使用指令 `git merge iss53`，將 iss53 的內容合併進來。

1. 我們的故事選擇等待 iss53 工作結束，並試著在 master 位置上把 iss53 給合併了。
```shell cmd
> git checkout iss53
> git commit -m "修改維護完成"
> git checkout master
> git merge iss53
```
![Image](https://i.imgur.com/8BznjgP.png)
> 你會發現一個現象，前面的 hotfix 為快進合併，只需要找到兩者差異的內容做整合就好（快照歷史相同，可以直接延伸往後移）。這裡的快照故事跟前面不太一樣，最主要是因為 iss53 這個分支屬於舊的時間點開始異化發展，導致與 master 分支上已經產生差異內容，因此 GIT 會自動幫你找到兩者的分岔點（也就是在 v1.2 那裏）開始進行三方合併 (36c5+50a0+9524)，並另外產生新的快照存放（也是這個快照來自兩個快照整合出來的）。
2. 既然已經合併成功，你可以把分支 iss53a 給抹除
```shell cmd
> git branch -d iss53
```
![Image](https://i.imgur.com/lOYfOWd.png)

### 發生合併衝突
通常發生在三方合併作業上，若兩個不同的分支都對同一支檔案曾有修改。GIT 會不知道依誰為主而中斷 merge 合併，產生 `Automatic merge failed; fix conflicts and then commit the result.` 資訊。你需要自己親手解決他：
1. 衝突的檔案可以透過 `git status` 確認，呈現在 `Unmerged paths:` 內告知 `both modified` 兩邊都有修改
2. 此時去看一下這個檔案，GIT 會幫你用<<<,===,>>>之標記起來哪裡不一致了，類似訊息為：
```html demo.html
<<<<<<< HEAD:index.html
<div id="footer">this is master text</div>
=======
<div id="footer">this is iss53 text</div>
>>>>>>> iss53:index.html
```
1. 你需要清除這些額外添加的符號以及選擇一個變更版本，並記得 `git add index.html` 放入暫存，讓 GIT 知道已經解決衝突的檔案。（不建議用 git mergetool 指令來解決衝突，那會透過 VIM 編譯器處理，推薦直接 VSCode 開啟檔案會自動幫忙標示選擇）。等待衝突解決後加入暫存並 commit 提交，GIT 會繼續完成 merge 原工作。
2. 以下為試著操作模擬出該情境，分別使用兩個分支並修改同檔案卻不同的內容再去合併，試著排除後完成合併分支。
```shell cmd
# 建立 repo
> L:\>git init git_study
> L:\>cd git_study

# 此時新增檔案 index.html 並編寫內容，提交產生 master 分支
> L:\git_study>git add index.html
> L:\git_study>git commit -m "初始的內容"

# 建立 iss53 分支
> L:\git_study>git checkout -b iss53

# 修改 index.html 內容並提交
> L:\git_study>git commit -a -m "iss53 修改了內容"

# 回到 master 也對 index.heml 修改內容並提交
> L:\git_study>git checkout master
> L:\git_study>git commit -a -m "master 修改了內容"

# 試著合併，將 iss53 整合入 master 受到拒絕，檔案發生衝突
> L:\git_study>git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.

# 檢查 status 看見 both modified，到該檔案下可以看到衝突內容
> L:\git_study>git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")

# 修改好檔案後，加入暫存讓 status 沒有衝突問題
> L:\git_study>git add index.html
> L:\git_study>git status
On branch master
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
        modified:   index.html

# 確認沒有紅字，在 master 進行提交（讓 GIT 繼續跑 merge 作業）
> L:\git_study>git commit -m "解決衝突了"
[master 3108c09] 解決衝突了

# 檢查 log，可以看到現在的快照來自兩個快照的合併
> L:\git_study>git log
commit 3108c0986bfe71f3602739d207fa42e52841f4fa (HEAD -> master)
Merge: e396c95 33c510d
Author: Loki Jiang <summer10920@gmail.com>
Date:   Sat Sep 26 01:30:08 2020 +0800

    解決衝突了

commit e396c953a1a36456e42c0d3cc101c1e76932f11f
Author: Loki Jiang <summer10920@gmail.com>
Date:   Sat Sep 26 01:28:10 2020 +0800

    master 修改了內容

commit 33c510d70ba8ee0cb1400fee3ab541ad7953e80d (iss53)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Sat Sep 26 01:27:39 2020 +0800

    iss53 修改了內容

commit 1bde0b9455cd01d749ec866f006620b0e5ade0ef
Author: Loki Jiang <summer10920@gmail.com>
Date:   Sat Sep 26 01:26:35 2020 +0800

    初始的內容

# 如果 iss53 沒利用價值了，可以移除他
L:\git_study>git branch -d iss53
Deleted branch iss53 (was 33c510d).

L:\git_study>git branch
* master
```

## 分支規劃工作
本節偏向商務經驗分享（不代表是絕對的），介紹如何兩種方式來利用分支來規畫你的工作專案，以及業界大概是如何有效利用分支來管理專案開發工作模式。

### 長期規劃分支
由於 GIT 好用的三方合併變得方便，你可以透過規劃多組分支做為階段性任務。適合在大型專案長期開發或需要團隊分工維護下使用，分支應用方法為介紹：

- master: 
做為主分支，隨著開發穩定版本進行對外發行代碼。
- hotfix: 
做為對已發布的版本遇到緊急性修改需要做額外開啟分支處理，通常命名分支時會前綴使用 `hotfix-*`做代表。等問題解決後提供 master 合併，另外再給 develop 合併。
- release: 
為了發布前的準備階段，通常命名分支時會前綴使用 `release-*`做代表。還能在這階段做一些細部調整，等到整個完成無誤之後給 master 進行合併。
- develop: 
做為日常開發階段，這裡也算是一個主分支發展，隨著各個功能開發完成都會回歸到這裡，最後提交給 releaser 等待被 master 整合。
- feature（或 topic): 
各單元新功能開發或是修復問題使用，通常這裡都是本地端個人處理，不會上傳到遠端，當完成時提交給 develop 做為處理完畢。

![Image](https://i.imgur.com/MP7i6wi.png)

### 短期規劃分支
適合用在主題性的分支規劃，以各個主題進行需求使用新分支。相對來說沒有固定的階段性任務。你會比較自由的隨時開啟分支，等到確定要使用時才合併回 master。舉例來說：

1. 推演 master 分支發展到 C1 時，有個擱置的 issue#91 問題想解決，因此建立新分支 iss91。
2. 過程中 master 跟 iss91 你能隨時切換，主計畫 master 繼續跑，舊問題 iss91 另外處理。
3. 推演 iss91 發展來到 C4 時，你有更好的想法可以解決 issue#91 問題，在不異動 iss91 情況下，建立新分支 iss91v2
4. 對 iss91 與 iss91v2 來說，兩者的分岔點在 c4 處，當然你可以隨意的切換分支進行測試。
5. 老闆請你繼續開發 master 預定計畫，你切回 master 繼續工作，所有的新開發都會在 master 上推進。
6. 突然有個新想法想滿足原計畫需求，但你不確定也不想影響 master，所以開啟新分支 dumbidea 的拿來測試點子。
![Image](https://i.imgur.com/lCOeklZ.png)
7. 接著老闆喜歡你的 dumbidea，因此你把它合併進來（由於 master 沒有發展，可以進行快進合併）
8. 然後同事認同你的 iss91v2 比較優，因此讓 master 與 iss91v2 進行三方合併。
9. 同時因為 iss91 已經不需要了所以刪除這個分支，也就是 C5 與 C6 的快照我們不需要紀錄。
![Image](https://i.imgur.com/schWuDs.png)

# 標籤 tag
你可以對任何的 commit 快照 (HEAD 所指之處）設定標籤 tag，通常是拿來做<mark>版本標記</mark>之類記號用。方便之後查詢時理解該快照的標籤資訊；或者利用標籤快速找到該快照。

說明：
1. 試著提交一個 commit 快照，同時目前有 HEAD 指到這裡 （快照編號為 169d )
2. 對這裡增加一個標籤為 v0.1，透過 show 檢視快照完整資訊可以發現快照 169d 有了 tag 資訊
3. 嘗試修改檔案並提交成為新快照 (93c5)。接著，由於目前 HEAD 指到 93c5，所以我們直接增加 tag 給這個快照
4. 好了你可以查看整個 repo 有哪些快照，利用 `git tag` 查詢
```shell cmd
> L:\git_study>git tag v0.1
> L:\git_study>git show

commit 169dfcd0026218b076308c89c540330f98eff934 (HEAD -master, tag: v0.1)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Fri Sep 25 14:05:38 2020 +0800

    first commit

diff --git a/hello_world.html b/hello_world.html
new file mode 100644
index 0000000..69763a7
--- /dev/null
+++ b/hello_world.html
@@ -0,0 +1,11 @@
+<!DOCTYPE html>
+<html lang="en">
+<head>
+  <meta charset="UTF-8">
+  <meta name="viewport" content="width=device-width, initial-scale=1.0">
+  <title>Document</title>
+</head>
+<body>
+
+</body>
+</html>
\ No newline at end of file

# 到這裡將修改檔案並快速提交上去

> L:\git_study>git commit -a -m "second commit"
> L:\git_study>git tag v0.2

# 查詢整個 repo 的全部 tag 名稱
> L:\git_study>git tag
v0.1
v0.2

# 查詢所有 git 快照完整資訊
> L:\git_study>git show
commit 93c54337f0d82cb98c1b7553fd6ba0087955d8f0 (HEAD -master, tag: v0.2)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Fri Sep 25 14:09:40 2020 +0800

    second commit

diff --git a/hello_world.html b/hello_world.html
index 69763a7..2c98e76 100644
--- a/hello_world.html
+++ b/hello_world.html
@@ -6,6 +6,6 @@
   <title>Document</title>
 </head>
 <body>
-  
+  <div>這裡是第二次的提交內容</div>
 </body>
 </html>
\ No newline at end of file

> L:\git_study>git show v0.1
commit 169dfcd0026218b076308c89c540330f98eff934 (tag: v0.1)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Fri Sep 25 14:05:38 2020 +0800

    first commit

diff --git a/hello_world.html b/hello_world.html
new file mode 100644
index 0000000..69763a7
--- /dev/null
+++ b/hello_world.html
@@ -0,0 +1,11 @@
+<!DOCTYPE html>
+<html lang="en">
+<head>
+  <meta charset="UTF-8">
+  <meta name="viewport" content="width=device-width, initial-scale=1.0">
+  <title>Document</title>
+</head>
+<body>
+  
+</body>
+</html>
\ No newline at end of file

> L:\git_study>git show v0.2
commit 93c54337f0d82cb98c1b7553fd6ba0087955d8f0 (HEAD -master, tag: v0.2)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Fri Sep 25 14:09:40 2020 +0800

    second commit

diff --git a/hello_world.html b/hello_world.html
index 69763a7..2c98e76 100644
--- a/hello_world.html
+++ b/hello_world.html
@@ -6,6 +6,6 @@
   <title>Document</title>
 </head>
 <body>
-  
+  <div>這裡是第二次的提交內容</div>
 </body>
 </html>
\ No newline at end of file
```
5. 如果忘了，你可以事後對其他的快照補上 tag
```shell cmd
> L:\git_study>git tag v0.1-tw 169d
> L:\git_study>git log

commit 93c54337f0d82cb98c1b7553fd6ba0087955d8f0 (HEAD -> master, tag: v0.2)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Fri Sep 25 14:09:40 2020 +0800

    second commit

commit 169dfcd0026218b076308c89c540330f98eff934 (tag: v0.1-tw, tag: v0.1)
Author: Loki Jiang <summer10920@gmail.com>
Date:   Fri Sep 25 14:05:38 2020 +0800

    first commit
```
6. 現在你有一些 tag 了，使用 log 或 show 查詢時可以多一個 tag 方式來過濾
```shell cmd
> L:\git_study>git log v0.1
> L:\git_study>git show v0.1
```

# 遠端儲存庫 remote repository
接下來我們要試著將本地端的 repo 資料如何跟遠端進行同步作業，所謂的遠端分支是指在雲端或是某伺服器內的 git 儲存庫，同樣需要建立 repo 之後使得跟你本地端的 repo 形成對應。如此一來你能輕易的讓本地分支與遠端分支進行同步備份與多人共享開發。

## 選擇 GitHub 儲存庫
接下來我們要試著將本地端的 repo 資料如何跟遠端進行同步作業，遠端我們選擇現成的 GitHub 作為代管系統。遠端 repo 可以視為一個資料庫系統，透過資料存放在遠端 repo 內。遠端 repo 大致有以下好處：

1. 為一個 GIT 資料庫系統，你可以將檔案上傳到系統內，隨時隨地可上下載使用，分散你的風險。
2. 利用一個資料庫系統可以輕易跟其他人合作維護，形成一個交流空間或共同開發的管道。

{% note default %}
**前置作業**
- 在那之前請先確認你已擁有 GitHub 帳號
- 確認你的 GIT 工具安裝時已可被 VSCode 所使用（通常左側的 GIT 工具能看到一些東西）
- 當你第一次進行任何上傳類型指令時，VSCode 將會引導你前往 GitHub 進行授權作業，之後就不用再輸入任何帳號密碼了，VSCode 會自動幫你授權。
{% endnote %}

## 綁定遠端 remote
本地 repo 可以要求多個 remote，也許你的專案有多個小組在不同分支上運作，仁者多勞的你需要對不同小組分支傳送到不同的 remote repo 去。此外你的本地 repo 可能一開始就持有 remote repo，主要差別於是預設給的還是你自己手動綁定的：

### clone 會自動綁定
如果你的 repo 一開始來自 clone 所建立，除了整個上面的 GIT 複製下來，同時你還會同時獲得一個 clone 來源的 remote 遠端標記。

- 遠端 repo 都需要一個別名作為識別，而 clone 當下沒特別指定 remote 名稱（可添加 `-o \<REMOTE_NAME>` 指定），預設將以 origin 為名。
- 遠端上的分支會使用 `<REMOTE_NAME>/<REMOTE_BRANCH>` 標記在本地端，譬如 `origin/master` 作為代表遠端分支的 commit 所在之處。
- 本地端上的遠端分支無法像普通分支進行修改移動刪除。只有當進行上傳才可能會連動改變，所以它主要提供本地狀況說明該遠端上的分支在哪。

另一個舉例說明，如果曾透過 `clone URL` 方式將 Github 某個 repo 抓下來，此時你的本地 repo 將自動與遠端 repo 對應。換句話說若你有權限可將本地端與遠端形成上下傳同步作業，讓你的檔案隨地使用。每個遠端 repo 會使用一個別名（預設為 origin) 來稱呼，可以透過以下指令查詢：

```shell cmd
> L:\git_study>cd /git_study_onGitHub
> L:\git_study_onGitHub>git remote

origin
# git_study_onGitHub 是上一節介紹透過 clone 方式向 Github 取得，因此已產生遠端連結，而 origin 是預設的遠端 repo 之別名

> L:\git_study_onGitHub>git remote -v

origin  https://github.com/summer10920/git_study_onGitHub.git (fetch)
origin  https://github.com/summer10920/git_study_onGitHub.git (push)
# 或透過參數 -v 能取得原本的網址來源
```

### remote add 手動綁定
沒有預設的遠端位置也可以自己手動綁定一個，且亦可跟多個遠端進行連結。假設你還想要跟另一個遠端（可能是你的同事空間）進行連接，可透過 remote add 完成。未來可以操作分支要跟哪個遠端上游分支進行同步。跟 clone 一樣，這些遠端分支都是一樣的別名方法且不可改。

```shell cmd
# 你可以先到 github 開另一個 repo No.2（這裡創了一個 git_kelly_onGithub)，試著對該本地 repo 掛入遠端 repo No.2
# 在掛載連接遠端 No.2 時，可以隨便你取別名（像是同事名稱）
> L:\git_study_onGitHub>git remote add kelly https://github.com/summer10920/git_kelly_onGithub
> L:\git_study_onGitHub>git remote -v

kelly   https://github.com/summer10920/git_kelly_onGithub (fetch)
kelly   https://github.com/summer10920/git_kelly_onGithub (push)
origin  https://github.com/summer10920/git_study_onGitHub.git (fetch)
origin  https://github.com/summer10920/git_study_onGitHub.git (push)

# 因此在未來，你可以將本地 repo 自由選擇哪個分支同步給哪個遠端下的分支。
# 所以我們也可以切回由本地端建立的 repo(git_study)，並跟遠端 repo(git_study_onGitHub) 進行連結掛勾。
> L:\git_study_onGitHub>cd /git_study
> L:\git_study>git remote add loki https://github.com/summer10920/git_study_onGithub
> L:\git_study>git remote -v

loki    https://github.com/summer10920/git_study_onGithub (fetch)
loki    https://github.com/summer10920/git_study_onGithub (push)
```

## 遠端分支的變化
我們來細說關於遠端分支在本地端的位置變化為何，目前畫面如下：
1. **初始 clone 生成：**
透過 clone 建立 repo 時，初始狀態下遠端的 master(origin/master) 同等本地端的 master。這兩個分支獨立存在指定的 commit 處且 origin/master 已成為 master 的上游分支。
![Image](https://i.imgur.com/zqcoFsB.png)
2. **未同步狀態下獨立推進：**
未進行同步指令之前，本地 master 一直推進，本地 repo 內的遠端分支不會特別移動，同理遠端 repo 的 master 發生變化推進也不影響本地 repo。除非進行同步使用 fetch 指令下載到本地 repo，origin/master 才會同步變化。
![Image](https://i.imgur.com/gtvak1p.png)
3. **本地分支與上游分支的異化發展：**
當你使用 `fetch \<remote_name>` 指令時，GIT 會自動下載這個遠端位置在本地端所沒有的快照與分支資料。即使當初的 origin/master 已經跟本地 master 變不一樣了，也就以不同的分支觀念來解釋 commit 發展。
![Image](https://i.imgur.com/vbfqoF9.png)
4. **註冊新遠端分支：**
假設原本已經持有一筆遠程分支 origin/master （主專案開發）且已 fetch 下載更新。現在你需加入另一個遠端分支 teamone/master （副專案），預設情況下你使用指令 `git remote add teamone <URL>` 來掛載。
   - 注意：尚未進行 fetch 情況下，remote add 只是註冊了連結並不會異動到你本地端狀況。
![Image](https://i.imgur.com/itlkFFu.png)
   - 然而當你進行 `git fetch teamone` 動作，才會將遠端分支正式下載到你的本地 repo 內做整合。
![Image](https://i.imgur.com/vRvunKo.png)

## 遠端同步
同步可分為上傳（將本地 push 至遠端）與下載（將遠端 fetch 或 pull 至本地），因此你會學到 push、fetch、pull 指令。

### push 到遠端儲存庫
沒收到指令前，遠端 repo 不會自動跟你的本地 repo 同步，透過 push 指令（需有寫入權限）可挑選任何本地分支上傳到遠端 (ex:origin) 儲存庫（即使遠端沒有這個分支也會自動產生）。舉例來說你需要共享一個開發功能，你可以做為第一個創造者將指定分支 (ex:goodidea) 上傳更新至遠端。屆時同事進行 `git fetch origin` 進行整個下載時，也會取到 goodidea 這個遠端分支。

```shell cmd
> L:\git_study>git branch
* master
> L:\git_study>git branch goodidea
> L:\git_study>git branch    
* master
  goodidea
> L:\git_study>git checkout goodidea
Switched to branch 'goodidea'
> L:\git_study>git commit -a
hint: Waiting for your editor to close the file...
[goodidea a6f2877] for branch add
 1 file changed, 1 insertion(+)
> L:\git_study>git remote
origin
> L:\git_study>git push origin goodidea
Enumerating objects: 13, done.
Counting objects: 100% (13/13), done.
Delta compression using up to 4 threads
Compressing objects: 100% (9/9), done.
Writing objects: 100% (13/13), 1.31 KiB | 335.00 KiB/s, done.
Total 13 (delta 4), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (4/4), done.
remote:
remote: Create a pull request for 'goodidea' on GitHub by visiting:
remote:      https://github.com/summer10920/git_study_onGitHub/pull/new/goodidea
remote:
To https://github.com/summer10920/git_study_onGitHub
 * [new branch]      goodidea -> goodidea
```

關於 `git push origin goodidea` 這個指令其實等於 `git push origin goodidea:goodidea ` 分別代表本地 branch name: 遠端 branch name。如果你沒有特別指定不同名的分支做更新，預設這樣寫可以讓遠端分支名稱與本地相同。

### fetch 下載整個遠端儲存庫
跟著上面的話題，此時扮演同事角色，我們需要對此遠端 repo 進行 fetch 下載：
1. 假設已經註冊 remote 這個 loki 遠端儲存庫，你執行 `git fetch loki` 即可進行獲取遠端 loki's repo 整體。
2. 透過 `git branch -r` 能查詢目前已獲取的的遠端分支有哪些，注意這些你沒有辦法進行修改。
3. 要將本地分支整合這個 loki/goodidea 遠端分支的新代碼，你可以選擇：
   - 直接 merge 他到你的目前所在的分支內： `git merge loki/goodidea`
   - 另建新分支並 merge 該遠端分支到此新分支內。等同效果的右方指令（分支新增->拉取->切換）： `git checkout -b goodidea loki/goodidea`
 
> fetch 只是下載到 repo 內但不會影響你的分支，會以遠端分支的標記方式存在。你需要將這些遠端分支標記進行 merge 整合才能獲得新代碼應用到你的原分支。

#### fetch 衝突
如果你想將遠端 repo 的 commit 取回本地，狀況可以透過 `fetch` 指令來完成，但這並不會改變你的本地工作目錄或影響，只有當你準備 commit 提交前，才會跳出來要求你確認每一項差異上的合併作業：
```shell cmd
> L:\git_study>git fetch loki

warning: no common commits
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 654 bytes | 1024 bytes/s, done.
From https://github.com/summer10920/git_study_onGithub
 * [new branch]      master     -loki/master
```

現在處於很特別的狀況，本地端的 repo ( git_study) 跟遠端的 repo(git_study_onGithub) 是完全不一樣的內容與歷史快照，GIT 會聰明的阻擋你進行 pull 與 push 作業，畢竟兩個路程不同除非你需要調整好所有快照紀錄（合併或是快進）。
```shell cmd
> L:\git_study>git push loki master

To https://github.com/summer10920/git_study_onGithub
 ! [rejected]        master -master (non-fast-forward)
error: failed to push some refs to 'https://github.com/summer10920/git_study_onGithub'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

# push 失敗，目前的分支末端不對，使用 push 前你可以考慮先 pull 整合遠端差異。然而 pull 功能需要另外解釋才能作用。
```

事實上這問題也可以延伸到到團隊作業的 GIT 處理，在你的本地分支與遠端分支的快照已經變化了，你不可能隨意的 push 上去。因此回到分支衝突的解決方式去處理，透過合併或快進且將差異檔案進行修正。

如果是單人作業的你想要強迫從本地端上傳上去也是可以的。使用以下指令你會發現遠端原本的東西都沒了，改採用來自本地端資料作為最新快照（這動作很危險）
```shell cmd
> L:\git_study>git push -u loki master -f

Enumerating objects: 24, done.
Counting objects: 100% (24/24), done.
Delta compression using up to 4 threads
Compressing objects: 100% (23/23), done.
Writing objects: 100% (24/24), 2.44 KiB | 416.00 KiB/s, done.
Total 24 (delta 7), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (7/7), done.
remote: This repository moved. Please use the new location:
remote:   https://github.com/summer10920/git_study_onGitHub.git
To https://github.com/summer10920/git_study_onGithub
 + a3ba45d...6eb8f7f master -master (forced update)
Branch 'master' set up to track remote branch 'master' from 'loki'.
```

所以在單人作業下，盡量避免使用不同的 repo 為同一個 remote repo 造成混淆。我們換個單純點的劇場：

1. 在遠端建立一個空的 repo，讓本地端可以 clone 複製下來
2. 本地端編寫檔案，試著提交為快照
3. 將本地 repo 進行 push 到遠端 repo
4. 到 GitHub 網頁查看 repo 的 push 成功

```shell cmd
> L:\git_study_onGitHub>cd /
> L:\>git clone https://github.com/summer10920/git_kelly_onGithub

Cloning into 'git_kelly_onGithub'...
warning: You appear to have cloned an empty repository.

> L:\>cd /git_kelly_onGithub
> L:\git_kelly_onGithub>git status

On branch master
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        helloworld.html
nothing added to commit but untracked files present (use "git add" to track)

> L:\git_kelly_onGithub>git add *
> L:\git_kelly_onGithub>git commit -m "add helloworld.html"

[master (root-commit) bed5fd3] add helloworld.html
 1 file changed, 11 insertions(+)
 create mode 100644 helloworld.html

> L:\git_kelly_onGithub>git push

Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Delta compression using up to 4 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 371 bytes | 185.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/summer10920/git_kelly_onGithub
 * [new branch]      master -master

# 現在 Github 這支 repo 原本空的變成跟你本地 repo 一致
```

另一個狀況，新同事 Joy 想要拿 Kelly 的檔案
1. 建立一個資料夾模擬 Joy 準備 init 一個新的本地 repo
2. 設定 remote kelly，如果指定打錯字，可移除後再新設定
3. 透過 pull 將檔案拉回來

```shell  cmd
> L:\git_kelly_onGithub>cd /git_joy_onGitHub
> L:\git_Joy_onGitHub>git init
> L:\git_Joy_onGitHub>git remote add kelly https://github.com/git_kelly_onGitHub
> L:\git_Joy_onGitHub>git remote rm kelly
> L:\git_Joy_onGitHub>git remote add kelly https://github.com/summer10920/git_kelly_onGitHub
> L:\git_Joy_onGitHub>git pull kelly

# 此時 Joy 的 repo 內跟遠端 repo 一樣
```

### pull 僅適用持有追蹤遠端分支之對象
任何本地分支都應該有個預設屬性，為遠端分支（上游分支）來自哪裡，舉例來說：
1. 當你從遠端 repo 進行 clone 時，此時本地端的 master 會自動追蹤 origin/master，這是初始下的 master 本來就有的 track 效果。
2. 如上面例子從整個遠端 repo 進行 remote add 與 fetch 時，手動透過 merge 整合遠端分支 master 與本地分支 master，則沒有 track 效果。
3. 同上，除了 merge 方式，你想創建其他分支用 checkout -b origin/master，會有 track 紀錄。
4. 或者你可手動指令安排上游分支，透過 `git branch -u origin/master` 來完成設定追蹤。
因此，每當你進行 checkout branch 指令，GIT 會提示你的遠端分支追蹤來源如下：
```shell cmd
> L:\git_kelly_onGithub>git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.
```

當你的多筆分支分別有了上游分支，可透過指令 `git branch -vv` 取得這些分支的上游追蹤狀態，前提是你得先 fetch 同步過才能提供情報：
- ahead：本地還有多少 commit 沒有 push 上去
- behind：遠端還有多少 commit 沒有 pull 下來

如果你的目前分支本身有上游分支，下一次要抓取時。你可以把 fetch->merge 的兩個動作變成 pull 來處理。他會聰明的自己從上游分支那裏拉取。

```shell cmd
# git fetch origin
# git merge origin/master
> git pull # same as fetch REMOTE and merege REMOTE/BRANCH, 
```

> 如果你開發完成把手上的 test 分支整合到 master 且 push 到 origin/master，那 test 分支的上游就可以刪除了（要求遠端 repo 刪除 origin/test 分支）。透過指令 `git push orign --delete test` 完成。

## 對遠端分支設定 tag
跟遠端同步時，預設是不會採用本機端的 tag 設定。你可以透過兩種方式讓遠端 repo 吃到 tag：
1. 使用 `git push origin v1.5` 要求遠端對目前的快照添加 tag 名稱
2. 使用 `git push origin --tags` 將所有本地端的各個快照所有 tag 都推上去

# 合併技巧 rebase & merge 
常見的合併方式都是透過 merge 方式完成，將某個分支進行合併到另一個分支。根據發展線不同可能是快進合併或三方合併，本篇還會介紹另一個特別的合併方式 rebase 與缺點風險。以下圖片為初始環境階段：
![Image](https://i.imgur.com/zJAG01d.png)

## merge 三方合併
若直接將某個分支合併到目前的分支內，會自動去找到分岔點 C2，對三者進行合併且提交新的快照點。

```shell cmd
>$ git checout master
>$ git merge experiment
```
![Image](https://i.imgur.com/vyhmjYt.png)

## rebase 重置轉移
另一種方式，將目前分支以移動的方式成為指定分支的下一個快照，過程中自動補充快照內的檔案差異，使得歷史發展自動合併入為目標分支的一部分。

```shell cmd
>$ git checkout experiment
>$ git rebase master
```
![Image](https://i.imgur.com/jOjKRNh.png)

由於故事線變同一條，你可以對 master 以快進合併方式進行推移。
```shell cmd
>$ git checkout master
>$ git merge experiment
```
![Image](https://i.imgur.com/5H1XzRH.png)

>後者透過 rebase 合併+meger 快進合併，與前者透過 merge 三方合併的結果來說快照都一致。唯一差別是 rebase 把歷史過程簡化了，相反的這樣的開發歷史無法追蹤來源。

### 多分支下的 rebase
即使是多重分支下，也會自動的判別歷史路徑上的差異彙整，並轉移指定分支成為目標分支的快照一部分。舉例來說：

1. 我們需要合併了 client 與 master，但還不想跟 server 做合併（尚開發中），所以以下行為這不會合併 server 的設計內容。
2. 可用 rebase <目標分支> <受轉移之分支> 進行 rebase 作業，可省略 checkout 切換到目標分支之動作。
```shell cmd
>git rebase master client
```
![Image](https://i.imgur.com/k7blWCB.png)
3. 接著將 master 快速推進到 clinet 處，這樣 master 的分支跟 client 的快照相同。
```shell cmd
>git checkout master
>git merge client
```
![Image](https://i.imgur.com/jLzyrGK.png)
3. 現在 server 分支開發完成了，也 rebase 到 master 主分支上並且 merge 快進合併。
4. 最後因為 client 與 server 工作任務結束故移除。
```shell cmd
>git rebase master server
>git checkout master
>git merge server
>git branch -d server
>git branch -d clinet
```
![Image](https://i.imgur.com/ui9Jss0.png)

### rebase 的風險
使用 rebase 能讓分支歷史十分清爽，但如果你與其他人共事可能會讓分支歷史無法對應更新（你移走了分支到別的地方去成為新的分支歷史），變成需要重新為了你的 rebase 動作而抓取整合他們手上有受影響的所有分支紀錄。舉例來說：

1. 你跟菜鳥一起為專案小組 teamone 的成員並進行開發作業。目前你正準備從伺服器 clone repo 下來並已開始工作到 C3 快照階段。
![Image](https://i.imgur.com/byJZkd8.png)
2. 結果菜鳥完成了工作 C4，透過 merge 三方合併並 push 上去。你為了整合也把他 push 下來。
![Image](https://i.imgur.com/157bkPP.png)
3. 此時菜鳥又復原上一動作，改用 rebase 方式跟遠端 master 合併，並通知你下載更新。
![Image](https://i.imgur.com/kEg4PD0.png)
4. 現在你手上 fetch 更新過後的快照紀錄上，會發現有重複又不同新舊快照的 C4/C4' ，然而為了 pull 之後續作業你選擇了合併 C4' 跟你的 master（錯誤方式）。
![Image](https://i.imgur.com/c8R3K7G.png)
5. 最後整個快照上大亂，舊的 C4 與 C6 不該存在應該被丟棄，而其他同事也會被這錯誤的快照歷史下載更新而混亂。
6. 回到步驟 4，不要對已同時存在的快照紀錄做合併，而是 `fetch` 之後改使用 `git rebase teamone/master`，讓 GIT 自動聰明檢查相同的 C4 與 C4' 做整合轉移快照。
7. 同上效果，也可以用 `git pull --rebase` 方式來檢查 rebase 問題做合併轉移檢查處理。
![Image](https://i.imgur.com/aCiniq3.png)

> rebase 請盡量對本地分支操作使用，盡可能不要對遠端分支處理。如果非要這麼做務必請同事們都使用 `git pull --rebase` 來做下載更新避免快照重複問題發生。

# GIT 練習場
收錄以下兩個網站可以練習指令，並具備圖形化分支方便理解。
- [Visualizing Git Concepts with D3](http://onlywei.github.io/explain-git-with-d3/)
- [Learn Git Branching!](https://learngitbranching.js.org/)

# GIT 指令列表
收錄所有 GIT 指令，你可以快速找到語法指令與相關簡易說明。

## 初始化 repo
建立儲存庫，可以是本地建立 init 或來自其他地方 clone

| 語法指令                              | 說明                                                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| git init                              | 本地端新增 repo，同時預設分支名稱為 master                                                                       |
| git clone \<source> \<NEW_REPO_NAME>  | 從 Source 處進行複製做為新的 repo，可指定 NEW_REPO_NAME 來做儲存庫 repo 之名稱，不指定則採 source 的 repo 命名。 |
| git clone \<source> -o \<REMOTE_NAME> | 同上，預設 remote 的別名會以 origin，可透過 `-o` 來要求指定 remote name                                          |

>\<source> = 可以是遠端平台之 URL 位置，也能是本地端相對路徑上已存在的 repo 名稱

## 暫存 staged
提供工作目錄與暫存區之間的狀態變化，包含如何對工作目錄檔案進行加入退出暫存、檔案變動與刪除作業。

| 語法指令                         | 說明                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| git add \<FILE_NAME>             | 加入指定 FILE_NAME 檔案到 staged 暫存區                                                              |
| git add .                        | 指定符號 `.` 代表為工作目錄內的全部檔案列入暫存                                                      |
| git add *                        | 同上                                                                                                 |
| git add -u                       | 指 update 用途，對於曾提交成功的檔案，換句話說用在修改刪除且未新增之全部檔案提交                     |
| git add *.html                   | 加入所有指定的附檔名 HTML 之格式                                                                     |  |
| git rm \<FILE_NAME>              | 透過 GIT 刪除未暫存之實體檔案 (window 為 del 指令，Linux 為 rm 指令），並提交 deleted 紀錄列入暫存區 |
| git rm -f \<FILE_NAME>           | 同上，強制刪除已暫存的檔案作業                                                                       |
| git rm -cached \<FILE_NAME>      | 保留實體檔案僅做提交 deleted 紀錄，同時檔案退回未追蹤狀態                                            |
| git mv \<OLD_NAME>\<NEW_NAME>    | 如果你要改檔案名稱最好透過 GIT 來改，這樣才能順利保持紀錄否則 GIT 會當作刪除又新增                   |
| git restore \<FILE_NAME>         | （推薦）還原工作目錄的 FILE_NAME 檔案（根據 HEAD 快照來修復）                                        |
| git checkout -- <FILE_NAME>      | （不推薦）同上，以切換分支之方式 (--代表忽略分支異動）將檔案重新載入到初始狀態                       |
| git restore --staged <FILE_NAME> | （推薦）將已提交之 FILE_NAME 檔案退出暫存                                                            |
| git restore --s <FILE_NAME>      | 同上                                                                                                 |
| git reset HEAD <FILE_NAME>       | （不推薦）同上，依據 HEAD 的快照環境，重置 FILE_NAME 檔案在暫存區的狀態，達到退出暫存需求            |

## 提交 commit
將暫存區的檔案進行提交形成一個 commit 快照。

| 語法指令                         | 說明                                     |
| -------------------------------- | ---------------------------------------- |
| git commit \<MESSAGE>            | 完整提交版本快照，並另提供文件編寫描述   |
| git commit -a \<MESSAGE>         | 同上，且所有檔案都列入暫存區             |
| git commit -m \<MESSAGE>         | 快速提交版本快照，且提供簡要描述         |
| git commit --amend -m \<MESSAGE> | 簡要提交時，此次的提交將覆蓋上一次的提交 |

## 查詢方式

| 語法指令          | 說明                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| git log           | 檢視提交的所有快照紀錄                                                                               |
| git log -p        | 能完整顯示每次的+-內容且分頁顯示，按 q 可離開                                                        |
| git log -\<NUM>   | 只顯示最近 NUM 筆數之快照                                                                            |
| git status        | 檢查工作目錄內的檔案狀態並系統提供建議指令                                                           |
| git status -s     | 精簡模式：（左為暫存區、右為工作目錄）可標記兩種代號 (M 為已修改、A 為新加入）、兩邊都是則？為未追蹤 |
| git diff          | 查詢工作目錄與 HEAD 指定之處檔案差異，進行差異比較                                                   |
| git diff --staged | 查詢暫存區與 HEAD 指定之處檔案差異                                                                   |
| git diff --cached | 同上指令                                                                                             |
| git show          | 比 git log 還更詳細，包含檔案內容                                                                    |

## branch 分支

| 語法範例                                                   | 說明                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| git branch \<NAME>                                         | 建立名為 NAME 的分支                                 |
| git branch -d \<NAME>                                      | 刪除名為 NAME 的不受影響分支（僅對已合併的分支允許） |
| git branch -D \<NAME>                                      | 強迫性刪除名為 NAME 的分支                           |
| git branch                                                 | 查詢該 repo 內所有分支，HEAD 所在之處使用 `*` 標記   |
| git branch -v                                              | 同上，概要方式呈現 SHA-1 編號與 commit 說明          |
| git branch -vv                                             | 同 -v ，多了上游分支資訊                             |
| git branch -r                                              | 查詢已載入本地的遠端分支有哪些                       |
| git branch --merged                                        | 檢視曾經合併過的分支                                 |
| git branch --no-merged                                     | 檢視不曾合併過的分支                                 |
| git branch -u \<REMOTE_NAME>/\<BRANCH_NAME>                | 指定目前分支的上游追蹤分支為 remote_name/branch_name |
| git branch --set-upstream-to=\<REMOTE_NAME>/\<BRANCH_NAME> | 同上                                                 |

## tag 標籤
能指定任何 commit 進行 tag 標籤，通常這用在公開用的產品版本號使用。

| 語法範例                        | 說明                                                                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| git tag \<TAG_NAME> \<SHA-1>    | 未指定快照編碼 (SHA-1) 時會對 HEAD 所在處新增 tag 標籤                                                                           |
| git tag \<TAG_NAME> \<SHA-1> -a | 同上，屬性 -a 做完整描述內容                                                                                                     |
| git describe \<BRANCH>          | 回傳離最近 tag 有多少位置，字串表示為 (TagName)_(numCommits)_g(SHA-1) 個代表：目標之標籤名稱、相距 commit 數、BRANCHE 的快照編碼 |
| git log \<TAG_NAME>             | 檢視指定 TAG_NAME 之快照資訊                                                                                                     |
| git show \<TAG_NAME>            | 檢視指定 TAG_NAME 之完整快照資訊                                                                                                 |
| git push origin \<TAG_NAME>     | 將目前 commit 快照添加 TAG 給遠端                                                                                                |
| git push origin --tags          | 將本地端 TAG 對應 commit 手動進行遠端上游分支同步上傳                                                                            |

## remote 遠端儲存庫
作為與遠端連結相關資訊，透過遠端資料庫連接能執行 fetch、pull、push 相關同步指令。輕鬆讓你的本地端獲得資料保存的安全處，也能輕易與他人共享或合作開發代碼。

| 語法範例                                                     | 說明                                                                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| git remote                                                   | 查詢跟本 repo 有連接的遠端名稱                                                                                           |
| git remote -v                                                | 同上，另提供詳細路徑來源說明                                                                                             |
| git remote show \<NAME>                                      | 查詢該遠端 NAME 之完整分支與位置資訊                                                                                     |
| git ls-remote \<NAME>                                        | 查詢該遠端 NAME 之快照資訊                                                                                               |
| git remote add \<NAME> \<url>                                | 將另一個遠端連接到目前本地 repo                                                                                          |
| git remote rm \<NAME>                                        | 移除指定的遠端名稱                                                                                                       |
| git remote rename \<OLD_NAME>\<NEW_NAME>                     | 修改別名                                                                                                                 |
| git checkout -b \<BRANCH_NAME> \<SPACE>                      | 規劃成 BRANCH_NAME 新分支且標記在指定 SPACE 處                                                                           |
| git checkout -b \<BRANCH_NAME> \<REMOTE_NAME>/\<BRANCH_NAME> | 規劃成 BRANCH_NAME 新分支且 merge 整合本地端的遠端分支，同時切換分支至此                                                 |
| git checkout -b --track \<REMOTE_NAME>/\<BRANCH_NAME>        | 同上，但本地分支名稱與遠端分支相同                                                                                       |
| git push \<REMOTE_NAME> \<BRANCH_NAME>                       | 指定一個 BRANCH 分支上傳給遠端分支同步                                                                                   |
| git push                                                     | 同上，未指定遠端 repo 時根據追蹤自動找到上游分支並將 HEAD 所在分支進行上傳                                               | 為指定一個 BRANCH 分支上傳給遠端分支同步 |
| git push \<REMOTE_NAME> \<LOCAL_BRANCH>:\<REMOTE_BRANCH>     | 指定一個本地 BRANCH 分支上傳給遠端一個指定分支同步（若目標分支不存在會自動生成）                                         |
| git push \<REMOTE_NAME> --delete \<BRANCH_NAME>              | 有權限情況下，要求遠端 repo 刪除此分支                                                                                   |
| git push \<REMOTE_NAME> :<REMOTE_BRANCH>                     | 同上，要求遠端指定分支同步為空分支（等於設為移除）                                                                       |
| git push -u \<REMOTE_NAME> \<REMOTE_BRANCH>                  | 強迫的將 HEAD 處上傳給遠端分支，並設定為 upstream 進行追蹤（形成上游分支）                                               |
| git push -u \<REMOTE_NAME> \<REMOTE_BRANCH> -f               | 同上，但屬於強迫覆蓋                                                                                                     |
| git fetch \<REMOTE_NAME>                                     | 將指定的遠端 NAME 進行下載，自動抓取本地所沒有的快照與分支                                                               |
| git fetch \<REMOTE_NAME> \<REMOTE_BRANCH>                    | 將指定的遠端 NAME 進行下載，自動抓取本地所沒有的快照與單筆遠端分支                                                       |
| git fetch \<REMOTE_NAME> \<REMOTE_BRANCH>:\<LOCAL_BRANCH>    | 同上但行為屬於單獨抓取且指定目標給本地分支，不更新原分支（或上游分支）在本地歷史上的變化。若目標本地分支不存在會自動生成 |
| git fetch \<REMOTE_NAME> :<BRANCH_NAME>                      | 行為等於新增本地分支，原理為將某個遠端分支（空的不存在）提供下載給本地分支，然而若目標本地分支不存在會自動生成           |
| git pull \<REMOTE_NAME> \<REMOTE_BRANCH>                     | 同 fetch 與 merge 快速作業，指定一遠端分支進行下載且與目前 HEAD 所在分支進行合併                                         |
| git pull                                                     | 同上，未指定遠端 repo 時根據追蹤自動找到上游分支進行下載與合併 HEAD 所在分支                                             |
| git pull --rebase                                            | 同上，下載時順便檢查重複的 commit 並試著重置轉移化，使得分支歷史合理發展                                                 |
| git pull \<REMOTE_NAME> \<REMOTE_BRANCH>:\<LOCAL_BANCH>      | 同上，指定遠端分支下載給本地目標分支，接著與目前 HEAD 所在分支合併                                                       |

## merge and rebase
| 語法範例                                   | 說明                                                                                          |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| git merge \<BRANCH_NAME>                   | 整合指定分支 BRANCH_NAME 內容，並創造一筆快照成為本分支之下一個快照                           |
| git rebase \<BRANCH_NAME>                  | 將本分支採轉移方式至指定分支 BRANCH_NAME，自動整合差異成為指定分支之後的新快照（依轉移量）    |
| git rebase \<BRANCH_TARGET> \<BRANCH_NAME> | 同上但省去切換 HEAD，直接指定 BRANCH_NAME 轉移至 BRANCH_TARGET 內成為之後的新快照（依轉移量） |
| git pull --rebase                          | 解決本地端 merge 與遠端 rebase 相同的快照進行重整合併                                         |

## HEAD 位置
| 語法範例                              | 說明                                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| git checkout \<SPACE>                 | 分離轉移 HEAD 至指定處，SPACE 可以是 BRANCH,SHA-1 編碼 (commit 點）,HEAD... 所在處 |
| git checkout \<SPACE>^                | 符號`^`代表指向 HEAD 至 SPACE 的前一處 (parent)                                    |
| git checkout \<SPACE>^2               | 符號`^2`代表指向 HEAD 至 SPACE 的前一處之另一個 (parent No.2)                      |
| git checkout \<SPACE>~N               | 符號`~N`代表指向 HEAD 至 SPACE 的前 N 處                                           |
| git checkout \<SPACE>~^2~2            | 符號可組合，此例為前一個>parent2>前 2 個                                           |
| git branch -f \<BRANCH_NAME> <SPACE>~ | 移動分支標籤到指定 SPACE 之位置，可添加 `^` 或 `~N` 到相對位置處                   |

## reset and revert
| 語法範例                  | 說明                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| git reset \<SPACE>        | 修改歷史觀念將目前 HEAD 處退回到指定處，使得這些 commit 不曾發生提交，但對 remote 分支不適用                                              |
| git reset --hard \<SPACE> | 同上，同時原提交將不保留的清除所有檔案包含暫存                                                                                            |
| git reset --soft \<SPACE> | 同上，同時原提交將保留的清除所有檔案包含暫存                                                                                              |
| git revert HEAD           | 將目前的 HEAD 處進行 commit 變化的修改取消，同時這個取消之變化過程將形成一個新 commit，可提供 remote 作為他人同步使用（同步你的取消變化） |

## 移動 commit
| 語法範例                                     | 說明                                                                                                            |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| git cherry-pick \<Commit1> \<Commit2> \<...> | 指定數個 commit 複製並且接在你目前的 HEAD 位置後面                                                              |
| git rebase -i \<BRANCH>                      | 參數 將目前與目標分支 BRANCH 的歷史 commit 列表，可進行順序、轉移、複製、合併等操作並放入目標分支 BRANCH 後面， |

## git bisect 搜查 BUG
| 語法範例                 | 說明                                                    |
| ------------------------ | ------------------------------------------------------- |
| git bisect start         | 開始進行二分法的 BUG 搜查                               |
| git bisect bad \<SHA-1>  | 標記目前的 commit 有問題                                |
| git bisect good \<SHA-1> | 標記的 commit 沒問題                                    |
| git bisect \<STATE>      | 告知目前 GIT 隨機給予的 commit 的 STATE 狀態 (good/bad) |

# GitHub 

## Fork 副本與請求整合
GitHub 上面有個特別功能對開源專案有用，就是你能在沒有權限的情況下進行協助開發。這個原理就是透過 Fork 功能從別人的 GitHub 帳戶之指定 repo，進行副本複製到你的 GitHub 帳戶內，變成只屬於你的 repo。事後透過 clone 下載到本地端進行開發，隨後更新到 GitHub，由 GitHub 來幫助你對此 Fork 來的 repo 向原作者進行請求合併。

GIT 官方手冊中有示範 GitHub 的 Fork 應用說明，可直接參考學習：
- [6.2 GitHub - 參與一個專案](https://git-scm.com/book/zh-tw/v2/GitHub-%E5%8F%83%E8%88%87%E4%B8%80%E5%80%8B%E5%B0%88%E6%A1%88)

### Fork 後的 commit 更新
Fork 有幾個以下情況說明：
1. Fork 只是副本取得且僅一次，透過 Fork 而產生只屬於你的遠端 repo，跟原作 repo 沒有關聯（僅剩下 pull 請求功能）。
2. 如果初期對某開源專案進行 fork 到自己的帳戶內形成 repo，若該專案更新了 commit，你 remote 帳戶內的 repo 不會自動更新。
3. 同上，如需取得最新原作代碼，你可以透過本地 repo 設定遠端原作的 remote 進行 fetch 作業再進行 merge 合併，最後再 push 推回你自己的遠端。

### 發出 pull request
透過 Fork 取得副本，代表你可以隨意開發使用成妳滿意的專案功能。如果這些你新開發或調整過後的專案想要回饋給原作者做為開源合作進行加入。push 到你的遠端 repo 後可以從 Github 找到綠色按鈕`pull request`作業。Github 會協助你跟作者之間的溝通交流，如果作者滿意就能將你的檔案加入放入開源專案內。

### 接收 pull requests
這裡屬於作者人稱角度，從專案頁面右側找到 `pull requests` ，這個頁面內能跟這些提交者進行溝通交流。如果確定要合併你可以手動的將提交者當作 remote repo 進行註冊與 fetch，或者利用 GitHub 功能綠色按鈕 `merge pull request` 進行線上合併（非快進），

## Collaborators 添加合作者
跟 Fork 不同（比較偏向是互相分享各自持有自己的 repo)，這裡是指定某人帳戶內的 repo 內設定共同維護者，使這些人都能對此 repo 進行上下傳修改。你可以從 repo 的 Setting 找到 `Collaborators` 將這些 GitHub 用戶加入，未來他們進行 push 作業時使用它們自己的帳密就能更新該 repo 專案。

GIT 官方手冊中有示範 GitHub 的 Collaborators 應用說明，可直接參考學習：
[6.3 GitHub - 維護專案](https://git-scm.com/book/zh-tw/v2/GitHub-%E7%B6%AD%E8%AD%B7%E5%B0%88%E6%A1%88)

## Start 給星星送訂閱
GitHub 有很多很棒的專案，如果你喜歡或想收藏某個 repo 專案，可以在該專案上給予 Star。未來可以從你的帳戶內查看你曾對那些 repo 專案給過那些星星。通常星星數也是對原作者一個按讚的虛榮感來源。

## Follow 追隨作者
你可以將一些同事或值得學習的前輩進行 follow 追隨，未來這個用戶再進行任何新發布 repo 或是他對哪個專案 star 時你都會在動態牆上取得資訊。好處在於資訊共享上吸經驗更快。

## issue 問題討論
issue 像是一個 TODO List，可以是自己或是別人提出對這個 repo 的建議、除錯、反應、新功能規劃，作為開發提醒或是統一對外窗口管理，當作一個討論空間與版本階段發表之平台。

- 每次建立 issue 都有自己的 `#編號` ，未來進行 commit 時如果指定語法就能與 GitHub 上面的 issue#連動：
```shell cmd
> git commit -m "還處理中，#5"

# 提交 push 過後，GitHub 會自動將這個 message 歸入 issue#5 作為紀錄。
```
- 另外還有一些關鍵字連動：
```shell cmd
> git commit -m "還處理中，Closes #10"
# keyword = close,closes,closed,fix,fixes,fixed,resolve,resolves,resolved

# 這能連動 issue#10 進行狀態為關閉。
```
- 建立 issue 時，可添加一些 Labels 讓內容提供一些類別說明。
- 完整說明請參閱官方文件 [Linking a pull request to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)

## GitHub Pages 網頁
任何 repo（免費帳戶需設定公開）都能提供額外的網頁服務，這僅限於簡易的 Web Servise(HTML+CSS+JS) 使用。你需要指定一個分支為 Page 網站生成來源，因此你可以自己控制網站與代碼的版本操作。預設為關閉，你需要從 Setting 內可找到此服務進行開啟。

## GitHub Gist 手札
GitHub Gist 屬於另外獨立的服務，可以說是一種隨手紀錄用的筆記本或便條紙，提供了修訂追蹤與星星數服務。可以貼上各種程式碼甚至 markdown，並能 embed 代碼或 url 網頁分享給任何人。

雖然沒有辦法像 gitpage 這樣使用，但可以透過第三方工具 (bl.ocks) 來達到簡單的 page 使用，舉例如下：
- 將 gist URL https://gist.github.com/labnol/122d4de95c6a127b1c9b
- 換成 URL http://bl.ocks.org/labnol/raw/122d4de95c6a127b1c9b/

# 文獻參考
- [Supercharged Portable VSCode (with Git and Node.js)](https://medium.com/@arimgibson/supercharged-portable-vscode-with-git-and-node-js-34afad8f661b)
- [連猴子都能懂的 Git 入門指南 | 貝格樂（Backlog）](https://backlog.com/git-tutorial/tw/)
- [Git - Book](https://git-scm.com/book/zh-tw/v2)