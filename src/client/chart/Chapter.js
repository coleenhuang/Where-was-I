import React, {useState} from 'react';

//implement onClick handler to indicate read status
//Half circle for in progress, circle for read

const Chapter = (props) => {
    const [read, setRead] = useState('unread')
    const handleClick = () => {
        if (read === 'unread') {
            setRead('in-progress')
        }
        else if (read === 'in-progress') {
            setRead('read')
        }
        else {
            setRead('unread')
        }

    }
    return (
        <div className={`chapter-shape ${read}`} onClick={handleClick}>
            <p className='chapter'>
                {props.num}
            </p>
        </div>
    )
}

export default Chapter;