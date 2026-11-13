import { Link } from 'react-router'
import LegalPage, { Article, Items } from '../../components/LegalPage'
import { COMPANY, SHOW_AI_TOPUP, USE_PERIOD, contactText } from '../../data/company'

// 이용약관. ❓ 법률 검토 전 초안이다 (앱 가입 화면의 '이용약관'도 이 주소를 연다).
export default function Terms() {
  return (
    <LegalPage title="이용약관" current="/terms">
      <Article title="제1조 (목적)">
        <p>
          이 약관은 {COMPANY.name}(이하 "회사")가 제공하는 {COMPANY.service} 앱과 웹사이트(이하 "서비스")를 이용하는 데 필요한
          회사와 회원의 권리, 의무와 책임을 정합니다.
        </p>
      </Article>

      <Article title="제2조 (용어)">
        <Items>
          <li>"회원"은 이 약관에 동의하고 소셜 계정(카카오·구글·애플·네이버)으로 가입한 사람입니다.</li>
          <li>"교재"는 회사가 판매하는 디지털 기출문제집(과목별 단권, 기출비급패스 3권)과 그 이용 권한입니다.</li>
          <li>"AI 선생님"은 문제·풀이에 대한 질문에 인공지능이 답하는 기능입니다.</li>
        </Items>
      </Article>

      <Article title="제3조 (약관의 게시와 변경)">
        <Items>
          <li>회사는 이 약관을 웹사이트와 앱에 게시합니다.</li>
          <li>회사는 관련 법령을 어기지 않는 범위에서 약관을 바꿀 수 있으며, 바꾸기 7일 전(회원에게 불리하면 30일 전)부터 시행일과 바뀐 내용을 알립니다.</li>
          <li>회원이 바뀐 약관에 동의하지 않으면 이용 계약을 해지(계정 삭제)할 수 있습니다.</li>
        </Items>
      </Article>

      <Article title="제4조 (가입)">
        <Items>
          <li>만 14세 이상인 사람만 가입할 수 있습니다.</li>
          <li>가입은 소셜 계정으로 로그인한 뒤 약관에 동의하고 프로필(닉네임 등)을 만들면 끝납니다.</li>
          <li>다른 소셜 계정으로 들어오면 별도의 회원이 됩니다. 산 교재는 결제한 계정에서만 이용할 수 있습니다.</li>
        </Items>
      </Article>

      <Article title="제5조 (서비스와 이용 기기)">
        <Items>
          <li>교재는 펜을 쓸 수 있는 태블릿(iPad, 갤럭시 탭)의 {COMPANY.service} 앱에서 이용합니다. 휴대폰과 PC에서는 이용할 수 없습니다.</li>
          <li>회사는 서비스 개선을 위해 화면, 기능, 콘텐츠의 구성을 바꿀 수 있습니다. 회원에게 중요한 변경은 미리 알립니다.</li>
          <li>설비 점검, 장애, 천재지변 등으로 서비스가 잠시 중단될 수 있습니다.</li>
        </Items>
      </Article>

      <Article title="제6조 (교재 구매와 이용 기간)">
        <Items>
          <li>교재는 웹사이트에서 결제합니다. 결제는 토스페이먼츠를 통해 이루어집니다.</li>
          <li><strong className="text-ink">교재 이용 기간은 {USE_PERIOD}입니다.</strong></li>
          <li>
            교재에는 상품 설명에 적힌 AI 선생님 질문 횟수가 포함됩니다.
            {SHOW_AI_TOPUP && ' 횟수를 다 쓰면 앱에서 추가 사용량을 살 수 있습니다.'}
          </li>
          <li>이용 기간이 끝나도 회원의 공부 기록은 보관하며, 다시 구매하면 이어서 이용할 수 있습니다.</li>
        </Items>
      </Article>

      <Article title="제7조 (청약철회와 환불)">
        <p>
          청약철회와 환불은 <Link to="/refund" className="underline">환불·배송 정책</Link>을 따릅니다.
        </p>
      </Article>

      <Article title="제8조 (AI 선생님)">
        <Items>
          <li>AI 선생님의 답은 인공지능이 만든 것으로 틀릴 수 있습니다. 해설과 함께 참고용으로 이용해 주세요.</li>
          <li>AI 선생님을 쓰려면 '질문 내용 저장·분석'에 동의해야 합니다.</li>
          <li>답을 제대로 받지 못한 질문, 회사가 걸러 낸 질문, 읽을 수 없는 풀이는 사용 횟수에서 빼지 않습니다.</li>
        </Items>
      </Article>

      <Article title="제9조 (회원의 의무)">
        <Items>
          <li>회원은 계정을 다른 사람에게 팔거나 빌려주지 않습니다.</li>
          <li>교재의 문제, 해설, 그림 등 콘텐츠를 회사 허락 없이 복제, 배포, 판매하지 않습니다.</li>
          <li>서비스를 비정상적인 방법으로 이용하거나 운영을 방해하지 않습니다.</li>
        </Items>
      </Article>

      <Article title="제10조 (계약 해지와 이용 제한)">
        <Items>
          <li>회원은 앱의 설정 › 계정에서 언제든지 계정을 삭제할 수 있습니다. 삭제하면 공부 기록, 교재, 남은 AI 사용량이 사라지고 되돌릴 수 없습니다. 결제 기록은 법에 따라 5년 동안 보관합니다.</li>
          <li>회원이 제9조를 어기면 회사는 이용을 제한하거나 계약을 해지할 수 있습니다.</li>
        </Items>
      </Article>

      <Article title="제11조 (저작권)">
        <p>
          서비스 안의 해설, 개념 설명, 디자인 등 회사가 만든 콘텐츠의 저작권은 회사에 있습니다. 기출문제의 저작권은 출제
          기관에 있습니다.
        </p>
      </Article>

      <Article title="제12조 (책임의 제한)">
        <Items>
          <li>회사는 천재지변 등 불가항력이나 회원의 잘못으로 생긴 손해에는 책임을 지지 않습니다.</li>
          <li>회사는 서비스 이용으로 특정 성적을 얻는 것을 보장하지 않습니다.</li>
        </Items>
      </Article>

      <Article title="제13조 (분쟁 해결)">
        <p>
          서비스 이용에 관한 분쟁은 대한민국 법을 따르며, 소송은 민사소송법에 따른 관할 법원에 제기합니다. 문의는
          고객센터({contactText()})로 해 주세요.
        </p>
      </Article>

      <Article title="사업자 정보">
        <p>
          상호 {COMPANY.name} · 대표자 {COMPANY.ceo} · 사업자등록번호 {COMPANY.bizNo} · 통신판매업 신고번호 {COMPANY.mailOrderNo}
          <br />
          주소 {COMPANY.address}
        </p>
      </Article>
    </LegalPage>
  )
}
