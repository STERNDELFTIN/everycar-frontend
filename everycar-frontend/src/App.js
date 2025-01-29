import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import Main from './routes/Main';

function App() {

  const LinkStyle = styled(Link)`color: black; text-decoration: none; `;

  return (
    <div className="App">
      
      {/* 페이지 URL */}
      <Routes>
        <Route path='/' element={<Main />}></Route>
      </Routes>

      {/* 상단 메뉴 링크 */}
      <nav className='menu'>
        <div className='menu-container'>
          <div className='left-menu'>
          <LinkStyle to='/'><img src='/logo.png' style={ {width:'138px', height:'50px'} } /></LinkStyle>
          </div>
          <div className='center-menu'>
            <LinkStyle to='/speedReservation'>빠른예약</LinkStyle>
            <LinkStyle to='/callService'>부름서비스</LinkStyle>
            <LinkStyle to='/shortRent'>단기렌트</LinkStyle>
            <LinkStyle to='/longRent'>장기렌트</LinkStyle>
            <LinkStyle to='/event'>이벤트</LinkStyle>
          </div>
          <div className='right-menu'>
            <LinkStyle to='/login' className='login'>로그인</LinkStyle>
            <LinkStyle to='/register' className='register'>회원가입</LinkStyle>
          </div>
        </div>
      </nav>


    </div>
  );
}

export default App;
