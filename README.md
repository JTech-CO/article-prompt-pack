# Article Prompt Pack

플랫폼별 아티클 작성 규격을 하나의 URL로 배포하는 프롬프트 팩입니다. 프롬프트 전문을 매번 붙여넣지 않고, `pack.md` 링크와 소재만 전달하면 어느 AI에서든 동일한 규격으로 결과물이 나옵니다.

지원 플랫폼: 블로그 · 쓰레드(Threads) · X 일반(분할 스레드) · X 프리미엄(장문) · 긱뉴스(Geek News)

## 엔트리포인트

| 용도 | URL |
|---|---|
| 기본 (raw, 즉시 반영) | `https://raw.githubusercontent.com/JTech-CO/article-prompt-pack/main/pack.md` |
| CDN (jsDelivr, 안정적) | `https://cdn.jsdelivr.net/gh/JTech-CO/article-prompt-pack@main/pack.md` |
| 버전 고정 | `https://cdn.jsdelivr.net/gh/JTech-CO/article-prompt-pack@v1.0.0/pack.md` |

jsDelivr의 `@main` 경로는 일정 시간 캐시됩니다. 방금 수정한 내용을 바로 쓰려면 raw URL을 사용합니다.

## 사용법 1 — URL 호출 (권장)

웹 접근이 가능한 AI(Claude, ChatGPT, Gemini, Grok 등)에 아래 형식으로 전달합니다.

```
아래 문서를 읽고 그 실행 규격을 100% 준수해 작성합니다.
https://raw.githubusercontent.com/JTech-CO/article-prompt-pack/main/pack.md

플랫폼: 블로그
옵션: 속보, 키워드
분야: 자동차
독자층: 전 연령층
원문 링크: https://...

초안:
(초안 본문 또는 링크)
```

`플랫폼` 값만 바꾸면 동일 소재로 다른 결과물이 나옵니다. `플랫폼: 전체`는 5종을 한 번에 출력합니다.

## 사용법 2 — 붙여넣기 (웹 접근이 막힌 환경)

`pack.md` 전문을 복사해 대화 맨 앞에 붙이고, 그 아래에 `templates/input.md` 형식으로 소재를 적습니다. 전체가 4천 자 이하라 컨텍스트 부담이 적습니다.

## 사용법 3 — Claude Code 스킬

`skill/SKILL.md`를 `~/.claude/skills/article-pack/SKILL.md`로 복사하면 "블로그 글 써줘" 같은 요청에서 자동 트리거됩니다.

## 사용법 4 — 커스텀 인스트럭션 고정

ChatGPT의 Custom Instructions, Claude의 Project 지침, Gemini의 Gem 설정에 `pack.md` 전문을 한 번 넣어두면 이후에는 소재만 던져도 동작합니다.

## 구조

```
pack.md              # 배포용 단일 실행 규격 (빌드 산출물, 직접 수정하지 말 것)
build.js             # 모듈 → pack.md 빌드 스크립트
manifest.json        # 모듈 인덱스 (빌드 산출물)
core/core.md         # 전 플랫폼 공통 규칙
platforms/           # 플랫폼별 분량·구조·어체
options/             # 평서체 / 속보 / 키워드 / 검증
parts/               # 실행 규칙, 일괄 출력, 점검, 입력 형식
templates/input.md   # 소재 입력 템플릿
skill/SKILL.md       # Claude Code 스킬 정의
```

## 수정 방법

`platforms/`, `options/`, `core/` 안의 파일만 고친 뒤 빌드합니다. `pack.md`를 직접 고치면 다음 빌드에서 덮어씌워집니다.

```bash
node build.js
git commit -am "update: 블로그 분량 조건"
git push
```

푸시 즉시 raw URL에 반영되므로, 사용 중인 프롬프트를 바꿀 필요가 없습니다.

## 플랫폼 제약 요약

| 플랫폼 | 상한 | 목표 분량 | 어체 |
|---|---|---|---|
| 블로그 | 없음 | 900~1000자 | 존대체 |
| 쓰레드 | 500자 | 400~500자 | 존대체(구어 밀도) |
| X 일반 | 한글 약 140자 | 130자 × 3~5편 | 존대체 |
| X 프리미엄 | 장문 허용 | 700~800자 | 존대체 |
| 긱뉴스 | 없음 | 불릿 3~6개 | 개조식 |

## 라이선스

MIT
