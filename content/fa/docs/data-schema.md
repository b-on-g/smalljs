# طرح‌واره‌های داده

داده‌ای که از یک درخواست شبکه برمی‌گردد `any` است — TypeScript به cast شما اعتماد می‌کند، اما سرور ممکن است چیز دیگری بفرستد. $mol دو کتابخانهٔ کوچکِ طرح‌وارهٔ زمان‌اجرا فراهم می‌کند که JSONِ نامطمئن را به یک مقدارِ نوع‌دار و اعتبارسنجی‌شده تبدیل می‌کنند و وقتی شکل نادرست باشد با صدای بلند شکست می‌خورند — همراه با یک مسیرِ خوانا. آن‌ها را درست همان‌جا که داده وارد برنامه می‌شود به کار ببرید، بیشتر اوقات روی پاسخِ [fetch](#!section=docs/page=data).

## دو کتابخانه

- **`$mol_data`** — پارسرهای تابعیِ مختصر (به سبک zod). توابع پارسِ کوچک را ترکیب می‌کنید و نتیجه را روی یک مقدار فرا می‌خوانید.
- **`$mol_schema`** — طرح‌واره‌های مبتنی‌بر کلاس با مقادیر پیش‌فرض. یک کلاسِ رکورد را گسترش می‌دهید و `.guard()`، `.cast()`، `.check()` و یک `.default` می‌گیرید.

هر دو در زمان اجرا اعتبارسنجی می‌کنند و نوعِ ایستا را برای شما استنتاج می‌کنند. برای DTOهای سریع و (نا)سریال‌سازی سراغ `$mol_data` بروید؛ وقتی کلاس‌های طرح‌وارهٔ نام‌دار و قابل‌بازاستفاده با مقادیر پیش‌فرض و castِ آسان‌گیر می‌خواهید سراغ `$mol_schema`.

## $mol_data

شکل را به‌صورت یک رکورد از پارسرهای فیلد توصیف کنید:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

آن را روی مقدار خام فرا بخوانید. دادهٔ معتبر عبور می‌کند، کاملاً نوع‌دار؛ دادهٔ نامعتبر یک `$mol_data_error` پرتاب می‌کند که مسیرِ دقیقِ شکست‌خورده را نام می‌برد:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

نوعِ استنتاج‌شده را با `typeof UserDTO.Value` هرجا بازاستفاده کنید:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

اجزای سازنده شامل `$mol_data_string`، `$mol_data_number`، `$mol_data_integer`، `$mol_data_boolean`، `$mol_data_email`، `$mol_data_optional`، `$mol_data_nullable`، `$mol_data_variant` (یکی از چند نوع)، `$mol_data_array`، `$mol_data_dict` و `$mol_data_record` است. `$mol_data_pipe` یک مقدارِ پارس‌شده را به یک تبدیل می‌خوراند — برای مثال یک رشتهٔ ISO را به یک `$mol_time_moment` — که هم‌زمان نقشِ (نا)سریال‌سازی را هم بازی می‌کند.

## $mol_schema

یک طرح‌واره را به‌صورت کلاسی که یک رکورد را گسترش می‌دهد تعریف کنید:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

آن‌گاه سه راه برای اعمالِ آن دارید، به‌علاوهٔ یک مقدارِ پیش‌فرضِ آماده:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

طرح‌واره‌های برگ شامل `$mol_schema_string`، `$mol_schema_integer`، `$mol_schema_natural`، `$mol_schema_float`، `$mol_schema_boolean`، `$mol_schema_enum([ ... ])` و `$mol_schema_pattern( /re/ )` است. آن‌ها را با `$mol_schema_list( Item )`، `$mol_schema_dict([ Key, Val ])`، `$mol_schema_maybe( S )` (یک مقدار، `null` یا `undefined`)، `$mol_schema_some([ ... ])` (یک اجتماع) و `$mol_schema_partial({ ... })` ترکیب کنید. فیلدهای یک رکوردِ دیگر را با `...Base.Fields` بگسترانید:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## اعتبارسنجی یک پاسخِ fetch

درست همان‌جا که داده فرود می‌آید پارس کنید، درونِ همان ویژگیِ واکنش‌گرایی که آن را واکشی می‌کند:

```typescript
namespace $.$$ {
	export class $my_page extends $.$my_page {
		@ $mol_mem
		user() {
			const json = $mol_fetch.json( 'https://api.example.com/me' )
			return $my_user.guard( json ) // typed $my_user, or throws on bad data
		}
	}
}
```

اگر سرور شکلِ نادرست بفرستد، `guard` پرتاب می‌کند و شکست در نما به‌صورت یک وضعیت خطا نمایان می‌شود — درست مثل هر [خطای fetchِ](#!section=docs/page=data) دیگری، پس هرگز دادهٔ نیمه‌خراب رندر نمی‌کنید. وقتی یک مقدارِ پیش‌فرضِ معقول بهتر از یک خطاست، `cast` را بر `guard` ترجیح دهید.

## بعدی

برای ذخیره و همگام‌سازیِ دادهٔ نوع‌دار میان کلاینت‌ها بدون هیچ بک‌اندی که اجرا شود، به [Giper Baza](#!section=docs/page=giper-baza) ادامه دهید — موجودیت‌هایش درست بر همین ایدهٔ طرح‌واره بنا شده‌اند.
