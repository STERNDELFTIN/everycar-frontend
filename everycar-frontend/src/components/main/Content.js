import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

{/* Content */}
function Content() {

    const [posPopup, setPosPopup] = useState(false);

    const [region, setRegion] = useState([]);
    const [city, setCity] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    // 렌트위치 데이터 불러오기
    useEffect(() => {
        axios.get('/main/rent_position.json')
        .then(result => {
            setRegion(result.data);
        })
        .catch(error => {
            console.error("데이터 불러오기 실패: ", error);
        });
    }, []);

    return(
        <div className='content-container'>
            <div className='content-box'>

            </div>

            <div className='rent-container'>
                <div className='rent-pos'>
                    <h5 className='title'>렌트 장소</h5>
                    <div className='content' onClick={ () => setPosPopup(!posPopup) }>
                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.875 8.75C18.875 14.875 11 20.125 11 20.125C11 20.125 3.125 14.875 3.125 8.75C3.125 6.66142 3.95468 4.65838 5.43153 3.18153C6.90838 1.70468 8.91142 0.875 11 0.875C13.0886 0.875 15.0916 1.70468 16.5685 3.18153C18.0453 4.65838 18.875 6.66142 18.875 8.75Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 11.375C12.4497 11.375 13.625 10.1997 13.625 8.75C13.625 7.30025 12.4497 6.125 11 6.125C9.55025 6.125 8.375 7.30025 8.375 8.75C8.375 10.1997 9.55025 11.375 11 11.375Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {
                            selectedCity == null ? <p>서울시 강남구</p> :<p>{selectedRegion} {selectedCity}</p>
                        }
                    </div>
                </div>

                {
                    posPopup && 
                    (
                        <PosPopupScreen 
                            state={{ region, city, selectedRegion, selectedCity }} 
                            handler={{ setRegion, setCity, setSelectedCity, setSelectedRegion }}
                        />
                    ) 
                }

                <div style={ { borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" } }></div>

                <div className='rent-period'>
                    <h5 className='title'>렌트 기간</h5>
                    <div className='content'>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 5.74999V11.5L15.3334 13.4167M21.0834 11.5C21.0834 16.7927 16.7928 21.0833 11.5 21.0833C6.20729 21.0833 1.91669 16.7927 1.91669 11.5C1.91669 6.20726 6.20729 1.91666 11.5 1.91666C16.7928 1.91666 21.0834 6.20726 21.0834 11.5Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className='period'>
                            <p className='start-period'><b>01.01(수) </b>10:00</p>
                            <p style={{ margin: "0 20px" }}>~</p>
                            <p className='end-period'><b>01.03(금) </b>10:00</p>
                        </div>
                    </div>
                </div>

                <div className='rent-btn'>
                    <button>
                        <div className='arow'>
                            <svg width="24" height="41" viewBox="0 0 24 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 2L20.5 20.5L2.5 39" stroke="#252736" strokeWidth="4" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

function PosPopupScreen({ state, handler }) {
    const { region, city, selectedRegion, selectedCity } = state;
    const { setRegion, setCity, setSelectedCity, setSelectedRegion } = handler;

    const handleRegionClick = (region) => {
        setSelectedCity(null);

        setSelectedRegion(region.region);
        setCity(region.cities);
    };
    const handleCityClick = (selectedCity) => {
        setSelectedCity(selectedCity.city || selectedCity); // 객체면 도시 이름 사용
    };

    return (
        <div className='pos-popup-container' style={{ backgroundColor: "#f0f0f0", position: "absolute" }}>
            {/* 좌측 지역 목록 */}
            <div className='region-container'>
                <h3>지역 선택</h3>
                {
                    region.map((region, i) => (
                        <div
                            key={i}
                            onClick={() => handleRegionClick(region)}
                            style={
                                selectedRegion === region.region 
                                ? { backgroundColor: '#DEFF54', padding: '10px', cursor: 'pointer' } 
                                : { backgroundColor: '#F3F3F3', padding: '10px', cursor: 'pointer' }
                            }
                        >
                            <p>{region.region}</p>
                        </div>
                    ))
                }
            </div>

            {/* 우측 도시 목록 */}
            <div className='city-container'>
                <h3>도시 선택</h3>
                {city.length > 0 ? (
                    city.map((city, i) => (
                        <div
                            key={i}
                            onClick={() => handleCityClick(city)}
                            style={
                                selectedCity === (city.city || city)
                                ? { backgroundColor: '#DEFF54', padding: '10px', cursor: 'pointer' }
                                : { backgroundColor: '#F3F3F3', padding: '10px', cursor: 'pointer' }
                            }
                        >
                            {typeof city === 'object' ? city.city : city}
                        </div>
                    ))
                ) : (
                    <p>지역을 선택하세요.</p>
                )}
            </div>
        </div>
    );
}

export default Content;