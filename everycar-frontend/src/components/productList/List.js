// List.js
import React from 'react';
import '../../css/productList/List.css';

// 차량 이미지 사이즈 360*180
import sample from '../../assets/images/car-model/product-image-01.png';  // 샘플 이미지 import

function List() {
  return (
    <div className="List">

        {/* 차량 리스트 */}
        <div class="right">

          {/* 리스트에 뜨는 카드(차량) 수 */}
          <div class="right-header">총 100대</div>

          <div class="card-grid">

            {/* 리스트 카드 기본 구조 */}
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

            {/* 카드 반복 시작 */}

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

            {/* 카드 반복 끝. +8개 반복. 총 9개 */}

          </div>

        </div>

    </div>
  );
}

export default List;