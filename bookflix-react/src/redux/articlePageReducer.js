const SET_ARTICLE_NAME = 'SET_ARTICLE_NAME';
const SET_ARTICLE_AUTHOR = 'SET_ARTICLE_AUTHOR';
const SET_BOOK_AUTHOR = 'SET_BOOK_AUTHOR';
const SET_BOOK_NAME = 'SET_BOOK_NAME';
const SET_GENRE = 'SET_GENRE';
const SET_DATE = 'SET_DATE';
const SET_LIKED = 'SET_LIKED';
const SET_COUNT_LIKES = 'SET_COUNT_LIKES';

const initialState = {
    articleName: '',
    articleAuthor: '',
    bookAuthor: '',
    bookName: '',
    genre: '',
    date: '',
    liked: false,
    countLikes: 0,
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
        case SET_GENRE:
            return {
                ...state,
                genre: action.payload,
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
export const setGenre = (genre) => ({ type: SET_GENRE, payload: genre });
export const setDate = (date) => ({ type: SET_DATE, payload: date });
export const setLiked = (liked) => ({ type: SET_LIKED, payload: liked });
export const setCountLikes = (likes) => ({ type: SET_COUNT_LIKES, payload: likes });

export default ArticlePageReducer;
