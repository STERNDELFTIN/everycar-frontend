import React from 'react';
import styled from 'styled-components';

{/* Everycar Rent Plan */}
const PlanBoxStyle = styled.div`width: 309px; height: 230px; border-radius: 15px; padding: 23px 27px; text-align: left; background-color: #FFFFFF; color: #2F2F2F; `;

function Plan({ title, TitleStyle }) {
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

export default Plan;