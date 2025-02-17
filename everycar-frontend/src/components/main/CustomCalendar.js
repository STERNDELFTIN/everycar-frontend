import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 리액트 캘린더 기본 스타일링

import '../../css/main/CustomCalendar.css';

function CustomCalendar({ onDateChange, startDate, endDate }){

    // 연도, 월은 한국어로 표시
    const formatYearMonth = (locale, date) => {
        return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(date);
    };

    // 선택한 날짜 범위
    const selectedDateRange = (date) => {
        if (!(startDate && endDate)) return false;
        return date >= startDate && date <= endDate;
    }
    
    return (
        <>
            <div className='calendar-container'>
                <Calendar
                    onChange={onDateChange}
                    locale="en-US" // 날짜 표시 형식
                    formatDay={(locale, date) => date.getDate()} // 날짜 숫자만 표시
                    formatMonthYear={formatYearMonth}  // 연도와 월은 한국어로
                    // 캘린더의 타일 클래스 이름 설정
                    tileClassName={({date, view}) => {
                        if (view == 'month') {
                            // 시작일
                            if (startDate && date.toDateString() === startDate.toDateString()) {
                                return 'start-date';
                            }
                            // 종료일
                            if (endDate && date.toDateString() === endDate.toDateString()) {
                                return 'end-date';
                            }
                            // 시작일과 종료일 사이
                            if (selectedDateRange(date)) {
                                return 'in-range-date';
                            }
                        }
                        return null;
                    }}
                />
            </div>
        </>
    );
}

export default CustomCalendar;