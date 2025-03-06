import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userSlice';

const useUserInfo = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    // 유저 정보 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('로그인이 필요합니다.');
            setLoading(false);
            return;
        }

        if (!userInfo || Object.keys(userInfo).length === 0) {
            fetch('http://localhost:8080/api/user/mypage', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    dispatch(setUserInfo(data || {})); // Redux에 저장
                })
                .catch(error => console.error('유저 정보 불러오기 오류:', error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

    }, [userInfo, isLoggedIn, dispatch]);

    // 유저 프로필 업데이트 함수
    const updateUserInfo = async (updatedData) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/api/user/mypage', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error('프로필 업데이트 실패');

            dispatch(setUserInfo(userInfo ? { ...userInfo, ...updatedData } : updatedData)); // Redux 업데이트
            window.dispatchEvent(new Event('loginStateChange')); // 로그인 상태 변경 이벤트 트리거
            return { success: true, message: '프로필이 성공적으로 업데이트되었습니다.' };
        } catch (error) {
            console.error('프로필 업데이트 오류:', error);
            return { success: false, message: '프로필 업데이트 중 오류가 발생했습니다.' };
        }
    };

    return { loading, userInfo, updateUserInfo };
};

export default useUserInfo;
