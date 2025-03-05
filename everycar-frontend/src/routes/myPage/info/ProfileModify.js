import styles from '../../../css/routes/myPage/info/ProfileModify.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';

function ProfileModify() {
    return (
        <div className={styles.profileModify}>
            <TopContent firstLocation='내정보관리' secondLocation='프로필수정' />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: vwFont(7, 10) }}>

                </div>
            </div>
        </div>
    );
}

export default ProfileModify;