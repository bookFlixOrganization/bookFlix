import React from 'react';
import AllFilms from './AllFilms.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const AllFilmsContainer = () => {
    return (
        <>
            <PreferencesCheck />
            <AllFilms />;
        </>
    );
};

export default AllFilmsContainer;
