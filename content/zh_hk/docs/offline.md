# 離線

$mol 應用可以在沒有網絡的情況下繼續運作——在線打開一次，之後離線也依然可用，甚至可以作為 PWA 安裝。這來自一個內建模組 `mol/offline/install`，並且與任何資料層無關。

## 它做什麼

`mol/offline/install` 執行 `$mol_offline`，後者把一個 **service worker**（`web.js`）註冊為快取代理。每一個成功的靜態資源 `GET`——應用包、樣式、圖片——都會存入名為 `$mol_offline` 的快取。之後載入時，worker 直接從快取回傳這些回應，因此應用瞬間打開，並透過回退到快取副本挺過 HTTP 錯誤或斷線。由於整個應用都可快取並以此方式提供，瀏覽器可以提供**將其安裝為 PWA**。

## 如何啟用

在應用的 `*.meta.tree` 中加入一行：

```tree
include \/mol/offline/install
```

這個強制 include 把模組拉入打包，於是它的 service worker 作為副作用完成註冊——無需其他程式碼引用它。關於 `include` 的運作方式，參見[模組元資料](#!section=docs/page=meta)。

瀏覽器在執行時的兩個要求：

- 透過 **HTTPS** 提供（開發時用 `localhost`）——否則 service worker 拒絕運作。
- 提供一個 Web 應用清單（manifest），使應用可安裝。

## 它*不是*什麼

離線快取讓*單個*用戶端在沒有網絡時繼續運作。它**不**在用戶端之間同步資料：帶查詢字串的請求會被直接放行，非 `GET` 請求從不快取。當多個用戶端或裝置需要共用同一份即時、可編輯的資料——並進行無衝突合併——時，那是另一回事，由獨立的 [Giper Baza](#!section=docs/page=giper-baza) 專案處理。
