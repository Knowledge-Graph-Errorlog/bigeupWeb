import { Link, useLocation } from 'react-router'

// 글자 로고. 디자이너 로고가 오면 이 컴포넌트만 바꾼다 (지금은 로고 그림 없이 이름만).
export default function Logo({ className = '' }: { className?: string }) {
  const { pathname } = useLocation()
  const cls = `inline-flex items-center text-[19px] font-extrabold tracking-[-0.03em] ${className}`
  // 랜딩에서는 맨 위로 미끄러지듯 올라간다 (useSmoothAnchors)
  return pathname === '/' ? (
    <a href="#top" className={cls} aria-label="기출비급 맨 위로">
      기출비급
    </a>
  ) : (
    <Link to="/" className={cls} aria-label="기출비급 홈">
      기출비급
    </Link>
  )
}
