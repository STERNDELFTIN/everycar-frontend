import './App.css';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './routes/Main';

import SpeedReservation from './routes/SpeedReservation';
import ShortRent from './routes/ShortRent';
import ShortRentList from './routes/ShortRentList';
import CarDetail from './routes/CarDetail';
import RentReservation from './routes/RentReservation';

import PaymentSuccess from './routes/PaymentSuccess';
import PaymentFail from './routes/PaymentFail';

import Announcement from './routes/Announcement';
import Event from './routes/Event';
import Inquiry from './routes/Inquiry';

import Login from './routes/Login';
import Register from './routes/Register';

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
            <Route path='speedReservation' element={<SpeedReservation />} />
            <Route path='shortRent' element={<ShortRent />} />
            <Route path='shortRentList' element={<ShortRentList />} />
            <Route path='carDetail/:id' element={<CarDetail />} />
            <Route path='rentReservation' element={<RentReservation />} >
              <Route path='paymentSucess' element={<PaymentSuccess />} />
              <Route path='paymentFail' element={<PaymentFail />} />
            </Route>
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

        </Routes>
      </PageStyle>

      {/* footer */}
      <Footer />

    </div>
  );
}

export default App;
