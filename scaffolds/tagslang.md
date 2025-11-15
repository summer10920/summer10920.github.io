# 插入閱讀全文
<!-- more -->

# NOTE 標記

{% note default %}
**跳頁建議：從這裡開始出現未學過的內容，建議先前往補充知識再回到這裡**
{% endnote %}

{% note primary %}
  **素材準備：準備好以下代碼** 
  ```html cssTry.html
  <pre><code></code></pre>
  ```
{% endnote %}

{% note success %}
**跟著做：**
{% endnote %}

{% note info %}
  **小技巧：關於 emmet**
  在 vscode 內建立 `index.html` 完成後，試著輸入 <kbd>!</kbd> 得到畫面提示時，按下 <kbd>TAB</kbd> 可以快速生成基本的 HTML 結構，這是 VSCODE 內建了 [emmet](https://docs.emmet.io/) 快速編寫指令。
{% endnote%}

{% note warning %}
  **科普知識：關於 Unicode 與實體化符號**
  舉例玩一下&copy; 這個符號，中文輸入<kbd>\`u00a9</kbd>可以得到，這就是 unicode 的 16 進位代號：A9，接著轉 10 進位代號：169。試著打出`&#xa9;`跟`&#60;`都可以得到該符號。
{% endnote%}

{% note danger %}
  **新手陷阱：@import 放置於開頭處**
  使用@import 時必需放正式撰寫 css 之前的第一行，否則會載入失敗。
{% endnote %}

# Youtube
{% youtube video_id %}

# Vimeo
{% vimeo video_id %}

# blockqute
{% blockquote CSS's keyword index https://xxx.xxx.xx %}
完整的屬性所有項目請參考 MDN 官方手冊：
{% endblockquote %}

{% blockquote w3schools https://www.w3schools.com/css/css_pseudo_classes.asp %}
不少元素都持有各自的偽類別，總類繁多請參考官方
{% endblockquote %}

## lite version
{% blockquote Emmet https://docs.emmet.io/ %}{% endblockquote %}

# jsfiddle
Learn_CSS_CLS3_totalTest

for Learning book demo use

{% jsfiddle summer10920/0s5ro82L js,html,css,result dark 100% 500 %}

# codepen

{% codepen userId|anonymous|anon slugHash theme defaultTab height [width] %}

替换参数后的语法：(*设置宽高时不要用%，会导致编译错误*)
- 參數順序：`userId`、`slugHash`、`theme`（必須指定，如 `dark` 或 `light`）、`defaultTab`（如 `html,css,result`）、`height`（數字，如 `900`）、`width`（可選，如 `100%`）
- **重要**：必須明確指定 `theme` 參數，否則後續參數位置會錯位導致高度設定無效~~

範例：
{% codepen summer10920 abRMXwm dark html,css,result 900 %}
{% codepen summer10920 ExXOLxa dark html,css,result 250 %}

[hexo 官方 tag 說明](https://hexo.io/zh-tw/docs/tag-plugins.html)
[theme.next 官方 tag 說明](https://theme-next.iissnan.com/tag-plugins.html)

# 引用
{% cq %}世间所有的相遇，都是久别重逢{% endcq %}

# 標籤
{% label default@輸入文字 %}
{% label primary@輸入文字 %}
{% label success@輸入文字 %}
{% label info@輸入文字 %}
{% label warning@輸入文字 %}
{% label danger@輸入文字 } 
{% label success@輸入文字 %}

# tabs
{% tabs classtry,1 %} 名字为 tab，默认在第 1 个选项卡，如果是-1 则隐藏
<!-- tab -->
**选项卡 1** 
<!-- endtab -->
<!-- tab -->
**选项卡 2**
<!-- endtab -->
<!-- tab A -->
**选项卡 3** 名字为 A
<!-- endtab -->
{% endtabs %}

# 按鈕
{% button url, text, icon [class], [title] %}

url : 绝对或相对 URL
text : 按钮文字，如果未指定图标则为必须
icon : FontAwesome 图标名称（开头没有’fa-‘）。如果未指定文本，则为必需
[class] : FontAwesome 类：fa-fw | fa-lg | fa-2x | fa-3x | fa-4x | fa-5X ，可选参数。
[title] : 鼠标悬停时的工具提示，可选参数。
注意：最好添加 <div> 标签，测试时没加 div，下面显示不完全，加上非常美观。

ex:
<div>{% button https://tding.top/ , 首页，home fa-fw, 这是小丁的个人博客首页%}</div>

<div class="text-center">
  <div>
    {% button https://tding.top/ , 首页，home fa-fw, 这是小丁的个人博客首页%}
    {% button https://tding.top/movies/ , 观影，film fa-fw, 豆瓣电影%}
    {% button https://tding.top/books/ , 阅读，book fa-fw, 豆瓣读书%}
  </div>
</div>

# 更新上傳
hexo g -d

# link to post
{% post_link exam-173002B10-0 %}

# 圖庫模式
设置图片展示效果，参考 theme/next/scripts/tags/group-pictures.js 注释示意图。

{% gp 5-3 %}
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7cice6j218g0p0zpv.jpg)
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7ch9rvj218g0p0jvi.jpg)
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7cj8xej218g0p0gqw.jpg)
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7cg745j218g0p0juj.jpg)
![](https://cdn.jsdelivr.net/gh/0vo/oss/images/687148dbly1flxx7cgf88j218g0p0ju3.jpg)
{% endgp %}

# 使用 HTML 編譯
透過`<escape></escape>`標籤包覆能直接寫 HTML