const SET_MY_SUBS = 'SET_MY_SUBS';

const initialState = {
    mySubs: null,
};

const subscribesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_SUBS:
            return {
                ...state,
                mySubs: action.payload,
            };
        default:
            return state;
    }
};

export const setMySubs = (subs) => ({ type: SET_MY_SUBS, payload: subs });

export default subscribesReducer;
