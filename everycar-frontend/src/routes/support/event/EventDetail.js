import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../css/routes/support/event/sEventDetail.css"; // 상세 페이지 CSS

// 더미 데이터
const dummyEventDetails = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `이벤트 제목 ${i + 1}`,
  startDate: `2025-01-${String((i % 30) + 1).padStart(2, '0')}`,
  endDate: `2025-07-${String((i % 30) + 1).padStart(2, '0')}`,
  description: `이벤트 ${i + 1}의 상세 설명입니다. 이벤트가 시작되면 다양한 활동과 혜택이 주어집니다.`,
  createdAt: `2025-02-${String((i % 28) + 1).padStart(2, '0')}`,
}));

function EventDetail() {
  const { id } = useParams(); // URL 파라미터에서 이벤트 ID 가져오기
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const eventDetail = dummyEventDetails.find((event) => event.id === parseInt(id));
    setEvent(eventDetail);
  }, [id]);

  if (!event) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="sEvent-detail-container">
      <div className="sEvent-detail-info">
      <h2 className="sEvent-detail-title">{event.title}</h2>
        <p className="sEvent-detail-date">
          {event.startDate} ~ {event.endDate}
        </p>
        <p className="sEvent-detail-description">{event.description}</p>
      </div>
      <div>
      <p className="sEvent-detail-created-at">작성일: {event.createdAt}</p>
      </div>
    </div>
  );
}

export default EventDetail;
