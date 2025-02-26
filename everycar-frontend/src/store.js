import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import rentReducer from './redux/rentSlice';
import userReducer from './redux/userSlice';

const store = configureStore({
    reducer: {
        rent: rentReducer, // 렌트 관련 상태 관리
        user: userReducer, // 사용자 상태 관리
    },
});

export default store;
