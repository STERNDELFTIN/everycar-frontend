import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../../css/routes/PaymentSuccess.module.scss";

const PaymentSuccess = () => {
  const reservations = useSelector((state) => state.reservation.reservations);
  const reservationType = useSelector((state) => state.rent.reservationType);
  const [userReservation, setUserReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redux에서 불러온 예약 목록:", reservations);

    if (!reservations || Object.keys(reservations).length === 0) {
      console.error("Redux에 저장된 예약 목록이 없습니다.");
      setLoading(false);
      return;
    }

    // 최신 예약 정보 가져오기
    const latestReservation = Object.values(reservations).pop();

    if (!latestReservation) {
      console.error("최신 예약 정보를 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    console.log("Redux에서 찾은 최신 예약 정보:", latestReservation);
    setUserReservation(latestReservation);
    setLoading(false);
  }, [reservations]);

  if (loading) {
    return <p>결제 정보를 불러오는 중...</p>;
  }

  return (
    <div
      className={style.PaymentSuccessCont}
      style={{ margin: "30px", textAlign: "left" }}
    >
      <i className={style.icon}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.5 12.5L10.5 14.5L15.5 9.5"
            stroke="#1C274C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
            stroke="#1C274C"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </i>
      <h2 style={{ marginBottom: "20px" }}>예약 완료</h2>
      <p className={style.subTitle}>
        예약이 완료되었습니다!<br></br>
        예약 내용을 확인하고 결제를 진행해주세요
      </p>
      {userReservation ? (
        <div
          className={style.reservationCont}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <table className={style.reservationTable}>
            <h3>예약 정보</h3>
            <tbody>
              <tr>
                <th>예약번호</th>
                <td>
                  <p>
                    {reservationType === "quick"
                      ? userReservation.reservation_id || "정보 없음"
                      : userReservation.reservation_s_id || "정보 없음"}
                  </p>
                </td>
              </tr>
              <tr>
                <th>결제금액</th>
                <td>
                  {userReservation.payment?.toLocaleString() || "정보 없음"}원
                </td>
              </tr>
              <tr>
                <th>예약일시</th>
                <td>
                  {reservationType === "quick"
                    ? userReservation.rental_datetime
                      ? new Date(
                          userReservation.rental_datetime
                        ).toLocaleString()
                      : "정보 없음"
                    : userReservation.reservation_s_start_date
                    ? new Date(
                        userReservation.reservation_s_start_date
                      ).toLocaleString()
                    : "정보 없음"}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginBottom: "10px" }}>상세 내역</h3>
          <table className={style.reservationTable}>
            <tbody>
              {/* 빠른 대여 (quick-rent) */}
              {reservationType === "quick" ? (
                <>
                  <tr>
                    <th>
                      <strong>차량 모델</strong>
                    </th>
                    <td>
                      {userReservation.carDto?.model?.model_name || "정보 없음"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <strong>대여 장소</strong>
                    </th>
                    <td>{userReservation.rental_location || "정보 없음"}</td>
                  </tr>
                  <tr>
                    <th>
                      <strong>반납 장소</strong>
                    </th>
                    <td>{userReservation.return_location || "정보 없음"}</td>
                  </tr>
                  <tr>
                    <th>
                      <strong>대여 날짜</strong>
                    </th>
                    <td>{userReservation.rental_datetime || "정보 없음"}</td>
                  </tr>
                  <tr>
                    <th>
                      <strong>반납 날짜</strong>
                    </th>
                    <td>{userReservation.return_datetime || "정보 없음"}</td>
                  </tr>
                </>
              ) : (
                // 단기 대여 (short-rent)
                <>
                  <tr>
                    <th>
                      <strong>차량 모델</strong>
                    </th>
                    <td>
                      {userReservation.carDto?.model?.model_name || "정보 없음"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <strong>대여 장소</strong>
                    </th>
                    <td>
                      {userReservation.rental_station_start || "정보 없음"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <strong>대여 날짜</strong>
                    </th>
                    <td>
                      {userReservation.reservation_s_start_date || "정보 없음"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <strong>반납 날짜</strong>
                    </th>
                    <td>
                      {userReservation.reservation_s_end_date || "정보 없음"}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

                {/* 🔹 버튼 추가 */}
      <div className={style.btn} style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>

<button
  onClick={() => navigate("/myPage/history")}
  className={style.returnPayment}
>
  결제하기
</button>
</div>
        </div>
      ) : (
        <p>예약 정보를 찾을 수 없습니다.</p>
      )}

    </div>
  );
};

export default PaymentSuccess;
