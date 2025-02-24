import styles from '../../css/CarDetail.module.scss';

// 대여시간
function RentTime({ title, SubTitleH3, vwFont }) {
    return (
        <div className={`${styles.rentTimeContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.rentTime}>
                <div className={styles.startRent}>
                    <span className={styles.startDate}>2025. 01. 01</span><span className={styles.startTime}>10:00</span>
                </div>
                <img src="/images/icons/car-shape-icon.png" alt="Not Found" style={{ width: `${vwFont(10, 30)}`, height: `${vwFont(10, 30)}` }} />
                <div className={styles.endRent}>
                    <span className={styles.endDate}>2025. 01. 03</span><span className={styles.endTime}>12:00</span>
                </div>
            </div>
        </div>
    );
}

export default RentTime;