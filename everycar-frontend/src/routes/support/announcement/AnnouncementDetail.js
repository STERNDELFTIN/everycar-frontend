import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../css/routes/support/announcement/AnnouncementDetail.css";

function AnnouncementDetail() {
  const { id } = useParams(); // URL에서 ID 파라미터 가져오기
  const [announcement, setAnnouncements] = useState(null);

  useEffect(() => {
    // API를 통해 특정 ID의 게시글을 불러옴
    axios
      .get(`http://localhost:8080/api/posts/${id}`)
      .then((response) => {
        setAnnouncements(response.data); // 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]); // `id` 값이 바뀔 때마다 다시 호출

  if (!announcement) {
    return <p>Loading...</p>; // 데이터 로딩 중일 때
  }

  return (
    <div className="notice-detail-container">
      <div className="notice-detail-meta">
        <span className="notice-detail-nav">공지사항</span>
        <h1 className="notice-detail-title">{announcement.title}</h1>
        <span className="notice-detail-date">{announcement.created_at}</span>
      </div>
      <div className="notice-detail-content">
        <p>{announcement.content}</p>
      </div>
      <div className="back-button">
        <Link to="/support/announcement" className="back-link">목록으로 돌아가기</Link>
      </div>
    </div>
  );
}

export default AnnouncementDetail;
