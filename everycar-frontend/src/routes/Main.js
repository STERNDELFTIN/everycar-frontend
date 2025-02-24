import '../css/Main.css';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setPosPopup, setPeriodPopup, setSelectedRegion, setSelectedCity, setStartTime, setStartDate, setEndTime, setEndDate } from '../redux/rentSlice.js';

import Content from '../components/main/Content.js';
import Shortcut from '../components/main/Shortcut.js';
import Plan from '../components/main/Plan.js';
import Car from '../components/main/Car.js';
import Popup from '../components/PosAndPeriodPopup.js';

const TitleStyle = styled.h3`font-size: clamp(15px, 2.3vw, 50px); text-align: left; margin-bottom: 2.5vh; `;

function Main() {
    // Redux 상태 가져오기
    const rentState = useSelector((state) => state.rent);
    const dispatch = useDispatch();

    return (
        <div className="Main">
            <Popup
                state={rentState}
                handler={{
                    setPosPopup: (value) => dispatch(setPosPopup(value)),
                    setPeriodPopup: (value) => dispatch(setPeriodPopup(value)),
                    setSelectedRegion: (value) => dispatch(setSelectedRegion(value)),
                    setSelectedCity: (value) => dispatch(setSelectedCity(value)),
                    setStartDate: (value) => dispatch(setStartDate(value)),
                    setEndDate: (value) => dispatch(setEndDate(value)),
                    setStartTime: (value) => dispatch(setStartTime(value)),
                    setEndTime: (value) => dispatch(setEndTime(value)),
                }}
                reservationType="speed"
            />
            <Content
                state={rentState}
                handler={{
                    setPosPopup: (value) => dispatch(setPosPopup(value)),
                    setPeriodPopup: (value) => dispatch(setPeriodPopup(value)),
                }}
            />
            <Shortcut />
            <Plan title="에브리카 렌트 플랜" TitleStyle={TitleStyle} />
            <Car title="국내 인기 차량" TitleStyle={TitleStyle} />
        </div>
    );
}

export default Main;