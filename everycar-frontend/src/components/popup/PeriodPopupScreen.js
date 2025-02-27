import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setEndDate, setPeriodPopup } from '../../redux/rentSlice.js';
import { addMonths, differenceInDays, isAfter, isBefore, isSameDay } from 'date-fns';

import '../../css/popup/PeriodPopupScreen.css';
import CustomCalendar from '../common/CustomCalendar.js';
import SelectableTimeList from '../common/SelectableTimeList.js';

function PeriodPopupScreen({ reservationType }){

    // Redux 상태 가져오기
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector((state) => state.rent);

    // 현재 날짜 및 최대 선택 가능 날짜
    const today = new Date();
    const maxSelectableDate = addMonths(today, 4); // 4개월 이상 선택 불가

    // 날짜 선택 시 업데이트
    const onDateChange = (selectedDate) => {
        if (isBefore(selectedDate, today) && !isSameDay(selectedDate, today)) {
            alert("과거 날짜는 선택할 수 없습니다.");
            dispatch(setStartDate(null));
            dispatch(setEndDate(null));
            return;
        }
        if (reservationType === "short-term" && isAfter(selectedDate, maxSelectableDate)) {
            alert("선택 가능한 날짜는 현재 날짜 기준 4개월 이내입니다.");
            return;
        }

        if (!startDate) { // 시작일 선택되어있지 않은 경우
            dispatch(setStartDate(selectedDate));
        }
        else if (startDate && !endDate){ // 시작일은 있고 끝일은 없는 경우
            const dateDiff = differenceInDays(selectedDate, startDate);

            if (reservationType === "speed") {
                // 빠른 예약: 14일 이상 선택 불가
                if (dateDiff > 14) {
                    alert("빠른예약의 렌트 기간은 최대 14일까지 가능합니다.");
                    return;
                }
            }
            else if (reservationType === "short-term") {
                // 단기 예약: 14일 미만 선택 불가
                if (dateDiff < 14) {
                    alert("단기렌트의 렌트 기간은 최소 14일 이상이어야 합니다.");
                    return;
                }
            }

            // 종료일 설정
            dispatch(setEndDate(selectedDate));

            if (selectedDate > startDate) { // 시작일이 선택된 날짜보다 이전인 경우
                dispatch(setEndDate(selectedDate));
            }
            else { // 시작일이 선택된 날짜보다 이후인 경우
                dispatch(setStartDate(selectedDate));
                dispatch(setEndDate(null));
            }
        }
        else { // 시작일과 종료일이 모두 선택된 경우, 초기화
            dispatch(setStartDate(selectedDate));
            dispatch(setEndDate(null));
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
                        <SelectableTimeList title='대여시간' type='start' />
                    </div>
                    <div className='rent-end-time'>
                        <SelectableTimeList title='반납시간' type='end' />
                    </div>
                </div>

                <button className='ok-btn' onClick={() => { dispatch(setPeriodPopup(false)) }}>선택완료</button>
            </div>
        </>
    );
}

export default PeriodPopupScreen;