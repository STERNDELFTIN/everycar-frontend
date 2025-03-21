import { configureStore } from '@reduxjs/toolkit';
import rentReducer from './redux/rentSlice';
import userReducer from './redux/userSlice';
import reservationReducer from './redux/reservationSlice';

const store = configureStore({
    reducer: {
        rent: rentReducer, // 렌트 관련 상태 관리
        user: userReducer, // 사용자 상태 관리
        reservation: reservationReducer, // 예약 내역 관리
    },
});

export default store;
