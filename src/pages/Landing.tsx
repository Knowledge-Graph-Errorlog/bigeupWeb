import { Faq, FinalCta, MobileBar, Pricing, Scope } from '../components/landing/Closing'
import ConceptDemo from '../components/landing/ConceptDemo'
import Extras from '../components/landing/Extras'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import SelfCheck from '../components/landing/SelfCheck'
import { useReveal } from '../hooks/useReveal'

// 랜딩. 순서: 후킹 → 경험 → 원인과 해결 → 핵심 3개 → 개념 눌러 보기 → 그 밖에 → 2028 범위 → 가격 → 자주 묻는 질문
// 디자인 기준은 Yoo-yongseok/landing-outsourcing 의 정책/03_디자인원칙.md. 앱 화면은 모두 실제 앱을 띄워 찍은 것이다.
// (3문제 맛보기는 아직 없는 기능이라 싣지 않는다. 열리면 '개념 눌러 보기' 다음에 넣는다)
export default function Landing() {
  useReveal()
  return (
    <div id="top">
      <Hero />
      <SelfCheck />
      <HowItWorks />
      <ConceptDemo />
      <Extras />
      <Scope />
      <Pricing />
      <Faq />
      <FinalCta />
      <MobileBar />
    </div>
  )
}
