import React from 'react';
import Book from './Book';
//container for the books and chapters
//Get a list of books from the api

const Chart = () => {
    const bookList = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy']
    
    return (
        <div>
            Chart
            {bookList.map(book => (
            <Book name={book}/>
        ))}
        </div>
    )
}

export default Chart;