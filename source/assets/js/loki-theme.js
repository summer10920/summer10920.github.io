/* 站台的所有 JS。依賴 NexT 結構的部分（橫幅畫布、回頂端、程式碼視窗）在最前面與最後面，
   升級主題時請先檢查這些段落。 */

/************ 一、橫幅：畫布（依賴 .main > .column）、文字雲、計數千分位 ************/
// 橫幅畫布：官方版型沒有它，載入時自己插在頁首 header 前面（下面的文字雲要畫在上面）
(() => {
  const column = document.querySelector('.main > .column');
  if (!column || document.getElementById('lokiBanner')) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'lokiBanner';
  canvas.width = 1920;
  canvas.height = 200;
  column.prepend(canvas);
})();

/************animate Header Background */
const
  list = [
    ['Angular', 15],
    ['TypeScript', 14],
    ['RxJS', 13],
    ['NgRx', 11],
    ['Signals', 11],
    ['Angular Material', 7],
    ['PrimeNG', 10],
    ['Dependency Injection', 5],
    ['Standalone', 6],
    ['Angular CLI', 9],
    ['Nx', 8],
    ['SCSS', 10],
    ['Zone.js', 6],
    ['Jasmine', 7],
    ['Karma', 6],
    ['Jest', 8],
    ['Vitest', 8],
    ['Playwright', 7],
    ['Cypress', 7],
    ['HTML', 13],
    ['CSS', 13],
    ['JavaScript', 14],
    ['Tailwind CSS', 10],
    ['Bootstrap', 10],
    ['jQuery', 10],
    ['PHP', 10],
    ['MySQL', 10],
    ['Flexbox', 10],
    ['Grid', 10],
    ['RWD', 10],
    ['React', 13],
    ['React Router', 8],
    ['Hooks', 9],
    ['JSX', 8],
    ['ES6', 11],
    ['DOM', 10],
    ['Promise', 9],
    ['async/await', 7],
    ['Fetch', 9],
    ['Leaflet', 8],
    ['ECharts', 9],
    ['Chart.js', 8],
    ['Day.js', 8],
    ['JSON', 9],
    ['REST API', 10],
    ['Firebase', 9],
    ['Vite', 10],
    ['Node.js', 11],
    ['pnpm', 8],
    ['npm', 9],
    ['nvs', 5],
    ['Git', 12],
    ['GitHub', 11],
    ['VS Code', 10],
    ['ESLint', 9],
    ['Prettier', 8],
    ['Mermaid', 6],
    ['Hexo', 7],
    ['Markdown', 7],
    ['Accessibility', 5],
    ['Semantic HTML', 5],
    ['LocalStorage', 5],
    ['Web API', 8],
    ['Debugging', 7],
    ['Clean Code', 7],
    ['Design Pattern', 5],
    ['SOLID', 6],
    ['Refactoring', 5],
    ['Code Review', 5],
    ['CI/CD', 6],
    ['Webpack', 7],
    ['Module', 7]
  ],
  lokiKeyword = WordCloud(document.getElementById('lokiBanner'), {
    list: list,
    minFontSize: 10,
    backgroundColor: '#777',
    color: function (word, weight) {
      const rand = Math.floor(Math.random() * 5);
      return weight > 10 ? ['#E9106111', '#E9106122', '#E9106133', '#E9106144', '#E9106155'][rand] :
        ['#0005', '#1115', '#2225', '#3335', '#4445', '#5555', '#6665'][rand];
    },
    rotateRatio: 0.5,
    rotationSteps: 2,
    gridSize: 20,
    weightFactor: 5,
    drawOutOfBound: false,
    shrinkToFit: true,
    wait: 50
  });


// 格式化 busuanzi 數值，加上千分位逗號分隔符
// --------------------------------------------------------------------------
function formatBusuanziNumber() {
  const uvElement = document.getElementById('busuanzi_value_site_uv');
  const pvElement = document.getElementById('busuanzi_value_site_pv');

  if (uvElement) {
    const originalValue = uvElement.textContent;
    if (originalValue && !isNaN(originalValue)) {
      const formattedValue = parseInt(originalValue).toLocaleString();
      uvElement.textContent = formattedValue;
    }
  }

  if (pvElement) {
    const originalValue = pvElement.textContent;
    if (originalValue && !isNaN(originalValue)) {
      const formattedValue = parseInt(originalValue).toLocaleString();
      pvElement.textContent = formattedValue;
    }
  }
}

// 等待 DOM 載入完成後執行格式化
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(formatBusuanziNumber, 1000);

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        formatBusuanziNumber();
      }
    });
  });

  const uvContainer = document.getElementById('busuanzi_container_site_uv');
  const pvContainer = document.getElementById('busuanzi_container_site_pv');

  if (uvContainer) {
    observer.observe(uvContainer, { childList: true, subtree: true });
  }

  if (pvContainer) {
    observer.observe(pvContainer, { childList: true, subtree: true });
  }
});

/************ 二、程式碼視窗檔名斷行（依賴 figure.highlight figcaption） ************/
// 程式碼視窗的檔名：在「/」後面允許斷行，窄螢幕上長路徑就會在資料夾邊界換行
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('figure.highlight figcaption span').forEach((span) => {
    span.innerHTML = span.innerHTML.replace(/\//g, '/<wbr>');
  });
});

/************ 三、回到頂端進度（依賴 .back-to-top） ************/
// 回到頂端按鈕：捲動時更新 --progress，sidebar.css 用它畫進度條
(() => {
  const update = () => {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    const max = document.body.scrollHeight - window.innerHeight;
    const percent = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    backToTop.style.setProperty('--progress', percent.toFixed(2) + '%');
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  document.addEventListener('DOMContentLoaded', update);
})();

/************ 四、文章資訊列的冒號換成「×」（依賴 .post-meta-container .post-meta-item-text） ************/
// 「閱讀次數：」「文章字數：」的冒號是模板把說明文字與全形冒號拼在一起，
// 同一個冒號字串也用在滑鼠提示，不能改語言檔，所以在這裡把結尾的冒號包成 span，
// 讓 post-header.css 的 .loki-meta-sep 上色。
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.post-meta-container .post-meta-item-text').forEach((el) => {
    el.innerHTML = el.innerHTML.replace(/[：:]\s*$/, '<span class="loki-meta-sep">×</span>');
  });
});
