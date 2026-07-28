# কুকবুক

প্রায় প্রতিটি অ্যাপে আসা কাজের জন্য সংক্ষিপ্ত, কপি করে ব্যবহারযোগ্য রেসিপি। প্রতিটিই আসল $mol কোড——নামগুলো মিলিয়ে নিয়ে বসিয়ে দিন।

## দ্বিমুখী বাউন্ড ইনপুট

কোনো হ্যান্ডলার তার না জুড়েই একটি ইনপুট আর একটি ডিরাইভড ভ্যালুকে সিঙ্কে রাখুন: `<=>` দুই দিকেই বাইন্ড করে, আর যে কম্পিউটেড প্রপার্টি সেই ভ্যালু পড়ে সেটি নিজে থেকেই আপডেট হয়।

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

## যোগ ও মুছে ফেলা যায় এমন তালিকা

সংগ্রহটিকে একটি রিয়্যাক্টিভ প্রপার্টিতে রাখুন এবং অ্যাকশন থেকে অপরিবর্তনীয়ভাবে (immutably) আবার লিখুন। কীযুক্ত `Row*` প্রতিটি আইটেমের জন্য একটি সারি রেন্ডার করে, আর——[ভার্চুয়ালাইজড রেন্ডারিং](#!section=docs/page=rendering)-এর কল্যাণে——কেবল দৃশ্যমান সারিগুলোই তৈরি হয়।

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

## লোডিং ও এরর স্টেট সহ ডেটা ফেচ

অ্যাসিঙ্ক ভ্যালু কেবল একটি রিয়্যাক্টিভ প্রপার্টি যা একটি promise ফেরত দেয়। রিকোয়েস্ট চলাকালীন `$mol_fetch` ফাইবারকে স্থগিত রাখে, তাই যে ভিউ এটি পড়ে সেটি বিল্ট-ইন লোডিং স্টেট দেখায়——আর ব্যর্থ রিকোয়েস্ট এরর স্টেট হিসেবে ভেসে ওঠে। আপনি কোনো `isLoading` ফ্ল্যাগ বা `try`/`catch` লেখেন না।

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

## লোকাল স্টেট পার্সিস্ট করা

যে স্টেট রিলোড পেরিয়ে টিকে থাকা উচিত কিন্তু URL এলোমেলো করা উচিত নয়——গুটানো সাইডবার, খসড়া, একটি পছন্দ——তার জন্য `$mol_state_local` ব্যবহার করুন। যেকোনো রিয়্যাক্টিভ প্রপার্টির মতোই একই গেটার/সেটার আকৃতি এর, আর এটি `localStorage`-এ সংরক্ষণ করে।

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## রুট প্যারামিটার পড়া ও লেখা

কোনো ভ্যালুকে শেয়ারযোগ্য ও বুকমার্কযোগ্য করতে বরং `$mol_state_arg` দিয়ে তার ভিত্তি গড়ুন। পড়লে বর্তমান URL ভ্যালু ফেরত আসে; একটি আর্গুমেন্ট পাস করলে নেভিগেট হয়, আর ব্রাউজারের ব্যাক বাটন আপনার হয়ে সেলটি আপডেট করে দেয়।

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link` একই আর্গুমেন্ট ঘোষণামূলকভাবে সেট করতে পারে, ফলে সাধারণ একটি ক্লিকই কোনো হ্যান্ডলার ছাড়া নেভিগেট করে:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

রুট ভ্যালু অনুযায়ী স্ক্রিন বদলানো নিয়ে দেখুন [রাউটিং](#!section=docs/page=routing)।

## স্বয়ংক্রিয় লাইট/ডার্ক থিম যোগ করা

`$mol_theme_auto`-কে একটি [প্লাগইন](#!section=docs/page=plugins) হিসেবে জুড়ুন——এটি এলিমেন্টহীন একটি কম্পোনেন্ট, `plugins /`-এর নিচে তালিকাভুক্ত করা হয়। এটি OS-এর পছন্দ অনুসরণ করে হোস্টের সাবট্রিতে লাইট বা ডার্ক থিম প্রয়োগ করে, আপনার লেআউটকে কিছু দিয়ে না মুড়েই।

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## পরবর্তী

লাইভ চেষ্টা করতে চান? [প্লেগ্রাউন্ড](#!section=playground) খুলে যেকোনো রেসিপি পেস্ট করুন, অথবা একটি পূর্ণ অ্যাপ বানাতে [শুরু করা](#!section=docs/page=getting-started) ধাপে ধাপে করুন।
