import { Link } from 'react-router'

// 임시 로고. 디자이너 로고(피그마)가 오면 이 컴포넌트만 바꾼다.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`} aria-label="기출비급 홈">
      <span className="grid size-8 place-items-center rounded-md bg-seal text-sm font-bold text-white">
        秘
      </span>
      <span className="text-lg font-bold tracking-tight">기출비급</span>
    </Link>
  )
}
