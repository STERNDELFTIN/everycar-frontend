import React from 'react';
import { useNavigate } from 'react-router-dom';
import { differenceInDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSelector, useDispatch } from 'react-redux';
import { setPosPopup, setPeriodPopup } from '../../redux/rentSlice.js';

import '../../css/main/Content.css';
import Event from './Event.js';

function Content() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux에서 상태 가져오기
    const { region, city, startDate, endDate, startTime, endTime, posPopup, periodPopup } = useSelector((state) => state.rent);

    // 버튼 비활성화 조건 설정 (빠른예약: 1 <= day <= 14)
    const isButtonDisabled = !startDate || !endDate || differenceInDays(endDate, startDate) < 1 || differenceInDays(endDate, startDate) > 14;
    // 버튼 클릭 시 조건 확인 후 이동
    const moveSpeedReservationHandler = () => {
        if (isButtonDisabled) {
            alert("렌트 기간을 올바르게 선택해주세요. (1일 이상 14일 이하)");
            return;
        }
        // 빠른예약 페이지로 이동
        navigate('/speedReservation');
    }

    return (
        <div className='content-container'>
            <div className='content-box'>
                <Event />
            </div>

            <div className='rent-container'>
                <div className='rent-pos'>
                    <h5 className='title'>렌트 장소</h5>
                    <div className='content' onClick={() => dispatch(setPosPopup(!posPopup))}>
                        <svg width="18" style={{height:"auto"}} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.875 8.75C16.875 14.875 9 20.125 9 20.125C9 20.125 1.125 14.875 1.125 8.75C1.125 6.66142 1.95468 4.65838 3.43153 3.18153C4.90838 1.70468 6.91142 0.875 9 0.875C11.0886 0.875 13.0916 1.70468 14.5685 3.18153C16.0453 4.65838 16.875 6.66142 16.875 8.75Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 11.375C10.4497 11.375 11.625 10.1997 11.625 8.75C11.625 7.30025 10.4497 6.125 9 6.125C7.55025 6.125 6.375 7.30025 6.375 8.75C6.375 10.1997 7.55025 11.375 9 11.375Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {city ? <p>{region} {city}</p> : <p style={{color: '#A0a0a0'}}>서울시 강남구</p>}
                    </div>
                </div>

                <div style={{ borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" }}></div>

                <div className='rent-period'>
                    <h5 className='title'>렌트 기간</h5>
                    <div className='content'>
                        <svg width="23" style={{height:"auto"}} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 5.74999V11.5L15.3334 13.4167M21.0834 11.5C21.0834 16.7927 16.7928 21.0833 11.5 21.0833C6.20729 21.0833 1.91669 16.7927 1.91669 11.5C1.91669 6.20726 6.20729 1.91666 11.5 1.91666C16.7928 1.91666 21.0834 6.20726 21.0834 11.5Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className='period' onClick={() => dispatch(setPeriodPopup(!periodPopup))}>
                            <p className='start-period'>
                                {startDate ? <b>{format(startDate, 'MM.dd(EE)', { locale: ko })} </b> : <b style={{color: '#A0a0a0'}}>01.01(수) </b>}
                                {startTime ? <span>{startTime}</span> : <span style={{color: '#A0a0a0'}}>10:00</span>}
                            </p>
                            <p className='period-wave'>~</p>
                            <p className='end-period'>
                                {endDate ? <b>{format(endDate, 'MM.dd(EE)', { locale: ko })}</b> : <b style={{color: '#A0a0a0'}}>01.03(금) </b>}
                                {endTime ? <span>{endTime}</span> : <span style={{color: '#A0a0a0'}}>10:00</span>}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='rent-btn'>
                    <button
                        onClick={moveSpeedReservationHandler}
                        disabled={isButtonDisabled}
                        className={isButtonDisabled ? 'disabled-btn' : 'active-btn'}
                    >
                        <div className='arow'>
                            <svg width="24" height="41" viewBox="0 0 24 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2L20.5 20.5L2.5 39" stroke="#252736" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Content;
