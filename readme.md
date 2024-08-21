# Hexo Site

這是一個使用 Hexo 建立的靜態網站專案。

## 安裝

首先，請確保你已經安裝了 Node.js 和 npm。然後在專案目錄中執行以下命令來安裝依賴：

```bash
npm install
```

## 指令

以下是一些常用的指令：

- 啟動本地伺服器：
  ```bash
  npm start
  ```

- 生成靜態文件：
  ```bash
  npm run build
  ```

- 清理生成的文件：
  ```bash
  npm run clean
  ```

- 部署網站：
  ```bash
  npm run deploy
  ```

## 依賴

此專案使用了以下主要依賴：

- [Hexo](https://hexo.io/)
- [Hexo CLI](https://github.com/hexojs/hexo-cli)
- [Hexo CodePen](https://github.com/next-theme/hexo-codepen)
- [Hexo Deployer Git](https://github.com/hexojs/hexo-deployer-git)
- [Hexo Generator Archive](https://github.com/hexojs/hexo-generator-archive)
- [Hexo Generator Category](https://github.com/hexojs/hexo-generator-category)
- [Hexo Generator Index](https://github.com/hexojs/hexo-generator-index)
- [Hexo Generator SearchDB](https://github.com/theme-next/hexo-generator-searchdb)
- [Hexo Generator Tag](https://github.com/hexojs/hexo-generator-tag)
- [Hexo Hide Posts](https://github.com/next-theme/hexo-hide-posts)
- [Hexo Renderer EJS](https://github.com/hexojs/hexo-renderer-ejs)
- [Hexo Renderer Marked](https://github.com/hexojs/hexo-renderer-marked)
- [Hexo Renderer Stylus](https://github.com/hexojs/hexo-renderer-stylus)
- [Hexo Server](https://github.com/hexojs/hexo-server)
- [Hexo Word Counter](https://github.com/willin/hexo-word-counter)
- [Patch Package](https://github.com/ds300/patch-package)
- [Browserify](https://github.com/browserify/browserify)
- [Range Parser](https://github.com/jshttp/range-parser)

## 配置

在 `_config.yml` 文件中可以進行站點配置。以下是一些主要配置項：

```yaml:_config.yml
startLine: 1
endLine: 120
```

## 版本

Hexo 版本：6.3.0

## 貢獻

歡迎提交問題和合併請求。請確保在提交之前先閱讀 [貢獻指南](CONTRIBUTING.md)。

## 授權

此專案採用 [MIT 授權](LICENSE)。