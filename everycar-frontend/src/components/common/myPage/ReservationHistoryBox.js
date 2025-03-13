import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/common/myPage/ReservationHistoryBox.module.scss";
import { vwFont } from "../../../utils";

function ReservationHistoryBox({ reservationStatus, carImage, carName, payment, startDate, startTime, endDate, endTime, rentPos, returnPos, reservationType, reservationId }) {
    const navigate = useNavigate();

    const handlePayments = async () => {
        console.log("reservationId", reservationId);
        try {
            const response = await fetch("http://localhost:8080/api/paypal/pay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    payment: payment / 1445,
                    reservationId,
                    reservationType,
                }),
            });

            const data = await response.json();
            console.log("결제 요청 성공:", data);

            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                console.error("Redirect URL이 없습니다.");
            }
        } catch (error) {
            console.error("결제 요청 실패:", error);
        }
    };

    const handleCancelReservation = async () => {
        const isConfirmed = window.confirm("정말 예약을 취소하시겠습니까?");
        if (!isConfirmed) {
            console.log("예약 취소가 취소되었습니다."); 
            return; // "아니오" 선택 시 바로 종료 (navigate 실행 X)
        }
        console.log("예약 취소 요청:", reservationId);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/${reservationType}/reservations/${reservationId}/cancel`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const responseText = await response.text();
            console.log("서버 응답:", responseText);

            if (!response.ok) {
                throw new Error(`예약 취소 실패: ${response.status} - ${responseText}`);
            }

            alert("예약이 취소되었습니다.");
            navigate("/myPage/history");
        } catch (error) {
            console.error("예약 취소 실패:", error.message);
            alert(`예약 취소 중 오류 발생: ${error.message}`);
        }
    };

    const handleStartReservation = async () => {
        console.log("이용 시작 요청:", reservationId);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/${reservationType}/reservations/${reservationId}/start`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("이용 시작 요청이 실패했습니다.");
            
            alert("이용이 시작되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("이용 시작 실패:", error);
            alert(error.message);
        }
    };

    const handleCompleteReservation = async () => {
        const isConfirmed = window.confirm("정말 이용을 완료하시겠습니까?");
        if (!isConfirmed) return;

        console.log("이용 완료 요청:", reservationId);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/${reservationType}/reservations/${reservationId}/complete`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("이용 완료 요청이 실패했습니다.");

            alert("이용 완료되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("이용 완료 실패:", error);
            alert("이용 완료를 실패했습니다.");
        }
    };

    return (
        <div className={styles.reservationHistoryBox}>
            <div className={styles.rentalStateBox}>
                <p className={`${styles.rentalState} ${reservationStatus === "이용중" ? styles.usingStatus : ""}`}>
                    {reservationStatus}
                </p>
            </div>

            <div className={styles.rentalInfo}>
                <img src={carImage} alt="차량 이미지" />
                <div style={{ display: "flex", flexDirection: "column", gap: vwFont(10, 15) }}>
                    <h4 className={styles.carName}>{carName}</h4>
                    <p className={styles.rentDate}>{`${startDate} ${startTime} ~ ${endDate} ${endTime}`}</p>
                    <p className={styles.payment}>결제금액 {payment.toLocaleString()}원</p>
                    <div className={styles.rentPos}>
                        <div className={styles.rentPosBox}>
                            <p className={styles.rentPosTitle}>대여</p>&nbsp;<p className={styles.rentPosName}>{rentPos}</p>
                        </div>
                        <div className={styles.rentPosBox}>
                            <p className={styles.rentPosTitle}>반납</p>&nbsp;<p className={styles.rentPosName}>{returnPos}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 버튼 추가 (예약 상태에 따라 다르게 표시) */}
            <div className={styles.buttonContainer}>
                {reservationStatus === "결제대기" && (
                    <>
                        <button className={styles.button_active} onClick={handlePayments}>결제하기</button>
                        <button onClick={handleCancelReservation}>예약 취소</button>
                    </>
                )}
                {reservationStatus === "결제완료" && (
                    <>
                        <button className={styles.button_active} onClick={handleStartReservation}>이용 시작</button>
                        <button onClick={() => navigate(`/myPage/history/detail/${reservationId}`)}>예약 상세보기</button>
                    </>
                )}
                {reservationStatus === "이용중" && (
                    <>
                        <button className={styles.button_active} onClick={handleCompleteReservation}>이용 완료</button>
                        <button onClick={() => navigate(`/myPage/history/detail/${reservationId}`)}>예약 상세보기</button>
                    </>
                )}
                {(reservationStatus === "예약취소" || reservationStatus === "이용완료") && (
                    <>
                        <button onClick={() => navigate(`/myPage/history/detail/${reservationId}`)}>예약 상세보기</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ReservationHistoryBox;
