# 資料獲取

在 $mol 中載入遠端資料並不是一個特殊的 API——非同步值只是一個恰好回傳 promise 的響應式屬性。視圖會等待它，顯示載入狀態，並在它解析時重新渲染。

## 非同步屬性

從 `@ $mol_mem` 回傳一個 promise，然後像讀取任何其他值一樣讀取它：

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

`$mol_fetch` 會暫停纖程，直到回應到達。在它處於暫停狀態時，任何讀取 `users()` 的視圖都會自動顯示內建的載入狀態——你無需編寫 `isLoading` 旗標。

## 渲染結果

把解析後的資料直接綁定到列表中：

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

當 promise 解析時，`users()` 更新，`user_names()` 重新計算，列表隨之渲染。沒有回呼，沒有 `useEffect`。

## 重新載入

因為它只是一個響應式單元，你透過使其失效來重新獲取。依賴一個你可以自增的權杖：

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

呼叫 `reload()` 會改變權杖，從而使 `users()` 失效，從而重新獲取。

## 錯誤

在響應式屬性內部拋出會傳播到最近的視圖，視圖會渲染錯誤狀態而不是內容。若要自己處理，捕捉並回傳一個回退值：

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

重新拋出 `Promise` 是一種既讓載入狀態繼續流動、又只捕捉真正錯誤的方式。

## 下一步

對於無需後端就能在用戶端之間持久化並同步的資料，請繼續前往 [Giper Baza](#!section=docs/page=giper-baza)。
