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

export const getOrder = (orderId: string) => api<Order>(`/api/v1/pass/orders/${encodeURIComponent(orderId)}`)
