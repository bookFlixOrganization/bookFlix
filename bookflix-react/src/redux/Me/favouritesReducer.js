const SET_FAVOURITES_BOOKS = 'SET_FAVORUITES_BOOKS';
const SET_FAVOURITES_FILMS = 'SET_FAVOURITES_FILMS';

const initialState = {
    favourites_books: [],
    favourites_films: [],
};

const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FAVOURITES_BOOKS:
            return {
                ...state,
                favourites_books: action.payload,
            };
        case SET_FAVOURITES_FILMS:
            return {
                ...state,
                favourites_films: action.payload,
            };
        default:
            return state;
    }
};

export const setFavouritesBooks = (books) => ({
    type: SET_FAVOURITES_BOOKS,
    payload: books,
});

export const setFavouritesFilms = (films) => ({
    type: SET_FAVOURITES_FILMS,
    payload: films,
});

export default favouritesReducer;
