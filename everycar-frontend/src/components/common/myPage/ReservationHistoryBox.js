import React from "react";
import styled from "styled-components";

import styles from '../../../css/common/myPage/ReservationHistoryBox.module.scss';
import { vwFont } from '../../../utils';

// 예약 상태
function getRentalState(state, payment, reservationType,reservationId) {
    const handlePayments = () => {
        console.log("reservationId", reservationId);
        // POST 요청 보내기
        fetch("http://localhost:8080/api/paypal/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payment: payment / 1445,
                reservationId: reservationId,
                reservationType: reservationType, // reservationType 추가
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("결제 요청 성공:", data);
                if (data.redirectUrl) {
                    // redirectUrl로 사용자를 리다이렉트
                    window.location.href = data.redirectUrl;
                } else {
                    console.error("Redirect URL이 없습니다.");
                }
            })
            .catch(error => {
                console.error("결제 요청 실패:", error);
            });
    };

    const handleViewDetails = () => {
        alert(`예약 상세보기`);
    };
    const handleCancelReservation = () => {
        alert(`예약이 취소되었습니다.`);
    };

    switch (state) {
        case '결제대기': // 예약 중
            return (
                <>
                    <button className={styles.button_active} onClick={handlePayments}>결제하기</button>
                    <button onClick={handleCancelReservation}>예약 취소</button>
                </>
            );
        case '결제완료': // 이용 중
            return (
                <>
                    <button onClick={handleViewDetails}>예약 상세보기</button>
                </>
            );
        case '이용중': // 이용 완료
            return (
                <>
                    <button onClick={handleViewDetails}>이용 완료</button>
                    <button onClick={handleCancelReservation}>예약 상세보기</button>
                </>
            );
        case '예약취소': // 취소됨
            return (
                <>
                    <button onClick={handleViewDetails}>예약 상세보기</button>
                </>
            );
        case '이용완료': // 취소됨
            return (
                <>
                    <button onClick={handleViewDetails}>예약 상세보기</button>
                </>
            );
        default:
            return null;
    }
}

function ReservationHistoryBox({ reservationStatus, carImage, carName, payment, startDate, startTime, endDate, endTime, rentPos, returnPos, reservationType, reservationId }) {
    console.log("ReservationHistoryBox Props:", {
        reservationStatus,
        carImage,
        carName,
        startDate,
        startTime,
        endDate,
        endTime,
        rentPos,
        returnPos,
        payment,
        reservationType,
        reservationId
    });

    return (
        <div className={styles.reservationHistoryBox}>
            <div className={styles.rentalStateBox}>
                <p className={`${styles.rentalState} ${reservationStatus === '이용중' ? styles.usingStatus : ""}`}>
                    {reservationStatus}
                </p>
            </div>

            <div className={styles.rentalInfo}>
                <img src={carImage} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: vwFont(10, 15), }}>
                    <h4 className={styles.carName}>{carName}</h4>
                    <p className={styles.rentDate}>{`${startDate} ${startTime} ~ ${endDate} ${endTime}`}</p>
                    <p className={styles.payment}>결제금액 {payment}원</p>
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

            <div className={styles.buttonContainer}>
                {
                    getRentalState(reservationStatus, payment, reservationType, reservationId)
                }
            </div>
        </div>
    );
}

export default ReservationHistoryBox;
