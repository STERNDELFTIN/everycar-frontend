import TimeList from './TimeList';

function SelectableTimeList({ title, setTime }) {
    const timeList = TimeList();

    return (
        <div className='selected-time'>
            <h5>{ title }</h5>
            <select onChange={(e) => setTime(e.target.value)}>
            <option></option>
                {
                    timeList.map((time, i) => (
                        <option key={i} value={time}>
                            {time}
                        </option>
                    ))
                }
            </select>
        </div>
    );

}

export default SelectableTimeList;