import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';  // reservationId를 URL에서 추출
import { vwFont } from '../../../utils';
import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';
import styles from '../../../css/routes/myPage/reservation/MyReservationHistory.module.scss';
import ReservationDetailBox from "../../../components/common/myPage/ReservationDetailBox";

function MyReservationHistoryDetail() {
    const { reservationType, reservationId } = useParams();  // URL에서 reservationId 추출

    return (
        <div className={styles.myReservationHistory}>
            <TopContent currentLocation='내예약내역' />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: vwFont(18, 30) }}>
                    <h2>내 예약 내역</h2>
                    <ReservationDetail
                        reservationType={reservationType}
                        reservationId={reservationId}  // reservationId를 ReservationDetail로 전달
                    />

                </div>
            </div>
        </div>
    );
}

function ReservationDetail({ reservationId }) {

    return (
        <div>
            <h3>예약 상세 내역</h3>
            <ReservationDetailBox
                reservationId={reservationId}
            />
        </div>
    )
}
export default MyReservationHistoryDetail;