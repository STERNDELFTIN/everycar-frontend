import styles from '../../css/rentDetail/RentLocation.module.scss';
import KakaoMap from "../common/KakaoMap";

// 대여장소
function RentLocation({ title, car, latitude, longitude, parkingName, parkingAddress, SubTitleH3 }) {
    return (
        <div className={`${styles.rentLocationContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div id="map" className={styles.map} style={{ width:'100%', height:'auto', aspectRatio:'16/7' }}>
                <KakaoMap latitude={latitude} longitude={longitude} />
            </div>
            <div className={`${styles.rentPos} ${styles.greyTitle}`}>
                <p>대여장소</p>
                <p>{parkingName}</p>
            </div>
            <div className={`${styles.rentDetailPos} ${styles.greyTitle}`}>
                <p>상세주소</p>
                <p>{parkingAddress}</p>
            </div>
        </div>
    );
}

export default RentLocation;

