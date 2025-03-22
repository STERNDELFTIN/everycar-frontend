import styles from '../../../css/routes/myPage/payment/MyPayment.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';

function MyPayment() {
    return (
        <div className={styles.myPayment}>
            <TopContent currentLocation='결제및정산' />

            <div className={styles.bottomContent}>
                <ListContainer />

                <TermsOfUse />
            </div>
        </div>
    );
}

// 이용약관
function TermsOfUse() {
    return (
        <div className={styles.termsOfUse}>
            <h6>이용약관</h6>
            <div>
            <p>사용자는 서비스 이용을 위해 필요한 최소한의 개인정보를 제공해야 하며, 제공된 정보는 서비스 제공 목적으로만 사용됩니다. 개인정보는 사용자의 동의 없이 제3자에게 제공되지 않으며, 법적 요구가 있을 경우에만 예외적으로 제공될 수 있습니다. 사용자는 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수 있으며, 이를 위해 마이페이지에서 관련 기능을 제공합니다. 개인정보 보호를 위해 암호화된 방식으로 저장되며, 안전한 접근이 가능하도록 보안 조치가 취해집니다. 개인정보는 일정 기간 후 자동으로 삭제되거나, 사용자가 요청할 경우 삭제가 가능합니다. 개인정보 처리와 관련된 문의는 고객센터나 해당 담당 부서로 연락하여 해결할 수 있습니다. 서비스 종료 후에도 일부 법적 의무를 위해 개인정보가 보존될 수 있습니다. 회사는 사용자의 개인정보 보호를 위해 지속적으로 보안 시스템을 점검하고 업데이트합니다. 본 방침은 변경될 수 있으며, 변경 시 사용자에게 공지됩니다.
            </p>
            </div>
        </div>
    );
}

export default MyPayment;