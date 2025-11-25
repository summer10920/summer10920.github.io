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
  - JavaScript 程式設計（假日班）
date: 2025-10-26 13:16:22
hidden: false
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

`useCallback` 是一個用來「記憶化函式」的 Hook。它可以讓函式在多次渲染之間保持相同的參考（reference），避免不必要的函式重新創建，主要用於效能優化。

### 前置知識：React.memo
在了解 `useCallback` 之前，必須先認識 `React.memo`。它是 React 提供的效能優化工具，可以避免子元件不必要的重新渲染。

#### React.memo 的作用
在 React 中，父元件每次重新渲染時，預設所有子元件也會一併重新渲染，無論子元件的 props 是否有變動。`React.memo` 是一個高階元件（Higher-Order Component, HOC），能夠「記憶」子元件的 props，僅在 props 發生變化時才觸發子元件重新渲染。

你只需將子元件包裹在 `React.memo` 外層，React 就會自動幫你比較 props，只有當 props 內容真的不同時，才會重新渲染該子元件，從而有效減少不必要的渲染、提升效能。

```javascript React.memo 完整對比範例
import React, { useState } from 'react';

// 1. 普通元件（沒有使用 memo）
function NormalChild() {
  console.log('❌ NormalChild 重新渲染了');
  return (
    <div>
      <h4>普通元件（無 memo）</h4>
      <p>我沒有使用 React.memo，每次父元件渲染都會跟著渲染</p>
    </div>
  );
}

// 2. 使用 memo 但沒有 props 的元件
const MemoChildWithoutProps = React.memo(function MemoChildNoProp() {
  console.log('✅ MemoChildWithoutProps 重新渲染了');
  return (
    <div>
      <h4>Memo 元件（無 props）</h4>
      <p>我使用了 React.memo 且沒有 props，父元件渲染時我不會重新渲染</p>
    </div>
  );
});

// 3. 使用 memo 且有 props 的元件
const MemoChildWithProps = React.memo(function MemoChildWithProp({ userName }) {
  console.log('🔍 MemoChildWithProps 重新渲染了');
  return (
    <div>
      <h4>Memo 元件（有 props）</h4>
      <p>使用者名稱：{userName}</p>
      <p>我使用了 React.memo，只有當 userName 改變時才會重新渲染</p>
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState('Loki');
  
  return (
    <div>
      <h2>父元件狀態</h2>
      <p>計數：{count}</p>
      <p>使用者名稱：{userName}</p>
      
      <button onClick={() => setCount(count + 1)}>
        增加計數（不影響 userName）
      </button>
      <button onClick={() => setUserName(userName === 'Loki' ? 'Thor' : 'Loki')}>
        切換使用者名稱
      </button>
      
      <hr />
      
      {/* 1. 普通元件：每次都會重新渲染 */}
      <NormalChild />
      
      <hr />
      
      {/* 2. Memo 元件（無 props）：永遠不會重新渲染 */}
      <MemoChildWithoutProps />
      
      <hr />
      
      {/* 3. Memo 元件（有 props）：只有 userName 改變時才會重新渲染 */}
      <MemoChildWithProps userName={userName} />
    </div>
  );
}

export default Parent;
```

**測試步驟與執行結果：**

**步驟 1：初次載入頁面**
```
❌ NormalChild 重新渲染了
✅ MemoChildWithoutProps 重新渲染了
🔍 MemoChildWithProps 重新渲染了
```
說明：所有元件都會進行初次渲染

**步驟 2：點擊「增加計數」按鈕**
```
❌ NormalChild 重新渲染了
```
說明：
- `NormalChild`：沒有使用 memo，跟著父元件一起渲染 ❌
- `MemoChildWithoutProps`：使用 memo 且無 props，不需要重新渲染 ✅
- `MemoChildWithProps`：使用 memo，props 沒變（`userName` 還是 'Loki'），不需要重新渲染 ✅

**步驟 3：點擊「切換使用者名稱」按鈕**
```
❌ NormalChild 重新渲染了
🔍 MemoChildWithProps 重新渲染了
```
說明：
- `NormalChild`：沒有使用 memo，跟著父元件一起渲染 ❌
- `MemoChildWithoutProps`：使用 memo 且無 props，不需要重新渲染 ✅
- `MemoChildWithProps`：props 改變了（`userName` 從 'Loki' 變成 'Thor'），需要重新渲染 ⚠️

**React.memo 的運作原理：**
```javascript
// 當父元件重新渲染時，React.memo 會進行檢查

// 1. NormalChild（無 memo）
// → 直接重新渲染，不做任何檢查

// 2. MemoChildWithoutProps（memo + 無 props）
舊的 props: {}
新的 props: {}
// → props 沒變，跳過重新渲染 ✅

// 3. MemoChildWithProps（memo + 有 props）
// 情況 A：點擊「增加計數」
舊的 props: { userName: 'Loki' }
新的 props: { userName: 'Loki' }
'Loki' === 'Loki'  // true
// → props 沒變，跳過重新渲染 ✅

// 情況 B：點擊「切換使用者名稱」
舊的 props: { userName: 'Loki' }
新的 props: { userName: 'Thor' }
'Loki' === 'Thor'  // false
// → props 改變了，需要重新渲染 ⚠️
```

{% note success %}
**React.memo 的優點：** 
- 可以避免子元件不必要的重新渲染
- 當子元件的渲染成本很高時（複雜的 UI 或大量資料處理），可以顯著提升效能
- 會自動進行淺比較，只在 props 改變時才重新渲染
- 對於基本類型的 props（string、number、boolean），淺比較運作良好
{% endnote %}

#### children 也是 prop

在 React 中，`children` 是一個特殊的 prop，代表元件標籤之間的內容。

```javascript
// 這兩種寫法是等價的：
<MemoChild>Hello</MemoChild>
<MemoChild children="Hello" />

// children 會被當作 props 的一部分
function MemoChild(props) {
  console.log(props.children); // "Hello"
}
```

**React.memo 也會檢查 children：**

```javascript children 作為 prop 的範例
import React, { useState } from 'react';

const MemoChildWithChildren = React.memo(function MemoChild({ children }) {
  console.log('MemoChildWithChildren 重新渲染了');
  return <div>{children}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>計數：{count}</button>
      
      {/* children 是固定的字串，不會重新渲染 */}
      <MemoChildWithChildren>
        固定的文字內容
      </MemoChildWithChildren>
      
      {/* children 包含 count，會重新渲染 */}
      <MemoChildWithChildren>
        計數：{count}
      </MemoChildWithChildren>
    </div>
  );
}
```

**執行結果：**
- 點擊按鈕時，第一個 `MemoChildWithChildren`（固定文字）不會重新渲染
- 第二個 `MemoChildWithChildren`（包含 count）會重新渲染，因為 children 改變了

**結論：** `children` 是 prop 的一部分，React.memo 會一併檢查它是否改變。

#### React.memo 的限制：淺比較問題

`React.memo` 使用「淺比較」（Shallow Comparison）來檢查 props 是否改變，也就是用 `===` 運算子來比較。這在傳遞**函式**作為 props 時會產生問題。

```javascript 函式導致的重新渲染問題
import React, { useState } from 'react';

// 使用 React.memo 優化的子元件
const Button = React.memo(({ onClick, children }) => {
  console.log(`Button "${children}" 重新渲染了！`);
  return <button onClick={onClick}>{children}</button>;
});

function Counter() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // ❌ 問題：每次元件渲染時，都會創建新的函式
  const increment = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <h2>計數：{count}</h2>
      <h3>其他狀態：{otherState}</h3>
      
      {/* 即使用了 React.memo，increment 每次都是新的函式，Button 還是會重新渲染 */}
      <Button onClick={increment}>增加計數</Button>
      
      {/* 當這個按鈕被點擊時，otherState 改變，導致 Counter 重新渲染 */}
      <button onClick={() => setOtherState(otherState + 1)}>
        改變其他狀態
      </button>
    </div>
  );
}

export default Counter;
```

當點擊「改變其他狀態」時，Button 仍會重新渲染。讓我們一步步分析為什麼 `Button` 會重新渲染：

**第一次渲染：**
```javascript
// Counter 渲染時創建 increment 函式
const increment = () => { setCount(count + 1); };  // 記憶體位置：0x001

// Button 收到 onClick prop（參考 0x001）
<Button onClick={increment}>
```

**點擊「改變其他狀態」後：**
```javascript
// otherState 改變，Counter 重新渲染
// 重新創建 increment 函式（新的函式物件！）
const increment = () => { setCount(count + 1); };  // 記憶體位置：0x002

// Button 收到新的 onClick prop（參考 0x002）
<Button onClick={increment}>

// React.memo 檢查：0x001 === 0x002 ? → false
// 結論：props 改變了，需要重新渲染 Button
```

{% note danger %}
**核心問題：**
- 每次 `Counter` 重新渲染時，`increment` 函式都會被重新創建
- 雖然函式的程式碼相同，但每次都是**新的函式物件**（不同的記憶體位置）
- `React.memo` 使用 `===` 進行淺比較：`新函式 === 舊函式` 結果是 `false`
- 所以 `React.memo` 認為 props 改變了，導致 `Button` 重新渲染
- **即使我們沒有點擊「增加計數」按鈕，只是改變了其他狀態，`Button` 還是會不必要地重新渲染！**
{% endnote %}

**你可能會想：「重新渲染一個按鈕有什麼關係？」**

在這個簡單範例中確實影響不大，但在實際應用中：
- 子元件可能包含複雜的 UI 結構（數百個元素）
- 子元件可能有複雜的計算邏輯
- 可能有很多個子元件同時重新渲染
- 會造成頁面卡頓、效能下降

**這就是為什麼需要 `useCallback`！** 它可以讓函式在依賴項不變時保持相同的參考，讓 `React.memo` 的優化能正常運作。

### useCallback 語法

`useCallback` 可以解決上述問題，讓函式在依賴項不變時保持相同的參考。

**語法結構：**
```javascript
const memoizedCallback = useCallback(
  () => {
    // 函式內容
  },
  [依賴項 1, 依賴項 2, ...]
);
```

**參數說明：**
- **第一個參數**：要記憶化的函式
- **第二個參數**：依賴項陣列（Dependency Array）
  - 當依賴項改變時，會重新創建函式
  - 當依賴項不變時，會返回上次記憶的函式（相同的參考）

### 使用 useCallback

讓我們用 `useCallback` 改善前面的問題：

```javascript 使用 useCallback 優化
import React, { useState, useCallback } from 'react';

const Button = React.memo(({ onClick, children }) => {
  console.log(`Button "${children}" 重新渲染了！`);
  return <button onClick={onClick}>{children}</button>;
});

function Counter() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // ✅ 使用 useCallback，依賴項為空陣列
  // 函式會在元件初次渲染時創建，之後保持相同的參考
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // 空陣列表示函式永遠不會重新創建
  
  return (
    <div>
      <h2>計數：{count}</h2>
      <h3>其他狀態：{otherState}</h3>
      
      {/* 現在 increment 的參考不會改變，Button 不會重新渲染 */}
      <Button onClick={increment}>增加計數</Button>
      
      <button onClick={() => setOtherState(otherState + 1)}>
        改變其他狀態
      </button>
    </div>
  );
}

export default Counter;
```

**效果：**
- 點擊「改變其他狀態」按鈕時，`Counter` 重新渲染
- `increment` 函式保持相同的參考（因為使用了 `useCallback`）
- `Button` 子元件不會重新渲染（`React.memo` 檢查到 `onClick` prop 沒變）

{% note success %}
**重點：** 使用 `useCallback` + `React.memo` 可以有效避免子元件不必要的重新渲染，提升應用程式效能。
{% endnote %}

### 理解依賴項陣列

依賴項陣列是 `useCallback` 最重要的概念，它決定了函式何時需要重新創建。

#### 案例 1：空依賴項陣列 `[]`
空陣列表示「沒有任何依賴項」，函式只會在元件初次渲染時創建一次，之後永遠保持相同的參考。

```javascript 空依賴項
import React, { useState, useCallback } from 'react';

function Example1() {
  const [count, setCount] = useState(0);
  
  // ✅ 依賴項為空陣列，函式只在初次渲染時創建一次
  const handleClick = useCallback(() => {
    console.log('按鈕被點擊');
    // 使用 updater function 確保拿到最新的 count
    setCount(prevCount => prevCount + 1);
  }, []); // 永遠不會重新創建
  
  return (
    <div>
      <p>計數：{count}</p>
      <button onClick={handleClick}>增加</button>
    </div>
  );
}
```

#### 案例 2：有依賴項的情況
當你的函式內部會用到外部的 state 或 props（例如 `todos`、`filter`），就必須將這些變數加入依賴項陣列。這樣只有當這些依賴發生變化時，`useCallback` 才會重新產生新的函式，確保每次取得的都是最新的資料，避免出現舊值或預期外的行為。

以下以 Todo 列表為例，說明如何正確設置依賴項。因為函式內部使用了 `todos` 和 `filter`，所以必須將它們加入依賴項陣列。當這些值改變時，函式才需要重新創建以獲取最新的值。

```javascript 有依賴項
import React, { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  
  // ✅ 依賴 filter，當 filter 改變時函式會重新創建
  const getFilteredTodos = useCallback(() => {
    console.log('重新創建 getFilteredTodos 函式');
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  }, [todos, filter]); // 當 todos 或 filter 改變時重新創建
  
  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">全部</option>
        <option value="active">進行中</option>
        <option value="completed">已完成</option>
      </select>
      
      <ul>
        {getFilteredTodos().map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 案例 3：依賴項錯誤的問題
在使用 `useCallback` 時，常見的錯誤是忘記將函式內部用到的外部變數（如 state 或 props）加入依賴項陣列。這會導致函式「記憶」了舊的變數值，產生預期外的行為。

```javascript 錯誤的依賴項
import React, { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // ❌ 錯誤：函式內使用了 count，但沒有將它加入依賴項
  const showCount = useCallback(() => {
    alert(`目前計數：${count}`);
  }, []); // 缺少 count 依賴項
  
  // 問題：showCount 永遠只會顯示初始值 0
  // 因為函式只創建一次，閉包捕獲的 count 永遠是 0
  
  return (
    <div>
      <p>計數：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={showCount}>顯示計數</button>
    </div>
  );
}
```

正確做法是：**只要在 callback 內部用到的外部變數，都必須出現在依賴陣列中**。這樣才能確保每次相關變數變動時，callback 也會更新，避免閉包陷阱。

```javascript 正確的做法
import React, { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // ✅ 正確：將 count 加入依賴項
  const showCount = useCallback(() => {
    alert(`目前計數：${count}`);
  }, [count]); // 當 count 改變時重新創建函式
  
  return (
    <div>
      <p>計數：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={showCount}>顯示計數</button>
    </div>
  );
}
```

{% note warning %}
**重要提醒：** 
- 函式內使用的所有外部變數（state、props、其他變數）都應該加入依賴項陣列
- 缺少依賴項會導致閉包陷阱（Stale Closure），函式捕獲的是舊的值
- React 開發工具會提示缺少的依賴項，務必注意這些警告
{% endnote %}

### 與 useEffect 搭配使用

`useCallback` 常用於配合 `useEffect`，避免 effect 不必要的重新執行。這個範例展示了如何結合 `useCallback` 與 `useEffect` 來優化搜尋功能。

- **useCallback 的作用：**
將 `searchUsers` 這個搜尋函式記憶化，只有當 `query`（搜尋關鍵字）改變時才會重新創建。這樣可以確保 `searchUsers` 的參考在 `query` 沒變時保持不變，避免因為函式參考改變導致 `useEffect` 重複執行。
- **useEffect 的作用：**
當 `searchUsers`（也就是 `query`）改變時，延遲 500ms 執行搜尋（實現防抖效果，減少 API 請求次數）。如果在 500ms 內又輸入新字元，會先清除前一次的計時器，只有使用者停止輸入一段時間才會真正發送請求。

當你需要在 effect 內呼叫一個 callback 函式，且這個函式依賴某些 state/props 時，建議用 `useCallback` 包裹，並將 callback 作為 effect 的依賴項。這樣可以避免每次渲染都重新創建函式，導致 effect 不斷重複執行，提升效能與可控性。

```javascript useCallback 與 useEffect
import React, { useState, useCallback, useEffect } from 'react';

function SearchUser() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  // ✅ 使用 useCallback 記憶搜尋函式
  const searchUsers = useCallback(async () => {
    if (!query) return;
    
    console.log(`搜尋：${query}`);
    const response = await fetch(`/api/users?q=${query}`);
    const data = await response.json();
    setResults(data);
  }, [query]); // 只有 query 改變時才重新創建
  
  // ✅ 使用 searchUsers 作為依賴項
  useEffect(() => {
    // 延遲 500ms 執行搜尋（防抖）
    const timer = setTimeout(searchUsers, 500);
    return () => clearTimeout(timer);
  }, [searchUsers]); // searchUsers 改變時才重新執行
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋使用者"
      />
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**為什麼需要 useCallback？**
- 如果不用 `useCallback`，`searchUsers` 每次渲染都會重新創建
- `useEffect` 的依賴項 `searchUsers` 會不斷改變
- 導致 effect 不斷重新執行，造成效能問題

### 何時該使用 useCallback？

**適合使用的情況：**
1. 將函式傳遞給使用 `React.memo` 優化的子元件
2. 函式作為 `useEffect`、`useCallback`、`useMemo` 等 Hook 的依賴項
3. 函式在自訂 Hook 中被返回，並可能被其他元件當作依賴項使用

**不需要使用的情況：**
1. 函式只在元件內部使用，沒有傳遞給子元件
2. 函式不是任何 Hook 的依賴項
3. 子元件沒有使用 `React.memo` 優化

**注意：** 過度使用 `useCallback` 反而會增加記憶體開銷和複雜度，只在真正需要優化時使用。

## useMemo

`useMemo` 是一個用來「記憶化計算結果」的 Hook。它可以讓計算結果在多次渲染之間被重複使用，避免不必要的重複計算，主要用於效能優化。需要注意的是，`useMemo` 記憶的是「值」而非「元件」，與 `React.memo` 記憶元件渲染結果的用途不同。

### 為什麼需要 useMemo？

在 React 中，每次元件重新渲染時，所有的變數和計算都會重新執行。如果有昂貴的計算（複雜運算、大量資料處理），每次渲染都重新計算會造成效能問題。

```javascript 沒有使用 useMemo 的問題
import React, { useState } from 'react';

function ProductList() {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // 假設有大量商品資料
  const products = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `商品 ${i}`,
    price: Math.floor(Math.random() * 1000),
    category: i % 3 === 0 ? '電子' : i % 3 === 1 ? '服飾' : '食品'
  }));
  
  // ❌ 問題：每次元件渲染都會重新過濾和排序（即使 products、filter、sortOrder 都沒變）
  console.log('開始計算。..');
  const filteredProducts = products
    .filter(p => p.name.includes(filter))
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
  console.log('計算完成！');
  
  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="搜尋商品"
      />
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        排序：{sortOrder === 'asc' ? '低到高' : '高到低'}
      </button>
      
      <p>找到 {filteredProducts.length} 個商品</p>
      <ul>
        {filteredProducts.slice(0, 20).map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}
```

**問題：** 即使只是輸入搜尋關鍵字（改變 `filter`），整個 10000 筆資料的過濾和排序運算都會重新執行，造成明顯的卡頓。

{% note danger %}
**核心問題：**
- 每次渲染時，`filteredProducts` 的計算都會重新執行
- 即使 `products`、`filter`、`sortOrder` 都沒變，還是會重新計算
- 大量資料的過濾和排序非常耗時，導致輸入延遲、畫面卡頓
{% endnote %}

### useMemo 語法

`useMemo` 可以解決上述問題，讓計算結果在依賴項不變時被重複使用。

**語法結構：**
```javascript
const memoizedValue = useMemo(
  () => {
    // 計算邏輯
    return 計算結果；
  },
  [依賴項 1, 依賴項 2, ...]
);
```

**參數說明：**
- **第一個參數**：計算函式，返回要記憶化的值
- **第二個參數**：依賴項陣列（Dependency Array）
  - 當依賴項改變時，會重新執行計算
  - 當依賴項不變時，會返回上次記憶的結果（不重新計算）

**重要：** `useMemo` 記憶的是「計算結果」（值），而 `useCallback` 記憶的是「函式」本身。

### 使用 useMemo 優化

讓我們用 `useMemo` 改善前面的問題：

```javascript 使用 useMemo 優化
import React, { useState, useMemo } from 'react';

function ProductList() {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const products = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `商品 ${i}`,
    price: Math.floor(Math.random() * 1000),
    category: i % 3 === 0 ? '電子' : i % 3 === 1 ? '服飾' : '食品'
  }));
  
  // ✅ 使用 useMemo，只有當 products、filter、sortOrder 改變時才重新計算
  const filteredProducts = useMemo(() => {
    console.log('開始計算。..');
    const result = products
      .filter(p => p.name.includes(filter))
      .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    console.log('計算完成！');
    return result;
  }, [products, filter, sortOrder]); // 依賴項：這三個值改變時才重新計算
  
  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="搜尋商品"
      />
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        排序：{sortOrder === 'asc' ? '低到高' : '高到低'}
      </button>
      
      <p>找到 {filteredProducts.length} 個商品</p>
      <ul>
        {filteredProducts.slice(0, 20).map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
```

**效果：**
- 初次渲染時會執行計算
- 之後只有當 `filter` 或 `sortOrder` 改變時才會重新計算
- 其他原因造成的重新渲染（例如父元件更新）不會觸發計算
- 輸入更流暢，沒有卡頓

{% note success %}
**重點：** 使用 `useMemo` 可以避免昂貴的計算在每次渲染時都重新執行，顯著提升效能。
{% endnote %}

### 理解依賴項陣列

依賴項陣列決定了何時需要重新計算。

#### 案例 1：空依賴項陣列 `[]`

```javascript 空依賴項
import React, { useState, useMemo } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  // ✅ 依賴項為空陣列，只在初次渲染時計算一次
  const expensiveValue = useMemo(() => {
    console.log('執行昂貴的計算');
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }
    return result;
  }, []); // 永遠不會重新計算
  
  return (
    <div>
      <p>計算結果：{expensiveValue}</p>
      <p>計數：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加計數</button>
    </div>
  );
}
```

**說明：** 空陣列表示「沒有依賴項」，計算只會在元件初次渲染時執行一次，之後永遠返回同一個結果。

#### 案例 2：有依賴項的情況

```javascript 有依賴項
import React, { useState, useMemo } from 'react';

function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: '商品 A', price: 100, quantity: 2 },
    { id: 2, name: '商品 B', price: 200, quantity: 1 },
    { id: 3, name: '商品 C', price: 150, quantity: 3 }
  ]);
  const [discount, setDiscount] = useState(0);
  
  // ✅ 依賴 items 和 discount，當這兩個值改變時才重新計算
  const totalPrice = useMemo(() => {
    console.log('計算總價。..');
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal * (1 - discount / 100);
  }, [items, discount]); // 當 items 或 discount 改變時重新計算
  
  return (
    <div>
      <h3>購物車</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      
      <div>
        <label>折扣（%）：</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </div>
      
      <h2>總價：${totalPrice.toFixed(2)}</h2>
    </div>
  );
}
```

**說明：** 因為計算總價需要用到 `items` 和 `discount`，所以必須將它們加入依賴項陣列。當這些值改變時，總價才需要重新計算。

### useMemo vs useCallback
這兩個 Hook 容易混淆，讓我們清楚比較：

- `useMemo(() => 計算結果，[依賴項])` → 記憶計算結果
- `useCallback（函式，[依賴項])` → 記憶函式本身
- `useCallback(fn, deps)` 等於 `useMemo(() => fn, deps)`

```javascript useMemo vs useCallback
import React, { useMemo, useCallback } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  // useMemo：記憶「計算結果」（值）
  const expensiveValue = useMemo(() => {
    return count * 2; // 返回計算結果
  }, [count]);
  
  // useCallback：記憶「函式」本身
  const handleClick = useCallback(() => {
    setCount(count + 1); // 返回函式
  }, [count]);
  
  // 等價寫法：
  // const handleClick = useMemo(() => {
  //   return () => setCount(count + 1); // 返回一個函式
  // }, [count]);
  
  console.log(typeof expensiveValue); // "number" - 是值
  console.log(typeof handleClick);     // "function" - 是函式
}
```

### useMemo 與 React.memo 搭配使用

`useMemo` 可以配合 `React.memo` 避免子元件不必要的重新渲染：

```javascript useMemo 與 React.memo 搭配
import React, { useState, useMemo } from 'react';

// 使用 React.memo 優化的子元件
const ProductList = React.memo(({ products }) => {
  console.log('ProductList 重新渲染');
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
});

function Shop() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  
  const allProducts = [
    { id: 1, name: '蘋果' },
    { id: 2, name: '香蕉' },
    { id: 3, name: '橘子' }
  ];
  
  // ❌ 沒有 useMemo：每次渲染都創建新陣列，ProductList 會重新渲染
  // const filteredProducts = allProducts.filter(p => 
  //   p.name.includes(filter)
  // );
  
  // ✅ 使用 useMemo：只有 filter 改變時才創建新陣列
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => p.name.includes(filter));
  }, [filter]);
  
  return (
    <div>
      <p>計數：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加計數</button>
      
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="搜尋商品"
      />
      
      {/* 因為 filteredProducts 使用 useMemo，只有 filter 改變時才會重新渲染 */}
      <ProductList products={filteredProducts} />
    </div>
  );
}
```

**說明：**
- 點擊「增加計數」時，`count` 改變但 `filter` 沒變
- `filteredProducts` 返回相同的陣列參考（因為 `useMemo`）
- `ProductList` 的 props 沒變，不會重新渲染（因為 `React.memo`）

### 何時該使用 useMemo？

**適合使用的情況：**
1. **昂貴的計算**：複雜的數學運算、大量資料處理、排序、過濾
2. **避免物件/陣列重新創建**：配合 `React.memo` 使用
3. **計算依賴項明確**：計算結果只依賴特定的值

**不需要使用的情況：**
1. **簡單計算**：`a + b`、字串拼接等低成本運算
2. **計算很快**：執行時間小於 1ms 的運算
3. **每次都需要最新值**：依賴項頻繁變動

**注意：** 過度使用 `useMemo` 反而會增加記憶體開銷和程式碼複雜度。只在真正需要優化時使用，不要為了優化而優化。

{% note warning %}
**重要提醒：**
- 計算函式內使用的所有外部變數（state、props）都應該加入依賴項陣列
- 缺少依賴項會導致使用舊的值，產生 bug
- `useMemo` 是效能優化，不應該用於保證功能正確性
- React 可能會在某些情況下丟棄記憶的值（例如記憶體不足），所以計算函式必須是純函式
{% endnote %}

## useDeferredValue
`useDeferredValue` 是 React 18 引入的 Hook，可以將某個值的更新「延遲」到較不緊急的時機執行。它的主要作用是在快速輸入或頻繁更新時，優先保持 UI 的響應性，延後處理耗時的運算或渲染。

### 為什麼需要 useDeferredValue？

在某些情況下，我們會遇到「輸入卡頓」的問題：使用者在輸入框打字時，因為每次輸入都觸發大量計算或渲染，導致輸入延遲、體驗變差。

```javascript 沒有使用 useDeferredValue 的問題
import React, { useState } from 'react';

// 渲染大量搜尋結果的元件
function SearchResults({ query }) {
  // 模擬搜尋 10000 筆資料
  const results = [];
  for (let i = 0; i < 10000; i++) {
    if (`項目 ${i}`.includes(query)) {
      results.push({ id: i, name: `項目 ${i}` });
    }
  }
  
  console.log(`渲染 ${results.length} 個搜尋結果`);
  
  return (
    <ul>
      {results.slice(0, 100).map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function SearchApp() {
  const [query, setQuery] = useState('');
  
  return (
    <div>
      <input
        type="text"
        placeholder="搜尋。.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {/* ❌ 問題：每次輸入都立即觸發 10000 筆資料的搜尋和渲染 */}
      <SearchResults query={query} />
    </div>
  );
}
```

**問題分析：**
1. 使用者在輸入框快速打字：例如輸入 "react"
2. 每打一個字母（r → e → a → c → t），`query` state 都會更新
3. 每次更新都立即觸發 `SearchResults` 重新渲染
4. 搜尋 10000 筆資料非常耗時，導致輸入框卡頓、延遲

{% note danger %}
**核心問題：**
- 輸入框的更新（高優先級）被耗時的搜尋運算（低優先級）阻塞
- 使用者會感受到明顯的輸入延遲，體驗很差
- 即使使用 `useMemo` 也無法解決，因為每次輸入 `query` 確實改變了，必須重新計算
{% endnote %}

### useDeferredValue 語法

`useDeferredValue` 可以解決這個問題，它會告訴 React：「這個值的更新可以延後處理，先處理更重要的事情（例如輸入框更新）」。

**語法結構：**
```javascript
const deferredValue = useDeferredValue(value);
```

**參數說明：**
- **參數**：要延遲更新的值（通常是 state）
- **返回值**：延遲版本的值
  - 初次渲染時，`deferredValue` 等於 `value`
  - 更新時，`deferredValue` 會「延遲」更新，優先處理其他更新

**運作原理：**
```javascript
const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

// 使用者輸入 "r"
// 1. query 立即更新為 "r"（高優先級）
// 2. 輸入框立即顯示 "r"
// 3. deferredQuery 延後更新為 "r"（低優先級）
// 4. 搜尋結果使用 deferredQuery，不會阻塞輸入
```

### 使用 useDeferredValue 優化

讓我們用 `useDeferredValue` 改善前面的問題：

```javascript 使用 useDeferredValue 優化
import React, { useState, useDeferredValue, useMemo } from 'react';

function SearchResults({ query }) {
  // 使用 useMemo 避免重複計算
  const results = useMemo(() => {
    const items = [];
    for (let i = 0; i < 10000; i++) {
      if (`項目 ${i}`.includes(query)) {
        items.push({ id: i, name: `項目 ${i}` });
      }
    }
    console.log(`計算完成：找到 ${items.length} 個結果`);
    return items;
  }, [query]);
  
  return (
    <div>
      <p>找到 {results.length} 個結果</p>
      <ul>
        {results.slice(0, 100).map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

function SearchApp() {
  const [query, setQuery] = useState('');
  
  // ✅ 使用 useDeferredValue 延遲查詢值的更新
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      <h2>搜尋功能</h2>
      <input
        type="text"
        placeholder="搜尋。.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <div>
        <p>當前輸入：{query}</p>
        <p>延遲查詢：{deferredQuery}</p>
      </div>
      
      {/* 使用延遲的值進行搜尋，不會阻塞輸入框 */}
      <SearchResults query={deferredQuery} />
    </div>
  );
}

export default SearchApp;
```

**效果對比：**

**沒有使用 useDeferredValue：**
- 快速輸入 "123" 時
- 每個字元都會立即觸發搜尋
- 輸入框卡頓、延遲明顯

**使用 useDeferredValue：**
- 快速輸入 "123" 時
- 輸入框立即響應，顯示 "1" → "12" → "123"（流暢）
- 搜尋結果稍後更新，使用延遲的值
- 輸入體驗流暢，沒有卡頓

{% note success %}
**重點：** `useDeferredValue` 讓 React 知道某些更新可以延後處理，優先保持 UI 的響應性，提升使用者體驗。
{% endnote %}

### 顯示載入狀態

可以透過比較 `value` 和 `deferredValue` 來判斷是否正在延遲更新，顯示載入提示：

```javascript 顯示載入狀態
import React, { useState, useDeferredValue, useMemo } from 'react';

function SearchResults({ query, isPending }) {
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
    <div style={{ opacity: isPending ? 0.5 : 1 }}>
      {isPending && <p>搜尋中。..</p>}
      <p>找到 {results.length} 個結果</p>
      <ul>
        {results.slice(0, 100).map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

function SearchApp() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  // 判斷是否正在延遲更新
  const isPending = query !== deferredQuery;
  
  return (
    <div>
      <input
        type="text"
        placeholder="搜尋。.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <SearchResults query={deferredQuery} isPending={isPending} />
    </div>
  );
}
```

**說明：**
- `isPending` 為 `true` 表示延遲更新尚未完成
- 可以降低透明度或顯示載入提示，讓使用者知道正在處理
- 不會阻塞輸入，使用者可以繼續打字

### useDeferredValue vs 防抖（Debounce）
{% note info %}
**什麼是防抖（Debounce）？**

防抖（Debounce）是一種常見的前端優化技巧，主要用來「限制某個動作的觸發頻率」。舉例來說，當使用者在搜尋框輸入文字時，每輸入一個字元就發送一次 API 請求，會造成伺服器壓力過大。防抖的做法是：**只有當使用者停止輸入一段時間後，才真正執行搜尋**。如果在這段時間內又有新的輸入，計時器會重新開始，直到使用者暫停輸入才會觸發。

常見應用場景：
- 搜尋建議（Autocomplete）
- 表單驗證
- 視窗大小調整（resize）事件

簡單來說，防抖就是「等你不動了，我才做事」。
{% endnote %}

這兩種技術都能優化輸入體驗，但有不同的特點：

```javascript 防抖（Debounce）的做法
import React, { useState, useEffect } from 'react';

function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // 使用 useEffect 實現防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 停止輸入 500ms 後才更新
    
    return () => clearTimeout(timer);
  }, [query]);
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchResults query={debouncedQuery} />
    </div>
  );
}
```

**useDeferredValue vs Debounce 比較：**

| 特性           | useDeferredValue             | Debounce                        |
| -------------- | ---------------------------- | ------------------------------- |
| **更新時機**   | 根據 React 的調度機制決定    | 固定延遲時間（例如 500ms）      |
| **即時反應**   | 立即開始處理，只是優先級較低 | 必須等待延遲時間結束            |
| **可中斷性**   | 可以被更高優先級的更新中斷   | 不可中斷，計時器到了就執行      |
| **使用複雜度** | 簡單，一行程式碼             | 需要 useEffect + setTimeout     |
| **適用場景**   | 需要立即回應但可延遲渲染     | 需要限制執行頻率（如 API 請求） |

**選擇建議：**
- **使用 useDeferredValue**：當你想要優化渲染效能，保持輸入流暢
- **使用 Debounce**：當你想要限制 API 請求次數，減少伺服器負擔

### 實際應用範例
這個範例展示如何結合 `useDeferredValue` 與 `useMemo` 來優化大量資料的搜尋與渲染效能。

- **useDeferredValue**：
當使用者輸入搜尋關鍵字時，`searchQuery` 會即時更新，但 `deferredSearchQuery` 會「延遲」更新。這樣可以讓 React 優先處理高優先級的互動（如輸入框的即時回饋），而將大量資料的過濾與渲染延後執行，避免畫面卡頓，提升使用者體驗。
- **useMemo**：
用來記憶化（cache）產品資料的產生與篩選結果。`generateProducts()` 只會執行一次，避免每次渲染都重新產生 5000 筆資料；而 `filteredProducts` 只會在 `allProducts`、`searchQuery` 或 `category` 變動時才重新計算，減少不必要的重複運算。

**總結：**  
這種寫法能確保「輸入體驗流暢」且「大量資料渲染不卡頓」，是 React 18 以後效能優化的推薦做法。

```javascript 完整的搜尋範例
import React, { useState, useDeferredValue, useMemo } from 'react';

// 模擬產品資料
const generateProducts = () => {
  return Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `產品 ${i}`,
    price: Math.floor(Math.random() * 1000),
    category: ['電子', '服飾', '食品', '書籍'][i % 4]
  }));
};

function ProductList({ searchQuery, category, isPending }) {
  const allProducts = useMemo(() => generateProducts(), []);
  
  const filteredProducts = useMemo(() => {
    console.log('開始篩選產品。..');
    return allProducts.filter(product => {
      const matchesSearch = product.name.includes(searchQuery);
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, category]);
  
  return (
    <div style={{ opacity: isPending ? 0.6 : 1, transition: 'opacity 0.2s' }}>
      {isPending && <p>更新中。..</p>}
      <p>找到 {filteredProducts.length} 個產品</p>
      <ul>
        {filteredProducts.slice(0, 50).map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} ({product.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductSearchApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  
  // 只延遲搜尋查詢，分類切換立即更新
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const isPending = searchQuery !== deferredSearchQuery;
  
  return (
    <div>
      <h2>產品搜尋</h2>
      
      <div>
        <input
          type="text"
          placeholder="搜尋產品。.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">全部分類</option>
          <option value="電子">電子</option>
          <option value="服飾">服飾</option>
          <option value="食品">食品</option>
          <option value="書籍">書籍</option>
        </select>
      </div>
      
      <ProductList
        searchQuery={deferredSearchQuery}
        category={category}
        isPending={isPending}
      />
    </div>
  );
}

export default ProductSearchApp;
```

### 何時該使用 useDeferredValue？

**適合使用的情況：**
1. **搜尋功能**：大量資料的即時搜尋、過濾
2. **輸入驅動的複雜運算**：圖表繪製、資料視覺化
3. **大量列表渲染**：延遲渲染長列表，保持滾動流暢
4. **複雜表單驗證**：延遲驗證邏輯，保持輸入流暢

**不需要使用的情況：**
1. **簡單的輸入**：沒有耗時運算或大量渲染
2. **需要精確控制延遲時間**：使用 debounce 更合適
3. **API 請求**：使用 debounce 限制請求頻率更好

{% note info %}
**並發模式（Concurrent Mode）下作業**

在 React 18 之前，React 的渲染是「同步且不可中斷」的。一旦開始渲染，就必須完整執行完畢，無法暫停或中斷。這就像在排隊結帳時，即使後面有人很急，也必須等前面的人全部結完帳才輪到你。

React 18 引入了「並發渲染（Concurrent Rendering）」機制，讓 React 可以：
- **暫停渲染**：正在渲染複雜元件時，如果有更緊急的更新（如使用者輸入），可以暫停當前渲染
- **優先級調度**：根據更新的重要性分配優先級，優先處理使用者互動
- **恢復渲染**：處理完緊急更新後，繼續完成之前暫停的渲染

**如何啟用並發模式？**

在 React 18 中，只要使用 `createRoot` 就會自動啟用並發功能：

```javascript
// React 18 - 並發模式（推薦）
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

```javascript
// React 17 及以前 - 傳統模式（同步渲染）
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));
```

**`useDeferredValue` 與並發模式的關係：**
- `useDeferredValue` 是 React 18 的新功能，需要並發渲染機制才能運作
- 它利用並發模式的優先級調度能力，將某些更新標記為「低優先級」
- 如果你的專案還在用 React 17 或 `ReactDOM.render`，`useDeferredValue` 將無法發揮作用
- 升級到 React 18 並使用 `createRoot` 即可自動支援

**其他重點：**
- `useDeferredValue` 不會延遲「時間」，而是延遲「優先級」
- React 會根據系統負載自動調整延遲程度
- 這是一種效能優化手段，不應該用於實現業務邏輯
{% endnote %}

## useTransition

`useTransition` 是 React 18 引入的 Hook，可以將某些狀態更新標記為「過渡（transition）」，讓 React 知道這些更新可以延後處理，優先執行更緊急的互動（如使用者輸入）。它與 `useDeferredValue` 類似，但提供更細緻的控制。

### 為什麼需要 useTransition？

當我們需要在使用者操作時同時更新多個狀態，而其中某些更新會觸發耗時的運算或渲染時，就會遇到「輸入卡頓」的問題。

```javascript 沒有使用 useTransition 的問題
import React, { useState } from 'react';

function SlowList({ items }) {
  // 模擬渲染大量項目（耗時）
  console.log('渲染列表。..');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function TabSwitcher() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  // 模擬每個 tab 有大量資料
  const tabs = {
    tab1: Array.from({ length: 5000 }, (_, i) => ({ id: i, name: `項目 ${i}` })),
    tab2: Array.from({ length: 5000 }, (_, i) => ({ id: i, name: `文章 ${i}` })),
    tab3: Array.from({ length: 5000 }, (_, i) => ({ id: i, name: `圖片 ${i}` }))
  };
  
  const handleTabClick = (tab) => {
    // ❌ 問題：切換 tab 時，立即更新 activeTab 並渲染大量資料
    // 導致點擊按鈕到視覺回饋之間有明顯延遲
    setActiveTab(tab);
  };
  
  return (
    <div>
      <div>
        <button onClick={() => handleTabClick('tab1')}>Tab 1</button>
        <button onClick={() => handleTabClick('tab2')}>Tab 2</button>
        <button onClick={() => handleTabClick('tab3')}>Tab 3</button>
      </div>
      
      <p>當前 Tab：{activeTab}</p>
      
      {/* 渲染大量資料，造成卡頓 */}
      <SlowList items={tabs[activeTab]} />
    </div>
  );
}
```

**問題分析：**
1. 使用者點擊 Tab 按鈕
2. `setActiveTab` 觸發狀態更新
3. 立即渲染 5000 筆新資料（非常耗時）
4. 使用者看到按鈕卡住，沒有立即的視覺反饋
5. 體驗很差，感覺應用程式當機了

{% note danger %}
**核心問題：**
- 按鈕的視覺回饋（高優先級）被大量資料的渲染（低優先級）阻塞
- 使用者點擊按鈕後沒有立即看到反應，會以為沒點到或當機
- 雖然 `useDeferredValue` 可以延遲值的更新，但無法直接控制「狀態更新」本身的優先級
{% endnote %}

### useTransition 語法

`useTransition` 可以解決這個問題，它讓我們明確告訴 React：「這個狀態更新不緊急，可以延後處理」。

**語法結構：**
```javascript
const [isPending, startTransition] = useTransition();
```

**返回值說明：**
- **isPending**：布林值，表示是否有過渡更新正在進行中
  - `true`：過渡更新尚未完成
  - `false`：沒有進行中的過渡更新
- **startTransition**：函式，用來包裹「非緊急」的狀態更新
  - 被包裹的更新會被標記為低優先級
  - React 會優先處理其他緊急更新（如使用者輸入）

**使用方式：**
```javascript
const handleClick = () => {
  // 緊急更新：立即執行
  setUrgentState(newValue);
  
  // 非緊急更新：延後執行
  startTransition(() => {
    setNonUrgentState(newValue);
  });
};
```

### 使用 useTransition 優化

讓我們用 `useTransition` 改善前面的問題：

```javascript 使用 useTransition 優化
import React, { useState, useTransition } from 'react';

function SlowList({ items }) {
  console.log('渲染列表。..');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function TabSwitcher() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isPending, startTransition] = useTransition();
  
  const tabs = {
    tab1: Array.from({ length: 5000 }, (_, i) => ({ id: i, name: `項目 ${i}` })),
    tab2: Array.from({ length: 5000 }, (_, i) => ({ id: i, name: `文章 ${i}` })),
    tab3: Array.from({ length: 5000 }, (_, i) => ({ id: i, name: `圖片 ${i}` }))
  };
  
  const handleTabClick = (tab) => {
    // ✅ 使用 startTransition 包裹狀態更新
    // React 會優先處理按鈕的視覺回饋，延後處理列表渲染
    startTransition(() => {
      setActiveTab(tab);
    });
  };
  
  return (
    <div>
      <div>
        <button onClick={() => handleTabClick('tab1')} disabled={isPending}>
          Tab 1
        </button>
        <button onClick={() => handleTabClick('tab2')} disabled={isPending}>
          Tab 2
        </button>
        <button onClick={() => handleTabClick('tab3')} disabled={isPending}>
          Tab 3
        </button>
      </div>
      
      <div>
        <p>當前 Tab：{activeTab}</p>
        {isPending && <p>載入中。..</p>}
      </div>
      
      <SlowList items={tabs[activeTab]} />
    </div>
  );
}

export default TabSwitcher;
```

**效果比較：**

| 狀況         | 沒有使用 useTransition           | 使用 useTransition              |
| ------------ | -------------------------------- | ------------------------------- |
| 按鈕點擊反應 | 畫面卡住，無法立即互動           | 按鈕立即變成 disabled，回饋即時 |
| 載入提示     | 無                               | 顯示「載入中。..」提示          |
| 列表渲染     | 必須等 5000 筆資料渲染完才有反應 | 列表稍後才更新，不阻塞主要互動  |
| 使用者體驗   | 卡頓、不流暢                     | 流暢、UI 響應性佳               |

`useTransition` 可以讓你將「非即時」或「不急迫」的狀態更新標記為過渡（Transition），這樣 React 會優先處理重要的 UI 互動（例如按鈕點擊、輸入回饋），而將大量渲染等較重的工作延後執行。這種做法能有效避免畫面卡頓，讓使用者感受到更即時、流暢的操作體驗。透過 `useTransition`，我們能主動告訴 React：「這部分的狀態更新可以等一下再做」，進一步提升整體 UI 響應性。

### useTransition vs useDeferredValue
雖然 `useTransition` 和 `useDeferredValue` 都能提升 React 應用的效能與互動流暢度，但它們的設計目標與適用情境並不相同：

- **useTransition**：
適合用於「主動標記」某些狀態更新為「非緊急」的過渡（Transition），例如 Tab 切換、大量資料渲染等。你可以決定哪些更新可以延後，讓 React 先處理重要的 UI 互動，提升即時回饋。
- **useDeferredValue**：
適合用於「被動延遲」某個值的更新，常見於輸入框、搜尋等場景。它會自動將值的變化延後處理，讓高優先級的互動（如輸入）不被大量運算或渲染阻塞。

簡單來說：  
- 如果你想「主動控制」狀態更新的優先順序，請用 `useTransition`。  
- 如果你想「被動延遲」某個值的更新，讓 UI 更流暢，請用 `useDeferredValue`。

```javascript useTransition vs useDeferredValue 對比
import React, { useState, useTransition, useDeferredValue } from 'react';

function ComparisonDemo() {
  // 使用 useTransition
  const [tab1, setTab1] = useState('home');
  const [isPending1, startTransition1] = useTransition();
  
  const handleTabChange1 = (newTab) => {
    // 控制「狀態更新」的優先級
    startTransition1(() => {
      setTab1(newTab);
    });
  };
  
  // 使用 useDeferredValue
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);
  
  return (
    <div>
      {/* useTransition：主動控制狀態更新 */}
      <button onClick={() => handleTabChange1('profile')}>
        切換到 Profile
      </button>
      {isPending1 && <span>切換中。..</span>}
      
      {/* useDeferredValue：被動接收延遲的值 */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ExpensiveComponent value={deferredInput} />
    </div>
  );
}
```

**差異比較：**

| 特性               | useTransition          | useDeferredValue           |
| ------------------ | ---------------------- | -------------------------- |
| **控制方式**       | 主動標記狀態更新為過渡 | 被動接收延遲的值           |
| **使用時機**       | 你控制狀態更新的時機   | 狀態由外部控制（如 props） |
| **isPending 狀態** | 有，可以顯示載入提示   | 需自行比較值判斷           |
| **典型場景**       | 按鈕點擊、Tab 切換     | 輸入框、可控元件           |
| **狀態數量**       | 可以更新多個狀態       | 只針對單一值               |

**選擇建議：**
- **使用 useTransition**：當你需要在事件處理器中更新狀態，且希望延後某些更新
- **使用 useDeferredValue**：當你需要延遲使用某個值，但不直接控制該值的更新

### 實際應用範例

這個範例展示了如何在 React 中使用 `useTransition` 來優化「分頁切換」的體驗。當使用者點擊分頁按鈕時，`handlePageChange` 會呼叫 `startTransition`，將頁面切換的狀態更新標記為「過渡更新」（transition）。這代表 React 會優先處理高優先級的互動（例如按鈕點擊、輸入框輸入），而將大量資料的渲染（如 3000 筆分頁資料）延後執行，避免畫面卡頓。

- `isPending` 會在過渡期間為 `true`，可用來顯示「載入中」提示或降低內容透明度，讓使用者知道正在切換分頁。
- 這種寫法能確保「分頁按鈕點擊即時反應」且「大量資料渲染不卡頓」，大幅提升使用者體驗。

**重點：**
- `useTransition` 適合用在「你主動控制狀態更新」的場景，例如分頁、Tab 切換、排序等。
- 它讓你可以把「不重要但很重的更新」延後處理，讓 UI 互動保持流暢。

```javascript 完整的分頁切換範例
import React, { useState, useTransition } from 'react';

// 模擬從 API 獲取資料
const fetchPageData = (page) => {
  return Array.from({ length: 3000 }, (_, i) => ({
    id: `${page}-${i}`,
    title: `第 ${page} 頁 - 項目 ${i}`,
    content: `這是第 ${page} 頁的內容 ${i}`
  }));
};

function ContentList({ items, isPending }) {
  return (
    <div style={{ opacity: isPending ? 0.6 : 1, transition: 'opacity 0.2s' }}>
      <ul>
        {items.slice(0, 50).map(item => (
          <li key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PaginationApp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  
  const data = fetchPageData(currentPage);
  const totalPages = 10;
  
  const handlePageChange = (newPage) => {
    // 將頁面切換標記為過渡更新
    startTransition(() => {
      setCurrentPage(newPage);
    });
  };
  
  return (
    <div>
      <h2>分頁範例</h2>
      
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
        >
          上一頁
        </button>
        
        <span> 第 {currentPage} / {totalPages} 頁 </span>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isPending}
        >
          下一頁
        </button>
        
        {isPending && <span> （載入中。..)</span>}
      </div>
      
      <ContentList items={data} isPending={isPending} />
    </div>
  );
}

export default PaginationApp;
```

**說明：**
- 點擊「下一頁」時，按鈕立即響應（disabled + 顯示載入提示）
- 頁面內容稍後更新，不會阻塞按鈕的反應
- 使用 `isPending` 降低內容透明度，提供視覺回饋

### 何時該使用 useTransition？

**適合使用的情況：**
1. **Tab 切換**：切換不同的內容面板
2. **分頁導航**：切換到不同頁面
3. **篩選/排序**：改變資料的顯示方式
4. **路由切換**：導航到不同的路由（配合路由庫）

**不需要使用的情況：**
1. **簡單的狀態更新**：沒有耗時渲染的更新
2. **必須立即反映的更新**：如表單驗證錯誤提示
3. **API 請求**：`startTransition` 不會取消網路請求

{% note warning %}
**重要提醒：**
- `useTransition` 是 React 18 的新功能，需要並發模式支援（使用 `createRoot`）
- 被 `startTransition` 包裹的更新會被標記為低優先級，但不是「不執行」
- 不要在 `startTransition` 內執行有副作用的操作（如 API 請求）
- `isPending` 只反映過渡更新的狀態，不是非同步操作的狀態
{% endnote %}

## 效能優化 Hooks 總結

我們已經學習了三個效能優化相關的 Hook，讓我們總結一下它們的用途：

| Hook                 | 優化目標           | 使用時機                  | 主要作用             |
| -------------------- | ------------------ | ------------------------- | -------------------- |
| **useCallback**      | 記憶化函式         | 函式作為 props 或依賴項   | 避免函式重新創建     |
| **useMemo**          | 記憶化計算結果     | 昂貴的計算或物件/陣列創建 | 避免重複計算         |
| **useDeferredValue** | 延遲值的更新       | 被動接收延遲的值          | 延遲非緊急的視覺更新 |
| **useTransition**    | 標記狀態更新為過渡 | 主動控制狀態更新優先級    | 保持 UI 響應性       |

**最佳實踐：**
- 先測量效能瓶頸，再進行優化（不要過早優化）
- `useCallback` 和 `useMemo` 搭配 `React.memo` 使用效果更佳
- `useDeferredValue` 適合輸入驅動的場景
- `useTransition` 適合事件驅動的場景
- 所有優化都有成本，只在真正需要時使用

# 進階 Hooks

進階型的 React Hooks 主要用於處理「多狀態、複雜邏輯」的情境，讓元件在面對大量資料、複雜互動時，依然能保持程式碼結構清晰、易於維護。這些 Hook 幫助我們將狀態管理、邏輯分離，並提升大型應用的可讀性與可測試性。

## useReducer

`useReducer` 是 React 提供的狀態管理 Hook，是 `useState` 的替代方案。當狀態邏輯變得複雜時（例如多個子狀態、複雜的更新邏輯），`useReducer` 可以讓程式碼更清晰、更易於維護和測試。

### 為什麼需要 useReducer？

這個範例展示當我們用多個 `useState` 來管理購物車的複雜狀態時，會遇到哪些實務上的困難與限制。你可以看到每個相關的狀態（如商品清單、折扣、運費、載入狀態、錯誤訊息）都分散在不同的 state 之中，導致狀態更新邏輯分散、重複且難以維護。這正是 `useReducer` 可以幫助我們簡化與集中管理的典型場景。

```javascript 使用 useState 管理複雜狀態的問題
import React, { useState } from 'react';

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // ❌ 問題 1：多個相關的狀態分散在各處
  // ❌ 問題 2：狀態更新邏輯分散在各個事件處理器中
  // ❌ 問題 3：複雜的狀態更新邏輯難以測試
  
  const addItem = (product) => {
    setLoading(true);
    setError(null);
    
    // 複雜的業務邏輯
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      setItems(items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
    
    // 更新運費
    if (items.length + 1 >= 3) {
      setShippingFee(0); // 滿三件免運
    } else {
      setShippingFee(60);
    }
    
    setLoading(false);
  };
  
  const removeItem = (productId) => {
    setLoading(true);
    setItems(items.filter(item => item.id !== productId));
    
    // 又要更新運費
    const newItems = items.filter(item => item.id !== productId);
    if (newItems.length >= 3) {
      setShippingFee(0);
    } else {
      setShippingFee(60);
    }
    
    setLoading(false);
  };
  
  const applyDiscount = (code) => {
    setLoading(true);
    setError(null);
    
    // 驗證折扣碼
    if (code === 'SAVE10') {
      setDiscount(10);
    } else if (code === 'SAVE20') {
      setDiscount(20);
    } else {
      setError('無效的折扣碼');
    }
    
    setLoading(false);
  };
  
  // ... 更多複雜的邏輯
}
```

**問題分析：**
1. **狀態分散**：`items`、`discount`、`shippingFee`、`loading`、`error` 等相關狀態分散在各處
2. **邏輯重複**：運費的計算邏輯在多個函式中重複出現
3. **難以測試**：狀態更新邏輯分散在各個事件處理器中，難以單獨測試
4. **難以維護**：當需求變更時，要修改多個地方
5. **容易出錯**：忘記更新某個相關狀態，導致狀態不一致

{% note danger %}
**核心問題：**
- 使用多個 `useState` 管理相關的狀態，導致狀態分散、邏輯混亂
- 狀態更新邏輯散落在各處，難以追蹤和維護
- 複雜的業務邏輯難以測試和重用
- 當狀態間有依賴關係時，容易出現不一致的情況
{% endnote %}

### useReducer 概念

`useReducer` 的核心概念來自 Redux 等狀態管理庫，採用「單一資料流」的設計模式：

{% mermaid graph LR %}
State["State<br/>（狀態）"]
Action["Action<br/>（動作）"]
UI["UI<br/>（使用者介面）"]
Reducer["Reducer<br/>（歸納器）"]

%% 流程箭頭
State -- 狀態傳遞 --> UI
UI -- 派發 Action --> Action
Action -- 觸發 --> Reducer
Reducer -- 更新 --> State
{% endmermaid %}

**核心概念：**
1. **State（狀態）**：應用程式的資料
2. **Action（動作）**：描述「發生了什麼」的物件
3. **Reducer（歸納器）**：根據 action 決定如何更新 state 的純函式
4. **Dispatch（派發）**：觸發 action 的函式

### useReducer 語法
`useReducer` 適合管理多個彼此有關聯、邏輯較複雜的狀態，能讓狀態更新流程更集中、可預測且易於維護。
 
**語法結構：**
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

**參數詳細說明：**
- **reducer**：
一個純函式，格式為 `(state, action) => newState`。每當你呼叫 `dispatch` 派發一個 action 時，React 會自動將目前的 state 和 action 傳入 reducer，並根據回傳結果更新 state。reducer 需保證不可直接修改原本的 state，必須回傳新的物件。
```javascript Reducer 函式結構
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return newState;
    default:
      return state;
  }
}
```
- **initialState**：
初始狀態物件。這是 reducer 第一次執行時的 state 值，通常用來集中管理所有相關狀態欄位。

**回傳值詳細說明：**
- **state**：
目前最新的狀態資料。每次 reducer 回傳新狀態後，state 也會自動更新，元件會重新渲染。
- **dispatch**：
用來派發 action 的函式。你可以呼叫 `dispatch({ type: '動作名稱', payload: 資料 })` 來觸發 reducer 執行對應的狀態更新邏輯。

### 基本用法範例
以下這個範例將帶你一步步學會如何用 `useReducer` 來重構購物車功能，讓多個購物車相關狀態（如商品清單、折扣、運費、載入狀態等）集中管理，並用 reducer 函式統一處理所有狀態更新。步驟如下：

1. **定義初始狀態**：將所有購物車需要追蹤的資料（商品陣列、折扣、運費、載入狀態、錯誤訊息等）集中在一個物件中，方便管理。
2. **撰寫 reducer 函式**：根據不同的 action（如新增商品、移除商品、套用折扣等），在 reducer 內統一處理狀態的變化，確保每次更新都回傳新的狀態物件。
3. **在元件中使用 useReducer**：用 `const [state, dispatch] = useReducer(reducer, initialState)` 取得目前狀態與派發 action 的函式。
4. **設計觸發行為**：當使用者操作（如加入商品、刪除商品、輸入折扣碼等）時，呼叫 `dispatch` 派發對應的 action，reducer 會自動處理狀態更新。
5. **渲染 UI**：根據 state 內容動態渲染購物車清單、總金額、運費、折扣等資訊。

這種寫法讓複雜的狀態變動更有條理，所有邏輯集中在 reducer，元件本身更簡潔，也方便日後擴充與維護。

```javascript useReducer 基本用法
import React, { useReducer } from 'react';

// 1. 定義初始狀態（所有相關狀態集中管理）
const initialState = {
  items: [],
  discount: 0,
  shippingFee: 60,
  loading: false,
  error: null
};

// 2. 定義 reducer 函式（集中管理所有狀態更新邏輯）
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const newItems = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      
      // 自動計算運費
      const shippingFee = newItems.length >= 3 ? 0 : 60;
      
      return {
        ...state,
        items: newItems,
        shippingFee,
        loading: false
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const shippingFee = newItems.length >= 3 ? 0 : 60;
      
      return {
        ...state,
        items: newItems,
        shippingFee,
        loading: false
      };
    }
    
    case 'APPLY_DISCOUNT': {
      const discounts = {
        'SAVE10': 10,
        'SAVE20': 20,
        'SAVE30': 30
      };
      
      const discount = discounts[action.payload];
      
      if (discount) {
        return {
          ...state,
          discount,
          error: null,
          loading: false
        };
      } else {
        return {
          ...state,
          error: '無效的折扣碼',
          loading: false
        };
      }
    }
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'RESET_CART':
      return initialState;
    
    default:
      return state;
  }
}

// 3. 在元件中使用
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addItem = (product) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeItem = (productId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };
  
  const applyDiscount = (code) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'APPLY_DISCOUNT', payload: code });
  };
  
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = total * (1 - state.discount / 100) + state.shippingFee;
  
  return (
    <div>
      <h2>購物車</h2>
      
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.loading && <p>處理中。..</p>}
      
      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
            <button onClick={() => removeItem(item.id)}>移除</button>
          </li>
        ))}
      </ul>
      
      <div>
        <p>小計：${total}</p>
        <p>折扣：{state.discount}%</p>
        <p>運費：${state.shippingFee}</p>
        <p>總計：${finalTotal}</p>
      </div>
      
      <button onClick={() => applyDiscount('SAVE10')}>套用折扣碼</button>
      <button onClick={() => dispatch({ type: 'RESET_CART' })}>清空購物車</button>
    </div>
  );
}

export default ShoppingCart;
```

**優點對比：**

| 使用 useState      | 使用 useReducer        |
| ------------------ | ---------------------- |
| 狀態分散在多個變數 | 狀態集中管理           |
| 更新邏輯散落各處   | 更新邏輯集中在 reducer |
| 難以測試           | reducer 可以單獨測試   |
| 邏輯重複           | 邏輯集中，避免重複     |
| 容易出錯           | 狀態更新可預測         |

{% note success %}
**重點：** `useReducer` 將所有狀態和更新邏輯集中管理，讓程式碼更清晰、更易於維護和測試。
{% endnote %}

### 實際應用：待辦事項
以下將介紹一個「待辦事項（Todo List）」的完整範例，示範如何使用 `useReducer` 來集中管理多個相關狀態（如待辦清單、篩選條件），並將所有狀態更新邏輯統一寫在 reducer 裡。這個範例可以幫助你理解：當應用程式的狀態變得複雜時，`useReducer` 如何讓程式碼更有組織、易於維護與擴充。

```javascript 待辦事項應用
import React, { useReducer, useState } from 'react';

// 1. 定義初始狀態
const initialState = {
  todos: [],
  filter: 'all' // 'all' | 'active' | 'completed'
};

// 2. 定義 reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
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
      return {
        ...state,
        filter: action.payload
      };
    
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    
    default:
      return state;
  }
}

// 3. 在元件中使用
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  
  // 計算過濾後的待辦事項
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });
  
  // 計算統計數字
  const activeCount = state.todos.filter(t => !t.completed).length;
  const completedCount = state.todos.filter(t => t.completed).length;
  
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
      
      {/* 新增待辦 */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="輸入待辦事項。.."
        />
        <button type="submit">新增</button>
      </form>
      
      {/* 篩選按鈕 */}
      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>
          全部 ({state.todos.length})
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>
          待完成 ({activeCount})
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>
          已完成 ({completedCount})
        </button>
      </div>
      
      {/* 待辦列表 */}
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              刪除
            </button>
          </li>
        ))}
      </ul>
      
      {/* 清除已完成 */}
      {completedCount > 0 && (
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
          清除已完成
        </button>
      )}
    </div>
  );
}

export default TodoApp;
```

**說明：**
- 所有狀態更新邏輯都集中在 `todoReducer` 中
- 透過 `dispatch` 派發不同的 action 來更新狀態
- reducer 可以單獨測試，不依賴元件
- 狀態更新邏輯清晰、可預測

### useReducer 的測試
`useReducer` 的一大優勢是 reducer 函式可以進行「單元測試」（unit test），也就是可以獨立於 React 元件之外，針對 reducer 的輸入與輸出進行自動化測試，確保狀態更新邏輯正確無誤。

```javascript Reducer 測試範例
// todoReducer.test.js
describe('todoReducer', () => {
  test('ADD_TODO 應該新增待辦事項', () => {
    const initialState = { todos: [], filter: 'all' };
    const action = { type: 'ADD_TODO', payload: '買牛奶' };
    
    const newState = todoReducer(initialState, action);
    
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].text).toBe('買牛奶');
    expect(newState.todos[0].completed).toBe(false);
  });
  
  test('TOGGLE_TODO 應該切換完成狀態', () => {
    const initialState = {
      todos: [{ id: 1, text: '買牛奶', completed: false }],
      filter: 'all'
    };
    const action = { type: 'TOGGLE_TODO', payload: 1 };
    
    const newState = todoReducer(initialState, action);
    
    expect(newState.todos[0].completed).toBe(true);
  });
  
  test('DELETE_TODO 應該刪除待辦事項', () => {
    const initialState = {
      todos: [
        { id: 1, text: '買牛奶', completed: false },
        { id: 2, text: '寫程式', completed: false }
      ],
      filter: 'all'
    };
    const action = { type: 'DELETE_TODO', payload: 1 };
    
    const newState = todoReducer(initialState, action);
    
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].id).toBe(2);
  });
});
```

### useReducer vs useState 選擇指南
在 React 專案中，`useState` 和 `useReducer` 都是常用的狀態管理 Hook，但它們適用的情境有所不同。初學者常常會疑惑：什麼時候該用 `useState`，什麼時候又該選擇 `useReducer`？本節將從實務角度，幫助你判斷兩者的適用時機，並透過對比表格與範例，讓你快速掌握選擇原則。

| 適用情境     | useState                   | useReducer                         |
| ------------ | -------------------------- | ---------------------------------- |
| 狀態結構     | 單一值（字串、數字、布林） | 複雜物件、陣列、多個子狀態         |
| 狀態間關聯   | 無                         | 有（多個狀態需同時考慮一致性）     |
| 更新邏輯     | 直接設定新值，邏輯簡單     | 依賴前一狀態、條件分支多、邏輯複雜 |
| 狀態管理     | 分散於多個 useState        | 集中於一個 reducer                 |
| 事件處理     | 單一事件對應單一狀態       | 多個事件需操作同一組狀態           |
| 跨元件共用   | 不建議                     | 可將 reducer 抽出共用              |
| 可測試性     | 不易針對狀態更新單獨測試   | reducer 可獨立單元測試             |
| 適合元件規模 | 小型、簡單元件             | 中大型、邏輯複雜元件               |

{% note info %}
**選擇建議：**
- 狀態簡單、邏輯單純時，優先用 `useState`
- 狀態多、邏輯複雜、需集中管理時，建議用 `useReducer`
- 可先用 `useState`，日後需求變複雜再重構成 `useReducer`
{% endnote %}

**對比範例：**
```javascript useState vs useReducer
// ✅ 適合用 useState
function SimpleCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// ✅ 適合用 useReducer
function ComplexForm() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    age: 0,
    errors: {},
    submitting: false
  });
  
  // 複雜的表單邏輯。..
}
```

### useReducer 最佳實踐
當你開始使用 `useReducer` 時，遵循一些最佳實踐可以讓程式碼更易讀、更易維護、更不容易出錯。以下將介紹四個重要的實務技巧，幫助你寫出更專業、更穩健的 reducer 程式碼。

#### Action 類型常數化
將 action 類型常數化，可以有效避免拼寫錯誤（typo）帶來的 bug，並且讓 IDE 能夠自動補全，提升開發效率。這種做法也能集中管理所有 action 類型，讓專案結構更清晰，日後重構或維護時也會更加方便。

```javascript Action 類型常數化
// ❌ 不好的做法：直接使用字串
dispatch({ type: 'ADD_TODO', payload: 'New todo' });
dispatch({ type: 'ADD_TDOO', payload: 'New todo' }); // 拼寫錯誤，不會報錯

// ✅ 好的做法：定義常數
const ActionTypes = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_FILTER: 'SET_FILTER'
};

// 使用常數
dispatch({ type: ActionTypes.ADD_TODO, payload: 'New todo' });
dispatch({ type: ActionTypes.ADD_TDOO, payload: 'New todo' }); // 拼寫錯誤，IDE 會提示

// 在 reducer 中也使用
function todoReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      // ...
    case ActionTypes.TOGGLE_TODO:
      // ...
    default:
      return state;
  }
}
```

#### 使用 Action Creator
使用 Action Creator 可以集中管理 action 的創建邏輯，確保每個 action 的結構一致，也方便在建立 action 時加入預處理邏輯。這樣不僅能提升程式碼的可讀性，也讓維護和擴充 reducer 時更加簡單可靠。

```javascript Action Creator
// ❌ 不好的做法：每次都手動創建 action 物件
dispatch({ type: 'ADD_TODO', payload: text });
dispatch({ type: 'ADD_TODO', paylod: text }); // 拼寫錯誤
dispatch({ type: 'ADD_TODO', data: text }); // 欄位名稱不一致

// ✅ 好的做法：使用 action creator
const actions = {
  addTodo: (text) => ({ 
    type: 'ADD_TODO', 
    payload: text 
  }),
  
  toggleTodo: (id) => ({ 
    type: 'TOGGLE_TODO', 
    payload: id 
  }),
  
  deleteTodo: (id) => ({ 
    type: 'DELETE_TODO', 
    payload: id 
  }),
  
  // 可以添加驗證邏輯
  setFilter: (filter) => {
    const validFilters = ['all', 'active', 'completed'];
    if (!validFilters.includes(filter)) {
      console.warn(`Invalid filter: ${filter}`);
      return { type: 'SET_FILTER', payload: 'all' };
    }
    return { type: 'SET_FILTER', payload: filter };
  }
};

// 使用 action creator
dispatch(actions.addTodo('Buy milk'));
dispatch(actions.toggleTodo(123));
dispatch(actions.setFilter('active'));
```

**進階用法：結合 TypeScript**

```typescript
// TypeScript 版本
type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number };

const actions = {
  addTodo: (text: string): Action => ({ 
    type: 'ADD_TODO', 
    payload: text 
  }),
  toggleTodo: (id: number): Action => ({ 
    type: 'TOGGLE_TODO', 
    payload: id 
  })
};
```

#### Reducer 必須是純函式
簡單來說，純函式（Pure Function）指的是「相同的輸入，永遠會產生相同的輸出，且不會產生任何副作用（不會改變外部狀態）」。在 React 中，reducer 必須保持純淨，因為 React 可能會在渲染或優化過程中多次執行 reducer。如果 reducer 不是純函式，會導致狀態不可預測，容易產生難以追蹤的 bug，也會讓測試、除錯（例如時間旅行除錯）變得困難。因此，務必確保 reducer 不會直接修改傳入的 state，也不應該有任何副作用。

```javascript Reducer 保持純淨
// ❌ 錯誤：直接修改原始 state
function badReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      state.todos.push(action.payload); // 直接修改 state
      return state; // 回傳同一個物件參考
    
    case 'SORT_TODOS':
      state.todos.sort(); // 直接修改陣列
      return state;
  }
}

// ✅ 正確：總是返回新的物件
function goodReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload] // 創建新陣列
      };
    
    case 'SORT_TODOS':
      return {
        ...state,
        todos: [...state.todos].sort() // 先複製再排序
      };
    
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates } // 創建新物件
            : todo
        )
      };
  }
}
```

**常見陷阱：**

```javascript
// ❌ 錯誤：忘記複製巢狀物件
case 'UPDATE_USER_ADDRESS':
  return {
    ...state,
    user: {
      ...state.user,
      address: action.payload // 如果 address 是物件，應該也要展開
    }
  };

// ✅ 正確：深層複製
case 'UPDATE_USER_ADDRESS':
  return {
    ...state,
    user: {
      ...state.user,
      address: {
        ...state.user.address,
        ...action.payload
      }
    }
  };
```

#### 處理未知的 Action
處理未知的 Action 可以幫助我們及早發現錯誤，避免靜默失敗，並提供清楚的錯誤訊息，讓除錯過程更加方便。

```javascript 處理未知 Action
// ❌ 不好：靜默失敗
function badReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state; // 什麼都不做，可能隱藏錯誤
  }
}

// ✅ 好：記錄警告
function goodReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    
    default:
      console.warn(`Unknown action type: ${action.type}`, action);
      return state;
  }
}

// ✅ 更好：開發環境拋出錯誤
function betterReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    
    default:
      if (process.env.NODE_ENV === 'development') {
        throw new Error(`Unknown action type: ${action.type}`);
      }
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}
```

#### 完整範例：結合所有最佳實踐
我們已經學會如何用 `useReducer` 管理複雜狀態，並介紹了 reducer 的設計原則。接下來，讓我們結合所有最佳實踐，打造一個更完整、可維護性高的 `useReducer` 範例。這個範例會示範：

- 如何定義 Action 類型常數，避免字串錯誤
- 使用 Action Creator 統一產生 action 物件
- 在 reducer 中處理未知的 action，提升除錯體驗
- 保持 reducer 純淨，確保每次都回傳新的狀態物件

這些技巧能讓你的 React 狀態管理更安全、可預測，也更容易維護。

```javascript 最佳實踐完整範例
// 1. 定義 Action 類型常數
const ActionTypes = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO'
};

// 2. 定義 Action Creators
const actions = {
  addTodo: (text) => ({
    type: ActionTypes.ADD_TODO,
    payload: text.trim()
  }),
  toggleTodo: (id) => ({
    type: ActionTypes.TOGGLE_TODO,
    payload: id
  }),
  deleteTodo: (id) => ({
    type: ActionTypes.DELETE_TODO,
    payload: id
  })
};

// 3. Reducer 保持純淨 + 4. 處理未知 Action
function todoReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      // 保持純淨：返回新物件
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    
    case ActionTypes.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case ActionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    default:
      // 處理未知 action
      if (process.env.NODE_ENV === 'development') {
        console.error(`Unknown action type: ${action.type}`);
      }
      return state;
  }
}

// 在元件中使用
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  
  const handleAddTodo = (text) => {
    dispatch(actions.addTodo(text)); // 使用 action creator
  };
  
  return (
    <div>
      {/* UI */}
    </div>
  );
}
```

{% note success %}
**總結：**
遵循這四個最佳實踐，可以讓你的 `useReducer` 程式碼：
- ✅ 更不容易出錯（Action 類型常數化）
- ✅ 更易於維護（Action Creator）
- ✅ 更可預測（純函式）
- ✅ 更易於除錯（處理未知 Action）
{% endnote %}

### useReducer 與 Redux 的關係

你可能會發現 `useReducer` 的用法跟 Redux 很像，這不是巧合！事實上，`useReducer` 就是 React 官方參考 Redux 的設計理念，內建到 React 中的狀態管理方案。讓我們來釐清它們的關係。

#### 什麼是 Redux？

Redux 是一個獨立的狀態管理庫，在 React 生態系統中非常流行。它採用「單一資料源」和「單向資料流」的設計模式，讓大型應用的狀態管理變得可預測、易於追蹤。

**Redux 的核心概念：**
- **Store**：全域的狀態容器
- **Action**：描述發生了什麼事的物件
- **Reducer**：決定如何更新狀態的純函式
- **Dispatch**：派發 action 的方法

這些概念是不是跟 `useReducer` 很像？

#### useReducer vs Redux 比較
兩者的設計模式和用法看起來非常相似。事實上 `useReducer` 可以視為 React 內建的「本地狀態管理」方案，而 Redux 則是專為「全域狀態管理」設計的第三方函式庫。如果你的狀態只需要在單一元件或小範圍元件樹中共享，建議優先使用 `useReducer`。只有當狀態需要跨多個頁面或元件全域共享時，再考慮導入 Redux 等外部狀態管理工具。

| 特性           | useReducer         | Redux                              |
| -------------- | ------------------ | ---------------------------------- |
| **來源**       | React 內建 Hook    | 第三方狀態管理庫                   |
| **安裝**       | 不需要，React 內建 | 需要安裝 `redux` 和 `react-redux`  |
| **作用範圍**   | 單一元件或元件樹   | 整個應用程式的全域狀態             |
| **學習曲線**   | 較簡單，概念較少   | 較複雜，需要學習更多概念           |
| **DevTools**   | 無專用工具         | 有 Redux DevTools（時間旅行除錯）  |
| **中間件**     | 無                 | 支援（如 redux-thunk、redux-saga） |
| **非同步處理** | 需自行實作         | 透過中間件處理                     |
| **適用場景**   | 元件內的複雜狀態   | 跨元件的全域狀態                   |

**使用 useReducer（元件內狀態管理）：**

```javascript useReducer 範例
import React, { useReducer } from 'react';

// Reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 在元件中使用
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

**使用 Redux（全域狀態管理）：**

```javascript Redux 範例
// store.js
import { createStore } from 'redux';

// Reducer（跟 useReducer 一樣的概念）
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 創建全域 Store
const store = createStore(counterReducer);

export default store;

// App.js
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// Counter.js
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  // 從全域 store 取得狀態
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

#### useReducer + Context = 簡易版 Redux
如果需要跨元件共享狀態，可以結合 `useReducer` 和 `useContext`，實現類似 Redux 的效果：

```javascript useReducer + Context
import React, { useReducer, useContext, createContext } from 'react';

// 1. 創建 Context
const StoreContext = createContext();

// 2. Reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

// 3. Provider 元件
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light'
  });
  
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// 4. 自訂 Hook 方便使用
function useAppStore() {
  return useContext(StoreContext);
}

// 5. 在任何子元件中使用
function UserProfile() {
  const { state, dispatch } = useAppStore();
  
  return (
    <div>
      <p>User: {state.user?.name || 'Guest'}</p>
      <p>Theme: {state.theme}</p>
      <button onClick={() => dispatch({ 
        type: 'SET_USER', 
        payload: { name: 'Loki' } 
      })}>
        Login
      </button>
    </div>
  );
}

// 6. 使用 Provider 包裹應用
function App() {
  return (
    <AppProvider>
      <UserProfile />
    </AppProvider>
  );
}
```

#### 總結
**useReducer 與 Redux 的關係：**

- `useReducer` 是 React 內建的狀態管理 Hook，靈感來自 Redux
- 兩者都使用 **Reducer 模式**（State + Action → New State）
- Redux 是獨立的全域狀態管理庫，功能更強大但也更複雜
- `useReducer` 適合**元件內**的複雜狀態管理
- Redux 適合**應用程式級**的全域狀態管理
- 可以用 `useReducer` + `useContext` 實現簡易版的 Redux
- 學會 `useReducer` 後，學習 Redux 會更容易

**建議：**
- 先學好 `useReducer`，理解 Reducer 模式
- 簡單應用用 `useReducer` + `useContext` 就夠了
- 大型應用或需要進階功能時才考慮 Redux

## useImperativeHandle
`useImperativeHandle` 讓你可以自定義暴露給父元件的實例值，通常與 `forwardRef` 一起使用。

在 React 中，父元件通常透過 props 與子元件溝通（資料向下傳遞），子元件透過 callback 向父元件回報（事件向上傳遞）。這種「單向資料流」的設計讓元件更容易理解和維護。然而，在某些特殊情況下，父元件需要「直接控制」子元件的內部功能（例如讓輸入框聚焦、播放影片、重置表單等），這時候就需要 `useImperativeHandle`。

### 問題案例：父元件無法直接控制子元件

假設我們想製作一個「可重複使用的影片播放器元件」，父元件需要能夠控制播放、暫停、跳轉等功能。如果只用 props，會遇到什麼問題？

```javascript 問題範例：無法直接控制子元件
import React, { useState, useRef } from 'react';

// 子元件：影片播放器
function VideoPlayer({ src }) {
  const videoRef = useRef();
  
  // 這些方法只能在元件內部使用，父元件無法呼叫
  const play = () => videoRef.current.play();
  const pause = () => videoRef.current.pause();
  const reset = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
  };
  
  return (
    <div>
      <video ref={videoRef} src={src} width="400" />
      {/* 只能透過內部按鈕控制 */}
      <button onClick={play}>播放</button>
      <button onClick={pause}>暫停</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}

// 父元件
function App() {
  // ❌ 問題：父元件無法控制子元件的播放器
  // 無法在父元件層級統一控制多個播放器
  
  return (
    <div>
      <h2>影片 1</h2>
      <VideoPlayer src="video1.mp4" />
      
      <h2>影片 2</h2>
      <VideoPlayer src="video2.mp4" />
      
      {/* 如果想在這裡放一個「全部暫停」按鈕，該怎麼做？ */}
    </div>
  );
}
```

**問題分析：**
- 子元件的控制方法（play、pause、reset）只存在於子元件內部
- 父元件無法直接呼叫這些方法
- 如果用 props 傳遞控制訊號，需要複雜的狀態同步邏輯
- 當有多個子元件時，父元件難以統一控制

### 前置知識 1：ref 屬性的特殊性
在前面 `useRef` 章節，我們學過：
- 使用 `useRef()` 創建 ref 物件
- 將 ref 綁定到原生 DOM 元素的 `ref` 屬性：`<input ref={inputRef} />`
- 透過 `ref.current` 存取 DOM 元素

在原生 HTML 元素（如 `<input>`、`<video>` 等）上直接使用 `ref` 完全沒問題，父元件可以透過 `ref` 直接操作這些 DOM 元素。但如果你將 `ref` 指定給自訂元件（例如函式元件），React 並不會把 `ref` 當作一般 props 傳遞進去。這是因為 `ref`（和 `key` 一樣）是 React 的特殊保留屬性，**它們只會被 React 處理，不會自動出現在子元件的 props 物件中**。因此，父元件無法僅靠 props 傳遞 `ref` 來直接操作子元件內部的 DOM 或方法。如果想讓自訂元件支援 ref，必須使用 `forwardRef` 來讓函式元件能夠接收 ref，否則 ref 不會自動傳遞到子元件內部。

讓我們看看會發生什麼：

```javascript ref 無法像一般 props 傳遞
import React, { useRef } from 'react';

// 子元件
function MyInput(props) {
  console.log('props.ref:', props.ref); // undefined
  console.log('props:', props); // { placeholder: "請輸入文字" }
  // ❌ ref 不在 props 裡面！
  
  return <input type="text" placeholder={props.placeholder} />;
}

// 父元件
function App() {
  const inputRef = useRef(null);
  
  const handleFocus = () => {
    console.log('inputRef.current:', inputRef.current); // null
    // ❌ inputRef.current 是 null，因為 ref 沒有成功綁定
    inputRef.current?.focus();
  };
  
  return (
    <div>
      <MyInput ref={inputRef} placeholder="請輸入文字" />
      <button onClick={handleFocus}>聚焦輸入框</button>
    </div>
  );
}
```

**問題分析：**
1. 父元件嘗試傳遞 `ref={inputRef}` 給 `MyInput`
2. 但在 `MyInput` 的 props 中找不到 ref
3. `inputRef.current` 始終是 `null`
4. 無法存取到子元件內部的 DOM 元素

React 這樣設計是有原因的：

1. **避免混淆**：`ref` 是用來存取 DOM 或元件實例的，不是用來傳遞資料的
2. **保持一致性**：無論是原生 DOM 元素還是自訂元件，`ref` 的行為應該一致
3. **封裝性**：元件應該透過 props 和 callback 溝通，而不是直接暴露內部結構

有時候，我們會遇到需要讓父元件直接操作子元件內部 DOM 元素的情境，例如讓父元件可以聚焦輸入框、控制影片播放等。這時候，單純傳遞 ref 是無法實現的。這正是 `forwardRef` 派上用場的時機！`forwardRef` 是 React 提供的特殊 API，允許函式元件「接收」來自父元件的 ref，並將其「轉發」給內部的 DOM 元素或其他子元件。這樣父元件就能安全地操作子元件內部的 DOM 結構。

#### 使用場景對比

讓我們用一個實際的表單驗證情境，展示三種不同的做法：

**情境：製作一個登入表單，提交時驗證輸入框，若為空則聚焦到該輸入框。**

```javascript 情況 1：直接使用原生 DOM 元素（可行）
import React, { useRef } from 'react';

function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ 可以直接存取原生元素
    if (!emailRef.current.value) {
      alert('請輸入電子郵件');
      emailRef.current.focus(); // ✅ 可以聚焦
      return;
    }
    
    if (!passwordRef.current.value) {
      alert('請輸入密碼');
      passwordRef.current.focus(); // ✅ 可以聚焦
      return;
    }
    
    alert('登入成功！');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>電子郵件：</label>
        <input 
          ref={emailRef}  // ✅ 原生元素可以直接接收 ref
          type="email" 
          placeholder="請輸入電子郵件" 
        />
      </div>
      
      <div>
        <label>密碼：</label>
        <input 
          ref={passwordRef}  // ✅ 原生元素可以直接接收 ref
          type="password" 
          placeholder="請輸入密碼" 
        />
      </div>
      
      <button type="submit">登入</button>
    </form>
  );
}
```

**問題：如果我們想把輸入框封裝成可重用的元件呢？**

```javascript 情況 2：封裝成元件後（無法運作）
import React, { useRef } from 'react';

// 封裝的輸入框元件
function CustomInput(props) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{props.label}</label>
      <input 
        type={props.type} 
        placeholder={props.placeholder} 
      />
    </div>
  );
}

function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ❌ emailRef.current 是 null！
    console.log('emailRef.current:', emailRef.current); // null
    
    if (!emailRef.current?.value) {
      alert('請輸入電子郵件');
      emailRef.current?.focus(); // ❌ 無法執行
      return;
    }
    
    if (!passwordRef.current?.value) {
      alert('請輸入密碼');
      passwordRef.current?.focus(); // ❌ 無法執行
      return;
    }
    
    alert('登入成功！');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CustomInput 
        ref={emailRef}  // ❌ ref 不會傳遞給 CustomInput
        label="電子郵件："
        type="email"
        placeholder="請輸入電子郵件"
      />
      
      <CustomInput 
        ref={passwordRef}  // ❌ ref 不會傳遞給 CustomInput
        label="密碼："
        type="password"
        placeholder="請輸入密碼"
      />
      
      <button type="submit">登入</button>
    </form>
  );
}

// ❌ 結果：無法驗證和聚焦，因為 ref 沒有成功綁定
```

**解決方案：使用 forwardRef**

```javascript 情況 3：使用 forwardRef（成功運作）
import React, { useRef, forwardRef } from 'react';

// 使用 forwardRef 包裝元件
const CustomInput = forwardRef((props, ref) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{props.label}</label>
      <input 
        ref={ref}  // ✅ 將 ref 轉發到內部的 input
        type={props.type} 
        placeholder={props.placeholder} 
      />
    </div>
  );
});

function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ 現在可以存取到 input 元素了！
    console.log('emailRef.current:', emailRef.current); // <input> 元素
    
    if (!emailRef.current.value) {
      alert('請輸入電子郵件');
      emailRef.current.focus(); // ✅ 可以聚焦
      return;
    }
    
    if (!passwordRef.current.value) {
      alert('請輸入密碼');
      passwordRef.current.focus(); // ✅ 可以聚焦
      return;
    }
    
    alert('登入成功！');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CustomInput 
        ref={emailRef}  // ✅ 透過 forwardRef 可以接收 ref
        label="電子郵件："
        type="email"
        placeholder="請輸入電子郵件"
      />
      
      <CustomInput 
        ref={passwordRef}  // ✅ 透過 forwardRef 可以接收 ref
        label="密碼："
        type="password"
        placeholder="請輸入密碼"
      />
      
      <button type="submit">登入</button>
    </form>
  );
}

// ✅ 結果：成功驗證和聚焦！
```

**三種情況總結：**

| 情況       | 做法                      | 結果       | 使用時機                 |
| ---------- | ------------------------- | ---------- | ------------------------ |
| **情況 1** | 直接使用原生 DOM          | ✅ 可以存取 | 簡單場景，不需要封裝元件 |
| **情況 2** | 封裝元件但不用 forwardRef | ❌ 無法存取 | 會遇到問題，ref 不會傳遞 |
| **情況 3** | 使用 forwardRef           | ✅ 可以存取 | 製作可重用元件時必須使用 |

{% note warning %}
**重點整理：**
- `ref` 在 React 中是保留屬性，不會傳遞到 props
- 原生 DOM 元素可以直接接收 ref
- 自訂函式元件無法直接接收 ref
- 需要使用 `forwardRef` 才能讓函式元件接收 ref
- 這是學習 `useImperativeHandle` 的必要前提
{% endnote %}

### 前置知識 2：React.forwardRef

前面我們已經說明過 ref 在 React 中的特殊性：ref 並不會像一般 props 一樣自動傳遞給函式元件。這裡再次強調，若直接將 ref 傳給函式元件，ref 不會進入 props，導致父元件無法取得子元件的 DOM 參考。因此，若要讓函式元件支援 ref，必須使用 `forwardRef`。接下來我們會用實際範例說明這個現象與解決方式。

```javascript 問題：ref 無法直接傳遞給函式元件
import React, { useRef } from 'react';

// 子元件（函式元件）
function MyInput(props) {
  // ❌ 無法接收到 ref！
  console.log(props.ref); // undefined
  
  return <input type="text" />;
}

// 父元件
function App() {
  const inputRef = useRef();
  
  const handleFocus = () => {
    inputRef.current.focus(); // ❌ 這會出錯！
  };
  
  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={handleFocus}>聚焦輸入框</button>
    </div>
  );
}
```

**問題分析：**
- `ref` 在 React 中是保留字，不會傳遞到 `props` 中
- 函式元件預設無法接收 ref
- 父元件無法透過 ref 存取子元件內部的 DOM 元素

#### forwardRef 解決方案

`React.forwardRef` 讓函式元件能夠接收 ref，並將它轉發到內部的 DOM 元素或其他元件。

**語法結構：**
```javascript
const MyComponent = React.forwardRef((props, ref) => {
  // 第一個參數：props
  // 第二個參數：ref（從父元件傳來的）
  
  return <div ref={ref}>...</div>;
});
```

**使用 forwardRef 修正範例：**

```javascript forwardRef 基本用法
import React, { useRef, forwardRef } from 'react';

// 子元件：使用 forwardRef 包裝
const MyInput = forwardRef((props, ref) => {
  // ✅ 現在可以接收 ref 了！
  return <input type="text" ref={ref} placeholder={props.placeholder} />;
});

// 父元件
function App() {
  const inputRef = useRef();
  
  const handleFocus = () => {
    inputRef.current.focus(); // ✅ 成功！
  };
  
  const handleClear = () => {
    inputRef.current.value = ''; // ✅ 可以操作 DOM
  };
  
  return (
    <div>
      <MyInput ref={inputRef} placeholder="請輸入文字" />
      <button onClick={handleFocus}>聚焦</button>
      <button onClick={handleClear}>清空</button>
    </div>
  );
}
```

**執行結果：**
1. 點擊「聚焦」→ 輸入框獲得焦點
2. 點擊「清空」→ 輸入框內容被清空
3. 父元件可以透過 ref 直接操作子元件內部的 DOM

#### forwardRef 的運作方式
下面的範例示範如何設計一個可被父元件直接操作的 input 元件，並說明相關的實作方式。

```javascript forwardRef 詳細說明
// 1. 使用 forwardRef 包裝元件
const CustomButton = forwardRef((props, ref) => {
  // props: 包含所有傳入的 props（但不包含 ref）
  // ref: 父元件傳入的 ref
  
  const { children, onClick } = props;
  
  return (
    <button 
      ref={ref}  // 將 ref 轉發到實際的 DOM 元素
      onClick={onClick}
      style={{ padding: '10px 20px', fontSize: '16px' }}
    >
      {children}
    </button>
  );
});

// 2. 設定 displayName（方便在 React DevTools 中識別）
CustomButton.displayName = 'CustomButton';

// 3. 父元件使用
function Parent() {
  const buttonRef = useRef();
  
  const handleClick = () => {
    // 可以存取 button 的 DOM 屬性和方法
    console.log('Button width:', buttonRef.current.offsetWidth);
    buttonRef.current.style.background = 'blue';
  };
  
  return (
    <div>
      <CustomButton ref={buttonRef} onClick={handleClick}>
        點我
      </CustomButton>
    </div>
  );
}
```

{% note info %}
**為什麼要設定 displayName？**

當使用 `forwardRef` 包裝元件時，如果沒有設定 `displayName`，在 React DevTools 中會顯示為通用的 `<ForwardRef>`，這會讓除錯變得困難。

**效果對比：**
- ❌ 沒有設定：React DevTools 顯示 `<ForwardRef>`
- ✅ 設定後：React DevTools 顯示 `<CustomButton>`

當專案中有多個 forwardRef 元件時（如 `CustomInput`、`CustomButton`、`CustomModal`），設定 displayName 可以幫助你快速識別是哪個元件。

**如何安裝 React DevTools：**

1. **Chrome 瀏覽器：**
   - 開啟 [Chrome Web Store](https://chrome.google.com/webstore)
   - 搜尋 "React Developer Tools"
   - 點擊「加到 Chrome」安裝

2. **Firefox 瀏覽器：**
   - 開啟 [Firefox Add-ons](https://addons.mozilla.org/)
   - 搜尋 "React Developer Tools"
   - 點擊「加到 Firefox」安裝

3. **Edge 瀏覽器：**
   - 開啟 [Edge Add-ons](https://microsoftedge.microsoft.com/addons)
   - 搜尋 "React Developer Tools"
   - 點擊「取得」安裝

**如何使用：**
- 安裝後，打開瀏覽器的開發者工具（按 <kbd>F12</kbd>）
- 你會看到新增了「⚛️ Components」和「⚛️ Profiler」兩個分頁
- 在 Components 分頁中可以看到 React 元件樹結構
- 這時候有設定 `displayName` 的元件會顯示有意義的名稱
{% endnote %}

#### forwardRef 的限制：破壞封裝性

`forwardRef` 雖然解決了 ref 傳遞的問題，但它有一個嚴重的缺點：**父元件可以直接存取整個 DOM 節點，並進行任何操作**。這會破壞元件的封裝性，讓子元件無法控制父元件能做什麼。

舉例來說，我們設計了一個漂亮的輸入框元件，只想讓父元件能夠「聚焦」，但使用 `forwardRef` 後，父元件卻可以直接修改樣式、移除元素，甚至做出我們不希望的操作。

```javascript forwardRef 的封裝性問題
import React, { useRef, forwardRef } from 'react';

// 子元件：一個精心設計的輸入框
const FancyInput = forwardRef((props, ref) => {
  return (
    <div style={{ 
      padding: '10px', 
      border: '2px solid blue',
      borderRadius: '8px'
    }}>
      <label>{props.label}</label>
      <input 
        ref={ref}  // 直接將 ref 轉發到 input
        type="text" 
        placeholder={props.placeholder}
        style={{ 
          border: 'none',
          outline: 'none',
          fontSize: '16px'
        }}
      />
    </div>
  );
});

// 父元件
function App() {
  const inputRef = useRef();
  
  const handleGoodPractice = () => {
    // ✅ 我們希望父元件做的事：聚焦
    inputRef.current.focus();
  };
  
  const handleBadPractice = () => {
    // ❌ 但父元件也可以做這些事：
    inputRef.current.style.display = 'none';  // 隱藏元素
    inputRef.current.style.background = 'red'; // 改變樣式，破壞設計
    inputRef.current.value = '';               // 直接清空值
    inputRef.current.disabled = true;          // 禁用輸入框
    inputRef.current.remove();                 // 甚至移除元素！
  };
  
  return (
    <div>
      <FancyInput 
        ref={inputRef} 
        label="使用者名稱："
        placeholder="請輸入使用者名稱"
      />
      <button onClick={handleGoodPractice}>聚焦（正常使用）</button>
      <button onClick={handleBadPractice}>破壞元件（不當使用）</button>
    </div>
  );
}
```

**問題分析：**

使用 `forwardRef` 後，`inputRef.current` 直接指向子元件內部的 `<input>` DOM 元素，這意味著：

1. **無法限制父元件的操作**
   - 子元件設計者想：「我只想讓父元件能聚焦」
   - 但實際上：父元件可以做任何 DOM 操作

2. **破壞設計意圖**
   - 子元件精心設計了樣式和行為
   - 父元件可以直接修改，破壞一致性

3. **容易引發 bug**
   - 父元件可能誤操作（如 `.remove()`）
   - 子元件無法防禦這些不當使用

4. **違反封裝原則**
   - 好的元件設計應該隱藏內部實作細節
   - 只暴露必要的公開 API
   - `forwardRef` 暴露了整個 DOM，失去了控制權

**理想的解決方案應該是：**
- ✅ 子元件可以**選擇**要暴露哪些方法（如 `focus`、`clear`）
- ✅ 父元件**只能**呼叫這些暴露的方法
- ✅ 子元件的內部實作受到保護
- ✅ 維持良好的封裝性

{% note warning %}
**這就是為什麼需要 `useImperativeHandle`！**

- `forwardRef` 解決了「能否傳遞 ref」的問題
- `useImperativeHandle` 解決了「暴露什麼內容」的問題

結合兩者，我們可以讓子元件既能接收 ref，又能精確控制父元件可以做什麼，達到安全且靈活的元件設計。
{% endnote %}

### useImperativeHandle 概念

`useImperativeHandle` 讓你可以「自訂」子元件要暴露給父元件的方法或屬性。它必須搭配 `forwardRef` 使用，讓父元件能夠透過 ref 來呼叫子元件內部的特定功能，同時保持良好的封裝性。

{% mermaid graph TB %}
Parent["父元件<br/>Parent Component<br/><br/>const video1Ref = useRef()<br/>const video2Ref = useRef()"]

subgraph Zone1["forwardRef 包裝的子元件"]
  direction LR
  
  subgraph Child1Zone[" "]
    direction TB
    Child1["VideoPlayer 1<br/>接收 ref 參數"]
    Child1 --> UseImp1["useImperativeHandle<br/>定義暴露方法"]
    UseImp1 --> Methods1["暴露方法：<br/>play / pause<br/>reset / getCurrentTime"]
  end
  
  subgraph Child2Zone[" "]
    direction TB
    Child2["VideoPlayer 2<br/>接收 ref 參數"]
    Child2 --> UseImp2["useImperativeHandle<br/>定義暴露方法"]
    UseImp2 --> Methods2["暴露方法：<br/>play / pause<br/>reset / getCurrentTime"]
  end
end

Parent -- "① 傳遞 ref1" --> Child1
Parent -- "① 傳遞 ref2" --> Child2
Methods1 -. "③ ref1.current.play()" .-> Parent
Methods2 -. "③ ref2.current.play()" .-> Parent

style Parent fill:#ffe6e6
style Child1 fill:#e6f3ff
style Child2 fill:#e6f3ff
style UseImp1 fill:#fff4e6
style UseImp2 fill:#fff4e6
style Methods1 fill:#e6ffe6
style Methods2 fill:#e6ffe6
style Zone1 fill:#f5f5f5
style Child1Zone fill:#e6f3ff
style Child2Zone fill:#e6f3ff
{% endmermaid %}

**核心概念：**
- **forwardRef**：讓子元件能夠接收父元件傳來的 ref
- **useImperativeHandle**：自訂 ref 所能呼叫的方法
- **ref.current**：父元件透過 ref.current 呼叫子元件暴露的方法

### useImperativeHandle 語法

`useImperativeHandle` 讓你自訂當父元件使用 ref 時，子元件要暴露哪些方法或屬性。

**語法結構：**
```javascript
useImperativeHandle(ref, createHandle, [dependencies])
```

**參數詳細說明：**
- **ref**：
從 `forwardRef` 接收的 ref 物件。這是父元件傳入的 ref，我們要在這個 ref 上掛載自訂的方法。

- **createHandle**：
一個函式，回傳一個物件，定義要暴露給父元件的方法或屬性。父元件可以透過 `ref.current.METHOD_NAME()` 來呼叫。

- **dependencies**（可選）：
依賴陣列。當依賴項改變時，會重新建立暴露的方法。類似 `useCallback` 的依賴陣列。

**基本結構：**
```javascript
import { forwardRef, useImperativeHandle, useRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
  // 1. 建立內部 ref（如果需要控制 DOM）
  const internalRef = useRef();
  
  // 2. 使用 useImperativeHandle 定義暴露的方法
  useImperativeHandle(ref, () => ({
    // 暴露給父元件的方法
    method1: () => {
      // 實作。..
    },
    method2: () => {
      // 實作。..
    }
  }));
  
  // 3. 回傳 JSX
  return <div ref={internalRef}>...</div>;
});
```

### 解決方案：使用 useImperativeHandle

讓我們用 `useImperativeHandle` 來解決最早一開始前面的影片播放器問題：

```javascript 使用 useImperativeHandle 解決
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

// 子元件：使用 forwardRef 接收 ref
const VideoPlayer = forwardRef((props, ref) => {
  const { src } = props;
  const videoRef = useRef();
  
  // 使用 useImperativeHandle 暴露方法給父元件
  useImperativeHandle(ref, () => ({
    // 父元件可以呼叫這些方法
    play: () => {
      videoRef.current.play();
    },
    pause: () => {
      videoRef.current.pause();
    },
    reset: () => {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    },
    getCurrentTime: () => {
      return videoRef.current.currentTime;
    }
  }));
  
  return (
    <div>
      <video ref={videoRef} src={src} width="400" />
    </div>
  );
});

// 父元件
function App() {
  const video1Ref = useRef();
  const video2Ref = useRef();
  
  const handlePlayAll = () => {
    // ✅ 父元件可以直接控制所有播放器
    video1Ref.current.play();
    video2Ref.current.play();
  };
  
  const handlePauseAll = () => {
    video1Ref.current.pause();
    video2Ref.current.pause();
  };
  
  const handleResetAll = () => {
    video1Ref.current.reset();
    video2Ref.current.reset();
  };
  
  const handleGetTime = () => {
    const time1 = video1Ref.current.getCurrentTime();
    const time2 = video2Ref.current.getCurrentTime();
    alert(`影片 1: ${time1.toFixed(2)}秒、n 影片 2: ${time2.toFixed(2)}秒`);
  };
  
  return (
    <div>
      {/* 統一控制區 */}
      <div>
        <button onClick={handlePlayAll}>全部播放</button>
        <button onClick={handlePauseAll}>全部暫停</button>
        <button onClick={handleResetAll}>全部重置</button>
        <button onClick={handleGetTime}>查看播放時間</button>
      </div>
      
      <h2>影片 1</h2>
      <VideoPlayer ref={video1Ref} src="video1.mp4" />
      
      <h2>影片 2</h2>
      <VideoPlayer ref={video2Ref} src="video2.mp4" />
    </div>
  );
}
```

**執行結果：**
1. 點擊「全部播放」→ 兩個影片同時播放
2. 點擊「全部暫停」→ 兩個影片同時暫停
3. 點擊「全部重置」→ 兩個影片回到 0 秒並暫停
4. 點擊「查看播放時間」→ 顯示兩個影片的當前播放時間

{% note success %}
**優點：**
- ✅ 父元件可以直接控制子元件的內部功能
- ✅ 子元件只暴露必要的方法，保持封裝性
- ✅ 適合製作可重複使用的元件庫
- ✅ 避免複雜的 props 和狀態同步
{% endnote %}

### 理解依賴陣列

`useImperativeHandle` 的第三個參數是依賴陣列，用來控制何時重新建立暴露的方法。

```javascript 依賴陣列範例
const Counter = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  
  // 依賴陣列包含 count 和 step
  useImperativeHandle(ref, () => ({
    increment: () => {
      setCount(count + step); // 使用當前的 count 和 step
    },
    getCurrentCount: () => {
      return count;
    }
  }), [count, step]); // 當 count 或 step 改變時，重新建立方法
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Step: {step}</p>
      <button onClick={() => setStep(step + 1)}>增加步進值</button>
    </div>
  );
});
```

{% note warning %}
**注意：**
如果暴露的方法中使用了狀態或 props，記得將它們加入依賴陣列，否則方法會使用到過時的值（閉包陷阱）。
{% endnote %}

### 實際應用：表單控制

讓我們看一個更實用的例子：製作一個可從外部控制的表單元件。

```javascript 表單控制範例
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';

// 可控制的表單元件
const UserForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: ''
  });
  const [errors, setErrors] = useState({});
  
  // 暴露給父元件的方法
  useImperativeHandle(ref, () => ({
    // 驗證表單
    validate: () => {
      const newErrors = {};
      
      if (!formData.username) {
        newErrors.username = '請輸入使用者名稱';
      }
      
      if (!formData.email) {
        newErrors.email = '請輸入電子郵件';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = '電子郵件格式錯誤';
      }
      
      if (!formData.age) {
        newErrors.age = '請輸入年齡';
      } else if (formData.age < 18) {
        newErrors.age = '年齡必須大於 18 歲';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    
    // 獲取表單資料
    getData: () => {
      return formData;
    },
    
    // 重置表單
    reset: () => {
      setFormData({ username: '', email: '', age: '' });
      setErrors({});
    },
    
    // 設定表單資料
    setData: (data) => {
      setFormData(data);
      setErrors({});
    },
    
    // 聚焦到第一個錯誤欄位
    focusFirstError: () => {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      }
    }
  }), [formData, errors]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }));
    // 清除該欄位的錯誤
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };
  
  return (
    <div>
      <div>
        <label>使用者名稱：</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
      </div>
      
      <div>
        <label>電子郵件：</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      
      <div>
        <label>年齡：</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
      </div>
    </div>
  );
});

// 父元件
function RegistrationPage() {
  const formRef = useRef();
  
  const handleSubmit = () => {
    // 驗證表單
    if (formRef.current.validate()) {
      const data = formRef.current.getData();
      console.log('提交資料：', data);
      alert('註冊成功！');
      formRef.current.reset();
    } else {
      formRef.current.focusFirstError();
    }
  };
  
  const handleReset = () => {
    formRef.current.reset();
  };
  
  const handleFillTestData = () => {
    formRef.current.setData({
      username: 'testuser',
      email: 'test@example.com',
      age: 25
    });
  };
  
  return (
    <div>
      <h2>使用者註冊</h2>
      <UserForm ref={formRef} />
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit}>提交</button>
        <button onClick={handleReset}>重置</button>
        <button onClick={handleFillTestData}>填入測試資料</button>
      </div>
    </div>
  );
}
```

### 何時使用 useImperativeHandle？

讓我們先比較不同的父子元件溝通方式：

| 方法                    | 適用場景           | 優點                 | 缺點                           |
| ----------------------- | ------------------ | -------------------- | ------------------------------ |
| **Props**               | 大部分情況         | 單向資料流、易於理解 | 無法讓父元件主動呼叫子元件方法 |
| **Callback**            | 子元件通知父元件   | 符合 React 慣例      | 只能被動接收事件               |
| **useImperativeHandle** | 需要主動控制子元件 | 父元件可直接呼叫方法 | 打破單向資料流、容易濫用       |
| **Context**             | 跨層級共享狀態     | 避免 props drilling  | 不適合頻繁更新的狀態           |

在選擇父子元件溝通方式時，建議依照以下優先順序進行：

1. **優先使用 Props**  
   - 適用於大多數情境，父元件透過 props 傳遞資料與狀態給子元件，維持單向資料流，易於理解與維護。

2. **需要子元件主動通知父元件時，使用 Callback（回呼函式）**  
   - 讓子元件在特定事件發生時，呼叫父元件傳遞下來的函式，達到事件上報的效果。

3. **僅在必要時使用 useImperativeHandle**  
   - 適用於以下特殊場景：
     - 需要讓父元件主動控制子元件的 DOM 行為（如 focus、scroll 等）
```javascript
// 讓父元件控制輸入框聚焦
useImperativeHandle(ref, () => ({
focus: () => inputRef.current.focus(),
select: () => inputRef.current.select()
}));
```
     - 整合第三方函式庫時需暴露特定方法
```javascript
// 包裝 Chart.js 等函式庫
useImperativeHandle(ref, () => ({
  updateChart: (data) => chartInstance.update(data),
  resetZoom: () => chartInstance.resetZoom()
}));
```
     - 製作可重複使用的元件庫，需提供程式化控制介面
```javascript
// 製作 UI 元件庫時提供程式化控制
useImperativeHandle(ref, () => ({
  open: () => setIsOpen(true),
  close: () => setIsOpen(false),
  toggle: () => setIsOpen(prev => !prev)
}));
```
   - 不適合使用 useImperativeHandle 的場景：
     - ❌ 可以用 props 解決的情況
     - ❌ 簡單的狀態傳遞
     - ❌ 頻繁的資料同步
     - ❌ 複雜的業務邏輯

依照上述順序選擇，能確保元件設計既符合 React 的最佳實踐，也能兼顧彈性與封裝性。

### 最佳實踐
在學習 `useImperativeHandle` 的實作細節之前，讓我們先了解一些實務上的最佳實踐。`useImperativeHandle` 雖然能讓父元件主動呼叫子元件的方法，但如果使用不當，容易造成元件耦合度過高、維護困難。因此，建議遵循以下原則來設計你的元件介面，確保彈性與封裝性兼具。

{% note info %}
**小技巧：設計 useImperativeHandle 介面時的思考重點**
- 只暴露必要的操作方法，避免直接暴露 DOM 節點
- 方法名稱要語意明確，方便團隊協作與維護
- 適當加入錯誤處理，提升元件健壯性
- 若使用 TypeScript，記得定義好 ref 的型別
{% endnote %}

#### 不要暴露整個 DOM 節點

```javascript
// ❌ 不好：暴露整個 DOM
useImperativeHandle(ref, () => inputRef.current);

// ✅ 好：只暴露特定方法
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus(),
  clear: () => inputRef.current.value = ''
}));
```

#### 使用描述性的方法名稱

```javascript
// ❌ 不好：方法名不清楚
useImperativeHandle(ref, () => ({
  do: () => { /* ... */ },
  fn: () => { /* ... */ }
}));

// ✅ 好：清楚的方法名稱
useImperativeHandle(ref, () => ({
  play: () => { /* ... */ },
  pause: () => { /* ... */ },
  reset: () => { /* ... */ }
}));
```

#### 加入錯誤處理

```javascript
useImperativeHandle(ref, () => ({
  play: () => {
    if (!videoRef.current) {
      console.error('Video element not ready');
      return;
    }
    videoRef.current.play().catch(error => {
      console.error('Play failed:', error);
    });
  }
}));
```

#### 提供 TypeScript 型別定義

```typescript
// 定義暴露的方法型別
interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  reset: () => void;
  getCurrentTime: () => number;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    play: () => { /* ... */ },
    pause: () => { /* ... */ },
    reset: () => { /* ... */ },
    getCurrentTime: () => videoRef.current.currentTime
  }));
  
  return <video />;
});
```

### 總結
`useImperativeHandle` 必須搭配 `forwardRef` 使用，讓父元件可以呼叫子元件內部自訂的方法，例如 focus、reset 等。這種做法會打破 React 的單向資料流，因此建議僅在必要時（如控制 DOM、整合第三方函式庫、設計可重用元件 API）才使用。

使用時，應只暴露必要的方法，不要直接暴露整個 DOM 節點。方法名稱要清楚，並記得處理錯誤情況。如果方法中用到 state 或 props，務必加入依賴陣列，避免閉包陷阱。大多數情況下，優先考慮用 props 與 callback 溝通，只有在無法用 props 解決時才考慮 `useImperativeHandle`。

**重點整理：**
- 必須與 `forwardRef` 搭配
- 只暴露必要的命令式方法
- 適合用於 DOM 操作、第三方函式庫整合、元件 API 封裝
- 避免用於一般狀態管理
- 優先考慮 props/callback，命令式控制為輔

## useSyncExternalStore
在 React 應用中，我們通常用 `useState` 或 `useReducer` 來管理元件內部狀態。但有時候，我們需要訂閱「外部資料來源」，例如：
- 瀏覽器 API（如視窗大小 `window.innerWidth`、網路狀態 `navigator.onLine`）
- 第三方狀態管理庫（如 Redux、Zustand、MobX）
- WebSocket 連線
- localStorage/sessionStorage

在 React 18 之前，訂閱這些外部資料會遇到一個嚴重問題：**在並發模式（Concurrent Mode）下可能會出現「撕裂」（Tearing）現象**。

### 問題案例：外部資料訂閱的撕裂（Tearing）問題

假設我們想顯示瀏覽器視窗的寬度，並在視窗大小改變時更新顯示：

```javascript 問題：用 useEffect 訂閱外部資料（舊做法）
import React, { useState, useEffect } from 'react';

// 自訂 Hook：訂閱視窗寬度
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width;
}

// 三個元件都使用這個 Hook
function Header() {
  const width = useWindowWidth();
  return <div>Header - 視窗寬度：{width}px</div>;
}

function Sidebar() {
  const width = useWindowWidth();
  return <div>Sidebar - 視窗寬度：{width}px</div>;
}

function Content() {
  const width = useWindowWidth();
  return <div>Content - 視窗寬度：{width}px</div>;
}

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Content />
    </>
  );
}
```

**問題：為什麼會出現「撕裂」？**

撕裂問題的本質在於：**每個元件在渲染時分別取得外部資料，導致同一畫面上顯示出彼此不一致的數據**。以下以並發模式為例，說明當使用者快速調整視窗大小時，會出現什麼狀況：

{% mermaid timeline %}
title 撕裂現象
section 使用者持續調整視窗（1200px → 800px）
0ms
: 捕獲 window.innerWidth = 1200px
: 渲染 Header 元件
10ms
: 捕獲 window.innerWidth = 1000px
: 渲染 Sidebar 元件
20ms 
: 捕獲 window.innerWidth = 800px
: 渲染 Content 元件
section 提交到 DOM，畫面顯示
30ms 
: Header = 1200px（❌ 舊數據）
: Sidebar = 1000px（❌ 中間數據）
: Content = 800px（✓ 最新數據）
{% endmermaid %}

**撕裂現象說明：**
- 每個元件在**不同時間點**各自捕獲視窗寬度，導致讀取到不同的值
- 最終畫面同時出現三種不同的寬度 → 這就是「撕裂」（Tearing）！
- 使用者看到的是「不一致」的 UI 狀態

**為什麼 Header 沒有跟著更新到 1000px 或 800px？**
在這個例子中，Header 沒有跟著更新到 1000px 或 800px，主要原因在於 React 並發模式下的渲染流程設計。當使用者快速調整視窗大小時，每個元件（如 Header、Sidebar、Content）在各自被渲染的時間點，分別讀取到當下的 `window.innerWidth`。React 為了提升效能，會優先讓畫面盡快顯示出來，因此 Header 可能在視窗寬度還是 1200px 時就已經完成渲染，接著 Sidebar 和 Content 則在後續不同的時間點分別取得 1000px 和 800px 的寬度。

這種設計下，React 不會在渲染進行到一半時就插入新的狀態更新，而是將像 `setWidth(1000)` 這類的狀態變更排到下一個渲染週期。也就是說，當前的渲染流程會持續到底，不會被中斷來處理新的外部資料變化。因此，Header 只會顯示它最初渲染時取得的寬度值（1200px），而 Sidebar 和 Content 則分別顯示各自渲染時取得的寬度（1000px、800px），導致同一畫面上出現不一致的數據，也就是所謂的「撕裂」現象。

總結來說，撕裂的產生是因為每個元件在不同的渲染時機各自讀取外部資料，React 又不會在渲染過程中即時同步所有元件的外部狀態，最終造成畫面短暫或持續的不一致。

**撕裂現象是短暫的嗎？**
不一定！這取決於兩個關鍵因素：

1. **外部資料變化的頻率**
   - 如果外部資料（如 `window.innerWidth`）**持續快速變化**，撕裂現象會**一直存在**
   - 例如：使用者持續拖曳視窗調整大小時，每次渲染都可能讀到不同的值
   - 即使渲染週期完成，下一次變化又會產生新的撕裂

2. **使用 useEffect + useState 的方式**
   - 即使外部資料穩定下來，各元件的 `useEffect` **執行時機仍然不同**
   - React 無法保證所有元件在同一時間點「快照」相同的值
   - 在並發模式下，渲染可能被中斷和恢復，進一步加劇不一致問題
| 問題點             | 說明                                                            |
| ------------------ | --------------------------------------------------------------- |
| **各自為政**       | 每個元件都有自己的 `useState`，無法共享「快照時間點」           |
| **讀取時機不同**   | Header、Sidebar、Content 在不同時間點呼叫 `window.innerWidth`   |
| **React 無法追蹤** | React 不知道這些狀態來自同一個外部資料源（`window.innerWidth`） |
| **並發模式的本質** | 渲染可以被中斷，恢復時外部資料可能已經變了                      |

**結論：**
- ❌ 在快速變化的場景下（如視窗調整、滾動事件），撕裂會持續發生
- ❌ 即使資料穩定，也可能在某些渲染週期出現短暫撕裂
- ✅ 使用 `useSyncExternalStore` 可以完全避免撕裂，確保所有元件讀取到一致的快照值

### useSyncExternalStore 語法
`useSyncExternalStore` 是 React 18 推出的官方 Hook，專為**安全訂閱外部資料來源**而設計，並在資料變化時自動重新渲染元件，能在並發模式下徹底解決「撕裂」（Tearing）問題。

**三大核心機制：**

| 機制                               | 說明                                   | 作用                                 |
| ---------------------------------- | -------------------------------------- | ------------------------------------ |
| **同步快照（Sync）**               | 所有元件在同一時間點讀取相同的外部資料 | 避免各元件取得不同版本的數據         |
| **外部資料來源（External Store）** | 訂閱 React 狀態以外的資料源            | 追蹤瀏覽器 API、全域物件、第三方庫等 |
| **訂閱通知（Subscribe）**          | 外部資料變動時自動通知 React           | 觸發所有相關元件重新渲染             |

**語法結構：**
useSyncExternalStore 需要提供指定參數來設定外部資料來源和同步快照，並返回當前外部資料的快照值。

```javascript
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

{% note warning %}
**重要注意事項：**
- React 會在每次渲染時呼叫 `subscribe` 和 `getSnapshot`，如果這些函式在元件內部定義，會導致每次渲染都建立新的函式參考，造成重複訂閱（re-subscribe）與效能浪費。
- 建議將 `subscribe` 和 `getSnapshot` 定義在元件外部，或用 `useCallback` 包裝，確保函式參考穩定，避免不必要的重購與重新渲染。
- 這樣可以提升效能、減少記憶體洩漏風險，並讓 UI 更加穩定。
{% endnote %}

**參數詳細說明：**

- **subscribe**（必填）：
訂閱函式，當外部資料變化時，React 會呼叫這個函式來訂閱變化。它接收一個 `callback` 參數，當資料變化時需要呼叫這個 callback 通知 React。必須回傳一個「取消訂閱」的函式。
```javascript
const subscribe = (callback) => {
  // 訂閱資料變化
  externalStore.addEventListener('change', callback);
  
  // 回傳取消訂閱的函式
  return () => {
    externalStore.removeEventListener('change', callback);
  };
};
```
{% note warning %}
**subscribe 函式必須回傳清理函式**
- 元件卸載時會自動呼叫清理函式
- 忘記取消訂閱會造成記憶體洩漏
{% endnote %}

- **getSnapshot**（必填）：
getSnapshot 是一個取得快照的函式，負責回傳目前外部資料的最新值。React 在渲染時會自動呼叫這個函式，來取得最新快照。**只要資料沒變，getSnapshot 必須回傳同一個值的參考**，這樣 React 才能正確判斷是否需要重新渲染。
```javascript
const getSnapshot = () => {
  // 回傳當前的外部資料
  return externalStore.getCurrentValue();
};
```
{% note info %}
**getSnapshot 必須回傳「穩定且一致」的值**
- 如果外部資料沒有變化，每次呼叫都要回傳完全相同的參考（React 會用 `Object.is` 來判斷是否相同）
- 切勿每次都回傳新的物件或陣列，否則會造成元件不必要的重新渲染
- 建議：可利用 memoization（記憶化）或快取機制，確保回傳值的參考穩定
{% endnote %}

- **getServerSnapshot**（可選）：
伺服器端快照函式，用於伺服器端渲染（SSR）。因為伺服器端沒有瀏覽器 API，需要提供一個預設值。
```javascript
const getServerSnapshot = () => {
  // 回傳伺服器端的預設值
  return defaultValue;
};
```
{% note info %}
**SSR 注意事項**
- 如果使用 SSR，務必提供 `getServerSnapshot`
- 伺服器端和客戶端的初始值應該一致，避免 hydration 錯誤
{% endnote %}

### 解決方案：使用 useSyncExternalStore

讓我們用 `useSyncExternalStore` 來重寫前面的視窗寬度範例：

{% tabs useSyncExternalStore 範例 %}
<!-- tab 錯誤寫法❌ -->
```javascript 錯誤：函式定義在 Hook 內部
import React, { useSyncExternalStore } from 'react';

// ❌ 問題：每次呼叫 useWindowWidth 都會建立新的函式參考
function useWindowWidth() {
  const width = useSyncExternalStore(
    // ❌ 每次渲染都建立新的 subscribe 函式
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    // ❌ 每次渲染都建立新的 getSnapshot 函式
    () => window.innerWidth,
    // ❌ 每次渲染都建立新的 getServerSnapshot 函式
    () => 1024
  );
  
  return width;
}

// 使用自訂 Hook 的元件
function WindowWidth() {
  const width = useWindowWidth(); // 每次渲染都重新訂閱！
  return <div>視窗寬度：{width}px</div>;
}

function App() {
  return (
    <div>
      <WindowWidth />
    </div>
  );
}
```

**問題分析：**
- 每次 `WindowWidth` 元件渲染時，都會呼叫 `useWindowWidth()`
- 每次呼叫都建立新的 subscribe、getSnapshot、getServerSnapshot 函式
- React 發現函式參考變了，就會**重新訂閱**（取消舊訂閱，建立新訂閱）
- 造成不必要的效能浪費和事件監聽器的重複註冊
<!-- endtab -->

<!-- tab 正確寫法✅（方法一：定義在外部） -->
```javascript 正確：函式定義在元件外部
import React, { useSyncExternalStore } from 'react';

// ✅ 將函式定義在元件外部，確保參考穩定
const subscribe = (callback) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

const getSnapshot = () => window.innerWidth;

const getServerSnapshot = () => 1024;

// 自訂 Hook：訂閱視窗寬度
function useWindowWidth() {
  const width = useSyncExternalStore(
    subscribe,        // ✅ 參考穩定，不會重新訂閱
    getSnapshot,      // ✅ 參考穩定
    getServerSnapshot // ✅ 參考穩定
  );
  
  return width;
}

// 使用自訂 Hook 的元件
function WindowWidth() {
  const width = useWindowWidth();
  return <div>視窗寬度：{width}px</div>;
}

function App() {
  return (
    <div>
      <WindowWidth />
    </div>
  );
}
```

**優點：**
- ✅ 函式參考永遠相同，不會重新訂閱
- ✅ 效能最佳
- ✅ 程式碼簡潔
<!-- endtab -->

<!-- tab 正確寫法✅（方法二：使用 useCallback） -->
```javascript 正確：使用 useCallback 包裝
import React, { useSyncExternalStore, useCallback } from 'react';

// 自訂 Hook：訂閱視窗寬度
function useWindowWidth() {
  // ✅ 使用 useCallback 確保函式參考穩定
  const subscribe = useCallback((callback) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, []); // 空依賴陣列，函式只建立一次

  const getSnapshot = useCallback(() => window.innerWidth, []);
  
  const getServerSnapshot = useCallback(() => 1024, []);

  const width = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  
  return width;
}

// 使用自訂 Hook 的元件
function WindowWidth() {
  const width = useWindowWidth();
  return <div>視窗寬度：{width}px</div>;
}

function App() {
  return (
    <div>
      <WindowWidth />
    </div>
  );
}
```

**適用情境：**
- 當函式需要存取元件的 props 或 state 時
- 無法將函式定義在元件外部時
- 需要動態產生訂閱邏輯時
<!-- endtab -->
{% endtabs %}

**執行結果說明：**

當你調整瀏覽器視窗大小時，三個 `WindowWidth` 元件會同時顯示相同的寬度數值。由於使用了 `useSyncExternalStore`，不會出現撕裂（tearing）問題，確保 UI 始終保持一致，所有元件都能正確同步顯示最新的視窗寬度。

**優點：**
- ✅ 解決並發模式下的撕裂問題
- ✅ 所有元件讀取到相同的值
- ✅ 自動處理訂閱和取消訂閱
- ✅ 支援伺服器端渲染（SSR）

### 實際應用：常見的外部資料訂閱
在實務開發中，`useSyncExternalStore` 主要用於訂閱「外部可觀察資料來源」的狀態，例如：網路連線狀態、localStorage、WebSocket、瀏覽器 API 等。這些外部來源的資料變動不受 React 控制，若直接用一般 state 可能會導致 UI 不一致或撕裂（tearing）問題。`useSyncExternalStore` 能確保 React 在並發渲染（Concurrent Rendering）下，所有訂閱該資料的元件都能取得最新且一致的狀態，特別適合「多個元件需要同步外部資料」的場景，並自動處理訂閱與取消訂閱，避免重複監聽或記憶體洩漏。

以下將介紹幾個常見的外部資料訂閱應用範例，幫助你快速上手。

{% note warning %}
**注意事項**

以下所有範例都沒有將 `subscribe`、`getSnapshot` 等函式放在外部或用 `useCallback` 包覆，因此**每次渲染都會產生新函式**，導致效能問題（如重複訂閱、記憶體洩漏）。實務上應將這些函式宣告在元件外部，或用 `useCallback` 包裹，確保函式參考穩定，避免不必要的副作用。
{% endnote %}

#### 1. 訂閱網路狀態

```javascript 訂閱網路狀態
import React, { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    // 訂閱 online/offline 事件
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // 取得當前網路狀態
    () => navigator.onLine,
    // SSR 預設為線上
    () => true
  );
  
  return isOnline;
}

function NetworkStatus() {
  const isOnline = useOnlineStatus();
  
  return (
    <div style={{ 
      padding: '10px', 
      background: isOnline ? '#4caf50' : '#f44336',
      color: 'white'
    }}>
      網路狀態：{isOnline ? '線上 🟢' : '離線 🔴'}
    </div>
  );
}
```

#### 2. 訂閱 localStorage

```javascript 訂閱 localStorage
import React, { useSyncExternalStore } from 'react';

function useLocalStorage(key, defaultValue) {
  const value = useSyncExternalStore(
    // 訂閱 storage 事件（跨 tab 同步）
    (callback) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
    // 取得當前 localStorage 的值
    () => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    },
    // SSR 時回傳預設值
    () => defaultValue
  );
  
  const setValue = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    // 手動觸發 storage 事件（同 tab 更新）
    window.dispatchEvent(new Event('storage'));
  };
  
  return [value, setValue];
}

function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>當前主題：{theme}</p>
      <button onClick={() => setTheme('light')}>淺色</button>
      <button onClick={() => setTheme('dark')}>深色</button>
    </div>
  );
}
```

#### 3. 訂閱第三方狀態管理庫

```javascript 訂閱外部 Store
import React, { useSyncExternalStore } from 'react';

// 外部 store 範例（類似 Redux）
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
      {/* 兩個元件共享同一個 store，計數永遠同步 */}
    </div>
  );
}
```

**優點：**
- ✅ 多個元件共享同一個外部狀態
- ✅ 避免並發模式下的撕裂問題
- ✅ 所有訂閱者同時更新

### 何時使用 useSyncExternalStore？
讓我們比較兩種訂閱外部資料的方式：

| 特性             | useEffect + useState | useSyncExternalStore |
| ---------------- | -------------------- | -------------------- |
| **並發模式安全** | ❌ 可能出現撕裂       | ✅ 完全安全           |
| **多元件同步**   | ❌ 可能不一致         | ✅ 保證一致           |
| **SSR 支援**     | ⚠️ 需額外處理         | ✅ 內建支援           |
| **使用複雜度**   | ✅ 較簡單             | ⚠️ 稍複雜             |
| **適用場景**     | React 17 及以下      | React 18+ 並發模式   |

**適合使用：**
1. ✅ 訂閱瀏覽器 API（window、navigator 等）
2. ✅ 整合第三方狀態管理庫（Redux、Zustand、Jotai 等）
3. ✅ 訂閱 WebSocket 或其他即時資料
4. ✅ 需要在多個元件間共享外部狀態
5. ✅ 使用 React 18+ 並發模式

**不需要使用：**
1. ❌ React 內部狀態管理（用 useState / useReducer）
2. ❌ 父子元件溝通（用 props / callback）
3. ❌ 跨元件狀態共享（用 Context）
4. ❌ 伺服器資料獲取（用 React Query / SWR）

### 總結

`useSyncExternalStore` 是 React 18 專門為解決並發模式下外部資料訂閱問題而設計的 Hook。它透過「同步讀取快照」的機制，確保所有元件在同一時間點讀取到相同的外部資料，避免 UI 不一致的問題。

**核心價值：**
- 解決並發模式下的撕裂（Tearing）問題
- 確保多個元件訂閱相同外部資料時的一致性
- 提供官方的外部資料訂閱標準做法

**使用要點：**
- 必須提供 `subscribe` 函式（訂閱機制）
- 必須提供 `getSnapshot` 函式（取得當前值）
- SSR 時需提供 `getServerSnapshot`（預設值）
- 適合訂閱瀏覽器 API 和第三方狀態管理庫

**最佳實踐：**
- 將訂閱邏輯封裝成自訂 Hook（如 `useWindowWidth`、`useOnlineStatus`）
- 確保 `getSnapshot` 回傳的值在未變化時保持相同
- 記得在 `subscribe` 中回傳取消訂閱函式
- SSR 應用一定要提供 `getServerSnapshot`

{% note warning %}
**記住：**
`useSyncExternalStore` 是為「外部資料源」設計的，不要用它來管理 React 內部狀態。大部分情況下，`useState`、`useReducer` 和 `useContext` 就足夠了。只有在需要訂閱 React 之外的資料時，才使用這個 Hook。
{% endnote %}

# React 19 新增 Hooks

React 19 引入了兩個全新的 Hooks，進一步提升了表單處理和樂觀更新的開發體驗。

- `useActionState` 簡化了表單狀態管理，提供更好的用戶體驗
- `useOptimistic` 讓 UI 反應更加即時，減少用戶等待時間
- 兩者都與 Server Components 和 Server Actions 完美整合
- 提供更直覺的錯誤處理和恢復機制

## useActionState

在傳統的表單處理中，我們需要手動管理各種狀態：表單提交中（loading）、錯誤訊息、成功訊息、表單資料等。這會導致：
- 需要多個 `useState` 來管理不同狀態
- 需要 `useEffect` 來處理非同步提交
- 需要手動處理 loading 狀態和錯誤處理
- 程式碼複雜且容易出錯

`useActionState` 是 React 19 新增的 Hook，專門用於**簡化表單處理和非同步狀態管理**，將表單提交、pending 狀態、錯誤處理整合在一起。

### 問題案例：傳統表單處理的複雜性

假設我們要建立一個聯絡表單，需要處理提交、驗證、錯誤和成功訊息：

```javascript 問題：傳統做法（需要管理多個狀態）
import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 步驟 1：前端驗證
      if (!name || name.length < 2) {
        throw new Error('姓名至少需要 2 個字元');
      }
      if (!email || !email.includes('@')) {
        throw new Error('請輸入有效的電子郵件');
      }

      // 步驟 2：驗證通過後，才呼叫 API
      // 模擬 API 呼叫
      // 這裡只是模擬 API 呼叫，並沒有捕獲任何回傳資料
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 如果你想捕獲正常 API response，可以這樣寫：
      /*
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email })
        });
        const data = await response.json();
        alert('後端回應：' + data.message); // 假設後端有回傳 message 欄位
      */

      // 步驟 3：API 成功回應
      setSuccess(true);
      setName('');
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>聯絡表單</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            姓名：
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </label>
        </div>
        <div>
          <label>
            電子郵件：
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? '提交中。..' : '提交'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>錯誤：{error}</p>}
      {success && <p style={{ color: 'green' }}>表單提交成功！</p>}
    </div>
  );
}
```

**問題分析：**

| 問題             | 說明                                                         |
| ---------------- | ------------------------------------------------------------ |
| **狀態管理複雜** | 需要 5 個 `useState`：name、email、isLoading、error、success |
| **重複的邏輯**   | 每次提交都要手動設定 loading、清除錯誤、處理 try-catch       |
| **受控元件**     | 需要為每個欄位寫 `value` 和 `onChange`                       |
| **程式碼冗長**   | 簡單的表單就需要 50+ 行程式碼                                |

{% note danger %}
**傳統做法的痛點：**
- ❌ 需要手動管理多個相關狀態
- ❌ 需要手動處理 loading 和錯誤狀態
- ❌ 需要在 `try-catch-finally` 中管理狀態
- ❌ 程式碼冗長且容易出錯
{% endnote %}

### useActionState 語法
`useActionState` 將**表單動作（Action）**和**狀態管理**整合在一起，簡化表單處理流程：

| 核心概念         | 說明                                       | 優勢                   |
| ---------------- | ------------------------------------------ | ---------------------- |
| **Action 函式**  | 處理表單提交的非同步函式                   | 集中處理邏輯，易於測試 |
| **State 管理**   | 自動管理表單狀態（成功/錯誤/資料）         | 不需要多個 `useState`  |
| **Pending 狀態** | 自動追蹤非同步操作進行中                   | 不需要手動管理 loading |
| **非受控表單**   | 使用 `FormData`，不需要 `value`/`onChange` | 減少重新渲染，提升效能 |

**基本語法：**

```javascript
const [state, formAction, isPending] = useActionState(action, initialState, permalink?)
```

#### 參數說明：

**1. action（必填）— Action 函式**
`action` 是一個負責處理表單提交的**非同步函式**，在每次表單送出時自動被呼叫。它會接收兩個參數：

- `previousState`：上一次的狀態物件，通常用於累積資料、顯示錯誤訊息或追蹤提交結果。
- `formData`：一個 `FormData` 物件，包含本次表單所有欄位的資料。你可以透過 `formData.get('欄位名稱')` 取得對應欄位的值。

這個 action 函式必須回傳一個新的狀態物件（格式不限），React 會自動將這個狀態設為最新狀態並觸發元件重新渲染。你可以在這裡集中處理 API 請求、資料驗證、錯誤處理等所有表單邏輯，完全不需要手動管理多個 useState。

```javascript
async function action(previousState, formData) {
  // previousState: 上一次的狀態
  // formData: 表單資料（FormData 物件）
  
  const name = formData.get('name'); // 取得表單欄位值
  
  // 處理邏輯。..
  
  // 回傳新的狀態
  return {
    success: true,
    message: '提交成功！'
  };
}
```

| 參數            | 說明                                         |
| --------------- | -------------------------------------------- |
| `previousState` | 上一次的狀態，可用於累積資料或錯誤處理       |
| `formData`      | 表單資料，使用 `formData.get('欄位名')` 取值 |
| **回傳值**      | 新的狀態物件，可以是任何形狀的物件           |

**2. initialState（必填）— 初始狀態**

`initialState`（初始狀態物件）用來設定 `useActionState` 在元件初次渲染時的預設狀態。你可以根據表單需求自訂內容，常見欄位如下：

- `success`：布林值，表示表單是否成功送出。
- `error`：字串或物件，儲存錯誤訊息（如驗證失敗、API 錯誤等）。
- `message`：字串，顯示提示或成功訊息。
- `data`：物件，儲存後端回傳的額外資料（可選）。

每次 action 執行時，`initialState` 會作為 `previousState` 傳入 action 函式，讓你能根據前一次狀態進行資料累積、錯誤重設或狀態清空。這樣設計能讓表單狀態管理更集中、易於維護與擴充。

```javascript
const initialState = {
  success: false,
  error: null,
  message: null,
  data: {}
};
```

**3. permalink（可選）— 成功後自動跳轉**

`permalink` 是一個可選參數，用來指定 action **執行成功後**要自動跳轉的頁面網址。

**重要觀念：**
- 這是**客戶端跳轉**，由 React 在前端自動執行
- 只有當 action 成功執行完畢後才會跳轉
- 跳轉目標是固定的，不能根據結果動態改變
- 如果需要條件式跳轉，請在元件內用 React Router 的 `router.push()`（或 `useNavigate`）手動實現。

在決定是否使用跳轉功能前，先思考：**這個表單送出後，使用者應該留在當前頁面還是跳轉到新頁面？**

| 場景       | 是否跳轉 | 建議做法                      | 原因                     |
| ---------- | -------- | ----------------------------- | ------------------------ |
| 訂閱電子報 | ❌ 不跳轉 | 在當前頁面顯示成功訊息        | 輕量操作，不需打斷使用者 |
| 搜尋/篩選  | ❌ 不跳轉 | 在當前頁面顯示結果            | 即時回饋，保持操作流暢度 |
| 聯絡表單   | ✅ 跳轉   | 使用 `permalink` 跳到感謝頁   | 提供正式的確認體驗       |
| 註冊成功   | ✅ 跳轉   | 使用 `permalink` 跳到儀表板   | 引導使用者進入主要功能   |
| 訂單提交   | ✅ 跳轉   | 使用 `permalink` 跳到確認頁   | 顯示訂單詳情             |
| 支付流程   | ✅ 跳轉   | 使用 `router.push()` 條件跳轉 | 需根據結果跳到不同頁面   |

```javascript
// 範例：聯絡表單成功後自動跳轉到感謝頁
const [state, formAction, isPending] = useActionState(
  submitContactForm,  // action 函式
  null,               // 初始狀態
  '/thank-you'        // ← 成功後自動跳轉到此頁面
);
```

{% note warning %}
**常見誤解：permalink 不是伺服器端跳轉**

許多人誤以為 `permalink` 是由伺服器決定跳轉目標，但實際上：
- 跳轉目標由**前端程式碼事先指定**（寫在 `useActionState` 的第三個參數）
- 跳轉由**前端自動執行**（在 action 成功後）
- 伺服器只負責處理資料，不參與跳轉決策

如果你需要真正的「伺服器端跳轉」（由伺服器決定跳轉目標），請在 Server Action 中使用 Next.js 的 `redirect()` 函式。
{% endnote %}

{% tabs 表單跳轉範例，1 %}
<!-- tab 不跳轉直接顯示訊息 -->
**適用場景：** 訂閱電子報、快速操作、即時回饋

**特點：**
- ✅ 提交後**留在當前頁面**
- ✅ 透過 `state` 顯示成功或錯誤訊息
- ✅ 不打斷使用者的瀏覽流程

```javascript
import { useActionState } from 'react';

async function subscribeNewsletter(prevState, formData) {
  const email = formData.get('email');
  
  // 驗證
  if (!email || !email.includes('@')) {
    return { error: '請輸入有效的電子郵件' };
  }
  
  // 呼叫 API
  await fetch('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
  
  // ✅ 回傳成功訊息，不跳轉頁面
  return { success: true, message: '訂閱成功！感謝您的支持。' };
}

function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeNewsletter,
    null  // ← 注意：沒有第三個 permalink 參數
  );
  
  return (
    <form action={formAction}>
      <input type="email" name="email" placeholder="輸入您的電子郵件" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '訂閱中。..' : '訂閱電子報'}
      </button>
      {state?.success && <p style={{ color: 'green' }}>{state.message}</p>}
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  );
}
```
<!-- endtab -->

<!-- tab 使用 permalink：固定跳轉 -->
**適用場景：** 聯絡表單、註冊、訂單提交

**關鍵限制：** `permalink` 只能指定**一個固定的 URL**，無法根據結果動態改變。

**特點：**
- ✅ 提交成功後**自動跳轉**到指定頁面
- ✅ 寫法簡單，不需額外的路由 hook
- ✅ 適合「成功後總是跳到同一頁」的場景
- ❌ 無法條件式跳轉（例如：成功 → A 頁、失敗 → B 頁）

```javascript
import { useActionState } from 'react';

async function submitContactForm(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // 驗證失敗
  if (!name || !email || !message) {
    // ⚠️ 驗證失敗時「不會跳轉」，留在當前頁面
    return { error: '請填寫所有欄位' };
  }
  
  // 呼叫 API
  await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message })
  });
  
  // ✅ 回傳成功，前端會自動跳到 '/thank-you'
  return { success: true };
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    null,
    '/thank-you'  // ← 固定跳轉到這個 URL（無法動態改變）
  );
  
  return (
    <form action={formAction}>
      <input type="text" name="name" placeholder="姓名" required />
      <input type="email" name="email" placeholder="電子郵件" required />
      <textarea name="message" placeholder="留言內容" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '送出中。..' : '送出'}
      </button>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  );
}
```

{% note warning %}
**permalink 的限制：**

```javascript
// ❌ 無法這樣做：根據結果跳到不同頁面
const [state, formAction] = useActionState(
  submitForm,
  null,
  result.success ? '/success' : '/failed'  // ← 不支援條件判斷！
);

// ❌ 也無法這樣做：在 action 內動態改變跳轉目標
async function submitForm(prev, data) {
  const result = await callAPI(data);
  // permalink 在這裡無法改變，它是在 useActionState 初始化時就固定了
  return result;
}
```

如果需要條件式跳轉，必須使用下一個範例的方法。
{% endnote %}
<!-- endtab -->

<!-- tab  React Router 條件式導向 -->
**適用場景：** 支付流程、多步驟表單、需要根據結果決定跳轉目標

**關鍵優勢：** 可以在 action 執行後，根據不同結果跳轉到不同頁面。

**特點：**
- ✅ 完全彈性，可以根據任何條件決定跳轉
- ✅ 支援複雜的業務邏輯
- ✅ 可以在跳轉前執行其他操作
- ❌ 需要額外引入路由 hook（如 `useNavigate`）
- ❌ 程式碼稍微複雜一些

```javascript
import { useNavigate } from 'react-router-dom';  // 使用 React Router
import { useActionState } from 'react';

function PaymentForm() {
  const navigate = useNavigate();
  
  async function handlePayment(prevState, formData) {
    const amount = formData.get('amount');
    const cardNumber = formData.get('cardNumber');
    
    try {
      // 呼叫支付 API
      const response = await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({ amount, cardNumber })
      });
      
      const data = await response.json();
      
      // ✅ 根據不同結果，手動決定跳轉目標
      if (data.success) {
        // 成功 → 跳到成功頁
        navigate(`/payment/success?orderId=${data.orderId}`);
      } else if (data.needsVerification) {
        // 需要驗證 → 跳到驗證頁
        navigate('/payment/verify');
      } else {
        // 失敗 → 跳到失敗頁
        navigate('/payment/failed');
      }
      
      return data;
      
    } catch (error) {
      return { error: '支付失敗，請稍後再試' };
    }
  }
  
  const [state, formAction, isPending] = useActionState(
    handlePayment,
    null  // ← 注意：沒有使用 permalink 參數
  );
  
  return (
    <form action={formAction}>
      <input type="number" name="amount" placeholder="金額" required />
      <input type="text" name="cardNumber" placeholder="卡號" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '處理中。..' : '確認付款'}
      </button>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  );
}
```

{% note success %}
**多步驟表單範例：**

```javascript
import { useNavigate } from 'react-router-dom';
import { useActionState } from 'react';

function MultiStepForm({ currentStep }) {
  const navigate = useNavigate();
  
  async function handleSubmit(prevState, formData) {
    // 儲存當前步驟的資料
    await saveStepData(currentStep, formData);
    
    // ✅ 根據當前步驟，決定下一步
    if (currentStep === 1) {
      navigate('/form/step-2');
    } else if (currentStep === 2) {
      navigate('/form/step-3');
    } else {
      navigate('/form/complete');
    }
    
    return { success: true };
  }
  
  const [state, formAction] = useActionState(handleSubmit, null);
  
  return <form action={formAction}>{/* 表單欄位 */}</form>;
}
```
{% endnote %}
<!-- endtab -->
{% endtabs %}

{% note info %}
**三種策略對比與選擇建議：**

| 方式                | 跳轉目標 | 寫法複雜度 | 適用場景             |
| ------------------- | -------- | ---------- | -------------------- |
| **不跳轉**          | 不跳轉   | ⭐ 簡單     | 訂閱、搜尋、篩選     |
| **permalink 參數**  | 固定單一 | ⭐⭐ 簡單    | 聯絡表單、註冊、訂單 |
| **navigate() 手動** | 動態多個 | ⭐⭐⭐ 複雜   | 支付、多步驟表單     |

**決策流程：**
1. 先問：需要跳轉嗎？ → **不需要**：直接在頁面顯示訊息
2. 再問：跳轉目標固定嗎？ → **固定**：使用 `permalink`
3. 最後：需要條件跳轉？ → **需要**：使用 `navigate()` 或 `router.push()`

**核心原則：能簡單就簡單，需要彈性才增加複雜度。**
{% endnote %}

#### 回傳值：
`useActionState` 的回傳值讓你能夠輕鬆管理表單的狀態與流程：

- `state`：儲存 action 函式每次執行後的回傳結果，通常用來顯示成功或錯誤訊息。例如：`{ success: true }` 或 `{ error: '請輸入有效的 email' }`。
- `formAction`：一個可直接綁定在 `<form action={formAction}>` 的函式，負責處理表單送出事件，並自動將資料傳給 action。
- `isPending`：布林值，表示 action 是否正在執行中。可用來顯示「送出中」的 loading 狀態，避免重複送出。

```javascript
const [state, formAction, isPending] = useActionState(action, initialState);
```

{% note info %}
**小技巧：**
你可以根據 `state` 內容動態顯示錯誤訊息或成功提示，並用 `isPending` 控制按鈕狀態，提升使用者體驗。
{% endnote %}

### 理解表單跳轉：Action 成功後的頁面導向

在使用 `useActionState` 處理表單時，當 action 執行成功後，你可能需要將使用者導向另一個頁面（例如：註冊成功後跳轉到儀表板）。React 提供了兩種主要方式來實現這個功能。

{% note warning %}
**重要觀念：permalink 並非「伺服器端跳轉」**

很多人誤以為 `useActionState` 的第三個參數 `permalink` 是「伺服器端跳轉」，但這是**錯誤的理解**！

**真相是：**
- `permalink` 只是 React 提供的**客戶端跳轉的便利寫法**
- 它在 action 成功執行後，**由前端自動執行跳轉**
- 跳轉目標由**前端程式碼事先指定**，不是伺服器決定的

**真正的伺服器端跳轉：**
如果你需要真正的伺服器端跳轉（HTTP 302/303），必須在 Server Action 中使用 Next.js 的 `redirect()` 函式：

```javascript
// 真正的伺服器端跳轉
async function serverAction(prevState, formData) {
  'use server';
  await processData(formData);
  redirect('/dashboard');  // ← 這才是伺服器端跳轉
}
```

**本節重點：**
我們將介紹兩種**客戶端跳轉方式**：
1. 使用 `permalink` 參數（簡化寫法）
2. 使用 `router.push()` 手動控制（彈性寫法）
{% endnote %}

#### 跳轉方式總覽

| 方式              | 跳轉時機             | 特點                       | 使用時機                 |
| ----------------- | -------------------- | -------------------------- | ------------------------ |
| `permalink` 參數  | action 成功後自動    | 簡單固定，適合單一跳轉目標 | 成功後總是跳到同一頁面   |
| `router.push()`   | 手動控制             | 彈性高，可條件式跳轉       | 需要根據結果決定跳轉目標 |
| `navigate()`      | 手動控制             | React Router 版本          | 純 React SPA 應用        |
| `window.location` | 手動控制（強制刷新） | 完整頁面重新載入           | 需要清除所有前端狀態時   |

#### 方式一：使用 permalink 參數（自動跳轉）

`permalink` 是 `useActionState` 的第三個參數，讓你可以指定一個固定的跳轉目標。當 action 成功執行後，React 會自動導向該頁面。

**執行流程：**

{% mermaid graph LR %}
    A["使用者"] --> B["送出表單"]
    B --> C["執行 action"]
    C --> D["action 返回成功"]
    D --> E["React 自動跳轉到 permalink"]
    E --> F["顯示新頁面"]
{% endmermaid %}

**技術特性：**
- ✅ 寫法簡單，不需要額外的路由 hook
- ✅ 適合「成功後總是跳到同一頁面」的場景
- ✅ 與 Server Actions 搭配使用時體驗良好
- ❌ 跳轉目標固定，無法根據結果動態決定
- ❌ 只在 action 成功時跳轉，失敗時不跳轉

**實際應用範例：**
```javascript
'use client';
import { useActionState } from 'react';
import { registerUser } from './actions';

function RegisterForm() {
  const [state, formAction] = useActionState(
    registerUser,      // action 函式
    null,              // 初始狀態
    '/dashboard'       // ← permalink：成功後自動跳轉到儀表板
  );
  
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">註冊</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

```javascript actions.js
// Server Action
'use server';
export async function registerUser(prevState, formData) {
  const user = await db.createUser({
    email: formData.get('email'),
    password: formData.get('password')
  });
  
  // 成功後，前端會自動跳轉到 /dashboard
  return { success: true, userId: user.id };
}
```

**適用場景：**

| 場景       | 使用 permalink | 說明                       |
| ---------- | -------------- | -------------------------- |
| 註冊成功   | ✅ 建議使用     | 總是跳轉到儀表板           |
| 聯絡表單   | ✅ 建議使用     | 總是跳轉到感謝頁面         |
| 訂閱電子報 | ✅ 可以使用     | 跳轉到訂閱成功頁           |
| 支付流程   | ❌ 不建議       | 需要根據結果跳轉到不同頁面 |
| 多步驟表單 | ❌ 不建議       | 需要根據當前步驟決定下一步 |
| 搜尋/篩選  | ❌ 不需要       | 在當前頁面顯示結果         |

#### 方式二：手動控制跳轉（router.push / navigate）

如果你需要**根據 action 的執行結果來決定跳轉目標**，就必須使用 `router.push()` 或 `navigate()` 來手動控制跳轉邏輯。

**執行流程：**

{% mermaid graph LR %}
    A["使用者"] --> B["送出表單"]
    B --> C["執行 action"]
    C --> D["檢查 action 結果"]
    D -->|成功| E["手動呼叫 router.push()"]
    D -->|失敗| F["顯示錯誤訊息"]
    E --> G["前端路由切換"]
{% endmermaid %}

**技術特性：**
- ✅ 彈性高，可以根據不同結果跳轉到不同頁面
- ✅ 可以在跳轉前執行額外邏輯（如記錄、動畫）
- ✅ 支援條件式跳轉和複雜的流程控制
- ✅ 頁面不刷新，使用者體驗更流暢
- ❌ 需要手動撰寫跳轉邏輯
- ❌ 需要引入額外的路由 hook

**實際應用範例：**

{% tabs 手動跳轉範例，1 %}
<!-- tab NextJS 條件式跳轉（支付流程）-->
根據支付結果跳轉到不同頁面：

```javascript
'use client';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

function PaymentForm() {
  const router = useRouter();
  
  async function handlePayment(prevState, formData) {
    const response = await fetch('/api/payment', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    // ✅ 根據結果跳轉到不同頁面
    if (data.success) {
      router.push('/payment/success');
    } else if (data.needsVerification) {
      router.push('/payment/verify');
    } else {
      router.push('/payment/failed');
    }
    
    return data;
  }
  
  const [state, formAction] = useActionState(handlePayment, null);
  
  return (
    <form action={formAction}>
      <input name="cardNumber" required />
      <button type="submit">確認付款</button>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  );
}
```
<!-- endtab -->

<!-- tab NextJS 多步驟表單 -->
根據當前步驟決定下一個頁面：

```javascript
'use client';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

function MultiStepForm({ currentStep }) {
  const router = useRouter();
  
  async function handleSubmit(prevState, formData) {
    const response = await fetch('/api/form', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      // ✅ 根據當前步驟決定下一步
      if (currentStep === 1) {
        router.push('/form/step-2');
      } else if (currentStep === 2) {
        router.push('/form/step-3');
      } else {
        router.push('/form/complete');
      }
    }
    
    return data;
  }
  
  const [state, formAction] = useActionState(handleSubmit, null);
  
  return (
    <form action={formAction}>
      {/* 表單欄位 */}
      <button type="submit">下一步</button>
    </form>
  );
}
```
<!-- endtab -->

<!-- tab React Router 版本 -->
使用 `useNavigate` 進行前端跳轉，適合純 React 的 SPA 應用：

```javascript
import { useNavigate } from 'react-router-dom';
import { useActionState } from 'react';

function PaymentForm() {
  const navigate = useNavigate();
  
  async function handlePayment(prevState, formData) {
    const response = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        cardNumber: formData.get('cardNumber')
      })
    });
    
    const data = await response.json();
    
    // ✅ 使用 navigate() 進行條件式跳轉
    if (data.success) {
      navigate('/payment/success');
    } else {
      navigate('/payment/failed');
    }
    
    return data;
  }
  
  const [state, formAction] = useActionState(handlePayment, null);
  
  return (
    <form action={formAction}>
      <input name="cardNumber" required />
      <button type="submit">確認付款</button>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  );
}
```
<!-- endtab -->
{% endtabs %}

**適用場景：**

| 場景       | 使用手動跳轉 | 說明                       |
| ---------- | ------------ | -------------------------- |
| 支付流程   | ✅ 必須使用   | 需要根據結果跳轉到不同頁面 |
| 多步驟表單 | ✅ 必須使用   | 需要根據當前步驟決定下一步 |
| 搜尋/篩選  | ✅ 建議使用   | 可以選擇是否跳轉           |
| 購物車更新 | ✅ 建議使用   | 保持購物車狀態，彈性跳轉   |

#### 選擇策略總結

{% note info %}
**如何選擇跳轉方式？**

根據以下決策樹選擇：

**使用 `permalink` 參數（自動跳轉）當：**
- ✅ 成功後**總是**跳轉到同一個頁面
- ✅ 不需要根據結果做條件判斷
- ✅ 追求簡潔的程式碼

**範例：**
- 註冊成功 → 總是跳到儀表板
- 聯絡表單送出 → 總是跳到感謝頁
- 訂閱電子報 → 總是跳到訂閱成功頁

---

**使用 `router.push()` / `navigate()`（手動跳轉）當：**
- ✅ 需要根據**不同結果**跳轉到不同頁面
- ✅ 需要在跳轉前執行**額外邏輯**
- ✅ 多步驟流程需要**動態決定**下一步

**範例：**
- 支付：成功 → `/success`、失敗 → `/failed`、需驗證 → `/verify`
- 多步驟表單：步驟 1 → `/step-2`、步驟 2 → `/step-3`
- 問卷：根據答案跳轉到不同的後續問題

---

**對照表：**

| 需求               | permalink | router.push() |
| ------------------ | --------- | ------------- |
| 固定跳轉目標       | ✅ 推薦    | ⚠️ 可以但多餘  |
| 條件式跳轉         | ❌ 不支援  | ✅ 必須        |
| 多目標跳轉         | ❌ 不支援  | ✅ 必須        |
| 跳轉前執行額外邏輯 | ❌ 不支援  | ✅ 必須        |
| 程式碼簡潔度       | ✅ 簡單    | ⚠️ 稍微複雜    |

{% endnote %}

### 解決方案：使用 useActionState

讓我們用 `useActionState` 重寫前面的聯絡表單，展示**真實 API 呼叫**的完整流程：

{% note info %}
**正確的表單提交流程：**
1. **前端驗證** → 檢查資料格式（例如：欄位不可為空、email 格式正確）
2. **呼叫 API** → 驗證通過後，才送資料到後端
3. **處理回應** → 根據 API 回應顯示成功或錯誤訊息

這樣可以避免無效的 API 請求，節省網路資源和伺服器負擔。
{% endnote %}

```javascript 完整範例：聯絡表單
import { useActionState } from 'react';

// 定義 Action 函式
async function submitForm(previousState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // 步驟 1：前端驗證
  if (!name || name.length < 2) {
    return { success: false, error: '姓名至少需要 2 個字元' };
  }
  if (!email || !email.includes('@')) {
    return { success: false, error: '請輸入有效的電子郵件' };
  }
  
  // 步驟 2：呼叫後端 API
  try {
    // === 真實 API 呼叫  start ===

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // API 回應錯誤（例如：400、500）
      return { success: false, error: data.message || 'API 呼叫失敗' };
    }
    
    // API 回應成功
    return { success: true, message: data.message || '表單提交成功！' };

    // === 真實 API 呼叫  end ===

    /*
    // === 或者使用模擬 API（開發測試用） Start ===

    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: '表單提交成功！' };

    // === 或者使用模擬 API（開發測試用） Start ===
    */
    
  } catch (error) {
    // 網路錯誤（例如：無法連接到伺服器）
    return { success: false, error: '網路錯誤，請稍後再試' };
  }
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    success: false,
    error: null,
    message: null
  });
  
  return (
    <div>
      <h3>聯絡表單</h3>
      <form action={formAction}>
        <div>
          <label>
            姓名：
            <input type="text" name="name" disabled={isPending} />
          </label>
        </div>
        <div>
          <label>
            電子郵件：
            <input type="email" name="email" disabled={isPending} />
          </label>
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? '提交中。..' : '提交'}
        </button>
      </form>
      {state.error && <p style={{ color: 'red' }}>錯誤：{state.error}</p>}
      {state.success && <p style={{ color: 'green' }}>{state.message}</p>}
    </div>
  );
}
```

{% note info %}
**完整錯誤處理流程：**
1. ✅ **前端驗證錯誤** → 立即顯示，不呼叫 API
2. ✅ **API 回應錯誤**（400、500 等）→ 顯示後端回傳的錯誤訊息
3. ✅ **網路錯誤**（無法連接）→ 顯示「網路錯誤」訊息
{% endnote %}

{% note success %}
**開發技巧：模擬 API 測試**

在後端 API 還沒準備好時，可以先用模擬 API 測試前端 UI：

```javascript
// 註解掉真實 API，改用模擬
// const response = await fetch('/api/contact', { ... });

// 使用模擬 API（延遲 1 秒後回傳成功）
await new Promise(resolve => setTimeout(resolve, 1000));
return { success: true, message: '表單提交成功！' };
```

**優點：**
- 💡 前端開發不需等待後端 API 完成
- 💡 可以快速測試 UI 的 loading、成功、錯誤狀態
- 💡 單元測試時不依賴真實 API
{% endnote %}

**對比傳統做法的改進：**

| 項目             | 傳統做法                            | useActionState            |
| ---------------- | ----------------------------------- | ------------------------- |
| **狀態管理**     | 5 個 `useState`                     | 1 個 `useActionState`     |
| **Loading 狀態** | 手動管理 `isLoading`                | 自動提供 `isPending`      |
| **錯誤處理**     | 手動 `try-catch`                    | Action 函式直接回傳錯誤   |
| **表單控制**     | 受控元件（需要 `value`/`onChange`） | 非受控（使用 `FormData`） |
| **程式碼行數**   | ~50 行                              | ~30 行                    |

{% note success %}
**useActionState 的優勢：**
- ✅ 不需要多個 `useState`，狀態集中管理
- ✅ 自動處理 `isPending`，不需要手動管理 loading
- ✅ 使用 `FormData`，不需要受控元件
- ✅ 程式碼更簡潔、易維護
{% endnote %}

### 實際應用：常見場景
本章將帶你快速掌握 `useActionState` 在各種實際場景下的簡易用法。你會看到如何應對常見表單需求，例如：多欄位驗證、條件式跳轉、不同錯誤顯示等。每個案例都貼近前端日常開發，助你靈活運用最新 React 表單技巧。

#### 應用 1：多欄位驗證表單

處理多個欄位的驗證錯誤：

```javascript 多欄位驗證
import React, { useActionState } from 'react';

async function registerUser(previousState, formData) {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  
  const errors = {};
  
  // 逐一驗證
  if (!username || username.length < 3) {
    errors.username = '用戶名至少需要 3 個字元';
  }
  if (!email || !email.includes('@')) {
    errors.email = '請輸入有效的電子郵件';
  }
  if (!password || password.length < 6) {
    errors.password = '密碼至少需要 6 個字元';
  }
  
  // 如果有錯誤，回傳錯誤狀態
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  
  // 模擬 API 呼叫
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, message: '註冊成功！' };
}

function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, {
    success: false,
    errors: {},
    message: null
  });
  
  return (
    <form action={formAction}>
      <div>
        <label>
          用戶名：
          <input type="text" name="username" disabled={isPending} />
        </label>
        {state.errors?.username && (
          <p style={{ color: 'red' }}>{state.errors.username}</p>
        )}
      </div>
      <div>
        <label>
          電子郵件：
          <input type="email" name="email" disabled={isPending} />
        </label>
        {state.errors?.email && (
          <p style={{ color: 'red' }}>{state.errors.email}</p>
        )}
      </div>
      <div>
        <label>
          密碼：
          <input type="password" name="password" disabled={isPending} />
        </label>
        {state.errors?.password && (
          <p style={{ color: 'red' }}>{state.errors.password}</p>
        )}
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? '註冊中。..' : '註冊'}
      </button>
      {state.success && <p style={{ color: 'green' }}>{state.message}</p>}
    </form>
  );
}
```

#### 應用 2：搜尋表單

實現即時搜尋功能：

```javascript 搜尋表單
import React, { useActionState } from 'react';

async function searchAction(previousState, formData) {
  const query = formData.get('query');
  
  if (!query || query.length < 2) {
    return { results: [], error: '請輸入至少 2 個字元' };
  }
  
  // 模擬 API 搜尋
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockResults = [
    { id: 1, name: `結果：${query} 1` },
    { id: 2, name: `結果：${query} 2` },
    { id: 3, name: `結果：${query} 3` }
  ];
  
  return { results: mockResults, error: null };
}

function SearchForm() {
  const [state, formAction, isPending] = useActionState(searchAction, {
    results: [],
    error: null
  });
  
  return (
    <div>
      <form action={formAction}>
        <input
          type="text"
          name="query"
          placeholder="搜尋。.."
          disabled={isPending}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? '搜尋中。..' : '搜尋'}
        </button>
      </form>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <ul>
        {state.results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 應用 3：使用 previousState 累積資料

利用 `previousState` 來保留歷史資料：

```javascript 累積留言
import React, { useActionState } from 'react';

async function addComment(previousState, formData) {
  const comment = formData.get('comment');
  
  if (!comment) {
    return { ...previousState, error: '請輸入留言' };
  }
  
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 將新留言加入歷史留言
  return {
    comments: [
      ...previousState.comments,
      { id: Date.now(), text: comment }
    ],
    error: null
  };
}

function CommentForm() {
  const [state, formAction, isPending] = useActionState(addComment, {
    comments: [],
    error: null
  });
  
  return (
    <div>
      <h3>留言板</h3>
      <form action={formAction}>
        <textarea name="comment" disabled={isPending} />
        <button type="submit" disabled={isPending}>
          {isPending ? '送出中。..' : '送出留言'}
        </button>
      </form>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <ul>
        {state.comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 總結：useActionState 帶來的改變

經過本章的學習，你已經掌握了 React 19 全新的表單處理方式。`useActionState` 不只是一個新的 Hook，它代表了 React 團隊對表單處理的全新思考方向。

#### 核心價值

**三位一體的整合設計：**
- **Action 函式**：集中處理表單邏輯和 API 呼叫
- **狀態管理**：自動追蹤執行結果，無需手動 `setState`
- **Pending 狀態**：內建 loading 狀態，提升使用者體驗

**解決了什麼問題？**

傳統的表單處理需要：
```javascript
// ❌ 傳統做法：需要多個狀態
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
const [formData, setFormData] = useState({});

// 還要處理複雜的 onChange 和 onSubmit
```

使用 `useActionState` 後：
```javascript
// ✅ 新做法：一個 Hook 搞定
const [state, formAction, isPending] = useActionState(submitForm, null);
// 表單資料由 FormData 自動收集，無需受控元件
```

#### 重點回顧

**三個回傳值的用途：**
1. **`state`** → 儲存 action 執行結果（成功訊息、錯誤訊息、資料等）
2. **`formAction`** → 直接綁定到 `<form action={formAction}>`
3. **`isPending`** → 判斷是否正在執行（用於 loading 狀態）

**三個參數的配置：**
1. **`action`（必填）** → 處理表單的非同步函式
2. **`initialState`（必填）** → 初始狀態
3. **`permalink`（可選）** → 成功後自動跳轉的固定頁面

**關鍵技巧：**
- ✅ 使用 `FormData` 取得資料，避免受控元件的效能損耗
- ✅ 在 action 函式中先驗證，再呼叫 API
- ✅ 用 `isPending` 禁用表單，防止重複提交
- ✅ 利用 `previousState` 實現狀態累積
- ✅ `permalink` 只適合固定跳轉，條件式跳轉用 `navigate()`

#### 適用場景

**✅ 適合的場景：**
- 聯絡表單、註冊表單、評論表單
- 訂閱電子報、搜尋表單
- 留言板、待辦清單（需要累積狀態）
- 搭配 Next.js Server Actions

**⚠️ 需要額外工具的場景：**
- 複雜多步驟表單 → 建議使用 React Hook Form 或 Formik
- 大量欄位互動（選 A 影響 B、C、D）→ 考慮使用專門的表單庫

{% note success %}
**使用建議**

`useActionState` 專注處理「表單送出」這個時機點。如果你的表單主要邏輯發生在送出時（驗證、API 呼叫、顯示結果），那就很適合。

如果表單有大量即時互動需求，可以混合使用：
- 即時互動 → 用 `useState` + 受控元件
- 送出處理 → 用 `useActionState`

**核心原則：選擇最簡單能解決問題的方案。**
{% endnote %}

## useOptimistic
在現代 Web 應用中，許多操作需要與伺服器互動（例如：發送訊息、點讚、提交表單）。傳統做法是等待伺服器回應後才更新 UI，但這會導致**使用者體驗延遲**。想像一下：你在社群媒體上點讚，等待 1 秒後愛心才亮起，這種延遲感會讓人覺得應用「很慢」。

`useOptimistic` Hook 解決了這個問題，它允許你**先預期性地更新 UI**（樂觀更新），再等待伺服器確認。如果操作失敗，React 會自動回滾到原始狀態。

### 問題情境：傳統的點讚功能

假設我們要實作一個社群貼文的點讚功能，傳統做法會遇到以下問題：

```javascript 傳統做法：等待 API 回應後才更新 UI
import React, { useState } from 'react';

async function toggleLikeAPI(postId, currentLiked) {
  // 模擬 API 延遲 800ms
  await new Promise(resolve => setTimeout(resolve, 800));
  return !currentLiked;
}

function SocialPost({ post }) {
  const [likes, setLikes] = useState({
    count: post.likes,
    isLiked: post.isLiked
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLike = async () => {
    setIsLoading(true); // 👈 顯示 loading 狀態
    
    try {
      const newLikedState = await toggleLikeAPI(post.id, likes.isLiked);
      
      // ⚠️ 問題：等待 800ms 後才更新 UI
      setLikes({
        count: likes.count + (newLikedState ? 1 : -1),
        isLiked: newLikedState
      });
    } catch (error) {
      alert('點讚失敗');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h4>{post.title}</h4>
      <button onClick={handleLike} disabled={isLoading}>
        {/* ⚠️ 問題：按下按鈕後，愛心不會立即變化，要等 800ms */}
        {isLoading ? '處理中。..' : (likes.isLiked ? '❤️ 已讚' : '🤍 讚')}
      </button>
      <span>{likes.count} 個讚</span>
    </div>
  );
}
```

{% note danger %}
**傳統做法的問題：**

| 問題                 | 說明                                   | 影響                   |
| -------------------- | -------------------------------------- | ---------------------- |
| **UI 更新延遲**      | 點擊按鈕後，要等待 API 回應才看到變化  | 使用者感覺應用「卡頓」 |
| **Loading 狀態干擾** | 需要顯示「處理中。..」，破壞視覺一致性 | 使用者體驗不流暢       |
| **需要手動管理狀態** | 需要額外的 `isLoading` 狀態            | 程式碼變複雜           |
| **錯誤處理麻煩**     | 失敗時需要手動恢復原始狀態             | 容易出錯               |

**使用者期望：** 點讚後**立即看到愛心變紅**，而不是等待。
{% endnote %}

### 核心概念：樂觀更新流程

**樂觀更新（Optimistic Update）**是一種 UI 設計模式，核心思想是：「樂觀地」假設操作會成功，所以先更新 UI。在大多數情況下（網路穩定），操作確實會成功，所以「樂觀」的假設是合理的。

1. **假設操作會成功** → 先更新 UI
2. **背景發送 API 請求** → 等待伺服器確認
3. **根據結果調整**：
   - ✅ **成功** → UI 保持更新狀態
   - ❌ **失敗** → 自動回滾到原始狀態，並顯示錯誤訊息

{% mermaid graph LR %}
    A["👆 使用者點擊"] --> B["⚡ 立即更新 UI<br/><small>樂觀更新</small>"]
    B --> C["📡 發送 API 請求<br/><small>背景執行</small>"]
    C --> D{"✅ API 成功？"}
    D -->|是| E["✨ 更新真實狀態<br/><small>UI 保持不變</small>"]
    D -->|否| F["⏪ 自動回滾 UI<br/><small>恢復原始狀態</small>"]
    E --> G["😊 使用者感覺超快"]
    F --> H["⚠️ 顯示錯誤訊息"]
    
    style A fill:#e3f2fd
    style B fill:#c8e6c9
    style E fill:#c8e6c9
    style F fill:#ffcdd2
    style G fill:#fff9c4
{% endmermaid %}

### 語法說明

`useOptimistic` 的語法設計非常精簡，只需要傳入兩個參數，就能實現樂觀更新功能。它的核心理念是：**維護兩個狀態（真實狀態 + 樂觀狀態），讓 UI 優先顯示樂觀狀態**。當 API 成功時，樂觀狀態自動同步到真實狀態；當 API 失敗時，樂觀狀態自動回滾到真實狀態。

```javascript
const [optimisticState, addOptimistic] = useOptimistic(  // 返回 樂觀狀態（UI 顯示用） + 觸發函式（啟動樂觀更新）
  state,           // 參數 1：真實的狀態（來自 useState）
  updateFn         // 參數 2：樂觀更新函式（定義如何計算樂觀狀態）
);
```

#### 參數詳解

**1. state — 真實狀態（資料來源）**

| 屬性     | 說明                                                                  |
| -------- | --------------------------------------------------------------------- |
| **類型** | `any`                                                                 |
| **來源** | 通常來自 `useState`，代表伺服器確認過的「真實資料」                   |
| **用途** | 作為樂觀狀態的「基準」，當 API 成功時更新這個狀態，樂觀狀態會自動同步 |
| **特性** | 只有在 API 成功時才更新，失敗時保持不變（因此樂觀狀態會自動回滾）     |

**範例：**

```javascript
// 真實狀態：已確認的點讚資料
const [likes, setLikes] = useState({
  count: 5,       // 伺服器確認的讚數
  isLiked: false  // 伺服器確認的點讚狀態
});

// 將真實狀態傳入 useOptimistic
const [optimisticLikes, updateOptimisticLikes] = useOptimistic(likes, ...);
```

**2. updateFn — 樂觀更新函式（計算邏輯）**

| 屬性         | 說明                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| **類型**     | `(currentState, optimisticValue) => newState`                          |
| **用途**     | 定義「樂觀狀態」應該如何計算，接收當前狀態和更新指令，返回新的樂觀狀態 |
| **特性**     | 必須是**純函式**（無副作用），React 可能會多次呼叫                     |
| **執行時機** | 當呼叫 `addOptimistic(value)` 時觸發                                   |

**函式簽名：**

```javascript
(currentState, optimisticValue) => newState
```

| 參數/返回值         | 類型  | 說明                                                                         |
| ------------------- | ----- | ---------------------------------------------------------------------------- |
| **currentState**    | `any` | 當前的樂觀狀態（如果沒有進行中的樂觀更新，就是真實狀態 `state`）             |
| **optimisticValue** | `any` | 呼叫 `addOptimistic(value)` 時傳入的值，可以是任何資料（物件、字串、數字等） |
| **返回值**          | `any` | 新的樂觀狀態，這個值會立即顯示在 UI 上                                       |

**範例：**

```javascript
const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
  likes,  // 真實狀態
  (currentState, optimisticValue) => {
    // currentState：當前的樂觀狀態（或真實狀態）
    // optimisticValue：我們傳入的更新指令（這裡用不到，因為只是切換狀態）
    
    // 返回新的樂觀狀態
    return {
      count: currentState.count + (currentState.isLiked ? -1 : 1),
      isLiked: !currentState.isLiked
    };
  }
);

// 使用時：
onClick={() => updateOptimisticLikes()}  // 呼叫時會觸發 updateFn
```

**進階範例：使用 optimisticValue 傳遞指令**

```javascript
const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
  todos,
  (currentState, { action, data }) => {  // 📌 optimisticValue 是一個物件
    switch (action) {
      case 'add':
        return [...currentState, data];
      case 'delete':
        return currentState.filter(todo => todo.id !== data.id);
      case 'toggle':
        return currentState.map(todo =>
          todo.id === data.id ? { ...todo, completed: !todo.completed } : todo
        );
      default:
        return currentState;
    }
  }
);

// 使用時：
updateOptimisticTodos({ action: 'add', data: newTodo });      // 新增
updateOptimisticTodos({ action: 'delete', data: { id: 1 } }); // 刪除
updateOptimisticTodos({ action: 'toggle', data: { id: 2 } }); // 切換
```

#### 返回值詳解

`useOptimistic` 返回一個包含兩個元素的陣列：

| 索引    | 名稱              | 類型                        | 說明                                                 |
| ------- | ----------------- | --------------------------- | ---------------------------------------------------- |
| **[0]** | `optimisticState` | `any`                       | **樂觀狀態**，這是你應該在 UI 中使用的狀態           |
| **[1]** | `addOptimistic`   | `(optimisticValue) => void` | **觸發函式**，呼叫後會執行 `updateFn` 並更新樂觀狀態 |

**1. optimisticState — 樂觀狀態（UI 顯示用）**

| 屬性         | 說明                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| **用途**     | 在 UI 中使用這個狀態來渲染，而不是真實的 `state`                                                                  |
| **值的來源** | • 如果沒有進行中的樂觀更新 → 等於 `state`（真實狀態）<br/>• 如果有進行中的樂觀更新 → 等於 `updateFn` 返回的新狀態 |
| **自動同步** | 當 `state` 更新時，`optimisticState` 會自動同步到最新的 `state` 值                                                |
| **自動回滾** | 如果 API 失敗且你沒有更新 `state`，`optimisticState` 會自動恢復到 `state` 的值                                    |

**範例：**

```javascript
const [likes, setLikes] = useState({ count: 5, isLiked: false });
const [optimisticLikes, updateOptimisticLikes] = useOptimistic(likes, ...);

return (
  <div>
    {/* ❌ 錯誤：不要使用真實狀態 */}
    <p>{likes.count} 個讚</p>
    
    {/* ✅ 正確：使用樂觀狀態 */}
    <p>{optimisticLikes.count} 個讚</p>
  </div>
);
```

**2. addOptimistic — 觸發函式（啟動樂觀更新）**

| 屬性         | 說明                                                                              |
| ------------ | --------------------------------------------------------------------------------- |
| **類型**     | `(optimisisticValue: any) => void`                                                |
| **用途**     | 呼叫這個函式來觸發樂觀更新，傳入的參數會作為 `updateFn` 的第二個參數              |
| **執行時機** | 通常在執行非同步操作**之前**呼叫，先更新 UI                                       |
| **參數**     | 可以傳入任何值（物件、字串、數字、null 等），也可以不傳（如果 `updateFn` 不需要） |
| **副作用**   | 呼叫後會立即觸發 `updateFn` 並更新 `optimisticState`，導致重新渲染                |

**範例：簡單用法（不傳參數）**

```javascript
const handleLike = async () => {
  // 1️⃣ 立即觸發樂觀更新（UI 立刻變化）
  updateOptimisticLikes();  // 不需要傳參數
  
  try {
    // 2️⃣ 背景發送 API
    const result = await toggleLikeAPI();
    
    // 3️⃣ 成功：更新真實狀態
    setLikes(result);
  } catch (error) {
    // 4️⃣ 失敗：自動回滾（不需要手動處理）
    alert('操作失敗');
  }
};
```

**範例：進階用法（傳遞指令）**

```javascript
const handleAddTodo = async (newTodoText) => {
  // 1️⃣ 立即觸發樂觀更新（傳入 action 和 data）
  updateOptimisticTodos({ 
    action: 'add', 
    data: { id: `temp-${Date.now()}`, text: newTodoText, completed: false }
  });
  
  try {
    // 2️⃣ 呼叫 API
    const savedTodo = await addTodoAPI(newTodoText);
    
    // 3️⃣ 成功：更新真實狀態
    setTodos(prev => [...prev, savedTodo]);
  } catch (error) {
    alert('新增失敗');
  }
};
```

#### 重要特性總結

{% note warning %}
**useOptimistic 的三大核心特性：**

1. **樂觀狀態是暫時的**
   - `optimisticState` 不是獨立的狀態，而是基於 `state` 計算出來的
   - 當真實的 `state` 更新時（呼叫 `setState`），`optimisticState` 會**自動同步**到新的 `state` 值
   - 這確保了 API 成功後，UI 會顯示伺服器確認的資料

2. **自動回滾機制**
   - 如果 API 失敗，你**不需要手動恢復**樂觀狀態
   - 因為你沒有呼叫 `setState()`，所以 `state` 保持不變
   - React 會自動讓 `optimisticState` 回滾到 `state` 的值
   - 這大幅簡化了錯誤處理邏輯

3. **渲染優先權**
   - UI 應該使用 `optimisticState` 來渲染，而不是 `state`
   - 這確保使用者看到的是「最新的預期狀態」
   - 例如：點讚後立即看到愛心變紅，而不是等待 API 回應

**範例說明：**

```javascript
// 初始狀態
const [likes, setLikes] = useState({ count: 5, isLiked: false });
const [optimisticLikes, updateOptimisticLikes] = useOptimistic(likes, ...);

// 此時：optimisticLikes === { count: 5, isLiked: false }（等於 likes）

// 使用者點擊「讚」
updateOptimisticLikes();
// 此時：optimisticLikes === { count: 6, isLiked: true }（樂觀更新）
//      likes === { count: 5, isLiked: false }（保持不變）

// 情境 A：API 成功
await api.toggleLike();
setLikes({ count: 6, isLiked: true });
// 此時：optimisticLikes === { count: 6, isLiked: true }（自動同步到新的 likes）
//      likes === { count: 6, isLiked: true }

// 情境 B：API 失敗
await api.toggleLike();  // 拋出錯誤
// 沒有呼叫 setLikes()
// 此時：optimisticLikes === { count: 5, isLiked: false }（自動回滾到原始 likes）
//      likes === { count: 5, isLiked: false }（保持不變）
```
{% endnote %}

#### 常見問題

{% tabs 語法問題 %}
<!-- tab 為什麼不直接更新 state？ -->
**問題：為什麼不直接先更新 `state`，等 API 失敗再回滾？**

```javascript
// ❌ 錯誤做法：直接更新 state
const handleLike = async () => {
  const oldLikes = likes;
  setLikes({ count: likes.count + 1, isLiked: true });  // 先更新
  
  try {
    await api.toggleLike();
  } catch (error) {
    setLikes(oldLikes);  // ❌ 手動回滾，容易出錯
  }
};

// ✅ 正確做法：使用 useOptimistic
const handleLike = async () => {
  updateOptimisticLikes();  // 樂觀更新
  
  try {
    const result = await api.toggleLike();
    setLikes(result);  // 更新真實狀態
  } catch (error) {
    // ✅ 自動回滾，不需要手動處理
  }
};
```

**原因：**
1. 手動回滾容易出錯（如果有多個操作同時進行）
2. 需要額外變數儲存舊狀態
3. 無法區分「真實確認的資料」和「樂觀更新的資料」
<!-- endtab -->

<!-- tab updateFn 可以有副作用嗎？ -->
**問題：可以在 `updateFn` 中執行副作用嗎（如 localStorage、console.log）？**

```javascript
// ❌ 錯誤：不要在 updateFn 中執行副作用
const [optimisticData, updateOptimistic] = useOptimistic(
  data,
  (state, newValue) => {
    console.log('更新中');  // ❌ 副作用
    localStorage.setItem('data', newValue);  // ❌ 副作用
    return [...state, newValue];
  }
);
```

**原因：**
- `updateFn` 必須是**純函式**，React 可能會多次呼叫它
- 副作用應該放在 `useEffect` 或事件處理函式中
<!-- endtab -->

<!-- tab 可以不傳 optimisticValue 嗎？ -->
**問題：`addOptimistic()` 必須傳參數嗎？**

```javascript
// ✅ 可以不傳參數（如果 updateFn 不需要）
const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
  likes,
  (currentState) => ({  // 不使用第二個參數
    count: currentState.count + (currentState.isLiked ? -1 : 1),
    isLiked: !currentState.isLiked
  })
);

updateOptimisticLikes();  // ✅ 不傳參數

// ✅ 也可以傳參數（用於複雜場景）
updateOptimisticLikes({ action: 'toggle' });
```

**結論：**
- 如果 `updateFn` 不需要額外資訊，可以不傳參數
- 如果需要根據不同操作更新（如 add/delete/toggle），建議傳入物件指令
<!-- endtab -->
{% endtabs %}

### 解決方案：使用 useOptimistic

讓我們用 `useOptimistic` 重構剛才的點讚功能：

{% tabs useOptimistic 解決方案 %}
<!-- tab 傳統做法❌（延遲感） -->
```javascript 等待 API 回應才更新 UI
function SocialPost({ post }) {
  const [likes, setLikes] = useState({
    count: post.likes,
    isLiked: post.isLiked
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLike = async () => {
    setIsLoading(true);
    
    try {
      const newLikedState = await toggleLikeAPI(post.id, likes.isLiked);
      
      // ⚠️ 等待 800ms 後才更新 UI
      setLikes({
        count: likes.count + (newLikedState ? 1 : -1),
        isLiked: newLikedState
      });
    } catch (error) {
      alert('點讚失敗');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button onClick={handleLike} disabled={isLoading}>
      {/* ⚠️ 延遲：點擊後要等 800ms 才看到愛心變化 */}
      {isLoading ? '處理中。..' : (likes.isLiked ? '❤️ 已讚' : '🤍 讚')}
    </button>
  );
}
```
<!-- endtab -->

<!-- tab useOptimistic✅（即時反應） -->
```javascript 立即更新 UI，背景等待 API
import React, { useState, useOptimistic } from 'react';

async function toggleLikeAPI(postId, currentLiked) {
  await new Promise(resolve => setTimeout(resolve, 800));
  return !currentLiked;
}

function SocialPost({ post }) {
  // 1️⃣ 真實狀態（來自伺服器的資料）
  const [likes, setLikes] = useState({
    count: post.likes,
    isLiked: post.isLiked
  });
  
  // 2️⃣ 樂觀狀態（用於 UI 顯示）
  const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
    likes,  // 基於真實狀態
    (currentState, optimisticValue) => {
      // optimisticValue 是我們傳入的更新指令
      return {
        count: currentState.count + (currentState.isLiked ? -1 : 1),
        isLiked: !currentState.isLiked
      };
    }
  );
  
  const handleLike = async () => {
    // 3️⃣ 立即更新樂觀狀態（UI 馬上變化）
    updateOptimisticLikes();
    
    try {
      // 4️⃣ 背景發送 API 請求
      const newLikedState = await toggleLikeAPI(post.id, likes.isLiked);
      
      // 5️⃣ 成功：更新真實狀態（樂觀狀態會自動同步）
      setLikes({
        count: likes.count + (newLikedState ? 1 : -1),
        isLiked: newLikedState
      });
      
    } catch (error) {
      // 6️⃣ 失敗：React 自動回滾到真實狀態（不需要手動處理）
      alert('點讚失敗，請重試');
    }
  };
  
  return (
    <div>
      <h4>{post.title}</h4>
      {/* ✅ 使用樂觀狀態渲染 UI */}
      <button onClick={handleLike}>
        {/* ✅ 點擊後立即變化，沒有延遲感 */}
        {optimisticLikes.isLiked ? '❤️ 已讚' : '🤍 讚'}
      </button>
      <span>{optimisticLikes.count} 個讚</span>
    </div>
  );
}
```

**對比效果：**

| 操作     | 傳統做法                | useOptimistic                |
| -------- | ----------------------- | ---------------------------- |
| 點擊按鈕 | 顯示「處理中。..」      | 愛心立即變紅 ❤️               |
| 等待 API | 按鈕 disabled，無法操作 | UI 已更新，可以繼續操作      |
| API 成功 | 愛心變紅，按鈕恢復      | 保持紅色，無感知             |
| API 失敗 | 顯示錯誤                | 愛心自動變回白色 🤍，顯示錯誤 |

<!-- endtab -->
{% endtabs %}

{% note success %}
**useOptimistic 的優勢：**

1. ✅ **即時反饋**：點擊後 UI 立即變化，沒有延遲感
2. ✅ **自動回滾**：失敗時不需要手動恢復狀態
3. ✅ **簡化程式碼**：不需要 `isLoading` 狀態
4. ✅ **提升體驗**：使用者感覺應用「超快」
{% endnote %}

### 完整運作流程

讓我們用時間軸理解 `useOptimistic` 的完整運作過程：

{% mermaid timeline %}
    title useOptimistic 點讚流程（共 800ms）
    
    section 0ms：使用者點擊
        用戶點擊「讚」按鈕
        : 呼叫 updateOptimisticLikes()
    
    section 0ms：樂觀更新
        optimisticLikes.isLiked 變為 true
        : UI 立即顯示 ❤️ 已讚
        : 按鈕顏色變紅
    
    section 1ms：發送 API
        呼叫 toggleLikeAPI()
        : fetch 請求發送到伺服器
        : UI 保持 ❤️ 已讚（背景執行）
    
    section 800ms：API 回應
        伺服器回傳成功
        : 呼叫 setLikes() 更新真實狀態
        : optimisticLikes 自動同步
        : UI 保持 ❤️ 已讚（無變化）
{% endmermaid %}

#### 失敗情況的流程

```javascript
// 模擬 API 失敗
async function toggleLikeAPI(postId, currentLiked) {
  await new Promise(resolve => setTimeout(resolve, 800));
  throw new Error('網路連接失敗'); // ❌ 失敗
}

const handleLike = async () => {
  // 1️⃣ 0ms：立即更新樂觀狀態
  updateOptimisticLikes(); 
  // → optimisticLikes.isLiked = true（UI 顯示 ❤️）
  
  try {
    // 2️⃣ 1ms：發送 API 請求
    const result = await toggleLikeAPI(post.id, likes.isLiked);
    
    // 3️⃣ （不會執行，因為 API 失敗）
    setLikes(result);
    
  } catch (error) {
    // 4️⃣ 800ms：捕捉錯誤
    alert('點讚失敗，請重試');
    
    // 5️⃣ ⚠️ 關鍵：不需要手動回滾
    // React 會自動讓 optimisticLikes 同步到 likes（原始狀態）
    // → optimisticLikes.isLiked = false（UI 自動恢復 🤍）
  }
};
```

{% note info %}
**自動回滾的原理：**

`useOptimistic` 內部維護兩個狀態：
- **真實狀態**（`state`）：來自 `useState`，由你手動更新
- **樂觀狀態**（`optimisticState`）：暫時的預期狀態

當 `state` 更新時，`optimisticState` 會自動同步。如果 API 失敗，你沒有呼叫 `setLikes()`，所以 `state` 保持不變，`optimisticState` 就會自動回滾到 `state` 的值。
{% endnote %}

### 實際應用範例
在這一節，我們將透過實際範例展示 `useOptimistic` 在樂觀 UI 更新的應用。你將看到如何讓使用者體驗「點下去馬上看見變化」，不必等待伺服器回應也能及時提供回饋，並且遇到錯誤時能自動回滾，讓開發流程更簡潔自然。

#### 範例 1：即時聊天室（發送訊息）
這是 `useOptimistic` 的經典應用場景：發送訊息時立即顯示，等待伺服器確認後更新狀態。

```javascript 即時聊天室
import React, { useState, useOptimistic, useRef } from 'react';

// 模擬發送訊息 API
async function sendMessageAPI(message) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模擬 10% 的失敗率
  if (Math.random() < 0.1) {
    throw new Error('網路錯誤');
  }
  
  return {
    id: Date.now(),
    text: message,
    timestamp: new Date(),
    status: 'sent'
  };
}

function ChatApp() {
  // 1️⃣ 真實的訊息列表（已確認送出的訊息）
  const [messages, setMessages] = useState([
    { id: 1, text: '嗨！你好', timestamp: new Date(), status: 'sent' }
  ]);
  
  // 2️⃣ 樂觀的訊息列表（包含「發送中」的訊息）
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, newMessage) => {
      // 將新訊息加入列表，標記為 'sending'
      return [...currentMessages, { ...newMessage, status: 'sending' }];
    }
  );
  
  const [input, setInput] = useState('');
  const formRef = useRef();
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const messageText = input;
    const tempMessage = {
      id: `temp-${Date.now()}`,
      text: messageText,
      timestamp: new Date(),
      status: 'sending'
    };
    
    // 3️⃣ 立即顯示訊息（樂觀更新）
    addOptimisticMessage(tempMessage);
    setInput('');
    formRef.current.reset();
    
    try {
      // 4️⃣ 發送到伺服器
      const sentMessage = await sendMessageAPI(messageText);
      
      // 5️⃣ 成功：更新真實訊息列表
      setMessages(prev => [...prev, sentMessage]);
      
    } catch (error) {
      // 6️⃣ 失敗：自動回滾（訊息消失），顯示錯誤
      alert('訊息發送失敗，請重試');
    }
  };
  
  return (
    <div>
      <h3>即時聊天室</h3>
      
      {/* 訊息列表 */}
      <div>
        {optimisticMessages.map((message) => (
          <div key={message.id}>
            <div>{message.text}</div>
            <small>
              {message.timestamp.toLocaleTimeString()} 
              {message.status === 'sending' && ' 📤 發送中。..'}
              {message.status === 'sent' && ' ✅'}
            </small>
          </div>
        ))}
      </div>
      
      {/* 輸入表單 */}
      <form onSubmit={handleSendMessage} ref={formRef}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入訊息。.."
        />
        <button type="submit">
          發送
        </button>
      </form>
    </div>
  );
}
```

**使用者體驗對比：**

| 操作         | 傳統做法                | useOptimistic          |
| ------------ | ----------------------- | ---------------------- |
| 按下「發送」 | 顯示 loading...         | 訊息立即出現在列表中 📤 |
| 等待 1 秒    | 按鈕 disabled，無法輸入 | 可以繼續輸入下一則訊息 |
| API 成功     | 訊息出現，loading 消失  | 📤 變成 ✅（幾乎無感知） |
| API 失敗     | 顯示錯誤                | 訊息自動消失，顯示錯誤 |

{% note warning %}
**⚠️ 效能問題：函式重新創建**

在上述範例中，`ChatApp` 元件使用了 `useState` 管理 `messages` 和 `input` 兩個 state。這意味著：
- 每次**輸入框內容改變**時（`setInput`），整個 `ChatApp` 會重新渲染
- 每次**訊息更新**時（`setMessages`），整個 `ChatApp` 也會重新渲染

由於 `handleSendMessage` 函式定義在元件內部，它會在每次 `ChatApp` 渲染時重新創建。

**解決方案：使用 `useCallback` 避免重複建立**

```javascript
import React, { useState, useOptimistic, useRef, useCallback } from 'react';

function ChatApp() {
  const [messages, setMessages] = useState([...]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, ...);
  const [input, setInput] = useState('');
  const formRef = useRef();
  
  // ✅ 使用 useCallback 緩存函式，避免每次渲染都重新建立
  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const messageText = input;
    const tempMessage = {
      id: `temp-${Date.now()}`,
      text: messageText,
      timestamp: new Date(),
      status: 'sending'
    };
    
    addOptimisticMessage(tempMessage);
    setInput('');
    formRef.current?.reset();
    
    try {
      const sentMessage = await sendMessageAPI(messageText);
      setMessages(prev => [...prev, sentMessage]);
    } catch (error) {
      alert('訊息發送失敗，請重試');
    }
  }, [input]); // 依賴 input，因為函式內部使用了 input
  
  // ... return JSX
}
```

**注意**：`handleSendMessage` 需要依賴 `input`，因為函式內部使用了 `input.trim()` 和 `input` 的值。這意味著每次輸入時函式還是會重新創建，但至少不會因為 `messages` 更新而重新創建。
{% endnote %}

#### 範例 2：待辦事項（複雜的樂觀更新）

這個範例展示如何處理**多種操作**（新增、刪除、切換完成狀態）的樂觀更新。

```javascript 待辦事項清單
import React, { useState, useOptimistic } from 'react';

// 模擬 API
async function todoAPI(action, data) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (Math.random() < 0.1) {
    throw new Error('操作失敗');
  }
  
  switch (action) {
    case 'add':
      return { id: Date.now(), text: data.text, completed: false };
    case 'toggle':
      return { ...data, completed: !data.completed };
    case 'delete':
      return { id: data.id };
    default:
      throw new Error('未知操作');
  }
}

function TodoApp() {
  // 1️⃣ 真實的待辦事項列表
  const [todos, setTodos] = useState([
    { id: 1, text: '學習 React 19', completed: false },
    { id: 2, text: '練習 useOptimistic', completed: true }
  ]);
  
  // 2️⃣ 樂觀的待辦事項列表
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    (currentTodos, { action, data }) => {
      switch (action) {
        case 'add':
          // 新增待辦事項
          return [...currentTodos, { 
            ...data, 
            id: `temp-${Date.now()}`,
            completed: false 
          }];
        case 'toggle':
          // 切換完成狀態
          return currentTodos.map(todo =>
            todo.id === data.id 
              ? { ...todo, completed: !todo.completed }
              : todo
          );
        case 'delete':
          // 刪除待辦事項
          return currentTodos.filter(todo => todo.id !== data.id);
        default:
          return currentTodos;
      }
    }
  );
  
  const [input, setInput] = useState('');
  
  // 新增待辦事項
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newTodo = { text: input };
    
    // 3️⃣ 樂觀更新：立即顯示新待辦事項
    updateOptimisticTodos({ action: 'add', data: newTodo });
    setInput('');
    
    try {
      // 4️⃣ 呼叫 API
      const savedTodo = await todoAPI('add', newTodo);
      
      // 5️⃣ 成功：更新真實狀態
      setTodos(prev => [...prev, savedTodo]);
    } catch (error) {
      alert('新增失敗');
    }
  };
  
  // 切換完成狀態
  const handleToggle = async (todo) => {
    // 樂觀更新
    updateOptimisticTodos({ action: 'toggle', data: todo });
    
    try {
      await todoAPI('toggle', todo);
      
      // 更新真實狀態
      setTodos(prev => prev.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      alert('操作失敗');
    }
  };
  
  // 刪除待辦事項
  const handleDelete = async (todo) => {
    // 樂觀更新
    updateOptimisticTodos({ action: 'delete', data: todo });
    
    try {
      await todoAPI('delete', todo);
      
      // 更新真實狀態
      setTodos(prev => prev.filter(t => t.id !== todo.id));
    } catch (error) {
      alert('刪除失敗');
    }
  };
  
  return (
    <div>
      <h3>待辦事項</h3>
      
      {/* 新增表單 */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新增待辦事項。.."
        />
        <button 
          type="submit"
        >
          新增
        </button>
      </form>
      
      {/* 待辦事項列表 */}
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
              {todo.id.toString().startsWith('temp') && ' 📤'}
            </span>
            <button
              onClick={() => handleDelete(todo)}
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

{% note success %}
**複雜應用的技巧：**

1. **使用 action + data 模式**：`updateOptimisticTodos({ action: 'add', data: ... })` 讓更新邏輯更清晰
2. **暫時 ID 標記**：用 `temp-${Date.now()}` 標記樂觀更新的項目，方便在 UI 中顯示不同樣式
3. **統一的更新函式**：用 `switch` 處理多種操作，程式碼更簡潔
{% endnote %}

{% note warning %}
**⚠️ 效能問題：函式重新創建**

在上述範例中，`TodoApp` 元件使用了 `useState` 管理 `todos` 和 `input` 兩個 state。這意味著：
- 每次**輸入框內容改變**時（`setInput`），整個 `TodoApp` 會重新渲染
- 每次**待辦事項更新**時（`setTodos`），整個 `TodoApp` 也會重新渲染

由於 `handleAdd`、`handleToggle`、`handleDelete` 這三個函式定義在元件內部，它們會在每次 `TodoApp` 渲染時重新創建。這可能造成以下問題：

1. **子元件不必要的重新渲染**：如果這些函式作為 props 傳遞給子元件，會導致子元件即使使用 `React.memo` 也會重新渲染（因為函式引用改變了）
2. **列表項目全部重新渲染**：在 `optimisticTodos.map()` 中，每個 `<li>` 的 `onChange` 和 `onClick` 都是新的函式引用，導致所有列表項目都重新渲染
3. **useEffect 依賴問題**：如果函式作為 useEffect 的依賴項，會導致 effect 不必要地重新執行

**解決方案：使用 `useCallback` 避免重複建立**

透過 `useCallback` 可以讓函式引用保持穩定，只有在依賴項改變時才重新創建。這樣即使 `TodoApp` 因為 `input` 或 `todos` 改變而重新渲染，這些 handler 函式的引用也不會改變：

```javascript
import React, { useState, useOptimistic, useCallback } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([...]);
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(todos, ...);
  const [input, setInput] = useState('');
  
  // ✅ 使用 useCallback 緩存函式，避免每次渲染都重新建立
  const handleAdd = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newTodo = { text: input };
    updateOptimisticTodos({ action: 'add', data: newTodo });
    setInput('');
    
    try {
      const savedTodo = await todoAPI('add', newTodo);
      setTodos(prev => [...prev, savedTodo]);
    } catch (error) {
      alert('新增失敗');
    }
  }, [input]); // 只有 input 改變時才重新創建
  
  const handleToggle = useCallback(async (todo) => {
    updateOptimisticTodos({ action: 'toggle', data: todo });
    try {
      await todoAPI('toggle', todo);
      setTodos(prev => prev.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      alert('操作失敗');
    }
  }, []); // 沒有外部依賴
  
  const handleDelete = useCallback(async (todo) => {
    updateOptimisticTodos({ action: 'delete', data: todo });
    try {
      await todoAPI('delete', todo);
      setTodos(prev => prev.filter(t => t.id !== todo.id));
    } catch (error) {
      alert('刪除失敗');
    }
  }, []); // 沒有外部依賴
  
  // ... return JSX
}
```

**何時需要優化？**
- ✅ 函式作為 props 傳給子元件時
- ✅ 列表中每個項目都使用這個函式時
- ✅ 函式作為 useEffect 等 Hook 的依賴時
- ❌ 簡單的示範範例 （為了可讀性可以省略）
- ❌ 父元件很少重新渲染時
{% endnote %}

#### 範例 3：社群貼文點讚（視覺回饋）

這個範例展示如何提供更豐富的視覺回饋：

```javascript 社群貼文點讚
import React, { useState, useOptimistic } from 'react';

// 模擬後端切換點讚狀態
async function toggleLikeAPI(postId, currentLiked) {
  await new Promise(resolve => setTimeout(resolve, 800));
  if (Math.random() < 0.1) {
    throw new Error('網路連接失敗');
  }
  return !currentLiked;
}

function SocialPost({ post }) {
  // 管理真實點讚狀態
  const [likes, setLikes] = useState({
    count: post.likes,
    isLiked: post.isLiked
  });
  
  // 管理樂觀更新後的畫面狀態
  const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
    likes,
    (currentState) => ({
      count: currentState.count + (currentState.isLiked ? -1 : 1),
      isLiked: !currentState.isLiked
    })
  );
  
  const handleLike = async () => {
    updateOptimisticLikes();
    try {
      const newLikedState = await toggleLikeAPI(post.id, likes.isLiked);
      setLikes(prev => ({
        count: prev.count + (newLikedState ? 1 : -1),
        isLiked: newLikedState
      }));
    } catch (error) {
      alert('點讚失敗，請重試');
    }
  };
  
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <div>
        <button onClick={handleLike}>
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
    <div>
      <h3>社群動態</h3>
      {posts.map(post => (
        <SocialPost key={post.id} post={post} />
      ))}
    </div>
  );
}
```

{% note warning %}
**⚠️ 效能問題：函式重新創建**

在上述範例中，`SocialPost` 元件使用了 `useState` 管理 `likes` state。這意味著每次點讚後（`setLikes`），整個 `SocialPost` 會重新渲染。

由於 `handleLike` 函式定義在元件內部，它會在每次 `SocialPost` 渲染時重新創建。雖然這個範例中影響較小（只有一個按鈕使用這個函式），但在有多個互動元素時，使用 `useCallback` 仍是好習慣。

**解決方案：使用 `useCallback` 避免重複建立**

```javascript
import React, { useState, useOptimistic, useCallback } from 'react';

function SocialPost({ post }) {
  const [likes, setLikes] = useState({
    count: post.likes,
    isLiked: post.isLiked
  });
  
const [optimisticLikes, updateOptimisticLikes] = useOptimistic(
  likes,
    (currentState) => ({
      count: currentState.count + (currentState.isLiked ? -1 : 1),
      isLiked: !currentState.isLiked
    })
);

  // ✅ 使用 useCallback 緩存函式，避免每次渲染都重新建立
  const handleLike = useCallback(async () => {
  updateOptimisticLikes();
  
  try {
      const newLikedState = await toggleLikeAPI(post.id, likes.isLiked);
      
      setLikes(prev => ({
        count: prev.count + (newLikedState ? 1 : -1),
        isLiked: newLikedState
      }));
      
    } catch (error) {
      alert('點讚失敗，請重試');
    }
  }, [post.id, likes.isLiked]); // 依賴 post.id 和 likes.isLiked
  
  // ... return JSX
}
```

**注意**：`handleLike` 依賴 `post.id` 和 `likes.isLiked`，因此當點讚狀態改變時函式會重新創建。這是合理的，因為函式邏輯確實依賴這些值。
{% endnote %}

### 總結

**useOptimistic 核心重點**

**基本概念：**
- 先更新 UI（樂觀），再等待 API 確認
- 成功 → 保持更新；失敗 → 自動回滾
- 語法：`const [optimisticState, updateOptimistic] = useOptimistic(state, updateFn)`

**主要優勢：**
- ⚡ **即時反饋**：使用者操作立即看到結果
- 🔄 **自動回滾**：API 失敗時自動恢復原始狀態
- 📝 **簡化程式碼**：不需要手動管理 loading 和錯誤恢復
- 🎯 **提升體驗**：減少等待時間，應用感覺更快

**適用場景：**
- ✅ 社群互動（點讚、收藏、關注）
- ✅ 即時通訊（發送訊息、已讀標記）
- ✅ 待辦清單（新增、刪除、完成）
- ✅ 購物車（新增商品、調整數量）
- ❌ 金融交易（不可逆，必須確認）
- ❌ 刪除帳號（重要操作）
- ❌ 權限變更（安全敏感）

**判斷原則：** 問自己「操作失敗會損失重要資料或金錢嗎？」→ 不會就用 `useOptimistic`

**最佳實踐：**
1. 提供視覺回饋（如「發送中」標記 📤）
2. 友善的錯誤提示（具體說明問題）
3. updateFn 必須是純函式（不執行副作用）
4. 確保 API 成功後更新真實狀態
5. 使用 `useCallback` 避免 handler 重複創建

**效能注意：**
```javascript
// ✅ 使用 useCallback 避免函式重複創建
const handleAction = useCallback(async (data) => {
  updateOptimistic(data);
  try {
    const result = await api(data);
    setState(result);
  } catch (error) {
    alert('操作失敗');
  }
}, []); // 依賴項根據實際情況調整
```

**與其他 Hook 的關係：**
- `useState`：基於真實狀態產生樂觀狀態
- `useActionState`：可結合使用，處理表單提交
- `useTransition`：都提升體驗，但處理不同層面

# 特殊用途 Hooks

這些 Hooks 在特定場景下非常有用，雖然不常用但很重要。

## useId

`useId` 用於產生穩定且唯一的 ID，解決了傳統手動管理 ID 的三大問題。

### 為什麼需要 useId？

在 React 開發中，我們經常需要將 `<label>` 和 `<input>` 關聯起來以提升可訪問性（accessibility）。傳統做法有三個嚴重問題：

**❌ 問題 1：手動管理 ID 容易衝突**

```javascript
// ❌ 錯誤：硬編碼 ID
function LoginForm() {
  return (
    <form>
      <label htmlFor="email">電子郵件：</label>
      <input id="email" type="email" />
    </form>
  );
}

function App() {
  return (
    <div>
      <LoginForm />
      <LoginForm />  {/* ❌ ID 衝突！兩個 input 都有 id="email" */}
    </div>
  );
}
```

**結果**：點擊第一個 label 可能會聚焦到第二個 input，完全混亂！

**❌ 問題 2：使用計數器或隨機數會導致 SSR 不匹配**

```javascript
// ❌ 錯誤：使用隨機數
let counter = 0;

function LoginForm() {
  const id = `form-${counter++}`;  // 或 Math.random()
  
  return (
    <form>
      <label htmlFor={id}>電子郵件：</label>
      <input id={id} type="email" />
    </form>
  );
}
```

**SSR 問題**：
- 服務端渲染時：`id="form-0"`
- 客戶端 hydration 時：`id="form-1"` 
- **結果**：React 會警告 hydration mismatch，造成畫面閃爍或錯誤

**❌ 問題 3：useState 產生 ID 太過浪費**

```javascript
// ❌ 不好：為了 ID 使用 useState
function LoginForm() {
  const [id] = useState(() => `form-${Math.random()}`);
  
  return (
    <form>
      <label htmlFor={id}>電子郵件：</label>
      <input id={id} type="email" />
    </form>
  );
}
```

**問題**：ID 永遠不會改變，卻要消耗 state 的資源，而且仍然有 SSR 不匹配問題。

### ✅ useId 完美解決
`useId` 是 React 18+ 提供的全新 Hook，專為產生**穩定且唯一的 ID** 而設計。它用來解決表單欄位等元件「ID 衝突」、「SSR 不一致」等老問題，讓可訪問性（accessibility）開發變得既直觀又安全。本節將介紹 `useId` 的基本用法、常見錯誤寫法與最佳實作建議。

**應用一：`useId` 的基本用法**

```javascript
import React, { useId } from 'react';

function LoginForm() {
  const id = useId();  // ✅ React 自動產生穩定唯一的 ID
  
  return (
    <form>
      <label htmlFor={`${id}-email`}>電子郵件：</label>
      <input id={`${id}-email`} type="email" />
      
      <label htmlFor={`${id}-password`}>密碼：</label>
      <input id={`${id}-password`} type="password" />
    </form>
  );
}

// ✅ 多個實例完全沒問題
function App() {
  return (
    <div>
      <LoginForm />  {/* ID: :r1:-email, :r1:-password */}
      <LoginForm />  {/* ID: :r2:-email, :r2:-password */}
      <LoginForm />  {/* ID: :r3:-email, :r3:-password */}
    </div>
  );
}
```

**useId 的優勢**：
1. ✅ **自動唯一**：每次呼叫產生不同 ID，元件重複使用也不會衝突
2. ✅ **SSR 安全**：服務端和客戶端產生相同的 ID，避免 hydration 問題
3. ✅ **零成本**：不佔用 state，性能最佳
4. ✅ **符合標準**：產生的 ID 符合 HTML 規範

**應用二：可訪問性表單元件**

```javascript
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
    <div>
      {/* label 連結 input */}
      <label htmlFor={id}>
        {label} {required && <span>*</span>}
      </label>
      
      <input
        id={id} // input 的 ID
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        aria-describedby={helpText ? `${id}-help` : undefined} // 關聯說明文字
        aria-invalid={showError}
      />

      {/* 說明文字 */}
      {helpText && (
        <div id={`${id}-help`}>
          {helpText}
        </div>
      )}
      
      {/* 錯誤訊息 */}
      {showError && (
        <div role="alert">
          此欄位為必填
        </div>
      )}
    </div>
  );
}

// 多個 FormField，每個 ID 獨立
function UserForm() {
  return (
    <form>
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
        label="電話"
        type="tel" 
        helpText="格式：0912-345-678"
      />
      
      <button type="submit">提交</button>
    </form>
  );
}
```

**可訪問性效果**：
- 點擊 label 會自動聚焦到對應的 input
- 螢幕閱讀器會朗讀說明文字（`aria-describedby`）
- 錯誤訊息會立即通知螢幕閱讀器（`role="alert"`）

### 總結

**useId 核心重點**

**解決的問題：**
- ❌ 手動 ID 容易衝突
- ❌ 隨機 ID 導致 SSR hydration 不匹配
- ❌ 使用 useState 產生 ID 浪費資源

**主要優勢：**
- ✅ 自動產生唯一 ID
- ✅ SSR 和 CSR 完全一致（hydration 安全）
- ✅ 零性能成本
- ✅ 完美支援可訪問性屬性

**使用場景：**
- `<label htmlFor>` 與 `<input id>` 的關聯
- `aria-describedby`、`aria-labelledby` 等可訪問性屬性
- 任何需要穩定唯一 ID 的場景

**注意事項：**
- ❌ 不要用於 `key` 屬性（請用資料的唯一標識）
- ❌ 不要依賴 ID 的具體格式（格式可能變化）
- ✅ 一個元件可以呼叫多次 `useId`，產生多個 ID
- ✅ 可以用字串模板組合：`` `${id}-email` ``

## useDebugValue

`useDebugValue` 讓自定義 Hook 在 React DevTools 中顯示有意義的調試資訊，幫助開發者快速了解 Hook 的內部狀態。

{% note info %}
**React DevTools** 是 React 官方提供的瀏覽器擴充功能，用於調試 React 應用程式。它可以讓你檢查元件結構、state、props 和 Hooks。

**如何使用：**
1. 安裝後，打開任何 React 應用程式
2. 按 <kbd>F12</kbd> 開啟瀏覽器開發者工具
3. 切換到 **Components** 標籤
4. 點擊元件即可查看其 state、props 和 Hooks

**小技巧：**
在 Components 標籤中，展開元件可以看到它使用的所有 Hooks（useState、useEffect、自定義 Hook 等）。這對於理解元件的內部運作非常有幫助！
{% endnote %}

### 為什麼需要 useDebugValue？
在我們撰寫自定義 Hook 並在大型專案或團隊協作中開發時，經常會遇到「Hook 的內部狀態在 React DevTools 中辨識度不高」的情況。這讓除錯變得麻煩並影響維護效率。`useDebugValue` 就是專爲了解決這個問題而設計，讓你的自定義 Hook 在 DevTools 裡可以顯示語意化、易讀的資訊，提升開發體驗。

下面我們先探討為什麼需要 `useDebugValue`，並結合實際情境說明它的應用與好處。

**❌ 問題：自定義 Hook 在 DevTools 中難以理解**

當你在 React DevTools 中檢查使用自定義 Hook 的元件時，會發現 Hook 的內部狀態只顯示原始值，很難一眼看出它的意義。

```javascript
import { useState, useEffect } from 'react';

// 自定義 Hook：檢測網路狀態
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
}

function UserStatus() {
  const isOnline = useOnlineStatus();
  return <div>{isOnline ? '🟢 在線' : '🔴 離線'}</div>;
}
```

**在 React DevTools 中看到的**：
```
UserStatus
  └─ Hooks
       ├─ useOnlineStatus
       │    └─ State: true  // ❌ 只看到 true，不知道這代表什麼
       └─ useEffect
```

**問題**：
- ❌ 只看到 `true`，不知道代表「在線」還是「離線」
- ❌ 如果元件使用多個自定義 Hook，會看到一堆 `true`、`false`、`{}`，完全搞不清楚哪個是哪個
- ❌ 必須查看程式碼才能理解每個值的意義
- ❌ 團隊協作時，其他開發者更難調試

### ✅ useDebugValue 解決
當你開發自定義 Hook 時，可以使用 `useDebugValue` 幫助在 React DevTools 中顯示更有意義的 debug 訊息，讓狀態與邏輯一目了然。通常在開發團隊協作，或是自定義複雜 Hook 給其他人用的情境下，`useDebugValue` 可以大幅提升可維護性與除錯效率。以下將介紹常見問題、以及如何用 `useDebugValue` 改善開發體驗。

#### 應用一：在 React DevTools 中顯示有意義的資訊

```javascript
import { useState, useEffect, useDebugValue } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // ✅ 在 DevTools 中顯示有意義的資訊
  useDebugValue(isOnline ? '🟢 在線' : '🔴 離線');
  
  return isOnline;
}
```

**在 React DevTools 中看到的**：
```
UserStatus
  └─ useOnlineStatus: "🟢 在線"  // ✅ 一目了然！
```

#### 格式化顯示（效能優化）
如果格式化資訊的成本較高，可以使用第二個參數（formatter function），它只在 DevTools 打開時才執行：

```javascript
function useUserData(userId) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);
  
  // ✅ 使用 formatter 避免不必要的計算
  useDebugValue(user, (u) => {
    // 只在 DevTools 打開時才執行
    if (!u) return '⏳ 載入中。..';
    return `👤 ${u.name} (${u.email})`;
  });
  
  return user;
}
```

**對比**：
```javascript
// ❌ 不好：每次渲染都執行格式化
useDebugValue(user ? `${user.name} (${user.email})` : '載入中。..');

// ✅ 好：只在需要時才格式化
useDebugValue(user, (u) => {
  if (!u) return '載入中。..';
  return `${u.name} (${u.email})`;
});
```

#### 應用二：表單欄位 Hook

```javascript
import { useState, useDebugValue } from 'react';

function useFormField(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState([]);
  
  const handleChange = (e) => {
    setValue(e.target.value);
    setIsDirty(true);
  };
  
  const validate = (validators) => {
    const newErrors = validators
      .map(validator => validator(value))
      .filter(Boolean);
    setErrors(newErrors);
    return newErrors.length === 0;
  };
  
  const reset = () => {
    setValue(initialValue);
    setIsDirty(false);
    setErrors([]);
  };
  
  // ✅ 在 DevTools 中顯示摘要資訊
  useDebugValue({ value, isDirty, errors }, (state) => {
    const parts = [
      `"${state.value}"`,
      state.isDirty && '📝 已修改',
      state.errors.length > 0 && `⚠️ ${state.errors.length} 個錯誤`
    ].filter(Boolean);
    
    return parts.join(' | ');
  });
  
  return {
    value,
    isDirty,
    errors,
    handleChange,
    validate,
    reset
  };
}

// 使用範例
function LoginForm() {
  const email = useFormField('');
  const password = useFormField('');
  
  return (
    <form>
      <input
        type="email"
        value={email.value}
        onChange={email.handleChange}
        placeholder="電子郵件"
      />
      
        <input
        type="password"
        value={password.value}
        onChange={password.handleChange}
        placeholder="密碼"
      />
      
      <button type="submit">登入</button>
    </form>
  );
}
```

**在 React DevTools 中看到的**：
```
LoginForm
  ├─ useFormField: "user@example.com" | 📝 已修改
  └─ useFormField: "••••••" | 📝 已修改 | ⚠️ 1 個錯誤
```

### 總結
**useDebugValue 核心重點**

**解決的問題：**
- ❌ 自定義 Hook 的內部狀態在 DevTools 中難以理解
- ❌ 調試複雜 Hook 時需要添加大量 console.log
- ❌ 團隊成員不了解 Hook 的當前狀態

**主要優勢：**
- ✅ 在 DevTools 中顯示友善的調試資訊
- ✅ 只在開發模式生效，不影響生產環境
- ✅ 支援 formatter 函式，避免不必要的計算
- ✅ 提升調試效率，特別是複雜 Hook

**使用場景：**
- 自定義 Hook 共享給團隊使用時
- Hook 內部狀態複雜，需要摘要資訊
- 開發 Hook 函式庫時
- 調試多個自定義 Hook 的元件

**注意事項：**
- ⚠️ 只在自定義 Hook 內部使用（不是元件）
- ⚠️ 對於簡單的 Hook 可以省略（避免過度使用）
- ✅ 使用 formatter 函式優化效能
- ✅ 只在開發環境生效，打包後會被移除

## useInsertionEffect

`useInsertionEffect` 是 React 18+ 新增的特殊 Hook，專為 CSS-in-JS 函式庫設計，在 DOM 變更之前插入樣式，避免樣式閃爍問題。

{% note info %}
**什麼是 CSS-in-JS？**

**CSS-in-JS** 是一種在 JavaScript 中撰寫 CSS 的技術，讓樣式與元件緊密結合。常見的函式庫有：
- **styled-components**：最流行的 CSS-in-JS 函式庫
- **emotion**：高效能的 CSS-in-JS 解決方案
- **JSS**：功能強大的 CSS-in-JS 工具

**運作方式**：
1. 你在 JavaScript 中定義樣式
2. 函式庫動態生成 CSS
3. 將生成的 `<style>` 標籤插入到 `<head>` 中

**範例**（styled-components）：
```javascript
import styled from 'styled-components';

// 在 JS 中定義樣式
const Button = styled.button`
  background: blue;
  padding: 10px;
  color: white;
`;

function App() {
  return <Button>點我</Button>;
}

// 執行時，styled-components 會在 <head> 插入：
// <style>.sc-xxx { background: blue; padding: 10px; color: white; }</style>
```

**優點**：樣式有作用域、支援動態樣式、方便維護

**缺點**：如果插入樣式的時機不對，會造成畫面閃爍 ← `useInsertionEffect` 就是要解決這個問題！
{% endnote %}

### 為什麼需要 useInsertionEffect？

當我們開發 CSS-in-JS 函式庫，或是需要動態插入樣式時，會遇到「樣式插入時機」的問題。如果使用一般的 `useEffect`，樣式會在畫面已經渲染後才插入，造成使用者看到元素「先沒樣式、後有樣式」的閃爍現象。

下面我們來看看為什麼會有這個問題，以及 `useInsertionEffect` 如何解決。

**Effect Hook 執行順序**

首先，我們需要理解三種 Effect Hook 的執行時機：

```javascript
function TimingDemo() {
  useInsertionEffect(() => {
    console.log('1. useInsertionEffect 執行');
  });
  
  useLayoutEffect(() => {
    console.log('2. useLayoutEffect 執行');
  });
  
  useEffect(() => {
    console.log('3. useEffect 執行');
  });
  
  return <div>查看 Console 輸出</div>;
}
```

**React 三種 Effect 執行時序（渲染一個畫面流程）**
{% mermaid graph LR %}
A[useInsertionEffect 執行<br/>最早同步插入樣式，確保 UI 不閃爍]
B[React 更新 DOM<br/>完成虛擬 DOM 與實體 DOM diff，寫入新結構]
C[useLayoutEffect 執行<br/>可安全存取與同步修改 DOM 佈局]
D[瀏覽器開始繪製畫面<br/>使用者看到最新 DOM 狀態]
E[useEffect 執行<br/>適合處理資料抓取、訂閱等非同步副作用]

A --> B
B --> C
C --> D
D --> E
{% endmermaid %}

**❌ 問題：使用 useEffect 導致樣式閃爍**

如果我們用 `useEffect` 來插入動態樣式，會發生什麼事？

```javascript
function StyledButton() {
  const [color] = useState('blue');
  
  // ❌ 用 useEffect 插入樣式
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .btn {
        background: ${color};
        padding: 10px;
        color: white;
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, [color]);
  
  return <button className="btn">點我</button>;
}
```

**問題流程**：
1. React 渲染元件 → `<button className="btn">` 出現在 DOM
2. 瀏覽器繪製 → **使用者看到按鈕，但沒有 `.btn` 樣式**（閃一下）
3. `useEffect` 執行 → 在 `<head>` 插入 `.btn` 樣式
4. 瀏覽器重新繪製 → 按鈕突然有了樣式

**結果**：使用者會看到按鈕先是灰色無樣式，然後突然變成藍色（閃爍）⚡

**視覺效果**：
```
時間軸：
0ms:  [灰色按鈕]          ← 沒有樣式
100ms: [藍色按鈕]         ← 樣式生效（使用者看到閃爍）
```

### ✅ useInsertionEffect 解決
在 React 應用中，使用動態插入樣式（像是 CSS-in-JS 技術）時，經常會出現「樣式閃爍」的問題。這是因為傳統的 `useEffect` 會在瀏覽器繪製畫面之後才插入樣式，導致元素一開始沒有樣式，使用者會短暫看到未加樣式的畫面。而 `useInsertionEffect` 是 React 18 之後新增的 Effect Hook，可讓我們在 DOM 變更後但瀏覽器繪製前，搶先插入樣式，確保元件一開始渲染時就有正確的樣式。

#### 範例一：使用 useInsertionEffect 插入樣式

重點在於：`useInsertionEffect` 的執行時機比 `useEffect` 早，能讓樣式和 DOM 同步插入，根本解決動態樣式閃爍或畫面跳動的問題。這對開發 CSS-in-JS 函式庫或自訂動態樣式尤為重要。

```javascript
import { useState, useInsertionEffect } from 'react';

function StyledButton() {
  const [color] = useState('blue');
  
  // ✅ 用 useInsertionEffect 插入樣式
  useInsertionEffect(() => {
      const style = document.createElement('style');
    style.textContent = `
      .btn {
        background: ${color};
        padding: 10px;
        color: white;
        border: none;
        border-radius: 4px;
      }
    `;
      document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, [color]);
  
  return <button className="btn">點我</button>;
}
```

**執行流程**：
{% mermaid graph LR %}
    A["useInsertionEffect 執行<br/>（樣式先插入）"]
    B["React 渲染元件<br/>&lt;button&gt; 出現在 DOM"]
    C["瀏覽器繪製<br/>（按鈕直接帶著樣式顯示）"]

    A --> B --> C
{% endmermaid %}

**結果**：沒有閃爍！✨

#### 範例二：動態樣式 Hook
以下提供一個自訂 Hook `useDynamicStyle` 的實作範例。這個 Hook 可讓你「程式化產生 CSS 樣式」並插入頁面，讓彈性樣式隨元件狀態及 props 變動時動態調整。關鍵在於使用 `useInsertionEffect`，確保樣式在 React 標記（Markup）進入 DOM 之前先插入，避免閃爍或抽跳。你僅需傳入自訂的 class 名稱及一組標準 CSS 樣式屬性，即可在元件內自由切換樣式。

**使用步驟：**
1. 呼叫 `const className = useDynamicStyle('my-btn', { ... })` 產生動態樣式
2. 將 `className` 指定給任意元素
3. 更改 Hook 傳入的 style 物件會自動即時刷新樣式


```javascript
import { useInsertionEffect, useState } from 'react';

// 動態樣式 Hook
function useDynamicStyle(className, styles) {
  const [styleId] = useState(() => `${className}-${Date.now()}`);
  
  useInsertionEffect(() => {
    // 檢查樣式是否已存在
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    // 更新樣式內容
    styleElement.textContent = `
      .${className} {
        ${Object.entries(styles)
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n        ')}
      }
    `;
    
    // 清理函式
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, [className, styles, styleId]);
  
  return className;
}

// 使用範例
function DynamicButton() {
  const [color, setColor] = useState('blue');
  
  const buttonClass = useDynamicStyle('dynamic-btn', {
    background: color,
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    'border-radius': '8px',
    cursor: 'pointer',
    'font-size': '16px'
  });
  
  return (
    <div>
      <button className={buttonClass}>
        動態樣式按鈕
      </button>
      
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setColor('blue')}>藍色</button>
        <button onClick={() => setColor('red')}>紅色</button>
        <button onClick={() => setColor('green')}>綠色</button>
      </div>
    </div>
  );
}
```

**為什麼需要 useInsertionEffect？**
- 動態樣式需要在 DOM 出現前就插入，才不會閃爍
- 如果用 `useEffect`，樣式會在繪製後才插入（太晚）
- 如果用 `useLayoutEffect`，雖然不會閃爍，但性能不如 `useInsertionEffect`
- 用 `useInsertionEffect` 確保樣式在最早的時機插入

### 總結

**useInsertionEffect 核心重點**

**解決的問題：**
- ❌ CSS-in-JS 使用 `useEffect` 會導致樣式閃爍
- ❌ 樣式插入時機不當，使用者看到無樣式的元素
- ❌ 動態樣式顯示不同步

**主要優勢：**
- ✅ 在 DOM 變更前插入樣式，完全避免閃爍
- ✅ 專為 CSS-in-JS 函式庫優化
- ✅ 執行時機最早，確保樣式就緒

**使用場景：**
- 開發 CSS-in-JS 函式庫（styled-components、emotion 等）
- 需要動態插入 `<style>` 標籤的函式庫
- 任何需要在 DOM 渲染前準備樣式的底層工具

**注意事項：**
- ⚠️ **99% 的一般開發者不需要使用**（這是給函式庫作者用的）
- ⚠️ 不能在 `useInsertionEffect` 中讀取 refs（因為 DOM 還沒更新）
- ⚠️ 不能在 `useInsertionEffect` 中更新 state（會造成額外渲染）
- ✅ 如果你在用 styled-components 或 emotion，函式庫已經幫你處理好了
- ✅ 一般應用開發請使用 `useEffect` 或 `useLayoutEffect`

**三種 Effect 的選擇：**
```javascript
// ✅ 一般副作用（資料獲取、訂閱等）
useEffect(() => {
  // 99% 的情況用這個
});

// ✅ 需要讀取 DOM 佈局（測量尺寸、計算位置）
useLayoutEffect(() => {
  // 防止視覺閃爍時用這個
});

// ✅ 插入樣式到 <head>（開發 CSS-in-JS 函式庫）
useInsertionEffect(() => {
  // 只有開發底層函式庫時才用
});
```

## useLayoutEffect

`useLayoutEffect` 在所有 DOM 變更後、但在瀏覽器繪製前同步執行，用於需要讀取 DOM 佈局並立即更新畫面的操作。

### 為什麼需要 useLayoutEffect？

在前面介紹 `useInsertionEffect` 時，我們了解了三種 Effect Hook 的執行順序：

```
useInsertionEffect（插入樣式）→ DOM 更新 → useLayoutEffect（讀取佈局）→ 繪製 → useEffect（副作用）
```

其中 `useLayoutEffect` 處於一個關鍵位置：**DOM 已經更新完成，但瀏覽器還沒繪製**。這個時機點非常適合「讀取 DOM 資訊並立即調整」的場景。

**常見應用場景：**
- 📏 測量元素的尺寸或位置
- 🎯 計算彈出視窗、工具提示的定位
- 📜 處理滾動位置
- 🎨 根據 DOM 狀態動態調整樣式

如果用 `useEffect` 來做這些事，會發生什麼問題呢？讓我們來看看。

#### ❌ 問題：使用 useEffect 導致畫面跳動

當你需要讀取 DOM 尺寸或位置，並根據這些資訊更新畫面時，使用 `useEffect` 會造成畫面閃爍，因為它在**瀏覽器繪製後**才執行。

```javascript
function MeasureBox() {
  const [height, setHeight] = useState(0);
  const divRef = useRef();
  
  // ❌ 用 useEffect 讀取高度
  useEffect(() => {
    if (divRef.current) {
      const { height } = divRef.current.getBoundingClientRect();
      setHeight(height);
    }
  });
  
  return (
    <div>
      <div ref={divRef} style={{ padding: '20px' }}>
        這個 div 的高度是：{height}px
      </div>
    </div>
  );
}
```

**問題流程**：
1. React 渲染 → `<div>` 顯示高度是：0px
2. 瀏覽器繪製 → **使用者看到 0px**（閃一下，此時 DOM 已經渲染完成）
3. `useEffect` 執行（這時 DOM 確實已完成渲染）→ 讀取實際高度 → `setHeight(80)`
4. React 重新渲染 → `<div>` 顯示 "高度是：80px"
5. 瀏覽器重新繪製 → 使用者這時才看到正確的高度文字

**結果**：使用者會看到數字從 0 跳到 80（視覺跳動）

### ✅ useLayoutEffect 解決
`useLayoutEffect` 是 React 提供的特殊 Effect Hook，其核心作用在於：**在 DOM 更新完成後但瀏覽器繪製畫面之前，同步存取與調整 DOM 佈局資料**。這意味著你可以在使用者真正「看到畫面」前，介入修改或測量實體 DOM 狀態，確保一切調整都及時生效，而不會造成畫面跳動或閃爍。

主要觀念如下：
- `useLayoutEffect` 與 `useEffect` 用法相似，但觸發時機更早：它是在 React 將最新狀態更新寫入 DOM 結構後、瀏覽器繪製畫面（repaint）前立刻執行，讓你能「攔截」即將顯示的畫面。
- 常見應用場景包含：📏 元素尺寸與位置測量、🎯 動態計算彈窗或工具提示（tooltip/popover）定位、📜 滾動控制與同步、🎨 根據 DOM 狀態立即修改樣式、實現動畫同步等。

`useLayoutEffect` 的最大價值，在於有效避免「先顯示錯誤狀態，後修正」所導致的視覺閃爍（例如：文字先顯示 0px，更新後才變成正確尺寸 80px）。所有需要精準控制畫面顯示、或仰賴 DOM 讀取調整的行為，都建議使用 `useLayoutEffect`。



```javascript
import { useState, useLayoutEffect, useRef } from 'react';

function MeasureBox() {
  const [height, setHeight] = useState(0);
  const divRef = useRef();
  
  // ✅ 用 useLayoutEffect 讀取高度
  useLayoutEffect(() => {
    if (divRef.current) {
      const { height } = divRef.current.getBoundingClientRect();
      setHeight(height);
    }
  });
  
  return (
    <div>
      <div ref={divRef} style={{ padding: '20px' }}>
        這個 div 的高度是：{height}px
      </div>
    </div>
  );
}
```

**執行流程**：
1. React 首次渲染 → `<div>` 預計顯示 "高度是：0px"
2. 此時 DOM 已經渲染完成（可以安全存取實體 DOM）
3. `useLayoutEffect` 執行 → 立即同步讀取 `div` 高度（例如 80px）→ `setHeight(80)`
4. React 重新渲染 → `<div>` 內容更新為 "高度是：80px"
5. 瀏覽器繪製 → **使用者只會看到正確的 "80px"**

**結果**：沒有閃爍！✨

### 實際應用：智能工具提示定位
這是 `useLayoutEffect` 最經典的應用場景之一。工具提示需要根據觸發元素的位置來計算自己應該出現在哪裡，並且要避免超出視窗邊界。如果用 `useEffect`，工具提示會先出現在預設位置 (0, 0)，然後跳到正確位置，造成明顯的視覺跳動。

```javascript
import { useState, useLayoutEffect, useRef } from 'react';

function Tooltip({ children, content, visible }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef();
  const targetRef = useRef();
  
  useLayoutEffect(() => {
    if (visible && tooltipRef.current && targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // 計算最佳位置
      let top = targetRect.bottom + 5;
      let left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
      
      // 防止超出視窗邊界
      if (left < 0) left = 5;
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 5;
      }
      
      if (top + tooltipRect.height > window.innerHeight) {
        // 放在上方
        top = targetRect.top - tooltipRect.height - 5;
      }
      
      setPosition({ top, left });
    }
  }, [visible]);
  
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div ref={targetRef}>{children}</div>
      
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

// 使用範例
function TooltipDemo() {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div style={{ padding: '50px' }}>
      <Tooltip 
        content="這是一個智能定位的工具提示！"
        visible={showTooltip}
      >
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          懸停顯示工具提示
        </button>
      </Tooltip>
    </div>
  );
}
```

**為什麼需要 useLayoutEffect？**
- 工具提示位置需要根據元素的實際尺寸和位置計算
- 如果用 `useEffect`，工具提示會先出現在 (0, 0)，然後跳到正確位置
- 用 `useLayoutEffect` 確保工具提示直接出現在正確位置

### 總結

**useLayoutEffect 核心重點**

**解決的問題：**
- ❌ 使用 `useEffect` 讀取 DOM 會導致畫面閃爍或跳動
- ❌ 需要同步更新 DOM 的場景無法優雅處理
- ❌ 測量 DOM 尺寸後立即使用會有視覺問題

**主要優勢：**
- ✅ 在瀏覽器繪製前同步執行，避免視覺跳動
- ✅ 適合讀取 DOM 佈局並立即更新的場景
- ✅ 確保使用者看到的總是正確的畫面

**使用場景：**
- 測量 DOM 元素尺寸或位置
- 工具提示、彈出選單的智能定位
- 滾動位置計算
- 需要在繪製前同步更新 DOM 的任何場景

**注意事項：**
- ⚠️ **會阻塞瀏覽器繪製**，影響效能
- ⚠️ 優先使用 `useEffect`，只在必要時才用 `useLayoutEffect`
- ⚠️ 避免在 `useLayoutEffect` 中執行昂貴的計算
- ✅ 大部分情況下應該使用 `useEffect`
- ✅ 只在看到視覺閃爍問題時才考慮 `useLayoutEffect`

**三種 Effect 的使用場景總結：**

| Hook                 | 執行時機           | 適用場景               | 使用頻率         |
| -------------------- | ------------------ | ---------------------- | ---------------- |
| `useInsertionEffect` | DOM 變更前         | 插入 `<style>` 標籤    | ⭐ 函式庫作者專用 |
| `useLayoutEffect`    | DOM 變更後、繪製前 | 測量 DOM、計算位置     | ⭐⭐ 特定需求      |
| `useEffect`          | 繪製後             | 資料獲取、訂閱、副作用 | ⭐⭐⭐⭐⭐ 預設選擇   |

**選擇流程圖：**
{% mermaid graph TD %}
    Q1["需要插入 CSS 樣式到 <head>?"]
    Q2["需要讀取 DOM 尺寸/位置並立即更新?"]
    Q3["其他所有情況"]
    A1["useInsertionEffect<br/>(99% 的人不需要)"]
    A2["useLayoutEffect<br/>(會看到閃爍才用)"]
    A3["useEffect<br/>(預設選擇)"]

    Q1 -- 是 --> A1
    Q1 -- 否 --> Q2
    Q2 -- 是 --> A2
    Q2 -- 否 --> Q3
    Q3 --> A3
{% endmermaid %}

**程式碼範例：**
```javascript
// ⭐⭐⭐⭐⭐ 99% 的情況用這個
useEffect(() => {
  // 資料獲取、訂閱、事件監聽、手動 DOM 操作等
});

// ⭐⭐ 只在看到畫面閃爍時才用
useLayoutEffect(() => {
  // 測量 DOM、計算位置、防止視覺跳動
});

// ⭐ 只給開發 CSS-in-JS 函式庫的人用
useInsertionEffect(() => {
  // 插入動態樣式到 <head>
});
```

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