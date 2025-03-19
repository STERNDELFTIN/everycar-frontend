import styles from '../../css/rentDetail/RentLocation.module.scss';
import KakaoMap from "../common/KakaoMap";

// 대여장소
function RentLocation({ title, car, SubTitleH3 }) {
    return (
        <div className={`${styles.rentLocationContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
                <KakaoMap latitude={car.parking.parking_latitude} longitude={car.parking.parking_longtitude} />
            <div className={`${styles.rentPos} ${styles.greyTitle}`}>
                <p>대여장소</p>
                <p>{car.parking.parking_name}</p>
            </div>
            <div className={`${styles.rentDetailPos} ${styles.greyTitle}`}>
                <p>상세주소</p>
                <p>{car.parking.parking_address}</p>
            </div>
        </div>
    );
}

export default RentLocation;

