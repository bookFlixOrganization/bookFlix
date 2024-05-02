import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerReducer';
import authReducer from './authReducer';
import authorReducer from './authorReducer';

const store = configureStore({
    reducer: {
        headerReducer: headerReducer,
        authReducer: authReducer,
        authorReducer: authorReducer,
    },
});

export default store;
