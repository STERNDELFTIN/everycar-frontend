import styles from '../../../css/common/myPage/TopContent.module.scss';

function TopContent({currentLocation}) {
    return (
        <div className={styles.topContent}>
            <h2>마이페이지</h2>
            <p>마이페이지 &gt; {currentLocation}</p>
        </div>
    );
}

export default TopContent;