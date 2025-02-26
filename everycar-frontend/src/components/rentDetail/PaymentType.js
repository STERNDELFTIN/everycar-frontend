import { useState } from 'react';
import styled from 'styled-components';
import styles from '../../css/rentDetail/PaymentType.module.scss';
import { vwFont } from '../../utils';
import Payment from '../common/Payment';

function PaymentType({ title, SubTitleH3, agree, payClick }) {

    const paymentSucessHandler = () => {
        console.log("결제 성공!");
    }

    return (
        <div>
            <SubTitleH3>{title}</SubTitleH3>
            <Payment
                payAmount={1000}
                reservationNum={`RES_${Date.now()}`}
                onPaymentSuccess={paymentSucessHandler}
                agree={agree}
                payClick={payClick}
            />
        </div>
    );
}

export default PaymentType;