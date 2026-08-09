# از تایپ‌اسکریپت به view.tree

مؤلفه‌ای که در [شروع به کار](#!section=docs/page=getting-started) نوشتید یک کلاس معمولیِ تایپ‌اسکریپت است. کامپایل می‌شود، اجرا می‌شود و یکی از راه‌های پشتیبانی‌شده برای توصیف مؤلفهٔ $mol است.

همان مؤلفه از شما خواست چهار چیز را در ذهن نگه دارید که هیچ ربطی به کارِ خودِ مؤلفه ندارند. این صفحه آن‌ها را یکی‌یکی برمی‌دارد و خطِ `view.tree` را نشان می‌دهد که هر کدام را حذف می‌کند. بعد کدی را نشان می‌دهد که کامپایلر تولید می‌کند تا خودتان بسنجید: درخت زمانِ اجرای دومی نیست، همان کلاسی را می‌سازد که پیش‌تر نوشته‌اید.

این هم دوبارهٔ آن فایل، برای مقایسه:

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

## فرزند را خودتان می‌سازید و خودتان هم کش می‌کنید

شش خط از آن‌ها یک کارخانه است:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

`@ $mol_mem` را پاک کنید؛ باز هم کامپایل می‌شود. اما دیگر یک مؤلفه نیست: `this.Name() !== this.Name()`، چون بدنه در هر فراخوانی `new` را اجرا می‌کند. هرکس آخر از همه ویژگی را بخواند برنده است، نمونه‌های قبلی با هرچه انباشته‌اند باقی می‌مانند و کسی جمعشان نمی‌کند — $mol فقط مالکِ اشیائی است که خودش برایتان کش کرده.

در `view.tree` همان فرزند یک خط است:

```tree
		<= Name $mol_string
```

نامِ با حرف بزرگ یعنی این ویژگی یک مؤلفه را نگه می‌دارد و `<=` آن را اعلام می‌کند. نگارشِ کوتاه‌تری که دکوراتور را جا بیندازد وجود ندارد، چون کارخانه را شما نمی‌نویسید.

## جهتِ داده را عملگر می‌گوید

غذا دادن به فرزند یعنی انتساب، ویژگی به ویژگی:

```typescript
			obj.sub = () => [ this.greeting() ]
```

سه قطعهٔ متحرک: شیء فرزند، نام ویژگی، و یک پیکان تا خواندن بعداً اتفاق بیفتد نه همین حالا. این خط می‌گوید چه چیزی به چه چیزی وصل است، اما نمی‌گوید در کدام جهت؛ برای فهمیدنش باید بدنهٔ پیکان را بخوانید و ببینید چیزی برمی‌گردد یا نه.

درخت جهت را در عملگر می‌گذارد:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` یک‌طرفه است، از `greeting` به `sub`ِ فرزند. `/` یک فهرست است، `\` آغازِ رشتهٔ خام است و `greeting \` ویژگی‌ای را با رشتهٔ خالی به‌عنوان پیش‌فرض اعلام می‌کند — همان مقداری که در تایپ‌اسکریپت بازنویسی‌اش می‌کنید.

## پیوند دوطرفه یک کلید تا «فقط‌خواندنیِ خاموش» فاصله دارد

ورودی به دادهٔ دوطرفه نیاز دارد و کارِ پارامترِ `next` همین است:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

حالا `next` را بردارید:

```typescript
			obj.value = () => this.name()
```

تایپ‌اسکریپت این را می‌پذیرد. تابعی بدون آرگومان جایی که یک آرگومانِ اختیاری انتظار می‌رود قابل انتساب است، پس نوع‌ها جور درمی‌آیند و ممیزی سبز می‌ماند. ورودی رسم می‌شود، مقدار درست را نشان می‌دهد و هرچه تایپ کنید بی‌صدا نادیده می‌گیرد.

در درخت چنین اتصالِ نیمه‌کاره‌ای نوشتنی نیست:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` دوطرفه پیوند می‌زند. `?`ِ خالی نشانهٔ ویژگی‌ای است که آرگومان می‌گیرد، یعنی ویژگی‌ای که می‌شود در آن نوشت. اینجا در هر دو سر آمده، پس مقدار به ورودی می‌رود و برمی‌گردد.

## رشتهٔ قابل‌بومی‌سازی تا وقتی کلید نسازید فقط یک رشته است

```typescript
		title() {
			return 'Greeting'
		}
```

برای ترجمه‌اش کلیدی از خودتان می‌سازید، لفظ را با فراخوانی `$mol_locale.text` جایگزین می‌کنید، json را می‌نویسید و تا پایان عمرِ پروژه این دو را دستی هماهنگ نگه می‌دارید.

```tree
	title @ \Greeting
```

`@` رشته را قابل‌بومی‌سازی علامت می‌زند و بقیه‌اش با فرایند ساخت است. پس از ساخت، در `my/hello/-/web.locale=en.json` این هست:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

مترجم‌ها یک فایل json با تمام رشته‌های برنامه می‌گیرند. شما حتی یک کلید هم نمی‌نویسید.

## کل مؤلفه

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

این `hello.view.tree` است. آنچه در `hello.view.ts` می‌ماند بخشی است که هرگز ساختار نبود:

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

کلاس اکنون از `$.$my_hello` ارث می‌برد، همان پایه‌ای که درخت ساخته، و یک ویژگی را بازنویسی می‌کند. `$.$$` فضای نامِ این بازنویسی‌هاست.

## کامپایلر چه بیرون می‌دهد

`view.tree` یک تولیدکنندهٔ کد است بدون زمانِ اجرای مخصوص خودش. ماژول را بسازید و `my/hello/-view.tree/hello.view.tree.js` را بخوانید:

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

همان کارخانه‌ها، همان پیکان‌ها، همان سه فراخوانیِ `$mol_mem`، به‌اضافهٔ دو کلید بومی‌سازی که مجبور نشدید نامشان را بگذارید. تا وقتی بسته به مرورگر برسد، دیگر خبری از درخت نیست.

به همین دلیل هم دو قالب آزادانه در کنار هم می‌نشینند. مؤلفه‌ای که با درخت نوشته شده و مؤلفه‌ای که با کلاس نوشته شده هر دو یک جور شیء تولید می‌کنند، پس یک برنامه می‌تواند هر دو را داشته باشد و هیچ‌کدام تفاوتی حس نکند.

## چیزی که کلاسِ دست‌نویس به هیچ ابزاری نمی‌دهد

کنار JSِ تولیدشده، کامپایلر `hello.view.tree.d.ts` را هم می‌نویسد:

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

جفت‌های `$mol_type_enforce` هر پیوند را با ویژگی‌ای که تغذیه می‌کند می‌سنجند، پس ناسازگاریِ نوع درست روی خودِ پیوند گزارش می‌شود نه جایی در دلِ فرزند. بدنهٔ کلاس زیر آن‌ها توصیفی ماشین‌خوان از سطحِ بیرونیِ مؤلفه است و واقعاً خوانده می‌شود: فایل بومی‌سازیِ بالا از همین تجزیه بیرون می‌آید و [صفحه‌های API](#!section=docs/page=api-mol-string) همین سایت از `.view.tree.d.ts`ِ هر مؤلفهٔ پایه تولید می‌شوند.

کلاسِ دست‌نویس هیچ‌کدام از این‌ها را عرضه نمی‌کند. کد است و تنها چیزی که می‌تواند بخواندش تایپ‌اسکریپت است.

## اندازهٔ ماجرا

همان Hello World بالا: ۳۱ خط تایپ‌اسکریپت می‌شود ۸ خط درخت به‌علاوهٔ ۸ خط تایپ‌اسکریپت.

هرچه مؤلفه بزرگ‌تر شود فاصله بیشتر می‌شود. `$mol_app_users` — یک جعبهٔ جست‌وجو، یک فهرست، چهار دکمه و یک خط وضعیت — به‌صورت درخت ۳۰ خط و ۸۴۰ نویسه است و به‌صورت کلاس ۱۲۵ خط و ۳۰۴۶ نویسه. هر دو نسخه به‌طور کامل در صفحهٔ ویکیِ [مقایسهٔ قالب‌ها](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats) آمده‌اند تا خودتان معامله را بسنجید.

## کدام را بنویسیم

هر دو را، مؤلفه به مؤلفه.

`view.ts` قالبی پشتیبانی‌شده است. درخت به همین کامپایل می‌شود و مؤلفه‌ای که این‌طور نوشته شود مثل بقیه رفتار می‌کند. وقتی مؤلفه بیشتر منطق است و یکی دو فرزند دارد، کلاس انتخابِ صادقانه‌تری است و درخت چیز زیادی اضافه نمی‌کند.

درخت جایی خرجش را درمی‌آورد که تشریفات تکرار می‌شود: صفحه‌هایی که بیشترشان ساختار است، ردیف‌های بلند پیوند، هر چیزی که متنی دارد که مترجم می‌خواهد ببیندش. بیشترِ یک رابط کاربری همین است، و برای همین مؤلفه‌های خودِ $mol این‌طور نوشته شده‌اند.

بعدی خودِ زبانِ درخت است — فهرست‌ها، دیکشنری‌ها، فرزندانِ کلیددار و تخصصی‌کردنِ یک مؤلفه با ارث‌بری: **[نماها](#!section=docs/page=views)**.
