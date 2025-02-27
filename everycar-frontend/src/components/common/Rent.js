import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSelector, useDispatch } from 'react-redux';
import { setPosPopup, setPeriodPopup } from '../../redux/rentSlice';
import { useNavigate } from 'react-router-dom';

import styles from '../../css/common/Rent.module.scss';

function Rent({ page }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux에서 상태 가져오기
    const { region, city, startDate, endDate, startTime, endTime, posPopup, periodPopup, reservationType } = useSelector((state) => state.rent);

    // 버튼 비활성화 조건 설정
    const isButtonDisabled = !startDate || !endDate || differenceInDays(endDate, startDate) < 1 ||
        (reservationType === "short-term" && differenceInDays(endDate, startDate) < 14) ||
        (reservationType === "speed" && differenceInDays(endDate, startDate) > 14);

    // 버튼 클릭 시 페이지 이동
    const movePageHandler = () => {
        if (isButtonDisabled) {
            alert("렌트 기간을 올바르게 선택해주세요."); // 조건이 맞지 않으면 알림 표시
            return;
        }
        if (page) {
            navigate(page);
        }
    };

    return (
        <div className={styles.contentContainer}>
            <div className={styles.contentBox}></div>

            <div className={styles.rentContainer}>
                <div className={styles.rentPos}>
                    <h5 className={styles.title}>렌트 장소</h5>
                    <div className={styles.content} onClick={() => dispatch(setPosPopup(!posPopup))}>
                        {city ? <p>{region} {city}</p> : <p style={{color: '#A0a0a0'}}>서울시 강남구</p>}
                    </div>
                </div>

                <div style={{ borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" }}></div>

                <div className={styles.rentPeriod}>
                    <h5 className={styles.title}>렌트 기간</h5>
                    <div className={styles.content}>
                        <div className={styles.period} onClick={() => dispatch(setPeriodPopup(!periodPopup))}>
                            <p className={styles.startPeriod}>
                                {startDate ? <b>{format(startDate, 'MM.dd(EE)', { locale: ko })} </b> : <b style={{color: '#A0a0a0'}}>01.01(수) </b>}
                                {startTime ? <span>{startTime}</span> : <span style={{color: '#A0a0a0'}}>10:00</span>}
                            </p>
                            <p className={styles.periodWave}>~</p>
                            <p className={styles.endPeriod}>
                                {endDate ? <b>{format(endDate, 'MM.dd(EE)', { locale: ko })}</b> : <b style={{color: '#A0a0a0'}}>01.03(금) </b>}
                                {endTime ? <span>{endTime}</span> : <span style={{color: '#A0a0a0'}}>10:00</span>}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.rentBtn}>
                    <button
                        onClick={movePageHandler}
                        disabled={isButtonDisabled}
                        className={isButtonDisabled ? styles.disabledBtn : styles.activeBtn}
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
