// 토스페이먼츠 결제위젯(주문서형) SDK v2. 클라이언트 키는 서버가 주문과 함께 준다 (시크릿 키와 짝이 맞게).
import { loadScript } from './script'

type Amount = { currency: 'KRW'; value: number }

export type TossWidgets = {
  setAmount(a: Amount): Promise<void>
  renderPaymentMethods(o: { selector: string; variantKey?: string }): Promise<unknown>
  renderAgreement(o: { selector: string; variantKey?: string }): Promise<unknown>
  requestPayment(o: { orderId: string; orderName: string; successUrl: string; failUrl: string }): Promise<void>
}

type TossPaymentsFn = ((clientKey: string) => { widgets(o: { customerKey: string }): TossWidgets }) & {
  ANONYMOUS: string
}

export async function loadTossWidgets(clientKey: string): Promise<TossWidgets> {
  await loadScript('https://js.tosspayments.com/v2/standard')
  const TossPayments = (window as unknown as { TossPayments: TossPaymentsFn }).TossPayments
  // 결제 수단을 회원별로 기억하지 않으므로 ANONYMOUS (customerKey 는 결제 카드 저장용)
  return TossPayments(clientKey).widgets({ customerKey: TossPayments.ANONYMOUS })
}
