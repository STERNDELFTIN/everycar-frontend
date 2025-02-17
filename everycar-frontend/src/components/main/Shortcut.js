import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/main/Shortcut.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faCalendarCheck, faCommentDots, faFileSignature } from '@fortawesome/free-solid-svg-icons';

{/* Service Shortcut */}
function Shortcut() {
    return(
        <div className='service-shortcut'>
            <h4 className='service-shortcut-title'>서비스<br />바로가기</h4>
            <nav className='shortcut-container'>
                <ShortcutBox
                    to='/' /* URL 연동 */
                    ico={ faCalendarCheck }
                    title='예약확인'
                />
                <ShortcutBox
                    to='/'
                    ico={ faGift }
                    title='이벤트'
                />
                <ShortcutBox
                    to='/'
                    ico={ faCommentDots }
                    title='상담하기'
                />
                <ShortcutBox
                    to='/'
                    ico={ faFileSignature }
                    title='견적확인'
                />
            </nav>
        </div>
    );
}
function ShortcutBox({ to, ico, title }) {
    return (
        <Link className='shortcut-box' to={to}>
            <FontAwesomeIcon icon={ ico } style={{ fontSize: "clamp(17px, 2vw, 40px)" }} />
            <p>{ title }</p>
        </Link>
    );
}

export default Shortcut;