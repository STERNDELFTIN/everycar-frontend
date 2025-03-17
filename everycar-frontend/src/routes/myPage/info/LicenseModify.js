import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLicenseInfo } from '../../../redux/userSlice';
import styles from '../../../css/routes/myPage/info/LicenseModify.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';
import useUserInfo from '../../../components/hooks/useUserInfo';
import useLicense from '../../../components/hooks/useLicense';

const LicenseModify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, userInfo } = useUserInfo(); // 유저 정보 
    const { licenseInfo } = useLicense(); // 면허 정보

    // 면허 정보 가져오기
    const [newLicenseNum, setNewLicenseNum] = useState(licenseInfo.licenseNum);
    const [newLicenseDate, setNewLicenseDate] = useState(licenseInfo.licenseDate);
    const [newLicenseEndDate, setNewLicenseEndDate] = useState(licenseInfo.licenseEndDate);
    const [newLicensePhoto, setNewLicensePhoto] = useState(licenseInfo.licensePhoto);
    const [message, setMessage] = useState('');

    // 내용 변경 여부
    const [isNumChanged, setIsNumChanged] = useState(false);
    const [isDateChanged, setIsDateChanged] = useState(false);
    const [isEndDateChanged, setIsEndDateChanged] = useState(false);
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);

    const handleFileChange = (e) => {
        setNewLicensePhoto(e.target.files[0]);
        setIsPhotoChanged(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('licenseNum', newLicenseNum);
        formData.append('licenseDate', newLicenseDate);
        formData.append('licenseEndDate', newLicenseEndDate);
        if (newLicensePhoto) {
            formData.append('licensePhoto', newLicensePhoto);
        }

        try {
            const response = await fetch('http://localhost:8080/api/license/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(setLicenseInfo({
                    licenseNum: newLicenseNum,
                    licenseDate: newLicenseDate,
                    licenseEndDate: newLicenseEndDate,
                    licensePhoto: newLicensePhoto ? URL.createObjectURL(newLicensePhoto) : licenseInfo.licensePhoto,
                }));

                setMessage('면허 정보가 성공적으로 수정되었습니다.');
                setTimeout(() => navigate('/myPage/info'), 1000);
            } else {
                setMessage('수정 실패: ' + data.message);
            }
        } catch (error) {
            console.error('면허 정보 수정 오류:', error);
            setMessage('면허 정보 수정 중 오류가 발생했습니다.');
        }
    };

    if (loading) return <p>Loading...</p>
    if (!userInfo) return <p>유저 정보 없음</p>

    return (
        <div className={styles.licenseModify}>
            <TopContent firstLocation='내정보관리' secondLocation='면허수정' />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div className={styles.licenseModifyContainer}>
                    <h4 className={styles.title}>면허 정보 등록</h4>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <table>
                            <tbody>
                                <tr>
                                    <th>이름</th>
                                    <td>{userInfo.userName}</td>
                                </tr>
                                <tr>
                                    <th>면허고유번호</th>
                                    <td><input type="text" value={newLicenseNum} onChange={(e) => setNewLicenseNum(e.target.value)} className={isNumChanged ? styles.changedInput : styles.normalInput} required /></td>
                                </tr>
                                <tr>
                                    <th>발급일</th>
                                    <td><input type="date" value={newLicenseDate} onChange={(e) => setNewLicenseDate(e.target.value)} className={isDateChanged ? styles.changedInput : styles.normalInput} required />
                                    </td>
                                </tr>
                                <tr>
                                    <th>만료일</th>
                                    <td><input type="date" value={newLicenseEndDate} onChange={(e) => setNewLicenseEndDate(e.target.value)} className={isEndDateChanged ? styles.changedInput : styles.normalInput} required /></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={styles.currentPhoto}>
                            <label>현재 등록된 면허증 사진:</label>
                            {newLicensePhoto ? (
                                <div>
                                    <img src={newLicensePhoto} alt="면허증 사진" style={{ width: '200px', height: 'auto', borderRadius: '10px' }} />
                                </div>
                            ) : (
                                <p>등록된 사진이 없습니다.</p>
                            )}
                        </div>
                        <div className={styles.changedPhoto}>
                            <label>새로운 면허증 사진 (변경 시 선택):</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        </div>

                        <div className={styles.saveButtonContainer}>
                            <button type="submit" className={styles.saveButton}>저장</button>
                        </div>

                    </form>

                    {message && <p style={{ color: 'green' }}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default LicenseModify;
