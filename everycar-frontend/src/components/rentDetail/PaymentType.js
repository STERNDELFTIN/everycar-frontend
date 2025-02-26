import { useState } from 'react';
import styled from 'styled-components';
import styles from '../../css/rentDetail/PaymentType.module.scss';
import { vwFont } from '../../utils';

function PaymentType({ title, SubTitleH3 }) {
    return (
        <div>
            <SubTitleH3>{title}</SubTitleH3>
            <label style={{display: 'flex',}}>
                <input
                    type='radio' />
                <p>PayPal</p>
            </label>
            <label style={{display: 'flex',}}>
                <input
                    type='radio' />
                <p>무통장 입금</p>
            </label>
        </div>
    );
}

export default PaymentType;