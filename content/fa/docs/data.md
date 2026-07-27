# دریافت داده

بارگذاری دادهٔ راه‌دور در $mol یک API ویژه نیست — یک مقدار ناهم‌زمان صرفاً یک ویژگیِ واکنش‌گراست که اتفاقاً یک promise برمی‌گرداند. نما منتظرش می‌ماند، یک وضعیت بارگذاری نشان می‌دهد و هنگام حل‌شدن دوباره رندر می‌کند.

## یک ویژگیِ ناهم‌زمان

از یک `@ $mol_mem` یک promise برگردانید و آن را مانند هر مقدار دیگری بخوانید:

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
	}
}
```

`$mol_fetch` فایبر را تا رسیدن پاسخ معلق می‌کند. تا وقتی در حال انتظار است، هر نمایی که `users()` را می‌خواند به‌طور خودکار وضعیت بارگذاریِ توکار را نشان می‌دهد — هیچ پرچمِ `isLoading` نمی‌نویسید.

## رندرِ نتیجه

دادهٔ حل‌شده را مستقیماً به یک فهرست متصل کنید:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

وقتی promise حل می‌شود، `users()` به‌روز می‌شود، `user_names()` بازمحاسبه می‌شود و فهرست رندر می‌شود. نه کال‌بکی، نه `useEffect`‌ای.

## بارگذاری دوباره

چون فقط یک سلولِ واکنش‌گراست، با بی‌اعتبارکردنش دوباره واکشی می‌کنید. به یک توکن که می‌توانید افزایشش دهید وابسته شوید:

```typescript
		@ $mol_mem
		reload_token( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		users() {
			this.reload_token() // subscribe
			return $mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
		}

		@ $mol_action
		reload() {
			this.reload_token( this.reload_token() + 1 )
		}
```

فراخوانی `reload()` توکن را تغییر می‌دهد، که `users()` را بی‌اعتبار می‌کند، که دوباره واکشی می‌کند.

## خطاها

پرتاب در درونِ یک ویژگیِ واکنش‌گرا به نزدیک‌ترین نما منتشر می‌شود، که به‌جای محتوا یک وضعیت خطا رندر می‌کند. برای رسیدگیِ خودتان، آن را بگیرید و یک مقدارِ پیش‌فرض برگردانید:

```typescript
		@ $mol_mem
		users_safe() {
			try {
				return this.users()
			} catch( error ) {
				if( error instanceof Promise ) throw error // still loading
				return []
			}
		}
```

پرتابِ دوبارهٔ یک `Promise` راهی است تا وضعیت بارگذاری همچنان جریان یابد و در همان حال فقط خطاهای واقعی گرفته شوند.

## بعدی

برای داده‌ای که بدون هیچ بک‌اندی میان کلاینت‌ها پایدار می‌ماند و همگام می‌شود، به [Giper Baza](#!section=docs/page=giper-baza) ادامه دهید.
