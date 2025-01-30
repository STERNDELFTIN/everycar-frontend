import '../css/Main.css';
import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faCalendarCheck, faCommentDots, faFileSignature } from '@fortawesome/free-solid-svg-icons';

const TitleStyle = styled.h3`font-size: 36px; text-align: left; margin-bottom: 17px; `;
const PlanBoxStyle = styled.div`width: 309px; height: 230px; border-radius: 15px; padding: 23px 27px; text-align: left; background-color: #FFFFFF; color: #2F2F2F; `;

function Main() {
    return (
        <div className="Main">
            <Content />
            <Shortcut />
            <Plan title="에브리카 렌트 플랜" />
            <Car title="국내 인기 차량" />
            <Event title="이벤트" />
        </div>
    );
}

{/* Content */}
function Content() {
    return(
        <div className='content-container'>
            <div className='content-box'>

            </div>

            <div className='rent-container'>
                <div className='rent-pos'>
                    <h5 className='title'>렌트 장소</h5>
                    <div className='content'>
                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.875 8.75C18.875 14.875 11 20.125 11 20.125C11 20.125 3.125 14.875 3.125 8.75C3.125 6.66142 3.95468 4.65838 5.43153 3.18153C6.90838 1.70468 8.91142 0.875 11 0.875C13.0886 0.875 15.0916 1.70468 16.5685 3.18153C18.0453 4.65838 18.875 6.66142 18.875 8.75Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 11.375C12.4497 11.375 13.625 10.1997 13.625 8.75C13.625 7.30025 12.4497 6.125 11 6.125C9.55025 6.125 8.375 7.30025 8.375 8.75C8.375 10.1997 9.55025 11.375 11 11.375Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>서울시 강남구</p>
                    </div>
                </div>

                <div style={ { borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" } }></div>

                <div className='rent-period'>
                    <h5 className='title'>렌트 기간</h5>
                    <div className='content'>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 5.74999V11.5L15.3334 13.4167M21.0834 11.5C21.0834 16.7927 16.7928 21.0833 11.5 21.0833C6.20729 21.0833 1.91669 16.7927 1.91669 11.5C1.91669 6.20726 6.20729 1.91666 11.5 1.91666C16.7928 1.91666 21.0834 6.20726 21.0834 11.5Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className='start-period'><b>01.01(수) </b>10:00</p>
                        <p style={{ margin: "0 20px" }}>~</p>
                        <p className='end-period'><b>01.03(금) </b>10:00</p>
                    </div>
                </div>

                <div className='rent-btn'>
                    <button>
                        <div className='arow'>
                            <svg width="24" height="41" viewBox="0 0 24 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2L20.5 20.5L2.5 39" stroke="#252736" strokeWidth="4" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

{/* Service Shortcut */}
function Shortcut() {
    return(
        <div className='service-shortcut'>
            <h4 className='service-shortcut-title'>서비스<br />바로가기</h4>
            <div className='shortcut-container'>
                <ShortcutBox
                    ico={ faCalendarCheck }
                    title='예약확인'
                />
                <ShortcutBox
                    ico={ faGift }
                    title='이벤트'
                />
                <ShortcutBox
                    ico={ faCommentDots }
                    title='상담하기'
                />
                <ShortcutBox
                    ico={ faFileSignature }
                    title='견적확인'
                />
            </div>
        </div>
    );
}
function ShortcutBox({ ico, title }) {
    return (
        <div className='shortcut-box'>
            <FontAwesomeIcon icon={ ico } style={{ fontSize: "30px" }} />
            <p>{ title }</p>
        </div>
    );
}

{/* Everycar Rent Plan */}
function Plan({ title }) {
    return(
        <div className='plan'>
            <TitleStyle>{ title }</TitleStyle>
            <div className='plan-container'>
                <PlanBox 
                    title='빠른예약'
                    content='내 옆에서 구하는 <br />가장 가깝고 빠른 렌트 서비스'
                    ico='/main/plan/reservation.png'
                    icoSize='90px'
                />           
                <PlanBox 
                    title='부름서비스'
                    content='원하는 날짜, 원하는 장소에서 <br />택배처럼 받는 맞춤 렌트'
                    ico='/main/plan/call_service.png'
                    icoSize='75px'
                />           
                <PlanBox 
                    title='단기렌트'
                    content='내 차처럼 즐기는 한 달 구독 렌트카'
                    ico='/main/plan/short_rent.png'
                    icoSize='75px'
                />           
                <PlanBox 
                    title='장기렌트'
                    content='내 차처럼 즐기는 한 달 구독 렌트카'
                    ico='/main/plan/long_rent.png'
                    icoSize='100px'
                />   
            </div>        
        </div>
    );
}
function PlanBox({title, content, ico, icoSize}){
    return (
        <PlanBoxStyle>
            <h3 className='plan-title' style={{ fontSize: '24px', marginBottom: '14px' }}>{ title }</h3>
            {/* 문자열 내의 HTML 태그인 <br> 태그를 그대로 해석하여 줄바꿈 적용 */}
            <p className='plan-content' dangerouslySetInnerHTML={{ __html: content }} style={{ fontSize:'14px', marginBottom: '5px', height: '50px' }}></p>
            <div className='plan-img' style={{ display: 'flex', height:'50%', justifyContent:'right', alignItems:'flex-end' }}><img src={ ico } style={{ width: icoSize, height: icoSize }} ></img></div>
        </PlanBoxStyle>
    );
}

{/* 국내 인기 차량 */}
function Car({ title }) {
    return(
        <div className='domestic-popular-car'>
            <TitleStyle>{ title }</TitleStyle>
        </div>
    );
}

{/* Event */}
function Event({ title }) {
    return(
        <div className='event'>
            <TitleStyle>{ title }</TitleStyle>
        </div>
    );
}

export default Main;