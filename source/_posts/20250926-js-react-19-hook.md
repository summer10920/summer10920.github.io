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

React Hooks 是 React 16.8 引入的功能，讓我們能在函式元件中使用 state 和其他 React 功能。React 19 進一步優化了現有 Hooks，並新增了兩個實用的 Hooks。

## 從 Class 元件到 Function 元件的演進

在 React 16.8 之前，開發者主要透過 Class 元件（類別元件）來管理狀態（state）與生命週期（lifecycle methods），例如 `constructor`、`componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 等。這種寫法雖然功能完整，但語法較為冗長，且在複雜元件中容易出現「生命週期邏輯分散」與「this 綁定」等問題，導致程式碼難以維護與重複利用。

自從 React 16.8 推出 Hooks 之後，Function 元件（函式元件）結合 Hooks 已成為現代 React 的主流開發方式。Hooks 讓我們能在函式元件中直接使用 state、effect、context 等功能，無需再撰寫 class，語法更簡潔、可讀性更高，也更容易進行單元測試與重構。

Function 元件搭配 Hooks 不僅能減少樣板程式碼（boilerplate），還能讓邏輯更容易抽離成自訂 Hook，提升元件的可重用性與維護性。

| 項目       | Class 元件                      | Function 元件 + Hooks            |
| ---------- | ------------------------------- | -------------------------------- |
| 狀態管理   | `this.state` / `this.setState`  | `useState`                       |
| 生命週期   | `componentDidMount` 等方法      | `useEffect`                      |
| this 綁定  | 需手動綁定（如箭頭函式或 bind） | 無需 this，直接使用變數          |
| 程式碼結構 | 較為冗長，邏輯分散              | 精簡、邏輯可集中或抽離           |
| 可重用邏輯 | 透過 HOC 或 render props        | 透過自訂 Hook                    |
| 學習曲線   | 較高，需理解 class 與生命週期   | 較低，貼近 JavaScript 函式式思維 |

現在的 React 開發已經全面以「函式元件（Function Component）+ Hooks」為主流，**Hooks 只能用在函式元件**，無法在 Class 元件中使用。因此，初學者只需要專注學習函式元件與各種 Hook 的用法即可，不必再花時間學習 Class 元件的生命週期與 this 綁定等舊式寫法。

只有在維護舊專案或需要閱讀舊有程式碼時，才有必要了解 Class 元件的語法與生命週期方法。對於新專案與現代開發，建議完全採用函式元件搭配 Hooks，這樣能寫出更簡潔、易維護且符合官方最佳實踐的 React 程式碼。

## Hooks 使用規則

React Hooks 有嚴格的使用規則，必須遵循以下原則：

1. **只在元件頂層調用 Hooks**：不能在條件語句、迴圈或巢狀函式中調用
2. **只在 React 函式中調用**：只能在 React 元件或自定義 Hook 中使用
3. **保持調用順序一致**：每次渲染時 Hooks 的調用順序必須相同

這些規則確保 React 能夠正確追蹤 Hooks 的狀態，避免狀態錯亂和不可預期的行為。

以下是官方推薦的所有 Hooks 分類：

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

`useState` 是最基本的 Hook，用於在函式元件中管理 state。它讓 React 能夠追蹤狀態變化並觸發重新渲染。

{% note info %}
**為什麼需要 useState？**

在 React 中，只有當 state 或 props 發生變化時，元件才會重新渲染。如果我們直接修改變數而不使用 `useState`，React 無法得知資料已經改變，因此不會觸發重新渲染。`useState` 提供了：

1. **狀態追蹤**：React 能夠監控狀態變化
2. **重新渲染觸發**：當狀態更新時自動重新渲染元件
3. **狀態持久化**：在元件重新渲染之間保持狀態值
{% endnote %}

```javascript useState 基本語法
import React, { useState } from 'react';

function CounterComponent() {
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
- `useState(initialValue)` 回傳一個陣列，包含當前的 state 值和更新函式
- 使用陣列解構來取得 state 和 setter 函式
- state 更新是非同步的，會觸發元件重新渲染
{% endnote %}

### 重新渲染機制詳解
React 的重新渲染機制是基於狀態（state）變化的偵測。由於 React 採用虛擬 DOM（virtual DOM, vDOM）來代理實際的 HTML 畫面渲染，即使我們直接修改變數的值，React 也不會主動偵測到這個變化，因此不會觸發 vDOM 的異動與畫面更新。只有透過 `useState` 提供的 setter 函式（如 `setCount`），才能正確通知 React 有狀態變化，進而觸發元件的重新渲染。讓我們透過對比例子來理解：

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
    setCount(count + 1); // 使用 setter 函式
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
2. **必須使用 setter 函式**：`setCount(newValue)` 才會通知 React 狀態已改變
3. **重新渲染是批次處理**：多個狀態更新會合併成一次重新渲染
4. **狀態更新是非同步的**：`setCount` 不會立即更新 `count` 的值，而是等待下一次重新渲染讀取新的 `count` 值
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
          placeholder="輸入待辦事項。.."
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
2. **事件處理**：執行對應的事件處理函式
3. **狀態更新**：呼叫 `setState` 函式更新狀態
4. **React 偵測**：React 偵測到狀態變化
5. **重新渲染**：React 重新執行元件函式
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
- 使用函式式更新 `setState(prevState => newState)` 來避免 stale closure 問題
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

  // ✅ 更好的做法：使用函式式更新
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
- 直接修改物件會導致新舊 state 具有相同記憶體位置的參考，React 認為沒有變化
- 不可變更新確保了元件的純函式特性和可預測性
{% endnote %}

#### 批次更新與連續操作問題
這是 React 初學者最常遇到的疑惑之一：為什麼連續呼叫多次 setState，結果卻只更新一次？

**React 的批次更新（Batching）機制說明：**
React 為了提升效能，會將同一事件處理流程中的多個狀態更新「合併批次處理」。這代表：

1. 多次呼叫 `setState`，如果都是基於同一個舊值（如 `count`的靜態值為 0），React 會將它們排入更新隊列，但每次計算的基礎值都是尚未更新的舊值，並不是重新渲染後從 useState 返回的新值。
2. React 會在事件處理結束後，統一執行這些狀態更新。最終只會觸發一次重新渲染（re-render）。
3. 在批次處理期間，state（如 `count`）的值不會即時改變，仍然維持舊值，直到所有更新完成後才會反映最新結果。
4. 若要正確累加，使用「函式式更新」語法（`setState(prev => ...)`），這樣排程時不是要求當下靜態值 0 來計算，而是要求以最新值來計算，這樣每次都會基於最新的 state 計算。

{% tabs 批次更新問題演示 %}
<!-- tab 錯誤寫法 -->
```javascript 錯誤：直接使用 state 值
import React, { useState } from 'react';

function WrongBatchUpdate() {
  const [count, setCount] = useState(0);

  // ❌ 錯誤：連續更新，只會執行最後一次
  const handleWrongIncrement = () => {
    console.log('更新前的 count:', count);
    setCount(count + 1);  // 排程：count 是 0，計算結果是 1
    setCount(count + 1);  // 排程：count 還是 0（未更新），計算結果還是 1
    console.log('更新後的 count （實際不會馬上變化）:', count);
    // 最終結果：React 批次處理後，count 變成 1，而不是 3
    // 因為三次都是基於同一個舊值 0 來計算
  };

  return (
    <div>
      <h3>計數器：{count}</h3>
      <button onClick={handleWrongIncrement}>
        ❌ 錯誤：連續 +1 三次
      </button>
      <p>期望：+3，實際：+1（因為都基於同一個舊值計算）</p>
    </div>
  );
}
```

**問題分析：**
- 三次 `setCount(count + 1)` 都是基於同一個舊值 0 來計算
- React 批次處理後，只會執行最後一次更新
- 結果：count 從 0 變成 1，而不是 3

<!-- endtab -->

<!-- tab 正確寫法 -->
```javascript 正確：使用函式式更新
import React, { useState } from 'react';

function CorrectBatchUpdate() {
  const [count, setCount] = useState(0);

  // ✅ 正確：使用函式式更新
  const handleCorrectIncrement = () => {
    console.log('更新前的 count:', count);
    setCount(prevCount => prevCount + 1);  // 排程：基於最新值 +1
    setCount(prevCount => prevCount + 1);  // 排程：基於前一次結果 +1
    // 最終結果：React 批次處理後，count 增加 3
    // 因為每次都是基於前一次的結果來計算
  };

  return (
    <div>
      <h3>計數器：{count}</h3>
      <button onClick={handleCorrectIncrement}>
        ✅ 正確：函式式更新 +3
      </button>
      <p>正確地增加 3（因為每次都基於前一次結果計算）</p>
    </div>
  );
}
```

**解決方案：**
- 使用 `setCount(prevCount => prevCount + 1)` 函式式更新
- 每次都是基於前一次的結果來計算
- 結果：count 正確地增加 3

<!-- endtab -->

<!-- tab 批次更新機制演示 -->
```javascript 觀察批次更新機制
import React, { useState } from 'react';

function BatchMechanismDemo() {
  const [count, setCount] = useState(0);

  // 🔍 演示批次更新機制
  const handleBatchDemo = () => {
    console.log('=== 批次更新演示 ===');
    console.log('開始時 count:', count);
    
    setCount(count + 1);
    console.log('第一次 setCount 後：', count);  // 還是原來的值！因為尚未重新渲染
    
    setCount(count + 1);
    console.log('第二次 setCount 後：', count);  // 還是原來的值！因為尚未重新渲染
    
    console.log('所有 setCount 都只是排程，實際更新會在函式執行完後才發生');
    // 實際更新會在這個函式執行完後才發生
    setTimeout(() => {
      console.log('setTimeout 中看到的 count:', count);
    }, 0);
  };

  return (
    <div>
      <h3>計數器：{count}</h3>
      <button onClick={handleBatchDemo}>
        🔍 觀察批次更新
      </button>
      <p>打開 Console 查看執行過程（注意 count 值在函式執行期間不會改變）</p>
      <button onClick={() => setCount(0)}>重設</button>
    </div>
  );
}
```

**機制說明：**
- 所有 `setCount` 都只是排程，不會立即更新
- 實際更新會在函式執行完後才發生
- 在函式執行期間，`count` 的值不會改變

<!-- endtab -->
{% endtabs %}

#### 閉包陷阱 (Stale Closure)

**什麼是閉包（Closure）？**
閉包是 JavaScript 的一個重要概念，指的是函式能夠「記住」並存取其外部作用域的變數，即使外部函式已經執行完畢。在 React 中，這會導致一個常見問題：非同步操作中看到的 state 值可能是舊的。

**閉包陷阱的發生原因：**
1. **函式捕獲變數**：當你建立一個函式時，它會「捕獲」當時作用域中的所有變數
2. **非同步執行**：setTimeout、setInterval 等非同步操作會在稍後執行
3. **變數值已改變**：但函式內部看到的仍然是「被捕獲時」的舊值

**簡單範例理解閉包：**
```javascript 閉包基本概念
function outerFunction() {
  let count = 0;  // 外部變數
  
  // 內部函式「捕獲」了 count 變數
  function innerFunction() {
    console.log(count);  // 可以存取外部的 count
    count++;  // 可以修改外部的 count
  }
  
  return innerFunction;
}

const myFunction = outerFunction();
myFunction();  // 輸出：0
myFunction();  // 輸出：1
myFunction();  // 輸出：2
// 即使 outerFunction 已經執行完畢，innerFunction 仍然能存取 count
```

在 React 中，閉包陷阱會導致非同步操作中的 state 值不是最新的：

{% tabs 閉包陷阱問題演示 %}
<!-- tab 錯誤寫法 -->
```javascript 錯誤：非同步操作中的閉包陷阱
import React, { useState, useEffect } from 'react';

function WrongClosureDemo() {
  const [count, setCount] = useState(0);

  // ❌ 閉包陷阱：非同步操作中的 state 值是舊的
  const handleAsyncWrong = () => {
    console.log('點擊時的 count:', count);
    
    setTimeout(() => {
      console.log('3 秒後看到的 count:', count);  // 可能是舊值！
      setCount(count + 1);  // 基於舊值更新
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

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>非同步操作閉包陷阱</h3>
        <p>當前計數：{count}</p>
        <button onClick={handleAsyncWrong}>
          ❌ 3 秒後 +1 （錯誤）
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
    </div>
  );
}
```

**問題分析：**

**閉包陷阱的詳細過程：**
1. **函式建立時**：`setTimeout(() => { setCount(count + 1); }, 3000)` 建立時，`count` 的值是 0
2. **函式捕獲變數**：setTimeout 的 callback 函式「捕獲」了當時的 `count` 值（0）
3. **3 秒後執行**：即使在這 3 秒內 `count` 可能已經變成 5，callback 函式看到的仍然是 0
4. **錯誤結果**：`setCount(0 + 1)` 執行，count 變成 1，而不是 6

**為什麼會發生這種情況？**
- JavaScript 的閉包特性：函式會「記住」建立時的外部變數值
- React 的重新渲染：每次渲染都會建立新的函式，但非同步操作中的函式仍然持有舊的 state 值
- 時序問題：非同步操作執行時，元件可能已經重新渲染多次，但函式內部看到的還是舊值

**結果：**
- 非同步操作（setTimeout、setInterval）會「捕獲」當前的 state 值
- 即使 state 後來改變了，非同步操作中看到的仍然是舊值
- 計數器無法正確累加，永遠基於初始值計算

<!-- endtab -->

<!-- tab 正確寫法 -->
```javascript 正確：使用函式式更新
import React, { useState, useEffect } from 'react';

function CorrectClosureDemo() {
  const [count, setCount] = useState(0);

  // ✅ 解決方案：使用函式式更新
  const handleAsyncCorrect = () => {
    console.log('點擊時的 count:', count);
    
    setTimeout(() => {
      setCount(prevCount => {
        console.log('3 秒後的實際 count:', prevCount);
        return prevCount + 1;  // 基於最新值更新
      });
    }, 3000);
  };

  // ✅ 正確的自動計數器
  const [correctAutoCount, setCorrectAutoCount] = useState(0);
  const [isCorrectRunning, setIsCorrectRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (isCorrectRunning) {
      intervalId = setInterval(() => {
        setCorrectAutoCount(prevCount => prevCount + 1);  // 函式式更新
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [isCorrectRunning]); // 不需要 correctAutoCount 依賴

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>非同步操作正確處理</h3>
        <p>當前計數：{count}</p>
        <button onClick={handleAsyncCorrect}>
          ✅ 3 秒後 +1 （正確）
        </button>
        <button onClick={() => setCount(0)}>重設</button>
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

**解決方案：**

**函式式更新如何解決閉包陷阱：**
1. **延遲取值**：`setCount(prevCount => prevCount + 1)` 不是立即取得 `count` 的值
2. **執行時取值**：`prevCount` 參數會在 setState 執行時才取得最新的 state 值
3. **避免閉包**：函式式更新不會「捕獲」舊的 state 值，而是動態取得最新值

**為什麼函式式更新有效？**
- **不依賴外部變數**：`prevCount => prevCount + 1` 不直接使用 `count` 變數
- **React 保證最新值**：React 會確保 `prevCount` 參數是最新的 state 值
- **避免時序問題**：無論何時執行，都能取得正確的最新值

**實際執行過程：**
1. **建立時**：`setTimeout(() => { setCount(prevCount => prevCount + 1); }, 3000)` 建立
2. **3 秒後執行**：React 會將最新的 state 值（比如 5）傳入 `prevCount` 參數
3. **正確結果**：`setCount(5 + 1)` 執行，count 變成 6

**結果：**
- 使用 `setCount(prevCount => prevCount + 1)` 函式式更新
- 函式式更新會取得最新的 state 值
- 計數器能正確累加，基於最新值計算

<!-- endtab -->
{% endtabs %}

**何時會遇到閉包陷阱？**
由於每一次重新渲染元件時，React 會建立新的函式實例，但非同步操作（如 setTimeout）中的函式仍然持有舊的閉包，因此閉包所「記住」的 state 值與元件重新渲染後的最新 state 值不同步。

- 在 `setTimeout`、`setInterval` 等非同步操作中使用 state
- 在 `useEffect` 的清理函式中使用 state
- 在事件處理器中建立非同步操作

**如何避免閉包陷阱？**
1. **使用函式式更新**：`setState(prevState => newState)`
2. **使用 useRef**：`const countRef = useRef(count)` 來保存最新值
3. **正確的依賴陣列**：確保 useEffect 的依賴陣列包含所有使用的 state

**記住這個原則：**
> 在非同步操作中，永遠不要直接使用 state 變數，而要使用函式式更新或 useRef 來取得最新值。

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
為了幫助您更好地理解 `useState` 的內部運作機制，以下流程圖展示了從調用 `setState` 到元件重新渲染的完整過程，並對比了**函式式更新**與**直接更新**兩種方式的差異：

{% mermaid graph TD %}
    A["用戶調用 setState"] --> B{"React 18+ 批次處理"}
    B --> C["收集同一事件中的所有更新"]
    C --> D["合併更新"]
    D --> E["觸發單次重新渲染"]
    E --> F["執行 Effect Hooks"]
    
    G["函式式更新"] --> H["prevState => newState"]
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

✅ **函式式更新路徑（綠色）**：
- 使用 `setState(prev => newValue)` 的方式
- 能夠取得最新的狀態值進行計算
- 避免閉包陷阱，確保基於正確的狀態更新

❌ **直接更新路徑（紅色）**：
- 使用 `setState(directValue)` 的方式  
- 可能會使用過時的閉包中的值
- 在連續更新或非同步操作中容易出現問題

💡 **核心重點**：無論使用哪種更新方式，最終都會進入 React 的批次處理機制，但函式式更新能確保計算基於最新的狀態值。

{% note primary %}
**useState 最佳實踐總結：**

1. **保持不可變性**：總是創建新的物件/陣列，不要直接修改
2. **使用函式式更新**：當新狀態依賴舊狀態時，使用 `setState(prev => ...)`
3. **理解批次更新**：多個 setState 在同一事件中會被批次處理
4. **避免閉包陷阱**：在非同步操作中使用函式式更新
5. **條件更新**：避免設置相同的值來減少不必要的渲染
{% endnote %}

## useEffect

`useEffect` 讓你在函式元件中執行副作用操作，類似於類別元件的生命週期方法。它提供了比 Class 元件更靈活的生命週期管理方式。在 React 中，`useEffect` 可以讓你將「副作用」動作（如事件監聽、資料請求等）與元件渲染邏輯分離，避免每次重新渲染時都重複執行不必要的操作。只要正確設置依賴陣列，這些副作用就能有效「優化重購」（避免重複註冊、重複計算）。

```javascript useEffect 基本語法
import React, { useState, useEffect } from 'react';

function WindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // 副作用函式
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    // 設置事件監聽器
    window.addEventListener('resize', handleResize);
    
    // 清理函式（可選）
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 依賴陣列為空，只在掛載時執行一次
  
  return <div>視窗寬度：{windowWidth}px</div>;
}
```

### 元件重新渲染的機制
重要概念：每次觸發重新渲染時，React 都會重新執行整個元件函式

```javascript 元件重新渲染的過程
import React, { useState } from 'react';

function MyComponent() {
  console.log('元件函式重新執行'); // 每次渲染都會執行
  
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // 每次渲染都會重新宣告這些變數
  const expensiveValue = calculateExpensiveValue(); // 每次都會重新計算
  const eventHandler = () => { 
    console.log('按鈕被點擊');
    setCount(count + 1);
  }; // 每次都會重新建立函式
  
  // 模擬昂貴的計算
  function calculateExpensiveValue() {
    console.log('執行昂貴的計算。..');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  }
  
  return (
    <div>
      <h3>計數器：{count}</h3>
      <p>姓名：{name}</p>
      <p>昂貴計算結果：{expensiveValue.toFixed(2)}</p>
      
      <button onClick={eventHandler}>
        增加計數
      </button>
      
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="輸入姓名"
      />
    </div>
  );
}

// 使用範例
function App() {
  return (
    <div>
      <h2>元件重新渲染演示</h2>
      <p>打開 Console 查看執行過程</p>
      <MyComponent />
    </div>
  );
}
```

**問題：什麼會導致不必要的重新生成？**
1. **昂貴的計算**：每次渲染都重新計算
2. **函式重新建立**：每次渲染都建立新的函式參考
3. **物件重新建立**：每次渲染都建立新的物件
4. **事件監聽器重複註冊**：沒有正確清理

### useEffect 的保護作用
useEffect 就像一個「保護區」，讓你可以精確控制副作用的執行時機，避免每次渲染都重複執行不必要的操作。在 React 的 `useEffect` 中，**依賴項（Dependency Array）** 是控制副作用執行時機的關鍵。你可以在 `useEffect` 的第二個參數傳入一個陣列，這個陣列裡的變數就是「依賴項」。React 會根據依賴項的變化來決定何時執行副作用函式。

- **沒有依賴陣列**：每次元件渲染後都會執行副作用。
- **空依賴陣列**：持有`[]`時，只在元件「掛載」時執行一次（類似 componentDidMount）。
- **有依賴項**：若持有`[dep1, dep2]`時，只有當陣列中的任一依賴項發生變化時才會執行副作用。

**useEffect 的保護機制：**
1. **獨立執行時機**：不跟隨元件重新渲染
2. **依賴控制**：透過依賴陣列控制何時執行
3. **清理機制**：提供清理函式避免記憶體洩漏
4. **效能優化**：避免不必要的重複操作

```javascript useEffect 的保護機制
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // ❌ 每次渲染都會執行（沒有 useEffect 保護）
  console.log('每次渲染都會執行');
  
  // ✅ 只在掛載時執行一次（useEffect 保護）
  useEffect(() => {
    console.log('只在元件掛載時執行一次');
    
    // 設置事件監聽器
    const handleResize = () => {
      console.log('視窗大小改變');
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // 清理函式：元件卸載時執行
    return () => {
      console.log('清理事件監聽器');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依賴陣列 = 只在掛載時執行
  
  // ✅ 只在 count 改變時執行
  useEffect(() => {
    console.log('count 改變了，當前值：', count);
    
    // 可以執行一些依賴 count 的操作
    document.title = `計數：${count}`;
  }, [count]); // 依賴 count
  
  return (
    <div>
      <h3>計數器：{count}</h3>
      <p>視窗寬度：{windowWidth}px</p>
      <button onClick={() => setCount(count + 1)}>
        增加計數
      </button>
      <p>打開 Console 查看執行過程</p>
    </div>
  );
}

// 使用範例
function App() {
  return (
    <div>
      <h2>useEffect 保護機制演示</h2>
      <MyComponent />
    </div>
  );
}
```

### useEffect 的清理機制
`useEffect` 還有一個重要的特性：**清理函式（Cleanup Function）**。當你在 `useEffect` 中 `return` 一個函式時，這個函式會在以下時機執行：

1. **元件卸載時**：元件從 DOM 中移除前執行
2. **依賴項改變前**：在執行新的副作用前，先清理舊的副作用
3. **重新渲染前**：如果沒有依賴項，每次重新渲染前都會執行清理

```javascript useEffect 清理函式的時機
useEffect(() => {
  // 設置副作用
  const timer = setInterval(() => {
    console.log('定時器執行');
  }, 1000);
  
  // 返回清理函式
  return () => {
    console.log('清理定時器');
    clearInterval(timer);
  };
}, []); // 空依賴陣列：只在掛載時設置，卸載時清理
```

**清理函式的常見用途：**
- 清除定時器（`clearInterval`、`clearTimeout`）
- 移除事件監聽器（`removeEventListener`）
- 取消網路請求（`AbortController`）
- 清理訂閱（取消 API 訂閱）
- 重置狀態或變數

```javascript 清理函式的實際應用範例
import React, { useState, useEffect } from 'react';

function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // 創建 AbortController 來取消請求
    const abortController = new AbortController();
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal // 綁定取消信號
        });
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('請求失敗：', error);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // 清理函式：取消進行中的請求
    return () => {
      abortController.abort(); // 取消請求
      console.log('取消 API 請求');
    };
  }, [userId]); // 當 userId 改變時，會先取消舊請求再發新請求
  
  // 事件監聽器的清理範例
  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log('按鍵：', event.key);
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    // 清理函式：移除事件監聽器
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      console.log('移除鍵盤事件監聽器');
    };
  }, []); // 只在掛載時添加，卸載時移除
  
  if (loading) return <div>載入中。..</div>;
  return <div>{data ? JSON.stringify(data) : '無資料'}</div>;
}
```

### 不提供第二個參數的 useEffect vs 直接寫在元件內

很多開發者會困惑：**「不提供第二個參數的 useEffect」和「直接寫在元件內」有什麼差異？既然都會每次渲染執行，為什麼還要用 useEffect？**

```javascript 迷思澄清：useEffect 的執行時機差異
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  
  // ❌ 直接在元件內執行（同步執行）
  console.log('元件渲染時同步執行'); // 在渲染過程中執行
  document.title = `計數器：${count}`; // 在渲染過程中更新 DOM
  
  // ❌ 不提供第二個參數的 useEffect（異步執行）
  useEffect(() => {
    console.log('useEffect 異步執行'); // 在渲染完成後執行
    setMessage(`計數器：${count}`); // 可能觸發新的渲染
  }); // 沒有第二個參數 = 每次渲染後都執行
  
  // ✅ 正確：提供空依賴陣列
  useEffect(() => {
    console.log('只在掛載時執行一次');
    // 初始化設定
  }, []); // 空依賴陣列 = 只在掛載時執行一次
  
  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setCount(count + 1)}>
        點擊增加：{count}
      </button>
    </div>
  );
}
```

**三種情況的差異對比：**

| 情況                 | 語法                           | 執行時機           | 執行順序         | 狀態同步           | 效能影響             | 適用場景                 |
| -------------------- | ------------------------------ | ------------------ | ---------------- | ------------------ | -------------------- | ------------------------ |
| **直接寫在元件內**   | `console.log('*')`             | 每次渲染時同步執行 | 在渲染過程中     | ✅ 總是使用最新狀態 | ❌ 效能差，阻塞渲染   | 簡單計算，不涉及副作用   |
| **不提供第二個參數** | `useEffect(() => {})`          | 每次渲染後異步執行 | 在渲染完成後     | ✅ 總是使用最新狀態 | ❌ 效能差，重複執行   | 很少使用，通常會造成問題 |
| **空依賴陣列 `[]`**  | `useEffect(() => {}, [])`      | 只在掛載時執行一次 | 在首次渲染完成後 | ❌ 使用初始狀態值   | ✅ 效能好，只執行一次 | 初始化設定，不依賴狀態   |
| **正確依賴項**       | `useEffect(() => {}, [state])` | 依賴項改變時執行   | 在依賴項改變後   | ✅ 使用最新狀態值   | ✅ 效能好，按需執行   | 依賴狀態的副作用         |

```javascript 執行時機的實際差異
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // ❌ 直接在元件內執行（同步，阻塞渲染）
  console.log('渲染過程中執行'); // 在渲染過程中執行
  // fetch(`/api/users/${userId}`); // 會阻塞渲染！
  
  // ❌ 不提供第二個參數的 useEffect（異步，不阻塞渲染）
  useEffect(() => {
    console.log('渲染完成後執行'); // 在渲染完成後執行
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }); // 沒有第二個參數 = 每次渲染後都執行
  
  // ✅ 正確：依賴 userId，userId 改變時重新請求
  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // 依賴 userId
  
  if (loading) return <div>載入中。..</div>;
  return <div>{user?.name}</div>;
}
```

**關鍵差異說明：**

1. **執行時機**：
   - 直接寫在元件內：在渲染過程中同步執行
   - useEffect：在渲染完成後異步執行

2. **渲染阻塞**：
   - 直接寫在元件內：可能阻塞渲染（如同步 API 請求）
   - useEffect：不會阻塞渲染

3. **副作用管理**：
   - 直接寫在元件內：無法清理副作用
   - useEffect：可以返回清理函式

### useEffect 的設計理念

`useEffect` 的核心設計理念就是：**讓副作用在元件渲染完成後才執行**。這樣做的好處是：

```javascript useEffect 的執行時機設計
function MyComponent() {
  const [count, setCount] = useState(0);
  
  // 1. 元件函式開始執行
  console.log('1. 元件函式開始執行');
  
  // 2. 渲染過程中執行的程式碼
  console.log('2. 渲染過程中執行');
  
  // 3. useEffect 排程到渲染完成後執行
  useEffect(() => {
    console.log('4. useEffect 執行（渲染完成後）');
    // 這裡可以安全地執行副作用
    document.title = `計數器：${count}`;
  });
  
  // 4. 返回 JSX（渲染）
  console.log('3. 返回 JSX');
  return <div>{count}</div>;
  
  // 執行順序：
  // 1. 元件函式開始執行
  // 2. 渲染過程中執行
  // 3. 返回 JSX
  // 4. useEffect 執行（渲染完成後）
}
```

**為什麼要這樣設計？**

1. **避免阻塞渲染**：副作用不會影響元件的渲染速度
2. **避免無限迴圈**：副作用不會在渲染過程中觸發新的渲染
3. **更好的使用者體驗**：使用者能立即看到介面，然後再處理副作用
4. **符合 React 的設計哲學**：渲染是純函式，副作用是額外的操作

**不提供第二個參數的常見問題：**

1. **無限迴圈**：每次渲染都執行，可能觸發新的狀態更新
2. **效能問題**：重複執行昂貴的操作
3. **記憶體洩漏**：重複註冊事件監聽器
4. **API 請求氾濫**：每次渲染都發送請求

{% note warning %}
**重要提醒：**
- **直接寫在元件內**：同步執行，可能阻塞渲染，無法清理副作用
- **不提供第二個參數**：異步執行，不阻塞渲染，但每次渲染都執行，可能造成無限迴圈
- **空依賴項 `[]`**：只在掛載時執行，狀態改變時不會更新
- **正確依賴項 `[state]`**：狀態改變時才執行，效能最佳
{% endnote %}

### useEffect 與狀態同步

由於 `useEffect` 不會主動隨元件渲染而重新執行，如果你需要最新的 state 值作為應用，則還是需要透過依賴項指定 state 來通知 React 需要重新執行該 effect。

```javascript 依賴項與狀態同步的重要性
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  
  // ❌ 錯誤：沒有依賴項，effect 中的 count 永遠是初始值 0
  useEffect(() => {
    console.log('count 值：', count); // 永遠是 0
    setMessage(`計數器：${count}`); // 永遠顯示 "計數器：0"
  }, []); // 空依賴陣列，只在掛載時執行一次
  
  // ✅ 正確：將 count 加入依賴項，count 改變時重新執行
  useEffect(() => {
    console.log('count 值：', count); // 會顯示最新的 count 值
    setMessage(`計數器：${count}`); // 會顯示最新的計數
  }, [count]); // 依賴 count，count 改變時重新執行
  
  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setCount(count + 1)}>
        點擊增加：{count}
      </button>
    </div>
  );
}
```

**為什麼需要依賴項？**

1. **閉包特性**：`useEffect` 中的函式會「記住」建立時的 state 值
2. **效能考量**：React 不會自動重新執行所有 effect
3. **明確性**：依賴項讓程式碼意圖更清楚
4. **避免錯誤**：防止使用過時的 state 值

```javascript 依賴項的實際應用場景
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // 當 userId 改變時，重新獲取用戶資料
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // 依賴 userId
  
  // 當 user 改變時，重新獲取該用戶的文章
  useEffect(() => {
    if (user) {
      fetchUserPosts(user.id).then(setPosts);
    }
  }, [user]); // 依賴 user
  
  // 當 posts 改變時，更新頁面標題
  useEffect(() => {
    if (posts.length > 0) {
      document.title = `${user?.name} 的文章 (${posts.length} 篇）`;
    }
  }, [posts, user?.name]); // 依賴 posts 和 user.name
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>文章數量：{posts.length}</p>
    </div>
  );
}
```

{% note info %}
**小技巧：**
- 使用 ESLint 的 `exhaustive-deps` 規則可以自動檢查遺漏的依賴項
- 如果 effect 中使用了某個 state 或 prop，記得將它加入依賴項
- 避免在依賴項中放入會頻繁變化的物件，考慮使用 `useCallback` 或 `useMemo`
{% endnote %}

{% note warning %}
**重要提醒：**
如果沒有正確清理副作用，可能會導致：
- **記憶體洩漏**：事件監聽器持續存在
- **重複執行**：定時器或請求重複觸發
- **狀態不一致**：元件卸載後仍更新狀態
- **效能問題**：不必要的資源消耗
{% endnote %}

### useEffect 的效能優化作用

**為什麼需要 useEffect？**

```javascript 沒有 useEffect 的問題
import React, { useState } from 'react';

function BadComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // ❌ 問題：每次渲染都會重新註冊事件監聽器
  window.addEventListener('resize', () => {
    console.log('視窗大小改變');
  });
  
  // ❌ 問題：每次渲染都會重新計算昂貴的運算
  const expensiveValue = calculateExpensiveValue();
  
  // 模擬昂貴的計算
  function calculateExpensiveValue() {
    console.log('執行昂貴的計算。..');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  }
  
  return (
    <div>
      <h3>計數器：{count}</h3>
      <p>姓名：{name}</p>
      <p>昂貴計算結果：{expensiveValue.toFixed(2)}</p>
      
      <button onClick={() => setCount(count + 1)}>
        增加計數
      </button>
      
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="輸入姓名"
      />
      
      <p>❌ 問題：每次渲染都會重新註冊事件監聽器和重新計算</p>
    </div>
  );
}
```

```javascript 使用 useEffect 的解決方案
import React, { useState, useEffect, useMemo } from 'react';

function GoodComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // ✅ 解決：只在掛載時註冊一次事件監聽器
  useEffect(() => {
    const handleResize = () => {
      console.log('視窗大小改變');
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // 清理：避免記憶體洩漏
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依賴陣列 = 只在掛載時執行
  
  // ✅ 解決：使用 useMemo 避免重複計算
  const expensiveValue = useMemo(() => {
    console.log('執行昂貴的計算。..');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  }, []); // 只在掛載時計算一次
  
  // ✅ 解決：使用 useCallback 避免函式重新建立
  const handleClick = useCallback(() => {
    console.log('按鈕被點擊');
    setCount(count + 1);
  }, [count]);
  
  return (
    <div>
      <h3>計數器：{count}</h3>
      <p>姓名：{name}</p>
      <p>視窗寬度：{windowWidth}px</p>
      <p>昂貴計算結果：{expensiveValue.toFixed(2)}</p>
      
      <button onClick={handleClick}>
        增加計數
      </button>
      
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="輸入姓名"
      />
      
      <p>✅ 解決：事件監聽器只註冊一次，昂貴計算只執行一次</p>
    </div>
  );
}
```

**useEffect 的效能優化效果：**
1. **避免重複操作**：事件監聽器、API 呼叫等只執行一次
2. **記憶體管理**：正確清理資源，避免記憶體洩漏
3. **條件執行**：只在必要時才執行副作用
4. **效能提升**：減少不必要的重複計算和操作

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
在 React 中，父元件通常會透過 props 將資料傳遞給子元件。然而，當元件樹結構很深時，會遇到「props drilling」（層層傳遞 props）問題：資料必須經過多層中介元件，即使這些中介元件本身並不需要該資料，也必須負責傳遞，導致程式碼冗長且維護困難。

舉例來說，假設有一個多層元件結構（爺爺 → 爸爸 → 兒子 → 孫子），而最底層的孫子元件需要最上層爺爺元件的資料。傳統做法必須：
- 爺爺將資料傳給爸爸
- 爸爸再傳給兒子
- 兒子再傳給孫子

這種方式不僅繁瑣，也容易出錯，這就是所謂的「props drilling」問題。React 的 Context 能有效解決這個困擾，讓資料可以直接由父元件「廣播」給所有需要的子元件，無論層級多深，都能輕鬆取得資料，省去中間層層傳遞的麻煩。

```javascript props drilling 的問題
function App() {
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  return (
    <div>
      <Header user={user} /> {/* 需要傳遞 user */}
    </div>
  );
}

function Header({ user }) {
  return (
    <header>
      <Navigation user={user} /> {/* 不需要 user，但必須傳遞 */}
    </header>
  );
}

function Navigation({ user }) {
  return (
    <nav>
      <UserProfile user={user} /> {/* 不需要 user，但必須傳遞 */}
    </nav>
  );
}

function UserProfile({ user }) {
  return <div>歡迎，{user.name}！</div>; {/* 終於使用 user */}
}
```

### Context 的解決方案
Context 就像 React 應用程式中的「資料廣播電台」，讓父元件可以將資料「廣播」給所有子元件，任何深層的子元件都能直接存取資料，不需要透過 props 層層傳遞。

```javascript Context 的基本概念
// 1. 創建一個「廣播頻道」
const UserContext = createContext();

// 2. 在頂層「發送」資料
function App() {
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  return (
    <UserContext.Provider value={user}>
      <Header /> {/* 不需要傳遞 user */}
    </UserContext.Provider>
  );
}

// 3. 在任何深層元件需要的地方使用 useContext 來訂閱「接收」指定資料
function UserProfile() {
  const user = useContext(UserContext); // 直接取得資料
  return <div>歡迎，{user.name}！</div>;
}
```

{% note info %}
**重要概念：Context 的創建位置**
`createContext()` 不是 Hook，所以它必須放在元件外面（檔案最上方），就像 import 語句一樣。然後在需要的子元件內使用 `useContext` 這個 Hook 來取得資料。
{% endnote %}

#### 兩種創建 Context 的方式

Context 的創建有兩種主要方式：

**方式一：無參數創建（推薦）**
```javascript
const UserContext = createContext();
```

**方式二：帶初始值創建**
```javascript
const UserContext = createContext({ name: 'Guest', age: 0 });
```

這兩種方式的主要差異在於「錯誤處理」的嚴謹度。讓我們用實際範例來說明：

```javascript 方式一：無參數創建（推薦做法）
import { createContext, useContext } from 'react';

// 創建一個沒有預設值的 Context
const UserContext = createContext();

function App() {
  return (
    <div>
      {/* ❌ 忘記用 Provider 包裝 */}
      <UserProfile />
    </div>
  );
}

function UserProfile() {
  // ⚠️ 這裡會得到 undefined，並且在使用時會直接報錯
  const user = useContext(UserContext);
  return <div>歡迎，{user.name}！</div>; // 💥 錯誤：無法讀取 undefined 的 name 屬性
}
```

```javascript 方式二：帶初始值創建（容易忽略錯誤）
import { createContext, useContext } from 'react';

// 創建一個有預設值的 Context
const UserContext = createContext({ name: 'Guest', age: 0 });

function App() {
  return (
    <div>
      {/* ❌ 忘記用 Provider 包裝 */}
      <UserProfile />
    </div>
  );
}

function UserProfile() {
  // ⚠️ 這裡會得到預設值 { name: 'Guest', age: 0 }
  const user = useContext(UserContext);
  return <div>歡迎，{user.name}！</div>; // ✅ 正常顯示「歡迎，Guest！」
  // 但這可能不是你想要的結果！你可能根本沒發現忘記設定 Provider
}
```

{% note warning %}
**關鍵差異：錯誤的可見性**
- **無參數創建**：忘記 Provider 會立即報錯，強迫你修正，就像「你必須插插頭，不然電器不會動」
- **帶初始值創建**：忘記 Provider 仍能運作，但使用的是預設值，錯誤被隱藏了。很像是「你忘記插插頭，但電器用備用電池還能動」
{% endnote %}

**正確的使用方式（兩種創建方式都一樣）**

不論使用哪種方式創建 Context，實際的資料都必須透過 `Provider` 的 `value` 屬性來傳遞：

```javascript 正確使用 Provider
import { createContext, useContext } from 'react';

// 無論是無參數還是帶初始值創建
const UserContext = createContext(); // 或 createContext({ name: 'Guest' })

function App() {
  const userData = { name: 'Loki', age: 30 };
  
  return (
    {/* ✅ 用 Provider 包裝並提供實際資料 */}
    <UserContext.Provider value={userData}>
      <UserProfile />
    </UserContext.Provider>
  );
}

function UserProfile() {
  // ✅ 取得的是 Provider 提供的 { name: 'Loki', age: 30 }
  // 而不是 createContext 的初始值（如果有的話）
  const user = useContext(UserContext);
  return <div>歡迎，{user.name}！</div>; // 顯示「歡迎，Loki！」
}
```

{% note success %}
**為什麼推薦無參數創建？**

1. **強制正確使用**：忘記 Provider 會立即報錯，而不是靜默失敗
2. **避免資料來源混淆**：不會搞不清楚資料是來自 Provider 還是預設值
3. **更好的除錯體驗**：錯誤訊息清楚明確，容易定位問題
4. **養成良好習慣**：強制你學會正確的 Context 架構設計
{% endnote %}

Context 的使用就像建立一個「資料廣播系統」。首先創建 Context 建立一個「廣播頻道」，然後建立 Provider 作為「廣播站」來管理資料，接著用 Provider 包裝需要資料的元件，最後子元件用 `useContext` 訂閱資料並在元件中使用取得的資料。

### 完整的 Context 設定流程

讓我們用一個主題切換的例子，完整展示 Context 的設定流程。這個範例會展示如何建立一個全域的主題管理系統，讓任何元件都能輕鬆取得和切換主題。

**實作步驟概覽：**

1. **創建 Context**：使用 `createContext()` 創建一個名為 `ThemeContext` 的 Context
2. **創建 Provider 元件**：封裝 `ThemeContext.Provider`，內部管理主題狀態（`theme`）和切換函式（`toggleTheme`）
3. **創建自定義 Hook**：封裝 `useContext(ThemeContext)`，提供更好的錯誤處理和使用體驗
4. **創建消費元件**：在 `Header` 和 `Content` 元件中使用自定義 Hook 取得主題資料
5. **包裝應用程式**：用 `ThemeProvider` 包裝整個 App，讓所有子元件都能存取主題

{% note info %}
**關鍵概念：Provider 元件封裝**

我們不會直接在 App 中寫 `<ThemeContext.Provider value={...}>`，而是創建一個 `ThemeProvider` 元件來封裝它。這樣做的好處是：
- 將狀態管理邏輯集中在一個地方
- App 元件更簡潔，只需要 `<ThemeProvider>` 包裹即可
- 更容易維護和測試
{% endnote %}

```javascript 完整的主題切換範例
import React, { createContext, useContext, useState } from 'react';

// 步驟 1：創建 Context
// 方式一：無參數創建（推薦）
const ThemeContext = createContext();

// 方式二：帶預設值創建（可選）
// const ThemeContext = createContext({
//   theme: 'light',
//   toggleTheme: () => {}
// });

// 步驟 2：創建 Provider 元件（資料提供者）
function ThemeProvider({ children }) {
  // 管理主題狀態
  const [theme, setTheme] = useState('light');
  
  // 切換主題的函式
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // 提供給子元件的資料和函式
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 步驟 3：創建自定義 Hook（推薦做法）
function useTheme() {
  const context = useContext(ThemeContext);
  
  // 錯誤處理：確保在 Provider 內部使用
  if (!context) {
    throw new Error('useTheme 必須在 ThemeProvider 內部使用');
  }
  
  return context;
}

// 步驟 4：會使用 Context 的元件
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header style={{ 
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#333' : '#fff',
      padding: '1rem',
      borderBottom: '1px solid #ccc'
    }}>
      <h1>我的應用程式</h1>
      <button 
        onClick={toggleTheme}
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        切換至 {theme === 'light' ? '深色' : '淺色'} 主題
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();
  
  return (
    <main style={{
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
      color: theme === 'light' ? '#333' : '#fff',
      padding: '2rem',
      minHeight: '200px'
    }}>
      <p>這是內容區域，目前主題是：<strong>{theme}</strong></p>
      <p>Context 讓我們可以在任何深度的子元件中存取主題狀態！</p>
    </main>
  );
}

// 步驟 5：App 元件
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}
```

{% note primary %}
**Context 解決的問題：**
1. **避免 props drilling**：不需要透過多層元件傳遞資料
2. **集中管理**：相關的狀態和邏輯集中在一起
3. **易於維護**：修改資料結構時，只需要修改 Provider
4. **效能優化**：只有訂閱的元件會重新渲染
{% endnote %}

{% note success %}
**Context 使用建議：**
- **自定義 Hook**：為 Context 創建自定義 Hook，提供更好的錯誤處理
- **邏輯分組**：將相關的 state 和函式群組到同一個 Context 中
- **避免過度渲染**：避免將經常變化的值放在高層的 Context 中，會導致不必要的重新渲染
- **適當拆分**：考慮將 Context 拆分，避免單一 Context 過於龐大
- **預設值設定**：為 Context 提供有意義的預設值，提升開發體驗
{% endnote %}

{% note warning %}
**常見錯誤：**
- 忘記用 Provider 包裝元件
- 在 Provider 外部使用 Context
- 將所有狀態都放在同一個 Context 中
- 沒有為 Context 提供預設值
{% endnote %}

## useRef
`useRef` 是 React 提供的一個 Hook，用來建立一個「可變的容器物件」。這個物件有一個 `.current` 屬性，可以用來「保存資料」或「取得 DOM 元素的參考」。 對初學者來說，可以把 `useRef` 想像成一個「不會因為重新渲染而消失的小盒子」，你可以把任何東西放進去（例如數字、物件、函式、甚至 DOM 元素），而且每次元件重新渲染時，這個盒子裡的內容都會被保留。

**主要用途**
-  **存取 DOM 元素**：你可以用 `useRef` 取得 `<input>`、`<div>` 等 DOM 元素的參考，像是自動聚焦、捲動到某個區塊等。
- **保存資料（不觸發重新渲染）**：如果你想在多次渲染之間保存某個值，但又不希望這個值改變時觸發畫面更新（不像 `useState`），就可以用 `useRef`。

{% note info %}
**小技巧：useRef 與 useState 差異**
- `useState`：資料改變會觸發元件重新渲染，適合用來顯示在畫面上的狀態
- `useRef`：資料改變**不會**觸發重新渲染，適合保存「暫存值」或「DOM 參考」
{% endnote %}

### DOM 元素存取
在 React 中，`useRef` 最常見的用途之一就是「存取 DOM 元素」。你可以將 `useRef` 建立的參考物件（ref）綁定到 JSX 元素的 `ref` 屬性上，這樣就能在程式中直接操作該 DOM 元素。例如：自動聚焦輸入框、捲動到特定區塊、或直接讀取/修改 DOM 屬性。

**重要觀念：為什麼需要用 useRef 綁定 DOM？**

很多初學者會有這個疑問：「是不是因為重新渲染時 DOM 會變成新的，所以才需要用 useRef 綁定？」，其實這是錯誤的理解。正確的理解是：
1. **React 會自動管理 DOM 更新**：當元件重新渲染時，React 會「智能更新」現有的 DOM，而不是每次都建立全新的 DOM。同一個 `<input>` 元素在多次渲染中，通常還是同一個實際的 DOM 節點。
2. **useRef 的真正目的**：不是為了「防止 DOM 變新的」，而是為了「在 React 元件中取得穩定的 DOM 參考」，讓你可以：
   - 在任何時候存取到正確的 DOM 元素
   - 呼叫原生 DOM 方法（如 `.focus()`、`.scrollIntoView()`）
   - 讀取 DOM 屬性（如 `.offsetWidth`、`.value`）
3. **為什麼不用 `document.querySelector()`？**
   - 在 React 中，直接用 `document.querySelector()` 是不推薦的，因為：
     - 你需要給元素加上 `id` 或 `class`，容易造成命名衝突
     - 在服務端渲染（SSR）時，`document` 不存在
     - 不符合 React 的「宣告式」設計理念
   - `useRef` 提供了一個「React 式」的方式來取得 DOM 參考

**比喻說明：**
- 傳統 JS：用「門牌號碼」（id/class）去找房子（DOM）
- React useRef：直接拿到房子的「鑰匙」（ref），隨時都能開門進去

**ref 物件的 `.current` 屬性**
- `useRef()` 回傳的物件有一個 `.current` 屬性，這個屬性會指向你綁定的 DOM 元素
- 在元件首次渲染時，`.current` 是 `null`（或你設定的初始值）
- 當元素渲染到畫面上後，React 會自動將 DOM 元素賦值給 `.current`
- 即使元件重新渲染，`.current` 仍然會指向同一個 DOM 元素（除非元素被移除）

```javascript useRef DOM 存取
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // 元件掛載後自動 focus 到輸入框
    inputRef.current.focus();
  }, []);
  
  const handleButtonClick = () => {
    // 手動 focus 到輸入框
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="點擊按鈕會 focus 到這裡"
        style={{ padding: '0.5rem', margin: '0.5rem' }}
      />
      <button 
        onClick={handleButtonClick}
        style={{ padding: '0.5rem 1rem', margin: '0.5rem' }}
      >
        Focus Input
      </button>
    </div>
  );
}
```

### 保存數值（不觸發重新渲染）
在 React 中，`useRef` 不僅可以用來存放 DOM 參考，也可以用來保存「任何可變的資料」而且**不會觸發元件重新渲染**。這很適合用來保存像是計時器 ID、前一次的資料、或是其他你不希望影響畫面的狀態。

**小技巧：useRef vs useState 差異**
- `useState`：資料變動會觸發元件重新渲染，適合用來管理「畫面要顯示」的狀態
- `useRef`：資料變動**不會**觸發重新渲染，適合保存「不影響畫面」的資料（例如 setInterval 的 ID、前一次的值等）

**範例說明：**
以下是一個簡單的計時器（Timer）元件，利用 `useRef` 來保存 setInterval 的 ID，避免每次重新渲染都重設計時器。

- `intervalRef` 用來保存 setInterval 回傳的 ID
- 當點擊「開始」時，啟動計時器並保存 ID
- 當點擊「停止」或元件卸載時，清除計時器
- 這樣做可以避免 setInterval 重複啟動或記憶體洩漏

```javascript useRef 保存數值
import React, { useState, useRef, useEffect } from 'react';

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (isRunning) {
      // 使用 useRef 保存計時器 ID，避免重新渲染
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    // 清理函式：元件卸載時清除計時器
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };
  
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>計時器：{seconds} 秒</h2>
      <div>
        <button 
          onClick={handleStart} 
          disabled={isRunning}
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
        >
          開始
        </button>
        <button 
          onClick={handleStop} 
          disabled={!isRunning}
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
        >
          停止
        </button>
        <button 
          onClick={handleReset}
          style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
        >
          重設
        </button>
      </div>
    </div>
  );
}
```

{% note info %}
**useRef vs useState 的差異：**
- **useRef**：`.current` 值改變不會觸發重新渲染，適合存儲 DOM 參考、計時器 ID
- **useState**：值改變會觸發重新渲染，適合需要更新 UI 的狀態
- **使用時機**：當你需要保存值但不希望觸發重新渲染時，使用 `useRef`
{% endnote %}

{% note warning %}
**注意事項：**
- `useRef` 的 `.current` 屬性是可變的，可以直接修改
- 不要在渲染期間讀取或寫入 `ref.current`，這會導致不可預測的行為
- 適合用於保存前一次的 props 或 state 值
{% endnote %}

# 效能優化 Hooks

這些 Hooks 主要用於優化應用程式效能，避免不必要的重新計算和重新渲染。

## useCallback

`useCallback` 是一個用來「記憶化函式」的 Hook，它可以讓函式在多次渲染之間保持相同的參考（reference）。這樣做的主要目的是**避免子元件不必要的重新渲染**，特別是當你將函式作為 props 傳遞給子元件時。

**核心概念：**
- 在 JavaScript 中，每次創建函式時都會產生一個新的函式物件
- 當父元件重新渲染時，所有定義在元件內的函式都會被重新創建
- 如果將這些「新的」函式傳給子元件，子元件會認為 props 改變了，導致不必要的重新渲染
- `useCallback` 可以讓函式在依賴項不變的情況下，保持相同的參考

{% note info %}
**useCallback 的使用時機：**
- 將函式傳遞給使用 `React.memo` 優化的子元件
- 函式作為其他 Hooks（如 `useEffect`）的依賴項
- 函式的創建成本很高（包含複雜運算）
- 不是每個函式都需要 `useCallback`，過度使用反而會降低效能
{% endnote %}

### 前置知識：React.memo

在理解 `useCallback` 之前，我們需要先了解 `React.memo`。`React.memo` 是一個高階元件（Higher-Order Component），用來優化函式元件的效能。

**React.memo 的作用：**
- 當父元件重新渲染時，子元件通常也會跟著重新渲染
- `React.memo` 會「淺比較」（shallow compare）子元件的 props
- 如果 props 沒有改變，就跳過重新渲染，直接使用上次的結果
- 這可以避免不必要的渲染，提升效能

```javascript React.memo 基本用法
import React from 'react';

// 一般的子元件（沒有優化）
function NormalChild({ name, age }) {
  console.log('NormalChild 重新渲染');
  return <div>{name} 今年 {age} 歲</div>;
}

// 使用 React.memo 優化的子元件
const MemoizedChild = React.memo(function OptimizedChild({ name, age }) {
  console.log('MemoizedChild 重新渲染');
  return <div>{name} 今年 {age} 歲</div>;
});

function Parent() {
  const [count, setCount] = React.useState(0);
  const name = 'Loki';
  const age = 30;
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        點擊次數：{count}
      </button>
      
      {/* 每次父元件渲染，這個子元件都會重新渲染 */}
      <NormalChild name={name} age={age} />
      
      {/* 因為 name 和 age 沒變，這個子元件不會重新渲染 */}
      <MemoizedChild name={name} age={age} />
    </div>
  );
}
```

{% note warning %}
**React.memo 的限制：淺比較的問題**

`React.memo` 只會進行「淺比較」（shallow compare），也就是用 `===` 來比較 props。這在以下情況會有問題：

```javascript
function Parent() {
  const [count, setCount] = React.useState(0);
  
  // ❌ 每次渲染都會創建新的物件，淺比較會認為不同
  const user = { name: 'Loki', age: 30 };
  
  // ❌ 每次渲染都會創建新的陣列，淺比較會認為不同
  const items = [1, 2, 3];
  
  // ❌ 每次渲染都會創建新的函式，淺比較會認為不同
  const handleClick = () => {
    console.log('clicked');
  };
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>計數：{count}</button>
      {/* 即使用了 React.memo，因為 handleClick 每次都是新的函式，還是會重新渲染 */}
      <MemoizedChild onButtonClick={handleClick} />
    </div>
  );
}
```

**這就是為什麼需要 `useCallback`！** 它可以讓函式在依賴項不變的情況下，保持相同的參考，讓 `React.memo` 的淺比較能正常運作。
{% endnote %}

### useCallback 基本用法

```javascript useCallback 基本用法
import React, { useState, useCallback } from 'react';

// 子元件 - 使用 React.memo 優化
const ChildComponent = React.memo(({ onButtonClick, count }) => {
  console.log('ChildComponent 重新渲染');
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <p>子元件接收到的計數：{count}</p>
      <button onClick={onButtonClick}>點擊我</button>
    </div>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // 沒有 useCallback - 每次渲染都會創建新的函式
  const handleClick1 = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  // 使用 useCallback - 只有依賴項改變時才會重新創建函式
  const handleClick2 = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // 空依賴陣列，函式永遠不會改變
  
  return (
    <div style={{ padding: '2rem' }}>
      <h2>父元件</h2>
      <p>計數：{count}</p>
      <p>其他狀態：{otherState}</p>
      
      <button 
        onClick={() => setOtherState(otherState + 1)}
        style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
      >
        改變其他狀態
      </button>
      
      {/* 使用 useCallback 優化的函式 */}
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
- **子元件優化**：將函式傳遞給子元件，且子元件使用 `React.memo` 優化
- **依賴項管理**：函式作為其他 Hooks 的依賴項
- **效能考量**：創建函式的成本很高
- **複雜邏輯**：函式包含複雜的邏輯或外部依賴
{% endnote %}

### 實際應用範例

```javascript useCallback 實際應用
import React, { useState, useCallback, useEffect } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 搜尋函式 - 依賴於 query
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
  }, [query]); // 只有 query 改變時才重新創建函式
  
  // 使用 searchUsers 作為 effect 的依賴項
  useEffect(() => {
    const timeoutId = setTimeout(searchUsers, 300); // 防抖動
    return () => clearTimeout(timeoutId);
  }, [searchUsers]);
  
  return (
    <div style={{ padding: '2rem' }}>
      <input
        type="text"
        placeholder="搜尋用戶。.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ 
          padding: '0.5rem', 
          margin: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      
      {loading && <div style={{ color: '#666' }}>搜尋中。..</div>}
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li 
            key={user.id}
            style={{ 
              padding: '0.5rem', 
              border: '1px solid #eee', 
              margin: '0.5rem 0' 
            }}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

{% note success %}
**跟著做：**
1. 觀察控制台輸出，了解 `useCallback` 如何避免不必要的函式重新創建
2. 嘗試移除 `useCallback`，看看效能差異
3. 修改依賴項陣列，觀察函式重新創建的時機
{% endnote %}

## useMemo

`useMemo` 返回一個記憶化的值，只有當依賴項改變時才會重新計算。這可以避免重複執行昂貴的計算，提升應用程式效能。

### 基本用法

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
    <div style={{ padding: '2rem' }}>
      <h3>總計：{expensiveValue}</h3>
      
      <input
        type="text"
        placeholder="過濾項目。.."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ 
          padding: '0.5rem', 
          margin: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredItems.map(item => (
          <li 
            key={item.id}
            style={{ 
              padding: '0.5rem', 
              border: '1px solid #eee', 
              margin: '0.5rem 0' 
            }}
          >
            {item.name} - {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

{% note info %}
**useMemo 使用時機：**
- **昂貴計算**：複雜的數學運算、資料處理
- **物件創建**：避免每次渲染都創建新物件
- **陣列操作**：過濾、排序、轉換大量資料
- **子元件優化**：配合 `React.memo` 使用
{% endnote %}

{% note warning %}
**useMemo 注意事項：**
- **不要過度使用**：記憶化本身也有成本
- **只對真正昂貴的計算使用**：簡單計算不需要記憶化
- **確保依賴陣列正確**：避免 stale closure 問題
- **不要依賴記憶化來保證語義正確性**：記憶化是優化，不是功能
{% endnote %}

## useDeferredValue

`useDeferredValue` 是 React 18 引入的 Hook，讓你可以延遲更新值，優化用戶體驗。當輸入框快速變化時，可以保持輸入的響應性，同時延遲昂貴的搜尋操作。

### 基本用法

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
    <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflow: 'auto' }}>
      {results.slice(0, 100).map(item => (
        <li 
          key={item.id}
          style={{ 
            padding: '0.5rem', 
            border: '1px solid #eee', 
            margin: '0.5rem 0' 
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

function DeferredSearch() {
  const [query, setQuery] = useState('');
  // 延遲更新的查詢值
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div style={{ padding: '2rem' }}>
      <input
        type="text"
        placeholder="搜尋。.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ 
          padding: '0.5rem', 
          margin: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '300px'
        }}
      />
      
      <div style={{ margin: '1rem 0' }}>
        <p><strong>當前輸入：</strong>{query}</p>
        <p><strong>延遲查詢：</strong>{deferredQuery}</p>
      </div>
      
      {/* 使用延遲的值進行搜尋，不會阻塞輸入 */}
      <SearchResults query={deferredQuery} />
    </div>
  );
}
```

{% note info %}
**useDeferredValue 使用時機：**
- **搜尋功能**：避免每次輸入都觸發昂貴的搜尋
- **大量資料渲染**：延遲渲染大量列表項目
- **複雜計算**：延遲執行複雜的資料處理
- **保持響應性**：確保用戶輸入始終保持響應
{% endnote %}

## useTransition

`useTransition` 讓你可以將狀態更新標記為過渡，避免阻塞緊急的更新。這對於保持用戶界面的響應性非常重要，特別是在處理大量資料時。

### 基本用法

```javascript useTransition 基本用法
import React, { useState, useTransition } from 'react';

function SlowList({ query }) {
  const items = [];
  
  // 模擬慢速的列表渲染
  for (let i = 0; i < 5000; i++) {
    if (`項目 ${i}`.includes(query)) {
      items.push(
        <li 
          key={i}
          style={{ 
            padding: '0.5rem', 
            border: '1px solid #eee', 
            margin: '0.5rem 0' 
          }}
        >
          項目 {i}
        </li>
      );
    }
  }
  
  return <ul style={{ listStyle: 'none', padding: 0 }}>{items}</ul>;
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
    <div style={{ padding: '2rem' }}>
      <input
        type="text"
        placeholder="搜尋。.."
        value={query}
        onChange={handleInputChange}
        style={{ 
          padding: '0.5rem', 
          margin: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '300px'
        }}
      />
      
      {isPending && (
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          更新中。..
        </div>
      )}
      
      <SlowList query={displayQuery} />
    </div>
  );
}
```

{% note info %}
**useTransition 使用時機：**
- **大量資料渲染**：避免阻塞用戶輸入
- **複雜狀態更新**：將非緊急更新標記為過渡
- **保持響應性**：確保用戶操作始終保持響應
- **優化用戶體驗**：提供載入狀態指示
{% endnote %}

{% note success %}
**跟著做：**
1. 嘗試快速輸入，觀察 `isPending` 狀態的變化
2. 比較使用和不使用 `useTransition` 的差異
3. 觀察輸入框的響應性是否保持流暢
{% endnote %}

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

// 定義 reducer 函式
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
- 避免過度使用，大多數情況下 props 和回調函式就足夠了
- 主要用於與第三方 DOM 函式庫整合或建立可重用的元件函式庫
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
    // subscribe 函式
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    // getSnapshot 函式
    () => ({
      width: window.innerWidth,
      height: window.innerHeight
    }),
    // getServerSnapshot 函式（SSR 支持）
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
- 與第三方狀態管理函式庫整合（Redux, Zustand 等）
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

`useInsertionEffect` 在所有 DOM 變更之前觸發，主要用於 CSS-in-JS 函式庫。

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
- 函式記憶化：`useCallback`
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
5. **遵循 Hooks 規則**：確保 Hooks 在元件頂層調用，避免條件調用

透過掌握這些 Hooks 和規則，您將能夠構建高效、現代的 React 應用程式！

{% note success %}
**跟著做：**
試著在您的專案中逐步導入這些 Hooks，從基礎 Hooks 開始，再根據需求添加優化和進階功能。記住，最好的學習方法就是實際應用！
{% endnote %}