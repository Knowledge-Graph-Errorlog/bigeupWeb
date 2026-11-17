import coverAlgebra from '../assets/app/cover-algebra-480.webp'
import coverCalc from '../assets/app/cover-calc-480.webp'
import coverProb from '../assets/app/cover-prob-480.webp'
import { SUBJECT_NAME, type Product, type Subject } from '../data/products'

// 앱 홈 화면에 실제로 보이는 책 표지를 그대로 쓴다 (앱 화면 캡처).
const COVER: Record<Subject, string> = { prob: coverProb, algebra: coverAlgebra, calc: coverCalc }

function Cover({ subject, className = '' }: { subject: Subject; className?: string }) {
  return (
    <img
      src={COVER[subject]}
      alt={`기출비급 ${SUBJECT_NAME[subject]} 표지`}
      width={480}
      height={657}
      loading="lazy"
      className={`block aspect-[480/657] w-full rounded-[6%/4.4%] object-cover shadow-[0_1px_2px_rgba(20,22,26,0.08),0_10px_28px_-8px_rgba(20,22,26,0.22)] ${className}`}
    />
  )
}

export default function BookCover({ product, className = '' }: { product: Product; className?: string }) {
  if (product.kind === 'single') return <Cover subject={product.subjects[0]} className={className} />

  // 3권 패스는 세 권을 겹쳐 보여 준다
  return (
    <div className={`relative aspect-[480/560] ${className}`}>
      {product.subjects.map((s, i) => (
        <div key={s} className="absolute w-[64%]" style={{ left: `${i * 18}%`, top: `${i * 7}%`, zIndex: i }}>
          <Cover subject={s} />
        </div>
      ))}
    </div>
  )
}
