---
title: "Tailwind（三）：斷點前綴、漢堡選單、版心與圖片"
categories:
  - 職訓課程
  - 本年度課程
tag:
  - JS 網頁 AI 開發（假日班）
  - TailwindCSS
date: 2026-08-30 10:05:00
---

![](assets/images/banner/html5.png)

RWD（Responsive Web Design，響應式網頁）單獨成章：後面切版會用桌機＋手機截圖，官方 template 也必須 RWD。同一份 HTML 在不同寬度改排法，不要做兩套網站。

<!-- more -->

# 行動優先
RWD 不是另外做一個手機網站。Tailwind 不加前綴的 class 先套在窄螢幕；`md:` 起才套較寬規則，對應 CSS 篇章的 `min-width` media。課堂主用 `md`（大約 768px）；`sm`、`lg` 各會舉一個例子，不必背完整像素表。

# 顯示與隱藏
`hidden` 就是 `display: none`。`md:flex` 是夠寬才變成 flex。用開發者工具拉寬度，不要把 class 當成裝飾用英文單字。

不要為了手機再複製一整條 `nav`——契約難對，後面 React 更痛。同一組連結即可。

# 漢堡選單（對齊老師 template）
官方 template 用 checkbox 當純 CSS 開關。`id` 必須是 `nav-toggle`，放在 `header#site-header` 裡。今天改自己的練習專案，可對照 `loki-travel-template/index.html`，但還不要做四頁官網。

- `input#nav-toggle.peer.hidden`：狀態在勾選，畫面把 checkbox 藏起來
- `label for="nav-toggle"`：手機才看到的「選單」按鈕
- `nav`：`peer-checked:flex` 在勾選時打開；`md:flex` 在桌機永遠橫列

id 不准改：後面的 JS 練習都找這個名字。`peer` 的進階變形、點外面關閉，今天不展開。

# 一次貼上的 header
對齊老師 template 的精神：同一份 HTML，靠 class 改寬度。整段複製進練習專案（路徑可留 `#`）。F12 勾選 `nav-toggle`，看 `checked`；裝置模式切 390 與 1280。

```html index.html
<header id="site-header" class="relative bg-teal-800 text-white">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
    <a href="#" class="text-lg font-bold">練習站</a>
    <input id="nav-toggle" type="checkbox" class="peer hidden" />
    <label for="nav-toggle" class="cursor-pointer rounded border border-white/40 px-3 py-1 md:hidden">選單</label>
    <nav class="absolute left-0 right-0 top-14 hidden flex-col gap-3 bg-teal-800 px-4 py-4 peer-checked:flex md:static md:flex md:flex-row md:gap-6 md:bg-transparent md:p-0">
      <a href="#" class="hover:underline">首頁</a>
      <a href="#" class="hover:underline">行程</a>
      <a href="#" class="hover:underline">報名</a>
    </nav>
  </div>
</header>
```

| 寬度 | 你應看到 | F12 |
| --- | --- | --- |
| 390px | 「選單」按鈕；勾選後 nav 直向展開 | `#nav-toggle` 有 checked；nav 有 `peer-checked:flex` |
| 1280px | 橫向三個連結，沒有漢堡 | nav 有 `md:flex`；label 有 `md:hidden` |

# 圖片與版心
`w-full` 讓圖吃滿欄寬；`h-40 object-cover` 避免高度崩版。`max-w-6xl mx-auto px-4` 當桌機版心。不要寫死整頁 `width: 1920px`，那會造成橫向捲軸。

{% note primary %}
**練習規格**

請只改現有 header。必須保留 id="site-header" 與 id="nav-toggle"。
手機顯示選單按鈕，md 以上橫向連結。不要新增 React。不要改檔名。不要複製兩套 nav 當成兩個網站。
{% endnote %}

# 本章契約
兩個 id 必留。練習專案。禁止為 RWD 新增第五頁。

{% note warning %}
**練習對照（課堂會講解答）**
- 390px 與 1280px 選單行為對不對？
- `#nav-toggle` 還在嗎？
- 有沒有寫死寬度導致橫向捲軸？
- 圖片有沒有撐破版面？
{% endnote %}

# 本篇重點回顧
練習 header 在兩種寬度講得出來。

接著會用 `screenshots/desktop` 與 `screenshots/mobile`，**先看圖再動手**，結構先對上。程式可以跟同學不一樣，但檔名與 id 不行。**之後會換成老師 template**，不要把這一章的 header 當成後面唯一能用的架構。
