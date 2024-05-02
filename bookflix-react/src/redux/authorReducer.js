const SET_NAME = 'SET_AUTHOR_NAME';
const SET_SUBSCRIBED = 'SET_SUBSCRIBED';
const SET_NUMBER = 'SET_NUMBER';

const initialState = {
    name: '',
    isSubscribed: false,
    numberOfArticles: 0,
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
        case SET_NUMBER:
            return {
                ...state,
                numberOfArticles: action.payload,
            };
        default:
            return state;
    }
};

export const setName = (name) => ({ type: SET_NAME, payload: name });
export const setSubscribed = (isSubscribed) => ({ type: SET_SUBSCRIBED, payload: isSubscribed });
export const setNumber = (number) => ({ type: SET_NUMBER, payload: number });

export default authorReducer;
