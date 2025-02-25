import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import styles from '../css/routes/CarDetail.module.scss';

import useCar from "../components/hooks/useCar";
import CarInfo from "../components/rentDetail/CarInfo";
import CarOption from "../components/rentDetail/CarOption";
import ContractInfo from "../components/rentDetail/ContractInfo";
import RentCondition from "../components/rentDetail/RentCondition";
import RentTime from "../components/rentDetail/RentTime";
import ReservationInfo from "../components/rentDetail/ReservationInfo";

// 반응형 폰트 크기 계산 함수
const vwFont = (min, max, baseWidth = 1920) => {
    return `clamp(${min}px, calc(${max} / ${baseWidth} * 100vw), ${max}px)`;
};

// 부제목 스타일
let SubTitleH3 = styled.h3`
    margin-bottom: ${vwFont(10, 19)};
    font-size: ${vwFont(11, 24)};
`;

function RentReservation() {
    const { id } = useParams(); // URL에 입력한 id
    const carId = isNaN(Number(id)) ? null : Number(id); // id가 숫자가 아니라면 null 처리
    // console.log("carDetail 렌더링됨: ", id, carId);

    // 사용자 입력값으로 동적 설정
    const [rentalDatetime, setRentalDatetime] = useState("2025-02-21T10:00:00");
    const [returnDatetime, setReturnDatetime] = useState("2025-02-21T14:00:00");
    // const { car, loading, error } = useCar(carId, rentalDatetime, returnDatetime);
    const { car, loading, error } = useCar(carId); // 차량 정보

    // 사용자가 날짜 선택 시 변경
    const handleRentalChange = (e) => setRentalDatetime(e.target.value);
    const handleReturnChange = (e) => setReturnDatetime(e.target.value);

    // 기본 차량 데이터 설정
    const defaultCarInfo = {
        model: { model_name: "미등록 차량", model_transmission: "자동", model_seate_num: "4" },
        car_grade: "미정",
        car_fuel: "가솔린",
        car_year: "2023",
        car_options: "네비게이션, 블랙박스, 후방카메라",
        img: "/images/car-model/product-image-01.png", // 기본 이미지
        calculatedPrice: "0", // 기본 가격
    };

    // 기본 차량 데이터 설정
    const carData = car && car.model ? car : defaultCarInfo;

    // 데이터가 없을 경우 예외처리
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    // if (!car) return <p>해당 차량을 찾을 수 없습니다.</p>;

    return (
        <div className={styles.carDetail}>
            <div className={styles.mainTitle}>
                <h2>상세정보</h2>
            </div>

            <div className={styles.carDetailContainer}>
                <div className={styles.left}>
                    <RentTime title='대여시간' SubTitleH3={SubTitleH3} vwFont={vwFont} />
                    <CarInfo title='제원정보' car={car} SubTitleH3={SubTitleH3} />
                    <CarOption title='차량옵션' car={car} SubTitleH3={SubTitleH3} vwFont={vwFont}/>
                    <RentCondition title='대여조건' SubTitleH3={SubTitleH3} />
                    <ContractInfo title='계약정보' SubTitleH3={SubTitleH3} />
                </div>

                <div className={styles.right}>
                    <ReservationInfo title={carData.model.model_name} car={carData} SubTitleH3={SubTitleH3} />
                </div>
            </div>
        </div>
    );
}

export default RentReservation;