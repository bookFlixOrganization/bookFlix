const SET_POPULAR_BOOKS = 'SET_POPULAR_BOOKS';
const SET_POPULAR_FILMS = 'SET_POPULAR_FILMS';
const SET_PERSON_BOOKS = 'SET_PERSON_BOOKS';
const SET_PERSON_FILMS = 'SET_PERSON_FILMS';
const SET_FAVOURITE = 'SET_FAVOURITE';

const initialState = {
    person_books: null,
    person_films: null,
    popular_books: null,
    popular_films: null,
    favourite: null,
};

const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POPULAR_BOOKS:
            return {
                ...state,
                popular_books: action.payload,
            };
        case SET_POPULAR_FILMS:
            return {
                ...state,
                popular_films: action.payload.result,
            };
        case SET_PERSON_BOOKS:
            return {
                ...state,
                person_books: action.payload,
            };
        case SET_PERSON_FILMS:
            return {
                ...state,
                person_films: action.payload,
            };
        case SET_FAVOURITE:
            return {
                ...state,
                favourite: action.payload,
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

export const setPersonBooks = (person_books) => ({
    type: SET_PERSON_BOOKS,
    payload: person_books,
});

export const setPersonFilms = (person_films) => ({
    type: SET_PERSON_FILMS,
    payload: person_films,
});

export const setFavourites = (favourites) => ({
    type: SET_FAVOURITE,
    payload: favourites,
});

export default mainPageReducer;
