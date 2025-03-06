import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
    isLoggedIn: !!localStorage.getItem('token'), // 로그인 여부 (토큰이 있으면 로그인된 상태로 초기화)
    userInfo: null, // 사용자 정보
    birthDate: "", // 생년월일
    licenseIssuedDate: "", // 면허 발급일
    licenseInfo: null, // 면허 정보 추가
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
            state.birthDate = action.payload.birthDate;
            state.licenseIssuedDate = action.payload.licenseIssuedDate;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userInfo = null;
            state.birthDate = "";
            state.licenseIssuedDate = "";
            state.licenseInfo = null;
            localStorage.removeItem('token'); // 로그아웃 시 토큰 삭제
        },
        setUserInfo: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload;
        },
        setLicenseInfo:(state, action) => {
            state.licenseInfo = action.payload;
        },
    },
});

export const {
    loginUser, logoutUser,
    setUserInfo, setLicenseInfo
} = userSlice.actions;

export default userSlice.reducer;