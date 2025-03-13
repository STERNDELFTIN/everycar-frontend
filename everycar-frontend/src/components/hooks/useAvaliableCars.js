import { useState, useEffect } from "react";

const useAvailableCars = (province, district, rentalDatetime, returnDatetime, reservationType) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!province || !district || !rentalDatetime || !returnDatetime) return;

    const fetchAvailableCars = async () => {
      try {
        let queryParams = new URLSearchParams();
        
        if (reservationType === "quick") {
          queryParams.append("rental_datetime", rentalDatetime);
          queryParams.append("return_datetime", returnDatetime);
        } else {
          queryParams.append("reservation_s_start_date", rentalDatetime);
          queryParams.append("reservation_s_end_date", returnDatetime);
        }

        // 예약 유형에 따라 다른 API 엔드포인트 사용
        const apiUrl = reservationType === "quick"
          ? `http://localhost:8080/api/quick-rent/cars?province=${province}&district=${district}&${queryParams}`
          : `http://localhost:8080/api/short-rent/cars?province=${province}&district=${district}&${queryParams}`;

        console.log("차량 목록 API 호출 URL:", apiUrl); // 디버깅용

        const res = await fetch(apiUrl);

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        console.log("API 응답 데이터:", data);

        setCars(data.cars || []);
      } catch (error) {
        console.error("차량 목록 API 오류:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCars();
  }, [province, district, rentalDatetime, returnDatetime, reservationType]);

  return { cars, loading, error };
};

export default useAvailableCars;
