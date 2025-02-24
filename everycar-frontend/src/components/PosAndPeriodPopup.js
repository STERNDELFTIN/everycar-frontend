import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setPosPopup, setPeriodPopup, setRegion, setCity } from '../redux/rentSlice.js';

import '../css/main/Popup.css';
import PosPopupScreen from './PosPopupScreen.js';
import RegionPopupScreen from './PeriodPopupScreen.js';
import usePopupOutsideClick from './hooks/usePopupOutsideClick.js';


{/* Popup */}
function PosAndPeriodPopup() {
    // Redux 상태 불러오기
    const dispatch = useDispatch();
    const { posPopup, periodPopup, region, city, reservationType } = useSelector((state) => state.rent);

    // 렌트 장소 및 기간
    const posPopupRef = useRef(null); // 장소 팝업 참조
    const periodPopupRef = useRef(null); // 기간 팝업 참조

    // 렌트위치 데이터 불러오기
    useEffect(() => {
        axios.get('/json/rent_position.json')
        .then(result => {
            setRegion(result.data);
        })
        .catch(error => {
            console.error("데이터 불러오기 실패: ", error);
        });
    }, [dispatch]);

    // 팝업창 외부로 나갔을 경우, 팝업창 닫기
    usePopupOutsideClick(posPopupRef, () => { setPosPopup(false)});
    usePopupOutsideClick(periodPopupRef, () => { setPeriodPopup(false)});

    return(
        <div>
                {
                    posPopup && 
                    (
                        <div className='popup-bg'>
                            <div  ref={posPopupRef}>
                                <PosPopupScreen />
                            </div>
                        </div>
                    ) 
                }

                {
                    periodPopup && 
                    (
                        <div className='popup-bg'>
                            <div ref={periodPopupRef}>
                                <RegionPopupScreen
                                    reservationType = {reservationType}
                                />
                            </div>
                        </div>
                    )
                }
        </div>
    );
}

export default PosAndPeriodPopup;