import React, { useEffect } from "react";

const KakaoMap = ({ latitude, longitude }) => {
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

    useEffect(() => {
        // console.log("API 키 확인:", KAKAO_API_KEY);

        if (!KAKAO_API_KEY) {
            console.error("Kakao API 키가 존재하지 않습니다.");
            return;
        }

        if (!window.kakao || !window.kakao.maps) {
            console.log("Kakao API 로드 중...");
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
            script.async = true;
            script.onerror = () => {
                console.error("Kakao 지도 API 로드 실패!");
            };
            document.head.appendChild(script);

            script.onload = () => {
                console.log("Kakao 지도 API가 로드되었습니다.");
                window.kakao.maps.load(() => {
                    initializeMap();
                });
            };
        } else {
            console.log("Kakao 지도 API가 이미 로드됨");
            initializeMap();
        }
    }, [latitude, longitude]);

    const initializeMap = () => {
        setTimeout(() => {
            const container = document.getElementById("map");
            if (!container) {
                console.error("Error: #map 요소를 찾을 수 없습니다.");
                return;
            }

            console.log("지도 초기화 완료, 좌표:", latitude, longitude);
            const options = {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);

            // 마커 추가
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(latitude, longitude),
            });
            marker.setMap(map);
        }, 500);
    };

    return <div id="map" style={{ width: "100%", height: "400px", border: "1px solid #ddd" }}></div>;
};

export default KakaoMap;
