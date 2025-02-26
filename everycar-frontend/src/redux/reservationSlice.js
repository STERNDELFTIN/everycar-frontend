import { createSlice } from "@reduxjs/toolkit";

// LocalStorage에서 예약 정보 불러오기
const savedReservations = JSON.parse(localStorage.getItem("reservations")) || {};

const initialState = {
    reservations: savedReservations,  // 사용자별 예약 정보 저장
};

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        saveReservation: (state, action) => {
            const { userNum, reservationData } = action.payload;
            state.reservations[userNum] = reservationData;
            
            // LocalStorage에도 저장하여 새로고침 후에도 유지
            localStorage.setItem("reservations", JSON.stringify(state.reservations));
        },
    },
});

export const { saveReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
