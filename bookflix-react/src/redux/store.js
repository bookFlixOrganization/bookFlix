import { configureStore } from '@reduxjs/toolkit';
// Main
import bookPageReducer from './Main/bookPageReducer';
import filmPageReducer from './Main/filmPageReducer';
import mainPageReducer from './Main/mainPageReducer';
// Me
import authReducer from './Me/authReducer';
import accountReducer from './Me/accountReducer';
import favouritesReducer from './Me/favouritesReducer';
import historyReducer from './Me/historyReducer';
// Reading
import myArticlesReducer from './Reading/myArticlesReducer';
import authorReducer from './Reading/authorReducer';
import editArticleReducer from './Reading/editArticleReducer';
import articlePageReducer from './Reading/articlePageReducer';
import newArticleReducer from './Reading/newArticleReducer';
import subscribesReducer from './Reading/subscribesReducer';
// other
import sessionReducer from './sessionReducer';

const store = configureStore({
    reducer: {
        // Main
        mainPageReducer: mainPageReducer,
        filmPageReducer: filmPageReducer,
        bookPageReducer: bookPageReducer,
        // Me
        authReducer: authReducer,
        accountReducer: accountReducer,
        favouritesReducer: favouritesReducer,
        historyReducer: historyReducer,
        // Reading
        myArticlesReducer: myArticlesReducer,
        articlePageReducer: articlePageReducer,
        authorReducer: authorReducer,
        newArticleReducer: newArticleReducer,
        subscribesReducer: subscribesReducer,
        editArticleReducer: editArticleReducer,
        // Other
        sessionReducer: sessionReducer,
    },
});

export default store;
