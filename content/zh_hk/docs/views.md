# 視圖

視圖就是一個元件：UI 樹中的一個節點，擁有自己的版面、行為和樣式。本章介紹視圖如何宣告、如何與邏輯連接、如何組合與重用。

## 三個檔案，一個元件

元件 `$my_card` 位於 `my/card/`，由最多三個檔案描述，每個檔案職責清晰：

- `card.view.tree` —— 元件**是甚麼**：它的結構和預設繫結。
- `card.view.ts` —— 它**如何**運作：TypeScript 方法、響應式狀態。
- `card.view.css.ts` —— 它長甚麼樣：由編譯器檢查的帶型別樣式。

把結構、行為和樣式分開是刻意為之——每個檔案都保持短小易讀，版面永遠不會和邏輯糾纏在一起。

## view.tree 語言

`view.tree` 以宣告式描述結構。縮排即巢狀；沒有閉合標籤。

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` —— 你的元件繼承自基底類別 `$mol_view`。
- `sub /` —— 子節點清單。
- `<= Title $mol_view` —— 一個具名子視圖，在 TypeScript 中可透過 `this.Title()` 存取。
- `<= title \` —— 一個可繫結屬性，帶一個預設的原始字串值（`\` 開始一個原始字串）。

每個大寫名稱（`Title`、`Body`）都會成為一個真實屬性，你可以存取、覆寫或為它設定樣式。每個小寫繫結（`title`、`text`）都會成為一個你可以在 `.view.ts` 中計算的值。

## 繫結屬性

兩個運算子把屬性連接到它的來源：

- `<=` **單向**：子節點從擁有者讀取一個值。
- `<=>` **雙向**：值在兩個方向上流動——用於輸入控制項。

```tree-no-run
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

這裡輸入控制項的 `value` 和擁有者的 `text` 會自動保持同步：在欄位中輸入，`text` 就更新；在程式碼中設定 `text`，欄位就反映出來。

## 連接到行為

沒有預設值的繫結在 `.view.ts` 中實作。類別繼承自同名的產生基底類別：

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

範本繫結的任何東西——`title`、`text`、某個子視圖的屬性——都可以在這裡賦予邏輯。響應式讓這些值變得鮮活。

## 屬性與元素型別

用 `dom_name` 更改底層 HTML 元素，用 `attr` 設定屬性：

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

`^` 會繼承父級的屬性，這樣你就不會丟掉 `$mol_view` 已經設定的那些。

## 清單與帶鍵視圖

結尾的 `*` 把一個子視圖變成一個族——每個鍵對應一個實例。用它來做列：

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

框架會為你提供的每個鍵建立一個 `Row`，並且藉由[虛擬化算繪](#!section=docs/page=rendering)，只建置螢幕上可見的那些。

> 當一個帶鍵視圖本身包含帶鍵的子節點時，用 `Name*` 而不是 `Name*0` 給外層加鍵——帶索引的形式會導致巢狀子節點不被算繪。

## 條件視圖

指派 `null` 會把一個視圖從算繪中移除。衍生子類別並把某個變體不需要的東西置空：

```tree
$my_page_readonly $my_page
	Edit_button null
```

## 組合與重用

視圖透過巢狀來組合，透過擴充來特化。一個用在清單裡的卡片：

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` 從不重新定義卡片長甚麼樣——它重用 `$my_user_card` 並給每個實例餵入資料。這就是整個組合模型：小視圖，連接在一起，需要變體時用 `extends` 特化。

## 下一步

視圖描述結構；讓它們活起來的是響應式資料。繼續閱讀 [狀態與響應式](#!section=docs/page=state)。
