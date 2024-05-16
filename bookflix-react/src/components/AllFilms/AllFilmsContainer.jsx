import React from 'react';
import AllFilms from './AllFilms.jsx';
import SessionChecker from '../SessionChecker.jsx';

const AllFilmsContainer = () => {
    return (
        <>
            <SessionChecker />
            <AllFilms />;
        </>
    );
};

export default AllFilmsContainer;
