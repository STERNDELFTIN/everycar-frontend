import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = { userId, userPassword };

        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) throw new Error('로그인 실패');
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token); // JWT 토큰 저장

            // Redux 상태 업데이트
            fetch('http://localhost:8080/api/user/mypage', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(userData => {
                dispatch(setUserInfo(userData)); // Redux에 저장
                window.dispatchEvent(new Event('loginStateChange')); // 로그인 상태 변경 이벤트 트리거
                alert('로그인 성공!');
                navigate('/'); // 메인 페이지로 이동
            })
            .catch(error => {
                console.error('유저 정보 불러오기 실패:', error);
                setErrorMessage('로그인은 성공했지만 사용자 정보를 불러오지 못했습니다.');
            });
        })
        .catch(error => {
            console.error('로그인 실패:', error);
            setErrorMessage('아이디 또는 비밀번호가 틀렸습니다.');
        });
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
