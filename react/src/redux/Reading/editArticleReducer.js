const SET_ARTICLE_NAME = 'SET_ARTICLE_NAME';
const SET_BOOK_NAME = 'SET_BOOK_NAME';
const SET_TEXT = 'SET_TEXT';
const CLEAR_EDITING_CONTENT = 'CLEAR_EDITING_CONTENT';

const initialState = {
    articleName: '',
    bookName: '',
    text: '',
};

const newArticleReducer = (state = initialState, action) => {
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
        case CLEAR_EDITING_CONTENT:
            return initialState;
        default:
            return state;
    }
};

export const setArticleName = (articleName) => ({ type: SET_ARTICLE_NAME, payload: articleName });
export const setBookName = (bookName) => ({ type: SET_BOOK_NAME, payload: bookName });
export const setText = (text) => ({ type: SET_TEXT, payload: text });
export const clearEditingArticle = () => ({ type: CLEAR_EDITING_CONTENT });

export default newArticleReducer;
