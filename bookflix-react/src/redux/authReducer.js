const SET_IN_USERNAME = 'SET_IN_USERNAME';
const SET_IN_PASSWORD = 'SET_IN_PASSWORD';
const SET_UP_USERNAME = 'SET_UP_USERNAME';
const SET_UP_EMAIL = 'SET_UP_EMAIL';
const SET_UP_PASSWORD = 'SET_UP_PASSWORD';
const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

const initialState = {
    in_username: '',
    in_password: '',
    up_username: '',
    up_email: '',
    up_password: '',
    notifications: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IN_USERNAME:
            return {
                ...state,
                in_username: action.payload,
            };
        case SET_IN_PASSWORD:
            return {
                ...state,
                in_password: action.payload,
            };
        case SET_UP_USERNAME:
            return {
                ...state,
                up_username: action.payload,
            };
        case SET_UP_EMAIL:
            return {
                ...state,
                up_email: action.payload,
            };
        case SET_UP_PASSWORD:
            return {
                ...state,
                up_password: action.payload,
            };
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
            };
        default:
            return state;
    }
};

export const setInUsername = (in_username) => ({ type: SET_IN_USERNAME, payload: in_username });
export const setInPassword = (in_password) => ({ type: SET_IN_PASSWORD, payload: in_password });
export const setUpUsername = (up_username) => ({ type: SET_UP_USERNAME, payload: up_username });
export const setUpEmail = (up_email) => ({ type: SET_UP_EMAIL, payload: up_email });
export const setUpPassword = (up_password) => ({ type: SET_UP_PASSWORD, payload: up_password });
export const setNotifications = (notifications) => ({
    type: SET_NOTIFICATIONS,
    payload: notifications,
});

export default authReducer;
