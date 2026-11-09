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
| `/checkout/:id` | 주문·결제 |

- 상품·가격은 `src/data/products.ts`, 색은 `src/index.css`의 `@theme`, 로고는 `src/components/Logo.tsx` 한 곳에서 바꾼다 (지금은 모두 임시).
- 배포: `main`에 머지하면 Vercel이 자동 배포한다 (https://bigeup-web.vercel.app). PR마다 미리보기 주소도 생긴다.
- 주소가 여러 개인 SPA라 `vercel.json`에서 모든 경로를 `index.html`로 돌려준다.

## 참고
- 결제하기·3문제 맛보기 버튼은 아직 "준비 중" 안내 창만 띄운다.
- Node 버전은 `package.json`의 `volta`로 고정한다(22.23.4).
  Volta 전역 pnpm이 Node 22.11에 묶여 있으면 `pnpm install` 때 빌드 도구(rolldown)의 바이너리가 빠져 빌드가 실패한다.
  그때는 `VOLTA_FEATURE_PNPM=1 pnpm install` 로 설치한다.
