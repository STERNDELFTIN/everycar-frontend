import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AOS from "aos";
import "aos/dist/aos.css";

import '../../css/main/Plan.css';

{/* Everycar Rent Plan */}
const PlanLinkStyle = styled(Link).attrs(props=>({ to:props.to, /* Link속성 유지 */ }))`width: 50%; height: auto; border-radius: 10px; padding: 25px 30px; text-align: left; background-color: #FFFFFF; color: #2F2F2F; cursor: pointer; `;

function Plan({ title, TitleStyle }) {
        useEffect(() => {
            AOS.init();
        }, [])
    return(
        <nav className='plan'>
            {/* <Routes>
                <Route path='test' element={<Main />}></Route>
            </Routes> */}
            
            <TitleStyle>{ title }</TitleStyle>
            <div className='plan-container' data-aos="fade-up" data-aos-duration="1200">
                <PlanLinkBox
                    to='/reservation/quickReservation'
                    title='빠른예약'
                    content='내 옆에서 구하는 가장 가깝고 빠른 렌트 서비스'
                    ico='/images/main/plan/reservation.png'
                    icoSize='5vw' 
                />
                <PlanLinkBox
                    to='/reservation/shortRent'
                    title='단기예약'
                    content='최소 14일에서 최대 120일까지 대여 가능한 렌트 서비스'
                    ico='/images/main/plan/call_service.png'
                    icoSize='4vw'
                />           
            </div>        
        </nav>
    );
}
function PlanLinkBox({to, title, content, ico, icoSize}){
    return (
        <PlanLinkStyle className='plan-box' to={to}>
            <h3 className='plan-title' style={{ fontSize: 'clamp(10px, 1.7vw, 40px)', marginBottom: '2vw' }}>{ title }</h3>
            {/* 문자열 내의 HTML 태그인 <br> 태그를 그대로 해석하여 줄바꿈 적용 */}
            <p className='plan-content' dangerouslySetInnerHTML={{ __html: content }} style={{ fontSize:'clamp(9px, 1vw, 38px)', marginBottom: '0.5vw', height: '30%' }}></p>
            <div className='plan-img' style={{ display: 'flex', height:'35%', justifyContent:'right', alignItems:'flex-end' }}><img src={ ico } style={{ width: icoSize, height: icoSize }} ></img></div>
        </PlanLinkStyle>
    );
}

export default Plan;