# website
Knowledge-Graph-Errorlog 웹 페이지 — 기출비급 소개 메인페이지

React + Vite + Tailwind CSS v4, 패키지 매니저는 pnpm.

## 실행

```sh
pnpm install
pnpm dev       # 개발 서버
pnpm build     # dist/ 에 배포용 빌드
pnpm preview   # 빌드 결과 미리보기
```

## 페이지
| 주소 | 내용 |
|---|---|
| `/` | 랜딩 (카피 4판) |
| `/pass` | 기출비급패스 — 과목 탭 + 상품 진열 |
| `/pass/:id` | 상품 상세 (`pass-3`, `prob`, `algebra`, `calc`) |
| `/checkout/:id` | 주문·결제 — 로그인 필요, 서버가 주문(금액)을 만들고 토스페이먼츠 결제위젯을 연다 |
| `/checkout/success` · `/checkout/fail` | 결제창에서 돌아오는 곳. 성공이면 서버가 승인하고 교재가 열린다 |
| `/login` · `/signup` · `/auth/kakao/callback` · `/auth/naver/callback` · `/auth/google/callback` | 앱과 같은 소셜 로그인(카카오·구글·애플, 네이버는 숨김), 웹 가입 마무리(약관·닉네임) |
| `/me` | 내 정보 — 계정(닉네임·응시·로그인 방법), 가진 교재, 선택 동의, 로그아웃 (보기만. 바꾸기·계정 삭제는 앱에서) |
| `/terms` · `/privacy` · `/refund` | 이용약관·개인정보 처리방침·환불·배송 정책 (앱도 이 주소를 연다). 법률 검토 전 초안 |

- 상품·가격은 `src/data/products.ts`, 색은 `src/index.css`의 `@theme`, 로고는 `src/components/Logo.tsx` 한 곳에서 바꾼다 (지금은 모두 임시).
- 배포: `main`에 머지하면 Vercel이 자동 배포한다 (https://www.bigeup.com — `bigeup-web.vercel.app`은 여기로 보낸다. 로그인·서버 호출은 www.bigeup.com만 허용돼 있다). PR마다 미리보기 주소도 생긴다.
- 주소가 여러 개인 SPA라 `vercel.json`에서 모든 경로를 `index.html`로 돌려준다.

## 결제·로그인 설정 (`.env.example`)
- `VITE_API_BASE_URL`: 백엔드 주소. 결제 API는 backend `docs/결제-API.md`, 로그인은 `docs/로그인-API.md`
- `VITE_GOOGLE_CLIENT_ID` · `VITE_APPLE_SERVICES_ID` · `VITE_KAKAO_REST_KEY`: 없으면 그 로그인 버튼이 안 보인다. 서버 `GOOGLE_CLIENT_IDS` · `APPLE_CLIENT_IDS` · `KAKAO_APP_KEYS`(+`KAKAO_REST_API_KEY`, `KAKAO_WEB_REDIRECT_URIS`)와 짝을 맞춘다
- `VITE_DEV_LOGIN=1`: 개발 서버 전용 로그인 버튼 (운영 빌드에 넣지 않는다)
- 운영 빌드 기본값은 `.env.production`에 있다 (서버 주소 = 개발 서버, 구글 클라이언트 ID). Vercel 환경 변수에 같은 이름을 넣으면 그 값이 이긴다
- 토스 클라이언트 키는 넣지 않는다 — 서버가 주문과 함께 준다 (서버 시크릿 키와 짝). 시크릿 키는 웹에 절대 두지 않는다
- 사업자 정보·이용 기간은 `src/data/company.ts` 한 곳

## 참고
- 3문제 맛보기 버튼은 아직 "준비 중" 안내 창만 띄운다.
- Node 버전은 `package.json`의 `volta`로 고정한다(22.23.4).
  Volta 전역 pnpm이 Node 22.11에 묶여 있으면 `pnpm install` 때 빌드 도구(rolldown)의 바이너리가 빠져 빌드가 실패한다.
  그때는 `VOLTA_FEATURE_PNPM=1 pnpm install` 로 설치한다.
