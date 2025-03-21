import '../css/routes/Main.css';
import styled from 'styled-components';
import { setPosPopup, setPeriodPopup, setSelectedRegion, setSelectedCity, setStartTime, setStartDate, setEndTime, setEndDate } from '../redux/rentSlice.js';
import { useEffect } from 'react';

import Content from '../components/main/Content.js';
import Shortcut from '../components/main/Shortcut.js';
import Plan from '../components/main/Plan.js';
import Car from '../components/main/Car.js';
import Popup from '../components/popup/PosAndPeriodPopup.js';

const TitleStyle = styled.h3`font-size: clamp(15px, 2.3vw, 32px); text-align: left; margin-bottom: 2.5vh; `;

function Main() {

    useEffect(() => {
        // 히스토리 조작하여 뒤로가기 완전 차단
        const blockBackNavigation = () => {
            window.history.pushState(null, "", window.location.href);
        };

        // setInterval()을 사용하여 지속적으로 pushState() 실행
        const interval = setInterval(blockBackNavigation, 100);

        // 뒤로가기 버튼을 눌러도 다시 현재 페이지 유지
        window.addEventListener("popstate", blockBackNavigation);

        // 사용자가 페이지를 떠나려 할 때 경고 메시지 표시 (새로고침 및 창 닫기 방지)
        window.onbeforeunload = (e) => {
            e.preventDefault();
            return (e.returnValue = "이 페이지를 떠나시겠습니까?");
        };

        return () => {
            clearInterval(interval); // setInterval 정리 (메모리 누수 방지)
            window.removeEventListener("popstate", blockBackNavigation); // popstate 이벤트 제거
            window.onbeforeunload = null; // 새로고침 방지 해제
        };
    }, []);

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