import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getReservationData } from "../dummyData/dummyReservations";

const PaymentSuccess = () => {
    const location = useLocation();
    const [userReservation, setUserReservation] = useState(null);

    useEffect(() => {
        // 🔹 URL에서 쿼리 스트링 파싱
        const params = new URLSearchParams(location.search);
        const userNum = params.get("userNum") || "USER_1234"; // 기본값: 가짜 유저 ID

        console.log("URL에서 추출한 정보:", { userNum });

        const reservation = getReservationData(userNum);
        setUserReservation(reservation);
    }, [location]);

    return (
        <div>
            <h2>결제 완료</h2>
            {userReservation ? (
                <div>
                    <p><strong>예약 번호:</strong> {userReservation.reservationNum}</p>
                    <p><strong>결제 금액:</strong> {userReservation.payAmount}원</p>
                    <p><strong>결제 수단:</strong> {userReservation.payMethod}</p>
                    <p><strong>예약 일시:</strong> {userReservation.reservationDate}</p>
                    <hr />
                    <h3>예약 상세 정보</h3>
                    <p><strong>차량 모델:</strong> {userReservation.carModel}</p>
                    <p><strong>대여 장소:</strong> {userReservation.rentalLocation}</p>
                    <p><strong>반납 장소:</strong> {userReservation.returnLocation}</p>
                    <p><strong>대여 날짜:</strong> {userReservation.rentalDate}</p>
                    <p><strong>반납 날짜:</strong> {userReservation.returnDate}</p>
                </div>
            ) : (
                <p>예약 정보를 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default PaymentSuccess;
