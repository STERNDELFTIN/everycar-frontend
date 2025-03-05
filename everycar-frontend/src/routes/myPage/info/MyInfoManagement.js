import styles from '../../../css/routes/myPage/info/MyInfoManagement.module.scss';
import { vwFont } from '../../../utils';

import TopContent from '../../../components/common/myPage/TopContent';
import ListContainer from '../../../components/common/myPage/ListContainer';

function MyInfoManagement() {
    return (
        <div className={styles.myInfoManagement}>
            <TopContent currentLocation='내정보관리' />

            <div className={styles.bottomContent}>
                <ListContainer />
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: vwFont(7, 10) }}>
                    <Profile />
                    <LicenseInfo />
                    <TermsOfUse />
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

// 이용약관
function TermsOfUse() {
    return (
        <div className={styles.termsOfUse}>
            <h6>이용약관</h6>
            <div>
                <p>이곳은 더미 텍스트입니다. 실제 콘텐츠가 들어갈 자리를 표시하기 위해 작성된 임시 문장입니다. 웹사이트 또는 애플리케이션 개발 과정에서 디자인을 확인하거나 레이아웃을 테스트할 때 활용됩니다. 이 문장은 의미 없는 일반적인 문구로, 사용자가 읽을 필요 없이 시각적인 균형을 맞추는 데 초점을 맞추고 있습니다. 필요한 경우 이 부분을 실제 콘텐츠로 교체하여 최종적인 형태를 완성할 수 있습니다.
                    <br /><br />
                    더미 텍스트는 프로젝트의 목적과 스타일에 따라 변경될 수 있습니다. 예를 들어, 뉴스 기사에서는 짧고 간결한 문장이 필요할 수도 있고, 블로그에서는 좀 더 부드럽고 자연스러운 흐름이 요구될 수도 있습니다. 따라서, 작업하는 콘텐츠 유형에 맞게 적절한 문장을 추가하는 것이 중요합니다. 이곳에 들어갈 내용이 준비되면 즉시 교체해 주세요.</p>
            </div>
        </div>
    );
}

export default MyInfoManagement;