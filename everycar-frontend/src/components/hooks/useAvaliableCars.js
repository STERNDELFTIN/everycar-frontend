import { useState, useEffect } from "react";

const useAvailableCars = (province, district, rentalDatetime, returnDatetime) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!province || !district || !rentalDatetime || !returnDatetime) return;
  
      const fetchAvailableCars = async () => {
        try {
          const queryParams = new URLSearchParams({
            province,
            district,
            rental_datetime: rentalDatetime,
            return_datetime: returnDatetime,
          }).toString();
  
          const res = await fetch(`http://localhost:8080/api/quick-rent/cars?${queryParams}`);
          if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  
          const data = await res.json();
          console.log("🚗 API 응답 데이터:", data);
          setCars(data.cars || []);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAvailableCars();
    }, [province, district, rentalDatetime, returnDatetime]);
  
    return { cars, loading, error };
  };
  
  export default useAvailableCars;