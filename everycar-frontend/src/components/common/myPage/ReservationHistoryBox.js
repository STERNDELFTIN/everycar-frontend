import React from "react";
import styled from "styled-components";

import styles from '../../../css/common/myPage/ReservationHistoryBox.module.scss';
import { vwFont } from '../../../utils';

// 예약 상태
function getRentalState(state) {
    const handleViewDetails = () => {
        alert(`예약 상세 페이지로 이동합니다.`);
    };

    const handleCancelReservation = () => {
        alert(`예약이 취소되었습니다.`);
    };

    switch (state) {
        case '결제대기': // 예약 중
            return (
                <>
                    <button onClick={handleViewDetails}>결제하기</button>
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

function ReservationHistoryBox({ reservationStatus, carImage, carName, startDate, startTime, endDate, endTime, rentPos, returnPos }) {
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
                    getRentalState(reservationStatus)
                }
            </div>
        </div>
    );
}

export default ReservationHistoryBox;
