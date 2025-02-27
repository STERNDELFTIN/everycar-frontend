import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setPosPopup, setPeriodPopup, setRegion } from '../../redux/rentSlice.js';

import '../../css/popup/PosAndPeriodPopup.css';
import PosPopupScreen from './PosPopupScreen.js';
import RegionPopupScreen from './PeriodPopupScreen.js';
import usePopupOutsideClick from '../hooks/usePopupOutsideClick.js';

function PosAndPeriodPopup() {
    const dispatch = useDispatch();
    const { posPopup, periodPopup, reservationType } = useSelector((state) => state.rent);

    const posPopupRef = useRef(null);
    const periodPopupRef = useRef(null);

    useEffect(() => {
        axios.get('/json/rent_position.json')
        .then(result => {
            console.log("렌트 위치 데이터 불러오기 성공:", result.data);
            dispatch(setRegion(result.data));
        })
        .catch(error => {
            console.error("렌트 위치 데이터 불러오기 실패: ", error);
        });
    }, [dispatch]);

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
