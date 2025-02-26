import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import styles from '../css/routes/RentReservation.module.scss';
import { vwFont } from "../utils";

import useCar from "../components/hooks/useCar";
import CarInfo from "../components/rentDetail/CarInfo";
import CarOption from "../components/rentDetail/CarOption";
import RentLocation from "../components/rentDetail/RentLocation";
import RentTime from "../components/rentDetail/RentTime";
import ReturnLocation from "../components/rentDetail/ReturnLocation";
import PaymentType from "../components/rentDetail/PaymentType";
import TermsOfUse from "../components/rentDetail/TermsOfUse";

// 더미 데이터 가져오기
import dummnyCar from "../dummyData/dummyCar";

// 부제목 스타일
let SubTitleH3 = styled.h3`
    margin-bottom: ${vwFont(10, 19)};
    font-size: ${vwFont(11, 24)};
`;

function RentReservation() {
    const { id } = useParams(); // URL에 입력한 id
    const carId = isNaN(Number(id)) ? null : Number(id); // id가 숫자가 아니라면 null 처리
    // console.log("carDetail 렌더링됨: ", id, carId);

    // 약관 동의
    const [agree, setAgree] = useState(false);

    const changeAgreeHandler = (e) => {
        setAgree(e.target.checked); // 체크되면 true, 해제되면 false
    };

    // 결제 버튼 클릭
    const [payClick, setPayClick] = useState(false);

    // 사용자 입력값으로 동적 설정
    const [rentalDatetime, setRentalDatetime] = useState("2025-02-21T10:00:00");
    const [returnDatetime, setReturnDatetime] = useState("2025-02-21T14:00:00");
    // const { car, loading, error } = useCar(carId, rentalDatetime, returnDatetime);
    const { car, loading, error } = useCar(carId); // 차량 정보

    // 사용자가 날짜 선택 시 변경
    const handleRentalChange = (e) => setRentalDatetime(e.target.value);
    const handleReturnChange = (e) => setReturnDatetime(e.target.value);

    // 데이터가 없을 경우 더미 데이터 설정
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
                <h2>예약 및 결제</h2>
            </div>

            <div className={styles.carDetailContainer}>
                <div className={styles.left}>
                    <RentTime title='이용시간' SubTitleH3={SubTitleH3} />
                    <RentLocation title='대여장소' car={carData} latitude={latitude} longitude={longitude} SubTitleH3={SubTitleH3} />
                    <ReturnLocation title='반납장소' SubTitleH3={SubTitleH3} />
                    <TermsOfUse title='이용약관' SubTitleH3={SubTitleH3} />
                    <div>
                        <label style={{ display: 'flex' }}>
                            <input type='checkbox' checked={agree} onChange={changeAgreeHandler} />
                            <p>예약정보 확인 및 모든 약관 동의</p>
                        </label>
                    </div>
                    <PaymentType title='결제' SubTitleH3={SubTitleH3} agree={agree} payClick={payClick} />
                    <button onClick={() => setPayClick(true)} style={{ cursor: 'pointer' }} className={styles.paymentButton}>총 {carData.calculatedPrice}원 결제하기</button>
                </div>

                <div className={styles.right}>
                    <SubTitleH3>대여차량</SubTitleH3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}><img src={carData.img} style={{ width: vwFont(200, 400) }} /></div>
                    <div className={styles.carTitle} style={{ marginTop: vwFont(8, 18) }}>
                        <h3 style={{ fontSize: vwFont(13, 30), }}>{carData.model.model_name}</h3>
                        <div className={styles.carGrade}>{carData.car_grade}</div>
                    </div>

                    <div style={{ borderBottom: '1px solid #D9D9D9', marginTop: vwFont(10, 20), marginBottom: vwFont(10, 20) }}></div>

                    <CarInfo title='제원정보' car={carData} SubTitleH3={SubTitleH3} isHide={true} styleType='rentReservationStyle' />
                    <div style={{ marginBottom: vwFont(10, 20), }}></div>
                    <CarOption title='차량옵션' car={carData} SubTitleH3={SubTitleH3} />
                </div>
            </div>
        </div>
    );
}

export default RentReservation;