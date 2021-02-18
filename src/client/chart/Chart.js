import React, {useEffect} from 'react';
import Book from './Book';
import { connect } from 'react-redux';
import * as actions from '../actions'

//container for the books and chapters
//Get a list of books from the api

const Chart = (props) => {
    const bookList = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy']
    useEffect(() => {
        props.fetchBooks()
    }, [])
    console.log(props.bookList)
    return (
        <div>
            Chart
            {renderBooks(props.bookList)}
        </div>
    )
}

function renderBooks(bookList) {
    if (bookList.length > 0) {
        return bookList.map(book => (
            <Book name={book.book_name} chapts={book.num_of_chapts}/>
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