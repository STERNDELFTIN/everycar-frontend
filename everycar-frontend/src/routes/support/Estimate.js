import React, { useState } from "react";
import style from '../../css/routes/support/Estimate.module.scss';

function Estimate() {
  const [activeCategory, setActiveCategory] = useState("compact");

  const categories = [
    { id: "compact", name: "경차" },
    { id: "small", name: "소형" },
    { id: "smallSUV", name: "소형SUV" },
    { id: "segment", name: "준중형" },
    { id: "mid", name: "중형" },
    { id: "midSUV", name: "중형SUV" },
    { id: "large", name: "준대형" },
    { id: "full", name: "대형" },
    { id: "fullSUV", name: "대형SUV" },
    { id: "rv", name: "RV" },
  ];

  const showCategory = (category) => {
    setActiveCategory(category);
  };

  const renderCategoryTable = (category) => {
    switch (category) {
      case "compact":
        return (
          <div>
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>기아 레이 5인승 자동 4단</td>
                <td className="highlight">50,000</td>
              </tr>
              <tr>
                <td>기아 모닝 5인승 자동 4단</td>
                <td className="highlight">50,000</td>
              </tr>
            </table>
            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>기아 레이 5인승 자동 4단</td>
                <td className="highlight">7,000</td>
              </tr>
              <tr>
                <td>기아 모닝 5인승 자동 4단</td>
                <td className="highlight">7,000</td>
              </tr>
            </table>
          </div>
        );
      case "small":
        return (
          <div>
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>현대 캐스퍼 5인승 자동 4단</td>
                <td className="highlight">70,000</td>
              </tr>
            </table>
            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>현대 캐스퍼 5인승 자동 4단</td>
                <td className="highlight">10,000</td>
              </tr>
            </table>
          </div>
        );
      case "smallSUV":
        return (
          <div>
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>현대 아이오닉6 5인승 자동</td>
                <td className="highlight">110,000</td>
              </tr>
              <tr>
                <td>현대 베뉴 5인승 자동 7단</td>
                <td className="highlight">70,000</td>
              </tr>
              <tr>
                <td>기아 셀토스 5인승 자동 8단</td>
                <td className="highlight">100,000</td>
              </tr>
              <tr>
                <td>기아 니로 5인승 자동 6단</td>
                <td className="highlight">90,000</td>
              </tr>
              <tr>
                <td>기아 EV3 5인승 자동</td>
                <td className="highlight">110,000</td>
              </tr>
              <tr>
                <td>KGM 티볼리 5인승 자동 6단</td>
                <td className="highlight">90,000</td>
              </tr>
              <tr>
                <td>현대 코나 5인승 자동 6단</td>
                <td className="highlight">70,000</td>
              </tr>
            </table>
            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>현대 아이오닉6 5인승 자동</td>
                <td className="highlight">13,000</td>
              </tr>
              <tr>
                <td>현대 베뉴 5인승 자동 7단</td>
                <td className="highlight">10,000</td>
              </tr>
              <tr>
                <td>기아 셀토스 5인승 자동 8단</td>
                <td className="highlight">12,000</td>
              </tr>
              <tr>
                <td>기아 니로 5인승 자동 6단</td>
                <td className="highlight">12,000</td>
              </tr>
              <tr>
                <td>기아 EV3 5인승 자동</td>
                <td className="highlight">13,000</td>
              </tr>
              <tr>
                <td>KGM 티볼리 5인승 자동 6단</td>
                <td className="highlight">12,000</td>
              </tr>
              <tr>
                <td>현대 코나 5인승 자동 6단</td>
                <td className="highlight">10,000</td>
              </tr>
            </table>
          </div>
        );
      case "segment":
        return (
          <div>
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>기아 k3 5인승 자동 4단</td>
                <td class="highlight">100,000</td>
              </tr>
              <tr>
                <td>현대 아반떼 5인승 자동 6단</td>
                <td class="highlight">80,000</td>
              </tr>
            </table>

            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>기아 k3 5인승 자동 4단</td>
                <td class="highlight">12,000</td>
              </tr>
              <tr>
                <td>현대 아반떼 5인승 자동 6단</td>
                <td class="highlight">11,000</td>
              </tr>
            </table>
          </div>
        );
      case "mid":
        return (
          <div>
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>제네시스 g70 5인승 자동 8단</td>
                <td class="highlight">120,000</td>
              </tr>
              <tr>
                <td>기아 k5 5인승 자동 8단</td>
                <td class="highlight">120,000</td>
              </tr>
              <tr>
                <td>현대 쏘나타 5인승 자동 8단</td>
                <td class="highlight">80,000</td>
              </tr>
            </table>

            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>제네시스 g70 5인승 자동 8단</td>
                <td class="highlight">15,000</td>
              </tr>
              <tr>
                <td>기아 k5 5인승 자동 8단</td>
                <td class="highlight">14,000</td>
              </tr>
              <tr>
                <td>현대 쏘나타 5인승 자동 8단</td>
                <td class="highlight">11,000</td>
              </tr>
            </table>
          </div>

        );
      case "midSUV":
        return (
          <div>
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>현대 아이오닉5 5인승 자동</td>
                <td class="highlight">110,000</td>
              </tr>
              <tr>
                <td>제네시스 gv60 5인승 자동</td>
                <td class="highlight">110,000</td>
              </tr>
              <tr>
                <td>제네시스 gv70 5인승 자동 8단</td>
                <td class="highlight">140,000</td>
              </tr>
              <tr>
                <td>기아 스포티지 5인승 자동 6단</td>
                <td class="highlight">100,000</td>
              </tr>
              <tr>
                <td>기아 쏘렌토 5인승 자동 6단</td>
                <td class="highlight">120,000</td>
              </tr>
              <tr>
                <td>기아 EV6 5인승 자동</td>
                <td class="highlight">50,000</td>
              </tr>
              <tr>
                <td>KGM 코란도 5인승 자동 6단</td>
                <td class="highlight">110,000</td>
              </tr>
              <tr>
                <td>KGM 토레스 5인승 자동 6단</td>
                <td class="highlight">110,000</td>
              </tr>
              <tr>
                <td>KGM 액티언 5인승 자동 6단</td>
                <td class="highlight">90,000</td>
              </tr>
              <tr>
                <td>현대 팰리세이드 7인승 자동 8단</td>
                <td class="highlight">140,000</td>
              </tr>
              <tr>
                <td>현대 싼타페 5인승 자동 8단</td>
                <td class="highlight">120,000</td>
              </tr>
              <tr>
                <td>현대 투싼 5인승 자동 6단</td>
                <td class="highlight">100,000</td>
              </tr>
            </table>

            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>현대 아이오닉5 5인승 자동</td>
                <td class="highlight">13,000</td>
              </tr>
              <tr>
                <td>제네시스 gv60 5인승 자동</td>
                <td class="highlight">13,000</td>
              </tr>
              <tr>
                <td>제네시스 gv70 5인승 자동 8단</td>
                <td class="highlight">16,000</td>
              </tr>
              <tr>
                <td>기아 스포티지 5인승 자동 6단</td>
                <td class="highlight">12,000</td>
              </tr>
              <tr>
                <td>기아 쏘렌토 5인승 자동 6단</td>
                <td class="highlight">14,000</td>
              </tr>
              <tr>
                <td>기아 EV6 5인승 자동</td>
                <td class="highlight">7,000</td>
              </tr>
              <tr>
                <td>KGM 코란도 5인승 자동 6단</td>
                <td class="highlight">13,000</td>
              </tr>
              <tr>
                <td>KGM 토레스 5인승 자동 6단</td>
                <td class="highlight">13,000</td>
              </tr>
              <tr>
                <td>KGM 액티언 5인승 자동 6단</td>
                <td class="highlight">12,000</td>
              </tr>
              <tr>
                <td>현대 팰리세이드 7인승 자동 8단</td>
                <td class="highlight">16,000</td>
              </tr>
              <tr>
                <td>현대 싼타페 5인승 자동 8단</td>
                <td class="highlight">14,000</td>
              </tr>
              <tr>
                <td>현대 투싼 5인승 자동 6단</td>
                <td class="highlight">12,000</td>
              </tr>
            </table>
          </div>
        );
      case "large":
        return (
          <div>
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>제네시스 g80 5인승 자동 8단</td>
                <td class="highlight">120,000</td>
              </tr>
              <tr>
                <td>기아 k8 5인승 자동 8단</td>
                <td class="highlight">130,000</td>
              </tr>
              <tr>
                <td>현대 그랜저 5인승 자동 8단</td>
                <td class="highlight">130,000</td>
              </tr>
            </table>

            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>제네시스 g80 5인승 자동 8단</td>
                <td class="highlight">15,000</td>
              </tr>
              <tr>
                <td>기아 k8 5인승 자동 8단</td>
                <td class="highlight">15,000</td>
              </tr>
              <tr>
                <td>현대 그랜저 5인승 자동 8단</td>
                <td class="highlight">15,000</td>
              </tr>
            </table>
          </div>
        );
      case "full":
        return (
          <div id="full" class="category hidden">
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>제네시스 g90 5인승 자동 8단</td>
                <td class="highlight">150,000</td>
              </tr>
              <tr>
                <td>기아 k9 5인승 자동 8단</td>
                <td class="highlight">140,000</td>
              </tr>
            </table>

            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>제네시스 g90 5인승 자동 8단</td>
                <td class="highlight">18,000</td>
              </tr>
              <tr>
                <td>기아 k9 5인승 자동 8단</td>
                <td class="highlight">16,000</td>
              </tr>
            </table>
          </div>
        );
      case "fullSUV":
        return (
          <div id="fullSUV" class="category hidden">
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>제네시스 gv80 5인승 자동 8단</td>
                <td class="highlight">150,000</td>
              </tr>
              <tr>
                <td>기아 EV9 5인승 자동</td>
                <td class="highlight">50,000</td>
              </tr>
            </table>

            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>제네시스 gv80 5인승 자동 8단</td>
                <td class="highlight">18,000</td>
              </tr>
              <tr>
                <td>기아 EV9 5인승 자동</td>
                <td class="highlight">7,000</td>
              </tr>
            </table>
          </div>
        );
      case "rv":
        return (
          <div id="rv" class="category hidden">
            <h3>대여기간별 일일 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1일</th>
              </tr>
              <tr>
                <td>현대 스타리아 9인승 자동 6단</td>
                <td class="highlight">140,000</td>
              </tr>
              <tr>
                <td>기아 카니발 9인승 자동 6단</td>
                <td class="highlight">140,000</td>
              </tr>
            </table>

            <h3>대여시간별 요금</h3>
            <table>
              <tr>
                <th>차종명</th>
                <th>1시간</th>
              </tr>
              <tr>
                <td>현대 스타리아 9인승 자동 6단</td>
                <td class="highlight">18,000</td>
              </tr>
              <tr>
                <td>기아 카니발 9인승 자동 6단</td>
                <td class="highlight">18,000</td>
              </tr>
            </table>
          </div>
        );
      // 더 많은 카테고리 구현
      default:
        return null;
    }
  };

  return (
    <div className={style.estimateCont}>
      <h2 className={style.title}>대여 및 요금 안내</h2>
      <div className={style.cont1}>
        <h3>대여 자격</h3>
        <div class={style.divider}></div>
        <p class={style.description}>도로교통법상 유효한 운전면허증을 소지하여야 대여가 가능하며, 1종 면허의 경우 적성기간 경과 후 1년이 지나면 운전면허 취소로 대여가 불가합니다.</p>
        <table class={style.tableContainer}>
          <tr>
            <th>차량 유형</th>
            <th>9인승 이하</th>
            <th>11~12인승</th>
            <th>15인승</th>
          </tr>
          <tr>
            <th>면허 종류</th>
            <td>2종 보통 이상</td>
            <td>1종 보통 이상</td>
            <td>1종 보통 이상</td>
          </tr>
          <tr>
            <th>운전자 연령</th>
            <td>만 21세 이상 ~ 만 80세 미만 (대여일 기준)</td>
            <td>만 21세 이상 ~ 만 80세 미만 (대여일 기준)</td>
            <td>만 26세 이상 ~ 만 80세 미만 (대여일 기준)</td>
          </tr>
          <tr>
            <th>취득 후 기간</th>
            <td>면허 취득일로부터 1년 이상 경과</td>
            <td>면허 취득일로부터 1년 이상 경과</td>
            <td>면허 취득일로부터 1년 이상 경과</td>
          </tr>
        </table>
        <div class={style.notes}>
          <p>· 에브리카는 [여객자동차 운수사업법 시행규칙 제 67조]에 의거 9인승 이하 차량만 대여가 가능합니다.</p>
          <p>· 운전면허증에 원동기가 함께 기재되어 있는 경우 운전경력증명서를 지참하셔야 차량대여가 가능합니다.</p>
          <p>· 대여 시 반드시 예약자 본인의 운전면허증을 지참하셔야 합니다. (정보가 지정 대여 시 상이할 경우, 예약이 취소되거나 추가 확인이 필요할 수 있습니다.)</p>
          <p>· 국제운전면허증 소지자의 경우, 입국일을 증명할 수 있도록 여권을 지참해주시길 바랍니다.</p>
          <p>· 만 21세 이상 나이는 생년월일이 지나야 인정됩니다.</p>
        </div>
      </div>
      <div className={style.cont2}>
        <h3>보험 및 보상</h3>
        <p>에브리카의 모든 차량은 차량 이용 중 사고가 발생하였을 때 아래의 보험 보상범위 내에서 고객님을 보호하기 위해 최선을 다하겠습니다.</p>
        <table>
          <tr>
            <th>대인</th>
            <th>무한</th>
          </tr>
          <tr>
            <td>대물</td>
            <td>사고 건당 2천만원</td>
          </tr>
          <tr>
            <td>자손</td>
            <td>개인당 1천5백만원 (*계약서상 등록되지 않은 운전자는 종합보험 혜택 불가)</td>
          </tr>
        </table>
      </div>
      <div className={style.cont3}>
        <h3>차종 별 예상 견적</h3>
        <div class={style.container}>
          <div class={style.tabs}>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${style.tab} ${activeCategory === category.id ? style.active : ''}`}
                onClick={() => showCategory(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>

          {renderCategoryTable(activeCategory)}
        </div>

      </div>
    </div>
  );
}

export default Estimate;