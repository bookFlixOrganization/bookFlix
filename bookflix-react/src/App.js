import { Routes, Route, useLocation } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
// Main
import MainPageContainer from './components/Main/MainPage/MainPageContainer.jsx';
import AllBooksContainer from './components/Main/AllBooks/AllBooksContainer.jsx';
import AllFilmsContainer from './components/Main/AllFilms/AllFilmsContainer.jsx';
import BookPageContainer from './components/Main/BookPage/BookPageContainer.jsx';
import FilmPageContainer from './components/Main/FilmPage/FilmPageContainer.jsx';
import PersonFilmsContainer from './components/Main/AllFilms/PersonFilmsContainer.jsx';
import PersonBooksContainer from './components/Main/AllBooks/PersonBooksContainer.jsx';
// Me
import AuthPageContainer from './components/Me/AuthPage/AuthPageContainer.jsx';
import FavouritesContainer from './components/Me/Favourites/FavouritesContainer.jsx';
import HistoryContainer from './components/Me/History/HistoryContainer.jsx';
import PreferencesContainer from './components/Me/Preferences/PreferencesContainer.jsx';
import EditPreferencesContainer from './components/Me/EditPreferences/EditPreferencesContainer.jsx';
import AccountContainer from './components/Me/Account/AccountContainer.jsx';
// Reading
import ReadingHeaderContainer from './components/Reading/ReadingHeader/ReadingHeaderContainer.jsx';
import MyArticlesContainer from './components/Reading/MyArticles/MyArticlesContainer.jsx';
import NewArticleContainer from './components/Reading/NewArticle/NewArticleContainer.jsx';
import ArticlePageContainer from './components/Reading/ArticlePage/ArticlePageContainer.jsx';
import PopularArticlesContainer from './components/Reading/PopularArticles/PopularArticlesContainer.jsx';
// import AuthorContainer from './components/Reading/Author/AuthorContainer.jsx';
// import EditArticleContainer from './components/Reading/EditArticle/EditArticleContainer.jsx';
// import SubscribesContainer from './components/Reading/Subscribes/SubscribesContainer.jsx';
// import ArticlesContainer from './components/Reading/Articles/ArticlesContainer.jsx';
// Other
import SearchPageContainer from './components/SearchPage/SearchPageContainer.jsx';
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
            {(location.pathname === '/reading-diary' ||
                location.pathname === '/popular-articles') && <ReadingHeaderContainer />}
            <Routes>
                {/* Main */}
                <Route path="/" element={<MainPageContainer />} />
                <Route path="all-films" element={<AllFilmsContainer />} />
                <Route path="all-books" element={<AllBooksContainer />} />
                <Route path="person-films" element={<PersonFilmsContainer />} />
                <Route path="person-books" element={<PersonBooksContainer />} />
                <Route path="film-page/:id/:imdb" element={<FilmPageContainer />} />
                <Route path="book-page/:id" element={<BookPageContainer />} />

                {/* Me */}
                <Route path="auth" element={<AuthPageContainer />} />
                <Route path="account" element={<AccountContainer />} />
                <Route path="preferences" element={<PreferencesContainer />} />
                <Route path="edit-preferences" element={<EditPreferencesContainer />} />
                <Route path="favourites" element={<FavouritesContainer />} />
                <Route path="history" element={<HistoryContainer />} />

                {/* Reading */}
                <Route path="reading-diary" element={<MyArticlesContainer />} />
                <Route path="new-article/:bookId" element={<NewArticleContainer />} />
                <Route path="article-page/:articleId" element={<ArticlePageContainer />} />
                <Route path="popular-articles" element={<PopularArticlesContainer />} />

                {/* <Route path="edit-article" element={<EditArticleContainer />} /> */}
                {/* <Route path="reading-diary" element={<ArticlesContainer />} /> */}
                {/* <Route path="author" element={<AuthorContainer />} /> */}
                {/* <Route path="subscribes" element={<SubscribesContainer />} /> */}

                <Route path="search" element={<SearchPageContainer />} />
            </Routes>
        </div>
    );
}

export default App;
