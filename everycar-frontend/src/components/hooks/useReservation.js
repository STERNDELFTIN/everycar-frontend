import { useState, useEffect } from "react";

const useReservation  = (reservationType, reservationId = null) => {
    const [reservationData, setReservationData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!reservationType) {
            setError("'예약타입이 존재하지 않습니다.");
            return;
        }

        const fetchReservationData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    setError("로그인이 필요합니다.");
                    return;
                }

                let url = `http://localhost:8080/api/${reservationType}/reservations`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                // console.log("API 응답 데이터:", data);

                // 특정 reservationId와 일치하는 예약을 찾음
                const selectedReservation = data.find(res => 
                    reservationType === "short" ? res.reservationSId == reservationId : res.reservationId == reservationId
                ) || null;
                setReservationData(selectedReservation);
            } catch (error) {
                console.error("예약 정보 가져오기 실패: ",  error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservationData();
    }, [reservationType, reservationId]);

    return { reservationData, loading, error};
};

export default useReservation;