import { createSlice } from '@reduxjs/toolkit';

// 기존 Redux 상태를 LocalStorage에서 불러오는 함수
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("rentState");
        return serializedState ? JSON.parse(serializedState) : {};
    } catch (error) {
        console.error("Redux 상태 로드 실패: ", error);
        return {};
    }
}

// 초기 상태
const initialState = loadState() || {
    posPopup: false,
    periodPopup: false,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    reservationType: "speed", // 기본 예약 타입 설정
    region: null,
    city: null,
    rentalDate: null, // startDate + startTime
    returnDate: null, // endDate + endTime
    ...loadState(), // 기존 데이터 유지
};

// ISO 8601 형식 변환 함수
const convertToISOString = (date, time) => {
    if (!date || !time) return null;
    return new Date(`${date} ${time}`).toISOString().split(".")[0];
}

const rentSlice = createSlice({
    name: 'rent',
    initialState,
    reducers: {
        setPosPopup: (state, action) => { state.posPopup = action.payload; },
        setPeriodPopup: (state, action) => { state.periodPopup = action.payload; },
        
        // 날짜 저장 시 문자열 형식으로 변환
        setStartDate: (state, action) => { 
            state.startDate = action.payload ? new Date(action.payload).toISOString().split("T")[0] : null;
            rentSlice.caseReducers.updateRentalReturnDates(state); // returnDate 업데이트
        },
        setEndDate: (state, action) => { 
            state.endDate = action.payload ? new Date(action.payload).toISOString().split("T")[0] : null;
            rentSlice.caseReducers.updateRentalReturnDates(state); // rentalDate 업데이트
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload;
            rentSlice.caseReducers.updateRentalReturnDates(state); // returnDate 업데이트
        },
        setEndTime: (state, action) => {
            state.endTime = action.payload;
            rentSlice.caseReducers.updateRentalReturnDates(state); // rentalDate 업데이트
        },

        setReservationType: (state, action) => { state.reservationType = action.payload; },
        setRegion: (state, action) => { state.region = action.payload; },
        setCity: (state, action) => { state.city = action.payload; },

        // rentalDate & returnDate 업데이트
        updateRentalReturnDates: (state) => {
            state.rentalDate = convertToISOString(state.startDate, state.startTime);
            state.returnDate = convertToISOString(state.endDate, state.endTime);
        }
    },
});

export const {
    setPosPopup, setPeriodPopup,
    setStartDate, setEndDate, setStartTime, setEndTime,
    setReservationType, setRegion, setCity,
    updateRentalReturnDates
} = rentSlice.actions;

export default rentSlice.reducer;
