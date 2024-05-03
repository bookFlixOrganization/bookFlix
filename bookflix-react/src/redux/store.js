import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerReducer';
import authReducer from './authReducer';
import authorReducer from './authorReducer';
import newArticleReducer from './newArticleReducer';

const store = configureStore({
    reducer: {
        headerReducer: headerReducer,
        authReducer: authReducer,
        authorReducer: authorReducer,
        newArticleReducer: newArticleReducer,
    },
});

export default store;
