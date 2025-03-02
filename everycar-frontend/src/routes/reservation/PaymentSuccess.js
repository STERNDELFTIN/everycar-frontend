import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getReservationData } from "../../dummyData/dummyReservations";

const PaymentSuccess = () => {
    const location = useLocation();
    const [userReservation, setUserReservation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // URL에서 userNum 가져오기
        const params = new URLSearchParams(location.search);
        const userNum = params.get("userNum") || "2";

        console.log("URL 파라미터:", userNum);

        // 예약 정보 가져오기
        try {
            const reservation = getReservationData(userNum);
            console.log("예약 데이터:", reservation);

            if (!reservation || !reservation.carDto) {
                console.error("예약 정보를 찾을 수 없습니다.");
            }

            setUserReservation(reservation);
        } catch (error) {
            console.error("예약 데이터 로드 실패:", error);
        } finally {
            setLoading(false);
        }
    }, [location]);

    if (loading) {
        return <p>결제 정보를 불러오는 중...</p>;
    }

    return (
        <div style={{margin: '30px', textAlign: 'left', }}>
            <h2 style={{marginBottom: '20px',}}>결제 완료</h2>
            {userReservation ? (
                <div style={{display:'flex', flexDirection:'column', gap:'5px', }}>
                    <p><strong>예약 번호:</strong> {userReservation.reservation_id || "정보 없음"}</p>
                    <p><strong>결제 금액:</strong> {userReservation.totalPrice || "정보 없음"}원</p>
                    <p><strong>예약 일시:</strong> {new Date(userReservation.fast_reservation_create_at).toLocaleString()}</p>
                    <hr />
                    <h3 style={{marginBottom: '10px',}}>예약 상세 정보</h3>
                    <p><strong>차량 모델:</strong> {userReservation.carDto.model?.model_name || "정보 없음"}</p>
                    <p><strong>대여 장소:</strong> {userReservation.rental_location || "정보 없음"}</p>
                    <p><strong>반납 장소:</strong> {userReservation.return_location || "정보 없음"}</p>
                    <p><strong>대여 날짜:</strong> {userReservation.rental_datetime || "정보 없음"}</p>
                    <p><strong>반납 날짜:</strong> {userReservation.return_datetime || "정보 없음"}</p>
                </div>
            ) : (
                <p>예약 정보를 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default PaymentSuccess;
