const SET_NAME = 'SET_NAME';
const SET_ORIGINAL_NAME = 'SET_ORIGINAL_NAME';
const SET_COVER_URL = 'SET_COVER_URL';
const SET_DESCRIPTION = 'SET_DECRIPTION';
const SET_TRACKS = 'SET_TRACKS';
const SET_DATE = 'SET_DATE';
const SET_COUNTRIES = 'SET_COUNTRIES';
const SET_GENRE = 'SET_GENRE';
const SET_DIRECTOR = 'SET_DIRECTOR';
const SET_BUDGET = 'SET_BUDGET';
const SET_RATING_BOOKFLIX = 'SET_RATING';
const SET_RATING_IMDB = 'SET_RATING_IMDB';
const SET_VIDEO_URL = 'SET_VIDEO_URL';
const SET_RUNTIMES = 'SET_RUNTIMES';
const SET_AGE = 'SET_AGE';
const SET_ACTORS = 'SET_ACTORS';
const CLEAR_CONTENT = 'CLEAR_CONTENT';

const initialState = {
    name: '',
    original_name: '',
    cover_url: '',
    description: '',
    tracks: [],
    date: '',
    countries: [],
    genre: '',
    director: '',
    duration: '',
    budget: '',
    age: '',
    rating_bookflix: 0.0,
    rating_imdb: 0.0,
    video_url: '',
    runtimes: '',
    actors: null,
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
        case SET_COVER_URL:
            return {
                ...state,
                cover_url: action.payload,
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
        case SET_RATING_IMDB:
            return {
                ...state,
                rating_imdb: action.payload,
            };
        case SET_VIDEO_URL:
            return {
                ...state,
                video_url: action.payload,
            };
        case SET_RUNTIMES:
            return {
                ...state,
                runtimes: action.payload,
            };
        case SET_AGE:
            return {
                ...state,
                age: action.payload,
            };
        case SET_ACTORS:
            return {
                ...state,
                actors: action.payload,
            };
        case CLEAR_CONTENT:
            return initialState;
        default:
            return state;
    }
};

export const setName = (name) => ({ type: SET_NAME, payload: name });
export const setOriginalName = (originalName) => ({
    type: SET_ORIGINAL_NAME,
    payload: originalName,
});
export const setCoverUrl = (coverUrl) => ({
    type: SET_COVER_URL,
    payload: coverUrl,
});
export const setDescription = (description) => ({ type: SET_DESCRIPTION, payload: description });
export const setTracks = (tracks) => ({ type: SET_TRACKS, payload: tracks });
export const setDate = (date) => ({ type: SET_DATE, payload: date });
export const setCountries = (countries) => ({ type: SET_COUNTRIES, payload: countries });
export const setGenre = (genre) => ({ type: SET_GENRE, payload: genre });
export const setDirector = (director) => ({ type: SET_DIRECTOR, payload: director });
export const setBudget = (budget) => ({ type: SET_BUDGET, payload: budget });
export const setRatingBookflix = (rating) => ({ type: SET_RATING_BOOKFLIX, payload: rating });
export const setRatingImdb = (rating) => ({ type: SET_RATING_IMDB, payload: rating });
export const setVideoUrl = (videoUrl) => ({ type: SET_VIDEO_URL, payload: videoUrl });
export const setRuntimes = (runtimes) => ({ type: SET_RUNTIMES, payload: runtimes });
export const setAge = (age) => ({ type: SET_AGE, payload: age });
export const setActors = (actors) => ({ type: SET_ACTORS, payload: actors });
export const clearContent = () => ({ type: CLEAR_CONTENT });

export default filmPageReducer;
