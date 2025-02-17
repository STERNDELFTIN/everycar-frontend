
 // 시간 리스트
 function TimeList() {
    const interval = 30; // 30분 단위
    const times = [];
    const currentTime = new Date();
    currentTime.setHours(0, 0, 0, 0); // 00:00

    while (currentTime.getDate() === new Date().getDate() ) {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');

        times.push(`${hours}:${minutes}`);
        currentTime.setMinutes(currentTime.getMinutes() + interval) ; // 30분 단위로 증가
    }

    return times;
}

export default TimeList;