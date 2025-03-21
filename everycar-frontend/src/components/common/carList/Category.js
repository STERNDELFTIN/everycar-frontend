// Category.js
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setStartTime, setEndDate, setEndTime, setPeriodPopup, setPosPopup } from '../../../redux/rentSlice';
import Popup from '../../popup/PosAndPeriodPopup';
import '../../../css/common/carList/Category.css';

function Category() {
  const dispatch = useDispatch();
  const { region, city, startDate, rentalDate, returnDate } = useSelector((state) => state.rent); // 빌린날짜, 반납날짜

  // 렌트일정 다시 선택
  const { posPopup, periodPopup } = useSelector((state) => state.rent);
  // 첫 렌더링 감지
  const isFirstRender = useRef(true);
  // 이전 상태 값 저장
  const prevPosPopup = useRef(posPopup);
  const prevPeriodPopup = useRef(periodPopup);
  // 팝업창 상태가 변경된 이후 새로고침 감지
  useEffect(() => {
    // 첫 렌더링이면 실행 X
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // 팝업이 열렸다가 닫힌 경우에만 새로고침 실행
    if ((prevPosPopup.current === true && posPopup === false) ||
      (prevPeriodPopup.current === true && periodPopup === false)) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    // 현재 상태를 prev 값으로 저장
    prevPosPopup.current = posPopup;
    prevPeriodPopup.current = periodPopup;
  }, [posPopup, periodPopup]);

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

      {/* 팝업창 렌더링 */}
      {<Popup />}

      {/* 카테고리 분류 박스 */}
      <div className="left">

        {/* 날짜 선택 박스 */}
        <div className="side-box1">
          <div className="side-box-title">
            <div className="side-box side-title">렌트 일정</div>
            <div style={{ display: 'flex', gap: '5px', }}>
              <button type="button" className="reset-btn" onClick={() => dispatch(setPosPopup(!posPopup))}>지역 선택</button>
              <button type="button" className="reset-btn" onClick={() => dispatch(setPeriodPopup(!periodPopup))}>기간 선택</button>
            </div>
          </div>

          <div className="side-box1-content">
            <div className="side-box1-small-content">
              <div className="small-title">지역</div>
              <div className="small-con">{region}/{city}</div>
            </div>
            <div className="side-box1-small-content">
              <div className="small-title">기간</div>
              <div className="small-con">{startDate} 부터 1개월 ~ </div>
            </div>
          </div>
        </div>

        {/* 차량 검색 박스 */}
        <div className="side-box2">

          <div className="side-box-title">
            <div className="side-box side-title">차량검색</div>
          </div>

          <div className="side-box2-content">

            {/* 직접 입력 검색 */}
            <div className="side-box2-small-content">
              <label htmlFor="searchBox" className="side-box side-title-small">자동차 모델 검색</label>
              <div className="side-box2-small-content-smallBox">
                <input type="text" id="searchBox" className="search-box" placeholder="자동차 모델명 입력하기" />
                <button type="button" className="search-btn">검색</button>
              </div>
            </div>

            {/* 금액대 선택 */}
            <div className="side-box2-small-content">
              <label htmlFor="priceRange" className="side-box side-title-small">
                금액
                <span className="price-range">0 원 ~ {formatNumber(value)} 원</span>
              </label>
              <div className="side-box2-small-content-smallBox">
                <input type="range" id="priceRange" className="range-bar"
                  min="0" max="1000000" step="100000"
                  value={value}
                  onChange={handleSliderChange} />
              </div>
            </div>

            {/* 차량 등급(종류) 선택 */}
            <div className="side-box2-small-content content-last">
              <div className="side-box side-title-small">등급</div>

              <div className="side-box2-small-content-smallBox size-check-box">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="size-1" id="size1" />
                  <label className="form-check-label" htmlFor="size1">경차</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="size-2" id="size2" />
                  <label className="form-check-label" htmlFor="size2">소형</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="size-3" id="size3" />
                  <label className="form-check-label" htmlFor="size3">준중형</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="size-4" id="size4" />
                  <label className="form-check-label" htmlFor="size4">중형</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="size-5" id="size5" />
                  <label className="form-check-label" htmlFor="size5">대형</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="size-6" id="size6" />
                  <label className="form-check-label" htmlFor="size6">SUV / RV</label>
                </div>
                <div className="form-check checkbox-last">
                  <input className="form-check-input" type="checkbox" value="size-7" id="size7" />
                  <label className="form-check-label" htmlFor="size7">기타</label>
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