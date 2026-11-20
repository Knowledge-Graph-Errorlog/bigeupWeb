import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { DEMO_PROBLEM } from '../../data/conceptDemo'
import { Container, SectionTitle } from './ui'

// 개념마다 색 하나. 문제 위 표시, 옆 설명, 아래 개념 카드가 같은 색을 쓴다.
const TONE = {
  C0291: { solid: 'bg-pen', soft: 'bg-pen-soft', text: 'text-pen-deep', stroke: '#b20f0f' },
  C0057: { solid: 'bg-marker-deep', soft: 'bg-marker-soft', text: 'text-marker-deep', stroke: '#04808a' },
  C0448: { solid: 'bg-ink', soft: 'bg-desk-deep', text: 'text-ink', stroke: '#14161a' },
} as const
type ConceptId = keyof typeof TONE

// 문제 위에 찍은 표시 네 곳. 어느 단계에 어느 개념을 쓰는지는 앱 해설의 단계별 개념 그대로다.
const MARKS: { n: number; concept: ConceptId; side: 'left' | 'right'; note: string }[] = [
  { n: 1, concept: 'C0291', side: 'right', note: '그래프와 x축 사이의 넓이는 1이에요.' },
  { n: 2, concept: 'C0057', side: 'left', note: '원점과 점 (b, c)를 지나는 직선의 식을 세워요.' },
  { n: 3, concept: 'C0448', side: 'left', note: '두 확률을 더하면 1이에요.' },
  { n: 4, concept: 'C0291', side: 'right', note: '확률은 그래프 아래 넓이와 같아요.' },
]
const nameOf = (id: string) => DEMO_PROBLEM.concepts.find((c) => c.id === id)?.name ?? ''
const isMiddle = (subject: string) => subject.startsWith('중')
const LEVEL_NAME: Record<string, string> = { 중1: '중학교 1학년', 중2: '중학교 2학년', 중3: '중학교 3학년' }

/* ── 수식 조각 (이 한 문제만 그리므로 수식 라이브러리는 쓰지 않는다) ── */
const mathFont = { fontFamily: "'Times New Roman', 'Nimbus Roman', Times, serif" }
const V = ({ children }: { children: ReactNode }) => (
  <i style={mathFont} className="px-[0.04em] text-[1.08em]">
    {children}
  </i>
)
const N = ({ children }: { children: ReactNode }) => (
  <span style={mathFont} className="text-[1.08em]">
    {children}
  </span>
)
const Frac = ({ a, b }: { a: ReactNode; b: ReactNode }) => (
  <span style={mathFont} className="mx-[0.12em] inline-flex flex-col items-center align-middle text-[0.92em] leading-[1.15]">
    <span className="border-b border-current px-[0.2em]">{a}</span>
    <span className="px-[0.2em]">{b}</span>
  </span>
)
const Sqrt5 = () => (
  <span style={mathFont} className="inline-flex items-stretch text-[1.08em] leading-none">
    <svg viewBox="0 0 10 20" className="h-[1.15em] w-[0.58em] self-end overflow-visible" aria-hidden="true">
      <path d="M0.5 12 L2.6 10.8 L5.2 18.5 L9.6 0.6" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
    <span className="border-t border-current pt-[0.16em] pr-[0.08em]">5</span>
  </span>
)
/** P(X ≤ b) 꼴 */
const P = ({ op, children }: { op: '≤' | '≥'; children: ReactNode }) => (
  <>
    <N>P(</N>
    <V>X</V>
    <N>&thinsp;{op}&thinsp;</N>
    {children}
    <N>)</N>
  </>
)

function Badge({ n, concept, className = '', ...rest }: { n: number; concept: ConceptId; className?: string } & Record<`data-${string}`, number>) {
  return (
    <span
      {...rest}
      aria-hidden="true"
      className={`inline-grid size-[18px] shrink-0 place-items-center rounded-full font-sans text-[11px] leading-none font-bold text-white tabular-nums sm:size-5 sm:text-[12px] ${TONE[concept].solid} ${className}`}
    >
      {n}
    </span>
  )
}

/** 2023학년도 수능 확률과 통계 28번의 그림. 시험지 그림과 같은 모양으로 다시 그리고, 개념이 쓰인 두 곳에 색을 얹었다. */
function Figure() {
  return (
    <div className="relative mx-auto my-5 w-[92%]">
      <svg viewBox="0 0 1030 352" className="block w-full" role="img" aria-label="확률밀도함수의 그래프. 원점에서 점 (b, c)까지 올라갔다가 점 (a, 0)까지 내려오는 꺾인 선이다.">
        {/* ① 그래프와 x축 사이 */}
        <path d="M100.5 238.5 L600 138 L900 238.5 Z" fill="#b20f0f" fillOpacity="0.09" />
        {/* ② 원점과 (b, c)를 잇는 선 */}
        <line x1="100.5" y1="238.5" x2="600" y2="138" stroke="#05becc" strokeOpacity="0.45" strokeWidth="16" strokeLinecap="round" />
        <g stroke="#14161a" fill="none">
          <line x1="0" y1="238.5" x2="1016" y2="238.5" strokeWidth="1.6" />
          <line x1="100.5" y1="350" x2="100.5" y2="14" strokeWidth="1.6" />
          <line x1="100.5" y1="138" x2="600" y2="138" strokeWidth="1.4" strokeDasharray="7 5" />
          <line x1="600" y1="138" x2="600" y2="238.5" strokeWidth="1.4" strokeDasharray="7 5" />
          <polyline points="100.5,238.5 600,138 900,238.5" strokeWidth="3.6" strokeLinejoin="round" />
        </g>
        <path d="M1028 238.5 L1008 232 L1012 238.5 L1008 245 Z M100.5 2 L94 22 L100.5 18 L107 22 Z" fill="#14161a" />
        <g fill="#14161a" fontSize="40" textAnchor="middle" style={mathFont}>
          <text x="76" y="30" fontStyle="italic">y</text>
          <text x="1012" y="282" fontStyle="italic">x</text>
          <text x="74" y="282">O</text>
          <text x="600" y="284" fontStyle="italic">b</text>
          <text x="902" y="282" fontStyle="italic">a</text>
          <text x="80" y="150" fontStyle="italic">c</text>
        </g>
      </svg>
      <Badge n={1} concept="C0291" data-badge={1} className="absolute top-[56.3%] left-[63.1%] -translate-1/2" />
      <Badge n={2} concept="C0057" data-badge={2} className="absolute top-[51.1%] left-[18%] -translate-1/2" />
    </div>
  )
}

type Geo = { tops: Record<number, number>; lines: { n: number; d: string; x: number; y: number }[] }

// 수능 문제 한 장 위에 개념이 쓰인 곳을 표시하고, 옆에 어떤 개념인지 적는다. 아래에는 그 문제에 쓰인 개념을 모아 둔다.
// 개념 이름과 선수 관계는 앱에 실린 콘텐츠 그대로다 (src/data/conceptDemo.ts).
export default function ConceptDemo() {
  const root = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<Geo | null>(null)
  const [hot, setHot] = useState<number | null>(null)

  // PC: 설명을 표시와 같은 높이에 놓고 둘 사이에 선을 긋는다. 좁은 화면은 번호로만 잇는다.
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const wide = window.matchMedia('(min-width: 1024px)')
    let last = ''
    const run = () => {
      if (!wide.matches) {
        last = ''
        setGeo(null)
        return
      }
      const R = el.getBoundingClientRect()
      const tops: Geo['tops'] = {}
      const lines: Geo['lines'] = []
      for (const side of ['left', 'right'] as const) {
        const items = MARKS.filter((m) => m.side === side)
          .map((m) => {
            const b = el.querySelector<HTMLElement>(`[data-badge="${m.n}"]`)!.getBoundingClientRect()
            const note = el.querySelector<HTMLElement>(`[data-note="${m.n}"]`)!
            const nr = note.getBoundingClientRect()
            const nb = el.querySelector<HTMLElement>(`[data-note-badge="${m.n}"]`)!.getBoundingClientRect()
            return {
              n: m.n,
              bx: b.left + b.width / 2 - R.left,
              by: b.top + b.height / 2 - R.top,
              r: b.width / 2,
              h: nr.height,
              off: nb.top + nb.height / 2 - nr.top,
              nx: nb.left + nb.width / 2 - R.left,
            }
          })
          .sort((a, z) => a.by - z.by)
        let floor = 0
        for (const it of items) {
          const top = Math.max(it.by - it.off, floor)
          floor = top + it.h + 14
          tops[it.n] = Math.round(top)
          const ny = Math.round(top + it.off)
          const dir = side === 'left' ? -1 : 1
          const x1 = it.bx + dir * (it.r + 3)
          const x2 = it.nx - dir * (it.r + 3)
          const y1 = Math.round(it.by)
          // 높이가 다르면 종이 바깥 여백에서 한 번 꺾는다
          const mid = x2 - dir * 14
          lines.push({ n: it.n, d: y1 === ny ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} H${mid} V${ny} H${x2}`, x: x1, y: y1 })
        }
      }
      const key = JSON.stringify([tops, lines])
      if (key === last) return
      last = key
      setGeo({ tops, lines })
    }
    run()
    const ro = new ResizeObserver(run)
    ro.observe(el)
    wide.addEventListener('change', run)
    document.fonts?.ready.then(run)
    return () => {
      ro.disconnect()
      wide.removeEventListener('change', run)
    }
  }, [])

  const ring = (n: number) => (hot === n ? 'ring-2 ring-current/30' : '')

  return (
    <section id="concept" className="bg-desk py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <SectionTitle>
            문제의 어느 부분에
            <br />
            어떤 개념이 쓰였을까요?
          </SectionTitle>
          <p className="max-w-[46ch] text-[15px] leading-[1.7] text-ink-soft sm:text-[16px]">
            {DEMO_PROBLEM.label}이에요. 그림 한 장과 조건 두 개에 개념 {DEMO_PROBLEM.concepts.length}개가 들어 있어요.
          </p>
        </div>

        <div ref={root} className="relative mt-10 sm:mt-14 lg:[--sheet:440px] xl:[--sheet:520px]">
          {/* 시험지 */}
          <div className="mx-auto max-w-[560px] rounded-2xl bg-sheet p-5 font-exam text-[15px] leading-[2.1] shadow-[0_1px_2px_rgba(20,22,26,0.06),0_18px_40px_-24px_rgba(20,22,26,0.25)] sm:p-8 sm:text-[16px] lg:mx-auto lg:w-(--sheet) xl:text-[17px]">
            <p className="font-sans text-[12px] leading-none text-ink-faint sm:text-[13px]">
              {DEMO_PROBLEM.label.replace(' 28번', '')} · {DEMO_PROBLEM.subject}
            </p>
            <p className="mt-4">
              <b className="mr-1.5 font-sans text-[1.1em]">28.</b>
              연속확률변수 <V>X</V>가 갖는 값의 범위는 <span className="whitespace-nowrap">
                <N>0&thinsp;≤&thinsp;</N>
                <V>X</V>
                <N>&thinsp;≤&thinsp;</N>
                <V>a</V>
              </span>
              이고, <V>X</V>의 확률밀도함수의 그래프가 그림과 같다.
            </p>

            <Figure />

            <p className="mt-6">
              <span className={`relative inline-block rounded-md px-1.5 whitespace-nowrap ${TONE.C0448.soft} ${TONE.C0448.text} ${ring(3)}`}>
                <Badge n={3} concept="C0448" data-badge={3} className="absolute -top-2 -left-2.5" />
                <P op="≤">
                  <V>b</V>
                </P>
                <N>&nbsp;−&nbsp;</N>
                <P op="≥">
                  <V>b</V>
                </P>
                <N>&nbsp;=&nbsp;</N>
                <Frac a="1" b="4" />
              </span>
              ,{' '}
              <span className={`relative inline-block rounded-md px-1.5 whitespace-nowrap text-ink ${TONE.C0291.soft} ${hot === 4 ? 'ring-2 ring-pen/30' : ''}`}>
                <Badge n={4} concept="C0291" data-badge={4} className="absolute -top-2 -right-2.5" />
                <P op="≤">
                  <Sqrt5 />
                </P>
                <N>&nbsp;=&nbsp;</N>
                <Frac a="1" b="2" />
              </span>
              <span className="whitespace-nowrap">일 때,</span> <V>a</V>
              <N>+</N>
              <V>b</V>
              <N>+</N>
              <V>c</V>의 값은? (단, <V>a</V>, <V>b</V>, <V>c</V>는 상수이다.) <span className="font-sans text-[0.9em]">[{DEMO_PROBLEM.points}점]</span>
            </p>
            <ol className="mt-5 flex justify-between gap-2 text-ink-soft" aria-label="선택지">
              {[<Frac a="11" b="2" />, <N>6</N>, <Frac a="13" b="2" />, <N>7</N>, <Frac a="15" b="2" />].map((choice, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="font-sans text-[0.95em]">{'①②③④⑤'[i]}</span>
                  {choice}
                </li>
              ))}
            </ol>
          </div>

          {/* PC: 표시와 설명을 잇는 선 */}
          {geo && (
            <svg className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block" aria-hidden="true">
              {geo.lines.map((l) => {
                const m = MARKS[l.n - 1]
                return <path key={l.n} d={l.d} fill="none" stroke={TONE[m.concept].stroke} strokeWidth={hot === l.n ? 2 : 1.25} strokeOpacity={hot === null || hot === l.n ? 1 : 0.3} />
              })}
            </svg>
          )}

          {/* 표시마다 어떤 개념인지. 좁은 화면은 종이 아래에 번호 순서대로, PC는 종이 양옆에 */}
          <ol className="mx-auto mt-5 grid max-w-[560px] gap-2.5 lg:mt-0 lg:block lg:max-w-none">
            {MARKS.map((m, i) => (
              <li
                key={m.n}
                data-note={m.n}
                onMouseEnter={() => setHot(m.n)}
                onMouseLeave={() => setHot(null)}
                style={{ top: geo ? geo.tops[m.n] : `${[38, 30, 62, 66][i]}%` }}
                className={`flex gap-2.5 rounded-xl bg-sheet p-3.5 transition-opacity duration-200 lg:absolute lg:w-[calc((100%-var(--sheet))/2-44px)] lg:bg-transparent lg:p-0 ${
                  m.side === 'left' ? 'lg:left-0 lg:flex-row-reverse lg:text-right' : 'lg:right-0'
                } ${hot !== null && hot !== m.n ? 'lg:opacity-40' : ''}`}
              >
                <Badge n={m.n} concept={m.concept} data-note-badge={m.n} className="mt-[3px]" />
                <div className="min-w-0">
                  <p className={`text-[15px] leading-[1.45] font-bold tracking-[-0.01em] sm:text-[16px] ${TONE[m.concept].text}`}>{nameOf(m.concept)}</p>
                  <p className="mt-1 text-[14px] leading-[1.55] text-ink-soft">{m.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 이 문제에 쓰인 개념 */}
        <h3 className="mt-14 text-[18px] leading-[1.4] font-bold tracking-[-0.02em] sm:mt-20 sm:text-[20px]">
          이 문제에 쓰인 개념 {DEMO_PROBLEM.concepts.length}개
        </h3>
        <ul className="mt-5 grid gap-3 sm:gap-4 lg:grid-cols-3">
          {DEMO_PROBLEM.concepts.map((c) => {
            const id = c.id as ConceptId
            const middle = c.before.filter((b) => isMiddle(b.subject)).length
            return (
              <li key={c.id} className="rounded-2xl bg-sheet p-5 sm:p-6">
                <div className="flex items-center gap-1.5">
                  {MARKS.filter((m) => m.concept === id).map((m) => (
                    <Badge key={m.n} n={m.n} concept={id} />
                  ))}
                  <span className="ml-1 text-[13px] text-ink-faint">{LEVEL_NAME[c.subject] ?? c.subject}</span>
                </div>
                <p className="mt-3 text-[17px] leading-[1.4] font-bold tracking-[-0.02em] sm:text-[18px]">{c.name}</p>
                <p className="mt-4 text-[13px] text-ink-soft">
                  먼저 알아야 하는 개념 {c.before.length}개
                  {middle > 0 && <b className="ml-1.5 text-marker-deep">중학교 개념 {middle}개</b>}
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {c.before.map((b) => (
                    <li
                      key={b.name}
                      className={`rounded-md px-2 py-1 text-[13px] leading-[1.3] ${isMiddle(b.subject) ? 'bg-marker-soft font-bold text-marker-deep' : 'bg-desk text-ink'}`}
                    >
                      {b.name}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>

        <p className="mt-4 text-[13px] leading-[1.6] text-ink-faint sm:text-[14px]">
          개념 이름과 연결은 앱에 실린 그대로예요. 문제 위의 표시는 설명을 위해 그렸어요.
        </p>
      </Container>
    </section>
  )
}
