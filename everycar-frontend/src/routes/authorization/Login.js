import React, { useState } from 'react';

import useLogin from '../../components/hooks/useLogin';

const Login = () => {
  const { login, errorMessage } = useLogin(); // 커스텀 훅 사용
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userId, userPassword); // 로그인 실행
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">아이디:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        /><br />

        <label htmlFor="userPassword">비밀번호:</label>
        <input
          type="password"
          id="userPassword"
          name="userPassword"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        /><br />

        <button type="submit">로그인</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
