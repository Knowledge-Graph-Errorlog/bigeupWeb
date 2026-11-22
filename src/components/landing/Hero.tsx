import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import after1000 from '../../assets/app/check-after-1000.webp'
import after1800 from '../../assets/app/check-after-1800.webp'
import before1000 from '../../assets/app/check-before-1000.webp'
import before1800 from '../../assets/app/check-before-1800.webp'
import PaperCheck from './PaperCheck'
import { Container, Tablet, btnPen, btnQuiet } from './ui'

const FACTS = ['2028 수능 수학 평가원 기출', '2022 개정 교육과정 반영', 'iPad, 갤럭시 탭에서 펜으로']
const SIZES = '(min-width: 1100px) 1040px, 94vw'

// 첫 화면. 이 페이지에서 가장 힘을 주는 한 장면: 내 손풀이의 틀린 줄에 빨간 형광펜이 그어진다.
// 앱의 실제 화면 두 장(점검 전·후)을 겹쳐 두고, 점검 후 화면을 왼쪽에서 오른쪽으로 드러낸다.
export default function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const [swept, setSwept] = useState(false)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setSwept(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setSwept(true)
        io.disconnect()
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="overflow-hidden bg-sheet">
      <Container className="pt-10 sm:pt-14 lg:pt-16">
        <h1 className="text-[28px] leading-[1.3] font-bold tracking-[-0.035em] sm:text-[38px] lg:text-[46px] lg:leading-[1.26]">
          기출, 틀린 문제에
          <br />
          빨간 줄만 긋고 넘어가면
          <br />
          세 번 풀어도 <br className="sm:hidden" />
          4등급이 나옵니다
        </h1>

        <div className="mt-5 grid gap-6 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-[36ch] text-[15px] leading-[1.7] text-ink-soft sm:text-[16px]">
            기출비급은 태블릿에 펜으로 쓴 내 풀이를 읽고, 틀린 줄을 짚어 줍니다.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
            <Link to="/pass" className={btnPen} data-hero-cta>
              비급교재 구매하기
            </Link>
            <a href="#how" className={btnQuiet}>
              어떻게 짚어 주는지 보기
            </a>
          </div>
        </div>

        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink-faint lg:mt-8">
          {FACTS.map((f, i) => (
            <li key={f} className={i > 0 ? 'sm:border-l sm:border-line sm:pl-5' : ''}>
              {f}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-8 px-3 sm:mt-10 lg:mt-12">
        <div ref={stage} className="relative z-10 mx-auto max-w-[1040px]">
          {/* 휴대폰: 문제지와 AI 선생님 말만 크게 */}
          <div className="px-2 sm:hidden">
            <PaperCheck swept={swept} eager />
          </div>
          <Tablet className="max-sm:hidden">
            <img
              src={before1800}
              srcSet={`${before1000} 1000w, ${before1800} 1800w`}
              sizes={SIZES}
              alt=""
              width={1800}
              height={1257}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={after1800}
              srcSet={`${after1000} 1000w, ${after1800} 1800w`}
              sizes={SIZES}
              alt="기출비급 앱 화면. 펜으로 쓴 풀이의 넷째 줄에 빨간 형광펜과 (1) 번호가 표시되고, 오른쪽 AI 선생님 칸에 '3번째 줄까지 맞아요. (1)에서 범위를 2f(6)까지로 생각한 것 같은데, X의 원소는 6까지이므로 그 안에서 생각해야 해요'라고 적혀 있다."
              width={1800}
              height={1257}
              className="absolute inset-0 h-full w-full object-cover transition-[clip-path] delay-300 duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
              style={{ clipPath: swept ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
            />
          </Tablet>
        </div>
      </Container>

      {/* 첫 화면은 흰 바탕 안에서 끝난다 (태블릿이 다음 섹션에 걸치지 않게) */}
      <Container>
        <p className="pt-5 pb-12 text-center text-[13px] text-ink-faint sm:pb-16 lg:pb-20">
          실제 앱 화면이에요. 2025학년도 수능 확률과 통계 28번을 풀고 ‘내 풀이 점검 받기’를 누른 모습입니다.
        </p>
      </Container>
    </section>
  )
}
