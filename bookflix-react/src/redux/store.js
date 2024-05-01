import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerReducer';

const store = configureStore({
    reducer: {
        headerReducer: headerReducer,
    },
});

export default store;
