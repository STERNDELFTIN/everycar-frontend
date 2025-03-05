import styles from '../../css/routes/myPage/MyPayment.module.scss';
import { vwFont } from '../../utils';

import TopContent from '../../components/common/myPage/TopContent';
import ListContainer from '../../components/common/myPage/ListContainer';

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
                <p>이곳은 더미 텍스트입니다. 실제 콘텐츠가 들어갈 자리를 표시하기 위해 작성된 임시 문장입니다. 웹사이트 또는 애플리케이션 개발 과정에서 디자인을 확인하거나 레이아웃을 테스트할 때 활용됩니다. 이 문장은 의미 없는 일반적인 문구로, 사용자가 읽을 필요 없이 시각적인 균형을 맞추는 데 초점을 맞추고 있습니다. 필요한 경우 이 부분을 실제 콘텐츠로 교체하여 최종적인 형태를 완성할 수 있습니다.
                    <br /><br />
                    더미 텍스트는 프로젝트의 목적과 스타일에 따라 변경될 수 있습니다. 예를 들어, 뉴스 기사에서는 짧고 간결한 문장이 필요할 수도 있고, 블로그에서는 좀 더 부드럽고 자연스러운 흐름이 요구될 수도 있습니다. 따라서, 작업하는 콘텐츠 유형에 맞게 적절한 문장을 추가하는 것이 중요합니다. 이곳에 들어갈 내용이 준비되면 즉시 교체해 주세요.</p>
            </div>
        </div>
    );
}

export default MyPayment;