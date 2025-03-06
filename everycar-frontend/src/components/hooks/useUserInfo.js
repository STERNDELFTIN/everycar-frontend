import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo, setLicenseInfo } from '../../redux/userSlice';

const useUserInfo = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo, birthDate, licenseIssuedDate, licenseInfo } = useSelector((state) => state.user);
    const reservations = useSelector((state) => state.reservation.reservations);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('로그인이 필요합니다.');
            setLoading(false);
            return;
        }

        if (!userInfo) {
            fetch('http://localhost:8080/api/user/mypage', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                dispatch(setUserInfo(data)); // Redux에 저장
            })
            .catch(error => console.error('유저 정보 불러오기 오류:', error))
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

        fetch('http://localhost:8080/api/license/myLicense', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setLicenseInfo(data)); // Redux에 저장
        })
        .catch(error => console.error('면허 정보 불러오기 오류:', error));

    }, [userInfo, isLoggedIn, dispatch]);

    return { loading, userInfo, birthDate, licenseIssuedDate, licenseInfo, reservations };
};

export default useUserInfo;
