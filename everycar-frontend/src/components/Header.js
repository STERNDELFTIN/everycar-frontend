import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '../css/Header.css';

function Header() {

  {/* Link 태그 스타일 컴포넌트 */ }
  const MenuLinkStyle = styled(Link)`color: black; text-decoration: none; `;

  return (
    <div className="header">

      {/* 상단 메뉴 링크 */}
      <nav className='menu'>
        <div className='menu-container'>
          <div className='left-center-group'>
            <div className='left-menu'>
              <MenuLinkStyle to='/'><img src='/logo.png' style={{ width: '138px', height: '50px' }} /></MenuLinkStyle>
            </div>
            <div className='center-menu'>
              <MenuLinkStyle to='/reservation/speedReservation'>빠른예약</MenuLinkStyle>
              <MenuLinkStyle to='/reservation/shortRent'>단기렌트</MenuLinkStyle>
              <MenuLinkStyle to='/support/announcement'>공지사항</MenuLinkStyle>
              <MenuLinkStyle to='/support/event'>이벤트</MenuLinkStyle>
              <MenuLinkStyle to='/support/inquiry'>문의하기</MenuLinkStyle>
            </div>
          </div>
          
          <div className='right-menu'>
            <MenuLinkStyle to='/auth/login' className='login'>로그인</MenuLinkStyle>
            <MenuLinkStyle to='/auth/register' className='register'>회원가입</MenuLinkStyle>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Header;
