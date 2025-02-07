import { useState } from 'react';
import styled from 'styled-components';

import '../../css/main/Event.css';

{/* Event */}
// const EventBoxStyle = styled.div`background-color: #D9D9D9; width: 600px; height: 184px; `;
const EventBoxStyle = styled.div`background-color: #D9D9D9; width: 100%; height: 100%; border-radius: 20px;`;

function Event() {

    const [startIndex, setStartIndex] = useState(0);

    const eventBoxes = [
        <EventBox key={0} img="이벤트 이미지 1" />,
        <EventBox key={1} img="이벤트 이미지 2" />,
        <EventBox key={2} img="이벤트 이미지 3" />,
        <EventBox key={3} img="이벤트 이미지 4" />,
        <EventBox key={4} img="이벤트 이미지 5" />
    ];

    // 좌측/우측 버튼 클릭 시
    // const handleLeftClick = () => { setStartIndex(i => (i === 0 ? eventBoxes.length - 2 : i - 1)); };
    // const handleRightClick = () => { setStartIndex(i => (i >= eventBoxes.length - 2 ? 0 : i + 1)); };
    const handleLeftClick = () => { setStartIndex(i => (i === 0 ? eventBoxes.length - 1 : i - 1)); };
    const handleRightClick = () => { setStartIndex(i => (i >= eventBoxes.length - 1 ? 0 : i + 1)); };

    return(
        <div className='event'>
            <div className="event-container">
                <button className="left-btn" onClick={handleLeftClick}>
                    <img src="main/event/left_btn.png" alt="left" />
                </button>

                {/* startIndex부터 두 개의 EventBox만 렌더링 */}
                {/* { eventBoxes.slice(startIndex, startIndex + 2) } */}

                {/* startIndex부터 한 개의 EventBox만 렌더링 */}
                { eventBoxes.slice(startIndex, startIndex + 1) }

                <button className="right-btn" onClick={handleRightClick}>
                    <img src="main/event/right_btn.png" alt="right" />
                </button>
            </div>
        </div>
    );
}
function EventBox({ img }) {
    return (
        <EventBoxStyle>
            <p>{img}</p>
        </EventBoxStyle>
    );
}

export default Event;