import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import authorReducer from './authorReducer';
import articleReducer from './articleReducer';
import bookPageReducer from './bookPageReducer';
import filmPageReducer from './filmPageReducer';
import feedbackReducer from './feedbackReducer';
import articlePageReducer from './articlePageReducer';
import sessionReducer from './sessionReducer';
import mainPageReducer from './mainPageReducer';
import accountReducer from './accountReducer';
import historyReducer from './historyReducer';
import favouritesReducer from './favouritesReducer';

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        authorReducer: authorReducer,
        articleReducer: articleReducer,
        bookPageReducer: bookPageReducer,
        filmPageReducer: filmPageReducer,
        feedbackReducer: feedbackReducer,
        articlePageReducer: articlePageReducer,
        sessionReducer: sessionReducer,
        mainPageReducer: mainPageReducer,
        accountReducer: accountReducer,
        historyReducer: historyReducer,
        favouritesReducer: favouritesReducer,
    },
});

export default store;
