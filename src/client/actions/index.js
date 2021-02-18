import axios from 'axios';
import { FETCH_BOOKS, CLEAR_BOOKS } from './types';

export function fetchBooks() {
    const response = axios.get('http://localhost:8080/books');
    return {
        type: FETCH_BOOKS,
        payload: response
    }
}

export function clearBooks() {
    return {
        type: CLEAR_BOOKS
    }
}