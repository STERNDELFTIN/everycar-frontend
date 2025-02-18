import { useEffect } from 'react';

function usePopupOutsideClick(popupRef, exit) {

    useEffect(() => {
        const handleClickOutside = (e) => {
            // 팝업 영역 밖 클릭여부 확인
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                exit(); // 팝업 닫기
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => { document.addEventListener('mousedown', handleClickOutside) };
    }, [popupRef, exit]);
}

export default usePopupOutsideClick;