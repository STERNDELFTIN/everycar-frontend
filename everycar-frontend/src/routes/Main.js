import '../css/Main.css';
import styled from 'styled-components';

const TitleStyle = styled.h3`font-size: 36px; text-align: left; `;

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
        <div className='content-container'>
            <div className='content-box'>

            </div>

            <div className='rent-container'>
                <div className='rent-pos'>
                    <h5 className='title'>렌트 장소</h5>
                    <div className='content'>
                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.875 8.75C18.875 14.875 11 20.125 11 20.125C11 20.125 3.125 14.875 3.125 8.75C3.125 6.66142 3.95468 4.65838 5.43153 3.18153C6.90838 1.70468 8.91142 0.875 11 0.875C13.0886 0.875 15.0916 1.70468 16.5685 3.18153C18.0453 4.65838 18.875 6.66142 18.875 8.75Z" stroke="#B3B3B3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 11.375C12.4497 11.375 13.625 10.1997 13.625 8.75C13.625 7.30025 12.4497 6.125 11 6.125C9.55025 6.125 8.375 7.30025 8.375 8.75C8.375 10.1997 9.55025 11.375 11 11.375Z" stroke="#B3B3B3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p>서울시 강남구</p>
                    </div>
                </div>

                <div style={ { borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" } }></div>

                <div className='rent-period'>
                    <h5 className='title'>렌트 기간</h5>
                    <div className='content'>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 5.74999V11.5L15.3334 13.4167M21.0834 11.5C21.0834 16.7927 16.7928 21.0833 11.5 21.0833C6.20729 21.0833 1.91669 16.7927 1.91669 11.5C1.91669 6.20726 6.20729 1.91666 11.5 1.91666C16.7928 1.91666 21.0834 6.20726 21.0834 11.5Z" stroke="#B3B3B3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p className='start-period'><b>01.01(수) </b>10:00</p>
                        <p style={{ margin: "0 20px" }}>~</p>
                        <p className='end-period'><b>01.03(금) </b>10:00</p>
                    </div>
                </div>

                <div className='rent-btn'>
                    <button>
                        <div className='arow'>
                            <svg width="24" height="41" viewBox="0 0 24 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2L20.5 20.5L2.5 39" stroke="#252736" stroke-width="4" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
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