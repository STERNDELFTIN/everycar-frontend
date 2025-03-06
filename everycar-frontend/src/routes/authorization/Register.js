import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        userId: '',
        userPassword: '',
        userName: '',
        userEmail: '',
        userPhone: '',
        userGender: 1, // 기본값: 여성
        userBirth: '',
        userAddress: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('회원가입 성공! 로그인 페이지로 이동합니다.');
                navigate('/auth/login');
            } else {
                alert('회원가입 실패! 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userId" placeholder="아이디" onChange={handleChange} required /><br />
                <input type="password" name="userPassword" placeholder="비밀번호" onChange={handleChange} required /><br />
                <input type="text" name="userName" placeholder="이름" onChange={handleChange} required /><br />
                <input type="email" name="userEmail" placeholder="이메일" onChange={handleChange} required /><br />
                <input type="text" name="userPhone" placeholder="전화번호" onChange={handleChange} required /><br />
                <label>
                    <input type="radio" name="userGender" value={1} checked={formData.userGender == 1} onChange={handleChange} /> 여성
                </label>
                <label>
                    <input type="radio" name="userGender" value={2} checked={formData.userGender == 2} onChange={handleChange} /> 남성
                </label><br />
                <input type="date" name="userBirth" onChange={handleChange} required /><br />
                <input type="text" name="userAddress" placeholder="주소" onChange={handleChange} required /><br />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Register;