// Константы для действий
const SET_ID = 'SET_ID';
const SET_EMAIL = 'SET_EMAIL';
const SET_ACTIVE = 'SET_ACTIVE';
const SET_SUPERUSER = 'SET_SUPERUSER';
const SET_VERIFIED = 'SET_VERIFIED';
const SET_USERNAME = 'SET_USERNAME';
const SET_ROLE_ID = 'SET_ROLE_ID';
const SET_PREFERENCES = 'SET_PREFERENCES';
const LOGOUT = 'LOGOUT';

const initialState = {
    id: '',
    email: '',
    is_active: true,
    is_superuser: false,
    is_verified: false,
    username: '',
    role_id: '',
    is_preferences: false,
};

const sessionRecucer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                id: action.payload,
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case SET_ACTIVE:
            return {
                ...state,
                is_active: action.payload,
            };
        case SET_SUPERUSER:
            return {
                ...state,
                is_superuser: action.payload,
            };
        case SET_VERIFIED:
            return {
                ...state,
                is_verified: action.payload,
            };
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload,
            };
        case SET_ROLE_ID:
            return {
                ...state,
                role_id: action.payload,
            };
        case SET_PREFERENCES:
            return {
                ...state,
                is_preferences: action.payload,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export const setId = (id) => ({ type: SET_ID, payload: id });
export const setEmail = (email) => ({ type: SET_EMAIL, payload: email });
export const setActive = (isActive) => ({ type: SET_ACTIVE, payload: isActive });
export const setSuperuser = (isSuperuser) => ({ type: SET_SUPERUSER, payload: isSuperuser });
export const setVerified = (isVerified) => ({ type: SET_VERIFIED, payload: isVerified });
export const setUsername = (username) => ({ type: SET_USERNAME, payload: username });
export const setRoleId = (roleId) => ({ type: SET_ROLE_ID, payload: roleId });
export const setPreferences = (isPreferences) => ({
    type: SET_PREFERENCES,
    payload: isPreferences,
});
export const logout = () => ({ type: LOGOUT });

export default sessionRecucer;
