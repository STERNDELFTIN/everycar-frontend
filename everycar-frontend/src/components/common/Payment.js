import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveReservation } from "../../redux/reservationSlice";
import { vwFont } from "../../utils";
import styled from "styled-components";

const LabelStyle = styled.label`
    display: flex; 
    text-align: center; 
    gap: 6px;
`;

const Payment = ({ payAmount, onPaymentSuccess, agree, car, totalPrice }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { startDate, startTime, endDate, endTime } = useSelector((state) => state.rent);

    const [depositorName, setDepositorName] = useState("");

    useEffect(() => {
        // 여기서는 결제 방법을 설정하지 않으므로, 추가적인 useEffect를 제거합니다.
    }, []);

    /** 결제 실행 */
    const handlePayment = () => {
        if (!agree) {
            alert("이용약관에 동의해주세요.");
            return;
        }

        // 결제 방식 체크 없이 바로 결제 실행
        handleReservation(`BANK_${Date.now()}`); // 예시로 무통장입금을 바로 처리
    };

    /** 결제 성공 후 예약 요청 실행 */
    const handleReservation = async (orderId) => {
        if (!orderId) {
            console.error("주문번호(orderId)가 없습니다.");
            return;
        }

        const reservationData = {
            car_id: car?.car_id, // 순환 참조 방지
            rental_datetime: `${startDate} ${startTime}:00`,
            return_location: 10,
            return_datetime: `${endDate} ${endTime}:00`,
            user_num: 2,
            order_id: orderId
        };

        try {
            const response = await fetch("http://localhost:8080/api/quick-rent/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) throw new Error("예약 실패!");

            const result = await response.json();
            console.log("예약 성공:", result);

            handleReservationSuccess(result);
            navigate("/reservation/paymentSuccess");
        } catch (error) {
            console.error("예약 오류:", error);
            alert("예약 중 오류가 발생했습니다.");
        }
    };

    /** Redux 저장 시 순환 참조 제거 */
    const handleReservationSuccess = (reservationData) => {
        const safeReservationData = JSON.parse(JSON.stringify(reservationData)); // 순환 참조 제거
        dispatch(saveReservation({ userNum: 2, reservationData: safeReservationData }));
    };

    return (
        <div>
            <button onClick={handlePayment} style={{ cursor: 'pointer', width: '100%', textAlign: 'center', borderRadius: '10px', backgroundColor: '#AFFF4F', marginTop: vwFont(20, 30), paddingTop: vwFont(8, 15), paddingBottom: vwFont(8, 15) }}>
                총 {totalPrice}원 결제하기
            </button>
        </div>
    );
};

export default Payment;
