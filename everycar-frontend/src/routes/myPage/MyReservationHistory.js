import styles from '../../css/routes/myPage/MyInfoManagement.module.scss';
import { vwFont } from '../../utils';

import TopContent from '../../components/common/myPage/TopContent';
import ListContainer from '../../components/common/myPage/ListContainer';

function MyReservationHistory() {
    return (
        <div className={styles.myReservationHistory}>
            <TopContent currentLocation='내예약내역' />

            <div className={styles.bottomContent}>
                <ListContainer />

            </div>
        </div>
    );
}

export default MyReservationHistory;