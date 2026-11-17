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
    <div className="relative pb-[30%] sm:pb-[26%]">
      <div className={`relative w-[82%] ${paper}`}>
        <span className={`${tag} bg-ink text-white`}>1회차</span>
        <img src={round1b} srcSet={`${round1a} 800w, ${round1b} 1400w`} sizes={SIZES} alt="1회차 풀이. 넷째 줄에 빨간 형광펜으로 틀린 곳이 표시되어 있고 문제 번호에 빗금이 그어져 있다." loading="lazy" decoding="async" className="block h-auto w-full" />
      </div>
      <div className={`absolute right-0 bottom-0 w-[82%] ${paper}`}>
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
    body: [
      '‘내 풀이 점검 받기’를 누르면 틀린 줄에 빨간 형광펜과 번호가 표시돼요.',
      '설명도 “(1)에서는 이렇게 생각한 것 같은데, 이 조건에서는 이렇게 생각해야 해요”처럼 내 풀이를 기준으로 들을 수 있어요.',
    ],
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
    body: [
      '수능 문제 하나에는 여러 개념이 함께 쓰여요. 이 가운데 하나만 부족해도 문제를 끝까지 풀 수 없어요.',
      '점검 결과와 해설의 단계마다 그때 쓴 개념이 붙어 있어요. 누르면 그 자리에서 개념을 다시 볼 수 있고, 부족한 것이 중학교 개념이라면 중학교 개념까지 내려가요. 같은 개념이 쓰인 기출을 모아 다시 풀 수도 있어요.',
    ],
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
    body: [
      '채점할 때마다 내 풀이가 회차별로 저장돼요.',
      '다시 풀고 나서 1회차 풀이를 열면, 지난번에 막힌 곳을 이번에는 어떻게 풀었는지, 풀이가 얼마나 나아졌는지 비교해서 볼 수 있어요.',
    ],
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
    <section id="how" className="bg-sheet py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionTitle className="max-w-[20ch]">
          정답 풀이가 아니라,
          <br />내 풀이를 기준으로 공부하세요
        </SectionTitle>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.75] text-ink-soft sm:text-[18px]">
          기출비급은 태블릿에서 펜으로 푸는 기출 교재예요. 내가 쓴 풀이가 그대로 저장되고, 그 풀이를 기준으로 틀린 곳을
          확인하고, 질문하고, 다시 풀 수 있어요.
        </p>

        <div className="mt-14 lg:mt-6 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <ol>
            {STEPS.map((s, i) => (
              <li
                key={i}
                ref={(el) => {
                  refs.current[i] = el
                }}
                data-i={i}
                className="flex flex-col justify-center border-t border-line py-12 first:border-t-0 first:pt-0 lg:min-h-[78vh] lg:border-t-0 lg:py-0"
              >
                <div className={`transition-opacity duration-300 ${active === i ? '' : 'lg:opacity-35'}`}>
                  <span className="font-exam text-[22px] font-extrabold text-pen sm:text-[26px]">{i + 1}.</span>
                  <h3 className="mt-2 text-[24px] leading-[1.32] font-extrabold tracking-[-0.03em] sm:text-[32px] lg:text-[36px]">{s.title}</h3>
                  {s.body.map((p) => (
                    <p key={p} className="mt-4 max-w-[44ch] text-[16px] leading-[1.75] text-ink-soft sm:text-[17px]">
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
            <div className="sticky top-[calc(50vh-min(26vw,330px))] grid">
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
