import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/routes/myPage/info/MyInfoManagement.module.scss";
import { vwFont } from "../../../utils";

import TopContent from "../../../components/common/myPage/TopContent";
import ListContainer from "../../../components/common/myPage/ListContainer";
import useUserInfo from "../../../components/hooks/useUserInfo";
// import useLicense from "../../../components/hooks/useLicense";

function MyInfoManagement() {
  return (
    <div className={styles.myInfoManagement}>
      <TopContent firstLocation="내정보관리" />

      <div className={styles.bottomContent}>
        <ListContainer />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: vwFont(7, 10),
          }}
        >
          <Profile />
          <LicenseInfo />
          <DeleteAccountButton /> {/* 탈퇴 버튼 추가 */}
          <TermsOfUse />
        </div>
      </div>
    </div>
  );
}

// 유저 프로필
function Profile() {
  const navigate = useNavigate();

  // 유저 정보 가져오기
  const { loading, userInfo } = useUserInfo();

  if (loading) return <p>Loading...</p>;
  if (!userInfo) return <p>유저 정보 없음</p>;

  const movePageHandler = () => {
    navigate("/myPage/info/profile");
  };

  return (
    <div className={styles.profile}>
      <h4 className={styles.title}>{userInfo.userName}님, 환영합니다!</h4>
      <div className={styles.profileDetail}>
        <h5 className={styles.subTitle}>프로필</h5>
        <table>
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
              <td>{userInfo.userGender === 1 ? "여" : "남"}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{userInfo.userEmail}</td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{userInfo.userPhone}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{userInfo.userAddress}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.profileChange}>
        <button
          className={styles.profileChangeButton}
          onClick={movePageHandler}
        >
          프로필수정
        </button>
      </div>
    </div>
  );
}

// 면허 정보
function LicenseInfo() {
  const navigate = useNavigate();
  const [licenseInfo, setLicenseInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicenseInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/license/myLicense",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("면허 정보를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        setLicenseInfo(data);
      } catch (error) {
        console.error("Error fetching license info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenseInfo();
  }, []);

  const movePageHandler = () => {
    navigate("/myPage/info/license");
  };

  if (loading) return <p>Loading...</p>;

  if (!licenseInfo || !licenseInfo.licenseNum) {
    return (
      <div className={styles.noLicenseContainer}>
        <p>등록된 면허 정보가 없습니다.</p>
        <p>면허 정보를 등록하지 않으면 서비스를 이용할 수 없습니다.</p>
        <button className={styles.registerButton} onClick={movePageHandler}>
          면허 정보 등록하기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.licenseInfoContainer}>
      <h4 className={styles.title}>면허 정보 등록</h4>
      <div className={styles.licenseInfoContent}>
        <div className={styles.license}>
          <div
            className={styles.licenseDetail}
            style={{ display: "flex", gap: "20px" }}
          >
            <div
              style={{
                width: "100px",
                height: "120px",
                borderRadius: "10px",
                aspectRatio: "3.5/4.5",
                background: "#C4FF53",
                backgroundImage: `url('/images/icons/image.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className={styles.licenseDetailInfo}>
              <h5 className={styles.subTitle}>자동차운전면허증</h5>
              <p>{licenseInfo.licenseNum}</p>
              <p>적성검사 : {licenseInfo.licenseDate}</p>
              <p>
                기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간 :{" "}
                {licenseInfo.licenseEndDate}
              </p>
            </div>
          </div>

          <p style={{ width: "100%", textAlign: "center", fontWeight: "800" }}>
            에브리카
          </p>
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
              <p>{licenseInfo.licenseNum}</p>
              <p>{licenseInfo.licenseDate}</p>
              <p>{licenseInfo.licenseEndDate}</p>
            </div>
          </div>
        </div>

        <div className={styles.infoChange}>
          {/* <button
                        className={styles.infoChangeButton}
                        onClick={movePageHandler}
                    >
                        정보수정
                    </button> */}
        </div>
      </div>
    </div>
  );
}

// 회원 탈퇴 버튼 컴포넌트
function DeleteAccountButton() {
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (!window.confirm("정말로 탈퇴하시겠습니까?")) return;

    try {
      const response = await fetch("http://localhost:8080/api/user/mypage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("회원 탈퇴에 실패했습니다.");
      }

      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("accessToken"); // 토큰 삭제
      // 로컬스토리지 데이터 전체 삭제 (로그아웃 처리)
      localStorage.clear();

      // 로그인 페이지로 이동
      navigate("/auth/login");
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      alert("탈퇴 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <>
      <h2>회원 탈퇴</h2>
      <div className={styles.deleteCont}>
        <div className={styles.deleteAccountContainer}>
          <span>회원탈퇴</span>
          <button className={styles.deleteButton} onClick={handleDeleteUser}>
            회원 탈퇴
          </button>
        </div>
        <p>
          1. 회원 탈퇴 후, 모든 개인 정보가 삭제됩니다.
          <br />
          2. 탈퇴 후에는 더 이상 서비스를 이용할 수 없습니다.
          <br />
          3. 탈퇴가 완료되면, 자동으로 로그아웃 처리되며, 다시 로그인 하려면 새
          계정을 생성해야 합니다.
          <br />
        </p>
      </div>
    </>
  );
}

// 이용약관
function TermsOfUse() {
  return (
    <div className={styles.termsOfUse}>
      <h6>이용약관</h6>
      <div>
        <p>
          이곳은 더미 텍스트입니다. 실제 콘텐츠가 들어갈 자리를 표시하기 위해
          작성된 임시 문장입니다. 웹사이트 또는 애플리케이션 개발 과정에서
          디자인을 확인하거나 레이아웃을 테스트할 때 활용됩니다. 이 문장은 의미
          없는 일반적인 문구로, 사용자가 읽을 필요 없이 시각적인 균형을 맞추는
          데 초점을 맞추고 있습니다. 필요한 경우 이 부분을 실제 콘텐츠로
          교체하여 최종적인 형태를 완성할 수 있습니다.
          <br />
          <br />
          더미 텍스트는 프로젝트의 목적과 스타일에 따라 변경될 수 있습니다. 예를
          들어, 뉴스 기사에서는 짧고 간결한 문장이 필요할 수도 있고,
          블로그에서는 좀 더 부드럽고 자연스러운 흐름이 요구될 수도 있습니다.
          따라서, 작업하는 콘텐츠 유형에 맞게 적절한 문장을 추가하는 것이
          중요합니다. 이곳에 들어갈 내용이 준비되면 즉시 교체해 주세요.
        </p>
      </div>
    </div>
  );
}

export default MyInfoManagement;
