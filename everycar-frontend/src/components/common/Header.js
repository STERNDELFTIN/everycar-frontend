import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../css/common/Header.css';

// Link 태그 스타일 컴포넌트
const MenuLinkStyle = styled(Link)`color: black; text-decoration: none; `;

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken')); // 초기 로그인 상태

  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken')); // 토큰 존재 여부 확인하여 로그인 상태 설정
    };

    // Custom Event 리스너 추가
    window.addEventListener('loginStateChange', checkToken);
    window.addEventListener('storage', checkToken); // 다른 탭에서도 감지

    return () => {
      window.removeEventListener('loginStateChange', checkToken);
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');  // 로그아웃 시 토큰 삭제
    setIsLoggedIn(false); // 상태 업데이트
    window.dispatchEvent(new Event('loginStateChange')); // 상태 변경 이벤트 트리거
  };

  return (
    <div className="header">
      <nav className='menu'>
        <div className='menu-container'>
          <div className='left-center-group'>
            <div className='left-menu'>
              <MenuLinkStyle to='/'>
                <img src='/logo.png' style={{ width: '138px', height: '50px' }} />
              </MenuLinkStyle>
            </div>
            <div className='center-menu'>
              <MenuLinkStyle to='/reservation/quickReservation'>빠른예약</MenuLinkStyle>
              <MenuLinkStyle to='/reservation/shortRent'>단기렌트</MenuLinkStyle>
              <MenuLinkStyle to='/support/announcement'>공지사항</MenuLinkStyle>
              <MenuLinkStyle to='/support/event'>이벤트</MenuLinkStyle>
              <MenuLinkStyle to='/support/inquiry'>문의하기</MenuLinkStyle>
            </div>
          </div>

          <div className='right-menu'>
            { isLoggedIn ? (
              <>
                {/* 로그인한 경우 */}
                <MenuLinkStyle to='/myPage/info'>내 정보</MenuLinkStyle>
                <MenuLinkStyle to='/myPage/history'>예약 내역</MenuLinkStyle>
                <MenuLinkStyle to='/' onClick={handleLogout} className='login'>로그아웃</MenuLinkStyle>
              </>
            ) : (
              <>
                {/* 로그인하지 않은 경우 */}
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
