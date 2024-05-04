const SET_MARK = 'SET_MARK';
const SET_TEXT = 'SET_TEXT';

const initialState = {
    mark: 0,
    text: '',
};

const bookPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MARK:
            return {
                ...state,
                mark: action.payload,
            };
        case SET_TEXT:
            return {
                ...state,
                text: action.payload,
            };

        default:
            return state;
    }
};

export const setMark = (mark) => ({ type: SET_MARK, payload: mark });
export const setText = (text) => ({ type: SET_TEXT, payload: text });

export default bookPageReducer;
