# $mol_pick

`$mol_pop` কে এক্সটেন্ড করে। [GitHub-এ সোর্স দেখুন](https://github.com/hyoo-ru/mam_mol/tree/master/pick)

এই রেফারেন্স কম্পোনেন্টের টাইপড `.view.tree` ইন্টারফেস থেকে জেনারেট করা হয়।

## প্রপার্টি

| প্রপার্টি | অ্যাক্সেস | টাইপ |
|---|---|---|
| `trigger_enabled` | পড়া | `boolean` |
| `trigger_content` | পড়া | `readonly($mol_view_content)[]` |
| `hint` | পড়া | `string` |
| `Trigger` | পড়া | `$mol_check` |
| `event` | পড়া | `({` |
| `Anchor` | পড়া | `as 'Trigger'` |
