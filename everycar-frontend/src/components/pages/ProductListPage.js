// ProductListPage.js
import React from 'react';
import '../styles/ProductListPage.css';

function ProductListPage() {
  return (
    <div class="container">

        <div class="left">

          <div class="side-box1">

            <div class="side-box-title">
              <div class="side-box side-title">렌트 일정</div>
              <div><button type="button" class="reset-btn">다시 선택</button></div>
            </div>

            <div class="side-box1-content">
              <div class="side-box1-small-content">
                <div class="small-title">지역</div>
                <div class="small-con">서울/강남구</div>
              </div>
              <div class="side-box1-small-content">
                <div class="small-title">기간</div>
                <div class="small-con">01.01(수) 부터 1개월 ~ </div>
              </div>
            </div>
          </div>


          <div class="side-box2">

            <div class="side-box-title">
              <div class="side-box side-title">차량검색</div>
            </div>
              
            <div class="side-box2-content">

              <div class="side-box2-small-content">
                <label for="searchBox" class="side-box side-title">자동차 모델 검색</label>
                <div class="side-box2-small-content-smallBox">
                  <input type="search" id="searchBox" class="search-box" placeholder="자동차 모델명 입력하기"/>
                  <button type="button" class="search-btn">검색</button>
                </div>
              </div>

              <div class="side-box2-small-content">
                <label for="priceRange" class="side-box side-title">금액</label>
                <div class="side-box2-small-content-smallBox">
                  <input type="range" id="priceRange" class="range-bar" min="0" max="5"/> 
                </div>
              </div>

              <div class="side-box2-small-content">
                <div class="side-box side-title">등급</div>
                  
                <div class="side-box2-small-content-smallBox">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="size-1" id="size1"/>
                    <label class="form-check-label" for="size1">경차</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="size-2" id="size2"/>
                    <label class="form-check-label" for="size2">소형</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="size-3" id="size3"/>
                    <label class="form-check-label" for="size3">준중형</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="size-4" id="size4"/>
                    <label class="form-check-label" for="size4">중형</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="size-5" id="size5"/>
                    <label class="form-check-label" for="size5">대형</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="size-6" id="size6"/>
                    <label class="form-check-label" for="size6">SUV / RV</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="size-7" id="size7"/>
                    <label class="form-check-label" for="size7">기타</label>
                  </div>
                </div>
              </div>

            </div> 
          </div>
        </div>

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

export default ProductListPage;