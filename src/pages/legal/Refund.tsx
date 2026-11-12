import { Link } from 'react-router'
import LegalPage, { Article, Items } from '../../components/LegalPage'
import { COMPANY, USE_PERIOD, contactText } from '../../data/company'

// 환불·배송 정책. 토스페이먼츠 카드사 심사: 환불과 배송(무형 상품은 제공 방법·제공 기간) 정책이 자세히 보여야 한다.
// ❓ 환불 조건(7일·AI 질문 미사용)은 팀 확정 전이다. 바뀌면 여기, 주문 화면, 자주 묻는 질문을 같이 고친다.
export default function Refund() {
  return (
    <LegalPage title="환불·배송 정책" current="/refund">
      <Article title="1. 배송(제공) 안내와 이용 기간">
        <p>
          {COMPANY.service} 교재(기출비급패스 3권, 과목별 단권)는 태블릿 앱에서 이용하는 디지털 콘텐츠입니다.
        </p>
        <Items>
          <li>
            <strong className="text-ink">실물 배송이 없습니다.</strong> 택배로 보내는 책이나 상품이 없고, 배송비도 없습니다.
          </li>
          <li>
            <strong className="text-ink">결제가 끝나면 바로 제공됩니다.</strong> 결제한 계정에 교재가 즉시 열립니다.
          </li>
          <li>
            태블릿(iPad, 갤럭시 탭)에 {COMPANY.service} 앱을 설치하고, 결제한 계정으로 로그인하면 이용할 수 있습니다.
          </li>
          <li>
            <strong className="text-ink">이용 기간은 {USE_PERIOD}입니다.</strong>
          </li>
          <li>결제했는데 교재가 열리지 않으면 고객센터({contactText()})로 알려 주세요. 확인해서 바로 열어 드립니다.</li>
        </Items>
      </Article>

      <Article title="2. 전액 환불">
        <p>
          <strong className="text-ink">결제일부터 7일 안에, 그 교재로 AI 선생님 질문을 한 번도 쓰지 않았다면</strong> 결제 금액
          전부를 환불합니다. 문제를 풀어 본 것만으로는 환불이 제한되지 않습니다.
        </p>
      </Article>

      <Article title="3. 환불이 제한되는 경우">
        <p>
          디지털 콘텐츠는 이용을 시작하면 되돌릴 수 없어서, 아래의 경우에는 「전자상거래 등에서의 소비자보호에 관한 법률」
          제17조 제2항에 따라 청약철회(환불)가 제한됩니다. 회사는 결제 전에 3문제 맛보기와 상품 설명으로 미리 확인할 기회를
          드립니다.
        </p>
        <Items>
          <li>결제일부터 7일이 지난 경우</li>
          <li>그 교재로 AI 선생님 질문을 1회 이상 쓴 경우</li>
        </Items>
      </Article>

      <Article title="4. 회사 사정으로 이용하지 못한 경우">
        <Items>
          <li>결제 오류, 중복 결제, 서비스 장애처럼 회사의 잘못으로 이용하지 못했다면 위 조건과 상관없이 환불합니다.</li>
          <li>콘텐츠가 상품 설명과 다르거나 계약 내용과 다르게 제공된 경우, 그 사실을 안 날부터 30일 안에(제공받은 날부터 3개월 안에) 환불을 요청할 수 있습니다.</li>
        </Items>
      </Article>

      <Article title="5. 미성년자 결제">
        <p>
          만 19세 미만 미성년자가 법정대리인(보호자)의 동의 없이 결제한 경우, 본인 또는 법정대리인이 결제를 취소할 수 있습니다.
          다만 법정대리인이 허락한 용돈 범위 안의 결제 등 법에서 정한 경우에는 취소가 제한될 수 있습니다.
        </p>
      </Article>

      <Article title="6. 앱에서 산 AI 선생님 추가 사용량">
        <p>
          앱 안에서 산 AI 선생님 추가 사용량은 Apple App Store·Google Play로 결제되며, 환불은 각 스토어의 환불 정책과 절차를
          따릅니다.
        </p>
      </Article>

      <Article title="7. 환불 요청과 처리">
        <Items>
          <li>고객센터({contactText()})로 결제한 계정과 주문 내용을 알려 주세요.</li>
          <li>회사는 요청을 받은 날부터 3영업일 안에 결제를 취소합니다. 결제한 수단으로 돌려드리며, 카드는 카드사에 따라 취소가 반영되기까지 3~7영업일이 걸릴 수 있습니다.</li>
          <li>환불되면 그 교재와 포함된 AI 선생님 질문 횟수는 바로 이용할 수 없게 됩니다.</li>
        </Items>
      </Article>

      <p className="text-sm text-ink-soft">
        그 밖의 내용은 <Link to="/terms" className="underline">이용약관</Link>을 따릅니다.
      </p>
    </LegalPage>
  )
}
