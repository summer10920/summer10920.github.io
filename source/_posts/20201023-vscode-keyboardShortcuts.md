---
title: "[基礎課程] 使用 VSCode 你該知道的技巧"
categories:
  - Zero 出發的學習之路
tag:
  - VSCode
date: 2020-10-23 16:02:24
type: "picture"
---

笨蛋
{% gp 5-3 %}
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7cice6j218g0p0zpv.jpg)
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7ch9rvj218g0p0jvi.jpg)
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7cj8xej218g0p0gqw.jpg)
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7cg745j218g0p0juj.jpg)
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7cgf88j218g0p0ju3.jpg)
{% endgp %}

<!-- more -->

# 快捷鍵篇
VSCODE 提供強大的快捷鍵使用，詳細資訊收錄在官方手冊或者可透過 VSCODE 軟體的 [說明->鍵盤快速鍵參考](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf) 取得線上說明。本節將全體翻譯並提取部分實用做細部說明。

## General 一般指令
- <kbd>Ctrl+Shift+P</kbd> <kbd>F1</kbd> 命令選擇區
- <kbd>Ctrl+P</kbd> <kbd>Ctrl+E</kbd> 快速檔案開啟
比起透過工作區慢慢找檔案，該指令可找到最近開啟的，也能用輸入檔名之關鍵字找到工作區內的檔案。
- <kbd>Ctrl+Shift+N</kbd> 開啟新的 VSCODE
- <kbd>Ctrl+Shift+W</kbd> 關閉目前的 VSCODE
- <kbd>Ctrl+,</kbd> 用戶設定
- <kbd>Ctrl+K Ctrl+S</kbd> 鍵盤快速鍵

## Basic editing 基本編輯
- <kbd>Ctrl+X</kbd> 剪下該行（未選取可）
- <kbd>Ctrl+C</kbd> 複製該行 （未選取可）
- <kbd>Alt+ ↑ / ↓</kbd> 移動該行至上下處
快速將目前位置進行整行移動於上或下方指定處。
![move_line](https://i.imgur.com/WDY6I7B.gif)
- <kbd>Shift+Alt + ↓ / ↑</kbd> 複製該行至上下處
快速將目前位置進行整行複製並貼於上或下方指定處。
![copy_line_down](https://i.imgur.com/XrEIzNy.gif)
- <kbd>Ctrl+Shift+K</kbd> 刪除該行並清除該行數
- <kbd>Ctrl+Enter</kbd> 插入空行於下方
- <kbd>Ctrl+Shift+Enter</kbd> 插入空行於上方
- <kbd>Ctrl+Shift+\</kbd> 跳至對應的區段符號處，例如`(), {}, []`
- <kbd>Home / End</kbd> 前往該行首或行尾處
- <kbd>Ctrl+Home / Ctrl+End</kbd> 前往編譯檔之頁首或頁尾
- <kbd>Ctrl+↑ / ↓</kbd> 朝上下滾動單行
- <kbd>Alt+PgUp / PgDn</kbd> 朝上下滾動單頁
- <kbd>Ctrl+K Ctrl+0</kbd> 收合所有程式碼
- <kbd>Ctrl+K Ctrl+J</kbd> 展開所有程式碼
- <kbd>Ctrl+K Ctrl+C</kbd> 轉為單行註解
- <kbd>Ctrl+K Ctrl+U</kbd> 解除單行註解
- <kbd>Ctrl+/</kbd> 切換單行註解
- <kbd>Shift+Alt+A</kbd> 切換區域註解
- <kbd>Alt+Z</kbd> 切換自動換行

## Navigation 導覽
- <kbd>Ctrl+T</kbd> 前往工作區內的符號
透過指令找到工作區內的變數或符號。
![go_to_symbol_in_workspace](https://i.imgur.com/vgzZkBd.png)
- <kbd>Ctrl+G</kbd> 前往行數
- <kbd>Ctrl+Shift+O</kbd> 前往編譯檔內的符號
透過指令找到某個變數或符號，能更快的前往符號位置。可於搜尋列內添加符號 <kbd>:</kbd> 做分組過濾。而視窗的檔案總管工具 [大綱] 也有相同功用。
![find_by_symbol](https://i.imgur.com/QvJ9vk2.gif)
- <kbd>Ctrl+Shift+M</kbd> 開啟問題視窗
- <kbd>F8</kbd> 跳至下一個錯誤或警告之代碼處
- <kbd>Shift+F8</kbd> 轉到上一個錯誤或警告之代碼處
- <kbd>Ctrl+Shift+Tab</kbd> 反向快切編譯歷史紀錄
- <kbd>Alt+ ← / →</kbd> 編譯歷史紀錄轉換
- <kbd>Ctrl+M</kbd> 切換 TAB 鍵應用

## Search and replace 搜尋替換
- <kbd>Ctrl+F</kbd> 搜尋
- <kbd>Ctrl+H</kbd> 替代
- <kbd>F3 / Shift+F3</kbd> 搜尋下一個或上一個符合項目
- <kbd>Alt+Enter</kbd> 在搜尋模式下將匹配的對象全部列入選取
- <kbd>Ctrl+D</kbd> 相同選取
將已選取特定段落做匹配代碼，往後搜尋若相同則賦予選取游標。若不小選多選取了，則可透過 <kbd>ctrl + U</kbd> 將游標動作返回上一步驟。
![add_cursor_current_selection_one_by_one](https://i.imgur.com/siAPKSl.gif)
- <kbd>Ctrl+K Ctrl+D</kbd> 將目前選擇調整為下一個匹配選取
- <kbd>Alt+C / R / </kbd> 切換大小寫/正則表達式/完整單詞

## Multi-cursor and selection 多重選取
- <kbd>Alt+Click</kbd> 加入選取
將滑鼠 click 指向之處，列入游標選取對象。
- <kbd>Ctrl+U</kbd> 復原上一次游標選取
- <kbd>Shift+Alt+I</kbd> 於圈選範圍下之各行末處添加游標
- <kbd>Ctrl+L</kbd> 選取當前行
- <kbd>Ctrl+Shift+L</kbd> <kbd>Ctrl+F2</kbd> 相同皆為全部選取
若整個檔案都想選取起來（瘋狂 ctrl+d? 別這樣），一樣先選中一組匹配段落後進行快速鍵，能將全部相同代碼都進行游標選取。
![add_cursor_current_selection](https://i.imgur.com/anKpJcC.gif)
- <kbd>Shift+Alt+ → / ←</kbd> 延伸智慧選取
停留於某局部代碼處，快速鍵可延伸至外部層級範圍代碼進行擴大選取，隨著連續按下次數越多，圈選的範圍越大直到全部。超過時可退回範圍選取透過 <kbd>shift + alt + ←</kbd> 退回。
![expandselection](https://i.imgur.com/odAtul6.gif)
- <kbd>Shift+Alt + (drag mouse)</kbd> 列框選取 - 滑鼠拖曳
壓住滑鼠進行拖曳對角線之區域選取，能產生類似方框範圍列向選取之效果。
![column-select](https://i.imgur.com/hEwYPjF.gif)
- <kbd>Ctrl+Shift+Alt + (arrow key)</kbd>  列框選取 - 方向範圍或游標處
以目前游標位置向下行之相同處，列入游標選取對象。反向 <kbd>↑</kbd> 亦可。
![multicursor](https://i.imgur.com/zKibzO9.gif)
- <kbd>Ctrl+Shift+Alt + PgUp/PgDn</kbd> 列框選取 - 分頁範圍
同上，範圍擴大為分頁單位

## Rich languages editing 語意編輯
- <kbd>Shift+Alt+F</kbd> 格式化文件
- <kbd>Ctrl+K Ctrl+F</kbd> 格式化選擇範圍
指定範圍內做排版格式化
![code_formatting](https://i.imgur.com/wJXtS3j.gif)
- <kbd>F12</kbd> 移至定義
游標放置於某已應用之 fn 或變數名稱上，透過 F12 或右鍵選擇 `移至定義` 能直接跳轉到該該定義宣告方便理解作用為何。
如果動作結束後想回到原本行位置可以透過 <kbd>alt + ←</kbd>回到上次游標。
![goto_definition](https://i.imgur.com/K7pJDZ1.gif)
- <kbd>Alt+F12</kbd> 查核定義
小視窗的呈現該對象之宣告定義為何。
![peek](https://i.imgur.com/7Zy45tj.gif)
- <kbd>Ctrl+K F12</kbd> 開啟參考
- <kbd>Shift+F12</kbd> 前往參考
小視窗的呈現所有編譯檔內的所有出現的 fn 或變數處，包含宣告與應用。
![find_all_references](https://i.imgur.com/Glish29.gif)
- <kbd>F2</kbd> 重新命名符號
- <kbd>Ctrl+K Ctrl+X</kbd> 刪除多餘的空白結尾
![trim_whitespace](https://i.imgur.com/nFmgots.gif)
- <kbd>Ctrl+K M</kbd> 切換檔案語言

## Editor management 編輯視窗管理
- <kbd>Ctrl+F4</kbd> <kbd>Ctrl+W</kbd> 關閉編譯視窗
- <kbd>Ctrl+K F</kbd> 關閉工作區
- <kbd>Ctrl+\</kbd> 分割編輯視窗
將目前編輯畫面分割視窗做並排，對終端機視窗也通用。
- <kbd>Ctrl+ 1 / 2 / 3</kbd> 依編譯視窗順序列切換
快切對應數字編號順序的編輯視窗切換。
- <kbd>Ctrl+Shift+PgUp / PgDn</kbd> 移動編輯視窗順序

## File management 檔案管理
- <kbd>Ctrl+N</kbd> 建立新檔
- <kbd>Ctrl+O</kbd> 開啟舊檔
- <kbd>Ctrl+S</kbd> 存檔
- <kbd>Ctrl+Shift+S</kbd> 另存
- <kbd>Ctrl+K S</kbd> 全部存檔
- <kbd>Ctrl+F4</kbd> 關閉
- <kbd>Ctrl+K Ctrl+W</kbd> 全部關閉
- <kbd>Ctrl+Shift+T</kbd> 重新開啟上次關閉之編譯
- <kbd>Ctrl+Tab</kbd> 跳至下一個編譯
隨著編輯視窗多重開啟，透過指令可快速來回切換這些視窗紀錄，並可利用 <kbd>alt + ←</kbd> 或 <kbd>alt + →</kbd>來回切換紀錄歷史步驟。
- <kbd>Ctrl+Shift+Tab</kbd> 跳至前一個編譯
- <kbd>Ctrl+K P</kbd> 複製當前的檔案實體路徑
- <kbd>Ctrl+K R</kbd> 檔案總管方式開啟檔案位置
- <kbd>Ctrl+K O</kbd> 另啟動 VSCODE 對檔案編譯
 
## Display 檢視項目
- <kbd>F11 全畫面
- <kbd>Ctrl+ = / -</kbd> 調整預覽比例
- <kbd>Ctrl+Shift+E</kbd> 切換檔案總管之焦點
- <kbd>Ctrl+Shift+F</kbd> 呼叫搜尋
- <kbd>Ctrl+Shift+G</kbd> 呼叫 GIT
- <kbd>Ctrl+Shift+D</kbd> 呼叫偵錯
- <kbd>Ctrl+Shift+X</kbd> 呼叫延伸模組
- <kbd>Ctrl+Shift+H</kbd> 呼叫替代
- <kbd>Ctrl+Shift+J</kbd> 切換搜尋進階模式
- <kbd>Ctrl+Shift+U</kbd> 呼叫輸出面板
- <kbd>Ctrl+Shift+V</kbd> 開啟 MarkDown 預覽
- <kbd>Ctrl+K V</kbd> 開啟 MarkDown 預覽於另側
- <kbd>Ctrl+K Z</kbd> 開啟禪宗模式
想要單純乾淨的畫面，可以使用快捷鍵調整畫面，如需退出只須連續 <kbd>ESC</kbd> 兩次即可。如需要檔案總管可使用 <kbd>ctrl + shift + E</kbd>事後滑鼠拖曳退出。
## Debug 
- <kbd>F9</kbd> 切換標記紅點
- <kbd>F5</kbd> 開始/繼續偵錯
- <kbd>Shift+F5</kbd> 停止偵錯
- <kbd>F11 / Shift+F11</kbd> Step into/out
- <kbd>F10</kbd> Step over
- <kbd>Ctrl+K Ctrl+I</kbd> Show hover

## Integrated terminal 終端機
- <kbd>Ctrl+`</kbd> 開啟終端機
- <kbd>Ctrl+Shift+`</kbd> 新增終端機
- <kbd>Ctrl+C</kbd> 複製
- <kbd>Ctrl+V</kbd> 貼上
- <kbd>Ctrl+↑ / ↓</kbd> 向上下滾動
- <kbd>Shift+PgUp / PgDn</kbd> 向上下滾動單頁
- <kbd>Ctrl+Home / End</kbd> 滾動至頂端尾端

## 其他
- <kbd>ctrl on</kbd> 簡易查詢
停留在某函式或變數時，按下 ctrl 能簡易查詢說明。
- 指令：切換大小寫
命令輸入 `>transform`，能將所選取的英文大小寫或字首切換。
![Image](https://i.imgur.com/wHUHLAk.png)
- <kbd><kbd>ctrl + I</kbd>觸發智能輸入建議
![intellisense](https://i.imgur.com/Vc5juNu.gif)


# Emmet 篇

# GIT 篇
- 指令：切換工作樹狀+-呈現
僅用於 git 比較時，工作樹狀編譯下可命令輸入 `>toggle inline view` 切換內嵌檢視方式。
- Changs 變更：
查詢檔案與快照的差異性 diff，透過顏色差異做檢視。
![msee-changes](https://i.imgur.com/Eaeb9s7.gif)
- Checkout Branch 切換分支
提供分支切換功能，也提供建立分支等作業。
![mswitch-branch](https://i.imgur.com/7Jzl0v1.gif)
- Stage Change 列入暫存
可透過 `+` 符號將修改的文件加入 Stage 內，可透過 `-` 退出暫存。
![mstage-unstage](https://i.imgur.com/OxXz1YG.gif)
- Undo last commit 取消上次提交
等於 `git reset HEAD~` 指令，還原到上一個提交狀態。
![mundo-last-commit](https://i.imgur.com/6RtzpjS.gif)
- Gutter indicators 間格提示
對工作區內的檔案進行編譯時（不是 GIT 視窗內的變更檢視），若此檔案有被 git 所觀察會額外提供一個小間格為變異上提示。
![mgutter_icons](https://i.imgur.com/Ls4Ewhp.gif)

# 參考文獻
- [Visual Studio Code Tips and Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [microsoft/vscode-docs/docs/getstarted/tips-and-tricks.md](https://github.com/microsoft/vscode-docs/blob/master/docs/getstarted/tips-and-tricks.md)
- [microsoft/vscode-docs/docs/editor/codebasics.md](https://github.com/microsoft/vscode-docs/blob/master/docs/editor/codebasics.md#multicursor-modifier)