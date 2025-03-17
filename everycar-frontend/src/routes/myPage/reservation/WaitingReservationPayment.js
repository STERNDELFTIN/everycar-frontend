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

            console.log("PayPal 결제 요청 데이터:", {
                payment: reservationData.payment, // 결제 금액
                reservationId: parseInt(reservationId, 10),
                reservationType
            });

            const response = await fetch("http://localhost:8080/api/paypal/pay", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    payment: reservationData.payment,
                    reservationId,
                    reservationType
                })
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
                            <h3>예약상세정보</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>예약 ID</th>
                                        <td>{reservationData.reservationId}</td>
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
                                        <td>{reservationData.rental_datetime}</td>
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
                                        <td>{reservationData.return_datetime}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className={styles.payBtnContainer}>
                                <button
                                    onClick={handlePaypalPayment}
                                    className={styles.paypalPayBtn}
                                >
                                    <b>{reservationData.payment}</b>원 결제
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WaitingReservationPayment;
