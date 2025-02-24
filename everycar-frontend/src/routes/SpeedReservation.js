import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setReservationType } from '../redux/rentSlice.js';

import Popup from '../components/PosAndPeriodPopup';
import Rent from '../components/Rent.js';

function SpeedReservation() {
    const dispatch = useDispatch();

    // 페이지 진입 시 `reservationType`을 "speed"로 설정
    useEffect(() => {
        dispatch(setReservationType("speed"));
    }, [dispatch]);

    return (
        <div>
            {/* Redux로 상태를 관리하므로 props 없이 사용 */}
            <Popup />
            <Rent />
        </div>
    );
}

export default SpeedReservation;
