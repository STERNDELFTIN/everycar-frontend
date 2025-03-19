import '../css/routes/Main.css';
import styled from 'styled-components';
import { setPosPopup, setPeriodPopup, setSelectedRegion, setSelectedCity, setStartTime, setStartDate, setEndTime, setEndDate } from '../redux/rentSlice.js';

import Content from '../components/main/Content.js';
import Shortcut from '../components/main/Shortcut.js';
import Plan from '../components/main/Plan.js';
import Car from '../components/main/Car.js';
import Popup from '../components/popup/PosAndPeriodPopup.js';

const TitleStyle = styled.h3`font-size: clamp(15px, 2.3vw, 32px); text-align: left; margin-bottom: 2.5vh; `;

function Main() {

    return (
        <div className="Main">
            <Popup reservationType="speed" />
            <Content />
            <Shortcut />
            <Plan title="에브리카 렌트 플랜" TitleStyle={TitleStyle} />
            {/* <Car title="국내 인기 차량" TitleStyle={TitleStyle} /> */}
        </div>
    );
}

export default Main;