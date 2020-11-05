# 插入閱讀全文
<!-- more -->

# NOTE標記
{% note default %}
**跳頁建議：從這裡開始出現未學過的內容，建議先前往補充知識再回到這裡**
{% endnote %}

{% note primary %}
**素材準備：準備代碼以方便下階段的教學練習** 
```html cssTry.html
```
{% endnote %}

{% note success %}
**跟著做：**
{% endnote %}

{% note info %}
**小技巧**：
{% endnote %}

{% note warning %}
**科普知識：**
{% endnote %}

{% note danger %}
**新手陷阱：**
{% endnote %}


# Youtube
{% youtube video_id %}

# Vimeo
{% vimeo video_id %}

# blockqute
{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}

{% blockquote w3schools https://www.w3schools.com/css/css_pseudo_classes.asp %}
不少元素都持有各自的偽類別，總類繁多請參考官方
{% endblockquote %}

## lite version
{% blockquote Emmet https://docs.emmet.io/ %}{% endblockquote %}

#jsfiddle
Learn_CSS_CLS3_totalTest

for Learning book demo use

{% jsfiddle summer10920/0s5ro82L js,html,css,result dark 100% 500 %}

[hexo 官方tag說明](https://hexo.io/zh-tw/docs/tag-plugins.html)
[theme.next官方tag說明](https://theme-next.iissnan.com/tag-plugins.html)

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
{% tabs classtry,1 %} 名字为tab，默认在第1个选项卡，如果是-1则隐藏
<!-- tab -->
**选项卡 1** 
<!-- endtab -->
<!-- tab -->
**选项卡 2**
<!-- endtab -->
<!-- tab A -->
**选项卡 3** 名字为A
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
<div>{% button https://tding.top/ ,首页,home fa-fw,这是小丁的个人博客首页%}</div>

<div class="text-center">
  <div>
    {% button https://tding.top/ ,首页,home fa-fw,这是小丁的个人博客首页%}
    {% button https://tding.top/movies/ ,观影,film fa-fw,豆瓣电影%}
    {% button https://tding.top/books/ ,阅读,book fa-fw,豆瓣读书%}
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