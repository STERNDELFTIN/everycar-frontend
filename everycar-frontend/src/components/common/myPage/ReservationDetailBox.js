import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';  // reservationId를 URL에서 추출
import { useNavigate } from "react-router-dom";
import styles from '../../../css/routes/myPage/reservation/MyReservationDetail.module.scss';

import axios from "axios";
import { vwFont } from '../../../utils';
import RentTime from "../../rentDetail/RentTime";

function ReservationDetailBox() {
    const { reservationId } = useParams();  // reservationId를 URL에서 추출
    const [reservationData, setReservationData] = useState(null);
    const mapContainer = useRef(null);  // 지도 컨테이너를 위한 ref

    // 예약 상세 정보 호출
    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/fast/reservations/${reservationId}`);
                setReservationData(response.data); // API 응답 데이터로 상태 업데이트
            } catch (error) {
                console.error("API 호출 실패:", error);
            }
        };

        fetchReservationData();
    }, [reservationId]); // reservationId가 변경될 때마다 호출

    // 데이터가 로딩 중일 때
    if (!reservationData) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <div className={styles.reservationHistoryBox}>
                <h3>예약 차량 정보</h3>
                    <div className={styles.reservationCarInfo}>
                        <img src="/images/car-model/product-image-01.png" alt="차량 이미지" />

                            <div className={styles.rentalInfo}> 
                                <div className={styles.carTitle}>
                                    <p className={styles.carName}>{reservationData.modelName}</p>
                                    <span className={styles.grade}>{reservationData.carGrade}</span>
                                </div>
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>제조사</th>
                                                <td>{reservationData.modelBrand}</td>
                                                <th>등급</th>
                                                <td>{reservationData.carGrade}</td>
                                                <th>변속</th>
                                                <td>{reservationData.modelTransmission}</td>
                                            </tr>
                                            <tr>
                                                <th>연료</th>
                                                <td>{reservationData.carFuel}</td>
                                                <th>탑승인원</th>
                                                <td>{reservationData.modelSeateNum}</td>
                                                <th>연식</th>
                                                <td>{reservationData.carYear}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
            </div>
            <div className={styles.reservationHistoryBox}>
                <div className={styles.rentTime}>
                    <h3>이용 시간</h3>  
                    <div>
                        <div>{reservationData.rental_datetime} ~ {reservationData.return_datetime}</div>
                    </div>
                </div>
                <div className={styles.rentalLocation}>
                    <h3>대여 장소</h3>  
                    <div>
                        <div>{reservationData.rentalLocationName} - {reservationData.rentalAddress}</div>
                    </div>
                </div>
                <div className={styles.returnLocation}>
                    <h3>반납 장소</h3>  
                    <div>
                        <div>{reservationData.returnLocationName} - {reservationData.returnAddress}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationDetailBox;
