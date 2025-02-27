import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setEndDate, setPeriodPopup } from '../../redux/rentSlice.js';
import { addMonths, differenceInDays, isAfter, isBefore, isSameDay } from 'date-fns';

import '../../css/popup/PeriodPopupScreen.css';
import CustomCalendar from '../common/CustomCalendar.js';
import SelectableTimeList from '../common/SelectableTimeList.js';

function PeriodPopupScreen({ reservationType }) {
    // Redux 상태 가져오기
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector((state) => state.rent);

    // 현재 날짜 및 최대 선택 가능 날짜
    const today = new Date();
    const maxSelectableDate = addMonths(today, 4); // 4개월 이상 선택 불가

    // Redux에서 가져온 날짜를 Date 객체로 변환
    const parsedStartDate = startDate ? new Date(startDate) : null;
    const parsedEndDate = endDate ? new Date(endDate) : null;

    // 날짜 선택 시 업데이트
    const onDateChange = (selectedDate) => {
        if (isBefore(selectedDate, today) && !isSameDay(selectedDate, today)) {
            alert("과거 날짜는 선택할 수 없습니다.");
            return;
        }
        if (reservationType === "short-term" && isAfter(selectedDate, maxSelectableDate)) {
            alert("선택 가능한 날짜는 현재 날짜 기준 4개월 이내입니다.");
            return;
        }
    
        // UTC 변환 방지: YYYY-MM-DD 형식으로 로컬 시간 기준 변환
        const formattedDate = selectedDate.getFullYear() + "-" +
            String(selectedDate.getMonth() + 1).padStart(2, "0") + "-" +
            String(selectedDate.getDate()).padStart(2, "0");
    
        if (!startDate || (startDate && endDate)) {
            dispatch(setStartDate(formattedDate));
            dispatch(setEndDate(null));
        } else if (!endDate) {
            const parsedStartDate = startDate ? new Date(startDate) : null;
            const dateDiff = differenceInDays(selectedDate, parsedStartDate);
    
            if (reservationType === "speed" && dateDiff > 14) {
                alert("빠른예약의 렌트 기간은 최대 14일까지 가능합니다.");
                return;
            } else if (reservationType === "short-term" && dateDiff < 14) {
                alert("단기렌트의 렌트 기간은 최소 14일 이상이어야 합니다.");
                return;
            }
    
            dispatch(setEndDate(formattedDate));
        }
    };    

    return (
        <div className='period-popup-container'>
            <h4 style={{ fontSize: 'clamp(14px, 1.4vw, 28px)' }}>일정선택</h4>
            <div style={{ width: 'auto', marginTop: '8px', borderBottom: '1px solid grey' }}></div>

            <div className='calendar-container'>
                <CustomCalendar 
                    onDateChange={onDateChange} 
                    startDate={parsedStartDate}  
                    endDate={parsedEndDate}  
                />
            </div>

            <div className='rent-time'>
                <div className='rent-start-time'>
                    <SelectableTimeList title='대여시간' type='start' />
                </div>
                <div className='rent-end-time'>
                    <SelectableTimeList title='반납시간' type='end' />
                </div>
            </div>

            <button className='ok-btn' onClick={() => dispatch(setPeriodPopup(false))}>선택완료</button>
        </div>
    );
}

export default PeriodPopupScreen;
