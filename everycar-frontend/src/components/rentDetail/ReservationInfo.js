import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../../css/rentDetail/ReservationInfo.module.scss';
import { vwFont } from '../../utils';
import useEligibilityCheck from '../hooks/useEligibilityCheck';

// Redux
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../redux/userSlice';

// 더미 유저 데이터 가져오기
import dummyUsers from '../../dummyData/dummyUser';

// 우측 예약정보
function ReservationInfo({ title, car, SubTitleH3 }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 자격여부 및 에러메시지
    const { isEligible, errorMessage } = useEligibilityCheck();

    // 자격 충족 시 예약 페이지로 넘어가기
    const reservationHandler = () => {
        if (isEligible) {
            navigate("/reservation/rentReservation");
        }
    }

    // 유저 테스트
    const [selectedUser, setSelectedUser] = useState(dummyUsers[0]);

   useEffect (() => { // 선택된 랜덤 유저
    const randomUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
    setSelectedUser(randomUser);

    if (randomUser.isLoggedIn) {
        dispatch(loginUser({ birthDate: randomUser.birthDate, licenseIssuedDate: randomUser.licenseIssuedDate }));
    } else {
        dispatch(logoutUser());
    }

    console.log(randomUser);
    }, [dispatch]);

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
                        {
                            isEligible ? (
                                <button
                                    className={styles.reservationButton}
                                    onClick={reservationHandler}
                                >
                                    예약하기
                                </button>
                            ) : (
                                <p style={{ color: 'red', }}>{errorMessage}</p>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ReservationInfo;