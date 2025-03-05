const dummyData = {
    users: [
      {
        user_num: 1,
        user_id: "user01",
        user_name: "김철수",
        user_email: "user01@example.com",
        user_phone: "010-1234-5678",
        user_birth: "1990-05-15",
        user_address: "서울특별시 강남구",
      },
      {
        user_num: 2,
        user_id: "user02",
        user_name: "이영희",
        user_email: "user02@example.com",
        user_phone: "010-9876-5432",
        user_birth: "1985-10-20",
        user_address: "부산광역시 해운대구",
      },
    ],
  
    rental_states: [
      { state_id: 0, state_name: "예약중" },
      { state_id: 1, state_name: "이용중" },
      { state_id: 2, state_name: "이용완료" },
      { state_id: 3, state_name: "취소" },
    ],
  
    cars: [
      {
        car_id: 1,
        model_id: "EV6",
        car_category: "전기차",
        car_status: "사용 가능",
        car_year: 2023,
        car_fuel: "전기",
        car_grade: "SUV",
        car_options: "네비게이션, 후방카메라",
        rental_station: "강남 대여소",
      },
      {
        car_id: 2,
        model_id: "쏘나타",
        car_category: "세단",
        car_status: "사용 가능",
        car_year: 2022,
        car_fuel: "가솔린",
        car_grade: "중형",
        car_options: "스마트 크루즈 컨트롤",
        rental_station: "부산 대여소",
      },
    ],
  
    reservations: [
      {
        reservation_id: 101,
        user_num: 1,
        fast_reservation_id: 1,
        short_reservation_id: null,
      },
      {
        reservation_id: 102,
        user_num: 2,
        fast_reservation_id: null,
        short_reservation_id: 2,
      },
    ],
  
    fast_reservations: [
      {
        reservation_id: 1,
        car_id: 1,
        rental_locator: "서울역 주차장",
        return_locator: "강남역 주차장",
        rental_datetime: "2024-03-01 10:00",
        return_datetime: "2024-03-01 18:00",
        user_num: 1,
        fast_reservation_create_at: "2024-02-28 15:00",
        rental_state: 1, // 이용 중
      },
    ],
  
    short_reservations: [
      {
        reservation_id: 2,
        car_id: 2,
        rental_locator: "부산역 주차장",
        return_locator: "해운대 주차장",
        rental_datetime: "2024-03-05 14:00",
        return_datetime: "2024-03-06 16:00",
        user_num: 2,
        short_reservation_create_at: "2024-03-02 12:00",
        rental_state: 2, // 이용 완료
      },
    ],
  };
  
  export default dummyData;
  