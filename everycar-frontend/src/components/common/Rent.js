import React, { useEffect, useRef } from 'react';
import { format, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSelector, useDispatch } from 'react-redux';
import { setPosPopup, setPeriodPopup } from '../../redux/rentSlice';
import { useNavigate } from 'react-router-dom';

import styles from '../../css/common/Rent.module.scss';

function Rent({ page }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const buttonRef = useRef(null); // 버튼에 대한 참조

    // Redux에서 상태 가져오기
    const { region, city, startDate, endDate, startTime, endTime, posPopup, periodPopup, reservationType } = useSelector((state) => state.rent);

    const rentalDays = startDate && endDate ? differenceInDays(new Date(endDate), new Date(startDate)) : 0;
    // 버튼 스타일 업데이트 함수
    const updateButtonStyle = () => {
        if (buttonRef.current) {
            if (!startDate || !endDate || rentalDays < 1 ||
                (reservationType === "quick" && rentalDays >= 14) ||
                (reservationType === "short" && rentalDays < 13)) {

                // 비활성화 스타일 적용
                buttonRef.current.style.backgroundColor = "#F3F3F3";
                buttonRef.current.style.backgroundImage = "none";
                buttonRef.current.style.cursor = "not-allowed";
            } else {
                // 활성화 스타일 적용
                buttonRef.current.style.backgroundColor = "transparent";
                buttonRef.current.style.backgroundImage = "linear-gradient(to left, #AFFF4F, #E6FF59)";
                buttonRef.current.style.cursor = "pointer";
            }
        }
    };

    // 렌트 기간이 변경될 때마다 버튼 스타일 업데이트
    useEffect(() => {
        updateButtonStyle();
    }, [startDate, endDate, reservationType]);

    // 버튼 클릭 시 페이지 이동
    const movePageHandler = () => {
        if (!startDate || !endDate || rentalDays < 1) {
            alert("렌트 기간을 올바르게 선택해주세요.");
            return;
        }

        if (reservationType === "quick" && rentalDays >= 14) {
            alert("렌트 기간을 올바르게 선택해주세요.");
            return;
        }

        if (reservationType === "short" && rentalDays <= 14) {
            alert("렌트 기간을 올바르게 선택해주세요.");
            return;
        }

        navigate(page);
    };

    return (
        <div className={styles.contentContainer}>
            <div className={styles.contentBox}></div>

            <div className={styles.rentContainer}>
                <div className={styles.rentPos}>
                    <h5 className={styles.title}>렌트 장소</h5>
                    <div className={styles.content} onClick={() => dispatch(setPosPopup(!posPopup))}>
                        {city ? <p>{region} {city}</p> : <p style={{ color: '#A0a0a0' }}>서울시 강남구</p>}
                    </div>
                </div>

                <div style={{ borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" }}></div>

                <div className={styles.rentPeriod}>
                    <h5 className={styles.title}>렌트 기간</h5>
                    <div className={styles.content}>
                        <div className={styles.period} onClick={() => dispatch(setPeriodPopup(!periodPopup))}>
                            <p className={styles.startPeriod}>
                                {startDate ? <b>{format(startDate, 'MM.dd(EE)', { locale: ko })} </b> : <b style={{ color: '#A0a0a0' }}>01.01(수) </b>}
                                {startTime ? <span> {startTime}</span> : <span style={{ color: '#A0a0a0' }}>10:00</span>}
                            </p>
                            <p className={styles.periodWave}>~</p>
                            <p className={styles.endPeriod}>
                                {endDate ? <b>{format(endDate, 'MM.dd(EE)', { locale: ko })}</b> : <b style={{ color: '#A0a0a0' }}>01.03(금) </b>}
                                {endTime ? <span> {endTime}</span> : <span style={{ color: '#A0a0a0' }}>10:00</span>}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.rentBtn}>
                    <button
                        ref={buttonRef}
                        onClick={movePageHandler}
                        style={{
                            backgroundColor: "#F3F3F3",
                            backgroundImage: "none",
                            cursor: "pointer"
                        }}
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

export default Rent;
