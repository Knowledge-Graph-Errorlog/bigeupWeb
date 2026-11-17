import { useEffect, useRef, useState, type ReactNode } from 'react'
import after1000 from '../../assets/app/check-after-1000.webp'
import after1800 from '../../assets/app/check-after-1800.webp'
import window900 from '../../assets/app/concept-window-900.webp'
import window1600 from '../../assets/app/concept-window-1600.webp'
import round1a from '../../assets/app/round1-800.webp'
import round1b from '../../assets/app/round1-1400.webp'
import round2a from '../../assets/app/round2-800.webp'
import round2b from '../../assets/app/round2-1400.webp'
import winA from '../../assets/app/window-700.webp'
import winB from '../../assets/app/window-1200.webp'
import PaperCheck from './PaperCheck'
import { Container, SectionTitle, Tablet } from './ui'

// phone: 휴대폰(640px 미만)에서 대신 보여 줄 확대 조각
type Step = { title: ReactNode; body: string[]; visual: ReactNode; phone?: ReactNode }

const SIZES = '(min-width: 1024px) 52vw, 92vw'

function Screen({ small, large, alt }: { small: string; large: string; alt: string }) {
  return (
    <Tablet>
      <img src={large} srcSet={`${small} 1000w, ${large} 1800w`} sizes={SIZES} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
    </Tablet>
  )
}

/** 1회차와 2회차 종이를 겹쳐 놓는다 */
function Rounds() {
  const paper = 'overflow-hidden rounded-xl border border-line bg-sheet shadow-[0_18px_44px_-18px_rgba(20,22,26,0.35)]'
  const tag = 'absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[13px] font-bold'
  return (
    <div className="relative mx-auto max-w-[620px] pb-[30%] sm:pb-[26%] lg:max-w-none lg:pb-[22%]">
      <div className={`relative w-[80%] ${paper}`}>
        <span className={`${tag} bg-ink text-white`}>1회차</span>
        <img src={round1b} srcSet={`${round1a} 800w, ${round1b} 1400w`} sizes={SIZES} alt="1회차 풀이. 넷째 줄에 빨간 형광펜으로 틀린 곳이 표시되어 있고 문제 번호에 빗금이 그어져 있다." loading="lazy" decoding="async" className="block h-auto w-full" />
      </div>
      <div className={`absolute right-0 bottom-0 w-[80%] ${paper}`}>
        <span className={`${tag} bg-pen text-white`}>2회차</span>
        <img src={round2b} srcSet={`${round2a} 800w, ${round2b} 1400w`} sizes={SIZES} alt="2회차 풀이. 같은 문제를 다시 풀어 정답을 골랐고 문제 번호에 빨간 동그라미가 그려져 있다." loading="lazy" decoding="async" className="block h-auto w-full" />
      </div>
    </div>
  )
}

const STEPS: Step[] = [
  {
    title: (
      <>
        내 풀이가 어느 줄에서
        <br />
        틀렸는지 확인하세요
      </>
    ),
    body: ['‘내 풀이 점검 받기’를 누르면 틀린 줄에 빨간 형광펜과 번호가 표시되고, 그 줄을 기준으로 설명해 줘요.'],
    visual: <Screen small={after1000} large={after1800} alt="풀이 점검 화면. 손풀이의 틀린 줄에 빨간 형광펜과 (1)이 표시되고 AI 선생님이 그 줄을 짚어 설명한다." />,
    phone: <PaperCheck />,
  },
  {
    title: (
      <>
        어떤 개념이 부족해서
        <br />
        틀렸는지 찾을 수 있어요
      </>
    ),
    body: ['점검 결과와 해설의 단계마다 그때 쓴 개념이 붙어 있어요. 누르면 그 자리에서 다시 볼 수 있고, 중학교 개념까지 내려가요.'],
    visual: <Screen small={window900} large={window1600} alt="개념 창. 해설의 ‘중복조합’ 개념을 누르자 뜻, 공식, 이해하기가 문제 화면 위에 열려 있다." />,
    phone: (
      <img src={winB} srcSet={`${winA} 700w, ${winB} 1200w`} sizes="92vw" alt="개념 창. ‘중복조합’의 뜻, 공식, 이해하기가 차례로 적혀 있다." loading="lazy" decoding="async" className="block h-auto w-full rounded-2xl border border-line shadow-[0_18px_44px_-18px_rgba(20,22,26,0.35)]" />
    ),
  },
  {
    title: (
      <>
        다시 풀 때,
        <br />
        지난번 풀이와 비교하세요
      </>
    ),
    body: ['채점할 때마다 내 풀이가 회차별로 저장돼요. 지난번에 막힌 곳을 이번에는 어떻게 풀었는지 볼 수 있어요.'],
    visual: <Rounds />,
  },
]

// 핵심 세 가지. PC에서는 오른쪽 화면이 붙어 있고 왼쪽 글이 지나갈 때마다 화면이 바뀐다 (이 페이지의 유일한 고정 장면).
// 휴대폰에서는 글 아래에 그 화면을 하나씩 세로로 놓는다.
export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
      },
      // 화면 가운데 띠에 들어온 단계를 지금 단계로
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="how" className="bg-sheet py-16 sm:py-20 lg:pt-24 lg:pb-6">
      <Container>
        <SectionTitle className="max-w-[20ch]">
          정답 풀이가 아니라,
          <br />내 풀이를 기준으로 공부하세요
        </SectionTitle>

        <div className="mt-10 lg:mt-0 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-16">
          <ol className="lg:pb-[18vh]">
            {STEPS.map((s, i) => (
              <li
                key={i}
                ref={(el) => {
                  refs.current[i] = el
                }}
                data-i={i}
                className="flex flex-col justify-center border-t border-line py-12 first:border-t-0 first:pt-0 lg:min-h-[64vh] lg:border-t-0 lg:py-0 lg:first:min-h-[44vh]"
              >
                <div className={`transition-opacity duration-300 ${active === i ? '' : 'lg:opacity-35'}`}>
                  <span className="font-exam text-[18px] font-extrabold text-pen sm:text-[20px]">{i + 1}.</span>
                  <h3 className="mt-2 text-[21px] leading-[1.36] font-bold tracking-[-0.03em] sm:text-[24px] lg:text-[28px]">{s.title}</h3>
                  {s.body.map((p) => (
                    <p key={p} className="mt-3 max-w-[38ch] text-[15px] leading-[1.7] text-ink-soft sm:text-[16px]">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-8 lg:hidden">
                  {s.phone ? (
                    <>
                      <div className="sm:hidden">{s.phone}</div>
                      <div className="max-sm:hidden">{s.visual}</div>
                    </>
                  ) : (
                    s.visual
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-16 grid h-[calc(100vh-4rem)] items-center">
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  aria-hidden={active !== i}
                  className={`col-start-1 row-start-1 self-center transition-[opacity,translate] duration-500 ease-out-quart ${
                    active === i ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                  }`}
                >
                  {s.visual}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
