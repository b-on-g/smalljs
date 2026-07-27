# Giper Baza

Giper Baza 是 $mol 的本地優先資料層：一個在本地持久化並在用戶端之間自動同步的 CRDT 儲存。你把資料建模為實體；讀取和寫入看起來就像普通的響應式屬性，而複製自然而然地發生。

> 本頁介紹 API 的形態。Giper Baza 是一個大主題——請把這當作一張地圖，而不是完整的疆域。

## 定義一個實體

實體是一個**純模式**——一組帶型別的欄位。把行為放在外面；在你的視圖裏做讀取和寫入。

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

每個欄位都是一個**原子**——一個帶型別值的已同步單元。

## 讀取與寫入

獲取儲存，取到一個實體列表，並對它們做響應式的映射：

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

讀取 `Done()?.val()` 會得到當前值；寫入 `Done(null)!.val(next)` 會設定它。任何讀取該原子的視圖都會在它——或遠端對等方——改變它時重新渲染。

## 建立與刪除

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

## 同步是自動的

沒有任何東西需要設定。更改會即時複製到其他用戶端，同樣的資料在離線時也可用——連線恢復時儲存會自我調和。因為寫入是 CRDT 合併，來自不同裝置的並行編輯會無衝突地組合在一起。

## 接下來去哪裏？

現在你已經擁有完整的脈絡：[視圖](#!section=docs/page=views)、[狀態](#!section=docs/page=state)、[路由](#!section=docs/page=routing)、[資料獲取](#!section=docs/page=data)以及本地優先儲存。在[遊樂場](#!section=playground)裏把它們全都試一試。
