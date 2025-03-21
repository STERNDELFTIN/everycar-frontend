import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { vwFont } from "../../utils";
import styles from "../../css/routes/reservation/PaymentSuccess.module.scss";

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
        <div className={styles.paymentSuccess} style={{ margin: "30px", textAlign: "left" }}>
            <h2 style={{ marginBottom: "20px" }}>예약완료</h2>
            {userReservation ? (
                <div className={styles.reservationInfo} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <h3>예약정보</h3>
                    {
                        (reservationType === 'short') ? (
                            <p><strong>예약 번호:</strong> {userReservation.reservation_s_id || "정보 없음"}</p>
                        ) : (
                            <p><strong>예약 번호:</strong> {userReservation.reservation_id || "정보 없음"}</p>
                        )
                    }
                    <p><strong>결제 금액:</strong> {userReservation.payment?.toLocaleString() || "정보 없음"}원</p>
                    <p>
                        <strong>예약 일시:</strong>
                        {reservationType === "quick"
                            ? userReservation.rental_datetime
                                ? new Date(userReservation.rental_datetime).toLocaleString()
                                : "정보 없음"
                            : userReservation.reservation_s_start_date
                                ? new Date(userReservation.reservation_s_start_date).toLocaleString()
                                : "정보 없음"}
                    </p>

                    <div style={{ margin: "15px 0px" }}>
                        <hr></hr>
                    </div>

                    <h3 style={{ marginBottom: "10px" }}>예약 상세 정보</h3>

                    {/* 빠른 대여 (quick-rent) */}
                    {reservationType === "quick" ? (
                        <>
                            <p><strong>차량 모델:</strong> {userReservation.carDto?.model?.model_name || "정보 없음"}</p>
                            <p><strong>대여 장소:</strong> {userReservation.rental_location || "정보 없음"}</p>
                            <p><strong>반납 장소:</strong> {userReservation.return_location || "정보 없음"}</p>
                            <p><strong>대여 날짜:</strong> {userReservation.rental_datetime || "정보 없음"}</p>
                            <p><strong>반납 날짜:</strong> {userReservation.return_datetime || "정보 없음"}</p>
                        </>
                    ) : (
                        // 단기 대여 (short-rent)
                        <>
                            <p><strong>차량 모델:</strong> {userReservation.carDto?.model?.model_name || "정보 없음"}</p>
                            <p><strong>대여 장소 (지점 ID):</strong> {userReservation.rental_station_start || "정보 없음"}</p>
                            <p><strong>대여 날짜:</strong> {userReservation.reservation_s_start_date || "정보 없음"}</p>
                            <p><strong>반납 날짜:</strong> {userReservation.reservation_s_end_date || "정보 없음"}</p>
                        </>
                    )}
                </div>
            ) : (
                <p>예약 정보를 찾을 수 없습니다.</p>
            )}

            {/* 버튼 추가 */}
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginLeft: "7px",
                        padding: "10px 20px",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    홈으로 돌아가기
                </button>

                <button
                    onClick={() => navigate("/myPage/history")}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#C4FF53",
                        color: "black",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    예약 내역 보기
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
