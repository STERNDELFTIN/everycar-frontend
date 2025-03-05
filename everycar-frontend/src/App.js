import './App.css';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

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
import Announcement from './routes/support/Announcement';
import Event from './routes/support/Event';
import Inquiry from './routes/support/Inquiry';

// 인증 관련 페이지
import Login from './routes/authorization/Login';
import Register from './routes/authorization/Register';

// 마이페이지
/* 내 정보 관리 페이지 */
import MyInfoManagement from './routes/myPage/info/MyInfoManagement';
import ProfileModify from './routes/myPage/info/ProfileModify';
import LicenseModify from './routes/myPage/info/LicenseModify';
/* 내 예약 내역 페이지 */
import MyReservationHistory from './routes/myPage/reservation/MyReservationHistory';
// import MyReservationHistoryDetail from './routes/myPage/reservation/MyReservationHistoryDetail';
/* 결제 및 정산 페이지 */
import MyPayment from './routes/myPage/payment/MyPayment';

let PageStyle = styled.div`
  width: 72%;
  height: auto;

  @media (max-width: 480px) {
    width: 87%;
  }
`;

function App() {

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
            <Route path='quickReservation/list' element={<QuickReservationList />}></Route>

            <Route path='shortRent' element={<ShortRent />} />
            <Route path='shortRentList' element={<ShortRentList />} />
            <Route path='carDetail/:id' element={<CarDetail />} />
            <Route path='rentReservation/:id' element={<RentReservation />} >
            </Route>
            <Route path='paymentSuccess' element={<PaymentSuccess />} />
            <Route path='paymentFail' element={<PaymentFail />} />
          </Route>

          {/* 고객 지원 관련 페이지 */}
          <Route path='/support'>
            <Route path='announcement' element={<Announcement />} />
            <Route path='event' element={<Event />} />
            <Route path='inquiry' element={<Inquiry />} />
          </Route>

          {/* 인증 관련 페이지 */}
          <Route path='/auth'>
            <Route path='login' element={<Login />} />
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
            {/* <Route path='history/detail' element={<MyReservationHistoryDetail />} /> */}

            {/* 결제 및 정산 */}
            <Route path='pay' element={<MyPayment />} />
          </Route>

        </Routes>
      </PageStyle>

      {/* footer */}
      <Footer />

    </div>
  );
}

export default App;
