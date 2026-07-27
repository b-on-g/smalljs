# データ取得

$mol でリモートデータを読み込むのは特別な API ではありません——非同期な値は、たまたま promise を返すリアクティブなプロパティにすぎません。ビューはそれを待ち、読み込み状態を表示し、解決したときに再描画します。

## 非同期なプロパティ

`@ $mol_mem` から promise を返し、他のどんな値とも同じように読みます。

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

`$mol_fetch` は応答が届くまでファイバーを中断します。保留の間、`users()` を読むどのビューも組み込みの読み込み状態を自動的に表示します——`isLoading` フラグは書きません。

## 結果の描画

解決したデータをそのままリストに束ねます。

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

promise が解決すると `users()` が更新され、`user_names()` が再計算され、リストが描画されます。コールバックも `useEffect` もありません。

## 再読み込み

それはただのリアクティブなセルなので、無効化することで再取得します。増やせるトークンに依存します。

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

`reload()` を呼ぶとトークンが変わり、`users()` が無効化され、再取得されます。

## エラー

リアクティブなプロパティの内部でのスローは最も近いビューへ伝播し、ビューは内容の代わりにエラー状態を描画します。自分で扱うには、捕捉してフォールバック値を返します。

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

`Promise` を再スローするのが、読み込み状態を流し続けつつ本当のエラーだけを捕捉するやり方です。

## 次へ

バックエンドなしにクライアント間で永続化・同期されるデータについては、[Giper Baza](#!section=docs/page=giper-baza) に進んでください。
