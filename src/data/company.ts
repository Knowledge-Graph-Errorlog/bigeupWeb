// 사업자 정보 (사이트 하단·약관·카드사 심사). 사업자등록증·통신판매업 신고증과 글자까지 같게 쓴다.
// 토스페이먼츠 카드사 심사: 상호·대표자·사업자등록번호·통신판매업 신고번호·주소·전화가 하단에 모두 있어야 한다.
export const COMPANY = {
  name: '일로',
  service: '기출비급',
  ceo: '김정우',
  bizNo: '144-11-03318',
  mailOrderNo: '제2026-화성동탄-3936호',
  address: '경기도 화성시 동탄구 동탄대로 677-10, 2층 211호(영천동, 동탄 IT밸리)',
  // 고객센터 전화 (2026-11-12 확정). 이메일은 아직 정하지 않았다 — 정해지면 넣는다
  phone: '1551-9334' as string,
  email: '' as string,
  site: 'https://www.bigeup.com',
} as const

// 약관·개인정보 처리방침·환불 정책 시행일. 글을 바꾸면 날짜도 바꾸고 옛 글은 git 이력으로 남긴다.
export const LEGAL_EFFECTIVE_DATE = '2026년 11월 13일'

// 교재 이용 기간. 토스페이먼츠는 무형 상품의 제공 기간이 12개월을 넘으면 가맹이 안 된다.
export const USE_PERIOD = '결제일부터 12개월'

export const contactText = () =>
  [COMPANY.phone && `전화 ${COMPANY.phone}`, COMPANY.email && `이메일 ${COMPANY.email}`].filter(Boolean).join(' · ') ||
  '연락처 준비 중'

// 앱 안 AI 선생님 추가 사용량(약 100회 4,000원 등) 안내를 사이트에 보여 줄지.
// 토스페이먼츠 심사 동안은 끈다(2026-11-13): 토스가 "'충전' 형태 판매는 퀵오픈 적용 불가"라고 안내했고,
// 추가 사용량은 앱스토어 결제라 토스와 무관하지만 충전 판매로 읽힐 수 있다. 심사가 끝나면 true로 돌린다.
export const SHOW_AI_TOPUP = false
