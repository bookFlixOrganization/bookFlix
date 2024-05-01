import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerReducer';
import authReducer from './authReducer';

const store = configureStore({
    reducer: {
        headerReducer: headerReducer,
        authReducer: authReducer,
    },
});

export default store;
