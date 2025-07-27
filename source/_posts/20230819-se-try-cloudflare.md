---
title: '[系統工程] Cloudflare - Domain、DNS、SSL 從購買到部屬的網域建置'
categories:
  - Misc Notes
  - System Engineer
tag:
  - DNS
  - Domain
  - SSL
date: 2023-08-19 15:44:28
hidden: true
---

![](assets/images/q7tyXPV.png)

不久前未注意到信用卡自動續約失效，舊的 domain 網域期限已過期半個月，等我回神到 Google Domains 後台管理時也來不及續約了，若要拿回這個網域需要破萬的搶救費用。當下覺得對於這個舊網域名稱也沒有很中意或依賴就算了。而最近又開始嘗鮮一些伺服器部屬做學習，果斷還是再買一個新 Domain 來弄。

<!-- more -->

# 使用 Cloudflare 動機
原使用的是 Google Domains 為網域註冊商，由於是 Google 服務快又能整合一起，介面簡單又穩定且基本上算是費用偏划算的選擇。沒有過多的需求下是打算繼續購買的平台。結果看到通知於今年 6 月已經賣給另一家 Squarespace 競爭對手，雖然現在保證過渡期間與接下來一年內價格依然不變，但調查一下 Squarespace 本身現有網域註冊的功能其價格是還偏高，以及 Squarespace 主要為創網提供平台的客戶定位，之後合併也會跟 Google workplace 分離。並不符合我這樣的個人使用，那麼選擇 Google Domains 的理由也不存在了。

較知名的 goDaddy 與 NameCheap 以全球性規模來說是較知名的註冊商且價格偏高，且周邊服務介紹上不斷推銷加價購買更多功能（尤其是 DNS 管理部分也分為進階費），這樣的供應商選擇會比較適合公司型客戶，並提供客服支援的中小企業直接付費使用。若要費用精打細算就需要找尋比較新創或中小型註冊商，部分使用者也會透過購買這兩家最基本的網域費用，再 DNS 託管給免費的 Cloudflare 進行額外加強的 DNS 管理。此時令人震驚的是，Cloudflare 本身也提供了 domain 購買的服務且價格十分划算（比 Google Domains 還便宜些），同時 Cloudflare 提供的附加服務更是值得喊香的選擇。

若要學會 DNS 完整活用與管理，勢必 Cloudflare 是很好的機會平台學習，不如就在同一個平台學會購買註冊與 DNS 管理，並且 Cloudflare 也提供了免費 SSL，光是費用總和考量下來這是最佳的選擇方案。以下列出優缺點：

### 優缺點
Cloudflare 免費提供包括 SSL 憑證及 DNSSEC 等功能，以及享有 CDN 網站加速及安全防護等功能，同時也支援繁體中文介面，優點部分在於價格便宜，舉例想購買 `lokiwebs.com` 這個網域費用，在不同的註冊商購買有些是統一價有些是首年優惠，若以 3 年為折台幣計算如下：

| Total Price | Google Domains | namecheap  | porkbun   | goDaddy  | Cloudflare |
| ----------- | -------------- | ---------- | --------- | -------- | ---------- |
| 1 years     | NT 350         | NT 311.45  | NT 310.49 | NT 315   | NT 291.99  |
| 2 years     | NT 700         | NT 622.90  | NT 620.99 | NT 905   | NT 583.97  |
| 3 years     | NT 900         | NT 1215.17 | NT 931.48 | NT 1,370 | NT 875.96  |

而缺點部分在頂級域名（TLD）的支援度不夠廣泛，所以台灣域名的`.com.tw`跟`.tw`是沒辦法註冊購買的。

## 購買網域
註冊帳號後並收取 email 認證信與回覆確認，再拜訪後台進行註冊網域，註冊網域有一些建議事項：
- 可以英文數字跟`-`符號組合，但盡可能名稱作為一個標誌性 slogan，建議不要太長且一律小寫（可以數字但少見，除非品牌本身是數字像是 yes123 或 104），也避免英文混入 0,1 這樣誤會的數字當英文看，或者用-來命名避免手機輸入網址文字要切換符號頗麻煩。
- 以及 TLD 場合性質考量。以 com 來說是最基本便宜不雷的商用性質（約 10 美金）。
- 如果這名字太有名，像是 loki.com 就基本上破百萬起跳從仲介商手上買回。有特殊需求場合像是 io,online,app 等等較貴些，或者些冷門的 TLD 域名就便宜些。
- 可以考慮一個主要網域名稱，之後隨著應用不同可以用免費的子網域來區分，舉例 google.com 為主網域的品牌，mail.google.com 與 calendar.google.com 就能根據不同應用網站來區分。

![查詢喜歡的 domain 名稱與費用域覽](https://i.imgur.com/3s1HgEZ.png)

接著就是填寫真實資料與刷海外信用卡了，以美金為收費。雖然資料為真實填寫但 Cloudflare 會幫你自動隱匿 WHOIS 上面的持有人資訊，因此不用擔心洩漏出去。另外在此畫面下預設會自動續訂於到期前 60 日，可以取消自動續訂避免自動扣款看個人需求。

![WHOIS 資訊會是 Cloudflare 不會你個人避免被](https://i.imgur.com/Qi4bdDC.png)

## 管理網域與建議設定
第一次使用難免眼花撩亂，說真的我也是嚇到功能比以前使用的 DNS 託管還多，更不說這些都是免費的。以下是我記錄的設定。

### 快速入門手冊
在一開始的概觀這裡，有個很明顯的按鈕可以進行快速入門手冊，這裡都可以開啟為 on，主要是幫助網址都是以 https 為主，以及透過 Cloudflare 裡啟用 Brotli 壓縮演算法來幫助加快網頁載入速度，不過也要對應你的網站伺服器 (Apache or Nginx) 要開啟或安裝擴展能支援 Brotli 壓縮。

  - 自動改寫 HTTPS: ON
  - 一律使用 HTTPS: ON
  - Brotli: ON

> 要檢查你的網站是否提供此技術，可以從 [Brotli Test](https://tools.keycdn.com/brotli-test) 這裡做測試。

### DNSSEC 開啟
拜訪 DNS>設定，進行啟用 DNSSEC。這能幫助 DNS 記錄的加密簽名來保護您的網域防止僞造的 DNS 回應。Cloudflare提供的說明挺完善的

### 完成區域設定的所需步驟


# 參考文獻
- [如何啟用 Brotli 提高壓縮率來加快載入網頁│坂本 Sakamoto.blog - 探究科技未知領域](https://www.sakamoto.blog/brotli/)