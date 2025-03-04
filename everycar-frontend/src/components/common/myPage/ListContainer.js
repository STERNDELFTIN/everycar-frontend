import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/common/myPage/ListContainer.module.scss';

function ListContainer() {
    const navigate = useNavigate();

    const [selectedList, setSelectedList] = useState(0); // 리스트 선택

    const selectedListHandler = (i) => { // 리스트 선택했을 경우, 해당 페이지 이동 및 배경색 변경
        setSelectedList(i);
        if (i === 0) navigate('/myPage/info');
        if (i === 1) navigate('/myPage/history');
        if (i === 2) navigate('/myPage/pay');
    };

    const menuList = [
        {
            id: 0,
            name: "내 정보 관리",
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="#1D1B20" />
                </svg>
            ),
        },
        {
            id: 1,
            name: "내 예약 내역",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" href="http://www.w3.org/1999/xlink">
                    <rect width="20" height="20" fill="url(#pattern0_474_912)" />
                    <defs>
                        <filter id="thicker" x="-50%" y="-50%" width="200%" height="200%">
                            <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="THICK" />
                            <feGaussianBlur in="THICK" stdDeviation="2" result="BLURRED" />
                            <feMerge>
                                <feMergeNode in="BLURRED" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <pattern id="pattern0_474_912" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use href="#image0_474_912" transform="scale(0.00195313)" />
                        </pattern>
                        <image filter="url(#thicker)" id="image0_474_912" width="512" height="512" preserveAspectRatio="none" href="data:image/png;base64,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AsAJEDVADVAD1EAnNfDjEX2PIWcFwk8BPtZJ4ns4eyUGvgujBqgBamBbDXyU7/7Tz22+Q1L4k4kUHQbUADVADVADLdZA6GHhbxHwsUHgnZwAcAJEDVAD1AA10GgNvGND3+OQswJXSPpso4lv8WyVPfNdFjVADVADeWrgHklfRTffJ/DSk7/Kd4aTAL4DoAaoAWqAGmikBkLPesW+1sfRk8CvNJJ0zpzznDnjiCM1QA20XAP/fWpe3O4XeKykD3MSwNk/NUANUAPUQOU18Of8pdj9TX8+w9Ml3V154ls+Y2XvfMdFDVAD1MC+GrhL0tfPmxf38whcJekLnATwHQA1QA1QA9RAZTUQetO352l1zHJI4EWSHqgs8Zw17ztrxg8/aoAaaLkGHjz5NfW/P9S0eDyvQPijCrxJEC8YLb9gsHfqlxroowZCL/qRvC2O2dYEflDS/fwkgB8DUgPUADVADTjVQPjOn7/yt9atjZ4Pvw74vFPiOXvv4+ydPJJHaoAa2FID90p6sVFvY9pIgedICldebkkgx+BGDVAD1AA1kFoDd0oKvYePCgS+TtKHOAngJIgaoAaoAWrAuAY+IukZFfQ9tnBK4DEnn1/PxYF88Rt/8ad+p8B4vrukBvqogfD2vr/Gm/yc6roVfvpy/oAQJwGcBFAD1AA1kLEGwh/2eVmF/Y4tLQg85eyZGv9VsI8zb76DIo/UADXgUQPhu/4bJF250Gd4qHKBcJFG+H2NR+GwJu7UADVADbRbAx+T9F2V9zi2tyJwiaTXSfoUJwKcCFED1AA1QA2s1MDtkn5cUugdfHQicPHZ3+F8dCX5nLG3e8ZO7sgdNUANbK2BWyW9VlK4oJyPTgUukvQSSTdKuo+TAb4boAaoAWpg2BoIPeDdZ3tC6A18DCRwuaTrJN0k6SFeBIZ9Edj6HQPH8d0mNdBeDYTX+vCaH341HHoAHwjoiZK+T9IvSLqZ9xPgZIATQmqAGuimBj4t6e2SXinpyfQ7BNYELpV01cnFg6+W9HOS3nP23QY/ISkU0+ckhT8EwXcAGFAD1AA14FMD4TU4vBaH1+Tw2hzeETb8eje8ZofX7vA/wcJrOR8IIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIILBR4P8DzAEefUYU46sAAAAASUVORK5CYII=" />
                    </defs>
                </svg>
            ),
        },
        {
            id: 2,
            name: '결제 및 정산',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_474_908)">
                        <path d="M0.833496 8.33325H19.1668M2.50016 3.33325H17.5002C18.4206 3.33325 19.1668 4.07944 19.1668 4.99992V14.9999C19.1668 15.9204 18.4206 16.6666 17.5002 16.6666H2.50016C1.57969 16.6666 0.833496 15.9204 0.833496 14.9999V4.99992C0.833496 4.07944 1.57969 3.33325 2.50016 3.33325Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_474_908">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            ),
        }
    ];

    useEffect(() => {

    }, [selectedList]);

    return (
        <div className={styles.listContainer}>
            <ul className={styles.myPageList}>
                {
                    menuList.map((item, i) => (
                        <div
                            key={i}
                            className={`${styles.listBox} ${selectedList === i ? styles.selected : ""}`}
                            onClick={() => selectedListHandler(i)}>
                            {item.icon}
                            <li>{item.name}</li>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}

export default ListContainer;