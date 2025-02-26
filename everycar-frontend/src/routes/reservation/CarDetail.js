import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import styles from '../../css/routes/CarDetail.module.scss';
import { vwFont } from '../../utils';

import useCar from "../../components/hooks/useCar";
import CarInfo from "../../components/rentDetail/CarInfo";
import CarOption from "../../components/rentDetail/CarOption";
import RentLocation from "../../components/rentDetail/RentLocation";
import ContractInfo from "../../components/rentDetail/ContractInfo";
import RentCondition from "../../components/rentDetail/RentCondition";
import RentTime from "../../components/rentDetail/RentTime";
import ReservationInfo from "../../components/rentDetail/ReservationInfo";

// 더미 데이터 가져오기
import dummnyCar from "../../dummyData/dummyCar";

// 부제목 스타일
let SubTitleH3 = styled.h3`
    margin-bottom: ${vwFont(10, 19)};
    font-size: ${vwFont(11, 24)};
`;

function CarDetail() {
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

    // 데이터가 없을 경우 기본값 설정
    const carData = car && car.model ? car : dummnyCar;

    // 데이터가 없을 경우 예외처리
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    // if (!car) return <p>해당 차량을 찾을 수 없습니다.</p>;

    // 렌트 위치 좌표 (서울 강남역)
    const latitude = 37.497942;
    const longitude = 127.027621;

    return (
        <div className={styles.carDetail}>
            <div className={styles.mainTitle}>
                <h2>상세정보</h2>
            </div>

            <div className={styles.carDetailContainer}>
                <div className={styles.left}>
                    <RentTime title='대여시간' SubTitleH3={SubTitleH3} />
                    <CarInfo title='제원정보' car={carData} SubTitleH3={SubTitleH3} />
                    <CarOption title='차량옵션' car={carData} SubTitleH3={SubTitleH3} />
                    <RentLocation title='대여장소' car={carData} latitude={latitude} longitude={longitude} SubTitleH3={SubTitleH3} />
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

export default CarDetail;