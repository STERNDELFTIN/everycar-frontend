import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/common/myPage/ReservationHistoryBox.module.scss";
import { vwFont } from "../../../utils";
import useCurrentDateTime from "../../hooks/useCurrentDateTime";

function ReservationHistoryBox({ reservationStatus, carImage, carName, payment, startDate, startTime, endDate, endTime, rentPos, returnPos, reservationType, reservationId }) {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();
    
    // 페이지, 이동 핸들러
    const handleDetailReservation = () => {
        navigate(`/myPage/history/detail/${reservationType}/${reservationId}`);
    };

    const handlePayments = () => {
        navigate(`/myPage/history/payment/${reservationType}/${reservationId}`);
    };

    // 예약취소 핸들러
    const handleCancelReservation = async () => {
        const isConfirmed = window.confirm("정말 예약을 취소하시겠습니까?");
        if (!isConfirmed) {
            // console.log("예약 취소가 취소되었습니다."); 
            return; // "아니오" 선택 시 바로 종료 (navigate 실행 X)
        }
        // console.log("예약 취소 요청:", reservationId);

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/${reservationType}/reservations/${reservationId}/cancel`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const responseText = await response.text();
            // console.log("서버 응답:", responseText);

            if (!response.ok) {
                throw new Error(`예약 취소 실패: ${response.status} - ${responseText}`);
            }

            alert("예약이 취소되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("예약 취소 실패:", error.message);
            alert(`예약 취소 중 오류 발생: ${error.message}`);
        }
    };

    // 이용시작 핸들러
    const handleStartReservation = async () => {
        // console.log("이용 시작 요청:", reservationId);

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/${reservationType}/reservations/${reservationId}/start`, {
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

    // 이용완료 핸들러
    const handleCompleteReservation = async () => {
        const isConfirmed = window.confirm("정말 이용을 완료하시겠습니까?");
        if (!isConfirmed) return;

        // console.log("이용 완료 요청:", reservationId);

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/${reservationType}/reservations/${reservationId}/complete`, {
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

    // 대여시간이 경과하면 자동으로 '이용중' -> '이용완료'로 변경
    const { currentDate, currentTime } = useCurrentDateTime();
    const currentDateTime = currentDate + " " + currentTime;
    const returnDateTime = endDate + " " + endTime;

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }
    
            try {
                const response = await fetch(`${API_BASE_URL}/api/${reservationType}/reservations/${reservationId}/complete`, {
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

        // 반납시간 경과
        if (currentDateTime > returnDateTime) {
            fetchData();
        }
    }, []);

    return (
        <div className={styles.reservationHistoryBox} onClick={handleDetailReservation}>
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
                        <button className={styles.button_active} onClick={(e) => {e.stopPropagation(); handlePayments();}}>결제하기</button>
                        <button onClick={(e) => {e.stopPropagation(); handleCancelReservation();}}>예약 취소</button>
                    </>
                )}
                {reservationStatus === "결제완료" && (
                    <>
                        <button className={styles.button_active} onClick={(e) => {e.stopPropagation(); handleStartReservation();}}>이용 시작</button>
                        <button onClick={(e) => {e.stopPropagation(); handleDetailReservation();}}>예약 상세보기</button>
                    </>
                )}
                {reservationStatus === "이용중" && (
                    <>
                        <button className={styles.button_active} onClick={(e) => {e.stopPropagation(); handleCompleteReservation();}}>이용 완료</button>
                        <button onClick={(e) => {e.stopPropagation(); handleDetailReservation();}}>예약 상세보기</button>
                    </>
                )}
                {(reservationStatus === "예약취소" || reservationStatus === "이용완료") && (
                    <>
                <button onClick={(e) => { 
                    e.stopPropagation(); // 이벤트 전파 막기
                    navigate('/myPage/review', {
                        state: {
                            carName,
                            payment,
                            startDate,
                            startTime,
                            endDate,
                            endTime,
                            rentPos,
                            reservationType,
                            reservationId
                        }
                    });
                }}>리뷰 작성</button>
                        <button onClick={(e) => {e.stopPropagation(); handleDetailReservation();}}>예약 상세보기</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ReservationHistoryBox;
