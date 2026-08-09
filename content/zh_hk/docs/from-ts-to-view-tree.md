# 從 TypeScript 到 view.tree

你在[快速開始](#!section=docs/page=getting-started)裡寫的那個元件，是一個普通的 TypeScript 類別。它能編譯、能執行，而且是框架支援的幾種元件描述方式之一。

它同時也逼你在腦子裡記住四件跟元件本身無關的事。本頁逐個拆開它們，並給出消掉每一件的那行 `view.tree`。最後再看編譯器產生的程式碼，你可以自己核對：樹不是第二套執行環境，它產出的正是你已經寫過的那個類別。

先把那份檔案再放一遍，方便對照：

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

## 子元件由你建立，也由你快取

其中六行是一個工廠：

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

刪掉 `@ $mol_mem`，程式碼照樣編譯。但它不再是同一個元件了：`this.Name() !== this.Name()`，因為函式主體每次呼叫都執行 `new`。誰最後讀到這個屬性誰說了算，先前的實例帶著攢下的一切留在原地，也沒有人銷毀它們——$mol 只擁有它替你快取過的物件。

在 `view.tree` 裡，同一個子元件就是一行：

```tree
		<= Name $mol_string
```

首字母大寫代表這個屬性裝的是元件，`<=` 負責宣告它。這裡沒有哪種更短的寫法會漏掉裝飾器，因為工廠根本不用你寫。

## 資料往哪邊流，由運算子說了算

給子元件餵資料就是指派，一個屬性一次：

```typescript
			obj.sub = () => [ this.greeting() ]
```

三個活動零件：子物件、屬性名，以及一個讓讀取延後到之後而不是現在發生的箭頭。這一行說清了什麼連著什麼，卻沒說方向；要知道方向，你得讀箭頭的主體，看看有沒有東西回流。

樹把方向放進了運算子：

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` 是單向的，從 `greeting` 流進子元件的 `sub`。`/` 是列表，`\` 開始一段原始字串，而 `greeting \` 宣告了一個預設值為空字串的屬性——正是你之後要在 TypeScript 裡覆寫的那個。

## 雙向繫結離「悄悄變成唯讀」只差一次按鍵

輸入框需要雙向的資料，這正是參數 `next` 的作用：

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

現在把 `next` 拿掉：

```typescript
			obj.value = () => this.name()
```

TypeScript 接受這種寫法。無參數函式可以指派給期待一個選用參數的位置，於是型別檢查通過，稽核依然是綠的。輸入框照常繪製，顯示正確的值，然後悄無聲息地忽略你輸入的一切。

在樹裡，這種只連了一半的寫法根本寫不出來：

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` 雙向繫結。光禿禿的 `?` 標記一個接受參數的屬性，也就是可以寫入的屬性。這裡兩端都帶著它，所以值會流進輸入框，也會流回來。

## 一段可在地化的文字，在你為它造出鍵之前只是字串

```typescript
		title() {
			return 'Greeting'
		}
```

要翻譯它，你得自己想一個鍵，把字面值換成 `$mol_locale.text` 呼叫，寫好 json，然後在專案餘下的日子裡手工保持兩邊一致。

```tree
	title @ \Greeting
```

`@` 把字串標記為可在地化，剩下的交給建構。建構之後，`my/hello/-/web.locale=en.json` 裡是這樣：

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

譯者拿到的是一份含全部文案的 json。你一個鍵都不用寫。

## 完整的元件

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

這就是 `hello.view.tree`。留在 `hello.view.ts` 裡的，是從來就不屬於結構的那部分：

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

類別現在繼承 `$.$my_hello`，也就是樹產生的基底類別，並覆寫其中一個屬性。`$.$$` 就是放這類覆寫的命名空間。

## 編譯器產出什麼

`view.tree` 是一個沒有自己執行環境的程式碼產生器。建構模組之後，讀一讀 `my/hello/-view.tree/hello.view.tree.js`：

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

同樣的工廠、同樣的箭頭、同樣的三次 `$mol_mem` 呼叫，外加兩個你沒動手命名的在地化鍵。等 bundle 抵達瀏覽器時，樹早已不在。

這也是兩種格式能自由混用的原因。用樹寫的元件和用類別寫的元件產出的是同一種物件，同一個應用可以同時容納兩者，誰也察覺不到差別。

## 手寫的類別交不出去的東西

在產生的 JS 旁邊，編譯器還會寫一份 `hello.view.tree.d.ts`：

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

那些 `$mol_type_enforce` 成對地把每條繫結和它所餵的屬性核對一遍，於是型別不符會報在繫結這一行，而不是子元件深處的某個地方。下面的類別主體則是元件對外表面的機器可讀描述，而且真的有東西在讀它：上面那份在地化檔案出自同一次剖析，本站的 [API 頁面](#!section=docs/page=api-mol-string)也是從每個基礎元件的 `.view.tree.d.ts` 產生的。

手寫的類別給不出這些。它是程式碼，唯一讀得懂它的只有 TypeScript。

## 體量

上面這個 Hello World：31 行 TypeScript 變成 8 行樹加 8 行 TypeScript。

元件越大，差距越大。`$mol_app_users` 有一個搜尋框、一個列表、四個按鈕和一行狀態，寫成樹是 30 行、840 個字元，寫成類別是 125 行、3046 個字元。兩個版本在維基的[格式對比](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats)頁面上都有完整程式碼，取捨可以自己掂量。

## 該寫哪一種

兩種都寫，按元件來選。

`view.ts` 是受支援的格式。樹最終編譯成的就是它，這樣寫出的元件與其他元件毫無二致。當一個元件主要是邏輯、只帶一兩個子元件時，類別才是誠實的選擇，樹給不了多少好處。

樹划算的地方在於那些重複的儀式：以結構為主的畫面、成排的繫結、任何包含譯者需要看到的文案的地方。介面的大部分正是如此，所以 $mol 自己的元件都是這麼寫的。

接下來是樹語言本身——列表、字典、帶鍵的子元件，以及用繼承來特化一個元件：**[視圖](#!section=docs/page=views)**。
