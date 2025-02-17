import React from 'react';
import styled from 'styled-components';

import '../../css/main/PeriodPopupScreen.css';
import CustomCalendar from './CustomCalendar.js';

const SubHeadingStyle = styled.h5`margin-bottom: 5px; font-size: clamp(10px, 0.8vw, 14px);`;

function PeriodPopupScreen({ state, handler }){

    const { startDate, endDate, startTime, endTime } = state;
    const { setStartDate, setEndDate, setStartTime, setEndTime, setPeriodPopup } = handler;
    // 날짜 선택 시 업데이트
    const onDateChange = (selectedDate) => {
        if (!startDate) { // 시작일 선택되어있지 않은 경우
            setStartDate(selectedDate);
        }
        else if (startDate && !endDate){ // 시작일은 있고 끝일은 없는 경우
            if (selectedDate > startDate) { // 시작일가 선택된 날짜보다 이전인 경우
                setEndDate(selectedDate);
            }
            else { // 시작일이 선택된 날짜짜보다 이후인 경우
                setStartDate(selectedDate);
                setEndDate(null);
            }
        }
        else { // 시작일과 종료일이 모두 선택된 경우, 초기화
            setStartDate(selectedDate);
            setEndDate(null);
        }
    };
    
    return (
        <>
            <div className='period-popup-container'>

                <h4 style={{ fontSize:'clamp(14px, 1.4vw, 28px)' }}>일정선택</h4>
                <div style={{ width:'auto', marginTop:'8px', borderBottom:'1px solid grey' }}></div>

                <div className='calendar-container'>
                  <CustomCalendar onDateChange={onDateChange} startDate={startDate} endDate={endDate} />
                </div>

                <div className='rent-time'>
                    <div className='rent-start-time'>
                        <SelectedTime title='대여시간' setTime={setStartTime} />
                    </div>
                    <div className='rent-end-time'>
                        <SelectedTime title='반납시간' setTime={setEndTime} />
                    </div>
                </div>

                <button className='ok-btn' onClick={() => { setPeriodPopup(false) }}>선택완료</button>
            </div>
        </>
    );
}

function SelectedTime({ title, setTime }) {
    const timeList = TimeList();

    return (
        <div className='selected-time'>
            <SubHeadingStyle>{ title }</SubHeadingStyle>
            <select onChange={(e) => setTime(e.target.value)}>
            <option></option>
                {
                    timeList.map((time, i) => (
                        <option key={i} value={time}>
                            {time}
                        </option>
                    ))
                }
            </select>
        </div>
    );

}

 // 시간 리스트
 function TimeList() {
    const interval = 30; // 30분 단위
    const times = [];
    const currentTime = new Date();
    currentTime.setHours(0, 0, 0, 0); // 00:00

    while (currentTime.getDate() === new Date().getDate() ) {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');

        times.push(`${hours}:${minutes}`);
        currentTime.setMinutes(currentTime.getMinutes() + interval) ; // 30분 단위로 증가
    }

    return times;
}

export default PeriodPopupScreen;