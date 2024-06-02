const SET_ARTICLE_NAME = 'SET_ARTICLE_NAME';
const SET_ARTICLE_AUTHOR = 'SET_ARTICLE_AUTHOR';
const SET_BOOK_AUTHOR = 'SET_BOOK_AUTHOR';
const SET_BOOK_NAME = 'SET_BOOK_NAME';
const SET_DATE = 'SET_DATE';
const SET_LIKED = 'SET_LIKED';
const SET_COUNT_LIKES = 'SET_COUNT_LIKES';
const SET_ARTICLE_TEXT = 'SET_ARTICLE_TEXT';
const SET_ARTICLE_AUTHOR_ID = 'SET_ARTICLE_AUTHOR_ID';
const SET_IS_SUB = 'SET_IS_SUB';

const initialState = {
    articleName: '',
    articleAuthor: '',
    articleAuthorId: '',
    bookAuthor: '',
    bookName: '',
    date: '',
    liked: -2,
    countLikes: 0,
    articleText: '',
    isSub: -2,
};

const ArticlePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTICLE_NAME:
            return {
                ...state,
                articleName: action.payload,
            };
        case SET_ARTICLE_AUTHOR:
            return {
                ...state,
                articleAuthor: action.payload,
            };
        case SET_BOOK_AUTHOR:
            return {
                ...state,
                bookAuthor: action.payload,
            };
        case SET_BOOK_NAME:
            return {
                ...state,
                bookName: action.payload,
            };
        case SET_DATE:
            return {
                ...state,
                date: action.payload,
            };
        case SET_LIKED:
            return {
                ...state,
                liked: action.payload,
            };
        case SET_COUNT_LIKES:
            return {
                ...state,
                countLikes: action.payload,
            };
        case SET_ARTICLE_TEXT:
            return {
                ...state,
                articleText: action.payload,
            };
        case SET_ARTICLE_AUTHOR_ID:
            return {
                ...state,
                articleAuthorId: action.payload,
            };
        case SET_IS_SUB:
            return {
                ...state,
                isSub: action.payload,
            };
        default:
            return state;
    }
};

export const setArticleName = (articleName) => ({ type: SET_ARTICLE_NAME, payload: articleName });
export const setArticleAuthor = (articleAuthor) => ({
    type: SET_ARTICLE_AUTHOR,
    payload: articleAuthor,
});
export const setBookAuthor = (bookAuthor) => ({ type: SET_BOOK_AUTHOR, payload: bookAuthor });
export const setBookName = (bookName) => ({ type: SET_BOOK_NAME, payload: bookName });
export const setDate = (date) => ({ type: SET_DATE, payload: date });
export const setLiked = (liked) => ({ type: SET_LIKED, payload: liked });
export const setCountLikes = (likes) => ({ type: SET_COUNT_LIKES, payload: likes });
export const setArticleText = (text) => ({ type: SET_ARTICLE_TEXT, payload: text });
export const setAuthorId = (id) => ({ type: SET_ARTICLE_AUTHOR_ID, payload: id });
export const setIsSub = (sub) => ({ type: SET_IS_SUB, payload: sub });

export default ArticlePageReducer;
