import styles from '../../css/CarDetail.module.scss';

// 제원정보
function CarInfo({ title, car, SubTitleH3 }) {
    let carInfo = [
        { title: '제조사', content: car.model.model_name },
        { title: '등급', content: car.car_grade },
        { title: '변속', content: car.model.model_transmission },
        { title: '연료', content: car.car_fuel },
        { title: '인원', content: `${car.model.model_seate_num}명` },
        { title: '연식', content: car.car_year },
    ];

    return (
        <div className={`${styles.carInfoContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.carName}>
                <h5>{car.model.model_name}</h5>
                <div>{car.car_grade}</div>
            </div>

            <div className={styles.carInfo}>
                {
                    carInfo.map((item, i) =>
                        <div key={i} className={styles.carInfoItem}>
                            <p className={styles.carInfoTitle} style={{ width: '40%' }}>{item.title}</p><p className={styles.carInfoContent} style={{ width: '50%' }}>{item.content}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CarInfo;