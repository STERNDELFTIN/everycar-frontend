import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '../css/Header.css';

function Header() {

  {/* Link 태그 스타일 컴포넌트 */}
  const MenuLinkStyle = styled(Link)`color: black; text-decoration: none; `;

  return (
    <div className="header">

      {/* 상단 메뉴 링크 */}
      <nav className='menu'>
        <div className='menu-container'>
          <div className='left-menu'>
          <MenuLinkStyle to='/'><img src='/logo.png' style={ {width:'138px', height:'50px'} } /></MenuLinkStyle>
          </div>
          <div className='center-menu'>
            <MenuLinkStyle to='/speedReservation'>빠른예약</MenuLinkStyle>
            <MenuLinkStyle to='/callService'>부름서비스</MenuLinkStyle>
            <MenuLinkStyle to='/shortRent'>단기렌트</MenuLinkStyle>
            <MenuLinkStyle to='/longRent'>장기렌트</MenuLinkStyle>
            <MenuLinkStyle to='/event'>이벤트</MenuLinkStyle>
          </div>
          <div className='right-menu'>
            <MenuLinkStyle to='/login' className='login'>로그인</MenuLinkStyle>
            <MenuLinkStyle to='/register' className='register'>회원가입</MenuLinkStyle>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Header;
