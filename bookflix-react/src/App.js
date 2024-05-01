import { Routes, Route } from 'react-router-dom';
import MainPageContainer from './components/MainPage/MainPageContainer.jsx';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPageContainer />} />
            </Routes>
        </div>
    );
}

export default App;
