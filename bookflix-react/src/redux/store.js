import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerReducer';
import authReducer from './authReducer';
import authorReducer from './authorReducer';
import articleReducer from './articleReducer';
import bookBageReducer from './bookPageReducer';
import feedbackReducer from './feedbackReducer';

const store = configureStore({
    reducer: {
        headerReducer: headerReducer,
        authReducer: authReducer,
        authorReducer: authorReducer,
        articleReducer: articleReducer,
        bookBageReducer: bookBageReducer,
        feedbackReducer: feedbackReducer,
    },
});

export default store;
