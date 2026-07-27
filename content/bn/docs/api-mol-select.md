# $mol_select

`$mol_pick` কে এক্সটেন্ড করে। [GitHub-এ সোর্স দেখুন](https://github.com/hyoo-ru/mam_mol/tree/master/select)

এই রেফারেন্স কম্পোনেন্টের টাইপড `.view.tree` ইন্টারফেস থেকে জেনারেট করা হয়।

## প্রপার্টি

| প্রপার্টি | অ্যাক্সেস | টাইপ |
|---|---|---|
| `enabled` | পড়া | `boolean` |
| `filter_pattern` | পড়া / লেখা | `string` |
| `no_options_message` | পড়া | `string` |
| `nav_components` | পড়া | `readonly($mol_view)[]` |
| `nav_cycle` | পড়া / লেখা | `boolean` |
| `Nav` | পড়া | `$mol_nav` |
| `menu_content` | পড়া | `readonly($mol_view)[]` |
| `Menu` | পড়া | `$mol_list` |
| `Bubble_pane` | পড়া | `$mol_scroll` |
| `filter_hint` | পড়া | `string` |
| `dictionary` | পড়া / লেখা | `Record<string, any>` |
| `options` | পড়া | `readonly(string)[]` |
| `value` | পড়া / লেখা | `string` |
| `option_label_default` | পড়া | `string` |
| `No_options` | পড়া | `$mol_view` |
| `plugins` | পড়া | `readonly(any)[]` |
| `hint` | পড়া | `string` |
| `bubble_content` | পড়া | `readonly(any)[]` |
| `Filter` | পড়া | `$mol_search` |
| `Trigger_icon` | পড়া | `$mol_icon_dots_vertical` |
| `trigger_enabled` | পড়া | `as 'enabled'` |
