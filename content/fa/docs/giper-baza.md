# Giper Baza

Giper Baza لایهٔ دادهٔ local-first در $mol است: یک انبارِ CRDT که به‌صورت محلی پایدار می‌ماند و به‌طور خودکار میان کلاینت‌ها همگام می‌شود. داده را به‌صورت موجودیت مدل می‌کنید؛ خواندن‌ها و نوشتن‌ها مانند ویژگی‌های واکنش‌گرای معمولی به نظر می‌رسند، و تکثیر خودبه‌خود رخ می‌دهد.

> این صفحه شکلِ API را معرفی می‌کند. Giper Baza موضوعی بزرگ است — این را یک نقشه در نظر بگیرید، نه تمامِ سرزمین.

## یک موجودیت تعریف کنید

یک موجودیت یک **طرح‌وارهٔ خالص** است — مجموعه‌ای از فیلدهای نوع‌دار. رفتار را بیرون نگه دارید؛ خواندن و نوشتن را در نماهایتان انجام دهید.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

هر فیلد یک **اتم** است — یک سلولِ همگام‌شده با یک مقدارِ نوع‌دار.

## خواندن و نوشتن

انبار را بگیرید، به یک فهرست از موجودیت‌ها برسید و به‌صورت واکنش‌گرا روی آن‌ها map کنید:

```typescript
		@ $mol_mem
		tasks() {
			return this.tasks_list().remote_list()
		}

		@ $mol_mem_key
		task_done( id: string, next?: boolean ) {
			const task = this.task( id )
			if( next !== undefined ) task.Done( null )!.val( next )
			return task.Done()?.val() ?? false
		}
```

خواندن `Done()?.val()` مقدار کنونی را می‌دهد؛ نوشتن `Done(null)!.val(next)` آن را تنظیم می‌کند. هر نمایی که آن اتم را می‌خواند، وقتی خودش — یا یک همتای راه‌دور — آن را تغییر دهد دوباره رندر می‌شود.

## ساختن و حذف‌کردن

```typescript
		@ $mol_action
		task_add( title: string ) {
			const task = this.tasks_list().make( [ [ null, $giper_baza_rank_read ] ] )!
			task.Title( null )!.val( title )
			task.Done( null )!.val( false )
		}

		@ $mol_action
		task_remove( id: string ) {
			this.tasks_list().cut( this.task( id ).link() )
		}
```

## همگام‌سازی خودکار است

چیزی برای پیکربندی وجود ندارد. تغییرات به‌صورت بلادرنگ به کلاینت‌های دیگر تکثیر می‌شوند و همان داده به‌صورت آفلاین نیز در دسترس است — انبار وقتی اتصال بازگردد آشتی می‌دهد. چون نوشتن‌ها ادغام‌های CRDT هستند، ویرایش‌های هم‌زمان از دستگاه‌های مختلف بدون تعارض ترکیب می‌شوند.

## بعد از این کجا؟

اکنون کل قوس را در اختیار دارید: [نماها](#!section=docs/page=views)، [وضعیت](#!section=docs/page=state)، [مسیریابی](#!section=docs/page=routing)، [دریافت داده](#!section=docs/page=data) و ذخیره‌سازیِ local-first. همهٔ آن را در [زمین بازی](#!section=playground) بیازمایید.
