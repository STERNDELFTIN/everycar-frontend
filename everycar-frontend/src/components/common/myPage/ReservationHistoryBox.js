import React from "react";
import styled from "styled-components";

import styles from '../../../css/common/myPage/ReservationHistoryBox.module.scss';
import { vwFont } from '../../../utils';

// 예약 상태
function getRentalState(state, payment, reservationType,reservationId, startDate, startTime, endDate, endTime,) {
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

    
        // 현재 시간과 예약 시작 시간을 비교하는 함수
        const isReservationTimePassed = () => {
            const currentDate = new Date();
            // startDate와 startTime을 합쳐서 올바른 날짜 형식으로 생성
            const reservationStartDate = new Date(`${startDate} ${startTime}`);
            const reservationReturnDate = new Date(`${endDate} ${endTime}`);
            
            // 현재 시간이 예약 시작 시간과 종료 시간 사이에 있을 때만 true를 반환
            return currentDate >= reservationStartDate && currentDate <= reservationReturnDate;
        };

        const handleStartReservation = () => {
            console.log("reservationId 이용시작", reservationId);
            fetch(`http://localhost:8080/api/${reservationType}/reservations/${reservationId}/start`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("이용 시작 요청이 실패했습니다.");
                }
                return response.json();
            })
            .then(data => {
                console.log("이용 시작 성공:", data);
                alert("이용이 시작되었습니다.");
                window.location.reload();
            }
            )
            .catch(error => {
                console.error("이용 시작 실패:", error);
                alert(error.message);
                window.location.reload();
            });
        };

        // 예약 취소 요청 핸들러
        const handleCancelReservation = () => {
            // 예약 취소 확인 대화상자 띄우기
            const isConfirmed = window.confirm("정말 예약을 취소하시겠습니까?");
        
            if (isConfirmed) {
                console.log("reservationId 예약취소", reservationId);
            
                fetch(`http://localhost:8080/api/${reservationType}/reservations/${reservationId}/cancel`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => {
                        // 응답 상태가 성공적이면
                        if (!response.ok) {
                            // 실패한 상태일 때 처리
                            throw new Error("예약 취소 요청이 실패했습니다.");
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("예약 취소 성공:", data);
                        // 예약 취소 성공 후 알림과 새로고침
                        alert("예약이 취소되었습니다.");
                        window.location.reload();  // 페이지 새로고침
                    })
                    .catch(error => {
                        console.error("예약 취소 실패:", error);
                        alert(error.message);  // 오류 메시지 출력
                        window.location.reload();  // 페이지 새로고침
                    });
            } else {
                // 취소를 클릭했을 경우 아무 일도 하지 않음
                console.log("예약 취소 취소");
            }
        };

    // 이용 완료 요청 핸들러
    const handleCompleteReservation = () => {
        // 확인 대화상자 띄우기
        const isConfirmed = window.confirm('정말 이용을 완료하시겠습니까?');
        
        if (isConfirmed) {
            // 확인을 클릭했을 경우, 이용 완료 요청 처리
            console.log("이용 완료 요청:", reservationId);
            
            fetch(`http://localhost:8080/api/${reservationType}/reservations/${reservationId}/complete`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("이용 완료 요청이 실패했습니다.");
                    }
                    return response.json();
                })
                .then(response => {
                    if (response && response.message) {
                        alert(response.message);  // 서버 응답 메시지 출력
                    } else {
                        alert("이용 완료 성공!");  // 응답이 없을 경우 기본 메시지
                    }
                    window.location.reload();  // 페이지 새로고침
                })
                .catch(() => {
                    alert("이용 완료를 실패했습니다.");  // 오류 메시지 출력
                    window.location.reload();  // 페이지 새로고침
                });
        } else {
            // 취소를 클릭했을 경우 아무 일도 하지 않음
            console.log("이용 완료 취소");
        }
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
                    {isReservationTimePassed() ? (
                        <>
                        <button className={styles.button_active} onClick={handleStartReservation}>이용 시작</button>
                        <button onClick={handleViewDetails}>예약 상세보기</button>
                    </>
                    ) : (
                            <button onClick={handleViewDetails}>예약 상세보기</button>
                    )}
                </>
            );
        case '이용중': // 이용 완료
            return (
                <>
                    <button className={styles.button_active} onClick={handleCompleteReservation}>이용 완료</button>
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
                    <button className={styles.button_active} onClick={handleViewDetails}>리뷰 작성하기</button>
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
                    getRentalState(reservationStatus, payment, reservationType, reservationId, startDate, startTime, endDate, endTime,)
                }
            </div>
        </div>
    );
}

export default ReservationHistoryBox;
