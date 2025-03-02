import { createSlice } from "@reduxjs/toolkit";

// LocalStorage에서 예약 정보 불러오기
const loadReservations = () => {
    try {
        const storedData = localStorage.getItem("reservations");
        return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
        console.error("예약 정보 로드 실패:", error);
        return {};
    }
};

const initialState = {
    reservations: loadReservations(),  // 사용자별 예약 정보 저장
};

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        saveReservation: (state, action) => {
            const { userNum, reservationData } = action.payload;
            state.reservations[userNum] = reservationData;
            
            try {
                // LocalStorage에도 저장하여 새로고침 후에도 유지
                localStorage.setItem("reservations", JSON.stringify(state.reservations));
            } catch (error) {
                console.error("예약 정보 저장 실패:", error);
            }
        },
    },
});

export const { saveReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
