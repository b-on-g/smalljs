# دریافت داده

بارگذاری دادهٔ راه‌دور در $mol یک API ویژه نیست — یک مقدار ناهم‌زمان صرفاً یک ویژگیِ واکنش‌گراست که چنان نوشته شده که انگار پاسخ از پیش آنجاست. نما منتظرش می‌ماند، یک وضعیت بارگذاری نشان می‌دهد و وقتی داده رسید دوباره رندر می‌کند.

## یک ویژگیِ ناهم‌زمان

شبکه را درونِ یک `@ $mol_mem` صدا بزنید و نتیجهٔ پارس‌شده را برگردانید. نه promiseای در کد هست، نه `await`ی و نه کال‌بکی:

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}
	}
}
```

`$mol_fetch` فایبر را تا رسیدن پاسخ معلق می‌کند، بعد محاسبه از نو راه می‌افتد و `users()` آرایه را برمی‌گرداند. تا وقتی در حال انتظار است، هر نمایی که `users()` را می‌خواند به‌طور خودکار وضعیت بارگذاریِ توکار را نشان می‌دهد — هیچ پرچمِ `isLoading` نمی‌نویسید. خودتان از یک `@ $mol_mem` promise برنگردانید: promiseای که به‌عنوان مقدار ذخیره شود سلول را برای همیشه در وضعیتِ بارگذاری نگه می‌دارد، [رفع اشکال](#!section=docs/page=troubleshooting) را ببینید.

`this.$` زمینهٔ کامپوننت است. هر سرویسی از همین راه می‌آید: `$mol_fetch` برای شبکه، `$mol_state_arg` برای URL، `$mol_after_timeout` برای زمان. در یک تست زمینه جایگزین می‌شود، پس همان `users()` درخواستش را به‌جای شبکه به یک ماک می‌فرستد، بی‌آنکه خطی از کامپوننت عوض شود. [تست‌نویسی](#!section=docs/page=testing) همان ماک را نشان می‌دهد.

## رندرِ نتیجه

دادهٔ حل‌شده را مستقیماً به یک فهرست متصل کنید:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

وقتی پاسخ می‌رسد، `users()` به‌روز می‌شود، `user_names()` بازمحاسبه می‌شود و فهرست رندر می‌شود. نه کال‌بکی، نه `useEffect`‌ای.

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
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
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
