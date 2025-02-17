import React from 'react';

import '../../css/main/PeriodPopupScreen.css';
import CustomCalendar from './CustomCalendar.js';
import SelectableTimeList from '../SelectableTimeList.js';

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
                        <SelectableTimeList title='대여시간' setTime={setStartTime} />
                    </div>
                    <div className='rent-end-time'>
                        <SelectableTimeList title='반납시간' setTime={setEndTime} />
                    </div>
                </div>

                <button className='ok-btn' onClick={() => { setPeriodPopup(false) }}>선택완료</button>
            </div>
        </>
    );
}

export default PeriodPopupScreen;