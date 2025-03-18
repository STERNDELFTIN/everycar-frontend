import { useEffect, useRef, useState } from "react";

const KakaoMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const loadKakaoMap = () => {
      if (!mapRef.current) return;

      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);

      // 마커 추가
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(latitude, longitude),
        map,
      });

      setIsLoaded(true);
    };

    // ✅ 카카오 맵 API 스크립트가 로드되었는지 확인 후 실행
    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1fc1193a647e2229d02c81559ac53d9e&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(loadKakaoMap);
      };
      document.head.appendChild(script);
    }
  }, [latitude, longitude]);

  return (
    <div>
      {!isLoaded && <p>지도 로딩 중...</p>}
      <div ref={mapRef} style={{ width: "100%", height: "300px", border: "1px solid #ccc"}} />
    </div>
  );
};

export default KakaoMap;
