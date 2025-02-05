// List.js
import React from 'react';

import '../../css/productList/List.css';

function List() {
  return (
    <div class="container">

        {/* 차량 리스트 */}
        <div class="right">
          <div class="right-header">
            <h1>총 100대</h1>
          </div>

          <div class="card-grid">

            <div class="card selected">
              <div class="card-title">
                EV6
                <span class="card-release">2021년식</span>
              </div>
              <img src="이미지 링크" alt="차 기종명" class="carImage"/>
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

            <div class="card">
              <div class="card-title">
                EV6
                <span class="card-release">2021년식</span>
              </div>
              <img src="이미지 링크" alt="차 기종명" class="carImage"/>
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