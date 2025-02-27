import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
    posPopup: false,
    periodPopup: false,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    reservationType: "speed", // 기본 예약 타입 설정
    region: null,
    city: null,
};

const rentSlice = createSlice({
    name: 'rent',
    initialState,
    reducers: {
        setPosPopup: (state, action) => { state.posPopup = action.payload; },
        setPeriodPopup: (state, action) => { state.periodPopup = action.payload; },
        
        // 날자 저장 시 문자열 형식으로 변환
        setStartDate: (state, action) => { 
            state.startDate = action.payload ? new Date(action.payload).toISOString().split("T")[0] : null; 
        },
        setEndDate: (state, action) => { 
            state.endDate = action.payload ? new Date(action.payload).toISOString().split("T")[0] : null; 
        },

        setStartTime: (state, action) => { state.startTime = action.payload; },
        setEndTime: (state, action) => { state.endTime = action.payload; },
        setReservationType: (state, action) => { state.reservationType = action.payload; },
        setRegion: (state, action) => { state.region = action.payload; },
        setCity: (state, action) => { state.city = action.payload; },
    },
});

export const {
    setPosPopup, setPeriodPopup,
    setStartDate, setEndDate, setStartTime, setEndTime,
    setReservationType, setRegion, setCity
} = rentSlice.actions;

export default rentSlice.reducer;
