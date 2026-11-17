import { useMemo, useState } from 'react'
import { DEMO_PROBLEMS } from '../../data/conceptDemo'
import { Container, SectionTitle } from './ui'

// 과정 순서 (위가 수능 과목, 아래로 갈수록 먼저 배운 것)
const LEVELS = ['확률과 통계', '대수', '미적분Ⅰ', '공통수학2', '공통수학1', '중3', '중2', '중1']
const LEVEL_NAME: Record<string, string> = { 중1: '중학교 1학년', 중2: '중학교 2학년', 중3: '중학교 3학년' }
/** 받침에 따라 을/를 */
const eul = (word: string) => ((word.charCodeAt(word.length - 1) - 0xac00) % 28 > 0 ? '을' : '를')
const isMiddle = (subject: string) => subject.startsWith('중')

// 직접 눌러 보는 데모: 수능 문제 하나에 쓰인 개념, 그리고 그 개념을 알려면 먼저 알아야 하는 개념.
// 데이터는 앱에 실린 콘텐츠 그대로다 (src/data/conceptDemo.ts).
export default function ConceptDemo() {
  const [p, setP] = useState(1)
  const [c, setC] = useState(0)
  const problem = DEMO_PROBLEMS[p]
  const concept = problem.concepts[Math.min(c, problem.concepts.length - 1)]

  const groups = useMemo(
    () => LEVELS.map((level) => ({ level, items: concept.before.filter((b) => b.subject === level) })).filter((g) => g.items.length > 0),
    [concept],
  )
  const middle = concept.before.filter((b) => isMiddle(b.subject)).length

  return (
    <section id="concept" className="bg-desk py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <SectionTitle>
            한 문제를 풀려면
            <br />
            개념이 몇 개나 필요할까요?
          </SectionTitle>
          <p className="max-w-[46ch] text-[16px] leading-[1.75] text-ink-soft sm:text-[17px]">
            문제를 고르고 개념을 눌러 보세요. 그 개념을 알기 전에 먼저 알아야 하는 개념이 중학교 과정까지 이어져 있어요.
          </p>
        </div>

        <div className="reveal mt-10 overflow-hidden rounded-3xl bg-sheet shadow-[0_1px_2px_rgba(20,22,26,0.06)] sm:mt-14 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* 왼쪽: 문제와 그 문제에 쓰인 개념 */}
          <div className="border-b border-line p-5 sm:p-8 lg:border-r lg:border-b-0 lg:p-10">
            <div role="tablist" aria-label="문제 고르기" className="flex flex-wrap gap-2">
              {DEMO_PROBLEMS.map((d, i) => (
                <button
                  key={d.label}
                  type="button"
                  role="tab"
                  aria-selected={p === i}
                  onClick={() => {
                    setP(i)
                    setC(0)
                  }}
                  className={`h-11 rounded-full px-4 text-[14px] font-bold transition-colors sm:text-[15px] ${
                    p === i ? 'bg-ink text-white' : 'bg-desk text-ink-soft hover:text-ink'
                  }`}
                >
                  {d.label.replace('학년도 수능', ' 수능')}
                </button>
              ))}
            </div>

            <p className="mt-8 font-exam text-[15px] text-ink-soft">확률과 통계 · {problem.label} [{problem.points}점]</p>
            <p className="mt-2 text-[19px] leading-[1.5] font-bold tracking-[-0.02em] sm:text-[21px]">
              이 문제에 쓰인 개념 {problem.concepts.length}개
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {problem.concepts.map((k, i) => (
                <li key={k.name}>
                  <button
                    type="button"
                    aria-pressed={c === i}
                    onClick={() => setC(i)}
                    className={`min-h-11 rounded-lg border px-3.5 py-2 text-left text-[15px] leading-[1.35] font-bold transition-colors sm:text-[16px] ${
                      c === i ? 'border-pen bg-pen-soft text-pen-deep' : 'border-line bg-sheet text-ink hover:border-ink-faint'
                    }`}
                  >
                    {k.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 오른쪽: 고른 개념을 알려면 먼저 알아야 하는 개념 */}
          <div className="p-5 sm:p-8 lg:p-10" aria-live="polite">
            <p className="text-[15px] text-ink-soft">‘{concept.name}’{eul(concept.name)} 알려면 먼저 알아야 하는 개념</p>
            <p className="mt-1 text-[30px] leading-[1.2] font-extrabold tracking-[-0.03em] tabular-nums sm:text-[38px]">
              {concept.before.length}개
              {middle > 0 && <span className="ml-3 text-[17px] font-bold tracking-[-0.01em] text-marker-deep sm:text-[19px]">그중 중학교 개념 {middle}개</span>}
            </p>

            <dl key={`${p}-${c}`} className="mt-7 space-y-5">
              {groups.map((g) => (
                <div key={g.level} className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                  <dt className={`pt-1.5 text-[14px] font-bold ${isMiddle(g.level) ? 'text-marker-deep' : 'text-ink-faint'}`}>{LEVEL_NAME[g.level] ?? g.level}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {g.items.map((b) => (
                      <span
                        key={b.name}
                        className={`rounded-md px-2.5 py-1.5 text-[14px] leading-[1.3] sm:text-[15px] ${
                          isMiddle(b.subject) ? 'bg-marker-soft font-bold text-marker-deep' : 'bg-desk text-ink'
                        }`}
                      >
                        {b.name}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-4 text-[13px] leading-[1.6] text-ink-faint sm:text-[14px]">
          앱에 실린 개념 연결을 그대로 보여 드려요. 앱에서는 이 개념들을 눌러 개념 책에서 바로 다시 볼 수 있어요.
        </p>
      </Container>
    </section>
  )
}
