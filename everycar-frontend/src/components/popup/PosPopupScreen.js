import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegion, setCity, setPosPopup } from '../../redux/rentSlice';
import useRentLocation from '../hooks/useRentLocation';

import '../../css/popup/PosPopupScreen.css';

function PosPopupScreen() {
    const dispatch = useDispatch();

    // Redux에서 현재 선택된 지역(region)과 도시(city) 가져오기
    const { region, city } = useSelector((state) => state.rent);

    // 렌트 장소 목록 가져오기
    const { locations } = useRentLocation();

    // 지역 리스트
    const regionList = locations.map(item => item.region);

    // 선택된 지역의 도시 리스트 가져오기
    const selectedRegionData = locations.find(item => item.region === region);
    const cityList = selectedRegionData
        ? selectedRegionData.cities.map(cityItem => 
            typeof cityItem === 'string' ? cityItem : cityItem.city)
        : [];

    // 지역 선택 핸들러
    const handleRegionClick = (regionName) => {
        dispatch(setRegion(regionName));

        // 선택된 지역의 첫 번째 도시를 기본 선택 (도시가 있을 경우)
        if (selectedRegionData && selectedRegionData.cities.length > 0) {
            const firstCity = typeof selectedRegionData.cities[0] === 'string'
                ? selectedRegionData.cities[0]
                : selectedRegionData.cities[0].city;
            dispatch(setCity(firstCity));
        } else {
            dispatch(setCity(null));
        }
    };

    // 도시 선택 핸들러
    const handleCityClick = (cityName) => {
        dispatch(setCity(cityName));
    };

    return (
        <div className='pos-popup-container' style={{ backgroundColor: "#ffffff" }}>
            {/* 좌측 지역 목록 */}
            <div className='region-container'>
                <h3 style={{ fontSize: 'clamp(14px, 1.4vw, 28px)' }}>지역 선택</h3>
                <div style={{ width: 'auto', marginTop: '5%', borderBottom: '1px solid grey' }}></div>

                {regionList.map((regionName, i) => (
                    <div
                        key={i}
                        onClick={() => handleRegionClick(regionName)}
                        style={{
                            backgroundColor: region === regionName ? '#DEFF54' : '#ffffff',
                            padding: '15px',
                            cursor: 'pointer',
                            fontSize: 'clamp(12px, 1.2vw, 24px)'
                        }}
                    >
                        <p>{regionName}</p>
                    </div>
                ))}
            </div>

            {/* 우측 도시 목록 */}
            <div className='city-container'>
                {cityList.length > 0 ? (
                    cityList.map((cityItem, i) => (
                        <div
                            key={i}
                            onClick={() => handleCityClick(cityItem)}
                            style={{
                                backgroundColor: city === cityItem ? '#DEFF54' : '#ffffff',
                                padding: '15px',
                                cursor: 'pointer',
                                fontSize: 'clamp(12px, 1.2vw, 24px)'
                            }}
                        >
                            {cityItem}
                        </div>
                    ))
                ) : (
                    <p style={{ marginTop: '10px', fontSize: 'clamp(12px, 0.9vw, 19px)' }}>지역을 선택하세요.</p>
                )}
            </div>

            {/* 선택 완료 버튼 */}
            <button onClick={() => {
                dispatch(setPosPopup(false));
                console.log("선택된 지역:", region, "선택된 도시:", city);
            }}>
                선택 완료
            </button>
        </div>
    );
}

export default PosPopupScreen;