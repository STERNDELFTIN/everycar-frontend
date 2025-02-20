import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import styles from '../css/CarDetail.module.scss';

import useCar from "../components/hooks/useCar";

let SubTitleH3 = styled.h3`
    margin-bottom: 10px;
    font-size: 24px;
`;

function CarDetail() {
    const { id } = useParams(); // URL에 입력한 id
    const carId = isNaN(Number(id)) ? null : Number(id); // id가 숫자가 아니라면 null 처리
    // console.log("carDetail 렌더링됨: ", id, carId);

    const { car, loading, error } = useCar(carId); // 차량 정보
    // 데이터가 없을 경우 예외처리
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!car) return <p>해당 차량을 찾을 수 없습니다.</p>;

    return (
        <div className={styles.carDetail}>
            <div className={styles.mainTitle}>
                <h2>상세정보</h2>
            </div>

            <div>
                <div className={styles.left}>
                    <RentTime title='대여시간' />
                    <CarInfo title='제원정보' />
                    <CarOption title='차량옵션' />
                    <RentCondition title='대여조건' />
                    <ContractInfo title='계약정보' />
                </div>

                <div className={styles.right}>
                    <ReservationInfo title={car.name} />
                </div>
            </div>
        </div>
    );
}

// 대여시간
function RentTime({ title }) {
    return (
        <div>
            <SubTitleH3>{title}</SubTitleH3>
            <div></div>
        </div>
    );
}

// 제원정보
function CarInfo({ title }) {
    return (
        <div>
            <SubTitleH3>{title}</SubTitleH3>
            {/* <div>
                <h5>{car.name}</h5>
                <div>Premium</div>
            </div>

            <div>
                <p>제조사</p> <p></p>
                <p>등급</p> <p>{car.grade}</p>
                <p>변속</p> <p></p>
                <p>연료</p> <p>{car.fuel}</p>
                <p>탑승인원</p> <p>{car.capacity}</p>
                <p>연식</p> <p></p>
            </div> */}
        </div>
    )
}

// 차량옵션
function CarOption({ title }) {
    let options = ['네비게이션', '하이패스', '블랙박스', '후방카메라', '열시트'];

    return (
        <div>
            <SubTitleH3>{title}</SubTitleH3>
            <div>
                {
                    options.map((item, i) =>
                        <div key={i}>
                            <img src="/images/icons/car-option-icon.png" alt="img" />
                            <p>{ item }</p>
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
        <div>
            <SubTitleH3>{title}</SubTitleH3>
            <div>
                {
                    conditions.map((item, i) =>
                        <div key={i}>
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
        <div>
            <SubTitleH3>{title}</SubTitleH3>
            <div>
                <h6>보험</h6>
                <p>면허 취득일로부터 1년이 지난 만26세 이상의 성인부터 대여할 수 있습니다.</p>
            </div>
        </div>
    );
}

// 우측 예약정보
function ReservationInfo({ title }) {
    return (
        <div>
            {/* <img src={car.img || "/images/car-model/product-image-01.png"} alt={car.name} /> */}
            <SubTitleH3>{title}</SubTitleH3>
            <div style={{ border: '1px solid grey' }}></div>
            <div>
                <p>결제정보</p>
                <p>총 대여료</p> <p>500,000원</p>
            </div>
            <div>
                <button>상담신청</button>
                <button>예약하기</button>
            </div>
        </div>
    );
}

export default CarDetail;