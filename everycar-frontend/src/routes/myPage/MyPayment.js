import styles from '../../css/routes/myPage/MyInfoManagement.module.scss';
import { vwFont } from '../../utils';

import TopContent from '../../components/common/myPage/TopContent';
import ListContainer from '../../components/common/myPage/ListContainer';

function MyPayment() {
    return (
        <div className={styles.myPayment}>
            <TopContent />

            <div className={styles.bottomContent}>
                <ListContainer />

            </div>
        </div>
    );
}

export default MyPayment;