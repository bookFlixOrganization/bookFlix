import React from 'react';
import YourFilms from './YourFilms.jsx';
import YourBooks from './YourBooks.jsx';
import PopularFilms from './PopularFilms.jsx';
import PopularBooks from './PopularBooks.jsx';

const MainPage = () => {
    return (
        <div className="page-container">
            <h2>Главная</h2>
            <YourFilms />
            <YourBooks />
            <PopularFilms />
            <PopularBooks />
        </div>
    );
};

export default MainPage;
