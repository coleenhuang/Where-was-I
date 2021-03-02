import React, {useEffect} from 'react';
import Book from './Book';
import { connect } from 'react-redux';
import * as actions from '../actions'


const Chart = (props) => {
    useEffect(() => {
        props.fetchBooks()
        return () => {
            //clean up books
            props.clearBooks();
        };
    }, [])

    return (
        <div className='chart'>
            {renderBooks(props.bookList)}
        </div>
    )
}

function renderBooks(bookList) {
    if (bookList.length > 0) {
        return bookList.map((book, index) => (
            <Book key={`book${index}`} name={book.book_name} chapts={book.num_of_chapts}/>
        ))
    }
    else {
        return null
    }
}

function mapStateToProps(state) {
    return {
        bookList: state.books
    }
}

export default connect(mapStateToProps, actions)(Chart);