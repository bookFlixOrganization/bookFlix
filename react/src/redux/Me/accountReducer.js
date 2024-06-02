const SET_ACC_EMAIL = 'SET_ACC_EMAIL';
const SET_ACC_PASSWORD = 'SET_ACC_PASSWORD';
const SET_ACC_ID = 'SET_ACC_ID';
const CLEAR_FORM = 'CLEAR_FORM';

const initialState = {
    acc_id: '',
    acc_email: '',
    acc_password: '',
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACC_EMAIL:
            return {
                ...state,
                acc_email: action.payload,
            };
        case SET_ACC_PASSWORD:
            return {
                ...state,
                acc_password: action.payload,
            };
        case SET_ACC_ID:
            return {
                ...state,
                acc_id: action.payload,
            };
        case CLEAR_FORM:
            return {
                initialState,
            };
        default:
            return state;
    }
};

export const setAccEmail = (email) => ({ type: SET_ACC_EMAIL, payload: email });
export const setAccPassword = (password) => ({ type: SET_ACC_PASSWORD, payload: password });
export const setAccId = (accId) => ({ type: SET_ACC_ID, payload: accId });
export const clearForm = () => ({ type: CLEAR_FORM });

export default accountReducer;
