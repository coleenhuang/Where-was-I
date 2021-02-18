import { CLEAR_BOOKS, FETCH_BOOKS } from '../actions/types';

export default function booksReducer(state = [], action) {
    switch(action.type) {
        case FETCH_BOOKS:
            return [...state, ...action.payload.data]
        case CLEAR_BOOKS: 
                return []
        default:
            return state
    }
}