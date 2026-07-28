# Giper Baza

[Giper Baza](https://github.com/giper-dev/baza)는 **별도의 선택적 프로젝트**이며, $mol의 내장 구성 요소가 아닙니다. 제작자들은 이를 *충돌 없는 실시간 동기화를 갖춘 탈중앙화 고가용성 데이터베이스*라고 설명합니다. 중앙 서버 없이 로컬에 지속되고 클라이언트 사이에서 복제되는 CRDT 스토어로, 디지털 서명과 종단 간 암호화를 갖추고 있습니다. $mol 앱을 만드는 데는 결코 필요하지 않으며, 여러 클라이언트나 기기가 같은 실시간 데이터를 공유해야 할 때에만 사용하세요.

> 앱이 네트워크 없이도 계속 동작하기만 바라나요? 그것은 순수한 오프라인이며, $mol은 service worker로 처리합니다——[오프라인](#!section=docs/page=offline)을 참조하세요. Giper Baza는 그 다음 단계입니다. 한 클라이언트의 자산을 캐싱하는 것이 아니라 클라이언트 *사이에서* 데이터를 동기화합니다.

실제로 이것으로 데이터를 모델링하면, 엔티티는 평범한 반응형 속성처럼 보이고 복제는 그냥 일어납니다.

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
