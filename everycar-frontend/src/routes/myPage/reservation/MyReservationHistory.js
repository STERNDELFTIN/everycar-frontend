import { useState, useEffect } from "react";

import styles from '../../../css/routes/myPage/reservation/MyReservationHistory.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';
import ReservationHistoryBox from '../../../components/common/myPage/ReservationHistoryBox';

import CarNameMapper from "../../../components/common/CarNameMapper";
import dummyData from '../../../dummyData/dummyData';

function MyReservationHistory() {
    return (
        <div className={styles.myReservationHistory}>
            <TopContent firstLocation='내예약내역' />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: vwFont(18, 30) }}>
                    <h2>내 예약 내역</h2>
                    <QuickReservationHistory />
                    <ShortReservationHistory />
                    <TermsOfUse />
                </div>
            </div>
        </div>
    );
}

// 빠른 예약 내역
function QuickReservationHistory() {
    const [quickReservations, setQuickReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        fetch("http://localhost:8080/api/fast/reservations", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log("Fetched Quick Reservations:", data);

                // API에서 받은 데이터를 변환
                const formattedReservations = data.map((res) => ({
                    ...res,
                    carName: res.modelName || "알 수 없음",
                    carImage: "https://example.com/ev6.png",
                    reservationStatus: getRentalStateText(res.rentalState),
                }));

                setQuickReservations(formattedReservations);
            })
            .catch(error => console.error("API 호출 오류:", error))
            .finally(() => setLoading(false));
    }, []);

    const getRentalStateText = (state) => {
        const stateMapping = {
            0: "결제대기",
            1: "결제완료",
            2: "이용중",
            3: "예약취소",
            4: "이용완료",
        };
        return stateMapping[state] || "알 수 없음";
    };

    return (
        <div>
            <h3>빠른 예약</h3>
            {loading ? (
                <p>로딩 중...</p>
            ) : quickReservations.length > 0 ? (
                quickReservations.map((reservation) => (
                    <ReservationHistoryBox
                        key={reservation.reservationId}
                        reservationStatus={reservation.reservationStatus}
                        carImage={`/images/main/car/${CarNameMapper(reservation.carName)}.png`}
                        carName={reservation.carName}
                        payment={reservation.payment}
                        startDate={reservation.rental_datetime?.split(" ")[0] || ""}
                        startTime={reservation.rental_datetime?.split(" ")[1] || ""}
                        endDate={reservation.return_datetime?.split(" ")[0] || ""}
                        endTime={reservation.return_datetime?.split(" ")[1] || ""}
                        rentPos={reservation.rentalLocationName || "미정"}
                        returnPos={reservation.returnLocationName || "미정"}
                        reservationType="fast"
                        reservationId={reservation.reservationId}
                    />
                ))
            ) : (
                <p>예약 내역이 없습니다.</p>
            )}
        </div>
    );
}

// 단기예약
function ShortReservationHistory() {
    const [shortReservations, setShortReservations] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        // API로부터 단기 예약 데이터를 가져옴
        fetch('http://localhost:8080/api/short/reservations', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                // console.log("Fetched Short Reservations:", data);

                const updatedReservations = data.map((res) => {
                    // carName과 carImage를 설정 (예시로 carId가 주어짐)
                    const car = { model_id: res.modelName, image_url: "https://example.com/sonata.png" };
                    const state = { state_name: res.rentalState === 0 ? '결제대기' : '이용중' };

                    return {
                        ...res,
                        carName: car.model_id,
                        carImage: car.image_url,
                        reservationStatus: getRentalStateText(res.rentalState),
                    };
                });
                setShortReservations(updatedReservations);
            })
            .catch(error => {
                console.error("예약 데이터를 불러오는 데 실패했습니다.", error);
            });
    }, []); // 빈 배열은 컴포넌트가 처음 렌더링 될 때만 실행되도록 함

    const getRentalStateText = (state) => {
        const stateMapping = {
            0: "결제대기",
            1: "결제완료",
            2: "이용중",
            3: "예약취소",
            4: "이용완료",
        };
        return stateMapping[state] || "알 수 없음";
    };
    
    return (
        <div>
            <h3>단기 예약</h3>
            {shortReservations.length > 0 ? (
                shortReservations.map((reservation) => (
                    <ReservationHistoryBox
                        key={reservation.reservationSId}
                        reservationStatus={reservation.reservationStatus}
                        carImage={`/images/main/car/${CarNameMapper(reservation.carName)}.png`}
                        carName={reservation.carName}
                        payment={reservation.payment}
                        startDate={reservation.reservation_s_start_date.split(" ")[0]}
                        startTime={reservation.reservation_s_start_date.split(" ")[1]}
                        endDate={reservation.reservation_s_end_date.split(" ")[0]}
                        endTime={reservation.reservation_s_end_date.split(" ")[1]}
                        rentPos={reservation.rentalLocationName}
                        returnPos={reservation.rentalLocationName}
                        reservationType="short"
                        reservationId={reservation.reservationSId}
                    />
                ))
            ) : (
                <p>예약 정보가 없습니다.</p>
            )}
        </div>
    );
}


// 이용약관
function TermsOfUse() {
    return (
        <div className={styles.termsOfUse}>
            <h6>이용약관</h6>
            <div>
                <p>이곳은 더미 텍스트입니다. 실제 콘텐츠가 들어갈 자리를 표시하기 위해 작성된 임시 문장입니다. 웹사이트 또는 애플리케이션 개발 과정에서 디자인을 확인하거나 레이아웃을 테스트할 때 활용됩니다. 이 문장은 의미 없는 일반적인 문구로, 사용자가 읽을 필요 없이 시각적인 균형을 맞추는 데 초점을 맞추고 있습니다. 필요한 경우 이 부분을 실제 콘텐츠로 교체하여 최종적인 형태를 완성할 수 있습니다.
                    <br /><br />
                    더미 텍스트는 프로젝트의 목적과 스타일에 따라 변경될 수 있습니다. 예를 들어, 뉴스 기사에서는 짧고 간결한 문장이 필요할 수도 있고, 블로그에서는 좀 더 부드럽고 자연스러운 흐름이 요구될 수도 있습니다. 따라서, 작업하는 콘텐츠 유형에 맞게 적절한 문장을 추가하는 것이 중요합니다. 이곳에 들어갈 내용이 준비되면 즉시 교체해 주세요.</p>
            </div>
        </div>
    );
}

export default MyReservationHistory;