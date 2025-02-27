import { useState, useEffect } from "react";

const useCar = (carId) => {
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
        const queryParams = new URLSearchParams({
          rental_datetime: "2025-02-21T10:00:00",
          return_datetime: "2025-02-21T14:00:00",
        }).toString();

        const res = await fetch(`http://localhost:8080/api/quick-rent/cars/${carId}?${queryParams}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch car info. Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("🚀 API 응답 데이터:", data);

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
  }, [carId]);

  return { car, totalPrice, loading, error };
};

export default useCar;
