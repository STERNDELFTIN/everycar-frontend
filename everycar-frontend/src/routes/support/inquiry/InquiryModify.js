import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserInfo from '../../../components/hooks/useUserInfo';
import "../../../css/routes/support/inquiry/InquiryModify.css";

function InquiryModify() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        inquiries_q: "", // 질문 내용
    });
    const { loading, userInfo } = useUserInfo();

    useEffect(() => {
        // 페이지가 로드될 때마다 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
    }, []);

    // 기존 데이터 불러오기
    useEffect(() => {
        fetch(`http://localhost:8080/api/inquiry/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({ inquiries_q: data.inquiries_q });
            })
            .catch((error) => {
                console.error("Error fetching inquiry data:", error);
            });
    }, [id]);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 문의 수정 요청
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.inquiries_q.trim()) {
            alert("질문 내용을 입력해주세요.");
            return;
        }

        const token = localStorage.getItem("accessToken"); // 토큰을 로컬스토리지에서 가져옴

        // POST 방식으로 수정 요청 보내기
        fetch(`http://localhost:8080/api/inquiry/${id}`, {
            method: "POST", // POST 방식으로 수정
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Authorization 헤더 추가
            },
            body: JSON.stringify(formData), // formData를 JSON으로 변환하여 보내기
        })
            .then((response) => {
                if (response.ok) {
                    alert("문의가 수정되었습니다.");
                    navigate(`/support/inquiryDetail/${id}`); // 수정 후 해당 상세 페이지로 이동
                } else {
                    return Promise.reject("문의 수정 실패");
                }
            })
            .catch((error) => {
                console.error("Error updating inquiry:", error);
            });
    };

    return (
        <div className="inquiry-modify-container">
            <h2 className="inquiry-modify-title">문의 수정하기</h2>

            <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-group">
                    <label htmlFor="inquiries_q">문의 내용 수정</label>
                    <textarea
                        id="inquiries_q"
                        name="inquiries_q"
                        value={formData.inquiries_q}
                        onChange={handleChange}
                        placeholder="문의 내용을 수정하세요..."
                        required
                    />
                </div>

                <div className="form-buttons">
                    <button type="button" className="cancel-button" onClick={() => navigate("/support/inquiry")}>
                        취소
                    </button>
                    <button type="submit" className="submit-button">
                        수정 완료
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InquiryModify;
