import { configureStore } from '@reduxjs/toolkit';
import rentReducer from './redux/rentSlice';

const store = configureStore({
    reducer: {
        rent: rentReducer, // 렌트 관련 상태 관리
    },
});

export default store;
