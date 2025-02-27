// List.js
import React from 'react';
import '../../css/shortRent/List.css';

// 차량 이미지 사이즈 360*180
const sample = '/images/car-model/product-image-01.png';  // 샘플 이미지
// import sample from '/images/car-model/product-image-01.png';  // 샘플 이미지 import

function List() {
  return (
    <div className="List">

      {/* 차량 리스트 */}
      <div className="right">

        {/* 리스트에 뜨는 카드(차량) 수 */}
        <div className="right-header">총 100대</div>

        <div className="card-grid">

          {/* 카드 반복 -> 총 11개 */}
          {
            Array.from({ length: 11 }).map((_, i) => (
              <CarCard
                key={i}
                name='EV6'
                release='2021년식'
                image={sample}
                size='중형'
                group='5인승'
                gas='전기'
                settings='오토'
                price='500,000원'
              />
            ))
          }

        </div>

      </div>

    </div>
  );
}

{/* 자동차 정보카드 컴포넌트 */}
function CarCard({ name, release, image, size, group, gas, settings, price }) {
  return (
    <>
      {/* 리스트 카드 기본 구조 */}
      <div className="card">
        <div className="card-title">
          <span className="card-name">{name}</span>
          <span className="card-release">{release}</span>
        </div>
        <img src={image} alt="차 기종명" className="car-image" />
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
    </>
  );
}

export default List;