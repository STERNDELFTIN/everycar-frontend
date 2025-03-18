import React, { useState } from "react";

import useLogin from "../../components/hooks/useLogin";
import styles from "../../css/routes/authorization/login.module.scss";

const Login = () => {
  const { login, errorMessage } = useLogin(); // 커스텀 훅 사용
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userId, userPassword); // 로그인 실행
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.cont}>
        <h1 className={styles.title}>
          <img src="/logo.png" />
        </h1>
        <div className={styles.loginBody}>
          <form onSubmit={handleSubmit}>
            <label className={styles.idInput}>
              <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="#999" stroke-linecap="round" d="M7.789 9.867A4.444 4.444 0 0 1 12 4a4.444 4.444 0 1 1 0 8.885c-.947 0-1.945-.167-2.667-.672"></path><path fill="#999" d="M9.489 12.685a.5.5 0 1 0-.311-.95l.31.95Zm10.378 5.822.492-.088-.492.088ZM5.5 20.5h13v-1h-13v1Zm-.885-1.912c.463-2.81 2.293-5.058 4.874-5.903l-.311-.95c-2.965.97-5.031 3.545-5.55 6.69l.987.163Zm9.671-5.903c2.597.85 4.584 3.113 5.089 5.911l.984-.177c-.57-3.156-2.811-5.718-5.762-6.684l-.31.95ZM5.5 19.5c-.58 0-.96-.456-.885-.912l-.987-.163C3.434 19.603 4.423 20.5 5.5 20.5v-1Zm13 1c1.075 0 2.073-.898 1.86-2.081l-.985.177c.08.448-.293.904-.875.904v1Z"></path></svg>
              </i>
              <input
                
                type="text"
                id="userId"
                name="userId"
                value={userId}
                placeholder="아이디를 입력하세요"
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </label>
            <label className={styles.pwInput}>
              <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="#999" stroke-linecap="round" d="M19.5 15.6V11A1.5 1.5 0 0 0 18 9.5H6A1.5 1.5 0 0 0 4.5 11v8A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-.75"></path><circle cx="12" cy="14" r="1" fill="#999"></circle><path fill="#999" d="M11.5 14h1l.5 3h-2l.5-3Z" class="pathFill"></path><path stroke="#999" d="M16.5 9.5V8a4.5 4.5 0 0 0-9 0v1.5"></path></svg>
              </i>
              <input
                
                type="password"
                id="userPassword"
                name="userPassword"
                placeholder="비밀번호를 입력하세요"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
            </label>
            <br />

            <button type="submit" className={styles.button}>로그인</button>
          </form>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
