# Giper Baza

Giper Baza 是 $mol 的本地优先数据层：一个在本地持久化并在客户端之间自动同步的 CRDT 存储。你把数据建模为实体；读取和写入看起来就像普通的响应式属性，而复制自然而然地发生。

> 本页介绍 API 的形态。Giper Baza 是一个大主题——请把这当作一张地图，而不是完整的疆域。

## 定义一个实体

实体是一个**纯模式**——一组带类型的字段。把行为放在外面；在你的视图里做读取和写入。

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

每个字段都是一个**原子**——一个带类型值的已同步单元。

## 读取与写入

获取存储，取到一个实体列表，并对它们做响应式的映射：

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

读取 `Done()?.val()` 会得到当前值；写入 `Done(null)!.val(next)` 会设置它。任何读取该原子的视图都会在它——或远端对等方——改变它时重新渲染。

## 创建与删除

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

## 同步是自动的

没有任何东西需要配置。更改会实时复制到其他客户端，同样的数据在离线时也可用——连接恢复时存储会自我调和。因为写入是 CRDT 合并，来自不同设备的并发编辑会无冲突地组合在一起。

## 接下来去哪儿？

现在你已经拥有完整的脉络：[视图](#!section=docs/page=views)、[状态](#!section=docs/page=state)、[路由](#!section=docs/page=routing)、[数据获取](#!section=docs/page=data)以及本地优先存储。在[游乐场](#!section=playground)里把它们全都试一试。
