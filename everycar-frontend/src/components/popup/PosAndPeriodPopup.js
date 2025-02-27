import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosPopup, setPeriodPopup } from '../../redux/rentSlice.js';

import '../../css/popup/PosAndPeriodPopup.css';
import PosPopupScreen from './PosPopupScreen.js';
import RegionPopupScreen from './PeriodPopupScreen.js';
import usePopupOutsideClick from '../hooks/usePopupOutsideClick.js';
import useRentLocationData from '../hooks/useRentLocation.js';

function PosAndPeriodPopup() {
    const dispatch = useDispatch();
    const { posPopup, periodPopup, reservationType } = useSelector((state) => state.rent);

    const posPopupRef = useRef(null);
    const periodPopupRef = useRef(null);

    // 렌트 위치 데이터
    useRentLocationData();

    usePopupOutsideClick(posPopupRef, () => dispatch(setPosPopup(false)));
    usePopupOutsideClick(periodPopupRef, () => dispatch(setPeriodPopup(false)));

    return (
        <div>
            {posPopup && (
                <div className='popup-bg'>
                    <div ref={posPopupRef}>
                        <PosPopupScreen />
                    </div>
                </div>
            )}

            {periodPopup && (
                <div className='popup-bg'>
                    <div ref={periodPopupRef}>
                        <RegionPopupScreen reservationType={reservationType} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PosAndPeriodPopup;
