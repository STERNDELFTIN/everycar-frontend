import { useState, useEffect } from "react";

function useCurrentDateTime() {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const today = new Date();

        const updateDate = () => {
            const formattedDate = today.getFullYear() + "-" +
                String(today.getMonth() + 1).padStart(2, "0") + "-" +
                String(today.getDate()).padStart(2, "0");

            setCurrentDate(formattedDate);
        };

        const updateTime = () => {
            const formattedTime = String(today.getHours()).padStart(2, "0") + ":" +
                String(today.getMinutes()).padStart(2, "0") + ":" +
                String(today.getSeconds()).padStart(2, "0");

            setCurrentTime(formattedTime);
        };

        updateDate(); updateTime();

        const timeInterval = setInterval(updateTime, 1000); // 1000ms === 1s 마다 업데이트
        const dateInterval = setInterval(updateTime, 1000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(dateInterval);
        } // 언마운트 시 interval 제거
    });

    return { currentDate, currentTime };
}

export default useCurrentDateTime;