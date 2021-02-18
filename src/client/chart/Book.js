import React from 'react';
import Chapter from './Chapter';

//Get a list of chapters for each book
//Shrink and display for chapters

const Book = (props) => {
    return (
        <div className='book-name'>
            {props.name}
            {renderChapters(props.chapts)}
        </div>
    )
}

function renderChapters(bookChapts) {
    let chaptList = [];
    for (let i = 1; i<= bookChapts; i++) {
        chaptList.push(<Chapter num={i} />)
    }
    return chaptList
}

export default Book;