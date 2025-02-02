import '../css/Main.css';
import styled from 'styled-components';

import Content from '../components/main/Content.js';
import Shortcut from '../components/main/Shortcut.js';
import Plan from '../components/main/Plan.js';
import Car from '../components/main/Car.js';
import Event from '../components/main/Event.js';

const TitleStyle = styled.h3`font-size: 36px; text-align: left; margin-bottom: 17px; `;

function Main() {
    return (
        <div className="Main">
            <Content />
            <Shortcut />
            <Plan title="에브리카 렌트 플랜" TitleStyle={TitleStyle}/>
            <Car title="국내 인기 차량" TitleStyle={TitleStyle}/>
            <Event title="이벤트" TitleStyle={TitleStyle}/>
        </div>
    );
}

export default Main;