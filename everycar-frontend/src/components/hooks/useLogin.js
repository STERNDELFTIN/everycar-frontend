import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const login = async (userId, userPassword) => {
        try {
            const loginData = { userId, userPassword };

            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('로그인 실패');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // JWT 토큰 저장

            // 유저 정보 가져오기
            const userResponse = await fetch('http://localhost:8080/api/user/mypage', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!userResponse.ok) {
                throw new Error('유저 정보 불러오기 실패');
            }

            const userData = await userResponse.json();
            dispatch(setUserInfo(userData)); // Redux에 저장
            window.dispatchEvent(new Event('loginStateChange')); // 로그인 상태 변경 이벤트 트리거

            alert('로그인 성공!');
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            console.error(error.message);
            setErrorMessage('아이디 또는 비밀번호가 틀렸습니다.');
        }
    };

    return { login, errorMessage };
};

export default useLogin;
