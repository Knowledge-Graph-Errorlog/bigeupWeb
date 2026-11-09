import { SUBJECT_NAME, type Product, type Subject } from '../data/products'

const BG: Record<Subject, string> = {
  prob: 'bg-book-prob',
  algebra: 'bg-book-algebra',
  calc: 'bg-book-calc',
}

// 임시 표지. 실제 표지 이미지가 생기면 바꾼다.
function Cover({ subject, className = '' }: { subject: Subject; className?: string }) {
  return (
    <div
      className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-sm p-[9%] pl-[16%] text-white shadow-md ${BG[subject]} ${className}`}
    >
      {/* 옛 책처럼 왼쪽을 실로 꿰맨 자국 */}
      <div className="absolute inset-y-0 left-[6%] flex flex-col justify-evenly">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="block size-[3px] rounded-full bg-white/50" />
        ))}
      </div>
      <span className="text-[0.6em] font-bold tracking-widest text-white/70">2028 수능 수학</span>
      <div>
        <div className="mb-[6%] inline-block rounded-sm bg-white/90 px-[6%] py-[3%] text-[0.7em] font-bold text-ink">
          기출비급
        </div>
        <div className="text-[1.1em] leading-tight font-bold">{SUBJECT_NAME[subject]}</div>
      </div>
      <span className="self-end rounded-sm border border-white/60 px-1 text-[0.55em] font-bold">秘</span>
    </div>
  )
}

export default function BookCover({ product, className = '' }: { product: Product; className?: string }) {
  if (product.kind === 'single') return <Cover subject={product.subjects[0]} className={className} />

  // 3권 패스는 세 권을 겹쳐 보여 준다
  return (
    <div className={`relative aspect-[3/4] ${className}`}>
      {product.subjects.map((s, i) => (
        <div
          key={s}
          className="absolute w-[70%] text-[0.7em]"
          style={{ left: `${i * 15}%`, top: `${i * 4}%`, zIndex: i }}
        >
          <Cover subject={s} />
        </div>
      ))}
    </div>
  )
}
