import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setLicenseInfo } from '../../../redux/userSlice';
import styles from '../../../css/routes/myPage/info/LicenseModify.module.scss';
// import { vwFont } from '../../../utils';

// import TopContent from '../../../components/common/myPage/TopContent';
// import ListContainer from '../../../components/common/myPage/ListContainer';
import useUserInfo from '../../../components/hooks/useUserInfo';
// import useLicense from '../../../components/hooks/useLicense';

const LicenseModify = () => {
    // const location = useLocation();
    const navigate = useNavigate();
    const [licenseNum, setLicenseNum] = useState('');
    const [licenseDate, setLicenseDate] = useState('');
    const [licenseEndDate, setLicenseEndDate] = useState('');
    const [message, setMessage] = useState('');

        // 유저 정보 가져오기
        const { userInfo } = useUserInfo();

        const handleSubmit = async (e) => {
            e.preventDefault();
        
            if (!licenseNum || !licenseDate || !licenseEndDate) {
                setMessage('모든 정보를 입력해주세요.');
                return;
            }
        
            const licenseData = {
                licenseNum,
                licenseDate,
                licenseEndDate,
                userNum: userInfo.userNum,
            };
        
            const token = localStorage.getItem('accessToken');
            // console.log(licenseData);
            // console.log(token); // 토큰 값 확인
        
            try {
                const response = await fetch('http://localhost:8080/api/license/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(licenseData),
                });
        
                if (!response.ok) {
                    throw new Error('면허 등록에 실패했습니다.');
                }
        
                setMessage('면허 정보가 성공적으로 등록되었습니다.');
                setTimeout(() => navigate('/myPage/info'), 2000); // 여기서 경로 변경
            } catch (error) {
                setMessage(error.message);
            }
        };
        
        

    return (
        <div className={styles.licenseModify}>
            <h4 className={styles.title}>면허 정보 등록</h4>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>{userInfo.userName}</td>
                        </tr>
                        <tr>
                            <th>면허고유번호</th>
                            <td>
                                <input
                                    type="text"
                                    value={licenseNum}
                                    onChange={(e) => setLicenseNum(e.target.value)}
                                    placeholder="면허 번호 입력"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>발급일</th>
                            <td>
                                <input
                                    type="date"
                                    value={licenseDate}
                                    onChange={(e) => setLicenseDate(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>만료일</th>
                            <td>
                                <input
                                    type="date"
                                    value={licenseEndDate}
                                    onChange={(e) => setLicenseEndDate(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={styles.saveButtonContainer}>
                    <button type="submit" className={styles.saveButton}>저장</button>
                </div>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default LicenseModify;
