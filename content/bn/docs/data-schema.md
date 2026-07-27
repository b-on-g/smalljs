# ডেটা স্কিমা

নেটওয়ার্ক রিকোয়েস্ট থেকে ফিরে আসা ডেটার টাইপ `any`——TypeScript আপনার কাস্টে বিশ্বাস করে, কিন্তু সার্ভার অন্য কিছু পাঠাতে পারে। $mol দুটি ছোট রানটাইম-স্কিমা লাইব্রেরি সরবরাহ করে যা অবিশ্বস্ত JSON-কে একটি টাইপড, ভ্যালিডেটেড মানে পরিণত করে এবং আকৃতি ভুল হলে সশব্দে ব্যর্থ হয়——একটি পঠনযোগ্য পাথসহ। ডেটা যেখানে অ্যাপে প্রবেশ করে ঠিক সেখানে এগুলো ব্যবহার করুন, বেশিরভাগ সময় একটি [fetch](#!section=docs/page=data) রেসপন্সে।

## দুটি লাইব্রেরি

- **`$mol_data`**——সংক্ষিপ্ত, ফাংশনাল পার্সার (zod-এর মতো)। আপনি ছোট পার্সিং ফাংশন কম্পোজ করেন এবং ফলাফলটি একটি মানের ওপর কল করেন।
- **`$mol_schema`**——ডিফল্টসহ ক্লাস-ভিত্তিক স্কিমা। আপনি একটি রেকর্ড ক্লাস এক্সটেন্ড করেন এবং `.guard()`, `.cast()`, `.check()`, আর একটি `.default` পান।

দুটোই রানটাইমে ভ্যালিডেট করে এবং আপনার জন্য স্ট্যাটিক টাইপ ইনফার করে। দ্রুত DTO ও (ডি)সিরিয়ালাইজেশনের জন্য `$mol_data`; ডিফল্ট মান ও শিথিল কাস্টিংসহ নামযুক্ত, পুনর্ব্যবহারযোগ্য স্কিমা ক্লাস চাইলে `$mol_schema`।

## $mol_data

আকৃতিকে ফিল্ড পার্সারের একটি রেকর্ড হিসেবে বর্ণনা করুন:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

এটিকে কাঁচা মানের ওপর কল করুন। বৈধ ডেটা পুরোপুরি টাইপড হয়ে পার হয়; অবৈধ ডেটা একটি `$mol_data_error` থ্রো করে, যা ব্যর্থ হওয়া সঠিক পাথটি নাম ধরে বলে:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

ইনফার করা টাইপটি `typeof UserDTO.Value` দিয়ে যেকোনো জায়গায় পুনর্ব্যবহার করুন:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

বিল্ডিং ব্লকের মধ্যে আছে `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (কয়েকটি টাইপের একটি), `$mol_data_array`, `$mol_data_dict` ও `$mol_data_record`। `$mol_data_pipe` একটি পার্স করা মানকে একটি ট্রান্সফর্মে পাঠায়——যেমন একটি ISO স্ট্রিংকে একটি `$mol_time_moment`-এ——যা একই সঙ্গে (ডি)সিরিয়ালাইজেশনের কাজও করে।

## $mol_schema

একটি স্কিমাকে একটি রেকর্ড-এক্সটেন্ডকারী ক্লাস হিসেবে সংজ্ঞায়িত করুন:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

তখন এটি প্রয়োগের তিনটি উপায় পাবেন, সঙ্গে একটি রেডিমেড ডিফল্ট:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

লিফ স্কিমার মধ্যে আছে `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` ও `$mol_schema_pattern( /re/ )`। এগুলোকে `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (মান, `null`, বা `undefined`), `$mol_schema_some([ ... ])` (একটি ইউনিয়ন), ও `$mol_schema_partial({ ... })` দিয়ে কম্পোজ করুন। অন্য একটি রেকর্ডের ফিল্ড `...Base.Fields` দিয়ে স্প্রেড করুন:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## একটি fetch রেসপন্স ভ্যালিডেট করা

ডেটা যেখানে অবতরণ করে ঠিক সেখানে পার্স করুন, অর্থাৎ যে রিয়্যাক্টিভ প্রপার্টি এটি ফেচ করে তার ভেতরে:

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

সার্ভার ভুল আকৃতি পাঠালে `guard` থ্রো করে, এবং ব্যর্থতা ভিউতে একটি এরর স্টেট হিসেবে ফুটে ওঠে——ঠিক অন্য যেকোনো [fetch ত্রুটির](#!section=docs/page=data) মতোই, তাই আপনি কখনো অর্ধ-ভাঙা ডেটা রেন্ডার করেন না। একটি যুক্তিসঙ্গত ডিফল্ট যখন একটি ত্রুটির চেয়ে ভালো, তখন `guard`-এর বদলে `cast` বেছে নিন।

## পরবর্তী

কোনো ব্যাকএন্ড না চালিয়েই ক্লায়েন্টের মধ্যে টাইপড ডেটা সংরক্ষণ ও সিঙ্ক করতে [Giper Baza](#!section=docs/page=giper-baza)-তে এগিয়ে যান——এর এনটিটিগুলো ঠিক একই স্কিমা ধারণার ওপর নির্মিত।
