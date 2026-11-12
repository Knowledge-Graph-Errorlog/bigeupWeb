/// <reference types="vite/client" />

// 빌드 때 넣는 값 (.env.example). 모두 공개돼도 되는 값만 둔다 — 시크릿 키는 서버에만.
interface ImportMetaEnv {
  /** 백엔드 주소. 예: https://api.bigeup.com (개발 https://dev-api.bigeup.com) */
  readonly VITE_API_BASE_URL?: string
  /** 구글 웹 클라이언트 ID (서버 GOOGLE_CLIENT_IDS 에도 넣어야 한다) */
  readonly VITE_GOOGLE_CLIENT_ID?: string
  /** 애플 Services ID (서버 APPLE_CLIENT_IDS 에도) */
  readonly VITE_APPLE_SERVICES_ID?: string
  /** 카카오 REST API 키 — 인가 코드 요청의 client_id. 토큰 교환은 서버가 한다 */
  readonly VITE_KAKAO_REST_KEY?: string
  /** 네이버 로그인 Client ID. 서버 웹 로그인 주소와 NAVER_CLIENT_IDS 가 준비된 뒤 넣는다 (없으면 버튼이 안 보인다) */
  readonly VITE_NAVER_CLIENT_ID?: string
  /** "1"이면 개발용 로그인 버튼 (개발 서버 dev-login). 운영 빌드에는 넣지 않는다 */
  readonly VITE_DEV_LOGIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
