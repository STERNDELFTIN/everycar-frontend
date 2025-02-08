import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '../css/Footer.css';

function Footer() {
  {/* Link 태그 스타일 컴포넌트 */}
  const FooterLinkStyle = styled(Link)`color: white; text-decoration: none; font-size: 18px; `;

  return (
    <>

      {/* footer */}
      <footer className='footer'>
        <div>
          <div className='footer-link-container'>
            <FooterLinkStyle to='/about'>회사소개</FooterLinkStyle>
            <FooterLinkStyle to='/terms'>이용약관</FooterLinkStyle>
            <FooterLinkStyle to='/privacy'>개인정보취급방침</FooterLinkStyle>
            <FooterLinkStyle to='/customer'>고객센터</FooterLinkStyle>
          </div>

          <div className='line' style={{ borderBottom:'1px solid #FFFFFF', width:'100%', margin:'20px 0' }}></div>

          <div className='footer-content' style={{ fontSize:'12px' }}>
            <div className='customer-service'>
              <h4>고객센터</h4>
              <p>02-123-456</p>
              <p>평일(공휴일 제외) 오전 9시 ~ 오후 6시</p>
              <p>점심시간 오후 12시 30분 ~ 1시 30분</p>
              <p>이메일 문의: feedback@bm.kr</p>
            </div>

            <div className='company-info'>
              <h4>회사정보</h4>
              <div style={{ display:'flex', gap:'12px' }}>
                <div className='info-title'>
                  <p>회사명</p>
                  <p>대표전화</p>
                  <p>주소</p>
                  <p>이메일</p>
                </div>
                <div className='info-content'>
                  <p>길 위의 친구들</p>
                  <p>02-456-789</p>
                  <p>서울특별시 마포구</p>
                  <p>abc@naver.com</p>
                </div>
              </div>
            </div>

            <div className='sns-link-container'>
              <h4 className='sns-title'>SNS</h4>
              <div className='sns-icon' style={{ display:'flex', gap:'15px' }}>
                <div>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 6.90332H17.51M7 2.40332H17C19.7614 2.40332 22 4.6419 22 7.40332V17.4033C22 20.1647 19.7614 22.4033 17 22.4033H7C4.23858 22.4033 2 20.1647 2 17.4033V7.40332C2 4.6419 4.23858 2.40332 7 2.40332ZM16 11.7733C16.1234 12.6056 15.9813 13.4555 15.5938 14.2023C15.2063 14.9491 14.5931 15.5547 13.8416 15.933C13.0901 16.3113 12.2384 16.4429 11.4078 16.3093C10.5771 16.1756 9.80976 15.7834 9.21484 15.1885C8.61992 14.5936 8.22773 13.8262 8.09407 12.9955C7.9604 12.1649 8.09207 11.3132 8.47033 10.5617C8.84859 9.81017 9.45419 9.19706 10.201 8.80956C10.9478 8.42206 11.7978 8.27991 12.63 8.40332C13.4789 8.5292 14.2649 8.92478 14.8717 9.53163C15.4785 10.1385 15.8741 10.9244 16 11.7733Z" stroke="#F5F5F5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_32_369)">
                      <path d="M23 3.40337C22.0424 4.07884 20.9821 4.59548 19.86 4.93337C19.2577 4.24088 18.4573 3.75006 17.567 3.52729C16.6767 3.30453 15.7395 3.36056 14.8821 3.68782C14.0247 4.01508 13.2884 4.59777 12.773 5.35708C12.2575 6.1164 11.9877 7.0157 12 7.93337V8.93337C10.2426 8.97893 8.50127 8.58918 6.93101 7.79881C5.36074 7.00845 4.01032 5.842 3 4.40337C3 4.40337 -1 13.4034 8 17.4034C5.94053 18.8013 3.48716 19.5023 1 19.4034C10 24.4034 21 19.4034 21 7.90337C20.9991 7.62482 20.9723 7.34696 20.92 7.07337C21.9406 6.06686 22.6608 4.79608 23 3.40337Z" stroke="#F5F5F5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_32_369">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.40332)"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2.40332H15C13.6739 2.40332 12.4021 2.9301 11.4645 3.86779C10.5268 4.80547 10 6.07724 10 7.40332V10.4033H7V14.4033H10V22.4033H14V14.4033H17L18 10.4033H14V7.40332C14 7.1381 14.1054 6.88375 14.2929 6.69621C14.4804 6.50868 14.7348 6.40332 15 6.40332H18V2.40332Z" stroke="#F3F3F3" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_32_371)">
                    <path d="M22.54 6.82332C22.4212 6.34873 22.1793 5.91389 21.8386 5.56273C21.498 5.21156 21.0707 4.95651 20.6 4.82332C18.88 4.40332 12 4.40332 12 4.40332C12 4.40332 5.11999 4.40332 3.39999 4.86332C2.92924 4.99651 2.50197 5.25156 2.16134 5.60273C1.82071 5.95389 1.57878 6.38873 1.45999 6.86332C1.14521 8.60888 0.991228 10.3796 0.999992 12.1533C0.988771 13.9404 1.14276 15.7246 1.45999 17.4833C1.59095 17.9432 1.8383 18.3615 2.17814 18.6978C2.51797 19.0341 2.93881 19.2771 3.39999 19.4033C5.11999 19.8633 12 19.8633 12 19.8633C12 19.8633 18.88 19.8633 20.6 19.4033C21.0707 19.2701 21.498 19.0151 21.8386 18.6639C22.1793 18.3127 22.4212 17.8779 22.54 17.4033C22.8524 15.6709 23.0063 13.9137 23 12.1533C23.0112 10.3663 22.8572 8.58202 22.54 6.82332Z" stroke="#F5F5F5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.74999 15.4233L15.5 12.1533L9.74999 8.88332V15.4233Z" stroke="#F5F5F5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_32_371">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.40332)"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>

    </>
  );
}

export default Footer;
