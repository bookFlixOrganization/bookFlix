const SET_POPULAR_BOOKS = 'SET_POPULAR_BOOKS';
const SET_POPULAR_FILMS = 'SET_POPULAR_FILMS';

const initialState = {
    popular_books: null,
    popular_films: null,
};

const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POPULAR_BOOKS:
            return {
                ...state,
                popular_books: action.payload.result,
            };
        case SET_POPULAR_FILMS:
            return {
                ...state,
                popular_films: action.payload.result,
            };
        default:
            return state;
    }
};

export const setPopularBooks = (popular_books) => ({
    type: SET_POPULAR_BOOKS,
    payload: popular_books,
});

export const setPopularFilms = (popular_films) => ({
    type: SET_POPULAR_FILMS,
    payload: popular_films,
});

export default mainPageReducer;
