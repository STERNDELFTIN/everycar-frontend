import styles from '../../css/rentDetail/RentTime.module.scss';
import { useSelector } from 'react-redux';
import { vwFont } from '../../utils';

// 대여시간
function RentTime({ title, SubTitleH3 }) {
    const { startDate, startTime, endDate, endTime } = useSelector((state) => state.rent);
    return (
        <div className={`${styles.rentTimeContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.rentTime}>
                <div className={styles.startRent}>
                    <span className={styles.startDate}>{startDate}</span><span className={styles.startTime}>{startTime}</span>
                </div>
                <img src="/images/icons/car-shape-icon.png" alt="Not Found" style={{ width: `${vwFont(10, 30)}`, height: `${vwFont(10, 30)}` }} />
                <div className={styles.endRent}>
                    <span className={styles.endDate}>{endDate}</span><span className={styles.endTime}>{endTime}</span>
                </div>
            </div>
        </div>
    );
}

export default RentTime;