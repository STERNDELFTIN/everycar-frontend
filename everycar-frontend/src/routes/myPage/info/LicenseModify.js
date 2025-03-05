import styles from '../../../css/routes/myPage/info/LicenseModify.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';

function LicenseModify() {
    return (
        <div className={styles.licenseModify}>
            <TopContent firstLocation='내정보관리' secondLocation='면허수정' />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: vwFont(7, 10) }}>


                </div>
            </div>
        </div>
    );
}

export default LicenseModify;