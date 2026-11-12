// 교재 결제 API (backend docs/결제-API.md). 금액은 서버가 정한다.
import { api, post } from './api'

export type CreatedOrder = { orderId: string; orderName: string; amount: number; clientKey: string }

export type OrderStatus = 'READY' | 'CONFIRMING' | 'PAID' | 'PARTIAL_CANCELED' | 'CANCELED' | 'FAILED' | 'EXPIRED'

export type Order = {
  orderId: string
  productId: string
  orderName: string
  amount: number
  status: OrderStatus
  failureCode: string | null
  failureMessage: string | null
  subjects: string[]
}

export const createOrder = (productId: string) => post<CreatedOrder>('/api/v1/pass/orders', { productId })

export const confirmOrder = (orderId: string, paymentKey: string, amount: number) =>
  post<Order>(`/api/v1/pass/orders/${encodeURIComponent(orderId)}/confirm`, { paymentKey, amount })

/** 서버 과목 이름 → 화면 이름·웹 상품 */
export const SUBJECTS: { key: string; name: string; productId: string }[] = [
  { key: 'math-prob-stat', name: '확률과 통계', productId: 'prob' },
  { key: 'math-algebra', name: '대수', productId: 'algebra' },
  { key: 'math-calculus1', name: '미적분Ⅰ', productId: 'calc' },
]
export const subjectName = (key: string) => SUBJECTS.find((s) => s.key === key)?.name ?? key

/** 가진 교재 (과목). 결제가 끝나면 열리고 환불되면 닫힌다 */
export const getBooks = () => api<{ subjects: string[] }>('/api/v1/pass/books')

export const getOrder = (orderId: string) => api<Order>(`/api/v1/pass/orders/${encodeURIComponent(orderId)}`)
