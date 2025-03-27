import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from '../../../components/hooks/useUserInfo';
import "../../../css/routes/support/inquiry/InquiryCreate.css";

function InquiryCreate() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        inquiries_q: "", // 질문 내용
    });

    // 유저 정보 가져오기
    const { loading, userInfo } = useUserInfo();

    useEffect(() => {
        if (!loading && (!userInfo || userInfo.user_num === 0 || userInfo.user_num === undefined)) {
            // 로그인하지 않은 상태이거나 user_num이 0이거나 undefined인 경우
            alert("로그인 후 이용해주세요.");
            navigate("/auth/login"); // 로그인 페이지로 이동
        }
    }, [loading, userInfo, navigate]);

    useEffect(() => {
        // 페이지가 로드될 때마다 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
    }, []);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 문의 등록 요청
    const handleSubmit = (e) => {
        e.preventDefault();

        // user_num이 0이거나 undefined인 경우 글을 작성할 수 없도록 막기
        if (!userInfo || userInfo.user_num === 0 || userInfo.user_num === undefined) {
            alert("로그인 후 글을 작성할 수 있습니다.");
            navigate("/auth/login"); // 로그인 페이지로 이동
            return;
        }

        if (!formData.inquiries_q.trim()) {
            alert("질문 내용을 입력해주세요.");
            return;
        }

        const token = localStorage.getItem('accessToken');

        // userNum을 formData에 추가
        const requestData = {
            ...formData,
            userNum: userInfo.user_num,  // user_num으로 직접 접근
        };

        // fetch로 POST 요청 보내기
        fetch(`${API_BASE_URL}/api/inquiry`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),  // 변경된 requestData로 body 설정
        })
            .then((response) => {
                if (response.ok) {
                    alert("문의가 등록되었습니다.");
                    navigate("/support/inquiry"); // 목록 페이지로 이동
                } else {
                    return Promise.reject("문의 등록 실패");
                }
            })
            .catch((error) => {
                console.error("Error creating inquiry:", error);
            });
    };

    // 로그인 여부 확인 (로딩 중일 경우 표시)
    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중일 때 표시
    }

    // 로그인된 사용자만 폼을 볼 수 있도록 처리
    if (!userInfo || userInfo.user_num === 0 || userInfo.user_num === undefined) {
        return <div>로그인 후 이용해주세요.</div>; // 로그인되지 않으면 접근 차단
    }

    return (
        <div className="inquiry-create-container">
            <h2 className="inquiry-create-title">문의 작성하기</h2>

            <form onSubmit={handleSubmit} className="inquiry-form">
                <input type="hidden" value={userInfo.user_num}></input>
                <div className="form-group">
                    <label htmlFor="inquiries_q">문의 내용</label>
                    <textarea
                        id="inquiries_q"
                        name="inquiries_q"
                        value={formData.inquiries_q}
                        onChange={handleChange}
                        placeholder="문의 내용을 입력하세요..."
                        required
                    />
                </div>

                <div className="form-buttons">
                    <button type="button" className="cancel-button" onClick={() => navigate("/support/inquiry")}>
                        취소
                    </button>
                    <button type="submit" className="submit-button">
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InquiryCreate;