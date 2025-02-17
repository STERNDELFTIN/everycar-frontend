import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '../../css/main/Plan.css';
import Main from '../../routes/Main';

{/* Everycar Rent Plan */}
const PlanLinkStyle = styled(Link).attrs(props=>({ to:props.to, /* Link속성 유지 */ }))`width: 309px; height: auto; border-radius: 15px; padding: 25px 30px; text-align: left; background-color: #FFFFFF; color: #2F2F2F; cursor: pointer; `;

function Plan({ title, TitleStyle }) {
    return(
        <nav className='plan'>
            {/* <Routes>
                <Route path='test' element={<Main />}></Route>
            </Routes> */}
            
            <TitleStyle>{ title }</TitleStyle>
            <div className='plan-container'>
                <PlanLinkBox
                    to='/speedReservation'
                    title='빠른예약'
                    content='내 옆에서 구하는 가장 가깝고 빠른 렌트 서비스'
                    ico='/images/main/plan/reservation.png'
                    icoSize='5vw' 
                />
                <PlanLinkBox
                    to='/callService'
                    title='부름서비스'
                    content='원하는 날짜, 원하는 장소에서 택배처럼 받는 맞춤 렌트'
                    ico='/images/main/plan/call_service.png'
                    icoSize='4vw'
                />           
                <PlanLinkBox
                    to='shortRent'
                    title='단기렌트'
                    content='내 차처럼 즐기는 단기구독 렌트카'
                    ico='/images/main/plan/short_rent.png'
                    icoSize='4vw'
                />           
                <PlanLinkBox
                    to='longRent'
                    title='장기렌트'
                    content='내 차처럼 즐기는 장기구독 렌트카'
                    ico='/images/main/plan/long_rent.png'
                    icoSize='5vw'
                />   
            </div>        
        </nav>
    );
}
function PlanLinkBox({to, title, content, ico, icoSize}){
    return (
        <PlanLinkStyle className='plan-box' to={to}>
            <h3 className='plan-title' style={{ fontSize: 'clamp(10px, 1.7vw, 40px)', marginBottom: '1.5vw' }}>{ title }</h3>
            {/* 문자열 내의 HTML 태그인 <br> 태그를 그대로 해석하여 줄바꿈 적용 */}
            <p className='plan-content' dangerouslySetInnerHTML={{ __html: content }} style={{ fontSize:'clamp(9px, 1vw, 38px)', marginBottom: '0.5vw', height: '30%' }}></p>
            <div className='plan-img' style={{ display: 'flex', height:'50%', justifyContent:'right', alignItems:'flex-end' }}><img src={ ico } style={{ width: icoSize, height: icoSize }} ></img></div>
        </PlanLinkStyle>
    );
}

export default Plan;