import axios from 'axios';
import { FETCH_BOOKS, CLEAR_BOOKS, UPDATE_CHAPTER } from './types';

export function fetchBooks() {
    const response = axios.get('http://localhost:8080/api/books');
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

export function updateChapter() {
    return {
        type: UPDATE_CHAPTER
        //send the userid and the specific chapter to the api
    }
}