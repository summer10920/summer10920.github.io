---
title: '[框架課程] React 19 教學（四）- Context 與 useReducer'
categories:
  - 職訓課程
  - ReactJS
tag:
  - JavaScript 程式設計（假日班）
date: 2025-10-19 13:09:14
hidden: false
---

![](assets/images/banner/react.png)

React 透過 State 管理元件的資料和渲染時機，透過 Props 由父元件向子元件傳遞資料。但當元件樹變得複雜時，Props 傳遞會變得繁瑣（Prop Drilling）。本章將學習 Context API 和 useReducer, 它們能幫助我們更優雅地管理跨元件的狀態共享和複雜的狀態邏輯。

<!-- more -->

{% note info %}
**本教學使用版本：**
- React 19+
- React Router 7.9.4+
- Vite 6.0+
- Node.js 20+ LTS
{% endnote %}

本章將延續前面章節的專案結構，逐步建立多個範例來深入理解 Context 和 useReducer 的使用場景。

# Context API：解決 Props 傳遞問題
在開始學習 Context 之前，讓我們先了解它要解決的問題。

**Prop Drilling（屬性鑽取）** 是指當你需要將資料從父元件傳遞到深層巢狀的子元件時，必須透過中間的每一層元件逐層傳遞 Props, 即使中間層元件並不需要使用這些資料。

{% mermaid graph TD %}
A["👤 UserProfile 元件<br/>管理 user 資料"]
B["📄 Layout 元件<br/>不使用 user"]
C["📋 Content 元件<br/>不使用 user"]
D["💬 UserInfo 元件<br/>需要 user"]

A -->|"props: user"| B
B -->|"props: user"| C
C -->|"props: user"| D
{% endmermaid %}

**問題點：**
- 中間層元件（Layout、Content）不需要 `user` 資料，卻必須傳遞它
- 如果 Props 結構改變，需要修改所有中間層元件
- 程式碼冗長且難以維護

## Context API 解決方案

**Context API** 允許父元件向其子樹中的任何元件提供資料，無論層級多深，都不需要透過 Props 逐層傳遞。

{% mermaid graph TD %}
A["👤 UserProfile 元件<br/>createContext + Provider"]
B["📄 Layout 元件<br/>不感知 Context"]
C["📋 Content 元件<br/>不感知 Context"]
D["💬 UserInfo 元件<br/>useContext 讀取 user"]

A -.->|"Context 直接傳遞"| D
A --> B
B --> C
C --> D
{% endmermaid %}

**優點：**
- 中間層元件不需要處理 Props
- 當資料結構變動時，僅需調整 Provider 端與需要讀取資料的元件即可
- 程式碼更簡潔、可維護性更高

### Context 語法說明

Context API 包含三個核心概念：**建立 Context**、**提供 Context** 和 **使用 Context**。

**第一步：宣告 Context**

使用 `createContext()` 建立一個 Context 物件。通常建議將這個 Context 物件集中存放在 `context` 資料夾的獨立檔案中（例如 `ThemeContext.jsx`），而不是直接寫在元件內，這樣可以讓多個元件引用同一份 Context，讓程式碼更清晰易維護：

```jsx context/ThemeContext.jsx
import { createContext } from 'react';

// 建立主題 Context
const ThemeContext = createContext();
```

{% note info %}
**小技巧：Context 可以提供預設值**
`createContext()` 函數可以接受一個參數作為「預設值」。這個預設值會在 Context 沒有被 Provider 包覆時生效，有助於元件在缺少外層 Provider 的情境下仍能正常運作（如測試或靜態展示元件時）。

```jsx context/ThemeContext.jsx
import { createContext } from 'react';

// 建立主題 Context，同時指定預設值
const ThemeContext = createContext({
  theme: 'light',           // 主題預設為 light
  setTheme: () => {}        // 預設提供一個空函式，避免使用時出錯
});

export { ThemeContext };
```

預設值主要用於「找不到 Provider」時才會觸發，一般應用盡量讓所有使用 Context 的元件都被 Provider 包覆。
{% endnote %}

**第二步：上層元件提供資料（Provider）**
Context 建立後，必須由上層元件透過 `Provider` 提供實際的資料值。這是因為應用程式的「狀態」與資料來源，通常會掌握在 App 或其他高層元件。只有上層才知道整個應用狀態需要如何傳遞給下層元件，並能確保所有需要該資料的元件都被包在 Provider 內，才能順利讀取 Context。如果在下層元件或個別元件才設 Provider，其他同層或上層元件就無法存取同一份資料，不利於集中管理與維護。

也就是說，「上層統一管理、下層方便取得」是 Context 的設計原則之一。

```jsx App.jsx
import { useState } from 'react';
import { ThemeContext } from './context/ThemeContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}
```

{% note info %}
**Provider 角色與使用說明：**
- `Provider` 是 Context API 中的「資料提供者」，負責將需要共享的狀態（state）透過 `value` 屬性傳遞給所有被其包覆的元件。
- 當 Provider 設在元件樹的頂層時，下層的所有元件（消費者，Consumer）都能直接取用這些共用資料或方法，無需一層層透過 props 傳遞。
- 這種共享機制能大幅簡化元件間的資料流動，使專案結構更清晰、維護更容易。
{% endnote %}

**第三步：任一子孫元件讀取資料**

只有在被高層 Provider 元件包覆的範圍內，所有子元件才會「共用同一份」Context 資料。這些子元件只要透過 `useContext()` 就能直接取得該 Context 的資料：

```jsx components/Header.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <header className={`header-${theme}`}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切換主題
      </button>
    </header>
  );
}
```

#### 初始值 vs Provider 的 value

Context 的值來源遵循以下優先順序：

1. **有 Provider 時**：使用 Provider 的 `value` 屬性（優先）
2. **沒有 Provider 時**：使用 `createContext()` 的初始值（備用）
3. **都沒有時**：得到 `undefined`

**完整範例說明**

```jsx example-context-value-priority.jsx
// 建立 Context，設定初始值為 'light'
const ThemeContext = createContext('light');

// 情況一：沒有 Provider → 使用初始值
function App1() {
  return <Header />;  // 沒有被 Provider 包裝
}

// 情況二：有 Provider → 使用 Provider 的 value（優先）
function App2() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />  {/* 讀取到 'dark'，不是初始值 'light' */}
    </ThemeContext.Provider>
  );
}

// 情況三：動態 Provider value
function App3() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Header />  {/* 讀取到動態值，會隨 state 變化 */}
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>內容</div>;
}

// 對比：初始值的作用
const ContextWithoutInit = createContext();        // 沒有初始值
const ContextWithInit = createContext('light');    // 有初始值

function Component() {
  const value1 = useContext(ContextWithoutInit);  // undefined
  const value2 = useContext(ContextWithInit);     // 'light'
  return <div>{value1} / {value2}</div>;  // undefined / light
}
```

{% note info %}
**重點整理：**
- **Provider 的 value 永遠優先**：即使設定了初始值，Provider 的 value 會覆蓋它
- **初始值是備用方案**：只有在沒有 Provider 時才會使用，可防止 undefined 錯誤
- **實際建議**：複雜的 Context 通常不設定初始值，強制要求必須有 Provider，這樣更安全且明確
{% endnote %}

#### 完整語法結構

```jsx context-syntax.jsx
// 1. 建立 Context
const MyContext = createContext();

// 2. 提供 Context
<MyContext.Provider value={contextValue}>
  <ChildComponent />
</MyContext.Provider>

// 3. 使用 Context
const contextValue = useContext(MyContext);
```

{% note info %}
**重要概念：**
- `createContext()` 建立 Context 物件
- `Provider` 元件提供資料給子元件樹
- `useContext()` Hook 在子元件中讀取 Context 值
- Context 值可以是任何 JavaScript 型別（字串、物件、函數等）
{% endnote %}

### 規劃專案結構
讓我們從一個簡單的主題切換範例開始，理解 Context 的基本用法。延續前面的課程，我們將在 `lesson03` 中建立 Context 相關的範例：

```
src/
├── pages/
│   ├── lesson01/          # 第一章：基礎元件
│   ├── lesson02/          # 第二章：Router 教學
│   └── lesson03/          # 🌟 第三章：Context 與 Reducer
│       ├── index.jsx      # Lesson03 主頁面
│       ├── index.css
│       ├── lessonContext.js  # 🌟 集中管理本章所有 Context
│       └── pages/
│           ├── ThemeExample/      # 主題切換範例
│           │   ├── index.jsx
│           │   └── index.css
│           ├── MenuExample/       # 巢狀選單範例
│           └── TodoExample/       # Todo List 範例
└── App.jsx
```

#### 更新路由配置

首先，更新 `App.jsx` 添加 Lesson03 的路由：
```jsx src/App.jsx
import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout';
import Lesson01 from './pages/lesson01';
import Lesson02 from './pages/lesson02';
import Lesson03 from './pages/lesson03'; // 🌟 新增

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/lesson01" replace />} />
        <Route path="lesson01" element={<Lesson01 />} />
        <Route path="lesson02/*" element={<Lesson02 />} />
        <Route path="lesson03/*" element={<Lesson03 />} /> {/* 🌟 新增 */}
      </Route>
    </Routes>
  );
}
```

#### 更新 Layout 側邊選單

在 `Layout.jsx` 中添加 Lesson03 的選單項目：
```jsx src/components/Layout.jsx
import { Outlet, NavLink } from 'react-router';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>🎓 React 學習系統</h2>
      <nav>
        <ul>
          <li>
              <NavLink to="/lesson01">
                📘 Lesson 01：基礎元件
              </NavLink>
          </li>
          <li>
              <NavLink to="/lesson02">
                📗 Lesson 02：Router 教學
              </NavLink>
          </li>
          <li>
              <NavLink to="/lesson03">
                📙 Lesson 03：Context & Reducer
              </NavLink>
          </li>
        </ul>
      </nav>
      </aside>

      <main className="content">
          <Outlet />
      </main>
    </div>
  );
}
```

#### 建立 Lesson03 主頁面

創建 Lesson03 的主頁面和內部路由：
```jsx src/pages/lesson03/index.jsx
import { Routes, Route, Navigate, Link, Outlet } from 'react-router';
import './index.css';

// 子頁面元件（稍後建立）
import ThemeExample from './pages/ThemeExample';
import MenuExample from './pages/MenuExample';
import TodoExample from './pages/TodoExample';

export default function Lesson03() {
  return (
    <div className="lesson03-container">
      {/* 內部導航列 */}
      <nav className="lesson03-nav">
        <h2>📚 Context & Reducer 範例</h2>
        <div className="nav-links">
          <Link to="theme" className="nav-link">🎨 主題切換</Link>
          <Link to="menu" className="nav-link">📑 巢狀選單</Link>
          <Link to="todo" className="nav-link">Todo List</Link>
        </div>
      </nav>

      {/* 子頁面渲染區域 */}
      <div className="lesson03-content">
        <Routes>
          <Route index element={<Navigate to="theme" replace />} />
          <Route path="theme" element={<ThemeExample />} />
          <Route path="menu" element={<MenuExample />} />
          <Route path="todo" element={<TodoExample />} />
        </Routes>
      </div>
    </div>
  );
}
```

```css src/pages/lesson03/index.css
.lesson03-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.lesson03-nav {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 1rem 0;
    color: #333;
  }
}

.nav-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-link {
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #e9ecef;
    border-color: #adb5bd;
    transform: translateY(-1px);
  }
}

.lesson03-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 500px;
}
```

## 範例：主題切換
本篇範例將用「主題切換」來說明 Context 的基本使用方式與實作步驟。

### 第一步：建立 Context

集中本章的 Context 到同一個檔案：
```js src/pages/lesson03/lessonContext.js
import { createContext } from 'react';

// Theme（主題）
export const themes = {
  light: {
    name: 'light',
    foreground: '#000000',
    background: '#eeeeee',
    buttonBg: '#ffffff',
    buttonBorder: '#cccccc',
  },
  dark: {
    name: 'dark',
    foreground: '#ffffff',
    background: '#222222',
    buttonBg: '#333333',
    buttonBorder: '#555555',
  },
};

export const ThemeContext = createContext(themes.light);

// FontSize（巢狀選單字級）
export const FontSizeContext = createContext(3);

// Todo（狀態與操作分離）
export const TodoStateContext = createContext(null);
export const TodoDispatchContext = createContext(null);
```

{% note info %}
**createContext 的預設值：**

```js
const ThemeContext = createContext(themes.light);
```

- 預設值只在元件**沒有被任何 Provider 包覆時**才會使用
- 通常用於測試或獨立使用元件時
- 在實際應用中，大多數情況下會被 Provider 的 `value` 覆蓋
{% endnote %}

### 第二步：使用 Provider 提供資料

創建主頁面元件，使用 `<ThemeContext.Provider>` 提供主題資料：
```jsx src/pages/lesson03/pages/ThemeExample/index.jsx
import { useState } from 'react';
import { ThemeContext, themes } from '../../lessonContext';
import ThemedButton from './ThemedButton';
import './index.css';

export default function ThemeExample() {
  // 管理當前主題狀態
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // 切換主題的函式
  const toggleTheme = () => {
    setCurrentTheme((prev) => 
      prev.name === 'light' ? themes.dark : themes.light
    );
  };

  return (
    <div className="theme-example">
      <h1>🎨 Context API：主題切換範例</h1>
      
      <div className="example-intro">
        <p>這個範例展示如何使用 Context API 在多層元件中共享主題資料，</p>
        <p>中間層元件（Toolbar）不需要處理 Props。</p>
      </div>

      {/* 切換主題按鈕 */}
      <div className="control-panel">
        <button onClick={toggleTheme} className="toggle-btn">
          切換到 {currentTheme.name === 'light' ? '深色' : '淺色'} 主題
        </button>
        <p className="current-theme">
          當前主題：<strong>{currentTheme.name === 'light' ? '淺色' : '深色'}</strong>
        </p>
      </div>

      {/* 🌟 使用 Provider 提供主題資料給子樹 */}
      <ThemeContext.Provider value={currentTheme}>
        <Toolbar />
      </ThemeContext.Provider>

      {/* 說明區域 */}
      <div className="explanation">
        <h3>💡 程式碼說明</h3>
        <ol>
          <li><code>ThemeContext.Provider</code> 包覆子元件樹</li>
          <li><code>value</code> 屬性提供當前主題資料</li>
          <li>子樹中的任何元件都可以透過 <code>useContext</code> 讀取主題</li>
          <li>中間層元件（Toolbar）不需要處理 Props</li>
        </ol>
      </div>
    </div>
  );
}

// 中間層元件：不需要處理 theme 相關的 Props
function Toolbar() {
  return (
    <div className="toolbar">
      <h3>🛠️ Toolbar 元件（中間層）</h3>
      <p className="note">這個元件不需要知道 theme 的存在</p>
      <ThemedButton />
        </div>
  );
}
```

### 第三步：使用 useContext 消費資料

創建一個會使用主題資料的按鈕元件：
```jsx src/pages/lesson03/pages/ThemeExample/ThemedButton.jsx
import { useContext } from 'react';
import { ThemeContext } from '../../lessonContext';

export default function ThemedButton() {
  // 🌟 使用 useContext 讀取 Context 資料
  const theme = useContext(ThemeContext);

  return (
    <div className="themed-button-container">
      <h4>🎨 ThemedButton 元件（存取者）</h4>
      <button
        style={{
          background: theme.buttonBg,
          color: theme.foreground,
          border: `2px solid ${theme.buttonBorder}`,
          padding: '12px 24px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'all 0.3s',
        }}
      >
        我是一個使用 {theme.name === 'light' ? '淺色' : '深色'} 主題的按鈕
      </button>
      <p className="code-hint">
        <code>const theme = useContext(ThemeContext)</code>
      </p>
      </div>
  );
}
```

### 樣式文件

```css src/pages/lesson03/pages/ThemeExample/index.css
.theme-example {
  padding: 1rem;
}

.example-intro {
  background: #f0f7ff;
  padding: 1rem 1.5rem;
  border-left: 4px solid #3b82f6;
  border-radius: 4px;
  margin: 1.5rem 0;
  color: #1e40af;

  p {
    margin: 0.5rem 0;
  }
}

.control-panel {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: center;
}

.toggle-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
}

.current-theme {
  margin-top: 1rem;
  font-size: 18px;
  color: #495057;

  strong {
    color: #3b82f6;
  }
}

.toolbar {
  background: #ffffff;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;

  h3 {
    margin-top: 0;
    color: #495057;
  }
}

.note {
  color: #6c757d;
  font-style: italic;
  margin: 0.5rem 0 1rem;
}

.themed-button-container {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px dashed #adb5bd;

  h4 {
    margin-top: 0;
    color: #495057;
  }
}

.code-hint {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #e9ecef;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  color: #495057;
}

.explanation {
  background: #fff8e1;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  margin-top: 2rem;

  h3 {
    margin-top: 0;
    color: #f57c00;
  }

  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
    color: #e65100;
  }

  li {
    margin: 0.5rem 0;
    line-height: 1.6;
  }

  code {
    background: #ffe082;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 14px;
    color: #e65100;
  }
}
```

### 測試運行

1. 訪問 `http://localhost:5173/lesson03/theme`
2. 點擊「切換主題」按鈕
3. 觀察按鈕樣式的變化
4. 注意 Toolbar 元件不需要處理任何 Props

## 範例：巢狀選單與動態更新

這個範例展示如何在遞迴元件中使用 Context, 以及如何動態更新 Context 值。

### 規劃需求

建立一個可展開/收合的巢狀選單，每一層的文字大小會遞減，展示：
- 如何在遞迴元件中使用 Context
- 如何在子元件中修改 Context 值（透過 Provider 的巢套）

### 使用集中 Context：FontSizeContext

本範例直接從集中檔案匯入 `FontSizeContext`：

```jsx src/pages/lesson03/pages/MenuExample/index.jsx
import { useState } from 'react';
import MenuItem from './MenuItem';
import { FontSizeContext } from '../../lessonContext';
import './index.css';
```

### 建立巢狀選單元件

```jsx src/pages/lesson03/pages/MenuExample/index.jsx
import { useState } from 'react';
import MenuItem from './MenuItem';
import { FontSizeContext } from '../../lessonContext';
import './index.css';

// 模擬巢狀選單資料
const menuData = [
  {
    name: 'Menu A',
    children: [
      { name: 'Menu A-1' },
      { name: 'Menu A-2' },
      {
        name: 'Menu A-3',
        children: [
          { name: 'Menu A-3-I' },
          { name: 'Menu A-3-II' },
          { name: 'Menu A-3-III' },
        ],
      },
    ],
  },
  {
    name: 'Menu B',
    children: [
      { name: 'Menu B-1' },
      {
        name: 'Menu B-2',
        children: [
          { name: 'Menu B-2-I' },
          { name: 'Menu B-2-II' },
        ],
      },
      { name: 'Menu B-3' },
    ],
  },
  {
    name: 'Menu C',
    children: [
      { name: 'Menu C-1' },
      { name: 'Menu C-2' },
    ],
  },
];

export default function MenuExample() {
  return (
    <div className="menu-example">
      <h1>📑 Context 進階：巢狀選單</h1>

      <div className="example-intro">
        <p>這個範例展示如何在遞迴元件中使用 Context，</p>
        <p>每一層的文字大小會自動遞減（3rem → 2rem → 1.33rem → ...）。</p>
      </div>

      {/* 🌟 提供初始字體大小 */}
      <FontSizeContext.Provider value={3}>
        <ul className="menu-list">
          {menuData.map((item) => (
            <MenuItem key={item.name} data={item} />
          ))}
        </ul>
      </FontSizeContext.Provider>

      <div className="explanation">
        <h3>💡 重點技巧</h3>
        <ul>
          <li>
            <strong>Context 巢套：</strong>
            子元件可以用新的 <code>Provider</code> 覆蓋父層的值
          </li>
          <li>
            <strong>遞迴元件：</strong>
            MenuItem 會渲染自己作為子元件（樹狀結構）
          </li>
          <li>
            <strong>動態計算：</strong>
            每一層讀取當前 Context 值，計算後提供新值給下一層
          </li>
        </ul>

        <h4>📐 字體大小計算：</h4>
        <div className="formula">
          <code>新字體大小 = 當前字體大小 ÷ 1.5</code>
      </div>
    </div>
  );
}
```

### 建立 MenuItem 元件

```jsx src/pages/lesson03/pages/MenuExample/MenuItem.jsx
import { useState, useContext } from 'react';
import { FontSizeContext } from '../../lessonContext';
import styles from './MenuItem.module.css';

export default function MenuItem({ data }) {
  // 控制子選單展開/收合
  const [isExpanded, setIsExpanded] = useState(true);
  
  // 🌟 讀取當前層級的字體大小
  const currentFontSize = useContext(FontSizeContext);
  
  // 是否有子選單
  const hasChildren = data.children && data.children.length > 0;

  return (
    <li>
      <div className={styles.menuItem}>
        {/* 顯示選單名稱，字體大小由 Context 決定 */}
        <span style={{ fontSize: `${currentFontSize}rem` }}>
          {data.name}
        </span>

        {/* 如果有子選單，顯示展開/收合按鈕 */}
        {hasChildren && (
          <button
            className={styles.toggleBtn}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? '收合' : '展開'}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>

      {/* 渲染子選單 */}
      {isExpanded && hasChildren && (
        // 🌟 為子選單提供新的字體大小（遞減 1.5 倍）
        <FontSizeContext.Provider value={currentFontSize / 1.5}>
          <ul className={styles.submenu}>
            {data.children.map((child) => (
              <MenuItem key={child.name} data={child} />
            ))}
          </ul>
        </FontSizeContext.Provider>
      )}
    </li>
  );
}
```

### CSS Module 樣式

```css src/pages/lesson03/pages/MenuExample/MenuItem.module.css
.menuItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #3b82f6;
  }
}

.toggleBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #dee2e6;
  background: white;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  color: #495057;
  transition: all 0.2s;
  margin-left: 1rem;

  &:hover {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  &:active {
    transform: scale(0.95);
  }
}

.submenu {
  margin-left: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid #e9ecef;
  list-style: none;
}
```

```css src/pages/lesson03/pages/MenuExample/index.css
.menu-example {
  padding: 1rem;
}

.example-intro {
  background: #f0f7ff;
  padding: 1rem 1.5rem;
  border-left: 4px solid #3b82f6;
  border-radius: 4px;
  margin: 1.5rem 0;
  color: #1e40af;

  p {
    margin: 0.5rem 0;
  }
}

.menu-list {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  list-style: none;
}

.explanation {
  background: #fff8e1;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  margin-top: 2rem;

  h3 {
    margin-top: 0;
    color: #f57c00;
  }

  ul {
    margin: 1rem 0;
    color: #e65100;
    line-height: 1.8;
  }

  li {
    margin: 0.75rem 0;
  }

  strong {
    color: #e65100;
  }

  code {
    background: #ffe082;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 14px;
    color: #e65100;
  }
}

.formula {
  background: #ffe082;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  margin-top: 0.5rem;

  code {
    background: transparent;
    font-size: 16px;
    font-weight: 600;
  }
}
```

{% note success %}
**Context 巢套的關鍵概念：**

```jsx example-nested-context.jsx
// 第一層：字體大小 3rem
<FontSizeContext.Provider value={3}>
  <MenuItem />  {/* 讀取到 3 */}
  
  {/* 第二層：字體大小 2rem (3 ÷ 1.5) */}
  <FontSizeContext.Provider value={2}>
    <MenuItem />  {/* 讀取到 2 */}
    
    {/* 第三層：字體大小 1.33rem (2 ÷ 1.5) */}
    <FontSizeContext.Provider value={1.33}>
      <MenuItem />  {/* 讀取到 1.33 */}
    </FontSizeContext.Provider>
  </FontSizeContext.Provider>
</FontSizeContext.Provider>
```

- 子層的 Provider 會**覆蓋**父層的值
- 每一層元件讀取到的是**最近的** Provider 提供的值
- 這種模式適合遞迴結構和動態層級的場景
{% endnote %}

## CSS Modules：避免樣式汙染
在上面的範例中，我們使用了 CSS Modules（`.module.css`）。這是一項重要技術，能讓 React 專案的樣式管理更加安全。在 React 專案中，若直接使用一般的 `.css` 文件，所有的樣式都會以**全域作用域**存在，這會導致樣式汙染問題。

```css MenuItem.css
.toggleBtn {
  padding: 10px;
  background: blue;
}
```

這個 `.toggleBtn` 樣式會影響**整個應用中所有**名為 `toggleBtn` 的元素，當多個元件使用相同 class 名稱時，就會互相干擾。

也就是說，不同元件若使用相同 class 名稱，樣式會互相干擾，整個應用中的所有同 class 名稱元素都會受到影響。CSS Modules 則能自動為每個 class 名稱加上唯一的 hash 值，做到**局部作用域**，讓每一個元件的樣式彼此隔離、不會互相影響，是 Vite 或 Webpack 預設支援的功能。

### CSS Modules 完整實作指南
**CSS Modules** 是 Vite/Webpack 內建的功能，透過自動為 class 名稱添加唯一的 hash 值，實現**局部作用域**，讓每個元件的樣式完全隔離。

**步驟 1：檔案命名**

將 `.css` 改名為 `.module.css`：

```
MenuItem.css       → MenuItem.module.css
todoList.css       → todoList.module.css
```

**步驟 2：匯入樣式物件**

```jsx MenuItem.jsx
// ❌ 普通 CSS（會全域汙染）
import './MenuItem.css';

// ✅ CSS Modules（局部作用域）
import styles from './MenuItem.module.css';
```

**步驟 3：在元件中使用**

```jsx MenuItem.jsx
export default function MenuItem() {
  return (
    <div className={styles.toggleBtn}>
      <button className={styles.button}>
        點我
      </button>
    </div>
  );
}
```

**步驟 4：撰寫 CSS 樣式**

```css MenuItem.module.css
.toggleBtn {
  padding: 10px;
  border: 1px solid #ccc;
}

.button {
  background: blue;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

/* 支援巢狀語法 */
.button:hover {
  background: darkblue;
}
```

#### 渲染機制解析

CSS Modules 會在編譯時自動為每個 class 添加唯一的 hash 值，確保樣式不會衝突：

**編譯前的 HTML（開發時）：**
```jsx
<div className={styles.toggleBtn}>
  <button className={styles.button}>點我</button>
</div>
```

**編譯後的 HTML（瀏覽器實際渲染）：**
```html
<div class="MenuItem_toggleBtn__a7f3k">
  <button class="MenuItem_button__x9m2p">點我</button>
</div>
```

**對應的 CSS（自動產生）：**
```css
/* 自動產生的唯一 class */
.MenuItem_toggleBtn__a7f3k {
  padding: 10px;
  border: 1px solid #ccc;
}

.MenuItem_button__x9m2p {
  background: blue;
  color: white;
  /* ... */
}

.MenuItem_button__x9m2p:hover {
  background: darkblue;
}
```

#### 最佳實踐與注意事項

**CSS Modules 使用建議**

- 儘量全程使用 class selector 來撰寫樣式，不要用元素選擇器或 ID 選擇器避免全域汙染。
- class 名稱可採小駝峰（camelCase）或連字符（kebab-case）命名。
- 善用現代原生巢狀語法，讓程式碼更清楚。

**推薦的 CSS Modules Selector 範例：**
```css
/* 使用 class selector（推薦） */
.btn { }
.card-header { }

/* 巢狀語法示範 */
.btn {
  &:hover { }
  &:active { }
}

.card {
  .title { }
  .content { }
}
```

**避免以下做法（避免樣式汙染）：**
```css
/* 全域元素與 ID selector 容易造成汙染 */
button { }
div { }
#myButton { }
```

**常見命名注意事項：**
- 請勿混用 class 與 element/id selector，範例（錯誤寫法）：
```css
/* 不建議這樣寫：會污染全域 */
.menuItem button { color: red; }
#mainTitle { font-size: 2rem; }
```

- class 命名清晰，貼合用途，例如：`.menuItem`、`.toggleBtn` 等，範例（正確寫法）：
```css
/* 完全使用 class selector */
.menuItemBtn { color: red; }
.mainTitle { font-size: 2rem; }
```

**CSS Modules 常見錯誤與解法說明**

1. **直接使用字串 className 無效**
   ```jsx
   // 錯誤寫法（不會套用 CSS Modules）
   <button className="toggleBtn">點我</button>
   // 正確寫法
   <button className={styles.toggleBtn}>點我</button>
   ```

2. **忘記 import CSS module**
   ```jsx
   // styles 未定義就直接呼叫會報錯
   <button className={styles.btn}>點我</button>

   // 記得先 import
   import styles from './MyComponent.module.css';
   <button className={styles.btn}>點我</button>
   ```

3. **class 名稱拼錯或沒定義**
   ```jsx
   // styles.nonExistent 為 undefined，不會生效
   <button className={styles.nonExistent}>點我</button>
   // 解法：確認 CSS 裡有對應的 class 命名
   ```

4. **組合多個 class（動態條件時）**
   ```jsx
   // 使用模板字串
   <div className={`${styles.card} ${styles.active}`}>
   // 也可以用 clsx 這類輔助套件（專門處理 className 合併的函式庫，可以根據條件方便適當組合多個 class 名稱，常用於 React 專案。）
   import clsx from 'clsx';
   <div className={clsx(styles.card, isActive && styles.active)}>
   ```

**重點總結：**
- 請全程用 class 局部化你的元件樣式。
- 不要用元素 selector 和 ID。
- 動態狀態請用物件的方式組合 class。
- 開發時，仔細檢查 class 與 CSS module 是否正確對應、import 是否遺漏。

### CSS Modules vs 其他樣式方案

| 方案                | 優點                     | 缺點                   | 適用場景               |
| ------------------- | ------------------------ | ---------------------- | ---------------------- |
| **CSS Modules**     | 自動局部作用域、零配置、支援偽類和媒體查詢 | 需要 `styles.` 前綴    | 中小型專案（推薦）     |
| **Inline Styles**   | 完全隔離、動態樣式方便   | 無法使用偽類、媒體查詢、效能較差 | 簡單動態樣式           |
| **CSS-in-JS**       | 完整 JS 能力、主題化強大、動態樣式靈活 | 學習成本高、包體積大、執行時開銷 | 大型應用、複雜主題系統 |
| **Tailwind CSS**    | 快速開發、一致性高、工具類豐富 | HTML 冗長、學習成本中、需要配置 | 快速原型、團隊協作     |
| **Scoped CSS(Vue)** | 自動局部作用域、語法簡潔 | Vue 專屬、無法跨框架使用 | Vue 專案               |

# useReducer：管理複雜狀態

當狀態邏輯變得複雜、需要根據不同動作類型（如新增、刪除、切換）來更新狀態時，使用 `useState` 會讓程式碼零散且難以維護。`useReducer` 提供類似 Redux 的「Reducer 模式」，將所有狀態變化集中在一個規則化的函式（reducer）中處理，讓程式邏輯更清楚、更容易追蹤每個動作如何影響狀態，也方便日後的擴充與除錯。

{% mermaid graph TD %}
    A["元件觸發事件"]
    B["dispatch(action)"]
    C["Reducer 函式"]
    D["返回新 state"]
    E["React 重新渲染"]
    
    A -->|"呼叫"| B
    B -->|"傳遞"| C
    C -->|"計算"| D
    D -->|"更新"| E
    E -.->|"顯示最新狀態"| A
    
    style A fill:#e3f2fd
    style C fill:#fff3e0
    style E fill:#e8f5e9
{% endmermaid %}

## useReducer 完整實作指南

### 核心概念：Reducer、Action、Dispatch

**useReducer** 由三個核心要素組成：

**1. Reducer（歸納函式）**：純函式，根據舊的 `state` 與收到的 `action` 計算並回傳新的 `state`。

```jsx reducer-pattern.jsx
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return newState; // 根據 action 返回新 state
    default:
      return state;    // 未知 action, 返回原 state
  }
}
```

**2. Action（動作）**：描述「要做什麼行為」的物件，最少要有 `type` 屬性，代表動作的分類，也能夠帶入其他資料（payload）。

```jsx action-pattern.jsx
// Action 通常包含 type 和 payload
{
  type: 'ADD_TODO',      // 必需：表示操作類型
  payload: {              // 可選：攜帶的資料
    text: '買牛奶',
    id: 123
  }
}

// 簡化寫法（直接把資料放在 action 根層級）
{
  type: 'ADD_TODO',
  text: '買牛奶',
  id: 123
}
```

**3. Dispatch（派發）**：透過 `dispatch(action)` 來呼叫 reducer，讓指定的 action 進行狀態更新。在元件內呼叫 `dispatch`，就能依據 action 執行狀態變更：

```jsx someoneComponent.jsx
dispatch({ type: 'ADD_TODO', text: '買牛奶' });
```

這會把 action 傳給 reducer 處理，reducer 回傳的新 state 會立即更新 React 畫面。

### Hook 語法與使用方式

**函式簽名：**
```jsx useReducer-syntax.jsx
const [state, dispatch] = useReducer(reducer, initialArg, init?);
```

**參數說明：**
- `reducer`：`(state, action) => newState` 的純函式（必填）
- `initialArg`：初始資料（必填），可為物件、陣列、數值等
- `init`：懶加載初始化函式（可選），簽名 `init(initialArg) => initialState`

**回傳值：**
- `state`：目前狀態值（讀取用）
- `dispatch`：派發 action 的函式（更新用）

**初始值規則：**
- 無提供 `init`：`initialState = initialArg`
- 有提供 `init`：`initialState = init(initialArg)`

**基本使用範例：**
```jsx example-todo-reducer.jsx
// 1) 定義 action types（選用，避免拼字錯誤）
const ADD = 'ADD_TODO';
const DELETE = 'DELETE_TODO';
const TOGGLE = 'TOGGLE_TODO';

// 2) 定義 reducer（純函式）
function todoReducer(state, action) {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        { id: state.length ? state[state.length - 1].id + 1 : 1, text: action.text, checked: false }
      ];
    case DELETE:
      return state.filter(item => item.id !== action.id);
    case TOGGLE:
      return state.map(item => item.id === action.id ? { ...item, checked: !item.checked } : item);
    default:
      return state;
  }
}

// 3) 在元件中使用 useReducer
const initialState = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true }
];

export default function TodoExample() {
  const [list, dispatch] = useReducer(todoReducer, initialState);

  const handleAdd = (text) => dispatch({ type: ADD, text });
  const handleDelete = (id) => dispatch({ type: DELETE, id });
  const handleToggle = (id) => dispatch({ type: TOGGLE, id });

  return (
    <div>{/* 渲染 UI，呼叫上述方法 */}</div>
  );
}
```

### 懶加載初始化（init）

`init` 是 `useReducer` 的第三個可選參數，用於將 `initialArg` 轉換成真正的初始狀態。它只在「第一次」建立 state 時呼叫一次，適合用於初始狀態需要昂貴計算、從外部來源推導（如 localStorage、URL 參數），或需要在 reset 時重用初始化邏輯的場景。

**初始值規則：**
- 沒有提供 `init`：初始狀態 = `initialArg`
- 有提供 `init`：初始狀態 = `init(initialArg)` 的回傳值

```jsx example-init-comparison.jsx
// 情況 A：沒有 init → 初始狀態就是 initialArg（數字 0）
const [stateA] = useReducer(reducer, 0);
// stateA 的初始值為 0

// 情況 B：有 init → 初始狀態來自 init(initialArg)
function init(count) {
  return { count }; // 把數字包成物件
}
const [stateB] = useReducer(reducer, 0, init);
// stateB 的初始值為 { count: 0 }
```

**使用範例：**
```jsx example-init-usage.jsx
function init(size) {
  // 只在首次建立 state 時執行
  return { items: Array.from({ length: size }, (_, i) => ({ id: i + 1 })) };
}

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      // 想要回到某個初始狀態時，可以主動重用 init
      return init(action.size);
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, 10000, init);
```

**重要注意事項：**
- `dispatch(action)` 只會執行 reducer，不會重新執行 `init`
- 只有當 reducer 回傳「新的物件/陣列」時，React 才會重新渲染使用到它的元件
- 如果在 reducer 內主動呼叫了 `init(...)`，那是你主動做初始化，不是 useReducer 自動重跑
- 初始狀態很輕量（常數或小物件）時，直接給 `initialArg` 更簡單，不需要使用 `init`

{% note warning %}
**常見誤解：為什麼看起來像是 init 又被執行？**

`dispatch` 不會觸發 `init`。如果你在 reducer 內部的某個分支（例如 `reset`）主動呼叫了 `init(...)` 來復用初始化邏輯，那是你「自己呼叫了 `init`」，不是 useReducer 幫你再次執行初始化。

```jsx example-init-timing.jsx
function init(n) {
  console.log('init run once');
  return { count: n };
}

function reducer(state, action) {
  console.log('reducer run');
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'reset':
      // 這裡是我們主動呼叫 init，而非 useReducer 自動重跑
      return init(action.to);
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, 0, init);
// 載入時只會看到一次 `init run once`；之後每次 dispatch 只會看到 `reducer run`
```
{% endnote %}

### useState vs useReducer

當狀態邏輯簡單時，`useState` 就足夠了；但當狀態更新邏輯複雜、有多種動作型態、多個子元件要共用或協同修改一組狀態時，`useReducer` 會是更好的選擇。它讓狀態變化集中管理，更容易追蹤每個動作如何影響狀態，也方便日後重構與除錯。

| 比較項目 | useState（單一值/簡單邏輯） | useReducer（多動作/複雜邏輯）       |
| ------------ | --------------------------- | ----------------------------------- |
| 狀態複雜度   | 低（單一值或少量欄位）      | 高（多欄位、多種操作）              |
| 更新方式     | 直接 setState               | dispatch(action) → reducer 決定更新 |
| 邏輯集中度   | 低（分散在多個 handler）    | 高（集中在 reducer）                |
| 可測試性     | 一般                        | 佳（純函式 reducer 易測）           |
| 向下傳遞     | 多個 setter 容易凌亂        | 傳 dispatch 簡潔，適合搭配 Context  |

**使用建議：**
- **使用 useReducer**：需要多種動作、集中更新邏輯、較好測試性，或要把更新方法往下傳（搭配 Context）
- **使用 useState**：只有簡單值或少量欄位、更新邏輯單純

**對照範例：**

```jsx example-counter-usestate.jsx
// 簡單計數器（useState）
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      點擊次數：{count}
    </button>
  );
}
```

```jsx example-counter-usereducer.jsx
// 計數器（useReducer：多動作 + 集中邏輯）
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'resetTo':
      return { count: action.to };
    default:
      return state;
  }
}

export default function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <p>次數：{state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'resetTo', to: 0 })}>重設</button>
    </div>
  );
}
```

**useReducer 的優勢：**
- 更新邏輯集中在 `reducer`，事件處理器極度精簡
- 相同輸入（state + action）得到相同輸出，便於單元測試
- 可與 Context 搭配，把 `dispatch` 下放至深層元件，消除 Props Drilling

## 範例：Todo List 實作

我們將透過一個完整的 Todo List 範例來學習 useReducer。這個範例會先使用 `useState` 實作基本功能，再逐步重構為 `useReducer`，讓你能清楚看到兩種方式的差異。

**功能需求：**
- 新增待辦事項
- 刪除待辦事項
- 切換完成狀態
- 元件拆分（關注點分離）

**專案結構：**

```
src/pages/lesson03/pages/TodoExample/
├── index.jsx              # Todo 主元件
├── index.css              # 主樣式
├── todoList.module.css    # CSS Modules
├── components/
│   ├── TaskAdd.jsx        # 新增待辦元件
│   └── TaskList.jsx       # 待辦列表元件
└── store/                 # 🌟 稍後會建立（useReducer 進階）
    ├── actions.js
    └── reducer.js
```

### 步驟 1：建立靜態 HTML/CSS

首先，我們先建立靜態版本，確認樣式正確。

```jsx src/pages/lesson03/pages/TodoExample/index.jsx
import styles from './todoList.module.css';

export default function TodoExample() {
  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 範例</h1>
      
      {/* 輸入區域 */}
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <input
          type="text"
          placeholder="輸入新的待辦事項。.."
        />
        <span className={styles.addBtn}>新增</span>
      </div>

      {/* 待辦列表 */}
      <ul className={styles.todoList}>
        <li>去健身房</li>
        <li className={styles.checked}>繳帳單</li>
        <li>見 George</li>
        <li>買雞蛋</li>
        <li>讀一本書</li>
      </ul>
    </div>
  );
}
```

```css src/pages/lesson03/pages/TodoExample/todoList.module.css
/* 列表容器 */
.todoList {
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
  max-width: 600px;

  /* 列表項目 */
  li {
    position: relative;
    padding: 16px 48px 16px 48px;
    background: #f9f9f9;
    font-size: 18px;
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid #e9ecef;
    transition: all 0.2s;

    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom: none;
    }

    &:nth-child(even) {
      background: #ffffff;
    }

    &:hover {
      background: #e9ecef;
    }

    /* 已完成的項目 */
    &.checked {
      background: #6c757d;
      color: #fff;
      text-decoration: line-through;

      &::before {
        content: '';
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 8px;
        height: 16px;
        border-color: #fff;
        border-style: solid;
        border-width: 0 3px 3px 0;
      }
    }
  }
}

/* 刪除按鈕 */
.close {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #dc3545;
    color: white;
  }
}

/* 輸入區域 */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;

  h2 {
    margin: 0 0 1rem 0;
    font-size: 28px;
  }

  input {
    width: calc(75% - 8px);
    padding: 12px;
    border: none;
    border-radius: 6px 0 0 6px;
    font-size: 16px;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    }
  }
}

/* 新增按鈕 */
.addBtn {
  display: inline-block;
  width: 25%;
  padding: 12px;
  background: #28a745;
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0 6px 6px 0;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    background: #218838;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}
```

### 步驟 2：資料陣列化

將靜態的 `<li>` 改為從資料陣列渲染：
```jsx src/pages/lesson03/pages/TodoExample/index.jsx
import styles from './todoList.module.css';

// 🌟 初始資料
const initData = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

export default function TodoExample() {
  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 範例</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <input type="text" placeholder="輸入新的待辦事項。.." />
        <span className={styles.addBtn}>新增</span>
      </div>

      {/* 🌟 從資料陣列渲染 */}
      <ul className={styles.todoList}>
        {initData.map((item) => (
          <li
            key={item.id}
            className={item.checked ? styles.checked : ''}
          >
            {item.text}
            <span className={styles.close}>×</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 步驟 3：添加 useState（CRUD 基礎）

現在使用 `useState` 來管理待辦列表，實現基本的 CRUD 功能。

#### Read（讀取）

```jsx
import { useState } from 'react';
import styles from './todoList.module.css';

const initData = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

export default function TodoExample() {
  // 🌟 使用 useState 管理待辦列表
  const [list, setList] = useState(initData);

  return (
    <div className="todo-example">
      <h1>Todo List：useState 版本</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <input type="text" placeholder="輸入新的待辦事項。.." />
        <span className={styles.addBtn}>新增</span>
      </div>

      <ul className={styles.todoList}>
        {list.map((item) => ( {/* 從 state 讀取 */}
          <li
            key={item.id}
            className={item.checked ? styles.checked : ''}
          >
            {item.text}
            <span className={styles.close}>×</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Create（新增）

```jsx
import { useState } from 'react';
import styles from './todoList.module.css';

const initData = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

export default function TodoExample() {
  const [list, setList] = useState(initData);
  const [text, setText] = useState(''); // 🌟 管理輸入框的文字

  // 🌟 新增待辦事項
  const handleAdd = (text) => {
    if (!text.trim()) return; // 防呆：空白不處理
    
    setList((prevList) => [
      ...prevList,
      {
        id: prevList[prevList.length - 1].id + 1, // 自動遞增 ID
        text: text,
        checked: false,
      },
    ]);
  };

  return (
    <div className="todo-example">
      <h1>Todo List：實作 Create</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <input
          type="text"
          placeholder="輸入新的待辦事項。.."
          value={text}
          onChange={(e) => setText(e.target.value)} // 🌟 同步輸入框
        />
        <span
          className={styles.addBtn}
          onClick={() => {
            handleAdd(text);
            setText(''); // 🌟 清空輸入框
          }}
        >
          新增
        </span>
      </div>

      <ul className={styles.todoList}>
        {list.map((item) => (
          <li
            key={item.id}
            className={item.checked ? styles.checked : ''}
          >
            {item.text}
            <span className={styles.close}>×</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Delete（刪除）

```jsx
export default function TodoExample() {
  const [list, setList] = useState(initData);
  const [text, setText] = useState('');

  const handleAdd = (text) => {
    if (!text.trim()) return;
    
    setList((prevList) => [
      ...prevList,
      {
        id: prevList[prevList.length - 1].id + 1,
        text: text,
        checked: false,
      },
    ]);
  };

  // 🌟 刪除待辦事項
  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <div className="todo-example">
      <h1>Todo List：實作 Delete</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <input
          type="text"
          placeholder="輸入新的待辦事項。.."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span
          className={styles.addBtn}
          onClick={() => {
            handleAdd(text);
            setText('');
          }}
        >
          新增
        </span>
      </div>

      <ul className={styles.todoList}>
        {list.map((item) => (
          <li
            key={item.id}
            className={item.checked ? styles.checked : ''}
          >
            {item.text}
            <span
              className={styles.close}
              onClick={() => handleDelete(item.id)} // 🌟 點擊刪除
            >
              ×
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Update（更新）

```jsx
export default function TodoExample() {
  const [list, setList] = useState(initData);
  const [text, setText] = useState('');

  const handleAdd = (text) => {
    if (!text.trim()) return;
    
    setList((prevList) => [
      ...prevList,
      {
        id: prevList[prevList.length - 1].id + 1,
        text: text,
        checked: false,
      },
    ]);
  };

  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // 🌟 切換完成狀態
  const handleToggle = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="todo-example">
      <h1>Todo List：實作 Update</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <input
          type="text"
          placeholder="輸入新的待辦事項。.."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span
          className={styles.addBtn}
          onClick={() => {
            handleAdd(text);
            setText('');
          }}
        >
          新增
        </span>
      </div>

      <ul className={styles.todoList}>
        {list.map((item) => (
          <li
            key={item.id}
            className={item.checked ? styles.checked : ''}
            onClick={() => handleToggle(item.id)} // 🌟 點擊切換
          >
            {item.text}
            <span
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation(); // 🌟 阻止事件冒泡
                handleDelete(item.id);
              }}
            >
              ×
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

{% note warning %}
**事件冒泡問題：**

```jsx
<li onClick={() => handleToggle(item.id)}>  {/* 父元素：切換 */}
  {item.text}
  <span onClick={() => handleDelete(item.id)}>  {/* 子元素：刪除 */}
    ×
  </span>
</li>
```

**問題：** 點擊 `×` 時，會同時觸發 `handleDelete` 和 `handleToggle`

**解決方案：** 在子元素的事件處理中呼叫 `e.stopPropagation()`

```jsx
<span
  onClick={(e) => {
    e.stopPropagation(); // 🌟 阻止事件向上冒泡
    handleDelete(item.id);
  }}
>
  ×
</span>
```
{% endnote %}

### 步驟 4：元件拆分

將元件拆分為更小的子元件，遵循單一職責原則。

**拆分策略：**
- `TodoExample`（主元件）：管理狀態和業務邏輯
- `TaskAdd`（新增元件）：負責輸入和新增
- `TaskList`（列表元件）：負責顯示待辦列表

#### TaskAdd 元件

```jsx src/pages/lesson03/pages/TodoExample/components/TaskAdd.jsx
import { useState } from 'react';
import styles from '../todoList.module.css';

export default function TaskAdd({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) {
      alert('請輸入待辦事項！');
      return;
    }
    
    onAdd(text); // 呼叫父元件傳來的函式
    setText('');  // 清空輸入框
  };

  return (
    <>
      <input
        type="text"
        placeholder="輸入新的待辦事項。.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(); // 支援 Enter 鍵
        }}
      />
      <span
        className={styles.addBtn}
        onClick={handleSubmit}
      >
        新增
      </span>
    </>
  );
}
```

#### TaskList 元件

```jsx src/pages/lesson03/pages/TodoExample/components/TaskList.jsx
import styles from '../todoList.module.css';

export default function TaskList({ items, onToggle, onDelete }) {
  return (
    <ul className={styles.todoList}>
      {items.length === 0 ? (
        <li style={{ textAlign: 'center', color: '#6c757d', cursor: 'default' }}>
          沒有待辦事項，新增一個吧！
        </li>
      ) : (
        items.map((item) => (
          <li
            key={item.id}
            className={item.checked ? styles.checked : ''}
            onClick={() => onToggle(item.id)}
          >
            {item.text}
            <span
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
            >
              ×
            </span>
          </li>
        ))
      )}
    </ul>
  );
}
```

#### 更新主元件

```jsx src/pages/lesson03/pages/TodoExample/index.jsx
import { useState } from 'react';
import styles from './todoList.module.css';
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';

const initData = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

export default function TodoExample() {
  const [list, setList] = useState(initData);

  // 新增
  const handleAdd = (text) => {
    setList((prevList) => [
      ...prevList,
      {
        id: prevList.length > 0 ? prevList[prevList.length - 1].id + 1 : 1,
        text: text,
        checked: false,
      },
    ]);
  };

  // 刪除
  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // 切換完成狀態
  const handleToggle = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="todo-example">
      <h1>Todo List：useState 版本（已拆分元件）</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <TaskAdd onAdd={handleAdd} />
      </div>

      <TaskList
        items={list}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

{% note success %}
**元件拆分的好處：**

1. **單一職責**：每個元件只負責一件事
2. **可重用性**：子元件可以在其他地方重用
3. **可測試性**：小元件更容易測試
4. **可維護性**：修改某個功能時，只需要修改對應的元件
5. **關注點分離**：
   - 主元件：管理狀態和業務邏輯
   - 子元件：負責 UI 渲染

**Props 資料流向：**
```
TodoExample（父元件）
   ├─ state: list
   ├─ handleAdd()
   ├─ handleDelete()
   └─ handleToggle()
         ↓ （透過 Props 傳遞）
TaskAdd & TaskList（子元件）
   └─ 呼叫 onAdd/onDelete/onToggle
```
{% endnote %}

## 範例：Todo List（改用 useReducer）

現在我們的 Todo List 使用 `useState` 已經可以正常運作了，但隨著功能增加，會遇到一些問題：

**問題點：**
1. **狀態更新邏輯分散**：`handleAdd`、`handleDelete`、`handleToggle` 分散在元件各處
2. **難以測試**：狀態更新邏輯混在元件中，無法單獨測試
3. **重複的邏輯**：多個地方可能需要類似的狀態更新邏輯
4. **難以擴充**：新增功能時需要修改元件，容易出錯

**useReducer 的優勢：**
- **集中管理**：所有狀態更新邏輯都在 reducer 中
- **易於測試**：reducer 是純函式，容易測試
- **可預測性**：相同的 state + action = 相同的結果
- **易於擴充**：新增功能只需添加 action 和對應的 case
- **更好的除錯**：可以記錄所有 action, 追蹤狀態變化

### 步驟 1：將 useState 轉換為 useReducer

讓我們一步步將 Todo List 從 `useState` 轉換為 `useReducer`。

**第一步：定義 Reducer 函式**

```jsx src/pages/lesson03/pages/TodoExample/index.jsx
import { useReducer } from 'react'; // 🌟 改用 useReducer
import styles from './todoList.module.css';
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';

// 🌟 定義初始狀態
const initialState = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

// 🌟 定義 Reducer 函式
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      return [
        ...state,
        {
          id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
          text: action.text,
          checked: false,
        },
      ];
    }
    case 'DELETE': {
      return state.filter((item) => item.id !== action.id);
    }
    case 'TOGGLE': {
      return state.map((item) =>
        item.id === action.id ? { ...item, checked: !item.checked } : item
      );
    }
    default: {
      throw new Error(`未知的 action type: ${action.type}`);
    }
  }
}

export default function TodoExample() {
  // 🌟 使用 useReducer 取代 useState
  const [list, dispatch] = useReducer(todoReducer, initialState);

  // 事件處理函式只需要呼叫 dispatch
  const handleAdd = (text) => {
    dispatch({ type: 'ADD', text });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE', id });
  };

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE', id });
  };

  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 版本</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <TaskAdd onAdd={handleAdd} />
      </div>

      <TaskList
        items={list}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

{% note info %}
**useState vs useReducer 對比：**

**useState 版本：**
```jsx example-todo-usestate.jsx
const [list, setList] = useState(initialState);

const handleAdd = (text) => {
  setList((prevList) => [
    ...prevList,
    {
      id: prevList.length > 0 ? prevList[prevList.length - 1].id + 1 : 1,
      text: text,
      checked: false,
    },
  ]);
};
```

**useReducer 版本：**
```jsx example-todo-usereducer.jsx
const [list, dispatch] = useReducer(todoReducer, initialState);

const handleAdd = (text) => {
  dispatch({ type: 'ADD', text });
};

// 邏輯移到 reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      return [
        ...state,
        {
          id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
          text: action.text,
          checked: false,
        },
      ];
    }
  }
}
```

**優勢：**
- 元件中的事件處理函式變得簡潔
- 狀態更新邏輯集中在 reducer 中
- reducer 是純函式，易於測試
{% endnote %}

### 步驟 2：重構 Action（Action Creator）

為了避免手動編寫 action 物件時出錯，我們可以建立 Action Creator 函式。

```js src/pages/lesson03/pages/TodoExample/store/actions.js
// Action Types（使用常數避免拼寫錯誤）
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

// Action Creators
export const addTodo = (text) => ({
  type: ADD_TODO,
  text,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});
```

**為什麼要使用 Action Creator？**

| 方式                  | 優點                       | 缺點                     |
| --------------------- | -------------------------- | ------------------------ |
| **手動建立 action**   | 簡單直觀                   | 容易拼寫錯誤、重複代碼多 |
| **Action Creator**    | 類型安全、可重用、易於重構 | 需要額外的函式           |
| **Action Types 常數** | 防止拼寫錯誤、支援自動完成 | 需要額外的常數定義       |

{% note success %}
**Action Creator 的好處：**

**❌ 手動建立 action（容易出錯）：**
```jsx example-action-manual.jsx
// 可能拼寫錯誤
dispatch({ type: 'ADD_TOD', text });  // 錯誤：TOD
dispatch({ type: 'ADD_TODO', txt: text });  // 錯誤：txt
```

**使用 Action Creator（類型安全）：**
```jsx example-action-creator.jsx
import { addTodo, ADD_TODO } from './store/actions';

// 在元件中
dispatch(addTodo(text));

// 在 reducer 中
case ADD_TODO: {  // IDE 會自動完成，不會拼錯
  return [...state, { id: state.length + 1, text: action.text, checked: false }];
}
```
{% endnote %}

### 步驟 3：重構 Reducer

將 Reducer 獨立成單獨的文件：
```js src/pages/lesson03/pages/TodoExample/store/reducer.js
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from './actions';

// 初始狀態
export const initialState = [
  { id: 1, text: '去健身房', checked: false },
  { id: 2, text: '繳帳單', checked: true },
  { id: 3, text: '見 George', checked: false },
  { id: 4, text: '買雞蛋', checked: false },
  { id: 5, text: '讀一本書', checked: false },
];

// Reducer 函式
export function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO: {
      return [
        ...state,
        {
          id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
          text: action.text,
          checked: false,
        },
      ];
    }
    case DELETE_TODO: {
      return state.filter((item) => item.id !== action.id);
    }
    case TOGGLE_TODO: {
      return state.map((item) =>
        item.id === action.id ? { ...item, checked: !item.checked } : item
      );
    }
    default: {
      throw new Error(`未知的 action type: ${action.type}`);
    }
  }
}
```

**更新主元件：**

```jsx src/pages/lesson03/pages/TodoExample/index.jsx
import { useReducer } from 'react';
import styles from './todoList.module.css';
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';

// 🌟 匯入 actions 和 reducer
import * as actions from './store/actions';
import { todoReducer, initialState } from './store/reducer';

export default function TodoExample() {
  const [list, dispatch] = useReducer(todoReducer, initialState);

  // 🌟 使用 Action Creator
  const handleAdd = (text) => dispatch(actions.addTodo(text));
  const handleDelete = (id) => dispatch(actions.deleteTodo(id));
  const handleToggle = (id) => dispatch(actions.toggleTodo(id));

  return (
    <div className="todo-example">
      <h1>Todo List：useReducer 重構版</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        <TaskAdd onAdd={handleAdd} />
      </div>

      <TaskList
        items={list}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      {/* 🌟 顯示統計資訊 */}
      <div className="todo-stats">
        <p>總共：{list.length} 項</p>
        <p>已完成：{list.filter((item) => item.checked).length} 項</p>
        <p>未完成：{list.filter((item) => !item.checked).length} 項</p>
      </div>
    </div>
  );
}
```

{% note success %}
**專案結構（重構後）：**

```
src/pages/lesson03/pages/TodoExample/
├── index.jsx              # 主元件（使用 useReducer）
├── index.css              # 主樣式
├── todoList.module.css    # CSS Modules
├── components/
│   ├── TaskAdd.jsx        # 新增元件
│   └── TaskList.jsx       # 列表元件
└── store/                 # 🌟 狀態管理
    ├── actions.js         # Action Types & Creators
    └── reducer.js         # Reducer & Initial State
```

**優勢：**
- **關注點分離**：UI、邏輯、狀態管理分離
- **可測試性**：reducer 和 action 可以單獨測試
- **可維護性**：新增功能只需修改 actions 和 reducer
- **類型安全**：使用常數避免拼寫錯誤
{% endnote %}

# Context + useReducer：終極解決方案

將 Context 和 useReducer 結合，可建立更強大的狀態管理方案。即使使用了 `useReducer`，若仍透過 Props 傳遞 `dispatch` 和 `state`，會遇到 Props Drilling 問題：主元件需要管理所有 handler 函式，每個子元件都需要透過 Props 接收函式，當元件層級更深時，Props 傳遞會更複雜。

**解決方案是將 `state` 和 `dispatch` 放入 Context**，讓任何深層子元件都可以直接存取，完全消除 Props Drilling。

{% mermaid graph TD %}
    A["TodoContext Provider<br/>（提供 state + dispatch)"]
    B["TodoExample 主元件<br/>（只負責渲染 UI)"]
    C["TaskAdd 元件<br/>(useContext 取得 dispatch)"]
    D["TaskList 元件<br/>(useContext 取得 state + dispatch)"]
    
    A -.->|"Context 直接傳遞"| C
    A -.->|"Context 直接傳遞"| D
    A --> B
    B --> C
    B --> D
    
    style A fill:#e3f2fd
    style B fill:#f5f5f5
    style C fill:#e8f5e9
    style D fill:#e8f5e9
{% endmermaid %}


## 建立 Context 與 Provider

首先，我們需要建立兩個分離的 Context：一個用於 state，一個用於 dispatch。這樣做可以優化性能，讓只讀取 `state` 的元件不會因為 `dispatch` 改變而重新渲染，只使用 `dispatch` 的元件也不會因為 `state` 改變而重新渲染。

**為什麼要分兩個 Context？**

```jsx
// ❌ 方案 A：單一 Context（不推薦）
const TodoContext = createContext(null);
<TodoContext.Provider value={{ state, handlers }}>

// ✅ 方案 B：分離 Context（推薦）
const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);
```

**分離的好處：**
- **性能優化**：只訂閱需要的資料，避免不必要的重新渲染
- **語意清晰**：明確區分「資料」和「操作」
- **更好的 TypeScript 支援**：類型推斷更精確

**完整實作：**

```jsx src/pages/lesson03/pages/TodoExample/context/TodoContext.jsx
import { createContext, useContext, useReducer } from 'react';
import { todoReducer, initialState } from '../store/reducer';
import * as actions from '../store/actions';

// 建立兩個分離的 Context
const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

// Provider 元件
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 封裝 dispatch 函式（提供更友善的 API）
  const handlers = {
    addTodo: (text) => dispatch(actions.addTodo(text)),
    deleteTodo: (id) => dispatch(actions.deleteTodo(id)),
    toggleTodo: (id) => dispatch(actions.toggleTodo(id)),
  };

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={handlers}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 自訂 Hook：讀取 state
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (context === null) {
    throw new Error('useTodoState 必須在 TodoProvider 內使用');
  }
  return context;
}

// 自訂 Hook：讀取 dispatch handlers
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (context === null) {
    throw new Error('useTodoDispatch 必須在 TodoProvider 內使用');
  }
  return context;
}
```

## 更新元件使用 Context

建立好 Context 和 Provider 後，我們需要更新主元件和子元件來使用 Context。主元件只需要用 `TodoProvider` 包覆，子元件則透過自訂 Hook 直接從 Context 讀取資料和操作函式，完全不需要透過 Props 傳遞。

**主元件：**

```jsx src/pages/lesson03/pages/TodoExample/index.jsx
import styles from './todoList.module.css';
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';
import { TodoProvider, useTodoState } from './context/TodoContext';

// 統計資訊元件（展示如何使用 Context）
function TodoStats() {
  const todos = useTodoState(); // 直接從 Context 讀取

  return (
    <div className="todo-stats">
      <p>總共：{todos.length} 項</p>
      <p>已完成：{todos.filter((item) => item.checked).length} 項</p>
      <p>未完成：{todos.filter((item) => !item.checked).length} 項</p>
    </div>
  );
}

// 主元件內容
function TodoContent() {
  return (
    <div className="todo-example">
      <h1>Todo List：Context + useReducer</h1>
      
      <div className={styles.header}>
        <h2>我的待辦清單</h2>
        {/* 不再需要傳遞 Props */}
        <TaskAdd />
      </div>

      {/* 不再需要傳遞 Props */}
      <TaskList />
      
      {/* 新增統計元件 */}
      <TodoStats />
    </div>
  );
}

// 匯出元件：用 Provider 包覆
export default function TodoExample() {
  return (
    <TodoProvider>
      <TodoContent />
    </TodoProvider>
  );
}
```

**子元件：TaskAdd**

```jsx src/pages/lesson03/pages/TodoExample/components/TaskAdd.jsx
import { useState } from 'react';
import styles from '../todoList.module.css';
import { useTodoDispatch } from '../context/TodoContext';

export default function TaskAdd() {
  const [text, setText] = useState('');
  const { addTodo } = useTodoDispatch(); // 從 Context 取得 addTodo

  const handleSubmit = () => {
    if (!text.trim()) {
      alert('請輸入待辦事項！');
      return;
    }
    
    addTodo(text); // 直接呼叫
    setText('');
  };

  return (
    <>
      <input
        type="text"
        placeholder="輸入新的待辦事項。.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(); // 支援 Enter 鍵
        }}
      />
      <span
        className={styles.addBtn}
        onClick={handleSubmit}
      >
        新增
      </span>
    </>
  );
}
```

**子元件：TaskList**

```jsx src/pages/lesson03/pages/TodoExample/components/TaskList.jsx
import styles from '../todoList.module.css';
import { useTodoState, useTodoDispatch } from '../context/TodoContext';

export default function TaskList() {
  const todos = useTodoState(); // 從 Context 取得 state
  const { toggleTodo, deleteTodo } = useTodoDispatch(); // 從 Context 取得 dispatch

  return (
    <ul className={styles.todoList}>
      {todos.length === 0 ? (
        <li style={{ textAlign: 'center', color: '#6c757d', cursor: 'default' }}>
          沒有待辦事項，新增一個吧！
        </li>
      ) : (
        todos.map((item) => (
          <li
            key={item.id}
            className={item.checked ? styles.checked : ''}
            onClick={() => toggleTodo(item.id)} // 直接呼叫
          >
            {item.text}
            <span
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(item.id); // 直接呼叫
              }}
            >
              ×
            </span>
          </li>
        ))
      )}
    </ul>
  );
}
```

## Context + useReducer 的優勢

**Before（Props Drilling）：**
```jsx
<TodoExample>  {/* 管理所有 state 和 handlers */}
  <TaskAdd onAdd={handleAdd} />
  <TaskList items={list} onToggle={handleToggle} onDelete={handleDelete} />
  <TodoStats items={list} />
</TodoExample>
```

**After（Context）：**
```jsx
<TodoProvider>  {/* 只在最外層提供 Context */}
  <TodoExample>
    <TaskAdd />         {/* 不需要 Props */}
    <TaskList />        {/* 不需要 Props */}
    <TodoStats />       {/* 不需要 Props */}
  </TodoExample>
</TodoProvider>
```

**主要優勢：**
- **消除 Props Drilling**：子元件直接從 Context 讀取，不需要透過 Props 層層傳遞
- **關注點分離**：主元件不需要管理所有 handlers，只需負責 UI 渲染
- **易於擴展**：新增元件時不需要修改父元件，直接使用 Context 即可
- **更好的封裝**：Context 內部實作可以隨時改變，不影響使用它的元件
- **提升可測試性**：可以輕鬆 mock Context Provider 進行單元測試
- **性能優化**：分離 state 和 dispatch Context，避免不必要的重新渲染

# 總結

## 本章學習重點

本章學習了四個核心技術，它們可以獨立使用，也可以組合使用來建立更強大的狀態管理方案：

**Context API**：解決 Prop Drilling 問題，透過 `createContext` → `Provider` → `useContext` 三步驟實現跨元件資料共享。適用於主題、語言、使用者資訊等跨元件共享的資料。注意 Context 巢套時，子層 Provider 會覆蓋父層值。

**CSS Modules**：避免全域樣式汙染，透過 `.module.css` 檔案命名和 `import styles from './MyComponent.module.css'` 使用方式，自動產生唯一 class hash 值，實現局部作用域。

**useReducer**：管理複雜狀態的更好選擇，由 `reducer` + `initialState` → `[state, dispatch]` 組成。Reducer 是純函式 `(state, action) => newState`，搭配 Action Creator 可避免手動建立 action 時出錯。適用於多個相關狀態、複雜的狀態更新邏輯。

**Context + useReducer**：結合兩者優勢，實現跨元件狀態與集中管理。透過分離 StateContext 和 DispatchContext 可優化性能，使用自訂 Hook 提供更友善的 API，完全消除 Props Drilling，大幅提升可維護性。

## 最佳實踐與選擇指南

### Context 使用時機與性能優化

**適合使用 Context 的場景：**
- 跨多層元件的共享資料（主題、語言、使用者資訊）
- 避免 Prop Drilling（Props 需要傳遞超過 3 層）
- 全域設定（API 端點、功能開關）

**不適合使用 Context 的場景：**
- 頻繁變動的資料（會導致大量重新渲染）
- 元件間的直接通信（考慮使用狀態提升或自訂事件）
- 簡單的 Props 傳遞（1-2 層，直接用 Props 即可）

**性能優化技巧：**
```jsx
// ❌ 錯誤：每次渲染都建立新物件
<Context.Provider value={{ user, theme }}>

// ✅ 正確：使用 useMemo 避免不必要的重新渲染
const value = useMemo(() => ({ user, theme }), [user, theme]);
<Context.Provider value={value}>
```

### useState vs useReducer 選擇指南

| 場景                    | 使用 useState | 使用 useReducer |
| ----------------------- | ------------- | --------------- |
| 簡單狀態（單一值）      | ✅             | ❌               |
| 複雜狀態（多個相關值）  | ❌             | ✅               |
| 狀態更新邏輯簡單        | ✅             | ❌               |
| 狀態更新邏輯複雜        | ❌             | ✅               |
| 需要測試狀態邏輯        | ❌             | ✅               |
| 狀態依賴前一個狀態      | △             | ✅               |
| 需要向下傳遞多個 setter | ❌             | ✅               |

### 專案結構與錯誤處理

**建議的專案結構：**
```
src/
├── contexts/              # 全域 Context
│   ├── AuthContext.jsx    # 使用者認證
│   ├── ThemeContext.jsx   # 主題管理
│   └── AppProviders.jsx   # 整合所有 Provider
├── pages/
│   └── TodoPage/
│       ├── index.jsx          # 頁面主元件
│       ├── context/            # 頁面專屬 Context
│       │   └── TodoContext.jsx
│       ├── store/              # Reducer 相關
│       │   ├── actions.js
│       │   └── reducer.js
│       ├── components/         # 子元件
│       └── styles.module.css
```

**錯誤處理：在自訂 Hook 中檢查 Context 是否存在**
```jsx
export function useTodoState() {
  const context = useContext(TodoStateContext);
  
  if (context === null) {
    throw new Error(
      'useTodoState 必須在 TodoProvider 內使用。' +
      '請確保元件被 <TodoProvider> 包覆。'
    );
  }
  
  return context;
}
```

## React 19 相關更新

React 19 對 Context 和 Reducer 帶來了一些改進：

**React Compiler（實驗性）**：自動優化 Context 的重新渲染，不需要手動使用 `useMemo`/`useCallback`。

**更好的 DevTools 支援**：Context 的資料流更清晰，Reducer Action 可以在 Timeline 中追蹤。

**Server Components（伺服器元件）**：Context 在 Server Components 中有使用限制，建議將 Context 用於 Client Components。

**Actions（表單處理）**：可以結合 `useActionState` 處理表單提交，與 `useReducer` 類似，但專為表單設計。

## 下一步學習方向

完成本章後，建議繼續學習以下主題：

**第三方狀態管理**：當專案規模擴大時，可以考慮使用 Zustand（輕量、簡單，推薦初學者）、Redux Toolkit（企業級、生態系完整）或 Jotai（原子化狀態管理）等第三方狀態管理方案。

**資料獲取與快取**：學習 TanStack Query（React Query）進行伺服器狀態管理，或使用 SWR 作為輕量的資料獲取 Hook，並與 `useReducer` 整合處理載入狀態。

**進階模式**：深入學習 Context 性能優化技巧、Reducer 的副作用處理（搭配 `useEffect`），以及使用 Immer 簡化不可變更新。

**全端框架**：探索 Next.js 15 的 Server Components + Actions，或 Remix 的 Loader + Action 模式，了解如何在全端框架中使用 Context 和 Reducer。

# 參考文獻

- [React 官方文件 - useContext](https://react.dev/reference/react/useContext)
- [React 官方文件 - useReducer](https://react.dev/reference/react/useReducer)
- [React 官方部落格 - React 19 Beta](https://react.dev/blog/2024/04/25/react-19)
- [When to use useReducer vs useState](https://beta.react.dev/learn/extracting-state-logic-into-a-reducer)
- [CSS Modules 官方文件](https://github.com/css-modules/css-modules)
