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
import './App.css';

function App() {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== '/auth' && <HeaderContainer />}
            <Routes>
                <Route path="/" element={<MainPageContainer />} />
                <Route path="auth" element={<AuthPageContainer />} />
                <Route path="all-films" element={<AllFilmsContainer />} />
                <Route path="all-books" element={<AllBooksContainer />} />
                <Route path="author" element={<AuthorContainer />} />
                <Route path="new-article" element={<NewArticleContainer />} />
                <Route path="edit-article" element={<EditArticleContainer />} />
                <Route path="favourites" element={<FavouritesContainer />} />
            </Routes>
        </div>
    );
}

export default App;
