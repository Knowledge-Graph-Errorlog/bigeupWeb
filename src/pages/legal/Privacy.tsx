import LegalPage, { Article, Items } from '../../components/LegalPage'
import { COMPANY, contactText } from '../../data/company'

// 개인정보 처리방침. ❓ 법률 검토 전 초안이다 (앱 가입 화면의 '개인정보 수집·이용'도 이 주소를 연다).
// 항목은 frontend docs/출시-준비.md "앱이 다루는 정보"와 backend 저장 데이터(결제 포함)를 기준으로 썼다. 새 정보를 모으면 같이 고친다.
const COLLECT = [
  { what: '소셜 계정 회원 식별번호(카카오·구글·애플)', why: '로그인, 회원 구분', when: '가입할 때' },
  { what: '닉네임, 응시 구분(고3·N수·기타)', why: '프로필', when: '가입할 때' },
  { what: '약관·선택 동의 기록', why: '동의 확인', when: '가입·설정 변경 때' },
  { what: '공부 기록(고른 답, 채점 결과, 회차, 오답 노트), 손풀이(펜 획)', why: '공부 이어 하기, 기기 바꾸기, 풀이 점검', when: '앱을 쓸 때' },
  { what: 'AI 선생님 질문과 답, 풀이 점검 때 보낸 손풀이 그림', why: 'AI 선생님 답변, 대화 기록, 서비스 개선(동의한 경우)', when: 'AI 선생님을 쓸 때' },
  { what: '주문 번호, 상품, 결제 금액, 결제 수단 종류, 결제·취소 일시, 결제사 거래 번호', why: '결제, 환불, 구매 확인', when: '교재를 살 때' },
  { what: '휴대폰 번호', why: '얼리버드 안내 연락', when: '레벨테스트 끝에 얼리버드를 신청할 때' },
  { what: '접속 기록(IP 주소, 접속 시각, 요청 기록)', why: '보안, 장애 대응', when: '서비스를 쓸 때 자동으로' },
]

const KEEP = [
  { what: '회원 정보, 공부 기록, AI 대화, 산 교재', how: '계정을 삭제하면 바로 파기' },
  { what: '계약·청약철회, 대금 결제·재화 공급 기록', how: '5년 (전자상거래법)' },
  { what: '소비자 불만·분쟁 처리 기록', how: '3년 (전자상거래법)' },
  { what: '접속 기록', how: '3개월 (통신비밀보호법)' },
  { what: '얼리버드 휴대폰 번호', how: '안내가 끝나면 파기' },
]

const ENTRUST = [
  { who: '토스페이먼츠(주)', what: '결제 처리, 환불' },
  { who: 'Amazon Web Services', what: '서버, 데이터 저장' },
  { who: 'Anthropic, PBC (미국)', what: 'AI 선생님 답변 생성, 손풀이 읽기 — 질문 내용과 손풀이 그림을 질문할 때마다 전송' },
  { who: 'Vercel Inc. (미국)', what: '웹사이트 운영' },
  { who: 'Apple, Google', what: '앱 안 결제(AI 추가 사용량), 앱 배포' },
]

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="border border-line bg-paper-deep px-3 py-2 text-left font-bold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i} className="border border-line px-3 py-2 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Privacy() {
  return (
    <LegalPage title="개인정보 처리방침" current="/privacy">
      <p className="text-ink-soft">
        {COMPANY.name}(이하 "회사")는 {COMPANY.service} 서비스를 제공하면서 「개인정보 보호법」에 따라 이용자의 개인정보를 보호하고,
        이와 관련한 고충을 빠르게 처리하기 위해 다음과 같이 처리방침을 둡니다.
      </p>

      <Article title="1. 모으는 개인정보와 이용 목적">
        <p>회사는 이름, 이메일, 주민등록번호를 받지 않습니다. 서비스에 필요한 아래 정보만 모읍니다.</p>
        <Table head={['항목', '목적', '언제']} rows={COLLECT.map((c) => [c.what, c.why, c.when])} />
        <p>카드 번호 등 결제 수단 정보는 결제사(토스페이먼츠)가 처리하며, 회사는 카드 번호 전체를 받거나 저장하지 않습니다.</p>
      </Article>

      <Article title="2. 만 14세 미만">
        <p>만 14세 미만은 가입할 수 없습니다. 회사는 만 14세 미만 아동의 개인정보를 모으지 않습니다.</p>
      </Article>

      <Article title="3. 보유 기간과 파기">
        <Table head={['항목', '보유 기간']} rows={KEEP.map((k) => [k.what, k.how])} />
        <p>보유 기간이 끝난 정보는 다시 살릴 수 없는 방법으로 지체 없이 파기합니다.</p>
      </Article>

      <Article title="4. 처리 위탁과 국외 이전">
        <p>회사는 서비스 운영을 위해 아래 업체에 개인정보 처리를 맡깁니다.</p>
        <Table head={['받는 곳', '맡기는 일']} rows={ENTRUST.map((e) => [e.who, e.what])} />
        <p>
          국외 업체(Anthropic, Vercel)에는 서비스를 이용할 때 인터넷으로 전송되며, 위탁 목적이 끝나거나 계약이 끝나면 각 업체의
          정책에 따라 파기됩니다. 이 이전을 원하지 않으면 AI 선생님을 쓰지 않거나 계정을 삭제할 수 있습니다.
        </p>
      </Article>

      <Article title="5. 제3자 제공">
        <p>회사는 이용자의 동의나 법률에 근거가 있는 경우를 빼고 개인정보를 제3자에게 제공하지 않습니다.</p>
      </Article>

      <Article title="6. 이용자의 권리">
        <Items>
          <li>이용자는 언제든지 자신의 개인정보를 열람, 정정, 삭제, 처리 정지하도록 요청할 수 있습니다.</li>
          <li>선택 동의(질문 내용 저장·분석, 마케팅)는 앱의 설정 › 계정에서 켜고 끌 수 있습니다.</li>
          <li>계정 삭제는 앱의 설정 › 계정에서 바로 할 수 있습니다.</li>
        </Items>
      </Article>

      <Article title="7. 안전성 확보 조치">
        <Items>
          <li>전송 구간 암호화(HTTPS), 로그인 토큰의 해시 저장, 민감한 토큰의 암호화 저장</li>
          <li>개인정보에 접근할 수 있는 사람과 권한을 최소로 관리</li>
        </Items>
      </Article>

      <Article title="8. 웹사이트의 저장 기능">
        <p>웹사이트와 앱은 로그인 상태와 화면 설정을 기기 안의 저장 공간에 둡니다. 광고 목적의 추적 쿠키는 쓰지 않습니다.</p>
      </Article>

      <Article title="9. 개인정보 보호책임자">
        <p>
          개인정보 보호책임자: {COMPANY.ceo} (대표) · {contactText()}
          <br />
          개인정보 침해 신고·상담: 개인정보침해신고센터(privacy.kisa.or.kr, 국번 없이 118), 개인정보분쟁조정위원회(kopico.go.kr,
          1833-6972)
        </p>
      </Article>

      <Article title="10. 처리방침의 변경">
        <p>이 처리방침을 바꾸면 시행 7일 전부터 웹사이트에 알립니다.</p>
      </Article>
    </LegalPage>
  )
}
