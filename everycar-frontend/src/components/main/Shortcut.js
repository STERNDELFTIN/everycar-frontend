import React from 'react';

import '../../css/main/Shortcut.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faCalendarCheck, faCommentDots, faFileSignature } from '@fortawesome/free-solid-svg-icons';

{/* Service Shortcut */}
function Shortcut() {
    return(
        <div className='service-shortcut'>
            <h4 className='service-shortcut-title'>서비스<br />바로가기</h4>
            <div className='shortcut-container'>
                <ShortcutBox
                    ico={ faCalendarCheck }
                    title='예약확인'
                />
                <ShortcutBox
                    ico={ faGift }
                    title='이벤트'
                />
                <ShortcutBox
                    ico={ faCommentDots }
                    title='상담하기'
                />
                <ShortcutBox
                    ico={ faFileSignature }
                    title='견적확인'
                />
            </div>
        </div>
    );
}
function ShortcutBox({ ico, title }) {
    return (
        <div className='shortcut-box'>
            <FontAwesomeIcon icon={ ico } style={{ fontSize: "30px" }} />
            <p>{ title }</p>
        </div>
    );
}

export default Shortcut;