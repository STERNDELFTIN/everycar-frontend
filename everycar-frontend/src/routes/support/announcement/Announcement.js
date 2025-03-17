import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../css/routes/support/announcement/Announcement.css";

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1, // 현재 페이지
    size: 10, // 한 페이지에 보여줄 개수
    totalPages: 1, // 전체 페이지 수
    totalElements: 0, // 전체 항목 수
    pageGroupSize: 5, // 페이지 그룹 크기
    start: 1, // 시작 페이지 번호
    end: 1, // 끝 페이지 번호
    prev: false, // 이전 버튼 활성화 여부
    next: false, // 다음 버튼 활성화 여부
  });

  // 🔹 공지사항 목록 가져오기
  const fetchAnnouncements = (page = 1) => {
    axios
      .get(`http://localhost:8080/api/posts?page=${page}&size=${pageInfo.size}`)
      .then((response) => {
        const data = response.data;

        console.log("Fetched posts:", data); // 서버 응답 확인

        // 날짜 변환 (ISO → YYYY-MM-DD)
        const formattedData = data.items.map((post) => {
          const utcDate = new Date(post.createdAt);
          const formattedDate = utcDate.toLocaleDateString("ko-KR");
          return { ...post, createdAt: formattedDate };
        });

        setAnnouncements(formattedData);

        // 페이지네이션 정보 업데이트
        setPageInfo({
          page: data.page,
          size: data.size,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageGroupSize: data.pageGroupSize,
          start: data.start,
          end: data.end,
          prev: data.prev,
          next: data.next,
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  // 초기 데이터 불러오기
  useEffect(() => {
    fetchAnnouncements(1);
  }, []);

  return (
    <div className="notice-container">
      <h2 className="notice-title">공지사항</h2>

      <ul className="notice-list">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Link
              key={announcement.id}
              to={`/support/announcementDetail/${announcement.id}`}
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
          ))
        ) : (
          <p className="no-list">공지사항이 없습니다.</p>
        )}
      </ul>

      {/* 페이지네이션 */}
      <div className="pagination">
        {/* 이전 버튼 */}
        {pageInfo.prev && (
          <button
            className="page-button"
            onClick={() => fetchAnnouncements(pageInfo.page - 1)}
          >
            &lt;
          </button>
        )}

        {/* 페이지 번호 */}
        {Array.from({ length: pageInfo.end - pageInfo.start + 1 }, (_, index) => {
          const pageNumber = pageInfo.start + index;
          return (
            <button
              key={pageNumber}
              className={`page-button ${pageNumber === pageInfo.page ? "active" : ""}`}
              onClick={() => fetchAnnouncements(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* 다음 버튼 */}
        {pageInfo.next && (
          <button
            className="page-button"
            onClick={() => fetchAnnouncements(pageInfo.page + 1)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default Announcement;
