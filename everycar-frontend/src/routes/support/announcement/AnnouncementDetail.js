import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../../css/routes/support/announcement/AnnouncementDetail.css";

const announcements = [
  { id: 1, title: "서비스 점검 안내", date: "2025-03-10", category: "공지", content: "서버 점검이 2025-03-15에 진행될 예정입니다. 이용에 참고 부탁드립니다." },
  { id: 2, title: "새로운 기능 업데이트", date: "2025-03-08", category: "업데이트", content: "새로운 기능이 추가되었습니다. 더욱 편리한 서비스 이용이 가능합니다." },
  { id: 3, title: "이벤트 공지", date: "2025-03-05", category: "이벤트", content: "3월 특별 이벤트가 진행됩니다. 많은 관심 부탁드립니다!" },
  { id: 4, title: "시스템 유지보수 일정", date: "2025-03-02", category: "공지", content: "시스템 유지보수가 예정되어 있습니다. 서비스 이용에 참고 바랍니다." },
];

function AnnouncementDetail() {
  const { id } = useParams();
  console.log("Announcement ID:", id);
  const announcement = announcements.find((item) => item.id === parseInt(id));

  if (!announcement) {
    return <p className="notice-not-found">공지사항을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="notice-detail-container">
      <div className="notice-detail-meta">
        <span className="notice-detail-nav">공지사항</span>
        <h1 className="notice-detail-title">{announcement.title}</h1>
        <span className="notice-detail-date">{announcement.date}</span>
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
