import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveReservation } from "../../redux/reservationSlice"; // Redux 액션 추가
import { vwFont } from "../../utils";
import styled from "styled-components";

const LabelStyle = styled.label`display: flex; text-align: center; gap: 6px;`;

const Payment = ({ payAmount, reservationNum, onPaymentSuccess, agree, car}) => {
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
                console.log("PayPal 결제 성공!");
                handleReservationSuccess(); // 예약 정보 저장
                onPaymentSuccess();
                navigate("/reservation/rentReservation/paymentSuccess");
            },
            onError: (err) => {
                console.error("PayPal 결제 실패:", err);
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
                    console.log("Toss Payments 결제 성공");
                    handleReservationSuccess(); // 예약 정보 저장
                    onPaymentSuccess();
                })
                .catch((error) => console.error("Toss Payments 결제 실패:", error));
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

        console.log("무통장 입금 요청 완료:", depositorName);
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
            <div style={{display: 'flex', flexDirection: 'column', gap: '13px', }}>
                <LabelStyle>
                    <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={payMethod === "paypal"}
                        onChange={(e) => setPayMethod(e.target.value)}
                    />
                    <p style={payMethod === "paypal" ? {color: '#000', display: 'flex', alignItems: 'center', } : { color: '#8F9191', display: 'flex', alignItems: 'center', }}>PayPal</p>
                </LabelStyle>
                <LabelStyle>
                    <input
                        type="radio"
                        name="payment"
                        value="toss"
                        checked={payMethod === "toss"}
                        onChange={(e) => setPayMethod(e.target.value)}
                    />
                    <p style={payMethod === "toss" ? {color: '#000', display: 'flex', alignItems: 'center',} : { color: '#8F9191', display: 'flex', alignItems: 'center', }}>Toss</p>
                </LabelStyle>
                <LabelStyle>
                    <input
                        type="radio"
                        name="payment"
                        value="bank_transfer"
                        checked={payMethod === "bank_transfer"}
                        onChange={(e) => setPayMethod(e.target.value)}
                    />
                    <p style={payMethod === "bank_transfer" ? {color: '#000', display: 'flex', alignItems: 'center',} : { color: '#8F9191', display: 'flex', alignItems: 'center', }}>무통장 입금</p>
                </LabelStyle>
            </div>

            {/* PayPal 선택 시 약관 동의 후 버튼 표시 */}
            {payMethod === "paypal" && agree && (
                <div style={{marginTop: '10px', }}>
                    <div id="paypal-button-container"></div>
                    <p>※PayPal 결제 방식은 상단의 노란 박스를 클릭해주세요.</p>
                </div>
            )}

            {/* 무통장 입금 UI */}
            {payMethod === "bank_transfer" && (
                <div style={{marginTop: vwFont(9, 15), border: '1px solid rgba(143, 145, 145, 0.63)', borderRadius: '8px', padding: vwFont(5, 10) && vwFont(10, 15), display: 'flex', flexDirection: 'column', gap: '12px', }}>
                    <p style={{display: 'flex', gap: '3px', }}><p style={{fontWeight: '600'}}>은 행 명: </p> 국민은행</p>
                    <p style={{display: 'flex', gap: '3px', }}><p style={{fontWeight: '600'}}>계좌번호: </p> 123-456-789012</p>
                    <label style={{display: 'flex', gap: '5px', alignItems: 'center',  }}>
                        <p style={{fontWeight: '600'}}>입금자명: </p>
                        <input
                            type="text"
                            value={depositorName}
                            onChange={(e) => setDepositorName(e.target.value)}
                            style={{height: vwFont(11, 15)}}
                        />
                    </label>
                </div>
            )}

            {/* 결제 버튼 */}
            <button
                onClick={() => {
                    if (!agree) { alert('이용약관에 동의해주세요.'); return; }
                    if (!payMethod) { alert('결제 방식을 선택해주세요.'); return; }
                    
                    if (payMethod === "paypal") renderPayPalButton();
                    else if (payMethod === "toss") handleTossPayment();
                    else if (payMethod === "bank_transfer") handleBankTransfer();
                }}
                style={{ cursor: 'pointer', width: '100%', textAlign: 'center', borderRadius: '10px', backgroundColor: '#AFFF4F', marginTop: vwFont(20, 30), paddingTop:vwFont(8, 15), paddingBottom:vwFont(8, 15)}}
            >
                총 {car.calculatedPrice}원 결제하기
            </button>
        </div>
    );
};

export default Payment;
