# $mol_page

`$mol_view` কে এক্সটেন্ড করে। [GitHub-এ সোর্স দেখুন](https://github.com/hyoo-ru/mam_mol/tree/master/page)

এই রেফারেন্স কম্পোনেন্টের টাইপড `.view.tree` ইন্টারফেস থেকে জেনারেট করা হয়।

## প্রপার্টি

| প্রপার্টি | অ্যাক্সেস | টাইপ |
|---|---|---|
| `tabindex` | পড়া | `number` |
| `title_content` | পড়া | `readonly(any)[]` |
| `Title` | পড়া | `$mol_view` |
| `tools` | পড়া | `readonly($mol_view_content)[]` |
| `Tools` | পড়া | `$mol_view` |
| `head` | পড়া | `readonly(any)[]` |
| `Head` | পড়া | `$mol_view` |
| `body_scroll_top` | পড়া / লেখা | `ReturnType< as 'Body'['scroll_top'] >` |
| `body` | পড়া | `readonly($mol_view)[]` |
| `Body_content` | পড়া | `$mol_view` |
| `body_content` | পড়া | `readonly(any)[]` |
| `Body` | পড়া | `$mol_scroll` |
| `foot` | পড়া | `readonly($mol_view)[]` |
| `Foot` | পড়া | `$mol_view` |
| `dom_name` | পড়া | `string` |
| `attr` | পড়া | `({` |
| `sub` | পড়া | `readonly(any)[]` |
