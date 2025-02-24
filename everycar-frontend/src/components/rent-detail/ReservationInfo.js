import styles from '../../css/CarDetail.module.scss';

// 우측 예약정보
function ReservationInfo({ title, car, SubTitleH3, vwFont }) {
    return (
        <div className={`${styles.reservationInfoContainer} ${styles.container}`}>
            <div className={styles.carImage}>
                <img src={car.img || "/images/car-model/product-image-01.png"} alt={car.model.model_name} style={{ height: vwFont(100, 200), width: 'auto' }} />
            </div>

            <div className={styles.carContent}>
                <SubTitleH3 className={styles.subTitle}>{title}</SubTitleH3>
                <div className={styles.line} style={{ border: '1px solid #D9D9D9', marginBottom: vwFont(10, 15) }}></div>
                <div className={styles.carInfoBox}>
                    <div className={styles.priceInfoBox} style={{ marginBottom: vwFont(10, 15) }}>
                        <p style={{ fontSize: vwFont(10, 18), fontWeight: '600', marginBottom: vwFont(10, 15) }}>결제정보</p>
                        <div className={styles.priceInfo}>
                            <p style={{ marginLeft: '10px' }}>총대여료</p>
                            <p style={{ fontSize: vwFont(12, 24), fontWeight: '600' }}>{car.calculatedPrice}원</p>
                        </div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.counselButton}>상담신청</button>
                        <button className={styles.reservationButton}>예약하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationInfo;