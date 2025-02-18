import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './routes/Main';

import SpeedReservation from './routes/SpeedReservation';
import ShortRent from './routes/ShortRent';
import Announcement from './routes/Announcement';
import Event from './routes/Event';
import Inquiry from './routes/Inquiry';

import Login from './routes/Login';
import Register from './routes/Register';

function App() {

  return (
    <div className="App">

      {/* 상단 메뉴 링크 */}
      <Header />

      {/* 페이지 URL */}
      <Routes>
        <Route path='/' element={<Main />}></Route>
        
        <Route path='/speedReservation' element={<SpeedReservation />}></Route>
        <Route path='/shortRent' element={<ShortRent />}></Route>
        <Route path='/announcement' element={<Announcement />}></Route>
        <Route path='/event' element={<Event />}></Route>
        <Route path='/inquiry' element={<Inquiry />}></Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
    
      </Routes>

      {/* footer */}
      <Footer />

    </div>
  );
}

export default App;
