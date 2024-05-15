import React from 'react';
import AllBooks from './AllBooks.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const AllBooksContainer = () => {
    return (
        <>
            <PreferencesCheck />
            <AllBooks />;
        </>
    );
};

export default AllBooksContainer;
