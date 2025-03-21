import './App.css';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUserInfo } from './redux/userSlice';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './routes/Main';

// 예약 관련 페이지
import QuickReservation from './routes/quickRent/QuickReservation';
import QuickReservationList from './routes/quickRent/QuickReservationList';

import ShortRent from './routes/reservation/ShortRent';
import ShortRentList from './routes/reservation/ShortRentList';
import CarDetail from './routes/reservation/CarDetail';
import RentReservation from './routes/reservation/RentReservation';
/* 예약 성공 및 실패 */
import PaymentSuccess from './routes/reservation/PaymentSuccess';
import PaymentFail from './routes/reservation/PaymentFail';

// 고객 지원 관련 페이지
/* 공지 페이지 */
import Announcement from './routes/support/announcement/Announcement';
import AnnouncementDetail from './routes/support/announcement/AnnouncementDetail';
/* 이벤트 페이지 */
import Event from './routes/support/event/Event';
import EventDetail from './routes/support/event/EventDetail';
/* 문의 페이지 */
import Inquiry from './routes/support/inquiry/Inquiry';
import InquiryDetail from './routes/support/inquiry/InquiryDetail';
import InquiryCreate from './routes/support/inquiry/InquiryCreate';
import InquiryModify from './routes/support/inquiry/InquiryModify';

// 인증 관련 페이지
import Login from './routes/authorization/Login';
import Register from './routes/authorization/Register';
import RegisterConditions from './routes/authorization/RegisterConditions';
// 마이페이지
/* 내 정보 관리 페이지 */
import MyInfoManagement from './routes/myPage/info/MyInfoManagement';
import ProfileModify from './routes/myPage/info/ProfileModify';
import LicenseModify from './routes/myPage/info/LicenseModify';
/* 내 예약 내역 페이지 */
import MyReservationHistory from './routes/myPage/reservation/MyReservationHistory';
import MyReservationHistoryDetail from './routes/myPage/reservation/MyReservationHistoryDetail';
import WaitingReservationPayment from './routes/myPage/reservation/WaitingReservationPayment';
/* 결제 및 정산 페이지 */
// import MyPayment from './routes/myPage/payment/MyPayment';
/* 문의사항 */
import MyInquiries from './routes/myPage/inquiries/MyInquiries';
/* 리뷰 작성 */
import MypageReview from './routes/myPage/myReview/MypageReview';
// import MyReview from './routes/myPage/myReview/MyReview';

let PageStyle = styled.div`
  width: 66%;
  min-height: 100vh;  /* 최소 높이를 화면 전체로 설정 */

  @media (max-width: 480px) {
    width: 87%;
  }
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 앱 시작 시 자동 로그인
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetch('http://localhost:8080/api/user/mypage', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          dispatch(setUserInfo(data)); // Redux에 유저 정보 저장
        })
        .catch(error => console.error('유저 정보 불러오기 오류:', error));
    }
  }, [dispatch]);

  return (
    <div className="App">

      {/* 상단 메뉴 링크 */}
      <Header />

      {/* 페이지 URL */}
      <PageStyle>
        <Routes>
          <Route path='/' element={<Main />} />

          {/* 예약 관련 페이지 */}
          <Route path='/reservation'>
            <Route path='quickReservation' element={<QuickReservation />} />
            <Route path='quickReservation/list' element={<QuickReservationList />} />

            <Route path='shortRent' element={<ShortRent />} />
            <Route path='shortRentList' element={<ShortRentList />} />
            <Route path='carDetail/:id' element={<CarDetail />} />
            <Route path='rentReservation/:id' element={<RentReservation />} />
            <Route path='paymentSuccess' element={<PaymentSuccess />} />
            <Route path='paymentFail' element={<PaymentFail />} />
          </Route>

          {/* 고객 지원 관련 페이지 */}
          <Route path='/support'>
            {/* 공지 */}
            <Route path='announcement' element={<Announcement />} /> {/* 공지전체목록 */}
            <Route path='announcementDetail/:id' element={<AnnouncementDetail />} /> {/* 공지상세보기 */}
            {/* 이벤트 */}
            <Route path='event' element={<Event />} /> {/* 이벤트전체목록 */}
            <Route path='eventDetail/:id' element={<EventDetail />} /> {/* 이벤트상세보기 */}
            {/* 문의*/}
            <Route path='inquiry' element={<Inquiry />} />
            <Route path='inquiryDetail/:id' element={<InquiryDetail />} />
            <Route path='inquiryCreate' element={<InquiryCreate />} />
            <Route path='inquiryModify/:id' element={<InquiryModify />} />
          </Route>

          {/* 인증 관련 페이지 */}
          <Route path='/auth'>
            <Route path='login' element={<Login />} />
            <Route path='registerConditions' element={<RegisterConditions />} />
            <Route path='register' element={<Register />} />
          </Route>

          {/* 마이페이지 */}
          <Route path='/myPage'>
            {/* 내 정보 관리 */}
            <Route path='info' element={<MyInfoManagement />} />
            <Route path='info/profile' element={<ProfileModify />} />
            <Route path='info/license' element={<LicenseModify />} />

            {/* 내 예약 내역 */}
            <Route path='history' element={<MyReservationHistory />} />
            <Route path='history/detail/:reservationType/:reservationId' element={<MyReservationHistoryDetail />} />
            <Route path='history/payment/:reservationType/:reservationId' element={<WaitingReservationPayment />} />

            {/* 결제 및 정산 */}
            {/* <Route path='pay' element={<MyPayment />} /> */}
            <Route path='inquiries' element={<MyInquiries />} />

            {/* 리뷰 작성 페이지 */}
            <Route path='review' element={<MypageReview />} />
          </Route>

        </Routes>
      </PageStyle>

      {/* footer */}
      <Footer />

    </div>
  );
}

export default App;
