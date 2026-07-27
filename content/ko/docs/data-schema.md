# 데이터 스키마

네트워크 요청에서 돌아오는 데이터는 `any`입니다——TypeScript는 여러분의 캐스트를 믿지만, 서버는 다른 것을 보낼 수 있습니다. $mol은 신뢰할 수 없는 JSON을 타입이 있고 검증된 값으로 바꾸고, 형태가 틀리면 읽을 수 있는 경로와 함께 크게 실패하는 두 개의 작은 런타임 스키마 라이브러리를 제공합니다. 데이터가 앱에 들어오는 바로 그곳, 대개 [fetch](#!section=docs/page=data) 응답에서 사용하세요.

## 두 라이브러리

- **`$mol_data`**——간결한 함수형 파서(zod 스타일). 작은 파싱 함수를 조합하고, 그 결과를 값에 대해 호출합니다.
- **`$mol_schema`**——기본값을 갖는 클래스 기반 스키마. 레코드 클래스를 확장하면 `.guard()`, `.cast()`, `.check()`, 그리고 `.default`를 얻습니다.

둘 다 런타임에 검증하고 정적 타입을 여러분을 위해 추론합니다. 빠른 DTO와 (역)직렬화에는 `$mol_data`를, 기본값과 느슨한 캐스팅을 갖춘 이름 있는 재사용 가능한 스키마 클래스를 원할 때는 `$mol_schema`를 택하세요.

## $mol_data

형태를 필드 파서의 레코드로 기술하세요.

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

날 것의 값에 대해 호출하세요. 유효한 데이터는 완전히 타입이 붙은 채 통과하고, 잘못된 데이터는 실패한 정확한 경로를 지목하는 `$mol_data_error`를 던집니다.

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

추론된 타입은 `typeof UserDTO.Value`로 어디서든 재사용하세요.

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

구성 요소로는 `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant`(여러 타입 중 하나), `$mol_data_array`, `$mol_data_dict`, `$mol_data_record`가 있습니다. `$mol_data_pipe`는 파싱된 값을 변환으로 넣습니다——예를 들어 ISO 문자열을 `$mol_time_moment`로——이는 (역)직렬화도 겸합니다.

## $mol_schema

스키마를 레코드를 확장하는 클래스로 정의하세요.

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

그러면 적용하는 세 가지 방법과, 바로 쓸 수 있는 기본값을 갖게 됩니다.

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

리프 스키마로는 `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])`, `$mol_schema_pattern( /re/ )`가 있습니다. 이들을 `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )`(값, `null`, 또는 `undefined`), `$mol_schema_some([ ... ])`(유니온), `$mol_schema_partial({ ... })`로 조합하세요. 다른 레코드의 필드는 `...Base.Fields`로 펼치세요.

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## fetch 응답 검증

데이터가 도착하는 바로 그곳, 그것을 가져오는 반응형 속성 안에서 파싱하세요.

```typescript
namespace $.$$ {
	export class $my_page extends $.$my_page {
		@ $mol_mem
		user() {
			const json = $mol_fetch.json( 'https://api.example.com/me' )
			return $my_user.guard( json ) // typed $my_user, or throws on bad data
		}
	}
}
```

서버가 잘못된 형태를 보내면 `guard`가 던지고, 실패는 다른 어떤 [fetch 오류](#!section=docs/page=data)와도 똑같이 뷰에서 오류 상태로 드러나므로, 반쯤 망가진 데이터를 결코 렌더링하지 않습니다. 합리적인 기본값이 오류보다 나을 때는 `guard`보다 `cast`를 택하세요.

## 다음

실행할 백엔드 없이 클라이언트 사이에서 타입이 있는 데이터를 저장하고 동기화하려면 [Giper Baza](#!section=docs/page=giper-baza)로 계속하세요——그 엔티티는 바로 같은 스키마 개념 위에 세워져 있습니다.
