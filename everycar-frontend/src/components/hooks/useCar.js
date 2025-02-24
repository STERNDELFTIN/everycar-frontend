import { useState, useEffect } from "react";

const useCar = (carId) => {
  const [car, setCar] = useState(null);
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
          rental_datetime: "2025-02-21T10:00:00", // 대여시간
          return_datetime: "2025-02-21T14:00:00", // 반납시간
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
        setCar(data || null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarInfo();
  }, [carId]); // carId가 변경될 때만 실행

  return { car, loading, error };
};

export default useCar;
