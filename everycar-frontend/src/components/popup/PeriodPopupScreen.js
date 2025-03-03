import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStartDate, setEndDate, setPeriodPopup } from "../../redux/rentSlice.js";
import { addMonths, differenceInDays, isAfter, isBefore, isSameDay } from "date-fns";

import "../../css/popup/PeriodPopupScreen.css";
import CustomCalendar from "../common/CustomCalendar.js";
import SelectableTimeList from "../common/SelectableTimeList.js";

function PeriodPopupScreen({ reservationType }) {
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector((state) => state.rent);

    // 현재 날짜 및 최대 선택 가능 날짜
    const today = new Date();
    const maxSelectableDate = addMonths(today, 4); // 4개월 이상 선택 불가

    // Redux에서 가져온 날짜를 Date 객체로 변환
    const parsedStartDate = startDate ? new Date(startDate) : null;
    const parsedEndDate = endDate ? new Date(endDate) : null;

    // 날짜 초기화 함수
    const resetDates = () => {
        dispatch(setStartDate(null));
        dispatch(setEndDate(null));
    };

    // 날짜 선택 시 업데이트
    const onDateChange = (selectedDate) => {
        // 선택된 날짜가 Date객체인지 확인
        if (!(selectedDate instanceof Date)) {
            console.error("유효하지 않은 날짜 선택:", selectedDate);
            return;
        }

        // 과거 날짜 선택 방지
        if (isBefore(selectedDate, today) && !isSameDay(selectedDate, today)) {
            alert("과거 날짜는 선택할 수 없습니다.");
            resetDates(); // 날짜 초기화
            return;
        }

        // 단기렌트: 4개월 초과 선택 불가
        if (reservationType === "short" && isAfter(selectedDate, maxSelectableDate)) {
            alert("선택 가능한 날짜는 현재 날짜 기준 4개월 이내입니다.");
            resetDates(); // 날짜 초기화
            return;
        }

        // YYYY-MM-DD 형식 변환 (UTC 변환 방지)
        const formattedDate = selectedDate.getFullYear() + "-" +
            String(selectedDate.getMonth() + 1).padStart(2, "0") + "-" +
            String(selectedDate.getDate()).padStart(2, "0");

        // 시작 날짜 설정 로직
        if (!startDate || (startDate && endDate)) {
            dispatch(setStartDate(formattedDate));
            dispatch(setEndDate(null));
        } else {
            const dateDiff = differenceInDays(selectedDate, parsedStartDate) + 2; // selectedDate와 parsedStartDate는 포함하지 않으므로 이틀 더해주기

            // 빠른 예약: 14일 초과 불가
            if (reservationType === "quick" && dateDiff > 14) {
                alert("빠른예약의 렌트 기간은 최대 14일까지 가능합니다.");
                resetDates(); // 날짜 초기화
                return;
            }

            // 단기 렌트: 최소 14일 이상 선택해야 함
            if (reservationType === "short" && dateDiff < 14) {
                alert("단기렌트의 렌트 기간은 최소 14일 이상이어야 합니다.");
                resetDates(); // 날짜 초기화
                return;
            }

            // 반납일(endDate)이 시작일(startDate)보다 이전이면 초기화
            if (isBefore(selectedDate, parsedStartDate)) {
                alert("반납일은 대여일 이후여야 합니다.");
                resetDates(); // 날짜 초기화
                return;
            }

            dispatch(setEndDate(formattedDate));
        }
    };

    return (
        <div className="period-popup-container">
            <h4 style={{ fontSize: "clamp(14px, 1.4vw, 28px)" }}>일정 선택</h4>
            <div style={{ width: "auto", marginTop: "8px", borderBottom: "1px solid grey" }}></div>

            <div className="calendar-container">
                <CustomCalendar onDateChange={onDateChange} startDate={parsedStartDate} endDate={parsedEndDate} />
            </div>

            <div className="rent-time">
                <div className="rent-start-time">
                    <SelectableTimeList title="대여시간" type="start" />
                </div>
                <div className="rent-end-time">
                    <SelectableTimeList title="반납시간" type="end" />
                </div>
            </div>

            <button className="ok-btn" onClick={() => dispatch(setPeriodPopup(false))}>선택 완료</button>
        </div>
    );
}

export default PeriodPopupScreen;
