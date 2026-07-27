# Giper Baza

Giper Baza는 $mol의 로컬 우선 데이터 계층입니다. 로컬에 지속되고 클라이언트 사이에서 자동으로 동기화되는 CRDT 스토어입니다. 데이터를 엔티티로 모델링하며, 읽기와 쓰기는 평범한 반응형 속성처럼 보이고, 복제는 그냥 일어납니다.

> 이 페이지는 API의 형태를 소개합니다. Giper Baza는 큰 주제입니다——이것을 지도로 여기세요, 영토 전체가 아니라.

## 엔티티 정의하기

엔티티는 **순수 스키마**입니다——타입이 있는 필드의 집합입니다. 동작은 바깥에 두세요; 읽기와 쓰기는 뷰에서 하세요.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

각 필드는 **아톰**입니다——타입이 있는 값을 가진, 동기화된 셀입니다.

## 읽기와 쓰기

스토어를 얻고, 엔티티 리스트에 도달하여, 그것들을 반응형으로 매핑하세요.

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

`Done()?.val()`을 읽으면 현재 값이 나오고, `Done(null)!.val(next)`을 쓰면 그것을 설정합니다. 그 아톰을 읽는 어떤 뷰든, 자신——또는 원격 피어——이 그것을 바꾸면 다시 렌더링됩니다.

## 생성과 제거

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

## 동기화는 자동입니다

설정할 것이 아무것도 없습니다. 변경은 다른 클라이언트로 실시간 복제되고, 같은 데이터가 오프라인에서도 사용 가능합니다——연결이 돌아오면 스토어가 조정됩니다. 쓰기가 CRDT 병합이므로, 서로 다른 기기의 동시 편집은 충돌 없이 결합됩니다.

## 다음은 어디로?

이제 전체 흐름이 갖춰졌습니다: [뷰](#!section=docs/page=views), [상태](#!section=docs/page=state), [라우팅](#!section=docs/page=routing), [데이터 가져오기](#!section=docs/page=data), 그리고 로컬 우선 저장소. 이 모두를 [플레이그라운드](#!section=playground)에서 시도해 보세요.
