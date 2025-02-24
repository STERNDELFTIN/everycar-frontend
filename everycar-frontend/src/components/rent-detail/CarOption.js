import styles from '../../css/CarDetail.module.scss';

// 차량옵션
function CarOption({ title, car, SubTitleH3, vwFont }) {
    // let options = ['네비게이션', '하이패스', '블랙박스', '후방카메라', '열시트'];
    const options = car.car_options ? car.car_options.split(",") : []; // car_options를 배열로 변환

    return (
        <div className={`${styles.carOptionContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.carOptionBox}>
                {
                    options.map((item, i) =>
                        <div key={i} className={styles.carOption}>
                            <img src="/images/icons/car-option-icon.png" alt="Not Found" style={{ width: vwFont(25, 60), height: vwFont(25, 60) }} />
                            <p>{item}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default CarOption;