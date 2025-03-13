import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useAvailableCars = (province, district, rentalDatetime, returnDatetime) => {
  const reservationType = useSelector((state) => state.rent.reservationType);
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

        const apiUrl = reservationType === "quick"
          ? `http://localhost:8080/api/quick-rent/cars?province=${province}&district=${district}&${queryParams}`
          : `http://localhost:8080/api/short-rent/cars?province=${province}&district=${district}&${queryParams}`;

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        console.log("API 응답 데이터:", data);
        setCars(data.cars || []);
      } catch (error) {
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