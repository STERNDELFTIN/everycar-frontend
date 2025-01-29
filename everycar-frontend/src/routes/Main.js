import '../css/Main.css';
import styled from 'styled-components';

const TitleStyle = styled.h3`font-size: 36px; `;

function Main() {
    return (
        <div className="Main">
            <Content />
            <Shortcut />
            <Plan title="에브리카 렌트 플랜" />
            <Car title="국내 인기 차량" />
            <Event title="이벤트" />
        </div>
    );
}

function Content() {
    return(
        <div className='content'>

        </div>
    );
}
function Shortcut() {
    return(
        <div className='service-shortcut'>

        </div>
    );
}
function Plan({ title }) {
    return(
        <div className='plan'>
            <TitleStyle>{ title }</TitleStyle>
        </div>
    );
}
function Car({ title }) {
    return(
        <div className='domestic-popular-car'>
            <TitleStyle>{ title }</TitleStyle>
        </div>
    );
}
function Event({ title }) {
    return(
        <div className='event'>
            <TitleStyle>{ title }</TitleStyle>
        </div>
    );
}

export default Main;