import { Routes, Route, useLocation } from 'react-router-dom';
import MainPageContainer from './components/MainPage/MainPageContainer.jsx';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import AuthPageContainer from './components/AuthPage/AuthPageContainer.jsx';
import AllFilmsContainer from './components/AllFilms/AllFilmsContainer.jsx';
import AllBooksContainer from './components/AllBooks/AllBooksContainer.jsx';
import AuthorContainer from './components/Author/AuthorContainer.jsx';
import NewArticleContainer from './components/NewArticle/NewArticleContainer.jsx';
import EditArticleContainer from './components/EditArticle/EditArticleContainer.jsx';
import FavouritesContainer from './components/Favourites/FavouritesContainer.jsx';
import HistoryContainer from './components/History/HistoryContainer.jsx';
import BookPageContainer from './components/BookPage/BookPageContainer.jsx';
import FilmPageContainer from './components/FilmPage/FilmPageContainer.jsx';
import ArticlesContainer from './components/Articles/ArticlesContainer.jsx';
import SubscribesContainer from './components/Subscribes/SubscribesContainer.jsx';
import ReadingDiaryContainer from './components/ReadingDiary/ReadingDiaryContainer.jsx';
import ArticlePageContainer from './components/ArticlePage/ArticlePageContainer.jsx';
import PreferencesContainer from './components/Preferences/PreferencesContainer.jsx';
import SearchPageContainer from './components/SearchPage/SearchPageContainer.jsx';
import PersonFilmsContainer from './components/AllFilms/PersonFilmsContainer.jsx';
import PersonBooksContainer from './components/AllBooks/PersonBooksContainer.jsx';
import AccountContainer from './components/Account/AccountContainer.jsx';
import EditPreferencesContainer from './components/EditPreferences/EditPreferencesContainer.jsx';
import SessionChecker from './components/SessionChecker.jsx';
import './App.css';
import axios from 'axios';

function App() {
    axios.defaults.withCredentials = true;
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== '/auth' && <SessionChecker />}
            {location.pathname !== '/auth' && location.pathname !== '/preferences' && (
                <HeaderContainer />
            )}
            <Routes>
                <Route path="/" element={<MainPageContainer />} />
                <Route path="auth" element={<AuthPageContainer />} />
                <Route path="account" element={<AccountContainer />} />
                <Route path="preferences" element={<PreferencesContainer />} />
                <Route path="edit-preferences" element={<EditPreferencesContainer />} />

                <Route path="all-films" element={<AllFilmsContainer />} />
                <Route path="all-books" element={<AllBooksContainer />} />
                <Route path="person-films" element={<PersonFilmsContainer />} />
                <Route path="person-books" element={<PersonBooksContainer />} />
                <Route path="film-page/:id/:imdb" element={<FilmPageContainer />} />
                <Route path="book-page/:id" element={<BookPageContainer />} />

                <Route path="search" element={<SearchPageContainer />} />
                <Route path="favourites" element={<FavouritesContainer />} />
                <Route path="history" element={<HistoryContainer />} />

                <Route path="new-article/:bookId" element={<NewArticleContainer />} />
                <Route path="article-page" element={<ArticlePageContainer />} />
                <Route path="edit-article" element={<EditArticleContainer />} />
                <Route path="author" element={<AuthorContainer />} />
                <Route path="articles" element={<ArticlesContainer />} />
                <Route path="subscribes" element={<SubscribesContainer />} />
                <Route path="reading-diary" element={<ReadingDiaryContainer />} />
            </Routes>
        </div>
    );
}

export default App;
