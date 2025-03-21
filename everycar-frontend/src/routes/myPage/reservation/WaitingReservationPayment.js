import { useParams } from "react-router-dom";
import styles from "../../../css/routes/myPage/reservation/WaitingReservationPayment.module.scss";
import { vwFont } from "../../../utils";
import useReservation from "../../../components/hooks/useReservation";
import TopContent from "../../../components/common/myPage/TopContent";
import ListContainer from "../../../components/common/myPage/ListContainer";

function WaitingReservationPayment() {
    const { reservationType, reservationId } = useParams();
    const { reservationData, loading, error } = useReservation(reservationType, reservationId);

    console.log("예약 데이터 확인:", reservationData);

    // PayPal 결제 요청
    const handlePaypalPayment = async () => {
        console.log("reservationId", reservationId);
        if (!reservationData) {
            alert("로딩 중...");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }

            const paymentInUSD = reservationData.payment / 1440; // 1원 = 1440달러 환산

            let requestData = {};

            if (reservationType === "short") {
                requestData = {
                    payment: paymentInUSD,
                    reservationId: reservationData.reservationSId || reservationId, // 예약 ID가 없으면 일반 예약 ID 사용
                    reservationType,
                    startDate: reservationData.reservation_s_start_date,
                    endDate: reservationData.reservation_s_end_date,
                    rentalLocation: reservationData.rentalLocationName
                };
            } else {
                requestData = {
                    payment: paymentInUSD,
                    reservationId: reservationData.reservationId,
                    reservationType,
                    startDate: reservationData.rental_datetime,
                    endDate: reservationData.return_datetime,
                    rentalLocation: reservationData.rentalLocationName,
                    returnLocation: reservationData.returnLocationName
                };
            }

            const response = await fetch("http://localhost:8080/api/paypal/pay", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();
            console.log("결제 요청 성공:", data);

            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                console.error("Redirect URL이 없습니다.");
                alert("결제 요청 실패: 응답에 URL이 없습니다.");
            }
        } catch (error) {
            console.error("결제 요청 실패:", error);
            alert("결제 요청 실패: " + error.message);
        }
    };


    return (
        <div className={styles.waitingReservationPayment}>
            <TopContent firstLocation='내예약내역' secondLocation='상세내역' />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: vwFont(18, 30) }}>
                    <h2>예약결제</h2>
                    {loading ? (
                        <p>예약 정보를 불러오는 중...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <div className={styles.reservationTable}>
                            <h3>예약 상세 정보</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>예약 ID</th>
                                        {
                                            (reservationType === "short") ? (
                                                <td>{reservationData.reservationSId}</td>
                                            ) : (
                                                <td>{reservationData.reservationId}</td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <th>차량명</th>
                                        <td>{reservationData.modelName}</td>
                                    </tr>
                                    <tr>
                                        <th>대여위치</th>
                                        <td>{reservationData.rentalLocationName}</td>
                                    </tr>
                                    <tr>
                                        <th>대여날짜</th>
                                        {
                                            (reservationType === "short") ? (
                                                <td>{reservationData.reservation_s_start_date}</td>
                                            ) : (
                                                <td>{reservationData.rental_datetime}</td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <th>반납위치</th>
                                        {
                                            (reservationType === "short") ? (
                                                <td>{reservationData.rentalLocationName}</td>
                                            ) : (
                                                <td>{reservationData.returnLocationName}</td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <th>반납날짜</th>
                                        {
                                            (reservationType === "short") ? (
                                                <td>{reservationData.reservation_s_end_date}</td>
                                            ) : (
                                                <td>{reservationData.return_datetime}</td>
                                            )
                                        }
                                    </tr>
                                </tbody>
                            </table>
                            <div className={styles.paymentCont}>
                                <h3>결제 정보</h3>
                                <div className={styles.paymentInfo}>
                                    <span>총 결제 금액</span>
                                    <span className={styles.payment}>{reservationData.payment} KRW</span>
                                </div>
                                <div className={styles.paymentInfo}>
                                    <span>달러 환산</span>
                                    <span>{(reservationData.payment / 1440).toFixed(2)} USD</span>
                                </div>
                                <div className={styles.payBtnContainer}>
                                    <button
                                        onClick={handlePaypalPayment}
                                        className={styles.paypalPayBtn}
                                    >
                                        <b>{(reservationData.payment / 1440).toFixed(2)}</b>USD 페이팔로 결제하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WaitingReservationPayment;
