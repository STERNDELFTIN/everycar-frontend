import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../css/routes/support/event/sEvent.css"; // 수정된 CSS 파일 경로

// 더미 이벤트 데이터 생성
const dummyEvents = Array.from({ length: 25 }, (_, i) => {
  const startDate = new Date(2025, 0, i + 1); // 1월 1일부터 시작
  const endDate = new Date(2025, 6, (i % 30) + 1); // 7월부터 종료

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // 1 -> 01, 9 -> 09
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 1 -> 01, 9 -> 09
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return {
    id: i + 1,
    title: `이벤트 제목 ${i + 1}`,
    startDate: formatDate(startDate), // '2025-01-01' 형식으로 변환
    endDate: formatDate(endDate), // '2025-07-01' 형식으로 변환
    createdAt: formatDate(new Date(2025, 1, i + 1)), // 생성일자
  };
});

function Event() {
  const [events, setEvents] = useState(dummyEvents);
  const [pageInfo, setPageInfo] = useState({
    page: 1, // 현재 페이지
    size: 10, // 한 페이지에 보여줄 개수
    totalPages: Math.ceil(dummyEvents.length / 10), // 전체 페이지 수
    totalElements: dummyEvents.length, // 전체 항목 수
    pageGroupSize: 5, // 페이지 그룹 크기
    start: 1, // 시작 페이지 번호
    end: Math.ceil(dummyEvents.length / 10), // 끝 페이지 번호
    prev: false, // 이전 버튼 활성화 여부
    next: true, // 다음 버튼 활성화 여부
  });

  // 페이지 번호 변경 시 호출되는 함수
  const fetchEvents = (page = 1) => {
    const startIndex = (page - 1) * pageInfo.size;
    const selectedEvents = dummyEvents.slice(startIndex, startIndex + pageInfo.size);

    setEvents(selectedEvents);
    setPageInfo((prev) => ({
      ...prev,
      page,
      prev: page > 1,
      next: page < pageInfo.totalPages,
    }));
  };

  // 페이지네이션 업데이트
  useEffect(() => {
    fetchEvents(1);
  }, []);

  return (
    <div className="sEvent-container">
      <h2 className="sEvent-title">이벤트</h2>

      <ul className="sEvent-list">
        {events.length > 0 ? (
          events.map((event) => (
            <Link
              key={event.id}
              to={`/support/eventDetail/${event.id}`}
              className="sEvent-link"
            >
              <li className="sEvent-item">
                <div>
                  <span className="sEvent-item-tag">이벤트 {event.id}</span>
                  {event.title}
                </div>
                <div>
                  <p className="sEvent-meta">{event.startDate} ~ {event.endDate}</p>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <p className="no-events">이벤트가 없습니다.</p>
        )}
      </ul>

      {/* 페이지네이션 */}
      <div className="pagination">
        {/* 이전 버튼 */}
        {pageInfo.prev && (
          <button
            className="page-button"
            onClick={() => fetchEvents(pageInfo.page - 1)}
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
              onClick={() => fetchEvents(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* 다음 버튼 */}
        {pageInfo.next && (
          <button
            className="page-button"
            onClick={() => fetchEvents(pageInfo.page + 1)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default Event;
