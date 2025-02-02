import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import '../../css/main/Content.css';
import PosPopupScreen from './PosPopupScreen.js';
import RegionPopupScreen from './PeriodPopupScreen.js';
import usePopupOutsideClick from '../usePopupOutsideClick.js';

{/* Content */}
function Content() {

    // 렌트 장소 및 기간
    const [posPopup, setPosPopup] = useState(false);
    const [periodPopup, setPeriodPopup] = useState(false);
    const posPopupRef = useRef(null); // 장소 팝업 참조
    const periodPopupRef = useRef(null); // 기간 팝업 참조

    // 렌트 날짜 및 시간
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    // 지역
    const [region, setRegion] = useState([]);
    const [city, setCity] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    // 렌트위치 데이터 불러오기
    useEffect(() => {
        axios.get('/main/rent_position.json')
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
        <div className='content-container'>
            <div className='content-box'>

            </div>

            <div className='rent-container'>
                <div className='rent-pos'>
                    <h5 className='title'>렌트 장소</h5>
                    <div className='content' onClick={ () => setPosPopup(!posPopup) }>
                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.875 8.75C18.875 14.875 11 20.125 11 20.125C11 20.125 3.125 14.875 3.125 8.75C3.125 6.66142 3.95468 4.65838 5.43153 3.18153C6.90838 1.70468 8.91142 0.875 11 0.875C13.0886 0.875 15.0916 1.70468 16.5685 3.18153C18.0453 4.65838 18.875 6.66142 18.875 8.75Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 popup-container11.375C12.4497 11.375 13.625 10.1997 13.625 8.75C13.625 7.30025 12.4497 6.125 11 6.125C9.55025 6.125 8.375 7.30025 8.375 8.75C8.375 10.1997 9.55025 11.375 11 11.375Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        { selectedCity ? <p>{selectedRegion} {selectedCity}</p> : <p>서울시 강남구</p> }
                    </div>
                </div>

                {
                    posPopup && 
                    (
                        <div  ref={posPopupRef}>
                            <PosPopupScreen
                                state={{ region, city, selectedRegion, selectedCity }} 
                                handler={{ setRegion, setCity, setSelectedCity, setSelectedRegion }}
                            />
                        </div>
                    ) 
                }

                <div style={ { borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" } }></div>

                <div className='rent-period'>
                    <h5 className='title'>렌트 기간</h5>
                    <div className='content'>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 5.74999V11.5L15.3334 13.4167M21.0834 11.5C21.0834 16.7927 16.7928 21.0833 11.5 21.0833C6.20729 21.0833 1.91669 16.7927 1.91669 11.5C1.91669 6.20726 6.20729 1.91666 11.5 1.91666C16.7928 1.91666 21.0834 6.20726 21.0834 11.5Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className='period' onClick={() => setPeriodPopup(!periodPopup) }>
                            <p className='start-period'>
                                { startDate ? <b>{ format(startDate, 'MM.dd(EE)', { locale: ko }) } </b> : <b>01.01(수) </b> }
                                { startTime ? <span>{startTime}</span> : '10:00' }
                            </p>
                            <p style={{ margin: "0 20px" }}>~</p>
                            <p className='end-period'>
                                { endDate ? <b>{ format(endDate,'MM.dd(EE)', { locale: ko }) }</b> : <b>01.03(금) </b> }
                                { endTime ? <span>{endTime}</span> : '10:00' }
                            </p>
                        </div>
                    </div>
                </div>

                {
                    periodPopup && 
                    (
                        <div ref={periodPopupRef}>
                            <RegionPopupScreen
                                state = {{ startDate, endDate, startTime, endTime }}
                                handler={{ setStartDate, setEndDate, setStartTime, setEndTime }} 
                            />
                        </div>
                    )
                }

                <div className='rent-btn'>
                    <button>
                        <div className='arow'>
                            <svg width="24" height="41" viewBox="0 0 24 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2L20.5 20.5L2.5 39" stroke="#252736" strokeWidth="4" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Content;