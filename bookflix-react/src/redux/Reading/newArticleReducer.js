const SET_NEW_ARTICLE_NAME = 'SET_NEW_ARTICLE_NAME';
const SET_NEW_ARTICLE_BOOK_ID = 'SET_NEW_ARTICLE_BOOK_ID';
const SET_NEW_ARTICLE_BOOK_NAME = 'SET_NEW_ARTICLE_BOOK_NAME';
const SET_NEW_ARTICLE_TEXT = 'SET_NEW_ARTICLE_TEXT';
const SET_NEW_ARTICLE_HANDLE_BOOK_NAME = 'SET_NEW_ARTICLE_HANDLE_BOOK_NAME';
const CLEAR_NEW_ARTICLE = 'CLEAR_NEW_ARTICLE';

const initialState = {
    articleName: '',
    bookId: '',
    bookName: '',
    text: '',
    handleBookName: '',
};

const newArticleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_ARTICLE_NAME:
            return {
                ...state,
                articleName: action.payload,
            };
        case SET_NEW_ARTICLE_BOOK_ID:
            return {
                ...state,
                bookId: action.payload,
            };
        case SET_NEW_ARTICLE_BOOK_NAME:
            return {
                ...state,
                bookName: action.payload,
            };
        case SET_NEW_ARTICLE_TEXT:
            return {
                ...state,
                text: action.payload,
            };
        case SET_NEW_ARTICLE_HANDLE_BOOK_NAME:
            return {
                ...state,
                handleBookName: action.payload,
            };
        case CLEAR_NEW_ARTICLE:
            return initialState;
        default:
            return state;
    }
};

export const setArticleName = (articleName) => ({
    type: SET_NEW_ARTICLE_NAME,
    payload: articleName,
});
export const setBookName = (bookName) => ({ type: SET_NEW_ARTICLE_BOOK_NAME, payload: bookName });
export const setBookId = (bookId) => ({ type: SET_NEW_ARTICLE_BOOK_ID, payload: bookId });
export const setText = (text) => ({ type: SET_NEW_ARTICLE_TEXT, payload: text });
export const setHandleBookName = (handleBookName) => ({
    type: SET_NEW_ARTICLE_HANDLE_BOOK_NAME,
    payload: handleBookName,
});
export const clearNewArticle = () => ({ type: CLEAR_NEW_ARTICLE });

export default newArticleReducer;
