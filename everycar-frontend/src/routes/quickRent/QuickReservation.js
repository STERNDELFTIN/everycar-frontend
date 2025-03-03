import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setReservationType } from '../../redux/rentSlice.js';

import Popup from '../../components/popup/PosAndPeriodPopup.js';
import Rent from '../../components/common/Rent.js';

function QuickReservation() {
    const dispatch = useDispatch();

    // 페이지 진입 시 reservationType을 "quick"로 설정
    useEffect(() => {
        dispatch(setReservationType("quick"));
    }, [dispatch]);

    return (
        <div>
            <Popup />
            <Rent page='/reservation/quickReservation/list'/>
        </div>
    );
}

export default QuickReservation;
