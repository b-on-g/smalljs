# TypeScript থেকে view.tree

[শুরু করা](#!section=docs/page=getting-started)-য় আপনি যে কম্পোনেন্টটি লিখেছেন সেটি একটি সাধারণ TypeScript ক্লাস। এটি কম্পাইল হয়, চলে, আর $mol কম্পোনেন্ট বর্ণনার সমর্থিত উপায়গুলির একটি।

একই সঙ্গে এটি আপনাকে চারটি জিনিস মাথায় রাখতে বাধ্য করেছে, যেগুলির সঙ্গে কম্পোনেন্টের কাজের কোনো সম্পর্ক নেই। এই পৃষ্ঠা সেগুলি একটি একটি করে ধরে, আর প্রতিটির জন্য `view.tree`-র যে লাইনটি সেটিকে মুছে দেয় তা দেখায়। তারপর কম্পাইলার যে কোড তৈরি করে সেটি দেখায়, যাতে আপনি নিজেই যাচাই করতে পারেন: ট্রি দ্বিতীয় কোনো রানটাইম নয়, এটি সেই ক্লাসটিই বানায় যা আপনি আগেই লিখেছেন।

তুলনার জন্য সেই ফাইলটি আবার:

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

## সন্তান আপনিই বানান, ক্যাশও আপনিই করেন

ওর মধ্যে ছয় লাইন একটি ফ্যাক্টরি:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

`@ $mol_mem` মুছে দিন, তবু কম্পাইল হবে। কিন্তু এটি আর একটিমাত্র কম্পোনেন্ট থাকবে না: `this.Name() !== this.Name()`, কারণ প্রতিবার ডাকলেই বডি `new` চালায়। যে সবার শেষে প্রপার্টিটি পড়ল সে-ই জেতে, আগের ইনস্ট্যান্সগুলি যা জমিয়েছিল তা নিয়েই পড়ে থাকে, আর কেউ সেগুলি সরায় না — $mol কেবল সেই বস্তুগুলিরই মালিক যেগুলি সে নিজে আপনার জন্য ক্যাশ করেছে।

`view.tree`-তে একই সন্তান এক লাইন:

```tree
		<= Name $mol_string
```

বড় হাতের অক্ষরে শুরু হওয়া নাম মানে প্রপার্টিটি একটি কম্পোনেন্ট ধরে রাখে, আর `<=` সেটি ঘোষণা করে। ডেকোরেটর ভুলে যায় এমন কোনো ছোট লেখনভঙ্গি নেই, কারণ ফ্যাক্টরিটি আপনি লিখছেনই না।

## ডেটা কোন দিকে যাবে, তা অপারেটরই বলে

সন্তানকে খাওয়ানো মানে অ্যাসাইন করা, একবারে একটি প্রপার্টি:

```typescript
			obj.sub = () => [ this.greeting() ]
```

তিনটি চলমান অংশ: সন্তান বস্তু, প্রপার্টির নাম, আর একটি অ্যারো যাতে পড়াটা এখন নয়, পরে ঘটে। লাইনটি বলে কী কার সঙ্গে জোড়া, কিন্তু কোন দিকে তা বলে না; সেটি জানতে হলে অ্যারোর ভেতরটা পড়ে দেখতে হবে কিছু ফিরে আসে কি না।

ট্রি দিকটা অপারেটরের ভেতরেই রাখে:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` একমুখী, `greeting` থেকে সন্তানের `sub`-এ। `/` একটি তালিকা, `\` কাঁচা স্ট্রিং শুরু করে, আর `greeting \` ফাঁকা স্ট্রিং ডিফল্ট রেখে একটি প্রপার্টি ঘোষণা করে — যেটি আপনি পরে TypeScript-এ ওভাররাইড করবেন।

## দ্বিমুখী বাঁধাই নিঃশব্দ কেবল-পঠনযোগ্য হওয়া থেকে এক কি-স্ট্রোক দূরে

ইনপুটের দুই দিকেই ডেটা দরকার, আর সেই কাজটাই করে `next` প্যারামিটার:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

এবার `next` বাদ দিন:

```typescript
			obj.value = () => this.name()
```

TypeScript এটি মেনে নেয়। যেখানে একটি ঐচ্ছিক আর্গুমেন্ট প্রত্যাশিত সেখানে আর্গুমেন্টহীন ফাংশন বসানো যায়, তাই টাইপ মিলে যায় আর অডিটও সবুজ থাকে। ইনপুট আঁকা হয়, সঠিক মান দেখায়, আর আপনি যা টাইপ করেন তার সবটা নিঃশব্দে উপেক্ষা করে।

ট্রি-তে এমন আধখানা জোড়া লেখাই যায় না:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` দুই দিকেই বাঁধে। খালি `?` এমন প্রপার্টি চিহ্নিত করে যা আর্গুমেন্ট নেয়, অর্থাৎ যেটিতে লেখা যায়। এখানে দুই প্রান্তেই সেটি আছে, তাই মান ইনপুটে নামে আর ফিরেও আসে।

## স্থানীয়করণযোগ্য একটি স্ট্রিং কি না বানানো পর্যন্ত স্রেফ স্ট্রিং

```typescript
		title() {
			return 'Greeting'
		}
```

এটি অনুবাদ করতে হলে আপনি একটি কি বানান, লিটারেলটি `$mol_locale.text` কলে বদলান, json লেখেন, আর প্রকল্পের বাকি জীবনভর দুটিকে হাতে হাতে মিলিয়ে রাখেন।

```tree
	title @ \Greeting
```

`@` স্ট্রিংটিকে স্থানীয়করণযোগ্য বলে চিহ্নিত করে, বাকিটা বিল্ড করে দেয়। বিল্ডের পরে `my/hello/-/web.locale=en.json`-এ থাকে:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

অনুবাদকরা অ্যাপের সব স্ট্রিংসহ একটি json ফাইল পান। আপনি একটি কি-ও লেখেন না।

## পুরো কম্পোনেন্ট

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

এটাই `hello.view.tree`। `hello.view.ts`-এ যা থাকে তা কখনো কাঠামো ছিলই না:

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

ক্লাসটি এখন `$.$my_hello` প্রসারিত করে, অর্থাৎ ট্রি যে বেসটি তৈরি করেছে, আর একটি প্রপার্টি ওভাররাইড করে। `$.$$` হলো এসব ওভাররাইডের নেমস্পেস।

## কম্পাইলার কী বের করে

`view.tree` নিজস্ব রানটাইমহীন একটি কোড জেনারেটর। মডিউলটি বিল্ড করে `my/hello/-view.tree/hello.view.tree.js` পড়ুন:

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

একই ফ্যাক্টরি, একই অ্যারো, `$mol_mem`-এর একই তিনটি কল, সঙ্গে দুটি লোকেল কি যেগুলির নাম আপনাকে দিতে হয়নি। বান্ডল ব্রাউজারে পৌঁছানোর আগেই ট্রি আর নেই।

এ কারণেই দুই ফরম্যাট নির্দ্বিধায় পাশাপাশি চলে। ট্রি দিয়ে লেখা কম্পোনেন্ট আর ক্লাস দিয়ে লেখা কম্পোনেন্ট একই ধরনের বস্তু বানায়, তাই একটি অ্যাপ দুটোই রাখতে পারে আর কেউ পার্থক্য টের পায় না।

## হাতে লেখা ক্লাস কোনো টুলকে যা দিতে পারে না

তৈরি হওয়া JS-এর পাশে কম্পাইলার `hello.view.tree.d.ts`-ও লেখে:

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

`$mol_type_enforce` জোড়াগুলি প্রতিটি বাঁধাইকে সেই প্রপার্টির সঙ্গে মিলিয়ে দেখে যেটিকে সেটি খাওয়াচ্ছে, ফলে টাইপের অমিল সন্তানের ভেতরে কোথাও নয়, বাঁধাইয়ের জায়গাতেই ধরা পড়ে। নিচের ক্লাস বডিটি কম্পোনেন্টের বাইরের পৃষ্ঠের যন্ত্রপাঠ্য বর্ণনা, আর সত্যিই সেটি পড়া হয়: উপরের লোকেল ফাইলটি একই পার্স থেকে বেরোয়, আর এই সাইটের [API পৃষ্ঠাগুলি](#!section=docs/page=api-mol-string) প্রতিটি মৌলিক কম্পোনেন্টের `.view.tree.d.ts` থেকে তৈরি হয়।

হাতে লেখা ক্লাস এর কিছুই দেয় না। সেটি কোড, আর পড়তে পারে কেবল TypeScript।

## আকারের হিসাব

উপরের Hello World: ৩১ লাইন TypeScript হয়ে যায় ৮ লাইন ট্রি আর ৮ লাইন TypeScript।

কম্পোনেন্ট যত বড়, ফারাক তত বড়। `$mol_app_users` — একটি সার্চ ফিল্ড, একটি তালিকা, চারটি বোতাম আর একটি স্ট্যাটাস লাইন — ট্রি হিসেবে ৩০ লাইন ও ৮৪০ অক্ষর, আর ক্লাস হিসেবে ১২৫ লাইন ও ৩০৪৬ অক্ষর। দুটি সংস্করণই উইকির [ফরম্যাট তুলনা](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats) পৃষ্ঠায় পুরোটা ছাপা আছে, তাই বিনিময়টা আপনি নিজেই ওজন করতে পারেন।

## কোনটি লিখবেন

দুটোই, কম্পোনেন্ট ধরে ধরে বেছে।

`view.ts` একটি সমর্থিত ফরম্যাট। ট্রি এটিতেই কম্পাইল হয়, আর এভাবে লেখা কম্পোনেন্ট অন্য যেকোনোটির মতোই আচরণ করে। কোনো কম্পোনেন্ট যখন মূলত যুক্তি আর সঙ্গে এক-দুটি সন্তান, তখন ক্লাসই সৎ পছন্দ আর ট্রি বিশেষ কিছু দেয় না।

ট্রি পোষায় সেখানে যেখানে আনুষ্ঠানিকতা বারবার ফিরে আসে: যেসব পর্দা মূলত কাঠামো, লম্বা সারি সারি বাঁধাই, আর যেকোনো কিছু যাতে অনুবাদকের দেখার মতো লেখা আছে। একটি ইউজার ইন্টারফেসের বেশির ভাগটাই তা-ই, আর সে কারণেই $mol-এর নিজের কম্পোনেন্টগুলি এভাবেই লেখা।

এরপর ট্রি ভাষাটাই — তালিকা, অভিধান, কি-যুক্ত সন্তান, আর উত্তরাধিকারে কম্পোনেন্ট বিশেষায়িত করা: **[ভিউ](#!section=docs/page=views)**।
