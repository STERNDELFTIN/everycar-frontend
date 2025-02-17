import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './routes/Main';
import ProductList from './routes/ProductList';

function App() {

  return (
    <div className="App">

      {/* 상단 메뉴 링크 */}
      <Header />

      {/* 페이지 URL */}
      <Routes>
        <Route path='/' element={<Main />}></Route>
        
        {/* <Route path='/speedReservation' element={<SpeedReservation />}></Route>
        <Route path='/callService' element={<CallService />}></Route>
        <Route path='/shortRent' element={<ShortRent />}></Route>
        <Route path='/longRent' element={<LongRent />}></Route>
        <Route path='/event' element={<Event />}></Route> */}

        {/* <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route> */}
      
        <Route path='/productList' element={<ProductList />}></Route>
      </Routes>

      {/* footer */}
      <Footer />

    </div>
  );
}

export default App;
