import { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from '../../css/rentDetail/ReturnLocation.module.scss';
import { vwFont } from '../../utils';

const ReturnPosTitle = styled.h4`font-size: ${vwFont(11, 20)}; margin-top: ${vwFont(10, 15)}; font-weight: 400; `;

function ReturnLocation({ title, SubTitleH3, parkingList, onLocationChange }) {
    const returnOptions = ["대여한 곳에서 반납하기", "대여장소와 다른 곳에서 반납하기"];

    const [selectedReturnOption, setSelectedReturnOption] = useState(returnOptions[0]);
    const [selectedCityOption, setSelectedCityOption] = useState("");
    const [selectedRegionOption, setSelectedRegionOption] = useState("");
    const [selectedParkingOption, setSelectedParkingOption] = useState("");

    // parkingList에서 중복된 province 제거하고 유니크한 도 / 시 목록 생성
    const uniqueProvinces = [...new Set(parkingList.map(parking => parking.parking_province))];

    // 선택된 도/시에 해당하는 지역(district) 목록을 추출하는 함수
    const filteredDistricts = parkingList.filter(parking => parking.parking_province === selectedCityOption);
    const uniqueDistricts = [...new Set(filteredDistricts.map(parking => parking.parking_district))];

    // 지역 선택 시, 해당 지역에 맞는 주차장 목록을 필터링
    const filteredParkingList = filteredDistricts.filter(parking => parking.parking_district === selectedRegionOption);

    // location change handler
    const handleLocationChange = () => {
        const returnOptionValue = selectedReturnOption === "대여한 곳에서 반납하기" ? 0 : 1;
        if (onLocationChange) {
            onLocationChange(selectedCityOption, selectedRegionOption, selectedParkingOption, returnOptionValue);
        }
    };

    useEffect(() => {
        handleLocationChange();
    }, [selectedCityOption, selectedRegionOption, selectedParkingOption, selectedReturnOption]);


    return (
        <div className={styles.returnLocation}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.optionsContainer}>
                {returnOptions.map((option, i) => (
                    <label key={option} className={styles.optionBox}>
                        <input
                            className={styles.optionRadioBox}
                            type="radio"
                            value={option}
                            checked={selectedReturnOption === option}
                            onChange={(e) => setSelectedReturnOption(e.target.value)}
                        />
                        <p style={selectedReturnOption === option ? { color: '#000000' } : { color: '#8F9191' }}>
                            {returnOptions[i]}
                        </p>
                    </label>
                ))}
            </div>

            {selectedReturnOption === returnOptions[1] && (
                <div className={`${styles.parking} ${styles.returnPosition}`}>
                    <ReturnPosTitle>주차장</ReturnPosTitle>
                    <div className={styles.cityRegion}>
                        <div className={`${styles.city} ${styles.returnPosition}`}>
                            <ReturnPosTitle>도 / 시</ReturnPosTitle>
                            <select
                                value={selectedCityOption}
                                onChange={(e) => setSelectedCityOption(e.target.value)}
                            >
                                <option value="" disabled>도 / 시를 선택하세요</option>
                                {uniqueProvinces.map((province, index) => (
                                    <option key={index} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`${styles.region} ${styles.returnPosition}`}>
                            <ReturnPosTitle>행정구역</ReturnPosTitle>
                            <select
                                value={selectedRegionOption}
                                onChange={(e) => setSelectedRegionOption(e.target.value)}
                                disabled={!selectedCityOption}
                            >
                                <option value="" disabled>지역을 선택하세요</option>
                                {uniqueDistricts.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.parking} ${styles.returnPosition}`}>
                        <ReturnPosTitle>주차장</ReturnPosTitle>
                        <select
                            value={selectedParkingOption}
                            onChange={(e) => setSelectedParkingOption(e.target.value)}
                            disabled={!selectedRegionOption}
                        >
                            <option value="" disabled>주차장을 선택하세요</option>
                            {filteredParkingList.map((parking, index) => (
                                <option key={index} value={parking.parking_id}>
                                    {parking.parking_name} ({parking.parking_address})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}



export default ReturnLocation;