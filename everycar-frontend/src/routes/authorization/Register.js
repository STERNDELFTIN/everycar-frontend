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
  });

  const [isFormValid, setIsFormValid] = useState(false); // 버튼 활성화 여부
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      formData.userAddress;

    setIsFormValid(isValid); // 모든 필드가 채워지면 활성화
  }, [formData]); // formData가 변경될 때마다 유효성 검사

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  return (
    <div className={style.registerCont}>
      <div className={style.inputCont}>

        <h2>정보 입력</h2>
        <form onSubmit={handleSubmit}>
          <label className={style.textArea}>
            <p>아이디</p>
            <input
              type="text"
              name="userId"
              placeholder="아이디"
              onChange={handleChange}
              required
            />
            <br />
          </label>

          <label className={style.textArea}>
            <p>비밀번호</p>
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
            <p>이름</p>
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
            <p>이메일</p>
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
            <p>전화번호</p>
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
            <p>생년월일</p>
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
            <p>주소</p>
            <input
              type="text"
              name="userAddress"
              placeholder="주소"
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
