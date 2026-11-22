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

/** 과목(수학·과학·영어)과 그 아래 세부 과목. 교재가 아직 없는 과목은 subjects를 비워 둔다 — 구매 페이지에 '준비 중'으로 보인다 */
export type Area = 'math' | 'science' | 'english'
export const AREAS: { key: Area; name: string; subjects: Subject[] }[] = [
  { key: 'math', name: '수학', subjects: ['prob', 'algebra', 'calc'] },
  { key: 'science', name: '과학', subjects: [] },
  { key: 'english', name: '영어', subjects: [] },
]

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
