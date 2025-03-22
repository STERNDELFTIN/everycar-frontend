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
        
            // 면허 번호에서 하이픈을 제거하여 서버에 보낼 값 준비
            const formattedLicenseNum = licenseNum.replace(/-/g, '');

            console.log(formattedLicenseNum);
            const licenseData = {
                licenseNum: formattedLicenseNum,  // 하이픈 제거된 값
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
      
        const handleLicenseDateChange = (e) => {
            const selectedDate = e.target.value;
            setLicenseDate(selectedDate); // 발급일 업데이트
        
            const selectedDateObj = new Date(selectedDate);
            if (!isNaN(selectedDateObj)) {
                const endDate = new Date(selectedDateObj);
                endDate.setFullYear(endDate.getFullYear() + 10); // 10년 추가
                setLicenseEndDate(endDate.toISOString().split("T")[0]); // YYYY-MM-DD 형식 변환
            }
        };

        const handleLicenseNumChange = (e) => {
            let inputValue = e.target.value.replace(/\D/g, '');  // 숫자만 허용

            // 최대 12자리까지만 입력받도록 제한
            if (inputValue.length > 12) {
                inputValue = inputValue.slice(0, 12);  // 12자리가 넘어가면 자르기
            }
        
            // 각 자리마다 하이픈을 넣어주는 로직
            if (inputValue.length <= 2) {
                inputValue = inputValue.replace(/(\d{2})(\d{0,2})/, '$1-$2');  // AA-
            } else if (inputValue.length <= 4) {
                inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{0,6})/, '$1-$2-$3');  // AA-BB-
            } else if (inputValue.length <= 10) {
                inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{6})(\d{0,2})/, '$1-$2-$3-$4');  // AA-BB-CCCCCC-
            } else if (inputValue.length <= 12) {
                inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{6})(\d{2})/, '$1-$2-$3-$4');  // AA-BB-CCCCCC-DD
            }
        
            setLicenseNum(inputValue);  // 포맷팅된 값을 상태에 저장
        };
        

    return (
        <div className={styles.licenseModifyContainer}>
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
                                    className={styles.textInput}
                                    value={licenseNum}
                                    onChange={handleLicenseNumChange}  // 숫자만 유효성 검사
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
                                className={styles.dateInput1}
                                value={licenseDate}
                                onChange={handleLicenseDateChange} // 발급일 변경 시 처리
                                required
                            />
                            </td>
                        </tr>
                        <tr>
                            <th>만료일</th>
                            <td>
                            <input
                                type="date"
                                className={styles.dateInput2}
                                value={licenseEndDate}
                                readOnly
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
