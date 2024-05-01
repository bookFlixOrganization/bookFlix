import React from 'react';
import YourFilms from './Sections/YourFilms.jsx';
import YourBooks from './Sections/YourBooks.jsx';
import PopularFilms from './Sections/PopularFilms.jsx';
import PopularBooks from './Sections/PopularBooks.jsx';

const MainPage = () => {
    return (
        <div>
            <YourFilms />
            <YourBooks />
            <PopularFilms />
            <PopularBooks />
        </div>
    );
};

export default MainPage;
