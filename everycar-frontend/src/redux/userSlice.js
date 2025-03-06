import { createSlice } from '@reduxjs/toolkit';

// localStorage에서 유저 정보 가져오기
const storedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {
    userName: '',
    userId: '',
    userEmail: '',
    userPhone: '',
    userGender: '',
    userBirth: '',
    userAddress: ''
};
// localStorage에서 면허 정보 가져오기
const storedLicenseInfo = JSON.parse(localStorage.getItem('licenseInfo')) || {
    licenseNum: '', // 면허 번호
    licenseDate: '', // 면허 발급일
    licenseEndDate: '', // 면허 만료일
    licensePhoto: '', // 면허 사진
};

// 초기 상태
const initialState = {
    isLoggedIn: !!localStorage.getItem('token'), // 로그인 여부 (토큰이 있으면 로그인된 상태로 초기화)
    userInfo: storedUserInfo, // 유저 정보
    licenseInfo: storedLicenseInfo, // 면허 정보
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
            state.licenseInfo = action.payload.licenseInfo;
            localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo)); // localStorage에 저장
            localStorage.setItem('licenseInfo', JSON.stringify(action.payload.userInfo)); // localStorage에 저장
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userInfo = {
                userName: "",
                userId: "",
                userEmail: "",
                userPhone: "",
                userGender: "",
                userBirth: "",
                userAddress: ""
            };
            state.licenseInfo = {
                licenseNum: '',
                licenseDate: '',
                licenseEndDate: '',
                licensePhoto: null,
            };
            localStorage.removeItem('token'); // 로그아웃 시 토큰 삭제
            localStorage.removeItem('userInfo'); // localStorage에서 삭제
            localStorage.removeItem('LicenseInfo'); // localStorage에서 삭제
        },
        setUserInfo: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        setLicenseInfo: (state, action) => {
            state.licenseInfo = action.payload;
            localStorage.setItem('licenseInfo', JSON.stringify(action.payload));
        },
    },
});

export const {
    loginUser, logoutUser,
    setUserInfo, setLicenseInfo
} = userSlice.actions;

export default userSlice.reducer;