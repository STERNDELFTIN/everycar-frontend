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
      <div class="right">

        {/* 리스트에 뜨는 카드(차량) 수 */}
        <div class="right-header">총 100대</div>

        <div class="card-grid">

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
      <div class="card">
        <div class="card-title">
          <span class="card-name">{name}</span>
          <span class="card-release">{release}</span>
        </div>
        <img src={image} alt="차 기종명" class="car-image" />
        <div class="card-icons">
          <div class="card-icons-sm">
            <span class="material-symbols-outlined">star</span>
            <span class="icon-name">{size}</span>
          </div>
          <div class="card-icons-sm">
            <span class="material-symbols-outlined">group</span>
            <span class="icon-name">{group}</span>
          </div>
          <div class="card-icons-sm">
            <span class="material-symbols-outlined">local_gas_station</span>
            <span class="icon-name">{gas}</span>
          </div>
          <div class="card-icons-sm">
            <span class="material-symbols-outlined">settings</span>
            <span class="icon-name">{settings}</span>
          </div>
        </div>
        <div class="card-price">
          <span class="card-price-sm1">월</span>
          <span class="card-price-sm2">{price}</span>
        </div>
      </div>
    </>
  );
}

export default List;