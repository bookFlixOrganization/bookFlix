const SET_NAME = 'SET_AUTHOR_NAME';
const SET_SUBSCRIBED = 'SET_SUBSCRIBED';
const SET_AUTHOR_ARTICLES = 'SET_AUTHOR_ARTICLES';

const initialState = {
    name: '',
    isSubscribed: -1,
    authorArticles: null,
};

const authorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case SET_SUBSCRIBED:
            return {
                ...state,
                isSubscribed: action.payload,
            };
        case SET_AUTHOR_ARTICLES:
            return {
                ...state,
                authorArticles: action.payload,
            };
        default:
            return state;
    }
};

export const setName = (name) => ({ type: SET_NAME, payload: name });
export const setSubscribed = (isSubscribed) => ({ type: SET_SUBSCRIBED, payload: isSubscribed });
export const setAuthorArticles = (articles) => ({ type: SET_AUTHOR_ARTICLES, payload: articles });

export default authorReducer;
