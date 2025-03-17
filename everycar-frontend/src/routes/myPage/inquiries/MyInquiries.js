import { useState, useEffect } from "react";
import styles from "../../../css/routes/myPage/inquiries/MyInquiries.module.scss";
import { vwFont } from "../../../utils";
import TopContent from "../../../components/common/myPage/TopContent";
import ListContainer from "../../../components/common/myPage/ListContainer";

function MyInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const itemsPerPage = 10;
    const pageGroupSize = 5; // 페이지 그룹 사이즈 (예: 1, 2, 3, 4, 5)
    useEffect(() => {
        const fetchInquiries = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setError("로그인이 필요합니다.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/inquiries?page=${page}&size=${itemsPerPage}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("문의사항을 불러오는 데 실패했습니다.");
                }

                const data = await response.json();
                setInquiries(data.items); // 현재 페이지의 문의사항
                setTotalPages(data.totalPages); // 총 페이지 수
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchInquiries();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // 페이지 그룹 번호 계산
    const generatePageNumbers = () => {
        const startPage = Math.floor((page - 1) / pageGroupSize) * pageGroupSize + 1;
        const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
        const pageNumbers = [];

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className={styles.MyInquiries}>
            <TopContent firstLocation="내 예약 내역" />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: vwFont(18, 30) }}>
                    <h2>내 문의사항</h2>
                    <p className={styles.inquiriesInfo}>"내 문의사항" 페이지에는 사용자가 남긴 모든 문의사항을 확인할 수 있습니다. 답변은 영업일 기준 09:00~18:00에 순차적으로 처리되며, <br></br>긴급한 장애 관련 문의는 전화로 접수해 주시기 바랍니다. 또한, 욕설이나 서비스와 상관없는 내용의 문의는 관리자에 의해 비공개 처리될 수 있습니다.</p>
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <div className={styles.inquiries}>
                            <table className={styles.inquiriesTable}>
                                <colgroup>
                                    <col style={{ width: "3%" }} />
                                    <col style={{ width: "60%" }} />
                                    <col style={{ width: "20%" }} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>질문</th>
                                        <th>답변여부</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {inquiries.map((inquiry, index) => (
                                        <tr key={inquiry.inquiriesNum}>
                                            <td className={styles.inquiriesNum}>{index + 1}</td>  {/* 번호 추가 */}
                                            <td>{inquiry.inquiriesQ}</td>
                                            <td>
                                                {inquiry.inquiriesStatus === 1 ? "답변완료" : "미답변"}  {/* 조건에 따른 텍스트 표시 */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                                                
                            </table>

                            <div className={styles.pagination}>
                                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                                    이전
                                </button>
                                {/* 페이지 번호 */}
                                {generatePageNumbers().map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={page === pageNumber ? styles.active : ''}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                                    다음
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyInquiries;
