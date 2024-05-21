import React from 'react';
import YourFilms from './Sections/YourFilms.jsx';
import YourBooks from './Sections/YourBooks.jsx';
import PopularFilms from './Sections/PopularFilms.jsx';
import PopularBooks from './Sections/PopularBooks.jsx';

const MainPage = (props) => {
    return (
        <div>
            <YourFilms personFilms={props.personFilms} />
            <YourBooks personBooks={props.personBooks} />
            <PopularFilms popularFilms={props.popularFilms} />
            <PopularBooks popularBooks={props.popularBooks} />
        </div>
    );
};

export default MainPage;
