import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../css/routes/support/inquiry/InquiryDetail.css";

function InquiryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState(null);

    useEffect(() => {
        if (!id) return;

        axios
            .get(`http://localhost:8080/api/inquiry/${id}`)
            .then((response) => {
                console.log("문의 상세 데이터:", response.data);
                setInquiry(response.data);
            })
            .catch((error) => {
                console.error("Error fetching inquiry detail:", error);
            });
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios
                .delete(`http://localhost:8080/api/inquiry/${id}`)
                .then(() => {
                    alert("삭제되었습니다.");
                    navigate("/support/inquiry");
                })
                .catch((error) => {
                    console.error("Error deleting inquiry:", error);
                });
        }
    };

    if (!inquiry) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="inquiry-detail-container">
            <h2 className="inquiry-detail-title">문의사항 상세</h2>

            <div className="inquiry-content">
                <h3>질문</h3>
                <p className="inquiry-question">{inquiry.inquiries_q}</p>
                <p className="inquiry-meta">작성일: {inquiry.inquiries_q_created_at}</p>
            </div>

            <div className="inquiry-answer">
                <h3>답변</h3>
                {inquiry.inquiries_a ? (
                    <p className="inquiry-answer-text">{inquiry.inquiries_a}</p>
                ) : (
                    <p className="no-answer">답변이 아직 없습니다.</p>
                )}
            </div>

            {/* 버튼 영역 */}
            <div className="inquiry-buttons">
                <div className="left-buttons">
                    <button className="back-button" onClick={() => navigate("/support/inquiry")}>
                        목록으로 돌아가기
                    </button>
                </div>
                <div className="right-buttons">
                    <button
                        className="edit-button"
                        onClick={() => navigate(`/support/inquiryModify/${id}`)}
                    >
                        수정
                    </button>
                    <button className="delete-button" onClick={handleDelete}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InquiryDetail;
