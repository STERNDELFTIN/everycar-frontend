
const dummyReservations = {
    "USER_1234": {
        reservationNum: "RES_1740544662277",
        payAmount: 1000,
        payMethod: "Toss Payments",
        reservationDate: "2025-02-26 14:00",
        carModel: "Hyundai Avante",
        rentalLocation: "서울 강남역",
        returnLocation: "서울역",
        rentalDate: "2025-03-01 10:00",
        returnDate: "2025-03-02 12:00"
    }
};

// 예약 내역 저장 (LocalStorage 활용)
export const saveReservationData = (userNum, reservationData) => {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || dummyReservations;
    reservations[userNum] = reservationData;
    localStorage.setItem("reservations", JSON.stringify(reservations));
};

// 예약 내역 불러오기
export const getReservationData = (userNum) => {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || dummyReservations;
    return reservations[userNum] || null;
};

export default dummyReservations;
