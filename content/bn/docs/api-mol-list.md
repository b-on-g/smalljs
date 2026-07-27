# $mol_list

`$mol_view` কে এক্সটেন্ড করে। [GitHub-এ সোর্স দেখুন](https://github.com/hyoo-ru/mam_mol/tree/master/list)

এই রেফারেন্স কম্পোনেন্টের টাইপড `.view.tree` ইন্টারফেস থেকে জেনারেট করা হয়।

## প্রপার্টি

| প্রপার্টি | অ্যাক্সেস | টাইপ |
|---|---|---|
| `gap_before` | পড়া | `number` |
| `Gap_before` | পড়া | `$mol_view` |
| `Empty` | পড়া | `$mol_view` |
| `gap_after` | পড়া | `number` |
| `Gap_after` | পড়া | `$mol_view` |
| `rows` | পড়া | `readonly($mol_view)[]` |
| `render_visible_only` | পড়া | `boolean` |
| `render_over` | পড়া | `number` |
| `sub` | পড়া | `as 'rows'` |
| `view_window_shift` | পড়া / লেখা | `number` |
| `view_window` | পড়া | `readonly(any)[]` |
