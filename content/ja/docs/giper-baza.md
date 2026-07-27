# Giper Baza

Giper Baza は $mol のローカルファーストなデータ層です。ローカルに永続化し、クライアント間で自動的に同期する CRDT ストアです。データはエンティティとしてモデル化します。読み書きはふつうのリアクティブなプロパティのように見え、複製はただ起こります。

> このページは API の形を紹介します。Giper Baza は大きなトピックです——これは地図であって、領土のすべてではないと考えてください。

## エンティティを定義する

エンティティは**純粋なスキーマ**です——型付きフィールドの集合です。振る舞いは外に出し、読み書きはビューの中で行ってください。

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

各フィールドは**アトム**です——型付きの値を持つ、同期されたセルです。

## 読み書き

ストアを取得し、エンティティのリストに到達し、それらをリアクティブにマップします。

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

`Done()?.val()` を読むと現在の値が得られ、`Done(null)!.val(next)` を書くとそれを設定します。そのアトムを読むどのビューも、自分——あるいは遠隔のピア——がそれを変えると再描画されます。

## 作成と削除

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

## 同期は自動

設定するものは何もありません。変更はリアルタイムで他のクライアントへ複製され、同じデータはオフラインでも利用でき——接続が戻るとストアが調停します。書き込みは CRDT のマージなので、異なるデバイスからの同時編集は競合なく結合されます。

## 次はどこへ？

これで全体の弧がそろいました。[ビュー](#!section=docs/page=views)、[状態](#!section=docs/page=state)、[ルーティング](#!section=docs/page=routing)、[データ取得](#!section=docs/page=data)、そしてローカルファーストなストレージ。すべてを[プレイグラウンド](#!section=playground)で試してみてください。
