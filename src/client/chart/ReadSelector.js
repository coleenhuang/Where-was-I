import React from 'react';

export default (props) => {
    return (
        <div className='read-selector'>
            <button> All</button>
            <label for="verse-start">Verse Start</label>
            <select id="verse-start">
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <label for="verse-end">Verse End</label>
            <select id="verse-end">
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <button onClick={props.close}>Done</button>
        </div>
    )
}