import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
    isLoggedIn: false, // 로그인 여부
    birthDate: "", // 생년월일
    licenseIssuedDate: "", // 면허 발급일
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.birthDate = action.payload.birthDate;
            state.licenseIssuedDate = action.payload.licenseIssuedDate;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.birthDate = "";
            state.licenseIssuedDate = "";
        },
    },
});

export const {
    loginUser, logoutUser
} = userSlice.actions;

export default userSlice.reducer;