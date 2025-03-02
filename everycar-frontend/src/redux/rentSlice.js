import { createSlice } from "@reduxjs/toolkit";

// 기존 Redux 상태를 LocalStorage에서 불러오는 함수 (posPopup, periodPopup 제외)
const loadState = () => {
    try {
        const serializedState = localStorage.getItem("rentState");
        if (!serializedState) return {};
        const state = JSON.parse(serializedState);

        // posPopup, periodPopup을 제거한 상태 반환
        delete state.posPopup;
        delete state.periodPopup;

        return state;
    } catch (error) {
        console.error("Redux 상태 로드 실패: ", error);
        return {};
    }
};

// Redux 상태를 LocalStorage에 저장하는 함수 (posPopup, periodPopup 제외)
const saveState = (state) => {
    try {
        const { posPopup, periodPopup, ...stateToSave } = state; // posPopup, periodPopup 제외
        localStorage.setItem("rentState", JSON.stringify(stateToSave));
    } catch (error) {
        console.error("Redux 상태 저장 실패: ", error);
    }
};

// 초기 상태 (LocalStorage에서 불러온 값 유지)
const initialState = {
    posPopup: false,
    periodPopup: false,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    reservationType: "speed",
    region: null,
    city: null,
    rentalDate: null,
    returnDate: null,
    ...loadState(), // 기존 데이터 유지 (posPopup, periodPopup 제외됨)
};

// ISO 8601 형식 변환 함수
const convertToISOString = (date, time) => {
    if (!date || !time) return null;
    return new Date(`${date} ${time}`).toISOString().split(".")[0];
};

const rentSlice = createSlice({
    name: "rent",
    initialState,
    reducers: {
        setPosPopup: (state, action) => {
            state.posPopup = action.payload;
        },
        setPeriodPopup: (state, action) => {
            state.periodPopup = action.payload;
        },
        
        // 날짜 저장 시 문자열 형식으로 변환 & LocalStorage에 저장
        setStartDate: (state, action) => { 
            state.startDate = action.payload ? new Date(action.payload).toISOString().split("T")[0] : null;
            rentSlice.caseReducers.updateRentalReturnDates(state);
            saveState(state); // 상태 저장
        },
        setEndDate: (state, action) => { 
            state.endDate = action.payload ? new Date(action.payload).toISOString().split("T")[0] : null;
            rentSlice.caseReducers.updateRentalReturnDates(state);
            saveState(state); // 상태 저장
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload;
            rentSlice.caseReducers.updateRentalReturnDates(state);
            saveState(state); // 상태 저장
        },
        setEndTime: (state, action) => {
            state.endTime = action.payload;
            rentSlice.caseReducers.updateRentalReturnDates(state);
            saveState(state); // 상태 저장
        },
        
        setReservationType: (state, action) => {
            state.reservationType = action.payload;
            saveState(state); // 상태 저장
        },
        setRegion: (state, action) => {
            state.region = action.payload;
            saveState(state); // 상태 저장
        },
        setCity: (state, action) => {
            state.city = action.payload;
            saveState(state); // 상태 저장
        },

        // rentalDate & returnDate 업데이트
        updateRentalReturnDates: (state) => {
            state.rentalDate = convertToISOString(state.startDate, state.startTime);
            state.returnDate = convertToISOString(state.endDate, state.endTime);
            saveState(state); // 상태 저장
        }
    }
});

// 액션 및 리듀서 내보내기
export const {
    setPosPopup, setPeriodPopup,
    setStartDate, setEndDate, setStartTime, setEndTime,
    setReservationType, setRegion, setCity,
    updateRentalReturnDates
} = rentSlice.actions;

export default rentSlice.reducer;
