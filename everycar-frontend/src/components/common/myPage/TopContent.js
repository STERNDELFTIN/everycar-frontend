import styles from '../../../css/common/myPage/TopContent.module.scss';

function TopContent({firstLocation, secondLocation}) {
    return (
        <div className={styles.topContent}>
            <h2>마이페이지</h2>
            <p>마이페이지 &gt; { firstLocation }
                {
                    secondLocation && (
                        <>&gt; { secondLocation }</>
                    )
                }
            </p>
        </div>
    );
}

export default TopContent;