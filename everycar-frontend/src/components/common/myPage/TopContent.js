import styles from '../../../css/common/myPage/TopContent.module.scss';

function TopContent() {
    return (
        <div className={styles.topContent}>
            <h2>마이페이지</h2>
            <p>{'내정보관리'}</p>
        </div>
    );
}

export default TopContent;