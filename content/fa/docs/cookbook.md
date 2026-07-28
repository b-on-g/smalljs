# کتابِ آشپزی

دستورهای کوتاه و آمادهٔ کپی برای کارهایی که تقریباً در هر اپلیکیشنی پیش می‌آیند. هرکدام کدِ واقعیِ $mol است — نام‌ها را هماهنگ کنید و همان را بگذارید.

## ورودیِ دوسویه

بدونِ سیم‌کشیِ هیچ هندلری، یک ورودی و یک مقدارِ مشتق را همگام نگه دارید: `<=>` در هر دو جهت متصل می‌کند و هر ویژگیِ محاسبه‌شده‌ای که آن مقدار را می‌خواند خودبه‌خود به‌روز می‌شود.

```tree
$my_greeter $mol_view
	sub /
		<= Name $mol_string
			value? <=> name?
		<= Hello $mol_view
			sub / <= greeting \
```

```typescript
namespace $.$$ {
	export class $my_greeter extends $.$my_greeter {
		@ $mol_mem name( next?: string ) { return next ?? '' }

		@ $mol_mem greeting() {
			return this.name() ? `Hello, ${ this.name() }!` : 'Type your name'
		}
	}
}
```

## فهرستی که می‌توانید به آن بیفزایید و از آن حذف کنید

مجموعه را در یک ویژگیِ واکنش‌گرا نگه دارید و از دلِ اکشن‌ها آن را تغییرناپذیر بازنویسی کنید. یک `Row*`ِ کلیددار برای هر آیتم یک ردیف رندر می‌کند و — به لطفِ [رندرِ مجازی‌سازی‌شده](#!section=docs/page=rendering) — فقط ردیف‌های دیده‌شدنی ساخته می‌شوند.

```tree
$my_todo $mol_view
	draft? \
	items /
	sub /
		<= Input $mol_string
			value? <=> draft?
			hint \New item
		<= Add $mol_button_major
			click? <=> add?
			sub / <= add_label \Add
		<= List $mol_list
			rows <= item_rows /
	Row* $mol_row
		sub /
			<= Label* $mol_view
				sub / <= item_title* \
			<= Delete* $mol_button_minor
				click? <=> delete*?
				sub / <= delete_label \✕
```

```typescript
namespace $.$$ {
	export class $my_todo extends $.$my_todo {
		@ $mol_mem draft( next?: string ) { return next ?? '' }
		@ $mol_mem items( next?: readonly string[] ) { return next ?? [] }

		@ $mol_action add() {
			const title = this.draft().trim()
			if( !title ) return
			this.items([ ... this.items(), title ])
			this.draft( '' )
		}

		@ $mol_action delete( id: number ) {
			this.items( this.items().filter( ( _, i ) => i !== id ) )
		}

		item_title( id: number ) { return this.items()[ id ] }

		item_rows() {
			return this.items().map( ( _, id ) => this.Row( id ) )
		}
	}
}
```

## دریافتِ داده با وضعیت‌های بارگذاری و خطا

مقدارِ ناهمگام فقط یک ویژگیِ واکنش‌گراست که یک promise برمی‌گرداند. `$mol_fetch` تا زمانی که درخواست در راه است فایبر را معلق می‌کند، بنابراین هر نمایی که آن را می‌خواند وضعیتِ بارگذاریِ توکار را نشان می‌دهد — و یک درخواستِ ناموفق به‌صورتِ وضعیتِ خطا رو می‌آید. نه پرچمِ `isLoading` می‌نویسید و نه `try`/`catch`.

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return $mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}

		@ $mol_mem
		names() {
			return this.users().map( user => user.name )
		}
	}
}
```

## پایدارسازیِ وضعیتِ محلی

برای وضعیتی که باید از بارگذاریِ دوباره جان به در ببرد اما URL را شلوغ نکند — یک نوارِ کناریِ جمع‌شده، یک پیش‌نویس، یک ترجیح — از `$mol_state_local` استفاده کنید. همان شکلِ گتر/ستری را دارد که هر ویژگیِ واکنش‌گرا دارد و در `localStorage` ذخیره می‌کند.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## خواندن و نوشتنِ یک پارامترِ مسیر

برای اینکه مقداری قابلِ‌اشتراک و قابلِ‌نشانه‌گذاری شود، به‌جای آن با `$mol_state_arg` پشتیبانی‌اش کنید. خواندن مقدارِ فعلیِ URL را برمی‌گرداند؛ پاس‌دادنِ یک آرگومان جابه‌جا می‌کند و دکمهٔ بازگشتِ مرورگر سلول را برایتان به‌روز می‌کند.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

یک `$mol_link` می‌تواند همان آرگومان را به‌صورتِ اعلانی تنظیم کند، طوری که یک کلیکِ ساده بدونِ هندلر جابه‌جا می‌کند:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

دربارهٔ تعویضِ صفحه‌ها بر پایهٔ مقدارِ مسیر، [مسیریابی](#!section=docs/page=routing) را ببینید.

## افزودنِ تمِ خودکارِ روشن/تیره

`$mol_theme_auto` را به‌عنوانِ یک [پلاگین](#!section=docs/page=plugins) وصل کنید — کامپوننتی بدونِ عنصر که زیرِ `plugins /` فهرست می‌شود. با پیرویِ از ترجیحِ سیستم‌عامل، یک تمِ روشن یا تیره را روی زیردرختِ میزبان اعمال می‌کند، بی‌آنکه چیدمانِ شما را در چیزی بپیچد.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## بعدی

می‌خواهید زنده امتحانش کنید؟ [زمین بازی](#!section=playground) را باز کنید و هر دستوری را در آن بچسبانید، یا [شروعِ کار](#!section=docs/page=getting-started) را پیش بروید تا یک اپلیکیشنِ کامل بسازید.
