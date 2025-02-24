import styles from '../../css/CarDetail.module.scss';

// 계약정보
function ContractInfo({ title, SubTitleH3 }) {
    return (
        <div className={`${styles.contractInfoContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.contractInfoBox}>
                <p className={styles.contractTitle}>보험</p>
                <p className={styles.contractContent}>면허 취득일로부터 1년이 지난 만26세 이상의 성인부터 대여할 수 있습니다.</p>
                <p className={styles.contractContentDetail}>이곳은 더미 텍스트입니다. 실제 콘텐츠가 들어갈 자리를 표시하기 위해 작성된 임시 문장입니다. 웹사이트 또는 애플리케이션 개발 과정에서 디자인을 확인하거나 레이아웃을 테스트할 때 활용됩니다. 이 문장은 의미 없는 일반적인 문구로, 사용자가 읽을 필요 없이 시각적인 균형을 맞추는 데 초점을 맞추고 있습니다. 필요한 경우 이 부분을 실제 콘텐츠를 교체하여 최종적인 형태를 완성할 수 있습니다.</p>
            </div>
        </div>
    );
}

export default ContractInfo;