import '../css/Main.css';
import styled from 'styled-components';
import { useState } from 'react';

import Content from '../components/main/Content.js';
import Shortcut from '../components/main/Shortcut.js';
import Plan from '../components/main/Plan.js';
import Car from '../components/main/Car.js';
import Popup from '../components/main/Popup.js';

const TitleStyle = styled.h3`font-size: clamp(15px, 2.3vw, 50px); text-align: left; margin-bottom: 2vw; `;

function Main() {
    // 렌트 장소 및 기간
    const [posPopup, setPosPopup] = useState(false);
    const [periodPopup, setPeriodPopup] = useState(false);

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    // 렌트 날짜 및 시간
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    return (
        <div className="Main">
            <Popup 
                state={{selectedRegion, selectedCity, startDate, endDate, startTime, endTime, posPopup, periodPopup}}
                handler={{setPosPopup, setPeriodPopup, setSelectedRegion, setSelectedCity, setStartDate, setStartTime, setEndDate, setEndTime}} 
             />
            <Content 
                state={{selectedRegion, selectedCity, startDate, endDate, startTime, endTime, posPopup, periodPopup}}
                handler={{setPosPopup, setPeriodPopup}} 
            />
            <Shortcut />
            <Plan title="에브리카 렌트 플랜" TitleStyle={TitleStyle}/>
            <Car title="국내 인기 차량" TitleStyle={TitleStyle}/>
        </div>
    );
}

export default Main;