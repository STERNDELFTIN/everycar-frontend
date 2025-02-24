import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import styles from '../css/CarDetail.module.scss';

import useCar from "../components/hooks/useCar";

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
                    <RentTime title='대여시간' />
                    <CarInfo title='제원정보' car={car} />
                    <CarOption title='차량옵션' car={car} />
                    <RentCondition title='대여조건' />
                    <ContractInfo title='계약정보' />
                </div>

                <div className={styles.right}>
                    <ReservationInfo title={carData.model.model_name} car={carData} />
                </div>
            </div>
        </div>
    );
}

// 대여시간
function RentTime({ title }) {
    return (
        <div className={`${styles.rentTimeContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.rentTime}>
                <div className={styles.startRent}>
                    <span className={styles.startDate}>2025. 01. 01</span><span className={styles.startTime}>10:00</span>
                </div>
                <img src="/images/icons/car-shape-icon.png" alt="Not Found" style={{ width: `${vwFont(10, 30)}`, height: `${vwFont(10, 30)}` }} />
                <div className={styles.endRent}>
                    <span className={styles.endDate}>2025. 01. 03</span><span className={styles.endTime}>12:00</span>
                </div>
            </div>
        </div>
    );
}

// 제원정보
function CarInfo({ title, car }) {
    let carInfo = [
        { title: '제조사', content: car.model.model_name },
        { title: '등급', content: car.car_grade },
        { title: '변속', content: car.model.model_transmission },
        { title: '연료', content: car.car_fuel },
        { title: '인원', content: `${car.model.model_seate_num}명` },
        { title: '연식', content: car.car_year },
    ];

    return (
        <div className={`${styles.carInfoContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.carName}>
                <h5>{car.model.model_name}</h5>
                <div>{car.car_grade}</div>
            </div>

            <div className={styles.carInfo}>
                {
                    carInfo.map((item, i) =>
                        <div key={i} className={styles.carInfoItem}>
                            <p className={styles.carInfoTitle} style={{ width: '40%' }}>{item.title}</p><p className={styles.carInfoContent} style={{ width: '50%' }}>{item.content}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

// 차량옵션
function CarOption({ title, car }) {
    // let options = ['네비게이션', '하이패스', '블랙박스', '후방카메라', '열시트'];
    const options = car.car_options ? car.car_options.split(",") : []; // car_options를 배열로 변환

    return (
        <div className={`${styles.carOptionContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.carOptionBox}>
                {
                    options.map((item, i) =>
                        <div key={i} className={styles.carOption}>
                            <img src="/images/icons/car-option-icon.png" alt="Not Found" style={{ width: vwFont(25, 60), height: vwFont(25, 60) }} />
                            <p>{item}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

// 운전자 대여조건
function RentCondition({ title }) {
    let conditions = ['만26세 이상 성인', '면허 취득일로부터 1년', '2종 보통면허 이상 필요', '실물 면허증 소지자'];

    return (
        <div className={`${styles.rentConditionContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div>
                {
                    conditions.map((item, i) =>
                        <div key={i} className={styles.rentCondition}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#5A5A5A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>{item}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

// 계약정보
function ContractInfo({ title }) {
    return (
        <div className={`${styles.contractInfoContainer} ${styles.container}`}>
            <SubTitleH3>{title}</SubTitleH3>
            <div className={styles.contractInfoBox}>
                <p className={styles.contractTitle}>보험</p>
                <p className={styles.contractContent}>면허 취득일로부터 1년이 지난 만26세 이상의 성인부터 대여할 수 있습니다.</p>
            </div>
        </div>
    );
}

// 우측 예약정보
function ReservationInfo({ title, car }) {
    return (
        <div className={`${styles.reservationInfoContainer} ${styles.container}`}>
            <div className={styles.carImage}>
                <img src={car.img || "/images/car-model/product-image-01.png"} alt={car.model.model_name} style={{ height: vwFont(100, 200), width: 'auto' }} />
            </div>

            <div className={styles.carContent}>
                <SubTitleH3 className={styles.subTitle}>{title}</SubTitleH3>
                <div className={styles.line} style={{ border: '1px solid #D9D9D9', marginBottom: vwFont(10, 15) }}></div>
                <div className={styles.carInfoBox}>
                    <div className={styles.priceInfoBox} style={{ marginBottom: vwFont(10, 15) }}>
                        <p style={{ fontSize: vwFont(10, 18), fontWeight: '600', marginBottom: vwFont(10, 15) }}>결제정보</p>
                        <div className={styles.priceInfo}>
                            <p style={{ marginLeft: '10px' }}>총대여료</p>
                            <p style={{ fontSize: vwFont(12, 24), fontWeight: '600' }}>{car.calculatedPrice}원</p>
                        </div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.counselButton}>상담신청</button>
                        <button className={styles.reservationButton}>예약하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RentReservation;