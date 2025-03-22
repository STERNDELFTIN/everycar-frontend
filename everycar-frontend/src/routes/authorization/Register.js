import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../css/routes/authorization/Register.module.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    userId: "",
    userPassword: "",
    userPasswordConfirm: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userGender: 1,
    userBirth: "",
    userAddress: "",
    userAddressDetail: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordStrengthError, setPasswordStrengthError] = useState("");
  const [nameError, setNameError] = useState(""); // 이름 오류 메시지
  const [phoneError, setPhoneError] = useState(""); // 전화번호 오류 메시지
  const [birthError, setBirthError] = useState(""); // 생년월일 오류 메시지
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      window.daum = window.daum || {};
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
    if (!idPattern.test(formData.userId)) {
      setUserIdError("아이디는 6~20자의 영문 또는 숫자로만 입력해야 합니다.");
    } else {
      setUserIdError("");
    }
  }, [formData.userId]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    if (!passwordPattern.test(formData.userPassword)) {
      setPasswordStrengthError("비밀번호는 8~12자의 영문, 숫자, 특수문자를 포함해야 합니다.");
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

  // 이름 유효성 검사 (특수문자, 숫자 금지)
  useEffect(() => {
    const namePattern = /^[가-힣a-zA-Z]+$/; // 한글, 영문만 허용
    if (!namePattern.test(formData.userName)) {
      setNameError("이름에는 특수문자나 숫자가 포함될 수 없습니다.");
    } else {
      setNameError("");
    }
  }, [formData.userName]);

  // 전화번호 유효성 검사 (숫자만 입력 가능)
  useEffect(() => {
    const phonePattern = /^[0-9]*$/; // 숫자만 허용
    if (!phonePattern.test(formData.userPhone)) {
      setPhoneError("전화번호는 숫자만 입력 가능합니다.");
    } else {
      setPhoneError("");
    }
  }, [formData.userPhone]);

  // 생년월일 유효성 검사 (26세 이상)
  useEffect(() => {
    const birthDate = new Date(formData.userBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    const dayDiff = currentDate.getDate() - birthDate.getDate();
    if (age < 26 || (age === 26 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      setBirthError("만 26세 이상만 가입 가능합니다.");
    } else {
      setBirthError("");
    }
  }, [formData.userBirth]);

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
          setSuccessMessage("");
        } else {
          setIsUserIdAvailable(true);
          setErrorMessage("");
          setSuccessMessage("사용 가능한 아이디입니다.");
        }
      } catch (error) {
        console.error("아이디 중복 확인 오류:", error);
      }
    } else {
      setIsUserIdAvailable(false);
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
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
      passwordError === "" &&
      isUserIdAvailable &&
      nameError === "" &&
      phoneError === "" &&
      birthError === "";

    setIsFormValid(isValid);
  }, [formData, isUserIdAvailable, passwordError, nameError, phoneError, birthError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userIdError || passwordStrengthError || nameError || phoneError || birthError) {
      alert("유효성 검사 오류가 있습니다. 확인 후 다시 시도해주세요.");
      return;
    }

    const fullAddress = formData.userAddress + " " + formData.userAddressDetail;

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userAddress: fullAddress,
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

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setFormData({
          ...formData,
          userAddress: data.roadAddress,
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
            <div className={style.inputArea}>
              <span className={style.inputName}>아이디</span>
              <div className={style.inputText}>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                  placeholder="6~20자 영문, 숫자"
                />
                <button className={style.inputBtn} type="button" onClick={checkUserIdAvailability}>중복검사</button>
              </div>
            </div>
            {userIdError && <p className={style.errorMessage}>{userIdError}</p>}
            {!isUserIdAvailable && <p className={style.errorMessage}>{errorMessage}</p>}
            {isUserIdAvailable && successMessage && <p className={style.successMessage}>{successMessage}</p>}
          </label>

          <label className={style.textArea}>
            <div className={style.inputArea}>
              <span className={style.inputName}>비밀번호</span>
              <input
                type="password"
                className={style.inputText}
                name="userPassword"
                placeholder="8~12자 영문, 숫자, 특수문자"
                onChange={handleChange}
                required
              />
            </div>
            {passwordStrengthError && <p className={style.errorMessage}>{passwordStrengthError}</p>}
          </label>

          <label className={style.textArea}>
            <div className={style.inputArea}>
              <span className={style.inputName}>비밀번호 확인</span>
              <input
                type="password"
                name="userPasswordConfirm"
                className={style.inputText}
                placeholder="비밀번호 확인"
                onChange={handleChange}
                required
              />
            </div>
            {passwordError && <p className={style.errorMessage}>{passwordError}</p>}
          </label>

          <label className={style.textArea}>
            <div className={style.inputArea}>
              <span className={style.inputName}>이름</span>
              <input
                type="text"
                className={style.inputText}
                name="userName"
                placeholder="이름"
                onChange={handleChange}
                required
              />
            </div>
            {nameError && <p className={style.errorMessage}>{nameError}</p>}
          </label>

          <label className={style.textArea}>
            <div className={style.inputArea}>
              <span className={style.inputName}>전화번호</span>
              <input
                type="text"
                className={style.inputText}
                name="userPhone"
                placeholder="-를 제외한 숫자만 입력"
                onChange={handleChange}
                required
              />
            </div>
            {phoneError && <p className={style.errorMessage}>{phoneError}</p>}
          </label>

          <label className={style.textArea}>
            <div className={style.inputArea}>
              <span className={style.inputName}>생년월일</span>
              <input
                type="date"
                className={style.inputText}
                name="userBirth"
                onChange={handleChange}
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
            <div className={style.inputArea}>
              <span className={style.inputName}>주소</span>
              <div className={style.inputText}>
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
                  주소검색
                </button>
              </div>
            </div>
          </label>

          <label className={style.textArea}>
            <div className={style.inputArea}>
              <span className={style.inputName}>상세주소</span>
              <input
                type="text"
                className={style.inputText}
                name="userAddressDetail"
                placeholder="상세주소"
                value={formData.userAddressDetail}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <button
            type="submit"
            className={`${style.submitBtn} ${isFormValid ? style.activeBtn : style.disabledBtn}`}
            disabled={!isFormValid}
          >
            가입완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
