import { useState, useEffect } from "react";

const useCar = (carId) => {
  // console.log("useCar 실행됨 carId: ", carId);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log("useEffect 실행됨 carId: ", carId);

    if (carId === null || isNaN(carId)) {
      setLoading(false); // carId가 없을 때 로딩 상태를 false로 변경
      // console.log("carId 유효하지 않음");
      return;
    }

    const fetchCarInfo = async () => {

      try {
        const res = await fetch(`/json/cars.json?nocache=${new Date().getTime()}`); // 전체 JSON 가져오기
        if (!res.ok) {
          throw new Error("Failed to fetch car info.");
        }
        const data = await res.json();
        // console.log("JSON 데이터: ", data);
        
        const carData = data.popular_cars.find(car => Number(car.id) === Number(carId)); // carId를 숫자로 변환하여 비교
        // console.log("해당하는 차량 데이터: ", carData);

        setCar(carData || null); // 차량이 없으면 null로 설정
      } catch (error) {
        setError(error.message);
        // console.log("JSON 로드 실패");
      } finally {
        setLoading(false); // 반드시 로딩 상태 변경
      }
    };

    fetchCarInfo();
  }, [carId]);

  return { car, loading, error };
};

export default useCar;
