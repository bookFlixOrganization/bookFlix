const SET_ID = 'SET_ID';
const SET_NAME = 'SET_BOOK_NAME';
const SET_AUTHOR = 'SET_AUTHOR';
const SET_DESCRIPTION = 'SET_DESCRIPTION';
const SET_DATE = 'SET_DATE';
const SET_GENRE = 'SET_GENRE';
const SET_NUMBER_PAGES = 'SET_NUMBER_PAGES';
const SET_LANGUAGE = 'SET_LANGUAGE';
const SET_RATING_BOOKFLIX = 'SET_RATING';
const SET_RATING_GOOGLE = 'SET_RATING_GOOGLE';
const SET_COVER_URL = 'SET_COVER_URL';
const SET_BUY_URL = 'SET_BUY_URL';
const SET_SHORT_CONTENT = 'SET_SHORT_CONTENT';
const CLEAR_CONTENT = 'CLEAR_CONTENT';

const initialState = {
    id: '',
    name: '',
    author: '',
    description: '',
    date: '',
    genre: '',
    numberOfPages: '',
    language: '',
    rating_bookflix: 0.0,
    rating_google: 0.0,
    cover_url: '',
    buy_url: '',
    shortContent: '',
};

const bookPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                id: action.payload,
            };
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case SET_AUTHOR:
            return {
                ...state,
                author: action.payload,
            };
        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
            };
        case SET_DATE:
            return {
                ...state,
                date: action.payload,
            };
        case SET_GENRE:
            return {
                ...state,
                genre: action.payload,
            };
        case SET_NUMBER_PAGES:
            return {
                ...state,
                numberOfPages: action.payload,
            };
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            };
        case SET_RATING_BOOKFLIX:
            return {
                ...state,
                rating_bookflix: action.payload,
            };
        case SET_RATING_GOOGLE:
            return {
                ...state,
                rating_google: action.payload,
            };
        case SET_COVER_URL:
            return {
                ...state,
                cover_url: action.payload,
            };
        case SET_BUY_URL:
            return {
                ...state,
                buy_url: action.payload,
            };
        case SET_SHORT_CONTENT:
            return {
                ...state,
                shortContent: action.payload,
            };
        case CLEAR_CONTENT:
            return initialState;
        default:
            return state;
    }
};

export const setId = (id) => ({ type: SET_ID, payload: id });
export const setName = (name) => ({ type: SET_NAME, payload: name });
export const setAuthor = (author) => ({ type: SET_AUTHOR, payload: author });
export const setDescription = (description) => ({ type: SET_DESCRIPTION, payload: description });
export const setDate = (date) => ({ type: SET_DATE, payload: date });
export const setGenre = (genre) => ({ type: SET_GENRE, payload: genre });
export const setNumberOfPages = (numberOfPages) => ({
    type: SET_NUMBER_PAGES,
    payload: numberOfPages,
});
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });
export const setRatingBookflix = (rating) => ({ type: SET_RATING_BOOKFLIX, payload: rating });
export const setRatingGoogle = (rating) => ({ type: SET_RATING_GOOGLE, payload: rating });
export const setCoverUrl = (coverUrl) => ({ type: SET_COVER_URL, payload: coverUrl });
export const setBuyUrl = (buyUrl) => ({ type: SET_BUY_URL, payload: buyUrl });
export const setShortContent = (text) => ({ type: SET_SHORT_CONTENT, payload: text });
export const clearContent = () => ({ type: CLEAR_CONTENT });

export default bookPageReducer;
