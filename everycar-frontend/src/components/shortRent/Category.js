// Category.js
import React, { useState } from 'react';
import '../../css/shortRent/Category.css';

function Category() {

  // 슬라이더 값 상태 관리
  const [value, setValue] = useState(500000); // 기본값은 500,000으로 설정
  
  // 슬라이더 값이 변경될 때 호출되는 함수
  const handleSliderChange = (event) => {
    setValue(event.target.value); // 슬라이더 값 업데이트
  };

  // 숫자에 콤마 추가하기
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="Category">

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

            {/* 직접 입력 검색 */}
            <div class="side-box2-small-content">
              <label for="searchBox" class="side-box side-title-small">자동차 모델 검색</label>
              <div class="side-box2-small-content-smallBox">
                <input type="text" id="searchBox" class="search-box" placeholder="자동차 모델명 입력하기" />
                <button type="button" class="search-btn">검색</button>
              </div>
            </div>

            {/* 금액대 선택 */}
            <div class="side-box2-small-content">
              <label for="priceRange" class="side-box side-title-small">
                금액
                <span class="price-range">0 원 ~ {formatNumber(value)} 원</span>
              </label>
              <div class="side-box2-small-content-smallBox">
                <input type="range" id="priceRange" class="range-bar"
                  min="0" max="1000000" step="100000"
                  value={value}
                  onChange={handleSliderChange} />
              </div>
            </div>

            {/* 차량 등급(종류) 선택 */}
            <div class="side-box2-small-content content-last">
              <div class="side-box side-title-small">등급</div>

              <div class="side-box2-small-content-smallBox size-check-box">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="size-1" id="size1" />
                  <label class="form-check-label" for="size1">경차</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="size-2" id="size2" />
                  <label class="form-check-label" for="size2">소형</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="size-3" id="size3" />
                  <label class="form-check-label" for="size3">준중형</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="size-4" id="size4" />
                  <label class="form-check-label" for="size4">중형</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="size-5" id="size5" />
                  <label class="form-check-label" for="size5">대형</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="size-6" id="size6" />
                  <label class="form-check-label" for="size6">SUV / RV</label>
                </div>
                <div class="form-check checkbox-last">
                  <input class="form-check-input" type="checkbox" value="size-7" id="size7" />
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