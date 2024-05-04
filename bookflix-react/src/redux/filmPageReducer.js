const SET_NAME = 'SET_NAME';
const SET_ORIGINAL_NAME = 'SET_ORIGINAL_NAME';
const SET_DESCRIPTION = 'SET_DECRIPTION';
const SET_TRACKS = 'SET_TRACKS';
const SET_SUBTITLES = 'SET_SUBTITLES';
const SET_QUALITY = 'SET_QUALITY';
const SET_DATE = 'SET_DATE';
const SET_COUNTRIES = 'SET_COUNTRIES';
const SET_GENRE = 'SET_GENRE';
const SET_SLOGAN = 'SET_SLOGAN';
const SET_DIRECTOR = 'SET_DIRECTOR';
const SET_BUDGET = 'SET_BUDGET';
const SET_RATING_BOOKFLIX = 'SET_RATING';
const SET_RATING_GOOGLE = 'SET_RATING_GOOGLE';

const initialState = {
    name: '',
    original_name: '',
    decription: '',
    tracks: [],
    subtitles: [],
    quality: '',
    date: '',
    countries: [],
    genre: '',
    slogan: '',
    director: '',
    duration: '',
    budget: '',
    rating_bookflix: 0.0,
    rating_google: 0.0,
};

const filmPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case SET_ORIGINAL_NAME:
            return {
                ...state,
                original_name: action.payload,
            };
        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
            };
        case SET_TRACKS:
            return {
                ...state,
                tracks: action.payload,
            };
        case SET_SUBTITLES:
            return {
                ...state,
                subtitles: action.payload,
            };
        case SET_QUALITY:
            return {
                ...state,
                quality: action.payload,
            };
        case SET_DATE:
            return {
                ...state,
                date: action.payload,
            };
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };
        case SET_GENRE:
            return {
                ...state,
                genre: action.payload,
            };
        case SET_SLOGAN:
            return {
                ...state,
                slogan: action.payload,
            };
        case SET_DIRECTOR:
            return {
                ...state,
                director: action.payload,
            };
        case SET_BUDGET:
            return {
                ...state,
                budget: action.payload,
            };
        case SET_RATING_BOOKFLIX:
            return {
                ...state,
                rating_bookflix: action.payload,
            };
        case SET_RATING_GOOGLE:
            return {
                ...state,
                rating_google: action.payload,
            };
        default:
            return state;
    }
};

export const setName = (name) => ({ type: SET_NAME, payload: name });
export const setOriginalName = (originalName) => ({
    type: SET_ORIGINAL_NAME,
    payload: originalName,
});
export const setDescription = (description) => ({ type: SET_DESCRIPTION, payload: description });
export const setTracks = (tracks) => ({ type: SET_TRACKS, payload: tracks });
export const setSubtitles = (subtitles) => ({ type: SET_SUBTITLES, payload: subtitles });
export const setQuality = (quality) => ({ type: SET_QUALITY, payload: quality });
export const setDate = (date) => ({ type: SET_DATE, payload: date });
export const setCountries = (countries) => ({ type: SET_COUNTRIES, payload: countries });
export const setGenre = (genre) => ({ type: SET_GENRE, payload: genre });
export const setSlogan = (slogan) => ({ type: SET_SLOGAN, payload: slogan });
export const setDirector = (director) => ({ type: SET_DIRECTOR, payload: director });
export const setBudget = (budget) => ({ type: SET_BUDGET, payload: budget });
export const setRatingBookflix = (rating) => ({ type: SET_RATING_BOOKFLIX, payload: rating });
export const setRatingGoogle = (rating) => ({ type: SET_RATING_GOOGLE, payload: rating });

export default filmPageReducer;
