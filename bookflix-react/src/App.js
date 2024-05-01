import { Routes, Route } from 'react-router-dom';
import MainPageContainer from './components/MainPage/MainPageContainer.jsx';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import './App.css';

function App() {
    return (
        <div className="App">
            <HeaderContainer />
            <Routes>
                <Route path="/" element={<MainPageContainer />} />
            </Routes>
        </div>
    );
}

export default App;
