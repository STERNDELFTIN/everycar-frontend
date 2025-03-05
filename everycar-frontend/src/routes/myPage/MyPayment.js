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

            </div>
        </div>
    );
}

export default MyPayment;