# $mol_link

`$mol_view` কে এক্সটেন্ড করে। [GitHub-এ সোর্স দেখুন](https://github.com/hyoo-ru/mam_mol/tree/master/link)

এই রেফারেন্স কম্পোনেন্টের টাইপড `.view.tree` ইন্টারফেস থেকে জেনারেট করা হয়।

## প্রপার্টি

| প্রপার্টি | অ্যাক্সেস | টাইপ |
|---|---|---|
| `uri_toggle` | পড়া | `string` |
| `hint` | পড়া | `string` |
| `hint_safe` | পড়া | `as 'hint'` |
| `target` | পড়া | `string` |
| `file_name` | পড়া | `string` |
| `current` | পড়া | `boolean` |
| `relation` | পড়া | `string` |
| `click` | পড়া / লেখা | `as 'event_click'` |
| `uri` | পড়া | `string` |
| `dom_name` | পড়া | `string` |
| `uri_off` | পড়া | `string` |
| `external` | পড়া | `boolean` |
| `attr` | পড়া | `({` |
| `sub` | পড়া | `readonly($mol_view_content)[]` |
| `arg` | পড়া | `Record<string, any>` |
| `event` | পড়া | `({` |
