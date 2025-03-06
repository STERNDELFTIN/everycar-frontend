import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/routes/myPage/info/ProfileModify.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';
import useUserInfo from '../../../components/hooks/useUserInfo';

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

    // 유저 정보 가져오기
    const { loading, userInfo, updateUserInfo } = useUserInfo();

    // 상태 추가: 변경 가능한 값들 (초기값 설정)
    const [userName, setUserName] = useState(userInfo?.userName || '');
    const [userEmail, setUserEmail] = useState(userInfo?.userEmail || '');
    const [userPhone, setUserPhone] = useState(userInfo?.userPhone || '');
    const [userAddress, setUserAddress] = useState(userInfo?.userAddress || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.userName || '');
            setUserEmail(userInfo.userEmail || '');
            setUserPhone(userInfo.userPhone || '');
            setUserAddress(userInfo.userAddress || '');
        }
    }, [userInfo]);

    // 변경 사항 처리 함수
    const handleNameChange = (e) => {
        setUserName(e.target.value);
        setIsNameChanged(true);
    };
    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
        setIsEmailChanged(true);
    };

    const handlePhoneChange = (e) => {
        setUserPhone(e.target.value);
        setIsPhoneChanged(true);
    };

    const handleAddressChange = (e) => {
        setUserAddress(e.target.value);
        setIsAddressChanged(true);
    };

    // 내용 변경 여부
    const [isNameChanged, setIsNameChanged] = useState(false);
    const [isEmailChanged, setIsEmailChanged] = useState(false);
    const [isPhoneChanged, setIsPhoneChanged] = useState(false);
    const [isAddressChanged, setIsAddressChanged] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = { userName, userEmail, userPhone, userAddress };

        const result = await updateUserInfo(updatedData);
        setMessage(result.message);

        if (result.success) {
            setTimeout(() => navigate('/myPage/info'), 500);
        }
    };

    return (
        <div className={styles.profileContainer}>
            <h3 className={styles.title}>프로필수정</h3>
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
                                <td>{userInfo.userBirth}</td>
                            </tr>
                            <tr>
                                <th>성별</th>
                                <td>{userInfo.userGender === 1 ? '여' : '남'}</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td><input type='email' value={userEmail} onChange={handleEmailChange} className={isEmailChanged ? styles.changedInput : styles.normalInput} /></td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td><input type='tel' value={userPhone} onChange={handlePhoneChange} className={isPhoneChanged ? styles.changedInput : styles.normalInput} /></td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td><input type='text' value={userAddress} onChange={handleAddressChange} className={isAddressChanged ? styles.changedInput : styles.normalInput} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.saveButtonContainer}>
                        <button className={styles.saveButton} onClick={handleSubmit}>저장</button>
                    </div>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                </>
            )}
        </div>
    );
}

export default ProfileModify;