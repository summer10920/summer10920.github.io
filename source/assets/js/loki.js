/************animate Header Background */
const
  list = [
    ['HTML', 12],
    ['CSS', 13],
    ['JavaScript', 15],
    ['TypeScript', 12],
    ['React', 14],
    ['Vue', 13],
    ['Angular', 10],
    ['Node.js', 13],
    ['Webpack', 11],
    ['Vite', 10],
    ['Babel', 9],
    ['ES6', 12],
    ['DOM', 11],
    ['AJAX', 8],
    ['Fetch', 9],
    ['REST API', 11],
    ['GraphQL', 7],
    ['JSON', 10],
    ['LocalStorage', 7],
    ['SessionStorage', 6],
    ['Cookies', 6],
    ['PWA', 8],
    ['Service Worker', 7],
    ['WebSocket', 7],
    ['WebRTC', 5],
    ['Canvas', 8],
    ['SVG', 9],
    ['WebGL', 6],
    ['Three.js', 5],
    ['Bootstrap', 11],
    ['Tailwind CSS', 12],
    ['Sass', 10],
    ['Less', 7],
    ['PostCSS', 8],
    ['Git', 13],
    ['GitHub', 12],
    ['npm', 12],
    ['yarn', 8],
    ['ESLint', 10],
    ['Prettier', 9],
    ['Jest', 10],
    ['Cypress', 8],
    ['Rollup', 6],
    ['Parcel', 5],
    ['Redux', 10],
    ['Vuex', 8],
    ['Pinia', 6],
    ['RxJS', 7],
    ['Lodash', 8],
    ['Moment.js', 6],
    ['Chart.js', 7],
    ['D3.js', 5],
    ['Express', 11],
    ['Koa', 7],
    ['Nest.js', 6],
    ['Next.js', 9],
    ['Nuxt.js', 7]
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
