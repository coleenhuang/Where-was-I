import React from 'react';

//implement onClick handler to indicate read status
//Half circle for in progress, circle for read

const Chapter = (props) => {
    return (
        <div className='chapter'>
            {props.num}
        </div>
    )
}

export default Chapter;