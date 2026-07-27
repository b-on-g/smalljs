# ডেটা ফেচিং

$mol-এ রিমোট ডেটা লোড করা কোনো বিশেষ API নয়——একটি অ্যাসিঙ্ক মান শুধু একটি রিয়্যাক্টিভ প্রপার্টি যা কাকতালীয়ভাবে একটি promise রিটার্ন করে। ভিউ এটির জন্য অপেক্ষা করে, একটি লোডিং স্টেট দেখায়, এবং এটি রিজলভ হলে পুনরায় রেন্ডার করে।

## একটি অ্যাসিঙ্ক প্রপার্টি

একটি `@ $mol_mem` থেকে একটি promise রিটার্ন করুন এবং এটিকে অন্য যেকোনো মানের মতোই পড়ুন:

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

`$mol_fetch` রেসপন্স না আসা পর্যন্ত ফাইবার সাসপেন্ড করে। যতক্ষণ এটি পেন্ডিং, `users()` পড়ে এমন যেকোনো ভিউ স্বয়ংক্রিয়ভাবে বিল্ট-ইন লোডিং স্টেট দেখায়——আপনি কোনো `isLoading` ফ্ল্যাগ লেখেন না।

## ফলাফল রেন্ডার করা

রিজলভ হওয়া ডেটা সরাসরি একটি লিস্টে বাঁধুন:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

promise রিজলভ হলে `users()` আপডেট হয়, `user_names()` পুনরায় গণনা হয়, আর লিস্ট রেন্ডার হয়। কোনো কলব্যাক নেই, কোনো `useEffect` নেই।

## পুনরায় লোড করা

যেহেতু এটি শুধু একটি রিয়্যাক্টিভ সেল, আপনি এটিকে অকার্যকর করে পুনরায় ফেচ করেন। এমন একটি টোকেনের ওপর নির্ভর করুন যা আপনি বাড়াতে পারেন:

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

`reload()` কল করলে টোকেন বদলায়, যা `users()` কে অকার্যকর করে, যা পুনরায় ফেচ করে।

## ত্রুটি

একটি রিয়্যাক্টিভ প্রপার্টির ভেতরে throw নিকটতম ভিউতে ছড়িয়ে পড়ে, যা কনটেন্টের বদলে একটি এরর স্টেট রেন্ডার করে। নিজে সামলাতে হলে, ধরুন এবং একটি ফলব্যাক মান রিটার্ন করুন:

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

একটি `Promise` পুনরায় throw করা হলো লোডিং স্টেটকে বইতে দেওয়ার পাশাপাশি শুধু আসল ত্রুটিগুলো ধরার উপায়।

## পরবর্তী

কোনো ব্যাকএন্ড ছাড়াই ক্লায়েন্টের মধ্যে টিকে থাকা ও সিঙ্ক হওয়া ডেটার জন্য, [Giper Baza](#!section=docs/page=giper-baza)-তে এগিয়ে যান।
