import { useEffect } from 'react'

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * 페이지 안 링크(#id)와 로고(#top)를 누르면 뚝 끊기지 않고 미끄러지듯 이동한다.
 * 거리에 따라 0.8~1.6초. 사용자가 휠·터치하면 멈추고, 모션 줄이기 설정이면 바로 이동한다.
 * 고정 헤더 높이는 html 의 scroll-padding-top 을 따른다.
 */
export function useSmoothAnchors() {
  useEffect(() => {
    let raf = 0
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a) return
      const id = decodeURIComponent(a.getAttribute('href')!.slice(1))
      const target = id === '' || id === 'top' ? document.body : document.getElementById(id)
      if (!target) return
      e.preventDefault()
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      const to = target === document.body ? 0 : Math.max(0, target.getBoundingClientRect().top + window.scrollY - pad)
      const from = window.scrollY
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, to)
        return
      }
      const duration = Math.min(1600, Math.max(800, Math.abs(to - from) * 0.5))
      const t0 = performance.now()
      stop()
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / duration)
        window.scrollTo(0, from + (to - from) * easeInOutCubic(t))
        raf = t < 1 ? requestAnimationFrame(step) : 0
      }
      raf = requestAnimationFrame(step)
    }
    document.addEventListener('click', onClick)
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    return () => {
      stop()
      document.removeEventListener('click', onClick)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
    }
  }, [])
}
