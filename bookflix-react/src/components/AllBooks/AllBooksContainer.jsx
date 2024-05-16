import React from 'react';
import AllBooks from './AllBooks.jsx';
import SessionChecker from '../SessionChecker.jsx';

const AllBooksContainer = () => {
    return (
        <>
            <SessionChecker />
            <AllBooks />;
        </>
    );
};

export default AllBooksContainer;
