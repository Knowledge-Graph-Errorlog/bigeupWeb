import type { ReactNode } from 'react'
import chatA from '../../assets/app/chat-640.webp'
import chatB from '../../assets/app/chat-972.webp'
import bookA from '../../assets/app/concept-book-800.webp'
import bookB from '../../assets/app/concept-book-1400.webp'
import explainA from '../../assets/app/explain-640.webp'
import explainB from '../../assets/app/explain-1024.webp'
import toc from '../../assets/app/toc-692.webp'
import noteA from '../../assets/app/wrong-note-900.webp'
import noteB from '../../assets/app/wrong-note-1600.webp'
import { Container, SectionTitle } from './ui'

function Tile({ title, children, className = '', media }: { title: string; children: ReactNode; className?: string; media: ReactNode }) {
  return (
    <article className={`flex flex-col overflow-hidden rounded-3xl bg-desk ${className}`}>
      <div className="p-6 sm:p-8">
        <h3 className="text-[20px] leading-[1.4] font-extrabold tracking-[-0.02em] sm:text-[23px]">{title}</h3>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.75] text-ink-soft sm:text-[16px]">{children}</p>
      </div>
      <div className="mt-auto">{media}</div>
    </article>
  )
}

const shot = 'block w-full bg-sheet shadow-[0_-1px_0_rgba(20,22,26,0.04),0_14px_40px_-16px_rgba(20,22,26,0.3)]'

// 그 밖의 기능. 칸마다 실제 앱 화면의 한 부분을 잘라 넣고, 칸 크기를 서로 다르게 둔다.
export default function Extras() {
  return (
    <section className="bg-sheet py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionTitle>
          그 밖에, 기출 공부에
          <br />
          필요한 것은 모두 들어 있어요
        </SectionTitle>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-12">
          <Tile
            title="읽고 나면 혼자 써 낼 수 있는 해설"
            className="lg:col-span-6 lg:row-span-2"
            media={
              <div className="mx-6 sm:mx-8">
                <img src={explainB} srcSet={`${explainA} 640w, ${explainB} 1024w`} sizes="(min-width: 1024px) 40vw, 86vw" alt="해설 화면. 번호가 붙은 풀이 단계마다 그 단계에서 쓴 개념 이름표가 달려 있고, 수직선 그림, 다른 풀이, 사용된 공식이 이어진다." loading="lazy" decoding="async" className={`${shot} rounded-t-2xl`} />
              </div>
            }
          >
            해설은 교과서에서 배우는 개념만으로, 한 단계에 한 가지 생각씩 적었어요. 단계마다 그 단계에서 쓴 개념이 함께 붙어
            있어서, 왜 그 식을 세웠는지 따라갈 수 있어요. 그림이 필요한 문제는 그림으로 보여 주고, 다른 길로 푸는 방법도 함께
            실었어요.
          </Tile>

          <Tile
            title="풀던 화면에서 바로 질문"
            className="lg:col-span-6"
            media={
              <div className="mx-6 mb-6 sm:mx-8 sm:mb-8">
                <img src={chatB} srcSet={`${chatA} 640w, ${chatB} 972w`} sizes="(min-width: 1024px) 40vw, 86vw" alt="AI 선생님 대화. ‘(나) 조건은 뭐부터 봐야 해요?’라는 질문에 ‘양 끝 2f(1)과 2f(6)부터 보세요’라고 답한다." loading="lazy" decoding="async" className={`${shot} max-w-[520px] rounded-2xl`} />
              </div>
            }
          >
            AI 선생님은 지금 보고 있는 문제와 내가 쓴 풀이를 함께 읽고 답해요. 사진을 찍거나 풀이를 옮겨 적을 필요가 없어요.
            해설을 읽다가 막힌 부분도 그대로 이어서 물어볼 수 있어요.
          </Tile>

          <Tile
            title="개념 책"
            className="lg:col-span-6"
            media={
              <div className="ml-6 overflow-hidden rounded-tl-2xl sm:ml-8 lg:h-[300px]">
                <img src={bookB} srcSet={`${bookA} 800w, ${bookB} 1400w`} sizes="(min-width: 1024px) 50vw, 90vw" alt="개념 책의 중복조합 페이지. 뜻, 공식, 이해하기 순서로 설명이 이어진다." loading="lazy" decoding="async" className={`${shot} rounded-tl-2xl`} />
              </div>
            }
          >
            막힌 개념이 있으면 개념서를 따로 펼치지 않고 그 자리에서 다시 볼 수 있어요. 공식만 외우는 대신 그 공식이 왜
            성립하는지부터 읽을 수 있고, 중학교 개념이 기억나지 않으면 그 개념도 같은 방식으로 다시 볼 수 있어요.
          </Tile>

          <Tile
            title="오답 노트"
            className="lg:col-span-7"
            media={
              <div className="ml-6 sm:ml-8">
                <img src={noteB} srcSet={`${noteA} 900w, ${noteB} 1600w`} sizes="(min-width: 1024px) 50vw, 90vw" alt="오답 노트 화면. 왼쪽에 대표 개념별 묶음, 오른쪽에 미해결 오답 카드가 놓여 있다." loading="lazy" decoding="async" className={`${shot} rounded-tl-2xl`} />
              </div>
            }
          >
            틀린 문제는 따로 옮겨 적지 않아도 채점하는 순간 오답 노트에 개념별로 모여요. 내가 어떤 개념에서 자주 틀리는지
            한눈에 보이고, 시험 전에는 아직 못 푼 문제만 골라 다시 풀면 돼요.
          </Tile>

          <Tile
            title="유형별, 쉬운 문제부터"
            className="lg:col-span-5"
            media={
              <div className="mx-6 h-[280px] overflow-hidden rounded-t-2xl sm:mx-8 lg:h-[250px]">
                <img src={toc} alt="기출 목차. 중복조합 유형 안에서 3점, 4점 난이도 하, 중, 상 순서로 문제 번호가 놓여 있다." loading="lazy" decoding="async" className={`${shot} -mt-[38%]`} />
              </div>
            }
          >
            유형 안에서 2점, 3점, 4점 순서로, 4점은 난이도 하, 중, 상 순서로 놓여 있어요. 쉬운 문제로 개념을 확인한 다음 어려운
            문제로 넘어갈 수 있어요.
          </Tile>
        </div>
      </Container>
    </section>
  )
}
