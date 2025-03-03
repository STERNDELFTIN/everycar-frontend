import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setReservationType } from '../../redux/rentSlice.js';

import Popup from '../../components/popup/PosAndPeriodPopup.js';
import Rent from '../../components/common/Rent.js';

function ShortRent() {
    const dispatch = useDispatch();

    // 페이지 진입 시 `reservationType`을 "short"로 설정
    useEffect(() => {
        dispatch(setReservationType("short"));
    }, [dispatch]);

    return (
        <div>
            {/* Redux로 상태를 관리하므로 props 없이 사용 */}
            <Popup />
            <Rent page="/reservation/shortRentList" />
        </div>
    );
}

export default ShortRent;
