import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveReservation } from "../../redux/reservationSlice"; // Redux 액션 추가

const Payment = ({ payAmount, reservationNum, onPaymentSuccess, agree, payClick }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Redux dispatch
    const [payMethod, setPayMethod] = useState("paypal"); // 선택된 결제 수단
    const [depositorName, setDepositorName] = useState(""); // 무통장 입금자명

    useEffect(() => {
        if (payMethod === "paypal" && agree) {
            renderPayPalButton();
        }
    }, [payMethod, agree]);

    /** PayPal 버튼 렌더링 */
    const renderPayPalButton = () => {
        if (!window.paypal) {
            console.error("PayPal SDK가 로드되지 않았습니다.");
            return;
        }

        const paypalContainer = document.getElementById("paypal-button-container");
        paypalContainer.innerHTML = ""; // 기존 버튼 제거 후 다시 렌더링

        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value: payAmount.toFixed(2) } }],
                });
            },
            onApprove: async (data, actions) => {
                await actions.order.capture();
                console.log("✅ PayPal 결제 성공!");
                handleReservationSuccess(); // 예약 정보 저장
                onPaymentSuccess();
                navigate("/reservation/rentReservation/paymentSuccess");
            },
            onError: (err) => {
                console.error("❌ PayPal 결제 실패:", err);
                navigate("/reservation/rentReservation/paymentFail");
            }
        }).render("#paypal-button-container");
    };

    /** Toss Payments 결제 실행 */
    const handleTossPayment = () => {
        if (!agree) {
            alert("이용약관에 동의해주세요.");
            return;
        }

        if (window.TossPayments) {
            const tossPayments = window.TossPayments("test_ck_PBal2vxj81jDapM9De5e35RQgOAN");
            tossPayments.requestPayment("카드", {
                amount: payAmount,
                orderId: reservationNum,
                orderName: "렌트카 예약",
                customerName: "테스트 사용자",
                successUrl: "http://localhost:3000/reservation/rentReservation/paymentSuccess",
                failUrl: "http://localhost:3000/reservation/rentReservation/paymentFail",
            })
                .then(() => {
                    console.log("✅ Toss Payments 결제 성공");
                    handleReservationSuccess(); // 예약 정보 저장
                    onPaymentSuccess();
                })
                .catch((error) => console.error("❌ Toss Payments 결제 실패:", error));
        } else {
            console.error("Toss Payments SDK가 로드되지 않았습니다.");
        }
    };

    /** 무통장 입금 처리 */
    const handleBankTransfer = () => {
        if (!agree) {
            alert("이용약관에 동의해주세요.");
            return;
        }

        if (!depositorName) {
            alert("입금자명을 입력해주세요.");
            return;
        }

        console.log("✅ 무통장 입금 요청 완료:", depositorName);
        alert("무통장 입금 요청이 완료되었습니다.");
        handleReservationSuccess(); // 예약 정보 저장
        onPaymentSuccess();
        navigate("/reservation/rentReservation/paymentSuccess");
    };

    /** 결제 성공 후 Redux에 예약 정보 저장 */
    const handleReservationSuccess = () => {
        const reservationDetails = {
            reservationNum,
            payAmount,
            payMethod,
            date: new Date().toLocaleString()
        };
        dispatch(saveReservation(reservationDetails)); // Redux에 예약 정보 저장
    };

    return (
        <div>
            <h3>결제 방법 선택</h3>
            <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                <option value="paypal">PayPal</option>
                <option value="toss">Toss Payments</option>
                <option value="bank_transfer">무통장 입금</option>
            </select>

            {payMethod === "paypal" && agree && (
                <div>
                    <h3>PayPal 결제</h3>
                    <div id="paypal-button-container"></div>
                </div>
            )}

            {payMethod === "bank_transfer" && (
                <div>
                    <h3>무통장 입금 정보</h3>
                    <p><strong>은행명:</strong> 국민은행</p>
                    <p><strong>계좌번호:</strong> 123-456-789012</p>
                    <label>
                        <strong>입금자명:</strong>
                        <input type="text" value={depositorName} onChange={(e) => setDepositorName(e.target.value)} />
                    </label>
                </div>
            )}

            {payMethod !== "paypal" && (
                <button
                    onClick={payMethod === "toss" ? handleTossPayment : handleBankTransfer}
                    disabled={!agree}
                >
                    결제하기
                </button>
            )}
        </div>
    );
};

export default Payment;
