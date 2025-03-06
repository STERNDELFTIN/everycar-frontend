import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLicenseInfo } from "../../redux/userSlice";

const useLicense = () => {
    const dispatch = useDispatch();

    const licenseInfo = useSelector((state) => state.user.licenseInfo);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            console.error('로그인이 필요합니다.');
            setLoading(false);
            return;
        }

        fetch('http://localhost:8080/api/license/myLicense', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setLicenseInfo({
                licenseNum: data.licenseNum || '',
                licenseDate: data.licenseDate || '',
                licenseEndDate: data.licenseEndDate || '',
                licensePhoto: data.licensePhoto || null,
            }));
        })
        .catch(error => console.error('면허 정보 불러오기 오류:', error))
        .finally(() => setLoading(false));

    }, [dispatch, token]);

    return { loading, licenseInfo };
};

export default useLicense;