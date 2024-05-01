import { Routes, Route, useLocation } from 'react-router-dom';
import MainPageContainer from './components/MainPage/MainPageContainer.jsx';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import AuthPageContainer from './components/AuthPage/AuthPageContainer.jsx';
import './App.css';

function App() {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== '/auth' && <HeaderContainer />}
            <Routes>
                <Route path="/" element={<MainPageContainer />} />
                <Route path="auth" element={<AuthPageContainer />} />
            </Routes>
        </div>
    );
}

export default App;
