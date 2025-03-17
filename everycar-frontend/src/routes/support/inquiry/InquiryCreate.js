import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../css/routes/support/inquiry/InquiryCreate.css";

function InquiryCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        inquiries_q: "", // 질문 내용
    });

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

        axios
            .post("http://localhost:8080/api/inquiry", formData)
            .then(() => {
                alert("문의가 등록되었습니다.");
                navigate("/support/inquiry"); // 목록 페이지로 이동
            })
            .catch((error) => {
                console.error("Error creating inquiry:", error);
            });
    };

    return (
        <div className="inquiry-create-container">
            <h2 className="inquiry-create-title">문의 작성하기</h2>

            <form onSubmit={handleSubmit} className="inquiry-form">
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
