import { useState } from 'react'
import { Container, SectionTitle } from './ui'

const ITEMS = [
  '내 풀이에서 뭐가 틀렸는지 모르겠어요.',
  '비슷한 문제를 또 틀렸는데, 원인이 무엇인지 모르겠어요.',
  '해설을 읽어도 왜 그렇게 푸는지 이해가 안 돼요.',
  '정답은 맞았는데, 이게 좋은 풀이인지 모르겠어요.',
  'AI에게 물어보려면 사진을 찍고 풀이를 옮겨 적는 게 번거로워요.',
]

// 공감 → 원인. 시험지의 보기처럼 직접 골라 보게 한다 (고른 개수만 세고 아무 데도 보내지 않는다).
export default function SelfCheck() {
  const [picked, setPicked] = useState<boolean[]>(() => ITEMS.map(() => false))
  const count = picked.filter(Boolean).length

  return (
    <section className="bg-desk pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
        <div>
          <SectionTitle>
            기출을 풀면서
            <br />
            이런 적 있었나요?
          </SectionTitle>
          <p className="mt-5 text-[16px] leading-[1.7] text-ink-soft sm:text-[17px]">해당하는 것을 골라 보세요.</p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ul className="overflow-hidden rounded-2xl bg-sheet shadow-[0_1px_2px_rgba(20,22,26,0.06)]">
            {ITEMS.map((text, i) => (
              <li key={text} className={i > 0 ? 'border-t border-line' : ''}>
                <label className="flex min-h-[60px] cursor-pointer items-center gap-4 px-5 py-4 text-[16px] leading-[1.55] sm:px-6 sm:text-[17px]">
                  <input
                    type="checkbox"
                    checked={picked[i]}
                    onChange={() => setPicked((p) => p.map((v, j) => (j === i ? !v : v)))}
                    className="peer sr-only"
                  />
                  {/* 빨간 펜으로 친 체크 */}
                  <span
                    aria-hidden="true"
                    className="grid size-6 shrink-0 place-items-center rounded-[5px] border-[1.5px] border-ink-faint transition-colors peer-checked:border-pen peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pen [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
                  >
                    <svg viewBox="0 0 24 24" className="size-7 -translate-y-[3px] translate-x-[3px] text-pen transition-opacity">
                      <path d="M4 13.5 9.5 19 21.5 3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-ink peer-checked:text-ink">{text}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-3 h-6 text-[14px] text-ink-soft" aria-live="polite">
            {count > 0 && `다섯 가지 중 ${count}가지를 골랐어요.`}
          </p>
        </div>

        <div className="self-end border-l-[3px] border-pen pl-5 sm:pl-6 lg:col-start-1 lg:row-start-2 lg:mb-9">
          <h3 className="text-[20px] leading-[1.4] font-extrabold tracking-[-0.02em] sm:text-[24px]">
            해설지에는 내 풀이에 대한 설명이 없어요
          </h3>
          <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.75] text-ink-soft sm:text-[17px]">
            해설지는 정답 풀이를 기준으로 쓰여 있어요. 내 풀이가 어디서 틀렸는지, 어떤 개념이 부족했는지는 나와 있지
            않아요. 원인을 모른 채 넘어가니, 비슷한 문제를 또 틀리게 돼요.
          </p>
        </div>
      </Container>
    </section>
  )
}
