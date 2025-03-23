import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

import '../../css/main/Shortcut.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faCalendarCheck, faCommentDots, faFileSignature } from '@fortawesome/free-solid-svg-icons';

{/* Service Shortcut */ }
function Shortcut() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className='service-shortcut' data-aos="fade-up" data-aos-duration="1000">
            <h4 className='service-shortcut-title'>서비스<br />바로가기</h4>
            <nav className='shortcut-container'>
                <ShortcutBox
                    to='/myPage/history' /* URL 연동 */
                    ico={faCalendarCheck}
                    title='예약확인'
                />
                <ShortcutBox
                    to='/support/event'
                    ico={faGift}
                    title='이벤트'
                />
                <ShortcutBox
                    to='/support/inquiry'
                    ico={faCommentDots}
                    title='상담하기'
                />
                <ShortcutBox
                    to='/support/Estimate'
                    ico={faFileSignature}
                    title='견적확인'
                />
            </nav>
        </div>
    );
}
function ShortcutBox({ to, ico, title }) {
    return (
        <Link className='shortcut-box' to={to}>
            <FontAwesomeIcon icon={ico} style={{ fontSize: "clamp(17px, 2vw, 40px)" }} />
            <p>{title}</p>
        </Link>
    );
}

export default Shortcut;