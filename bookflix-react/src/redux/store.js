import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerReducer';
import authReducer from './authReducer';
import authorReducer from './authorReducer';
import articleReducer from './articleReducer';
import bookBageReducer from './bookPageReducer';

const store = configureStore({
    reducer: {
        headerReducer: headerReducer,
        authReducer: authReducer,
        authorReducer: authorReducer,
        articleReducer: articleReducer,
        bookBageReducer: bookBageReducer,
    },
});

export default store;
