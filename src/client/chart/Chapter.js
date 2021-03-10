import React, {useState} from 'react';
import ReadSelector from './ReadSelector';

//implement onClick handler to indicate read status
//Half circle for in progress, circle for read

const Chapter = (props) => {
    const [read, setRead] = useState('unread')

    //show and hide selector for verses
    const [selector, setSelector] = useState(false)
    const handleClick = () => {
       
        if (read === 'unread') {
            setRead('in-progress')
            setSelector(!selector)
        }
        else if (read === 'in-progress') {
            setRead('read')
            setSelector(!selector)
        }
        else {
            setRead('unread')
        }
        

    }
    const closeSelector = () => {
        setSelector(!selector)
    }
    return (
        <div className={`chapter-shape ${read}`} onClick={handleClick}>
                <p>{props.num}</p>
                {selector? <ReadSelector close={closeSelector}/> : null}
        </div>
    )
}

export default Chapter;