import React from 'react';
import { useDispatch } from 'react-redux';
import { setStartTime, setEndTime } from '../../redux/rentSlice.js'; // Redux actions import
import TimeList from './TimeList';

function SelectableTimeList({ title, type }) {
    const dispatch = useDispatch();
    const timeList = TimeList();

    const handleChange = (e) => {
        const selectedTime = e.target.value;

        if (type === 'start') {
            dispatch(setStartTime(selectedTime));
        } else if (type === 'end') {
            dispatch(setEndTime(selectedTime));
        }
    };

    return (
        <div className='selected-time'>
            <h5>{title}</h5>
            <select onChange={handleChange}>
                <option value=""></option>
                {timeList.map((time, i) => (
                    <option key={i} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectableTimeList;
