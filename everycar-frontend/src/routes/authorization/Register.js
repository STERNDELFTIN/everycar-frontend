import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../css/routes/authorization/Register.module.scss";

const Register = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [formData, setFormData] = useState({
    userId: "",
    userPassword: "",
    userPasswordConfirm: "", // 비밀번호 확인 필드 추가
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
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 일치 오류 메시지
  const [userIdError, setUserIdError] = useState(""); // 아이디 유효성 오류 메시지
  const [passwordStrengthError, setPasswordStrengthError] = useState(""); // 비밀번호 유효성 오류 메시지
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [birthError, setBirthError] = useState(""); // 생년월일 오류 메시지
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

  // 아이디 유효성 검사
  useEffect(() => {
    const idPattern = /^[A-Za-z0-9]{6,20}$/;

    if (formData.userId === "") {
      setUserIdError(""); // 입력이 없을 경우 오류 메시지 초기화
      setIsUserIdValid(false);
    } else if (!idPattern.test(formData.userId)) {
      setUserIdError("아이디는 6~20자의 영문과 숫자로만 입력할 수 있습니다.");
      setIsUserIdValid(false);
    } else {
      setUserIdError("");
      setIsUserIdValid(true);
    }
  }, [formData.userId]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    if (!passwordPattern.test(formData.userPassword)) {
    } else {
      setPasswordStrengthError("");
    }
  }, [formData.userPassword]);

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    if (formData.userPassword !== formData.userPasswordConfirm) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  }, [formData.userPassword, formData.userPasswordConfirm]);

  // 아이디 중복 확인 함수
  const checkUserIdAvailability = async () => {
    const { userId } = formData;
    if (userId.length > 0) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/check-user-id?userId=${userId}`);
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
    // 생년월일 유효성 검사 (만 26세 이상)
    const calculateAge = (birthDate) => {
      const today = new Date();
      const birth = new Date(birthDate);
      const age = today.getFullYear() - birth.getFullYear();
      const month = today.getMonth() - birth.getMonth();
      const day = today.getDate() - birth.getDate();

      if (month < 0 || (month === 0 && day < 0)) {
        return age - 1;
      }
      return age;
    };

    if (formData.userBirth) {
      const age = calculateAge(formData.userBirth);
      if (age < 26) {
        setBirthError("만 26세 이상만 가입할 수 있습니다.");
        setFormData({ ...formData, userBirth: "" });
      } else {
        setBirthError("");
      }
    }
  }, [formData.userBirth]);

  useEffect(() => {
    // 모든 필드가 비어있지 않은지 확인
    const isValid =
      formData.userId &&
      formData.userPassword &&
      formData.userPasswordConfirm &&
      formData.userName &&
      formData.userEmail &&
      formData.userPhone &&
      formData.userGender &&
      formData.userBirth &&
      formData.userAddress &&
      formData.userAddressDetail &&
      passwordError === "" &&  // 비밀번호가 일치하는 경우만 활성화
      isUserIdAvailable; // 아이디 중복 확인이 통과되었을 때만 활성화

    setIsFormValid(isValid); // 아이디 중복 확인과 비밀번호 일치를 모두 만족할 때만 활성화
  }, [formData, isUserIdAvailable, passwordError]); // formData, isUserIdAvailable, passwordError가 변경될 때마다 유효성 검사

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idRegex = /^[a-zA-Z0-9]{6,20}$/; // 아이디 유효성 검사 정규식
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/; // 비밀번호 유효성 검사 정규식

    // 아이디 유효성 검사
    if (!idRegex.test(formData.userId)) {
      alert("아이디는 6~20자의 영문 또는 숫자로만 입력해야 합니다.");
      return;
    }

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(formData.userPassword)) {
      alert("비밀번호는 8~12자의 영문, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    // 비밀번호 확인 일치 여부
    if (formData.userPassword !== formData.userPasswordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 아이디 중복 확인 여부
    if (!isUserIdAvailable) {
      alert("이미 사용 중인 아이디입니다. 다른 아이디를 선택해주세요.");
      return;
    }

    // 모든 필드가 채워졌는지 확인
    if (
      !formData.userName ||
      !formData.userEmail ||
      !formData.userPhone ||
      !formData.userBirth ||
      !formData.userAddress ||
      !formData.userAddressDetail
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    // 주소 합치기
    const fullAddress = formData.userAddress + " " + formData.userAddressDetail;

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userAddress: fullAddress, // 합쳐진 주소 전송
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
      alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
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
            <div className={style.textAreaCont}>
              <span className={style.inputName}>아이디</span>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""); // 한글 제거
                }}
                required
                placeholder="6~20자 영문, 숫자"
              />
              <button className={style.checkBtn} disabled={!isUserIdValid} onClick={checkUserIdAvailability}>중복 확인</button>
              {/* <button className={style.inputBtn} type="button" onClick={checkUserIdAvailability}>중복검사</button> */}
            </div>
            {userIdError && <p className={style.errorMessage}>{userIdError}</p>}
            {!isUserIdAvailable && <p className={style.errorMessage}>{errorMessage}</p>}
            {isUserIdAvailable && successMessage && <p className={style.successMessage}>{successMessage}</p>}
          </label>

          <label className={style.textArea}>
            <span className={style.inputName}>비밀번호</span>
            <input
              type="password"
              name="userPassword"
              placeholder="8~12자 영문, 숫자, 특수문자"
              onChange={handleChange}
              required
            />
            {passwordStrengthError && <p className={style.errorMessage}>{passwordStrengthError}</p>}
          </label>


          <label className={style.textAreaId}>
            <div className={style.textAreaCont}>
              <span className={style.inputName}>비밀번호 확인</span>
              <input
                type="password"
                name="userPasswordConfirm"
                placeholder="비밀번호 확인"
                onChange={handleChange}
                required
              />
            </div>
            {passwordError && <p className={style.errorMessage}>{passwordError}</p>} {/* 비밀번호 불일치 시 에러 메시지 */}
          </label>

          <label className={style.textArea}>
            <span className={style.inputName}>이름</span>
            <input
              type="text"
              name="userName"
              placeholder="이름"
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""); // 한글 이외의 문자 제거
              }}
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
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""); // 한글 제거
              }}
              required
            />
            <br />
          </label>

          <label className={style.textArea}>
            <span className={style.inputName}>전화번호</span>
            <input
              type="text"
              name="userPhone"
              maxLength="12"
              pattern="[0-9]{1,12}"
              placeholder="-를 제외한 숫자만 입력"
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 12);
              }}
              required
            />
            <br />
          </label>

          <label className={style.textAreaId}>
            <div className={style.textAreaCont}>
              <span className={style.inputName}>생년월일</span>
              <input
                type="date"
                name="userBirth"
                onChange={handleChange}
                value={formData.userBirth} // 입력값을 formData로 연결
                required
              />
            </div>
            {birthError && <p className={style.errorMessage}>{birthError}</p>}
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
              readOnly
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
