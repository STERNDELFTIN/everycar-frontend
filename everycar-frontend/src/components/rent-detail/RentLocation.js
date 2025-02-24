import styles from '../../css/CarDetail.module.scss';
import KakaoMap from "../KakaoMap";

// 대여장소
function RentLocation({ title, car, latitude, longitude, SubTitleH3 }) {
    return (
        <div className={`${styles.rentLocationContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div id="map" className={styles.map} style={{ width:'100%', height:'auto', aspectRatio:'16/7' }}>
                <KakaoMap latitude={latitude} longitude={longitude} />
            </div>
            <div className={`${styles.rentPos} ${styles.greyTitle}`}>
                <p>대여장소</p>
                <p>기계공고 사거리</p>
            </div>
            <div className={`${styles.rentDetailPos} ${styles.greyTitle}`}>
                <p>상세주소</p>
                <p>경기도 평택시 비전동 626-11</p>
            </div>
        </div>
    );
}

export default RentLocation;

