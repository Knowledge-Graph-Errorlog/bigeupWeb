// 외부 SDK 스크립트를 한 번만 불러온다 (토스·구글·애플).
const loading = new Map<string, Promise<void>>()

export function loadScript(src: string): Promise<void> {
  let p = loading.get(src)
  if (!p) {
    p = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => {
        loading.delete(src)
        reject(new Error(`스크립트를 불러오지 못했어요: ${src}`))
      }
      document.head.appendChild(s)
    })
    loading.set(src, p)
  }
  return p
}
