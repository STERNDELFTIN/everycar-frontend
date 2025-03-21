import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from '../../../components/hooks/useUserInfo';
import "../../../css/routes/support/inquiry/InquiryCreate.css";

function InquiryCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        inquiries_q: "", // 질문 내용
    });

    // 유저 정보 가져오기
    const { loading, userInfo } = useUserInfo();
    

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

        if (!formData.inquiries_q.trim()) {
            alert("질문 내용을 입력해주세요.");
            return;
        }

        const token = localStorage.getItem('accessToken');

        // userNum을 formData에 추가
        const requestData = {
            ...formData,
            userNum: userInfo.userNum,  // userInfo에서 userNum을 가져와서 추가
        };

        // console.log(requestData);
        // fetch로 POST 요청 보내기
        fetch("http://localhost:8080/api/inquiry", {
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


    return (
        <div className="inquiry-create-container">
            <h2 className="inquiry-create-title">문의 작성하기</h2>

            <form onSubmit={handleSubmit} className="inquiry-form">
                <input type="hidden" value={userInfo.userNum}></input>
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
