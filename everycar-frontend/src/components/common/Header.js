import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../css/common/Header.css';

// Link 태그 스타일 컴포넌트
const MenuLinkStyle = styled(Link)`color: black; text-decoration: none; `;

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };

    window.addEventListener('loginStateChange', checkToken);
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('loginStateChange', checkToken);
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStateChange'));
    localStorage.clear();
  };

  return (
    <div className="header">
      <nav className='menu'>
        <div className='menu-container'>
          <div className='left-center-group' style={isLoggedIn ? { width: '75%' } : { width: '75%' }}>
            <div className='left-menu'>
              <MenuLinkStyle to='/'>
                <img src='/logo.png' style={{ width: '138px', height: '50px' }} />
              </MenuLinkStyle>
            </div>

            {/* 데스크톱 중앙 메뉴 (모바일에서는 숨김) */}
            <div className='center-menu'>
              <MenuLinkStyle to='/reservation/quickReservation'>빠른예약</MenuLinkStyle>
              <MenuLinkStyle to='/reservation/shortRent'>단기렌트</MenuLinkStyle>
              <MenuLinkStyle to='/support/announcement'>공지사항</MenuLinkStyle>
              <MenuLinkStyle to='/support/event'>이벤트</MenuLinkStyle>
              <MenuLinkStyle to='/support/inquiry'>문의하기</MenuLinkStyle>
            </div>
          </div>

          {/* 우측 메뉴 */}
          <div className='right-menu' style={isLoggedIn ? { width: '25%' } : { width: '25%' }}>
            {isLoggedIn ? (
              <>
                <MenuLinkStyle to='/' className='logout' onClick={handleLogout}>로그아웃</MenuLinkStyle>
                <MenuLinkStyle to='/myPage/info' className='my-info'>내 정보</MenuLinkStyle>
              </>
            ) : (
              <>
                <MenuLinkStyle to='/auth/login' className='login'>로그인</MenuLinkStyle>
                <MenuLinkStyle to='/auth/register' className='register'>회원가입</MenuLinkStyle>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
