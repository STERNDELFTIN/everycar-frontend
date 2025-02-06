// List.js
import React from 'react';

import '../../css/productList/List.css';
import sample from '../../assets/images/car-model/product-image-01.png';  // 샘플 이미지 import
// 차량 이미지 사이즈 360*180

function List() {
  return (
    <div class="">

        {/* 차량 리스트 */}
        <div class="right">
          <div class="right-header">총 100대</div>

          <div class="card-grid">

            <div class="card">
              <div class="card-title">
                <span class="card-name">EV6</span>
                <span class="card-release">2021년식</span>
              </div>
              <img src={sample} alt="차 기종명" class="car-image"/>
              <div class="card-icons">
                <div class="card-icons-sm">
                  <span class="material-symbols-outlined">star</span>
                  <span class="icon-name">중형</span>
                </div>
                <div class="card-icons-sm">
                  <span class="material-symbols-outlined">group</span>
                  <span class="icon-name">5인승</span>
                </div>
                <div class="card-icons-sm">
                  <span class="material-symbols-outlined">ev_station</span>
                  <span class="icon-name">전기</span>
                </div>
                <div class="card-icons-sm">
                  <span class="material-symbols-outlined">settings</span>
                  <span class="icon-name">오토</span>
                </div>
              </div>
              <div class="card-price">
                <span class="card-price-sm1">월</span>
                <span class="card-price-sm2">500,000원</span>
              </div>
            </div>

            <div class="card">
              <div class="card-title">
                EV6
                <span class="card-release">2021년식</span>
              </div>
              <img src={sample} alt="차 기종명" class="car-image"/>
              <div class="card-icons">
                <div class="card-icons-sm">
                  <span class="material-symbols-outlined">star</span>
                  <span class="icon-name">중형</span>
                </div>
                <div class="card-icons-sm">
                  <span class="material-symbols-outlined">group</span>
                  <span class="icon-name">5인승</span>
                </div>
                <div class="card-icons-sm">
                  <span class="material-symbols-outlined">ev_station</span>
                  <span class="icon-name">전기</span>
                </div>
                <div class="card-icons-sm">
                  <span class="material-symbols-outlined">settings</span>
                  <span class="icon-name">오토</span>
                </div>
              </div>
              <div class="card-price">
                <span class="card-price-sm">월</span>
                1,500,000원
              </div>
            </div>

          </div>

        </div>

    </div>
  );
}

export default List;