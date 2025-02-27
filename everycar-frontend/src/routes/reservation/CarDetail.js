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

import dummyCar from "../../dummyData/dummyCar";

let SubTitleH3 = styled.h3`
    margin-bottom: ${vwFont(10, 19)};
    font-size: ${vwFont(11, 24)};
`;

function CarDetail() {
    const { id } = useParams();
    const carId = Number(id);

    const { car, totalPrice, loading, error } = useCar(carId);

    console.log("URL에서 받은 carId:", carId);
    console.log("차량 데이터:", car);

    const carData = car || dummyCar;

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error}</p>;
    if (!carData) return <p>해당 차량을 찾을 수 없습니다.</p>;

    const latitude = 37.497942;
    const longitude = 127.027621;

    return (
        <div className={styles.carDetail}>
            <div className={styles.mainTitle}>
                <h2>상세정보</h2>
            </div>

            <div className={styles.carDetailContainer}>
                <div className={styles.left}>
                    <RentTime title="대여시간" SubTitleH3={SubTitleH3} />
                    <CarInfo title="제원정보" car={carData} SubTitleH3={SubTitleH3} />
                    <CarOption title="차량옵션" car={carData} SubTitleH3={SubTitleH3} />
                    <RentLocation title="대여장소" car={carData} latitude={latitude} longitude={longitude} SubTitleH3={SubTitleH3} />
                    <RentCondition title="대여조건" SubTitleH3={SubTitleH3} />
                    <ContractInfo title="계약정보" SubTitleH3={SubTitleH3} />
                </div>

                <div className={styles.right}>
                    <ReservationInfo title={carData.model.model_name} car={carData} SubTitleH3={SubTitleH3} totalPrice={totalPrice} />
                </div>
            </div>
        </div>
    );
}

export default CarDetail;
