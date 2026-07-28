# Giper Baza

[Giper Baza](https://github.com/giper-dev/baza) 是一个**独立的、可选的项目**——并不是 $mol 的内置组成部分。其作者将它描述为*一个具有无冲突实时同步的去中心化高可用数据库*：一个在本地持久化、无需中心服务器即可在客户端之间复制的 CRDT 存储，带有数字签名和端到端加密。构建 $mol 应用从不需要它；只有当多个客户端或设备必须共享同一份实时数据时才使用它。

> 只是想让应用在没有网络时也能继续工作？那是纯粹的离线，$mol 用一个 service worker 来处理——参见 [离线](#!section=docs/page=offline)。Giper Baza 更进一步：在客户端*之间*同步数据，而不是缓存单个客户端的资源。

当你确实用它来建模数据时，实体看起来就像普通的响应式属性，而复制自然而然地发生。

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
