---
title: '[基礎課程] React 19 - 官方推薦 Hooks 完整指南'
categories:
  - 職訓教材
  - ReactJS
tag:
  - React
  - Hooks
  - React 19
  - 前端開發
date: 2025-09-26 13:16:22
hidden: true
---

![](assets/images/banner/react.png)

React 19 帶來了許多改進和新功能，特別是在 Hooks 的使用上更加完善。本文將詳細介紹 React 官方推薦的所有 Hooks，包括基礎 Hooks、效能優化 Hooks，以及 React 19 新增的 useActionState 和 useOptimistic，讓您能夠更好地掌握現代 React 開發技巧。

<!-- more -->

# React Hooks 概觀

React Hooks 是 React 16.8 引入的功能，讓我們能在函數元件中使用 state 和其他 React 功能。React 19 進一步優化了現有 Hooks，並新增了兩個實用的 Hooks。以下是官方推薦的所有 Hooks 分類：

{% mermaid graph LR %}
    %% 節點定義
    A["React 19 官方 Hooks"]
    B["基礎 Hooks"]
    C["效能優化 Hooks"]
    D["進階 Hooks"]
    E["React 19 新增"]
    F["特殊用途 Hooks"]
    
    %% 關聯線
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    
    B --> B1["useState"]
    B --> B2["useEffect"]
    B --> B3["useContext"]
    B --> B4["useRef"]
    
    C --> C1["useCallback"]
    C --> C2["useMemo"]
    C --> C3["useDeferredValue"]
    C --> C4["useTransition"]
    
    D --> D1["useReducer"]
    D --> D2["useImperativeHandle"]
    D --> D3["useSyncExternalStore"]
    
    E --> E1["useActionState"]
    E --> E2["useOptimistic"]
    
    F --> F1["useId"]
    F --> F2["useDebugValue"]
    F --> F3["useInsertionEffect"]
    F --> F4["useLayoutEffect"]

    %% 配色設定
    style B fill:#E3F6FF,stroke:#1890FF,stroke-width:2px
    style B1 fill:#E3F6FF,stroke:#1890FF
    style B2 fill:#E3F6FF,stroke:#1890FF
    style B3 fill:#E3F6FF,stroke:#1890FF
    style B4 fill:#E3F6FF,stroke:#1890FF

    style C fill:#FFF7E3,stroke:#FFB300,stroke-width:2px
    style C1 fill:#FFF7E3,stroke:#FFB300
    style C2 fill:#FFF7E3,stroke:#FFB300
    style C3 fill:#FFF7E3,stroke:#FFB300
    style C4 fill:#FFF7E3,stroke:#FFB300

    style D fill:#F3E8FF,stroke:#9C27B0,stroke-width:2px
    style D1 fill:#F3E8FF,stroke:#9C27B0
    style D2 fill:#F3E8FF,stroke:#9C27B0
    style D3 fill:#F3E8FF,stroke:#9C27B0

    style E fill:#E8F5E9,stroke:#43A047,stroke-width:2px
    style E1 fill:#E8F5E9,stroke:#43A047
    style E2 fill:#E8F5E9,stroke:#43A047

    style F fill:#FFF0F0,stroke:#F44336,stroke-width:2px
    style F1 fill:#FFF0F0,stroke:#F44336
    style F2 fill:#FFF0F0,stroke:#F44336
    style F3 fill:#FFF0F0,stroke:#F44336
    style F4 fill:#FFF0F0,stroke:#F44336

    style A fill:#F5F5F5,stroke:#607D8B,stroke-width:2.5px
{% endmermaid %}

# 基礎 Hooks

這些是最常用的 Hooks，幾乎每個 React 應用程式都會使用到。

## useState

`useState` 是最基本的 Hook，用於在函數元件中管理 state。它讓 React 能夠追蹤狀態變化並觸發重新渲染。

{% note info %}
**為什麼需要 useState？**

在 React 中，只有當 state 或 props 發生變化時，元件才會重新渲染。如果我們直接修改變數而不使用 `useState`，React 無法得知資料已經改變，因此不會觸發重新渲染。`useState` 提供了：

1. **狀態追蹤**：React 能夠監控狀態變化
2. **重新渲染觸發**：當狀態更新時自動重新渲染元件
3. **狀態持久化**：在元件重新渲染之間保持狀態值
{% endnote %}

```javascript useState 基本語法
import React, { useState } from 'react';

function Counter() {
  // 宣告一個名為 "count" 的 state 變數，初始值為 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>你點擊了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        點擊我
      </button>
    </div>
  );
}
```

{% note info %}
**語法說明：**
- `useState(initialValue)` 回傳一個陣列，包含當前的 state 值和更新函數
- 使用陣列解構來取得 state 和 setter 函數
- state 更新是非同步的，會觸發元件重新渲染
{% endnote %}

### 重新渲染機制詳解

React 的重新渲染機制是基於狀態變化的偵測。讓我們透過對比例子來理解：

```javascript 錯誤做法 - 不會觸發重新渲染
function BadCounter() {
  let count = 0; // 普通變數，React 無法追蹤
  
  const handleClick = () => {
    count = count + 1; // 直接修改變數
    console.log(count); // 雖然值改變了，但畫面不會更新
  };
  
  return (
    <div>
      <p>計數：{count}</p> {/* 永遠顯示 0 */}
      <button onClick={handleClick}>點擊</button>
    </div>
  );
}
```

```javascript 正確做法 - 會觸發重新渲染
function GoodCounter() {
  const [count, setCount] = useState(0); // 使用 useState
  
  const handleClick = () => {
    setCount(count + 1); // 使用 setter 函數
    // React 偵測到狀態變化，自動重新渲染元件
  };
  
  return (
    <div>
      <p>計數：{count}</p> {/* 會正確顯示更新後的值 */}
      <button onClick={handleClick}>點擊</button>
    </div>
  );
}
```

{% note warning %}
**重要概念：**

1. **React 無法偵測直接變數修改**：`let count = 0; count = count + 1;` 不會觸發重新渲染
2. **必須使用 setter 函數**：`setCount(newValue)` 才會通知 React 狀態已改變
3. **重新渲染是批次處理**：多個狀態更新會合併成一次重新渲染
4. **狀態更新是非同步的**：`setCount` 不會立即更新 `count` 的值
{% endnote %}

### 實際範例：重新渲染流程

讓我們透過一個完整的範例來理解 React 的重新渲染流程：

```javascript 重新渲染流程範例
import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  // 新增待辦事項
  const addTodo = () => {
    if (inputValue.trim()) {
      // 1. 更新狀態
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      
      // 2. 清空輸入框
      setInputValue('');
      
      // 3. React 偵測到狀態變化，觸發重新渲染
      // 4. 元件重新執行，顯示最新的 todos 陣列
    }
  };
  
  // 切換完成狀態
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
    // React 再次偵測到狀態變化，觸發重新渲染
  };
  
  return (
    <div>
      <h2>待辦事項清單</h2>
      <div>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="輸入待辦事項..."
        />
        <button onClick={addTodo}>新增</button>
      </div>
      
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

{% note success %}
**重新渲染流程總結：**

1. **使用者操作**：點擊按鈕、輸入文字等
2. **事件處理**：執行對應的事件處理函數
3. **狀態更新**：呼叫 `setState` 函數更新狀態
4. **React 偵測**：React 偵測到狀態變化
5. **重新渲染**：React 重新執行元件函數
6. **畫面更新**：使用最新的狀態值渲染新的 UI
{% endnote %}

```javascript useState 進階範例
import React, { useState } from 'react';

function UserProfile() {
  // 物件 state
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  // 處理表單輸入
  const handleInputChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,  // 展開之前的 state
      [field]: value // 只更新特定欄位
    }));
  };
  
  return (
    <form>
      <input 
        type="text" 
        placeholder="姓名"
        value={user.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <input 
        type="email" 
        placeholder="電子郵件"
        value={user.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <input 
        type="number" 
        placeholder="年齡"
        value={user.age}
        onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
      />
    </form>
  );
}
```

{% note warning %}
**注意事項：**
- 更新物件或陣列時，必須創建新的參考，不能直接修改原始物件
- 使用函數式更新 `setState(prevState => newState)` 來避免 stale closure 問題
- 初始值只在元件第一次渲染時使用
{% endnote %}

### useState 深入機制

理解 `useState` 的底層運作機制對於避免常見錯誤非常重要。

#### State 的不可變性

React 中的 state 必須是**不可變的**，這意味著你不能直接修改現有的 state 物件或陣列。

```javascript State 不可變性範例
import React, { useState } from 'react';

function ImmutabilityDemo() {
  const [user, setUser] = useState({
    name: '張三',
    hobbies: ['讀書', '游泳'],
    profile: {
      age: 25,
      city: '台北'
    }
  });

  // ❌ 錯誤：直接修改 state
  const handleWrongUpdate = () => {
    user.name = '李四';  // 直接修改，React 不會重新渲染
    user.hobbies.push('跑步');  // 直接修改陣列
    user.profile.age = 26;  // 直接修改巢狀物件
    setUser(user);  // 傳入相同參考，React 認為沒有變化
  };

  // ✅ 正確：創建新物件
  const handleCorrectUpdate = () => {
    setUser({
      ...user,  // 展開運算子創建新物件
      name: '李四',
      hobbies: [...user.hobbies, '跑步'],  // 創建新陣列
      profile: {
        ...user.profile,  // 展開巢狀物件
        age: 26
      }
    });
  };

  // ✅ 更好的做法：使用函數式更新
  const handleBestUpdate = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: '王五',
      hobbies: [...prevUser.hobbies, '騎車'],
      profile: {
        ...prevUser.profile,
        age: prevUser.profile.age + 1
      }
    }));
  };

  return (
    <div>
      <h3>用戶資料：{user.name}</h3>
      <p>年齡：{user.profile.age}</p>
      <p>居住地：{user.profile.city}</p>
      <p>興趣：{user.hobbies.join(', ')}</p>
      
      <button onClick={handleWrongUpdate}>❌ 錯誤更新</button>
      <button onClick={handleCorrectUpdate}>✅ 正確更新</button>
      <button onClick={handleBestUpdate}>✨ 最佳實踐</button>
    </div>
  );
}
```

{% note danger %}
**為什麼必須保持不可變性？**
- React 使用 `Object.is()` 比較 state 的參考來判斷是否需要重新渲染
- 直接修改物件會導致新舊 state 具有相同參考，React 認為沒有變化
- 不可變更新確保了元件的純函數特性和可預測性
{% endnote %}

#### 批次更新與連續操作問題

這是新手最常遇到的問題之一：為什麼連續調用 setState 多次，只有最後一次生效？

```javascript 批次更新問題演示
import React, { useState } from 'react';

function BatchUpdateDemo() {
  const [count, setCount] = useState(0);

  // ❌ 問題：連續更新，只會執行最後一次
  const handleWrongIncrement = () => {
    console.log('更新前的 count:', count);
    setCount(count + 1);  // 假設 count 是 0，這裡變成 1
    setCount(count + 1);  // count 還是 0，這裡又變成 1
    setCount(count + 1);  // count 還是 0，這裡還是變成 1
    console.log('更新後的 count （實際不會馬上變化）:', count);
    // 最終結果：count 變成 1，而不是 3
  };

  // ✅ 解決方案：使用函數式更新
  const handleCorrectIncrement = () => {
    console.log('更新前的 count:', count);
    setCount(prevCount => prevCount + 1);  // 基於最新值 +1
    setCount(prevCount => prevCount + 1);  // 再 +1
    // 最終結果：count 增加 3
  };

  // 🔍 演示批次更新機制
  const handleBatchDemo = () => {
    console.log('=== 批次更新演示 ===');
    console.log('開始時 count:', count);
    
    setCount(count + 1);
    console.log('第一次 setCount 後：', count);  // 還是原來的值！
    
    setCount(count + 1);
    console.log('第二次 setCount 後：', count);  // 還是原來的值！
    
    // 實際更新會在這個函數執行完後才發生
    setTimeout(() => {
      console.log('setTimeout 中看到的 count:', count);
    }, 0);
  };

  return (
    <div>
      <h3>計數器：{count}</h3>
      
      <div>
        <button onClick={handleWrongIncrement}>
          ❌ 錯誤：連續 +1 三次
        </button>
        <p>期望：+3，實際：+1</p>
      </div>
      
      <div>
        <button onClick={handleCorrectIncrement}>
          ✅ 正確：函數式更新 +3
        </button>
        <p>正確地增加 3</p>
      </div>
      
      <div>
        <button onClick={handleBatchDemo}>
          🔍 觀察批次更新
        </button>
        <p>打開 Console 查看執行過程</p>
      </div>
      
      <button onClick={() => setCount(0)}>重設</button>
    </div>
  );
}
```

#### 閉包陷阱 (Stale Closure)

在非同步操作中，state 的值可能不是你期望的那樣：

```javascript 閉包陷阱演示
import React, { useState, useEffect } from 'react';

function ClosureTrapDemo() {
  const [count, setCount] = useState(0);

  // ❌ 閉包陷阱：非同步操作中的 state 值是舊的
  const handleAsyncWrong = () => {
    console.log('點擊時的 count:', count);
    
    setTimeout(() => {
      console.log('3 秒後看到的 count:', count);  // 可能是舊值！
      setCount(count + 1);  // 基於舊值更新
    }, 3000);
  };

  // ✅ 解決方案：使用函數式更新
  const handleAsyncCorrect = () => {
    console.log('點擊時的 count:', count);
    
    setTimeout(() => {
      setCount(prevCount => {
        console.log('3 秒後的實際 count:', prevCount);
        return prevCount + 1;  // 基於最新值更新
      });
    }, 3000);
  };

  // 🔄 自動計數器展示閉包問題
  const [autoCount, setAutoCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      // ❌ 這樣寫會有閉包問題
      intervalId = setInterval(() => {
        console.log('interval 中看到的 autoCount:', autoCount);
        setAutoCount(autoCount + 1);  // 永遠基於初始值 0
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [isRunning]); // 注意：這裡漏掉了 autoCount 依賴

  // ✅ 正確的自動計數器
  const [correctAutoCount, setCorrectAutoCount] = useState(0);
  const [isCorrectRunning, setIsCorrectRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (isCorrectRunning) {
      intervalId = setInterval(() => {
        setCorrectAutoCount(prevCount => prevCount + 1);  // 函數式更新
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [isCorrectRunning]); // 不需要 correctAutoCount 依賴

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>非同步操作閉包陷阱</h3>
        <p>當前計數：{count}</p>
        <button onClick={handleAsyncWrong}>
          ❌ 3 秒後 +1 （錯誤）
        </button>
        <button onClick={handleAsyncCorrect}>
          ✅ 3 秒後 +1 （正確）
        </button>
        <button onClick={() => setCount(0)}>重設</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>自動計數器閉包問題</h3>
        <p>錯誤版本：{autoCount}</p>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? '停止' : '開始'} 錯誤計數器
        </button>
        <button onClick={() => { setAutoCount(0); setIsRunning(false); }}>
          重設
        </button>
      </div>

      <div>
        <h3>正確的自動計數器</h3>
        <p>正確版本：{correctAutoCount}</p>
        <button onClick={() => setIsCorrectRunning(!isCorrectRunning)}>
          {isCorrectRunning ? '停止' : '開始'} 正確計數器
        </button>
        <button onClick={() => { setCorrectAutoCount(0); setIsCorrectRunning(false); }}>
          重設
        </button>
      </div>
    </div>
  );
}
```

#### State 更新的時機與性能考量
理解 React 的狀態更新時機對於寫出高效能的應用程式至關重要。React 18 引入了自動批次處理（Automatic Batching），大幅改善了性能表現。

**什麼是批次更新？**
當你在同一個事件中多次調用 `setState` 時，React 不會立即逐一執行每個更新，而是將所有更新「收集」起來，然後一次性處理，這樣只會觸發一次重新渲染。

**React 17 vs React 18 的重要差異：**
- **React 17**：只有在事件處理器中的更新才會被批次處理，`setTimeout`、`Promise` 等非同步更新不會批次處理
- **React 18**：所有更新都會被自動批次處理，包括非同步更新

**為什麼要關心這個？**
- **性能提升**：減少不必要的重新渲染次數
- **避免中間狀態**：防止 UI 顯示不一致的中間狀態
- **更好的用戶體驗**：UI 更新更加順暢

以下範例將幫助您深入理解這些概念：

```javascript State 更新時機演示
import React, { useState, useEffect, useRef } from 'react';

function UpdateTimingDemo() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const renderCountRef = useRef(0);

  // ✅ 正確的渲染次數追蹤
  useEffect(() => {
    renderCountRef.current += 1;
    setRenderCount(renderCountRef.current);
  }); // 沒有依賴陣列，每次渲染都會執行，但不會造成無限循環

  const handleMultipleUpdates = () => {
    console.log('=== 多次更新測試 ===');
    console.log('更新前渲染次數：', renderCount);
    console.log('更新前 count：', count);
    
    // React 18+ 中，這些更新會被批次處理，只觸發一次渲染
    setCount(prev => prev + 1);  // +1
    setCount(prev => prev + 1);  // +1  
    setCount(prev => prev + 1);  // +1
    
    console.log('三個 setCount 執行完畢，但渲染還未發生');
    console.log('此時 count 還是：', count); // 仍然是舊值
  };

  const handleAsyncUpdates = () => {
    console.log('=== 非同步更新測試 ===');
    console.log('更新前 count：', count);
    
    // 在 React 18+ 中，即使是非同步更新也會被批次處理
    setTimeout(() => {
      console.log('setTimeout 內，更新前 count：', count);
      setCount(prev => prev + 1);  // +1
      console.log('非同步更新執行完畢');
    }, 100);
  };

  // 演示條件更新以避免不必要的渲染
  const handleConditionalUpdate = () => {
    const newValue = Math.floor(Math.random() * 5);
    console.log(`隨機產生值：${newValue}，當前值：${count}`);
    
    // ✅ 好習慣：先檢查值是否真的改變了
    if (newValue !== count) {
      console.log('值有變化，執行更新');
      setCount(newValue);
    } else {
      console.log('值相同，跳過更新');
    }
  };

  // 演示 React 17 vs React 18 的差異
  const handleReact17StyleUpdate = () => {
    console.log('=== React 17 風格更新 ===');
    
    // 在 React 17 中，setTimeout 內的更新不會被批次處理
    setTimeout(() => {
      console.log('非批次更新開始');
      setCount(prev => prev + 1);  // 觸發一次渲染
      console.log('第一次更新完成');
      setCount(prev => prev + 1);  // 觸發一次渲染  
      console.log('第二次更新完成');
      setCount(prev => prev + 1);  // 觸發一次渲染
      console.log('第三次更新完成');
    }, 100);
  };

  return (
    <div>
      <h3>State 更新時機演示</h3>
      <p>當前計數：{count}</p>
      <p>元件渲染次數：{renderCount}</p>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleMultipleUpdates}>
          同步批次更新 (+3)
        </button>
        <span> - 同一事件中的多個更新會被批次處理</span>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleAsyncUpdates}>
          非同步批次更新 (+3)
        </button>
        <span> - React 18+ 非同步更新也會批次處理</span>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleReact17StyleUpdate}>
          模擬 React 17 行為 (+3)
        </button>
        <span> - 觀察渲染次數差異</span>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleConditionalUpdate}>
          隨機更新 (0-4)
        </button>
        <span> - 相同值不會觸發渲染</span>
      </div>
      
      <button onClick={() => {
        setCount(0);
        renderCountRef.current = 0;
        setRenderCount(0);
      }}>
        完全重設
      </button>
      
      <div style={{ marginTop: '15px', fontSize: '0.9em', color: '#666' }}>
        <p>💡 打開瀏覽器 Console 查看詳細執行過程</p>
      </div>
    </div>
  );
}
```

#### useState 完整運作機制流程圖
為了幫助您更好地理解 `useState` 的內部運作機制，以下流程圖展示了從調用 `setState` 到元件重新渲染的完整過程，並對比了**函數式更新**與**直接更新**兩種方式的差異：

{% mermaid graph TD %}
    A["用戶調用 setState"] --> B{"React 18+ 批次處理"}
    B --> C["收集同一事件中的所有更新"]
    C --> D["合併更新"]
    D --> E["觸發單次重新渲染"]
    E --> F["執行 Effect Hooks"]
    
    G["函數式更新"] --> H["prevState => newState"]
    H --> I["基於最新狀態計算"]
    I --> D
    
    J["直接更新"] --> K["使用當前閉包中的值"]
    K --> L["可能基於過時的狀態"]
    L --> D
    
    style G fill:#e8f5e8
    style J fill:#ffebee
    style E fill:#e1f5fe
{% endmermaid %}

**流程圖說明：**

🔄 **主流程（上方）**：
1. **用戶調用 setState** → 開始狀態更新流程
2. **React 18+ 批次處理** → 判斷是否需要批次處理多個更新
3. **收集更新** → 將同一事件中的所有 setState 調用收集起來
4. **合併更新** → 計算最終的狀態值
5. **觸發重新渲染** → 更新 DOM 並重新渲染元件
6. **執行 Effect Hooks** → 執行 useEffect 等副作用

✅ **函數式更新路徑（綠色）**：
- 使用 `setState(prev => newValue)` 的方式
- 能夠取得最新的狀態值進行計算
- 避免閉包陷阱，確保基於正確的狀態更新

❌ **直接更新路徑（紅色）**：
- 使用 `setState(directValue)` 的方式  
- 可能會使用過時的閉包中的值
- 在連續更新或非同步操作中容易出現問題

💡 **核心重點**：無論使用哪種更新方式，最終都會進入 React 的批次處理機制，但函數式更新能確保計算基於最新的狀態值。

{% note primary %}
**useState 最佳實踐總結：**

1. **保持不可變性**：總是創建新的物件/陣列，不要直接修改
2. **使用函數式更新**：當新狀態依賴舊狀態時，使用 `setState(prev => ...)`
3. **理解批次更新**：多個 setState 在同一事件中會被批次處理
4. **避免閉包陷阱**：在非同步操作中使用函數式更新
5. **條件更新**：避免設置相同的值來減少不必要的渲染
{% endnote %}

## useEffect

`useEffect` 讓你在函數元件中執行副作用操作，類似於類別元件的生命週期方法。

```javascript useEffect 基本語法
import React, { useState, useEffect } from 'react';

function WindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // 副作用函數
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    // 設置事件監聽器
    window.addEventListener('resize', handleResize);
    
    // 清理函數（可選）
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 依賴陣列為空，只在掛載時執行一次
  
  return <div>視窗寬度：{windowWidth}px</div>;
}
```

{% note info %}
**useEffect 的執行時機：**
- 沒有依賴陣列：每次渲染後都執行
- 空依賴陣列 `[]`：只在掛載後執行一次
- 有依賴項 `[dep1, dep2]`：當依賴項改變時執行
{% endnote %}

```javascript useEffect 依賴項範例
import React, { useState, useEffect } from 'react';

function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 只有當 userId 改變時才重新獲取資料
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('獲取用戶資料失敗：', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      fetchUser();
    }
  }, [userId]); // userId 改變時重新執行
  
  if (loading) return <div>載入中。..</div>;
  if (!user) return <div>找不到用戶資料</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

## useContext

`useContext` 讓你可以訂閱 React context 的變化，避免 props drilling 的問題。

```javascript useContext 基本設定
import React, { createContext, useContext, useState } from 'react';

// 1. 創建 Context
const ThemeContext = createContext();

// 2. 創建 Provider 元件
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. 創建自定義 Hook（可選但推薦）
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme 必須在 ThemeProvider 內部使用');
  }
  return context;
}

// 4. 使用 Context 的元件
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header style={{ 
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#333' : '#fff'
    }}>
      <h1>我的應用程式</h1>
      <button onClick={toggleTheme}>
        切換至 {theme === 'light' ? '深色' : '淺色'} 主題
      </button>
    </header>
  );
}

// 5. App 元件
function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}
```

{% note success %}
**最佳實踐：**
- 為 Context 創建自定義 Hook，提供更好的錯誤處理
- 將相關的 state 和函數群組到同一個 Context 中
- 避免將經常變化的值放在高層的 Context 中，會導致不必要的重新渲染
{% endnote %}

## useRef

`useRef` 返回一個可變的 ref 物件，主要用於直接訪問 DOM 元素或在渲染間保存數值。

```javascript useRef DOM 存取
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // 元件掛載後自動 focus 到輸入框
    inputRef.current.focus();
  }, []);
  
  const handleButtonClick = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="點擊按鈕會 focus 到這裡"
      />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
}
```

```javascript useRef 保存數值
import React, { useState, useRef, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    // 清理函數
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };
  
  return (
    <div>
      <h2>計時器：{seconds} 秒</h2>
      <button onClick={handleStart} disabled={isRunning}>
        開始
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        停止
      </button>
      <button onClick={handleReset}>
        重設
      </button>
    </div>
  );
}
```

{% note info %}
**useRef vs useState 的差異：**
- `useRef` 的 `.current` 值改變不會觸發重新渲染
- `useState` 的值改變會觸發重新渲染
- `useRef` 適合存儲 DOM 參考、計時器 ID、或任何不需要觸發重新渲染的值
{% endnote %}

# 效能優化 Hooks

這些 Hooks 主要用於優化應用程式效能，避免不必要的重新計算和重新渲染。

## useCallback

`useCallback` 返回一個記憶化的回調函數，只有當依賴項改變時才會更新函數參考。

```javascript useCallback 基本用法
import React, { useState, useCallback } from 'react';

// 子元件 - 使用 React.memo 優化
const ChildComponent = React.memo(({ onButtonClick, count }) => {
  console.log('ChildComponent 重新渲染');
  return (
    <div>
      <p>子元件接收到的計數：{count}</p>
      <button onClick={onButtonClick}>點擊我</button>
    </div>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // 沒有 useCallback - 每次渲染都會創建新的函數
  const handleClick1 = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  // 使用 useCallback - 只有依賴項改變時才會重新創建函數
  const handleClick2 = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // 空依賴陣列，函數永遠不會改變
  
  return (
    <div>
      <h2>父元件</h2>
      <p>計數：{count}</p>
      <p>其他狀態：{otherState}</p>
      
      <button onClick={() => setOtherState(otherState + 1)}>
        改變其他狀態
      </button>
      
      {/* 使用 useCallback 優化的函數 */}
      <ChildComponent 
        onButtonClick={handleClick2} 
        count={count}
      />
    </div>
  );
}
```

{% note info %}
**useCallback 使用時機：**
- 將函數傳遞給子元件，且子元件使用 `React.memo` 優化
- 函數作為其他 Hooks 的依賴項
- 創建函數的成本很高
- 函數包含複雜的邏輯或外部依賴
{% endnote %}

```javascript useCallback 實際應用
import React, { useState, useCallback, useEffect } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 搜尋函數 - 依賴於 query
  const searchUsers = useCallback(async () => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/users/search?q=${query}`);
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error('搜尋失敗：', error);
    } finally {
      setLoading(false);
    }
  }, [query]); // 只有 query 改變時才重新創建函數
  
  // 使用 searchUsers 作為 effect 的依賴項
  useEffect(() => {
    const timeoutId = setTimeout(searchUsers, 300); // 防抖動
    return () => clearTimeout(timeoutId);
  }, [searchUsers]);
  
  return (
    <div>
      <input
        type="text"
        placeholder="搜尋用戶。.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {loading && <div>搜尋中。..</div>}
      
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## useMemo

`useMemo` 返回一個記憶化的值，只有當依賴項改變時才會重新計算。

```javascript useMemo 基本用法
import React, { useState, useMemo } from 'react';

function ExpensiveComponent({ items, multiplier }) {
  const [filter, setFilter] = useState('');
  
  // 昂貴的計算 - 只有當 items 或 multiplier 改變時才重新計算
  const expensiveValue = useMemo(() => {
    console.log('執行昂貴的計算。..');
    return items
      .filter(item => item.active)
      .reduce((sum, item) => sum + item.value * multiplier, 0);
  }, [items, multiplier]);
  
  // 過濾後的項目 - 只有當 items 或 filter 改變時才重新計算
  const filteredItems = useMemo(() => {
    console.log('過濾項目。..');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  return (
    <div>
      <h3>總計：{expensiveValue}</h3>
      
      <input
        type="text"
        placeholder="過濾項目。.."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

{% note warning %}
**useMemo 注意事項：**
- 不要過度使用，記憶化本身也有成本
- 只對真正昂貴的計算使用
- 確保依賴陣列正確，避免 stale closure
- 不要依賴 useMemo 的記憶化來保證語義正確性
{% endnote %}

## useDeferredValue

`useDeferredValue` 是 React 18 引入的 Hook，讓你可以延遲更新值，優化用戶體驗。

```javascript useDeferredValue 基本用法
import React, { useState, useDeferredValue, useMemo } from 'react';

function SearchResults({ query }) {
  // 模擬大量搜尋結果
  const results = useMemo(() => {
    const items = [];
    for (let i = 0; i < 10000; i++) {
      if (`項目 ${i}`.includes(query)) {
        items.push({ id: i, name: `項目 ${i}` });
      }
    }
    return items;
  }, [query]);
  
  return (
    <ul>
      {results.slice(0, 100).map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function DeferredSearch() {
  const [query, setQuery] = useState('');
  // 延遲更新的查詢值
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      <input
        type="text"
        placeholder="搜尋。.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <p>當前輸入：{query}</p>
      <p>延遲查詢：{deferredQuery}</p>
      
      {/* 使用延遲的值進行搜尋，不會阻塞輸入 */}
      <SearchResults query={deferredQuery} />
    </div>
  );
}
```

## useTransition

`useTransition` 讓你可以將狀態更新標記為過渡，避免阻塞緊急的更新。

```javascript useTransition 基本用法
import React, { useState, useTransition } from 'react';

function SlowList({ query }) {
  const items = [];
  
  // 模擬慢速的列表渲染
  for (let i = 0; i < 5000; i++) {
    if (`項目 ${i}`.includes(query)) {
      items.push(<li key={i}>項目 {i}</li>);
    }
  }
  
  return <ul>{items}</ul>;
}

function TransitionDemo() {
  const [query, setQuery] = useState('');
  const [displayQuery, setDisplayQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    // 立即更新輸入框的值（高優先級）
    setQuery(value);
    
    // 將慢速更新標記為過渡（低優先級）
    startTransition(() => {
      setDisplayQuery(value);
    });
  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="搜尋。.."
        value={query}
        onChange={handleInputChange}
      />
      
      {isPending && <div>更新中。..</div>}
      
      <SlowList query={displayQuery} />
    </div>
  );
}
```

{% mermaid graph TD %}
    A["用戶輸入"] 
    B["緊急更新<br/>（輸入框）"]
    C["過渡更新<br/>（列表渲染）"]
    D["UI 保持響應"]
    
    A --> B
    A --> C
    B --> D
    
    style B fill:#e1f5fe
    style C fill:#fff3e0
    style D fill:#e8f5e8
{% endmermaid %}

{% note success %}
**效能優化最佳實踐：**
- 先測量效能瓶頸，再進行優化
- `useCallback` 和 `useMemo` 搭配 `React.memo` 使用效果更佳
- `useDeferredValue` 適合延遲非緊急的視覺更新
- `useTransition` 適合標記耗時的狀態更新
{% endnote %}

# 進階 Hooks

這些 Hooks 適用於複雜的狀態管理和進階的元件互動。

## useReducer

`useReducer` 是 `useState` 的替代方案，適合管理複雜的狀態邏輯。

```javascript useReducer 基本用法
import React, { useReducer } from 'react';

// 定義初始狀態
const initialState = {
  count: 0,
  step: 1
};

// 定義 reducer 函數
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'set_step':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error(`未知的 action 類型：${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  
  return (
    <div>
      <h2>計數器：{state.count}</h2>
      <p>步長：{state.step}</p>
      
      <div>
        <button onClick={() => dispatch({ type: 'decrement' })}>
          -{state.step}
        </button>
        <button onClick={() => dispatch({ type: 'increment' })}>
          +{state.step}
        </button>
      </div>
      
      <div>
        <label>
          設定步長：
          <input
            type="number"
            value={state.step}
            onChange={(e) => dispatch({ 
              type: 'set_step', 
              payload: parseInt(e.target.value) || 1 
            })}
          />
        </label>
      </div>
      
      <button onClick={() => dispatch({ type: 'reset' })}>
        重設
      </button>
    </div>
  );
}
```

```javascript useReducer 複雜狀態管理
import React, { useReducer, useEffect } from 'react';

// 待辦事項狀態管理
const todoInitialState = {
  todos: [],
  filter: 'all', // all, active, completed
  loading: false,
  error: null
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
      
    case 'SET_TODOS':
      return { ...state, todos: action.payload, loading: false, error: null };
      
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
      
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
      
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
      
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
      
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
      
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState);
  const [inputValue, setInputValue] = React.useState('');
  
  // 過濾後的待辦事項
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true; // 'all'
  });
  
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue.trim() });
      setInputValue('');
    }
  };
  
  return (
    <div>
      <h2>待辦事項</h2>
      
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新增待辦事項。.."
        />
        <button type="submit">新增</button>
      </form>
      
      <div>
        <button 
          className={state.filter === 'all' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        >
          全部 ({state.todos.length})
        </button>
        <button 
          className={state.filter === 'active' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        >
          待完成 ({state.todos.filter(t => !t.completed).length})
        </button>
        <button 
          className={state.filter === 'completed' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        >
          已完成 ({state.todos.filter(t => t.completed).length})
        </button>
      </div>
      
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              刪除
            </button>
          </li>
        ))}
      </ul>
      
      {state.todos.some(t => t.completed) && (
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
          清除已完成
        </button>
      )}
    </div>
  );
}
```

{% note info %}
**useReducer vs useState 選擇時機：**
- 複雜狀態邏輯（多個子值或下一個狀態依賴之前的狀態）
- 狀態更新邏輯需要在多個元件間共享
- 需要更容易測試的狀態更新邏輯
- 狀態更新涉及複雜的業務邏輯
{% endnote %}

## useImperativeHandle

`useImperativeHandle` 讓你可以自定義暴露給父元件的實例值，通常與 `forwardRef` 一起使用。

```javascript useImperativeHandle 基本用法
import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';

// 自定義輸入元件
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [value, setValue] = useState('');
  
  // 自定義暴露給父元件的方法
  useImperativeHandle(ref, () => ({
    // 自定義 focus 方法
    focus: () => {
      inputRef.current.focus();
    },
    
    // 自定義清空方法
    clear: () => {
      setValue('');
      inputRef.current.focus();
    },
    
    // 自定義設定值方法
    setValue: (newValue) => {
      setValue(newValue);
    },
    
    // 自定義獲取值方法
    getValue: () => {
      return value;
    },
    
    // 驗證輸入
    validate: () => {
      const isValid = value.length >= 3;
      if (!isValid) {
        inputRef.current.style.borderColor = 'red';
      } else {
        inputRef.current.style.borderColor = '';
      }
      return isValid;
    }
  }));
  
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="至少輸入 3 個字元"
      {...props}
    />
  );
});

// 父元件
function ParentComponent() {
  const customInputRef = useRef();
  
  const handleFocus = () => {
    customInputRef.current.focus();
  };
  
  const handleClear = () => {
    customInputRef.current.clear();
  };
  
  const handleValidate = () => {
    const isValid = customInputRef.current.validate();
    alert(isValid ? '驗證通過' : '請輸入至少 3 個字元');
  };
  
  const handleGetValue = () => {
    const value = customInputRef.current.getValue();
    alert(`當前值：${value}`);
  };
  
  return (
    <div>
      <h3>自定義輸入元件</h3>
      <CustomInput ref={customInputRef} />
      
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleFocus}>Focus</button>
        <button onClick={handleClear}>清空</button>
        <button onClick={handleValidate}>驗證</button>
        <button onClick={handleGetValue}>獲取值</button>
      </div>
    </div>
  );
}
```

{% note warning %}
**使用注意事項：**
- 避免過度使用，大多數情況下 props 和回調函數就足夠了
- 主要用於與第三方 DOM 函數庫整合或建立可重用的元件函數庫
- 不應該暴露整個 DOM 節點，而是特定的功能方法
{% endnote %}

## useSyncExternalStore

`useSyncExternalStore` 讓你可以訂閱外部資料來源，在 React 18 中引入來解決併發模式下的撕裂問題。

```javascript useSyncExternalStore 基本用法
import React, { useSyncExternalStore } from 'react';

// 外部 store 範例
class CounterStore {
  constructor() {
    this.count = 0;
    this.listeners = [];
  }
  
  // 獲取當前值
  getSnapshot = () => {
    return this.count;
  };
  
  // 訂閱變化
  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  };
  
  // 更新值並通知監聽者
  increment = () => {
    this.count += 1;
    this.listeners.forEach(listener => listener());
  };
  
  decrement = () => {
    this.count -= 1;
    this.listeners.forEach(listener => listener());
  };
}

// 創建全域 store 實例
const counterStore = new CounterStore();

// 自定義 Hook
function useCounter() {
  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot
  );
  
  return {
    count,
    increment: counterStore.increment,
    decrement: counterStore.decrement
  };
}

// 使用 store 的元件
function Counter() {
  const { count, increment, decrement } = useCounter();
  
  return (
    <div>
      <h3>計數器：{count}</h3>
      <button onClick={decrement}>-1</button>
      <button onClick={increment}>+1</button>
    </div>
  );
}

// 另一個使用相同 store 的元件
function CounterDisplay() {
  const { count } = useCounter();
  
  return (
    <div>
      <p>當前計數：{count}</p>
      <p>是否為偶數：{count % 2 === 0 ? '是' : '否'}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <CounterDisplay />
    </div>
  );
}
```

```javascript useSyncExternalStore 瀏覽器 API 整合
import React, { useSyncExternalStore } from 'react';

// 訂閱視窗大小變化
function useWindowSize() {
  const windowSize = useSyncExternalStore(
    // subscribe 函數
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    // getSnapshot 函數
    () => ({
      width: window.innerWidth,
      height: window.innerHeight
    }),
    // getServerSnapshot 函數（SSR 支持）
    () => ({
      width: 1024,
      height: 768
    })
  );
  
  return windowSize;
}

// 訂閱網路狀態
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,
    () => true // SSR 預設為線上狀態
  );
  
  return isOnline;
}

// 使用範例
function BrowserStatus() {
  const windowSize = useWindowSize();
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      <h3>瀏覽器狀態</h3>
      <p>視窗大小：{windowSize.width} x {windowSize.height}</p>
      <p>網路狀態：{isOnline ? '線上' : '離線'}</p>
    </div>
  );
}
```

{% note info %}
**useSyncExternalStore 使用場景：**
- 與第三方狀態管理函數庫整合（Redux, Zustand 等）
- 訂閱瀏覽器 API（localStorage, sessionStorage 等）
- 與 WebSocket 或其他外部資料來源整合
- 需要在併發模式下保持資料一致性
{% endnote %}

{% mermaid graph TD %}
    A["外部 Store"] 
    B["subscribe()"]
    C["getSnapshot()"]
    D["React 元件"]
    E["自動重新渲染"]
    
    A --> B
    A --> C
    B --> D
    C --> D
    D --> E
    
    style A fill:#fff3e0
    style D fill:#e8f5e8
    style E fill:#e1f5fe
{% endmermaid %}

# React 19 新增 Hooks

React 19 引入了兩個全新的 Hooks，進一步提升了表單處理和樂觀更新的開發體驗。

## useActionState

`useActionState` 是 React 19 新增的 Hook，專門用於處理表單動作和非同步狀態管理，提供更好的表單處理體驗。

```javascript useActionState 基本用法
import React, { useActionState } from 'react';

// 模擬 API 呼叫
async function submitForm(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // 模擬網路延遲
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模擬驗證錯誤
  if (!name || name.length < 2) {
    return {
      success: false,
      error: '姓名至少需要 2 個字元',
      data: { name, email }
    };
  }
  
  if (!email || !email.includes('@')) {
    return {
      success: false,
      error: '請輸入有效的電子郵件',
      data: { name, email }
    };
  }
  
  // 成功提交
  return {
    success: true,
    message: '表單提交成功！',
    data: { name, email }
  };
}

function ContactForm() {
  const [state, action, isPending] = useActionState(submitForm, {
    success: false,
    error: null,
    message: null,
    data: { name: '', email: '' }
  });
  
  return (
    <div>
      <h3>聯絡表單</h3>
      
      <form action={action}>
        <div>
          <label>
            姓名：
            <input
              type="text"
              name="name"
              defaultValue={state.data?.name || ''}
              disabled={isPending}
              required
            />
          </label>
        </div>
        
        <div>
          <label>
            電子郵件：
            <input
              type="email"
              name="email"
              defaultValue={state.data?.email || ''}
              disabled={isPending}
              required
            />
          </label>
        </div>
        
        <button type="submit" disabled={isPending}>
          {isPending ? '提交中。..' : '提交'}
        </button>
      </form>
      
      {state.error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          錯誤：{state.error}
        </div>
      )}
      
      {state.success && state.message && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          {state.message}
        </div>
      )}
    </div>
  );
}
```

```javascript useActionState 進階用法
import React, { useActionState, useState } from 'react';

// 複雜的表單處理邏輯
async function handleUserRegistration(prevState, formData) {
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    terms: formData.get('terms')
  };
  
  const errors = {};
  
  // 客戶端驗證
  if (!userData.username || userData.username.length < 3) {
    errors.username = '用戶名至少需要 3 個字元';
  }
  
  if (!userData.email || !userData.email.includes('@')) {
    errors.email = '請輸入有效的電子郵件';
  }
  
  if (!userData.password || userData.password.length < 6) {
    errors.password = '密碼至少需要 6 個字元';
  }
  
  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = '密碼確認不一致';
  }
  
  if (!userData.terms) {
    errors.terms = '請同意服務條款';
  }
  
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      data: userData
    };
  }
  
  try {
    // 模擬 API 註冊
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模擬用戶名已存在的錯誤
        if (userData.username === 'admin') {
          reject(new Error('用戶名已存在'));
        } else {
          resolve();
        }
      }, 1500);
    });
    
    return {
      success: true,
      message: '註冊成功！歡迎加入我們！',
      data: userData
    };
    
  } catch (error) {
    return {
      success: false,
      errors: { submit: error.message },
      data: userData
    };
  }
}

function UserRegistration() {
  const [state, action, isPending] = useActionState(handleUserRegistration, {
    success: false,
    errors: {},
    message: null,
    data: {}
  });
  
  return (
    <div>
      <h3>用戶註冊</h3>
      
      <form action={action}>
        <div>
          <label>
            用戶名：
            <input
              type="text"
              name="username"
              defaultValue={state.data?.username || ''}
              disabled={isPending}
            />
            {state.errors?.username && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>
                {state.errors.username}
              </div>
            )}
          </label>
        </div>
        
        <div>
          <label>
            電子郵件：
            <input
              type="email"
              name="email"
              defaultValue={state.data?.email || ''}
              disabled={isPending}
            />
            {state.errors?.email && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>
                {state.errors.email}
              </div>
            )}
          </label>
        </div>
        
        <div>
          <label>
            密碼：
            <input
              type="password"
              name="password"
              disabled={isPending}
            />
            {state.errors?.password && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>
                {state.errors.password}
              </div>
            )}
          </label>
        </div>
        
        <div>
          <label>
            確認密碼：
            <input
              type="password"
              name="confirmPassword"
              disabled={isPending}
            />
            {state.errors?.confirmPassword && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>
                {state.errors.confirmPassword}
              </div>
            )}
          </label>
        </div>
        
        <div>
          <label>
            <input
              type="checkbox"
              name="terms"
              defaultChecked={state.data?.terms}
              disabled={isPending}
            />
            我同意服務條款
            {state.errors?.terms && (
              <div style={{ color: 'red', fontSize: '0.8em' }}>
                {state.errors.terms}
              </div>
            )}
          </label>
        </div>
        
        <button type="submit" disabled={isPending}>
          {isPending ? '註冊中。..' : '註冊'}
        </button>
        
        {state.errors?.submit && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {state.errors.submit}
          </div>
        )}
        
        {state.success && state.message && (
          <div style={{ color: 'green', marginTop: '10px' }}>
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
```

{% note primary %}
**useActionState 主要特色：**
- 自動處理 pending 狀態，不需要手動管理 loading 狀態
- 與 Server Actions 完美整合，提供更好的表單體驗
- 支援表單驗證錯誤的狀態管理
- 在提交過程中自動禁用表單元素
{% endnote %}

## useOptimistic

`useOptimistic` 讓你可以樂觀地更新 UI，在等待非同步操作完成時先顯示預期的結果。

```javascript useOptimistic 基本用法
import React, { useState, useOptimistic, useRef } from 'react';

// 模擬發送訊息的 API
async function sendMessage(message) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模擬 10% 的失敗率
  if (Math.random() < 0.1) {
    throw new Error('網路錯誤，訊息發送失敗');
  }
  
  return {
    id: Date.now(),
    text: message,
    timestamp: new Date(),
    status: 'sent'
  };
}

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { ...newMessage, status: 'sending' }]
  );
  const [input, setInput] = useState('');
  const formRef = useRef();
  
  const handleSendMessage = async (formData) => {
    const messageText = formData.get('message');
    if (!messageText.trim()) return;
    
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      text: messageText,
      timestamp: new Date(),
      status: 'sending'
    };
    
    // 樂觀地添加訊息到 UI
    addOptimisticMessage(optimisticMessage);
    setInput('');
    formRef.current.reset();
    
    try {
      // 發送訊息
      const sentMessage = await sendMessage(messageText);
      
      // 用真實的訊息替換樂觀訊息
      setMessages(prevMessages => [...prevMessages, sentMessage]);
      
    } catch (error) {
      // 處理失敗情況
      console.error('發送失敗：', error);
      alert('訊息發送失敗，請重試');
      
      // 失敗時不需要手動移除樂觀訊息，
      // useOptimistic 會自動恢復到原始狀態
    }
  };
  
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h3>即時聊天</h3>
      
      <div 
        style={{ 
          height: '300px', 
          border: '1px solid #ccc', 
          padding: '10px', 
          overflowY: 'scroll',
          marginBottom: '10px'
        }}
      >
        {optimisticMessages.map((message, index) => (
          <div 
            key={message.id || index}
            style={{
              padding: '8px',
              margin: '4px 0',
              backgroundColor: message.status === 'sending' ? '#f0f8ff' : '#f5f5f5',
              borderRadius: '8px',
              opacity: message.status === 'sending' ? 0.7 : 1
            }}
          >
            <div>{message.text}</div>
            <small style={{ color: '#666' }}>
              {message.timestamp.toLocaleTimeString()} 
              {message.status === 'sending' && ' （發送中。..)'}
            </small>
          </div>
        ))}
      </div>
      
      <form action={handleSendMessage} ref={formRef}>
        <input
          type="text"
          name="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入訊息。.."
          style={{ width: '70%', padding: '8px' }}
        />
        <button 
          type="submit"
          style={{ width: '25%', padding: '8px', marginLeft: '5%' }}
        >
          發送
        </button>
      </form>
    </div>
  );
}
```

```javascript useOptimistic 複雜範例
import React, { useState, useOptimistic } from 'react';

// 模擬點讚 API
async function toggleLike(postId, currentLiked) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 模擬偶爾的網路錯誤
  if (Math.random() < 0.1) {
    throw new Error('網路連接失敗');
  }
  
  return !currentLiked;
}

function SocialPost({ post }) {
  const [likes, setLikes] = useState({
    count: post.likes,
    isLiked: post.isLiked
  });
  
  const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
    likes,
    (state, { type, value }) => {
      switch (type) {
        case 'toggle_like':
          return {
            count: state.count + (state.isLiked ? -1 : 1),
            isLiked: !state.isLiked
          };
        default:
          return state;
      }
    }
  );
  
  const handleLike = async () => {
    // 樂觀地更新 UI
    updateOptimisticLikes({ type: 'toggle_like' });
    
    try {
      const newLikedState = await toggleLike(post.id, likes.isLiked);
      
      // 成功時更新真實狀態
      setLikes(prevLikes => ({
        count: prevLikes.count + (newLikedState ? 1 : -1),
        isLiked: newLikedState
      }));
      
    } catch (error) {
      console.error('點讚失敗：', error);
      alert('點讚失敗，請重試');
      
      // useOptimistic 會自動恢復到原始狀態
    }
  };
  
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '16px', 
      margin: '16px 0' 
    }}>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleLike}
          style={{
            background: optimisticLikes.isLiked ? '#ff6b6b' : '#f1f1f1',
            color: optimisticLikes.isLiked ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          {optimisticLikes.isLiked ? '❤️ 已讚' : '🤍 讚'}
        </button>
        
        <span>
          {optimisticLikes.count} 個讚
        </span>
      </div>
    </div>
  );
}

function SocialFeed() {
  const posts = [
    {
      id: 1,
      title: '學習 React 19',
      content: '今天學會了 useOptimistic Hook，太酷了！',
      likes: 5,
      isLiked: false
    },
    {
      id: 2,
      title: '樂觀更新的魅力',
      content: 'useOptimistic 讓 UI 反應更加即時，用戶體驗大幅提升。',
      likes: 12,
      isLiked: true
    }
  ];
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>社群動態</h3>
      {posts.map(post => (
        <SocialPost key={post.id} post={post} />
      ))}
    </div>
  );
}
```

{% mermaid graph TD %}
    A["用戶點擊"] --> B["樂觀更新 UI"]
    B --> C["發送 API 請求"]
    C --> D{"API 成功？"}
    D -->|是| E["更新真實狀態"]
    D -->|否| F["恢復原始狀態"]
    E --> G["UI 保持更新"]
    F --> H["顯示錯誤訊息"]
    
    style B fill:#e8f5e8
    style E fill:#e1f5fe
    style F fill:#ffebee
{% endmermaid %}

{% note success %}
**React 19 新功能的優勢：**
- `useActionState` 簡化了表單狀態管理，提供更好的用戶體驗
- `useOptimistic` 讓 UI 反應更加即時，減少用戶等待時間
- 兩者都與 Server Components 和 Server Actions 完美整合
- 提供更直覺的錯誤處理和恢復機制
{% endnote %}

# 特殊用途 Hooks

這些 Hooks 在特定場景下非常有用，雖然不常用但很重要。

## useId

`useId` 產生唯一的 ID，主要用於可訪問性屬性和服務端渲染。

```javascript useId 基本用法
import React, { useId } from 'react';

function LoginForm() {
  const id = useId();
  
  return (
    <form>
      <label htmlFor={`${id}-email`}>電子郵件：</label>
      <input id={`${id}-email`} type="email" />
      
      <label htmlFor={`${id}-password`}>密碼：</label>
      <input id={`${id}-password`} type="password" />
      
      <button type="submit">登入</button>
    </form>
  );
}

// 多個表單實例
function App() {
  return (
    <div>
      <h2>登入區域</h2>
      <LoginForm />
      
      <h2>註冊區域</h2>
      <LoginForm />
    </div>
  );
}
```

```javascript useId 複雜範例
import React, { useId, useState } from 'react';

function FormField({ label, type = 'text', required = false, helpText }) {
  const id = useId();
  const [value, setValue] = useState('');
  const [showError, setShowError] = useState(false);
  
  const handleBlur = () => {
    if (required && !value.trim()) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };
  
  return (
    <div style={{ marginBottom: '16px' }}>
      <label 
        htmlFor={id}
        style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}
      >
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        aria-describedby={helpText ? `${id}-help` : undefined}
        aria-invalid={showError}
        style={{
          width: '100%',
          padding: '8px',
          border: showError ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      
      {helpText && (
        <div 
          id={`${id}-help`}
          style={{ fontSize: '0.8em', color: '#666', marginTop: '4px' }}
        >
          {helpText}
        </div>
      )}
      
      {showError && (
        <div 
          style={{ fontSize: '0.8em', color: 'red', marginTop: '4px' }}
          role="alert"
        >
          此欄位為必填
        </div>
      )}
    </div>
  );
}

function AccessibleForm() {
  return (
    <form>
      <h3>用戶資料表單</h3>
      
      <FormField 
        label="姓名" 
        required 
        helpText="請輸入您的真實姓名"
      />
      
      <FormField 
        label="電子郵件" 
        type="email" 
        required 
        helpText="我們會使用此信箱與您聯繫"
      />
      
      <FormField 
        label="電話號碼" 
        type="tel" 
        helpText="格式：0912-345-678"
      />
      
      <button type="submit">提交</button>
    </form>
  );
}
```

{% note info %}
**useId 重要特性：**
- 在服務端和客戶端產生相同的 ID，避免 hydration 不匹配
- 每次呼叫都會產生唯一的 ID
- 不應該用作 key 屬性，請用於可訪問性屬性
- ID 格式可能在不同版本間變化，不要依賴特定格式
{% endnote %}

## useDebugValue

`useDebugValue` 在 React DevTools 中顯示自定義 Hook 的標籤，僅在開發模式下生效。

```javascript useDebugValue 基本用法
import React, { useState, useEffect, useDebugValue } from 'react';

// 自定義 Hook 使用 useDebugValue
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  // 在 React DevTools 中顯示當前計數
  useDebugValue(count);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// 複雜的 useDebugValue 範例
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // 顯示複雜的調試資訊
  useDebugValue(storedValue, value => {
    return `${key}: ${JSON.stringify(value)}`;
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  return [storedValue, setValue];
}

// 使用自定義 Hook 的元件
function DebugExample() {
  const { count, increment, decrement, reset } = useCounter(0);
  const [name, setName] = useLocalStorage('userName', '');
  
  return (
    <div>
      <h3>調試範例</h3>
      <p>計數：{count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>重設</button>
      
      <div style={{ marginTop: '20px' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="輸入姓名"
        />
        <p>儲存的姓名：{name}</p>
      </div>
    </div>
  );
}
```

## useInsertionEffect

`useInsertionEffect` 在所有 DOM 變更之前觸發，主要用於 CSS-in-JS 函數庫。

```javascript useInsertionEffect 基本用法
import React, { useInsertionEffect, useLayoutEffect, useEffect } from 'react';

function CSSInjector({ styles, className }) {
  useInsertionEffect(() => {
    // 在 DOM 變更之前插入樣式
    const style = document.createElement('style');
    style.textContent = styles;
    document.head.appendChild(style);
    
    console.log('useInsertionEffect: 樣式已插入');
    
    return () => {
      document.head.removeChild(style);
      console.log('useInsertionEffect: 樣式已移除');
    };
  }, [styles]);
  
  useLayoutEffect(() => {
    console.log('useLayoutEffect: DOM 已更新，但尚未繪製');
  });
  
  useEffect(() => {
    console.log('useEffect: DOM 已繪製完成');
  });
  
  return (
    <div className={className}>
      檢查 Console 看看執行順序
    </div>
  );
}

// 實際的 CSS-in-JS 範例
function useDynamicStyles() {
  const [styleId] = React.useState(() => `style-${Math.random().toString(36)}`);
  
  useInsertionEffect(() => {
    const existingStyle = document.getElementById(styleId);
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, [styleId]);
  
  const addCSS = (css) => {
    const style = document.getElementById(styleId);
    if (style) {
      style.textContent = css;
    }
  };
  
  return { addCSS, styleId };
}

function StyledComponent() {
  const { addCSS } = useDynamicStyles();
  const [color, setColor] = React.useState('blue');
  
  React.useEffect(() => {
    const css = `
      .dynamic-style {
        color: ${color};
        font-weight: bold;
        padding: 10px;
        border: 2px solid ${color};
        border-radius: 5px;
      }
    `;
    addCSS(css);
  }, [color, addCSS]);
  
  return (
    <div>
      <div className="dynamic-style">
        這個元素的樣式是動態注入的！
      </div>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="blue">藍色</option>
        <option value="red">紅色</option>
        <option value="green">綠色</option>
      </select>
    </div>
  );
}
```

## useLayoutEffect

`useLayoutEffect` 在所有 DOM 變更後但在瀏覽器繪製前同步執行，用於需要讀取 DOM 佈局的操作。

```javascript useLayoutEffect 基本用法
import React, { useState, useLayoutEffect, useRef } from 'react';

function MeasureComponent() {
  const [height, setHeight] = useState(0);
  const divRef = useRef();
  
  useLayoutEffect(() => {
    // 在瀏覽器繪製前讀取 DOM 尺寸
    if (divRef.current) {
      const { height } = divRef.current.getBoundingClientRect();
      setHeight(height);
    }
  });
  
  return (
    <div>
      <div 
        ref={divRef}
        style={{ 
          padding: '20px', 
          border: '1px solid #ccc',
          fontSize: '18px'
        }}
      >
        這個 div 的高度是：{height}px
      </div>
    </div>
  );
}

// 實際應用：工具提示定位
function Tooltip({ children, content, visible }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef();
  const targetRef = useRef();
  
  useLayoutEffect(() => {
    if (visible && tooltipRef.current && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = targetRect.bottom + 5;
      let left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
      
      // 防止工具提示超出視窗邊界
      if (left < 0) left = 5;
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 5;
      }
      
      if (top + tooltipRect.height > window.innerHeight) {
        top = targetRect.top - tooltipRect.height - 5;
      }
      
      setPosition({ top, left });
    }
  }, [visible]);
  
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div ref={targetRef}>
        {children}
      </div>
      
      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            backgroundColor: 'black',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

function TooltipDemo() {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Tooltip 
        content="這是一個智能定位的工具提示！"
        visible={showTooltip}
      >
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          懸停顯示工具提示
        </button>
      </Tooltip>
    </div>
  );
}
```

{% note warning %}
**效能考量：**
- `useLayoutEffect` 會阻塞瀏覽器繪製，影響效能
- 只在真正需要同步讀取 DOM 時使用
- 優先考慮 `useEffect`，除非確實需要同步執行
- 避免在 `useLayoutEffect` 中進行昂貴的計算
{% endnote %}

# 總結與最佳實踐

經過本文的詳細介紹，我們已經完整了解了 React 19 官方推薦的所有 Hooks。以下是使用這些 Hooks 的總結和最佳實踐：

{% mermaid graph TD %}
    A["選擇合適的 Hook"]
    B["基礎需求"]
    C["效能優化"]
    D["複雜狀態"]
    E["特殊用途"]
    
    B --> B1["useState<br/>useEffect<br/>useContext<br/>useRef"]
    C --> C1["useCallback<br/>useMemo<br/>useDeferredValue<br/>useTransition"]
    D --> D1["useReducer<br/>useImperativeHandle<br/>useSyncExternalStore"]
    E --> E1["useId<br/>useDebugValue<br/>useInsertionEffect<br/>useLayoutEffect"]
    
    A --> B
    A --> C
    A --> D
    A --> E
    
    F["React 19 新增"] --> F1["useActionState<br/>useOptimistic"]
    A --> F
    
    style B1 fill:#e8f5e8
    style C1 fill:#e1f5fe
    style D1 fill:#fff3e0
    style E1 fill:#f3e5f5
    style F1 fill:#ffebee
{% endmermaid %}

## 選擇指南

{% note primary %}
**基礎開發：**
- 狀態管理：`useState`
- 副作用處理：`useEffect`
- 跨元件通信：`useContext`
- DOM 操作或變數保存：`useRef`
{% endnote %}

{% note info %}
**效能優化：**
- 函數記憶化：`useCallback`
- 值記憶化：`useMemo`
- 非緊急更新延遲：`useDeferredValue`
- 過渡狀態：`useTransition`
{% endnote %}

{% note warning %}
**複雜場景：**
- 複雜狀態邏輯：`useReducer`
- 父子元件互動：`useImperativeHandle`
- 外部資料同步：`useSyncExternalStore`
{% endnote %}

{% note success %}
**現代開發（React 19）：**
- 表單處理：`useActionState`
- 樂觀更新：`useOptimistic`
- 結合 Server Components 獲得最佳體驗
{% endnote %}

## 開發建議

1. **由簡入繁**：先用基礎 Hooks 實現功能，再考慮優化
2. **測量優化**：使用 React DevTools Profiler 測量效能瓶頸
3. **適度使用**：不要過度優化，記憶化也有成本
4. **保持更新**：關注 React 官方文件和最新最佳實踐

透過掌握這些 Hooks，您將能夠構建高效、現代的 React 應用程式！

{% note success %}
**跟著做：**
試著在您的專案中逐步導入這些 Hooks，從基礎 Hooks 開始，再根據需求添加優化和進階功能。記住，最好的學習方法就是實際應用！
{% endnote %}