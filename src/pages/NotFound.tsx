import { Link } from 'react-router'

export default function NotFound({ message = '찾는 페이지가 없어요' }: { message?: string }) {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">{message}</h1>
      <div className="mt-8 flex justify-center gap-2">
        <Link to="/" className="rounded-xl border border-line bg-white px-5 py-3 font-bold">
          홈으로
        </Link>
        <Link to="/pass" className="rounded-xl bg-seal px-5 py-3 font-bold text-white">
          기출비급패스 보기
        </Link>
      </div>
    </div>
  )
}
