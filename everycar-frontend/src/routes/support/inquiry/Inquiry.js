import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../css/routes/support/inquiry/Inquiry.css";

function Inquiry() {
  const [inquiries, setInquiries] = useState([]); // 문의사항 목록
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

  // 문의사항 목록 가져오기
  const fetchInquiries = (page = 1) => {
    axios
      .get(`http://localhost:8080/api/inquiry?page=${page}&size=${pageInfo.size}`)
      .then((response) => {
        const data = response.data;

        const formattedData = data.items.map((inquiry) => {
          // 날짜 필드가 inquiries_q_created_at이라면
          const utcDate = new Date(inquiry.inquiries_q_created_at);
        
          let formattedDate = "Invalid Date";
          if (!isNaN(utcDate.getTime())) {
            formattedDate = utcDate.toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // 24시간 형식
            });
          }
        
          return { ...inquiry, inquiriesQCreatedAt: formattedDate };
        });
        
        setInquiries(formattedData);

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
        console.error("Error fetching inquiry:", error);
      });
  };

  // 초기 데이터 불러오기
  useEffect(() => {
    fetchInquiries(1);
  }, []);

  return (
    <div className="inquiry-container">
      <h2 className="inquiry-title">문의사항</h2>

      <ul className="inquiry-list">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <Link
              key={inquiry.inquiries_num} // inquiries_num을 키로 사용
              to={`/support/inquiryDetail/${inquiry.inquiries_num}`} // 문의사항 상세보기 링크
              className="inquiry-link"
            >
              <li className="inquiry-item">
                <div>
                  <span className="inquiry-item-num">{inquiry.inquiries_num}</span>
                  <span className="inquiry-text">{inquiry.inquiries_q}</span> {/* 문의 내용 */}
                  {/* 답변여부 확인 */}
                  {inquiry.inquiries_a ? (
                    <span className="inquiry-item-tag">답변완료</span>
                  ) : null}
                </div>
                  <p className="inquiry-meta">{inquiry.inquiriesQCreatedAt}</p> {/* 생성일자 */}
              </li>
            </Link>
          ))
        ) : (
          <p className="no-list">문의사항이 없습니다.</p>
        )}
      </ul>

      {/* 문의사항 작성하기 버튼 */}
      <div className="inquiry-button-container">
        <Link to="/support/inquiryCreate" className="create-inquiry-button">
          문의사항 작성하기
        </Link>
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        {/* 이전 버튼 */}
        {pageInfo.prev && (
          <button
            className="page-button"
            onClick={() => fetchInquiries(pageInfo.page - 1)}
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
              onClick={() => fetchInquiries(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* 다음 버튼 */}
        {pageInfo.next && (
          <button
            className="page-button"
            onClick={() => fetchInquiries(pageInfo.page + 1)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default Inquiry;
