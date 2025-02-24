import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSelector, useDispatch } from 'react-redux';
import { setPosPopup, setPeriodPopup } from '../redux/rentSlice';

import styles from '../css/Rent.module.scss';

function Rent() {
    const dispatch = useDispatch();

    // Redux에서 상태 가져오기
    const { selectedRegion, selectedCity, startDate, endDate, startTime, endTime, posPopup, periodPopup } = useSelector((state) => state.rent);

    return (
        <div className={styles.contentContainer}>
            <div className={styles.contentBox}>
                
            </div>

            <div className={styles.rentContainer}>
                <div className={styles.rentPos}>
                    <h5 className={styles.title}>렌트 장소</h5>
                    <div className={styles.content} onClick={() => dispatch(setPosPopup(!posPopup))}>
                        <svg width="18" height="auto" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.875 8.75C16.875 14.875 9 20.125 9 20.125C9 20.125 1.125 14.875 1.125 8.75C1.125 6.66142 1.95468 4.65838 3.43153 3.18153C4.90838 1.70468 6.91142 0.875 9 0.875C11.0886 0.875 13.0916 1.70468 14.5685 3.18153C16.0453 4.65838 16.875 6.66142 16.875 8.75Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 11.375C10.4497 11.375 11.625 10.1997 11.625 8.75C11.625 7.30025 10.4497 6.125 9 6.125C7.55025 6.125 6.375 7.30025 6.375 8.75C6.375 10.1997 7.55025 11.375 9 11.375Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {selectedCity ? <p>{selectedRegion} {selectedCity}</p> : <p>서울시 강남구</p>}
                    </div>
                </div>

                <div style={{ borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" }}></div>

                <div className={styles.rentPeriod}>
                    <h5 className={styles.title}>렌트 기간</h5>
                    <div className={styles.content}>
                        <svg width="23" height="auto" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 5.74999V11.5L15.3334 13.4167M21.0834 11.5C21.0834 16.7927 16.7928 21.0833 11.5 21.0833C6.20729 21.0833 1.91669 16.7927 1.91669 11.5C1.91669 6.20726 6.20729 1.91666 11.5 1.91666C16.7928 1.91666 21.0834 6.20726 21.0834 11.5Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className={styles.period} onClick={() => dispatch(setPeriodPopup(!periodPopup))}>
                            <p className={styles.startPeriod}>
                                {startDate ? <b>{format(startDate, 'MM.dd(EE)', { locale: ko })} </b> : <b>01.01(수) </b>}
                                {startTime ? <span>{startTime}</span> : '10:00'}
                            </p>
                            <p className={styles.periodWave}>~</p>
                            <p className={styles.endPeriod}>
                                {endDate ? <b>{format(endDate, 'MM.dd(EE)', { locale: ko })}</b> : <b>01.03(금) </b>}
                                {endTime ? <span>{endTime}</span> : '10:00'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.rentBtn}>
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

export default Rent;
