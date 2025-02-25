import styles from '../../css/rentDetail/RentCondition.module.scss';

// 운전자 대여조건
function RentCondition({ title, SubTitleH3 }) {
    let conditions = ['만26세 이상 성인', '면허 취득일로부터 1년', '2종 보통면허 이상 필요', '실물 면허증 소지자'];

    return (
        <div className={`${styles.rentConditionContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div>
                {
                    conditions.map((item, i) =>
                        <div key={i} className={styles.rentCondition}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#5A5A5A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>{item}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default RentCondition;