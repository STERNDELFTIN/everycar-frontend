// 더미 유저 데이터
const dummyUsers = [
  {
    id: 1,
    name: "로그인 안 된 유저",
    isLoggedIn: false, // 로그인 안 됨
    birthDate: "1995-06-15",
    licenseIssuedDate: "2022-01-10",
  },
  {
    id: 2,
    name: "나이 부족 유저",
    isLoggedIn: true, 
    birthDate: "2000-01-01", // 만 26세 미만
    licenseIssuedDate: "2022-01-10",
  },
  {
    id: 3,
    name: "면허 기간 부족 유저",
    isLoggedIn: true,
    birthDate: "1990-05-20",
    licenseIssuedDate: "2024-02-01", // 면허 취득 1년 미만
  },
  {
    id: 4,
    name: "모든 조건 충족 유저",
    isLoggedIn: true,
    birthDate: "1990-03-10", // 만 26세 이상
    licenseIssuedDate: "2019-06-15", // 면허 취득 1년 이상
  },
];

export default dummyUsers;
