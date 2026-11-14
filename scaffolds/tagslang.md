# 文章標籤速查

寫文章時會用到的 Hexo 與 NexT 標籤語法，複製整段貼進文章即可。
這個檔案只是備忘，不是 `hexo new` 的模板（模板是 `post.md`、`draft.md`、`page.md`）。

標籤分成三類：

- **常用**：現有文章大量使用，優先用這些。
- **嵌入外部內容**：CodePen、JSFiddle、StackBlitz 等。
- **其他**：NexT 有但文章很少用，需要時再用。

## 常用

### 摘要分隔

放在導言之後。首頁列表只顯示這條線之前的內容，並出現「閱讀全文」。

```md
導言段落。

<!-- more -->
```

### 提示卡片（note）

六種顏色，內容可以放粗體標題、段落、程式碼區塊、清單。文章裡用得最多的是 `info`（補充）與 `warning`（注意）。

- `{% note info %}`：補充、小技巧。
- `{% note warning %}`：注意事項、容易誤會的地方。
- `{% note success %}`：跟著做、步驟成功。
- `{% note primary %}`：素材、前置準備。
- `{% note default %}`：一般說明、跳頁建議。
- `{% note danger %}`：新手陷阱、會出錯的寫法。

```md
{% note info %}
**小技巧：關於 Emmet**
在 VS Code 的 `index.html` 輸入 <kbd>!</kbd> 後按 <kbd>TAB</kbd>，可以快速生成基本的 HTML 結構。
{% endnote %}
```

結尾一定要寫 `{% endnote %}`。

### 流程圖（mermaid）

不要用 <code>```mermaid</code> 圍欄，要用標籤，第一行寫圖的類型。

```md
{% mermaid graph LR %}
A[使用者] --> B[瀏覽器] --> C[伺服器]
{% endmermaid %}
```

### 分頁籤（tabs）

`{% tabs 名稱, 預設開啟第幾個 %}`，預設填 `-1` 代表全部收起。每個頁籤用 `<!-- tab 標題 -->` 開頭、`<!-- endtab -->` 結尾；沒寫標題時用 `名稱 + 序號`。

```md
{% tabs demo, 1 %}
<!-- tab HTML -->
內容一
<!-- endtab -->
<!-- tab CSS -->
內容二
<!-- endtab -->
{% endtabs %}
```

### 連到站內其他文章

用檔名（不含 `.md`），後面接顯示文字；沒寫文字時會顯示對方的標題。

```md
{% post_link lokiTech-15day-05-tailwind-cheatsheet Tailwind CSS v4 公式表 %}
```

### 程式碼區塊

語言後面接檔名，會在程式碼視窗上方顯示檔名標籤。路徑很長也沒關係，窄螢幕會自動在 `/` 後換行。

````md
```html index.html
<h1>Hello</h1>
```

```js src/main.js
console.log('Hello');
```
````

### 引用外部文件（blockquote）

格式：`{% blockquote 來源名稱 網址 %}`，內文是引用的文字。

```md
{% blockquote MDN https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element %}
完整的元素清單請參考 MDN 官方文件：
{% endblockquote %}
```

只放來源、不放內文的簡短寫法：

```md
{% blockquote Emmet https://docs.emmet.io/ %}{% endblockquote %}
```

### 鍵盤按鍵

不是標籤，是 HTML：`<kbd>F12</kbd>`。站台樣式會把它畫成深色按鍵。

## 嵌入外部內容

### CodePen

格式：`{% codepen 使用者 slug 主題 預設分頁 高度 [寬度] %}`。

- **主題一定要寫**（`dark` 或 `light`），少了它後面的參數會錯位，高度就失效。
- 高度與寬度只寫數字，不要用 `%`，否則編譯會出錯。

```md
{% codepen summer10920 abRMXwm dark html,css,result 900 %}
```

### JSFiddle

格式：`{% jsfiddle 短碼 分頁 主題 寬度 高度 %}`。

```md
{% jsfiddle summer10920/dj67rhsm result dark 100% 1024 %}
```

### 其他 iframe（StackBlitz、示範網頁）

格式：`{% iframe 網址 寬度 高度 %}`。

```md
{% iframe https://stackblitz.com/edit/angular-ivy-muvwvn 100% 500 %}
```

### 影片

```md
{% youtube video_id %}
{% vimeo video_id %}
```

## 其他

文章裡很少用，需要時再用。

### 小標籤（label）

`{% label 顏色@文字 %}`，顏色有 `default`、`primary`、`success`、`info`、`warning`、`danger`。

```md
{% label primary@選讀 %}
```

### 按鈕（button）

`{% button 網址, 文字, 圖示名稱 [樣式], [提示文字] %}`，圖示用 Font Awesome 的名稱（不含 `fa-`），欄位之間用半形逗號。

```md
{% button https://github.com/summer10920, GitHub, fab fa-github %}
```

### 置中引言（cq）

```md
{% cq %}一句想放大的話{% endcq %}
```

### 圖片排版（gp）

`{% gp 總張數-每列張數 %}`，裡面放圖片。排列方式見主題的 `scripts/tags/group-pictures.js` 註解。

```md
{% gp 4-2 %}
![](assets/images/example-1.png)
![](assets/images/example-2.png)
![](assets/images/example-3.png)
![](assets/images/example-4.png)
{% endgp %}
```

### 瀏覽器支援度（caniuse）

```md
{% caniuse css-grid %}
```

## 站台慣例

- 文章不使用表格（內文寬度窄，表格擠），改用清單；只有 Tailwind 公式表例外。
- 行內程式碼（`` `code` ``）只用在真正的程式碼片段：變數、檔名、路徑、屬性、指令。
- 前言文字不要寫成一串零碎短句，用連貫的一段話。
- 圖片放在 `source/assets/images/`，文章裡用相對路徑 `assets/images/...`；封面圖放在 `banner/` 子資料夾。
- 隱藏文章：在 front matter 加 `hidden: true`，隱藏後不會出現在清單、標籤、分類，只有知道網址的人看得到。

## 常用指令

```bash
pnpm start       # 啟動開發伺服器，網址 http://localhost:4000
pnpm build       # 產生靜態網站到 public/
pnpm restart     # 清除快取後重新產生，網站樣子怪怪的時候用
pnpm run deploy  # 部署（依 _config.yml 的 deploy 設定）；不能省略 run，pnpm deploy 是 pnpm 內建的另一個指令
```

建立新文章：

```bash
pnpm exec hexo new post "文章標題"    # 用 scaffolds/post.md
pnpm exec hexo new draft "文章標題"   # 用 scaffolds/draft.md，不會被發佈
pnpm exec hexo publish "文章標題"     # 把草稿移到 source/_posts
```

## 官方文件

- [Hexo 標籤外掛](https://hexo.io/zh-tw/docs/tag-plugins.html)
- [NexT 標籤外掛](https://theme-next.js.org/docs/tag-plugins/)
