import React from 'react';
import Chapter from './Chapter';
import Container from '@material-ui/core/Container'

//Get a list of chapters for each book
//Shrink and display for chapters

const Book = (props) => {
    return (
        <Container className='book' maxWidth='md'>
            <h2 className='book-name'>{props.name}</h2>
            <div className='chapt-grid'>
                {renderChapters(props.chapts)}
            </div>
            
        </Container>
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