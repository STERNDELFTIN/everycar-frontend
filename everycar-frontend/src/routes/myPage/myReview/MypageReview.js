import styles from "../../../css/routes/myPage/review/myReview.module.scss";
import { useState } from "react";
import useUserInfo from "../../../components/hooks/useUserInfo";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // useNavigate import

function MypageReview() {
  const { userInfo } = useUserInfo();
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const {
    carName,
    payment,
    startDate,
    startTime,
    endDate,
    endTime,
    rentPos,
    reservationType,
    reservationId,
  } = location.state;

  const [formData, setFormData] = useState({
    userNum: userInfo.userNum,
    reservationId: reservationId,
    carConditionSatisfactionRating: "",
    reservationProcessSatisfactionRating: "",
    priceSatisfactionRating: "",
    reviewContent: "",
  });

  // 모든 만족도 항목이 선택되었는지 확인하는 함수
  const isFormValid = () => {
    return (
      formData.carConditionSatisfactionRating &&
      formData.reservationProcessSatisfactionRating &&
      formData.priceSatisfactionRating
    );
  };

  // 라디오 버튼 값 변경 처리
  const handleRadioChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };

  // 텍스트 입력값 변경 처리
  const handleTextChange = (event) => {
    setFormData({ ...formData, reviewContent: event.target.value });
  };

  // 폼 제출 처리
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.carConditionSatisfactionRating ||
      !formData.reservationProcessSatisfactionRating ||
      !formData.priceSatisfactionRating
    ) {
      alert("모든 평가 항목을 선택해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8080/api/user/reviews", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("리뷰가 성공적으로 제출되었습니다!");
        setFormData({
          userNum: 2,
          reservationId: 132,
          carConditionSatisfactionRating: "",
          reservationProcessSatisfactionRating: "",
          priceSatisfactionRating: "",
          reviewContent: "",
        });

        // 제출 후 /myPage/history 페이지로 리디렉션
        navigate("/myPage/history");
      } else {
        alert("리뷰 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.reviewContn}>
      <div className={styles.reviewTitle}>
        <h2>리뷰 작성</h2>
        <p>
          에브리카를 이용해 주셔서 감사합니다!
          <br />
          고객님의 소중한 후기는 더 나은 서비스로 보답할 수 있는 힘이 됩니다.
          <br />
          <br />
          솔직한 후기를 남겨주시면, 다른 고객님들께도 유용한 정보가 됩니다. 더
          좋은 서비스로 보답하겠습니다.
        </p>
      </div>
      <div className={styles.reviewContent}>
        <table>
          <tbody>
            <tr>
              <th>이용 기간</th>
              <td>
                {startDate} {startTime} ~ {endDate} {endTime}
              </td>
            </tr>
            <tr>
              <th>이용 서비스</th>
              <td>
                {reservationType === "fast"
                  ? "빠른 대여"
                  : reservationType === "short"
                  ? "단기 대여"
                  : reservationType}
              </td>
            </tr>
            <tr>
              <th>대여 차량</th>
              <td>{carName}</td>
            </tr>
            <tr>
              <th>대여 장소</th>
              <td>{rentPos}</td>
            </tr>
            <tr>
              <th>금액</th>
              <td>{payment} 원</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.answer}>
          <form onSubmit={handleSubmit}>
            <h2>만족도 응답</h2>

            {/* 차량 만족도 */}
            <div className={styles.reviewRating}>
              <p>1. 대여한 차량의 만족도(청결도, 성능)을 평가해주세요.</p>
              <div className={styles.radioBox}>
                {["1", "2", "3", "4", "5"].map((value, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="carConditionSatisfactionRating"
                      value={value}
                      checked={
                        formData.carConditionSatisfactionRating ===
                        parseInt(value)
                      }
                      onChange={handleRadioChange}
                    />
                    <span>
                      {
                        ["매우 불만족", "불만족", "보통", "만족", "매우 만족"][
                          index
                        ]
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 예약 편의성 만족도 */}
            <div className={styles.reviewRating}>
              <p>2. 에브리카 예약 서비스 편의성 만족도를 평가해주세요.</p>
              <div className={styles.radioBox}>
                {["1", "2", "3", "4", "5"].map((value, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="reservationProcessSatisfactionRating"
                      value={value}
                      checked={
                        formData.reservationProcessSatisfactionRating ===
                        parseInt(value)
                      }
                      onChange={handleRadioChange}
                    />
                    <span>
                      {
                        ["매우 불만족", "불만족", "보통", "만족", "매우 만족"][
                          index
                        ]
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 가격 만족도 */}
            <div className={styles.reviewRating}>
              <p>3. 에브리카 서비스 가격 만족도를 평가해주세요.</p>
              <div className={styles.radioBox}>
                {["1", "2", "3", "4", "5"].map((value, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="priceSatisfactionRating"
                      value={value}
                      checked={
                        formData.priceSatisfactionRating === parseInt(value)
                      }
                      onChange={handleRadioChange}
                    />
                    <span>
                      {
                        ["매우 불만족", "불만족", "보통", "만족", "매우 만족"][
                          index
                        ]
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 제안 사항 */}
            <div className={styles.reviewRating}>
              <p>4. 서비스 개선을 위한 제안 사항이 있으신가요?</p>
              <textarea
                name="reviewContent"
                value={formData.reviewContent}
                onChange={handleTextChange}
                rows="4"
                cols="10"
                placeholder="제안 사항을 입력해주세요."
              />
            </div>
            <div className={styles.buttonBox}>
              <button type="reset">취소</button>
              <button
                type="submit"
                className={styles.submit}
                disabled={!isFormValid()}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default MypageReview;
