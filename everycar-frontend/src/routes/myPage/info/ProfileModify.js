import React, { useState } from 'react';
import styles from '../../../css/routes/myPage/info/ProfileModify.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';

// 더미 데이터
import dummyData from '../../../dummyData/dummyData';

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
    const user = dummyData.users[0]; // 더미 데이터에 존재하는 첫 번째 유저 임의로 선택

    // 상태 추가: 입력된 값들을 저장
    const [userEmail, setUserEmail] = React.useState(user.user_email);
    const [userPhone, setUserPhone] = React.useState(user.user_phone);
    const [userAddress, setUserAddress] = React.useState(user.user_address);

    // 변경 사항 처리 함수
    const handleEmailChange = (e) => setUserEmail(e.target.value);
    const handlePhoneChange = (e) => setUserPhone(e.target.value);
    const handleAddressChange = (e) => setUserAddress(e.target.value);

    return (
        <div className={styles.profileContainer}>
            <table className={styles.profileTable}>
                <tbody>
                    <tr>
                        <th>이름</th>
                        <td>{user.user_name}</td>
                    </tr>
                    <tr>
                        <th>아이디</th>
                        <td>{user.user_id}</td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td>{user.user_birth}</td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>{ user.user_gender === 1 ? '남' : '여' }</td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <input type='text' />
                        <td>{user.user_email}</td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>{user.user_phone}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>{user.user_address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ProfileModify;