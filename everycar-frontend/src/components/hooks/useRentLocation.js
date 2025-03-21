import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRegion } from "../../redux/rentSlice.js";

const useRentLocation = () => {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('/json/rent_position.json')
      .then(result => {
        // console.log("렌트 위치 데이터 불러오기 성공:", result.data);
        setLocations(result.data);
      })
      .catch(error => {
        console.error("렌트 위치 데이터 불러오기 실패: ", error);
      });
  }, [dispatch]);

  return { locations };
};

export default useRentLocation;
