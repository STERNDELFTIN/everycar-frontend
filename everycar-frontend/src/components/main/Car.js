import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import '../../css/main/Car.css';

{/* 국내 인기 차량 */}
const CarBoxStyle = styled.div`background-color: #FFFFFF; border-radius: 20px; text-align: left; padding: 30px 25px; cursor: pointer; `;

function Car({ title, TitleStyle }) {
    const [cars, setCars] = useState([]);

    useEffect(()=>{
        // 비동기로 JSON 데이터 가져오기
        axios.get('json/cars.json')
        .then(result => {
            console.log(result.data);
            setCars(result.data.popular_cars);
        })
        .catch(error => {
            console.error('데이터 가져올 수 없음 : ', error);
        });
    }, []);

    return(
        <div className='domestic-popular-car'>
            <TitleStyle>{ title }</TitleStyle>
            <div className='car-container'>
                {
                    cars.map((car, i)=>{
                        return <CarBox key={i} car={car} />
                    })
                }
            </div>
        </div>
    );
}
function CarBox({ car }) {
    const [carDescription] = useState([
        { title: '등급', content: car.grade },
        { title: '연료', content: car.fuel },
        { title: '승차인원', content: car.capacity }
    ]); 

    return (
        <CarBoxStyle className='car-box'>
            <div className='car-image' style={{ display:'flex', justifyContent:'center', margin:'0 auto', marginBottom:'25px' }}><img src={car.img} alt={car.name} style={{ width:"clamp(90px, 8vw, 150px)", height:"auto" }} /></div>
            
            <div className='car-div'></div>

            <div className='car-description'>
                <h4 style={{ fontSize:"clamp(11px, 1.3vw, 36px)", color:"#000000", marginBottom:'10px' }}>{car.name}</h4>

                <div style={{ fontSize:"clamp(8px, 1vw, 32px)", display:'flex', color: '#2F2F2F', gap:'20px' }}>
                    <div className='car-title-container'>
                        {
                            carDescription.map((item, i) => {
                                return (
                                    <p key={i} style={{ opacity:'50%' }}>{item.title}</p>
                                )
                            })
                        }    
                    </div>
                    <div className='car-content-container'>
                        {
                            carDescription.map((item, i) => {
                                return (
                                    <p key={i}>{item.content}</p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </CarBoxStyle>
    );
}

export default Car;