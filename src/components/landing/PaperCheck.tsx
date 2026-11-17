import commentA from '../../assets/app/comment-640.webp'
import commentB from '../../assets/app/comment-1000.webp'
import afterA from '../../assets/app/paper-after-700.webp'
import afterB from '../../assets/app/paper-after-1200.webp'
import beforeA from '../../assets/app/paper-before-700.webp'
import beforeB from '../../assets/app/paper-before-1200.webp'

const SIZES = '92vw'
const card = 'overflow-hidden rounded-2xl border border-line bg-sheet shadow-[0_18px_44px_-18px_rgba(20,22,26,0.35)]'

/**
 * 휴대폰용 풀이 점검 장면. 태블릿 화면 전체를 줄이면 글씨가 안 보여서,
 * 같은 화면에서 문제지와 AI 선생님 말만 크게 잘라 겹쳐 놓는다.
 * swept 가 false 면 점검 전 종이만 보이고, true 가 되면 빨간 형광펜이 그어지고 설명이 뜬다.
 */
export default function PaperCheck({ swept = true, eager = false }: { swept?: boolean; eager?: boolean }) {
  return (
    <div className="relative pb-[21%]">
      <div className={`relative aspect-[652/408] ${card}`}>
        <img src={beforeB} srcSet={`${beforeA} 700w, ${beforeB} 1200w`} sizes={SIZES} alt="" loading={eager ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover" />
        <img
          src={afterB}
          srcSet={`${afterA} 700w, ${afterB} 1200w`}
          sizes={SIZES}
          alt="펜으로 쓴 풀이의 넷째 줄에 빨간 형광펜과 (1) 번호가 표시되어 있다."
          loading={eager ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover transition-[clip-path] delay-300 duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
          style={{ clipPath: swept ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
        />
      </div>
      <div
        className={`absolute right-0 bottom-0 w-[88%] transition-[opacity,translate] delay-[1300ms] duration-700 ease-out-quart motion-reduce:transition-none ${card} ${
          swept ? 'opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <img
          src={commentB}
          srcSet={`${commentA} 640w, ${commentB} 1000w`}
          sizes={SIZES}
          alt="AI 선생님의 풀이 점검: 3번째 줄까지 맞아요. (1)에서 f(2)~f(5)의 범위를 2f(6)까지로 생각한 것 같은데, X의 원소는 6까지이므로 그 안에서 생각해야 해요."
          loading={eager ? 'eager' : 'lazy'}
          className="block h-auto w-full"
        />
      </div>
    </div>
  )
}
