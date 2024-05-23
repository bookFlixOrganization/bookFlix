const SET_HISTORY_BOOKS = 'SET_POPULAR_BOOKS';
const SET_HISTORY_FILMS = 'SET_POPULAR_FILMS';

const initialState = {
    history_books: [],
    history_films: [],
};

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HISTORY_BOOKS:
            return {
                ...state,
                history_books: action.payload,
            };
        case SET_HISTORY_FILMS:
            return {
                ...state,
                history_films: action.payload.result,
            };
        default:
            return state;
    }
};

export const setHistoryBooks = (books) => ({
    type: SET_HISTORY_BOOKS,
    payload: books,
});

export const setHistoryFilms = (films) => ({
    type: SET_HISTORY_FILMS,
    payload: films,
});

export default historyReducer;
