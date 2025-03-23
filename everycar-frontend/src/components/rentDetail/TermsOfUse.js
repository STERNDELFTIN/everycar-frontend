import styled from 'styled-components';
import styles from '../../css/rentDetail/TermsOfUse.module.scss';
import { vwFont } from '../../utils';

const TermTitle = styled.h4`font-weight: 600; font-size: ${vwFont(10, 18)}`;

function TermsOfUse({ title, SubTitleH3 }) {
    return (
        <div className={styles.termsOfUseContainer} style={{ marginBottom: vwFont(15, 18), }}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.caution}>
                <div>
                    <TermTitle>예약 전 주의사항</TermTitle>
                    <p>
                        렌트카를 예약하기 전에 반드시 운전면허증을 지참해야 하며, 유효한 면허증이 없으면 차량을 대여할 수 없습니다. 일부 차량은 만 21세 이상 및 운전면허 취득 1년 이상이 되어야 이용할 수 있으므로 연령 제한을 확인해야 합니다. 예약을 취소하거나 변경할 경우 수수료가 발생할 수 있으므로 사전에 규정을 확인하는 것이 중요합니다. 차량을 반납할 때는 연료를 처음 상태와 동일하게 채워야 하는 경우가 많으니 연료 정책을 숙지해야 합니다. 차량을 인수할 때는 외관과 내부 상태를 꼼꼼히 확인하고, 이상이 있다면 사진을 찍어 두는 것이 좋습니다. 기본적으로 제공되는 보험 외에 추가 보험이 필요한지 확인하고, 사고 발생 시 보상 범위를 숙지해야 합니다. 차량을 정해진 시간 내에 반납하지 않으면 추가 요금이 부과될 수 있으므로 반납 시간을 반드시 준수해야 합니다. 차량 내에서는 금연이 원칙이며, 반려동물 동반이 가능한지 여부도 사전에 확인해야 합니다. 일부 렌트카는 특정 지역으로의 이동이 제한될 수 있으므로 이용 가능 지역을 반드시 확인해야 합니다. 만약 차량에 문제가 생기거나 사고가 발생하면 즉시 렌트카 업체의 고객센터로 연락하여 신속하게 대응하는 것이 중요합니다.
                    </p>
                </div>
            </div>

            <div className={styles.agree}>
                <TermTitle>약관 및 이용안내 동의</TermTitle>
                <p>
                    제1조 (목적)<br></br>
                    본 약관은 렌트카 서비스(이하 "서비스")를 이용하는 고객(이하 "이용자")과 렌트카 운영 업체(이하 "회사") 간의 권리, 의무 및 책임 사항을 규정하는 것을 목적으로 합니다.
                    <br></br><br></br>
                    제2조 (이용 자격 및 조건)<br></br>
                    이용자는 유효한 운전면허증을 소지해야 하며, 특정 차량의 경우 만 21세 이상 및 운전면허 취득 1년 이상이어야 합니다.

                    회사의 내부 정책에 따라 특정 고객에 대한 대여 제한이 있을 수 있습니다.
                    <br></br><br></br>
                    제3조 (예약 및 결제)<br></br>

                    이용자는 회사가 제공하는 온라인 또는 오프라인 예약 시스템을 통해 차량을 예약할 수 있습니다.

                    예약 후 결제까지 완료해야 차량 이용이 확정되며, 결제 방법은 회사가 정하는 기준을 따릅니다.
                    <br></br><br></br>
                    제4조 (예약 변경 및 취소)<br></br>

                    예약 취소 및 변경은 회사의 정책에 따라 진행되며, 일정 기한 이후 취소 시 수수료가 부과될 수 있습니다.

                    이용자가 정해진 시간 내에 차량을 인수하지 않을 경우, 예약이 자동 취소될 수 있습니다.
                    <br></br><br></br>
                    제5조 (차량 이용 및 반환)<br></br>

                    차량 이용 중에는 교통법규를 준수해야 하며, 불법 행위로 발생한 모든 책임은 이용자에게 있습니다.

                    차량 반납 시에는 인수 시와 동일한 상태로 반환해야 하며, 연료 부족, 차량 오염 및 손상 등이 있을 경우 추가 비용이 부과될 수 있습니다.
                    <br></br><br></br>
                    제6조 (보험 및 사고 처리)<br></br>

                    모든 차량은 기본 보험이 적용되며, 이용자는 필요에 따라 추가 보험을 가입할 수 있습니다.

                    사고 발생 시 즉시 회사에 신고해야 하며, 사고 처리 지침에 따라야 합니다.
                </p>
            </div>

        </div>
    );
}

export default TermsOfUse;