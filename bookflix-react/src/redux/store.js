import { configureStore } from '@reduxjs/toolkit';
// import headerReducer from './headerReducer';
import authReducer from './authReducer';
import authorReducer from './authorReducer';
import articleReducer from './articleReducer';
import bookBageReducer from './bookPageReducer';
import filmPageReducer from './filmPageReducer';
import feedbackReducer from './feedbackReducer';
import articlePageReducer from './articlePageReducer';
import sessionReducer from './sessionReducer';

const store = configureStore({
    reducer: {
        // headerReducer: headerReducer,
        authReducer: authReducer,
        authorReducer: authorReducer,
        articleReducer: articleReducer,
        bookBageReducer: bookBageReducer,
        filmPageReducer: filmPageReducer,
        feedbackReducer: feedbackReducer,
        articlePageReducer: articlePageReducer,
        sessionReducer: sessionReducer,
    },
});

export default store;
