import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import after1000 from '../../assets/app/check-after-1000.webp'
import after1800 from '../../assets/app/check-after-1800.webp'
import before1000 from '../../assets/app/check-before-1000.webp'
import before1800 from '../../assets/app/check-before-1800.webp'
import PaperCheck from './PaperCheck'
import { Container, Tablet, btnPen, btnQuiet } from './ui'

const FACTS = ['2028 수능 수학 평가원 기출', '2022 개정 교육과정 반영', 'iPad, 갤럭시 탭에서 펜으로']
const SIZES = '(min-width: 1520px) 1400px, 94vw'

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
      <Container className="pt-12 sm:pt-16 lg:pt-20">
        <h1 className="max-w-[18ch] text-[34px] leading-[1.24] font-extrabold tracking-[-0.035em] sm:max-w-none sm:text-[52px] sm:leading-[1.18] lg:text-[72px] lg:leading-[1.14]">
          기출, 틀린 문제에
          <br />
          빨간 줄만 긋고 넘어가면
          <br />
          세 번 풀어도 <br className="sm:hidden" />
          4등급이 나옵니다
        </h1>

        <div className="mt-6 grid gap-8 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-[40ch] text-[16px] leading-[1.7] text-ink-soft sm:text-[18px] lg:text-[19px]">
            같은 문제를 다시 만났을 때 맞히려면, 내 풀이가 어디서 틀렸는지부터 알아야 해요. 기출비급은 태블릿에 펜으로 쓴
            내 풀이를 읽고 틀린 줄을 짚어 줍니다.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
            <Link to="/pass" className={btnPen} data-hero-cta>
              기출비급패스 보기
            </Link>
            <a href="#how" className={btnQuiet}>
              어떻게 짚어 주는지 보기
            </a>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-ink-soft sm:text-[15px] lg:mt-10">
          {FACTS.map((f, i) => (
            <li key={f} className={i > 0 ? 'sm:border-l sm:border-line sm:pl-5' : ''}>
              {f}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-9 px-3 sm:mt-12 lg:mt-14">
        <div ref={stage} className="relative z-10 mx-auto max-w-[1400px]">
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

      {/* 태블릿 아랫부분이 책상(다음 섹션 바탕)에 걸쳐 놓인다 */}
      <div className="-mt-[24vw] bg-desk pt-[24vw] sm:-mt-[14vw] sm:pt-[14vw] lg:-mt-[150px] lg:pt-[150px]">
        <Container>
          <p className="py-5 text-center text-[13px] text-ink-faint sm:text-[14px]">
            실제 앱 화면이에요. 2025학년도 수능 확률과 통계 28번을 풀고 ‘내 풀이 점검 받기’를 누른 모습입니다.
          </p>
        </Container>
      </div>
    </section>
  )
}
