
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../../css/routes/myPage/reservation/MyReservationDetail.module.scss";
import axios from "axios";
import KakaoMap from "../KakaoMap"; // KakaoMap이 있는 경로로 수정

const ReservationDetailBox = () => {
  const { reservationType, reservationId } = useParams();
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const apiUrl =
          reservationType === "fast"
            ? `http://localhost:8080/api/fast/reservations/${reservationId}`
            : `http://localhost:8080/api/short/reservations/${reservationId}`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data =
          Array.isArray(response.data) && response.data.length > 0
            ? response.data[0]
            : response.data;

        if (!data || Object.keys(data).length === 0) {
          throw new Error("예약 데이터가 존재하지 않습니다.");
        }

        setReservationData(data);
      } catch (error) {
        console.error("API 호출 실패:", error);
        setReservationData(null);
      }
    };

    fetchReservationData();
  }, [reservationId, reservationType]);

  if (!reservationData) {
    return <div>로딩 중...</div>;
  }

  console.log("reservationData", reservationData);

  // 예약 유형에 따라 다른 시간 필드를 사용
  const startDate =
    reservationType === "fast"
      ? reservationData.rental_datetime || "N/A"
      : reservationData.reservation_s_start_date || "N/A";

  const endDate =
    reservationType === "fast"
      ? reservationData.return_datetime || "N/A"
      : reservationData.reservation_s_end_date || "N/A";



  return (
    <div>
      <div className={styles.reservationHistoryBox}>
        <h3>예약 차량 정보</h3>
        <div className={styles.reservationCarInfo}>
        <img src={`/images/main/car/${reservationData.modelName}.png`} alt="차량 이미지" />
          <div className={styles.rentalInfo}>
            <div className={styles.carTitle}>
              <p className={styles.carName}>
                {reservationData.modelName || "모델명 없음"}
              </p>
              <span className={styles.grade}>
                {reservationData.carGrade || "등급 정보 없음"}
              </span>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>제조사</th>
                    <td>{reservationData.modelBrand || "알 수 없음"}</td>
                    <th>등급</th>
                    <td>{reservationData.carGrade || "알 수 없음"}</td>
                    <th>변속</th>
                    <td>{reservationData.modelTransmission || "알 수 없음"}</td>
                  </tr>
                  <tr>
                    <th>연료</th>
                    <td>{reservationData.carFuel || "알 수 없음"}</td>
                    <th>탑승인원</th>
                    <td>{reservationData.modelSeateNum || "알 수 없음"}</td>
                    <th>연식</th>
                    <td>{reservationData.carYear || "알 수 없음"}</td>
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
            <div className={styles.rentTimeCont}>
              {startDate} ~ {endDate}
            </div>
          </div>
        </div>
        <div className={styles.Location}>
          <h3>대여 장소</h3>
          <KakaoMap latitude={reservationData.rentalLocationLatitude} longitude={reservationData.rentalLocationLongitude} />
          <div className={styles.address}>
            <div>
              <span className={styles.addressTitle}>주차장</span>
              <span className={styles.addressDetail}>{reservationData.rentalLocationName || "알 수 없음"}</span>
            </div>
            <div>
              <span className={styles.addressTitle}>상세주소</span>
              <span className={styles.addressDetail}>{reservationData.rentalAddress || "알 수 없음"}</span>
            </div>
          </div>
        </div>
        <div className={styles.Location}>
          <h3>반납 장소</h3>
          <KakaoMap latitude={reservationData.returnLocationLatitude} longitude={reservationData.returnLocationLongitude} />
          <div className={styles.address}>
            <div>
              <span className={styles.addressTitle}>주차장</span>
              <span className={styles.addressDetail}>                   {(reservationType === "fast") ? reservationData.returnLocationName || "알 수 없음" : reservationData.rentalLocationName || "알 수 없음"}
              </span>
            </div>
            
            <div>
              <span className={styles.addressTitle}>상세주소</span>
              <span className={styles.addressDetail}>
              {(reservationType === "fast") ? reservationData.returnAddress || "알 수 없음" : reservationData.rentalAddress || "알 수 없음"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailBox;
