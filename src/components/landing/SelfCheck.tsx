import { Container, SectionTitle } from './ui'

const ITEMS = [
  '내 풀이에서 뭐가 틀렸는지 모르겠어요.',
  '비슷한 문제를 또 틀렸는데, 원인을 모르겠어요.',
  '해설을 읽어도 왜 그렇게 푸는지 이해가 안 돼요.',
  '정답은 맞았는데, 좋은 풀이인지 모르겠어요.',
]

// 공감 → 원인. 누르는 것 없이 읽기만 하는 섹션.
export default function SelfCheck() {
  return (
    <section className="bg-desk pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pb-24">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-16">
        <SectionTitle>
          기출을 풀면서
          <br />
          이런 적 있었나요?
        </SectionTitle>

        <div>
          <ul className="overflow-hidden rounded-2xl bg-sheet shadow-[0_1px_2px_rgba(20,22,26,0.06)]">
            {ITEMS.map((text, i) => (
              <li key={text} className={`px-5 py-4 text-[15px] leading-[1.55] sm:px-6 sm:text-[16px] ${i > 0 ? 'border-t border-line' : ''}`}>
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-l-[3px] border-pen pl-4 text-[15px] leading-[1.7] text-ink-soft sm:text-[16px]">
            <strong className="font-bold text-ink">해설지에는 내 풀이에 대한 설명이 없어요.</strong> 원인을 모른 채 넘어가니,
            비슷한 문제를 또 틀리게 돼요.
          </p>
        </div>
      </Container>
    </section>
  )
}
