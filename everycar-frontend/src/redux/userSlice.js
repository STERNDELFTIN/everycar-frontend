import { createSlice } from '@reduxjs/toolkit';

// localStorage에서 유저 정보 가져오기
const getStoredUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  try {
    return userInfo ? JSON.parse(userInfo) : {
      userName: '',
      userId: '',
      userEmail: '',
      userPhone: '',
      userGender: '',
      userBirth: '',
      userAddress: ''
    };
  } catch (e) {
    // JSON.parse 오류 발생 시 기본값 반환
    console.error("Error parsing userInfo from localStorage:", e);
    return {
      userName: '',
      userId: '',
      userEmail: '',
      userPhone: '',
      userGender: '',
      userBirth: '',
      userAddress: ''
    };
  }
};

// localStorage에서 면허 정보 가져오기
const getStoredLicenseInfo = () => {
  const licenseInfo = localStorage.getItem('licenseInfo');
  try {
    return licenseInfo ? JSON.parse(licenseInfo) : {
      licenseNum: '', // 면허 번호
      licenseDate: '', // 면허 발급일
      licenseEndDate: '', // 면허 만료일
      licensePhoto: '', // 면허 사진
    };
  } catch (e) {
    // JSON.parse 오류 발생 시 기본값 반환
    console.error("Error parsing licenseInfo from localStorage:", e);
    return {
      licenseNum: '', // 면허 번호
      licenseDate: '', // 면허 발급일
      licenseEndDate: '', // 면허 만료일
      licensePhoto: '', // 면허 사진
    };
  }
};

// 초기 상태
const initialState = {
  isLoggedIn: !!localStorage.getItem('token'), // 로그인 여부 (토큰이 있으면 로그인된 상태로 초기화)
  userInfo: getStoredUserInfo(), // 유저 정보
  licenseInfo: getStoredLicenseInfo(), // 면허 정보
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
      state.licenseInfo = action.payload.licenseInfo;

      // localStorage에 저장
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
      localStorage.setItem('licenseInfo', JSON.stringify(action.payload.licenseInfo));
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

      // 로그아웃 시 localStorage에서 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('licenseInfo');
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
