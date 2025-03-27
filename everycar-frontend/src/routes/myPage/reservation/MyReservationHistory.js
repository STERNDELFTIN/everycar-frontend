import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from '../../../css/routes/myPage/reservation/MyReservationHistory.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';
import ReservationHistoryBox from '../../../components/common/myPage/ReservationHistoryBox';

import CarNameMapper from "../../../components/common/CarNameMapper";

function MyReservationHistory() {
    const navigate = useNavigate(); // navigate 추가
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        if (!token) {
            // accessToken이 없으면 로그인 페이지로 이동
            navigate("/auth/login");
        }
    }, [token, navigate]);
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
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [quickReservations, setQuickReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        fetch(`${API_BASE_URL}/api/fast/reservations`, {
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
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [shortReservations, setShortReservations] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        // API로부터 단기 예약 데이터를 가져옴
        fetch(`${API_BASE_URL}/api/short/reservations`, {
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
                <p>사용자는 서비스 이용을 위해 필요한 최소한의 개인정보를 제공해야 하며, 제공된 정보는 서비스 제공 목적으로만 사용됩니다. 개인정보는 사용자의 동의 없이 제3자에게 제공되지 않으며, 법적 요구가 있을 경우에만 예외적으로 제공될 수 있습니다. 사용자는 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수 있으며, 이를 위해 마이페이지에서 관련 기능을 제공합니다. 개인정보 보호를 위해 암호화된 방식으로 저장되며, 안전한 접근이 가능하도록 보안 조치가 취해집니다. 개인정보는 일정 기간 후 자동으로 삭제되거나, 사용자가 요청할 경우 삭제가 가능합니다. 개인정보 처리와 관련된 문의는 고객센터나 해당 담당 부서로 연락하여 해결할 수 있습니다. 서비스 종료 후에도 일부 법적 의무를 위해 개인정보가 보존될 수 있습니다. 회사는 사용자의 개인정보 보호를 위해 지속적으로 보안 시스템을 점검하고 업데이트합니다. 본 방침은 변경될 수 있으며, 변경 시 사용자에게 공지됩니다.
                </p>
            </div>
        </div>
    );
}

export default MyReservationHistory;