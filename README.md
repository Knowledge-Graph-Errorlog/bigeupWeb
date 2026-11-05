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

## 참고
- 결제 버튼은 아직 "결제 준비 중이에요" 안내 창만 띄운다.
- Node 버전은 `package.json`의 `volta`로 고정한다(22.23.4).
  Volta 전역 pnpm이 Node 22.11에 묶여 있으면 `pnpm install` 때 빌드 도구(rolldown)의 바이너리가 빠져 빌드가 실패한다.
  그때는 `VOLTA_FEATURE_PNPM=1 pnpm install` 로 설치한다.
