import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import '../../css/main/Popup.css';
import PosPopupScreen from '../PosPopupScreen.js';
import RegionPopupScreen from '../PeriodPopupScreen.js';
import usePopupOutsideClick from '../hooks/usePopupOutsideClick.js';


{/* Popup */}
function Popup({state, handler}) {
    const { selectedRegion, selectedCity, startDate, endDate, startTime, endTime, posPopup, periodPopup } = state;
    const { setPosPopup, setPeriodPopup, setSelectedRegion, setSelectedCity, setStartDate, setStartTime, setEndDate, setEndTime } = handler;

    // 렌트 장소 및 기간
    const posPopupRef = useRef(null); // 장소 팝업 참조
    const periodPopupRef = useRef(null); // 기간 팝업 참조

    // 지역
    const [region, setRegion] = useState([]);
    const [city, setCity] = useState([]);

    // 렌트위치 데이터 불러오기
    useEffect(() => {
        axios.get('/json/rent_position.json')
        .then(result => {
            setRegion(result.data);
        })
        .catch(error => {
            console.error("데이터 불러오기 실패: ", error);
        });
    }, []);

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
                                <PosPopupScreen
                                    state={{ region, city, selectedRegion, selectedCity }} 
                                    handler={{ setRegion, setCity, setSelectedCity, setSelectedRegion, setPosPopup }}
                                />
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
                                    state = {{ startDate, endDate, startTime, endTime }}
                                    handler={{ setStartDate, setEndDate, setStartTime, setEndTime, setPeriodPopup }} 
                                />
                            </div>
                        </div>
                    )
                }
        </div>
    );
}

export default Popup;