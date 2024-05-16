const SET_POPULAR_BOOKS = 'SET_POPULAR_BOOKS';

const initialState = {
    popular_books: null,
};

const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POPULAR_BOOKS:
            return {
                ...state,
                popular_books: action.payload.result,
            };
        default:
            return state;
    }
};

export const setPopularBooks = (popular_books) => ({
    type: SET_POPULAR_BOOKS,
    payload: popular_books,
});

export default mainPageReducer;
