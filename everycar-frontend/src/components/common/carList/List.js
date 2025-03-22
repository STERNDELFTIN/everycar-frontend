import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../../css/common/carList/List.css';
import useAvailableCars from '../../hooks/useAvaliableCars'; // 커스텀 훅 불러오기
import CarNameMapper from '../CarNameMapper';

function List({ searchQuery, priceRange, selectedGrades }) {
  const navigate = useNavigate();

  // Redux에서 region(도/시), city(구), rentalDate, returnDate, reservationType 가져오기
  const { region, city, rentalDate, returnDate, reservationType } = useSelector((state) => state.rent);

  // API에서 차량 목록 불러오기
  const { cars, loading, error } = useAvailableCars(
    region, // Redux에서 가져온 region
    city, // Redux에서 가져온 city
    rentalDate,
    returnDate,
    reservationType // 예약 유형 전달
  );

  if (loading) return <p>차량 정보를 불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;
  if (!cars.length) return <p>이용 가능한 차량이 없습니다.</p>;

  // 차량 필터링
  const filteredCars = cars.filter(({ car, totalPrice }) => {
    return (
      (!searchQuery || car.model.model_name.includes(searchQuery)) && // 모델명 검색
      (totalPrice <= priceRange) && // 금액 필터링
      (selectedGrades.length === 0 || selectedGrades.includes(car.model.model_category)) // 차량 등급 필터링
    );
  });
  return (
    <div className="List">
      <div className="right">
        <div className="right-header">총 {filteredCars.length}대</div>
        <div className="card-grid">
          {filteredCars.map(({ car, totalPrice }) => (
            <CarCard
              key={car.car_id}
              name={car.model.model_name}
              release={`${car.car_year}년식`}
              grade={car.car_grade}
              image={car.image ? `/images/main/car/${CarNameMapper(car.model.model_name)}` : `/images/main/car/${CarNameMapper(car.model.model_name)}.png`}
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

function CarCard({ name, release, grade, image, size, group, gas, settings, price, onClick }) {
  return (
    <div className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-title">
        <div className="cardLeft">
          <span className="card-name">{name}</span>
          <span className="card-release">{release}</span>
        </div>
        <div className={`cardRight ${grade}`}>
          <span>{grade}</span>
        </div>
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
        <span className="card-price-sm2">{price}</span>
      </div>
    </div>
  );
}

export default List;
