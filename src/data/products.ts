import { USE_PERIOD } from './company'

export type Subject = 'prob' | 'algebra' | 'calc'

export type Product = {
  id: string
  kind: 'pass' | 'single'
  name: string
  badge: string
  subjects: Subject[]
  price: number
  aiQuestions: number
  perks: string[]
}

export const SUBJECT_NAME: Record<Subject, string> = {
  prob: '확률과 통계',
  algebra: '대수',
  calc: '미적분Ⅰ',
}

/**
 * 구매 페이지의 분류. 2028학년도 수능(2022 개정 교육과정, 선택과목 없는 통합형)의 영역과 출제 과목 그대로다.
 * ready가 false인 과목은 교재가 아직 없어 '준비 중'으로 보인다. 교재가 나오면 ready를 true로 바꾼다.
 * 세부 과목이 따로 없는 영역(영어, 한국사)은 subs를 비워 둔다.
 */
export type SubCategory = { key: string; name: string; ready: boolean }
export type Area = { key: string; name: string; subs: SubCategory[] }
export const AREAS: Area[] = [
  {
    key: 'korean',
    name: '국어',
    subs: [
      { key: 'speech', name: '화법과 언어', ready: false },
      { key: 'reading', name: '독서와 작문', ready: false },
      { key: 'literature', name: '문학', ready: false },
    ],
  },
  {
    key: 'math',
    name: '수학',
    subs: [
      { key: 'prob', name: SUBJECT_NAME.prob, ready: true },
      { key: 'algebra', name: SUBJECT_NAME.algebra, ready: false },
      { key: 'calc', name: SUBJECT_NAME.calc, ready: false },
    ],
  },
  { key: 'english', name: '영어', subs: [] },
  { key: 'history', name: '한국사', subs: [] },
  {
    key: 'inquiry',
    name: '탐구',
    subs: [
      { key: 'society', name: '통합사회', ready: false },
      { key: 'science', name: '통합과학', ready: false },
    ],
  },
]
/** 교재가 하나라도 나온 영역인지 */
export const areaReady = (a: Area) => a.subs.some((x) => x.ready)

const PERIOD = `${USE_PERIOD} 이용`

export const PRODUCTS: Product[] = [
  {
    id: 'pass-3',
    kind: 'pass',
    name: '기출비급패스 3권',
    badge: '3권 패스',
    subjects: ['prob', 'algebra', 'calc'],
    price: 27900,
    aiQuestions: 500,
    perks: ['확률과 통계, 대수, 미적분Ⅰ 3권', 'AI 선생님 질문 약 500회 포함', PERIOD, '한 권에 9,300원'],
  },
  ...(['prob', 'algebra', 'calc'] as const).map((s) => ({
    id: s,
    kind: 'single' as const,
    name: `기출비급 ${SUBJECT_NAME[s]}`,
    badge: '단권',
    subjects: [s],
    price: 14900,
    aiQuestions: 100,
    perks: [`${SUBJECT_NAME[s]} 1권`, 'AI 선생님 질문 약 100회 포함', PERIOD],
  })),
]

export const findProduct = (id: string | undefined) => PRODUCTS.find((p) => p.id === id)

export const won = (n: number) => `₩${n.toLocaleString('ko-KR')}`
