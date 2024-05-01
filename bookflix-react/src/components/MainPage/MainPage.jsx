import React from 'react';
import YourFilms from './YourFilms.jsx';

const MainPage = () => {
    return (
        <div className="page-container">
            <h2>Главная</h2>
            <div className="container">
                <YourFilms />
            </div>
        </div>
    );
};

export default MainPage;
