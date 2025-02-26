import { useState } from 'react';
import styled from 'styled-components';
import styles from '../../css/rentDetail/ReturnLocation.module.scss';
import { vwFont } from '../../utils';

const ReturnPosTitle = styled.h4`font-size: ${vwFont(11, 20)}; margin-top: ${vwFont(10, 15)}; font-weight: 400; `;

function ReturnLocation({ title, SubTitleH3 }) {
    const returnOptions = ["대여한 곳에서 반납하기", "대여장소와 다른 곳에서 반납하기"];

    const [selectedReturnOption, setSelectedReturnOption] = useState(returnOptions[0]);
    const [selectedCityOption, setSelectedCityOption] = useState("");
    const [selectedRegionOption, setSelectedRegionOption] = useState("");
    const [selectedParkingOption, setSelectedParkingOption] = useState("");

    return (
        <div className={styles.returnLocation}>
            <SubTitleH3>{title}</SubTitleH3>

            <div className={styles.optionsContainer}>
                {
                    returnOptions.map((option, i) => (
                        <label key={option} className={styles.optionBox}>
                            <input className={styles.optionRadioBox}
                                type="radio"
                                value={option}
                                checked={selectedReturnOption === option}
                                onChange={(e) => setSelectedReturnOption(e.target.value)}
                            />
                            <p style={selectedReturnOption === option ? { color: '#000000', display: 'flex', alignItems: 'center', } : { color: '#8F9191', display: 'flex', alignItems: 'center', }}>{returnOptions[i]}</p>
                        </label>
                    ))
                }
            </div>

            {
                selectedReturnOption === returnOptions[1] && (
                    <div className={styles.returnOptionContainer}>
                        <div className={styles.cityRegion}>
                            <div className={`${styles.city} ${styles.returnPosition}`}>
                                <ReturnPosTitle>도 / 시</ReturnPosTitle>
                                <select value={selectedCityOption}>
                                    <option value="" disabled>도/시를 선택하세요</option>
                                </select>
                            </div>
                            <div className={`${styles.region} ${styles.returnPosition}`}>
                                <ReturnPosTitle>행정구역</ReturnPosTitle>
                                <select value={selectedRegionOption}>
                                    <option value="" disabled>지역을 선택하세요</option>
                                </select>
                            </div>
                        </div>

                        <div className={`${styles.parking} ${styles.returnPosition}`}>
                            <ReturnPosTitle>주차장</ReturnPosTitle>
                            <select value={selectedParkingOption}>
                                <option value="" disabled>주차장을 선택하세요</option>
                            </select>
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default ReturnLocation;