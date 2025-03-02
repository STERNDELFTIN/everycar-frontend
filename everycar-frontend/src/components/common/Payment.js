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

    const [payMethod, setPayMethod] = useState("paypal");
    const [depositorName, setDepositorName] = useState("");

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
        if (paypalContainer) {
            paypalContainer.innerHTML = "";
        }

        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value: totalPrice.toFixed(2) } }]
                });
            },
            onApprove: async (data, actions) => {
                await actions.order.capture();
                console.log("PayPal 결제 성공!");
                handleReservation(`PAYPAL_${Date.now()}`);
                onPaymentSuccess();
                navigate("/reservation/paymentSuccess");
            },
            onError: (err) => {
                console.error("PayPal 결제 실패:", err);
                navigate("/reservation/paymentFail");
            }
        }).render("#paypal-button-container");
    };

    /** 결제 실행 */
    const handlePayment = () => {
        if (!agree) {
            alert("이용약관에 동의해주세요.");
            return;
        }

        if (!payMethod) {
            alert("결제 방식을 선택해주세요.");
            return;
        }

        if (payMethod === "paypal") {
            renderPayPalButton();
        } else if (payMethod === "toss") {
            handleTossPayment();
        } else if (payMethod === "bank_transfer") {
            handleBankTransfer();
        }
    };

    /** Toss Payments 결제 실행 */
    const handleTossPayment = () => {
        if (!window.TossPayments) {
            console.error("Toss Payments SDK가 로드되지 않았습니다.");
            return;
        }

        const tossPayments = window.TossPayments("test_ck_PBal2vxj81jDapM9De5e35RQgOAN");
        const orderId = `RES_${Date.now()}`;

        console.log("Toss Payments 주문번호:", orderId);

        tossPayments.requestPayment("카드", {
            amount: totalPrice,
            orderId: orderId,
            orderName: "렌트카 예약",
            successUrl: "http://localhost:3000/reservation/paymentSuccess",
            failUrl: "http://localhost:3000/reservation/paymentFail"
        })
        .then(() => {
            console.log("Toss Payments 결제 성공");
            handleReservation(orderId);
        })
        .catch((error) => console.error("Toss Payments 결제 실패:", error));
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

        console.log("무통장 입금 요청 완료:", depositorName);
        alert("무통장 입금 요청이 완료되었습니다.");
        handleReservation(`BANK_${Date.now()}`);
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                <LabelStyle>
                    <input type="radio" name="payment" value="paypal" checked={payMethod === "paypal"} onChange={(e) => setPayMethod(e.target.value)} />
                    <p>PayPal</p>
                </LabelStyle>
                <LabelStyle>
                    <input type="radio" name="payment" value="toss" checked={payMethod === "toss"} onChange={(e) => setPayMethod(e.target.value)} />
                    <p>Toss</p>
                </LabelStyle>
                <LabelStyle>
                    <input type="radio" name="payment" value="bank_transfer" checked={payMethod === "bank_transfer"} onChange={(e) => setPayMethod(e.target.value)} />
                    <p>무통장 입금</p>
                </LabelStyle>
            </div>

            {payMethod === "paypal" && agree && <div id="paypal-button-container"></div>}

            {payMethod === "bank_transfer" && (
                <div style={{ color: 'grey', border: '1px solid rgba(143, 145, 145, 0.63)', borderRadius: '8px', padding: vwFont(10, 15), display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px', }}>
                    <p>은행명: 국민은행</p>
                    <p>계좌번호: 123-456-789012</p>
                    <label>
                        <p>입금자명:</p>
                        <input type="text" value={depositorName} onChange={(e) => setDepositorName(e.target.value)} style={{ height: vwFont(11, 15) }} />
                    </label>
                </div>
            )}

            <button onClick={handlePayment} style={{ cursor: 'pointer', width: '100%', textAlign: 'center', borderRadius: '10px', backgroundColor: '#AFFF4F', marginTop: vwFont(20, 30), paddingTop: vwFont(8, 15), paddingBottom: vwFont(8, 15) }}>
                총 {totalPrice}원 결제하기
            </button>
        </div>
    );
};

export default Payment;
