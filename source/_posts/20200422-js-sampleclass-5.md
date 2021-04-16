---
title: "[練習課程] JavaScript 實作（五）：小故事遊戲 (Feat.SweetAlert)"
categories:
  - 職訓教材
  - JavaScript
tag:
  - JavaScript 程式設計（假日班）
  - PHP 資料庫網頁設計（職前班）
  - 前端網頁開發技術（職前班）
date: 2020-04-22 02:25:06
---

本篇透過之前的小作業再優化的小遊戲，透過 JS 外掛 SweetAlert2 完成取代提示視窗的事件。
<!-- more -->

大致設計步驟如下：
1. 使用者一進網頁就先執行一個角色命名的事件 A
2. A 結束後，提問是否選擇遊戲開始事件 B，所以畫面上有個 B 事件的按鈕
3. 事件 B 是連續的多個判斷 T/F 路線走向，一但失敗仍可由畫面上的 B 事件按鈕觸發
4. 如果順利走完事件 B，觸發一個事件 C，主要是把畫面上的 B 事件觸發給取消

# 學會 sweetAlert2
{% note default %}
先前往官方文件取得相關資料 [官方資源網址](https://sweetalert2.github.io/)
{% endnote %}

我們大概的理解一下，如何使用 sweetAlert。大致上分簡單用跟專業用語法。都是在 script 內去執行此指令。

## 簡單的 Alert 效果
可以一行就寫完，有分為標題、內文、ICON 類型，你可以只寫 1 組重要的文字其他都不填。
```javascript
Swal.fire(
  '標題字串',
  '內文字串',
  'quesion' //另可指定 info,warring,error,success
)
```

## 可設計的視窗表單
參數非常多，需要哪些功能就寫出參數，不寫屬性則部分有預設效果
```javascript
Swal.fire({ 一個 swal 事件 A 執行
  title: '這裡是猜猜遊戲，請輸入角色名字', //標題
  input: 'text', //輸入欄位的類型
  inputValue: '大俠', //欄位預設值
  showLoaderOnConfirm: true, //啟用輸入框
  confirmButtonText: '我取好了', //確定按鈕之文字
  cancelButtonText: '略過', //取消按鈕之文字
  showCancelButton: true, //提供取消按鈕
  allowOutsideClick: false //是窗外的按鈕可否觸發取消事件
}).then(function (result) { //按下按鈕後，能得到一個 object
  if (result.dismiss === 'cancel') { //如果物件。dissmiss=cancel 代表用戶按取消鍵
    name = "阿明";
    Swal.fire({ //如果是取消反應，提供一個 swal 事件 A-1
      title: `不想輸入？別怕~~我不是死神`,
      text: `那就叫你${name}吧，阿明開始闖關吧`,
      allowOutsideClick: false,
      imageUrl: 'alertgame/00.jpg',
      imageHeight: 300
    }).then(start);
  }
  else { //反之，就不是按下取消時
    name = result.value; //confirm 的值會存在物件。value
    Swal.fire({ //由於不是取消反應，提供一個 swal 事件 A-2
      title: `${name}這名字聽起來就專業！`,
      text: '請開始闖關挑戰',
      allowOutsideClick: false,
      imageUrl: 'alertgame/01.jpg',
      imageHeight: 300
    }).then(start); // 按下確定後，執行叫 start 的 function
  }
});
```
所以 swal 生成很簡單，你需要甚麼就寫甚麼，如果需要按鈕後反應或是取得輸入值，都多加一個 `.then()` 於後面。() 內指定你要執行的 js 代碼，譬如：

```javascript
.ther(function(result){
  console.log(result); //result 是 swal 回傳的結果已物件提供。
  if(result.dismiss==='cencel') console.log("被按下了取消");
  if(result.value) console.log("使用者輸入了"+result.value);
  /*
   * Swal.fire({
   *   #insert a new swal event be here
   * });
  */
});
```

差不到這裡你就能用出基本的 swal，還有更多豐富用法都在官網示範

# 規劃 Story 流程

## 事件 A: 取得角色名稱
先讓網頁執行時跑 gameplay() 透過 swal 取得 name，或者取不到時做何反應。最後兩個結果都能導向執行 start 函式。

```javascript
var name;
function gameplay() {
  Swal.fire({
    title: '這裡是猜猜遊戲，請輸入角色名字',
    input: 'text',
    inputValue: '大俠',
    showLoaderOnConfirm: true,
    confirmButtonText: '我取好了',
    cancelButtonText: '略過',
    showCancelButton: true,
    allowOutsideClick: false
  }).then(function (result) {
    if (result.dismiss === 'cancel') {
      name = "阿明";
      Swal.fire({
        title: `不想輸入？別怕~~我不是死神`,
        text: `那就叫你${name}吧，阿明開始闖關吧`,
        allowOutsideClick: false,
        imageUrl: 'files/00.jpg',
        imageHeight: 300
      }).then(start);
    }
    else {
      name = result.value;
      Swal.fire({
        title: `${name}這名字聽起來就專業！`,
        text: '請開始闖關挑戰',
        allowOutsideClick: false,
        imageUrl: 'files/01.jpg',
        imageHeight: 300
      }).then(start);
    }
  });
}
gameplay();
```

## 事件 B: 故事本體
這裡就是依賴 swal 的 T/F 判斷，如果達到條件就再塞入 then+new swal。形成多層級的連續作業。最後達到目標時，去執行跑 finish 函式

```javascript
function start() {
  let mission;
  Swal.fire({
    title: `勇者${name}，你即將進入了充滿陷阱的迷宮。.`,
    text: "一旦選錯路就會馬上 GG，你要開始了嗎？",
    confirmButtonText: '出發！',
    cancelButtonText: '先不要。.',
    showCancelButton: true,
    allowOutsideClick: false,
    imageUrl: 'files/10.jpg',
    imageHeight: 300,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.dismiss === 'cancel') {
      Swal.fire({
        title: `等你準備好挑戰再來吧！`,
        allowOutsideClick: false,
        imageUrl: 'files/11.jpg',
        imageHeight: 300
      });
    }
    else {
      Swal.fire({
        title: `欣賞你的勇氣，開始闖五關吧！`,
        allowOutsideClick: false,
        imageUrl: 'files/12.gif',
        imageHeight: 300
      }).then(function () {
        Swal.fire({//lv1
          title: "第 1 關：詭異的不明聲音",
          text: "遠處發出低沉的怒吼，要前往查看嗎？",
          confirmButtonText: '來瞧瞧！',
          cancelButtonText: '危險不去',
          showCancelButton: true,
          allowOutsideClick: false,
          imageUrl: 'files/20.gif',
          imageHeight: 300,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33'
        }).then((result) => {
          if (result.dismiss === 'cancel') {
            Swal.fire({
              //B
              title: "GAME OVER",
              text: `因為忽略，找不到廁紙可用的道長對你使出了咒殺`,
              confirmButtonText: "重新來過",
              allowOutsideClick: false,
              imageUrl: "files/21.jpg",
              imageHeight: 300
            });
          }
          else {
            Swal.fire({ //G
              title: "過關",
              text: "原來是沒有廁紙的旅行者，給了他一些廁紙，繼續趕路",
              allowOutsideClick: false,
              imageUrl: 'files/22.jpg',
              imageHeight: 300
            }).then(function () {
              Swal.fire({//lv2
                title: "第 2 關：周杰倫的可愛女人",
                text: "有個女人受傷跌在地上，去扶她嗎？",
                confirmButtonText: '美女怎啦！',
                cancelButtonText: '趕路不去',
                showCancelButton: true,
                allowOutsideClick: false,
                imageUrl: 'files/30.gif',
                imageHeight: 300,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
              }).then((result) => {
                if (result.dismiss !== 'cancel') {
                  Swal.fire({
                    //B
                    title: "GAME OVER",
                    text: "因為遇到碰瓷，你的旅行已提早結束",
                    confirmButtonText: "重新來過",
                    allowOutsideClick: false,
                    imageUrl: "files/31.gif",
                    imageHeight: 300
                  });
                }
                else {
                  Swal.fire({ //G
                    title: "過關",
                    text: "沒有任何豔遇發生",
                    allowOutsideClick: false,
                    imageUrl: 'files/32.jpg',
                    imageHeight: 300
                  }).then(function () {
                    Swal.fire({//lv3
                      title: "第 3 關：浦島太郎是膩？",
                      text: "有個烏龜正被小屁孩欺負，要救嗎？",
                      confirmButtonText: '唉唷救牠！',
                      cancelButtonText: '趕路不去',
                      showCancelButton: true,
                      allowOutsideClick: false,
                      imageUrl: 'files/40.jpg',
                      imageHeight: 300,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33'
                    }).then((result) => {
                      if (result.dismiss !== 'cancel') {
                        Swal.fire({
                          //B
                          title: "GAME OVER",
                          text: "原來小屁孩是官二代，你被黑衣人綁走了",
                          confirmButtonText: "重新來過",
                          allowOutsideClick: false,
                          imageUrl: "files/41.jpg",
                          imageHeight: 300
                        });
                      }
                      else {
                        Swal.fire({ //G
                          title: "過關",
                          text: "原來是隻鱉，一口反擊了小屁孩，自食惡果",
                          allowOutsideClick: false,
                          imageUrl: 'files/42.gif',
                          imageHeight: 300
                        }).then(function () {
                          Swal.fire({//lv4
                            title: "第 4 關：這次變桃太郎膩？",
                            text: "有隻狗跟你乞討丸子吃，要給嗎？",
                            confirmButtonText: '餓壞了，吃吧！',
                            cancelButtonText: '想吃去買阿',
                            showCancelButton: true,
                            allowOutsideClick: false,
                            imageUrl: 'files/50.gif',
                            imageHeight: 300,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33'
                          }).then((result) => {
                            if (result.dismiss !== 'cancel') {
                              Swal.fire({
                                //B
                                title: "GAME OVER",
                                text: "又來了雞跟猴子，誘拐你立即前往鬼島討罰",
                                confirmButtonText: "重新來過",
                                allowOutsideClick: false,
                                imageUrl:
                                  "files/51.jpg",
                                imageHeight: 300
                              });
                            }
                            else {
                              Swal.fire({ //G
                                title: "過關",
                                text: "狗生氣地朝你揮了一拳？沒事發生。.. 前進吧！小氣的勇者",
                                allowOutsideClick: false,
                                imageUrl: 'files/52.jpg',
                                imageHeight: 300
                              }).then(function () {
                                Swal.fire({//lv5
                                  title: "第 5 關：掉落的陷阱？",
                                  text: "不小心掉到密室內，牆上發現有謎題該去解嗎？",
                                  confirmButtonText: '解開！',
                                  cancelButtonText: '小心有詐',
                                  showCancelButton: true,
                                  allowOutsideClick: false,
                                  imageUrl: 'files/60.jpg',
                                  imageHeight: 300,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33'
                                }).then((result) => {
                                  if (result.dismiss === 'cancel') {
                                    Swal.fire(
                                      {
                                        //B
                                        title:"GAME OVER",
                                        text:"因為你的疑心病，被困在密室內無法離開",
                                        confirmButtonText:"重新來過",
                                        allowOutsideClick: false,
                                        imageUrl:"files/61.gif",
                                        imageHeight: 300
                                      }
                                    );
                                  }
                                  else {
                                    Swal.fire({ //G
                                      title: "過關",
                                      text: "你帥氣的解出 1+1=2 順利逃脫密室",
                                      allowOutsideClick: false,
                                      imageUrl: 'files/62.jpg',
                                      imageHeight: 300
                                    }).then(function () {
                                      finish(1);
                                    });
                                  }
                                });
                              });
                            }
                          });
                        });
                      }
                    });
                  });
                }
              });
            });
          }
        });
      });
    }
  });
}
```

## 事件 C:finish 的結果畫面
這裡就是為了區別出故事結束，利用 DOM 去控制畫面改變。

```javascript
function finish(e) {
  if (e) {
    document.body.style.backgroundImage = "url('files/bg2.jpg')";
    mybtn.removeEventListener("click", start);
    mybtn.value = "恭喜過關";
  }
}
```

## HTML 規劃
主要兩個，一個是背景圖，一個是觸發 B 事件的按鈕。這兩個都會被 C 事件所改變。

```html
<head>
  <script src="js/sweetalert2.all.min.js"></script>
  <style>
    body {
      background-repeat: no-repeat;
      background-size: auto 120vh;
      background-position-x: center;
      text-align: center;
    }
  </style>
</head>

<body style="background-image: url('files/bg1.jpg')">
  <input type="button" value="繼續挑戰" id="btn" style="margin:45vh auto;width:20vw">
  <script src="js/loki.js"></script>
</body>
```

{% note default %}
**示範參考：** 
[View Full Code](https://github.com/summer10920/skillStudies_JS_WebDemo/tree/master/storyGame_swal)
[DEMO Page](https://summer10920.github.io/skillStudies_JS_WebDemo/storyGame_swal/)
{% endnote %}