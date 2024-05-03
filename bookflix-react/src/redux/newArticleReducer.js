const SET_ARTICLE_NAME = 'SET_ARTICLE_NAME';
const SET_BOOK_NAME = 'SET_BOOK_NAME';
const SET_TEXT = 'SET_TEXT';

const initialState = {
    articleName: '',
    bookName: '',
    text: '',
};

const authorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTICLE_NAME:
            return {
                ...state,
                articleName: action.payload,
            };
        case SET_BOOK_NAME:
            return {
                ...state,
                bookName: action.payload,
            };
        case SET_TEXT:
            return {
                ...state,
                text: action.payload,
            };
        default:
            return state;
    }
};

export const setArticleName = (articleName) => ({ type: SET_ARTICLE_NAME, payload: articleName });
export const setBookName = (bookName) => ({ type: SET_BOOK_NAME, payload: bookName });
export const setText = (text) => ({ type: SET_TEXT, payload: text });

export default authorReducer;
