# TypeScript에서 view.tree로

[시작하기](#!section=docs/page=getting-started)에서 작성한 컴포넌트는 평범한 TypeScript 클래스입니다. 컴파일되고, 실행되고, $mol 컴포넌트를 기술하는 공식 지원 방식 가운데 하나이기도 합니다.

동시에 그 파일은 컴포넌트가 하는 일과는 무관한 네 가지를 머릿속에 담아두라고 요구했습니다. 이 페이지는 그것들을 하나씩 꺼내어, 각각을 없애주는 `view.tree` 한 줄을 보여줍니다. 마지막에는 컴파일러가 생성하는 코드를 보여드립니다. 트리가 두 번째 런타임이 아니라는 것을 직접 확인할 수 있습니다. 트리가 만들어내는 것은 당신이 이미 쓴 바로 그 클래스입니다.

비교를 위해 그 파일을 다시 놓습니다.

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

## 자식은 당신이 만들고, 캐시도 당신이 한다

그중 여섯 줄이 팩토리입니다.

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

`@ $mol_mem`을 지워도 컴파일은 됩니다. 다만 더 이상 하나의 컴포넌트가 아닙니다. `this.Name() !== this.Name()`, 본문이 호출될 때마다 `new`를 실행하기 때문입니다. 프로퍼티를 마지막에 읽은 쪽이 이기고, 이전 인스턴스들은 쌓아둔 것을 그대로 안은 채 남고, 아무도 그것들을 정리하지 않습니다. $mol이 소유하는 것은 자신이 당신을 위해 캐시한 객체뿐이니까요.

`view.tree`에서 같은 자식은 한 줄입니다.

```tree
		<= Name $mol_string
```

대문자로 시작하는 이름은 그 프로퍼티가 컴포넌트를 담고 있다는 뜻이고, `<=`가 그것을 선언합니다. 데코레이터를 빠뜨리는 더 짧은 표기는 존재하지 않습니다. 팩토리를 쓰는 사람이 당신이 아니니까요.

## 데이터가 어느 쪽으로 흐르는지는 연산자가 말한다

자식에게 값을 먹인다는 것은 프로퍼티 하나씩 대입한다는 뜻입니다.

```typescript
			obj.sub = () => [ this.greeting() ]
```

움직이는 부품이 셋. 자식 객체, 프로퍼티 이름, 그리고 읽기를 지금이 아니라 나중에 일어나게 하는 화살표. 이 줄은 무엇과 무엇이 연결되었는지는 말하지만 어느 방향인지는 말하지 않습니다. 그것을 알려면 화살표 본문을 읽고 무언가 되돌아오는지 확인해야 합니다.

트리는 방향을 연산자에 담습니다.

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=`는 단방향, `greeting`에서 자식의 `sub`로. `/`는 리스트, `\`는 원시 문자열의 시작이고, `greeting \`은 기본값이 빈 문자열인 프로퍼티 선언입니다 — 나중에 TypeScript에서 재정의할 바로 그 값이죠.

## 양방향 바인딩은 키 하나 차이로 조용한 읽기 전용이 된다

입력 필드에는 양방향 데이터가 필요하고, 그 일을 하는 것이 `next` 파라미터입니다.

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

이제 `next`를 빼봅시다.

```typescript
			obj.value = () => this.name()
```

TypeScript는 이것을 받아들입니다. 인자가 없는 함수는 선택적 인자 하나를 기대하는 자리에 대입할 수 있으니 타입은 맞고 감사도 초록으로 남습니다. 필드는 그려지고, 올바른 값을 보여주고, 당신이 입력하는 모든 것을 조용히 무시합니다.

트리에서는 그런 반쪽짜리 연결을 쓸 수가 없습니다.

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>`는 양방향으로 묶습니다. 맨 `?`는 인자를 받는 프로퍼티, 곧 쓸 수 있는 프로퍼티라는 표시입니다. 여기서는 양쪽 끝에 모두 붙어 있으니 값이 필드로 내려가고 다시 올라옵니다.

## 지역화 가능한 문자열은 키로 만들기 전까지 그냥 문자열이다

```typescript
		title() {
			return 'Greeting'
		}
```

이것을 번역하려면 키를 직접 짓고, 리터럴을 `$mol_locale.text` 호출로 바꾸고, json을 쓰고, 프로젝트가 살아 있는 내내 둘을 손으로 맞춰야 합니다.

```tree
	title @ \Greeting
```

`@`가 문자열을 지역화 대상으로 표시하고, 나머지는 빌드가 합니다. 빌드 후 `my/hello/-/web.locale=en.json`에는 이렇게 들어 있습니다.

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

번역자는 앱의 모든 문자열이 담긴 json 파일을 받습니다. 당신은 키를 하나도 쓰지 않습니다.

## 컴포넌트 전체

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

이것이 `hello.view.tree`입니다. `hello.view.ts`에 남는 것은 애초에 구조가 아니었던 부분입니다.

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

클래스는 이제 트리가 생성한 베이스 `$.$my_hello`를 확장하고 프로퍼티 하나를 재정의합니다. `$.$$`는 그런 재정의를 위한 네임스페이스입니다.

## 컴파일러가 내놓는 것

`view.tree`는 자체 런타임이 없는 코드 생성기입니다. 모듈을 빌드하고 `my/hello/-view.tree/hello.view.tree.js`를 읽어보세요.

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

같은 팩토리, 같은 화살표, 같은 세 번의 `$mol_mem` 호출, 그리고 당신이 이름 붙이지 않아도 되었던 로케일 키 두 개. 번들이 브라우저에 닿을 무렵 트리는 이미 사라지고 없습니다.

두 형식이 자유롭게 섞이는 이유도 여기에 있습니다. 트리로 쓴 컴포넌트와 클래스로 쓴 컴포넌트는 같은 종류의 객체를 만들어내므로, 한 앱이 둘을 함께 품어도 아무도 차이를 알아채지 못합니다.

## 손으로 쓴 클래스가 도구에게 건네줄 수 없는 것

생성된 JS 옆에 컴파일러는 `hello.view.tree.d.ts`도 씁니다.

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

`$mol_type_enforce` 쌍이 각 바인딩을 그것이 먹이는 프로퍼티와 대조합니다. 덕분에 타입이 어긋나면 자식 내부 어딘가가 아니라 바인딩 그 자리에서 보고됩니다. 그 아래 클래스 본문은 컴포넌트 표면을 기계가 읽을 수 있게 적어둔 것이고, 실제로 읽는 쪽이 있습니다. 위의 로케일 파일도 같은 파싱에서 뽑히고, 이 사이트의 [API 페이지](#!section=docs/page=api-mol-string)도 각 기본 컴포넌트의 `.view.tree.d.ts`에서 생성됩니다.

손으로 쓴 클래스는 그중 무엇도 제공하지 않습니다. 그것은 코드이고, 읽을 수 있는 것은 TypeScript뿐입니다.

## 분량 이야기

위의 Hello World는 31줄의 TypeScript가 8줄의 트리와 8줄의 TypeScript가 됩니다.

컴포넌트가 커질수록 격차도 커집니다. `$mol_app_users`는 검색 필드, 리스트, 버튼 네 개, 상태 줄을 갖고 있는데 트리로는 30줄 840자, 클래스로는 125줄 3046자입니다. 두 버전 모두 위키의 [포맷 비교](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats) 페이지에 전문이 실려 있으니 교환의 무게는 직접 재보세요.

## 무엇을 쓸까

둘 다, 컴포넌트 단위로 골라서.

`view.ts`는 지원되는 형식입니다. 트리가 컴파일되어 도달하는 곳이 바로 그것이고, 그렇게 쓴 컴포넌트도 다른 것과 똑같이 동작합니다. 로직이 대부분이고 자식이 한둘뿐인 컴포넌트라면 클래스가 정직한 선택이고 트리가 주는 이득은 크지 않습니다.

트리가 값을 하는 곳은 의식이 반복되는 자리입니다. 대부분이 구조인 화면, 길게 이어지는 바인딩, 번역자가 보고 싶어 할 텍스트가 들어가는 모든 것. 사용자 인터페이스의 대부분이 그렇고, 그래서 $mol 자신의 컴포넌트도 이 방식으로 쓰여 있습니다.

다음은 트리 언어 자체입니다 — 리스트, 딕셔너리, 키가 붙은 자식, 그리고 상속을 통한 컴포넌트 특수화. **[뷰](#!section=docs/page=views)**
