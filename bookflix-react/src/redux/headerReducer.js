const SET_REQUEST = 'SET_REQUEST';

const initialState = {
    request: '',
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REQUEST:
            return {
                ...state,
                request: action.payload,
            };
        default:
            return state;
    }
};

export const setRequest = (request) => ({ type: SET_REQUEST, payload: request });

export default headerReducer;
