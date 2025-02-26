import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>❌ 결제가 실패했습니다.</h2>
            <p>결제 진행 중 오류가 발생했습니다. 다시 시도해주세요.</p>
            <button onClick={() => navigate("/payment")}>결제 페이지로 이동</button>
        </div>
    );
};

export default PaymentFailPage;
