import { useNavigate } from 'react-router-dom';
import styles from '../../css/rentDetail/ReservationInfo.module.scss';
import { vwFont } from '../../utils';
import useEligibilityCheck from '../hooks/useEligibilityCheck';
import CarNameMapper from '../common/CarNameMapper';

// Redux
import { useSelector } from 'react-redux';

function ReservationInfo({ title, car, SubTitleH3, totalPrice }) {
    const navigate = useNavigate();

    // Redux에서 userInfo 가져오기
    const userInfo = useSelector(state => state.user.userInfo);
    
    // accessToken 확인
    const accessToken = localStorage.accessToken;
    // 유저의 권한(role) 확인
    const hasVerifiedRole = userInfo?.roles?.some(role => role.name === 'ROLE_VERIFIED');

    // 자격여부 및 에러메시지
    const { isEligible, errorMessage } = useEligibilityCheck();

    // 예약 버튼 클릭 핸들러
    const reservationHandler = () => {
        if (isEligible && hasVerifiedRole && car && car.car_id) {
            navigate(`/reservation/rentReservation/${car.car_id}`);
        }
    };

    return (
        <div className={`${styles.reservationInfoContainer} ${styles.container}`}>
            <div className={styles.carImage}>
                <img 
                    src={car.img || `/images/main/car/${CarNameMapper(car.model.model_name)}.png`} 
                    alt={car.model.model_name} 
                    style={{ height: vwFont(100, 200), width: 'auto' }} 
                />
            </div>

            <div className={styles.carContent}>
                <SubTitleH3 className={styles.subTitle}>{title}</SubTitleH3>
                <div className={styles.line} style={{ border: '1px solid #D9D9D9', marginBottom: vwFont(10, 15) }}></div>
                <div className={styles.carInfoBox}>
                    <div className={styles.priceInfoBox} style={{ marginBottom: vwFont(10, 15) }}>
                        <p style={{ fontSize: vwFont(10, 18), fontWeight: '600', marginBottom: vwFont(10, 15) }}>결제정보</p>
                        <div className={styles.priceInfo}>
                            <p style={{ marginLeft: '10px' }}>총대여료</p>
                            <p style={{ fontSize: vwFont(12, 24), fontWeight: '600' }}>{totalPrice}원</p>
                        </div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.counselButton}>상담신청</button>
                        {accessToken ? (
                            hasVerifiedRole ? (
                                isEligible ? (
                                    <button className={styles.reservationButton} onClick={reservationHandler}>
                                        예약하기
                                    </button>
                                ) : (
                                    <p style={{ color: 'red' }}>{errorMessage}</p>
                                )
                            ) : (
                                <p style={{ color: 'red' }}>면허를 등록한 사용자만 예약이 가능합니다.</p>
                            )
                        ) : (
                            <p style={{ color: 'red' }}>로그인이 필요합니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationInfo;
