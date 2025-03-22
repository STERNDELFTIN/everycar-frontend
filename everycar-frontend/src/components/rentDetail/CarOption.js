import styles from '../../css/rentDetail/CarOption.module.scss';
import { vwFont } from '../../utils';

// 차량옵션
function CarOption({ title, car, SubTitleH3 }) {
    const options = car.car_options ? car.car_options.split(",") : []; // car_options를 배열로 변환

    // 옵션에 따른 이미지 파일명을 반환하는 함수
    const getImageSrc = (item) => {
        switch (item) {
            case '네비게이션':
                return '/images/icons/car-option-icon.png';
            case '블랙박스':
                return '/images/icons/car-option-icon-camera1.png';
            case '후방카메라':
                return '/images/icons/car-option-icon-camera2.png';
            case '하이패스' :
                return '/images/icons/car-option-icon-hipass.png';
            case '열선시트' :
                return '/images/icons/car-option-icon-heat.png';
            default:
                return '/images/icons/car-option-icon.png'; // 기본 이미지
        }
    };

    return (
        <div className={`${styles.carOptionContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.carOptionBox}>
                {
                    options.map((item, i) =>
                        <div key={i} className={styles.carOption}>
                            <img 
                                src={getImageSrc(item)} 
                                alt={item} 
                                style={{ width: vwFont(25, 60), height: vwFont(25, 60) }} 
                            />
                            <p>{item}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default CarOption;
