import styles from '../../css/routes/myPage/MyInfoManagement.module.scss';
import { vwFont } from '../../utils';

import TopContent from '../../components/common/myPage/TopContent';
import ListContainer from '../../components/common/myPage/ListContainer';

function MyInfoManagement() {
    return (
        <div className={styles.myInfoManagement}>
            <TopContent />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: vwFont(7, 10) }}>
                    <Profile />
                    <LicenseInfo />
                </div>
            </div>
        </div>
    );
}

// 유저 프로필
function Profile() {
    return (
        <div className={styles.profile}>
            <h4 className={styles.title}>홍길동님, 환영합니다!</h4>
            <div className={styles.profileDetail}>
                <h5 className={styles.subTitle}>프로필</h5>
                <table>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>홍길동</td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td>user1</td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td>2000.01.01</td>
                        </tr>
                        <tr>
                            <th>성별</th>
                            <td>남</td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>hong***@gmail.com</td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>010-1234-5678</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={styles.profileChange}>
                <button className={styles.profileChangeButton}>프로필수정</button>
            </div>
        </div>
    );
}

// 면허 정보
function LicenseInfo() {
    return (
        <div className={styles.licenseInfoContainer}>
            <h4 className={styles.title}>면허 정보 등록</h4>
            <div className={styles.licenseInfoContent}>

                <div className={styles.license}>
                    <div className={styles.licenseDetail} style={{ display: 'flex', gap: vwFont(23, 40) }}>
                        <div><img style={{ width: '100px', height: '129px', borderRadius: '10px', aspectRatio: '3.5/4.5', }}></img></div>

                        <div className={styles.licenseDetailInfo}>
                            <h5 className={styles.subTitle}>자동차운전면허증</h5>
                            <p>12-34-567891-01</p>
                            <p>홍길동</p>
                            <p>123456-1******</p>
                            <p>적성검사 : 2020-01-01</p>
                            <p>기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간 : 2030-01-01</p>
                        </div>
                    </div>

                    <p style={{ width: '100%', textAlign: 'center', fontWeight: '800', }}>에브리카</p>
                </div>

                <div className={styles.info}>
                    <h5 className={styles.subTitle}>면허정보</h5>
                    <div className={styles.infoBox}>
                        <div className={styles.infoDetailTitle}>
                            <p>면허고유번호</p>
                            <p>발급일</p>
                            <p>기간</p>
                        </div>
                        <div className={styles.infoDetail}>
                            <p>12-24-567891-01</p>
                            <p>2020-01-01</p>
                            <p>2030-01-01</p>
                        </div>
                    </div>
                </div>

                <div className={styles.infoChange}>
                    <button className={styles.infoChangeButton}>정보수정</button>
                </div>
            </div>
        </div>
    );
}

export default MyInfoManagement;