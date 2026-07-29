# 常見問題

## 什麼是 smalljs？

smalljs 是 **$mol** 的文件網站——一個帶型別視圖、自動響應式且沒有虛擬 DOM 的響應式 UI 框架。框架本身由 hyoo-ru 社群公開開發；本站把指南、互動式課程、即時遊樂場和 API 參考彙集於一處。

## $mol 可以用於生產嗎？

可以。$mol 驅動著真實的應用和內部工具——參見[展示](#!section=docs/page=showcase)。它從單一 monorepo（MAM）交付，作者和社群每天都在使用。

## 執行期有多大？

很小。一個最小的應用大約是 123 KB 未壓縮的 JavaScript，壓縮後經網絡傳輸大約 20 KB。渲染預設是虛擬化的（視口之外的元件永遠不會被建立），而且建置只打包你實際用到的模組，所以打包體積隨你的應用增長，而不是隨框架增長。詳情和可重現的基準測試參見[渲染](#!section=docs/page=rendering)。

## 我必須學一門新的模板語言嗎？

你要學 `view.tree`，一種用於宣告元件版面配置的緊湊樹形語法。它是刻意保持小巧的——[視圖](#!section=docs/page=views)一章一次就能涵蓋你所需的一切。邏輯仍然用普通 TypeScript，樣式也是帶型別的。

## 它和 React、Vue 或 Svelte 有什麼不同？

響應式是自動的——沒有 `useState`、`useEffect`，也沒有手動訂閱。你描述 UI *是什麼*；$mol 決定*如何*以及*何時*更新它。[概念對照表](#!section=docs/page=rosetta)把其他框架的概念映射到 $mol。

## 我在哪裏獲得協助？

- 在 [DEV 社群](https://dev.to/t/mol)提問
- 瀏覽 [GitHub 上的 $mol 原始碼和 issues](https://github.com/hyoo-ru/mam_mol)
- 閱讀 [mol.hyoo.ru](https://mol.hyoo.ru/) 上的參考文件

## 它採用什麼授權？

MIT。你可以在商業和開源專案中自由使用 $mol。
