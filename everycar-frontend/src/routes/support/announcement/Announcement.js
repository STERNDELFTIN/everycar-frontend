import React from "react";
import { Link } from "react-router-dom";
import "../../../css/routes/support/announcement/Announcement.css";

const announcements = [
  { id: 1, title: "서비스 점검 안내", date: "2025-03-10", category: "공지" },
  { id: 2, title: "새로운 기능 업데이트", date: "2025-03-08", category: "업데이트" },
  { id: 3, title: "이벤트 공지", date: "2025-03-05", category: "이벤트" },
  { id: 4, title: "시스템 유지보수 일정", date: "2025-03-02", category: "공지" },
];

function Announcement() {
  return (
    <div className="notice-container">
      <h2 className="notice-title">공지사항</h2>

      <ul className="notice-list">
        {announcements.map((announcement) => (
          <Link
            key={announcement.id}
            to={`/support/announcementDetail/${announcement.id}`} // 링크 수정
            className="notice-link"
          >
            <li className="notice-item">
              <div>
                <span className="notice-item-span">공지사항</span>
                {announcement.title}
              </div>
              <div>
                <p className="notice-meta">{announcement.date}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      <div className="pagination">
        <button className="page-button">이전</button>
        <button className="page-button">다음</button>
      </div>
    </div>
  );
}

export default Announcement;
