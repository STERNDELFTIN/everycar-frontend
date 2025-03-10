import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../css/routes/support/announcement/Announcement.css";

function Announcement() {

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then((response) => {
        console.log("Fetched posts:", response.data); // 서버에서 받은 데이터 출력
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

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
                <p className="notice-meta">{announcement.createdAt}</p>
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
