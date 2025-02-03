import React from 'react';

import '../../css/main/PosPopupScreen.css';

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
        <div className='pos-popup-container' style={{ backgroundColor: "#ffffff", position: "absolute" }}>
            {/* 좌측 지역 목록 */}
            <div className='region-container'>
                <h3>지역선택</h3>
                <div style={{ width:'75%', marginTop:'8px', borderBottom:'1px solid grey' }}></div>
                {
                    region.map((region, i) => (
                        <div
                            key={i}
                            onClick={() => handleRegionClick(region)}
                            style={
                                selectedRegion === region.region 
                                ? { backgroundColor: '#DEFF54', padding: '10px', cursor: 'pointer' } 
                                : { backgroundColor: '#ffffff', padding: '10px', cursor: 'pointer' }
                            }
                        >
                            <p>{region.region}</p>
                        </div>
                    ))
                }
            </div>

            {/* 우측 도시 목록 */}
            <div className='city-container'>
                <h3>도시선택</h3>
                <div style={{ width:'75%', marginTop:'8px', borderBottom:'1px solid grey' }}></div>
                {city.length > 0 ? (
                    city.map((city, i) => (
                        <div
                            key={i}
                            onClick={() => handleCityClick(city)}
                            style={
                                selectedCity === (city.city || city)
                                ? { backgroundColor: '#DEFF54', padding: '10px', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', padding: '10px', cursor: 'pointer' }
                            }
                        >
                            {typeof city === 'object' ? city.city : city}
                        </div>
                    ))
                ) : (
                    <p style={{ marginTop: '10px' }}>지역을 선택하세요.</p>
                )}
            </div>
        </div>
    );
}

export default PosPopupScreen;