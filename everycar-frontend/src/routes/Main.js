import '../css/routes/Main.css';
import styled from 'styled-components';
// import { setPosPopup, setPeriodPopup, setSelectedRegion, setSelectedCity, setStartTime, setStartDate, setEndTime, setEndDate } from '../redux/rentSlice.js';
import { useEffect } from 'react';

import Content from '../components/main/Content.js';
import Shortcut from '../components/main/Shortcut.js';
import Plan from '../components/main/Plan.js';
// import Car from '../components/main/Car.js';
import Popup from '../components/popup/PosAndPeriodPopup.js';
import Map from '../components/main/Map.js';

const TitleStyle = styled.h3`font-size: clamp(15px, 2.3vw, 32px); text-align: left; margin-bottom: 2.5vh; `;

function Main() {

    useEffect(() => {
        // 히스토리 조작하여 뒤로가기 완전 차단
        const blockBackNavigation = () => {
            window.history.pushState(null, "", window.location.href);
        };

        // setInterval()을 사용하여 지속적으로 pushState() 실행
        const interval = setInterval(blockBackNavigation, 100); // 0.1초마다 현재 페이지를 히스토리에 덮어써 이전 페이지로 이동 불가능

        // 뒤로가기 버튼을 눌러도 다시 현재 페이지 유지
        window.addEventListener("popstate", blockBackNavigation); // popstate : 사용자가 뒤로가기 버튼을 눌렀을 때 발생하는 이벤트

        // 사용자가 페이지를 떠나려 할 때 경고 메시지 표시 (새로고침 및 창 닫기 방지)
        window.onbeforeunload = (e) => {
            e.preventDefault(); // 실수로 페이지를 떠나는 것을 방지
            return (e.returnValue = "이 페이지를 떠나시겠습니까?");
        };

        return () => {
            clearInterval(interval); // setInterval 정리 (메모리 누수 방지) -> 페이지가 변경되거나 컴포넌트가 언마운트될 때 해당 함수를 호출하여 메모리 정리
            window.removeEventListener("popstate", blockBackNavigation); // popstate 이벤트 제거
            window.onbeforeunload = null; // 새로고침 방지 해제 -> 페이지 변경된 후에도 이벤트리스너가 남아있어 예상치 못한 동작 발생 가능성 존재하므로 제거해줌
        };
    }, []);

    return (
        <div className="Main">
            <Popup reservationType="speed" />
            <Content />
            <Shortcut />
            <Plan title="에브리카 렌트 플랜" TitleStyle={TitleStyle} />
            {/* <Car title="국내 인기 차량" TitleStyle={TitleStyle} /> */}
            <Map></Map>
        </div>
    );
}

export default Main;