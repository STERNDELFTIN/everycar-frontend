import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useEligibilityCheck = () => {
    const { isLoggedIn, birthDate, licenseIssuedDate } = useSelector((state) => state.user);
    const [isEligible, setIsEligible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // 자격여부 체크
    const checkEligibility = () => {
        
        // 로그인 여부
        if (!isLoggedIn) { // 로그인 되지 않은 상태
            setErrorMessage("로그인이 필요합니다.");
            setIsEligible(false); // 자격이 미충족
            return;
        }

        // 나이 충족 여부
        const today = new Date();

        if (birthDate) {
            const birth = new Date(birthDate);
            const age = today.getFullYear() - birth.getFullYear(); // 나이 계산
            const isAgeEnough = (age > 26) || (age === 26 && today >= new Date(birth.setFullYear(birth.getFullYear() + 26)));

            if (!isAgeEnough) {
                setErrorMessage("만 26세 이상만 예약이 가능합니다.");
                setIsEligible(false); // 자격 미충족
                return;
            }
        }

        // 운전면허 발급 후 1년 이상 충족 여부
        if (licenseIssuedDate) {
            const licenseDate = new Date(licenseIssuedDate); // 면허발급 일자
            const dateAfterOneYear = new Date(licenseDate);

            dateAfterOneYear.setFullYear(licenseDate.getFullYear() + 1); // 면허발급 후 1년

            const hasValidLicenseQualification = (today >= dateAfterOneYear); // 면허 발급한지 1년 지났는지 여부

            if (!hasValidLicenseQualification) {
                setErrorMessage("운전면허 취득 후 1년 이상 지나야 예약할 수 있습니다.");
                setIsEligible(false); // 자격 미충족
                return;
            }
        }

        // 모든 조건 충족
        setIsEligible(true); // 자격 모두 충족
        setErrorMessage("");
    }

    useEffect(() => {
        checkEligibility();
    }, [isLoggedIn, birthDate, licenseIssuedDate]);

    return { isEligible, errorMessage };
};

export default useEligibilityCheck;