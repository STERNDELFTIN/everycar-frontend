import { useParams } from "react-router-dom";
import useReservation from "../../../components/hooks/useReservation";

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
                reservationId : parseInt(reservationId, 10),
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
        <div>
            <h2>예약 결제</h2>
            {loading ? (
                <p>예약 정보를 불러오는 중...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div>
                    <p>예약 ID: {reservationData.reservationId}</p>
                    <p>차량명: {reservationData.modelName}</p>
                    <p>결제 금액: {reservationData.payment}원</p>
                    <button onClick={handlePaypalPayment} style={{ padding: "10px", backgroundColor: "#0066ff", color: "white" }}>
                        페이팔로 결제하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default WaitingReservationPayment;
