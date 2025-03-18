import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../css/routes/authorization/Register.module.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    userId: "",
    userPassword: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userGender: 1, // 기본값: 여성
    userBirth: "",
    userAddress: "",
    userAddressDetail: "", // 상세주소 추가
  });

  const [isFormValid, setIsFormValid] = useState(false); // 버튼 활성화 여부
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false); // 아이디 중복 여부
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
  const [successMessage, setSuccessMessage] = useState(""); // 아이디 사용 가능 메시지
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 우편번호 API 스크립트 로드
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      // 스크립트 로드 완료 후 daum.Postcode 사용 가능
      window.daum = window.daum || {};  // daum이 정의되지 않은 경우 방어
    };
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 아이디 중복 확인 함수
  const checkUserIdAvailability = async () => {
    const { userId } = formData;
    if (userId.length > 0) {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/check-user-id?userId=${userId}`);
        const data = await response.json();
        if (data.isDuplicate) {
          setIsUserIdAvailable(false);
          setErrorMessage("이미 사용 중인 아이디입니다.");
          setSuccessMessage(""); // 중복된 경우 사용 가능 메시지를 지운다
        } else {
          setIsUserIdAvailable(true);
          setErrorMessage(""); // 중복되지 않으면 에러 메시지 지운다
          setSuccessMessage("사용 가능한 아이디입니다."); // 사용 가능한 아이디 메시지 추가
        }
      } catch (error) {
        console.error("아이디 중복 확인 오류:", error);
      }
    } else {
      setIsUserIdAvailable(false); // 아이디가 비어 있으면 중복 체크 안 함
      setErrorMessage("");
      setSuccessMessage(""); // 아이디가 비어있으면 사용 가능 메시지 지운다
    }
  };

  useEffect(() => {
    // 모든 필드가 비어있지 않은지 확인
    const isValid =
      formData.userId &&
      formData.userPassword &&
      formData.userName &&
      formData.userEmail &&
      formData.userPhone &&
      formData.userGender &&
      formData.userBirth &&
      formData.userAddress &&
      formData.userAddressDetail; // 상세주소도 포함

    setIsFormValid(isValid && isUserIdAvailable); // 아이디 중복 확인이 통과되었을 때만 활성화
  }, [formData, isUserIdAvailable]); // formData나 isUserIdAvailable이 변경될 때마다 유효성 검사

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 아이디 중복 확인
    if (!isUserIdAvailable) {
      alert("이미 사용 중인 아이디입니다. 다른 아이디를 선택해주세요.");
      return; // 중복된 아이디일 경우 회원가입을 진행하지 않음
    }

    // userAddress와 userAddressDetail을 합쳐서 보내기
    const fullAddress = formData.userAddress + " " + formData.userAddressDetail;

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userAddress: fullAddress, // 결합된 주소를 전송
        }),
      });
      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/auth/login");
      } else {
        alert("회원가입 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  // 카카오 우편번호 서비스 호출을 위한 함수
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 우편번호와 주소가 완성된 후 처리
        setFormData({
          ...formData,
          userAddress: data.roadAddress, // 도로명 주소
        });
      },
    }).open();
  };

  return (
    <div className={style.registerCont}>
      <div className={style.inputCont}>
        <h2>정보 입력</h2>
        <form onSubmit={handleSubmit}>
          <label className={style.textAreaId}>
            <span className={style.inputName}>아이디</span>
            <input
              type="text"
              name="userId"
              placeholder="아이디"
              value={formData.userId}
              onChange={handleChange}
              required
            />
            {!isUserIdAvailable && <p className={style.errorMessage}>{errorMessage}</p>}
            {isUserIdAvailable && successMessage && <p className={style.successMessage}>{successMessage}</p>}
            <button className={style.inputBtn} type="button" onClick={checkUserIdAvailability}>중복검사</button>
          </label>
         

          <label className={style.textArea}>
            <span className={style.inputName}>비밀번호</span>
            <input
              type="password"
              name="userPassword"
              placeholder="비밀번호"
              onChange={handleChange}
              required
            />
            <br />
          </label>

          <label className={style.textArea}>
          <span className={style.inputName}>이름</span>
            <input
              type="text"
              name="userName"
              placeholder="이름"
              onChange={handleChange}
              required
            />
            <br />
          </label>

          <label className={style.textArea}>
          <span className={style.inputName}>이메일</span>
            <input
              type="email"
              name="userEmail"
              placeholder="이메일"
              onChange={handleChange}
              required
            />
            <br />
          </label>

          <label className={style.textArea}>
          <span className={style.inputName}>전화번호</span>
            <input
              type="text"
              name="userPhone"
              placeholder="전화번호"
              onChange={handleChange}
              required
            />
            <br />
          </label>

          <label className={style.textArea}>
          <span className={style.inputName}>생년월일</span>
            <input
              type="date"
              name="userBirth"
              onChange={handleChange}
              required
            />
            <br />
          </label>

          <label>
            <div className={style.radioBox}>
              <input
                type="radio"
                id="female"
                name="userGender"
                value={1}
                checked={formData.userGender == 1}
                onChange={handleChange}
                className={style.radioInput}
              />
              <label htmlFor="female" className={style.radioLabel}>
                여성
              </label>

              <input
                type="radio"
                id="male"
                name="userGender"
                value={2}
                checked={formData.userGender == 2}
                onChange={handleChange}
                className={style.radioInput}
              />
              <label htmlFor="male" className={style.radioLabel}>
                남성
              </label>
            </div>
          </label>

          <label className={style.textArea}>
          <span className={style.inputName}>주소</span>
            <input
              type="text"
              name="userAddress"
              placeholder="주소"
              value={formData.userAddress}
              onChange={handleChange}
              required
            />
            <button className={style.inputBtn} type="button" onClick={openPostcode}>
              우편번호 검색
            </button>
            <br />
          </label>

          <label className={style.textArea}>
          <span className={style.inputName}>상세주소</span>
            <input
              type="text"
              name="userAddressDetail"
              placeholder="상세주소"
              value={formData.userAddressDetail}
              onChange={handleChange}
              required
            />
            <br />
          </label>

          <button
            type="submit"
            className={`${style.submitBtn} ${isFormValid ? style.activeBtn : style.disabledBtn}`}
            disabled={!isFormValid} // 버튼이 비활성화되도록 설정
          >
            가입완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
