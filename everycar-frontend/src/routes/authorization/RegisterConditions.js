import style from "../../css/routes/authorization/registerConditions.module.scss";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 임포트

function RegisterConditions() {
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleTermsChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const handlePrivacyChange = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 체크박스가 모두 선택되지 않았다면 alert을 띄우고, 선택되었다면 다음 단계로 진행
    if (!isTermsChecked || !isPrivacyChecked) {
      alert('이용 약관과 개인정보 수집 동의에 모두 동의해야 합니다.');
    } else {
        navigate('/auth/register');  // 페이지 이동
    }
  };

  // 두 체크박스가 모두 체크되었을 때 버튼을 활성화
  React.useEffect(() => {
    if (isTermsChecked && isPrivacyChecked) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isTermsChecked, isPrivacyChecked]);

  return (
    <div className={style.cont}>
      <h2>회원가입 약관</h2>
      <p>에브리카를 찾아주셔서 감사합니다.<br></br>
      다음 약관을 꼼꼼하게 읽고 두 가지 약관에 모두 동의하셔야 회원가입을 진행할 수 있습니다.
      </p>
      <div className={style.detail}>
        <div className={style.conditions}>
          <h3>이용 약관 (필수)</h3>
          <div className={style.detailConditions}>
            제 1조<br></br> (목적) 본 약관은 "에브리카" 서비스(이하
            "서비스")에서 제공하는 웹사이트 및 모바일 애플리케이션을 이용하는
            회원과 "에브리카" 간의 권리, 의무 및 책임사항을 규정하는 것을
            목적으로 합니다.
            <br></br>
            <br></br>제 2조 (회원가입) 회원가입은 사용자가 본 약관에 동의하고,
            필요한 정보를 제공하여 신청하는 절차를 포함합니다. 회원가입을 위해
            제공하는 정보는 정확하고 최신의 정보여야 하며, 허위 정보 제공 시
            회원 자격이 박탈될 수 있습니다.
            <br></br>
            <br></br>제 3조 (서비스의 제공) "에브리카"는 회원에게 차량 예약,
            결제, 대여 등의 서비스를 제공합니다. 서비스의 구체적인 내용과 조건은
            회사의 정책에 따라 변경될 수 있습니다.
            <br></br>
            <br></br>제 4조 (회원의 의무) 회원은 서비스를 이용함에 있어 법령 및
            회사의 정책을 준수해야 하며, 타인의 권리를 침해하거나 부정한
            방법으로 서비스를 이용해서는 안 됩니다. 회원은 서비스 이용 중 발생한
            모든 활동에 대해 책임을 지며, 제3자에게 피해를 주지 않도록 유의해야
            합니다.
            <br></br>
            <br></br>제 5조 (개인정보 보호) "에브리카"는 회원의 개인정보 보호를
            중요시하며, 개인정보 처리 방침에 따라 이를 처리합니다. 회원은
            언제든지 자신의 개인정보를 열람, 수정하거나 삭제할 수 있습니다.
            <br></br>
            <br></br>제 6조 (이용 요금 및 결제) "에브리카" 서비스 이용 시 요금이
            부과될 수 있으며, 요금은 차량 대여 기간, 예약 조건, 결제 수단에 따라
            달라질 수 있습니다. 결제 과정에서 발생한 모든 비용에 대해서는 회원이
            부담합니다.
            <br></br>
            <br></br>제 7조 (계약 해지) 회원은 언제든지 서비스 이용을 중지할 수
            있으며, 회원 탈퇴를 통해 계정을 해지할 수 있습니다. 회사는 회원이 본
            약관을 위반한 경우, 서비스 이용을 중지하고 계정을 해지할 수
            있습니다.
            <br></br>
            <br></br>제 8조 (책임의 한계) "에브리카"는 서비스의 제공에 있어
            회원에게 발생한 손해에 대해 책임을 지지 않습니다. 다만, 회사의
            고의나 중대한 과실로 인한 손해에 대해서는 회사가 책임을 집니다.
            <br></br>
            <br></br>제 9조 (서비스의 변경 및 종료) "에브리카"는 서비스의 개선을
            위해 서비스 내용이나 운영 정책을 변경할 수 있으며, 변경 사항은
            사전에 공지됩니다. 회사는 필요에 따라 서비스의 일부 또는 전부를
            중단하거나 종료할 수 있습니다.
            <br></br>
            <br></br>제 10조 (기타) 본 약관에 명시되지 않은 사항은 관련 법령에
            따르며, 분쟁 발생 시 회사가 정한 절차에 따라 해결합니다. 회원은 본
            약관에 대한 변경 사항을 주기적으로 확인할 책임이 있습니다.
          </div>
          <div className={style.agree}>
            <label htmlFor="agree1">
              <input
                id="agree1"
                type="checkbox"
                checked={isTermsChecked}
                onChange={handleTermsChange}
              />
              동의합니다
            </label>
          </div>
        </div>
        <div className={style.conditions}>
          <h3>개인정보 이용 동의서 (필수)</h3>
          <div className={style.detailConditions}>
            제 1조 (개인정보 수집 항목) "에브리카"는 회원가입을 위한 서비스
            제공, 계약 이행 등을 위해 아래와 같은 개인정보를 수집합니다: 필수
            항목: 이름, 연락처, 이메일 주소, 주소, 생년월일 선택 항목: 성별,
            선호 차량 유형, 차량 대여 이력 등 
            <br></br><br></br>
            제 2조 (개인정보 수집 및 이용
            목적) "에브리카"는 회원의 개인정보를 다음과 같은 목적으로 수집하고
            이용합니다: 서비스 제공 및 계약 이행 회원 식별 및 인증, 고객 상담 및
            서비스 제공 예약, 결제, 대여 기록 관리 및 고객 피드백 수집 프로모션
            및 이벤트 정보 제공 제 
            <br></br><br></br>
            3조 (개인정보 보유 및 이용 기간) 회원의
            개인정보는 회원 탈퇴 또는 개인정보 삭제 요청 시까지 보유됩니다.
            다만, 관계 법령에 의해 보존해야 하는 정보는 법정 보존 기간 동안
            보유합니다. 
            <br></br><br></br>
            제 4조 (개인정보 제3자 제공 및 공유) "에브리카"는 회원의
            개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 의한 요구가
            있을 경우, 또는 서비스 제공을 위해 외부 업체와 협력하는 경우에는
            회원의 동의를 거쳐 개인정보를 제공할 수 있습니다. 
            <br></br><br></br>
            제 5조 (개인정보
            처리 위탁) "에브리카"는 개인정보 처리 업무를 외부 업체에 위탁할 수
            있습니다. 위탁된 업체는 개인정보 보호를 위한 법적 책임을 지며, 위탁
            사항에 대해 회원에게 고지합니다. 
            <br></br><br></br>
            제 6조 (회원의 권리) 회원은
            언제든지 본인의 개인정보를 열람, 수정, 삭제할 수 있으며, 개인정보
            처리에 대한 동의를 철회할 수 있습니다. 개인정보 수정 및 삭제를
            원하실 경우, 고객센터 또는 설정 메뉴를 통해 직접 처리할 수 있습니다.
            <br></br><br></br>
            제 7조 (동의 거부 및 불이익) 개인정보 제공 및 동의는 필수 항목과
            선택 항목으로 구분되며, 선택 항목에 동의하지 않아도 서비스 이용에
            불이익이 발생하지 않습니다. 단, 필수 항목에 대한 동의 거부 시 서비스
            제공이 제한될 수 있습니다.
          </div>
          <div className={style.agree}>
            <label htmlFor="agree2">
              <input
                id="agree2"
                type="checkbox"
                checked={isPrivacyChecked}
                onChange={handlePrivacyChange}
              />
              동의합니다
            </label>
          </div>
        </div>
      </div>
      <button
        className={style.next}
        onClick={handleSubmit}
        disabled={isButtonDisabled}
      >
        다음단계
      </button>
    </div>
  );
}

export default RegisterConditions;
