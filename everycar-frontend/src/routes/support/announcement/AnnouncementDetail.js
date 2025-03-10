import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../css/routes/support/announcement/AnnouncementDetail.css";

function AnnouncementDetail() {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [announcement, setAnnouncement] = useState(null);
  const baseURL = "http://localhost:8080"; // 백엔드 URL

  useEffect(() => {
    // 공지사항 데이터 가져오기
    axios
      .get(`${baseURL}/api/posts/${id}`)
      .then((response) => {
        let content = response.data.content;

        // content 내 이미지 경로를 절대 경로로 변환
        content = content.replace(/src="\/images/g, `src="${baseURL}/images`);

        // 날짜 변환 (ISO 8601 → 한국 날짜 YYYY-MM-DD 형식)
        const utcDate = new Date(response.data.createdAt);
        const koreaDate = utcDate.toLocaleDateString("ko-KR");

        setAnnouncement({ ...response.data, content, createdAt: koreaDate });
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    // jQuery 및 Summernote 스크립트 추가
    const scriptJQuery = document.createElement("script");
    scriptJQuery.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    scriptJQuery.async = true;
    document.body.appendChild(scriptJQuery);

    const scriptSummernote = document.createElement("script");
    scriptSummernote.src =
      "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-lite.min.js";
    scriptSummernote.async = true;
    document.body.appendChild(scriptSummernote);

    const linkSummernote = document.createElement("link");
    linkSummernote.rel = "stylesheet";
    linkSummernote.href =
      "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-lite.min.css";
    document.head.appendChild(linkSummernote);

    // Summernote 초기화 (읽기 전용)
    scriptSummernote.onload = () => {
      if (window.$) {
        window.$("#summernote").summernote({
          height: 300,
          toolbar: false, // 툴바 제거
          airMode: false, // 에디터 기능 비활성화
          disableResizeEditor: true, // 크기 조절 비활성화
          codeViewFilter: false,
          codeViewIframeFilter: false,
        });
      }
    };

    // 언마운트 시 정리
    return () => {
      document.body.removeChild(scriptJQuery);
      document.body.removeChild(scriptSummernote);
      document.head.removeChild(linkSummernote);
    };
  }, [id]);

  if (!announcement) {
    return <p>Loading...</p>;
  }

  return (
    <div className="notice-detail-container">
      <div className="notice-detail-meta">
        <span className="notice-detail-nav">공지사항</span>
        <h1 className="notice-detail-title">{announcement.title}</h1>
        <span className="notice-detail-date">{announcement.createdAt}</span>
      </div>
      <div className="notice-detail-content">
        <div
          id="summernote"
          dangerouslySetInnerHTML={{ __html: announcement.content }}
        />
      </div>
      <div className="back-button">
        <Link to="/support/announcement" className="back-link">
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default AnnouncementDetail;
