import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../redux/userSlice';
import styles from '../../../css/routes/myPage/info/ProfileModify.module.scss';
import { vwFont } from '../../../utils';
import useUserInfo from '../../../components/hooks/useUserInfo';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';

// 더미 데이터
// import dummyData from '../../../dummyData/dummyData';

function ProfileModify() {
    return (
        <div className={styles.profileModify}>
            <TopContent firstLocation='내정보관리' secondLocation='프로필수정' />

            <div className={styles.bottomContent}>
                <ListContainer />
                <ProfileModifyInfo />
            </div>
        </div>
    );
}

// 프로필 수정
function ProfileModifyInfo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 유저 정보 가져오기
    const { loading, userInfo, birthDate } = useUserInfo();

    // 상태 추가: 변경 가능한 값들 (초기값 설정)
    const [userEmail, setUserEmail] = useState(userInfo?.userEmail || '');
    const [userPhone, setUserPhone] = useState(userInfo?.userPhone || '');
    const [userAddress, setUserAddress] = useState(userInfo?.userAddress || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (userInfo) {
            setUserEmail(userInfo.userEmail || '');
            setUserPhone(userInfo.userPhone || '');
            setUserAddress(userInfo.userAddress || '');
        }
    }, [userInfo]);

    // 변경 사항 처리 함수
    const handleEmailChange = (e) => setUserEmail(e.target.value);
    const handlePhoneChange = (e) => setUserPhone(e.target.value);
    const handleAddressChange = (e) => setUserAddress(e.target.value);

    // 정보 저장 함수
    const handleSave = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/api/user/mypage', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    userPhone,
                    userAddress,
                }),
            });

            if (!response.ok) {
                throw new Error('프로필 업데이트 실패');
            }
            // 변경된 정보 Redux 상태 업데이트
            const updatedUserInfo = {
                ...userInfo,
                userEmail,
                userPhone,
                userAddress
            };
            dispatch(setUserInfo(updatedUserInfo));

            // 로그인 상태 변경 이벤트 트리거
            window.dispatchEvent(new Event('loginStateChange'));

            // 성공 메시지 표시
            setMessage('프로필이 성공적으로 업데이트되었습니다.');

            // 0.5초 후 자동으로 페이지 이동 (즉발적 UI 반영)
            setTimeout(() => {
                navigate('/myPage/info'); // 페이지 이동
            }, 500);
        } catch (error) {
            console.error('프로필 업데이트 오류:', error);
            setMessage('프로필 업데이트 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.profileContainer}>
            {/* 로딩 중일 때 */}
            {loading && <p>Loading...</p>}

            {/* 유저 정보가 없을 때 */}
            {!loading && !userInfo && <p>유저 정보 없음</p>}

            {/* 유저 정보가 있을 때 */}
            {!loading && userInfo && (
                <>
                    <table className={styles.profileTable}>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>{userInfo.userName}</td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td>{userInfo.userId}</td>
                            </tr>
                            <tr>
                                <th>생년월일</th>
                                <td>{birthDate || userInfo.userBirth}</td>
                            </tr>
                            <tr>
                                <th>성별</th>
                                <td>{userInfo.userGender === 1 ? '여' : '남'}</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <input type='email' value={userEmail} onChange={handleEmailChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>
                                    <input type='text' value={userPhone} onChange={handlePhoneChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <input type='text' value={userAddress} onChange={handleAddressChange} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.saveButtonContainer}>
                        <button className={styles.saveButton} onClick={handleSave}>저장</button>
                    </div>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                </>
            )}
        </div>
    );
}

export default ProfileModify;