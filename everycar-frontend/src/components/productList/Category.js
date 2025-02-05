// Category.js
import React from 'react';

import '../../css/productList/Category.css';

function Category() {
  return (
    <div class="container">

        {/* 카테고리 분류 박스 */}
        <div class="left">

          {/* 날짜 선택 박스 */}
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


          {/* 차량 검색 박스 */}
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

    </div>
  );
}

export default Category;