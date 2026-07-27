# Giper Baza

Giper Baza হলো $mol-এর লোকাল-ফার্স্ট ডেটা স্তর: একটি CRDT স্টোর যা স্থানীয়ভাবে টিকে থাকে এবং ক্লায়েন্টের মধ্যে স্বয়ংক্রিয়ভাবে সিঙ্ক হয়। আপনি ডেটাকে এনটিটি হিসেবে মডেল করেন; পড়া ও লেখা সাধারণ রিয়্যাক্টিভ প্রপার্টির মতোই দেখায়, আর রেপ্লিকেশন এমনিই ঘটে।

> এই পৃষ্ঠা API-এর আকৃতি পরিচয় করায়। Giper Baza একটি বড় বিষয়——এটিকে একটি মানচিত্র হিসেবে ধরুন, সম্পূর্ণ ভূখণ্ড নয়।

## একটি এনটিটি সংজ্ঞায়িত করুন

একটি এনটিটি হলো একটি **বিশুদ্ধ স্কিমা**——টাইপড ফিল্ডের একটি সেট। আচরণ এর বাইরে রাখুন; পড়া ও লেখা আপনার ভিউতে করুন।

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

প্রতিটি ফিল্ড একটি **অ্যাটম**——একটি টাইপড মানসহ একটি সিঙ্ক করা সেল।

## পড়া ও লেখা

স্টোরটি নিন, এনটিটির একটি তালিকায় পৌঁছান, এবং সেগুলোর ওপর রিয়্যাক্টিভভাবে ম্যাপ করুন:

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

`Done()?.val()` পড়লে বর্তমান মান পাওয়া যায়; `Done(null)!.val(next)` লিখলে তা সেট হয়। ওই অ্যাটম পড়ে এমন যেকোনো ভিউ পুনরায় রেন্ডার হয় যখন এটি——বা একটি রিমোট পিয়ার——এটি বদলায়।

## তৈরি ও অপসারণ

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

## সিঙ্ক স্বয়ংক্রিয়

কনফিগার করার কিছু নেই। পরিবর্তনগুলো রিয়েল টাইমে অন্য ক্লায়েন্টে রেপ্লিকেট হয়, এবং একই ডেটা অফলাইনেও পাওয়া যায়——সংযোগ ফিরে এলে স্টোর নিজে থেকে মিলিয়ে নেয়। যেহেতু লেখাগুলো CRDT মার্জ, ভিন্ন ভিন্ন ডিভাইস থেকে একযোগে করা এডিট কোনো দ্বন্দ্ব ছাড়াই একত্র হয়।

## এরপর কোথায়?

এখন আপনার হাতে পুরো চাপটি আছে: [ভিউ](#!section=docs/page=views), [স্টেট](#!section=docs/page=state), [রাউটিং](#!section=docs/page=routing), [ডেটা ফেচিং](#!section=docs/page=data), এবং লোকাল-ফার্স্ট স্টোরেজ। এই সবকিছু [প্লেগ্রাউন্ডে](#!section=playground) চেষ্টা করে দেখুন।
