import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../../css/common/carList/List.css';
import useAvailableCars from '../../hooks/useAvaliableCars'; // 커스텀 훅 불러오기

function List() {
  const navigate = useNavigate();

  const { region, city, rentalDate, returnDate } = useSelector((state) => state.rent);

  // API에서 차량 목록 불러오기
  const { cars, loading, error } = useAvailableCars(
    "서울특별시", // region
    "중구", // city
    rentalDate,
    returnDate
  );

  if (loading) return <p>차량 정보를 불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;
  if (!cars.length) return <p>이용 가능한 차량이 없습니다.</p>;

  return (
    <div className="List">
      <div className="right">
        <div className="right-header">총 {cars.length}대</div>
        <div className="card-grid">
          {cars.map(({ car, totalPrice }) => (
            <CarCard
              key={car.car_id}
              name={car.model.model_name}
              release={`${car.car_year}년식`}
              image={car.image || '/images/car-model/product-image-01.png'}
              size={car.model.model_category}
              group={`${car.model.model_seate_num}인승`}
              gas={car.car_fuel}
              settings={car.model.model_transmission}
              price={`${totalPrice.toLocaleString()}원`}
              onClick={() => navigate(`/reservation/carDetail/${car.car_id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarCard({ name, release, image, size, group, gas, settings, price, onClick }) {
  return (
    <div className="card" onClick={onClick} style={{cursor: 'pointer'}}>
      <div className="card-title">
        <span className="card-name">{name}</span>
        <span className="card-release">{release}</span>
      </div>
      <img src={image} alt={name} className="car-image" />
      <div className="card-icons">
        <div className="card-icons-sm">
          <span className="material-symbols-outlined">star</span>
          <span className="icon-name">{size}</span>
        </div>
        <div className="card-icons-sm">
          <span className="material-symbols-outlined">group</span>
          <span className="icon-name">{group}</span>
        </div>
        <div className="card-icons-sm">
          <span className="material-symbols-outlined">local_gas_station</span>
          <span className="icon-name">{gas}</span>
        </div>
        <div className="card-icons-sm">
          <span className="material-symbols-outlined">settings</span>
          <span className="icon-name">{settings}</span>
        </div>
      </div>
      <div className="card-price">
        <span className="card-price-sm1">월</span>
        <span className="card-price-sm2">{price}</span>
      </div>
    </div>
  );
}

export default List;
