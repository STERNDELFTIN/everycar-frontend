import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useCar = (carId) => {
  const { startDate, startTime, endDate, endTime, rentalDate, returnDate } = useSelector((state) => state.rent);
  const reservationType = useSelector((state) => state.rent.reservationType);

  const [car, setCar] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarInfo = async () => {
      if (!carId || carId <= 0) {
        setLoading(false);
        return;
      }

      try {
        let queryParams = new URLSearchParams();

        if (reservationType === "quick") {
          queryParams.append("rental_datetime", `${startDate}T${startTime}:00`);
          queryParams.append("return_datetime", `${endDate}T${endTime}:00`);
        } else {
          queryParams.append("reservation_s_start_date", `${startDate}T${startTime}:00`);
          queryParams.append("reservation_s_end_date", `${endDate}T${endTime}:00`);
        }

        const token = localStorage.getItem("token"); // JWT 토큰 가져오기

        // 예약 타입에 따라 다른 API 엔드포인트 사용
        const apiUrl = reservationType === "quick"
          ? `http://localhost:8080/api/quick-rent/cars/${carId}?${queryParams}`
          : `http://localhost:8080/api/short-rent/cars/${carId}?${queryParams}`;

        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch car info. Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("API 응답 데이터:", data);

        if (!data || !data.car) {
          throw new Error("데이터가 없습니다.");
        }

        setCar(data.car || null);
        setTotalPrice(data.totalPrice || 0); // totalPrice 저장
      } catch (error) {
        console.error("API 요청 실패:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarInfo();
  }, [carId, reservationType]);

  return { car, totalPrice, loading, error };
};

export default useCar;
