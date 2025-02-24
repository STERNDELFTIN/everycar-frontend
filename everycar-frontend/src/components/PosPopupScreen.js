import React from 'react';

import '../css/PosPopupScreen.css';

function PosPopupScreen({ state, handler }) {
    const { region, city, selectedRegion, selectedCity } = state;
    const { setRegion, setCity, setSelectedCity, setSelectedRegion, setPosPopup } = handler;

    const handleRegionClick = (region) => {
        setSelectedCity(null);

        setSelectedRegion(region.region);
        setCity(region.cities);
    };
    const handleCityClick = (selectedCity) => {
        setSelectedCity(selectedCity.city || selectedCity); // 객체면 도시 이름 사용
    };

    return (
        <div className='pos-popup-container' style={{ backgroundColor: "#ffffff" }}>
            {/* 좌측 지역 목록 */}
            <div className='region-container'>
                <h3 style={{ fontSize:'clamp(14px, 1.4vw, 28px)' }}>지역선택</h3>
                <div style={{ width:'auto', marginTop:'5%', borderBottom:'1px solid grey' }}></div>
                {
                    region.map((region, i) => (
                        <div
                            key={i}
                            onClick={() => handleRegionClick(region)}
                            style={
                                selectedRegion === region.region 
                                ? { backgroundColor: '#DEFF54', padding: '15px', cursor: 'pointer', fontSize:'clamp(12px, 1.2vw, 24px)' } 
                                : { backgroundColor: '#ffffff', padding: '15px', cursor: 'pointer', fontSize:'clamp(12px, 1.2vw, 24px)' }
                            }
                        >
                            <p>{region.region}</p>
                        </div>
                    ))
                }
            </div>

            {/* 우측 도시 목록 */}
            <div className='city-container'>
                <h3 style={{ fontSize:'clamp(14px, 1.4vw, 28px)' }}>도시선택</h3>
                <div style={{ width:'auto', marginTop:'5%', borderBottom:'1px solid grey' }}></div>
                {city.length > 0 ? (
                    city.map((city, i) => (
                        <div
                            key={i}
                            onClick={() => handleCityClick(city)}
                            style={
                                selectedCity === (city.city || city)
                                ? { backgroundColor: '#DEFF54', padding: '15px', cursor: 'pointer', fontSize:'clamp(12px, 1.2vw, 24px)' }
                                : { backgroundColor: '#ffffff', padding: '15px', cursor: 'pointer', fontSize:'clamp(12px, 1.2vw, 24px)' }
                            }
                        >
                            {typeof city === 'object' ? city.city : city}
                        </div>
                    ))
                ) : (
                    <p style={{ marginTop: '10px', fontSize:'clamp(12px, 0.9vw, 19px)' }}>지역을 선택하세요.</p>
                )}
            </div>

            <button onClick={() => { setPosPopup(false) }}>선택완료</button>
        </div>
    );
}

export default PosPopupScreen;