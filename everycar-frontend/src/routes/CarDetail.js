import { useParams } from "react-router-dom";
import { useState } from "react";
import useCar from "../components/hooks/useCar";

import styles from '../css/CarDetail.module.css';

function CarDetail() {
    const {id} = useParams(); // URL에 입력한 id
    const carId = isNaN(Number(id)) ? null : Number(id); // id가 숫자가 아니라면 null 처리
    // console.log("carDetail 렌더링됨: ", id, carId);
    
    const { car, loading, error } = useCar(carId); // 차량 정보
    // 데이터가 없을 경우 예외처리
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!car) return <p>해당 차량을 찾을 수 없습니다.</p>;
    
    return (
        <>
            <div className={styles.mainTitle}>
                <h3>상세정보</h3>
            </div>

            <div className={styles.left}>
                <div>
                    <div>
                        { car.id }
                        { car.name }
                        { car.grade }
                        { car.fuel}
                        { car.capacity }
                        <img src={car.img || "/images/car-model/product-image-01.png"} alt={car.name} />

                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

export default CarDetail;