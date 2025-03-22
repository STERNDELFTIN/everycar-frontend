import styles from '../../css/rentDetail/ContractInfo.module.scss';

// 계약정보
function ContractInfo({ title, SubTitleH3 }) {
    return (
        <div className={`${styles.contractInfoContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.contractInfoBox}>
                <p className={styles.contractTitle}>보험</p>
                <p className={styles.contractContent}>면허 취득일로부터 1년이 지난 만26세 이상 성인부터 대여할 수 있습니다.</p>
                <div>
                    <p>대물배상</p>
                    <p>1억원</p>
                </div>
                <div>
                    <p>대인배상</p>
                    <p>무제한</p>
                </div>
                <div>
                    <p>자손</p>
                    <p>자손 1억원 / 부상 1,500만원</p>
                </div>
                <div>
                    <p>자기부담금</p>
                    <p>30 만원</p>
                </div>
            </div>
        </div>
    );
}

export default ContractInfo;