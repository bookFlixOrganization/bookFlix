const SET_MY_ARTICLES = 'SET_MY_ARTICLES';

const initialState = {
    myArticles: null,
};

const myArticlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_ARTICLES:
            return {
                ...state,
                myArticles: action.payload,
            };
        default:
            return state;
    }
};

export const setMyArticles = (articles) => ({ type: SET_MY_ARTICLES, payload: articles });

export default myArticlesReducer;
